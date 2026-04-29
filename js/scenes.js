const sceneList = document.getElementById("scene-list");
const currentLang = localStorage.getItem("siteLanguage") || "en";

function buildScenes() {
  window.videoData.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "scene-card";
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="scene-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title[currentLang]}">
      </div>
      <div class="scene-info">
        <h2 class="scene-title">${video.title[currentLang]}</h2>
        <p class="scene-description">${video.category[currentLang]}</p>
        <span class="scene-runtime">${video.runtime}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `play.html?mode=scene&start=${index}`;
    });

    sceneList.appendChild(card);
  });
}

buildScenes();