# PulseIQ — Analytics Dashboard

A fully interactive analytics dashboard built with plain HTML, CSS and JavaScript. No frameworks, no build step.

## UI category
Analytics & Data Visualization — Analytics Dashboard / KPI Dashboard / Analytics Reports & Export.

## Purpose of the UI
Give a store or SaaS team one place to see revenue, orders, customers and products, filter the data, and export it.

## Research / background
Analytics dashboards are screens that gather key business metrics so people can spot trends and act quickly. They are used in SaaS products, e-commerce, finance and marketing tools (for example Stripe, Shopify and Google Analytics). They matter for modern web interfaces because data-heavy products need fast scanning, filtering and export.

Patterns observed: a left navigation rail, KPI cards with growth indicators, a main time-series chart, filter chips, searchable tables, and toast feedback.

What PulseIQ adds: flip-style KPI cards that reveal context on the back, a frosted-glass dark theme with a cursor-following glow, working report generation with history, and persistent display settings.

## Design patterns used
- Sidebar tab navigation (no page reloads)
- KPI cards with flip interaction and delta indicators
- Glassmorphism panels (`backdrop-filter`)
- Filter chips, live search, sortable ranking
- Toast notifications
- Toggle switches saved in `localStorage`
- Inline SVG charts

## Features implemented
- 6 working tabs: Overview, Sales, Customers, Products, Reports, Settings
- Date range selector that updates KPIs and the revenue chart
- Global search that jumps to matching orders
- Sales table with search, status filters and CSV export
- Interactive customer segments
- Ranked products with progress bars and sorting
- Report generation with toast and timestamped history
- Settings: cursor glow, animations, compact layout, notifications
- Simulated live activity feed
- Responsive layout (desktop, tablet, mobile)

## Technologies used
HTML5, CSS3, vanilla JavaScript (ES6).

## Folder structure
```
pulseiq/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run
1. Download or clone the repository.
2. Open `pulseiq/index.html` in a modern browser (double-click it).

## GitHub workflow
1. Fork the assigned repository, then clone your fork.
2. Create a branch: `git checkout -b feature/pulseiq-dashboard`
3. Develop and commit with clear messages: `git commit -m "Add PulseIQ sales tab"`
4. Push: `git push origin feature/pulseiq-dashboard`
5. Open a Pull Request, ask a teammate to review, apply requested changes, then merge.
Do not commit directly to `main`.

## Team / contributions
| Member | Role | Contribution |
|--------|------|--------------|
| G.Saicharan | Member | 4 Projects |
