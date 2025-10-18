// app/[locale]/theorie/mouvements-quartz/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mouvements à Quartz - Technologie Moderne | HorloLearn",
  description: "Découvrez les mouvements à quartz : principe piézoélectrique, fréquence 32'768 Hz, circuit intégré, précision exceptionnelle. La révolution horlogère des années 1970.",
  keywords: "quartz, mouvement électronique, piézoélectrique, 32768 Hz, pile, circuit intégré, précision, crise du quartz",
};

export default function MouvementsQuartzPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la théorie
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-blue-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Technologie Moderne
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔋</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
                Les Mouvements à Quartz
              </h1>
              <p className="text-xl text-blue-100 italic">
                La révolution électronique de l'horlogerie
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-blue-50 leading-relaxed max-w-4xl mb-8">
            Le mouvement à quartz utilise les propriétés piézoélectriques du cristal de quartz pour mesurer le temps avec une précision inégalée. Découvrez la technologie qui a révolutionné l'horlogerie dans les années 1970.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="32'768" label="Hz (vibrations/sec)" />
            <StatCard number="±15s" label="Précision mensuelle" />
            <StatCard number="2-5" label="Ans (durée pile)" />
            <StatCard number="75%" label="Production mondiale" />
          </div>
        </div>
      </section>

      {/* Principe Piézoélectrique */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Principe Piézoélectrique
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Qu'est-ce que l'Effet Piézoélectrique ?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              L'<span className="font-semibold text-gray-900 dark:text-gray-100">effet piézoélectrique</span> a été découvert en 1880 par les frères Pierre et Jacques Curie. Ce phénomène physique décrit la capacité de certains cristaux (dont le quartz) à se déformer sous l'effet d'un courant électrique, et inversement, à produire un courant électrique lorsqu'ils sont déformés mécaniquement.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dans une montre à quartz, une <span className="font-semibold text-gray-900 dark:text-gray-100">tension électrique</span> fournie par la pile traverse le cristal de quartz taillé en forme de diapason. Cette tension provoque une vibration du cristal à une <span className="font-semibold text-gray-900 dark:text-gray-100">fréquence extrêmement stable</span> : exactement 32'768 Hz (soit 32'768 vibrations par seconde).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cette fréquence n'a pas été choisie au hasard : 32'768 = 2<sup>15</sup>. Cela signifie qu'en divisant cette fréquence par 2 exactement 15 fois, on obtient 1 Hz, soit <span className="font-semibold text-gray-900 dark:text-gray-100">une impulsion par seconde</span> parfaite pour faire avancer l'aiguille des secondes.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-l-4 border-cyan-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Pourquoi le Quartz ?</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le quartz (SiO₂) est choisi car il présente une <span className="font-semibold">stabilité thermique exceptionnelle</span>, une grande résistance mécanique, et des propriétés piézoélectriques parfaites. De plus, il est abondant et peu coûteux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement d'un Mouvement à Quartz
          </h2>

          <div className="space-y-6 mb-8">
            <StepCard
              number="1"
              title="Alimentation : La Pile"
              description="Une pile miniature (généralement au lithium, 1,5V) fournit l'énergie électrique nécessaire. Durée de vie : 2 à 5 ans selon le modèle et les fonctions."
              icon="🔋"
              color="blue"
            />
            <StepCard
              number="2"
              title="Oscillation : Le Cristal de Quartz"
              description="Le courant électrique traverse le quartz taillé en diapason, le faisant vibrer à la fréquence ultra-stable de 32'768 Hz. Ces vibrations sont invisibles à l'œil nu."
              icon="💎"
              color="cyan"
            />
            <StepCard
              number="3"
              title="Division : Le Circuit Intégré"
              description="Le circuit électronique (puce) divise la fréquence 32'768 Hz exactement 15 fois (2^15) pour obtenir 1 Hz, soit 1 impulsion par seconde."
              icon="🔌"
              color="purple"
            />
            <StepCard
              number="4"
              title="Transmission : Le Moteur Pas-à-Pas"
              description="Chaque impulsion active un petit moteur électrique qui fait avancer les engrenages d'un cran, déplaçant ainsi les aiguilles sur le cadran."
              icon="⚙️"
              color="green"
            />
          </div>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Composants d'un Mouvement à Quartz</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Pile (battery)</span> : source d'énergie électrique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Quartz</span> : oscillateur encapsulé en diapason</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Circuit intégré</span> : diviseur de fréquence</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Moteur pas-à-pas</span> : conversion électrique/mécanique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Rouage</span> : transmission aux aiguilles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Trimmer</span> : ajustement fin de la fréquence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages et Inconvénients */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Quartz vs Mécanique
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard
              title="✅ Avantages du Quartz"
              points={[
                "Précision exceptionnelle : ±15 secondes par mois (vs ±5 sec/jour mécanique)",
                "Prix accessible : production de masse économique",
                "Entretien minimal : changement de pile tous les 2-5 ans",
                "Fiabilité : peu de pièces mobiles, moins d'usure",
                "Fonctions multiples : chronographe, alarme, rétroéclairage facilement intégrables",
                "Épaisseur réduite : mouvements ultra-plats possibles"
              ]}
              color="green"
            />
            <ComparisonCard
              title="⚠️ Inconvénients du Quartz"
              points={[
                "Âme mécanique absente : pas de vie mécanique",
                "Dépendance à la pile : nécessite changement régulier",
                "Valeur sentimentale faible : peu transmissible entre générations",
                "Prestige limité : perçu comme moins noble",
                "Durée de vie limitée : circuits électroniques vieillissent (20-30 ans)",
                "Réparabilité : composants électroniques parfois obsolètes"
              ]}
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* La Crise du Quartz */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            La Crise du Quartz (1970-1985)
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">La Révolution Seiko</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">25 décembre 1969</span>, Seiko présente l'Astron, la première montre-bracelet à quartz commerciale au monde. Prix : 450'000 yens (équivalent d'une petite voiture).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dans les années 1970, les fabricants japonais (Seiko, Citizen, Casio) inondent le marché de montres à quartz abordables, précises et fiables. L'industrie horlogère suisse, trop attachée à la tradition mécanique, est prise au dépourvu.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Entre 1970 et 1985, <span className="font-semibold text-gray-900 dark:text-gray-100">l'emploi horloger suisse chute de 90'000 à 30'000 personnes</span>. Des centaines de marques disparaissent. C'est la pire crise de l'histoire horlogère.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">💡 La Renaissance</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Nicolas Hayek sauve l'industrie en créant le groupe Swatch (1983) et en repositionnant l'horlogerie suisse sur deux segments :
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">1.</span>
                <span><span className="font-semibold">Entrée de gamme fun</span> : Swatch (quartz coloré, mode)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">2.</span>
                <span><span className="font-semibold">Luxe et prestige</span> : montres mécaniques haute horlogerie</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Production Mondiale */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Production Horlogère Mondiale Aujourd'hui
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">En Volume (quantité)</h3>
                <div className="space-y-3">
                  <ProductionBar label="Quartz" percentage="75" color="blue" />
                  <ProductionBar label="Mécanique" percentage="25" color="orange" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  3 montres sur 4 produites en Suisse sont à quartz
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">En Valeur (CHF)</h3>
                <div className="space-y-3">
                  <ProductionBar label="Mécanique" percentage="75" color="orange" />
                  <ProductionBar label="Quartz" percentage="25" color="blue" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Les montres mécaniques représentent 75% de la valeur exportée
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🔬 Découvrez d'Autres Technologies
            </h2>
            <p className="text-xl text-cyan-50 mb-8">
              Explorez les innovations modernes de l'horlogerie
            </p>
            <a
              href="/theorie"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour à la théorie
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

// Components (StatCard, StepCard, ComparisonCard, ProductionBar)
