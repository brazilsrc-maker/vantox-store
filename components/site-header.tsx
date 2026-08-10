import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <Zap className="h-4 w-4 text-white" fill="currentColor" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-white">
            VANTOX
          </span>
          <span className="hidden text-[11px] font-semibold text-fuchsia-300/80 sm:inline">
            مولّد ستوريات التفاعل
          </span>
        </Link>
        <p className="hidden text-xs text-white/40 md:block">
          فكرة كل صباح · تفاعل كل يوم
        </p>
      </div>
    </header>
  );
}
