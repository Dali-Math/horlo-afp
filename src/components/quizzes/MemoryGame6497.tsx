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

// 8 Paires Horlogères Majeures ETA 6497 (16 cartes au total - format cartes géantes d'atelier)
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
    <div className="w-full flex flex-col items-center justify-center py-4">
      {/* HUD & Chrono */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-6 px-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleQuit}
            className="px-4 py-2 rounded-xl bg-slate-800/95 hover:bg-rose-950/80 hover:border-rose-500/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-xs sm:text-sm font-mono transition flex items-center gap-2 shadow-md"
            title="Quitter le jeu"
          >
            <span className="text-rose-400 font-bold">←</span>
            <span>Quitter</span>
          </button>
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs sm:text-sm font-mono shadow-md">
            Paires : <span className="text-amber-400 font-bold">{matchedPairs} / {PIECES_CONFIG.length}</span>
          </div>
        </div>

        {!gameOver && !win && (
          <div
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-colors shadow-md ${
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
          className="px-4 py-2 rounded-xl bg-slate-800/95 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs sm:text-sm font-mono transition shadow-md"
        >
          Recommencer
        </button>
      </div>

      {/* Grille des CARTES GÉANTES (4 colonnes x 4 lignes = 16 cartes bien lisibles) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-4xl w-full"
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.025 }}
              className="flip-card h-48 sm:h-64 cursor-pointer select-none"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`flip-card-inner ${
                  card.flipped || card.matched ? 'flipped' : ''
                }`}
              >
                {/* Verso (Face cachée : Blason horloger élégant) */}
                <div className="flip-card-front bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-2 border-amber-500/40 hover:border-amber-400/80 flex flex-col items-center justify-between p-4 rounded-2xl shadow-xl transition-all group">
                  <div className="w-full flex justify-between items-center opacity-60">
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold">HORLOLEARN</span>
                    <span className="text-[10px] font-mono text-slate-400">16½'''</span>
                  </div>

                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    <span className="text-amber-300 font-mono font-bold text-base sm:text-xl">6497</span>
                    <span className="text-[9px] text-amber-400/70 font-mono tracking-widest uppercase">ETA</span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                    CALIBRE SUISSE
                  </div>
                </div>

                {/* Recto (Fourniture réelle EN GRAND) */}
                <div
                  className={`flip-card-back bg-slate-950/95 border-2 ${
                    card.matched
                      ? 'border-emerald-500 shadow-xl shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                      : 'border-amber-500/80'
                  } flex flex-col items-center justify-between p-3 sm:p-4 rounded-2xl shadow-2xl`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                      ETA 6497
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${card.matched ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'}`}></span>
                  </div>

                  {/* Image HD Géante de la pièce */}
                  <div className="relative w-full flex-1 flex items-center justify-center p-2 my-1 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/quiz/6497/${card.name}`}
                      alt={card.label}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `/images/quiz/${card.name}`;
                      }}
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-amber-100 text-center leading-tight line-clamp-2 px-1">
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
          className="mt-8 text-center bg-slate-900/95 border border-rose-500/40 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4"
        >
          <div>
            <div className="text-xl text-rose-400 font-bold mb-1">
              Temps écoulé
            </div>
            <p className="text-xs text-slate-400">
              Prenez le temps d'observer chaque fourniture micromécanique et réessayez.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
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
          className="mt-8 text-center bg-slate-900/95 border border-emerald-500/50 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5"
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              Mémoire Horlogère Validée
            </span>
            <div className="text-2xl text-white font-bold">
              Toutes les fournitures identifiées
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Vous maîtrisez parfaitement l'identification visuelle des composants du calibre 6497.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
            Temps réalisé : <span className="font-bold text-white text-sm">{Math.floor((150 - timeLeft) / 60)}:{String((150 - timeLeft) % 60).padStart(2, '0')}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={initGame}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-300 text-slate-950 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-98"
            >
              Rejouer
            </button>
            <button
              onClick={handleQuit}
              className="py-3 px-4 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition shadow-lg shadow-rose-950/30 active:scale-98 flex items-center justify-center gap-1.5"
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
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
          border-radius: 1rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame6497;
