'use client';

/**
 * PAGE: Quiz sur un mouvement spécifique
 * CHEMIN: src/app/theorie/mouvements/[id]/quiz/page.tsx
 * DESCRIPTION: Page de quiz interactif pour tester les connaissances sur un mouvement avec système de scoring et révision
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Check, X, Clock, Trophy, Star,
  ArrowRight, ArrowLeft, RotateCcw, Sparkles,
  Target, TrendingUp, Award, BookOpen,
  ChevronRight, Zap, AlertCircle, Home,
  CheckCircle2, XCircle, HelpCircle, Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { modules } from '../../data';

// ============================================================================
// TYPES
// ============================================================================

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  category: 'Théorie' | 'Technique' | 'Sécurité' | 'Progression';
}

interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizStats {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number;
  difficulty: string;
}

// ============================================================================
// COMPONENTS
// ============================================================================

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
      />
    </div>
  );
};

const DifficultyBadge = ({ difficulty }: { difficulty: QuizQuestion['difficulty'] }) => {
  const configs = {
    'Facile': { 
      bg: 'bg-green-100 dark:bg-green-900/30', 
      text: 'text-green-700 dark:text-green-300', 
      border: 'border-green-300 dark:border-green-700',
      icon: '🌱'
    },
    'Moyen': { 
      bg: 'bg-amber-100 dark:bg-amber-900/30', 
      text: 'text-amber-700 dark:text-amber-300', 
      border: 'border-amber-300 dark:border-amber-700',
      icon: '⚡'
    },
    'Difficile': { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      text: 'text-red-700 dark:text-red-300', 
      border: 'border-red-300 dark:border-red-700',
      icon: '🔥'
    },
  };

  const config = configs[difficulty];

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${config.bg} ${config.text} ${config.border} border-2 inline-flex items-center gap-2`}>
      <span>{config.icon}</span>
      {difficulty}
    </span>
  );
};

const CategoryBadge = ({ category }: { category: QuizQuestion['category'] }) => {
  const configs = {
    'Théorie': { icon: Brain, color: 'text-blue-600 dark:text-blue-400' },
    'Technique': { icon: Target, color: 'text-purple-600 dark:text-purple-400' },
    'Sécurité': { icon: AlertCircle, color: 'text-red-600 dark:text-red-400' },
    'Progression': { icon: TrendingUp, color: 'text-green-600 dark:text-green-400' },
  };

  const config = configs[category];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4" />
      {category}
    </span>
  );
};

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  selectedAnswer, 
  onSelectAnswer,
  showResult,
  timeSpent
}: { 
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult: boolean;
  timeSpent: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold">
              Question {questionNumber}/{totalQuestions}
            </span>
            <CategoryBadge category={question.category} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {question.question}
          </h2>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <DifficultyBadge difficulty={question.difficulty} />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.floor(timeSpent)}s
            </span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrectAnswer = showResult && isCorrect;
          const showWrongAnswer = showResult && isSelected && !isCorrect;

          let borderColor = 'border-slate-300 dark:border-slate-600';
          let bgColor = 'bg-white dark:bg-slate-800';
          let hoverBg = 'hover:bg-slate-50 dark:hover:bg-slate-700';

          if (showCorrectAnswer) {
            borderColor = 'border-green-500 dark:border-green-400';
            bgColor = 'bg-green-50 dark:bg-green-900/20';
            hoverBg = '';
          } else if (showWrongAnswer) {
            borderColor = 'border-red-500 dark:border-red-400';
            bgColor = 'bg-red-50 dark:bg-red-900/20';
            hoverBg = '';
          } else if (isSelected) {
            borderColor = 'border-blue-500 dark:border-blue-400';
            bgColor = 'bg-blue-50 dark:bg-blue-900/20';
          }

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 ${borderColor} ${bgColor} ${hoverBg} transition-all text-left flex items-center justify-between group`}
            >
              <span className="flex items-center gap-3 flex-1">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm
                  ${showCorrectAnswer ? 'border-green-500 bg-green-500 text-white' : 
                    showWrongAnswer ? 'border-red-500 bg-red-500 text-white' : 
                    isSelected ? 'border-blue-500 bg-blue-500 text-white' : 
                    'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'}`}
                >
                  {showCorrectAnswer ? <Check className="w-5 h-5" /> :
                   showWrongAnswer ? <X className="w-5 h-5" /> :
                   String.fromCharCode(65 + index)}
                </span>
                <span className={`font-medium ${
                  showResult ? 'text-slate-900 dark:text-slate-100' : 
                  'text-slate-700 dark:text-slate-300'
                }`}>
                  {option}
                </span>
              </span>

              {showCorrectAnswer && (
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
              {showWrongAnswer && (
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`p-4 rounded-xl border-2 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-start gap-3">
                <Lightbulb className={`w-5 h-5 mt-0.5 ${
                  selectedAnswer === question.correctAnswer
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-blue-600 dark:text-blue-400'
                }`} />
                <div>
                  <h3 className={`font-bold mb-1 ${
                    selectedAnswer === question.correctAnswer
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-blue-900 dark:text-blue-100'
                  }`}>
                    {selectedAnswer === question.correctAnswer ? 'Bravo !' : 'Explication'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    selectedAnswer === question.correctAnswer
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResultsScreen = ({ 
  stats, 
  results, 
  questions,
  onRetry,
  onBackToConcept
}: { 
  stats: QuizStats;
  results: QuizResult[];
  questions: QuizQuestion[];
  onRetry: () => void;
  onBackToConcept: () => void;
}) => {
  const percentage = Math.round((stats.score / stats.totalQuestions) * 100);
  
  let grade = '';
  let gradeColor = '';
  let gradeIcon = '';
  let message = '';

  if (percentage >= 90) {
    grade = 'Excellent !';
    gradeColor = 'text-green-600 dark:text-green-400';
    gradeIcon = '🏆';
    message = 'Performance exceptionnelle ! Vous maîtrisez parfaitement ce concept.';
  } else if (percentage >= 70) {
    grade = 'Très Bien';
    gradeColor = 'text-blue-600 dark:text-blue-400';
    gradeIcon = '⭐';
    message = 'Bonne compréhension ! Continuez ainsi.';
  } else if (percentage >= 50) {
    grade = 'Bien';
    gradeColor = 'text-amber-600 dark:text-amber-400';
    gradeIcon = '👍';
    message = 'Vous êtes sur la bonne voie. Revoyez quelques points.';
  } else {
    grade = 'À Revoir';
    gradeColor = 'text-red-600 dark:text-red-400';
    gradeIcon = '📚';
    message = 'Prenez le temps de réviser le concept avant de réessayer.';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Score Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center mb-8 shadow-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Trophy className="w-12 h-12" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold mb-3"
        >
          {percentage}%
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-2"
        >
          {gradeIcon} {grade}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-blue-100 text-lg mb-6"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{stats.correctAnswers}</div>
            <div className="text-sm text-blue-100">Correctes</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <XCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{stats.totalQuestions - stats.correctAnswers}</div>
            <div className="text-sm text-blue-100">Incorrectes</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{Math.floor(stats.averageTime)}</div>
            <div className="text-sm text-blue-100">Moy. (s)</div>
          </div>
        </motion.div>
      </div>

      {/* Question Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-100">
          <BookOpen className="w-7 h-7" />
          Révision des Questions
        </h2>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const result = results.find(r => r.questionId === question.id);
            const isCorrect = result?.isCorrect ?? false;

            return (
              <div
                key={question.id}
                className={`p-4 rounded-xl border-2 ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium mb-1 ${
                      isCorrect
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      Question {index + 1} : {question.question}
                    </p>
                    <p className={`text-sm ${
                      isCorrect
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect 
                        ? `✓ ${question.options[question.correctAnswer]}`
                        : `✗ Réponse correcte : ${question.options[question.correctAnswer]}`
                      }
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isCorrect
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}>
                    {result?.timeSpent ? `${Math.floor(result.timeSpent)}s` : '-'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-6 h-6" />
          Recommencer le Quiz
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToConcept}
          className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-6 h-6" />
          Retour au Concept
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const conceptId = params.id as string;

  // Trouver le concept dans modules
  const concept = modules.find(m => m.id === conceptId);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Generate questions based on concept
  const generateQuestions = (): QuizQuestion[] => {
    if (!concept) return [];

    // Questions génériques basées uniquement sur les propriétés disponibles
    const baseQuestions: QuizQuestion[] = [
      {
        id: `${conceptId}-q1`,
        question: `Quel est le titre de ce mouvement ?`,
        options: [
          concept.title,
          'Salto arrière groupé',
          'Salto avant tendu',
          'Vrille complète'
        ],
        correctAnswer: 0,
        explanation: `Le mouvement s'appelle "${concept.title}". Il est important de connaître le nom exact des mouvements pour une communication claire.`,
        difficulty: 'Facile',
        category: 'Théorie'
      },
      {
        id: `${conceptId}-q2`,
        question: `Quelle est la description de ce mouvement ?`,
        options: [
          concept.description || 'Description non disponible',
          'Un mouvement de rotation',
          'Une position statique',
          'Un mouvement de transition'
        ],
        correctAnswer: 0,
        explanation: `La description du mouvement est : "${concept.description}". Cette description aide à comprendre l'essence du mouvement.`,
        difficulty: 'Moyen',
        category: 'Théorie'
      },
      {
        id: `${conceptId}-q3`,
        question: `Quel est le niveau de difficulté recommandé pour ce mouvement ?`,
        options: [
          concept.level,
          concept.level === 'Débutant' ? 'Intermédiaire' : 'Débutant',
          'Expert',
          'Professionnel'
        ],
        correctAnswer: 0,
        explanation: `Ce mouvement est de niveau ${concept.level}. Respecter les niveaux de difficulté est crucial pour progresser en sécurité.`,
        difficulty: 'Facile',
        category: 'Progression'
      },
      {
        id: `${conceptId}-q4`,
        question: `Pourquoi est-il important de respecter la progression recommandée ?`,
        options: [
          'Pour éviter les blessures et progresser efficacement',
          'Pour impressionner les autres',
          'Ce n\'est pas important',
          'Pour aller plus vite'
        ],
        correctAnswer: 0,
        explanation: `Respecter la progression permet d'éviter les blessures et de construire des bases solides. Chaque niveau prépare aux suivants.`,
        difficulty: 'Moyen',
        category: 'Sécurité'
      },
      {
        id: `${conceptId}-q5`,
        question: `Quelle est la meilleure approche pour maîtriser "${concept.title}" ?`,
        options: [
          'Progresser étape par étape avec un bon échauffement',
          'Essayer directement le mouvement complet',
          'S\'entraîner seul sans supervision',
          'Ignorer les conseils de sécurité'
        ],
        correctAnswer: 0,
        explanation: `La meilleure approche est toujours de progresser étape par étape, en s'échauffant correctement et en respectant les consignes de sécurité.`,
        difficulty: 'Difficile',
        category: 'Technique'
      }
    ];

    return baseQuestions;
  };

  const questions = generateQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  // Redirect if concept not found
  useEffect(() => {
    if (!concept) {
      router.push('/theorie/mouvements');
    }
  }, [concept, router]);

  // Handle answer selection
  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const isCorrect = index === currentQuestion.correctAnswer;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer: index,
      isCorrect,
      timeSpent
    };

    setResults([...results, result]);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    } else {
      setIsQuizComplete(true);
    }
  };

  // Handle previous question (review mode)
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    }
  };

  // Retry quiz
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults([]);
    setIsQuizComplete(false);
    setQuestionStartTime(Date.now());
  };

  // Calculate stats
  const calculateStats = (): QuizStats => {
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
    
    return {
      score: correctAnswers,
      totalQuestions: questions.length,
      correctAnswers,
      averageTime: results.length > 0 ? totalTime / results.length : 0,
      difficulty: concept?.level || 'Intermédiaire'
    };
  };

  if (!concept) {
    return null;
  }

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 py-12 px-4">
        <ResultsScreen
          stats={calculateStats()}
          results={results}
          questions={questions}
          onRetry={handleRetry}
          onBackToConcept={() => router.push(`/theorie/mouvements/${conceptId}`)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href={`/theorie/mouvements/${conceptId}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au concept
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Quiz : {concept.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Testez vos connaissances sur ce concept
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {questions.length} questions
                </span>
              </div>
            </div>

            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            showResult={showResult}
            timeSpent={(Date.now() - questionStartTime) / 1000}
          />
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Précédent
          </motion.button>

          {showResult && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Suivant
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Voir les Résultats
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
