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

export type StoryIdea = {
  id: string;
  niche: NicheId;
  type: StoryTypeId;
  headline: string;
  subtext?: string;
  optionA?: string;
  optionB?: string;
  sticker: StickerKind;
  /** For 3-step sequences */
  steps?: [string, string, string];
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