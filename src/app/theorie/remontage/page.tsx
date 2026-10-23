"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCw,
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
  Wrench,
  Disc,
  SlidersHorizontal
} from "lucide-react";

interface MechanismPart {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  material: string;
  tolerances: string;
  lubrication: string;
}

const MECHANISM_PARTS: MechanismPart[] = [
  {
    id: "tige",
    name: "01. La Tige de Remontoir",
    subtitle: "Axe de commande principal traversant la carrure",
    role: "Transmet les mouvements de rotation manuelle et les translations axiales de la couronne. Comporte un pivot de guidage, une portée cylindrique, un carré d'entraînement et une gorge où vient se loger le bec de tirette.",
    material: "Acier trempable 20AP trempé dur et revenu, poli bloqué sur les portées",
    tolerances: "Faux-rond < 0.003 mm · Tolérance du carré : h6 (+0 / -0.008 mm)",
    lubrication: "Graisse Moebius 9504 sur le carré, la gorge de tirette et la portée"
  },
  {
    id: "coulant",
    name: "02. Le Pignon Coulant (Baladeur)",
    subtitle: "Composant d'embrayage coulissant sur le carré",
    role: "Ajusté glissant sur le carré de la tige. Comporte une gorge annulaire centrale pour la fourchette de bascule, une denture Breguet (dents de scie) côté remontoir, et une denture droite côté minuterie.",
    material: "Acier 20AP trempé et revenu, créneaux polis miroir pour réduire le frottement",
    tolerances: "Jeu glissant sur le carré : 0.010 à 0.015 mm sans coincement",
    lubrication: "Graisse Moebius 9504 sur la gorge de bascule et la denture Breguet"
  },
  {
    id: "remontoir",
    name: "03. Le Pignon de Remontoir",
    subtitle: "Organe de transmission vers la roue de couronne",
    role: "Tourne fou sur la partie cylindrique de la tige. Comporte une denture Breguet frontale en prise avec le pignon coulant, et une denture droite périphérique qui engrène en permanence avec la roue de couronne.",
    material: "Acier trempé 20AP, denture polie au disque pour haut rendement",
    tolerances: "Ébat diamétral sur la tige : 0.015 mm · Ébat axial : 0.02 mm",
    lubrication: "Graisse Moebius 9504 sur la face frontale Breguet · HP 1300 sur la portée"
  },
  {
    id: "tirette",
    name: "04. La Tirette & le Sautoir de Tirette",
    subtitle: "Indexation mécanique et maintien axial de la tige",
    role: "La tirette pénètre dans la gorge de la tige par son bec et bascule lors des tractions de couronne. Le sautoir de tirette (lame-ressort) indexe fermement chaque position (remontage, correction rapide, mise à l'heure).",
    material: "Tirette en acier 20AP trempé poli ; sautoir en acier ressort écroui",
    tolerances: "Ébat de tirette : 0.02 mm · Force de saut calibrée (sensation de cran net)",
    lubrication: "Graisse Moebius 9504 sur le bec, le tenon de bascule et les crans du sautoir"
  },
  {
    id: "bascule",
    name: "05. La Bascule & le Ressort de Bascule",
    subtitle: "Levier de guidage axial du pignon coulant",
    role: "Guidée par le tenon de tirette, la bascule pivote pour déplacer axialement le pignon coulant. Le ressort de bascule applique une force permanente maintenant le coulant embrayé contre le pignon de remontoir.",
    material: "Acier découpé, revenu et satiné ; ressort en acier trempé poli",
    tolerances: "Jeu latéral de la fourchette dans la gorge du coulant : 0.020 mm",
    lubrication: "Graisse Moebius 9504 sur les deux becs de la fourchette et le plan d'appui"
  },
  {
    id: "couronne",
    name: "06. La Roue de Couronne & le Rochet",
    subtitle: "Chaîne d'armage du barillet avec filetage inversé",
    role: "La roue de couronne transmet le couple au rochet de barillet. Fixée par une vis à pas à gauche (sens anti-horaire de serrage pour empêcher le dévissage lors du remontage). Le rochet est solidaire de l'arbre de barillet.",
    material: "Roue de couronne et rochet en acier poli ou soleillé avec noyau en laiton",
    tolerances: "Ébat axial de la roue de couronne : 0.02 à 0.03 mm sous bague de centrage",
    lubrication: "Huile Moebius HP 1300 sur le noyau et la denture du rochet"
  }
];

interface AutoWindingFeature {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

const AUTO_FEATURES: AutoWindingFeature[] = [
  {
    title: "Masse Oscillante (Rotor) sur Roulement",
    subtitle: "Transformation de l'énergie cinétique du poignet",
    description: "Demi-disque monté sur un roulement à billes miniature sans lubrification (billes en céramique ZrO₂ ou acier inox). Pour maximiser le moment d'inertie (I = m · r²), la serge périphérique extérieure est alourdie avec un segment en tungstène haute densité (densité ~19.3 g/cm³) ou en or 21/22 carats.",
    highlight: "Rendement d'armage optimal même lors de mouvements légers du poignet."
  },
  {
    title: "Roues Inverseuses (Redresseur Bidirectionnel)",
    subtitle: "Système à cliquets internes ultra-légers",
    description: "Deux roues jumelles composées chacune de deux étages et de minuscules cliquets internes. Quel que soit le sens de rotation du rotor (horaire ou antihoraire), la chaîne cinématique redresse le mouvement dans un sens unique de remontage pour armer en continu le rochet de barillet.",
    highlight: "Lubrification exclusive au Lubeta V105 (immersion) ou Moebius 9010 ultrafine."
  },
  {
    title: "Bride Glissante de Barillet (Protection Anti-Casse)",
    subtitle: "Sécurité de surcouple à 100% d'armage",
    description: "Contrairement aux montres manuelles à bride fixe, le ressort automatique se termine par une lame d'acier élastique (bride glissante). Lorsque le ressort est totalement tendu, le couple de glissement (~800 à 1200 g · mm) est dépassé : la bride glisse sur la paroi interne du tambour préalablement graissée, évitant toute rupture du ressort ou des rouages.",
    highlight: "Graissage impératif à la graisse Moebius 9504 ou Klüber P125 sur la paroi crantée."
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
    question: "1. Quel est le rôle mécanique fondamental de la denture Breguet équipant le pignon coulant et le pignon de remontoir ?",
    options: [
      "Verrouiller la tige de remontoir dans la boîte pour empêcher son arrachement",
      "Constituer un embrayage unidirectionnel : armer le ressort en avant, et débrayer sans choc en arrière",
      "Permettre l'inversion automatique du sens de marche de la trotteuse",
      "Compenser l'usure de la chaussée lors de la mise à l'heure"
    ],
    correctAnswer: 1,
    explanation: "La denture Breguet forme un embrayage à cliquet frontal unidirectionnel. Lors du remontage manuel, les faces d'appui droites transmettent le couple au pignon de remontoir. Dans le sens inverse, les plans inclinés repoussent le pignon coulant en comprimant son ressort de bascule, permettant un débrayage doux sans endommager le cliquet."
  },
  {
    question: "2. Pourquoi la vis de la roue de couronne présente-t-elle généralement un pas de filetage à gauche (inversé) ?",
    options: [
      "Pour empêcher le démontage par des personnes non certifiées par la convention patronale",
      "Pour éviter que la vis ne se desserre sous l'action du couple exercé lors du remontage manuel",
      "Pour permettre un serrage magnétique sans tournevis d'horloger",
      "Parce que la platine est taraudée dans le sens de rotation de la terre"
    ],
    correctAnswer: 1,
    explanation: "En position de remontage, la rotation de la roue de couronne produit un couple de frottement dans le sens anti-horaire sur la vis. Un pas à gauche (qui se visse dans le sens anti-horaire) assure un auto-serrage naturel et empêche tout dévissage intempestif au cours des cycles d'armage."
  },
  {
    question: "3. Quelle est la séquence cinématique lors de la traction de la couronne en position de mise à l'heure ?",
    options: [
      "La tige fait tourner le rochet qui débraye directement le balancier-spiral",
      "La gorge de tige fait pivoter la tirette, dont le tenon bascule la bascule qui déplace le pignon coulant vers les renvois de minuterie",
      "Le pignon de remontoir s'avance et bloque la roue d'échappement",
      "La chaussée se désolidarise de la roue des heures par friction thermique"
    ],
    correctAnswer: 1,
    explanation: "Lors de la traction, l'encoche de la tige fait pivoter la tirette (indexée par son sautoir). Le tenon de la tirette pousse la bascule qui fait coulisser le pignon coulant sur le carré de la tige. Sa denture Breguet se dégage du remontoir, et sa denture droite engrène sur le renvoi de mise à l'heure."
  },
  {
    question: "4. Comment le barillet d'une montre à remontage automatique prévient-il la rupture du ressort-moteur une fois armé à 100% ?",
    options: [
      "Grâce à un fusible d'arrêt d'urgence situé au cœur de la masse oscillante",
      "Par une bride glissante en acier qui patine le long de la paroi interne du tambour dès que le couple maximal est atteint",
      "En bloquant définitivement les roues inverseuses à l'aide d'un cliquet de sécurité",
      "En débrayant la tige de remontoir par un électro-aimant passif"
    ],
    correctAnswer: 1,
    explanation: "Le ressort de montre automatique ne possède pas de point d'attache fixe sur le tambour : son extrémité est rivetée à une lame élastique appelée bride glissante. Quand le ressort est totalement tendu, le couple surpasse la friction et la bride glisse sur la paroi interne graissée (Klüber P125 / Moebius 9504), protégeant le mécanisme."
  },
  {
    question: "5. Quelle graisse de précision est préconisée par les manufactures suisses pour les frottements acier/acier du mécanisme de remontoir (carré de tige, denture Breguet, bascule) ?",
    options: [
      "Moebius 9010 (huile synthétique fluide pour échappement)",
      "Moebius 9504 (graisse synthétique haute pression thixotropique)",
      "Huile de silicone standard pour joints d'étanchéité",
      "Huile animale non raffinée pour pendulerie ancienne"
    ],
    correctAnswer: 1,
    explanation: "Le mécanisme de remontoir et de mise à l'heure subit de fortes pressions de contact sur de très faibles surfaces. La graisse synthétique thixotropique haute pression Moebius 9504 (ou 9501) offre une tenue exceptionnelle sans couler vers les rouages délicats du mouvement."
  }
];

export default function RemontagePage() {
  // Mechanism interactive position state
  // 1 = Remontage Manuel (Couronne Poussée)
  // 2 = Mise à l'Heure & Stop-Seconde (Couronne Tirée)
  const [crownPosition, setCrownPosition] = useState<number>(1);
  const [selectedPart, setSelectedPart] = useState<string>("tige");

  // Stepper Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Active component data
  const activePartData = MECHANISM_PARTS.find(p => p.id === selectedPart) || MECHANISM_PARTS[0];

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
              Remontoir &amp; Mise à l&apos;Heure
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Manuel &amp; Automatique
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Théorie Reymondin (FET)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Le Mécanisme de Remontage &amp; Mise à l&apos;Heure
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              L&apos;interface mécanique essentielle entre l&apos;homme et le calibre horloger : cinématique du remontoir à tirette et bascule, embrayage à denture Breguet, rouage de couronne à pas inversé, et chaîne automatique bidirectionnelle à inverseurs et bride glissante.
            </p>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 1: INTERACTIVE MECHANISM CINEMATICS (STATE 1 VS STATE 2) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Simulateur de Commande de Couronne
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Cinématique Interactive : Remontage vs Mise à l&apos;Heure
              </h2>
            </div>

            {/* Position Toggle Buttons */}
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
              <button
                type="button"
                onClick={() => setCrownPosition(1)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  crownPosition === 1
                    ? "bg-[#B08D57] text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Pos. 1 : Remontage Manuel (Poussée)</span>
              </button>

              <button
                type="button"
                onClick={() => setCrownPosition(2)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  crownPosition === 2
                    ? "bg-[#B08D57] text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pos. 2 : Mise à l&apos;Heure (Tirée)</span>
              </button>
            </div>
          </div>

          {/* Interactive CAD SVG Diagram */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  Schéma Technique CAD : Platine Côté Cadran &amp; Chaîne Cinématique
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                État actuel : {crownPosition === 1 ? "Couronne Poussée (Remontoir actif)" : "Couronne Tirée (Minuterie embrayée & Stop-seconde activé)"}
              </span>
            </div>

            {/* SVG Visual Representation */}
            <div className="w-full overflow-x-auto py-2">
              <svg
                viewBox="0 0 920 320"
                className="w-full min-w-[760px] h-auto select-none"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.06))" }}
              >
                <defs>
                  <linearGradient id="steelStem" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#CBD5E1" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="goldGearGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFBA73" />
                    <stop offset="100%" stopColor="#9C7736" />
                  </linearGradient>
                  <linearGradient id="activeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#64748B" />
                  </linearGradient>
                  <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF8F5" />
                    <stop offset="100%" stopColor="#F1EDE4" />
                  </linearGradient>
                </defs>

                {/* Main Plate Background Outline */}
                <rect x="40" y="20" width="840" height="280" rx="20" fill="url(#goldPlateGrad)" stroke="#E2D9CC" strokeWidth="2" opacity="0.6" />

                {/* 1. Stem (Tige de remontoir) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("tige")}>
                  {/* Stem Crown */}
                  <rect
                    x={crownPosition === 1 ? "60" : "40"}
                    y="135"
                    width="26"
                    height="50"
                    rx="4"
                    fill="#B08D57"
                    stroke="#7A5816"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {/* Stem Axis */}
                  <rect
                    x={crownPosition === 1 ? "86" : "66"}
                    y="152"
                    width="220"
                    height="16"
                    fill="url(#steelStem)"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Stem Square (Carré) */}
                  <rect
                    x={crownPosition === 1 ? "180" : "160"}
                    y="148"
                    width="45"
                    height="24"
                    fill="#64748B"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Stem Groove (Gorge de tirette) */}
                  <rect
                    x={crownPosition === 1 ? "145" : "125"}
                    y="155"
                    width="12"
                    height="10"
                    fill="#0F172A"
                    className="transition-all duration-300"
                  />
                  <text
                    x={crownPosition === 1 ? "73" : "53"}
                    y="130"
                    textAnchor="middle"
                    fill="#8A6A3B"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="transition-all duration-300"
                  >
                    COURONNE
                  </text>
                  <text
                    x={crownPosition === 1 ? "190" : "170"}
                    y="185"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="9"
                    fontFamily="monospace"
                    className="transition-all duration-300"
                  >
                    Carré
                  </text>
                </g>

                {/* 2. Pignon de Remontoir (Winding Pinion) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("remontoir")}>
                  <rect x="235" y="142" width="28" height="36" rx="3" fill="url(#activeSteel)" stroke="#334155" strokeWidth="1.5" />
                  {/* Breguet teeth hints */}
                  <line x1="235" y1="144" x2="238" y2="152" stroke="#1E293B" strokeWidth="1.5" />
                  <line x1="235" y1="152" x2="238" y2="160" stroke="#1E293B" strokeWidth="1.5" />
                  <line x1="235" y1="160" x2="238" y2="168" stroke="#1E293B" strokeWidth="1.5" />
                  <line x1="235" y1="168" x2="238" y2="176" stroke="#1E293B" strokeWidth="1.5" />
                  <text x="249" y="132" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Pignon Remontoir
                  </text>
                </g>

                {/* 3. Pignon Coulant (Sliding Pinion) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("coulant")}>
                  <rect
                    x={crownPosition === 1 ? "202" : "175"}
                    y="140"
                    width="30"
                    height="40"
                    rx="3"
                    fill={crownPosition === 1 ? "#B08D57" : "#64748B"}
                    stroke="#1E293B"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {/* Annular Groove (Gorge de bascule) */}
                  <rect
                    x={crownPosition === 1 ? "213" : "186"}
                    y="136"
                    width="8"
                    height="48"
                    fill="#334155"
                    opacity="0.8"
                    className="transition-all duration-300"
                  />
                  <text
                    x={crownPosition === 1 ? "217" : "190"}
                    y="202"
                    textAnchor="middle"
                    fill="#8A6A3B"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="transition-all duration-300"
                  >
                    Pignon Coulant
                  </text>
                </g>

                {/* 4. Tirette (Setting Lever) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("tirette")}>
                  {/* Pivot center */}
                  <circle cx="160" cy="85" r="10" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                  <circle cx="160" cy="85" r="4" fill="#E2E8F0" />
                  {/* Lever Body */}
                  <path
                    d={
                      crownPosition === 1
                        ? "M 160 85 L 151 155 L 140 152 L 155 75 Z"
                        : "M 160 85 L 131 155 L 120 152 L 155 75 Z"
                    }
                    fill="#94A3B8"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Setting Jumper interaction arm */}
                  <path
                    d={
                      crownPosition === 1
                        ? "M 160 85 L 210 70 L 215 78 Z"
                        : "M 160 85 L 205 60 L 210 68 Z"
                    }
                    fill="#94A3B8"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  <text x="145" y="65" textAnchor="middle" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    TIRETTE
                  </text>
                </g>

                {/* 5. Bascule (Clutch Lever) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("bascule")}>
                  {/* Bascule Pivot */}
                  <circle cx="280" cy="80" r="8" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
                  {/* Bascule Body stretching into the groove of sliding pinion */}
                  <path
                    d={
                      crownPosition === 1
                        ? "M 280 80 Q 255 105 217 140 L 213 145 Q 260 95 280 80 Z"
                        : "M 280 80 Q 240 100 190 140 L 186 145 Q 245 90 280 80 Z"
                    }
                    fill="#64748B"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  <text x="295" y="65" textAnchor="middle" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    BASCULE
                  </text>
                </g>

                {/* 6. Roue de Couronne & Rochet (Remontoir Chain) */}
                <g className="cursor-pointer" onClick={() => setSelectedPart("couronne")}>
                  {/* Crown Wheel */}
                  <circle
                    cx="390"
                    cy="160"
                    r="55"
                    fill="url(#goldGearGrad2)"
                    stroke={crownPosition === 1 ? "#B08D57" : "#71511A"}
                    strokeWidth={crownPosition === 1 ? "3" : "1.5"}
                    opacity={crownPosition === 1 ? "1" : "0.5"}
                  />
                  {/* Crown Wheel Left-Hand Thread Screw (Vis pas à gauche) */}
                  <circle cx="390" cy="160" r="14" fill="#334155" stroke="#FAF5EB" strokeWidth="1.5" />
                  {/* 3 lines marking left-hand thread */}
                  <line x1="383" y1="156" x2="397" y2="156" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="381" y1="160" x2="399" y2="160" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="383" y1="164" x2="397" y2="164" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="390" y="100" textAnchor="middle" fill="#8A6A3B" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    ROUE DE COURONNE
                  </text>
                  <text x="390" y="230" textAnchor="middle" fill="#B08D57" fontSize="9" fontFamily="monospace">
                    (Vis pas à gauche ↺)
                  </text>

                  {/* Ratchet Wheel (Rochet de Barillet) */}
                  <circle
                    cx="550"
                    cy="160"
                    r="70"
                    fill="url(#goldGearGrad2)"
                    stroke={crownPosition === 1 ? "#B08D57" : "#71511A"}
                    strokeWidth={crownPosition === 1 ? "3" : "1.5"}
                    opacity={crownPosition === 1 ? "1" : "0.5"}
                  />
                  <circle cx="550" cy="160" r="16" fill="#1E293B" stroke="#FAF5EB" strokeWidth="2" />
                  <rect x="544" y="154" width="12" height="12" fill="#E2E8F0" />
                  <text x="550" y="85" textAnchor="middle" fill="#8A6A3B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    ROCHET DE BARILLET
                  </text>
                  <text x="550" y="245" textAnchor="middle" fill="#8A6A3B" fontSize="10" fontFamily="monospace">
                    Fixé sur carré d&apos;arbre
                  </text>

                  {/* Click (Cliquet & Ressort) */}
                  <path d="M 470 110 L 490 120 L 485 128 Z" fill="#334155" stroke="#1E293B" strokeWidth="1" />
                  <text x="480" y="100" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="monospace">
                    Cliquet
                  </text>
                </g>

                {/* 7. Setting Wheels & Minuterie Chain (Active when crownPosition === 2) */}
                <g opacity={crownPosition === 2 ? "1" : "0.35"} className="transition-opacity duration-300">
                  {/* Setting wheel (Renvoi de mise à l'heure) */}
                  <circle
                    cx="200"
                    cy="250"
                    r="24"
                    fill="url(#goldGearGrad2)"
                    stroke={crownPosition === 2 ? "#B08D57" : "#94A3B8"}
                    strokeWidth={crownPosition === 2 ? "2" : "1"}
                  />
                  <text x="200" y="285" textAnchor="middle" fill="#8A6A3B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Renvoi Mise à l&apos;Heure
                  </text>

                  {/* Minute Wheel (Roue de Minuterie) */}
                  <circle
                    cx="265"
                    cy="250"
                    r="34"
                    fill="url(#goldGearGrad2)"
                    stroke={crownPosition === 2 ? "#B08D57" : "#94A3B8"}
                    strokeWidth={crownPosition === 2 ? "2" : "1"}
                  />
                  <text x="265" y="295" textAnchor="middle" fill="#8A6A3B" fontSize="9" fontFamily="monospace">
                    Roue Minuterie
                  </text>

                  {/* Cannon Pinion (Chaussée & Aiguille des minutes) */}
                  <circle
                    cx="345"
                    cy="250"
                    r="20"
                    fill="url(#steelStem)"
                    stroke={crownPosition === 2 ? "#B08D57" : "#94A3B8"}
                    strokeWidth={crownPosition === 2 ? "2" : "1"}
                  />
                  <text x="345" y="285" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Chaussée (Lanternage)
                  </text>
                </g>

                {/* 8. Stop-Second Lever & Balance (Active when crownPosition === 2) */}
                <g opacity={crownPosition === 2 ? "1" : "0.4"} className="transition-opacity duration-300">
                  {/* Balance Wheel Rim */}
                  <circle cx="750" cy="160" r="50" fill="none" stroke="#B08D57" strokeWidth="3" strokeDasharray="6 4" />
                  <circle cx="750" cy="160" r="10" fill="#334155" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="750" y="100" textAnchor="middle" fill="#8A6A3B" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    BALANCIER-SPIRAL
                  </text>

                  {/* Hacking Brake Lever */}
                  <path
                    d={
                      crownPosition === 2
                        ? "M 160 85 Q 400 40 700 155 L 702 163 Z"
                        : "M 160 85 Q 400 40 685 145 L 687 153 Z"
                    }
                    fill="none"
                    stroke={crownPosition === 2 ? "#E11D48" : "#94A3B8"}
                    strokeWidth={crownPosition === 2 ? "3" : "1.5"}
                    className="transition-all duration-300"
                  />
                  <text
                    x="750"
                    y="225"
                    textAnchor="middle"
                    fill={crownPosition === 2 ? "#E11D48" : "#94A3B8"}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {crownPosition === 2 ? "STOP-SECONDE ACTIF (Bloqué)" : "Stop-seconde au repos"}
                  </text>
                </g>
              </svg>
            </div>

            {/* Dynamic Status Explanation Banner */}
            <div className={`p-4 rounded-xl border transition-all text-xs sm:text-sm leading-relaxed ${
              crownPosition === 1
                ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
                : "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200"
            }`}>
              {crownPosition === 1 ? (
                <div className="space-y-1">
                  <span className="font-bold flex items-center gap-1.5 font-mono text-amber-800 dark:text-amber-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    Position 1 : Remontage Manuel Actif
                  </span>
                  <p>
                    Le pignon coulant est maintenu plaqué contre le pignon de remontoir par le ressort de bascule. La rotation horaire de la couronne entraîne le rochet via la roue de couronne pour armer le ressort de barillet. En tournant à l&apos;envers, la denture Breguet débraye automatiquement sans forcer sur le cliquet.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="font-bold flex items-center gap-1.5 font-mono text-blue-800 dark:text-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Position 2 : Mise à l&apos;Heure &amp; Stop-Seconde Engagés
                  </span>
                  <p>
                    La tirette a fait pivoter la bascule vers l&apos;intérieur. Le pignon coulant a quitté la denture Breguet pour engrener sa denture droite sur le renvoi de mise à l&apos;heure et la roue de minuterie. Simultanément, le levier de stop-seconde freine le balancier pour une synchronisation exacte à la seconde près.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: ANATOMICAL BREAKDOWN OF THE 6 KEY COMPONENTS */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Anatomie Mécanique &amp; Métallurgie
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Les 6 Composants Clés du Mécanisme de Remontoir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* List selector */}
            <div className="space-y-2 md:col-span-1">
              {MECHANISM_PARTS.map((part) => {
                const isSelected = selectedPart === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPart(part.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-950 dark:text-neutral-50 shadow-sm"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {part.name}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 mt-0.5 truncate max-w-[200px]">
                        {part.subtitle}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#B08D57] translate-x-1" : "text-neutral-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Inspector card */}
            <div className="md:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#B08D57]">
                  <Layers className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    Fiche Technique Officielle SEFRI / FET
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                    {activePartData.name}
                  </h3>
                  <div className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                    {activePartData.subtitle}
                  </div>
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-2">
                  {activePartData.role}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <span className="text-neutral-400 block uppercase text-[10px] font-bold">Matériau &amp; Traitement</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{activePartData.material}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <span className="text-neutral-400 block uppercase text-[10px] font-bold">Lubrification d&apos;Atelier</span>
                  <span className="font-bold text-[#8A6A3B] dark:text-[#D4B483]">{activePartData.lubrication}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#B08D57]/5 border border-[#B08D57]/20 space-y-1 sm:col-span-2">
                  <span className="text-neutral-500 block uppercase text-[10px] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                    Tolérance Métrologique &amp; Ébat Fonctionnel
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{activePartData.tolerances}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: AUTOMATIC WINDING SYSTEM DEEP-DIVE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Systèmes Automatiques Contemporains
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Le Remontage Automatique : Rotor, Inverseurs &amp; Bride Glissante
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AUTO_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] flex items-center justify-center">
                    {idx === 0 && <Disc className="w-5 h-5" />}
                    {idx === 1 && <RefreshCw className="w-5 h-5" />}
                    {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-neutral-950 dark:text-neutral-50">
                      {feature.title}
                    </h3>
                    <div className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483] mt-0.5">
                      {feature.subtitle}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Spécificité :</strong>
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: ATELIER WORKSHOP PROCEDURES & LUBRICATION CHART */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Savoir-Faire &amp; Rhabillage d&apos;Établi
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Protocole de Démontage &amp; Charte Tribologique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stem removal procedure */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base">
                  Règle d&apos;Établi : Extraction de la Tige de Remontoir
                </h3>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <strong className="text-neutral-900 dark:text-neutral-100 block font-mono text-sm">
                    1. Système à Tirette avec Plot / Bouton-Poussoir
                  </strong>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Mettre la tige en position de mise à l&apos;heure (ou remontage selon le manuel constructeur). Appuyer <em>très modérément</em> avec une cheville de bois taillée ou une pointe de brucelle sur le plot de tirette tout en tirant doucement la tige dans l&apos;axe.
                  </p>
                  <span className="text-rose-500 font-bold block text-[11px]">
                    Attention : Un appui excessif désengage le tenon de la bascule, imposant le démontage complet du cadran !
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <strong className="text-neutral-900 dark:text-neutral-100 block font-mono text-sm">
                    2. Système à Vis de Tirette Traditionnel
                  </strong>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Dévisser la vis de tirette d&apos;<strong>un tour à un tour et demi au maximum</strong> (ne jamais retirer complètement la vis sous peine de faire tomber la tirette sous le cadran). La tige doit alors glisser librement hors de son canon.
                  </p>
                </div>
              </div>
            </div>

            {/* Lubrication chart */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base">
                  Charte de Lubrification Spécifique au Remontoir
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Moebius 9504 (Haute Pression Thixotropique)</span>
                    <span className="text-blue-600">Graisse synthétique</span>
                  </div>
                  <p className="text-neutral-500">
                    <strong>Emplacements :</strong> Carré de tige, denture Breguet (coulant et remontoir), gorge de bascule, crans du sautoir de tirette. Résiste aux charges extrêmes d&apos;armage.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Moebius HP 1300 (Forte Viscosité)</span>
                    <span className="text-amber-600">Huile épaisse</span>
                  </div>
                  <p className="text-neutral-500">
                    <strong>Emplacements :</strong> Bague de roue de couronne, portée du rochet sur le pont de barillet, axe de tirette.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="flex justify-between font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span>Lubeta V105 / Moebius 9010</span>
                    <span className="text-emerald-600">Traitement ultra-fluide</span>
                  </div>
                  <p className="text-neutral-500">
                    <strong>Emplacements :</strong> Inverseurs automatiques. Traitement par trempage ou micropoint pour éviter le gommage des cliquets microscopiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 5: COMPACT STEPPER QUIZ (SWISS EXAM FORMAT) */}
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
                      ? "Félicitations ! Mécanisme de Remontoir & Automatique Validé."
                      : "Bon travail ! Quelques révisions d'atelier conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez parfaitement la commande à tirette, la denture Breguet, la roue de couronne à pas gauche et la bride glissante."
                      : "Prenez le temps de revoir la cinématique de mise à l'heure et les précautions d'extraction de la tige avant les travaux pratiques."}
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
