import { KPI_DATA, DEPT_PROGRESS, MATURITY_SCORES, INITIATIVES } from "../data";

const REPORT_TYPES = [
  { id: "overview", icon: "📊", title: "Transformation Overview", desc: "Complete digital transformation summary across all departments" },
  { id: "dept", icon: "🏢", title: "Department Performance", desc: "Individual department KPI breakdown and progress analysis" },
  { id: "initiatives", icon: "🚀", title: "Initiative Status Report", desc: "All active initiatives with status, progress, and timelines" },
  { id: "maturity", icon: "📈", title: "Maturity Assessment", desc: "Digital maturity scores and level progression for each department" },
];

export default function ReportsPage({ dept, year }) {
  const kpi = KPI_DATA[dept] || KPI_DATA["All"];
  const maturity = MATURITY_SCORES[dept] || MATURITY_SCORES["All"];
  const initiatives = INITIATIVES[dept] || INITIATIVES["All"];
  const completedCount = initiatives.filter((i) => i.status === "Complete").length;
  const delayedCount = initiatives.filter((i) => i.status === "Delayed").length;
  const avgProgress = Math.round(initiatives.reduce((s, i) => s + i.progress, 0) / initiatives.length);

  return (
    <div className="page-content">
      {/* ── Report Type Cards ── */}
      <div className="report-types-grid">
        {REPORT_TYPES.map((r) => (
          <div className="report-type-card" key={r.id}>
            <span className="report-icon">{r.icon}</span>
            <div className="report-type-info">
              <h3 className="report-type-title">{r.title}</h3>
              <p className="report-type-desc">{r.desc}</p>
            </div>
            <button className="report-download-btn">View Report</button>
          </div>
        ))}
      </div>

      {/* ── Quick Stats Summary ── */}
      <div className="bottom-card">
        <p className="chart-title">Quick Summary — {dept} ({year})</p>
        <div className="report-summary-grid">
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: "#2563EB" }}>{kpi.adoption}%</span>
            <span className="report-summary-label">Digital Adoption</span>
          </div>
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: "#16A34A" }}>{completedCount}</span>
            <span className="report-summary-label">Completed Initiatives</span>
          </div>
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: "#DC2626" }}>{delayedCount}</span>
            <span className="report-summary-label">Delayed Initiatives</span>
          </div>
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: "#7C3AED" }}>{avgProgress}%</span>
            <span className="report-summary-label">Avg. Progress</span>
          </div>
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: maturity.color }}>{maturity.score}</span>
            <span className="report-summary-label">Maturity Score</span>
          </div>
          <div className="report-summary-item">
            <span className="report-summary-val" style={{ color: "#D97706" }}>₹{kpi.savings}</span>
            <span className="report-summary-label">Cost Savings</span>
          </div>
        </div>
      </div>

      {/* ── Department Rankings ── */}
      <div className="bottom-card">
        <p className="chart-title">Department Rankings</p>
        <table className="dept-compare-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Department</th>
              <th>Digitization</th>
              <th>Maturity</th>
              <th>Initiatives</th>
            </tr>
          </thead>
          <tbody>
            {DEPT_PROGRESS.map((d, i) => {
              const m = MATURITY_SCORES[d.name] || {};
              const inits = INITIATIVES[d.name] || [];
              return (
                <tr key={d.name}>
                  <td><span className="leaderboard-rank">#{i + 1}</span></td>
                  <td><strong>{d.name}</strong></td>
                  <td>
                    <div className="init-progress-cell">
                      <div className="init-progress-track">
                        <div className="init-progress-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                      </div>
                      <span className="init-progress-pct">{d.pct}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="dept-maturity-badge" style={{ background: m.color + "18", color: m.color }}>
                      {m.score} — {m.label}
                    </span>
                  </td>
                  <td>{inits.length} active</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
