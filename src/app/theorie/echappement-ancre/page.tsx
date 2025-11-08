// app/theorie/echappement-ancre/page.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Activity, Zap, Clock, Heart, Settings2, Trophy, Award, RotateCcw, BookOpen, CheckCircle, XCircle, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
};

const quizData: QuizQuestion[] = [
  {
    question: "Quelle est la fonction principale de l'échappement dans une montre mécanique ?",
    options: [
      "Stocker l'énergie",
      "Transformer l'énergie continue en impulsions régulières",
      "Afficher l'heure",
      "Remonter le ressort"
    ],
    correctAnswer: 1,
    explanation: "L'échappement transforme l'énergie continue du barillet en impulsions régulières qui entretiennent l'oscillation du balancier. C'est le 'cœur battant' de la montre qui produit le tic-tac.",
    image: "/images/echappement-fonction.png"
  },
  {
    question: "Combien d'éléments principaux composent l'échappement à ancre suisse ?",
    options: ["2 éléments", "3 éléments", "5 éléments", "7 éléments"],
    correctAnswer: 1,
    explanation: "L'échappement à ancre suisse comporte 3 éléments principaux : la roue d'échappement (dentée), l'ancre (avec 2 palettes en rubis) et le plateau de balancier (avec sa cheville).",
    image: "/images/echappement-elements.png"
  },
  {
    question: "Quelle est la fréquence d'oscillation la plus courante en horlogerie moderne ?",
    options: ["18'000 A/h (2.5 Hz)", "21'600 A/h (3 Hz)", "28'800 A/h (4 Hz)", "36'000 A/h (5 Hz)"],
    correctAnswer: 2,
    explanation: "La fréquence de 28'800 alternances par heure (4 Hz) est la plus répandue dans l'horlogerie moderne. Cela correspond à 8 battements par seconde (4 aller-retours).",
    image: "/images/frequence-oscillation.png"
  },
  {
    question: "Quel matériau est utilisé pour les palettes de l'ancre ?",
    options: ["Acier trempé", "Rubis synthétique", "Saphir", "Diamant"],
    correctAnswer: 1,
    explanation: "Les palettes de l'ancre sont en rubis synthétique (corindon Al₂O₃). Le rubis réduit considérablement les frottements et l'usure grâce à sa dureté exceptionnelle.",
    image: "/images/palettes-rubis.png"
  },
  {
    question: "Qu'est-ce que le 'tirage' dans un échappement ?",
    options: [
      "La force du ressort",
      "L'action qui maintient l'ancre en position de repos",
      "Le bruit du tic-tac",
      "La vitesse du balancier"
    ],
    correctAnswer: 1,
    explanation: "Le tirage est l'action qui maintient l'ancre appuyée contre sa goupille de limitation (butée) pendant le repos. Il est assuré par la géométrie des dents de la roue d'échappement.",
    image: "/images/tirage-echappement.png"
  }
];

const InfoCard = ({ icon: Icon, title, children }: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700 transition-all hover:shadow-lg">
    <div className="flex items-center mb-3">
      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
    </div>
    <div className="text-slate-700 dark:text-slate-300">{children}</div>
  </div>
);

export default function EchappementAncre() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const pourcentageScore = useMemo(() => {
    return Math.round((score / quizData.length) * 100);
  }, [score]);

  const handleAnswerClick = useCallback((index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === quizData[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  }, [selectedAnswer, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  }, []);

  // ✅ CODE PROPRE - RIEN AVANT LE RETURN
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-bold mb-6">
            <Settings2 className="w-5 h-5 mr-2" />
            Organe de distribution
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            L'Échappement à Ancre Suisse
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Le cœur battant de la montre : découvrez le mécanisme qui transforme l'énergie en impulsions régulières avec une précision extrême
          </p>
          <div className="inline-flex items-center gap-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
            <span>TIC</span><span className="text-purple-600">•</span><span>TAC</span><span className="text-purple-600">•</span><span>TIC</span>
          </div>
        </div>

        {/* Principe */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-blue-600" />
            Principe et fonction de l'échappement
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              L'<strong className="text-slate-900 dark:text-white font-bold">échappement</strong> est l'organe qui distribue l'énergie du barillet au balancier sous forme d'impulsions régulières. 
              Il remplit une <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 px-2 py-1 rounded font-bold">double fonction essentielle</span> :
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-10">
              <InfoCard icon={Zap} title="1. Entretien">
                L'échappement <strong>entretient les oscillations</strong> du balancier en lui donnant une impulsion à chaque alternance pour compenser les pertes d'énergie dues aux frottements.
              </InfoCard>

              <InfoCard icon={Clock} title="2. Comptage">
                À chaque alternance, il laisse <strong>"échapper une dent"</strong> de la roue d'échappement, permettant au rouage d'avancer par saccades au rythme imposé par le balancier.
              </InfoCard>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
              Masterclass Quiz
            </h2>

            {!quizCompleted ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2 text-white">
                    <span>Question {currentQuestion + 1} / {quizData.length}</span>
                    <span>Score : {score} pts</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <motion.div
                      className="bg-blue-500 h-3 rounded-full"
                      animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-8">
                      {quizData[currentQuestion].question}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === null
                          ? 'bg-slate-800 border-slate-600 hover:border-blue-500'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'bg-green-900/30 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-900/30 border-red-500'
                          : 'bg-slate-800 border-slate-600 opacity-50'
                      }`}
                    >
                      <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="bg-blue-900/30 border border-blue-500 rounded-xl p-6 mb-6">
                        <p className="text-slate-300">{quizData[currentQuestion].explanation}</p>
                      </div>
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl"
                      >
                        {currentQuestion < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {pourcentageScore >= 80 ? 'Maître Horloger !' : 
                   pourcentageScore >= 60 ? 'Expert Confirmé' : 
                   'Apprenti Horloger'}
                </h3>
                <p className="text-xl text-slate-300 mb-8">
                  Score final : {score} / {quizData.length} ({pourcentageScore}%)
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Recommencer
                  </button>
                  <Link 
                    href="/theorie"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    Autres leçons
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
