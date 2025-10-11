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
      {/* Timer */}
      {!gameOver && !win && (
        <div className="text-2xl font-bold text-[#E2B44F] mb-6 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-[#E2B44F]">
          ⏱️ Temps restant : {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4 max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleFlip(index)}
            className="cursor-pointer w-20 h-20 md:w-28 md:h-28 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 transform-style-3d"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Card Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#E2B44F] via-[#D4A643] to-[#C49838] rounded-xl flex items-center justify-center text-white text-4xl font-bold shadow-xl border-2 border-[#F5E6C3]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span className="drop-shadow-lg">🕰️</span>
              </div>

              {/* Card Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white to-[#FEFDFB] border-2 border-[#E2B44F] rounded-xl shadow-xl flex flex-col items-center justify-center p-2"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image
                  src={`/images/quiz/6497/${card.name}`}
                  alt={card.name}
                  width={50}
                  height={50}
                  className="object-contain mb-1"
                />
                <span className="text-slate-700 text-[0.65rem] md:text-xs font-medium text-center leading-tight">
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
