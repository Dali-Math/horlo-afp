// app/[locale]/theorie/technologies/page.tsx

import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technologies Modernes en Horlogerie | HorloLearn",
  description: "Découvrez les technologies modernes horlogères : mouvements à quartz, montres connectées, matériaux innovants. Innovation et tradition suisse.",
  keywords: "technologies horlogères, quartz, montres connectées, matériaux innovants, silicium, céramique, horlogerie moderne",
};

export default function TechnologiesPage() {
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
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-purple-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Innovation Horlogère
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">🔬</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Technologies Modernes
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-blue-50 leading-relaxed max-w-4xl mb-8">
            L'horlogerie suisse allie tradition séculaire et innovations technologiques de pointe. Du quartz révolutionnaire aux matériaux du futur, découvrez comment la technologie transforme l'art horloger tout en préservant son excellence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1969" label="Première montre quartz" />
            <StatCard number="2001" label="Échappement silicium" />
            <StatCard number="3D" label="Impression additive" />
            <StatCard number="15'000" label="Gauss antimagnétique" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Tradition et Innovation
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depuis les années 1970, l'horlogerie suisse a dû s'adapter aux révolutions technologiques successives : quartz, électronique, matériaux composites, connectivité. Loin de renier son héritage mécanique, elle a su intégrer ces innovations pour repousser les limites de la précision, de la durabilité et de la performance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Les manufactures suisses investissent massivement dans la R&D pour développer des matériaux révolutionnaires (silicium, céramique, alliages antimagnétiques) et des technologies de fabrication avancées (LIGA, impression 3D, électroérosion). Cette quête perpétuelle d'excellence technique garantit la position dominante de l'horlogerie suisse sur le marché mondial.
            </p>
          </div>
        </div>
      </section>

      {/* Les 3 Technologies */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Découvrez les Technologies Modernes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <TechnologyCard
              icon="🔋"
              title="Mouvements à Quartz"
              description="Révolution piézoélectrique des années 1970. Précision exceptionnelle grâce au cristal de quartz vibrant à 32'768 Hz. Circuit intégré, pile longue durée."
              href="/theorie/technologies/mouvements-quartz"
              color="blue"
              features={["Principe piézoélectrique", "Circuit intégré", "HAQ (±5 sec/an)", "Crise du quartz"]}
            />
            <TechnologyCard
              icon="⌚"
              title="Montres Connectées"
              description="Fusion horlogerie et électronique. Capteurs biométriques, GPS, connectivité smartphone. Apple Watch, Samsung Galaxy, TAG Heuer Connected."
              href="/theorie/technologies/montres-connectees"
              color="purple"
              features={["Capteurs multiples", "Autonomie 1-2 jours", "Apps & notifications", "Obsolescence rapide"]}
            />
            <TechnologyCard
              icon="⚛️"
              title="Matériaux Innovants"
              description="Silicium, graphène, céramique haute performance, alliages antimagnétiques. Recherche de pointe pour précision et durabilité accrues."
              href="/theorie/technologies/materiaux-innovants"
              color="cyan"
              features={["Silicium (spiral)", "Cerachrom (lunette)", "Alliages 15'000 gauss", "Graphène expérimental"]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Components
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

interface TechnologyCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  color: 'blue' | 'purple' | 'cyan';
  features: string[];
}

function TechnologyCard({ icon, title, description, href, color, features }: TechnologyCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-500',
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 hover:border-cyan-500',
  };

  return (
    <Link href={href}>
      <div className={`border rounded-xl p-6 transition-all hover:shadow-lg cursor-pointer ${colorClasses[color]} h-full`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">En savoir plus →</span>
        </div>
      </div>
    </Link>
  );
}
