import { KPI_DATA, DEPT_PROGRESS, MATURITY_SCORES, INITIATIVES } from "../data";

function getStatusColor(pct) {
  if (pct >= 80) return "#2563EB";
  if (pct >= 60) return "#16A34A";
  if (pct >= 45) return "#D97706";
  return "#DC2626";
}

function getStatusLabel(pct) {
  if (pct >= 80) return "Excellent";
  if (pct >= 60) return "Good";
  if (pct >= 45) return "Fair";
  return "Needs Attention";
}

export default function DepartmentsPage({ dept, setActiveDept }) {
  const depts = DEPT_PROGRESS;
  const showAll = dept === "All";
  const displayed = showAll ? depts : depts.filter((d) => d.name === dept);

  return (
    <div className="page-content">
      {/* ── Department Cards Grid ── */}
      <div className="dept-cards-grid">
        {displayed.map((d) => {
          const kpi = KPI_DATA[d.name] || {};
          const maturity = MATURITY_SCORES[d.name] || {};
          const initiatives = INITIATIVES[d.name] || [];
          const color = getStatusColor(d.pct);
          const statusLabel = getStatusLabel(d.pct);

          return (
            <div className="dept-detail-card" key={d.name} onClick={() => setActiveDept(d.name)}>
              {/* Card Header */}
              <div className="dept-card-header" style={{ borderLeftColor: color }}>
                <div>
                  <h3 className="dept-card-name">{d.name}</h3>
                  <span className="dept-card-status" style={{ color }}>{statusLabel}</span>
                </div>
                <div className="dept-card-score" style={{ color }}>
                  {d.pct}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="dept-card-progress">
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${d.pct}%`, background: color }} />
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="dept-card-metrics">
                <div className="dept-metric">
                  <span className="dept-metric-val">{kpi.adoption}%</span>
                  <span className="dept-metric-label">Adoption</span>
                </div>
                <div className="dept-metric">
                  <span className="dept-metric-val">{kpi.automated}</span>
                  <span className="dept-metric-label">Automated</span>
                </div>
                <div className="dept-metric">
                  <span className="dept-metric-val">{kpi.elearning}</span>
                  <span className="dept-metric-label">E-Learning</span>
                </div>
                <div className="dept-metric">
                  <span className="dept-metric-val">₹{kpi.savings}</span>
                  <span className="dept-metric-label">Savings</span>
                </div>
              </div>

              {/* Maturity & Initiatives */}
              <div className="dept-card-footer">
                <span className="dept-maturity-badge" style={{ background: maturity.color + "18", color: maturity.color }}>
                  ★ {maturity.score} — {maturity.label}
                </span>
                <span className="dept-initiatives-count">{initiatives.length} initiatives</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Comparison Table ── */}
      {showAll && (
        <div className="bottom-card">
          <p className="chart-title">Department Comparison</p>
          <table className="dept-compare-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Digitization</th>
                <th>Adoption</th>
                <th>Processes</th>
                <th>Maturity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {depts.map((d) => {
                const kpi = KPI_DATA[d.name] || {};
                const maturity = MATURITY_SCORES[d.name] || {};
                const color = getStatusColor(d.pct);
                return (
                  <tr key={d.name} className="dept-compare-row" onClick={() => setActiveDept(d.name)}>
                    <td><strong>{d.name}</strong></td>
                    <td>
                      <div className="init-progress-cell">
                        <div className="init-progress-track">
                          <div className="init-progress-fill" style={{ width: `${d.pct}%`, background: color }} />
                        </div>
                        <span className="init-progress-pct">{d.pct}%</span>
                      </div>
                    </td>
                    <td>{kpi.adoption}%</td>
                    <td>{kpi.automated}</td>
                    <td>
                      <span className="dept-maturity-badge" style={{ background: maturity.color + "18", color: maturity.color }}>
                        {maturity.score}
                      </span>
                    </td>
                    <td><span style={{ color, fontWeight: 600, fontSize: "12px" }}>{getStatusLabel(d.pct)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
