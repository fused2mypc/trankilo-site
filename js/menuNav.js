let navIndex = 0;

export function getSelectable() {
  if (document.body.classList.contains("reel-page")) {
    return [];
  }
  return Array.from(
    document.querySelectorAll(".menu-button, .project-card")
  );
}

export function setActive(el) {
  const all = getSelectable();
  all.forEach(item => item.classList.remove("active"));
  if (!el) return;
  el.classList.add("active");
  el.focus();
  navIndex = all.indexOf(el);
}

export function moveSelection(direction) {
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

export function activateSelection() {
  const selectable = getSelectable();
  const el = selectable[navIndex];
  if (!el) return;
  el.click();
}