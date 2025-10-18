'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book } from 'lucide-react';
import Link from 'next/link';

interface ViewExplanation {
  id: string;
  title: string;
  description: string;
  position: string;
  info: string;
}

const viewsData: ViewExplanation[] = [
  /* ... identique à avant ... */
  // garde la structure d'origine ici
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  /* ... identique à avant ... */
  // garde la structure d'origine ici
];

export default function VuesTechniquesPage() {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleViewClick = (viewId: string) => {
    setSelectedView(viewId);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);
      if (answerIndex === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const selectedViewData = viewsData.find(v => v.id === selectedView);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie/lecture-de-plan" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
            Les normes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Vues Techniques (ISO 128-3)
          </h1>
        </div>

        {/* Interactive Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Schéma Interactif</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">Cliquez sur l'image pour afficher l'explication pédagogique.</p>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
            {/* ... SVG identique ... */}
          </div>
          {/* Explanation Panel */}
          {selectedViewData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedViewData.title}</h3>
              <p className="text-lg text-blue-800 dark:text-blue-200 font-semibold mb-2">{selectedViewData.description}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3"><strong>Position :</strong> {selectedViewData.position}</p>
              <p className="text-slate-700 dark:text-slate-200">{selectedViewData.info}</p>
            </div>
          )}
        </section>

        {/* Mémo Technique */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Mémo Technique : Erreurs & Bonnes Pratiques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Erreurs */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700/40">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-4 flex items-center">
                <XCircle className="w-6 h-6 mr-2" />
                Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                {/* ... identique ... */}
              </ul>
            </div>
            {/* Bonnes pratiques */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700/40">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                {/* ... identique ... */}
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Quiz : Teste tes connaissances</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            {/* ... adapt toutes les couleurs du quiz comme dans AnimatedStats pour le bg, text, borders avec dark: ... */}
            {/* Template similaire à la solution homepage */}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vidéo : Vues et Projections Orthogonales</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/E78OzvzKYmQ" 
                title="Projection orthogonale des vues - CHFO" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contexte, table, etc. */}
        {/* Ajoute partout bg-white dark:bg-slate-800, text-slate-900 dark:text-white, text-slate-600 dark:text-slate-300, border-slate-200 dark:border-slate-700 */}

        {/* Footer */}
        <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-400 dark:text-slate-500">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
