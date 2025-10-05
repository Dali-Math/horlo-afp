/**
 * Question.tsx
 * Composant Question pour Quiz Certification CFC
 * Specs: /docs/ux/modules/quiz-certification-audit.md
 * 
 * Features:
 * - Affichage question avec options multiples
 * - Gestion sélection réponse
 * - États visuels (hover, focus, selected, correct/incorrect)
 * - Accessibilité clavier & screen readers
 * - Animations micro-interactions premium
 * - Transitions fluides et feedback visuel
 */
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface QuestionProps {
  questionId: number;
  onAnswer: (questionId: number, answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
}

interface QuestionData {
  id: number;
  text: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  category: string;
}

// TODO: Remplacer par fetch depuis API/database
const mockQuestions: QuestionData[] = [
  {
    id: 0,
    text: "Quelle est la fonction principale d'un échappement dans un mouvement horloger?",
    options: [
      { id: 'a', text: "Convertir l'énergie du ressort en impulsions régulières", isCorrect: true },
      { id: 'b', text: "Remonter automatiquement le mouvement", isCorrect: false },
      { id: 'c', text: "Afficher les complications", isCorrect: false },
      { id: 'd', text: "Protéger le mouvement des chocs", isCorrect: false },
    ],
    category: 'Technique horlogère',
  },
];

// Animations variants pour une expérience premium
const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const optionVariants = {
  idle: {
    scale: 1,
    borderColor: 'rgb(63, 63, 70)'
  },
  hover: {
    scale: 1.02,
    borderColor: 'rgb(245, 158, 11)',
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  selected: {
    scale: 1.01,
    borderColor: 'rgb(245, 158, 11)',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  correct: {
    scale: 1.02,
    borderColor: 'rgb(34, 197, 94)',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  incorrect: {
    scale: 0.98,
    borderColor: 'rgb(239, 68, 68)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const feedbackVariants = {
  hidden: { 
    scale: 0, 
    rotate: -180, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
};

export default function Question({ questionId, onAnswer, showFeedback }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const question = mockQuestions[questionId] || mockQuestions[0];

  const handleSelectAnswer = async (optionId: string) => {
    if (showFeedback || isAnswering) return;
    
    setIsAnswering(true);
    setSelectedAnswer(optionId);
    
    // Délai pour l'animation avant callback
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const selectedOption = question.options.find(opt => opt.id === optionId);
    if (selectedOption) {
      onAnswer(questionId, optionId, selectedOption.isCorrect);
    }
    
    setIsAnswering(false);
  };

  const getOptionVariant = (optionId: string, isCorrect: boolean) => {
    if (!showFeedback) {
      return selectedAnswer === optionId ? 'selected' : 'idle';
    }
    
    if (selectedAnswer === optionId) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    
    return isCorrect ? 'correct' : 'idle';
  };

  const handleKeyDown = (event: React.KeyboardEvent, optionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectAnswer(optionId);
    }
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 shadow-2xl"
    >
      {/* Catégorie avec animation */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="inline-block px-3 py-1 mb-4 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full"
      >
        {question.category}
      </motion.div>

      {/* Question avec animation */}
      <motion.h2 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="text-2xl font-semibold text-zinc-100 mb-6 leading-relaxed"
      >
        {question.text}
      </motion.h2>

      {/* Options avec animations */}
      <div 
        aria-label="Options de réponse" 
        className="space-y-3" 
        role="radiogroup"
        aria-required="true"
      >
        <AnimatePresence>
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              variants={shouldReduceMotion ? {} : optionVariants}
              initial="idle"
              animate={getOptionVariant(option.id, option.isCorrect)}
              whileHover={!showFeedback && !isAnswering ? "hover" : undefined}
              whileTap={!showFeedback && !isAnswering ? { scale: 0.98 } : undefined}
              onClick={() => handleSelectAnswer(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              disabled={showFeedback || isAnswering}
              className={`w-full text-left p-4 rounded-lg border-2 transition-opacity duration-200 ${
                showFeedback && !option.isCorrect && selectedAnswer !== option.id 
                  ? 'opacity-50' 
                  : 'opacity-100'
              } ${
                showFeedback || isAnswering ? 'cursor-default' : 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900'
              }`}
              role="radio"
              aria-checked={selectedAnswer === option.id}
              aria-describedby={showFeedback && selectedAnswer === option.id ? `feedback-${option.id}` : undefined}
              tabIndex={0}
            >
              <div className="flex items-start gap-3">
                {/* Lettre option avec micro-animation */}
                <motion.span 
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-current text-sm font-bold"
                  animate={{
                    scale: selectedAnswer === option.id ? 1.1 : 1,
                    fontWeight: selectedAnswer === option.id ? 700 : 600
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {option.id.toUpperCase()}
                </motion.span>
                
                {/* Texte option */}
                <span className="flex-1 text-zinc-200 leading-relaxed">
                  {option.text}
                </span>

                {/* Indicateur correct/incorrect avec animation */}
                <AnimatePresence>
                  {showFeedback && selectedAnswer === option.id && (
                    <motion.span
                      variants={shouldReduceMotion ? {} : feedbackVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex-shrink-0"
                      id={`feedback-${option.id}`}
                      aria-label={option.isCorrect ? "Réponse correcte" : "Réponse incorrecte"}
                    >
                      {option.isCorrect ? (
                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Info accessibilité avec animation */}
      <motion.p 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="mt-6 text-xs text-zinc-500 text-center"
        role="note"
        aria-live="polite"
      >
        Utilisez les touches fléchées ↑↓ pour naviguer, Entrée/Espace pour sélectionner
        {isAnswering && <span className="ml-2 animate-pulse">⏳</span>}
      </motion.p>
    </motion.div>
  );
}
