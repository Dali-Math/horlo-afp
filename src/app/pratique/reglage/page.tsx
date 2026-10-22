// src/app/pratique/reglage/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Wrench,
  Gauge,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  SlidersHorizontal,
  Activity,
  Award,
  BookOpen,
  Volume2
} from 'lucide-react';

interface PositionData {
  id: string;
  name: string;
  short: string;
  description: string;
  rateOffset: number; // Décalage naturel de marche dû aux frottements (s/j)
  ampOffset: number;  // Décalage d'amplitude (degrés)
}

const POSITIONS: PositionData[] = [
  {
    id: 'CH',
    name: 'Cadran Haut (Dial Up)',
    short: 'CH',
    description: 'Montre posée à plat sur le fond. Frottement minimal sur le bout du pivot inférieur.',
    rateOffset: 0,
    ampOffset: 0
  },
  {
    id: 'CB',
    name: 'Cadran Bas (Dial Down)',
    short: 'CB',
    description: 'Montre retournée, cadran contre l’établi. Frottement sur le contre-pivot supérieur.',
    rateOffset: +1,
    ampOffset: -4
  },
  {
    id: '6H',
    name: 'Couronne Gauche / 6H Bas (Crown Left)',
    short: '6H',
    description: 'Position verticale usuelle au poignet. Les pivots frottent sur leurs flancs.',
    rateOffset: -4,
    ampOffset: -38
  },
  {
    id: '9H',
    name: 'Couronne Haute / 9H Bas (Crown Up)',
    short: '9H',
    description: 'Position verticale tête en bas. Frottements radiaux accrus sur l’axe du balancier.',
    rateOffset: -3,
    ampOffset: -42
  },
  {
    id: '3H',
    name: 'Couronne Basse / 3H Bas (Crown Down)',
    short: '3H',
    description: 'Bras le long du corps en marche. Position classique d’évaluation du COSC.',
    rateOffset: -5,
    ampOffset: -40
  }
];

export default function ReglagePage() {
  // --- ÉTAT DU SIMULATEUR DE CHRONOCOMPARATEUR ---
  const [selectedCalibre, setSelectedCalibre] = useState<'6497' | '2824'>('6497');
  const [activePosition, setActivePosition] = useState<PositionData>(POSITIONS[0]);

  // Réglages manuels de l'horloger (sur l'établi)
  const [raquetteOffset, setRaquetteOffset] = useState<number>(+8); // en s/j (+ = avance, - = retard)
  const [portePitonOffset, setPortePitonOffset] = useState<number>(1.2); // en ms (défaut de repère)
  const [powerReserve, setPowerReserve] = useState<number>(100); // % de remontage du barillet
  const [isLiftAngle, setIsLiftAngle] = useState<number>(50); // 50° pour 6497, 52° pour 2824

  // Quiz existant conservé et amélioré
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null
  });

  const questions = [
    {
      question: 'Quelle est la fonction principale du spiral dans le réglage d’une montre ?',
      options: [
        'Maintenir le barillet en place',
        'Réguler la fréquence d’oscillation du balancier',
        'Lubrifier les pivots d’échappement',
        'Protéger contre les chocs violents'
      ],
      correct: 1
    },
    {
      question: 'Qu’est-ce que l’amplitude dans le réglage horloger sur chronocomparateur ?',
      options: [
        'L’angle de rotation maximale du balancier par rapport à son point mort',
        'La vitesse linéaire de déplacement de la trotteuse',
        'La force du ressort moteur dans le barillet',
        'Le poids total du balancier en milligrammes'
      ],
      correct: 0
    },
    {
      question: 'Pour ajuster la marche d’une montre qui avance (+15 s/j), il faut :',
      options: [
        'Déplacer la raquette pour rallonger la longueur active du spiral (vers R)',
        'Raccourcir le spiral pour accélérer les alternances (vers A)',
        'Augmenter la tension du ressort de cliquet',
        'Retirer l’huile de l’échappement'
      ],
      correct: 0
    }
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  // --- CALCULS DU CHRONOCOMPARATEUR EN TEMPS RÉEL ---
  const currentRate = useMemo(() => {
    // Marche = réglage raquette + influence gravitationnelle de la position
    return raquetteOffset + activePosition.rateOffset;
  }, [raquetteOffset, activePosition]);

  const currentBeatError = useMemo(() => {
    // Repère = réglage porte-piton
    return Math.max(0, portePitonOffset);
  }, [portePitonOffset]);

  const currentAmplitude = useMemo(() => {
    // Amplitude de base selon calibre (295° pour 6497, 305° pour 2824)
    const baseAmp = selectedCalibre === '6497' ? 295 : 305;
    // Influence de la réserve de marche : 100% = max, 20% = chute de 50°
    const reserveLoss = (100 - powerReserve) * 0.7;
    // Décalage de position verticale/horizontale
    const positionLoss = activePosition.ampOffset;
    // Si repère est très mauvais (> 2ms), l'amplitude chute aussi
    const beatLoss = currentBeatError > 1.5 ? (currentBeatError - 1.5) * 12 : 0;

    return Math.round(Math.max(160, baseAmp - reserveLoss + positionLoss - beatLoss));
  }, [selectedCalibre, powerReserve, activePosition, currentBeatError]);

  // Diagnostic automatique
  const diagnostic = useMemo(() => {
    const isCoscRate = currentRate >= -4 && currentRate <= +6;
    const isGoodAmplitude = currentAmplitude >= 220 && currentAmplitude <= 315;
    const isGoodBeat = currentBeatError <= 0.6;

    if (currentAmplitude > 320) {
      return {
        status: 'danger',
        label: 'Rebattement Critique (Knocking)',
        advice: 'L’amplitude dépasse 320° : la cheville de plateau tape l’extérieur des cornes de l’ancre ! Risque de casse.'
      };
    }
    if (currentAmplitude < 200) {
      return {
        status: 'warning',
        label: 'Amplitude Insuffisante (< 200°)',
        advice: 'Frottements anormaux, huile gommée ou ressort détendu. Vérifier les contre-pivots et l’échappement.'
      };
    }
    if (currentBeatError > 1.5) {
      return {
        status: 'warning',
        label: 'Défaut de Repère Majeur (> 1.5 ms)',
        advice: 'Le balancier n’est pas au point mort au repos. Déplacez le porte-piton pour rapprocher les deux lignes.'
      };
    }
    if (isCoscRate && isGoodAmplitude && isGoodBeat) {
      return {
        status: 'success',
        label: 'Précision Chronomètre Conforme COSC',
        advice: 'Marche et amplitude exemplaires. Votre réglage respecte les tolérances officielles de la Haute Horlogerie suisse.'
      };
    }
    return {
      status: 'neutral',
      label: 'Réglage Atelier en cours',
      advice: 'Ajustez la raquette pour ramener la marche entre 0 et +4 s/j et minimiser le défaut de repère sous 0.5 ms.'
    };
  }, [currentRate, currentAmplitude, currentBeatError]);

  // Générer une panne aléatoire pour s'entraîner
  const handleRandomFault = () => {
    const faults = [
      { rate: -28, beat: 2.4, name: 'Retard fort + défaut de repère' },
      { rate: +34, beat: 0.3, name: 'Forte avance (+34 s/j)' },
      { rate: -14, beat: 3.1, name: 'Défaut de repère critique (3.1 ms)' },
      { rate: +2, beat: 0.2, name: 'Calibre déjà presque parfait' }
    ];
    const picked = faults[Math.floor(Math.random() * faults.length)];
    setRaquetteOffset(picked.rate);
    setPortePitonOffset(picked.beat);
  };

  const handleResetToIdeal = () => {
    setRaquetteOffset(+2);
    setPortePitonOffset(0.1);
    setPowerReserve(100);
    setActivePosition(POSITIONS[0]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Atelier Pratique</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Gauge className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Métrologie & Chronométrie d’Atelier</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Réglage de Précision &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Chronocomparateur
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Apprenez à maîtriser le réglage fin d’un mouvement horloger mécanique. Ajustez la marche avec la raquette, équilibrez le repère avec le porte-piton, et observez le tracé acoustique instantané sur 5 positions officielles.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleRandomFault}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Simuler une Panne Aléatoire</span>
              </button>
              <button
                onClick={handleResetToIdeal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-amber-500 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION PRINCIPALE : LE CHRONOCOMPARATEUR INTERACTIF --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl dark:shadow-2xl dark:shadow-black/70 ring-1 ring-slate-900/5 dark:ring-white/10 space-y-8">
          {/* En-tête de l'appareil */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>HorloChronoscope Pro V3</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Microphone Actif
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Émulateur officiel d’atelier d’apprentissage suisse • Écran acoustique temps réel
                </p>
              </div>
            </div>

            {/* Choix du Calibre */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Calibre :</span>
              <button
                onClick={() => {
                  setSelectedCalibre('6497');
                  setIsLiftAngle(50);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCalibre === '6497'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Unitas 6497-1 (21’600 A/h)
              </button>
              <button
                onClick={() => {
                  setSelectedCalibre('2824');
                  setIsLiftAngle(52);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCalibre === '2824'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                ETA 2824-2 (28’800 A/h)
              </button>
            </div>
          </div>

          {/* --- ÉCRAN LCD PHOSPHORESCENT DU CHRONOCOMPARATEUR --- */}
          <div className="rounded-3xl bg-[#07120e] border-4 border-slate-800 p-6 sm:p-8 text-emerald-400 font-mono shadow-2xl relative overflow-hidden">
            {/* Grille millimétrée de fond */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Méta-affichage supérieur */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-emerald-900/60 relative z-10 text-center sm:text-left">
              <div>
                <div className="text-[11px] text-emerald-600 uppercase tracking-widest font-sans font-bold">
                  Marche Quotidienne (Rate)
                </div>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
                    currentRate === 0
                      ? 'text-emerald-400'
                      : currentRate > 0
                      ? 'text-yellow-400'
                      : 'text-amber-400'
                  }`}
                >
                  {currentRate > 0 ? `+${currentRate}` : currentRate}
                  <span className="text-sm font-normal text-emerald-500 ml-1">s/j</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-emerald-600 uppercase tracking-widest font-sans font-bold">
                  Amplitude Balancier
                </div>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
                    currentAmplitude >= 220 && currentAmplitude <= 315
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {currentAmplitude}
                  <span className="text-sm font-normal text-emerald-500 ml-1">°</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-emerald-600 uppercase tracking-widest font-sans font-bold">
                  Défaut de Repère (Beat Error)
                </div>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
                    currentBeatError <= 0.6 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {currentBeatError.toFixed(1)}
                  <span className="text-sm font-normal text-emerald-500 ml-1">ms</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-emerald-600 uppercase tracking-widest font-sans font-bold">
                  Angle de Levée & Pos
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-emerald-300">
                  {isLiftAngle}° <span className="text-yellow-400 text-sm">[{activePosition.short}]</span>
                </div>
                <div className="text-[10px] text-emerald-600">
                  {selectedCalibre === '6497' ? '21’600 A/h' : '28’800 A/h'}
                </div>
              </div>
            </div>

            {/* --- TRACÉ ACOUSTIQUE DES POINTS (SIMULATION D'ÉCRAN WITSCHI) --- */}
            <div className="py-8 relative z-10 h-44 sm:h-52 flex flex-col justify-center">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Ligne médiane de repère zéro */}
                <div className="absolute w-full h-[1px] bg-emerald-500/20" />

                {/* Simulation des deux rubans de points acoustiques */}
                <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                  {/* Pente calculée en fonction de la marche (+ = monte, - = descend) */}
                  {/* Écart calculé en fonction du beat error (0ms = 1 ligne fusionnée, >0 = 2 lignes écartées) */}
                  {(() => {
                    const slope = -currentRate * 0.8; // inversion SVG
                    const spread = Math.min(35, currentBeatError * 14); // écart entre les 2 alternances
                    const yCenter = 60;

                    const points1: string[] = [];
                    const points2: string[] = [];

                    for (let x = 0; x <= 600; x += 15) {
                      const yBase = yCenter + (x - 300) * (slope / 300);
                      // Micro-bruit réaliste du balancier
                      const noise = Math.sin(x * 0.4) * 1.2;
                      points1.push(`${x},${yBase - spread / 2 + noise}`);
                      points2.push(`${x},${yBase + spread / 2 - noise}`);
                    }

                    return (
                      <>
                        {/* Ligne d'alternance Tic */}
                        <polyline
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="2.5"
                          strokeDasharray="3 4"
                          points={points1.join(' ')}
                        />
                        {/* Ligne d'alternance Tac (si repère parfait, se confond) */}
                        <polyline
                          fill="none"
                          stroke={spread < 2 ? '#34d399' : '#10b981'}
                          strokeWidth="2.5"
                          strokeDasharray="3 4"
                          points={points2.join(' ')}
                        />
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-emerald-600/80 pt-2 border-t border-emerald-950">
                <span>← Tracé continu (Fenêtre 30 secondes)</span>
                <span>
                  {currentBeatError <= 0.2
                    ? '✓ Deux lignes parfaitement confondues (Repère optimal)'
                    : `⚠️ Écart de ${currentBeatError.toFixed(1)}ms entre les deux battements (Tic / Tac dissymétriques)`}
                </span>
                <span>Échelle : 1 div = 5 s/j →</span>
              </div>
            </div>

            {/* Bandeau de diagnostic en bas de l'écran */}
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 relative z-10 ${
                diagnostic.status === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                  : diagnostic.status === 'danger'
                  ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                  : 'bg-amber-950/80 border-amber-500/60 text-amber-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {diagnostic.status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold">{diagnostic.label} : </span>
                  <span className="font-normal">{diagnostic.advice}</span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 border border-emerald-800 whitespace-nowrap hidden sm:inline">
                Norme NIHS 95-11
              </span>
            </div>
          </div>

          {/* --- SÉLECTEUR DES 5 POSITIONS OFFICIELLES --- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Sélectionner la Position de Contrôle sur le Support Microphone :
              </label>
              <span className="text-xs text-slate-400">Standard de contrôle chronométrique suisse</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {POSITIONS.map((pos) => {
                const isActive = activePosition.id === pos.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => setActivePosition(pos)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#141a2b] text-slate-600 dark:text-slate-300 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-extrabold text-amber-500">{pos.short}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                        {pos.rateOffset >= 0 ? `+${pos.rateOffset}` : pos.rateOffset}s
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{pos.name}</div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              ℹ️ {activePosition.description}
            </p>
          </div>

          {/* --- CONSOLES D'AJUSTEMENT D'ÉTABLI (RAQUETTE, PORTE-PITON, ARMAGE) --- */}
          <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700/80">
            {/* 1. Ajustement Raquette */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                  Index de Raquette (A / R)
                </span>
                <span className="font-mono font-bold text-xs text-amber-500">
                  {raquetteOffset >= 0 ? `+${raquetteOffset}` : raquetteOffset} s/j
                </span>
              </div>

              <input
                type="range"
                min="-60"
                max="+60"
                step="1"
                value={raquetteOffset}
                onChange={(e) => setRaquetteOffset(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>← R (Retard - Allonger)</span>
                <span>A (Avance - Raccourcir) →</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Modifie la longueur active du spiral. En déplaçant la raquette vers A, le spiral bat plus vite.
              </p>
            </div>

            {/* 2. Ajustement Porte-Piton */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-500" />
                  Porte-Piton (Repère)
                </span>
                <span className="font-mono font-bold text-xs text-amber-500">
                  {portePitonOffset.toFixed(1)} ms
                </span>
              </div>

              <input
                type="range"
                min="0.0"
                max="4.0"
                step="0.1"
                value={portePitonOffset}
                onChange={(e) => setPortePitonOffset(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0.0 ms (Parfait)</span>
                <span>4.0 ms (Défaut fort)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Aligne la cheville de plateau avec l’axe de l’ancre au repos. Annule la boiterie (Beat Error).
              </p>
            </div>

            {/* 3. Armage du Barillet */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Tension du Barillet
                </span>
                <span className="font-mono font-bold text-xs text-amber-500">{powerReserve}%</span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={powerReserve}
                onChange={(e) => setPowerReserve(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>10% (Fin de marche)</span>
                <span>100% (Plein armage)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Simule la perte de couple du ressort moteur après 24 heures et son impact sur l’amplitude.
              </p>
            </div>
          </div>
        </section>

        {/* --- VIDÉO TUTORIEL DE MANUFACTURE & EXPLICATION --- */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Démonstration Vidéo : Le Geste à l’Établi</span>
            </h3>

            <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/HVxT1kQ99kg"
                title="Tutoriel Horlogerie : Comment régler la marche d’un mouvement"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Les Règles d’Or du Maître Régleur</span>
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Toujours régler le repère en premier :</strong> Avant de toucher à la raquette, ramenez le Beat Error en dessous de 0.5 ms à l’aide du porte-piton mobile.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Vérifier l’amplitude minimale :</strong> Une montre mécanique en position verticale (6H, 9H, 3H) ne doit jamais descendre sous 200° d’amplitude après 24 heures.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Garder une avance de sécurité :</strong> En atelier, on privilégie une montre qui avance légèrement (+2 à +5 s/j) plutôt qu’un mouvement qui retarde.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Micro-déplacements :</strong> La raquette se déplace par fractions de dixième de millimètre avec un brunissoir en laiton ou un tournevis adapté sans jamais toucher la serge du balancier.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- MINI-QUIZ D'ÉVALUATION DE RÉGLAGE --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Validation Théorique : Testez vos connaissances
            </h3>
            <span className="text-xs font-bold text-amber-500">3 Questions d’Examen CFC</span>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
                  {qIndex + 1}. {q.question}
                </p>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;

                    let btnStyle =
                      'w-full text-left p-3 rounded-xl transition-all text-xs sm:text-sm font-semibold border ';

                    if (showResult) {
                      if (isCorrect) {
                        btnStyle +=
                          'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md';
                      } else if (isSelected && !isCorrect) {
                        btnStyle +=
                          'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500';
                      } else {
                        btnStyle +=
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    } else {
                      btnStyle +=
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400';
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        disabled={showResult}
                        className={btnStyle}
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
      </main>
    </div>
  );
}
