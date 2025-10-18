// app/[locale]/theorie/technologies/mouvements-quartz/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mouvements à Quartz - Révolution Piézoélectrique | HorloLearn",
  description: "Découvrez les mouvements à quartz : précision mensuelle ±15s, oscillateur 32'768 Hz, crise horlogère 1970s. Révolution technologique de l'horlogerie.",
  keywords: "montre quartz, piézoélectrique, 32768 Hz, Seiko, Grand Seiko, crise horlogère, révolution quartz",
};

export default function MouvementsQuartzPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie/technologies"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux Technologies
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-cyan-100 text-cyan-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Révolution Électronique
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⚡</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Mouvements à Quartz
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-cyan-50 leading-relaxed max-w-4xl mb-8">
            Les mouvements à quartz ont révolutionné l'horlogerie dans les années 1970 grâce à la précision exceptionnelle du cristal de quartz piézoélectrique. Oscillant à 32'768 Hz, ils offrent une précision mensuelle de ±15 secondes, détrônant temporairement la suprématie de l'horlogerie mécanique suisse.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="32'768" label="Hz (vibrations/sec)" />
            <StatCard number="±15s" label="Précision mensuelle" />
            <StatCard number="2-5" label="Ans (durée pile)" />
            <StatCard number="75%" label="Production mondiale" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Qu'est-ce qu'un Mouvement à Quartz ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Un <span className="font-semibold text-gray-900 dark:text-gray-100">mouvement à quartz</span> utilise les propriétés piézoélectriques d'un cristal de quartz pour générer des oscillations électroniques ultra-précises à une fréquence de <span className="font-semibold text-gray-900 dark:text-gray-100">32'768 Hz</span> (2¹⁵).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Alimenté par une pile bouton (lithium), un circuit électronique compte ces oscillations et envoie des impulsions électriques à un moteur pas-à-pas qui fait avancer les aiguilles. Cette technologie offre une <span className="font-semibold text-gray-900 dark:text-gray-100">précision 100 fois supérieure</span> aux montres mécaniques traditionnelles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Inventé par Seiko et commercialisé en 1969 avec l'Astron, le quartz a déclenché la "crise du quartz" qui a failli anéantir l'horlogerie mécanique suisse dans les années 1970-80.
            </p>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement du Quartz Piézoélectrique
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Effet Piézoélectrique</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le <span className="font-semibold text-gray-900 dark:text-gray-100">quartz</span> (dioxyde de silicium SiO₂) possède une propriété physique unique : lorsqu'on lui applique une tension électrique, il se déforme. Inversement, si on le comprime, il génère une tension électrique.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Un circuit électronique alimenté par pile crée un champ électrique qui fait vibrer le cristal de quartz à sa <span className="font-semibold text-gray-900 dark:text-gray-100">fréquence de résonance naturelle : 32'768 Hz</span> (oscillations par seconde).
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Circuit Électronique</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Oscillateur</span> : fait vibrer le quartz à 32'768 Hz</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Diviseur de fréquence</span> : divise par 32'768 pour obtenir 1 Hz (1 impulsion/seconde)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Moteur pas-à-pas</span> : reçoit impulsion et fait avancer aiguille des secondes d'un cran</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Démultiplication</span> : engrenages pour minutes et heures</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-l-4 border-cyan-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">🔢 Pourquoi 32'768 Hz ?</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              32'768 = 2¹⁵. Cette puissance de 2 permet de diviser facilement par 15 étages de diviseurs binaires pour obtenir exactement 1 Hz (1 impulsion par seconde). Fréquence optimale entre précision et consommation énergétique.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages/Inconvénients */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Quartz vs Mécanique
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard
              title="✅ Avantages Quartz"
              points={[
                "Précision exceptionnelle : ±15 secondes/mois",
                "Prix accessible : 50-500 CHF pour quartz de qualité",
                "Entretien minimal : changement pile tous les 2-5 ans",
                "Robustesse : résiste aux chocs et positions",
                "Léger : peu de composants mécaniques",
                "Démarrage instantané après arrêt"
              ]}
              color="green"
            />
            <ComparisonCard
              title="⚠️ Inconvénients Quartz"
              points={[
                "Dépendance pile : arrêt brutal quand pile épuisée",
                "Valeur sentimentale faible : production de masse",
                "Pas de mouvement visible : absence de mécanique vivante",
                "Recyclage pile : impact environnemental",
                "Réparation électronique complexe et coûteuse",
                "Âme absente : pas de savoir-faire artisanal transmis"
              ]}
              color="red"
            />
          </div>
        </div>
      </section>

      {/* Crise du Quartz */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            La Crise du Quartz (1970-1980)
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1969</span>, Seiko commercialise l'Astron, première montre-bracelet à quartz au monde. Son prix astronomique (1'250 USD, équivalent Toyota Corolla) n'empêche pas son succès. La précision +/-5 secondes/mois révolutionne l'horlogerie.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dans les années 1970, la production de masse fait chuter les prix. Des montres quartz précises à 20 USD inondent le marché. L'horlogerie suisse, dominée par le mécanique coûteux, s'effondre : <span className="font-semibold text-gray-900 dark:text-gray-100">50'000 emplois perdus</span>, nombreuses faillites.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Paradoxalement, cette crise force l'horlogerie suisse à se repositionner sur le <span className="font-semibold text-gray-900 dark:text-gray-100">luxe et l'émotion</span> plutôt que la précision pure. Renaissance dans les années 1990 avec retour du mécanique haut de gamme.
            </p>
          </div>
        </div>
      </section>

      {/* Grand Seiko */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Grand Seiko : L'Excellence Quartz Japonaise
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Calibre 9F : Perfection Mécanique</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Lancé en 1993, le calibre <span className="font-semibold text-gray-900 dark:text-gray-100">9F</span> de Grand Seiko redéfinit le quartz haut de gamme. Contrairement au quartz standard, chaque composant est assemblé et réglé à la main par des horlogers experts.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span><span className="font-semibold">Précision ±10 sec/an</span> : 120x plus précis que mécanique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span><span className="font-semibold">Démarrage instantané</span> : aiguille saute immédiatement à 12h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span><span className="font-semibold">Aiguille des secondes morte</span> : battement par seconde sans tremblement</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Finitions Haute Horlogerie</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span>Ponts perlés et anglés main</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span>Rotor moteur ajusté individuellement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span>Double quartz vieilli 3 mois pour stabilité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span>Assemblage 100% manuel (non automatisé)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                    <span>Pile durée 50 ans théorique (autonomie record)</span>
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
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🔬 Explorez d'Autres Technologies
            </h2>
            <p className="text-xl text-cyan-50 mb-8">
              Découvrez les Montres Connectées et les Matériaux Innovants
            </p>
            <a
              href="/theorie/technologies"
              className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour aux Technologies
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

interface ComparisonCardProps {
  title: string;
  points: string[];
  color: string;
}

function ComparisonCard({ title, points, color }: ComparisonCardProps) {
  const colorClasses = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  return (
    <div className={`border rounded-xl p-6 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start">
            <span className={color === 'green' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} style={{marginRight: '8px'}}>
              •
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
