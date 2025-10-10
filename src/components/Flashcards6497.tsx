"use client";

import { useState } from "react";
import flashcardsData from "../../data/flashcards";

const Flashcards6497 = () => {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const cards = flashcardsData["6497"];
  const total = cards.length;

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] px-4 sm:px-6 py-12">
      {/* Titre */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#E2B44F] mb-10 text-center px-4">
        Flashcards pour la division 6497
      </h2>
      {/* Carte */}
      <div
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-3xl 
                   shadow-2xl flex items-center justify-center 
                   w-full sm:w-[95%] md:w-[80%] lg:w-[70%] max-w-4xl 
                   p-6 sm:p-10 md:p-16 lg:p-24 
                   min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] 
                   transition-all duration-300 hover:border-[#c89b3d] 
                   backdrop-blur-sm bg-opacity-90 
                   relative"
      >
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          {flipped ? (
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed px-2 md:px-6">
              {cards[index].answer}
            </p>
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#E2B44F] leading-relaxed px-2 md:px-6">
              {cards[index].question}
            </p>
          )}
          {/* Boutons Retourner et Suivant */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(!flipped);
              }}
              className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                         transition-colors shadow-lg text-base md:text-lg"
            >
              Retourner
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextCard();
              }}
              className="bg-[#E2B44F] text-black font-bold py-3 px-10 rounded-lg hover:bg-[#c89b3d] 
                         transition-colors shadow-lg text-base md:text-lg"
            >
              Suivant →
            </button>
          </div>
        </div>
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
    </div>
  );
};

export default Flashcards6497;
