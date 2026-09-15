import { DailyStreakData } from '../types';

export const DAILY_STREAK_STORAGE_KEY = 'persona_trivia_daily_streak_v1';

/**
 * Returns formatted YYYY-MM-DD string in local timezone
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates calendar day difference between two YYYY-MM-DD strings
 */
export function getDaysDifference(pastDateStr: string, currentDateStr: string): number {
  if (!pastDateStr || !currentDateStr) return 999;
  try {
    const [y1, m1, d1] = pastDateStr.split('-').map(Number);
    const [y2, m2, d2] = currentDateStr.split('-').map(Number);
    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);
    const diffMs = date2.getTime() - date1.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return 999;
  }
}

/**
 * Tiered bonus multiplier for playing consecutive days:
 * - 1 day: 1.0x (base points)
 * - 2 days back-to-back: 1.25x (+25% bonus)
 * - 3 days back-to-back: 1.50x (+50% bonus)
 * - 4 days back-to-back: 1.75x (+75% bonus)
 * - 5+ days back-to-back: 2.0x (Double points bonus!)
 */
export function calculateDailyMultiplier(streakDays: number): number {
  if (streakDays <= 1) return 1.0;
  if (streakDays === 2) return 1.25;
  if (streakDays === 3) return 1.50;
  if (streakDays === 4) return 1.75;
  return 2.0;
}

/**
 * Computes the current daily streak status based on stored data and today's date
 */
export function getDailyStreak(): DailyStreakData {
  const today = getLocalDateString();
  try {
    const saved = localStorage.getItem(DAILY_STREAK_STORAGE_KEY);
    if (!saved) {
      return {
        streakCount: 1,
        lastPlayedDate: '',
        bonusMultiplier: 1.0,
        isBackToBack: false,
        totalDaysPlayed: 0,
        bestDailyStreak: 1,
      };
    }

    const data: DailyStreakData = JSON.parse(saved);
    if (!data.lastPlayedDate) {
      return {
        ...data,
        streakCount: 1,
        bonusMultiplier: 1.0,
        isBackToBack: false,
      };
    }

    const daysDiff = getDaysDifference(data.lastPlayedDate, today);

    if (daysDiff === 0) {
      // Already played today
      const isBack = data.streakCount >= 2;
      return {
        ...data,
        bonusMultiplier: calculateDailyMultiplier(data.streakCount),
        isBackToBack: isBack,
      };
    } else if (daysDiff === 1) {
      // Played yesterday: Consecutive back-to-back play!
      const nextStreak = (data.streakCount || 0) + 1;
      return {
        ...data,
        streakCount: nextStreak,
        bonusMultiplier: calculateDailyMultiplier(nextStreak),
        isBackToBack: true,
      };
    } else {
      // Missed more than 1 day: streak reset
      return {
        ...data,
        streakCount: 1,
        bonusMultiplier: 1.0,
        isBackToBack: false,
      };
    }
  } catch (err) {
    console.error('Error reading daily streak:', err);
    return {
      streakCount: 1,
      lastPlayedDate: '',
      bonusMultiplier: 1.0,
      isBackToBack: false,
      totalDaysPlayed: 0,
      bestDailyStreak: 1,
    };
  }
}

/**
 * Confirms and records that a game was played today
 */
export function recordDailyPlay(): DailyStreakData {
  const current = getDailyStreak();
  const today = getLocalDateString();

  if (current.lastPlayedDate === today) {
    return current;
  }

  const updated: DailyStreakData = {
    streakCount: current.streakCount,
    lastPlayedDate: today,
    bonusMultiplier: current.bonusMultiplier,
    isBackToBack: current.streakCount >= 2,
    totalDaysPlayed: (current.totalDaysPlayed || 0) + 1,
    bestDailyStreak: Math.max(current.bestDailyStreak || 1, current.streakCount),
  };

  try {
    localStorage.setItem(DAILY_STREAK_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save daily streak:', err);
  }

  return updated;
}

/**
 * Testing / simulation helper: set last played date to yesterday so today activates back-to-back bonus
 */
export function simulateConsecutiveDay(targetStreak: number = 2): DailyStreakData {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterday);

  const prevStreak = Math.max(1, targetStreak - 1);
  const data: DailyStreakData = {
    streakCount: prevStreak,
    lastPlayedDate: yesterdayStr,
    bonusMultiplier: calculateDailyMultiplier(targetStreak),
    isBackToBack: true,
    totalDaysPlayed: targetStreak,
    bestDailyStreak: Math.max(targetStreak, prevStreak),
  };

  try {
    localStorage.setItem(DAILY_STREAK_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to simulate daily streak:', err);
  }

  return getDailyStreak();
}

/**
 * Reset streak for testing
 */
export function resetDailyStreak(): DailyStreakData {
  try {
    localStorage.removeItem(DAILY_STREAK_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset daily streak:', err);
  }
  return getDailyStreak();
}
