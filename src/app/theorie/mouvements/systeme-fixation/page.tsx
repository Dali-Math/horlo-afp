"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wrench,
  Shield,
  Gauge,
  RotateCcw,
  ArrowRight,
  Flame,
  Sparkles,
  Layers,
  Sliders,
  Maximize2
} from "lucide-react";

// --- DONNÉES TECHNIQUES DES VIS & COUPLES DE SERRAGE NIHS 06-05 ---
interface ScrewTorqueProfile {
  id: string;
  name: string;
  threadCode: string;
  nominalDiameter: string;
  targetTorqueCnm: number; // en cNm (centiNewton-mètres)
  toleranceRangeCnm: [number, number];
  headType: string;
  screwdriverBergeon: string;
  location: string;
  riskDesc: string;
}

const SCREW_PROFILES: ScrewTorqueProfile[] = [
  {
    id: "pont-rouage",
    name: "Vis de Pont de Rouage",
    threadCode: "NIHS S 1.00",
    nominalDiameter: "Ø 1.00 mm (Pas 0.25 mm)",
    targetTorqueCnm: 1.8,
    toleranceRangeCnm: [1.5, 2.1],
    headType: "Tête cylindrique plate chanfreinée, polie miroir",
    screwdriverBergeon: "Panne 1.00 mm (Bague Noire)",
    location: "Maintien du pont de rouage sur piliers de platine",
    riskDesc: "Un sur-serrage voile le pont et détruit les ébats de mobiles (engrènement serré). Un sous-serrage libère les axes aux chocs."
  },
  {
    id: "couronne-inverse",
    name: "Vis de Roue de Couronne (Pas Gauche)",
    threadCode: "NIHS S 1.20 L (Left)",
    nominalDiameter: "Ø 1.20 mm (Filetage Inversé Anti-Horaire)",
    targetTorqueCnm: 2.5,
    toleranceRangeCnm: [2.2, 2.8],
    headType: "Tête à 3 traits gravés identifiant le pas gauche",
    screwdriverBergeon: "Panne 1.20 mm (Bague Rouge)",
    location: "Fixation du rochet intermédiaire de remontoir",
    riskDesc: "Attention impérative : serrage dans le sens inverse des aiguilles d'une montre ! Risque de rupture nette du filet en forçant à droite."
  },
  {
    id: "bride-boite",
    name: "Vis de Bride d'Emboîtage (Crapaud)",
    threadCode: "NIHS S 1.20",
    nominalDiameter: "Ø 1.20 mm (Pas 0.25 mm)",
    targetTorqueCnm: 2.2,
    toleranceRangeCnm: [1.9, 2.5],
    headType: "Tête plate large à portée renforcée",
    screwdriverBergeon: "Panne 1.20 mm (Bague Rouge)",
    location: "Plaquage de la platine contre le drageoir de carrure",
    riskDesc: "Une vis de bride desserrée fait bouger le cadran lors du remontage et tord la tige de remontoir au niveau de la gorge."
  },
  {
    id: "pied-cadran",
    name: "Vis de Pied de Cadran",
    threadCode: "NIHS S 0.70",
    nominalDiameter: "Ø 0.70 mm (Micro-filet)",
    targetTorqueCnm: 0.8,
    toleranceRangeCnm: [0.6, 1.0],
    headType: "Tête conique de blocage latéral",
    screwdriverBergeon: "Panne 0.60 / 0.80 mm (Bague Jaune)",
    location: "Flanc de platine (serrage sur la gorge du pied en cuivre)",
    riskDesc: "Ne jamais serrer à fond : risque de sectionner net le pied de cadran en cuivre doux. Le cône doit juste pincer la gorge."
  }
];

// --- LES 4 SYSTÈMES DE FIXATION & DESSINS CAD SVG ---
interface FixationSystem {
  id: string;
  title: string;
  badge: string;
  summary: string;
  components: string[];
  atelierRule: string;
  tolerance: string;
}

const FIXATION_SYSTEMS: FixationSystem[] = [
  {
    id: "pont-pilier",
    title: "1. Ponts sur Platine : Vis & Piliers de Centrage",
    badge: "Centrage H6/p6 & Précharge",
    summary: "Dans les calibres suisses, les vis n'assurent JAMAIS le positionnement radial des ponts. Ce rôle crucial est confié à deux piliers trempés chassés dans la platine, garantissant la coaxialité parfaite des pierres.",
    components: [
      "Pilier de positionnement conique ou cylindrique (ajustement sans jeu)",
      "Trou de passage chambré dans le pont (diamètre supérieur de 0.05 mm à la vis)",
      "Vis trempée avec portée parfaitement plane perpendiculaire à l'axe",
      "Filet taraudé directement dans le laiton ou maillechort de platine"
    ],
    atelierRule: "Positionnez toujours le pont sur ses deux piliers du bout des brucelles et vérifiez qu'il repose parfaitement plan AVANT d'engager la moindre vis.",
    tolerance: "Coaxialité des paliers : ± 0.002 mm (2 µm)"
  },
  {
    id: "emboitage-bride",
    title: "2. Fixation dans la Boîte : Brides & Cercle d'Emboîtage",
    badge: "Anti-Vibration Carrure",
    summary: "Le calibre doit être rigidement lié à la carrure sans transmettre les déformations dues aux chocs externes. Deux brides d'acier (crapauds) viennent mordre dans la rainure du drageoir.",
    components: [
      "Brides (crapauds) en acier ressort 20AP trempé et revenu",
      "Gorge circulaire usinée dans la carrure de boîte (drageoir)",
      "Vis de boîte traversant le cercle d'emboîtage ou le bord de platine",
      "Cercle de calage amortisseur en laiton rhodié ou polymère technique"
    ],
    atelierRule: "Serrez alternativement les deux vis de bride demi-tour par demi-tour pour équilibrer la tension et éviter de désaxer la tige de remontoir.",
    tolerance: "Ébat axial de calage : 0.05 à 0.10 mm"
  },
  {
    id: "chaton-or",
    title: "3. Chatons en Or Massif Vissés (Haute Horlogerie)",
    badge: "Tradition Glashütte & Genève",
    summary: "Héritage des chronomètres de marine : la pierre de rubis est sertie dans une bague en or 18k (chaton), elle-même fixée dans la platine par 2 ou 3 vis bleuies à 120°.",
    components: [
      "Bague de chaton en or jaune ou rose 18k (matière ductile pour sertir la pierre)",
      "Pierre de rubis synthétique (corindon Al₂O₃, dureté 9 Mohs)",
      "2 ou 3 micro-vis bleuies à 290°C avec portée biseautée",
      "Logement fraisé et perlé dans la platine avec micro-chanfrein poli"
    ],
    atelierRule: "Le chaton permet de régler très précisément la hauteur de la pierre pour ajuster l'ébat axial du mobile sans chasser au marteau.",
    tolerance: "Précision de hauteur : ± 0.003 mm"
  },
  {
    id: "pied-cadran",
    title: "4. Verrouillage des Pieds de Cadran (Gorges & Verrous)",
    badge: "Sécurité Cadran Émail",
    summary: "Les cadrans en émail ou laiton possèdent 2 ou 3 pieds en cuivre brasés sur leur revers. Deux méthodes de fixation coexistent : les vis à cône d'arrêt et les verrous à tiroir (clamps).",
    components: [
      "Pied de cadran en cuivre doux (diamètre 0.60 à 0.80 mm)",
      "Gorge circulaire d'ancrage tournée près de l'extrémité du pied",
      "Vis de cadran à extrémité conique usinée sur le flanc de platine",
      "Verrou à tiroir quart-de-tour (utilisé sur ETA 2824-2 et calibres modernes)"
    ],
    atelierRule: "Ne serrez jamais excessivement un pied de cadran : vous casseriez l'émail sur la face visible du cadran ou cisailleriez le pied net.",
    tolerance: "Jeu de plaquage : 0.00 mm (aucun débattement sous les aiguilles)"
  }
];

// --- QUESTIONS DU QUIZ EXPRESS ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Pourquoi est-il strictement interdit d'huiler le filet d'une vis de pont horlogère ?",
    options: [
      "Parce que l'huile s'évaporerait et bloquerait le balancier.",
      "Parce que l'huile réduit la friction de filet de 40%, causant un sur-serrage dangereux et le foirage du taraudage en laiton.",
      "Parce que le pas de vis horloger est auto-lubrifiant par nature.",
      "Parce que la norme COSC exige des vis totalement magnétiques."
    ],
    correct: 1,
    explanation: "La lubrification d'un filet transforme le couple de serrage mesuré en un effort axial démesuré (+40% à +60%). Le risque d'arracher les filets du laiton de platine ou de voiler le pont est immédiat."
  },
  {
    id: 2,
    question: "Comment reconnaître immédiatement une vis de roue de couronne à filetage gauche (pas inversé) à l'établi ?",
    options: [
      "Elle est toujours fabriquée en or massif 18 carats.",
      "Sa tête comporte 3 traits radiaux gravés caractéristiques, indiquant un serrage anti-horaire.",
      "Son diamètre est deux fois plus grand que toutes les autres vis.",
      "Elle n'a aucune fente de tournevis."
    ],
    correct: 1,
    explanation: "Selon la norme horlogère suisse, les vis à pas gauche portent 3 rainures gravées sur la tête (ou une fente à 3 encoches) pour avertir l'horloger qu'il doit visser vers la gauche (sens anti-horaire)."
  },
  {
    id: 3,
    question: "Dans la construction d'un mouvement, quel organe assure le positionnement radial exact du pont par rapport à la platine ?",
    options: [
      "La tête de la vis grâce à son diamètre extérieur.",
      "Les deux piliers de centrage trempés (goupilles ajustées H6/p6).",
      "La pression exercée par le ressort de barillet.",
      "Le pont se positionne naturellement par gravité."
    ],
    correct: 1,
    explanation: "Le trou de passage de la vis dans le pont est volontairement alésé avec du jeu (+0.05 mm). Ce sont uniquement les deux piliers de positionnement rigides qui garantissent l'entraxe micrométrique des paliers."
  },
  {
    id: 4,
    question: "Quel couple de serrage moyen prescrit la norme NIHS pour une vis de pont M1.00 ?",
    options: [
      "0.15 Nm (soit 15 cNm, couple de mécanique générale).",
      "1.5 à 2.0 cNm (centiNewton-mètres, serrage micrométrique délicat).",
      "12 cNm pour garantir l'étanchéité 100 mètres.",
      "50 cNm avec clé dynamométrique d'armurier."
    ],
    correct: 1,
    explanation: "Les couples horlogers se mesurent en centiNewton-mètres (cNm). Une vis M1.00 de pont se serre entre 1.5 et 2.0 cNm. Serrer au-delà écrase le pont et pince les pivots de rouage."
  }
];

export default function SystemeFixationPage() {
  // Onglet actif pour l'explorateur CAD SVG
  const [activeSystemId, setActiveSystemId] = useState<string>("pont-pilier");

  // Simulateur dynamométrique interactif
  const [selectedScrewId, setSelectedScrewId] = useState<string>("pont-rouage");
  const [appliedTorque, setAppliedTorque] = useState<number>(1.8);

  // Quiz compact stepper
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const activeSystem = FIXATION_SYSTEMS.find((s) => s.id === activeSystemId) || FIXATION_SYSTEMS[0];
  const activeScrew = SCREW_PROFILES.find((s) => s.id === selectedScrewId) || SCREW_PROFILES[0];

  // Statut du couple de serrage
  const minTolerance = activeScrew.toleranceRangeCnm[0];
  const maxTolerance = activeScrew.toleranceRangeCnm[1];
  const isTorqueOptimal = appliedTorque >= minTolerance && appliedTorque <= maxTolerance;
  const isTorqueUnder = appliedTorque < minTolerance;
  const isTorqueOver = appliedTorque > maxTolerance;

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
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Systèmes de Fixation</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              🇨🇭 Normes NIHS 06-05 &amp; ISO 286 · Filetages &amp; Couples de Serrage
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Liaisons Mécaniques &amp; Assemblage de Précision
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Les Systèmes de Fixation <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 bg-clip-text text-transparent">
              du Mouvement Horloger
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Dans un calibre mécanique, chaque pont, cadran et pierre doit être bridé avec une absolue rigueur sans jamais déformer la platine. Découvrez les secrets d&apos;établi : <strong className="text-slate-900 dark:text-white font-semibold">vis bleuies au feu</strong>, <strong className="text-slate-900 dark:text-white font-semibold">piliers trempés H6/p6</strong>, <strong className="text-slate-900 dark:text-white font-semibold">chatons d&apos;or</strong> et <strong className="text-slate-900 dark:text-white font-semibold">couples de serrage en cNm</strong>.
          </p>

          {/* 4 Indicateurs Clés de Fixation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Couple Vis M1.00</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1.8 cNm</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Norme NIHS 06-05</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Piliers de Centrage</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">± 2 µm</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Ajustement H6 / p6</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Dureté des Pierres</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">9 Mohs</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 mt-0.5">Corindon Al₂O₃ 2000 HV</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Vis Pas Gauche</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3 Traits</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-0.5">Roue de Couronne</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION VEDETTE 1 : L'EXPLORATEUR VECTORIEL CAD DES 4 FIXATIONS D'ATELIER */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-amber-500/40 bg-white dark:bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🔬 Schémas Techniques Vectoriels CAD · Coupes Micro-Mécaniques
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Anatomie Comparée des 4 Systèmes de Fixation
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Cliquez sur un système pour charger sa coupe CAD</span>
          </div>

          {/* 4 Onglets de Sélection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {FIXATION_SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-2 font-mono text-xs ${
                  activeSystemId === sys.id
                    ? "bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white font-bold shadow-md ring-1 ring-amber-500/20"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/60"
                }`}
              >
                <span className="text-sm font-serif font-bold leading-tight">{sys.title.split(":")[0]}</span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">{sys.badge}</span>
              </button>
            ))}
          </div>

          {/* GRILLE : COUPE SVG D'ATELIER (7 COLS) & FICHE TECHNIQUE (5 COLS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* DESSIN TECHNIQUE VECTORIEL SVG (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold">COUPE MICROMÉCANIQUE EN ÉTABLI</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{activeSystem.tolerance}</span>
              </div>

              {/* Rendu SVG dynamique selon le système actif */}
              <div className="w-full overflow-hidden flex items-center justify-center py-4 min-h-[300px]">
                {activeSystemId === "pont-pilier" && (
                  <svg viewBox="0 0 520 280" className="w-full h-auto select-none font-mono">
                    {/* Platine de base en laiton */}
                    <rect x="40" y="160" width="440" height="90" rx="8" className="fill-amber-500/20 stroke-amber-600/70" strokeWidth="2" />
                    <text x="50" y="235" className="fill-amber-700 dark:fill-amber-400 font-bold" fontSize="10">PLATINE (Laiton CuZn39Pb2)</text>

                    {/* Pont de rouage supérieur */}
                    <path d="M 40 70 L 480 70 L 480 150 L 40 150 Z" className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" />
                    <text x="50" y="95" className="fill-slate-700 dark:fill-slate-300 font-bold" fontSize="10">PONT DE ROUAGE (Anglé &amp; Poli)</text>

                    {/* Trou chambré de passage de vis */}
                    <rect x="140" y="70" width="60" height="25" className="fill-white dark:fill-slate-950" />
                    <rect x="155" y="95" width="30" height="55" className="fill-white dark:fill-slate-950" />
                    {/* Trou taraudé dans la platine */}
                    <rect x="155" y="150" width="30" height="70" className="fill-white dark:fill-slate-950 stroke-amber-500" strokeDasharray="3 3" />

                    {/* VIS HORLOGÈRE M1.00 (Acier bleui) */}
                    <g transform="translate(170, 70)">
                      {/* Tête de vis */}
                      <rect x="-26" y="2" width="52" height="20" rx="3" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
                      {/* Fente de tournevis */}
                      <rect x="-4" y="2" width="8" height="12" fill="#0F172A" />
                      {/* Tige de vis */}
                      <rect x="-12" y="22" width="24" height="110" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
                      {/* Filetages inclinés */}
                      <line x1="-12" y1="80" x2="12" y2="76" stroke="#93C5FD" strokeWidth="1.5" />
                      <line x1="-12" y1="90" x2="12" y2="86" stroke="#93C5FD" strokeWidth="1.5" />
                      <line x1="-12" y1="100" x2="12" y2="96" stroke="#93C5FD" strokeWidth="1.5" />
                      <line x1="-12" y1="110" x2="12" y2="106" stroke="#93C5FD" strokeWidth="1.5" />
                      <line x1="-12" y1="120" x2="12" y2="116" stroke="#93C5FD" strokeWidth="1.5" />
                    </g>

                    {/* PILIER DE CENTRAGE TREMPÉ H6/p6 (À droite) */}
                    <g transform="translate(370, 110)">
                      <rect x="-14" y="-30" width="28" height="95" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
                      <line x1="-14" y1="40" x2="14" y2="40" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx="0" cy="18" r="4" fill="#38BDF8" />
                    </g>

                    {/* VECTEURS ET COTES */}
                    {/* Flèche d'effort de serrage axial */}
                    <line x1="170" y1="15" x2="170" y2="60" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
                    <text x="170" y="12" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle">Force Axiale (Couple 1.8 cNm)</text>

                    {/* Repère de centrage pilier */}
                    <text x="370" y="45" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">Pilier de Centrage H6/p6</text>
                    <text x="370" y="58" className="fill-slate-500 dark:fill-slate-400" fontSize="8" textAnchor="middle">Zéro jeu radial</text>

                    {/* Indication jeu de trou de vis */}
                    <text x="100" y="125" fill="#F59E0B" fontSize="9">Jeu +0.05 mm</text>
                    <line x1="135" y1="120" x2="152" y2="120" stroke="#F59E0B" strokeWidth="1" />
                  </svg>
                )}

                {activeSystemId === "emboitage-bride" && (
                  <svg viewBox="0 0 520 280" className="w-full h-auto select-none font-mono">
                    {/* Carrure de la boîte de montre */}
                    <path d="M 40 40 L 160 40 L 160 120 L 220 120 L 220 240 L 40 240 Z" className="fill-slate-300 dark:fill-slate-800 stroke-slate-500" strokeWidth="2" />
                    <text x="60" y="80" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="10">CARRURE (Acier 316L)</text>
                    {/* Gorge du drageoir */}
                    <rect x="140" y="105" width="30" height="25" className="fill-slate-100 dark:fill-slate-900 stroke-amber-500" strokeWidth="1.5" />
                    <text x="100" y="145" fill="#F59E0B" fontSize="8">Drageoir</text>

                    {/* Platine de mouvement */}
                    <rect x="225" y="130" width="250" height="110" rx="4" className="fill-amber-500/20 stroke-amber-600" strokeWidth="2" />
                    <text x="320" y="210" className="fill-amber-800 dark:fill-amber-300 font-bold" fontSize="11">PLATINE DE MOUVEMENT</text>

                    {/* BRIDE D'EMBOÎTAGE (CRAPAUD) */}
                    <path d="M 145 110 L 250 110 L 290 125 L 290 145 L 230 145 L 145 125 Z" fill="#64748B" stroke="#1E293B" strokeWidth="1.5" />

                    {/* VIS DE BOÎTE */}
                    <g transform="translate(255, 80)">
                      <rect x="-18" y="2" width="36" height="18" rx="2" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1" />
                      <rect x="-3" y="2" width="6" height="10" fill="#0F172A" />
                      <rect x="-8" y="20" width="16" height="80" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1" />
                    </g>

                    <text x="255" y="60" fill="#2563EB" fontSize="10" fontWeight="bold" textAnchor="middle">Vis de Boîte M1.20</text>
                    <text x="180" y="95" fill="#38BDF8" fontSize="9" fontWeight="bold">Bride (Crapaud)</text>
                  </svg>
                )}

                {activeSystemId === "chaton-or" && (
                  <svg viewBox="0 0 520 280" className="w-full h-auto select-none font-mono">
                    {/* Pont ou Platine perlée */}
                    <rect x="40" y="60" width="440" height="170" rx="12" className="fill-slate-200 dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-700" strokeWidth="2" />

                    {/* Logement fraisé pour chaton */}
                    <circle cx="260" cy="145" r="80" className="fill-white dark:fill-slate-950 stroke-amber-500/40" strokeWidth="1.5" strokeDasharray="4 2" />

                    {/* CHATON EN OR 18K */}
                    <circle cx="260" cy="145" r="70" fill="#E2B44F" stroke="#B45309" strokeWidth="2" />
                    <circle cx="260" cy="145" r="50" fill="#FDE047" opacity="0.6" />

                    {/* PIERRE DE RUBIS SERTIE DANS LE CHATON */}
                    <circle cx="260" cy="145" r="40" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
                    {/* Creusure huilière & trou de pivot */}
                    <circle cx="260" cy="145" r="22" fill="#BE123C" />
                    <circle cx="260" cy="145" r="8" className="fill-slate-900 dark:fill-slate-100" />
                    {/* Goutte d'huile Moebius 9010 */}
                    <circle cx="260" cy="145" r="14" fill="#38BDF8" opacity="0.5" />

                    {/* 3 VIS BLEUIES DE CHATON À 120° */}
                    {/* Vis 1 (Haut) */}
                    <g transform="translate(260, 85)">
                      <circle cx="0" cy="0" r="12" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <line x1="-8" y1="0" x2="8" y2="0" stroke="#0F172A" strokeWidth="2.5" />
                    </g>
                    {/* Vis 2 (Bas gauche) */}
                    <g transform="translate(205, 180)">
                      <circle cx="0" cy="0" r="12" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <line x1="-6" y1="-6" x2="6" y2="6" stroke="#0F172A" strokeWidth="2.5" />
                    </g>
                    {/* Vis 3 (Bas droite) */}
                    <g transform="translate(315, 180)">
                      <circle cx="0" cy="0" r="12" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <line x1="-6" y1="6" x2="6" y2="-6" stroke="#0F172A" strokeWidth="2.5" />
                    </g>

                    <text x="260" y="45" fill="#E2B44F" fontSize="11" fontWeight="bold" textAnchor="middle">Chaton en Or Massif 18k Vissé</text>
                    <text x="260" y="255" className="fill-slate-500 dark:fill-slate-400" fontSize="9" textAnchor="middle">3 micro-vis bleuies à 120° · Huilier Moebius 9010</text>
                  </svg>
                )}

                {activeSystemId === "pied-cadran" && (
                  <svg viewBox="0 0 520 280" className="w-full h-auto select-none font-mono">
                    {/* Cadran supérieur (Émail blanc) */}
                    <rect x="40" y="30" width="440" height="35" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                    <text x="60" y="52" fill="#0F172A" font-bold fontSize="10">CADRAN EN ÉMAIL GRAND FEU</text>

                    {/* Platine inférieure en laiton */}
                    <rect x="40" y="85" width="440" height="160" rx="8" className="fill-amber-500/20 stroke-amber-600/60" strokeWidth="2" />
                    <text x="60" y="225" className="fill-amber-800 dark:fill-amber-300 font-bold" fontSize="10">PLATINE (Flanc de boîte)</text>

                    {/* Trou vertical de pied de cadran */}
                    <rect x="180" y="85" width="45" height="120" className="fill-white dark:fill-slate-950" />

                    {/* PIED DE CADRAN EN CUIVRE DOUX AVEC GORGE */}
                    <g transform="translate(202, 65)">
                      <rect x="-14" y="0" width="28" height="110" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
                      {/* Gorge usinée de blocage */}
                      <path d="M -14 60 L -6 66 L -6 74 L -14 80 Z" fill="#78350F" />
                      <path d="M 14 60 L 6 66 L 6 74 L 14 80 Z" fill="#78350F" />
                    </g>

                    {/* VIS DE SERRAGE LATÉRALE DE CADRAN */}
                    <g transform="translate(340, 135)">
                      <rect x="-15" y="-12" width="30" height="24" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="1" />
                      <line x1="0" y1="-8" x2="0" y2="8" stroke="#0F172A" strokeWidth="2" />
                      {/* Tige filetée avec cône de serrage */}
                      <rect x="-95" y="-7" width="80" height="14" fill="#64748B" stroke="#334155" strokeWidth="1" />
                      <polygon points="-95,-7 -110,0 -95,7" fill="#EF4444" />
                    </g>

                    <line x1="240" y1="135" x2="310" y2="135" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="340" y="105" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle">Vis de Cadran M0.70</text>
                    <text x="340" y="117" className="fill-slate-500 dark:fill-slate-400" fontSize="8" textAnchor="middle">Pointe conique pinçant la gorge</text>

                    <text x="202" y="195" fill="#D97706" fontSize="9" fontWeight="bold" textAnchor="middle">Pied Cuivre Ø 0.60 mm</text>
                  </svg>
                )}
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <span>Dessin vectoriel certifié HorloLearn</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Standard NIHS</span>
              </div>
            </div>

            {/* FICHE TECHNIQUE DU SYSTÈME (5 COLS) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  {activeSystem.badge}
                </span>

                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {activeSystem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {activeSystem.summary}
                </p>

                {/* Composants clés */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 block">
                    Composants &amp; Spécifications d&apos;Atelier :
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    {activeSystem.components.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Règle d'or de l'artisan */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Règle d&apos;Établi du Maître Horloger :
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-[11px]">
                  {activeSystem.atelierRule}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION VEDETTE 2 : LE BANC DYNAMOMÉTRIQUE DES COUPLES DE SERRAGE (cNm)  */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-amber-500/40 bg-white dark:bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ⚡ Métrologie des Filetages · Tournevis Dynamométrique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Simulateur Dynamométrique de Serrage en cNm
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <span>Norme de Contrôle :</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                NIHS 06-05 (Filetages Fins)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* CONTRÔLES DU BANC DYNAMOMÉTRIQUE (5 COLS) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Choix de la vis à tester */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-300 block">
                  1. Sélection de la Vis d&apos;Atelier :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SCREW_PROFILES.map((screw) => (
                    <button
                      key={screw.id}
                      onClick={() => {
                        setSelectedScrewId(screw.id);
                        setAppliedTorque(screw.targetTorqueCnm);
                      }}
                      className={`p-3 rounded-xl text-left border-2 transition-all font-mono text-xs flex flex-col justify-between gap-1 ${
                        selectedScrewId === screw.id
                          ? "bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white font-bold shadow-sm ring-1 ring-amber-500/20"
                          : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <span className="font-semibold truncate">{screw.name}</span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400">{screw.threadCode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider de couple appliqué */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Couple Appliqué :
                  </span>
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                    {appliedTorque.toFixed(2)} cNm
                  </span>
                </div>

                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={appliedTorque}
                  aria-label="Couple appliqué en centiNewton-mètres"
                  onChange={(e) => setAppliedTorque(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.2 cNm (Jeu)</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">Cible : {activeScrew.targetTorqueCnm} cNm</span>
                  <span>4.0 cNm (Rupture)</span>
                </div>
              </div>

              {/* Spécifications du profil actif */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Filetage Nominal :</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeScrew.nominalDiameter}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Tournevis Recommandé :</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{activeScrew.screwdriverBergeon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tolérance Cible NIHS :</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {minTolerance} à {maxTolerance} cNm
                  </span>
                </div>
              </div>

            </div>

            {/* CADRAN DYNAMOMÉTRIQUE & DIAGNOSTIC D'ATELIER (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold">CADRAN DE MESURE AU CENTI-NEWTON-MÈTRE (cNm)</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Tournevis Bergeon 6960</span>
              </div>

              {/* Visualisation Dynamique du Cadran */}
              <div className="w-full flex flex-col items-center justify-center py-6">
                <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden">
                  {/* Arc de jauge */}
                  <svg viewBox="0 0 200 120" className="w-full h-full select-none">
                    {/* Zone Sous-serrage (Jaune/Orange) */}
                    <path d="M 20 100 A 80 80 0 0 1 70 35" fill="none" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" />
                    {/* Zone Nominale NIHS (Verte) */}
                    <path d="M 75 31 A 80 80 0 0 1 125 31" fill="none" stroke="#10B981" strokeWidth="16" />
                    {/* Zone Sur-serrage (Rouge) */}
                    <path d="M 130 35 A 80 80 0 0 1 180 100" fill="none" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />

                    {/* Aiguille dynamique */}
                    {/* Calcul de l'angle pour 0.2 cNm (-70deg) à 4.0 cNm (+70deg) */}
                    {(() => {
                      const angle = -70 + ((appliedTorque - 0.2) / 3.8) * 140;
                      return (
                        <g transform={`translate(100, 100) rotate(${angle})`}>
                          <line x1="0" y1="0" x2="0" y2="-75" stroke="#0F172A" className="dark:stroke-white" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="0" cy="0" r="7" fill="#E2B44F" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Badge d'Avis Dynamique */}
                <div className={`mt-4 p-4 rounded-2xl border text-xs font-mono max-w-lg w-full flex items-start gap-3 ${
                  isTorqueOptimal
                    ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/40"
                    : isTorqueUnder
                    ? "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/40"
                    : "bg-rose-500/10 text-rose-900 dark:text-rose-200 border-rose-500/40"
                }`}>
                  {isTorqueOptimal ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Serrage Parfait (Norme NIHS 06-05)</strong>
                        <p className="mt-1 leading-relaxed">
                          La précharge élastique de la vis maintient le composant sans déformer la platine. Aucun risque de desserrage sous les vibrations COSC.
                        </p>
                      </div>
                    </>
                  ) : isTorqueUnder ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Alerte : Serrage Insuffisant ({appliedTorque} cNm)</strong>
                        <p className="mt-1 leading-relaxed">
                          Le pont ou la bride conserve un micro-jeu axial. Aux chocs, les paliers vibrent, causant des écarts de marche majeurs (±15 s/jour).
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm">Danger : Sur-Serrage Critique ({appliedTorque} cNm)</strong>
                        <p className="mt-1 leading-relaxed">
                          Écrasement plastique du filet en laiton ! Risque de rupture de la tête de vis ou de gauchissement de platine bloquant le balancier.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Règle d&apos;Atelier : Ne jamais serrer à sec avec une panne mal affûtée qui riperait sur le filet.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 : LES VIS HORLOGÈRES & FILETAGES NIHS D'ATELIER                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              🔩 Normes Suisses de Filetage &amp; Finitions Manuelles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Tableau des Vis Horlogères &amp; Pannes de Tournevis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Bleuissage Thermique au Feu
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Chauffées sur plaque de cuivre à 290°C - 300°C, les vis développent une couche d&apos;oxyde de magnétite (Fe₃O₄) d&apos;un bleu profond, protégeant de l&apos;oxydation et révélant le travail de manufacture.
              </p>
              <div className="text-[11px] font-mono text-blue-700 dark:text-blue-400 pt-1">
                Polissage miroir préalable sur zinc obligatoire.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Affûtage de Panne en « T »
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Une panne biseautée classique agit comme un coin et détruit les lèvres de la fente de vis (ripage cam-out). La panne d&apos;horloger doit être dressée sur pierre d&apos;Arkansas avec deux flancs strictement parallèles à 95% de la fente.
              </p>
              <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 pt-1">
                Zéro ripage, transmission de couple intégrale.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Vis à Pas Gauche (Rochet &amp; Couronne)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Lors du remontage manuel, la rotation de la roue de couronne dévisserait instantanément une vis à pas standard. Le pas gauche s&apos;auto-bloque pendant le remontage.
              </p>
              <div className="text-[11px] font-mono text-purple-700 dark:text-purple-400 pt-1">
                Repère NIHS : 3 traits gravés sur la tête.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 : LE QUIZ D'ÉTABLI COMPACT (MODE STEPPER RAFFINÉ)               */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-amber-500/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🎓 Évaluation d&apos;Atelier · Questions Clés de Serrage
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Quiz Express : Maîtrise des Systèmes de Fixation
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
                  Bilan d&apos;Assemblage Horloger
                </h3>
                <p className="text-sm font-mono text-amber-700 dark:text-amber-400 font-bold">
                  Score Final : {userScore} / {QUIZ_QUESTIONS.length} ({Math.round((userScore / QUIZ_QUESTIONS.length) * 100)}%)
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {userScore === QUIZ_QUESTIONS.length
                  ? "Remarquable ! Vous maîtrisez les couples de serrage en cNm, le rôle des piliers et la géométrie des vis NIHS."
                  : "Bonnes bases d'atelier. Relisez les règles de serrage en croix et l'affûtage des pannes pour parfaire votre geste."}
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
              💬 Pratique d&apos;Atelier &amp; Rhabillage
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Foire Aux Questions de l&apos;Artisan Horloger
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Comment extraire une vis de pont dont la tête s&apos;est brisée à ras de la platine ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                La méthode traditionnelle d&apos;établi consiste à dissoudre la tige filetée en acier au bain d&apos;alun de potassium chaud (sulfate double d&apos;aluminium et de potassium). L&apos;alun attaque le fer de la vis sans endommager le laiton ou le maillechort de la platine en 2 à 4 heures.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Pourquoi serrer les vis de pont en croix (ou en diagonale) est-il obligatoire ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Serrer une première vis à fond incline microscopiquement le pont contre son premier pilier. La seconde vis sera forcée de biais et gauchira le pont. Un serrage progressif et alterné en deux passes assure une planéité sous 0.002 mm.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Quelle est la différence entre un rubis chassé directement et un chaton vissé ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Le rubis chassé moderne est emmanché en force directement dans la platine au micromètre (serrage 8 µm). Le chaton vissé (en or 18k) permet un démontage et un réglage d&apos;ébat axial ultra-fin sans presse à chasser, signature de la très Haute Horlogerie suisse et saxonne.
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
