'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Book, FileText, User } from 'lucide-react';
import Link from 'next/link';

interface CartoucheField {
  id: string;
  name: string;
  category: string;
  obligation: string;
  description: string;
  example: string;
  characters: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const cartoucheFieldsData: CartoucheField[] = [
  {
    id: 'entreprise',
    name: 'Nom de l\'entreprise',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Raison sociale de l\'entreprise ou logo.',
    example: 'Manufacture Horlogère SA',
    characters: '30 caractères',
    x: 10,
    y: 10,
    width: 100,
    height: 40
  },
  {
    id: 'titre',
    name: 'Titre',
    category: 'Descriptif',
    obligation: 'Obligatoire',
    description: 'Désignation de la pièce ou de l\'ensemble. Doit être clair et normalisé.',
    example: 'PLATINE DE MOUVEMENT ETA 6497',
    characters: '50 caractères',
    x: 120,
    y: 10,
    width: 200,
    height: 20
  },
  {
    id: 'numero_plan',
    name: 'Numéro du plan',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Code alphanumérique unique identifiant le plan dans le système de gestion documentaire.',
    example: 'PLT-6497-001-A',
    characters: '20 caractères',
    x: 330,
    y: 10,
    width: 70,
    height: 15
  },
  {
    id: 'indice',
    name: 'Indice de révision',
    category: 'Traçabilité',
    obligation: 'Obligatoire',
    description: 'Lettre ou chiffre indiquant la version du plan (A, B, C... ou 01, 02, 03...).',
    example: 'Rev. C',
    characters: '5 caractères',
    x: 330,
    y: 30,
    width: 70,
    height: 10
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Rapport de réduction ou d\'agrandissement du dessin par rapport à la pièce réelle.',
    example: '2:1 (agrandi)',
    characters: '10 caractères',
    x: 330,
    y: 45,
    width: 70,
    height: 10
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première utilisée pour la fabrication de la pièce.',
    example: 'Laiton CuZn37 (MS63)',
    characters: '30 caractères',
    x: 120,
    y: 35,
    width: 200,
    height: 15
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Finition ou traitement thermique/chimique appliqué à la pièce.',
    example: 'Rhodiage 3-5µm',
    characters: '30 caractères',
    x: 120,
    y: 55,
    width: 200,
    height: 15
  },
  {
    id: 'tolerance_generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Classe de tolérance ISO applicable aux cotes non spécifiées individuellement.',
    example: 'ISO 2768-m',
    characters: '15 caractères',
    x: 330,
    y: 60,
    width: 70,
    height: 10
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Norme',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la méthode de projection utilisée (européenne ou américaine).',
    example: 'E (Européenne)',
    characters: '5 caractères',
    x: 330,
    y: 75,
    width: 30,
    height: 15
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Traçabilité',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin technique.',
    example: 'J. Dupont',
    characters: '20 caractères',
    x: 10,
    y: 55,
    width: 100,
    height: 12
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Traçabilité',
    obligation: 'Conditionnel',
    description: 'Nom de la personne ayant vérifié la conformité du plan.',
    example: 'M. Martin',
    characters: '20 caractères',
    x: 10,
    y: 70,
    width: 100,
    height: 12
  },
  {
    id: 'date',
    name: 'Date de création',
    category: 'Traçabilité',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière révision du plan.',
    example: '2025-10-18',
    characters: '10 caractères',
    x: 10,
    y: 85,
    width: 100,
    height: 12
  },
  {
    id: 'unite',
    name: 'Unité de mesure',
    category: 'Norme',
    obligation: 'Obligatoire',
    description: 'Unité utilisée pour les cotes (millimètres par défaut en horlogerie).',
    example: 'mm',
    characters: '5 caractères',
    x: 365,
    y: 75,
    width: 35,
    height: 15
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
    question: "Quelle norme ISO régit le contenu et la disposition du cartouche ?",
    options: ["ISO 128", "ISO 7200", "ISO 1101", "ISO 5457"],
    correctAnswer: 1,
    explanation: "La norme ISO 7200 définit le contenu, la structure et la disposition des champs de données dans le cartouche d'inscription."
  },
  {
    id: 2,
    question: "Où doit être placé le cartouche sur un plan technique ?",
    options: ["Coin supérieur gauche", "Centre du plan", "Coin inférieur droit", "Coin supérieur droit"],
    correctAnswer: 2,
    explanation: "Selon ISO 5457, le cartouche doit toujours être positionné dans le coin inférieur droit du plan."
  },
  {
    id: 3,
    question: "Quel champ du cartouche identifie de façon unique un plan ?",
    options: ["Titre", "Numéro du plan", "Date", "Échelle"],
    correctAnswer: 1,
    explanation: "Le numéro du plan est l'identifiant unique et obligatoire permettant de référencer le document dans le système de gestion."
  },
  {
    id: 4,
    question: "Que signifie l'échelle '2:1' sur un plan horloger ?",
    options: ["La pièce est 2 fois plus petite", "Le dessin est 2 fois plus grand que la pièce réelle", "La pièce mesure 2mm", "Le dessin est réduit de moitié"],
    correctAnswer: 1,
    explanation: "Une échelle 2:1 signifie que le dessin est agrandi 2 fois par rapport aux dimensions réelles de la pièce."
  },
  {
    id: 5,
    question: "Quel symbole indique la méthode de projection européenne ?",
    options: ["A", "E", "ISO", "P"],
    correctAnswer: 1,
    explanation: "Le symbole 'E' (pour Européenne) avec un cône tronqué à gauche indique la projection du 1er dièdre."
  },
  {
    id: 6,
    question: "Que désigne 'ISO 2768-m' dans un cartouche ?",
    options: ["Le matériau", "La tolérance générale", "L'échelle", "La méthode de projection"],
    correctAnswer: 1,
    explanation: "ISO 2768-m définit la classe de tolérance générale moyenne applicable aux cotes non tolérancées individuellement."
  },
  {
    id: 7,
    question: "L'indice de révision est-il obligatoire dans un cartouche ?",
    options: ["Oui, toujours", "Non, jamais", "Seulement si le plan a été modifié", "Seulement pour les plans complexes"],
    correctAnswer: 0,
    explanation: "L'indice de révision est obligatoire selon ISO 7200, même pour la version initiale (généralement notée A ou 01)."
  },
  {
    id: 8,
    question: "Quel est le format standard d'un numéro de plan horloger ?",
    options: ["Libre", "Code alphanumérique structuré", "Uniquement des chiffres", "Uniquement des lettres"],
    correctAnswer: 1,
    explanation: "Un numéro de plan horloger suit généralement un code alphanumérique structuré (ex: PLT-6497-001-A) pour une traçabilité optimale."
  },
  {
    id: 9,
    question: "Le champ 'Vérificateur' est-il obligatoire ?",
    options: ["Oui, toujours", "Non, c'est conditionnel", "Seulement pour les plans d'assemblage", "Seulement pour les pièces critiques"],
    correctAnswer: 1,
    explanation: "Le champ 'Vérificateur' est conditionnel : il n'est obligatoire que si une procédure de vérification formelle existe dans l'entreprise."
  },
  {
    id: 10,
    question: "Quelle information n'est PAS obligatoire dans un cartouche horloger ?",
    options: ["Titre de la pièce", "Traitement de surface", "Numéro du plan", "Échelle"],
    correctAnswer: 1,
    explanation: "Le traitement de surface est conditionnel : il n'est obligatoire que s'il est nécessaire à la fonction de la pièce."
  }
];

export default function CartoucheHorlogerPage() {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId);
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

  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Identification': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700';
      case 'Descriptif': return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700';
      case 'Technique': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700';
      case 'Traçabilité': return 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700';
      case 'Norme': return 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-700';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700';
    }
  };

  const getObligationColor = (obligation: string) => {
    return obligation === 'Obligatoire' 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-blue-600 dark:text-blue-400';
  };

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
            Cartouche Horloger (Normes techniques)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ISO 7200 & ISO 5457 : identification et traçabilité des plans techniques
          </p>
        </div>
        {/* Interactive Cartouche Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Schéma Interactif du Cartouche</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">Cliquez sur un champ dans le schéma ou dans la liste ci-dessous pour voir ses détails.</p>
          
          {/* SVG Cartouche */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Position : Coin inférieur droit du plan (ISO 5457)</span>
            </div>
            <svg viewBox="0 0 410 100" className="w-full h-auto border-2 border-slate-300 dark:border-slate-600 rounded-lg">
              {/* Titre général */}
              <text x="205" y="-5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-400">
                Cartouche d'inscription ISO 7200
              </text>
              
              {/* Cadre extérieur */}
              <rect x="0" y="0" width="410" height="100" fill="none" stroke="#1e293b" className="dark:stroke-slate-400" strokeWidth="2"/>
              
              {/* Champs interactifs */}
              {cartoucheFieldsData.map((field) => (
                <g key={field.id} onClick={() => handleFieldClick(field.id)} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <rect 
                    x={field.x} 
                    y={field.y} 
                    width={field.width} 
                    height={field.height} 
                    fill={field.obligation === 'Obligatoire' ? '#fecaca' : '#bfdbfe'} 
                    fillOpacity="0.3" 
                    stroke={field.obligation === 'Obligatoire' ? '#ef4444' : '#3b82f6'} 
                    strokeWidth="1.5"
                    className={selectedField === field.id ? 'fill-opacity-60' : ''}
                  />
                  <text 
                    x={field.x + field.width / 2} 
                    y={field.y + field.height / 2 + 3} 
                    textAnchor="middle" 
                    fontSize="7" 
                    fontWeight="bold" 
                    fill="#1e293b"
                    className="dark:fill-slate-300 pointer-events-none"
                  >
                    {field.name.length > 20 ? field.name.substring(0, 18) + '...' : field.name}
                  </text>
                </g>
              ))}
              
              {/* Légende */}
              <g>
                <circle cx="15" cy="95" r="4" fill="#ef4444"/>
                <text x="22" y="98" fontSize="7" fill="#64748b" className="dark:fill-slate-400">Obligatoire (O)</text>
                
                <circle cx="80" cy="95" r="4" fill="#3b82f6"/>
                <text x="87" y="98" fontSize="7" fill="#64748b" className="dark:fill-slate-400">Conditionnel (C)</text>
              </g>
            </svg>
          </div>

          {/* Explanation Panel */}
          {selectedFieldData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400 animate-fadeIn">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFieldData.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFieldData.category)}`}>
                      {selectedFieldData.category}
                    </span>
                    <span className={`text-sm font-bold ${getObligationColor(selectedFieldData.obligation)}`}>
                      {selectedFieldData.obligation}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Description :</p>
                  <p className="text-slate-700 dark:text-slate-200 mb-3">{selectedFieldData.description}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Nombre de caractères :</p>
                  <p className="text-slate-700 dark:text-slate-200">{selectedFieldData.characters}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Exemple horlogerie :</p>
                  <p className="text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-700 font-mono text-sm">
                    {selectedFieldData.example}
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 mt-3">Position dans le cartouche :</p>
                  <p className="text-slate-700 dark:text-slate-200 text-xs">
                    x: {selectedFieldData.x}mm, y: {selectedFieldData.y}mm (largeur: {selectedFieldData.width}mm × hauteur: {selectedFieldData.height}mm)
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* List of Fields */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Liste des Champs de Données</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartoucheFieldsData.map((field) => (
              <div
                key={field.id}
                onClick={() => handleFieldClick(field.id)}
                className={`bg-white dark:bg-slate-800 rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedField === field.id ? 'border-blue-600 dark:border-blue-400 shadow-lg ring-2 ring-blue-200 dark:ring-blue-700' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(field.category)}`}>
                    {field.category}
                  </span>
                  <span className={`text-xs font-semibold ${getObligationColor(field.obligation)}`}>
                    {field.obligation === 'Obligatoire' ? 'O' : 'C'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{field.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{field.description}</p>
              </div>
            ))}
          </div>
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
                  <span>Oublier d'indiquer l'indice de révision (même pour la version initiale).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Utiliser une échelle sans la mentionner dans le cartouche.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Ne pas spécifier la tolérance générale ISO 2768.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Placer le cartouche ailleurs qu'en bas à droite.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Utiliser des abréviations non normalisées pour le matériau.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Omettre le symbole de projection (E ou A).</span>
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
                  <span>Utiliser un système de numérotation cohérent et structuré.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Vérifier la conformité avec les normes ISO 7200 et ISO 5457.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Remplir tous les champs obligatoires avant validation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Utiliser les désignations normalisées pour les matériaux (EN, ASTM).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Dater chaque modification et incrémenter l'indice de révision.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Conserver un historique de toutes les révisions du plan.</span>
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
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">🎉 Parfait ! Tu maîtrises le cartouche horloger !</p>
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
        {/* Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contexte & Origines des Normes</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <div className="mb-6 flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                <Book className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
                  La norme <strong className="text-blue-600 dark:text-blue-400">ISO 7200:2004</strong> définit le contenu, la structure et la disposition des champs de données dans le cartouche d'inscription des dessins techniques. Elle assure l'interopérabilité internationale des plans et la traçabilité documentaire.
                </p>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
                  La norme <strong className="text-blue-600 dark:text-blue-400">ISO 5457:1999</strong> spécifie les formats, la présentation et la disposition des dessins techniques, notamment l'emplacement du cartouche (coin inférieur droit).
                </p>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                  En horlogerie, le respect rigoureux de ces normes garantit la <strong>traçabilité complète</strong> des pièces, facilite les échanges entre manufactures et permet une gestion documentaire efficace des milliers de composants d'un mouvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tableau récapitulatif des champs obligatoires */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Tableau Récapitulatif des Champs</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Champ</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Catégorie</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Obligation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Exemple horlogerie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {cartoucheFieldsData.map((field) => (
                    <tr key={field.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{field.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(field.category)}`}>
                          {field.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${getObligationColor(field.obligation)}`}>
                          {field.obligation}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">{field.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exemples de cartouches par type de pièce */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Exemples par Type de Pièce</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Type de pièce</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Numéro de plan</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Échelle typique</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Matériau usuel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Platine</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">PLT-6497-001-A</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">1:1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Laiton CuZn37</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Roue d'échappement</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">ROU-ECH-015-B</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">5:1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Acier inox 316L</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Pont de balancier</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">PON-BAL-023-C</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">2:1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Maillechort CuNi18Zn20</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Axe de balancier</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">AXE-BAL-008-A</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">10:1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Acier trempé 100Cr6</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Barillet complet</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-mono text-sm">BAR-CPL-042-D</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">1:1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Laiton CuZn37</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-2xl p-8 text-white text-center">
            <blockquote className="text-2xl font-serif italic mb-4">
              "Un cartouche bien rempli est la mémoire technique d'une pièce horlogère."
            </blockquote>
            <p className="text-blue-100 dark:text-blue-200">— Principe fondamental de la documentation technique</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                Tous les champs du cartouche sont-ils obligatoires ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">
                  Non. Selon ISO 7200, certains champs sont <strong>obligatoires</strong> (titre, numéro de plan, échelle, date, etc.) tandis que d'autres sont <strong>conditionnels</strong> (vérificateur, traitement de surface) et ne sont requis que dans des contextes spécifiques.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                Quelle est la différence entre ISO 7200 et ISO 5457 ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>ISO 7200</strong> définit le <strong>contenu et la structure</strong> des champs du cartouche. <strong>ISO 5457</strong> définit les <strong>formats de feuilles</strong> et la <strong>position du cartouche</strong> (coin inférieur droit). Les deux normes sont complémentaires.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                Comment numéroter efficacement les plans horlogers ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">
                  Utilisez un <strong>système structuré</strong> : [TYPE]-[CALIBRE/PROJET]-[NUMÉRO SÉQUENTIEL]-[INDICE]. Exemple : <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-blue-800 dark:text-blue-200">PLT-6497-001-A</code> (Platine, calibre 6497, plan n°001, révision A).
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                Faut-il indiquer l'indice de révision dès la première version ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>Oui, absolument.</strong> Même la première version doit avoir un indice (généralement <strong>A</strong> ou <strong>01</strong>). Cela facilite la traçabilité et évite toute confusion lors de futures révisions.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                Quelle tolérance générale utiliser en horlogerie ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-200">
                  La classe <strong>ISO 2768-m</strong> (moyenne) est souvent utilisée pour les pièces mécaniques horlogères. Pour les pièces de précision critique, on peut descendre à <strong>ISO 2768-f</strong> (fine) ou spécifier des tolérances individuelles.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-2xl p-8 text-white inline-block">
            <p className="text-lg mb-4">📘 Tu veux aller plus loin ?</p>
            <a 
              href="https://www.iso.org/standard/68916.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white dark:bg-slate-100 text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-200 transition-colors"
            >
              Consulter la norme ISO 7200 complète
            </a>
          </div>
        </section>
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
