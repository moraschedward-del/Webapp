import React, { useState } from "react";

export default function AddWordPage({ onBack }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!front.trim() || !back.trim()) {
      setError("⚠️ Bitte beide Felder ausfüllen!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: front.trim(), back: back.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(`⚠️ ${data.error || "Fehler beim Hinzufügen der Vokabel."}`);
        return;
      }

      setSuccess("✅ Vokabel erfolgreich hinzugefügt!");
      setFront("");
      setBack("");
    } catch (err) {
      console.error(err);
      setError("⚠️ Fehler beim Hinzufügen der Vokabel. Server erreichbar?");
    }
  };

  const handleGenerate = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(`⚠️ ${data.error || "Fehler bei der KI-Generierung."}`);
        setLoading(false);
        return;
      }

      setFront(data.front);
      setBack(data.back);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("⚠️ Fehler bei der KI-Generierung. Server erreichbar?");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>
      ➕ Neue Begriffe hinzufügen
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Linke Seite: Felder */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Begriff aus der Informatik"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            style={{
              width: "500px",
              padding: "0.5rem",
              fontSize: "1.4rem",
              backgroundColor: "#fff",
              color: "#111",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <textarea
            placeholder="Bedeutung"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            rows={6}
            style={{
              width: "500px",
              padding: "0.5rem",
              fontSize: "1.4rem",
              backgroundColor: "#fff",
              color: "#111",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "none",
            }}
          />
        </form>

        {/* Rechte Seite: Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "0.6rem 1rem",
              background: "#ff6f61",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} 
          >
            {loading ? "🤖 Generiere..." : "🤖 KI generieren"}
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "0.6rem 1rem",
              background: "#27d44dff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ➕ Hinzufügen
          </button>

          <button
            onClick={onBack}
            style={{
              padding: "0.6rem 1rem",
              background: "#444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⬅️ Zurück
          </button>
        </div>
      </div>

      {/* Error / Success Meldungen */}
      <div style={{ position: "absolute", bottom: "3rem", textAlign: "center" }}>
        {error && <p style={{ color: "#ffbaba" }}>{error}</p>}
        {success && <p style={{ color: "#baffc9" }}>{success}</p>}
      </div>
    </div>
  );
}



