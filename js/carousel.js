// carousel.js - refactored, encapsulated, DOM-ready safe implementation

(() => {
  // Config
  const ACTIVATION_DELAY = 300;
  const IFRAME_LOAD_TIMEOUT = 8000;
  const DEFAULT_LANG = "en";

  // Parse URL params safely
  const params = new URLSearchParams(window.location.search);
  const startParamRaw = params.get("start");
  const startIndexParam = startParamRaw === null ? null : Number.parseInt(startParamRaw, 10);
  const startId = params.get("startId") || null;
  const mode = params.get("mode") || "select";
  const isAutoplay = mode === "all";
  const currentLang = localStorage.getItem("siteLanguage") || DEFAULT_LANG;

  // Utility helpers
  const safeText = (value) => (value == null ? "" : String(value));
  const chooseLang = (obj) => (obj && obj[currentLang]) ? obj[currentLang] : (obj && obj[DEFAULT_LANG]) || "";
  const createEl = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === null) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    });
    children.forEach(c => el.appendChild(c));
    return el;
  };

  class Carousel {
    constructor({ rootSelector = "#carousel", navSelector = ".chapter-nav" } = {}) {
      this.root = null;
      this.nav = null;
      this.rootSelector = rootSelector;
      this.navSelector = navSelector;

      this.videoData = null;        // original data
      this.carouselVideos = [];     // filtered list
      this.activePlayerIndex = null;

      this.observer = null;
      this.activationTimer = null;
      this.activationLocked = false;

      this.resolvedStartIndex = 0;
    }

    async init() {
      // Wait for DOM ready
      if (document.readyState === "loading") {
        await new Promise(res => document.addEventListener("DOMContentLoaded", res, { once: true }));
      }

      this.root = document.querySelector(this.rootSelector);
      this.nav = document.querySelector(this.navSelector);

      if (!this.root) {
        console.error("Carousel root element not found:", this.rootSelector);
        return;
      }

      // Wait until window.videoData exists (poll via rAF)
      await this.waitForVideoData();

      this.videoData = window.videoData || [];
      this.filterVideos();
      this.buildSections();
      this.buildNavDots();
      this.setupObserver();
      this.resolveStartIndexAndActivate();
      this.handleUnload();
    }

    waitForVideoData() {
      return new Promise(resolve => {
        const check = () => {
          if (window.videoData) return resolve();
          requestAnimationFrame(check);
        };
        check();
      });
    }

    filterVideos() {
      // Normalize mode values and support legacy reel param
      const reelParam = params.get("reel");
      const normalizedMode = String(mode || "").toLowerCase();

      // Determine intended mode:
      // - "reel": only videos marked reel === true
      // - "all": all videos
      // - "select": non-reel (default for selection pages)
      // Backwards-compatible: ?reel=1 or ?reel=true forces reel mode.
      const wantReel = normalizedMode === "reel" || reelParam === "1" || reelParam === "true";
      const wantAll = normalizedMode === "all";

      if (wantReel) {
        this.carouselVideos = this.videoData.filter(v => Boolean(v.reel) === true);
      } else if (wantAll) {
        this.carouselVideos = Array.isArray(this.videoData) ? this.videoData.slice() : [];
      } else {
        // default to "select" behavior: show non-reel items
        this.carouselVideos = this.videoData.filter(v => !v.reel);
      }
    }


    buildSections() {
      // Clear existing content
      this.root.innerHTML = "";

      this.carouselVideos.forEach((video, index) => {
        const section = createEl("section", { class: "carousel-section", "data-index": String(index) });

        // video container
        const videoContainer = createEl("div", { class: "video-container", id: `video-${index}` });
        const loader = createEl("div", { class: "loader", text: "Loading..." });
        videoContainer.appendChild(loader);

        // metadata using safe text nodes (avoid innerHTML/XSS)
        const meta = createEl("div", { class: "video-meta" });
        const titleEl = createEl("h2", { class: "video-title", text: chooseLang(video.title) });
        const categoryEl = createEl("span", { class: "video-category", text: chooseLang(video.category) });
        const descEl = createEl("p", { class: "video-description", text: chooseLang(video.description) });

        meta.appendChild(titleEl);
        meta.appendChild(categoryEl);
        meta.appendChild(descEl);

        section.appendChild(videoContainer);
        section.appendChild(meta);

        this.root.appendChild(section);
      });

      // end section (menu)
      const endSection = createEl("section", { class: "carousel-section end-section" });
      const menuButton = createEl("button", { class: "menu-button menu-return", type: "button", text: "menu" });
      menuButton.addEventListener("click", () => { window.location.href = "index.html"; });
      endSection.appendChild(menuButton);
      this.root.appendChild(endSection);
    }

    buildNavDots() {
      if (!this.nav) return;
      this.nav.innerHTML = "";

      this.carouselVideos.forEach((_, index) => {
        const dot = createEl("button", {
          class: "chapter-dot",
          type: "button",
          "aria-label": `Go to chapter ${index + 1}`
        });
        dot.addEventListener("click", () => this.scrollToIndex(index));
        dot.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dot.click(); }
        });
        this.nav.appendChild(dot);
      });
    }

    setupObserver() {
      // Disconnect old observer if exists
      if (this.observer) this.observer.disconnect();

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.activationLocked) {
            this.activationLocked = true;
            setTimeout(() => { this.activationLocked = false; }, ACTIVATION_DELAY);

            const index = Number.parseInt(entry.target.dataset.index, 10);
            if (Number.isNaN(index)) return;

            clearTimeout(this.activationTimer);
            this.activationTimer = setTimeout(() => {
              this.updateActiveDot(index);
              this.activateVideo(index);
            }, ACTIVATION_DELAY);
          }
        });
      }, { threshold: 0.65 });

      // Observe sections (exclude end-section)
      this.root.querySelectorAll(".carousel-section:not(.end-section)").forEach(section => {
        this.observer.observe(section);
      });
    }

    scrollToIndex(index) {
      const section = this.root.querySelector(`.carousel-section[data-index="${index}"]`);
      if (section) section.scrollIntoView({ behavior: "auto" });
    }

    updateActiveDot(index) {
      const dots = document.querySelectorAll(".chapter-dot");
      dots.forEach(d => d.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }

    activateVideo(index) {
      if (this.activePlayerIndex === index) return;
      const video = this.carouselVideos[index];
      if (!video) return;

      const container = document.getElementById(`video-${index}`);
      if (!container) return;

      // Remove only if iframe exists, avoid full innerHTML wipe
      const existingIframe = container.querySelector("iframe");
      if (existingIframe) existingIframe.remove();

      // Clear container children and add loader
      container.innerHTML = "";
      const loader = createEl("div", { class: "loader", text: "Loading…" });
      container.appendChild(loader);

      const iframe = document.createElement("iframe");
      const autoplay = isAutoplay ? 1 : 0;
      const encodedId = encodeURIComponent(String(video.id));
      iframe.src = `https://iframe.mediadelivery.net/embed/661508/${encodedId}?autoplay=${autoplay}&muted=true&playsinline=true&responsive=true`;
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;
      iframe.title = `Video: ${chooseLang(video.title) || "Embedded video"}`;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.loading = "lazy";
      iframe.style.opacity = "0";
      iframe.style.transition = "opacity 0.4s ease";

      container.appendChild(iframe);

      // load timeout fallback
      const loadTimeout = setTimeout(() => {
        const loaderEl = container.querySelector(".loader");
        if (loaderEl) loaderEl.textContent = "Unable to load video";
      }, IFRAME_LOAD_TIMEOUT);

      iframe.onload = () => {
        clearTimeout(loadTimeout);
        const loaderEl = container.querySelector(".loader");
        if (loaderEl) loaderEl.remove();
        requestAnimationFrame(() => { iframe.style.opacity = "1"; });
        this.activePlayerIndex = index;
      };

      iframe.onerror = () => {
        clearTimeout(loadTimeout);
        const loaderEl = container.querySelector(".loader");
        if (loaderEl) loaderEl.textContent = "Unable to load video";
      };
    }

    resolveStartIndexAndActivate() {
      // Resolve start index using startId or startIndexParam after carouselVideos built
      let resolved = 0;

      if (startId) {
        const found = this.carouselVideos.findIndex(v => String(v.id) === startId);
        if (found >= 0) resolved = found;
      } else if (startIndexParam !== null && Number.isFinite(startIndexParam)) {
        const originalItem = this.videoData[startIndexParam];
        if (originalItem) {
          const mapped = this.carouselVideos.findIndex(v => v.id === originalItem.id);
          if (mapped >= 0) resolved = mapped;
        }
      }

      resolved = Math.max(0, Math.min(resolved, Math.max(0, this.carouselVideos.length - 1)));
      this.resolvedStartIndex = resolved;

      // Scroll and activate on next frame to ensure layout
      requestAnimationFrame(() => {
        this.scrollToIndex(this.resolvedStartIndex);
        this.updateActiveDot(this.resolvedStartIndex);
        this.activateVideo(this.resolvedStartIndex);
      });
    }

    handleUnload() {
      window.addEventListener("beforeunload", () => {
        if (this.observer) this.observer.disconnect();
      });
    }
  }

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      location.reload();
    }
  });

  // Kick off
  const carouselInstance = new Carousel({ rootSelector: "#carousel", navSelector: ".chapter-nav" });
  carouselInstance.init().catch(err => console.error("Carousel init error:", err));
})();
