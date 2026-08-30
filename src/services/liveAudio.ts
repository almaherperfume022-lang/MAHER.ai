// PCM Audio Player & Live Stream Recorder for Gemini 3.1 TTS & Live API

class LiveAudioService {
  private outputAudioCtx: AudioContext | null = null;
  private inputAudioCtx: AudioContext | null = null;
  private currentSourceNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;
  private nextStartTime: number = 0;
  private analyserNode: AnalyserNode | null = null;
  private listeners: Set<(level: number) => void> = new Set();
  private animFrameId: number | null = null;

  // Initialize playback AudioContext (24kHz for Gemini TTS and Live output)
  private getOutputContext(): AudioContext {
    if (!this.outputAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.outputAudioCtx = new AudioCtxClass({ sampleRate: 24000 });
      this.analyserNode = this.outputAudioCtx.createAnalyser();
      this.analyserNode.fftSize = 64;
      this.analyserNode.connect(this.outputAudioCtx.destination);
    }
    if (this.outputAudioCtx.state === 'suspended') {
      this.outputAudioCtx.resume().catch(() => {});
    }
    return this.outputAudioCtx;
  }

  public subscribeAudioLevel(listener: (level: number) => void) {
    this.listeners.add(listener);
    if (this.listeners.size === 1) {
      this.startLevelLoop();
    }
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    };
  }

  private startLevelLoop() {
    const dataArray = new Uint8Array(32);
    const loop = () => {
      if (this.analyserNode && this.isPlaying) {
        this.analyserNode.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length / 255; // 0 to 1
        this.listeners.forEach((l) => l(avg));
      } else {
        this.listeners.forEach((l) => l(0));
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  // Convert raw 16-bit PCM little-endian base64 to Float32 AudioBuffer
  public base64PcmToAudioBuffer(base64: string, sampleRate = 24000): AudioBuffer {
    const ctx = this.getOutputContext();
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const audioBuffer = ctx.createBuffer(1, int16Array.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < int16Array.length; i++) {
      // Normalize 16-bit integer (-32768 to 32767) to -1.0 to 1.0 float
      channelData[i] = int16Array[i] / 32768.0;
    }

    return audioBuffer;
  }

  // Play a single TTS base64 PCM chunk
  public async playBase64Pcm(base64: string, sampleRate = 24000): Promise<void> {
    try {
      this.stop();
      const ctx = this.getOutputContext();
      const buffer = this.base64PcmToAudioBuffer(base64, sampleRate);

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      if (this.analyserNode) {
        source.connect(this.analyserNode);
      } else {
        source.connect(ctx.destination);
      }

      this.currentSourceNode = source;
      this.isPlaying = true;

      return new Promise((resolve) => {
        source.onended = () => {
          this.isPlaying = false;
          if (this.currentSourceNode === source) {
            this.currentSourceNode = null;
          }
          resolve();
        };
        source.start(0);
      });
    } catch (err) {
      console.error('Error playing base64 PCM audio:', err);
      this.isPlaying = false;
    }
  }

  // Queue audio chunk for gapless Live API stream playback
  public playStreamChunk(base64: string, sampleRate = 24000) {
    try {
      const ctx = this.getOutputContext();
      const buffer = this.base64PcmToAudioBuffer(base64, sampleRate);

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      if (this.analyserNode) {
        source.connect(this.analyserNode);
      } else {
        source.connect(ctx.destination);
      }

      const now = ctx.currentTime;
      if (this.nextStartTime < now) {
        this.nextStartTime = now + 0.05; // tiny initial buffer
      }

      source.start(this.nextStartTime);
      this.nextStartTime += buffer.duration;
      this.isPlaying = true;

      source.onended = () => {
        if (ctx.currentTime >= this.nextStartTime - 0.05) {
          this.isPlaying = false;
        }
      };
    } catch (err) {
      console.error('Error playing stream chunk:', err);
    }
  }

  // Stop any current audio playback
  public stop() {
    if (this.currentSourceNode) {
      try {
        this.currentSourceNode.stop();
      } catch (e) {}
      this.currentSourceNode = null;
    }
    this.isPlaying = false;
    this.nextStartTime = 0;
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Live Microphone Streamer for Live API (16kHz PCM Little Endian)
  public async startMicrophoneCapture(onPcmChunk: (base64Chunk: string) => void): Promise<() => void> {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    this.inputAudioCtx = new AudioCtxClass({ sampleRate: 16000 });

    if (this.inputAudioCtx.state === 'suspended') {
      await this.inputAudioCtx.resume();
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.inputAudioCtx.createMediaStreamSource(stream);
    const processor = this.inputAudioCtx.createScriptProcessor(4096, 1, 1);

    source.connect(processor);
    processor.connect(this.inputAudioCtx.destination);

    processor.onaudioprocess = (e) => {
      const channelData = e.inputBuffer.getChannelData(0);
      // Convert float32 to int16 PCM
      const int16Array = new Int16Array(channelData.length);
      for (let i = 0; i < channelData.length; i++) {
        const s = Math.max(-1, Math.min(1, channelData[i]));
        int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }

      // Convert Uint8 to binary string then base64
      const uint8 = new Uint8Array(int16Array.buffer);
      let binary = '';
      for (let i = 0; i < uint8.byteLength; i++) {
        binary += String.fromCharCode(uint8[i]);
      }
      const base64 = btoa(binary);
      onPcmChunk(base64);
    };

    return () => {
      processor.disconnect();
      source.disconnect();
      stream.getTracks().forEach((track) => track.stop());
      if (this.inputAudioCtx && this.inputAudioCtx.state !== 'closed') {
        this.inputAudioCtx.close().catch(() => {});
        this.inputAudioCtx = null;
      }
    };
  }

  // Fallback TTS via browser SpeechSynthesis if quota / network offline
  public speakFallback(text: string, voiceGender: 'male' | 'female' = 'male'): Promise<void> {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = voiceGender === 'female' ? 1.2 : 0.95;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const matchingVoice = voices.find((v) =>
          voiceGender === 'female' ? /female|zira|samantha|victoria/i.test(v.name) : /male|david|george|alex/i.test(v.name)
        );
        if (matchingVoice) utterance.voice = matchingVoice;
      }

      this.isPlaying = true;
      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };
      utterance.onerror = () => {
        this.isPlaying = false;
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const liveAudio = new LiveAudioService();
