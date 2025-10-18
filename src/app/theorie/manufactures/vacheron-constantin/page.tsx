// app/[locale]/theorie/manufactures/vacheron-constantin/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacheron Constantin - La Plus Ancienne Manufacture | HorloLearn",
  description: "Découvrez Vacheron Constantin depuis 1755 : plus ancienne manufacture horlogère, Patrimony, Overseas, Métiers d'Art, tradition genevoise et excellence artisanale.",
  keywords: "Vacheron Constantin, 1755, Genève, Patrimony, Overseas, Métiers d'Art, Poinçon de Genève, horlogerie traditionnelle",
};

export default function VacheronConstantinPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie/manufactures"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux Manufactures
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Genevoise depuis 1755
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⭐</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                Vacheron Constantin
              </h1>
              <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold italic">
                "Faire mieux si possible, ce qui est toujours possible"
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1755 par Jean-Marc Vacheron, Vacheron Constantin est la plus ancienne manufacture horlogère au monde en activité ininterrompue. Depuis 270 ans, elle incarne l'excellence genevoise, l'art des Métiers d'Art et une tradition horlogère sans égale[web:169][web:181][web:178].
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1755" label="Année de fondation" color="orange" />
            <StatCard number="270" label="Ans d'histoire continue" color="blue" />
            <StatCard number="1.64mm" label="Calibre le plus fin (1955)" color="green" />
            <StatCard number="57" label="Complications (record)" color="purple" />
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            1755 : La Naissance d'une Légende
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">👨 Jean-Marc Vacheron (1731-1805)</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  À seulement 24 ans, Jean-Marc Vacheron ouvre son atelier d'horlogerie à Genève en <span className="font-semibold text-gray-900 dark:text-gray-100">1755</span>[web:169][web:187].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Ami proche des philosophes des Lumières <span className="font-semibold text-gray-900 dark:text-gray-100">Jean-Jacques Rousseau</span> et <span className="font-semibold text-gray-900 dark:text-gray-100">Voltaire</span>, il partage avec eux un intérêt profond pour la philosophie, la science et l'horlogerie[web:169].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En <span className="font-semibold text-gray-900 dark:text-gray-100">1779</span>, Vacheron crée les premiers cadrans guillochés, marquant une innovation esthétique majeure[web:169].
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🤝 François Constantin (1819)</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  En <span className="font-semibold text-gray-900 dark:text-gray-100">1819</span>, Jacques-Barthélemy Vacheron (petit-fils du fondateur) s'associe avec François Constantin pour développer les exportations vers la France et l'Italie[web:169][web:178].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  La manufacture devient <span className="font-semibold text-gray-900 dark:text-gray-100">Vacheron & Constantin</span>. C'est Constantin qui énonce la devise légendaire : <span className="italic">"Faire mieux si possible, ce qui est toujours possible"</span>[web:169][web:178].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Cette philosophie d'amélioration perpétuelle guide encore aujourd'hui chaque création de la manufacture.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">270 Ans Sans Interruption</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Vacheron Constantin détient le record absolu de <span className="font-semibold text-gray-900 dark:text-gray-100">production continue</span> depuis 1755. Aucune autre manufacture horlogère n'a survécu sans interruption à travers les révolutions, guerres et crises économiques[web:169][web:181].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Révolution Industrielle */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            1839 : Pionniers de l'Industrialisation
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1839</span>, Vacheron Constantin prend un tournant historique en devenant l'une des premières manufactures à adopter la révolution industrielle[web:178].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              La manufacture engage <span className="font-semibold text-gray-900 dark:text-gray-100">Georges-Auguste Leschot</span>, inventeur de "machines à faire des pièces de montres". Beaucoup le considèrent comme un visionnaire fou[web:178].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Deux ans plus tard, Leschot réussit : <span className="font-semibold text-gray-900 dark:text-gray-100">l'interchangeabilité des pièces</span> devient réalité. Vacheron Constantin peut produire des montres de première qualité à prix accessible, révolutionnant l'horlogerie moderne[web:178].
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                💡 Cette innovation donne à Vacheron Constantin une avance considérable sur tous ses concurrents et pose les bases de l'horlogerie industrielle moderne[web:178].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Les Collections Emblématiques
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <CollectionCard
              name="Patrimony"
              icon="🎩"
              description="Élégance pure et intemporelle. Design minimaliste inspiré des montres historiques de la manufacture. Finesse extrême et proportions parfaites."
              features={["Ultra-plat", "Design épuré", "Tradition genevoise", "Élégance classique"]}
              color="blue"
            />
            <CollectionCard
              name="Overseas"
              icon="🌊"
              description="Montre de sport de luxe lancée en 1977. Boîtier avec lunette Maltese Cross. Bracelets interchangeables (acier, cuir, caoutchouc)."
              features={["Sport-chic", "Étanchéité 150m", "Bracelets échangeables", "Design iconique"]}
              color="green"
            />
            <CollectionCard
              name="Métiers d'Art"
              icon="🎨"
              description="Chef-d'œuvre d'artisanat. Cadrans peints à la main, émaillage, gravure, guillochage. Partenariats avec le Louvre et le Met."
              features={["Artisanat d'art", "Pièces uniques", "Collaboration musées", "Savoir-faire rare"]}
              color="purple"
            />
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">🎨 Métiers d'Art : L'Excellence Artisanale</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
              Les maîtres artisans de Vacheron Constantin perpétuent des techniques ancestrales : émaillage, guillochage, gravure, peinture miniature sur cadran[web:177][web:180]. Chaque pièce Métiers d'Art est une œuvre d'art unique.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ArtBadge name="Émaillage" />
              <ArtBadge name="Guillochage" />
              <ArtBadge name="Gravure" />
              <ArtBadge name="Peinture miniature" />
              <ArtBadge name="Marqueterie" />
              <ArtBadge name="Joaillerie" />
              <ArtBadge name="Champlevé" />
              <ArtBadge name="Cloisonné" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovations */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Innovations et Records
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InnovationCard
              year="1955"
              title="Calibre V.C 1003 : Record d'Ultra-Plat"
              description="Pour ses 200 ans, Vacheron présente le calibre mécanique le plus fin du monde : 1,64mm d'épaisseur seulement (à peine plus qu'une pièce de monnaie)."
              icon="📏"
            />
            <InnovationCard
              year="2015"
              title="Référence 57260 : 57 Complications"
              description="Montre de poche la plus compliquée jamais créée : 57 complications, 8 ans de développement, 2800 composants. Record mondial absolu."
              icon="🏆"
            />
            <InnovationCard
              year="1979"
              title="Kallista : Montre la Plus Chère"
              description="Montre en or jaune entièrement sertie de 118 diamants taillés émeraude (130 carats). Valeur : 5 millions de dollars (record à l'époque)."
              icon="💎"
            />
            <InnovationCard
              year="2006"
              title="Tour de l'Île : Double Face"
              description="Montre la plus compliquée de l'époque (16 complications) avec double cadran. Célèbre le 250e anniversaire de la manufacture."
              icon="🎯"
            />
            <InnovationCard
              year="1770"
              title="Premières Complications"
              description="Seulement 15 ans après sa fondation, Vacheron Constantin maîtrise déjà les complications horlogères complexes."
              icon="⚙️"
            />
            <InnovationCard
              year="2024"
              title="Partenariat Louvre & Met"
              description="Collaborations prestigieuses avec les plus grands musées mondiaux pour célébrer l'art, la culture et le patrimoine."
              icon="🏛️"
            />
          </div>
        </div>
      </section>

      {/* Poinçon de Genève */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Poinçon de Genève
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vacheron Constantin est l'un des rares fabricants à apposer systématiquement le <span className="font-semibold text-gray-900 dark:text-gray-100">Poinçon de Genève</span> sur tous ses mouvements depuis 1901[web:181].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Ce sceau historique garantit l'origine genevoise, la qualité exceptionnelle des finitions et le respect de critères stricts de fabrication et d'assemblage.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">✅ Critères du Poinçon</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Assemblage à Genève</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Finitions manuelles impeccables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Composants de haute qualité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Contrôles rigoureux indépendants</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">🎯 Engagement Qualité</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Tradition genevoise depuis 1755</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Savoir-faire transmis de génération en génération</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Excellence horlogère reconnue mondialement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Explorez les Autres Manufactures
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Découvrez Patek Philippe, Rolex, Audemars Piguet et Omega
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour aux Manufactures
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Components identiques aux pages précédentes
