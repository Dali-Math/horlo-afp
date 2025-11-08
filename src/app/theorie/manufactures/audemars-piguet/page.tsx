'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mountain, Watch, Zap, Crown } from 'lucide-react';

export default function AudemarsPiguetPage() {
  const [selectedSection, setSelectedSection] = useState<string>('');

  const royalOakFeatures = [
    {
      id: 'lunette',
      title: 'Lunette Octogonale',
      icon: '⬢',
      description: '8 vis apparentes en or blanc fixant la lunette',
      details: 'Design iconique inspiré des hublots de navires de guerre britanniques. Les 8 vis hexagonales apparentes sont une signature visuelle unique, visible à 10 mètres. Chaque vis doit être parfaitement alignée.',
      color: 'blue' as const
    },
    {
      id: 'bracelet',
      title: 'Bracelet Intégré',
      icon: '⚡',
      description: 'Liaison seamless entre boîtier et bracelet',
      details: 'Le bracelet ne se démonte pas : il fait corps avec le boîtier. Architecture révolutionnaire en 1972. Maillons polis/satinés alternés nécessitant 20h de finitions manuelles. Confort exceptionnel au porter.',
      color: 'green' as const
    },
    {
      id: 'tapisserie',
      title: 'Cadran Tapisserie',
      icon: '◈',
      description: 'Motif guilloché emblématique "Grande Tapisserie"',
      details: 'Créé par pression mécanique, chaque carré relief mesure 2,5mm. Ce motif est devenu la signature visuelle d\'AP. Variantes : petite tapisserie, méga tapisserie. Impossible à reproduire par machines CNC modernes.',
      color: 'purple' as const
    },
    {
      id: 'calibre',
      title: 'Calibre Ultra-Plat',
      icon: '⚙️',
      description: 'Mouvement de 3,05mm d\'épaisseur (record 1972)',
      details: 'Basé sur le Jaeger-LeCoultre 920 ultra-plat. Rotor périphérique en or 21 carats. Finitions exceptionnelles : côtes de Genève, anglage, perlage main. Réserve 40h.',
      color: 'orange' as const
    },
  ];

  const timeline = [
    {
      year: '1875',
      title: 'Fondation au Brassus',
      description: 'Jules Louis Audemars et Edward Auguste Piguet s\'associent dans la Vallée de Joux.',
      icon: '🏔️'
    },
    {
      year: '1892',
      title: 'Première Répétition Minutes Bracelet',
      description: 'Première montre-bracelet au monde équipée d\'une répétition minutes sonnant l\'heure.',
      icon: '🔔'
    },
    {
      year: '1972',
      title: 'Lancement Royal Oak',
      description: 'Révolution horlogère : première montre de sport de luxe en acier. Dessinée par Gérald Genta.',
      icon: '👑'
    },
    {
      year: '1986',
      title: 'Montre la Plus Compliquée',
      description: 'Calibre 2870 avec 1168 composants. Record mondial de complexité horlogère.',
      icon: '⚙️'
    },
    {
      year: '1993',
      title: 'Royal Oak Offshore',
      description: 'Version XXL (42mm) ultra-sportive. Design extrême qui choque puis devient culte.',
      icon: '💪'
    },
    {
      year: '2020',
      title: 'Code 11.59',
      description: 'Nouvelle collection ronde sophistiquée. Diversification au-delà de la Royal Oak.',
      icon: '🎨'
    },
  ];

  const collections = [
    {
      name: 'Royal Oak',
      year: '1972',
      description: 'L\'icône absolue de la haute horlogerie sportive',
      features: ['Lunette octogonale', 'Bracelet intégré', 'Cadran Tapisserie', 'Étanchéité 50m'],
      icon: '👑',
      color: 'blue' as const
    },
    {
      name: 'Royal Oak Offshore',
      year: '1993',
      description: 'Version surdimensionnée et ultra-sportive',
      features: ['42-44mm', 'Poussoirs protégés', 'Design extrême', 'Étanchéité 100m'],
      icon: '💪',
      color: 'green' as const
    },
    {
      name: 'Royal Oak Concept',
      year: '2002',
      description: 'Laboratoire technique futuriste',
      features: ['Design avant-gardiste', 'Matériaux extrêmes', 'Tourbillon', 'Architecture visible'],
      icon: '🚀',
      color: 'purple' as const
    },
    {
      name: 'Code 11.59',
      year: '2019',
      description: 'Collection ronde contemporaine sophistiquée',
      features: ['Boîtier rond', 'Architecture complexe', 'Finitions extrêmes', 'Complications'],
      icon: '🎨',
      color: 'orange' as const
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
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
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Indépendante
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Mountain className="w-16 h-16 text-purple-300" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
                Audemars Piguet
              </h1>
              <p className="text-xl text-purple-200 font-medium">
                Le Brassus, Vallée de Joux - 1875
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-4xl mb-8">
            Fondée en 1875 par Jules Louis Audemars et Edward Auguste Piguet dans la Vallée de Joux, 
            Audemars Piguet demeure l'une des rares manufactures horlogères suisses encore dirigées par 
            les familles fondatrices. Pionnière de la haute horlogerie sportive avec la Royal Oak (1972), 
            elle incarne l'excellence technique et l'audace créative.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">1875</div>
              <div className="text-xs font-medium opacity-80">Année de fondation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-xs font-medium opacity-80">Indépendante</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">50K</div>
              <div className="text-xs font-medium opacity-80">Montres/an</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">1140m</div>
              <div className="text-xs font-medium opacity-80">Altitude Le Brassus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: TIMELINE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Histoire et Héritage Familial
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En <strong className="text-slate-900 dark:text-slate-100">1875</strong>, Jules Louis Audemars s'associe 
              à Edward Auguste Piguet pour créer une manufacture horlogère dans le petit village du Brassus, situé dans 
              la Vallée de Joux suisse, à plus de 1000 mètres d'altitude.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Dès ses débuts, la manufacture se distingue par la fabrication de montres à complications extrêmement 
              sophistiquées. Aujourd'hui encore, Audemars Piguet reste <strong className="text-slate-900 dark:text-slate-100">100% indépendante et familiale</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeline.map((event) => (
              <div key={event.year} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{event.icon}</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-full">
                    {event.year}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{event.title}</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ROYAL OAK INTERACTIVE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            La Royal Oak : Révolution 1972
          </h2>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Watch className="w-10 h-10 text-purple-200 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Genèse d'une Icône</h3>
                <p className="text-purple-100 dark:text-purple-200 leading-relaxed mb-3">
                  En 1972, face à la crise du quartz, Audemars Piguet prend un risque colossal : lancer une 
                  <strong className="text-white"> montre de sport de luxe en acier</strong> au prix d'une montre en or.
                </p>
                <p className="text-purple-100 dark:text-purple-200 leading-relaxed">
                  Dessinée par Gérald Genta en une seule nuit, la Royal Oak s'inspire des hublots de navires de guerre 
                  britanniques, avec sa lunette octogonale et ses 8 vis hexagonales apparentes.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque caractéristique pour découvrir les secrets de la Royal Oak :
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {royalOakFeatures.map((feature) => {
              const colors = {
                blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
                green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
                purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
                orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
              };

              return (
                <div key={feature.id}>
                  <div
                    onClick={() => setSelectedSection(selectedSection === feature.id ? '' : feature.id)}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedSection === feature.id
                        ? 'border-purple-600 dark:border-purple-400 shadow-lg'
                        : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500'
                    } ${colors[feature.color]}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-4xl">{feature.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {feature.title}
                        </h4>
                        {selectedSection !== feature.id && (
                          <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-1">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedSection === feature.id && (
                    <div className="mt-3 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-purple-600 dark:border-purple-400">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {feature.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-l-4 border-purple-600 dark:border-purple-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <Crown className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Impact Culturel</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  La Royal Oak fut d'abord un échec commercial : trop chère, trop avant-gardiste. Mais dans les années 1980-90, 
                  elle devient l'icône de la haute horlogerie sportive, créant une catégorie entièrement nouvelle. Aujourd'hui, 
                  la Royal Oak représente plus de <strong className="text-slate-900 dark:text-slate-100">50% des ventes</strong> d'AP 
                  et influence toute l'industrie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COLLECTIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Les Collections Phares
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {collections.map((collection) => {
              const colors = {
                blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
                green: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
                purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
                orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
              };
              const colorScheme = colors[collection.color];

              return (
                <div key={collection.name} className={`${colorScheme.bg} border-2 ${colorScheme.border} rounded-xl p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{collection.icon}</span>
                    <span className={`text-xs font-bold ${colorScheme.badge} px-3 py-1 rounded-full`}>
                      {collection.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{collection.name}</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{collection.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {collection.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-purple-600 dark:text-purple-400 mr-1">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: INNOVATIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Innovations Techniques Majeures
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">1892</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Répétition Minutes Bracelet</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Première montre-bracelet au monde équipée d'une répétition minutes sonnant l'heure à la demande.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">1986</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Montre la Plus Compliquée</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Calibre 2870 : 1168 pièces, quantième perpétuel, répétition minutes, chronographe rattrapante.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">1997</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Royal Oak Offshore</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Version surdimensionnée (42mm). Design extrême qui définit l'horlogerie sportive moderne.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: PHILOSOPHIE */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Mountain className="w-10 h-10 text-blue-200" />
                <h3 className="text-2xl font-bold">Vallée de Joux</h3>
              </div>
              <p className="text-blue-100 dark:text-blue-200 leading-relaxed">
                Depuis 1875, toutes les montres AP sont conçues, fabriquées et assemblées au Brassus. Cet isolement 
                géographique à 1140m d'altitude a forgé une culture horlogère unique, où l'excellence technique se 
                transmet de génération en génération dans les familles locales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-10 h-10 text-purple-200" />
                <h3 className="text-2xl font-bold">Audace Créative</h3>
              </div>
              <p className="text-purple-100 dark:text-purple-200 leading-relaxed">
                AP incarne l'audace : Royal Oak en acier luxe (1972), Royal Oak Offshore XXL (1993), montres squelettes 
                ultra-techniques. La manufacture repousse constamment les limites du design tout en préservant 
                l'excellence horlogère traditionnelle.
              </p>
            </div>
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
