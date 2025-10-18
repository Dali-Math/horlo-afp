// app/[locale]/theorie/technologies/materiaux-innovants/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matériaux Innovants en Horlogerie | HorloLearn",
  description: "Découvrez les matériaux révolutionnaires : silicium Silinvar, céramique Cerachrom, alliages antimagnétiques Parachrom, graphène. Innovation horlogère suisse.",
  keywords: "silicium, Silinvar, céramique, Cerachrom, Parachrom, Nivachron, graphène, matériaux horlogers, antimagnétique, innovation",
};

export default function MateriauxInnovantsPage() {
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
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="mb-6">
            <span className="inline-block bg-white text-emerald-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Recherche & Développement
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">⚛️</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Matériaux Innovants
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-emerald-50 leading-relaxed max-w-4xl mb-8">
            Les manufactures suisses investissent massivement dans la recherche de matériaux révolutionnaires : silicium antimagnétique, céramique inrayable, alliages haute performance. Ces innovations repoussent les limites de la précision, durabilité et résistance aux champs magnétiques.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="2001" label="Premier silicium" />
            <StatCard number="15'000" label="Gauss (antimagnétique)" />
            <StatCard number="3x" label="Plus léger (silicium)" />
            <StatCard number="200x" label="Résistance (graphène)" />
          </div>
        </div>
      </section>

      {/* Silicium */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Le Silicium : Révolution Microélectronique
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Histoire et Introduction</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">silicium</span> (Si) a révolutionné l'horlogerie mécanique suisse depuis 2001, lorsque Ulysse Nardin présente la Freak, premier mouvement intégrant des composants en silicium monocristallin.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              En 2005, Patek Philippe fait sensation en lançant une roue d'ancre en silicium pour échappement à ancre suisse, marquant l'entrée en majesté du silicium dans l'horlogerie traditionnelle. Un consortium réunissant Patek Philippe, Rolex et le Swatch Group est créé au CSEM de Neuchâtel pour développer cette technologie.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              La solution Silinvar® (silicium oxydé) permet de créer des spiraux résistants aux variations de température et aux chocs. Aujourd'hui, 95% des montres Patek Philippe intègrent du silicium.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">✅ Avantages du Silicium</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Légèreté</span> : 3x plus léger que l'acier (2,33 kg/dm³)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Amagnétique</span> : insensible aux champs magnétiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Dureté élevée</span> : résistance à l'usure exceptionnelle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Élasticité</span> : 130-170 GPa, parfait pour spiraux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Sans lubrification</span> : aucun entretien nécessaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span><span className="font-semibold">Géométrie parfaite</span> : gravure DRIE ultra-précise</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">🔬 Applications Horlogères</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Spiral Silinvar®</span> : Patek Philippe Spiromax®</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Échappement</span> : ancre et roue d'échappement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Leviers</span> : mécanismes à lames flexibles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Roues</span> : optimisation dynamique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><span className="font-semibold">Ressorts</span> : composants élastiques haute performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-l-4 border-emerald-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">⚙️ Fabrication : Technologie DRIE</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Les composants en silicium sont fabriqués par <span className="font-semibold">gravure profonde DRIE</span> (Deep Reactive Ion Etching) en salle blanche. Cette technique de photolithographie permet une précision proche du micron avec une liberté de formes inconnue précédemment.
            </p>
          </div>
        </div>
      </section>

      {/* Alliages Antimagnétiques */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Alliages Antimagnétiques
          </h2>

          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Le <span className="font-semibold text-gray-900 dark:text-gray-100">magnétisme</span> est le problème n°1 du service après-vente horloger. Les champs magnétiques (smartphones, aimants, chargeurs sans fil) magnétisent les spiraux métalliques traditionnels, causant des variations de marche importantes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Les manufactures ont développé des alliages révolutionnaires résistant à des champs magnétiques extrêmes de <span className="font-semibold text-gray-900 dark:text-gray-100">15'000 gauss</span> (ISO norme : 4'800 gauss).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AlloyCard
              name="Parachrom"
              manufacturer="Rolex"
              description="Alliage paramagnétique niobium-zirconium avec revêtement bleu. Insensible aux variations de température et aux chocs. Présent dans tous les calibres Rolex modernes."
              resistance="15'000+ gauss"
              color="blue"
            />
            <AlloyCard
              name="Nivachron™"
              manufacturer="Swatch Group"
              description="Alliage amagnétique compensateur développé en partenariat avec Audemars Piguet (2018). Alternative métallique au silicium pour marques du groupe."
              resistance="15'000 gauss"
              color="green"
            />
            <AlloyCard
              name="Chronergy"
              manufacturer="Rolex"
              description="Échappement optimisé en alliage nickel-phosphore. Rendement énergétique accru de 15%, permettant d'augmenter la réserve de marche à 70h."
              resistance="Antimagnétique"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Céramique */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Céramique Haute Performance
          </h2>

          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              La <span className="font-semibold text-gray-900 dark:text-gray-100">céramique technique</span> utilisée en horlogerie est constituée de poudres polycristallines (silicates, oxyde d'aluminium, carbure de silicium) frittées à haute température.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Popularisée par Rolex avec le Cerachrom pour les lunettes de plongée, la céramique offre une dureté exceptionnelle proche du diamant, une résistance aux rayures et une inaltérabilité des couleurs sur des décennies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">✨ Propriétés Céramique</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Dureté 9 Mohs</span> : quasi inrayable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Hypoallergénique</span> : biocompatible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Légère</span> : confortable au porter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Couleur indélébile</span> : teinte dans la masse</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">🎨 Applications</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Lunettes Cerachrom</span> : Rolex Submariner, GMT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Boîtiers complets</span> : Rado, IWC, Hublot</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">•</span>
                  <span><span className="font-semibold">Bracelets</span> : maillons haute résistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Autres Matériaux */}
      <section className="bg-white dark:bg-neutral-900 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Autres Matériaux d'Avenir
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MaterialCard
              icon="⚫"
              name="Graphène"
              description="200x plus résistant que l'acier. Matériau du futur en phase expérimentale pour spiraux ultra-légers et résistants."
            />
            <MaterialCard
              icon="🪨"
              name="Titane"
              description="Grade 2 et Grade 5 : légèreté (45% plus léger que l'acier), hypoallergénique, résistance corrosion. Rolex, Omega, Panerai."
            />
            <MaterialCard
              icon="🔷"
              name="Carbone"
              description="Composites carbone haute performance. Ultraléger, design technique. TAG Heuer, Hublot, Richard Mille."
            />
            <MaterialCard
              icon="✨"
              name="Magic Gold"
              description="Hublot : or inrayable (céramique + or 24K). Dureté 1'000 Vickers, scratch-proof absolu."
            />
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              🚀 L'Avenir des Matériaux Horlogers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              Les manufactures suisses investissent des millions en R&D pour développer les matériaux de demain : graphène, nanotubes de carbone, alliages métalliques à mémoire de forme. L'objectif : précision chronométrique absolue, durabilité exceptionnelle, et résistance totale aux agressions extérieures (magnétisme, chocs, température).
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Explorez Toute la Théorie Horlogère
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              Découvrez les Manufactures, Complications et Fondamentaux de l'Horlogerie Suisse
            </p>
            <a
              href="/theorie"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Retour à la Théorie
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

// Components simplifiés
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

interface AlloyCardProps {
  name: string;
  manufacturer: string;
  description: string;
  resistance: string;
  color: 'blue' | 'green' | 'purple';
}

function AlloyCard({ name, manufacturer, description, resistance, color }: AlloyCardProps) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  };
  
  return (
    <div className={`border rounded-xl p-6 ${colors[color]}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{manufacturer}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{description}</p>
      <div className="bg-white dark:bg-neutral-800 rounded px-3 py-1 text-xs font-bold text-center">
        {resistance}
      </div>
    </div>
  );
}

function MaterialCard({ icon, name, description }: { icon: string; name: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
