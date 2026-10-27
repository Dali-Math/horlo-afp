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
  ChevronRight
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
    category: "Huilage",
    question: "Quelle huile certifiée Moebius s'applique EXCLUSIVEMENT sur les palettes de l'ancre suisse ?",
    options: ["Moebius 9010", "Moebius 9415 (ou 941)", "Moebius HP-1300", "Moebius 8217"],
    correctAnswer: 1,
    explanation: "La Moebius 9415 est une graisse/huile thixotrope conçue pour rester sur le plan d'impulsion des levées sans gicler sur le dard ni les cornes."
  },
  {
    id: 2,
    category: "Échappement",
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
    category: "Couples cNm",
    question: "Quel est le couple de serrage standard de la vis de masse oscillante sur un calibre ETA 2824-2 ?",
    options: ["0.8 cNm", "1.2 cNm", "2.0 à 2.5 cNm", "4.5 cNm"],
    correctAnswer: 2,
    explanation: "La vis de rotor automatique subit des accélérations continues ; son couple préconisé selon la norme NIHS est de 2.0 à 2.5 cNm."
  },
  {
    id: 4,
    category: "Witschi",
    question: "Sur un chrono-comparateur Witschi, quelle est la limite maximale d'erreur de repère (Beat Error) tolérée ?",
    options: ["0.4 ms (max 0.6 ms)", "1.5 ms", "2.2 ms", "0.01 ms"],
    correctAnswer: 0,
    explanation: "Un repère au-delà de 0.4 ms révèle une cheville de plateau décentrée par rapport à l'axe de la ligne de centres, réduisant la réserve de marche."
  },
  {
    id: 5,
    category: "Micromécanique",
    question: "Pour un filetage horloger NIHS S 0.90 (pas 0.225 mm), quel est le diamètre du foret avant-trou ?",
    options: ["Ø 0.50 mm", "Ø 0.68 mm", "Ø 0.85 mm", "Ø 0.90 mm"],
    correctAnswer: 1,
    explanation: "Formule fondamentale d'avant-trou : Foret = D − P = 0.90 − 0.225 = 0.675 mm, soit un foret étalonné de Ø 0.68 mm."
  },
  {
    id: 6,
    category: "Chronographe",
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
    category: "Witschi",
    question: "Quel est l'angle de levée officiel à configurer sur le Witschi pour un calibre ETA Valjoux 7750 ?",
    options: ["49°", "50°", "52°", "56°"],
    correctAnswer: 2,
    explanation: "Le 7750 est calibré à 52° d'angle de levée (contrairement à l'ETA 2824-2 qui est à 50°)."
  },
  {
    id: 8,
    category: "Huilage",
    question: "Quelle graisse graphitée est indispensable sur la paroi du tambour pour la bride glissante automatique ?",
    options: ["Moebius 8217", "Moebius 9010", "Huile de vaseline", "Moebius 9415"],
    correctAnswer: 0,
    explanation: "La Moebius 8217 apporte la friction visqueuse contrôlée pour permettre le glissement de la bride sans à-coups à plein armage."
  },
  {
    id: 9,
    category: "Incabloc",
    question: "Quelle proportion de surface la goutte de 9010 doit-elle occuper sur le contre-pivot de balancier ?",
    options: ["100% de la surface", "1/2 à 2/3 du diamètre", "Moins de 10%", "Aucune, on huile la chatonnière"],
    correctAnswer: 1,
    explanation: "Une goutte couvrant 1/2 à 2/3 de la pierre assure une réserve de 3 à 5 ans sans risque de débordement par capillarité."
  },
  {
    id: 10,
    category: "Polissage",
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

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === QUESTION_BANK[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    // Advance rapidly after 750ms to maintain game speed
    setTimeout(() => {
      if (currentIdx + 1 < QUESTION_BANK.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setGameState("finished");
      }
    }, 850);
  };

  const formatSeconds = (tenths: number) => {
    return (tenths / 10).toFixed(1);
  };

  const finalTimeSec = +(elapsedTenths / 10).toFixed(1);
  const isVictoryAgainstRival = isDuel && (score > targetScore || (score === targetScore && finalTimeSec < targetTime));

  const generateShareLink = () => {
    const name = customName.trim() || "Un passionné";
    if (typeof window !== "undefined") {
      return `${window.location.origin}/pratique/defi-chronometre?duel=1&challenger=${encodeURIComponent(name)}&score=${score}&time=${finalTimeSec}`;
    }
    return `https://horlolearn.ch/pratique/defi-chronometre?duel=1&challenger=${encodeURIComponent(name)}&score=${score}&time=${finalTimeSec}`;
  };

  const shareOnWhatsApp = () => {
    const link = generateShareLink();
    const text = `⏱️ Défi d'Établi HorloLearn relevé ! J'ai fait ${score}/10 en ${finalTimeSec}s sur l'épreuve de Haute Horlogerie. Peux-tu battre mon chrono ? Relever le défi : ${link}`;
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
      {/* Top Banner */}
      <div className="bg-white/95 dark:bg-[#0c1322]/90 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link
            href="/pratique"
            className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Ateliers</span>
          </Link>
          <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Défi Chronométré d&apos;Établi · 10 Questions sous Pression
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* DUEL CHALLENGE BANNER (If link received from a friend) */}
        {isDuel && gameState === "intro" && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border-2 border-amber-500 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 block tracking-wider">
                  ⚔️ Défi Reçu d&apos;un Confrère !
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  <strong>{challengerName}</strong> vous défie à l&apos;établi
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Objectif à battre : <strong className="text-amber-400">{targetScore}/10</strong> en moins de <strong className="text-cyan-400">{targetTime}s</strong> !
                </p>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              Relever le Défi Maintenant
            </button>
          </div>
        )}

        {/* 1. INTRO SCREEN */}
        {gameState === "intro" && (
          <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-2xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Timer className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
                Le Défi Chronométré de l&apos;Artisan
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                10 questions pointues d&apos;établi (huilage Moebius, couples cNm, diagnostic Witschi, tolérances NIHS). Votre chronomètre tourne au dixième de seconde.
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

            <div className="pt-4">
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
              >
                ⚡ Lancer le Défi Chronométré
              </button>
            </div>
          </div>
        )}

        {/* 2. PLAYING SCREEN */}
        {gameState === "playing" && (
          <div className="space-y-6">
            {/* Live Telemetry Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono shadow-xl text-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">
                  Question {currentIdx + 1} / {QUESTION_BANK.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 uppercase text-[10px]">{curQ.category}</span>
              </div>

              {/* Ghost / Rival Target */}
              {isDuel && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-[11px]">
                  <Swords className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rival ({challengerName}) : <strong>{targetTime}s</strong></span>
                </div>
              )}

              {/* Live Stopwatch */}
              <div className="flex items-center gap-3">
                {streak > 1 && (
                  <span className="px-2 py-0.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[11px] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Série ×{streak}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-base font-bold text-amber-400">
                  <Timer className="w-4 h-4 animate-spin" />
                  <span>{formatSeconds(elapsedTenths)} s</span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                {curQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                {curQ.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === curQ.correctAnswer;

                  let btnStyle = "bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-500/60";

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20 scale-[1.01]";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-500 text-white border-rose-400 font-bold";
                    } else {
                      btnStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-150 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                      {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUESTION_BANK.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 3. FINISHED SCREEN */}
        {gameState === "finished" && (
          <div className="rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-2xl space-y-8 text-center font-mono">
            {/* Victory / Defeat Header */}
            <div className="space-y-3">
              <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-xl">
                <Trophy className="w-12 h-12" />
              </div>

              {isDuel ? (
                isVictoryAgainstRival ? (
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                      🏆 VICTOIRE ÉCLATANTE SUR L&apos;ÉTABLI !
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">
                      Vous avez battu {challengerName} !
                    </h2>
                    <p className="text-xs text-slate-400">
                      Votre chrono de {finalTimeSec}s surclasse le temps de {targetTime}s !
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                      ⚔️ Défi Terminé !
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">
                      {challengerName} conserve une légère avance
                    </h2>
                    <p className="text-xs text-slate-400">
                      Revanche conseillée pour passer sous les {targetTime}s !
                    </p>
                  </div>
                )
              ) : (
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                    {score === 10 ? "Maître Régleur de Haute Horlogerie !" : score >= 8 ? "Excellent Établi Horloger !" : "Bonne Pratique, Persévérez !"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Bilan chronométré de l&apos;épreuve d&apos;atelier
                  </p>
                </div>
              )}
            </div>

            {/* Score & Time Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Score Final</span>
                <span className="text-3xl font-bold text-amber-500">{score} / 10</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Temps Total</span>
                <span className="text-3xl font-bold text-cyan-400">{finalTimeSec} s</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Meilleure Série</span>
                <span className="text-3xl font-bold text-orange-400">×{maxStreak}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Vitesse Moyenne</span>
                <span className="text-3xl font-bold text-emerald-400">{(finalTimeSec / 10).toFixed(1)} s/Q</span>
              </div>
            </div>

            {/* Duel Generator & WhatsApp Sharing Box */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 max-w-xl mx-auto space-y-4 text-left">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <Share2 className="w-4 h-4" />
                <span>Défier un ami ou un confrère horloger</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Envoyez un lien direct sur WhatsApp : votre ami devra affronter les mêmes 10 questions avec votre chrono ({finalTimeSec}s) en fantôme !
              </p>

              <div>
                <label className="block text-[10px] uppercase text-slate-400 mb-1">Votre Prénom / Pseudo :</label>
                <input
                  type="text"
                  placeholder="Ex : Marc, Sébastien..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={shareOnWhatsApp}
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Défier sur WhatsApp</span>
                </button>

                <button
                  onClick={copyShareLink}
                  className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? "Lien copié !" : "Copier le Lien"}</span>
                </button>
              </div>
            </div>

            {/* Play Again Button */}
            <div className="pt-2">
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs transition"
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
        Chargement du Défi d'Établi...
      </div>
    }>
      <DefiChronometreContent />
    </Suspense>
  );
}
