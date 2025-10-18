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
  {
    id: 'A',
    title: 'Vue de face (A)',
    description: 'Vue principale',
    position: 'Position centrale',
    info: 'La vue de face doit montrer la forme la plus caractéristique de la pièce. C\'est la vue de référence pour toutes les autres vues.'
  },
  {
    id: 'B',
    title: 'Vue de dessus (B)',
    description: 'Vue supérieure',
    position: 'Sous la vue de face (méthode E)',
    info: 'Montre le profil supérieur, les perçages et les contours vus du dessus. Essentielle pour visualiser la disposition des trous.'
  },
  {
    id: 'C',
    title: 'Vue de gauche (C)',
    description: 'Vue latérale gauche',
    position: 'À droite de la vue de face (méthode E)',
    info: 'Révèle l\'épaisseur et le profil latéral gauche de la pièce. Utile pour les formes asymétriques.'
  },
  {
    id: 'D',
    title: 'Vue de droite (D)',
    description: 'Vue latérale droite',
    position: 'À gauche de la vue de face (méthode E)',
    info: 'Montre la symétrie et les détails du côté droit. Complémentaire à la vue de gauche pour les pièces complexes.'
  },
  {
    id: 'E',
    title: 'Vue de dessous (E)',
    description: 'Vue inférieure',
    position: 'Au-dessus de la vue de face (méthode E)',
    info: 'Présente la face inférieure, les fixations et les éléments cachés vus du dessous.'
  },
  {
    id: 'F',
    title: 'Vue d\'arrière (F)',
    description: 'Vue arrière',
    position: 'À l\'extrémité droite',
    info: 'Montre la face arrière, les sorties et les éléments non visibles depuis la vue de face.'
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
    question: "Quelle est la norme internationale régissant les vues techniques ?",
    options: ["ISO 128-3", "ISO 1101", "ISO 129-1", "ISO 5456-2"],
    correctAnswer: 0,
    explanation: "La norme ISO 128-3 établit les principes généraux de représentation des vues, sections et coupes en dessin technique."
  },
  {
    id: 2,
    question: "Dans la méthode européenne, où se trouve la vue de dessus par rapport à la vue de face ?",
    options: ["Au-dessus", "En dessous", "À gauche", "À droite"],
    correctAnswer: 1,
    explanation: "En méthode européenne (1er dièdre), la vue de dessus se situe SOUS la vue de face car l'objet est entre l'observateur et le plan."
  },
  {
    id: 3,
    question: "Combien de vues principales peut-on représenter au maximum ?",
    options: ["3", "4", "6", "8"],
    correctAnswer: 2,
    explanation: "On peut représenter 6 vues principales : face, dessus, dessous, gauche, droite et arrière."
  },
  {
    id: 4,
    question: "Quel symbole indique la méthode de projection européenne ?",
    options: ["Cône à droite", "Cône à gauche", "Carré", "Triangle"],
    correctAnswer: 1,
    explanation: "Le symbole de la méthode européenne (E) montre un cône tronqué positionné à gauche."
  },
  {
    id: 5,
    question: "Quelle vue doit être choisie comme vue de face ?",
    options: ["La plus petite", "La plus grande", "La plus caractéristique", "La plus simple"],
    correctAnswer: 2,
    explanation: "La vue de face doit montrer la forme la plus caractéristique et informative de la pièce."
  },
  {
    id: 6,
    question: "Dans quelle méthode l'objet est placé entre l'observateur et le plan ?",
    options: ["Américaine", "Européenne", "Asiatique", "Internationale"],
    correctAnswer: 1,
    explanation: "Dans la méthode européenne (1er dièdre), l'objet se trouve entre l'observateur et le plan de projection."
  },
  {
    id: 7,
    question: "Combien de vues suffisent généralement pour une pièce horlogère ?",
    options: ["1", "2 à 3", "4 à 5", "6"],
    correctAnswer: 1,
    explanation: "En horlogerie, 2 à 3 vues bien choisies suffisent généralement, complétées par des coupes si nécessaire."
  },
  {
    id: 8,
    question: "Que signifie 'projection orthogonale' ?",
    options: ["Projection oblique", "Projection perpendiculaire", "Projection parallèle", "Projection conique"],
    correctAnswer: 1,
    explanation: "Une projection orthogonale signifie que les rayons visuels sont perpendiculaires au plan de projection."
  },
  {
    id: 9,
    question: "Où se situe la vue de droite en méthode européenne ?",
    options: ["À droite de la vue de face", "À gauche de la vue de face", "Au-dessus de la vue de face", "En dessous de la vue de face"],
    correctAnswer: 1,
    explanation: "En méthode européenne, la vue de droite se trouve à GAUCHE de la vue de face (inversion caractéristique du 1er dièdre)."
  },
  {
    id: 10,
    question: "Quelle alternative aux vues multiples clarifie l'intérieur des pièces ?",
    options: ["Perspective", "Coupe", "Vue éclatée", "Vue isométrique"],
    correctAnswer: 1,
    explanation: "Les coupes permettent de montrer clairement l'intérieur d'une pièce sans multiplier les traits cachés."
  },
  {
    id: 11,
    question: "Quel dièdre correspond à la méthode européenne ?",
    options: ["1er dièdre", "2ème dièdre", "3ème dièdre", "4ème dièdre"],
    correctAnswer: 0,
    explanation: "La méthode européenne correspond à la projection du 1er dièdre."
  },
  {
    id: 12,
    question: "Les rayons visuels sont-ils perpendiculaires au plan de projection ?",
    options: ["Oui", "Non", "Parfois", "Jamais"],
    correctAnswer: 0,
    explanation: "Oui, dans une projection orthogonale, les rayons visuels sont toujours perpendiculaires au plan de projection."
  },
  {
    id: 13,
    question: "Quelle méthode est utilisée en Amérique du Nord ?",
    options: ["Méthode européenne", "Méthode américaine (3ème dièdre)", "Méthode asiatique", "Méthode mixte"],
    correctAnswer: 1,
    explanation: "L'Amérique du Nord utilise la méthode américaine, aussi appelée projection du 3ème dièdre."
  },
  {
    id: 14,
    question: "Les vues doivent-elles être alignées entre elles ?",
    options: ["Oui, toujours", "Non, jamais", "Seulement horizontalement", "Seulement verticalement"],
    correctAnswer: 0,
    explanation: "Les vues doivent être rigoureusement alignées verticalement et horizontalement pour respecter la norme."
  },
  {
    id: 15,
    question: "Faut-il indiquer la méthode de projection dans le cartouche ?",
    options: ["Non, ce n'est pas obligatoire", "Oui, avec le symbole approprié", "Seulement pour les pièces complexes", "Seulement à l'export"],
    correctAnswer: 1,
    explanation: "Il est obligatoire d'indiquer la méthode de projection (symbole E ou A) dans le cartouche du plan."
  }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie/lecture-de-plan" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </Link>
        </div>
      </header>

      {/* Main Content */}
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
            <svg viewBox="0 0 800 600" className="w-full h-auto">
              {/* Vue de face (A) - Centre */}
              <g onClick={() => handleViewClick('A')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="325" y="225" width="150" height="150" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="3" rx="8"/>
                <text x="400" y="310" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e40af">A</text>
                <text x="400" y="335" textAnchor="middle" fontSize="14" fill="#475569">Vue de face</text>
              </g>

              {/* Vue de dessus (B) */}
              <g onClick={() => handleViewClick('B')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="325" y="400" width="150" height="120" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="3" rx="8"/>
                <text x="400" y="470" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#047857">B</text>
                <text x="400" y="495" textAnchor="middle" fontSize="14" fill="#475569">Vue de dessus</text>
              </g>

              {/* Vue de droite (D) */}
              <g onClick={() => handleViewClick('D')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="150" y="225" width="150" height="150" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="3" rx="8"/>
                <text x="225" y="310" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#d97706">D</text>
                <text x="225" y="335" textAnchor="middle" fontSize="14" fill="#475569">Vue de droite</text>
              </g>

              {/* Vue de gauche (C) */}
              <g onClick={() => handleViewClick('C')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="500" y="225" width="150" height="150" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="3" rx="8"/>
                <text x="575" y="310" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#6d28d9">C</text>
                <text x="575" y="335" textAnchor="middle" fontSize="14" fill="#475569">Vue de gauche</text>
              </g>

              {/* Vue de dessous (E) */}
              <g onClick={() => handleViewClick('E')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="325" y="80" width="150" height="120" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="3" rx="8"/>
                <text x="400" y="150" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#be185d">E</text>
                <text x="400" y="175" textAnchor="middle" fontSize="14" fill="#475569">Vue de dessous</text>
              </g>

              {/* Vue d'arrière (F) */}
              <g onClick={() => handleViewClick('F')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="25" y="225" width="100" height="150" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="3" rx="8"/>
                <text x="75" y="310" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">F</text>
                <text x="75" y="335" textAnchor="middle" fontSize="14" fill="#475569">Arrière</text>
              </g>

              <text x="400" y="560" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-300">Disposition - Méthode Européenne (E) - 1er Dièdre</text>
            </svg>
          </div>

          {/* Explanation Panel */}
          {selectedViewData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
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
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Choisir une vue de face peu représentative de la pièce.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Multiplier inutilement le nombre de vues (3 vues suffisent souvent).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Confondre la méthode européenne (E) et américaine (A) de projection.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Oublier d'indiquer le symbole de projection dans le cartouche.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Placer les vues sans respecter l'alignement et la correspondance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Dessiner des arêtes cachées là où une coupe serait plus claire.</span>
                </li>
              </ul>
            </div>

            {/* Bonnes pratiques */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700/40">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Sélectionner la vue de face la plus informative (forme caractéristique).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Limiter le nombre de vues au strict nécessaire (2 ou 3 vues).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Respecter rigoureusement l'alignement vertical et horizontal des vues.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Utiliser les coupes et sections pour clarifier l'intérieur des pièces.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Indiquer clairement la méthode de projection utilisée (symbole E ou A).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Vérifier que chaque vue apporte une information complémentaire utile.</span>
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
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
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
                          ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/30'
                          : selectedAnswer === index
                          ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30'
                          : 'border-slate-200 dark:border-slate-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold mr-3 text-slate-700 dark:text-slate-200">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-slate-800 dark:text-slate-100">{option}</span>
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
                  <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 mb-6 rounded">
                    <p className="text-slate-700 dark:text-slate-200">
                      <strong>Explication :</strong> {quizData[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
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
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les vues techniques !</p>
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
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Recommencer le quiz
                </button>
              </div>
            )}
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

        {/* Reste des sections : Context, Projection Methods, Tables, FAQ, CTA... */}
        {/* Continue avec le même pattern dark: pour chaque élément */}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 dark:text-slate-500">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
