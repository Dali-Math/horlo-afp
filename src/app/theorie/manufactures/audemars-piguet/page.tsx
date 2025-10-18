// app/[locale]/theorie/manufactures/audemars-piguet/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audemars Piguet - L'Avant-Garde de l'Horlogerie | HorloLearn",
  description: "Découvrez Audemars Piguet depuis 1875 : Royal Oak révolutionnaire, innovations techniques, grandes complications et indépendance familiale dans la Vallée de Joux.",
  keywords: "Audemars Piguet, Royal Oak, Vallée de Joux, Gérald Genta, tourbillon, manufacture indépendante, Le Brassus",
};

export default function AudemarsPiguetPage() {
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
            <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture de la Vallée de Joux
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔷</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                Audemars Piguet
              </h1>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold italic">
                "To break the rules, you must first master them"
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1875 au Brassus par Jules Louis Audemars et Edward Auguste Piguet, Audemars Piguet est restée indépendante et familiale depuis sa création. Pionnière des grandes complications et créatrice de la légendaire Royal Oak, elle incarne l'audace et l'avant-garde horlogère.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1875" label="Année de fondation" color="purple" />
            <StatCard number="100%" label="Indépendante" color="blue" />
            <StatCard number="50K" label="Montres/an" color="green" />
            <StatCard number="1140m" label="Altitude Le Brassus" color="orange" />
          </div>
        </div>
      </section>

      {/* Fondation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Les Fondateurs de la Vallée de Joux
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1875</span>, deux jeunes horlogers de 24 et 22 ans, <span className="font-semibold text-gray-900 dark:text-gray-100">Jules Louis Audemars</span> et <span className="font-semibold text-gray-900 dark:text-gray-100">Edward Auguste Piguet</span>, s'associent au Brassus, village isolé de la Vallée de Joux dans le canton de Vaud.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Audemars se charge de la conception et fabrication des mouvements complexes, tandis que Piguet s'occupe de la commercialisation et de la gestion. Leur complémentarité parfaite et leur passion pour les <span className="font-semibold text-gray-900 dark:text-gray-100">complications horlogères</span> posent les bases d'une manufacture d'exception.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Dès 1882, ils créent la première <span className="font-semibold text-gray-900 dark:text-gray-100">montre de poche à quantième perpétuel</span> avec phase de lune, affirmant leur maîtrise technique.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-l-4 border-purple-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏔️</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">La Vallée de Joux : Berceau de l'Horlogerie Complexe</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Située à 1140 mètres d'altitude, la Vallée de Joux a développé une tradition horlogère unique grâce aux longs hivers qui poussaient les agriculteurs à pratiquer l'horlogerie pendant la saison froide. Aujourd'hui encore, AP n'a jamais quitté Le Brassus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Oak */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Royal Oak : La Révolution de 1972
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🎨 Gérald Genta : Le Design Iconique</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                En 1971, face à la crise du quartz, Audemars Piguet commande au designer <span className="font-semibold text-gray-900 dark:text-gray-100">Gérald Genta</span> une montre de sport de luxe révolutionnaire.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Genta s'inspire des <span className="font-semibold text-gray-900 dark:text-gray-100">scaphandriers</span> et des hublots de navires. En une nuit, il dessine un boîtier octogonal avec 8 vis hexagonales apparentes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Lancée au salon de Bâle en <span className="font-semibold text-gray-900 dark:text-gray-100">1972</span>, la Royal Oak (référence 5402ST) choque : une montre en acier au prix de l'or ! Mais elle devient rapidement une icône absolue.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">✨ Caractéristiques Techniques</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Boîtier octogonal</span> inspiré d'un scaphandre</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">8 vis hexagonales</span> apparentes sur la lunette</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Cadran "Tapisserie"</span> guillochage exclusif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Bracelet intégré</span> design fluide avec le boîtier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Acier inoxydable</span> finitions haute horlogerie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Étanchéité 50m</span> (évoluée à 100m)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">🌟 Impact et Héritage</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-4">
              La Royal Oak crée la catégorie des <span className="font-semibold text-gray-900 dark:text-gray-100">"montres de sport de luxe en acier"</span>, imitée par toute l'industrie (Patek Nautilus, Vacheron Overseas...). Elle sauve Audemars Piguet de la crise du quartz et devient l'icône absolue de la marque.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100">Royal Oak Chronograph</span>
              <span className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100">Royal Oak Offshore</span>
              <span className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100">Royal Oak Concept</span>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Innovations et Complications
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InnovationCard
              year="1892"
              title="Première Répétition Minutes"
              description="Audemars Piguet crée la première montre-bracelet à répétition minutes au monde, complication rarissime."
              icon="🔔"
            />
            <InnovationCard
              year="1986"
              title="Montre la Plus Compliquée"
              description="Création d'une montre de poche avec 40 complications, record mondial détenu pendant des années."
              icon="🏆"
            />
            <InnovationCard
              year="1993"
              title="Royal Oak Offshore"
              description="Version oversized (42mm) de la Royal Oak, audacieuse et sportive. Devient culte auprès des collectionneurs."
              icon="💪"
            />
            <InnovationCard
              year="1997"
              title="Millenary"
              description="Boîtier elliptique avec mouvement visible. Design architectural avant-gardiste unique."
              icon="⚙️"
            />
            <InnovationCard
              year="2006"
              title="Royal Oak Concept"
              description="Ligne ultra-technique en matériaux composites (carbone, céramique, titane). Futurisme horloger."
              icon="🚀"
            />
            <InnovationCard
              year="2019"
              title="Code 11.59"
              description="Nouvelle collection habillée avec boîtier complexe à double courbure. Architecture innovante."
              icon="🎯"
            />
          </div>
        </div>
      </section>

      {/* Indépendance */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Indépendance et Valeurs
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Audemars Piguet est l'une des <span className="font-semibold text-gray-900 dark:text-gray-100">rares manufactures encore totalement indépendantes et familiales</span>. Aucun actionnaire externe, aucun groupe financier : les familles fondatrices contrôlent toujours la marque.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">🎯 Philosophie</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><span className="font-semibold">Audace créative</span> : repousser les limites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><span className="font-semibold">Excellence technique</span> : complications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><span className="font-semibold">Tradition moderne</span> : héritage + innovation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">🏭 Production</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">~50 000 montres/an</span> : exclusivité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Manufacture intégrée</span> : Le Brassus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Artisanat d'exception</span> : finitions manuelles</span>
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
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Explorez les Autres Manufactures
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Découvrez Patek Philippe, Rolex, Vacheron Constantin et Omega
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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

// Components (mêmes que précédemment - StatCard, InnovationCard...)
