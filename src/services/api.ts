import { HostPersonality, TriviaQuestion, GameStats, GroundingSource } from '../types';

export interface GenerateTriviaParams {
  category: string;
  customTopic?: string;
  difficulty: string;
  count: number;
  hostName: string;
  hostStyle: string;
}

export interface GenerateTriviaResult {
  success: boolean;
  questions: TriviaQuestion[];
  groundingSources?: GroundingSource[];
  error?: string;
}

export interface TTSResult {
  success: boolean;
  audioBase64?: string;
  sampleRate?: number;
  error?: string;
}

export interface HostCommentaryResult {
  success: boolean;
  commentary: string;
  audioBase64?: string | null;
  error?: string;
}

export interface HostChatResult {
  success: boolean;
  reply: string;
  audioBase64?: string | null;
  error?: string;
}

export async function generateTriviaQuestions(params: GenerateTriviaParams): Promise<GenerateTriviaResult> {
  try {
    const res = await fetch('/api/generate-trivia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to fetch trivia questions');
    }

    return {
      success: true,
      questions: data.questions,
      groundingSources: data.groundingSources,
    };
  } catch (err: any) {
    console.error('generateTriviaQuestions error:', err);
    return {
      success: false,
      questions: [],
      error: err.message || 'Error communicating with trivia generator.',
    };
  }
}

export async function generateHostTTS(text: string, voice: string, emotionPrompt?: string): Promise<TTSResult> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, emotionPrompt }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'TTS error');
    }

    return {
      success: true,
      audioBase64: data.audioBase64,
      sampleRate: data.sampleRate,
    };
  } catch (err: any) {
    console.warn('generateHostTTS error:', err);
    return {
      success: false,
      error: err.message || 'Error generating TTS',
    };
  }
}

export async function getHostCommentary(params: {
  host: HostPersonality;
  action: 'correct' | 'incorrect' | 'streak' | 'hint' | 'game_over' | 'timeout';
  question?: TriviaQuestion;
  selectedAnswer?: string;
  score?: number;
  streak?: number;
  timeRemaining?: number;
  stats?: GameStats;
  generateVoice?: boolean;
}): Promise<HostCommentaryResult> {
  try {
    const res = await fetch('/api/host-commentary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Commentary error');
    }

    return {
      success: true,
      commentary: data.commentary,
      audioBase64: data.audioBase64,
    };
  } catch (err: any) {
    console.warn('getHostCommentary error:', err);
    return {
      success: false,
      commentary: '',
      error: err.message || 'Error getting commentary',
    };
  }
}

export async function sendHostChat(params: {
  messages: Array<{ sender: 'user' | 'host' | 'system'; text: string }>;
  host: HostPersonality;
  currentQuestion?: TriviaQuestion | null;
  gameContext?: string;
}): Promise<HostChatResult> {
  try {
    const res = await fetch('/api/host-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Host chat error');
    }

    return {
      success: true,
      reply: data.reply,
      audioBase64: data.audioBase64,
    };
  } catch (err: any) {
    console.warn('sendHostChat error:', err);
    return {
      success: false,
      reply: '',
      error: err.message || 'Error in host chat',
    };
  }
}
