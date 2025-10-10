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
  const nextCard = () => { setFlipped(false); setIndex((i) => (i + 1) % total); };
  const prevCard = () => { setFlipped(false); setIndex((i) => (i - 1 + total) % total); };

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
    return <p className="text-[#E2B44F] text-center py-20">Chargement des cartes...</p>;
  }

  return (
    <section className="bg-[#0a0a0a] min-h-[900px] text-gray-200 flex flex-col items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-10 text-center">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>

      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-2xl shadow-2xl 
                   p-10 md:p-16 text-center w-full sm:w-[95%] md:w-[85%] lg:w-[70%] xl:w-[60%] 
                   max-w-5xl min-h-[520px] md:min-h-[580px] flex items-center justify-center 
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

      <div className="flex flex-col sm:flex-row justify-between items-center 
                      w-full sm:w-[95%] md:w-[85%] lg:w-[70%] xl:w-[60%] max-w-5xl 
                      mt-10 gap-4 sm:gap-0">
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

      <p className="text-[#8B7355] mt-6 text-xs sm:text-sm text-center italic">
        Cliquez sur la carte pour la retourner — compatible mobile, tablette et clavier (Entrée, ←, →)
      </p>
    </section>
  );
}
