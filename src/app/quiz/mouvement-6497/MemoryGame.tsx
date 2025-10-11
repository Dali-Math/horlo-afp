"use client";
import React, { useState, useEffect } from "react";

type Card = {
  id: number;
  name: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameOver, setGameOver] = useState(false);

  const imagePath = "/images/quiz/6497/";

  // 🔹 Liste des pièces horlogères (noms des PNG dans /public/images/quiz/6497)
  const pieces = [
    "barillet",
    "rochet",
    "roue-moyenne",
    "roue-echappement",
    "ancre",
    "spiral",
    "balancier",
    "pont-barillet",
    "pont-balancier",
    "pignon-coulant",
  ];

  // 🧩 Initialisation des cartes
  const initializeCards = () => {
    const duplicated = [...pieces, ...pieces];
    const shuffled = duplicated
      .map((name, index) => ({
        id: index,
        name,
        image: `${imagePath}${name}.png`,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // 🕹️ Démarrage du jeu
  const startGame = () => {
    initializeCards();
    setIsPlaying(true);
    setGameOver(false);
    setTimeLeft(120);
  };

  // 🧭 Gestion du timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying && timeLeft === 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  // 🧠 Logique du flip
  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || cards[index].isMatched || cards[index].isFlipped || gameOver) return;

    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (updated[first].name === updated[second].name) {
        updated[first].isMatched = true;
        updated[second].isMatched = true;
        setCards(updated);
      } else {
        setTimeout(() => {
          updated[first].isFlipped = false;
          updated[second].isFlipped = false;
          setCards([...updated]);
        }, 800);
      }
      setFlipped([]);
    }
  };

  // 🧩 Vérification fin de jeu
  useEffect(() => {
    if (cards.length && cards.every((c) => c.isMatched)) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [cards]);

  // 🧱 Rendu UI
  return (
    <section className="memory-section">
      <h2 className="memory-title">
        🕰️ Mouvement 6497 – Jeu de Mémoire
      </h2>
      <p className="memory-subtitle">
        Retrouvez toutes les paires de pièces du mouvement mécanique Unitas 6497 avant la fin du temps !
      </p>

      <div className="memory-game-container">
        {/* Grille de cartes */}
        <div className="memory-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`memory-card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={card.isFlipped || card.isMatched ? card.image : "/images/back.png"}
                alt={card.name}
                className="card-image"
              />
            </div>
          ))}
        </div>

        {/* Panneau latéral */}
        <div className="memory-panel">
          <div className="timer-box">
            <p className="timer-title">⏱️ Temps restant :</p>
            <p className="timer-value">
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}
              :
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>

            {!isPlaying ? (
              <button onClick={startGame} className="start-btn">
                🎮 Commencer
              </button>
            ) : (
              <button onClick={() => setIsPlaying(false)} className="reset-btn">
                ⏸️ Pause
              </button>
            )}

            {gameOver && (
              <p className="game-over">
                {cards.every((c) => c.isMatched)
                  ? "🎉 Bravo ! Toutes les paires sont trouvées !"
                  : "⏰ Temps écoulé – Partie terminée"}
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="hint">
        💡 Astuce : Retrouvez toutes les paires identiques en moins de 2 minutes pour gagner !
      </p>
    </section>
  );
}
