// ── API Client ──────────────────────────────────────────────
// In production (Render), the Express server serves both the API and the
// static frontend, so a relative URL works. In dev, Vite proxies /api → localhost:5000.
const BASE_URL = "/api";

async function fetchJSON(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchDashboard(dept = "All") {
  return fetchJSON(`/dashboard/${encodeURIComponent(dept)}`);
}

export async function fetchKPI(dept = "All") {
  return fetchJSON(`/kpi/${encodeURIComponent(dept)}`);
}

export async function fetchTrends(dept = "All") {
  return fetchJSON(`/trends/${encodeURIComponent(dept)}`);
}

export async function fetchDonut(dept = "All") {
  return fetchJSON(`/donut/${encodeURIComponent(dept)}`);
}

export async function fetchDepartments() {
  return fetchJSON("/departments");
}

export async function fetchInitiatives(dept = "All") {
  return fetchJSON(`/initiatives/${encodeURIComponent(dept)}`);
}

export async function fetchMaturity(dept = "All") {
  return fetchJSON(`/maturity/${encodeURIComponent(dept)}`);
}

export async function fetchHealth() {
  return fetchJSON("/health");
}
