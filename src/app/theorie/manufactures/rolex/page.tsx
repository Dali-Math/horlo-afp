'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Zap, Award, Shield, Factory, Gem } from 'lucide-react';

export default function RolexPage() {
  const [selectedInnovation, setSelectedInnovation] = useState<string>('');

  const innovations = [
    {
      id: 'oyster',
      year: '1926',
      title: 'Oyster : Première Montre Étanche',
      description: 'Invention du boîtier Oyster hermétique grâce à une couronne vissée et un fond vissé.',
      details: 'Mercedes Gleitze traverse la Manche avec une Oyster au poignet pendant 10 heures : la montre fonctionne parfaitement. Cette prouesse marque le début de la légende Rolex et de l\'étanchéité horlogère.',
      icon: '🦪',
      color: 'blue' as const
    },
    {
      id: 'perpetual',
      year: '1931',
      title: 'Perpetual : Remontage Automatique',
      description: 'Rolex invente le système de remontage automatique par rotor à 360°.',
      details: 'Le mécanisme Perpetual avec masse oscillante bidirectionnelle devient le standard de l\'industrie horlogère mondiale. Innovation majeure qui rend les montres autonomes et pratiques au quotidien.',
      icon: '🔄',
      color: 'green' as const
    },
    {
      id: 'datejust',
      year: '1945',
      title: 'Datejust : Première Date Instantanée',
      description: 'Première montre-bracelet avec affichage de la date à changement instantané à minuit.',
      details: 'Le Datejust introduit le cyclope grossissant 2,5× sur le verre pour faciliter la lecture de la date. Design iconique avec bracelet Jubilé à 5 maillons créé spécialement pour ce modèle.',
      icon: '📅',
      color: 'purple' as const
    },
    {
      id: 'submariner',
      year: '1953',
      title: 'Submariner : Révolution Plongée',
      description: 'Première montre de plongée étanche à 100 mètres avec lunette tournante graduée.',
      details: 'Le Submariner révolutionne la plongée professionnelle et sportive. Lunette unidirectionnelle pour mesurer le temps d\'immersion en toute sécurité. Index luminescents pour lisibilité sous-marine.',
      icon: '🤿',
      color: 'cyan' as const
    },
    {
      id: 'gmt',
      year: '1954',
      title: 'GMT-Master : Double Fuseau',
      description: 'Créée pour les pilotes Pan Am, affiche deux fuseaux horaires simultanément.',
      details: 'Lunette bicolore Pepsi (rouge/bleu) emblématique représentant jour/nuit. Aiguille GMT indépendante tournant en 24h. Devient l\'outil indispensable des pilotes long-courriers.',
      icon: '✈️',
      color: 'red' as const
    },
    {
      id: 'daytona',
      year: '1963',
      title: 'Cosmograph Daytona',
      description: 'Chronographe professionnel pour pilotes automobiles avec échelle tachymétrique.',
      details: 'Développé en partenariat avec le circuit de Daytona Beach. Échelle tachymétrique gravée sur la lunette Cerachrom. Devient l\'une des montres les plus désirées et collectionnées au monde.',
      icon: '🏎️',
      color: 'orange' as const
    },
  ];

  const collections = [
    {
      name: 'Submariner',
      year: '1953',
      icon: '🌊',
      description: 'Montre de plongée par excellence, étanche jusqu\'à 300m.',
      features: ['Étanchéité 300m', 'Lunette Cerachrom', 'Couronne Triplock', 'Chromalight'],
      color: 'blue' as const
    },
    {
      name: 'GMT-Master II',
      year: '1954',
      icon: '✈️',
      description: 'Double fuseau horaire avec lunette bicolore Pepsi ou Batman.',
      features: ['Double fuseau horaire', 'Lunette 24h bicolore', 'Aiguille GMT', 'Jubilé ou Oyster'],
      color: 'green' as const
    },
    {
      name: 'Daytona',
      year: '1963',
      icon: '🏁',
      description: 'Chronographe mythique pour pilotes automobiles.',
      features: ['Chronographe', 'Échelle tachymétrique', 'Calibre 4130', 'Cerachrom'],
      color: 'orange' as const
    },
    {
      name: 'Datejust',
      year: '1945',
      icon: '📅',
      description: 'Élégance classique avec date instantanée et cyclope.',
      features: ['Date à 3h', 'Cyclope ×2.5', 'Bracelet Jubilé', 'Choix de cadrans'],
      color: 'purple' as const
    },
    {
      name: 'Day-Date',
      year: '1956',
      icon: '👑',
      description: 'Surnommée "President", jour complet + date. Or/Platine uniquement.',
      features: ['Jour complet', 'Date', 'Or/Platine uniquement', 'President bracelet'],
      color: 'red' as const
    },
    {
      name: 'Explorer',
      year: '1953',
      icon: '🏔️',
      description: 'Montre d\'exploration conçue pour l\'Everest. Robustesse extrême.',
      features: ['Cadran noir', 'Index 3-6-9', 'Robustesse', 'Lisibilité maximale'],
      color: 'gray' as const
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
      cyan: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
      red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      gray: 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
           <Link href="/histoire"> 
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
            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Genevoise
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-16 h-16 text-green-600 dark:text-green-400" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                Rolex
              </h1>
              <p className="text-xl text-green-600 dark:text-green-400 font-semibold italic">
                L'icône mondiale de l'horlogerie de luxe
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1905 par Hans Wilsdorf, Rolex est devenue la marque horlogère la plus célèbre et reconnue au monde. 
            Pionnière de la montre-bracelet étanche et fiable, elle incarne la robustesse, la précision et le prestige.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">1905</div>
              <div className="text-xs font-medium text-green-600 dark:text-green-400">Année de fondation</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">700K+</div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Montres/an</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">-2/+2s</div>
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Précision/jour</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300 mb-1">100%</div>
              <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Intégration verticale</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: HANS WILSDORF */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Hans Wilsdorf : Le Visionnaire (1881-1960)
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Les Débuts à Londres</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  Né en Bavière (Allemagne) en 1881, Hans Wilsdorf devient orphelin à 12 ans. Après des études commerciales, 
                  il travaille dans l'export de montres à La Chaux-de-Fonds (Suisse).
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  En <strong className="text-slate-900 dark:text-slate-100">1905</strong>, à 24 ans, il fonde à Londres 
                  avec son beau-frère Alfred Davis la société <strong className="text-slate-900 dark:text-slate-100">Wilsdorf & Davis</strong>, 
                  spécialisée dans la distribution de montres-bracelets.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  À cette époque, la montre-bracelet est perçue comme un bijou féminin peu fiable. Wilsdorf a la vision 
                  audacieuse d'en faire un instrument précis et robuste pour tous.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Naissance du Nom "Rolex"</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  En <strong className="text-slate-900 dark:text-slate-100">1908</strong>, Wilsdorf cherche un nom court, 
                  mémorable et facile à prononcer dans toutes les langues. Il invente "Rolex", un mot qui sonne comme le 
                  bruit du remontage d'une montre.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  En 1915, la Première Guerre mondiale et les droits de douane britanniques le poussent à transférer son 
                  entreprise en Suisse.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  En <strong className="text-slate-900 dark:text-slate-100">1920</strong>, il fonde officiellement 
                  <strong className="text-slate-900 dark:text-slate-100"> Montres Rolex SA</strong> à Genève.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-l-4 border-green-600 dark:border-green-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  La Fondation Hans Wilsdorf (1945)
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Après la mort de sa femme en 1944, Hans Wilsdorf crée la <strong className="text-slate-900 dark:text-slate-100">Fondation Hans Wilsdorf</strong>, 
                  institution privée à but non lucratif, à laquelle il lègue toutes ses parts de Rolex. Encore aujourd'hui, 
                  cette fondation possède 100% de Rolex, garantissant son indépendance totale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INNOVATIONS INTERACTIVES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Innovations Révolutionnaires
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque innovation pour découvrir son histoire :
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {innovations.map((innov) => (
              <div key={innov.id}>
                <div
                  onClick={() => setSelectedInnovation(selectedInnovation === innov.id ? '' : innov.id)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedInnovation === innov.id
                      ? 'border-green-600 dark:border-green-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-green-400 dark:hover:border-green-500'
                  } ${getColorClasses(innov.color)}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl">{innov.icon}</span>
                    <div className="flex-1">
                      <span className="inline-block bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        {innov.year}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{innov.title}</h3>
                      {selectedInnovation !== innov.id && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 line-clamp-2">{innov.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedInnovation === innov.id && (
                  <div className="mt-3 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-green-600 dark:border-green-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {innov.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: COLLECTIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Les Collections Légendaires
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => {
              const colors = {
                blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800 hover:border-blue-500', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
                green: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800 hover:border-green-500', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
                orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800 hover:border-orange-500', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
                purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-800 hover:border-purple-500', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
                red: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800 hover:border-red-500', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
                gray: { bg: 'bg-gray-50 dark:bg-gray-950/30', border: 'border-gray-200 dark:border-gray-800 hover:border-gray-500', badge: 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300' },
              };
              const colorScheme = colors[collection.color];

              return (
                <div key={collection.name} className={`${colorScheme.bg} border-2 ${colorScheme.border} rounded-xl p-6 transition-all hover:shadow-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{collection.icon}</span>
                    <span className={`text-xs font-bold ${colorScheme.badge} px-2 py-1 rounded`}>
                      {collection.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{collection.name}</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">{collection.description}</p>
                  <div className="space-y-1">
                    {collection.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: SUPERLATIVE CHRONOMETER */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Superlative Chronometer : L'Excellence Certifiée
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Depuis <strong className="text-slate-900 dark:text-slate-100">2015</strong>, Rolex a établi sa propre certification 
              <strong className="text-slate-900 dark:text-slate-100"> "Superlative Chronometer"</strong>, bien plus stricte que la certification COSC traditionnelle.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Double Certification
                </h4>
                <ol className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">1.</span>
                    <span><strong className="text-slate-900 dark:text-slate-100">COSC</strong> : Mouvement testé 15 jours (-4/+6 s/jour)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">2.</span>
                    <span><strong className="text-slate-900 dark:text-slate-100">Rolex</strong> : Montre assemblée testée (-2/+2 s/jour)</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  Tests Superlative
                </h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span><strong>Précision</strong> : -2/+2 s/jour</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span><strong>Réserve de marche</strong> : vérifiée</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span><strong>Étanchéité</strong> : testée +10%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span><strong>Remontage auto</strong> : efficacité</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-l-4 border-green-600 dark:border-green-400 p-6 rounded-r-lg mt-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                🔒 <strong className="text-slate-900 dark:text-slate-100">Garantie 5 ans</strong> : Toute montre certifiée 
                Superlative Chronometer bénéficie d'une garantie internationale de 5 ans, symbolisée par le sceau vert Rolex.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: MATÉRIAUX */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Matériaux Innovants et Production
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Intégration Verticale Totale</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Rolex contrôle 100% de sa production dans 4 sites en Suisse : Genève (siège), Bienne (mouvements), 
                Le Locle (composants), Plan-les-Ouates (R&D).
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Fonderie interne d'or et d'acier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Production des mouvements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Fabrication boîtiers et bracelets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Tests et certification finale</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Gem className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Matériaux Exclusifs</h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">💎</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Oystersteel 904L</strong>
                    <p className="text-xs mt-1">Acier inoxydable ultra-résistant à la corrosion</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">🔷</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Cerachrom</strong>
                    <p className="text-xs mt-1">Céramique haute technologie inrayable</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">💡</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Chromalight</strong>
                    <p className="text-xs mt-1">Luminescence bleue 2× plus intense</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">⚙️</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Parachrom</strong>
                    <p className="text-xs mt-1">Spiral paramagnétique et antichoc breveté</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
           <Link href="/histoire">
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
