"use client";

import { Flame } from "lucide-react";

type Props = {
  count: number;
};

export function StreakBadge({ count }: Props) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-sm font-bold text-orange-300">
      <Flame className="h-4 w-4 text-orange-400" fill="currentColor" />
      <span>{count}</span>
      <span className="text-orange-300/70 font-semibold">يوم</span>
    </div>
  );
}
