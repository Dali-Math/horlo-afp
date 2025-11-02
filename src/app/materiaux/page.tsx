'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  Gem,
  Layers,
  Sparkles,
  Award,
  FileText,
} from 'lucide-react'

/* ----------------------------- Données cartes ----------------------------- */

type Material = {
  icon: string
  title: string
  colorClass: string
  illustration: string
  description: string
  useCases: string[]
  category: 'Classiques' | 'Innovation' | 'Décoratif'
}

const MATERIALS: Material[] = [
  {
    icon: '⬜',
    title: 'Acier inoxydable',
    colorClass: 'bg-gradient-to-br from-sky-400 to-sky-600',
    illustration: '/images/materiaux/acier.jpg',
    description:
      "Le matériau le plus utilisé pour boîtiers et bracelets modernes. L'acier 316L combine résistance à la corrosion, robustesse et finitions impeccables.",
    useCases: ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes'],
    category: 'Classiques',
  },
  {
    icon: '🟨',
    title: 'Or',
    colorClass: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    illustration: '/images/materiaux/or.jpg',
    description:
      "Symbole ultime de luxe. L'or 18K (750/1000), jaune, rose ou blanc, est prisé pour sa noblesse et son éclat intemporel.",
    useCases: ['Boîtiers de prestige', 'Aiguilles & index', 'Ponts décorés', 'Bracelets luxe'],
    category: 'Classiques',
  },
  {
    icon: '🥇',
    title: 'Laiton',
    colorClass: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
    illustration: '/images/materiaux/laiton.jpg',
    description:
      'Alliage Cu-Zn, base de la majorité des platines, ponts et roues. Facile à usiner, souvent protégé par traitement galvanique.',
    useCases: ['Platines & ponts', 'Roues de minuterie', 'Ébauches', 'Compteurs & modules'],
    category: 'Classiques',
  },
  {
    icon: '⚙️',
    title: 'Titane',
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    illustration: '/images/materiaux/titane.jpg',
    description:
      "Matériau high-tech ultra-léger (≈40 % plus léger que l'acier), hypoallergénique et non magnétique. Aspect mat, très résistant.",
    useCases: ['Boîtiers techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'],
    category: 'Innovation',
  },
  {
    icon: '⬛',
    title: 'Céramique',
    colorClass: 'bg-gradient-to-br from-neutral-700 to-neutral-900',
    illustration: '/images/materiaux/ceramique.jpg',
    description:
      "Composite extrêmement dur, quasi inrayable et résistant à l'usure. Finition mate ou brillante, style contemporain.",
    useCases: ['Lunettes (bezels)', 'Boîtiers haut de gamme', 'Éléments décoratifs'],
    category: 'Innovation',
  },
  {
    icon: '🔬',
    title: 'Silicium',
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    illustration: '/images/materiaux/silicium.jpg',
    description:
      'Issu de la microtech. Composants de haute précision, amagnétiques, peu/pas de lubrification.',
    useCases: ['Spiraux amagnétiques', 'Ancre en silicium', "Roue d’échappement sans huile"],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-gradient-to-br from-rose-500 to-rose-700',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      "Palier antifriction. Réduit l'usure des axes et garantit une longévité exceptionnelle du mouvement.",
    useCases: ['Pierres de pivot', 'Contrepoids de balancier', "Roulette d’ancre"],
    category: 'Classiques',
  },
  {
    icon: '🌲',
    title: 'Bois',
    colorClass: 'bg-gradient-to-br from-green-600 to-green-800',
    illustration: '/images/materiaux/bois.jpg',
    description:
      'Matériau artisanal pour cadrans exclusifs et éléments décoratifs. Chaque pièce est unique.',
    useCases: ['Cadrans exclusifs', 'Boîtiers/maillons décoratifs', 'Maquettes pédagogiques'],
    category: 'Décoratif',
  },
]

const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const
type Category = (typeof CATEGORIES)[number]

/* ----------------------------- Composant carte ----------------------------- */

function MaterialCard({
  icon,
  title,
  colorClass,
  description,
  useCases,
  illustration,
}: Material) {
  return (
    <article className="group relative bg-white/90 dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
      <div className="w-full h-36 overflow-hidden">
        <img
          src={illustration}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className={`${colorClass} text-white rounded-xl px-2.5 py-1 text-base shadow`}>{icon}</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>

        <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>

        <ul className="pt-2 border-t border-slate-200 dark:border-slate-700/50 text-[13px] text-slate-700 dark:text-slate-200 space-y-1">
          {useCases.map((u, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-500 -mt-0.5">▸</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/* ---------------------------------- Page ---------------------------------- */

export default function MateriauxHorlogersSuisse() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [isLoading, setIsLoading] = useState(true)

  const filtered =
    filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  const infos = [
    { icon: Gem, label: 'Matériaux d’Excellence', value: '9 Types' },
    { icon: Layers, label: 'Catégories', value: '3 Principales' },
    { icon: Sparkles, label: 'Innovations récentes', value: 'Silicium, Titane' },
    { icon: Award, label: 'Origine', value: '100% Suisse' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* ---------------------------- HERO (comme rapport) ---------------------------- */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-24 right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-24 left-24 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
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
                L’union parfaite entre tradition, recherche et design suisse. Explorez les
                matériaux d’exception qui façonnent la haute horlogerie.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Page de référence — HorloLearn.ch
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {infos.map((info, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <info.icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">{info.value}</div>
                  <div className="text-sm text-gray-400">{info.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- Filtres + Grille ----------------------------- */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Filtres */}
        <nav className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Grille de cartes (compacte comme avant) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, i) => (
            <MaterialCard key={i} {...m} />
          ))}
        </div>
      </section>

      {/* ------------------------------ Fenêtre intégrée ----------------------------- */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Chargement de la page…</p>
              </div>
            </div>
          )}

          <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Layers className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Matériaux Horlogers Suisses — Présentation</h3>
                  <p className="text-xs text-gray-400">
                    Contenu HTML intégré depuis votre page statique
                  </p>
                </div>
              </div>
            </div>

            <iframe
              src="materiaux-horlogers-suisse.html#hero"
              className="w-full h-[140vh] bg-white"
              onLoad={() => setIsLoading(false)}
              title="Matériaux Horlogers Suisses"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
