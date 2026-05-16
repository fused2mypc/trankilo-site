(function (global) {
  const fallbackLang = "en";
  const supportedLangs = ["en", "es", "fr", "pl"];

  // Centralized category dictionary (add new categories here)
  // Key => translations object (or single string, will be normalized)
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
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:00",
      thumbnail: "assets/thumbnails/showreel2023.jpg",
	    reel: true
    },
    {
      id: "ca1a6b98-f4c7-4ef0-bfd1-6d95f4a97cfa",
      title: { en: "Creciendo con el cucuy", es: "Creciendo con el cucuy", fr: "Grandir avec le Cucuy", pl: "Dorastanie z Cucuyem" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:27",
      thumbnail: "assets/thumbnails/creciendoconelcucuy.jpg"
    },
    {
      id: "3254dca2-4d17-4af2-9280-4359f1c41dfa",
      title: "inlovingmemory album",
      category: "commercial",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:31",
      thumbnail: "assets/thumbnails/inlovingmemory.jpg"
    },
    {
      id: "ce1f0e06-5bfd-4f3f-9c48-da750a41db33",
      title: { en: "Embedded", es: "Embebido", fr: "Intégré", pl: "Osadzony" },
      category: "sci-fi",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "04:12",
      thumbnail: "assets/thumbnails/embedded.png"
    },
    {
      id: "f5255532-a940-47c1-9e7d-19708a015574",
      title: { en: "Forging Artistry", es: "Forjando la creatividad", fr: "Forger l'art", pl: "Kuźnia twórczości" },
      category: "documentary",
      description: "",
      runtime: "04:13",
      thumbnail: "assets/thumbnails/forgingartistry.jpg"
    },
    {
      id: "d2c67fd6-e011-44da-ae29-09b2a08b9755",
      title: "Untitled",
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:30",
      thumbnail: "assets/thumbnails/untitled.jpg"
    },
    {
      id: "7f6aadfe-4ca0-431c-a1f0-0b2780598b86",
      title: { en: "Somewhere in Michigan", es: "En algún lugar de Michigan", fr: "Quelque part dans le Michigan", pl: "Gdzieś w Michigan" },
      category: "experimental",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "04:11",
      thumbnail: "assets/thumbnails/somewhereinmichigan.jpg"
    },
    {
      id: "5f11d4e4-25b4-4427-815c-025521d219ad",
      title: { en: "JU-ON THE CURSE intro in style of THE DEAD ZONE", es: "JU-ON THE CURSE intro al estilo de THE DEAD ZONE", fr: "JU-ON THE CURSE intro dans le style de THE DEAD ZONE", pl: "JU-ON THE CURSE intro w stylu THE DEAD ZONE" },
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:22",
      thumbnail: "assets/thumbnails/juondeadzone.jpg"
    },
    {
      id: "1dd4db87-be92-4727-a3b8-bc7ffea63d3c",
      title: { en: "Kinetic Timing with a scene from NAPOLEON DYNAMITE", es: "Timing cinético con una escena de NAPOLEON DYNAMITE", fr: "Timing cinétique avec une scène de NAPOLEON DYNAMITE", pl: "Kinetic Timing z sceny z NAPOLEON DYNAMITE" },
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:56",
      thumbnail: "assets/thumbnails/kinetictiming.jpg"
    },
    {
      id: "1e41c1b2-5dd7-4ef1-9e9e-76a22e3e94f2",
      title: "SPIKETV Ident",
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:12",
      thumbnail: "assets/thumbnails/spiketv.jpg"
    },
    {
      id: "4f4ba768-9980-481a-95b6-0cc85a07de56",
      title: "Evangelion Insert",
      category: "VFX", // uses key
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:15",
      thumbnail: "assets/thumbnails/evangelioninsert.jpg"
    },
    {
      id: "064ff002-378f-40cc-ad55-a0fbc29fa011",
      title: { en: "How to Wake up from a Dream", es: "Cómo Despertarse de un Sueño", fr: "Comment se Réveiller d’un Rêve", pl: "Jak Obudzić się ze Snu" },
      category: "experimental",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:10",
      thumbnail: "assets/thumbnails/dreaminfo.jpg"
    },
    {
      id: "b5731ee5-28a2-4673-91ff-a39f1fa68b4a",
      title: { en: "Laughing Stock", es: "El hazmerreìr", fr: "Bouffon", pl: "Beka" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:29",
      thumbnail: "assets/thumbnails/laughingstock.jpg"
    },
    {
      id: "d3a470b9-2e97-4118-abda-bc005b91685e",
      title: { en: "One Night Stand", es: "Un rollo de una noche", fr: "Plan d'un Soir", pl: "Przygoda na jedną Noc" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:15",
      thumbnail: "assets/thumbnails/onenightstand.jpg"
    },
    {
      id: "531218b3-de1d-4298-b007-6b5d745c4964",
      title: "AKARI — spec end credits",
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:46",
      thumbnail: "assets/thumbnails/akari2.png"
    }
  ];

  // ----------------------------
  // NORMALIZATION
  // ----------------------------
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
    reel: !!entry.reel   // ensure it's a boolean, default false
  };
}

  const videoData = rawVideoData.map(normalizeEntry);

  // ----------------------------
  // DATASETS (NEW CLEAN LAYER)
  // ----------------------------
  const videoSets = {
    all: videoData,

    reel: rawVideoData.filter(v => v.reel === true).length
      ? rawVideoData.filter(v => v.reel === true).map(normalizeEntry)
      : [videoData[0]] // fallback: first item is reel
  };

  // ----------------------------
  // HELPERS
  // ----------------------------
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

  // ----------------------------
  // PUBLIC API
  // ----------------------------
  const API = {
    videoData,
    videoSets,

    categoryDefs,
    getLocalized,

    addCategory,
    addEntry,
    replaceAll,

    supportedLangs: [...supportedLangs],
    fallbackLang
  };

  global.videoDataModule = API;
  global.videoData = API.videoData;
  global.videoSets = API.videoSets;
  global.categoryDefs = API.categoryDefs;

})(window);