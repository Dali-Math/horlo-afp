import React from 'react';

const HomePage = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-widest">
              Patek Philippe
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-white hover:text-amber-400 transition-colors">Accueil</a>
              <a href="#heritage" className="text-white hover:text-amber-400 transition-colors">Héritage</a>
              <a href="#collections" className="text-white hover:text-amber-400 transition-colors">Collections</a>
              <a href="#innovation" className="text-white hover:text-amber-400 transition-colors">Innovation</a>
              <a href="#savoir-faire" className="text-white hover:text-amber-400 transition-colors">Savoir-faire</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900 opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
            Patek Philippe
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 mb-8 tracking-widest">
            RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE
          </p>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-amber-700 max-w-2xl mx-auto">
            <p className="text-lg italic text-amber-100">
              "Vous ne possédez jamais complètement une Patek Philippe.
              Vous en êtes le gardien pour les générations futures."
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="heritage" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            185 Ans d'Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="timeline-item bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1839</div>
              <h3 className="text-xl font-semibold mb-3">Fondation de la Manufacture</h3>
              <p className="text-gray-300">
                Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek.
                Début d'une aventure qui révolutionnera l'horlogerie mondiale.
              </p>
            </div>
            <div className="timeline-item bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1844</div>
              <h3 className="text-xl font-semibold mb-3">Rencontre Historique à Paris</h3>
              <p className="text-gray-300">
                Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris.
                Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.
              </p>
            </div>
            <div className="timeline-item bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1851</div>
              <h3 className="text-xl font-semibold mb-3">Consécration Royale</h3>
              <p className="text-gray-300">
                La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la
                Grande Exposition de Londres. Début de la reconnaissance internationale.
              </p>
            </div>
            <div className="timeline-item bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1868</div>
              <h3 className="text-xl font-semibold mb-3">Première Montre-bracelet</h3>
              <p className="text-gray-300">
                Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe.
                Innovation qui transformera l'industrie horlogère.
              </p>
            </div>
            <div className="timeline-item bg-gray-900 p-6 rounded-lg border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="timeline-date text-3xl font-bold text-amber-400 mb-2">1889</div>
              <h3 className="text-xl font-semibold mb-3">Brevet du Calendrier Perpétuel</h3>
              <p className="text-gray-300">
                Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel,
                l'une des complications les plus complexes de l'horlogerie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Collections Légendaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                ⌚
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Calatrava</h3>
                <p className="text-gray-300 mb-4">
                  L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe
                  avec son design pur et ses lignes classiques.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €25,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Mouvement automatique</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Cadran émail</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Boîtier or</span>
                </div>
              </div>
            </div>

            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                🏆
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Nautilus</h3>
                <p className="text-gray-300 mb-4">
                  L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse
                  et élégance dans un design emblématique.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €35,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Étanche 120m</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Boîtier acier</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Bracelet intégré</span>
                </div>
              </div>
            </div>

            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                💎
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Aquanaut</h3>
                <p className="text-gray-300 mb-4">
                  L'aventure moderne. Design contemporain avec bracelet Tropical innovant,
                  parfait pour l'homme actif et élégant.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €28,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Bracelet caoutchouc</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Étanche 120m</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Design sportif</span>
                </div>
              </div>
            </div>

            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                ⚙️
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Complications</h3>
                <p className="text-gray-300 mb-4">
                  L'art de la complexité. Montres avec fonctions avancées alliant
                  innovation technique et beauté esthétique.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €45,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Chronographe</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Calendrier</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Phase lune</span>
                </div>
              </div>
            </div>

            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                👑
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Grandes Complications</h3>
                <p className="text-gray-300 mb-4">
                  Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs
                  complications, représentant l'excellence absolue.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €150,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Sonnerie</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Répétition minutes</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Tourbillon</span>
                </div>
              </div>
            </div>

            <div className="collection-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-6xl">
                🎨
              </div>
              <div className="collection-content p-6">
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Gondolo</h3>
                <p className="text-gray-300 mb-4">
                  L'art déco revisité. Collection inspirée des années 1920 avec des
                  formes géométriques audacieuses et un style raffiné.
                </p>
                <div className="collection-price text-2xl font-bold text-amber-500 mb-4">À partir de €30,000</div>
                <div className="collection-features flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">Forme tonneau</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Design rétro</span>
                  <span className="bg-gray-700 px-2 py-1 rounded">Cadran guilloché</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section id="innovation" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Innovations Révolutionnaires
          </h2>
          <p className="text-center text-gray-300 mb-12">
            Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839
          </p>
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="stat-number text-5xl font-bold text-amber-400 mb-2">70+</div>
              <div className="stat-label text-gray-300">Brevets Déposés</div>
              <p className="text-sm text-gray-400 mt-2">Innovations révolutionnaires qui ont façonné l'horlogerie moderne</p>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-5xl font-bold text-amber-400 mb-2">100</div>
              <div className="stat-label text-gray-300">% Indépendance</div>
              <p className="text-sm text-gray-400 mt-2">Fabrication intégrée contrôlant chaque étape de la production</p>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-5xl font-bold text-amber-400 mb-2">185</div>
              <div className="stat-label text-gray-300">Ans d'Excellence</div>
              <p className="text-sm text-gray-400 mt-2">D'expérience ininterrompue dans l'art horloger suisse</p>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-5xl font-bold text-amber-400 mb-2">60,000</div>
              <div className="stat-label text-gray-300">Montres/An</div>
              <p className="text-sm text-gray-400 mt-2">Production artisanale limitée garantissant l'exclusivité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-faire Section */}
      <section id="savoir-faire" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Savoir-faire Exceptionnel
          </h2>
          <p className="text-center text-lg text-gray-300 mb-12 max-w-4xl mx-auto">
            Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal,
            alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent
            leur savoir-faire de génération en génération.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Mécanique Fine</h3>
              <p className="text-gray-300">
                Mouvements développés et assemblés à la main avec une précision extrême,
                chaque composant est poli et décoré selon les plus hauts standards.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Joaillerie</h3>
              <p className="text-gray-300">
                Sertissage artisanal de diamants et pierres précieuses selon les techniques
                traditionnelles suisses les plus exigeantes.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center border border-amber-800 hover:border-amber-600 transition-colors">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Arts Décoratifs</h3>
              <p className="text-gray-300">
                Émaux, gravures et guillochages réalisés par des artistes spécialisés
                utilisant des techniques ancestrales préservées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-900 to-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Découvrez l'Univers Patek Philippe
          </h2>
          <p className="text-lg text-amber-100">
            Plongez dans l'histoire, les collections et l'excellence horlogère suisse
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
