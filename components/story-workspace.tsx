"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Check,
  Copy,
  Dice5,
  Download,
  ImagePlus,
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { StoryCanvas } from "@/components/story-canvas";
import { StreakBadge } from "@/components/streak-badge";
import { ideaToCopyText, getTrendIdeas, pickRandom } from "@/lib/ideas";
import { NICHES, STORY_TYPES } from "@/lib/niches";
import { bumpStreak, readStreak } from "@/lib/streak";
import { PALETTES } from "@/lib/themes";
import type { NicheId, Palette, StoryIdea, StoryTypeId } from "@/lib/types";

export function StoryWorkspace() {
  const [niche, setNiche] = useState<NicheId>("gaming");
  const [storyType, setStoryType] = useState<StoryTypeId>("this_or_that");
  const [idea, setIdea] = useState<StoryIdea>(() =>
    pickRandom("gaming", "this_or_that"),
  );
  const [palette, setPalette] = useState<Palette>(PALETTES[0]!);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [sequenceStep, setSequenceStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [shufflePulse, setShufflePulse] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStreak(readStreak().count);
  }, []);

  const shuffle = useCallback(() => {
    const next = pickRandom(niche, storyType, idea.id);
    setIdea(next);
    setSequenceStep(0);
    setShufflePulse(true);
    window.setTimeout(() => setShufflePulse(false), 400);
    const s = bumpStreak();
    setStreak(s.count);
  }, [niche, storyType, idea.id]);

  const applyNiche = (id: NicheId) => {
    setNiche(id);
    const next = pickRandom(id, storyType);
    setIdea(next);
    setSequenceStep(0);
  };

  const applyType = (id: StoryTypeId) => {
    setStoryType(id);
    const next = pickRandom(niche, id);
    setIdea(next);
    setSequenceStep(0);
  };

  const applyTrend = (trend: StoryIdea) => {
    setNiche(trend.niche);
    setStoryType(trend.type);
    setIdea(trend);
    setSequenceStep(0);
    setMobileTab("preview");
    const s = bumpStreak();
    setStreak(s.count);
  };

  const onUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setBgImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const copyText = async () => {
    const text = ideaToCopyText(idea, sequenceStep);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    const s = bumpStreak();
    setStreak(s.count);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadPng = async () => {
    if (!canvasRef.current || downloading) return;
    setDownloading(true);
    // Soft delay for ad impression window
    await new Promise((r) => setTimeout(r, 1600));
    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `vantox-story-${Date.now()}.png`;
      a.click();
      const s = bumpStreak();
      setStreak(s.count);
    } catch (err) {
      console.error(err);
      alert("تعذّر التحميل. جرّب مرة ثانية.");
    } finally {
      setDownloading(false);
    }
  };

  const trends = getTrendIdeas(niche);

  const controls = (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white/90">اختر المجال</h2>
          <StreakBadge count={streak} />
        </div>
        <div className="flex flex-wrap gap-2">
          {NICHES.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => applyNiche(n.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                niche === n.id
                  ? "bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.45)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {n.emoji} {n.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-bold text-white/90">نوع الستوري</h2>
        <div className="grid grid-cols-2 gap-2">
          {STORY_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyType(t.id)}
              className={`rounded-2xl border p-3 text-right transition ${
                storyType === t.id
                  ? "border-fuchsia-400/60 bg-fuchsia-500/15 shadow-[0_0_24px_rgba(232,121,249,0.2)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="text-sm font-bold text-white">{t.label}</div>
              <div className="mt-0.5 text-[11px] text-white/45">{t.description}</div>
            </button>
          ))}
        </div>
      </div>

      {idea.type === "sequence" && idea.steps ? (
        <div>
          <h2 className="mb-2 text-sm font-bold text-white/90">خطوات السلسلة</h2>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSequenceStep(i)}
                className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${
                  sequenceStep === i
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="mb-2 text-sm font-bold text-white/90">ألوان الخلفية</h2>
        <div className="flex flex-wrap gap-2.5">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              title={p.label}
              onClick={() => {
                setPalette(p);
                setBgImage((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return null;
                });
              }}
              className={`h-9 w-9 rounded-full border-2 transition ${
                palette.id === p.id && !bgImage
                  ? "border-white scale-110"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
              style={{ background: p.background }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={shuffle}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-fuchsia-500 to-pink-500 px-4 py-3 text-sm font-black text-white shadow-[0_0_28px_rgba(236,72,153,0.45)] transition ${
            shufflePulse ? "scale-[0.97]" : "hover:brightness-110"
          }`}
        >
          <Dice5 className="h-4 w-4" />
          فكرة جديدة
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10"
        >
          <ImagePlus className="h-4 w-4" />
          خلفية
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-fuchsia-300/80">
          النص الحالي
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">
          {idea.type === "sequence" && idea.steps
            ? idea.steps[sequenceStep]
            : idea.headline}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={copyText}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white hover:bg-white/10"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copied ? "تم النسخ" : "نسخ النص"}
        </button>
        <button
          type="button"
          onClick={downloadPng}
          disabled={downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-black text-slate-950 hover:bg-fuchsia-100 disabled:opacity-70"
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "جاري التجهيز…" : "تحميل PNG"}
        </button>
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-4">
      <StoryCanvas
        idea={idea}
        palette={palette}
        backgroundImage={bgImage}
        sequenceStep={sequenceStep}
        canvasRef={canvasRef}
      />
      <p className="max-w-[280px] text-center text-[11px] text-white/40">
        المعاينة بنسبة 9:16 — جاهزة لإنستغرام وتيك توك
      </p>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      {/* Trend strip */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-fuchsia-500/20 bg-gradient-to-l from-fuchsia-950/40 via-slate-950/40 to-cyan-950/30 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-fuchsia-200">
          <TrendingUp className="h-4 w-4" />
          تريند اليوم
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {trends.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTrend(t)}
              className="min-w-[200px] shrink-0 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-right transition hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10"
            >
              <div className="line-clamp-2 text-xs font-semibold leading-relaxed text-white/90">
                {t.headline.replace(/\n/g, " ")}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mobile tabs */}
      <div className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`rounded-xl py-2.5 text-sm font-bold ${
            mobileTab === "edit"
              ? "bg-fuchsia-500 text-white"
              : "bg-white/5 text-white/60"
          }`}
        >
          تعديل
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`rounded-xl py-2.5 text-sm font-bold ${
            mobileTab === "preview"
              ? "bg-fuchsia-500 text-white"
              : "bg-white/5 text-white/60"
          }`}
        >
          معاينة
        </button>
      </div>

      <div className="flex items-start justify-center gap-4">
        <AdSlot placement="sidebar" />

        <div className="grid min-w-0 flex-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className={mobileTab === "edit" ? "block" : "hidden lg:block"}>
            {controls}
          </div>
          <div
            className={
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }
          >
            {preview}
          </div>
        </div>

        <AdSlot placement="sidebar" />
      </div>

      {/* Sticky bottom ad + mobile quick actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:px-6">
          <div className="flex gap-2 lg:hidden">
            <button
              type="button"
              onClick={shuffle}
              className="flex-1 rounded-xl bg-fuchsia-500 py-2.5 text-xs font-black text-white"
            >
              فكرة جديدة 🎲
            </button>
            <button
              type="button"
              onClick={downloadPng}
              disabled={downloading}
              className="flex-1 rounded-xl bg-white py-2.5 text-xs font-black text-slate-950 disabled:opacity-70"
            >
              {downloading ? "…" : "تحميل PNG"}
            </button>
          </div>
          <AdSlot placement="anchor" />
        </div>
      </div>
    </div>
  );
}
