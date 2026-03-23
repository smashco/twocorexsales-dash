"use client";
import { useState, useEffect } from "react";

const STREAK_KEY = "tc_streak";

interface StreakData {
  count: number;
  lastActivityDate: string; // ISO date string "YYYY-MM-DD"
  milestoneShown: number[]; // milestones already celebrated
}

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function loadStreak(): StreakData {
  if (typeof window === "undefined") {
    return { count: 0, lastActivityDate: "", milestoneShown: [] };
  }
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastActivityDate: "", milestoneShown: [] };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { count: 0, lastActivityDate: "", milestoneShown: [] };
  }
}

export function saveStreak(data: StreakData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

/**
 * Call this every time a call log is successfully added.
 * Returns the new streak count.
 */
export function recordStreakActivity(): number {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const streak = loadStreak();

  if (streak.lastActivityDate === today) {
    // Already logged today — streak unchanged
    return streak.count;
  }

  const isConsecutive = streak.lastActivityDate === yesterday;
  const newCount = isConsecutive ? streak.count + 1 : 1;

  saveStreak({
    ...streak,
    count: newCount,
    lastActivityDate: today,
  });

  return newCount;
}

const MILESTONES = [7, 14, 30];
const MILESTONE_MESSAGES: Record<number, string> = {
  7: "7-day streak! You're on fire! 🔥",
  14: "2 weeks straight! Unstoppable! 💪",
  30: "30-DAY STREAK! Legend status! 🏆",
};

export function OutreachStreak() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadStreak();

    // Check if streak has lapsed (last activity before yesterday)
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    if (
      data.lastActivityDate &&
      data.lastActivityDate !== today &&
      data.lastActivityDate !== yesterday
    ) {
      // Streak reset
      const reset: StreakData = { ...data, count: 0 };
      saveStreak(reset);
      setStreak(reset);
      return;
    }

    setStreak(data);

    // Check for un-shown milestones
    const shown = data.milestoneShown ?? [];
    const unshown = MILESTONES.find(
      (m) => data.count >= m && !shown.includes(m)
    );
    if (unshown) {
      setMilestone(unshown);
      // Mark as shown
      saveStreak({ ...data, milestoneShown: [...shown, unshown] });
    }
  }, []);

  if (!mounted || !streak) return null;

  // Don't show if no streak yet
  if (streak.count === 0) return null;

  const isActive = streak.lastActivityDate === getTodayStr();

  return (
    <>
      {/* Topbar chip */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
        style={{
          background: isActive ? "#FEF3C7" : "#F3F4F6",
          color: isActive ? "#92400E" : "#6B7280",
        }}
        title={
          isActive
            ? `Active today! ${streak.count}-day streak`
            : `Last active yesterday. Keep it going!`
        }
      >
        <span className="text-sm">{streak.count >= 7 ? "🔥" : "⚡"}</span>
        <span>{streak.count} day streak</span>
      </div>

      {/* Milestone celebration overlay */}
      {milestone && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 pointer-events-none">
          <div
            className="pointer-events-auto bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl shadow-2xl px-8 py-6 text-center max-w-xs w-full"
            style={{ animation: "streakPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
          >
            <div className="text-5xl mb-3">
              {milestone === 30 ? "🏆" : milestone === 14 ? "💪" : "🔥"}
            </div>
            <h3 className="text-xl font-extrabold mb-1">{MILESTONE_MESSAGES[milestone]}</h3>
            <p className="text-sm opacity-80 mb-4">
              You&apos;ve reached out for {milestone} days straight. TwoCoreX is proud of you.
            </p>
            <button
              onClick={() => setMilestone(null)}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors"
            >
              Keep Going!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes streakPop {
          0%   { transform: scale(0.6) translateY(20px); opacity: 0; }
          70%  { transform: scale(1.05) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
