import React, { useState } from "react";
import Flashcard from "../components/Flashcard";

export default function QuizPage({ vocab, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // --- Karte wechseln ---
  const handleNext = () => {
    if (currentIndex + 1 < vocab.length) {
      setFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // --- Text sprechen ---
  const speakText = async () => {
    const textToSpeak = flipped
      ? vocab[currentIndex].back
      : vocab[currentIndex].front;

    try {
      const response = await fetch("http://localhost:3001/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak }),
      });

      if (!response.ok) throw new Error("Fehler beim Abspielen");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Karte flippen ---
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // --- Button Style Template ---
  const buttonStyle = (bgColor) => ({
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: bgColor,
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.2s",
  });

  const handleHover = (e, enter) => {
    e.currentTarget.style.transform = enter ? "scale(1.05)" : "scale(1)";
  };

  return (
    <div
      style={{
        margin: 0,
        padding: "2rem",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4a738f, #4e4376)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>Vokabel-Quiz</h2>
      <p style={{ marginBottom: "2rem" }}>Klicke auf die Karte, um die Bedeutung zu sehen.</p>

      {vocab.length > 0 ? (
        <>
          <Flashcard
            key={currentIndex}
            front={vocab[currentIndex].front}
            back={vocab[currentIndex].back}
            flipped={flipped}
            onClick={handleFlip}
          />

          {/* Oben: Abspielen */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={speakText}
              style={buttonStyle("#28a745")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              🔊 Abspielen
            </button>
          </div>

          {/* Mitte: Vorherige / Nächste */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                style={buttonStyle("#6c757d")}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                ⬅️ Vorherige Karte
              </button>
            )}
            {currentIndex < vocab.length - 1 && (
              <button
                onClick={handleNext}
                style={buttonStyle("#ff6f61")}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                👉 Nächste Karte
              </button>
            )}
          </div>

          {/* Unten: Zurück zur Startseite */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={onBack}
              style={buttonStyle("#444")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              ⬅️ Zurück zur Startseite
            </button>
          </div>
        </>
      ) : (
        <p>⚠️ Keine Vokabeln vorhanden. Bitte füge welche hinzu!</p>
      )}
    </div>
  );
}





