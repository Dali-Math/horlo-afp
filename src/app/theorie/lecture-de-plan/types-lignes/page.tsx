'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book } from 'lucide-react';
import Link from 'next/link';

interface LineTypeExplanation {
  id: string;
  name: string;
  designation: string;
  width: string;
  usage: string;
  example: string;
  priority: number;
}

const lineTypesData: LineTypeExplanation[] = [
  {
    id: 'continu-fort',
    name: 'Continu fort',
    designation: 'Trait plein épais',
    width: '0.5 - 0.7 mm',
    usage: 'Contours et arêtes visibles sur une vue donnée',
    example: 'Contour extérieur d\'une platine, bords visibles d\'un pont',
    priority: 1
  },
  {
    id: 'continu-fin',
    name: 'Continu fin',
    designation: 'Trait plein mince',
    width: '0.25 - 0.35 mm',
    usage: 'Lignes de cote, lignes d\'attache, hachures, arêtes fictives',
    example: 'Cotation d\'un diamètre, hachures de coupe, lignes de repère',
    priority: 3
  },
  {
    id: 'interrompu-fort',
    name: 'Interrompu fort',
    designation: 'Trait discontinu épais',
    width: '0.5 - 0.7 mm',
    usage: 'Contours et arêtes cachées (non visibles sur la vue)',
    example: 'Alésage caché dans une platine, trou borgne non visible',
    priority: 2
  },
  {
    id: 'interrompu-fin',
    name: 'Interrompu fin',
    designation: 'Trait discontinu mince',
    width: '0.25 - 0.35 mm',
    usage: 'Contours cachés secondaires, constructions géométriques cachées',
    example: 'Arêtes cachées non prioritaires, détails internes secondaires',
    priority: 4
  },
  {
    id: 'mixte-fin',
    name: 'Mixte fin',
    designation: 'Trait mixte mince (tiret-point)',
    width: '0.25 - 0.35 mm',
    usage: 'Axes de symétrie, axes de révolution, traces de plans de symétrie',
    example: 'Axe d\'un balancier, plan de symétrie d\'une platine',
    priority: 5
  },
  {
    id: 'mixte-fort',
    name: 'Mixte fort',
    designation: 'Trait mixte épais (tiret-point)',
    width: '0.5 - 0.7 mm',
    usage: 'Surfaces faisant l\'objet de spécifications particulières (traitement de surface)',
    example: 'Zone à polir, surface à rectifier, indication de traitement thermique',
    priority: 6
  },
  {
    id: 'mixte-deux-tirets',
    name: 'Mixte fin à deux tirets',
    designation: 'Trait mixte à double tiret',
    width: '0.25 - 0.35 mm',
    usage: 'Contours de pièces voisines, positions intermédiaires de pièces mobiles',
    example: 'Position alternative d\'un levier, pièce adjacente en transparence',
    priority: 7
  },
  {
    id: 'main-levee',
    name: 'Continu fin à main levée',
    designation: 'Trait ondulé ou zigzag',
    width: '0.25 - 0.35 mm',
    usage: 'Limites de vues partielles, coupes interrompues, sections brisées',
    example: 'Limite de vue partielle sur un mouvement, coupe locale',
    priority: 8
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
    question: "Quelle norme ISO définit les types de lignes en dessin technique ?",
    options: ["ISO 128-1", "ISO 128-2", "ISO 128-3", "ISO 1302"],
    correctAnswer: 1,
    explanation: "La norme ISO 128-2 établit les types de traits utilisés dans les dessins techniques, leurs désignations et configurations."
  },
  {
    id: 2,
    question: "Quel type de trait utilise-t-on pour les contours visibles ?",
    options: ["Continu fin", "Interrompu fort", "Continu fort", "Mixte fin"],
    correctAnswer: 2,
    explanation: "Le trait continu fort (épais) est utilisé pour représenter les contours et arêtes visibles sur une vue donnée."
  },
  {
    id: 3,
    question: "Quel est le rapport minimal entre la largeur d'un trait fort et d'un trait fin ?",
    options: ["1:1", "2:1", "3:1", "4:1"],
    correctAnswer: 1,
    explanation: "Selon ISO 128-2, le rapport entre la largeur d'un trait fort et d'un trait fin ne doit pas être inférieur à 2:1."
  },
  {
    id: 4,
    question: "Quel trait représente les arêtes cachées ?",
    options: ["Continu fort", "Interrompu fort", "Mixte fin", "Continu fin"],
    correctAnswer: 1,
    explanation: "Le trait interrompu fort (discontinu épais) représente les contours et arêtes cachées, non visibles sur la vue."
  },
  {
    id: 5,
    question: "Quel trait utilise-t-on pour les axes de symétrie ?",
    options: ["Continu fin", "Interrompu fin", "Mixte fin", "Mixte fort"],
    correctAnswer: 2,
    explanation: "Le trait mixte fin (tiret-point mince) est utilisé pour les axes de symétrie, axes de révolution et plans de coupe."
  },
  {
    id: 6,
    question: "En cas de superposition, quel trait a la priorité absolue ?",
    options: ["Trait mixte fin", "Trait interrompu fort", "Trait continu fort", "Trait continu fin"],
    correctAnswer: 2,
    explanation: "Le trait continu fort a la priorité absolue lors de superpositions : 1. Continu fort, 2. Interrompu fort, 3. Mixte fin."
  },
  {
    id: 7,
    question: "Quel trait indique une surface nécessitant un traitement particulier ?",
    options: ["Continu fort", "Mixte fort", "Interrompu fort", "Continu fin"],
    correctAnswer: 1,
    explanation: "Le trait mixte fort indique les surfaces faisant l'objet de spécifications particulières (traitement de surface, polissage, etc.)."
  },
  {
    id: 8,
    question: "Quelle largeur typique pour un trait fort à l'encre ?",
    options: ["0.18 mm", "0.35 mm", "0.5 - 0.7 mm", "1.4 mm"],
    correctAnswer: 2,
    explanation: "La largeur typique d'un trait fort à l'encre est de 0.5 à 0.7 mm selon la taille et le type de dessin."
  },
  {
    id: 9,
    question: "Quel trait représente les pièces voisines ou positions alternatives ?",
    options: ["Mixte fin", "Mixte fin à deux tirets", "Interrompu fin", "Continu fin"],
    correctAnswer: 1,
    explanation: "Le trait mixte fin à deux tirets représente les contours de pièces voisines ou les positions intermédiaires de pièces mobiles."
  },
  {
    id: 10,
    question: "Quel trait utilise-t-on pour les lignes de cote ?",
    options: ["Continu fort", "Continu fin", "Interrompu fin", "Mixte fin"],
    correctAnswer: 1,
    explanation: "Le trait continu fin est utilisé pour les lignes de cote, lignes d'attache, hachures et lignes de repère."
  },
  {
    id: 11,
    question: "Combien de largeurs de trait existe-t-il selon ISO 128-2 ?",
    options: ["Une seule", "Deux (fort et fin)", "Trois", "Quatre"],
    correctAnswer: 1,
    explanation: "Il existe deux largeurs de trait : fort (épais) et fin (mince), avec un rapport minimal de 2:1."
  },
  {
    id: 12,
    question: "Quel trait limite une vue partielle ou une coupe interrompue ?",
    options: ["Continu fort", "Interrompu fin", "Continu fin à main levée ou zigzag", "Mixte fin"],
    correctAnswer: 2,
    explanation: "Le trait continu fin à main levée (ondulé) ou en zigzag indique les limites de vues partielles ou de coupes interrompues."
  },
  {
    id: 13,
    question: "Les traits forts peuvent-ils se croiser entre eux ?",
    options: ["Oui, toujours", "Non, jamais", "Seulement à 90°", "Seulement sur les axes"],
    correctAnswer: 1,
    explanation: "Règle importante : les traits forts ne se croisent JAMAIS entre eux. En cas de superposition, on applique l'ordre de priorité."
  },
  {
    id: 14,
    question: "Quelle est la longueur typique d'un tiret court selon ISO 128-2 ?",
    options: ["1.5d", "3d", "6d", "12d"],
    correctAnswer: 1,
    explanation: "Selon ISO 128-2, un tiret court mesure environ 3d (où d = largeur du trait), un tiret long mesure 12d."
  },
  {
    id: 15,
    question: "Peut-on omettre les traits cachés sur un plan horloger ?",
    options: ["Non, jamais", "Oui, s'ils ne sont pas nécessaires à la définition", "Seulement en vue de face", "Seulement pour les petites pièces"],
    correctAnswer: 1,
    explanation: "Oui, lorsque les parties cachées ne sont pas nécessaires à la définition, elles peuvent être omises pour alléger et faciliter la lecture du plan."
  }
];

export default function TypesLignesPage() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleLineClick = (lineId: string) => {
    setSelectedLine(lineId);
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

  const selectedLineData = lineTypesData.find(l => l.id === selectedLine);

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
            Types de Lignes (ISO 128-2)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprendre et maîtriser les différents types de traits utilisés en dessin technique
          </p>
        </div>

        {/* Interactive Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Schéma Interactif</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Cliquez sur chaque type de ligne pour afficher son explication et utilisation.</p>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <svg viewBox="0 0 800 700" className="w-full h-auto">
              <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-400">Types de Lignes ISO 128-2</text>
              
              {/* Continu fort */}
              <g onClick={() => handleLineClick('continu-fort')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="60" width="700" height="60" fill="#3b82f6" fillOpacity="0.05" stroke="#3b82f6" strokeWidth="1" rx="4"/>
                <line x1="200" y1="90" x2="600" y2="90" stroke="#1e40af" strokeWidth="4"/>
                <text x="100" y="95" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Continu fort</text>
              </g>

              {/* Continu fin */}
              <g onClick={() => handleLineClick('continu-fin')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="130" width="700" height="60" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="1" rx="4"/>
                <line x1="200" y1="160" x2="600" y2="160" stroke="#047857" strokeWidth="1.5"/>
                <text x="100" y="165" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Continu fin</text>
              </g>

              {/* Interrompu fort */}
              <g onClick={() => handleLineClick('interrompu-fort')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="200" width="700" height="60" fill="#f59e0b" fillOpacity="0.05" stroke="#f59e0b" strokeWidth="1" rx="4"/>
                <line x1="200" y1="230" x2="600" y2="230" stroke="#d97706" strokeWidth="4" strokeDasharray="20,8"/>
                <text x="100" y="235" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Interrompu fort</text>
              </g>

              {/* Interrompu fin */}
              <g onClick={() => handleLineClick('interrompu-fin')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="270" width="700" height="60" fill="#8b5cf6" fillOpacity="0.05" stroke="#8b5cf6" strokeWidth="1" rx="4"/>
                <line x1="200" y1="300" x2="600" y2="300" stroke="#6d28d9" strokeWidth="1.5" strokeDasharray="15,6"/>
                <text x="100" y="305" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Interrompu fin</text>
              </g>

              {/* Mixte fin */}
              <g onClick={() => handleLineClick('mixte-fin')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="340" width="700" height="60" fill="#ec4899" fillOpacity="0.05" stroke="#ec4899" strokeWidth="1" rx="4"/>
                <line x1="200" y1="370" x2="600" y2="370" stroke="#be185d" strokeWidth="1.5" strokeDasharray="30,5,5,5"/>
                <text x="100" y="375" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Mixte fin</text>
              </g>

              {/* Mixte fort */}
              <g onClick={() => handleLineClick('mixte-fort')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="410" width="700" height="60" fill="#06b6d4" fillOpacity="0.05" stroke="#06b6d4" strokeWidth="1" rx="4"/>
                <line x1="200" y1="440" x2="600" y2="440" stroke="#0891b2" strokeWidth="4" strokeDasharray="30,5,5,5"/>
                <text x="100" y="445" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Mixte fort</text>
              </g>

              {/* Mixte fin à deux tirets */}
              <g onClick={() => handleLineClick('mixte-deux-tirets')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="480" width="700" height="60" fill="#ef4444" fillOpacity="0.05" stroke="#ef4444" strokeWidth="1" rx="4"/>
                <line x1="200" y1="510" x2="600" y2="510" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="30,5,8,5,8,5"/>
                <text x="100" y="515" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Mixte 2 tirets</text>
              </g>

              {/* Main levée */}
              <g onClick={() => handleLineClick('main-levee')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="550" width="700" height="60" fill="#a855f7" fillOpacity="0.05" stroke="#a855f7" strokeWidth="1" rx="4"/>
                <path d="M 200 580 Q 250 575 300 580 T 400 580 T 500 580 T 600 580" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
                <text x="100" y="585" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">Main levée</text>
              </g>

              {/* Légende */}
              <text x="400" y="650" textAnchor="middle" fontSize="12" fill="#64748b" className="dark:fill-slate-400">Cliquez sur une ligne pour voir les détails</text>
            </svg>
          </div>

          {/* Explanation Panel */}
          {selectedLineData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedLineData.name}</h3>
              <p className="text-sm text-blue-800 dark:text-blue-400 font-semibold mb-3">Priorité de tracé : {selectedLineData.priority}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Désignation :</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{selectedLineData.designation}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Largeur typique :</p>
                  <p className="text-slate-700 dark:text-slate-300">{selectedLineData.width}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Usage :</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{selectedLineData.usage}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Exemple horlogerie :</p>
                  <p className="text-slate-700 dark:text-slate-300">{selectedLineData.example}</p>
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
                  <span>Utiliser un trait continu fin pour les contours visibles.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Confondre trait interrompu (caché) et trait mixte (axe).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Ne pas respecter le rapport 2:1 entre traits fort et fin.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Laisser se croiser deux traits forts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Dessiner tous les traits cachés, même non nécessaires.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Oublier l'ordre de priorité lors de superpositions.</span>
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
                  <span>Toujours utiliser trait continu fort pour contours visibles.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Respecter l'ordre de priorité : 1. Fort, 2. Interrompu, 3. Mixte.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Maintenir un rapport constant 2:1 (fort/fin) sur tout le plan.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Omettre les traits cachés non essentiels pour clarifier le dessin.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Utiliser traits mixtes fins pour tous les axes de symétrie.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Vérifier la cohérence des types de traits sur toutes les vues.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Quiz : Teste tes connaissances</h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
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
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les types de lignes !</p>
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

        {/* Video Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vidéo : Types de Traits en Dessin Technique</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/LhrEIU0KLrU" 
                title="Dessin Technique : Les principaux types de traits utilisés" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contexte & Origines de la Norme</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                <Book className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  La norme <strong className="text-blue-600 dark:text-blue-400">ISO 128-2:2020</strong> établit les types de traits utilisés dans les dessins techniques (schémas, plans, cartes), leurs désignations et leurs configurations, ainsi que les règles générales pour le tracé de traits. Elle remplace l'ancienne norme ISO 128 de 1982.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Cette norme définit <strong>deux largeurs de trait</strong> principales : <strong>fort (épais)</strong> et <strong>fin (mince)</strong>, avec un rapport minimal de <strong>2:1</strong>. Les largeurs recommandées sont : 0.18, 0.25, 0.35, 0.5, 0.7, 1, 1.4 et 2 mm.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  En horlogerie, le respect strict de ces conventions est essentiel pour garantir la lisibilité des plans techniques de mouvements, où la précision dimensionnelle et la clarté des spécifications sont cruciales pour l'usinage de composants miniatures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Table: Types de traits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Types de Traits : Récapitulatif Complet</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Type de trait</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Désignation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Largeur</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Applications principales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Continu fort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Trait plein épais</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.5 - 0.7 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contours visibles, arêtes vues</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Continu fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Trait plein mince</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.25 - 0.35 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Lignes de cote, hachures, lignes d'attache</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Interrompu fort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Trait discontinu épais</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.5 - 0.7 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contours cachés, arêtes non visibles</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Interrompu fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Trait discontinu mince</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.25 - 0.35 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Contours cachés secondaires</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Mixte fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Tiret-point mince</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.25 - 0.35 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Axes de symétrie, plans de coupe</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Mixte fort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Tiret-point épais</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.5 - 0.7 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Surfaces avec spécifications particulières</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Mixte fin 2 tirets</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Double tiret-point</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.25 - 0.35 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Pièces voisines, positions alternatives</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Continu fin main levée</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Trait ondulé/zigzag</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">0.25 - 0.35 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Limites de vues partielles, coupes interrompues</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Ordre de priorité */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ordre de Priorité des Traits</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Priorité</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Type de trait</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Règle en cas de superposition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400 text-lg">1</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Continu fort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Priorité absolue, masque tous les autres traits</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400 text-lg">2</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Interrompu fort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Priorité sur les traits mixtes et fins</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400 text-lg">3</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Continu fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Priorité sur les traits mixtes</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400 text-lg">4</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Interrompu fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Priorité secondaire</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400 text-lg">5</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Mixte fin</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Priorité faible, souvent masqué</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 dark:border-amber-500 p-4 rounded">
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Règle importante :</strong> Les traits forts ne se croisent jamais entre eux ! En cas de superposition, toujours appliquer l'ordre de priorité ci-dessus.
            </p>
          </div>
        </section>

        {/* Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white text-center">
            <blockquote className="text-2xl font-serif italic mb-4">
              "La maîtrise des types de lignes est la base de tout dessin technique précis."
            </blockquote>
            <p className="text-blue-100 dark:text-blue-200">— Principe fondamental ISO 128-2</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quelle est la différence entre un trait continu fort et un trait continu fin ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Le <strong>trait continu fort</strong> (épais, 0.5-0.7 mm) représente les contours et arêtes visibles. Le <strong>trait continu fin</strong> (mince, 0.25-0.35 mm) est utilisé pour les lignes de cote, hachures et lignes d'attache. Le rapport entre les deux doit être d'au moins 2:1.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Pourquoi les traits forts ne peuvent-ils jamais se croiser ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  C'est une règle fondamentale de clarté : si deux traits forts (contours visibles) se croisent, cela signifie que deux arêtes vues se superposent exactement, ce qui est physiquement impossible ou crée une ambiguïté. Dans ce cas, on doit choisir la vue qui évite cette superposition ou appliquer l'ordre de priorité.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quand doit-on omettre les traits cachés ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Les traits cachés (interrompus) peuvent être omis lorsqu'ils ne sont <strong>pas nécessaires à la définition de la pièce</strong>. Ceci permet d'alléger le dessin et de faciliter la lecture. En horlogerie, on privilégie les coupes pour montrer les détails internes plutôt que de multiplier les traits cachés.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Comment distinguer un axe (mixte fin) d'une arête cachée (interrompu) ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Le <strong>trait mixte fin</strong> (tiret-point) représente un élément <strong>théorique</strong> (axe de symétrie, plan de coupe) qui n'existe pas physiquement sur la pièce. Le <strong>trait interrompu</strong> représente une arête ou un contour <strong>réel mais caché</strong> derrière une surface opaque. La configuration est différente : tiret-point vs tirets réguliers.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quelles largeurs de trait choisir pour un plan A4 ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Pour un plan format A4, les largeurs recommandées sont : <strong>trait fort = 0.5 mm</strong> et <strong>trait fin = 0.25 mm</strong> (rapport 2:1). Pour des formats plus grands (A3, A2), on peut utiliser trait fort = 0.7 mm et trait fin = 0.35 mm. L'important est de maintenir le rapport 2:1 et d'être constant sur tout le plan.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white inline-block">
            <p className="text-lg mb-4">📘 Tu veux aller plus loin ?</p>
            <a 
              href="https://www.iso.org/standard/69129.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors"
            >
              Consulter la norme ISO 128-2 complète
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 dark:text-slate-500">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
