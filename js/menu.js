(function () {
  const FADE_DURATION = 0.1; // seconds for fade
  const PLAY_TIME = 2;       // seconds to play video before navigation
  const CLICKABLE_SELECTORS = ".menu-button, .project-card";

  // =========================
  // SPA navigation helper (NO reload)
  // =========================
  function navigate(target) {
    window.history.pushState({}, "", target);
    window.dispatchEvent(new Event("locationchange"));
  }

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("locationchange"));
  });

  // Helper: fade an element
  function fadeElement(el, duration) {
    el.style.transition = `opacity ${duration}s ease`;
    el.style.opacity = "0";
  }

  // Handle clicks on elements
  document.querySelectorAll(CLICKABLE_SELECTORS).forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();

      const target = el.getAttribute("data-target") || el.getAttribute("href");
      if (!target) return;

      const bgVideo = document.querySelector(".background-video");

      // Disable all clickable elements
      document.querySelectorAll(CLICKABLE_SELECTORS).forEach(btn => {
        btn.style.pointerEvents = "none";
      });

      // Fade menu buttons + title immediately
      document.querySelectorAll(".menu-button, .title-block, .about-container").forEach(el => {
        fadeElement(el, FADE_DURATION);
      });

      // If no video, navigate after fade
      if (!bgVideo || isNaN(bgVideo.duration)) {
        setTimeout(() => navigate(target), FADE_DURATION * 1000);
        return;
      }

      const startTransition = () => {
        bgVideo.currentTime = 0;
        bgVideo.play();

        setTimeout(() => {
          fadeElement(bgVideo, FADE_DURATION);

          setTimeout(() => {
            navigate(target);
          }, FADE_DURATION * 1000);

        }, PLAY_TIME * 1000);
      };

      if (bgVideo.readyState >= 1) {
        startTransition();
      } else {
        bgVideo.addEventListener("loadedmetadata", startTransition, { once: true });
      }
    });
  });
})();