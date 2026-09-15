import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Share, 
  MoreVertical, 
  Zap, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const PwaInstallView: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Smartphone className="w-3.5 h-3.5" />
            <span>بوابة الوصول السريع وتثبيت التطبيق (SCREEN_62)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            تثبيت تطبيق شركة MAHER على هاتفك كـتطبيق أصلي
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            احصل على أيقونة الإمبراطورية الملكية على شاشة هاتفك الرئيسية للوصول الفوري ومتابعة أرباحك
          </p>
        </div>

        {deferredPrompt && !isInstalled && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs shadow-xl shadow-amber-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>تثبيت التطبيق على الجهاز الآن</span>
          </button>
        )}
      </div>

      {/* App Icon & Live Preview Showcase */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        {/* App Icon Display */}
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-1 shadow-2xl flex-shrink-0">
          <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-14 h-14 drop-shadow">
              <path
                d="M 5,28 C 12,38 22,12 35,22 C 38,25 38,32 30,34"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="34"
                x2="32"
                y2="8"
                stroke="#f59e0b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <ellipse
                cx="29"
                cy="11"
                rx="1.5"
                ry="3.5"
                transform="rotate(45 29 11)"
                fill="#020617"
                stroke="#fde68a"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2 text-center md:text-right">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-100">تطبيق MAHER Empire للهواتف الذكية</h3>
            <span className="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
              PWA Progressive Web App
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            تطبيق خفيف وسريع، يعمل بدون استهلاك ذاكرة الهاتف، ويوفر لك وصولاً سريعاً لروابط التسويق، توليد الإعلانات الذكية، ومتابعة الأرباح في أي وقت وأي مكان.
          </p>
        </div>
      </div>

      {/* Visual Installation Guides (Android vs iPhone) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Android Guide */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-3">
            <Smartphone className="w-4 h-4" />
            <span>خطوات التثبيت على أجهزة أندرويد (Google Chrome)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">افتح قائمة المتصفح (⋮):</strong>
                <span className="text-slate-400">اضغط على زر الخيارات (الثلاث نقاط) في الزاوية العلوية لمتصفح كروم.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">اختر "تثبيت التطبيق" أو "الإضافة للشاشة":</strong>
                <span className="text-slate-400">انقر على خيار "Install app" أو "Add to Home screen".</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">✓</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">اكتمل التثبيت:</strong>
                <span className="text-slate-400">ستظهر أيقونة التطبيق فوراً على شاشة هاتفك مع سائر تطبيقاتك!</span>
              </div>
            </div>
          </div>
        </div>

        {/* iPhone (iOS Safari) Guide */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm border-b border-slate-800 pb-3">
            <Share className="w-4 h-4" />
            <span>خطوات التثبيت على أجهزة آيفون (Apple Safari)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">افتح الموقع عبر سفاري (Safari):</strong>
                <span className="text-slate-400">تأكد من فتح الرابط في متصفح سفاري الرسمي لشركة آبل.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">اضغط على زر المشاركة السفلي (⎙):</strong>
                <span className="text-slate-400">انقر على أيقونة المشاركة (المربع الذي يخرج منه سهم للأعلى).</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <strong className="text-slate-200 block mb-0.5">اختر "إضافة إلى الشاشة الرئيسية":</strong>
                <span className="text-slate-400">انزل في القائمة واضغط "Add to Home Screen" ثم "إضافة (Add)".</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
