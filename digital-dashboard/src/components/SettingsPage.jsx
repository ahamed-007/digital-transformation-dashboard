import { useState } from "react";

const SETTINGS_SECTIONS = [
  {
    title: "General",
    icon: "⚙️",
    settings: [
      { id: "orgName", label: "Organization Name", type: "text", defaultValue: "DigiCampus University" },
      { id: "academicYear", label: "Active Academic Year", type: "select", options: ["2023-24", "2024-25", "2025-26"], defaultValue: "2025-26" },
      { id: "refreshRate", label: "Data Refresh Interval", type: "select", options: ["Real-time", "Every 5 min", "Every 15 min", "Manual"], defaultValue: "Real-time" },
    ],
  },
  {
    title: "Notifications",
    icon: "🔔",
    settings: [
      { id: "emailAlerts", label: "Email Alerts for Delayed Initiatives", type: "toggle", defaultValue: true },
      { id: "weeklyDigest", label: "Weekly Progress Digest", type: "toggle", defaultValue: true },
      { id: "milestoneAlerts", label: "Milestone Completion Alerts", type: "toggle", defaultValue: false },
    ],
  },
  {
    title: "Display",
    icon: "🎨",
    settings: [
      { id: "chartAnimation", label: "Chart Animations", type: "toggle", defaultValue: true },
      { id: "compactMode", label: "Compact Mode", type: "toggle", defaultValue: false },
      { id: "showTargetLine", label: "Show Target Line on Charts", type: "toggle", defaultValue: true },
    ],
  },
  {
    title: "Data Management",
    icon: "💾",
    settings: [
      { id: "dataSource", label: "Data Source", type: "select", options: ["Mock Data (Local)", "REST API", "Firebase"], defaultValue: "Mock Data (Local)" },
      { id: "cacheEnabled", label: "Enable Data Caching", type: "toggle", defaultValue: true },
    ],
  },
];

export default function SettingsPage() {
  const [values, setValues] = useState(() => {
    const init = {};
    SETTINGS_SECTIONS.forEach((s) =>
      s.settings.forEach((st) => {
        init[st.id] = st.defaultValue;
      })
    );
    return init;
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-content">
      <div className="settings-layout">
        {SETTINGS_SECTIONS.map((section) => (
          <div className="settings-section-card" key={section.title}>
            <div className="settings-section-header">
              <span className="settings-section-icon">{section.icon}</span>
              <h3 className="settings-section-title">{section.title}</h3>
            </div>
            <div className="settings-list">
              {section.settings.map((st) => (
                <div className="settings-row" key={st.id}>
                  <label className="settings-label">{st.label}</label>
                  {st.type === "text" && (
                    <input
                      className="settings-input"
                      type="text"
                      value={values[st.id]}
                      onChange={(e) => handleChange(st.id, e.target.value)}
                    />
                  )}
                  {st.type === "select" && (
                    <select
                      className="settings-select"
                      value={values[st.id]}
                      onChange={(e) => handleChange(st.id, e.target.value)}
                    >
                      {st.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {st.type === "toggle" && (
                    <button
                      className={`settings-toggle ${values[st.id] ? "on" : "off"}`}
                      onClick={() => handleChange(st.id, !values[st.id])}
                    >
                      <span className="toggle-knob" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-actions">
        <button className="btn-primary" onClick={handleSave}>
          {saved ? "✓ Saved" : "Save Settings"}
        </button>
        <button className="btn-secondary" onClick={() => {
          const init = {};
          SETTINGS_SECTIONS.forEach((s) => s.settings.forEach((st) => { init[st.id] = st.defaultValue; }));
          setValues(init);
          setSaved(false);
        }}>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
