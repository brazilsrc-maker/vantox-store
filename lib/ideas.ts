import type { Locale } from "./i18n";
import type {
  LocText,
  NicheId,
  RawStoryIdea,
  StoryIdea,
  StoryTypeId,
} from "./types";
import { loc } from "./types";

const L = (ar: string, en: string, fr?: string): LocText => ({
  ar,
  en,
  fr: fr ?? en,
});

const rawIdeas: RawStoryIdea[] = [
  // —— Gaming ——
  {
    id: "g-tot-1",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تستغني عن الـ PC سنة\nأو تستغني عن الموبايل شهر؟",
      "Give up PC for a year\nor phone for a month?",
      "Abandonner le PC 1 an\nou le téléphone 1 mois ?",
    ),
    optionA: L("PC سنة", "PC a year", "PC 1 an"),
    optionB: L("موبايل شهر", "Phone a month", "Téléphone 1 mois"),
    sticker: "poll",
  },
  {
    id: "g-tot-2",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "فوز بدون شرف\nأو خسارة شريفة؟",
      "Dirty win\nor honorable loss?",
      "Victoire sale\nou défaite honorable ?",
    ),
    optionA: L("فوز خسيس", "Dirty win", "Victoire sale"),
    optionB: L("خسارة شريفة", "Honor loss", "Défaite honorable"),
    sticker: "poll",
  },
  {
    id: "g-tot-3",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تلعب 12 ساعة يومياً\nأو ما تلعب أسبوع كامل؟",
      "Play 12 hours daily\nor zero for a week?",
      "Jouer 12h/jour\nou zéro une semaine ?",
    ),
    optionA: L("12 ساعة", "12 hours", "12 heures"),
    optionB: L("أسبوع بريك", "Week off", "Semaine off"),
    sticker: "poll",
  },
  {
    id: "g-tot-4",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "سكينات نادرة غالية\nأو مهارات عالية بسكن رخيص؟",
      "Rare expensive skins\nor skill with cheap skins?",
      "Skins rares chers\nou skill avec skins cheap ?",
    ),
    optionA: L("سكينات", "Skins", "Skins"),
    optionB: L("مهارة", "Skill", "Skill"),
    sticker: "poll",
  },
  {
    id: "g-tot-5",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تلعب رانكد لحالك\nأو كاجوال مع أصحابك؟",
      "Solo ranked\nor casual with friends?",
      "Ranked solo\nou casual entre potes ?",
    ),
    optionA: L("رانكد", "Ranked", "Ranked"),
    optionB: L("كاجوال", "Casual", "Casual"),
    sticker: "poll",
  },
  {
    id: "g-seq-1",
    niche: "gaming",
    type: "sequence",
    headline: L("سلسلة: التيم السام", "Series: toxic team", "Série: team toxic"),
    sticker: "quiz",
    steps: [
      L(
        "لو تيمك خانك في آخر راوند… وش تسوي؟ 👀",
        "Your team throws the last round… what do you do? 👀",
        "Ton team throw le dernier round… tu fais quoi ? 👀",
      ),
      L(
        "المشكلة مو الخسارة — المشكلة إنك تثق فيهم كل مرة",
        "Loss isn’t the issue — trusting them every time is",
        "Le problème n’est pas la défaite — c’est de leur faire confiance",
      ),
      L(
        "صوّت: تبلّغ عليهم ولا تسكت وتغير سيرفر؟",
        "Vote: report them or mute and switch server?",
        "Vote: report ou mute et change de serveur ?",
      ),
    ],
  },
  {
    id: "g-seq-2",
    niche: "gaming",
    type: "sequence",
    headline: L("سلسلة: الـ clutch", "Series: the clutch", "Série: le clutch"),
    sticker: "quiz",
    steps: [
      L("1 ضد 4… والقلب يدق 💥", "1v4… heart racing 💥", "1v4… cœur qui bat 💥"),
      L(
        "كل عين عليك. لحظة تفرّق بين ليجند وكوميدي.",
        "All eyes on you. Legend or meme moment.",
        "Tout le monde regarde. Légende ou fail viral.",
      ),
      L(
        "صوّت: تلعب آمن ولا تندفع؟",
        "Vote: play safe or push?",
        "Vote: play safe ou push ?",
      ),
    ],
  },
  {
    id: "g-qa-1",
    niche: "gaming",
    type: "qa",
    headline: L(
      "قلي أقوى لعبة لعبتها 2026\nوبلا نقاش 🔥",
      "Best game you played in 2026\n— no debate 🔥",
      "Meilleur jeu joué en 2026\n— sans débat 🔥",
    ),
    subtext: L("اكتبها في الردود", "Drop it in replies", "Écris en commentaires"),
    sticker: "question",
  },
  {
    id: "g-qa-2",
    niche: "gaming",
    type: "qa",
    headline: L(
      "وش أسوأ تيم ميت معك\nهالأسبوع؟",
      "Worst teammate you had\nthis week?",
      "Pire coéquipier cette\nsemaine ?",
    ),
    sticker: "question",
  },
  {
    id: "g-con-1",
    niche: "gaming",
    type: "controversial",
    headline: L(
      "رأيي: الموبايل قيمنق\nمو قيمنق حقيقي.",
      "Hot take: mobile gaming\nisn’t real gaming.",
      "Avis chaud: le mobile\nn’est pas du vrai gaming.",
    ),
    subtext: L("اتفق؟ اكتب لي في الخاص", "Agree? DM me", "D’accord ? DM"),
    sticker: "question",
  },
  {
    id: "g-con-2",
    niche: "gaming",
    type: "controversial",
    headline: L(
      "البينيات تدمّر المتعة\nأكثر مما توازن اللعبة.",
      "Pay-to-win ruins fun\nmore than it balances games.",
      "Le pay-to-win tue le fun\nplus qu’il n’équilibre.",
    ),
    sticker: "question",
  },
  {
    id: "g-trend-1",
    niche: "gaming",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nسكينات نادرة ولا سكنات مجانية حلوة؟",
      "Today's trend:\nrare skins or free drip?",
      "Tendance:\nskins rares ou free stylés ?",
    ),
    optionA: L("نادرة", "Rare", "Rares"),
    optionB: L("مجانية فخمة", "Free drip", "Free stylés"),
    sticker: "poll",
    trend: true,
  },

  // —— Tech ——
  {
    id: "t-tot-1",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "آيفون بسعر عالي\nأو أندرويد فلاجشيب أرخص؟",
      "Pricey iPhone\nor cheaper Android flagship?",
      "iPhone cher\nou Android flagship moins cher ?",
    ),
    optionA: L("آيفون", "iPhone", "iPhone"),
    optionB: L("أندرويد", "Android", "Android"),
    sticker: "poll",
  },
  {
    id: "t-tot-2",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تشات GPT يكتب شغلك\nأو أنت تكتب كل شي يدوي؟",
      "ChatGPT writes your work\nor you write everything?",
      "ChatGPT écrit ton travail\nou tu écris tout ?",
    ),
    optionA: L("AI يكتب", "AI writes", "IA écrit"),
    optionB: L("يدي 100%", "100% manual", "100% manuel"),
    sticker: "poll",
  },
  {
    id: "t-tot-3",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "خصوصية أقوى\nأو ميزات أكثر؟",
      "Stronger privacy\nor more features?",
      "Plus de privacy\nou plus de features ?",
    ),
    optionA: L("خصوصية", "Privacy", "Privacy"),
    optionB: L("ميزات", "Features", "Features"),
    sticker: "poll",
  },
  {
    id: "t-tot-4",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تحدّث فوراً\nأو تنتظر أسبوعين؟",
      "Update instantly\nor wait two weeks?",
      "Update immédiat\nou attendre 2 semaines ?",
    ),
    optionA: L("فوراً", "Now", "Maintenant"),
    optionB: L("أنتظر", "Wait", "Attendre"),
    sticker: "poll",
  },
  {
    id: "t-seq-1",
    niche: "tech",
    type: "sequence",
    headline: L(
      "سلسلة: التحديث المشؤوم",
      "Series: cursed update",
      "Série: update maudite",
    ),
    sticker: "quiz",
    steps: [
      L(
        "حدّثت الجهاز… والحين ما يفتح 💀",
        "Updated the phone… now it won’t boot 💀",
        "Update fait… et plus rien 💀",
      ),
      L(
        "كل إعداداتك راحت. النسخ الاحتياطي؟ نسيته.",
        "Settings gone. Backup? You forgot.",
        "Réglages partis. Backup ? Oublié.",
      ),
      L(
        "تصوّت: تحديث فوري ولا تنتظر أسبوعين؟",
        "Vote: update now or wait two weeks?",
        "Vote: update now ou attendre 2 semaines ?",
      ),
    ],
  },
  {
    id: "t-qa-1",
    niche: "tech",
    type: "qa",
    headline: L(
      "وش أسوأ إعدادات غيّرتها\nوندمت عليها؟",
      "Worst setting you changed\nand instantly regretted?",
      "Pire réglage changé\net regretté ?",
    ),
    sticker: "question",
  },
  {
    id: "t-qa-2",
    niche: "tech",
    type: "qa",
    headline: L(
      "أي أداة AI صارت\nجزء من روتينك؟",
      "Which AI tool became\npart of your routine?",
      "Quel outil IA fait\npartie de ta routine ?",
    ),
    sticker: "question",
  },
  {
    id: "t-con-1",
    niche: "tech",
    type: "controversial",
    headline: L(
      "الناس اللي ما تستخدم\nمدير كلمات مرور… خطر على نفسها.",
      "No password manager?\nYou’re a security risk.",
      "Pas de gestionnaire de mots de passe ?\nRisque sécurité.",
    ),
    subtext: L("رد عليّ إذا زعلان", "Reply if mad", "Réponds si vexé"),
    sticker: "question",
  },
  {
    id: "t-trend-1",
    niche: "tech",
    type: "this_or_that",
    headline: L(
      "تريند AI:\nتثق بالذكاء الاصطناعي\nولا تخاف منه؟",
      "AI trend:\ntrust AI\nor fear it?",
      "Tendance IA:\nfaire confiance\nou avoir peur ?",
    ),
    optionA: L("أثق", "Trust", "Confiance"),
    optionB: L("أخاف", "Fear", "Peur"),
    sticker: "poll",
    trend: true,
  },

  // —— Lifestyle ——
  {
    id: "l-tot-1",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تصحى بدري وتنتج\nأو تسهر وتعيش الليل؟",
      "Early bird productivity\nor night owl life?",
      "Lève-tôt productif\nou oiseau de nuit ?",
    ),
    optionA: L("بدري", "Early", "Tôt"),
    optionB: L("سهر", "Night", "Nuit"),
    sticker: "poll",
  },
  {
    id: "l-tot-2",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "رحلة لوحدك\nأو مع ناس ما تتحملهم؟",
      "Solo trip\nor travel with people you can’t stand?",
      "Voyage solo\nou avec des gens insupportables ?",
    ),
    optionA: L("وحدي", "Solo", "Solo"),
    optionB: L("معهم", "With them", "Avec eux"),
    sticker: "poll",
  },
  {
    id: "l-tot-3",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "فلوس أكثر وشغل أكثر\nأو وقت فراغ أكثر؟",
      "More money + more work\nor more free time?",
      "Plus d’argent + travail\nou plus de temps libre ?",
    ),
    optionA: L("فلوس", "Money", "Argent"),
    optionB: L("وقت", "Time", "Temps"),
    sticker: "poll",
  },
  {
    id: "l-seq-1",
    niche: "lifestyle",
    type: "sequence",
    headline: L(
      "سلسلة: روتين الصباح",
      "Series: morning routine",
      "Série: routine du matin",
    ),
    sticker: "quiz",
    steps: [
      L(
        "الساعة 6 الصبح… والجوال يقول: 47 إشعار 📱",
        "6 AM… phone shows 47 notifications 📱",
        "6h… 47 notifications 📱",
      ),
      L(
        "تشوفهم قبل القهوة؟ هنا يبدأ يومك غلط.",
        "Check them before coffee? Day already ruined.",
        "Les ouvrir avant le café ? Journée ratée.",
      ),
      L(
        "صوّت: بدون جوال أول ساعة ولا ما أقدر؟",
        "Vote: no phone first hour or impossible?",
        "Vote: sans téléphone 1h ou impossible ?",
      ),
    ],
  },
  {
    id: "l-qa-1",
    niche: "lifestyle",
    type: "qa",
    headline: L(
      "قلي عادة صغيرة غيّرت\nحياتك للأفضل ✨",
      "Tiny habit that changed\nyour life for the better ✨",
      "Petite habitude qui a\namélioré ta vie ✨",
    ),
    sticker: "question",
  },
  {
    id: "l-qa-2",
    niche: "lifestyle",
    type: "qa",
    headline: L(
      "وش الشيء اللي وقفته\nوندمت إنك ما وقفته بدري؟",
      "What did you quit\nand wish you quit sooner?",
      "Qu’as-tu arrêté\net regreté de ne pas avoir fait plus tôt ?",
    ),
    sticker: "question",
  },
  {
    id: "l-con-1",
    niche: "lifestyle",
    type: "controversial",
    headline: L(
      "الإجازات الطويلة\nتخرب الانضباط أكثر مما تريّحك.",
      "Long vacations ruin discipline\nmore than they rest you.",
      "Les longues vacances cassent\nplus la discipline qu’elles reposent.",
    ),
    subtext: L("DM إذا اختلفت", "DM if you disagree", "DM si pas d’accord"),
    sticker: "question",
  },
  {
    id: "l-trend-1",
    niche: "lifestyle",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\ndigital detox يوم كامل\nولا مستحيل؟",
      "Today's trend:\nfull-day digital detox\nor impossible?",
      "Tendance:\ndigital detox 24h\nou impossible ?",
    ),
    optionA: L("أقدر", "I can", "Je peux"),
    optionB: L("مستحيل", "Impossible", "Impossible"),
    sticker: "poll",
    trend: true,
  },

  // —— Fashion ——
  {
    id: "f-tot-1",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "قطعة غالية تدوم\nأو 5 قطع رخيصة ترند؟",
      "One lasting expensive piece\nor 5 cheap trend pieces?",
      "1 pièce chère durable\nou 5 pièces cheap tendance ?",
    ),
    optionA: L("غالية تدوم", "Lasts", "Durable"),
    optionB: L("ترند رخيص", "Cheap trend", "Tendance cheap"),
    sticker: "poll",
  },
  {
    id: "f-tot-2",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "أسود كلاسيك دائماً\nأو ألوان جريئة اليوم؟",
      "Always classic black\nor bold colors today?",
      "Noir classique toujours\nou couleurs audacieuses ?",
    ),
    optionA: L("أسود", "Black", "Noir"),
    optionB: L("ألوان", "Colors", "Couleurs"),
    sticker: "poll",
  },
  {
    id: "f-tot-3",
    niche: "fashion",
    type: "this_or_that",
    headline: L(
      "أوتفت مريح\nأو أوتفت يطلع في الصور؟",
      "Comfort outfit\nor camera-ready outfit?",
      "Confort\nou outfit photo-ready ?",
    ),
    optionA: L("مريح", "Comfort", "Confort"),
    optionB: L("صور", "Photos", "Photos"),
    sticker: "poll",
  },
  {
    id: "f-seq-1",
    niche: "fashion",
    type: "sequence",
    headline: L(
      "سلسلة: الأوتفت الغلط",
      "Series: wrong outfit",
      "Série: mauvais outfit",
    ),
    sticker: "quiz",
    steps: [
      L(
        "طلعت من البيت وأنت واثق… وصورة المرآة كذبت 😅",
        "Left home confident… mirror selfie lied 😅",
        "Sorti confiant… le selfie a menti 😅",
      ),
      L(
        "المشكلة مو القطعة — المشكلة التنسيق.",
        "Not the piece — the styling.",
        "Pas la pièce — le styling.",
      ),
      L(
        "صوّت: أرجع أغيّر ولا أكمل وأنا مو مرتاح؟",
        "Vote: go change or push through uncomfortable?",
        "Vote: rentrer changer ou continuer gêné ?",
      ),
    ],
  },
  {
    id: "f-qa-1",
    niche: "fashion",
    type: "qa",
    headline: L(
      "وش القطعة اللي لو راحت\nمن خزانتك تنهار؟",
      "Which piece would break\nyour wardrobe if it vanished?",
      "Quelle pièce ferait\nexploser ta garde-robe si elle disparaît ?",
    ),
    sticker: "question",
  },
  {
    id: "f-con-1",
    niche: "fashion",
    type: "controversial",
    headline: L(
      "البراند مو ستايل.\nالذوق الشخصي هو الستايل.",
      "Brands aren’t style.\nPersonal taste is.",
      "La marque n’est pas le style.\nLe goût perso l’est.",
    ),
    subtext: L("اتفق؟ خاص", "Agree? DM", "D’accord ? DM"),
    sticker: "question",
  },

  // —— Memes ——
  {
    id: "m-tot-1",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تميم قديم كلاسيك\nأو تريند جديد كل ساعة؟",
      "Classic old meme\nor new trend every hour?",
      "Mème classique\nou tendance chaque heure ?",
    ),
    optionA: L("كلاسيك", "Classic", "Classique"),
    optionB: L("تريند", "Trend", "Tendance"),
    sticker: "poll",
  },
  {
    id: "m-tot-2",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تضحك بصوت عالي\nأو تموت من جوا وتسكت؟",
      "Laugh out loud\nor die silently inside?",
      "Rire fort\nou mourir en silence ?",
    ),
    optionA: L("صوت عالي", "LOL out loud", "Rire fort"),
    optionB: L("صامت 💀", "Silent 💀", "Silencieux 💀"),
    sticker: "poll",
  },
  {
    id: "m-tot-3",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تميم نصي\nأو تميم صورة؟",
      "Text meme\nor image meme?",
      "Mème texte\nou mème image ?",
    ),
    optionA: L("نصي", "Text", "Texte"),
    optionB: L("صورة", "Image", "Image"),
    sticker: "poll",
  },
  {
    id: "m-seq-1",
    niche: "memes",
    type: "sequence",
    headline: L(
      "سلسلة: الرسالة الغلط",
      "Series: wrong chat",
      "Série: mauvais chat",
    ),
    sticker: "quiz",
    steps: [
      L(
        "أرسلت الرسالة للشخص الغلط… 👁️",
        "Sent the message to the wrong person… 👁️",
        "Message envoyé à la mauvaise personne… 👁️",
      ),
      L(
        "والأسوأ؟ كانت عن الشخص نفسه.",
        "Worse: it was about that person.",
        "Pire: c’était à propos de cette personne.",
      ),
      L(
        "صوّت: أحذف وأهرب ولا أوضح؟",
        "Vote: delete & run or explain?",
        "Vote: supprimer & fuir ou expliquer ?",
      ),
    ],
  },
  {
    id: "m-qa-1",
    niche: "memes",
    type: "qa",
    headline: L(
      "أرسل لي أغبى ميم\nشافه عقلك هالأسبوع 😂",
      "Send the dumbest meme\nyour brain saw this week 😂",
      "Envoie le mème le plus\nabsurde de ta semaine 😂",
    ),
    sticker: "question",
  },
  {
    id: "m-con-1",
    niche: "memes",
    type: "controversial",
    headline: L(
      "الميمز صارت\nأعمق من الأخبار أحياناً.",
      "Memes are sometimes\ndeeper than the news.",
      "Les mèmes sont parfois\nplus profonds que l’actu.",
    ),
    subtext: L("رد لو توافق", "Reply if you agree", "Réponds si d’accord"),
    sticker: "question",
  },
  {
    id: "m-trend-1",
    niche: "memes",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتسوي الرييل ولا\nتكتفي بالستوري؟",
      "Today's trend:\nmake a Reel\nor stick to Stories?",
      "Tendance:\nfaire un Reel\nou rester en Stories ?",
    ),
    optionA: L("رييل", "Reel", "Reel"),
    optionB: L("ستوري", "Story", "Story"),
    sticker: "poll",
    trend: true,
  },

  // —— Ecommerce ——
  {
    id: "e-tot-1",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "خصم 50% اليوم\nأو جودة أعلى بدون خصم؟",
      "50% off today\nor higher quality, no discount?",
      "−50% aujourd’hui\nou meilleure qualité sans promo ?",
    ),
    optionA: L("خصم", "Discount", "Promo"),
    optionB: L("جودة", "Quality", "Qualité"),
    sticker: "poll",
  },
  {
    id: "e-tot-2",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "تشتري من ستوري\nأو تروح الموقع وتشوف؟",
      "Buy from a Story\nor visit the website first?",
      "Acheter via Story\nou aller sur le site ?",
    ),
    optionA: L("ستوري", "Story", "Story"),
    optionB: L("الموقع", "Website", "Site"),
    sticker: "poll",
  },
  {
    id: "e-tot-3",
    niche: "ecommerce",
    type: "this_or_that",
    headline: L(
      "شحن سريع غالي\nأو شحن بطيء رخيص؟",
      "Fast expensive shipping\nor slow cheap shipping?",
      "Livraison rapide chère\nou lente et cheap ?",
    ),
    optionA: L("سريع", "Fast", "Rapide"),
    optionB: L("رخيص", "Cheap", "Cheap"),
    sticker: "poll",
  },
  {
    id: "e-seq-1",
    niche: "ecommerce",
    type: "sequence",
    headline: L(
      "سلسلة: الطلب المفقود",
      "Series: missing order",
      "Série: commande perdue",
    ),
    sticker: "quiz",
    steps: [
      L(
        "التتبع واقف من 4 أيام… 📦❓",
        "Tracking stuck for 4 days… 📦❓",
        "Suivi bloqué depuis 4 jours… 📦❓",
      ),
      L(
        "العميل يكتب كل ساعة. وأنت؟",
        "Customer messages hourly. You?",
        "Le client écrit toutes les heures. Et toi ?",
      ),
      L(
        "صوّت: أبلّغ فوراً ولا أنتظر 48 ساعة؟",
        "Vote: escalate now or wait 48 hours?",
        "Vote: escalader maintenant ou attendre 48h ?",
      ),
    ],
  },
  {
    id: "e-qa-1",
    niche: "ecommerce",
    type: "qa",
    headline: L(
      "قلي منتج تبيه\nبس السعر يوقفك…",
      "Product you want\nbut the price stops you…",
      "Produit que tu veux\nmais le prix te bloque…",
    ),
    sticker: "question",
  },
  {
    id: "e-con-1",
    niche: "ecommerce",
    type: "controversial",
    headline: L(
      "أرخص سعر مو دائماً\nأفضل صفقة.",
      "Lowest price isn’t always\nthe best deal.",
      "Le prix le plus bas n’est\npas toujours la meilleure affaire.",
    ),
    subtext: L("DM إذا عندك قصة", "DM your story", "DM ton histoire"),
    sticker: "question",
  },

  // —— Fitness ——
  {
    id: "fi-tot-1",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "كارديو صباحي\nأو حديد مسائي؟",
      "Morning cardio\nor evening weights?",
      "Cardio matin\nou muscu soir ?",
    ),
    optionA: L("كارديو", "Cardio", "Cardio"),
    optionB: L("حديد", "Weights", "Muscu"),
    sticker: "poll",
  },
  {
    id: "fi-tot-2",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "دايت صارم شهر\nأو توازن طول السنة؟",
      "Strict diet for a month\nor balance all year?",
      "Régime strict 1 mois\nou équilibre toute l’année ?",
    ),
    optionA: L("صارم", "Strict", "Strict"),
    optionB: L("توازن", "Balance", "Équilibre"),
    sticker: "poll",
  },
  {
    id: "fi-tot-3",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "تمرين بيت\nأو اشتراك نادي؟",
      "Home workout\nor gym membership?",
      "Maison\nou salle de sport ?",
    ),
    optionA: L("بيت", "Home", "Maison"),
    optionB: L("نادي", "Gym", "Salle"),
    sticker: "poll",
  },
  {
    id: "fi-seq-1",
    niche: "fitness",
    type: "sequence",
    headline: L(
      "سلسلة: يوم الراحة",
      "Series: rest day",
      "Série: jour de repos",
    ),
    sticker: "quiz",
    steps: [
      L(
        "جسمك يقول ارتاح… وعقلك يقول كسل 🧠",
        "Body says rest… brain says lazy 🧠",
        "Le corps dit repos… le cerveau dit flemme 🧠",
      ),
      L(
        "الراحة جزء من التمرين — مو هروب منه.",
        "Rest is part of training — not an escape.",
        "Le repos fait partie de l’entraînement.",
      ),
      L(
        "صوّت: راحة كاملة ولا مشي خفيف؟",
        "Vote: full rest or light walk?",
        "Vote: repos total ou marche légère ?",
      ),
    ],
  },
  {
    id: "fi-qa-1",
    niche: "fitness",
    type: "qa",
    headline: L(
      "وش عذرك الأشهر\nلما تفوت تمرين؟ 👀",
      "Your top excuse\nfor skipping a workout? 👀",
      "Ton excuse n°1\npour zapper un workout ? 👀",
    ),
    sticker: "question",
  },
  {
    id: "fi-con-1",
    niche: "fitness",
    type: "controversial",
    headline: L(
      "المكملات بدون نظام\nأكل = فلوس ضايعة.",
      "Supplements without a diet\n= wasted money.",
      "Compléments sans alimentation\n= argent jeté.",
    ),
    subtext: L("اتفق؟ خاص", "Agree? DM", "D’accord ? DM"),
    sticker: "question",
  },
  {
    id: "fi-trend-1",
    niche: "fitness",
    type: "this_or_that",
    headline: L(
      "تريند اليوم:\nتمرين 20 دقيقة يومياً\nولا ساعة 3 مرات؟",
      "Today's trend:\n20 min daily\nor 1 hour × 3?",
      "Tendance:\n20 min/jour\nou 1h × 3 ?",
    ),
    optionA: L("يومياً", "Daily", "Quotidien"),
    optionB: L("3 مرات", "3× week", "3×/semaine"),
    sticker: "poll",
    trend: true,
  },

  // —— Food ——
  {
    id: "fo-tot-1",
    niche: "food",
    type: "this_or_that",
    headline: L(
      "بيتزا سادة كلاسيك\nأو محشية جبن زيادة؟",
      "Classic plain pizza\nor extra cheesy stuffed?",
      "Pizza classique\nou ultra fromage ?",
    ),
    optionA: L("سادة", "Classic", "Classique"),
    optionB: L("محشية", "Stuffed", "Farce fromage"),
    sticker: "poll",
  },
  {
    id: "fo-tot-2",
    niche: "food",
    type: "this_or_that",
    headline: L(
      "طبخ بيت\nأو طلب توصيل كل يوم؟",
      "Home cooking\nor delivery every day?",
      "Cuisine maison\nou livraison tous les jours ?",
    ),
    optionA: L("بيت", "Home", "Maison"),
    optionB: L("توصيل", "Delivery", "Livraison"),
    sticker: "poll",
  },
  {
    id: "fo-tot-3",
    niche: "food",
    type: "this_or_that",
    headline: L(
      "قهوة سادة\nأو مشروب حلو بالكريمة؟",
      "Black coffee\nor sweet creamy drink?",
      "Café noir\nou boisson sucrée crémeuse ?",
    ),
    optionA: L("سادة", "Black", "Noir"),
    optionB: L("كريمة", "Creamy", "Crémeux"),
    sticker: "poll",
  },
  {
    id: "fo-seq-1",
    niche: "food",
    type: "sequence",
    headline: L(
      "سلسلة: الجوع الكاذب",
      "Series: fake hunger",
      "Série: fausse faim",
    ),
    sticker: "quiz",
    steps: [
      L(
        "فتحت الثلاجة ثالث مرة… وما في شي جديد 🧊",
        "Opened the fridge a 3rd time… nothing new 🧊",
        "Frigo ouvert 3e fois… rien de nouveau 🧊",
      ),
      L(
        "مو جوع. ملل + سكر.",
        "Not hunger. Boredom + sugar craving.",
        "Pas la faim. Ennui + envie de sucre.",
      ),
      L(
        "صوّت: أشرب مي ولا أستسلم لسناك؟",
        "Vote: drink water or surrender to a snack?",
        "Vote: boire de l’eau ou craquer ?",
      ),
    ],
  },
  {
    id: "fo-qa-1",
    niche: "food",
    type: "qa",
    headline: L(
      "قلي أكلة مستحيل\nترفضها لو انعرضت عليك",
      "Food you’d never refuse\nif offered right now",
      "Plat que tu ne refuses\njamais si on te l’offre",
    ),
    sticker: "question",
  },
  {
    id: "fo-con-1",
    niche: "food",
    type: "controversial",
    headline: L(
      "البرغر النباتي\nما يعوّض الأصلي. خلاص.",
      "Vegan burgers will never\nreplace the real thing. Period.",
      "Le burger vegan ne remplacera\njamais l’original. Point.",
    ),
    subtext: L("زعلان؟ DM", "Mad? DM", "Vexé ? DM"),
    sticker: "question",
  },

  // —— Personal ——
  {
    id: "p-tot-1",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "صدق مؤلم\nأو كذبة مريحة؟",
      "Painful truth\nor comfortable lie?",
      "Vérité douloureuse\nou mensonge confortable ?",
    ),
    optionA: L("صدق", "Truth", "Vérité"),
    optionB: L("كذبة", "Lie", "Mensonge"),
    sticker: "poll",
  },
  {
    id: "p-tot-2",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "تنسى بسرعة\nأو تحتفظ بكل ذكرى؟",
      "Forget fast\nor keep every memory?",
      "Oublier vite\nou garder chaque souvenir ?",
    ),
    optionA: L("أنسى", "Forget", "Oublier"),
    optionB: L("أحتفظ", "Keep", "Garder"),
    sticker: "poll",
  },
  {
    id: "p-tot-3",
    niche: "personal",
    type: "this_or_that",
    headline: L(
      "تعالج الموضوع فوراً\nأو تحتاج وقت تفكر؟",
      "Handle it immediately\nor need time to think?",
      "Régler tout de suite\nou besoin de réfléchir ?",
    ),
    optionA: L("فوراً", "Now", "Maintenant"),
    optionB: L("وقت", "Time", "Temps"),
    sticker: "poll",
  },
  {
    id: "p-seq-1",
    niche: "personal",
    type: "sequence",
    headline: L(
      "سلسلة: الرسالة اللي ما انبعتت",
      "Series: unsent message",
      "Série: message non envoyé",
    ),
    sticker: "quiz",
    steps: [
      L(
        "كتبت رسالة طويلة… وحذفتها ✍️",
        "Wrote a long message… then deleted it ✍️",
        "Long message écrit… puis supprimé ✍️",
      ),
      L(
        "أحياناً السكوت أحكم من شرح ما راح يتفهم.",
        "Sometimes silence beats explaining what won’t be understood.",
        "Parfois le silence vaut mieux qu’expliquer l’incompréhensible.",
      ),
      L(
        "صوّت: كنت بتبعثها ولا أحسن إنك ما بعثت؟",
        "Vote: should you have sent it or better unsent?",
        "Vote: fallait l’envoyer ou mieux non envoyé ?",
      ),
    ],
  },
  {
    id: "p-qa-1",
    niche: "personal",
    type: "qa",
    headline: L(
      "اسألني أي سؤال\nما تجرؤ تسأله وجهاً لوجه",
      "Ask me anything\nyou’d never ask face to face",
      "Pose-moi une question\nque tu n’oserais pas en face",
    ),
    sticker: "question",
  },
  {
    id: "p-qa-2",
    niche: "personal",
    type: "qa",
    headline: L(
      "وش القرار اللي لو رجع الزمن\nبتكرره بنفس الطريقة؟",
      "Which decision would you\nmake the exact same way again?",
      "Quelle décision referais-tu\nexactement pareil ?",
    ),
    sticker: "question",
  },
  {
    id: "p-con-1",
    niche: "personal",
    type: "controversial",
    headline: L(
      "مو كل أحد يستاهل\nنسخة منك 100%.",
      "Not everyone deserves\nthe 100% version of you.",
      "Tout le monde ne mérite pas\nta version 100%.",
    ),
    subtext: L("اكتب لي رأيك", "Tell me your take", "Donne ton avis"),
    sticker: "question",
  },
  {
    id: "p-trend-1",
    niche: "personal",
    type: "qa",
    headline: L(
      "تريند اليوم:\nوش الشيء اللي سويته\nهالأسبوع وما نشرته؟",
      "Today's trend:\nwhat did you do this week\nbut never posted?",
      "Tendance:\nqu’as-tu fait cette semaine\nsans le poster ?",
    ),
    sticker: "question",
    trend: true,
  },
];

function localizeIdea(raw: RawStoryIdea, locale: Locale): StoryIdea {
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
    trend: raw.trend,
  };
}

export function getIdeas(
  niche: NicheId,
  type: StoryTypeId,
  locale: Locale = "ar",
): StoryIdea[] {
  return rawIdeas
    .filter((i) => i.niche === niche && i.type === type)
    .map((i) => localizeIdea(i, locale));
}

export function getTrendIdeas(
  niche?: NicheId,
  locale: Locale = "ar",
): StoryIdea[] {
  const trends = rawIdeas.filter((i) => i.trend);
  const filtered = niche
    ? (() => {
        const nicheTrends = trends.filter((i) => i.niche === niche);
        return nicheTrends.length ? nicheTrends : trends;
      })()
    : trends;
  return filtered.map((i) => localizeIdea(i, locale));
}

export function pickRandom(
  niche: NicheId,
  type: StoryTypeId,
  locale: Locale = "ar",
  excludeId?: string,
): StoryIdea {
  const pool = getIdeas(niche, type, locale).filter((i) => i.id !== excludeId);
  const source = pool.length ? pool : getIdeas(niche, type, locale);
  if (!source.length) {
    const fallback: Record<Locale, string> = {
      ar: "فكرة جديدة قريباً…\nجرّب نوع ستوري ثاني",
      en: "More ideas coming…\nTry another story type",
      fr: "Plus d’idées bientôt…\nEssaie un autre type",
    };
    return {
      id: "fallback",
      niche,
      type,
      headline: fallback[locale],
      sticker: "question",
    };
  }
  return source[Math.floor(Math.random() * source.length)]!;
}

export function ideaToCopyText(idea: StoryIdea, sequenceStep = 0): string {
  if (idea.type === "sequence" && idea.steps) {
    const step = idea.steps[sequenceStep] ?? idea.steps[0];
    return `Story ${sequenceStep + 1}/3:\n${step}`;
  }
  let text = idea.headline.replace(/\n/g, " ");
  if (idea.optionA && idea.optionB) {
    text += `\n\n① ${idea.optionA}\n② ${idea.optionB}`;
  }
  if (idea.subtext) text += `\n\n${idea.subtext}`;
  return text;
}

export { rawIdeas as ALL_RAW_IDEAS };
