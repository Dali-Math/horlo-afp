// app/[locale]/theorie/rouage/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Transmission Cinématique - Rouage | HorloLearn",
  description: "Le rouage est le cœur de la transmission mécanique dans une montre. Découvrez sa composition, son fonctionnement et les rapports de transmission qui animent les aiguilles avec précision.",
  keywords: "rouage, transmission cinématique, train d'engrenages, horlogerie, montre mécanique, roues dentées, pignons",
};

export default function RouagePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header avec breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la théorie
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          {/* Badge catégorie */}
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
              Théorie de base
            </span>
          </div>

          {/* Titre et description */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            La Transmission Cinématique
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl">
            Le rouage est le cœur de la transmission mécanique dans une montre. Il transforme l'énergie du barillet en un mouvement précis et régulé qui anime les aiguilles.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard number="4" label="Mobiles principaux" color="blue" />
            <StatCard number="95%" label="Efficacité" color="green" />
            <StatCard number="1µm" label="Tolérance" color="purple" />
            <StatCard number="36K" label="Alternances/h" color="orange" />
          </div>
        </div>
      </section>

      {/* Définition et Fonction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Définition et Fonction
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Système de Transmission de l'Énergie</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900">rouage</span> (ou train d'engrenages) est l'ensemble des roues dentées et pignons qui transmettent l'énergie du barillet vers l'échappement dans une montre mécanique. Il constitue le <span className="font-semibold text-gray-900">système de transmission cinématique central</span> du mouvement horloger.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le rouage transforme le flux d'énergie continu provenant du ressort moteur en un mouvement régulé et précis. Chaque engrenage est conçu et apparié avec une précision micrométrique pour réguler le mouvement et la vitesse de transmission.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le train de rouage commence au niveau du ressort dans le barillet et se termine à l'échappement. Chaque roue du train est reliée à une autre par l'intermédiaire de pignons, ce qui permet de <span className="font-semibold text-gray-900">modifier progressivement la vitesse de transfert</span> de l'énergie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fonction Principale</h4>
                <p className="text-gray-700 leading-relaxed">
                  Le rouage assure la <span className="font-semibold text-gray-900">transmission du couple moteur</span> depuis le barillet jusqu'à l'échappement, tout en démultipliant la vitesse pour atteindre la fréquence d'oscillation nécessaire au balancier-spiral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le Rouage de Finissage */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Le Rouage de Finissage
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rouage Multiplicatif</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900">rouage de finissage</span> est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique. Cette accélération progressive est essentielle pour atteindre la <span className="font-semibold text-gray-900">fréquence d'oscillation nécessaire</span> au balancier.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le rouage de finissage divise l'unité de temps donnée par l'oscillateur (ensemble balancier-spiral-échappement) pour créer les indications des heures, minutes et secondes. Il est composé de plusieurs mobiles successifs qui multiplient la vitesse de rotation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Caractéristiques</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Multiplication de vitesse</span> : chaque roue tourne plus vite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Démultiplication du couple</span> : force réduite progressivement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Précision accrue</span> : réduction des erreurs cumulées</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Performances</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Fréquence élevée</span> : jusqu'à 5 Hz (36 000 alt/h)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Efficacité optimale</span> : rendement &gt; 95%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Durabilité</span> : usure minimale sur décennies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
            <p className="text-gray-700 text-sm leading-relaxed italic">
              L'efficience du train de rouage permet aux mouvements modernes de fonctionner à des fréquences élevées tout en offrant un remarquable niveau de performance et de réserve de marche.
            </p>
          </div>
        </div>
      </section>

      {/* Composition du Train de Rouage */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Composition du Train de Rouage
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-4xl">
            Un train de rouage standard se compose généralement de <span className="font-semibold text-gray-900">quatre mobiles principaux</span>. Chaque mobile est constitué d'une roue dentée et d'un pignon qui engrène avec la roue suivante.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <MobileCard
              icon="⚙️"
              number="1"
              title="Grand Mobile (Roue de Centre)"
              description="Fait 1 tour par heure, porte l'aiguille des minutes. C'est le mobile le plus lent du rouage de finissage."
              color="blue"
            />
            <MobileCard
              icon="⚙️"
              number="2"
              title="Moyen Mobile (Roue Moyenne)"
              description="Mobile intermédiaire de transmission, assure la démultiplication entre la roue de centre et la roue de secondes."
              color="green"
            />
            <MobileCard
              icon="⚙️"
              number="3"
              title="Mobile de Seconde"
              description="Fait 1 tour par minute, porte l'aiguille des secondes (trotteuse). Vitesse de rotation : 1 tr/min."
              color="purple"
            />
            <MobileCard
              icon="⚙️"
              number="4"
              title="Mobile d'Échappement"
              description="Transmet l'énergie à l'ancre de l'échappement. Tourne à haute fréquence (240-360 tr/h selon calibre)."
              color="orange"
            />
          </div>

          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <p className="text-gray-700 leading-relaxed">
              Dans le rouage, un engrenage se compose d'une roue dont les dents pénètrent entre les dents (appelées ailes) d'un pignon. Cette interaction mécanique permet une <span className="font-semibold text-gray-900">transmission précise</span> du mouvement et du couple moteur.
            </p>
          </div>
        </div>
      </section>

      {/* Rapport de Transmission */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Rapport de Transmission
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Dans un train d'engrenages simple, le <span className="font-semibold text-gray-900">rapport de transmission</span> est égal au produit des nombres de dents des roues menantes divisé par celui des roues menées. Cette formule mathématique permet de calculer précisément les vitesses de rotation.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Formule du Rapport de Transmission</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 font-mono text-center border border-gray-200">
              <div className="text-2xl text-gray-900 mb-4">
                ω<sub className="text-sm">sortie</sub> / ω<sub className="text-sm">entrée</sub> = (∏ Z<sub className="text-sm">menantes</sub>) / (∏ Z<sub className="text-sm">menées</sub>)
              </div>
            </div>

            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-start">
                <span className="font-bold text-gray-900 mr-3 min-w-[100px]">ω (oméga)</span>
                <span>Vitesse angulaire (rad/s ou tr/min)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-gray-900 mr-3 min-w-[100px]">Z</span>
                <span>Nombre de dents de la roue</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-gray-900 mr-3 min-w-[100px]">∏ (produit)</span>
                <span>Multiplication successive</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Exemple Pratique</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Pour une roue de 80 dents engrenant avec un pignon de 10 dents :
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Rapport = 80 / 10 = <span className="font-bold text-gray-900">8</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Le pignon tourne <span className="font-bold text-gray-900">8 fois plus vite</span> que la roue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Le couple est <span className="font-bold text-gray-900">divisé par 8</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mt-6 italic">
            Ce calcul permet aux horlogers de concevoir des trains de rouage qui produisent exactement les rapports de vitesse nécessaires pour une mesure précise du temps. La précision de ces engrenages est cruciale pour la fiabilité chronométrique de la montre.
          </p>
        </div>
      </section>

      {/* Rouage et Minuterie */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Rouage et Minuterie
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Le <span className="font-semibold text-gray-900">rouage des minutes</span> est un système spécifique qui transmet la rotation du pignon des minutes à l'aiguille des heures. Ce mécanisme assure que l'aiguille des heures tourne <span className="font-semibold text-gray-900">12 fois plus lentement</span> que celle des minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🕐</span>
                <h3 className="text-xl font-bold text-gray-900">Rapport Horaire</h3>
              </div>
              <p className="text-gray-700 mb-4">La minuterie assure le rapport 1:12 entre minutes et heures :</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Chaussée</span> : 1 tour/heure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Roue des heures</span> : 1 tour/12 heures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">Pignon de minuterie</span> : transmission intermédiaire</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-bold text-gray-900">Complications</h3>
              </div>
              <p className="text-gray-700 mb-4">Le rouage transmet aussi l'énergie vers :</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Quantième</span> : affichage de la date</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Phases de lune</span> : cycle lunaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><span className="font-semibold">Chronographe</span> : fonction de chronométrage</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            La minuterie est un ensemble d'engrenages situé côté cadran qui permet l'affichage des heures. Elle reçoit le mouvement de la roue de centre (qui fait un tour par heure) et le démultiplie pour actionner l'aiguille des heures. Les rouages transmettent le couple moteur et le mouvement vers d'autres éléments du mécanisme, comme les complications horlogères. Cette transmission doit être à la fois <span className="font-semibold text-gray-900">efficace et précise</span> pour garantir le bon fonctionnement de toutes les fonctions.
          </p>
        </div>
      </section>

      {/* Précision et Qualité */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Précision et Qualité
          </h2>

          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            La qualité du rouage est déterminante pour la <span className="font-semibold text-gray-900">précision et la fiabilité</span> d'une montre mécanique. Chaque engrenage doit être usiné avec une tolérance de l'ordre du <span className="font-semibold text-gray-900">micromètre (µm)</span> pour assurer une transmission optimale.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <QualityCard
              title="Tolérance"
              value="< 1 µm"
              description="Précision d'usinage requise"
              color="blue"
            />
            <QualityCard
              title="Rendement"
              value="> 95%"
              description="Efficacité de transmission"
              color="green"
            />
            <QualityCard
              title="Durabilité"
              value="10-20 ans"
              description="Durée de vie avec entretien"
              color="purple"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              Le mouvement final des engrenages est converti en un <span className="font-semibold text-gray-900">tic-tac régulier</span> de la montre qui donne une heure précise. Toute imperfection dans la conception ou la fabrication du rouage peut entraîner des variations de marche et affecter la précision chronométrique.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🇨🇭</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation Suisse</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les manufactures horlogères suisses investissent massivement dans la recherche et le développement de nouveaux matériaux et designs pour améliorer l'efficacité des trains de rouage. L'utilisation de nouveaux alliages, de traitements de surface et de géométries optimisées permet de réduire les frottements et d'augmenter la réserve de marche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Quiz */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📝 Testez vos connaissances
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Maîtrisez-vous les concepts du train de rouage et de la transmission cinématique ?
            </p>
            <a
              href="/quiz/rouage"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Commencer le quiz
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

// Composant Stat Card
interface StatCardProps {
  number: string;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ number, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-4 transition-all hover:shadow-md`}>
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

// Composant Mobile Card
interface MobileCardProps {
  icon: string;
  number: string;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function MobileCard({ icon, number, title, description, color }: MobileCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
  };

  const badgeClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4 mb-3">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-bold ${badgeClasses[color]} px-2 py-1 rounded`}>{number}</span>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Composant Quality Card
interface QualityCardProps {
  title: string;
  value: string;
  description: string;
  color: 'blue' | 'green' | 'purple';
}

function QualityCard({ title, value, description, color }: QualityCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6 text-center transition-all hover:shadow-md`}>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <div className="text-4xl font-bold mb-3">{value}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
