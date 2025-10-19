'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Factory, Wrench, Award, Timer } from 'lucide-react';

const sousPagesM ouvement = [
  {
    slug: 'platine-ponts',
    titre: "La Platine et les Ponts",
    description: "Définition, fonction et rôle dans le mouvement.",
    icon: <Factory className="w-7 h-7 text-slate-600 dark:text-slate-300" />,
  },
  {
    slug: 'systeme-fixation',
    titre: "Système de fixation",
    description: "Montage, stabilité et précision dimensionnelle.",
    icon: <Wrench className="w-7 h-7 text-slate-600 dark:text-slate-300" />,
  },
  {
    slug: 'stabilite-dimensionnelle',
    titre: "Stabilité dimensionnelle",
    description: "Matériaux, impact sur la régularité et traitements.",
    icon: <Award className="w-7 h-7 text-slate-600 dark:text-slate-300" />,
  },
  {
    slug: 'finitions-decoratives',
    titre: "Finitions décoratives",
    description: "Perlage, Côtes de Genève, anglage, guillochage.",
    icon: <Timer className="w-7 h-7 text-slate-600 dark:text-slate-300" />,
  },
];

export default function MouvementsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à Théorie
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          🏗️ Architecture du Mouvement
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mb-12">
          Découvrez la structure fondamentale du mouvement horloger : platine, ponts, systèmes de fixation, 
          stabilité dimensionnelle et finitions décoratives exceptionnelles.
        </p>

        {/* Grille des sous-pages */}
        <div className="grid md:grid-cols-2 gap-6">
          {sousPagesM ouvement.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/mouvements/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
