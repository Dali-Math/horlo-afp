'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText, 
  Search, Filter, Download, Maximize2, Minimize2, Trophy,
  Zap, Target, Star, Clock, TrendingUp, ChevronDown, ChevronUp,
  Sparkles, Flame, Shield, Crown, BookOpen, Brain, PlayCircle,
  PauseCircle, RotateCcw, AlertCircle, Info, HelpCircle, X,
  Sun, Moon, Globe
} from 'lucide-react'

// ============= TYPES =============
type SectionType = 'champs' | 'cartouche' | 'quiz' | 'tableaux' | 'memo' | 'faq' | 'normes'

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
interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color = 'blue', showLabel = true }) => {
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

interface BadgeProps {
  icon: React.ReactNode;
  text: string;
  color: string;
  glow?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ icon, text, color, glow = false }) => (
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

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
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
interface NavigationProps {
  currentSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  darkMode: boolean;
  userProgress: UserProgress;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange, darkMode, userProgress }) => {
  const sections = [
    { id: 'champs' as SectionType, label: 'Champs', icon: <FileText className="w-4 h-4" /> },
    { id: 'cartouche' as SectionType, label: 'Cartouche', icon: <Book className="w-4 h-4" /> },
    { id: 'quiz' as SectionType, label: 'Quiz', icon: <Brain className="w-4 h-4" /> },
    { id: 'tableaux' as SectionType, label: 'Tableaux', icon: <Target className="w-4 h-4" /> },
    { id: 'memo' as SectionType, label: 'Mémo', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'faq' as SectionType, label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'normes' as SectionType, label: 'Normes', icon: <Shield className="w-4 h-4" /> }
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
interface InteractiveCartoucheProps {
  darkMode: boolean;
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
}

const InteractiveCartouche: React.FC<InteractiveCartoucheProps> = ({ darkMode, selectedField, setSelectedField }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
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

  const CartoucheButton: React.FC<{ field: CartoucheField }> = ({ field }) => (
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
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'entreprise')!} />
                </div>
                <div style={{ gridColumn: '3 / 6', gridRow: '1' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'titre')!} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '1' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'numero-piece')!} />
                </div>

                {/* Row 2 */}
                <div style={{ gridColumn: '3', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'materiau')!} />
                </div>
                <div style={{ gridColumn: '4', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'traitement')!} />
                </div>
                <div style={{ gridColumn: '5', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'masse')!} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '2' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'echelle')!} />
                </div>

                {/* Row 3 */}
                <div style={{ gridColumn: '1', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'dessinateur')!} />
                </div>
                <div style={{ gridColumn: '2', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'verificateur')!} />
                </div>
                <div style={{ gridColumn: '3', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'tolerance-generale')!} />
                </div>
                <div style={{ gridColumn: '4', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'projection')!} />
                </div>
                <div style={{ gridColumn: '5', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'format')!} />
                </div>
                <div style={{ gridColumn: '6', gridRow: '3' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'indice')!} />
                </div>
                <div style={{ gridColumn: '1', gridRow: '4' }}>
                  <CartoucheButton field={cartoucheFieldsData.find(f => f.id === 'date')!} />
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
interface FieldsExplorerProps {
  darkMode: boolean;
  setSelectedField: (field: string | null) => void;
  onSectionChange: (section: SectionType) => void;
}

const FieldsExplorer: React.FC<FieldsExplorerProps> = ({ darkMode, setSelectedField, onSectionChange }) => {
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
    const colors: Record<string, string> = {
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
      </div>
    </div>
  );
};

// ============= SECTION QUIZ =============
interface QuizSectionProps {
  darkMode: boolean;
  onQuizComplete: (score: number, completedQuestions: number) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ darkMode, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{questionId: number, answer: number, correct: boolean}[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const question = quizData[currentQuestion];
  const maxPoints = quizData.reduce((sum, q) => sum + q.points, 0);
  const progress = ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / quizData.length) * 100;

  useEffect(() => {
    if (isPaused || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, currentQuestion, showResults]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      // Auto-select a random answer if time runs out
      const randomAnswer = Math.floor(Math.random() * question.options.length);
      handleAnswerSelect(randomAnswer, true);
    }
  };

  const handleAnswerSelect = (answerIndex: number, isAuto: boolean = false) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === question.correctAnswer;
    const pointsEarned = isCorrect ? question.points : 0;

    setAnsweredQuestions(prev => [...prev, {
      questionId: question.id,
      answer: answerIndex,
      correct: isCorrect
    }]);

    setScore(prev => prev + pointsEarned);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        setShowResults(true);
        onQuizComplete(score + pointsEarned, answeredQuestions.length + 1);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
    setScore(0);
    setTimeLeft(30);
    setIsPaused(false);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-500';
      case 'moyen': return 'bg-yellow-500';
      case 'difficile': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (showResults) {
    const percentage = Math.round((score / maxPoints) * 100);
    
    return (
      <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl p-8 shadow-2xl border-2
              ${darkMode ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quiz Terminé !
            </h2>

            <div className={`text-6xl font-bold mb-4 ${percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
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
interface TablesSectionProps {
  darkMode: boolean;
}

const TablesSection: React.FC<TablesSectionProps> = ({ darkMode }) => (
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
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Usage Horloger</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recommandations</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'bg-gray-800' : 'bg-white'}>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>A4</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>210 × 297 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pièces unitaires, composants de mouvement</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Format standard pour la documentation horlogère</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>A3</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>297 × 420 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ensembles, sous-ensembles de calibre</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pour plans avec plusieurs vues détaillées</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>A2</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>420 × 594 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Plans d'ensemble de mouvement complet</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Documentation technique complète</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>A1</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>594 × 841 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Plans d'ateliers, nomenclatures</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Documentation de production</td>
              </tr>
              <tr>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>A0</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>841 × 1189 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Plans d'ensemble industriels</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Documentation d'ingénierie avancée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tolérances ISO 2768 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`mt-8 rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-green-500 to-teal-600'}`}>
          <h3 className="text-xl font-bold text-white">Tolérances Générales ISO 2768</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Classe</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Précision</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Application</th>
                <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Horlogerie</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'bg-gray-800' : 'bg-white'}>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400`}>f (fine)</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>±0.05 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Précision maximale</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>✓ Très courant</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400`}>m (moyenne)</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>±0.1 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Précision standard</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>✓ Fréquent</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`px-6 py-4 text-sm font-bold text-yellow-600 dark:text-yellow-400`}>c (grossière)</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>±0.2 mm</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tolérance étendue</td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>✗ Éviter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Matériaux et désignations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`mt-8 rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-pink-600'}`}>
          <h3 className="text-xl font-bold text-white">Matériaux Horlogers - Désignations Normalisées</h3>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Métaux</h4>
              <div className="space-y-3">
                {[
                  { name: 'Maillechort', desc: 'Alliage CuNiZn' },
                  { name: 'Laiton', desc: 'Alliage CuZn' },
                  { name: 'Acier 316L', desc: 'Acier inoxydable' },
                  { name: 'Titane Grade 5', desc: 'Alliage TiAlV' }
                ].map((material, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="font-semibold text-sm">{material.name}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{material.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Traitements</h4>
              <div className="space-y-3">
                {[
                  { name: 'Rhodiage', desc: 'Revêtement noble' },
                  { name: 'Anglage', desc: 'Finition d\'arêtes' },
                  { name: 'Perlage', desc: 'Motif décoratif' },
                  { name: 'Côtes de Genève', desc: 'Finition prestige' }
                ].map((treatment, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="font-semibold text-sm">{treatment.name}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{treatment.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ============= SECTION MÉMO =============
interface MemoSectionProps {
  darkMode: boolean;
}

const MemoSection: React.FC<MemoSectionProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Tous');

  const memoItems = [
    {
      id: 1,
      title: "Ordre de remplissage du cartouche",
      content: "Remplissez TOUJOURS le cartouche dans l'ordre suivant :\n1. Identification de l'entreprise\n2. Titre et référence\n3. Matériau et traitements\n4. Données techniques\n5. Gestion et administration",
      tags: ['Ordre', 'Méthode'],
      type: 'procedure',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Règle des 3 doigts",
      content: "Pour vérifier une cote rapidement :\n• 1er doigt : dimension nominale\n• 2ème doigt : tolérance\n• 3ème doigt : méthode de mesure\nSi vous ne pouvez pas expliquer avec ces 3 éléments, la cote n'est pas claire.",
      tags: ['Tolérances', 'Contrôle'],
      type: 'conseil',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Échelle = Précision",
      content: "Relation directe entre échelle et précision de lecture :\n• 1:1 = Lecture directe (±0.1mm)\n• 2:1 = Lecture précise (±0.05mm)\n• 5:1 = Lecture fine (±0.02mm)\n• 10:1 = Ultra-précis (±0.01mm)\n\nPlus l'échelle est grande, plus la précision de lecture est importante.",
      tags: ['Échelles', 'Précision'],
      type: 'technic',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Projections internationales",
      content: "Différences cruciales :\n• 1er dièdre (E) : Europe/Suisse\n  - Vue de face à droite\n  - Vue de profil à gauche\n  - Vue de dessus en bas\n\n• 3ème dièdre (A) : États-Unis\n  - Vue de face à droite\n  - Vue de profil à gauche\n  - Vue de dessus en haut\n\nATTENTION aux échanges internationaux !",
      tags: ['Projections', 'International'],
      type: 'norme',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 5,
      title: "Temps d'apprentissage des champs",
      content: "Estimation du temps pour maîtriser chaque catégorie :\n• Identification : 2-3 jours\n• Technique : 5-7 jours\n• Représentation : 1-2 jours\n• Administratif : 1-2 jours\n• Gestion : 3-5 jours\n\nTotal : 12-19 jours de formation intensive",
      tags: ['Formation', 'Planning'],
      type: 'formation',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 6,
      title: "Erreurs fréquentes à éviter",
      content: "Top 10 des erreurs en cartouche horloger :\n1. Oublier l'échelle de représentation\n2. Confondre O (obligatoire) et C (conditionnel)\n3. Format de date incohérent\n4. Matériau sans norme\n5. Tolérance générale trop large\n6. Indice de révision manquant\n7. Noms d'entreprise tronqués\n8. Méthode de projection non précisée\n9. Limites de caractères dépassées\n10. Orthographe des traitements incorrecte",
      tags: ['Erreurs', 'Qualité'],
      type: 'warning',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 7,
      title: "Matériaux critiques horlogers",
      content: "Matériaux à manipulations spéciales :\n• SILICIUM : fragile, pas de chocs\n• SAPHIR : rayable uniquement par diamant\n• OR 750 : pH neutre uniquement\n• TITANE : éviter les températures élevées\n• CERAMIQUE : très fragile à l'impact\n\nToujours mentionner les précautions dans les notes techniques !",
      tags: ['Matériaux', 'Critique'],
      type: 'warning',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 8,
      title: "Workflow de validation",
      content: "Process de validation d'un plan :\n1. Dessinateur crée le plan (signature)\n2. Vérificateur contrôle (validation)\n3. Client/Normes vérifie conformité\n4. Responsable qualité approuve\n5. Archivage avec indice final\n\nÉquipe minimum : 2 personnes distinctes",
      tags: ['Validation', 'Processus'],
      type: 'procedure',
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const allTags = ['Tous', ...Array.from(new Set(memoItems.flatMap(item => item.tags)))];

  const filteredMemos = memoItems.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = selectedTag === 'Tous' || item.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      'procedure': darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200',
      'conseil': darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-100 text-green-600 border-green-200',
      'technic': darkMode ? 'bg-purple-900/30 text-purple-400 border-purple-700' : 'bg-purple-100 text-purple-600 border-purple-200',
      'norme': darkMode ? 'bg-orange-900/30 text-orange-400 border-orange-700' : 'bg-orange-100 text-orange-600 border-orange-200',
      'formation': darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' : 'bg-cyan-100 text-cyan-600 border-cyan-200',
      'warning': darkMode ? 'bg-red-900/30 text-red-400 border-red-700' : 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            📚 Mémo Professionnel
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {memoItems.length} conseils et raccourcis pour l'expertise horlogère
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className={`mb-6 p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Rechercher dans le mémo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                  ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Memo Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMemos.map((memo, index) => (
              <motion.div
                key={memo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl p-6 border-l-4 shadow-lg hover:shadow-xl transition-all
                  ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(memo.type)}`}>
                      {memo.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {memo.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(memo.type)}`}>
                    {memo.type}
                  </span>
                </div>

                {/* Content */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <pre className={`text-sm whitespace-pre-wrap font-mono leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {memo.content}
                  </pre>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-4">
                  {memo.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ============= SECTION FAQ =============
interface FAQSectionProps {
  darkMode: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const categories = ['Toutes', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = faqData.filter(item => {
    const matchSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Toutes' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ❓ Questions Fréquentes
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {faqData.length} réponses aux questions les plus posées
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className={`mb-6 p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Rechercher dans les questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                  ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all
                ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQ.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border shadow-lg transition-all
                  ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border
                          ${darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200'}`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.question}
                      </h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <motion.div
                        animate={{ rotate: expandedItem === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-6 pb-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                    >
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                            ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                          >
                            <Info className="w-4 h-4" />
                          </div>
                          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ============= SECTION NORMES =============
interface NormesSectionProps {
  darkMode: boolean;
}

const NormesSection: React.FC<NormesSectionProps> = ({ darkMode }) => {
  const [selectedNorme, setSelectedNorme] = useState('iso7200');

  const normesData = [
    {
      id: 'iso7200',
      code: 'ISO 7200:2004',
      title: 'Cartouches de données',
      description: 'Spécifie les champs de données à utiliser dans les cartouches d\'inscription et les têtes de documents techniques',
      status: 'En vigueur',
      lastUpdate: '2012-10-01',
      keyPoints: [
        'Longueur maximale de la zone d\'identification: 170 mm',
        'Hauteur minimale recommandée: 55 mm',
        'Position obligatoire: coin inférieur droit',
        'Champs obligatoires clairement définis',
        'Format de date selon ISO 8601 recommandé'
      ],
      relation: 'Norme fondamentale pour tous les cartouches techniques'
    },
    {
      id: 'iso5457',
      code: 'ISO 5457:2019',
      title: 'Formats de dessin',
      description: 'Spécifie les formats de papier pour les dessins techniques et définit les marges et zones de pliage',
      status: 'En vigueur',
      lastUpdate: '2019-01-01',
      keyPoints: [
        'Série A: A0, A1, A2, A3, A4, A5',
        'Marges minimales définies par format',
        'Zone de pliage selon usage',
        'Orientation paysage et portrait',
        'Titres et cartouches intégrés'
      ],
      relation: 'Complémentaire à ISO 7200 pour le positionnement'
    },
    {
      id: 'iso128',
      code: 'ISO 128-1:2020',
      title: 'Principes généraux de représentation',
      description: 'Principes généraux de représentation des objets techniques dans les dessins techniques',
      status: 'En vigueur',
      lastUpdate: '2020-01-01',
      keyPoints: [
        'Projections orthogonales normalisées',
        'Symboles de projection clairs',
        'Méthodes de représentation standard',
        'Échelles selon ISO 5455',
        'Cotation selon ISO 129-1'
      ],
      relation: 'Définit les méthodes de représentation des plans'
    },
    {
      id: 'iso2768',
      code: 'ISO 2768-1:1989',
      title: 'Tolérances générales',
      description: 'Spécifie les tolérances générales sur les cotes pour les formes et positions géométriques',
      status: 'En vigueur',
      lastUpdate: '1989-12-01',
      keyPoints: [
        '4 classes: f (fine), m (moyenne), c (grossière), v (très grossière)',
        'Tolérances angulaires séparées',
        'Application par défaut si non spécifié',
        'Estimation des coûts basée sur la classe',
        'Compatibilité avec les moyens de production'
      ],
      relation: 'Utile pour le champ "tolérance générale" du cartouche'
    },
    {
      id: 'iso3098',
      code: 'ISO 3098-1:2015',
      title: 'Écriture',
      description: 'Spécifie les caractéristiques des écritures à utiliser dans les documents techniques',
      status: 'En vigueur',
      lastUpdate: '2015-11-01',
      keyPoints: [
        'Polices techniques normalisées',
        'Hauteurs nominales: 2.5, 3.5, 5, 7, 10, 14, 20 mm',
        'Rapport largeur/hauteur défini',
        'Espacement des caractères',
        'Lisibilité après reproduction'
      ],
      relation: 'S\'applique à l\'écriture dans tous les champs du cartouche'
    }
  ];

  const selectedNormeData = normesData.find(n => n.id === selectedNorme) || normesData[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur':
        return darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-100 text-green-600 border-green-200';
      case 'Remplacée':
        return darkMode ? 'bg-red-900/30 text-red-400 border-red-700' : 'bg-red-100 text-red-600 border-red-200';
      case 'Draft':
        return darkMode ? 'bg-yellow-900/30 text-yellow-400 border-yellow-700' : 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return darkMode ? 'bg-gray-900/30 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            📋 Normes Internationales
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Références essentielles pour les cartouches horlogers
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Normes List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
              <h3 className="text-lg font-bold text-white">Normes ISO</h3>
            </div>
            <div className="p-4 space-y-2">
              {normesData.map(norme => (
                <button
                  key={norme.id}
                  onClick={() => setSelectedNorme(norme.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedNorme === norme.id
                      ? darkMode ? 'bg-blue-900/30 text-blue-400 border border-blue-700' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold text-sm">{norme.code}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {norme.title}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Norme Detail */}
          <motion.div
            key={selectedNorme}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            {/* Header */}
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedNormeData.code}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedNormeData.status)}`}>
                  {selectedNormeData.status}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedNormeData.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedNormeData.description}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Key Points */}
              <div>
                <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Points Clés
                </h4>
                <div className="space-y-2">
                  {selectedNormeData.keyPoints.map((point, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                        ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                      >
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relation */}
              <div>
                <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Application en Horlogerie
                </h4>
                <div className={`p-4 rounded-lg border-l-4 ${darkMode ? 'bg-green-900/20 border-green-500' : 'bg-green-50 border-green-400'}`}>
                  <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                    {selectedNormeData.relation}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dernière mise à jour :</span>
                    <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(selectedNormeData.lastUpdate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div>
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Code :</span>
                    <span className={`ml-2 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedNormeData.code}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}>
            <h3 className="text-xl font-bold text-white">📎 Référence Rapide</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Champs Obligatoires ISO 7200
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    'Nom ou logo de l\'entreprise',
                    'Titre du document',
                    'Format de papier',
                    'Indice de révision',
                    'Date de création/modification',
                    'Nom du dessinateur',
                    'Nom du vérificateur'
                  ].map((field, index) => (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{field}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Formats Recommandés Horlogers
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    'A4: Pièces unitaires de mouvement',
                    'A3: Sous-ensembles de calibre',
                    'A2: Plans d\'ensemble de mouvement',
                    'A1: Documentation de production'
                  ].map((format, index) => (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============= COMPOSANT PRINCIPAL =============
interface PageProps {
  // Props optionnelles pour intégration externe
}

const Page: React.FC<PageProps> = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionType>('champs');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    completedQuizzes: 0,
    totalScore: 0,
    achievements: [
      {
        id: 'first-quiz',
        name: 'Premier Quiz',
        description: 'Terminez votre premier quiz',
        icon: <Trophy className="w-5 h-5" />,
        unlocked: false,
        progress: 0,
        maxProgress: 1
      },
      {
        id: 'field-explorer',
        name: 'Explorateur',
        description: 'Explorez tous les champs',
        icon: <Target className="w-5 h-5" />,
        unlocked: false,
        progress: 0,
        maxProgress: cartoucheFieldsData.length
      },
      {
        id: 'cartouche-master',
        name: 'Maître du Cartouche',
        description: 'Maîtrisez tous les concepts',
        icon: <Crown className="w-5 h-5" />,
        unlocked: false,
        progress: 0,
        maxProgress: 100
      }
    ],
    fieldsLearned: [],
    streak: 0,
    lastVisit: new Date().toISOString().split('T')[0]
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('cartouches-horlogers-progress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        setUserProgress(parsedProgress);
      } catch (error) {
        console.warn('Could not parse saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartouches-horlogers-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleQuizComplete = (score: number, completedQuestions: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + score;
      const newLevel = Math.floor(newXP / 100) + 1;
      const newCompletedQuizzes = prev.completedQuizzes + 1;
      const newTotalScore = prev.totalScore + score;
      
      // Update achievements
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.id === 'first-quiz' && !achievement.unlocked) {
          return { ...achievement, unlocked: true, progress: achievement.maxProgress };
        }
        return achievement;
      });

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newLevel * 100 - newXP,
        completedQuizzes: newCompletedQuizzes,
        totalScore: newTotalScore,
        achievements: updatedAchievements,
        lastVisit: new Date().toISOString().split('T')[0]
      };
    });
  };

  const handleFieldSelect = (fieldId: string | null) => setSelectedField(fieldId);
    setUserProgress(prev => {
      if (prev.fieldsLearned.includes(fieldId)) {
        return prev;
      }
      
      return {
        ...prev,
        fieldsLearned: [...prev.fieldsLearned, fieldId],
        achievements: prev.achievements.map(achievement => {
          if (achievement.id === 'field-explorer') {
            return { 
              ...achievement, 
              progress: prev.fieldsLearned.length + 1,
              unlocked: prev.fieldsLearned.length + 1 >= achievement.maxProgress 
            };
          }
          return achievement;
        })
      };
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'champs':
        return (
          <FieldsExplorer 
            darkMode={darkMode} 
            setSelectedField={handleFieldSelect}
            onSectionChange={setCurrentSection}
          />
        );
      case 'cartouche':
        return (
          <InteractiveCartouche 
            darkMode={darkMode} 
            selectedField={selectedField}
            setSelectedField={handleFieldSelect}
          />
        );
      case 'quiz':
        return (
          <QuizSection 
            darkMode={darkMode} 
            onQuizComplete={handleQuizComplete}
          />
        );
      case 'tableaux':
        return <TablesSection darkMode={darkMode} />;
      case 'memo':
        return <MemoSection darkMode={darkMode} />;
      case 'faq':
        return <FAQSection darkMode={darkMode} />;
      case 'normes':
        return <NormesSection darkMode={darkMode} />;
      default:
        return <FieldsExplorer darkMode={darkMode} setSelectedField={handleFieldSelect} onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Navigation */}
        <Navigation
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          darkMode={darkMode}
          userProgress={userProgress}
        />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all
            ${darkMode ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
        >
          {darkMode ? (
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Sun className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Moon className="w-6 h-6" />
            </motion.div>
          )}
        </button>

        {/* Achievement Notifications */}
        <AnimatePresence>
          {userProgress.achievements.filter(a => a.unlocked && a.progress === a.maxProgress).map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className={`px-6 py-4 rounded-xl shadow-2xl border-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white`}>
                <div className="flex items-center gap-3">
                  {achievement.icon}
                  <div>
                    <div className="font-bold">🎉 Succès débloqué !</div>
                    <div className="text-sm font-semibold">{achievement.name}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className={`py-8 px-4 border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Cartouches Horlogers
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Formation interactive • Conforme ISO 7200:2004 • {userProgress.level} niveau • {userProgress.completedQuizzes} quiz terminés
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Développé par MiniMax Agent • Version 1.0 • {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Page;
