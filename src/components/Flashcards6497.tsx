"use client";
import React, { useEffect, useState } from "react";
export default function Flashcards6497() {
  const [cards, setCards] = useState<{ question: string; answer: string }[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    fetch("/data/flashcards-6497.json")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Erreur de chargement des cartes :", err));
  }, []);
  const total = cards.length;
  const nextCard = () => {
    if (total > 0) {
      setFlipped(false);
      setIndex((i) => (i + 1) % total);
    }
  };
  const prevCard = () => {
    if (total > 0) {
      setFlipped(false);
      setIndex((i) => (i - 1 + total) % total);
    }
  };
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") setFlipped((f) => !f);
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);
  if (cards.length === 0) {
    return (
      <p className="text-[#E2B44F] text-center py-20 text-lg font-medium">
        Chargement des cartes...
      </p>
    );
  }
  return (
    <section className="bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-start min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Titre */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-8 text-center">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>
      {/* Carte */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-2xl shadow-2xl 
                   p-10 md:p-14 text-center w-full sm:w-[90%] md:w-[75%] lg:w-[60%] 
                   max-w-3xl min-h-[360px] md:min-h-[420px] flex items-center justify-center 
                   transition-transform duration-500 hover:scale-[1.02]"
      >
        {flipped ? (
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed px-2 md:px-6">
            {cards[index].answer}
          </p>
        ) : (
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#E2B44F] leading-relaxed px-2 md:px-6">
            {cards[index].question}
          </p>
        )}
      </div>
      {/* Boutons Retourner et Suivant */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setFlipped(!flipped)}
          className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                     transition-colors shadow-lg text-base md:text-lg"
        >
          Retourner
        </button>
        <button
          onClick={nextCard}
          className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                     transition-colors shadow-lg text-base md:text-lg"
        >
          Suivant →
        </button>
      </div>
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center 
                      w-full sm:w-[90%] md:w-[75%] lg:w-[60%] max-w-3xl 
                      mt-10 gap-4 sm:gap-6">
        <button
          onClick={prevCard}
          className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                     transition-colors shadow-lg text-base md:text-lg w-full sm:w-auto"
        >
          ← Précédent
        </button>
        <p className="text-sm md:text-base text-[#E2B44F] font-medium text-center">
          Carte {index + 1} sur {total}
        </p>
        <button
          onClick={nextCard}
          className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                     transition-colors shadow-lg text-base md:text-lg w-full sm:w-auto"
        >
          Suivant →
        </button>
      </div>
      {/* Légende */}
      <p className="text-[#8B7355] mt-8 text-xs sm:text-sm text-center italic">
        Cliquez sur la carte pour la retourner — compatible mobile, tablette et clavier (Entrée, ←, →)
      </p>
    </section>
  );
}
