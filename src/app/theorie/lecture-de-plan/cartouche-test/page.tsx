'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText, 
  Search, Filter, Download, Maximize2, Minimize2, Trophy,
  Zap, Target, Star, Clock, TrendingUp, ChevronDown, ChevronUp,
  Sparkles, Flame, Shield, Crown, BookOpen, Brain, PlayCircle,
  PauseCircle, RotateCcw, AlertCircle, Info, HelpCircle, X
} from 'lucide-react'

// ============= INTERFACES =============
interface CartoucheField {
  id: string;
  name: string;
  category: string;
  obligation: string;
  description: string;
  example: string;
  characters: string;
  importance: number;
  tips?: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category: string;
  points: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedQuizzes: number;
  totalScore: number;
  achievements: Achievement[];
  fieldsLearned: string[];
  streak: number;
  lastVisit: string;
}

// ============= DONNÉES =============
const cartoucheFieldsData: CartoucheField[] = [
  {
    id: 'entreprise',
    name: 'Nom de l\'entreprise',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Raison sociale de l\'entreprise ou logo officiel. Ce champ identifie le propriétaire du dessin et peut inclure des informations de contact.',
    example: 'Manufacture Horlogère SA / Patek Philippe / Rolex',
    characters: '30 caractères max',
    importance: 5,
    tips: 'Utilisez toujours le nom légal complet. Le logo peut remplacer ou compléter le nom.'
  },
  {
    id: 'titre',
    name: 'Titre',
    category: 'Descriptif',
    obligation: 'Obligatoire',
    description: 'Désignation claire et normalisée de la pièce ou de l\'ensemble. Doit permettre une identification immédiate sans ambiguïté.',
    example: 'Platine calibre 2824-2 / Pont de balancier / Roue d\'échappement',
    characters: '25-30 caractères',
    importance: 5,
    tips: 'Soyez précis et concis. Évitez les abréviations non standardisées.'
  },
  {
    id: 'numero-piece',
    name: 'Numéro de pièce',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Référence unique de la pièce dans le système de gestion. Permet la traçabilité complète dans la production.',
    example: 'P-2824-001-A / MB-453-12 / CAL-3135-PLT',
    characters: '15-20 caractères',
    importance: 5,
    tips: 'Respectez le système de codification de votre entreprise. Incluez version et révision.'
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première selon nomenclature normalisée. Essentiel pour déterminer les propriétés mécaniques et les traitements possibles.',
    example: 'Maillechort / Laiton CuZn40 / Acier inox 316L / Silicium',
    characters: '20 caractères',
    importance: 4,
    tips: 'Utilisez les désignations normalisées ISO ou DIN. Précisez le grade si nécessaire.'
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Traitements thermiques, revêtements, finitions spéciales appliqués à la pièce. Important pour l\'esthétique et la durabilité.',
    example: 'Rhodiage / Anglage / Perlage / PVD / Côtes de Genève',
    characters: '30 caractères',
    importance: 3,
    tips: 'Spécifiez l\'ordre des traitements si plusieurs sont appliqués.'
  },
  {
    id: 'masse',
    name: 'Masse',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Poids théorique de la pièce. Critique en horlogerie pour l\'équilibrage et l\'inertie des composants mobiles.',
    example: '0.45 g / 2.3 g / 0.125 g',
    characters: '10 caractères',
    importance: 3,
    tips: 'Indiquez la tolérance si critique pour le fonctionnement.'
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Rapport entre dimensions du dessin et dimensions réelles. Les pièces horlogères sont souvent représentées à échelle agrandie.',
    example: '1:1 / 2:1 / 5:1 / 10:1 / 20:1',
    characters: '10 caractères',
    importance: 5,
    tips: 'En horlogerie, utilisez 5:1 ou 10:1 pour les petites pièces.'
  },
  {
    id: 'tolerance-generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Tolérances applicables aux cotes non tolérancées individuellement. Définit le niveau de précision général.',
    example: 'ISO 2768-m / ±0.1 mm / ±0.05 mm / ±0.02 mm',
    characters: '20 caractères',
    importance: 4,
    tips: 'En horlogerie, utilisez des tolérances serrées (fine ou medium).'
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la projection européenne (E - 1er dièdre) ou américaine (A - 3ème dièdre).',
    example: 'Symbole E (Europe, Suisse) / Symbole A (USA)',
    characters: 'Symbole graphique',
    importance: 5,
    tips: 'En Suisse et Europe: toujours projection E (1er dièdre).'
  },
  {
    id: 'format',
    name: 'Format',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Format du plan selon ISO 5457 (série A). Détermine la taille physique du document.',
    example: 'A4 (210×297) / A3 (297×420) / A2 (420×594)',
    characters: '4 caractères',
    importance: 4,
    tips: 'A4 pour pièces unitaires, A3 pour ensembles.'
  },
  {
    id: 'indice',
    name: 'Indice de révision',
    category: 'Gestion',
    obligation: 'Obligatoire',
    description: 'Version du document. Crucial pour la gestion des modifications et la traçabilité.',
    example: 'A / B / C / Rev.1 / Rev.2 / V1.0',
    characters: '4 caractères',
    importance: 5,
    tips: 'Commencez par A, incrémentez à chaque modification. Documentez les changements.'
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin. Responsabilité technique.',
    example: 'J. Dupont / JD / Jean Dupont',
    characters: '20 caractères',
    importance: 4,
    tips: 'Utilisez un format cohérent dans toute l\'entreprise.'
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant vérifié et validé le dessin. Contrôle qualité.',
    example: 'M. Martin / MM / Marie Martin',
    characters: '20 caractères',
    importance: 4,
    tips: 'Le vérificateur doit être différent du dessinateur.'
  },
  {
    id: 'date',
    name: 'Date',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière modification. Format selon convention locale.',
    example: '17.10.2025 / 2025-10-17 / 17/10/2025',
    characters: '10 caractères',
    importance: 4,
    tips: 'Utilisez format ISO 8601 (YYYY-MM-DD) pour éviter ambiguïtés internationales.'
  }
];

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle norme ISO régit les champs de données dans les cartouches d'inscription ?",
    options: ["ISO 5457", "ISO 7200", "ISO 128-1", "ISO 1101"],
    correctAnswer: 1,
    explanation: "La norme ISO 7200:2004 spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques.",
    difficulty: 'moyen',
    category: 'Normes',
    points: 10
  },
  {
    id: 2,
    question: "Où doit obligatoirement se situer le cartouche sur un plan technique ?",
    options: ["En haut à gauche", "En bas à gauche", "En haut à droite", "En bas à droite"],
    correctAnswer: 3,
    explanation: "Selon ISO 5457, le cartouche doit obligatoirement se situer dans le coin inférieur droit du document, dans le sens de lecture.",
    difficulty: 'facile',
    category: 'Positionnement',
    points: 5
  },
  {
    id: 3,
    question: "Quelle est la dimension maximale de la zone d'identification selon ISO 7200 ?",
    options: ["100 mm", "120 mm", "170 mm", "210 mm"],
    correctAnswer: 2,
    explanation: "La zone d'identification du cartouche doit avoir une longueur maximale de 170 mm selon ISO 7200.",
    difficulty: 'difficile',
    category: 'Dimensions',
    points: 15
  },
  {
    id: 4,
    question: "Quelle méthode de projection est utilisée en Suisse et en Europe ?",
    options: ["3ème dièdre (A)", "1er dièdre (E)", "2ème dièdre", "Projection isométrique"],
    correctAnswer: 1,
    explanation: "En Europe et en Suisse, on utilise la projection du 1er dièdre (symbole E), contrairement aux USA qui utilisent le 3ème dièdre.",
    difficulty: 'facile',
    category: 'Projection',
    points: 5
  },
  {
    id: 5,
    question: "Quel format est recommandé pour les pièces unitaires de mouvement ?",
    options: ["A0", "A1", "A2", "A4"],
    correctAnswer: 3,
    explanation: "Le format A4 (210×297 mm) est généralement utilisé pour les pièces unitaires et composants de mouvement.",
    difficulty: 'facile',
    category: 'Formats',
    points: 5
  },
  {
    id: 6,
    question: "Quelle tolérance générale est courante en horlogerie de précision ?",
    options: ["ISO 2768-c (grossière)", "ISO 2768-m (moyenne)", "ISO 2768-f (fine)", "Aucune tolérance"],
    correctAnswer: 2,
    explanation: "En horlogerie, on utilise généralement ISO 2768-f (fine) voire des tolérances encore plus serrées pour garantir la précision.",
    difficulty: 'moyen',
    category: 'Tolérances',
    points: 10
  },
  {
    id: 7,
    question: "Combien de caractères maximum pour le nom de l'entreprise ?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 2,
    explanation: "Le champ 'Nom de l'entreprise' est limité à 30 caractères maximum selon les standards.",
    difficulty: 'facile',
    category: 'Champs',
    points: 5
  },
  {
    id: 8,
    question: "Quel champ est conditionnel et non obligatoire ?",
    options: ["Titre", "Échelle", "Traitement de surface", "Date"],
    correctAnswer: 2,
    explanation: "Le traitement de surface est un champ conditionnel, obligatoire uniquement si un traitement est appliqué à la pièce.",
    difficulty: 'moyen',
    category: 'Obligations',
    points: 10
  },
  {
    id: 9,
    question: "Quelle échelle est typique pour dessiner une petite pièce horlogère ?",
    options: ["1:2 (réduction)", "1:1 (réelle)", "5:1 (agrandissement)", "1:10 (réduction)"],
    correctAnswer: 2,
    explanation: "Les petites pièces horlogères sont souvent dessinées à échelle 5:1 ou 10:1 pour permettre une lecture claire des détails.",
    difficulty: 'moyen',
    category: 'Échelles',
    points: 10
  },
  {
    id: 10,
    question: "Que signifie l'indice de révision 'C' sur un plan ?",
    options: ["Premier dessin", "Deuxième modification", "Troisième modification", "Dessin annulé"],
    correctAnswer: 2,
    explanation: "L'indice C indique la troisième version du document (A=première, B=deuxième, C=troisième).",
    difficulty: 'facile',
    category: 'Gestion',
    points: 5
  }
];

const faqData = [
  {
    id: 1,
    question: "Pourquoi le cartouche est-il toujours en bas à droite ?",
    answer: "Cette position normalisée (ISO 5457) garantit que le cartouche reste visible même lorsque le plan est plié selon les normes. C'est aussi la zone qui reste visible lors du classement dans un système de gestion documentaire.",
    category: "Positionnement"
  },
  {
    id: 2,
    question: "Quelle différence entre champ obligatoire et conditionnel ?",
    answer: "Un champ obligatoire (O) doit TOUJOURS être rempli. Un champ conditionnel (C) n'est obligatoire que si l'information est pertinente (ex: traitement de surface uniquement si la pièce reçoit un traitement).",
    category: "Obligations"
  },
  {
    id: 3,
    question: "Puis-je utiliser mon propre format de cartouche ?",
    answer: "Oui, tant que vous respectez les exigences minimales ISO 7200 concernant les champs obligatoires. Cependant, il est recommandé de suivre strictement les normes pour faciliter les échanges avec d'autres entreprises.",
    category: "Normes"
  },
  {
    id: 4,
    question: "Comment gérer les révisions de plans ?",
    answer: "Incrémentez l'indice (A→B→C...) à chaque modification. Documentez les changements dans un tableau de révisions séparé. Archivez toutes les versions pour traçabilité.",
    category: "Gestion"
  },
  {
    id: 5,
    question: "Quelle police de caractères utiliser ?",
    answer: "ISO 3098 recommande des polices techniques lisibles. En pratique: Arial, Helvetica ou polices ISO normalisées. Taille minimale: 2.5mm pour assurer la lisibilité après reproduction.",
    category: "Typographie"
  },
  {
    id: 6,
    question: "Comment indiquer plusieurs matériaux ?",
    answer: "Pour un assemblage, indiquez le matériau principal dans le cartouche et détaillez les autres matériaux dans une nomenclature séparée ou des notes techniques.",
    category: "Matériaux"
  }
];

// ============= COMPOSANTS UTILITAIRES =============
const ProgressBar = ({ value, max, color = 'blue', showLabel = true }: any) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">{value} / {max}</span>
          <span className="text-gray-500">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-600`}
        />
      </div>
    </div>
  );
};

const Badge = ({ icon, text, color, glow = false }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium
      ${glow ? `shadow-lg shadow-${color}-500/50` : ''} 
      bg-gradient-to-r from-${color}-400 to-${color}-600 text-white`}
  >
    {icon}
    <span>{text}</span>
  </motion.div>
);

const Tooltip = ({ children, content, position = 'top' }: any) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-xl
              ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} 
              left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
          >
            {content}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45
              ${position === 'top' ? 'bottom-0 translate-y-1' : 'top-0 -translate-y-1'}`} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= NAVIGATION =============
const Navigation = ({ currentSection, onSectionChange, darkMode, userProgress }: any) => {
  const sections = [
    { id: 'champs', label: 'Champs', icon: <FileText className="w-4 h-4" /> },
    { id: 'cartouche', label: 'Cartouche', icon: <Book className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <Brain className="w-4 h-4" /> },
    { id: 'tableaux', label: 'Tableaux', icon: <Target className="w-4 h-4" /> },
    { id: 'memo', label: 'Mémo', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'normes', label: 'Normes', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all
      ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Cartouches Horlogers
              </h1>
              <p className="text-xs text-gray-500">Formation interactive ISO</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex space-x-2">
            {sections.map((section) => (
              <Tooltip key={section.id} content={section.label}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                    ${currentSection === section.id
                      ? darkMode
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-blue-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {section.icon}
                  <span className="hidden lg:inline">{section.label}</span>
                </button>
              </Tooltip>
            ))}
          </div>

          {/* User Progress Badge */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Niveau {userProgress.level}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userProgress.streak}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex space-x-2 overflow-x-auto pb-3 hide-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap
                ${currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-gray-300 bg-gray-800'
                  : 'text-gray-600 bg-gray-100'
                }`}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ============= CARTOUCHE INTERACTIF =============
const InteractiveCartouche = ({ darkMode, selectedField, setSelectedField }: any) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'Descriptif': darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200',
      'Identification': darkMode ? 'bg-purple-900/30 text-purple-400 border-purple-700' : 'bg-purple-100 text-purple-600 border-purple-200',
      'Technique': darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-100 text-green-600 border-green-200',
      'Représentation': darkMode ? 'bg-orange-900/30 text-orange-400 border-orange-700' : 'bg-orange-100 text-orange-600 border-orange-200',
      'Document': darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' : 'bg-cyan-100 text-cyan-600 border-cyan-200',
      'Administratif': darkMode ? 'bg-pink-900/30 text-pink-400 border-pink-700' : 'bg-pink-100 text-pink-600 border-pink-200',
      'Gestion': darkMode ? 'bg-amber-900/30 text-amber-400 border-amber-700' : 'bg-amber-100 text-amber-600 border-amber-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const CartoucheButton = ({ field }: any) => (
    <Tooltip content={`${field.name} - ${field.obligation}`}>
      <motion.button
        onClick={() => setSelectedField(field.id)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`p-3 rounded-xl transition-all text-left relative overflow-hidden group
          ${selectedField === field.id
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/50'
            : darkMode
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-gray-100 hover:bg-gray-200'
          }`}
      >
        {/* Animated background */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
          bg-gradient-to-br from-blue-400/20 to-purple-400/20`} 
        />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-1">
            <span className={`text-xs font-semibold line-clamp-2
              ${selectedField === field.id ? 'text-white' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}
            >
              {field.name}
            </span>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0
              ${field.obligation === 'Obligatoire' 
                ? 'bg-red-500 text-white' 
                : 'bg-blue-500 text-white'
              }`}
            >
              {field.obligation === 'Obligatoire' ? 'O' : 'C'}
            </span>
          </div>
          
          {/* Importance indicator */}
          <div className="flex gap-1 mt-2">
            {[...Array(field.importance)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-1 rounded-full 
                  ${selectedField === field.id ? 'bg-white' : 'bg-yellow-400'}`}
              />
            ))}
          </div>
        </div>
      </motion.button>
    </Tooltip>
  );

  return (
    <div className={`min-h-screen pt-6 pb-12 px-4 sm:px-6 ${fullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}`}>
      <div className={`${fullscreen ? 'h-full' : 'max-w-7xl'} mx-auto`}>
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Schéma Interactif du Cartouche
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explorez les {cartoucheFieldsData.length} champs normalisés • Cliquez pour découvrir
            </p>
          </motion.div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 rounded-lg transition-colors
                ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Info className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className={`p-2 rounded-lg transition-colors
                ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {fullscreen ? (
                <Minimize2 className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              ) : (
                <Maximize2 className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cartouche Schema */}
          <motion.div
            layout
            className={`rounded-2xl p-6 shadow-2xl border-2
              ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'}`}
          >
            <div className="mb-4 flex items-center justify-center">
              <span className={`text-sm font-medium px-4 py-2 rounded-full
                ${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}
              >
                📍 Position : Coin inférieur droit (ISO 5457)
              </span>
            </div>

            <div className={`rounded-xl p-4 border-2
              ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <div className="grid gap-2" style={{
                gridTemplateColumns: 'repeat(6, 1fr)',
                gridTemplateRows: 'auto auto auto'
              }}>
                {/* Row 1 */}
                <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'entreprise')} />
                </div>
                <div style={{ gridColumn: '3 / 6', gridRow: '1' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'titre')} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '1' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'numero-piece')} />
                </div>

                {/* Row 2 */}
                <div style={{ gridColumn: '3', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'materiau')} />
                </div>
                <div style={{ gridColumn: '4', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'traitement')} />
                </div>
                <div style={{ gridColumn: '5', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'masse')} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'echelle')} />
                </div>

                {/* Row 3 */}
                <div style={{ gridColumn: '1', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'dessinateur')} />
                </div>
                <div style={{ gridColumn: '2', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'verificateur')} />
                </div>
                <div style={{ gridColumn: '3', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'tolerance-generale')} />
                </div>
                <div style={{ gridColumn: '4', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'projection')} />
                </div>
                <div style={{ gridColumn: '5', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'format')} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'indice')} />
                </div>
                <div style={{ gridColumn: '1', gridRow: '4' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'date')} />
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Obligatoire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">C</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conditionnel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    ))}
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Importance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Panel */}
          <AnimatePresence mode="wait">
            {showDetails && selectedFieldData && (
              <motion.div
                key={selectedFieldData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`rounded-2xl p-6 shadow-xl border-l-4 border-blue-500
                  ${darkMode ? 'bg-gradient-to-br from-blue-950/50 to-purple-950/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedFieldData.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFieldData.category)}`}>
                          {selectedFieldData.category}
                        </span>
                        <span className={`text-sm font-bold ${selectedFieldData.obligation === 'Obligatoire' ? 'text-red-500' : 'text-blue-500'}`}>
                          {selectedFieldData.obligation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Importance Stars */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Importance:
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < selectedFieldData.importance ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                  <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    📝 Description :
                  </p>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedFieldData.description}
                  </p>
                </div>

                {/* Example */}
                <div className={`p-4 rounded-lg mb-4 border-2 ${darkMode ? 'bg-gray-800 border-green-700' : 'bg-green-50 border-green-200'}`}>
                  <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    💡 Exemple horlogerie :
                  </p>
                  <p className={`font-mono text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                    {selectedFieldData.example}
                  </p>
                </div>

                {/* Tips */}
                {selectedFieldData.tips && (
                  <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          Conseil professionnel :
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                          {selectedFieldData.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Character Limit */}
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📏 Limite de caractères :
                  </span>
                  <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFieldData.characters}
                  </span>
                </div>
              </motion.div>
            )}

            {showDetails && !selectedFieldData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center
                  ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sélectionnez un champ
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Cliquez sur un champ du cartouche pour découvrir ses détails, exemples et conseils professionnels
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ============= LISTE DES CHAMPS =============
const FieldsExplorer = ({ darkMode, setSelectedField, onSectionChange }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Toutes');
  const [filterObligation, setFilterObligation] = useState('Tous');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['Toutes', ...Array.from(new Set(cartoucheFieldsData.map(f => f.category)))];
  
  const filteredFields = cartoucheFieldsData
    .filter(field => {
      const matchSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = filterCategory === 'Toutes' || field.category === filterCategory;
      const matchObligation = filterObligation === 'Tous' || field.obligation === filterObligation;
      return matchSearch && matchCategory && matchObligation;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'importance') return b.importance - a.importance;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'Descriptif': darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200',
      'Identification': darkMode ? 'bg-purple-900/30 text-purple-400 border-purple-700' : 'bg-purple-100 text-purple-600 border-purple-200',
      'Technique': darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-100 text-green-600 border-green-200',
      'Représentation': darkMode ? 'bg-orange-900/30 text-orange-400 border-orange-700' : 'bg-orange-100 text-orange-600 border-orange-200',
      'Document': darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' : 'bg-cyan-100 text-cyan-600 border-cyan-200',
      'Administratif': darkMode ? 'bg-pink-900/30 text-pink-400 border-pink-700' : 'bg-pink-100 text-pink-600 border-pink-200',
      'Gestion': darkMode ? 'bg-amber-900/30 text-amber-400 border-amber-700' : 'bg-amber-100 text-amber-600 border-amber-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Tous les Champs de Données
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredFields.length} champs • Conformes ISO 7200:2004
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className={`mb-6 p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Rechercher un champ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                  ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Obligation Filter */}
            <select
              value={filterObligation}
              onChange={(e) => setFilterObligation(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            >
              <option value="Tous">Tous les types</option>
              <option value="Obligatoire">Obligatoire</option>
              <option value="Conditionnel">Conditionnel</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            >
              <option value="name">Trier par nom</option>
              <option value="importance">Trier par importance</option>
              <option value="category">Trier par catégorie</option>
            </select>
          </div>
        </div>

        {/* Fields Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredFields.map((field, index) => (
              <motion.div
                key={field.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedField(field.id);
                  onSectionChange('cartouche');
                }}
                className={`group rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1
                  ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(field.category)}`}>
                    {field.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${field.obligation === 'Obligatoire' ? 'text-red-500' : 'text-blue-500'}`}>
                      {field.obligation === 'Obligatoire' ? 'O' : 'C'}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BookOpen className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-500 transition-colors`} />
                    </motion.div>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {field.name}
                </h3>

                {/* Description */}
                <p className={`text-sm line-clamp-3 mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {field.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1">
                    {[...Array(field.importance)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className={`text-xs font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {field.characters}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFields.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          >
            <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Aucun résultat trouvé
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============= QUIZ SECTION =============
const QuizSection = ({ darkMode, onQuizComplete }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  useEffect(() => {
  if (!quizStarted || isPaused || showResult) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        handleNextQuestion();
        return 30;
      }
      return prev - 1; // ← ajoute ça pour éviter un retour vide
    });
  }, 1000);

    return () => clearInterval(timer);
}, [quizStarted, isPaused, showResult, currentQuestion]);
 
  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    if (index === question.correctAnswer) {
      setScore(score + question.points);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
      onQuizComplete?.(Math.round((score / quizData.reduce((sum, q) => sum + q.points, 0)) * 100), quizData.length);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'facile': return 'bg-green-500';
      case 'moyen': return 'bg-yellow-500';
      case 'difficile': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl shadow-2xl p-8 border text-center
              ${darkMode ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quiz Cartouches Horlogers
            </h1>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Testez vos connaissances sur les normes ISO des cartouches techniques
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-3xl font-bold text-blue-500 mb-2">{quizData.length}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Questions</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-3xl font-bold text-green-500 mb-2">30s</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Par question</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-3xl font-bold text-purple-500 mb-2">{quizData.reduce((sum, q) => sum + q.points, 0)}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Points max</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
            >
              <PlayCircle className="w-6 h-6" />
              Commencer le Quiz
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResult) {
    const maxPoints = quizData.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxPoints) * 100);
    
    return (
      <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl shadow-2xl p-8 border text-center
              ${darkMode ? 'bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-700' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quiz Terminé !
            </h2>

            <div className={`text-6xl font-bold mb-6 ${
              percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {percentage}%
            </div>

            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Vous avez obtenu <span className="font-bold text-blue-500">{score}</span> sur <span className="font-bold">{maxPoints}</span> points
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {answeredQuestions.length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Réponses</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {percentage >= 80 ? 'Expert' : percentage >= 60 ? 'Confirmé' : 'Débutant'}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Niveau</div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {score}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Points XP</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Recommencer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz Question
  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Question {currentQuestion + 1} / {quizData.length}
            </span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className={`rounded-2xl shadow-2xl p-8 border
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border
                ${darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200'}`}
              >
                {question.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white`}>
                +{question.points} pts
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border
                ${timeLeft <= 10 ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-700' : darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              >
                <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-500' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {timeLeft}s
                </span>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isPaused ? (
                  <PlayCircle className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                ) : (
                  <PauseCircle className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Question */}
          <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showFeedback = selectedAnswer !== null;

              return (
                <motion.button
                  key={index}
                  whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium
                    ${showFeedback
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500'
                        : isSelected
                        ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                        : darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                      : darkMode
                      ? 'bg-gray-700 border-gray-600 hover:border-blue-500 hover:bg-gray-600'
                      : 'bg-gray-50 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={showFeedback && isCorrect ? 'text-green-700 dark:text-green-300' : showFeedback && isSelected ? 'text-red-700 dark:text-red-300' : darkMode ? 'text-gray-200' : 'text-gray-900'}>
                      {option}
                    </span>
                    {showFeedback && isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl border-l-4
                  ${selectedAnswer === question.correctAnswer
                    ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500'
                    : 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selectedAnswer === question.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`} />
                  <div>
                    <p className={`font-bold mb-1 ${selectedAnswer === question.correctAnswer ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
                      {selectedAnswer === question.correctAnswer ? '✓ Bonne réponse !' : 'ℹ Explication'}
                    </p>
                    <p className={`text-sm ${selectedAnswer === question.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 rounded-xl p-4 border text-center
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex items-center justify-center gap-6">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score actuel</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {score} pts
              </p>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progression</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {answeredQuestions.length} / {quizData.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============= SECTIONS SIMPLES AMÉLIORÉES =============
const TablesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Formats Normalisés ISO 5457
        </h1>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Dimensions standards des plans techniques horlogers
        </p>
      </motion.div>

      <div className={`rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
          <h3 className="text-xl font-bold text-white">Série A - Formats Standards</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Format</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dimensions (mm)</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Marge minimale</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Usage en horlogerie</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Popularité</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {[
                { format: 'A4', dims: '210 × 297', marge: '10 mm', usage: 'Pièces unitaires de mouvement, composants détaillés', pop: 90 },
                { format: 'A3', dims: '297 × 420', marge: '10 mm', usage: 'Ensembles de mouvement, platines complètes', pop: 80 },
                { format: 'A2', dims: '420 × 594', marge: '10 mm', usage: 'Mouvements complets, boîtes de montre', pop: 40 },
                { format: 'A1', dims: '594 × 841', marge: '20 mm', usage: 'Assemblages complexes, nomenclatures détaillées', pop: 20 },
                { format: 'A0', dims: '841 × 1189', marge: '20 mm', usage: 'Installations de production, plans d\'atelier', pop: 10 },
              ].map((row, i) => (
                <motion.tr
                  key={row.format}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`transition-colors ${darkMode ? 'hover:bg-blue-950/30' : 'hover:bg-blue-50'}`}
                >
                  <td className={`px-6 py-4 font-bold text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {row.format}
                  </td>
                  <td className={`px-6 py-4 font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {row.dims}
                  </td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {row.marge}
                  </td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {row.usage}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${row.pop}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                        />
                      </div>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {row.pop}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl p-6 border ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Zone du cartouche
              </h3>
              <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                ISO 7200:2004
              </p>
            </div>
          </div>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Longueur maximale : 170 mm
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Hauteur typique : 50-60 mm
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Position : coin inférieur droit
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-xl p-6 border ${darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-800' : 'bg-green-100'}`}>
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recommandations horlogerie
              </h3>
              <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                Pratiques industrielles
              </p>
            </div>
          </div>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Privilégier A4 pour pièces simples
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              A3 pour assemblages complexes
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Marges adaptées au pliage
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
);

const MemoSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Mémo Technique
        </h1>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Points clés pour créer des cartouches parfaits
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Erreurs fréquentes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-2xl p-6 border-2 shadow-xl ${darkMode ? 'bg-red-950/30 border-red-800' : 'bg-red-50 border-red-300'}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <XCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-red-300' : 'text-red-900'}`}>
              ❌ Erreurs fréquentes
            </h3>
          </div>
          
          <ul className="space-y-4">
            {[
              'Oublier de renseigner les champs obligatoires (O)',
              'Ne pas mettre à jour l\'indice de révision lors de modifications',
              'Utiliser des abréviations non standardisées',
              'Ne pas respecter les limites de caractères',
              'Omettre la tolérance générale',
              'Confusion entre projection E et A',
              'Cartouche mal positionné (pas en bas à droite)',
              'Oublier la signature du vérificateur'
            ].map((error, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-600'}`}>•</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Bonnes pratiques */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-2xl p-6 border-2 shadow-xl ${darkMode ? 'bg-green-950/30 border-green-800' : 'bg-green-50 border-green-300'}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
              ✓ Bonnes pratiques
            </h3>
          </div>
          
          <ul className="space-y-4">
            {[
              'Remplir TOUS les champs obligatoires avant validation',
              'Utiliser des désignations normalisées (ISO, DIN)',
              'Documenter chaque révision dans un tableau dédié',
              'Vérifier la cohérence entre titre et numéro de pièce',
              'Indiquer l\'échelle adaptée (5:1 ou 10:1 pour petites pièces)',
              'Utiliser format ISO pour les dates (YYYY-MM-DD)',
              'Faire vérifier par une personne différente',
              'Archiver toutes les versions pour traçabilité'
            ].map((practice, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{practice}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Checklist rapide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`mt-6 rounded-2xl p-6 border-2 shadow-xl ${darkMode ? 'bg-blue-950/30 border-blue-800' : 'bg-blue-50 border-blue-300'}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
            ⚡ Checklist rapide avant validation
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Identification', items: ['Nom entreprise', 'Titre clair', 'Numéro unique'] },
            { title: 'Technique', items: ['Matériau spécifié', 'Échelle correcte', 'Tolérance définie'] },
            { title: 'Administratif', items: ['Date actuelle', 'Dessinateur signé', 'Vérificateur différent'] }
          ].map((section, i) => (
            <div key={i} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-blue-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const FAQSection = ({ darkMode }: any) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const categories = ['Toutes', ...Array.from(new Set(faqData.map(f => f.category)))];
  const filteredFAQ = selectedCategory === 'Toutes' 
    ? faqData 
    : faqData.filter(f => f.category === selectedCategory);

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Questions Fréquentes
          </h1>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Réponses aux questions courantes sur les cartouches techniques
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all
                ${selectedCategory === cat
                  ? 'bg-blue-500 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQ.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border-2 overflow-hidden transition-all
                  ${openId === faq.id
                    ? darkMode
                      ? 'bg-blue-950/30 border-blue-600'
                      : 'bg-blue-50 border-blue-400'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${openId === faq.id
                        ? 'bg-blue-500'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <HelpCircle className={`w-6 h-6 ${openId === faq.id ? 'text-white' : 'text-blue-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full
                        ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-6 pt-2 border-t
                        ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 rounded-2xl p-6 border-2 text-center
            ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}
        >
          <Info className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Consultez la documentation complète ISO 7200:2004 ou contactez votre référent technique
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const NormesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Normes & Références
        </h1>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Contexte et origines des normes ISO pour les cartouches techniques
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: 'ISO 7200:2004',
            subtitle: 'Champs de données dans les cartouches',
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            color: 'blue',
            points: [
              'Spécifie les champs de données obligatoires et conditionnels',
              'Définit l\'organisation du cartouche d\'inscription',
              'Standardise les informations administratives et techniques',
              'Garantit l\'interopérabilité entre entreprises',
              'Facilite l\'échange de documents techniques'
            ]
          },
          {
            title: 'ISO 5457:1999',
            subtitle: 'Formats et présentation des dessins',
            icon: <Book className="w-8 h-8 text-green-500" />,
            color: 'green',
            points: [
              'Définit les formats de papier normalisés (A0-A4)',
              'Spécifie les marges et zones d\'impression',
              'Établit le positionnement du cartouche',
              'Définit les cadres et repères de pliage',
              'Assure la lisibilité après pliage selon format A4'
            ]
          },
          {
            title: 'ISO 128-1',
            subtitle: 'Principes généraux de représentation',
            icon: <Target className="w-8 h-8 text-purple-500" />,
            color: 'purple',
            points: [
              'Méthodes de projection (1er et 3ème dièdre)',
              'Types de traits et leur signification',
              'Échelles de représentation normalisées',
              'Conventions de hachures et coupes',
              'Symboles graphiques standards'
            ]
          },
          {
            title: 'ISO 1101',
            subtitle: 'Tolérancement géométrique',
            icon: <Shield className="w-8 h-8 text-orange-500" />,
            color: 'orange',
            points: [
              'Symboles de tolérancement géométrique',
              'Spécifications de forme et position',
              'Références et systèmes de datums',
              'Tolérances de localisation',
              'Critique pour la précision horlogère'
            ]
          }
        ].map((norm, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border-2 shadow-xl
              ${darkMode ? `bg-${norm.color}-950/20 border-${norm.color}-800` : `bg-${norm.color}-50 border-${norm.color}-200`}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${darkMode ? `bg-${norm.color}-900/50` : `bg-${norm.color}-100`}`}>
                {norm.icon}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {norm.title}
                </h3>
                <p className={`text-sm font-semibold ${darkMode ? `text-${norm.color}-400` : `text-${norm.color}-700`}`}>
                  {norm.subtitle}
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {norm.points.map((point, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i * 0.1) + (j * 0.05) }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 text-${norm.color}-500`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`mt-8 rounded-2xl p-6 border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          📅 Chronologie des normes
        </h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
          
          <div className="space-y-6">
            {[
              { year: '1999', event: 'Publication ISO 5457 - Formats de dessins techniques' },
              { year: '2001', event: 'Révision ISO 128-1 - Principes généraux' },
              { year: '2004', event: 'Publication ISO 7200 - Cartouches d\'inscription' },
              { year: '2017', event: 'Dernière révision ISO 1101 - Tolérancement' },
              { year: '2025', event: 'Standards actuellement en vigueur dans l\'industrie' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="relative pl-12"
              >
                <div className="absolute left-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-bold text-blue-500">{item.year}</span>
                  </div>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ============= MAIN COMPONENT =============
export default function Page() {
  const [currentSection, setCurrentSection] = useState<SectionType>('champs')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    completedQuizzes: 0,
    totalScore: 0,
    achievements: [
      { id: 'first-visit', name: 'Première visite', description: 'Commencez votre formation', icon: <Star className="w-5 h-5" />, unlocked: true, progress: 1, maxProgress: 1 },
      { id: 'quiz-master', name: 'Maître du quiz', description: 'Réussissez le quiz avec 100%', icon: <Trophy className="w-5 h-5" />, unlocked: false, progress: 0, maxProgress: 1 },
      { id: 'expert', name: 'Expert certifié', description: 'Obtenez 80% ou plus au quiz', icon: <Crown className="w-5 h-5" />, unlocked: false, progress: 0, maxProgress: 1 },
      { id: 'explorer', name: 'Explorateur', description: 'Visitez toutes les sections', icon: <Sparkles className="w-5 h-5" />, unlocked: false, progress: 0, maxProgress: 7 }
    ],
    fieldsLearned: [],
    streak: 1,
    lastVisit: new Date().toISOString()
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('cartouche-theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('cartouche-progress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('cartouche-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    // Save progress
    localStorage.setItem('cartouche-progress', JSON.stringify(userProgress))
  }, [userProgress])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleQuizComplete = (score: number, completedQuestions: number) => {
    const newXP = userProgress.xp + score;
    const newLevel = Math.floor(newXP / 100) + 1;
    const achievements = [...userProgress.achievements];

    // Update achievements
    if (score >= 80) {
      const expertIdx = achievements.findIndex(a => a.id === 'expert');
      if (expertIdx !== -1) {
        achievements[expertIdx].unlocked = true;
        achievements[expertIdx].progress = 1;
      }
    }
    if (score === 100) {
      const masterIdx = achievements.findIndex(a => a.id === 'quiz-master');
      if (masterIdx !== -1) {
        achievements[masterIdx].unlocked = true;
        achievements[masterIdx].progress = 1;
      }
    }

    setUserProgress({
      ...userProgress,
      level: newLevel,
      xp: newXP,
      xpToNextLevel: newLevel * 100,
      completedQuizzes: completedQuestions,
      totalScore: Math.max(userProgress.totalScore, score),
      achievements
    });
  };

  const renderSection = () => {
  const sections: Record<SectionType, JSX.Element> = {
    champs: <FieldsExplorer darkMode={darkMode} setSelectedField={setSelectedField} onSectionChange={setCurrentSection} />,
    cartouche: <InteractiveCartouche darkMode={darkMode} selectedField={selectedField} setSelectedField={setSelectedField} />,
    quiz: <QuizSection darkMode={darkMode} onQuizComplete={handleQuizComplete} />,
    tableaux: <TablesSection darkMode={darkMode} />,
    memo: <MemoSection darkMode={darkMode} />,
    faq: <FAQSection darkMode={darkMode} />,
    normes: <NormesSection darkMode={darkMode} />,
  }; // ✅
      return (
  <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    <Navigation
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      userProgress={userProgress}
      darkMode={darkMode}
    />

    <main className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>

      {renderSection()}
    </main>

    {/* Floating Action Buttons */}
<div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

  {/* Dark Mode Toggle */}
  <Tooltip content={darkMode ? "Mode clair" : "Mode sombre"}>
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
          : 'bg-gradient-to-br from-indigo-600 to-purple-700'
      }`}
    >
      {darkMode ? (
        <span className="text-2xl">☀️</span>
      ) : (
        <span className="text-2xl">🌙</span>
      )}
    </motion.button>
  </Tooltip>

  {/* Download Button */}
  <Tooltip content="Télécharger le même PDF">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-14 h-14 rounded-full shadow-2xl transition-all flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
          : 'bg-gradient-to-br from-blue-600 to-cyan-600'
      }`}
    >
      <Download className="w-6 h-6 text-white" />
    </motion.button>
  </Tooltip>

</div>
      {/* Achievement Notifications */}
      <AnimatePresence>
        {userProgress.achievements
          .filter(a => a.unlocked)
          .slice(-1)
          .map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="fixed top-24 right-6 z-50 w-80"
            >
              <div className={`rounded-xl p-4 shadow-2xl border-2 backdrop-blur-lg
                ${darkMode 
                  ? 'bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-purple-500' 
                  : 'bg-gradient-to-br from-purple-100/90 to-blue-100/90 border-purple-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0"
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      🎉 Succès débloqué !
                    </h4>
                    <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      {achievement.name}
                    </p>
                    <p className={`text
