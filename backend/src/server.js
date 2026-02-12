import "./config/env.js";
import express from "express";
import cors from "cors";
import simulateRoute from "./routes/simulate.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/simulate", simulateRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error." });
});

app.listen(PORT, () => console.log(`Decision Sandbox running on ${PORT}`));
