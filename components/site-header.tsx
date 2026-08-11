"use client";

import Image from "next/image";
import Link from "next/link";
import { LOCALES } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

export function SiteHeader() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <Image
            src="/vantox-icon.png"
            alt="VANTOX"
            width={32}
            height={32}
            className="h-8 w-8 rounded-xl shadow-sm ring-1 ring-slate-200/80"
            priority
          />
          <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-slate-900">
            VANTOX
          </span>
          <span className="hidden truncate text-[11px] font-semibold text-fuchsia-600/80 sm:inline">
            {t.heroTitle.split(" ").slice(0, 3).join(" ")}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <p className="hidden text-xs text-slate-400 lg:block">{t.tagline}</p>
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-0.5">
            {LOCALES.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLocale(l.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                  locale === l.id
                    ? "bg-fuchsia-600 text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {l.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
