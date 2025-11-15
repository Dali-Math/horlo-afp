// app/theorie/mouvements/[id]/page.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Target, AlertTriangle, Lightbulb, TrendingUp, 
  Award, CheckCircle2, Circle, ArrowLeft, Share2, 
  Bookmark, BookmarkPlus, Eye, Clock, Users,
  ChevronRight, Star, Download, Printer, Link as LinkIcon,
  Play, Pause, RotateCcw, Volume2, VolumeX,
  Sparkles, Trophy, Zap, Flag, MapPin, Compass
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { concepts as conceptGroups } from '../data';

// ============================================================================
// DATA - Fusion des deux systèmes
// ============================================================================

const movements = [
  {
    id: 'salto-arriere',
    title: 'Salto arrière',
    category: 'Saltos',
    difficulty: 'Intermédiaire',
    prerequisites: ['Roulade arrière', 'Saut vertical'],
    description: 'Rotation arrière complète du corps dans les airs.',
    videoUrl: '/videos/salto-arriere.mp4',
    imageUrl: '/images/salto-arriere.jpg',
    variations: ['Salto groupé', 'Salto carpé', 'Salto tendu'],
    commonMistakes: [
      'Ne pas regarder en arrière assez tôt',
      'Manque de hauteur sur le saut initial',
      'Mauvaise synchronisation bras-jambes'
    ],
    safetyTips: [
      'Toujours utiliser des tapis de réception',
      'Avoir un pareur lors de l\'apprentissage',
      'S\'assurer d\'avoir la technique du saut vertical'
    ],
    progressionSteps: [
      'Maîtriser la roulade arrière',
      'Travailler le saut vertical avec rotation',
      'Pratiquer avec assistance',
      'Réaliser le mouvement seul avec tapis',
      'Perfectionner sur sol'
    ],
    relatedMoves: ['salto-avant', 'salto-lateral', 'roulade-arriere']
  },
  {
    id: 'salto-avant',
    title: 'Salto avant',
    category: 'Saltos',
    difficulty: 'Intermédiaire',
    prerequisites: ['Roulade avant', 'Saut vertical'],
    description: 'Rotation avant complète du corps dans les airs.',
    variations: ['Salto groupé avant', 'Salto carpé avant'],
    commonMistakes: [
      'Rotation insuffisante',
      'Manque d\'élan'
    ],
    safetyTips: [
      'Utiliser des tapis',
      'Avoir un pareur'
    ],
    progressionSteps: [
      'Maîtriser la roulade avant',
      'Pratiquer avec assistance'
    ],
    relatedMoves: ['salto-arriere', 'roulade-avant']
  },
  {
    id: 'salto-lateral',
    title: 'Salto latéral',
    category: 'Saltos',
    difficulty: 'Avancé',
    prerequisites: ['Salto arrière', 'Salto avant'],
    description: 'Rotation latérale complète du corps.',
    variations: ['Salto latéral groupé'],
    commonMistakes: [
      'Déséquilibre latéral'
    ],
    safetyTips: [
      'Surface adéquate',
      'Pareur obligatoire'
    ],
    progressionSteps: [
      'Maîtriser saltos de base'
    ],
    relatedMoves: ['salto-arriere', 'salto-avant']
  },
  {
    id: 'roulade-avant',
    title: 'Roulade avant',
    category: 'Bases',
    difficulty: 'Débutant',
    prerequisites: [],
    description: 'Roulade de base vers l\'avant.',
    variations: ['Roulade plongée'],
    commonMistakes: [
      'Tête qui touche le sol'
    ],
    safetyTips: [
      'Sol mou pour débuter'
    ],
    progressionSteps: [
      'Position groupée',
      'Poussée des jambes'
    ],
    relatedMoves: ['roulade-arriere']
  },
  {
    id: 'roulade-arriere',
    title: 'Roulade arrière',
    category: 'Bases',
    difficulty: 'Débutant',
    prerequisites: ['Roulade avant'],
    description: 'Roulade de base vers l\'arrière.',
    variations: ['Roulade arrière à la verticale'],
    commonMistakes: [
      'Mains mal placées'
    ],
    safetyTips: [
      'Protection de la nuque'
    ],
    progressionSteps: [
      'Position assise',
      'Rouler en arrière'
    ],
    relatedMoves: ['roulade-avant', 'salto-arriere']
  }
];

// Aplatir les concepts horlogers
const horlogeryConcepts = conceptGroups.flatMap(group => 
  group.concepts.map(concept => ({
    ...concept,
    category: group.title,
    prerequisites: concept.details?.prerequisites || [],
    commonMistakes: concept.details?.commonErrors || [],
    safetyTips: concept.details?.specs?.safetyNotes || [],
    progressionSteps: concept.details?.applications?.progressions || [],
    variations: concept.details?.applications?.variations || [],
    relatedMoves: concept.relatedConcepts || []
  }))
);

// Combiner les deux sources
const ALL_CONCEPTS = [...movements, ...horlogeryConcepts];

const TABS = [
  { id: 'description' as const, label: 'Principe', icon: BookOpen },
  { id: 'prerequisites' as const, label: 'Prérequis', icon: Target },
  { id: 'mistakes' as const, label: 'Erreurs courantes', icon: AlertTriangle },
  { id: 'tips' as const, label: 'Conseils', icon: Lightbulb },
  { id: 'progression' as const, label: 'Progression', icon: TrendingUp },
  { id: 'variations' as const, label: 'Variations', icon: Sparkles }
];

type TabId = typeof TABS[number]['id'];

// ============================================================================
// TYPES
// ============================================================================

interface Concept {
  id: string;
  title: string;
  category: string;
  difficulty?: string;
  level?: string;
  prerequisites: string[];
  description?: string;
  desc?: string;
  variations?: string[];
  commonMistakes?: string[];
  safetyTips?: string[];
  progressionSteps?: string[];
  relatedMoves?: string[];
  details?: {
    principle?: string;
    howItWorks?: string;
    keyPoints?: string[];
    advantages?: string[];
    limitations?: string[];
    prerequisites?: string[];
    commonErrors?: string[];
    specs?: {
      safetyNotes?: string[];
    };
    applications?: {
      progressions?: string[];
      variations?: string[];
    };
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    'Débutant': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700',
    'Intermédiaire': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    'Avancé': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
    'Expert': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
  };
  return colors[difficulty as keyof typeof colors] || colors['Intermédiaire'];
};

const getDifficultyIcon = (difficulty: string) => {
  const icons = {
    'Débutant': Star,
    'Intermédiaire': Award,
    'Avancé': Trophy,
    'Expert': Zap
  };
  return icons[difficulty as keyof typeof icons] || Award;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const ProgressionTimeline = ({ steps }: { steps: string[] }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-slate-600 dark:text-slate-400">
          {completedSteps.length} / {steps.length} étapes complétées
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Steps */}
      <div className="relative space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === completedSteps.length && !isCompleted;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => toggleStep(index)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                    : isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {/* Step Number/Checkmark */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 text-left">
                  <p
                    className={`font-medium ${
                      isCompleted
                        ? 'text-green-900 dark:text-green-100 line-through'
                        : isActive
                        ? 'text-blue-900 dark:text-blue-100'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {step}
                  </p>
                </div>

                {/* Indicator */}
                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex-shrink-0"
                  >
                    <Flag className="w-5 h-5 text-blue-600" />
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const RelatedConcepts = ({ relatedIds }: { relatedIds: string[] }) => {
  const relatedConcepts = ALL_CONCEPTS.filter(c => relatedIds.includes(c.id));

  if (relatedConcepts.length === 0) return null;

  return (
    <div className="space-y-4">
      {relatedConcepts.map((concept) => {
        const difficulty = concept.level || concept.difficulty || 'Intermédiaire';
        const DiffIcon = getDifficultyIcon(difficulty);
        
        return (
          <Link
            key={concept.id}
            href={`/theorie/mouvements/${concept.id}`}
            className="block"
          >
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                    {concept.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {concept.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1.5 ${getDifficultyColor(difficulty)}`}>
                    <DiffIcon className="w-3 h-3" />
                    {difficulty}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ConceptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conceptId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const concept = useMemo(() => {
    return ALL_CONCEPTS.find(c => c.id === conceptId);
  }, [conceptId]);

  useEffect(() => {
    if (!concept) {
      router.push('/theorie/mouvements');
    }
  }, [concept, router]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    setIsBookmarked(bookmarks.includes(conceptId));
  }, [conceptId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    const newBookmarks = isBookmarked
      ? bookmarks.filter((id: string) => id !== conceptId)
      : [...bookmarks, conceptId];
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  if (!concept) {
    return null;
  }

  const difficulty = concept.level || concept.difficulty || 'Intermédiaire';
  const DiffIcon = getDifficultyIcon(difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/theorie/mouvements"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux concepts
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold border-2 border-blue-300 dark:border-blue-700">
                    {concept.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 flex items-center gap-1.5 ${getDifficultyColor(difficulty)}`}>
                    <DiffIcon className="w-4 h-4" />
                    {difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {concept.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {concept.desc || concept.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 ml-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleBookmark}
                  className={`p-3 rounded-xl transition-all border-2 ${
                    isBookmarked
                      ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-300 dark:hover:border-amber-700'
                  }`}
                >
                  {isBookmarked ? (
                    <Bookmark className="w-6 h-6 fill-current" />
                  ) : (
                    <BookmarkPlus className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  {concept.details?.principle ? 'Principe de fonctionnement' : 'Principe du mouvement'}
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {concept.details?.principle || concept.description || concept.desc}
                  </p>
                  
                  {concept.details?.howItWorks && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                      <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                        Comment ça fonctionne ?
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        {concept.details.howItWorks}
                      </p>
                    </div>
                  )}

                  {concept.details?.keyPoints && concept.details.keyPoints.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Points clés
                      </h3>
                      <ul className="space-y-3">
                        {concept.details.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300 pt-0.5">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {concept.details?.advantages && concept.details.advantages.length > 0 && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <h3 className="font-bold text-green-900 dark:text-green-100 mb-3">
                        ✅ Avantages
                      </h3>
                      <ul className="space-y-2">
                        {concept.details.advantages.map((adv, index) => (
                          <li key={index} className="text-green-800 dark:text-green-200">
                            • {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {concept.details?.limitations && concept.details.limitations.length > 0 && (
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                      <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-3">
                        ⚠️ Limitations
                      </h3>
                      <ul className="space-y-2">
                        {concept.details.limitations.map((lim, index) => (
                          <li key={index} className="text-amber-800 dark:text-amber-200">
                            • {lim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'prerequisites' && (
              <motion.div
                key="prerequisites"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Prérequis nécessaires
                </h2>

                {concept.prerequisites && concept.prerequisites.length > 0 ? (
                  <div className="space-y-3">
                    {concept.prerequisites.map((prereq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-900 dark:text-slate-100 font-medium">
                          {prereq}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    Aucun prérequis spécifique requis.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === 'mistakes' && (
              <motion.div
                key="mistakes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Erreurs courantes à éviter
                </h2>

                {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                  <div className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-900 dark:text-slate-100 font-medium">
                          {mistake}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    Aucune erreur courante répertoriée.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                  Conseils de sécurité
                </h2>

                {concept.safetyTips && concept.safetyTips.length > 0 ? (
                  <div className="space-y-3">
                    {concept.safetyTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800"
                      >
                        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-900 dark:text-slate-100 font-medium">
                          {tip}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    Aucun conseil spécifique répertorié.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === 'progression' && (
              <motion.div
                key="progression"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Plan de progression
                </h2>

                {concept.progressionSteps && concept.progressionSteps.length > 0 ? (
                  <ProgressionTimeline steps={concept.progressionSteps} />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    Aucun plan de progression disponible.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === 'variations' && (
              <motion.div
                key="variations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Variations et concepts liés
                </h2>

                {concept.variations && concept.variations.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                      Variations
                    </h3>
                    <div className="space-y-3">
                      {concept.variations.map((variation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800"
                        >
                          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-900 dark:text-slate-100 font-medium">
                            {variation}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {concept.relatedMoves && concept.relatedMoves.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                      Concepts associés
                    </h3>
                    <RelatedConcepts relatedIds={concept.relatedMoves} />
                  </div>
                )}

                {(!concept.variations || concept.variations.length === 0) && 
                 (!concept.relatedMoves || concept.relatedMoves.length === 0) && (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    Aucune variation ou concept lié répertorié.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
