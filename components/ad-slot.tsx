"use client";

import { useLocale } from "@/components/locale-provider";

type Props = {
  placement: "sidebar" | "anchor" | "inline";
  label?: string;
};

/** Placeholder ad slots — replace with AdSense units when ready */
export function AdSlot({ placement, label }: Props) {
  const { t } = useLocale();
  const base =
    "flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-[11px] text-slate-400";

  if (placement === "anchor") {
    return (
      <div className={`${base} h-14 w-full`} aria-label="ad">
        {label ?? t.adAnchor}
      </div>
    );
  }

  if (placement === "sidebar") {
    return (
      <div
        className={`${base} hidden h-[250px] w-[160px] shrink-0 lg:flex`}
        aria-label="ad"
      >
        {label ?? t.adSidebar}
      </div>
    );
  }

  return (
    <div className={`${base} h-[90px] w-full`} aria-label="ad">
      {label ?? t.adSidebar}
    </div>
  );
}
