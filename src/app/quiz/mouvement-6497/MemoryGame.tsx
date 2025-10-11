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

  // Initialize cards with doubled pieces
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

  // Timer countdown
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
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setWin(true);
      setIsPlaying(false);
    }
  }, [cards]);

  // Handle card flip
  const handleFlip = (index: number) => {
    if (
      gameOver ||
      win ||
      flippedIndices.length === 2 ||
      cards[index].flipped ||
      cards[index].matched
    ) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].name === cards[secondIndex].name) {
        // Match found!
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].matched = true;
          updatedCards[secondIndex].matched = true;
          setCards(updatedCards);
          setFlippedIndices([]);
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].flipped = false;
          updatedCards[secondIndex].flipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <style jsx global>{`
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Timer */}
      {!gameOver && !win && (
        <div className="text-2xl font-bold text-[#E2B44F] mb-6 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-3 rounded-xl shadow-md border-2 border-[#E2B44F]">
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
            className="flip-card w-20 h-20 md:w-28 md:h-28 cursor-pointer"
          >
            <div
              className={`flip-card-inner ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
            >
              {/* Card Back (Face Down) */}
              <div className="flip-card-front bg-gradient-to-br from-[#E2B44F] via-[#d4a745] to-[#c89a3a] flex items-center justify-center shadow-lg border-2 border-amber-300">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl">🕰️</div>
                  <div className="text-[10px] md:text-xs text-white/80 font-semibold mt-1">6497</div>
                </div>
              </div>

              {/* Card Front (Face Up) */}
              <div className="flip-card-back bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-[#E2B44F] flex flex-col items-center justify-center p-2 shadow-xl">
                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-1">
                  <Image
                    src={`/images/quiz/6497/${card.name}`}
                    alt={card.name.replace(".png", "")}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[8px] md:text-[10px] text-slate-700 font-medium text-center leading-tight">
                  {card.name.replace(".png", "").replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="mt-8 text-center">
          <div className="text-2xl md:text-3xl text-red-600 font-bold mb-4 bg-red-50 px-6 py-4 rounded-xl shadow-lg border-2 border-red-400">
            ⏰ Temps écoulé ! Game Over 🕰️
          </div>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-[#E2B44F] to-[#d4a745] text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg border-2 border-amber-300"
          >
            🔁 Rejouer
          </button>
        </div>
      )}

      {/* Win Message */}
      {win && (
        <div className="mt-8 text-center">
          <div className="text-2xl md:text-3xl text-green-600 font-bold mb-4 bg-green-50 px-6 py-4 rounded-xl shadow-lg border-2 border-green-400">
            🎉 Bravo ! Toutes les paires sont découvertes ! 🏆
          </div>
          <div className="text-lg text-slate-600 mb-4">
            Temps utilisé : {Math.floor((120 - timeLeft) / 60)}:
            {String((120 - timeLeft) % 60).padStart(2, "0")}
          </div>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-[#E2B44F] to-[#d4a745] text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg border-2 border-amber-300"
          >
            🔁 Rejouer
          </button>
        </div>
      )}
    </div>
  );
}
