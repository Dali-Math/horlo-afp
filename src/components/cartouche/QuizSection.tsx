'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
} from 'lucide-react';

// --- Type local ---
interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  hint?: string;
  explanation?: string;
}

// --- Données du quiz ---
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la fonction principale du cartouche sur un plan horloger ?",
    answers: [
      "Décorer le plan",
      "Indiquer les cotes des pièces",
      "Rassembler les informations techniques et administratives",
      "Donner la matière première utilisée"
    ],
    correctAnswer: 2,
    hint: "On y trouve les noms, la date, la matière, l’échelle, etc.",
  },
  {
    id: 2,
    question: "Que signifie l’échelle 2:1 sur un plan technique ?",
    answers: [
      "La pièce est deux fois plus grande que le plan",
      "Le dessin est deux fois plus petit que la pièce",
      "Le dessin est deux fois plus grand que la pièce",
      "La pièce et le dessin ont la même taille"
    ],
    correctAnswer: 2,
    hint: "L’échelle compare les dimensions dessinées à la réalité.",
  },
  {
    id: 3,
    question: "Quel symbole est souvent utilisé pour représenter le centre d’un cercle ?",
    answers: [
      "Un point noir",
      "Une croix fine",
      "Un carré",
      "Une flèche"
    ],
    correctAnswer: 1,
    hint: "Ce symbole aide à positionner un perçage ou un axe.",
  }
];

// --- Composant principal ---
export const QuizSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = quizData.length;
  const currentQ = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const selectAnswer = (i: number) => setSelectedAnswer(i);

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswers((a) => [...a, selectedAnswer]);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setShowHint(false);
      } else {
        setIsQuizCompleted(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  const toggleHint = () => setShowHint((s) => !s);

  // --- Résultats finaux ---
  if (isQuizCompleted) {
    const correctCount = userAnswers.filter((a, i) => a === quizData[i].correctAnswer).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen pt-24 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🏆
          </motion.div>
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Résultat : {score}%
          </h1>
          <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Vous avez répondu correctement à {correctCount} sur {totalQuestions} questions.
          </p>
          <button
            onClick={restart}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
          >
            Rejouer le quiz
          </button>
        </div>
      </div>
    );
  }

  // --- Interface du quiz ---
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Question {currentQuestion + 1} / {totalQuestions}
          </span>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Progression : {Math.round(progress)}%
          </span>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} h-2 rounded-full mb-6`}>
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentQ.question}
        </h2>

        <div className="grid gap-4 mb-8">
          {currentQ.answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`p-4 rounded-xl border transition-all ${
                selectedAnswer === i
                  ? 'bg-green-500 text-white border-green-600'
                  : darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
                  : 'bg-white border-gray-200 hover:bg-gray-100'
              }`}
            >
              {ans}
            </button>
          ))}
        </div>

        {showHint && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              darkMode ? 'bg-yellow-900/40 text-yellow-200' : 'bg-yellow-50 text-yellow-800'
            }`}
          >
            💡 <strong>Indice :</strong> {currentQ.hint ?? "Pas d'indice pour cette question."}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setCurrentQuestion((q) => Math.max(q - 1, 0))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>

          <div className="flex gap-3">
            <button
              onClick={toggleHint}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Indice
            </button>

            <button
              onClick={restart}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Réinitialiser
            </button>

            <button
              onClick={nextQuestion}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg"
              style={{
                backgroundColor: lastAnswerCorrect ? '#16a34a' : '#dc2626',
              }}
            >
              {lastAnswerCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizSection;
