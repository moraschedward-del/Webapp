// PORTFOLIOPRÜFUNG ALESSANDRO
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";

export default function QuizPage({ vocab, fetchVocab, loading, error }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = vocab[currentIndex];

  // Funktion zum Aussprechen der Vokabel
  const handleSpeak = async () => {
    const text = flipped ? currentCard.back : currentCard.front;

    const res = await fetch("http://localhost:3001/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const blob = await res.blob();
    const audioURL = URL.createObjectURL(blob);
    new Audio(audioURL).play();
  };

  // Funktionen zum Navigieren durch die Karten (Nächste/Vorherige)
  const handleNext = () => {
    if (currentIndex < vocab.length - 1) {
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

  // Fortschrittsanzeige berechnen
  const progressPercent = ((currentIndex + 1) / vocab.length) * 100; 

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
      <h2 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
        Vokabel-Quiz
      </h2>

      <p style={{ fontSize: "1.3rem" }}>
        Karte {currentIndex + 1} von {vocab.length}
      </p>

      <div
        style={{
          width: "80%",
          height: "12px",
          background: "rgba(255,255,255,0.3)",
          borderRadius: "6px",
          overflow: "hidden",
          margin: "1rem 0 2rem 0",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "#f4f80dff",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {vocab.length > 0 ? (
        // Wenn Vokabeln vorhanden sind, zeige die Flashcard und Navigation
        <>
          <Flashcard
            key={currentIndex}
            front={currentCard.front}
            back={currentCard.back}
            flipped={flipped}
            onClick={() => setFlipped(!flipped)}
          />

          /* Einzelne Buttons */
          <button
            onClick={handleSpeak}
            style={{
              marginTop: "1.5rem",
              padding: "0.8rem 1.5rem",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#ff6f61",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            🔊 Aussprechen
          </button>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                style={{
                  padding: "1.0rem 2.7rem",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                ⬅️ Vorherige
              </button>
            )}

            {currentIndex < vocab.length - 1 && (
              <button
                onClick={handleNext}
                style={{
                  padding: "1.0rem 2.7rem",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#24b63cff",
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Nächste ➡️
              </button>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "2rem",
              padding: "0.8rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#444",
              color: "#fff",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            ⬅️ Zurück zur Startseite
          </button>
        </>
      ) : (
        <p>⚠️ Keine Vokabeln vorhanden.</p>
      )}
    </div>
  );
}
