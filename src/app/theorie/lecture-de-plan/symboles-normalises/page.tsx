'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book } from 'lucide-react';
import Link from 'next/link';

interface SymbolExplanation {
  id: string;
  title: string;
  norm: string;
  description: string;
  usage: string;
  example: string;
}

const symbolsData: SymbolExplanation[] = [
  {
    id: 'base',
    title: 'Symbole de base',
    norm: 'ISO 1302',
    description: 'Symbole de rugosité sans trait ni cercle (deux branches à 60°)',
    usage: 'État de surface pris en considération, sans exigence particulière sur le procédé de fabrication',
    example: 'Surfaces secondaires, non critiques pour le fonctionnement'
  },
  {
    id: 'usinage',
    title: 'Avec trait horizontal',
    norm: 'ISO 1302',
    description: 'Symbole avec trait horizontal au-dessus du triangle',
    usage: 'Obligation d\'usinage par enlèvement de matière (tournage, fraisage, rectification)',
    example: 'Surfaces fonctionnelles nécessitant une finition précise'
  },
  {
    id: 'brut',
    title: 'Avec cercle',
    norm: 'ISO 1302',
    description: 'Symbole avec cercle dans le triangle',
    usage: 'Enlèvement de matière interdit - Surface brute de fabrication (moulage, fonderie, forge)',
    example: 'Surfaces brutes conservées, barillet horloger'
  },
  {
    id: 'complete',
    title: 'Symbole complété',
    norm: 'ISO 1302',
    description: 'Symbole avec valeurs de rugosité, procédé et orientation des stries',
    usage: 'Spécification complète : Ra, Rz, procédé d\'usinage, orientation texture',
    example: 'Platine de mouvement : Ra 0.8 µm, fraisé, stries parallèles'
  },
  {
    id: 'arete-vive',
    title: 'Arête vive (a)',
    norm: 'ISO 13715',
    description: 'Arête doit rester brute ou vive, sans adoucissement',
    usage: 'Fonds de rainure, bords non usinés, zones où l\'arête vive est fonctionnelle',
    example: 'Rainures de guidage, portées d\'ajustement précis'
  },
  {
    id: 'arete-adoucie',
    title: 'Arête adoucie (b)',
    norm: 'ISO 13715',
    description: 'Arête à adoucir, aucun défaut coupant toléré (ébavurage)',
    usage: 'Pièces manipulées, zones à risques de coupure, assemblage manuel',
    example: 'Bords de platine, pièces de boîtier, composants manipulés'
  },
  {
    id: 'arete-arrondie',
    title: 'Arête arrondie/chanfreinée (c)',
    norm: 'ISO 13715',
    description: 'Arête arrondie ou chanfreinée avec rayon ou chanfrein défini',
    usage: 'Montage facilité, sécurité, esthétique, guidage d\'insertion',
    example: 'Entrées d\'axes, bords de cadran, visserie horlogère'
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
    question: "Que signifie le symbole ISO 1302 de base (triangle sans trait ni cercle) ?",
    options: [
      "Enlèvement de matière interdit",
      "État de surface pris en considération, sans exigence particulière",
      "Usinage obligatoire",
      "Arête à adoucir"
    ],
    correctAnswer: 1,
    explanation: "Le symbole de base indique simplement qu'un état de surface est spécifié, sans imposer de contrainte sur le procédé de fabrication."
  },
  {
    id: 2,
    question: "Quel symbole indique une obligation d'usinage par enlèvement de matière ?",
    options: [
      "Triangle avec cercle",
      "Triangle seul",
      "Triangle avec trait horizontal",
      "Triangle avec croix"
    ],
    correctAnswer: 2,
    explanation: "Le trait horizontal au-dessus du triangle impose un usinage par enlèvement de matière (tournage, fraisage, rectification)."
  },
  {
    id: 3,
    question: "Comment indiquer que l'enlèvement de matière est interdit ?",
    options: [
      "Symbole avec trait horizontal",
      "Symbole avec cercle dans le triangle",
      "Symbole seul",
      "Symbole avec croix"
    ],
    correctAnswer: 1,
    explanation: "Le cercle dans le triangle signifie que la surface doit rester brute (moulage, fonderie, forge) sans enlèvement de matière."
  },
  {
    id: 4,
    question: "Quelle norme régit les symboles d'états de surface ?",
    options: [
      "ISO 128-3",
      "ISO 13715",
      "ISO 1302",
      "ISO 1101"
    ],
    correctAnswer: 2,
    explanation: "La norme ISO 1302 définit les symboles et indications pour spécifier les états de surface sur les plans techniques."
  },
  {
    id: 5,
    question: "Que signifie 'Ra 0.8' sur un symbole d'état de surface ?",
    options: [
      "Rugosité arithmétique maximale de 0.8 millimètres",
      "Rugosité arithmétique maximale de 0.8 micromètres",
      "Rayon d'arête de 0.8 mm",
      "Rapport d'aspect de 0.8"
    ],
    correctAnswer: 1,
    explanation: "Ra (Roughness average) est le paramètre de rugosité arithmétique moyenne, exprimé en micromètres (µm). Ra 0.8 signifie une rugosité maximale de 0.8 µm."
  },
  {
    id: 6,
    question: "Quelle norme traite des arêtes de forme non définie ?",
    options: [
      "ISO 1302",
      "ISO 128-3",
      "ISO 13715",
      "ISO 129-1"
    ],
    correctAnswer: 2,
    explanation: "La norme ISO 13715 définit comment indiquer les exigences sur les arêtes (vives, adoucies, arrondies) lorsqu'aucune dimension précise n'est donnée."
  },
  {
    id: 7,
    question: "Que signifie le symbole 'b' selon ISO 13715 ?",
    options: [
      "Arête vive",
      "Arête adoucie (ébavurée)",
      "Arête brute",
      "Arête biseautée"
    ],
    correctAnswer: 1,
    explanation: "Le symbole 'b' selon ISO 13715 indique que l'arête doit être adoucie par ébavurage, sans défaut coupant toléré."
  },
  {
    id: 8,
    question: "Sur quelle pièce horlogère le symbole d'enlèvement interdit est-il fréquent ?",
    options: [
      "Platine usinée",
      "Barillet brut",
      "Axe rectifié",
      "Pont fraisé"
    ],
    correctAnswer: 1,
    explanation: "Le barillet, pièce d'énergie, est souvent laissé brut de fabrication sans usinage secondaire, d'où le symbole avec cercle."
  },
  {
    id: 9,
    question: "Comment indique-t-on la direction des stries d'usinage ?",
    options: [
      "Par un symbole placé au pied du triangle",
      "Par une couleur différente",
      "Par un chiffre",
      "Par une lettre majuscule"
    ],
    correctAnswer: 0,
    explanation: "L'orientation des stries (parallèle, perpendiculaire, multidirectionnelle, circulaire) est indiquée par un symbole placé au pied du symbole de rugosité."
  },
  {
    id: 10,
    question: "Peut-on cumuler rugosité et indication d'arête sur une même surface ?",
    options: [
      "Non, il faut choisir l'un ou l'autre",
      "Oui, ce sont deux exigences distinctes",
      "Seulement pour les pièces horlogères",
      "Seulement en méthode européenne"
    ],
    correctAnswer: 1,
    explanation: "Oui, la rugosité (ISO 1302) concerne la surface, tandis que l'indication d'arête (ISO 13715) concerne les bords. Elles sont complémentaires."
  },
  {
    id: 11,
    question: "Quelle valeur de rugosité typique pour une platine de mouvement ?",
    options: [
      "Ra 25 µm",
      "Ra 0.8 µm",
      "Ra 0.01 µm",
      "Ra 100 µm"
    ],
    correctAnswer: 1,
    explanation: "Une platine de mouvement horloger nécessite une finition précise, typiquement Ra 0.8 µm, pour garantir le bon fonctionnement du mécanisme."
  },
  {
    id: 12,
    question: "Pourquoi adoucir les arêtes en horlogerie ?",
    options: [
      "Pour l'esthétique uniquement",
      "Pour la sécurité lors de la manipulation et du montage",
      "Pour réduire le poids",
      "Pour améliorer la précision"
    ],
    correctAnswer: 1,
    explanation: "L'adoucissement des arêtes (ébavurage) évite les blessures lors de la manipulation, facilite le montage et prévient les éclats de matière."
  },
  {
    id: 13,
    question: "Faut-il placer un symbole d'état de surface sur chaque surface du plan ?",
    options: [
      "Oui, obligatoirement sur toutes les surfaces",
      "Non, seulement sur les surfaces avec exigences particulières",
      "Oui, mais seulement en vue de face",
      "Non, jamais nécessaire"
    ],
    correctAnswer: 1,
    explanation: "Seules les surfaces critiques ou avec des exigences spécifiques nécessitent le symbole. On peut aussi définir une spécification générale pour les autres surfaces."
  },
  {
    id: 14,
    question: "Où se place le symbole de rugosité par rapport à la surface ?",
    options: [
      "À distance, sans contact",
      "Avec la pointe du triangle touchant la surface",
      "Au-dessus de la surface",
      "En dehors du plan"
    ],
    correctAnswer: 1,
    explanation: "Le symbole de rugosité se place avec la pointe du triangle en contact avec la surface concernée ou sur la ligne de cote correspondante."
  },
  {
    id: 15,
    question: "Que signifie le symbole 'c' selon ISO 13715 ?",
    options: [
      "Arête coupante",
      "Arête cassée",
      "Arête arrondie ou chanfreinée",
      "Arête centrale"
    ],
    correctAnswer: 2,
    explanation: "Le symbole 'c' selon ISO 13715 indique que l'arête doit être arrondie (rayon) ou chanfreinée, généralement avec une dimension associée."
  }
];

export default function SymbolesNormalisesPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSymbolClick = (symbolId: string) => {
    setSelectedSymbol(symbolId);
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

  const selectedSymbolData = symbolsData.find(s => s.id === selectedSymbol);

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
            Symboles Normalisés (ISO 1302 & ISO 13715)
          </h1>
        </div>

        {/* Interactive Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Schéma Interactif</h2>
          <p className="text-slate-600 mb-8">Cliquez sur les symboles pour voir leur signification et utilisation.</p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <svg viewBox="0 0 900 500" className="w-full h-auto">
              <text x="450" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e40af">Symboles ISO 1302 & ISO 13715</text>
              
              {/* Symbole de base */}
              <g onClick={() => handleSymbolClick('base')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="50" y="60" width="180" height="140" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                <path d="M 100 130 L 120 90 L 140 130" stroke="#1e40af" strokeWidth="3" fill="none"/>
                <line x1="140" y1="90" x2="180" y2="90" stroke="#1e40af" strokeWidth="2"/>
                <text x="140" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Symbole de base</text>
                <text x="140" y="180" textAnchor="middle" fontSize="12" fill="#64748b">ISO 1302</text>
              </g>

              {/* Avec trait (usinage obligatoire) */}
              <g onClick={() => handleSymbolClick('usinage')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="260" y="60" width="180" height="140" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="8"/>
                <path d="M 310 130 L 330 90 L 350 130" stroke="#047857" strokeWidth="3" fill="none"/>
                <line x1="350" y1="90" x2="390" y2="90" stroke="#047857" strokeWidth="2"/>
                <line x1="310" y1="82" x2="350" y2="82" stroke="#047857" strokeWidth="3"/>
                <text x="350" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Avec trait</text>
                <text x="350" y="180" textAnchor="middle" fontSize="12" fill="#64748b">Usinage obligatoire</text>
              </g>

              {/* Avec cercle (brut) */}
              <g onClick={() => handleSymbolClick('brut')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="470" y="60" width="180" height="140" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" rx="8"/>
                <path d="M 520 130 L 540 90 L 560 130" stroke="#d97706" strokeWidth="3" fill="none"/>
                <line x1="560" y1="90" x2="600" y2="90" stroke="#d97706" strokeWidth="2"/>
                <circle cx="540" cy="110" r="12" stroke="#d97706" strokeWidth="3" fill="none"/>
                <text x="560" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Avec cercle</text>
                <text x="560" y="180" textAnchor="middle" fontSize="12" fill="#64748b">Enlèvement interdit</text>
              </g>

              {/* Symbole complété */}
              <g onClick={() => handleSymbolClick('complete')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="680" y="60" width="180" height="140" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="8"/>
                <path d="M 730 130 L 750 90 L 770 130" stroke="#6d28d9" strokeWidth="3" fill="none"/>
                <line x1="770" y1="90" x2="810" y2="90" stroke="#6d28d9" strokeWidth="2"/>
                <line x1="730" y1="82" x2="770" y2="82" stroke="#6d28d9" strokeWidth="3"/>
                <text x="750" y="150" textAnchor="middle" fontSize="11" fill="#6d28d9" fontWeight="bold">Ra 0.8</text>
                <text x="770" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Complété</text>
                <text x="770" y="180" textAnchor="middle" fontSize="12" fill="#64748b">Avec valeurs</text>
              </g>

              {/* Ligne séparatrice */}
              <line x1="50" y1="240" x2="850" y2="240" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="450" y="270" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e40af">Symboles ISO 13715 (Arêtes)</text>

              {/* Arête vive (a) */}
              <g onClick={() => handleSymbolClick('arete-vive')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="100" y="300" width="200" height="140" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" rx="8"/>
                <text x="200" y="350" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#dc2626">a</text>
                <text x="200" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Arête vive</text>
                <text x="200" y="410" textAnchor="middle" fontSize="12" fill="#64748b">Brute, non ébavurée</text>
              </g>

              {/* Arête adoucie (b) */}
              <g onClick={() => handleSymbolClick('arete-adoucie')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="350" y="300" width="200" height="140" fill="#06b6d4" fillOpacity="0.1" stroke="#06b6d4" strokeWidth="2" rx="8"/>
                <text x="450" y="350" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#0891b2">b</text>
                <text x="450" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Arête adoucie</text>
                <text x="450" y="410" textAnchor="middle" fontSize="12" fill="#64748b">Ébavurée</text>
              </g>

              {/* Arête arrondie (c) */}
              <g onClick={() => handleSymbolClick('arete-arrondie')} className="cursor-pointer hover:opacity-80 transition-opacity">
                <rect x="600" y="300" width="200" height="140" fill="#ec4899" fillOpacity="0.1" stroke="#ec4899" strokeWidth="2" rx="8"/>
                <text x="700" y="350" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#be185d">c</text>
                <text x="700" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">Arête arrondie</text>
                <text x="700" y="410" textAnchor="middle" fontSize="12" fill="#64748b">Chanfreinée</text>
              </g>
            </svg>
          </div>

          {/* Explanation Panel */}
          {selectedSymbolData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedSymbolData.title}</h3>
              <p className="text-sm text-blue-800 font-semibold mb-3">Norme : {selectedSymbolData.norm}</p>
              <p className="text-slate-700 mb-3"><strong>Description :</strong> {selectedSymbolData.description}</p>
              <p className="text-slate-700 mb-3"><strong>Utilisation :</strong> {selectedSymbolData.usage}</p>
              <p className="text-slate-700"><strong>Exemple :</strong> {selectedSymbolData.example}</p>
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
                  <span>Oublier d'indiquer l'état de surface exigé sur les plans critiques.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Utiliser le symbole d'état de surface sans compléter les valeurs (rugosité, procédé, stries).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Oublier l'indication d'arête sur les fonds de rainure ou pièces complexes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Mélanger plusieurs symboles pour la même exigence.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Placer les symboles trop loin ou sans ligne de repère claire.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Confondre Ra (rugosité arithmétique) et Rz (hauteur maximale du profil).</span>
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
                  <span>Sélectionner le symbole adapté à chaque exigence (état de surface, arête, strie, procédé).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Préciser systématiquement : rugosité, procédé d'usinage, orientation des stries.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Utiliser la ligne de repère, toujours orientée vers la surface concernée.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Regrouper les exigences similaires pour alléger le plan.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Vérifier la cohérence des symboles sur toutes les vues.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Indiquer une spécification générale dans le cartouche pour les surfaces non critiques.</span>
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
                    <p className="text-green-600 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les symboles normalisés !</p>
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

        {/* Video Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Vidéo : Symboles & Cotation des états de surface</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/A097T5SoR5k" 
                title="Indications sur les dessins d'une spécification d'états de surface - ISO 1302" 
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Contexte & Origines des Normes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISO 1302 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ISO 1302 (États de surface)</h3>
                  <p className="text-sm text-blue-800 font-semibold mb-3">Version 2002, mise à jour ISO 21920</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                La norme <strong className="text-blue-600">ISO 1302</strong> définit les symboles et la manière d'indiquer les spécifications d'états de surface sur les plans techniques. Elle permet de préciser la rugosité attendue (Ra, Rz), l'obligation d'usinage, l'orientation des stries ou encore le procédé à appliquer, rendant les exigences lisibles et universelles pour tous les ateliers d'usinage.
              </p>
            </div>

            {/* ISO 13715 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Book className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ISO 13715 (Arêtes non définies)</h3>
                  <p className="text-sm text-green-800 font-semibold mb-3">Version 2017</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                La norme <strong className="text-green-600">ISO 13715</strong> est dédiée à la cotation des arêtes de forme non définie : elle explicite comment indiquer si une arête doit rester vive, être adoucie, chanfreinée ou arrondie — là où aucune dimension précise n'est donnée. Ces indications sont essentielles pour l'usinage, le montage et la sécurité des composants horlogers.
              </p>
            </div>
          </div>
        </section>

        {/* Symboles Standards - Table ISO 1302 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Symboles Standards ISO 1302 (États de surface)</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Symbole</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Signification</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Utilisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Triangle de base (60°)</td>
                    <td className="px-6 py-4 text-slate-700">État de surface pris en considération, sans exigence particulière</td>
                    <td className="px-6 py-4 text-slate-700">Lecture/simple état de surface</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Avec trait horizontal</td>
                    <td className="px-6 py-4 text-slate-700">Obligation d'usinage par enlèvement de matière</td>
                    <td className="px-6 py-4 text-slate-700">Usinage nécessaire (tournage, fraisage, rectification)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Avec cercle</td>
                    <td className="px-6 py-4 text-slate-700">Enlèvement de matière interdit, brut de fabrication</td>
                    <td className="px-6 py-4 text-slate-700">Surface brute requise (moulage, fonderie, forge)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Symbole complété (valeurs)</td>
                    <td className="px-6 py-4 text-slate-700">Exigence de rugosité, stries, procédé</td>
                    <td className="px-6 py-4 text-slate-700">Tolérancement précis (Ra, Rz, procédé, orientation)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Symboles ISO 13715 - Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Symboles ISO 13715 (Arêtes)</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Symbole</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Signification</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Utilisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 text-2xl">a</td>
                    <td className="px-6 py-4 text-slate-700">Arête doit rester brute ou vive</td>
                    <td className="px-6 py-4 text-slate-700">Fonds de rainure, bords non usinés, zones où l'arête vive est fonctionnelle</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 text-2xl">b</td>
                    <td className="px-6 py-4 text-slate-700">Arête à adoucir, aucun défaut coupant toléré</td>
                    <td className="px-6 py-4 text-slate-700">Pièces manipulées, zones à risques, assemblage manuel</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 text-2xl">c</td>
                    <td className="px-6 py-4 text-slate-700">Arête arrondie ou chanfreinée</td>
                    <td className="px-6 py-4 text-slate-700">Montage facilité, sécurité, esthétique, guidage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exemples en Horlogerie */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Exemples en Horlogerie</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Type de pièce</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Symbole/Spécification</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Platine</td>
                    <td className="px-6 py-4 text-slate-700">ISO 1302: Ra 0.8 µm, procédé « fraisé »</td>
                    <td className="px-6 py-4 text-slate-700">Fonctionnement précis du mouvement</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Barillet</td>
                    <td className="px-6 py-4 text-slate-700">ISO 1302: brut, enlèvement interdit</td>
                    <td className="px-6 py-4 text-slate-700">Pièce d'énergie, pas d'usinage secondaire</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Bords de platine</td>
                    <td className="px-6 py-4 text-slate-700">ISO 13715: arête « b » (adoucie)</td>
                    <td className="px-6 py-4 text-slate-700">Sécurité manipulation, montage facile</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Axe de balancier</td>
                    <td className="px-6 py-4 text-slate-700">ISO 1302: Ra 0.2 µm, rectifié</td>
                    <td className="px-6 py-4 text-slate-700">Pivotement fluide, réduction friction</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Visserie</td>
                    <td className="px-6 py-4 text-slate-700">ISO 13715: arête « c » (chanfreinée)</td>
                    <td className="px-6 py-4 text-slate-700">Guidage d'insertion, assemblage</td>
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
              "Sur un plan horloger, la clarté des symboles garantit la conformité de la pièce en atelier."
            </blockquote>
            <p className="text-blue-100">— Principe fondamental des symboles normalisés</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                À quoi sert la norme ISO 1302 ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Elle définit comment indiquer l'état de surface (rugosité, procédé, orientation des stries) attendue pour chaque pièce, pour garantir la qualité, l'interchangeabilité et la conformité aux exigences fonctionnelles.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Pourquoi une norme spécifique pour les arêtes (ISO 13715) ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Certaines arêtes n'ont pas de cotation précise : ISO 13715 permet alors d'imposer, par symbole, si elles doivent rester vives (a), être adoucies/ébavurées (b) ou chanfreinées/arrondies (c), garantissant ainsi la sécurité et la qualité du montage.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Peut-on cumuler rugosité et indication d'arête ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Oui : l'exigence de rugosité (ISO 1302) concerne la surface plane, tandis que l'exigence d'arête (ISO 13715) se positionne sur la ligne ou le point de jonction. Elles sont complémentaires et peuvent coexister sur un même plan.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Faut-il que chaque surface ait un symbole d'état de surface ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  Non : seules les surfaces avec une exigence particulière ou critique nécessitent le symbole. Il est d'usage de regrouper les surfaces similaires ou de définir une spécification générale dans le cartouche pour les surfaces non critiques.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center">
                Quelle est la différence entre Ra et Rz ?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-700">
                  <strong>Ra</strong> (Roughness average) est la rugosité arithmétique moyenne, la plus utilisée. <strong>Rz</strong> (hauteur maximale du profil) mesure la distance entre le point le plus haut et le plus bas sur une longueur d'évaluation. Ra est plus représentatif de l'état général, Rz détecte les pics et creux extrêmes.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white inline-block">
            <p className="text-lg mb-4">📘 Tu veux aller plus loin ?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.iso.org/standard/28089.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Consulter ISO 1302
              </a>
              <a 
                href="https://www.iso.org/standard/27925.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Consulter ISO 13715
              </a>
            </div>
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
