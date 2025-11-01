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
    colorClass: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
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
    colorClass: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
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
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
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
    colorClass: 'bg-gradient-to-br from-neutral-700 to-neutral-900',
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
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
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
    colorClass: 'bg-gradient-to-br from-rose-500 to-rose-700',
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
    colorClass: 'bg-gradient-to-br from-green-600 to-green-800',
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

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'Tous': <Layers className="w-4 h-4" />,
  'Classiques': <Award className="w-4 h-4" />,
  'Innovation': <Sparkles className="w-4 h-4" />,
  'Décoratif': <Sparkles className="w-4 h-4" />,
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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <article
      className="group relative bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/10 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:-translate-y-2 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
      style={{ transitionDelay: '100ms' }}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-700 pointer-events-none z-10" />

      {/* Image avec overlay sophistiqué */}
      <button
        type="button"
        className="relative w-full h-56 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 border-0 p-0 bg-transparent cursor-pointer group/image"
        onClick={onImageClick}
        aria-label={`Voir une grande image de ${title}`}
      >
        <img
          src={illustration}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-1"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
        
        {/* Badge catégorie */}
        <div className={`absolute top-4 right-4 ${colorClass} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm transform translate-x-20 group-hover/image:translate-x-0 transition-transform duration-500`}>
          {icon}
        </div>
        
        {/* Indication zoom */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-900 dark:text-white shadow-xl">
            Cliquer pour agrandir
          </div>
        </div>
      </button>

      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* En-tête avec icône et titre */}
        <div className="flex items-start gap-4">
          <div className={`${colorClass} text-white rounded-2xl p-3.5 text-2xl shadow-lg shadow-current/20 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {title}
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full group-hover:w-24 transition-all duration-500" />
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1 text-[15px]">
          {description}
        </p>

        {/* Applications */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              Applications principales
            </span>
          </div>
          <ul className="space-y-2">
            {useCases.map((useCase, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200 group-hover:translate-x-1 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bordure lumineuse au survol */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-amber-400/50 ring-inset" />
    </article>
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
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fadein cursor-zoom-out px-4"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Bouton fermer */}
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10 group"
        onClick={onClose}
        aria-label="Fermer"
      >
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[95vw] rounded-3xl shadow-2xl border-4 border-amber-400/30 animate-zoomin"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filtered =
    filter === 'Tous'
      ? MATERIALS
      : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors relative overflow-hidden">
      
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Header avec effet glassmorphism */}
      <header className={`sticky top-0 z-30 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/5' 
          : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 group font-medium"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à la théorie</span>
          </Link>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center mb-16 animate-fadein space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full text-amber-800 dark:text-amber-300 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Excellence Horlogère Suisse
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400 leading-tight tracking-tight">
            Matériaux d'Exception
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            Du savoir-faire traditionnel aux technologies de pointe, explorez les matériaux 
            nobles qui donnent vie aux chefs-d'œuvre horlogers suisses.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-300" />
          </div>
        </header>

        {/* Filtres sophistiqués */}
        <nav className="flex justify-center gap-3 mb-12 flex-wrap animate-fadein" 
          style={{ animationDelay: '200ms' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="group relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 overflow-hidden ${filter === cat ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 scale-105' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:scale-105 border border-slate-200 dark:border-slate-700'}"
            >
              <span className="relative z-10 flex items-center gap-2">
                {CATEGORY_ICONS[cat]}
                {cat}
              </span>
              
              {/* Effet de brillance au survol */}
              {filter !== cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              )}
            </button>
          ))}
        </nav>

        {/* Carousel mobile premium */}
        <div className="block lg:hidden animate-fadein" style={{ animationDelay: '400ms' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="!pb-16"
            style={{ 
              '--swiper-pagination-color': '#f59e0b',
              '--swiper-pagination-bullet-inactive-color': '#94a3b8',
            } as React.CSSProperties}
          >
            {filtered.map((material, i) => (
              <SwiperSlide key={i} style={{ width: '90%', maxWidth: '400px' }}>
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

        {/* Grille desktop premium */}
        <section className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fadein" 
          style={{ animationDelay: '400ms' }}>
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

        {/* Section "À retenir" premium */}
        <section className="max-w-4xl mx-auto mt-20 animate-fadein" 
          style={{ animationDelay: '600ms' }}>
          <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-900/50 dark:to-amber-900/10 rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-200/50 dark:border-amber-800/30 backdrop-blur-sm overflow-hidden">
            
            {/* Effet décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-2xl shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400">
                  À retenir
                </h2>
              </div>
              
              <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-200">
                {[
                  'Tradition (or, acier, laiton) + Innovation (titane, céramique, silicium) = histoire vivante de l'horlogerie suisse.',
                  'Choix du matériau = identité de la montre (luxueuse, sportive, technique, artistique...).',
                  'Les finitions, traitements de surface et associations offrent des possibilités infinies !',
                ].map((point, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                      {i + 1}
                    </span>
                    <span className="flex-1 leading-relaxed font-medium pt-1">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {zoom && (
        <ZoomModal
          src={zoom.src}
          alt={zoom.alt}
          onClose={() => setZoom(null)}
        />
      )}

      <style jsx>{`
        @keyframes fadein {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes zoomin {
          from { 
            opacity: 0; 
            transform: scale(0.85) rotate(-2deg); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }
        
        .animate-fadein { 
          animation: fadein 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
        }
        
        .animate-zoomin { 
          animation: zoomin 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
        }
      `}</style>
    </main>
  )
}
