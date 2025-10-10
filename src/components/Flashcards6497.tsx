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
    <div className="bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center py-24 px-4 sm:px-8 lg:px-12 overflow-visible min-h-[120vh]">
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-12 text-center">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>
      {/* Carte géante */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-3xl shadow-2xl 
                   p-12 md:p-16 text-center w-full md:w-[85%] lg:w-[80%] xl:w-[75%]
                   max-w-5xl min-h-[420px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center 
                   transition-transform duration-500 hover:scale-[1.03]"
      >
        <p
          className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl ${
            flipped ? "text-gray-200" : "text-[#E2B44F] font-semibold"
          }`}
        >
          {flipped ? cards[index].answer : cards[index].question}
        </p>
        <p className="text-base text-[#E2B44F] font-medium mt-10">
          Carte {index + 1} sur {total}
        </p>
        {/* Ligne de boutons à l'intérieur de la carte */}
        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          <button
            onClick={prevCard}
            className="bg-[#E2B44F]/20 border border-[#E2B44F] text-[#E2B44F] font-semibold py-3 px-8 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
          >
            ◀ Précédent
          </button>
          <button
            onClick={() => setFlipped(!flipped)}
            className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] transition-colors"
          >
            {flipped ? "Retour à la question" : "Retourner"}
          </button>
          <button
            onClick={nextCard}
            className="bg-[#E2B44F]/20 border border-[#E2B44F] text-[#E2B44F] font-semibold py-3 px-8 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
          >
            Suivant ▶
          </button>
        </div>
      </div>
      <p className="text-[#8B7355] mt-10 text-sm text-center italic">
        Cliquez sur la carte pour la retourner — compatible mobile, tablette et clavier (Entrée, ←, →)
      </p>
    </div>
  );
}
