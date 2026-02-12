import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

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

export async function callGemini(prompt) {
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return extractJson(text);
  } catch (err) {
    throw new Error(`Failed to parse AI JSON: ${err.message}`);
  }
}
