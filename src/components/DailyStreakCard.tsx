import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Calendar, Zap, CheckCircle2, ChevronRight, HelpCircle, RotateCcw } from 'lucide-react';
import { DailyStreakData } from '../types';
import { simulateConsecutiveDay, resetDailyStreak, recordDailyPlay } from '../utils/dailyStreak';

interface DailyStreakCardProps {
  dailyStreak: DailyStreakData;
  onUpdateStreak: (newStreak: DailyStreakData) => void;
  compact?: boolean;
}

export const DailyStreakCard: React.FC<DailyStreakCardProps> = ({
  dailyStreak,
  onUpdateStreak,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSimulateMenu, setShowSimulateMenu] = useState(false);

  const streakDays = dailyStreak.streakCount;
  const isBackToBack = dailyStreak.isBackToBack && streakDays >= 2;
  const bonusPct = Math.round((dailyStreak.bonusMultiplier - 1) * 100);

  const milestones = [
    { day: 1, mult: '1.0x', bonus: 'الأساس', labelEn: 'Base' },
    { day: 2, mult: '1.25x', bonus: '+25%', labelEn: '+25%' },
    { day: 3, mult: '1.50x', bonus: '+50%', labelEn: '+50%' },
    { day: 4, mult: '1.75x', bonus: '+75%', labelEn: '+75%' },
    { day: 5, mult: '2.0x', bonus: '2x مضاعف', labelEn: '2x Double' },
  ];

  const handleSimulate = (targetDay: number) => {
    const updated = simulateConsecutiveDay(targetDay);
    onUpdateStreak(updated);
    setShowSimulateMenu(false);
  };

  const handleReset = () => {
    const reset = resetDailyStreak();
    onUpdateStreak(reset);
    setShowSimulateMenu(false);
  };

  if (compact) {
    return (
      <div className="relative inline-block">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md active:scale-95 ${
            isBackToBack
              ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-amber-400/50 text-amber-300 shadow-amber-500/20'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
          }`}
          title="سلسلة اللعب اليومية (Daily Streak)"
        >
          <motion.div
            animate={
              isBackToBack
                ? {
                    scale: [1, 1.25, 1],
                    rotate: [0, -6, 6, 0],
                  }
                : {}
            }
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Flame
              className={`w-4 h-4 ${
                isBackToBack ? 'text-amber-400 fill-amber-400' : 'text-slate-400'
              }`}
            />
          </motion.div>
          <span className="font-mono">{streakDays}</span>
          <span className="text-[11px] opacity-90 hidden xs:inline">يوم</span>

          {isBackToBack && (
            <span className="ml-1 px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
              +{bonusPct}%
            </span>
          )}
        </button>

        {/* Dropdown Popup */}
        <AnimatePresence>
          {showDetails && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDetails(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-80 p-4 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-50 text-right"
                dir="rtl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Flame className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">
                        سلسلة اللعب اليومية
                      </h4>
                      <p className="text-[11px] text-slate-400">Daily Play Streak</p>
                    </div>
                  </div>
                  <div className="text-left font-mono font-black text-amber-400 text-lg">
                    {dailyStreak.bonusMultiplier}x
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {isBackToBack ? (
                    <span className="text-amber-300 font-semibold">
                      🔥 رائع! تلعب لأيام متتالية وتحصل على مضاعف إضافي{' '}
                      <span className="font-bold text-amber-400">+{bonusPct}%</span> على جميع
                      النقاط!
                    </span>
                  ) : (
                    <span>
                      العب يومياً على التوالي لتحصل على مضاعف نقاط إضافي يبدأ من{' '}
                      <strong className="text-amber-400">+25% في اليوم الثاني</strong> ويصل إلى{' '}
                      <strong className="text-amber-400">2x (الضعف)</strong> في اليوم الخامس!
                    </span>
                  )}
                </p>

                {/* Milestone mini dots */}
                <div className="grid grid-cols-5 gap-1.5 text-center mb-3">
                  {milestones.map((m) => {
                    const isPassed = streakDays >= m.day;
                    const isCurrent = streakDays === m.day;
                    return (
                      <div
                        key={m.day}
                        className={`p-1.5 rounded-xl border transition ${
                          isCurrent
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                            : isPassed
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-800/50 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="text-[10px] font-bold">يوم {m.day}</div>
                        <div className="font-mono text-xs font-black">{m.mult}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Simulation Buttons for Testing */}
                <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 text-[10px]">تجربة واختبار:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSimulate(2)}
                      className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition"
                      title="محاكاة أنك لعبت أمس لاختبار مضاعف اليوم الثاني (x1.25)"
                    >
                      يوم 2 (x1.25)
                    </button>
                    <button
                      onClick={() => handleSimulate(5)}
                      className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-medium transition"
                      title="محاكاة أنك لعبت 5 أيام متتالية لاختبار مضاعف 2x"
                    >
                      يوم 5 (2x)
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                      title="إعادة ضبط السلسلة"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Large setup screen card
  return (
    <div
      id="daily-streak-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-xl text-right"
      dir="rtl"
    >
      {/* Background radial glow */}
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border ${
                  isBackToBack
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-300/50 shadow-amber-500/30 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Flame
                  className={`w-6 h-6 ${
                    isBackToBack ? 'fill-white text-white animate-pulse' : 'text-slate-400'
                  }`}
                />
              </div>
              {isBackToBack && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  سلسلة اللعب اليومية
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold font-mono">
                  {streakDays} {streakDays === 1 ? 'يوم' : streakDays === 2 ? 'يومان' : 'أيام'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBackToBack
                  ? `أنت في سلسلة متتالية! تحصل على مضاعف إضافي +${bonusPct}% على جميع نقاطك`
                  : 'العب يومياً على التوالي لتحصل على مضاعفات نقاط إضافية تصل إلى 2x'}
              </p>
            </div>
          </div>

          {/* Current Active Multiplier Pill */}
          <div className="flex items-center gap-2">
            <div className="text-left px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">
                مضاعف السلسلة اليومي
              </div>
              <div className="text-xl font-mono font-black text-amber-400 flex items-center gap-1">
                <span>{dailyStreak.bonusMultiplier}x</span>
                {isBackToBack && (
                  <span className="text-xs font-bold text-emerald-400 font-sans">
                    (+{bonusPct}%)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-2">
          {milestones.map((m) => {
            const isCompleted = streakDays > m.day;
            const isCurrent = streakDays === m.day;

            return (
              <div
                key={m.day}
                className={`relative rounded-2xl p-2.5 sm:p-3 border text-center transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Flame
                      className={`w-4 h-4 ${
                        isCurrent
                          ? 'text-amber-400 fill-amber-400 animate-bounce'
                          : 'text-slate-600'
                      }`}
                    />
                  )}
                </div>

                <div className="text-xs font-bold text-slate-200">
                  اليوم {m.day}
                </div>

                <div
                  className={`font-mono font-black text-xs sm:text-sm mt-0.5 ${
                    isCurrent
                      ? 'text-amber-300'
                      : isCompleted
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {m.mult}
                </div>

                <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {m.bonus}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions & Testing Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/70 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {dailyStreak.lastPlayedDate
                ? `آخر مشاركة: ${dailyStreak.lastPlayedDate}`
                : 'أول لعبة اليوم ستبدأ سلسلتك!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">أدوات الاختبار والمحاكاة:</span>
            <button
              onClick={() => handleSimulate(2)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs transition"
              title="محاكاة أنك لعبت بالأمس لتفعيل مضاعف اليوم الثاني (+25%) فوراً"
            >
              محاكاة يومين متتاليين (x1.25)
            </button>
            <button
              onClick={() => handleSimulate(3)}
              className="px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 font-semibold text-xs transition"
              title="محاكاة 3 أيام متتالية (x1.50)"
            >
              3 أيام (x1.50)
            </button>
            <button
              onClick={() => handleSimulate(5)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-semibold text-xs transition"
              title="محاكاة 5 أيام متتالية (x2.0)"
            >
              5 أيام (x2.0)
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
              title="إعادة ضبط السلسلة اليومية للبداية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
