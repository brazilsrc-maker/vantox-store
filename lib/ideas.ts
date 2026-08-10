import type { NicheId, StoryIdea, StoryTypeId } from "./types";

const ideas: StoryIdea[] = [
  // —— Gaming ——
  {
    id: "g-tot-1",
    niche: "gaming",
    type: "this_or_that",
    headline: "تستغني عن الـ PC سنة\nأو تستغني عن الموبايل شهر؟",
    optionA: "PC سنة",
    optionB: "موبايل شهر",
    sticker: "poll",
  },
  {
    id: "g-tot-2",
    niche: "gaming",
    type: "this_or_that",
    headline: "فوز بدون شرف\nأو خسارة شريفة؟",
    optionA: "فوز خسيس",
    optionB: "خسارة شريفة",
    sticker: "poll",
  },
  {
    id: "g-tot-3",
    niche: "gaming",
    type: "this_or_that",
    headline: "تلعب 12 ساعة يومياً\nأو ما تلعب أسبوع كامل؟",
    optionA: "12 ساعة",
    optionB: "أسبوع بريك",
    sticker: "poll",
  },
  {
    id: "g-seq-1",
    niche: "gaming",
    type: "sequence",
    headline: "سلسلة: التيم السام",
    sticker: "quiz",
    steps: [
      "لو تيمك خانك في آخر راوند… وش تسوي؟ 👀",
      "المشكلة مو الخسارة — المشكلة إنك تثق فيهم كل مرة",
      "صوّت: تبلّغ عليهم ولا تسكت وتغير سيرفر؟",
    ],
  },
  {
    id: "g-qa-1",
    niche: "gaming",
    type: "qa",
    headline: "قلي أقوى لعبة لعبتها 2026\nوبلا نقاش 🔥",
    subtext: "اكتبها في الردود",
    sticker: "question",
  },
  {
    id: "g-con-1",
    niche: "gaming",
    type: "controversial",
    headline: "رأيي: الموبايل قيمنق\nمو قيمنق حقيقي.",
    subtext: "اتفق؟ اكتب لي في الخاص",
    sticker: "question",
  },
  {
    id: "g-trend-1",
    niche: "gaming",
    type: "this_or_that",
    headline: "تريند اليوم:\nسكينات نادرة ولا سكنات مجانية حلوة؟",
    optionA: "نادرة",
    optionB: "مجانية فخمة",
    sticker: "poll",
    trend: true,
  },

  // —— Tech ——
  {
    id: "t-tot-1",
    niche: "tech",
    type: "this_or_that",
    headline: "آيفون بسعر عالي\nأو أندرويد فلاجشيب أرخص؟",
    optionA: "آيفون",
    optionB: "أندرويد",
    sticker: "poll",
  },
  {
    id: "t-tot-2",
    niche: "tech",
    type: "this_or_that",
    headline: "تشات GPT يكتب شغلك\nأو أنت تكتب كل شي يدوي؟",
    optionA: "AI يكتب",
    optionB: "يدي 100%",
    sticker: "poll",
  },
  {
    id: "t-seq-1",
    niche: "tech",
    type: "sequence",
    headline: "سلسلة: التحديث المشؤوم",
    sticker: "quiz",
    steps: [
      "حدّثت الجهاز… والحين ما يفتح 💀",
      "كل إعداداتك راحت. النسخ الاحتياطي؟ نسيته.",
      "تصوّت: تحديث فوري ولا تنتظر أسبوعين؟",
    ],
  },
  {
    id: "t-qa-1",
    niche: "tech",
    type: "qa",
    headline: "وش أسوأ إعدادات غيّرتها\nوندمت عليها؟",
    sticker: "question",
  },
  {
    id: "t-con-1",
    niche: "tech",
    type: "controversial",
    headline: "الناس اللي ما تستخدم\nمدير كلمات مرور… خطر على نفسها.",
    subtext: "رد عليّ إذا زعلان",
    sticker: "question",
  },
  {
    id: "t-trend-1",
    niche: "tech",
    type: "this_or_that",
    headline: "تريند AI:\nتثق بالذكاء الاصطناعي\nولا تخاف منه؟",
    optionA: "أثق",
    optionB: "أخاف",
    sticker: "poll",
    trend: true,
  },

  // —— Lifestyle ——
  {
    id: "l-tot-1",
    niche: "lifestyle",
    type: "this_or_that",
    headline: "تصحى بدري وتنتج\nأو تسهر وتعيش الليل؟",
    optionA: "بدري",
    optionB: "سهر",
    sticker: "poll",
  },
  {
    id: "l-tot-2",
    niche: "lifestyle",
    type: "this_or_that",
    headline: "رحلة لوحدك\nأو مع ناس ما تتحملهم؟",
    optionA: "وحدي",
    optionB: "معهم",
    sticker: "poll",
  },
  {
    id: "l-seq-1",
    niche: "lifestyle",
    type: "sequence",
    headline: "سلسلة: روتين الصباح",
    sticker: "quiz",
    steps: [
      "الساعة 6 الصبح… والجوال يقول: 47 إشعار 📱",
      "تشوفهم قبل القهوة؟ هنا يبدأ يومك غلط.",
      "صوّت: بدون جوال أول ساعة ولا ما أقدر؟",
    ],
  },
  {
    id: "l-qa-1",
    niche: "lifestyle",
    type: "qa",
    headline: "قلي عادة صغيرة غيّرت\nحياتك للأفضل ✨",
    sticker: "question",
  },
  {
    id: "l-con-1",
    niche: "lifestyle",
    type: "controversial",
    headline: "الإجازات الطويلة\nتخرب الانضباط أكثر مما تريّحك.",
    subtext: "DM إذا اختلفت",
    sticker: "question",
  },

  // —— Fashion ——
  {
    id: "f-tot-1",
    niche: "fashion",
    type: "this_or_that",
    headline: "قطعة غالية تدوم\nأو 5 قطع رخيصة ترند؟",
    optionA: "غالية تدوم",
    optionB: "ترند رخيص",
    sticker: "poll",
  },
  {
    id: "f-tot-2",
    niche: "fashion",
    type: "this_or_that",
    headline: "أسود كلاسيك دائماً\nأو ألوان جريئة اليوم؟",
    optionA: "أسود",
    optionB: "ألوان",
    sticker: "poll",
  },
  {
    id: "f-seq-1",
    niche: "fashion",
    type: "sequence",
    headline: "سلسلة: الأوتفت الغلط",
    sticker: "quiz",
    steps: [
      "طلعت من البيت وأنت واثق… وصورة المرآة كذبت 😅",
      "المشكلة مو القطعة — المشكلة التنسيق.",
      "صوّت: أرجع أغيّر ولا أكمل وأنا مو مرتاح؟",
    ],
  },
  {
    id: "f-qa-1",
    niche: "fashion",
    type: "qa",
    headline: "وش القطعة اللي لو راحت\nمن خزانتك تنهار؟",
    sticker: "question",
  },
  {
    id: "f-con-1",
    niche: "fashion",
    type: "controversial",
    headline: "البراند مو ستايل.\nالذوق الشخصي هو الستايل.",
    subtext: "اتفق؟ خاص",
    sticker: "question",
  },

  // —— Memes ——
  {
    id: "m-tot-1",
    niche: "memes",
    type: "this_or_that",
    headline: "تميم قديم كلاسيك\nأو تريند جديد كل ساعة؟",
    optionA: "كلاسيك",
    optionB: "تريند",
    sticker: "poll",
  },
  {
    id: "m-tot-2",
    niche: "memes",
    type: "this_or_that",
    headline: "تضحك بصوت عالي\nأو تموت من جوا وتسكت؟",
    optionA: "صوت عالي",
    optionB: "صامت 💀",
    sticker: "poll",
  },
  {
    id: "m-seq-1",
    niche: "memes",
    type: "sequence",
    headline: "سلسلة: الرسالة الغلط",
    sticker: "quiz",
    steps: [
      "أرسلت الرسالة للشخص الغلط… 👁️",
      "والأسوأ؟ كانت عن الشخص نفسه.",
      "صوّت: أحذف وأهرب ولا أوضح؟",
    ],
  },
  {
    id: "m-qa-1",
    niche: "memes",
    type: "qa",
    headline: "أرسل لي أغبى ميم\nشافه عقلك هالأسبوع 😂",
    sticker: "question",
  },
  {
    id: "m-con-1",
    niche: "memes",
    type: "controversial",
    headline: "الميمز صارت\nأعمق من الأخبار أحياناً.",
    subtext: "رد لو توافق",
    sticker: "question",
  },
  {
    id: "m-trend-1",
    niche: "memes",
    type: "this_or_that",
    headline: "تريند اليوم:\nتسوي الرييل ولا\nتكتفي بالستوري؟",
    optionA: "رييل",
    optionB: "ستوري",
    sticker: "poll",
    trend: true,
  },

  // —— Ecommerce ——
  {
    id: "e-tot-1",
    niche: "ecommerce",
    type: "this_or_that",
    headline: "خصم 50% اليوم\nأو جودة أعلى بدون خصم؟",
    optionA: "خصم",
    optionB: "جودة",
    sticker: "poll",
  },
  {
    id: "e-tot-2",
    niche: "ecommerce",
    type: "this_or_that",
    headline: "تشتري من ستوري\nأو تروح الموقع وتشوف؟",
    optionA: "ستوري",
    optionB: "الموقع",
    sticker: "poll",
  },
  {
    id: "e-seq-1",
    niche: "ecommerce",
    type: "sequence",
    headline: "سلسلة: الطلب المفقود",
    sticker: "quiz",
    steps: [
      "التتبع واقف من 4 أيام… 📦❓",
      "العميل يكتب كل ساعة. وأنت؟",
      "صوّت: أبلّغ فوراً ولا أنتظر 48 ساعة؟",
    ],
  },
  {
    id: "e-qa-1",
    niche: "ecommerce",
    type: "qa",
    headline: "قلي منتج تبيه\nبس السعر يوقفك…",
    sticker: "question",
  },
  {
    id: "e-con-1",
    niche: "ecommerce",
    type: "controversial",
    headline: "أرخص سعر مو دائماً\nأفضل صفقة.",
    subtext: "DM إذا عندك قصة",
    sticker: "question",
  },

  // —— Fitness ——
  {
    id: "fi-tot-1",
    niche: "fitness",
    type: "this_or_that",
    headline: "كارديو صباحي\nأو حديد مسائي؟",
    optionA: "كارديو",
    optionB: "حديد",
    sticker: "poll",
  },
  {
    id: "fi-tot-2",
    niche: "fitness",
    type: "this_or_that",
    headline: "دايت صارم شهر\nأو توازن طول السنة؟",
    optionA: "صارم",
    optionB: "توازن",
    sticker: "poll",
  },
  {
    id: "fi-seq-1",
    niche: "fitness",
    type: "sequence",
    headline: "سلسلة: يوم الراحة",
    sticker: "quiz",
    steps: [
      "جسمك يقول ارتاح… وعقلك يقول كسل 🧠",
      "الراحة جزء من التمرين — مو هروب منه.",
      "صوّت: راحة كاملة ولا مشي خفيف؟",
    ],
  },
  {
    id: "fi-qa-1",
    niche: "fitness",
    type: "qa",
    headline: "وش عذرك الأشهر\nلما تفوت تمرين؟ 👀",
    sticker: "question",
  },
  {
    id: "fi-con-1",
    niche: "fitness",
    type: "controversial",
    headline: "المكملات بدون نظام\nأكل = فلوس ضايعة.",
    subtext: "اتفق؟ خاص",
    sticker: "question",
  },

  // —— Food ——
  {
    id: "fo-tot-1",
    niche: "food",
    type: "this_or_that",
    headline: "بيتزا سادة كلاسيك\nأو محشية جبن زيادة؟",
    optionA: "سادة",
    optionB: "محشية",
    sticker: "poll",
  },
  {
    id: "fo-tot-2",
    niche: "food",
    type: "this_or_that",
    headline: "طبخ بيت\nأو طلب توصيل كل يوم؟",
    optionA: "بيت",
    optionB: "توصيل",
    sticker: "poll",
  },
  {
    id: "fo-seq-1",
    niche: "food",
    type: "sequence",
    headline: "سلسلة: الجوع الكاذب",
    sticker: "quiz",
    steps: [
      "فتحت الثلاجة ثالث مرة… وما في شي جديد 🧊",
      "مو جوع. ملل + سكر.",
      "صوّت: أشرب مي ولا أستسلم لسناك؟",
    ],
  },
  {
    id: "fo-qa-1",
    niche: "food",
    type: "qa",
    headline: "قلي أكلة مستحيل\nترفضها لو انعرضت عليك",
    sticker: "question",
  },
  {
    id: "fo-con-1",
    niche: "food",
    type: "controversial",
    headline: "البرغر النباتي\nما يعوّض الأصلي. خلاص.",
    subtext: "زعلان؟ DM",
    sticker: "question",
  },

  // —— Personal ——
  {
    id: "p-tot-1",
    niche: "personal",
    type: "this_or_that",
    headline: "صدق مؤلم\nأو كذبة مريحة؟",
    optionA: "صدق",
    optionB: "كذبة",
    sticker: "poll",
  },
  {
    id: "p-tot-2",
    niche: "personal",
    type: "this_or_that",
    headline: "تنسى بسرعة\nأو تحتفظ بكل ذكرى؟",
    optionA: "أنسى",
    optionB: "أحتفظ",
    sticker: "poll",
  },
  {
    id: "p-seq-1",
    niche: "personal",
    type: "sequence",
    headline: "سلسلة: الرسالة اللي ما انبعتت",
    sticker: "quiz",
    steps: [
      "كتبت رسالة طويلة… وحذفتها ✍️",
      "أحياناً السكوت أحكم من شرح ما راح يتفهم.",
      "صوّت: كنت بتبعثها ولا أحسن إنك ما بعثت؟",
    ],
  },
  {
    id: "p-qa-1",
    niche: "personal",
    type: "qa",
    headline: "اسألني أي سؤال\nما تجرؤ تسأله وجهاً لوجه",
    sticker: "question",
  },
  {
    id: "p-con-1",
    niche: "personal",
    type: "controversial",
    headline: "مو كل أحد يستاهل\nنسخة منك 100%.",
    subtext: "اكتب لي رأيك",
    sticker: "question",
  },
  {
    id: "p-trend-1",
    niche: "personal",
    type: "qa",
    headline: "تريند اليوم:\nوش الشيء اللي سويته\nهالأسبوع وما نشرته؟",
    sticker: "question",
    trend: true,
  },
];

export function getIdeas(niche: NicheId, type: StoryTypeId): StoryIdea[] {
  return ideas.filter((i) => i.niche === niche && i.type === type);
}

export function getTrendIdeas(niche?: NicheId): StoryIdea[] {
  const trends = ideas.filter((i) => i.trend);
  if (!niche) return trends;
  const nicheTrends = trends.filter((i) => i.niche === niche);
  return nicheTrends.length ? nicheTrends : trends;
}

export function pickRandom(
  niche: NicheId,
  type: StoryTypeId,
  excludeId?: string,
): StoryIdea {
  const pool = getIdeas(niche, type).filter((i) => i.id !== excludeId);
  const source = pool.length ? pool : getIdeas(niche, type);
  if (!source.length) {
    return {
      id: "fallback",
      niche,
      type,
      headline: "فكرة جديدة قريباً…\nجرّب نوع ستوري ثاني",
      sticker: "question",
    };
  }
  return source[Math.floor(Math.random() * source.length)]!;
}

export function ideaToCopyText(
  idea: StoryIdea,
  sequenceStep = 0,
): string {
  if (idea.type === "sequence" && idea.steps) {
    const step = idea.steps[sequenceStep] ?? idea.steps[0];
    return `الستوري ${sequenceStep + 1}/3:\n${step}`;
  }
  let text = idea.headline.replace(/\n/g, " ");
  if (idea.optionA && idea.optionB) {
    text += `\n\n① ${idea.optionA}\n② ${idea.optionB}`;
  }
  if (idea.subtext) text += `\n\n${idea.subtext}`;
  return text;
}

export { ideas as ALL_IDEAS };
