import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Trophy, Star, RefreshCw, CheckCircle, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { quizData } from './data';
import { QuizQuestion } from '../types';

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

  // Timer pour chaque question (optionnel)
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
      // Quiz terminé
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
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { title: 'Excellent !', message: 'Vous maîtrisez parfaitement les cartouches horlogers ISO' };
    if (score >= 80) return { title: 'Très bien !', message: 'Vous avez de solides connaissances en normalisation horlogère' };
    if (score >= 70) return { title: 'Bien !', message: 'Vous connaissances sont correctes, quelques révisions recommandée' };
    if (score >= 60) return { title: 'Passable', message: 'Il vous faut approfondir vos connaissances des normes ISO' };
    return { title: 'À améliorer', message: 'Reprendre les bases des cartouches horlogers et normes ISO' };
  };

  // Écran de résultat final
  if (isQuizCompleted) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.round(userAnswers.reduce((sum, a) => sum + a.timeSpent, 0));
    const scoreMessage = getScoreMessage(score);

    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            {/* Icône de résultat */}
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quiz Terminé !
            </h1>

            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </div>

            <h2 className={`text-2xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {scoreMessage.title}
            </h2>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {scoreMessage.message}
            </p>
          </motion.div>

          {/* Statistiques détaillées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className={`p-6 rounded-xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {correctAnswers}/{totalQuestions}
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bonnes réponses</p>
            </div>

            <div className={`p-6 rounded-xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}>
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Temps total</p>
            </div>

            <div className={`p-6 rounded-xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}>
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {Math.round(totalTime / totalQuestions)}s
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Moyenne/question</p>
            </div>
          </motion.div>

          {/* Boutons d'action */}
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

          {/* Explications détaillées */}
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

  // Quiz en cours
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête du quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quiz des Cartouches Horlogers
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Testez vos connaissances sur les normes ISO 7200 et ISO 5457
          </p>
        </motion.div>

        {/* Barre de progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Question {currentQuestion + 1} sur {totalQuestions}
            </span>
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {Math.round(progress)}% complété
            </span>
          </div>
          <div className={`w-full h-3 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-2xl mb-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentQ.question}
            </h2>
          </div>

          {/* Options de réponse */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : darkMode
                      ? 'border-gray-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentQuestion === 0
                ? 'opacity-50 cursor-not-allowed'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Précédent</span>
          </button>

          <button
            onClick={submitAnswer}
            disabled={selectedAnswer === null}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedAnswer === null
                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <span>{currentQuestion === totalQuestions - 1 ? 'Terminer' : 'Suivant'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Conseils */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 p-6 rounded-xl ${
            darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            💡 Conseil pour cette question
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-blue-100' : 'text-blue-600'
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
        </motion.div>
      </div>
    </div>
  );
};
