"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, FileText, Video, BookOpen } from "lucide-react";
import FocusLock from 'react-focus-lock'; // <-- CORRIGÉ : import sans accolades
import { searchData } from "@/lib/searchData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof searchData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus automatique quand on ouvre le modal
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // GESTION DE LA TOUCHE "ÉCHAP"
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // recherche dans searchData global
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const filtered = searchData.filter((item) => {
        const text = `${item.title} ${item.description} ${item.keywords?.join(" ")}`.toLowerCase();
        return text.includes(query.toLowerCase());
      });

      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (url: string) => {
    onClose();
    router.push(url);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "fiche":
        return Clock;
      case "article":
        return BookOpen;
      case "video":
        return Video;
      case "quiz":
        return FileText;
      default:
        return Search;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fiche: "Fiche Technique",
      article: "Article",
      video: "Vidéo",
      quiz: "Quiz",
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <FocusLock>
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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

          {/* Contenu */}
          <div className="max-h-96 overflow-y-auto">
            {/* Vide */}
            {query.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Commencez à taper pour rechercher...</p>
              </div>
            )}

            {/* Chargement */}
            {query.length > 0 && isSearching && (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p>Recherche en cours...</p>
              </div>
            )}

            {/* Aucune correspondance */}
            {query.length > 0 && !isSearching && results.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p>Aucun résultat trouvé pour "{query}"</p>
              </div>
            )}

            {/* Résultats */}
            {results.length > 0 && (
              <div className="py-2">
                {results.map((result) => {
                  const Icon = getIcon(result.type);
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
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
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

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-xs text-gray-500 text-center">
            {results.length} résultat(s)
          </div>
        </div>
      </FocusLock>
    </div>
  );
}
