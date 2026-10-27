"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingDown,
  ThermometerSun,
  ShieldCheck,
  Cpu,
  Flame,
  Compass,
  ArrowRight,
  RotateCcw,
  Wrench,
  Sparkles,
  Scale
} from "lucide-react";

// --- DONNÉES TECHNIQUES OFFICIELLES DES MATÉRIAUX HORLOGERS ---
interface MaterialData {
  id: string;
  name: string;
  fullName: string;
  composition: string;
  dilatationCoeff: number; // en 10^-6 / K
  dilatationStr: string;
  density: number; // g/cm³
  hardness: string;
  stiffness: string;
  machinability: string;
  corrosionResistance: string;
  usageManufacture: string;
  colorHex: string;
  badgeBg: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}

const MATERIALS: MaterialData[] = [
  {
    id: "laiton",
    name: "Laiton Horloger",
    fullName: "CuZn39Pb2 (CW612N / MS 58)",
    composition: "Cuivre 59%, Zinc 39%, Plomb 2%",
    dilatationCoeff: 18.0,
    dilatationStr: "18.0 × 10⁻⁶ / °C",
    density: 8.47,
    hardness: "140 - 170 HV",
    stiffness: "105 GPa (Module d'Young)",
    machinability: "Excellente (copeau court grâce au plomb)",
    corrosionResistance: "Moyenne (nécessite dorage ou rhodiage)",
    usageManufacture: "Standard universel ETA, Sellita, calibres historiques",
    colorHex: "#E2B44F",
    badgeBg: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-400/40",
    description: "Le métal de référence historique de l'établi suisse. Facile à usiner au burin ou à la fraiseuse CNC, mais sujet à une dilatation thermique significative.",
    advantages: [
      "Usinabilité idéale sans échauffement excessif",
      "Excellent amortissement acoustique des chocs",
      "Revêtement galvanique aisé (rhodiage, dorage, nickelage)",
      "Coût matière très maîtrisé"
    ],
    disadvantages: [
      "Dilatation thermique la plus forte des métaux horlogers",
      "Nécessite impérativement un recuit de détente après usinage",
      "Tendance à l'oxydation si le traitement de surface est ébréché"
    ]
  },
  {
    id: "maillechort",
    name: "Maillechort (German Silver)",
    fullName: "CuNi18Zn20 (Argenon / Alpacca)",
    composition: "Cuivre 62%, Nickel 18%, Zinc 20%",
    dilatationCoeff: 16.0,
    dilatationStr: "16.0 × 10⁻⁶ / °C",
    density: 8.75,
    hardness: "160 - 200 HV",
    stiffness: "125 GPa",
    machinability: "Très bonne (exige des outils carbure affûtés)",
    corrosionResistance: "Excellente (formation d'une patine protectrice)",
    usageManufacture: "Haute Horlogerie : A. Lange & Söhne, Patek Philippe, Vacheron Constantin",
    colorHex: "#94A3B8",
    badgeBg: "bg-slate-500/15 text-slate-800 dark:text-slate-300 border-slate-400/40",
    description: "Le choix des grands cabinotiers. Alliage austénitaire noble sans plomb, offrant une patine dorée naturelle chaleureuse et une rigidité géométrique supérieure au laiton.",
    advantages: [
      "Rigidité supérieure (+20% par rapport au laiton)",
      "Excellente stabilité dimensionnelle après stabilisation naturelle",
      "Aucun revêtement de surface requis (ne s'oxyde pas, se patine)",
      "Finition perlée et Côtes de Genève d'une netteté incomparable"
    ],
    disadvantages: [
      "Coût matière 3 à 4 fois plus élevé que le laiton",
      "Sensible aux traces de doigts lors de l'assemblage (acide lactique)",
      "Usinage plus exigeant pour la durée de vie des fraises"
    ]
  },
  {
    id: "titane",
    name: "Titane Grade 5",
    fullName: "Ti-6Al-4V (Norme ISO 5832-3)",
    composition: "Titane 90%, Aluminium 6%, Vanadium 4%",
    dilatationCoeff: 8.6,
    dilatationStr: "8.6 × 10⁻⁶ / °C",
    density: 4.43,
    hardness: "320 - 360 HV",
    stiffness: "114 GPa",
    machinability: "Complexe (vibrations, échauffement, lubrification HP)",
    corrosionResistance: "Totale (couche passive de TiO2)",
    usageManufacture: "Montres de sport extrême, Richard Mille, Urwerk, F.P. Journe",
    colorHex: "#38BDF8",
    badgeBg: "bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-400/40",
    description: "Alliage aérospatial ultra-léger et amagnétique. Deux fois moins dilatable que le laiton, il garantit la parfaite tenue des paliers dans les environnements extrêmes.",
    advantages: [
      "Dilatation thermique réduite de plus de 50% vs laiton",
      "Masse volumique divisée par deux (montre ultra-légère)",
      "Totalement insensible aux champs magnétiques et à la sueur",
      "Résistance mécanique et élasticité exceptionnelles"
    ],
    disadvantages: [
      "Usinage extrêmement difficile (mauvais conducteur thermique)",
      "Risque d'usure prématurée des outils de coupe à l'établi",
      "Chassage des pierres de rubis exigeant un contrôle rigoureux du serrage"
    ]
  },
  {
    id: "silicium",
    name: "Silicium Monocristallin",
    fullName: "Si <100> (DRIE / MEMS Technology)",
    composition: "Silicium pur monocristallin à 99.999%",
    dilatationCoeff: 2.6,
    dilatationStr: "2.6 × 10⁻⁶ / °C",
    density: 2.33,
    hardness: "1100 HV (Très dur)",
    stiffness: "165 GPa",
    machinability: "Gravure plasma DRIE (aucun usinage mécanique possible)",
    corrosionResistance: "Absolue (inaltérable)",
    usageManufacture: "Organes réglants, platines squelettes expérimentales (Ulysse Nardin, Breguet)",
    colorHex: "#A855F7",
    badgeBg: "bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-400/40",
    description: "Le matériau révolutionnaire du XXIe siècle horloger. Dilatation quasiment nulle, coefficient de frottement ultra-bas sans aucune goutte d'huile, mais fragile au choc ponctuel.",
    advantages: [
      "Dilatation thermique 7 fois inférieure au laiton",
      "Parfaite insensibilité aux champs magnétiques",
      "Géométrie micrométrique au 1/10e de micron (±0.1 µm)",
      "Aucune contrainte interne résiduelle d'usinage"
    ],
    disadvantages: [
      "Fragilité absolue en flexion : casse nette sans déformation plastique",
      "Impossibilité totale de retouche à l'établi horloger",
      "Coût de production par photolithographie en salle blanche"
    ]
  }
];

// --- FACTEURS PERTURBATEURS D'ATELIER ---
const FACTORS = [
  {
    id: "temperature",
    icon: "🌡️",
    name: "Dilatation Thermique Différentielle",
    subtitle: "Plage d'usage normal : -10°C à +60°C",
    severity: "Critique (±5 à 10 s/j)",
    desc: "Le calibre s'élargit ou rétrécit selon le coefficient alpha de sa platine. Si la platine se dilate plus vite que les axes en acier, l'entraxe des mobiles augmente, détériorant le profil d'engrènement.",
    solution: "Choix de matériaux à bas alpha (maillechort, titane) ou compensation géométrique des ponts."
  },
  {
    id: "stress",
    icon: "⚡",
    name: "Contraintes Internes Résiduelles d'Usinage",
    subtitle: "Tensions après fraisage CNC et perçage",
    severity: "Majeure (Déformation différée)",
    desc: "L'arrachement de matière lors de l'ébauchage crée des nappes de contraintes dans le réseau cristallin. Sans détente, la platine se gauchit de 5 à 15 µm au cours des 6 mois suivants.",
    solution: "Recuit de détente thermique obligatoire (220°C - 240°C pendant 3 heures sous atmosphère inerte)."
  },
  {
    id: "aging",
    icon: "⏳",
    name: "Vieillissement & Relaxation Métallurgique",
    subtitle: "Stabilité sur 10 à 50 ans de battement",
    severity: "Modérée à Long Terme",
    desc: "La migration progressive des atomes et la relaxation des dislocations modifient imperceptiblement la planéité des portées de ponts et le centrage des piliers.",
    solution: "Cycles de vieillissement artificiel accéléré ou repos de 6 à 12 mois en cave climatisée."
  },
  {
    id: "humidity",
    icon: "💧",
    name: "Hygrométrie & Oxydation Intergranulaire",
    subtitle: "Atmosphère d'atelier : 40% à 60% HR",
    severity: "Moyenne",
    desc: "Bien que les métaux n'absorbent pas l'eau comme les polymères, l'humidité attaque les joints de grains du laiton non protégé, provoquant un micro-gonflement d'oxydation.",
    solution: "Galvanoplastie protectrice de 3 à 5 µm (rhodiage, dorage fin ou passivation)."
  },
  {
    id: "shock",
    icon: "💥",
    name: "Chocs Mécaniques & Flexion de Platine",
    subtitle: "Norme NIHS 91-10 (Choc 5'000 G)",
    severity: "Critique Ponctuelle",
    desc: "Un impact violent contre le boîtier fléchit instantanément la platine. Si la limite élastique Rp0.2 est dépassée, la déformation devient permanente et bloque le rouage.",
    solution: "Épaississement nervuré des ponts critiques et rigidité accrue de la platine principale."
  }
];

// --- QUESTIONS DU QUIZ D'EXAMEN HORLOGER ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Quelle conséquence directe entraîne une dérive d'entraxe de seulement +0.010 mm (+10 µm) sur le rouage de minuterie ?",
    options: [
      "Aucun impact, le jeu d'engrènement tolère jusqu'à 0.050 mm de battement.",
      "Une augmentation des frottements de 15 à 30% et une chute critique de l'amplitude du balancier.",
      "L'arrêt instantané et définitif du balancier par rupture de cheville de plateau.",
      "Une augmentation spontanée de la réserve de marche du barillet."
    ],
    correct: 1,
    explanation: "En horlogerie fine, une dérive de 10 µm décale le cercle primitif des engrenages. Les dents travaillent sur leurs pointes ou se coincent au fond de creux, générant 15 à 30% de perte de couple transmis à l'échappement."
  },
  {
    id: 2,
    question: "Quel matériau présente le coefficient de dilatation thermique le plus faible parmi les fournitures d'atelier ?",
    options: [
      "Le Laiton horloger CuZn39Pb2 (18.0 × 10⁻⁶ / °C)",
      "Le Maillechort CuNi18Zn20 (16.0 × 10⁻⁶ / °C)",
      "Le Titane Grade 5 Ti-6Al-4V (8.6 × 10⁻⁶ / °C)",
      "Le Silicium monocristallin Si (2.6 × 10⁻⁶ / °C)"
    ],
    correct: 3,
    explanation: "Le silicium monocristallin possède un coefficient alpha de seulement 2.6 × 10⁻⁶ / °C, soit 7 fois inférieur à celui du laiton, assurant une invariance géométrique quasi-parfaite face aux écarts de température."
  },
  {
    id: 3,
    question: "Pourquoi les prestigieuses manufactures genevoises stockent-elles leurs platines usinées 6 à 12 mois avant assemblage ?",
    options: [
      "Pour permettre la relaxation naturelle des contraintes internes d'usinage et figer les cotes.",
      "Pour attendre la fin du délai légal de certification du Poinçon de Genève.",
      "Pour favoriser l'oxydation superficielle indispensable à la tenue de l'huile Moebius.",
      "Pour tester la résistance des platines à la poussière d'atelier."
    ],
    correct: 0,
    explanation: "Même après recuit de détente, un métal usiné subit une micro-relaxation cristalline. Le stockage prolongé en milieu tempéré (21°C) stabilise définitivement les dimensions avant le dernier perçage de finition."
  },
  {
    id: 4,
    question: "Quel traitement thermique normalisé permet d'éliminer jusqu'à 85% des tensions internes nées de l'usinage ?",
    options: [
      "La trempe martensitique à 820°C suivie d'un refroidissement à l'huile.",
      "Le recuit de détente à 220°C - 240°C avec palier de 2 à 4 heures sous gaz inerte.",
      "La cémentation superficielle au carbone sous vide.",
      "Le revenu d'adoucissement à la flamme du chalumeau d'établi."
    ],
    correct: 1,
    explanation: "Le recuit de détente (Stress Relief) chauffe le laiton ou maillechort sans modifier sa dureté fondamentale, tout en permettant aux dislocations cristallines de se réordonner sans déformation."
  }
];

export default function StabiliteDimensionnellePage() {
  const gradientId = useId();
  // Simulateur Interactif de Dilatation Thermique
  const [temperature, setTemperature] = useState<number>(20); // °C (référence à 20°C)
  const [selectedMatId, setSelectedMatId] = useState<string>("laiton");
  const [activeFactorId, setActiveFactorId] = useState<string>("temperature");

  // Quiz compact stepper
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  // Matériau actif
  const currentMaterial = MATERIALS.find((m) => m.id === selectedMatId) || MATERIALS[0];
  const activeFactor = FACTORS.find((f) => f.id === activeFactorId) || FACTORS[0];

  // Calcul physique de la dilatation d'entraxe :
  // Entraxe nominal L0 = 8.400 mm (ex: Roue de centre à Roue moyenne)
  const L0_MM = 8.4;
  const deltaT = temperature - 20; // écart par rapport à la température normalisée NIHS de 20°C
  // Delta L en mm = L0 * alpha * deltaT
  const deltaL_mm = L0_MM * (currentMaterial.dilatationCoeff * 1e-6) * deltaT;
  const deltaL_um = deltaL_mm * 1000; // en micromètres (µm)
  const currentEntraxe_mm = L0_MM + deltaL_mm;

  // Statut de tolérance horlogère (Tolérance standard NIHS sur entraxe : ± 3 µm)
  const isWithinTolerance = Math.abs(deltaL_um) <= 3.0;
  const isWarningTolerance = Math.abs(deltaL_um) > 3.0 && Math.abs(deltaL_um) <= 6.0;

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
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Stabilité Dimensionnelle</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              🇨🇭 Normes Fédérales NIHS 03-01 &amp; ISO 286 · Tolérances d&apos;Établi
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Métrologie de Précision &amp; Dilatation des Calibres
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            La Stabilité Dimensionnelle <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 bg-clip-text text-transparent">
              des Platines &amp; des Ponts
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Dans un mouvement mécanique suisse, les ébats et hauteurs de pénétration des engrenages se mesurent au <strong className="text-slate-900 dark:text-white font-semibold">micron près (0.001 mm)</strong>. Découvrez comment la maîtrise des coefficients thermiques, des tensions d&apos;usinage et des recuits de détente garantit l&apos;isochronisme officiel COSC.
          </p>

          {/* 4 Indicateurs Clés Métrologiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Tolérance Paliers</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">± 2 µm</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Norme ISO 286-JS2</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Plage d&apos;Épreuve</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">-10°C / +60°C</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Contrôle COSC / NIHS</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Métal de Référence</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Maillechort</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 mt-0.5">CuNi18Zn20 Sans Plomb</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Recuit de Détente</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">240°C · 3h</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-0.5">-85% de contraintes</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION VEDETTE 1 : LE BANC DE DILATATION THERMIQUE & DÉRIVE D'ENTRAXE   */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-amber-500/40 bg-white dark:bg-[#0D121F] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🔬 Simulateur Visuel d&apos;Atelier · Mesure &amp; Déformation Vectorielle
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Banc d&apos;Essai : Dérive d&apos;Entraxe de Palier selon la Température
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <span>Écart Thermique :</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                ΔT = {deltaT > 0 ? `+${deltaT}` : deltaT}°C
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* CONTRÔLES DU SIMULATEUR (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Sélecteur de Matériau */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>1. Choix du Matériau de la Platine :</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{currentMaterial.dilatationStr}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MATERIALS.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMatId(mat.id)}
                      className={`p-3 rounded-xl text-left border-2 transition-all font-mono text-xs flex flex-col justify-between gap-1 ${
                        selectedMatId === mat.id
                          ? "bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white shadow-sm ring-1 ring-amber-500/20 font-bold"
                          : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <span className="font-semibold">{mat.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{mat.composition.split(",")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider de Température */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-bold">
                    <ThermometerSun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Température d&apos;Épreuve :
                  </span>
                  <span className="text-base font-bold text-amber-700 dark:text-amber-400">
                    {temperature}°C
                  </span>
                </div>

                <input
                  type="range"
                  min="-10"
                  max="60"
                  step="1"
                  value={temperature}
                  aria-label="Température d'épreuve en degrés Celsius"
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>-10°C (Froid Hiver)</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">20°C (Atelier NIHS)</span>
                  <span>+60°C (Chaleur Extrême)</span>
                </div>
              </div>

              {/* Télémétrie en temps réel */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Entraxe Nominal (L₀) :</span>
                  <span className="font-bold text-slate-900 dark:text-white">8.4000 mm</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Dérive Linéaire (ΔE) :</span>
                  <span className={`font-bold ${deltaL_um === 0 ? "text-emerald-700 dark:text-emerald-400" : deltaL_um > 0 ? "text-amber-700 dark:text-amber-400" : "text-sky-700 dark:text-sky-400"}`}>
                    {deltaL_um > 0 ? `+${deltaL_um.toFixed(2)}` : deltaL_um.toFixed(2)} µm ({deltaL_mm > 0 ? `+${deltaL_mm.toFixed(4)}` : deltaL_mm.toFixed(4)} mm)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Entraxe Réel Résultant :</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {currentEntraxe_mm.toFixed(4)} mm
                  </span>
                </div>

                {/* Badge d'Avis Horloger */}
                <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                  isWithinTolerance
                    ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                    : isWarningTolerance
                    ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                    : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30"
                }`}>
                  {isWithinTolerance ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Conforme Norme NIHS : profil d&apos;engrènement optimal sans frottement.</span>
                    </>
                  ) : isWarningTolerance ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Avertissement : décalage de pénétration des dents, perte de couple mesurable.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Critique : risque de grippage des mobiles ou d&apos;égrènement sur les pointes !</span>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* DESSIN TECHNIQUE VECTORIEL SVG HAUTE PRÉCISION (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold">VUE PLAN CAD : CHÂSSIS DE PLATINE &amp; MOBILES</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Échelle de déformation grossie ×200</span>
              </div>

              <div className="w-full overflow-hidden flex items-center justify-center py-2">
                <svg viewBox="0 0 540 300" className="w-full h-auto select-none font-mono">
                  <defs>
                    <pattern id="perlage" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" className="text-slate-300/40 dark:text-slate-800/60" strokeWidth="0.8" />
                    </pattern>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E2B44F" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Surface de la platine avec perlage traditionnel */}
                  <rect x="20" y="20" width="500" height="260" rx="16" className="fill-white dark:fill-[#0c121e] stroke-slate-300 dark:stroke-slate-800" strokeWidth="2" />
                  <rect x="25" y="25" width="490" height="250" rx="12" fill="url(#perlage)" />

                  {/* Axe de référence central */}
                  <line x1="80" y1="150" x2="460" y2="150" className="stroke-slate-300 dark:stroke-slate-800" strokeDasharray="4 4" strokeWidth="1.5" />

                  {/* PALIER 1 (FIXE) : ROUE DE CENTRE */}
                  <g transform="translate(140, 150)">
                    {/* Chaton laiton / or */}
                    <circle cx="0" cy="0" r="46" className="fill-amber-500/10 stroke-amber-500/50" strokeWidth="1.5" />
                    {/* Roue dentée dorée (fond) */}
                    <circle cx="0" cy="0" r="62" fill="none" stroke="#E2B44F" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Pierre de rubis synthétique (corindon rouge) */}
                    <circle cx="0" cy="0" r="28" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                    <circle cx="0" cy="0" r="16" fill="#881337" opacity="0.6" />
                    {/* Trou d'huilier & pivot acier */}
                    <circle cx="0" cy="0" r="7" className="fill-slate-100 dark:fill-slate-200 stroke-slate-700" strokeWidth="1.5" />
                    
                    <text x="0" y="85" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="11" textAnchor="middle">Palier 1 : Roue Centre</text>
                    <text x="0" y="99" className="fill-slate-500 dark:text-slate-400" fontSize="9" textAnchor="middle">Position fixe 0.000 mm</text>
                  </g>

                  {/* COTE D'ENTRAXE AVEC DÉRIVE VISUELLE */}
                  {/* Position du Palier 2 déplacé dynamiquement (amplifier le déplacement de deltaL_um * 3 pour le rendu visuel) */}
                  <g transform={`translate(${380 + Math.min(Math.max(deltaL_um * 4.5, -35), 35)}, 150)`}>
                    {/* Chaton laiton / or */}
                    <circle cx="0" cy="0" r="40" className="fill-sky-500/10 stroke-sky-500/50" strokeWidth="1.5" />
                    {/* Roue dentée menée */}
                    <circle cx="0" cy="0" r="54" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Rubis */}
                    <circle cx="0" cy="0" r="24" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                    <circle cx="0" cy="0" r="13" fill="#881337" opacity="0.6" />
                    {/* Trou d'huilier & pivot */}
                    <circle cx="0" cy="0" r="6" className="fill-slate-100 dark:fill-slate-200 stroke-slate-700" strokeWidth="1.5" />

                    <text x="0" y="80" className="fill-slate-800 dark:fill-slate-200 font-bold" fontSize="11" textAnchor="middle">Palier 2 : Roue Moyenne</text>
                    <text x="0" y="94" className="fill-amber-700 dark:fill-amber-400 font-bold" fontSize="9" textAnchor="middle">
                      {deltaL_um >= 0 ? `+${deltaL_um.toFixed(1)} µm` : `${deltaL_um.toFixed(1)} µm`}
                    </text>
                  </g>

                  {/* LIGNE DE COTE MICROMÉTRIQUE */}
                  <g transform="translate(0, 50)">
                    <line x1="140" y1="0" x2="140" y2="25" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
                    <line x1={380 + Math.min(Math.max(deltaL_um * 4.5, -35), 35)} y1="0" x2={380 + Math.min(Math.max(deltaL_um * 4.5, -35), 35)} y2="25" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
                    
                    <line x1="140" y1="12" x2={380 + Math.min(Math.max(deltaL_um * 4.5, -35), 35)} y2="12" stroke="#E2B44F" strokeWidth="2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                    
                    {/* Badge de cote en millimètres */}
                    <rect x="210" y="0" width="100" height="24" rx="6" className="fill-slate-900 text-white" />
                    <text x="260" y="16" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">
                      E = {currentEntraxe_mm.toFixed(3)} mm
                    </text>
                  </g>

                  {/* Repère de pénétration des dentures */}
                  <g transform="translate(255, 175)">
                    <rect x="-60" y="0" width="120" height="28" rx="6" className="fill-slate-800/90 text-white" />
                    <text x="0" y="14" fill="#93C5FD" fontSize="9" textAnchor="middle">Jeu de denture :</text>
                    <text x="0" y="24" fill={isWithinTolerance ? "#4ADE80" : "#F87171"} fontSize="9" fontWeight="bold" textAnchor="middle">
                      {isWithinTolerance ? "1/3 de hauteur (Idéal)" : deltaL_um > 0 ? "Pénétration faible (<1/4)" : "Pincement de fond (>1/2)"}
                    </text>
                  </g>
                </svg>
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <span>Règle d&apos;Établi : Laiton ΔL = 0.015 mm / 100 mm / 10°C</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Norme NIHS 03-01</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2 : LES 5 FACTEURS PERTURBATEURS D'ATELIER (CARTES DYNAMIQUES)    */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ⚡ Physique Micro-Mécanique &amp; Contraintes d&apos;Établi
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Les 5 Facteurs Altérant la Géométrie du Calibre
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Cliquez sur un phénomène pour l&apos;examiner</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {FACTORS.map((fac) => (
              <button
                key={fac.id}
                onClick={() => setActiveFactorId(fac.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-3 ${
                  activeFactorId === fac.id
                    ? "bg-amber-500/10 border-amber-500 dark:border-amber-400 shadow-lg ring-1 ring-amber-500/20"
                    : "bg-white dark:bg-[#0D121F] border-slate-200 dark:border-slate-800 hover:border-amber-400/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{fac.icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    {fac.severity.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {fac.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {fac.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* DÉTAIL TECHNIQUE DU FACTEUR SÉLECTIONNÉ */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-amber-500/30 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeFactor.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    {activeFactor.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold">
                    Impact Horloger : {activeFactor.severity}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {activeFactor.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Mécanisme d&apos;Altération &amp; Conséquence sur la Marche :
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  {activeFactor.desc}
                </p>
              </div>
              <div className="md:col-span-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Solution &amp; Traitement d&apos;Atelier :
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeFactor.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 : TABLEAU COMPARATIF DES MATÉRIAUX HORLOGERS                   */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                📊 Métallurgie Comparée · Normes de Manufacture
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Comparatif des 4 Matériaux de Platines &amp; Ponts
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Valeurs normalisées à 20°C</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D121F] shadow-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 font-mono text-slate-600 dark:text-slate-400">
                  <th className="p-4">Matériau Horloger</th>
                  <th className="p-4 text-amber-700 dark:text-amber-400">Alpha Dilatation (10⁻⁶/K)</th>
                  <th className="p-4">Masse Volumique (g/cm³)</th>
                  <th className="p-4">Dureté Vickers</th>
                  <th className="p-4">Module d&apos;Young</th>
                  <th className="p-4">Stabilité Dimensionnelle</th>
                  <th className="p-4">Usage Établi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                {MATERIALS.map((mat) => (
                  <tr key={mat.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.colorHex }} />
                        <span>{mat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-normal">{mat.fullName}</span>
                    </td>
                    <td className="p-4 text-amber-700 dark:text-amber-400 font-bold text-sm">
                      {mat.dilatationCoeff.toFixed(1)}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{mat.density.toFixed(2)}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{mat.hardness}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{mat.stiffness}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${mat.badgeBg}`}>
                        {mat.id === "silicium" ? "Exceptionnelle" : mat.id === "titane" ? "Très Haute" : mat.id === "maillechort" ? "Haute (Idéale)" : "Moyenne"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 font-sans text-xs">
                      {mat.usageManufacture.split(":")[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 : SECRETS D'ATELIER & PROTOCOLES DE RECUIT                     */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Le Recuit de Détente (Stress Relief)
                </h3>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400">Protocole Officiel de Traitement Thermique</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              L&apos;usinage de la platine (poches de barillet, puits de pierres, taraudages) emprisonne de violentes tensions internes au niveau des grains de cuivre-zinc. Si la platine est assemblée telle quelle, elle se gauchira de plusieurs microns au fil des mois, coinçant le balancier.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>1. Montée en température :</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">5°C / min jusqu&apos;à 240°C</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>2. Palier isotherme :</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">2 à 3 heures (four sous argon)</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>3. Refroidissement lent :</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">Descente au four (&lt; 2°C/min)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Contrôle Tridimensionnel &amp; MMT
                </h3>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Palpage Optique &amp; Contact au 1/10e de µm</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Après le recuit et la période de stabilisation naturelle (6 mois en armoire thermo-régulée à 21°C), chaque platine de manufacture passe sur une Machine à Mesurer Tridimensionnelle (MMT Leitz ou Zeiss).
            </p>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Planéité des portées :</strong> Tolérance inférieure à 0.001 mm (1 µm).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Coaxialité des paliers :</strong> Alignement strict entre platine et pont de rouage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Perpendicularité des piliers :</strong> Évite toute inclinaison des axes sous serrage.</span>
              </li>
            </ul>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 5 : LE QUIZ D'ÉTABLI COMPACT (MODE STEPPER RAFFINÉ)               */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-amber-500/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🎓 Évaluation d&apos;Établi · Questions Clés de Métrologie
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Quiz Express : Maîtrise de la Stabilité Dimensionnelle
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

              {/* 4 Options en boutons radio luxe */}
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
                  Bilan du Contrôle Métrologique
                </h3>
                <p className="text-sm font-mono text-amber-700 dark:text-amber-400 font-bold">
                  Score Final : {userScore} / {QUIZ_QUESTIONS.length} ({Math.round((userScore / QUIZ_QUESTIONS.length) * 100)}%)
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {userScore === QUIZ_QUESTIONS.length
                  ? "Excellente maîtrise ! Vous comprenez parfaitement les enjeux de dilatation et les impératifs de recuit de détente à l'établi."
                  : "Bonnes notions. Relisez la fiche matière et les protocoles de recuit pour parfaire vos connaissances d'atelier."}
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
        {/* SECTION 6 : QUESTIONS FRÉQUENTES DE L'ÉTABLI (ACCORDÉON RAFFINÉ)        */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              💬 Pratique d&apos;Atelier &amp; Savoir-Faire
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Foire Aux Questions de l&apos;Artisan Horloger
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Pourquoi un serrage excessif des vis de pont détruit-il la stabilité dimensionnelle ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Serrer une vis de pont au-delà de son couple normalisé (généralement 1.5 à 2.5 cNm) provoque un écrasement plastique du laiton sous la tête de vis. La platine se voile localement de 2 à 4 µm, modifiant l&apos;assiette du rubis et provoquant le frottement du pivot contre la creusure huilière.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Comment diagnostiquer une déformation de platine lors d&apos;un rhabillage complet ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Montez uniquement le rouage avec son pont, sans ancre ni barillet. Lancez les mobiles d&apos;un coup de soufflette léger : le rouage doit tourner librement et effectuer un net retour arrière (recul d&apos;échappement). S&apos;il s&apos;arrête brutalement sans recul, un entraxe est pincé par gauchissement de la platine.
              </p>
            </details>

            <details className="group rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <summary className="font-serif font-bold text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Le rhodiage d&apos;une platine modifie-t-il ses cotes micrométriques ?</span>
                <span className="text-amber-500 font-mono transition-transform group-open:rotate-90">→</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pt-3 border-t border-slate-100 dark:border-slate-800">
                Oui. Un dépôt électrolytique de nickel puis de rhodium dépose entre 2 et 4 µm de matière sur chaque paroi. C&apos;est pourquoi les trous de chassage des pierres de rubis et les passages de piliers sont soit masqués à la laque épargne, soit alésés à l&apos;équarrissoir après traitement galvanique.
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
