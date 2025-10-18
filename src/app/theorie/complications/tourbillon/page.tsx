// app/[locale]/theorie/complications/tourbillon/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Tourbillon - Complication Mécanique Suprême | HorloLearn",
  description: "Découvrez le tourbillon horloger inventé par Abraham-Louis Breguet en 1795 : compensation de la gravité, cage tournante, chef-d'œuvre de Haute Horlogerie.",
  keywords: "tourbillon, Breguet, cage tournante, gravité, haute horlogerie, complication, balancier, précision chronométrique",
};

export default function TourbillonPage() {
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
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Chef-d'œuvre de Haute Horlogerie
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl animate-spin-slow">🌀</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Le Tourbillon
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-4xl mb-8">
            Inventé par Abraham-Louis Breguet en 1795, le tourbillon est le sommet absolu de la complexité horlogère. Cette cage tournante compense les effets de la gravité terrestre sur le balancier-spiral, symbole ultime du savoir-faire horloger.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="1795" label="Invention Breguet" />
            <StatCard number="60s" label="Rotation complète" />
            <StatCard number="80+" label="Pièces ajoutées" />
            <StatCard number="300h" label="Assemblage" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Qu'est-ce qu'un Tourbillon ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">tourbillon</span> (du français "tourbillon", signifiant "tourbillon de vent") est une complication horlogère inventée par Abraham-Louis Breguet en 1795 et brevetée en 1801.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Son objectif : <span className="font-semibold text-gray-900 dark:text-gray-100">compenser les effets de la gravité terrestre</span> sur la précision du balancier-spiral. En position verticale (montre portée au poignet), la gravité affecte différemment le spiral selon l'orientation, causant des variations de marche.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              La solution de Breguet : placer tout l'échappement (ancre, roue d'échappement, balancier-spiral) dans une <span className="font-semibold text-gray-900 dark:text-gray-100">cage rotative</span> effectuant un tour complet par minute. Les erreurs de position s'annulent par moyennage sur 360°.
            </p>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement de la Cage Tournante
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Principe Mécanique</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                L'échappement complet (ancre + roue d'échappement + balancier-spiral) est monté dans une <span className="font-semibold text-gray-900 dark:text-gray-100">cage mobile</span> soutenue par deux ponts.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                La cage effectue <span className="font-semibold text-gray-900 dark:text-gray-100">1 rotation complète toutes les 60 secondes</span> (certains tourbillons modernes tournent en 30s, 6 minutes ou 24h). Cette rotation annule statistiquement les erreurs de position dues à la gravité.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Composants</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Cage supérieure et inférieure</span> : maintiennent l'échappement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Balancier-spiral</span> : au centre, oscille librement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Ancre et roue d'échappement</span> : solidaires de la cage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Roue fixe</span> : denture interne entraîne la cage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                  <span><span className="font-semibold">Pivots ultra-fins</span> : supportent cage (friction minimale)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-l-4 border-purple-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">⚙️ Défi Technique Absolu</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le tourbillon ajoute 80 à 100 pièces au mouvement, pèse moins de 0,3 gramme et nécessite 200-300 heures d'assemblage par un maître horloger. Les tolérances sont de l'ordre du micron (1/1000e de mm). C'est pourquoi les montres à tourbillon coûtent 50'000 CHF minimum.
            </p>
          </div>
        </div>
      </section>

      {/* Variantes */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Variantes Modernes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <VariantCard
              title="Tourbillon Volant"
              icon="🪶"
              description="Cage suspendue par un seul point (pont supérieur retiré). Vue dégagée spectaculaire sur le mécanisme. Prouesse technique extrême (Breguet, Jaeger-LeCoultre)."
            />
            <VariantCard
              title="Double Tourbillon"
              icon="♊"
              description="Deux cages tournant simultanément ou en opposition. Compensation gravité encore plus complète. Greubel Forsey invente le Double Tourbillon 30° (2004)."
            />
            <VariantCard
              title="Tourbillon Carrousel"
              icon="🎠"
              description="Cage entraînée différemment (rotation indépendante de l'échappement). Inventé par Bahne Bonniksen en 1892. Moins courant mais tout aussi fascinant."
            />
          </div>
        </div>
      </section>

      {/* Histoire Breguet */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Abraham-Louis Breguet (1747-1823)
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Né à Neuchâtel (Suisse) en 1747, <span className="font-semibold text-gray-900 dark:text-gray-100">Abraham-Louis Breguet</span> s'installe à Paris où il devient le plus grand horloger de son temps, fournisseur de Louis XVI, Marie-Antoinette, Napoléon Bonaparte et des cours européennes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En 1795, il imagine le tourbillon pour résoudre le problème des erreurs de position des montres de poche portées verticalement. Le brevet est déposé le <span className="font-semibold text-gray-900 dark:text-gray-100">26 juin 1801</span> (7 messidor an IX).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Breguet ne produit que <span className="font-semibold text-gray-900 dark:text-gray-100">35 tourbillons</span> de son vivant, chacun étant un chef-d'œuvre unique. Aujourd'hui, les tourbillons Breguet antiques se vendent plusieurs millions de francs suisses aux enchères.
            </p>
          </div>
        </div>
      </section>

      {/* Efficacité */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Efficacité Réelle du Tourbillon
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Aujourd'hui, le tourbillon est avant tout un <span className="font-semibold text-gray-900 dark:text-gray-100">symbole de prestige</span> plutôt qu'une nécessité technique. Les montres-bracelets modernes sont portées en mouvement constant au poignet, ce qui moyennise naturellement les positions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              De plus, les spiraux modernes en silicium ou alliages antimagnétiques (Parachrom, Nivachron) offrent une précision comparable voire supérieure sans tourbillon. Les tests chronométriques montrent que les gains de précision sont marginaux (quelques secondes/jour maximum).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cependant, le tourbillon reste la <span className="font-semibold text-gray-900 dark:text-gray-100">quintessence de la haute horlogerie</span> : prouesse technique, beauté hypnotique de la cage tournante visible côté cadran, tradition vivante du génie de Breguet. C'est un objet d'art mécanique, pas un simple instrument de mesure du temps.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚙️ Explorez les Autres Complications
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Découvrez le Quantième, le Chronographe et les Phases de Lune
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

function VariantCard({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
