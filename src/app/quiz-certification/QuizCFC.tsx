/**
 * QuizCFC.tsx
 * Module principal Quiz Certification CFC - Horlogerie AFP
 * Basé sur specs: /docs/ux/modules/quiz-certification-audit.md
 * 
 * Features premium:
 * - Charte or/noir horlogère
 * - Animations Framer Motion
 * - Accessibilité WCAG 2.1 AA
 * - Mode adaptatif avec learning analytics
 * - Feedback immédiat et contextuel
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Scoreboard from './Scoreboard';
import QuizFeedback from './QuizFeedback';
import AdaptiveReview from './AdaptiveReview';

interface QuizState {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  answers: Record<number, string>;
  timeStarted: number;
  completed: boolean;
}

export default function QuizCFC() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    totalQuestions: 30,
    score: 0,
    answers: {},
    timeStarted: Date.now(),
    completed: false,
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  // Gestion des réponses
  const handleAnswer = (questionId: number, answer: string, isCorrect: boolean) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
    setShowFeedback(true);
  };

  // Navigation
  const handleNext = () => {
    if (quizState.currentQuestion < quizState.totalQuestions - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
      setShowFeedback(false);
    } else {
      setQuizState(prev => ({ ...prev, completed: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Container premium */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header avec branding horloger */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-2">
            Quiz Certification CFC
          </h1>
          <p className="text-zinc-400">Horlogerie AFP - Évaluation Premium</p>
        </motion.div>

        {/* Barre de progression */}
        <ProgressBar
          current={quizState.currentQuestion}
          total={quizState.totalQuestions}
          score={quizState.score}
        />

        {/* Zone de quiz */}
        <AnimatePresence mode="wait">
          {!quizState.completed ? (
            <motion.div
              key={quizState.currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Question
                questionId={quizState.currentQuestion}
                onAnswer={handleAnswer}
                showFeedback={showFeedback}
              />
              
              {showFeedback && (
                <QuizFeedback
                  isCorrect={true} // TODO: pass real value
                  explanation="Explication contextuelle ici"
                  onNext={handleNext}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Scoreboard
                score={quizState.score}
                total={quizState.totalQuestions}
                timeElapsed={Date.now() - quizState.timeStarted}
              />
              
              {adaptiveMode && (
                <AdaptiveReview
                  answers={quizState.answers}
                  score={quizState.score}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ornements décoratifs horlogers */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-amber-500 rounded-full" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-amber-500 rounded-full" />
      </div>
    </div>
  );
}
