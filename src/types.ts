export type HostVoice = 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';

export type HostMood = 'idle' | 'speaking' | 'excited' | 'disappointed' | 'thinking' | 'smug' | 'shocked';

export interface HostPersonality {
  id: string;
  name: string;
  title: string;
  avatarEmoji: string;
  avatarBg: string;
  accentColor: string;
  badge: string;
  voice: HostVoice;
  systemPrompt: string;
  styleDescription: string;
  greetingPhrases: string[];
  correctPhrases: string[];
  incorrectPhrases: string[];
  streakPhrases: string[];
  gameOverPhrases: string[];
  isCustom?: boolean;
}

export interface TriviaOption {
  id: string;
  text: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: TriviaOption[];
  correctAnswerId: string;
  explanation: string;
  funFact?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  groundingSources?: GroundingSource[];
  hostIntroComment?: string;
}

export type GameMode = 'classic' | 'survival' | 'speed_blitz';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'adaptive';

export interface GameSettings {
  category: string;
  customTopic?: string;
  difficulty: DifficultyLevel;
  questionCount: number;
  timePerQuestion: number;
  gameMode: GameMode;
  host: HostPersonality;
  ttsEnabled: boolean;
}

export interface QuestionResult {
  question: TriviaQuestion;
  selectedAnswerId: string | null;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
  hostReaction?: string;
}

export interface GameStats {
  score: number;
  correctCount: number;
  totalAnswered: number;
  currentStreak: number;
  maxStreak: number;
  timeBonus: number;
  lifelinesUsed: number;
  livesRemaining?: number;
}

export interface LifelineState {
  fiftyFiftyUsed: boolean;
  hintUsed: boolean;
  skipUsed: boolean;
  doublePointsActive: boolean;
  disabledOptions: string[];
}

export interface HostChatMessage {
  id: string;
  sender: 'user' | 'host' | 'system';
  text: string;
  timestamp: number;
  audioBase64?: string;
}
