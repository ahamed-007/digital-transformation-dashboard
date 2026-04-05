import { INITIATIVES, STATUS_STYLES } from "../data";

export default function InitiativeTracker({ dept, apiData }) {
  const list = apiData?.initiatives || INITIATIVES[dept] || INITIATIVES["All"];
  const styles = apiData?.statusStyles || STATUS_STYLES;

  return (
    <div className="bottom-card">
      <p className="chart-title">Active initiatives</p>
      <div className="initiative-list">
        {list.map((item) => {
          const style = styles[item.status] || {};
          return (
            <div className="initiative-row" key={item.name}>
              <div className="initiative-meta">
                <span className="initiative-name">{item.name}</span>
                <span className="initiative-dept">{item.dept}</span>
              </div>
              <div className="initiative-right">
                <div className="mini-bar-track">
                  <div
                    className="mini-bar-fill"
                    style={{ width: `${item.progress}%`, background: style.color }}
                  />
                </div>
                <span className="initiative-pct">{item.progress}%</span>
                <span
                  className="status-pill"
                  style={{ background: style.bg, color: style.color }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
