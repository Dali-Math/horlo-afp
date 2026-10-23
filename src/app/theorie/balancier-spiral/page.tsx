"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings2,
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
  Zap,
  Target
} from "lucide-react";

interface ComponentDetail {
  id: string;
  name: string;
  role: string;
  technicalRule: string;
  material: string;
  tolerances: string;
}

const REGULATOR_COMPONENTS: ComponentDetail[] = [
  {
    id: "serge",
    name: "La Serge & les Bras du Balancier",
    role: "Volant d'inertie circulaire qui emmagasine l'énergie cinétique à chaque alternance. Son moment d'inertie I = m·r² dicte la résistance aux perturbations extérieures et garantit la stabilité de marche.",
    technicalRule: "L'équilibrage dynamique (poise) doit être parfait au millième de milligramme : tout balourd périphérique engendre un écart de marche immédiat entre les positions verticales.",
    material: "Alliage Glucydur (Cuivre-Béryllium) amagnétique et à faible coefficient de dilatation thermique (ou Maillechort doré / Or 18k).",
    tolerances: "Faux-rond et faux-plat < 0.002 mm · Équilibrage dynamique au laser"
  },
  {
    id: "axe",
    name: "L'Axe de Balancier & ses Pivots Roulés",
    role: "Axe central en acier trempé supportant le balancier, le double plateau et la virole du spiral. Ses deux pivots coniques microscopiques reposent dans les paliers antichocs.",
    technicalRule: "Les pivots de balancier sont roulés au disque de métal dur pour obtenir un écrouissage de surface et une rugosité Ra < 0.05 µm. Leur diamètre minuscule (0.07 à 0.09 mm) minimise le rayon de frottement.",
    material: "Acier trempable 20AP (1.1248) trempé et revenu à 60-62 HRC.",
    tolerances: "Diamètre des pivots : 0.080 mm (+0 / -0.002 mm) · Fini poli bloqué"
  },
  {
    id: "plateau",
    name: "Le Double Plateau & la Cheville d'Impulsion",
    role: "Organe de liaison entre le balancier et l'ancre suisse. Le grand plateau porte la cheville de plateau (rubis d'impulsion) et le petit plateau présente la creusure de passage pour le dard de sécurité.",
    technicalRule: "La cheville de plateau demi-cylindrique (ellipse) doit être chassée avec un angle rigoureusement perpendiculaire et scellée à la gomme-laque ou chassée serrée dans son logement.",
    material: "Plateaux en acier doux ou laiton. Cheville en rubis synthétique (corindon rouge taillé et poli).",
    tolerances: "Ébat de sécurité du dard dans la creusure : 0.02 à 0.03 mm"
  },
  {
    id: "spiral",
    name: "Le Spiral Horloger & sa Virole",
    role: "Ressort de rappel élastique enroulé en spirale d'Archimède. Il développe un couple de rappel rigoureusement proportionnel à l'angle d'oscillation, ramenant sans cesse le balancier vers son point mort.",
    technicalRule: "Sa fixation intérieure s'effectue sur une virole fendue ou circulaire emmanchée sur l'axe, tandis que son extrémité extérieure est goupillée ou collée au piton fixé au coq.",
    material: "Alliage Nivarox I / Anisochron (Fe-Ni autocompensateur thermique) ou Silicium monocristallin (Silinvar / Syloxi).",
    tolerances: "Épaisseur de lame : 0.025 mm (calibrée au dixième de micron près)"
  },
  {
    id: "antichoc",
    name: "Le Système Antichoc (Incabloc / Kif)",
    role: "Palier élastique protégeant les pivots de balancier contre les chocs axiaux et radiaux en autorisant un léger déplacement contrôlé du chaton porte-pierre avant que la portée de l'axe ne vienne en butée sur le bâti.",
    technicalRule: "Le ressort lyre en acier trempé maintient le contre-pivot sous une pré-tension calibrée. Lors d'un choc, le cône de l'axe absorbe l'énergie sur le corps rigide du coq et non sur le pivot.",
    material: "Corps en laiton doré, pierre percée et contre-pivot en rubis synthétique olivé, ressort lyre en acier ressort.",
    tolerances: "Centrage automatique parfait après déformation à < 0.001 mm"
  }
];

const REGULATION_SYSTEMS = [
  {
    system: "Réglage par Raquette (Traditionnel)",
    principle: "Deux goupilles de raquette enserrent la dernière spire du spiral. En déplaçant la raquette, on modifie la longueur active libre L du spiral.",
    physics: "Période T ∝ √L. Raccourcir le spiral augmente la fréquence (la montre avance) ; l'allonger la ralentit (la montre retarde).",
    pros: "Ajustement rapide et aisé à l'établi sans toucher au balancier (système ETACHRON ou raquette col de cygne).",
    cons: "Le jeu inévitable entre les goupilles de raquette et le spiral perturbe la concentricité et altère l'isochronisme aux faibles amplitudes.",
    manufacture: "ETA 2824-2, Sellita SW200, Valjoux 7750, calibres écoles Unitas",
    color: "#60A5FA"
  },
  {
    system: "Balancier à Inertie Variable (Spiral Libre)",
    principle: "Le spiral est entièrement libre (aucun contact de raquette, longueur fixe). Le réglage de marche se fait en modifiant le moment d'inertie I du balancier via des masselottes.",
    physics: "Période T ∝ √I. Rapprocher les masselottes du centre diminue l'inertie (la montre avance) ; les éloigner l'augmente (la montre retarde).",
    pros: "Isochronisme exceptionnel, respect absolu de la respiration du spiral, insensibilité totale aux chocs du quotidien.",
    cons: "Exige des outils spécifiques de manufacture et un réglage par paires symétriques sous binoculaire.",
    manufacture: "Patek Philippe Gyromax · Rolex Microstella · Omega Co-Axial Si14 · Audemars Piguet",
    color: "#E2B44F"
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Quelle est la conséquence physique directe de la formule d'isochronisme T = 2π·√(I / Cs) dans un balancier-spiral idéal ?",
    options: [
      "La durée d'une oscillation dépend uniquement de la force du barillet",
      "La période d'oscillation est totalement indépendante de l'amplitude du balancier",
      "La fréquence d'oscillation double lorsque la température augmente",
      "Le balancier effectue toujours 10 alternances par seconde"
    ],
    correctAnswer: 1,
    explanation: "C'est la définition fondamentale de l'isochronisme : la période T ne dépend que de l'inertie I du balancier et de la raideur Cs du spiral. Que le balancier oscille à 180° ou à 300°, le temps mis pour faire un aller-retour reste strictement identique."
  },
  {
    question: "Pourquoi l'épaisseur (e) de la lame du spiral est-elle la cote la plus sensible de toute la montre mécanique (Cs ∝ e³) ?",
    options: [
      "Parce qu'elle rouille plus vite que les autres pièces",
      "Parce que son influence est élevée au cube : une variation de seulement 1% sur l'épaisseur modifie la marche de plus de 40 minutes par jour !",
      "Parce que le spiral ne peut pas être fabriqué en acier",
      "Parce que l'épaisseur détermine la couleur bleutée du métal"
    ],
    correctAnswer: 1,
    explanation: "Dans la formule du couple élastique Cs = (E · b · e³) / (12 · L), l'épaisseur e intervient à la puissance 3. Une microscopique variation de 0.0002 mm (un cinquième de micron !) altère considérablement la raideur du spiral et crée des écarts de marche majeurs."
  },
  {
    question: "Quel problème géométrique capital la « courbe terminale relevée Breguet » permet-elle de résoudre par rapport à un spiral plat ?",
    options: [
      "Elle empêche le ressort de se magnétiser",
      "Elle permet au spiral de se développer de façon parfaitement concentrique, maintenant son centre de gravité sur l'axe de pivotement",
      "Elle remplace la cheville de plateau en rubis",
      "Elle supprime le besoin d'huile sur l'échappement"
    ],
    correctAnswer: 1,
    explanation: "Un spiral plat se dilate de manière asymétrique en poussant latéralement sur l'axe de balancier en position verticale. La courbe relevée Breguet (théorisée par Phillips) force les spires à s'ouvrir concentriquement, annulant les frottements asymétriques sur les pivots."
  },
  {
    question: "Quelle est la différence fondamentale entre un réglage par raquette et un balancier à inertie variable (comme le Gyromax ou Microstella) ?",
    options: [
      "La raquette agit sur la longueur active du spiral, tandis que l'inertie variable modifie le volant d'inertie du balancier avec un spiral libre",
      "L'inertie variable utilise une pile électrique dissimulée dans le balancier",
      "La raquette n'est utilisée que sur les pendules de cheminée",
      "L'inertie variable double la taille du barillet"
    ],
    correctAnswer: 0,
    explanation: "Sur un balancier à inertie variable, le spiral est 'libre' sans aucune goupille perturbatrice : on visse ou dévisse de petites masselottes sur la serge pour modifier l'inertie I, ce qui offre une régularité chronométrique et une stabilité aux chocs très supérieures."
  },
  {
    question: "Comment le système pare-choc Incabloc protège-t-il les pivots de balancier (diamètre ~0.08 mm) contre la casse lors d'une chute ?",
    options: [
      "En déconnectant automatiquement le barillet",
      "En autorisant le chaton porte-pierre à s'effacer sous un ressort lyre, permettant à la partie épaisse de l'axe de venir en butée sur le bâti",
      "En bloquant instantanément l'aiguille des secondes",
      "En entourant le balancier d'un coussin en caoutchouc"
    ],
    correctAnswer: 1,
    explanation: "Lors d'un choc, le chaton en rubis glisse sur les plans inclinés du logement contre la pression du ressort lyre. La portée conique robuste de l'axe de balancier vient alors porter directement contre le coq rigide, absorbant 95% de l'impact sans briser les pivots fins."
  }
];

export default function BalancierSpiralPage() {
  const [selectedComp, setSelectedComp] = useState(0);

  // Regulation Simulator State
  const [balanceInertiaOffset, setBalanceInertiaOffset] = useState(0); // in µg·cm² (-10 to +10)
  const [springActiveLengthOffset, setSpringActiveLengthOffset] = useState(0); // in % (-5% to +5%)
  const [baseFrequency, setBaseFrequency] = useState(4); // 4 Hz = 28'800 A/h default

  // Quiz Stepper State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Calculated daily rate offset in seconds / day:
  // Reducing length -> faster (+s/d). Increasing inertia -> slower (-s/d).
  const calculatedDailyRate = Math.round(
    -springActiveLengthOffset * 18 - balanceInertiaOffset * 4.5
  );

  const calculatedAh = baseFrequency * 7200;
  const calculatedAmplitude = Math.max(220, Math.min(315, 290 - Math.abs(calculatedDailyRate) * 0.4));

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

  const activeComp = REGULATOR_COMPONENTS[selectedComp];

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
              Le Balancier-Spiral &amp; Régulation
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
              Module 05 · Haute Chronométrie &amp; Isochronisme
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Niveau : CFC Horloger Praticien &amp; Rhabilleur
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
              35 min de lecture · Laboratoire de Marche
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
            Le Balancier-Spiral : Cœur Chronométrique &amp; Lois de l&apos;Isochronisme
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            Véritable métronome mécanique du calibre, le couple <strong>balancier-spiral</strong> bat jour et nuit 
            à une fréquence inaltérable (jusqu&apos;à 28&apos;800 alternances par heure). De la célèbre <strong>courbe terminale Breguet</strong> 
            aux spiraux en <strong>silicium amagnétique</strong> et aux balanciers à inertie variable 
            (<strong>Gyromax</strong>, <strong>Microstella</strong>), plongez au cœur de la science horlogère suisse de la précision.
          </p>
        </section>

        {/* =================================================================== */}
        {/* 2. ANATOMIE INTERACTIVE DE L'ORGANE RÉGULATEUR (SCHÉMA CAD SVG) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 1 · Anatomie &amp; Composants Micrométriques
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Architecture d&apos;Établi : L&apos;Oscillateur &amp; le Système Antichoc
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Explorez les 5 constituants essentiels du système oscillateur. Cliquez sur chaque élément pour découvrir 
              ses règles de tolérance d&apos;atelier et son comportement physique.
            </p>
          </div>

          {/* SÉLECTEUR D'ÉLÉMENTS */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {REGULATOR_COMPONENTS.map((comp, idx) => (
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
                <span>{comp.name}</span>
              </button>
            ))}
          </div>

          {/* FICHE TECHNIQUE DE LA PIÈCE SÉLECTIONNÉE */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase">
                  Composant Chronométrique n°0{selectedComp + 1}
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
                  <h4 className="font-mono font-bold uppercase text-neutral-500 text-xs">Rôle dans la Régulation</h4>
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
                    💡 Règle d&apos;Établi du Maître Régleur :
                  </span>
                  <p className="leading-relaxed">
                    {activeComp.technicalRule}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DESSIN TECHNIQUE VECTORIEL CAD (BALANCIER-SPIRAL ÉCLATÉ & ANTICHOC) */}
          <div className="p-6 rounded-3xl border border-neutral-700/60 bg-[#15171D] text-[#E0E2E6] space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
              <span className="text-neutral-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57]"></span>
                VUE VECTORIELLE TECHNIQUE DU BALANCIER-SPIRAL &amp; ANTICHOC INCABLOC
              </span>
              <span className="text-neutral-400">PLAN AXIAL DE RÉGULATION (ÉCHELLE 20:1)</span>
            </div>

            <div className="w-full overflow-x-auto py-4 flex justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-[720px] h-auto select-none font-mono">
                {/* Patterns */}
                <defs>
                  <linearGradient id="glucydur-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>

                {/* Center Axis of Revolution */}
                <line x1="380" y1="15" x2="380" y2="245" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="14 3 3 3" />
                <text x="390" y="25" fill="#60A5FA" fontSize="10" fontWeight="bold">AXE DE BALANCIER</text>

                {/* 1. Upper Incabloc Shock Absorber on Cock (Coq) */}
                <rect x="350" y="30" width="60" height="24" rx="4" fill="#1C1F26" stroke="#94A3B8" strokeWidth="1.5" />
                {/* Lyre Spring */}
                <path d="M 360 38 Q 380 32 400 38 Q 380 44 360 38" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                {/* Cap jewel (Contre-pivot rubis) */}
                <circle cx="380" cy="42" r="5" fill="#EF4444" />
                <text x="420" y="45" fill="#94A3B8" fontSize="10">Antichoc Incabloc (Haut)</text>

                {/* 2. Balance Staff (Axe de Balancier en Acier) */}
                {/* Upper conical pivot */}
                <line x1="380" y1="47" x2="380" y2="65" stroke="#E2E8F0" strokeWidth="2.5" />
                {/* Balance Seat (Portée de balancier) */}
                <rect x="365" y="105" width="30" height="15" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                {/* Lower conical pivot */}
                <line x1="380" y1="195" x2="380" y2="225" stroke="#E2E8F0" strokeWidth="2.5" />

                {/* 3. Balance Wheel Rim (Serge Glucydur en coupe) */}
                {/* Left rim section */}
                <rect x="130" y="100" width="28" height="25" rx="3" fill="url(#glucydur-grad)" stroke="#B45309" strokeWidth="1.5" />
                {/* Masselotte Microstella on left */}
                <circle cx="144" cy="94" r="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
                {/* Left arm */}
                <line x1="158" y1="112" x2="365" y2="112" stroke="#F59E0B" strokeWidth="3" />

                {/* Right rim section */}
                <rect x="602" y="100" width="28" height="25" rx="3" fill="url(#glucydur-grad)" stroke="#B45309" strokeWidth="1.5" />
                {/* Masselotte Microstella on right */}
                <circle cx="616" cy="94" r="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
                {/* Right arm */}
                <line x1="395" y1="112" x2="602" y2="112" stroke="#F59E0B" strokeWidth="3" />

                {/* 4. Hairspring (Spiral avec Courbe Breguet Relevée) */}
                {/* Collet / Virole on staff */}
                <rect x="370" y="70" width="20" height="12" rx="2" fill="#64748B" />
                {/* Spiral flat coils */}
                <path d="M 370 76 C 340 76 310 82 280 82 C 240 82 220 74 190 74" fill="none" stroke="#38BDF8" strokeWidth="1.8" />
                <path d="M 390 76 C 420 76 450 82 480 82 C 520 82 540 74 570 74" fill="none" stroke="#38BDF8" strokeWidth="1.8" />
                {/* Overcoil Breguet (Courbe relevée passant au-dessus) */}
                <path d="M 190 74 Q 185 62 200 62 L 320 62 Q 340 62 345 52" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 2" />
                {/* Piton */}
                <rect x="340" y="47" width="10" height="10" fill="#E2E8F0" />
                <text x="210" y="58" fill="#60A5FA" fontSize="10" fontWeight="bold">Courbe Breguet (Relevée)</text>

                {/* 5. Double Roller (Double Plateau en bas) */}
                {/* Large roller */}
                <rect x="360" y="150" width="40" height="10" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                {/* Ruby Impulse Pin (Cheville de plateau) */}
                <rect x="390" y="158" width="6" height="16" rx="2" fill="#EF4444" />
                {/* Small roller with crescent (Creusure) */}
                <rect x="368" y="162" width="24" height="8" rx="1" fill="#CBD5E1" />
                <text x="402" y="172" fill="#EF4444" fontSize="10" fontWeight="bold">Cheville (Ellipse)</text>

                {/* 6. Lower Incabloc on Mainplate (Platine) */}
                <rect x="350" y="215" width="60" height="24" rx="4" fill="#1C1F26" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="380" cy="227" r="5" fill="#EF4444" />
                <text x="420" y="230" fill="#94A3B8" fontSize="10">Antichoc Incabloc (Bas)</text>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span>🟡 Serge en Glucydur équilibrée dynamiquement</span>
              <span>🔵 Spiral Nivarox / Silicium à courbe terminale Breguet</span>
              <span>🔴 Double plateau avec cheville de rubis &amp; antichocs Incabloc</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. LA PHYSIQUE DE L'ISOCHRONISME : FORMULES FONDAMENTALES */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 2 · Physique &amp; Métrologie
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Les Lois Mathématiques de l&apos;Isochronisme Horloger
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              La régularité d&apos;une montre ne dépend pas du hasard : elle découle de la formule harmonique de Christian Huygens 
              qui relie le moment d&apos;inertie du balancier au couple de rappel élastique du spiral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase tracking-wider block">
                Formule 1 · Période d&apos;Oscillation Propre
              </span>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-800 text-center font-mono font-bold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
                T = 2π · √(I / C_s)
              </div>

              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  <strong>T :</strong> Période d&apos;une oscillation complète en secondes (1 oscillation = 2 alternances).
                </p>
                <p>
                  <strong>I :</strong> Moment d&apos;inertie du balancier (I = m · r² en g · cm²).
                </p>
                <p>
                  <strong>C_s :</strong> Constante de couple de rappel élastique du spiral (en mN · mm/rad).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                ✓ <strong>Propriété d&apos;isochronisme :</strong> L&apos;amplitude de rotation (de 180° à 310°) ne figure nulle part dans l&apos;équation ! La durée d&apos;oscillation reste constante quelle que soit l&apos;ampleur du battement.
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase tracking-wider block">
                Formule 2 · Couple Élastique du Spiral
              </span>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-800 text-center font-mono font-bold text-xl sm:text-2xl text-[#8A6A3B] dark:text-[#D4B483]">
                C_s = (E · b · e³) / (12 · L)
              </div>

              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  <strong>E :</strong> Module d&apos;élasticité d&apos;Young de l&apos;alliage (~200&apos;000 N/mm²).
                </p>
                <p>
                  <strong>b &amp; L :</strong> Hauteur de lame (b) et longueur active développée (L).
                </p>
                <p className="text-rose-600 dark:text-rose-400 font-bold">
                  <strong>e³ :</strong> Épaisseur de la lame au CUBE !
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs">
                ⚠️ <strong>Alerte de manufacture :</strong> L&apos;épaisseur e étant au cube, une variation infinitésimale de <strong>0.0002 mm</strong> (un cinquième de micron !) modifie la marche de la montre de plus de <strong>40 minutes par jour</strong>.
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. LA COURBE TERMINALE BREGUET & LES COURBES DE PHILLIPS */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 3 · Géométrie Supérieure
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              La Courbe Terminale Breguet &amp; les Équations d&apos;Édouard Phillips
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Découvrez comment l&apos;élévation de la dernière spire au-dessus du plan annule le déplacement du centre de gravité 
              et élimine les erreurs de position verticale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4">
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                1. Le Problème du Spiral Plat d&apos;Archimède
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sur un spiral plat standard, l&apos;extrémité extérieure est fixée rigidement au piton. 
                Lorsqu&apos;il s&apos;ouvre et se ferme, le spiral ne respire pas de manière symétrique : 
                son <strong>centre de gravité s&apos;écarte continuellement de l&apos;axe de rotation</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                <span className="font-bold text-rose-600 dark:text-rose-400 block">Défaut chronométrique induit :</span>
                <p>
                  En position verticale (montre portée au poignet), le poids excentré du spiral agit comme un balourd perturbateur 
                  qui accélère ou freine les oscillations selon l&apos;angle de position (différence de marche pouvant atteindre 15 à 20 sec/jour).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4">
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                2. La Révolution de la Courbe Breguet (1795) &amp; Phillips (1860)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Abraham-Louis Breguet a l&apos;intuition géniale de relever la spire finale au-dessus du plan et de la cintrer vers l&apos;intérieur. 
                Soixante ans plus tard, le mathématicien <strong>Édouard Phillips</strong> démontre par le calcul différentiel 
                les conditions exactes que doit respecter cette courbe pour maintenir le centre de gravité rigoureusement fixe sur l&apos;axe.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                <span className="font-bold block">Résultat Chronométrique :</span>
                <p>
                  Développement 100% concentrique, suppression des poussées latérales sur les pivots et isochronisme parfait 
                  dans toutes les positions de l&apos;espace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. PHILOSOPHIE DE RÉGLAGE : RAQUETTE VS INERTIE VARIABLE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 4 · Réglage &amp; Chronométrie
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Systèmes de Réglage : Raquette vs Balancier à Inertie Variable
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Deux grandes écoles s&apos;opposent en horlogerie suisse pour ajuster la marche quotidienne d&apos;un calibre : 
              agir sur la longueur active du spiral ou modifier l&apos;inertie du balancier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REGULATION_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                    {sys.system}
                  </h3>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sys.color }}></span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-mono font-bold text-neutral-500 block uppercase text-[10px]">Principe Mécanique</span>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">{sys.principle}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                    {sys.physics}
                  </div>

                  <div>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block uppercase text-[10px]">Avantages Clés</span>
                    <p className="text-neutral-600 dark:text-neutral-400">{sys.pros}</p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400 block uppercase text-[10px]">Limites Techniques</span>
                    <p className="text-neutral-600 dark:text-neutral-400">{sys.cons}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                    Exemples : {sys.manufacture}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. LABORATOIRE & SIMULATEUR D'ISOCHRONISME ET DE RÉGLAGE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 5 · Pratique d&apos;Établi &amp; Chronocomparateur
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Simulateur de Réglage Chronométrique (Avance / Retard)
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Expérimentez en direct le réglage d&apos;un calibre comme sur un chronocomparateur d&apos;établi (Witschi). 
              Ajustez les masselottes d&apos;inertie ou la raquette et observez l&apos;impact immédiat sur la marche en secondes/jour.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sliders d'Ajustement */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Inertie (Masselottes) */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Position des Masselottes d&apos;Inertie (Gyromax / Microstella) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{balanceInertiaOffset > 0 ? `+${balanceInertiaOffset}` : balanceInertiaOffset} µg·cm²</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    value={balanceInertiaOffset}
                    onChange={(e) => setBalanceInertiaOffset(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>Vers l&apos;intérieur (Accélère la marche)</span>
                    <span>Neutre</span>
                    <span>Vers l&apos;extérieur (Ralentit la marche)</span>
                  </div>
                </div>

                {/* 2. Longueur active (Raquette) */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Déplacement de la Raquette (Longueur active L) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{springActiveLengthOffset > 0 ? `+${springActiveLengthOffset}` : springActiveLengthOffset} %</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={springActiveLengthOffset}
                    onChange={(e) => setSpringActiveLengthOffset(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>-5% Raccourci (Avance)</span>
                    <span>0% Neutre</span>
                    <span>+5% Allongé (Retard)</span>
                  </div>
                </div>

                {/* Sélecteur Fréquence de Base */}
                <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-xs font-mono text-neutral-500 block">Fréquence nominale du calibre :</span>
                  <div className="flex gap-2">
                    {[
                      { hz: 2.5, label: "2.5 Hz (18'000 A/h)" },
                      { hz: 3.0, label: "3.0 Hz (21'600 A/h)" },
                      { hz: 4.0, label: "4.0 Hz (28'800 A/h)" },
                      { hz: 5.0, label: "5.0 Hz (36'000 A/h)" }
                    ].map((f) => (
                      <button
                        key={f.hz}
                        type="button"
                        onClick={() => setBaseFrequency(f.hz)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                          baseFrequency === f.hz
                            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cadran Witschi Simulé (Live Output) */}
              <div className="p-6 rounded-3xl bg-neutral-900 text-white dark:bg-[#181A1F] border border-neutral-700/60 flex flex-col justify-between space-y-4 shadow-lg font-mono">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">CHRONOCOMPARATEUR</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      EN LIGNE
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-neutral-400 block">Marche Journalière (Rate) :</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-bold ${
                        Math.abs(calculatedDailyRate) <= 4
                          ? "text-emerald-400"
                          : Math.abs(calculatedDailyRate) <= 15
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}>
                        {calculatedDailyRate > 0 ? `+${calculatedDailyRate}` : calculatedDailyRate}
                      </span>
                      <span className="text-xs text-neutral-400">sec / jour</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-xs">
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Amplitude :</span>
                      <span className="font-bold text-neutral-200">{calculatedAmplitude}°</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Repère (Beat error) :</span>
                      <span className="font-bold text-neutral-200">0.1 ms</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
                  Norme Chronomètre Suisse (COSC) : <strong>-4 à +6 s/j</strong>
                  <div className="mt-1">
                    {Math.abs(calculatedDailyRate) <= 5 ? (
                      <span className="text-emerald-400 font-bold">✓ Conforme Certification COSC</span>
                    ) : (
                      <span className="text-amber-400 font-bold">⚠️ Réglage hors tolérance COSC</span>
                    )}
                  </div>
                </div>
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
                Quiz de Validation Rapide : Balancier-Spiral &amp; Régulation
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
                      ? "Félicitations ! Théorie Chronométrique Validée."
                      : "Bon travail ! Quelques notions d'isochronisme à revoir."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez l'isochronisme, la courbe Breguet, l'Incabloc et les balanciers à inertie variable. Prêt pour les traités suivants !"
                      : "Prenez le temps de revoir la formule d'inertie et l'influence de l'épaisseur au cube du spiral avant de passer aux examens."}
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
            href="/theorie/echappement-ancre"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Module 04 : L&apos;Échappement à Ancre Suisse</span>
          </Link>

          <Link
            href="/theorie/remontage"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Module 06 : Remontage &amp; Mécanisme de Tirette</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
