"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, FileText, Video, BookOpen } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'fiche' | 'article' | 'video' | 'quiz';
  url: string;
  icon: React.ComponentType<any>;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Données d'exemple - REMPLACER PAR VOS DONNÉES RÉELLES
  // Vous pouvez les charger depuis une API, un fichier JSON, ou votre CMS
  const searchableContent: SearchResult[] = [
    {
      id: 1,
      title: "ETA 6497 - Fiche Technique",
      description: "Calibre mécanique à remontage manuel, mouvement emblématique de l'horlogerie suisse",
      type: "fiche",
      url: "/fiches/eta-6497",
      icon: Clock
    },
    {
      id: 2,
      title: "Les Complications Horlogères",
      description: "Découvrez les différentes complications : chronographe, quantième, phases de lune",
      type: "article",
      url: "/articles/complications",
      icon: BookOpen
    },
    {
      id: 3,
      title: "Démontage d'un Mouvement ETA",
      description: "Tutoriel vidéo complet sur le démontage et remontage d'un calibre ETA",
      type: "video",
      url: "/videos/demontage-eta",
      icon: Video
    },
    {
      id: 4,
      title: "Quiz: Les Bases de l'Horlogerie",
      description: "Testez vos connaissances sur les mécanismes horlogers fondamentaux",
      type: "quiz",
      url: "/quiz/bases-horlogerie",
      icon: FileText
    },
    {
      id: 5,
      title: "Le Spiral: Cœur du Mouvement",
      description: "Comprendre le rôle et la fabrication du spiral dans un mouvement mécanique",
      type: "article",
      url: "/articles/spiral",
      icon: BookOpen
    },
    {
      id: 6,
      title: "ETA 2824-2 - Fiche Technique",
      description: "Mouvement automatique de référence, base de nombreuses montres suisses",
      type: "fiche",
      url: "/fiches/eta-2824-2",
      icon: Clock
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    const timer = setTimeout(() => {
      const filtered = searchableContent.filter(item => {
        const searchText = `${item.title} ${item.description}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
      
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (url: string) => {
    onClose();
    window.location.href = url;
  };

  if (!isOpen) return null;

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fiche: 'Fiche Technique',
      article: 'Article',
      video: 'Vidéo',
      quiz: 'Quiz'
    };
    return labels[type] || type;
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      fiche: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      article: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      video: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      quiz: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header avec barre de recherche */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher sur HorloLearn..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div className="max-h-96 overflow-y-auto">
          {query.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Commencez à taper pour rechercher...</p>
              <p className="text-sm mt-2">Essayez "ETA", "complications", "quiz"...</p>
            </div>
          )}

          {query.length > 0 && isSearching && (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
              <p>Recherche en cours...</p>
            </div>
          )}

          {query.length > 0 && !isSearching && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>Aucun résultat trouvé pour "{query}"</p>
              <p className="text-sm mt-2">Essayez avec d'autres mots-clés</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {result.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer avec raccourcis */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>↵ Ouvrir</span>
              <span>ESC Fermer</span>
            </div>
            <span>{results.length} résultat(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
