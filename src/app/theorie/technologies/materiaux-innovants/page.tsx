"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Atom,
  Shield,
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layers,
  Award,
  ChevronRight,
  Info,
  Compass
} from "lucide-react";

type MaterialItem = {
  id: string;
  name: string;
  icon: string;
  year: string;
  badge: string;
  description: string;
  details: {
    densite: string;
    durete: string;
    magnetisme: string;
    lubrification: string;
    fabrication: string;
  };
  avantages: string[];
  applications: string[];
  brands: string[];
};

type AlloyItem = {
  name: string;
  group: string;
  composition: string;
  resistance: string;
  description: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const MATERIALS: MaterialItem[] = [
  {
    id: "silicium",
    name: "Silicium Monocristallin",
    icon: "⚛️",
    year: "2001",
    badge: "Révolution Majeure",
    description: "La technologie microélectronique appliquée au cœur régulateur horloger.",
    details: {
      densite: "2,33 g/cm³ (3× plus léger que l'acier)",
      durete: "Très élevée (7 sur l'échelle de Mohs)",
      magnetisme: "Totalement amagnétique (100% insensible)",
      lubrification: "Aucune lubrification nécessaire",
      fabrication: "Gravure ionique réactive profonde (DRIE) en salle blanche",
    },
    avantages: [
      "Insensibilité totale aux champs magnétiques (jusqu'à 15'000 Gauss)",
      "Légèreté exceptionnelle réduisant l'inertie parasite",
      "Géométrie parfaite au micron sans bavure d'usinage",
      "Élimine le besoin de lubrification huileuse sur l'échappement",
      "Stabilité thermique accrue via oxydation superficielle (SiO₂)",
    ],
    applications: [
      "Spiral Silinvar® (Patek Philippe)",
      "Échappement Co-Axial en silicium (Omega)",
      "Ancre et roue d'échappement DiamonSil (Ulysse Nardin)",
      "Spiraux de balancier Spiromax® et Oscillateur Monobloc",
    ],
    brands: ["Patek Philippe", "Omega", "Ulysse Nardin", "Breguet", "Rolex (Syloxi)"],
  },
  {
    id: "ceramique",
    name: "Céramique Haute Performance",
    icon: "🏺",
    year: "2005",
    badge: "Inrayable & Inaltérable",
    description: "Oxyde de zirconium fritté à 1'500°C offrant une dureté quasi équivalente au diamant.",
    details: {
      densite: "Environ 6,0 g/cm³",
      durete: "9 Mohs (1'500 à 2'000 Vickers)",
      magnetisme: "Totalement amagnétique",
      lubrification: "Inerte chimiquement",
      fabrication: "Frittage de poudre d'oxyde de zirconium sous haute pression",
    },
    avantages: [
      "Quasi inrayable : résiste à l'usure quotidienne pendant des décennies",
      "Teinte dans la masse : couleur inaltérable aux UV et à l'eau de mer",
      "100% Hypoallergénique et biocompatible avec la peau",
      "Légère et agréable au porter thermique (s'adapte à la température corporelle)",
    ],
    applications: [
      "Lunettes Cerachrom (Rolex)",
      "Boîtiers intégraux en céramique noire/blanche (Chanel J12, IWC Top Gun)",
      "Billes de roulement pour rotors de remontage automatique",
    ],
    brands: ["Chanel", "Rado", "Rolex", "IWC", "Hublot", "Omega"],
  },
  {
    id: "titane",
    name: "Titane Grade 5 (Ti-6Al-4V)",
    icon: "🛡️",
    year: "1970",
    badge: "Aérospatial & Résistant",
    description: "Alliage de titane, aluminium et vanadium offrant un rapport résistance/poids optimal.",
    details: {
      densite: "4,43 g/cm³ (40% plus léger que l'acier)",
      durete: "350 Vickers (très résistant aux chocs)",
      magnetisme: "Paramagnétique (quasi insensible)",
      lubrification: "Excellente tenue aux frottements",
      fabrication: "Usinage CNC haute précision avec outillage carbure spécifique",
    },
    avantages: [
      "40% plus léger que l'acier inoxydable 316L",
      "Résistance exceptionnelle à la corrosion en milieu marin",
      "Totalement anallergique (utilisé en chirurgie osseuse)",
      "Finitions brossées et polies satinées haut de gamme",
    ],
    applications: [
      "Boîtiers de montres de plongée professionnelle (Pelagos, Seamaster)",
      "Ponts et platines squelettés de montres de sport d'élite",
      "Cages de tourbillon ultra-légères",
    ],
    brands: ["Tudor", "Richard Mille", "Omega", "Audemars Piguet", "Grand Seiko"],
  },
  {
    id: "carbone",
    name: "Carbone Forgé & Carbone TPT®",
    icon: "⚡",
    year: "2007",
    badge: "Ultra-Léger & Graphique",
    description: "Centaines de couches de filaments de carbone imprégnées de résine et polymérisées à haute pression.",
    details: {
      densite: "Environ 1,6 g/cm³ (5× plus léger que l'acier)",
      durete: "Excellente absorption des chocs violents",
      magnetisme: "Amagnétique",
      lubrification: "Structure composite",
      fabrication: "Empilement sous autoclave à 120°C sous 6 bars",
    },
    avantages: [
      "Chaque pièce arbore un motif damassé aléatoire unique",
      "Résistance aux accélérations extrêmes (> 5'000 G)",
      "Poids plume sur le poignet pour les montres d'athlètes de haut niveau",
    ],
    applications: [
      "Boîtiers Richard Mille pour Rafael Nadal",
      "Platines et ponts de calibres tourbillon d'avant-garde",
    ],
    brands: ["Richard Mille", "Audemars Piguet", "Hublot", "Panerai (Carbotech)"],
  },
  {
    id: "magic-gold",
    name: "Magic Gold (Or Inrayable)",
    icon: "👑",
    year: "2011",
    badge: "Brevet Mondial Suisse",
    description: "Premier et seul or 18 carats au monde réellement inrayable, fusion d'or pur et de carbure de bore.",
    details: {
      densite: "Or 18 carats (75% d'or pur)",
      durete: "1'000 Vickers (l'or standard est à 140 Vickers)",
      magnetisme: "Amagnétique",
      lubrification: "Matrice composite or/céramique",
      fabrication: "Infiltration d'or liquide à 1400°C sous 200 bars dans de la céramique poreuse",
    },
    avantages: [
      "Ne peut être rayé que par un véritable diamant",
      "Conserve le titre officiel d'or 18 carats certifié par le bureau suisse des métaux précieux",
      "Élimine définitivement les micro-rayures sur les surfaces polies",
    ],
    applications: [
      "Boîtiers et lunettes Hublot Big Bang Magic Gold",
    ],
    brands: ["Hublot (Manufacture Nyon)"],
  },
];

const ALLOYS: AlloyItem[] = [
  {
    name: "Nivachron™",
    group: "Swatch Group & Audemars Piguet",
    composition: "Alliage novateur à base de titane",
    resistance: "10 à 20× plus résistant au magnétisme que l'acier standard",
    description: "Permet de démocratiser la résistance antimagnétique sur tous les mouvements mécaniques sans le coût élevé du silicium.",
  },
  {
    name: "Parachrom Bleu",
    group: "Rolex",
    composition: "Alliage de niobium et zirconium oxydé thermiquement",
    resistance: "Totalement insensible aux champs magnétiques usuels",
    description: "Brevet exclusif Rolex. Insensible aux variations de température et 10 fois plus précis qu'un spiral classique en cas de choc.",
  },
  {
    name: "Silinvar®",
    group: "Patek Philippe / CSEM",
    composition: "Silicium monocristallin avec couche thermique compensatoire",
    resistance: "Amagnétisme absolu (100% amagnétique)",
    description: "Matériau révolutionnaire à géométrie parfaite permettant un spiral autocompensateur qui ne nécessite aucun huilage.",
  },
  {
    name: "Spirate™",
    group: "Omega",
    composition: "Spiral silicium Si14 avec système de réglage fin à excentrique",
    resistance: "Certifié Master Chronometer 15'000 Gauss",
    description: "Permet d'atteindre une précision chronométrique record de 0/+2 secondes par jour avec un réglage fin par graduation de 0,1 seconde.",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Pourquoi le silicium est-il considéré comme une révolution majeure pour le spiral de balancier ?",
    options: [
      "Parce qu'il est beaucoup plus lourd et augmente l'inertie",
      "Parce qu'il est 100% amagnétique, ultra-léger et ne nécessite aucune lubrification",
      "Parce qu'il coûte moins cher à fabriquer que l'acier standard",
      "Parce qu'il peut être soudé à la flamme comme le cuivre",
    ],
    correct: 1,
    explanation: "Le silicium est 3 fois plus léger que l'acier, totalement insensible aux champs magnétiques (responsables de la majorité des retours SAV), usiné au micron près par gravure DRIE et ne s'oxyde jamais.",
  },
  {
    question: "Quelle est la dureté de la céramique d'oxyde de zirconium par rapport à l'acier inoxydable ?",
    options: [
      "Deux fois plus molle que l'acier",
      "Identique à l'acier 316L (environ 200 Vickers)",
      "Environ 1'500 à 2'000 Vickers (quasi équivalente au diamant)",
      "La céramique ne se mesure pas sur l'échelle de Vickers",
    ],
    correct: 2,
    explanation: "La céramique horlogère de haute technologie atteint 9 sur l'échelle de Mohs (1'500 à 2'000 Vickers), contre environ 200 à 250 Vickers pour l'acier standard. Elle ne peut être rayée que par le diamant.",
  },
  {
    question: "Quel alliage antimagnétique exclusif de couleur bleue équipe les calibres Rolex ?",
    options: [
      "Nivachron™",
      "Parachrom Bleu",
      "Silinvar®",
      "Invar de Guillaume",
    ],
    correct: 1,
    explanation: "Le spiral Parachrom Bleu, composé de niobium et de zirconium, est un brevet exclusif Rolex. Sa teinte bleue caractéristique est obtenue par oxydation thermique superficielle.",
  },
];

export default function MateriauxInnovantsPage() {
  const [selectedMatId, setSelectedMatId] = useState<string>(MATERIALS[0].id);
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeMaterial = MATERIALS.find((m) => m.id === selectedMatId) || MATERIALS[0];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === QUIZ_QUESTIONS[currentQIdx].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ESPACE DE DÉGAGEMENT HAUT ANTI-SUPERPOSITION NAVBAR */}
      <div className="pt-8 sm:pt-10 md:pt-12" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* HERO SECTION DE HAUTE HORLOGERIE */}
        <section className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
            <Link
              href="/theorie"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Théorie
            </Link>
            <span>›</span>
            <Link
              href="/theorie/technologies"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Technologies Modernes
            </Link>
            <span>›</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              Matériaux Innovants & Silicium
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 mb-5 shadow-sm max-w-full">
            <Atom className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">Révolution Métallurgique & Salle Blanche • Silicium & Céramiques</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 font-serif px-2">
            Matériaux Innovants en Horlogerie
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Découvrez comment le silicium amagnétique, la céramique inrayable, le titane de grade aérospatial et les composites de carbone redéfinissent la longévité et la précision chronométrique suisse.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">15&apos;000</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Gauss Antimagnétique</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">2&apos;000</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Vickers Céramique</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">-40%</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Poids vs Acier (Titane)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">0.1 s</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Réglage Fin Spirate™</div>
            </div>
          </div>
        </section>

        {/* SECTION 1 : SÉLECTEUR INTERACTIF DES MATÉRIAUX MAJEURS */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Fiches Techniques Matériaux
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Inspecteur des Nouveaux Matériaux Horlogers
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Cliquez sur un matériau pour afficher son dossier complet
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne gauche : Boutons sélecteurs (5 colonnes) */}
            <div className="lg:col-span-5 space-y-3">
              {MATERIALS.map((mat) => {
                const isSelected = mat.id === selectedMatId;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMatId(mat.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 dark:bg-slate-800 dark:border-emerald-400"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{mat.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {mat.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {mat.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {mat.badge}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? "translate-x-1 text-emerald-500" : ""}`} />
                  </button>
                );
              })}
            </div>

            {/* Colonne droite : Fiche Technique Détaillée (7 colonnes) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeMaterial.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                      {activeMaterial.name}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                      {activeMaterial.badge} • Introduit vers {activeMaterial.year}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {activeMaterial.description}
              </p>

              {/* Propriétés Physiques */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Propriétés Physiques Fondamentales
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Masse Volumique</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{activeMaterial.details.densite}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Dureté / Usure</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{activeMaterial.details.durete}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Comportement Magnétique</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeMaterial.details.magnetisme}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Lubrification</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{activeMaterial.details.lubrification}</span>
                  </div>
                </div>
              </div>

              {/* Avantages & Applications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                  <h5 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Avantages Clés</h5>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    {activeMaterial.avantages.map((av, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{av}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Applications Horlogères</h5>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    {activeMaterial.applications.map((ap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{ap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Manufactures pionnières */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Manufactures Références :</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeMaterial.brands.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 : ALLIAGES ANTIMAGNÉTIQUES SUISSES */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Innovations Métallurgiques Suisses
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Les 4 Grands Alliages Antimagnétiques
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Les brevets majeurs développés par les groupes horlogers suisses pour immuniser le spiral contre les smartphones et fermoirs magnétiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALLOYS.map((al, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Antimagnétique
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {al.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
                    {al.group}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {al.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Résistance :</strong> {al.resistance}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 : GRAND QUIZ MATÉRIAUX INNOVANTS */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Évaluation Pédagogique
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Quiz : Les Matériaux du XXIe Siècle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Testez votre maîtrise des propriétés physiques et des applications du silicium et de la céramique.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {!quizFinished ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                    <span>Question {currentQIdx + 1} sur {QUIZ_QUESTIONS.length}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Score : {score} / {QUIZ_QUESTIONS.length}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQIdx].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[currentQIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === QUIZ_QUESTIONS[currentQIdx].correct;

                    let btnStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400";
                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected) {
                        btnStyle = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium";
                      } else {
                        btnStyle = "border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showExplanation}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold font-mono text-slate-600 dark:text-slate-400">
                            {["A", "B", "C", "D"][optIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showExplanation && (
                          <span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-500" />
                            ) : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div
                    className={`p-4 rounded-xl border text-xs sm:text-sm mb-6 transition-all ${
                      selectedOption === QUIZ_QUESTIONS[currentQIdx].correct
                        ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200"
                        : "border-rose-300 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200"
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {selectedOption === QUIZ_QUESTIONS[currentQIdx].correct
                        ? "✓ Excellente réponse !"
                        : "✕ Réponse incorrecte"}
                    </div>
                    <div>{QUIZ_QUESTIONS[currentQIdx].explanation}</div>
                  </div>
                )}

                {showExplanation && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-400 dark:text-slate-950 transition-all shadow-md"
                    >
                      {currentQIdx === QUIZ_QUESTIONS.length - 1 ? "Voir les résultats 🏆" : "Question suivante →"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">
                  {score === 3 ? "🎉" : score >= 2 ? "👏" : "📚"}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Quiz Terminé !
                </h3>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {score} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  {score === 3
                    ? "Parfait ! Vous maîtrisez les matériaux de pointe et les alliages antimagnétiques suisses."
                    : score >= 2
                    ? "Bon résultat ! Révisez les particularités de la gravure DRIE pour atteindre la note maximale."
                    : "Prenez le temps de relire la fiche sur le silicium et la céramique et réessayez !"}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-400 dark:text-slate-950 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer le quiz</span>
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
