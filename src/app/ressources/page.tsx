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
  Award,
  Database,
  Users,
  Star,
  Clock,
  Calendar,
  Filter
} from 'lucide-react';

// ========== TYPES ==========
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

// ========== DONNÉES DES RESSOURCES ==========
const resources: Resource[] = [
  // DOCUMENTS TECHNIQUES
  {
    id: '1',
    title: 'Le Chronographe Mécanique',
    description: 'Découvrez le fonctionnement du chronographe mécanique, un mécanisme emblématique de l\'horlogerie avec schémas détaillés.',
    url: '/documents/chronographe-mecanique.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    fileSize: '12 MB',
    lastUpdate: 'Oct 2025'
  },
  {
    id: '2',
    title: 'Document AFP ETA 6497',
    description: 'Document PDF haute résolution officiel pour les étudiants AFP : démontage, remontage et réglage complet.',
    url: '/documents/eta-6497-afp.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    isNew: true,
    fileSize: '25 MB',
    lastUpdate: 'Oct 2025'
  },
  {
    id: '3',
    title: 'Guide Complet du Chronographe',
    description: 'Téléchargez le guide technique complet du chronographe au format PDF : mécanisme, réglage et entretien.',
    url: '/documents/guide-chronographe.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    fileSize: '18 MB',
    lastUpdate: 'Sept 2025'
  },

  // HISTOIRE
  {
    id: '4',
    title: 'Évolution des Manufactures Horlogères',
    description: 'Article historique retraçant l\'évolution des manufactures horlogères suisses depuis le XIXe siècle jusqu\'à nos jours.',
    url: 'https://www.fhs.swiss/histoire-manufactures',
    type: 'Article',
    category: 'Histoire',
    language: 'FR',
    lastUpdate: 'Août 2025'
  },
  {
    id: '5',
    title: 'Catalogues d\'Époque FHS',
    description: 'Liens vers des documents historiques et catalogues d\'époque via la Fondation de la Haute Horlogerie.',
    url: 'https://www.hautehorlogerie.org/fr/encyclopedie/',
    type: 'Site web',
    category: 'Histoire',
    language: 'Multilingue',
    isFeatured: true
  },

  // GLOSSAIRES
  {
    id: '6',
    title: 'Dictionnaire FHH',
    description: 'Dictionnaire officiel de la Fondation de la Haute Horlogerie : tous les termes techniques de l\'horlogerie.',
    url: 'https://www.hautehorlogerie.org/fr/encyclopedie/lexique-de-lhorlogerie/',
    type: 'Glossaire',
    category: 'Glossaires',
    language: 'Multilingue',
    isFeatured: true
  },
  {
    id: '7',
    title: 'Glossaire Technique Complet',
    description: 'Glossaire complet des termes techniques de l\'horlogerie pour débutants et professionnels avec illustrations.',
    url: '/glossaire',
    type: 'Glossaire',
    category: 'Glossaires',
    language: 'FR',
    isNew: true
  },

  // SITES DE RÉFÉRENCE
  {
    id: '8',
    title: 'Fondation de la Haute Horlogerie',
    description: 'Référence mondiale pour la culture et le patrimoine horloger. Encyclopédie complète et actualités du secteur.',
    url: 'https://www.hautehorlogerie.org',
    type: 'Site web',
    category: 'Sites de référence',
    language: 'Multilingue',
    isFeatured: true
  },
  {
    id: '9',
    title: 'WOSTEP',
    description: 'Formation professionnelle en horlogerie de renommée internationale. Standards de formation mondiale.',
    url: 'https://www.wostep.ch',
    type: 'Site web',
    category: 'Sites de référence',
    language: 'EN'
  },
  {
    id: '10',
    title: 'Ranfft Calibres Database',
    description: 'Base de données technique exhaustive de calibres historiques avec fiches complètes et photographies.',
    url: 'https://www.ranfft.de',
    type: 'Base de données',
    category: 'Sites de référence',
    language: 'EN'
  },
  {
    id: '11',
    title: 'Digital Public Library',
    description: 'Archives numériques de documents et ouvrages horlogers anciens numérisés. Patrimoine accessible gratuitement.',
    url: 'https://dp.la',
    type: 'Base de données',
    category: 'Sites de référence',
    language: 'EN'
  },
  {
    id: '12',
    title: 'Watch Wiki',
    description: 'Encyclopédie collaborative de l\'horlogerie : terminologie, histoire, marques et biographies.',
    url: 'https://www.watch-wiki.org',
    type: 'Site web',
    category: 'Sites de référence',
    language: 'Multilingue'
  }
];

const categories = [
  { id: 'all', name: 'Toutes', icon: BookOpen },
  { id: 'Documents techniques', name: 'Documents techniques', icon: FileText },
  { id: 'Histoire', name: 'Histoire', icon: Clock },
  { id: 'Glossaires', name: 'Glossaires', icon: Database },
  { id: 'Sites de référence', name: 'Sites de référence', icon: Globe }
];

const resourceTypes = [
  { id: 'all', name: 'Tous types' },
  { id: 'PDF', name: 'PDF' },
  { id: 'Article', name: 'Articles' },
  { id: 'Site web', name: 'Sites web' },
  { id: 'Glossaire', name: 'Glossaires' },
  { id: 'Base de données', name: 'Bases de données' }
];

// ========== COMPOSANT ==========
export default function RessourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(r => r.isFeatured);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="w-5 h-5" />;
      case 'Article': return <BookOpen className="w-5 h-5" />;
      case 'Site web': return <Globe className="w-5 h-5" />;
      case 'Glossaire': return <Database className="w-5 h-5" />;
      case 'Base de données': return <Database className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'Article': return 'bg-blue-100 text-blue-700';
      case 'Site web': return 'bg-green-100 text-green-700';
      case 'Glossaire': return 'bg-purple-100 text-purple-700';
      case 'Base de données': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Bibliothèque de ressources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ressources Documentaires
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Documents techniques, guides, glossaires et sites de référence pour approfondir l'art horloger
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg"
            >
              {resourceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && selectedType === 'all' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Ressources en vedette
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target={resource.url.startsWith('/') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-blue-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      ⭐ VEDETTE
                    </span>
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{resource.language}</span>
                    {resource.fileSize && <span>{resource.fileSize}</span>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* All Resources */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory === 'all' ? 'Toutes les ressources' : selectedCategory}
            </h2>
            <p className="text-slate-600">{filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map(resource => (
              <a
                key={resource.id}
                href={resource.url}
                target={resource.url.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      {resource.isNew && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                          🆕 NOUVEAU
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{resource.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {resource.language}
                    </span>
                    {resource.fileSize && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.fileSize}
                      </span>
                    )}
                    {resource.lastUpdate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {resource.lastUpdate}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Une ressource manquante ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Partagez vos sources favorites avec la communauté et enrichissons ensemble notre bibliothèque
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            <Users className="w-5 h-5" />
            Proposer une source
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 HorloLearn – Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
