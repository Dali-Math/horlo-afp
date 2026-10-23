"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Info,
  Ruler,
  Sparkles,
  Layers,
  Compass,
  Eye,
  BookOpen,
  Award,
  ChevronRight
} from "lucide-react";

interface LineDefinition {
  id: string;
  code: string;
  name: string;
  typeCategory: "continu" | "interrompu" | "mixte";
  widthStandard: string;
  widthPrecision: string;
  ratio: string;
  description: string;
  applications: string[];
  rules: string;
  color: string;
}

const LINE_DEFINITIONS: LineDefinition[] = [
  {
    id: "01.2",
    code: "01.2",
    name: "Trait continu fort",
    typeCategory: "continu",
    widthStandard: "0.50 mm",
    widthPrecision: "0.35 mm",
    ratio: "2d (Épais)",
    description: "Ligne fondamentale délimitant les contours extérieurs vus et les arêtes visibles des composants.",
    applications: [
      "Arêtes et contours visibles des platines, ponts, coqs et masses oscillantes",
      "Contours extérieurs des vis, chatons et piliers",
      "Limites des gorges et assiettes visibles"
    ],
    rules: "Doit toujours prédominer visuellement. Sa largeur est exactement le double (2d) de celle du trait fin.",
    color: "#E2E8F0"
  },
  {
    id: "01.1",
    code: "01.1",
    name: "Trait continu fin",
    typeCategory: "continu",
    widthStandard: "0.25 mm",
    widthPrecision: "0.18 mm",
    ratio: "1d (Fin)",
    description: "Ligne fine utilisée pour la géométrie d'aide, la cotation, les hachures et les éléments d'assemblage secondaires.",
    applications: [
      "Lignes de cote, lignes d'attache et lignes de rappel",
      "Hachures de coupe des métaux (laiton, maillechort, acier)",
      "Fonds de filets des vis et taraudages (norme NIHS 06-10)",
      "Cercles primitifs d'engrenages et cercles de perçage"
    ],
    rules: "Ne doit jamais couper un chiffre de cote. Les hachures doivent être inclinées à 45° ou 135° par rapport à l'axe.",
    color: "#94A3B8"
  },
  {
    id: "02.1",
    code: "02.1",
    name: "Trait interrompu fin",
    typeCategory: "interrompu",
    widthStandard: "0.25 mm",
    widthPrecision: "0.18 mm",
    ratio: "1d (Fin)",
    description: "Tirets réguliers révélant les volumes, perçages et cavités masqués sous la surface visible.",
    applications: [
      "Contours et arêtes cachés (noyures de rubis sous un pont)",
      "Trous borgnes de goupilles de centrage et de pieds de cadran",
      "Passages d'axes intérieurs et taraudages cachés"
    ],
    rules: "Règle suisse d'angle vif : les tirets doivent impérativement se toucher aux angles (jamais de vide à l'arête).",
    color: "#F59E0B"
  },
  {
    id: "04.1",
    code: "04.1",
    name: "Trait mixte fin (trait-point)",
    typeCategory: "mixte",
    widthStandard: "0.25 mm",
    widthPrecision: "0.18 mm",
    ratio: "1d (Fin)",
    description: "Alternance stricte d'un trait long et d'un point définissant l'axe de symétrie ou de rotation.",
    applications: [
      "Axes de révolution des mobiles (balancier, roue d'échappement, barillet)",
      "Plans de symétrie des ponts et découpes",
      "Trajectoires géométriques des centres de pivots"
    ],
    rules: "Doit débuter et se terminer par un élément long (tiret), dépassant de 2 à 3 mm du contour de la pièce.",
    color: "#60A5FA"
  },
  {
    id: "04.2",
    code: "04.2",
    name: "Trait mixte avec extrémités fortes",
    typeCategory: "mixte",
    widthStandard: "0.50 / 0.25 mm",
    widthPrecision: "0.35 / 0.18 mm",
    ratio: "2d aux bouts / 1d au centre",
    description: "Tracé indiquant le parcours exact d'un plan sécant de coupe, avec renforts aux changements de plan.",
    applications: [
      "Indication des plans de coupe A-A traversant le rouage ou l'échappement",
      "Décrochements à angle droit des coupes brisées à plans parallèles"
    ],
    rules: "Les segments forts aux extrémités portent les flèches perpendiculaires du sens de regard et les lettres majuscules d'identification.",
    color: "#F43F5E"
  }
];

export default function TypesLignesPage() {
  const [selectedLineId, setSelectedLineId] = useState<string>("01.2");
  const [filterCategory, setFilterCategory] = useState<"all" | "continu" | "interrompu" | "mixte">("all");
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const selectedLine = LINE_DEFINITIONS.find((l) => l.id === selectedLineId) || LINE_DEFINITIONS[0];

  const filteredLines = LINE_DEFINITIONS.filter((l) => {
    if (filterCategory === "all") return true;
    return l.typeCategory === filterCategory;
  });

  const quizQuestions = [
    {
      question: "En dessin horloger haute précision (échelle 5:1 ou 10:1), quel groupe de traits est préconisé selon la norme ISO 128-2 ?",
      options: [
        "0.70 mm (fort) et 0.35 mm (fin)",
        "0.35 mm (fort) et 0.18 mm (fin)",
        "0.50 mm (fort) et 0.10 mm (fin)",
        "0.25 mm sans distinction de trait"
      ],
      correctIndex: 1,
      explanation: "Pour éviter l'écrasement visuel des micro-détails (fentes de vis, gorges d'huilage), le groupe 0.35 / 0.18 mm est le standard suisse de haute horlogerie."
    },
    {
      question: "Quelle règle impérative régit l'intersection d'un trait interrompu (arête cachée) avec un contour vu ?",
      options: [
        "Un espace blanc obligatoire de 1 mm doit séparer les deux traits.",
        "Le tiret doit toucher exactement le contour ou l'angle sans laisser d'espace vide.",
        "On remplace le trait interrompu par une croix fine.",
        "Le trait interrompu doit dépasser de 2 mm le contour vu."
      ],
      correctIndex: 1,
      explanation: "C'est la règle d'angle vif de l'école horlogère : les tirets doivent impérativement se toucher à la rencontre pour lever toute ambiguïté géométrique."
    },
    {
      question: "Quelle ligne est normalisée pour représenter le fond de filet d'une vis micrométrique (NIHS 06-10) ?",
      options: [
        "Trait continu fort (01.2)",
        "Trait mixte fin (04.1)",
        "Trait continu fin (01.1)",
        "Trait interrompu fort"
      ],
      correctIndex: 2,
      explanation: "Le sommet du filet de la vis est en trait fort (01.2), tandis que le fond de filet est tracé en trait continu fin (01.1)."
    }
  ];

  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleValidateQuiz = () => {
    setIsAnswerSubmitted(true);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setActiveQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="min-h-screen bg-[#0E1015] text-[#E0E2E6] selection:bg-[#B08D57]/30 selection:text-[#D4B483] pb-24">
      {/* 1. BREADCRUMB & HEADER BAR */}
      <div className="border-b border-neutral-800 bg-[#12141A]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-neutral-200 transition-colors">
              Accueil
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie" className="hover:text-neutral-200 transition-colors">
              Théorie
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie/lecture-de-plan" className="hover:text-neutral-200 transition-colors">
              Lecture de Plan
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#D4B483] font-medium">Types de Lignes (ISO 128-2)</span>
          </nav>

          <Link
            href="/theorie/lecture-de-plan"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400 hover:text-[#D4B483] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sommaire Plan</span>
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* 2. HERO INTRODUCING ISO 128-2 STANDARD */}
        <div className="border-b border-neutral-800 pb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/15 text-[#D4B483] border border-[#B08D57]/30 flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-[#D4B483]" />
              Norme ISO 128-2:2020
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
              Référentiel Horloger Suisse CPIH / SEFRI
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-950/40 text-sky-300 border border-sky-800/50">
              Microtechnique de Précision
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            Types de Lignes &amp; Épaisseurs Normalisées
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-4xl leading-relaxed">
            En dessin technique d&apos;horlogerie, la lisibilité d&apos;un composant miniature dépend d&apos;une hiérarchie graphique rigoureuse.
            Chaque trait obéit à un rapport géométrique strict de{" "}
            <span className="text-[#D4B483] font-mono font-bold">1 : 2</span> entre le trait fin ($d$) et le trait fort ($2d$).
            Ce contraste permet à l&apos;opérateur de distinguer instantanément la matière réelle, les arêtes cachées et les axes de pivotement.
          </p>

          {/* Quick metric highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl border border-neutral-800 bg-[#16181F] space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Rapport Normatif</div>
              <div className="text-2xl font-mono font-bold text-[#D4B483]">1 : 2 (d / 2d)</div>
              <div className="text-xs text-neutral-400">Deux largeurs associées par dessin</div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-[#16181F] space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Groupe Horlogerie Fine</div>
              <div className="text-2xl font-mono font-bold text-sky-400">0.35 / 0.18 mm</div>
              <div className="text-xs text-neutral-400">Échappements, rubis, roues miniatures</div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-[#16181F] space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Groupe Standard</div>
              <div className="text-2xl font-mono font-bold text-emerald-400">0.50 / 0.25 mm</div>
              <div className="text-xs text-neutral-400">Platines, ponts d&apos;ensemble et boîtes</div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE CAD BLUEPRINT VIEWER (SVG) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#D4B483]" />
                Plan CAD Interactif : Coupe Partielle d&apos;un Pont &amp; Logement de Rubis
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Cliquez sur les types de lignes ci-dessous ou survolez le dessin pour inspecter leur application en microtechnique.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Ligne active :</span>
              <span className="px-2.5 py-1 rounded bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#D4B483] font-mono text-xs font-bold">
                {selectedLine.code} - {selectedLine.name}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7 rounded-2xl border border-neutral-800 bg-[#15171D] space-y-6">
            {/* SVG Canvas */}
            <div className="w-full overflow-x-auto flex justify-center py-2 bg-[#0B0D11] rounded-xl border border-neutral-800/80 p-4 shadow-inner">
              <svg viewBox="0 0 820 260" className="w-full max-w-[800px] h-auto select-none font-mono">
                {/* Patterns */}
                <defs>
                  <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1D2028" strokeWidth="0.6" />
                  </pattern>
                  <pattern id="hatch-pattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="8"
                      stroke={selectedLineId === "01.1" ? "#60A5FA" : "#64748B"}
                      strokeWidth={selectedLineId === "01.1" ? "1.5" : "0.9"}
                    />
                  </pattern>
                </defs>

                {/* Grid Background */}
                <rect width="820" height="260" fill="url(#grid-pattern)" rx="8" />

                {/* Title inside CAD canvas */}
                <text x="30" y="32" fill="#71717A" fontSize="10" letterSpacing="1">
                  ÉCHELLE 10:1 · MATIÈRE : LAITON HORLOGER CuZn39Pb2 · TOLÉRANCE GÉNÉRALE ISO 2768-m
                </text>

                {/* --- 1. AXIS OF SYMMETRY / REVOLUTION (Type 04.1 Trait mixte fin) --- */}
                <g
                  className="cursor-pointer transition-opacity"
                  onClick={() => setSelectedLineId("04.1")}
                  opacity={selectedLineId === "04.1" ? 1 : 0.8}
                >
                  <line
                    x1="60"
                    y1="130"
                    x2="760"
                    y2="130"
                    stroke={selectedLineId === "04.1" ? "#38BDF8" : "#60A5FA"}
                    strokeWidth={selectedLineId === "04.1" ? "2.5" : "1.2"}
                    strokeDasharray="18 4 3 4"
                  />
                  <text x="765" y="133" fill="#60A5FA" fontSize="10" fontWeight="bold">
                    AXE 04.1
                  </text>
                </g>

                {/* --- 2. HATCHED CUT BODY (Trait fin 01.1 & Trait fort 01.2) --- */}
                {/* Upper body */}
                <polygon
                  points="140,50 500,50 500,90 640,90 640,130 140,130"
                  fill="url(#hatch-pattern)"
                  stroke={selectedLineId === "01.2" ? "#38BDF8" : "#E2E8F0"}
                  strokeWidth={selectedLineId === "01.2" ? "3.5" : "2.4"}
                  className="cursor-pointer"
                  onClick={() => setSelectedLineId("01.2")}
                />
                {/* Lower body symmetrical */}
                <polygon
                  points="140,210 500,210 500,170 640,170 640,130 140,130"
                  fill="url(#hatch-pattern)"
                  stroke={selectedLineId === "01.2" ? "#38BDF8" : "#E2E8F0"}
                  strokeWidth={selectedLineId === "01.2" ? "3.5" : "2.4"}
                  className="cursor-pointer"
                  onClick={() => setSelectedLineId("01.2")}
                />

                {/* --- 3. RUBY JEWEL BEARING HOUSING (Noyure & Chaton) --- */}
                <rect
                  x="280"
                  y="90"
                  width="110"
                  height="80"
                  fill="#881337"
                  fillOpacity="0.4"
                  stroke={selectedLineId === "01.2" ? "#38BDF8" : "#F43F5E"}
                  strokeWidth="1.8"
                />
                <circle cx="335" cy="130" r="14" fill="#0B0D11" stroke="#FDE047" strokeWidth="1.2" />
                <circle cx="335" cy="130" r="3" fill="#38BDF8" />

                {/* --- 4. HIDDEN CONTOURS (Type 02.1 Trait interrompu fin) --- */}
                {/* Blind hole under bridge */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedLineId("02.1")}
                >
                  <line
                    x1="220"
                    y1="50"
                    x2="220"
                    y2="105"
                    stroke={selectedLineId === "02.1" ? "#F59E0B" : "#FBBF24"}
                    strokeWidth={selectedLineId === "02.1" ? "2.5" : "1.5"}
                    strokeDasharray="6 3"
                  />
                  <line
                    x1="250"
                    y1="50"
                    x2="250"
                    y2="105"
                    stroke={selectedLineId === "02.1" ? "#F59E0B" : "#FBBF24"}
                    strokeWidth={selectedLineId === "02.1" ? "2.5" : "1.5"}
                    strokeDasharray="6 3"
                  />
                  <line
                    x1="220"
                    y1="105"
                    x2="250"
                    y2="105"
                    stroke={selectedLineId === "02.1" ? "#F59E0B" : "#FBBF24"}
                    strokeWidth={selectedLineId === "02.1" ? "2.5" : "1.5"}
                    strokeDasharray="6 3"
                  />
                  <text x="180" y="85" fill="#FBBF24" fontSize="9" fontWeight="bold">
                    02.1 Caché
                  </text>
                </g>

                {/* --- 5. CUTTING PLANE TRACE (Type 04.2 Trait mixte bouts forts) --- */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedLineId("04.2")}
                >
                  {/* Left thick end */}
                  <line
                    x1="100"
                    y1="130"
                    x2="135"
                    y2="130"
                    stroke={selectedLineId === "04.2" ? "#38BDF8" : "#F43F5E"}
                    strokeWidth="4"
                  />
                  {/* Right thick end */}
                  <line
                    x1="645"
                    y1="130"
                    x2="680"
                    y2="130"
                    stroke={selectedLineId === "04.2" ? "#38BDF8" : "#F43F5E"}
                    strokeWidth="4"
                  />
                  {/* Arrow indicating view direction */}
                  <polygon points="115,120 115,108 111,114" fill="#F43F5E" />
                  <line x1="115" y1="120" x2="115" y2="105" stroke="#F43F5E" strokeWidth="1.5" />
                  <text x="110" y="98" fill="#F43F5E" fontSize="12" fontWeight="bold">
                    A
                  </text>

                  <polygon points="665,120 665,108 661,114" fill="#F43F5E" />
                  <line x1="665" y1="120" x2="665" y2="105" stroke="#F43F5E" strokeWidth="1.5" />
                  <text x="660" y="98" fill="#F43F5E" fontSize="12" fontWeight="bold">
                    A
                  </text>
                </g>

                {/* --- 6. DIMENSIONING LINES (Type 01.1 Trait continu fin) --- */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedLineId("01.1")}
                >
                  {/* Leader extension lines */}
                  <line x1="140" y1="45" x2="140" y2="20" stroke="#94A3B8" strokeWidth="0.8" />
                  <line x1="500" y1="45" x2="500" y2="20" stroke="#94A3B8" strokeWidth="0.8" />
                  {/* Dimension line with arrows */}
                  <line x1="145" y1="26" x2="495" y2="26" stroke="#94A3B8" strokeWidth="0.8" />
                  <polygon points="140,26 148,24 148,28" fill="#94A3B8" />
                  <polygon points="500,26 492,24 492,28" fill="#94A3B8" />
                  {/* Dimension label */}
                  <rect x="290" y="18" width="60" height="15" fill="#15171D" />
                  <text x="320" y="29" fill="#D4B483" fontSize="10" fontWeight="bold" textAnchor="middle">
                    14.50 ±0.01
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick selector buttons below the blueprint */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {LINE_DEFINITIONS.map((line) => {
                const isSelected = line.id === selectedLineId;
                return (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLineId(line.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#B08D57]/20 border-[#B08D57] text-white shadow-sm"
                        : "bg-[#181B22] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-[#D4B483]">{line.code}</div>
                    <div className="text-xs font-medium truncate mt-0.5">{line.name}</div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-1">{line.ratio}</div>
                  </button>
                );
              })}
            </div>

            {/* Focus Card of the Selected Line */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-[#1A1D24] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedLine.color }} />
                  <h3 className="font-serif font-bold text-base text-neutral-100">
                    {selectedLine.code} · {selectedLine.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-neutral-400">
                    Standard : <strong className="text-neutral-200">{selectedLine.widthStandard}</strong>
                  </span>
                  <span className="text-neutral-400">
                    Haute Précision : <strong className="text-[#D4B483]">{selectedLine.widthPrecision}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedLine.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#14161C] border border-neutral-800 space-y-1.5">
                  <span className="text-xs font-mono font-semibold text-[#D4B483] uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Applications en Atelier Horloger :
                  </span>
                  <ul className="text-xs text-neutral-400 space-y-1 list-disc pl-4">
                    {selectedLine.applications.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[#14161C] border border-neutral-800 space-y-1.5">
                  <span className="text-xs font-mono font-semibold text-rose-400 uppercase flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Règle d&apos;Exécution Critique :
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedLine.rules}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPLETE NORMATIVE TABLE (SWISS ISO 128-2) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4B483]" />
                Tableau Normalisé des Lignes Techniques (ISO 128-2)
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Synthèse officielle pour les examens théoriques de l&apos;apprentissage AFP / CFC horloger en Suisse.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-[#15171D] p-1 rounded-xl border border-neutral-800 text-xs">
              {(
                [
                  { id: "all", label: "Tous" },
                  { id: "continu", label: "Continus" },
                  { id: "interrompu", label: "Interrompus" },
                  { id: "mixte", label: "Mixtes" }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    filterCategory === tab.id
                      ? "bg-[#B08D57] text-neutral-950 font-bold"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#15171D] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-[#191C23] font-mono text-neutral-400">
                  <th className="p-3.5">Code ISO</th>
                  <th className="p-3.5">Type de Trait</th>
                  <th className="p-3.5">Rendu Graphique</th>
                  <th className="p-3.5 text-center">Épaisseur Standard</th>
                  <th className="p-3.5 text-center">Haute Précision</th>
                  <th className="p-3.5">Exemples d&apos;Application Horlogère</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredLines.map((line) => (
                  <tr
                    key={line.id}
                    className={`transition-colors hover:bg-neutral-800/40 cursor-pointer ${
                      selectedLineId === line.id ? "bg-[#B08D57]/10" : ""
                    }`}
                    onClick={() => setSelectedLineId(line.id)}
                  >
                    <td className="p-3.5 font-mono font-bold text-[#D4B483]">{line.code}</td>
                    <td className="p-3.5 font-medium text-neutral-200">
                      <div>{line.name}</div>
                      <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{line.ratio}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="w-32 py-1">
                        {line.id === "01.2" && <div className="w-full h-1 bg-neutral-200 rounded-sm" />}
                        {line.id === "01.1" && <div className="w-full h-0.5 bg-neutral-400" />}
                        {line.id === "02.1" && (
                          <div className="w-full border-b-2 border-dashed border-amber-400" />
                        )}
                        {line.id === "04.1" && (
                          <div className="w-full text-sky-400 font-mono text-[11px] tracking-tight">
                            ── · ── · ── · ──
                          </div>
                        )}
                        {line.id === "04.2" && (
                          <div className="w-full flex items-center">
                            <span className="w-4 h-1 bg-rose-500 rounded-xs" />
                            <span className="flex-1 text-center font-mono text-[11px] text-rose-400">· ── ·</span>
                            <span className="w-4 h-1 bg-rose-500 rounded-xs" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-mono font-semibold text-neutral-300">
                      {line.widthStandard}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-[#D4B483]">
                      {line.widthPrecision}
                    </td>
                    <td className="p-3.5 text-neutral-400 max-w-xs leading-relaxed">
                      {line.applications[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. WORKSHOP RULES DEEP DIVES */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4B483]" />
            Règles d&apos;Atelier &amp; Conventions Suisses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rule 1 */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-[#15171D] space-y-3">
              <div className="flex items-center gap-2 text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°1 : Priorité des Traits
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-100">
                Ordre de Superposition
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Lorsque deux lignes coïncident sur une même vue de dessin, l&apos;ordre de priorité impératif est le suivant :
              </p>
              <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal pl-4 font-mono">
                <li><strong className="text-neutral-100">Trait fort 01.2</strong> (contours vus)</li>
                <li><strong className="text-amber-400">Trait interrompu 02.1</strong> (contours cachés)</li>
                <li><strong className="text-rose-400">Trait mixte 04.2</strong> (plan de coupe)</li>
                <li><strong className="text-sky-400">Trait mixte fin 04.1</strong> (axe de symétrie)</li>
                <li><strong className="text-neutral-400">Trait continu fin 01.1</strong> (lignes de rappel)</li>
              </ol>
            </div>

            {/* Rule 2 */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-[#15171D] space-y-3">
              <div className="flex items-center gap-2 text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°2 : Angles Vifs Cachés
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-100">
                Intersections sans vide
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Les tirets d&apos;un trait interrompu (02.1) doivent obligatoirement <strong>se toucher aux angles</strong>.
                Un sommet d&apos;arête ne doit jamais tomber dans un intervalle blanc, ce qui créerait une confusion visuelle quant à la limite physique de la pièce.
              </p>
              <div className="p-2.5 rounded-lg bg-[#0E1015] border border-neutral-800 text-[11px] font-mono text-amber-300">
                ✓ Correct : L&apos;angle est formé par deux tirets continus.
                <br />
                ✗ Faux : L&apos;angle tombe dans un vide d&apos;espacement.
              </div>
            </div>

            {/* Rule 3 */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-[#15171D] space-y-3">
              <div className="flex items-center gap-2 text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°3 : Axes de Révolution
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-100">
                Dépassement Calibré
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Les axes de symétrie et de rotation (04.1) doivent dépasser de <strong>2 à 3 mm</strong> au-delà du contour de la pièce.
                L&apos;intersection de deux axes perpendiculaires (centre d&apos;un rubis ou d&apos;un perçage de pied) doit toujours être matérialisée par le croisement de deux éléments longs (tirets), jamais par un point ou un vide.
              </p>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE KNOWLEDGE CHECK / QUIZ */}
        <section className="space-y-4">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-[#15171D] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4B483]" />
                <h3 className="font-serif font-bold text-lg text-neutral-100">
                  Validation des Connaissances Horlogères
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-[#B08D57]/15 text-[#D4B483] border border-[#B08D57]/30">
                Question {activeQuizIndex + 1} / {quizQuestions.length}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm sm:text-base font-medium text-neutral-200">
                {quizQuestions[activeQuizIndex].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[activeQuizIndex].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === quizQuestions[activeQuizIndex].correctIndex;

                  let cardStyle = "border-neutral-800 bg-[#1A1D24] text-neutral-300 hover:border-neutral-700";
                  if (isSelected && !isAnswerSubmitted) {
                    cardStyle = "border-[#B08D57] bg-[#B08D57]/15 text-white";
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      cardStyle = "border-emerald-500 bg-emerald-950/30 text-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      cardStyle = "border-rose-500 bg-rose-950/30 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isAnswerSubmitted}
                      className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-start gap-2.5 ${cardStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-neutral-800 text-neutral-400 text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    selectedAnswer === quizQuestions[activeQuizIndex].correctIndex
                      ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
                      : "border-rose-500/50 bg-rose-950/20 text-rose-300"
                  }`}
                >
                  <div className="font-bold font-mono">
                    {selectedAnswer === quizQuestions[activeQuizIndex].correctIndex
                      ? "✓ Réponse Correcte !"
                      : "✗ Réponse Incorrecte"}
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {quizQuestions[activeQuizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleValidateQuiz}
                    disabled={selectedAnswer === null}
                    className="px-5 py-2 rounded-xl bg-[#B08D57] hover:bg-[#C29E68] disabled:opacity-40 text-neutral-950 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    Vérifier la Réponse
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-mono text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Question Suivante</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 7. NEXT / PREVIOUS MODULE NAVIGATION */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/theorie/lecture-de-plan"
            className="w-full sm:w-auto p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-[#15171D] hover:bg-[#181B22] text-left transition-all group flex items-center gap-3"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-[#D4B483] transition-colors" />
            <div>
              <div className="text-[11px] font-mono text-neutral-400">Précédent</div>
              <div className="text-xs font-semibold text-neutral-200 group-hover:text-[#D4B483] transition-colors">
                Index Lecture de Plan
              </div>
            </div>
          </Link>

          <Link
            href="/theorie/lecture-de-plan/elements-horlogerie"
            className="w-full sm:w-auto p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-[#15171D] hover:bg-[#181B22] text-right transition-all group flex items-center justify-end gap-3"
          >
            <div>
              <div className="text-[11px] font-mono text-neutral-400">Module Suivant (02)</div>
              <div className="text-xs font-semibold text-neutral-200 group-hover:text-[#D4B483] transition-colors">
                Éléments d&apos;Horlogerie (NIHS)
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#D4B483] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </div>
  );
}
