export type Locale = "ar" | "en" | "fr";

export const LOCALES: { id: Locale; label: string; dir: "rtl" | "ltr" }[] = [
  { id: "ar", label: "العربية", dir: "rtl" },
  { id: "en", label: "English", dir: "ltr" },
  { id: "fr", label: "Français", dir: "ltr" },
];

export const LOCALE_KEY = "vantox-locale";

export type Dictionary = {
  tagline: string;
  heroTitle: string;
  heroBody: string;
  chooseNiche: string;
  storyType: string;
  sequenceSteps: string;
  bgColors: string;
  newIdea: string;
  background: string;
  currentText: string;
  copyText: string;
  copied: string;
  downloadPng: string;
  downloadPdf: string;
  preparing: string;
  previewHint: string;
  todayTrend: string;
  edit: string;
  preview: string;
  day: string;
  manualWrite: string;
  manualHint: string;
  optionA: string;
  optionB: string;
  subtext: string;
  downloadFailed: string;
  niches: Record<string, string>;
  types: Record<
    string,
    { label: string; short: string; description: string }
  >;
  storyOf: string;
  askMe: string;
  adSidebar: string;
  adAnchor: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
};

export const DICTS: Record<Locale, Dictionary> = {
  ar: {
    tagline: "فكرة كل صباح · تفاعل كل يوم",
    heroTitle: "مولّد سيناريوهات الستوري الشديدة التفاعل",
    heroBody:
      "اختر مجالك، عدّل النص يدوياً، وحمّل PNG أو PDF جاهز بنسبة 9:16 لإنستغرام وتيك توك.",
    chooseNiche: "اختر المجال",
    storyType: "نوع الستوري",
    sequenceSteps: "خطوات السلسلة",
    bgColors: "ألوان الخلفية",
    newIdea: "فكرة جديدة",
    background: "خلفية",
    currentText: "النص الحالي — قابل للتعديل",
    copyText: "نسخ النص",
    copied: "تم النسخ",
    downloadPng: "تحميل PNG",
    downloadPdf: "تحميل PDF",
    preparing: "جاري التجهيز…",
    previewHint: "المعاينة بنسبة 9:16 — جاهزة لإنستغرام وتيك توك",
    todayTrend: "تريند اليوم",
    edit: "تعديل",
    preview: "معاينة",
    day: "يوم",
    manualWrite: "كتابة يدوية",
    manualHint: "اكتب أو عدّل النص مباشرة — يظهر فوراً في المعاينة",
    optionA: "الخيار أ",
    optionB: "الخيار ب",
    subtext: "نص إضافي",
    downloadFailed: "تعذّر التحميل. جرّب مرة ثانية.",
    niches: {
      gaming: "جيمنج",
      tech: "تقنية",
      lifestyle: "لايف ستايل",
      fashion: "أزياء",
      memes: "ميمز",
      ecommerce: "تجارة",
      fitness: "رياضة",
      food: "طعام",
      personal: "شخصي",
    },
    types: {
      this_or_that: {
        label: "هذا أم ذاك",
        short: "تصويت",
        description: "أسئلة مقارنة سريعة ترفع التفاعل فوراً",
      },
      sequence: {
        label: "سلسلة تشويق",
        short: "3 ستوريات",
        description: "Hook ← مشكلة ← استبيان",
      },
      qa: {
        label: "أسئلة المتابعين",
        short: "Q&A",
        description: "تجبر المتابع على الرد في الـ DMs",
      },
      controversial: {
        label: "جدل يومي",
        short: "جدل",
        description: "أسئلة مثيرة تضمن ردود خاصة",
      },
    },
    storyOf: "ستوري {n} من 3",
    askMe: "اسألني أي شيء…",
    adSidebar: "إعلان جانبي",
    adAnchor: "إعلان لاصق سفلي · AdSense",
    notFoundTitle: "404",
    notFoundBody: "الصفحة مو موجودة",
    notFoundCta: "رجوع لـ VANTOX",
  },
  en: {
    tagline: "An idea every morning · engagement every day",
    heroTitle: "High-engagement story scenario generator",
    heroBody:
      "Pick your niche, edit the copy manually, and download a 9:16 PNG or PDF ready for Instagram and TikTok.",
    chooseNiche: "Choose niche",
    storyType: "Story type",
    sequenceSteps: "Sequence steps",
    bgColors: "Background colors",
    newIdea: "New idea",
    background: "Background",
    currentText: "Current text — editable",
    copyText: "Copy text",
    copied: "Copied",
    downloadPng: "Download PNG",
    downloadPdf: "Download PDF",
    preparing: "Preparing…",
    previewHint: "9:16 preview — ready for Instagram & TikTok",
    todayTrend: "Today's trend",
    edit: "Edit",
    preview: "Preview",
    day: "day",
    manualWrite: "Write manually",
    manualHint: "Type or edit text — it updates the preview instantly",
    optionA: "Option A",
    optionB: "Option B",
    subtext: "Extra line",
    downloadFailed: "Download failed. Please try again.",
    niches: {
      gaming: "Gaming",
      tech: "Tech",
      lifestyle: "Lifestyle",
      fashion: "Fashion",
      memes: "Memes",
      ecommerce: "Business",
      fitness: "Fitness",
      food: "Food",
      personal: "Personal",
    },
    types: {
      this_or_that: {
        label: "This or That",
        short: "Poll",
        description: "Fast comparison questions that boost replies",
      },
      sequence: {
        label: "Teaser series",
        short: "3 stories",
        description: "Hook → problem → poll",
      },
      qa: {
        label: "Follower Q&A",
        short: "Q&A",
        description: "Gets followers to reply in DMs",
      },
      controversial: {
        label: "Daily debate",
        short: "Debate",
        description: "Spicy takes that spark private replies",
      },
    },
    storyOf: "Story {n} of 3",
    askMe: "Ask me anything…",
    adSidebar: "Side ad",
    adAnchor: "Anchor ad · AdSense",
    notFoundTitle: "404",
    notFoundBody: "Page not found",
    notFoundCta: "Back to VANTOX",
  },
  fr: {
    tagline: "Une idée chaque matin · de l’engagement chaque jour",
    heroTitle: "Générateur de scénarios Stories ultra engageants",
    heroBody:
      "Choisissez votre niche, modifiez le texte, et téléchargez un PNG ou PDF 9:16 prêt pour Instagram et TikTok.",
    chooseNiche: "Choisir la niche",
    storyType: "Type de story",
    sequenceSteps: "Étapes de la série",
    bgColors: "Couleurs de fond",
    newIdea: "Nouvelle idée",
    background: "Fond",
    currentText: "Texte actuel — modifiable",
    copyText: "Copier le texte",
    copied: "Copié",
    downloadPng: "Télécharger PNG",
    downloadPdf: "Télécharger PDF",
    preparing: "Préparation…",
    previewHint: "Aperçu 9:16 — prêt pour Instagram & TikTok",
    todayTrend: "Tendance du jour",
    edit: "Modifier",
    preview: "Aperçu",
    day: "jour",
    manualWrite: "Écrire manuellement",
    manualHint: "Écrivez ou modifiez le texte — l’aperçu se met à jour",
    optionA: "Option A",
    optionB: "Option B",
    subtext: "Ligne extra",
    downloadFailed: "Échec du téléchargement. Réessayez.",
    niches: {
      gaming: "Gaming",
      tech: "Tech",
      lifestyle: "Lifestyle",
      fashion: "Mode",
      memes: "Mèmes",
      ecommerce: "Business",
      fitness: "Fitness",
      food: "Food",
      personal: "Perso",
    },
    types: {
      this_or_that: {
        label: "Ceci ou cela",
        short: "Sondage",
        description: "Comparaisons rapides qui boostent les réponses",
      },
      sequence: {
        label: "Série teasing",
        short: "3 stories",
        description: "Hook → problème → sondage",
      },
      qa: {
        label: "Q&R abonnés",
        short: "Q&R",
        description: "Pousse les abonnés à répondre en DM",
      },
      controversial: {
        label: "Débat du jour",
        short: "Débat",
        description: "Opinions fortes qui génèrent des DM",
      },
    },
    storyOf: "Story {n} sur 3",
    askMe: "Demandez-moi n’importe quoi…",
    adSidebar: "Pub latérale",
    adAnchor: "Pub ancrée · AdSense",
    notFoundTitle: "404",
    notFoundBody: "Page introuvable",
    notFoundCta: "Retour à VANTOX",
  },
};
