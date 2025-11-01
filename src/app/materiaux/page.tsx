'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Sparkles, Award, Layers } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

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
      "Le matériau le plus utilisé pour les boîtiers et bracelets modernes. L'acier 316L combine résistance à la corrosion, robustesse et finitions impeccables (polies ou brossées).",
    useCases: ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes'],
    category: 'Classiques',
  },
  {
    icon: '🟨',
    title: 'Or',
    colorClass: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    illustration: '/images/materiaux/or.jpg',
    description:
      "Symbole ultime de luxe en horlogerie. L'or 18K (750/1000), disponible en jaune, rose ou blanc, est prisé pour sa noblesse et son éclat intemporel.",
    useCases: ['Boîtiers de montres de prestige', 'Aiguilles et index', 'Ponts hautement décorés', 'Bracelets de luxe'],
    category: 'Classiques',
  },
  {
    icon: '🥇',
    title: 'Laiton',
    colorClass: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
    illustration: '/images/materiaux/laiton.jpg',
    description:
      "Alliage de cuivre et zinc, base de la majorité des platines, ponts et roues. Facile à usiner, il offre une belle teinte jaune dorée souvent protégée par traitement galvanique.",
    useCases: ['Platines & ponts de mouvement', 'Roues de minuterie', 'Ébauches décoratives', 'Compteurs et modules'],
    category: 'Classiques',
  },
  {
    icon: '⚙️',
    title: 'Titane',
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    illustration: '/images/materiaux/titane.jpg',
    description:
      "Matériau high-tech ultra-léger (40% plus léger que l'acier), hypoallergénique et non magnétique. Son aspect mat et sa résistance en font un favori des montres sportives et professionnelles.",
    useCases: ['Boîtiers de montres techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'],
    category: 'Innovation',
  },
  {
    icon: '⬛',
    title: 'Céramique',
    colorClass: 'bg-gradient-to-br from-neutral-700 to-neutral-900',
    illustration: '/images/materiaux/ceramique.jpg',
    description:
      "Matériau composite extrêmement dur, pratiquement inrayable et résistant à l'usure. Sa finition mate ou brillante apporte un style contemporain et élégant.",
    useCases: ['Lunettes de montre (bezels)', 'Boîtiers haut de gamme', 'Composants décoratifs modernes'],
    category: 'Innovation',
  },
  {
    icon: '🔬',
    title: 'Silicium',
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    illustration: '/images/materiaux/silicium.jpg',
    description:
      'Matériau révolutionnaire issu de la microtechnologie. Permet de fabriquer des composants de haute précision, amagnétiques et nécessitant peu ou pas de lubrification.',
    useCases: ['Spiraux de balancier inamagnétiques', 'Ancre en silicium', "Roue d'échappement sans huile"],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-gradient-to-br from-rose-500 to-rose-700',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      "Pierre précieuse synthétique utilisée comme palier antifriction. Les rubis réduisent considérablement l'usure des axes de roues et garantissent une longévité exceptionnelle au mouvement.",
    useCases: ['Pierres de pivot (axes des roues)', 'Contrepoids de balancier', "Roulette d'ancre"],
    category: 'Classiques',
  },
  {
    icon: '🌲',
    title: 'Bois',
    colorClass: 'bg-gradient-to-br from-green-600 to-green-800',
    illustration: '/images/materiaux/bois.jpg',
    description:
      'Matériau rare et artisanal, utilisé par quelques créateurs pour des cadrans exclusifs ou des éléments décoratifs. Apporte une touche naturelle et unique à chaque pièce.',
    useCases: ['Cadrans exclusifs', 'Boîtiers ou maillons décoratifs', 'Maquettes pédagogiques'],
    category: 'Décoratif',
  },
]

const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Tous: <Layers className="w-4 h-4" />,
  Classiques: <Award className="w-4 h-4" />,
  Innovation: <Sparkles className="w-4 h-4" />,
  Décoratif: <Sparkles className="w-4 h-4" />,
}

function MaterialCard({
  icon,
  title,
  colorClass,
  description,
  useCases,
  illustration,
  onImageClick,
}: Material & { onImageClick: () => void }) {
  return (
    <article className="group relative bg-white/90 dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm">
      <button
        type="button"
        className="relative w-full h-48 sm:h-56 overflow-hidden border-0 p-0 bg-transparent cursor-pointer"
        onClick={onImageClick}
        aria-label={`Voir une grande image de ${title}`}
      >
        <img src={illustration} alt={title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
      </button>

      <div className="p-6 flex flex-col space-y-3">
        <div className="flex items-start gap-3">
          <div className={`${colorClass} text-white rounded-2xl p-2.5 text-xl shadow-md`}>{icon}</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition">
            {title}
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{description}</p>

        <ul className="border-t border-slate-200 dark:border-slate-700/50 pt-3 mt-2 text-sm text-slate-700 dark:text-slate-200 space-y-1.5">
          {useCases.map((u, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-amber-500">▸</span>
              {u}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center">
      <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl border-4 border-amber-400/30" />
    </div>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null)

  const filtered = filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl sm:text-6xl font-black text-center mb-10 text-amber-400">Matériaux d'Exception</h1>

        <nav className="flex justify-center gap-3 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">{CATEGORY_ICONS[cat]} {cat}</span>
            </button>
          ))}
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch">
    {filtered.map((material, i) => (
      <div key={i} className="h-full">
        <MaterialCard
          {...material}
          onImageClick={() => setZoom({ src: material.illustration, alt: material.title })}
        />
      </div>
    ))}
  </section>
</div>
      </div>

      {zoom && <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </main>
  )
}
