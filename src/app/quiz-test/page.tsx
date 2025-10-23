// app/quiz/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Target, BookOpen, TrendingUp, Award } from 'lucide-react';
import { getAllQuizzes, getQuizResults, getGlobalStats } from '@/data/quizzes';

export default function QuizListPage() {
  const quizzes = getAllQuizzes();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(getGlobalStats());
  }, []);

  return (
    <main className="min-h-screen bg-dark-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl md:text-7xl text-light-100 mb-4 animate-fade-in">
            Quiz Horlogerie
          </h1>
          <p className="font-inter text-lg text-light-200 max-w-2xl mx-auto animate-fade-in-up">
            Testez vos connaissances sur l'horlogerie suisse avec nos quiz interactifs.
            Progressez à votre rythme, sans inscription requise.
          </p>
        </div>

        {/* Statistiques globales */}
        {stats && stats.totalQuizzes > 0 && (
          <div className="mb-12 p-6 rounded-xl border border-white/10 bg-dark-800/50 backdrop-blur">
            <h2 className="font-oswald text-xl text-gold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Vos statistiques
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-dark-900/50">
                <div className="font-bebas text-3xl text-gold mb-1">
                  {stats.totalQuizzes}
                </div>
                <div className="font-inter text-sm text-light-200">
                  Quiz complétés
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-dark-900/50">
                <div className="font-bebas text-3xl text-gold mb-1">
                  {stats.averageScore}%
                </div>
                <div className="font-inter text-sm text-light-200">
                  Score moyen
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-dark-900/50">
                <div className="font-bebas text-3xl text-gold mb-1">
                  {stats.totalQuestions}
                </div>
                <div className="font-inter text-sm text-light-200">
                  Questions répondues
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-dark-900/50">
                <div className="font-bebas text-3xl text-gold mb-1">
                  {Math.floor(stats.totalTimeSpent / 60)}min
                </div>
                <div className="font-inter text-sm text-light-200">
                  Temps d'apprentissage
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Liste des quiz */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const results = getQuizResults(quiz.id);
            const lastResult = results.length > 0 ? results[results.length - 1] : null;
            const bestScore = results.length > 0 
              ? Math.max(...results.map((r: any) => r.percentage))
              : null;

            return (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="group rounded-xl border border-white/10 bg-dark-800/50 backdrop-blur p-6 hover:bg-dark-800/70 hover:border-gold/30 transition-all hover:shadow-lg hover:shadow-gold/10"
              >
                {/* Badge difficulté */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-dark-900 text-xs font-oswald text-gold">
                      {quiz.questions.length} questions
                    </span>
                    {quiz.duration && (
                      <span className="px-3 py-1 rounded-full bg-dark-900 text-xs font-oswald text-light-200">
                        {quiz.duration}min
                      </span>
                    )}
                  </div>
                  
                  {bestScore !== null && (
                    <div className="flex items-center gap-1">
                      <Award className={`w-4 h-4 ${bestScore >= quiz.passingScore ? 'text-gold' : 'text-light-200/50'}`} />
                      <span className={`text-xs font-oswald ${bestScore >= quiz.passingScore ? 'text-gold' : 'text-light-200/50'}`}>
                        {bestScore}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Titre et description */}
                <h3 className="font-bebas text-2xl text-light-100 mb-3 group-hover:text-gold transition">
                  {quiz.title}
                </h3>
                
                <p className="font-inter text-sm text-light-200 mb-4 line-clamp-3">
                  {quiz.description}
                </p>

                {/* Informations */}
                <div className="flex items-center gap-4 text-xs text-light-200/70 mb-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{quiz.passingScore}% requis</span>
                  </div>
                </div>

                {/* Statut */}
                {lastResult ? (
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-light-200/70 font-inter">
                        Dernier essai :
                      </span>
                      <span className={`font-oswald ${
                        lastResult.percentage >= quiz.passingScore 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {lastResult.score}/{lastResult.totalQuestions} ({lastResult.percentage}%)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-gold font-oswald text-sm">
                      Nouveau quiz →
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Section informative */}
        <div className="mt-16 p-8 rounded-xl border border-white/10 bg-dark-800/30 backdrop-blur">
          <h2 className="font-bebas text-3xl text-light-100 mb-6 text-center">
            Comment ça fonctionne ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-oswald text-lg text-gold mb-2">
                Choisissez un quiz
              </h3>
              <p className="font-inter text-sm text-light-200">
                Sélectionnez un quiz adapté à votre niveau et testez vos connaissances
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-oswald text-lg text-gold mb-2">
                Répondez aux questions
              </h3>
              <p className="font-inter text-sm text-light-200">
                Recevez un feedback immédiat avec des explications détaillées
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-oswald text-lg text-gold mb-2">
                Suivez votre progression
              </h3>
              <p className="font-inter text-sm text-light-200">
                Vos résultats sont sauvegardés localement pour suivre votre évolution
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-light-200/50 font-inter mt-8">
            💾 Vos données sont stockées localement sur votre appareil. Aucun compte requis.
          </p>
        </div>
      </div>
    </main>
  );
}
