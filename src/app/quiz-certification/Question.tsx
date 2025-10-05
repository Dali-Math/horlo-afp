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
 * - Animations micro-interactions
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function Question({ questionId, onAnswer, showFeedback }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = mockQuestions[questionId] || mockQuestions[0];

  const handleSelectAnswer = (optionId: string) => {
    if (showFeedback) return; // Bloquer si déjà répondu
    
    setSelectedAnswer(optionId);
    const selectedOption = question.options.find(opt => opt.id === optionId);
    if (selectedOption) {
      onAnswer(questionId, optionId, selectedOption.isCorrect);
    }
  };

  const getOptionStyle = (optionId: string, isCorrect: boolean) => {
    if (!showFeedback) {
      return selectedAnswer === optionId
        ? 'border-amber-500 bg-amber-500/10'
        : 'border-zinc-700 hover:border-amber-600/50';
    }
    
    if (selectedAnswer === optionId) {
      return isCorrect
        ? 'border-green-500 bg-green-500/10'
        : 'border-red-500 bg-red-500/10';
    }
    
    return isCorrect
      ? 'border-green-500 bg-green-500/5'
      : 'border-zinc-700 opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 shadow-2xl"
    >
      {/* Catégorie */}
      <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
        {question.category}
      </div>

      {/* Question */}
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6 leading-relaxed">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label="Options de réponse">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelectAnswer(option.id)}
            disabled={showFeedback}
            whileHover={!showFeedback ? { scale: 1.01 } : {}}
            whileTap={!showFeedback ? { scale: 0.99 } : {}}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              getOptionStyle(option.id, option.isCorrect)
            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            role="radio"
            aria-checked={selectedAnswer === option.id}
            tabIndex={0}
          >
            <div className="flex items-start gap-3">
              {/* Lettre option */}
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-current text-sm font-bold">
                {option.id.toUpperCase()}
              </span>
              
              {/* Texte option */}
              <span className="flex-1 text-zinc-200 leading-relaxed">
                {option.text}
              </span>

              {/* Indicateur correct/incorrect */}
              {showFeedback && selectedAnswer === option.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0"
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
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info accessibilité */}
      <p className="mt-6 text-xs text-zinc-500 text-center">
        Utilisez les touches fléchées ↑↓ pour naviguer, Entrée pour sélectionner
      </p>
    </motion.div>
  );
}
