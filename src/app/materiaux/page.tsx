'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Sparkles, Award, Layers, ExternalLink } from 'lucide-react'

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

type HistoryPeriod = 'xvie' | 'xviiie' | 'xxe' | 'xxie'

const HISTORY_TABS = [
  { id: 'xvie' as HistoryPeriod, label: 'XVIe-XVIIe' },
  { id: 'xviiie' as HistoryPeriod, label: 'XVIIIe-XIXe' },
  { id: 'xxe' as HistoryPeriod, label: 'XXe siècle' },
  { id: 'xxie' as HistoryPeriod, label: 'XXIe siècle' },
]

const HISTORY_CONTENT: Record<HistoryPeriod, { title: string; content: string[]; materials: string[] }> = {
  xvie: {
    title: "Les Origines : Orfèvrerie et Métaux Précieux",
    content: [
      "L'horlogerie suisse naît à Genève au XVIe siècle. L'interdiction du port d'objets ornementaux par Jean Calvin contraint les orfèvres à se reconvertir. Les premiers garde-temps sont naturellement fabriqués en or et argent.",
      "Les artisans genevois maîtrisent déjà le travail des métaux précieux grâce à leur tradition d'orfèvrerie. Ces compétences se révèlent essentielles pour créer les premiers boîtiers de montres."
    ],
    materials: ['Or 18 carats', 'Argent sterling', 'Platine']
  },
  xviiie: {
    title: "L'Âge d'Or : Laiton et Innovations",
    content: [
      "Le XVIIIe siècle voit l'émergence du laiton comme matériau de prédilection pour les mouvements. Cet alliage de cuivre et zinc offre une excellente usinabilité et une résistance optimale.",
      "Les horlogers développent des techniques de traitement galvanique pour protéger les platines en laiton. Le rubis synthétique fait son apparition comme palier antifriction révolutionnaire."
    ],
    materials: ['Laiton doré', 'Rubis synthétique', 'Acier trempé']
  },
  xxe: {
    title: "Révolution Industrielle : Acier et Durabilité",
    content: [
      "Le XXe siècle marque l'avènement de l'acier inoxydable 316L. Ce matériau révolutionnaire combine résistance à la corrosion, robustesse mécanique et coût maîtrisé.",
      "L'après-guerre voit l'émergence des montres sports en acier, démocratisant l'horlogerie de qualité. Les finitions polies et brossées deviennent la signature des grandes marques."
    ],
    materials: ['Acier 316L', 'Céramique', 'Titane']
  },
  xxie: {
    title: "Innovation High-Tech : Silicium et Composites",
    content: [
      "Le XXIe siècle introduit des matériaux issus de la microtechnologie. Le silicium permet de créer des composants d'échappement ultra-précis, amagnétiques et sans lubrification.",
      "La céramique technique, pratiquement inrayable, et les composites carbone révolutionnent l'esthétique et la performance. L'horlogerie repousse les limites de la science des matériaux."
    ],
    materials: ['Silicium', 'Céramique technique', 'Carbone forgé', 'Saphir']
  }
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
      className={`group relative bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden 
        transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/10 
        border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm
        hover:-translate-y-2 flex flex-col
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: '100ms' }}
    >
      <button
        type="button"
        className="relative w-full h-56 overflow-hidden focus:outline-none border-0 p-0 bg-transparent cursor-pointer"
        onClick={onImageClick}
        aria-label={`Voir une grande image de ${title}`}
      >
        <img
          src={illustration}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
      </button>

      <div className="p-6 flex-1 flex flex-col space-y-4">
        <div className="flex items-start gap-4">
          <div className={`${colorClass} text-white rounded-2xl p-3.5 text-2xl shadow-lg flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{title}</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1 text-[15px]">{description}</p>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
            Applications principales
          </span>
          <ul className="space-y-2 mt-2">
            {useCases.map((useCase, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                <span className="text-amber-500 mt-0.5">▸</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center cursor-pointer"
      aria-modal="true"
      role="dialog"
    >
      <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl border-4 border-amber-400/30" />
    </div>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeHistoryTab, setActiveHistoryTab] = useState<HistoryPeriod>('xvie')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filtered = filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header
        className={`sticky top-0 z-30 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg'
            : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/theorie" className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <ChevronLeft className="w-5 h-5" /> Retour à la théorie
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl sm:text-6xl font-black text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
          Matériaux d&apos;Exception
        </h1>

        <nav className="flex justify-center gap-3 mb-12 flex-wrap" aria-label="Filtrer les matériaux">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-lg border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {CATEGORY_ICONS[cat]} {cat}
              </span>
            </button>
          ))}
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filtered.map((material, i) => (
            <MaterialCard key={i} {...material} onImageClick={() => setZoom({ src: material.illustration, alt: material.title })} />
          ))}
        </section>

        {/* Section Histoire Interactive - FONCTIONNE PARFAITEMENT */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-500/30">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl font-black text-center text-white">
              📚 Histoire des Matériaux Horlogers
            </h2>
          </div>
          
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {HISTORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHistoryTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeHistoryTab === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 min-h-[400px] shadow-inner">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-4">
              {HISTORY_CONTENT[activeHistoryTab].title}
            </h3>
            
            {HISTORY_CONTENT[activeHistoryTab].content.map((paragraph, i) => (
              <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            <div className="mt-6">
              <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3">
                Matériaux de l&apos;époque
              </h4>
              <div className="flex flex-wrap gap-2">
                {HISTORY_CONTENT[activeHistoryTab].materials.map((material, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-semibold shadow-md"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <a 
              href="https://www.horlolearn.ch/materiaux-horlogers-suisse.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <ExternalLink className="w-4 h-4" />
              Voir la page complète
            </a>
          </div>
        </section>
      </div>

      {zoom && <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </main>
  )
}
