import React, { useState } from 'react';
import { MarketerApplication } from '../types';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Calculator,
  UserPlus,
  Sparkles,
  Trophy,
  Crown
} from 'lucide-react';
import { GlobalLeaderboard } from './GlobalLeaderboard';
import { AffiliateRewardTiers } from './AffiliateRewardTiers';

export const AffiliatePortalView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'tiers' | 'leaderboard' | 'calculator' | 'registration'>('tiers');
  const [dailySalesTarget, setDailySalesTarget] = useState<number>(15);
  const [avgCommissionUsd, setAvgCommissionUsd] = useState<number>(2.5);

  // Application form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('اليمن / السعودية / الخليج');
  const [socialPlatforms, setSocialPlatforms] = useState('TikTok & Facebook');
  const [submitted, setSubmitted] = useState(false);

  const [applicants, setApplicants] = useState<MarketerApplication[]>([
    {
      id: 'app-1',
      fullName: 'أحمد السعدي',
      phone: '+966 50 123 4567',
      email: 'ahmed@example.com',
      country: 'المملكة العربية السعودية',
      socialPlatforms: 'تيك توك (85K متابع)',
      monthlyTargetRevenue: 2500,
      status: 'active',
      registeredAt: '2026-09-08'
    },
    {
      id: 'app-2',
      fullName: 'فارس الشميري',
      phone: '+967 77 987 6543',
      email: 'fares@example.com',
      country: 'اليمن',
      socialPlatforms: 'فيسبوك ومجموعات واتساب',
      monthlyTargetRevenue: 1200,
      status: 'active',
      registeredAt: '2026-09-10'
    }
  ]);

  // Calculations
  const dailyProfit = dailySalesTarget * avgCommissionUsd;
  const monthlyProfit = dailyProfit * 30;
  const yearlyProfit = monthlyProfit * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newApp: MarketerApplication = {
      id: `marketer-${Date.now()}`,
      fullName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'لم يُحدد',
      country,
      socialPlatforms,
      monthlyTargetRevenue: monthlyProfit,
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setApplicants([newApp, ...applicants]);
    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>بوابة انضمام نخبة المسوقين (SCREEN_111)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            جيش مسوقي إمبراطورية MAHER تحت إشراف الإدارة العامة
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            منصة تأهيل، تدريب، وحساب عوائد المسوقين بالعمولة نحو تحقيق رؤية المليار في 2030/6/6
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block">المسوقون المعتمدون</span>
          <span className="text-xl font-extrabold text-amber-400">{applicants.length + 42} مسوق نشط</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveSection('tiers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
            activeSection === 'tiers'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>مستويات ورتب الحوافز الملكية (Reward Tiers)</span>
          <span className="bg-amber-400/30 text-amber-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">حوافز $10K</span>
        </button>

        <button
          onClick={() => setActiveSection('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
            activeSection === 'leaderboard'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>لوحة الشرف العالمية (Leaderboard)</span>
          <span className="bg-emerald-400/30 text-emerald-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">حي ومباشر</span>
        </button>

        <button
          onClick={() => setActiveSection('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
            activeSection === 'calculator'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>حاسبة أرباح المسوق التفاعلية</span>
        </button>

        <button
          onClick={() => setActiveSection('registration')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
            activeSection === 'registration'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>تسجيل مسوق جديد والشروط</span>
        </button>
      </div>

      {/* Section 0: Reward Tiers & Milestones */}
      {activeSection === 'tiers' && (
        <AffiliateRewardTiers />
      )}

      {/* Section 1: Global Leaderboard */}
      {activeSection === 'leaderboard' && (
        <GlobalLeaderboard />
      )}

      {/* Section 2: Simulator & Profit Calculator */}
      {(activeSection === 'calculator' || activeSection === 'leaderboard') && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>حاسبة أرباح المسوق الاستراتيجية (محاكاة العوائد)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span>عدد المبيعات اليومية المتوقعة عبر روابطك:</span>
                  <span className="font-extrabold text-amber-400 text-sm">{dailySalesTarget} مبيعة / يوم</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={dailySalesTarget}
                  onChange={(e) => setDailySalesTarget(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 مبيعة (مبتدئ)</span>
                  <span>25 مبيعة</span>
                  <span>50 مبيعة</span>
                  <span>100+ مبيعة (محترف)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span>متوسط العمولة لكل مبيعة بالدولار:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">${avgCommissionUsd.toFixed(2)} USD</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.25"
                  value={avgCommissionUsd}
                  onChange={(e) => setAvgCommissionUsd(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$1 (منتج عادي)</span>
                  <span>$2.5 (مايك PULUZ)</span>
                  <span>$5+ (أقمشة وستان نخبوي)</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/90 text-center items-center">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 block">الربح اليومي</span>
                <div className="text-lg font-black text-slate-100">${dailyProfit.toFixed(0)}</div>
                <span className="text-[10px] text-slate-500">~{(dailyProfit * 3.75).toFixed(0)} ريال</span>
              </div>

              <div className="space-y-1 border-x border-slate-800 px-2">
                <span className="text-[11px] text-amber-400 font-bold block">الربح الشهري 💰</span>
                <div className="text-2xl font-black text-amber-400">${monthlyProfit.toFixed(0)}</div>
                <span className="text-[10px] text-amber-300/70">~{(monthlyProfit * 3.75).toFixed(0)} ريال</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-emerald-400 font-bold block">الربح السنوي 🚀</span>
                <div className="text-xl font-black text-emerald-400">${yearlyProfit.toFixed(0)}</div>
                <span className="text-[10px] text-emerald-300/70">~{(yearlyProfit * 3.75).toFixed(0)} ريال</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Marketer Application Form + Rules of Management */}
      {(activeSection === 'registration' || activeSection === 'leaderboard') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form: Register New Marketer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-sm border-b border-slate-800 pb-3">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>تسجيل مسوق جديد في إمبراطورية MAHER</span>
          </div>

          {submitted && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>تم اعتماد طلب التسجيل بنجاح وإدراجه في قائمة النخبة!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">الاسم الكامل للمسوق</label>
              <input
                type="text"
                required
                placeholder="مثال: عبد الله ناصر"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">رقم الهاتف / الواتساب</label>
                <input
                  type="tel"
                  required
                  placeholder="+967 أو +966..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">البلد / المنطقة</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">المنصات التسويقية التي تنشط فيها</label>
              <input
                type="text"
                value={socialPlatforms}
                onChange={(e) => setSocialPlatforms(e.target.value)}
                placeholder="تيك توك، فيسبوك، مجموعات واتساب، تيليجرام..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 rounded-lg shadow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>تقديم طلب الانضمام لنخبة المسوقين</span>
            </button>
          </form>
        </div>

        {/* Management Rules & Guarantees */}
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>معايير وشروط العمل تحت مظلة شركة MAHER</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>أمان وتتبع الروابط:</strong> كافة الروابط موثقة بنظام كوكيز علي إكسبريس (Cookies Attribution)، وتضمن احتساب كل عمليات الشراء التي تتم عبر جهاز الزبون.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>عمولة السلة الكاملة:</strong> إذا اشترى الزبون منتجات أخرى في نفس سلة الشراء، تحصل على عمولة إضافية على كافة المشتريات.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>المصداقية والأمانة:</strong> يُمنع نشر إعلانات مضللة؛ نعتمد فقط على إبراز المميزات الحقيقية للمنتج وتجارب الاستخدام الواقعية.</span>
            </div>

            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-300 text-[11px] italic">
              "هدفنا تمكين كل مسوق جاد من بناء دخل شهري يتجاوز 1,000$ دولار بكل استقلالية، للمساهمة في تحقيق هدف 2030." — الإدارة العامة
            </div>
          </div>

          {/* Active Applicants List */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-2">أحدث المسوقين المنضمين:</span>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {applicants.map((a) => (
                <div key={a.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200 block">{a.fullName}</span>
                    <span className="text-[10px] text-slate-400">{a.socialPlatforms} • {a.country}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                    معتمد ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
