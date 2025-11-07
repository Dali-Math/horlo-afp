import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, Trophy, Star, RefreshCw, CheckCircle, X, ArrowRight, ArrowLeft, Zap, Target, Award, TrendingUp } from 'lucide-react';
import { quizData } from '../data';
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [combo, setCombo] = useState(0);

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
  }, [currentQuestion]);
