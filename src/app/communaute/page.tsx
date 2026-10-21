// src/app/communaute/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Wrench,
  BookOpen,
  Heart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  role: string;
  avatarColor: string;
  category: 'Technique' | 'Outillage' | 'Huilage' | 'Examens' | 'Restauration';
  timeAgo: string;
  preview: string;
  solution?: string;
  repliesCount: number;
  likesCount: number;
  isResolved: boolean;
  tags: string[];
}

interface ClassifiedAd {
  id: string;
  type: 'Vente' | 'Recherche' | 'Partage' | 'Groupe';
  title: string;
  author: string;
  location: string;
  price?: string;
  timeAgo: string;
  description: string;
  contactEmail: string;
}

const INITIAL_DISCUSSIONS: Discussion[] = [
  {
    id: 'disc-1',
    title: 'Échappement suisse sur ETA 6497 : comment corriger un ébat de dard trop serré ?',
    author: 'Mathieu D.',
    role: 'Apprenti Horloger CFC (Genève)',
    avatarColor: 'from-amber-500 to-amber-700',
    category: 'Technique',
    timeAgo: 'Il y a 2 h',
    preview:
      'Lors du contrôle de l’échappement sur le plateau de balancier, je constate que le dard frotte légèrement sur le croissant lors du passage. Quelle est la méthode exacte pour retoucher sans déformer la fourchette d’ancre ?',
    solution:
      'Vérifie d’abord la planéité de ton ancre et l’axe de balancier. Si l’ébat est insuffisant, utilise un brunissoir ou retouche délicatement l’extrémité du dard au cabron sans jamais forcer sur les bras.',
    repliesCount: 7,
    likesCount: 24,
    isResolved: true,
    tags: ['ETA 6497', 'Échappement', 'Ébat de dard', 'Atelier']
  },
  {
    id: 'disc-2',
    title: 'Protocole Moebius 9415 vs 9010 : lubrification optimale des levées d’ancre',
    author: 'Céline V.',
    role: 'Diplômée AFP Horlogerie (Vallée de Joux)',
    avatarColor: 'from-emerald-500 to-teal-700',
    category: 'Huilage',
    timeAgo: 'Il y a 5 h',
    preview:
      'J’ai remarqué des avis divergents sur l’application de la 9415. Est-il préférable d’huiler directement le plan d’impulsion de la levée de sortie ou de passer par les dents de la roue d’échappement en mouvement ?',
    solution:
      'La norme officielle suisse recommande d’huiler par le plan d’impulsion de la levée de sortie (1/3 de la surface) puis de faire tourner la roue d’échappement de 5 dents pour répartir uniformément le film.',
    repliesCount: 12,
    likesCount: 38,
    isResolved: true,
    tags: ['Moebius 9415', 'Huilage', 'Levées d’ancre', 'Précision']
  },
  {
    id: 'disc-3',
    title: 'Brucelles pour le spiral : Dumont No. 3 ou No. 5 ? Retours d’expérience',
    author: 'Alexandre B.',
    role: 'Passionné & Restaurateur (Neuchâtel)',
    avatarColor: 'from-indigo-500 to-purple-700',
    category: 'Outillage',
    timeAgo: 'Hier',
    preview:
      'Pour redresser une spire extérieure de spiral Breguet sans la marquer, quel alliage recommandez-vous entre l’acier antimagnétique Dumoxel et le titane ?',
    repliesCount: 9,
    likesCount: 19,
    isResolved: false,
    tags: ['Brucelles Dumont', 'Spiral', 'Outillage Bergeon', 'Régalage']
  },
  {
    id: 'disc-4',
    title: 'Formules de calcul de rouage et rapport de transmission pour l’examen théorique',
    author: 'Julien M.',
    role: 'Candidat Examen Fédéral (La Chaux-de-Fonds)',
    avatarColor: 'from-blue-500 to-cyan-700',
    category: 'Examens',
    timeAgo: 'Il y a 2 jours',
    preview:
      'Je prépare l’épreuve écrite sur le calcul des alternances (A/h) en fonction du nombre de dents du barillet, roue de centre, roue moyenne et roue des secondes. Avez-vous une fiche mémo type ?',
    solution:
      'La formule est : A/h = 2 × Z(Roue de centre) × Z(Roue moyenne) × Z(Roue des secondes) × Z(Roue d’échappement) / (z1 × z2 × z3). Une fiche complète est disponible dans la section Théorie d’HorloLearn !',
    repliesCount: 15,
    likesCount: 45,
    isResolved: true,
    tags: ['Calculs', 'Rouage', 'Examen Théorique', 'Alternances']
  },
  {
    id: 'disc-5',
    title: 'Polissage de boîte et conservation des chanfreins d’origine : quelle technique ?',
    author: 'Laurent K.',
    role: 'Artisan Horloger Indépendant (Bienne)',
    avatarColor: 'from-amber-600 to-yellow-700',
    category: 'Restauration',
    timeAgo: 'Il y a 3 jours',
    preview:
      'Sur une pièce vintage des années 70, les chanfreins du boîtier ont été légèrement adoucis par un polissage passé. Comment retrouver l’arête vive au lapidaire sans réduire excessivement la matière ?',
    repliesCount: 6,
    likesCount: 17,
    isResolved: false,
    tags: ['Habillage', 'Boîtier', 'Chanfreins', 'Lapidaire']
  }
];

const INITIAL_ADS: ClassifiedAd[] = [
  {
    id: 'ad-1',
    type: 'Vente',
    title: 'Porte-mouvement réversible Bergeon 4040 neuf',
    author: 'Nicolas F.',
    location: 'Genève (GE)',
    price: '45 CHF',
    timeAgo: 'Hier',
    description:
      'Jamais utilisé, en boîte d’origine. Convient pour calibres 8 ¾’’’ à 19’’’. Idéal pour établi d’apprentissage.',
    contactEmail: 'contact.horlogeries@gmail.com'
  },
  {
    id: 'ad-2',
    type: 'Recherche',
    title: 'Tige de remontoir originale pour calibre Unitas 6498-1',
    author: 'David P.',
    location: 'Lausanne (VD)',
    price: 'À convenir',
    timeAgo: 'Il y a 2 jours',
    description:
      'Recherche tige filetée en pas standard 0.90 mm. Échange possible contre fournitures ETA 2824.',
    contactEmail: 'contact.horlogeries@gmail.com'
  },
  {
    id: 'ad-3',
    type: 'Partage',
    title: 'Fiches techniques d’atelier ETA 2824 & 7750 (PDF annotés)',
    author: 'Équipe HorloLearn',
    location: 'Suisse Romande',
    price: 'Gratuit',
    timeAgo: 'Cette semaine',
    description:
      'Schémas d’assemblage officiels, nomenclature complète et tableau de lubrification complet téléchargeable librement.',
    contactEmail: 'contact.horlogeries@gmail.com'
  },
  {
    id: 'ad-4',
    type: 'Groupe',
    title: 'Groupe de révision pratique examen AFP / CFC le samedi',
    author: 'Sarah L.',
    location: 'Genève (Plainpalais)',
    price: 'Entraide libre',
    timeAgo: 'Il y a 4 jours',
    description:
      'Groupe de 4 élèves se réunissant le samedi matin pour s’entraîner au chronométrage du démontage/remontage complet.',
    contactEmail: 'contact.horlogeries@gmail.com'
  }
];

const SCHOOLS = [
  {
    name: 'École d’Horlogerie de Genève (CFPT)',
    city: 'Genève (GE)',
    canton: 'Genève',
    desc: 'Fondée en 1824, formation d’excellence menant aux CFC d’Horloger et d’Horloger Praticien.',
    link: 'https://www.ge.ch/ecole-horlogerie-geneve',
    type: 'Formation Publique d’État'
  },
  {
    name: 'École Technique de la Vallée de Joux (ETVJ)',
    city: 'Le Sentier (VD)',
    canton: 'Vaud',
    desc: 'Au cœur du berceau des grandes complications (Audemars Piguet, Jaeger-LeCoultre, Breguet).',
    link: 'https://etvj.ch',
    type: 'Centre d’Excellence Complications'
  },
  {
    name: 'CIFOM – Pôle Horloger des Montagnes Neuchâteloises',
    city: 'La Chaux-de-Fonds / Le Locle (NE)',
    canton: 'Neuchâtel',
    desc: 'Site classé UNESCO, transmission séculaire de la mécanique de précision et restauration.',
    link: 'https://cifom.ch',
    type: 'Patrimoine & Haute Horlogerie'
  },
  {
    name: 'Centre de Formation Professionnelle Bienne (CFP Bienne)',
    city: 'Bienne (BE)',
    canton: 'Berne',
    desc: 'Centre bilingue français-allemand au cœur de la capitale horlogère mondiale (Rolex, Omega, Swatch).',
    link: 'https://www.cfp-biel-bienne.ch',
    type: 'Pôle Industriel & Bilingue'
  }
];

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'annonces' | 'ecoles' | 'planning'>('discussions');
  const [discussions, setDiscussions] = useState<Discussion[]>(INITIAL_DISCUSSIONS);
  const [ads] = useState<ClassifiedAd[]>(INITIAL_ADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [resolvedOnly, setResolvedOnly] = useState<boolean>(false);
  const [likes, setLikes] = useState<{ [id: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Formulaire pour poser une question
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Technique' | 'Outillage' | 'Huilage' | 'Examens' | 'Restauration'>('Technique');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContent, setNewContent] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleLike = (id: string) => {
    const isLiked = !!likes[id];
    setLikes((prev) => ({ ...prev, [id]: !isLiked }));
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return { ...d, likesCount: isLiked ? d.likesCount - 1 : d.likesCount + 1 };
        }
        return d;
      })
    );
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) {
      showToast('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    const created: Discussion = {
      id: `disc-${Date.now()}`,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      role: newRole.trim() || 'Membre HorloLearn',
      avatarColor: 'from-amber-600 to-yellow-600',
      category: newCategory,
      timeAgo: 'À l’instant',
      preview: newContent.trim(),
      repliesCount: 0,
      likesCount: 1,
      isResolved: false,
      tags: [newCategory, 'Atelier', 'Communauté']
    };

    setDiscussions([created, ...discussions]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewAuthor('');
    setNewRole('');
    setNewContent('');
    showToast('Votre question d’établi a été publiée avec succès !');
  };

  const filteredDiscussions = useMemo(() => {
    return discussions.filter((d) => {
      const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
      const matchResolved = !resolvedOnly || d.isResolved;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.preview.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchResolved && matchQuery;
    });
  }, [discussions, selectedCategory, resolvedOnly, searchQuery]);

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
                Le Cercle Horloger • Transmission & Entraide d’Établi
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                La Communauté &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Le Cercle de l’Établi
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Le point de rencontre des apprentis horlogers, diplômés suisses, restaurateurs et passionnés de micromécanique. Posez vos questions d’établi, partagez vos solutions et découvrez le réseau horloger helvétique.
              </p>
            </div>

            {/* Bouton Poser une Question */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Poser une question à l’établi</span>
              </button>
            </div>
          </div>

          {/* Chiffres clés de la Communauté */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">1'480+</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Passionnés & Apprentis</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">340+</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Problèmes d’établi résolus</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">4 Écoles</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Partenaires en Suisse</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black">&lt; 2 h</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Délai d’entraide moyen</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION DES 4 ESPACES --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'discussions'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Forum de l’Établi ({discussions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('annonces')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'annonces'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Petites Annonces Outillage ({ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ecoles')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'ecoles'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Écoles & Pôles Suisses</span>
          </button>

          <button
            onClick={() => setActiveTab('planning')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'planning'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Espace Documents & Planning</span>
          </button>
        </div>
      </div>

      {/* --- CONTENU DE L'ONGLET ACTIF --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- ONGLET 1 : FORUM DE L'ÉTABLI --- */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {/* Filtres & Recherche */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher une panne, un calibre (ETA 6497, 2824...), une huile Moebius..."
                    className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
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

                <label className="inline-flex items-center gap-2 cursor-pointer select-none px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-500/50 transition-colors whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={resolvedOnly}
                    onChange={(e) => setResolvedOnly(e.target.checked)}
                    className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Résolues avec solution certifiée</span>
                </label>
              </div>

              {/* Catégories de questions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'Toutes les thématiques' },
                  { id: 'Technique', label: 'Échappement & Mouvements' },
                  { id: 'Huilage', label: 'Lubrification & Huiles' },
                  { id: 'Outillage', label: 'Outils d’Établi' },
                  { id: 'Examens', label: 'Examens & Calculs' },
                  { id: 'Restauration', label: 'Restauration & Habillage' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des discussions */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredDiscussions.length > 0 ? (
                  filteredDiscussions.map((d, index) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {/* Entête Discussion */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${d.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}
                          >
                            {d.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {d.author}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                • {d.timeAgo}
                              </span>
                            </div>
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                              {d.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                            {d.category}
                          </span>
                          {d.isResolved && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Résolu
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Titre et question */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {d.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {d.preview}
                      </p>

                      {/* Réponse / Solution certifiée si présente */}
                      {d.solution && (
                        <div className="mb-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-500/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400 mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Solution validée par les maîtres d’atelier :</span>
                          </div>
                          <p className="leading-relaxed pl-5">{d.solution}</p>
                        </div>
                      )}

                      {/* Tags & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {d.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleLike(d.id)}
                            className={`inline-flex items-center gap-1.5 font-semibold transition-colors ${
                              likes[d.id]
                                ? 'text-rose-500'
                                : 'text-slate-500 dark:text-slate-400 hover:text-rose-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likes[d.id] ? 'fill-current' : ''}`} />
                            <span>{d.likesCount}</span>
                          </button>

                          <div className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                            <MessageCircle className="w-4 h-4" />
                            <span>{d.repliesCount} réponses</span>
                          </div>

                          <button
                            onClick={() => showToast('Ouverture du fil de discussion en cours...')}
                            className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            Participer →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      Aucune question ne correspond à votre recherche
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                      Soyez le premier à poser une question technique sur ce sujet !
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
                    >
                      Poser une question maintenant
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- ONGLET 2 : PETITES ANNONCES D'ÉTABLI --- */}
        {activeTab === 'annonces' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500" />
                  Bourse d’Entraide & Petites Annonces d’Établi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Échangez, vendez ou donnez vos outils horlogers (Bergeon, Dumont), fournitures et manuels d'atelier entre passionnés et élèves.
                </p>
              </div>

              <a
                href="mailto:contact.horlogeries@gmail.com?subject=Depot%20Petite%20Annonce%20HorloLearn&body=Bonjour%20HorloLearn,%0D%0A%0D%0AJe%20souhaite%20publier%20une%20annonce%20:%0D%0A-%20Type%20(Vente,%20Recherche,%20Partage)%20:%20%0D%0A-%20Titre%20:%20%0D%0A-%20Prix%20(ou%20Gratuit)%20:%20%0D%0A-%20Lieu%20(Ville/Canton)%20:%20%0D%0A-%20Description%20:%20%0D%0A%0D%0AMerci%20!"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 font-bold text-xs whitespace-nowrap shadow-sm hover:bg-amber-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Déposer une annonce (Gratuit)
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          ad.type === 'Vente'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                            : ad.type === 'Partage'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                        }`}
                      >
                        {ad.type}
                      </span>

                      {ad.price && (
                        <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                          {ad.price}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {ad.title}
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {ad.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{ad.author}</span>
                      <span> • {ad.location}</span>
                    </div>

                    <a
                      href={`mailto:${ad.contactEmail}?subject=Reponse%20Annonce%20HorloLearn%20:%20${encodeURIComponent(ad.title)}`}
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Contacter →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ONGLET 3 : ÉCOLES & PÔLES SUISSES --- */}
        {activeTab === 'ecoles' && (
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Les Écoles & Pôles de Formation Horlogère en Suisse
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                HorloLearn valorise la filière officielle suisse (AFP, CFC, Technicien ES). Découvrez les centres d’apprentissage qui forment l’élite horlogère mondiale.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {SCHOOLS.map((school, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 mb-3">
                      {school.type}
                    </span>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {school.name}
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {school.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">📍 {school.city}</span>
                    <a
                      href={school.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Site officiel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ONGLET 4 : PLANNING & DOCUMENTS --- */}
        {activeTab === 'planning' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Planning Scolaire & Fiches d’Atelier 2025-2026
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Retrouvez ici le calendrier des modules de formation, les périodes d’ateliers pratiques et les dates clés des sessions d’évaluation en Suisse.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  📄 Planning Modulaire Officiel (PDF)
                </span>
                <span className="text-xs text-slate-500">1.2 Mo • Mis à jour</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Programme des cours théoriques (calculs, dessin technique) et ateliers pratiques (démontage, pose spiral, chronométrie).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/planning-horlogerie.pdf"
                download="Planning-Horlogerie-2025-2026.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 font-bold text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Planning Scolaire</span>
              </a>

              <Link
                href="/theorie"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                <span>Accéder aux cours de théorie</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* --- BANNIÈRE CERCLE D'ÉCHANGE DIRECT --- */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Rejoindre le Cercle en direct
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Discutez en direct avec la communauté HorloLearn
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Besoin d’un conseil urgent sur votre établi ? Rejoignez notre réseau d’échange pour partager vos photos d’avancement, vos diagnostics de mouvement et dialoguer en direct.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="mailto:contact.horlogeries@gmail.com?subject=Rejoindre%20le%20Cercle%20HorloLearn"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all text-center"
            >
              <span>Rejoindre le Cercle</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <Link
              href="/pratique"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all text-center"
            >
              <span>Voir les modules pratiques</span>
            </Link>
          </div>
        </div>
      </main>

      {/* --- MODALE : POSER UNE QUESTION À L'ÉTABLI --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden relative text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg p-1"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Poser une question à l’établi</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Les membres et diplômés vous répondent sous quelques heures
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateDiscussion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Titre précis de votre problème *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Amplitude faible après remontage sur calibre ETA 2824..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Thématique *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="Technique">Échappement & Mouvement</option>
                      <option value="Huilage">Lubrification & Huiles</option>
                      <option value="Outillage">Outils d’Établi</option>
                      <option value="Examens">Examens & Théorie</option>
                      <option value="Restauration">Restauration Vintage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Votre Prénom / Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Ex: Marc L."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Votre statut (Optionnel)
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Ex: Apprenti Horloger, Passionné, Restaurateur..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Description du problème ou de la question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Détaillez le calibre, les observations au microscope ou au chronocomparateur, et les étapes déjà testées..."
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
                    <span>Publier ma question</span>
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
