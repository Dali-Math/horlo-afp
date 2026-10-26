// src/app/actualites/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ExternalLink,
  Clock,
  RefreshCw,
  Crown,
  Award,
  Newspaper,
  TrendingUp,
  Building2,
  Cpu,
  Calendar,
  Gavel,
  BookOpen,
  Radio,
  ArrowRight
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  pubDate: string;
  time: string;
  category: string;
}

// Données initiales pour affichage immédiat sans latence
const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'init-1',
    title: 'Exportations horlogères suisses de septembre 2026: observations et dynamique du marché',
    link: 'https://www.fhs.swiss/fre/statistics.html',
    source: 'Fédération Horlogère Suisse',
    pubDate: new Date().toISOString(),
    time: 'Aujourd’hui',
    category: 'Économie & Industrie'
  },
  {
    id: 'init-2',
    title: 'L’horlogerie suisse stimulée par les prix record atteints par les pièces d’exception',
    link: 'https://www.phillips.com/watches',
    source: 'Phillips Watches Geneva',
    pubDate: new Date().toISOString(),
    time: 'Hier',
    category: 'Enchères & Records'
  },
  {
    id: 'init-3',
    title: 'Foire du Valais & Salons : Les rendez-vous clés de l’horlogerie helvétique',
    link: 'https://www.gphg.org/',
    source: 'GPHG Genève',
    pubDate: new Date().toISOString(),
    time: 'Il y a 2 jours',
    category: 'Événements & Salons'
  },
  {
    id: 'init-4',
    title: 'Manufactures de la Vallée de Joux : Nouveaux développements techniques et calibres',
    link: 'https://www.bilan.ch/economie',
    source: 'Bilan',
    pubDate: new Date().toISOString(),
    time: 'Il y a 3 jours',
    category: 'Innovation & Calibres'
  },
  {
    id: 'init-5',
    title: 'Transmission et savoir-faire : L’excellence des écoles et ateliers horlogers suisses',
    link: 'https://www.letemps.ch/economie/horlogerie',
    source: 'Le Temps',
    pubDate: new Date().toISOString(),
    time: 'Il y a 4 jours',
    category: 'Patrimoine & Histoire'
  },
  {
    id: 'init-6',
    title: 'Watches and Wonders Genève : Les préparatifs de l’édition 2026 en marche',
    link: 'https://www.watchesandwonders.com/',
    source: 'FHH Suisse',
    pubDate: new Date().toISOString(),
    time: 'Cette semaine',
    category: 'Haute Horlogerie'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Toutes les dépêches', icon: Newspaper },
  { id: 'Haute Horlogerie', label: 'Haute Horlogerie', icon: Crown },
  { id: 'Économie & Industrie', label: 'Économie & Industrie', icon: TrendingUp },
  { id: 'Innovation & Calibres', label: 'Innovations & Calibres', icon: Cpu },
  { id: 'Événements & Salons', label: 'Salons & Événements', icon: Calendar },
  { id: 'Enchères & Records', label: 'Enchères & Records', icon: Gavel },
  { id: 'Patrimoine & Histoire', label: 'Patrimoine & Histoire', icon: BookOpen },
];

export default function ActualitesHorlogeresPage() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lastSync, setLastSync] = useState<string>('À l’instant');

  // Chargement des actualités en direct depuis l'API
  const fetchNews = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch('/api/actualites', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setNews(data.items);
          const now = new Date();
          setLastSync(
            now.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
          );
        }
      }
    } catch (err) {
      console.warn('Impossible de synchroniser le flux en direct, conservation du cache local.', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Rafraîchissement automatique toutes les 10 minutes si l'onglet reste ouvert
    const interval = setInterval(() => {
      fetchNews();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtrage intelligent
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredArticle =
    selectedCategory === 'all' && !searchQuery.trim() && filteredNews.length > 0
      ? filteredNews[0]
      : null;

  const displayList = featuredArticle ? filteredNews.slice(1) : filteredNews;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Radio className="w-3.5 h-3.5" />
                Flux d’Actualités en Direct • Presse Suisse & Internationale
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Dépêches &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Actualités Horlogères
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Suivez en temps réel les innovations techniques, les résultats d’enchères,
                les chiffres d’exportation et les créations des manufactures suisses.
                Mise à jour automatique en continu.
              </p>
            </div>

            {/* Bouton de rafraîchissement manuel */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500 dark:text-slate-400">Dernière mise à jour</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{lastSync}</p>
              </div>

              <button
                onClick={() => fetchNews(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                title="Actualiser les dépêches"
              >
                <RefreshCw
                  className={`w-4 h-4 text-amber-500 ${refreshing ? 'animate-spin' : ''}`}
                />
                <span className="text-sm font-medium">
                  {refreshing ? 'Synchronisation...' : 'Actualiser'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ZONE PRINCIPALE : RECHERCHE & FILTRES --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 mb-8">
          {/* Barre de recherche */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une manufacture, un calibre, une innovation, un mot-clé..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Onglets thématiques */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 dark:bg-amber-500 dark:text-slate-950 dark:font-bold'
                      : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Compteur de résultats */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
            <span>
              {filteredNews.length} dépêche{filteredNews.length > 1 ? 's' : ''} disponible
              {filteredNews.length > 1 ? 's' : ''}
              {searchQuery && ` pour « ${searchQuery} »`}
            </span>
            <span className="hidden sm:inline">
              Source : Flux officiel horlogerie suisse (Google News CH / FHS)
            </span>
          </div>
        </div>

        {/* --- DÉPÊCHE À LA UNE (FEATURED ARTICLE) --- */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <a
              href={featuredArticle.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 dark:from-amber-950/20 dark:via-slate-900/80 dark:to-slate-900/60 border-2 border-amber-500/30 hover:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

              <div className="relative z-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Award className="w-3.5 h-3.5" /> À la Une
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {featuredArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.time}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Source :</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {featuredArticle.source}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    Consulter la dépêche complète
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        )}

        {/* --- GRILLE DES ARTICLES --- */}
        {loading && news.length === 0 ? (
          // Skeleton loader
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4"
              >
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 pt-4" />
              </div>
            ))}
          </div>
        ) : displayList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {displayList.map((item, index) => (
                <motion.article
                  key={item.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-amber-500/5 transition-all duration-300 relative"
                >
                  <div>
                    {/* Entête de carte : Catégorie & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    </div>

                    {/* Titre */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus:outline-none"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-3">
                        {item.title}
                      </h3>
                    </a>
                  </div>

                  {/* Pied de carte : Source & Lien externe */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 truncate max-w-[170px]">
                      <Newspaper className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{item.source}</span>
                    </span>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                      title="Lire l'article original"
                    >
                      Lire
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // État vide
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
              Aucune dépêche trouvée
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Aucune actualité ne correspond à vos critères de recherche actuels.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* --- BANNIÈRE D'INFORMATION & MENTIONS SUISSES --- */}
        <div className="mt-16 p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-500/20 text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🇨🇭</span> Veille Horlogère Indépendante
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Les actualités sont agrégées en direct depuis les flux certifiés de l’industrie et de la presse helvétique (Le Temps, Bilan, Tribune de Genève, FHH, FHS). Chaque titre redirige directement vers l’article d’origine de son auteur.
            </p>
          </div>
          <Link
            href="/theorie"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 transition-colors whitespace-nowrap shadow-sm"
          >
            Explorer les cours théoriques
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
