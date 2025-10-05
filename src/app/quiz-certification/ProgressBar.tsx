/**
 * ProgressBar.tsx
 * Barre de progression pour Quiz Certification CFC avec animations premium
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 * 
 * Features:
 * - Animations Framer Motion fluides
 * - Accessibilité ARIA complète
 * - Indicateurs visuels de performance
 * - Micro-animations sur changements de score
 * - Support animations réduites
 */
'use client';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
  className?: string;
}

// Variants d'animation pour l'expérience premium
const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const progressVariants = {
  initial: { 
    width: 0,
    opacity: 0.8
  },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    opacity: 1,
    transition: {
      width: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      },
      opacity: {
        duration: 0.3
      }
    }
  })
};

const scoreVariants = {
  initial: { 
    scale: 1,
    color: "rgb(245, 158, 11)"
  },
  updated: { 
    scale: [1, 1.2, 1],
    color: ["rgb(245, 158, 11)", "rgb(34, 197, 94)", "rgb(245, 158, 11)"],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

export default function ProgressBar({ current, total, score, className = '' }: ProgressBarProps) {
  const [prevScore, setPrevScore] = useState(score);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const progressPercentage = total > 0 ? ((current + 1) / total) * 100 : 0;
  const scorePercentage = total > 0 ? (score / total) * 100 : 0;
  const completionRate = current > 0 ? (score / (current + 1)) * 100 : 0;

  // Animation quand le score change
  useEffect(() => {
    if (score > prevScore) {
      setScoreUpdated(true);
      setTimeout(() => setScoreUpdated(false), 600);
    }
    setPrevScore(score);
  }, [score, prevScore]);

  // Couleur de la barre basée sur la performance
  const getProgressColor = () => {
    if (completionRate >= 80) return 'from-green-500 via-emerald-500 to-green-600';
    if (completionRate >= 60) return 'from-amber-500 via-yellow-500 to-amber-600';
    if (completionRate >= 40) return 'from-orange-500 via-amber-500 to-orange-600';
    return 'from-red-500 via-rose-500 to-red-600';
  };

  // Icône de performance
  const getPerformanceIcon = () => {
    if (completionRate >= 80) return '🌟';
    if (completionRate >= 60) return '⭐';
    if (completionRate >= 40) return '🔥';
    return '💪';
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className={`mb-8 ${className}`}
      role="region"
      aria-label="Progression du quiz"
    >
      {/* En-tête avec statistiques */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="flex justify-between items-center mb-3 text-sm"
      >
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Question</span>
          <motion.span 
            className="text-amber-400 font-semibold px-2 py-1 bg-amber-500/10 rounded-md"
            key={current}
            initial={shouldReduceMotion ? {} : { scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {current + 1}
          </motion.span>
          <span>/ {total}</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Score:</span>
          <motion.span 
            variants={shouldReduceMotion ? {} : scoreVariants}
            initial="initial"
            animate={scoreUpdated ? "updated" : "initial"}
            className="font-semibold px-2 py-1 bg-amber-500/10 rounded-md"
          >
            {score}
          </motion.span>
          <span>/ {total}</span>
        </div>
      </motion.div>

      {/* Barre de progression principale */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="relative"
      >
        <div 
          className="relative h-3 bg-zinc-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-zinc-700/50"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression: ${Math.round(progressPercentage)}%`}
        >
          <motion.div
            variants={shouldReduceMotion ? {} : progressVariants}
            initial="initial"
            animate="animate"
            custom={progressPercentage}
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getProgressColor()} rounded-full shadow-lg`}
          >
            {/* Effet de brillance animé */}
            {!shouldReduceMotion && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        </div>
        
        {/* Indicateur de position */}
        <motion.div
          className="absolute -top-8 bg-zinc-800 border border-zinc-600 rounded-md px-2 py-1 text-xs font-medium shadow-lg"
          style={{ left: `${Math.max(0, Math.min(90, progressPercentage - 5))}%` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-zinc-200">
            {Math.round(progressPercentage)}%
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
        </motion.div>
      </motion.div>

      {/* Statistiques détaillées */}
      <AnimatePresence>
        {current > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex justify-between items-center text-xs"
          >
            <div className="flex items-center gap-2 text-zinc-500">
              <span>Taux de réussite:</span>
              <motion.div 
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800/50"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">{getPerformanceIcon()}</span>
                <motion.span 
                  className={`font-medium ${
                    completionRate >= 80 ? 'text-green-400' :
                    completionRate >= 60 ? 'text-amber-400' :
                    completionRate >= 40 ? 'text-orange-400' :
                    'text-red-400'
                  }`}
                  key={completionRate}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {completionRate.toFixed(0)}%
                </motion.span>
              </motion.div>
            </div>
            
            {/* Barre de score détaillée */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Performance:</span>
              <div className="w-16 h-1 bg-zinc-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${
                    completionRate >= 80 ? 'from-green-400 to-green-600' :
                    completionRate >= 60 ? 'from-amber-400 to-amber-600' :
                    completionRate >= 40 ? 'from-orange-400 to-orange-600' :
                    'from-red-400 to-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, completionRate)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
