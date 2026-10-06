const projectData = [
  {
    member: "Rejo",
    title: "Chennai Stays",
    type: "Booking UI",
    path: "team/rejo/chennai_stays/index.html",
    description: "Hotel and stay rental booking platform for Chennai."
  },
  {
    member: "Rejo",
    title: "Cloud Cut",
    type: "Video Editor",
    path: "team/rejo/cloud_cut/index.html",
    description: "Browser-based video editing and timeline editor."
  },
  {
    member: "Rejo",
    title: "Pixel Muse",
    type: "Design Tool",
    path: "team/rejo/pixel_muse/index.html",
    description: "Creative design and pixel art tool."
  },
  {
    member: "Rejo",
    title: "Stream Box",
    type: "Streaming",
    path: "team/rejo/stream_box/index.html",
    description: "Live streaming and video platform."
  }
];

const projectGrid = document.getElementById("project-grid");

if (projectGrid) {
  projectGrid.innerHTML = projectData
    .map(
      (project) => `
        <article class="project-card">
          <div class="project-preview"></div>
          <div class="project-content">
            <span class="project-tag">${project.type}</span>
            <h3>${project.title}</h3>
            <p>${project.member} • ${project.description}</p>
            <a class="project-link" href="${project.path}" target="_blank" rel="noreferrer">
              Open project
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
