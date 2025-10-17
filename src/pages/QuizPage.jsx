import React, { useState } from "react";
import Flashcard from "../components/Flashcard";

export default function QuizPage({ vocab, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex + 1 < vocab.length) { // nur wenn nächste Karte existiert, soll weitergegangen werden
      setFlipped(false); // nächste Karte wird wieder von der Vorderseite gezeigt
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) { // nur wenn vorherige Karte existiert, soll zurückgegangen werden
      setFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
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
            onClick={() => setFlipped(!flipped)}  
          />


          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            {/* Nur anzeigen, wenn vorherige Karte existiert */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                style={{
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Vergrößern des Buttons beim Hovern
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Zurück zur Originalgröße beum Verlassen
              >
                ⬅️ Vorherige Karte
              </button>
            )}

            {/* Nur anzeigen, wenn nächste Karte existiert */}
            {currentIndex < vocab.length - 1 && (
              <button
                onClick={handleNext}
                style={{
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#ff6f61",
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} 
              >
                👉 Nächste Karte
              </button>
            )}
          </div>

          <button
            onClick={onBack}
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
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} 
          >
            ⬅️ Zurück zur Startseite
          </button>
        </>
      ) : (
        <p>⚠️ Keine Vokabeln vorhanden. Bitte füge welche hinzu!</p>
      )}
    </div>
  );
}

