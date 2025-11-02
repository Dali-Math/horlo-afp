
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Search,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Globe,
  Users,
  Star,
  Calendar,
} from 'lucide-react';

// ==== Données des ressources ====
interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'PDF' | 'Article' | 'Site web' | 'Glossaire' | 'Base de données';
  category: 'Documents techniques' | 'Histoire' | 'Glossaires' | 'Sites de référence';
  language: 'FR' | 'EN' | 'Multilingue';
  isFeatured?: boolean;
  isNew?: boolean;
  fileSize?: string;
  lastUpdate?: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Le Chronographe Mécanique',
    description:
      'Découvrez le fonctionnement du chronographe mécanique, un mécanisme emblématique de l\'horlogerie avec schémas détaillés.',
    url: '/documents/chronographe-mecanique.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    fileSize: '12 MB',
    lastUpdate: 'Oct 2025',
  },
  {
    id: '2',
    title: 'Document AFP ETA 6497',
    description:
      'Document officiel pour les étudiants AFP : démontage, remontage et réglage complet.',
    url: '/documents/eta-6497-afp.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    isNew: true,
    fileSize: '25 MB',
    lastUpdate: 'Oct 2025',
  },
  {
    id: '3',
    title: 'Guide Complet du Chronographe',
    description:
      'Téléchargez le guide technique complet du chronographe : mécanisme, réglage et entretien.',
    url: '/documents/guide-chronographe.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    fileSize: '18 MB',
    lastUpdate: 'Sept 2025',
  },
  {
    id: '4',
    title: 'Évolution des Manufactures Horlogères',
    description:
      'Article retraçant l\'évolution des manufactures horlogères suisses depuis le XIXe siècle.',
    url: 'https://www.fhs.swiss/histoire-manufactures',
    type: 'Article',
    category: 'Histoire',
    language: 'FR',
  },
  {
    id: '5',
    title: 'Fondation de la Haute Horlogerie',
    description:
      'Référence mondiale pour la culture et le patrimoine horloger. Encyclopédie complète et actualités du secteur.',
    url: 'https://www.hautehorlogerie.org',
    type: 'Site web',
    category: 'Sites de référence',
    language: 'Multilingue',
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Glossaire Technique FHH',
    description:
      'Dictionnaire officiel de la Fondation de la Haute Horlogerie avec plus de 600 termes techniques.',
    url: 'https://www.hautehorlogerie.org/fr/encyclopedie/glossaire',
    type: 'Glossaire',
    category: 'Glossaires',
    language: 'Multilingue',
  },
  {
    id: '7',
    title: 'Archives Horlogères Numériques',
    description:
      'Base de données de calibres historiques et documents d\'époque numérisés.',
    url: 'https://www.horlogerie-suisse.com/archives',
    type: 'Base de données',
    category: 'Sites de référence',
    language: 'FR',
  },
];

// ==== Composant principal ====
export default function RessourcesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = resources.filter(
    (r) =>
      (category === 'all' || r.category === category) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            Bibliothèque de ressources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Ressources Documentaires
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Documents techniques, guides et sites de référence pour approfondir
            l&apos;art horloger suisse.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Ressources en vedette */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <Star className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            Ressources en vedette
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.isFeatured)
              .map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target={r.url.startsWith('/') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {r.type}
                      </span>
                    </div>
                    {r.isNew && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-lg font-semibold">
                        🆕 Nouveau
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {r.description}
                  </p>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {r.language}
                    </span>
                    {r.fileSize && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" /> {r.fileSize}
                      </span>
                    )}
                  </div>
                </a>
              ))}
          </div>
        </section>

        {/* Toutes les ressources */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Toutes les ressources ({filtered.length})
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target={r.url.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold text-sm">{r.type}</span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {r.description}
                </p>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {r.language}
                  </span>
                  {r.lastUpdate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {r.lastUpdate}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-12 text-center border border-blue-200 dark:border-blue-700">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Une ressource manquante ?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Partagez vos sources favorites avec la communauté HorloLearn.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg"
          >
            <Users className="w-5 h-5" />
            Proposer une source
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-16 border-t border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 dark:text-slate-500">
            © 2025 HorloLearn – Ressources Horlogères Suisses
          </p>
        </div>
      </footer>
    </main>
  );
}
