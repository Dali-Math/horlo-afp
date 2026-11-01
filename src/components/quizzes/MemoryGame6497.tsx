'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  oil: string;
  color: string;
  img: string;
  svg: string;
}

interface PlayCard extends CardItem {
  uniqueId: number;
  flipped: boolean;
  matched: boolean;
  isFailing?: boolean;
}

interface MemoryGame6497Props {
  onExit?: () => void;
}

const BASE_CARDS: CardItem[] = [
  {
    id: 'balancier',
    name: 'Balancier-Spiral',
    category: 'Régulateur',
    desc: "Oscille à 18'000 A/h (2.5 Hz). Garantit la marche régulière de la montre.",
    oil: 'Moebius 9010 (Contre-pivot Incabloc)',
    color: '#D4AF37',
    img: '/images/quiz/6497/balancier.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="40" stroke="#D4AF37" stroke-width="4"/>
      <line x1="10" y1="50" x2="90" y2="50" stroke="#D4AF37" stroke-width="3"/>
      <line x1="50" y1="10" x2="50" y2="90" stroke="#D4AF37" stroke-width="3"/>
      <circle cx="50" cy="50" r="8" fill="#0B111D" stroke="#D4AF37" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'ancre',
    name: 'Ancre Suisse',
    category: 'Échappement',
    desc: "Verrouille la roue d'échappement et rend une impulsion au balancier.",
    oil: 'Moebius 9415 (Palettes rubis)',
    color: '#EDF0F5',
    img: '/images/quiz/6497/ancre.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <path d="M50 20 L50 82" stroke="#CBD5E1" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M26 36 Q50 48 74 36" stroke="#CBD5E1" stroke-width="4.5"/>
      <rect x="22" y="24" width="7" height="15" rx="1.5" fill="#E0115F" transform="rotate(-25 22 24)"/>
      <rect x="71" y="28" width="7" height="15" rx="1.5" fill="#E0115F" transform="rotate(25 71 28)"/>
    </svg>`
  },
  {
    id: 'echappement',
    name: "Roue d'Échappement",
    category: 'Distribution',
    desc: "15 dents en massue. Distribue l'énergie dent par dent aux palettes.",
    oil: 'Moebius 9415 (Dents) · 9010 (Pivots)',
    color: '#E5C158',
    img: '/images/quiz/6497/roue-echappement.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="34" stroke="#E5C158" stroke-width="2.5" stroke-dasharray="8 6"/>
      <circle cx="50" cy="50" r="8" fill="#0B111D" stroke="#E5C158" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'barillet',
    name: 'Barillet Moteur',
    category: 'Organe Moteur',
    desc: 'Fournit 53 heures de réserve de marche via son ressort hélicoïdal.',
    oil: 'Moebius 8217 (Parois) · HP-1300 (Arbre)',
    color: '#D4AF37',
    img: '/images/quiz/6497/barillet.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="40" stroke="#D4AF37" stroke-width="3" stroke-dasharray="4 2"/>
      <circle cx="50" cy="50" r="14" fill="#05080E" stroke="#D4AF37" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'coq',
    name: 'Pont de Coq',
    category: 'Support',
    desc: 'Supporte le système antichoc Incabloc et la raquette de réglage.',
    oil: 'Moebius 9010 (Pierre contre-pivot)',
    color: '#EDF0F5',
    img: '/images/quiz/6497/pont-balancier.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <path d="M20 75 Q25 40 45 32 Q65 24 82 45 Q88 65 72 78 Q50 82 20 75 Z" fill="#1E293B" stroke="#CBD5E1" stroke-width="3"/>
      <circle cx="62" cy="54" r="5" fill="#E0115F"/>
    </svg>`
  },
  {
    id: 'rochet',
    name: 'Rochet de Barillet',
    category: 'Armage',
    desc: "Monté sur l'arbre de barillet, maintenu par le cliquet de retenue.",
    oil: 'Sous le rochet : Moebius HP-1300 · Dents sèches',
    color: '#CBD5E1',
    img: '/images/quiz/6497/rochet.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="39" stroke="#E2E8F0" stroke-width="3" stroke-dasharray="5 3"/>
      <rect x="44" y="44" width="12" height="12" fill="#05080E" stroke="#CBD5E1" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'tirette',
    name: 'Tirette de Remontoir',
    category: "Mise à l'heure",
    desc: "Positionne la tige pour l'armage ou la mise à l'heure des aiguilles.",
    oil: 'Moebius 9504 (Ergot et gorge)',
    color: '#94A3B8',
    img: '/images/quiz/6497/Tirette.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <path d="M30 65 Q25 45 42 35 Q60 25 75 42 Q72 65 52 68 Q40 70 30 65 Z" fill="#1E293B" stroke="#CBD5E1" stroke-width="3"/>
      <circle cx="42" cy="52" r="4" fill="#1B3EB5"/>
    </svg>`
  },
  {
    id: 'seconde',
    name: 'Roue de Seconde (9h)',
    category: 'Finissage',
    desc: 'Fait 1 tour par minute (60s) et porte la petite trotteuse à 9h.',
    oil: 'Moebius 9010 (Pivots supérieur et inférieur)',
    color: '#D4AF37',
    img: '/images/quiz/6497/mobile-de-seconde.png',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="37" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 2"/>
      <circle cx="50" cy="50" r="8" fill="#475569" stroke="#E2E8F0" stroke-width="2"/>
    </svg>`
  }
];

const MemoryGame6497: React.FC<MemoryGame6497Props> = ({ onExit }) => {
  const [cards, setCards] = useState<PlayCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timer, setTimer] = useState(150);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [lastInfo, setLastInfo] = useState<{ name: string; oil: string } | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    return audioCtxRef.current;
  };

  const playFlipSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio fallback silencieux
    }
  };

  const playMatchSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc2.start(ctx.currentTime + 0.06);
      osc1.stop(ctx.currentTime + 0.26);
      osc2.stop(ctx.currentTime + 0.26);
    } catch {
      // Audio fallback silencieux
    }
  };

  const playErrorSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.10, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio fallback silencieux
    }
  };

  const initGame = () => {
    const doubled: PlayCard[] = [...BASE_CARDS, ...BASE_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        uniqueId: index,
        flipped: false,
        matched: false,
        isFailing: false,
      }));

    setCards(doubled);
    setFlippedIndices([]);
    setMatchedCount(0);
    setMoves(0);
    setScore(0);
    setCombo(0);
    setTimer(150);
    setHasStarted(false);
    setIsLocked(false);
    setShowWin(false);
    setLastInfo(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Chronomètre
  useEffect(() => {
    if (!hasStarted || showWin) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, showWin]);

  const handleCardClick = (idx: number) => {
    if (isLocked) return;
    if (cards[idx].flipped || cards[idx].matched) return;
    if (flippedIndices.includes(idx)) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    playFlipSound();

    const newCards = [...cards];
    newCards[idx].flipped = true;
    setCards(newCards);

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      setMoves((m) => m + 1);

      if (newCards[firstIdx].id === newCards[secondIdx].id) {
        // Paire trouvée
        setIsLocked(true);
        setTimeout(() => {
          playMatchSound();
          const nextCombo = combo + 1;
          const comboBonus = nextCombo > 1 ? nextCombo * 50 : 0;
          const pointsEarned = 100 + comboBonus;

          setCombo(nextCombo);
          setScore((s) => s + pointsEarned);

          const updated = [...newCards];
          updated[firstIdx].matched = true;
          updated[secondIdx].matched = true;
          setCards(updated);
          setFlippedIndices([]);
          setIsLocked(false);

          const nextMatched = matchedCount + 1;
          setMatchedCount(nextMatched);
          setLastInfo({
            name: `${newCards[firstIdx].name} (${newCards[firstIdx].desc})`,
            oil: newCards[firstIdx].oil,
          });

          if (nextMatched === BASE_CARDS.length) {
            setShowWin(true);
          }
        }, 500);
      } else {
        // Erreur
        setIsLocked(true);
        setCombo(0);
        setTimeout(() => {
          playErrorSound();
          const updated = [...newCards];
          updated[firstIdx].isFailing = true;
          updated[secondIdx].isFailing = true;
          setCards(updated);

          setTimeout(() => {
            const resetCards = [...cards];
            resetCards[firstIdx].flipped = false;
            resetCards[secondIdx].flipped = false;
            resetCards[firstIdx].isFailing = false;
            resetCards[secondIdx].isFailing = false;
            setCards(resetCards);
            setFlippedIndices([]);
            setIsLocked(false);
          }, 800);
        }, 400);
      }
    }
  };

  const handleQuit = () => {
    if (onExit) {
      onExit();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/quiz';
    }
  };

  const timeMin = Math.floor(timer / 60);
  const timeSec = timer % 60;
  const timeSpent = 150 - timer;
  const spentMin = Math.floor(timeSpent / 60);
  const spentSec = timeSpent % 60;

  return (
    <div className="w-full flex flex-col justify-between py-1 max-w-[1550px] mx-auto font-sans select-none">
      {/* 1. HUD TOP BAR (Compteurs & Scores - Identique au HTML) */}
      <header className="w-full mb-3">
        <div className="glass-hud p-3 sm:px-6 sm:py-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Titre Horloger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuit}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-rose-950/70 hover:border-rose-500/60 text-slate-300 hover:text-rose-200 border border-slate-700 flex items-center gap-1.5 text-xs font-mono transition"
              title="Quitter le jeu"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Quitter</span>
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/25 to-amber-700/10 border border-amber-500/40 flex items-center justify-center text-lg shadow-inner hidden sm:flex">
              🃏
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-white">
                  MEMORY MASTER ETA 6497
                </h1>
                {combo > 1 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                    Combo x{combo}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Retrouvez les paires de fournitures suisses avant la fin du temps imparti
              </p>
            </div>
          </div>

          {/* Télémétrie de Partie */}
          <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Paires */}
            <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-slate-400">Paires :</span>
              <span className="text-amber-300 font-bold text-sm">{matchedCount} / {BASE_CARDS.length}</span>
            </div>

            {/* Coups */}
            <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-slate-400">Coups :</span>
              <span className="text-cyan-400 font-bold text-sm">{moves}</span>
            </div>

            {/* Score */}
            <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-slate-400">Score :</span>
              <span className="text-amber-400 font-bold text-sm">{score}</span>
            </div>

            {/* Timer */}
            <div className="bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">Temps :</span>
              <span className="text-amber-300 font-bold text-sm">
                {String(timeMin).padStart(2, '0')}:{String(timeSec).padStart(2, '0')}
              </span>
            </div>

            {/* Reset */}
            <button
              onClick={initGame}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
              title="Recommencer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

          </div>

        </div>
      </header>

      {/* 2. GRILLE DES CARTES HAUTE DÉFINITION (4x4 = 16 CARTES PRO - Élargie latéralement) */}
      <main className="w-full flex-1 flex items-center justify-center py-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {cards.map((card, idx) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              className={`card-wrapper h-36 sm:h-44 md:h-48 cursor-pointer ${
                card.flipped || card.matched ? 'flipped' : ''
              } ${card.matched ? 'matched' : ''} ${card.isFailing ? 'shake-fail' : ''}`}
            >
              <div className="card-box">
                
                {/* DOS DE CARTE (MOUVEMENT COMPLET ETA 6497) */}
                <div className="card-face back-geneve flex flex-col items-center justify-between p-2 rounded-2xl relative overflow-hidden group">
                  <div className="w-full flex justify-between items-center z-10 opacity-75">
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 font-bold">HORLOLEARN</span>
                    <span className="text-[9px] font-mono text-slate-300 font-bold">16½'''</span>
                  </div>

                  {/* Médaillon central : Vraie Photo du Mouvement Complet */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-amber-500/60 p-0.5 bg-slate-950/90 shadow-2xl flex items-center justify-center my-auto group-hover:scale-105 transition-transform overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/emboitage/kit/3_mouvement_calibre.png"
                      alt="Calibre ETA 6497 complet"
                      className="w-full h-full object-contain filter drop-shadow-md rounded-full"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/eta6497/assemblage-6.png';
                      }}
                    />
                  </div>

                  <div className="z-10 flex items-center gap-1 font-mono text-[9px] text-amber-300 font-bold bg-slate-900/90 px-2 py-0.5 rounded-full border border-amber-500/30">
                    <span>ETA 6497 · 17 RUBIS</span>
                  </div>
                </div>

                {/* FACE DE CARTE (VRAIE FOURNITURE HORLOGÈRE SUISSE) */}
                <div className="card-face card-front-design front-card-design flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-2xl">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider">
                      {card.category}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${card.matched ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'}`}></span>
                  </div>

                  {/* Photo HD de la fourniture */}
                  <div className="w-full flex-1 flex items-center justify-center my-0.5 p-1 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.img}
                      alt={card.name}
                      className="max-h-[90px] sm:max-h-[110px] max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://www.horlolearn.ch${card.img}`;
                      }}
                    />
                  </div>

                  <div className="text-center w-full">
                    <div className="text-xs font-bold text-white font-mono truncate px-1">
                      {card.name}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. BANDEAU BAS : FICHE D'ATELIER DE LA PAIRE TROUVÉE */}
      <footer className="w-full mt-3">
        <div className="glass-hud p-3 sm:px-6 sm:py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 uppercase font-bold tracking-wider text-[11px]">Dernière fourniture :</span>
            <span className="text-slate-300">
              {lastInfo ? lastInfo.name : 'Retournez deux cartes identiques pour voir sa fonction et son lubrifiant Moebius'}
            </span>
          </div>
          <div className="text-rose-400 font-bold text-[11px]">
            {lastInfo ? `Huile : ${lastInfo.oil}` : 'Standard : Normes Suisses NIHS'}
          </div>
        </div>
      </footer>

      {/* 4. MODAL DE VICTOIRE */}
      <AnimatePresence>
        {showWin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass-hud p-6 sm:p-8 rounded-3xl max-w-md w-full text-center space-y-5"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border-2 border-amber-500/50 flex items-center justify-center text-4xl shadow-xl">
                ⭐
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest font-bold">
                  MÉMOIRE HORLOGÈRE PARFAITE
                </span>
                <h2 className="font-serif text-2xl font-bold text-white tracking-wide mt-1">
                  TOUTES LES FOURNITURES TROUVÉES !
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Vous maîtrisez parfaitement l'identification des composants du calibre 6497.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-xs bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">TEMPS</span>
                  <span className="text-amber-400 font-bold text-sm">
                    {String(spentMin).padStart(2, '0')}:{String(spentSec).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">COUPS</span>
                  <span className="text-cyan-400 font-bold text-sm">{moves}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SCORE</span>
                  <span className="text-emerald-400 font-bold text-sm">{score} pts</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={initGame}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-300 text-slate-950 font-bold text-xs sm:text-sm font-mono tracking-wider uppercase transition shadow-lg shadow-amber-500/25 active:scale-98 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Rejouer</span>
                </button>
                <button
                  onClick={handleQuit}
                  className="py-3 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs sm:text-sm font-mono tracking-wider uppercase transition active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-rose-950/30"
                >
                  <span>Quitter</span>
                  <svg className="w-4 h-4 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. CSS STYLES (Exacts du HTML) */}
      <style jsx>{`
        .glass-hud {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8);
        }

        .card-wrapper {
          perspective: 1200px;
        }

        .card-box {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
          transform-style: preserve-3d;
        }

        .card-wrapper.flipped .card-box,
        .card-wrapper.matched .card-box {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 1rem;
        }

        .card-front-design {
          transform: rotateY(180deg);
        }

        .back-geneve {
          background: linear-gradient(135deg, #0A0F1A 0%, #111827 50%, #0A0F1A 100%);
          border: 1.5px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.9), inset 0 0 15px rgba(212, 175, 55, 0.08);
          transition: all 0.25s ease;
        }

        .card-wrapper:hover .back-geneve {
          border-color: rgba(212, 175, 55, 0.85);
          box-shadow: 0 16px 32px -4px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2);
          transform: translateY(-2px) scale(1.01);
        }

        .front-card-design {
          background: linear-gradient(160deg, #101726 0%, #090D15 100%);
          border: 2px solid rgba(212, 175, 55, 0.65);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .matched .front-card-design {
          border-color: #10B981 !important;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.5), inset 0 0 15px rgba(16, 185, 129, 0.2) !important;
        }

        .shake-fail {
          animation: cardShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes cardShake {
          10%, 90% { transform: translate3d(-3px, 0, 0); }
          20%, 80% { transform: translate3d(5px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-5px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default MemoryGame6497;
