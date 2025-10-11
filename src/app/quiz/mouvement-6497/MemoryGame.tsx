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
    if (flippedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check match when two cards are flipped
    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        // Match!
        setTimeout(() => {
          const matched = [...cards];
          matched[first].matched = true;
          matched[second].matched = true;
          setCards(matched);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const unflipped = [...cards];
          unflipped[first].flipped = false;
          unflipped[second].flipped = false;
          setCards(unflipped);
          setFlippedIndices([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setGameOver(false);
    setWin(false);
  };

  const handleRestart = () => {
    setTimeLeft(120);
    setIsPlaying(true);
    setGameOver(false);
    setWin(false);
    setFlippedIndices([]);
    setCanFlip(true);
    // Re-shuffle cards
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
    <div className="min-h-screen bg-gradient-to-br from-[#FEFDFB] via-[#FFF8EF] to-[#F5E6D3] p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10">⚙️</div>
      <div className="absolute bottom-20 right-20 text-7xl opacity-10">🕰️</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">🕰️ Memory Game 6497</h1>
          <p className="text-slate-600 text-lg">Retrouve toutes les paires de pièces du mouvement !</p>
        </div>

        {/* Timer and Start */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="bg-white px-8 py-4 rounded-2xl shadow-xl border-2 border-[#E2B44F]">
            <div className="text-2xl font-bold text-slate-800">
              ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          </div>
          {!isPlaying && !gameOver && !win && (
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-[#E2B44F] to-[#D4A643] text-white px-8 py-4 rounded-2xl font-bold text-xl hover:scale-110 transition-transform shadow-2xl"
            >
              🚀 Commencer
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div 
          className="memory-grid" 
          style={{
            display: 'grid', 
            gap: '2rem', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            justifyItems: 'center', 
            alignItems: 'center', 
            padding: '2rem'
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className="card"
              style={{
                width: '240px',
                aspectRatio: '1/1',
                borderRadius: '1.2rem',
                background: '#d4a83f',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: isPlaying && !gameOver && !win ? 'pointer' : 'default',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={(e) => {
                if (isPlaying && !gameOver && !win && !card.flipped && !card.matched) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!card.flipped && !card.matched) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                }
              }}
            >
              {/* Card Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#E2B44F] to-[#D4A643] rounded-xl shadow-2xl flex items-center justify-center"
                style={{
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
        @media (max-width: 1024px) {
          .memory-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
          }
          .card {
            width: 180px !important;
          }
        }
        
        @media (max-width: 768px) {
          .memory-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .card {
            width: 100% !important;
            max-width: 180px !important;
          }
        }
      `}</style>
    </div>
  );
}
