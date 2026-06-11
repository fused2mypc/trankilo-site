const fallbackLang = "en";
const supportedLangs = ["en", "es", "fr", "pl"];

  const categoryDefsRaw = {
    compilation: { en: "compilation", es: "Montaje", fr: "Montage", pl: "Montaż" },
    horror: { en: "horror", es: "terror", fr: "horreur", pl: "horror" },
    commercial: { en: "commercial", es: "comercial", fr: "commercial", pl: "reklama" },
    "motion graphics": { en: "motion graphics", es: "gráficos en movimiento", fr: "animation graphique", pl: "grafika ruchoma" },
    experimental: { en: "experimental", es: "experimental", fr: "expérimental", pl: "eksperymentalny" },
    "sci-fi": { en: "sci-fi", es: "ciencia ficción", fr: "science-fiction", pl: "sci-fi" },
    VFX: { en: "VFX", es: "VFX", fr: "VFX", pl: "VFX" },
    documentary: { en: "documentary", es: "documental", fr: "documentaire", pl: "film dokumentalny" },
    // add new category keys here
  };

  const rawVideoData = [
    {
      id: "25d1998b-1ac9-4c74-9f1d-6e2b1792ee55",
      title: { en: "Showreel 2025", es: "Reel 2025", fr: "Bande démo 2025", pl: "Showreel 2025" },
      category: "",
      description: { en: "A quick cut showcasing my editing chops.", es: "Un corte rápido que muestra mis habilidades de montaje.", fr: "Un cut rapide mettant en valeur mon travail de montage.", pl: "Szybkie cięcie pokazujące moje umiejętności montażowe." },
      runtime: "01:00",
      thumbnail: "assets/thumbnails/showreel2023.jpg",
	    reel: true,
    },
    {
      id: "ca1a6b98-f4c7-4ef0-bfd1-6d95f4a97cfa",
      title: { en: "Creciendo con el cucuy", es: "Creciendo con el cucuy", fr: "Grandir avec le Cucuy", pl: "Dorastanie z Cucuyem" },
      category: "horror",
      description: { en: "Exposed to abusive and misogynistic father figures at a young age, the child struggles to distinguish the men they love from the boogeyman at night.\n\nAn exercise in archival storytelling.\n\nFootage from:\n— [The Seabass Collection, No.1 & No.6]\n— [Saniei Family Videos, No. 67]\n— SKINAMARINK (2023) Dir. Kyle Edward Ball\n— [Cordina Family Films, No.2]\n— [Goree Family Videos, No. 23]\n— Las Mercedes Durango, 2007", es: "Expuesto a figuras paternas abusivas y machistas a una edad temprana, el niño lucha por distinguir a los hombres que ama del cucuy en la noche.\n\nUn ejercicio de narrativa a partir de material de archivo.", fr: "Exposé dès son plus jeune âge à des figures paternelles abusives et misogynes, l’enfant peine à distinguer les hommes qu’il aime du monstre de la nuit.\n\nUn exercice de narration à partir d’archives.", pl: "Doświadczony w młodym wieku przez ojcowskie postaci znęcające się i mizoginiczne, dziecko ma trudności z rozróżnieniem mężczyzn, których kocha, od potwora nocą.\n\nĆwiczenie w opowiadaniu historii z materiałów archiwalnych." },
      runtime: "02:27",
      thumbnail: "assets/thumbnails/creciendoconelcucuy.jpg",
      set: "horror"
    },
    {
      id: "3254dca2-4d17-4af2-9280-4359f1c41dfa",
      title: "inlovingmemory album",
      category: "commercial",
      description: { en: "A spec commercial for a music album.\n\nUsing visual styles and elements that would translate best to an early 2000s CRT TV.", es: "Un anuncio especulativo para un álbum musical.", fr: "Une pub spéculative pour un album musical.", pl: "Spec-reklama albumu muzycznego." },
      runtime: "00:31",
      thumbnail: "assets/thumbnails/inlovingmemory.jpg",
      set: "other"
    },
    {
      id: "d2c67fd6-e011-44da-ae29-09b2a08b9755",
      title: "Untitled",
      category: "horror",
      description: { en: "A VFX exercise in green screen keying and particle effects.", es: "Un ejercicio de VFX en chroma key y efectos de partículas.", fr: "Un exercice de VFX en incrustation sur fond vert et effets particulaires.", pl: "Ćwiczenie VFX w keyingu na zielonym tle i efektach cząsteczkowych." },
      runtime: "00:30",
      thumbnail: "assets/thumbnails/untitled.jpg",
      set: "other"
    },
    {
      id: "ce1f0e06-5bfd-4f3f-9c48-da750a41db33",
      title: { en: "Embedded", es: "Embebido", fr: "Intégré", pl: "Osadzony" },
      category: "sci-fi",
      description: { en: "In the near future, a personal AI helps a woman go about her day.\n\nDirector — Jonas Serpa Souza\nWriter — Jonas Serpa Souza and Marcos Valenzuela\nProducer and AD — Tanja Meyer\nEditor\ — Marcos Valenzuela\nDirector of Photography — November Nolan\nCamera Operator — Renee Xiang", es: "En un futuro cercano, una IA personal ayuda a una mujer con su día.", fr: "Dans un futur proche, une IA personnelle aide une femme dans son quotidien.", pl: "W bliskiej przyszłości osobista AI pomaga kobiecie w codziennych czynnościach." },
      runtime: "04:12",
      thumbnail: "assets/thumbnails/embedded.png",
      set: "horror"
    },
    {
      id: "7f6aadfe-4ca0-431c-a1f0-0b2780598b86",
      title: { en: "Somewhere in Michigan", es: "En algún lugar de Michigan", fr: "Quelque part dans le Michigan", pl: "Gdzieś w Michigan" },
      category: "experimental",
      description: { en: "A cabin trip home video appropriating anything a modern day internet editor can get their hands on.\n\nWith this project, I wanted to test how far I could make something engaging by blatantly pulling from media that has already existed. At the time, I had worked on several student projects that asked me to remake, or remix things that already existed. I wanted to test those limits, and to tell the student audience I screened this to, \"We can do whatever we want.\"", es: "Un video casero de un viaje a una cabaña que apropia cualquier cosa que un editor de internet moderno pueda conseguir.\n\nCon este proyecto quise probar qué tan lejos podía llegar haciendo algo atractivo al tomar de forma descarada material ya existente. En ese momento había trabajado en varios proyectos estudiantiles que me pedían rehacer o remezclar cosas que ya existían. Quise poner a prueba esos límites y decirle al público estudiantil al que lo proyecté: \“Podemos hacer lo que queramos.\”", fr: "Une vidéo souvenir d’un séjour en cabane qui approprie tout ce qu’un monteur internet contemporain peut trouver.\n\nAvec ce projet, je voulais tester jusqu’où je pouvais rendre quelque chose captivant en puisant sans scrupules dans des médias déjà existants. À l’époque, j’avais travaillé sur plusieurs projets étudiants qui me demandaient de refaire ou remixer des éléments préexistants. Je voulais tester ces limites et dire au public étudiant à qui je l’ai montré : « On peut faire ce qu’on veut. »", pl: "Domowe wideo z wyprawy do chaty, wykorzystujące wszystko, co nowoczesny internetowy montażysta potrafi zdobyć.\n\nW tym projekcie chciałem sprawdzić, jak daleko mogę posunąć coś angażującego, bezwstydnie czerpiąc z istniejących już mediów. W tamtym czasie pracowałem nad kilkoma projektami studenckimi, które prosiły mnie o przeróbkę lub remix istniejących rzeczy. Chciałem sprawdzić te granice i powiedzieć publiczności studenckiej, której to pokazałem: „Możemy robić, co chcemy.”" },
      runtime: "04:11",
      thumbnail: "assets/thumbnails/somewhereinmichigan.jpg",
      set: "horror"
    },
    {
      id: "abf2b391-05a7-4b1f-8a4f-4f06b172b913",
      title: "Phantom Heart",
      category: "sound mixing",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "08:03",
      thumbnail: "assets/thumbnails/phantomheart.jpg",
      set: "other"
    },
    {
      id: "5f11d4e4-25b4-4427-815c-025521d219ad",
      title: { en: "JU-ON THE CURSE intro in style of THE DEAD ZONE", es: "JU-ON THE CURSE intro al estilo de THE DEAD ZONE", fr: "JU-ON THE CURSE intro dans le style de THE DEAD ZONE", pl: "JU-ON THE CURSE intro w stylu THE DEAD ZONE" },
      category: "motion graphics",
      description: { en: "An exercise in title animation.", es: "Un ejercicio de animación de títulos.", fr: "Un exercice d’animation de titres.", pl: "Ćwiczenie animacji tytułów." },
      runtime: "02:22",
      thumbnail: "assets/thumbnails/juondeadzone.jpg",
      set: "other"
    },
    {
      id: "1dd4db87-be92-4727-a3b8-bc7ffea63d3c",
      title: { en: "Kinetic Timing with a scene from NAPOLEON DYNAMITE", es: "Timing cinético con una escena de NAPOLEON DYNAMITE", fr: "Timing cinétique avec une scène de NAPOLEON DYNAMITE", pl: "Kinetic Timing z sceny z NAPOLEON DYNAMITE" },
      category: "motion graphics",
      description: { en: "An exercise in visual timing and pace.", es: "Un ejercicio de ritmo y tempo visual.", fr: "Un exercice sur le timing et le rythme visuel.", pl: "Ćwiczenie w doborze tempa i rytmu wizualnego." },
      runtime: "00:56",
      thumbnail: "assets/thumbnails/kinetictiming.jpg",
      set: "other"
    },
    {
      id: "1e41c1b2-5dd7-4ef1-9e9e-76a22e3e94f2",
      title: "SPIKETV Ident",
      category: "motion graphics",
      description: { en: "An exercise in making a TV Ident using our own assets.", es: "Un ejercicio de crear un identificador de TV usando nuestros propios recursos.", fr: "Un exercice de création d’un ident TV avec nos propres éléments.", pl: "Ćwiczenie tworzenia identu telewizyjnego z wykorzystaniem własnych zasobów." },
      runtime: "00:12",
      thumbnail: "assets/thumbnails/spiketv.jpg",
      set: "other"
    },
    {
      id: "4f4ba768-9980-481a-95b6-0cc85a07de56",
      title: "Evangelion Insert",
      category: "VFX",
      description: { en: "An exercise in VFX keying.", es: "Un ejercicio de keying para VFX.", fr: "Un exercice d’incrustation pour VFX.", pl: "Ćwiczenie keyingu do VFX." },
      runtime: "00:15",
      thumbnail: "assets/thumbnails/evangelioninsert.jpg",
      set: "other"
    },
    {
      id: "064ff002-378f-40cc-ad55-a0fbc29fa011",
      title: { en: "How to Wake up from a Dream", es: "Cómo Despertarse de un Sueño", fr: "Comment se Réveiller d’un Rêve", pl: "Jak Obudzić się ze Snu" },
      category: "experimental",
      description: { en: "A tutorial made for young audiences in the early 2000s.", es: "Un tutorial hecho para audiencias jóvenes a principios de los 2000.", fr: "Un tutoriel destiné à un jeune public du début des années 2000.", pl: "Tutorial stworzony dla młodej publiczności z początku lat 2000." },
      runtime: "01:10",
      thumbnail: "assets/thumbnails/dreaminfo.jpg",
      set: "horror"
    },
    {
      id: "b5731ee5-28a2-4673-91ff-a39f1fa68b4a",
      title: { en: "Laughing Stock", es: "El hazmerreìr", fr: "Bouffon", pl: "Beka" },
      category: "horror",
      description: { en: "A binging programmer loses his mind in a computer lab.\n\nDirector — Sadie Jones\nWriter — Sadie Jones and Marcos Valenzuela\nCamera — Maya Nash\nEditing — Marcos Valenzuela\nVFX — Jase Brown, Sadie Jones, Maya Nash, and Marcos Valenzuela", es: "Un programador que hace maratones pierde la cabeza en un laboratorio de computadoras.", fr: "Un programmeur en binge perd la raison dans un laboratoire informatique.", pl: "Programista robiący binge traci rozum w laboratorium komputerowym." },
      runtime: "01:29",
      thumbnail: "assets/thumbnails/laughingstock.jpg",
      set: "horror"
    },
    {
      id: "d3a470b9-2e97-4118-abda-bc005b91685e",
      title: { en: "One Night Stand", es: "Un rollo de una noche", fr: "Plan d'un Soir", pl: "Przygoda na jedną Noc" },
      category: "horror",
      description: { en: "A sleezy guy is stuck with the one house guest he can't kick out.\n\nWriter, Editor, and Director — Marcos Valenzuela\nCamera — Fernando Ariza\nHouseguests — Luis Chavez and Alicia Bavard\nSleezeball — Marcos Valenzuela\nHair and makeup — Nora Valenciano", es: "Un tipo desagradable se queda atrapado con el único huésped que no puede echar.", fr: "Un type louche se retrouve coincé avec le seul invité qu’il ne peut pas virer.", pl: "Słaby typ utknął z jedynym gościem, którego nie może wyrzucić." },
      runtime: "02:15",
      thumbnail: "assets/thumbnails/onenightstand.jpg",
      set: "horror"
    },
    {
      id: "531218b3-de1d-4298-b007-6b5d745c4964",
      title: "AKARI — spec end credits",
      category: "motion graphics",
      description: { en: "An exercise in closing credit design and animation.", es: "Un ejercicio de diseño y animación de créditos finales.", fr: "Un exercice de design et d’animation des crédits de fin.", pl: "Ćwiczenie projektowania i animacji napisów końcowych." },
      runtime: "00:46",
      thumbnail: "assets/thumbnails/akari2.png",
      set: "other"
    }
  ];

function normalizeTranslations(field) {
  if (typeof field === "string") {
    const out = {};
    supportedLangs.forEach(l => out[l] = field);
    return out;
  }

  const out = {};
  supportedLangs.forEach(l => {
    if (field && typeof field[l] === "string") out[l] = field[l];
    else if (field && typeof field[fallbackLang] === "string") out[l] = field[fallbackLang];
    else {
      const fallback = field && Object.values(field).find(v => typeof v === "string");
      out[l] = fallback || "";
    }
  });

  return out;
}

const categoryDefs = {};

Object.keys(categoryDefsRaw).forEach(key => {
  categoryDefs[key] = normalizeTranslations(categoryDefsRaw[key]);
});

function resolveCategoryField(categoryField) {
  if (typeof categoryField === "string" && categoryDefs[categoryField]) {
    return categoryDefs[categoryField];
  }
  return normalizeTranslations(categoryField || "");
}

function normalizeEntry(entry) {
  return {
    ...entry,
    title: normalizeTranslations(entry.title || ""),
    category: resolveCategoryField(entry.category || ""),
    description: normalizeTranslations(entry.description || ""),
    reel: !!entry.reel
  };
}

const videoData = rawVideoData.map(normalizeEntry);

const videoSets = {
  all: videoData,

  reel: rawVideoData.filter(v => v.reel === true).length
    ? rawVideoData.filter(v => v.reel === true).map(normalizeEntry)
    : [videoData[0]]
};

function getLocalized(item, fieldName, lang = fallbackLang) {
  if (!item || !fieldName) return "";
  const field = item[fieldName];
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field[fallbackLang] ?? Object.values(field).find(Boolean) ?? "";
}

function addCategory(key, translations) {
  categoryDefs[key] = normalizeTranslations(translations || key);

  videoData.forEach((v, i) => {
    const raw = rawVideoData[i]?.category;
    if (raw === key) v.category = categoryDefs[key];
  });

  return categoryDefs[key];
}

function addEntry(entry) {
  rawVideoData.push(entry);
  const normalized = normalizeEntry(entry);
  videoData.push(normalized);
  return normalized;
}

function replaceAll(newRawData) {
  if (!Array.isArray(newRawData)) throw new TypeError("replaceAll expects an array");

  rawVideoData.length = 0;
  newRawData.forEach(v => rawVideoData.push(v));

  videoData.length = 0;
  newRawData.map(normalizeEntry).forEach(v => videoData.push(v));
}

export {
  videoData,
  videoSets,
  categoryDefs,
  getLocalized,
  addCategory,
  addEntry,
  replaceAll,
  supportedLangs,
  fallbackLang
};