"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  Check,
  Copy,
  Dice5,
  Download,
  FileText,
  ImagePlus,
  Loader2,
  PenLine,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { useLocale } from "@/components/locale-provider";
import { StoryCanvas } from "@/components/story-canvas";
import { StreakBadge } from "@/components/streak-badge";
import { ideaToCopyText, getTrendIdeas, pickRandom } from "@/lib/ideas";
import { NICHES, STORY_TYPE_IDS } from "@/lib/niches";
import { bumpStreak, readStreak } from "@/lib/streak";
import { PALETTES } from "@/lib/themes";
import type { NicheId, Palette, StoryIdea, StoryTypeId } from "@/lib/types";

function syncEditsFromIdea(idea: StoryIdea, sequenceStep: number) {
  const headline =
    idea.type === "sequence" && idea.steps
      ? (idea.steps[sequenceStep] ?? idea.steps[0] ?? "")
      : idea.headline;
  return {
    headline,
    optionA: idea.optionA ?? "",
    optionB: idea.optionB ?? "",
    subtext: idea.subtext ?? "",
  };
}

export function StoryWorkspace() {
  const { locale, t } = useLocale();
  const [niche, setNiche] = useState<NicheId>("gaming");
  const [storyType, setStoryType] = useState<StoryTypeId>("this_or_that");
  const [idea, setIdea] = useState<StoryIdea>(() =>
    pickRandom("gaming", "this_or_that", "ar"),
  );
  const [palette, setPalette] = useState<Palette>(PALETTES[0]!);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [sequenceStep, setSequenceStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState<"png" | "pdf" | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [shufflePulse, setShufflePulse] = useState(false);
  const [edits, setEdits] = useState(() =>
    syncEditsFromIdea(pickRandom("gaming", "this_or_that", "ar"), 0),
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const localeBoot = useRef(false);

  useEffect(() => {
    setStreak(readStreak().count);
  }, []);

  useEffect(() => {
    if (!localeBoot.current) {
      localeBoot.current = true;
      const next = pickRandom(niche, storyType, locale);
      setIdea(next);
      setEdits(syncEditsFromIdea(next, 0));
      return;
    }
    const next = pickRandom(niche, storyType, locale, idea.id);
    setIdea(next);
    setSequenceStep(0);
    setEdits(syncEditsFromIdea(next, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh ideas when language changes
  }, [locale]);

  const applyIdea = (next: StoryIdea, step = 0) => {
    setIdea(next);
    setSequenceStep(step);
    setEdits(syncEditsFromIdea(next, step));
  };

  const shuffle = useCallback(() => {
    const next = pickRandom(niche, storyType, locale, idea.id);
    applyIdea(next);
    setShufflePulse(true);
    window.setTimeout(() => setShufflePulse(false), 400);
    const s = bumpStreak();
    setStreak(s.count);
  }, [niche, storyType, idea.id, locale]);

  const applyNiche = (id: NicheId) => {
    setNiche(id);
    applyIdea(pickRandom(id, storyType, locale));
  };

  const applyType = (id: StoryTypeId) => {
    setStoryType(id);
    applyIdea(pickRandom(niche, id, locale));
  };

  const applyTrend = (trend: StoryIdea) => {
    setNiche(trend.niche);
    setStoryType(trend.type);
    applyIdea(trend);
    setMobileTab("preview");
    const s = bumpStreak();
    setStreak(s.count);
  };

  const clearManual = () => {
    setEdits({ headline: "", optionA: "", optionB: "", subtext: "" });
  };

  const onUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setBgImage((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const displayIdea: StoryIdea = {
    ...idea,
    headline:
      idea.type === "sequence"
        ? idea.headline
        : edits.headline || idea.headline,
    optionA: edits.optionA || idea.optionA,
    optionB: edits.optionB || idea.optionB,
    subtext: edits.subtext || idea.subtext,
    steps:
      idea.type === "sequence" && idea.steps
        ? ([
            sequenceStep === 0 ? edits.headline || idea.steps[0] : idea.steps[0],
            sequenceStep === 1 ? edits.headline || idea.steps[1] : idea.steps[1],
            sequenceStep === 2 ? edits.headline || idea.steps[2] : idea.steps[2],
          ] as [string, string, string])
        : idea.steps,
  };

  const copyText = async () => {
    const text = ideaToCopyText(
      {
        ...displayIdea,
        headline: edits.headline || displayIdea.headline,
      },
      sequenceStep,
    );
    await navigator.clipboard.writeText(text);
    setCopied(true);
    const s = bumpStreak();
    setStreak(s.count);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const captureCanvas = async () => {
    if (!canvasRef.current) throw new Error("no canvas");
    return toPng(canvasRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      includeQueryParams: true,
      skipFonts: true,
      style: {
        transform: "none",
      },
    });
  };

  const downloadPng = async () => {
    if (downloading) return;
    setDownloading("png");
    await new Promise((r) => setTimeout(r, 400));
    try {
      const dataUrl = await captureCanvas();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `vantox-story-${Date.now()}.png`;
      a.click();
      const s = bumpStreak();
      setStreak(s.count);
    } catch (err) {
      console.error(err);
      alert(t.downloadFailed);
    } finally {
      setDownloading(null);
    }
  };

  const downloadPdf = async () => {
    if (downloading) return;
    setDownloading("pdf");
    await new Promise((r) => setTimeout(r, 400));
    try {
      const dataUrl = await captureCanvas();
      const width = 1080;
      const height = 1920;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [width, height],
        hotfixes: ["px_scaling"],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`vantox-story-${Date.now()}.pdf`);
      const s = bumpStreak();
      setStreak(s.count);
    } catch (err) {
      console.error(err);
      alert(t.downloadFailed);
    } finally {
      setDownloading(null);
    }
  };

  const trends = getTrendIdeas(niche, locale);
  const showOptions =
    storyType === "this_or_that" ||
    (storyType === "sequence" && sequenceStep === 2);

  const controls = (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-800">{t.chooseNiche}</h2>
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
                  ? "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/25"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {n.emoji} {t.niches[n.id]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-bold text-slate-800">{t.storyType}</h2>
        <div className="grid grid-cols-2 gap-2">
          {STORY_TYPE_IDS.map((id) => {
            const meta = t.types[id]!;
            return (
              <button
                key={id}
                type="button"
                onClick={() => applyType(id)}
                className={`rounded-2xl border p-3 text-start transition ${
                  storyType === id
                    ? "border-fuchsia-400 bg-fuchsia-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="text-sm font-bold text-slate-900">{meta.label}</div>
                <div className="mt-0.5 text-[11px] text-slate-500">
                  {meta.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {idea.type === "sequence" && idea.steps ? (
        <div>
          <h2 className="mb-2 text-sm font-bold text-slate-800">
            {t.sequenceSteps}
          </h2>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSequenceStep(i);
                  setEdits(syncEditsFromIdea(idea, i));
                }}
                className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${
                  sequenceStep === i
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="mb-2 text-sm font-bold text-slate-800">{t.bgColors}</h2>
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
                  ? "scale-110 border-slate-900"
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
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-fuchsia-600 to-pink-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-fuchsia-500/25 transition ${
            shufflePulse ? "scale-[0.97]" : "hover:brightness-110"
          }`}
        >
          <Dice5 className="h-4 w-4" />
          {t.newIdea}
        </button>
        <button
          type="button"
          onClick={clearManual}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <PenLine className="h-4 w-4" />
          {t.manualWrite}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <ImagePlus className="h-4 w-4" />
          {t.background}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-fuchsia-600">
          {t.currentText}
        </div>
        <p className="mb-3 text-[11px] text-slate-500">{t.manualHint}</p>
        <textarea
          value={edits.headline}
          onChange={(e) => setEdits((prev) => ({ ...prev, headline: e.target.value }))}
          rows={4}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-900 outline-none ring-fuchsia-500/30 focus:ring-2"
          placeholder={t.manualWrite}
        />
        {showOptions ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              value={edits.optionA}
              onChange={(e) =>
                setEdits((prev) => ({ ...prev, optionA: e.target.value }))
              }
              placeholder={t.optionA}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-fuchsia-500/30 focus:ring-2"
            />
            <input
              value={edits.optionB}
              onChange={(e) =>
                setEdits((prev) => ({ ...prev, optionB: e.target.value }))
              }
              placeholder={t.optionB}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-fuchsia-500/30 focus:ring-2"
            />
          </div>
        ) : null}
        {storyType !== "this_or_that" && storyType !== "sequence" ? (
          <input
            value={edits.subtext}
            onChange={(e) =>
              setEdits((prev) => ({ ...prev, subtext: e.target.value }))
            }
            placeholder={t.subtext}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-fuchsia-500/30 focus:ring-2"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={copyText}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? t.copied : t.copyText}
        </button>
        <button
          type="button"
          onClick={downloadPng}
          disabled={!!downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-70"
        >
          {downloading === "png" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading === "png" ? t.preparing : t.downloadPng}
        </button>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={!!downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3.5 text-sm font-black text-fuchsia-700 hover:bg-fuchsia-100 disabled:opacity-70"
        >
          {downloading === "pdf" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {downloading === "pdf" ? t.preparing : t.downloadPdf}
        </button>
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-4">
      <StoryCanvas
        idea={displayIdea}
        palette={palette}
        backgroundImage={bgImage}
        sequenceStep={sequenceStep}
        canvasRef={canvasRef}
        headlineOverride={edits.headline}
        optionAOverride={edits.optionA}
        optionBOverride={edits.optionB}
        subtextOverride={edits.subtext}
      />
      <p className="max-w-[280px] text-center text-[11px] text-slate-400">
        {t.previewHint}
      </p>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      <section className="mb-6 overflow-hidden rounded-2xl border border-fuchsia-200/80 bg-gradient-to-l from-fuchsia-50 via-white to-cyan-50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-fuchsia-700">
          <TrendingUp className="h-4 w-4" />
          {t.todayTrend}
          <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {trends.map((trendItem) => (
            <button
              key={trendItem.id}
              type="button"
              onClick={() => applyTrend(trendItem)}
              className="min-w-[200px] shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-start transition hover:border-fuchsia-300 hover:bg-fuchsia-50"
            >
              <div className="line-clamp-2 text-xs font-semibold leading-relaxed text-slate-700">
                {trendItem.headline.replace(/\n/g, " ")}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`rounded-xl py-2.5 text-sm font-bold ${
            mobileTab === "edit"
              ? "bg-fuchsia-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {t.edit}
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`rounded-xl py-2.5 text-sm font-bold ${
            mobileTab === "preview"
              ? "bg-fuchsia-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {t.preview}
        </button>
      </div>

      <div className="flex items-start justify-center gap-4">
        <AdSlot placement="sidebar" />

        <div className="grid min-w-0 flex-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className={mobileTab === "edit" ? "block" : "hidden lg:block"}>
            {controls}
          </div>
          <div className={mobileTab === "preview" ? "block" : "hidden lg:block"}>
            {preview}
          </div>
        </div>

        <AdSlot placement="sidebar" />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:px-6">
          <div className="flex gap-2 lg:hidden">
            <button
              type="button"
              onClick={shuffle}
              className="flex-1 rounded-xl bg-fuchsia-600 py-2.5 text-xs font-black text-white"
            >
              {t.newIdea}
            </button>
            <button
              type="button"
              onClick={downloadPng}
              disabled={!!downloading}
              className="flex-1 rounded-xl bg-slate-900 py-2.5 text-xs font-black text-white disabled:opacity-70"
            >
              {downloading === "png" ? "…" : t.downloadPng}
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={!!downloading}
              className="flex-1 rounded-xl bg-fuchsia-50 py-2.5 text-xs font-black text-fuchsia-700 disabled:opacity-70"
            >
              {downloading === "pdf" ? "…" : "PDF"}
            </button>
          </div>
          <AdSlot placement="anchor" />
        </div>
      </div>
    </div>
  );
}
