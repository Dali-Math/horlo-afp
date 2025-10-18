// app/[locale]/theorie/manufactures/rolex/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rolex - L'Icône Intemporelle de l'Horlogerie | HorloLearn",
  description: "Découvrez l'histoire de Rolex depuis 1905 : Hans Wilsdorf, l'Oyster étanche, Submariner, GMT-Master, Daytona et la certification Superlative Chronometer.",
  keywords: "Rolex, Hans Wilsdorf, Oyster, Submariner, Daytona, GMT-Master, Superlative Chronometer, COSC, montre étanche",
};

export default function RolexPage() {
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
            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Genevoise
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⚡</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                Rolex
              </h1>
              <p className="text-xl text-green-600 dark:text-green-400 font-semibold italic">
                L'icône mondiale de l'horlogerie de luxe
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1905 par Hans Wilsdorf, Rolex est devenue la marque horlogère la plus célèbre et reconnue au monde. Pionnière de la montre-bracelet étanche et fiable, elle incarne la robustesse, la précision et le prestige[web:148][web:150][web:152].
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1905" label="Année de fondation" color="green" />
            <StatCard number="700K+" label="Montres produites/an" color="blue" />
            <StatCard number="-2/+2s" label="Précision quotidienne" color="purple" />
            <StatCard number="100%" label="Intégration verticale" color="orange" />
          </div>
        </div>
      </section>

      {/* Hans Wilsdorf */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Hans Wilsdorf : Le Visionnaire (1881-1960)
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Les Débuts à Londres</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Né en Bavière (Allemagne) en 1881, Hans Wilsdorf devient orphelin à 12 ans. Après des études commerciales, il travaille dans l'export de montres à La Chaux-de-Fonds (Suisse)[web:148][web:152].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  En <span className="font-semibold text-gray-900 dark:text-gray-100">1905</span>, à 24 ans, il fonde à Londres avec son beau-frère Alfred Davis la société <span className="font-semibold text-gray-900 dark:text-gray-100">Wilsdorf & Davis</span>, spécialisée dans la distribution de montres-bracelets[web:148][web:150].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  À cette époque, la montre-bracelet est perçue comme un bijou féminin peu fiable. Wilsdorf a la vision audacieuse d'en faire un instrument précis et robuste pour tous[web:148].
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Naissance du Nom "Rolex"</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  En <span className="font-semibold text-gray-900 dark:text-gray-100">1908</span>, Wilsdorf cherche un nom court, mémorable et facile à prononcer dans toutes les langues. Il invente "Rolex", un mot qui sonne comme le bruit du remontage d'une montre[web:150][web:155].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  En 1915, la Première Guerre mondiale et les droits de douane britanniques le poussent à transférer son entreprise en Suisse[web:155].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En <span className="font-semibold text-gray-900 dark:text-gray-100">1920</span>, il fonde officiellement <span className="font-semibold text-gray-900 dark:text-gray-100">Montres Rolex SA</span> à Genève[web:155].
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏛️</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">La Fondation Hans Wilsdorf (1945)</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Après la mort de sa femme en 1944, Hans Wilsdorf crée la <span className="font-semibold text-gray-900 dark:text-gray-100">Fondation Hans Wilsdorf</span>, institution privée à but non lucratif, à laquelle il lègue toutes ses parts de Rolex. Encore aujourd'hui, cette fondation possède 100% de Rolex, garantissant son indépendance totale[web:149][web:151].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Révolutionnaires */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Les Innovations Révolutionnaires
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InnovationCard
              year="1926"
              title="Oyster : Première Montre Étanche"
              description="Invention du boîtier Oyster hermétique grâce à une couronne vissée et un fond vissé. Mercedes Gleitze traverse la Manche avec une Oyster au poignet pendant 10 heures : la montre fonctionne parfaitement."
              icon="🦪"
              color="blue"
            />
            <InnovationCard
              year="1931"
              title="Perpetual : Remontage Automatique"
              description="Rolex invente le système de remontage automatique par rotor à 360° (masse oscillante). Ce mécanisme devient le standard de l'industrie horlogère mondiale."
              icon="🔄"
              color="green"
            />
            <InnovationCard
              year="1953"
              title="Submariner : Montre de Plongée"
              description="Première montre de plongée étanche à 100 mètres avec lunette tournante graduée 60 minutes. Révolutionne la plongée professionnelle et sportive."
              icon="🤿"
              color="purple"
            />
            <InnovationCard
              year="1963"
              title="Cosmograph Daytona"
              description="Chronographe professionnel pour pilotes automobiles avec échelle tachymétrique. Devient l'une des montres les plus désirées et collectionnées au monde."
              icon="🏎️"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Collections Iconiques */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Les Collections Légendaires
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard
              name="Submariner"
              year="1953"
              icon="🌊"
              description="Montre de plongée par excellence, étanche jusqu'à 300m. Design reconnaissable entre mille avec sa lunette Cerachrom et ses index luminescents."
              features={["Étanchéité 300m", "Lunette Cerachrom", "Couronne Triplock", "Chromalight"]}
              color="blue"
            />
            <CollectionCard
              name="GMT-Master II"
              year="1954"
              icon="✈️"
              description="Créée pour les pilotes Pan Am. Affiche deux fuseaux horaires simultanément grâce à son aiguille GMT 24h et sa lunette bicolore Pepsi ou Batman."
              features={["Double fuseau horaire", "Lunette 24h bicolore", "Aiguille GMT", "Jubilé ou Oyster"]}
              color="green"
            />
            <CollectionCard
              name="Daytona"
              year="1963"
              icon="🏁"
              description="Chronographe mythique pour pilotes automobiles. Lunette tachymétrique, poussoirs vissés. Modèle le plus recherché des collectionneurs."
              features={["Chronographe", "Échelle tachymétrique", "Calibre 4130", "Cerachrom"]}
              color="orange"
            />
            <CollectionCard
              name="Datejust"
              year="1945"
              icon="📅"
              description="Première montre-bracelet à afficher la date avec changement instantané à minuit. Élégance classique avec cyclope et bracelet Jubilé."
              features={["Date à 3h", "Cyclope x2.5", "Bracelet Jubilé", "Choix de cadrans"]}
              color="purple"
            />
            <CollectionCard
              name="Day-Date"
              year="1956"
              icon="👑"
              description="Surnommée 'President', elle affiche le jour en toutes lettres. Disponible uniquement en or ou platine. Portée par présidents et personnalités."
              features={["Jour complet", "Date", "Or/Platine uniquement", "President bracelet"]}
              color="red"
            />
            <CollectionCard
              name="Explorer"
              year="1953"
              icon="🏔️"
              description="Montre d'exploration conçue pour l'ascension de l'Everest. Design sobre, lisibilité maximale, robustesse extrême pour les aventuriers."
              features={["Cadran noir", "Index 3-6-9", "Robustesse", "Lisibilité extrême"]}
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* Superlative Chronometer */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Superlative Chronometer : L'Excellence Certifiée
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depuis <span className="font-semibold text-gray-900 dark:text-gray-100">2015</span>, Rolex a établi sa propre certification <span className="font-semibold text-gray-900 dark:text-gray-100">"Superlative Chronometer"</span>, bien plus stricte que la certification COSC traditionnelle[web:154][web:157].
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">📋 Double Certification</h4>
                <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">1.</span>
                    <span><span className="font-semibold">COSC</span> : Mouvement testé 15 jours par organisme indépendant (-4/+6 sec/jour)[web:154][web:160]</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">2.</span>
                    <span><span className="font-semibold">Rolex</span> : Montre assemblée testée en conditions réelles (-2/+2 sec/jour)[web:154][web:166]</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">✅ Tests Superlative</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Précision</span> : -2/+2 sec/jour</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Réserve de marche</span> : vérifiée</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Étanchéité</span> : testée à 10% au-delà</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><span className="font-semibold">Remontage auto</span> : efficacité vérifiée</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500 rounded-xl p-6 mt-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                🔒 <span className="font-semibold">Garantie 5 ans</span> : Toute montre certifiée Superlative Chronometer bénéficie d'une garantie internationale de 5 ans, symbolisée par le sceau vert Rolex[web:154].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production et Innovation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Production et Matériaux Innovants
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🏭 Intégration Verticale Totale</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Rolex contrôle 100% de sa production dans 4 sites en Suisse : Genève (siège), Bienne (mouvements), Le Locle (composants), Plan-les-Ouates (R&D)[web:155].
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
                  <span>Fabrication des boîtiers et bracelets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Tests et certification finale</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">⚗️ Matériaux Exclusifs</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">💎</span>
                  <div>
                    <span className="font-semibold">Oystersteel 904L</span>
                    <p className="text-xs mt-1">Acier inoxydable ultra-résistant à la corrosion, utilisé dans l'aérospatiale[web:153]</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">🔷</span>
                  <div>
                    <span className="font-semibold">Cerachrom</span>
                    <p className="text-xs mt-1">Céramique haute technologie, inrayable et inaltérable[web:153][web:156]</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">💡</span>
                  <div>
                    <span className="font-semibold">Chromalight</span>
                    <p className="text-xs mt-1">Luminescence bleue longue durée, 2x plus intense[web:156]</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 text-xl">⚙️</span>
                  <div>
                    <span className="font-semibold">Parachrom</span>
                    <p className="text-xs mt-1">Spiral paramagnétique et antichoc breveté</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Explorez les Autres Manufactures
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Découvrez Patek Philippe, Audemars Piguet, Vacheron Constantin et Omega
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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

// ========================================
// COMPONENTS
// ========================================

interface StatCardProps {
  number: string;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ number, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-4 transition-all hover:shadow-md`}>
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

interface InnovationCardProps {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function InnovationCard({ year, title, description, icon, color }: InnovationCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  };

  const badgeClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6 hover:shadow-lg transition-all`}>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <span className={`inline-block ${badgeClasses[color]} text-xs font-bold px-2 py-1 rounded mb-2`}>
            {year}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface CollectionCardProps {
  name: string;
  year: string;
  icon: string;
  description: string;
  features: string[];
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
}

function CollectionCard({ name, year, icon, description, features, color }: CollectionCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-500',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-500',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-500',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-500',
    gray: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 hover:border-gray-500',
  };

  const badgeClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200',
    red: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
    gray: 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6 transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{icon}</span>
        <span className={`text-xs font-bold ${badgeClasses[color]} px-2 py-1 rounded`}>{year}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
      <div className="space-y-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
            <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
