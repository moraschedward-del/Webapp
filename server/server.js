import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express(); // Express-App um den Server zu erstellen
const PORT = 3001;

// Website soll mit dem Server kommunizieren können
app.use(cors());
app.use(bodyParser.json());

// SQLite-Datenbank starten
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

// Test-Route 
app.get("/test", (req, res) => {
  res.send("Server läuft!");
});

// Alle Vokabeln in der Datenbank abrufen und zurückgeben
app.get("/api/vocab", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM vocab");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Laden der Vokabeln" });
  }
});

// Neue Vokabeln in die Datenbank einfügen
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

// --- KI-Route: Begriff generieren (nur Vorschlag, nicht speichern) ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/generate", async (req, res) => {
  try {
    // 1. Alle existierenden Begriffe aus der DB holen, um Duplikate zu vermeiden
    const existingRows = await db.all("SELECT front FROM vocab");
    const excludeList = existingRows.map(row => row.front).join(", ");

    // 2. Prompt für die KI
    const prompt = `Gib mir einen zufälligen Informatikbegriff, der nicht einer dieser Begriffe ist: ${excludeList}, 
      und seine einfache Bedeutung in Deutsch. 
    Antwortformat: Begriff: <Begriff> Bedeutung: <Bedeutung>`;

    // 3. Anfrage an die KI
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const text = result.text;
    const match = text.match(/Begriff:\s*(.*)\s+Bedeutung:\s*(.*)/i);

    if (!match) {
      return res.status(500).json({ error: "Ungültige KI-Antwort", raw: text });
    }

    const front = match[1].trim();
    const back = match[2].trim();

    // NICHT in DB speichern sondern erstmal nur das generierte Wort zurückgeben 
    res.json({ front, back });

  } catch (err) {
    console.error("❌ Fehler bei /api/generate:", err);
    res.status(500).json({ error: "Fehler bei der KI-Generierung." });
  }
});


// Server starten 
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  if (process.env.GEMINI_API_KEY) {
    console.log("✅ Gemini API-Key gefunden → KI-Generierung aktiviert.");
  } else {
    console.warn("⚠️ Kein GEMINI_API_KEY gefunden. KI-Funktion deaktiviert.");
  }
});

