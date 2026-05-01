// language.js
const links = document.querySelectorAll(".lang-link");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // prevent page jump

    const lang = link.dataset.lang;
    localStorage.setItem("siteLanguage", lang);
    applyLanguage(lang); // update current page immediately
  });
});

// language.js

// -----------------------------
// Translation dictionary
// -----------------------------
const translations = {
  en: { langHeader:"Language Selection", about:"About Me", special:"Special Features", playAll:"Play All", projects:"Project Selection", email:"Email", vimeo:"Vimeo", en:"English", es:"Spanish", fr:"French", pl:"Polish", menu: "Main Menu", bts: "Behind the Scenes", reel: "Reel",
        aboutMe:" I am a film and horror enthusiast and a post-production lover.\n\nMy work is about safety and terror. Fear is one of the strongest primal sensations and I want to remind viewers of its constant presence.\n\nI grew up in both Dallas, TX and Cuencame, DGO, Mexico and studied Film and Post-Production at DePaul University in Chicago, IL. I have been working on film projects since 2022.\n\nI'm interested in stories of spirits and monsters, and revealing the tragic humanity underneath our constructions of scary stories.\n\nMost importantly, I'm interested in crafting stories with fellow filmmaking peers whilst developing my own voice as a horror storyteller." },
  es: { langHeader:"Selección de Idioma", about:"Sobre mí", special:"Funciones Especiales", playAll:"Reproducir todo", projects:"Selección de proyecto", email:"Correo", vimeo:"Vimeo", en:"Inglés", es:"Español", fr:"Francés", pl:"Polaco", menu: "Menú Principal", bts: "Detrás de Cámaras", reel: "Reel",
        aboutMe:"Soy entusiasta del cine y del terror y amante de la postproducción.\n\nMi trabajo trata de la seguridad y el terror. El miedo es una de las sensaciones más primarias y quiero recordar al público su presencia constante.\n\nCrecí tanto en Dallas, TX como en Cuencamé, DGO, México, y estudié Cine y Postproducción en DePaul University en Chicago, IL. He estado trabajando en proyectos cinematográficos desde 2022.\n\nMe interesan las historias de espíritus y monstruos y revelar la humanidad trágica que hay bajo nuestras construcciones de historias de miedo.\n\nLo más importante: me interesa crear historias junto a compañeros cineastas mientras desarrollo mi propia voz como narrador de terror." },
  fr: { langHeader:"Choix de la langue", about:"À propos", special:"Fonctionnalités", playAll:"Tout lire", projects:"Sélection de projet", email:"Email", vimeo:"Vimeo", en:"Anglais", es:"Espagnol", fr:"Français", pl:"Polonais", menu: "Menu Principal", bts: "Making-Of", reel: "Bande démo",
        aboutMe:"Je suis passionné de cinéma et de l’horreur, et amoureux de la postproduction.\n\nMon travail porte sur la sécurité et la terreur. La peur est l’une des sensations les plus primaires et je veux rappeler au public sa présence constante.\n\nJ’ai grandi à la fois à Dallas (TX) et à Cuencamé (DGO), Mexique, et j’ai étudié le cinéma et la postproduction à la DePaul University à Chicago (IL). Je travaille sur des projets filmiques depuis 2022.\n\n\n\nJe m’intéresse aux histoires d’esprits et de monstres, et à révéler l’humanité tragique qui se cache sous nos constructions de récits effrayants.\n\nSurtout, j’aime créer des histoires avec des pairs cinéastes tout en développant ma propre voix en tant que conteur d’horreur." },
  pl: { langHeader:"Wybór języka", about:"O mnie", special:"Funkcje specjalne", playAll:"Odtwórz wszystko", projects:"Wybór projektu", email:"Email", vimeo:"Vimeo", en:"Angielski", es:"Hiszpański", fr:"Francuski", pl:"Polski", menu: "Menu Główne", bts:"Kulisy", reel: "Reel",
        aboutMe: "Jestem pasjonatem kina i horroru oraz miłośnikiem postprodukcji.\n\nMoja twórczość dotyczy bezpieczeństwa i terroru. Strach to jedno z najsilniejszych pierwotnych odczuć i chcę przypominać widzom o jego stałej obecności.\n\nDorastałem zarówno w Dallas (Teksas), jak i w Cuencamé (DGO), Meksyk, i studiowałem Film i Postprodukcję na DePaul University w Chicago (IL). Pracuję nad projektami filmowymi od 2022 roku.\n\nInteresują mnie historie o duchach i potworach oraz odsłanianie tragicznej ludzkiej natury kryjącej się za naszymi konstrukcjami strasznych opowieści.\n\nPrzede wszystkim chcę tworzyć opowieści wspólnie z innymi filmowcami, rozwijając jednocześnie własny głos jako twórca horroru." },
  };

// -----------------------------
// Apply translations with line-break support
// -----------------------------
function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Helper: apply translation and line-break styling
  function setText(el, key) {
    if (key && dict[key]) {
      el.textContent = dict[key];          // insert text
      el.style.whiteSpace = "pre-wrap";    // respect \n
      el.style.wordBreak = "break-word";   // prevent overflow
    }
  }

  // Update headings / static text
  document.querySelectorAll("[data-text-key]").forEach(el => {
    const key = el.dataset.textKey;
    setText(el, key);
  });

  // Update language selection links themselves
  document.querySelectorAll(".lang-link").forEach(link => {
    const key = link.dataset.textKey;
    setText(link, key);
  });
}

// -----------------------------
// Language link clicks
// -----------------------------
document.querySelectorAll(".lang-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const lang = link.dataset.lang;
    localStorage.setItem("siteLanguage", lang);
    applyLanguage(lang); // update current page immediately
  });
});

// -----------------------------
// Auto-load saved language
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("siteLanguage") || "en";
  applyLanguage(lang);
});