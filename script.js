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
    name: "Priya",
    projects: [
      {
        title: "E-Commerce Hub",
        type: "Shopping Platform",
        path: "team/priya/ecommerce-hub/index.html",
        description: "Modern e-commerce platform with product filtering and cart."
      },
      {
        title: "Recipe Gallery",
        type: "Food & Recipes",
        path: "team/priya/recipe-gallery/index.html",
        description: "Interactive recipe collection with cooking instructions."
      },
      {
        title: "Weather Dashboard",
        type: "Weather App",
        path: "team/priya/weather-dashboard/index.html",
        description: "Real-time weather information and forecast display."
      },
      {
        title: "Task Manager",
        type: "Productivity",
        path: "team/priya/task-manager/index.html",
        description: "Daily task management and todo list application."
      }
    ]
  },
  {
    name: "Arun",
    projects: [
      {
        title: "Fitness Tracker",
        type: "Health & Fitness",
        path: "team/arun/fitness-tracker/index.html",
        description: "Workout tracking and fitness goal management system."
      },
      {
        title: "Movie Database",
        type: "Entertainment",
        path: "team/arun/movie-database/index.html",
        description: "Movie information and rating platform with search."
      },
      {
        title: "Travel Planner",
        type: "Travel & Tourism",
        path: "team/arun/travel-planner/index.html",
        description: "Plan trips with destination guides and itinerary builder."
      },
      {
        title: "Music Player",
        type: "Media Player",
        path: "team/arun/music-player/index.html",
        description: "Custom web-based music player with playlist management."
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
