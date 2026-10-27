"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wrench,
  Layers,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Compass,
  Cpu,
  Eye,
  Sliders,
  ShieldCheck
} from "lucide-react";

// --- COMPOSANTS DE L'ARCHITECTURE D'ÉTABLI (ETA 6497 / CALIBRE MANUEL) ---
interface MovementPart {
  id: string;
  name: string;
  traditionalName: string;
  role: string;
  jewelsCount: number;
  screwsCount: number;
  torqueCnm: string;
  finishing: string;
  colorHex: string;
  desc: string;
  rules: string[];
}

const MOVEMENT_PARTS: MovementPart[] = [
  {
    id: "platine",
    name: "La Platine Principale",
    traditionalName: "Châssis / Base Plate",
    role: "Ossature fondamentale supportant l'ensemble des mobiles, du remontoir et de l'affichage.",
    jewelsCount: 9,
    screwsCount: 0,
    torqueCnm: "Support taraudé",
    finishing: "Perlage circulaire (côté ponts) & colimaçonnage (côté cadran)",
    colorHex: "#E2B44F",
    desc: "C'est la pièce maîtresse du mouvement. Elle reçoit les perçages de piliers, les puits de chatons et les fraisages des poches de barillet et d'échappement.",
    rules: [
      "Contrôle de planéité strict inférieur à 0.001 mm (1 µm)",
      "Taraudages fins NIHS protégés de tout résidu de limaille",
      "Perlage régulier à 50% de chevauchement sur machine à perler"
    ]
  },
  {
    id: "pont-barillet",
    name: "Pont de Barillet",
    traditionalName: "Pont de Ressort Moteur",
    role: "Maintient l'arbre de barillet et reçoit la roue de couronne et le cliquet.",
    jewelsCount: 2,
    screwsCount: 3,
    torqueCnm: "2.2 à 2.5 cNm",
    finishing: "Côtes de Genève, anglage poli et gravure de calibre",
    colorHex: "#F59E0B",
    desc: "Il absorbe la contrainte la plus violente du calibre : le couple de détente du ressort de barillet. Sa rigidité est cruciale pour l'alignement des dentures de rochet.",
    rules: [
      "Désarmage complet du barillet AVANT de desserrer ses vis",
      "Vérification de l'ébat axial de l'arbre de barillet (0.04 à 0.08 mm)",
      "Attention à la vis de roue de couronne à pas gauche (3 traits gravés)"
    ]
  },
  {
    id: "pont-rouage",
    name: "Pont de Rouage",
    traditionalName: "Pont de Finissage / Train Bridge",
    role: "Guide les pivots supérieurs de la roue de centre, roue moyenne et roue des secondes.",
    jewelsCount: 4,
    screwsCount: 2,
    torqueCnm: "1.8 cNm",
    finishing: "Côtes de Genève circulaires, moulures de pierres polies diamant",
    colorHex: "#3B82F6",
    desc: "Ce pont exige un doigté d'établi absolu : il faut guider simultanément 3 pivots délicats (diamètre 0.08 à 0.12 mm) dans leurs pierres de rubis respectives sans forcer.",
    rules: [
      "Ne jamais visser si les pivots ne sont pas tous engagés dans leurs huiliers",
      "Contrôle des ébats axiaux au palpeur ou à la brucelle douce",
      "Vérification de la liberté de rouage par le recul d'échappement"
    ]
  },
  {
    id: "pont-ancre",
    name: "Pont d'Ancre",
    traditionalName: "Pont d'Échappement",
    role: "Maintient l'ancre suisse et limite son ébat angulaire entre les goupilles de limitation.",
    jewelsCount: 2,
    screwsCount: 1,
    torqueCnm: "1.2 cNm",
    finishing: "Bout poli miroir, chanfrein fin",
    colorHex: "#EC4899",
    desc: "Minuscule pont de précision. Son pivot inférieur et son pivot supérieur doivent avoir un ébat axial minime (0.015 à 0.025 mm) pour que les palettes attaquent la roue d'échappement parfaitement à plat.",
    rules: [
      "Levée délicate à la brucelle Dumont n°5 sous binoculaire",
      "Interdiction de toucher aux palettes en rubis avec du métal",
      "Contrôle du dard et des cornes d'ancre après fixation"
    ]
  },
  {
    id: "coq",
    name: "Le Coq (Pont de Balancier)",
    traditionalName: "Balance Cock",
    role: "Supporte l'organe régulateur balancier-spiral, le bloc antichoc Incabloc et la raquetterie.",
    jewelsCount: 2,
    screwsCount: 1,
    torqueCnm: "1.5 cNm",
    finishing: "Gravure d'art traditionnelle, anglage main, poli noir",
    colorHex: "#10B981",
    desc: "Le pont le plus prestigieux et symbolique. Sa forme sinueuse rappelle la silhouette d'un coq dressé. Il supporte le porte-piton mobile et l'index de réglage avance/retard (+ / -).",
    rules: [
      "Dépose strictly verticale sans vriller le spiral thermocompensé",
      "Nettoyage du contre-pivot à la moelle de sureau et bain d'essence F",
      "Lubrification au Moebius 9010 : goutte centrée au 2/3 du diamètre du rubis"
    ]
  }
];

// --- FINITIONS HAUTE HORLOGERIE SUISSE ---
const FINISH_TYPES = [
  {
    id: "cotes-geneve",
    name: "Côtes de Genève",
    badge: "Décoration Linéaire",
    desc: "Vagues parallèles régulières réalisées au tour avec une meule buis imprégnée d'émeri. Capture la lumière sous chaque angle d'inclinaison.",
    typicalLocation: "Surface visible des ponts de rouage et de barillet"
  },
  {
    id: "perlage",
    name: "Perlage Circulaire",
    badge: "Texture Satinée",
    desc: "Cercles concentriques imbriqués créés à la cheville de bois ou caoutchouc chargée de pâte diamantée. Donne une profondeur veloutée.",
    typicalLocation: "Platine principale (côté ponts et côté cadran)"
  },
  {
    id: "anglage",
    name: "Anglage à la Main",
    badge: "Arêtes Vives Polies",
    desc: "Chanfreinage des arêtes à 45° à la lime douce, suivi d'un adoucissage au bois de fusain et polissage miroir sans aucune facette parasite.",
    typicalLocation: "Toutes les arêtes et pourtours des ponts de prestige"
  },
  {
    id: "gravure",
    name: "Gravure d'Art au Burin",
    badge: "Savoir-Faire Cabinotier",
    desc: "Motifs floraux ciselés au burin d'acier trempé par le maître graveur. Signature historique des coqs de balancier saxons et genevois.",
    typicalLocation: "Le Coq et les ponts d'échappement ajourés"
  }
];

// --- QUESTIONS DU QUIZ D'EXAMEN ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pourquoi le pont de balancier est-il traditionnellement surnommé « Le Coq » en horlogerie suisse ?",
    options: [
      "Parce que son réveil matin émettait un son de chant de coq au XVIIe siècle.",
      "En raison de sa découpe galbée historique évoquant la tête et la crête d'un coq fier.",
      "Parce qu'il est toujours fabriqué en laiton rouge teinté dans la masse.",
      "C'est un hommage au premier horloger officiel de la ville de Genève."
    ],
    correct: 1,
    explanation: "Dès le XVIe et XVIIe siècle, les horlogers ornaient ce pont visible d'une découpe ajourée rappelant la silhouette et la crête d'un coq. Le terme est resté le terme technique officiel des fiches d'atelier."
  },
  {
    id: 2,
    question: "Dans une construction de montre à ponts séparés, quelle est la règle d'or lors du remontage du pont de rouage ?",
    options: [
      "Serrer immédiatement la vis à fond pour forcer les pivots dans les trous.",
      "Guider délicatement chaque pivot dans son rubis du bout de la cheville de bois AVANT tout serrage de vis.",
      "Huiler généreusement les portées de ponts pour faciliter le glissement.",
      "Retirer le balancier pour créer de l'espace."
    ],
    correct: 1,
    explanation: "Forcer la vis d'un pont alors qu'un pivot de rouage (Ø 0.09 mm) n'est pas engagé dans son trou de pierre entraîne la casse immédiate du pivot ou le voilage de la roue moyenne."
  },
  {
    id: 3,
    question: "Quelle est la principale caractéristique de la platine 3/4 inventée par Ferdinand Adolph Lange en 1864 ?",
    options: [
      "La montre n'a que 3 rubis fonctionnels.",
      "Un unique grand pont rigide recouvre environ 75% du mouvement, seul le coq restant séparé.",
      "La platine est ajourée pour ne laisser visible que les trois-quarts du cadran.",
      "Le mouvement fonctionne uniquement sur 3 alternances par seconde."
    ],
    correct: 1,
    explanation: "La platine 3/4 saxonne remplace la multitude de ponts séparés par un seul châssis supérieur extrêmement rigide, figeant les entraxes et protégeant le rouage contre toute déformation aux chocs."
  },
  {
    id: 4,
    question: "En quoi consiste la finition d'excellence appelée « Perlage » appliquée sur la platine ?",
    options: [
      "Sertir des perles de nacre dans chaque trou de vis.",
      "Usiner une succession de cercles satinés qui se chevauchent à 50% à l'aide d'une meule ou cheville abrasive.",
      "Baigner la platine dans du mercure pour lui donner un brillant perlé.",
      "Frapper la platine au marteau pour durcir le laiton superficiellement."
    ],
    correct: 1,
    explanation: "Le perlage (ou bouchonnage) crée un damier de cercles concentriques réguliers qui piège les micro-poussières d'atelier et confère une profondeur visuelle satinée d'une rare élégance."
  }
];

export default function PlatinePontsPage() {
  const gradientId = useId();
  // Composant actif du mouvement éclaté
  const [activePartId, setActivePartId] = useState<string>("platine");
  // Finition active
  const [activeFinishId, setActiveFinishId] = useState<string>("cotes-geneve");

  // Quiz compact stepper
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const activePart = MOVEMENT_PARTS.find((p) => p.id === activePartId) || MOVEMENT_PARTS[0];
  const activeFinish = FINISH_TYPES.find((f) => f.id === activeFinishId) || FINISH_TYPES[0];

  // Gestion du quiz compact
  const handleSelectOption = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);
    if (idx === QUIZ_QUESTIONS[currentQuizIdx].correct) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setUserScore(0);
    setIsAnswerRevealed(false);
    setIsQuizCompleted(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HALO D'AMBIANCE HAUTE HORLOGERIE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 relative z-10 space-y-12">
        
        {/* --- FIL D'ARIANE HORLOGER & NORME SUISSE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/theorie" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Théorie</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/theorie/mouvements" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Architecture du Mouvement</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Platine &amp; Ponts</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              🇨🇭 Châssis Horloger Suisse · Calibre Ébauches SA ETA 6497-1
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Châssis, Ponts de Rouage &amp; Décorations de Haute Horlogerie
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            La Platine Principale <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 bg-clip-text text-transparent">
              &amp; l&apos;Architecture des Ponts
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Véritable squelette du garde-temps, la platine et ses ponts maintiennent les axes de rouage sous des tolérances micrométriques. Explorez la vue éclatée interactive d&apos;établi : <strong className="text-slate-900 dark:text-white font-semibold">pont de barillet</strong>, <strong className="text-slate-900 dark:text-white font-semibold">pont de rouage</strong>, <strong className="text-slate-900 dark:text-white font-semibold">pont d&apos;ancre</strong> et le mythique <strong className="text-slate-900 dark:text-white font-semibold">Coq</strong>.
          </p>

          {/* 4 Indicateurs Clés de Châssis */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Pierres de Rubis</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">17 Rubis</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Calibre ETA 6497-1</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Planéité de Platine</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">&lt; 1 µm</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Lappage Haute Précision</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Pont Évocateur</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Le Coq</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 mt-0.5">Balancier &amp; Incabloc</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Finitions Nobles</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Côtes &amp; Perlage</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-0.5">Anglage main poli 45°</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION VEDETTE 1 : L'EXPLORATEUR VECTORIEL CAD DE L'ARCHITECTURE         */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-amber-500/40 bg-white dark:bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🔬 Schéma Vectoriel CAD d&apos;Établi · Calibre 16½ Lignes ETA 6497
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Vue Éclatée de la Platine &amp; des Ponts
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Cliquez sur un pont pour isoler sa géométrie</span>
          </div>

          {/* Sélecteur des 5 Composants Châssis */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {MOVEMENT_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setActivePartId(part.id)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-1 font-mono text-xs ${
                  activePartId === part.id
                    ? "bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white font-bold shadow-md ring-1 ring-amber-500/20"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: part.colorHex }} />
                  <span className="text-[10px] text-slate-400">{part.jewelsCount} rubis</span>
                </div>
                <span className="font-serif font-bold text-sm leading-tight mt-1">{part.name}</span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 truncate">{part.traditionalName}</span>
              </button>
            ))}
          </div>

          {/* GRILLE : SCHÉMA CAD VECTORIEL (7 COLS) & DÉTAILS D'ATELIER (5 COLS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* DESSIN TECHNIQUE VECTORIEL SVG (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold">VUE CAD D&apos;ASSEMBLAGE HORLOGER</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{activePart.finishing}</span>
              </div>

              {/* Rendu SVG Haute Définition du Mouvement */}
              <div className="w-full overflow-hidden flex items-center justify-center py-4">
                <svg viewBox="0 0 540 440" className="w-full h-auto select-none font-mono">
                  <defs>
                    <pattern id="chassis-perlage" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" className="text-slate-300/60 dark:text-slate-800/80" strokeWidth="0.8" />
                    </pattern>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E2B44F" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B45309" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* 1. PLATINE PRINCIPALE (DISQUE ROND Ø 36.60 mm) */}
                  <g opacity={activePartId === "platine" ? 1 : 0.45} className="transition-opacity duration-300">
                    <circle cx="270" cy="220" r="185" className="fill-amber-500/10 dark:fill-amber-950/20 stroke-amber-500/60" strokeWidth="2.5" />
                    <circle cx="270" cy="220" r="180" fill="url(#chassis-perlage)" />
                    {/* Logement Barillet découpé */}
                    <circle cx="200" cy="150" r="75" fill="none" stroke="#E2B44F" strokeWidth="1.5" strokeDasharray="4 2" />
                    {/* Axe de centre */}
                    <circle cx="270" cy="220" r="8" fill="#F43F5E" stroke="#881337" strokeWidth="1.5" />
                    <text x="270" y="390" className="fill-slate-500 dark:fill-slate-400" fontSize="10" textAnchor="middle">Platine de base Ø 36.60 mm (16½ lignes)</text>
                  </g>

                  {/* 2. PONT DE BARILLET (Haut gauche) */}
                  <g
                    transform="translate(195, 140)"
                    opacity={activePartId === "pont-barillet" ? 1 : activePartId === "platine" ? 0.8 : 0.3}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => setActivePartId("pont-barillet")}
                  >
                    <path
                      d="M -75 -40 C -30 -75 50 -70 85 -20 C 60 40 -10 65 -70 30 Z"
                      fill={activePartId === "pont-barillet" ? "url(#" + gradientId + ")" : "#CBD5E1"}
                      className="dark:fill-slate-800 stroke-amber-500"
                      strokeWidth={activePartId === "pont-barillet" ? "2.5" : "1.5"}
                    />
                    {/* Pierre d'arbre de barillet */}
                    <circle cx="5" cy="-5" r="14" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.5" />
                    <circle cx="5" cy="-5" r="5" fill="#0F172A" />
                    {/* 3 Trous de vis de pont de barillet */}
                    <circle cx="-50" cy="15" r="5" fill="#2563EB" />
                    <circle cx="55" cy="-35" r="5" fill="#2563EB" />
                    <circle cx="-45" cy="-35" r="5" fill="#2563EB" />
                    <text x="5" y="45" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="9" textAnchor="middle">Pont de Barillet</text>
                  </g>

                  {/* 3. PONT DE ROUAGE (Centre & bas droite) */}
                  <g
                    transform="translate(320, 240)"
                    opacity={activePartId === "pont-rouage" ? 1 : activePartId === "platine" ? 0.8 : 0.3}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => setActivePartId("pont-rouage")}
                  >
                    <path
                      d="M -50 -70 C 0 -85 70 -50 85 10 C 60 70 -10 80 -60 20 Z"
                      fill={activePartId === "pont-rouage" ? "#60A5FA" : "#CBD5E1"}
                      className="dark:fill-slate-800 stroke-blue-500"
                      strokeWidth={activePartId === "pont-rouage" ? "2.5" : "1.5"}
                    />
                    {/* 3 Pierres de rouage (Centre, Moyenne, Seconde) */}
                    <circle cx="-35" cy="-40" r="10" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.2" />
                    <circle cx="10" cy="-20" r="9" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.2" />
                    <circle cx="45" cy="15" r="9" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.2" />
                    {/* 2 Vis de pont */}
                    <circle cx="-30" cy="10" r="4.5" fill="#2563EB" />
                    <circle cx="65" cy="-30" r="4.5" fill="#2563EB" />
                    <text x="15" y="55" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="9" textAnchor="middle">Pont de Rouage</text>
                  </g>

                  {/* 4. PONT D'ANCRE (Minuscule, vers le centre gauche) */}
                  <g
                    transform="translate(225, 270)"
                    opacity={activePartId === "pont-ancre" ? 1 : activePartId === "platine" ? 0.8 : 0.3}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => setActivePartId("pont-ancre")}
                  >
                    <path
                      d="M -15 -18 L 15 -18 L 8 20 L -8 20 Z"
                      fill={activePartId === "pont-ancre" ? "#EC4899" : "#CBD5E1"}
                      className="dark:fill-slate-800 stroke-pink-500"
                      strokeWidth={activePartId === "pont-ancre" ? "2" : "1"}
                    />
                    <circle cx="0" cy="-6" r="6" fill="#F43F5E" stroke="#9F1239" strokeWidth="1" />
                    <circle cx="0" cy="12" r="3" fill="#2563EB" />
                    <text x="0" y="34" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="8" textAnchor="middle">Pont d&apos;Ancre</text>
                  </g>

                  {/* 5. LE COQ (PONT DE BALANCIER - Bas gauche, forme de coq) */}
                  <g
                    transform="translate(180, 290)"
                    opacity={activePartId === "coq" ? 1 : activePartId === "platine" ? 0.8 : 0.3}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => setActivePartId("coq")}
                  >
                    {/* Corps galbé du coq */}
                    <path
                      d="M -50 -10 C -20 -40 30 -25 50 15 C 30 50 -30 45 -45 15 Z"
                      fill={activePartId === "coq" ? "#10B981" : "#CBD5E1"}
                      className="dark:fill-slate-800 stroke-emerald-500"
                      strokeWidth={activePartId === "coq" ? "2.5" : "1.5"}
                    />
                    {/* Bloc antichoc Incabloc (Rubis + Lyre) */}
                    <circle cx="25" cy="18" r="14" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.5" />
                    <circle cx="25" cy="18" r="7" fill="#FDE047" opacity="0.8" />
                    {/* Raquette et porte-piton (index) */}
                    <line x1="25" y1="18" x2="45" y2="40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                    <line x1="25" y1="18" x2="5" y2="35" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    {/* Vis de coq */}
                    <circle cx="-35" cy="0" r="5" fill="#2563EB" />
                    <text x="-5" y="-18" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="10" textAnchor="middle">Le Coq (Balancier)</text>
                  </g>
                </svg>
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <span>Composant actif : <strong className="text-amber-600 dark:text-amber-400">{activePart.name}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Couple : {activePart.torqueCnm}</span>
              </div>
            </div>

            {/* FICHE D'ATELIER DU COMPOSANT SÉLECTIONNÉ (5 COLS) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                    {activePart.traditionalName}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    {activePart.jewelsCount} Rubis · {activePart.screwsCount} Vis
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {activePart.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {activePart.desc}
                </p>

                {/* 3 Gestes d'Or Horlogers */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 block">
                    ⚡ Règles d&apos;Établi &amp; Précautions d&apos;Assemblage :
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    {activePart.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Encadré Finition */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Finition de Haute Horlogerie :
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">
                  {activePart.finishing}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2 : L'ANATOMIE DÉTAILLÉE DU COQ & DE LA RAQUETTERIE               */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-emerald-500/30 bg-white dark:bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                🐓 Le Pont Emblématique · Tradition &amp; Organe Réglant
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Le Coq : Anatomie d&apos;un Pont Mythique
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30">
              Support de l&apos;Antichoc Incabloc &amp; du Spiral
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                La Raquetterie (+ / -)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                La raquette porte deux goupilles (clé de raquette) qui enserrent la dernière spire du spiral. En déplaçant l&apos;index, l&apos;horloger modifie la longueur active du spiral, augmentant ou ralentissant la fréquence d&apos;oscillation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Le Porte-Piton Mobile
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Le piton fixe l&apos;extrémité extérieure du spiral. Le porte-piton mobile permet de régler le repère (beat error) au vibrographe Witschi pour annuler tout boitement et obtenir un repère sous 0.3 ms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Le Bloc Antichoc Incabloc
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Une lyre en ressort d&apos;acier maintient la pierre de contre-pivot. Lors d&apos;un choc violent (5&apos;000 G), le chaton glisse sur ses cônes de centrage, protégeant le pivot microscopique (Ø 0.09 mm) contre toute rupture.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 : LES FINITIONS D'ATELIER (CÔTES DE GENÈVE, PERLAGE, ANGLAGE)   */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              ✨ Haute Horlogerie Suisse · Poinçon de Genève &amp; Finitions Manuelles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Les Décorations Emblématiques des Ponts &amp; Platines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FINISH_TYPES.map((finish) => (
              <div
                key={finish.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold">
                    {finish.badge}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {finish.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {finish.desc}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-700 dark:text-slate-300">Emplacement :</strong> {finish.typicalLocation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 : LE QUIZ D'ÉTABLI COMPACT (MODE STEPPER RAFFINÉ)               */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-amber-500/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🎓 Évaluation d&apos;Atelier · Questions Clés de Châssis
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Quiz Express : Maîtrise de la Platine &amp; des Ponts
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Question {currentQuizIdx + 1} sur {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-24 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {!isQuizCompleted ? (
            <div className="max-w-3xl mx-auto space-y-6 py-2">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/30 uppercase">
                  Défi #{QUIZ_QUESTIONS[currentQuizIdx].id}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>
              </div>

              {/* 4 Options en boutons radio */}
              <div className="grid grid-cols-1 gap-2.5">
                {QUIZ_QUESTIONS[currentQuizIdx].options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === QUIZ_QUESTIONS[currentQuizIdx].correct;

                  let btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400";
                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-200 font-bold";
                    } else {
                      btnStyle = "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswerRevealed}
                      className={`p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswerRevealed && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      {isAnswerRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explication & Bouton Suivant */}
              {isAnswerRevealed && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 text-xs text-slate-800 dark:text-slate-200 space-y-3 font-mono">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-amber-700 dark:text-amber-400">💡 Conseil d&apos;Établi :</span>
                    <p className="leading-relaxed font-sans">{QUIZ_QUESTIONS[currentQuizIdx].explanation}</p>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-amber-200 dark:border-amber-900/40">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs shadow transition flex items-center gap-1.5"
                    >
                      <span>{currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? "Question Suivante" : "Consulter mon Bilan"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-xl mx-auto py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Bilan d&apos;Établi : Platine &amp; Ponts
                </h3>
                <p className="text-sm font-mono text-amber-700 dark:text-amber-400 font-bold">
                  Score Final : {userScore} / {QUIZ_QUESTIONS.length} ({Math.round((userScore / QUIZ_QUESTIONS.length) * 100)}%)
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {userScore === QUIZ_QUESTIONS.length
                  ? "Félicitations ! Vous maîtrisez parfaitement l'agencement des ponts, le rôle du Coq et les finitions de Haute Horlogerie."
                  : "Bonnes connaissances d'ensemble. Révisez le guidage délicat des pivots sous le pont de rouage pour parfaire votre pratique."}
              </p>
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-mono shadow hover:bg-amber-400 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recommencer le Test</span>
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5 : QUESTIONS FRÉQUENTES DE L'ÉTABLI (ACCORDÉON RAFFINÉ)        */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              💬 Pratique d&apos;Atelier &amp; Savoir-Faire d&apos;Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Foire Aux Questions de l&apos;Artisan Horloger
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Comment nettoyer une platine perlée sans rayer ses cercles microscopiques ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                La platine doit être nettoyée dans une machine à laver horlogère par bains successifs (solution de nettoyage Rubisol puis deux rinçages à l&apos;essence F). Pour sécher ou retirer une poussière ponctuelle, n&apos;utilisez jamais de chiffon, mais uniquement une poire soufflante et du Rodico propre tamponné doucement sans frotter.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Pourquoi le pont d&apos;ancre possède-t-il souvent une seule vis de fixation ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                L&apos;ancre subit des efforts mécaniques très faibles comparés au barillet. Un seul pilier de centrage calibré H6/p6 et une seule vis centrale suffisent amplement à immobiliser le pont, tout en libérant un espace précieux à proximité immédiate du balancier.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Quelle est la différence fondamentale entre le laiton horloger et le maillechort pour la platine ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Le laiton s&apos;oxyde naturellement et doit être recouvert d&apos;une couche galvanique protectrice (rhodiage ou dorage). Le maillechort (alliage cuivre-nickel-zinc sans plomb) ne s&apos;oxyde pas, offre une teinte argentée chaude et se patine noblement avec le temps, signature de la Haute Horlogerie (Lange &amp; Söhne, Patek Philippe).
              </p>
            </details>
          </div>
        </section>

        {/* --- NAVIGATION BAS DE PAGE --- */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/theorie/mouvements"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Architecture du Mouvement</span>
          </Link>

          <Link
            href="/pratique/laboratoire"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors group"
          >
            <span>Accéder au Master Lab d&apos;Atelier</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}
