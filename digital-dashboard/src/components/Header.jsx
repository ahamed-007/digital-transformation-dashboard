const PAGE_INFO = {
  dashboard:   { title: "Digital Transformation Dashboard", subtitle: "Smart Campus · Real-time KPI Monitoring" },
  analytics:   { title: "Analytics",   subtitle: "In-depth data analysis & department comparisons" },
  initiatives: { title: "Initiatives", subtitle: "Track and manage all digital transformation projects" },
  departments: { title: "Departments", subtitle: "Department-level performance & KPI breakdown" },
  reports:     { title: "Reports",     subtitle: "Generate & view transformation reports" },
  settings:    { title: "Settings",    subtitle: "Configure dashboard preferences" },
};

export default function Header({ activeDept, setActiveDept, activeYear, setActiveYear, departments, activePage, apiConnected, theme, toggleTheme }) {
  const years = ["2023-24", "2024-25", "2025-26"];
  const info = PAGE_INFO[activePage] || PAGE_INFO.dashboard;

  return (
    <header className="dash-header">
      <div className="header-left">
        <h1 className="page-title">{info.title}</h1>
        <p className="page-subtitle">{info.subtitle}</p>
      </div>
      <div className="header-right">
        <div className="filter-group">
          <label className="filter-label">Department</label>
          <select
            className="filter-select"
            value={activeDept}
            onChange={(e) => setActiveDept(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Year</label>
          <select
            className="filter-select"
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className={`live-badge ${apiConnected ? "" : "live-badge-offline"}`}>
          <span className="live-dot" />
          {apiConnected ? "API Live" : "Offline"}
        </div>
      </div>
    </header>
  );
}
