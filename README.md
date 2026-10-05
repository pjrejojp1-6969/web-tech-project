# Web Tech Project

This repository is a collaborative UI template collection built for a hackathon-style team project. The goal is to let each team member create their own projects and showcase them in one central gallery.

## Project Goals

- Build a collection of modern UI projects
- Keep each project independent and self-contained
- Use GitHub Fork + Pull Request workflow for collaboration
- Publish everything on GitHub Pages from the `main` branch

## Repository Structure

```text
web-tech-project/
├── index.html
├── style.css
├── script.js
├── README.md
├── team/
│   ├── README.md
│   ├── member-1/
│   │   ├── project-1/
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── script.js
│   │   ├── project-2/
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── script.js
│   │   └── ...
│   ├── member-2/
│   │   └── ...
│   ├── member-3/
│   │   └── ...
│   └── member-4/
│       └── ...
```

Each member creates their own project folders under `team/` and each project contains:

- `index.html`
- `style.css`
- `script.js`

## Contribution Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Add your project folder under `team/<your-name>/`
5. Commit and push to your fork
6. Open a pull request to the main repository

## Team Notes

- Each member can create their own unique UI projects
- Project topics can differ from one member to another
- Use clear folder names like:
  - `gym-landing-page`
  - `crypto-dashboard`
  - `portfolio-site`
  - `travel-booking-ui`

## Local Preview

Open `index.html` directly in a browser or run:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub Pages

This project is configured to deploy from the `main` branch through GitHub Pages.

Live URL:

```text
https://pjrejojp1-6969.github.io/web-tech-project/
```
