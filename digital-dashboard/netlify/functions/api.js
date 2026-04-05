// ── Netlify Serverless Function: API ────────────────────────
// Handles all /api/* routes as a single serverless function

import {
  KPI_DATA,
  TREND_DATA,
  DONUT_DATA,
  DEPT_PROGRESS,
  INITIATIVES,
  MATURITY_SCORES,
  STATUS_STYLES,
} from "./data.js";

// ── Demo Users ──────────────────────────────────────────────
const USERS = [
  { email: "admin@digicampus.edu",     password: "admin123",     name: "Admin",        role: "Administrator",  avatar: "AD" },
  { email: "principal@digicampus.edu", password: "principal123", name: "Dr. Sharma",   role: "Principal",      avatar: "DS" },
  { email: "hod@digicampus.edu",       password: "hod123",       name: "Prof. Mehta",  role: "HOD - Academics",avatar: "PM" },
];

// ── CORS headers ────────────────────────────────────────────
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

// ── Router ──────────────────────────────────────────────────
export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Extract the path after /.netlify/functions/api
  const path = event.path.replace("/.netlify/functions/api", "") || "/";
  const segments = path.split("/").filter(Boolean);
  const method = event.httpMethod;

  try {
    // ── Health check ──
    if (segments[0] === "health") {
      return respond(200, { status: "ok", timestamp: new Date().toISOString() });
    }

    // ── Auth: Login ──
    if (segments[0] === "auth" && segments[1] === "login" && method === "POST") {
      const { email, password } = JSON.parse(event.body || "{}");

      if (!email || !password) {
        return respond(400, { success: false, message: "Email and password are required." });
      }

      const user = USERS.find((u) => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...safeUser } = user;
        return respond(200, { success: true, user: safeUser });
      }
      return respond(401, { success: false, message: "Invalid email or password." });
    }

    // ── KPI Data ──
    if (segments[0] === "kpi") {
      const dept = decodeURIComponent(segments[1] || "All");
      return respond(200, { dept, data: KPI_DATA[dept] || KPI_DATA["All"] });
    }

    // ── Trend Data ──
    if (segments[0] === "trends") {
      const dept = decodeURIComponent(segments[1] || "All");
      const series = TREND_DATA[dept] || TREND_DATA["All"];
      return respond(200, { dept, labels: TREND_DATA.labels, ...series });
    }

    // ── Donut Data ──
    if (segments[0] === "donut") {
      const dept = decodeURIComponent(segments[1] || "All");
      const data = DONUT_DATA[dept] || DONUT_DATA["All"];
      return respond(200, { dept, ...data });
    }

    // ── Departments ──
    if (segments[0] === "departments") {
      return respond(200, DEPT_PROGRESS);
    }

    // ── Initiatives ──
    if (segments[0] === "initiatives") {
      const dept = decodeURIComponent(segments[1] || "All");
      const list = INITIATIVES[dept] || INITIATIVES["All"];
      return respond(200, { dept, data: list, statusStyles: STATUS_STYLES });
    }

    // ── Maturity Score ──
    if (segments[0] === "maturity") {
      const dept = decodeURIComponent(segments[1] || "All");
      const data = MATURITY_SCORES[dept] || MATURITY_SCORES["All"];
      return respond(200, { dept, ...data });
    }

    // ── Combined Dashboard ──
    if (segments[0] === "dashboard") {
      const dept = decodeURIComponent(segments[1] || "All");
      return respond(200, {
        dept,
        kpi: KPI_DATA[dept] || KPI_DATA["All"],
        trends: {
          labels: TREND_DATA.labels,
          ...(TREND_DATA[dept] || TREND_DATA["All"]),
        },
        donut: DONUT_DATA[dept] || DONUT_DATA["All"],
        departments: DEPT_PROGRESS,
        initiatives: INITIATIVES[dept] || INITIATIVES["All"],
        maturity: MATURITY_SCORES[dept] || MATURITY_SCORES["All"],
        statusStyles: STATUS_STYLES,
      });
    }

    // ── 404 ──
    return respond(404, { error: "Not found" });

  } catch (err) {
    return respond(500, { error: "Internal server error", message: err.message });
  }
}

function respond(statusCode, body) {
  return { statusCode, headers, body: JSON.stringify(body) };
}
