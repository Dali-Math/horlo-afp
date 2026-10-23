"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
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

interface RugosityScale {
  isoClass: string;
  isoSymbol: string;
  raMicrons: string;
  category: "speculaire" | "decoration" | "usinage";
  process: string;
  tool: string;
  application: string;
  visualCharacteristic: string;
}

const RUGOSITY_DATA: RugosityScale[] = [
  {
    isoClass: "N1",
    isoSymbol: "▽▽▽▽ (Grade 1)",
    raMicrons: "Ra ≤ 0.025 µm",
    category: "speculaire",
    process: "Poli bloqué (Poli noir horloger)",
    tool: "Plaque de zinc plane + pâte diamantée 0.25 µm",
    application: "Têtes de vis haut de gamme, cœurs de chronographe, marteaux de répétition",
    visualCharacteristic: "Réflexion optique spéculaire totale : la pièce apparaît d'un noir d'encre sous un angle ou d'un blanc pur immaculé face à la source."
  },
  {
    isoClass: "N2",
    isoSymbol: "▽▽▽▽ (Grade 2)",
    raMicrons: "Ra ≤ 0.05 µm",
    category: "speculaire",
    process: "Roulage au carbure & Anglage main au bois",
    tool: "Disque carbure Widia / Cheville en bois de gentiane + diamant",
    application: "Pivots de balancier et mobiles, biseaux d'anglage des ponts à 45°",
    visualCharacteristic: "Portée cylindrique ultra-lisse assurant un rendement > 98% sans frottement et capture nette de la lumière sur l'angle berceau."
  },
  {
    isoClass: "N3",
    isoSymbol: "▽▽▽ (Grade 3)",
    raMicrons: "Ra 0.1 µm",
    category: "decoration",
    process: "Côtes de Genève fines & Lapidage miroir",
    tool: "Meule de buis imprégnée d'émeri sur tournette micrométrique",
    application: "Face supérieure des ponts de rouage, coqs et masses oscillantes",
    visualCharacteristic: "Vagues parallèles régulières aux reflets moirés changeants selon l'orientation de la lumière."
  },
  {
    isoClass: "N4",
    isoSymbol: "▽▽▽ (Grade 4)",
    raMicrons: "Ra 0.2 µm",
    category: "decoration",
    process: "Côtes de Genève standard & Traits tirés",
    tool: "Cabron d'émeri fin / Pierre d'Arkansas rectifiée",
    application: "Flancs des ponts, leviers de bascule et ressorts de cliquet",
    visualCharacteristic: "Micro-stries directionnelles parfaitement rectilignes éliminant toute trace d'usinage mécanique antérieur."
  },
  {
    isoClass: "N5",
    isoSymbol: "▽▽ (Grade 5)",
    raMicrons: "Ra 0.4 µm",
    category: "decoration",
    process: "Perlage circulaire (Bouchonnage horloger)",
    tool: "Tampon chargé ou cheville de buis tournante à l'huile",
    application: "Platine côté cadran, évidements de barillet, dessous des ponts",
    visualCharacteristic: "Rosaces concentriques superposées à 50% créant une texture opalescente piégeant les micro-poussières résiduelles."
  },
  {
    isoClass: "N6",
    isoSymbol: "▽▽ (Grade 6)",
    raMicrons: "Ra 0.8 µm",
    category: "usinage",
    process: "Fraisage fin CNC & Tournage de précision",
    tool: "Outil diamant polycristallin (PCD) ou fraise carbure revêtue",
    application: "Noyures de platines, logements de rubis, dégagements fonctionnels",
    visualCharacteristic: "Surface usinée satinée sans bavure, tolérance géométrique de positionnement respectée au micron."
  },
  {
    isoClass: "N7",
    isoSymbol: "▽ (Grade 7)",
    raMicrons: "Ra 1.6 µm",
    category: "usinage",
    process: "Ébauche par décolletage ou étincelage (EDM)",
    tool: "Burin de tour automatique / Fil électro-érosion",
    application: "Surfaces internes brutes de fonderie ou avant opérations de terminaison",
    visualCharacteristic: "Stries visibles à la loupe x10, rugosité nécessitant obligatoirement une reprise de terminaison selon le cahier des charges."
  }
];

interface FinishDetail {
  id: string;
  name: string;
  raTarget: string;
  craftTool: string;
  purpose: string;
  poinconGeneve: string;
}

const FINISHES_DATA: FinishDetail[] = [
  {
    id: "poli-bloque",
    name: "Poli Bloqué (Poli Noir)",
    raTarget: "Ra < 0.02 µm (Spéculaire absolu)",
    craftTool: "Plaque de zinc dressée + poudre de diamant 0.25 µm + potence à polir",
    purpose: "Suppression totale de toute dispersion lumineuse : la surface agit comme un miroir parfait plan sans aucun arrondi d'arête.",
    poinconGeneve: "Exigé sur toutes les têtes de vis de calibres d'exception et marteaux de sonnerie."
  },
  {
    id: "anglage",
    name: "Anglage au Berceau (45°)",
    raTarget: "Ra < 0.05 µm (Poli glace)",
    craftTool: "Limes aiguilles berceau puis cheville en bois de gentiane ou sureau chargée de diamant",
    purpose: "Abattement des arêtes vives à 45° régulier avec polissage miroir continu même dans les rentrants intérieurs aigus.",
    poinconGeneve: "Arêtes polies obligatoires sur tous les ponts, coqs et platines (Art. 64 du règlement)."
  },
  {
    id: "cotes-geneve",
    name: "Côtes de Genève",
    raTarget: "Ra 0.1 à 0.2 µm",
    craftTool: "Disque rotatif en bois de buis garni d'émeri fin monté sur chariot micrométrique",
    purpose: "Décoration emblématique de la haute horlogerie suisse créant des bandes parallèles qui captent la lumière.",
    poinconGeneve: "Motif classique pour les ponts supérieurs et les masses oscillantes automatiques."
  },
  {
    id: "perlage",
    name: "Perlage (Bouchonnage)",
    raTarget: "Ra 0.2 à 0.4 µm",
    craftTool: "Bâton de buis rotatif ou tampon abrasif semi-dur enduit d'huile fine",
    purpose: "Cercles imbriqués réguliers décalés d'un demi-diamètre protégeant la platine de l'oxydation et des poussières.",
    poinconGeneve: "Décoration standard des platines côté cadran et sous-faces des ponts d'échappement."
  }
];

export default function SymbolesNormalisesPage() {
  const [filterCategory, setFilterCategory] = useState("tous");
  const [selectedFinishId, setSelectedFinishId] = useState("poli-bloque");

  const filteredRugosities = RUGOSITY_DATA.filter((r) => {
    if (filterCategory === "tous") return true;
    return r.category === filterCategory;
  });

  const selectedFinish = FINISHES_DATA.find((f) => f.id === selectedFinishId) || FINISHES_DATA[0];

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
              ISO 21920 · ISO 13715
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Normes Internationales ISO 21920:2021 &amp; ISO 13715:2019</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
            États de Surface, Rugosité Ra &amp; Cotation des Arêtes
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            En haute horlogerie suisse, la rugosité microgéométrique (Ra) et l&apos;état rigoureux des arêtes (chanfreins, biseaux d&apos;anglage, absence de bavures) conditionnent à la fois le rendement cinématique, la rétention des lubrifiants et les critères d&apos;attribution des labels d&apos;excellence comme le <strong>Poinçon de Genève</strong> ou le <strong>COSC</strong>.
          </p>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm">
              <div className="text-xs font-mono uppercase text-neutral-500">Finition Miroir Absolu</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">Ra &lt; 0.02 µm</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Poli bloqué noir sur zinc</div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm">
              <div className="text-xs font-mono uppercase text-neutral-500">Tolérance d&apos;Arête Suisse</div>
              <div className="text-xl font-bold font-mono text-rose-500 mt-1">-0.02 à -0.05 mm</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Arête abattue sans bavure (ISO 13715)</div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm">
              <div className="text-xs font-mono uppercase text-neutral-500">Norme Actuelle</div>
              <div className="text-xl font-bold font-mono text-[#8A6A3B] dark:text-[#D4B483] mt-1">ISO 21920:2021</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Remplace l&apos;ancienne norme ISO 1302</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: SCHEMAS CAD DE L'ANATOMIE DU SYMBOLE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" />
              <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100">
                Anatomie des Symboles Normalisés Horlogers
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">Schémas Vectoriels CAD</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Box 1: Symbole de Rugosité ISO 21920 */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Symbole de Rugosité &amp; État de Surface (ISO 21920)
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                  ISO 1302 / 21920
                </span>
              </div>

              {/* CAD SVG */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                <svg viewBox="0 0 380 180" className="w-full h-auto select-none font-mono">
                  <rect width="380" height="180" fill="#181A1E" rx="8" />
                  
                  {/* Ground reference line */}
                  <line x1="20" y1="145" x2="150" y2="145" stroke="#475569" strokeWidth="2" />
                  <line x1="20" y1="145" x2="10" y2="155" stroke="#334155" strokeWidth="1" />
                  <line x1="40" y1="145" x2="30" y2="155" stroke="#334155" strokeWidth="1" />
                  <line x1="60" y1="145" x2="50" y2="155" stroke="#334155" strokeWidth="1" />
                  
                  {/* Base triangle of roughness */}
                  <polyline points="80,145 130,55 220,55" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                  <polyline points="80,145 105,100" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                  
                  {/* Top bar = Material removal mandatory */}
                  <line x1="80" y1="100" x2="130" y2="100" stroke="#B08D57" strokeWidth="2.5" />

                  {/* Labels on CAD */}
                  <text x="230" y="52" fill="#38BDF8" fontSize="13" fontWeight="bold">Ra 0.4 µm</text>
                  <text x="230" y="72" fill="#94A3B8" fontSize="10">Procédé : Rectification / Roulage</text>
                  <text x="230" y="90" fill="#CBD5E1" fontSize="10">Longueur de coupure λc = 0.8 mm</text>
                  <text x="230" y="108" fill="#A7F3D0" fontSize="10">Stries : ⊥ (Perpendiculaire à l&apos;axe)</text>
                  
                  {/* Pointer arrow to bar */}
                  <circle cx="105" cy="100" r="3" fill="#F59E0B" />
                  <line x1="105" y1="100" x2="45" y2="55" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="40" y="45" fill="#FCD34D" fontSize="10" textAnchor="middle">Usinage obligatoire</text>

                  {/* Caption banner */}
                  <rect x="25" y="148" width="330" height="22" fill="#22252B" rx="4" />
                  <text x="190" y="163" fill="#D4B483" fontSize="10" textAnchor="middle">Surface usinée obligatoire avec paramètre de rugosité Ra</text>
                </svg>
              </div>

              {/* Explanatory bullet points */}
              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 leading-relaxed pt-1">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-100">Triangle fermé par une barre :</strong> Enlèvement de matière obligatoire par usinage (fraisage, tournage, roulage de pivot).
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-100">Triangle avec cercle inscrit :</strong> Enlèvement de matière strictement interdit (tôle brute, surface étirée ou décolletée définitive).
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-100">Triangle de base ouvert :</strong> Surface quelconque dont le procédé d&apos;obtention est laissé libre.
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Cotation des Arêtes ISO 13715 */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  Cotation des Arêtes &amp; Bavures (ISO 13715)
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20">
                  ISO 13715:2019
                </span>
              </div>

              {/* CAD SVG */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                <svg viewBox="0 0 380 180" className="w-full h-auto select-none font-mono">
                  <rect width="380" height="180" fill="#181A1E" rx="8" />
                  
                  {/* Part edge profile */}
                  <polyline points="90,140 90,65 180,65" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <text x="135" y="110" fill="#475569" fontSize="11" textAnchor="middle">Corps de pont / platine</text>

                  {/* ISO 13715 edge symbol (angle fork) */}
                  <line x1="90" y1="65" x2="45" y2="25" stroke="#B08D57" strokeWidth="1.5" />
                  <polyline points="45,25 25,45" fill="none" stroke="#B08D57" strokeWidth="1.5" />
                  <polyline points="45,25 85,25" fill="none" stroke="#B08D57" strokeWidth="1.5" />
                  
                  {/* Value */}
                  <text x="95" y="29" fill="#F43F5E" fontSize="13" fontWeight="bold">- 0.05</text>
                  <text x="165" y="29" fill="#94A3B8" fontSize="10">Arête abattue / chanfreinée</text>

                  {/* Mini-table of signs */}
                  <rect x="25" y="95" width="330" height="70" fill="#22252B" rx="4" />
                  <text x="38" y="114" fill="#10B981" fontSize="10" fontWeight="bold">Signe - (moins) :</text>
                  <text x="145" y="114" fill="#E2E8F0" fontSize="10">Arête abattue, chanfreinée ou arrondie (bavure proscrite)</text>

                  <text x="38" y="133" fill="#F43F5E" fontSize="10" fontWeight="bold">Signe + (plus) :</text>
                  <text x="145" y="133" fill="#94A3B8" fontSize="10">Bavure résiduelle autorisée (strictement interdit en horlogerie)</text>

                  <text x="38" y="152" fill="#38BDF8" fontSize="10" fontWeight="bold">Signe ± 0 :</text>
                  <text x="145" y="152" fill="#E2E8F0" fontSize="10">Arête vive rigoureusement nette sans bavure (couteau d&apos;échappement)</text>
                </svg>
              </div>

              {/* Explanatory notes */}
              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 leading-relaxed pt-1">
                <p>
                  En horlogerie suisse, les ponts et platines portent systématiquement l&apos;indication <span className="font-mono font-bold text-rose-500">-0.02 à -0.05 mm</span>.
                </p>
                <p>
                  Toute bavure métallique résiduelle se détachant dans le barillet ou l&apos;échappement provoquerait un arrêt immédiat de la montre ou une dégradation irréversible du rouage.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: TABLEAU DES CLASSES DE RUGOSITE HORLOGERES */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100">
                Échelle des Rugosités en Horlogerie de Précision
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Correspondance entre la valeur moyenne arithmétique Ra, les classes ISO N1 à N7 et les finitions d&apos;atelier
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 overflow-x-auto">
              <button
                onClick={() => setFilterCategory("tous")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  filterCategory === "tous"
                    ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Tous ({RUGOSITY_DATA.length})
              </button>
              <button
                onClick={() => setFilterCategory("speculaire")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  filterCategory === "speculaire"
                    ? "bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Miroir (N1-N2)
              </button>
              <button
                onClick={() => setFilterCategory("decoration")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  filterCategory === "decoration"
                    ? "bg-white dark:bg-neutral-900 text-[#8A6A3B] dark:text-[#D4B483] shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Décoration (N3-N5)
              </button>
              <button
                onClick={() => setFilterCategory("usinage")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  filterCategory === "usinage"
                    ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Usinage (N6-N7)
              </button>
            </div>
          </div>

          {/* Normative Table */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 font-mono text-neutral-500 dark:text-neutral-400">
                    <th className="p-4 font-semibold">Classe &amp; Symbole</th>
                    <th className="p-4 font-semibold">Valeur Ra (µm)</th>
                    <th className="p-4 font-semibold">Procédé &amp; Outil d&apos;Atelier</th>
                    <th className="p-4 font-semibold">Composant Horloger Associé</th>
                    <th className="p-4 font-semibold">Aspect Visuel &amp; Fonction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {filteredRugosities.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                          {item.isoClass}
                        </div>
                        <div className="text-[11px] font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                          {item.isoSymbol}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                          item.category === "speculaire"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : item.category === "decoration"
                            ? "bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        }`}>
                          {item.raMicrons}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                          {item.process}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {item.tool}
                        </div>
                      </td>

                      <td className="p-4 text-neutral-700 dark:text-neutral-300 font-medium">
                        {item.application}
                      </td>

                      <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px] max-w-sm">
                        {item.visualCharacteristic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: EXPLORATEUR DES FINITIONS DE MANUFACTURE & POINCON DE GENEVE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" />
              <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100">
                Terminaisons Horlogères &amp; Exigences Poinçon de Genève
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">Atelier de Décoration</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector cards */}
            <div className="lg:col-span-5 space-y-3">
              {FINISHES_DATA.map((finish) => (
                <div
                  key={finish.id}
                  onClick={() => setSelectedFinishId(finish.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedFinishId === finish.id
                      ? "border-[#B08D57] bg-white dark:bg-neutral-900 shadow-md ring-1 ring-[#B08D57]/30"
                      : "border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {finish.name}
                    </h4>
                    <span className="font-mono text-xs text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                      {finish.raTarget.split(" ")[0]} {finish.raTarget.split(" ")[1]}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                    {finish.craftTool}
                  </p>
                </div>
              ))}
            </div>

            {/* Right details box */}
            <div className="lg:col-span-7 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                    Fiche Technique de Terminaison
                  </span>
                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100 mt-1">
                    {selectedFinish.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-neutral-500">Rugosité Cible</div>
                  <div className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    {selectedFinish.raTarget}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                <div>
                  <div className="font-mono text-neutral-500 uppercase tracking-wider text-[10px] mb-1">
                    Outil &amp; Matériau d&apos;Atelier
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium">
                    {selectedFinish.craftTool}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-neutral-500 uppercase tracking-wider text-[10px] mb-1">
                    Fonction Mécanique &amp; Rendu Esthétique
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {selectedFinish.purpose}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5 text-[#8A6A3B] dark:text-[#D4B483] font-bold font-mono text-[11px] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Critère Officiel Poinçon de Genève</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 italic">
                    « {selectedFinish.poinconGeneve} »
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: LES 3 REGLES D'OR DE METROLOGIE EN ATELIER */}
        <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B08D57]/10 flex items-center justify-center text-[#8A6A3B] dark:text-[#D4B483]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Les 3 Règles d&apos;Or du Contrôle des Surfaces en Atelier Horloger
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Méthodes suisses de mesure et de validation des états de surface
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-900 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] text-[#B08D57]">1</span>
                Stylet Diamant &amp; Longueur λc
              </div>
              <p className="leading-relaxed">
                Sur les minuscules composants horlogers, la mesure au rugosimètre tactile s&apos;effectue avec une pointe diamant à rayon r = 2 µm et un cut-off calibré λc = 0.8 mm (ou 0.25 mm sur petits mobiles) sous une force d&apos;appui minime (&lt; 0.75 mN) pour ne pas rayer le poli noir.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-900 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] text-[#B08D57]">2</span>
                Contrôle des Arêtes à la Binoculaire
              </div>
              <p className="leading-relaxed">
                La vérification de l&apos;abattement des arêtes (ISO 13715 : -0.02 à -0.05 mm) est systématiquement effectuée sous binoculaire x40 en lumière rasante. Toute bavure microscopique restante brille intensément et trahit un défaut de terminaison.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-900 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] text-[#B08D57]">3</span>
                Orientation des Stries Fonctionnelles
              </div>
              <p className="leading-relaxed">
                Sur les portées de pivots roulés et arbres mobiles, les stries de rugosité doivent être strictement perpendiculaires (symbole ⊥) à l&apos;axe de rotation. Des stries axiales parallèles accéléreraient l&apos;usure du rubis et provoqueraient le déchirement du film lubrifiant.
              </p>
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
