'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Crown, Award, Calendar, Zap, Shield } from 'lucide-react';

export default function PatekPhilippePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const timeline = [
    {
      id: 'fondation',
      year: '1839',
      title: 'Fondation de Patek, Czapek & Cie',
      description: 'Antoine Norbert de Patek s\'associe avec François Czapek à Genève. Production de 200 montres haute qualité par an.',
      icon: '🏭',
      color: 'blue' as const
    },
    {
      id: 'philippe',
      year: '1845-1851',
      title: 'Arrivée de Jean-Adrien Philippe',
      description: 'Rencontre décisive à l\'Exposition de Paris 1844. Philippe invente le remontoir à couronne révolutionnaire. La marque devient Patek Philippe & Cie en 1851.',
      icon: '🔑',
      color: 'green' as const
    },
    {
      id: 'victoria',
      year: '1851',
      title: 'Premier Client Royal',
      description: 'La Reine Victoria achète une montre Patek Philippe à l\'Exposition de Londres. Début d\'une clientèle royale mondiale.',
      icon: '👑',
      color: 'purple' as const
    },
    {
      id: 'bracelet',
      year: '1868',
      title: 'Première Montre-Bracelet Suisse',
      description: 'Création de l\'une des premières montres-bracelet au monde pour la comtesse Koscowicz, 50 ans avant la popularisation du format.',
      icon: '⌚',
      color: 'orange' as const
    },
    {
      id: 'perpetuel',
      year: '1925',
      title: 'Premier Quantième Perpétuel-Bracelet',
      description: 'Première montre-bracelet mondiale équipée d\'un quantième perpétuel. Complication technique extraordinaire.',
      icon: '📅',
      color: 'red' as const
    },
    {
      id: 'stern',
      year: '1932',
      title: 'Rachat par la Famille Stern',
      description: 'Les frères Stern sauvent Patek Philippe de la faillite. Garantie d\'indépendance familiale jusqu\'à aujourd\'hui.',
      icon: '🏛️',
      color: 'blue' as const
    },
    {
      id: 'calatrava',
      year: '1932',
      title: 'Naissance de la Calatrava',
      description: 'Lancement de la référence 96 Calatrava. Symbole absolu de l\'élégance horlogère, design Bauhaus intemporel.',
      icon: '✨',
      color: 'green' as const
    },
    {
      id: 'nautilus',
      year: '1976',
      title: 'Révolution Nautilus',
      description: 'Gérald Genta dessine le Nautilus, montre de sport de luxe révolutionnaire. Boîtier octogonal inspiré d\'un hublot de paquebot.',
      icon: '🚢',
      color: 'cyan' as const
    },
  ];

  const collections = [
    {
      name: 'Calatrava',
      year: '1932',
      description: 'Symbole absolu de l\'élégance horlogère. Design épuré et intemporel inspiré du mouvement Bauhaus.',
      characteristics: ['Ligne pure minimaliste', 'Proportions parfaites', 'Finitions exquises', 'Élégance intemporelle'],
      color: 'blue' as const
    },
    {
      name: 'Nautilus',
      year: '1976',
      description: 'Montre sport-luxe révolutionnaire. Boîtier octogonal breveté, inspiration hublot de paquebot.',
      characteristics: ['Design Gérald Genta', 'Boîtier octogonal', 'Étanchéité 120m', 'Sportive élégante'],
      color: 'green' as const
    },
    {
      name: 'Aquanaut',
      year: '1997',
      description: 'Montre sportive moderne avec bracelet composite. Cadran gaufré « Tropical » emblématique.',
      characteristics: ['Design contemporain', 'Bracelet composite', 'Étanchéité 120m', 'Sportive accessible'],
      color: 'orange' as const
    },
    {
      name: 'Complications',
      year: '1996',
      description: 'Garde-temps à complications horlogères majeures. Quantième annuel, chronographes, répétitions.',
      characteristics: ['Quantième annuel', 'Chronographes', 'Phases de lune', 'GMT/World Time'],
      color: 'purple' as const
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
      red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      cyan: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
             href="/manufactures" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Manufactures
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Genevoise
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Crown className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                Patek Philippe
              </h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold italic leading-relaxed">
                "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes juste le gardien pour les générations futures."
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mb-8">
            Fondée à Genève en 1839, Patek Philippe incarne l'excellence absolue de l'horlogerie de luxe. 
            Manufacture indépendante et familiale depuis 1932, elle est réputée pour ses complications 
            exceptionnelles et son prestige inégalé.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">1839</div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Année de fondation</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">70+</div>
              <div className="text-xs font-medium text-green-600 dark:text-green-400">Brevets déposés</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">185+</div>
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Ans d'histoire</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300 mb-1">100%</div>
              <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Indépendance familiale</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: TIMELINE INTERACTIVE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Chronologie Historique
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque étape pour découvrir l'histoire de Patek Philippe :
          </p>

          <div className="space-y-4">
            {timeline.map((period) => (
              <div key={period.id}>
                <div
                  onClick={() => setSelectedPeriod(selectedPeriod === period.id ? '' : period.id)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPeriod === period.id
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500'
                  } ${getColorClasses(period.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{period.icon}</span>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-full">
                            {period.year}
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                            {period.title}
                          </h4>
                        </div>
                        {selectedPeriod !== period.id && (
                          <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-1">
                            {period.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronLeft className={`w-6 h-6 text-slate-400 transition-transform ${selectedPeriod === period.id ? '-rotate-90' : 'rotate-180'}`} />
                  </div>
                </div>

                {selectedPeriod === period.id && (
                  <div className="mt-3 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {period.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: FONDATEURS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Fondateurs
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Antoine Norbert de Patek</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Né en Pologne en 1812, fuit après la révolution et s'installe à Genève en 1832. Visionnaire et entrepreneur.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                En 1839, fonde <strong className="text-slate-900 dark:text-slate-100">Patek, Czapek & Cie</strong> avec 
                François Czapek. Production exclusive de 200 montres haute qualité par an.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Jean-Adrien Philippe</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Rencontre décisive avec Patek à l'Exposition de Paris 1844. Inventeur du <strong className="text-slate-900 dark:text-slate-100">remontoir à couronne</strong> révolutionnaire.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Remplace Czapek en 1845. La marque devient officiellement <strong className="text-slate-900 dark:text-slate-100">Patek Philippe & Cie</strong> en 1851.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: FAMILLE STERN */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-10 h-10 text-blue-200 dark:text-blue-300 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4 text-blue-100 dark:text-blue-200">
                  L'Ère Stern (1932 - Aujourd'hui)
                </h2>
                <p className="text-lg leading-relaxed text-blue-100 dark:text-blue-200 mb-4">
                  En <strong>1932</strong>, en pleine Grande Dépression, les frères Charles et Jean Stern, 
                  propriétaires de la manufacture de cadrans Stern Frères, rachètent Patek Philippe pour la 
                  sauver de la faillite.
                </p>
                <p className="text-lg leading-relaxed text-blue-100 dark:text-blue-200 mb-4">
                  Cette acquisition familiale garantit l'<strong>indépendance totale</strong> de la manufacture 
                  jusqu'à aujourd'hui. Thierry Stern, arrière-petit-fils de Charles, dirige actuellement la 
                  maison avec la même philosophie d'excellence.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
                  <p className="text-sm leading-relaxed flex items-start">
                    <Award className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Indépendance familiale</strong> : Patek Philippe est l'une des rares manufactures 
                      de luxe encore 100% indépendante, sans actionnaire externe ni groupe financier.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: COLLECTIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Collections Iconiques
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {collections.map((collection) => {
              const colors = {
                blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
                green: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
                orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
                purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
              };
              const colorScheme = colors[collection.color];

              return (
                <div key={collection.name} className={`${colorScheme.bg} border-2 ${colorScheme.border} rounded-xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{collection.name}</h3>
                    <span className={`text-xs font-bold ${colorScheme.badge} px-3 py-1 rounded-full`}>
                      {collection.year}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{collection.description}</p>
                  <div className="space-y-2">
                    {collection.characteristics.map((char, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">✓</span>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: COMPLICATIONS */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-purple-600 dark:text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Grandes Complications
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-3xl mx-auto mb-6">
              Patek Philippe est le maître incontesté des grandes complications horlogères : quantièmes perpétuels, 
              répétitions minutes, tourbillons, chronographes rattrapante.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {['Quantième Perpétuel', 'Répétition Minutes', 'Chronographe Rattrapante', 'Tourbillon', 'Équation du Temps', 'Phases de Lune'].map((comp) => (
                <div key={comp} className="bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-lg px-4 py-3 text-center">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SCEAU PATEK PHILIPPE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Le Sceau Patek Philippe
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Depuis 2009, Patek Philippe applique son propre <strong className="text-slate-900 dark:text-slate-100">Sceau Patek Philippe</strong>, 
              certification interne bien plus stricte que le Poinçon de Genève.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Critères du Sceau
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Précision : -3/+2 secondes par jour</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Finitions manuelles exceptionnelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Fonctionnement parfait des complications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Garantie à vie des réparations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  Valeurs Fondamentales
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Indépendance familiale totale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Innovation constante (70+ brevets)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Tradition et savoir-faire artisanal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Héritage transgénérationnel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-l-4 border-orange-600 dark:border-orange-400 p-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
              💬 <strong className="text-slate-900 dark:text-slate-100">"Begin your own tradition"</strong> - 
              Slogan emblématique de Patek Philippe, invitant chaque propriétaire à créer son propre héritage familial autour de la montre.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
             href="/manufactures" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Manufactures
          </Link>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 HorloLearn - Formation en Horlogerie Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
