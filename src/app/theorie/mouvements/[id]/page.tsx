'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, BookOpen, Award, Clock, Bookmark, ExternalLink
  // ✅ BookOpen EST maintenant importé
} from 'lucide-react';
import { modules } from '../data';
import type { Concept } from '../types';

// Récupère un concept par son ID
function getConceptById(id: string): Concept | undefined {
  for (const module of modules) {
    const concept = module.concepts.find(c => c.id === id);
    if (concept) return concept;
  }
  return undefined;
}

export default function ConceptDetailPage({ params }: { params: { id: string } }) {
  const concept = getConceptById(params.id);

  // Gestion 404 si le concept n'existe pas
  if (!concept) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-black text-slate-300 dark:text-slate-700 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Concept non trouvé</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            La page "{params.id}" n'existe pas dans notre référence technique.
          </p>
          <Link 
            href="/theorie/mouvements" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à la référence
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/theorie/mouvements" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la référence
          </Link>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* EN-TÊTE */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3 tracking-tight">{concept.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
                {concept.desc}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                concept.level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                concept.level === 'Expert' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
              }`}>
                {concept.level}
              </span>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Favori">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* METADATA */}
          <div className="flex flex-wrap gap-6 text-sm">
            {concept.iso && (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Award className="w-4 h-4" />
                <span>Normes: {concept.iso.join(', ')}</span>
              </div>
            )}
            {concept.manufactures && (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{concept.manufactures.length} manufactures</span>
              </div>
            )}
            {concept.patent && (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ExternalLink className="w-4 h-4" />
                <span>{concept.patent.length} brevets</span>
              </div>
            )}
          </div>
        </div>

        {/* GRILLE DE CONTENU */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne principale (2/3) */}
          <div className="md:col-span-2 space-y-8">
            {/* SECTION DESCRIPTION */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  {/* ✅ BookOpen est maintenant reconnu */}
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                Description Technique Détaillée
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {concept.desc}
                </p>
                {concept.formula && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6 font-mono text-blue-800 dark:text-blue-300">
                    <span className="font-bold text-base">Formule :</span> {concept.formula}
                  </div>
                )}
                {concept.history && (
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    <span className="font-semibold not-italic">Historique :</span> {concept.history}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION SPÉCIFICATIONS DYNAMIQUE */}
            {Object.keys(concept).filter(k => !['id', 'title', 'desc', 'level', 'tags', 'iso', 'manufactures', 'patent', 'history', 'formula'].includes(k)).length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Spécifications & Données</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(concept).map(([key, value]) => {
                    if (['id', 'title', 'desc', 'level', 'tags', 'iso', 'manufactures', 'patent', 'history', 'formula'].includes(key)) return null;
                    if (!value) return null;
                    
                    return (
                      <div key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg">
                        <h3 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          {key.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR (1/3) */}
          <div className="space-y-6">
            {/* TAGS */}
            {concept.tags && concept.tags.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {concept.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-700 dark:text-slate-300 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* MANUFACTURES */}
            {concept.manufactures && concept.manufactures.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Manufactures Emblématiques
                </h3>
                <ul className="space-y-2">
                  {concept.manufactures.map(manufacture => (
                    <li key={manufacture} className="text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center gap-2">
                      <span className="text-blue-500">•</span> {manufacture}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* NAVIGATION */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold mb-4 text-lg">Navigation</h3>
              <Link href="/theorie/mouvements" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
                <ChevronLeft className="w-4 h-4" />
                Retour à la liste des concepts
              </Link>
            </div>

            {/* CITATION INSPIRANTE */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-sm">
              <p className="italic leading-relaxed">
                "La précision est la somme de mille détails parfaitement maîtrisés."
              </p>
              <p className="mt-3 text-sm opacity-90 font-medium">— Maître Horloger Suisse</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
