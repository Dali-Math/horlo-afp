'use client';
import { Target } from 'lucide-react'
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChevronLeft, Crown, Award, Calendar, Zap, Shield, 
  Trophy, Heart, TrendingUp, Globe, Users, 
  Watch, Settings, Diamond, Sparkles, Clock 
} from 'lucide-react';

export default function PatekPhilippeUltimatePage() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null);
  const [selectedComplication, setSelectedComplication] = useState<string>('');

  // Données enrichies
  const eras = {
    all: { label: 'Toute l\'Histoire', color: 'blue' },
    foundation: { label: '1839-1851 : Naissance', color: 'blue' },
    golden: { label: '1851-1925 : Âge d\'Or', color: 'yellow' },
    complications: { label: '1925-1976 : Maître des Complications', color: 'purple' },
    modern: { label: '1976-2024 : Révolution & Héritage', color: 'cyan' }
  };

  const timelineData = [
    { id: '1839', year: 1839, title: 'Fondation de Patek, Czapek & Cie', description: 'Antoine Norbert de Patek s\'associe avec François Czapek à Genève.', type: 'foundation' },
    { id: '1845', year: 1845, title: 'Jean-Adrien Philippe', description: 'Invention du remontoir à couronne révolutionnaire.', type: 'foundation' },
    { id: '1851', year: 1851, title: 'Premier Client Royal', description: 'Reine Victoria achète une Patek à l\'Exposition de Londres.', type: 'golden' },
    { id: '1868', year: 1868, title: 'Première Montre-Bracelet', description: 'Pour la comtesse Koscowicz, 50 ans avant l\'ère du bracelet.', type: 'golden' },
    { id: '1925', year: 1925, title: 'Quantième Perpétuel', description: 'Premier quantième perpétuel-bracelet du monde.', type: 'complications' },
    { id: '1932', year: 1932, title: 'Famille Stern', description: 'Rachat par Charles et Jean Stern. Indépendance garantie.', type: 'complications' },
    { id: '1932b', year: 1932, title: 'Naissance Calatrava', description: 'Lancement de la référence 96, icône de l\'élégance.', type: 'complications' },
    { id: '1976', year: 1976, title: 'Révolution Nautilus', description: 'Gérald Genta crée le sport-luxe avec le Nautilus.', type: 'modern' },
    { id: '1997', year: 1997, title: 'Aquanaut', description: 'Modernité et audace pour une nouvelle génération.', type: 'modern' },
    { id: '2014', year: 2014, title: '175e Anniversaire', description: 'Grandmaster Chime 5175, 20 complications.', type: 'modern' },
    { id: '2024', year: 2024, title: 'Innovation Continue', description: 'Nouveaux mouvements, nouveaux matériaux.', type: 'modern' }
  ];

  const collections = [
    {
      name: 'Calatrava',
      year: 1932,
      description: 'L\'essence de l\'élégance horlogère. Design Bauhaus intemporel, lignes pures et raffinées.',
      characteristics: ['Cadran émail grand feu', 'Boîtier ultra-fin 7mm', 'Mouvement automatique 30-255 PS', 'Finissage manuel'],
      price: '25 000 - 150 000 €',
      models: ['Ref. 6119', 'Ref. 5227', 'Ref. 6007G']
    },
    {
      name: 'Nautilus',
      year: 1976,
      description: 'L\'icône du sport-luxe. Boîtier octogonal inspiré des hublots de paquebots, design révolutionnaire.',
      characteristics: ['Boîtier en acier inoxydable', 'Lunette octogonale', 'Étanchéité 120m', 'Bracelet intégré'],
      price: '35 000 - 500 000 €',
      models: ['Ref. 5711/1A', 'Ref. 5811/1G', 'Ref. 5990/1A']
    },
    {
      name: 'Aquanaut',
      year: 1997,
      description: 'Sportivité moderne. Bracelet "Tropical" composite résistant, design jeune et audacieux.',
      characteristics: ['Bracelet composite "Tropical"', 'Étanchéité 120m', 'Mouvement automatique', 'Cadran gaufré'],
      price: '20 000 - 250 000 €',
      models: ['Ref. 5167A', 'Ref. 5168G', 'Ref. 5968A']
    },
    {
      name: 'Grandes Complications',
      year: 'Multiples',
      description: 'Le sommet de l\'art horlogère. Quantièmes perpétuels, répétitions minutes, tourbillons.',
      characteristics: ['20+ complications possibles', '1 300+ heures de fabrication', 'Mouvements uniques', 'Pièces uniques'],
      price: '100 000 - 2 500 000 €',
      models: ['Ref. 5303R', 'Ref. 6301P', 'Ref. 5175']
    }
  ];

  const complications = [
    { name: 'Quantième Perpétuel', description: 'Affiche automatiquement la date correcte jusqu\'en 2100' },
    { name: 'Répétition Minutes', description: 'Sonne les heures, quarts et minutes sur demande' },
    { name: 'Tourbillon', description: 'Compense la gravité pour une précision optimale' },
    { name: 'Chronographe Rattrapante', description: 'Chronomètre des intervalles simultanés' },
    { name: 'Équation du Temps', description: 'Différence entre temps solaire et temps moyen' },
    { name: 'Heure Universelle', description: '24 fuseaux horaires sur un cadran' }
  ];

  return (
    <>
      <Head>
        <title>Patek Philippe - La Référence Absolue en Horlogerie de Luxe | HorloLearn</title>
        <meta name="description" content="Guide complet ultime sur Patek Philippe 2024 : histoire, collections, complications, records. Devenez expert en 15 minutes." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Patek Philippe",
            "foundingDate": "1839",
            "url": "https://horlolearn.com/manufactures/patek-philippe"
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        {/* HEADER CINEMATIQUE */}
        <header className="relative h-screen overflow-hidden">
          {/* Video Hero */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-6">👑</div>
                <p className="text-xl text-blue-200">Vidéo hero Patek Philippe (intégration à venir)</p>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Découvrir'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-8 pb-20">
              <div className="flex items-start gap-6 mb-8">
                <Crown className="w-20 h-20 text-yellow-400" />
                <div>
                  <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                    Patek Philippe
                  </h1>
                  <p className="text-2xl text-blue-200 font-light italic max-w-4xl">
                    "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes juste le gardien pour les générations futures."
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 text-white/90 flex-wrap">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold">1839</div>
                  <div className="text-sm">Année de Fondation</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold">70+</div>
                  <div className="text-sm">Brevets Innovants</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Indépendance Familiale</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* NAVIGATION FIXE */}
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex gap-4 text-sm font-medium overflow-x-auto">
              {Object.entries(eras).map(([key, era]) => (
                <button
                  key={key}
                  onClick={() => setSelectedEra(key)}
                  className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    selectedEra === key 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
            <Link href="/manufactures" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-2 flex-shrink-0">
              <ChevronLeft className="w-4 h-4" /> Retour
            </Link>
          </div>
        </nav>

        {/* TIMELINE 3D */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              Une Histoire sans Égale
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              185 ans d'innovations qui ont façonné l'horlogerie moderne
            </p>

            <div className="overflow-x-auto pb-8">
              <div className="flex gap-8 min-w-max">
                {timelineData
                  .filter(item => selectedEra === 'all' || item.type === selectedEra)
                  .map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative group cursor-pointer transition-all"
                    style={{ minWidth: '300px' }}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                                  rounded-2xl p-6 border-2 border-transparent hover:border-blue-400 
                                  dark:hover:border-blue-600 transition-all group-hover:scale-105 shadow-lg">
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
                      <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-blue-300 dark:bg-blue-600"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PILLIERS TECHNIQUES */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              ADN Technique
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Ce qui rend Patek Philippe irréprochable
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Mouvements Manufacture
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  100% développés et assemblés en interne. Plus de 1 300 heures de travail pour un automatique simple.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Calibre 240</span>
                    <span className="font-mono text-slate-900 dark:text-white">27 mm / 2,53 mm</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Diamond className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Finitions Hallmark
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Le Sceau Patek Philippe impose des standards 2x plus stricts que le Poinçon de Genève.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    -3/+2 sec/jour
                  </div>
                  <div className="text-xs text-slate-500">Tolérance finale</div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Précision Absolue
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Chaque montre est testée 15 jours dans 5 positions et 3 températures.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tests</span>
                    <span className="font-mono text-slate-900 dark:text-white">703 points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              Collections Iconiques
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Cliquez pour explorer chaque modèle en détail
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((collection) => (
                <div 
                  key={collection.name}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all"
                  onMouseEnter={() => setHoveredWatch(collection.name)}
                  onMouseLeave={() => setHoveredWatch(null)}
                >
                  <div className="h-80 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                               flex items-center justify-center relative">
                    <Watch className="w-32 h-32 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
                    {hoveredWatch === collection.name && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <div className="text-lg font-bold mb-1">{collection.name}</div>
                          <div className="text-sm opacity-90">{collection.year}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{collection.name}</h3>
                      <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                        {collection.year}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {collection.price}
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                                       font-medium text-sm flex items-center gap-1 transition-all">
                        Détails →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIMULATEUR COMPLICATIONS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              Complications Maîtresses
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Les mécanismes les plus complexes jamais créés
            </p>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 
                             rounded-xl p-8 h-96 flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                  <div className="text-center">
                    <Settings className="w-32 h-32 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-spin" style={{ animationDuration: '10s' }} />
                    <p className="text-slate-600 dark:text-slate-400">Visualisation 3D du Calibre R TO 27 PS</p>
                    <p className="text-sm text-slate-500 mt-2">50h de réserve, 2,95 Hz</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {complications.map((comp, index) => (
                    <div 
                      key={comp.name}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all cursor-pointer"
                      onClick={() => setSelectedComplication(selectedComplication === comp.name ? '' : comp.name)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                        <ChevronLeft className={`w-5 h-5 text-slate-400 transition-transform ${selectedComplication === comp.name ? '-rotate-90' : 'rotate-180'}`} />
                      </div>
                      {selectedComplication === comp.name && (
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{comp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION FINAL */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="max-w-5xl mx-auto px-8 text-center">
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

        {/* FOOTER */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold">Patek Philippe</div>
                  <div className="text-xs text-slate-400">La référence absolue depuis 1839</div>
                </div>
              </div>
              <div className="text-sm text-slate-400 text-center md:text-right">
                © 2024 HorloLearn - Guide de Référence Horlogère<br />
                Contenu certifié • Données en temps réel
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
