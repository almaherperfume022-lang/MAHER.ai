import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Trophy, Zap } from 'lucide-react';

interface ScoreMultiplierBadgeProps {
  score: number;
  streak: number;
  lastPointsEarned?: number | null;
  doublePointsActive?: boolean;
  dailyMultiplier?: number;
  dailyStreakCount?: number;
}

export const ScoreMultiplierBadge: React.FC<ScoreMultiplierBadgeProps> = ({
  score,
  streak,
  lastPointsEarned,
  doublePointsActive = false,
  dailyMultiplier = 1.0,
  dailyStreakCount = 1,
}) => {
  const [prevStreak, setPrevStreak] = useState(streak);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [displayedFloatingPoints, setDisplayedFloatingPoints] = useState<{
    points: number;
    multiplier: number;
    dailyMultiplier: number;
    id: number;
  } | null>(null);

  // Trigger burst & upgrade animation when streak increases
  useEffect(() => {
    if (streak > prevStreak && streak >= 2) {
      setIsUpgrading(true);
      const timer = setTimeout(() => setIsUpgrading(false), 1200);
      return () => clearTimeout(timer);
    }
    setPrevStreak(streak);
  }, [streak, prevStreak]);

  // Handle floating points animation when points are earned
  useEffect(() => {
    if (lastPointsEarned && lastPointsEarned > 0) {
      const activeMultiplier = streak >= 2 ? streak : 1;
      setDisplayedFloatingPoints({
        points: lastPointsEarned,
        multiplier: activeMultiplier,
        dailyMultiplier,
        id: Date.now(),
      });

      const timer = setTimeout(() => {
        setDisplayedFloatingPoints(null);
      }, 2400);

      return () => clearTimeout(timer);
    }
  }, [lastPointsEarned, streak, dailyMultiplier]);

  // Determine badge styling based on streak level
  const getBadgeConfig = (currentStreak: number) => {
    if (currentStreak >= 5) {
      return {
        label: `x${currentStreak}`,
        subtext: 'GODLIKE',
        gradient: 'from-fuchsia-500 via-rose-500 to-amber-400',
        textColor: 'text-white',
        ringColor: 'ring-rose-400/80 shadow-rose-500/50',
        glowColor: 'bg-rose-500/25',
        iconColor: 'text-amber-200 fill-amber-300',
      };
    }
    if (currentStreak >= 4) {
      return {
        label: `x${currentStreak}`,
        subtext: 'UNSTOPPABLE',
        gradient: 'from-rose-500 via-orange-500 to-amber-400',
        textColor: 'text-white',
        ringColor: 'ring-rose-400/70 shadow-rose-500/40',
        glowColor: 'bg-orange-500/20',
        iconColor: 'text-amber-200 fill-amber-300',
      };
    }
    if (currentStreak === 3) {
      return {
        label: 'x3',
        subtext: 'ON FIRE',
        gradient: 'from-orange-500 to-amber-400',
        textColor: 'text-slate-950 font-black',
        ringColor: 'ring-orange-400/60 shadow-orange-500/35',
        glowColor: 'bg-amber-500/20',
        iconColor: 'text-slate-950 fill-slate-950',
      };
    }
    // streak === 2
    return {
      label: 'x2',
      subtext: 'HOT STREAK',
      gradient: 'from-amber-400 to-yellow-400',
      textColor: 'text-slate-950 font-black',
      ringColor: 'ring-amber-400/50 shadow-amber-500/30',
      glowColor: 'bg-amber-500/15',
      iconColor: 'text-slate-950 fill-slate-950',
    };
  };

  const badgeConfig = getBadgeConfig(streak);

  return (
    <div className="relative flex items-center gap-2">
      {/* Floating Points Earned Pop Animation */}
      <AnimatePresence>
        {displayedFloatingPoints && (
          <motion.div
            key={displayedFloatingPoints.id}
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{ opacity: 1, y: -26, scale: 1.1 }}
            exit={{ opacity: 0, y: -45, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -top-8 right-0 pointer-events-none z-30 flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-950/95 border border-amber-400/60 shadow-xl shadow-amber-500/20 text-amber-300 font-mono font-extrabold text-xs"
          >
            <span>+{displayedFloatingPoints.points} pts</span>
            {displayedFloatingPoints.multiplier >= 2 && (
              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                x{displayedFloatingPoints.multiplier} Multiplier
              </span>
            )}
            {displayedFloatingPoints.dailyMultiplier > 1 && (
              <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5 fill-slate-950" />
                x{displayedFloatingPoints.dailyMultiplier} يومي
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Score Display Box */}
      <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-mono font-bold text-xs sm:text-sm text-slate-200">
          {score.toLocaleString()} <span className="text-slate-400 text-[11px] font-normal">pts</span>
        </span>
      </div>

      {/* Animated Multiplier Badge (Appears when streak >= 2) */}
      <AnimatePresence mode="wait">
        {streak >= 2 && (
          <motion.div
            key={`multiplier-${streak}`}
            id="score-multiplier-badge"
            initial={{ scale: 0, opacity: 0, rotate: -25 }}
            animate={{
              scale: isUpgrading ? [1, 1.35, 0.95, 1.1, 1] : [0.95, 1.05, 1],
              opacity: 1,
              rotate: isUpgrading ? [-15, 12, -6, 3, 0] : [0, 4, -4, 0],
            }}
            exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.25 } }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 18,
            }}
            className="relative flex items-center group cursor-default"
          >
            {/* Ambient Radial Pulsing Glow */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -inset-1 rounded-full filter blur-md ${badgeConfig.glowColor} -z-10`}
            />

            {/* Visual Multiplier Pill Badge */}
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r ${badgeConfig.gradient} ${badgeConfig.textColor} ring-2 ${badgeConfig.ringColor} shadow-lg shadow-amber-500/20 select-none`}
            >
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, -8, 8, 0],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <Flame className={`w-3.5 h-3.5 ${badgeConfig.iconColor}`} />
              </motion.div>

              <span className="font-mono font-black text-xs tracking-tight">
                {badgeConfig.label}
              </span>

              <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider opacity-85 ml-0.5">
                {badgeConfig.subtext}
              </span>

              {/* Sparkle Icon */}
              <Sparkles className="w-2.5 h-2.5 opacity-75 hidden xs:inline" />
            </div>

            {/* Upgrade Flash Ring */}
            {isUpgrading && (
              <motion.span
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 rounded-xl border-2 border-amber-300 pointer-events-none"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Streak Multiplier Badge (Appears when dailyMultiplier > 1) */}
      {dailyMultiplier > 1 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-500/25 via-amber-500/25 to-yellow-500/20 border border-amber-400/60 text-amber-300 shadow-md shadow-amber-500/20 select-none"
          title={`سلسلة اللعب اليومية (${dailyStreakCount} أيام متتالية): مضاعف إضافي x${dailyMultiplier}`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
          <span className="font-mono font-black text-xs">x{dailyMultiplier}</span>
          <span className="text-[10px] hidden xs:inline font-bold text-amber-200">يومي</span>
        </motion.div>
      )}

      {/* Optional Double Points Lifeline Indicator */}
      {doublePointsActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold shadow-md shadow-emerald-500/20"
          title="2x Double Down Lifeline Active"
        >
          <Zap className="w-3 h-3 text-emerald-300 fill-emerald-400" />
          <span>2x Boost</span>
        </motion.div>
      )}
    </div>
  );
};
