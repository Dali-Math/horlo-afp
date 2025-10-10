"use client";
import { useState } from "react";

const Flashcards6497 = () => {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const cards = [
    { question: "Quelle est la première étape de l'assemblage d'un mouvement ETA 6497 ?", answer: "Inspection et nettoyage de tous les composants avant de commencer l'assemblage" },
    { question: "Comment positionner le pont de balancier ?", answer: "Aligner soigneusement les pivots du balancier avec les trous du pont avant de visser" },
    { question: "Quelle est la fonction du spiral ?", answer: "Réguler les oscillations du balancier pour assurer la précision de la marche" },
    { question: "Comment fixer la roue d'échappement ?", answer: "S'assurer que la roue soit correctement positionnée sur son pivot et qu'elle tourne librement" },
    { question: "Quelle est l'importance du graissage ?", answer: "Le graissage réduit la friction et prolonge la durée de vie du mouvement" },
    { question: "Comment régler l'échappement ?", answer: "Vérifier que l'ancre libère correctement la roue d'échappement à chaque oscillation" },
    { question: "Quelle est la fonction du barillet ?", answer: "Stocker l'énergie du ressort moteur et la transmettre au rouage" },
    { question: "Comment monter le pont de rouage ?", answer: "Aligner les pivots des roues avec les trous du pont et visser fermement" },
    { question: "Quelle est la fonction de la roue de seconde ?", answer: "Transmettre le mouvement à l'aiguille des secondes" },
    { question: "Comment ajuster la tension du spiral ?", answer: "Utiliser la raquette pour modifier la longueur active du spiral" },
    { question: "Quelle est la fonction du rochet ?", answer: "Empêcher le ressort moteur de se détendre de manière incontrôlée" },
    { question: "Comment positionner l'ancre ?", answer: "Centrer l'ancre entre les dents de la roue d'échappement" },
    { question: "Quelle est la fonction du double plateau ?", answer: "Transmettre l'impulsion du spiral à l'ancre" },
    { question: "Comment fixer le pont d'ancre ?", answer: "Aligner le pont avec les pivots de l'ancre et visser soigneusement" },
    { question: "Quelle est l'importance de la platine ?", answer: "La platine sert de base pour fixer tous les autres composants du mouvement" },
    { question: "Comment vérifier le fonctionnement du remontoir ?", answer: "Tourner la couronne et vérifier que le barillet se remonte correctement" },
    { question: "Quelle est la fonction de la roue de couronne ?", answer: "Transmettre le mouvement de remontage au rochet" },
    { question: "Comment monter le pont de balancier ?", answer: "Positionner délicatement le pont sans forcer et visser progressivement" },
    { question: "Quelle est la fonction du pignon de seconde ?", answer: "Entraîner la roue de seconde à partir du rouage" },
    { question: "Comment ajuster l'amplitude du balancier ?", answer: "Modifier la position de la raquette pour changer la longueur active du spiral" },
    { question: "Quelle est la fonction de la chaussée ?", answer: "Entraîner l'aiguille des minutes et transmettre le mouvement au rouage de minuterie" },
    { question: "Comment positionner la roue de minuterie ?", answer: "Aligner correctement avec le pignon de chaussée avant de fixer" },
    { question: "Quelle est la fonction du pignon de remontoir ?", answer: "Transmettre le mouvement de la couronne au mécanisme de remontage" },
    { question: "Comment fixer le cadran ?", answer: "Utiliser les pieds de cadran et s'assurer d'un alignement parfait avec le mouvement" },
    { question: "Quelle est la fonction de la roue de centre ?", answer: "Entraîner l'aiguille des heures et transmettre le mouvement au reste du rouage" },
    { question: "Comment ajuster la position de la raquette ?", answer: "Déplacer délicatement la raquette le long du spiral pour modifier la marche" },
    { question: "Quelle est la fonction du pont de finissage ?", answer: "Maintenir et protéger les roues du rouage de finissage" },
    { question: "Comment vérifier l'entre-pivots ?", answer: "Mesurer la distance entre les trous de pivotage et s'assurer qu'elle correspond aux spécifications" }
  ];

  const currentCard = cards[index];
  const isLastCard = index === cards.length - 1;

  const handleNext = () => {
    if (!isLastCard) {
      setFlipped(false);
      setIndex(index + 1);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] relative">
          {/* Card counter */}
          <div className="text-center text-sm text-gray-500 mb-6">
            Carte {index + 1} sur {cards.length}
          </div>
          
          {/* Card content */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
              {flipped ? currentCard.answer : currentCard.question}
            </div>
          </div>
          
          {/* Buttons container - INSIDE the card */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleFlip}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              {flipped ? 'Voir Question' : 'Retourner'}
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLastCard}
              className={`px-6 py-3 rounded-lg font-medium shadow-md transition-colors ${
                isLastCard
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards6497;
