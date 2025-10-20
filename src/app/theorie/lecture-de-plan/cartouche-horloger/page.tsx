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
    example: 'Platine calibre 2824 / Pont de balancier',
    characters: '25-30 caractères',
    x: 120,
    y: 10,
    width: 180,
    height: 25
  },
  {
    id: 'numero-piece',
    name: 'Numéro de pièce',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Référence unique de la pièce dans le système de gestion.',
    example: 'P-2824-001-A / MB-453-12',
    characters: '15-20 caractères',
    x: 310,
    y: 10,
    width: 90,
    height: 25
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première utilisée selon nomenclature normalisée.',
    example: 'Maillechort / Laiton CuZn40 / Acier inox 316L',
    characters: '20 caractères',
    x: 120,
    y: 40,
    width: 90,
    height: 20
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Traitements thermiques, revêtements, finitions spéciales.',
    example: 'Rhodiage / Anglage / Perlage / PVD',
    characters: '30 caractères',
    x: 215,
    y: 40,
    width: 85,
    height: 20
  },
  {
    id: 'masse',
    name: 'Masse',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Poids théorique de la pièce (important en horlogerie).',
    example: '0.45 g / 2.3 g',
    characters: '10 caractères',
    x: 310,
    y: 40,
    width: 45,
    height: 20
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Rapport entre les dimensions du dessin et les dimensions réelles.',
    example: '1:1 / 2:1 / 5:1 / 10:1',
    characters: '10 caractères',
    x: 360,
    y: 40,
    width: 40,
    height: 20
  },
  {
    id: 'tolerance-generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Tolérances applicables aux cotes non tolérancées individuellement.',
    example: 'ISO 2768-m / ±0.1 mm',
    characters: '20 caractères',
    x: 120,
    y: 65,
    width: 90,
    height: 20
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la méthode européenne (E) ou américaine (A).',
    example: 'Symbole E (1er dièdre) en Suisse',
    characters: 'Symbole',
    x: 215,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'format',
    name: 'Format',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Format du plan selon ISO 5457 (A0, A1, A2, A3, A4).',
    example: 'A4 / A3',
    characters: '4 caractères',
    x: 260,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'indice',
    name: 'Indice de révision',
    category: 'Gestion',
    obligation: 'Obligatoire',
    description: 'Lettre ou numéro indiquant la version du document.',
    example: 'A / B / C / Rev.1',
    characters: '4 caractères',
    x: 310,
    y: 65,
    width: 45,
    height: 20
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin.',
    example: 'J. Dupont / JD',
    characters: '20 caractères',
    x: 10,
    y: 55,
    width: 100,
    height: 15
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant vérifié le dessin.',
    example: 'M. Martin / MM',
    characters: '20 caractères',
    x: 10,
    y: 75,
    width: 100,
    height: 15
  },
  {
    id: 'date',
    name: 'Date',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière modification.',
    example: '17.10.2025 / 2025-10-17',
    characters: '10 caractères',
    x: 360,
    y: 65,
    width: 40,
    height: 20
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
    question: "Quelle norme ISO régit les champs de données dans les cartouches d'inscription ?",
    options: ["ISO 5457", "ISO 7200", "ISO 128-1", "ISO 1101"],
    correctAnswer: 1,
    explanation: "La norme ISO 7200:2004 spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques."
  },
  {
    id: 2,
    question: "Où doit obligatoirement se situer le cartouche sur un plan technique ?",
    options: ["En haut à gauche", "En bas à gauche", "En haut à droite", "En bas à droite"],
    correctAnswer: 3,
    explanation: "Selon ISO 5457, le cartouche doit obligatoirement se situer dans le coin inférieur droit du document, dans le sens de lecture."
  },
  {
    id: 3,
    question: "Quelle est la dimension maximale de la zone d'identification du cartouche selon ISO 7200 ?",
    options: ["100 mm", "120 mm", "170 mm", "210 mm"],
    correctAnswer: 2,
    explanation: "La zone d'identification du cartouche doit avoir une longueur maximale de 170 mm selon ISO 7200."
  },
  {
    id: 4,
    question: "Pour un format A4, quelle est la marge minimale recommandée selon ISO 5457 ?",
    options: ["5 mm", "10 mm", "20 mm", "25 mm"],
    correctAnswer: 1,
    explanation: "Les formats A4, A3 et A2 ont une marge de 10 mm, tandis que les formats A1 et A0 ont une marge de 20 mm."
  },
  {
    id: 5,
    question: "Quel champ du cartouche est obligatoire selon ISO 7200 ?",
    options: ["Masse de la pièce", "Titre", "Traitement de surface", "Tolérance générale"],
    correctAnswer: 1,
    explanation: "Le titre est un champ obligatoire (O) selon ISO 7200, car il identifie le contenu du document."
  },
  {
    id: 6,
    question: "Que signifie un indice de révision 'C' sur un plan ?",
    options: ["Confidentiel", "3ème révision", "Contrôlé", "Copie"],
    correctAnswer: 1,
    explanation: "L'indice de révision suit généralement l'ordre alphabétique : A (1ère révision), B (2ème), C (3ème), etc."
  },
  {
    id: 7,
    question: "Quel format de plan est le plus utilisé en horlogerie pour les pièces de mouvement ?",
    options: ["A0", "A1", "A2", "A3 ou A4"],
    correctAnswer: 3,
    explanation: "En horlogerie, les formats A3 et A4 sont les plus courants pour les pièces de mouvement, en raison de leur taille réduite."
  },
  {
    id: 8,
    question: "Que doit contenir le champ 'Méthode de projection' en Suisse ?",
    options: ["Méthode américaine (A)", "Méthode européenne (E)", "Méthode asiatique", "Projection isométrique"],
    correctAnswer: 1,
    explanation: "En Suisse et en Europe, la méthode européenne (E) ou projection du 1er dièdre est le standard."
  },
  {
    id: 9,
    question: "Quelle tolérance générale est souvent indiquée dans les cartouches horlogers ?",
    options: ["ISO 2768-c", "ISO 2768-m", "ISO 2768-f", "ISO 2768-v"],
    correctAnswer: 1,
    explanation: "ISO 2768-m (moyenne) est couramment utilisée en horlogerie, sauf pour les pièces nécessitant une précision fine (ISO 2768-f)."
  },
  {
    id: 10,
    question: "Combien de caractères sont recommandés pour le champ 'Titre' selon ISO 7200 ?",
    options: ["10-15", "15-20", "25-30", "40-50"],
    correctAnswer: 2,
    explanation: "ISO 7200 recommande 25 à 30 caractères pour le titre (30 pour les langues à caractères doubles comme le japonais)."
  },
  {
    id: 11,
    question: "Quel matériau horloger traditionnel est souvent indiqué dans le cartouche ?",
    options: ["Aluminium", "Maillechort", "Plastique", "Titane"],
    correctAnswer: 1,
    explanation: "Le maillechort (alliage cuivre-nickel-zinc) est un matériau traditionnel très utilisé en horlogerie pour les platines et ponts."
  },
  {
    id: 12,
    question: "À quoi sert le tableau de révision au-dessus du cartouche ?",
    options: ["Décoration", "Tracer l'historique des modifications", "Indiquer les tolérances", "Ajouter des notes"],
    correctAnswer: 1,
    explanation: "Le tableau de révision documente l'historique des modifications : indice, date, auteur, nature des changements."
  },
  {
    id: 13,
    question: "Quelle information n'est PAS obligatoire dans un cartouche selon ISO 7200 ?",
    options: ["Titre", "Auteur", "Masse", "Format"],
    correctAnswer: 2,
    explanation: "La masse est un champ conditionnel (C), pas obligatoire, bien qu'elle soit importante en horlogerie pour l'équilibrage."
  },
  {
    id: 14,
    question: "Quel traitement de surface est typique en horlogerie de luxe ?",
    options: ["Galvanisation", "Rhodiage", "Peinture", "Vernissage"],
    correctAnswer: 1,
    explanation: "Le rhodiage est un traitement de surface noble très utilisé en haute horlogerie pour protéger et embellir les pièces."
  },
  {
    id: 15,
    question: "Que signifie une échelle '5:1' sur un plan horloger ?",
    options: ["La pièce est 5 fois plus petite", "La pièce est 5 fois plus grande", "5 pièces identiques", "5 vues différentes"],
    correctAnswer: 1,
    explanation: "Une échelle 5:1 signifie que le dessin est 5 fois plus grand que la pièce réelle, nécessaire pour les composants miniatures horlogers."
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
      case 'Descriptif': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700';
      case 'Identification': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700';
      case 'Technique': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700';
      case 'Représentation': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700';
      case 'Document': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-700';
      case 'Administratif': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-700';
      case 'Gestion': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getObligationColor = (obligation: string) => {
    return obligation === 'Obligatoire' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-blue-600 dark:text-blue-400';
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
            Cartouche Horloger (Normes techniques)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ISO 7200 & ISO 5457 : identification et traçabilité des plans techniques
          </p>
        </div>

        {/* Interactive Cartouche Schema Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Schéma Interactif du Cartouche</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Cliquez sur un champ dans le schéma ou dans la liste ci-dessous pour voir ses détails.</p>
          
          {/* SVG Cartouche */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Position : Coin inférieur droit du plan (ISO 5457)</span>
            </div>
            <svg viewBox="0 0 410 100" className="w-full h-auto border-2 border-slate-300 dark:border-slate-600 rounded-lg">
              {/* Titre général */}
              <text x="205" y="-5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
                Cartouche d'inscription ISO 7200
              </text>
              
              {/* Cadre extérieur */}
              <rect x="0" y="0" width="410" height="100" fill="none" stroke="#1e293b" strokeWidth="2"/>
              
              {/* Champs interactifs */}
              {cartoucheFieldsData.map((field) => (
                <g key={field.id} onClick={() => handleFieldClick(field.id)} className="cursor-pointer">
                  <rect
                    x={field.x}
                    y={field.y}
                    width={field.width}
                    height={field.height}
                    fill={selectedField === field.id ? '#fde68a' : '#ffffff'}
                    stroke={selectedField === field.id ? '#f59e0b' : '#64748b'}
                    strokeWidth={selectedField === field.id ? 3 : 1}
                    className="transition-all duration-200"
                  />
                  <text
                    x={field.x + field.width / 2}
                    y={field.y + field.height / 2 + 4}
                    textAnchor="middle"
                    fontSize={field.width < 50 ? '7' : '9'}
                    fill={selectedField === field.id ? '#92400e' : '#334155'}
                    fontWeight={selectedField === field.id ? 'bold' : 'normal'}
                    className="pointer-events-none"
                  >
                    {field.name.length > 15 ? field.name.substring(0, 13) + '...' : field.name}
                  </text>
                  
                  {/* Indicateur O/C */}
                  <circle
                    cx={field.x + field.width - 8}
                    cy={field.y + 8}
                    r="6"
                    fill={field.obligation === 'Obligatoire' ? '#ef4444' : '#3b82f6'}
                    className="pointer-events-none"
                  />
                  <text
                    x={field.x + field.width - 8}
                    y={field.y + 11}
                    textAnchor="middle"
                    fontSize="8"
                    fill="white"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {field.obligation === 'Obligatoire' ? 'O' : 'C'}
                  </text>
                </g>
              ))}
              
              {/* Légende */}
              <g>
                <circle cx="15" cy="95" r="4" fill="#ef4444"/>
                <text x="22" y="98" fontSize="7" fill="#64748b">Obligatoire (O)</text>
                
                <circle cx="80" cy="95" r="4" fill="#3b82f6"/>
                <text x="87" y="98" fontSize="7" fill="#64748b">Conditionnel (C)</text>
              </g>
            </svg>
          </div>

          {/* Explanation Panel */}
          {selectedFieldData && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400 animate-fadeIn">
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
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description :</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{selectedFieldData.description}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre de caractères :</p>
                  <p className="text-slate-700 dark:text-slate-300">{selectedFieldData.characters}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Exemple horlogerie :</p>
                  <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-700 font-mono text-sm">
                    {selectedFieldData.example}
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 mt-3">Position dans le cartouche :</p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs">
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
                  selectedField === field.id ? 'border-blue-600 dark:border-blue-400 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800' : 'border-slate-200 dark:border-slate-700'
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
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{field.description}</p>
              </div>
            ))}
          </div>
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
                  <span>Oublier de renseigner les champs obligatoires (titre, auteur, date).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Ne pas mettre à jour l'indice de révision après modification.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Utiliser des abréviations non normalisées pour le matériau.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Placer le cartouche ailleurs qu'en bas à droite.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Omettre la méthode de projection (symbole E/A).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                  <span>Ne pas spécifier les tolérances générales applicables.</span>
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
                  <span>Remplir systématiquement tous les champs obligatoires (O) selon ISO 7200.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Utiliser des désignations normalisées pour les matériaux horlogers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Indiquer clairement les tolérances générales (ISO 2768-m ou f).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Maintenir un tableau de révision au-dessus du cartouche.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Préciser les traitements de surface spécifiques (rhodiage, anglage, etc.).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Respecter les marges ISO 5457 pour archivage et pliage.</span>
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
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">🎉 Parfait ! Tu maîtrises les cartouches techniques !</p>
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
            {/* ISO 7200 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 7200:2004</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-400 font-semibold mb-3">Champs de données dans les cartouches</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme spécifie les <strong>champs de données</strong> à utiliser dans les cartouches d'inscription et les têtes de documents techniques. Elle définit les noms de champ, leur contenu et leur longueur pour faciliter les échanges de documents et assurer leur cohérence internationale.
              </p>
            </div>

            {/* ISO 5457 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                  <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO 5457:1999</h3>
                  <p className="text-sm text-green-800 dark:text-green-400 font-semibold mb-3">Formats et présentation des dessins</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Cette norme définit les <strong>formats de papier</strong>, les marges, les zones d'inscription et les cadres utilisés pour les plans techniques. Elle garantit la compatibilité, la reproductibilité et le pliage standardisé des documents.
              </p>
            </div>
          </div>
        </section>

        {/* Table: Formats ISO 5457 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Formats Normalisés ISO 5457</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Format</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Dimensions (mm)</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Marge minimale</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Usage horlogerie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">A4</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">210 × 297</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Pièces de mouvement, composants unitaires</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">A3</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">297 × 420</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ensembles de mouvement, platines complètes</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">A2</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">420 × 594</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">10 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Éclatés complexes, assemblages complets</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">A1</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">594 × 841</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">20 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Plans d'atelier, nomenclatures étendues</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-2xl text-blue-600 dark:text-blue-400">A0</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">841 × 1189</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">20 mm</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rarement utilisé en horlogerie</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Matériaux horlogers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Matériaux Horlogers Courants</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Désignation normalisée</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Nom courant</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Composition</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">CuNi18Zn20</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Maillechort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cu-Ni 18% - Zn 20%</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts, leviers</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">CuZn40</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Laiton</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Cu-Zn 40%</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Roues, pignons, platines</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">X5CrNi18-10 (316L)</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Acier inoxydable</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Acier austénitique</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Axes, visserie, boîtiers</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Glucydur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Glucydur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Alliage Cu-Be</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Balanciers (antimagnétique)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Nivaflex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Nivaflex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Alliage Ni-Cr-Co-Ti-Be</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Spiraux (antimagnétique)</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Rubis synthétique</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rubis</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Corindon Al₂O₃</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Paliers, contre-pivots</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table: Traitements de surface */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Traitements de Surface Horlogers</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Traitement</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Objectif</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Rhodiage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dépôt électrolytique de rhodium</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Protection, aspect blanc brillant</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts de luxe</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Anglage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Polissage des arêtes à 45°</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique haute horlogerie</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ponts, leviers, bascules</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Perlage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Motif circulaire décoratif</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique, finition noble</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Platines, ponts</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Côtes de Genève</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Rayures parallèles ondulées</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Finition traditionnelle genevoise</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ponts, masses oscillantes</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">PVD</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dépôt physique en phase vapeur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Dureté, résistance, couleur</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Boîtiers, composants sportifs</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Satinage</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Finition mate directionnelle</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Esthétique, anti-reflets</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Boîtiers, bracelets</td>
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
              "Le cartouche est la carte d'identité du plan technique : précision et traçabilité garanties."
            </blockquote>
            <p className="text-blue-100 dark:text-blue-200">— Principe fondamental ISO 7200</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Questions fréquentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quelle est la différence entre un champ obligatoire (O) et conditionnel (C) ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Un champ <strong>obligatoire (O)</strong> doit toujours être renseigné selon ISO 7200 (titre, auteur, date, format, etc.). Un champ <strong>conditionnel (C)</strong> n'est obligatoire que si l'information est pertinente pour le document (masse, traitement de surface, tolérance générale). En horlogerie, la masse et les traitements sont souvent considérés comme obligatoires de facto.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Comment gérer les révisions d'un plan technique ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Chaque modification doit être documentée dans un <strong>tableau de révision</strong> au-dessus du cartouche : <strong>Indice</strong> (A, B, C...), <strong>Date</strong>, <strong>Auteur</strong>, <strong>Nature de la modification</strong> (description concise), <strong>Visa</strong> (vérificateur). L'indice dans le cartouche principal doit être mis à jour. En production, seule la dernière révision est valide.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Pourquoi l'échelle est-elle souvent supérieure à 1:1 en horlogerie ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Les composants horlogers sont miniatures (pivots de 0.08 mm, rubis de 0.2 mm). Une échelle <strong>2:1, 5:1 ou même 10:1</strong> agrandit le dessin pour permettre une cotation lisible et précise. Le dessinateur peut ainsi spécifier des tolérances de l'ordre du micromètre. L'échelle réelle doit toujours être clairement indiquée dans le cartouche.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Quelles tolérances générales indiquer dans le cartouche horloger ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  En horlogerie, on utilise généralement <strong>ISO 2768-m</strong> (moyenne) ou <strong>ISO 2768-f</strong> (fine) pour les pièces de précision. Ces normes définissent les tolérances linéaires et angulaires pour les cotes non tolérancées individuellement. Pour les mouvements haut de gamme, ISO 2768-f est préférable. Les cotes critiques doivent toujours avoir des tolérances spécifiques.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex justify-between items-center">
                Peut-on personnaliser le cartouche selon l'entreprise ?
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  Oui, les entreprises peuvent créer des <strong>cartouches personnalisés</strong> tant que les <strong>champs obligatoires ISO 7200</strong> sont présents et que le cartouche reste en <strong>bas à droite</strong>. La plupart des manufactures horlogères suisses ont un modèle standardisé incluant leur logo, des champs spécifiques (n° de calibre, série, client) et des zones pour validation qualité. Le respect des normes ISO garantit néanmoins l'interchangeabilité des documents.
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
                href="https://www.iso.org/standard/35446.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors"
              >
                Consulter ISO 7200
              </a>
              <a 
                href="https://www.iso.org/standard/5281.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors"
              >
                Consulter ISO 5457
              </a>
            </div>
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
