"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Card {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  // Initialize cards on mount
  useEffect(() => {
    const pieces = [
      "barillet.png",
      "balancier.png",
      "rochet.png",
      "roue-moyenne.png",
      "ancre.png",
      "spiral.png",
      "roue-echappement.png",
      "pont-barillet.png",
      "mobile-de-centre.png",
      "pont-balancier.png",
      "axe-balancier.png",
      "ressort-de-bascule.png",
      "pignon-coulant.png",
      "platine.png",
    ];

    const doubled = [...pieces, ...pieces]
      .sort(() => Math.random() - 0.5)
      .map((name, index) => ({
        id: index,
        name,
        flipped: false,
        matched: false,
      }));

    setCards(doubled);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isPlaying && timeLeft > 0 && !win) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !win) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft, win]);

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWin(true);
      setIsPlaying(false);
    }
  }, [cards]);

  // Handle card flip
  const handleCardClick = (index: number) => {
    if (!canFlip || !isPlaying || gameOver || win) return;

    const card = cards[index];
    if (card.flipped || card.matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped;

      if (cards[first].name === cards[second].name) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].matched = true;
          updatedCards[second].matched = true;
          setCards(updatedCards);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setGameOver(false);
    setWin(false);
    setTimeLeft(120);
    setFlippedIndices([]);
    setCanFlip(true);

    const pieces = [
      "barillet.png",
      "balancier.png",
      "rochet.png",
      "roue-moyenne.png",
      "ancre.png",
      "spiral.png",
      "roue-echappement.png",
      "pont-barillet.png",
      "mobile-de-centre.png",
      "pont-balancier.png",
      "axe-balancier.png",
      "ressort-de-bascule.png",
      "pignon-coulant.png",
      "platine.png",
    ];

    const doubled = [...pieces, ...pieces]
      .sort(() => Math.random() - 0.5)
      .map((name, index) => ({
        id: index,
        name,
        flipped: false,
        matched: false,
      }));

    setCards(doubled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🧩 Jeu Mémoire : Mouvement 6497</h1>
          <p className="text-lg text-slate-600 mb-6">Trouve toutes les paires de pièces horlogères avant la fin du temps !</p>
        </div>

        {/* Two-column layout */}
        <div className="memory-container">
          {/* Memory Grid - Left */}
          <div className="memory-grid">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className="card"
                style={{
                  width: '200px',
                  aspectRatio: '1 / 1',
                  perspective: '1000px',
                  cursor: canFlip && isPlaying && !card.matched ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card Back */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                      backgroundColor: card.matched ? '#86efac' : '#e2b44f',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <span className="text-6xl">🕰️</span>
                  </div>

                  {/* Card Front */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                      backgroundColor: '#ffffff',
                      padding: '1rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Image
                      src={`/images/quiz/6497/${card.name}`}
                      alt={card.name}
                      width={120}
                      height={120}
                      className="object-contain mb-2"
                    />
                    <span className="text-slate-700 text-sm font-medium text-center leading-tight">
                      {card.name.replace(".png", "").replace(/-/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Right */}
          <aside className="memory-sidebar">
            <div className="memory-panel">
              <h3>⏱ Temps restant :</h3>
              <p className="time">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </p>
              {!isPlaying && !gameOver && !win && (
                <button className="start-btn" onClick={handleStart}>
                  🎮 Démarrer le jeu
                </button>
              )}
              <p className="hint">💡 Trouvez toutes les paires avant la fin du temps !</p>
            </div>
          </aside>
        </div>

        {/* Game Over Message */}
        {gameOver && (
          <div className="mt-8 text-center bg-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-red-400">
            <div className="text-red-600 text-2xl font-bold mb-4">⏰ Temps écoulé ! Game Over</div>
            <p className="text-slate-600 mb-4">Essaie à nouveau 🕰️</p>
            <button className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg" onClick={handleRestart}>
              🔁 Rejouer
            </button>
          </div>
        )}

        {/* Win Message */}
        {win && (
          <div className="mt-8 text-center bg-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-green-400">
            <div className="text-green-600 text-2xl font-bold mb-4">🎉 Bravo ! Toutes les paires sont trouvées !</div>
            <p className="text-slate-600 mb-4">Tu as retrouvé toutes les pièces du mouvement 6497 !</p>
            <button className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg" onClick={handleRestart}>
              🔁 Rejouer
            </button>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx global>{`
        .memory-container {
          display: grid;
          grid-template-columns: 3fr 1fr; /* 75% - 25% */
          align-items: start;
          justify-content: center;
          gap: 4rem; /* clear space between grid and panel */
          max-width: 1600px;
          margin: 3rem auto;
          padding: 2rem;
        }
        .memory-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5rem;
          justify-items: center;
        }
        .memory-sidebar {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .memory-panel {
          background: #fffef8;
          border: 2px solid #e2b44f;
          border-radius: 1.5rem;
          padding: 2rem;
          width: 260px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
        }
        .memory-panel h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .memory-panel .time {
          font-size: 2rem;
          font-weight: 700;
          color: #d19c28;
          margin-bottom: 1rem;
        }
        .start-btn {
          background: #d19c28;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        }
        .hint {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #555;
        }
        /* Responsive */
        @media (max-width: 1024px) {
          .memory-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .memory-sidebar {
            justify-content: center;
          }
          .memory-panel {
            width: 100%;
            max-width: 400px;
          }
          .memory-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .memory-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
