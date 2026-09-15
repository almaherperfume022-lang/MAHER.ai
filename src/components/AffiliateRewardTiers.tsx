import React, { useState } from 'react';
import { 
  Crown, 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Sliders, 
  ChevronRight, 
  Layers, 
  Gem, 
  Clock, 
  Compass, 
  ExternalLink,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TierDefinition {
  id: string;
  level: number;
  name: string;
  nameEn: string;
  badge: string;
  icon: string;
  minSales: number;
  maxSales: number | null;
  commissionBonusRate: number; // percentage
  cashMilestoneBonusUsd: number;
  color: string;
  borderClass: string;
  bgGradient: string;
  glowColor: string;
  perks: string[];
  exclusiveIncentive: string;
}

const REWARD_TIERS: TierDefinition[] = [
  {
    id: 'bronze',
    level: 1,
    name: 'البرونزي الرائد',
    nameEn: 'Bronze Pioneer',
    badge: '🥉 المستوى 1',
    icon: '🥉',
    minSales: 0,
    maxSales: 100,
    commissionBonusRate: 10,
    cashMilestoneBonusUsd: 50,
    color: 'from-amber-700 to-amber-900',
    borderClass: 'border-amber-700/50',
    bgGradient: 'from-amber-950/40 via-slate-950 to-slate-950',
    glowColor: 'rgba(180, 83, 9, 0.2)',
    perks: [
      'عمولة أساسية 10% على كافة منتجات المتجر',
      'لوحة تحكم مباشرة لحساب النقرات والمبيعات',
      'روابط إحالة معتمدة وخاصة بالمسوق',
      'حزم صور بدائية للمنتجات'
    ],
    exclusiveIncentive: 'باقة تدريبية مجانية لإنشاء أول حملة شورتس'
  },
  {
    id: 'silver',
    level: 2,
    name: 'الفضي المتألق',
    nameEn: 'Silver Accelerator',
    badge: '🥈 المستوى 2',
    icon: '🥈',
    minSales: 101,
    maxSales: 500,
    commissionBonusRate: 12,
    cashMilestoneBonusUsd: 250,
    color: 'from-slate-300 to-slate-500',
    borderClass: 'border-slate-400/50',
    bgGradient: 'from-slate-900/60 via-slate-950 to-slate-950',
    glowColor: 'rgba(148, 163, 184, 0.25)',
    perks: [
      'عمولة مرتفعة 12% (+2% بونص إضافي)',
      'سحب أرباح أسبوعي سريع بدون حد أدنى معقد',
      'توليد هوكات إعلانية بذكاء Gemini',
      'دعم فني مخصص عبر واتساب'
    ],
    exclusiveIncentive: 'مكافأة كاش فورية $250 عند إتمام مبيعة 500'
  },
  {
    id: 'gold',
    level: 3,
    name: 'النجم الذهبي الملكي',
    nameEn: 'Royal Gold Star',
    badge: '🌟 المستوى 3',
    icon: '🌟',
    minSales: 501,
    maxSales: 1200,
    commissionBonusRate: 15,
    cashMilestoneBonusUsd: 750,
    color: 'from-amber-400 to-yellow-600',
    borderClass: 'border-amber-400/60',
    bgGradient: 'from-amber-950/50 via-slate-950 to-slate-950',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    perks: [
      'عمولة ذهبية 15% (+5% بونص أرباح)',
      'سحب أرباح فوري خلال 24 ساعة للحساب البنكي',
      'وصول كامل لمكتبة الـ 22 صورة الإمبراطورية فائقة الدقة',
      'مدير حسابات شخصي لتنسيق الحملات الإعلانية'
    ],
    exclusiveIncentive: 'منحة إعلانية $750 لتمويل إعلانات تيك توك'
  },
  {
    id: 'platinum',
    level: 4,
    name: 'البلاتينيوم النخبوي',
    nameEn: 'Platinum Elite Sovereign',
    badge: '⚡ المستوى 4',
    icon: '⚡',
    minSales: 1201,
    maxSales: 2500,
    commissionBonusRate: 18,
    cashMilestoneBonusUsd: 2000,
    color: 'from-cyan-300 to-blue-500',
    borderClass: 'border-cyan-400/60',
    bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-950',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    perks: [
      'عمولة نخبوية 18% (+8% بونص أرباح)',
      'صفحة هبوط مخصصة باسم المسوق وشعاره',
      'توليد فيديوهات 3D ببرومبتات Sora و Higgsfield مجاناً',
      'أولوية شحن المنتجات لعملاء المسوق مع كود خصم حصري'
    ],
    exclusiveIncentive: 'حزمة درع التميز الإمبراطوري + مكافأة $2,000'
  },
  {
    id: 'diamond',
    level: 5,
    name: 'الألماسي الإمبراطوري العظيم',
    nameEn: 'Imperial Grand Diamond',
    badge: '💎 المستوى السيادي الأقصى',
    icon: '💎',
    minSales: 2501,
    maxSales: null,
    commissionBonusRate: 22,
    cashMilestoneBonusUsd: 10000,
    color: 'from-amber-300 via-yellow-400 to-amber-600',
    borderClass: 'border-amber-400 ring-2 ring-amber-400/40',
    bgGradient: 'from-amber-950/70 via-slate-950 to-slate-950',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    perks: [
      'أعلى عمولة في التجارة الإلكترونية 22% (+12% مضاعف)',
      'تحويل بنكي فوري مباشر بلحظتها (Zero Latency Transfer)',
      'دعوة VIP خاصة لحضور مؤتمر MAHER السنوي واللقاء بالسيد ماهر',
      'دخول صندوق الشراكة السيادية وتوزيع الأرباح السنوية',
      'ساعة رولكس ذهبية أو مكافأة كاش سيادية بقيمة $10,000 USD'
    ],
    exclusiveIncentive: 'جائزة الإمبراطورية الكبرى: مكافأة كاش $10,000 + عقد شراكة دائم'
  }
];

interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sales' | 'conversion' | 'volume' | 'viral';
  targetValue: number;
  currentValue: number;
  unit: string;
  unlocked: boolean;
  rewardValue: string;
}

export const AffiliateRewardTiers: React.FC = () => {
  // Simulated Affiliate Progress State
  const [currentSales, setCurrentSales] = useState<number>(845);
  const [selectedTierId, setSelectedTierId] = useState<string>('gold');
  const [claimedRewards, setClaimedRewards] = useState<string[]>(['bronze_bonus', 'silver_bonus']);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Active Tier calculation based on sales
  const currentTier = REWARD_TIERS.find(t => {
    if (t.maxSales === null) return currentSales >= t.minSales;
    return currentSales >= t.minSales && currentSales <= t.maxSales;
  }) || REWARD_TIERS[0];

  // Next Tier calculation
  const currentTierIndex = REWARD_TIERS.findIndex(t => t.id === currentTier.id);
  const nextTier = currentTierIndex < REWARD_TIERS.length - 1 ? REWARD_TIERS[currentTierIndex + 1] : null;

  // Calculate percentage to next tier
  const progressToNextTier = nextTier
    ? Math.min(
        100,
        Math.max(
          0,
          ((currentSales - currentTier.minSales) / ((nextTier.minSales) - currentTier.minSales)) * 100
        )
      )
    : 100;

  const remainingSalesToNext = nextTier ? Math.max(0, nextTier.minSales - currentSales) : 0;

  // Milestone badges list
  const milestoneBadges: MilestoneBadge[] = [
    {
      id: 'm1',
      title: 'وسام الشرارة الأولى ⚡',
      description: 'إتمام أول 50 مبيعة ناجحة بنسبة تقييم 5 نجوم',
      icon: '⚡',
      category: 'sales',
      targetValue: 50,
      currentValue: Math.min(currentSales, 50),
      unit: 'مبيعة',
      unlocked: currentSales >= 50,
      rewardValue: 'بونص $50 كاش'
    },
    {
      id: 'm2',
      title: 'خبير الإقناع والتحويل 🎯',
      description: 'تحقيق معدل تحويل (CR) يتجاوز 5.5% لـ 100 طلب متتالي',
      icon: '🎯',
      category: 'conversion',
      targetValue: 5.5,
      currentValue: 6.4,
      unit: '% تحويل',
      unlocked: true,
      rewardValue: 'ترقية عمولة +1.5%'
    },
    {
      id: 'm3',
      title: 'صانع الترند الفيروسي 🔥',
      description: 'حصد أكثر من 250,000 مشاهدة على فيديو شورتس ترويجي',
      icon: '🔥',
      category: 'viral',
      targetValue: 250000,
      currentValue: 420000,
      unit: 'مشاهدة',
      unlocked: true,
      rewardValue: 'شارة المروج الفيروسي'
    },
    {
      id: 'm4',
      title: 'نادي الـ 10,000 دولار 💰',
      description: 'تجاوز إجمالي مبيعات محققة بقيمة 10,000 دولار',
      icon: '💰',
      category: 'volume',
      targetValue: 10000,
      currentValue: currentSales * 15, // approx $12,675
      unit: '$ مبيعات',
      unlocked: (currentSales * 15) >= 10000,
      rewardValue: 'مكافأة $500 ذهبية'
    },
    {
      id: 'm5',
      title: 'غازي الأسواق العالمية 🌍',
      description: 'تحقيق مبيعات في أكثر من 5 دول مختلفة (أمريكا، الخليج، أوروبا)',
      icon: '🌍',
      category: 'viral',
      targetValue: 5,
      currentValue: 4,
      unit: 'دول',
      unlocked: false,
      rewardValue: 'عمولة دولية مضاعفة'
    },
    {
      id: 'm6',
      title: 'خاتم الإمبراطورية السيادي 👑',
      description: 'الوصول إلى 2,500 مبيعة ودخول دائرة الشركاء الكبار',
      icon: '👑',
      category: 'sales',
      targetValue: 2500,
      currentValue: currentSales,
      unit: 'مبيعة',
      unlocked: currentSales >= 2500,
      rewardValue: 'ساعة رولكس / $10,000'
    }
  ];

  const handleClaimReward = (tierId: string, rewardName: string) => {
    if (!claimedRewards.includes(tierId)) {
      setClaimedRewards(prev => [...prev, tierId]);
      setActionMessage(`تهانينا! تم توثيق وصرف [${rewardName}] وإيداعها مباشرة في سجل أرباحك.`);
      setTimeout(() => setActionMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-6" id="affiliate-reward-tiers-container">
      {/* Royal Obsidian & Gold Super Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/50 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Crown className="w-4 h-4" />
                <span>منظومة الرتب والحوافز الملكية (Imperial Reward Tiers 2026)</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>حوافز كاش تصل إلى $10,000 USD</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-100 via-amber-300 to-amber-500 font-serif">
              سلم ارتقاء المسوقين: من الشعلة الأولى إلى العرش الألماسي
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              تعتمد إمبراطورية MAHER أرقى نماذج التحفيز المالي المباشر؛ فكلما تصاعدت مبيعاتك عبر روابط الإحالة وفيديوهات الشورتس، ارتفعت نسبة عمولتك تلقائياً من <strong>10% حتى 22%</strong> مع جوائز كاش فورية وساعات رولكس وعقود شراكة دائمة.
            </p>
          </div>

          {/* Quick Active Badge Preview */}
          <div className="bg-slate-900/90 border border-amber-500/40 p-4 rounded-2xl shadow-xl flex items-center gap-4 shrink-0 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 text-2xl font-black flex items-center justify-center shadow-lg shadow-amber-500/30 border border-amber-200 ring-2 ring-amber-400/40 shrink-0">
              {currentTier.icon}
            </div>
            <div>
              <div className="text-[11px] text-amber-400 font-bold">رتبتك الحالية في الإمبراطورية:</div>
              <div className="text-base font-black text-slate-100">{currentTier.name}</div>
              <div className="text-xs text-emerald-400 font-mono font-bold">عمولة معتمدة {currentTier.commissionBonusRate}%</div>
            </div>
          </div>
        </div>

        {/* Live Notification Banner */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Personalized Progress Tracker Card */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Tracker Header with Sales Simulator Slider */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>شريط تقدم الأداء والترقية إلى المستوى التالي</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              متابعة مباشرة لعدد مبيعاتك الإجمالية والمسافة المتبقية لبلوغ الترقية التالية
            </p>
          </div>

          {/* Interactive Sales Simulator */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 w-full md:w-auto">
            <div className="text-xs text-slate-300 whitespace-nowrap">
              <span className="text-slate-400 text-[10px] block">محاكاة رصيد المبيعات:</span>
              <strong className="text-amber-400 font-mono text-sm">{currentSales} مبيعة</strong>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="25"
              value={currentSales}
              onChange={(e) => setCurrentSales(parseInt(e.target.value))}
              className="accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer w-40 sm:w-56"
            />
            <button
              onClick={() => setCurrentSales(845)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap"
            >
              إعادة ضبط
            </button>
          </div>
        </div>

        {/* Dual Progress Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-bold">المستوى الحالي: <strong className="text-amber-300">{currentTier.name}</strong></span>
              <span className="bg-amber-500/10 text-amber-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20">
                {currentSales} / {nextTier ? nextTier.minSales : 'مكتمل'} مبيعة
              </span>
            </div>

            {nextTier ? (
              <div className="text-slate-400 text-xs">
                متبقي <strong className="text-emerald-400 font-mono font-bold">{remainingSalesToNext} مبيعة</strong> للوصول إلى <strong className="text-slate-200">{nextTier.name}</strong>
              </div>
            ) : (
              <span className="text-amber-300 font-bold text-xs flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>بلغت أعلى رتبة سيادية في الإمبراطورية!</span>
              </span>
            )}
          </div>

          {/* Luxury Glowing Progress Bar */}
          <div className="w-full bg-slate-950 h-5 rounded-full p-1 border border-slate-800 shadow-inner relative overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 relative shadow-lg shadow-amber-500/40"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextTier}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
            <span>0 مبيعة (بداية الرحلة)</span>
            <span>500 (نجم ذهبي)</span>
            <span>1,200 (بلاتينيوم)</span>
            <span>2,500+ (ألماسي إمبراطوري)</span>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
          {REWARD_TIERS.map((tier, idx) => {
            const isCompleted = currentSales >= (tier.maxSales || tier.minSales);
            const isCurrent = currentTier.id === tier.id;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg ring-1 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-slate-950/80 border-emerald-500/40'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{tier.icon}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-100 truncate">{tier.name}</div>
                <div className="text-[10px] text-amber-300/90 font-mono font-semibold">عمولة {tier.commissionBonusRate}%</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                  {tier.minSales}+ مبيعة
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Reward Tiers Showcase Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-slate-100">تفاصيل الرتب والمزايا الاستثنائية (Tier Hierarchy & Perks)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 مستويات حصرية</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {REWARD_TIERS.map((tier) => {
            const isUnlocked = currentSales >= tier.minSales;
            const isCurrent = currentTier.id === tier.id;
            const isClaimed = claimedRewards.includes(tier.id);

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-5 border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-400 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Ribbon Tag */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-br-2xl shadow">
                    رتبتك النشطة حالياً ✨
                  </div>
                )}

                <div className="space-y-4">
                  {/* Tier Title Strip */}
                  <div className="flex items-start justify-between gap-3 pt-2">
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 font-bold">{tier.badge}</div>
                      <h4 className="text-base font-black text-slate-100 mt-0.5">{tier.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{tier.nameEn}</span>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                      {tier.icon}
                    </div>
                  </div>

                  {/* Commission & Cash Highlights */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">نسبة العمولة</span>
                      <strong className="text-base font-black text-emerald-400 font-mono">{tier.commissionBonusRate}%</strong>
                    </div>
                    <div className="border-r border-slate-800">
                      <span className="text-[10px] text-slate-400 block">مكافأة الكاش</span>
                      <strong className="text-base font-black text-amber-300 font-mono">${tier.cashMilestoneBonusUsd.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">المزايا والحوافز المؤهلة:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {tier.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-[11px] leading-snug">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusive Highlight Incentive Box */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] mb-1">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      <span>الحافز الاستثنائي للرتبة:</span>
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed">
                      {tier.exclusiveIncentive}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleClaimReward(tier.id, tier.exclusiveIncentive)}
                      disabled={isClaimed}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        isClaimed
                          ? 'bg-slate-800 text-emerald-300 border border-emerald-500/30 cursor-default'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>تم استلام وتفعيل الحافز ✓</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5 text-slate-950" />
                          <span>تأكيد واستلام حافز الرتبة 🎁</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span>مغلق • يتطلب {tier.minSales - currentSales} مبيعة إضافية</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Badges Hall of Fame (أوسمة الإنجازات الاستثنائية) */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-black text-slate-100">قاعة الأوسمة والإنجازات الخاصة (Hall of Milestone Badges)</h3>
              <p className="text-xs text-slate-400">إنجازات تمنحك مضاعفات عمولة وجوائز إضافية فورية عند فتحها</p>
            </div>
          </div>

          <span className="text-xs bg-amber-500/10 text-amber-300 px-3 py-1 rounded-xl border border-amber-500/20 font-mono">
            {milestoneBadges.filter(b => b.unlocked).length} / {milestoneBadges.length} أوسمة مكتملة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {milestoneBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.unlocked
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-md'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                badge.unlocked
                  ? 'bg-amber-500/20 border-amber-400/50 shadow-inner'
                  : 'bg-slate-950 border-slate-800'
              }`}>
                {badge.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-black text-slate-100 truncate">{badge.title}</h4>
                  {badge.unlocked ? (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                      مفتوح ✓
                    </span>
                  ) : (
                    <span className="text-[9px] bg-slate-800 text-slate-400 font-bold px-1.5 py-0.5 rounded">
                      قيد الإنجاز
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug mt-1">{badge.description}</p>
                
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">الجائزة: <strong className="text-amber-300">{badge.rewardValue}</strong></span>
                  <span className="font-mono text-slate-400">{badge.currentValue.toLocaleString()} / {badge.targetValue.toLocaleString()} {badge.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sovereign Guarantee & Executive Notice */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-950 to-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300">
        <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="text-amber-300 block font-bold">إشعار القيادة العليا للمسوقين المعتمدين:</strong>
          <span>
            تخضع كافة الحوافز المالية والترقيات لنظام التحكيم الآلي الذكي المشفر من قبل منظومة MAHER.ai، ويتم ترحيل الأرباح والمكافآت تلقائياً لمحفظة المسوق فور تسجيل الطلب وتأكيد الشحن دون أي تدخل يدوي أو تأخير.
          </span>
        </div>
      </div>
    </div>
  );
};
