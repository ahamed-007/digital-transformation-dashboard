import { KPI_DATA } from "../data";

const CARDS = [
  { key: "adoption",   label: "Digital Adoption Score", suffix: "%", deltaKey: "adoptionDelta",   icon: "▲", desc: "vs last year",        accent: "#2563EB" },
  { key: "automated",  label: "Processes Automated",    suffix: "",  deltaKey: "automatedDelta",  icon: "▲", desc: "new this semester",   accent: "#7C3AED" },
  { key: "elearning",  label: "E-Learning Hours",       suffix: "",  deltaKey: null,              icon: "●", desc: "31% engagement rise", accent: "#059669" },
  { key: "savings",    label: "Cost Savings (₹)",       suffix: "",  deltaKey: null,              icon: "●", desc: "from digitization",   accent: "#D97706" },
];

export default function KPICards({ dept, apiData }) {
  const d = apiData?.kpi || KPI_DATA[dept] || KPI_DATA["All"];

  return (
    <div className="kpi-grid">
      {CARDS.map((card) => (
        <div className="kpi-card" key={card.key}>
          <div className="kpi-accent" style={{ background: card.accent }} />
          <p className="kpi-label">{card.label}</p>
          <p className="kpi-value">
            {d[card.key]}{card.suffix}
          </p>
          <p className="kpi-delta">
            <span className="delta-icon" style={{ color: card.accent }}>{card.icon}</span>
            {card.deltaKey ? `${d[card.deltaKey]}% ` : ""}{card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
