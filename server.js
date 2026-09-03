import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. Zapify AI will use its browser fallback until you add it to .env.");
}

const app = express();
const PORT = process.env.PORT || 3000;
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.use(express.json({ limit: "64kb" }));
app.use(express.static(__dirname));

const SYSTEM_PROMPT = `You are Zapify AI, the official website assistant for Zapify Designs, a South African web design and development studio.

Your job is to help visitors understand what Zapify Designs can build and guide them toward a project.

Zapify Designs can create:
- Business and service websites
- IT and technology websites
- E-commerce stores and marketplaces
- Restaurant and food websites
- Portfolio and personal websites
- Digital scrapbooks and memory sites
- Advanced interactive websites
- Custom cursors, particles, hover effects, animations, backgrounds, 3D effects and experimental interfaces
- Booking, quote, contact, cart and checkout-style experiences

Portfolio concepts currently available:
- Zapify Auto Repairs — workshop/automotive
- Zapify Cooking — restaurant
- Zapify Quantum — extreme futuristic systems
- Zapify Pulse — events/nightlife
- Zapify Labs — interactive effects laboratory
- Zapify Arcade — gaming/entertainment
- Zapify Closet — fashion resale marketplace
- Zapify Plumbing — plumbing/service business

Contact: zapifydesigns@gmail.com | +27 74 389 9657

Do not invent prices. Explain that projects are quoted according to scope. Be friendly, confident and concise. You may use a few emojis, but don't overdo them. If the visitor asks something unrelated to web design, briefly answer if useful, then bring the conversation back to how Zapify Designs can help.
`;

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(client) });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    const history = Array.isArray(req.body?.history) ? req.body.history : [];

    if (!message) return res.status(400).json({ error: "Message is required." });
    if (message.length > 2000) return res.status(400).json({ error: "Message is too long." });
    if (!client) return res.status(503).json({ error: "Zapify AI is not configured yet." });

    const safeHistory = history.slice(-10).map(item => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      content: String(item?.content || "").slice(0, 2000)
    }));

    const input = [
      ...safeHistory,
      { role: "user", content: message }
    ];

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions: SYSTEM_PROMPT,
      input
    });

    res.json({ reply: response.output_text || "I’m here — what would you like to build?" });
  } catch (error) {
    console.error("Zapify AI error:", error?.message || error);
    res.status(500).json({ error: "Zapify AI could not respond right now." });
  }
});

app.listen(PORT, () => {
  console.log(`Zapify Designs running at http://localhost:${PORT}`);
});
