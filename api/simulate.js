function buildPrompt({ intent, mode, answers }) {
  return `
You are Decision Sandbox Simulation Engine.

Decision intent:
${intent}

Reality mode:
${mode}

User mindset answers (JSON):
${JSON.stringify(answers, null, 2)}

Simulate structured futures, not advice. Return ONLY valid JSON with this schema:

{
  "timeline": [
    { "time": "Week 1", "event": "..." }
  ],
  "risks": [
    { "name": "Risk", "level": "LOW|MEDIUM|HIGH" }
  ],
  "outcomes": [
    { "title": "Future A", "summary": "..." }
  ],
  "questions": [
    "Reflective question?"
  ],
  "difficulty": "Low|Medium|High",
  "duration": "e.g. 2-4 months"
}

Do not include extra keys or explanations. Return JSON only.
  `.trim();
}

function extractJson(text) {
  if (!text) throw new Error("Empty AI response.");

  const codeBlock = text.match(/```json([\s\S]*?)```/i);
  const raw = codeBlock ? codeBlock[1] : text;

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in AI response.");
  }

  const jsonString = raw.slice(start, end + 1);
  return JSON.parse(jsonString);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { intent, mode, answers } = req.body ?? {};

    if (!intent || typeof intent !== "string") {
      return res.status(400).json({ error: "Missing or invalid intent." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY env var on server.",
        code: "MISSING_API_KEY"
      });
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const prompt = buildPrompt({
      intent: intent.trim(),
      mode: mode || "start",
      answers: answers || {}
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const status = response.status || 500;
      const message =
        payload?.error?.message ||
        payload?.message ||
        `Gemini request failed (${status}).`;

      if (status === 429 || String(message).includes("Quota exceeded")) {
        return res.status(429).json({
          error: "Quota exceeded. Please wait a bit or try again later.",
          code: "QUOTA_EXCEEDED"
        });
      }

      return res
        .status(status)
        .json({ error: message, code: "GEMINI_ERROR", details: payload });
    }

    const text =
      payload?.candidates?.[0]?.content?.parts?.map((p) => p?.text).join("") ||
      "";

    const data = extractJson(text);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Simulation failed.",
      code: "SIM_ERROR"
    });
  }
};
