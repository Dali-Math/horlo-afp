// app/[locale]/theorie/manufactures/page.tsx

import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Grandes Manufactures Horlogères Suisses | HorloLearn",
  description: "Découvrez les manufactures horlogères suisses de légende : Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega. Histoire, innovations et savoir-faire d'exception.",
  keywords: "manufactures suisses, Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin, Omega, horlogerie de luxe",
};

export default function ManufacturesPage() {
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
              Culture Horlogère
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🏛️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Les Grandes Manufactures Horlogères Suisses
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mb-8">
            La Suisse abrite les manufactures horlogères les plus prestigieuses au monde. Découvrez l'histoire, les innovations et le savoir-faire exceptionnel des maisons qui ont façonné l'horlogerie de luxe[web:5][web:12].
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="175+" label="Ans d'histoire (Patek)" color="blue" />
            <StatCard number="1839" label="Année fondation (PP)" color="green" />
            <StatCard number="5" label="Manufactures de légende" color="purple" />
            <StatCard number="🇨🇭" label="Excellence suisse" color="orange" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            L'Excellence Horlogère Suisse
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depuis le <span className="font-semibold text-gray-900 dark:text-gray-100">16ᵉ siècle</span>, la Suisse s'est imposée comme le berceau de l'horlogerie de précision. Les manufactures suisses incarnent l'excellence technique, l'innovation constante et un savoir-faire transmis de génération en génération[web:3][web:4].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Ces maisons ont traversé les crises (Grande Dépression de 1929, crise du quartz des années 1970-1980) et ont su se réinventer tout en préservant leur identité et leur indépendance[web:16][web:2].
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Aujourd'hui, elles représentent le <span className="font-semibold text-gray-900 dark:text-gray-100">summum de l'horlogerie de luxe</span>, alliant tradition artisanale et technologies de pointe[web:12].
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Qu'est-ce qu'une Manufacture ?</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Une <span className="font-semibold text-gray-900 dark:text-gray-100">manufacture</span> est une maison horlogère qui conçoit, développe et fabrique ses propres mouvements en interne, maîtrisant toute la chaîne de production. C'est le gage ultime de qualité et d'indépendance[web:127].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 5 Manufactures */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Les Cinq Légendes de l'Horlogerie Suisse
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Découvrez en détail l'histoire, les innovations et les modèles iconiques de chaque manufacture
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ManufactureCard
              name="Patek Philippe"
              founded="1839"
              icon="👑"
              tagline="Manufacture de prestige absolu"
              specialties={["Quantièmes perpétuels", "Calatrava", "Nautilus", "Complications"]}
              color="blue"
              slug="patek-philippe"
            />

            <ManufactureCard
              name="Rolex"
              founded="1905"
              icon="⚡"
              tagline="L'icône intemporelle"
              specialties={["Oyster", "Submariner", "Daytona", "GMT-Master"]}
              color="green"
              slug="rolex"
            />

            <ManufactureCard
              name="Audemars Piguet"
              founded="1875"
              icon="🔷"
              tagline="L'avant-garde de l'horlogerie"
              specialties={["Royal Oak", "Tourbillons", "Grandes complications"]}
              color="purple"
              slug="audemars-piguet"
            />

            <ManufactureCard
              name="Vacheron Constantin"
              founded="1755"
              icon="⭐"
              tagline="La plus ancienne manufacture"
              specialties={["Patrimony", "Overseas", "Métiers d'Art"]}
              color="orange"
              slug="vacheron-constantin"
            />

            <ManufactureCard
              name="Omega"
              founded="1848"
              icon="🌙"
              tagline="Précision et conquête spatiale"
              specialties={["Speedmaster", "Seamaster", "Constellation"]}
              color="red"
              slug="omega"
            />
          </div>
        </div>
      </section>

      {/* Critères d'Excellence */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Les Critères de l'Excellence
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <CriteriaCard
              icon="🔬"
              title="Recherche & Développement"
              description="Investissements massifs dans l'innovation, développement de nouveaux matériaux (silicium, Cerachrom) et brevets exclusifs."
            />
            <CriteriaCard
              icon="🏭"
              title="Intégration Verticale"
              description="Maîtrise complète de la production : de la conception à l'assemblage final, en passant par la fabrication des composants."
            />
            <CriteriaCard
              icon="👨‍🔧"
              title="Savoir-faire Artisanal"
              description="Horlogers hautement qualifiés, formation interne rigoureuse et transmission des gestes ancestraux."
            />
            <CriteriaCard
              icon="💎"
              title="Finitions Irréprochables"
              description="Polissage manuel, anglage, perlage, côtes de Genève : chaque détail est travaillé avec perfection."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Approfondissez vos Connaissances
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Cliquez sur une manufacture ci-dessus pour découvrir son histoire complète, ses innovations et ses modèles emblématiques.
            </p>
            <a
              href="/theorie"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Explorer toutes les théories
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

interface ManufactureCardProps {
  name: string;
  founded: string;
  icon: string;
  tagline: string;
  specialties: string[];
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  slug: string;
}

function ManufactureCard({ name, founded, icon, tagline, specialties, color, slug }: ManufactureCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-500',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-500',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-500',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-500',
  };

  const badgeClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200',
    red: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
  };

  return (
    <Link href={`/theorie/manufactures/${slug}`}>
      <div className={`${colorClasses[color]} border rounded-xl p-6 transition-all hover:shadow-lg cursor-pointer group h-full`}>
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{icon}</div>
          <span className={`text-xs font-bold ${badgeClasses[color]} px-3 py-1 rounded-full`}>{founded}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">{tagline}</p>
        
        <div className="space-y-2">
          {specialties.map((specialty, index) => (
            <div key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>{specialty}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
            Découvrir l'histoire →
          </span>
        </div>
      </div>
    </Link>
  );
}

interface CriteriaCardProps {
  icon: string;
  title: string;
  description: string;
}

function CriteriaCard({ icon, title, description }: CriteriaCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
