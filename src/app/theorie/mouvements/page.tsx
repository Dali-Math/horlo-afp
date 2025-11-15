'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Search, BookOpen, Heart,
  Layers, Zap, Clock, Target, Wrench, Scroll
} from 'lucide-react';
import { modules } from './data';
import type { Concept, Module } from './types';

// MAP CORRECT
const iconMap = {
  Layers,
  Zap,
  Clock,
  Target,
  Wrench, // ← CORRIGÉ
  Scroll,
};

export default function SimpleReferencePage() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/theorie" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline ml-1">Retour</span>
          </Link>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">
            {modules.reduce((acc, m) => acc + m.concepts.length, 0)} concepts
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Référence Technique
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Tous les concepts essentiels du mouvement mécanique
        </p>
      </section>

      {/* CONTENU */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {modules.map((module) => {
          // RENDU SÛR de l'icône
          const IconComponent = iconMap[module.icon as keyof typeof iconMap];
          
          return (
            <div key={module.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className={`w-10 h-10 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center text-white`}>
                  {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
                </div>
                <h2 className="text-2xl font-bold">{module.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.concepts
                  .filter(c => 
                    c.title.toLowerCase().includes(search.toLowerCase()) ||
                    c.desc.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((concept) => (
                  <Link key={concept.id} href={`/theorie/mouvements/${concept.id}`}>
                    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(concept.id);
                        }}
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors z-10"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(concept.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {concept.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {concept.desc}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          concept.level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          concept.level === 'Expert' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                        }`}>
                          {concept.level}
                        </span>
                        <span className="text-slate-400">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
          HorloLearn © 2025 | Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </div>
      </footer>
    </main>
  );
}
