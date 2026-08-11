"use client";

import { StoryWorkspace } from "@/components/story-workspace";
import { useLocale } from "@/components/locale-provider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="animate-rise">
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
          <span className="bg-gradient-to-l from-fuchsia-600 via-pink-500 to-cyan-600 bg-clip-text text-transparent">
            VANTOX
          </span>
          <span className="mt-1 block text-slate-900">{t.heroTitle}</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          {t.heroBody}
        </p>
      </section>
      <StoryWorkspace />
    </main>
  );
}
