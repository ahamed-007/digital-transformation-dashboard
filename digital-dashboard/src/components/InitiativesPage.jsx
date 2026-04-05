import { useState } from "react";
import { INITIATIVES, STATUS_STYLES } from "../data";

const STATUS_FILTERS = ["All", "Complete", "On Track", "In Progress", "Delayed", "Planning"];

export default function InitiativesPage({ dept }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const allItems = INITIATIVES[dept] || INITIATIVES["All"];
  const filtered = statusFilter === "All"
    ? allItems
    : allItems.filter((i) => i.status === statusFilter);

  const counts = {};
  STATUS_FILTERS.forEach((s) => {
    counts[s] = s === "All" ? allItems.length : allItems.filter((i) => i.status === s).length;
  });

  return (
    <div className="page-content">
      {/* ── Status Summary Cards ── */}
      <div className="status-summary">
        {STATUS_FILTERS.filter((s) => s !== "All").map((s) => {
          const st = STATUS_STYLES[s];
          return (
            <div
              className={`status-summary-card ${statusFilter === s ? "active" : ""}`}
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "All" : s)}
              style={{ borderColor: statusFilter === s ? st.color : "var(--border)" }}
            >
              <span className="status-summary-count" style={{ color: st.color }}>{counts[s]}</span>
              <span className="status-summary-label">{s}</span>
            </div>
          );
        })}
      </div>

      {/* ── Filter Bar ── */}
      <div className="initiatives-toolbar">
        <p className="initiatives-showing">
          Showing <strong>{filtered.length}</strong> of {allItems.length} initiatives
          {statusFilter !== "All" && (
            <span className="filter-tag" onClick={() => setStatusFilter("All")}>
              {statusFilter} ✕
            </span>
          )}
        </p>
      </div>

      {/* ── Initiatives Table ── */}
      <div className="bottom-card initiatives-table-card">
        <table className="initiatives-table">
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Department</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const st = STATUS_STYLES[item.status] || {};
              return (
                <tr key={item.name}>
                  <td className="init-name-cell">{item.name}</td>
                  <td>
                    <span className="dept-tag">{item.dept}</span>
                  </td>
                  <td>
                    <div className="init-progress-cell">
                      <div className="init-progress-track">
                        <div
                          className="init-progress-fill"
                          style={{ width: `${item.progress}%`, background: st.color }}
                        />
                      </div>
                      <span className="init-progress-pct">{item.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-pill" style={{ background: st.bg, color: st.color }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">No initiatives match the selected filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
