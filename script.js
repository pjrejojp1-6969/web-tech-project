const projectData = [
  {
    member: "Member 1",
    title: "Gym Landing Page",
    type: "Landing Page",
    path: "team/member-1/gym-landing-page/index.html",
    description: "High-energy landing page for a fitness brand or gym startup."
  },
  {
    member: "Member 1",
    title: "Portfolio Showcase",
    type: "Portfolio",
    path: "team/member-1/portfolio-showcase/index.html",
    description: "Personal portfolio design with work cards and a clean profile layout."
  },
  {
    member: "Member 2",
    title: "SaaS Dashboard",
    type: "Dashboard",
    path: "team/member-2/saas-dashboard/index.html",
    description: "Metrics-first dashboard layout for a software company or analytics panel."
  },
  {
    member: "Member 2",
    title: "Travel Booking UI",
    type: "Booking UI",
    path: "team/member-2/travel-booking-ui/index.html",
    description: "A modern travel booking interface with destination cards and filters."
  },
  {
    member: "Member 3",
    title: "Crypto Dashboard",
    type: "Dashboard",
    path: "team/member-3/crypto-dashboard/index.html",
    description: "Financial dashboard concept featuring chart cards and portfolio stats."
  },
  {
    member: "Member 3",
    title: "Restaurant Website",
    type: "Business Site",
    path: "team/member-3/restaurant-website/index.html",
    description: "A restaurant homepage with menu highlights and reservations section."
  },
  {
    member: "Member 4",
    title: "E-commerce Home",
    type: "E-commerce",
    path: "team/member-4/ecommerce-home/index.html",
    description: "Shopping homepage concept with promotional banners and product rows."
  },
  {
    member: "Member 4",
    title: "Clinic Booking Page",
    type: "Services",
    path: "team/member-4/clinic-booking-page/index.html",
    description: "Healthcare appointment page with service cards and booking flow."
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
