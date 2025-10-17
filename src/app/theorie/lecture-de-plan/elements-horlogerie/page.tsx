'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book, Droplets, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

interface NormExplanation {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  application: string;
  example: string;
}

const normsData: NormExplanation[] = [
  {
    id: 'etancheite',
    code: 'NIHS 92-20',
    title: 'Étanchéité des montres',
    category: 'Fiabilité',
    description: 'Équivalente à ISO 22810. Définit les exigences et tests pour les montres étanches (minimum 2 bar / 20 mètres)',
    application: 'Montres portées quotidiennement résistant à l\'eau (douche, natation courte durée)',
    example: 'Montre étanche 30m, 50m, 100m pour usage quotidien'
  },
  {
    id: 'plongee',
    code: 'NIHS 92-11',
    title: 'Montres de plongée',
    category: 'Fiabilité',
    description: 'Équivalente à ISO 6425. Exigences strictes pour montres de plongée (minimum 100m, lunette, lisibilité, résistance)',
    application: 'Plongée sous-marine professionnelle ou sportive avec exigences de sécurité renforcées',
    example: 'Montre de plongée certifiée 200m, 300m avec lunette unidirectionnelle'
  },
  {
    id: 'chocs',
    code: 'NIHS 91-30',
    title: 'Résistance aux chocs',
    category: 'Fiabilité mécanique',
    description: 'Définit les tests de chocs simulant une chute de 1m sur sol dur. Évalue la tenue mécanique du mouvement',
    application: 'Validation de la robustesse des assemblages vissés et des pivots face aux impacts du porter quotidien',
    example: 'Test de chute libre 1m, axes de balancier avec amortisseurs de chocs'
  },
  {
    id: 'vieillissement',
    code: 'NIHS 93-20',
    title: 'Vieillissement mécanique',
    category: 'Fiabilité mécanique',
    description: 'Tests de cycles répétés simulant le porter prolongé. Évalue l\'usure et la dégradation dans le temps',
    application: 'Protocole Chronofiable®: simulation de 6 mois de port en 21 jours (rotation, chocs, cycles thermiques)',
    example: 'Test de fiabilité à long terme, validation de la durabilité du mouvement'
  },
  {
    id: 'filetages',
    code: 'NIHS 06-12',
    title: 'Filetages horlogers',
    category: 'Construction',
    description: 'Basée sur ISO 1501. Définit les dimensions et tolérances des filetages miniatures horlogers',
    application: 'Visserie horlogère de précision, assemblages platine/ponts, fixations de composants',
    example: 'Vis M0.3 à M2, tolérances 4H/3G pour filetage intérieur, 5h/4g pour extérieur'
  },
  {
    id: 'chronometre',
    code: 'ISO 3159',
    title: 'Chronomètres mécaniques',
    category: 'Précision',
    description: 'Exigences minimales pour certification chronomètre COSC. Précision -4/+6 s/jour sur 15 jours, 5 positions, 3 températures',
    application: 'Certification officielle de la précision des mouvements mécaniques par le COSC',
    example: 'Mouvement certifié chronomètre avec bulletin officiel COSC'
  },
  {
    id: 'magnetisme',
    code: 'ISO 764',
    title: 'Résistance magnétique',
    category: 'Fiabilité',
    description: 'Définit les tests de résistance aux champs magnétiques. Montre doit résister à 4800 A/m sans altération de marche',
    application: 'Protection contre les champs magnétiques des appareils électroniques quotidiens',
    example: 'Spiral Nivachron, cage de Faraday, indication "antimagnétique"'
  }
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Que signifie l'acronyme NIHS ?",
    options: [
      "Normes Internationales Horlogères Suisses",
      "Normes de l'Industrie Horlogère Suisse",
      "Nouvelles Instructions Horlogères Standardisées",
      "Nomenclature Industrielle Horlogère Suisse"
    ],
    correctAnswer: 1,
    explanation: "NIHS signifie Normes de l'Industrie Horlogère Suisse. Ces normes sont élaborées par la Fédération de l'industrie horlogère suisse (FH)."
  },
  {
    id: 2,
    question: "Quelle norme définit l'étanchéité des montres pour usage quotidien ?",
    options: [
      "NIHS 92-11",
      "NIHS 92-20",
      "ISO 3159",
      "NIHS 91-30"
    ],
    correctAnswer: 1,
    explanation: "La norme NIHS 92-20 (équivalente à ISO 22810) définit les exigences pour les montres étanches destinées à un usage quotidien (minimum 2 bar / 20 mètres)."
  },
  {
    id: 3,
    question: "Quelle est la profondeur minimale requise pour une montre de plongée certifiée NIHS 92-11 ?",
    options: [
      "50 mètres",
      "100 mètres",
      "200 mètres",
      "300 mètres"
    ],
    correctAnswer: 1,
    explanation: "Selon NIHS 92-11 (ISO 6425), une montre de plongée doit résister à une immersion d'au moins 100 mètres et répondre à des critères supplémentaires (lunette, lisibilité, résistance)."
  },
  {
    id: 4,
    question: "La norme NIHS 91-30 teste la résistance aux chocs. À quelle hauteur de chute correspond-elle ?",
    options: [
      "50 cm",
      "1 mètre",
      "2 mètres",
      "3 mètres"
    ],
    correctAnswer: 1,
    explanation: "La norme NIHS 91-30 simule une chute libre de 1 mètre sur sol dur pour tester la résistance mécanique du mouvement et des assemblages."
  },
  {
    id: 5,
    question: "Quelle norme ISO définit les exigences pour les chronomètres mécaniques ?",
    options: [
      "ISO 764",
      "ISO 6425",
      "ISO 3159",
      "ISO 22810"
    ],
    correctAnswer: 2,
    explanation: "La norme ISO 3159 définit les exigences minimales pour la certification chronomètre COSC : précision de -4/+6 s/jour sur 15 jours, 5 positions, 3 températures."
  },
  {
    id: 6,
    question: "Que teste la norme NIHS 93-20 ?",
    options: [
      "L'étanchéité",
      "Le magnétisme",
      "Le vieillissement mécanique",
      "La précision"
    ],
    correctAnswer: 2,
    explanation: "NIHS 93-20 définit les tests de vieillissement mécanique, incluant des cycles répétés simulant le porter prolongé et l'usure dans le temps."
  },
  {
    id: 7,
    question: "Quelle intensité de champ magnétique une montre doit-elle résister selon ISO 764 ?",
    options: [
      "1000 A/m",
      "2400 A/m",
      "4800 A/m",
      "8000 A/m"
    ],
    correctAnswer: 2,
    explanation: "Selon ISO 764, une montre antimagnétique doit résister à un champ magnétique de 4800 A/m sans altération de sa marche."
  },
  {
    id: 8,
    question: "La norme NIHS 06-12 concerne quel aspect de l'horlogerie ?",
    options: [
      "Les bracelets",
      "Les filetages",
      "Les cadrans",
      "Les verres"
    ],
    correctAnswer: 1,
    explanation: "NIHS 06-12 définit les dimensions et tolérances des filetages miniatures horlogers, basée sur la norme ISO 1501."
  },
  {
    id: 9,
    question: "Quelle est la tolérance de marche quotidienne pour un chronomètre certifié COSC ?",
    options: [
      "-2/+2 secondes",
      "-4/+6 secondes",
      "-10/+10 secondes",
      "-1/+1 seconde"
    ],
    correctAnswer: 1,
    explanation: "Un chronomètre COSC certifié selon ISO 3159 doit respecter une précision de -4 à +6 secondes par jour lors des tests de certification."
  },
  {
    id: 10,
    question: "Combien existe-t-il de normes horlogères (NIHS, CEN, ISO) environ ?",
    options: [
      "50",
      "100",
      "Plus de 150",
      "Plus de 300"
    ],
    correctAnswer: 2,
    explanation: "Plus de 150 normes horlogères (NIHS, CEN, ISO) existent et sont régulièrement mises à jour par la Fédération Horlogère Suisse."
  },
  {
    id: 11,
    question: "Quel organisme suisse gère les normes NIHS ?",
    options: [
      "COSC",
      "Fédération Horlogère Suisse (FH)",
      "ISO/TC 114",
      "SNV"
    ],
    correctAnswer: 1,
    explanation: "La Fédération de l'industrie horlogère suisse (FH) est responsable de l'élaboration, de l'édition et de la distribution des documents normatifs NIHS."
  },
  {
    id: 12,
    question: "Qu'est-ce que le protocole Chronofiable® ?",
    options: [
      "Un test d'étanchéité",
      "Un test de vieillissement simulant 6 mois en 21 jours",
      "Un test de précision",
      "Un test de résistance magnétique"
    ],
    correctAnswer: 1,
    explanation: "Le protocole Chronofiable® est un test de fiabilité qui simule 6 mois de port en 21 jours avec rotation, chocs radiaux/axiaux et cycles thermiques."
  },
  {
    id: 13,
    question: "Une montre 'étanche 50m' peut-elle être utilisée pour la plongée sous-marine ?",
    options: [
      "Oui, sans restriction",
      "Non, elle n'est pas conçue pour la plongée",
      "Oui, jusqu'à 50m uniquement",
      "Seulement avec un scaphandre"
    ],
    correctAnswer: 1,
    explanation: "Une montre étanche 50m selon NIHS 92-20 résiste à l'eau lors d'activités quotidiennes (natation courte durée) mais n'est PAS destinée à la plongée sous-marine."
  },
  {
    id: 14,
    question: "Quelle caractéristique obligatoire pour une montre de plongée certifiée ?",
    options: [
      "Bracelet en acier uniquement",
      "Lunette tournante unidirectionnelle",
      "Mouvement automatique",
      "Couronne vissée obligatoire"
    ],
    correctAnswer: 1,
    explanation: "Selon NIHS 92-11, une montre de plongée doit obligatoirement posséder un système de contrôle du temps (généralement lunette tournante unidirectionnelle)."
  },
  {
    id: 15,
    question: "Les normes NIHS sont affiliées à quel organisme suisse de normalisation ?",
    options: [
      "METAS",
      "COSC",
      "SNV (Association suisse de normalisation)",
      "EPFL"
    ],
    correctAnswer: 2,
    explanation: "Les normes NIHS sont affiliées à l'Association suisse de normalisation (SNV), et les documents les plus récents portent un numéro SN en plus du numéro NIHS."
  }
];

export default function NormesNIHSPage() {
  const [selectedNorm, setSelectedNorm] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleNormClick = (normId: string) => {
    setSelectedNorm(normId);
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

  const selectedNormData = normsData.find(n => n.id === selectedNorm);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Fiabilité': return <Droplets className="w-5 h-5" />;
      case 'Fiabilité mécanique': return <Shield className="w-5 h-5" />;
      case 'Précision': return <Clock className="w-5 h-5" />;
      case 'Construction': return <Book className="w-5 h-5" />;
      default: return <Book className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie/lecture-de-plan" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Les normes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Éléments d'Horlogerie (Normes NIHS)
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Normes de l'Industrie Horlogère Suisse : standards de qualité, fiabilité et précision
          </p>
        </div>

        {/* Interactive Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Normes Principales</h2>
          <p className="text-slate-600 mb-8">Cliquez sur une norme pour voir ses détails et applications.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {normsData.map((norm) => (
              <div
                key={norm.id}
                onClick={() => handleNormClick(norm.id)}
                className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedNorm === norm.id ? 'border-blue-600 shadow-lg' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    norm.category === 'Fiabilité' ? 'bg-blue-100 text-blue-600' :
                    norm.category === 'Fiabilité mécanique' ? 'bg-green-100 text-green-600' :
                    norm.category === 'Précision' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {getCategoryIcon(norm.category)}
                  </div>
                  <span className="text-xs font-medium text-slate-500">{norm.category}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{norm.code}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-2">{norm.title}</p>
                <p className="text-sm text-slate-600 line-clamp-3">{norm.description}</p>
              </div>
            ))}
          </div>

          {/* Explanation Panel */}
          {selectedNormData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
              <div className="flex items-center mb-3">
                <h3 className="text-2xl font-bold text-slate-900">{selectedNormData.code}</h3>
                <span className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">{selectedNormData.category}</span>
              </div>
              <p className="text-lg text-blue-800 font-semibold mb-4">{selectedNormData.title}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-1">Description :</p>
                  <p className="text-slate-700">{selectedNormData.description}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-1">Application :</p>
                  <p className="text-slate-700">{selectedNormData.application}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-1">Exemple :</p>
                  <p className="text-slate-700">{selectedNormData.example}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Mémo Technique */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Mémo Technique : Erreurs & Bonnes Pratiques</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Erreurs */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                <XCircle className="w-6 h-6 mr-2" />
                Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Confondre étanchéité 50m (NIHS 92-20) avec aptitude à la plongée.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Négliger les tests de chocs (NIHS 91-30) lors de la conception.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Utiliser des filetages non conformes à NIHS 06-12.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Oublier le vieillissement mécanique (NIHS 93-20) avant commercialisation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Revendiquer "antimagnétique" sans tester selon ISO 764.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Ignorer les critères COSC (ISO 3159) pour un chronomètre.</span>
                </li>
              </ul>
            </div>

            {/* Bonnes pratiques */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Respecter strictement NIHS 92-20 ou 92-11 selon l'usage prévu.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Valider la tenue aux chocs NIHS 91-30 dès la phase prototype.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Utiliser exclusivement des jauges certifiées NIHS 06-12 pour filetages.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Soumettre les mouvements à des tests de vieillissement Chronofiable®.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Documenter tous les tests NIHS/ISO dans le dossier technique.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Former le personnel aux exigences normatives spécifiques à l'horlogerie.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Quiz : Teste tes connaissances</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-slate-600">
                      Question {currentQuestion + 1} sur {quizData.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      Score: {score}/{quizData.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {quizData[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswer === null
                          ? 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-50'
                          : 'border-slate-200 opacity-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold mr-3 text-slate-700">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-slate-800">{option}</span>
                        {selectedAnswer !== null && index === quizData[currentQuestion].correctAnswer && (
                          <CheckCircle className="w-5 h-5 ml-auto text-green-600" />
                        )}
                        {selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer && (
                          <XCircle className="w-5 h-5 ml-auto text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
                    <p className="text-slate-700">
                      <strong>Explication :</strong> {quizData[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {currentQuestion < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Quiz terminé !</h3>
                <p className="text-xl text-slate-700 mb-6">
                  Votre score : <span className="font-bold text-blue-600">{score}/{quizData.length}</span>
                  {' '}({Math.round((score / quizData.length) * 100)}%)
                </p>
                <div className="mb-6">
                  {score === quizData.length && (
                    <p className="text-green-600 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les normes NIHS !</p>
                  )}
                  {score >= quizData.length * 0.8 && score < quizData.length && (
                    <p className="text-blue-600 font-semibold text-lg">👏 Excellent travail ! Quelques révisions et ce sera parfait !</p>
                  )}
                  {score >= quizData.length * 0.6 && score < quizData.length * 0.8 && (
                    <p className="text-yellow-600 font-semibold text-lg">💪 Bon résultat ! Continue de t'entraîner !</p>
                  )}
                  {score < quizData.length * 0.6 && (
                    <p className="text-orange-600 font-semibold text-lg">📚 Révise les notions et réessaie !</p>
                  )}
                </div>
                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Recommencer le quiz
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Contexte & Origines des Normes NIHS</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les <strong className="text-blue-600">Normes de l'Industrie Horlogère Suisse (NIHS)</strong> sont élaborées, éditées et distribuées par la <strong>Fédération de l'industrie horlogère suisse (FH)</strong>. Plus de <strong>150 normes horlogères</strong> (NIHS, CEN, ISO) existent et sont régulièrement mises à jour.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Ces normes couvrent des domaines aussi variés que la <strong>construction</strong>, les <strong>matériaux luminescents</strong>, les <strong>tests et exigences en matière d'étanchéité</strong>, de <strong>résistance aux chocs et au magnétisme</strong>, ainsi que les <strong>exigences minimales pour la certification des mouvements chronomètres</strong>.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  En Suisse, la normalisation horlogère est affiliée à l'<strong>Association suisse de normalisation (SNV)</strong>. Sur le plan international, elle est gérée par le comité technique <strong>ISO/TC 114 - Horlogerie</strong>, dont la FH assure le secrétariat. Les documents normatifs les plus récents portent un numéro <strong>SN</strong> en plus du numéro NIHS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Table: Normes par catégorie */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Classification des Normes NIHS</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Catégorie</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Normes principales</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Objectif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Construction</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 02-03, 04-01, 04-03, 06-12</td>
                    <td className="px-6 py-4 text-slate-700">Vocabulaire, tolérances, filetages, dessins techniques</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Fiabilité mécanique</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 91-30, 93-20, ISO 1413</td>
                    <td className="px-6 py-4 text-slate-700">Résistance aux chocs, vieillissement, fiabilité</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Étanchéité</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 92-20, 92-11, ISO 22810, ISO 6425</td>
                    <td className="px-6 py-4 text-slate-700">Résistance à l'eau, montres de plongée</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Résistances</td>
                    <td className="px-6 py-4 text-slate-700">ISO 764, NIHS 96-50, ISO 23160</td>
                    <td className="px-6 py-4 text-slate-700">Magnétisme, agents chimiques, rayures</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Précision</td>
                    <td className="px-6 py-4 text-slate-700">ISO 3159</td>
                    <td className="px-6 py-4 text-slate-700">Certification chronomètre COSC</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Habillage</td>
                    <td className="px-6 py-4 text-slate-700">ISO 14368, NIHS 96-60</td>
                    <td className="px-6 py-4 text-slate-700">Verres saphir/minéral, bracelets, boîtiers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Exemples d'application */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Exemples d'Application en Horlogerie</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Type de montre</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Normes applicables</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Exigences clés</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Montre quotidienne</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 92-20, 91-30</td>
                    <td className="px-6 py-4 text-slate-700">Étanche 30-50m, résistance chocs 1m</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Montre de plongée</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 92-11, ISO 6425</td>
                    <td className="px-6 py-4 text-slate-700">Étanche ≥100m, lunette, lisibilité nocturne</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Chronomètre certifié</td>
                    <td className="px-6 py-4 text-slate-700">ISO 3159</td>
                    <td className="px-6 py-4 text-slate-700">Précision -4/+6 s/j, 5 positions, 3 températures</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Montre antimagnétique</td>
                    <td className="px-6 py-4 text-slate-700">ISO 764</td>
                    <td className="px-6 py-4 text-slate-700">Résistance ≥4800 A/m sans altération</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Montre sport/aventure</td>
                    <td className="px-6 py-4 text-slate-700">NIHS 91-30, 93-20, 92-20</td>
                    <td className="px-6 py-4 text-slate-700">Multi-chocs, vieillissement accéléré, étanche</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <blockquote className="text-2xl font-serif italic mb-4">
              "Les normes NIHS garantissent la qualité légendaire de l'horlogerie suisse."
            </blockquote>
            <p className="text-blue-100">— Fédération de l'industrie horlogère suisse (FH)</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Quelle est la différence entre NIHS 92-20 et NIHS 92-11 ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  <strong>NIHS 92-20</strong> (ISO 22810) concerne les montres étanches pour usage quotidien (minimum 2 bar / 20m) : douche, natation courte durée. <strong>NIHS 92-11</strong> (ISO 6425) concerne les montres de plongée professionnelles (minimum 100m) avec exigences supplémentaires : lunette unidirectionnelle, lisibilité dans l'obscurité, résistance renforcée.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Comment obtenir une certification chronomètre COSC selon ISO 3159 ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Le mouvement doit être soumis au COSC (Contrôle Officiel Suisse des Chronomètres) pour des tests sur 15 jours dans 5 positions et 3 températures. La précision doit être de -4 à +6 secondes par jour. Le mouvement reçoit alors un bulletin officiel et peut porter la mention "Chronomètre" ou "Chronometer".
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Qu'est-ce que le protocole Chronofiable® ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Le Chronofiable® est un test de fiabilité propriétaire qui simule 6 mois de port en 21 jours. Il inclut des rotations continues, des chocs radiaux (450-550 G) et axiaux (25-100 G), ainsi que des cycles de chaleur et d'humidité. Il va au-delà des exigences NIHS 93-20 standard.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Où se procurer les normes NIHS officielles ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Les normes NIHS sont disponibles sur le site de la <strong>Fédération de l'industrie horlogère suisse (FH)</strong> : <a href="https://www.fhs.swiss" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fhs.swiss</a>. Elles peuvent être achetées individuellement ou en recueil complet (Extrait des Normes NIHS). Les membres FH bénéficient de conditions préférentielles.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Les normes NIHS sont-elles obligatoires en Suisse ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Les normes NIHS ne sont pas juridiquement obligatoires, mais elles constituent des <strong>standards industriels reconnus</strong>. Leur respect est essentiel pour garantir la qualité, obtenir certaines certifications (Swiss Made, COSC, etc.) et répondre aux attentes du marché horloger international. De nombreuses manufactures les imposent contractuellement à leurs fournisseurs.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white inline-block">
            <p className="text-lg mb-4">📘 Tu veux aller plus loin ?</p>
            <a 
              href="https://www.fhs.swiss/fre/normalisation.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Consulter les normes NIHS officielles
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
