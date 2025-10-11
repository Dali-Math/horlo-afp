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
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            🧩 Jeu Mémoire : Mouvement 6497
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Trouve toutes les paires de pièces horlogères avant la fin du temps
            !
          </p>

          {/* Timer and Start Button */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-bold text-slate-700">
              ⏱️ Temps restant : {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            {!isPlaying && !gameOver && !win && (
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-transform shadow-xl"
              >
                🎮 Démarrer le jeu
              </button>
            )}
          </div>
        </div>

        {/* Memory Grid */}
        <div
          className="memory-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            gridTemplateColumns: 'repeat(6, 1fr)',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className="card"
              style={{
                width: '200px',
                aspectRatio: '1 / 1',
                perspective: '1000px',
                cursor:
                  canFlip && isPlaying && !card.matched ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform:
                    card.flipped || card.matched
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
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

        {/* Game Over Message */}
        {gameOver && (
          <div className="mt-8 text-center bg-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-red-400">
            <div className="text-red-600 text-2xl font-bold mb-4">
              ⏰ Temps écoulé ! Game Over
            </div>
            <p className="text-slate-600 mb-4">Essaie à nouveau 🕰️</p>
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              🔁 Rejouer
            </button>
          </div>
        )}

        {/* Win Message */}
        {win && (
          <div className="mt-8 text-center bg-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-green-400">
            <div className="text-green-600 text-2xl font-bold mb-4">
              🎉 Bravo ! Toutes les paires sont trouvées !
            </div>
            <p className="text-slate-600 mb-4">
              Tu as retrouvé toutes les pièces du mouvement 6497 !
            </p>
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              🔁 Rejouer
            </button>
          </div>
        )}
      </div>
      
      {/* Media Queries via style tag */}
      <style jsx global>{`
        @media (max-width: 1200px) {
          .memory-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
        
        @media (max-width: 1024px) {
          .memory-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .memory-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
