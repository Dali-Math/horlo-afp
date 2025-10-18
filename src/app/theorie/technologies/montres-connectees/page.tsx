// app/[locale]/theorie/technologies/montres-connectees/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Montres Connectées - Smartwatch | HorloLearn",
  description: "Découvrez les montres connectées : capteurs biométriques, GPS, autonomie, différences avec mécanique. Apple Watch, Samsung Galaxy, TAG Heuer Connected.",
  keywords: "montre connectée, smartwatch, Apple Watch, capteurs, GPS, cardiofréquencemètre, autonomie, TAG Heuer Connected",
};

export default function MontresConnecteesPage() {
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
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-indigo-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Smartwatch & Wearables
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⌚</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Les Montres Connectées
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-purple-50 leading-relaxed max-w-4xl mb-8">
            Les montres connectées fusionnent horlogerie et électronique : capteurs biométriques, GPS, notifications, applications. Entre innovation technologique et obsolescence programmée, découvrez cette révolution numérique au poignet.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="2015" label="Apple Watch lancée" />
            <StatCard number="1-2j" label="Autonomie typique" />
            <StatCard number="7+" label="Capteurs intégrés" />
            <StatCard number="5ans" label="Obsolescence" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Qu'est-ce qu'une Montre Connectée ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Une <span className="font-semibold text-gray-900 dark:text-gray-100">montre connectée</span> (ou smartwatch) est un ordinateur miniaturisé porté au poignet, capable de se connecter à un smartphone via Bluetooth, WiFi ou réseau cellulaire (4G/5G)[web:247][web:249].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Au-delà de l'affichage de l'heure, elle intègre de multiples <span className="font-semibold text-gray-900 dark:text-gray-100">capteurs biométriques</span> (cardiofréquencemètre, oxymètre, accéléromètre), un GPS, des applications, et permet de recevoir notifications, appels et messages directement sur son écran tactile[web:245][web:249].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Lancée en <span className="font-semibold text-gray-900 dark:text-gray-100">avril 2015</span>, l'Apple Watch a popularisé la catégorie et domine aujourd'hui le marché mondial avec plus de 50% des parts de marché[web:250][web:253].
            </p>
          </div>
        </div>
      </section>

      {/* Capteurs */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Capteurs et Composants
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SensorCard
              icon="❤️"
              title="Cardiofréquencemètre (PPG)"
              description="LED verte émettant de la lumière sur le poignet. Capteur optique détectant la lumière réfléchie par le sang pour mesurer la fréquence cardiaque 24h/24."
              tech="Photopléthysmographie optique"
            />
            <SensorCard
              icon="🫁"
              title="Oxymètre (SpO₂)"
              description="Mesure du taux d'oxygène dans le sang (saturation). LED rouge et infrarouge analysant l'absorption lumineuse par l'hémoglobine."
              tech="Spectroscopie optique"
            />
            <SensorCard
              icon="🏃"
              title="Accéléromètre"
              description="Détecte les mouvements et l'accélération sur 3 axes. Compte les pas, reconnaît le type d'activité (marche, course, vélo), détecte les chutes."
              tech="MEMS (systèmes micro-électromécaniques)"
            />
            <SensorCard
              icon="🧭"
              title="Gyroscope"
              description="Mesure l'orientation et la rotation du poignet. Complète l'accéléromètre pour une détection précise des mouvements dans l'espace."
              tech="Capteur inertiel 3 axes"
            />
            <SensorCard
              icon="📍"
              title="GPS + GLONASS"
              description="Géolocalisation satellite pour tracer les parcours extérieurs (course, vélo, randonnée). Calcule distance, vitesse, altitude."
              tech="Puce GPS multi-constellations"
            />
            <SensorCard
              icon="🌡️"
              title="Capteur Température"
              description="Mesure la température cutanée du poignet. Permet le suivi du cycle menstruel, détection de fièvre, analyse du sommeil."
              tech="Thermistance haute précision"
            />
          </div>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Autres Composants Essentiels</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Processeur</span> : SoC ARM (Apple S9, Snapdragon Wear)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Écran</span> : OLED/AMOLED tactile (Always-On Display)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Mémoire</span> : 1-2 GB RAM, 8-64 GB stockage</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Connectivité</span> : Bluetooth 5.x, WiFi, LTE (eSIM)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Batterie</span> : Li-ion 200-500 mAh</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Haut-parleur/Micro</span> : appels, Siri/Google Assistant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomie */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Autonomie et Gestion Énergétique
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              L'autonomie est le <span className="font-semibold text-gray-900 dark:text-gray-100">talon d'Achille</span> des montres connectées. Contrairement aux montres mécaniques (autonomie infinie avec remontage) ou quartz (2-5 ans), les smartwatches nécessitent une recharge quotidienne ou biquotidienne[web:250][web:253].
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <BatteryCard
                brand="Apple Watch"
                autonomy="18-24h"
                details="Series 11 : 24h usage normal + 6h suivi sommeil. Mode économie : 38h[web:253]"
                color="blue"
              />
              <BatteryCard
                brand="Samsung Galaxy Watch"
                autonomy="2-3 jours"
                details="40mm : 2j / 44mm : 3j. Dépend fortement de l'Always-On Display et GPS"
                color="purple"
              />
              <BatteryCard
                brand="Garmin (sportives)"
                autonomy="5-14 jours"
                details="Mode smartwatch : 5-7j / Mode GPS : 20-30h. Optimisées pour sport outdoor"
                color="green"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔋</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Facteurs Impactant l'Autonomie</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><span className="font-semibold">Always-On Display</span> : affichage permanent = consommation +30-40%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><span className="font-semibold">GPS actif</span> : sports outdoor = batterie divisée par 3-4</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><span className="font-semibold">Luminosité écran</span> : haute luminosité = décharge rapide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><span className="font-semibold">Applications tierces</span> : notifications, apps actives = surconsommation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Différences Mécanique */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Montres Connectées vs Montres Mécaniques
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard
              title="⌚ Avantages Smartwatch"
              points={[
                "Suivi santé temps réel (cardio, SpO₂, sommeil, stress)",
                "Notifications smartphone (appels, SMS, apps)",
                "GPS intégré : navigation, parcours sportifs",
                "Paiement sans contact (Apple Pay, Google Pay)",
                "Musique embarquée (streaming, stockage local)",
                "Personnalisation infinie (cadrans, widgets)"
              ]}
              color="green"
            />
            <ComparisonCard
              title="⚠️ Inconvénients Smartwatch"
              points={[
                "Obsolescence programmée : 3-5 ans maximum",
                "Autonomie ridicule : recharge quotidienne obligatoire",
                "Valeur nulle après 5 ans : composants obsolètes",
                "Réparation impossible : tout est collé/soudé",
                "Dépendance smartphone : inutile sans téléphone",
                "Âme absente : objet jetable sans patrimoine"
              ]}
              color="red"
            />
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Principales Marques de Smartwatches
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BrandCard
              name="Apple Watch"
              description="Leader absolu (50%+ du marché). Écosystème iOS parfait. Series 11, Ultra 2, SE 3."
              icon="🍎"
            />
            <BrandCard
              name="Samsung Galaxy Watch"
              description="Android/Wear OS. Design premium, autonomie correcte. Galaxy Watch 7, Watch Ultra."
              icon="📱"
            />
            <BrandCard
              name="Garmin"
              description="Spécialiste sport outdoor. Autonomie record (14j+). Fenix, Forerunner, Epix."
              icon="🏔️"
            />
            <BrandCard
              name="TAG Heuer Connected"
              description="Luxe suisse connecté. Calibre E4, boîtier 42-45mm. Design sport-chic[web:251][web:254]."
              icon="🇨🇭"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🔬 Explorez d'Autres Technologies
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Découvrez les Mouvements à Quartz et les Matériaux Innovants
            </p>
            <a
              href="/theorie/technologies"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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

// Components (StatCard, SensorCard, BatteryCard, ComparisonCard, BrandCard)
