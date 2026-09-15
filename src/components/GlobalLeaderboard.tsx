import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Award, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Globe, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  DollarSign, 
  Activity, 
  RefreshCw, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck,
  ShoppingBag,
  Share2,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface AffiliateLeaderboardPartner {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  country: string;
  countryFlag: string;
  primaryChannel: string;
  channelIcon: 'tiktok' | 'youtube' | 'instagram' | 'whatsapp' | 'telegram';
  tier: 'imperial_diamond' | 'royal_gold' | 'platinum_elite' | 'gold_star';
  tierLabel: string;
  salesCount: number;
  totalRevenueUsd: number;
  commissionEarnedUsd: number;
  conversionRate: number; // e.g. 5.4%
  growthVelocity: number; // e.g. +38%
  topProduct: string;
  status: 'live_selling' | 'viral_spike' | 'top_earner' | 'active';
  lastSaleMinutesAgo: number;
}

const INITIAL_LEADERBOARD: AffiliateLeaderboardPartner[] = [
  {
    id: 'aff-001',
    rank: 1,
    name: 'أحمد السعدي (الرياض)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    country: 'المملكة العربية السعودية',
    countryFlag: '🇸🇦',
    primaryChannel: 'تيك توك @saadi_tech (420K)',
    channelIcon: 'tiktok',
    tier: 'imperial_diamond',
    tierLabel: '💎 ألماسي إمبراطوري',
    salesCount: 1420,
    totalRevenueUsd: 21300,
    commissionEarnedUsd: 3195,
    conversionRate: 6.8,
    growthVelocity: 44.5,
    topProduct: 'ميكروفون PULUZ اللاسلكي',
    status: 'viral_spike',
    lastSaleMinutesAgo: 2
  },
  {
    id: 'aff-002',
    rank: 2,
    name: 'فارس الشميري (صنعاء/دبي)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    country: 'اليمن / الإمارات',
    countryFlag: '🇾🇪',
    primaryChannel: 'يوتيوب شورتس & واتساب VIP',
    channelIcon: 'youtube',
    tier: 'imperial_diamond',
    tierLabel: '💎 ألماسي إمبراطوري',
    salesCount: 1180,
    totalRevenueUsd: 17700,
    commissionEarnedUsd: 2655,
    conversionRate: 6.2,
    growthVelocity: 38.2,
    topProduct: 'أقمشة الستان والحرير الفاخرة',
    status: 'top_earner',
    lastSaleMinutesAgo: 5
  },
  {
    id: 'aff-003',
    rank: 3,
    name: 'سارة المنصوري (أبوظبي)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    country: 'الإمارات العربية المتحدة',
    countryFlag: '🇦🇪',
    primaryChannel: 'إنستغرام ريلز & سناب شات',
    channelIcon: 'instagram',
    tier: 'royal_gold',
    tierLabel: '👑 ذهبي ملكي',
    salesCount: 940,
    totalRevenueUsd: 14100,
    commissionEarnedUsd: 2115,
    conversionRate: 5.7,
    growthVelocity: 31.0,
    topProduct: 'ميكروفون PULUZ اللاسلكي',
    status: 'live_selling',
    lastSaleMinutesAgo: 8
  },
  {
    id: 'aff-004',
    rank: 4,
    name: 'عمر القحطاني (جدة)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    country: 'المملكة العربية السعودية',
    countryFlag: '🇸🇦',
    primaryChannel: 'تيك توك شوب لايف',
    channelIcon: 'tiktok',
    tier: 'royal_gold',
    tierLabel: '👑 ذهبي ملكي',
    salesCount: 820,
    totalRevenueUsd: 12300,
    commissionEarnedUsd: 1845,
    conversionRate: 5.1,
    growthVelocity: 26.4,
    topProduct: 'مقص الفولاذ الإمبراطوري',
    status: 'active',
    lastSaleMinutesAgo: 14
  },
  {
    id: 'aff-005',
    rank: 5,
    name: 'طارق الزيادي (عدن)',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    country: 'اليمن',
    countryFlag: '🇾🇪',
    primaryChannel: 'تيليجرام وفيسبوك جروبس (180K)',
    channelIcon: 'telegram',
    tier: 'platinum_elite',
    tierLabel: '⚡ بلاتينيوم نخبوي',
    salesCount: 650,
    totalRevenueUsd: 9750,
    commissionEarnedUsd: 1462,
    conversionRate: 4.8,
    growthVelocity: 22.8,
    topProduct: 'طقم ملابس الأطفال الشتوي 3D',
    status: 'live_selling',
    lastSaleMinutesAgo: 19
  },
  {
    id: 'aff-006',
    rank: 6,
    name: 'مها الصالح (الكويت)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    country: 'الكويت',
    countryFlag: '🇰🇼',
    primaryChannel: 'تيك توك فاشن & لايف ستايل',
    channelIcon: 'tiktok',
    tier: 'platinum_elite',
    tierLabel: '⚡ بلاتينيوم نخبوي',
    salesCount: 510,
    totalRevenueUsd: 7650,
    commissionEarnedUsd: 1147,
    conversionRate: 4.4,
    growthVelocity: 19.5,
    topProduct: 'أقمشة الستان والحرير الفاخرة',
    status: 'active',
    lastSaleMinutesAgo: 27
  },
  {
    id: 'aff-007',
    rank: 7,
    name: 'خالد باوزير (حضرموت)',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    country: 'اليمن',
    countryFlag: '🇾🇪',
    primaryChannel: 'مجموعات واتساب التجارية والمتاجر',
    channelIcon: 'whatsapp',
    tier: 'gold_star',
    tierLabel: '🌟 نجم ذهبي',
    salesCount: 420,
    totalRevenueUsd: 6300,
    commissionEarnedUsd: 945,
    conversionRate: 4.1,
    growthVelocity: 16.2,
    topProduct: 'مقص الفولاذ الإمبراطوري',
    status: 'active',
    lastSaleMinutesAgo: 35
  },
  {
    id: 'aff-008',
    rank: 8,
    name: 'ياسمين خليل (الدوحة)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    country: 'قطر',
    countryFlag: '🇶🇦',
    primaryChannel: 'سناب شات وإنستغرام',
    channelIcon: 'instagram',
    tier: 'gold_star',
    tierLabel: '🌟 نجم ذهبي',
    salesCount: 380,
    totalRevenueUsd: 5700,
    commissionEarnedUsd: 855,
    conversionRate: 3.9,
    growthVelocity: 14.0,
    topProduct: 'ميكروفون PULUZ اللاسلكي',
    status: 'active',
    lastSaleMinutesAgo: 42
  }
];

export const GlobalLeaderboard: React.FC = () => {
  const [partners, setPartners] = useState<AffiliateLeaderboardPartner[]>(INITIAL_LEADERBOARD);
  const [timeframe, setTimeframe] = useState<'realtime' | 'week' | 'month' | 'all_time'>('realtime');
  const [regionFilter, setRegionFilter] = useState<'all' | 'gcc' | 'yemen' | 'global'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'revenue' | 'conversion' | 'growth'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('الآن (بث حي ومباشر)');

  // Simulate real-time metric increments
  useEffect(() => {
    const interval = setInterval(() => {
      setPartners((prev) => {
        return prev.map((partner, idx) => {
          // Random slight pulse on top 3
          if (idx < 3 && Math.random() > 0.6) {
            const extraSales = 1;
            const extraRevenue = 15;
            const extraCommission = 2.25;
            return {
              ...partner,
              salesCount: partner.salesCount + extraSales,
              totalRevenueUsd: partner.totalRevenueUsd + extraRevenue,
              commissionEarnedUsd: partner.commissionEarnedUsd + extraCommission,
              lastSaleMinutesAgo: 0
            };
          }
          return partner;
        });
      });
      setLastUpdated(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 600);
  };

  // Filter and sort partners
  const filteredPartners = useMemo(() => {
    return partners
      .filter((partner) => {
        // Search
        const matchesSearch = 
          partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.topProduct.toLowerCase().includes(searchQuery.toLowerCase());

        // Region
        let matchesRegion = true;
        if (regionFilter === 'gcc') {
          matchesRegion = ['المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'الكويت', 'قطر'].some(c => partner.country.includes(c));
        } else if (regionFilter === 'yemen') {
          matchesRegion = partner.country.includes('اليمن');
        } else if (regionFilter === 'global') {
          matchesRegion = true;
        }

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'rank') diff = a.rank - b.rank;
        else if (sortBy === 'revenue') diff = b.totalRevenueUsd - a.totalRevenueUsd;
        else if (sortBy === 'conversion') diff = b.conversionRate - a.conversionRate;
        else if (sortBy === 'growth') diff = b.growthVelocity - a.growthVelocity;

        return sortDirection === 'asc' ? diff : -diff;
      });
  }, [partners, searchQuery, regionFilter, sortBy, sortDirection]);

  // Aggregate Metrics
  const aggregateStats = useMemo(() => {
    const totalSales = partners.reduce((sum, p) => sum + p.salesCount, 0);
    const totalRevenue = partners.reduce((sum, p) => sum + p.totalRevenueUsd, 0);
    const totalCommissions = partners.reduce((sum, p) => sum + p.commissionEarnedUsd, 0);
    const avgConversion = (partners.reduce((sum, p) => sum + p.conversionRate, 0) / partners.length).toFixed(1);

    return { totalSales, totalRevenue, totalCommissions, avgConversion };
  }, [partners]);

  const toggleSort = (field: 'rank' | 'revenue' | 'conversion' | 'growth') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6" id="global-leaderboard-section">
      {/* Sleek Imperial Gold Header Card */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>لوحة الشرف الذهبية العالمية (Global Leaderboard)</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>تحديث حي ولحظي: {lastUpdated}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-100 via-amber-300 to-amber-500 font-serif">
              قائمة نخبة مسوقي إمبراطورية MAHER حول العالم 2026
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              تتبع مباشر لأداء الشركاء والمسوقين الأكثر مبيعاً وتحويلاً لمنتجات الإمبراطورية، وحساب عوائدهم وأرباحهم وفق أعلى معايير الشفافية والتحفيز التنافسي.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span>تحديث البيانات</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-amber-500/20">
          <div className="bg-slate-950/70 border border-amber-500/20 p-3 rounded-2xl">
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <ShoppingBag className="w-3 h-3 text-amber-400" />
              <span>إجمالي مبيعات النخبة:</span>
            </div>
            <div className="text-lg font-black text-amber-300 font-mono">
              {aggregateStats.totalSales.toLocaleString()} <span className="text-xs font-sans text-slate-400">قطعة</span>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/20 p-3 rounded-2xl">
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              <span>حجم التداول المالي:</span>
            </div>
            <div className="text-lg font-black text-emerald-300 font-mono">
              ${aggregateStats.totalRevenue.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/20 p-3 rounded-2xl">
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>عمولات المسوقين الصافية:</span>
            </div>
            <div className="text-lg font-black text-amber-300 font-mono">
              ${aggregateStats.totalCommissions.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/20 p-3 rounded-2xl">
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Activity className="w-3 h-3 text-sky-400" />
              <span>متوسط معدل التحويل:</span>
            </div>
            <div className="text-lg font-black text-sky-300 font-mono">
              {aggregateStats.avgConversion}% <span className="text-xs font-sans text-emerald-400">(+3.2x السوق)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Timeframe, Region, Search & Sort */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Timeframe Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setTimeframe('realtime')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1 ${
              timeframe === 'realtime'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>اليوم (مباشر)</span>
          </button>
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
              timeframe === 'week'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            هذا الأسبوع
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
              timeframe === 'month'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            هذا الشهر
          </button>
          <button
            onClick={() => setTimeframe('all_time')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
              timeframe === 'all_time'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            التراكمي 2026
          </button>
        </div>

        {/* Region & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Region selector */}
          <div className="flex items-center bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
            <Globe className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">كافة الأقاليم والدول</option>
              <option value="gcc" className="bg-slate-900 text-slate-200">الخليج العربي (السعودية، الإمارات، الكويت، قطر)</option>
              <option value="yemen" className="bg-slate-900 text-slate-200">اليمن (صنعاء، عدن، حضرموت)</option>
              <option value="global" className="bg-slate-900 text-slate-200">الأسواق العالمية</option>
            </select>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الدولة، المنتج..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* Sleek Imperial Gold Table */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950 border-b border-amber-500/30 text-amber-300 font-bold uppercase text-[11px] tracking-wider select-none">
              <tr>
                <th 
                  onClick={() => toggleSort('rank')}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>الرتبة</span>
                    {sortBy === 'rank' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-amber-400" /> : <ChevronDown className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                </th>
                <th className="py-3.5 px-4">المسوق والشريك المعتمد</th>
                <th className="py-3.5 px-4">القناة والمنصة</th>
                <th className="py-3.5 px-4">المستوى والتصنيف</th>
                <th 
                  onClick={() => toggleSort('revenue')}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>حجم المبيعات</span>
                    {sortBy === 'revenue' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-amber-400" /> : <ChevronDown className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                </th>
                <th className="py-3.5 px-4">عمولة الشريك 💰</th>
                <th 
                  onClick={() => toggleSort('conversion')}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>معدل التحويل (CR)</span>
                    {sortBy === 'conversion' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-amber-400" /> : <ChevronDown className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('growth')}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>سرعة النمو</span>
                    {sortBy === 'growth' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-amber-400" /> : <ChevronDown className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                </th>
                <th className="py-3.5 px-4">المنتج الأكثر مبيعاً</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/80">
              {filteredPartners.map((partner) => {
                const isTop3 = partner.rank <= 3;

                return (
                  <tr 
                    key={partner.id}
                    className={`transition-all hover:bg-amber-500/5 ${
                      partner.rank === 1 
                        ? 'bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-transparent font-medium' 
                        : partner.rank === 2
                        ? 'bg-gradient-to-r from-slate-400/10 via-slate-900/80 to-transparent'
                        : partner.rank === 3
                        ? 'bg-gradient-to-r from-amber-700/10 via-slate-900/80 to-transparent'
                        : ''
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {partner.rank === 1 ? (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-500/30 border border-amber-200 ring-2 ring-amber-400/40">
                            👑 1
                          </div>
                        ) : partner.rank === 2 ? (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black text-xs flex items-center justify-center shadow border border-slate-300">
                            🥈 2
                          </div>
                        ) : partner.rank === 3 ? (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-xs flex items-center justify-center shadow border border-amber-500/40">
                            🥉 3
                          </div>
                        ) : (
                          <span className="w-7 text-center font-bold text-slate-400 font-mono text-xs">
                            #{partner.rank}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Name & Country */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={partner.avatarUrl} 
                            alt={partner.name} 
                            className={`w-9 h-9 rounded-full object-cover border-2 ${
                              partner.rank === 1 ? 'border-amber-400 shadow-md shadow-amber-400/30' : 'border-slate-700'
                            }`}
                          />
                          {partner.status === 'viral_spike' && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[8px] animate-ping" title="طفرة مبيعات فيروسية">
                              🔥
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-100">
                            <span>{partner.name}</span>
                            <span>{partner.countryFlag}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{partner.country}</span>
                            <span>•</span>
                            <span className="text-emerald-400">آخر مبيعة: منذ {partner.lastSaleMinutesAgo} د</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Primary Channel */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-medium">
                        {partner.channelIcon === 'tiktok' && <span className="text-pink-400 font-bold">TikTok</span>}
                        {partner.channelIcon === 'youtube' && <span className="text-red-400 font-bold">YouTube</span>}
                        {partner.channelIcon === 'instagram' && <span className="text-purple-400 font-bold">Instagram</span>}
                        {partner.channelIcon === 'whatsapp' && <span className="text-emerald-400 font-bold">WhatsApp</span>}
                        {partner.channelIcon === 'telegram' && <span className="text-sky-400 font-bold">Telegram</span>}
                        <span className="text-slate-400 text-[10px] truncate max-w-[120px]">{partner.primaryChannel}</span>
                      </div>
                    </td>

                    {/* Tier Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${
                        partner.tier === 'imperial_diamond' 
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                          : partner.tier === 'royal_gold'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : partner.tier === 'platinum_elite'
                          ? 'bg-slate-200/20 text-slate-200 border-slate-400/40'
                          : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {partner.tierLabel}
                      </span>
                    </td>

                    {/* Total Sales & Revenue */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div>
                        <div className="font-mono font-black text-slate-100 text-sm">
                          ${partner.totalRevenueUsd.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {partner.salesCount} طلب شراء
                        </div>
                      </div>
                    </td>

                    {/* Commission Earned */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-black text-emerald-400 text-sm">
                        ${partner.commissionEarnedUsd.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-emerald-500/80 font-semibold">جاهز للصرف ✓</span>
                    </td>

                    {/* Conversion Rate */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                            style={{ width: `${Math.min(partner.conversionRate * 12, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-amber-300">{partner.conversionRate}%</span>
                      </div>
                    </td>

                    {/* Growth Velocity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        <span>+{partner.growthVelocity}%</span>
                      </span>
                    </td>

                    {/* Top Product */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-slate-300 font-medium text-xs bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                        {partner.topProduct}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty Search State */}
        {filteredPartners.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            لا توجد نتائج تطابق معايير البحث الحالية. حاول تغيير شروط التصفية أو اسم المسوق.
          </div>
        )}

        {/* Table Footer: Imperial Partner Incentive Callout */}
        <div className="bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950 p-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>حافز النخبة الإمبراطوري:</strong> يحصل متصدرو المراكز الثلاثة الأولى أسبوعياً على مكافأة إضافية 5% وترقية حساباتهم إلى شريك معتمد رسمي.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
              مجموع الشركاء المعتمدين: {partners.length + 42} مسوق دولي
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
