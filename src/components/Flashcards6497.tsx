// src/components/Flashcards6497.tsx

"use client";
import React, { useState, useEffect } from "react";

const cards = [
  { question: "Quelle est la première étape du démontage du mouvement ETA 6497 ?", answer: "Retirer le balancier complet avec précaution." },
  { question: "Quelle est la fonction du pont de rouage ?", answer: "Il maintient en place les pivots des roues du rouage." },
  { question: "Lors du démontage, pourquoi marquer la position des vis ?", answer: "Pour éviter de les interchanger lors du remontage." },
  { question: "Quel outil est utilisé pour démonter le ressort moteur ?", answer: "Un extracteur ou un démonte-barillet." },
  { question: "Quelle est la précaution principale lors du démontage du balancier ?", answer: "Ne pas tordre le spiral ni toucher à l'axe du balancier." },
  { question: "Quelle est la fréquence d'alternance du mouvement ETA 6497 ?", answer: "18 000 alternances par heure (2,5 Hz)." },
  { question: "Combien de rubis possède le calibre ETA 6497 ?", answer: "17 rubis." },
  { question: "Quelle est la réserve de marche de ce mouvement ?", answer: "Environ 42 à 46 heures." },
  { question: "Quel est le diamètre du mouvement ETA 6497 ?", answer: "16½ lignes, soit environ 36,6 mm." },
  { question: "Quelle huile utiliser pour le barillet ?", answer: "Une huile pour barillet (ex : Moebius 8217)." },
  { question: "Quelle graisse utiliser pour le ressort moteur ?", answer: "Une graisse spéciale pour ressorts (ex : Moebius 8200)." },
  { question: "Quelle huile pour les pivots du rouage ?", answer: "Une huile synthétique légère (ex : Moebius 9010)." },
  { question: "Quelle huile pour l'échappement ?", answer: "Une huile spéciale échappement (ex : Moebius 9415)." },
  { question: "Quel lubrifiant pour le spiral et le balancier ?", answer: "Aucun. Le spiral ne doit jamais être huilé." },
  { question: "Combien de points de huilage principaux sur ce mouvement ?", answer: "Environ 20 à 25 points selon la configuration." },
  { question: "Comment nettoyer les composants avant remontage ?", answer: "Utiliser une solution de nettoyage horlogère et une machine à ultrasons." },
  { question: "Quel est le couple de serrage recommandé pour les vis ?", answer: "Très faible, juste assez pour maintenir sans forcer." },
  { question: "Comment vérifier l'amplitude du balancier ?", answer: "Utiliser un vibrographe ou une application de timing." },
  { question: "Quelle amplitude est considérée comme correcte ?", answer: "Entre 250° et 300° en position cadran dessus." },
  { question: "Que signifie une amplitude trop faible ?", answer: "Problème de lubrification, de ressort moteur ou d'échappement." },
  { question: "Quel est le rôle de l'ancre ?", answer: "Transmettre l'impulsion du rouage au balancier et bloquer le rouage." },
  { question: "Combien de dents possède la roue d'échappement ?", answer: "15 dents." },
  { question: "Quel est le rôle du plateau de balancier ?", answer: "Porter la cheville d'impulsion qui actionne l'ancre." },
  { question: "Comment régler la mise à l'heure ?", answer: "Ajuster le tirage et la position de la bascule de tirage." },
  { question: "Quelle est la fonction du cliquet de barillet ?", answer: "Empêcher le barillet de tourner en arrière lors du remontage." },
  { question: "Comment tester l'étanchéité après remontage ?", answer: "Utiliser un testeur d'étanchéité à sec si le mouvement est dans un boîtier étanche." },
];

export default function Flashcards6497() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = cards.length;
  const progressPercent = Math.round(((index + 1) / total) * 100);

  const nextCard = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlipped(false);
    setIndex((prev) => (prev + 1) % total);
  };

  const prevCard = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlipped(false);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="bg-transparent text-slate-800 dark:text-gray-200 flex flex-col items-center justify-center pt-2 pb-6 px-4 max-w-4xl mx-auto transition-colors duration-300">
      
      {/* Barre de progression de l'épreuve */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
          <span>Progression de l'évaluation</span>
          <span className="text-amber-600 dark:text-amber-400">
            Question {index + 1} / {total} • {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Carte géante interactive */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-slate-50 dark:bg-slate-950/80 border-2 border-amber-500/70 dark:border-[#E2B44F] rounded-3xl shadow-lg hover:shadow-2xl 
           p-8 md:p-12 text-center w-full max-w-3xl min-h-[300px] flex flex-col items-center justify-between 
           transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="w-full">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            {flipped ? "Protocole & Réponse d'Atelier" : `Question Technique N°${index + 1}`}
          </span>

          <p
            className={`text-xl md:text-3xl leading-relaxed max-w-2xl mx-auto transition-colors duration-200 ${
              flipped
                ? "text-slate-800 dark:text-slate-200 font-medium"
                : "text-amber-800 dark:text-[#E2B44F] font-bold"
            }`}
          >
            {flipped ? cards[index].answer : cards[index].question}
          </p>
        </div>

        {/* Ligne de commandes d'examen */}
        <div
          className="flex justify-center items-center gap-3 sm:gap-4 mt-8 flex-wrap w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={prevCard}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold py-2.5 px-5 rounded-xl transition-colors text-xs sm:text-sm"
          >
            &larr; Précédent
          </button>

          <button
            onClick={() => setFlipped(!flipped)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 dark:bg-[#E2B44F] dark:hover:bg-[#c89b3d] dark:text-black font-bold py-2.5 px-7 rounded-xl transition-all shadow-md hover:shadow-amber-500/20 text-xs sm:text-sm"
          >
            {flipped ? "Voir la question" : "Retourner la carte"}
          </button>

          <button
            onClick={nextCard}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold py-2.5 px-5 rounded-xl transition-colors text-xs sm:text-sm"
          >
            Suivant &rarr;
          </button>
        </div>
      </div>

      <p className="text-slate-500 dark:text-slate-400 mt-6 text-xs text-center italic">
        Cliquez sur la carte ou appuyez sur [Espace] pour la retourner • Touches [&larr; / &rarr;] pour naviguer
      </p>
    </div>
  );
}
