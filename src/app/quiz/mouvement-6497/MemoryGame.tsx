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
  const handleFlip = (index: number) => {
    if (!canFlip || gameOver || win) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (flippedIndices.length >= 2) return;

    // Start game on first click
    if (!isPlaying) setIsPlaying(true);

    // Flip the card
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Check for match when two cards are flipped
    if (newFlippedIndices.length === 2) {
      setCanFlip(false);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].name === cards[secondIndex].name) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].matched = true;
          updatedCards[secondIndex].matched = true;
          setCards(updatedCards);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 min-h-screen bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
      <style jsx global>{`
        @media (max-width: 1024px) {
          .memory-card {
            width: 190px !important;
            height: 190px !important;
          }
        }
        @media (max-width: 768px) {
          .memory-card {
            width: 150px !important;
            height: 150px !important;
          }
        }
      `}</style>

      {/* Timer */}
      {!gameOver && !win && (
        <div className="text-2xl font-bold text-[#E2B44F] mb-6 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-[#E2B44F]">
          ⏱️ Temps restant : {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-8 justify-items-center p-8 max-w-7xl" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'}}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleFlip(index)}
            className="memory-card cursor-pointer perspective-1000"
            style={{
              perspective: "1000px",
              width: '220px',
              height: '220px'
            }}
          >
            <div
              className="relative w-full h-full transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Card Back */}
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center text-white text-5xl font-bold"
                style={{
                  background: '#d4a83f',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  borderRadius: '1.2rem',
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transition: 'transform 0.4s, box-shadow 0.3s'
                }}
              >
                <span className="drop-shadow-lg">🕰️</span>
              </div>

              {/* Card Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white to-[#FEFDFB] border-2 border-[#E2B44F] rounded-xl shadow-xl flex flex-col items-center justify-center p-4"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
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
  );
}
