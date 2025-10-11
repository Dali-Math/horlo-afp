"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; name: string }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

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
      .map((name, index) => ({ id: index, name }));
    setCards(doubled);
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || gameOver) return;
    if (!isPlaying) setIsPlaying(true);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setMatched([...matched, cards[first].name]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length === new Set(cards.map(c => c.name)).size && cards.length > 0) {
      setWin(true);
      setIsPlaying(false);
    }
  }, [matched, cards]);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Timer */}
      {!gameOver && !win && (
        <div className="text-lg font-semibold text-[#E2B44F] mb-4">
          ⏱️ Temps restant : {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      )}

      {/* Grille de cartes */}
      <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card.name);
          return (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              className="relative cursor-pointer w-32 h-32 perspective"
            >
              <div
                className={`transition-transform duration-500 transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Dos */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E2B44F] to-[#cfa843] rounded-xl flex items-center justify-center text-white text-xl font-bold backface-hidden">
                  🕰️
                </div>
                {/* Face */}
                <div className="absolute inset-0 bg-white border border-[#E2B44F] rounded-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center">
                  <Image
                    src={`/images/quiz/6497/${card.name}`}
                    alt={card.name}
                    width={60}
                    height={60}
                  />
                  <span className="text-slate-700 text-sm mt-2">
                    {card.name.replace(".png", "").replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Messages finaux */}
      {gameOver && (
        <div className="mt-8 text-red-500 text-xl font-semibold">
          ⏰ Temps écoulé ! Game Over – Essaie à nouveau 🕰️
          <button
            onClick={handleRestart}
            className="ml-4 bg-[#E2B44F] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Rejouer
          </button>
        </div>
      )}

      {win && (
        <div className="mt-8 text-green-600 text-xl font-semibold">
          🎉 Bravo ! Tu as retrouvé toutes les pièces du mouvement 6497 !
          <button
            onClick={handleRestart}
            className="ml-4 bg-[#E2B44F] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}
