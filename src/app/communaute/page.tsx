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
  Trash2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flag,
  Lock,
  Unlock,
  Key,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

export type CategoryType = 'outillage' | 'emploi' | 'question' | 'vente';

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface PostReport {
  id: string;
  reason: string;
  details?: string;
  reportedAt: string;
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
  reports?: PostReport[];
}

// Aucune fausse annonce pré-remplie : le tableau est 100% réel et propre dès le départ
const STORAGE_KEY = 'horlo_annonces_reelles_v1';
const MY_POSTS_KEY = 'horlo_my_created_posts';
const ADMIN_SESSION_KEY = 'horlo_admin_moderation_logged';

// Mot de passe administrateur sécurisé défini par Dali
const ADMIN_PASSWORDS = ['Dali06052026@'];

// --- FILTRE ANTI-INSULTES, RACISME ET PROPOS HAINEUX ---
const TOXIC_PATTERNS = [
  // Racisme, xénophobie et discriminations
  'negre', 'negresse', 'bougnoul', 'bicot', 'youpin', 'feuj', 'chintoc', 'niacoue',
  'sale noir', 'sale arabe', 'sale juif', 'sale blanc', 'sale etranger', 'sale suisse',
  'sale gitan', 'retourne dans ton pays', 'raton', 'nazi', 'hitler', 'antisemite',
  'islamophobe', 'esclave', 'singe', 'babouin',
  // Insultes graves et vulgarités abusives
  'connard', 'connasse', 'salope', 'pute', 'putain', 'fils de pute', 'fdp', 'encule',
  'enculer', 'batard', 'ntm', 'nique', 'niquer', 'ta race', 'ta mere', 'ta gueule',
  'ferme ta gueule', 'trouduc', 'trou du cul', 'abruti', 'debile', 'mongol', 'cretin',
  'petasse', 'merdeux', 'chier', 'connard', 'pd', 'tapette',
  // Menaces et violences
  'je vais te tuer', 'je vais te crever', 'egorger', 'crever', 'va mourir', 'suicide'
];

function checkToxicContent(text: string): { isClean: boolean; reason?: string } {
  if (!text) return { isClean: true };

  // Normalisation : minuscules, suppression des accents, du leetspeak courant et de la ponctuation
  const normalized = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[@4]/g, 'a')
    .replace(/[3€]/g, 'e')
    .replace(/[1!|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[$5]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ');

  for (const pattern of TOXIC_PATTERNS) {
    const cleanPattern = pattern
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalized.includes(cleanPattern)) {
      return {
        isClean: false,
        reason: 'Contient des termes contraires aux règles de respect et de neutralité horlogère (insultes, racisme ou propos haineux).'
      };
    }
  }

  return { isClean: true };
}

const CATEGORIES: { id: CategoryType | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'Toutes les annonces', icon: MessageSquare },
  { id: 'outillage', label: '🔧 Recherche d’outillage', icon: Wrench },
  { id: 'emploi', label: '💼 Emploi & Stages', icon: Briefcase },
  { id: 'question', label: '❓ Questions d’établi', icon: HelpCircle },
  { id: 'vente', label: '🏷️ Ventes & Échanges', icon: Tag },
];

const REPORT_REASONS = [
  '🚫 Propos haineux, racisme, insultes ou discrimination',
  '⚠️ Arnaque, escroquerie ou vente suspecte',
  '📢 Publicité abusive, spam ou promotion non sollicitée',
  '🔞 Contenu inapproprié, violent ou diffamatoire',
  '❓ Hors-sujet complet (sans rapport avec l’horlogerie)',
];

export default function CommunautePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [myPostIds, setMyPostIds] = useState<string[]>([]);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [reportingPost, setReportingPost] = useState<Post | null>(null);

  // Mode Administrateur / Modération
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [showOnlyReported, setShowOnlyReported] = useState(false);

  // Signalement
  const [reportReason, setReportReason] = useState(REPORT_REASONS[0]);
  const [reportDetails, setReportDetails] = useState('');

  // Réponses & commentaires
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: { author: string; text: string } }>({});
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // Formulaire pour publier une nouvelle annonce
  const [formCategory, setFormCategory] = useState<CategoryType>('outillage');
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formError, setFormError] = useState('');

  // Charger les annonces et la session admin
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

    try {
      const mySaved = localStorage.getItem(MY_POSTS_KEY);
      if (mySaved) {
        setMyPostIds(JSON.parse(mySaved));
      }
    } catch {
      setMyPostIds([]);
    }

    try {
      const adminLogged = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (adminLogged === 'true') {
        setIsAdmin(true);
      }
    } catch {
      setIsAdmin(false);
    }
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    } catch {
      // Ignorer si stockage plein
    }
  };

  const showToast = (text: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // --- CRÉATION D'ANNONCE AVEC FILTRE ANTI-HAINE & ANTI-RACISME ---
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle.trim() || !formAuthor.trim() || !formDescription.trim()) {
      setFormError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Contrôle automatique anti-insultes et anti-racisme
    const fullText = `${formTitle} ${formAuthor} ${formLocation} ${formDescription}`;
    const check = checkToxicContent(fullText);
    if (!check.isClean) {
      setFormError('🚫 Publication refusée : Votre annonce contient des propos contraires à notre charte de respect (insultes, haine, discrimination). Merci de modifier votre texte.');
      showToast('Publication refusée : Propos inappropriés détectés.', 'error');
      return;
    }

    const newPostId = `post-${Date.now()}`;
    const newPost: Post = {
      id: newPostId,
      category: formCategory,
      title: formTitle.trim(),
      author: formAuthor.trim(),
      location: formLocation.trim() || 'Suisse',
      contact: formContact.trim() || 'contact.horlogeries@gmail.com',
      description: formDescription.trim(),
      createdAt: 'À l’instant',
      comments: [],
      reports: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Mémoriser que cet utilisateur est l'auteur
    const updatedMyPosts = [...myPostIds, newPostId];
    setMyPostIds(updatedMyPosts);
    try {
      localStorage.setItem(MY_POSTS_KEY, JSON.stringify(updatedMyPosts));
    } catch {}

    setIsModalOpen(false);

    // Réinitialisation
    setFormTitle('');
    setFormAuthor('');
    setFormLocation('');
    setFormContact('');
    setFormDescription('');
    setFormError('');

    showToast('Votre annonce a été publiée avec succès !', 'success');
  };

  // --- SUPPRESSION D'ANNONCE (ADMIN OU AUTEUR) ---
  const handleDeletePost = (postId: string) => {
    const isAuthor = myPostIds.includes(postId);
    const confirmMessage = isAdmin
      ? '🛡️ Action Modérateur : Voulez-vous supprimer définitivement cette annonce ?'
      : 'Voulez-vous supprimer votre annonce ?';

    if (confirm(confirmMessage)) {
      const updated = posts.filter((p: Post) => p.id !== postId);
      savePosts(updated);
      showToast('L’annonce a été supprimée.', 'warning');
    }
  };

  // --- AJOUT DE COMMENTAIRE AVEC FILTRE ANTI-HAINE ---
  const handleAddComment = (postId: string) => {
    const input = replyInputs[postId];
    if (!input || !input.text.trim()) {
      showToast('Veuillez écrire un message.', 'warning');
      return;
    }

    // Contrôle anti-insultes et anti-racisme
    const commentText = `${input.author} ${input.text}`;
    const check = checkToxicContent(commentText);
    if (!check.isClean) {
      showToast('🚫 Réponse refusée : Propos injurieux ou haineux détectés.', 'error');
      return;
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: input.author.trim() || 'Visiteur horloger',
      text: input.text.trim(),
      createdAt: 'À l’instant'
    };

    const updated = posts.map((p: Post) => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });

    savePosts(updated);
    setReplyInputs((prev: any) => ({ ...prev, [postId]: { author: '', text: '' } }));
    setExpandedComments((prev: any) => ({ ...prev, [postId]: true }));
    showToast('Votre réponse a été ajoutée.', 'success');
  };

  // --- SUPPRESSION DE COMMENTAIRE (ADMIN EXCLUSIF) ---
  const handleDeleteComment = (postId: string, commentId: string) => {
    if (!isAdmin) return;
    if (confirm('🛡️ Action Modérateur : Supprimer ce commentaire ?')) {
      const updated = posts.map((p: Post) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter((c: Comment) => c.id !== commentId)
          };
        }
        return p;
      });
      savePosts(updated);
      showToast('Commentaire supprimé par la modération.', 'warning');
    }
  };

  // --- GESTION DES SIGNALEMENTS ---
  const handleOpenReportModal = (post: Post) => {
    setReportingPost(post);
    setReportReason(REPORT_REASONS[0]);
    setReportDetails('');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingPost) return;

    const newReport: PostReport = {
      id: `rep-${Date.now()}`,
      reason: reportReason,
      details: reportDetails.trim() || undefined,
      reportedAt: 'Aujourd’hui'
    };

    const updated = posts.map((p: Post) => {
      if (p.id === reportingPost.id) {
        const currentReports = p.reports || [];
        return { ...p, reports: [...currentReports, newReport] };
      }
      return p;
    });

    savePosts(updated);
    setReportingPost(null);
    showToast('Merci. Votre signalement a été transmis à l’administrateur pour vérification.', 'success');
  };

  // Ignorer / Effacer les signalements d'une annonce (Admin)
  const handleDismissReports = (postId: string) => {
    if (!isAdmin) return;
    const updated = posts.map((p: Post) => {
      if (p.id === postId) {
        return { ...p, reports: [] };
      }
      return p;
    });
    savePosts(updated);
    showToast('Signalements effacés. L’annonce est maintenue.', 'success');
  };

  // --- CONNEXION & DÉCONNEXION ADMIN ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPasswordError('');

    const cleanInput = adminPasswordInput.trim();
    if (ADMIN_PASSWORDS.includes(cleanInput)) {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAdminModalOpen(false);
      setAdminPasswordInput('');
      showToast('Mode Modérateur Dali activé avec succès.', 'success');
    } else {
      setAdminPasswordError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setShowOnlyReported(false);
    showToast('Déconnexion du mode modérateur.', 'warning');
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev: any) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Calcul du nombre d'annonces signalées
  const totalReportedPosts = useMemo(() => {
    return posts.filter((p: Post) => p.reports && p.reports.length > 0).length;
  }, [posts]);

  // Filtrage combiné : recherche + catégorie + filtre signalements admin
  const filteredPosts = useMemo(() => {
    return posts.filter((p: Post) => {
      if (showOnlyReported && (!p.reports || p.reports.length === 0)) {
        return false;
      }

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
  }, [posts, selectedCategory, searchQuery, showOnlyReported]);

  const getCategoryBadge = (cat: CategoryType) => {
    switch (cat) {
      case 'outillage':
        return { label: 'Recherche Outillage', bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-600/60' };
      case 'emploi':
        return { label: 'Emploi & Stage', bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-600/60' };
      case 'question':
        return { label: 'Question d’établi', bg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-600/60' };
      case 'vente':
        return { label: 'Vente / Échange', bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-600/60' };
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
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl font-bold shadow-2xl flex items-center gap-3 text-sm border ${
              toastMessage.type === 'error'
                ? 'bg-rose-600 text-white border-rose-400'
                : toastMessage.type === 'warning'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-emerald-600 text-white border-emerald-400'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            ) : toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{toastMessage.text}</span>
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
                Le tableau d’affichage libre de la communauté horlogère suisse : recherchez un outillage (brucelles, potence), proposez ou cherchez un stage/emploi, ou posez vos questions d’établi dans un cadre sain et modéré.
              </p>
            </div>

            {/* Boutons d'Action Header */}
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              {/* Bouton Accès Modérateur */}
              {isAdmin ? (
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Modérateur Actif (Dali)</span>
                  <button
                    onClick={handleAdminLogout}
                    className="ml-2 text-xs text-rose-500 hover:text-rose-600 underline font-semibold"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-600 transition-all"
                  title="Accès Modérateur HorloLearn"
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>Modération / Admin</span>
                </button>
              )}

              {/* Bouton Publier une annonce */}
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

      {/* --- ZONE PRINCIPALE --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* --- BANNIÈRE D'ESPACE MODÉRATEUR (SI CONNECTÉ ADMIN) --- */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-slate-900 dark:text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>Panneau de Contrôle & Modération Dali</span>
                  {totalReportedPosts > 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                      🚨 {totalReportedPosts} annonce{totalReportedPosts > 1 ? 's' : ''} signalée{totalReportedPosts > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      ✓ Aucun signalement en attente
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Droits actifs : suppression définitive des annonces, modération des commentaires et validation des signalements.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {totalReportedPosts > 0 && (
                <button
                  onClick={() => setShowOnlyReported(!showOnlyReported)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    showOnlyReported
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 hover:bg-rose-200'
                  }`}
                >
                  {showOnlyReported ? 'Afficher toutes les annonces' : `🚨 Filtrer les signalements (${totalReportedPosts})`}
                </button>
              )}
              <button
                onClick={handleAdminLogout}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Quitter mode admin
              </button>
            </div>
          </motion.div>
        )}

        {/* --- RECHERCHE & FILTRES --- */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md dark:shadow-2xl dark:shadow-black/60 space-y-4 ring-1 ring-slate-900/5 dark:ring-white/10">
          {/* Barre de Recherche */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot-clé (ex: brucelle, stage, travail, Bergeon, ETA 6497, Genève...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
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

          {/* Filtres par Catégorie */}
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
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md font-bold'
                      : 'bg-slate-100 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60 gap-2">
            <span>
              {filteredPosts.length} annonce{filteredPosts.length > 1 ? 's' : ''} disponible{filteredPosts.length > 1 ? 's' : ''}
              {searchQuery && ` pour « ${searchQuery} »`}
              {showOnlyReported && ' (Filtre signalements actif)'}
            </span>
            <span>🇨🇭 Entraide respectueuse et directe entre horlogers</span>
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
                const isAuthor = myPostIds.includes(post.id);
                const hasReports = post.reports && post.reports.length > 0;

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 transition-all duration-300 ring-1 shadow-md hover:shadow-xl dark:shadow-2xl dark:shadow-black/70 ${
                      hasReports && isAdmin
                        ? 'border-rose-400 dark:border-rose-600 ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-amber-500/50 dark:hover:border-amber-400 ring-slate-900/5 dark:ring-white/10'
                    }`}
                  >
                    {/* Alerte Admin si l'annonce a été signalée */}
                    {hasReports && isAdmin && (
                      <div className="mb-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="font-extrabold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                            <span>Signalée {post.reports!.length} fois par la communauté</span>
                          </div>
                          <div className="text-rose-600 dark:text-rose-400">
                            <strong>Motifs :</strong> {post.reports!.map((r) => r.reason).join(', ')}
                            {post.reports!.some((r) => r.details) && (
                              <span className="italic block mt-0.5">
                                Précisions : « {post.reports!.filter((r) => r.details).map((r) => r.details).join(' | ')} »
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleDismissReports(post.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Valider (Conforme)</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Avertissement discret pour les visiteurs si l'annonce a plusieurs signalements */}
                    {hasReports && !isAdmin && post.reports!.length >= 2 && (
                      <div className="mb-4 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>Cette annonce a fait l’objet de signalements et fait l’objet d’une vérification par la modération.</span>
                      </div>
                    )}

                    {/* Entête Carte */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                          {badge.label}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          {post.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {post.createdAt}
                        </span>

                        {/* Actions Modération / Suppression / Signalement */}
                        {isAdmin ? (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            title="Supprimer définitivement cette annonce (Action Modérateur)"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white border border-rose-500/30 text-xs font-bold transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Supprimer (Admin)</span>
                          </button>
                        ) : isAuthor ? (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            title="Supprimer mon annonce"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600 text-xs border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Supprimer mon annonce</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenReportModal(post)}
                            title="Signaler cette annonce si elle ne respecte pas les règles"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 text-xs transition-all"
                          >
                            <Flag className="w-3.5 h-3.5" />
                            <span>Signaler</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Titre */}
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                      {post.description}
                    </p>

                    {/* Méta Auteur & Contact */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700/80 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-xs">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Bouton Contacter */}
                        {post.contact && (
                          <a
                            href={`mailto:${post.contact}?subject=${encodeURIComponent(`[HorloLearn] Réponse à votre annonce : ${post.title}`)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:text-amber-600 dark:hover:text-amber-400 transition-colors border border-slate-300 dark:border-slate-600"
                          >
                            <Mail className="w-3.5 h-3.5 text-amber-500" />
                            <span>Contacter ({post.contact})</span>
                          </a>
                        )}

                        {/* Bouton Discuter */}
                        <button
                          onClick={() => toggleComments(post.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold hover:bg-amber-100 dark:hover:bg-amber-500/25 transition-colors border border-amber-300 dark:border-amber-500/40"
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

                    {/* Zone de discussion / Réponses dépliable */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/80 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Réponses & Échanges ({post.comments.length})
                          </h4>
                          {isAdmin && (
                            <span className="text-[11px] text-amber-500 font-semibold">
                              (Mode Modérateur : vous pouvez supprimer les commentaires inappropriés)
                            </span>
                          )}
                        </div>

                        {/* Liste des commentaires */}
                        {post.comments.length > 0 ? (
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-xs sm:text-sm"
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {comment.author}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-[11px]">{comment.createdAt}</span>
                                    {isAdmin && (
                                      <button
                                        onClick={() => handleDeleteComment(post.id, comment.id)}
                                        title="Supprimer ce commentaire (Admin)"
                                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">
                            Aucune réponse pour le moment. Soyez le premier à répondre ou à donner un conseil d’établi !
                          </p>
                        )}

                        {/* Formulaire pour répondre */}
                        <div className="pt-3 space-y-2">
                          <div className="grid sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={replyState.author}
                              onChange={(e) =>
                                setReplyInputs((prev: any) => ({
                                  ...prev,
                                  [post.id]: { ...replyState, author: e.target.value }
                                }))
                              }
                              placeholder="Votre prénom / nom"
                              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              value={replyState.text}
                              onChange={(e) =>
                                setReplyInputs((prev: any) => ({
                                  ...prev,
                                  [post.id]: { ...replyState, text: e.target.value }
                                }))
                              }
                              placeholder="Votre réponse ou proposition..."
                              className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
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
              /* --- ÉTAT VIDE PROPRE --- */
              <div className="text-center py-16 px-4 bg-white dark:bg-[#0f1422] rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-600 ring-1 ring-white/5">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {showOnlyReported ? 'Aucune annonce signalée !' : 'Le tableau d’affichage est ouvert !'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  {showOnlyReported
                    ? 'Toutes les annonces sont conformes aux règles de la communauté HorloLearn.'
                    : 'Aucune annonce pour le moment. Vous cherchez un outillage (brucelles, etc.), un stage ou un travail horloger, ou vous avez une question d’établi ? Publiez la première annonce !'}
                </p>
                {!showOnlyReported && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Publier la première annonce</span>
                  </button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* --- MODALE : PUBLIER UNE ANNONCE (AVEC FILTRE DE SÉCURITÉ) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative text-slate-900 dark:text-white ring-1 ring-white/10"
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
                    Recherche d’outils, emploi & stage, questions d’établi ou vente
                  </p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Choix de la catégorie */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Type d’annonce *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="outillage">🔧 Recherche d’outillage & matériel (ex: brucelles, porte-mouvement)</option>
                    <option value="emploi">💼 Emploi, Stage & Apprentissage (ex: cherche travail, cherche stage)</option>
                    <option value="question">❓ Question d’établi & Entraide (ex: panne calibre, huilage)</option>
                    <option value="vente">🏷️ Vente ou Don de matériel d’occasion</option>
                  </select>
                </div>

                {/* Titre */}
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Auteur & Ville */}
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Contact */}
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ce contact sera affiché sur votre annonce pour que les membres puissent vous joindre.
                  </p>
                </div>

                {/* Description */}
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {/* Engagement de respect */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                  ℹ️ <strong>Règle de communauté :</strong> Les insultes, le racisme et tout contenu discriminatoire sont strictement interdits et automatiquement rejetés.
                </div>

                {/* Actions */}
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

      {/* --- MODALE : SIGNALER UNE ANNONCE (POUR LA COMMUNAUTÉ) --- */}
      <AnimatePresence>
        {reportingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Signaler cette annonce</h3>
                    <p className="text-xs text-slate-400">
                      Aidez-nous à préserver un espace horloger bienveillant et professionnel
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setReportingPost(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                <strong>Annonce concernée :</strong> « {reportingPost.title} » par {reportingPost.author}
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Motif principal du signalement *
                  </label>
                  <div className="space-y-2">
                    {REPORT_REASONS.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          reportReason === reason
                            ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white font-semibold'
                            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-500/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reportReason"
                          checked={reportReason === reason}
                          onChange={() => setReportReason(reason)}
                          className="accent-amber-500"
                        />
                        <span>{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Précisions pour la modération (facultatif)
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Expliquez brièvement pourquoi cette annonce pose problème..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingPost(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Envoyer le signalement</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODALE : CONNEXION MODÉRATEUR / ADMIN DALI --- */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Espace Modérateur Dali</h3>
                    <p className="text-xs text-slate-400">
                      Contrôle total sur les annonces et signalements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Connectez-vous pour pouvoir supprimer n’importe quelle annonce inappropriée, modérer les commentaires et traiter les signalements des membres.
              </p>

              {adminPasswordError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{adminPasswordError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Mot de passe Administrateur
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      autoFocus
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="Entrez votre mot de passe..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Espace sécurisé réservé exclusivement à l’administrateur HorloLearn.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Déverrouiller la modération</span>
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
