'use client';

import React, { useEffect, useState } from 'react';
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
import { quizData } from './data';
import { QuizQuestion } from '@/types';

interface QuizSectionProps {
  darkMode: boolean;
  onQuizComplete?: (score: number, completedQuestions: number) => void;
}

interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ darkMode, onQuizComplete }) => {
  // état
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // timers
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionTimer, setQuestionTimer] = useState(0);

  // options / feedback
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showQuickFeedback, setShowQuickFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  // progression / séries
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // données courantes
  const totalQuestions = quizData.length;
  const currentQ: QuizQuestion = quizData[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  // timer question (affichage secondes)
  useEffect(() => {
    const t = setInterval(() => setQuestionTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [currentQuestion]);

  // reset timer à chaque nouvelle question
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
    setShowHint(false);
  }, [currentQuestion]);

  // ---- helpers UI ----
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { title: '🎯 Parfait !', message: 'Expert des cartouches ISO !', emoji: '🏆' };
    if (score >= 80) return { title: '⭐ Excellent !', message: 'Très bonnes connaissances !', emoji: '🌟' };
    if (score >= 70) return { title: '👍 Bien !', message: 'Bonnes bases, continue !', emoji: '💪' };
    if (score >= 60) return { title: '📚 Passable', message: 'Peut mieux faire.', emoji: '📖' };
    return { title: '🎓 À améliorer', message: 'Reprends les notions clés.', emoji: '💡' };
  };

  const getPerformanceBadges = (score: number, time: number, streakBest: number) => {
    const b: { icon: string; name: string; color: string }[] = [];
    if (score === 100) b.push({ icon: '🏆', name: 'Score parfait', color: 'bg-yellow-500' });
    if (score >= 90) b.push({ icon: '⭐', name: 'Excellence', color: 'bg-purple-500' });
    if (streakBest >= 5) b.push({ icon: '🔥', name: `Série ${streakBest}`, color: 'bg-orange-500' });
    if (time < totalQuestions * 30) b.push({ icon: '⚡', name: 'Rapidité', color: 'bg-blue-500' });
    if (hintsUsed === 0) b.push({ icon: '🎯', name: 'Sans indice', color: 'bg-green-600' });
    return b;
  };

  // ---- actions ----
  const selectAnswer = (idx: number) => setSelectedAnswer(idx);

  const toggleHint = () => {
    if (!showHint) setHintsUsed((h) => h + 1);
    setShowHint((s) => !s);
  };

  const previousQuestion = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((q) => q - 1);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsQuizCompleted(false);
    setStreak(0);
    setMaxStreak(0);
    setHintsUsed(0);
    setShowHint(false);
    setShowQuickFeedback(false);
    setLastAnswerCorrect(false);
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    // séries
    if (isCorrect) {
      setStreak((s) => {
        const ns = s + 1;
        setMaxStreak((m) => Math.max(m, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }

    // feedback court
    setLastAnswerCorrect(isCorrect);
    setShowQuickFeedback(true);

    // enregistre la réponse
    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
    };
    const updated = [...userAnswers, newAnswer];
    setUserAnswers(updated);

    // enchaîne ou termine
    setTimeout(() => {
      setShowQuickFeedback(false);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setIsQuizCompleted(true);
        const score = Math.round((updated.filter((a) => a.isCorrect).length / totalQuestions) * 100);
        onQuizComplete?.(score, totalQuestions);
      }
    }, 1200);
  };

  // ---- écran final ----
  if (isQuizCompleted) {
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.round(userAnswers.reduce((sum, a) => sum + a.timeSpent, 0));
    const msg = getScoreMessage(score);
    const grade = getScoreGrade(score);
    const badges = getPerformanceBadges(score, totalTime, maxStreak);

    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {msg.emoji}
          </motion.div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {msg.title}
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{msg.message}</p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`text-7xl font-black ${getScoreColor(score)}`}>{score}%</div>
            <div
              className={`text-4xl font-bold px-6 py-2 rounded-2xl text-white ${
                score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            >
              {grade}
            </div>
          </div>

          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`${b.color} text-white px-4 py-2 rounded-full font-semibold shadow`}
                >
                  <span className="mr-1">{b.icon}</span>
                  {b.name}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-2xl text-center`}>
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</div>
              <p>Bonnes réponses</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-2xl text-center`}>
              <Clock className="w-10 h-10 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalTime}s</div>
              <p>Temps total</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-2xl text-center`}>
              <Target className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{maxStreak}</div>
              <p>Meilleure série</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-2xl text-center`}>
              <Lightbulb className="w-10 h-10 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{hintsUsed}</div>
              <p>Indices utilisés</p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
          >
            Rejouer le quiz
          </button>
        </div>
      </div>
    );
  }

  // ---- écran question ----
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* entête */}
        <div className="flex items-end justify-between mb-4">
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Question <strong>{currentQuestion + 1}</strong> / {totalQuestions}
          </div>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            Temps : {questionTimer}s · Série : {streak}
          </div>
        </div>

        {/* barre de progression */}
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} h-2 rounded-full mb-6`}>
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* question */}
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentQ.question}
        </h2>

        {/* réponses */}
        <div className="grid gap-4 mb-8">
          {currentQ.answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`p-4 rounded-xl border text-left transition-all ${
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

        {/* indice */}
        {showHint && (
          <div
            className={`p-4 mb-5 rounded-lg ${
              darkMode ? 'bg-yellow-900/40 text-yellow-200' : 'bg-yellow-50 text-yellow-800'
            }`}
          >
            💡 <strong>Indice :</strong>{' '}
            {currentQ.hint ?? "Réfléchis au contexte et aux normes usuelles."}
          </div>
        )}

        {/* actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>

          <div className="flex items-center gap-3">
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
              onClick={resetQuiz}
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

        {/* feedback rapide */}
        <AnimatePresence>
          {showQuickFeedback && (
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
