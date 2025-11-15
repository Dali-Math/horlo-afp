// app/theorie/mouvements/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ArrowRight, Clock, 
  ChevronRight, TrendingUp, Award, Zap,
  Settings, BookOpen, Target, Sparkles
} from 'lucide-react';
import { concepts as conceptGroups } from './data';

// Aplatir la structure groupée en liste plate
const concepts = conceptGroups.flatMap(group => 
  group.concepts.map(concept => ({
    ...concept,
    category: group.title
  }))
);
import type { Concept } from './types';

// ============================================================================
// TYPES
// ============================================================================

type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';
type CategoryType = string;

interface FilterState {
  search: string;
  category: CategoryType | 'all';
  difficulty: DifficultyLevel | 'all';
}

// ============================================================================
// COMPONENTS
// ============================================================================

const DifficultyBadge = ({ level }: { level: string }) => {
  const colors = {
    'Débutant': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Intermédiaire': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Expert': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[level as DifficultyLevel] || colors['Intermédiaire']}`}>
      {level}
    </span>
  );
};

const CategoryIcon = ({ category }: { category: string }) => {
  const icons = {
    '🏗️ Architecture du Mouvement': Settings,
    '⚙️ Rouages & Transmission': Target,
    '⏱️ Échappements & Régulation': Clock,
    '🎯 Régulation & Balancier': TrendingUp,
    '🔧 Diagnostic & Dépannage': Sparkles,
  };

  const Icon = icons[category as keyof typeof icons] || BookOpen;
  
  return <Icon className="w-5 h-5" />;
};

const ConceptCard = ({ concept }: { concept: Concept }) => {
  return (
    <Link href={`/theorie/mouvements/${concept.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="h-full bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all"
      >
        {/* Header avec catégorie */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            {concept.category && <CategoryIcon category={concept.category} />}
            <span className="text-xs font-medium opacity-90">
  <CategoryIcon category={concept.category || ''} />
  {(concept.category || '').replace(/^[🏗️⚙️🔋⏱️🔄✨📊🎯🔧]\s*/, '')}
</span>
          </div>
          <DifficultyBadge level={concept.level} />
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {concept.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {concept.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
              En savoir plus
            </span>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const FilterButton = ({ 
  active, 
  children, 
  onClick 
}: { 
  active: boolean; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`}
  >
    {children}
  </button>
);

const StatsCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: number | string; 
  color: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`${color} rounded-xl p-6 shadow-sm`}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/20 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-white/80 font-medium">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MouvementsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    difficulty: 'all',
  });

  // Extraction des catégories uniques
  const categories = useMemo(() => {
    return Array.from(new Set(concepts.map(c => c.category)));
  }, []);

  const difficulties: DifficultyLevel[] = ['Débutant', 'Intermédiaire', 'Expert'];

  // Filtrage des concepts
  const filteredConcepts = useMemo(() => {
    return concepts.filter(concept => {
      const matchesSearch = concept.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                     concept.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
                     false;
      const matchesCategory = filters.category === 'all' || concept.category === filters.category;
      const matchesDifficulty = filters.difficulty === 'all' || concept.level === filters.difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [filters]);

  // Groupement par catégorie
  const groupedConcepts = useMemo(() => {
    const grouped = new Map<string, Concept[]>();
    
    filteredConcepts.forEach(concept => {
      if (!grouped.has(concept.category)) {
        grouped.set(concept.category, []);
      }
      grouped.get(concept.category)!.push(concept);
    });

    return grouped;
  }, [filteredConcepts]);

  // Statistiques
  const stats = {
    total: concepts.length,
    beginner: concepts.filter(c => c.level === 'Débutant').length,
    intermediate: concepts.filter(c => c.level === 'Intermédiaire').length,
    expert: concepts.filter(c => c.level === 'Expert').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              Référence Technique
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
            Tous les concepts essentiels du mouvement mécanique
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-500">
            <BookOpen className="w-4 h-4" />
            <span>{concepts.length} concepts</span>
            <span>•</span>
            <span>{categories.length} catégories</span>
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          <StatsCard
            icon={BookOpen}
            label="Total Concepts"
            value={stats.total}
            color="bg-gradient-to-br from-blue-600 to-blue-500"
          />
          <StatsCard
            icon={Zap}
            label="Débutant"
            value={stats.beginner}
            color="bg-gradient-to-br from-green-600 to-green-500"
          />
          <StatsCard
            icon={Target}
            label="Intermédiaire"
            value={stats.intermediate}
            color="bg-gradient-to-br from-amber-600 to-amber-500"
          />
          <StatsCard
            icon={Award}
            label="Expert"
            value={stats.expert}
            color="bg-gradient-to-br from-red-600 to-red-500"
          />
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border-2 border-slate-200 dark:border-slate-700 shadow-sm"
        >
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un concept..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Niveau de difficulté
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filters.difficulty === 'all'}
                onClick={() => setFilters({ ...filters, difficulty: 'all' })}
              >
                Tous
              </FilterButton>
              {difficulties.map(diff => (
                <FilterButton
                  key={diff}
                  active={filters.difficulty === diff}
                  onClick={() => setFilters({ ...filters, difficulty: diff })}
                >
                  {diff}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Catégorie
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filters.category === 'all'}
                onClick={() => setFilters({ ...filters, category: 'all' })}
              >
                Toutes
              </FilterButton>
              {categories.map(cat => (
                <FilterButton
                  key={cat}
                  active={filters.category === cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                >
                  {cat.replace(/^[🏗️⚙️⏱️🎯🔧]\s*/, '')}
                </FilterButton>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RESULTS COUNT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-slate-600 dark:text-slate-400 font-medium"
        >
          {filteredConcepts.length} concept{filteredConcepts.length > 1 ? 's' : ''} trouvé{filteredConcepts.length > 1 ? 's' : ''}
        </motion.div>

        {/* CONCEPTS GRID - GROUPED BY CATEGORY */}
        <AnimatePresence mode="wait">
          {Array.from(groupedConcepts.entries()).map(([category, categoryConcepts]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CategoryIcon category={category} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {category}
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-500">
                  ({categoryConcepts.length})
                </span>
              </div>

              {/* Concepts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryConcepts.map(concept => (
                  <ConceptCard key={concept.id} concept={concept} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {filteredConcepts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
              Aucun concept trouvé
            </p>
            <p className="text-slate-500 dark:text-slate-500">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
