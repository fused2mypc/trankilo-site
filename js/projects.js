import { videoData } from "./data.js";

const projectList = document.getElementById("project-list");
const currentLang = localStorage.getItem("siteLanguage") || "en";

function buildProjects() {
    videoData
      .filter(video =>
        !video.reel &&
        video.set !== "other"
      )
      .forEach((video, index) => {

    const card = document.createElement("div");
    card.className = "project-card";
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="project-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title[currentLang]}">
      </div>
      <div class="project-info">
        <h2 class="project-title"><span>${video.title[currentLang]}</span></h2>
        <p class="project-description">${video.category[currentLang]}</p>
        <span class="project-runtime">${video.runtime}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `carousel.html?startId=${video.id}`;
    });

    projectList.appendChild(card);

    const title = card.querySelector(".project-title");
    const titleText = title.querySelector("span");

    function startTitleScroll() {
      const overflow = titleText.scrollWidth - title.clientWidth;

      if (overflow <= 0) return;

      title.style.setProperty("--overflow", `${overflow}px`);
      title.classList.add("scrolling");
    }

    function stopTitleScroll() {
      title.classList.remove("scrolling");
    }

    card.addEventListener("focus", startTitleScroll);
    card.addEventListener("blur", stopTitleScroll);

    card.addEventListener("mouseenter", startTitleScroll);
    card.addEventListener("mouseleave", stopTitleScroll);
  });
}

buildProjects();