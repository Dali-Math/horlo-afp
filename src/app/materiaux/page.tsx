'use client'

import { useState } from 'react'
// ⚠️ Import spécial pour Next.js 14 (important !)
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper-bundle.css'

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
    colorClass: 'bg-sky-400',
    illustration: '/images/materiaux/acier.jpg',
    description:
      "Le matériau le plus utilisé pour les boîtiers et bracelets modernes. L'acier 316L combine résistance à la corrosion, robustesse et finitions impeccables (polies ou brossées).",
    useCases: [
      'Boîtiers & bracelets',
      'Couronnes vissées',
      'Boucles déployantes',
      'Masses oscillantes',
    ],
    category: 'Classiques',
  },
  {
    icon: '🟨',
    title: 'Or',
    colorClass: 'bg-yellow-500',
    illustration: '/images/materiaux/or.jpg',
    description:
      "Symbole ultime de luxe en horlogerie. L'or 18K (750/1000), disponible en jaune, rose ou blanc, est prisé pour sa noblesse et son éclat intemporel.",
    useCases: [
      'Boîtiers de montres de prestige',
      'Aiguilles et index',
      'Ponts hautement décorés',
      'Bracelets de luxe',
    ],
    category: 'Classiques',
  },
  {
    icon: '🥇',
    title: 'Laiton',
    colorClass: 'bg-yellow-700',
    illustration: '/images/materiaux/laiton.jpg',
    description:
      "Alliage de cuivre et zinc, base de la majorité des platines, ponts et roues. Facile à usiner, il offre une belle teinte jaune dorée souvent protégée par traitement galvanique.",
    useCases: [
      'Platines & ponts de mouvement',
      'Roues de minuterie',
      'Ébauches décoratives',
      'Compteurs et modules',
    ],
    category: 'Classiques',
  },
  {
    icon: '⚙️',
    title: 'Titane',
    colorClass: 'bg-indigo-500',
    illustration: '/images/materiaux/titane.jpg',
    description:
      "Matériau high-tech ultra-léger (40% plus léger que l'acier), hypoallergénique et non magnétique. Son aspect mat et sa résistance en font un favori des montres sportives et professionnelles.",
    useCases: [
      'Boîtiers de montres techniques',
      'Bracelets légers',
      'Vis spéciales',
      'Platines allégées',
    ],
    category: 'Innovation',
  },
  {
    icon: '⬛',
    title: 'Céramique',
    colorClass: 'bg-neutral-700',
    illustration: '/images/materiaux/ceramique.jpg',
    description:
      'Matériau composite extrêmement dur, pratiquement inrayable et résistant à l’usure. Sa finition mate ou brillante apporte un style contemporain et élégant.',
    useCases: [
      'Lunettes de montre (bezels)',
      'Boîtiers haut de gamme',
      'Composants décoratifs modernes',
    ],
    category: 'Innovation',
  },
  {
    icon: '🔬',
    title: 'Silicium',
    colorClass: 'bg-pink-600',
    illustration: '/images/materiaux/silicium.jpg',
    description:
      'Matériau révolutionnaire issu de la microtechnologie. Permet de fabriquer des composants de haute précision, amagnétiques et nécessitant peu ou pas de lubrification.',
    useCases: [
      'Spiraux de balancier inamagnétiques',
      'Ancre en silicium',
      'Roue d’échappement sans huile',
    ],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-rose-600',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      'Pierre précieuse synthétique utilisée comme palier antifriction. Les rubis réduisent considérablement l’usure des axes de roues et garantissent une longévité exceptionnelle au mouvement.',
    useCases: [
      'Pierres de pivot (axes des roues)',
      'Contrepoids de balancier',
      'Roulette d’ancre',
    ],
    category: 'Classiques',
  },
  {
    icon: '🌲',
    title: 'Bois',
    colorClass: 'bg-green-700',
    illustration: '/images/materiaux/bois.jpg',
    description:
      'Matériau rare et artisanal, utilisé par quelques créateurs pour des cadrans exclusifs ou des éléments décoratifs. Apporte une touche naturelle et unique à chaque pièce.',
    useCases: [
      'Cadrans exclusifs',
      'Boîtiers ou maillons décoratifs',
      'Maquettes pédagogiques',
    ],
    category: 'Décoratif',
  },
]

const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const
type Category = (typeof CATEGORIES)[number]

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
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-xl overflow-hidden transition-transform hover:shadow-2xl hover:scale-105 flex flex-col">
      <button
        type="button"
        className="w-full h-48 overflow-hidden focus:outline-none border-0 p-0 bg-transparent cursor-pointer"
        onClick={onImageClick}
        aria-label={`Voir ${title}`}
      >
        <img
          src={illustration}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl group-hover:brightness-95 transition"
        />
      </button>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center mb-4">
          <div
            className={`${colorClass} text-white rounded-full p-3 text-xl shadow-lg mr-4`}
          >
            {icon}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-3 text-sm flex-1">
          {description}
        </p>
        <ul className="list-disc pl-6 text-slate-700 dark:text-slate-200 text-sm">
          {useCases.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')

  const filtered =
    filter === 'Tous'
      ? MATERIALS
      : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-5xl font-extrabold text-gold dark:text-yellow-400 mb-10 text-center">
          Matériaux en Horlogerie Suisse
        </h1>

        <nav className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm ${
                filter === cat
                  ? 'bg-yellow-400 text-white'
                  : 'dark:bg-slate-800 bg-white hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-600 dark:hover:text-white text-gray-800 dark:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Carousel mobile */}
        <div className="block md:hidden">
          <Swiper spaceBetween={20} slidesPerView={1.15} centeredSlides>
            {filtered.map((material, i) => (
              <SwiperSlide key={i}>
                <MaterialCard {...material} onImageClick={() => {}} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grille desktop */}
        <section className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((material, i) => (
            <MaterialCard key={i} {...material} onImageClick={() => {}} />
          ))}
        </section>
      </div>
    </main>
  )
}
