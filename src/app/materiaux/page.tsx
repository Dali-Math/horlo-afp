'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// --- Styles Swiper (à garder impérativement) ---
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

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
      "Matériau composite extrêmement dur, pratiquement inrayable et résistant à l'usure. Sa finition mate ou brillante apporte un style contemporain et élégant.",
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
      "Roue d'échappement sans huile",
    ],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-rose-600',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      "Pierre précieuse synthétique utilisée comme palier antifriction. Les rubis réduisent considérablement l'usure des axes de roues et garantissent une longévité exceptionnelle au mouvement.",
    useCases: [
      'Pierres de pivot (axes des roues)',
      'Contrepoids de balancier',
      "Roulette d'ancre",
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
        aria-label={`Voir une grande image de ${title}`}
      >
        <img
          src={illustration}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl group-hover:brightness-95 transition"
          loading="lazy"
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
        <p className="text-slate-700 dark:text-slate-300 mb-3 text-sm leading-relaxed flex-1">
          {description}
        </p>
        <div>
          <span className="block uppercase text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
            Applications
          </span>
          <ul className="list-disc pl-6 text-slate-700 dark:text-slate-200 text-sm space-y-1">
            {useCases.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ZoomModal({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  return (
    <div
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fadein cursor-zoom-out"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-2xl border-4 border-yellow-300/50 animate-zoomin"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null)

  const filtered =
    filter === 'Tous'
      ? MATERIALS
      : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Header Section */}
        <header className="max-w-3xl mx-auto text-center mb-14 animate-fadein">
          <h1 className="text-5xl font-extrabold text-gold dark:text-yellow-400 mb-4 tracking-tight">
            Matériaux en Horlogerie Suisse
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-200 font-medium">
            Du savoir-faire traditionnel aux technologies de pointe, découvrez
            les matériaux qui façonnent les chefs-d'œuvre suisses.
          </p>
        </header>

        {/* Filtres */}
        <nav className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all border border-transparent shadow ${
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
        <div className="block md:hidden animate-fadein">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            centeredSlides
            style={{ paddingBottom: 24 }}
          >
            {filtered.map((material, i) => (
              <SwiperSlide key={i}>
                <MaterialCard
                  {...material}
                  onImageClick={() =>
                    setZoom({
                      src: material.illustration,
                      alt: material.title,
                    })
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grille desktop */}
        <section className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-8 animate-fadein">
          {filtered.map((material, i) => (
            <MaterialCard
              key={i}
              {...material}
              onImageClick={() =>
                setZoom({ src: material.illustration, alt: material.title })
              }
            />
          ))}
        </section>

        {/* Section À retenir */}
        <section className="max-w-2xl mx-auto mt-16 bg-white/90 dark:bg-slate-900/80 rounded-xl px-7 py-8 shadow text-slate-900 dark:text-slate-100 animate-fadein">
          <h2 className="text-2xl font-bold text-[#E2B44F] mb-2">À retenir</h2>
          <ul className="text-lg leading-relaxed list-disc pl-6 space-y-2 font-medium">
            <li>
              Tradition (or, acier, laiton) + Innovation (titane, céramique,
              silicium) = histoire vivante de l'horlogerie suisse.
            </li>
            <li>
              Choix du matériau = identité de la montre (luxueuse, sportive,
              technique, artistique...).
            </li>
            <li>
              Les finitions, traitements de surface et associations offrent des
              possibilités infinies !
            </li>
          </ul>
        </section>
      </div>

      {/* Modale Zoom */}
      {zoom && (
        <ZoomModal
          src={zoom.src}
          alt={zoom.alt}
          onClose={() => setZoom(null)}
        />
      )}

      {/* Animations CSS */}
      <style>{`
        .animate-fadein {
          animation: fadein 0.8s ease;
        }
        .animate-zoomin {
          animation: zoomin 0.35s cubic-bezier(.23,1.25,.32,1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        @keyframes zoomin {
          from { opacity:0; transform: scale(.7);}
          to { opacity:1; transform: scale(1);}
        }
      `}</style>
    </main>
  )
}
