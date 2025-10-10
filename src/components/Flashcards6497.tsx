"use client";
import React, { useState } from "react";
const cards = [
  { question: "Quelle est la première étape du démontage du mouvement ETA 6497 ?", answer: "Retirer le balancier complet avec précaution." },
  { question: "Quelle est la fonction du pont de rouage ?", answer: "Il maintient en place les pivots des roues du rouage." },
  { question: "Lors du démontage, pourquoi marquer la position des vis ?", answer: "Pour éviter de les interchanger lors du remontage." },
  { question: "Quel outil est utilisé pour démonter le ressort moteur ?", answer: "Un extracteur ou un démonte-barillet." },
  { question: "Quelle est la précaution principale lors du démontage du balancier ?", answer: "Ne pas tordre le spiral ni toucher à l'axe du balancier." },
  { question: "Que faut-il vérifier avant de remonter le train de rouage ?", answer: "La propreté et la libre rotation des roues." },
  { question: "Quel composant doit être lubrifié avec le Moebius 9010 ?", answer: "Les pivots du balancier et de l'ancre." },
  { question: "Que signifie le terme 'remontage' dans un mouvement mécanique ?", answer: "La remise en place et lubrification de chaque élément dans l'ordre inverse du démontage." },
  { question: "Quelle pièce s'installe juste avant le pont d'ancre ?", answer: "L'ancre avec sa cheville et son pont." },
  { question: "Combien de rubis contient le mouvement ETA 6497 ?", answer: "17 rubis." },
  { question: "Pourquoi est-il important d'utiliser une soufflette avant le remontage ?", answer: "Pour éliminer toute poussière et résidu." },
  { question: "Quelle pièce est montée sur la tige de remontoir ?", answer: "La tirette, la bascule et la roue de renvoi." },
  { question: "Comment vérifier le bon fonctionnement du rouage avant de poser l'échappement ?", answer: "Faire tourner légèrement la roue de centre et observer la fluidité." },
  { question: "À quoi sert le rochet ?", answer: "Il transmet la force du ressort au train de rouage." },
  { question: "Quand doit-on huiler les pierres du balancier ?", answer: "Juste avant le montage du balancier complet." },
  { question: "Pourquoi le pont de barillet doit-il être bien serré ?", answer: "Pour garantir la stabilité du ressort moteur." },
  { question: "Quelle est la dernière étape du remontage ?", answer: "Poser le balancier et vérifier les oscillations." },
  { question: "Comment tester le bon fonctionnement du mouvement après remontage ?", answer: "Remonter légèrement et observer la marche du balancier et de l'échappement." },
  { question: "Quelle est la fréquence du mouvement ETA 6497 ?", answer: "18'000 A/h (2,5 Hz)." },
  { question: "Quel est le rôle du contre-pivot du balancier ?", answer: "Réduire les frottements et maintenir le centrage de l'axe." },
  { question: "Quelle huile utilise-t-on pour les pivots de la roue de centre ?", answer: "Moebius 9010 ou une huile fine équivalente." },
  { question: "Quelle est la deuxième étape après avoir retiré le balancier ?", answer: "Retirer le pont d'ancre et l'ancre elle-même." },
  { question: "Pourquoi faut-il démonter le ressort spiral avec précaution ?", answer: "Toute déformation peut compromettre la marche du mouvement." },
  { question: "Combien de tours complets doit-on donner au ressort moteur lors du remontage ?", answer: "Environ 1 à 2 tours pour tester, jamais à fond lors du test." },
  { question: "Comment nettoyer les composants démontés ?", answer: "Utiliser un bain de nettoyage horloger (benzine ou solution dédiée)." },
  { question: "Quelle est la fonction de la roue d'échappement ?", answer: "Elle régule la libération de l'énergie du ressort." },
  { question: "Quel est le diamètre approximatif du mouvement ETA 6497 ?", answer: "36,60 mm (16 1/2 lignes)." },
  { question: "Quelle est l'épaisseur du mouvement ETA 6497 ?", answer: "4,50 mm." },
  { question: "Quelle est la réserve de marche du mouvement ETA 6497 ?", answer: "Environ 46 heures." },
  { question: "Que faut-il faire avant de démonter le barillet ?", answer: "Désarmer complètement le ressort moteur." },
  { question: "Comment positionner l'ancre lors du remontage ?", answer: "Centrer la fourchette entre les goupilles du plateau de balancier." },
  { question: "Quelle est la fonction de la roue de couronne ?", answer: "Elle reçoit la force du remontoir et l'applique au rochet du barillet." },
  { question: "Pourquoi doit-on éviter de toucher les pivots avec les doigts ?", answer: "Les graisses corporelles peuvent altérer la lubrification et causer de la corrosion." },
  { question: "Quel est l'ordre de démontage des ponts ?", answer: "Pont de balancier, pont d'ancre, pont de rouage, pont de barillet." },
  { question: "Comment reconnaître une roue de seconde ?", answer: "Elle possède un long pignon et tourne en 60 secondes." },
  { question: "Quelle est la fonction de la bascule de remontoir ?", answer: "Elle permet de basculer entre le remontage et la mise à l'heure." },
  { question: "Quand doit-on remplacer le ressort moteur ?", answer: "S'il est cassé, oxydé ou s'il a perdu son élasticité." },
  { question: "Comment vérifier l'amplitude du balancier ?", answer: "Avec un vibrographe ou en observant visuellement les oscillations." },
  { question: "Quel est le danger principal lors du démontage du ressort moteur ?", answer: "Le ressort peut se détendre brusquement et causer des blessures." },
  { question: "Quelle est la troisième étape du démontage ?", answer: "Retirer le pont de rouage et dégager les roues du train." },
  { question: "Comment lubrifier correctement un rubis ?", answer: "Appliquer une infime quantité d'huile au centre du rubis avec un oiler." },
  { question: "Pourquoi le mouvement ETA 6497 est-il apprécié en formation ?", answer: "Sa grande taille et sa clarté mécanique facilitent l'apprentissage." },
  { question: "Quelle est la fonction du cliquet ?", answer: "Il empêche le rochet de revenir en arrière et maintient le ressort armé." },
  { question: "Comment stocker les pièces démontées ?", answer: "Dans des godets séparés, propres et étiquetés par groupe fonctionnel." },
  { question: "Quelle pièce connecte le balancier à l'échappement ?", answer: "Le plateau de balancier avec sa cheville." },
  { question: "Que faire si le mouvement ne démarre pas après remontage ?", answer: "Vérifier le positionnement de l'ancre et du balancier, puis la lubrification." },
  { question: "Combien de pièces composent approximativement un ETA 6497 ?", answer: "Environ 130 à 150 pièces selon les variantes." },
  { question: "Quelle est la quatrième étape du démontage ?", answer: "Retirer le pont de barillet et extraire le barillet complet." },
  { question: "Pourquoi faut-il toujours travailler sur un tapis horloger ?", answer: "Pour protéger les pièces, éviter les rayures et empêcher les petites pièces de rouler." },
  { question: "Quelle est la règle d'or du remontage d'un mouvement mécanique ?", answer: "Travailler proprement, méthodiquement, et lubrifier chaque point de friction selon les spécifications." }
];
export default function Flashcards6497() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const nextCard = () => {
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };
  return (
    <div className="bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-2xl shadow-2xl p-8 md:p-12 text-center w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] max-w-4xl min-h-[280px] md:min-h-[320px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]"
      >
        {flipped ? (
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            {cards[index].answer}
          </p>
        ) : (
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#E2B44F] leading-relaxed">
            {cards[index].question}
          </p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] max-w-4xl mt-6 md:mt-8 gap-4 sm:gap-0">
        <button
          onClick={nextCard}
          className="bg-[#E2B44F] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#c89b3d] transition-colors shadow-lg text-base md:text-lg"
        >
          Suivant
        </button>
        <p className="text-sm md:text-base text-[#E2B44F] font-medium">
          Carte {index + 1} sur {cards.length}
        </p>
      </div>
      
      <p className="text-[#8B7355] mt-4 text-xs sm:text-sm text-center">
        Cliquez sur la carte pour voir la réponse
      </p>
    </div>
  );
}
