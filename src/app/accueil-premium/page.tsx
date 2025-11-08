// app/[locale]/theorie/complications/page.tsx

import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Complications Horlogères | HorloLearn",
  description: "Découvrez les complications horlogères : quantième (date), chronographe, phases de lune et tourbillon. Fonctionnement, histoire et modèles iconiques.",
  keywords: "complication horlogère, quantième, chronographe, phases de lune, tourbillon, montre mécanique, horlogerie suisse",
};

export default function ComplicationsPage() {
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
      <section className="bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Mécanique d’exception
            </span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">⚙️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Complications Horlogères
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            Les complications transforment une montre mécanique en chef-d’œuvre d’ingéniosité : calendrier perpétuel, chronographe, phases de lune, tourbillon… Plongez dans l’univers fascinant des complications horlogères, entre défi technique et poésie mécanique.
          </p>
        </div>
      </section>

      {/* Liste des complications */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComplicationCard
              icon="📅"
              title="Quantième (Date)"
              description="Du simple affichage de la date au quantième perpétuel avec gestion des années bissextiles. Une mémoire mécanique fascinante."
              href="/theorie/complications/quantieme"
              color="purple"
            />
            <ComplicationCard
              icon="⏱️"
              title="Chronographe"
              description="Mécanisme de mesure des temps courts : roues à colonnes, rattrapante, flyback… Complication sportive par excellence."
              href="/theorie/complications/chronographe"
              color="green"
            />
            <ComplicationCard
              icon="🌙"
              title="Phases de lune"
              description="Poésie astronomique… Suivi du cycle lunaire affiché sur le cadran, précision sur 122 ans pour les modèles les plus avancés."
              href="/theorie/complications/phases-lune"
              color="blue"
            />
            <ComplicationCard
              icon="🌀"
              title="Tourbillon"
              description="Inventé pour compenser la gravité, le tourbillon tourne sur lui-même. Génie mécanique et pièce maîtresse de Haute Horlogerie."
              href="/theorie/complications/tourbillon"
              color="orange"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// =======================
// Components
// =======================
interface ComplicationCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function ComplicationCard({ icon, title, description, href, color }: ComplicationCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-500',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-500',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-500',
  };

  return (
    <Link href={href}>
      <div className={`border rounded-xl p-6 flex gap-4 transition-all hover:shadow-lg cursor-pointer ${colorClasses[color]} h-full`}>
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
