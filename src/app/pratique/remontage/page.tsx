"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Wrench,
  Droplets,
  Gauge,
  CheckCircle2,
  ZoomIn,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

interface AssemblyStep {
  step: number;
  title: string;
  subtitle: string;
  img: string;
  codes: string;
  lubricant: string;
  torque: string;
  check: string;
  instructions: string;
  tip: string;
}

const ASSEMBLY_STEPS: AssemblyStep[] = [
  {
    step: 1,
    title: "Étape 1 · Mécanisme de Remontoir & Mise à l'Heure",
    subtitle: "Pose de la tige (401), pignon coulant (407), pignon de remontoir (410), tirette (443), bascule (435) et sautoir (445)",
    img: "/images/eta6497/assemblage-1.png",
    codes: "Codes 401, 407, 410, 435, 443, 445",
    lubricant: "Moebius 9504 (carré de tige, gorge du pignon coulant, denture Breguet, plot de tirette et bec de sautoir)",
    torque: "Vis de tirette (5443) : 1.5 cNm — Vis de sautoir (5445) : 1.6 cNm",
    check: "Passage franc et net entre T1 (remontage) et T2 (mise à l'heure)",
    instructions:
      "Lubrifier les portées de la tige de remontoir au Moebius 9504, engager le pignon de remontoir (denture Breguet vers le pignon coulant) puis le pignon coulant. Poser la tirette côté cadran, la bascule et son ressort-sautoir.",
    tip: "Tester impérativement le verrouillage de la tirette en tirant et poussant la tige 3 fois avant de passer au rouage.",
  },
  {
    step: 2,
    title: "Étape 2 · Pose du Rouage de Finissage & Mobile de Centre",
    subtitle: "Installation de la roue de centre (200), grande moyenne (206), seconde à 9h (227) et roue d'échappement (705)",
    img: "/images/eta6497/assemblage-2.png",
    codes: "Codes 200, 206, 227, 705, 110",
    lubricant: "Moebius HP-1300 (pivots de centre & grande moyenne) / Moebius 9010 (pivots de seconde & d'échappement)",
    torque: "Vis du pont de rouage (110) : 1.8 cNm (2 vis)",
    check: "Ébat axial de chaque mobile : 0.02 à 0.04 mm — Roulement libre au soufflet",
    instructions:
      "Huiler préalable le pivot inférieur de centre au HP-1300. Positionner les 4 mobiles dans leurs rubis de platine respectifs, puis descendre délicatement le pont de rouage (110) en guidant le long tenon de la roue de seconde (227).",
    tip: "Ne jamais serrer les vis du pont de rouage tant que les 3 pivots ne sont pas parfaitement engagés dans leurs trous de rubis.",
  },
  {
    step: 3,
    title: "Étape 3 · Barillet Complet, Pont de Barillet & Retenue",
    subtitle: "Pose du tambour (180/1), pont de barillet (105), roue de couronne (420), rochet (415) et cliquet (425)",
    img: "/images/eta6497/assemblage-3.png",
    codes: "Codes 180/1, 105, 415, 420, 421, 425, 430",
    lubricant: "Moebius HP-1300 (portées d'arbre) / Moebius 9504 (bague de roue de couronne 421 & bec de cliquet)",
    torque: "Pont de barillet : 2.2 cNm / Vis de rochet : 2.0 cNm / Vis roue de couronne (PAS À GAUCHE) : 1.8 cNm",
    check: "Ébat axial du tambour : 0.03 à 0.05 mm — Recul franc du cliquet",
    instructions:
      "Mettre en place le barillet complet, poser le pont de barillet (avec le ressort de cliquet 430 déjà logé dessous), visser le cliquet, la roue de couronne (vis à pas gauche !) puis le rochet sur le carré d'arbre.",
    tip: "Donner 1 demi-tour de couronne pour vérifier que tout le train de rouage tourne librement jusqu'à la roue d'échappement.",
  },
  {
    step: 4,
    title: "Étape 4 · Pose de l'Ancre Suisse & Pont d'Ancre",
    subtitle: "Mise en place de l'ancre empierrée (710), pont d'ancre (122) et lubrification des palettes",
    img: "/images/eta6497/assemblage-4.png",
    codes: "Codes 710, 122",
    lubricant: "Moebius 9415 (sur les plans d'impulsion des palettes uniquement — pivots d'ancre 100 % À SEC)",
    torque: "Vis du pont d'ancre (122) : 1.4 cNm (2 vis)",
    check: "Ébat axial de l'ancre : 0.02 à 0.03 mm — Saut franc d'une goupille de limitation à l'autre",
    instructions:
      "Engager délicatement le pivot inférieur de l'ancre, poser le pont d'ancre (122) et serrer modérément. Armer le barillet de 2 tours : au moindre effleurement de la fourchette avec une cheville de bois, l'ancre doit sauter vivement contre la goupille opposée.",
    tip: "INTERDICTION FORMELLE : Ne jamais déposer la moindre trace d'huile sur les pivots d'ancre, la fourchette ou le dard.",
  },
  {
    step: 5,
    title: "Étape 5 · Pose du Balancier-Spiral & Démarrage de l'Oscillateur",
    subtitle: "Descente verticale du coq (125) et du balancier-spiral (721) dans la fourchette d'ancre",
    img: "/images/eta6497/assemblage-5.png",
    codes: "Codes 721, 125, 730",
    lubricant: "Moebius 9010 (goutte centrée occupant 60 % des contre-pivots Incabloc supérieur et inférieur)",
    torque: "Vis du coq (125) : 2.0 cNm",
    check: "Démarrage spontané — Amplitude > 270° à plat — Repère ≤ 0.4 ms",
    instructions:
      "Approcher le balancier légèrement décalé pour engager l'ellipse du double plateau dans les cornes de la fourchette d'ancre, aligner le pied du coq et serrer la vis à 2.0 cNm. Huiler ensuite les deux amortisseurs Incabloc (730) au Moebius 9010.",
    tip: "Vérifier à la loupe 10x que le spiral respire bien à plat et concentriquement entre les goupilles de raquette.",
  },
  {
    step: 6,
    title: "Étape 6 · Minuterie Côté Cadran & Contrôle Chronométrique Final",
    subtitle: "Pose de la chaussée (240), roue de minuterie (260), roue des heures (250) et passage au Witschi",
    img: "/images/eta6497/assemblage-6.png",
    codes: "Codes 240, 250, 260",
    lubricant: "Moebius 9504 (lanterne de chaussée, tenon de roue de minuterie et denture de renvoi)",
    torque: "Friction de chaussée régulière sans broutage",
    check: "Amplitude 280°–310° (CH) | Marche -2 à +6 s/j | Écart positionnel Δ < 10 s/j",
    instructions:
      "Chasser la chaussée (240) sur le tenon percé de la roue de centre, poser la roue de minuterie (260), la roue des heures (250) et le clinquant. Passer le calibre sur le microphone du vibrographe Witschi sur les 5 positions (angle de levée 50°).",
    tip: "Toujours contrôler le glissement doux de la chaussée en T2 avant de poser le cadran et les aiguilles.",
  },
];

export default function RemontagePage() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [loupe, setLoupe] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
    3: null,
  });

  const currentStep = ASSEMBLY_STEPS[activeStepIdx];

  const questions = [
    {
      question: "Quelle particularité possède la vis de roue de couronne (Code 420) sur le calibre ETA 6497 ?",
      options: [
        "Elle ne doit jamais être serrée",
        "Elle possède un filetage inversé (pas à gauche, reconnaissable à ses 2 ou 3 fentes)",
        "Elle est collée à la résine",
        "Elle se visse par le côté cadran",
      ],
      correct: 1,
    },
    {
      question: "Comment doivent être lubrifiés les pivots de l'ancre suisse (Code 710) ?",
      options: [
        "Avec de l'huile épaisse Moebius HP-1300",
        "Avec de la graisse Moebius 9504",
        "Ils ne doivent JAMAIS être huilés (strictement à sec), seules les palettes reçoivent de la Moebius 9415",
        "En les trempant dans la benzine",
      ],
      correct: 2,
    },
    {
      question: "Quel est l'ébat axial normalisé pour les mobiles du rouage de finissage sur l'ETA 6497 ?",
      options: [
        "0.02 à 0.04 mm (20 à 40 microns)",
        "0.50 mm",
        "Aucun jeu (0.00 mm)",
        "1.20 mm",
      ],
      correct: 0,
    },
    {
      question: "Quel angle de levée doit être paramétré sur le vibrographe Witschi pour un calibre ETA 6497-1 ?",
      options: [
        "36°",
        "44°",
        "50°",
        "58°",
      ],
      correct: 2,
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  return (
    <section className="bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 min-h-screen py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;Atelier Pratique
          </Link>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            Protocole Officiel d&apos;Établi · ETA 6497-1
          </span>
        </div>

        <header className="mb-10 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-3">
            Remontage Méthodique — <span className="text-amber-600 dark:text-amber-400">Calibre ETA 6497</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-base leading-relaxed">
            Suivez le séquenceur d&apos;assemblage en <strong>6 étapes illustrées</strong> avec les couples de serrage en cNm, les contrôles d&apos;ébats axiaux (0.02 – 0.04 mm) et les 5 lubrifiants certifiés Moebius (<strong>9010, HP-1300, 9415, 9504, 8217</strong>).
          </p>
        </header>

        {/* Séquenceur Visuel en 6 Étapes avec Photos Locales */}
        <div className="mb-14 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-6 h-6 text-amber-500" />
                Séquenceur d&apos;Assemblage Visuel Pas-à-Pas (6 Étapes)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Sélectionnez une étape et activez la Loupe 10x pour inspecter le positionnement des ponts et mobiles.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeStepIdx === 0}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:border-amber-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300">
                Étape {currentStep.step} / {ASSEMBLY_STEPS.length}
              </span>
              <button
                onClick={() => setActiveStepIdx((prev) => Math.min(ASSEMBLY_STEPS.length - 1, prev + 1))}
                disabled={activeStepIdx === ASSEMBLY_STEPS.length - 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:border-amber-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-6">
            {ASSEMBLY_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  activeStepIdx === idx
                    ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm"
                    : "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-500/40"
                }`}
              >
                <div className="text-[10px] font-mono uppercase opacity-80">Étape 0{s.step}</div>
                <div className="text-xs font-bold truncate mt-0.5">{s.title.split("·")[1]}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-slate-100 dark:bg-[#070B14] border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center h-80 overflow-hidden">
                <img
                  src={currentStep.img}
                  alt={currentStep.title}
                  className={`max-h-72 w-auto object-contain transition-transform duration-500 ${
                    loupe ? "scale-150" : "scale-100"
                  }`}
                />
                <button
                  onClick={() => setLoupe(!loupe)}
                  className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    loupe
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  {loupe ? "Loupe 10x Active" : "Loupe 10x"}
                </button>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-900/85 text-amber-400">
                  {currentStep.codes}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {currentStep.title}
                </h3>
                <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-1">
                  {currentStep.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStep.instructions}
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5">
                  <Droplets className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase text-[10px] text-amber-800 dark:text-amber-300 font-bold">
                      Lubrification Moebius
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {currentStep.lubricant}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-cyan-500" /> Couple de Serrage
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {currentStep.torque}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-emerald-500" /> Contrôle d&apos;Ébat
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {currentStep.check}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-950 dark:text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" /> Conseil d&apos;Établi :
                </div>
                {currentStep.tip}
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Vidéo + FlipBook PDF */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div className="space-y-6">
            <div className="aspect-video w-full bg-black rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/mlo7muAlynE"
                title="Remontage mouvement ETA 6497"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                Règles d&apos;Or de l&apos;Assemblage Horloger
              </h2>
              <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
                <p>
                  Le remontage d&apos;un mouvement mécanique exige une <strong className="text-amber-600 dark:text-amber-400">propreté absolue</strong> (doigtiers latex/nitrile obligatoires, benzine rectifiée et cheville de fusain pour les pivots).
                </p>
                <p>
                  Chaque pont posé fait immédiatement l&apos;objet d&apos;un <strong className="text-amber-600 dark:text-amber-400">contrôle d&apos;ébat axial et de liberté</strong> avant de passer à l&apos;organe suivant : un mobile bridé ne doit jamais être forcé au tournevis.
                </p>
                <p>
                  <strong className="text-amber-600 dark:text-amber-400">Le balancier-spiral est toujours posé en dernier</strong>, une fois le rouage et l&apos;ancre parfaitement fonctionnels.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" /> Guide Officiel de Remontage ETA 6497 (PDF)
            </h2>
            <div className="h-[620px] rounded-xl overflow-hidden">
              <FlipBookViewer file="/pdfs/remontage/ETA6497-Remontage.pdf" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Link
                href="/pratique/demontage"
                className="inline-block bg-amber-500 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl hover:bg-amber-400 transition"
              >
                ↩️ Voir le Guide de Démontage ETA 6497
              </Link>
              <Link
                href="/pratique/fiches/eta6497"
                className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs px-5 py-3 rounded-xl hover:border-amber-500 transition"
              >
                🔍 Inspecter les 19 Fournitures Détourées 6497
              </Link>
            </div>
          </div>
        </div>

        {/* Mini Quiz */}
        <section className="bg-white dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-amber-500" />
            Contrôle des Connaissances d&apos;Atelier (ETA 6497)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q, qIndex) => (
              <div
                className="bg-slate-50 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800"
                key={qIndex}
              >
                <p className="text-slate-900 dark:text-white font-bold text-sm mb-4">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;
                    let buttonClass = "w-full text-left p-3 rounded-xl text-xs transition-all border ";
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass +=
                          "bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrect) {
                        buttonClass +=
                          "bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200";
                      } else {
                        buttonClass +=
                          "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400";
                      }
                    } else {
                      buttonClass +=
                        "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500";
                    }
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        className={buttonClass}
                        disabled={showResult}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
