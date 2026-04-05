import { memo } from "react";
import { DEPT_PROGRESS } from "../data";

/** Fallback colour based on percentage thresholds */
function getColor(pct) {
  if (pct >= 80) return "#2563EB"; // Blue — Excellent
  if (pct >= 60) return "#16A34A"; // Green — Good
  if (pct >= 45) return "#D97706"; // Amber — Fair
  return "#DC2626";                // Red  — Needs Attention
}

function DeptProgress({ activeDept, apiData }) {
  // Safely resolve the departments array — guard against non-array API responses
  const allDepts = Array.isArray(apiData?.departments)
    ? apiData.departments
    : DEPT_PROGRESS;

  // Filter to single department when a specific one is selected
  const rows = activeDept === "All"
    ? allDepts
    : allDepts.filter((d) => d.name === activeDept);

  return (
    <div className="bottom-card">
      <p className="chart-title">Department digitization progress</p>
      <div className="dept-list">
        {rows.map((dept, i) => {
          const pct = dept.pct ?? 0;                   // Guard against missing pct
          const color = dept.color || getColor(pct);   // Use data colour first, fallback to computed

          return (
            <div className="dept-row" key={`${dept.name}-${i}`}>
              <span className="dept-name">{dept.name}</span>
              <div
                className="bar-track"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${dept.name} digitization progress`}
              >
                <div
                  className="bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: color,
                  }}
                />
              </div>
              <span className="dept-pct" style={{ color }}>{pct}%</span>
            </div>
          );
        })}
        {rows.length === 0 && (
          <p className="empty-state">No data for selected filter.</p>
        )}
      </div>
    </div>
  );
}

export default memo(DeptProgress);
