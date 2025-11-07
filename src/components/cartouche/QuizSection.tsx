import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Trophy, Star, RefreshCw, CheckCircle, X, ArrowRight, ArrowLeft, Zap, Target } from 'lucide-react';
import { quizData } from '@/components/data';

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
  const [startTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionTimer, setQuestionTimer] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
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

    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedAnswer,
      isCorrect,
      timeSpent: timeSpentOnQuestion
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizCompleted(true);
      const score = Math.round((updatedAnswers.filter(a => a.isCorrect).length / totalQuestions) * 100);
      onQuizComplete?.(score, totalQuestions);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      nextQuestion();
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizCompleted(false);
    setQuestionStartTime(Date.now());
    setShowExplanations(false);
    setStreak(0);
    setBestStreak(0);
    setShowFeedback(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { title: 'Excellent !', message: 'Vous maîtrisez parfaitement les cartouches horlogers ISO' };
    if (score >= 80) return { title: 'Très bien !', message: 'Vous avez de solides connaissances en normalisation horlogère' };
    if (score >= 70) return { title: 'Bien !', message: 'Vos connaissances sont correctes, quelques révisions recommandées' };
    if (score >= 60) return { title: 'Passable', message: 'Il vous faut approfondir vos connaissances des normes ISO' };
    return { title: 'À améliorer', message: 'Reprendre les bases des cartouches horlogers et normes ISO' };
  };

  if (isQuizCompleted) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.round(userAnswers.reduce((sum, a) => sum + a.timeSpent, 0));
    const scoreMessage = getScoreMessage(score);
    const avgTime = Math.round(totalTime / totalQuestions);

    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center relative ${
                score >= 80 ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 
                score >= 60 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 
                'bg-gradient-to-br from-red-400 to-pink-600'
              }`}
            >
              <Trophy className="w-16 h-16 text-white" />
              {score >= 80 && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-300"
                />
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {score >= 90 ? '🎉 Incroyable !' : 
               score >= 80 ? '🌟 Excellent !' :
               score >= 70 ? '👍 Bien joué !' :
               score >= 60 ? '📚 Pas mal !' :
               '💪 Continuez !'}
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className={`inline-block text-7xl md:text-8xl font-black mb-6 ${getScoreColor(score)} relative`}
            >
              <span className="relative z-10">{score}%</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl md:text-2xl mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {scoreMessage.message}
            </motion.p>

            {bestStreak > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-full ${
                  darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Meilleur combo: {bestStreak} réponses d'affilée !</span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl text-center relative overflow-hidden ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200'
              }`}
            >
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3 relative z-10" />
              <div className={`text-3xl font-black mb-1 relative z-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {correctAnswers}/{totalQuestions}
              </div>
              <p className={`text-sm font-medium relative z-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bonnes réponses
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl text-center ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200'
              }`}
            >
              <Clock className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
              </div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Temps total
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl text-center ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200'
              }`}
            >
              <Target className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {avgTime}s
              </div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Par question
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl text-center ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200'
              }`}
            >
              <Zap className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <div className={`text-3xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {bestStreak}
              </div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Meilleur combo
              </p>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                showExplanations
                  ? 'bg-purple-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showExplanations ? 'Masquer' : 'Voir'} les explications
            </button>

            <button
              onClick={resetQuiz}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refaire le quiz</span>
            </button>
          </div>

          <AnimatePresence>
            {showExplanations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 space-y-4"
              >
                <h3 className={`text-2xl font-bold text-center mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Explications Détaillées
                </h3>
                
                {userAnswers.map((answer, index) => {
                  const question = quizData.find(q => q.id === answer.questionId);
                  if (!question) return null;

                  return (
                    <div
                      key={answer.questionId}
                      className={`p-6 rounded-xl border-2 ${
                        answer.isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {answer.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <X className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-2 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Question {index + 1}: {question.question}
                          </h4>
                          <p className={`mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Votre réponse: <strong>{question.options[answer.selectedAnswer!]}</strong>
                          </p>
                          {!answer.isCorrect && (
                            <p className={`mb-2 ${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Bonne réponse: <strong>{question.options[question.correctAnswer]}</strong>
                            </p>
                          )}
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            💡 {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quiz Interactif 🎯
              </h1>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Cartouches Horlogers ISO
              </p>
            </div>

            <AnimatePresence>
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className={`px-6 py-3 rounded-2xl font-bold text-lg flex items-center space-x-2 ${
                    streak >= 5 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    streak >= 3 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                    'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
                  }`}
                >
                  <Zap className="w-6 h-6" />
                  <span>{streak} 🔥</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className={`flex-1 px-4 py-3 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Progression
                </span>
                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentQuestion + 1}/{totalQuestions}
                </span>
              </div>
            </div>
            
            <div className={`px-4 py-3 rounded-xl flex items-center space-x-2 ${
              darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <Clock className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {questionTimer}s
              </span>
            </div>

            {userAnswers.length > 0 && (
              <div className={`px-4 py-3 rounded-xl flex items-center space-x-2 ${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
              }`}>
                <Trophy className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100)}%
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`w-full h-4 rounded-full overflow-hidden ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2">
            {[...Array(totalQuestions)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentQuestion ? 'bg-green-500 scale-110' :
                  i === currentQuestion ? 'bg-blue-500 scale-125' :
                  'bg-gray-400 scale-75'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-3xl mb-8 relative overflow-hidden ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? '#fff' : '#000'} 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} />
            </div>

            <div className="flex items-start space-x-4 mb-6 relative z-10">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className={`text-sm font-semibold mb-2 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Question {currentQuestion + 1}
                </div>
                <h2 className={`text-xl md:text-2xl font-bold leading-relaxed ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentQ.question}
                </h2>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => !showFeedback && selectAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                      showCorrect ? 'border-green-500 bg-green-500/20' :
                      showWrong ? 'border-red-500 bg-red-500/20' :
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                        : darkMode
                        ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    whileHover={!showFeedback ? { scale: 1.02, x: 8 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    {isSelected && !showFeedback && (
                      <motion.div
                        layoutId="selected-bg"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="flex items-center space-x-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        showCorrect ? 'border-green-500 bg-green-500' :
                        showWrong ? 'border-red-500 bg-red-500' :
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : darkMode
                          ? 'border-gray-600 group-hover:border-gray-500'
                          : 'border-gray-300 group-hover:border-blue-400'
                      }`}>
                        {showCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : showWrong ? (
                          <X className="w-5 h-5 text-white" />
                        ) : isSelected ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 bg-white rounded-full"
                          />
                        ) : null}
                      </div>

                      <span className={`font-medium text-base md:text-lg flex-1 ${
                        showCorrect || showWrong ? 'text-white font-semibold' :
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {option}
                      </span>

                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className={`mt-6 p-5 rounded-2xl relative z-10 ${
                    lastAnswerCorrect
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : 'bg-red-500/20 border-2 border-red-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {lastAnswerCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-bold text-lg mb-1 ${
                        lastAnswerCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}>
                        {lastAnswerCorrect ? '✨ Correct !' : '❌ Incorrect'}
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <motion.button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
            className={`inline-flex items-center space-x-2 px-6 py-4 rounded-2xl font-semibold transition-all ${
              currentQuestion === 0
                ? 'opacity-30 cursor-not-allowed bg-gray-300'
                : darkMode
                ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-lg'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Précédent</span>
          </motion.button>

          <motion.button
            onClick={submitAnswer}
            disabled={selectedAnswer === null || showFeedback}
            whileHover={{ scale: selectedAnswer === null || showFeedback ? 1 : 1.05 }}
            whileTap={{ scale: selectedAnswer === null || showFeedback ? 1 : 0.95 }}
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all relative overflow-hidden ${
              selectedAnswer === null || showFeedback
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-200'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-xl shadow-blue-500/50'
            }`}
          >
            {!showFeedback && selectedAnswer !== null && (
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            )}
            <span className="relative z-10">
              {showFeedback ? 'Chargement...' : currentQuestion === totalQuestions - 1 ? 'Terminer 🎉' : 'Valider'}
            </span>
            {!showFeedback && <ArrowRight className="w-5 h-5 relative z-10" />}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 p-6 rounded-2xl relative overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-700/50' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💡
              </motion.div>
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                Astuce
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-blue-100' : 'text-blue-700'
            }`}>
              {currentQuestion === 0 && "Référez-vous à ISO 7200:2004 qui définit spécifiquement les champs de cartouches."}
              {currentQuestion === 1 && "La position du cartouche est strictement définie par ISO 5457."}
              {currentQuestion === 2 && "Les dimensions des zones d'identification sont normalisées."}
              {currentQuestion === 3 && "Les marges varient selon le format selon ISO 5457."}
              {currentQuestion === 4 && "Tous les champs ne sont pas obligatoires - certains sont conditionnels."}
              {currentQuestion === 5 && "L'indice de révision suit une progression logique alphabétique."}
              {currentQuestion === 6 && "Le format dépend de la taille et de la complexité des pièces."}
              {currentQuestion === 7 && "La méthode de projection varie selon les pays."}
              {currentQuestion === 8 && "Les tolérances générales sont normalisées selon la précision requise."}
              {currentQuestion === 9 && "La longueur recommandée assure la lisibilité optimale."}
              {currentQuestion === 10 && "Les matériaux horlogers ont des désignations normalisées."}
              {currentQuestion === 11 && "Le tableau de révision documente l'historique des modifications."}
              {currentQuestion === 12 && "Faites la différence entre obligatoires et conditionnels."}
              {currentQuestion === 13 && "Le rhodiage est une finition noble spécifique à l'horlogerie."}
              {currentQuestion === 14 && "L'échelle supérieure à 1:1 est nécessaire pour la miniaturisation horlogère."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
