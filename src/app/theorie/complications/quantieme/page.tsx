// app/[locale]/theorie/complications/quantieme/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Quantième - Complication Calendrier | HorloLearn",
  description: "Découvrez la complication de quantième : du simple affichage de la date au quantième perpétuel sophistiqué. Mécanismes, came à 48 crans et cycle de 4 ans.",
  keywords: "quantième, calendrier perpétuel, date, montre mécanique, complication horlogère, came, année bissextile",
};

export default function QuantiemePage() {
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
      <section className="bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Complication Horlogère
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">📅</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Le Quantième
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            Le quantième est une complication horlogère affichant le jour du mois. Du simple affichage de date au quantième perpétuel ultra-sophistiqué, découvrez cette mémoire mécanique fascinante qui gère automatiquement les mois de 28, 29, 30 et 31 jours.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard number="48" label="Crans (came 4 ans)" color="purple" />
            <StatCard number="1461" label="Jours de cycle" color="blue" />
            <StatCard number="2100" label="Prochaine correction" color="green" />
            <StatCard number="400" label="Ans (cycles avancés)" color="orange" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Qu'est-ce que le Quantième ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">quantième</span> désigne l'indication de la date (numéro du jour dans le mois) affichée sur une montre, soit par un disque rotatif visible à travers un guichet, soit par une aiguille dédiée.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cette complication horlogère transforme une montre en véritable <span className="font-semibold text-gray-900 dark:text-gray-100">calendrier mécanique</span>. Les montres-quantièmes ont pour mission de donner automatiquement la date en même temps que l'heure.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le niveau de sophistication varie énormément : du quantième simple nécessitant 5 corrections par an au quantième perpétuel qui gère automatiquement les années bissextiles pendant des siècles.
            </p>
          </div>
        </div>
      </section>

      {/* Types de Quantième */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Les Types de Quantième
          </h2>

          <div className="space-y-6">
            <TypeCard
              icon="1️⃣"
              title="Quantième Simple"
              description="Affiche les dates de 1 à 31. Nécessite une correction manuelle 5 fois par an : fin février et à la fin de chaque mois de 30 jours (avril, juin, septembre, novembre)."
              complexity="Faible"
              color="blue"
              correction="5x/an"
            />
            <TypeCard
              icon="📆"
              title="Quantième Annuel (Semi-Perpétuel)"
              description="Distingue automatiquement les mois de 30 et 31 jours. Seule une correction manuelle est nécessaire à la fin du mois de février pour passer au 1er mars."
              complexity="Moyenne"
              color="green"
              correction="1x/an"
            />
            <TypeCard
              icon="♾️"
              title="Quantième Perpétuel"
              description="Gère automatiquement tous les mois (28, 29, 30, 31 jours) ET les années bissextiles grâce à une came programmée sur 4 ans. Correction nécessaire seulement en 2100 (année séculaire non bissextile)."
              complexity="Très élevée"
              color="purple"
              correction="2100"
            />
            <TypeCard
              icon="🌌"
              title="Quantième Séculaire (400 ans)"
              description="Prend en compte la règle complexe des siècles non bissextiles (2100, 2200, 2300 ne sont PAS bissextiles, mais 2000 et 2400 le sont). Cycle complet de 400 ans sans aucune correction."
              complexity="Extrême"
              color="orange"
              correction="Jamais (400 ans)"
            />
          </div>
        </div>
      </section>

      {/* Fonctionnement Perpétuel */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement du Quantième Perpétuel
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">La Came à 48 Crans</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Au cœur du quantième perpétuel se trouve une <span className="font-semibold text-gray-900 dark:text-gray-100">came à 48 crans</span> (ou 48 mois) qui effectue une rotation complète tous les 4 ans, soit un cycle de <span className="font-semibold text-gray-900 dark:text-gray-100">1461 jours</span>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cette came possède des <span className="font-semibold text-gray-900 dark:text-gray-100">creusures de différentes profondeurs</span> détectées par un doigt palpeur. Plus la creusure est profonde, plus tôt le mécanisme passera au premier jour du mois suivant.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">🔍 Profondeur des Crans</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Aucun creux</span> : mois de 31 jours (janvier, mars, mai, juillet, août, octobre, décembre)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Creux peu profond</span> : mois de 30 jours (avril, juin, septembre, novembre)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Creux profond</span> : février 28 jours (années normales)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Creux intermédiaire</span> : 29 février (année bissextile tous les 4 ans)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Composants Principaux</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Roue-calendrier</span> : came à 48 mois (mémoire 4 ans)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Grand levier</span> : chef d'orchestre du mécanisme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Roues d'affichage</span> : date, jour, mois, année bissextile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Leviers spécifiques</span> : coordination ultra-précise</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Complexité Technique</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">200-400 pièces</span> : composants supplémentaires ajoutés au mouvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Plusieurs mois</span> : temps d'assemblage et réglage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Tolérances micrométriques</span> : précision extrême requise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Savoir-faire rare</span> : horlogers hautement spécialisés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grande Date */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            La Grande Date
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">🔢</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Affichage Surdimensionné</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  La <span className="font-semibold text-gray-900 dark:text-gray-100">grande date</span> utilise deux disques superposés pour afficher la date avec des chiffres beaucoup plus grands et lisibles qu'un quantième classique.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le disque des unités (0-9) et celui des dizaines (0-3) se combinent pour former la date. Ce système, popularisé par A. Lange & Söhne, offre une lisibilité exceptionnelle mais nécessite un mécanisme d'avancement instantané très puissant car les deux disques doivent changer simultanément à minuit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Réglage et Entretien */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Réglage et Entretien
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-red-500 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Zone Interdite de Correction</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  <span className="font-semibold">Ne JAMAIS corriger le quantième entre 22h et 2h du matin</span>. Le mécanisme est en plein changement de date et toute intervention peut endommager gravement les roues, leviers et dents du calendrier.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Si une correction est nécessaire, avancer les aiguilles jusqu'à 6h du matin, puis effectuer le réglage du calendrier en toute sécurité.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">📅 Mise en Route</h4>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Positionner les aiguilles sur 6h du matin</li>
                <li>Régler le jour et le mois (si affichés)</li>
                <li>Régler l'année et l'année bissextile (QP)</li>
                <li>Régler la date du quantième</li>
                <li>Avancer les aiguilles jusqu'à l'heure actuelle</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">🔧 Maintenance</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Révision</span> : tous les 5-7 ans recommandés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Lubrification</span> : essentielle pour fluidité du mécanisme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Port régulier</span> : évite l'arrêt et le grippage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Manufactures */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Manufactures de Référence
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ManufactureCard
              name="Patek Philippe"
              achievement="Première montre-bracelet QP (1925)"
              specialty="Maître absolu du quantième perpétuel depuis près d'un siècle"
            />
            <ManufactureCard
              name="A. Lange & Söhne"
              achievement="Grande date iconique"
              specialty="Système de came à 48 crans visible côté cadran"
            />
            <ManufactureCard
              name="IWC Schaffhausen"
              achievement="Quantième perpétuel modulaire"
              specialty="Système Da Vinci (1985) facilite l'entretien"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚙️ Explorez les Autres Complications
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Découvrez le Chronographe, les Phases de Lune et le Tourbillon
            </p>
            <a
              href="/theorie/complications"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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

// Components (StatCard, TypeCard, ManufactureCard - identiques aux pages précédentes)
