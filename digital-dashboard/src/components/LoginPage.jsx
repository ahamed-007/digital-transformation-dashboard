import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
      </div>

      <div className="login-container">
        {/* Left — Branding Panel */}
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">
              <div className="brand-logo-icon">DT</div>
              <span className="brand-logo-text">DigiCampus</span>
            </div>
            <h1 className="brand-title">Smart Campus<br />KPI Monitoring</h1>
            <p className="brand-desc">
              Track digital transformation progress across all departments with real-time analytics, initiative tracking, and maturity assessments.
            </p>
            <div className="brand-stats">
              <div className="brand-stat">
                <span className="brand-stat-val">6</span>
                <span className="brand-stat-label">Departments</span>
              </div>
              <div className="brand-stat">
                <span className="brand-stat-val">78%</span>
                <span className="brand-stat-label">Adoption</span>
              </div>
              <div className="brand-stat">
                <span className="brand-stat-val">8</span>
                <span className="brand-stat-label">Initiatives</span>
              </div>
            </div>
          </div>
          <p className="brand-footer">© 2026 DigiCampus · Academic Year 2025–26</p>
        </div>

        {/* Right — Login Form */}
        <div className="login-form-panel">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-header">
              <h2 className="login-title">Welcome back</h2>
              <p className="login-subtitle">Sign in to access the dashboard</p>
            </div>

            {error && (
              <div className="login-error">
                <span className="login-error-icon">⚠</span>
                {error}
              </div>
            )}

            <div className="login-field">
              <label className="login-label" htmlFor="login-email">Email address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">✉</span>
                <input
                  id="login-email"
                  className="login-input"
                  type="email"
                  placeholder="admin@digicampus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="login-password">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  id="login-password"
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" className="login-checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="login-forgot">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="login-btn-loading">
                  <span className="login-spinner" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>


          </form>
        </div>
      </div>
    </div>
  );
}
