// app/[locale]/theorie/manufactures/omega/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omega - Précision et Conquête Spatiale | HorloLearn",
  description: "Découvrez Omega depuis 1848 : Speedmaster Moonwatch, Apollo 11, Seamaster James Bond 007, innovations techniques et chronométrage olympique.",
  keywords: "Omega, Speedmaster, Moonwatch, Apollo 11, NASA, Seamaster, James Bond, Bienne, chronométrage olympique, Co-Axial",
};

export default function OmegaPage() {
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
            <span className="inline-block bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture de Bienne
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🌙</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                Omega
              </h1>
              <p className="text-xl text-red-600 dark:text-red-400 font-semibold italic">
                "First Watch on the Moon"
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1848 à La Chaux-de-Fonds par Louis Brandt, Omega est devenue synonyme de précision chronométrique absolue. De la conquête spatiale avec la Speedmaster Moonwatch aux profondeurs océaniques avec la Seamaster, Omega a marqué l'histoire de l'exploration humaine[web:191][web:196][web:200].
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1848" label="Année de fondation" color="red" />
            <StatCard number="1969" label="Moonwatch Apollo 11" color="blue" />
            <StatCard number="30+" label="Jeux Olympiques" color="green" />
            <StatCard number="300m" label="Étanchéité Seamaster" color="purple" />
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Louis Brandt : Les Débuts (1848)
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1848</span>, Louis Brandt, jeune horloger de 23 ans, ouvre un modeste atelier d'assemblage de montres à <span className="font-semibold text-gray-900 dark:text-gray-100">La Chaux-de-Fonds</span>, en Suisse[web:196][web:200].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Il assemble des montres de poche à partir de composants fournis par des artisans locaux et les vend à travers l'Europe, notamment en Italie et en Angleterre. Son travail se distingue rapidement par sa <span className="font-semibold text-gray-900 dark:text-gray-100">précision</span> et sa <span className="font-semibold text-gray-900 dark:text-gray-100">fiabilité</span>[web:196][web:200].
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">👨‍👦 Les Fils Brandt : Révolution Industrielle</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Après la mort de Louis en 1879, ses deux fils <span className="font-semibold text-gray-900 dark:text-gray-100">Louis-Paul</span> et <span className="font-semibold text-gray-900 dark:text-gray-100">César Brandt</span> prennent la direction de l'entreprise[web:196][web:200].
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En <span className="font-semibold text-gray-900 dark:text-gray-100">1880</span>, ils transfèrent la manufacture à <span className="font-semibold text-gray-900 dark:text-gray-100">Bienne</span>, centre horloger prospère, et construisent une usine moderne intégrant les méthodes de production de masse[web:196][web:200][web:204].
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">Ω</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">1894 : Naissance du Nom "Omega"</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En 1894, les frères Brandt lancent le <span className="font-semibold text-gray-900 dark:text-gray-100">calibre Omega</span>, un mouvement révolutionnaire par sa conception novatrice, sa précision et sa simplicité d'entretien[web:196]. Le succès est tel qu'en <span className="font-semibold text-gray-900 dark:text-gray-100">1903</span>, la société prend officiellement le nom d'<span className="font-semibold text-gray-900 dark:text-gray-100">Omega Watch Co.</span>[web:196][web:200].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speedmaster Apollo 11 */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            🚀 Speedmaster Moonwatch : La Conquête Spatiale
          </h2>

          <div className="mb-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-2xl p-8 mb-8">
              <h3 className="text-3xl font-bold mb-4 text-center">21 Juillet 1969 : Apollo 11</h3>
              <p className="text-xl text-center mb-4 italic">
                "One small step for man, one giant leap for mankind"
              </p>
              <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto">
                Neil Armstrong et Buzz Aldrin posent le pied sur la Lune. Au poignet d'Aldrin : l'<span className="font-semibold text-white">Omega Speedmaster</span>, première montre portée sur la Lune[web:176][web:188][web:189].
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🔬 Tests Rigoureux NASA (1964)</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  En 1964, la NASA cherche un chronographe fiable pour ses missions spatiales. Les exigences sont extrêmes[web:188][web:189] :
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Résistance thermique : 0°C à 93°C</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Accélérations : jusqu'à 12 g</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Étanchéité et résistance aux chocs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Antimagnétique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Remontage manuel (sécurité)</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Seule la <span className="font-semibold text-gray-900 dark:text-gray-100">Speedmaster</span> réussit l'intégralité des tests[web:188][web:189].
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🌙 Moonwatch : Caractéristiques</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">Calibre 321</span> puis 1861 (manuel)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">Verre Hesalite</span> : ne se brise pas en éclats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">Lunette tachymétrique</span> : calculs de vitesse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">3 compteurs</span> : 30 min, 12h, secondes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">Bracelet acier</span> ou Velcro NASA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><span className="font-semibold">42mm</span> : dimensions parfaites</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">🚨 Apollo 13 (1970) : La Speedmaster Sauve l'Équipage</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-4">
                Après une explosion à bord, les systèmes électroniques d'Apollo 13 tombent en panne. La Speedmaster devient le <span className="font-semibold text-gray-900 dark:text-gray-100">seul instrument de chronométrage</span> fiable pour calculer les manœuvres de retour sur Terre[web:182][web:176].
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                Grâce à la précision de la Moonwatch, l'équipage effectue les allumages moteurs au moment exact nécessaire. <span className="font-semibold text-gray-900 dark:text-gray-100">Les trois astronautes sont sauvés</span>[web:182][web:176].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seamaster James Bond */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            🌊 Seamaster : Plongée & James Bond 007
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🤿 Seamaster Diver 300M</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Lancée en <span className="font-semibold text-gray-900 dark:text-gray-100">1993</span>, la Seamaster Diver 300M devient rapidement une référence mondiale de la plongée professionnelle[web:201].
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Étanchéité 300m</span> (30 bars)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Valve à hélium</span> : décompression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Lunette unidirectionnelle</span> : sécurité</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Cadran vagues</span> : design iconique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Super-LumiNova</span> : visibilité maximale</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">🕴️ James Bond depuis 1995</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Depuis <span className="font-semibold text-gray-900 dark:text-gray-100">GoldenEye</span> (1995) avec Pierce Brosnan, James Bond porte exclusivement des Omega Seamaster[web:201].
              </p>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">GoldenEye (1995)</span> : Seamaster 300M Quartz
                </div>
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Casino Royale (2006)</span> : Seamaster Planet Ocean
                </div>
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Skyfall (2012)</span> : Seamaster Aqua Terra
                </div>
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">No Time to Die (2021)</span> : Seamaster Diver 300M Édition 007
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">🎬 Seamaster Diver 300M Édition 007 (2019)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-4">
              Conçue en collaboration avec <span className="font-semibold text-gray-900 dark:text-gray-100">Daniel Craig</span> pour le film "Mourir peut attendre"[web:201]. Boîtier en titane grade 2, cadran brun "tropical", numéros militaires gravés au fond. Design inspiré des vraies montres de l'armée britannique[web:201].
            </p>
          </div>
        </div>
      </section>

      {/* Innovations */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Innovations Techniques
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InnovationCard
              year="1894"
              title="Calibre Omega 19 Lignes"
              description="Premier mouvement révolutionnaire avec couronne de remontage latérale. Précision exceptionnelle."
              icon="⚙️"
            />
            <InnovationCard
              year="1917"
              title="Fournisseur RAF & US Army"
              description="Omega devient fournisseur officiel de la Royal Air Force britannique et de l'armée américaine."
              icon="✈️"
            />
            <InnovationCard
              year="1932"
              title="Chronométrage Olympique"
              description="Première manufacture à chronométrer les Jeux Olympiques (Los Angeles). Plus de 30 éditions depuis."
              icon="🏅"
            />
            <InnovationCard
              year="1999"
              title="Échappement Co-Axial"
              description="Invention révolutionnaire de George Daniels adoptée par Omega. Réduit les frottements de 90%."
              icon="🔧"
            />
            <InnovationCard
              year="2013"
              title="Master Chronometer"
              description="Certification METAS ultra-stricte : résistance à 15 000 gauss (champs magnétiques extrêmes)."
              icon="🧲"
            />
            <InnovationCard
              year="2019"
              title="Moonshine Gold"
              description="Alliage d'or exclusif plus résistant à l'oxydation et à la décoloration que l'or classique."
              icon="✨"
            />
          </div>
        </div>
      </section>

      {/* Jeux Olympiques */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            🏅 Chronométreur Officiel Olympique
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
              Depuis <span className="font-semibold text-gray-900 dark:text-gray-100">1932</span>, Omega a chronométré plus de <span className="font-semibold text-gray-900 dark:text-gray-100">30 éditions des Jeux Olympiques</span>[web:196]. La marque est devenue synonyme de <span className="font-semibold text-gray-900 dark:text-gray-100">précision chronométrique sportive</span> au plus haut niveau mondial.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <OlympicBadge year="1932" city="Los Angeles" />
              <OlympicBadge year="2008" city="Beijing" />
              <OlympicBadge year="2012" city="London" />
              <OlympicBadge year="2024" city="Paris" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Explorez les Autres Manufactures
            </h2>
            <p className="text-xl text-red-50 mb-8">
              Découvrez Patek Philippe, Rolex, Audemars Piguet et Vacheron Constantin
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

function StatCard({ number, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
    red: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
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
}

function InnovationCard({ year, title, description, icon }: InnovationCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <span className="inline-block bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-xs font-bold px-2 py-1 rounded mb-2">
            {year}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function OlympicBadge({ year, city }: { year: string; city: string }) {
  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{year}</div>
      <div className="text-xs text-gray-700 dark:text-gray-300">{city}</div>
    </div>
  );
}
