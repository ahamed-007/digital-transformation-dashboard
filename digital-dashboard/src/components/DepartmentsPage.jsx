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
  const depts = [...DEPT_PROGRESS].sort((a, b) => b.pct - a.pct);
  const showAll = dept === "All";
  const displayed = showAll ? depts : depts.filter((d) => d.name === dept);

  const getRankEmoji = (rank) => {
    if (rank === 0) return "🥇";
    if (rank === 1) return "🥈";
    if (rank === 2) return "🥉";
    return null;
  };

  return (
    <div className="page-content">
      {/* ── Leaderboard Header ── */}
      {showAll && (
        <div className="leaderboard-banner">
          <div className="leaderboard-info">
            <span className="trophy-icon">🏆</span>
            <div>
              <h2 className="leaderboard-title">Digital Transformation Leaderboard</h2>
              <p className="leaderboard-subtitle">Top Performer: <strong>{depts[0].name}</strong> with {depts[0].pct}% Digital Adoption</p>
            </div>
          </div>
          <div className="leaderboard-stats">
            <div className="l-stat">
              <span className="l-val">{depts.filter(d => d.pct >= 80).length}</span>
              <span className="l-label">Excellent</span>
            </div>
            <div className="l-stat">
              <span className="l-val">{depts.filter(d => d.pct < 45).length}</span>
              <span className="l-label">Need Focus</span>
            </div>
          </div>
        </div>
      )}
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
                  <div className="name-rank-row">
                    {showAll && <span className="dept-rank-badge">#{depts.indexOf(d) + 1}</span>}
                    <h3 className="dept-card-name">{d.name}</h3>
                    {showAll && <span className="rank-emoji">{getRankEmoji(depts.indexOf(d))}</span>}
                  </div>
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
              {depts.map((d, index) => {
                const kpi = KPI_DATA[d.name] || {};
                const maturity = MATURITY_SCORES[d.name] || {};
                const color = getStatusColor(d.pct);
                return (
                  <tr key={d.name} className={`dept-compare-row ${index < 3 ? "rank-row" : ""}`} onClick={() => setActiveDept(d.name)}>
                    <td>
                      <div className="rank-cell">
                        <span className="rank-num">#{index + 1}</span>
                        <strong>{d.name}</strong>
                        <span className="table-rank-emoji">{getRankEmoji(index)}</span>
                      </div>
                    </td>
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
