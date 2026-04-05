import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { DONUT_DATA } from "../data";

Chart.register(...registerables);

const COLORS = ["#2563EB", "#16A34A", "#D97706", "#7C3AED", "#0891B2"];

export default function DonutChart({ dept, apiData }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  const d = apiData?.donut || DONUT_DATA[dept] || DONUT_DATA["All"];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: d.labels,
        datasets: [
          {
            data: d.data,
            backgroundColor: COLORS,
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e293b",
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [dept, apiData]);

  return (
    <div className="chart-card">
      <p className="chart-title">Initiative categories</p>
      <div style={{ position: "relative", height: 170 }}>
        <canvas ref={ref} />
      </div>
      <div className="donut-legend">
        {d.labels.map((lbl, i) => (
          <div className="donut-leg-item" key={lbl}>
            <span className="donut-leg-dot" style={{ background: COLORS[i] }} />
            <span className="donut-leg-label">{lbl}</span>
            <span className="donut-leg-val">{d.data[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
