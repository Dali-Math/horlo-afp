'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import ProgressTracker from './components/ProgressTracker';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import MarquesGallery from './components/MarquesGallery';
import QuizHub from './components/QuizHub';
import MecanismesSection from './components/MecanismesSection';
import QuizInterface from './components/QuizInterface';
import Footer from './components/Footer';
import { QuizFinal, TOUS_LES_QUIZZES, SECTIONS_EDUCATIVES } from './data/quizData';

type AppState = 'home' | 'quiz';

interface QuizSession {
  quiz: QuizFinal;
  currentQuestionIndex: number;
  answers: any[];
  score: number;
  startTime: number;
  isCompleted: boolean;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [appState, setAppState] = useState<AppState>('home');
  const [currentQuiz, setCurrentQuiz] = useState<QuizFinal | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('horlogerie-quiz-progress');
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
    
    const savedCompleted = localStorage.getItem('horlogerie-quiz-completed');
    if (savedCompleted) {
      setCompletedQuizzes(JSON.parse(savedCompleted));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    localStorage.setItem('horlogerie-quiz-progress', newProgress.toString());
  };

  const markQuizCompleted = (quizId: string) => {
    const updated = [...completedQuizzes, quizId];
    setCompletedQuizzes(updated);
    localStorage.setItem('horlogerie-quiz-completed', JSON.stringify(updated));
  };

  const startInteractiveQuiz = (quiz: QuizFinal) => {
    if (quiz.isInteractive) {
      setCurrentQuiz(quiz);
      setAppState('quiz');
    }
  };

  const startPersonalizedQuiz = (quiz: QuizFinal) => {
    if (quiz.isPersonalized) {
      setCurrentQuiz(quiz);
      setAppState('quiz');
    }
  };

  const exitQuiz = () => {
    setCurrentQuiz(null);
    setCurrentSession(null);
    setAppState('home');
  };

  const completeQuiz = (score: number, total: number) => {
    if (currentQuiz) {
      markQuizCompleted(currentQuiz.id);
      const progressBonus = currentQuiz.isPersonalized ? 25 : 20;
      const newProgress = Math.min(progress + progressBonus, 100);
      updateProgress(newProgress);
    }
  };

  const getQuizCount = () => TOUS_LES_QUIZZES.length;
  const getCompletedCount = () => completedQuizzes.length;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white' 
        : 'bg-gradient-to-br from-rose-50 via-amber-50 to-slate-50 text-slate-900'
    }`}>
      <ParticlesBackground />
      <Navigation 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        currentState={appState}
        onNavigateHome={() => setAppState('home')}
      />
      <ProgressTracker progress={progress} />
      
      <AnimatePresence mode="wait">
        {appState === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero 
              getQuizCount={getQuizCount}
              getCompletedCount={getCompletedCount}
            />
            <Timeline />
            <MarquesGallery />
            <QuizHub 
              quizzes={TOUS_LES_QUIZZES}
              completedQuizzes={completedQuizzes}
              onStartInteractiveQuiz={startInteractiveQuiz}
              onStartPersonalizedQuiz={startPersonalizedQuiz}
            />
            <MecanismesSection />
            <Footer />
          </motion.main>
        ) : (
          <QuizInterface
            key="quiz"
            quiz={currentQuiz}
            onExit={exitQuiz}
            onComplete={completeQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
