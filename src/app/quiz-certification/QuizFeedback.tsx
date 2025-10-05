/**
 * QuizFeedback.tsx
 * Feedback après réponse - Quiz Certification CFC
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 */

'use client';

import { motion } from 'framer-motion';

interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

export default function QuizFeedback({ isCorrect, explanation, onNext }: QuizFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-6 p-6 rounded-xl border-2 ${
        isCorrect
          ? 'bg-green-500/10 border-green-500/50'
          : 'bg-red-500/10 border-red-500/50'
      }`}
    >
      {/* Header avec icône */}
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-3xl"
            >
              ✅
            </motion.div>
            <h3 className="text-xl font-bold text-green-400">Bravo ! Réponse correcte</h3>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-3xl"
            >
              ❌
            </motion.div>
            <h3 className="text-xl font-bold text-red-400">Pas tout à fait...</h3>
          </>
        )}
      </div>

      {/* Explication */}
      <div className="mb-6">
        <p className="text-zinc-300 leading-relaxed">{explanation}</p>
      </div>

      {/* Bouton suivant */}
      <button
        onClick={onNext}
        className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-900 font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span>Question suivante</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </motion.div>
  );
}
