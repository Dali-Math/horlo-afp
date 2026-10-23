"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Activity,
  Layers,
  Info,
  BookOpen,
  Sparkles,
  Sliders,
  ShieldCheck,
  Award,
  Target,
  ChevronRight,
  RefreshCw,
  Droplet,
  Compass,
  Gauge,
  SlidersHorizontal,
  Flame,
  Search,
  Check,
  AlertTriangle
} from "lucide-react";

interface ServiceStep {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyTools: string;
  criticalSecurity: string;
}

const SERVICE_STEPS: ServiceStep[] = [
  {
    id: 1,
    number: "01",
    title: "Diagnostic & Contrôles Initiaux",
    subtitle: "Évaluation chronométrique et visuelle à la réception",
    description: "Observation sous loupe binoculaire de l'état esthétique (carrure, glace, cadran, aiguilles). Mesure des paramètres de marche sur chronocomparateur dans les 5 positions : marche diurne (s/jour), amplitude (°), repère (ms). Vérification du passage de la date et de la réserve de marche résiduelle.",
    keyTools: "Chronocomparateur Witschi, loupe d'horloger 2.5x à 10x, brucelles n°3 antimagnétiques",
    criticalSecurity: "Toujours noter les défauts cosmétiques préexistants et mesurer l'amplitude avant ouverture."
  },
  {
    id: 2,
    number: "02",
    title: "Déshabillage & Dépose des Aiguilles",
    subtitle: "Séparation sécurisée du mouvement et du boîtier",
    description: "Dépose du bracelet et ouverture du fond (vissé, à vis ou clipsé). Extraction de la tige de remontoir par appui modéré sur le plot de tirette. Sortie du mouvement de sa boîte. Pose d'un film plastique protecteur (plioir) sur le cadran et extraction des aiguilles avec les leviers aux aiguilles (Presto). Déverrouillage des pieds de cadran.",
    keyTools: "Ouvre-boîte à potence, lève-aiguilles Presto, protège-cadran, porte-mouvement synthétique",
    criticalSecurity: "Ne jamais toucher directement la surface du cadran ou des aiguilles avec des outils métalliques."
  },
  {
    id: 3,
    number: "03",
    title: "Désarmage & Démontage Intégral",
    subtitle: "Débiselage méthodique et contrôle d'usure des mobiles",
    description: "DÉSARMAGE IMPÉRATIF DU BARILLET : maintien de la couronne et soulèvement du cliquet pour détendre le ressort sans choc. Dépose en premier lieu du balancier-spiral et de l'ancre (organes sensibles rangés sous cloche). Démontage du module automatique, du rouage de finissage et du mécanisme de remontoir.",
    keyTools: "Tournevis d'horloger affûtés (0.80 à 1.40 mm), pige de désarmage, boîte à compartiments avec cloche",
    criticalSecurity: "DÉSARMAGE DU RESSORT OBLIGATOIRE : tout démontage sous tension pulvérise les pivots d'échappement !"
  },
  {
    id: 4,
    number: "04",
    title: "Lavage Chimique & Épilamage",
    subtitle: "Cycle 4 bains en machine et protection oléophobe",
    description: "Les composants sont répartis dans des paniers compartimentés selon leur calibre. Cycle de lavage automatique : Bain 1 détergent/dégraissant (solvant sans eau ou ammoniacal), Bains 2 & 3 de rinçage ultra-pur, Bain 4 séchage à air chaud régulé (50°C). ÉPILAMAGE au Fixodrop ES/BS des palettes d'ancre, de la roue d'échappement et des roues inverseuses.",
    keyTools: "Machine à laver horlogère (Elma / Greiner), paniers inox à micromaille, solution Fixodrop Moebius",
    criticalSecurity: "L'épilame abaisse l'énergie de surface : il est capital pour empêcher l'étalement capillaire de l'huile."
  },
  {
    id: 5,
    number: "05",
    title: "Remontage & Lubrification Scientifique",
    subtitle: "Application micrométrique de la charte Moebius",
    description: "Remontage pièce par pièce dans l'ordre rigoureusement inverse. Lubrification différentielle sélective : graisse thixotropique Moebius 9415 sur les palettes d'ancre, huile fluide 9010 sur les pivots rapides et contre-pivots Incabloc (goutte calibrée à 50-60%), huile épaisse HP 1300 sur le barillet et le centre, graisse 9504 sur le remontoir.",
    keyTools: "Pique-huiles calibrés (noir, bleu, vert, rouge), huiliers en agate avec couvercle, loupe 10x",
    criticalSecurity: "Un excès d'huile est aussi destructeur qu'un manque d'huile (pollution du spiral et collage)."
  },
  {
    id: 6,
    number: "06",
    title: "Achevage & Réglage Chronométrique",
    subtitle: "Mise au repère, isochronisme et marche 5 positions",
    description: "Remontage du balancier-spiral. Démagnétisation complète du mouvement. Contrôle instantané sur chronocomparateur : mise au repère en tournant le porte-piton (beat error < 0.3 ms), puis réglage de la marche diurne (0 à +5 s/jour) par la raquette ou les masselottes d'inertie. Mesure de l'amplitude (270° à 315° à plat, > 220° pendu).",
    keyTools: "Chronocomparateur Witschi Chronoscope, démagnétiseur électronique Greiner, clé de raquette",
    criticalSecurity: "Ne jamais manipuler la raquette ou le porte-piton avec une force excessive pour ne pas déformer le spiral."
  },
  {
    id: 7,
    number: "07",
    title: "Habillage, Emboîtage & Tests d'Étanchéité",
    subtitle: "Contrôle selon normes NIHS 92-20 & ISO 22810",
    description: "Nettoyage ultrasons de la boîte et du bracelet, suivi d'un avivage satiné/poli si requis. Remplacement systématique de tous les joints d'étanchéité (glace, fond, couronne, poussoirs) avec graisse Fomblin. Pose du cadran et chassage des aiguilles d'équerre à minuit pile. Tests d'étanchéité sous vide (-0.5 bar), sous pression d'air (+10 bar) et test de condensation.",
    keyTools: "Potence à chasser les aiguilles, poire soufflante dépoussiérante, appareil d'étanchéité à sec Witschi",
    criticalSecurity: "Le test de condensation à 45°C avec goutte froide confirme l'absence totale d'humidité interne résiduelle."
  }
];

interface LubricantInfo {
  name: string;
  type: string;
  viscosity: string;
  usageLocation: string;
  description: string;
  colorCode: string;
}

const LUBRICANTS_LIST: LubricantInfo[] = [
  {
    name: "Moebius 9010",
    type: "Huile synthétique fine",
    viscosity: "~150 cSt à 20°C",
    usageLocation: "Pivots de roue de seconde, d'échappement, balancier (Incabloc / Kif)",
    description: "Fluide et très stable dans le temps. Réduit au minimum les pertes par frottement sur les mobiles rapides à très faible couple disponible.",
    colorCode: "#3B82F6"
  },
  {
    name: "Moebius HP 1300",
    type: "Huile haute pression",
    viscosity: "~1250 cSt à 20°C",
    usageLocation: "Arbre de barillet, tige de centre, mobile de moyenne, roue de couronne",
    description: "Très forte viscosité et haute résistance au film d'huile sous pressions de contact sévères. Ne s'évapore pas et ne fuit pas.",
    colorCode: "#D97706"
  },
  {
    name: "Moebius 9415",
    type: "Graisse thixotropique d'échappement",
    viscosity: "Thixotropique (semi-fluide sous cisaillement)",
    usageLocation: "Plans d'impulsion des palettes d'ancre (entrée et sortie)",
    description: "Reste rigoureusement figée au repos sur le plan de la palette. Sous le choc dynamique de la dent de roue (cisaillement), elle se liquéfie instantanément pour éliminer le frottement.",
    colorCode: "#10B981"
  },
  {
    name: "Moebius 9504",
    type: "Graisse synthétique haute pression",
    viscosity: "Graisse molle onctueuse",
    usageLocation: "Carré de tige, denture Breguet, gorge de pignon coulant, bascule, crans de sautoir",
    description: "Contient des additifs anti-usure pour les contacts acier/acier sous sollicitations répétées d'armage et de mise à l'heure.",
    colorCode: "#8B5CF6"
  },
  {
    name: "Klüber P125 / Moebius 8200",
    type: "Graisse de ressort de barillet",
    viscosity: "Graisse d'adhérence pour paroi de tambour",
    usageLocation: "Paroi intérieure du tambour de barillet automatique (bride glissante)",
    description: "Calibre le couple de glissement de la bride glissante (~800 à 1200 g · mm) pour éviter le blocage ou le glissement prématuré.",
    colorCode: "#EC4899"
  },
  {
    name: "Fixodrop ES/BS",
    type: "Agent d'épilamage fluoré",
    viscosity: "Liquide volatil (film nanométrique)",
    usageLocation: "Palettes d'ancre, roue d'échappement, roues inverseuses",
    description: "Modifie l'énergie superficielle des composants. Rend la surface oléophobe pour interdire la propagation de l'huile hors des zones de frottement.",
    colorCode: "#06B6D4"
  }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "1. Pourquoi le désarmage complet du barillet est-il une étape de sécurité absolue avant le démontage du mouvement ?",
    options: [
      "Pour éviter d'aimanter le spiral lors du contact avec les brucelles",
      "Car l'énergie emmagasinée dans le ressort ferait tourner le rouage à folle vitesse, brisant les pivots et palettes d'ancre",
      "Pour permettre aux solvants de nettoyage de pénétrer à l'intérieur du tambour sans le démonter",
      "Parce que la convention collective interdit le démontage d'un ressort sous tension"
    ],
    correctAnswer: 1,
    explanation: "Désarmer le barillet est la règle numéro un de sécurité. Si l'on dépose le pont d'ancre ou de rouage alors que le ressort est armé, l'énergie se libère d'un coup en faisant tourner le train de rouage à des milliers de tours/minute, pulvérisant instantanément les pivots d'acier trempé et risquant de blesser l'horloger."
  },
  {
    question: "2. Quel est le rôle physico-chimique du traitement d'épilamage (Fixodrop) appliqué sur les pièces de l'échappement ?",
    options: [
      "Créer une couche conductrice d'électricité pour éliminer l'électricité statique",
      "Abaisser la tension superficielle du métal pour rendre la surface oléophobe et empêcher la goutte d'huile de s'étaler par capillarité",
      "Remplacer le polissage miroir des aciers trempés",
      "Augmenter le poids de la roue d'échappement pour stabiliser la fréquence"
    ],
    correctAnswer: 1,
    explanation: "L'épilamage dépose un film fluoré invisible de quelques nanomètres d'épaisseur qui abaisse l'énergie superficielle du support. La goutte d'huile déposée sur les palettes d'ancre ou les dents de roue conserve un angle de contact élevé et reste parfaitement sphérique au point de contact sans fuir sur le corps de la pièce."
  },
  {
    question: "3. Sur un chronocomparateur, qu'indique un repère (Beat Error) excessif supérieur à 0.8 ms ?",
    options: [
      "Que la montre est parfaitement étanche jusqu'à 20 bar",
      "Une asymétrie de la position de repos du balancier par rapport à l'axe de symétrie de la fourchette de l'ancre",
      "Que le ressort de barillet est rompu",
      "Une vitesse de rotation trop élevée de la masse oscillante"
    ],
    correctAnswer: 1,
    explanation: "Le repère (beat error) mesure la différence de durée entre l'alternance d'aller et l'alternance de retour. Un repère de qualité se situe entre 0.0 et 0.2 ms. S'il dépasse 0.8 ms, la cheville de plateau n'est pas centrée dans la fourchette au point neutre du spiral, ce qui nuit au redémarrage spontané et à l'isochronisme."
  },
  {
    question: "4. Quelle graisse thixotropique spécifique doit être exclusivement appliquée sur les plans d'impulsion des rubis d'ancre ?",
    options: [
      "Moebius HP 1300",
      "Moebius 9415 (graisse thixotropique spéciale échappement)",
      "Graisse silicone Fomblin pour joints de boîte",
      "Huile minérale épaisse pour automobile"
    ],
    correctAnswer: 1,
    explanation: "La Moebius 9415 possède une propriété thixotropique remarquable : au repos, sa haute viscosité l'empêche de fuir sous la force centrifuge ; lors de l'impact de la dent de roue (cisaillement mécanique dynamique), elle se fluidifie instantanément pour offrir un coefficient de frottement minimal lors du glissement."
  },
  {
    question: "5. Lors du test d'étanchéité par condensation (NIHS 92-20), comment interprète-t-on l'apparition d'une tache de buée persistante sous la glace ?",
    options: [
      "C'est la preuve d'un fonctionnement optimal du système antichoc Incabloc",
      "C'est la preuve que la montre contient de l'humidité interne et présente un défaut d'étanchéité critique (test non conforme)",
      "Cela démontre la pureté optique du verre saphir synthétique",
      "C'est un phénomène thermique normal présent sur toutes les montres de luxe"
    ],
    correctAnswer: 1,
    explanation: "Selon la norme suisse NIHS 92-20 / ISO 22810, la montre est chauffée sur plaque tiède (~40-45°C), puis une goutte d'eau froide (~15°C) est déposée sur la glace. Si de la condensation se forme sous le verre et persiste plus de 60 secondes, de l'humidité est enfermée dans la boîte, signalant une fuite au niveau des joints."
  }
];

export default function EntretienPage() {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [selectedLubricant, setSelectedLubricant] = useState<string>("Moebius 9010");

  // Chronocomparator interactive simulator state
  const [rateDaily, setRateDaily] = useState<number>(+3); // s/d
  const [amplitude, setAmplitude] = useState<number>(295); // degrees
  const [beatError, setBeatError] = useState<number>(0.1); // ms
  const [watchPosition, setWatchPosition] = useState<string>("CH"); // CH, CB, 6H, 9H, 3H

  // Stepper Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Active items
  const activeStepData = SERVICE_STEPS.find(s => s.id === selectedStep) || SERVICE_STEPS[0];
  const activeLubricantData = LUBRICANTS_LIST.find(l => l.name === selectedLubricant) || LUBRICANTS_LIST[0];

  // Quiz handlers
  const handleSelectQuizAnswer = (optIdx: number) => {
    if (userAnswers[currentQuizIdx] !== undefined) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuizIdx]: optIdx
    }));
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* =================================================================== */}
        {/* HERO HEADER */}
        {/* =================================================================== */}
        <section className="space-y-4 text-center sm:text-left border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
              SEFRI · Convention Patronale CPIH
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Rhabillage &amp; Maintenance SAV
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Norme NIHS 92-20 &amp; ISO 22810
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Théorie Reymondin (FET)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              L&apos;Entretien, le Rhabillage &amp; les Contrôles
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Le protocole opératoire d&apos;un service complet suisse dans les règles de l&apos;art : diagnostic, déshabillage soigné, lavage technique 4 bains, épilamage oléophobe, lubrification scientifique Moebius, réglage sur chronocomparateur et métrologie de l&apos;étanchéité.
            </p>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 1: THE 7-STEP COMPLETE SERVICE WORKFLOW */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Protocole Opératoire Canonique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Les 7 Étapes d&apos;un Service Complet (Rhabillage)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Cliquez sur une étape pour inspecter les gestes d&apos;établi
            </span>
          </div>

          {/* Stepper Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {SERVICE_STEPS.map((step) => {
              const isSelected = selectedStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedStep(step.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-950 dark:text-neutral-50 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="text-[11px] font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                    Étape {step.number}
                  </div>
                  <div className="text-xs font-semibold font-serif truncate mt-0.5">
                    {step.title.split(" & ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] font-mono font-bold text-sm flex items-center justify-center">
                  {activeStepData.number}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-neutral-950 dark:text-neutral-50">
                    {activeStepData.title}
                  </h3>
                  <div className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483]">
                    {activeStepData.subtitle}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 w-fit">
                Phase SAV {activeStepData.id} / 7
              </span>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {activeStepData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="text-neutral-400 uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#B08D57]" />
                  Outillage Spécifique d&apos;Établi
                </span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                  {activeStepData.keyTools}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-1.5">
                <span className="text-amber-700 dark:text-amber-400 uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Règle Impérative de Sécurité &amp; Qualité
                </span>
                <span className="font-semibold block">
                  {activeStepData.criticalSecurity}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: INTERACTIVE CHRONOCOMPARATOR SIMULATOR */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Métrologie Chronométrique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Simulateur de Chronocomparateur (Type Witschi Chronoscope)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Analyse acoustique du tic-tac (échappement)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Screen View */}
            <div className="lg:col-span-2 rounded-2xl border-2 border-neutral-800 bg-neutral-950 p-6 shadow-xl space-y-5 text-neutral-100">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                    CHRONOSCOPE METROLOGY SYSTEM
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                  <span>Position :</span>
                  <span className="font-bold text-neutral-100 px-2 py-0.5 rounded bg-neutral-800">
                    {watchPosition} ({watchPosition === "CH" ? "Cadran Haut" : watchPosition === "CB" ? "Cadran Bas" : "Pendante"})
                  </span>
                </div>
              </div>

              {/* Numerical Readouts */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Marche Diurne</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-bold ${
                    rateDaily >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {rateDaily > 0 ? `+${rateDaily}` : rateDaily} <span className="text-xs">s/d</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Amplitude</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-bold ${
                    amplitude >= 270 && amplitude <= 315 ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {amplitude}°
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Repère (Beat Error)</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-bold ${
                    beatError <= 0.3 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {beatError.toFixed(1)} <span className="text-xs">ms</span>
                  </span>
                </div>
              </div>

              {/* Visual Acoustic Dot Diagram */}
              <div className="h-32 rounded-xl bg-neutral-900/80 border border-neutral-800 relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

                {/* Simulated twin trace lines */}
                <div
                  className="w-full relative transition-transform duration-300"
                  style={{
                    transform: `rotate(${rateDaily * -0.6}deg)`
                  }}
                >
                  {/* Trace 1 */}
                  <div className="h-0.5 w-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  {/* Trace 2 (separated by beat error) */}
                  <div
                    className="h-0.5 w-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all"
                    style={{ marginTop: `${Math.max(2, beatError * 14)}px` }}
                  />
                </div>

                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-neutral-500">
                  {beatError <= 0.3 ? "Traces parallèles parfaites" : "Traces dédoublées : défaut de repère"}
                </div>
              </div>
            </div>

            {/* Adjustment Controls Panel */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#8A6A3B] dark:text-[#D4B483]">
                  <SlidersHorizontal className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base">
                    Organes d&apos;Ajustement d&apos;Établi
                  </h3>
                </div>

                {/* Raquette adjustment */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Action sur la Raquette (Marche) :</span>
                    <span className="font-bold">{rateDaily > 0 ? `+${rateDaily}` : rateDaily} s/d</span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={rateDaily}
                    onChange={(e) => setRateDaily(Number(e.target.value))}
                    className="w-full accent-[#B08D57]"
                  />
                  <span className="text-[10px] text-neutral-400 block">Modifie la longueur active du spiral</span>
                </div>

                {/* Porte-piton adjustment */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Porte-Piton Mobile (Repère) :</span>
                    <span className="font-bold">{beatError.toFixed(1)} ms</span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={1.5}
                    step={0.1}
                    value={beatError}
                    onChange={(e) => setBeatError(Number(e.target.value))}
                    className="w-full accent-[#B08D57]"
                  />
                  <span className="text-[10px] text-neutral-400 block">Centre la cheville dans la fourchette</span>
                </div>

                {/* Position Selector */}
                <div className="space-y-1.5 text-xs font-mono">
                  <span className="text-neutral-500 block">Position du Mouvement :</span>
                  <div className="grid grid-cols-5 gap-1">
                    {["CH", "CB", "6H", "9H", "3H"].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => {
                          setWatchPosition(pos);
                          if (pos === "CH" || pos === "CB") {
                            setAmplitude(295);
                          } else {
                            setAmplitude(245);
                          }
                        }}
                        className={`py-1 rounded text-center font-bold cursor-pointer transition-all ${
                          watchPosition === pos
                            ? "bg-[#B08D57] text-neutral-950"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] text-xs font-mono">
                Tolérance officielle COSC : -4 à +6 s/jour · Repère &lt; 0.5 ms
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: TRIBOLOGICAL LUBRICATION MATRIX */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Tribologie &amp; Rhabillage Scientifique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              La Charte Complète de Lubrification Horlogère (Moebius)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LUBRICANTS_LIST.map((lub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-white"
                      style={{ backgroundColor: lub.colorCode }}
                    >
                      {lub.name}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{lub.type.split(" ")[0]}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-neutral-950 dark:text-neutral-50">
                    {lub.type}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {lub.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono">
                  <div className="text-neutral-500">
                    <strong className="text-neutral-700 dark:text-neutral-300">Emplacements : </strong>
                    {lub.usageLocation}
                  </div>
                  <div className="text-[#8A6A3B] dark:text-[#D4B483] font-semibold">
                    Viscosité : {lub.viscosity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: WATER RESISTANCE METROLOGY (NIHS 92-20 & ISO 22810) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Normes Internationales NIHS 92-20 / ISO 22810 / ISO 6425
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              Métrologie du Contrôle d&apos;Étanchéité
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dry Testing */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  1. Contrôle à Sec par Déformation d&apos;Air
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Méthode non destructive réalisée sur appareil pneumatique à palpeur micrométrique électronique (ex. Witschi Proofmaster).
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Test sous vide (-0.2 à -0.5 bar) :</strong>
                  Vérifie l&apos;étanchéité des joints de glace et de fond sous dépression (ouverture des lèvres de joint).
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Test sous pression (+3 à +20 bar) :</strong>
                  Mesure la déformation infime de la boîte en micromètres (µm). Si la déformation diminue avec le temps, de l&apos;air s&apos;infiltre, révélant une fuite.
                </div>
              </div>
            </div>

            {/* Condensation Testing */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-500" />
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  2. Test de Condensation Thermique
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le test juge de paix imposé par la norme NIHS 92-20 pour détecter la présence de traces d&apos;humidité résiduelle sous la glace.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Protocole d&apos;épreuve :</strong>
                  La montre est chauffée sur plaque régulée à 40°C - 45°C pendant 30 minutes, puis une goutte d&apos;eau froide à 15°C est déposée sur la glace.
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-0.5">Interprétation stricte :</strong>
                  Si un nuage de buée se forme et persiste plus de 60 secondes sous la glace saphir, la montre est non étanche et doit être révisée.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 5: COMPACT STEPPER QUIZ (SWISS EXAM FORMAT) */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Évaluation Certifiée
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Quiz de Validation Théorique (Format Examen Suisse)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              5 Questions · Réponse unique
            </span>
          </div>

          {/* Compact Stepper Container */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm">
            {!quizFinished ? (
              <div className="space-y-5">
                {/* Stepper Header with Pills & Score */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, qIdx) => {
                      const isCurrent = currentQuizIdx === qIdx;
                      const isAnswered = userAnswers[qIdx] !== undefined;
                      const isCorrect = userAnswers[qIdx] === QUIZ_QUESTIONS[qIdx].correctAnswer;

                      let pillStyle = "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border-neutral-200 dark:border-neutral-700";
                      if (isAnswered) {
                        pillStyle = isCorrect
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-bold";
                      } else if (isCurrent) {
                        pillStyle = "bg-[#B08D57] text-neutral-950 font-bold border-[#B08D57]";
                      }

                      return (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => setCurrentQuizIdx(qIdx)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center justify-center ${pillStyle}`}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20">
                      Question {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      Score : {calculateScore()} / {Object.keys(userAnswers).length}
                    </span>
                  </div>
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

                {/* Feedback Box */}
                {userAnswers[currentQuizIdx] !== undefined && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                  }`}>
                    <span className="font-bold block mb-0.5">
                      {userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                        ? "✓ Réponse exacte !"
                        : "✗ Explication technique :"}
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
                      ? "Félicitations ! Protocole de Rhabillage & SAV Validé."
                      : "Bon travail ! Quelques révisions techniques conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez les 7 étapes du service complet, la charte de lubrification Moebius, l'épilamage et les contrôles chronométriques."
                      : "Prenez le temps de revoir les règles de désarmage du barillet et l'interprétation des traces de chronocomparateur."}
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
            href="/theorie/remontage"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Le Remontage &amp; Mise à l&apos;Heure</span>
          </Link>

          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Sommaire Théorique Général</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
