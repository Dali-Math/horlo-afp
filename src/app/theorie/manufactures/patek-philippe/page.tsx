import React from 'react';
import Head from 'next/head';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Référence Mondiale en Horlogerie Suisse</title>
        <meta name="description" content="Patek Philippe - Référence Mondiale en Horlogerie Suisse" />
      </Head>

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-amber-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-widest">
                Patek Philippe
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#accueil" className="text-white hover:text-amber-400 transition-colors duration-300">Accueil</a>
                <a href="#heritage" className="text-white hover:text-amber-400 transition-colors duration-300">Héritage</a>
                <a href="#collections" className="text-white hover:text-amber-400 transition-colors duration-300">Collections</a>
                <a href="#innovation" className="text-white hover:text-amber-400 transition-colors duration-300">Innovation</a>
                <a href="#savoir-faire" className="text-white hover:text-amber-400 transition-colors duration-300">Savoir-faire</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900 opacity-50"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent tracking-tight">
              Patek Philippe
            </h1>
            <p className="text-xl md:text-2xl text-amber-400 mb-8 tracking-widest font-light">
              RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE
            </p>
            <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-amber-700 shadow-2xl max-w-2xl mx-auto">
              <p className="text-lg italic text-amber-100 leading-relaxed">
                "Vous ne possédez jamais complètement une Patek Philippe.<br />
                Vous en êtes le gardien pour les générations futures."
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="heritage" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
              185 Ans d'Excellence
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600 hidden md:block"></div>
              <div className="space-y-12">
                <div className="timeline-item flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                      <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1839</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Fondation de la Manufacture</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek.
                        Début d'une aventure qui révolutionnera l'horlogerie mondiale.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-marker w-4 h-4 bg-amber-400 rounded-full border-4 border-black shadow-lg my-4 md:my-0"></div>
                  <div className="md:w-1/2"></div>
                </div>

                <div className="timeline-item flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2"></div>
                  <div className="timeline-marker w-4 h-4 bg-amber-400 rounded-full border-4 border-black shadow-lg my-4 md:my-0"></div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                      <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1844</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Rencontre Historique à Paris</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris.
                        Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                      <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1851</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Consécration Royale</h3>
                      <p className="text-gray-300 leading-relaxed">
                        La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la
                        Grande Exposition de Londres. Début de la reconnaissance internationale.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-marker w-4 h-4 bg-amber-400 rounded-full border-4 border-black shadow-lg my-4 md:my-0"></div>
                  <div className="md:w-1/2"></div>
                </div>

                <div className="timeline-item flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2"></div>
                  <div className="timeline-marker w-4 h-4 bg-amber-400 rounded-full border-4 border-black shadow-lg my-4 md:my-0"></div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                      <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1868</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Première Montre-bracelet</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe.
                        Innovation qui transformera l'industrie horlogère.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline-item flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                      <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1889</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Brevet du Calendrier Perpétuel</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel,
                        l'une des complications les plus complexes de l'horlogerie.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-marker w-4 h-4 bg-amber-400 rounded-full border-4 border-black shadow-lg my-4 md:my-0"></div>
                  <div className="md:w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section id="collections" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Collections Légendaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Calatrava */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  ⌚
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Calatrava</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe
                    avec son design pur et ses lignes classiques.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €25,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Mouvement automatique</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Cadran émail</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Boîtier or</span>
                  </div>
                </div>
              </div>

              {/* Nautilus */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  🏆
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Nautilus</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse
                    et élégance dans un design emblématique.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €35,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Étanche 120m</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Boîtier acier</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Bracelet intégré</span>
                  </div>
                </div>
              </div>

              {/* Aquanaut */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  💎
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Aquanaut</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    L'aventure moderne. Design contemporain avec bracelet Tropical innovant,
                    parfait pour l'homme actif et élégant.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €28,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Bracelet caoutchouc</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Étanche 120m</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Design sportif</span>
                  </div>
                </div>
              </div>

              {/* Complications */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  ⚙️
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Complications</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    L'art de la complexité. Montres avec fonctions avancées alliant
                    innovation technique et beauté esthétique.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €45,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Chronographe</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Calendrier</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Phase lune</span>
                  </div>
                </div>
              </div>

              {/* Grandes Complications */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  👑
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Grandes Complications</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs
                    complications, représentant l'excellence absolue.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €150,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Sonnerie</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Répétition minutes</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Tourbillon</span>
                  </div>
                </div>
              </div>

              {/* Gondolo */}
              <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-700 hover:border-amber-600">
                <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl text-amber-400">
                  🎨
                </div>
                <div className="collection-content p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-400">Gondolo</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    L'art déco revisité. Collection inspirée des années 1920 avec des
                    formes géométriques audacieuses et un style raffiné.
                  </p>
                  <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €30,000</div>
                  <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Forme tonneau</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Design rétro</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">Cadran guilloché</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovations Section */}
        <section id="innovation" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Innovations Révolutionnaires
            </h2>
            <p className="text-center text-lg text-gray-300 mb-16 max-w-3xl mx-auto">
              Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839
            </p>
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="stat-item text-center bg-gray-900 p-8 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                <div className="stat-number text-6xl font-bold text-amber-400 mb-4">70+</div>
                <div className="stat-label text-xl font-semibold text-white mb-2">Brevets Déposés</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Innovations révolutionnaires qui ont façonné l'horlogerie moderne
                </p>
              </div>
              <div className="stat-item text-center bg-gray-900 p-8 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                <div className="stat-number text-6xl font-bold text-amber-400 mb-4">100</div>
                <div className="stat-label text-xl font-semibold text-white mb-2">% Indépendance</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Fabrication intégrée contrôlant chaque étape de la production
                </p>
              </div>
              <div className="stat-item text-center bg-gray-900 p-8 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                <div className="stat-number text-6xl font-bold text-amber-400 mb-4">185</div>
                <div className="stat-label text-xl font-semibold text-white mb-2">Ans d'Excellence</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  D'expérience ininterrompue dans l'art horloger suisse
                </p>
              </div>
              <div className="stat-item text-center bg-gray-900 p-8 rounded-lg border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl">
                <div className="stat-number text-6xl font-bold text-amber-400 mb-4">60,000</div>
                <div className="stat-label text-xl font-semibold text-white mb-2">Montres/An</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Production artisanale limitée garantissant l'exclusivité
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Savoir-faire Section */}
        <section id="savoir-faire" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Savoir-faire Exceptionnel
            </h2>
            <p className="text-center text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal,
              alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent
              leur savoir-faire de génération en génération.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl hover:transform hover:scale-105">
                <div className="text-6xl mb-6 text-amber-400">⚙️</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Mécanique Fine</h3>
                <p className="text-gray-300 leading-relaxed">
                  Mouvements développés et assemblés à la main avec une précision extrême,
                  chaque composant est poli et décoré selon les plus hauts standards.
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl hover:transform hover:scale-105">
                <div className="text-6xl mb-6 text-amber-400">💎</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Joaillerie</h3>
                <p className="text-gray-300 leading-relaxed">
                  Sertissage artisanal de diamants et pierres précieuses selon les techniques
                  traditionnelles suisses les plus exigeantes.
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-all duration-300 shadow-xl hover:transform hover:scale-105">
                <div className="text-6xl mb-6 text-amber-400">🎨</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Arts Décoratifs</h3>
                <p className="text-gray-300 leading-relaxed">
                  Émaux, gravures et guillochages réalisés par des artistes spécialisés
                  utilisant des techniques ancestrales préservées.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              Découvrez l'Univers Patek Philippe
            </h2>
            <p className="text-lg text-amber-100 leading-relaxed">
              Plongez dans l'histoire, les collections et l'excellence horlogère suisse
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
