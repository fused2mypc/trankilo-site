import {
  moveSelection,
  activateSelection
} from "./menuNav.js";

import {
  scrollCarousel,
  isCarouselLocked
} from "./carouselNav.js";

window.addEventListener("keydown", (e) => {

  const allowedKeys = [
    "ArrowUp",
    "ArrowDown",
    "Enter",
    "Escape",
    "PageUp",
    "PageDown",
    "Tab"
  ];

  if (
    e.repeat ||
    isCarouselLocked() ||
    !allowedKeys.includes(e.key)
  ) return;
  
  const isCarousel = document.body.classList.contains("carousel-page");

  if (!isCarousel) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveSelection(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveSelection(-1);
      return;
    }
    if (e.key === "Enter") {
      activateSelection();
      return;
    }
    return;
  }

  if (e.key === "ArrowDown" || e.key === "PageDown") {

    e.preventDefault();
    scrollCarousel(1);
    return;
  }

  if (e.key === "ArrowUp" || e.key === "PageUp") {

    e.preventDefault();
    scrollCarousel(-1);
    return;
  }
});