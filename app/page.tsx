import { StoryWorkspace } from "@/components/story-workspace";

export default function HomePage() {
  return (
    <main className="animate-rise">
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
          <span className="bg-gradient-to-l from-fuchsia-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            VANTOX
          </span>
          <span className="mt-1 block text-white">
            مولّد سيناريوهات الستوري الشديدة التفاعل
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          ادخل كل صباح، اختر مجالك، واحصل على فكرة ستوري جاهزة مع معاينة حية
          9:16 — انسخ النص أو حمّل الصورة وانشر فوراً.
        </p>
      </section>
      <StoryWorkspace />
    </main>
  );
}
