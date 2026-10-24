'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface StepData {
  step: number;
  partId: string;
  title: string;
  icon: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

const STEPS_DATA: StepData[] = [
  {
    step: 1,
    partId: 'part-1-platine',
    title: '1. Platine Principale Perlée',
    icon: '🪙',
    question: 'Quel est le rôle fondamental de la platine dans un mouvement de montre mécanique ?',
    options: [
      { text: 'Servir de châssis / socle fixe où reposent tous les ponts, rubis et rouages', correct: true },
      { text: 'Accumuler l\'énergie mécanique par compression d\'air comprimé', correct: false },
      { text: 'Afficher la date dans le guichet à 3 heures', correct: false },
      { text: 'Remplacer le balancier par un oscillateur électronique à quartz', correct: false }
    ],
    explanation: 'La platine est la pièce maîtresse du calibre ! C\'est le châssis porteur d\'orfèvrerie sur lequel viennent s\'articuler tous les mobiles, pivots et ponts.'
  },
  {
    step: 2,
    partId: 'part-2-barillet',
    title: '2. Barillet & Rochet de Force',
    icon: '⚙️',
    question: 'Comment le barillet fournit-il son énergie mécanique au mouvement horloger ?',
    options: [
      { text: 'Via un micromoteur piézoélectrique rechargeable par induction', correct: false },
      { text: 'Grâce à un long ressort en acier spiralé (ressort-moteur) enroulé sous tension', correct: true },
      { text: 'Par la gravité exercée par les aiguilles en or massif', correct: false },
      { text: 'En captant les ondes radio horaires de Francfort (DCF77)', correct: false }
    ],
    explanation: 'Bravo ! Le barillet contient le ressort-moteur. Lorsqu\'on remonte la montre, le rochet arme le ressort qui libère progressivement son couple moteur (48h de réserve de marche).'
  },
  {
    step: 3,
    partId: 'part-3-rouages',
    title: '3. Rouage de Finissage',
    icon: '⛓️',
    question: 'Quelle est la fonction essentielle du rouage reliant le barillet à l\'échappement ?',
    options: [
      { text: 'Démultiplier la vitesse de rotation et transmettre l\'énergie vers l\'ancre', correct: true },
      { text: 'Empêcher la montre de prendre l\'eau sous 30 mètres', correct: false },
      { text: 'Changer automatiquement la couleur du cadran le soir', correct: false },
      { text: 'Actionner le chronographe par quartz', correct: false }
    ],
    explanation: 'Exact ! Le rouage (roue de centre, roue moyenne, roue des secondes) multiplie la faible vitesse du barillet pour faire faire un tour en exactement 60 secondes à la roue des secondes.'
  },
  {
    step: 4,
    partId: 'part-4-echappement',
    title: '4. Échappement Suisse & Ancre',
    icon: '⚓',
    question: 'Quel organe donne les fameux « clics » audibles du tic-tac de la montre ?',
    options: [
      { text: 'La boucle ardillon du bracelet en cuir', correct: false },
      { text: 'L\'ancre suisse qui bloque et libère alternativement les dents de la roue d\'échappement', correct: true },
      { text: 'Le verre saphir qui résonne avec la pression atmosphérique', correct: false },
      { text: 'Le logo gravé qui vibre sous l\'effet thermique', correct: false }
    ],
    explanation: 'Fascinant ! À chaque alternance, les palettes en rubis de l\'ancre arrêtent et libèrent les dents de la roue d\'échappement. Ce sont ces micro-chocs qui produisent le tic-tac légendaire !'
  },
  {
    step: 5,
    partId: 'part-5-balancier',
    title: '5. Organe Réglant (Balancier-Spiral)',
    icon: '🌀',
    question: 'Pourquoi dit-on que le balancier-spiral est le « cœur » battant de la montre ?',
    options: [
      { text: 'Il pompe l\'huile de lubrification synthétique vers les rubis', correct: false },
      { text: 'Il dicte la cadence régulière du temps par ses oscillations isochrones', correct: true },
      { text: 'Il s\'arrête automatiquement dès que la montre touche l\'eau', correct: false },
      { text: 'Il génère un champ magnétique pour aligner les aiguilles', correct: false }
    ],
    explanation: 'Magistral ! Le balancier oscille avec une fréquence ultra-stable (ex: 28\'800 alternances/heure = 4 Hz). C\'est lui qui régule la vitesse à laquelle les rouages se détendent.'
  },
  {
    step: 6,
    partId: 'part-6-habillage',
    title: '6. Cadran d\'Émail & Aiguilles Dauphine',
    icon: '⌚',
    question: 'Quelle est la position universelle traditionnelle des aiguilles en vitrine horlogère ?',
    options: [
      { text: '10 heures 10 (qui dessine un sourire équilibré et dégage le logo de Manufacture)', correct: true },
      { text: '12 heures pile', correct: false },
      { text: '6 heures 30', correct: false },
      { text: '4 heures 20', correct: false }
    ],
    explanation: 'Félicitations ! 10h10 forme un V harmonieux, libère la vue sur le logo de marque à 12h et symbolise l\'élégance et la perfection horlogère suisse.'
  }
];

export default function QuizWorkbenchPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [assembledParts, setAssembledParts] = useState<number[]>([]);
  const [isSkeletonMode, setIsSkeletonMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [secondAngle, setSecondAngle] = useState<number>(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialisation Web Audio
  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Son de brucelles
  const playTweezerClick = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  };

  // Son tic-tac
  const playWatchTick = (isTic: boolean) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const freq = isTic ? 2400 : 2100;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.025);

      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = 5;

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  };

  // Son de carillon de victoire
  const playVictoryChime = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((note, idx) => {
        setTimeout(() => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 1.2);
        }, idx * 280);
      });
    } catch {}
  };

  // Démarrer / arrêter le tic-tac selon le balancier
  useEffect(() => {
    if (assembledParts.includes(5) && !isMuted) {
      if (!tickIntervalRef.current) {
        let tic = false;
        tickIntervalRef.current = setInterval(() => {
          playWatchTick(tic);
          tic = !tic;
        }, 350);
      }
    } else {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    }
    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    };
  }, [assembledParts, isMuted]);

  // Animation trotteuse fluide 60 FPS
  useEffect(() => {
    let currentDeg = 0;
    const animate = () => {
      if (assembledParts.includes(6)) {
        currentDeg = (currentDeg + 0.6) % 360;
        setSecondAngle(currentDeg);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [assembledParts]);

  // Récupérer la progression en local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('horlolearn_workbench_parts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAssembledParts(parsed);
          setCurrentStep(Math.min(parsed.length + 1, 6));
        }
      }
    } catch {}
  }, []);

  // Gestion des réponses
  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (selectedIdx !== null) return;
    playTweezerClick();
    setSelectedIdx(idx);
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      const updated = Array.from(new Set([...assembledParts, currentStep]));
      setAssembledParts(updated);
      try {
        localStorage.setItem('horlolearn_workbench_parts', JSON.stringify(updated));
      } catch {}

      if (currentStep === 6) {
        playVictoryChime();
      }
    } else {
      setTimeout(() => {
        setSelectedIdx(null);
        setIsAnswerCorrect(null);
      }, 1400);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      setSelectedIdx(null);
      setIsAnswerCorrect(null);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAssembledParts([]);
    setIsSkeletonMode(false);
    setSelectedIdx(null);
    setIsAnswerCorrect(null);
    try {
      localStorage.removeItem('horlolearn_workbench_parts');
    } catch {}
  };

  const isComplete = assembledParts.length === 6;
  const currentStepData = STEPS_DATA[currentStep - 1];
  const progressPercent = Math.round((assembledParts.length / 6) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 font-sans pb-24">
      
      {/* STYLES ANIMATIONS & EFFETS HORLOGERS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.35)); }
          50% { filter: drop-shadow(0 0 35px rgba(212, 175, 55, 0.75)); }
        }
        .glow-gold {
          animation: pulseGlow 3s infinite ease-in-out;
        }
        @keyframes balanceOscillation {
          0% { transform: rotate(-38deg); }
          50% { transform: rotate(38deg); }
          100% { transform: rotate(-38deg); }
        }
        .oscillating {
          transform-origin: 250px 250px;
          animation: balanceOscillation 0.35s infinite ease-in-out;
        }
        @keyframes escapeTick {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(30deg); }
        }
        .escape-ticking {
          transform-origin: 240px 340px;
          animation: escapeTick 0.7s steps(2, end) infinite;
        }
        @keyframes palletRock {
          0% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
          100% { transform: rotate(-8deg); }
        }
        .pallet-rocking {
          transform-origin: 240px 340px;
          animation: palletRock 0.35s infinite ease-in-out;
        }
        @keyframes assembleFly {
          0% { transform: scale(1.3) translateY(-30px); opacity: 0; }
          70% { transform: scale(0.96) translateY(3px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .piece-just-added {
          animation: assembleFly 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .bench-mat {
          background: radial-gradient(circle at 50% 50%, #0F172A 0%, #090D16 70%, #030712 100%);
          box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.9), 0 20px 50px rgba(0, 0, 0, 0.8);
        }
      `,
        }}
      />

      {/* HEADER BARRE ATELIER */}
      <div className="w-full border-b border-amber-500/20 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-xs sm:text-sm tracking-[0.22em] text-amber-400 font-bold uppercase font-serif">
              HORLOLEARN · ÉTABLI DU MAÎTRE HORLOGER
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Pièces posées */}
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-amber-500/30 text-xs font-mono">
              <span className="text-slate-400">Calibre HorloLearn :</span>
              <span className="text-amber-400 font-bold">{assembledParts.length} / 6 Pièces</span>
            </div>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400 text-xs font-mono text-slate-300 transition-all"
              title="Activer / Couper le son d'atelier"
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span className="hidden sm:inline">{isMuted ? 'Muet' : 'Son Établi'}</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-rose-950/40 hover:border-rose-500/50 border border-slate-700 text-xs font-mono text-slate-300 transition-all"
              title="Démonter la montre et recommencer"
            >
              <span>↺</span>
              <span className="hidden sm:inline">Démonter</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* TITRE & INTRODUCTION */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            ✦ JEU D&apos;ÉTABLI INTERACTIF · LE DÉFI DU MAÎTRE HORLOGER ✦
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight font-serif">
            Construisez Votre Propre <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Garde-Temps Calibre 101
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Votre établi est vide. À chaque épreuve théorique réussie, débloquez et assemblez un organe vital du mouvement. Au 6ème composant, admirez votre montre prendre vie, battre et égrener le temps sous vos yeux !
          </p>
        </div>

        {/* BARRE DE PROGRESSION DU CALIBRE */}
        <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-6 rounded-2xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
            <span className="font-mono text-amber-400 font-semibold flex items-center gap-2">
              <span>⚙️</span> Progression du Montage d&apos;Établi
            </span>
            <span className="font-mono text-amber-400 font-bold">{progressPercent}% Assemblé</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(245,215,142,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 text-[10px] sm:text-xs font-mono text-center">
            {STEPS_DATA.map((step) => {
              const isDone = assembledParts.includes(step.step);
              const isCurrent = currentStep === step.step && !isDone;
              return (
                <div
                  key={step.step}
                  onClick={() => setCurrentStep(step.step)}
                  className={`p-2 rounded-lg border cursor-pointer transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold scale-[1.03]'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-500'
                  }`}
                >
                  {isDone ? `✓ ${step.title.split('.')[1] || step.title}` : step.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* ZONE DE JEU : ÉTABLI & CARTE DE QUESTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ÉTABLI GAUCHE (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full relative bench-mat rounded-3xl p-6 sm:p-10 border border-amber-500/20 flex flex-col items-center justify-center min-h-[480px] sm:min-h-[560px]">
              
              {/* Commandes haut */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${assembledParts.includes(5) ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {assembledParts.includes(5) ? 'Balancier actif · 4 Hz (28\'800 A/h)' : 'Établi prêt (0 Hz)'}
                  </span>
                </div>

                {assembledParts.includes(6) && (
                  <button
                    onClick={() => setIsSkeletonMode(!isSkeletonMode)}
                    className="px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-[11px] font-mono text-amber-300 transition-all shadow-lg flex items-center gap-1.5"
                  >
                    <span>👁️</span>
                    <span>{isSkeletonMode ? 'Remettre le Cadran' : 'Vue Squelette'}</span>
                  </button>
                )}
              </div>

              {/* LE PORTE-PIÈCE ET LE MOUVEMENT SVG */}
              <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] relative flex items-center justify-center glow-gold">
                <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2D6" />
                      <stop offset="30%" stopColor="#E6C068" />
                      <stop offset="70%" stopColor="#9C7723" />
                      <stop offset="100%" stopColor="#F5D78E" />
                    </linearGradient>

                    <linearGradient id="steelGears" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8FAFC" />
                      <stop offset="40%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>

                    <radialGradient id="ruby" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FF6B8B" />
                      <stop offset="45%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#4C0519" />
                    </radialGradient>

                    <pattern id="perlage" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="8" cy="8" r="7" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.35" />
                      <circle cx="0" cy="0" r="7" fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.25" />
                    </pattern>
                  </defs>

                  {/* 0. Porte-pièce fixe */}
                  <circle cx="250" cy="250" r="236" fill="none" stroke="#1E293B" strokeWidth="6" strokeDasharray="4,8" />
                  <circle cx="250" cy="250" r="226" fill="#0A0E17" stroke="#334155" strokeWidth="2" />

                  {assembledParts.length === 0 && (
                    <g>
                      <text x="250" y="240" fill="#64748B" fontSize="12" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="2">
                        PORTE-PIÈCE VIDE
                      </text>
                      <text x="250" y="265" fill="#D4AF37" fontSize="10" fontFamily="Cinzel, serif" textAnchor="middle" opacity="0.8">
                        ✦ Répondez au Quiz pour assembler ✦
                      </text>
                    </g>
                  )}

                  {/* 1. Platine Principale */}
                  {assembledParts.includes(1) && (
                    <g className="piece-just-added">
                      <circle cx="250" cy="250" r="215" fill="#151922" stroke="url(#goldPlate)" strokeWidth="4" />
                      <circle cx="250" cy="250" r="215" fill="url(#perlage)" opacity="0.8" />
                      <circle cx="180" cy="180" r="54" fill="#0D1117" stroke="#334155" strokeWidth="1.5" />
                      <circle cx="250" cy="250" r="80" fill="#0D1117" stroke="#334155" strokeWidth="1.5" />
                      <circle cx="110" cy="210" r="5" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <circle cx="380" cy="170" r="5" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <circle cx="250" cy="420" r="5" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                      <circle cx="250" cy="250" r="7" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="1" />
                    </g>
                  )}

                  {/* 2. Barillet */}
                  {assembledParts.includes(2) && (
                    <g className="piece-just-added" transform="translate(180, 180)">
                      <circle cx="0" cy="0" r="48" fill="url(#goldPlate)" stroke="#78350F" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="46" fill="none" stroke="#78350F" strokeWidth="2" strokeDasharray="2,3" />
                      <circle cx="0" cy="0" r="34" fill="#1C1917" stroke="url(#goldPlate)" strokeWidth="2" />
                      <line x1="-30" y1="0" x2="30" y2="0" stroke="url(#goldPlate)" strokeWidth="1.5" />
                      <line x1="0" y1="-30" x2="0" y2="30" stroke="url(#goldPlate)" strokeWidth="1.5" />
                      <line x1="-21" y1="-21" x2="21" y2="21" stroke="url(#goldPlate)" strokeWidth="1.5" />
                      <line x1="-21" y1="21" x2="21" y2="-21" stroke="url(#goldPlate)" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="9" fill="url(#steelGears)" stroke="#000" strokeWidth="1" />
                      <circle cx="0" cy="0" r="4.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="0.8" />
                      <text x="0" y="-12" fill="#FDE68A" fontSize="5.5" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">BARILLET</text>
                      <text x="0" y="15" fill="#FDE68A" fontSize="5" fontFamily="JetBrains Mono, monospace" textAnchor="middle">48H RESERVE</text>
                    </g>
                  )}

                  {/* 3. Rouage */}
                  {assembledParts.includes(3) && (
                    <g className="piece-just-added">
                      <circle cx="250" cy="250" r="30" fill="url(#goldPlate)" stroke="#854D0E" strokeWidth="1.5" opacity="0.9" />
                      <circle cx="250" cy="250" r="28" fill="none" stroke="#78350F" strokeWidth="1" strokeDasharray="1.5,2.5" />
                      <g transform="translate(295, 215)">
                        <circle cx="0" cy="0" r="25" fill="none" stroke="url(#goldPlate)" strokeWidth="3" />
                        <circle cx="0" cy="0" r="24" fill="none" stroke="#78350F" strokeWidth="1" strokeDasharray="1.5,2" />
                        <line x1="-24" y1="0" x2="24" y2="0" stroke="url(#goldPlate)" strokeWidth="1.2" />
                        <line x1="0" y1="-24" x2="0" y2="24" stroke="url(#goldPlate)" strokeWidth="1.2" />
                        <circle cx="0" cy="0" r="4" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="0.8" />
                      </g>
                      <g transform="translate(285, 305)">
                        <circle cx="0" cy="0" r="22" fill="none" stroke="url(#goldPlate)" strokeWidth="2.5" />
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="url(#goldPlate)" strokeWidth="1" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="url(#goldPlate)" strokeWidth="1" />
                        <circle cx="0" cy="0" r="4" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="0.8" />
                      </g>
                      <path d="M 230,220 L 335,190 L 345,280 L 250,290 Z" fill="#1E293B" opacity="0.75" stroke="url(#goldPlate)" strokeWidth="1.2" />
                      <circle cx="330" cy="235" r="4" fill="#2563EB" />
                    </g>
                  )}

                  {/* 4. Échappement */}
                  {assembledParts.includes(4) && (
                    <g className="piece-just-added">
                      <g className="escape-ticking">
                        <circle cx="240" cy="340" r="18" fill="none" stroke="url(#steelGears)" strokeWidth="2.5" />
                        <circle cx="240" cy="340" r="17" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2,5" />
                        <circle cx="240" cy="340" r="4" fill="url(#ruby)" />
                      </g>
                      <g className="pallet-rocking">
                        <path d="M 232,352 L 240,340 L 248,352" stroke="#E2E8F0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <line x1="240" y1="340" x2="240" y2="328" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="232" cy="352" r="3.2" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="0.6" />
                        <circle cx="248" cy="352" r="3.2" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="0.6" />
                        <circle cx="240" cy="340" r="2.8" fill="url(#ruby)" />
                      </g>
                    </g>
                  )}

                  {/* 5. Balancier-Spiral */}
                  {assembledParts.includes(5) && (
                    <g className="piece-just-added">
                      <g className="oscillating">
                        <circle cx="250" cy="250" r="74" fill="none" stroke="url(#goldPlate)" strokeWidth="4.5" />
                        <line x1="176" y1="250" x2="324" y2="250" stroke="url(#goldPlate)" strokeWidth="3" />
                        <line x1="250" y1="176" x2="250" y2="324" stroke="url(#goldPlate)" strokeWidth="3" />
                        <circle cx="324" cy="250" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="176" cy="250" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="250" cy="324" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="250" cy="176" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="302" cy="302" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="198" cy="198" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="198" cy="302" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <circle cx="302" cy="198" r="3" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
                        <path d="M 250,250 C 255,248 258,253 257,258 C 255,264 246,266 242,260 C 236,252 240,238 253,235 C 267,231 277,247 274,263 C 270,281 247,290 231,283 C 210,274 205,243 218,225" fill="none" stroke="#3B82F6" strokeWidth="1.4" opacity="0.9" />
                        <circle cx="250" cy="250" r="6" fill="url(#ruby)" stroke="#D4AF37" strokeWidth="1.2" />
                      </g>
                      <path d="M 250,250 L 360,210 L 375,260 L 270,265 Z" fill="#1E293B" opacity="0.65" stroke="url(#goldPlate)" strokeWidth="1.5" />
                      <circle cx="355" cy="235" r="4" fill="#2563EB" />
                    </g>
                  )}

                  {/* 6. Cadran & Aiguilles */}
                  {assembledParts.includes(6) && (
                    <g className="piece-just-added">
                      {!isSkeletonMode && (
                        <g>
                          <path d="M 250,55 A 195 195 0 1 0 250,445 A 195 195 0 1 0 250,55 M 250,170 A 80 80 0 1 1 250,330 A 80 80 0 1 1 250,170" fill="#07090E" fillOpacity="0.92" stroke="url(#goldPlate)" strokeWidth="2.5" fillRule="evenodd" />
                          <circle cx="250" cy="250" r="82" fill="none" stroke="url(#goldPlate)" strokeWidth="2" />
                          <circle cx="250" cy="250" r="86" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2,3" />
                          <circle cx="250" cy="250" r="185" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" strokeDasharray="2,4" />
                          <line x1="250" y1="95" x2="250" y2="70" stroke="#F5D78E" strokeWidth="3.5" strokeLinecap="round" />
                          <line x1="405" y1="250" x2="430" y2="250" stroke="#F5D78E" strokeWidth="3.5" strokeLinecap="round" />
                          <line x1="250" y1="405" x2="250" y2="430" stroke="#F5D78E" strokeWidth="3.5" strokeLinecap="round" />
                          <line x1="95" y1="250" x2="70" y2="250" stroke="#F5D78E" strokeWidth="3.5" strokeLinecap="round" />
                          <text x="250" y="130" fill="#F5D78E" fontSize="12" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold" letterSpacing="3">HORLOLEARN</text>
                          <text x="250" y="145" fill="#94A3B8" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" letterSpacing="2">CHRONOMÈTRE CERTIFIÉ</text>
                          <text x="250" y="375" fill="#D4AF37" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" letterSpacing="2">SWISS MADE</text>
                        </g>
                      )}

                      {/* Aiguille Heures 10h10 */}
                      <g transform="rotate(305 250 250)">
                        <polygon points="250,250 244,242 250,165 256,242" fill="url(#goldPlate)" stroke="#78350F" strokeWidth="0.8" />
                        <polygon points="250,250 250,165 256,242" fill="#9C7723" opacity="0.4" />
                      </g>

                      {/* Aiguille Minutes 10h10 */}
                      <g transform="rotate(58 250 250)">
                        <polygon points="250,250 245,240 250,125 255,240" fill="url(#goldPlate)" stroke="#78350F" strokeWidth="0.8" />
                        <polygon points="250,250 250,125 255,240" fill="#9C7723" opacity="0.4" />
                      </g>

                      {/* Trotteuse centrale rouge fluide 60 FPS */}
                      <g transform={`rotate(${secondAngle} 250 250)`}>
                        <line x1="250" y1="285" x2="250" y2="105" stroke="#E11D48" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="250" cy="250" r="4.5" fill="#E11D48" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="250" cy="130" r="2.8" fill="#E11D48" />
                      </g>
                    </g>
                  )}
                </svg>
              </div>

              {/* Statut sous la montre */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>
                    {isComplete
                      ? '✦ Garde-Temps 100% Assemblé & En Marche ! ✦'
                      : `Étape ${currentStep} sur 6 : Gagnez ${currentStepData.title}`}
                  </span>
                </span>
              </div>

            </div>
          </div>

          {/* COLONNE DROITE (5 COLS) : CARTE DE JEU OU VICTOIRE */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Si terminé et réussi */}
            {isComplete && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border-2 border-amber-400 text-center relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                <div className="text-4xl mb-3">🏆</div>
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold block mb-1">
                  DÉFI HORLOGER ACCOMPLI • ACQUIS D&apos;ÉTABLI VALIDÉS
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                  Félicitations, Passionné d&apos;Horlogerie !
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  Votre Calibre HorloLearn 101 est entièrement assemblé, réglé et bat désormais à la perfection avec une précision de chronomètre certifié.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setIsSkeletonMode(!isSkeletonMode)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono uppercase transition-all shadow-md"
                  >
                    {isSkeletonMode ? 'Voir la Montre Finie ⌚' : 'Examiner le Calibre Squelette 🔍'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold font-mono uppercase transition-all border border-amber-500/30"
                  >
                    Recommencer un Nouveau Montage ↺
                  </button>
                </div>
              </div>
            )}

            {/* Épreuve de pose en cours */}
            {!isComplete && currentStepData && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{currentStepData.icon}</span>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold block">
                        Pièce en jeu :
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                        {currentStepData.title}
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-400/30 text-amber-400 font-mono text-xs font-bold">
                    +100 XP
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Épreuve Théorique de Pose :
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-100 leading-snug">
                    {currentStepData.question}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {currentStepData.options.map((opt, idx) => {
                    const isSelected = selectedIdx === idx;
                    const isAssembled = assembledParts.includes(currentStep);

                    let btnClass = 'w-full p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400 text-left text-sm font-medium transition-all flex items-center justify-between group shadow-md hover:scale-[1.01]';

                    if (isSelected) {
                      if (isAnswerCorrect) {
                        btnClass = 'w-full p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 text-left text-sm font-bold flex items-center justify-between shadow-lg shadow-emerald-500/10';
                      } else {
                        btnClass = 'w-full p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-200 text-left text-sm font-bold flex items-center justify-between';
                      }
                    } else if (isAssembled && opt.correct) {
                      btnClass = 'w-full p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 text-left text-sm font-bold flex items-center justify-between';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedIdx !== null || isAssembled}
                        onClick={() => handleSelectOption(idx, opt.correct)}
                        className={btnClass}
                      >
                        <span className="text-slate-100 group-hover:text-white font-medium">
                          {String.fromCharCode(65 + idx)}. {opt.text}
                        </span>
                        <span className="text-xs font-mono text-slate-400 group-hover:text-amber-400 ml-3 flex-shrink-0">
                          {isAssembled && opt.correct ? 'Posée ✓' : 'Poser →'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {selectedIdx !== null && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-mono leading-relaxed mb-4 ${
                      isAnswerCorrect
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <strong>
                      {isAnswerCorrect
                        ? '✨ EXCELLENT ! PIÈCE VALIDÉE ET INSTALLÉE :'
                        : '❌ MAUVAISE MANIPULATION D\'ÉTABLI :'}
                    </strong>
                    <br />
                    {isAnswerCorrect
                      ? currentStepData.explanation
                      : 'Cette pièce ne peut pas être assemblée ainsi. Réessayez !'}
                  </div>
                )}

                {/* Bouton pièce suivante */}
                {assembledParts.includes(currentStep) && currentStep < 6 && (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-slate-950 font-bold font-serif text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                  >
                    <span>Étape {currentStep + 1} : Poser la pièce suivante</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            )}

            {/* TIROIRS D'ÉTABLI : AUTRES QUIZ HORLOLEARN */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                  Autres Épreuves d&apos;Établi Disponibles :
                </span>
                <span className="text-[10px] font-mono text-slate-500">4 Modes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <Link
                  href="/quiz/yesno-game"
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 border border-slate-700/60 transition-all flex items-center gap-2.5 group"
                >
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-amber-300 block">
                      Défi Éclair Oui/Non
                    </span>
                    <span className="text-[10px] text-slate-400">Vitesse &amp; Réflexes</span>
                  </div>
                </Link>

                <Link
                  href="/quiz-certification"
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 border border-slate-700/60 transition-all flex items-center gap-2.5 group"
                >
                  <span className="text-lg">🎓</span>
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-amber-300 block">
                      Examen Blanc AFP
                    </span>
                    <span className="text-[10px] text-slate-400">Grand Test Officiel</span>
                  </div>
                </Link>

                <Link
                  href="/quiz/mouvement-6497"
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 border border-slate-700/60 transition-all flex items-center gap-2.5 group"
                >
                  <span className="text-lg">🎴</span>
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-amber-300 block">
                      Calibre ETA 6497
                    </span>
                    <span className="text-[10px] text-slate-400">Cartes Mémoire</span>
                  </div>
                </Link>

                <Link
                  href="/quiz-longueurs-horlogerie"
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400/50 border border-slate-700/60 transition-all flex items-center gap-2.5 group"
                >
                  <span className="text-lg">📐</span>
                  <div>
                    <span className="font-bold text-slate-200 group-hover:text-amber-300 block">
                      Calculs &amp; Longueurs
                    </span>
                    <span className="text-[10px] text-slate-400">Métrologie d&apos;Atelier</span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
