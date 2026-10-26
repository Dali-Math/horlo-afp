"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Zap,
  Clock,
  Battery,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  History,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type ComparisonItem = {
  id: string;
  title: string;
  quartz: string;
  mecanique: string;
  winner: "quartz" | "mecanique";
  details: string;
};

const COMPARISONS: ComparisonItem[] = [
  {
    "id": "precision",
    "title": "Précision Temporelle",
    "quartz": "±15 secondes / mois",
    "mecanique": "±3 à 10 secondes / jour",
    "winner": "quartz",
    "details": "Le quartz est environ 100 fois plus précis qu'une montre mécanique standard. Même le standard le plus rigoureux de chronomètre suisse (COSC : -4/+6 s/jour) accumule en quelques jours l'écart qu'un quartz standard met un an à atteindre."
  },
  {
    "id": "cout",
    "title": "Coût de Fabrication",
    "quartz": "50 - 500 CHF (standard)",
    "mecanique": "500 - 50'000+ CHF",
    "winner": "quartz",
    "details": "Un mouvement à quartz standard est hautement automatisé et coûte 10 à 100 fois moins cher à usiner qu'un calibre mécanique comprenant plus d'une centaine de minuscules composants taillés et polis au micron."
  },
  {
    "id": "entretien",
    "title": "Fréquence d'Entretien",
    "quartz": "Pile tous les 2 à 5 ans",
    "mecanique": "Rhabillage tous les 3 à 5 ans",
    "winner": "quartz",
    "details": "L'entretien d'une montre à quartz se résume généralement à un remplacement de pile et de joints (30-50 CHF). Une montre mécanique requiert un démontage intégral, nettoyage, huilage minutieux aux huiles synthétiques et réglage (300-1000 CHF)."
  },
  {
    "id": "emotion",
    "title": "Valeur Émotionnelle & Âme",
    "quartz": "Production industrielle de série",
    "mecanique": "Artisanat d'art & Savoir-faire",
    "winner": "mecanique",
    "details": "Une montre mécanique incarne plus de 400 ans d'histoire et d'artisanat. L'animation visuelle du balancier oscillant, le tic-tac discret et les finitions manuelles (anglage, Côtes de Genève, soleillage) lui confèrent une dimension artistique et intemporelle."
  },
  {
    "id": "durabilite",
    "title": "Pérennité & Réparabilité",
    "quartz": "Composants électroniques sujets à obsolescence",
    "mecanique": "Réparable à l'infini par un horloger",
    "winner": "mecanique",
    "details": "Une montre mécanique centenaire peut toujours être réparée en réusinant une pièce au tour d'horloger. En revanche, un circuit intégré ou une bobine de quartz d'il y a 40 ans dont le fabricant a disparu peut rendre le garde-temps irréparable."
  }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "question": "Pourquoi le quartz oscille-t-il précisément à 32'768 Hz ?",
    "options": [
      "C'est la fréquence naturelle du quartz",
      "Parce que 32'768 = 2¹⁵, facile à diviser pour obtenir 1 Hz",
      "Pour minimiser la consommation électrique",
      "C'est un choix arbitraire de Seiko"
    ],
    "correctAnswer": 1,
    "explanation": "32'768 = 2¹⁵. Cette puissance de 2 permet de diviser facilement la fréquence par 15 diviseurs binaires successifs (flip-flops) pour obtenir exactement 1 Hz (1 impulsion/seconde). C'est un compromis optimal entre précision micromécanique et consommation électrique."
  },
  {
    "question": "Quelle montre a déclenché la 'Crise du Quartz' en 1969 ?",
    "options": [
      "Casio F-91W",
      "Seiko Astron",
      "Timex Quartz",
      "Omega Constellation"
    ],
    "correctAnswer": 1,
    "explanation": "La Seiko Astron 35SQ, commercialisée le 25 décembre 1969 à Tokyo, fut la première montre-bracelet à quartz au monde. Son prix initial de 450'000 yens (équivalent d'une voiture Toyota) n'empêcha pas le déferlement de cette révolution technologique."
  },
  {
    "question": "Quelle est la précision annuelle certifiée du calibre Grand Seiko 9F ?",
    "options": [
      "±5 secondes/an",
      "±10 secondes/an",
      "±15 secondes/an",
      "±30 secondes/an"
    ],
    "correctAnswer": 1,
    "explanation": "Le calibre 9F de Grand Seiko, développé en 1993, atteint une précision hors normes de ±10 secondes par an (certaines éditions spéciales atteignent ±5s/an), soit environ 120 fois plus précis qu'un chronomètre mécanique standard."
  },
  {
    "question": "Combien d'emplois l'horlogerie suisse a-t-elle perdus durant la crise du quartz (1970-1985) ?",
    "options": [
      "Environ 10'000 emplois",
      "Environ 25'000 emplois",
      "Environ 50'000 emplois",
      "Environ 80'000 emplois"
    ],
    "correctAnswer": 2,
    "explanation": "Entre 1970 et 1985, les effectifs de l'industrie horlogère suisse se sont effondrés d'environ 90'000 à moins de 30'000 travailleurs (soit environ 50'000 à 60'000 emplois perdus) et plus de la moitié des manufactures suisses ont fermé leurs portes."
  }
];

export default function MouvementsQuartzPage() {
  // Quiz States
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Simulateur SVG Diapason 32'768 Hz & Moteur Lavet States
  const [lavetPulse, setLavetPulse] = useState<number>(0);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === QUIZ_QUESTIONS[currentQIdx].correctAnswer) {
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
      
      {/* ESPACE DE DÉGAGEMENT HAUT : Évite toute superposition sous la navbar capsule flottante */}
      <div className="pt-8 sm:pt-10 md:pt-12" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* HERO SECTION DE HAUTE HORLOGERIE */}
        <section className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          {/* Breadcrumb Navigation */}
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
              Mouvements à Quartz
            </span>
          </nav>

          {/* Badge Horlogerie Suisse */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 mb-5 shadow-sm max-w-full">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="truncate">Révolution Électronique & Haute Fréquence Piézoélectrique</span>
          </div>

          {/* Grand Titre conforme /theorie */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 font-serif leading-tight px-2">
            Mouvements à Quartz &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Résonateur 32&apos;768 Hz &amp; Moteur Lavet
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Comprenez comment un diapason de dioxyde de silicium oscillant à{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">32&apos;768 Hz</span> a bouleversé l&apos;horlogerie mondiale, déclenché la crise de 1970 et forcé la Renaissance de la Haute Horlogerie suisse.
          </p>

          {/* Ruban de Métriques Rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono">32&apos;768</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Hz (2¹⁵ vibrations/s)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">±15s</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Précision / Mois</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">2 - 5</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Ans d&apos;Autonomie Pile</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">75%</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Production Mondiale</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIMULATEUR CINÉMATIQUE SVG : DIAPASON 32'768 HZ, 2^15 & MOTEUR LAVET      */}
        {/* ========================================================================= */}
        <section className="mb-14 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Cpu className="w-4 h-4" />
                <span>Simulateur Électro-Mécanique SVG • Brevet Marius Lavet (1936) &amp; CEH Bêta 21</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Du Diapason en Quartz (32&apos;768 Hz) au Saut de 180° du Rotor Lavet
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLavetPulse((prev) => prev + 1)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all"
              >
                ⚡ Envoyer Impulsion 1 Hz ({lavetPulse % 2 === 0 ? "Polarité + / -" : "Polarité - / +"} → Saut 180°)
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                  loupe10x
                    ? "bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {loupe10x ? "Loupe 10x Active" : "Loupe 10x"}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                <svg
                  viewBox="0 0 740 350"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? "scale(1.38)" : "scale(1)",
                    transformOrigin: "545px 175px"
                  }}
                >
                  {/* 1. DIAPASON PIÉZOÉLECTRIQUE EN QUARTZ SiO2 (GAUCHE) */}
                  <g transform="translate(115, 175)">
                    <text x="0" y="-135" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      1. DIAPASON QUARTZ (SiO₂)
                    </text>
                    <rect x="-54" y="-105" width="108" height="210" rx="18" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    {/* Socle hermétique sous vide */}
                    <rect x="-26" y="45" width="52" height="36" rx="4" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
                    {/* 2 Branches vibrantes du diapason en quartz avec électrodes d'or */}
                    <path
                      d="M -18 45 L -18 -72 L -8 -72 L -8 25 L 8 25 L 8 -72 L 18 -72 L 18 45 Z"
                      fill="#bae6fd"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    {/* Ondes de flexion piézoélectriques */}
                    <path d="M -32 -55 Q -42 -35, -32 -15" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    <path d="M 32 -55 Q 42 -35, 32 -15" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    <text x="0" y="128" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      f₀ = 32&apos;768 Hz (2¹⁵)
                    </text>
                  </g>

                  {/* 2. DIVISEUR BINAIRE CMOS 15 ÉTAGES (CENTRE) */}
                  <g transform="translate(315, 175)">
                    <text x="0" y="-135" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      2. DIVISEUR CMOS (15 ÉTAGES)
                    </text>
                    <rect x="-78" y="-85" width="156" height="170" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    {[
                      { stage: "Étage 1 (÷2)", hz: "16'384 Hz", y: -52 },
                      { stage: "Étage 8 (÷256)", hz: "128 Hz", y: -15 },
                      { stage: "Étage 14 (÷16384)", hz: "2 Hz", y: 22 },
                      { stage: "Étage 15 (÷32768)", hz: "1.000 Hz", y: 58 }
                    ].map((st) => (
                      <g key={st.stage} transform={`translate(0, ${st.y})`}>
                        <rect x="-64" y="-14" width="128" height="24" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                        <text x="-56" y="2" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
                          {st.stage}
                        </text>
                        <text x="56" y="2" fill="#34d399" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                          {st.hz}
                        </text>
                      </g>
                    ))}
                    <text x="0" y="128" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Impulsion alternée (7.8 ms / s)
                    </text>
                  </g>

                  {/* 3. MOTEUR PAS-À-PAS DE MARIUS LAVET (DROITE) */}
                  <g transform="translate(555, 175)">
                    <text x="0" y="-135" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      3. MOTEUR PAS-À-PAS LAVET
                    </text>

                    {/* Bobine de cuivre sur noyau ferromagnétique (bas) */}
                    <rect x="-95" y="62" width="190" height="32" rx="6" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                    <text x="0" y="82" fill="#fef3c7" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      BOBINE CUIVRE (~10&apos;000 SPIRES)
                    </text>

                    {/* Stator en Permalloy avec encoches d'asymétrie de Lavet */}
                    <path
                      d="M -95 62 L -95 -65 L 95 -65 L 95 62 L 62 62 L 62 -25 L -62 -25 L -62 62 Z"
                      fill="#334155"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    <circle cx="0" cy="-22" r="46" fill="#060a12" stroke="#64748b" strokeWidth="2" />

                    {/* 2 Encoches d'orientation de repos (Stator Notches à 35°) */}
                    <circle cx="-38" cy="-46" r="6" fill="#fbbf24" />
                    <circle cx="38" cy="2" r="6" fill="#fbbf24" />

                    {/* Rotor aimanté bipolaire Nord/Sud (tourne de 180° à chaque impulsion) */}
                    <g transform={`translate(0, -22) rotate(${lavetPulse * 180 + 35})`}>
                      <path d="M -34 0 A 34 34 0 0 1 34 0 Z" fill="#ef4444" stroke="#fecdd3" strokeWidth="1.5" />
                      <path d="M -34 0 A 34 34 0 0 0 34 0 Z" fill="#3b82f6" stroke="#bae6fd" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="8" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                      <text x="0" y="-14" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        N
                      </text>
                      <text x="0" y="22" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        S
                      </text>
                    </g>

                    <text x="0" y="128" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Angle Rotor : {(lavetPulse * 180) % 360}° ({lavetPulse} s écoulées)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  Asymétrie Magnétique de Lavet
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Pourquoi le Rotor tourne-t-il toujours dans le même sens ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  L’alésage du stator comporte <strong>deux encoches asymétriques</strong> (points jaunes sur le schéma). Au repos (sans courant), l’aimant du rotor s’incline naturellement de ~35° par rapport à l’axe magnétique de la bobine. Ainsi, chaque impulsion de 1 Hz (à polarité inversée une seconde sur deux) chasse le pôle Nord toujours dans le sens horaire de <strong>180°</strong> exactement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 : QU'EST-CE QU'UN MOUVEMENT À QUARTZ ? */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block mb-1">
              Fondements Physiques
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Qu&apos;est-ce qu&apos;un Mouvement à Quartz ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Un <strong>mouvement à quartz</strong> utilise les propriétés piézoélectriques d&apos;un cristal de quartz synthétique taillé en forme de minuscule diapason. Alimenté par une pile bouton (lithium ou oxyde d&apos;argent), un circuit électronique stimule le cristal qui vibre à une fréquence ultra-stable de <strong>32&apos;768 Hz</strong>. Cette régularité permet une précision <strong>100 fois supérieure</strong> à celle des calibres mécaniques traditionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Effet Piézoélectrique</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le quartz (SiO₂) se déforme lorsqu&apos;il reçoit une tension électrique, et produit inversement un signal lorsqu&apos;il est comprimé.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Précision Absolue</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Oscillation constante à 32&apos;768 Hz garantissant un écart standard inférieur à ±15 secondes par mois dans un environnement normal.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 font-bold">
                <Battery className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Autonomie Continue</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Une pile bouton compacte assure une marche ininterrompue de 2 à 5 ans sans nécessiter aucun remontage manuel ni automatique.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 : FONCTIONNEMENT TECHNIQUE & LE SECRET DES 32'768 HZ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Cinématique & Électronique
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              La Chaîne de Fonctionnement
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Alimentation & Oscillateur</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    La pile bouton alimente un circuit intégré qui injecte des impulsions électriques dans le cristal de quartz sous vide, le maintenant en résonance continue à 32&apos;768 Hz.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Diviseur Binaire de Fréquence (Flip-Flops)</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    Le signal haute fréquence passe par 15 diviseurs binaires successifs (2¹⁵ = 32&apos;768). À chaque étage, la fréquence est divisée par deux pour aboutir exactement à <strong>1 Hz</strong> (une impulsion par seconde).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Moteur Pas-à-Pas (Type Lavet)</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    L&apos;impulsion de 1 Hz alimente une bobine micromécanique qui inverse son champ magnétique et fait faire un demi-tour au rotor aimanté à chaque seconde, produisant le saut franc caractéristique de la trotteuse.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Rouage de Démultiplication Horloger</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    Un rouage miniature d&apos;engrenages démultiplie la rotation de la roue des secondes pour entraîner la roue des minutes (1 tour/h) et la roue des heures (1 tour/12h).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 via-slate-100 to-cyan-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-7 rounded-2xl border border-amber-500/30 dark:border-amber-500/30 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Le Secret Mathématique</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif">
              Pourquoi 32&apos;768 Hz ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Le nombre <strong>32&apos;768</strong> n&apos;a pas été choisi par hasard : c&apos;est exactement <strong>2¹⁵</strong> (2 multiplié par lui-même 15 fois).
            </p>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 mb-4 font-mono text-xs text-center text-slate-800 dark:text-slate-200">
              32&apos;768 Hz ÷ 2¹⁵ = 1.000000 Hz
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              En microélectronique binaire, diviser une fréquence par 2 est une opération ultra-simple ne nécessitant qu&apos;une bascule logique (flip-flop). 32&apos;768 Hz représente l&apos;équilibre physique parfait :
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Assez haut pour être inaudible à l&apos;oreille humaine (&gt; 20 kHz)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Assez haut pour garantir une immunité aux chocs mécaniques</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Assez bas pour consommer moins d&apos;un microampère de courant</span>
              </li>
            </ul>
          </div>

        </section>

        {/* SECTION 3 : LE DUEL : QUARTZ VS MÉCANIQUE */}
        <section className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Analyse Comparative
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Quartz vs Mécanique : Le Face-à-Face
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Comparatif technique des points forts respectifs des calibres à résonateur et des mouvements à ancre suisse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPARISONS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.winner === "quartz"
                          ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      Avantage {item.winner === "quartz" ? "⚡ Quartz" : "⚙️ Mécanique"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">⚡ Quartz</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-400">{item.quartz}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">⚙️ Mécanique</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">{item.mecanique}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 : LA CRISE DU QUARTZ & LA RENAISSANCE SUISSE */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
                Histoire Horlogère
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                La Crise du Quartz (1970–1985) & La Renaissance Suisse
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300/40">
              Choc Historique
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. L&apos;Onde de Choc (1969)</h4>
              <p>
                Le 25 décembre 1969, Seiko dévoile l&apos;Astron 35SQ à Tokyo. Dès le début des années 70, la production de masse à bas coût inonde le marché avec des montres d&apos;une précision diabolique vendues quelques dollars.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Le Séisme Helvétique</h4>
              <p>
                Les manufactures suisses, fidèles au calibre mécanique traditionnel, subissent une débâcle sans précédent : plus de 50&apos;000 emplois horlogers perdus (passant de 90&apos;000 à 30&apos;000) et des centaines d&apos;ateliers fermés.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. La Renaissance dans le Luxe</h4>
              <p>
                Sous l&apos;impulsion de Nicolas Hayek (fondation de la Swatch en 1983) et le repositionnement des grandes maisons sur l&apos;artisanat d&apos;exception, l&apos;horlogerie suisse s&apos;est réinventée en objet d&apos;émotion et de prestige.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40">
              <div className="text-xl font-bold text-rose-700 dark:text-rose-400">-50&apos;000</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Emplois perdus en Suisse</div>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40">
              <div className="text-xl font-bold text-rose-700 dark:text-rose-400">~60%</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Des ateliers fermés</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40">
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">N°1 Mondial</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">En valeur exportée aujourd&apos;hui</div>
            </div>
          </div>
        </section>

        {/* SECTION 5 : GRAND SEIKO CALIBRE 9F */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-900 border border-amber-300 dark:border-amber-500/30 shadow-md mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Sommet de la Précision Mondiale</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
            Grand Seiko Calibre 9F : Quand le Quartz Devient Haute Horlogerie
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-3xl leading-relaxed">
            Créé en 1993, le calibre 9F prouve qu&apos;un mouvement à quartz peut rivaliser avec les plus grands calibres mécaniques en matière d&apos;artisanat et de noblesse mécanique.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                <span>⚡</span> Performances Hors Normes
              </h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Précision ±10 sec/an :</strong> cristaux de quartz vieillis pendant 3 mois et thermo-compensés 540 fois par jour.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Double impulsion par seconde :</strong> moteur à couple élevé capable d&apos;animer des aiguilles lourdes et massives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Saut de date instantané :</strong> changement de date en 1/2000ème de seconde via levier à ressort.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                <span>🛠️</span> Finitions Haute Horlogerie
              </h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Assemblage 100% Manuel :</strong> chaque calibre est monté et ajusté par un maître horloger au studio Shinshu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Décoration traditionnelle :</strong> ponts dorés perlés et anglages soignés visibles sous fond saphir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong>Cabine scellée (Super Sealed Cabin) :</strong> protège le rouage de la poussière lors du changement de pile pour 50 ans.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6 : TESTEZ VOS CONNAISSANCES (QUIZ) */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Auto-Évaluation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Quiz : Maîtrisez-vous la Technologie Quartz ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              4 questions officielles pour valider votre compréhension de l&apos;oscillateur piézoélectrique.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {!quizFinished ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                    <span>
                      Question {currentQIdx + 1} sur {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400">
                      Score : {score} / {QUIZ_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQIdx].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[currentQIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === QUIZ_QUESTIONS[currentQIdx].correctAnswer;

                    let btnStyle =
                      "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400";

                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle =
                          "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected) {
                        btnStyle =
                          "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium";
                      } else {
                        btnStyle =
                          "border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 opacity-50";
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
                      selectedOption === QUIZ_QUESTIONS[currentQIdx].correctAnswer
                        ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200"
                        : "border-rose-300 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200"
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {selectedOption === QUIZ_QUESTIONS[currentQIdx].correctAnswer
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
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:text-slate-950 transition-all shadow-md"
                    >
                      {currentQIdx === QUIZ_QUESTIONS.length - 1
                        ? "Voir les résultats 🏆"
                        : "Question suivante →"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">
                  {score === 4 ? "🎉" : score >= 2 ? "👏" : "📚"}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Quiz Terminé !
                </h3>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {score} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  {score === 4
                    ? "Score Parfait ! Vous maîtrisez parfaitement la physique du quartz et l'histoire horlogère suisse."
                    : score >= 2
                    ? "Bon résultat ! Relisez les détails sur la fréquence 32'768 Hz pour atteindre la perfection."
                    : "Prenez le temps de relire la fiche théorique et réessayez pour progresser !"}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:text-slate-950 transition-all shadow-md inline-flex items-center gap-2"
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
