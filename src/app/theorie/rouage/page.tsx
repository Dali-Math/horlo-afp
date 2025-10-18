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
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-50">
      {/* Hero Section avec Roues Animées */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        {/* Animated Gears Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <AnimatedGears />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 max-w-5xl">
          <a
            href="/theorie"
            className="inline-flex items-center text-sm text-gray-400 hover:text-orange-400 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la théorie
          </a>

          {/* Icon avec rotation */}
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="relative">
              <svg className="w-20 h-20 text-orange-500 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="35" />
                <circle cx="50" cy="50" r="20" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="50"
                    y1="50"
                    x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                    y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                    strokeWidth="3"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent leading-tight">
            La Transmission Cinématique
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mb-12">
            Le rouage est le cœur de la transmission mécanique dans une montre. Il transforme l'énergie du barillet en un mouvement précis et régulé qui anime les aiguilles.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="4" label="Mobiles principaux" />
            <StatCard number="95%" label="Efficacité" />
            <StatCard number="1µm" label="Tolérance" />
            <StatCard number="36K" label="Alternances/h" />
          </div>
        </div>
      </section>

      {/* Définition et Fonction */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
          Définition et Fonction
        </h2>

        <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">Système de Transmission de l'Énergie</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Le <span className="text-orange-400 font-semibold">rouage</span> (ou train d'engrenages) est l'ensemble des roues dentées et pignons qui transmettent l'énergie du barillet vers l'échappement dans une montre mécanique. Il constitue le <span className="text-orange-400 font-semibold">système de transmission cinématique central</span> du mouvement horloger.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Le rouage transforme le flux d'énergie continu provenant du ressort moteur en un mouvement régulé et précis. Chaque engrenage est conçu et apparié avec une précision micrométrique pour réguler le mouvement et la vitesse de transmission.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Le train de rouage commence au niveau du ressort dans le barillet et se termine à l'échappement. Chaque roue du train est reliée à une autre par l'intermédiaire de pignons, ce qui permet de <span className="text-orange-400 font-semibold">modifier progressivement la vitesse de transfert</span> de l'énergie.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-950/20 to-neutral-900/50 border border-orange-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold text-orange-300 mb-3">⚡ Fonction Principale</h4>
          <p className="text-gray-300 leading-relaxed">
            Le rouage assure la <span className="text-orange-400 font-semibold">transmission du couple moteur</span> depuis le barillet jusqu'à l'échappement, tout en démultipliant la vitesse pour atteindre la fréquence d'oscillation nécessaire au balancier-spiral.
          </p>
        </div>
      </section>

      {/* Le Rouage de Finissage */}
      <section className="bg-neutral-900/30 border-y border-neutral-800 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Le Rouage de Finissage
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Rouage Multiplicatif</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Le <span className="text-orange-400 font-semibold">rouage de finissage</span> est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique. Cette accélération progressive est essentielle pour atteindre la <span className="text-orange-400 font-semibold">fréquence d'oscillation nécessaire</span> au balancier.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Le rouage de finissage divise l'unité de temps donnée par l'oscillateur (ensemble balancier-spiral-échappement) pour créer les indications des heures, minutes et secondes. Il est composé de plusieurs mobiles successifs qui multiplient la vitesse de rotation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-orange-400 mb-4">Caractéristiques</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Multiplication de vitesse</span> : chaque roue tourne plus vite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Démultiplication du couple</span> : force réduite progressivement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Précision accrue</span> : réduction des erreurs cumulées</span>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-orange-400 mb-4">Performances</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Fréquence élevée</span> : jusqu'à 5 Hz (36 000 alt/h)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Efficacité optimale</span> : rendement &gt; 95%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><span className="font-semibold">Durabilité</span> : usure minimale sur décennies</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed italic">
            L'efficience du train de rouage permet aux mouvements modernes de fonctionner à des fréquences élevées tout en offrant un remarquable niveau de performance et de réserve de marche.
          </p>
        </div>
      </section>

      {/* Composition du Train de Rouage */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
          Composition du Train de Rouage
        </h2>

        <p className="text-xl text-gray-300 mb-12">
          Un train de rouage standard se compose généralement de <span className="text-orange-400 font-semibold">quatre mobiles principaux</span>. Chaque mobile est constitué d'une roue dentée et d'un pignon qui engrène avec la roue suivante.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <MobileCard
            icon="⚙️"
            number="1"
            title="Grand Mobile (Roue de Centre)"
            description="Fait 1 tour par heure, porte l'aiguille des minutes. C'est le mobile le plus lent du rouage de finissage."
          />
          <MobileCard
            icon="⚙️"
            number="2"
            title="Moyen Mobile (Roue Moyenne)"
            description="Mobile intermédiaire de transmission, assure la démultiplication entre la roue de centre et la roue de secondes."
          />
          <MobileCard
            icon="⚙️"
            number="3"
            title="Mobile de Seconde"
            description="Fait 1 tour par minute, porte l'aiguille des secondes (trotteuse). Vitesse de rotation : 1 tr/min."
          />
          <MobileCard
            icon="⚙️"
            number="4"
            title="Mobile d'Échappement"
            description="Transmet l'énergie à l'ancre de l'échappement. Tourne à haute fréquence (240-360 tr/h selon calibre)."
          />
        </div>

        <div className="mt-8 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <p className="text-gray-300 leading-relaxed">
            Dans le rouage, un engrenage se compose d'une roue dont les dents pénètrent entre les dents (appelées ailes) d'un pignon. Cette interaction mécanique permet une <span className="text-orange-400 font-semibold">transmission précise</span> du mouvement et du couple moteur.
          </p>
        </div>
      </section>

      {/* Rapport de Transmission */}
      <section className="bg-neutral-900/30 border-y border-neutral-800 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Rapport de Transmission
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            Dans un train d'engrenages simple, le <span className="text-orange-400 font-semibold">rapport de transmission</span> est égal au produit des nombres de dents des roues menantes divisé par celui des roues menées. Cette formule mathématique permet de calculer précisément les vitesses de rotation.
          </p>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-orange-500/30 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold text-orange-400 mb-6">Formule du Rapport de Transmission</h3>
            
            <div className="bg-neutral-950 rounded-lg p-6 mb-6 font-mono text-center">
              <div className="text-2xl text-orange-300 mb-4">
                ω<sub className="text-sm">sortie</sub> / ω<sub className="text-sm">entrée</sub> = (∏ Z<sub className="text-sm">menantes</sub>) / (∏ Z<sub className="text-sm">menées</sub>)
              </div>
            </div>

            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start">
                <span className="font-bold text-orange-400 mr-3 min-w-[80px]">ω (oméga)</span>
                <span>Vitesse angulaire (rad/s ou tr/min)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-400 mr-3 min-w-[80px]">Z</span>
                <span>Nombre de dents de la roue</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-400 mr-3 min-w-[80px]">∏ (produit)</span>
                <span>Multiplication successive</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-950/20 to-neutral-900/50 border border-orange-500/30 rounded-xl p-6">
            <h4 className="text-lg font-bold text-orange-300 mb-4">💡 Exemple Pratique</h4>
            <p className="text-gray-300 leading-relaxed mb-3">
              Pour une roue de 80 dents engrenant avec un pignon de 10 dents :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Rapport = 80 / 10 = <span className="font-bold text-orange-400">8</span></span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Le pignon tourne <span className="font-bold text-orange-400">8 fois plus vite</span> que la roue</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span>Le couple est <span className="font-bold text-orange-400">divisé par 8</span></span>
              </li>
            </ul>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mt-6 italic">
            Ce calcul permet aux horlogers de concevoir des trains de rouage qui produisent exactement les rapports de vitesse nécessaires pour une mesure précise du temps. La précision de ces engrenages est cruciale pour la fiabilité chronométrique de la montre.
          </p>
        </div>
      </section>

      {/* Rouage et Minuterie */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
          Rouage et Minuterie
        </h2>

        <p className="text-xl text-gray-300 mb-8">
          Le <span className="text-orange-400 font-semibold">rouage des minutes</span> est un système spécifique qui transmet la rotation du pignon des minutes à l'aiguille des heures. Ce mécanisme assure que l'aiguille des heures tourne <span className="text-orange-400 font-semibold">12 fois plus lentement</span> que celle des minutes.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-400 mb-4">🕐 Rapport Horaire</h3>
            <p className="text-gray-300 mb-4">La minuterie assure le rapport 1:12 entre minutes et heures :</p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Chaussée</span> : 1 tour/heure</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Roue des heures</span> : 1 tour/12 heures</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Pignon de minuterie</span> : transmission intermédiaire</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-400 mb-4">⚡ Complications</h3>
            <p className="text-gray-300 mb-4">Le rouage transmet aussi l'énergie vers :</p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Quantième</span> : affichage de la date</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Phases de lune</span> : cycle lunaire</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2">•</span>
                <span><span className="font-semibold">Chronographe</span> : fonction de chronométrage</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">
          La minuterie est un ensemble d'engrenages situé côté cadran qui permet l'affichage des heures. Elle reçoit le mouvement de la roue de centre (qui fait un tour par heure) et le démultiplie pour actionner l'aiguille des heures. Les rouages transmettent le couple moteur et le mouvement vers d'autres éléments du mécanisme, comme les complications horlogères. Cette transmission doit être à la fois <span className="text-orange-400 font-semibold">efficace et précise</span> pour garantir le bon fonctionnement de toutes les fonctions.
        </p>
      </section>

      {/* Précision et Qualité */}
      <section className="bg-gradient-to-br from-orange-950/10 via-neutral-900 to-neutral-950 border-y border-neutral-800 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Précision et Qualité
          </h2>

          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            La qualité du rouage est déterminante pour la <span className="text-orange-400 font-semibold">précision et la fiabilité</span> d'une montre mécanique. Chaque engrenage doit être usiné avec une tolérance de l'ordre du <span className="text-orange-400 font-semibold">micromètre (µm)</span> pour assurer une transmission optimale.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <QualityCard
              title="Tolérance"
              value="< 1 µm"
              description="Précision d'usinage requise"
            />
            <QualityCard
              title="Rendement"
              value="> 95%"
              description="Efficacité de transmission"
            />
            <QualityCard
              title="Durabilité"
              value="10-20 ans"
              description="Durée de vie avec entretien"
            />
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              Le mouvement final des engrenages est converti en un <span className="text-orange-400 font-semibold">tic-tac régulier</span> de la montre qui donne une heure précise. Toute imperfection dans la conception ou la fabrication du rouage peut entraîner des variations de marche et affecter la précision chronométrique.
            </p>

            <div className="bg-gradient-to-br from-orange-950/20 to-neutral-900/50 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-300 mb-3">🇨🇭 Innovation Suisse</h3>
              <p className="text-gray-300 leading-relaxed">
                Les manufactures horlogères suisses investissent massivement dans la recherche et le développement de nouveaux matériaux et designs pour améliorer l'efficacité des trains de rouage. L'utilisation de nouveaux alliages, de traitements de surface et de géométries optimisées permet de réduire les frottements et d'augmenter la réserve de marche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Quiz */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-gradient-to-br from-orange-950/30 to-neutral-900 border-2 border-orange-500/50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            📝 Testez vos connaissances
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Maîtrisez-vous les concepts du train de rouage et de la transmission cinématique ?
          </p>
          <a
            href="/quiz/rouage"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/50"
          >
            Commencer le quiz
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}

// ========================================
// COMPONENTS
// ========================================

// Composant Roues Animées (SVG)
function AnimatedGears() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grande roue principale - tourne lentement sens horaire */}
      <svg
        className="absolute top-10 right-10 w-64 h-64 text-orange-500/30 animate-spin-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <Gear size={100} teeth={12} />
      </svg>

      {/* Roue moyenne - tourne moyennement sens anti-horaire */}
      <svg
        className="absolute top-40 left-20 w-40 h-40 text-orange-400/25 animate-spin-reverse"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <Gear size={100} teeth={10} />
      </svg>

      {/* Petite roue rapide - tourne vite sens horaire */}
      <svg
        className="absolute bottom-20 right-32 w-28 h-28 text-amber-500/20 animate-spin-fast"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <Gear size={100} teeth={8} />
      </svg>

      {/* Roue décorative mobile */}
      <svg
        className="absolute bottom-40 left-1/4 w-32 h-32 text-orange-300/15 animate-spin-slow-reverse"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <Gear size={100} teeth={9} />
      </svg>

      {/* Roue supplémentaire centre gauche */}
      <svg
        className="hidden md:block absolute top-1/2 left-10 w-36 h-36 text-amber-400/20 animate-spin-reverse"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <Gear size={100} teeth={11} />
      </svg>
    </div>
  );
}

// Composant Roue Dentée SVG (réutilisable)
interface GearProps {
  size: number;
  teeth: number;
}

function Gear({ size, teeth }: GearProps) {
  const center = size / 2;
  const outerRadius = size / 2 - 2;
  const innerRadius = outerRadius * 0.7;

  // Génération des dents
  let pathData = "";
  for (let i = 0; i < teeth; i++) {
    const angle1 = (i * 2 * Math.PI) / teeth;
    const angle2 = ((i + 0.4) * 2 * Math.PI) / teeth;
    const angle3 = ((i + 0.6) * 2 * Math.PI) / teeth;
    const angle4 = ((i + 1) * 2 * Math.PI) / teeth;

    const x1 = center + innerRadius * Math.cos(angle1);
    const y1 = center + innerRadius * Math.sin(angle1);
    const x2 = center + outerRadius * Math.cos(angle2);
    const y2 = center + outerRadius * Math.sin(angle2);
    const x3 = center + outerRadius * Math.cos(angle3);
    const y3 = center + outerRadius * Math.sin(angle3);
    const x4 = center + innerRadius * Math.cos(angle4);
    const y4 = center + innerRadius * Math.sin(angle4);

    if (i === 0) {
      pathData += `M ${x1} ${y1} `;
    }
    pathData += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
  }
  pathData += "Z";

  return (
    <g>
      {/* Corps de la roue */}
      <path d={pathData} fill="currentColor" />
      {/* Centre de la roue */}
      <circle cx={center} cy={center} r={innerRadius * 0.3} fill="currentColor" opacity="0.8" />
      {/* Trou central */}
      <circle cx={center} cy={center} r={innerRadius * 0.15} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </g>
  );
}

// Composant Stat Card
interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur border border-neutral-800 rounded-lg p-4 hover:border-orange-500/50 transition-all">
      <div className="text-3xl font-bold text-orange-400 mb-1">{number}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

// Composant Mobile Card
interface MobileCardProps {
  icon: string;
  number: string;
  title: string;
  description: string;
}

function MobileCard({ icon, number, title, description }: MobileCardProps) {
  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex items-start gap-4 mb-3">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded">{number}</span>
            <h3 className="text-lg font-bold text-orange-400">{title}</h3>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Composant Quality Card
interface QualityCardProps {
  title: string;
  value: string;
  description: string;
}

function QualityCard({ title, value, description }: QualityCardProps) {
  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all">
      <h3 className="text-lg font-bold text-orange-400 mb-2">{title}</h3>
      <div className="text-4xl font-bold text-orange-300 mb-3">{value}</div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
