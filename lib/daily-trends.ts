import type { Locale } from "./i18n";
import type { LocText, NicheId, RawStoryIdea, StoryIdea } from "./types";
import { loc } from "./types";

const L = (ar: string, en: string, fr?: string): LocText => ({
  ar,
  en,
  fr: fr ?? en,
});

/** Large rotating trend pool — different set each calendar day */
const dailyTrendPool: RawStoryIdea[] = [
  {
    id: "d-g-1",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nكنترولر ولا لمس الشاشة؟",
      "Today's trend:\ncontroller or touchscreen?",
      "Tendance:\nmanette ou écran tactile ?",
    ),
    optionA: L("كنترولر", "Controller", "Manette"),
    optionB: L("لمس", "Touch", "Tactile"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-g-2",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nبث مباشر ولا مونتاج رييل؟",
      "Today's trend:\nlive stream or edited Reel?",
      "Tendance:\nlive ou Reel monté ?",
    ),
    optionA: L("بث", "Live", "Live"),
    optionB: L("رييل", "Reel", "Reel"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-g-3",
    niche: "gaming",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش لعبة الكل يلعبها الحين؟",
      "Today's trend:\nwhat game is everyone playing?",
      "Tendance:\nquel jeu tout le monde joue ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-g-4",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nفوز بـ clutch ولا فوز بسهولة؟",
      "Today's trend:\nclutch win or easy win?",
      "Tendance:\nvictoire clutch ou facile ?",
    ),
    optionA: L("Clutch", "Clutch", "Clutch"),
    optionB: L("سهل", "Easy", "Facile"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-g-5",
    niche: "gaming",
    type: "controversial",
    headline: L(
      "تريند اليوم:\nالـ smurf يخرّب المتعة.\nاتفق؟",
      "Today's trend:\nsmurfing ruins the fun.\nAgree?",
      "Tendance:\nle smurf tue le fun.\nD’accord ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-t-1",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nChatGPT ولا Claude؟",
      "Today's trend:\nChatGPT or Claude?",
      "Tendance:\nChatGPT ou Claude ?",
    ),
    optionA: L("ChatGPT", "ChatGPT", "ChatGPT"),
    optionB: L("Claude", "Claude", "Claude"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-t-2",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتثق بصور AI ولا تشك دائماً؟",
      "Today's trend:\ntrust AI images or always doubt?",
      "Tendance:\nfaire confiance aux images IA ?",
    ),
    optionA: L("أثق", "Trust", "Confiance"),
    optionB: L("أشك", "Doubt", "Doute"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-t-3",
    niche: "tech",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش أبلكيشن حذفته وهالأسبوع ندمان؟",
      "Today's trend:\napp you deleted and already miss?",
      "Tendance:\napp supprimée et déjà regrettée ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-t-4",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nوضع داكن ولا فاتح؟",
      "Today's trend:\ndark mode or light mode?",
      "Tendance:\nmode sombre ou clair ?",
    ),
    optionA: L("داكن", "Dark", "Sombre"),
    optionB: L("فاتح", "Light", "Clair"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-t-5",
    niche: "tech",
    type: "controversial",
    headline: L(
      "تريند اليوم:\nالناس اللي ترد خلال دقايق\nمو دائماً متفرغين — أحياناً مدمنين.",
      "Today's trend:\ninstant replies ≠ free time.\nSometimes it's addiction.",
      "Tendance:\nrépondre en 2 min ≠ dispo.\nParfois c’est l’addiction.",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-l-1",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nصباح منتج ولا مساء منتج؟",
      "Today's trend:\nmorning productivity or night?",
      "Tendance:\nproductif le matin ou le soir ?",
    ),
    optionA: L("صباح", "Morning", "Matin"),
    optionB: L("مساء", "Night", "Soir"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-l-2",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nرحلة داخل البلد ولا برا؟",
      "Today's trend:\nlocal trip or abroad?",
      "Tendance:\nvoyage local ou à l’étranger ?",
    ),
    optionA: L("داخلي", "Local", "Local"),
    optionB: L("خارجي", "Abroad", "Étranger"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-l-3",
    niche: "lifestyle",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش عادة بدأتها 2026\nوبتكمّل؟",
      "Today's trend:\nwhich 2026 habit are you keeping?",
      "Tendance:\nquelle habitude 2026 tu gardes ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-l-4",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nبدون سوشيال ميديا يوم كامل\nتقدر؟",
      "Today's trend:\ncan you do a full day\noff social media?",
      "Tendance:\nune journée sans réseaux,\ntu peux ?",
    ),
    optionA: L("أقدر", "Yes", "Oui"),
    optionB: L("لا", "No", "Non"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-f-1",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nMinimal ولا Maximal؟",
      "Today's trend:\nminimal or maximal?",
      "Tendance:\nminimal ou maximal ?",
    ),
    optionA: L("Minimal", "Minimal", "Minimal"),
    optionB: L("Maximal", "Maximal", "Maximal"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-f-2",
    niche: "fashion",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش لون صيفك هالسنة؟",
      "Today's trend:\nwhat's your summer color?",
      "Tendance:\nta couleur d’été ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-f-3",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nثrift / مستعمل ولا جديد؟",
      "Today's trend:\nthrifted or brand new?",
      "Tendance:\nseconde main ou neuf ?",
    ),
    optionA: L("مستعمل", "Thrift", "Seconde main"),
    optionB: L("جديد", "New", "Neuf"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-f-4",
    niche: "fashion",
    type: "controversial",
    headline: L(
      "تريند اليوم:\nالفاست فاشن رخيصة\nبس غالية على الكوكب.",
      "Today's trend:\nfast fashion is cheap\nbut costly for the planet.",
      "Tendance:\nla fast fashion est cheap\nmais chère pour la planète.",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-m-1",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nميم صوت ولا ميم صورة؟",
      "Today's trend:\nsound meme or image meme?",
      "Tendance:\nmème son ou image ?",
    ),
    optionA: L("صوت", "Sound", "Son"),
    optionB: L("صورة", "Image", "Image"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-m-2",
    niche: "memes",
    type: "qa",
    headline: L(
      "تريند اليوم:\nأرسل صوت تريند عالق براسك",
      "Today's trend:\ndrop the trend audio stuck in your head",
      "Tendance:\nenvoie l’audio tendance coincé dans ta tête",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-m-3",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتضحك على نفسك ولا على غيرك؟",
      "Today's trend:\nlaugh at yourself or others?",
      "Tendance:\nrire de toi ou des autres ?",
    ),
    optionA: L("نفسي", "Myself", "Moi"),
    optionB: L("غيري", "Others", "Autres"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-m-4",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nستوري ميم ولا رييل ميم؟",
      "Today's trend:\nmeme Story or meme Reel?",
      "Tendance:\nmème Story ou Reel ?",
    ),
    optionA: L("ستوري", "Story", "Story"),
    optionB: L("رييل", "Reel", "Reel"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-e-1",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nاشتري الحين ولا انتظر خصم؟",
      "Today's trend:\nbuy now or wait for a sale?",
      "Tendance:\nacheter maintenant ou attendre une promo ?",
    ),
    optionA: L("الحين", "Now", "Maintenant"),
    optionB: L("خصم", "Sale", "Promo"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-e-2",
    niche: "ecommerce",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش منتج ندمت إنك اشتريته أونلاين؟",
      "Today's trend:\nonline purchase you regret?",
      "Tendance:\nachat en ligne regretté ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-e-3",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتقييمات النجوم ولا فيديوهات الريفيو؟",
      "Today's trend:\nstar ratings or review videos?",
      "Tendance:\nnotes étoiles ou vidéos avis ?",
    ),
    optionA: L("نجوم", "Stars", "Étoiles"),
    optionB: L("فيديو", "Videos", "Vidéos"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-e-4",
    niche: "ecommerce",
    type: "controversial",
    headline: L(
      "تريند اليوم:\n«شحن مجاني» غالباً\nمعناه السعر أعلى من قبل.",
      "Today's trend:\n“free shipping” usually means\nthe price went up first.",
      "Tendance:\n« livraison gratuite » = souvent\nprix gonflé avant.",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-fi-1",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nخطوات 10 آلاف ولا تمرين قوة؟",
      "Today's trend:\n10k steps or strength training?",
      "Tendance:\n10k pas ou musculation ?",
    ),
    optionA: L("خطوات", "Steps", "Pas"),
    optionB: L("قوة", "Strength", "Force"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-fi-2",
    niche: "fitness",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش أغنية تمرينك حالياً؟",
      "Today's trend:\nwhat's your workout anthem?",
      "Tendance:\nton hymne de workout ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-fi-3",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتمرين صباحي قبل الجوال\nتقدر؟",
      "Today's trend:\nworkout before phone — can you?",
      "Tendance:\nworkout avant le téléphone — tu peux ?",
    ),
    optionA: L("أقدر", "Yes", "Oui"),
    optionB: L("صعب", "Hard", "Difficile"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-fo-1",
    niche: "food",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nMatcha ولا قهوة؟",
      "Today's trend:\nmatcha or coffee?",
      "Tendance:\nmatcha ou café ?",
    ),
    optionA: L("ماتشا", "Matcha", "Matcha"),
    optionB: L("قهوة", "Coffee", "Café"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-fo-2",
    niche: "food",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nأكل صحي طول الأسبوع\nولا cheat day كبير؟",
      "Today's trend:\nclean week or big cheat day?",
      "Tendance:\nsemaine clean ou gros cheat day ?",
    ),
    optionA: L("صحي", "Clean", "Clean"),
    optionB: L("Cheat", "Cheat", "Cheat"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-fo-3",
    niche: "food",
    type: "qa",
    headline: L(
      "تريند اليوم:\nقلي وصفة تريند جربتها ونجحت",
      "Today's trend:\ntrend recipe you actually nailed",
      "Tendance:\nrecette tendance réussie ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-fo-4",
    niche: "food",
    type: "controversial",
    headline: L(
      "تريند اليوم:\nالأناناس على البيتزا\nجريمة ولا عادي؟",
      "Today's trend:\npineapple on pizza — crime or fine?",
      "Tendance:\nananas sur pizza — crime ou ok ?",
    ),
    optionA: L("جريمة", "Crime", "Crime"),
    optionB: L("عادي", "Fine", "OK"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-p-1",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتقول اللي بقلبك ولا تسكت؟",
      "Today's trend:\nsay it or stay quiet?",
      "Tendance:\nle dire ou se taire ?",
    ),
    optionA: L("أقول", "Say it", "Le dire"),
    optionB: L("أسكت", "Quiet", "Se taire"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-p-2",
    niche: "personal",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش شيء صغير فرّحك هالأسبوع؟",
      "Today's trend:\nsmall thing that made your week?",
      "Tendance:\npetite chose qui a illuminé ta semaine ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-p-3",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتغلق على الناس ولا\nتشرح وتتعب؟",
      "Today's trend:\ncut people off\nor explain until exhausted?",
      "Tendance:\ncouper les liens\nou tout expliquer ?",
    ),
    optionA: L("أقفل", "Cut off", "Couper"),
    optionB: L("أشرح", "Explain", "Expliquer"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-p-4",
    niche: "personal",
    type: "qa",
    headline: L(
      "تريند اليوم:\nلو يومك يعاد… وش تغيّر؟",
      "Today's trend:\nif today restarted… what changes?",
      "Tendance:\nsi la journée recommence… tu changes quoi ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-x-1",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتشتغل من البيت ولا مكتب؟",
      "Today's trend:\nwork from home or office?",
      "Tendance:\ntélétravail ou bureau ?",
    ),
    optionA: L("بيت", "Home", "Maison"),
    optionB: L("مكتب", "Office", "Bureau"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-x-2",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nإشعارات مفعّلة ولا صامت؟",
      "Today's trend:\nnotifications on or silent?",
      "Tendance:\nnotifications ON ou silencieux ?",
    ),
    optionA: L("مفعّلة", "On", "ON"),
    optionB: L("صامت", "Silent", "Silent"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-x-3",
    niche: "memes",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوصف يومك بـ emoji واحد بس",
      "Today's trend:\ndescribe your day in one emoji",
      "Tendance:\ndécris ta journée en 1 emoji",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-x-4",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nخطة صارمة ولا improvisation؟",
      "Today's trend:\nstrict plan or improvisation?",
      "Tendance:\nplan strict ou improvisation ?",
    ),
    optionA: L("خطة", "Plan", "Plan"),
    optionB: L("ارتجال", "Improv", "Impro"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-x-5",
    niche: "gaming",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش أسوأ رتبة وصلت لها وضحكت؟",
      "Today's trend:\nfunniest rank you’ve ever hit?",
      "Tendance:\nton rank le plus drôle ?",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-x-6",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nsneakers ولا رسمي؟",
      "Today's trend:\nsneakers or formal?",
      "Tendance:\nsneakers ou habillé ?",
    ),
    optionA: L("Sneakers", "Sneakers", "Sneakers"),
    optionB: L("رسمي", "Formal", "Habillé"),
    sticker: "poll",
    trend: true,
  },
  {
    id: "d-x-7",
    niche: "fitness",
    type: "controversial",
    headline: L(
      "تريند اليوم:\n«No pain no gain»\nموصح دائماً — الراحة جزء من القوة.",
      "Today's trend:\n“no pain no gain” isn’t always true — rest builds strength.",
      "Tendance:\n« no pain no gain » n’est pas toujours vrai — le repos construit.",
    ),
    sticker: "question",
    trend: true,
  },
  {
    id: "d-x-8",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتشتري من إنستغرام ولا تيك توك؟",
      "Today's trend:\nbuy on Instagram or TikTok?",
      "Tendance:\nacheter sur Instagram ou TikTok ?",
    ),
    optionA: L("إنستغرام", "Instagram", "Instagram"),
    optionB: L("تيك توك", "TikTok", "TikTok"),
    sticker: "poll",
    trend: true,
  },
];

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function hashSeed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function localize(raw: RawStoryIdea, locale: Locale): StoryIdea {
  return {
    id: raw.id,
    niche: raw.niche,
    type: raw.type,
    headline: loc(raw.headline, locale),
    subtext: raw.subtext ? loc(raw.subtext, locale) : undefined,
    optionA: raw.optionA ? loc(raw.optionA, locale) : undefined,
    optionB: raw.optionB ? loc(raw.optionB, locale) : undefined,
    sticker: raw.sticker,
    steps: raw.steps
      ? [
          loc(raw.steps[0], locale),
          loc(raw.steps[1], locale),
          loc(raw.steps[2], locale),
        ]
      : undefined,
    trend: true,
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function getDailyTrends(
  locale: Locale,
  niche?: NicheId,
  count = 8,
): StoryIdea[] {
  const seed = hashSeed(`vantox-trends-${dayKey()}`);
  const rand = mulberry32(seed);
  const nicheFirst = niche
    ? dailyTrendPool.filter((t) => t.niche === niche)
    : [];
  const rest = dailyTrendPool.filter((t) => !niche || t.niche !== niche);
  const ordered = [
    ...shuffle(nicheFirst, rand),
    ...shuffle(rest, rand),
  ];
  return ordered.slice(0, count).map((t) => localize(t, locale));
}

export function getTrendDayLabel(locale: Locale): string {
  const d = new Date();
  return d.toLocaleDateString(
    locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en",
    { weekday: "long", day: "numeric", month: "short" },
  );
}

export { dailyTrendPool };
