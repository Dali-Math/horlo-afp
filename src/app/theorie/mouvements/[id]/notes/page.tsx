'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookmarkPlus, Save, Trash2, Edit3, Check, X,
  Calendar, Clock, Tag, Search, Filter,
  StickyNote, FileText, Lightbulb, AlertCircle,
  Star, StarOff, Archive, Download, Share2,
  ArrowLeft, Plus, MoreVertical, Eye, EyeOff,
  Sparkles, TrendingUp, Award, Target
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { movements } from '../../../../data/movements';

// ============================================================================
// TYPES
// ============================================================================

interface Note {
  id: string;
  conceptId: string;
  title: string;
  content: string;
  category: 'Observation' | 'Astuce' | 'Erreur' | 'Progression' | 'Idée';
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

const getCategoryConfig = (category: Note['category']) => {
  const configs = {
    'Observation': {
      icon: Eye,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      emoji: '👀'
    },
    'Astuce': {
      icon: Lightbulb,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      emoji: '💡'
    },
    'Erreur': {
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      emoji: '⚠️'
    },
    'Progression': {
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      emoji: '📈'
    },
    'Idée': {
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      emoji: '✨'
    }
  };

  return configs[category];
};

// ============================================================================
// COMPONENTS
// ============================================================================

const CategoryBadge = ({ category }: { category: Note['category'] }) => {
  const config = getCategoryConfig(category);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color} ${config.border} border`}>
      <span>{config.emoji}</span>
      {category}
    </span>
  );
};

const TagBadge = ({ tag, onRemove }: { tag: string; onRemove?: () => void }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium">
    <Tag className="w-3 h-3" />
    {tag}
    {onRemove && (
      <button
        onClick={onRemove}
        className="ml-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    )}
  </span>
);

const EmptyState = ({ 
  icon: Icon, 
  title, 
  message,
  action
}: { 
  icon: React.ElementType; 
  title: string; 
  message: string;
  action?: { label: string; onClick: () => void };
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
      <Icon className="w-12 h-12 text-slate-400 dark:text-slate-600" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
      {message}
    </p>
    {action && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={action.onClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        {action.label}
      </motion.button>
    )}
  </motion.div>
);

const NoteCard = ({ note, onEdit, onDelete, onToggleFavorite, onToggleArchive }: NoteCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const config = getCategoryConfig(note.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-slate-900 rounded-xl p-6 border-2 ${config.border} shadow-sm hover:shadow-md transition-all relative`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={note.category} />
            {note.isFavorite && (
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            )}
            {note.isArchived && (
              <Archive className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            {note.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(note.createdAt)}
            </span>
            {note.updatedAt.getTime() !== note.createdAt.getTime() && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Modifié {formatDate(note.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-12 z-20 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 min-w-48"
                >
                  <button
                    onClick={() => {
                      onEdit(note);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      onToggleFavorite(note.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    {note.isFavorite ? (
                      <>
                        <StarOff className="w-4 h-4" />
                        Retirer des favoris
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4" />
                        Ajouter aux favoris
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onToggleArchive(note.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <Archive className="w-4 h-4" />
                    {note.isArchived ? 'Désarchiver' : 'Archiver'}
                  </button>
                  <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
                  <button
                    onClick={() => {
                      onDelete(note.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const NoteEditorModal = ({
  isOpen,
  onClose,
  onSave,
  editingNote
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
  editingNote: Note | null;
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Note['category']>('Observation');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
      setTags(editingNote.tags);
    } else {
      setTitle('');
      setContent('');
      setCategory('Observation');
      setTags([]);
    }
  }, [editingNote, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      id: editingNote?.id,
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      updatedAt: new Date()
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border-2 border-slate-200 dark:border-slate-700"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Edit3 className="w-6 h-6" />
              {editingNote ? 'Modifier la note' : 'Nouvelle note'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Amélioration de la réception"
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Catégorie *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(['Observation', 'Astuce', 'Erreur', 'Progression', 'Idée'] as Note['category'][]).map((cat) => {
                const config = getCategoryConfig(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      category === cat
                        ? `${config.bg} ${config.border} ${config.color}`
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="block mb-1">{config.emoji}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Contenu *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Décrivez votre observation, astuce, ou progression..."
              rows={8}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Ajouter un tag..."
                className="flex-1 px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <TagBadge
                    key={index}
                    tag={tag}
                    onRemove={() => handleRemoveTag(tag)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {editingNote ? 'Mettre à jour' : 'Créer la note'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function NotesPage() {
  const params = useParams();
  const router = useRouter();
  const conceptId = params.id as string;

  const concept = movements.find(m => m.id === conceptId);

  // State
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Note['category'] | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${conceptId}`);
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
        updatedAt: new Date(n.updatedAt)
      })));
    }
  }, [conceptId]);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem(`notes-${conceptId}`)) {
      localStorage.setItem(`notes-${conceptId}`, JSON.stringify(notes));
    }
  }, [notes, conceptId]);

  // Redirect if concept not found
  useEffect(() => {
    if (!concept) {
      router.push('/theorie/mouvements');
    }
  }, [concept, router]);

  // Handlers
  const handleCreateNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (noteData: Partial<Note>) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(n => 
        n.id === editingNote.id 
          ? { ...n, ...noteData, updatedAt: new Date() }
          : n
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        conceptId,
        title: noteData.title!,
        content: noteData.content!,
        category: noteData.category!,
        tags: noteData.tags || [],
        isFavorite: false,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([newNote, ...notes]);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const handleToggleFavorite = (id: string) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
    ));
  };

  const handleToggleArchive = (id: string) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, isArchived: !n.isArchived } : n
    ));
  };

  // Filtering
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || note.isFavorite;
    const matchesArchived = showArchived ? note.isArchived : !note.isArchived;
    
    return matchesSearch && matchesCategory && matchesFavorite && matchesArchived;
  });

  // Stats
  const stats = {
    total: notes.filter(n => !n.isArchived).length,
    favorites: notes.filter(n => n.isFavorite && !n.isArchived).length,
    archived: notes.filter(n => n.isArchived).length,
    byCategory: {
      observation: notes.filter(n => n.category === 'Observation' && !n.isArchived).length,
      astuce: notes.filter(n => n.category === 'Astuce' && !n.isArchived).length,
      erreur: notes.filter(n => n.category === 'Erreur' && !n.isArchived).length,
      progression: notes.filter(n => n.category === 'Progression' && !n.isArchived).length,
      idee: notes.filter(n => n.category === 'Idée' && !n.isArchived).length,
    }
  };

  if (!concept) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href={`/theorie/mouvements/${conceptId}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au concept
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Mes Notes : {concept.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Gardez une trace de vos observations et progressions
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateNote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouvelle Note
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <StickyNote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total</p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-2 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Favoris</p>
                    <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.favorites}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium">Progressions</p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.byCategory.progression}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Archive className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Archivées</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.archived}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg mb-8"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans vos notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Catégories
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Toutes ({stats.total})
                </button>
                {(['Observation', 'Astuce', 'Erreur', 'Progression', 'Idée'] as Note['category'][]).map((cat) => {
                  const config = getCategoryConfig(cat);
                  const count = stats.byCategory[cat.toLowerCase() as keyof typeof stats.byCategory];
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        selectedCategory === cat
                          ? `${config.bg} ${config.color} ${config.border} border-2`
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{config.emoji}</span>
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  showFavoritesOnly
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-2 border-amber-300 dark:border-amber-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {showFavoritesOnly ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                Favoris uniquement
              </button>

              <button
                onClick={() => setShowArchived(!showArchived)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  showArchived
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Archive className="w-4 h-4" />
                {showArchived ? 'Afficher les actives' : 'Afficher les archivées'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleArchive={handleToggleArchive}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <EmptyState
                icon={notes.length === 0 ? StickyNote : Search}
                title={notes.length === 0 ? 'Aucune note pour le moment' : 'Aucune note trouvée'}
                message={
                  notes.length === 0
                    ? `Créez votre première note pour documenter votre apprentissage de "${concept.title}".`
                    : 'Essayez de modifier vos filtres ou votre recherche.'
                }
                action={notes.length === 0 ? {
                  label: 'Créer ma première note',
                  onClick: handleCreateNote
                } : undefined}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Note Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditorModal
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSaveNote}
            editingNote={editingNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
