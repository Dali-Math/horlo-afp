'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Star, Award, Clock, Users, BookOpen, 
  Settings, ChevronDown, ExternalLink, Badge, Eye, 
  Heart, TrendingUp, Target, Shield, ChevronLeft
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Article' | 'Site web' | 'Glossaire' | 'Base de données' | 'Formation' | 'Certification' | 'Réglementation';
  category: 'Calibres' | 'Complications' | 'Marques' | 'Formation' | 'Finitions';
  niveau?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  badge?: 'Nouveau' | 'Populaire' | 'Premium' | 'Certifié';
  views?: number;
  rating?: number;
  image?: string;
  tags?: string[];
  specs?: Record<string, string | number>;
  url?: string;
}

const RessourcesPage: React.FC = () => {
  const isMobile = useIsMobile() 
  const [activeTab, setActiveTab] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('tous');
  const [typeFilter, setTypeFilter] = useState('tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Données des ressources enrichies
  const allResources: Resource[] = [
    // Marques Légendaires
    {
      id: 'vacheron-57260',
      title: 'Vacheron Constantin Référence 57260',
      description: 'La montre de poche la plus complexe au monde avec 57 complications, 2826 composants et 8 ans de développement.',
      type: 'Article',
      category: 'Marques',
      niveau: 'Expert',
      badge: 'Populaire',
      views: 2847,
      rating: 4.9,
      image: '/images/ressources/marques_header.png',
      tags: ['Vacheron Constantin', 'Grande Complication', '57 complications', 'Ultra-fin'],
      specs: {
        composants: 2826,
        rubis: 242,
        frequence: '2,5 Hz',
        reserve_marche: '60h'
      },
      url: 'https://www.vacheron-constantin.com/'
    },
    {
      id: 'rolex-4130',
      title: 'Rolex Calibre 4130 - Chronographe Intégré',
      description: 'Premier chronographe intégré Rolex avec embrayage vertical et roue à colonnes pour Cosmograph Daytona.',
      type: 'Article',
      category: 'Calibres',
      niveau: 'Expert',
      badge: 'Premium',
      views: 1923,
      rating: 4.8,
      image: '/images/ressources/rolex_4130.png',
      tags: ['Rolex', 'Chronographe', 'Intégré', 'Daytona'],
      specs: {
        composants: 201,
        rubis: 44,
        frequence: '28 800 A/h',
        reserve_marche: '72h'
      },
      url: 'https://www.rolex.com/'
    },
    {
      id: 'patek-calatrava',
      title: 'Patek Philippe Calatrava - Architecture Genevoise',
      description: 'Collection iconique depuis 1932. Architecture finger-bridge, ultra-minceur et finitions genevoises.',
      type: 'Article',
      category: 'Marques',
      niveau: 'Expert',
      badge: 'Certifié',
      views: 3156,
      rating: 4.9,
      image: '/images/ressources/patek_calatrava.png',
      tags: ['Patek Philippe', 'Calatrava', 'Finger-bridge', 'Ultra-fin'],
      specs: {
        epaisseur: '2,53mm (calibre 240)',
        annee: '1932',
        annee_calibre: '1977'
      },
      url: 'https://www.patek.com/'
    },

    // Calibres Techniques
    {
      id: 'eta-7750',
      title: 'ETA/Valjoux 7750 - Le Tracteur des Chronographes',
      description: 'Mouvement chronographe automatique à came verticale, robuste et industrialisable. Base de nombreuses manufactures.',
      type: 'PDF',
      category: 'Calibres',
      niveau: 'Intermédiaire',
      badge: 'Populaire',
      views: 4521,
      rating: 4.5,
      image: '/images/ressources/eta7750_chronographe.png',
      tags: ['ETA', '7750', 'Chronographe', 'Production'],
      specs: {
        diametre: '30,00mm',
        hauteur: '7,90mm',
        rubis: 25,
        frequence: '28 800 A/h'
      },
      url: '/documents/eta-7750-guide.pdf'
    },
    {
      id: 'omega-2500',
      title: 'Omega 2500 - Co-Axial sur Base ETA 2892',
      description: 'Premier calibre Omega intégrant l\'échappement Co-Axial. Réduction du frottement et stabilité de la précision.',
      type: 'Article',
      category: 'Calibres',
      niveau: 'Avancé',
      badge: 'Nouveau',
      views: 1892,
      rating: 4.6,
      image: '/images/ressources/mouvements_header.png',
      tags: ['Omega', 'Co-Axial', 'ETA 2892', 'Innovation'],
      specs: {
        base: 'ETA 2892 modifié',
        echappement: 'Co-Axial',
        frequence: '28 800 A/h',
        reduction_frottement: '35%'
      },
      url: 'https://www.omegawatches.com/'
    },
    {
      id: 'jlc-889',
      title: 'Jaeger-LeCoultre 889/2 - Mouvement Manufacture',
      description: 'Mouvement automatique trois aiguilles robuste et endurant. Ajusté à six positions pour constance de marche.',
      type: 'Article',
      category: 'Calibres',
      niveau: 'Avancé',
      views: 1567,
      rating: 4.7,
      image: '/images/ressources/jaeger_lecoultre_889.png',
      tags: ['Jaeger-LeCoultre', '889/2', 'Manufacture', 'Tractor'],
      specs: {
        diametre: '26,0mm',
        frequence: '28 800 A/h',
        rubis: '~36',
        reserve_marche: '40-42h'
      },
      url: 'https://www.jaeger-lecoultre.com/'
    },

    // Complications Avancées
    {
      id: 'tourbillon-breguet',
      title: 'Tourbillon - Invention de Breguet (1801)',
      description: 'Cage rotative compensant l\'effet de la gravité. Invention majeure d\'Abraham-Louis Breguet révolutionnant l\'horlogerie.',
      type: 'Article',
      category: 'Complications',
      niveau: 'Expert',
      badge: 'Certifié',
      views: 5234,
      rating: 4.9,
      image: '/images/ressources/tourbillon_breguet.png',
      tags: ['Breguet', 'Tourbillon', 'Gravité', '1801'],
      specs: {
        rotation: '60 secondes',
        compensation: 'Gravité',
        inventaire: 'Abraham-Louis Breguet',
        annee: '1801'
      },
      url: 'https://www.breguet.com/'
    },
    {
      id: 'repetition-minutes',
      title: 'Répétition Minutes - L\'Art de l\'Acoustique',
      description: 'Jaeger-LeCoultre "The Sound Maker". Sonnerie indiquant heures, quarts et minutes sur timbres dédiés.',
      type: 'Article',
      category: 'Complications',
      niveau: 'Expert',
      badge: 'Premium',
      views: 3421,
      rating: 4.8,
      image: '/images/ressources/complications_header.png',
      tags: ['Répétition', 'Acoustique', 'Sonnerie', 'JLC'],
      specs: {
        sequences: 'Heures + Quarts + Minutes',
        timbres: 'Cristaux/Hélicoïdaux',
        marteaux: 'Trébuchet',
        innovation: 'Réduction temps morts'
      },
      url: 'https://www.jaeger-lecoultre.com/fr/'
    },
    {
      id: 'quantieme-perpetuel',
      title: 'Quantième Perpétuel - Calendrier Grégorien Automatique',
      description: 'Gestion automatique des mois 28/29/30/31 jours et années bissextiles. Cerveau mécanique sophistiqué.',
      type: 'Article',
      category: 'Complications',
      niveau: 'Expert',
      views: 2876,
      rating: 4.7,
      image: '/images/ressources/complications_header.png',
      tags: ['Quantième', 'Calendrier', 'Bissextile', 'Grégorien'],
      specs: {
        cycle: 'Gregorian automatique',
        correction: '2100, 2200, etc.',
        precision_lune: '1j/122 ans',
        ergonomie: 'Correcteurs sous cornes'
      },
      url: 'https://www.hautehorlogerie.org/'
    },

    // Formation Professionnelle
    {
      id: 'wostep',
      title: 'WOSTEP - Formation Watchmaker (22 mois)',
      description: 'Formation à temps plein internationale. Autonomie complète en atelier montres mécaniques et électroniques.',
      type: 'Formation',
      category: 'Formation',
      niveau: 'Expert',
      badge: 'Premium',
      views: 2145,
      rating: 4.9,
      image: '/images/ressources/formation_header.png',
      tags: ['WOSTEP', 'International', '22 mois', 'Formation'],
      specs: {
        duree: '22 mois',
        cout: '34 600 CHF',
        langue: 'Anglais',
        certification: 'WOSTEP Certificate'
      },
      url: 'https://www.wostep.org/'
    },
    {
      id: 'cfpt-geneva',
      title: 'CFPT Genève - École d\'Horlogerie (1824-2024)',
      description: 'Plus ancienne école horlogerie Suisse. Bicentenaire en 2024. Locaux modernes Espace Tourbillon.',
      type: 'Formation',
      category: 'Formation',
      niveau: 'Intermédiaire',
      badge: 'Certifié',
      views: 1876,
      rating: 4.8,
      image: '/images/ressources/formation_header.png',
      tags: ['CFPT', 'Genève', 'Bicentenaire', 'Locaux modernes'],
      specs: {
        fondation: '1824',
        bicentenaire: '2024',
        etudiants_micromecanique: '12/an',
        classes_production: '3'
      },
      url: 'https://www.cfpt.ch/'
    },
    {
      id: 'cosc',
      title: 'COSC - Certification Chronomètres (50 ans)',
      description: 'Contrôle Officiel Suisse des Chronomètres. 55+ millions mouvements certifiés, 3,8% de refus.',
      type: 'Certification',
      category: 'Formation',
      niveau: 'Intermédiaire',
      badge: 'Certifié',
      views: 3421,
      rating: 4.8,
      image: '/images/ressources/chronoscope_swiss_made.png',
      tags: ['COSC', 'Certification', 'Chronomètre', '50 ans'],
      specs: {
        duree_tests: '12-20 jours',
        norme: 'ISO 3159',
        refus: '3,8%',
        cumule: '55M+ mouvements'
      },
      url: 'https://www.cosc.ch/'
    },

    // Finitions Swiss Made
    {
      id: 'anglage',
      title: 'Anglage - Finition Précieuse des Ponts',
      description: 'Suppression arêtes vives pour chanfrein poli. Marqueur évident du soin porté au mouvement.',
      type: 'Article',
      category: 'Finitions',
      niveau: 'Avancé',
      views: 2145,
      rating: 4.6,
      image: '/images/ressources/chronoscope_swiss_made.png',
      tags: ['Anglage', 'Chanfrein', 'Polissage', 'Bevelling'],
      specs: {
        outils: 'Limes, touret, badeco',
        niveau: 'Basic → Expert',
        continuite: 'Parfaite requise',
        polissage: 'Miroir final'
      },
      url: 'https://www.swiss-made.ch/'
    },
    {
      id: 'cotes-geneve',
      title: 'Côtes de Genève - Signature Visuelle',
      description: 'Striures régulières capturant lumière en bandes. Vallée de Joux : expertise artisanale reconnue.',
      type: 'Article',
      category: 'Finitions',
      niveau: 'Avancé',
      badge: 'Populaire',
      views: 1892,
      rating: 4.7,
      image: '/images/ressources/chronoscope_swiss_made.png',
      tags: ['Côtes', 'Genève', 'Vallée de Joux', 'Bande'],
      specs: {
        variations: 'Droites, éventail, circulaires',
        emploi: 'Ponts côté fond',
        critere: 'Régularité parfaite',
        expertise: 'Vallée de Joux'
      },
      url: 'https://www.geneva-watchmaking.com/'
    },
    {
      id: 'swiss-made',
      title: 'Swiss Made - Réglementation Renforcée 2017',
      description: '≥60% valeur suisse montre et mouvement. ≥50% composants origine suisse. Distinction importante.',
      type: 'Réglementation',
      category: 'Finitions',
      niveau: 'Intermédiaire',
      badge: 'Certifié',
      views: 4567,
      rating: 4.9,
      image: '/images/ressources/chronoscope_swiss_made.png',
      tags: ['Swiss Made', 'Réglementation', '2017', 'Valeur'],
      specs: {
        valeur_montre: '≥60%',
        valeur_mouvement: '≥60%',
        composants: '≥50% origine suisse',
        operations: 'Assemblage/inspection SU'
      },
      url: 'https://www.swiss-made.ch/fr/reglementation'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulation de chargement des données
    setTimeout(() => {
      setResources(allResources);
      setLoading(false);
    }, 800);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesTab = activeTab === 'tous' || resource.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesNiveau = niveauFilter === 'tous' || resource.niveau === niveauFilter;
    const matchesType = typeFilter === 'tous' || resource.type === typeFilter;
    
    return matchesTab && matchesSearch && matchesNiveau && matchesType;
  });

  const tabs = [
    { id: 'tous', label: 'Tous', icon: BookOpen, count: resources.length },
    { id: 'marques', label: 'Marques', icon: Star, count: resources.filter(r => r.category === 'Marques').length },
    { id: 'calibres', label: 'Calibres', icon: Settings, count: resources.filter(r => r.category === 'Calibres').length },
    { id: 'complications', label: 'Complications', icon: Target, count: resources.filter(r => r.category === 'Complications').length },
    { id: 'formation', label: 'Formation', icon: Users, count: resources.filter(r => r.category === 'Formation').length },
    { id: 'finitions', label: 'Finitions', icon: Award, count: resources.filter(r => r.category === 'Finitions').length },
  ];

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Nouveau': return 'bg-green-100 text-green-800';
      case 'Populaire': return 'bg-blue-100 text-blue-800';
      case 'Premium': return 'bg-yellow-100 text-yellow-800';
      case 'Certifié': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNiveauColor = (niveau?: string) => {
    switch (niveau) {
      case 'Débutant': return 'text-green-600';
      case 'Intermédiaire': return 'text-yellow-600';
      case 'Avancé': return 'text-orange-600';
      case 'Expert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const CardContent = (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 group">
        <div className="relative">
          <img 
            src={resource.image} 
            alt={resource.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/ressources/mouvements_header.png';
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {resource.badge && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(resource.badge)}`}>
                {resource.badge}
              </span>
            )}
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {resource.type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              <Eye className="w-3 h-3" />
              <span>{resource.views}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {resource.title}
            </h3>
            {resource.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-slate-700">{resource.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {resource.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            {resource.niveau && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className={`text-sm font-medium ${getNiveauColor(resource.niveau)}`}>
                  {resource.niveau}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">{resource.category}</span>
            </div>
          </div>
          
          {resource.specs && (
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-slate-700 mb-2">Spécifications clés</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(resource.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="text-slate-900 font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {resource.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    );

    if (resource.url) {
      return (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
          {CardContent}
        </a>
      );
    }

    return CardContent;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des ressources horlogères...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 dark:from-slate-950 dark:to-slate-900">
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

      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src="/images/ressources/mouvements_header.png" 
          alt="Mouvements horlogers"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Badge className="w-4 h-4" />
              Bibliothèque Professionnelle Enrichie
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ressources Horlogerie Suisse
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Collection complète pour collectionneurs avancés et professionnels : 
              marques légendaires, calibres techniques, complications, formation et finitions Swiss Made
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{resources.length}</div>
              <div className="text-blue-200 text-sm">Ressources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">7</div>
              <div className="text-blue-200 text-sm">Marques Légendaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">6</div>
              <div className="text-blue-200 text-sm">Complications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-blue-200 text-sm">Années d&apos;expertise</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation & Filtres */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
          {/* Onglets */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, description ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={niveauFilter}
                onChange={(e) => setNiveauFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="tous">Tous niveaux</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                <option value="Expert">Expert</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="tous">Tous types</option>
                <option value="Article">Article</option>
                <option value="PDF">PDF</option>
                <option value="Formation">Formation</option>
                <option value="Certification">Certification</option>
                <option value="Réglementation">Réglementation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">
              {filteredResources.length} ressources trouvées
            </span>
            {searchTerm && (
              <span className="text-slate-500 dark:text-slate-400">
                pour "{searchTerm}"
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
              className="text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="grid">Grille</option>
              <option value="list">Liste</option>
            </select>
          </div>
        </div>

        {/* Grille des ressources */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Aucune ressource trouvée
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Essayez de modifier vos critères de recherche ou filtres.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Contributez à notre bibliothèque
          </h2>
          <p className="text-lg text-blue-800 mb-8 max-w-2xl mx-auto">
            Partagez vos sources favorites et rejoignez notre communauté de professionnels de l'horlogerie suisse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg"
            >
              <Users className="w-5 h-5 inline mr-2" />
              Rejoindre la communauté
            </Link>
            <Link 
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Proposer une source
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">HorloLearn</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                La référence professionnelle pour l&apos;apprentissage et le perfectionnement 
                en horlogerie suisse.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Marques Légendaires</li>
                <li>Calibres Techniques</li>
                <li>Complications Avancées</li>
                <li>Formation Professionnelle</li>
                <li>Finitions Swiss Made</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Formation</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>WOSTEP</li>
                <li>CFPT Genève</li>
                <li>AFP/CFC</li>
                <li>Certifications</li>
                <li>Perfectionnement</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Qualité</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Swiss Made</li>
                <li>COSC</li>
                <li>Poinçon Genève</li>
                <li>FQF</li>
                <li>NIHS/FH</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2025 HorloLearn – Ressources Horlogères Suisses. 
              Excellence, tradition et innovation depuis {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default RessourcesPage;
