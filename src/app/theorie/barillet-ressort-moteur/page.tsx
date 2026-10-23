"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gauge,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Activity,
  Layers,
  Cog,
  Info,
  BookOpen,
  Sparkles,
  Sliders,
  Flame,
  Award
} from "lucide-react";

interface ComponentDetail {
  id: string;
  name: string;
  role: string;
  technicalRule: string;
  material: string;
  tolerances: string;
}

const BARREL_COMPONENTS: ComponentDetail[] = [
  {
    id: "tambour",
    name: "Le Tambour de Barillet",
    role: "Boîtier circulaire cylindrique qui loge le ressort moteur. Sa denture extérieure fraisée entraîne directement le premier mobile du rouage (le pignon de roue de centre).",
    technicalRule: "La hauteur intérieure doit laisser un ébat fonctionnel de 0.02 à 0.04 mm à la lame du ressort pour éviter tout coincement lors de l'armage.",
    material: "Laiton horloger de décolletage écroui (CuZn39Pb2) ou Maillechort.",
    tolerances: "Diamètre intérieur tolérance H7 · Circularité < 0.005 mm"
  },
  {
    id: "arbre",
    name: "L'Arbre de Barillet & sa Bonde",
    role: "Axe central sur lequel s'accroche la première spire intérieure du ressort via le crochet d'arbre. Il pivote dans la platine et le pont de barillet.",
    technicalRule: "Le diamètre de la bonde (noyau) doit respecter scrupuleusement la règle du tiers du diamètre intérieur du tambour pour éviter la rupture par pliage de la première spire.",
    material: "Acier trempable 20AP trempé-revenu (dureté 52-54 HRC) avec portées polies miroir.",
    tolerances: "Tigerons tolérance h6 (rugosité Ra < 0.1 µm) pour limitation des frottements"
  },
  {
    id: "couvercle",
    name: "Le Couvercle de Barillet",
    role: "Fermeture hermétique du barillet maintenant la graisse à l'intérieur. Il présente un trou central pour le tigeron supérieur de l'arbre et une encoche périphérique de déboîtage.",
    technicalRule: "L'emboîtement dans la gorge du tambour s'effectue par un chassage élastique précis (clipsage franc sans déformation du tambour).",
    material: "Laiton horloger dressé ou Maillechort.",
    tolerances: "Ajustement serré glissant h6/H7"
  },
  {
    id: "ressort",
    name: "Le Ressort Moteur (Lame en S)",
    role: "Ruban d'alliage élastique qui emmagasine l'énergie potentielle lors de la rotation de l'arbre et la restitue sous forme de couple moteur régulier.",
    technicalRule: "Sa forme libre en 'S inversé' compense la perte naturelle de couple au fur et à mesure du déroulement, créant un plateau de force remarquablement stable.",
    material: "Alliage super-élastique Nivaflex (Cobalt 45%, Nickel 21%, Chrome 18%, Fer, Tungstène, Molybdène).",
    tolerances: "Épaisseur de lame calibrée au micron près (ex: 0.115 ± 0.001 mm)"
  },
  {
    id: "rochet",
    name: "Le Rochet & son Cliquet",
    role: "Roue dentée fixée sur le carré de l'arbre de barillet par une vis. Le cliquet d'arrêt s'engrène dans ses dents pour empêcher le ressort de se désarmer brutalement en arrière.",
    technicalRule: "Le cliquet possède un léger recul d'armage (backlash) de 1/2 dent qui soulage la surtension extrême sur l'arbre en fin de remontage manuel.",
    material: "Acier au carbone poli ou brossé soleil avec dents chanfreinées.",
    tolerances: "Carré ajusté sans jeu angulaire sur l'arbre"
  }
];

const MULTI_BARREL_MODELS = [
  {
    type: "Série (Couplage en Cascade)",
    principle: "Le tambour du 1er barillet entraîne l'arbre du 2nd barillet. Les ressorts se vident successivement.",
    effectTorque: "Couple constant identique à un barillet unique.",
    effectReserve: "Réserve de marche rigoureusement DOUBLÉE (ex: 7 à 10 jours).",
    manufactureExample: "IWC Calibre 52010 (7 jours) · Blancpain Fifty Fathoms (120h) · JLC 875",
    color: "#E2B44F"
  },
  {
    type: "Parallèle (Couplage Simultané)",
    principle: "Les deux tambours de barillet engrènent simultanément sur le même pignon de roue de centre.",
    effectTorque: "Addition des couples moteurs (C_total = C1 + C2).",
    effectReserve: "Réserve identique, mais ressorts 50% plus fins et frottements latéraux divisés par deux.",
    manufactureExample: "Chopard L.U.C Quattro (4 barillets 2x2, 9 jours) · Breguet 7727 (10 Hz)",
    color: "#60A5FA"
  }
];

const LUBRICATION_STANDARDS = [
  {
    zone: "Paroi interne du tambour (Automatique)",
    lubricant: "Moebius Klüber P125 (graisse spéciale adhérente au MoS₂)",
    function: "Garantir un coefficient de friction calibré pour que la bride glissante patine sans à-coups dès l'armage maximal.",
    risk: "Si graisse trop fluide : la bride glisse trop tôt (réserve de marche effondrée). Si trop sèche : rebattement violent."
  },
  {
    zone: "Lame et spires du ressort moteur",
    lubricant: "Moebius 8200 ou Moebius 8301 (au graphite micro-fin)",
    function: "Éliminer le frottement spire contre spire pour libérer le couple sans ressauts cinématiques.",
    risk: "Un manque d'huile crée des saccades de couple transmises à l'échappement qui dégradent l'isochronisme."
  },
  {
    zone: "Tigerons et pivots de l'arbre de barillet",
    lubricant: "Moebius HP 1300 (huile synthétique haute pression)",
    function: "Supporter les très fortes pressions radiales exercées par le couple moteur sur la platine et le pont.",
    risk: "Grippage des pivots ou ovalisation prématurée des trous de barillet non empierrés."
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Quelle est la fonction essentielle de la bride glissante dans un barillet de montre automatique ?",
    options: [
      "Bloquer hermétiquement l'huile à l'intérieur du tambour",
      "Permettre au ressort de patiner contre la paroi du tambour pour éviter la rupture par sur-armage du rotor",
      "Accélérer la vitesse de rotation du rouage de centre",
      "Supprimer l'arbre de barillet pour gagner de l'espace"
    ],
    correctAnswer: 1,
    explanation: "Dans une montre automatique, le rotor remonte le barillet sans interruption. La bride glissante patine contre la paroi dès que le couple maximal est atteint, protégeant ainsi le ressort et le rouage contre toute casse mécanique."
  },
  {
    question: "Selon la Théorie d'Horlogerie de Reymondin, quelle proportion géométrique idéale doit occuper le diamètre de la bonde (arbre) par rapport au diamètre intérieur du tambour ?",
    options: [
      "Le dixième (1/10)",
      "Le tiers (environ 1/3 du diamètre intérieur)",
      "La moitié exacte (1/2)",
      "Les trois quarts (3/4)"
    ],
    correctAnswer: 1,
    explanation: "Le diamètre de l'arbre doit être proche du tiers (1/3) du diamètre intérieur du tambour. Si l'arbre est trop petit, la courbure excessive brise la spire intérieure. S'il est trop grand, la place disponible pour la longueur du ressort est insuffisante."
  },
  {
    question: "Pourquoi les ressorts modernes en alliage Nivaflex adoptent-ils une forme libre en « S inversé » au lieu d'une spirale classique ?",
    options: [
      "Pour faciliter le graissage à l'huile fine",
      "Pour compenser la chute naturelle de force et offrir une courbe de couple beaucoup plus plate et linéaire",
      "Pour réduire le coût de laminage de l'acier",
      "Pour permettre un remontage plus rapide en moins de 10 tours"
    ],
    correctAnswer: 1,
    explanation: "Un ressort spiral classique voit son couple chuter rapidement en se détendant. La forme libre en S inversé exerce une pré-tension géométrique inverse qui stabilise le couple moteur sur plus de 80% de la durée de décharge."
  },
  {
    question: "Dans une architecture à deux barillets montés EN SÉRIE, quel est l'effet cinématique principal obtenu ?",
    options: [
      "Le couple moteur est doublé avec une réserve inchangée",
      "La réserve de marche est doublée avec un couple moteur constant",
      "La fréquence d'oscillation du balancier passe à 10 Hz",
      "L'échappement fonctionne sans ancre suisse"
    ],
    correctAnswer: 1,
    explanation: "En série, le premier barillet se vide dans le second. Le couple délivré au rouage reste strictement le même que celui d'un seul barillet, mais le nombre de tours de développement s'additionne, doublant ainsi l'autonomie (réserve de marche)."
  },
  {
    question: "Qu'appelle-t-on le « rebattement » (knocking) en atelier horloger lors d'un défaut de couple de barillet ?",
    options: [
      "Le bruit normal du tic-tac de l'échappement",
      "Un couple excessif qui fait dépasser 330° d'amplitude au balancier, faisant heurter la cheville de plateau contre l'extérieur des cornes de l'ancre",
      "Le glissement silencieux de la bride sur la graisse P125",
      "Le desserrage de la vis de rochet sous le pont de barillet"
    ],
    correctAnswer: 1,
    explanation: "Le rebattement est une anomalie grave : si le couple moteur est trop violent ou la bride trop serrée, l'amplitude du balancier s'emballe au-delà de 330°. La cheville de plateau heurte le dos de l'ancre à chaque oscillation, provoquant une avance fulgurante de la montre."
  }
];

export default function BarilletRessortMoteurPage() {
  const [selectedComp, setSelectedComp] = useState(0);

  // Workshop Calculator State (Théorème de Reymondin)
  const [drumDiameter, setDrumDiameter] = useState(10.5); // mm
  const [arborDiameter, setArborDiameter] = useState(3.5); // mm (~1/3)
  const [springThickness, setSpringThickness] = useState(0.115); // mm
  const [centerPinionTeeth, setCenterPinionTeeth] = useState(12);
  const [barrelTeeth, setBarrelTeeth] = useState(72);

  // Quiz Stepper State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Calculations according to Reymondin formula: L = π * (R² - r²) / (2 * e)
  const drumRadius = drumDiameter / 2;
  const arborRadius = arborDiameter / 2;
  const calculatedLength = Math.round((Math.PI * (Math.pow(drumRadius, 2) - Math.pow(arborRadius, 2))) / (2 * springThickness));
  
  // Approximate useful turns (Reymondin ratio)
  const usefulTurns = parseFloat(((drumRadius - arborRadius) / (2.5 * springThickness) * 0.45).toFixed(1));
  const gearRatio = barrelTeeth / centerPinionTeeth; // e.g. 72 / 12 = 6
  const calculatedReserve = Math.round(usefulTurns * gearRatio);

  const handleSelectQuizAnswer = (optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [currentQuizIdx]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuizIdx(0);
    setQuizFinished(false);
  };

  const activeComp = BARREL_COMPONENTS[selectedComp];

  return (
    <div className="bg-[#FDFCFB] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100 antialiased selection:bg-[#B08D57]/20 selection:text-[#8A6A3B] dark:selection:text-[#D4B483] min-h-screen pb-24 transition-colors duration-200">
      
      {/* =================================================================== */}
      {/* TOP APP BAR & BREADCRUMB */}
      {/* =================================================================== */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#15161A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 overflow-x-auto no-scrollbar">
            <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100 tracking-wider hover:opacity-80 transition-opacity whitespace-nowrap">
              HORLOLEARN
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors whitespace-nowrap">
              Théorie
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-neutral-500 dark:text-neutral-400 whitespace-nowrap">Pilier I</span>
            <span className="opacity-40">/</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
              Le Barillet et le Ressort Moteur
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              SEFRI · CPIH / FET
            </span>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MAIN CONTAINER */}
      {/* =================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">

        {/* 1. HERO SECTION & NORMATIVE BADGES */}
        <section className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
              Module 02 · Organe Moteur Fondamental
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Niveau : AFP / CFC Horloger Praticien &amp; Rhabilleur
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              20 min de lecture · Schéma CAD &amp; Calculateur
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
            Le Barillet et le Ressort Moteur : Dynamique &amp; Réserve de Marche
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            Source énergétique motrice de tout garde-temps mécanique, le barillet concentre des contraintes mécaniques extrêmes 
            dans un volume ne dépassant pas quelques millimètres cubes. De la métallurgie du <strong>Nivaflex</strong> au 
            calcul géométrique de l&apos;arbre selon le <strong>Théorème de Reymondin</strong>, découvrez l&apos;art de maîtriser 
            le couple pour garantir l&apos;isochronisme du balancier.
          </p>
        </section>

        {/* =================================================================== */}
        {/* 2. ANATOMIE INTERACTIVE DU BARILLET COMPLET (SCHÉMA CAD SVG) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 1 · Anatomie Micrométrique
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Coupe Technique d&apos;Atelier : Barillet Complet &amp; Organes
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Le barillet constitue un sous-ensemble autonome composé de 5 pièces maîtresses. Cliquez sur chaque composant 
              pour étudier ses tolérances, sa règle d&apos;atelier et sa matière selon les normes NIHS.
            </p>
          </div>

          {/* SÉLECTEUR D'ÉLÉMENTS */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {BARREL_COMPONENTS.map((comp, idx) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => setSelectedComp(idx)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedComp === idx
                    ? "bg-[#B08D57] text-neutral-950 font-bold shadow-md scale-[1.02]"
                    : "bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <span>{comp.name}</span>
              </button>
            ))}
          </div>

          {/* FICHE TECHNIQUE DE LA PIÈCE SÉLECTIONNÉE */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase">
                  Composant d&apos;Établi n°0{selectedComp + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  {activeComp.name}
                </h3>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {activeComp.tolerances}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-mono font-bold uppercase text-neutral-500 text-xs">Rôle Fonctionnel</h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {activeComp.role}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-mono font-bold uppercase text-neutral-500 text-xs">Matériau Horloger Normalisé</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                    {activeComp.material}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300">
                    💡 Règle d&apos;Établi du Maître Horloger :
                  </span>
                  <p className="leading-relaxed">
                    {activeComp.technicalRule}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DESSIN TECHNIQUE VECTORIEL CAD (COUPE TRANSVERSALE) */}
          <div className="p-6 rounded-3xl border border-neutral-700/60 bg-[#15171D] text-[#E0E2E6] space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
              <span className="text-neutral-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]"></span>
                PLAN DE COUPE AXIALE D&apos;UN BARILLET SUISSE NORMALISÉ (ÉCHELLE 15:1)
              </span>
              <span className="text-neutral-400">SURVOLEZ LES ÉLÉMENTS POUR IDENTIFIER LES JEUX</span>
            </div>

            <div className="w-full overflow-x-auto py-4 flex justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-[720px] h-auto select-none font-mono">
                {/* Patterns */}
                <defs>
                  <pattern id="brass-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#D4B483" strokeWidth="0.8" />
                  </pattern>
                  <pattern id="steel-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#94A3B8" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Center Axis (Trait mixte fin) */}
                <line x1="380" y1="20" x2="380" y2="240" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="14 3 3 3" />
                <text x="390" y="30" fill="#60A5FA" fontSize="10" fontWeight="bold">AXE D&apos;ARBRE</text>

                {/* 1. Tambour Body (Laiton - Hatch) */}
                {/* Upper rim with teeth */}
                <rect x="140" y="90" width="30" height="80" fill="url(#brass-hatch)" stroke="#E2E8F0" strokeWidth="1.5" />
                {/* Teeth on left */}
                <path d="M 140 100 L 125 105 L 140 110 M 140 125 L 125 130 L 140 135 M 140 150 L 125 155 L 140 160" stroke="#D4B483" strokeWidth="1.5" fill="none" />
                {/* Bottom wall */}
                <rect x="140" y="160" width="480" height="15" fill="url(#brass-hatch)" stroke="#E2E8F0" strokeWidth="1.5" />
                {/* Right rim with teeth */}
                <rect x="590" y="90" width="30" height="80" fill="url(#brass-hatch)" stroke="#E2E8F0" strokeWidth="1.5" />
                {/* Teeth on right */}
                <path d="M 620 100 L 635 105 L 620 110 M 620 125 L 635 130 L 620 135 M 620 150 L 635 155 L 620 160" stroke="#D4B483" strokeWidth="1.5" fill="none" />

                {/* 2. Couvercle (Laiton - Top Lid) */}
                <rect x="170" y="85" width="420" height="8" fill="url(#brass-hatch)" stroke="#E2E8F0" strokeWidth="1.2" />
                <text x="180" y="80" fill="#D4B483" fontSize="10">Couvercle (clipsé)</text>

                {/* 3. Arbre de Barillet (Acier - Steel) */}
                {/* Top pivot / square */}
                <rect x="365" y="45" width="30" height="30" fill="url(#steel-hatch)" stroke="#E2E8F0" strokeWidth="1.5" />
                <rect x="372" y="30" width="16" height="15" fill="#E2E8F0" />
                {/* Central arbor body (Bonde) */}
                <rect x="340" y="93" width="80" height="67" fill="url(#steel-hatch)" stroke="#E2E8F0" strokeWidth="2" />
                {/* Hook on arbor */}
                <path d="M 420 125 L 432 120 L 420 115 Z" fill="#E2E8F0" />
                {/* Bottom pivot */}
                <rect x="368" y="175" width="24" height="35" fill="url(#steel-hatch)" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="380" cy="220" r="4" fill="#94A3B8" />

                {/* 4. Coiled Nivaflex Spring Spire Bands (Left & Right) */}
                {/* Left side coils */}
                <g stroke="#E2B44F" strokeWidth="2.5">
                  <line x1="180" y1="98" x2="180" y2="155" />
                  <line x1="192" y1="98" x2="192" y2="155" />
                  <line x1="204" y1="98" x2="204" y2="155" />
                  <line x1="216" y1="98" x2="216" y2="155" />
                  {/* Free space representation */}
                  <line x1="300" y1="98" x2="300" y2="155" stroke="#E2B44F" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="315" y1="98" x2="315" y2="155" stroke="#E2B44F" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="330" y1="98" x2="330" y2="155" />
                </g>

                {/* Right side coils */}
                <g stroke="#E2B44F" strokeWidth="2.5">
                  <line x1="430" y1="98" x2="430" y2="155" />
                  <line x1="445" y1="98" x2="445" y2="155" stroke="#E2B44F" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="460" y1="98" x2="460" y2="155" stroke="#E2B44F" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="544" y1="98" x2="544" y2="155" />
                  <line x1="556" y1="98" x2="556" y2="155" />
                  <line x1="568" y1="98" x2="568" y2="155" />
                  <line x1="580" y1="98" x2="580" y2="155" />
                </g>

                {/* Callout Labels */}
                <text x="90" y="140" fill="#D4B483" fontSize="10" fontWeight="bold">Denture</text>
                <text x="348" y="130" fill="#E2E8F0" fontSize="10" fontWeight="bold">Bonde (d)</text>
                <text x="235" y="130" fill="#E2B44F" fontSize="10">Spires Nivaflex</text>
                <text x="380" y="245" fill="#94A3B8" fontSize="10" textAnchor="middle">Pivot inférieur (h6)</text>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span>🟡 Lame Nivaflex : Ébat vertical de hauteur = 0.02 à 0.03 mm</span>
              <span>⚙️ Denture de tambour : Module m = 0.18 à 0.22 mm</span>
              <span>🔩 Règle du 1/3 : Espace libre = 1/3 · Spires = 1/3 · Arbre = 1/3</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. MÉTALLURGIE & GÉOMÉTRIE DU RESSORT : NIVAFLEX ET FORME EN S */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 2 · Science des Matériaux
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Nivaflex &amp; Forme Libre en « S » : Le Secret du Couple Constant
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Jusqu&apos;au milieu du XXe siècle, les ressorts en acier au carbone cassaient régulièrement après quelques années. 
              L&apos;invention du Nivaflex a révolutionné l&apos;horlogerie grâce à une limite élastique sans précédent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>COMPOSITION DE L&apos;ALLIAGE NIVAFLEX</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le Nivaflex est un superalliage austénitique écroui et durci par précipitation thermique à 480°C. 
                Ses propriétés en font le métal idéal pour l&apos;organe moteur :
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-neutral-500 block">Cobalt (Co)</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">45% (Base élastique)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-neutral-500 block">Nickel (Ni)</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">21% (Amagnétisme)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-neutral-500 block">Chrome (Cr)</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">18% (Anticorrosion)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-neutral-500 block">Tungstène / Mo</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">8% (Haute dureté)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                ✓ <strong>Résistance à la traction :</strong> &gt; 3&apos;000 N/mm² · 100% Inoxydable · Insensible aux champs magnétiques usuels.
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <Activity className="w-4 h-4 text-[#B08D57]" />
                <span>POURQUOI LA FORME LIBRE EN « S » ?</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sorti de son barillet, un ressort moderne ne s&apos;enroule pas en escargot : 
                il présente une cambrure inversée en forme de <strong>S majuscule</strong>.
              </p>

              <div className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                  <p>
                    <strong>Pré-contrainte périphérique :</strong> La courbure inversée force les spires extérieures à appuyer fortement contre le tambour avant même d&apos;être armées.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                  <p>
                    <strong>Linéarité du couple :</strong> La courbe de décharge évite le pic de surtension initial et la chute prématurée en fin d&apos;autonomie. L&apos;amplitude du balancier reste comprise entre 270° et 315° pendant plus de 36 heures consécutives.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-800 dark:text-sky-300 text-xs">
                ℹ️ <strong>Règle d&apos;atelier :</strong> Ne jamais détordre ou forcer un ressort en S à la brucelles. Son profil de cambrure est calculé au laser en usine.
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. CALCULATEUR D'ATELIER (THÉORÈME DE REYMONDIN) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 3 · Calculs de Construction Horlogère
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Laboratoire de Dimensionnement : Le Théorème du Tiers de Reymondin
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Pour qu&apos;un barillet délivre le nombre maximal de tours de développement utiles sans risque de rupture, 
              la surface de la couronne occupée par le ressort armé doit être rigoureusement égale à la surface de l&apos;anneau à l&apos;état détendu.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Sliders Inputs */}
              <div className="lg:col-span-2 space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Diamètre intérieur tambour (D) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{drumDiameter} mm</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="14"
                    step="0.1"
                    value={drumDiameter}
                    onChange={(e) => setDrumDiameter(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>8.0 mm (calibre dame)</span>
                    <span>10.5 mm (ETA 2824)</span>
                    <span>14.0 mm (Unitas 6497)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Diamètre bonde d&apos;arbre (d) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{arborDiameter} mm</span>
                  </div>
                  <input
                    type="range"
                    min="2.2"
                    max="5.0"
                    step="0.1"
                    value={arborDiameter}
                    onChange={(e) => setArborDiameter(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>2.2 mm (rapport d/D = 0.22)</span>
                    <span>Idéal Reymondin : {(drumDiameter / 3).toFixed(2)} mm (1/3)</span>
                    <span>5.0 mm (arbre large)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Épaisseur de la lame Nivaflex (e) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{springThickness} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.080"
                    max="0.160"
                    step="0.005"
                    value={springThickness}
                    onChange={(e) => setSpringThickness(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>0.080 mm (ressort fin longue réserve)</span>
                    <span>0.115 mm (standard)</span>
                    <span>0.160 mm (ressort fort)</span>
                  </div>
                </div>
              </div>

              {/* Live Output Panel */}
              <div className="p-5 rounded-2xl bg-[#B08D57]/5 dark:bg-[#B08D57]/10 border border-[#B08D57]/20 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#8A6A3B] dark:text-[#D4B483] block">
                    Résultats de Calcul Normalisé :
                  </span>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 block">Longueur Optimale (L) :</span>
                    <span className="text-2xl font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {calculatedLength} mm
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      L = π · (R² - r²) / (2 · e)
                    </span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block">Tours Utiles de Développement (n) :</span>
                    <span className="text-xl font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      ~{usefulTurns} tours
                    </span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block">Réserve de Marche Estimée :</span>
                    <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ~{calculatedReserve} heures
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      Soit {(calculatedReserve / 24).toFixed(1)} jours d&apos;autonomie
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 leading-tight">
                  Rapport Arbre/Barillet actuel : <strong>{(arborDiameter / drumDiameter).toFixed(2)}</strong> (Objectif d/D = 0.33)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. ARCHITECTURES MULTI-BARILLETS : SÉRIE VS PARALLÈLE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 4 · Haute Horlogerie
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Multi-Barillets : Montage en Série vs Montage en Parallèle
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Pour dépasser les 42 heures de réserve de marche standard sans épaissir le ressort (ce qui détruirait l&apos;isochronisme), 
              les manufactures suisses associent plusieurs barillets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MULTI_BARREL_MODELS.map((model, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                    {model.type}
                  </h3>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }}></span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-mono font-bold text-neutral-500 block uppercase text-[10px]">Principe Cinématique</span>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">{model.principle}</p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-neutral-500 block uppercase text-[10px]">Effet sur le Couple Moteur</span>
                    <p className="text-neutral-600 dark:text-neutral-400">{model.effectTorque}</p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-neutral-500 block uppercase text-[10px]">Effet sur la Réserve de Marche</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">{model.effectReserve}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-800 text-[11px] font-mono">
                    <span className="text-neutral-400 block mb-0.5">Exemples de Calibres Suisses :</span>
                    <span className="text-[#8A6A3B] dark:text-[#D4B483] font-semibold">{model.manufactureExample}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. LUBRIFICATION NORMALISÉE & RISQUE DE REBATTEMENT */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 5 · Pratique d&apos;Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Lubrification Suisse (Huiles Moebius) &amp; Risque de Rebattement
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#191C23] font-mono text-neutral-500 dark:text-neutral-400">
                  <th className="p-4">Point d&apos;Application</th>
                  <th className="p-4 text-[#8A6A3B] dark:text-[#D4B483]">Lubrifiant Certifié</th>
                  <th className="p-4">Fonction Mécanique</th>
                  <th className="p-4 text-rose-600 dark:text-rose-400">Conséquence d&apos;une Mauvaise Huile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {LUBRICATION_STANDARDS.map((lub, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-neutral-900 dark:text-neutral-100">{lub.zone}</td>
                    <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">{lub.lubricant}</td>
                    <td className="p-4 text-neutral-700 dark:text-neutral-300">{lub.function}</td>
                    <td className="p-4 text-neutral-500 dark:text-neutral-400 italic">{lub.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 7. QUIZ INTERACTIF COMPACT D'ATELIER (FORMAT STEPPER 1 QUESTION) */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                Contrôle des Connaissances
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Quiz de Validation Rapide : Le Barillet (Examen Suisse)
              </h2>
            </div>

            {/* Mini Progress Pills */}
            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => {
                const ans = userAnswers[idx];
                const isCurrent = currentQuizIdx === idx && !quizFinished;
                let bg = "bg-neutral-200 dark:bg-neutral-800 text-neutral-500";
                if (ans !== undefined) {
                  bg = ans === QUIZ_QUESTIONS[idx].correctAnswer
                    ? "bg-emerald-500 text-white font-bold"
                    : "bg-rose-500 text-white font-bold";
                } else if (isCurrent) {
                  bg = "bg-[#B08D57] text-neutral-950 font-bold ring-2 ring-[#B08D57]/40";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentQuizIdx(idx);
                      setQuizFinished(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center justify-center ${bg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN QUIZ CARD (Compact Stepper) */}
          <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
            {!quizFinished ? (
              <div className="space-y-5">
                {/* Question Header */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20">
                      Question {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {userAnswers[currentQuizIdx] !== undefined ? "✓ Réponse enregistrée" : "Choisissez une option"}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 font-semibold">
                    Score : {calculateScore()} / {Object.keys(userAnswers).length}
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>

                {/* Options Grid (2x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((opt, optIdx) => {
                    const selected = userAnswers[currentQuizIdx];
                    const isSelected = selected === optIdx;
                    const isAnswered = selected !== undefined;
                    const isOptionCorrect = optIdx === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer;

                    let btnStyle = "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300";

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-semibold";
                      } else {
                        btnStyle = "opacity-50 border-neutral-200 dark:border-neutral-800";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectQuizAnswer(optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation Box */}
                {userAnswers[currentQuizIdx] !== undefined && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                  }`}>
                    <span className="font-bold block mb-0.5">
                      {userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                        ? "✅ Exact !"
                        : "❌ Explication technique :"}
                    </span>
                    {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                  </div>
                )}

                {/* Stepper Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    disabled={currentQuizIdx === 0}
                    onClick={() => setCurrentQuizIdx(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    ← Précédent
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuizIdx(prev => prev + 1)}
                        className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-all cursor-pointer"
                      >
                        Suivant →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuizFinished(true)}
                        className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all shadow-sm cursor-pointer"
                      >
                        Voir le Bilan Final ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Summary / Result View */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                    {calculateScore() >= 4
                      ? "Félicitations ! Théorie du Barillet Validée."
                      : "Bon début ! Quelques révisions conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez le rôle de l'arbre, du Nivaflex, de la bride glissante et du théorème de Reymondin. Prêt pour le Module 03 !"
                      : "Prenez le temps de revoir la différence entre bride fixe et bride glissante ainsi que la lubrification avant de poursuivre."}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentQuizIdx(0);
                      setQuizFinished(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Revoir mes réponses
                  </button>

                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all cursor-pointer shadow-sm"
                  >
                    Recommencer le quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================================== */}
        {/* BOTTOM NAVIGATION BAR */}
        {/* =================================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/theorie/introduction-montre-mecanique"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Module 01 : Introduction à la Montre Mécanique</span>
          </Link>

          <Link
            href="/theorie/rouage"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Module 03 : Le Rouage &amp; Démultiplication</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
