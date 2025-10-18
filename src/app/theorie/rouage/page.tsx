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
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header avec breadcrumb */}
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

      {/* Hero Section */}
      <section className="bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          {/* Badge catégorie */}
          <div className="mb-6">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Théorie de base
            </span>
          </div>

          {/* Titre avec roue animée */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <svg 
                className="w-16 h-16 md:w-20 md:h-20 text-blue-600 dark:text-orange-400 animate-spin-slow" 
                viewBox="0 0 100 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <GearIcon size={100} teeth={8} />
              </svg>
              <div className="absolute inset-0 bg-blue-400/20 dark:bg-orange-400/20 blur-xl rounded-full"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                La Transmission Cinématique
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Définition et Fonction
          </h2>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Système de Transmission de l'Énergie</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">rouage</span> (ou train d'engrenages) est l'ensemble des roues dentées et pignons qui transmettent l'énergie du barillet vers l'échappement dans une montre mécanique. Il constitue le <span className="font-semibold text-gray-900 dark:text-gray-100">système de transmission cinématique central</span> du mouvement horloger.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le rouage transforme le flux d'énergie continu provenant du ressort moteur en un mouvement régulé et précis. Chaque engrenage est conçu et apparié avec une précision micrométrique pour réguler le mouvement et la vitesse de transmission.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le train de rouage commence au niveau du ressort dans le barillet et se termine à l'échappement. Chaque roue du train est reliée à une autre par l'intermédiaire de pignons, ce qui permet de <span className="font-semibold text-gray-900 dark:text-gray-100">modifier progressivement la vitesse de transfert</span> de l'énergie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Fonction Principale</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le rouage assure la <span className="font-semibold text-gray-900 dark:text-gray-100">transmission du couple moteur</span> depuis le barillet jusqu'à l'échappement, tout en démultipliant la vitesse pour atteindre la fréquence d'oscillation nécessaire au balancier-spiral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le Rouage de Finissage */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Rouage de Finissage
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Rouage Multiplicatif</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">rouage de finissage</span> est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique. Cette accélération progressive est essentielle pour atteindre la <span className="font-semibold text-gray-900 dark:text-gray-100">fréquence d'oscillation nécessaire</span> au balancier.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le rouage de finissage divise l'unité de temps donnée par l'oscillateur (ensemble balancier-spiral-échappement) pour créer les indications des heures, minutes et secondes. Il est composé de plusieurs mobiles successifs qui multiplient la vitesse de rotation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Caractéristiques</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Multiplication de vitesse</span> : chaque roue tourne plus vite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Démultiplication du couple</span> : force réduite progressivement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Précision accrue</span> : réduction des erreurs cumulées</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Performances</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Fréquence élevée</span> : jusqu'à 5 Hz (36 000 alt/h)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Efficacité optimale</span> : rendement &gt; 95%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span><span className="font-semibold">Durabilité</span> : usure minimale sur décennies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
              L'efficience du train de rouage permet aux mouvements modernes de fonctionner à des fréquences élevées tout en offrant un remarquable niveau de performance et de réserve de marche.
            </p>
          </div>
        </div>
      </section>

      {/* Composition du Train de Rouage */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Composition du Train de Rouage
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-4xl">
            Un train de rouage standard se compose généralement de <span className="font-semibold text-gray-900 dark:text-gray-100">quatre mobiles principaux</span>. Chaque mobile est constitué d'une roue dentée et d'un pignon qui engrène avec la roue suivante.
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

          <div className="mt-8 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Dans le rouage, un engrenage se compose d'une roue dont les dents pénètrent entre les dents (appelées ailes) d'un pignon. Cette interaction mécanique permet une <span className="font-semibold text-gray-900 dark:text-gray-100">transmission précise</span> du mouvement et du couple moteur.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action - Quiz */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
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

// Composant Roue Dentée SVG pour animation
interface GearIconProps {
  size: number;
  teeth: number;
}

function GearIcon({ size, teeth }: GearIconProps) {
  const center = size / 2;
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius * 0.65;

  let pathData = "";
  for (let i = 0; i < teeth; i++) {
    const angle1 = (i * 2 * Math.PI) / teeth;
    const angle2 = ((i + 0.35) * 2 * Math.PI) / teeth;
    const angle3 = ((i + 0.65) * 2 * Math.PI) / teeth;
    const angle4 = ((i + 1) * 2 * Math.PI) / teeth;

    const x1 = center + innerRadius * Math.cos(angle1);
    const y1 = center + innerRadius * Math.sin(angle1);
    const x2 = center + outerRadius * Math.cos(angle2);
    const y2 = center + outerRadius * Math.sin(angle2);
    const x3 = center + outerRadius * Math.cos(angle3);
    const y3 = center + outerRadius * Math.sin(angle3);
    const x4 = center + innerRadius * Math.cos(angle4);
    const y4 = center + innerRadius * Math.sin(angle4);

    if (i === 0) pathData += `M ${x1} ${y1} `;
    pathData += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
  }
  pathData += "Z";

  return (
    <g>
      <path d={pathData} fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx={center} cy={center} r={innerRadius * 0.35} fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx={center} cy={center} r={innerRadius * 0.15} fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

// Composant Stat Card
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
    <div className={`${colorClasses[color]} border rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4 mb-3">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-bold ${badgeClasses[color]} px-2 py-1 rounded`}>{number}</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          </div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
