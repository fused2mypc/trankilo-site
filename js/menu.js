const TRANSITION_DURATION = 800;
const CLICKABLE_SELECTORS =
  ".menu-button:not(.lang-link), .project-card";


  document.querySelectorAll(CLICKABLE_SELECTORS).forEach(el => {
    
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (document.body.classList.contains("is-transitioning")) {
        return;
      }

      const target =
        el.getAttribute("data-target") ||
        el.getAttribute("href");

      if (!target) return;

      document.body.classList.add("is-transitioning");

      setTimeout(() => {
        window.location.href = target;
      }, TRANSITION_DURATION);
    });
  });