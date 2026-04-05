# Digital Transformation Dashboard

A full-featured React + Chart.js dashboard for monitoring digital transformation
KPIs across college departments.

## Features
- Department & year filters (all data updates live)
- Digital Maturity Score with 6-level progress tracker
- KPI summary cards (Adoption %, Processes Automated, E-Learning Hours, Cost Savings)
- Monthly adoption trend line chart (Actual vs Target)
- Initiative categories donut chart
- Department digitization progress bars
- Active initiatives tracker with status pills and mini progress bars
- Collapsible sidebar
- Fully responsive layout

## Tech Stack
- React 18
- Chart.js 4
- Vite 5
- DM Sans + DM Mono fonts (Google Fonts)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 3. Build for production
```bash
npm run build
```

## Project Structure
```
src/
├── App.jsx                  # Root layout & state
├── data.js                  # All mock KPI data
├── index.css                # Global styles
├── index.jsx                # React entry point
└── components/
    ├── Sidebar.jsx          # Collapsible nav sidebar
    ├── Header.jsx           # Dept & year filters
    ├── MaturityScore.jsx    # Digital maturity level banner
    ├── KPICards.jsx         # 4 summary metric cards
    ├── TrendChart.jsx       # Line chart (Chart.js)
    ├── DonutChart.jsx       # Donut chart (Chart.js)
    ├── DeptProgress.jsx     # Horizontal progress bars
    └── InitiativeTracker.jsx# Active initiatives list
```

## Customizing Data
All data is in `src/data.js`. Update the values to reflect your real college data:
- `KPI_DATA` — KPI numbers per department
- `TREND_DATA` — Monthly adoption trend per department
- `DONUT_DATA` — Initiative category breakdown
- `DEPT_PROGRESS` — Department digitization %
- `INITIATIVES` — Active initiative list with status
- `MATURITY_SCORES` — Maturity level per department
