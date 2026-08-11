import type { NicheId, StoryTypeId } from "./types";

export const NICHES: { id: NicheId; emoji: string }[] = [
  { id: "gaming", emoji: "🎮" },
  { id: "tech", emoji: "💻" },
  { id: "lifestyle", emoji: "✨" },
  { id: "fashion", emoji: "👗" },
  { id: "memes", emoji: "😂" },
  { id: "ecommerce", emoji: "🛒" },
  { id: "fitness", emoji: "💪" },
  { id: "food", emoji: "🍕" },
  { id: "personal", emoji: "👤" },
];

export const STORY_TYPE_IDS: StoryTypeId[] = [
  "this_or_that",
  "sequence",
  "qa",
  "controversial",
];
