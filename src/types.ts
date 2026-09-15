export type NavigationTab =
  | 'dashboard'
  | 'global_conquest'
  | 'wallet'
  | 'ai_agent'
  | 'company_charter'
  | 'store'
  | 'campaigns'
  | 'tiktok'
  | 'affiliates'
  | 'pwa'
  | 'executive_council';

export interface WalletTransaction {
  id: string;
  source: 'aliexpress_commission' | 'ecommerce_store' | 'tiktok_creator_fund' | 'youtube_kids_shorts' | 'manual_deposit';
  sourceTitle: string;
  amount: number; // in USD
  date: string;
  status: 'completed' | 'pending';
  ownerShare: number; // 80% (حصة المالك السيد ماهر صاحب الإمبراطورية)
  operationsShare: number; // 20% (حصة التشغيل والتطوير والوكيل الذكي)
}

export interface AgentTaskItem {
  id: string;
  title: string;
  subAgent: 'analyst' | 'creative' | 'ecommerce' | 'concierge' | 'security';
  subAgentLabel: string;
  status: 'idle' | 'executing' | 'completed';
  timestamp: string;
  objective: string;
  thoughtSteps: string[];
  outputContent: string;
  audioBase64?: string | null;
}

export type ProductCategory =
  | 'electronics'
  | 'consumer'
  | 'textiles'
  | 'grooming'
  | 'accessories';

export interface ProductItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  commissionRate: number; // e.g. 10 means 10%
  estCommissionUsd: number;
  affiliateUrl: string;
  imageUrl: string;
  galleryImages?: string[]; // 22 mandatory imperial photos
  photoCostUsd?: number; // 0.01$ (1 cent per photo)
  badge?: string;
  isHotProduct?: boolean;
  salesCount: number;
  rating: number;
  sellingPoints: string[];
}

export interface CampaignOutput {
  facebookPost: {
    headline: string;
    body: string;
    callToAction: string;
  };
  tiktokReels: {
    hook5s: string;
    script15s: string;
    visualDirections: string;
    soundSuggestion: string;
    caption: string;
  };
  whatsappBroadcast: {
    shortStatus: string;
    groupBroadcast: string;
  };
  strategicSummary: {
    profitPerSale: string;
    targetAudience: string;
    executiveTip: string;
  };
}

export interface MarketerApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  country: string;
  socialPlatforms: string;
  monthlyTargetRevenue: number;
  status: 'approved' | 'pending' | 'active';
  registeredAt: string;
}

export interface StrategicMetrics {
  targetRevenue2030: number; // $1,000,000,000 (1 Billion)
  currentGrossRevenue: number;
  totalAffiliateProfits: number;
  activeProductsCount: number;
  totalClicks: number;
  totalOrders: number;
  conversionRate: number;
  registeredMarketersCount: number;
}

// ----------------------------------------------------
// Legacy Trivia Types (Maintained for Backward Compatibility)
// ----------------------------------------------------
export type HostVoice = 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
export type HostMood = 'idle' | 'speaking' | 'excited' | 'disappointed' | 'thinking' | 'smug' | 'shocked';
export type GameMode = 'classic' | 'survival' | 'speed_blitz';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'adaptive';

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

export interface DailyStreakData {
  streakCount: number;
  lastPlayedDate: string;
  bonusMultiplier: number;
  isBackToBack: boolean;
  totalDaysPlayed: number;
  bestDailyStreak: number;
}

