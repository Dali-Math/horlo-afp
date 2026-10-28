// src/app/quiz/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressTracker from '@/components/ProgressTracker'
import ParticlesBackground from '@/components/ParticlesBackground'
import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import MarquesGallery from '@/components/MarquesGallery'
import QuizHub from '@/components/QuizHub'
import MecanismesSection from '@/components/MecanismesSection'
import QuizInterface from '@/components/QuizInterface'
import { QuizFinal, TOUS_LES_QUIZZES } from '@/data/quizData'

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
    <div className="quiz-page-shell min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-x-clip">
      <ParticlesBackground />
      <ProgressTracker progress={progress} />

      <main className="pt-24 pb-16">
        <AnimatePresence mode="wait">
          {appState === 'home' ? (
            <motion.div
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
            </motion.div>
          ) : (
            <QuizInterface
              key="quiz"
              quiz={currentQuiz}
              onExit={exitQuiz}
              onComplete={completeQuiz}
            />
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        /*
         * /quiz utilise encore plusieurs composants historiques construits pour
         * un fond sombre. Le pont global HorloLearn neutralise leurs gradients.
         * Ce scope restaure un thème cohérent sans toucher aux autres pages.
         */
        html:not(.dark) .hl-site-content .quiz-page-shell {
          background-color: var(--hl-bg) !important;
          background-image: linear-gradient(135deg, var(--hl-bg) 0%, var(--hl-bg-soft) 52%, var(--hl-bg) 100%) !important;
          color: var(--hl-ink) !important;
        }

        html.dark .hl-site-content .quiz-page-shell {
          background-color: #0f172a !important;
          background-image: linear-gradient(135deg, #0f172a 0%, #172554 48%, #1e293b 100%) !important;
          color: #f8fafc !important;
        }

        /* Hero : vraie lecture en mode clair au lieu du voile blanc actuel. */
        html:not(.dark) .hl-site-content .quiz-page-shell #hero > div.absolute.inset-0.z-0 > img {
          opacity: .16 !important;
          filter: saturate(.55) contrast(.92) !important;
        }

        html:not(.dark) .hl-site-content .quiz-page-shell #hero > div.absolute.inset-0.z-0 > div {
          background-color: transparent !important;
          background-image: linear-gradient(135deg, rgba(243,239,231,.82), rgba(250,247,241,.72) 46%, rgba(235,229,218,.9)) !important;
        }

        html.dark .hl-site-content .quiz-page-shell #hero > div.absolute.inset-0.z-0 > div {
          background-image: linear-gradient(135deg, rgba(0,0,0,.62), rgba(30,58,138,.38), rgba(0,0,0,.62)) !important;
        }

        /* Texte historique blanc -> encre/muted en clair. */
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white"] {
          color: var(--hl-ink) !important;
        }

        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white/50"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white/60"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white/70"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white/80"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="text-white/90"] {
          color: var(--hl-muted) !important;
        }

        /* Cartes glass : ivoire en clair. */
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-white/10"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-white/20"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-white/30"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-black/20"] {
          background-color: color-mix(in srgb, var(--hl-surface-strong) 88%, transparent) !important;
        }

        html:not(.dark) .hl-site-content .quiz-page-shell [class*="border-white/10"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="border-white/20"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="border-white/30"] {
          border-color: var(--hl-line) !important;
        }

        /* Les anciens panneaux de modales deviennent des surfaces éditoriales. */
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-slate-900/90"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-slate-900/95"] {
          background-color: color-mix(in srgb, var(--hl-surface-strong) 96%, transparent) !important;
          color: var(--hl-ink) !important;
          border-color: var(--hl-line) !important;
        }

        /* Restaure les gradients décoratifs neutralisés par le bridge global. */
        html:not(.dark) .hl-site-content .quiz-page-shell div[class*="bg-gradient-to-"]:not([class*="bg-clip-text"]) {
          background-image: linear-gradient(135deg, var(--hl-metal), #c47d38) !important;
        }

        html.dark .hl-site-content .quiz-page-shell div[class*="bg-gradient-to-"]:not([class*="bg-clip-text"]) {
          background-image: linear-gradient(135deg, #c2a36d, #c97d39) !important;
        }

        /* Les textes placés réellement sur une couleur/image restent blancs. */
        html:not(.dark) .hl-site-content .quiz-page-shell button[class*="bg-gradient-to-"][class*="text-white"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-blue-500"][class*="text-white"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-purple-500"][class*="text-white"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-green-500"][class*="text-white"],
        html:not(.dark) .hl-site-content .quiz-page-shell [class*="bg-gradient-to-"] [class*="text-white"] {
          color: #ffffff !important;
        }

        /* Le bloc progression fixe doit être lisible sur les deux thèmes. */
        html:not(.dark) .hl-site-content .quiz-page-shell .fixed.top-20.left-6 > div {
          background: color-mix(in srgb, var(--hl-surface-strong) 92%, transparent) !important;
          border-color: var(--hl-line) !important;
          box-shadow: 0 12px 32px rgba(22, 18, 13, .08) !important;
        }

        /* Timeline : ligne visible en clair même si les gradients globaux sont nettoyés. */
        html:not(.dark) .hl-site-content .quiz-page-shell #timeline div[class*="w-1 h-full bg-gradient-to-b"] {
          background-image: linear-gradient(to bottom, var(--hl-metal), #788596, #8b6a84) !important;
        }

        /* Images : conserver les overlays sombres pour les badges et légendes. */
        html:not(.dark) .hl-site-content .quiz-page-shell div.relative.h-48 > div[class*="bg-gradient-to-t"],
        html:not(.dark) .hl-site-content .quiz-page-shell div.relative.h-64 > div[class*="bg-gradient-to-t"] {
          background-image: linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.12), transparent) !important;
        }

        html:not(.dark) .hl-site-content .quiz-page-shell div.relative.h-48 [class*="text-white"],
        html:not(.dark) .hl-site-content .quiz-page-shell div.relative.h-64 [class*="text-white"] {
          color: #ffffff !important;
        }

        /* Boutons secondaires et filtres : bord net au lieu d'un blanc fantôme. */
        html:not(.dark) .hl-site-content .quiz-page-shell button[class*="bg-white/10"] {
          background: var(--hl-surface) !important;
          border-color: var(--hl-line) !important;
          color: var(--hl-ink) !important;
        }

        html:not(.dark) .hl-site-content .quiz-page-shell button[class*="bg-white/10"]:hover,
        html:not(.dark) .hl-site-content .quiz-page-shell button[class*="hover:bg-white/20"]:hover {
          background: var(--hl-bg-soft) !important;
          border-color: color-mix(in srgb, var(--hl-metal) 48%, var(--hl-line)) !important;
        }
      `}</style>
    </div>
  );
}

export default App;
