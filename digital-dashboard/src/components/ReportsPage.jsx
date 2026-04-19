import { useState } from "react";
import { KPI_DATA, DEPT_PROGRESS, MATURITY_SCORES, INITIATIVES, TREND_DATA, DONUT_DATA } from "../data";

const REPORT_TYPES = [
  { id: "overview", icon: "📊", title: "Transformation Overview", desc: "Complete digital transformation summary across all departments" },
  { id: "dept", icon: "🏢", title: "Department Performance", desc: "Individual department KPI breakdown and progress analysis" },
  { id: "initiatives", icon: "🚀", title: "Initiative Status Report", desc: "All active initiatives with status, progress, and timelines" },
  { id: "maturity", icon: "📈", title: "Maturity Assessment", desc: "Digital maturity scores and level progression for each department" },
];

export default function ReportsPage({ dept, year }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const kpi = KPI_DATA[dept] || KPI_DATA["All"];
  const maturity = MATURITY_SCORES[dept] || MATURITY_SCORES["All"];
  const initiatives = INITIATIVES[dept] || INITIATIVES["All"];
  const completedCount = initiatives.filter((i) => i.status === "Complete").length;
  const delayedCount = initiatives.filter((i) => i.status === "Delayed").length;
  const avgProgress = initiatives.length > 0 ? Math.round(initiatives.reduce((s, i) => s + i.progress, 0) / initiatives.length) : 0;

  const handleClose = () => setSelectedReport(null);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate complex PDF compilation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report "${selectedReport.title}" generated successfully. Check your browser's downloads.`);
    }, 2500);
  };

  const renderReportContent = () => {
    if (!selectedReport) return null;

    switch (selectedReport.id) {
      case "overview":
        return (
          <div className="report-detail">
            <h4>Institutional Transformation Summary</h4>
            <div className="report-text">
              <p>The {dept} department (Fiscal Year {year}) exhibits a digital adoption rate of <strong>{kpi.adoption}%</strong>, exceeding last year's performance by <strong>{kpi.adoptionDelta}%</strong>.</p>
              <p>Currently, the institution has successfully automated <strong>{kpi.automated}</strong> core processes, resulting in an estimated cost saving of <strong>₹{kpi.savings}</strong>.</p>
              <ul>
                <li>Digital Maturity Level: {maturity.label} ({maturity.score}/5.0)</li>
                <li>Active Initiatives: {initiatives.length}</li>
                <li>E-Learning Engagement: {kpi.elearning} hours</li>
              </ul>
            </div>
          </div>
        );
      case "dept":
        return (
          <div className="report-detail">
            <h4>Department Performance Rankings</h4>
            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Adoption</th>
                    <th>Automated</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPARTMENTS_LIST.map(d => {
                    const dk = KPI_DATA[d] || {};
                    return (
                      <tr key={d}>
                        <td>{d}</td>
                        <td>{dk.adoption}%</td>
                        <td>{dk.automated}</td>
                        <td><span className="status-badge live">Live</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "initiatives":
        return (
          <div className="report-detail">
            <h4>Initiative Execution Roadmap</h4>
            <div className="report-list">
              {initiatives.map((i, index) => (
                <div key={index} className="report-list-item">
                  <div className="report-list-header">
                    <strong>{i.name}</strong>
                    <span className={`badge ${i.status.toLowerCase().replace(" ", "-")}`}>{i.status}</span>
                  </div>
                  <div className="report-list-bar">
                    <div className="bar-fill" style={{ width: `${i.progress}%` }}></div>
                  </div>
                  <p>Progress: {i.progress}% | Owner: {i.dept}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "maturity":
        return (
          <div className="report-detail">
            <h4>Maturity Assessment Findings</h4>
            <p className="report-intro">Target Milestone: <strong>{maturity.next}</strong></p>
            <div className="maturity-grid">
              {Object.keys(MATURITY_SCORES).filter(k => k !== "All").map(k => {
                const m = MATURITY_SCORES[k];
                return (
                  <div key={k} className="maturity-mini-card">
                    <span className="mini-label">{k}</span>
                    <span className="mini-score" style={{ color: m.color }}>{m.score}</span>
                    <span className="mini-text">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return <p>Report data is being generated...</p>;
    }
  };

  const DEPARTMENTS_LIST = ["Admin", "Academics", "Finance", "HR", "Library", "Labs"];

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
            <button 
              className="report-download-btn"
              onClick={() => setSelectedReport(r)}
            >
              View Report
            </button>
          </div>
        ))}
      </div>

      {/* ── Report Modal ── */}
      {selectedReport && (
        <div className="report-modal-overlay" onClick={handleClose}>
          <div className="report-modal-content" onClick={e => e.stopPropagation()}>
            <div className="report-modal-header">
              <div className="report-header-left">
                <span className="header-icon">{selectedReport.icon}</span>
                <div>
                  <h3>{selectedReport.title}</h3>
                  <p>Generated for {dept} ({year})</p>
                </div>
              </div>
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>
            <div className="report-modal-body">
              {renderReportContent()}
            </div>
            <div className="report-modal-footer">
              <button 
                className={`download-btn ${isGenerating ? "active" : ""}`}
                onClick={handleDownload}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Download PDF"}
              </button>
              <button 
                className="print-btn"
                onClick={handlePrint}
                disabled={isPrinting}
              >
                {isPrinting ? "Printing..." : "Print Report"}
              </button>
              <button className="close-btn-alt" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}

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
