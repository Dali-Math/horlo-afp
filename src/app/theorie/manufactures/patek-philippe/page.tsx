"use client";

import Head from "next/head";

export default function PatekPhilippeStrict() {
  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <style>{`
          body { font-family: 'Inter', 'Playfair Display', serif; background: #f8f6f0; margin: 0;}
          h1, h2, h3 { font-family: 'Playfair Display', serif;}
          .gold { color: #D4AF37; }
          .blue { color: #1a2332; }
        `}</style>
      </Head>
      {/* Menu principal */}
      <nav className="flex flex-wrap justify-center gap-6 p-4 bg-white font-bold border-b">
        <a href="#home">Accueil</a>
        <a href="#heritage">Héritage</a>
        <a href="#collections">Collections</a>
        <a href="#innovation">Innovation</a>
        <a href="#craftsmanship">Savoir-faire</a>
      </nav>

      {/* Hero, slogan, citation */}
      <main className="max-w-3xl mx-auto px-4">
        <section id="home" className="text-center my-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Patek Philippe</h1>
          <div className="mb-4 font-bold tracking-wide">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</div>
          <blockquote className="italic gold mb-6">"Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."</blockquote>
          <div className="grid grid-cols-2 gap-4 text-center max-w-xl mx-auto my-4 font-semibold">
            <div>
              <div>1839</div>
              <div className="text-sm">Fondation</div>
            </div>
            <div>
              <div>70+</div>
              <div className="text-sm">Brevets</div>
            </div>
            <div>
              <div>100%</div>
              <div className="text-sm">Indépendance</div>
            </div>
            <div>
              <div>185 Ans d'Excellence</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="heritage" className="my-10">
          <div className="mb-6 font-bold text-lg">1839</div>
          <h3 className="font-bold text-xl mb-1">Fondation de la Manufacture</h3>
          <p>Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek &amp; Cie à Genève avec François Czapek. Début d'une aventure qui révolutionnera l'horlogerie mondiale.</p>

          <div className="mt-6 font-bold text-lg">1844</div>
          <h3 className="font-bold text-xl mb-1">Rencontre Historique à Paris</h3>
          <p>Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris. Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.</p>

          <div className="mt-6 font-bold text-lg">1851</div>
          <h3 className="font-bold text-xl mb-1">Consécration Royale</h3>
          <p>La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la Grande Exposition de Londres. Début de la reconnaissance internationale.</p>

          <div className="mt-6 font-bold text-lg">1868</div>
          <h3 className="font-bold text-xl mb-1">Première Montre-bracelet</h3>
          <p>Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe. Innovation qui transformera l'industrie horlogère.</p>

          <div className="mt-6 font-bold text-lg">1889</div>
          <h3 className="font-bold text-xl mb-1">Brevet du Calendrier Perpétuel</h3>
          <p>Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel, l'une des complications les plus complexes de l'horlogerie.</p>
        </section>

        {/* Collections */}
        <section id="collections" className="my-12">
          <h2 className="font-bold text-2xl mb-6 text-center">Collections Légendaires</h2>
          <div>
            <div className="text-3xl mb-1">⌚</div>
            <h3 className="font-bold">Calatrava</h3>
            <p>L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe avec son design pur et ses lignes classiques.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €25,000</li>
              <li>Mouvement automatique</li>
              <li>Cadran émail</li>
              <li>Boîtier or</li>
            </ul>
            <div className="text-3xl mb-1">🏆</div>
            <h3 className="font-bold">Nautilus</h3>
            <p>L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse et élégance dans un design emblématique.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €35,000</li>
              <li>Étanche 120m</li>
              <li>Boîtier acier</li>
              <li>Bracelet intégré</li>
            </ul>
            <div className="text-3xl mb-1">💎</div>
            <h3 className="font-bold">Aquanaut</h3>
            <p>L'aventure moderne. Design contemporain avec bracelet Tropical innovant, parfait pour l'homme actif et élégant.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €28,000</li>
              <li>Bracelet caoutchouc</li>
              <li>Étanche 120m</li>
              <li>Design sportif</li>
            </ul>
            <div className="text-3xl mb-1">⚙️</div>
            <h3 className="font-bold">Complications</h3>
            <p>L'art de la complexité. Montres avec fonctions avancées alliant innovation technique et beauté esthétique.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €45,000</li>
              <li>Chronographe</li>
              <li>Calendrier</li>
              <li>Phase lune</li>
            </ul>
            <div className="text-3xl mb-1">👑</div>
            <h3 className="font-bold">Grandes Complications</h3>
            <p>Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs complications, représentant l'excellence absolue.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €150,000</li>
              <li>Sonnerie</li>
              <li>Répétition minutes</li>
              <li>Tourbillon</li>
            </ul>
            <div className="text-3xl mb-1">🎨</div>
            <h3 className="font-bold">Gondolo</h3>
            <p>L'art déco revisité. Collection inspirée des années 1920 avec des formes géométriques audacieuses et un style raffiné.</p>
            <ul className="text-sm mb-6">
              <li>À partir de €30,000</li>
              <li>Forme tonneau</li>
              <li>Design rétro</li>
              <li>Cadran guilloché</li>
            </ul>
          </div>
        </section>

        {/* Innovations */}
        <section id="innovation" className="my-12">
          <h2 className="font-bold text-2xl mb-4 text-center">Innovations Révolutionnaires</h2>
          <div className="mb-3">Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839</div>
          <div className="font-bold mb-1">0</div>
          <h3 className="font-bold">Brevets Déposés</h3>
          <div>Innovations révolutionnaires qui ont façonné l'horlogerie moderne</div>
          <div className="font-bold mt-4 mb-1">0</div>
          <h3 className="font-bold">% Indépendance</h3>
          <div>Fabrication intégrée contrôlant chaque étape de la production</div>
          <div className="font-bold mt-4 mb-1">0</div>
          <h3 className="font-bold">Ans d'Excellence</h3>
          <div>D'expérience ininterrompue dans l'art horloger suisse</div>
          <div className="font-bold mt-4 mb-1">0</div>
          <h3 className="font-bold">Montres/An</h3>
          <div>Production artisanale limitée garantissant l'exclusivité</div>
        </section>

        {/* Savoir-faire */}
        <section id="craftsmanship" className="my-12">
          <h2 className="font-bold text-2xl mb-4 text-center">Savoir-faire Exceptionnel</h2>
          <div className="mb-4">Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal, alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent leur savoir-faire de génération en génération.</div>
          <div>
            <div className="text-3xl mb-1">⚙️</div>
            <h3 className="font-bold">Mécanique Fine</h3>
            <p>Mouvements développés et assemblés à la main avec une précision extrême, chaque composant est poli et décoré selon les plus hauts standards.</p>
            <div className="text-3xl mb-1 mt-6">💎</div>
            <h3 className="font-bold">Joaillerie</h3>
            <p>Sertissage artisanal de diamants et pierres précieuses selon les techniques traditionnelles suisses les plus exigeantes.</p>
            <div className="text-3xl mb-1 mt-6">🎨</div>
            <h3 className="font-bold">Arts Décoratifs</h3>
            <p>Émaux, gravures et guillochages réalisés par des artistes spécialisés utilisant des techniques ancestrales préservées.</p>
          </div>
        </section>

        {/* Découverte/CTA */}
        <section className="py-8 text-center bg-gray-100">
          <h2 className="font-bold text-xl mb-3">Découvrez l'Univers Patek Philippe</h2>
          <p className="mb-5">Plongez dans l'histoire, les collections et l'excellence horlogère suisse</p>
          <a href="https://2zbi2vrxx4aro.ok.kimi.link/heritage.html" className="px-5 py-3 rounded bg-blue-900 text-yellow-400 font-bold mr-4 inline-block">Explorer l'Héritage</a>
          <a href="https://2zbi2vrxx4aro.ok.kimi.link/collections.html" className="px-5 py-3 rounded bg-yellow-400 text-blue-900 font-bold inline-block">Voir les Collections</a>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 mb-2 text-sm text-gray-700 py-2">
          <div className="font-serif italic mb-2">
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </div>
          <div>© 2024 Patek Philippe SA. Tous droits réservés. Référence mondiale en horlogerie suisse.</div>
          <a href="https://www.kimi.com/" className="gold hover:underline">KimiKimi OK Computer</a>
        </footer>
      </main>
    </>
  );
}
