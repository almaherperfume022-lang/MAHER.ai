import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { 
  Building2, 
  Baby, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface MonthlyTransferData {
  monthKey: string;
  monthName: string;
  kidsVideoRevenue: number;     // Total revenue from Kids 3D Videos (YouTube / TikTok)
  transferredToBank: number;    // 80% Owner share transferred to bank account
  reinvestedProduction: number; // 20% Operations & AI Development
  viewsMillion: number;         // Video views in millions
  payoutStatus: 'مكتمل ومودع في البنك' | 'جاري التحويل للبنك' | 'مستهدف متوقع';
}

const MONTHLY_TRANSFER_HISTORY: MonthlyTransferData[] = [
  {
    monthKey: '2026-01',
    monthName: 'يناير 2026',
    kidsVideoRevenue: 850,
    transferredToBank: 680,
    reinvestedProduction: 170,
    viewsMillion: 0.9,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-02',
    monthName: 'فبراير 2026',
    kidsVideoRevenue: 1420,
    transferredToBank: 1136,
    reinvestedProduction: 284,
    viewsMillion: 1.6,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-03',
    monthName: 'مارس 2026',
    kidsVideoRevenue: 2350,
    transferredToBank: 1880,
    reinvestedProduction: 470,
    viewsMillion: 2.8,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-04',
    monthName: 'أبريل 2026',
    kidsVideoRevenue: 3800,
    transferredToBank: 3040,
    reinvestedProduction: 760,
    viewsMillion: 4.4,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-05',
    monthName: 'مايو 2026',
    kidsVideoRevenue: 5100,
    transferredToBank: 4080,
    reinvestedProduction: 1020,
    viewsMillion: 6.1,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-06',
    monthName: 'يونيو 2026',
    kidsVideoRevenue: 6950,
    transferredToBank: 5560,
    reinvestedProduction: 1390,
    viewsMillion: 8.5,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-07',
    monthName: 'يوليو 2026',
    kidsVideoRevenue: 8600,
    transferredToBank: 6880,
    reinvestedProduction: 1720,
    viewsMillion: 10.8,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-08',
    monthName: 'أغسطس 2026',
    kidsVideoRevenue: 11400,
    transferredToBank: 9120,
    reinvestedProduction: 2280,
    viewsMillion: 14.5,
    payoutStatus: 'مكتمل ومودع في البنك'
  },
  {
    monthKey: '2026-09',
    monthName: 'سبتمبر 2026 (الحالي)',
    kidsVideoRevenue: 15200,
    transferredToBank: 12160,
    reinvestedProduction: 3040,
    viewsMillion: 19.2,
    payoutStatus: 'جاري التحويل للبنك'
  }
];

export const KidsProfitBankTransferChart: React.FC = () => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [activeMetric, setActiveMetric] = useState<'all' | 'bank_only'>('all');

  // Calculations
  const totalKidsRevenue = MONTHLY_TRANSFER_HISTORY.reduce((acc, m) => acc + m.kidsVideoRevenue, 0);
  const totalTransferredToBank = MONTHLY_TRANSFER_HISTORY.reduce((acc, m) => acc + m.transferredToBank, 0);
  const totalViews = MONTHLY_TRANSFER_HISTORY.reduce((acc, m) => acc + m.viewsMillion, 0);
  const latestMonth = MONTHLY_TRANSFER_HISTORY[MONTHLY_TRANSFER_HISTORY.length - 1];

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header section with KPIs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-pink-400 mb-1">
            <Baby className="w-4 h-4 text-pink-400" />
            <span>تقرير تحويل أرباح فيديوهات الأطفال (Kids 3D Animation → Bank Vault)</span>
            <span className="text-slate-600">•</span>
            <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
              IBAN Verified
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
            <span>مسار تحويل عوائد شورتس الأطفال 3D من المحفظة إلى الحساب البنكي</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            رسم بياني تفاعلي يوضح تتبع الإيرادات الشهرية الناتجة من قنوات يوتيوب شورتس وتيك توك للأطفال، وقيمة المبالغ المحولة كاش إلى حساب السيد ماهر غالب البنكي بنسبة (80%) بحسب ميثاق وعقد الشراكة.
          </p>
        </div>

        {/* View Toggle Controls */}
        <div className="flex items-center gap-2 self-start lg:self-auto bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              chartType === 'area'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            مساحة انسيابية (Area)
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              chartType === 'bar'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            أعمدة مقارنة (Bars)
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Stat 1: Total Bank Transfers */}
        <div className="bg-slate-950/80 border border-emerald-500/30 p-3.5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              حصة المالك البنكية (80%)
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
            ${totalTransferredToBank.toLocaleString('en-US')}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            محول نقداً لحساب المالك
          </span>
        </div>

        {/* Stat 2: Total Gross Kids Revenue */}
        <div className="bg-slate-950/80 border border-pink-500/30 p-3.5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-bold text-pink-400 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5" />
              إجمالي إيراد فيديوهات 3D
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-pink-300 font-mono">
            ${totalKidsRevenue.toLocaleString('en-US')}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            من AdSense ومكافآت المشاهدات
          </span>
        </div>

        {/* Stat 3: Current Month Transfer */}
        <div className="bg-slate-950/80 border border-amber-500/30 p-3.5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              تحويل هذا الشهر (سبتمبر)
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
            ${latestMonth.transferredToBank.toLocaleString('en-US')}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            جاهز للصرف البنكي
          </span>
        </div>

        {/* Stat 4: Total Accumulated Views */}
        <div className="bg-slate-950/80 border border-sky-500/30 p-3.5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-bold text-sky-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              المشاهدات التراكمية
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-sky-300 font-mono">
            {totalViews.toFixed(1)}M+
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            مشاهدة Shorts وTikTok
          </span>
        </div>
      </div>

      {/* Interactive Recharts Graph */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">
              تطور الإيراد الشهري والتحويل البنكي الفعلي ($ USD)
            </span>
          </div>

          {/* Metric Selector Filter */}
          <div className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeMetric === 'all'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              عرض كافة البنود (إجمالي، بنك 80%، تشغيل 20%)
            </button>
            <button
              onClick={() => setActiveMetric('bank_only')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeMetric === 'bank_only'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              المحول للبنك فقط (80%)
            </button>
          </div>
        </div>

        <div className="h-72 sm:h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart
                data={MONTHLY_TRANSFER_HISTORY}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorKidsGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBankTransfer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorReinvest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="monthName" 
                  stroke="#64748b" 
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  tickFormatter={(val) => `$${val}`}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MonthlyTransferData;
                      return (
                        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl shadow-2xl text-right text-xs space-y-1.5 font-sans" dir="rtl">
                          <p className="font-bold text-amber-300 border-b border-slate-800 pb-1 flex items-center justify-between">
                            <span>📅 {label}</span>
                            <span className="text-[10px] text-pink-400 font-mono">{data.viewsMillion}M مشاهدة</span>
                          </p>
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between gap-4 text-emerald-400 font-bold">
                              <span>🏦 محول لحساب المالك (80%):</span>
                              <span className="font-mono">${data.transferredToBank.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-pink-300 font-semibold">
                              <span>🎬 إجمالي إيراد الأطفال:</span>
                              <span className="font-mono">${data.kidsVideoRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-sky-400 text-[11px]">
                              <span>⚡ التشغيل والتطوير (20%):</span>
                              <span className="font-mono">${data.reinvestedProduction.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>حالة التحويل: {data.payoutStatus}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} 
                  formatter={(value) => {
                    if (value === 'transferredToBank') return 'حصة المالك البنكية (80%) 🏦';
                    if (value === 'kidsVideoRevenue') return 'إجمالي إيرادات فيديوهات 3D 🎬';
                    if (value === 'reinvestedProduction') return 'تشغيل وتطوير المنظومة (20%) ⚡';
                    return value;
                  }}
                />
                {activeMetric === 'all' && (
                  <Area
                    type="monotone"
                    dataKey="kidsVideoRevenue"
                    stroke="#ec4899"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorKidsGross)"
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="transferredToBank"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBankTransfer)"
                />
                {activeMetric === 'all' && (
                  <Area
                    type="monotone"
                    dataKey="reinvestedProduction"
                    stroke="#0ea5e9"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorReinvest)"
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart
                data={MONTHLY_TRANSFER_HISTORY}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="monthName" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `$${val}`} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MonthlyTransferData;
                      return (
                        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl shadow-2xl text-right text-xs space-y-1.5 font-sans" dir="rtl">
                          <p className="font-bold text-amber-300 border-b border-slate-800 pb-1">
                            📅 {label} ({data.viewsMillion}M مشاهدة)
                          </p>
                          <div className="flex items-center justify-between gap-4 text-emerald-400 font-bold">
                            <span>🏦 محول للبنك (80%):</span>
                            <span className="font-mono">${data.transferredToBank.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-pink-300">
                            <span>🎬 إجمالي إيراد الأطفال:</span>
                            <span className="font-mono">${data.kidsVideoRevenue.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} 
                  formatter={(value) => {
                    if (value === 'transferredToBank') return 'حصة المالك البنكية (80%) 🏦';
                    if (value === 'kidsVideoRevenue') return 'إجمالي إيرادات فيديوهات 3D 🎬';
                    return value;
                  }}
                />
                <Bar dataKey="kidsVideoRevenue" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="transferredToBank" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Direct Bank Transfer Workflow Box */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">
              دورة التحويل البنكي الآلي (AdSense / TikTok Fund → Bank Account)
            </div>
            <p className="text-[11px] text-slate-300">
              يتم إيداع العوائد شهرياً بتاريخ 21-26 تلقائياً إلى حساب السيد ماهر غالب بعد اعتماد الوثائق وميثاق الشراكة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            النسبة البنكية للمالك: 80% صافي
          </span>
        </div>
      </div>
    </div>
  );
};
