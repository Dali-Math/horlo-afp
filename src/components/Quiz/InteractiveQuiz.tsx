// components/Quiz/InteractiveQuiz.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, RotateCcw, Trophy, Clock } from 'lucide-react';

// Types
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category?: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  duration?: number; // en minutes
  passingScore: number; // pourcentage pour réussir
  questions: QuizQuestion[];
}

interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
  timeSpent: number; // en secondes
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
}

interface InteractiveQuizProps {
  quiz: QuizData;
  onComplete?: (result: QuizResult) => void;
}

export default function InteractiveQuiz({ quiz, onComplete }: InteractiveQuizProps) {
  // État du quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; isCorrect: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, startTime]);

  // Charger les résultats précédents depuis localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem(`quiz-results-${quiz.id}`);
    if (savedResults) {
      // Optionnel : afficher l'historique
    }
  }, [quiz.id]);

  // Gérer la sélection d'une réponse
  const handleSelectAnswer = (answerIndex: number) => {
    if (showExplanation) return; // Empêcher de changer après validation
    setSelectedAnswer(answerIndex);
  };

  // Valider la réponse
  const handleValidateAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
      },
    ]);
    
    setShowExplanation(true);
  };

  // Question suivante
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  // Terminer le quiz
  const completeQuiz = () => {
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    const result: QuizResult = {
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      completedAt: new Date(),
      timeSpent: timeElapsed,
      answers,
    };

    // Sauvegarder dans localStorage
    saveResultToLocalStorage(result);

    setIsCompleted(true);
    onComplete?.(result);
  };

  // Sauvegarder dans localStorage
  const saveResultToLocalStorage = (result: QuizResult) => {
    const key = `quiz-results-${quiz.id}`;
    const existingResults = localStorage.getItem(key);
    const results = existingResults ? JSON.parse(existingResults) : [];
    
    results.push(result);
    
    // Garder seulement les 10 derniers résultats
    if (results.length > 10) {
      results.shift();
    }
    
    localStorage.setItem(key, JSON.stringify(results));
  };

  // Recommencer le quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setIsCompleted(false);
    setTimeElapsed(0);
  };

  // Formater le temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Écran de résultats
  if (isCompleted) {
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Carte de résultats */}
        <div className="rounded-xl border border-white/10 bg-dark-800/50 backdrop-blur p-8">
          {/* Badge de réussite */}
          <div className="flex justify-center mb-6">
            {passed ? (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center animate-glow">
                <Trophy className="w-12 h-12 text-dark-900" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-dark-700 flex items-center justify-center">
                <RotateCcw className="w-12 h-12 text-light-200" />
              </div>
            )}
          </div>

          {/* Titre */}
          <h2 className="font-bebas text-4xl text-center text-light-100 mb-2">
            {passed ? 'Félicitations !' : 'Continuez vos efforts'}
          </h2>
          
          <p className="font-inter text-light-200 text-center mb-8">
            {passed 
              ? 'Vous avez réussi le quiz avec succès !' 
              : 'Un peu plus de révision et ce sera parfait.'}
          </p>

          {/* Score */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-lg bg-dark-900/50">
              <div className="font-bebas text-3xl text-gold mb-1">
                {score}/{quiz.questions.length}
              </div>
              <div className="font-inter text-sm text-light-200">
                Bonnes réponses
              </div>
            </div>

            <div className="text-center p-4 rounded-lg bg-dark-900/50">
              <div className="font-bebas text-3xl text-gold mb-1">
                {percentage}%
              </div>
              <div className="font-inter text-sm text-light-200">
                Score final
              </div>
            </div>

            <div className="text-center p-4 rounded-lg bg-dark-900/50">
              <div className="font-bebas text-3xl text-gold mb-1">
                {formatTime(timeElapsed)}
              </div>
              <div className="font-inter text-sm text-light-200">
                Temps écoulé
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-inter text-light-200 mb-2">
              <span>Seuil de réussite : {quiz.passingScore}%</span>
              <span className={passed ? 'text-gold' : 'text-red-400'}>
                {passed ? '✓ Réussi' : '✗ Non réussi'}
              </span>
            </div>
            <div className="h-3 rounded-full bg-dark-900 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full ${passed ? 'bg-gradient-to-r from-gold to-gold-light' : 'bg-gradient-to-r from-red-600 to-red-400'}`}
              />
            </div>
          </div>

          {/* Analyse détaillée */}
          <div className="mb-8 p-6 rounded-lg bg-dark-900/30 border border-white/5">
            <h3 className="font-oswald text-xl text-gold mb-4">Analyse détaillée</h3>
            
            <div className="space-y-2">
              {quiz.questions.map((question, index) => {
                const answer = answers[index];
                return (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-3 rounded bg-dark-800/50"
                  >
                    <span className="font-inter text-sm text-light-200">
                      Question {index + 1}
                    </span>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 px-6 rounded-lg border border-white/10 font-oswald text-light-100 hover:bg-white/5 transition"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Recommencer
            </button>
            
            <button
              onClick={() => window.location.href = '/quiz'}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-gold to-gold-dark font-oswald text-dark-900 hover:shadow-lg hover:shadow-gold/20 transition"
            >
              Autres quiz
            </button>
          </div>

          {/* Note localStorage */}
          <p className="text-xs font-inter text-light-200/50 text-center mt-6">
            💾 Vos résultats sont sauvegardés localement sur cet appareil
          </p>
        </div>
      </motion.div>
    );
  }

  // Interface du quiz
  return (
    <div className="max-w-3xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10">
              <span className="font-oswald text-sm text-gold">
                Question {currentQuestionIndex + 1}/{quiz.questions.length}
              </span>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span className="font-oswald text-sm text-light-100">
                {formatTime(timeElapsed)}
              </span>
            </div>
          </div>

          <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10">
            <span className={`font-oswald text-sm ${
              currentQuestion.difficulty === 'facile' ? 'text-green-400' :
              currentQuestion.difficulty === 'moyen' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="h-2 rounded-full bg-dark-900 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="rounded-xl border border-white/10 bg-dark-800/50 backdrop-blur p-8 mb-6"
      >
        <h2 className="font-bebas text-2xl text-light-100 mb-8">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showCorrectAnswer = showExplanation;

            let buttonClasses = "w-full p-4 rounded-lg border text-left font-inter transition-all ";
            
            if (showCorrectAnswer) {
              if (isCorrect) {
                buttonClasses += "border-green-400/50 bg-green-400/10 text-light-100";
              } else if (isSelected && !isCorrect) {
                buttonClasses += "border-red-400/50 bg-red-400/10 text-light-100";
              } else {
                buttonClasses += "border-white/5 bg-dark-900/30 text-light-200/50";
              }
            } else {
              if (isSelected) {
                buttonClasses += "border-gold bg-gold/10 text-light-100 gold-glow";
              } else {
                buttonClasses += "border-white/10 bg-dark-900/30 text-light-200 hover:border-gold/50 hover:bg-gold/5";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={buttonClasses}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showCorrectAnswer && isCorrect ? 'border-green-400 bg-green-400' :
                    showCorrectAnswer && isSelected && !isCorrect ? 'border-red-400 bg-red-400' :
                    isSelected ? 'border-gold bg-gold' :
                    'border-white/20'
                  }`}>
                    {showCorrectAnswer && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-dark-900" />
                    )}
                    {showCorrectAnswer && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-dark-900" />
                    )}
                    {!showCorrectAnswer && isSelected && (
                      <div className="w-3 h-3 rounded-full bg-dark-900" />
                    )}
                  </div>
                  
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explication */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 rounded-lg bg-dark-900/50 border border-gold/20"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-oswald text-gold mb-2">Explication</h4>
                  <p className="font-inter text-sm text-light-200 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boutons d'action */}
        <div className="flex gap-4 mt-6">
          {!showExplanation ? (
            <button
              onClick={handleValidateAnswer}
              disabled={selectedAnswer === null}
              className={`flex-1 py-3 px-6 rounded-lg font-oswald transition ${
                selectedAnswer === null
                  ? 'bg-dark-700 text-light-200/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gold to-gold-dark text-dark-900 hover:shadow-lg hover:shadow-gold/20'
              }`}
            >
              Valider ma réponse
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-gold to-gold-dark font-oswald text-dark-900 hover:shadow-lg hover:shadow-gold/20 transition"
            >
              {currentQuestionIndex < quiz.questions.length - 1
                ? 'Question suivante →'
                : 'Voir les résultats 🏆'}
            </button>
          )}
        </div>
      </motion.div>

      {/* Navigation rapide */}
      <div className="flex gap-2 justify-center flex-wrap">
        {quiz.questions.map((_, index) => {
          const isAnswered = index < currentQuestionIndex || (index === currentQuestionIndex && showExplanation);
          const isCurrent = index === currentQuestionIndex;
          
          return (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-oswald text-sm ${
                isCurrent ? 'bg-gold text-dark-900 ring-2 ring-gold/50' :
                isAnswered ? 'bg-dark-800 text-gold border border-gold/30' :
                'bg-dark-900 text-light-200/50 border border-white/10'
              }`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
