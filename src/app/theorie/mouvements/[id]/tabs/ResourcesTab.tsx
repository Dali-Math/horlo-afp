'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Video, ExternalLink, Download,
  Search, Filter, Star, Clock,
  Play, FileText, Headphones, Image,
  Link as LinkIcon, Award, Sparkles,
  ChevronDown, ChevronUp, Check, X,
  Youtube, Book, Newspaper, GraduationCap
} from 'lucide-react';
import type { Concept } from '../../types';

// ============================================================================
// TYPES
// ============================================================================

interface ResourcesTabProps {
  concept: Concept;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'book' | 'course' | 'document';
  url?: string;
  author?: string;
  duration?: string;
  difficulty?: 'Débutant' | 'Intermédiaire' | 'Expert';
  rating?: number;
  description?: string;
  thumbnail?: string;
  isPremium?: boolean;
}

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ElementType;
}

// ============================================================================
// COMPONENTS
// ============================================================================

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, icon: Icon, className = '' }: { 
  children: React.ReactNode; 
  icon?: React.ElementType;
  className?: string;
}) => (
  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${className}`}>
    {Icon && <Icon className="w-7 h-7" />}
    {children}
  </h2>
);

const FilterButton = ({ label, isActive, onClick, icon: Icon }: FilterButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
    {isActive && <Check className="w-4 h-4" />}
  </motion.button>
);

const ResourceTypeIcon = ({ type }: { type: Resource['type'] }) => {
  const icons = {
    video: Youtube,
    article: Newspaper,
    book: Book,
    course: GraduationCap,
    document: FileText,
  };
  
  const colors = {
    video: 'text-red-600 dark:text-red-400',
    article: 'text-blue-600 dark:text-blue-400',
    book: 'text-green-600 dark:text-green-400',
    course: 'text-purple-600 dark:text-purple-400',
    document: 'text-amber-600 dark:text-amber-400',
  };

  const Icon = icons[type];
  const color = colors[type];

  return <Icon className={`w-6 h-6 ${color}`} />;
};

const DifficultyBadge = ({ difficulty }: { difficulty?: Resource['difficulty'] }) => {
  if (!difficulty) return null;

  const configs = {
    'Débutant': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
    'Intermédiaire': { bg: 'bg-amber-100 dark:bg-amber-900', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
    'Expert': { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  };

  const config = configs[difficulty];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} ${config.border} border`}>
      {difficulty}
    </span>
  );
};

const StarRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-slate-300 dark:text-slate-600'
          }`}
        />
      ))}
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
        ({rating}/5)
      </span>
    </div>
  );
};

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeLabels = {
    video: 'Vidéo',
    article: 'Article',
    book: 'Livre',
    course: 'Formation',
    document: 'Document',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-md"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <ResourceTypeIcon type={resource.type} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {resource.title}
                </h3>
                {resource.isPremium && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {typeLabels[resource.type]}
                {resource.author && ` • Par ${resource.author}`}
              </p>
            </div>
          </div>
          
          {resource.url && (
            <motion.a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <DifficultyBadge difficulty={resource.difficulty} />
          {resource.duration && (
            <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              {resource.duration}
            </span>
          )}
          <StarRating rating={resource.rating} />
        </div>

        {/* Description Toggle */}
        {resource.description && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Masquer la description
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Voir la description
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {resource.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {resource.url && (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Ressource externe
            </span>
            <motion.a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {resource.type === 'video' ? (
                <>
                  <Play className="w-4 h-4" />
                  Regarder
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  Consulter
                </>
              )}
            </motion.a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const EmptyState = ({ icon: Icon, title, message }: { icon: React.ElementType; title: string; message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
      <Icon className="w-10 h-10 text-slate-400 dark:text-slate-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
      {message}
    </p>
  </motion.div>
);

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) => (
  <div className={`${color.replace('text-', 'bg-').replace('600', '50')} dark:${color.replace('text-', 'bg-').replace('600', '950')}/30 rounded-xl p-6 border-2 ${color.replace('text-', 'border-')}`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('600', '100')} dark:${color.replace('text-', 'bg-').replace('600', '900')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ResourcesTab({ concept }: ResourcesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Resource['type'] | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Resource['difficulty'] | 'all'>('all');

  // Récupération des ressources
  const resourcesData = concept.details?.resources;
  
  // Construction des ressources à partir des données
  const allResources: Resource[] = [
    // Vidéos
    ...(resourcesData?.videos || []).map((video, idx) => ({
      id: `video-${idx}`,
      type: 'video' as const,
      title: video.title,
      url: video.url,
      duration: '10-15 min',
      difficulty: concept.level as Resource['difficulty'],
      rating: 4,
      description: `Tutoriel vidéo détaillé sur ${concept.title}. Cette vidéo vous guide étape par étape dans la réalisation du mouvement.`,
    })),
    // Articles
    ...(resourcesData?.articles || []).map((article, idx) => ({
      id: `article-${idx}`,
      type: 'article' as const,
      title: article.title,
      url: article.url,
      duration: '5-10 min',
      difficulty: concept.level as Resource['difficulty'],
      rating: 4,
      description: `Article technique approfondissant les aspects théoriques et pratiques de ${concept.title}.`,
    })),
    // Livres
    ...(resourcesData?.books || []).map((book, idx) => ({
      id: `book-${idx}`,
      type: 'book' as const,
      title: book.title,
      author: book.author,
      difficulty: 'Intermédiaire' as const,
      rating: 5,
      isPremium: true,
      description: `Ouvrage de référence couvrant en profondeur tous les aspects de ${concept.title} et ses applications.`,
    })),
  ];

  // Ajout de ressources par défaut si vide
  if (allResources.length === 0) {
    allResources.push(
      {
        id: 'default-video-1',
        type: 'video',
        title: `Tutoriel ${concept.title} - Niveau ${concept.level}`,
        url: '#',
        duration: '12 min',
        difficulty: concept.level as Resource['difficulty'],
        rating: 4,
        description: `Vidéo d'introduction complète au mouvement ${concept.title}. Découvrez les bases techniques et les erreurs à éviter.`,
      },
      {
        id: 'default-article-1',
        type: 'article',
        title: `Guide complet : Maîtriser ${concept.title}`,
        url: '#',
        duration: '8 min',
        difficulty: concept.level as Resource['difficulty'],
        rating: 4,
        description: `Article détaillant la biomécanique et la progression pédagogique pour ${concept.title}.`,
      },
      {
        id: 'default-course-1',
        type: 'course',
        title: `Formation ${concept.title} - De débutant à expert`,
        difficulty: 'Intermédiaire',
        rating: 5,
        isPremium: true,
        description: `Programme de formation complet sur 8 semaines pour développer une maîtrise parfaite de ${concept.title}.`,
      }
    );
  }

  // Filtrage des ressources
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  // Statistiques
  const stats = {
    total: allResources.length,
    videos: allResources.filter(r => r.type === 'video').length,
    articles: allResources.filter(r => r.type === 'article').length,
    premium: allResources.filter(r => r.isPremium).length,
  };

  return (
    <div className="space-y-8">
      {/* HEADER AVEC STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SectionCard>
          <SectionTitle icon={BookOpen}>
            Bibliothèque de Ressources
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={BookOpen}
              label="Total Ressources"
              value={stats.total}
              color="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              icon={Video}
              label="Vidéos"
              value={stats.videos}
              color="text-red-600 dark:text-red-400"
            />
            <StatCard
              icon={FileText}
              label="Articles"
              value={stats.articles}
              color="text-green-600 dark:text-green-400"
            />
            <StatCard
              icon={Sparkles}
              label="Premium"
              value={stats.premium}
              color="text-amber-600 dark:text-amber-400"
            />
          </div>

          {/* BARRE DE RECHERCHE */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </SectionCard>
      </motion.div>

      {/* FILTRES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SectionCard>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Type de Ressource
              </h3>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  label="Toutes"
                  isActive={selectedType === 'all'}
                  onClick={() => setSelectedType('all')}
                />
                <FilterButton
                  label="Vidéos"
                  icon={Video}
                  isActive={selectedType === 'video'}
                  onClick={() => setSelectedType('video')}
                />
                <FilterButton
                  label="Articles"
                  icon={FileText}
                  isActive={selectedType === 'article'}
                  onClick={() => setSelectedType('article')}
                />
                <FilterButton
                  label="Livres"
                  icon={Book}
                  isActive={selectedType === 'book'}
                  onClick={() => setSelectedType('book')}
                />
                <FilterButton
                  label="Formations"
                  icon={GraduationCap}
                  isActive={selectedType === 'course'}
                  onClick={() => setSelectedType('course')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                Niveau de Difficulté
              </h3>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  label="Tous niveaux"
                  isActive={selectedDifficulty === 'all'}
                  onClick={() => setSelectedDifficulty('all')}
                />
                <FilterButton
                  label="Débutant"
                  isActive={selectedDifficulty === 'Débutant'}
                  onClick={() => setSelectedDifficulty('Débutant')}
                />
                <FilterButton
                  label="Intermédiaire"
                  isActive={selectedDifficulty === 'Intermédiaire'}
                  onClick={() => setSelectedDifficulty('Intermédiaire')}
                />
                <FilterButton
                  label="Expert"
                  isActive={selectedDifficulty === 'Expert'}
                  onClick={() => setSelectedDifficulty('Expert')}
                />
              </div>
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* LISTE DES RESSOURCES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SectionCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
            </h3>
            {(searchQuery || selectedType !== 'all' || selectedDifficulty !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedDifficulty('all');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Réinitialiser les filtres
              </button>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredResources.map((resource, idx) => (
                <ResourceCard key={resource.id} resource={resource} index={idx} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="Aucune ressource trouvée"
              message="Essayez de modifier vos critères de recherche ou vos filtres pour trouver des ressources pertinentes."
            />
          )}
        </SectionCard>
      </motion.div>

      {/* CALL TO ACTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-bold mb-3">Contribuez à la Bibliothèque</h3>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
            Vous connaissez une excellente ressource sur {concept.title} ? 
            Partagez-la avec la communauté !
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
          >
            <LinkIcon className="w-5 h-5" />
            Suggérer une Ressource
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
