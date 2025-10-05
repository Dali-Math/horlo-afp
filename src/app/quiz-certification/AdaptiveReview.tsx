/**
 * AdaptiveReview.tsx
 * Révision adaptative post-quiz - Quiz Certification CFC
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 * 
 * Mode adaptatif avec recommandations personnalisées
 */

'use client';

import { motion } from 'framer-motion';

interface AdaptiveReviewProps {
  answers: Record<number, string>;
  score: number;
}

export default function AdaptiveReview({ answers, score }: AdaptiveReviewProps) {
  // TODO: Analyse adaptative selon performance
  const weakAreas = ['Complications', 'Échappement'];
  const strongAreas = ['Histoire', 'Outils'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      {/* Titre */}
      <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
        🎯 Révision Adaptative
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Zones à renforcer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📚</span>
            <h4 className="text-lg font-semibold text-zinc-200">À renforcer</h4>
          </div>
          <ul className="space-y-2">
            {weakAreas.map((area, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-400">
                <span className="text-amber-500 mt-1">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors duration-200">
            Voir ressources recommandées
          </button>
        </motion.div>

        {/* Points forts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h4 className="text-lg font-semibold text-zinc-200">Points forts</h4>
          </div>
          <ul className="space-y-2">
            {strongAreas.map((area, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-400">
                <span className="text-green-500 mt-1">✓</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-500">
            Continue comme ça ! Tu maîtrises bien ces domaines.
          </p>
        </motion.div>
      </div>

      {/* Recommandation globale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl"
      >
        <p className="text-zinc-300 leading-relaxed">
          <span className="font-semibold text-amber-400">Recommandation : </span>
          {score >= 24 ? (
            "Excellente maîtrise ! Continue à t'entraîner régulièrement pour maintenir ce niveau."
          ) : score >= 18 ? (
            "Bonne base générale. Concentre-toi sur les zones identifiées pour perfectionner ta maîtrise."
          ) : (
            "Il est recommandé de revoir les fondamentaux. Utilise nos ressources pédagogiques pour progresser."
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}
