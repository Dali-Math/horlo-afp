// app/page.tsx - VERSION AMÉLIORÉE AVEC CARTES FLASH
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import AlloyMixer from '@/components/AlliageSimulator';

// Données des cartes flash
const flashcardsData = [
  { id: 0, question: "Quelle est la masse volumique du fer ?", answer: "La masse volumique du fer est de 7,86 Kg/dm³." },
  { id: 1, question: "Quel est le point de fusion du fer ?", answer: "Le point de fusion du fer est de 1535°C." },
  { id: 2, question: "Le fer est un métal obtenu de la nature à l'état pur. Vrai ou faux et pourquoi ?", answer: "Faux, c'est un métal extrait de minéraux très divers comme la magnétite, les oxydes et l'hématite." },
  { id: 3, question: "Quel est le but de la sidérurgie ?", answer: "La sidérurgie a pour but de préparer des alliages fer-carbone, connus sous le nom de fontes et aciers." },
  { id: 4, question: "Quelle est la teneur en carbone d'un alliage pour être considéré comme une fonte ou un acier ?", answer: "La teneur en carbone doit être inférieure à 6,7%." },
  { id: 5, question: "L'acier est un alliage de fer contenant entre _____ et _____ % de carbone.", answer: "0,02% et 2%" },
  { id: 6, question: "Comment la teneur en carbone influence-t-elle la dureté de l'acier ?", answer: "Plus la teneur en carbone est haute, plus l'acier sera dur." },
  { id: 7, question: "Quel est le rôle de l'ajout de petits éléments comme le manganèse ou le molybdène dans l'acier ?", answer: "Ils sont destinés à modifier les propriétés mécaniques, magnétiques ou chimiques de l'acier." },
  { id: 8, question: "Quelle est la caractéristique principale des aciers non-alliés ?", answer: "Ils sont utilisés selon leurs caractéristiques mécaniques, principalement la limite d'élasticité ou de rupture." },
  { id: 9, question: "Dans la classification des aciers non-alliés, à quel usage correspond le type S ?", answer: "Le type S correspond à un usage général de base." },
  { id: 10, question: "Dans la classification des aciers non-alliés, à quel usage correspond le type E ?", answer: "Le type E est destiné à la construction mécanique." },
  { id: 11, question: "Comment définit-on les aciers faiblement alliés en termes de composition ?", answer: "La somme des éléments d'alliage totaux est inférieure à 5%." },
  { id: 12, question: "Citez trois éléments d'alliage couramment utilisés dans les aciers faiblement alliés.", answer: "Le nickel, le chrome, le molybdène, le manganèse ou le silicium." },
  { id: 13, question: "Comment définit-on les aciers fortement alliés en termes de composition ?", answer: "La somme des éléments d'alliage totaux est supérieure à 5%." },
  { id: 14, question: "Quelle est la teneur minimale en chrome pour qu'un acier soit considéré comme inoxydable ?", answer: "L'acier inoxydable contient au moins 12% de chrome." },
  { id: 15, question: "En horlogerie, pourquoi le taux de nickel dans l'acier inoxydable a-t-il été diminué et par quoi a-t-il été remplacé ?", answer: "Il a été diminué pour éviter les allergies et a été remplacé par du molybdène." },
  { id: 16, question: "Citez trois qualités recherchées dans un acier destiné à l'horlogerie.", answer: "Résistance à la corrosion, non-magnétique, bonne usinabilité, déformable à froid, excellentes propriétés de polissage, couleur uniforme." },
  { id: 17, question: "Quelle est la différence entre la métallurgie et la sidérurgie ?", answer: "La métallurgie concerne l'obtention de tous les métaux, tandis que la sidérurgie se concentre spécifiquement sur le fer, les fontes et les aciers." },
  { id: 18, question: "Quelles sont les quatre phases de la métallurgie ?", answer: "Extraction du minerai, préparation de ce minerai, extraction du métal et affinage, et mise en forme des produits." },
  { id: 19, question: "Comment appelle-t-on la matière sans intérêt économique qui entoure les minerais dans leurs gisements ?", answer: "La gangue." },
  { id: 20, question: "En quoi consiste le criblage dans la préparation du minerai ?", answer: "Le criblage consiste à classer les morceaux de minerais suivant leur grosseur." },
  { id: 21, question: "Quelle est la masse volumique du chrome ?", answer: "La masse volumique du chrome est de 7,2 Kg/dm³." },
  { id: 22, question: "Quels sont la teneur en chrome et en nickel d'un acier inoxydable 18-10 ?", answer: "Il contient 18% de chrome (Cr) et 10% de nickel (Ni)." },
  { id: 23, question: "Quel est le point de fusion de l'aluminium ?", answer: "Le point de fusion de l'aluminium est de 660°C." },
  { id: 24, question: "À partir de quel minerai l'aluminium est-il extrait ?", answer: "L'aluminium est extrait de la bauxite." },
  { id: 25, question: "Comment s'appelle la couche protectrice qui se forme sur l'aluminium au contact de l'air, obtenue par électrolyse ?", answer: "Cette couche s'appelle l'anodisation." },
  { id: 26, question: "Quelle est la masse volumique du titane ?", answer: "La masse volumique du titane est de 4,54 Kg/dm³." },
  { id: 27, question: "De quels minéraux le titane est-il principalement extrait ?", answer: "Il est extrait de l'ilménite et du rutile." },
  { id: 28, question: "Pourquoi le titane est-il particulièrement apprécié en horlogerie par rapport à l'acier ?", answer: "Car sa masse volumique est plus basse de 45% par rapport à l'acier." },
  { id: 29, question: "Quel est le point de fusion du nickel ?", answer: "Le point de fusion du nickel est de 1455°C." },
  { id: 30, question: "Qu'est-ce que le nickelage ?", answer: "Le nickelage consiste à déposer une fine couche de nickel sur la surface des pièces en métaux ferreux pour les protéger de la corrosion." },
  { id: 31, question: "Définition : Invar", answer: "Il s'agit d'un alliage de fer et de nickel à 36% utilisé en horlogerie pour sa faible déformation dimensionnelle." },
  { id: 32, question: "Quel métal est le meilleur conducteur de chaleur et d'électricité après l'argent ?", answer: "Le cuivre." },
  { id: 33, question: "Comment s'appelle la fine couche d'oxydation qui se forme sur le cuivre et le protège ?", answer: "Elle s'appelle le vert-de-gris." },
  { id: 34, question: "Quelle est la masse volumique du zinc ?", answer: "La masse volumique du zinc est de 7,14 Kg/dm³." },
  { id: 35, question: "Quelle est la propriété du zinc à basse température ?", answer: "Il est cassant à basse température." },
  { id: 36, question: "Quel est le point de fusion de l'étain ?", answer: "Le point de fusion de l'étain est d'environ 231,9°C." },
  { id: 37, question: "Qu'est-ce que l'étamage ?", answer: "C'est le dépôt d'étain à l'intérieur des boîtes de conserve." },
  { id: 38, question: "Quel métal possède le point de fusion le plus élevé (3410 °C) ?", answer: "Le tungstène." },
  { id: 39, question: "Dans quel domaine les outils de coupe en carbure de tungstène (WC) sont-ils utilisés ?", answer: "Ils sont utilisés comme outils de coupe et comme élément d'alliage dans les aciers rapides." },
  { id: 40, question: "Quelle est la masse volumique du plomb ?", answer: "La masse volumique du plomb est de 11,34 Kg/dm³." },
  { id: 41, question: "Pourquoi les vapeurs de plomb sont-elles dangereuses ?", answer: "Les vapeurs de plomb sont toxiques." },
  { id: 42, question: "Le laiton est un alliage de _____ et de _____.", answer: "cuivre et zinc" },
  { id: 43, question: "Quelle est la composition typique du laiton utilisé en horlogerie ?", answer: "Cuivre (58%), Zinc (39%), Plomb (3%)." },
  { id: 44, question: "Comment la teneur en zinc affecte-t-elle la couleur du laiton ?", answer: "La couleur du laiton peut changer du rouge au jaune suivant la teneur en zinc." },
  { id: 45, question: "Quel est le rôle du zinc dans un alliage de laiton ?", answer: "Le zinc augmente la dureté et la résistance mécanique." },
  { id: 46, question: "Le bronze est un alliage de cuivre et d'_____.", answer: "étain" },
  { id: 47, question: "Quelle est la teneur en cuivre typique du bronze ?", answer: "Le bronze contient environ 95% de cuivre." },
  { id: 48, question: "Le maillechort est un alliage de quels trois métaux ?", answer: "C'est un alliage de nickel, de cuivre et de zinc." },
  { id: 49, question: "Quelle est la principale différence entre le maillechort et le laiton ?", answer: "Le maillechort possède une résistance mécanique supérieure à celle du laiton." },
  { id: 50, question: "Pour quelles pièces de mouvement d'horlogerie l'acier est-il fréquemment utilisé ?", answer: "L'acier est utilisé pour les ressorts, les axes, les pivots et les vis." },
  { id: 51, question: "Quel matériau est principalement utilisé pour les platines et les ponts dans les montres classiques ?", answer: "Le laiton." },
  { id: 52, question: "Pourquoi le laiton utilisé pour les mouvements de montre est-il souvent recouvert d'un traitement galvanique ?", answer: "Pour la décoration et la protection, avec des placages d'or, de nickel ou de rhodium." },
  { id: 53, question: "Dans quel type de montres trouve-t-on des platines et des ponts en maillechort ?", answer: "On les trouve dans les montres artisanales et haut de gamme." },
  { id: 54, question: "Quel avantage offre le maillechort pour les composants gravés à la main ?", answer: "Sa dureté moyenne se prête bien à la gravure décorative." },
  { id: 55, question: "Pour quel type de montre l'aluminium est-il couramment utilisé pour les boîtiers ?", answer: "Il est utilisé pour les boîtiers de montres connectées ou de sport." },
  { id: 56, question: "Dans les montres à quartz, quel est l'avantage d'utiliser de l'aluminium pour les composants internes ?", answer: "Il allège le mouvement pour améliorer la durée de vie de la pile." },
  { id: 57, question: "Quel matériau est utilisé pour les engrenages dans certaines montres à quartz pour être économique et silencieux ?", answer: "Le plastique ou les composites." },
  { id: 58, question: "Citez un exemple de montre dont le mouvement est quasi entièrement en plastique.", answer: "La Swatch SISTEM51." },
  { id: 59, question: "Classez les matériaux suivants du plus lourd au plus léger : acier, aluminium, plastique.", answer: "Acier (lourd), aluminium (très léger), plastique (très léger)." },
  { id: 60, question: "Quel matériau d'horlogerie a une dureté très élevée mais est difficile à usiner ?", answer: "L'acier." },
  { id: 61, question: "Comparez la résistance à la corrosion de l'acier, du laiton et du maillechort.", answer: "Acier (excellente), maillechort (très bonne), laiton (bonne si traité)." },
  { id: 62, question: "Quel est le principal inconvénient de l'aluminium en horlogerie ?", answer: "Il est moins résistant et facilement rayable." },
  { id: 63, question: "Quel est le principal avantage du laiton en horlogerie ?", answer: "Il est facile à travailler et économique." },
  { id: 64, question: "Quel avantage esthétique le maillechort offre-t-il par rapport au laiton ?", answer: "Il a une belle finition naturelle et n'a pas besoin de traitement de surface." },
  { id: 65, question: "Pour quel type de montres le plastique est-il un matériau de choix pour le boîtier ?", answer: "Pour les montres à quartz, connectées ou pour enfants." },
  { id: 66, question: "Quel est le principal inconvénient du plastique en tant que matériau horloger ?", answer: "Il est moins prestigieux et peu durable dans le temps." },
  { id: 67, question: "Quel alliage de fer est connu pour être mou, ductile et malléable à l'état pur ?", answer: "Le fer pur." },
  { id: 68, question: "Laquelle de ces propriétés n'appartient pas au titane : léger, bonne résistance à la chaleur, magnétique, bonne résistance chimique ?", answer: "Magnétique (le titane est amagnétique)." },
  { id: 69, question: "La fine couche d'oxydation sur le cuivre, provoquée par l'air humide, s'appelle le _____.", answer: "vert-de-gris" },
  { id: 70, question: "Quel métal est connu pour être un allergène et est donc de moins en moins utilisé en contact direct avec la peau en horlogerie ?", answer: "Le nickel." },
  { id: 71, question: "Quel métal est principalement utilisé pour la protection contre les rayons X ?", answer: "Le plomb." },
  { id: 72, question: "Pour quel composant d'une montre de plongée l'aluminium est-il souvent utilisé ?", answer: "Pour les lunettes colorées rotatives." },
  { id: 73, question: "Quel est le coût relatif du maillechort par rapport au laiton ?", answer: "Le maillechort est plus coûteux que le laiton." }
];

// Composant pour les cartes flash
const FlashcardsComponent = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState('all'); // all, materials, metallurgy, watchmaking
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les cartes en fonction du filtre et du terme de recherche
  const filteredCards = flashcardsData.filter(card => {
    const matchesFilter = filter === 'all' || 
      (filter === 'materials' && (card.question.includes('masse volumique') || card.question.includes('point de fusion') || card.question.includes('alliage'))) ||
      (filter === 'metallurgy' && (card.question.includes('sidérurgie') || card.question.includes('métallurgie') || card.question.includes('minerai'))) ||
      (filter === 'watchmaking' && (card.question.includes('horlogerie') || card.question.includes('montre') || card.question.includes('mouvement')));
    
    const matchesSearch = card.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         card.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const currentCard = filteredCards[currentCardIndex];
  
  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredCards.length);
    setShowAnswer(false);
    setIsFlipped(false);
  };
  
  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + filteredCards.length) % filteredCards.length);
    setShowAnswer(false);
    setIsFlipped(false);
  };
  
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    setIsFlipped(!isFlipped);
  };
  
  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIndex);
    setShowAnswer(false);
    setIsFlipped(false);
  };
  
  useEffect(() => {
    if (currentCardIndex >= filteredCards.length && filteredCards.length > 0) {
      setCurrentCardIndex(0);
    }
  }, [filteredCards, currentCardIndex]);
  
  return (
    <div className="section-card p-8 mb-8">
      <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Matériaux Fiches</h2>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-400">D'après 1 source</p>
      
      {/* Filtres et recherche */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'materials' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter('materials')}
          >
            Matériaux
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'metallurgy' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter('metallurgy')}
          >
            Métallurgie
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'watchmaking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilter('watchmaking')}
          >
            Horlogerie
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Carte flash */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative h-64 md:h-80">
          <div 
            className={`absolute inset-0 w-full h-full transition-all duration-500 transform-gpu preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={toggleAnswer}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Face avant (question) */}
            <div 
              className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Question {currentCardIndex + 1} / {filteredCards.length}</p>
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-100">
                  {currentCard?.question}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Cliquez pour voir la réponse</p>
            </div>
            
            {/* Face arrière (réponse) */}
            <div 
              className="absolute inset-0 w-full h-full bg-blue-600 dark:bg-blue-700 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center rotate-y-180 backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="text-center">
                <p className="text-sm text-blue-100 mb-2">Réponse</p>
                <p className="text-xl md:text-2xl font-medium text-white">
                  {currentCard?.answer}
                </p>
              </div>
              <p className="text-sm text-blue-100 mt-4">Cliquez pour voir la question</p>
            </div>
          </div>
        </div>
        
        {/* Bouton Afficher la réponse */}
        {!isFlipped && (
          <div className="text-center mt-4">
            <button 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              onClick={toggleAnswer}
            >
              Afficher la réponse
            </button>
          </div>
        )}
      </div>
      
      {/* Contrôles de navigation */}
      <div className="flex justify-center gap-4 mb-4">
        <button 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={prevCard}
          disabled={filteredCards.length <= 1}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Précédent
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={randomCard}
          disabled={filteredCards.length <= 1}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Aléatoire
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
          onClick={nextCard}
          disabled={filteredCards.length <= 1}
        >
          Suivant
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Indicateur de progression */}
      <div className="max-w-2xl mx-auto">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          {currentCardIndex + 1} / {filteredCards.length}
        </p>
      </div>
      
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default function HomePage(): JSX.Element {
  const [mermaidReady, setMermaidReady] = useState(false);

  const initializeMermaidControls = useCallback(() => {
    const containers = document.querySelectorAll<HTMLElement>('.mermaid-container');
    
    containers.forEach(container => {
      const mermaidElement = container.querySelector<HTMLElement>('.mermaid');
      if (!mermaidElement) return;

      let scale = 1;
      let isDragging = false;
      let startX = 0, startY = 0, translateX = 0, translateY = 0;
      let isTouch = false;
      let touchStartTime = 0;
      let initialDistance = 0;
      let initialScale = 1;
      let isPinching = false;

      const zoomInBtn = container.querySelector<HTMLElement>('.zoom-in');
      const zoomOutBtn = container.querySelector<HTMLElement>('.zoom-out');
      const resetBtn = container.querySelector<HTMLElement>('.reset-zoom');
      const fullscreenBtn = container.querySelector<HTMLElement>('.fullscreen');

      const updateTransform = () => {
        mermaidElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        container.classList.toggle('zoomed', scale > 1);
        mermaidElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      };

      zoomInBtn?.addEventListener('click', () => {
        scale = Math.min(scale * 1.25, 4);
        updateTransform();
      });

      zoomOutBtn?.addEventListener('click', () => {
        scale = Math.max(scale / 1.25, 0.3);
        if (scale <= 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      });

      resetBtn?.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      });

      fullscreenBtn?.addEventListener('click', () => {
        container.requestFullscreen?.();
      });

      const getTouchDistance = (touch1: Touch, touch2: Touch) => {
        return Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      };

      const handleMouseDown = (e: MouseEvent) => {
        if (isTouch) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        updateTransform();
        e.preventDefault();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && !isTouch) {
          translateX = e.clientX - startX;
          translateY = e.clientY - startY;
          updateTransform();
        }
      };

      const handleMouseUp = () => {
        if (isDragging && !isTouch) {
          isDragging = false;
          updateTransform();
        }
      };

      mermaidElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);

      mermaidElement.addEventListener('touchstart', (e: TouchEvent) => {
        isTouch = true;
        touchStartTime = Date.now();

        if (e.touches.length === 1) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        } else if (e.touches.length === 2) {
          isPinching = true;
          isDragging = false;
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          initialDistance = getTouchDistance(touch1, touch2);
          initialScale = scale;
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchmove', (e: TouchEvent) => {
        if (e.touches.length === 1 && isDragging && !isPinching) {
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform();
        } else if (e.touches.length === 2 && isPinching) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = getTouchDistance(touch1, touch2);
          if (initialDistance > 0) {
            const newScale = Math.min(Math.max(
              initialScale * (currentDistance / initialDistance),
              0.3
            ), 4);
            scale = newScale;
            updateTransform();
          }
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchend', (e: TouchEvent) => {
        if (e.touches.length === 0) {
          isDragging = false;
          isPinching = false;
          initialDistance = 0;
          setTimeout(() => { isTouch = false; }, 100);
        } else if (e.touches.length === 1 && isPinching) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        }
        updateTransform();
      });

      container.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(scale * delta, 0.3), 4);
        if (newScale !== scale) {
          const scaleDiff = newScale / scale;
          translateX = translateX * scaleDiff;
          translateY = translateY * scaleDiff;
          scale = newScale;
          if (scale <= 1) {
            translateX = 0;
            translateY = 0;
          }
          updateTransform();
        }
      });

      updateTransform();
    });
  }, []);

  useEffect(() => {
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id], div[id]');
      const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
      
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('bg-yellow-500', 'text-black', 'dark:bg-yellow-600');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('bg-yellow-500', 'dark:bg-yellow-600', 'text-black');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mermaidReady) return;

    const init = () => {
      if (typeof window !== 'undefined' && (window as any).mermaid) {
        (window as any).mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f8f6f0',
            primaryTextColor: '#1a1208',
            primaryBorderColor: '#2c1810',
            lineColor: '#8b7355',
            secondaryColor: '#ffffff',
            tertiaryColor: '#fef3c7',
            background: '#ffffff',
            mainBkg: '#f8f6f0',
            secondBkg: '#ffffff',
            tertiaryBkg: '#fef3c7',
            nodeBorder: '#2c1810',
            clusterBkg: '#f9fafb',
            defaultLinkColor: '#8b7355',
            titleColor: '#1a1208',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#1a1208'
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            padding: 20
          },
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px'
        });

        (window as any).mermaid.init(undefined, '.mermaid');
        
        setTimeout(initializeMermaidControls, 500);
      }
    };

    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
      return () => window.removeEventListener('load', init);
    }
  }, [mermaidReady, initializeMermaidControls]);

  return (
    <>
      <Head>
        <title>Guide Complet des Métaux en Horlogerie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        <Script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" strategy="afterInteractive" onLoad={() => setMermaidReady(true)} />
        
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </Head>

      <style jsx global>{`
        :root {
          --color-primary: #2c1810;
          --color-secondary: #8b7355;
          --color-accent: #a68b5b;
          --color-light: #f8f6f0;
          --color-dark: #1a1208;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--color-light);
          color: var(--color-dark);
          line-height: 1.7;
          overflow-x: hidden;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1a1a1a;
            color: #e5e5e5;
          }
        }
        
        .serif-heading {
          font-family: 'Playfair Display', serif;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%);
        }
        
        .toc-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: var(--color-dark);
          color: var(--color-light);
          overflow-y: auto;
          z-index: 1000;
          padding: 2rem 1.5rem;
          border-right: 3px solid var(--color-accent);
        }
        
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }
        
        .toc-link {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--color-light);
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .toc-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-left-color: var(--color-accent);
          transform: translateX(4px);
        }
        
        .section-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .section-card {
            background: #2a2a2a;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-color: #444;
          }
        }
        
        .citation {
          display: inline-block;
          background: var(--color-accent);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          text-decoration: none;
          margin: 0 0.25rem;
          transition: all 0.3s ease;
        }
        
        .citation:hover {
          background: var(--color-primary);
          transform: scale(1.05);
        }
        
        .chart-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .chart-container {
            background: #2a2a2a;
          }
        }
        
        .pull-quote {
          border-left: 4px solid var(--color-accent);
          background: rgba(166, 139, 91, 0.05);
          padding: 2rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.125rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .pull-quote {
            background: rgba(166, 139, 91, 0.15);
          }
        }
        
        .mermaid-container {
          display: flex;
          justify-content: center;
          min-height: 300px;
          max-height: 800px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-container {
            background: #2a2a2a;
            border-color: #444;
          }
        }

        .mermaid-container .mermaid {
          width: 100%;
          max-width: 100%;
          height: 100%;
          cursor: grab;
          transition: transform 0.3s ease;
          transform-origin: center center;
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .mermaid-container .mermaid svg {
          max-width: 100%;
          height: 100%;
          display: block;
          margin: 0 auto;
        }

        .mermaid-container .mermaid:active {
          cursor: grabbing;
        }

        .mermaid-container.zoomed .mermaid {
          height: 100%;
          width: 100%;
          cursor: grab;
        }

        .mermaid-controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 10px;
          z-index: 20;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-controls {
            background: rgba(42, 42, 42, 0.95);
          }
        }

        .mermaid-control-btn {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
          font-size: 14px;
          min-width: 36px;
          height: 36px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn {
            background: #3a3a3a;
            border-color: #555;
            color: #e5e5e5;
          }
        }

        .mermaid-control-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-1px);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn:hover {
            background: #4a4a4a;
          }
        }

        .mermaid-control-btn:active {
          transform: scale(0.95);
        }

        .mermaid .node rect,
        .mermaid .node circle,
        .mermaid .node ellipse,
        .mermaid .node polygon {
          stroke-width: 2px;
          stroke: var(--color-primary);
        }
        
        .mermaid .node .label {
          color: var(--color-dark) !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .mermaid .edgeLabel {
          background-color: rgba(255, 255, 255, 0.9) !important;
          color: var(--color-dark) !important;
          font-weight: 500 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          font-size: 11px !important;
        }
        
        .mermaid .edge-thickness-normal {
          stroke-width: 2px;
        }
        
        .mermaid .edge-pattern-solid {
          stroke: var(--color-secondary);
        }
        
        .mermaid .node[class*="fill-"] .label {
          color: var(--color-dark) !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9) !important;
        }
        
        .mermaid .node[style*="fill:"] .label {
          color: var(--color-dark) !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9) !important;
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 2rem;
          height: 60vh;
        }
        
        .bento-item {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
        }
        
        .bento-hero {
          grid-row: 1 / 3;
          background: linear-gradient(135deg, rgba(44, 24, 16, 0.8) 0%, rgba(139, 115, 85, 0.6) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .bento-summary {
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .bento-summary {
            background: #2a2a2a;
          }
        }
        
        .bento-visual {
          background: linear-gradient(45deg, var(--color-accent), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          font-style: italic;
          color: white;
          text-align: center;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          z-index: 2;
          position: relative;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          margin-top: 1rem;
          z-index: 2;
          position: relative;
        }
        
        .material-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin: 1.5rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-left: 4px solid var(--color-accent);
          transition: transform 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
          .material-card {
            background: #2a2a2a;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
        }
        
        .material-card:hover {
          transform: translateY(-4px);
        }
        
        .comparison-table {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table {
            background: #2a2a2a;
          }
        }
        
        .comparison-table th {
          background: var(--color-primary);
          color: white;
          padding: 1rem;
          font-weight: 600;
        }
        
        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table td {
            border-bottom-color: rgba(255, 255, 255, 0.1);
          }
        }
        
        .comparison-table tr:hover {
          background: rgba(166, 139, 91, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table tr:hover {
            background: rgba(166, 139, 91, 0.15);
          }
        }

        /* BOUTON FLOTTANT */
        .floating-back-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 1024px) {
          .toc-fixed {
            display: none;
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
          }
          
          .bento-hero {
            grid-row: 1;
            padding: 3rem 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .mermaid-control-btn:not(.reset-zoom) {
            display: none;
          }
          .mermaid-controls {
            top: auto;
            bottom: 15px;
            right: 15px;
          }

          .floating-back-btn {
            bottom: 20px;
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .bento-hero {
            padding: 2rem 1rem;
          }

          .bento-summary h3 {
            font-size: 1.5rem;
          }

          .bento-summary p {
            font-size: 0.95rem;
          }

          .bento-summary ul li {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .bento-summary h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Fixed Table of Contents */}
      <nav className="toc-fixed">
        <h3 className="serif-heading text-xl font-bold mb-6 text-center border-b border-gray-600 pb-4">Table des Matières</h3>
        <div className="space-y-2">
          <a href="#introduction" className="toc-link"><i className="fas fa-play-circle mr-2"></i>Introduction</a>
          <a href="#metaux-precision" className="toc-link"><i className="fas fa-cog mr-2"></i>Métaux de Précision</a>
          <div className="ml-4 space-y-1">
            <a href="#acier" className="toc-link text-sm"><i className="fas fa-circle mr-2"></i>Acier Inoxydable</a>
            <a href="#titane" className="toc-link text-sm"><i className="fas fa-feather mr-2"></i>Titane</a>
            <a href="#alliages-cuivreux" className="toc-link text-sm"><i className="fas fa-coins mr-2"></i>Alliages Cuivreux</a>
          </div>
          <a href="#metaux-precieux" className="toc-link"><i className="fas fa-gem mr-2"></i>Métaux Précieux</a>
          <div className="ml-4 space-y-1">
            <a href="#or" className="toc-link text-sm"><i className="fas fa-crown mr-2"></i>Or</a>
            <a href="#platine" className="toc-link text-sm"><i className="fas fa-star mr-2"></i>Platine</a>
          </div>
          <a href="#materiaux-innovants" className="toc-link"><i className="fas fa-rocket mr-2"></i>Matériaux Innovants</a>
          <div className="ml-4 space-y-1">
            <a href="#ceramique" className="toc-link text-sm"><i className="fas fa-shield-alt mr-2"></i>Céramique</a>
            <a href="#bronze" className="toc-link text-sm"><i className="fas fa-mountain mr-2"></i>Bronze</a>
            <a href="#avant-garde" className="toc-link text-sm"><i className="fas fa-atom mr-2"></i>Avant-Garde</a>
          </div>
          <a href="#techniques-comparatifs" className="toc-link"><i className="fas fa-chart-bar mr-2"></i>Techniques &amp; Comparatifs</a>
          <a href="#pdf-reference" className="toc-link"><i className="fas fa-file-pdf mr-2"></i>PDF de Référence</a>
          <a href="#flashcards" className="toc-link"><i className="fas fa-clone mr-2"></i>Cartes Flash</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section with Bento Layout */}
        <section className="p-8">
          <div className="bento-grid">
            <div className="bento-item bento-hero">
              <img 
                src="https://kimi-web-img.moonshot.cn/img/www.swisswatchexpo.com/23238b338e72f54fde90c79882e75973de8cb62b.png" 
                alt="Close-up macro photograph of luxury Swiss watch movement with metallic components" 
                className="absolute inset-0 w-full h-full object-cover opacity-30" 
              />
              <div className="relative z-10">
                <h1 className="hero-title serif-heading">Guide Complet des Métaux</h1>
                <p className="hero-subtitle">L&apos;Art et la Science des Matériaux Horlogers</p>
              </div>
            </div>

            <div className="bento-item bento-summary">
              <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Résumé Exécutif</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Une exploration approfondie des métaux et alliages utilisés en horlogerie, de l&apos;acier inoxydable aux métaux précieux, en passant par les matériaux innovants comme le titane et la céramique.</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 7 matériaux principaux analysés</li>
                <li>• Propriétés mécaniques comparées</li>
                <li>• Applications industrielles détaillées</li>
                <li>• Ressources pédagogiques intégrées</li>
              </ul>
            </div>

            <div className="bento-item bento-visual">
              <div className="text-center text-white">
                <i className="fas fa-clock text-6xl mb-4 opacity-80"></i>
                <p className="text-lg font-medium">L&apos;union du savoir-faire traditionnel et de l&apos;innovation moderne</p>
              </div>
            </div>
          </div>

          {/* BOUTON RETOUR EN HAUT - Option 1 */}
          <div className="mt-8">
            <Link 
              href="/materiaux" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white rounded-xl hover:from-gray-600 hover:to-gray-800 dark:hover:from-gray-500 dark:hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour aux Matériaux</span>
            </Link>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="introduction" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Introduction aux Matériaux Horlogers</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Vue d&apos;ensemble des métaux et alliages</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;horlogerie, à l&apos;intersection de l&apos;art et de la science, repose sur une sélection rigoureuse des matériaux pour créer des garde-temps à la fois fonctionnels et esthétiques <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Chaque métal ou alliage joue un rôle spécifique, dicté par ses propriétés physiques, chimiques et mécaniques.</p>
                <p className="text-gray-700 dark:text-gray-300">Les matériaux les plus couramment utilisés vont des métaux communs comme <strong>l&apos;acier inoxydable</strong>, le <strong>laiton</strong> et le <strong>maillechort</strong>, aux métaux précieux comme <strong>l&apos;or</strong> et le <strong>platine</strong>, en passant par des matériaux innovants comme le <strong>titane</strong>, la <strong>céramique</strong> et le <strong>bronze</strong> <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
              </div>

              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Importance de la sélection des matériaux</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">La sélection des matériaux en horlogerie est un processus critique qui influence directement la <strong>performance, la durabilité, l&apos;esthétique et le coût</strong> d&apos;une montre. Chaque composant, du boîtier aux plus petits rouages, exige des propriétés spécifiques.</p>
                <p className="text-gray-700 dark:text-gray-300">Par exemple, le boîtier, qui protège le mouvement, doit être robuste et résistant à la corrosion, ce qui fait de l&apos;acier inoxydable un choix populaire <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Cependant, pour les personnes sensibles au nickel, le titane, qui est hypoallergénique, est une alternative supérieure <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html" className="citation" target="_blank" rel="noopener noreferrer">[355]</a>.</p>
              </div>
            </div>

            <div className="pull-quote text-gray-800 dark:text-gray-100">
              "La compréhension de ces matériaux est essentielle pour les élèves en formation horlogère et les passionnés, car elle éclaire les choix techniques et esthétiques des horlogers."
            </div>
          </div>
        </section>

        {/* Métaux de Précision Section */}
        <section id="metaux-precision" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Les Métaux de Précision : Propriétés et Applications</h2>

            {/* Acier Inoxydable */}
            <div id="acier" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">L&apos;Acier Inoxydable : Le Matériau de Base</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Composition et alliages</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">Les deux principaux alliages sont <strong>l&apos;acier 316L</strong> et <strong>l&apos;acier 904L</strong>, tous deux appartenant à la famille des aciers austénitiques <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf" className="citation" target="_blank" rel="noopener noreferrer">[325]</a>
                    <a href="https://www.chrono24.fr/magazine/durables-elegantes-et-intemporelles-quelle-est-lorigine-des-montres-en-acier-inoxydable-p_118021/" className="citation" target="_blank" rel="noopener noreferrer">[338]</a>.
                  </p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>316L:</strong> 16-18% Cr, 10-14% Ni, 2-3% Mo</li>
                    <li><strong>904L:</strong> 19-23% Cr, 23-28% Ni, 4-5% Mo, 1-2% Cu</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Propriétés mécaniques</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">Les aciers austénitiques offrent une excellente résistance à la corrosion, une facilité de mise en forme et un rendu esthétique variable selon la finition <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf" className="citation" target="_blank" rel="noopener noreferrer">[325]</a>.</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>Dureté 316L:</strong> ~250 HV</li>
                    <li><strong>Durcissement surface:</strong> jusqu&apos;à 1200 HV</li>
                    <li><strong>Résistance corrosion:</strong> Excellente</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Applications</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">L&apos;acier inoxydable est le matériau de prédilection pour les boîtiers et les bracelets de montres, grâce à sa combinaison unique de robustesse et d&apos;esthétique polyvalente <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>316L:</strong> Montres de sport et classiques</li>
                    <li><strong>904L:</strong> Montres de plongée et haut de gamme</li>
                    <li><strong>Rolex:</strong> Oystersteel (904L)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Titane */}
            <div id="titane" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Le Titane : Légèreté et Performance</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Caractéristiques uniques</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le titane s&apos;est imposé comme un matériau de choix dans l&apos;industrie horlogère, en particulier pour les montres techniques et sportives <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Avantages clés:</h5>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>• <strong>Légèreté:</strong> 45% plus léger que l&apos;acier</li>
                      <li>• <strong>Hypoallergénique:</strong> Idéal pour peaux sensibles</li>
                      <li>• <strong>Résistance corrosion:</strong> Supérieure à l&apos;acier</li>
                      <li>• <strong>Densité:</strong> ~4,51 g/cm³ vs ~7,8 g/cm³ (acier)</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Comparaison avec l&apos;acier</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Caractéristique</th>
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Titane</th>
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Acier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Poids</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Très léger</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Lourd</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Résistance corrosion</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Excellente</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Bonne</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Biocompatibilité</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Hypoallergénique</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Peut contenir Ni</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 dark:text-gray-300">Prix</td>
                          <td className="p-2 text-red-600 dark:text-red-400">Plus cher</td>
                          <td className="p-2 text-gray-700 dark:text-gray-300">Abordable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Source: <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html" className="citation" target="_blank" rel="noopener noreferrer">[355]</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Alliages Cuivreux */}
            <div id="alliages-cuivreux" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Les Alliages Cuivreux Traditionnels</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Le Laiton : Utilisation historique</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le laiton, un alliage de cuivre et de zinc, est l&apos;un des matériaux les plus historiquement significatifs en horlogerie <a href="https://www.machining-custom.com/fr/blog/brass-vs-aluminum-vs-stainless-steel.html" className="citation" target="_blank" rel="noopener noreferrer">[366]</a>.</p>
                  <ul className="space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Composition:</strong> Cuivre (Cu) + Zinc (Zn)</li>
                    <li><strong>Avantages:</strong> Excellente usinabilité, bonne résistance à la corrosion</li>
                    <li><strong>Applications:</strong> Platines, ponts, rouages historiques</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Utilisé traditionnellement pour la &quot;cage&quot; ou le &quot;bâti&quot; du mouvement <a href="https://fr.wikipedia.org/wiki/M%C3%A9canisme_(horlogerie)" className="citation" target="_blank" rel="noopener noreferrer">[349]</a>.</p>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Le Maillechort : Composition et avantages</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le maillechort, également connu sous le nom d&apos;argentan, est un alliage de cuivre, de nickel et de zinc <a href="https://inside.code41watches.com/fr/les-differents-materiaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[214]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Composition typique:</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Cuivre:</strong> 45-65%</li>
                      <li>• <strong>Nickel:</strong> 5-25%</li>
                      <li>• <strong>Zinc:</strong> 20-45%</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Résistance supérieure à la corrosion et rigidité accrue par rapport au laiton <a href="https://www.tartaix.com/content/103-maillechort" className="citation" target="_blank" rel="noopener noreferrer">[329]</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Métaux Précieux Section */}
        <section id="metaux-precieux" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Les Métaux Précieux en Horlogerie de Luxe</h2>

            {/* Or */}
            <div id="or" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">L&apos;Or : Un Symbole de Luxe</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Alliages d&apos;or</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;or est utilisé sous forme d&apos;alliage pour améliorer la dureté et la résistance. La teneur en or fin est exprimée en carats <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or jaune:</strong> Or + Cuivre + Argent</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-rose-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or rose:</strong> Or + Cuivre (proportion plus élevée)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or blanc:</strong> Or + Métaux blancs (Ni, Pd, Ag)</span>
                    </div>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Propriétés et traitement</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Après durcissement par alliage, l&apos;or 18 carats atteint une dureté de 120 à 200 HV, suffisante pour résister à l&apos;usure quotidienne <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Dureté:</strong> 120-200 HV (or 18K)</li>
                    <li><strong>Traitements:</strong> Polissage, satinage, rhodiage</li>
                    <li><strong>Résistance:</strong> Inoxydable et inaltérable</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Applications</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;or est principalement utilisé pour les boîtiers de montres de luxe et les éléments décoratifs <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Boîtiers:</strong> Symboles de prestige</li>
                    <li><strong>Cadrans:</strong> Souvent avec guillochage</li>
                    <li><strong>Éléments:</strong> Aiguilles, index, couronnes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Platine */}
            <div id="platine" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Le Platine : L&apos;Excellence Rare</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Caractéristiques et densité</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le platine est un métal précieux encore plus rare et plus dense que l&apos;or, réservé aux garde-temps les plus exclusifs <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Propriétés remarquables:</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Densité:</strong> ~21,45 g/cm³ (vs ~19,3 g/cm³ or)</li>
                      <li>• <strong>Standard horloger:</strong> Platine 950 (95% pur)</li>
                      <li>• <strong>Résistance corrosion:</strong> Légendaire</li>
                      <li>• <strong>Éclat:</strong> Blanc-grisâtre inaltérable</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Applications haut de gamme</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le platine est réservé aux pièces les plus prestigieuses de la haute horlogerie, un symbole de statut et de valeur <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <ul className="space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Boîtiers:</strong> Présence unique et substantielle</li>
                    <li><strong>Éléments décoratifs:</strong> Cadrans, aiguilles, index</li>
                    <li><strong>Composants techniques:</strong> Rotors de remontage</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Son usinage et son polissage sont extrêmement complexes, contribuant à son coût élevé.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Matériaux Innovants Section */}
        <section id="materiaux-innovants" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Matériaux Innovants et Alternatifs</h2>

            {/* Céramique */}
            <div id="ceramique" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">La Céramique : Modernité et Résistance</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Propriétés exceptionnelles</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">La céramique est un matériau non métallique apprécié pour sa légèreté, sa résistance exceptionnelle aux rayures et son aspect futuriste <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Caractéristiques techniques:</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Dureté:</strong> 1200-1500 HV (pratiquement inrayable)</li>
                      <li>• <strong>Densité:</strong> ~6 g/cm³ (légère)</li>
                      <li>• <strong>Hypoallergénique:</strong> Totalement sûr</li>
                      <li>• <strong>Esthétique:</strong> Aspect moderne et futuriste</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Procédés et applications</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">La fabrication de pièces en céramique est un processus complexe et hautement technologique, utilisant de la zircone yttriée (ZrO2) <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-fire text-orange-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Frittage:</strong> Chauffage à 1500°C</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-cubes text-blue-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Applications:</strong> Boîtiers, lunettes, bracelets</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Marques pionnières:</strong> Rado, Omega, Chanel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bronze */}
            <div id="bronze" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Le Bronze : Un Matériau au Patine Vivante</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Composition et évolution</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le bronze, un alliage de cuivre et d&apos;étain, a connu un regain d&apos;intérêt pour son évolution naturelle au fil du temps <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gradient-to-r from-orange-400 to-green-600 p-4 rounded-lg text-white mb-4">
                    <h5 className="font-semibold mb-2">Processus de patine:</h5>
                    <p className="text-sm">Cuivre brillant → Teintes brunes → Vertes (comme la Statue de la Liberté)</p>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Chaque montre développe une patine unique selon l&apos;environnement et l&apos;utilisation.</p>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Montres de plongée</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le bronze est particulièrement bien adapté aux montres de plongée, avec une excellente résistance à la corrosion dans l&apos;eau salée.</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-water text-blue-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Résistance:</strong> Excellente en milieu marin</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-history text-orange-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Charactère:</strong> Patine unique et vintage</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-medal text-yellow-500 mr-3"></i>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Marques:</strong> Panerai, Tudor, Oris</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Souvent produites en éditions limitées, renforçant leur attrait collecteur.</p>
                </div>
              </div>
            </div>

            {/* Avant-Garde */}
            <div id="avant-garde" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Autres Matériaux d&apos;Avant-Garde</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Carbone Forgé</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Matériau composite de pointe utilisé dans l&apos;horlogerie haut de gamme, en particulier pour les montres de sport et de course automobile.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Structure:</strong> Fibres de carbone dans résine polymère</li>
                    <li><strong>Avantages:</strong> Ultra-léger et rigide</li>
                    <li><strong>Esthétique:</strong> Motif de fibres noires distinctif</li>
                    <li><strong>Marques:</strong> Audemars Piguet, Richard Mille</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Liquidmetal®</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Alliage amorphe (métal vitreux) introduit pour ses propriétés uniques, avec une structure atomique désordonnée.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Dureté:</strong> 3x plus dur que l&apos;acier inoxydable</li>
                    <li><strong>Propriétés:</strong> Dureté, élasticité, résistance corrosion</li>
                    <li><strong>Applications:</strong> Lunettes tournantes, inserts de boîtier</li>
                    <li><strong>Pionnier:</strong> Omega (avec céramique)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques et Comparatifs Section */}
        <section id="techniques-comparatifs" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Schémas Techniques et Comparatifs Visuels</h2>

            <div className="mb-12">
              <AlloyMixer />
            </div>

            <div className="mb-12">
              <h3 className="serif-heading text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Tableau comparatif des propriétés des matériaux</h3>
              <div className="overflow-x-auto">
                <table className="comparison-table w-full">
                  <thead>
                    <tr>
                      <th className="p-3 text-left">Matériau</th>
                      <th className="p-3 text-center">Densité (g/cm³)</th>
                      <th className="p-3 text-center">Dureté (HV)</th>
                      <th className="p-3 text-center">Résistance à la Corrosion</th>
                      <th className="p-3 text-center">Hypoallergénicité</th>
                      <th className="p-3 text-center">Coût</th>
                      <th className="p-3 text-left">Applications Typiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Acier 316L</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~7.9</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~200</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Très Bonne</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Faible</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers, bracelets, composants internes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Acier 904L</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~8.0</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~250</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-yellow-600 dark:text-yellow-400">Moyen</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers haut de gamme (Rolex)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Titane Grade 5</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~4.5</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~350</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-orange-600 dark:text-orange-400">Élevé</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers sportifs, montres de plongée</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Or 18K Jaune</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~15.4</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~150</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-red-600 dark:text-red-400">Très Élevé</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers et éléments décoratifs de luxe</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Or 18K Blanc</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~15.4</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~150</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-yellow-600 dark:text-yellow-400">Variable (Ni)</td>
                      <td className="p-3 text-center text-red-600 dark:text-red-400">Très Élevé</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers et éléments décoratifs de luxe</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Platine 950</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~21.4</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~130</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-red-600 dark:text-red-400">Extrêmement Élevé</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers de pièces ultra-prestiges</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Céramique</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~6.0</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~1200</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Excellente</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-orange-600 dark:text-orange-400">Moyen à Élevé</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers, lunettes, bracelets</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Bronze</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~8.8</td>
                      <td className="p-3 text-center text-gray-700 dark:text-gray-300">~100</td>
                      <td className="p-3 text-center text-yellow-600 dark:text-yellow-400">Bonne</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Oui</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">Faible</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">Boîtiers de montres de plongée vintage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PDF de Référence Section */}
        <section id="pdf-reference" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Intégration du PDF de Référence : &quot;Métaux Communs&quot;
            </h2>

            <div className="material-card mb-8">
              <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Ressource Pédagogique Complémentaire
              </h3>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Pour accompagner l&apos;étude des matériaux utilisés en horlogerie, un document de référence intitulé 
                <strong> « Métaux Communs » </strong> est proposé. Ce PDF présente de manière claire les principales 
                familles de métaux, leurs propriétés techniques et leurs applications dans la fabrication horlogère.
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Il permet d&apos;identifier rapidement la composition, les caractéristiques essentielles et les usages 
                typiques de chaque matériau. Ressource synthétique et structurée, il vient compléter efficacement 
                les informations détaillées fournies dans ce guide.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Visionneuse de PDF Intégrée</h4>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Le document ci-dessous est affiché grâce à la visionneuse PDF intégrée pour une consultation directe.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-8">
              <iframe
                src="/pdfs/metaux-communs.pdf"
                className="w-full h-[900px] rounded-lg border dark:border-gray-600"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Cartes Flash Section */}
        <section id="flashcards" className="p-8">
          <FlashcardsComponent />
        </section>

        <footer className="p-8 bg-gray-900 text-white">
          <div className="text-center">
            <h3 className="serif-heading text-2xl font-bold mb-4">Guide Complet des Métaux en Horlogerie</h3>
            <p className="text-gray-400 mb-6">Une ressource pédagogique dédiée aux élèves en formation horlogère et aux passionnés</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2024 Horlo-AFP</span>
              <span>•</span>
              <span>Ressource éducative</span>
              <span>•</span>
              <span>Matériaux horlogers</span>
            </div>
          </div>
        </footer>

        {/* BOUTON RETOUR FLOTTANT - Option 3 */}
        <Link 
          href="/materiaux" 
          className="floating-back-btn inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white rounded-full hover:from-blue-500 hover:to-blue-700 dark:hover:from-blue-400 dark:hover:to-blue-600 transition-all duration-300 font-semibold text-sm"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Retour</span>
        </Link>
      </main>
    </>
  );
}
