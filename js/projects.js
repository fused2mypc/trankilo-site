const projectList = document.getElementById("project-list");
const currentLang = localStorage.getItem("siteLanguage") || "en";

function buildProjects() {
  window.videoData.forEach((video, index) => {
    if (video.reel) return; // skip the reel

    const card = document.createElement("div");
    card.className = "project-card";
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="project-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title[currentLang]}">
      </div>
      <div class="project-info">
        <h2 class="project-title">${video.title[currentLang]}</h2>
        <p class="project-description">${video.category[currentLang]}</p>
        <span class="project-runtime">${video.runtime}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `play.html?mode=project&start=${index}`;
    });

    projectList.appendChild(card);
  });
}

buildProjects();