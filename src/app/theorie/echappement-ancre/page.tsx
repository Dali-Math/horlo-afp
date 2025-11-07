// app/theorie/echappement-ancre/page.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Activity, Zap, Clock, Heart, Settings2, Trophy, Award, RotateCcw, BookOpen, CheckCircle, XCircle, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Définition des types
type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
};

// Données du quiz enrichies
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

// Composant réutilisable pour les cartes d'information
const InfoCard = ({ icon: Icon, title, children, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700 transition-all hover:shadow-lg"
  >
    <div className="flex items-center mb-3">
      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
    </div>
    <div className="text-slate-700 dark:text-slate-300">{children}</div>
  </motion.div>
);

// Composant principal
export default function EchappementAncre() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Optimisation avec useMemo pour éviter les recalculs
  const pourcentageScore = useMemo(() => {
    return Math.round((score / quizData.length) * 100);
  }, [score]);

  // useCallback pour éviter les re-rendus inutiles
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-bold mb-6 flex items-center justify-center mx-auto w-fit">
            <Settings2 className="w-5 h-5 mr-2" />
            Organe de distribution
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            L'Échappement à Ancre Suisse
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Le cœur battant de la montre : découvrez le mécanisme qui transforme l'énergie en impulsions régulières avec une précision extrême
          </p>

          {/* Animation du tic-tac */}
          <div className="inline-flex items-center gap-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
            <span>TIC</span>
            <span className="text-purple-600">•</span>
            <span>TAC</span>
            <span className="text-purple-600">•</span>
            <span>TIC</span>
          </div>
        </div>

        {/* Principe et fonction */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-blue-600" />
            Principe et fonction de l'échappement
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              L'<strong className="text-slate-900 dark:text-white font-bold">échappement</strong> est l'organe qui distribue l'énergie du barillet au balancier sous forme d'impulsions régulières. 
              Il remplit une <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 px-2 py-1 rounded font-bold">double fonction essentielle</span> :
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-10">
              <InfoCard icon={Zap} title="1. Entretien" delay={0.1}>
                L'échappement <strong>entretient les oscillations</strong> du balancier en lui donnant une impulsion à chaque alternance pour compenser les pertes d'énergie dues aux frottements.
              </InfoCard>

              <InfoCard icon={Clock} title="2. Comptage" delay={0.2}>
                À chaque alternance, il laisse <strong>"échapper une dent"</strong> de la roue d'échappement, permettant au rouage d'avancer par saccades au rythme imposé par le balancier.
              </InfoCard>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 border-l-4 border-purple-600">
              <div className="flex items-start">
                <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">💓 Le "tic-tac" de la montre</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Le bruit caractéristique "tic-tac" d'une montre mécanique est produit par l'échappement : chaque "tic" et chaque "tac" correspond à une impulsion donnée au balancier. 
                    À 28'800 A/h, vous entendez 8 battements par seconde !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Les 3 éléments */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Settings2 className="w-8 h-8 mr-3 text-green-600" />
            Les 3 éléments de l'échappement à ancre
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-10">
              L'échappement à ancre suisse se compose de <strong>trois éléments principaux</strong> qui travaillent en parfaite synchronisation :
            </p>

            <div className="space-y-8">
              {/* Élément 1 */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 md:p-8 border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-6">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">1. La Roue d'Échappement</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Roue dentée spéciale (généralement 15 dents) dont la géométrie est étudiée pour permettre le dégagement et transmettre l'impulsion. 
                      Elle reçoit l'énergie du rouage et la transmet à l'ancre.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Dents standard</div>
                      </div>
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Acier</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Trempé poli</div>
                      </div>
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">1 tour/min</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Vitesse typique</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Élément 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 md:p-8 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">2. L'Ancre (Fourchette)</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Pièce pivotante en forme de T ou Y portant <strong>deux palettes en rubis</strong> (entrée et sortie) qui alternativement bloquent et libèrent la roue d'échappement. 
                      La fourchette à l'extrémité de l'ancre interagit avec la cheville du plateau de balancier.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">2 rubis</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Palettes (dureté 9 Mohs)</div>
                      </div>
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">15°-30°</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Angle de basculement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Élément 3 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 md:p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">3. Le Plateau de Balancier</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Disque fixé sur l'axe du balancier portant la <strong>cheville</strong> (petit cylindre en rubis) qui pousse la fourchette de l'ancre à chaque passage. 
                      Il comporte aussi l'<strong>encoche de sécurité</strong> (dard) pour éviter les blocages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">0.15-0.20 mm</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Ø de la cheville</div>
                      </div>
                      <div className="bg-white dark:bg-slate-700 p-4 rounded-lg text-center">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Sécurité</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Encoche anti-galop</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fonctionnement en 4 phases */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-purple-600" />
            Fonctionnement en 4 phases
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-10">
              Le cycle de l'échappement se déroule en <strong>quatre phases successives</strong> à chaque alternance du balancier :
            </p>

            <div className="space-y-6">
              {[
                { phase: '1. Repos', color: 'blue', description: 'Une palette de l\'ancre bloque la roue d\'échappement. L\'ancre est maintenue en position par le tirage (pression de la dent sur la palette). Le balancier oscille librement pendant son arc supplémentaire (~270-300°).' },
                { phase: '2. Dégagement (Comptage)', color: 'green', description: 'La cheville du plateau pousse la fourchette, qui fait pivoter l\'ancre. La palette libère la roue d\'échappement : une dent "échappe". Le rouage avance d\'un cran. C\'est le "tic".' },
                { phase: '3. Impulsion', color: 'purple', description: 'Immédiatement après le dégagement, la dent de la roue pousse sur le plan incliné de la palette et transmet une impulsion au balancier via l\'ancre et la fourchette. C\'est cette énergie qui compense les frottements et maintient l\'amplitude.' },
                { phase: '4. Chute', color: 'orange', description: 'L\'ancre bascule complètement : la palette opposée vient bloquer la dent suivante de la roue d\'échappement. C\'est le "tac". L\'ancre est de nouveau maintenue par le tirage jusqu\'à la prochaine alternance.' }
              ].map((item, i) => (
                <motion.div
                  key={item.phase}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">{item.phase}</h4>
                      <p className="text-slate-700 dark:text-slate-300">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-l-4 border-amber-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2 text-amber-600" />
                ⚡ Données chiffrées
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="font-bold text-amber-600 dark:text-amber-400">0.125s</div>
                  <div className="text-slate-600 dark:text-slate-400">Durée d'une alternance</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="font-bold text-amber-600 dark:text-amber-400">50-55°</div>
                  <div className="text-slate-600 dark:text-slate-400">Angle d'impulsion</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="font-bold text-amber-600 dark:text-amber-400">270-300°</div>
                  <div className="text-slate-600 dark:text-slate-400">Arc supplémentaire</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="font-bold text-amber-600 dark:text-amber-400">320-330°</div>
                  <div className="text-slate-600 dark:text-slate-400">Amplitude totale</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Premium */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-white flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
                Masterclass Quiz
              </h2>
              <div className="text-white text-sm bg-slate-700 px-4 py-2 rounded-full">
                Expert Level
              </div>
            </div>

            {!quizCompleted ? (
              <>
                {/* Barre de progression */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2 text-white">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} / {quizData.length}
                    </span>
                    <span className="text-sm font-medium">
                      Score : {score} pts
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question avec image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-8"
                  >
                    {quizData[currentQuestion].image && (
                      <div className="w-full h-48 bg-slate-700 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                        <Image
                          src={quizData[currentQuestion].image}
                          alt="Illustration technique"
                          width={300}
                          height={200}
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute text-slate-400 text-sm flex items-center gap-2">
                          <Info className="w-4 h-4 animate-pulse" />
                          Illustration technique
                        </div>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                      {quizData[currentQuestion].question}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                {/* Options */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === null
                          ? 'bg-slate-800 border-slate-600 hover:border-blue-500 hover:bg-slate-700 cursor-pointer'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'bg-green-900/30 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-900/30 border-red-500'
                          : 'bg-slate-800 border-slate-600 opacity-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                          selectedAnswer === null
                            ? 'border-slate-500'
                            : index === quizData[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : selectedAnswer === index
                            ? 'border-red-500 bg-red-500'
                            : 'border-slate-500'
                        }`}>
                          {selectedAnswer !== null && (
                            <CheckCircle className={`w-5 h-5 ${
                              index === quizData[currentQuestion].correctAnswer || selectedAnswer === index
                                ? 'text-white'
                                : 'text-slate-500'
                            }`} />
                          )}
                        </div>
                        <div>
                          <span className={`font-semibold ${
                            selectedAnswer === null
                              ? 'text-white'
                              : index === quizData[currentQuestion].correctAnswer
                              ? 'text-green-400'
                              : selectedAnswer === index
                              ? 'text-red-400'
                              : 'text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <p className={`ml-3 text-white mt-1 ${
                            selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer
                              ? 'line-through opacity-60'
                              : ''
                          }`}>{option}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explication et bouton suivant */}
                <AnimatePresence>
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-900/30 border border-blue-500 rounded-xl p-6"
                      >
                        <div className="flex items-start">
                          {selectedAnswer === quizData[currentQuestion].correctAnswer ? 
                            <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /> :
                            <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                          }
                          <div>
                            <h4 className={`font-bold text-lg mb-2 ${
                              selectedAnswer === quizData[currentQuestion].correctAnswer ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {selectedAnswer === quizData[currentQuestion].correctAnswer ? 'Exact !' : 'Presque...'}
                            </h4>
                            <p className="text-slate-300">{quizData[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.button
                        onClick={handleNextQuestion}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
                      >
                        {currentQuestion < quizData.length - 1 ? 
                          <>Question suivante <Trophy className="w-5 h-5" /></> : 
                          <>Voir les résultats <Award className="w-5 h-5" /></>
                        }
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              // Résultats finaux
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-yellow-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <span className="text-5xl font-bold text-white">{pourcentageScore}%</span>
                </motion.div>

                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  {pourcentageScore >= 80 ? 'Maître Horloger !' : 
                   pourcentageScore >= 60 ? 'Expert Confirmé' : 
                   'Apprenti Horloger'}
                </h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-300 mb-8"
                >
                  Score final : {score} / {quizData.length} ({pourcentageScore}%)
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Recommencer
                  </motion.button>
                  <Link 
                    href="/theorie"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    Autres leçons
                  </Link>
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="inline-flex items-center gap-3 bg-slate-800 rounded-full px-6 py-3 border border-slate-600"
                >
                  <Award className={`w-6 h-6 ${
                    pourcentageScore >= 80 ? 'text-yellow-500' : 
                    pourcentageScore >= 60 ? 'text-blue-500' : 'text-slate-500'
                  }`} />
                  <span className="text-white font-medium">
                    {pourcentageScore >= 80 ? 'Badge Maître Horloger obtenu !' : 
                     pourcentageScore >= 60 ? 'Badge Expert obtenu !' : 
                     'Continuez votre apprentissage !'}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
