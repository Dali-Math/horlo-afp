"use client";
import React, { useState } from "react";

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

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center text-white py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-10">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>

      {/* Carte */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#E2B44F]/30 rounded-xl shadow-lg w-[90%] max-w-2xl min-h-[260px] flex flex-col justify-center items-center cursor-pointer transition-transform duration-500"
      >
        <p className="text-center text-lg md:text-xl px-6 leading-relaxed">
          {flipped ? cards[index].answer : cards[index].question}
        </p>
        <button className="mt-6 bg-[#E2B44F] text-black font-semibold py-2 px-6 rounded-lg hover:bg-[#ffd966] transition-colors">
          {flipped ? "Question" : "Retourner"}
        </button>
        <p className="text-sm text-gray-400 mt-4">Carte {index + 1} sur {cards.length}</p>
      </div>

      {/* ✅ Boutons de navigation */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={prevCard}
          className="bg-[#E2B44F]/20 border border-[#E2B44F]/50 text-[#E2B44F] font-medium py-2 px-5 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
        >
          ◀ Précédent
        </button>
        <button
          onClick={nextCard}
          className="bg-[#E2B44F]/20 border border-[#E2B44F]/50 text-[#E2B44F] font-medium py-2 px-5 rounded-lg hover:bg-[#E2B44F]/40 transition-colors"
        >
          Suivant ▶
        </button>
      </div>

      <p className="mt-6 text-gray-400 italic text-sm">
        Cliquez sur la carte pour la retourner — compatible mobile et tablette.
      </p>
    </section>
  );
}
