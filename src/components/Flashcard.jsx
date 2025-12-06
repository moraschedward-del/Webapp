// PORTFOLIOPRÜFUNG MATTHIAS
import React from "react";
import "./Flashcard.css";

export default function Flashcard({ front, back, flipped, onClick }) {
  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={onClick} 
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          {front}
        </div>
        <div className="flashcard-back">
          {back}
        </div>
      </div>
    </div>
  );
}



