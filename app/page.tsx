"use client";

import { StoryWorkspace } from "@/components/story-workspace";
import { useLocale } from "@/components/locale-provider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="animate-rise">
      <section className="mx-auto max-w-6xl px-4 pt-10 text-center sm:px-6 sm:pt-12">
        <p className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.2em] text-fuchsia-600">
          VANTOX
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          {t.heroBody}
        </p>
      </section>
      <StoryWorkspace />
    </main>
  );
}
