import "./uiFX.js";
import "./language.js";

import "./menuNav.js";
import "./keyboard.js";

import "./menu.js";
import "./carouselNav.js";

console.log("app loaded");

document.body.classList.remove("is-transitioning");

window.addEventListener("pageshow", (event) => {
  document.body.classList.remove("is-transitioning");
});

document.addEventListener("touchstart", () => {
  const video = document.querySelector(".background-video");
  if (video) video.play();
}, { once: true });