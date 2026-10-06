const teamData = [
  {
    name: "Rejo",
    projects: [
      {
        title: "Chennai Stays",
        type: "Booking UI",
        path: "team/rejo/chennai_stays/index.html",
        description: "Hotel and stay rental booking platform for Chennai."
      },
      {
        title: "Cloud Cut",
        type: "Video Editor",
        path: "team/rejo/cloud_cut/index.html",
        description: "Browser-based video editing and timeline editor."
      },
      {
        title: "Pixel Muse",
        type: "Design Tool",
        path: "team/rejo/pixel_muse/index.html",
        description: "Creative design and pixel art tool."
      },
      {
        title: "Stream Box",
        type: "Streaming",
        path: "team/rejo/stream_box/index.html",
        description: "Live streaming and video platform."
      }
    ]
  },
  {
    name: "Jaswanth",
    projects: [
      {
        title: "HomeFix",
        type: "Home Services",
        path: "team/jaswanth/home-maintenance-booking/index.html",
        description: "Home maintenance and repair booking system."
      },
      {
        title: "Modern Hospital",
        type: "Healthcare",
        path: "team/jaswanth/hospital-appointment-system/index.html",
        description: "Hospital appointment and patient booking portal."
      },
      {
        title: "Salon App",
        type: "Beauty Booking",
        path: "team/jaswanth/salon-app/index.html",
        description: "Salon booking app for services and appointments."
      },
      {
        title: "Sports Turf Booking",
        type: "Sports Booking",
        path: "team/jaswanth/sports-turf-booking/index.html",
        description: "Booking interface for sports turf rentals and reservations."
      }
    ]
  },
  {
    name: "venkata sai charan",
    projects: [
      {
        title: "Hotel Booking",
        type: "Hospitality",
        path: "team/captain/hotel/index.html",
        description: "A responsive hotel booking and accommodation interface."
      },
      {
        title: "Forkfull",
        type: "food ordering",
        path: "team/captain/static/index.html",
        description: "A food ordering website."
      },
      {
        title: "Travel Explorer",
        type: "Travel",
        path: "team/captain/traveling/index.html",
        description: "A travel destination and tour booking platform."
      },
      {
        title: "Crypto",
        type: "grocery ordering",
        path: "team/captain/crypto/index.html",
        description: "A grocery ordering website."
      }
    ]
  },
  {
    name: "Saicharan",
    projects: [
      {
        title: "AgentFlow AI",
        type: "AI Interface",
        path: "team/Saicharan/AgentFlow-AI-Agent-Command-Center/index.html",
        description: "An AI agent command center and management interface."
      },
      {
        title: "PulseIQ",
        type: "Dashboard",
        path: "team/Saicharan/PulseIQ-Dashboard/index.html",
        description: "Analytics and data visualization dashboard."
      },
      {
        title: "StashBox",
        type: "Storage",
        path: "team/Saicharan/StashBox/index.html",
        description: "Secure file storage and management system."
      },
      {
        title: "StockPulse",
        type: "Finance",
        path: "team/Saicharan/StockPulse/index.html",
        description: "Stock market tracking and financial analytics platform."
      }
    ]
  }
];

const teamContainer = document.getElementById("team-container");

if (teamContainer) {
  teamContainer.innerHTML = teamData
    .map(
      (team) => `
        <div class="team-section">
          <h2 class="team-name">${team.name}</h2>
          <div class="project-grid">
            ${team.projects
              .map(
                (project) => `
                  <article class="project-card">
                    <div class="project-preview"></div>
                    <div class="project-content">
                      <span class="project-tag">${project.type}</span>
                      <h3>${project.title}</h3>
                      <p>${project.description}</p>
                      <a class="project-link" href="${project.path}" target="_blank" rel="noreferrer">
                        Open project
                      </a>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
