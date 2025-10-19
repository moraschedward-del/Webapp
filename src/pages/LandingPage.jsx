import React from "react";

export default function LandingPage({ onStart, onAddWord }) {
  const emojis = ["🖥️", "💾", "🖱️", "📡", "⚙️", "💻", "🧩", "🕹️"];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Überschrift */}
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        💡 Vokabel Trainer
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        Übe deine Informatik-Begriffe spielerisch und lerne schnell!
      </p>

      {/* Emojis in einer Reihe in der Mitte */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "3rem",
          fontSize: "3rem",
        }}
      >
        {emojis.map((emoji, index) => (
          <span key={index}>{emoji}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={onStart}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#ff6f61",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Vergrößern des Buttons beim Hovern
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Zurück zur Originalgröße beum Verlassen
        >
          🚀 Starte Training
        </button>

        <button
          onClick={onAddWord}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#4a90e2",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} 
        >
          ➕ Neue Begriffe hinzufügen
        </button>
      </div>
      <div style={{ position: "absolute", bottom: "8rem", fontSize: "0.9rem", color: "#eee" }}>
         © Made by Edward, Marlon, Alessandro, Matthias and Lina
      </div>
    </div>
  );
}


