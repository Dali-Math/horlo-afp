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
    { question: "Comment vérifier l'entre-pivots ?", answer: "Mesurer la distance entre les trous de pivotage et s'assurer qu'elle correspond aux spécifications" },
    { question: "Quelle est la fonction de la bascule de remontoir ?", answer: "Permettre de passer du mode remontage au mode mise à l'heure" },
    { question: "Comment lubrifier les pivots ?", answer: "Appliquer une très petite quantité d'huile horlogère sur chaque pivot avec un huileur" },
    { question: "Quelle est la fonction du tirette ?", answer: "Actionner le mécanisme de mise à l'heure lorsque la couronne est tirée" },
    { question: "Comment régler la marche diurne ?", answer: "Ajuster la position de la raquette et chronométrer sur 24 heures" },
    { question: "Quelle est la fonction de la roue de renvoi ?", answer: "Inverser le sens de rotation entre deux roues du rouage" },
    { question: "Comment contrôler l'épaisseur du mouvement ?", answer: "Utiliser un palmer ou un comparateur pour mesurer précisément" },
    { question: "Quelle est la fonction du coq de balancier ?", answer: "Maintenir le balancier en position et protéger le spiral" },
    { question: "Comment positionner les aiguilles ?", answer: "Aligner les aiguilles sur midi/minuit et presser délicatement sans forcer" },
    { question: "Quelle est la fonction de la virole ?", answer: "Fixer le spiral au pont de balancier" },
    { question: "Comment tester l'étanchéité du boîtier ?", answer: "Utiliser une machine de test d'étanchéité avec les pressions appropriées" },
    { question: "Quelle est la fonction du piton ?", answer: "Fixer l'extrémité extérieure du spiral au coq de balancier" },
    { question: "Comment ajuster l'inclinaison ?", answer: "Tester le mouvement dans différentes positions et ajuster la raquette en conséquence" },
    { question: "Quelle est la fonction de l'ellipse du spiral ?", answer: "Compenser les variations de la force motrice pendant le déroulement" },
    { question: "Comment détecter un choc ?", answer: "Inspecter visuellement les pivots et vérifier l'amplitude du balancier" },
    { question: "Quelle est la fonction du pare-chocs ?", answer: "Protéger les pivots du balancier contre les chocs" },
    { question: "Comment régler l'isochronisme ?", answer: "Ajuster la courbe du spiral pour que la marche soit identique quelle que soit l'amplitude" },
    { question: "Quelle est la fonction de la platine de remontoir ?", answer: "Supporter le mécanisme de remontage et de mise à l'heure" },
    { question: "Comment vérifier le couple du barillet ?", answer: "Utiliser un couple-mètre pour mesurer la force exercée par le ressort moteur" },
    { question: "Quelle est la fonction des rubis ?", answer: "Réduire la friction aux points de pivotage critiques" },
    { question: "Comment effectuer le réglage final ?", answer: "Chronométrer dans plusieurs positions pendant 48-72 heures et ajuster si nécessaire" },
    { question: "Quelle est la fonction de la platine du cadran ?", answer: "Supporter et aligner le cadran avec le mouvement" },
    { question: "Comment conclure l'assemblage d'un ETA 6497 ?", answer: "Effectuer tous les tests de fonctionnement, chronométrer et encaisser le mouvement" }
  ];

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
        onClick={() => setFlipped(!flipped)}
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
          <div className="flex items-center justify-center gap-4 mt-6">
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
