import { buildPrompt } from "../utils/promptBuilder.js";
import { callGemini } from "../services/gemini.service.js";

export async function simulate(req, res) {
  try {
    const { intent, mode, answers } = req.body ?? {};

    if (!intent || typeof intent !== "string") {
      return res.status(400).json({ error: "Missing or invalid intent." });
    }

    const prompt = buildPrompt({
      intent: intent.trim(),
      mode: mode || "start",
      answers: answers || {}
    });

    const aiData = await callGemini(prompt);

    return res.json(aiData);
  } catch (err) {
    const message = err.message || "Simulation failed.";
    if (message.includes("Quota exceeded") || message.includes("429")) {
      return res.status(429).json({
        error: "Quota exceeded. Please wait a bit or try again later.",
        code: "QUOTA_EXCEEDED"
      });
    }
    return res.status(500).json({ error: "Simulation failed.", code: "SIM_ERROR" });
  }
}
