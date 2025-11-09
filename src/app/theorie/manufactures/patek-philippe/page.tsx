'use client';

import React, { useState, useEffect } from 'react';
import { 
  Crown, Award, Calendar, Zap, Shield, Trophy, Heart, TrendingUp, 
  Globe, Users, Watch, Settings, Sparkles, Clock, BookOpen,
  RotateCcw, Eye, Share2, Star, X, ChevronDown, Search,
  Bookmark, MessageCircle, ArrowUpRight, Info, Hammer, 
  Microscope, Calculator, LineChart, BarChart3
} from 'lucide-react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function PatekPhilippeUltimate() {
  // ============ STATES AVANCÉS ============
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedEra, setSelectedEra] = useState('all');
  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  const [compareList, setCompareList] = useState<(string | number)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [expertMode, setExpertMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // ============ DONNÉES ENCYCLOPÉDIQUES ============
  const encyclopedicData = {
    historicalMilestones: [
      {
        id: 1,
        year: 1839,
        era: 'foundation',
        title: 'Fondation par Antoine Norbert de Patek',
        description: 'Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek.',
        impact: 'Révolutionnaire',
        context: 'Contexte historique : Après la révolution polonaise ratée de 1830, Patek trouve refuge en Suisse.',
        technicalDetails: 'Première production : montres de poche avec échappement à cylindre',
        witnesses: 'Archives Patek Philippe confirment 200 pièces produites la première année',
        rarity: 5,
        funFact: 'Patek avait initialement voulu être soldat, pas horloger'
      },
      {
        id: 2,
        year: 1844,
        era: 'foundation',
        title: 'Rencontre Historique à Paris',
        description: 'Patek rencontre Jean Adrien Philippe lors de l\'Exposition Industrielle de Paris.',
        impact: 'Décisif',
        context: 'Philippe présente son système de remontoir à couronne qui rendra obsolète les clés',
        technicalDetails: 'Brevet n°1317 du 24 août 1844 pour le remontoir sans clé',
        witnesses: 'Médaille de bronze reçue à l\'exposition',
        rarity: 5,
        funFact: 'Leur stand était à côté de celui de Breguet'
      },
      {
        id: 3,
        year: 1851,
        era: 'golden',
        title: 'Consécration Royale',
        description: 'La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la Grande Exposition de Londres.',
        impact: 'International',
        context: 'Première montre royale britannique, ouvre les portes de la haute société',
        technicalDetails: 'Montre de gousset en or avec répétition minutes pour la Reine',
        witnesses: 'Archives royales britanniques',
        rarity: 5,
        funFact: 'Victoria portait sa Patek tous les jours jusqu\'à sa mort'
      },
      {
        id: 4,
        year: 1976,
        era: 'modern',
        title: 'Le Nautilus de Gérald Genta',
        description: 'Lancement du Nautilus Ref. 3700/1A, révolution du sport-chic en acier.',
        impact: 'Nouveau Paradigme',
        context: 'Crise du quartz, Patek répond avec une montre de sport en acier à 3000$',
        technicalDetails: 'Boîtier octogonal 42mm, étanche 120m, bracelet intégré',
        witnesses: 'Genta l\'a dessiné en 5 minutes sur une serviette de table',
        rarity: 5,
        funFact: 'Échec commercial initial, devenu graal 40 ans plus tard'
      },
      {
        id: 5,
        year: 2014,
        era: 'modern',
        title: 'Grandmaster Chime 6300 : L\'Olympe',
        description: 'Création pour le 175e anniversaire : 20 complications, première grande sonnerie en montre-bracelet.',
        impact: 'Zénith Technique',
        context: '7 ans de développement, 100\'000 heures de travail',
        technicalDetails: '1366 composants, boîtier réversible, 20 complications dont 5 inédites',
        witnesses: 'Only Watch 2019 : vendu 31M$ (record mondial)',
        rarity: 5,
        funFact: 'Nécessite 6 mois de formation pour comprendre toutes ses fonctions'
      }
    ],

    collections: [
      {
        id: 'calatrava',
        name: 'Calatrava',
        tagline: 'L\'essence de l\'élégance horlogère',
        foundingYear: 1932,
        philosophy: 'Design épuré inspiré du Bauhaus, forme ronde parfaite, lisibilité optimale',
        technicalSpecs: {
          movement: 'Calibre 215 PS (manuel) ou 324 S C (automatique)',
          powerReserve: '44-45 heures',
        },
        marketData: {
          entryPrice: 21000,
          averagePrice: 37000,
          waitingTime: 'Disponible sur demande',
          investmentPotential: 'Stable +5%/an',
          liquidityScore: 8
        }
      },
      {
        id: 'nautilus',
        name: 'Nautilus',
        tagline: 'Le graal des collectionneurs modernes',
        foundingYear: 1976,
        philosophy: 'Sport-chic, luxe décontracté, boîtier octogonal iconique de Gérald Genta',
        technicalSpecs: {
          movement: 'Calibre 26-330 S C (automatique)',
          powerReserve: '35-45 heures',
        },
        marketData: {
          entryPrice: 37000,
          averagePrice: 160000,
          waitingTime: '10-15 ans en boutique (liste fermée)',
          investmentPotential: 'Exceptionnel +20%/an',
          liquidityScore: 10
        }
      },
      {
        id: 'aquanaut',
        name: 'Aquanaut',
        tagline: 'L\'aventurier moderne accessible',
        foundingYear: 1997,
        philosophy: 'Sport-chic jeune, bracelet composite "Tropical", alternative au Nautilus',
        technicalSpecs: {
          movement: 'Calibre 26-330 S C ou 28-520 C (chronographe)',
          powerReserve: '35-55 heures',
        },
        marketData: {
          entryPrice: 23000,
          averagePrice: 64000,
          waitingTime: '3-7 ans',
          investmentPotential: 'Fort +15%/an',
          liquidityScore: 9
        }
      },
      {
        id: 'complications',
        name: 'Grandes Complications',
        tagline: 'Le sommet de l\'art horloger',
        foundingYear: 'Variable',
        philosophy: 'Excellence technique absolue, complications multiples, pièces d\'exception',
        technicalSpecs: {
          movement: 'Calibres uniques selon complication',
          powerReserve: '38-60 heures',
        },
        marketData: {
          entryPrice: 127000,
          averagePrice: 530000,
          waitingTime: 'Sur invitation uniquement',
          investmentPotential: 'Exceptionnel +25%/an',
          liquidityScore: 7
        }
      }
    ],

    complications: [
      {
        id: 'perpetual-calendar',
        name: 'Quantième Perpétuel',
        shortName: 'QP',
        category: 'Calendrier',
        difficulty: 5,
        description: 'Affiche automatiquement la date correcte en tenant compte des mois de 28, 29, 30 et 31 jours, ainsi que des années bissextiles, jusqu\'en 2100.',
        componentsCount: 150,
        priceImpact: '+CHF 53,000 à CHF 160,000',
        manufacturingTime: '200-300 heures',
        rarity: 'Environ 500 pièces/an toutes marques confondues',
        funFact: 'Si réglé correctement, ne nécessitera aucun ajustement avant l\'an 2100'
      },
      {
        id: 'minute-repeater',
        name: 'Répétition Minutes',
        shortName: 'RM',
        category: 'Sonnerie',
        difficulty: 5,
        description: 'Mécanisme qui sonne les heures, les quarts d\'heure et les minutes sur demande via un poussoir.',
        componentsCount: 200,
        priceImpact: '+CHF 212,000 à CHF 530,000',
        manufacturingTime: '400-600 heures (réglage acoustique)',
        rarity: 'Moins de 50 pièces/an chez Patek',
        funFact: 'Le réglage sonore prend jusqu\'à 100 heures à lui seul'
      },
      {
        id: 'tourbillon',
        name: 'Tourbillon',
        shortName: 'TB',
        category: 'Régulation',
        difficulty: 4,
        description: 'Cage rotative contenant l\'échappement et le balancier pour compenser les effets de la gravité sur la précision.',
        componentsCount: 72,
        priceImpact: '+CHF 160,000 à CHF 318,000',
        manufacturingTime: '150-250 heures',
        rarity: 'Moins de 100 pièces/an chez Patek',
        funFact: 'Patek ne l\'utilise que dans des grandes complications, jamais seul'
      }
    ],

    marketInsights: {
      priceEvolution: [
        { year: 2010, nautilus5711: 26500, calatrava: 19000, indexPP: 100 },
        { year: 2015, nautilus5711: 37000, calatrava: 23000, indexPP: 140 },
        { year: 2020, nautilus5711: 85000, calatrava: 30000, indexPP: 220 },
        { year: 2024, nautilus5711: 212000, calatrava: 37000, indexPP: 380 }
      ],
      auctionRecords: [
        {
          model: 'Grandmaster Chime 6300A',
          price: 31000000,
          auction: 'Only Watch 2019',
          significance: 'Record absolu montre aux enchères'
        },
        {
          model: 'Henry Graves Supercomplication',
          price: 24000000,
          auction: 'Sotheby\'s 2014',
          significance: 'Montre la plus compliquée du 20e siècle'
        }
      ],
      investmentTips: [
        'Acier > Or : L\'acier sport surperforme l\'or classique (+300% vs +50% sur 10 ans)',
        'Complications rares : QP, Répétition Minutes, World Time vintage sont des valeurs sûres',
        'Discontinués : Une référence arrêtée prend +50% en 2 ans (ex: 5711)'
      ]
    },

    manufacturing: {
      employees: 2000,
      production: '60,000 montres/an (estimation)',
      manufacturingSteps: [
        {
          step: 1,
          name: 'Design & R&D',
          duration: '2-7 ans',
          description: 'Conception, prototypage, tests de fiabilité sur 10 ans simulés',
          team: '50+ ingénieurs et designers'
        },
        {
          step: 2,
          name: 'Fabrication des composants',
          duration: '3-6 mois',
          description: 'Usinage ultra-précision (microns), tournage, fraising, polissage',
          precision: 'Tolérance : 0.001mm'
        },
        {
          step: 3,
          name: 'Assemblage mouvement',
          duration: '100-800 heures',
          description: 'Assemblage des 130-1366 composants, lubrification, réglage',
          expertise: 'Horlogers niveau 5+ (échelle interne 1-7)'
        }
      ]
    }
  };

  // ============ HOOKS ============
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (KONAMI_CODE[konamiProgress] === e.key) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        if (newProgress === KONAMI_CODE.length) {
          setExpertMode(true);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // ============ HANDLERS ============
  const toggleFavorite = (id: string | number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string | number) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(c => c !== id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, id]);
    }
  };

  const filteredCollections = encyclopedicData.collections.filter(c => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sport') return ['nautilus', 'aquanaut'].includes(c.id);
    if (activeFilter === 'classic') return c.id === 'calatrava';
    if (activeFilter === 'complications') return c.id === 'complications';
    return true;
  });

  const filteredMilestones = encyclopedicData.historicalMilestones.filter(m => 
    selectedEra === 'all' || m.era === selectedEra
  );

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Expert Mode Badge */}
      {expertMode && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
          🏆 Mode Expert Débloqué
        </div>
      )}

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-slate-900/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <div className="flex justify-center mb-8">
            <Crown className="w-24 h-24 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
            Patek Philippe
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-200 mb-4 italic max-w-4xl mx-auto leading-relaxed">
            "Vous ne possédez jamais complètement une Patek Philippe.<br/>
            <span className="text-yellow-300">Vous en êtes le gardien pour les générations futures."</span>
          </p>
          
          <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto">
            Guide encyclopédique complet • 185 ans d'histoire • 60,000+ montres produites • Excellence absolue
          </p>

          {/* Stats Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { label: 'Fondation', value: '1839', icon: Calendar },
              { label: 'Brevets', value: '70+', icon: Award },
              { label: 'Indépendance', value: '100%', icon: Shield },
              { label: 'Croissance/an', value: '+15%', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-2xl flex items-center gap-3 justify-center"
            >
              <BookOpen className="w-6 h-6" />
              Explorer l'Histoire
            </button>
            <button 
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 shadow-2xl flex items-center gap-3 justify-center"
            >
              <Watch className="w-6 h-6" />
              Voir les Collections
            </button>
          </div>

          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </header>

      {/* NAVIGATION STICKY */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex gap-2 text-sm font-medium">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
                { id: 'timeline', label: 'Histoire', icon: Clock },
                { id: 'collections', label: 'Collections', icon: Watch },
                { id: 'complications', label: 'Complications', icon: Settings },
                { id: 'market', label: 'Marché', icon: TrendingUp },
                { id: 'manufacturing', label: 'Fabrication', icon: Hammer }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all relative">
                <Bookmark className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              185 Ans d'Excellence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Chaque date est une révolution. Découvrez les moments qui ont façonné l'horlogerie moderne.
            </p>
          </div>

          {/* Era Filter */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {[
              { id: 'all', label: 'Toutes les Époques' },
              { id: 'foundation', label: '1839-1851: Fondation' },
              { id: 'golden', label: '1851-1925: Âge d\'Or' },
              { id: 'modern', label: '1976-2024: Modernité' }
            ].map(era => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedEra === era.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {filteredMilestones.map((milestone) => (
              <div 
                key={milestone.id}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02]">
                  {/* Year Badge */}
                  <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-bold text-2xl shadow-lg">
                    {milestone.year}
                  </div>

                  {/* Rarity Stars */}
                  <div className="absolute top-6 right-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < milestone.rarity ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-slate-400 mb-1">Impact</div>
                        <div className="text-yellow-400 font-bold">{milestone.impact}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-slate-400 mb-1">Contexte Historique</div>
                        <div className="text-slate-200 text-sm">{milestone.context}</div>
                      </div>
                    </div>

                    {/* Technical Details - Expert Mode */}
                    {expertMode && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                        <div className="flex items-start gap-3">
                          <Microscope className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Détails Techniques</div>
                            <div className="text-slate-300 text-sm">{milestone.technicalDetails}</div>
                          </div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-yellow-400 font-bold mb-1">Anecdote</div>
                              <div className="text-slate-200 text-sm italic">{milestone.funFact}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <button 
                        onClick={() => toggleFavorite(milestone.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(milestone.id)
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(milestone.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" />
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section id="collections" className="py-32 bg-gradient-to-b from-slate-900 to-black relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Collections Iconiques
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Quatre piliers qui définissent l'excellence horlogère.
            </p>

            {/* Filter Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { id: 'all', label: 'Toutes', icon: Watch },
                { id: 'sport', label: 'Sport Luxe', icon: Zap },
                { id: 'classic', label: 'Classiques', icon: Crown },
                { id: 'complications', label: 'Complications', icon: Settings }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {filteredCollections.map((collection) => (
              <div 
                key={collection.id}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Visual Area */}
                <div className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                  <Watch className="w-48 h-48 text-yellow-400 relative z-10 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                    {collection.foundingYear}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs">
                    {collection.marketData.waitingTime}
                  </div>
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleFavorite(collection.id)}
                      className={`p-3 rounded-full backdrop-blur-xl transition-all ${
                        favorites.includes(collection.id)
                          ? 'bg-red-500/80 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(collection.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={() => toggleCompare(collection.id)}
                      className={`flex-1 rounded-full backdrop-blur-xl font-medium transition-all ${
                        compareList.includes(collection.id)
                          ? 'bg-purple-500/80 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      {compareList.includes(collection.id) ? '✓ Ajouté' : 'Comparer'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-blue-400 italic">{collection.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        CHF {(collection.marketData.entryPrice / 1000).toFixed(0)}K+
                      </div>
                      <div className="text-xs text-slate-400">Prix d'entrée</div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {collection.philosophy}
                  </p>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-1">Mouvement</div>
                      <div className="text-sm text-white font-medium">{collection.technicalSpecs.movement}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-1">Réserve</div>
                      <div className="text-sm text-white font-medium">{collection.technicalSpecs.powerReserve}</div>
                    </div>
                  </div>

                  {/* Market Data - Expert Mode */}
                  {expertMode && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                      <div className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Données Marché Expert
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <div className="text-slate-400">ROI/an</div>
                          <div className="text-green-400 font-bold">{collection.marketData.investmentPotential}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Liquidité</div>
                          <div className="text-yellow-400 font-bold">{collection.marketData.liquidityScore}/10</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Prix Moyen</div>
                          <div className="text-blue-400 font-bold">CHF {(collection.marketData.averagePrice / 1000).toFixed(0)}K</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group">
                    Explorer la Collection
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparator Panel */}
          {compareList.length > 0 && (
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Comparateur ({compareList.length}/3)
                </h3>
                <button 
                  onClick={() => setCompareList([])}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {compareList.map(id => {
                  const collection = encyclopedicData.collections.find(c => c.id === id);
                  if (!collection) return null;
                  return (
                    <div key={id} className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4">{collection.name}</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Prix entrée</span>
                          <span className="text-yellow-400 font-bold">CHF {(collection.marketData.entryPrice / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Attente</span>
                          <span className="text-slate-200">{collection.marketData.waitingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">ROI</span>
                          <span className="text-green-400 font-bold">{collection.marketData.investmentPotential}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Liquidité</span>
                          <span className="text-blue-400 font-bold">{collection.marketData.liquidityScore}/10</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMPLICATIONS SECTION */}
      <section id="complications" className="py-32 bg-gradient-to-b from-black to-purple-900/30 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Complications Horlogères
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Les mécanismes les plus sophistiqués de l'horlogerie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {encyclopedicData.complications.map((complication) => (
              <div 
                key={complication.id}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < complication.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{complication.name}</h3>
                <div className="text-xs text-purple-400 font-medium mb-4">{complication.category} • {complication.shortName}</div>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {complication.description}
                </p>

                {expertMode && (
                  <div className="space-y-3 pt-4 border-t border-slate-700/50">
                    <div className="text-xs">
                      <span className="text-slate-400">Composants: </span>
                      <span className="text-white font-bold">{complication.componentsCount}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400">Fabrication: </span>
                      <span className="text-white font-bold">{complication.manufacturingTime}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400">Impact prix: </span>
                      <span className="text-green-400 font-bold">{complication.priceImpact}</span>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-3">
                      <div className="text-xs text-yellow-400 font-bold mb-1">💡 Le saviez-vous ?</div>
                      <div className="text-xs text-slate-300">{complication.funFact}</div>
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  Voir les Modèles
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET INSIGHTS SECTION */}
      <section id="market" className="py-32 bg-gradient-to-b from-purple-900/30 to-blue-900/30 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Marché & Investissement
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Données exclusives sur les prix et records d'enchères.
            </p>
          </div>

          {/* Auction Records */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Records d'Enchères Mondiaux
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {encyclopedicData.marketInsights.auctionRecords.map((record, i) => (
                <div 
                  key={i}
                  className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-6 hover:scale-105 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400 text-xs font-bold">
                      #{i + 1}
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">
                      ${(record.price / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{record.model}</h4>
                  <div className="text-sm text-slate-300 mb-4">{record.auction}</div>
                  <div className="bg-white/5 rounded-lg p-3 text-xs text-slate-400">
                    {record.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Evolution */}
          <div className="mb-16 bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <LineChart className="w-8 h-8 text-blue-400" />
              Évolution des Prix (2010-2024)
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {encyclopedicData.marketInsights.priceEvolution.map(data => (
                <div key={data.year} className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-2">{data.year}</div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Nautilus 5711: </span>
                      <span className="text-green-400 font-bold">CHF {(data.nautilus5711 / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Index PP: </span>
                      <span className="text-yellow-400 font-bold">{data.indexPP}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Tips */}
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-400" />
              Conseils d'Investissement Expert
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {encyclopedicData.marketInsights.investmentTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING SECTION */}
      <section id="manufacturing" className="py-32 bg-gradient-to-b from-blue-900/30 to-slate-900 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              L'Art de la Fabrication
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              De la conception à l'assemblage final.
            </p>
          </div>

          {/* Manufacturing Steps */}
          <div className="space-y-6 mb-16">
            {encyclopedicData.manufacturing.manufacturingSteps.map((step) => (
              <div 
                key={step.step}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{step.name}</h3>
                      <div className="bg-blue-500/20 px-4 py-2 rounded-full text-sm font-medium text-blue-300">
                        {step.duration}
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">{step.description}</p>
                    {expertMode && (
                      <div className="bg-white/5 rounded-xl p-4 text-sm">
                        <span className="text-slate-400">Expert: </span>
                        <span className="text-white">{step.team || step.expertise || step.precision}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Facts */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, label: 'Employés', value: encyclopedicData.manufacturing.employees },
              { icon: Watch, label: 'Production/an', value: encyclopedicData.manufacturing.production },
              { icon: Award, label: 'Contrôles', value: '23 critères' }
            ].map((fact, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 text-center">
                <fact.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{fact.value}</div>
                <div className="text-sm text-slate-400">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <Crown className="w-20 h-20 text-yellow-400 mx-auto mb-8 animate-pulse" />
          <h2 className="text-6xl font-bold text-white mb-6">
            La Référence Absolue Patek Philippe
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Guide encyclopédique complet • 185 ans d'histoire • Données marché exclusives
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3 justify-center"
            >
              <RotateCcw className="w-6 h-6" />
              Relire depuis le début
            </button>
          </div>

          {!expertMode && (
            <div className="mt-12 bg-yellow-500/20 border-2 border-yellow-400/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-yellow-300 font-bold mb-2">🎮 Easter Egg Caché</p>
              <p className="text-sm text-white/80">
                Tapez le code Konami pour débloquer le Mode Expert :<br/>
                <span className="font-mono text-yellow-300">↑ ↑ ↓ ↓ ← → ← → B A</span>
              </p>
            </div>
          )}

          {expertMode && (
            <div className="mt-12 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-yellow-300 font-bold mb-2 flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6" />
                Mode Expert Activé !
              </p>
              <p className="text-sm text-white">
                Vous avez accès aux données techniques exclusives et insights marché avancés.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">Patek Philippe</span>
              </div>
              <p className="text-slate-400 text-sm">
                La référence mondiale en horlogerie de luxe depuis 1839.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Explorez</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Collections</li>
                <li className="hover:text-white transition-colors cursor-pointer">Histoire</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Comparateur</li>
                <li className="hover:text-white transition-colors cursor-pointer">Prix du Marché</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Communauté</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Newsletter</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 HorloLearn - Référence Mondiale Patek Philippe
            </p>
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        {favorites.length > 0 && (
          <button className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-all relative">
            <Heart className="w-6 h-6 text-white fill-current" />
            <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          </button>
        )}
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
        >
          <ChevronDown className="w-6 h-6 text-white rotate-180" />
        </button>
      </div>
    </div>
  );
}
