"use client";
import React, { useState, useEffect } from "react";

const cards = [
  { question: "Quelle est la première étape du démontage du mouvement ETA 6497 ?", answer: "Retirer le balancier complet avec précaution." },
  { question: "Quelle est la fonction du pont de rouage ?", answer: "Il maintient en place les pivots des roues du rouage." },
  { question: "Lors du démontage, pourquoi marquer la position des vis ?", answer: "Pour éviter de les interchanger lors du remontage." },
  { question: "Quel outil est utilisé pour démonter le ressort moteur ?", answer: "Un extracteur ou un démonte-barillet." },
  { question: "Quelle est la précaution principale lors du démontage du balancier ?", answer: "Ne pas tordre le spiral ni toucher à l'axe du balancier." },
];

export default function Flashcards6497() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = cards.length;

  const nextCard = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") setFlipped((f) => !f);
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-visible min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-8 text-center">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>

      {/* Carte + Boutons */}
      <div className="relative flex flex-col items-center justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-3xl">
        {/* Carte élargie */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-2xl shadow-2xl 
                     p-10 md:p-14 text-center w-full min-h-[420px] flex flex-col items-center justify-center 
                     transition-transform duration-500 hover:scale-[1.02]"
        >
          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed ${
              flipped ? "text-gray-200" : "text-[#E2B44F] font-semibold"
            }`}
          >
            {flipped ? cards[index].answer : cards[index].question}
          </p>

          <p className="text-sm md:text-base text-[#E2B44F] font-medium mt-6">
            Carte {index + 1} sur {total}
          </p>
        </div>

        {/* Boutons visibles sous la carte */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <button
            onClick={prevCard}
            className="bg-[#E2B44F]/20 border border-[#E2B44F] text-[#E2B44F] font-semibold py-3 px-6 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
          >
            ◀ Précédent
          </button>

          <button
            onClick={() => setFlipped(!flipped)}
            className="bg-[#E2B44F] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#c89b3d] transition-colors"
          >
            {flipped ? "Retour à la question" : "Retourner"}
          </button>

          <button
            onClick={nextCard}
            className="bg-[#E2B44F]/20 border border-[#E2B44F] text-[#E2B44F] font-semibold py-3 px-6 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
          >
            Suivant ▶
          </button>
        </div>
      </div>

      <p className="text-[#8B7355] mt-6 text-xs sm:text-sm text-center italic">
        Cliquez sur la carte pour la retourner — compatible mobile, tablette et clavier (Entrée, ←, →)
      </p>
    </div>
  );
}
