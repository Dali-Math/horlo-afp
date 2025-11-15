'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef, Suspense, lazy, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ChevronLeft, BookOpen, Award, Clock, Bookmark, ExternalLink, 
  ArrowLeft, ArrowRight, Image as ImageIcon, AlertTriangle, Wrench, 
  Calculator, Link2, Check, Loader2, Share2, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modules } from '../data';
import type { Concept } from '../types';

// ============================================================================
// LAZY LOADED COMPONENTS
// ============================================================================

const DescriptionTab = lazy(() => import('./tabs/DescriptionTab').catch(() => ({
  default: ({ concept }: { concept: Concept }) => <DescriptionTabFallback concept={concept} />
})));

const SpecsTab = lazy(() => import('./tabs/SpecsTab').catch(() => ({
  default: ({ concept }: { concept: Concept }) => <SpecsTabFallback concept={concept} />
})));

const ApplicationsTab = lazy(() => import('./tabs/ApplicationsTab').catch(() => ({
  default: ({ concept }: { concept: Concept }) => <ApplicationsTabFallback concept={concept} />
})));

const ResourcesTab = lazy(() => import('./tabs/ResourcesTab').catch(() => ({
  default: ({ concept }: { concept: Concept }) => <ResourcesTabFallback concept={concept} />
})));

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

type TabId = 'description' | 'specs' | 'applications' | 'resources';

interface UserProgress {
  understood: boolean;
  lastVisited: Date;
  quizScore?: number;
  notes?: string;
}

// ✅ Calcul unique au chargement du module
const ALL_CONCEPTS = modules.flatMap(m => m.concepts);

const TABS = [
  { id: 'description' as TabId, label: 'Principe', icon: BookOpen },
  { id: 'specs' as TabId, label: 'Spécifications', icon: Wrench },
  { id: 'applications' as TabId, label: 'Applications', icon: ImageIcon },
  { id: 'resources' as TabId, label: 'Ressources', icon: Link2 }
] as const;

const TAB_ANIMATION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getNavigation(id: string) {
  const currentIndex = ALL_CONCEPTS.findIndex(c => c.id === id);
  return {
    prev: currentIndex > 0 ? ALL_CONCEPTS[currentIndex - 1] : null,
    next: currentIndex < ALL_CONCEPTS.length - 1 ? ALL_CONCEPTS[currentIndex + 1] : null,
  };
}

// ✅ LocalStorage avec gestion d'erreurs
function getStoredProgress(conceptId: string): UserProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(`progress-${conceptId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveProgress(conceptId: string, progress: Partial<UserProgress>) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredProgress(conceptId) || { understood: false, lastVisited: new Date() };
    const updated = { ...current, ...progress, lastVisited: new Date() };
    localStorage.setItem(`progress-${conceptId}`, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

// ============================================================================
// SKELETON COMPONENTS
// ============================================================================

const TabSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
    <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
    <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
  </div>
);

const DescriptionTabFallback = ({ concept }: { concept: Concept }) => (
  <div className="space-y-6">
    <SectionCard>
      <SectionTitle>Principe de Fonctionnement</SectionTitle>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {concept.details?.principle || concept.desc}
      </p>
    </SectionCard>
  </div>
);

const SpecsTabFallback = ({ concept }: { concept: Concept }) => (
  <div className="space-y-6">
    <SectionCard>
      <SectionTitle>Spécifications Techniques</SectionTitle>
      <p className="text-slate-600 dark:text-slate-400">Chargement des spécifications...</p>
    </SectionCard>
  </div>
);

const ApplicationsTabFallback = ({ concept }: { concept: Concept }) => (
  <div className="space-y-6">
    <SectionCard>
      <SectionTitle>Applications Pratiques</SectionTitle>
      <p className="text-slate-600 dark:text-slate-400">Chargement des applications...</p>
    </SectionCard>
  </div>
);

const ResourcesTabFallback = ({ concept }: { concept: Concept }) => (
  <div className="space-y-6">
    <SectionCard>
      <SectionTitle>Ressources Disponibles</SectionTitle>
      <p className="text-slate-600 dark:text-slate-400">Chargement des ressources...</p>
    </SectionCard>
  </div>
);

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const DifficultyBadge = React.memo(({ level }: { level: string }) => (
  <span className={`px-4 py-2 rounded-full font-bold uppercase tracking-wide text-sm ${
    level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
    level === 'Expert' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
    'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
  }`}>
    {level}
  </span>
));
DifficultyBadge.displayName = 'DifficultyBadge';

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
    {icon}
    {children}
  </h2>
);

// ✅ Toast Simple (sans dépendance externe)
const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}
    >
      <Check className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ConceptDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabPanelRef = useRef<HTMLDivElement>(null);
  
  // ✅ Transitions React 18
  const [isPending, startTransition] = useTransition();

  // ✅ State
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // ✅ Memoized Data
  const concept = useMemo(() => 
    ALL_CONCEPTS.find(c => c.id === params.id),
    [params.id]
  );

  const navigation = useMemo(() => 
    concept ? getNavigation(params.id) : { prev: null, next: null },
    [params.id, concept]
  );

  // ✅ Sync avec URL
  useEffect(() => {
    const tab = searchParams.get('tab') as TabId;
    if (tab && TABS.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // ✅ Charger la progression
  useEffect(() => {
    if (concept) {
      const stored = getStoredProgress(concept.id);
      setProgress(stored);
      
      // Vérifier bookmark
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(concept.id));
      
      // Enregistrer la visite
      saveProgress(concept.id, {});
    }
  }, [concept]);

  // ✅ Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return; // Ignorer les raccourcis système
      
      if (e.key === 'ArrowLeft' && navigation.prev) {
        router.push(`/theorie/mouvements/${navigation.prev.id}`);
      }
      if (e.key === 'ArrowRight' && navigation.next) {
        router.push(`/theorie/mouvements/${navigation.next.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigation.prev, navigation.next, router]);

  // ✅ Callbacks
  const handleTabChange = useCallback((tabId: TabId) => {
    startTransition(() => {
      setActiveTab(tabId);
      router.push(`?tab=${tabId}`, { scroll: false });
      
      // Focus management pour a11y
      setTimeout(() => {
        tabPanelRef.current?.focus();
      }, 100);
    });
  }, [router]);

  const handleMarkAsUnderstood = useCallback(() => {
    if (!concept) return;
    
    const newUnderstood = !(progress?.understood || false);
    saveProgress(concept.id, { understood: newUnderstood });
    setProgress(prev => ({ ...prev!, understood: newUnderstood }));
    
    setToast({
      message: newUnderstood ? 'Concept marqué comme compris !' : 'Marqué comme non compris',
      type: 'success'
    });
  }, [concept, progress]);

  const handleBookmark = useCallback(() => {
    if (!concept) return;
    
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      let updated: string[];
      
      if (isBookmarked) {
        updated = bookmarks.filter((id: string) => id !== concept.id);
      } else {
        updated = [...bookmarks, concept.id];
      }
      
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setIsBookmarked(!isBookmarked);
      
      setToast({
        message: isBookmarked ? 'Retiré des favoris' : 'Ajouté aux favoris !',
        type: 'success'
      });
    } catch (error) {
      setToast({
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      });
    }
  }, [concept, isBookmarked]);

  const handleShare = useCallback(async () => {
    if (!concept) return;
    
    const shareData = {
      title: concept.title,
      text: concept.desc,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast({
          message: 'Lien copié dans le presse-papiers !',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [concept]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!concept) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <h1 className="text-6xl font-black text-slate-300 dark:text-slate-700 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Concept non trouvé</h2>
          <Link href="/theorie/mouvements" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" />
            Retour à la référence
          </Link>
        </motion.div>
      </main>
    );
  }

  const { prev, next } = navigation;
  const progressPercentage = progress?.understood ? 100 : 0;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/theorie/mouvements" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour à la référence
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-mono">
              {params.id}
            </span>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-3 gap-8 items-start"
        >
          <div className="md:col-span-2">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {concept.title}
            </h1>
            <p className="text-2xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {concept.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <DifficultyBadge level={concept.level} />
              {concept.iso && concept.iso.length > 0 && (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full"
                >
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{concept.iso.join(', ')}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <SectionCard>
            <h3 className="font-bold mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookmark}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isBookmarked
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Retiré des favoris' : 'Sauvegarder'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Partager
              </motion.button>

              <Link
                href={`/theorie/mouvements/${concept.id}/notes`}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                Mes notes
              </Link>
            </div>
          </SectionCard>
        </motion.div>
      </section>

      {/* ONGLETS */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex gap-8 overflow-x-auto" role="tablist" aria-label="Sections du concept">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* CONTENU ONGLETS */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contenu principal (3/4) */}
          <div 
            ref={tabPanelRef}
            className="md:col-span-3 focus:outline-none"
            tabIndex={-1}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                {...TAB_ANIMATION}
              >
                <Suspense fallback={<TabSkeleton />}>
                  {activeTab === 'description' && <DescriptionTab concept={concept} />}
                  {activeTab === 'specs' && <SpecsTab concept={concept} />}
                  {activeTab === 'applications' && <ApplicationsTab concept={concept} />}
                  {activeTab === 'resources' && <ResourcesTab concept={concept} />}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar (1/4) */}
          <aside className="space-y-6">
            {/* Progression */}
            <SectionCard>
              <h3 className="font-bold mb-3">Progression</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Compréhension</span>
                  <span className="text-blue-600 font-bold">{progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMarkAsUnderstood}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    progress?.understood
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {progress?.understood ? (
                    <>
                      <Check className="w-4 h-4 inline mr-2" />
                      Compris !
                    </>
                  ) : (
                    'Marquer comme compris'
                  )}
                </motion.button>
              </div>
            </SectionCard>

            {/* Quiz Flash */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white cursor-pointer"
            >
              <h3 className="font-bold mb-3">Quiz Flash</h3>
              <p className="text-sm opacity-90 mb-4">Testez vos connaissances sur {concept.title}</p>
              <Link 
                href={`/theorie/mouvements/${concept.id}/quiz`}
                className="w-full block text-center px-4 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Démarrer le Quiz
              </Link>
            </motion.div>

            {/* Dernière visite */}
            {progress?.lastVisited && (
              <SectionCard>
                <h3 className="font-bold mb-2">Dernière visite</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  {new Date(progress.lastVisited).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </SectionCard>
            )}
          </aside>
        </div>
      </section>

      {/* NAVIGATION PRÉCÉDENT/SUIVANT */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <nav className="flex justify-between items-center py-8 border-t border-slate-200 dark:border-slate-700" aria-label="Navigation entre concepts">
          {prev ? (
            <Link 
              href={`/theorie/mouvements/${prev.id}`} 
              prefetch
            >
              <motion.div
                whileHover={{ scale: 1.02, x: -5 }}
                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all max-w-xs group cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm text-slate-500">Précédent</div>
                  <div className="font-semibold">{prev.title}</div>
                </div>
              </motion.div>
            </Link>
          ) : <div />}

          {next ? (
            <Link 
              href={`/theorie/mouvements/${next.id}`} 
              prefetch
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all max-w-xs text-right group cursor-pointer"
              >
                <div>
                  <div className="text-sm text-slate-500">Suivant</div>
                  <div className="font-semibold">{next.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          ) : <div />}
        </nav>
      </section>

      {/* TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
