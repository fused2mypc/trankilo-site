// carousel.js (ES MODULE)

// Config
const IFRAME_LOAD_TIMEOUT = 8000;
const DEFAULT_LANG = "en";

// Parse URL params
const params = new URLSearchParams(window.location.search);

const startIndexParam = params.has("start")
  ? Number.parseInt(params.get("start"), 10)
  : null;

const startId = params.get("startId") || null;
const mode = params.get("mode") || "select";
const isAutoplay = mode === "all";

const currentLang =
  localStorage.getItem("siteLanguage") || DEFAULT_LANG;

// NOTE: imported from module instead of window
import { videoData as importedVideoData } from "./data.js";

// Utility helpers
const chooseLang = (obj) =>
  (obj && obj[currentLang])
    ? obj[currentLang]
    : (obj && obj[DEFAULT_LANG]) || "";

const createEl = (
  tag,
  attrs = {},
  children = []
) => {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([k, v]) => {
    if (v === null) return;

    if (k === "class") {
      el.className = v;
    } else if (k === "text") {
      el.textContent = v;
    } else {
      el.setAttribute(k, v);
    }
  });

  children.forEach(child => el.appendChild(child));

  return el;
};

class Carousel {
  constructor({
    rootSelector = "#carousel",
    navSelector = ".chapter-nav"
  } = {}) {

    this.rootSelector = rootSelector;
    this.navSelector = navSelector;

    this.root = null;
    this.nav = null;

    this.videoData = importedVideoData || [];
    this.carouselVideos = [];

    this.activePlayerIndex = null;
    this.resolvedStartIndex = 0;

    this.dots = [];
  }

  async init() {

    this.root = document.querySelector(this.rootSelector);
    this.nav = document.querySelector(this.navSelector);

    if (!this.root) return;

    this.filterVideos();
    this.buildSections();
    this.buildNavDots();
    this.resolveStartIndexAndActivate();
    this.handleUnload();
  }

  filterVideos() {

    const reelParam = params.get("reel");
    const normalizedMode = String(mode || "").toLowerCase();

    const wantReel =
      normalizedMode === "reel" ||
      ["1", "true"].includes(reelParam);

    const wantAll = normalizedMode === "all";

    if (wantReel) {
      this.carouselVideos =
        this.videoData.filter(v => Boolean(v.reel) === true);

    } else if (wantAll) {
      this.carouselVideos = this.videoData.slice();

    } else {
      this.carouselVideos =
        this.videoData.filter(v => !v.reel);
    }
  }

  buildSections() {

    this.root.innerHTML = "";

    this.carouselVideos.forEach((video, index) => {

      const section = createEl("section", {
        class: "carousel-section",
        "data-index": String(index)
      });

      const videoContainer = createEl("div", {
        class: "video-container",
        id: `video-${index}`
      });

      videoContainer.appendChild(
        createEl("div", {
          class: "loader",
          text: "Loading..."
        })
      );

      const meta = createEl("div", { class: "video-meta" });

      const titleEl = createEl("h2", {
        class: "video-title",
        text: chooseLang(video.title)
      });

      const categoryEl = createEl("span", {
        class: "video-category",
        text: chooseLang(video.category)
      });

      const descEl = createEl("p", {
        class: "video-description",
        text: chooseLang(video.description)
      });

      meta.append(titleEl, categoryEl, descEl);

      section.append(videoContainer, meta);

      this.root.appendChild(section);
    });

    const endSection = createEl("section", {
      class: "carousel-section end-section"
    });

    const menuButton = createEl("a", {
      class: "menu-button menu-return",
      href: "index.html",
      text: "menu"
    });

    endSection.appendChild(menuButton);
    this.root.appendChild(endSection);
  }

  buildNavDots() {

    if (!this.nav) return;

    this.nav.innerHTML = "";
    this.dots = [];

    this.carouselVideos.forEach((_, index) => {

      const dot = createEl("button", {
        class: "chapter-dot",
        type: "button",
        "aria-label": `Go to chapter ${index + 1}`
      });

      dot.addEventListener("click", () => this.scrollToIndex(index));

      this.nav.appendChild(dot);
      this.dots.push(dot);
    });
  }

  scrollToIndex(index) {
    const section =
      this.root.querySelector(
        `.carousel-section[data-index="${index}"]`
      );

    if (section) {
      section.scrollIntoView({ behavior: "auto" });
    }
  }

  updateActiveDot(index) {
    this.dots.forEach(d => d.classList.remove("active"));
    if (this.dots[index]) {
      this.dots[index].classList.add("active");
    }
  }

  activateVideo(index) {

    if (this.activePlayerIndex === index) return;

    const video = this.carouselVideos[index];
    if (!video) return;
        console.log("Activating video:", index, video.id);
    const container = document.getElementById(`video-${index}`);
    if (!container) return;

    container.innerHTML = "";

    container.appendChild(
      createEl("div", {
        class: "loader",
        text: "Loading..."
      })
    );

    const iframe = document.createElement("iframe");

    iframe.className = "video-frame";

    const autoplay = isAutoplay ? 1 : 0;
    const encodedId = encodeURIComponent(String(video.id));

    iframe.src =
      `https://iframe.mediadelivery.net/embed/661508/${encodedId}?autoplay=${autoplay}&muted=true&playsinline=true&responsive=true`;

    iframe.allow = "autoplay; fullscreen";
    iframe.allowFullscreen = true;
    iframe.title = `Video: ${chooseLang(video.title) || "Embedded video"}`;
    iframe.loading = "lazy";

    const loadTimeout = setTimeout(() => {
      const loaderEl = container.querySelector(".loader");
      if (loaderEl) loaderEl.textContent = "Unable to load video";
    }, IFRAME_LOAD_TIMEOUT);

    iframe.onload = () => {
      clearTimeout(loadTimeout);
      container.querySelector(".loader")?.remove();
      this.activePlayerIndex = index;
    };

    iframe.onerror = () => {
      clearTimeout(loadTimeout);
      const loaderEl = container.querySelector(".loader");
      if (loaderEl) loaderEl.textContent = "Unable to load video";
    };

    container.appendChild(iframe);
  }

  resolveStartIndexAndActivate() {

    let resolved = 0;

    if (startId) {
      const found =
        this.carouselVideos.findIndex(
          v => String(v.id) === startId
        );
      if (found >= 0) resolved = found;

    } else if (
      startIndexParam !== null &&
      Number.isFinite(startIndexParam)
    ) {
      const originalItem =
        this.videoData[startIndexParam];

      if (originalItem) {
        const mapped =
          this.carouselVideos.findIndex(
            v => v.id === originalItem.id
          );
        if (mapped >= 0) resolved = mapped;
      }
    }

    resolved = Math.max(
      0,
      Math.min(resolved, this.carouselVideos.length - 1)
    );

    this.resolvedStartIndex = resolved;

    requestAnimationFrame(() => {
      this.scrollToIndex(resolved);
      this.updateActiveDot(resolved);
      this.activateVideo(resolved);
    });
  }

  handleUnload() {
    window.addEventListener("beforeunload", () => {
      this.observer?.disconnect();
    });
  }
}

// init handled by module entry
export default Carousel;