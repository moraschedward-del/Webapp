// PORTFOLIOPRÜFUNG ALESSANDRO
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
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
        background: "linear-gradient(135deg, #4a738f, #4e4376)",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
        Vokabeltrainer
      </h1>

      {/* Informatik Emojis */}
      <p style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        💻 🧠 ⚙️ 🔧 🔐 🖥️
      </p>

      {/* Buttons */}
      <button
        onClick={() => navigate("/quiz")}
        style={btn("#24b63c")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        🚀 Quiz starten
      </button>

      <button
        onClick={() => navigate("/add")}
        style={btn("#ff6f61")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        ➕ Vokabel hinzufügen
      </button>

      <button
        onClick={() => navigate("/info")}
        style={btn("#6c757d")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        ℹ️ Info
      </button>
    </div>
  );
}

// Stil für die Buttons
const btn = (color) => ({
  margin: "1rem",
  padding: "1rem 2rem",
  background: color,
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "1.3rem",
  cursor: "pointer",
  transition: "transform 0.2s ease",
});
