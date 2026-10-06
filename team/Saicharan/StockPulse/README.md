# StockPulse Glass — Stock Market Analytics (Paper Trading Demo)

## Description
StockPulse is a frontend-only stock market dashboard built with HTML, CSS and vanilla JavaScript. It uses **real Indian company names and NSE ticker symbols** with **static demo values**. **Prices are NOT live and are not real market data.** All trading is **paper trading / simulation** with virtual money.

## Purpose
A UI template for the Web Technology UI Template Collection project: practise dashboards, tables, charts, filters, forms and LocalStorage.

## UI category
Analytics & Data Visualization — Analytics Dashboard, Revenue/Portfolio Analytics, Data Visualization Cards, Analytics Filters, Reports & Export.

## Features
- Dashboard: portfolio value, invested, cash, today's P/L, return, market indexes (NIFTY 50, SENSEX, NIFTY BANK, NIFTY IT), top gainers/losers with a market-mood bar, recent transactions, watchlist preview
- Markets: 20 real stocks, search, sector filter, gainers/losers filter, sortable columns
- Watchlist: add, remove, search, sort (saved in LocalStorage)
- Stock Explorer and Stock Details: all key stats, 1D/1W/1M/6M/1Y/5Y chart
- Portfolio: holdings, P/L, allocation donut, performance chart
- Buy/Sell simulator with cash and holdings validation and confirmation messages
- Analytics: performance, P/L, sector allocation, best/worst, monthly performance, distribution
- News (sample content only), price alerts (create, enable/disable, delete), transactions with search, filter and CSV export
- Settings: animations, notifications, clear watchlist/portfolio/history, reset demo data
- Floating command bar (search a company or type "portfolio", "top gainers", "buy TCS")
- Responsive layout for desktop, tablet and mobile

## Technologies
HTML5, CSS3, vanilla JavaScript, SVG charts, LocalStorage. No frameworks, no APIs, no backend.

## Folder structure
```
StockPulse-Glass/
├── index.html          (Dashboard)
├── style.css
├── script.js
├── README.md
├── pages/
│   ├── markets.html
│   ├── watchlist.html
│   ├── portfolio.html
│   ├── stock.html      (Explorer + Details)
│   ├── analytics.html
│   ├── news.html
│   ├── alerts.html
│   ├── settings.html
│   └── transactions.html
└── assets/images/
```
Every page loads the same `style.css` and `script.js`; the script reads `data-page` on `<body>` and renders that page.

## How to run
Open `StockPulse-Glass/index.html` in a modern browser. No install or server is needed.

## Research
Stock and analytics dashboards (Zerodha Kite, Groww, TradingView, Google Finance) combine a summary of key numbers, sortable market tables, watchlists, price charts and portfolio views. They are common in fintech apps because users need to scan many numbers quickly and act on them.

Patterns observed: KPI cards, gainers/losers lists, colour-coded change (green/red), time-period chart switchers, search-first navigation, and a bottom command or search bar.

What StockPulse does differently: a soft glassmorphism style with a blue/purple glow, a left sidebar, a market-mood bar per sector group, and a command bar for quick navigation and trades.

## Design and interaction patterns
Pill navigation, glass cards, sortable tables, filter chips, modal order ticket, toast notifications, toggle switches, SVG line/donut/bar charts.

## Data notes
Prices, volumes, market caps and P/E values are demo numbers in `script.js`. Charts are generated from a seeded random walk that always ends at the stock's demo price, so the same price appears on every page. Portfolio maths: invested = qty × average price; value = qty × current price; P/L = value − invested; average price is recalculated on each buy.

## GitHub workflow
1. Fork and clone the repository.
2. `git checkout -b feature/stockpulse`
3. Commit with clear messages, then `git push origin feature/stockpulse`
4. Open a Pull Request, get it reviewed by a teammate, apply changes, merge. Do not commit directly to `main`.

## Team contributions
| Member | Role | Contribution |
|--------|------|--------------|
| G.Saicharan | Member | 4 Projects |
