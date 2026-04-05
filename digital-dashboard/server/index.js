import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dashboardRoutes from "./routes/dashboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── API Routes ──────────────────────────────────────────────
app.use("/api", dashboardRoutes);

// ── Health check ────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Serve React frontend (production) ───────────────────────
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// SPA fallback — serve index.html for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✔  DigiCampus API running → http://localhost:${PORT}`);
  console.log(`  ↳  Health check          → http://localhost:${PORT}/api/health`);
  console.log(`  ↳  Dashboard data        → http://localhost:${PORT}/api/dashboard/All\n`);
});
