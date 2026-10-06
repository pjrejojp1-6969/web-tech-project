# StashBox — SaaS File Management

A cloud-drive style file manager built with plain HTML, CSS and JavaScript. No frameworks or build step.

## UI category
Modern SaaS — SaaS File Management.

## Purpose of the UI
Let a team upload, organise, find and share files in one place.

## Research / background
File management UIs are used in cloud storage, project tools and document platforms such as Dropbox, Google Drive and Notion. They matter in modern web apps because every SaaS product needs somewhere to store and share user content.

Patterns observed: a sidebar of file categories, grid/list toggle, breadcrumbs, drag-and-drop upload, multi-select with a bulk action bar, trash with restore, and a storage meter.

What StashBox adds: a chunky neo-brutalist look with bouncy animations, drag-to-move onto folders and breadcrumbs, keyboard shortcuts, a working share-link flow, and a dark mode.

## Design patterns used
Sidebar navigation, breadcrumbs, card grid and list views, bulk-action bar, modal dialogs, toast feedback, drag and drop, progress/usage meter.

## Features implemented
- Real upload (button or drag-and-drop) with image thumbnails and a progress animation
- Nested folders, breadcrumbs, drag a file onto a folder to move it
- Search, sort (name, newest, largest, type), grid/list toggle
- Star, rename, share link (copied to clipboard), download, preview modal
- Multi-select with star, trash, restore and delete forever
- Trash with empty-trash, storage meter with quota check
- Shortcuts: `/` search, `N` new folder, `G` view, `Delete` trash, `Esc` close
- Dark mode; data, view and theme saved in `localStorage`
- Responsive layout

## Technologies used
HTML5, CSS3, vanilla JavaScript (ES6).

## Folder structure
```
stashbox/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run
Open `stashbox/index.html` in a modern browser. Uploaded images show thumbnails for the current session only; file details are saved.

## GitHub workflow
1. Fork and clone the repository.
2. `git checkout -b feature/stashbox-file-manager`
3. Commit with clear messages, then `git push origin feature/stashbox-file-manager`
4. Open a Pull Request, get a teammate's review, apply changes, merge. Never commit directly to `main`.

## Team / contributions
| Member | Role | Contribution |
|--------|------|--------------|
| G.Saicharan | Member | 4 Projects |
