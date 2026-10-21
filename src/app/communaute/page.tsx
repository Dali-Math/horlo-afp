// src/app/communaute/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Wrench,
  Briefcase,
  HelpCircle,
  Tag,
  Plus,
  Search,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Trash2
} from 'lucide-react';

export type CategoryType = 'outillage' | 'emploi' | 'question' | 'vente';

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  category: CategoryType;
  title: string;
  author: string;
  location: string;
  contact: string;
  description: string;
  createdAt: string;
  comments: Comment[];
}

const STORAGE_KEY = 'horlo_annonces_reelles_v1';

const CATEGORIES: { id: CategoryType | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'Toutes les annonces', icon: MessageSquare },
  { id: 'outillage', label: '🔧 Recherche d’outillage', icon: Wrench },
  { id: 'emploi', label: '💼 Emploi & Stages', icon: Briefcase },
  { id: 'question', label: '❓ Questions d’établi', icon: HelpCircle },
  { id: 'vente', label: '🏷️ Ventes & Échanges', icon: Tag },
];

export default function CommunautePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: { author: string; text: string } }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formCategory, setFormCategory] = useState<CategoryType>('outillage');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Charger les vraies annonces publiées par les utilisateurs
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPosts(parsed);
        }
      }
    } catch {
      setPosts([]);
    }
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    } catch {
      // Ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formAuthor.trim() || !formDescription.trim()) {
      showToast('Veuillez remplir les champs obligatoires.');
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      category: formCategory,
      title: formTitle.trim(),
      author: formAuthor.trim(),
      location: formLocation.trim() || 'Suisse',
      contact: formContact.trim() || 'contact.horlogeries@gmail.com',
      description: formDescription.trim(),
      createdAt: 'À l’instant',
      comments: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setIsModalOpen(false);

    setFormTitle('');
    setFormAuthor('');
    setFormLocation('');
    setFormContact('');
    setFormDescription('');

    showToast('Votre annonce a été publiée avec succès !');
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Voulez-vous supprimer cette annonce ?')) {
      const updated = posts.filter((p) => p.id !== postId);
      savePosts(updated);
      showToast('Annonce supprimée.');
    }
  };

  const handleAddComment = (postId: string) => {
    const input = replyInputs[postId];
    if (!input || !input.text.trim()) {
      showToast('Veuillez écrire un message.');
      return;
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: input.author.trim() || 'Visiteur',
      text: input.text.trim(),
      createdAt: 'À l’instant'
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });

    savePosts(updated);
    setReplyInputs((prev) => ({ ...prev, [postId]: { author: '', text: '' } }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    showToast('Votre réponse a été ajoutée.');
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  const getCategoryBadge = (cat: CategoryType) => {
    switch (cat) {
      case 'outillage':
        return { label: 'Recherche Outillage', bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
      case 'emploi':
        return { label: 'Emploi & Stage', bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
      case 'question':
        return { label: 'Question d’établi', bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
      case 'vente':
        return { label: 'Vente / Échange', bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl flex items-center gap-3 text-sm border border-amber-400"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span>🇨🇭</span>
                Espace Communauté & Petites Annonces de l’Établi
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Annonces, Entraide &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Discussions Horlogères
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Le tableau d’affichage libre de la communauté : vous cherchez un outil (brucelles, porte-mouvement), vous recherchez un stage ou un travail horloger, ou vous avez une question sur un calibre ? Publiez votre annonce et échangez librement.
              </p>
            </div>

            {/* Bouton Publier une annonce */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span>Publier une annonce / question</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ZONE PRINCIPALE : RECHERCHE & FILTRES --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot-clé (ex: brucelle, stage, travail, Bergeon, ETA 6497, Genève...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              {filteredPosts.length} annonce{filteredPosts.length > 1 ? 's' : ''} disponible
              {filteredPosts.length > 1 ? 's' : ''}
              {searchQuery && ` pour « ${searchQuery} »`}
            </span>
            <span>🇨🇭 Entraide directe entre horlogers, apprentis et passionnés</span>
          </div>
        </div>

        {/* --- LISTE DES ANNONCES & DISCUSSIONS --- */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const badge = getCategoryBadge(post.category);
                const isExpanded = !!expandedComments[post.id];
                const replyState = replyInputs[post.id] || { author: '', text: '' };

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                          {badge.label}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          {post.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {post.createdAt}
                        </span>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          title="Supprimer cette annonce"
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-xs">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {post.contact && (
                          <a
                            href={`mailto:${post.contact}?subject=${encodeURIComponent(`[HorloLearn] Réponse à votre annonce : ${post.title}`)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:text-amber-600 dark:hover:text-amber-400 transition-colors border border-slate-200 dark:border-slate-700"
                          >
                            <Mail className="w-3.5 h-3.5 text-amber-500" />
                            <span>Contacter ({post.contact})</span>
                          </a>
                        )}

                        <button
                          onClick={() => toggleComments(post.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold hover:bg-amber-100 transition-colors border border-amber-200 dark:border-amber-500/20"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>
                            {post.comments.length > 0
                              ? `Discuter (${post.comments.length})`
                              : 'Répondre'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Réponses & Échanges ({post.comments.length})
                        </h4>

                        {post.comments.length > 0 ? (
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm"
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {comment.author}
                                  </span>
                                  <span className="text-slate-400 text-[11px]">{comment.createdAt}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">
                            Aucune réponse pour le moment. Soyez le premier à répondre ou à donner un conseil !
                          </p>
                        )}

                        <div className="pt-3 space-y-2">
                          <div className="grid sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={replyState.author}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [post.id]: { ...replyState, author: e.target.value }
                                }))
                              }
                              placeholder="Votre prénom / nom"
                              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              value={replyState.text}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [post.id]: { ...replyState, text: e.target.value }
                                }))
                              }
                              placeholder="Votre réponse ou proposition..."
                              className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div className="text-right">
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-xs shadow-sm transition-all"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Envoyer ma réponse</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              /* --- ÉTAT VIDE PROPRE (AUCUNE FAUSSE ANNONCE) --- */
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  Le tableau d’affichage est ouvert !
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  Aucune annonce pour le moment. Vous cherchez un outil (brucelles, etc.), vous cherchez un stage ou un travail horloger, ou vous avez une question d'établi ? Publiez la première annonce !
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  <span>Publier la première annonce</span>
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* --- MODALE : PUBLIER UNE ANNONCE OU QUESTION --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg p-1"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Publier sur la Communauté</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Recherche d'outils, emploi & stage, questions d’établi ou vente
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Type d’annonce *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="outillage">🔧 Recherche d’outillage & matériel (ex: brucelles, porte-mouvement)</option>
                    <option value="emploi">💼 Emploi, Stage & Apprentissage (ex: cherche travail, cherche stage)</option>
                    <option value="question">❓ Question d’établi & Entraide (ex: panne calibre, huilage)</option>
                    <option value="vente">🏷️ Vente ou Don de matériel d’occasion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Titre clair de votre annonce *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ex: Cherche brucelles Dumont No. 3 ou No. 5 pour atelier..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Votre Prénom ou Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="Ex: Marc"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Ville / Canton
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="Ex: Genève (GE), Vaud..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Moyen de contact (Email ou Téléphone) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="Ex: monemail@exemple.ch ou +41 79 ..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ce contact sera affiché sur votre annonce pour que les membres puissent vous joindre.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Description détaillée *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Précisez votre demande, vos disponibilités, les détails techniques ou les conditions d'échange..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publier mon annonce</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
