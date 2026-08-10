import type { NicheId, StoryTypeId } from "./types";

export const NICHES: {
  id: NicheId;
  label: string;
  emoji: string;
}[] = [
  { id: "gaming", label: "جيمنج", emoji: "🎮" },
  { id: "tech", label: "تقنية", emoji: "💻" },
  { id: "lifestyle", label: "لايف ستايل", emoji: "✨" },
  { id: "fashion", label: "أزياء", emoji: "👗" },
  { id: "memes", label: "ميمز", emoji: "😂" },
  { id: "ecommerce", label: "تجارة", emoji: "🛒" },
  { id: "fitness", label: "رياضة", emoji: "💪" },
  { id: "food", label: "طعام", emoji: "🍕" },
  { id: "personal", label: "شخصي", emoji: "👤" },
];

export const STORY_TYPES: {
  id: StoryTypeId;
  label: string;
  short: string;
  description: string;
}[] = [
  {
    id: "this_or_that",
    label: "هذا أم ذاك",
    short: "تصويت",
    description: "أسئلة مقارنة سريعة ترفع التفاعل فوراً",
  },
  {
    id: "sequence",
    label: "سلسلة تشويق",
    short: "3 ستوريات",
    description: "Hook ← مشكلة ← استبيان",
  },
  {
    id: "qa",
    label: "أسئلة المتابعين",
    short: "Q&A",
    description: "تجبر المتابع على الرد في الـ DMs",
  },
  {
    id: "controversial",
    label: "جدل يومي",
    short: "بول",
    description: "أسئلة مثيرة تضمن ردود خاصة",
  },
];