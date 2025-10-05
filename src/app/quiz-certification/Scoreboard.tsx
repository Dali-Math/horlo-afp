/**
 * Scoreboard.tsx
 * Tableau de résultats final Quiz Certification CFC
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 */

'use client';

import { motion } from 'framer-motion';

interface ScoreboardProps {
  score: number;
  total: number;
  timeElapsed: number;
}

export default function Scoreboard({ score, total, timeElapsed }: ScoreboardProps) {
  const percentage = (score / total) * 100;
  const minutes = Math.floor(timeElapsed / 60000);
  const seconds = Math.floor((timeElapsed % 60000) / 1000);

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excellent', color: 'text-green-400', emoji: '🏆' };
    if (percentage >= 75) return { label: 'Très bien', color: 'text-amber-400', emoji: '⭐' };
    if (percentage >= 60) return { label: 'Bien', color: 'text-blue-400', emoji: '💪' };
    return { label: 'À améliorer', color: 'text-zinc-400', emoji: '📚' };
  };

  const grade = getGrade();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 text-center"
    >
      {/* Trophy/Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-6xl mb-4"
      >
        {grade.emoji}
      </motion.div>

      {/* Titre */}
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2">
        Quiz Terminé!
      </h2>

      {/* Grade */}
      <p className={`text-xl font-semibold ${grade.color} mb-6`}>
        {grade.label}
      </p>

      {/* Score principal */}
      <div className="flex justify-center items-baseline gap-2 mb-6">
        <span className="text-6xl font-bold text-amber-400">{score}</span>
        <span className="text-2xl text-zinc-500">/</span>
        <span className="text-4xl text-zinc-400">{total}</span>
      </div>

      {/* Pourcentage */}
      <div className="mb-8">
        <div className="inline-block px-6 py-3 bg-zinc-800/50 rounded-full border border-zinc-700">
          <span className="text-2xl font-bold text-amber-400">{percentage.toFixed(1)}%</span>
          <span className="text-zinc-500 ml-2">de réussite</span>
        </div>
      </div>

      {/* Stats secondaires */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50">
          <div className="text-zinc-500 mb-1">Temps écoulé</div>
          <div className="text-amber-400 font-semibold text-lg">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50">
          <div className="text-zinc-500 mb-1">Précision</div>
          <div className="text-amber-400 font-semibold text-lg">
            {((score / total) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4 justify-center">
        <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-900 font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-200">
          Recommencer
        </button>
        <button className="px-6 py-3 border border-amber-500/50 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/10 transition-all duration-200">
          Voir les réponses
        </button>
      </div>
    </motion.div>
  );
}
