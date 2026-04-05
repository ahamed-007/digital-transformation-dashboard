const NAV = [
  { icon: "⊞", label: "Dashboard",   key: "dashboard"   },
  { icon: "◈", label: "Analytics",   key: "analytics"   },
  { icon: "◉", label: "Initiatives", key: "initiatives" },
  { icon: "◫", label: "Departments", key: "departments" },
  { icon: "◎", label: "Reports",     key: "reports"     },
  { icon: "◌", label: "Settings",    key: "settings"    },
];

export default function Sidebar({ open, onToggle, activePage, onNavigate, user, onLogout }) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">DT</div>
        {open && <span className="logo-text">DigiCampus</span>}
      </div>

      <button className="sidebar-toggle" onClick={onToggle} title="Toggle sidebar">
        {open ? "←" : "→"}
      </button>

      <nav className="sidebar-nav">
        {NAV.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${activePage === item.key ? "active" : ""}`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="nav-icon">{item.icon}</span>
            {open && <span className="nav-label">{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">{user?.avatar || "AD"}</div>
        {open && (
          <div className="user-info">
            <p className="user-name">{user?.name || "Admin"}</p>
            <p className="user-role">{user?.role || "Dashboard Owner"}</p>
          </div>
        )}
        {open && (
          <button className="logout-btn" onClick={onLogout} title="Sign out">
            ↪
          </button>
        )}
      </div>
    </aside>
  );
}
