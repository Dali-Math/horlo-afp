'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Award, Crown, Calendar, Gem } from 'lucide-react';

export default function VacheronConstantinPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const timeline = [
    {
      id: 'fondation',
      year: '1755',
      title: 'Fondation par Jean-Marc Vacheron',
      description: 'Jean-Marc Vacheron, 24 ans, ouvre son atelier horloger à Genève. Début d\'une histoire de 270 ans sans interruption.',
      details: 'Premier atelier au cœur du quartier Saint-Gervais à Genève. Formation d\'apprentis et production de montres de poche de haute qualité. Pose les fondations d\'une manufacture qui deviendra légendaire.',
      color: 'orange' as const
    },
    {
      id: 'constantin',
      year: '1819',
      title: 'Arrivée de François Constantin',
      description: 'François Constantin apporte une dimension commerciale internationale. Naissance de la raison sociale Vacheron & Constantin.',
      details: 'Sa devise célèbre : "Faire mieux si possible, ce qui est toujours possible". Développement des exportations vers l\'Amérique et l\'Asie. Modernisation de la production.',
      color: 'red' as const
    },
    {
      id: 'poincon',
      year: '1886',
      title: 'Adoption du Poinçon de Genève',
      description: 'Parmi les premières manufactures à adopter le Poinçon de Genève, garantie d\'excellence genevoise.',
      details: 'Certification officielle de qualité attestant de l\'origine genevoise et du respect de critères stricts de fabrication et de finition.',
      color: 'blue' as const
    },
    {
      id: 'malte',
      year: '1880',
      title: 'Logo Croix de Malte',
      description: 'Adoption de la Croix de Malte comme emblème. Forme inspirée du barillet de remontage.',
      details: 'Le logo représente la pièce de régulation de la force du remontoir qui empêche la montre d\'être surmontée. Symbole de précision et d\'excellence technique.',
      color: 'purple' as const
    },
    {
      id: 'ultra-plat',
      year: '1955',
      title: 'Calibre le Plus Fin au Monde',
      description: 'Calibre 1003 : 1,64 mm d\'épaisseur. Record mondial de finesse jamais battu pour un mouvement à remontage manuel.',
      details: 'Prouesse technique extraordinaire. Seulement 3 composants différents entre 1003 (manuel) et 1003 automatique. Design épuré au service de la performance.',
      color: 'green' as const
    },
    {
      id: '250ans',
      year: '2005',
      title: 'Tour de l\'Île (250ème anniversaire)',
      description: '16 complications, 834 composants, 1000 heures d\'assemblage. Monument d\'horlogerie.',
      details: 'Tourbillon, quantième perpétuel rétrograde, équation du temps, lever/coucher du soleil. Seulement 7 exemplaires produits. Démontre la maîtrise absolue de la Haute Horlogerie.',
      color: 'cyan' as const
    },
    {
      id: 'record',
      year: '2015',
      title: 'Reference 57260 (260ème anniversaire)',
      description: '57 complications. La montre la plus compliquée jamais créée dans l\'histoire de l\'horlogerie.',
      details: '2826 pièces, 8 ans de développement, 3 maîtres horlogers. Commande spéciale d\'un collectionneur anonyme. Record absolu de complexité horlogère.',
      color: 'pink' as const
    },
  ];

  const collections = [
    {
      id: 'patrimony',
      name: 'Patrimony',
      year: '1957',
      description: 'Élégance épurée, design minimaliste, finesse exceptionnelle.',
      details: 'Incarne le classicisme genevois absolu avec des calibres ultra-plats. Record de finesse avec le calibre 1003 de 1,64mm. Ligne pure inspirée par le Bauhaus. Disponible en quantième perpétuel ultra-plat.',
      features: ['Calibres ultra-plats', 'Design épuré', 'Pureté genevoise', 'Quantième perpétuel'],
      icon: '👔',
      color: 'blue' as const
    },
    {
      id: 'overseas',
      name: 'Overseas',
      year: '1977',
      description: 'Montre de sport de luxe inspirée par les voyages.',
      details: 'Bracelet interchangeable sans outil (cuir, caoutchouc, acier). Boîtier avec Croix de Malte intégrée dans la lunette. Étanchéité 150m. Élégance sportive pour globe-trotters.',
      features: ['Bracelets interchangeables', 'Étanchéité 150m', 'Croix de Malte', 'Sport-luxe'],
      icon: '🌍',
      color: 'green' as const
    },
    {
      id: 'traditionnelle',
      name: 'Traditionnelle',
      year: 'Collection',
      description: 'Haute horlogerie pure avec complications sophistiquées.',
      details: 'Tourbillons, quantièmes perpétuels, répétitions minutes. Savoir-faire genevois ancestral transmis depuis 1755. Complications majeures dans des boîtiers élégants.',
      features: ['Complications majeures', 'Tourbillon', 'Répétition minutes', 'Savoir-faire ancestral'],
      icon: '⚙️',
      color: 'purple' as const
    },
    {
      id: 'fiftysix',
      name: 'Fiftysix',
      year: '1956',
      description: 'Collection moderne inspirée du calibre 1003 de 1956.',
      details: 'Design contemporain avec références historiques. Boîtier 40mm, calibres automatiques. Ligne équilibrée entre tradition et modernité. Accessible et polyvalente.',
      features: ['Design contemporain', 'Références historiques', 'Calibres automatiques', 'Polyvalent'],
      icon: '🕰️',
      color: 'orange' as const
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
      red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      cyan: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
      pink: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
    };
    return colors[color as keyof typeof colors] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-950 dark:to-slate-900">
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
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-900 text-sm font-medium px-4 py-1.5 rounded-full">
              La Plus Ancienne Manufacture
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Crown className="w-16 h-16 text-orange-200" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
                Vacheron Constantin
              </h1>
              <p className="text-xl text-orange-200 font-medium">
                Genève - Fondée en 1755
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-orange-100 leading-relaxed max-w-4xl mb-8">
            Fondée en 1755 par Jean-Marc Vacheron à Genève, Vacheron Constantin est la plus ancienne manufacture 
            horlogère au monde en activité continue. Pendant 270 ans, elle incarne l'excellence genevoise, 
            le raffinement aristocratique et la maîtrise technique absolue. Membre fondateur de la Sainte Trinité 
            horlogère avec Patek Philippe et Audemars Piguet.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">1755</div>
              <div className="text-xs font-medium opacity-80">Année de fondation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">270</div>
              <div className="text-xs font-medium opacity-80">Ans d'histoire continue</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">1.64mm</div>
              <div className="text-xs font-medium opacity-80">Calibre le plus fin (1955)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">57</div>
              <div className="text-xs font-medium opacity-80">Complications (record 2015)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: TIMELINE INTERACTIVE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            270 Ans d'Histoire Continue
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque étape pour découvrir l'histoire de la plus ancienne manufacture horlogère :
          </p>

          <div className="space-y-4">
            {timeline.map((period) => (
              <div key={period.id}>
                <div
                  onClick={() => setSelectedCollection(selectedCollection === period.id ? '' : period.id)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedCollection === period.id
                      ? 'border-orange-600 dark:border-orange-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500'
                  } ${getColorClasses(period.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-full">
                        {period.year}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                          {period.title}
                        </h4>
                        {selectedCollection !== period.id && (
                          <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 line-clamp-1">
                            {period.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronLeft className={`w-6 h-6 text-slate-400 transition-transform ${selectedCollection === period.id ? '-rotate-90' : 'rotate-180'}`} />
                  </div>
                </div>

                {selectedCollection === period.id && (
                  <div className="mt-3 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-orange-600 dark:border-orange-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {period.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: POINÇON DE GENÈVE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Le Poinçon de Genève
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Certification d'Excellence</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Depuis <strong className="text-slate-900 dark:text-slate-100">1886</strong>, le Poinçon de Genève 
                (Hallmark of Geneva) certifie l'origine genevoise et la qualité exceptionnelle des montres. 
                Vacheron Constantin fut l'une des premières manufactures à l'adopter.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                En <strong className="text-slate-900 dark:text-slate-100">2004</strong>, VC prend une décision historique : 
                soumettre <strong className="text-slate-900 dark:text-slate-100">100% de sa production</strong> au Poinçon de Genève, 
                garantissant ainsi que chaque montre respecte les critères les plus stricts.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Gem className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12 Critères Stricts</h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Assemblage complet à Genève (canton)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Finitions main : anglage, polissage miroir, perlage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Précision chronométrique contrôlée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Réserve de marche minimum 38-42h</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Tests fonctionnels exhaustifs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-l-4 border-orange-600 dark:border-orange-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <Crown className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Engagement Total</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Contrairement à d'autres manufactures qui réservent le Poinçon de Genève à certains modèles, 
                  Vacheron Constantin l'applique à l'intégralité de sa production, du calibre le plus simple aux 
                  grandes complications. Cet engagement reflète une vision sans compromis de la qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COLLECTIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Collections Iconiques
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
                <div key={collection.id} className={`${colorScheme.bg} border-2 ${colorScheme.border} rounded-xl p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{collection.icon}</span>
                    <span className={`text-xs font-bold ${colorScheme.badge} px-3 py-1 rounded-full`}>
                      {collection.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{collection.name}</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{collection.details}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {collection.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-orange-600 dark:text-orange-400 mr-1">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: RECORDS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Records de Complications
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl font-bold text-4xl">
                  16
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Tour de l'Île (2005)</h3>
                  <p className="text-sm text-blue-100 dark:text-blue-200">250ème anniversaire de la manufacture</p>
                </div>
              </div>
              <p className="text-blue-100 dark:text-blue-200 leading-relaxed">
                16 complications dont tourbillon, quantième perpétuel rétrograde, équation du temps, lever/coucher du soleil. 
                834 composants, 1000 heures d'assemblage. Seulement 7 exemplaires produits. Monument d'horlogerie démontrant 
                la maîtrise absolue de la Haute Horlogerie.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-red-600 dark:from-pink-700 dark:to-red-700 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl font-bold text-4xl">
                  57
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Reference 57260 (2015)</h3>
                  <p className="text-sm text-pink-100 dark:text-pink-200">260ème anniversaire - Record absolu</p>
                </div>
              </div>
              <p className="text-pink-100 dark:text-pink-200 leading-relaxed">
                La montre la plus compliquée jamais créée dans l'histoire de l'horlogerie : 57 complications, 
                2826 pièces, 8 ans de développement par 3 maîtres horlogers. Commande spéciale d'un collectionneur 
                anonyme. Record mondial absolu de complexité horlogère qui tient toujours.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: DEVISE */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-8 text-center">
            <Calendar className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white italic mb-4">
              "Faire mieux si possible, ce qui est toujours possible"
            </blockquote>
            <p className="text-slate-700 dark:text-slate-300 text-lg">
              Devise de François Constantin (1819), incarnant l'esprit d'excellence et d'amélioration continue 
              qui anime Vacheron Constantin depuis 270 ans.
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
