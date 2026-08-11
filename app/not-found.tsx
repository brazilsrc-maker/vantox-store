"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black text-slate-900">{t.notFoundTitle}</h1>
      <p className="mt-2 text-slate-500">{t.notFoundBody}</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white"
      >
        {t.notFoundCta}
      </Link>
    </main>
  );
}
