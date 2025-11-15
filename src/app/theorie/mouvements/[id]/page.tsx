// app/theorie/mouvements/[id]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Target, AlertTriangle, Lightbulb, TrendingUp, 
  Award, CheckCircle2, ArrowLeft, Bookmark, BookmarkPlus,
  ChevronRight, Star, Sparkles, Trophy, Zap, Flag
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { concepts as conceptGroups } from '../data';

// ============================================================================
// TYPES
// ============================================================================

interface ConceptData {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  prerequisites: string[];
  commonMistakes: string[];
  safetyTips: string[];
  progressionSteps: string[];
  variations: string[];
  relatedMoves: string[];
  details?: {
    principle?: string;
    howItWorks?: string;
    keyPoints?: string[];
    advantages?: string[];
    limitations?: string[];
  };
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

const transformConcepts = (): ConceptData[] => {
  const transformed: ConceptData[] = [];

  conceptGroups.forEach(group => {
    group.concepts.forEach(concept => {
      transformed.push({
        id: concept.id,
        title: concept.title,
        category: group.title,
        difficulty: concept.level || 'Intermédiaire',
        description: concept.desc || '',
        prerequisites: concept.details?.prerequisites || [],
        commonMistakes: concept.details?.commonErrors || [],
        safetyTips: concept.details?.specs?.safetyNotes || [],
        progressionSteps: concept.details?.applications?.progressions || [],
        variations: concept.details?.applications?.variations || [],
        relatedMoves: concept.relatedConcepts || [],
        details: {
          principle: concept.details?.principle,
          howItWorks: concept.details?.howItWorks,
          keyPoints: concept.details?.keyPoints,
          advantages: concept.details?.advantages,
          limitations: concept.details?.limitations
        }
      });
    });
  });

  return transformed;
};

const ALL_CONCEPTS = transformConcepts();

const TABS = [
  { id: 'description', label: 'Principe', icon: BookOpen },
  { id: 'prerequisites', label: 'Prérequis', icon: Target },
  { id: 'mistakes', label: 'Erreurs', icon: AlertTriangle },
  { id: 'tips', label: 'Conseils', icon: Lightbulb },
  { id: 'progression', label: 'Progression', icon: TrendingUp },
  { id: 'variations', label: 'Variations', icon: Sparkles }
] as const;

type TabId = typeof TABS[number]['id'];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getDifficultyColor = (difficulty: string): string => {
  const colors: Record<string, string> = {
    'Débutant': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300',
    'Intermédiaire': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300',
    'Avancé': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300',
    'Expert': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300'
  };
  return colors[difficulty] || colors['Intermédiaire'];
};

const getDifficultyIcon = (difficulty: string) => {
  const icons: Record<string, typeof Star> = {
    'Débutant': Star,
    'Intermédiaire': Award,
    'Avancé': Trophy,
    'Expert': Zap
  };
  return icons[difficulty] || Award;
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
      <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-slate-600 dark:text-slate-400">
          {completedSteps.length} / {steps.length} étapes
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === completedSteps.length && !isCompleted;

          return (
            <motion.button
              key={index}
              onClick={() => toggleStep(index)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                isCompleted
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300'
                  : isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
              </div>

              <p className={`flex-1 text-left font-medium ${
                isCompleted ? 'text-green-900 dark:text-green-100 line-through' : 'text-slate-900 dark:text-slate-100'
              }`}>
                {step}
              </p>

              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Flag className="w-5 h-5 text-blue-600" />
                </motion.div>
              )}
            </motion.button>
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
        const DiffIcon = getDifficultyIcon(concept.difficulty);
        
        return (
          <Link key={concept.id} href={`/theorie/mouvements/${concept.id}`}>
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-slate-200 hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 mb-1">
                    {concept.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {concept.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1.5 ${getDifficultyColor(concept.difficulty)}`}>
                    <DiffIcon className="w-3 h-3" />
                    {concept.difficulty}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
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
  const [concept, setConcept] = useState<ConceptData | null>(null);

  useEffect(() => {
    const foundConcept = ALL_CONCEPTS.find(c => c.id === conceptId);
    if (foundConcept) {
      setConcept(foundConcept);
    } else {
      router.push('/theorie/mouvements');
    }
  }, [conceptId, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
      setIsBookmarked(bookmarks.includes(conceptId));
    }
  }, [conceptId]);

  const toggleBookmark = () => {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
      const newBookmarks = isBookmarked
        ? bookmarks.filter((id: string) => id !== conceptId)
        : [...bookmarks, conceptId];
      localStorage.setItem('bookmarkedConcepts', JSON.stringify(newBookmarks));
      setIsBookmarked(!isBookmarked);
    }
  };

  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const DiffIcon = getDifficultyIcon(concept.difficulty);

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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold border-2 border-blue-300">
                    {concept.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 flex items-center gap-1.5 ${getDifficultyColor(concept.difficulty)}`}>
                    <DiffIcon className="w-4 h-4" />
                    {concept.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {concept.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {concept.description}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleBookmark}
                className={`ml-6 p-3 rounded-xl transition-all border-2 ${
                  isBookmarked
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 text-amber-700'
                    : 'bg-white dark:bg-slate-800 border-slate-200 text-slate-600'
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
                  Principe de fonctionnement
                </h2>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {concept.details?.principle || concept.description}
                  </p>
                  
                  {concept.details?.howItWorks && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200">
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
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
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
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200">
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
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200">
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

                {concept.prerequisites.length > 0 ? (
                  <div className="space-y-3">
                    {concept.prerequisites.map((prereq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
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

                {concept.commonMistakes.length > 0 ? (
                  <div className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
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

                {concept.safetyTips.length > 0 ? (
                  <div className="space-y-3">
                    {concept.safetyTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200"
                      >
                        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
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

                {concept.progressionSteps.length > 0 ? (
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

                {concept.variations.length > 0 && (
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
                          className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200"
                        >
                          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-900 dark:text-slate-100 font-medium">
                            {variation}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {concept.relatedMoves.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                      Concepts associés
                    </h3>
                    <RelatedConcepts relatedIds={concept.relatedMoves} />
                  </div>
                )}

                {concept.variations.length === 0 && concept.relatedMoves.length === 0 && (
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
