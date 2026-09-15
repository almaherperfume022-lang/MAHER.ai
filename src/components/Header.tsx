import React from 'react';
import { NavigationTab } from '../types';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  Video, 
  Users, 
  Smartphone, 
  ShieldCheck, 
  ExternalLink,
  Crown,
  Bot,
  FileText,
  Wallet,
  Youtube,
  Globe2,
  Keyboard
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenHotkeys?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenHotkeys }) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string; hotkey?: string }[] = [
    { id: 'dashboard', label: 'القيادة والاستراتيجية', icon: <LayoutDashboard className="w-4 h-4" />, hotkey: '1' },
    { id: 'global_conquest', label: 'اكتساح الأسواق العالمية', icon: <Globe2 className="w-4 h-4 text-sky-400" />, badge: 'Gemini Omni', hotkey: '4' },
    { id: 'wallet', label: 'محفظة الأرباح (الزلط 80%)', icon: <Wallet className="w-4 h-4 text-emerald-400" />, badge: 'محفظة ذكية', hotkey: '2' },
    { id: 'store', label: 'متجر النخبة (22 صورة)', icon: <ShoppingBag className="w-4 h-4 text-amber-400" />, badge: '6 منتجات', hotkey: '5' },
    { id: 'ai_agent', label: 'الوكيل الاصطناعي', icon: <Bot className="w-4 h-4 text-amber-400" />, badge: '2026 AI', hotkey: '6' },
    { id: 'company_charter', label: 'وثيقة MAHER.ai', icon: <FileText className="w-4 h-4 text-emerald-400" />, badge: 'محكمة' },
    { id: 'campaigns', label: 'الحلول الإعلانية الذكية', icon: <Sparkles className="w-4 h-4" />, badge: 'AI', hotkey: '3' },
    { id: 'tiktok', label: 'فيديو تيك توك السينمائي', icon: <Video className="w-4 h-4" />, hotkey: '7' },
    { id: 'affiliates', label: 'لوحة الشرف وبوابة المسوقين', icon: <Users className="w-4 h-4 text-amber-400" />, badge: '🏆 Leaderboard', hotkey: '8' },
    { id: 'pwa', label: 'تثبيت التطبيق', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'executive_council', label: 'مجلس الإدارة العامة', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Code Ambis' },
  ];

  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-40">
      {/* Top Banner: Protocol & Owner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/40 border-b border-amber-500/10 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300/90 font-medium">
            <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>شركة MAHER للتسويق بالعمولة</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">المالك: <strong className="text-amber-200 font-bold">السيد ماهر غالب سعد حسن</strong></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-[11px]">Code Ambis 4.6 Active</span>
            </div>
            <span className="text-red-400/90 hidden sm:inline">رؤية المليار 2030/6/6 🎯</span>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Seal */}
        <div 
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Royal Logo: Golden Needle with Flowing Red Thread */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/25 transition-all">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
              {/* Flowing Red Silk Thread */}
              <svg viewBox="0 0 40 40" className="w-8 h-8 drop-shadow">
                {/* Red Silk Thread wave */}
                <path
                  d="M 5,28 C 12,38 22,12 35,22 C 38,25 38,32 30,34"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="opacity-90"
                />
                {/* Golden Needle */}
                <line
                  x1="8"
                  y1="34"
                  x2="32"
                  y2="8"
                  stroke="#f59e0b"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                {/* Eye of the needle */}
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

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-500 font-serif">
                إمبراطورية MAHER
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              التسويق بالعمولة والمنتجات الاستهلاكية النخبوية
            </p>
          </div>
        </div>

        {/* Action Buttons: TikTok Account, YouTube Channel & AliExpress Portals */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.tiktok.com/@maher.mmqao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 hover:from-pink-900 hover:to-slate-800 text-pink-200 hover:text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md border border-pink-500/40 transition-all hover:scale-105"
            title="حساب ماهر الرسمي على تيك توك (@maher.mmqao)"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">تيك توك ماهر</span>
            <span className="text-[10px] font-mono text-pink-300">@maher.mmqao</span>
            <ExternalLink className="w-3 h-3 text-pink-300" />
          </a>

          <a
            href="https://www.youtube.com/@MAHERmm.qa1430"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-red-600/25 border border-red-500/40 transition-all hover:scale-105"
            title="قناة ماهر الرسمية على يوتيوب (@MAHERmm.qa1430)"
          >
            <Youtube className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">يوتيوب</span>
            <span className="text-[10px] font-mono text-red-200">@MAHERmm</span>
            <ExternalLink className="w-3 h-3 text-red-200" />
          </a>

          <a
            href="https://portals.aliexpress.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold px-2.5 py-2 rounded-xl border border-slate-700 shadow-sm transition-all"
            title="بوابة علي إكسبريس الرسمية للشركاء"
          >
            <span className="hidden md:inline">AliExpress Portals</span>
            <span className="md:hidden">Portals</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Hotkeys Quick Trigger Button */}
          {onOpenHotkeys && (
            <button
              onClick={onOpenHotkeys}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-700 hover:border-amber-500/40 shadow-sm transition-all group"
              title="اختصارات لوحة المفاتيح السريعة (Hotkeys) - اضغط [?]"
            >
              <Keyboard className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 border border-slate-700 rounded text-amber-300">?</kbd>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar (Scrollable on mobile) */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar border-t border-slate-800/80">
        <nav className="flex items-center gap-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.hotkey && (
                  <kbd className={`hidden lg:inline-block text-[9px] font-mono px-1 py-0.2 rounded border ${
                    isActive 
                      ? 'bg-amber-400/20 text-amber-200 border-amber-400/40' 
                      : 'bg-slate-950/60 text-slate-500 border-slate-800'
                  }`}>
                    {item.hotkey}
                  </kbd>
                )}
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-500/25 text-amber-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
