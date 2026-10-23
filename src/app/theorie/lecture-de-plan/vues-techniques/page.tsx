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
  Info,
  Maximize2,
  RotateCcw,
  Scissors,
  SplitSquareVertical,
  Box
} from "lucide-react";

// --- DONNÉES DISPOSITION DES 6 VUES (MÉTHODE EUROPÉENNE E / 1er DIÈDRE) ---
interface ProjectionView {
  id: string;
  name: string;
  positionOnPlan: string;
  observerPosition: string;
  mnemonicRule: string;
  watchExample: string;
}

const PROJECTION_VIEWS: ProjectionView[] = [
  {
    id: "face",
    name: "Vue de Face (Vue Principale)",
    positionOnPlan: "Au centre de la feuille de dessin",
    observerPosition: "Observateur face à la pièce",
    mnemonicRule: "Vue de référence absolue : toutes les autres vues se déduisent à partir d'elle par projection orthogonale.",
    watchExample: "Platine principale vue côté mouvement (montrant l'agencement des ponts et l'échappement)."
  },
  {
    id: "dessus",
    name: "Vue de Dessus",
    positionOnPlan: "Placée EN DESSOUS de la vue de face",
    observerPosition: "L'observateur regarde le haut de la pièce",
    mnemonicRule: "L'observateur regarde par le HAUT, son regard traverse la pièce et projette le dessin en BAS.",
    watchExample: "Profil supérieur d'un pont de rouage, révélant la tête des vis de fixation et le coq."
  },
  {
    id: "dessous",
    name: "Vue de Dessous",
    positionOnPlan: "Placée AU-DESSUS de la vue de face",
    observerPosition: "L'observateur regarde le bas de la pièce",
    mnemonicRule: "L'observateur regarde par le BAS, son regard traverse la pièce et projette le dessin en HAUT.",
    watchExample: "Platine côté cadran, révélant le perlage, la minuterie et le mécanisme de mise à l'heure."
  },
  {
    id: "gauche",
    name: "Vue de Gauche",
    positionOnPlan: "Placée À DROITE de la vue de face",
    observerPosition: "L'observateur regarde le côté gauche de la pièce",
    mnemonicRule: "L'observateur regarde par la GAUCHE, son regard traverse la pièce et projette le dessin à DROITE.",
    watchExample: "Profil latéral d'un pont d'ancre montrant l'assiette du rubis et l'épaisseur du biseau."
  },
  {
    id: "droite",
    name: "Vue de Droite",
    positionOnPlan: "Placée À GAUCHE de la vue de face",
    observerPosition: "L'observateur regarde le côté droit de la pièce",
    mnemonicRule: "L'observateur regarde par la DROITE, son regard traverse la pièce et projette le dessin à GAUCHE.",
    watchExample: "Côté tige de remontoir, montrant le perçage du tube de carrure et le passage de tige."
  },
  {
    id: "arriere",
    name: "Vue Arrière",
    positionOnPlan: "Placée à l'extrême droite (ou extrême gauche)",
    observerPosition: "L'observateur regarde le dos de la pièce",
    mnemonicRule: "Représente la face dorsale complète, utile pour les carrures et fonds de boîtier.",
    watchExample: "Fond de boîte gravé ou découpe de la glace saphir pour fond transparent."
  }
];

// --- DONNÉES TECHNIQUES DE COUPE HORLOGÈRE ---
interface CutMethod {
  id: string;
  title: string;
  normeIso: string;
  definition: string;
  watchmakerWhy: string;
  drawingRules: string[];
}

const CUT_METHODS: CutMethod[] = [
  {
    id: "coupe-brisee",
    title: "Coupe Brisée à Plans Parallèles (La Coupe Reine)",
    normeIso: "ISO 128-40 / ISO 128-3",
    definition: "Le plan de coupe n'est pas rectiligne : il effectue des décrochements successifs à angle droit (90°) pour traverser plusieurs axes internes non alignés.",
    watchmakerWhy: "Dans un calibre mécanique, le rouage serpente (Barillet → Roue de centre → Roue moyenne → Roue des secondes → Échappement). Aucun plan droit ne peut tous les couper. La coupe brisée permet de visualiser toute la chaîne cinématique d'un seul coup d'œil !",
    drawingRules: [
      "Tracé du plan : Trait mixte fin (04.1) le long du parcours.",
      "Renforts indispensables : Traits forts épais (01.2) aux extrémités et à chaque angle de changement de direction.",
      "Flèches de sens : Deux flèches en trait fort aux extrémités indiquant la direction du regard de l'observateur, surmontées des lettres A-A.",
      "Règles des plans rabattus : On rabat tous les plans parallèles dans un plan unique sans tracer les arêtes fictives de séparation."
    ]
  },
  {
    id: "demi-coupe",
    title: "Demi-Coupe (Vue combinée Extérieur / Intérieur)",
    normeIso: "ISO 128-44",
    definition: "Pour une pièce symétrique de révolution, une moitié est représentée en vue extérieure et l'autre moitié en coupe hachurée.",
    watchmakerWhy: "Idéal pour les pièces rondes creuses comme le tambour de barillet, la virole, le balancier ou la boîte de montre : on voit simultanément la forme extérieure et les creusements intérieurs sans alourdir le plan.",
    drawingRules: [
      "Frontière stricte : L'axe de symétrie en trait mixte fin (04.1) sépare exactement la demi-vue de la demi-coupe.",
      "Pas de traits cachés : On ne dessine JAMAIS de traits interrompus (lignes cachées) sur la moitié non coupée.",
      "Arêtes communes : Si une arête coïncide avec l'axe de symétrie, la coupe prévaut sur la vue extérieure.",
      "Gain de temps : Évite d'avoir deux vues séparées sur la feuille de plan."
    ]
  },
  {
    id: "sections",
    title: "Sections Sorties & Sections Rabattues",
    normeIso: "ISO 128-40",
    definition: "Une section ne montre QUE la surface située exactement dans le plan sécant, sans dessiner les contours visibles situés en arrière-plan.",
    watchmakerWhy: "Permet de vérifier le profil transversal d'un bras de roue, d'un levier de sonnerie ou d'un ressort de cliquet sans encombrer la vue d'ensemble.",
    drawingRules: [
      "Section sortie : Dessinée en dehors de la vue principale en trait fort (01.2) avec hachures complètes.",
      "Section rabattue : Dessinée directement SUR la vue principale, délimitée par un trait continu fin (01.1).",
      "Orientation : La section rabattue pivote de 90° directement sur l'axe de la pièce.",
      "Clarté d'atelier : Donne instantanément l'épaisseur et la forme d'un profil sans cote superflue."
    ]
  }
];

// --- RÈGLES DES PIÈCES NON COUPÉES LONGITUDINALEMENT ---
interface UncutPart {
  name: string;
  reason: string;
  watchExample: string;
}

const UNCUT_PARTS: UncutPart[] = [
  {
    name: "Vis horlogères & Piliers",
    reason: "Pièce pleine de révolution. La couper longitudinalement n'apporterait aucune information sur sa forme intérieure et masquerait le fond du taraudage.",
    watchExample: "Vis de ponts, vis de coq, vis de fixation de cadran, piliers de platines."
  },
  {
    name: "Axes, Tigerons & Tiges de remontoir",
    reason: "Éléments massifs pleins. Hachurer un axe alourdirait le dessin et ferait confondre le mobile avec un tube creux.",
    watchExample: "Axe de balancier, tigeron de roue des secondes, tige de remontoir."
  },
  {
    name: "Dents d'engrenage & Ailes de pignon",
    reason: "Règle absolue : on coupe le corps de la roue, mais la dent traversée par le plan reste intacte, sans aucune hachure.",
    watchExample: "Denture cycloïdale de la roue de moyenne, ailes du pignon d'échappement."
  },
  {
    name: "Billes, Goupilles & Plots de centrage",
    reason: "Pièces standardisées pleines servant au positionnement géométrique précis des ponts.",
    watchExample: "Pieds de ponts (goupilles de centrage en acier trempé), billes de roulement de masse oscillante."
  },
  {
    name: "Bras de roues & Bras de balancier",
    reason: "Structures minces reliant la serge au moyeu. Les hachurer donnerait l'impression fausse que la roue est un disque plein lourd.",
    watchExample: "Bras découpés de la roue des minutes, bras de balancier annulaire."
  }
];

export default function VuesTechniquesPage() {
  const [activeTab, setActiveTab] = useState("methode-e");
  const [selectedViewId, setSelectedViewId] = useState("face");
  const [selectedCutId, setSelectedCutId] = useState("coupe-brisee");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({
    1: null as number | null,
    2: null as number | null,
    3: null as number | null
  });

  const selectedView = PROJECTION_VIEWS.find((v) => v.id === selectedViewId) || PROJECTION_VIEWS[0];
  const selectedCut = CUT_METHODS.find((c) => c.id === selectedCutId) || CUT_METHODS[0];

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
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Vues Techniques</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              ISO 128-3:2020 · Méthode E
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
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              3. Symboles Normalisés
            </Link>
            <Link
              href="/theorie/lecture-de-plan/vues-techniques"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
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
            <span>Normes Internationales ISO 128-3 &amp; Standards Horlogers Suisses NIHS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
            Vues Techniques, Méthode E &amp; Coupes Horlogères
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Pour fabriquer un mouvement miniature sans équivoque, les manufactures suisses appliquent rigoureusement la <strong>Méthode de projection du premier dièdre (Méthode E)</strong> et les techniques de <strong>coupes brisées</strong> capables de dévoiler la trajectoire sinueuse du rouage d&apos;un seul coup d&apos;œil.
          </p>

          {/* 3 Main Categories Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <button
              onClick={() => setActiveTab("methode-e")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "methode-e"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <Box className="w-6 h-6 text-[#8A6A3B] dark:text-[#D4B483]" />
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  ISO 128-3
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">1. Méthode Européenne (E)</div>
              <div className="text-xs text-neutral-500 mt-1">Disposition des 6 vues et règle du regard traversant.</div>
            </button>

            <button
              onClick={() => setActiveTab("coupes")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "coupes"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <Scissors className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  Plans Parallèles
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">2. Coupes Brisées &amp; Demi-Coupes</div>
              <div className="text-xs text-neutral-500 mt-1">Traverser le barillet et le rouage sinueux.</div>
            </button>

            <button
              onClick={() => setActiveTab("regles-hachures")}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === "regles-hachures"
                  ? "border-[#B08D57] bg-[#B08D57]/5 ring-1 ring-[#B08D57]/30 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <Layers className="w-6 h-6 text-rose-500" />
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  Règles d&apos;Atelier
                </span>
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-2">3. Éléments Jamais Coupés</div>
              <div className="text-xs text-neutral-500 mt-1">Vis, tigerons, billes et dents d&apos;engrenage.</div>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ONGLET 1 : LA MÉTHODE EUROPÉENNE E (1er DIÈDRE / ISO 128-3)              */}
        {/* ========================================================================= */}
        {activeTab === "methode-e" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <HelpCircle className="w-4 h-4" />
                <span>La règle d&apos;or de la méthode suisse &amp; européenne</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                L&apos;Objet se Trouve entre l&apos;Œil et le Plan de Projection
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Contrairement à la méthode américaine (3ᵉ dièdre), en Suisse et en Europe, quand vous regardez une pièce par la <strong>GAUCHE</strong>, votre regard traverse la matière et projette le dessin à <strong>DROITE</strong> ! C&apos;est pourquoi :
                <br />
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  • La vue de dessus se dessine EN DESSOUS de la vue de face.
                  <br />
                  • La vue de dessous se dessine AU-DESSUS de la vue de face.
                </span>
              </p>
            </div>

            {/* SYMBOLE OFFICIEL DU CÔNE TRONQUÉ */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#B08D57]/30 bg-white dark:bg-neutral-900/60 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483]">
                    Symbole Normalisé Cartouche (ISO 128-3)
                  </span>
                  <h3 className="text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                    Comment identifier immédiatement un plan suisse/européen ?
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#D4B483]">
                  <span>SYMBOLE MÉTHODE E :</span>
                  <svg width="60" height="24" viewBox="0 0 65 24" className="inline bg-neutral-950 p-1 rounded border border-neutral-800">
                    <polygon points="5,6 25,2 25,22 5,18" fill="none" stroke="#D4B483" strokeWidth="1.5" />
                    <circle cx="45" cy="12" r="9" fill="none" stroke="#D4B483" strokeWidth="1.5" />
                    <circle cx="45" cy="12" r="4" fill="none" stroke="#D4B483" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Comparatif E vs A */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">Méthode E (Europe / Suisse - 1er Dièdre)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">HORLOGERIE</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Les deux cercles concentriques sont placés <strong>À DROITE</strong> du trapèze. Le regard passe par la gauche du cône tronqué et projette les cercles à droite.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-neutral-500 text-sm">Méthode A (USA / Japon - 3ᵉ Dièdre)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-bold">NON UTILISÉ</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Les deux cercles concentriques sont placés <strong>À GAUCHE</strong> du trapèze. L&apos;observateur dessine la vue directement sur le plan placé devant l&apos;objet.
                  </p>
                </div>
              </div>
            </div>

            {/* LE CUBE DÉPLIÉ DES 6 VUES (SCHÉMA CAD SVG INTERACTIF) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                    Le Cube Déplié Normalisé (Disposition des 6 Vues)
                  </h3>
                  <p className="text-xs text-neutral-500">Cliquez sur une vue pour comprendre son rôle à l&apos;établi</p>
                </div>
                <span className="text-xs font-mono text-neutral-500">Correspondance 45°</span>
              </div>

              {/* Schéma vectoriel des 6 vues */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white shadow-sm flex flex-col items-center justify-center font-mono">
                <svg viewBox="0 0 720 380" className="w-full max-w-[680px] h-auto select-none">
                  {/* Projection alignment lines */}
                  <line x1="260" y1="20" x2="260" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="460" y1="20" x2="460" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="130" x2="680" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="250" x2="680" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 1. VUE DE DESSOUS (En haut) */}
                  <g
                    onClick={() => setSelectedViewId("dessous")}
                    className="cursor-pointer group"
                    transform="translate(270, 25)"
                  >
                    <rect width="180" height="90" fill={selectedViewId === "dessous" ? "#2B3240" : "#1A1D24"} stroke={selectedViewId === "dessous" ? "#D4B483" : "#475569"} strokeWidth="1.5" rx="6" />
                    <text x="90" y="35" fill="#F1F5F9" fontSize="11" fontWeight="bold" textAnchor="middle">VUE DE DESSOUS</text>
                    <text x="90" y="55" fill="#94A3B8" fontSize="9" textAnchor="middle">Placée AU-DESSUS</text>
                    <circle cx="90" cy="72" r="8" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
                  </g>

                  {/* 2. VUE DE DROITE (À gauche) */}
                  <g
                    onClick={() => setSelectedViewId("droite")}
                    className="cursor-pointer group"
                    transform="translate(60, 140)"
                  >
                    <rect width="180" height="95" fill={selectedViewId === "droite" ? "#2B3240" : "#1A1D24"} stroke={selectedViewId === "droite" ? "#D4B483" : "#475569"} strokeWidth="1.5" rx="6" />
                    <text x="90" y="40" fill="#F1F5F9" fontSize="11" fontWeight="bold" textAnchor="middle">VUE DE DROITE</text>
                    <text x="90" y="60" fill="#94A3B8" fontSize="9" textAnchor="middle">Placée À GAUCHE</text>
                    <line x1="40" y1="75" x2="140" y2="75" stroke="#F59E0B" strokeWidth="1.5" />
                  </g>

                  {/* 3. VUE DE FACE (Au centre) */}
                  <g
                    onClick={() => setSelectedViewId("face")}
                    className="cursor-pointer group"
                    transform="translate(270, 140)"
                  >
                    <rect width="180" height="95" fill={selectedViewId === "face" ? "#2B3240" : "#222733"} stroke={selectedViewId === "face" ? "#B08D57" : "#64748B"} strokeWidth="2" rx="6" />
                    <text x="90" y="40" fill="#D4B483" fontSize="12" fontWeight="bold" textAnchor="middle">VUE DE FACE</text>
                    <text x="90" y="60" fill="#E2E8F0" fontSize="10" textAnchor="middle">Vue Principale Centrée</text>
                    <circle cx="90" cy="78" r="10" fill="#B08D57" opacity="0.3" stroke="#B08D57" strokeWidth="1.5" />
                  </g>

                  {/* 4. VUE DE GAUCHE (À droite) */}
                  <g
                    onClick={() => setSelectedViewId("gauche")}
                    className="cursor-pointer group"
                    transform="translate(480, 140)"
                  >
                    <rect width="180" height="95" fill={selectedViewId === "gauche" ? "#2B3240" : "#1A1D24"} stroke={selectedViewId === "gauche" ? "#D4B483" : "#475569"} strokeWidth="1.5" rx="6" />
                    <text x="90" y="40" fill="#F1F5F9" fontSize="11" fontWeight="bold" textAnchor="middle">VUE DE GAUCHE</text>
                    <text x="90" y="60" fill="#94A3B8" fontSize="9" textAnchor="middle">Placée À DROITE</text>
                    <line x1="40" y1="75" x2="140" y2="75" stroke="#F59E0B" strokeWidth="1.5" />
                  </g>

                  {/* 5. VUE DE DESSUS (En bas) */}
                  <g
                    onClick={() => setSelectedViewId("dessus")}
                    className="cursor-pointer group"
                    transform="translate(270, 260)"
                  >
                    <rect width="180" height="90" fill={selectedViewId === "dessus" ? "#2B3240" : "#1A1D24"} stroke={selectedViewId === "dessus" ? "#D4B483" : "#475569"} strokeWidth="1.5" rx="6" />
                    <text x="90" y="35" fill="#F1F5F9" fontSize="11" fontWeight="bold" textAnchor="middle">VUE DE DESSUS</text>
                    <text x="90" y="55" fill="#94A3B8" fontSize="9" textAnchor="middle">Placée EN DESSOUS</text>
                    <rect x="75" y="65" width="30" height="15" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              {/* Fiche détaillée de la vue sélectionnée */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 shadow-sm space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      Position Normalisée sur le Plan
                    </span>
                    <h4 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100 mt-0.5">
                      {selectedView.name}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {selectedView.positionOnPlan}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Position de l&apos;Observateur
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {selectedView.observerPosition}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono uppercase text-neutral-400 font-bold text-[10px]">
                      Règle Mnémotechnique d&apos;Atelier
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      « {selectedView.mnemonicRule} »
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-[#B08D57]/5 border border-[#B08D57]/20">
                    <span className="font-mono uppercase text-[#8A6A3B] dark:text-[#D4B483] font-bold text-[10px]">
                      Exemple d&apos;Élément Horloger
                    </span>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                      {selectedView.watchExample}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : COUPES BRISÉES & DEMI-COUPES (ISO 128-40)                     */}
        {/* ========================================================================= */}
        {activeTab === "coupes" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <span>Pourquoi les coupes sont indispensables en horlogerie ?</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Voir à Travers la Matière sans Surcharger le Dessin
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Dans une montre, des dizaines de pignons, rubis et axes microscopiques sont enfermés entre la platine et les ponts. Si on devait tout dessiner en traits interrompus (lignes cachées), le plan deviendrait une toile d&apos;araignée illisible ! La <strong>coupe</strong> permet de trancher virtuellement la pièce pour révéler les formes intérieures en traits continus forts.
              </p>
            </div>

            {/* SÉLECTEUR DE MÉTHODE DE COUPE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CUT_METHODS.map((cut) => (
                <button
                  key={cut.id}
                  onClick={() => setSelectedCutId(cut.id)}
                  className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                    selectedCutId === cut.id
                      ? "border-[#B08D57] bg-white dark:bg-neutral-900 shadow-md ring-1 ring-[#B08D57]/30"
                      : "border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 hover:border-neutral-300"
                  }`}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
                    {cut.normeIso}
                  </span>
                  <div className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {cut.title.split("(")[0]}
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                    {cut.definition}
                  </p>
                </button>
              ))}
            </div>

            {/* CAD SVG : COUPE BRISÉE DU ROUAGE HORLOGER */}
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white shadow-sm space-y-6 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-[#D4B483] font-bold">SCHÉMA VECTORIEL CAD ATELIER</span>
                  <h4 className="text-sm font-bold text-neutral-100 mt-0.5">
                    Coupe Brisée à Plans Parallèles (A-A) traversant le Rouage
                  </h4>
                </div>
                <span className="text-xs text-emerald-400 font-bold">Décrochements à 90° aux axes</span>
              </div>

              {/* Vector diagram of rouage cut */}
              <div className="w-full flex justify-center py-2">
                <svg viewBox="0 0 700 280" className="w-full h-auto select-none">
                  {/* Background grid */}
                  <rect width="700" height="280" fill="#14171C" rx="8" />

                  {/* Top: Plan view with zig-zag cut line */}
                  <text x="30" y="30" fill="#94A3B8" fontSize="11" fontWeight="bold">1. VUE DE DESSUS : TRACÉ DU PLAN DE COUPE BRISÉ (A-A)</text>
                  
                  {/* Mobile 1: Barillet */}
                  <circle cx="120" cy="80" r="35" fill="#1E232D" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="120" cy="80" r="4" fill="#E2E8F0" />
                  <text x="120" y="84" fill="#CBD5E1" fontSize="9" textAnchor="middle">Barillet</text>

                  {/* Mobile 2: Roue de centre */}
                  <circle cx="280" cy="65" r="28" fill="#1E232D" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="280" cy="65" r="3" fill="#E2E8F0" />
                  <text x="280" y="69" fill="#CBD5E1" fontSize="9" textAnchor="middle">Centre</text>

                  {/* Mobile 3: Roue moyenne */}
                  <circle cx="430" cy="95" r="22" fill="#1E232D" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="430" cy="95" r="3" fill="#E2E8F0" />
                  <text x="430" y="99" fill="#CBD5E1" fontSize="9" textAnchor="middle">Moyenne</text>

                  {/* Mobile 4: Roue d'échappement */}
                  <circle cx="580" cy="70" r="18" fill="#1E232D" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="580" cy="70" r="3" fill="#E2E8F0" />
                  <text x="580" y="74" fill="#CBD5E1" fontSize="9" textAnchor="middle">Échapp.</text>

                  {/* Zig-Zag Cut line with reinforced ends */}
                  {/* Start A arrow */}
                  <line x1="50" y1="80" x2="120" y2="80" stroke="#B08D57" strokeWidth="2.5" />
                  <line x1="50" y1="80" x2="50" y2="95" stroke="#B08D57" strokeWidth="3" />
                  <polygon points="50,98 46,90 54,90" fill="#B08D57" />
                  <text x="42" y="105" fill="#B08D57" fontSize="12" fontWeight="bold">A</text>

                  {/* Segment 1 to 2 */}
                  <line x1="120" y1="80" x2="200" y2="80" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
                  {/* 90 deg corner reinforced */}
                  <line x1="200" y1="80" x2="200" y2="65" stroke="#B08D57" strokeWidth="3" />
                  <line x1="200" y1="65" x2="280" y2="65" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="6 3 2 3" />

                  {/* Segment 2 to 3 */}
                  <line x1="280" y1="65" x2="355" y2="65" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
                  {/* 90 deg corner reinforced */}
                  <line x1="355" y1="65" x2="355" y2="95" stroke="#B08D57" strokeWidth="3" />
                  <line x1="355" y1="95" x2="430" y2="95" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="6 3 2 3" />

                  {/* Segment 3 to 4 */}
                  <line x1="430" y1="95" x2="505" y2="95" stroke="#B08D57" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
                  {/* 90 deg corner reinforced */}
                  <line x1="505" y1="95" x2="505" y2="70" stroke="#B08D57" strokeWidth="3" />
                  <line x1="505" y1="70" x2="650" y2="70" stroke="#B08D57" strokeWidth="2.5" />
                  {/* End A arrow */}
                  <line x1="650" y1="70" x2="650" y2="85" stroke="#B08D57" strokeWidth="3" />
                  <polygon points="650,88 646,80 654,80" fill="#B08D57" />
                  <text x="658" y="95" fill="#B08D57" fontSize="12" fontWeight="bold">A</text>

                  {/* Bottom: Resulting Section A-A */}
                  <line x1="30" y1="140" x2="670" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="30" y="165" fill="#38BDF8" fontSize="11" fontWeight="bold">2. COUPE A-A RABATTUE EN PLAN UNIQUE (ALIGNE TOUS LES AXES)</text>

                  {/* Top bridge (Pont de rouage) with hatch */}
                  <rect x="70" y="180" width="560" height="16" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <text x="350" y="192" fill="#94A3B8" fontSize="9" textAnchor="middle">Pont de rouage (Hachures obliques 45°)</text>

                  {/* Bottom plate (Platine) with hatch */}
                  <rect x="50" y="235" width="600" height="20" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <text x="350" y="248" fill="#94A3B8" fontSize="9" textAnchor="middle">Platine principale (Hachures de sens opposé -45°)</text>

                  {/* Mobile 1 cut shaft */}
                  <rect x="117" y="196" width="6" height="39" fill="#E2E8F0" />
                  <rect x="100" y="205" width="40" height="20" fill="#B08D57" stroke="#D4B483" strokeWidth="1" />

                  {/* Mobile 2 cut shaft */}
                  <rect x="277" y="196" width="6" height="39" fill="#E2E8F0" />
                  <circle cx="280" cy="215" r="14" fill="#64748B" />

                  {/* Mobile 3 cut shaft */}
                  <rect x="427" y="196" width="6" height="39" fill="#E2E8F0" />
                  <circle cx="430" cy="220" r="10" fill="#64748B" />

                  {/* Mobile 4 cut shaft */}
                  <rect x="577" y="196" width="6" height="39" fill="#E2E8F0" />
                  <circle cx="580" cy="218" r="8" fill="#64748B" />

                  {/* Pivots in jewels callout */}
                  <rect x="114" y="177" width="12" height="6" fill="#F43F5E" />
                  <rect x="114" y="232" width="12" height="6" fill="#F43F5E" />
                  <text x="120" y="172" fill="#F43F5E" fontSize="8" textAnchor="middle">Rubis H6</text>
                </svg>
              </div>

              {/* Details of selected cut */}
              <div className="space-y-3 pt-2 text-xs font-sans text-neutral-300">
                <div className="font-bold font-serif text-sm text-[#D4B483]">
                  {selectedCut.title}
                </div>
                <p className="leading-relaxed">
                  {selectedCut.watchmakerWhy}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {selectedCut.drawingRules.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mt-1.5 flex-shrink-0"></span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : RÈGLES DES HACHURES & PIÈCES NON COUPÉES                       */}
        {/* ========================================================================= */}
        {activeTab === "regles-hachures" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header intro */}
            <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500">
                <HelpCircle className="w-4 h-4" />
                <span>Règle absolue des horlogers et dessinateurs</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Ce qu&apos;on ne Coupe JAMAIS dans le Sens Longitudinal
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Même si le plan de coupe traverse de part en part un mouvement, certaines pièces pleines ne doivent <strong>jamais être coupées ni hachurées</strong> dans leur longueur. Les couper n&apos;apporterait aucun détail intérieur et détruirait la lisibilité du plan !
              </p>
            </div>

            {/* LISTE DES 5 PIÈCES JAMAIS COUPÉES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {UNCUT_PARTS.map((part, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
                    <span className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {part.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">
                      JAMAIS COUPÉ
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {part.reason}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                    Ex : {part.watchExample}
                  </div>
                </div>
              ))}
            </div>

            {/* LES RÈGLES DE HACHURAGE D'ASSEMBLAGE */}
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Les 3 Règles d&apos;Or du Hachurage Horloger
                </h3>
                <span className="text-xs font-mono text-neutral-500">Norme ISO 128-50</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="space-y-1.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] text-sm">
                    1. Orientation à 45°
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Les hachures sont toujours tracées en <strong>trait continu fin (01.1)</strong>, inclinées à 45° par rapport aux lignes principales du contour.
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    2. Pièces en Contact : Sens Opposé
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Deux pièces assemblées (ex: un pont en laiton posé sur la platine) doivent avoir des hachures de <strong>sens opposé (+45° et -45°)</strong> ou d&apos;espacement différent pour être immédiatement distinguées.
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">
                    3. Pièces Ultraminces Noircies
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Les composants très fins comme les ressorts-lames, rondelles ou clinquants peuvent être <strong>entièrement noircis</strong> au lieu d&apos;être hachurés, en laissant un filet blanc de séparation de 0.1 mm entre pièces voisines.
                  </p>
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
                Testez vos Connaissances (Vues Techniques &amp; Coupes)
              </h3>
              <p className="text-xs text-neutral-500">3 questions pratiques pour valider votre maîtrise de la lecture de plan</p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            {/* Question 1 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                1. Selon la méthode de projection européenne (Méthode E / 1er dièdre), où est placée la <strong>Vue de Dessus</strong> ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Au-dessus de la vue de face",
                  "En dessous de la vue de face",
                  "À droite de la vue de face",
                  "Directement sur le cartouche"
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
                  {quizAnswers[1] === 1 ? "✓ Exact ! L'observateur regarde par le haut et projette le dessin en bas (en dessous de la vue de face)." : "✗ Non. En méthode européenne E, la vue de dessus est projetée EN DESSOUS de la vue de face."}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                2. Pourquoi utilise-t-on impérativement une <strong>Coupe Brisée à Plans Parallèles</strong> pour un mouvement horloger ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Parce que les axes des mobiles (barillet, centre, seconde, échappement) ne sont jamais alignés en ligne droite",
                  "Pour économiser de l'encre sur le papier calque",
                  "Parce que le mouvement est carré",
                  "Pour cacher les rubis synthétiques"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuiz(2, idx)}
                    className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                      quizAnswers[2] === idx
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
              {quizAnswers[2] !== null && (
                <div className={`p-2.5 rounded-lg text-xs ${quizAnswers[2] === 0 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
                  {quizAnswers[2] === 0 ? "✓ Bravo ! Le train d'engrenage serpente dans le calibre : le plan de coupe fait des décrochements à 90° pour passer par chaque axe." : "✗ Non. La coupe brisée permet de traverser successivement les axes décalés du rouage."}
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">
                3. Parmi ces éléments, lequel ne doit <strong>JAMAIS être coupé longitudinalement</strong> sur une vue en coupe ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Une vis de fixation ou un axe de pivotement",
                  "La platine principale",
                  "Le pont de barillet",
                  "Le corps de la boîte de montre"
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
                  {quizAnswers[3] === 0 ? "✓ Exact ! Les vis, axes, tigerons, billes et goupilles pleines ne sont JAMAIS coupés dans leur longueur." : "✗ Non. Les platines et ponts sont coupés et hachurés. En revanche, les vis et axes pleins restent intacts sans hachures."}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/theorie/lecture-de-plan/symboles-normalises"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Module 3 : Symboles Normalisés</span>
          </Link>

          <Link
            href="/theorie/lecture-de-plan"
            className="text-xs font-mono text-neutral-400 hover:text-[#B08D57] transition-colors"
          >
            Vue d&apos;ensemble du Hub Lecture de Plan
          </Link>

          <Link
            href="/theorie/lecture-de-plan/types-lignes"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#8A6A3B] dark:text-[#D4B483] hover:underline transition-all"
          >
            <span>Retour au Module 1 : Types de Lignes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
