"use client";

import { Flame } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

type Props = {
  count: number;
};

export function StreakBadge({ count }: Props) {
  const { t } = useLocale();
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600">
      <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
      <span>{count}</span>
      <span className="font-semibold text-orange-500/70">{t.day}</span>
    </div>
  );
}
