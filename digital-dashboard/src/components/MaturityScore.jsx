import { MATURITY_SCORES } from "../data";

const LEVELS = ["Initial", "Emerging", "Developing", "Defined", "Managed", "Optimizing"];

export default function MaturityScore({ dept, apiData }) {
  const m = apiData?.maturity || MATURITY_SCORES[dept] || MATURITY_SCORES["All"];
  const levelIndex = LEVELS.indexOf(m.label);

  return (
    <div className="maturity-banner">
      <div className="maturity-left">
        <p className="maturity-label">Digital Maturity Score</p>
        <div className="maturity-score-row">
          <span className="maturity-score" style={{ color: m.color }}>{m.score}</span>
          <span className="maturity-out">/5.0</span>
          <span className="maturity-tag" style={{ background: m.color + "18", color: m.color }}>
            {m.label}
          </span>
        </div>
        <p className="maturity-next">Next level: <strong>{m.next}</strong></p>
      </div>
      <div className="maturity-right">
        <div className="level-track">
          {LEVELS.map((lv, i) => (
            <div key={lv} className="level-step">
              <div
                className="level-dot"
                style={{
                  background: i <= levelIndex ? m.color : "#E2E8F0",
                  border: i === levelIndex ? `2px solid ${m.color}` : "2px solid transparent",
                  transform: i === levelIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span className="level-label">{lv}</span>
            </div>
          ))}
        </div>
        <div className="level-bar-track">
          <div
            className="level-bar-fill"
            style={{
              width: `${((levelIndex) / (LEVELS.length - 1)) * 100}%`,
              background: m.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
