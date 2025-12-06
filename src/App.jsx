// PORTFOLIOPRÜFUNG EDWARD
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import AddWordPage from "./pages/AddWordPage";
import InfoPage from "./pages/InfoPage";

// State für die Vokabelliste und Funktionen zum Laden/Hinzufügen von Vokabeln
export default function App() {
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funktion zum Laden der Vokabeln vom Server
  const fetchVocab = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/vocab");
      if (!res.ok) throw new Error("Fehler beim Laden der Vokabeln");
      const data = await res.json();
      setVocab(data);
    } catch (err) {
      setError("⚠️ Konnte Vokabeln nicht laden. Server erreichbar?");
    } finally {
      setLoading(false);
    }
  };

  // Funktion zum Hinzufügen einer neuen Vokabel
  const handleAddWord = async (word) => {
    try {
      const res = await fetch("http://localhost:3001/api/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Fehler beim Hinzufügen der Vokabel");
        return;
      }
      fetchVocab(); // sofort aktualisieren
    } catch (err) {
      alert("⚠️ Fehler beim Hinzufügen. Server erreichbar?");
    }
  };

  // Vokabeln beim Start laden
  useEffect(() => {
    fetchVocab();
  }, []);

  // Routen der einzelnen Seiten
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/quiz"
          element={
            <QuizPage
              vocab={vocab}
              loading={loading}
              error={error}
              fetchVocab={fetchVocab}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddWordPage
              vocab={vocab}
              onAddWord={handleAddWord}
              fetchVocab={fetchVocab}
            />
          }
        />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}
