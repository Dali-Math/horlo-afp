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
import { concepts as conceptGroups } from '../../data';

// Transformer en structure modules si nécessaire
const modules = conceptGroups;
import type { Concept } from '../../types';

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
  let gradeIcon = '';
  let message = '';

  if (percentage >= 90) {
    grade = 'Excellent !';
    gradeIcon = '🏆';
    message = 'Performance exceptionnelle ! Vous maîtrisez parfaitement ce concept.';
  } else if (percentage >= 70) {
    grade = 'Très Bien';
    gradeIcon = '⭐';
    message = 'Bonne compréhension ! Continuez ainsi.';
  } else if (percentage >= 50) {
    grade = 'Bien';
    gradeIcon = '👍';
    message = 'Vous êtes sur la bonne voie. Revoyez quelques points.';
  } else {
    grade = 'À Revoir';
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

  // ✅ Correction : recherche dans la structure correcte
  let concept: Concept | undefined;

for (const module of modules) {
  const found = module.concepts.find((c: any) => c.id === conceptId);
  
  if (found) {
    concept = {
      ...found,
      category: module.title
    };
    break;
  }
}

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // ✅ Questions génériques utilisant UNIQUEMENT id, title, desc, level
  const generateQuestions = (): QuizQuestion[] => {
    if (!concept) return [];

    const allLevels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
    const correctLevelIndex = allLevels.indexOf(concept.level);
    const wrongLevels = allLevels.filter((_, i) => i !== correctLevelIndex);

    // Créer les options pour chaque question
    const titleOptions = [
      concept.title,
      'Système de transmission automatique',
      'Mécanisme de régulation avancé',
      'Dispositif de chronométrage'
    ];

    const levelOptions = [
      concept.level,
      ...wrongLevels.slice(0, 3)
    ];

    const descOptions = [
      concept.desc || 'Description non disponible',
      'Un système de remontage manuel',
      'Une complication de calendrier',
      'Un dispositif anti-choc'
    ];

    const baseQuestions: QuizQuestion[] = [
      {
        id: `${conceptId}-q1`,
        question: `Comment s'appelle ce concept ?`,
        options: titleOptions,
        correctAnswer: 0,
        explanation: `Le concept s'appelle "${concept.title}". ${concept.desc}`,
        difficulty: 'Facile',
        category: 'Théorie'
      },
      {
        id: `${conceptId}-q2`,
        question: `Quel est le niveau de ce concept ?`,
        options: levelOptions,
        correctAnswer: 0,
        explanation: `Ce concept est de niveau ${concept.level}. ${
          concept.level === 'Débutant' ? 'Il est accessible aux débutants.' :
          concept.level === 'Intermédiaire' ? 'Une base technique est requise.' :
          concept.level === 'Expert' ? 'Ce concept est réservé aux experts.' :
        'Une maîtrise avancée est requise.'
        }`,
        difficulty: 'Facile',
        category: 'Théorie'
      },
      {
        id: `${conceptId}-q3`,
        question: `Quelle est la description correcte de ce concept ?`,
        options: descOptions,
        correctAnswer: 0,
        explanation: `La description exacte est : "${concept.desc}"`,
        difficulty: 'Moyen',
        category: 'Théorie'
      },
      {
        id: `${conceptId}-q4`,
        question: `Quelle est la meilleure approche pour comprendre ce concept ?`,
        options: [
          'Étudier les bases théoriques avant la pratique',
          'Essayer sans préparation',
          'Ignorer les consignes',
          'Se fier uniquement à l\'intuition'
        ],
        correctAnswer: 0,
        explanation: `Une bonne compréhension théorique est essentielle avant toute manipulation pratique, surtout pour les concepts de niveau ${concept.level}.`,
        difficulty: 'Moyen',
        category: 'Progression'
      },
      {
        id: `${conceptId}-q5`,
        question: `Pourquoi est-il important de respecter le niveau de difficulté indiqué ?`,
        options: [
          'Pour progresser de manière sûre et efficace',
          'Ce n\'est pas important',
          'Pour impressionner les autres',
          'Pour aller plus vite'
        ],
        correctAnswer: 0,
        explanation: `Respecter les niveaux permet de construire des bases solides et d'éviter les erreurs coûteuses. Ce concept est classé ${concept.level}, ce qui reflète les prérequis nécessaires.`,
        difficulty: 'Moyen',
        category: 'Sécurité'
      }
    ];

    return baseQuestions;
  };

  const questions = generateQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!concept) {
      router.push('/theorie/mouvements');
    }
  }, [concept, router]);

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

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults([]);
    setQuestionStartTime(Date.now());
    setIsQuizComplete(false);
  };

  const handleBackToConcept = () => {
    router.push(`/theorie/mouvements/${conceptId}`);
  };

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-slate-600 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const stats: QuizStats = {
    score: results.filter(r => r.isCorrect).length,
    totalQuestions: questions.length,
    correctAnswers: results.filter(r => r.isCorrect).length,
    averageTime: results.length > 0 
      ? results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length 
      : 0,
    difficulty: concept.level
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {!isQuizComplete && (
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
                    {concept.desc}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {currentQuestionIndex + 1}/{questions.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Questions
                  </div>
                </div>
              </div>

              <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            </div>
          </motion.div>
        )}

        {/* Quiz Content */}
        <AnimatePresence mode="wait">
          {isQuizComplete ? (
            <ResultsScreen
              stats={stats}
              results={results}
              questions={questions}
              onRetry={handleRetry}
              onBackToConcept={handleBackToConcept}
            />
          ) : (
            <div key={currentQuestionIndex}>
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
                showResult={showResult}
                timeSpent={(Date.now() - questionStartTime) / 1000}
              />

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  disabled={!showResult}
                  className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg transition-all ${
                    showResult
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Question Suivante' : 'Voir les Résultats'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
