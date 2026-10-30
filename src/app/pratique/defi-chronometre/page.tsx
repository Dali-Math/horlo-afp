"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Timer,
  Award,
  Zap,
  CheckCircle2,
  XCircle,
  Share2,
  Copy,
  RotateCcw,
  Swords,
  Trophy,
  Flame,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Gauge,
  Sliders,
  Maximize2
} from "lucide-react";

interface ChallengeQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number; // 0-based
  explanation: string;
}

const QUESTION_BANK: ChallengeQuestion[] = [
  {
    id: 1,
    category: "Huilage & Tribologie",
    question: "Quelle huile certifiée Moebius s'applique EXCLUSIVEMENT sur les palettes de l'ancre suisse ?",
    options: ["Moebius 9010", "Moebius 9415 (ou 941)", "Moebius HP-1300", "Moebius 8217"],
    correctAnswer: 1,
    explanation: "La Moebius 9415 est une graisse/huile thixotrope conçue pour rester sur le plan d'impulsion des levées sans gicler sur le dard ni les cornes."
  },
  {
    id: 2,
    category: "Échappement Suisse",
    question: "Quelle est la règle absolue concernant la lubrification des pivots de la tige d'ancre suisse ?",
    options: [
      "1 micro-goutte de 9010 sur chaque pivot",
      "Une gouttelette de HP-500",
      "Ils doivent impérativement rester STRICTEMENT SECS",
      "Graisse 9504 sous pression"
    ],
    correctAnswer: 2,
    explanation: "Les pivots d'ancre ne doivent JAMAIS être huilés : la moindre trace d'huile freine la fourchette et effondre l'amplitude du balancier."
  },
  {
    id: 3,
    category: "Couples de Serrage NIHS",
    question: "Quel est le couple de serrage standard de la vis de masse oscillante sur un calibre ETA 2824-2 ?",
    options: ["0.8 cNm", "1.2 cNm", "2.0 à 2.5 cNm", "4.5 cNm"],
    correctAnswer: 2,
    explanation: "La vis de rotor automatique subit des accélérations continues ; son couple préconisé selon la norme NIHS est de 2.0 à 2.5 cNm."
  },
  {
    id: 4,
    category: "Contrôle Witschi & Repère",
    question: "Sur un chrono-comparateur Witschi, quelle est la limite maximale d'erreur de repère (Beat Error) tolérée ?",
    options: ["0.4 ms (max 0.6 ms)", "1.5 ms", "2.2 ms", "0.01 ms"],
    correctAnswer: 0,
    explanation: "Un repère au-delà de 0.4 ms révèle une cheville de plateau décentrée par rapport à l'axe de la ligne de centres, réduisant la réserve de marche."
  },
  {
    id: 5,
    category: "Usinage & Filetages NIHS",
    question: "Pour un filetage horloger NIHS S 0.90 (pas 0.225 mm), quel est le diamètre du foret avant-trou ?",
    options: ["Ø 0.50 mm", "Ø 0.68 mm", "Ø 0.85 mm", "Ø 0.90 mm"],
    correctAnswer: 1,
    explanation: "Formule fondamentale d'avant-trou : Foret = D − P = 0.90 − 0.225 = 0.675 mm, soit un foret étalonné de Ø 0.68 mm."
  },
  {
    id: 6,
    category: "Chronographe à Colonnes",
    question: "Sur un chronographe à roue à colonnes classique, quelle manœuvre est strictement proscrite sous peine de casse ?",
    options: [
      "Appuyer sur Poussoir A deux fois de suite",
      "Appuyer sur Poussoir B (Reset) pendant la marche (Start)",
      "Laisser tourner le chronographe plus d'une heure",
      "Régler l'heure pendant que le chrono tourne"
    ],
    correctAnswer: 1,
    explanation: "Appuyer sur le marteau de RAZ alors que la bascule d'embrayage est en prise force les pignons et risque de casser le bec de commande."
  },
  {
    id: 7,
    category: "Angle de Levée Witschi",
    question: "Quel est l'angle de levée officiel à configurer sur le Witschi pour un calibre ETA Valjoux 7750 ?",
    options: ["49°", "50°", "52°", "56°"],
    correctAnswer: 2,
    explanation: "Le 7750 est calibré à 52° d'angle de levée (contrairement à l'ETA 2824-2 qui est à 50°)."
  },
  {
    id: 8,
    category: "Barillet & Bride Glissante",
    question: "Quelle graisse graphitée est indispensable sur la paroi du tambour pour la bride glissante automatique ?",
    options: ["Moebius 8217", "Moebius 9010", "Huile de vaseline", "Moebius 9415"],
    correctAnswer: 0,
    explanation: "La Moebius 8217 apporte la friction visqueuse contrôlée pour permettre le glissement de la bride sans à-coups à plein armage."
  },
  {
    id: 9,
    category: "Antichoc Incabloc",
    question: "Quelle proportion de surface la goutte de 9010 doit-elle occuper sur le contre-pivot de balancier ?",
    options: ["100% de la surface", "1/3 à 1/2 du diamètre", "Moins de 10%", "Aucune, on huile la chatonnière"],
    correctAnswer: 1,
    explanation: "Une goutte couvrant 1/3 à 1/2 de la pierre assure une réserve de 3 à 5 ans sans risque de débordement par capillarité."
  },
  {
    id: 10,
    category: "Polissage & Satinage",
    question: "Pourquoi applique-t-on du ruban polyimide Kapton lors du polissage d'un chanfrein de corne ?",
    options: [
      "Pour accélérer la rotation du feutre",
      "Pour protéger le satiné adjacent et préserver une arête vive franche",
      "Pour nettoyer les résidus de pâte Dialux",
      "Pour refroidir l'acier inoxydable 316L"
    ],
    correctAnswer: 1,
    explanation: "Le ruban Kapton résiste à la friction et empêche le disque de polissage de mordre sur le grain droit satiné, évitant l'arête savonnée."
  }
];

function DefiChronometreContent() {
  const searchParams = useSearchParams();

  // Rival / Duel mode parameters
  const isDuel = searchParams.get("duel") === "1" || searchParams.get("duel") === "true";
  const challengerName = searchParams.get("challenger") || "Confrère d'Établi";
  const targetScore = parseInt(searchParams.get("score") || "10", 10);
  const targetTime = parseFloat(searchParams.get("time") || "45.0");

  // Game state
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsedTenths, setElapsedTenths] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [customName, setCustomName] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Chronometer timer loop
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setElapsedTenths((prev) => prev + 1);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setCurrentIdx(0);
    setScore(0);
    setElapsedTenths(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleSelectAnswer = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === QUESTION_BANK[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIdx + 1 < QUESTION_BANK.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setGameState("finished");
      }
    }, 1100);
  };

  const finalTimeSec = (elapsedTenths / 10).toFixed(1);

  const generateShareLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.horlolearn.ch";
    const name = encodeURIComponent(customName.trim() || "Un Horloger");
    return `${origin}/pratique/defi-chronometre?duel=1&challenger=${name}&score=${score}&time=${finalTimeSec}`;
  };

  const shareOnWhatsApp = () => {
    const link = generateShareLink();
    const text = `⏱️ Défi d'Établi HorloLearn relevé ! J'ai fait ${score}/10 en ${finalTimeSec}s sur l'épreuve de Haute Horlogerie Suisse. Peux-tu battre mon chrono ? Relever le défi : ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyShareLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const curQ = QUESTION_BANK[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-800 dark:text-slate-200 antialiased selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200 transition-colors duration-300">
      
      {/* ESPACEMENT SOUS LA NAVBAR FLOTTANTE DE HORLOLEARN */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center justify-between text-xs font-mono shadow-sm">
          <Link
            href="/pratique"
            className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Ateliers</span>
          </Link>
          <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Défi Chronométré d&apos;Établi · 10 Questions sous Pression</span>
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* DUEL CHALLENGE BANNER (If link received from a friend) */}
        {isDuel && gameState === "intro" && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-100/60 to-white dark:from-amber-500/20 dark:via-slate-900 dark:to-amber-500/10 border-2 border-amber-500 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400 block tracking-wider">
                  Défi Reçu !
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {challengerName} vous met au défi !
                </h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                  Objectif à battre : <strong className="text-amber-700 dark:text-amber-400">{targetScore}/10</strong> en moins de <strong className="text-cyan-700 dark:text-cyan-400">{targetTime}s</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shrink-0"
            >
              Accepter le Défi
            </button>
          </div>
        )}

        {/* 1. ÉCRAN D'ACCUEIL AVEC SCHÉMA D'ÉTABLI SVG */}
        {gameState === "intro" && (
          <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 text-center space-y-6 shadow-xl">
            
            {/* Visualiseur SVG Atelier sous pression */}
            <div className="w-full max-w-md mx-auto aspect-[16/9] bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 400 220" className="w-full h-full select-none">
                <defs>
                  <linearGradient id="goldChronoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5c35b" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#aa7c11" />
                  </linearGradient>
                </defs>

                {/* Cadran de Chronomètre d'Atelier */}
                <circle cx="200" cy="110" r="85" fill="#0f172a" stroke="url(#goldChronoGrad)" strokeWidth="4" />
                <circle cx="200" cy="110" r="75" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Index 12, 3, 6, 9 */}
                <rect x="198" y="32" width="4" height="12" fill="#e2b44f" />
                <rect x="198" y="176" width="4" height="12" fill="#e2b44f" />
                <rect x="122" y="108" width="12" height="4" fill="#e2b44f" />
                <rect x="266" y="108" width="12" height="4" fill="#e2b44f" />

                {/* Aiguille centrale animée */}
                <line x1="200" y1="110" x2="235" y2="65" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="200" cy="110" r="5" fill="#f43f5e" />

                {/* Poussoir chrono haut */}
                <rect x="192" y="15" width="16" height="10" rx="2" fill="#94a3b8" />
                <rect x="196" y="8" width="8" height="7" fill="#cbd5e1" />

                <text x="140" y="145" fill="#94a3b8" fontSize="11" fontFamily="monospace">TEST RÉFÉRENTIEL</text>
                <text x="150" y="160" fill="#e2b44f" fontSize="12" fontWeight="bold" fontFamily="monospace">NIHS &amp; SUISSE</text>
              </svg>
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
                Défi d&apos;Établi : Test Chronométré
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                10 questions pointues de véritable horloger d&apos;établi (tribologie Moebius, échappement, couples cNm, Witschi, usinage NIHS). Le chrono tourne : précision, sang-froid et zéro bavure.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Questions</span>
                <strong className="text-sm sm:text-base text-slate-900 dark:text-white">10 Défis</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Chrono</span>
                <strong className="text-sm sm:text-base text-amber-500">Temps Réel</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Partage</span>
                <strong className="text-sm sm:text-base text-cyan-500">Lien WhatsApp</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider transition shadow-xl hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Lancer le Chronomètre</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. ÉCRAN DU QUIZ SOUS PRESSION */}
        {gameState === "playing" && (
          <div className="space-y-6">
            
            {/* Top Game HUD Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">
                  Question {currentIdx + 1} / {QUESTION_BANK.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 uppercase text-[10px]">{curQ.category}</span>
              </div>

              {isDuel && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
                  <Swords className="w-3.5 h-3.5 text-amber-400" />
                  <span>Objectif : {targetScore}/10</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                {streak > 1 && (
                  <span className="px-2 py-0.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center gap-1 text-[11px] font-bold animate-pulse">
                    <Flame className="w-3 h-3" />
                    <span>Série x{streak}</span>
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-base font-bold text-amber-400">
                  <Timer className="w-4 h-4 animate-spin" />
                  <span>{finalTimeSec}s</span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                {curQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                {curQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === curQ.correctAnswer;

                  let btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200";

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold";
                    } else {
                      btnStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition shadow-sm ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerChecked && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />}
                      {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUESTION_BANK.length) * 100}%` }}
                />
              </div>
            </div>

          </div>
        )}

        {/* 3. ÉCRAN DES RÉSULTATS & DUEL WHATSAPP */}
        {gameState === "finished" && (
          <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 text-center space-y-6 shadow-xl">
            <div className="space-y-3">
              <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-md">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                Épreuve d&apos;Établi Terminée !
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Résultats officiels selon le référentiel suisse HorloLearn
              </p>
            </div>

            {/* Score & Time Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto font-mono">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Score Précision</span>
                <strong className={`text-2xl sm:text-3xl font-bold ${score >= 8 ? "text-emerald-500" : score >= 5 ? "text-amber-500" : "text-rose-500"}`}>
                  {score} / 10
                </strong>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Chronomètre</span>
                <strong className="text-2xl sm:text-3xl font-bold text-cyan-500">
                  {finalTimeSec}s
                </strong>
              </div>
            </div>

            {/* Duel Verdict if Rival Link */}
            {isDuel && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-xs font-mono">
                {score > targetScore || (score === targetScore && parseFloat(finalTimeSec) < targetTime) ? (
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>Victoire éclatante ! Vous avez battu {challengerName} !</span>
                  </div>
                ) : (
                  <div className="text-rose-700 dark:text-rose-400 font-bold flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>{challengerName} conserve le titre. Retentez votre chance !</span>
                  </div>
                )}
              </div>
            )}

            {/* Share / Duel Box */}
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-4 text-left font-mono">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs uppercase font-bold text-slate-900 dark:text-white">
                  Défier un Ami ou un Confrère d&apos;Établi
                </h3>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Générez un lien défi avec votre score ({score}/10 en {finalTimeSec}s). Votre ami devra répondre aux mêmes questions et tenter de battre votre chrono !
              </p>

              <input
                type="text"
                placeholder="Votre prénom ou pseudo d'horloger"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={shareOnWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Défier sur WhatsApp</span>
                </button>
                <button
                  onClick={copyShareLink}
                  className="py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Lien Copié !" : "Copier le Lien"}</span>
                </button>
              </div>
            </div>

            {/* Restart Button */}
            <div className="pt-2">
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-mono font-bold text-xs transition shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recommencer une manche</span>
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default function DefiChronometrePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-amber-400 font-mono text-xs">
        Chargement du Défi d&apos;Établi...
      </div>
    }>
      <DefiChronometreContent />
    </Suspense>
  );
}
