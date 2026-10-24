"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Heart,
  Activity,
  Compass,
  Battery,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Radio,
  Eye,
  Zap,
  Clock
} from "lucide-react";

type SensorItem = {
  id: string;
  name: string;
  tech: string;
  icon: string;
  role: string;
  impact: string;
};

type SwissModel = {
  brand: string;
  model: string;
  price: string;
  particularite: string;
  os: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const SENSORS: SensorItem[] = [
  {
    id: "cardio",
    name: "Cardiofréquencemètre PPG",
    tech: "Photopléthysmographie",
    icon: "❤️",
    role: "LEDs vertes traversant la peau pour mesurer la vitesse du flux sanguin artériel et calculer les battements par minute (BPM).",
    impact: "Suivi continu de l'effort physique, du sommeil paradoxal et de la variabilité cardiaque.",
  },
  {
    id: "ecg",
    name: "Électrocardiogramme (ECG)",
    tech: "Électrodes au titane / céramique",
    icon: "📈",
    role: "Mesure de l'activité électrique du myocarde lorsque l'utilisateur pose l'index opposé sur la couronne de la montre.",
    impact: "Détection précoce de la fibrillation auriculaire et des anomalies de conduction cardiaque.",
  },
  {
    id: "spo2",
    name: "Oxymètre de Pouls (SpO₂)",
    tech: "Spectrophotométrie rouge / infrarouge",
    icon: "🫁",
    role: "Différencie le sang oxygéné (absorbant les infrarouges) du sang désoxygéné (absorbant la lumière rouge).",
    impact: "Mesure du pourcentage d'oxygène dans le sang, crucial en alpinisme et détection d'apnée.",
  },
  {
    id: "gps",
    name: "Puce GNSS Multi-Bandes",
    tech: "GPS, Galileo, Glonass, Beidou",
    icon: "🛰️",
    role: "Récepteur satellitaire autonome permettant le positionnement géographique sans assistance de smartphone.",
    impact: "Traçage précis de parcours sportifs, dénivelé barométrique et cartographie topographique.",
  },
  {
    id: "mems",
    name: "Centrale Inertielle MEMS",
    tech: "Accéléromètre + Gyroscope 6 axes",
    icon: "🧭",
    role: "Capteurs micromécaniques mesurant les mouvements triaxiaux, la vitesse de rotation et les décélérations brutales.",
    impact: "Comptage des pas, reconnaissance automatique de la nage et détection automatique de chute violente avec appel SOS.",
  },
  {
    id: "nfc",
    name: "Puce NFC Sans Contact",
    tech: "Near Field Communication 13.56 MHz",
    icon: "💳",
    role: "Antenne miniature logée sous le boîtier autorisant l'échange de données chiffrées à moins de 4 cm.",
    impact: "Paiement bancaire sans contact instantané (Apple Pay, Garmin Pay) et déverrouillage de serrures.",
  },
];

const SWISS_CONNECTED: SwissModel[] = [
  {
    brand: "TAG Heuer",
    model: "Connected Calibre E4",
    price: "Dès 1'800 CHF",
    particularite: "Boîtier en titane grade 2 sablé, lunette céramique noire, couronne rotative mécanique et cadrans virtuels inspirés des chronographes Carrera.",
    os: "Wear OS by Google personnalisé",
  },
  {
    brand: "Hublot",
    model: "Big Bang e Gen 3",
    price: "Dès 5'400 CHF",
    particularite: "Boîtier Big Bang de 44 mm en céramique noire ou titane, lunette gravée, bracelet caoutchouc à système d'interchangeabilité 'One Click'.",
    os: "Wear OS avec complications Hublot",
  },
  {
    brand: "Frederique Constant",
    model: "Horological Smartwatch",
    price: "Dès 950 CHF",
    particularite: "Montre hybride à cadran 100% traditionnel avec aiguilles physiques, renfermant discrètement un module de suivi d'activité et 2 ans d'autonomie.",
    os: "Module MMT autonome basse consommation",
  },
  {
    brand: "Tissot",
    model: "T-Touch Connect Solar",
    price: "Dès 1'050 CHF",
    particularite: "Verre saphir tactile, cadran à cellules photovoltaïques solaires garantissant une autonomie quasi infinie en extérieur, système d'exploitation suisse SwALPS.",
    os: "SwALPS (Swiss Autonomous Low Power)",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Comment le capteur cardiofréquencemètre optique (PPG) mesure-t-il le pouls au poignet ?",
    options: [
      "Par analyse des ondes sonores émises par les artères",
      "Par émission de lumière verte absorbée par l'hémoglobine à chaque pulsation sanguine",
      "Par mesure de la température cutanée du poignet",
      "Par détection des mouvements musculaires du tendon",
    ],
    correct: 1,
    explanation: "La photopléthysmographie (PPG) utilise des diodes vertes : le sang absorbe naturellement le vert. À chaque pulsation cardiaque, le volume de sang sous la peau augmente et absorbe davantage de lumière, permettant de calculer les battements par minute.",
  },
  {
    question: "Quel système d'exploitation helvétique ultra-basse consommation équipe la Tissot T-Touch Connect Solar ?",
    options: [
      "Android Wear",
      "WatchOS",
      "SwALPS (développé avec le CSEM de Neuchâtel)",
      "Garmin OS",
    ],
    correct: 2,
    explanation: "Tissot et le Swatch Group ont développé SwALPS (Swiss Autonomous Low Power System) avec le CSEM pour concevoir un OS suisse respectueux des données privées et ultra-économe couplé à l'énergie solaire.",
  },
  {
    question: "Quelle est la principale différence de durabilité entre une smartwatch et une montre mécanique ?",
    options: [
      "La montre mécanique s'use plus vite qu'un processeur",
      "La smartwatch subit l'obsolescence logicielle et chimique de la batterie (3-5 ans) alors que la mécanique est réparable à l'infini",
      "La smartwatch est toujours plus étanche que la montre mécanique",
      "Il n'existe aucune différence de longévité",
    ],
    correct: 1,
    explanation: "Les smartwatches dépendent d'applications, de serveurs distants et de batteries chimiques li-ion vouées à se dégrader. Une montre mécanique de Haute Horlogerie est un objet mécanique pérenne transmissible sur plusieurs générations.",
  },
];

export default function MontresConnecteesPage() {
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

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
              Montres Connectées & Smartwatches
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-300 mb-5 shadow-sm max-w-full">
            <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate">Horlogerie Digitale • Capteurs Biométriques & Modèles Hybrides Suisses</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 font-serif px-2">
            Montres Connectées (Smartwatches)
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Explorez l&apos;architecture électronique, les capteurs biométriques avancés, la gestion énergétique et le positionnement des manufactures de luxe suisses face à la révolution connectée.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">6</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Capteurs Majeurs</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">1 - 21</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Jours d&apos;Autonomie</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">SwALPS</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">OS Suisse Tissot</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">500M+</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Utilisateurs Mondiaux</div>
            </div>
          </div>
        </section>

        {/* SECTION 1 : LES 6 CAPTEURS BIOMÉTRIQUES FONDAMENTAUX */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
              Physiologie & Microélectronique
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Les 6 Capteurs Clés d&apos;une Montre Connectée
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Des technologies optiques et inertielles miniatures au contact direct de la peau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SENSORS.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold border border-blue-200/60 dark:border-blue-800/40">
                      {s.tech}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {s.role}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-blue-700 dark:text-blue-400 font-medium">
                  ✦ Rôle : {s.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2 : LE DUEL : SMARTWATCH VS HAUTE HORLOGERIE MÉCANIQUE */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Analyse de Valeur
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Smartwatch vs Montre Mécanique : Deux Visions Opposées
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              L&apos;outil d&apos;usage quotidien connecté face à l&apos;œuvre d&apos;art patrimoniale et intemporelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📱</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">La Montre Connectée (Outil Numérique)</h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Fonctionnalité :</strong> Notifications, métriques de santé, guidage GPS et connectivité permanente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Durée de vie :</strong> 3 à 5 ans avant dégradation chimique de la batterie et obsolescence logicielle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Valeur résiduelle :</strong> Décote rapide (comme un téléphone portable d&apos;ancienne génération).</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 dark:border-amber-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚙️</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">La Montre Mécanique Suisse (Objet d&apos;Art)</h3>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Fonctionnalité :</strong> Heure pure, chronométrage mécanique, complications nobles et indépendance totale de tout écran.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Durée de vie :</strong> Séculaire. Réparable à l&apos;infini par un horloger rhabilleur au tour d&apos;horloger.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Valeur résiduelle :</strong> Préservation voire valorisation patrimoniale au fil des générations.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3 : LES MAISONS SUISSES DANS LE CONNECTÉ DE PRESTIGE */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Haute Horlogerie Suisse
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Les Modèles Connectés Suisses d&apos;Exception
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Comment les manufactures helvétiques marient titane, céramique et modules connectés de pointe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SWISS_CONNECTED.map((sw, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{sw.brand}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{sw.price}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{sw.model}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{sw.particularite}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Système :</strong> {sw.os}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 : GRAND QUIZ MONTRES CONNECTÉES */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Évaluation Pédagogique
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Quiz : L&apos;Horlogerie Digitale & Capteurs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Testez vos connaissances sur les principes optiques et l&apos;autonomie des montres connectées.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {!quizFinished ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                    <span>Question {currentQIdx + 1} sur {QUIZ_QUESTIONS.length}</span>
                    <span className="text-blue-600 dark:text-blue-400">Score : {score} / {QUIZ_QUESTIONS.length}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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

                    let btnStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400";
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
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:text-slate-950 transition-all shadow-md"
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
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {score} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  {score === 3
                    ? "Parfait ! Vous maîtrisez la technologie des capteurs PPG et l'univers des smartwatches."
                    : score >= 2
                    ? "Bon résultat ! Révisez les particularités de l'OS suisse SwALPS pour parfaire vos connaissances."
                    : "Relisez la fiche de cours et retentez le test pour consolider vos acquis !"}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:text-slate-950 transition-all shadow-md inline-flex items-center gap-2"
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
