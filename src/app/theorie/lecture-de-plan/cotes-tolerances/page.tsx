'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book, Ruler, Settings } from 'lucide-react';
import Link from 'next/link';

interface ToleranceExplanation {
  id: string;
  symbol: string;
  name: string;
  category: string;
  description: string;
  zoneType: string;
  reference: string;
  example: string;
}

const tolerancesData: ToleranceExplanation[] = [
  {
    id: 'rectitude',
    symbol: '—',
    name: 'Rectitude',
    category: 'Forme',
    description: 'Spécifie que l\'élément (ligne ou axe) doit être contenu dans une zone de tolérance',
    zoneType: 'Espace entre deux droites parallèles ou cylindre',
    reference: 'Non nécessaire',
    example: 'Axe de pivotage balancier : rectitude Ø 0.002 mm'
  },
  {
    id: 'planeite',
    symbol: '⏥',
    name: 'Planéité',
    category: 'Forme',
    description: 'Spécifie que la surface doit être contenue entre deux plans parallèles distants de la valeur de tolérance',
    zoneType: 'Espace entre deux plans parallèles',
    reference: 'Non nécessaire',
    example: 'Face de platine : planéité 0.005 mm pour montage précis'
  },
  {
    id: 'circularite',
    symbol: '○',
    name: 'Circularité',
    category: 'Forme',
    description: 'Spécifie que le contour d\'une section circulaire doit être compris entre deux cercles concentriques',
    zoneType: 'Espace entre deux cercles concentriques',
    reference: 'Non nécessaire',
    example: 'Section de pivot : circularité 0.001 mm'
  },
  {
    id: 'cylindricite',
    symbol: '⌭',
    name: 'Cylindricité',
    category: 'Forme',
    description: 'Spécifie que la surface cylindrique doit être comprise entre deux cylindres coaxiaux',
    zoneType: 'Espace entre deux cylindres coaxiaux',
    reference: 'Non nécessaire',
    example: 'Alésage de barillet : cylindricité 0.003 mm'
  },
  {
    id: 'parallelisme',
    symbol: '∥',
    name: 'Parallélisme',
    category: 'Orientation',
    description: 'Spécifie que l\'élément doit être contenu dans une zone parallèle à la référence',
    zoneType: 'Plans parallèles ou cylindre parallèle',
    reference: 'Oui (nécessaire)',
    example: 'Face de pont parallèle à platine : 0.01 mm / A'
  },
  {
    id: 'perpendicularite',
    symbol: '⊥',
    name: 'Perpendicularité',
    category: 'Orientation',
    description: 'Spécifie que l\'élément doit être perpendiculaire à la référence spécifiée',
    zoneType: 'Plans perpendiculaires ou cylindre perpendiculaire',
    reference: 'Oui (nécessaire)',
    example: 'Axe perpendiculaire à platine : Ø 0.02 mm / A'
  },
  {
    id: 'inclinaison',
    symbol: '∠',
    name: 'Inclinaison',
    category: 'Orientation',
    description: 'Spécifie que l\'élément doit être incliné d\'un angle théorique par rapport à la référence',
    zoneType: 'Plans ou cylindre incliné',
    reference: 'Oui (nécessaire)',
    example: 'Surface inclinée 30° : 0.05 mm / A'
  },
  {
    id: 'localisation',
    symbol: '⊕',
    name: 'Localisation',
    category: 'Position',
    description: 'Spécifie la position théorique exacte d\'un élément par rapport aux références',
    zoneType: 'Cylindre, sphère ou plans parallèles',
    reference: 'Oui (nécessaire)',
    example: 'Position trou fixation : Ø 0.05 mm / A B'
  },
  {
    id: 'coaxialite',
    symbol: '◎',
    name: 'Coaxialité',
    category: 'Position',
    description: 'Spécifie que l\'axe d\'un élément doit coïncider avec l\'axe de référence',
    zoneType: 'Cylindre coaxial',
    reference: 'Oui (nécessaire)',
    example: 'Coaxialité pivots : Ø 0.005 mm / A'
  },
  {
    id: 'symetrie',
    symbol: '⌯',
    name: 'Symétrie',
    category: 'Position',
    description: 'Spécifie que l\'élément médian doit être symétrique par rapport au plan de référence',
    zoneType: 'Espace entre deux plans parallèles',
    reference: 'Oui (nécessaire)',
    example: 'Symétrie rainure : 0.01 mm / A'
  },
  {
    id: 'battement-circulaire',
    symbol: '↗',
    name: 'Battement circulaire',
    category: 'Battement',
    description: 'Spécifie la variation radiale ou axiale lors d\'une rotation complète autour de l\'axe de référence',
    zoneType: 'Zone entre deux cercles concentriques',
    reference: 'Oui (nécessaire)',
    example: 'Battement roue : 0.02 mm / A-B'
  },
  {
    id: 'battement-total',
    symbol: '⤧',
    name: 'Battement total',
    category: 'Battement',
    description: 'Spécifie la variation totale de la surface lors d\'une rotation et d\'un déplacement axial',
    zoneType: 'Zone entre deux cylindres ou plans',
    reference: 'Oui (nécessaire)',
    example: 'Battement total arbre : 0.03 mm / A-B'
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
    question: "Quelle norme ISO régit la représentation des dimensions et tolérances sur les plans ?",
    options: ["ISO 128-2", "ISO 129-1", "ISO 1302", "ISO 13715"],
    correctAnswer: 1,
    explanation: "La norme ISO 129-1:2018 établit les principes généraux pour la représentation des dimensions et des tolérances associées sur les dessins techniques."
  },
  {
    id: 2,
    question: "Quelle norme ISO traite du tolérancement géométrique ?",
    options: ["ISO 128-3", "ISO 1302", "ISO 1101", "ISO 129-1"],
    correctAnswer: 2,
    explanation: "La norme ISO 1101 définit les tolérances géométriques : forme, orientation, position et battement des éléments."
  },
  {
    id: 3,
    question: "Combien de groupes de tolérances géométriques existe-t-il selon ISO 1101 ?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Il existe 4 groupes de tolérances géométriques : forme, orientation, position et battement."
  },
  {
    id: 4,
    question: "Quel symbole représente la planéité ?",
    options: ["—", "⏥", "○", "⊥"],
    correctAnswer: 1,
    explanation: "Le symbole de la planéité est ⏥ (parallélogramme), utilisé pour spécifier qu'une surface doit être plane."
  },
  {
    id: 5,
    question: "Les tolérances de forme nécessitent-elles une référence spécifiée ?",
    options: ["Oui, toujours", "Non, jamais", "Parfois", "Seulement pour les cylindres"],
    correctAnswer: 1,
    explanation: "Les tolérances de forme (rectitude, planéité, circularité, cylindricité) ne nécessitent JAMAIS de référence spécifiée."
  },
  {
    id: 6,
    question: "Que signifie le symbole ⊕ en tolérancement géométrique ?",
    options: ["Coaxialité", "Localisation", "Concentricité", "Symétrie"],
    correctAnswer: 1,
    explanation: "Le symbole ⊕ représente la localisation (position), qui spécifie la position théorique exacte d'un élément par rapport aux références."
  },
  {
    id: 7,
    question: "Quelle tolérance garantit qu'un axe est perpendiculaire à une surface de référence ?",
    options: ["Parallélisme", "Perpendicularité", "Inclinaison", "Rectitude"],
    correctAnswer: 1,
    explanation: "La perpendicularité (symbole ⊥) garantit qu'un élément est perpendiculaire à 90° par rapport à la référence spécifiée."
  },
  {
    id: 8,
    question: "Que signifie l'acronyme GPS en cotation ?",
    options: ["Global Positioning System", "Géométrie Précise Suisse", "Spécification Géométrique des Produits", "Guide de Production Standard"],
    correctAnswer: 2,
    explanation: "GPS signifie Spécification Géométrique des Produits (Geometrical Product Specifications), un système cohérent de normes ISO."
  },
  {
    id: 9,
    question: "En horlogerie, les tolérances sont souvent exprimées en :",
    options: ["Millimètres", "Micromètres (microns)", "Nanomètres", "Centimètres"],
    correctAnswer: 1,
    explanation: "En horlogerie de précision, les tolérances sont généralement exprimées en micromètres (µm), voire en nanomètres pour les pièces critiques."
  },
  {
    id: 10,
    question: "Quel symbole indique un diamètre avant une cote ?",
    options: ["R", "Ø", "□", "SR"],
    correctAnswer: 1,
    explanation: "Le symbole Ø (lettre grecque phi) précède toujours une cote de diamètre sans espace, par exemple : Ø 10."
  },
  {
    id: 11,
    question: "Que représente une cote entre parenthèses sur un plan ?",
    options: ["Cote critique", "Cote auxiliaire (non à contrôler)", "Cote théorique exacte", "Cote avec tolérance serrée"],
    correctAnswer: 1,
    explanation: "Une cote entre parenthèses est une cote auxiliaire (de repère) donnée à titre indicatif, qui ne doit pas être contrôlée."
  },
  {
    id: 12,
    question: "Quelle zone de tolérance pour la circularité ?",
    options: ["Deux plans parallèles", "Deux cercles concentriques", "Deux cylindres coaxiaux", "Un cylindre unique"],
    correctAnswer: 1,
    explanation: "La zone de tolérance de circularité est l'espace entre deux cercles concentriques distants de la valeur de tolérance."
  },
  {
    id: 13,
    question: "Combien de références spécifiées au maximum peut-on utiliser ?",
    options: ["1", "2", "3", "Illimité"],
    correctAnswer: 2,
    explanation: "On peut utiliser jusqu'à 3 références spécifiées (primaire, secondaire, tertiaire) pour définir un système de références complet."
  },
  {
    id: 14,
    question: "Que signifie une cote encadrée sur un plan ?",
    options: ["Cote avec tolérance serrée", "Cote théorique exacte (TED)", "Cote à mesurer en priorité", "Cote en millimètres"],
    correctAnswer: 1,
    explanation: "Une cote encadrée est une cote Théoriquement Exacte (TED), qui définit la position théorique exacte sans tolérance."
  },
  {
    id: 15,
    question: "Quel est le principe de base du tolérancement ISO GPS ?",
    options: ["Maximiser les tolérances", "Minimiser les coûts", "Spécifier selon la fonction", "Simplifier les contrôles"],
    correctAnswer: 2,
    explanation: "Le principe de base du GPS est de spécifier les tolérances selon les exigences fonctionnelles, sans sur-spécifier ni sous-spécifier."
  }
];

export default function CotesTolerancesPage() {
  const [selectedTolerance, setSelectedTolerance] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleToleranceClick = (tolId: string) => {
    setSelectedTolerance(tolId);
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

  const selectedToleranceData = tolerancesData.find(t => t.id === selectedTolerance);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Forme': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700';
      case 'Orientation': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700';
      case 'Position': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700';
      case 'Battement': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie/lecture-de-plan" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Les normes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Cotes et Tolérances (ISO 129-1 & 1101)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Spécification Géométrique des Produits (GPS) : cotation dimensionnelle et tolérancement géométrique
          </p>
        </div>

        {/* Interactive Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Tolérances Géométriques (ISO 1101)</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Cliquez sur une tolérance pour voir ses caractéristiques détaillées.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {tolerancesData.map((tol) => (
              <div
                key={tol.id}
                onClick={() => handleToleranceClick(tol.id)}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedTolerance === tol.id ? 'border-blue-600 dark:border-blue-400 shadow-lg' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{tol.symbol}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tol.category)}`}>
                    {tol.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tol.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{tol.description}</p>
              </div>
            ))}
          </div>

          {/* Explanation Panel */}
          {selectedToleranceData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
              <div className="flex items-center mb-4">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mr-4">{selectedToleranceData.symbol}</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedToleranceData.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getCategoryColor(selectedToleranceData.category)}`}>
                    {selectedToleranceData.category}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description :</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{selectedToleranceData.description}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Zone de tolérance :</p>
                  <p className="text-slate-700 dark:text-slate-300">{selectedToleranceData.zoneType}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Référence spécifiée :</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{selectedToleranceData.reference}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Exemple horlogerie :</p>
                  <p className="text-slate-700 dark:text-slate-300">{selectedToleranceData.example}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Mémo Technique */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Mémo Technique : Erreurs & Bonnes Pratiques</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Erreurs */}
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-4 flex items-center">
                <XCircle className="w-6 h-6 mr-2" />
                Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Utiliser des tolérances de forme avec une référence spécifiée.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Oublier le symbole Ø devant un diamètre.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Sur-spécifier avec des tolérances trop serrées (coût élevé).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Mélanger cotation dimensionnelle et géométrique sans cohérence.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Ne pas définir de système de références pour les tolérances d'orientation/position.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Coter des éléments cachés (éviter autant que possible).</span>
                </li>
              </ul>
            </div>

            {/* Bonnes pratiques */}
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Toujours spécifier selon les exigences fonctionnelles (principe GPS).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Placer les cotes dans la vue la plus claire (ISO 129-1).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Définir un système de références cohérent (A, B, C) pour orientation/position.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Utiliser les indicateurs de propriétés (Ø, R, SR, □) selon ISO 129-1.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Privilégier les tolérances géométriques pour les exigences fonctionnelles.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Éviter la cotation redondante : chaque cote ne doit apparaître qu'une fois.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Quiz : Teste tes connaissances</h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Question {currentQuestion + 1} sur {quizData.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Score: {score}/{quizData.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
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
                          ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                          : selectedAnswer === index
                          ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30'
                          : 'border-slate-200 dark:border-slate-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold mr-3 text-slate-700 dark:text-slate-300">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-slate-800 dark:text-slate-200">{option}</span>
                        {selectedAnswer !== null && index === quizData[currentQuestion].correctAnswer && (
                          <CheckCircle className="w-5 h-5 ml-auto text-green-600 dark:text-green-400" />
                        )}
                        {selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer && (
                          <XCircle className="w-5 h-5 ml-auto text-red-600 dark:text-red-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 mb-6 rounded">
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong>Explication :</strong> {quizData[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {currentQuestion < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz terminé !</h3>
                <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
                  Votre score : <span className="font-bold text-blue-600 dark:text-blue-400">{score}/{quizData.length}</span>
                  {' '}({Math.round((score / quizData.length) * 100)}%)
                </p>
                <div className="mb-6">
                  {score === quizData.length && (
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les cotes et tolérances !</p>
                  )}
                  {score >= quizData.length * 0.8 && score < quizData.length && (
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">👏 Excellent travail ! Quelques révisions et ce sera parfait !</p>
                  )}
                  {score >= quizData.length * 0.6 && score < quizData.length * 0.8 && (
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-lg">💪 Bon résultat ! Continue de t'entraîner !</p>
                  )}
                  {score < quizData.length * 0.6 && (
                    <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg">📚 Révise les notions et réessaie !</p>
                  )}
                </div>
                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Recommencer le quiz
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contexte & Origines des Normes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISO 129-1 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                  <Ruler className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 129-1:2018</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-400 font-semibold mb-3">Cotation dimensionnelle</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme établit les <strong>principes généraux de représentation des dimensions et tolérances</strong> sur les dessins techniques. Elle définit l'usage des éléments de cotation : lignes de dimension, extrémités, lignes d'attache, indicateurs de propriétés (Ø, R, SR, □), cotation tabulaire et valeurs des dimensions.
              </p>
            </div>

            {/* ISO 1101 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                  <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 1101:2017</h3>
                  <p className="text-sm text-green-800 dark:text-green-400 font-semibold mb-3">Tolérancement géométrique</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme définit les <strong>tolérances géométriques</strong> : forme, orientation, position et battement. Elle fait partie du système GPS (Spécification Géométrique des Produits) et permet de spécifier sans ambiguïté les exigences fonctionnelles au-delà des simples dimensions.
              </p>
            </div>
          </div>
        </section>

        {/* Table: Catégories ISO 1101 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Les 4 Catégories de Tolérances Géométriques</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Catégorie</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Caractéristiques</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Référence nécessaire</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Objectif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Forme</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rectitude, Planéité, Circularité, Cylindricité</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">❌ Non</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contrôler la forme intrinsèque</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Orientation</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Parallélisme, Perpendicularité, Inclinaison</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">✅ Oui</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contrôler l'orientation par rapport à une référence</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Position</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Localisation, Coaxialité, Symétrie</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">✅ Oui</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contrôler la position exacte dans l'espace</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Battement</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Battement circulaire, Battement total</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">✅ Oui</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contrôler les variations lors de la rotation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Symboles indicateurs (ISO 129-1) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Indicateurs de Propriétés (ISO 129-1)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Symbole</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Désignation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Exemple</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Utilisation horlogerie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">Ø</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Diamètre</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ø 10</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Diamètre pivot, alésage platine</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">R</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Rayon</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">R 2.5</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Congés, arrondis de ponts</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">SR</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Rayon sphérique</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">SR 1.2</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rubis sphérique, dôme de verre</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">□</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Côté carré</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">□ 8</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Section carrée d'axe</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">( )</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Cote auxiliaire</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">(25)</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cote de repère, non à contrôler</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">⌈⌉</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Cote théorique exacte (TED)</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">⌈50⌉</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Position théorique pour tolérance géométrique</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Exemples horlogerie */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Applications en Horlogerie de Précision</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Composant</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Tolérance critique</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Valeur typique</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Justification fonctionnelle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Axe de balancier</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rectitude de l'axe</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ø 0.002 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Garantir l'oscillation régulière sans frottement</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Platine</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Planéité face de montage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.005 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Assurer le montage précis des ponts</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Alésage de barillet</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cylindricité</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.003 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rotation fluide du barillet sans jeu excessif</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Pont de balancier</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Perpendicularité trou / face</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ø 0.02 mm / A</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Assurer l'alignement du balancier avec l'échappement</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Roue d'échappement</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Battement circulaire</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.02 mm / A-B</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Éviter variations de couple et perte d'amplitude</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Trous de fixation</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Localisation</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ø 0.05 mm / A B</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Interchangeabilité des composants</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white text-center">
            <blockquote className="text-2xl font-serif italic mb-4">
              "La spécification GPS permet de définir sans ambiguïté les exigences fonctionnelles d'une pièce."
            </blockquote>
            <p className="text-blue-100 dark:text-blue-200">— Principe fondamental ISO GPS</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quelle est la différence entre tolérance dimensionnelle et géométrique ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  La <strong>tolérance dimensionnelle</strong> (ISO 129-1) définit les limites de taille (longueur, diamètre) d'un élément. La <strong>tolérance géométrique</strong> (ISO 1101) contrôle la forme, l'orientation, la position ou le battement indépendamment de la taille. Par exemple : un cylindre peut être dans la tolérance dimensionnelle (Ø 10 ±0.1) mais hors tolérance de cylindricité (forme non cylindrique).
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Pourquoi les tolérances de forme ne nécessitent-elles pas de référence ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Les tolérances de forme (rectitude, planéité, circularité, cylindricité) contrôlent la <strong>forme intrinsèque</strong> de l'élément lui-même, sans relation avec d'autres éléments. Elles ne dépendent donc pas d'un système de références. En revanche, orientation, position et battement nécessitent une référence car ils positionnent l'élément par rapport à d'autres éléments de la pièce.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Comment définir un système de références cohérent ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Un système de références se construit hiérarchiquement : <strong>Référence primaire (A)</strong> : généralement une surface plane pour bloquer 3 degrés de liberté. <strong>Référence secondaire (B)</strong> : bloque 2 degrés supplémentaires (rotation + translation). <strong>Référence tertiaire (C)</strong> : bloque le dernier degré (rotation). Les références doivent être choisies selon les <strong>surfaces fonctionnelles</strong> de montage/assemblage.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Qu'est-ce qu'une cote théorique exacte (TED) ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Une cote <strong>Théoriquement Exacte</strong> (encadrée ⌈50⌉) définit la position théorique parfaite d'un élément sans tolérance. Elle est utilisée avec les tolérances géométriques de position/localisation : la tolérance n'est pas sur la cote elle-même mais dans la zone de tolérance géométrique (par exemple : localisation Ø 0.1). Ceci évite l'ambiguïté d'une double tolérance.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Pourquoi l'horlogerie nécessite-t-elle des tolérances aussi serrées ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  L'horlogerie mécanique nécessite des <strong>tolérances de l'ordre du micromètre</strong> (0.001-0.010 mm) car : les frottements doivent être minimaux pour préserver l'amplitude du balancier, les engrenages nécessitent un jeu précis pour transmettre l'énergie sans perte, les pivots tournent à des vitesses élevées (balancier : 5-10 Hz), et l'interchangeabilité des composants est essentielle pour la maintenance. Une déviation de quelques microns peut affecter la précision horométrique.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white inline-block">
            <p className="text-lg mb-4">📘 Tu veux aller plus loin ?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.iso.org/standard/64007.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors"
              >
                Consulter ISO 129-1
              </a>
              <a 
                href="https://www.iso.org/standard/66777.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors"
              >
                Consulter ISO 1101
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 dark:text-slate-500">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
