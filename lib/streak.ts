const STREAK_KEY = "vantox_streak_v1";

type StreakState = {
  count: number;
  lastDate: string; // YYYY-MM-DD local
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function readStreak(): StreakState {
  if (typeof window === "undefined") return { count: 0, lastDate: "" };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastDate: "" };
    return JSON.parse(raw) as StreakState;
  } catch {
    return { count: 0, lastDate: "" };
  }
}

/** Call when user generates / downloads a story */
export function bumpStreak(): StreakState {
  const today = todayKey();
  const prev = readStreak();

  let next: StreakState;
  if (prev.lastDate === today) {
    next = prev;
  } else if (prev.lastDate === yesterdayKey()) {
    next = { count: prev.count + 1, lastDate: today };
  } else {
    next = { count: 1, lastDate: today };
  }

  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
}
