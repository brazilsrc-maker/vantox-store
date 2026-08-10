"use client";

type Props = {
  placement: "sidebar" | "anchor" | "inline";
  label?: string;
};

/** Placeholder ad slots — replace with AdSense units when ready */
export function AdSlot({ placement, label }: Props) {
  const base =
    "flex items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-center text-[11px] text-white/35";

  if (placement === "anchor") {
    return (
      <div
        className={`${base} h-14 w-full`}
        aria-label="مساحة إعلان"
      >
        {label ?? "إعلان لاصق سفلي · AdSense"}
      </div>
    );
  }

  if (placement === "sidebar") {
    return (
      <div
        className={`${base} hidden h-[250px] w-[160px] shrink-0 lg:flex`}
        aria-label="مساحة إعلان"
      >
        {label ?? "إعلان جانبي"}
      </div>
    );
  }

  return (
    <div className={`${base} h-[90px] w-full`} aria-label="مساحة إعلان">
      {label ?? "إعلان"}
    </div>
  );
}
