let keyboardActive = false;
let navIndex = -1;
let lockInput = false;

const LOCK_TIME = 320;

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getSelectable() {

  if (document.body.classList.contains("play-page")) {
    return [];
  }

  return Array.from(
    document.querySelectorAll(".menu-button, .scene-card")
  );
}

function setActive(el) {

  const all = getSelectable();

  all.forEach(item => item.classList.remove("active"));

  if (!el) return;

  el.classList.add("active");
  el.focus();

  navIndex = all.indexOf(el);
}

function wakeKeyboard() {

  if (keyboardActive) return;

  const selectable = getSelectable();

  if (!selectable.length) return;

  keyboardActive = true;

  setActive(selectable[0]);
}

function moveSelection(direction) {

  const selectable = getSelectable();

  if (!selectable.length) return;

  navIndex += direction;

  if (navIndex < 0) navIndex = selectable.length - 1;
  if (navIndex >= selectable.length) navIndex = 0;

  setActive(selectable[navIndex]);

  selectable[navIndex].scrollIntoView({
    block: "center",
    behavior: "smooth"
  });
}

function activateSelection() {

  const selectable = getSelectable();

  const el = selectable[navIndex];

  if (!el) return;

  el.click();
}

function lock() {

  lockInput = true;

  setTimeout(() => {
    lockInput = false;
  }, LOCK_TIME);
}

// --------------------------------------------------
// Carousel helpers
// --------------------------------------------------

function scrollCarousel(direction) {

  const carousel = document.querySelector(".carousel");

  if (!carousel) return;

  const sections = Array.from(
    document.querySelectorAll(".carousel-section")
  );

  const viewportCenter = window.innerHeight / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  sections.forEach((section, i) => {

    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;

    const distance = Math.abs(viewportCenter - sectionCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }

  });

  const current = closestIndex;

  let next = current + direction;

  if (next < 0) next = 0;
  if (next >= sections.length) next = sections.length - 1;

  sections[next].scrollIntoView({
    behavior: "smooth"
  });

  lock();
}

// --------------------------------------------------
// Key handling
// --------------------------------------------------

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

  if (!allowedKeys.includes(e.key)) return;

  // ignore key hold repeat
  if (e.repeat) return;

  if (lockInput) return;

    // ------------------------------------------------
  // ESC
  // ------------------------------------------------

if (e.key === "Escape") {

  e.preventDefault();

  const body = document.body;

  // all other pages return to menu
  history.back();

  return;
}
  
  const isCarousel = document.body.classList.contains("play-page");

if (!keyboardActive) {
  wakeKeyboard();
  return;
}

  // ------------------------------------------------
  // MENU / LIST NAVIGATION
  // ------------------------------------------------

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

      if (isCarousel) return;

      activateSelection();
      return;
    }

    return;
  }

  // ------------------------------------------------
  // CAROUSEL NAVIGATION
  // ------------------------------------------------

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