// app/[locale]/theorie/manufactures/patek-philippe/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patek Philippe - La Manufacture de Prestige Absolu | HorloLearn",
  description: "Découvrez l'histoire de Patek Philippe depuis 1839 : innovations majeures, collections iconiques Calatrava et Nautilus, quantièmes perpétuels et savoir-faire d'exception.",
  keywords: "Patek Philippe, manufacture genevoise, Calatrava, Nautilus, quantième perpétuel, horlogerie de luxe, Stern",
};

export default function PatekPhilippePage() {
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
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture Genevoise
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">👑</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                Patek Philippe
              </h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold italic">
                "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes juste le gardien pour les générations futures."
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Fondée à Genève en 1839, Patek Philippe incarne l'excellence absolue de l'horlogerie de luxe. Manufacture indépendante et familiale depuis 1932, elle est réputée pour ses complications exceptionnelles et son prestige inégalé[web:118][web:120][web:141].
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1839" label="Année de fondation" color="blue" />
            <StatCard number="70+" label="Brevets déposés" color="green" />
            <StatCard number="175+" label="Ans d'histoire" color="purple" />
            <StatCard number="100%" label="Indépendance familiale" color="orange" />
          </div>
        </div>
      </section>

      {/* Histoire et Fondateurs */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Les Origines (1839-1851)
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">👨 Antoine Norbert de Patek</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Né en Pologne en 1812, Antoine Norbert de Patek fuit son pays après la révolution polonaise et s'installe à Genève en 1832[web:120][web:130].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En 1839, il s'associe avec François Czapek pour fonder <span className="font-semibold text-gray-900 dark:text-gray-100">Patek, Czapek & Cie</span>, produisant environ 200 montres de haute qualité par an[web:141].
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🔧 Jean-Adrien Philippe</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  En 1844, lors de l'Exposition universelle de Paris, Patek rencontre l'horloger français Jean-Adrien Philippe, inventeur du <span className="font-semibold text-gray-900 dark:text-gray-100">remontoir à couronne</span>[web:120][web:130].
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Cette innovation révolutionnaire permet de remonter et régler une montre sans clé. En 1845, Philippe remplace Czapek, et en 1851, la marque devient officiellement <span className="font-semibold text-gray-900 dark:text-gray-100">Patek Philippe & Cie</span>[web:141].
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">1851 : Premier Client Royal</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Lors de l'Exposition internationale de Londres, la Reine Victoria d'Angleterre achète une montre Patek Philippe qu'elle porte en broche. C'est le début d'une clientèle royale et aristocratique mondiale[web:130][web:141].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famille Stern */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            L'Ère Stern (1932 - Aujourd'hui)
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1932</span>, en pleine Grande Dépression, les frères Charles et Jean Stern, propriétaires de la manufacture de cadrans Stern Frères, rachètent Patek Philippe pour la sauver de la faillite[web:120][web:141].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cette acquisition familiale garantit l'<span className="font-semibold text-gray-900 dark:text-gray-100">indépendance totale</span> de la manufacture jusqu'à aujourd'hui. Thierry Stern, arrière-petit-fils de Charles, dirige actuellement la maison avec la même philosophie d'excellence et d'innovation[web:120].
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                💡 <span className="font-semibold">Indépendance familiale</span> : Patek Philippe est l'une des rares manufactures de luxe encore 100% indépendante, sans actionnaire externe ni groupe financier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Majeures */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Innovations et Records
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InnovationCard
              year="1868"
              title="Première Montre-Bracelet Suisse"
              description="Patek Philippe crée l'une des premières montres-bracelet au monde pour la comtesse hongroise Koscowicz, bien avant que ce format ne devienne populaire."
              icon="⌚"
            />
            <InnovationCard
              year="1925"
              title="Premier Quantième Perpétuel-Bracelet"
              description="Première montre-bracelet au monde équipée d'un quantième perpétuel, complication technique extraordinairement complexe."
              icon="📅"
            />
            <InnovationCard
              year="1959"
              title="Balancier Gyromax"
              description="Invention du balancier Gyromax breveté, permettant un réglage de précision exceptionnelle sans vis de réglage traditionnelles."
              icon="⚙️"
            />
            <InnovationCard
              year="1996"
              title="Quantième Annuel"
              description="Brevet du quantième annuel, complication intermédiaire qui distingue les mois de 30 et 31 jours automatiquement (une seule correction par an)."
              icon="📆"
            />
          </div>
        </div>
      </section>

      {/* Collections Iconiques */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Collections Iconiques
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <CollectionCard
              name="Calatrava"
              year="1932"
              description="Symbole absolu de l'élégance horlogère. Design épuré et intemporel inspiré du mouvement Bauhaus. Référence 96 originale devenue icône de l'horlogerie classique."
              characteristics={[
                "Ligne pure et minimaliste",
                "Proportions parfaites",
                "Finitions exquises",
                "Élégance intemporelle"
              ]}
              color="blue"
            />

            <CollectionCard
              name="Nautilus"
              year="1976"
              description="Montre de sport de luxe révolutionnaire dessinée par Gérald Genta. Boîtier octogonal inspiré d'un hublot de paquebot, bracelets intégrés. Devient l'une des montres les plus recherchées au monde."
              characteristics={[
                "Design iconique Genta",
                "Boîtier octogonal breveté",
                "Étanchéité 120m",
                "Sportive et élégante"
              ]}
              color="green"
            />
          </div>

          <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              🎯 Grandes Complications
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-6">
              Patek Philippe est le maître incontesté des grandes complications horlogères : quantièmes perpétuels, répétitions minutes, tourbillons, chronographes rattrapante[web:134][web:146].
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <ComplicationBadge name="Quantième Perpétuel" />
              <ComplicationBadge name="Répétition Minutes" />
              <ComplicationBadge name="Chronographe Rattrapante" />
              <ComplicationBadge name="Tourbillon" />
              <ComplicationBadge name="Équation du Temps" />
              <ComplicationBadge name="Phases de Lune" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Sceau Patek Philippe
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depuis 2009, Patek Philippe applique son propre <span className="font-semibold text-gray-900 dark:text-gray-100">Sceau Patek Philippe</span>, certification interne bien plus stricte que le Poinçon de Genève[web:145].
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Critères du Sceau</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Précision : -3/+2 secondes par jour</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Finitions manuelles exceptionnelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Fonctionnement de toutes les complications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Garantie à vie des réparations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Valeurs Fondamentales</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Indépendance familiale totale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Innovation constante (70+ brevets)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Tradition et savoir-faire artisanal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Héritage transgénérationnel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
              💬 <span className="font-semibold">"Begin your own tradition"</span> - Slogan emblématique de Patek Philippe, invitant chaque propriétaire à créer son propre héritage familial autour de la montre.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Explorez les Autres Manufactures
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Découvrez Rolex, Audemars Piguet, Vacheron Constantin et Omega
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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
}

function InnovationCard({ year, title, description, icon }: InnovationCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded mb-2">
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
  description: string;
  characteristics: string[];
  color: 'blue' | 'green';
}

function CollectionCard({ name, year, description, characteristics, color }: CollectionCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };

  const badgeClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
        <span className={`text-xs font-bold ${badgeClasses[color]} px-3 py-1 rounded-full`}>{year}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
      <div className="space-y-2">
        {characteristics.map((char, index) => (
          <div key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span>{char}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplicationBadge({ name }: { name: string }) {
  return (
    <div className="bg-white dark:bg-neutral-800 border border-purple-200 dark:border-purple-800 rounded-lg px-4 py-2 text-center">
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</span>
    </div>
  );
}
