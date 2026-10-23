"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
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
  Award,
  Target
} from "lucide-react";

interface EscapementComponent {
  id: string;
  name: string;
  role: string;
  technicalRule: string;
  material: string;
  tolerances: string;
}

const ESCAPEMENT_COMPONENTS: EscapementComponent[] = [
  {
    id: "roue",
    name: "La Roue d'Échappement (15 Dents à Talon)",
    role: "Dernier mobile du rouage de transmission. Ses dents biseautées spécifiques comportent un plan de repos, un plan d'impulsion et un talon, permettant un double verrouillage et une poussée dynamique.",
    technicalRule: "Les faces de repos et d'impulsion des dents doivent présenter un poli miroir absolu pour réduire les frottements de glissement avec les palettes en rubis.",
    material: "Acier trempable 20AP trempé et poli bloqué, ou Silicium monocristallin (DRIE) ultra-léger et amagnétique.",
    tolerances: "Faux-rond et faux-plat < 0.003 mm · Épaisseur des dents : 0.08 mm"
  },
  {
    id: "ancre",
    name: "L'Ancre Suisse (Corps & Baguette)",
    role: "Pièce basculante intermédiaire transformant la rotation continue en va-et-vient. Elle supporte les deux palettes en rubis et se prolonge par une baguette terminée par la fourchette.",
    technicalRule: "L'équilibrage de l'ancre autour de son axe de pivotement doit être rigoureux pour éviter tout déséquilibre en position verticale.",
    material: "Acier trempé 20AP bleui thermiquement ou Maillechort doré haute précision.",
    tolerances: "Pivots coniques polis Ra < 0.05 µm · Diamètre : 0.080 mm"
  },
  {
    id: "palettes",
    name: "Les Palettes en Rubis (Entrée & Sortie)",
    role: "Pierres précieuses taillées avec précision insérées dans les bras de l'ancre. La palette d'entrée verrouille la roue par l'extérieur ; la palette de sortie la verrouille par l'intérieur.",
    technicalRule: "Chaque palette possède un plan de repos (angle de tirage 12° à 14°) et un plan d'impulsion incliné. Elles sont fixées et réglées à la gomme-laque chauffée sur réchaud d'établi.",
    material: "Corindon synthétique monocristallin Al₂O₃ rouge taillé et poli au diamant.",
    tolerances: "Orientation angulaire des plans au demi-degré près (± 0.5°)"
  },
  {
    id: "fourchette",
    name: "La Fourchette & le Dard de Sécurité",
    role: "L'extrémité active de l'ancre. L'encoche reçoit la cheville de plateau pour transmettre l'impulsion. Le dard central et les deux cornes latérales assurent la sécurité anti-renversement.",
    technicalRule: "Le dard est une fine goupille chassée qui vient effleurer la creusure du petit plateau avec un ébat de sécurité strict de 0.02 mm.",
    material: "Fourchette en acier poli ; dard en laiton doré ou acier trempé.",
    tolerances: "Ébat de dard : 0.015 à 0.025 mm · Ébat des cornes : 0.03 mm"
  },
  {
    id: "plateau",
    name: "Le Double Plateau & la Cheville d'Impulsion",
    role: "Monté sur l'axe de balancier. Le grand plateau porte la cheville en rubis (ellipse) ; le petit plateau comporte la creusure (encoche) laissant passer le dard.",
    technicalRule: "La cheville en rubis demi-cylindrique doit être parfaitement d'équerre avec le plateau et son plan plat orienté exactement dans l'axe de symétrie.",
    material: "Plateaux en acier doux ou laiton ; cheville en rubis synthétique poli miroir.",
    tolerances: "Ajustement serré glissant sur l'axe de balancier"
  }
];

const KINEMATIC_PHASES = [
  {
    phaseNumber: "01",
    title: "Le Repos (Verrouillage Statique)",
    summary: "La roue d'échappement est bloquée. Le balancier est totalement libre.",
    description: "Une dent de la roue d'échappement appuie fermement sur le plan de repos d'une des palettes de l'ancre. Le rouage est immobilisé. Pendant ce temps, le balancier parcourt librement son arc supplémentaire d'oscillation sans aucune perturbation.",
    keyDetail: "L'ancre est fermement maintenue contre sa butée par l'angle de tirage.",
    color: "#60A5FA"
  },
  {
    phaseNumber: "02",
    title: "Le Dégagement (Levée de Repos)",
    summary: "La cheville de plateau pénètre dans la fourchette et déverrouille l'ancre.",
    description: "Au retour de son oscillation, la cheville de plateau heurte la corne de la fourchette. L'ancre commence à pivoter. La dent de roue recule très légèrement (recul dynamique géométrique) pour quitter le plan de repos.",
    keyDetail: "Consomme une infime fraction de l'énergie cinétique du balancier (~1° à 2° de levée de repos).",
    color: "#A855F7"
  },
  {
    phaseNumber: "03",
    title: "L'Impulsion (Transfert d'Énergie)",
    summary: "La force motrice pousse l'ancre qui redonne de l'énergie au balancier.",
    description: "Sitôt libérée du repos, la dent pousse violemment sur le plan d'impulsion incliné de la palette. L'ancre bascule vivement et sa fourchette donne une vigoureuse impulsion à la cheville de plateau, entretenant l'oscillation du balancier.",
    keyDetail: "C'est l'unique moment où le balancier reçoit de l'énergie mécanique du barillet.",
    color: "#10B981"
  },
  {
    phaseNumber: "04",
    title: "La Chute (Le Choc Acoustique)",
    summary: "La dent quitte la palette et la roue fait un saut libre (le fameux 'tic-tac').",
    description: "La dent quitte le bec de fuite de la palette. La roue d'échappement accélère librement sur un angle minuscule (angle de chute de 1° à 2°) avant qu'une autre dent ne vienne heurter le plan de repos de la palette opposée.",
    keyDetail: "Le bruit caractéristique du tic-tac provient du choc de la dent tombant sur la face de repos du rubis.",
    color: "#F43F5E"
  },
  {
    phaseNumber: "05",
    title: "Le Tirage (Sécurité de Maintien)",
    summary: "L'angle de tirage plaque l'ancre contre sa goupille de limitation.",
    description: "Dès que la nouvelle dent touche la face de repos, l'inclinaison géométrique (angle de tirage de 12° à 14°) engendre une force centripète qui attire et plaque l'ancre contre sa goupille de limitation.",
    keyDetail: "Empêche tout déverrouillage accidentel de l'ancre lors des secousses ou mouvements brusques du bras.",
    color: "#E2B44F"
  }
];

const LIFT_ANGLES_DATA = [
  { calibre: "ETA 2824-2 / 2836-2 / 2834-2", liftAngle: "52°", freq: "4 Hz (28'800 A/h)", type: "Standard Suisse d'industrie" },
  { calibre: "ETA 2892A2 / Omega 1120", liftAngle: "51°", freq: "4 Hz (28'800 A/h)", type: "Automatique extra-plat" },
  { calibre: "Valjoux 7750 / 7751 / 7753", liftAngle: "52°", freq: "4 Hz (28'800 A/h)", type: "Chronographe automatique" },
  { calibre: "Rolex Calibre 3135 / 3235", liftAngle: "52° / 53°", freq: "4 Hz (28'800 A/h)", type: "Superlative Chronometer" },
  { calibre: "Patek Philippe 240 / 324 SC", liftAngle: "54° / 51°", freq: "3 Hz / 4 Hz", type: "Haute Horlogerie extra-plat" },
  { calibre: "Omega Co-Axial Calibre 2500 / 8500", liftAngle: "38° / 38°", freq: "3.5 Hz / 4 Hz", type: "Échappement Co-Axial spécifique" }
];

const QUIZ_QUESTIONS = [
  {
    question: "Dans le cycle de l'échappement à ancre suisse, à quel moment exact le balancier reçoit-il l'énergie motrice pour entretenir ses oscillations ?",
    options: [
      "Pendant la phase de repos",
      "Pendant la phase d'impulsion, lorsque la dent glisse sur le plan d'impulsion de la palette",
      "Pendant la chute libre de la roue d'échappement",
      "Pendant tout l'arc supplémentaire"
    ],
    correctAnswer: 1,
    explanation: "C'est l'essence même de l'échappement : durant la phase d'impulsion, la dent de la roue pousse le plan incliné de la palette, ce qui fait basculer la fourchette qui transmet une poussée dynamique à la cheville de plateau du balancier."
  },
  {
    question: "Quel est le rôle crucial de l'angle de tirage (12° à 14°) taillé sur les plans de repos des palettes en rubis ?",
    options: [
      "Augmenter la réserve de marche du barillet",
      "Plaquer activement l'ancre contre sa goupille de limitation sous la poussée de la dent, empêchant le déverrouillage lors des chocs",
      "Éviter de devoir huiler la roue d'échappement",
      "Permettre à la trotteuse de sauter seconde par seconde"
    ],
    correctAnswer: 1,
    explanation: "L'angle de tirage est la sécurité dynamique fondamentale : sous la pression continue de la roue d'échappement, la composante de force plaque fermement l'ancre contre sa butée. Sans tirage, la moindre secousse ferait sauter l'ancre et bloquerait la montre."
  },
  {
    question: "Quelle sécurité empêche l'ancre de basculer (renversement) lorsque le balancier parcourt son arc supplémentaire en dehors de la fourchette ?",
    options: [
      "Le ressort de barillet",
      "Le dard qui vient buter contre la périphérie du petit plateau si l'ancre tente de basculer",
      "La virole du spiral",
      "Le rochet de remontoir"
    ],
    correctAnswer: 1,
    explanation: "Le dard est la sécurité statique par excellence : situé sous la fourchette, il fait face au petit plateau du balancier avec un jeu infime (0.02 mm). Si un choc pousse l'ancre, le dard vient buter contre le pourtour du petit plateau et bloque le basculement accidentel."
  },
  {
    question: "Pourquoi est-il impératif de renseigner l'Angle de Levée (Lift Angle, ex: 52°) exact sur un chronocomparateur d'établi (Witschi) ?",
    options: [
      "Pour mesurer la réserve de marche en heures",
      "Parce que le microphone calcule l'amplitude d'oscillation du balancier à partir de la durée séparant le 1er et le 3e choc acoustique",
      "Pour remonter automatiquement le ressort moteur",
      "Pour calculer le poids du balancier en grammes"
    ],
    correctAnswer: 1,
    explanation: "Le chronocomparateur écoute 3 bruits : 1er choc (cheville dans fourchette), 2e choc (dent sur plan d'impulsion), 3e choc (dent tombant sur le repos). L'appareil calcule la vitesse angulaire et donc l'amplitude exacte à partir de l'angle de levée programmé."
  },
  {
    question: "Quelle est la règle d'or d'atelier suisse pour la lubrification de l'échappement à ancre avec la graisse Moebius 9415 ?",
    options: [
      "Huiler généreusement l'axe et les pivots de l'ancre",
      "Déposer une micro-goutte de graisse 9415 uniquement sur les plans d'impulsion des palettes (ou 2-3 dents de roue) ; ne jamais huiler les pivots d'ancre, le dard ou la cheville !",
      "Huiler le dard et les cornes de fourchette pour adoucir le contact",
      "Immerger l'ancre complète dans de l'huile minérale"
    ],
    correctAnswer: 1,
    explanation: "La graisse thixotropique Moebius 9415 ne doit être appliquée que sur les plans d'impulsion des palettes en rubis. Les pivots d'ancre travaillent à sec (l'huile les collerait par capillarité), et le dard ou la cheville doivent rester rigoureusement propres et secs !"
  }
];

export default function EchappementAncrePage() {
  const [selectedComp, setSelectedComp] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState(0);

  // Lift Angle Calculator State
  const [selectedLiftAngle, setSelectedLiftAngle] = useState(52); // ETA 2824 standard
  const [measuredContactTimeMs, setMeasuredContactTimeMs] = useState(6.2); // ms on Witschi

  // Quiz Stepper State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Simplified amplitude estimate: Amplitude ≈ (LiftAngle / ContactTime) * Constant
  const calculatedAmplitudeDeg = Math.round(Math.min(325, Math.max(180, (selectedLiftAngle / measuredContactTimeMs) * 34.5)));

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

  const activeComp = ESCAPEMENT_COMPONENTS[selectedComp];
  const activePhase = KINEMATIC_PHASES[selectedPhase];

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
              L&apos;Échappement à Ancre Suisse
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
              Module 04 · Organe Distributeur &amp; Sécurités
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Niveau : CFC Horloger Praticien &amp; Rhabilleur
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
              30 min de lecture · Cinématique &amp; Ébats d&apos;Atelier
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
            L&apos;Échappement à Ancre Suisse : Cinématique en 5 Phases &amp; Sécurités
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            Considéré comme l&apos;un des mécanismes les plus ingénieux de l&apos;histoire des techniques, 
            l&apos;<strong>échappement à ancre suisse</strong> assure le lien critique entre le rouage et le balancier. 
            Découvrez sa cinématique rigoureuse décomposée en <strong>5 phases immuables</strong> (repos, dégagement, impulsion, chute, tirage), 
            ses sécurités vitales (dard, cornes, creusure) et la métrologie de l&apos;<strong>angle de levée</strong>.
          </p>
        </section>

        {/* =================================================================== */}
        {/* 2. ANATOMIE MICROMÉTRIQUE DE L'ÉCHAPPEMENT (VUE CAD SVG) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 1 · Anatomie d&apos;Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Les Composants Clés de l&apos;Échappement à Ancre
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Cliquez sur chaque pièce pour analyser son rôle, ses exigences de finition et ses tolérances micrométriques.
            </p>
          </div>

          {/* SÉLECTEUR DE COMPOSANTS */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {ESCAPEMENT_COMPONENTS.map((comp, idx) => (
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
                <span>{comp.name.split(" (")[0]}</span>
              </button>
            ))}
          </div>

          {/* FICHE TECHNIQUE DU COMPOSANT SÉLECTIONNÉ */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase">
                  Composant d&apos;Échappement n°0{selectedComp + 1}
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
                  <h4 className="font-mono font-bold uppercase text-neutral-500 text-xs">Fonction Cinématique</h4>
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

          {/* DESSIN TECHNIQUE VECTORIEL CAD (ÉCHAPPEMENT EN POSITION) */}
          <div className="p-6 rounded-3xl border border-neutral-700/60 bg-[#15171D] text-[#E0E2E6] space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
              <span className="text-neutral-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]"></span>
                GÉOMÉTRIE VECTORIELLE D&apos;ENGAGEMENT DE L&apos;ANCRE SUISSE (ÉCHELLE 30:1)
              </span>
              <span className="text-neutral-400">PLAN CINÉMATIQUE INTERACTIF</span>
            </div>

            <div className="w-full overflow-x-auto py-4 flex justify-center">
              <svg viewBox="0 0 760 280" className="w-full max-w-[720px] h-auto select-none font-mono">
                {/* 1. Escape Wheel (Roue d'échappement - Left) */}
                <g transform="translate(180, 140)">
                  <circle cx="0" cy="0" r="95" fill="none" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4" fill="#60A5FA" />
                  {/* Wheel teeth with club feet */}
                  {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
                    <g key={deg} transform={`rotate(${deg})`}>
                      <line x1="0" y1="-16" x2="0" y2="-90" stroke="#CBD5E1" strokeWidth="1.5" />
                      {/* Club tooth profile */}
                      <path d="M 0 -90 L 12 -96 L 15 -84 L 0 -86 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
                    </g>
                  ))}
                  <text x="-60" y="-105" fill="#60A5FA" fontSize="11" fontWeight="bold">Roue d&apos;Échappement (15 dents)</text>
                </g>

                {/* 2. Anchor Body & Arms (Ancre Suisse - Center) */}
                <g transform="translate(390, 140)">
                  {/* Anchor staff center */}
                  <circle cx="0" cy="0" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#E2E8F0" />

                  {/* Left Arm (Palette d'entrée) */}
                  <path d="M 0 0 L -85 -55 L -105 -50 L -95 -30 Z" fill="#334155" stroke="#CBD5E1" strokeWidth="1.2" />
                  {/* Entry Ruby Jewel (Palette d'entrée en rubis rouge) */}
                  <polygon points="-115,-58 -92,-48 -100,-35 -123,-45" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
                  <text x="-160" y="-62" fill="#EF4444" fontSize="10" fontWeight="bold">Palette d&apos;Entrée</text>

                  {/* Right Arm (Palette de sortie) */}
                  <path d="M 0 0 L -85 55 L -105 50 L -95 30 Z" fill="#334155" stroke="#CBD5E1" strokeWidth="1.2" />
                  {/* Exit Ruby Jewel (Palette de sortie en rubis rouge) */}
                  <polygon points="-115,58 -92,48 -100,35 -123,45" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
                  <text x="-160" y="70" fill="#EF4444" fontSize="10" fontWeight="bold">Palette de Sortie</text>

                  {/* Fork Lever (Baguette & Fourchette vers la droite) */}
                  <line x1="0" y1="0" x2="110" y2="0" stroke="#CBD5E1" strokeWidth="3" />
                  {/* Fork Horns (Cornes) */}
                  <path d="M 100 -18 L 125 -15 L 115 0 L 125 15 L 100 18" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
                  {/* Dart (Dard de sécurité au milieu) */}
                  <line x1="108" y1="0" x2="132" y2="0" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="75" y="-25" fill="#F59E0B" fontSize="10" fontWeight="bold">Dard &amp; Cornes</text>
                </g>

                {/* Banking pins (Goupilles de limitation) */}
                <circle cx="390" cy="95" r="4" fill="#94A3B8" />
                <circle cx="390" cy="185" r="4" fill="#94A3B8" />
                <text x="400" y="98" fill="#94A3B8" fontSize="9">Butée</text>
                <text x="400" y="188" fill="#94A3B8" fontSize="9">Butée</text>

                {/* 3. Double Roller on Balance Axis (Plateau du Balancier - Right) */}
                <g transform="translate(560, 140)">
                  {/* Balance axis */}
                  <circle cx="0" cy="0" r="6" fill="#60A5FA" />
                  {/* Large roller rim */}
                  <circle cx="0" cy="0" r="42" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  {/* Small roller with crescent (Creusure) */}
                  <circle cx="0" cy="0" r="22" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Crescent notch (Creusure face au dard) */}
                  <path d="M -22 -8 A 10 10 0 0 1 -22 8 Z" fill="#0F172A" />

                  {/* Impulse Pin / Ellipse (Cheville de plateau en rubis) */}
                  <path d="M -35 -5 A 6 6 0 0 1 -35 5 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
                  <text x="-30" y="-48" fill="#EF4444" fontSize="10" fontWeight="bold">Cheville de Plateau</text>
                  <text x="10" y="60" fill="#94A3B8" fontSize="9">Axe de Balancier</text>
                </g>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span>🔴 Palettes et cheville en Corindon synthétique (Rubis poli miroir)</span>
              <span>🟡 Sécurités : Dard centré face à la creusure du petit plateau</span>
              <span>📐 Butées de limitation : définissent l&apos;angle total de levée de l&apos;ancre</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. LA CINÉMATIQUE RIGOUREUSE EN 5 PHASES */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 2 · Décomposition Cinématique
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Le Cycle en 5 Phases d&apos;une Alternance Horlogère
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              À chaque demi-oscillation du balancier, l&apos;échappement parcourt 5 étapes successives d&apos;une précision 
              absolue pour libérer une dent et transmettre l&apos;énergie d&apos;entretien.
            </p>
          </div>

          {/* SÉLECTEUR DE PHASE */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {KINEMATIC_PHASES.map((p, pIdx) => (
              <button
                key={p.phaseNumber}
                type="button"
                onClick={() => setSelectedPhase(pIdx)}
                className={`p-3 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer text-left border ${
                  selectedPhase === pIdx
                    ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-900 dark:text-neutral-100 font-bold shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <div className="text-[10px] text-neutral-400 uppercase">Phase {p.phaseNumber}</div>
                <div className="font-bold text-xs truncate">{p.title.split(" (")[0]}</div>
              </button>
            ))}
          </div>

          {/* FICHE DÉTAILLÉE DE LA PHASE */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-mono font-bold flex items-center justify-center text-sm">
                  {activePhase.phaseNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  {activePhase.title}
                </h3>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {activePhase.summary}
              </span>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              {activePhase.description}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 text-xs flex items-center gap-2">
              <span className="font-bold text-[#8A6A3B] dark:text-[#D4B483]">Point clé d&apos;atelier :</span>
              <span className="text-neutral-600 dark:text-neutral-400">{activePhase.keyDetail}</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. LES 3 SÉCURITÉS FONDAMENTALES & ÉBATS */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 3 · Prévention du Renversement
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Les 3 Sécurités de l&apos;Échappement à Ancre Suisse
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Le pire cauchemar d&apos;un échappement est le <strong>renversement</strong> : un basculement prématuré de l&apos;ancre 
              sous l&apos;effet d&apos;un choc alors que la cheville est à l&apos;extérieur. Trois barrières de sécurité interconnectées empêchent ce désastre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Le Dard &amp; le Petit Plateau
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Sécurité permanente :</strong> Pendant tout l&apos;arc supplémentaire où la cheville est absente, 
                le dard vient frôler la tranche circulaire du petit plateau. Si l&apos;ancre tente de basculer, le dard bute immédiatement sur le métal.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                Ébat de dard : <strong>0.02 mm</strong>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Les Cornes &amp; la Cheville
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Sécurité de transition :</strong> Au moment précis où la creusure se présente face au dard, 
                le dard ne peut plus bloquer. Ce sont alors les cornes de fourchette qui viennent buter contre la cheville de plateau si un choc intervient.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                Ébat de corne : <strong>0.03 mm</strong>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                L&apos;Angle de Tirage
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Sécurité statique dynamique :</strong> L&apos;inclinaison des faces de repos (12° à 14°) transforme la force 
                de la roue d&apos;échappement en un couple qui plaque continuellement l&apos;ancre contre sa goupille de limitation.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                Angle de tirage : <strong>12° à 14°</strong>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. MÉTROLOGIE : L'ANGLE DE LEVÉE SUR CHRONOCOMPARATEUR */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 4 · Diagnostic &amp; Contrôle Chronométrique
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              L&apos;Angle de Levée (Lift Angle) &amp; Mesure d&apos;Amplitude Witschi
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              L&apos;angle de levée du balancier est le paramètre fondamental que l&apos;horloger doit obligatoirement renseigner 
              sur son chronocomparateur pour obtenir une mesure exacte de l&apos;amplitude.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                    Sélectionnez le calibre horloger suisse :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LIFT_ANGLES_DATA.map((row, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedLiftAngle(parseInt(row.liftAngle))}
                        className={`p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                          selectedLiftAngle === parseInt(row.liftAngle)
                            ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-900 dark:text-neutral-100 font-bold"
                            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-neutral-300"
                        }`}
                      >
                        <div className="font-bold text-neutral-900 dark:text-neutral-100">{row.calibre}</div>
                        <div className="text-[11px] text-[#8A6A3B] dark:text-[#D4B483]">Angle de levée : {row.liftAngle}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Temps de passage acoustique mesuré par le micro (ms) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{measuredContactTimeMs} ms</span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="9.0"
                    step="0.1"
                    value={measuredContactTimeMs}
                    onChange={(e) => setMeasuredContactTimeMs(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>4.5 ms (balancier ultra-rapide / haute amplitude)</span>
                    <span>6.2 ms (standard 280°)</span>
                    <span>9.0 ms (faible amplitude)</span>
                  </div>
                </div>
              </div>

              {/* Rendu Écran Witschi */}
              <div className="p-6 rounded-3xl bg-neutral-900 text-white dark:bg-[#181A1F] border border-neutral-700/60 flex flex-col justify-between space-y-4 shadow-lg font-mono">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">CHRONOCOMPARATEUR</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      MESURE ACOUSTIQUE
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-neutral-400 block">Amplitude Calculée :</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-bold ${
                        calculatedAmplitudeDeg >= 260 && calculatedAmplitudeDeg <= 310
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}>
                        {calculatedAmplitudeDeg}°
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs pt-2 border-t border-neutral-800">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Angle de levée réglé :</span>
                      <span className="font-bold text-[#D4B483]">{selectedLiftAngle}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Durée d&apos;impulsion :</span>
                      <span className="text-neutral-300">{measuredContactTimeMs} ms</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 border-t border-neutral-800 pt-2">
                  Plage optimale d&apos;atelier : <strong>270° à 310°</strong> (position horizontale).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. LUBRIFICATION D'ATELIER : MOEBIUS 9415 */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 5 · Pratique d&apos;Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              La Lubrification Thixotropique : Moebius 9415
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-sky-300 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200 space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-800 dark:text-sky-300">
              <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>Pourquoi la graisse Moebius 9415 est-elle irremplaçable sur l&apos;ancre ?</span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-sky-800 dark:text-sky-300/90">
              L&apos;échappement subit des accélérations foudroyantes et des chocs à répétition (jusqu&apos;à 8 impacts par seconde). 
              Une huile classique serait immédiatement éjectée par la force centrifuge. 
              La graisse <strong>Moebius 9415</strong> est dotée de propriétés <strong>thixotropiques</strong> : 
              elle reste solide et gélifiée au repos, mais se liquéfie instantanément au moment où la dent frotte sur la palette, 
              avant de se figer à nouveau dès la fin du contact !
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/50 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block">✓ Ce qu&apos;il faut huiler :</span>
                <p className="text-sky-800 dark:text-sky-200 leading-relaxed">
                  Déposer une micro-quantité de Moebius 9415 sur le plan d&apos;impulsion de la palette de sortie, 
                  puis faire tourner la roue d&apos;échappement pour répartir le film sur 2 à 3 dents seulement.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/50 space-y-1">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">❌ Ce qui doit rester STRICTEMENT SEC :</span>
                <p className="text-sky-800 dark:text-sky-200 leading-relaxed">
                  Ne JAMAIS huiler les pivots de l&apos;ancre (ils travaillent à sec !), ni les cornes de fourchette, 
                  ni le dard, ni la cheville de plateau. L&apos;huile y créerait un collage par capillarité qui détruirait l&apos;amplitude.
                </p>
              </div>
            </div>
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
                Quiz de Validation Rapide : L&apos;Échappement à Ancre Suisse
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
                      ? "Félicitations ! Cinématique de l'Échappement Validée."
                      : "Bon travail ! Quelques révisions conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez les 5 phases cinématiques, les sécurités de dard et l'angle de levée. Prêt pour le Module 05 sur le Balancier-Spiral !"
                      : "Prenez le temps de revoir les phases de dégagement et de tirage ainsi que l'ébat de dard avant de poursuivre."}
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
            href="/theorie/rouage"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Module 03 : Le Rouage &amp; Démultiplication</span>
          </Link>

          <Link
            href="/theorie/balancier-spiral"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Module 05 : Le Balancier-Spiral &amp; Régulation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
