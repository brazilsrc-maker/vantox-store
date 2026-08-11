import type { Locale } from "./i18n";

export type NicheId =
  | "gaming"
  | "tech"
  | "lifestyle"
  | "fashion"
  | "memes"
  | "ecommerce"
  | "fitness"
  | "food"
  | "personal";

export type StoryTypeId =
  | "this_or_that"
  | "sequence"
  | "qa"
  | "controversial";

export type StickerKind = "poll" | "quiz" | "question" | "none";

export type LocText = Partial<Record<Locale, string>> & { ar: string };

export type StoryIdea = {
  id: string;
  niche: NicheId;
  type: StoryTypeId;
  headline: string;
  subtext?: string;
  optionA?: string;
  optionB?: string;
  sticker: StickerKind;
  steps?: [string, string, string];
  trend?: boolean;
};

export type RawStoryIdea = {
  id: string;
  niche: NicheId;
  type: StoryTypeId;
  headline: LocText;
  subtext?: LocText;
  optionA?: LocText;
  optionB?: LocText;
  sticker: StickerKind;
  steps?: [LocText, LocText, LocText];
  trend?: boolean;
};

export type Palette = {
  id: string;
  label: string;
  background: string;
  text: string;
  accent: string;
  stickerBg: string;
};

export function loc(text: LocText | undefined, locale: Locale): string {
  if (!text) return "";
  return text[locale] || text.en || text.ar;
}
