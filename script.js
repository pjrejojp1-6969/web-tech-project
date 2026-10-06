const teamData = [
  {
    name: "Rejo",
    projects: [
      {
        title: "Chennai Stays",
        type: "Booking UI",
        path: "team/rejo/chennai_stays/index.html",
        description: "Hotel and stay rental booking platform for Chennai.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Cloud Cut",
        type: "Video Editor",
        path: "team/rejo/cloud_cut/index.html",
        description: "Browser-based video editing and timeline editor.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Pixel Muse",
        type: "Design Tool",
        path: "team/rejo/pixel_muse/index.html",
        description: "Creative design and pixel art tool.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Stream Box",
        type: "Streaming",
        path: "team/rejo/stream_box/index.html",
        description: "Live streaming and video platform.",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop"
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
        description: "Home maintenance and repair booking system.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Modern Hospital",
        type: "Healthcare",
        path: "team/jaswanth/hospital-appointment-system/index.html",
        description: "Hospital appointment and patient booking portal.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Salon App",
        type: "Beauty Booking",
        path: "team/jaswanth/salon-app/index.html",
        description: "Salon booking app for services and appointments.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Sports Turf Booking",
        type: "Sports Booking",
        path: "team/jaswanth/sports-turf-booking/index.html",
        description: "Booking interface for sports turf rentals and reservations.",
        image: "https://images.unsplash.com/photo-1529900965798-eb4052b968cb?q=80&w=800&auto=format&fit=crop"
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
        description: "A responsive hotel booking and accommodation interface.",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Forkfull",
        type: "food ordering",
        path: "team/captain/static/index.html",
        description: "A food ordering website.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Travel Explorer",
        type: "Travel",
        path: "team/captain/traveling/index.html",
        description: "A travel destination and tour booking platform.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Crypto",
        type: "grocery ordering",
        path: "team/captain/crypto/index.html",
        description: "A grocery ordering website.",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop"
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
        description: "An AI agent command center and management interface.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "PulseIQ",
        type: "Dashboard",
        path: "team/Saicharan/PulseIQ-Dashboard/index.html",
        description: "Analytics and data visualization dashboard.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "StashBox",
        type: "Storage",
        path: "team/Saicharan/StashBox/index.html",
        description: "Secure file storage and management system.",
        image: "https://images.unsplash.com/photo-1614064019488-ab9308643806?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "StockPulse",
        type: "Finance",
        path: "team/Saicharan/StockPulse/index.html",
        description: "Stock market tracking and financial analytics platform.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
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
                    <div class="project-preview" style="background-image: url('${project.image}');"></div>
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
