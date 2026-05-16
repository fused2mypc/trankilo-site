let targetX = -10;
let targetY = 8;

let currentX = -10;
let currentY = 8;

const strength = 14;
const smoothing = 0.08;

// ----------------------------------
// Pointer Tracking
// ----------------------------------

window.addEventListener("pointermove", (e) => {

  const xPercent = (e.clientX / window.innerWidth) - 0.5;
  const yPercent = (e.clientY / window.innerHeight) - 0.5;

  targetX = -xPercent * strength;
  targetY = -yPercent * strength;
});

// ----------------------------------
// Animation Loop
// ----------------------------------

function animateBlur() {

  currentX += (targetX - currentX) * smoothing;
  currentY += (targetY - currentY) * smoothing;

  document.documentElement.style.setProperty(
    "--blur-x",
    `${currentX}px`
  );

  document.documentElement.style.setProperty(
    "--blur-y",
    `${currentY}px`
  );

  requestAnimationFrame(animateBlur);
}

animateBlur();