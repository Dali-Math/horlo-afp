"use client";
import { useState } from "react";

export default function FlashcardsRemontage6497() {
  const cards = [
    {
      question: "Quelle est la première pièce à remonter dans le mouvement ETA 6497 ?",
      answer: "Le barillet et le rouage, avant de poser les ponts supérieurs.",
    },
    {
      question: "Pourquoi faut-il vérifier la liberté de rotation des roues avant de visser ?",
      answer: "Pour s’assurer qu’aucune roue n’est bloquée ou mal engagée dans son pivot.",
    },
    {
      question: "À quel moment remonte-t-on le balancier ?",
      answer: "En dernier, après avoir remonté le pont d’ancre et vérifié l’échappement.",
    },
    {
      question: "Quel outil est utilisé pour huiler les pivots ?",
      answer: "L’huilier horloger, souvent en verre ou avec embout fin de précision.",
    },
    {
      question: "Quelle précaution lors du remontage du pont de barillet ?",
      answer: "Ne jamais forcer : il doit se placer naturellement sur les axes des roues.",
    },
    {
      question: "Quel test effectuer une fois le mouvement remonté ?",
      answer: "Faire tourner légèrement le balancier pour vérifier l’amplitude et la régularité.",
    },
  ];

  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));

  const toggleCard = (index: number) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="bg-[#111827] p-6 md:p-10 rounded-2xl border border-yellow-500/30 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-[#E2B44F] mb-8 text-center">
        Flashcards — Remontage ETA 6497
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative h-48 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              flipped[index] ? "rotate-y-180" : ""
            }`}
            onClick={() => toggleCard(index)}
          >
            <div className="absolute inset-0 bg-[#1a1a1a] border border-yellow-500/40 rounded-xl flex items-center justify-center p-4 text-center text-white backface-hidden">
              {card.question}
            </div>
            <div className="absolute inset-0 bg-yellow-500 text-black font-semibold rounded-xl flex items-center justify-center p-4 text-center rotate-y-180 backface-hidden">
              {card.answer}
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-center mt-6 text-sm">
        Cliquez sur une carte pour révéler la réponse.
      </p>
    </div>
  );
}
