/**
 * ProgressBar.tsx
 * Barre de progression pour Quiz Certification CFC
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 */

'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const progressPercentage = ((current + 1) / total) * 100;
  const scorePercentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <div className="mb-8">
      {/* Stats */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <div className="text-zinc-400">
          Question <span className="text-amber-400 font-semibold">{current + 1}</span> / {total}
        </div>
        <div className="text-zinc-400">
          Score: <span className="text-amber-400 font-semibold">{score}</span> / {total}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-full"
        >
          {/* Effet lumineux */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* Pourcentage de réussite */}
      {current > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-center text-zinc-500"
        >
          Taux de réussite: <span className="text-amber-400 font-medium">{scorePercentage.toFixed(0)}%</span>
        </motion.div>
      )}
    </div>
  );
}
