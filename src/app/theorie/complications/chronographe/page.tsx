// app/[locale]/theorie/complications/chronographe/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Chronographe - Complication Sportive | HorloLearn",
  description: "Découvrez le chronographe mécanique : roue à colonnes, rattrapante, flyback, échelle tachymétrique. Fonctionnement, histoire et modèles légendaires.",
  keywords: "chronographe, roue à colonnes, flyback, rattrapante, Daytona, Speedmaster, montre mécanique, mesure temps",
};

export default function ChronographePage() {
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
            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium px-4 py-1.5 rounded-full">
              Complication Sportive
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">⏱️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Le Chronographe
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            Le chronographe est une complication horlogère permettant de mesurer des temps courts indépendamment de l'heure courante. Roue à colonnes, rattrapante, flyback : découvrez la mécanique d'exception des chronographes, des circuits automobiles aux missions spatiales.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard number="2" label="Poussoirs (Start/Stop)" color="green" />
            <StatCard number="3" label="Compteurs (30min, 12h)" color="blue" />
            <StatCard number="1/5s" label="Précision typique" color="purple" />
            <StatCard number="200+" label="Pièces ajoutées" color="orange" />
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Qu'est-ce qu'un Chronographe ?
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Un <span className="font-semibold text-gray-900 dark:text-gray-100">chronographe</span> est une montre équipée d'un mécanisme permettant de mesurer des intervalles de temps courts (secondes, minutes, heures) tout en continuant d'afficher l'heure normale.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Contrairement à un simple chronomètre (montre précise certifiée), le chronographe possède une fonction <span className="font-semibold text-gray-900 dark:text-gray-100">start/stop/reset</span> actionnée par des poussoirs situés sur le boîtier, généralement à 2h et 4h.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Le chronographe est la complication sportive par excellence, utilisée en course automobile, aviation, plongée et exploration spatiale.
            </p>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Fonctionnement du Chronographe
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Les Trois Fonctions Principales</h3>
            
            <div className="space-y-6">
              <FunctionCard
                number="1"
                title="Départ (Start)"
                description="Pression sur le poussoir supérieur (2h) : un système d'embrayage met en contact la roue de chronographe avec le rouage du mouvement. L'aiguille centrale de chronographe commence à tourner."
                icon="▶️"
                color="green"
              />
              <FunctionCard
                number="2"
                title="Arrêt (Stop)"
                description="Nouvelle pression sur le même poussoir : le débrayage sépare les roues, un frein stoppe l'aiguille. On peut lire le temps écoulé. Possibilité de redémarrer sans remise à zéro."
                icon="⏸️"
                color="orange"
              />
              <FunctionCard
                number="3"
                title="Remise à zéro (Reset)"
                description="Pression sur le poussoir inférieur (4h) : un marteau frappe des cames en forme de cœur solidaires des roues de chronographe, ramenant toutes les aiguilles à zéro instantanément."
                icon="🔄"
                color="blue"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Règle Importante</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sur un chronographe classique à deux poussoirs, <span className="font-semibold">ne JAMAIS appuyer sur le poussoir de remise à zéro lorsque le chronographe est en marche</span>. Cela peut endommager ou casser la bascule de commande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roue à Colonnes vs Came */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Roue à Colonnes vs Came
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <MechanismCard
              title="Roue à Colonnes"
              icon="⚙️"
              description="Système traditionnel de haute horlogerie. Une roue dentée surmontée de colonnes contrôle les bascules et leviers. Chaque pression sur le poussoir fait tourner la roue d'un cran."
              advantages={[
                "Mécanisme noble et esthétique",
                "Action des poussoirs douce et progressive",
                "Symbole de haute horlogerie",
                "Finitions soignées visibles"
              ]}
              disadvantages={[
                "Complexe à fabriquer",
                "Coût de production élevé",
                "Nécessite réglages précis"
              ]}
              color="purple"
            />

            <MechanismCard
              title="Came ou Navette"
              icon="🔧"
              description="Système moderne plus simple. Une came oscillante ou navette commande directement les fonctions start/stop/reset via des leviers."
              advantages={[
                "Fabrication plus simple",
                "Robustesse accrue",
                "Coût réduit",
                "Entretien facilité"
              ]}
              disadvantages={[
                "Moins noble esthétiquement",
                "Action poussoirs plus sèche",
                "Image moins prestigieuse"
              ]}
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Variantes Avancées */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Variantes Avancées
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <VariantCard
              title="Flyback (Retour en Vol)"
              icon="✈️"
              description="Une seule pression sur le poussoir : arrêt + remise à zéro + redémarrage instantané. Développé pour l'aviation militaire. Gain de temps considérable pour mesures successives."
              color="blue"
            />
            <VariantCard
              title="Rattrapante (Split-Seconds)"
              icon="🎯"
              description="Deux aiguilles de secondes superposées. L'une peut être arrêtée (temps intermédiaire) tandis que l'autre continue. Mécanisme extrêmement complexe avec embrayage friction."
              color="purple"
            />
            <VariantCard
              title="Monopoussoir"
              icon="1️⃣"
              description="Un seul poussoir pour toutes les fonctions : 1ère pression = start, 2ème = stop, 3ème = reset. Design épuré, séquence cyclique obligatoire."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Échelles et Cadrans */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Échelles et Cadrans
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ScaleCard
              title="Échelle Tachymétrique"
              description="Graduations sur la lunette permettant de calculer la vitesse moyenne en km/h ou mph sur une distance donnée (généralement 1 km ou 1 mile). Essentielle en course automobile."
              example="Si vous parcourez 1 km et que le chronographe indique 30 secondes, la lunette affiche 120 km/h."
              icon="🏎️"
            />
            <ScaleCard
              title="Échelle Télémétrique"
              description="Permet de calculer la distance d'un événement visible et audible (éclair/tonnerre, canon). Basée sur la vitesse du son (environ 340 m/s)."
              example="Chronométrez entre l'éclair et le tonnerre : le chrono indique la distance en km."
              icon="⚡"
            />
          </div>

          <div className="mt-8 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Compteurs</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Les chronographes comportent généralement <span className="font-semibold text-gray-900 dark:text-gray-100">3 sous-cadrans</span> (compteurs) :
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <span><span className="font-semibold">Compteur 30 minutes</span> : cumule les minutes écoulées</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <span><span className="font-semibold">Compteur 12 heures</span> : pour mesures longues</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <span><span className="font-semibold">Petite seconde courante</span> : affichage continu de l'heure normale</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modèles Légendaires */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Chronographes Légendaires
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <LegendCard
              name="Rolex Daytona"
              year="1963"
              description="Chronographe automobile iconique avec échelle tachymétrique. Modèle Paul Newman parmi les montres les plus recherchées au monde."
              icon="🏁"
            />
            <LegendCard
              name="Omega Speedmaster"
              year="1957"
              description="Premier chronographe sur la Lune (Apollo 11, 1969). Seul chronographe qualifié NASA pour missions spatiales. Moonwatch légendaire."
              icon="🌙"
            />
            <LegendCard
              name="TAG Heuer Carrera"
              year="1963"
              description="Design épuré inspiré de la course automobile. Lisibilité maximale, élégance sportive. Iconique de la marque TAG Heuer."
              icon="🏎️"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚙️ Explorez les Autres Complications
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Découvrez le Quantième, les Phases de Lune et le Tourbillon
            </p>
            <a
              href="/theorie/complications"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
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

function StatCard({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

interface FunctionCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

function FunctionCard({ number, title, description, icon, color }: FunctionCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">{icon}</span>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface MechanismCardProps {
  title: string;
  icon: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  color: string;
}

function MechanismCard({ title, icon, description, advantages, disadvantages, color }: MechanismCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">✅ Avantages</h4>
        <ul className="space-y-1 text-sm">
          {advantages.map((adv, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300">• {adv}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">⚠️ Inconvénients</h4>
        <ul className="space-y-1 text-sm">
          {disadvantages.map((dis, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300">• {dis}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface VariantCardProps {
  title: string;
  icon: string;
  description: string;
  color: string;
}

function VariantCard({ title, icon, description, color }: VariantCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}

interface ScaleCardProps {
  title: string;
  description: string;
  example: string;
  icon: string;
}

function ScaleCard({ title, description, example, icon }: ScaleCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{description}</p>
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-xs text-gray-700 dark:text-gray-300">
        <strong>Exemple :</strong> {example}
      </div>
    </div>
  );
}

interface LegendCardProps {
  name: string;
  year: string;
  description: string;
  icon: string;
}

function LegendCard({ name, year, description, icon }: LegendCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{year}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
