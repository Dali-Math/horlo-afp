'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, MapPin, Building2, Wrench, Award } from 'lucide-react'

type Region = 'geneve' | 'vallee' | 'neuchatel' | 'bienne'

const REGIONS = {
  geneve: {
    title: 'Genève – Capitale de la Haute Horlogerie',
    description:
      "Berceau des plus grandes Maisons horlogères, Genève incarne le prestige, la précision et le savoir-faire séculaire. C’est ici que se créent les garde-temps les plus exclusifs au monde.",
    specialites: [
      'Haute horlogerie & finitions à la main',
      'Complications tourbillon, répétition minutes',
      'Décoration (anglage, perlage, côtes de Genève)',
    ],
    entreprises: ['Patek Philippe', 'Rolex', 'Vacheron Constantin', 'F.P. Journe'],
  },
  vallee: {
    title: 'Vallée de Joux – Cœur Mécanique de la Suisse',
    description:
      'Située dans le Jura vaudois, la Vallée de Joux abrite les artisans les plus talentueux du monde en matière de complications horlogères et de mouvements mécaniques.',
    specialites: [
      'Mouvements à grandes complications',
      'Assemblage manuel de haute précision',
      'Horlogerie traditionnelle',
    ],
    entreprises: ['Audemars Piguet', 'Jaeger-LeCoultre', 'Blancpain'],
  },
  neuchatel: {
    title: 'Neuchâtel – Cœur Industriel',
    description:
      'Bastion de la fabrication de mouvements en grande série et des composants de précision. L’innovation technologique et la productivité y sont au cœur de la performance suisse.',
    specialites: [
      'Mouvements grande série',
      'Décolletage de précision',
      'Fabrication de spiraux',
      'Sous-traitance spécialisée',
    ],
    entreprises: ['ETA', 'Sellita', 'Nivarox-FAR'],
  },
  bienne: {
    title: 'Bienne – Capitale du Mouvement Automatique',
    description:
      'Pôle industriel stratégique et technologique, Bienne concentre la production de calibres automatiques et les bureaux techniques des plus grandes marques suisses.',
    specialites: [
      'Fabrication automatisée de mouvements',
      'Assemblage robotisé',
      'Tests chronométriques certifiés COSC',
    ],
    entreprises: ['Omega', 'Tissot', 'Swatch Group'],
  },
}

export default function MateriauxHorlogersSuisse() {
  const [activeRegion, setActiveRegion] = useState<Region>('geneve')

  const region = REGIONS[activeRegion]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-24 right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-24 left-24 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          {/* Fil d’Ariane */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link
              href="/horlogerie"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Horlogerie Suisse
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Matériaux Horlogers</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-amber-400">Swiss Watch Materials</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Excellence et Innovation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                  dans les Matériaux Horlogers
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                L’union parfaite entre tradition, recherche et design suisse. Découvrez les grandes régions
                horlogères et leurs savoir-faire uniques.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Page de référence — HorloLearn.ch
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Régions', value: '4' },
                { icon: Building2, label: 'Entreprises majeures', value: '15+' },
                { icon: Wrench, label: 'Spécialités', value: '20+' },
                { icon: Award, label: 'Excellence suisse', value: '100%' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <stat.icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ONGLET REGIONS ---------- */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Boutons d’onglets */}
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.keys(REGIONS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveRegion(key as Region)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeRegion === key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                {REGIONS[key as Region].title.split(' – ')[0]}
              </button>
            ))}
          </div>

          {/* Contenu dynamique */}
          <div className="transition-all duration-300">
            <h2 className="text-3xl font-bold text-amber-400 mb-3">{region.title}</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">{region.description}</p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Spécialités</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {region.specialites.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Entreprises</h3>
                <div className="flex flex-wrap gap-2">
                  {region.entreprises.map((ent, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                    >
                      {ent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
