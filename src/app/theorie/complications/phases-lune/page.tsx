// app/[locale]/theorie/complications/phases-lune/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phases de Lune - Complication Astronomique | HorloLearn",
  description: "Découvrez la complication phases de lune : cycle lunaire de 29,5 jours, disque à 59 dents, précision astronomique. Poésie mécanique au poignet.",
  keywords: "phases de lune, complication, cycle lunaire, disque lunaire, montre astronomique, 29.5 jours, 122 ans",
};

export default function PhasesLunePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie/complications"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux Complications
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Complication Astronomique
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🌙</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Les Phases de Lune
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mb-8">
            La complication phases de lune reproduit le cycle lunaire de 29,5 jours sur le cadran d'une montre. Entre poésie astronomique et prouesse mécanique, découvrez cette complication qui relie l'horlogerie à l'observation céleste millénaire.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="29.5" label="Jours (cycle lunaire)" />
            <StatCard number="59" label="Dents (disque)" />
            <StatCard number="122" label="Ans (précision avancée)" />
            <StatCard number="2" label="Lunes sur disque" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Cycle Lunaire
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              La <span className="font-semibold text-gray-900 dark:text-gray-100">complication phases de lune</span> affiche l'état actuel de la Lune telle qu'elle apparaît dans le ciel nocturne, à travers une ouverture (généralement semi-circulaire) située sur le cadran.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le cycle lunaire complet (de nouvelle lune à nouvelle lune) dure précisément <span className="font-semibold text-gray-900 dark:text-gray-100">29 jours, 12 heures, 44 minutes et 2,9 secondes</span>, soit environ <span className="font-semibold text-gray-900 dark:text-gray-100">29,53059 jours</span>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Depuis des millénaires, les civilisations observent la Lune pour organiser leurs calendriers, agriculture et navigation. Les horlogers ont perpétué cette tradition en miniaturisant ce spectacle céleste au poignet.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <PhaseCard phase="🌑" name="Nouvelle Lune" description="Lune invisible (entre Terre et Soleil)" />
            <PhaseCard phase="🌓" name="Premier Quartier" description="Moitié droite éclairée" />
            <PhaseCard phase="🌕" name="Pleine Lune" description="Entièrement éclairée" />
            <PhaseCard phase="🌗" name="Dernier Quartier" description="Moitié gauche éclairée" />
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement Mécanique
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Le Disque à 59 Dents</h3>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Derrière le cadran se trouve un <span className="font-semibold text-gray-900 dark:text-gray-100">disque décoré de deux lunes identiques</span>. Ce disque possède <span className="font-semibold text-gray-900 dark:text-gray-100">59 dents</span> et avance d'un cran toutes les 24 heures.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">🔢 Calcul Ingénieux</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">59 dents</span> ÷ 2 lunes = <span className="font-semibold">29,5 jours par cycle</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Avance quotidienne</span> : 1 dent = 1 jour</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Rotation complète</span> : 59 jours (2 cycles lunaires)</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Pourquoi <span className="font-semibold text-gray-900 dark:text-gray-100">deux lunes</span> sur le disque ? Pour qu'après 29,5 jours (première lune), la seconde lune apparaisse automatiquement dans l'ouverture, assurant une continuité visuelle parfaite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">⚙️ Mécanisme</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Roue des heures</span> : entraîne la roue intermédiaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Roue intermédiaire</span> : démultiplication 24h</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Disque 59 dents</span> : rotation lente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Affichage</span> : ouverture découpée</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">📊 Précision</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Système 59 dents</span> : erreur 1 jour/2,5 ans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Système 135 dents</span> : erreur 1 jour/122 ans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Correction manuelle</span> : poussoir latéral</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Réglage */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Réglage des Phases de Lune
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Procédure de Réglage</h3>
            
            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-3 min-w-[30px]">1.</span>
                <span><span className="font-semibold">Consulter un calendrier lunaire</span> pour connaître la date de la dernière pleine lune</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-3 min-w-[30px]">2.</span>
                <span><span className="font-semibold">Appuyer sur le correcteur</span> (petit poussoir latéral) jusqu'à afficher la pleine lune</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-3 min-w-[30px]">3.</span>
                <span><span className="font-semibold">Compter les jours écoulés</span> depuis la dernière pleine lune jusqu'à aujourd'hui</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-3 min-w-[30px]">4.</span>
                <span><span className="font-semibold">Appuyer autant de fois</span> sur le correcteur que de jours écoulés</span>
              </li>
            </ol>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-xl p-4 mt-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-semibold">💡 Astuce :</span> Certaines montres à quartz programmées automatiquement ne nécessitent aucun réglage manuel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufactures */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Phases de Lune d'Exception
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ManufactureCard
              name="A. Lange & Söhne"
              achievement="Précision 122,6 ans"
              specialty="Mécanisme à 135 dents : 99,998% de précision. Correction nécessaire après 122 ans seulement."
            />
            <ManufactureCard
              name="Jaeger-LeCoultre"
              achievement="Master Ultra Thin Moon"
              specialty="Complication phases de lune ultra-plate intégrée dans un mouvement de 4,9mm d'épaisseur."
            />
            <ManufactureCard
              name="Patek Philippe"
              achievement="Phases de lune boréale"
              specialty="Affichage double hémisphère : phases de lune visibles depuis l'hémisphère Nord ET Sud."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚙️ Explorez les Autres Complications
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Découvrez le Quantième, le Chronographe et le Tourbillon
            </p>
            <a
              href="/theorie/complications"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour aux Complications
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

function PhaseCard({ phase, name, description }: { phase: string; name: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 text-center">
      <div className="text-4xl mb-2">{phase}</div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function ManufactureCard({ name, achievement, specialty }: { name: string; achievement: string; specialty: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{achievement}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{specialty}</p>
    </div>
  );
}
