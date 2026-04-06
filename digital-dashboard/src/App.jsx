import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KPICards from "./components/KPICards";
import TrendChart from "./components/TrendChart";
import DonutChart from "./components/DonutChart";
import DeptProgress from "./components/DeptProgress";
import InitiativeTracker from "./components/InitiativeTracker";
import MaturityScore from "./components/MaturityScore";
import AnalyticsPage from "./components/AnalyticsPage";
import InitiativesPage from "./components/InitiativesPage";
import DepartmentsPage from "./components/DepartmentsPage";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";
import LoginPage from "./components/LoginPage";
import { fetchDashboard } from "./api";
import "./index.css";

// Fallback data imports (used if API is unreachable)
import * as staticData from "./data";

const DEPARTMENTS = ["All", "Admin", "Academics", "Finance", "HR", "Library", "Labs"];

export default function App() {
  const [activeDept, setActiveDept] = useState("All");
  const [activeYear, setActiveYear] = useState("2025-26");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("digicampus_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("digicampus_theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("digicampus_theme", newTheme);
  };

  // API state
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("digicampus_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("digicampus_user");
    setActivePage("dashboard");
  };

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);

    fetchDashboard(activeDept)
      .then((data) => {
        if (!cancelled) {
          setApiData(data);
          setApiConnected(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setApiData({
            kpi: staticData.KPI_DATA[activeDept] || staticData.KPI_DATA["All"],
            trends: {
              labels: staticData.TREND_DATA.labels,
              ...(staticData.TREND_DATA[activeDept] || staticData.TREND_DATA["All"]),
            },
            donut: staticData.DONUT_DATA[activeDept] || staticData.DONUT_DATA["All"],
            departments: staticData.DEPT_PROGRESS,
            initiatives: staticData.INITIATIVES[activeDept] || staticData.INITIATIVES["All"],
            maturity: staticData.MATURITY_SCORES[activeDept] || staticData.MATURITY_SCORES["All"],
            statusStyles: staticData.STATUS_STYLES,
          });
          setApiConnected(false);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [activeDept, user]);

  // ── Show login page if not authenticated ──
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">Loading dashboard data…</p>
        </div>
      );
    }

    switch (activePage) {
      case "analytics":
        return <AnalyticsPage dept={activeDept} apiData={apiData} />;
      case "initiatives":
        return <InitiativesPage dept={activeDept} apiData={apiData} />;
      case "departments":
        return <DepartmentsPage dept={activeDept} setActiveDept={setActiveDept} />;
      case "reports":
        return <ReportsPage dept={activeDept} year={activeYear} apiData={apiData} />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <>
            <MaturityScore dept={activeDept} apiData={apiData} />
            <KPICards dept={activeDept} apiData={apiData} />
            <div className="charts-row">
              <TrendChart dept={activeDept} year={activeYear} apiData={apiData} />
              <DonutChart dept={activeDept} apiData={apiData} />
            </div>
            <div className="bottom-row">
              <DeptProgress activeDept={activeDept} apiData={apiData} />
              <InitiativeTracker dept={activeDept} apiData={apiData} />
            </div>
          </>
        );
    }
  };

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`} data-theme={theme}>
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activePage={activePage}
        onNavigate={setActivePage}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Header
          activeDept={activeDept}
          setActiveDept={setActiveDept}
          activeYear={activeYear}
          setActiveYear={setActiveYear}
          departments={DEPARTMENTS}
          activePage={activePage}
          apiConnected={apiConnected}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className="dashboard-body">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
