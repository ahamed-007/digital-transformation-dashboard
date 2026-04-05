import { Router } from "express";
import {
  KPI_DATA,
  TREND_DATA,
  DONUT_DATA,
  DEPT_PROGRESS,
  INITIATIVES,
  MATURITY_SCORES,
  STATUS_STYLES,
} from "../data.js";

const router = Router();

// ── Demo Users ──────────────────────────────────────────────
const USERS = [
  { email: "admin@digicampus.edu",     password: "admin123",     name: "Admin",        role: "Administrator",  avatar: "AD" },
  { email: "principal@digicampus.edu", password: "principal123", name: "Dr. Sharma",   role: "Principal",      avatar: "DS" },
  { email: "hod@digicampus.edu",       password: "hod123",       name: "Prof. Mehta",  role: "HOD - Academics",avatar: "PM" },
];

// ── Auth: Login ─────────────────────────────────────────────
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (user) {
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password." });
  }
});

// ── KPI Data ────────────────────────────────────────────────
router.get("/kpi/:dept", (req, res) => {
  const dept = req.params.dept;
  const data = KPI_DATA[dept] || KPI_DATA["All"];
  res.json({ dept, data });
});

// ── Trend Data ──────────────────────────────────────────────
router.get("/trends/:dept", (req, res) => {
  const dept = req.params.dept;
  const series = TREND_DATA[dept] || TREND_DATA["All"];
  res.json({ dept, labels: TREND_DATA.labels, ...series });
});

// ── Donut Data ──────────────────────────────────────────────
router.get("/donut/:dept", (req, res) => {
  const dept = req.params.dept;
  const data = DONUT_DATA[dept] || DONUT_DATA["All"];
  res.json({ dept, ...data });
});

// ── Department Progress ─────────────────────────────────────
router.get("/departments", (req, res) => {
  res.json(DEPT_PROGRESS);
});

// ── Initiatives ─────────────────────────────────────────────
router.get("/initiatives/:dept", (req, res) => {
  const dept = req.params.dept;
  const list = INITIATIVES[dept] || INITIATIVES["All"];
  res.json({ dept, data: list, statusStyles: STATUS_STYLES });
});

// ── Maturity Score ──────────────────────────────────────────
router.get("/maturity/:dept", (req, res) => {
  const dept = req.params.dept;
  const data = MATURITY_SCORES[dept] || MATURITY_SCORES["All"];
  res.json({ dept, ...data });
});

// ── Combined Dashboard (all data in one call) ───────────────
router.get("/dashboard/:dept", (req, res) => {
  const dept = req.params.dept;
  res.json({
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
});

export default router;
