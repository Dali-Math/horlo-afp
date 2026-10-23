"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cog,
  Info,
  Ruler,
  Sparkles,
  Layers,
  Compass,
  BookOpen,
  Award
} from "lucide-react";

interface ComponentDetail {
  id: string;
  nihsCode: string;
  name: string;
  category: "assemblage" | "pivotement" | "transmission";
  material: string;
  hardness: string;
  tolerances: string;
  description: string;
  drawingRules: string[];
  watchApplication: string;
}

const COMPONENTS_DATA: ComponentDetail[] = [
  {
    id: "visserie",
    nihsCode: "NIHS 06-10 à 06-25",
    name: "Visserie Miniature Horlogère (Profil S)",
    category: "assemblage",
    material: "Acier au carbone 20AP / Inox 316L / Titane Grade 5",
    hardness: "Trempé & Revenu (50-54 HRC) ou Poli Bloqué",
    tolerances: "Filetage classe 4H/6H · Pas fin horloger P = 0.20 mm",
    description: "Les vis de mouvement répondent au standard suisse 'Profil S' à angle de filet de 60° et fond de filet arrondi pour résister aux micro-arrachements lors des serrages délicats.",
    drawingRules: [
      "Sommet de filet représenté en trait continu fort (01.2)",
      "Fond de filet représenté en trait continu fin (01.1)",
      "Vue en bout : fond de filet tracé comme un arc de cercle fin ouvert sur un quart (270°)",
      "Fente de tournevis : profondeur calibrée (t = 0.35 D) tracée en trait fort à 45° ou axée"
    ],
    watchApplication: "Fixation des ponts de rouage, coqs de balancier, platines intermédiaires et chatons de rubis."
  },
  {
    id: "rubis",
    nihsCode: "NIHS 30-01 à 30-11",
    name: "Coussinets en Rubis Synthétique (Corindon)",
    category: "pivotement",
    material: "Corindon monocristallin synthétique Al₂O₃ dopé Cr³⁺",
    hardness: "Dureté Mohs 9 · Knoop ~2000 HK (extrême résistance à l'usure)",
    tolerances: "Alésage intérieur H6 (+0.004 / 0 mm) · Extérieur h5 pour chassage serré",
    description: "Le profil intérieur 'olivé' (bombé) supprime les coincements cinématiques lors de flexions d'axe et maintient la goutte d'huile synthétique (Moebius 9010) par capillarité dans sa cuvette.",
    drawingRules: [
      "Dessin en coupe : zone de matière rubis hachurée ou teintée contrastée",
      "Cuvette d'huilage : ménisque concave usiné face extérieure",
      "Olivage interne : bombement torique représenté au tiers médian du trou",
      "Cotation d'alésage : diamètre avec tolérance H6 impérative (ex: Ø 0.12 H6)"
    ],
    watchApplication: "Paliers de pivotement pour balancier, roue d'échappement, roue des secondes et pivots d'ancre."
  },
  {
    id: "pivots",
    nihsCode: "NIHS 20-02",
    name: "Pivots Roulés & Tigerons de Mobiles",
    category: "pivotement",
    material: "Acier trempable Finemac / 20AP (1.1248)",
    hardness: "Trempé-revenu 60-62 HRC · Écrouissage superficiel de roulage",
    tolerances: "Diamètre pivot tolérance h5 ou h6 (ex: Ø 0.10 h5 = +0 / -0.004 mm)",
    description: "Les pivots horlogers subissent l'opération de brunissage au disque de métal dur (roulage) pour obtenir un fini miroir Ra < 0.05 µm garantissant un rendement mécanique supérieur à 98%.",
    drawingRules: [
      "Assiette de portée : surface d'épaulement rectifiée perpendiculaire à l'axe (faux-rond < 0.002 mm)",
      "Congé de raccordement : rayon calibré R = 0.02 à 0.05 mm anti-amorce de rupture",
      "Bout de pivot : tracé bombé sphérique pour appui axial minimal sur le contre-pivot",
      "Rugosité : symbole ISO 21920 avec mention Ra 0.05 sur la portée cylindrique"
    ],
    watchApplication: "Axes de balancier, tigerons de roue moyenne, mobile de grande moyenne et tige d'ancre."
  },
  {
    id: "dentures",
    nihsCode: "NIHS 20-25",
    name: "Engrenages à Denture Cycloïdale Suisse",
    category: "transmission",
    material: "Pignon acier trempé 20AP / Roue en laiton horloger CuZn39Pb2",
    hardness: "Pignon trempé poli 58 HRC · Roue laiton écroui dur",
    tolerances: "Module horloger m = 0.08 à 0.30 mm · Entraxe ± 0.005 mm",
    description: "Contrairement à la denture générale en développante de cercle, la denture cycloïdale suisse assure un roulement pur sans glissement pour les pignons à très faible nombre d'ailes (6 à 12 ailes).",
    drawingRules: [
      "Cercle primitif (d) : impérativement tracé en trait mixte fin (04.1)",
      "Saillie ogivale épicycloïdale : courbe ogive calculée selon le facteur de saillie NIHS",
      "Creux hypocycloïdal : flanc radial droit descendant vers le cercle de pied",
      "Raccordement de pied : congé évitant la concentration d'efforts de flexion"
    ],
    watchApplication: "Rouage de finissage : barillet, mobile de centre, roue moyenne, pignon de seconde et échappement."
  }
];

export default function ElementsHorlogeriePage() {
  const [selectedCompId, setSelectedCompId] = useState("visserie");

  const selectedComp = COMPONENTS_DATA.find((c) => c.id === selectedCompId) || COMPONENTS_DATA[0];

  return (
    <div className="bg-[#FDFCFB] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100 antialiased selection:bg-[#B08D57]/20 selection:text-[#8A6A3B] dark:selection:text-[#D4B483] min-h-screen pb-24 transition-colors duration-200">
      
      {/* TOP APP BAR */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#15161A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100 tracking-wider hover:opacity-80 transition-opacity">
              HORLOLEARN
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Théorie
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie/lecture-de-plan" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Lecture de Plan
            </Link>
            <span className="opacity-40">/</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Éléments d&apos;Horlogerie (NIHS)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              RÉFÉRENTIEL SUISSE CPIH / SEFRI
            </span>
          </div>
        </div>

        {/* Sub-Nav Modules Selector */}
        <div className="border-t border-neutral-100 dark:border-neutral-800/60 overflow-x-auto no-scrollbar">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-2 text-xs">
            <Link
              href="/theorie/lecture-de-plan/types-lignes"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              01. Types de Lignes (ISO 128-2)
            </Link>
            <Link
              href="/theorie/lecture-de-plan/elements-horlogerie"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
            >
              02. Éléments d&apos;Horlogerie (NIHS)
            </Link>
            <Link
              href="/theorie/lecture-de-plan/symboles-normalises"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              03. Symboles &amp; Finitions (ISO 21920)
            </Link>
            <Link
              href="/theorie/lecture-de-plan/vues-techniques"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              04. Vues &amp; Projections (ISO 128-3)
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        
        {/* HERO TITLE & NORMATIVE BADGES */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
            <span>⚙ Fédération Horlogère Suisse · Normes NIHS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
            Composants Standardisés &amp; Visserie Horlogère (Normes NIHS)
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Les Normes de l&apos;Industrie Horlogère Suisse (NIHS) régissent avec une précision micrométrique l&apos;ensemble des organes d&apos;assemblage, vis miniature à profil &quot;S&quot;, rubis d&apos;empierrement, assiettes de pivots roulés et profils de dentures d&apos;engrenage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-1 shadow-sm">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Visserie Miniature</div>
              <div className="text-2xl font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">Profil S 0.50 à 1.40</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Angle de filet 60° · Pas fin P = 0.20 mm</div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-1 shadow-sm">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Pierres Synthétiques</div>
              <div className="text-2xl font-mono font-bold text-rose-600 dark:text-rose-400">Corindon Al₂O₃</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Profil intérieur olivé · Alésage tolérancé H6</div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-1 shadow-sm">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Pivots &amp; Dentures</div>
              <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">Ra &lt; 0.05 µm</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Pivots polis roulés · Ogives cycloïdales</div>
            </div>
          </div>
        </div>

        {/* 4 CARDS WITH VECTOR BLUEPRINT SCHEMAS */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" />
                Les 4 Éléments Clés du Mouvement Mécanique Suisse
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Schémas techniques de définition géométrique selon les fascicules de normes NIHS suisses.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-[#15171D] p-1 rounded-xl border border-neutral-300 dark:border-neutral-800 text-xs font-mono">
              {COMPONENTS_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCompId(c.id)}
                  type="button"
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedCompId === c.id
                      ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Visserie Miniature S (NIHS 06-10 / 06-25) */}
            <div
              onClick={() => setSelectedCompId("visserie")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm ${
                selectedCompId === "visserie"
                  ? "border-[#B08D57] ring-1 ring-[#B08D57]/30"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  1. Visserie Miniature Horlogère (NIHS 06-10 / 06-25)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                  Profil S
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#181A1E] p-2">
                <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                  <rect width="360" height="160" fill="#181A1E" rx="8"/>
                  <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                  
                  {/* Screw head cylindrical with flat slot */}
                  <rect x="50" y="35" width="70" height="90" fill="#334155" stroke="#CBD5E1" strokeWidth="2" rx="2"/>
                  {/* Slot (fente de tournevis) */}
                  <rect x="50" y="65" width="25" height="30" fill="#0F172A" stroke="#B08D57" strokeWidth="1.5"/>
                  {/* Cylindrical body with threads */}
                  <rect x="120" y="55" width="160" height="50" fill="#475569" stroke="#CBD5E1" strokeWidth="2"/>
                  {/* Thread lines (fond de filet fin ISO) */}
                  <line x1="120" y1="60" x2="270" y2="60" stroke="#B08D57" strokeWidth="1" strokeDasharray="2 2"/>
                  <line x1="120" y1="100" x2="270" y2="100" stroke="#B08D57" strokeWidth="1" strokeDasharray="2 2"/>
                  
                  {/* Labels */}
                  <text x="85" y="25" fill="#E2E8F0" fontSize="10" textAnchor="middle">Tête (D)</text>
                  <text x="62" y="112" fill="#B08D57" fontSize="9">Fente (n)</text>
                  <text x="195" y="48" fill="#D4B483" fontSize="10" textAnchor="middle">Filetage S 0.80 à S 1.40</text>
                  <text x="200" y="130" fill="#94A3B8" fontSize="9" textAnchor="middle">Pas fin horloger P = 0.20 mm</text>
                </svg>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Les vis horlogères ont un angle de filet de <strong>60°</strong> avec profil miniature arrondi. La profondeur de fente garantit le guidage parfait de la lame de tournevis rectifiée sans rayer les ponts polis.
              </p>
            </div>

            {/* 2. Pierres Synthétiques / Rubis (NIHS 30-01) */}
            <div
              onClick={() => setSelectedCompId("rubis")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm ${
                selectedCompId === "rubis"
                  ? "border-[#B08D57] ring-1 ring-[#B08D57]/30"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  2. Coussinets en Rubis Synthétique (NIHS 30-01)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-600 dark:text-rose-300 font-bold">
                  Corindon Al₂O₃
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#181A1E] p-2">
                <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                  <rect width="360" height="160" fill="#181A1E" rx="8"/>
                  <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                  
                  {/* Ruby cross section */}
                  <path d="M 100 40 L 260 40 L 260 65 L 240 65 L 240 120 L 100 120 Z" fill="#BE123C" fillOpacity="0.8" stroke="#FB7185" strokeWidth="2"/>
                  {/* Olivage reservoir for oil */}
                  <ellipse cx="170" cy="80" rx="30" ry="12" fill="#181A1E" stroke="#FDE047" strokeWidth="1.5"/>
                  <circle cx="170" cy="80" r="4" fill="#38BDF8"/>
                  
                  <text x="170" y="32" fill="#FB7185" fontSize="10" fontWeight="bold" textAnchor="middle">RUBIS CHASSÉ D&apos;UN PONT</text>
                  <text x="170" y="110" fill="#FDE047" fontSize="9" textAnchor="middle">Cuvette d&apos;huile Moebius (Olivage)</text>
                  <text x="170" y="145" fill="#38BDF8" fontSize="9" textAnchor="middle">Trou cylindrique Ø 0.12 mm H6</text>
                </svg>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le profil intérieur olivé évite le coincement du pivot lors de flexions de l&apos;axe et retient la goutte d&apos;huile par capillarité. Tolérance de chassage serrée de l&apos;ordre de <strong>± 0,004 mm</strong>.
              </p>
            </div>

            {/* 3. Pivots et Tigerons (NIHS 20-02) */}
            <div
              onClick={() => setSelectedCompId("pivots")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm ${
                selectedCompId === "pivots"
                  ? "border-[#B08D57] ring-1 ring-[#B08D57]/30"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  3. Pivots de Mobiles &amp; Arbres (NIHS 20-02)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                  Acier Trempé 20AP
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#181A1E] p-2">
                <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                  <rect width="360" height="160" fill="#181A1E" rx="8"/>
                  <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                  
                  {/* Shaft body */}
                  <rect x="40" y="45" width="160" height="70" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>
                  {/* Shoulder (assiette) */}
                  <path d="M 200 45 L 230 65 L 230 95 L 200 115 Z" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5"/>
                  {/* Polished cylindrical pivot */}
                  <rect x="230" y="70" width="75" height="20" fill="#94A3B8" stroke="#38BDF8" strokeWidth="2"/>
                  {/* Rounded tip */}
                  <path d="M 305 70 A 10 10 0 0 1 305 90 Z" fill="#38BDF8"/>
                  
                  <text x="120" y="35" fill="#E2E8F0" fontSize="10" textAnchor="middle">Tige Ø 0.80 mm</text>
                  <text x="215" y="135" fill="#F59E0B" fontSize="9" textAnchor="middle">Assiette de portée</text>
                  <text x="270" y="60" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">Pivot Ø 0.10 h5 (Poli roulé)</text>
                </svg>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Les pivots subissent le <strong>roulage</strong> au disque de métal dur ou brunissage pour obtenir un état de surface miroir ($Ra &lt; 0{,}05\ \mu\text{m}$) assurant un rendement mécanique maximal.
              </p>
            </div>

            {/* 4. Dentures Cycloïdales Horlogères (NIHS 20-25) */}
            <div
              onClick={() => setSelectedCompId("dentures")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-neutral-900/50 space-y-4 shadow-sm ${
                selectedCompId === "dentures"
                  ? "border-[#B08D57] ring-1 ring-[#B08D57]/30"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                  4. Profil d&apos;Engrenage Cycloïdal (NIHS 20-25)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Roulement Pur
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#181A1E] p-2">
                <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                  <rect width="360" height="160" fill="#181A1E" rx="8"/>
                  {/* Pitch circle (trait mixte fin) */}
                  <line x1="20" y1="90" x2="340" y2="90" stroke="#B08D57" strokeWidth="1.2" strokeDasharray="10 3 2 3"/>
                  {/* Tooth profile */}
                  <path d="M 60 130 L 100 130 L 100 90 Q 115 50 130 50 Q 145 50 160 90 L 160 130 L 200 130 L 200 90 Q 215 50 230 50 Q 245 50 260 90 L 260 130 L 300 130" fill="none" stroke="#10B981" strokeWidth="2.5"/>
                  
                  <text x="180" y="40" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Courbe ogivale épicycloïdale</text>
                  <text x="300" y="82" fill="#D4B483" fontSize="9" textAnchor="end">Cercle primitif (d)</text>
                  <text x="130" y="115" fill="#94A3B8" fontSize="9" textAnchor="middle">Flanc radial</text>
                </svg>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Contrairement à l&apos;industrie générale (profil développante de cercle), l&apos;horlogerie utilise la <strong>denture cycloïdale suisse</strong> : elle réduit drastiquement les frottements sur les petits nombres d&apos;ailes de pignon (6 à 12 ailes).
              </p>
            </div>
          </div>
        </section>

        {/* DETAILED FOCUS COMPONENT CARD */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B08D57]" />
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                Fiche Technique d&apos;Atelier : {selectedComp.name}
              </h3>
            </div>
            <span className="px-3 py-1 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-mono text-xs font-bold border border-[#B08D57]/30">
              {selectedComp.nihsCode}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400 block mb-1">Matière &amp; Traitement</span>
              <strong className="text-neutral-900 dark:text-neutral-200">{selectedComp.material}</strong>
              <div className="text-[11px] text-[#8A6A3B] dark:text-[#D4B483] mt-1">{selectedComp.hardness}</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400 block mb-1">Tolérances Normalisées</span>
              <strong className="text-neutral-900 dark:text-neutral-200">{selectedComp.tolerances}</strong>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400 block mb-1">Emplacement Mouvement</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-sans">{selectedComp.watchApplication}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8A6A3B] dark:text-[#D4B483]" />
              Conventions de Tracé &amp; Règles de Dessin ISO / NIHS :
            </span>
            <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc pl-5">
              {selectedComp.drawingRules.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* NORMATIVE SYNTHESIS TABLE */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" />
                Tableau Synthétique des Tolérances et Normes NIHS
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Spécifications industrielles suisses enseignées dans les écoles d&apos;horlogerie (CPIH / SEFRI).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#191C23] font-mono text-neutral-500 dark:text-neutral-400">
                  <th className="p-4">Norme NIHS</th>
                  <th className="p-4">Organe Horloger</th>
                  <th className="p-4">Matière / État</th>
                  <th className="p-4 text-center">Tolérance Nominale</th>
                  <th className="p-4 text-center">Finition de Surface</th>
                  <th className="p-4">Fonction Horlogère Précise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">NIHS 06-10</td>
                  <td className="p-4 font-semibold text-neutral-900 dark:text-neutral-100">Vis miniature profil S</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Acier trempé 20AP / Inox</td>
                  <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">6H / 4h (P=0.20)</td>
                  <td className="p-4 text-center font-mono text-[#8A6A3B] dark:text-[#D4B483]">Poli bloqué / Poli noir</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Maintien rigide des ponts sous couple calibré</td>
                </tr>
                <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">NIHS 30-01</td>
                  <td className="p-4 font-semibold text-neutral-900 dark:text-neutral-100">Rubis synthétique olivé</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Corindon Al₂O₃ monocristal</td>
                  <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">H6 (+0.004 mm)</td>
                  <td className="p-4 text-center font-mono text-rose-600 dark:text-rose-400">Poli spéculaire glace</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Rétention d&apos;huile Moebius &amp; anti-grippage</td>
                </tr>
                <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">NIHS 20-02</td>
                  <td className="p-4 font-semibold text-neutral-900 dark:text-neutral-100">Pivot cylindrique de mobile</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Acier 20AP (60 HRC)</td>
                  <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">h5 (+0 / -0.004 mm)</td>
                  <td className="p-4 text-center font-mono text-emerald-600 dark:text-emerald-400">Ra &lt; 0.05 µm (Roulé)</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Guidage rotatif à très faible couple résistant</td>
                </tr>
                <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">NIHS 20-25</td>
                  <td className="p-4 font-semibold text-neutral-900 dark:text-neutral-100">Pignon d&apos;engrenage cycloïdal</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Acier trempé / CuZn39Pb2</td>
                  <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">Module m=0.08–0.30</td>
                  <td className="p-4 text-center font-mono text-[#8A6A3B] dark:text-[#D4B483]">Ailes polies miroir</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Roulement pur sans glissement pour 6 à 12 ailes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* WORKSHOP RULES / RÈGLES D'ATELIER */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" />
            Règles d&apos;Atelier &amp; Secrets de Fabrication Suisse
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°1 : Chassage des Pierres
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Potioc &amp; Micromètre
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le rubis se chasse à la presse micrométrique (outil Seitz / Horia). Le serrage est de <strong>0.005 à 0.010 mm</strong>. L&apos;ébat en hauteur du mobile (généralement <strong>0.02 à 0.04 mm</strong>) se règle en enfonçant le rubis par fractions de centième sous contrôle au comparateur.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°2 : Roulage des Pivots
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Brunissage sans copeau
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le roulage n&apos;est pas un meulage abrasif : le disque de métal dur poli exerce une pression qui écrase et brunit les crêtes microscopiques. Cette opération augmente la dureté superficielle par <strong>écrouissage</strong> et assure un coefficient de frottement minimal.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483] font-mono text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Règle n°3 : Entretien des Tournevis
              </div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Pannes Rectifiées
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Une lame de tournevis horloger doit avoir des flancs rigoureusement parallèles et une épaisseur calibrée à la largeur exacte de la fente (norme NIHS 06-20). Une lame en coin riperait instantanément, détruisant la fente et rayant les ponts décorés.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/theorie/lecture-de-plan/types-lignes"
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#8A6A3B] dark:text-[#D4B483]" />
            <span>01. Types de Lignes (ISO 128-2)</span>
          </Link>

          <Link
            href="/theorie/lecture-de-plan/symboles-normalises"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-mono font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
          >
            <span>03. Symboles &amp; Finitions (ISO 21920)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
