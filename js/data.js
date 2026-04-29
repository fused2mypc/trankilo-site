// data.js
// Refactored: centralized categories + localized video data
// Date: 2026-04-29

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
    // add new category keys here
  };

  // Raw video entries: videos can reference category by:
  // - category: "horror"  (category key referencing categoryDefs)
  // - category: { en: "...", es: "..."}  (inline translations)
  // - category: "Some single string" (treated as inline string applied to all langs)
  // Reel must remain index 0.
  const rawVideoData = [
    {
      id: "989193003",
      title: { en: "Showreel 2023", es: "Reel 2023", fr: "Bande démo 2023", pl: "Showreel 2023" },
      category: "compilation",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:00",
      thumbnail: "assets/thumbnails/showreel2023.jpg"
    },
    {
      id: "916557359",
      title: { en: "Creciendo con el cucuy", es: "Creciendo con el cucuy", fr: "Grandir avec le Cucuy", pl: "Dorastanie z Cucuyem" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:27",
      thumbnail: "assets/thumbnails/creciendoconelcucuy.jpg"
    },
    {
      id: "985218689",
      title: "inlovingmemory album",
      category: "commercial",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:31",
      thumbnail: "assets/thumbnails/inlovingmemory.jpg"
    },
    {
      id: "1173132900",
      hash: "d51bc2cc51",
      title: { en: "Embedded", es: "Embebido", fr: "Intégré", pl: "Osadzony" },
      category: "sci-fi",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "04:12",
      thumbnail: "assets/thumbnails/embedded.png"
    },
    {
      id: "1174561238",
      hash: "3613163b70",
      title: "Untitled",
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:30",
      thumbnail: "assets/thumbnails/untitled.jpg"
    },
    {
      id: "1174561767",
      hash: "2ffc0e6163",
      title: { en: "Somewhere in Michigan", es: "En algún lugar de Michigan", fr: "Quelque part dans le Michigan", pl: "Gdzieś w Michigan" },
      category: "experimental",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "04:11",
      thumbnail: "assets/thumbnails/somewhereinmichigan.jpg"
    },
    {
      id: "1174560510",
      hash: "ef6b29405b",
      title: { en: "JU-ON THE CURSE intro in style of THE DEAD ZONE", es: "JU-ON THE CURSE intro al estilo de THE DEAD ZONE", fr: "JU-ON THE CURSE intro dans le style de THE DEAD ZONE", pl: "JU-ON THE CURSE intro w stylu THE DEAD ZONE" },
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:22",
      thumbnail: "assets/thumbnails/juondeadzone.jpg"
    },
    {
      id: "1174561015",
      hash: "52ffb01bd3",
      title: { en: "Kinetic Timing with a scene from NAPOLEON DYNAMITE", es: "Timing cinético con una escena de NAPOLEON DYNAMITE", fr: "Timing cinétique avec une scène de NAPOLEON DYNAMITE", pl: "Kinetic Timing z sceny z NAPOLEON DYNAMITE" },
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:56",
      thumbnail: "assets/thumbnails/kinetictiming.jpg"
    },
    {
      id: "1174560957",
      hash: "e3b214622b",
      title: "SPIKETV Ident",
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:12",
      thumbnail: "assets/thumbnails/spiketv.jpg"
    },
    {
      id: "1174561118",
      hash: "ae0b04d509",
      title: "Evangelion Insert",
      category: "VFX", // uses key
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:15",
      thumbnail: "assets/thumbnails/evangelioninsert.jpg"
    },
    {
      id: "1174558909",
      hash: "f64a3a51ff",
      title: { en: "How to Wake up from a Dream", es: "Cómo Despertarse de un Sueño", fr: "Comment se Réveiller d’un Rêve", pl: "Jak Obudzić się ze Snu" },
      category: "experimental",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:10",
      thumbnail: "assets/thumbnails/dreaminfo.jpg"
    },
    {
      id: "1174561527",
      hash: "aadd2306e4",
      title: { en: "Laughing Stock", es: "El hazmerreìr", fr: "Bouffon", pl: "Beka" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "01:29",
      thumbnail: "assets/thumbnails/laughingstock.jpg"
    },
    {
      id: "1174559486",
      hash: "c1934b7207",
      title: { en: "One Night Stand", es: "Un rollo de una noche", fr: "Plan d'un Soir", pl: "Przygoda na jedną Noc" },
      category: "horror",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "02:15",
      thumbnail: "assets/thumbnails/onenightstand.jpg"
    },
    {
      id: "1173131435",
      title: "AKARI — spec end credits",
      category: "motion graphics",
      description: { en: "", es: "", fr: "", pl: "" },
      runtime: "00:46",
      thumbnail: "assets/thumbnails/akari2.png"
    }
  ];

  // ---- Normalizers ----
  function normalizeTranslations(field) {
    if (typeof field === "string") {
      const out = {};
      supportedLangs.forEach((l) => (out[l] = field));
      return out;
    }
    const out = {};
    supportedLangs.forEach((l) => {
      if (field && typeof field[l] === "string") out[l] = field[l];
      else if (field && typeof field[fallbackLang] === "string") out[l] = field[fallbackLang];
      else {
        const available = field && Object.values(field).find(v => typeof v === "string");
        out[l] = available || "";
      }
    });
    return out;
  }

  // Normalize categoryDefs into full translation objects
  const categoryDefs = {};
  Object.keys(categoryDefsRaw).forEach((key) => {
    categoryDefs[key] = normalizeTranslations(categoryDefsRaw[key]);
  });

  // Resolve a category field for an entry:
  // - if entry.category is a key present in categoryDefs, return that translations object
  // - else normalize entry.category (string or inline object)
  function resolveCategoryField(categoryField) {
    if (typeof categoryField === "string" && categoryDefs[categoryField]) {
      return categoryDefs[categoryField];
    }
    return normalizeTranslations(categoryField || "");
  }

  // Normalize an entire video entry
  function normalizeEntry(entry) {
    const e = Object.assign({}, entry);
    e.title = normalizeTranslations(e.title || "");
    e.category = resolveCategoryField(e.category || "");
    e.description = normalizeTranslations(e.description || "");
    return e;
  }

  // Build normalized videoData array
  const videoData = rawVideoData.map(normalizeEntry);

  // ---- Helpers ----
  function getLocalized(item, fieldName, lang = fallbackLang) {
    if (!item || !fieldName) return "";
    const field = item[fieldName];
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field[fallbackLang] ?? Object.values(field).find(Boolean) ?? "";
  }

  function addCategory(key, translations) {
    if (!key || typeof key !== "string") throw new TypeError("Category key required");
    categoryDefs[key] = normalizeTranslations(translations || key);
    // update existing video entries that reference this key (if any)
    videoData.forEach((v, i) => {
      const raw = rawVideoData[i] && rawVideoData[i].category;
      if (raw === key) {
        v.category = categoryDefs[key];
      }
    });
    return categoryDefs[key];
  }

  function addEntry(entry) {
    const normalized = normalizeEntry(entry);
    rawVideoData.push(entry);
    videoData.push(normalized);
    return normalized;
  }

  function replaceAll(newRawData, enforceReelFirst = true) {
    if (!Array.isArray(newRawData)) throw new TypeError("replaceAll expects an array");
    const normalized = newRawData.map(normalizeEntry);
    rawVideoData.length = 0;
    newRawData.forEach((r) => rawVideoData.push(r));
    videoData.length = 0;
    normalized.forEach((n) => videoData.push(n));
    return videoData;
  }

  // Public API
  const API = {
    videoData,
    categoryDefs, // normalized category translations keyed by category key
    getLocalized, // getLocalized(item, "category"| "title" | "description", lang)
    addCategory,  // addCategory(key, translations)
    addEntry,
    replaceAll,
    supportedLangs: supportedLangs.slice(),
    fallbackLang
  };

  global.videoDataModule = API;
  global.videoData = API.videoData;
  global.categoryDefs = API.categoryDefs;
})(window);
