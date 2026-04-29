// js/dvd-fade.js
// Simple universal DVD-style short play and fade for any page with a background video
(function () {
  const FADE_DURATION = 0.1; // seconds for fade
  const PLAY_TIME = 2;       // seconds to play video before navigation
  const CLICKABLE_SELECTORS = ".menu-button, .scene-card";

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

      // Fade menu buttons immediately
      document.querySelectorAll(".menu-button").forEach(btn => fadeElement(btn, FADE_DURATION));

      // If no video, navigate after button fade
      if (!bgVideo || isNaN(bgVideo.duration)) {
        setTimeout(() => window.location.href = target, FADE_DURATION * 1000);
        return;
      }

      const startTransition = () => {
        bgVideo.currentTime = 0; // restart video
        bgVideo.play();

        // After PLAY_TIME seconds, fade video and navigate
        setTimeout(() => {
          fadeElement(bgVideo, FADE_DURATION);
          setTimeout(() => {
            window.location.href = target;
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