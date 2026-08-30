import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Radio,
  MessageSquare,
  Bot,
  User,
  Lightbulb,
} from 'lucide-react';
import { HostPersonality, TriviaQuestion, HostChatMessage } from '../types';
import { sendHostChat } from '../services/api';
import { liveAudio } from '../services/liveAudio';
import { soundFX } from '../services/soundFx';

interface HostChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  host: HostPersonality;
  currentQuestion?: TriviaQuestion | null;
  score?: number;
}

export const HostChatModal: React.FC<HostChatModalProps> = ({
  isOpen,
  onClose,
  host,
  currentQuestion,
  score,
}) => {
  const [messages, setMessages] = useState<HostChatMessage[]>([
    {
      id: 'welcome',
      sender: 'host',
      text: `Hello there! I'm ${host.name}. Need a hint, want to dispute a trivia ruling, or just want to chat with your host? I'm all ears!`,
      timestamp: Date.now(),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Live API Real-Time Voice Mode States
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isLiveConnecting, setIsLiveConnecting] = useState(false);
  const [liveMicLevel, setLiveMicLevel] = useState(0);
  const [liveStatusText, setLiveStatusText] = useState('Live Audio Ready');

  const wsRef = useRef<WebSocket | null>(null);
  const stopMicRef = useRef<(() => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Clean up WebSocket & mic on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      stopLiveSession();
    }
    return () => {
      stopLiveSession();
    };
  }, [isOpen]);

  // Start Gemini 3.1 Flash Live Real-Time Voice Connection
  const startLiveVoiceSession = async () => {
    try {
      soundFX.playPowerup();
      setIsLiveConnecting(true);
      setLiveStatusText('Connecting to Gemini 3.1 Live API...');

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setLiveStatusText('Live Session Connected! Starting Microphone...');
        // Send init message
        ws.send(
          JSON.stringify({
            type: 'init',
            host,
            questionContext: currentQuestion ? `Question: ${currentQuestion.question}` : 'Trivia stage lounge',
          })
        );

        // Start Mic Capture (16kHz PCM)
        try {
          const stopMic = await liveAudio.startMicrophoneCapture((pcmBase64) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'audio', audio: pcmBase64 }));
            }
          });
          stopMicRef.current = stopMic;
          setIsLiveActive(true);
          setIsLiveConnecting(false);
          setLiveStatusText('🎙️ Speaking Live with Host (Gemini 3.1 Flash Live)');
        } catch (micErr: any) {
          console.error('Microphone error:', micErr);
          setLiveStatusText('Microphone access denied. You can still type below!');
          setIsLiveConnecting(false);
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'audio' && msg.audio) {
            // Play 24kHz stream chunk
            liveAudio.playStreamChunk(msg.audio);
          } else if (msg.type === 'ready') {
            setLiveStatusText(`Connected to ${host.name}! Speak now into your mic.`);
          } else if (msg.type === 'interrupted') {
            liveAudio.stop();
          }
        } catch (e) {}
      };

      ws.onerror = (err) => {
        console.error('WS error:', err);
        setLiveStatusText('Live audio connection issue. Switched to interactive chat mode.');
        setIsLiveConnecting(false);
      };

      ws.onclose = () => {
        setIsLiveActive(false);
        setIsLiveConnecting(false);
      };
    } catch (err: any) {
      console.error('Failed to start Live API session:', err);
      setIsLiveConnecting(false);
      setLiveStatusText('Unable to start live audio.');
    }
  };

  const stopLiveSession = () => {
    if (stopMicRef.current) {
      stopMicRef.current();
      stopMicRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsLiveActive(false);
    setIsLiveConnecting(false);
    setLiveStatusText('Live Audio Inactive');
    liveAudio.stop();
  };

  // Send Text Chat Message to Host
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputVal).trim();
    if (!textToSend || isSending) return;

    soundFX.playSelect();
    setInputVal('');

    const userMsg: HostChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsSending(true);

    try {
      const res = await sendHostChat({
        messages: updated.map((m) => ({ sender: m.sender, text: m.text })),
        host,
        currentQuestion,
        gameContext: `Current score: ${score || 0}`,
      });

      if (res.success) {
        const hostMsg: HostChatMessage = {
          id: `host-${Date.now()}`,
          sender: 'host',
          text: res.reply,
          timestamp: Date.now(),
          audioBase64: res.audioBase64 || undefined,
        };

        setMessages((prev) => [...prev, hostMsg]);

        // Auto-play audio if generated
        if (res.audioBase64) {
          liveAudio.playBase64Pcm(res.audioBase64);
        }
      }
    } catch (e) {
      console.warn('Chat error:', e);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl h-[90vh] max-h-[720px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-2xl shadow-md`}
            >
              {host.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  Chat & Talk with {host.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Live Host API
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Voice powered by Gemini 3.1 Flash Live & TTS Preview
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Mode Banner */}
        <div className="p-3 bg-gradient-to-r from-violet-950/70 via-slate-900 to-indigo-950/70 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isLiveActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`}
            />
            <span className="text-xs font-semibold text-slate-200">{liveStatusText}</span>
          </div>

          <div className="flex items-center gap-2">
            {!isLiveActive ? (
              <button
                id="start-live-voice-btn"
                disabled={isLiveConnecting}
                onClick={startLiveVoiceSession}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition active:scale-95 disabled:opacity-50"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isLiveConnecting ? 'Connecting...' : 'Start Live Voice Mic'}</span>
              </button>
            ) : (
              <button
                id="stop-live-voice-btn"
                onClick={stopLiveSession}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition active:scale-95 shadow-md"
              >
                <MicOff className="w-3.5 h-3.5" />
                <span>Stop Voice Session</span>
              </button>
            )}
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {messages.map((m) => {
            const isHost = m.sender === 'host';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isHost ? 'justify-start' : 'justify-end'}`}
              >
                {isHost && (
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-lg shrink-0 shadow-sm`}
                  >
                    {host.avatarEmoji}
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isHost
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-200'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold'
                  }`}
                >
                  <p>{m.text}</p>
                  {isHost && m.audioBase64 && (
                    <button
                      onClick={() => liveAudio.playBase64Pcm(m.audioBase64!)}
                      className="mt-2 flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Replay Voice</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex gap-3 justify-start">
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-lg shrink-0`}
              >
                {host.avatarEmoji}
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase shrink-0">
            Quick Ask:
          </span>
          {[
            'Give me a clever hint for this question!',
            'Roast my trivia skills so far!',
            'Tell me a bizarre fun fact about this topic.',
            'Why did you become a trivia host?',
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(promptText)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 shrink-0 transition"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/70">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="host-chat-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Message ${host.name}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm shadow-inner"
            />

            <button
              id="host-chat-send-btn"
              type="submit"
              disabled={!inputVal.trim() || isSending}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
