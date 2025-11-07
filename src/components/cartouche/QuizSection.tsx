import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Clock, Trophy, Star, RefreshCw, CheckCircle, X, 
  ArrowRight, ArrowLeft, Zap, Award, Target, TrendingUp,
  Sparkles, BookOpen, Timer, AlertCircle, Lightbulb
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showQuickFeedback, setShowQuickFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  // Timer pour chaque question
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  // Réinitialiser le timer à chaque nouvelle question
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
    setShowHint(false);
  }, [currentQuestion]);

  const totalQuestions = quizData.length;
  const currentQ = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const timeSpentOnQuestion = (Date.now() - questionStartTime) / 1000;
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    // Gestion du streak
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
    } else {
      setStreak(0);
    }

    // Feedback rapide
    setLastAnswerCorrect(isCorrect);
    setShowQuickFeedback(true);

    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedAnswer,
      isCorrect,
      timeSpent: timeSpentOnQuestion
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      setShowQuickFeedback(false);
      
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz terminé
        setIsQuizCompleted(true);
        const score = Math.round((updatedAnswers.filter(a => a.isCorrect).length / totalQuestions) * 100);
        onQuizComplete?.(score, totalQuestions);
      }
    }, 1500);
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const submitAnswer = () => {
    setShowResult(true);
    nextQuestion();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizCompleted(false);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeSpent(0);
    setShowExplanations(false);
    setStreak(0);
    setMaxStreak(0);
    setHintsUsed(0);
  };

  const toggleHint = () => {
    if (!showHint) {
      setHintsUsed(hintsUsed + 1);
    }
    setShowHint(!showHint);
  };

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
    if (score >= 90) return { 
      title: '🎯 Parfait !', 
      message: 'Vous êtes un expert des cartouches horlogers ISO !',
      emoji: '🏆'
    };
    if (score >= 80) return { 
      title: '⭐ Excellent !', 
      message: 'Très bonnes connaissances en normalisation horlogère',
      emoji: '🌟'
    };
    if (score >= 70) return { 
      title: '👍 Bien !', 
      message: 'Bonnes bases, continuez à vous perfectionner',
      emoji: '💪'
    };
    if (score >= 60) return { 
      title: '📚 Passable', 
      message: 'Approfondissez vos connaissances des normes ISO',
      emoji: '📖'
    };
    return { 
      title: '🎓 À améliorer', 
      message: 'Reprenez les bases des cartouches et normes ISO',
      emoji: '💡'
    };
  };

  const getPerformanceBadges = (score: number, time: number, streak: number) => {
    const badges = [];
    
    if (score === 100) badges.push({ icon: '🏆', name: 'Score Parfait', color: 'bg-yellow-500' });
    if (score >= 90) badges.push({ icon: '⭐', name: 'Excellence', color: 'bg-purple-500' });
    if (streak >= 5) badges.push({ icon: '🔥', name: 'Série de ' + streak, color: 'bg-orange-500' });
    if (time < totalQuestions * 30) badges.push({ icon: '⚡', name: 'Rapidité', color: 'bg-blue-500' });
    if (hintsUsed === 0) badges.push({ icon: '🎯', name: 'Sans Aide', color: 'bg-green-500' });
    
    return badges;
  };

  // Écran de résultat final amélioré
  if (isQuizCompleted) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.round(userAnswers.reduce((sum, a) => sum + a.timeSpent, 0));
    const scoreMessage = getScoreMessage(score);
    const grade = getScoreGrade(score);
    const badges = getPerformanceBadges(score, totalTime, maxStreak);

    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Célébration animée */}
            <div className="relative inline-block">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className={`text-8xl mb-4`}
              >
                {scoreMessage.emoji}
              </motion.div>
              
              {/* Confetti effect for high scores */}
              {score >= 80 && (
                <>
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      x: [-10, 10, -10],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-0 text-4xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      x: [10, -10, 10],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 right-0 text-4xl"
                  >
                    ⭐
                  </motion.div>
                </>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {scoreMessage.title}
            </motion.h1>

            {/* Score avec grade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className={`text-7xl font-black ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className={`text-5xl font-bold px-6 py-3 rounded-2xl ${
                score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              } text-white`}>
                {grade}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={`text-xl mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {scoreMessage.message}
            </motion.p>
          </motion.div>

          {/* Badges de performance */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`${badge.color} text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span>{badge.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Statistiques détaillées améliorées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className={`p-6 rounded-2xl text-center transform hover:scale-105 transition-transform ${
              darkMode ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200'
            }`}>
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {correctAnswers}/{totalQuestions}
              </div>
              <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                Bonnes réponses
              </p>
            </div>

            <div className={`p-6 rounded-2xl text-center transform hover:scale-105 transition-transform ${
              darkMode ? 'bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200'
            }`}>
              <Clock className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-
