const carousel = document.getElementById("carousel");
const params = new URLSearchParams(window.location.search);
const startIndex = parseInt(params.get("start")) || 0;

let activePlayer = null;
let activePlayerIndex = null;

const isReelPage = document.body.classList.contains("reel-page");
const mode = isReelPage ? "reel" : "all";

const ACTIVATION_DELAY = 300;
let activationTimer = null;
let activationLocked = false;

const currentLang = localStorage.getItem("siteLanguage") || "en";
const hasReel = mode === "reel"; // Only reel page shows 'play again'

// ----------------------------
// Build Carousel
// ----------------------------

let carouselVideos = []; // store filtered videos for this carousel

function buildCarousel() {
  const isReelPage = document.body.classList.contains("reel-page");

  // Filter videos according to mode
  carouselVideos = window.videoData.filter(video => {
    if (mode === "reel") return video.reel === true;   // Reel page: only reel
    return !video.reel;                                 // Play all: exclude reel
  });

  // Build sections
  carouselVideos.forEach((video, index) => {
    const section = document.createElement("div");
    section.classList.add("carousel-section");
    section.dataset.index = index;

    // Video container
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");
    videoContainer.id = `video-${index}`;

    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerText = "Loading...";
    videoContainer.appendChild(loader);

    // Metadata
    const meta = document.createElement("div");
    meta.classList.add("video-meta");
    meta.innerHTML = `
      <h2 class="video-title">${video.title[currentLang]}</h2>
      <span class="video-category">${video.category[currentLang]}</span>
      <p class="video-description">${video.description[currentLang]}</p>
    `;

    // Append in order
    section.appendChild(videoContainer);
    section.appendChild(meta);
    carousel.appendChild(section);
  });

  // End section
  const endSection = document.createElement("div");
  endSection.classList.add("carousel-section", "end-section");

  endSection.innerHTML = `
    <button class="menu-button menu-return" onclick="window.location.href='index.html'">
      menu
    </button>
  `;
  carousel.appendChild(endSection);
}

buildCarousel();

// ----------------------------
// Chapter timeline navigation
// ----------------------------

const nav = document.querySelector(".chapter-nav");

carouselVideos.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("chapter-dot");

  dot.addEventListener("click", () => {
    document.querySelectorAll(".carousel-section")[index]
      .scrollIntoView({ behavior: "auto" });
  });

  nav.appendChild(dot);
});

function updateActiveDot(index) {
  const dots = document.querySelectorAll(".chapter-dot");

  dots.forEach(dot => dot.classList.remove("active"));

  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

// ----------------------------
// Load Vimeo Video
// ----------------------------

function activateVideo(index) {

  if (activePlayerIndex === index) return;

  const video = carouselVideos[index];  // instead of window.videoData[index]
  const container = document.getElementById(`video-${index}`);
  
  if (!container) return;
  if (container.querySelector("iframe")) return;

  // Destroy previous player
  if (activePlayer) {
    activePlayer.pause().catch(() => {});
    activePlayer.unload().catch(() => {});
    activePlayer = null;
  }

  document.querySelectorAll(".video-container iframe").forEach(f => {
    f.remove();
  });
  
container.innerHTML = "";

const loader = document.createElement("div");
loader.className = "loader";
loader.textContent = "Loading…";

container.appendChild(loader);

  const iframe = document.createElement("iframe");

const autoplay = mode === "all" ? 1 : 0;

  // Build Vimeo URL
  // If video.hash exists, append it as ?h=HASH
  let vimeoSrc = `https://player.vimeo.com/video/${video.id}?autoplay=${autoplay}&muted=1&playsinline=1&title=0&byline=0&portrait=0`;
  if (video.hash) {
    vimeoSrc += `&h=${video.hash}`;
  }

  iframe.src = vimeoSrc;
  
  iframe.allow = "fullscreen";
  iframe.allowFullscreen = true;

  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  container.appendChild(iframe);

  const player = new Vimeo.Player(iframe);

  player.on("loaded", () => {

    const loader = container.querySelector(".loader");
    if (loader) loader.remove();

    iframe.style.opacity = "0";
    iframe.style.transition = "opacity 0.4s ease";

    requestAnimationFrame(() => {
      iframe.style.opacity = "1";
    });

  });

  // autoplay chain
  player.on("ended", () => {

    if (mode !== "all") return;

    const nextSection = document.querySelector(
      `.carousel-section[data-index="${index + 1}"]`
    );

    if (nextSection) {

      setTimeout(() => {
        nextSection.scrollIntoView({ behavior: "auto" });
      }, 200);

    } else {

      window.location.href = "index.html";

    }

  });

  activePlayer = player;
  activePlayerIndex = index;
}

// ----------------------------
// Intersection Observer
// ----------------------------

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !activationLocked) {

        activationLocked = true;

        setTimeout(() => {
          activationLocked = false;
        }, 300);

        const index = parseInt(entry.target.dataset.index);

        if (isNaN(index)) return;

        clearTimeout(activationTimer);

        activationTimer = setTimeout(() => {

          updateActiveDot(index);
          activateVideo(index);

        }, ACTIVATION_DELAY);

      }

    });

  },
  {
    threshold: 0.65
  }
);

// Observe sections
document.querySelectorAll(".carousel-section").forEach(section => {
  if (!section.classList.contains("end-section")) {
    observer.observe(section);
  }
});

// ----------------------------
// Scroll to Start
// ----------------------------

function scrollToStart() {
  const section = document.querySelector(
    `.carousel-section[data-index="${startIndex}"]`
  );

  if (section) {
    section.scrollIntoView({ behavior: "auto" });
  }
}

scrollToStart();
updateActiveDot(startIndex);