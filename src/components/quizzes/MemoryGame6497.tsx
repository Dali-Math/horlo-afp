import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  name: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryGame6497Props {
  onExit?: () => void;
}

// 8 Paires Horlogères Majeures ETA 6497 (16 cartes au total - format compact sans défilement)
const PIECES_CONFIG = [
  { file: 'barillet.png', label: 'Barillet moteur (53h)' },
  { file: 'balancier.png', label: 'Balancier à vis' },
  { file: 'spiral.png', label: 'Spiral réglant Nivarox' },
  { file: 'ancre.png', label: 'Ancre suisse & rubis' },
  { file: 'roue-echappement.png', label: "Roue d'échappement (15d)" },
  { file: 'pont-balancier.png', label: 'Pont de coq (Incabloc)' },
  { file: 'rochet.png', label: 'Rochet de barillet' },
  { file: 'mobile-de-centre.png', label: 'Mobile de centre (60m)' },
];

const MemoryGame6497: React.FC<MemoryGame6497Props> = ({ onExit }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(150);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const handleQuit = () => {
    if (onExit) {
      onExit();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/quiz';
    }
  };

  // Initialisation des cartes doublées et mélangées
  const initGame = () => {
    const doubled = [...PIECES_CONFIG, ...PIECES_CONFIG]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        name: item.file,
        label: item.label,
        flipped: false,
        matched: false,
      }));

    setCards(doubled);
    setFlippedIndices([]);
    setTimeLeft(150);
    setIsPlaying(false);
    setGameOver(false);
    setWin(false);
    setMatchedPairs(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Décompte du chronomètre
  useEffect(() => {
    if (isPlaying && timeLeft > 0 && !win) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !win && isPlaying) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft, win]);

  // Vérification de la victoire
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWin(true);
      setIsPlaying(false);
    }
  }, [cards]);

  // Gestion du retournement d'une carte
  const handleFlip = (index: number) => {
    if (
      gameOver ||
      win ||
      flippedIndices.length === 2 ||
      cards[index].flipped ||
      cards[index].matched
    ) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].name === cards[secondIndex].name) {
        // Paire trouvée
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIndex].matched = true;
            updated[secondIndex].matched = true;
            return updated;
          });
          setMatchedPairs((count) => count + 1);
          setFlippedIndices([]);
        }, 450);
      } else {
        // Pas de correspondance -> on retourne les cartes
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIndex].flipped = false;
            updated[secondIndex].flipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-1">
      {/* HUD & Chrono compact (élargi sur les côtés) */}
      <div className="w-full max-w-6xl lg:max-w-7xl flex items-center justify-between gap-3 mb-3 px-1 text-xs sm:text-sm font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleQuit}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800/95 hover:bg-rose-950/80 hover:border-rose-500/60 text-slate-300 hover:text-rose-200 border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
            title="Quitter le jeu"
          >
            <span className="text-rose-400 font-bold">←</span>
            <span>Quitter</span>
          </button>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 shadow-sm">
            Paires : <span className="text-amber-400 font-bold">{matchedPairs} / {PIECES_CONFIG.length}</span>
          </div>
        </div>

        {!gameOver && !win && (
          <div
            className={`px-3.5 py-1.5 rounded-xl font-bold border transition-colors shadow-sm ${
              timeLeft <= 40
                ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-900/90 border-amber-500/40 text-amber-300'
            }`}
          >
            Temps restant : {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}

        <button
          onClick={initGame}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800/95 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition shadow-sm"
        >
          Recommencer
        </button>
      </div>

      {/* Grille des 16 CARTES : Élargie latéralement (max-w-6xl lg:max-w-7xl) sans défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-3 sm:gap-4 max-w-6xl lg:max-w-7xl w-full"
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="flip-card h-28 sm:h-32 md:h-36 cursor-pointer select-none"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`flip-card-inner ${
                  card.flipped || card.matched ? 'flipped' : ''
                }`}
              >
                {/* Verso (Face cachée : Mouvement ETA 6497 Complet) */}
                <div className="flip-card-front bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-amber-500/40 hover:border-amber-400 flex flex-col items-center justify-between p-2 rounded-xl shadow-md transition-all group overflow-hidden">
                  <div className="w-full flex justify-between items-center opacity-70">
                    <span className="text-[8px] font-mono tracking-widest text-amber-400 font-bold">HORLOLEARN</span>
                    <span className="text-[8px] font-mono text-slate-400">16½'''</span>
                  </div>

                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-amber-500/40 p-0.5 bg-slate-950/90 shadow-inner flex items-center justify-center my-0.5 group-hover:scale-105 transition-transform overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/emboitage/kit/3_mouvement_calibre.png"
                      alt="Calibre ETA 6497 assemblé"
                      className="w-full h-full object-contain filter drop-shadow rounded-full"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/eta6497/assemblage-6.png';
                      }}
                    />
                  </div>

                  <div className="text-[8px] font-mono text-amber-300/90 tracking-wider">
                    ETA 6497 · 17 RUBIS
                  </div>
                </div>

                {/* Recto (Fourniture réelle nette) */}
                <div
                  className={`flip-card-back bg-slate-950/95 border-2 ${
                    card.matched
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                      : 'border-amber-500/80'
                  } flex flex-col items-center justify-between p-1.5 sm:p-2 rounded-xl shadow-lg`}
                >
                  <div className="w-full flex items-center justify-between px-1">
                    <span className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                      ETA 6497
                    </span>
                    <span className={`w-2 h-2 rounded-full ${card.matched ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'}`}></span>
                  </div>

                  {/* Image HD Fourniture adaptée à la hauteur */}
                  <div className="relative w-full flex-1 flex items-center justify-center p-1 my-0.5 rounded-lg bg-slate-900/80 border border-slate-800 shadow-inner overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/quiz/6497/${card.name}`}
                      alt={card.label}
                      className="max-h-[60px] sm:max-h-[75px] max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `/images/quiz/${card.name}`;
                      }}
                    />
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-100 text-center leading-tight truncate px-1 w-full">
                    {card.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Message Temps écoulé */}
      {gameOver && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-center bg-slate-900/95 border border-rose-500/40 p-5 rounded-2xl max-w-md w-full shadow-2xl space-y-3"
        >
          <div>
            <div className="text-lg text-rose-400 font-bold mb-1">
              Temps écoulé
            </div>
            <p className="text-xs text-slate-400">
              Prenez le temps d'observer chaque fourniture micromécanique et réessayez.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={initGame}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition"
            >
              Rejouer
            </button>
            <button
              onClick={handleQuit}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs font-mono uppercase tracking-wider transition"
            >
              Quitter
            </button>
          </div>
        </motion.div>
      )}

      {/* Message Victoire */}
      {win && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-center bg-slate-900/95 border border-emerald-500/50 p-6 rounded-3xl max-w-md w-full shadow-2xl space-y-4"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              Mémoire Horlogère Validée
            </span>
            <div className="text-xl text-white font-bold">
              Toutes les fournitures identifiées
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Vous maîtrisez parfaitement l'identification visuelle des composants du calibre 6497.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
            Temps réalisé : <span className="font-bold text-white text-sm">{Math.floor((150 - timeLeft) / 60)}:{String((150 - timeLeft) % 60).padStart(2, '0')}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={initGame}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-300 text-slate-950 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-98"
            >
              Rejouer
            </button>
            <button
              onClick={handleQuit}
              className="py-2.5 px-4 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition shadow-lg shadow-rose-950/30 active:scale-98 flex items-center justify-center gap-1.5"
            >
              <span>Quitter</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Styles 3D Flip Card */}
      <style jsx>{`
        .flip-card {
          perspective: 1200px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.85rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame6497;
