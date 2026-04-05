import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { KPI_DATA, TREND_DATA, DONUT_DATA, DEPT_PROGRESS } from "../data";

Chart.register(...registerables);

const COLORS = ["#2563EB", "#16A34A", "#D97706", "#7C3AED", "#0891B2", "#DC2626"];

export default function AnalyticsPage({ dept }) {
  const barRef = useRef(null);
  const barChart = useRef(null);
  const radarRef = useRef(null);
  const radarChart = useRef(null);
  const pieRef = useRef(null);
  const pieChart = useRef(null);

  useEffect(() => {
    /* ── Department Comparison Bar Chart ── */
    if (barChart.current) barChart.current.destroy();
    const deptNames = Object.keys(KPI_DATA).filter((k) => k !== "All");
    const adoptionVals = deptNames.map((d) => KPI_DATA[d].adoption);

    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: deptNames,
        datasets: [
          {
            label: "Adoption %",
            data: adoptionVals,
            backgroundColor: COLORS.slice(0, deptNames.length),
            borderRadius: 6,
            barThickness: 36,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: "#1e293b" },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { callback: (v) => v + "%", font: { size: 11 }, color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.12)" },
          },
          x: {
            ticks: { font: { size: 11 }, color: "#94a3b8" },
            grid: { display: false },
          },
        },
      },
    });

    /* ── Radar Chart ── */
    if (radarChart.current) radarChart.current.destroy();
    const d = KPI_DATA[dept] || KPI_DATA["All"];
    radarChart.current = new Chart(radarRef.current, {
      type: "radar",
      data: {
        labels: ["Adoption", "Automation", "E-Learning", "Cost Savings", "Maturity"],
        datasets: [
          {
            label: dept,
            data: [d.adoption, d.automated * 2.3, parseFloat(d.elearning) * 8, parseFloat(d.savings) * 5.5, 60],
            backgroundColor: "rgba(37,99,235,0.15)",
            borderColor: "#2563EB",
            pointBackgroundColor: "#2563EB",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { font: { size: 10 }, backdropColor: "transparent", color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
            pointLabels: { font: { size: 11 }, color: "#475569" },
          },
        },
      },
    });

    /* ── Pie Chart – Category Breakdown ── */
    if (pieChart.current) pieChart.current.destroy();
    const donut = DONUT_DATA[dept] || DONUT_DATA["All"];
    pieChart.current = new Chart(pieRef.current, {
      type: "pie",
      data: {
        labels: donut.labels,
        datasets: [
          {
            data: donut.data,
            backgroundColor: COLORS,
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 11 }, padding: 12, usePointStyle: true, pointStyleWidth: 8 },
          },
          tooltip: { backgroundColor: "#1e293b" },
        },
      },
    });

    return () => {
      barChart.current?.destroy();
      radarChart.current?.destroy();
      pieChart.current?.destroy();
    };
  }, [dept]);

  const kpi = KPI_DATA[dept] || KPI_DATA["All"];

  return (
    <div className="page-content">
      {/* ── Summary Stats ── */}
      <div className="analytics-stats">
        <div className="stat-card">
          <span className="stat-value" style={{ color: "#2563EB" }}>{kpi.adoption}%</span>
          <span className="stat-label">Adoption Rate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: "#7C3AED" }}>{kpi.automated}</span>
          <span className="stat-label">Automated Processes</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: "#059669" }}>{kpi.elearning}</span>
          <span className="stat-label">E-Learning Hours</span>
        </div>
        <div className="stat-card">
          <span className="stat-value" style={{ color: "#D97706" }}>₹{kpi.savings}</span>
          <span className="stat-label">Cost Savings</span>
        </div>
      </div>

      {/* ── Charts Grid ── */}
      <div className="analytics-grid">
        <div className="chart-card analytics-chart-wide">
          <p className="chart-title">Department Adoption Comparison</p>
          <div style={{ position: "relative", height: 260 }}>
            <canvas ref={barRef} />
          </div>
        </div>
        <div className="chart-card">
          <p className="chart-title">Performance Radar — {dept}</p>
          <div style={{ position: "relative", height: 260 }}>
            <canvas ref={radarRef} />
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <p className="chart-title">Initiative Category Breakdown</p>
          <div style={{ position: "relative", height: 280 }}>
            <canvas ref={pieRef} />
          </div>
        </div>
        <div className="chart-card">
          <p className="chart-title">Digitization Leaderboard</p>
          <div className="leaderboard-list">
            {DEPT_PROGRESS.map((d, i) => (
              <div className="leaderboard-row" key={d.name}>
                <span className="leaderboard-rank">#{i + 1}</span>
                <span className="leaderboard-name">{d.name}</span>
                <div className="bar-track" style={{ flex: 1 }}>
                  <div className="bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <span className="leaderboard-pct" style={{ color: d.color }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
