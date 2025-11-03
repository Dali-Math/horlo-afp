import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Clock, Award, RotateCcw } from 'lucide-react';
import { QuizFinal } from '../../data/quizData';

interface QuizStandardProps {
  quiz: QuizFinal;
  onComplete: (score: number, total: number) => void;
}

const QuizStandard: React.FC<QuizStandardProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 secondes par question
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showExplanation && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeout();
    }
  }, [timeLeft, showExplanation, isCompleted]);

  const handleTimeout = () => {
    const newAnswers = [...answers, false];
    setAnswers(newAnswers);
    setShowExplanation(true);
    
    if (isLastQuestion) {
      setTimeout(() => finishQuiz(newAnswers), 2000);
    } else {
      setTimeout(() => nextQuestion(newAnswers), 2000);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Passer à la question suivante après 3 secondes
    setTimeout(() => {
      if (isLastQuestion) {
        finishQuiz(newAnswers);
      } else {
        nextQuestion(newAnswers);
      }
    }, 3000);
  };

  const nextQuestion = (newAnswers?: boolean[]) => {
    const answersToUse = newAnswers || answers;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(30);
  };

  const finishQuiz = (finalAnswers: boolean[]) => {
    setIsCompleted(true);
    const finalScore = finalAnswers.filter(Boolean).length;
    setTimeout(() => onComplete(finalScore, quiz.questions.length), 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setTimeLeft(30);
    setIsCompleted(false);
    setAnswers([]);
  };

  if (!currentQuestion && !isCompleted) {
    return (
      <div className="text-center text-white">
        <p>Aucune question disponible pour ce quiz.</p>
      </div>
    );
  }

  // Écran de fin
  if (isCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const getResultColor = () => {
      if (percentage >= 80) return 'from-green-500 to-emerald-500';
      if (percentage >= 60) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    };

    const getResultMessage = () => {
      if (percentage >= 90) return 'Maîtrise exceptionnelle !';
      if (percentage >= 80) return 'Excellente performance !';
      if (percentage >= 70) return 'Très bon résultat !';
      if (percentage >= 60) return 'Bon travail !';
      return 'Continuez vos efforts !';
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-white/10 rounded-2xl p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Quiz Terminé !</h3>
            <p className="text-white/70">{getResultMessage()}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-r ${getResultColor()} rounded-xl p-6 mb-6`}
          >
            <div className="text-4xl font-bold text-white mb-2">
              {score}/{quiz.questions.length}
            </div>
            <div className="text-white/90">{percentage}% de réussite</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <button
              onClick={restartQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Recommencer</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header avec progression et timer */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-white/70">
          Question {currentQuestionIndex + 1} sur {quiz.questions.length}
        </div>
        <div className="flex items-center space-x-2 text-white">
          <Clock className="w-5 h-5 text-amber-400" />
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-amber-400'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-8">
        <motion.div
          className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
            {currentQuestion.prompt}
          </h3>

          {/* Réponses */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              let buttonClass = "w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ";
              
              if (showExplanation) {
                if (index === currentQuestion.correctIndex) {
                  buttonClass += "bg-green-500/20 border-green-400 text-green-100";
                } else if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
                  buttonClass += "bg-red-500/20 border-red-400 text-red-100";
                } else {
                  buttonClass += "bg-white/5 border-white/20 text-white/60";
                }
              } else {
                buttonClass += "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-amber-400/50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1">{choice}</span>
                    {showExplanation && index === currentQuestion.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explication */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 rounded-xl p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-amber-400 mb-2">Explication :</h4>
            <p className="text-white/90 leading-relaxed">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score actuel */}
      <div className="text-center text-white/70">
        Score actuel : {score}/{answers.length}
      </div>
    </motion.div>
  );
};

export default QuizStandard;