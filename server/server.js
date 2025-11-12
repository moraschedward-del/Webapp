import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// --- SQLite-Datenbank starten ---
let db;
(async () => {
  db = await open({
    filename: "./vocab.db",
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS vocab (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      front TEXT UNIQUE,
      back TEXT
    )
  `);

  console.log("✅ Datenbank verbunden & Tabelle bereit.");
})();

// --- Test-Route ---
app.get("/test", (req, res) => {
  res.send("Server läuft!");
});

// --- Alle Vokabeln abrufen ---
app.get("/api/vocab", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM vocab");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Laden der Vokabeln" });
  }
});

// --- Neue Vokabel einfügen ---
app.post("/api/vocab", async (req, res) => {
  const { front, back } = req.body;
  if (!front || !back)
    return res.status(400).json({ error: "Beide Felder erforderlich" });

  try {
    const result = await db.run(
      "INSERT INTO vocab (front, back) VALUES (?, ?)",
      [front, back]
    );
    res.json({ id: result.lastID, front, back });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      res.status(400).json({ error: "Diese Vokabel existiert bereits" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Fehler beim Hinzufügen der Vokabel" });
    }
  }
});

// --- Gemini AI Route ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/generate", async (req, res) => {
  try {
    const existingRows = await db.all("SELECT front FROM vocab");
    const excludeList = existingRows.map((r) => r.front).join(", ");

    const prompt = `Gib mir einen zufälligen Informatikbegriff, der nicht einer dieser Begriffe ist: ${excludeList}.
Antwortformat: Begriff: <Begriff> Bedeutung: <Bedeutung>`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text;
    const match = text.match(/Begriff:\s*(.*)\s+Bedeutung:\s*(.*)/i);
    if (!match)
      return res.status(500).json({ error: "Ungültige KI-Antwort", raw: text });

    const front = match[1].trim();
    const back = match[2].trim();

    res.json({ front, back });
  } catch (err) {
    console.error("❌ Fehler bei /api/generate:", err);
    res.status(500).json({ error: "Fehler bei der KI-Generierung." });
  }
});

// --- ElevenLabs TTS ---
const ELEVEN_VOICE_ID = "JiW03c2Gt43XNUQAumRP"; // Stimme direkt im Code

app.post("/api/speak", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Kein Text angegeben" });

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({ text }),
      }
    );

    const audioBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Generieren der Sprachausgabe" });
  }
});

// --- Server starten ---
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  if (process.env.GEMINI_API_KEY) console.log("✅ Gemini API aktiviert");
  if (process.env.ELEVENLABS_API_KEY) console.log("✅ ElevenLabs TTS aktiviert");
});

