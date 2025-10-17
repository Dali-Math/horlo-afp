'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Search, 
  Star,
  ExternalLink,
  Award,
  Users,
  BookOpen,
  Wrench,
  Smartphone,
  Database,
  Palette,
  GraduationCap
} from 'lucide-react';

// ========== TYPES ==========
interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  isFree: boolean;
  isRecommended?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  rating?: number;
  usageCount?: number;
}

// ========== DONNÉES DES OUTILS (23 OUTILS) ==========
const tools: Tool[] = [
  // BASES DE CONNAISSANCES
  {
    id: '1',
    name: 'Base Chronos',
    description: 'Base de connaissances technique complète : pannes, diagnostics, procédures atelier. Référence pour les professionnels suisses.',
    url: 'https://www.cliniquehorlogere.ch',
    category: 'Connaissances',
    tags: ['diagnostic', 'pannes', 'atelier'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.9,
    usageCount: 1247
  },
  {
    id: '2',
    name: 'SSC – Banque de données',
    description: 'Publications scientifiques et références de la Société Suisse de Chronométrie. Archives historiques et techniques avancées.',
    url: 'https://www.ssc.ch/fr/bibliotheque',
    category: 'Connaissances',
    tags: ['scientifique', 'recherche', 'histoire'],
    level: 'Avancé',
    isFree: true,
    rating: 4.7,
    usageCount: 892
  },
  {
    id: '3',
    name: 'Horlogerie-Suisse.com',
    description: 'Portail francophone complet : revues techniques, dossiers approfondis, annonces professionnelles et forums actifs.',
    url: 'https://horlogerie-suisse.com',
    category: 'Connaissances',
    tags: ['communauté', 'forum', 'actualités'],
    level: 'Débutant',
    isFree: true,
    isTrending: true,
    rating: 4.6,
    usageCount: 2103
  },
  {
    id: '4',
    name: 'SuissMontre.com',
    description: 'Répertoire francophone exhaustif des marques horlogères suisses, manufactures et calibres associés avec historique.',
    url: 'https://www.suissmontre.com',
    category: 'Connaissances',
    tags: ['marques', 'calibres', 'manufactures'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 1523
  },

  // CALCULATEURS
  {
    id: '5',
    name: 'Calculateur d\'engrenages',
    description: 'Calcul précis des rapports de transmission, nombres de dents et vitesses de rotation. Indispensable pour la conception.',
    url: 'https://www.omnicalculator.com/physics/gear-ratio',
    category: 'Calculateurs',
    tags: ['engrenages', 'calcul', 'transmission'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.8,
    usageCount: 1563
  },
  {
    id: '6',
    name: 'Balance Frequency Calculator',
    description: 'Convertisseur instantané entre alternances/heure (A/h), Hertz (Hz) et vibrations. Essentiel pour le réglage.',
    url: 'https://www.horological-meantime.com/frequency-calculator',
    category: 'Calculateurs',
    tags: ['fréquence', 'alternance', 'réglage'],
    level: 'Débutant',
    isFree: true,
    rating: 4.9,
    usageCount: 3241
  },
  {
    id: '7',
    name: 'Omni Calculator',
    description: 'Collection complète de calculateurs pour l\'horlogerie : engrenages, fréquences, dimensions, forces et bien plus.',
    url: 'https://www.omnicalculator.com',
    category: 'Calculateurs',
    tags: ['calculateurs', 'collection', 'polyvalent'],
    level: 'Débutant',
    isFree: true,
    rating: 4.7,
    usageCount: 2891
  },
  {
    id: '8',
    name: 'Horological Meantime',
    description: 'Convertisseur professionnel d\'alternances et fréquences horlogères avec explications pédagogiques détaillées.',
    url: 'https://www.horological-meantime.com',
    category: 'Calculateurs',
    tags: ['conversion', 'alternances', 'fréquences'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 1245
  },

  // CAO & MODÉLISATION
  {
    id: '9',
    name: 'TinkerCAD',
    description: 'Modélisation 3D gratuite en ligne, idéale pour concevoir et prototyper des pièces horlogères simples. Interface intuitive.',
    url: 'https://www.tinkercad.com',
    category: 'CAO',
    tags: ['3D', 'modélisation', 'conception'],
    level: 'Débutant',
    isFree: true,
    isNew: true,
    rating: 4.5,
    usageCount: 1829
  },
  {
    id: '10',
    name: 'Blender',
    description: 'Logiciel 3D open source ultra-puissant pour modéliser des mouvements horlogers complets avec rendu photoréaliste.',
    url: 'https://www.blender.org',
    category: 'CAO',
    tags: ['3D', 'open-source', 'rendu'],
    level: 'Avancé',
    isFree: true,
    rating: 4.8,
    usageCount: 3421
  },
  {
    id: '11',
    name: 'OnShape Education',
    description: 'Plateforme CAO en ligne professionnelle gratuite pour étudiants et enseignants. Collaboration en temps réel.',
    url: 'https://www.onshape.com/en/education',
    category: 'CAO',
    tags: ['CAO', 'cloud', 'éducation'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 982
  },
  {
    id: '12',
    name: 'FreeCAD',
    description: 'Logiciel de CAO paramétrique open source, puissant pour modéliser des mouvements horlogers complets avec précision.',
    url: 'https://www.freecad.org',
    category: 'CAO',
    tags: ['CAO', 'paramétrique', 'open-source'],
    level: 'Avancé',
    isFree: true,
    rating: 4.4,
    usageCount: 1523
  },
  {
    id: '13',
    name: 'Inkscape',
    description: 'Logiciel de dessin vectoriel gratuit, parfait pour créer des plans techniques horlogers et schémas d\'éclatés.',
    url: 'https://inkscape.org',
    category: 'CAO',
    tags: ['2D', 'vectoriel', 'plans'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.5,
    usageCount: 1891
  },
  {
    id: '14',
    name: 'QCAD',
    description: 'Logiciel de CAO 2D open source pour dessins techniques précis. Alternative gratuite à AutoCAD pour l\'horlogerie.',
    url: 'https://www.qcad.org',
    category: 'CAO',
    tags: ['2D', 'CAO', 'technique'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.3,
    usageCount: 743
  },
  {
    id: '15',
    name: 'LibreCAD',
    description: 'Application CAO 2D gratuite et open source, idéale pour créer des plans d\'atelier et schémas de montage.',
    url: 'https://librecad.org',
    category: 'CAO',
    tags: ['2D', 'gratuit', 'plans'],
    level: 'Débutant',
    isFree: true,
    rating: 4.2,
    usageCount: 892
  },

  // APPLICATIONS
  {
    id: '16',
    name: 'WatchTracker',
    description: 'Application mobile pour mesurer la précision de vos montres mécaniques via analyse audio du tic-tac.',
    url: 'https://www.watchtracker.io',
    category: 'Applications',
    tags: ['mobile', 'précision', 'mesure'],
    level: 'Débutant',
    isFree: false,
    isTrending: true,
    rating: 4.7,
    usageCount: 5421
  },
  {
    id: '17',
    name: 'Kello App',
    description: 'Application gratuite pour tester la précision des montres mécaniques. Interface simple, résultats instantanés.',
    url: 'https://kello.app',
    category: 'Applications',
    tags: ['mobile', 'test', 'gratuit'],
    level: 'Débutant',
    isFree: true,
    isRecommended: true,
    rating: 4.8,
    usageCount: 4103
  },
  {
    id: '18',
    name: 'Toolwatch',
    description: 'Mesure de précision de montre en ligne via enregistrement audio. Historique et suivi de vos montres.',
    url: 'https://www.toolwatch.io',
    category: 'Applications',
    tags: ['web', 'mesure', 'suivi'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 2341
  },

  // BASES DE DONNÉES
  {
    id: '19',
    name: 'Ranfft Database',
    description: 'Base de données la plus complète de calibres horlogers : fiches techniques détaillées, photos, spécifications.',
    url: 'https://www.ranfft.de',
    category: 'Bases de données',
    tags: ['calibres', 'spécifications', 'référence'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.9,
    usageCount: 6892
  },
  {
    id: '20',
    name: 'Mikrolisk',
    description: 'Catalogue exhaustif de mouvements horlogers avec spécifications techniques, schémas et historique des marques.',
    url: 'https://mikrolisk.de',
    category: 'Bases de données',
    tags: ['mouvements', 'catalogue', 'marques'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 3241
  },
  {
    id: '21',
    name: 'Watch Wiki',
    description: 'Encyclopédie horlogère collaborative. Terminologie, histoire, biographies d\'horlogers célèbres.',
    url: 'https://www.watch-wiki.org',
    category: 'Bases de données',
    tags: ['encyclopédie', 'wiki', 'histoire'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 2891
  },

  // PÉDAGOGIE
  {
    id: '22',
    name: 'Animations Université de Nantes',
    description: 'Modules interactifs pédagogiques : oscilloscope, circuits électriques, ondes, lentilles, thermodynamique et mécanique.',
    url: 'https://phyanim.sciences.univ-nantes.fr',
    category: 'Pédagogie',
    tags: ['animations', 'physique', 'interactif'],
    level: 'Intermédiaire',
    isFree: true,
    isNew: true,
    rating: 4.7,
    usageCount: 1234
  },
  {
    id: '23',
    name: 'Simulateur d\'Alternance HorloLearn',
    description: 'Simulateur visuel en temps réel du balancier horloger. Calculez et visualisez les fréquences de 3600 à 72000 A/h.',
    url: '/outils#simulateur',
    category: 'Pédagogie',
    tags: ['simulateur', 'balancier', 'interne'],
    level: 'Débutant',
    isFree: true,
    isRecommended: true,
    isNew: true,
    rating: 5.0,
    usageCount: 892
  }
];

// ========== CATÉGORIES ==========
const categories = [
  { id: 'all', name: 'Tous', icon: Star, color: 'blue' },
  { id: 'Connaissances', name: 'Connaissances', icon: BookOpen, color: 'green' },
  { id: 'Calculateurs', name: 'Calculateurs', icon: Wrench, color: 'orange' },
  { id: 'CAO', name: 'CAO & 3D', icon: Palette, color: 'purple' },
  { id: 'Applications', name: 'Applications', icon: Smartphone, color: 'pink' },
  { id: 'Bases de données', name: 'Bases de données', icon: Database, color: 'indigo' },
  { id: 'Pédagogie', name: 'Ressources pédagogiques', icon: GraduationCap, color: 'teal' }
];

// ========== COMPOSANT PRINCIPAL ==========
export default function OutilsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'name'>('popular');

  // Filtrage et tri
  const filteredTools = tools
    .filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.usageCount || 0) - (a.usageCount || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return a.name.localeCompare(b.name);
    });

  const recommendedTools = tools.filter(t => t.isRecommended);

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
            Boîte à outils professionnelle
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Outils & Ressources Horlogères
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Plus de {tools.length} outils professionnels pour maîtriser l'horlogerie
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un outil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="popular">Plus populaires</option>
              <option value="rating">Mieux notés</option>
              <option value="name">Alphabétique</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
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

        {/* Recommended */}
        {selectedCategory === 'all' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Recommandations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendedTools.slice(0, 3).map(tool => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-yellow-200"
                >
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                    ⭐ RECOMMANDÉ
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-4 mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{tool.rating}/5</span>
                    </div>
                    <span className="text-xs text-slate-500">{tool.usageCount?.toLocaleString()} utilisations</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Tools Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory === 'all' ? 'Tous les outils' : selectedCategory}
            </h2>
            <p className="text-slate-600">{filteredTools.length} résultat{filteredTools.length > 1 ? 's' : ''}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.isFree && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">GRATUIT</span>
                  )}
                  {tool.isNew && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">🆕 NOUVEAU</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center justify-between">
                  {tool.name}
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4">{tool.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{tool.rating}/5</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded">{tool.level}</span>
                </div>
              </a>
            ))}
          </div>
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
