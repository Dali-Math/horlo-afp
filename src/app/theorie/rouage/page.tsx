"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cog,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Activity,
  Layers,
  Info,
  BookOpen,
  Sparkles,
  Sliders,
  ShieldCheck,
  Award,
  Target,
  ChevronRight,
  RefreshCw,
  Compass,
  Gauge,
  Wrench
} from "lucide-react";

interface MobileComponent {
  id: string;
  name: string;
  role: string;
  pinionLeaves: number;
  wheelTeeth: number;
  rotationSpeed: string;
  torqueLevel: string;
  lubrication: string;
  material: string;
  technicalDetails: string;
}

const TRAIN_MOBILES: MobileComponent[] = [
  {
    id: "barillet",
    name: "01. Le Barillet (Organe Moteur)",
    role: "Accumulateur et distributeur de l'énergie mécanique. Sa denture taillée sur le pourtour du tambour transmet le couple au premier pignon du rouage.",
    pinionLeaves: 0,
    wheelTeeth: 80,
    rotationSpeed: "~0.125 tr/h (1 tour en ~8 heures)",
    torqueLevel: "Couple maximal (100% · ~10 mN · m)",
    lubrication: "Graisse Moebius HP 1300 / Klüber P125 (paroi) et HP 1300 (arbre)",
    material: "Tambour et couvercle en laiton CuZn39Pb2 poli, arbre en acier 20AP",
    technicalDetails: "La denture de tambour est souvent à module supérieur (m ≈ 0.22 - 0.26) pour résister à la tension brute du ressort de barillet."
  },
  {
    id: "centre",
    name: "02. Le Mobile de Centre (Grande Moyenne)",
    role: "Positionné au centre géométrique du mouvement. Il effectue exactement 1 tour complet en 1 heure (60 min). Son tigeron prolongé porte la chaussée pour la minuterie.",
    pinionLeaves: 10,
    wheelTeeth: 64,
    rotationSpeed: "1 tour/heure (60 minutes)",
    torqueLevel: "Couple très élevé (~12.5% du couple initial)",
    lubrication: "Huile haute pression Moebius HP 1300 (pivot supérieur et inférieur)",
    material: "Planche en laiton découpé et doré, pignon en acier trempé 20AP poli miroir",
    technicalDetails: "Axe traversant la platine. Il supporte l'effort radial maximal après le barillet, exigeant un ébat soigné et des pivots généreux (Ø ~0.35 mm)."
  },
  {
    id: "moyenne",
    name: "03. Le Mobile de Moyenne (Petite Moyenne)",
    role: "Mobile multiplicateur intermédiaire. Il relie le centre à la seconde, ajustant le rapport de transmission tout en déportant l'axe pour la disposition spatiale des ponts.",
    pinionLeaves: 8,
    wheelTeeth: 60,
    rotationSpeed: "8 tours/heure (1 tour toutes les 7.5 min)",
    torqueLevel: "Couple intermédiaire (~1.6% du couple initial)",
    lubrication: "Huile Moebius HP 1300 (ponts robustes) ou Moebius 9010",
    material: "Planche ajourée à 4 ou 5 bras pour alléger l'inertie, pignon acier 20AP",
    technicalDetails: "Le rapport d'engrenage individuel est de 64 / 8 = 8. Ses pivots roulés tournent dans des rubis synthétiques Al₂O₃."
  },
  {
    id: "seconde",
    name: "04. Le Mobile de Seconde",
    role: "Effectue exactement 1 tour complet en 60 secondes (1 minute). Dans les montres à seconde directe ou seconde centrale, il porte directement l'aiguille de trotteuse.",
    pinionLeaves: 8,
    wheelTeeth: 60,
    rotationSpeed: "60 tours/heure (1 tour/minute)",
    torqueLevel: "Couple faible (~0.21% du couple initial)",
    lubrication: "Huile fine synthétique Moebius 9010 (viscosité cinématique ~150 cSt)",
    material: "Planche ultrafine en laiton CuZn39Pb2 ou Maillechort, serge amincie",
    technicalDetails: "L'inertie de ce mobile doit être minime pour ne pas absorber l'énergie d'accélération à chaque alternance de l'échappement."
  },
  {
    id: "echappement",
    name: "05. Le Mobile d'Échappement",
    role: "Dernier mobile du train de rouage. Reçoit l'énergie cinétique hautement démultipliée et la distribue pas à pas aux palettes de l'ancre sous forme d'impulsions.",
    pinionLeaves: 8,
    wheelTeeth: 15,
    rotationSpeed: "450 à 960 tours/heure (selon la fréquence du balancier)",
    torqueLevel: "Couple infinitésimal (µN · m) — Vitesse maximale",
    lubrication: "Moebius 9010 (pivots) et Moebius 9415 (palettes de l'ancre)",
    material: "Pignon acier poli miroir ; roue en acier trempé poli ou Silicium amagnétique",
    technicalDetails: "Denture asymétrique à talon selon la géométrie de l'échappement suisse. L'ébat de hauteur y est le plus serré : 0.015 à 0.025 mm."
  }
];

interface MobileAnatomyPart {
  id: string;
  title: string;
  sub: string;
  desc: string;
  spec: string;
}

const MOBILE_ANATOMY: MobileAnatomyPart[] = [
  {
    id: "planche",
    title: "La Planche de Roue",
    sub: "Couronne dentée & Croisillons",
    desc: "Disque circulaire découpé comportant la denture extérieure, la serge périphérique et les bras (croisillons). Les bras sont ajourés pour réduire au strict minimum l'inertie de rotation tout en conservant une rigidité géométrique absolue.",
    spec: "Laiton horloger CuZn39Pb2 ou Maillechort · Faux-rond et faux-plat < 0.005 mm"
  },
  {
    id: "pignon",
    title: "Le Pignon en Acier",
    sub: "Organe mené taillé dans la masse",
    desc: "Composant en acier trempé comportant les ailes (dents du pignon). Les ailes présentent des flancs polis bloqués pour offrir un coefficient de frottement minimal lors du contact avec la roue menante.",
    spec: "Acier 20AP trempé et revenu · Dureté 700 à 750 HV · Ailes polies au disque de bois"
  },
  {
    id: "tigeron",
    title: "Le Tigeron & l'Assiette",
    sub: "Arbre de liaison et de chassage",
    desc: "Partie cylindrique centrale de l'axe prolongeant le pignon. L'assiette est une portée d'appui sur laquelle vient s'ajuster la planche de roue avant d'être rivetée ou chassée à force avec une parfaite concentricité.",
    spec: "Rivetage à bouterolle sans voilage · Tolérance de battement axial < 0.003 mm"
  },
  {
    id: "pivots",
    title: "Les Pivots Roulés (Burnishing)",
    sub: "Extrémités d'appui ultra-durcies",
    desc: "Les tourillons de l'axe qui pénètrent dans les coussinets en rubis. Ils subissent une opération d'écrouissage appelée roulage (au tour à pivoter avec meule en carbure de tungstène Widia) qui lisse les aspérités et comprime la matière.",
    spec: "Rugosité Ra < 0.05 µm · Écrouissage augmentant la dureté superficielle de +15%"
  },
  {
    id: "rubis",
    title: "Les Rubis Synthétiques Olivés",
    sub: "Paliers à faible frottement Al₂O₃",
    desc: "Coussinets en corindon monocristallin synthétique. Le trou central présente un profil olivé (bombé à l'intérieur) : le pivot n'est en contact que sur une ligne annulaire étroite, ce qui réduit le frottement de 60% et retient la goutte d'huile par capillarité.",
    spec: "Corindon Al₂O₃ pur · Trou olivé poli miroir · Cuvette de réserve d'huile calibrée"
  }
];

interface GearPreset {
  name: string;
  vph: number;
  freqHz: number;
  zCentre: number;
  pMoyenne: number;
  zMoyenne: number;
  pSeconde: number;
  zSeconde: number;
  pEchappement: number;
  zEchappement: number;
  description: string;
}

const GEAR_PRESETS: GearPreset[] = [
  {
    name: "28'800 A/h (4 Hz) — Standard Suisse Contemporain",
    vph: 28800,
    freqHz: 4,
    zCentre: 64,
    pMoyenne: 8,
    zMoyenne: 60,
    pSeconde: 6,
    zSeconde: 72,
    pEchappement: 6,
    zEchappement: 15,
    description: "Configuration standard des calibres modernes suisses (ETA 2824-2, 2892A2, Sellita SW200). Haute stabilité dynamique face aux chocs du porter quotidien."
  },
  {
    name: "21'600 A/h (3 Hz) — Équilibre Historique & Moderne",
    vph: 21600,
    freqHz: 3,
    zCentre: 64,
    pMoyenne: 8,
    zMoyenne: 60,
    pSeconde: 8,
    zSeconde: 72,
    pEchappement: 6,
    zEchappement: 15,
    description: "Fréquence d'un grand nombre de calibres automatiques classiques et de montres de plongée robustes. Réduit l'usure mécanique tout en préservant une bonne réserve de marche."
  },
  {
    name: "18'000 A/h (2.5 Hz) — Basse Fréquence Traditionnelle",
    vph: 18000,
    freqHz: 2.5,
    zCentre: 64,
    pMoyenne: 8,
    zMoyenne: 60,
    pSeconde: 8,
    zSeconde: 60,
    pEchappement: 6,
    zEchappement: 15,
    description: "Fréquence des montres de poche historiques et des calibres à remontage manuel de grande taille (ex: ETA Unitas 6497/6498). Son tic-tac lent et sonore est très apprécié."
  },
  {
    name: "36'000 A/h (5 Hz) — Haute Fréquence de Chronographe",
    vph: 36000,
    freqHz: 5,
    zCentre: 64,
    pMoyenne: 8,
    zMoyenne: 75,
    pSeconde: 6,
    zSeconde: 72,
    pEchappement: 6,
    zEchappement: 15,
    description: "Calibres de très haute précision (ex: Zenith El Primero, Grand Seiko Hi-Beat). Permet la mesure chronographique exacte au 1/10e de seconde."
  }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "1. Quel est le rôle cinématique fondamental du rouage de finissage dans une montre mécanique ?",
    options: [
      "Multiplier le couple moteur tout en réduisant la vitesse pour remonter le balancier",
      "Multiplier la vitesse de rotation tout en démultipliant le couple fourni par le barillet",
      "Assurer une conversion linéaire de l'énergie sans modification de couple ni de vitesse",
      "Bloquer le barillet lorsque la réserve de marche est épuisée"
    ],
    correctAnswer: 1,
    explanation: "Le rouage est un multiplicateur de vitesse et un démultiplicateur de couple. En vertu du principe de conservation du travail (P = C · ω), la vitesse de rotation augmente considérablement du barillet vers l'échappement, tandis que le couple disponible diminue dans les mêmes proportions."
  },
  {
    question: "2. Pourquoi l'horlogerie suisse impose-t-elle le profil cycloïdal / ogival (NIHS 20-25) plutôt que la développante de cercle ?",
    options: [
      "Parce que la développante de cercle est protégée par des brevets industriels allemands",
      "Pour éviter la sous-coupe sur les pignons à faible nombre d'ailes (6 à 8) et concentrer l'engrènement sur l'arc de retraite",
      "Car les dents cycloïdales fonctionnent sans aucun besoin de lubrification d'atelier",
      "Pour permettre un entraînement bidirectionnel sans jeu d'engrenage"
    ],
    correctAnswer: 1,
    explanation: "Dans les calibres horlogers, les pignons ont très peu d'ailes (6, 7 ou 8). À cette échelle, la développante industrielle provoquerait une grave sous-coupe à la base de l'aile et un arc d'approche générateur de chocs. Le profil cycloïdal assure un engrènement doux situé après la ligne des centres (arc de retraite)."
  },
  {
    question: "3. Dans un mouvement battant à 28'800 A/h avec une roue d'échappement standard de 15 dents, quelle est sa vitesse de rotation horaire ?",
    options: [
      "480 tours/heure (8 tr/min)",
      "960 tours/heure (16 tr/min)",
      "1'920 tours/heure (32 tr/min)",
      "28'800 tours/heure (480 tr/min)"
    ],
    correctAnswer: 1,
    explanation: "Chaque tour d'une roue d'échappement à 15 dents génère 30 alternances (2 alternances par dent : une sur la palette d'entrée, une sur la sortie). Ainsi : 28'800 / 30 = 960 tours/heure, soit exactement 16 tours par minute."
  },
  {
    question: "4. Quelle valeur correspond à l'ébat de hauteur axial standard d'un mobile de finissage lors du contrôle d'atelier ?",
    options: [
      "0.001 à 0.005 mm (quasi-nul)",
      "0.02 à 0.04 mm (contrôlé aux brucelles n°3)",
      "0.20 à 0.40 mm (mesuré au réglet)",
      "1.00 mm (jeu de sécurité thermique)"
    ],
    correctAnswer: 1,
    explanation: "L'ébat de hauteur fonctionnel d'un mobile de finissage est rigoureusement compris entre 0.02 et 0.04 mm (0.015 à 0.025 mm pour la roue d'échappement). Un ébat inférieur risque de bloquer le mobile lors des variations thermiques ; un ébat supérieur provoque un déversement altérant l'engrènement."
  },
  {
    question: "5. Pourquoi utilise-t-on de la Moebius HP 1300 au barillet/centre et de la Moebius 9010 à la seconde/échappement ?",
    options: [
      "Pour différencier visuellement les calibres lors du contrôle qualité",
      "Car la HP 1300 résiste aux fortes pressions lentes, tandis que la 9010 fluide évite de freiner les mobiles rapides à très faible couple",
      "Parce que la Moebius 9010 est corrosive pour les pièces en laiton du barillet",
      "Car l'huile HP 1300 s'évapore instantanément à température ambiante"
    ],
    correctAnswer: 1,
    explanation: "C'est la règle d'or de la lubrification différentielle horlogère : les mobiles lents à fort couple (barillet, tigeron de centre) requièrent une huile haute pression visqueuse (HP 1300). Les mobiles rapides à couple infinitésimal (seconde, échappement) exigent une huile très fluide (9010) pour éviter tout freinage hydrodynamique."
  }
];

export default function RouagePage() {
  const [selectedMobile, setSelectedMobile] = useState<string>("centre");
  const [selectedAnatomy, setSelectedAnatomy] = useState<string>("planche");

  // Calculator state
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customZCentre, setCustomZCentre] = useState<number>(64);
  const [customPMoyenne, setCustomPMoyenne] = useState<number>(8);
  const [customZMoyenne, setCustomZMoyenne] = useState<number>(60);
  const [customPSeconde, setCustomPSeconde] = useState<number>(6);
  const [customZSeconde, setCustomZSeconde] = useState<number>(72);
  const [customPEchappement, setCustomPEchappement] = useState<number>(6);
  const [customZEchappement, setCustomZEchappement] = useState<number>(15);

  // Stepper Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Apply preset handler
  const handleApplyPreset = (index: number) => {
    setSelectedPreset(index);
    const p = GEAR_PRESETS[index];
    setCustomZCentre(p.zCentre);
    setCustomPMoyenne(p.pMoyenne);
    setCustomZMoyenne(p.zMoyenne);
    setCustomPSeconde(p.pSeconde);
    setCustomZSeconde(p.zSeconde);
    setCustomPEchappement(p.pEchappement);
    setCustomZEchappement(p.zEchappement);
  };

  // Calculations
  const ratioCentreToMoyenne = customZCentre / customPMoyenne;
  const ratioMoyenneToSeconde = customZMoyenne / customPSeconde;
  const ratioSecondeToEchappement = customZSeconde / customPEchappement;
  const totalRatio = ratioCentreToMoyenne * ratioMoyenneToSeconde * ratioSecondeToEchappement;
  const computedEscRotationsPerHour = totalRatio; // Since center does 1 turn/hour
  const computedEscRotationsPerMinute = computedEscRotationsPerHour / 60;
  const computedVph = totalRatio * customZEchappement * 2;
  const computedFreqHz = computedVph / 7200;

  // Quiz handlers
  const handleSelectQuizAnswer = (optIdx: number) => {
    if (userAnswers[currentQuizIdx] !== undefined) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuizIdx]: optIdx
    }));
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

  const activeMobileData = TRAIN_MOBILES.find(m => m.id === selectedMobile) || TRAIN_MOBILES[1];
  const activeAnatomyData = MOBILE_ANATOMY.find(a => a.id === selectedAnatomy) || MOBILE_ANATOMY[0];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* =================================================================== */}
        {/* HERO HEADER */}
        {/* =================================================================== */}
        <section className="space-y-4 text-center sm:text-left border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
              SEFRI · Convention Patronale CPIH
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Module 03 — Finissage &amp; Minuterie
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Norme NIHS 20-25
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Le Rouage &amp; la Démultiplication
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              La chaîne cinématique multiplicatrice de vitesse : de la réserve lente du barillet aux micro-impulsions de l&apos;échappement. Étude géométrique des dentures cycloïdales suisses, calculs d&apos;engrenages et contrôle d&apos;atelier des ébats.
            </p>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 1: KINEMATIC CHAIN & INTERACTIVE SVG CAD DIAGRAM */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Cinématique Horlogère
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                La Chaîne des Mobiles de Finissage
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
              <Zap className="w-3.5 h-3.5 text-[#B08D57]" />
              Multiplicateur de vitesse : q ≈ 960 à 3600
            </span>
          </div>

          {/* Interactive Mobile Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TRAIN_MOBILES.map((m) => {
              const isSelected = selectedMobile === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMobile(m.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-900 dark:text-neutral-100 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-mono font-semibold truncate">
                    {m.name.split(". ")[1]}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-1 truncate">
                    {m.rotationSpeed.split(" (")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive CAD SVG Train Diagram */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  Schéma Vectoriel CAD : Transmission du Barillet à l&apos;Échappement
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Cliquez sur un mobile pour inspecter ses caractéristiques
              </span>
            </div>

            {/* SVG Illustration */}
            <div className="w-full overflow-x-auto py-2">
              <svg
                viewBox="0 0 920 260"
                className="w-full min-w-[760px] h-auto select-none"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.05))" }}
              >
                <defs>
                  <linearGradient id="goldGearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFBA73" />
                    <stop offset="100%" stopColor="#9C7736" />
                  </linearGradient>
                  <linearGradient id="steelPinionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#64748B" />
                  </linearGradient>
                  <linearGradient id="barrelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#7A5816" />
                  </linearGradient>
                </defs>

                {/* Flow lines behind */}
                <path
                  d="M 120 130 L 290 130 L 470 130 L 640 130 L 790 130"
                  stroke="#B08D57"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />

                {/* 1. Barillet */}
                <g
                  className="cursor-pointer transition-transform hover:opacity-90"
                  onClick={() => setSelectedMobile("barillet")}
                >
                  <circle
                    cx="120"
                    cy="130"
                    r="85"
                    fill="url(#barrelGrad)"
                    stroke={selectedMobile === "barillet" ? "#B08D57" : "#5A3E0F"}
                    strokeWidth={selectedMobile === "barillet" ? "4" : "2"}
                    opacity="0.9"
                  />
                  <circle cx="120" cy="130" r="75" fill="none" stroke="#FAF5EB" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="120" cy="130" r="24" fill="#3E2D12" stroke="#FAF5EB" strokeWidth="2" />
                  <text x="120" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    BARILLET
                  </text>
                  <text x="120" y="142" textAnchor="middle" fill="#FCE794" fontSize="10" fontFamily="monospace">
                    Z = 80 dents
                  </text>
                  <text x="120" y="235" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace">
                    ~0.125 tr/h · 100% Couple
                  </text>
                </g>

                {/* Transmission arrow 1 */}
                <path d="M 205 130 L 235 130" stroke="#B08D57" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* 2. Mobile de Centre */}
                <g
                  className="cursor-pointer transition-transform hover:opacity-90"
                  onClick={() => setSelectedMobile("centre")}
                >
                  {/* Wheel */}
                  <circle
                    cx="290"
                    cy="130"
                    r="68"
                    fill="url(#goldGearGrad)"
                    stroke={selectedMobile === "centre" ? "#B08D57" : "#71511A"}
                    strokeWidth={selectedMobile === "centre" ? "4" : "2"}
                    opacity="0.9"
                  />
                  {/* Arms cutout */}
                  <circle cx="290" cy="130" r="54" fill="none" stroke="#FAF5EB" strokeWidth="1.5" opacity="0.4" />
                  {/* Steel pinion */}
                  <circle cx="290" cy="130" r="18" fill="url(#steelPinionGrad)" stroke="#334155" strokeWidth="2" />
                  <text x="290" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    CENTRE
                  </text>
                  <text x="290" y="140" textAnchor="middle" fill="#FAF5EB" fontSize="9" fontFamily="monospace">
                    Z=64 · z=10
                  </text>
                  <text x="290" y="220" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace">
                    1 tr/h (Chaussée)
                  </text>
                </g>

                {/* 3. Mobile de Moyenne */}
                <g
                  className="cursor-pointer transition-transform hover:opacity-90"
                  onClick={() => setSelectedMobile("moyenne")}
                >
                  <circle
                    cx="470"
                    cy="130"
                    r="56"
                    fill="url(#goldGearGrad)"
                    stroke={selectedMobile === "moyenne" ? "#B08D57" : "#71511A"}
                    strokeWidth={selectedMobile === "moyenne" ? "4" : "2"}
                    opacity="0.85"
                  />
                  <circle cx="470" cy="130" r="44" fill="none" stroke="#FAF5EB" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="470" cy="130" r="16" fill="url(#steelPinionGrad)" stroke="#334155" strokeWidth="2" />
                  <text x="470" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    MOYENNE
                  </text>
                  <text x="470" y="140" textAnchor="middle" fill="#FAF5EB" fontSize="9" fontFamily="monospace">
                    Z=60 · z=8
                  </text>
                  <text x="470" y="210" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace">
                    8 tr/h · ~1.6% Couple
                  </text>
                </g>

                {/* 4. Mobile de Seconde */}
                <g
                  className="cursor-pointer transition-transform hover:opacity-90"
                  onClick={() => setSelectedMobile("seconde")}
                >
                  <circle
                    cx="640"
                    cy="130"
                    r="56"
                    fill="url(#goldGearGrad)"
                    stroke={selectedMobile === "seconde" ? "#B08D57" : "#71511A"}
                    strokeWidth={selectedMobile === "seconde" ? "4" : "2"}
                    opacity="0.85"
                  />
                  <circle cx="640" cy="130" r="44" fill="none" stroke="#FAF5EB" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="640" cy="130" r="15" fill="url(#steelPinionGrad)" stroke="#334155" strokeWidth="2" />
                  <text x="640" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    SECONDE
                  </text>
                  <text x="640" y="140" textAnchor="middle" fill="#FAF5EB" fontSize="9" fontFamily="monospace">
                    Z=60 · z=8
                  </text>
                  <text x="640" y="210" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace">
                    60 tr/h (1 tr/min)
                  </text>
                </g>

                {/* 5. Mobile d'Échappement */}
                <g
                  className="cursor-pointer transition-transform hover:opacity-90"
                  onClick={() => setSelectedMobile("echappement")}
                >
                  <circle
                    cx="790"
                    cy="130"
                    r="38"
                    fill="#B08D57"
                    stroke={selectedMobile === "echappement" ? "#FFFFFF" : "#71511A"}
                    strokeWidth={selectedMobile === "echappement" ? "3" : "2"}
                  />
                  {/* Star wheel notches */}
                  <circle cx="790" cy="130" r="30" fill="none" stroke="#3E2D12" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="790" cy="130" r="14" fill="url(#steelPinionGrad)" stroke="#334155" strokeWidth="2" />
                  <text x="790" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    ÉCHAPPEMENT
                  </text>
                  <text x="790" y="139" textAnchor="middle" fill="#FAF5EB" fontSize="8" fontFamily="monospace">
                    Z=15 · z=8
                  </text>
                  <text x="790" y="190" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace">
                    450 à 960 tr/h
                  </text>
                </g>
              </svg>
            </div>

            {/* Selected Mobile Details Panel */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Cog className="w-5 h-5 text-[#B08D57]" />
                  <h4 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                    {activeMobileData.name}
                  </h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] font-semibold w-fit">
                  {activeMobileData.rotationSpeed}
                </span>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {activeMobileData.role}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <span className="font-mono text-neutral-400 block uppercase text-[10px]">Couple &amp; Puissance</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{activeMobileData.torqueLevel}</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <span className="font-mono text-neutral-400 block uppercase text-[10px]">Lubrification Spécifiée</span>
                  <span className="font-semibold text-[#8A6A3B] dark:text-[#D4B483]">{activeMobileData.lubrication}</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 sm:col-span-2 lg:col-span-1">
                  <span className="font-mono text-neutral-400 block uppercase text-[10px]">Matériaux &amp; Métallurgie</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{activeMobileData.material}</span>
                </div>
              </div>

              <div className="text-xs p-3 rounded-lg bg-[#B08D57]/5 border border-[#B08D57]/20 text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Règle de l&apos;art horloger : </strong>
                  {activeMobileData.technicalDetails}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: MOBILE ANATOMY DEEP-DIVE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Anatomie Mécanique de Précision
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Structure &amp; Usinage d&apos;un Mobile Horloger
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left list of anatomy parts */}
            <div className="space-y-2 md:col-span-1">
              {MOBILE_ANATOMY.map((part) => {
                const isSelected = selectedAnatomy === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedAnatomy(part.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-950 dark:text-neutral-50 shadow-sm"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {part.title}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 mt-0.5">
                        {part.sub}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#B08D57] translate-x-1" : "text-neutral-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right detailed inspector card */}
            <div className="md:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#B08D57]">
                  <Layers className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    Détail Technique SEFRI / CPIH
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                    {activeAnatomyData.title}
                  </h3>
                  <div className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                    {activeAnatomyData.sub}
                  </div>
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-2">
                  {activeAnatomyData.desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                  Exigences Métrologiques &amp; Tolérances d&apos;Établi
                </div>
                <div className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                  {activeAnatomyData.spec}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: INTERACTIVE GEAR CALCULATOR & FREQUENCY SIMULATOR */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Calculateur Cinématique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Calcul des Rapports d&apos;Engrenage &amp; Fréquence (A/h &amp; Hz)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Formule fondamentale : A/h = 2 · Z_échappement · q_total
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            {GEAR_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedPreset === idx
                    ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                    : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300"
                }`}
              >
                {preset.vph.toLocaleString("fr-CH")} A/h ({preset.freqHz} Hz)
              </button>
            ))}
          </div>

          {/* Preset Description */}
          <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
            <strong>Calibre de référence : </strong>
            {GEAR_PRESETS[selectedPreset].description}
          </div>

          {/* Interactive Calculation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <Sliders className="w-4 h-4 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-sm sm:text-base">
                  Configuration des Dents (Z) et Ailes (z)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                {/* Centre -> Moyenne */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                    Étage 1 : Centre → Moyenne
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Roue Centre (Z) : {customZCentre}</label>
                    <input
                      type="range"
                      min={40}
                      max={90}
                      value={customZCentre}
                      onChange={(e) => setCustomZCentre(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Pignon Moyenne (z) : {customPMoyenne}</label>
                    <input
                      type="range"
                      min={6}
                      max={12}
                      value={customPMoyenne}
                      onChange={(e) => setCustomPMoyenne(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div className="text-[11px] text-[#8A6A3B] dark:text-[#D4B483] font-semibold pt-1">
                    Rapport q₁ = {ratioCentreToMoyenne.toFixed(2)}
                  </div>
                </div>

                {/* Moyenne -> Seconde */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                    Étage 2 : Moyenne → Seconde
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Roue Moyenne (Z) : {customZMoyenne}</label>
                    <input
                      type="range"
                      min={40}
                      max={80}
                      value={customZMoyenne}
                      onChange={(e) => setCustomZMoyenne(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Pignon Seconde (z) : {customPSeconde}</label>
                    <input
                      type="range"
                      min={6}
                      max={12}
                      value={customPSeconde}
                      onChange={(e) => setCustomPSeconde(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div className="text-[11px] text-[#8A6A3B] dark:text-[#D4B483] font-semibold pt-1">
                    Rapport q₂ = {ratioMoyenneToSeconde.toFixed(2)}
                  </div>
                </div>

                {/* Seconde -> Échappement */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                    Étage 3 : Seconde → Échappement
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Roue Seconde (Z) : {customZSeconde}</label>
                    <input
                      type="range"
                      min={50}
                      max={80}
                      value={customZSeconde}
                      onChange={(e) => setCustomZSeconde(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1">Pignon Échappement (z) : {customPEchappement}</label>
                    <input
                      type="range"
                      min={6}
                      max={10}
                      value={customPEchappement}
                      onChange={(e) => setCustomPEchappement(Number(e.target.value))}
                      className="w-full accent-[#B08D57]"
                    />
                  </div>
                  <div className="text-[11px] text-[#8A6A3B] dark:text-[#D4B483] font-semibold pt-1">
                    Rapport q₃ = {ratioSecondeToEchappement.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Dents roue d'échappement */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Dents de la Roue d&apos;Échappement (standard suisse = 15 dents) :
                </span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  {customZEchappement} dents
                </span>
              </div>
            </div>

            {/* Results Card */}
            <div className="rounded-2xl border border-[#B08D57]/30 bg-gradient-to-b from-[#B08D57]/10 to-transparent dark:bg-neutral-900 p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483]">
                  <Gauge className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase font-bold tracking-wider">
                    Résultats Dynamiques du Rouage
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                      Rapport Total de Multiplication (q)
                    </span>
                    <span className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                      {totalRatio.toFixed(1)} : 1
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5 font-mono">
                      (q₁ · q₂ · q₃ = {ratioCentreToMoyenne.toFixed(1)} × {ratioMoyenneToSeconde.toFixed(1)} × {ratioSecondeToEchappement.toFixed(1)})
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                      Alternances par Heure (A/h)
                    </span>
                    <span className="text-3xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      {Math.round(computedVph).toLocaleString("fr-CH")} A/h
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5 font-mono">
                      Fréquence : {computedFreqHz.toFixed(2)} Hz ({(computedFreqHz * 2).toFixed(1)} battements/sec)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                      Vitesse Roue d&apos;Échappement
                    </span>
                    <span className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                      {computedEscRotationsPerHour.toFixed(0)} tr/h · ({computedEscRotationsPerMinute.toFixed(1)} tr/min)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 leading-tight">
                * Calcul rigoureusement conforme aux formules du manuel Théorie d&apos;Horlogerie Reymondin (FET).
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: CYCLOIDAL VS INVOLUTE TOOTH PROFILE (NIHS 20-25) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Géométrie Théorique · Norme NIHS 20-25
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Profil Cycloïdal vs Développante de Cercle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cycloidal Profile Card */}
            <div className="p-6 rounded-2xl border-2 border-[#B08D57]/40 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#B08D57]/20 text-[#8A6A3B] dark:text-[#D4B483]">
                  Standard Horloger Suisse
                </span>
                <span className="text-xs font-mono text-emerald-600 font-bold">✓ Rendement 98%</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                Profil Ogival / Cycloïdal (NIHS 20-25)
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Utilisé exclusivement dans les rouages fins horlogers. La saillie de la dent de roue est une <strong>ogive épicycloïdale</strong>, et les flancs des ailes de pignon sont <strong>radiaux hypocycloïdaux</strong>.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block">Arc de retraite prédominant :</strong>
                  Le contact a lieu presque exclusivement <em>après</em> la ligne des centres, ce qui élimine les frottements d&apos;arc-boutement et les chocs d&apos;entrée.
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block">Zéro sous-coupe sur petits pignons :</strong>
                  Permet de tailler des pignons extrêmement compacts à 6, 7 ou 8 ailes sans affaiblir la racine de la dent.
                </div>
              </div>
            </div>

            {/* Involute Profile Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4 opacity-85">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Standard Mécanique Industrielle
                </span>
                <span className="text-xs font-mono text-rose-500 font-bold">✗ Inadapté aux pignons &lt; 12 dents</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                Développante de Cercle (ISO 53)
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Universellement utilisé dans l&apos;automobile et les réducteurs industriels lourds pour son insensibilité aux variations d&apos;entraxe.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block">Phénomène de sous-coupe destructeur :</strong>
                  Dès que le nombre de dents descend sous z = 12, l&apos;outil de taillage taille la racine des dents, réduisant leur résistance mécanique de plus de 50%.
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block">Frottement de glissement élevé :</strong>
                  Génère un arc d&apos;approche où les dents glissent l&apos;une contre l&apos;autre avant la ligne des centres, dissipant la précieuse énergie du ressort moteur.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 5: ROUAGE DE MINUTERIE (1/12 RATIO) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Côté Cadran · Affichage Horaire
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Le Rouage de Minuterie &amp; le Rapport 1/12
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                  Démultiplication pour l&apos;Aiguille des Heures
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Tandis que la chaussée (portant l&apos;aiguille des minutes) effectue 1 tour par heure, l&apos;aiguille des heures ne doit effectuer qu&apos;un seul tour en 12 heures. Le rouage de minuterie assure cette démultiplication rigoureuse de <strong>1/12</strong>.
                </p>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2 font-mono text-xs">
                  <div className="font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                    Formule Cinématique du Rouage de Minuterie :
                  </div>
                  <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center font-bold">
                    q_minuterie = (Z_chaussée · Z_pignon_minuterie) / (Z_roue_minuterie · Z_roue_heures) = 1 / 12
                  </div>
                  <div className="text-[11px] text-neutral-500 pt-1">
                    Exemple usuel : (12 · 10) / (36 · 40) = 120 / 1440 = 1/12.
                  </div>
                </div>
              </div>

              {/* Lanternage & Friction Explanation */}
              <div className="p-5 rounded-xl bg-[#B08D57]/5 border border-[#B08D57]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483] font-bold font-serif text-base">
                  <Wrench className="w-4 h-4 text-[#B08D57]" />
                  Le Rôle Clé du Lanternage de la Chaussée
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  La chaussée n&apos;est pas fixée de manière rigide sur l&apos;axe de centre : elle est <strong>frictionnée à gras</strong> (opération de lanternage).
                </p>
                <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>En marche normale :</strong> La friction entraîne la chaussée et les aiguilles avec le mouvement.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Lors de la mise à l&apos;heure :</strong> La rotation de la couronne fait patiner la chaussée sans forcer ni casser les dents du rouage de finissage.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 6: ATELIER WORKSHOP CONTROLS & LUBRICATION */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Pratique d&apos;Établi &amp; Savoir-Faire Horloger
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Contrôle des Ébats &amp; Lubrification Différentielle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ébats Table */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base">
                  Tableau de Contrôle des Ébats Horlogers
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Ébat de hauteur (axial endshake)</span>
                    <span className="text-[#8A6A3B] dark:text-[#D4B483]">0.02 à 0.04 mm</span>
                  </div>
                  <p className="text-neutral-500">
                    Vérifié délicatement aux brucelles fines n°3 ou n°5 en soulevant le mobile entre platine et pont. Pour la roue d&apos;échappement, l&apos;ébat est de 0.015 à 0.025 mm.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Ébat d&apos;engrenage (jeu de denture)</span>
                    <span className="text-[#8A6A3B] dark:text-[#D4B483]">Régulier sur 360°</span>
                  </div>
                  <p className="text-neutral-500">
                    Testé au touché sur l&apos;ensemble du pourtour. Aucune dent ne doit présenter de jeu nul (risque de calage) ni de jeu excessif (baisse de rendement).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Ébat latéral de pivot</span>
                    <span className="text-[#8A6A3B] dark:text-[#D4B483]">0.005 à 0.010 mm</span>
                  </div>
                  <p className="text-neutral-500">
                    Jeu entre le diamètre extérieur du pivot poli et le trou du rubis synthétique olivé.
                  </p>
                </div>
              </div>
            </div>

            {/* Lubrication Table */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base">
                  Charte de Lubrification Différentielle (Moebius)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Moebius HP 1300 (Haute Pression)</span>
                    <span className="text-amber-600">Forte viscosité (~1250 cSt)</span>
                  </div>
                  <p className="text-neutral-500">
                    <strong>Emplacement :</strong> Arbre de barillet, tigeron de centre, mobile de moyenne. Résiste aux fortes pressions et aux vitesses lentes sans chasser l&apos;huile.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Moebius 9010 (Synthétique Fine)</span>
                    <span className="text-blue-500">Faible viscosité (~150 cSt)</span>
                  </div>
                  <p className="text-neutral-500">
                    <strong>Emplacement :</strong> Pivots de roue de seconde et d&apos;échappement. Fluide pour ne pas absorber le couple résiduel infinitésimal.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Roulage des Pivots (Widia)</span>
                    <span className="text-emerald-600">Ra &lt; 0.05 µm</span>
                  </div>
                  <p className="text-neutral-500">
                    Le brunissage au tour à pivoter écrouit la surface de l&apos;acier 20AP, fermant les microporosités et prévenant l&apos;usure abrasive du rubis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 7: COMPACT STEPPER QUIZ (SWISS EXAM FORMAT) */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Évaluation Certifiée
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Quiz de Validation Théorique (Format Examen Suisse)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              5 Questions · Réponse unique
            </span>
          </div>

          {/* Compact Stepper Container */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm">
            {!quizFinished ? (
              <div className="space-y-5">
                {/* Stepper Header with Pills & Score */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, qIdx) => {
                      const isCurrent = currentQuizIdx === qIdx;
                      const isAnswered = userAnswers[qIdx] !== undefined;
                      const isCorrect = userAnswers[qIdx] === QUIZ_QUESTIONS[qIdx].correctAnswer;

                      let pillStyle = "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border-neutral-200 dark:border-neutral-700";
                      if (isAnswered) {
                        pillStyle = isCorrect
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-bold";
                      } else if (isCurrent) {
                        pillStyle = "bg-[#B08D57] text-neutral-950 font-bold border-[#B08D57]";
                      }

                      return (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => setCurrentQuizIdx(qIdx)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center justify-center ${pillStyle}`}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20">
                      Question {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      Score : {calculateScore()} / {Object.keys(userAnswers).length}
                    </span>
                  </div>
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

                {/* Feedback Box */}
                {userAnswers[currentQuizIdx] !== undefined && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                  }`}>
                    <span className="font-bold block mb-0.5">
                      {userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                        ? "✓ Réponse exacte !"
                        : "✗ Explication technique :"}
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
                      ? "Félicitations ! Théorie du Rouage Validée."
                      : "Bon travail ! Quelques révisions conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez le calcul cinématique de démultiplication, la norme NIHS 20-25 et les ébats d'atelier. Prêt pour le Module 04 sur l'Échappement à Ancre !"
                      : "Prenez le temps de revoir les spécificités du profil cycloïdal et les calculs de rapports d'engrenage avant de poursuivre."}
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
            href="/theorie/barillet-ressort-moteur"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Module 02 : Le Barillet &amp; Ressort Moteur</span>
          </Link>

          <Link
            href="/theorie/echappement-ancre"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Module 04 : L&apos;Échappement à Ancre Suisse</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
