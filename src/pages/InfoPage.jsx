import React from "react";
import { useNavigate } from "react-router-dom";

export default function InfoPage() {
  const navigate = useNavigate();

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
        background: "linear-gradient(135deg, #4e4376, #2b5876)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>ℹ️ Info</h1>

      <p style={{ maxWidth: "600px", fontSize: "1.3rem", opacity: 0.9 }}>
        Willkommen beim Vokabeltrainer!  
        <br /><br />
        ✔ Du kannst neue Informatik Vokabeln hinzufügen (entweder manuell oder per KI)
        <br /><br />
        ✔ Bereits hinzugefügte Vokabeln können nicht nochmals hinzugefügt werden
        <br /><br />
        ✔ Im Quiz kannst du die Begriffe kennenlernen und üben
        <br /><br />
        ✔ Klicke auf die Karte, um die Bedeutung umzudrehen
        <br /><br />  
        ✔ Nutze den Lautsprecher-Button, um dir die Begriffe vorlesen zu lassen
        <br /><br />
        ✔ Eine Fortschrittsanzeige zeigt dir, wie weit du bist  
        <br /><br />
        Nutze die Navigation, um zwischen den Seiten zu wechseln.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          background: "#444",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ⬅ Zurück zur Startseite
      </button>
    </div>
  );
}
