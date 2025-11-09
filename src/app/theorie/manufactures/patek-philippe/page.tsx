'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChevronLeft, Crown, Award, Calendar, Zap, Shield, 
  Trophy, Heart, TrendingUp, Globe, Users, 
  Watch, Settings, Diamond, Sparkles, Clock, BookOpen,
  Activity, Moon, Sun, RotateCcw, Target, Eye, Share2,
  Star, Play, Pause, Volume2, X, ChevronDown,
  BarChart3, TrendingUpIcon, ClockIcon
} from 'lucide-react';

// Easter egg: Konami code pour les vrais collectionneurs
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const SECRET_UNLOCK_KEY = 'pp-grandmaster-unlocked';

export default function PatekPhilippeUltimatePage() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null);
  const [openComplications, setOpenComplications] = useState<Record<string, boolean>>({});
  const [favoriteModels, setFavoriteModels] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Données enrichies avec statistiques secrètes
  const eras = {
    all: { label: 'Toute l\'Histoire', color: 'blue', glow: 'shadow-blue-500/50' },
    foundation: { label: '1839-1851 : Naissance', color: 'blue', glow: 'shadow-blue-500/50' },
    golden: { label: '1851-1925 : Âge d\'Or', color: 'amber', glow: 'shadow-amber-500/50' },
    complications: { label: '1925-1976 : Maître des Complications', color: 'purple', glow: 'shadow-purple-500/50' },
    modern: { label: '1976-2024 : Révolution & Héritage', color: 'cyan', glow: 'shadow-cyan-500/50' }
  };

  const timelineData = [
    { id: '1839', year: 1839, title: 'La Naissance d\'une Légende', description: 'Antoine Norbert de Patek fonde Patek, Czapek & Cie à Genève avec une vision : créer les montres les plus précises du monde.', type: 'foundation', rarity: '★★★★★' },
    { id: '1845', year: 1845, title: 'L\'Homme qui changea tout', description: 'Jean-Adrien Philippe révolutionne l\'horlogerie avec le remontoir à couronne, rendant les clés obsolètes.', type: 'foundation', rarity: '★★★★☆' },
    { id: '1851', year: 1851, title: 'La Couronne Royale', description: 'La Reine Victoria s\'approprie une Patek, début d\'une clientèle royale mondiale.', type: 'golden', rarity: '★★★★★' },
    { id: '1925', year: 1925, title: 'Le Miracle Perpétuel', description: 'Première montre-bracelet au monde avec quantième perpétuel - une prouesse technique impossible.', type: 'complications', rarity: '★★★★★' },
    { id: '1932', year: 1932, title: 'La Sauvegarde Familiale', description: 'Les frères Stern sauvent Patek de la faillite, créant le premier groupe horloger familial indépendant.', type: 'complications', rarity: '★★★★★' },
    { id: '1976', year: 1976, title: 'La Révolution Genta', description: 'Gérald Genta dessine le Nautilus en 5 minutes, créant le sport-luxe moderne.', type: 'modern', rarity: '★★★★★' },
    { id: '2014', year: 2014, title: 'Le Graal Horloger', description: 'Grandmaster Chime 5175 : 20 complications, 1,366 heures de fabrication, pièce ultime.', type: 'modern', rarity: '★★★★★' }
  ];

  const collections = [
    {
      name: 'Calatrava',
      year: 1932,
      description: 'L\'essence de l\'élégance. Un design qui transcende le temps, inspiré du Bauhaus.',
      characteristics: ['Cadran émail grand feu • 7mm d\'épaisseur', 'Mouvement automatique 30‑255 PS • 38h', 'Finition manuelle • 1300h de travail'],
      price: '25 000 - 150 000 €',
      models: ['Ref. 6119', 'Ref. 5227', 'Ref. 6007G'],
      rarity: '🟢 Disponible',
      glow: 'shadow-blue-500/20'
    },
    {
      name: 'Nautilus',
      year: 1976,
      description: 'Le graal des collectionneurs. Boîtier octogonal, attente de 10 ans minimum.',
      characteristics: ['acier 904L inrayable • Étanchéité 120m', 'Calibre 26‑330 S C • 45h de réserve', 'Lunette sertie option • 5% acceptés'],
      price: '35 000 - 500 000+ €',
      models: ['Ref. 5711/1A', 'Ref. 5811/1G', 'Ref. 5990/1A'],
      rarity: '🔴 Liste d\'attente 10 ans',
      glow: 'shadow-green-500/30'
    },
    {
      name: 'Aquanaut',
      year: 1997,
      description: 'La montre de l\'aventurier moderne. Bracelet Tropical indestructible.',
      characteristics: ['Braceau composite Tropical • 120m étanchéité', 'Calibre automatique 26‑330 S C', 'Cadran gaufré • Look sport'],
      price: '20 000 - 250 000 €',
      models: ['Ref. 5167A', 'Ref. 5168G', 'Ref. 5968A'],
      rarity: '🟡 Liste d\'attente 3-5 ans',
      glow: 'shadow-orange-500/30'
    },
    {
      name: 'Grandes Complications',
      year: 'Multiples',
      description: 'Le sommet de l\'art horlogère. Des pièces uniques, parfois sur mesure.',
      characteristics: ['20+ complications • 3000h+ de fabrication', 'Mouvements uniques • Pièces uniques', 'Réservés aux grands collectionneurs'],
      price: '100 000 - 2 500 000 €',
      models: ['Ref. 5303R', 'Ref. 6301P', 'Ref. 5175'],
      rarity: '⚫ Sur invitation uniquement',
      glow: 'shadow-purple-500/40'
    }
  ];

  const complications = [
    { 
      name: 'Quantième Perpétuel', 
      description: 'Affiche automatiquement la date correcte jusqu\'en 2100 sans réglage manuel.',
      difficulty: '★★★★★',
      models: ['Ref. 5327', 'Ref. 5320G']
    },
    { 
      name: 'Répétition Minutes', 
      description: 'Sonne les heures, les quarts et les minutes sur demande. Mécanisme à 3 marteaux.',
      difficulty: '★★★★★',
      models: ['Ref. 5303R', 'Ref. 6301P']
    },
    { 
      name: 'Tourbillon', 
      description: 'Compense les effets de la gravité sur le mouvement pour une précision optimale.',
      difficulty: '★★★★☆',
      models: ['Ref. 5316/50P']
    },
    { 
      name: 'Chronographe Rattrapante', 
      description: 'Chronomètre des intervalles de temps simultanés avec plusieurs aiguilles.',
      difficulty: '★★★★☆',
      models: ['Ref. 5372P', 'Ref. 5204G']
    },
    { 
      name: 'Équation du Temps', 
      description: 'Affiche la différence entre le temps solaire vrai et le temps moyen civil.',
      difficulty: '★★★★★',
      models: ['Ref. 5320G']
    },
    { 
      name: 'Heure Universelle', 
      description: 'Affiche 24 fuseaux horaires simultanément sur un cadran rotatif.',
      difficulty: '★★★★☆',
      models: ['Ref. 5230', 'Ref. 5524']
    }
  ];

  // Hooks avancés
  useEffect(() => {
    // Scroll progress
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
      setParallaxOffset(scrolled * 0.5);
      setShowScrollIndicator(scrolled < 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Konami code detector
    const handleKeyDown = (e: KeyboardEvent) => {
      if (KONAMI_CODE[konamiProgress] === e.key) {
        setKonamiProgress(konamiProgress + 1);
        if (konamiProgress === KONAMI_CODE.length - 1) {
          setSecretMode(true);
          localStorage.setItem(SECRET_UNLOCK_KEY, 'true');
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  useEffect(() => {
    // Restore secret mode
    const unlocked = localStorage.getItem(SECRET_UNLOCK_KEY);
    if (unlocked) setSecretMode(true);
  }, []);

  // Handlers
  const toggleFavorite = useCallback((model: string) => {
    setFavoriteModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  }, []);

  const getRarityGlow = (rarity: string) => {
    if (rarity.includes('invitation')) return 'shadow-purple-500/50';
    if (rarity.includes('10 ans')) return 'shadow-red-500/50';
    if (rarity.includes('3-5')) return 'shadow-orange-500/50';
    return 'shadow-green-500/50';
  };

  return (
    <>
      <Head>
        <title>Patek Philippe - La Référence Absolue en Horlogerie de Luxe | HorloLearn</title>
        <meta name="description" content="Guide complet ultime sur Patek Philippe 2024 : histoire, collections, complications, records. Devenez expert en 15 minutes." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org ",
            "@type": "Organization",
            "name": "Patek Philippe",
            "foundingDate": "1839",
            "url": "https://horlolearn.com/manufactures/patek-philippe "
          })}
        </script>
      </Head>

      {/* Progress Bar cinématique */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        {/* Secret Mode Easter Egg */}
        {secretMode && (
          <div className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse">
            🏆 Mode Grandmaster Débloqué
          </div>
        )}

        {/* HEADER CINEMATIQUE avec parallax */}
        <header 
          ref={heroRef}
          className="relative h-screen overflow-hidden"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          {/* Ambiance lumière dynamique */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 opacity-90">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          </div>
          
          {/* Particules animées (CSS only) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-8 pb-20 relative z-10">
              <div className="flex items-start gap-6 mb-8">
                <Crown className="w-20 h-20 text-yellow-400 animate-pulse" />
                <div className="flex-1">
                  <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white animate-gradient">
                    Patek Philippe
                  </h1>
                  <p className="text-2xl text-blue-300 font-light italic max-w-4xl leading-relaxed">
                    "Vous ne possédez jamais complètement une Patek Philippe. <br/>
                    <span className="text-yellow-300">Vous n'en êtes que le gardien pour les générations futures."</span>
                  </p>
                </div>
              </div>
              
              {/* Stats dynamiques avec hover 3D */}
              <div className="flex gap-6 text-white/90 flex-wrap">
                {[
                  { label: 'Année de Fondation', value: '1839', glow: 'shadow-blue-500/50' },
                  { label: 'Brevets Innovants', value: '70+', glow: 'shadow-purple-500/50' },
                  { label: 'Indépendance Familiale', value: '100%', glow: 'shadow-green-500/50' },
                  { label: 'Croissance Moyenne', value: '+15%', glow: 'shadow-yellow-500/50' }
                ].map(stat => (
                  <div 
                    key={stat.label}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer hover:scale-105 ${stat.glow}`}
                  >
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Scroll indicator animé */}
              {showScrollIndicator && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-yellow-400" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* NAVIGATION FIXE avec effet glassmorphism évolutif */}
        <nav className="sticky top-0 z-50 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-b border-white/10 dark:border-slate-700/50 transition-all">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex gap-4 text-sm font-medium overflow-x-auto">
              {Object.entries(eras).map(([key, era], index) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedEra(key);
                    // Effet ripple
                    const btn = document.getElementById(`era-${key}`);
                    btn?.classList.add('animate-pulse');
                    setTimeout(() => btn?.classList.remove('animate-pulse'), 500);
                  }}
                  id={`era-${key}`}
                  className={`px-4 py-2 rounded-full transition-all whitespace-nowrap relative group ${
                    selectedEra === key 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {era.label}
                  {selectedEra === key && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/50 to-purple-600/50 blur-md -z-10 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            <Link href="/manufactures" className="text-blue-300 dark:text-blue-400 hover:text-blue-100 flex items-center gap-2 flex-shrink-0 transition-all hover:scale-105">
              <ChevronLeft className="w-4 h-4" /> Retour
            </Link>
          </div>
        </nav>

        {/* TIMELINE 3D avec connexions animées */}
        <section className="py-32 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <h2 className="text-6xl font-bold text-center mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white animate-gradient">
              Une Histoire sans Égale
            </h2>
            <p className="text-center text-slate-400 mb-16 max-w-3xl mx-auto">
              185 ans d'innovations qui ont façonné l'horlogerie moderne. Chaque étape est une révolution.
            </p>

            <div className="relative">
              {/* Ligne de connexion animée */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0 animate-[lineGrow_20s_linear_infinite]" />
              </div>
              
              <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
                {timelineData
                  .filter(item => selectedEra === 'all' || item.type === selectedEra)
                  .map((item, index) => (
                  <div 
                    key={item.id}
                    className="group relative cursor-pointer transition-all duration-300 flex-shrink-0"
                    style={{ minWidth: '350px' }}
                  >
                    {/* Glow effect on hover - CORRECTED LINE */}
                    <div className={`absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 ${eras[item.type as keyof typeof eras].glow}`} />
                    
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 shadow-2xl">
                      {/* Rarity badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.rarity}
                      </div>
                      
                      <div className="text-5xl font-bold text-blue-400 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Hover reveal */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                          Explorer cette époque →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTIONS avec mode comparateur et favoris */}
        <section className="py-32 bg-gradient-to-b from-slate-900 to-black relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white animate-gradient">
                Les 4 Piliers de la Maison
              </h2>
              <p className="text-slate-400 mt-4">Sélectionnez pour comparer • ❤️ pour vos favoris</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((collection) => (
                <div 
                  key={collection.name}
                  className={`group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${collection.glow}`}
                  onMouseEnter={() => setHoveredWatch(collection.name)}
                  onMouseLeave={() => setHoveredWatch(null)}
                >
                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(collection.name)}
                    className="absolute top-4 right-4 z-20 bg-black/50 rounded-full p-2 hover:bg-red-500/50 transition-all"
                  >
                    <Heart className={`w-5 h-5 ${favoriteModels.includes(collection.name) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>

                  {/* 3D Watch Visual */}
                  <div className="relative h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64 group-hover:animate-[float_4s_ease-in-out_infinite]">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-full border-4 border-slate-600 flex items-center justify-center">
                          <Watch className="w-24 h-24 text-yellow-400 z-10" />
                          {/* Cadran glow effect */}
                          <div className="absolute inset-2 rounded-full bg-blue-500/10 blur-lg" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Rarity badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      {collection.rarity}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{collection.name}</h3>
                      <span className={`text-xs font-bold ${collection.year === 'Multiples' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'} px-3 py-1 rounded-full`}>
                        {collection.year}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                    
                    {/* Characteristics with icons */}
                    <div className="space-y-3 mb-6">
                      {collection.characteristics.map((char, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-400">{char}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                      <div className="text-lg font-bold text-yellow-400">
                        {collection.price}
                      </div>
                      <button className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all ${favoriteModels.includes(collection.name) ? 'animate-pulse' : ''}`}>
                        {favoriteModels.includes(collection.name) ? 'Enregistré ✓' : 'Comparer →'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Favorites summary (apparaît si sélection) */}
            {favoriteModels.length > 0 && (
              <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Votre Sélection de Collectionneur</h3>
                <div className="flex flex-wrap gap-3">
                  {favoriteModels.map(model => (
                    <span key={model} className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-600/30">
                      {model}
                    </span>
                  ))}
                </div>
                <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                  Sauvegarder ma sélection
                </button>
              </div>
            )}
          </div>
        </section>

        {/* COMPLICATIONS avec animations 3D et mode expert */}
        <section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <h2 className="text-6xl font-bold text-center mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white animate-gradient">
              Complications Maîtresses
            </h2>
            <p className="text-center text-slate-300 mb-16 max-w-3xl mx-auto">
              Des mécanismes si complexes que moins de 10 horlogers au monde savent les assembler.
            </p>

            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-12 border border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Visualisation 3D interactive */}
                <div className="relative h-96">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
                  <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center border border-slate-600/50 cursor-move group">
                    <div className="text-center">
                      <Settings className="w-32 h-32 text-yellow-400 mx-auto mb-6 group-hover:animate-spin" style={{ animationDuration: '20s' }} />
                      <p className="text-white font-medium">Tournez pour explorer le calibre</p>
                      <p className="text-slate-400 text-sm mt-2">Calibre R TO 27 PS • 50h de réserve</p>
                    </div>
                    {/* Glow effect that follows mouse */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                </div>

                {/* Liste complications avec difficulté */}
                <div className="space-y-4">
                  {complications.map((comp) => (
                    <div key={comp.name} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                      <div className="relative bg-slate-800/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm hover:border-blue-500/50 transition-all">
                        <button
                          type="button"
                          onClick={() => setOpenComplications(prev => ({
                            ...prev,
                            [comp.name]: !prev[comp.name]
                          }))}
                          className="w-full flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                              <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-yellow-400">{comp.difficulty}</span>
                                <span className="text-xs text-slate-400">Difficulté</span>
                              </div>
                            </div>
                          </div>
                          <ChevronLeft className={`w-6 h-6 text-slate-400 transition-all ${
                            openComplications[comp.name] ? '-rotate-90 text-white' : 'rotate-180'
                          }`} />
                        </button>
                        
                        {openComplications[comp.name] && (
                          <div className="mt-6 pt-6 border-t border-slate-600/50 animate-[slideDown_0.3s_ease-out]">
                            <p className="text-slate-300 leading-relaxed mb-4">
                              {comp.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {comp.models.map(model => (
                                  <span key={model} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-600/30">
                                    {model}
                                  </span>
                                ))}
                              </div>
                              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                                Explorer →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION RÉSERVÉE AUX EXPERTS (débloquée avec Konami) */}
        {secretMode && (
          <section className="py-32 bg-gradient-to-b from-purple-900 to-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
              <h2 className="text-5xl font-bold text-center mb-16 text-yellow-400 animate-pulse">
                🏆 Section Grandmaster Débloquée
              </h2>
              
              {/* Secrets de manufacture */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-yellow-500/30 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Secrets de Fabrication</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li>• 1 366 heures pour un quantième perpétuel</li>
                    <li>• 76 contrôles qualité par montre</li>
                    <li>• 2 ans de formation minimum</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-yellow-500/30 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Marché Noir</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">+300%</div>
                  <p className="text-slate-400">Prime sur Nautilus 5711</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-yellow-500/30 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Prototype Secret</h3>
                  <p className="text-slate-300">Ref. 6002 Sky Moon Tourbillon : 13 complications, 1 seule pièce/an.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CALL TO ACTION CINEMATIQUE */}
        <section className="relative py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)'
          }} />
          
          <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
            <h2 className="text-7xl font-bold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white animate-gradient">
              Devenir Gardien d'une Légende
            </h2>
            <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
              Recevez le guide Ultime Patek Philippe 2024 (92 pages) avec accès exclusif aux archives secrètes de la manufacture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl">
                <span className="relative z-10 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Télécharger le Guide Secret
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="group relative bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-black transition-all shadow-2xl">
                <span className="relative z-10 flex items-center gap-3">
                  <Share2 className="w-6 h-6" />
                  Inviter à un Salon Privé
                </span>
              </button>
            </div>

            <p className="mt-8 text-sm text-white/60">
              {secretMode ? '✓ Accès Grandmaster activé' : '↑ ↑ ↓ ↓ ← → ← → B A pour débloquer les secrets'}
            </p>
          </div>
        </section>

        {/* FOOTER EXTRAORDINAIRE */}
        <footer className="bg-black py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">Patek Philippe</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  La manufacture horlogère la plus prestigieuse du monde, depuis 1839.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Collections</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Grandes Complications</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Nautilus</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Aquanaut</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Calatrava</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Services Exclusifs</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Archives Historiques</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Service & Restauration</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Salons Privés</li>
                  <li className="hover:text-yellow-400 transition-colors cursor-pointer">Pièces Uniques</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Communauté</h4>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                    <Users className="w-5 h-5 text-slate-400 hover:text-white" />
                  </div>
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                    <Share2 className="w-5 h-5 text-slate-400 hover:text-white" />
                  </div>
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                    <Globe className="w-5 h-5 text-slate-400 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-sm">
                © 2024 HorloLearn - La Référence Absolue en Horlogerie Suisse. 
                <span className="text-yellow-400"> Tous droits réservés aux connaisseurs.</span>
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* STYLES ANIMATIONS AVANCÉES */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes lineGrow {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
