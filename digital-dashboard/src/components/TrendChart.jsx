import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { TREND_DATA } from "../data";

Chart.register(...registerables);

export default function TrendChart({ dept, apiData }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const trendLabels = apiData?.trends?.labels || TREND_DATA.labels;
    const trendActual = apiData?.trends?.actual || (TREND_DATA[dept] || TREND_DATA["All"]).actual;
    const trendTarget = apiData?.trends?.target || (TREND_DATA[dept] || TREND_DATA["All"]).target;
    const trendForecast = apiData?.trends?.forecast || (TREND_DATA[dept] || TREND_DATA["All"]).forecast;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: trendLabels,
        datasets: [
          {
            label: "Actual Adoption %",
            data: trendActual,
            borderColor: "#2563EB",
            backgroundColor: "rgba(37,99,235,0.08)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#2563EB",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
          {
            label: "Target %",
            data: trendTarget,
            borderColor: "#D97706",
            borderDash: [6, 4],
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "Forecast %",
            data: trendForecast,
            borderColor: "#7C3AED",
            borderDash: [4, 4],
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#7C3AED",
            pointBorderColor: "#fff",
            pointBorderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e293b",
            titleFont: { size: 12 },
            bodyFont: { size: 12 },
            padding: 10,
            callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` },
          },
        },
        scales: {
          y: {
            min: 10,
            max: 100,
            ticks: {
              font: { size: 11 },
              color: "#94a3b8",
              callback: (v) => v + "%",
            },
            grid: { color: "rgba(148,163,184,0.12)" },
          },
          x: {
            ticks: { font: { size: 11 }, color: "#94a3b8" },
            grid: { display: false },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [dept, apiData]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <p className="chart-title">Monthly adoption trend</p>
        <div className="chart-legend">
          <span className="leg"><span className="leg-dot" style={{ background: "#2563EB" }} />Actual</span>
          <span className="leg"><span className="leg-dot leg-dashed" style={{ borderColor: "#D97706" }} />Target</span>
          <span className="leg"><span className="leg-dot leg-dashed" style={{ borderColor: "#7C3AED" }} />Forecast</span>
        </div>
      </div>
      <div style={{ position: "relative", height: 210 }}>
        <canvas ref={ref} />
      </div>
    </div>
  );
}
