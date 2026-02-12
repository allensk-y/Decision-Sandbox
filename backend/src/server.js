import "./config/env.js";
import express from "express";
import cors from "cors";
import simulateRoute from "./routes/simulate.route.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/simulate", simulateRoute);


// 🔥 THÊM ĐOẠN NÀY
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../frontend/index.html"));
});
// 🔥 HẾT ĐOẠN THÊM


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error." });
});

app.listen(PORT, () => console.log(`Decision Sandbox running on ${PORT}`));
