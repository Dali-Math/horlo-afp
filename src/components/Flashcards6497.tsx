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
  { question: "Quelle est la durée de vie moyenne d'un lubrifiant horloger ?", answer: "3 à 5 ans selon les conditions d'utilisation." },
  { question: "Pourquoi éviter de toucher les composants avec les doigts ?", answer: "Pour éviter les traces de gras et la corrosion." },
  { question: "Quel est le rôle du spiral ?", answer: "Réguler les oscillations du balancier et assurer l'isochronisme." },
  { question: "Comment détecter un spiral voilé ?", answer: "Observer le mouvement du balancier : il doit osciller dans un plan parfait." },
  { question: "Que faire si le mouvement ne démarre pas après remontage ?", answer: "Vérifier l'échappement, le balancier et le spiral." },
  { question: "Quel est le nombre de tours du ressort moteur ?", answer: "Variable selon le barillet, généralement 6 à 8 tours complets." },
  { question: "Comment stocker les pièces pendant le démontage ?", answer: "Dans des coupelles ou godets propres, organisés par ordre de démontage." },
  { question: "Quelle est la fonction du pont de balancier ?", answer: "Maintenir l'axe du balancier en position et permettre son oscillation libre." },
  { question: "Comment ajuster la précision de marche ?", answer: "Agir sur la raquette pour modifier la longueur active du spiral." },
  { question: "Quelle est la différence entre avance et retard ?", answer: "Avance : la montre va trop vite. Retard : elle va trop lentement." },
  { question: "Comment corriger une avance de 10 secondes par jour ?", answer: "Déplacer légèrement la raquette vers le signe '-' ou 'R' (retard)." },
  { question: "Quel outil pour retirer le spiral ?", answer: "Une pince à spiral ou brucelles très fines et précises." },
  { question: "Pourquoi le ETA 6497 est-il prisé en horlogerie ?", answer: "Mouvement fiable, robuste, de grande taille et facile à décorer." },
  { question: "Quelle est l'origine historique du calibre 6497 ?", answer: "Dérivé de mouvements de montres de poche Unitas des années 1950." },
  { question: "Quelle est la différence entre ETA 6497 et 6498 ?", answer: "Position de la petite seconde : à 9h (6497) ou à 6h (6498)." },
  { question: "Peut-on modifier la décoration du mouvement ?", answer: "Oui, ajout de perlage, anglage, côtes de Genève, etc." },
  { question: "Quel est le poids approximatif du mouvement ?", answer: "Environ 10 à 12 grammes selon la finition." },
  { question: "Comment vérifier l'usure des pivots ?", answer: "Observation à la loupe : les pivots doivent être lisses et sans marques." },
  { question: "Que faire si un pivot est endommagé ?", answer: "Remplacer la pièce ou faire repivoter par un spécialiste." },
  { question: "Comment détecter un problème d'échappement ?", answer: "Écouter le tic-tac : il doit être régulier. Observer l'amplitude." },
  { question: "Quelle est la tolérance de précision acceptable ?", answer: "±10 à ±30 secondes par jour selon l'usage et l'entretien." },
  { question: "Pourquoi réaliser un test de positions ?", answer: "Pour vérifier la régularité de marche dans différentes positions (cadran dessus, couronne en haut, etc.)." },
  { question: "Comment conserver un mouvement démonté longtemps ?", answer: "Nettoyer et huiler légèrement, stocker dans un endroit sec et à l'abri de la poussière." },
  { question: "Quelle est la règle d'or du remontage horloger ?", answer: "Suivre l'ordre inverse du démontage et vérifier chaque étape." },
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
    <div className="bg-[#0a0a0a] text-gray-200 flex flex-col items-center justify-center pt-8 pb-16 px-4 sm:px-8 lg:px-12 overflow-visible">
      <h2 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-12 text-center">
        Démontage & Remontage — Mouvement ETA 6497
      </h2>
      {/* Carte géante */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-[#1a1a1a] border-2 border-[#E2B44F] rounded-3xl shadow-xl 
           p-6 md:p-10 xl:p-12 text-center w-full sm:w-[90%] md:w-[70%] lg:w-[60%]
           max-w-3xl min-h-[260px] flex flex-col items-center justify-center 
           transition-transform duration-500 hover:scale-[1.01]"

      >
        <p
          className={`text-2xl md:text-3xl xl:text-4xl leading-relaxed max-w-3xl ${
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
            ← Précédent
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
            Suivant →
          </button>
        </div>
      </div>
      <p className="text-[#8B7355] mt-10 text-sm text-center italic">
        Cliquez sur la carte pour la retourner — compatible mobile, tablette et clavier (Entrée, ←, →)
      </p>
    </div>
  );
}
