// app/[locale]/theorie/manufactures/audemars-piguet/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audemars Piguet - Manufacture Indépendante | HorloLearn",
  description: "Découvrez Audemars Piguet (1875) : Royal Oak, tradition familiale, Grande Complication, innovation horlogère suisse du Brassus.",
  keywords: "Audemars Piguet, Royal Oak, Le Brassus, manufacture indépendante, grande complication, horlogerie suisse",
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
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Indépendante
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🏔️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Audemars Piguet
              </h1>
              <p className="text-xl text-purple-200 mt-2">
                Le Brassus, Vallée de Joux - 1875
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-4xl mb-8">
            Fondée en 1875 par Jules Louis Audemars et Edward Auguste Piguet dans la Vallée de Joux, Audemars Piguet demeure l'une des rares manufactures horlogères suisses encore dirigées par les familles fondatrices. Pionnière de la haute horlogerie sportive avec la Royal Oak (1972), elle incarne l'excellence technique et l'audace créative.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1875" label="Année de fondation" />
            <StatCard number="100%" label="Indépendante" />
            <StatCard number="50K" label="Montres/an" />
            <StatCard number="1140m" label="Altitude Le Brassus" />
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Histoire et Héritage Familial
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1875</span>, Jules Louis Audemars s'associe à Edward Auguste Piguet pour créer une manufacture horlogère dans le petit village du Brassus, situé dans la Vallée de Joux suisse, à plus de 1000 mètres d'altitude.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dès ses débuts, la manufacture se distingue par la fabrication de <span className="font-semibold text-gray-900 dark:text-gray-100">montres à complications extrêmement sophistiquées</span> : quantièmes perpétuels, répétitions minutes, chronographes. En 1892, AP présente la première montre-bracelet à répétition minutes au monde.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Aujourd'hui encore, Audemars Piguet reste <span className="font-semibold text-gray-900 dark:text-gray-100">100% indépendante et familiale</span>, refusant toute fusion ou rachat par des groupes horlogers. Cette indépendance garantit une liberté créative totale et une vision à très long terme.
            </p>
          </div>
        </div>
      </section>

      {/* Royal Oak */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            La Royal Oak : Révolution 1972
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Genèse du Modèle</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                En 1972, face à la crise du quartz qui menace l'horlogerie mécanique, Audemars Piguet prend un risque colossal : lancer une <span className="font-semibold text-gray-900 dark:text-gray-100">montre de sport de luxe en acier</span> au prix d'une montre en or.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dessinée par le légendaire Gérald Genta en une seule nuit, la Royal Oak s'inspire des <span className="font-semibold text-gray-900 dark:text-gray-100">hublots de navires de guerre britanniques</span>, avec sa lunette octogonale et ses 8 vis hexagonales apparentes.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Caractéristiques Iconiques</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Lunette octogonale</span> : 8 vis apparentes en or blanc</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Bracelet intégré</span> : seamless avec boîtier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Cadran "Tapisserie"</span> : motif guilloché signature</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Étanchéité</span> : 50m (rare pour montres habillées 1970s)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Calibre ultra-plat</span> : 3,05mm d'épaisseur (record 1972)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-l-4 border-purple-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">🏆 Impact Culturel</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              La Royal Oak fut d'abord un échec commercial : trop chère, trop avant-gardiste. Mais dans les années 1980-90, elle devient l'icône de la haute horlogerie sportive, créant une catégorie entièrement nouvelle. Aujourd'hui, la Royal Oak représente plus de 50% des ventes d'Audemars Piguet et influence toute l'industrie horlogère moderne.
            </p>
          </div>
        </div>
      </section>

      {/* Innovations */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Innovations Techniques Majeures
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <InnovationCard
              year="1892"
              title="Répétition Minutes Montre-Bracelet"
              description="Première montre-bracelet au monde équipée d'une répétition minutes, complication sonnant l'heure à la demande."
            />
            <InnovationCard
              year="1986"
              title="Montre la Plus Compliquée"
              description="Calibre 2870 : 1168 pièces, quantième perpétuel, répétition minutes, chronographe rattrapante, phases de lune."
            />
            <InnovationCard
              year="1997"
              title="Royal Oak Offshore"
              description="Version surdimensionnée (42mm) de la Royal Oak. Design extrême qui définit l'horlogerie sportive moderne."
            />
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Philosophie et Savoir-Faire
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🏔️ Vallée de Joux</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Depuis 1875, toutes les montres AP sont conçues, fabriquées et assemblées au Brassus, dans la Vallée de Joux. Cet isolement géographique a forgé une culture horlogère unique, où l'excellence technique se transmet de génération en génération.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🎨 Audace Créative</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                AP incarne l'audace : Royal Oak en acier luxe (1972), Royal Oak Offshore XXL (1993), montres squelettes ultra-techniques. La manufacture repousse constamment les limites du design tout en préservant l'excellence horlogère traditionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Découvrez les Autres Manufactures
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Explorez Patek Philippe, Rolex, Vacheron Constantin et Omega
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

// ==========================================
// COMPONENTS
// ==========================================

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

function InnovationCard({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">{year}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
