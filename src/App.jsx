import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import AddWordPage from "./pages/AddWordPage";

export default function App() {
  const [page, setPage] = useState("landing");
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funktion zum Abrufen der Vokabeln vom Backend
  const fetchVocab = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/vocab");
      if (!res.ok) throw new Error("Fehler beim Laden der Vokabeln");
      const data = await res.json(); // Erwartet ein Array von Vokabeln vom Server
      setVocab(data);
    } catch (err) {
      console.error(err);
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
      // Nach erfolgreichem Hinzufügen die Vokabelliste aktualisieren
      fetchVocab();
    } catch (err) {
      console.error(err);
      alert("⚠️ Fehler beim Hinzufügen. Server erreichbar?");
    }
  };

  // Quiz-Seite lädt die Vokabeln, wenn sie angezeigt wird
  useEffect(() => {
    if (page === "quiz") {
      fetchVocab();
    }
  }, [page]);

  return (
    <>
      {page === "landing" && (
        <LandingPage
          onStart={() => setPage("quiz")}
          onAddWord={() => setPage("addWord")}
        />
      )}

      {page === "quiz" && (
        <QuizPage
          vocab={vocab}
          loading={loading}
          error={error}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "addWord" && (
        <AddWordPage
          onBack={() => setPage("landing")}
          onAddWord={handleAddWord}
          vocab={vocab}
        />
      )}
    </>
  );
}
