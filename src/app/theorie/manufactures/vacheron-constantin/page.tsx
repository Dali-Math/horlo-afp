// app/[locale]/theorie/manufactures/vacheron-constantin/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacheron Constantin - Plus Ancienne Manufacture | HorloLearn",
  description: "Découvrez Vacheron Constantin (1755) : la plus ancienne manufacture horlogère au monde en activité continue, symbole de l'excellence genevoise.",
  keywords: "Vacheron Constantin, 1755, Genève, manufacture, horlogerie suisse, Patrimony, Overseas, Poinçon de Genève",
};

export default function VacheronConstantinPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <a
            href="/theorie/manufactures"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux Manufactures
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-900 text-sm font-medium px-4 py-1.5 rounded-full">
              La Plus Ancienne Manufacture
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🏛️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Vacheron Constantin
              </h1>
              <p className="text-xl text-orange-200 mt-2">
                Genève - Fondée en 1755
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-orange-100 leading-relaxed max-w-4xl mb-8">
            Fondée en 1755 par Jean-Marc Vacheron à Genève, Vacheron Constantin est la plus ancienne manufacture horlogère au monde en activité continue. Pendant 270 ans, elle incarne l'excellence genevoise, le raffinement aristocratique et la maîtrise technique absolue. Membre fondateur de la Sainte Trinité horlogère avec Patek Philippe et Audemars Piguet.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1755" label="Année de fondation" />
            <StatCard number="270" label="Ans d'histoire continue" />
            <StatCard number="1.84m" label="Calibre le plus fin (1955)" />
            <StatCard number="57" label="Complications (record)" />
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            270 Ans d'Histoire Continue
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En <span className="font-semibold text-gray-900 dark:text-gray-100">1755</span>, Jean-Marc Vacheron, maître horloger de 24 ans, ouvre son atelier au cœur de Genève. Il s'engage à former des apprentis et à produire des montres d'une qualité exceptionnelle, posant les fondations d'une manufacture qui traversera trois siècles sans interruption.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En 1819, François Constantin rejoint l'entreprise et lui apporte une dimension commerciale internationale, donnant naissance à la raison sociale <span className="font-semibold text-gray-900 dark:text-gray-100">Vacheron & Constantin</span>. Sa devise reste gravée dans l'histoire : <span className="italic">"Faire mieux si possible, ce qui est toujours possible"</span>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              À travers guerres, crises économiques et révolutions horlogères, Vacheron Constantin n'a jamais cessé de produire, conservant intacts ses archives, ses savoir-faire et son esprit d'excellence genevoise.
            </p>
          </div>
        </div>
      </section>

      {/* Poinçon de Genève */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Poinçon de Genève
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Certification d'Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Depuis 1886, le <span className="font-semibold text-gray-900 dark:text-gray-100">Poinçon de Genève</span> (Hallmark of Geneva) certifie l'origine genevoise et la qualité exceptionnelle des montres. Vacheron Constantin fut l'une des premières manufactures à l'adopter.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En 2004, VC prend une décision historique : soumettre <span className="font-semibold text-gray-900 dark:text-gray-100">100% de sa production</span> au Poinçon de Genève, garantissant ainsi que chaque montre respecte les critères les plus stricts de finition, précision et origine genevoise.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">12 Critères Stricts</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Assemblage complet à Genève (canton)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Finitions main : anglage, polissage miroir, perlage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Précision chronométrique contrôlée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Réserve de marche minimum 38-42h</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span>Tests fonctionnels exhaustifs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">🏛️ Engagement Total</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Contrairement à d'autres manufactures qui réservent le Poinçon de Genève à certains modèles, Vacheron Constantin l'applique à l'intégralité de sa production, du calibre le plus simple aux grandes complications. Cet engagement reflète une vision sans compromis de la qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Iconiques */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Collections Iconiques
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <CollectionCard
              name="Patrimony"
              year="1957"
              description="Élégance épurée, design minimaliste, finesse exceptionnelle. Incarne le classicisme genevois absolu avec des calibres ultra-plats (1.64mm record)."
              icon="👔"
            />
            <CollectionCard
              name="Overseas"
              year="1977"
              description="Montre de sport de luxe inspirée par les voyages. Bracelet interchangeable (cuir, caoutchouc, acier), boîtier Maltese Cross intégré, étanche 150m."
              icon="🌍"
            />
            <CollectionCard
              name="Traditionnelle"
              year="Collection"
              description="Haute horlogerie pure : complications mécaniques sophistiquées, tourbillons, quantièmes perpétuels, répétitions minutes. Savoir-faire genevois ancestral."
              icon="⚙️"
            />
          </div>
        </div>
      </section>

      {/* Grandes Complications */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Records de Complications
          </h2>

          <div className="space-y-6">
            <ComplicationCard
              name="Tour de l'Île (2005)"
              complications="16"
              description="Créée pour le 250ème anniversaire de la manufacture. 16 complications dont tourbillon, quantième perpétuel rétrograde, équation du temps, lever/coucher du soleil. 834 composants, 1000h d'assemblage."
            />
            <ComplicationCard
              name="Reference 57260 (2015)"
              complications="57"
              description="La montre la plus compliquée jamais créée : 57 complications, 2826 pièces, 8 ans de développement. Commande spéciale d'un collectionneur anonyme pour le 260ème anniversaire."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏛️ Découvrez les Autres Manufactures
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Explorez Patek Philippe, Rolex, Audemars Piguet et Omega
            </p>
            <a
              href="/theorie/manufactures"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour aux Manufactures
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

function CollectionCard({ name, year, description, icon }: { name: string; year: string; description: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{name}</h3>
      <p className="text-sm text-orange-600 dark:text-orange-400 mb-3">{year}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}

function ComplicationCard({ name, complications, description }: { name: string; complications: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-3">
        <div className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-lg font-bold text-2xl">
          {complications}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
