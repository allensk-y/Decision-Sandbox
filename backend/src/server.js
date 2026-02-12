import "./config/env.js";
import express from "express";
import cors from "cors";
import simulateRoute from "./routes/simulate.route.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// ===== FIX __dirname cho ES module =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 chỉnh đúng folder frontend của cậu
const FRONTEND_PATH = path.join(__dirname, "../../../frontend");

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== API ROUTES =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/simulate", simulateRoute);

// ===== SERVE FRONTEND =====
app.use(express.static(FRONTEND_PATH));

// 👉 route "/" trả về index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// 👉 fallback cho SPA (React/Vue hoặc routing frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error." });
});

app.listen(PORT, () => {
  console.log(`Decision Sandbox running on ${PORT}`);
});
