'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, Crown, Award, Calendar, Zap, Shield, 
  Trophy, Heart, TrendingUp, Globe, Users, 
  Watch, Settings, Diamond, Sparkles, Clock, 
  Play, Pause, RotateCcw, Star, 
  BarChart3, Target, BookOpen, Wrench
} from 'lucide-react';

// Composants dynamiques pour performance
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

export default function PatekPhilippeUltimate() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [auctionData, setAuctionData] = useState<any[]>([]);
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null);

  // Données enrichies
  const eras = {
    all: { label: 'Toute l\'Histoire', color: 'blue' },
    foundation: { label: '1839-1851 : Naissance', color: 'blue' },
    golden: { label: '1851-1925 : Âge d\'Or', color: 'yellow' },
    complications: { label: '1925-1976 : Maître des Complications', color: 'purple' },
    modern: { label: '1976-2024 : Révolution & Héritage', color: 'cyan' }
  };

  const timelineData = [
    { id: '1839', year: 1839, title: 'Fondation', description: 'Antoine Norbert de Patek créée Patek, Czapek & Cie à Genève.', type: 'foundation' },
    { id: '1845', year: 1845, title: 'Jean-Adrien Philippe', description: 'Invention du remontoir à couronne, révolution horlogère.', type: 'foundation' },
    { id: '1851', year: 1851, title: 'Client Royal', description: 'Reine Victoria achète une Patek. Début de la clientèle royale.', type: 'golden' },
    { id: '1868', year: 1868, title: 'Première Montre-Bracelet', description: 'Pour la comtesse Koscowicz, 50 ans avant l\'ère du bracelet.', type: 'golden' },
    { id: '1925', year: 1925, title: 'Quantième Perpétuel', description: 'Premier quantième perpétuel-bracelet du monde.', type: 'complications' },
    { id: '1932', year: 1932, title: 'Famille Stern', description: 'Rachat par les frères Stern, indépendance assurée.', type: 'complications' },
    { id: '1932', year: 1932, title: 'Calatrava', description: 'Naissance de la référence 96, icône de l\'elegance.', type: 'complications' },
    { id: '1956', year: 1956, title: 'Calendar', description: 'Premier calendrier annuel automatique (Ref. 2512).', type: 'complications' },
    { id: '1976', year: 1976, title: 'Nautilus', description: 'Gérald Genta révolutionne le sport-luxe.', type: 'modern' },
    { id: '1997', year: 1997, title: 'Aquanaut', description: 'Modernité et audace pour une nouvelle génération.', type: 'modern' },
    { id: '2014', year: 2014, title: '175e Anniversaire', description: 'Grandmaster Chime 5175, 20 complications.', type: 'modern' },
    { id: '2024', year: 2024, title: 'Innovation Continue', description: 'Nouveaux mouvements, nouveaux matériaux.', type: 'modern' }
  ];

  const collections = [
    {
      name: 'Calatrava',
      year: 1932,
      description: 'L\'essence même de l\'élégance horlogère. Forme ronde pure, design Bauhaus intemporel.',
      characteristics: ['Cadran émail grand feu', 'Boîtier ultra-fin (7mm)', 'Mouvement automatique 30-255 PS'],
      price: '25 000 - 150 000 €',
      image: '/images/calatrava.jpg',
      models: ['Ref. 6119', 'Ref. 5227', 'Ref. 6007G']
    },
    {
      name: 'Nautilus',
      year: 1976,
      description: 'L\'icône du sport-luxe. Boîtier octogonal inspiré des hublots des paquebots.',
      characteristics: ['Boîtier en acier inoxydable', 'Étanchéité 120m', 'Mouvement automatique 26-330 S C'],
      price: '35 000 - 500 000+ €',
      image: '/images/nautilus.jpg',
      models: ['Ref. 5711/1A', 'Ref. 5811/1G', 'Ref. 5990/1A']
    },
    {
      name: 'Aquanaut',
      year: 1997,
      description: 'Sportivité moderne et jeune. Bracelet "Tropical" composite résistant.',
      characteristics: ['Braceau "Tropical" composite', 'Étanchéité 120m', 'Mouvement automatique 26-330 S C'],
      price: '20 000 - 250 000 €',
      image: '/images/aquanaut.jpg',
      models: ['Ref. 5167A', 'Ref. 5168G', 'Ref. 5968A']
    },
    {
      name: 'Grandes Complications',
      year: 'Multiples',
      description: 'Le sommet de l\'art horlogère. Quantième perpétuel, répétition minutes, tourbillons.',
      characteristics: ['20+ complications possibles', 'Plus de 1 300 heures de fabrication', 'Mouvements uniques'],
      price: '100 000 - 2 500 000 €',
      image: '/images/complications.jpg',
      models: ['Ref. 5303R', 'Ref. 6301P', 'Grandmaster Chime']
    }
  ];

  const records = [
    { 
      title: 'Montre la plus chère du monde', 
      value: '31,2M €', 
      model: 'Ref. 1518 en acier inoxydable (2016)',
      description: 'Record absolu aux enchères pour une montre Patek Philippe.'
    },
    { 
      title: 'Record de complications', 
      value: '20 complications', 
      model: 'Grandmaster Chime 5175',
      description: 'Montre la plus compliquée jamais créée par la manufacture.'
    },
    { 
      title: 'Temps de fabrication moyen', 
      value: '12 mois', 
      model: 'Pour une Calatrava simple',
      description: 'Jusqu\'à 4 ans pour une Grande Complication.'
    },
    { 
      title: 'Valeur de revente', 
      value: '+200-1000%', 
      model: 'Sur les modèles Nautilus et Aquanaut',
      description: 'Meilleure performance d\'investissement horlogère.'
    }
  ];

  const testimonials = [
    { author: 'John F. Kennedy', text: 'Sa Patek Philippe lui a été offerte par Marilyn Monroe' },
    { author: 'Albert Einstein', text: 'Possédait une Patek Philippe avec chronographe' },
    { author: 'Brad Pitt', text: 'Collectionneur passionné, possède plusieurs modèles rares' },
    { author: 'Victoria Beckham', text: 'Porte régulièrement un Nautilus 5711 en acier' }
  ];

  // Fetch données en temps réel
  useEffect(() => {
    // API enchères Phillips, Christie's
    fetchAuctionData();
  }, []);

  const fetchAuctionData = async () => {
    try {
      // Simulation API
      const data = [
        { auction: 'Phillips 2024', model: 'Ref. 5711/1A-018 Tiffany', price: '5,8M €', date: '2024-01' },
        { auction: 'Christie\'s 2023', model: 'Ref. 1518 en acier', price: '3,2M €', date: '2023-11' }
      ];
      setAuctionData(data);
    } catch (error) {
      console.error('Erreur chargement enchères:', error);
    }
  };

  return (
    <Head>
      <title>Patek Philippe - La Référence Absolue en Horlogerie de Luxe | HorloLearn</title>
      <meta name="description" content="Guide complet ultime sur Patek Philippe : histoire, collections, complications, records d'enchères. Devenez expert en 15 minutes." />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Patek Philippe",
          "logo": "/logo-patek.png",
          "url": "https://horlolearn.com/manufactures/patek-philippe"
        })}
      </script>
    </Head>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER CINÉMATIQUE */}
      <header className="relative h-screen overflow-hidden">
        <ReactPlayer
          url="/videos/patek-hero.mp4"
          playing={isPlaying}
          loop
          muted
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ objectFit: 'cover' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-8 pb-20">
            <div className="flex items-start gap-6 mb-8">
              <Crown className="w-20 h-20 text-yellow-400" />
              <div>
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                  Patek Philippe
                </h1>
                <p className="text-2xl text-blue-200 font-light italic max-w-4xl">
                  "Vous n'êtes jamais propriétaire d'une Patek Philippe. Vous n'en êtes que le gardien pour les générations futures."
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 text-white/90">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">1839</div>
                <div className="text-sm">Année de Fondation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">70+</div>
                <div className="text-sm">Brevets Innovants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Indépendance Familiale</div>
              </div>
            </div>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause' : 'Découvrir l\'Histoire'}
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION FIXE */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-6 text-sm font-medium">
            {Object.entries(eras).map(([key, era]) => (
              <button
                key={key}
                onClick={() => setSelectedEra(key)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedEra === key 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>
          <Link href="/manufactures" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </nav>

      {/* SECTION 2 : TIMELINE 3D */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Une Histoire sans Égale
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            185 ans d'innovations qui ont façonné l'horlogerie moderne
          </p>

          <div className="overflow-x-auto pb-8">
            <div className="flex gap-8 min-w-max">
              {timelineData
                .filter(item => selectedEra === 'all' || item.type === selectedEra)
                .map((item, index) => (
                <div 
                  key={item.id}
                  className={`relative group cursor-pointer transition-all`}
                  style={{ minWidth: '300px' }}
                  onClick={() => document.getElementById(`detail-${item.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                                rounded-2xl p-6 border-2 border-transparent hover:border-blue-300 
                                dark:hover:border-blue-600 transition-all group-hover:scale-105">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Connecteur */}
                  {index < timelineData.length - 1 && (
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : DNA TECHNIQUE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            ADN Technique
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Ce qui rend Patek Philippe irréprochable
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Mouvements Manufacture
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                100% des mouvements sont développés et assemblés en interne. Plus de 1 300 heures de travail pour un simple automatique.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Calibre 240</span>
                  <span className="font-mono text-slate-900 dark:text-white">27 mm / 2,53 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Calibre 324</span>
                  <span className="font-mono text-slate-900 dark:text-white">27 mm / 3,30 mm</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Diamond className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Finitions Hallmark
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Le Sceau Patek Philippe impose des standards 2x plus stricts que le Poinçon de Genève.
              </p>
              <div className="space-y-3 text-sm">
                {['-3/+2 sec/jour', 'Angles chanfreinés à 45°', 'Polissage miroir intérieur', '703 tests finaux'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Précision Absolue
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Chaque montre est testée 15 jours dans 5 positions et 3 températures différentes.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Test de précision</span>
                  <span className="font-mono text-slate-900 dark:text-white">15 jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Positions testées</span>
                  <span className="font-mono text-slate-900 dark:text-white">5 positions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tolérance</span>
                  <span className="font-mono text-slate-900 dark:text-white">-3/+2 sec/j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 : GALERIES IMMERSIVES */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Collections Iconiques
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Explorez chaque détail des modèles légendaires
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection) => (
              <div 
                key={collection.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredWatch(collection.name)}
                onMouseLeave={() => setHoveredWatch(null)}
              >
                {/* Image 3D (placeholder) */}
                <div className="bg-slate-200 dark:bg-slate-800 h-80 flex items-center justify-center">
                  <Watch className="w-24 h-24 text-slate-400" />
                </div>
                
                {/* Overlay info */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                              transition-all ${hoveredWatch === collection.name ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-sm mb-3">{collection.description}</p>
                    <div className="flex gap-2">
                      {collection.models.slice(0, 2).map(model => (
                        <span key={model} className="bg-white/20 px-2 py-1 rounded text-xs">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badge prix */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {collection.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 : PREUVES DE DOMINATION */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mr-3" />
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
              Records & Preuves
            </h2>
          </div>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Les chiffres qui parlent d'eux-mêmes
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Records d'enchères */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                Records d'Enchères
              </h3>
              <div className="space-y-4">
                {auctionData.length > 0 ? auctionData.map((auction, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{auction.model}</div>
                      <div className="text-sm text-slate-500">{auction.auction} - {auction.date}</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {auction.price}
                    </div>
                  </div>
                )) : records.slice(0, 2).map(record => (
                  <div key={record.title} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{record.model}</div>
                      <div className="text-sm text-slate-500">{record.title}</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {record.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Célébrités */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                Ambassadeurs Historiques
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-slate-500">{testimonial.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infographie chiffres clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Mouvements créés', value: '150+' },
              { label: 'Heures de fabrication', value: '1 300+' },
              { label: 'Tests de précision', value: '703' },
              { label: 'Ans de garantie', value: 'À vie' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 : SIMULATEUR INTERACTIF */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Simulateur de Complications
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Visualisez les mécanismes complexes en temps réel
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Montre interactive */}
              <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                           rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center">
                  <Watch className="w-32 h-32 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Intégration 3D des complications à venir
                  </p>
                </div>
              </div>

              {/* Contrôles */}
              <div className="lg:w-1/2 space-y-6">
                {[
                  { name: 'Quantième Perpétuel', description: 'Affiche automatiquement la date correcte jusqu\'en 2100' },
                  { name: 'Répétition Minutes', description: 'Sonne les heures, les quarts et les minutes sur demande' },
                  { name: 'Tourbillon', description: 'Compense les effets de la gravité pour une précision optimale' },
                  { name: 'Chronographe Rattrapante', description: 'Permet de chronométrer des intervalles simultanés' }
                ].map(comp => (
                  <div key={comp.name} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {comp.name}
                      </h4>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                        Activer
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 : ÉCOSYSTÈME */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            L'Écosystème Patek Philippe
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Un service d'excellence sans équivalent
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                         rounded-2xl p-8 border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Archives
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Chaque montre possède son "livre d'identité" depuis 1839. Reconstitution possible de tout modèle historique.
              </p>
              <button className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                Explorer les archives <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-800 
                         rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:shadow-xl transition-all">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Service & Réparation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Garantie à vie. Chaque montre, quelle que soit son âge, peut être réparée avec des pièces originales.
              </p>
              <button className="text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                Prendre RDV <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-800 
                         rounded-2xl p-8 border border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Salons Patek Philippe
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Genève, Paris, Londres, Tokyo. Expérience d'achat sur invitation uniquement.
              </p>
              <button className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-2">
                Trouver un salon <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 : DATA HUB */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Marché & Performance
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Données en temps réel de l'écosystème Patek Philippe
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Valeur de Revente des Collections</h3>
                <BarChart3 className="w-full h-64 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Production Annuelle Limitée</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span>Calatrava</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="font-mono text-sm">30%</span>
                    </div>
                  </div>
                  {/* ... autres collections ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION PRESTIGE */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Devenir Gardien d'une Légende
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Recevez le guide Ultime Patek Philippe 2024 (92 pages) et accédez aux informations réservées aux collectionneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              Télécharger le Guide
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all">
              Prendre Rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER INTÉGRÉ */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold">Patek Philippe</span>
            </div>
            <div className="text-sm text-slate-400">
              © 2024 HorloLearn - La Référence Absolue
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
