  const TRANSITION_DURATION = 800;
  let isTransitioning = false;

  document.querySelectorAll(CLICKABLE_SELECTORS).forEach(el => {
    
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (isTransitioning) return;

      const target =
        el.getAttribute("data-target") ||
        el.getAttribute("href");

      if (!target) return;

      isTransitioning = true;
      document.body.classList.add("is-transitioning");

      setTimeout(() => {
        window.location.href = target;
      }, TRANSITION_DURATION);
    });
  });