"use client";

import type { Palette, StoryIdea, StickerKind } from "@/lib/types";

type Props = {
  idea: StoryIdea;
  palette: Palette;
  backgroundImage: string | null;
  sequenceStep: number;
  canvasRef: React.RefObject<HTMLDivElement | null>;
};

function Sticker({
  kind,
  optionA,
  optionB,
  accent,
  stickerBg,
}: {
  kind: StickerKind;
  optionA?: string;
  optionB?: string;
  accent: string;
  stickerBg: string;
}) {
  if (kind === "none") return null;

  if (kind === "poll" || kind === "quiz") {
    return (
      <div
        className="w-full max-w-[85%] rounded-2xl border border-white/25 p-3 backdrop-blur-md"
        style={{ background: stickerBg }}
      >
        <div className="mb-2 text-center text-[10px] font-bold tracking-wide text-white/70">
          {kind === "poll" ? "POLL" : "QUIZ"}
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="rounded-xl px-3 py-2.5 text-center text-sm font-bold text-white"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            {optionA ?? "الخيار أ"}
          </div>
          <div
            className="rounded-xl px-3 py-2.5 text-center text-sm font-bold"
            style={{ background: accent, color: "#0a0a0a" }}
          >
            {optionB ?? "الخيار ب"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-[85%] rounded-2xl border border-white/30 px-4 py-3 text-center backdrop-blur-md"
      style={{ background: stickerBg }}
    >
      <div className="mb-1 text-[10px] font-bold tracking-wider text-white/70">
        QUESTIONS
      </div>
      <div className="text-sm font-semibold text-white">اسألني أي شيء…</div>
    </div>
  );
}

export function StoryCanvas({
  idea,
  palette,
  backgroundImage,
  sequenceStep,
  canvasRef,
}: Props) {
  const isSequence = idea.type === "sequence" && idea.steps;
  const headline = isSequence
    ? idea.steps![sequenceStep] ?? idea.steps![0]
    : idea.headline;

  const showPollOptions =
    !isSequence &&
    (idea.sticker === "poll" || idea.sticker === "quiz") &&
    idea.optionA &&
    idea.optionB;

  const stickerKind: StickerKind = isSequence
    ? sequenceStep === 2
      ? "quiz"
      : "none"
    : idea.sticker;

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div
        ref={canvasRef}
        className="relative overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_80px_rgba(255,45,149,0.18)]"
        style={{
          aspectRatio: "9 / 16",
          background: backgroundImage
            ? undefined
            : palette.background,
          color: palette.text,
        }}
      >
        {backgroundImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {backgroundImage ? (
          <div className="absolute inset-0 bg-black/45" />
        ) : null}

        {/* Fake status / story bars */}
        <div className="absolute inset-x-0 top-0 z-10 px-3 pt-3">
          <div className="mb-2 flex gap-1">
            {(isSequence ? [0, 1, 2] : [0]).map((i) => (
              <div
                key={i}
                className="h-[3px] flex-1 rounded-full bg-white/30"
              >
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{
                    width: isSequence
                      ? i < sequenceStep
                        ? "100%"
                        : i === sequenceStep
                          ? "55%"
                          : "0%"
                      : "70%",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="opacity-80">vantox</span>
          </div>
        </div>

        <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-6 px-5 pb-10 pt-16 text-center">
          {isSequence ? (
            <div
              className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: palette.accent,
              }}
            >
              ستوري {sequenceStep + 1} من 3
            </div>
          ) : null}

          <p
            className="whitespace-pre-line text-[1.55rem] font-black leading-snug tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-[1.7rem]"
            style={{ color: palette.text }}
          >
            {headline}
          </p>

          {!isSequence && idea.subtext ? (
            <p className="text-sm font-medium text-white/80">{idea.subtext}</p>
          ) : null}

          <Sticker
            kind={stickerKind}
            optionA={showPollOptions ? idea.optionA : sequenceStep === 2 ? "الخيار أ" : undefined}
            optionB={showPollOptions ? idea.optionB : sequenceStep === 2 ? "الخيار ب" : undefined}
            accent={palette.accent}
            stickerBg={palette.stickerBg}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
          <div className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white/50">
            VANTOX
          </div>
        </div>
      </div>
    </div>
  );
}
