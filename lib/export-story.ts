import type { Palette, StoryIdea, StickerKind } from "@/lib/types";

const W = 1080;
const H = 1920;

export type ExportStoryInput = {
  idea: StoryIdea;
  palette: Palette;
  sequenceStep: number;
  headline: string;
  optionA?: string;
  optionB?: string;
  subtext?: string;
  backgroundImage?: string | null;
  storyOfLabel?: string;
  askMe?: string;
};

function parseGradient(background: string, ctx: CanvasRenderingContext2D, w: number, h: number) {
  const colors = background.match(/#(?:[0-9a-fA-F]{3,8})\b/g);
  if (!colors || colors.length < 2) {
    ctx.fillStyle = colors?.[0] ?? "#12051f";
    ctx.fillRect(0, 0, w, h);
    return;
  }
  const g = ctx.createLinearGradient(0, 0, w * 0.15, h);
  colors.forEach((c, i) => {
    g.addColorStop(i / (colors.length - 1), c);
  });
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const paragraphs = text.split("\n");
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      continue;
    }
    let line = words[0]!;
    for (let i = 1; i < words.length; i++) {
      const test = `${line} ${words[i]}`;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
      } else {
        lines.push(line);
        line = words[i]!;
      }
    }
    lines.push(line);
  }
  return lines;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export async function renderStoryToDataUrl(
  input: ExportStoryInput,
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unsupported");

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.direction = "rtl";

  if (input.backgroundImage) {
    try {
      const img = await loadImage(input.backgroundImage);
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
    } catch {
      parseGradient(input.palette.background, ctx, W, H);
    }
  } else {
    parseGradient(input.palette.background, ctx, W, H);
  }

  const isSequence = input.idea.type === "sequence" && !!input.idea.steps;
  const stickerKind: StickerKind = isSequence
    ? input.sequenceStep === 2
      ? "quiz"
      : "none"
    : input.idea.sticker;

  let y = H * 0.38;

  if (isSequence && input.storyOfLabel) {
    const label = input.storyOfLabel.replace(
      "{n}",
      String(input.sequenceStep + 1),
    );
    ctx.font = "700 28px Cairo, Arial, sans-serif";
    const tw = ctx.measureText(label).width + 48;
    roundRect(ctx, (W - tw) / 2, y - 28, tw, 56, 999);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fill();
    ctx.fillStyle = input.palette.accent;
    ctx.fillText(label, W / 2, y);
    y += 80;
  }

  ctx.fillStyle = input.palette.text;
  ctx.font = "900 64px Cairo, Arial, sans-serif";
  const lines = wrapText(ctx, input.headline.trim() || " ", W - 140);
  const lineHeight = 78;
  const blockH = lines.length * lineHeight;
  let textY = y - blockH / 2 + lineHeight / 2;
  for (const line of lines) {
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 2;
    ctx.fillText(line, W / 2, textY);
    textY += lineHeight;
  }
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  y = textY + 36;

  if (!isSequence && input.subtext) {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "600 34px Cairo, Arial, sans-serif";
    const subLines = wrapText(ctx, input.subtext, W - 160);
    for (const line of subLines) {
      ctx.fillText(line, W / 2, y);
      y += 44;
    }
    y += 24;
  }

  const optionA = input.optionA;
  const optionB = input.optionB;
  const showPoll =
    stickerKind === "poll" ||
    stickerKind === "quiz" ||
    (isSequence && input.sequenceStep === 2);

  if (showPoll && (optionA || optionB || stickerKind === "quiz")) {
    const boxW = W * 0.78;
    const boxX = (W - boxW) / 2;
    const boxY = Math.min(y, H - 520);
    const boxH = 320;
    roundRect(ctx, boxX, boxY, boxW, boxH, 36);
    ctx.fillStyle = input.palette.stickerBg;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "700 24px Cairo, Arial, sans-serif";
    ctx.fillText(stickerKind === "quiz" ? "QUIZ" : "POLL", W / 2, boxY + 48);

    const btnW = boxW - 48;
    const btnX = boxX + 24;
    roundRect(ctx, btnX, boxY + 90, btnW, 80, 24);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 36px Cairo, Arial, sans-serif";
    ctx.fillText(optionA || "A", W / 2, boxY + 130);

    roundRect(ctx, btnX, boxY + 196, btnW, 80, 24);
    ctx.fillStyle = input.palette.accent;
    ctx.fill();
    ctx.fillStyle = "#0a0a0a";
    ctx.fillText(optionB || "B", W / 2, boxY + 236);
  } else if (stickerKind === "question") {
    const boxW = W * 0.78;
    const boxX = (W - boxW) / 2;
    const boxY = Math.min(y, H - 280);
    roundRect(ctx, boxX, boxY, boxW, 160, 36);
    ctx.fillStyle = input.palette.stickerBg;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "700 24px Cairo, Arial, sans-serif";
    ctx.fillText("QUESTIONS", W / 2, boxY + 50);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 34px Cairo, Arial, sans-serif";
    ctx.fillText(input.askMe || "…", W / 2, boxY + 105);
  }

  return canvas.toDataURL("image/png");
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export { W as EXPORT_WIDTH, H as EXPORT_HEIGHT };
