"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Ruler,
  Compass,
  BookOpen,
  Award,
  Eye,
  Sliders,
  ShieldCheck,
  Info
} from "lucide-react";

// --- DONNÉES GÉOMÉTRIE (TOLÉRANCES GÉOMÉTRIQUES GPS / ISO 1101) ---
interface GeometricTolerance {
  id: string;
  symbol: string;
  name: string;
  category: "forme" | "orientation" | "battement" | "position";
  cadreExample: string;
  simpleExplanation: string;
  watchExample: string;
  defectConsequence: string;
  toleratedValue: string;
}

const GEOMETRIC_TOLERANCES: GeometricTolerance[] = [
  {
    id: "battement",
    symbol: "↗",
    name: "Battement Circulaire (Faux-Rond / Voile)",
    category: "battement",
    cadreExample: "[ ↗ | 0.005 | A ]",
    simpleExplanation: "Indique l'écart maximal toléré lorsque la pièce effectue une rotation complète autour de son axe de référence. Cela combine les défauts de circularité et de centrage.",
    watchExample: "Serge du balancier, roue d'échappement, tigeron de roue des secondes.",
    defectConsequence: "Si le battement est trop grand, la roue ondule ou tourne ovale : elle frotte contre les ponts voisins ou désaxe l'engrenage, provoquant l'arrêt du mouvement.",
    toleratedValue: "≤ 0.003 mm à 0.005 mm (3 à 5 microns)"
  },
  {
    id: "perpendicularite",
    symbol: "⟂",
    name: "Perpendicularité",
    category: "orientation",
    cadreExample: "[ ⟂ | 0.002 | A ]",
    simpleExplanation: "Garantit qu'une face plane ou un épaulement fait un angle rigoureusement droit (90°) par rapport à un axe ou une surface de référence.",
    watchExample: "Assiette de portée d'un pivot de balancier par rapport à son tigeron vertical.",
    defectConsequence: "Si l'assiette penche, le mobile ne repose pas à plat sur le rubis. Il frotte sur une seule arête, use le coussinet de manière asymétrique et perd toute précision.",
    toleratedValue: "≤ 0.002 mm (2 microns)"
  },
  {
    id: "parallelisme",
    symbol: "∥",
    name: "Parallélisme",
    category: "orientation",
    cadreExample: "[ ∥ | 0.004 | B ]",
    simpleExplanation: "Exige que deux surfaces ou deux axes restent à égale distance en tout point, sans jamais converger.",
    watchExample: "Face d'appui d'un pont de rouage par rapport à la platine de base.",
    defectConsequence: "Un défaut de parallélisme incline les axes des mobiles : les roues engrènent de travers, ce qui engendre des frottements critiques et un blocage d'engrenage.",
    toleratedValue: "≤ 0.004 mm (4 microns)"
  },
  {
    id: "planeite",
    symbol: "⏢",
    name: "Planéité",
    category: "forme",
    cadreExample: "[ ⏢ | 0.005 ]",
    simpleExplanation: "Vérifie que tous les points d'une surface se situent entre deux plans géométriques parallèles distants de la tolérance indiquée. Ne nécessite aucune référence.",
    watchExample: "Platine principale, pont de barillet, disque indicateur de date.",
    defectConsequence: "Une platine gauchie déforme tous les entraxes du rouage. Le disque de date frotterait contre le cadran ou le mécanisme de bascule.",
    toleratedValue: "≤ 0.005 mm sur toute la surface"
  },
  {
    id: "circularite",
    symbol: "○",
    name: "Circularité (Rondeur)",
    category: "forme",
    cadreExample: "[ ○ | 0.001 ]",
    simpleExplanation: "Assure que le contour d'une section circulaire ne présente pas d'ovalisation ou de lobes, sans considérer sa position dans l'espace.",
    watchExample: "Diamètre extérieur du pivot de balancier (ex: Ø 0.10 mm).",
    defectConsequence: "Un pivot ovalisé coince dans le trou du rubis à certains angles de rotation et crée des variations d'amplitude catastrophiques pour le réglage chronométrique.",
    toleratedValue: "≤ 0.001 mm (1 micron) pour un pivot réglant"
  },
  {
    id: "concentricite",
    symbol: "◎",
    name: "Concentricité & Coaxialité",
    category: "position",
    cadreExample: "[ ◎ | 0.003 | A ]",
    simpleExplanation: "Garantit que deux cylindres partagent exactement le même axe central de rotation.",
    watchExample: "Corps de tige de remontoir par rapport à son carré et à son pivot de bout.",
    defectConsequence: "Un faux-rond entre le corps et le pivot provoque un durcissement du remontage manuel ou un vrillage de la couronne dans le tube de boîte.",
    toleratedValue: "≤ 0.003 mm"
  }
];

// --- DONNÉES RUGOSITÉ & FINITIONS HORLOGÈRES ---
interface SurfaceFinish {
  id: string;
  name: string;
  raMicrons: string;
  symbolCad: string;
  legacyIsoClass: string;
  craftTool: string;
  visualMetaphor: string;
  simpleExplanation: string;
  watchExample: string;
}

const SURFACE_FINISHES: SurfaceFinish[] = [
  {
    id: "poli-noir",
    name: "Poli Bloqué (Poli Noir)",
    raMicrons: "Ra ≤ 0.02 µm",
    symbolCad: "Triangle fermé + barre",
    legacyIsoClass: "Classe N1 (▽▽▽▽)",
    craftTool: "Plaque de zinc parfaitement dressée + pâte diamantée 0.25 µm",
    visualMetaphor: "Un miroir optique parfait sans la moindre ride.",
    simpleExplanation: "La lumière n'est pas dispersée du tout. Vue sous un angle, la pièce apparaît entièrement noire ; sous la source lumineuse, elle brille d'un éclat blanc étincelant.",
    watchExample: "Têtes de vis décorées haut de gamme, marteaux de répétition minutes, cœurs de chronographe."
  },
  {
    id: "roulage",
    name: "Roulage de Pivots (Brunissage)",
    raMicrons: "Ra ≤ 0.05 µm",
    symbolCad: "Triangle fermé + barre",
    legacyIsoClass: "Classe N2 (▽▽▽▽)",
    craftTool: "Disque de métal dur (Widia) tournant contre le pivot lubrifié",
    visualMetaphor: "Surface ultra-glacée et durcie en surface.",
    simpleExplanation: "Le roulage ne coupe pas de métal : il écrase les micro-aspérités par pression. Le métal devient plus dur et lisse comme de la glace pour glisser dans le rubis avec un rendement supérieur à 98%.",
    watchExample: "Pivots des mobiles de rouage, axes de balancier et tigerons d'échappement."
  },
  {
    id: "anglage",
    name: "Anglage Main au Berceau (45°)",
    raMicrons: "Ra ≤ 0.05 µm",
    symbolCad: "Triangle fermé + biseau",
    legacyIsoClass: "Classe N2 (▽▽▽▽)",
    craftTool: "Lime berceau puis cheville en bois de gentiane chargée de diamant",
    visualMetaphor: "Un éclat de diamant sur chaque arête de pont.",
    simpleExplanation: "L'artisan abat l'arête tranchante du pont à 45° régulier, puis la polit jusqu'à obtenir une brillance éclatante sans arrondir les angles rentrants.",
    watchExample: "Tous les ponts, coqs de balancier et leviers d'un mouvement Poinçon de Genève."
  },
  {
    id: "cotes-geneve",
    name: "Côtes de Genève",
    raMicrons: "Ra 0.1 à 0.2 µm",
    symbolCad: "Triangle fermé + stries ∥",
    legacyIsoClass: "Classes N3-N4 (▽▽▽)",
    craftTool: "Meule circulaire en bois de buis garnie d'émeri sur tournette",
    visualMetaphor: "Des vagues régulières créant un moirage argenté.",
    simpleExplanation: "Décoration reine de l'horlogerie suisse. Des passes rectilignes parallèles créent un reflet changeant selon l'orientation de la montre.",
    watchExample: "Face supérieure des ponts de rouage et masses oscillantes automatiques."
  },
  {
    id: "perlage",
    name: "Perlage (Bouchonnage)",
    raMicrons: "Ra 0.2 à 0.4 µm",
    symbolCad: "Triangle fermé + cercles",
    legacyIsoClass: "Classe N5 (▽▽)",
    craftTool: "Bâtonnet abrasif rotatif appliqué manuellement pas à pas",
    visualMetaphor: "Une superposition d'écailles ou de perles scintillantes.",
    simpleExplanation: "Des cercles concentriques qui se chevauchent à 50%. En plus de son esthétique raffinée, cette texture retient les micro-poussières résiduelles pour protéger le mouvement.",
    watchExample: "Platine principale (côté cadran et sous-faces des ponts)."
  }
];

export default function SymbolesNormalisesPage() {
  const [activeTab, setActiveTab] = useState("geometrie");
  const [selectedGeoId, setSelectedGeoId] = useState("battement");
  const [selectedFinishId, setSelectedFinishId] = useState("poli-noir");

  // Quiz State (sans generic TSX pour SWC)
  const [quizAnswers, setQuizAnswers] = useState({
    1: null as number | null,
    2: null as number | null,
    3: null as number | null
  });

  const selectedGeo = GEOMETRIC_TOLERANCES.find((g) => g.id === selectedGeoId) || GEOMETRIC_TOLERANCES[0];
  const selectedFinish = SURFACE_FINISHES.find((f) => f.id === selectedFinishId) || SURFACE_FINISHES[0];

  const handleSelectQuiz = (qNum: number, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qNum]: optionIdx }));
  };

  return (
    <div className="bg-[#FDFCFB] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100 antialiased selection:bg-[#B08D57]/20 selection:text-[#8A6A3B] dark:selection:text-[#D4B483] min-h-screen pb-24 transition-colors duration-200">
      
      {/* TOP APP BAR */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#15161A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100 tracking-wider hover:opacity-80 transition-opacity">
              HORLOLEARN
            </Link>
            <span>/</span>
            <Link href="/theorie" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Théorie
            </Link>
            <span>/</span>
            <Link href="/theorie/lecture-de-plan" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Lecture de Plan
            </Link>
            <span>/</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Symboles Normalisés</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              Guide Pédagogique Suisse
            </span>
          </div>
        </div>

        {/* Sub-Nav Modules Selector */}
        <div className="border-t border-neutral-100 dark:border-neutral-800/60 overflow-x-auto no-scrollbar">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-2 py-2">
            <Link
              href="/theorie/lecture-de-plan/types-lignes"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              1. Types de Lignes
            </Link>
            <Link
              href="/theorie/lecture-de-plan/elements-horlogerie"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              2. Éléments d&apos;Horlogerie
            </Link>
            <Link
              href="/theorie/lecture-de-plan/symboles-normalises"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
            >
              3. Symboles Normalisés
            </Link>
            <Link
              href="/theorie/lecture-de-plan/vues-techniques"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              4. Vues Techniques
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprendre les Plans comme un Horloger à l&apos;Établi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
            Les Symboles Normalisés d&apos;un Plan Horloger
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Sur un plan technique horloger, une dimension en millimètres ne suffit jamais. Les symboles normalisés servent de <strong>langage universel</strong> pour préciser la perfection géométrique, la douceur des surfaces et le traitement des arêtes.
          </p>

          {/* 3 Main Categories Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <button
              onClick={() => setActiveTab("geometrie")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "geometrie"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono text-[#8A6A3B] dark:text-[#D4B483]">↗ ⟂ ∥</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  ISO 1101
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">1. Tolérances Géométriques</div>
              <div className="text-xs text-neutral-500 mt-1">Faux-rond, perpendicularité, parallélisme, planéité.</div>
            </button>

            <button
              onClick={() => setActiveTab("rugosite")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "rugosite"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono text-emerald-600 dark:text-emerald-400">Ra 0.02</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  ISO 21920
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">2. États de Surface &amp; Ra</div>
              <div className="text-xs text-neutral-500 mt-1">La rugosité au microscope et les finitions suisses.</div>
            </button>

            <button
              onClick={() => setActiveTab("aretes")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "aretes"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono text-rose-500">-0.05</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  ISO 13715
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">3. Arêtes &amp; Bavures</div>
              <div className="text-xs text-neutral-500 mt-1">Pourquoi et comment on casse les bords d&apos;une pièce.</div>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ONGLET 1 : TOLÉRANCES GÉOMÉTRIQUES GPS (ISO 1101)                         */}
        {/* ========================================================================= */}
        {activeTab === "geometrie" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <HelpCircle className="w-4 h-4" />
                <span>Pourquoi la dimension seule ne suffit pas ?</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                La Différence entre une Cote et une Forme Géométrique
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Imaginez un pivot d&apos;axe de balancier coté à <strong>Ø 0.10 mm</strong>. Si ce pivot est usiné avec un diamètre parfait mais qu&apos;il est <em>tordu</em>, <em>ovalisé</em> ou que sa portée d&apos;appui <em>penche à 88° au lieu de 90°</em>, il coincera dans le rubis et la montre s&apos;arrêtera net ! C&apos;est exactement le rôle des <strong>tolérances géométriques</strong>.
              </p>
            </div>

            {/* DÉCODEUR DE CADRE DE TOLÉRANCE */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#B08D57]/30 bg-white dark:bg-neutral-900/60 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483]">
                    Règle de Lecture Universelle
                  </span>
                  <h3 className="text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                    Comment se lit un rectangle de tolérance sur un plan ?
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">Norme ISO 1101</span>
              </div>

              {/* Cadre interactif stylisé */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-6 rounded-xl bg-neutral-950 text-white font-mono select-none">
                <div className="flex items-center border-2 border-[#B08D57] rounded-lg overflow-hidden bg-neutral-900 text-center text-sm sm:text-base">
                  <div className="px-4 py-3 border-r border-[#B08D57] bg-neutral-800 text-[#D4B483] font-bold">
                    {selectedGeo.symbol}
                  </div>
                  <div className="px-5 py-3 border-r border-[#B08D57] text-emerald-400 font-bold">
                    {selectedGeo.cadreExample.split("|")[1].trim()}
                  </div>
                  {selectedGeo.cadreExample.split("|")[2] && (
                    <div className="px-4 py-3 bg-neutral-800 text-sky-400 font-bold">
                      {selectedGeo.cadreExample.split("|")[2].replace("]", "").trim()}
                    </div>
                  )}
                </div>
              </div>

              {/* Légende du cadre */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">Case 1 : Le Symbole</span>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-1">Définit la nature du contrôle (battement, perpendicularité, etc.).</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Case 2 : La Valeur en mm</span>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-1">L&apos;écart maximal toléré (ex: 0.002 mm = 2 microns d&apos;erreur permise).</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">Case 3 : La Référence (A, B)</span>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-1">L&apos;axe ou la surface de base par rapport à laquelle on mesure.</p>
                </div>
              </div>
            </div>

            {/* SÉLECTEUR INTERACTIF DES 6 SYMBOLES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Cliquez sur un symbole pour voir son explication à l&apos;établi :
                </h3>
                <span className="text-xs font-mono text-neutral-500">6 Symboles Essentiels</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {GEOMETRIC_TOLERANCES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGeoId(item.id)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      selectedGeoId === item.id
                        ? "border-[#B08D57] bg-white dark:bg-neutral-900 shadow-md ring-2 ring-[#B08D57]/30"
                        : "border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 hover:border-neutral-300"
                    }`}
                  >
                    <span className="text-2xl font-mono text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                      {item.symbol}
                    </span>
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                      {item.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Fiche détaillée du symbole sélectionné */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 shadow-sm space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#B08D57]/10 flex items-center justify-center text-2xl font-mono text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                      {selectedGeo.symbol}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                        {selectedGeo.name}
                      </h4>
                      <span className="text-xs font-mono text-neutral-500">
                        Exemple au plan : <strong>{selectedGeo.cadreExample}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Tolérance : {selectedGeo.toleratedValue}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Explication en Français Clair
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {selectedGeo.simpleExplanation}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Composant Horloger Type
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {selectedGeo.watchExample}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30">
                    <span className="font-mono uppercase text-rose-600 dark:text-rose-400 font-bold text-[10px] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Conséquence si Défectueux
                    </span>
                    <p className="text-rose-700 dark:text-rose-300">
                      {selectedGeo.defectConsequence}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : ÉTATS DE SURFACE, RA & FINITIONS HORLOGÈRES                    */}
        {/* ========================================================================= */}
        {activeTab === "rugosite" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <span>Comprendre la Rugosité Ra en 1 minute</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                C&apos;est quoi le &quot;Ra&quot; ?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Si vous observez une pièce métallique au microscope, sa surface ressemble à un paysage avec des collines (crêtes) et des vallées (creux). Le <strong>Ra (Écart moyen arithmétique)</strong> mesure en micromètres (µm) la hauteur moyenne de ces vagues.
                <br />
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  Plus le chiffre Ra est petit, plus la surface est parfaitement lisse comme un miroir !
                </span>
              </p>
            </div>

            {/* SCHÉMA DU SYMBOLE DE RUGOSITÉ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Les 3 Symboles Fondamentaux (ISO 21920)
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-1">
                    <div className="font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] flex items-center gap-2">
                      <span className="text-base font-bold">▽ avec barre fermée</span>
                      <span>(Le plus fréquent en horlogerie)</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      <strong>Usinage obligatoire :</strong> On doit impérativement passer un outil (tour, fraise, disque de roulage) pour enlever de la matière et atteindre la rugosité demandée.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-1">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <span className="text-base font-bold">▽ avec cercle inscrit</span>
                      <span>(Surface brute interdite d&apos;usinage)</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      <strong>Enlèvement de matière interdit :</strong> La surface doit rester brute de fonderie, étirée ou estampée.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-1">
                    <div className="font-mono font-bold text-neutral-500 flex items-center gap-2">
                      <span className="text-base font-bold">▽ ouvert simple</span>
                      <span>(Surface libre)</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      <strong>Procédé au choix :</strong> L&apos;usinage n&apos;est ni imposé ni interdit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Anatomie de l'annotation */}
              <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white shadow-sm space-y-4 font-mono">
                <span className="text-xs text-[#D4B483] font-bold">DÉCODAGE DU SYMBOLE COTÉ AU PLAN</span>
                <svg viewBox="0 0 340 160" className="w-full h-auto select-none">
                  {/* Ground reference */}
                  <line x1="20" y1="130" x2="140" y2="130" stroke="#475569" strokeWidth="2" />
                  
                  {/* Roughness triangle */}
                  <polyline points="70,130 110,50 180,50" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                  <polyline points="70,130 90,90" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                  <line x1="70" y1="90" x2="110" y2="90" stroke="#B08D57" strokeWidth="2.5" />

                  {/* Annotations */}
                  <text x="190" y="48" fill="#38BDF8" fontSize="13" fontWeight="bold">Ra 0.05</text>
                  <text x="190" y="68" fill="#94A3B8" fontSize="10">Procédé : Roulage</text>
                  <text x="190" y="86" fill="#A7F3D0" fontSize="10">Stries : ⊥ (Perpendiculaires)</text>

                  {/* Explanatory arrows */}
                  <circle cx="90" cy="90" r="3" fill="#F59E0B" />
                  <text x="25" y="40" fill="#FCD34D" fontSize="9">Barre = Usinage obligatoire</text>
                  <line x1="90" y1="90" x2="50" y2="45" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
                </svg>

                <div className="text-xs text-neutral-400 space-y-1 font-sans">
                  <p>• <strong>Ra 0.05</strong> : Rugosité moyenne maximale de 0.05 micron.</p>
                  <p>• <strong>Procédé</strong> : Spécifie la technique d&apos;atelier (ex: roulage, lapidage).</p>
                  <p>• <strong>Symbole ⊥</strong> : Les micro-stries doivent être perpendiculaires à l&apos;axe pour ne pas user le rubis.</p>
                </div>
              </div>
            </div>

            {/* LE NUANCIER DES FINITIONS HORLOGÈRES SUISSES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Les Grandes Finitions d&apos;Atelier et leurs Valeurs Ra
                  </h3>
                  <p className="text-xs text-neutral-500">Du poli noir miroir aux Côtes de Genève</p>
                </div>
                <span className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483] font-bold">Poinçon de Genève</span>
              </div>

              {/* Finishes cards selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {SURFACE_FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinishId(finish.id)}
                    className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                      selectedFinishId === finish.id
                        ? "border-[#B08D57] bg-white dark:bg-neutral-900 shadow-md ring-1 ring-[#B08D57]/30"
                        : "border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {finish.raMicrons}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">{finish.legacyIsoClass.split(" ")[0]}</span>
                    </div>
                    <div className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100 line-clamp-1">
                      {finish.name}
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                      {finish.craftTool}
                    </p>
                  </button>
                ))}
              </div>

              {/* Detailed view of selected finish */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 shadow-sm space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      Fiche Technique d&apos;Atelier
                    </span>
                    <h4 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                      {selectedFinish.name} ({selectedFinish.raMicrons})
                    </h4>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs text-neutral-500">
                    <div>Ancienne norme : <strong className="text-neutral-900 dark:text-neutral-100">{selectedFinish.legacyIsoClass}</strong></div>
                    <div>Symbole de plan : <span className="text-[#8A6A3B] dark:text-[#D4B483] font-bold">{selectedFinish.symbolCad}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Ce que l&apos;œil voit (Effet Visuel)
                    </span>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                      « {selectedFinish.visualMetaphor} »
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                      {selectedFinish.simpleExplanation}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Outil &amp; Matière de l&apos;Artisan
                    </span>
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {selectedFinish.craftTool}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Exemple d&apos;Application Horlogère
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {selectedFinish.watchExample}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : ÉTAT DES ARÊTES & BAVURES (ISO 13715)                          */}
        {/* ========================================================================= */}
        {activeTab === "aretes" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500">
                <HelpCircle className="w-4 h-4" />
                <span>Pourquoi les arêtes sont cruciales ?</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Le Danger Mortel des Micro-Bavures en Horlogerie
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Lorsqu&apos;un pont ou une platine est fraisé, les bords de coupe laissent des micro-fils de métal tranchants appelés <strong>bavures</strong>. Si une seule de ces bavures microscopiques se détache et tombe dans le barillet ou entre les dents du pignon d&apos;échappement, la montre s&apos;arrête net. C&apos;est pourquoi les horlogers exigent de <strong>casser les arêtes</strong>.
              </p>
            </div>

            {/* DÉCRYPTAGE DU SYMBOLE ISO 13715 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Les 3 Signes à Connaître Absolument
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">Norme ISO 13715</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">Signe - (Moins : ex. -0.05)</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">OBLIGATOIRE</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      <strong>Arête abattue ou biseautée :</strong> La matière DOIT être enlevée. L&apos;horloger doit réaliser un biseau ou adoucir l&apos;angle de 0.02 à 0.05 mm. Aucune bavure n&apos;est tolérée.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">Signe + (Plus : ex. +0.05)</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">INTERDIT EN HORLOGERIE</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      <strong>Bavure tolérée :</strong> Indique qu&apos;une bavure résiduelle est autorisée. Toléré uniquement sur de la grosse tôle industrielle, mais proscrit sur un mouvement de montre.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">Signe ± 0 (Zéro parfait)</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600">PIÈCES FONCTIONNELLES</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      <strong>Arête vive nette sans bavure :</strong> L&apos;arête doit couper net sans aucun chanfrein, mais sans aucune bavure qui dépasse (ex: becs d&apos;ancres, couteaux de chronographe).
                    </p>
                  </div>
                </div>
              </div>

              {/* Schéma CAD interactif du coin de pièce */}
              <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white shadow-sm space-y-4 font-mono">
                <span className="text-xs text-[#D4B483] font-bold">REPRÉSENTATION DU SYMBOLE EN FOURCHE</span>
                <svg viewBox="0 0 340 180" className="w-full h-auto select-none">
                  {/* Part edge */}
                  <polyline points="90,140 90,65 180,65" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <text x="135" y="110" fill="#475569" fontSize="11" textAnchor="middle">Matière du pont</text>

                  {/* ISO 13715 fork */}
                  <line x1="90" y1="65" x2="45" y2="25" stroke="#B08D57" strokeWidth="2" />
                  <polyline points="45,25 25,45" fill="none" stroke="#B08D57" strokeWidth="2" />
                  <polyline points="45,25 85,25" fill="none" stroke="#B08D57" strokeWidth="2" />
                  
                  {/* Dimension text */}
                  <text x="95" y="29" fill="#F43F5E" fontSize="13" fontWeight="bold">- 0.05</text>
                  <text x="165" y="29" fill="#94A3B8" fontSize="10">Arête cassée</text>

                  {/* Callout box */}
                  <rect x="20" y="125" width="300" height="45" fill="#1C1E24" rx="6" />
                  <text x="35" y="143" fill="#10B981" fontSize="10">Le signe moins (-) impose d&apos;abattre l&apos;angle</text>
                  <text x="35" y="158" fill="#94A3B8" fontSize="10">de 0.02 à 0.05 mm (aucun fil tranchant).</text>
                </svg>

                <div className="text-xs text-neutral-400 space-y-1 font-sans">
                  <p>• Contrôle d&apos;atelier : systématiquement vérifié sous <strong>binoculaire x40</strong> en lumière rasante.</p>
                  <p>• Les biseaux de finition d&apos;anglage horloger viennent sublimer cette opération fonctionnelle.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MINI-QUIZ D'ENTRAÎNEMENT INTERACTIF                                       */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B08D57]/10 flex items-center justify-center text-[#8A6A3B] dark:text-[#D4B483]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Testez vos Connaissances (Cas Pratiques d&apos;Atelier)
              </h3>
              <p className="text-xs text-neutral-500">3 questions simples pour vérifier que vous avez tout compris</p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            {/* Question 1 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                1. Sur le plan d&apos;un pivot de balancier, que signifie le symbole : <code className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">[ ↗ | 0.003 | A ]</code> ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "La pièce doit être inclinée à 30° par rapport à l'axe A",
                  "Le battement (faux-rond) ne doit pas dépasser 0.003 mm lors de la rotation autour de l'axe A",
                  "Le pivot doit être poli miroir avec une force de 3 grammes",
                  "L'arête du pivot doit être chanfreinée de 0.003 mm"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuiz(1, idx)}
                    className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                      quizAnswers[1] === idx
                        ? idx === 1
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[1] !== null && (
                <div className={`p-2.5 rounded-lg text-xs ${quizAnswers[1] === 1 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
                  {quizAnswers[1] === 1 ? "✓ Exact ! Le symbole ↗ est le battement circulaire : le pivot ne doit pas osciller de plus de 3 microns." : "✗ Non. Le symbole ↗ représente le battement circulaire (faux-rond)."}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                2. Si vous lisez <code className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">-0.05</code> sur une arête de pont, que devez-vous faire ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Laisser la bavure métallique en place pour combler le vide",
                  "Abattre l'arête (adoucir / chanfreiner) de 0.05 mm pour supprimer toute bavure",
                  "Réduire le diamètre du pont de 5 millimètres",
                  "Mesurer la profondeur de filetage"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuiz(2, idx)}
                    className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                      quizAnswers[2] === idx
                        ? idx === 1
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[2] !== null && (
                <div className={`p-2.5 rounded-lg text-xs ${quizAnswers[2] === 1 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
                  {quizAnswers[2] === 1 ? "✓ Bravo ! Le signe moins (-) indique qu'il faut enlever la matière pour casser l'arête vive." : "✗ Non. Le signe moins (-) impose d'abattre l'arête vive de 0.05 mm."}
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                3. Quelle est la particularité d&apos;une surface polie bloquée (Poli Noir) avec <code className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">Ra ≤ 0.02 µm</code> ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Elle réfléchit la lumière comme un miroir absolu : soit noir profond, soit éclat blanc pur",
                  "Elle est peinte avec une laque noire mate",
                  "Elle présente des cercles imbriqués comme le perlage",
                  "Elle est réservée uniquement au boîtier extérieur"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuiz(3, idx)}
                    className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                      quizAnswers[3] === idx
                        ? idx === 0
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[3] !== null && (
                <div className={`p-2.5 rounded-lg text-xs ${quizAnswers[3] === 0 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
                  {quizAnswers[3] === 0 ? "✓ Excellent ! Le poli bloqué noir ne disperse aucune lumière : il agit comme un miroir spéculaire sans défaut." : "✗ Non. Le poli noir est un polissage mécanique spéculaire parfait sur plaque de zinc, pas de la peinture !"}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/theorie/lecture-de-plan/elements-horlogerie"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Module 2 : Éléments d&apos;Horlogerie</span>
          </Link>

          <Link
            href="/theorie/lecture-de-plan"
            className="text-xs font-mono text-neutral-400 hover:text-[#B08D57] transition-colors"
          >
            Vue d&apos;ensemble du Hub
          </Link>

          <Link
            href="/theorie/lecture-de-plan/vues-techniques"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#8A6A3B] dark:text-[#D4B483] hover:underline transition-all"
          >
            <span>Module 4 : Vues Techniques &amp; Coupes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
