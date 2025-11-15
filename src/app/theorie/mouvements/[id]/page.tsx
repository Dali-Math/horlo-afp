// app/theorie/mouvements/[id]/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, Award, Bookmark, ExternalLink } from 'lucide-react';
import { modules } from '../data';
import type { Concept } from '../types';

// Récupérer le concept par ID
function getConceptById(id: string): Concept | undefined {
  for (const module of modules) {
    const concept = module.concepts.find(c => c.id === id);
    if (concept) return concept;
  }
  return undefined;
}

export default function ConceptPage({ params }: { params: { id: string } }) {
  const concept = getConceptById(params.id);

  // Si le concept n'existe pas → 404
  if (!concept) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Concept non trouvé</p>
          <Link href="/theorie/mouvements" className="text-blue-600 hover:text-blue-800">
            ← Retour à la référence
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
          <Link href="/theorie/mouvements" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la référence
          </Link>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* EN-TÊTE */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold mb-3">{concept.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl">
                {concept.desc}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                concept.level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                concept.level === 'Expert' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
              }`}>
                {concept.level}
              </span>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* METADATA */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            {concept.iso && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>ISO: {concept.iso.join(', ')}</span>
              </div>
            )}
            {concept.manufactures && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{concept.manufactures.length} manufactures</span>
              </div>
            )}
          </div>
        </div>

        {/* CONTENU DÉTAILLÉ */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            {/* Section Description Technique */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                Description Technique
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {concept.desc}
                </p>
                {concept.formula && (
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-6 font-mono">
                    <span className="font-bold">Formule :</span> {concept.formula}
                  </div>
                )}
              </div>
            </div>

            {/* Section Spécifications */}
            {Object.keys(concept).length > 4 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6">Spécifications Techniques</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(concept).map(([key, value]) => {
                    if (['id', 'title', 'desc', 'level'].includes(key)) return null;
                    if (!value) return null;
                    
                    return (
                      <div key={key} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          {key.replace(/_/g, ' ')}
                        </h3>
                        <p className="mt-1 text-slate-800 dark:text-slate-200">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            {concept.tags && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {concept.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold mb-4">Navigation</h3>
              <Link href="/theorie/mouvements" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Retour à la liste
              </Link>
            </div>

            {/* Citation */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
              <p className="italic">
                "La précision est la somme de mille détails."
              </p>
              <p className="mt-2 text-sm opacity-90">— Maître Horloger Suisse</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
