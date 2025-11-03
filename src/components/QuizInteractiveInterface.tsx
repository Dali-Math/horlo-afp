import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { QuizFinal, Question } from '../data/quizData';

interface QuizSession {
  quiz: QuizFinal;
  currentQuestionIndex: number;
  answers: any[];
  score: number;
  startTime: number;
  isCompleted: boolean;
}

interface QuizInteractiveInterfaceProps {
  quiz: QuizFinal;
  session: QuizSession | null;
  onExit: () => void;
  onNext: (session: QuizSession) => void;
  onComplete: (session: QuizSession) => void;
}

const QuizInteractiveInterface: React.FC<QuizInteractiveInterfaceProps> = ({ 
  quiz, 
  session, 
  onExit, 
  onNext, 
  onComplete 
}) => {
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(session);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60); // Convertir en secondes
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (currentSession && !currentSession.isCompleted && isActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSession, isActive, timeLeft]);

  const startQuiz = () => {
    setIsActive(true);
    setTimeLeft(quiz.duration * 60);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || showExplanation || gameOver) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentSession) return;

    const currentQuestion = quiz.questions[currentSession.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    
    const newAnswer = {
      questionIndex: currentSession.currentQuestionIndex,
      selectedIndex: selectedAnswer,
      isCorrect,
      timeSpent: Date.now() - currentSession.startTime
    };

    const newSession = {
      ...currentSession,
      answers: [...currentSession.answers, newAnswer],
      score: isCorrect ? currentSession.score + 1 : currentSession.score
    };

    setCurrentSession(newSession);
    setShowExplanation(true);

    // Auto-advance après 3 secondes
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (!currentSession) return;

    const nextIndex = currentSession.currentQuestionIndex + 1;
    
    if (nextIndex >= quiz.questions.length) {
      finishQuiz();
    } else {
      const newSession = {
        ...currentSession,
        currentQuestionIndex: nextIndex,
        startTime: Date.now()
      };
      setCurrentSession(newSession);
      onNext(newSession);
    }
    
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const finishQuiz = () => {
    if (!currentSession) return;
    
    const finishedSession = {
      ...currentSession,
      isCompleted: true
    };
    
    setCurrentSession(finishedSession);
    setGameOver(true);
    setIsActive(false);
    onComplete(finishedSession);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!currentSession || gameOver) {
    const score = currentSession?.score || 0;
    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen pt-20 pb-8 flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">{quiz.title} - Terminé !</h2>
            
            <div className="text-6xl font-bold mb-4">
              <span className={getScoreColor(score, totalQuestions)}>{score}</span>
              <span className="text-white/50">/{totalQuestions}</span>
            </div>
            
            <div className={`text-2xl font-semibold mb-6 ${getScoreColor(score, totalQuestions)}`}>
              {percentage >= 90 ? 'Excellent !' : percentage >= 70 ? 'Bien joué !' : percentage >= 50 ? 'Pas mal !' : 'À améliorer'} ({percentage}%)
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{totalQuestions}</div>
                <div className="text-white/70 text-sm">Questions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">{quiz.duration} min</div>
                <div className="text-white/70 text-sm">Durée</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{quiz.difficulty}</div>
                <div className="text-white/70 text-sm">Niveau</div>
              </div>
            </div>
            
            <button
              onClick={onExit}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Retour au Quiz Hub
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = quiz.questions[currentSession.currentQuestionIndex];
  const progress = ((currentSession.currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (!isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen pt-20 pb-8 flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">{quiz.title}</h2>
            <p className="text-white/70 mb-6">{quiz.subtitle}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{quiz.questionsCount}</div>
                <div className="text-white/70 text-sm">Questions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">{quiz.duration} min</div>
                <div className="text-white/70 text-sm">Durée</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{quiz.difficulty}</div>
                <div className="text-white/70 text-sm">Niveau</div>
              </div>
            </div>
            
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Commencer le Quiz
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onExit}
            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-3 text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au contenu</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              {quiz.title}
            </h1>
            <p className="text-white/70">{quiz.subtitle}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">
              Question {currentSession.currentQuestionIndex + 1} sur {quiz.questions.length}
            </span>
            <span className="text-white/70 text-sm">{Math.round(progress)}% complété</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentSession.currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {currentQuestion.prompt}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedAnswer === index
                    ? selectedAnswer === currentQuestion.correctIndex
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-red-500 bg-red-500/20 text-red-400'
                    : selectedAnswer === currentQuestion.correctIndex && showExplanation
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50 text-white'
                }`}
              >
                <div className="flex items-center">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{choice}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 mr-3" />
                )}
                <h4 className="text-white font-semibold">
                  {selectedAnswer === currentQuestion.correctIndex ? 'Correct !' : 'Incorrect'}
                </h4>
              </div>
              <p className="text-white/80">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        {selectedAnswer !== null && !showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={submitAnswer}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Confirmer</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizInteractiveInterface;
