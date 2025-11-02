'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Gem,
} from 'lucide-react'

/* =========================
   Petits composants utilitaires
========================= */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element
  label: string
  value: string
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-3 mb-3">{icon}</div>
      <div className="text-3xl font-bold text-amber-400 mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
      {children}
    </span>
  )
}

function Bullet({ children }: { children: string }) {
  return (
    <li className="pl-4 text-gray-200 relative">
      <span className="absolute left-0 top-2 block w-1.5 h-1.5 rounded-full bg-amber-400" />
      {children}
    </li>
  )
}

/* =========================
   Données — Matériaux
========================= */
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
      "Matériau roi des boîtiers et bracelets modernes. L'acier 316L combine résistance à la corrosion, robustesse et superbes finitions.",
    useCases: ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes'],
    category: 'Classiques',
  },
  {
    icon: '🟨',
    title: 'Or',
    colorClass: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    illustration: '/images/materiaux/or.jpg',
    description:
      "Symbole de luxe. L'or 18K (750/1000), en jaune, rose ou blanc, est prisé pour son éclat et sa noblesse.",
    useCases: ['Boîtiers prestige', 'Aiguilles & index', 'Ponts décorés', 'Bracelets haut de gamme'],
    category: 'Classiques',
  },
  {
    icon: '🥇',
    title: 'Laiton',
    colorClass: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
    illustration: '/images/materiaux/laiton.jpg',
    description:
      "Alliage cuivre+zinc. Base des platines, ponts et roues. Facile à usiner, souvent protégé par traitements.",
    useCases: ['Platines & ponts', 'Roues de minuterie', 'Ébauches', 'Modules'],
    category: 'Classiques',
  },
  {
    icon: '⚙️',
    title: 'Titane',
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    illustration: '/images/materiaux/titane.jpg',
    description:
      "Ultra-léger (-40% vs acier), hypoallergénique, amagnétique. Aspect technique mat.",
    useCases: ['Boîtiers techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'],
    category: 'Innovation',
  },
  {
    icon: '⬛',
    title: 'Céramique',
    colorClass: 'bg-gradient-to-br from-neutral-700 to-neutral-900',
    illustration: '/images/materiaux/ceramique.jpg',
    description:
      "Composite quasi inrayable, très résistant à l’usure. Finitions mates ou brillantes, style contemporain.",
    useCases: ['Lunettes (bezel)', 'Boîtiers premium', 'Éléments décoratifs'],
    category: 'Innovation',
  },
  {
    icon: '🔬',
    title: 'Silicium',
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    illustration: '/images/materiaux/silicium.jpg',
    description:
      'Matériau issu de la microtech. Tolérances élevées, amagnétique, faible lubrification.',
    useCases: ['Spiraux', 'Ancre', "Roue d’échappement"],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-gradient-to-br from-rose-500 to-rose-700',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      "Paliers antifriction. Réduisent l’usure des axes de roues et assurent longévité du mouvement.",
    useCases: ['Pierres de pivot', 'Contrepoids de balancier', "Roulette d’ancre"],
    category: 'Classiques',
  },
  {
    icon: '🌲',
    title: 'Bois',
    colorClass: 'bg-gradient-to-br from-green-600 to-green-800',
    illustration: '/images/materiaux/bois.jpg',
    description:
      'Matériau artisanal et rare pour cadrans exclusifs. Signature visuelle unique.',
    useCases: ['Cadrans exclusifs', 'Boîtiers/maillons décoratifs', 'Maquettes pédagogiques'],
    category: 'Décoratif',
  },
]

/* =========================
   Matériaux — Carte
========================= */
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
    <article className="group relative bg-white/5 dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm">
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
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">{title}</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{description}</p>

        <ul className="border-t border-white/10 pt-3 mt-2 text-sm text-slate-200 space-y-1.5">
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
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[95vw] rounded-3xl shadow-2xl border-4 border-amber-400/30"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

/* =========================
   Régions horlogères
========================= */
type RegionKey = 'geneve' | 'vallee' | 'neuchatel' | 'bienne'

const REGIONS: Record<
  RegionKey,
  {
    titre: string
    intro: string
    specs: string[]
    companies: string[]
  }
> = {
  geneve: {
    titre: 'Genève – Capitale de la Haute Horlogerie',
    intro:
      'Berceau des grandes Maisons. Prestige, précision et savoir-faire séculaire. C’est ici que se créent les garde-temps les plus exclusifs.',
    specs: [
      "Haute horlogerie & finitions à la main",
      'Complications tourbillon, répétition minutes',
      'Décorations (anglage, perlage, côtes de Genève)',
    ],
    companies: ['Patek Philippe', 'Rolex', 'Vacheron Constantin', 'F.P. Journe'],
  },
  vallee: {
    titre: 'Vallée de Joux – Ingénierie & Complications',
    intro:
      'Vallée mythique de l’horlogerie. Tradition mécanique, grandes complications et savoir-faire micromécanique.',
    specs: ['Calendriers perpétuels', 'Répétitions minutes', 'Échappements complexes'],
    companies: ['Audemars Piguet', 'Jaeger-LeCoultre', 'Breguet (L’Orient)'],
  },
  neuchatel: {
    titre: 'Neuchâtel – Cœur Industriel',
    intro:
      'Bastion de la fabrication de mouvements en série et de composants de précision.',
    specs: ['Mouvements grande série', 'Décolletage de précision', 'Spiraux', 'Sous-traitance spécialisée'],
    companies: ['ETA', 'Sellita', 'Nivarox-FAR'],
  },
  bienne: {
    titre: 'Bienne – Mouvements & Innovation',
    intro:
      'Pôle industriel majeur. Fabrication, R&D et automatisation de pointe.',
    specs: ['Assemblage de mouvements', 'Automatisation', 'Qualité & industrialisation'],
    companies: ['Rolex Bienne', 'Omega (Swatch Group)', 'Tissot'],
  },
}

/* =========================
   Chronologie (simple)
========================= */
function Chronologie() {
  const [periode, setPeriode] = useState<'XVI' | 'XVIII' | 'XX' | 'XXI'>('XVI')

  const DATA = {
    XVI: {
      titre: 'Origines : orfèvrerie et métaux précieux',
      texte: [
        "L’horlogerie suisse naît à Genève au XVIe siècle.",
        "Les orfèvres se reconvertissent et créent les premiers garde-temps en or/argent.",
      ],
      tags: ['Or 18K', 'Argent', 'Platine'],
    },
    XVIII: {
      titre: 'Ère mécanique et alliages',
      texte: [
        'L’industrialisation amène l’acier trempé, laiton, émail, gravure.',
        'Montée en puissance des ateliers spécialisés.',
      ],
      tags: ['Acier', 'Laiton', 'Émail'],
    },
    XX: {
      titre: 'Modernisation & nouveaux matériaux',
      texte: [
        'Titane, céramique et quartz transforment l’usage et la précision.',
        'Production plus large, standardisation.',
      ],
      tags: ['Titane', 'Céramique', 'Quartz'],
    },
    XXI: {
      titre: 'Innovation high-tech',
      texte: [
        'Silicium, composites carbone, traitements plasma.',
        'Renaissance de la haute horlogerie mécanique.',
      ],
      tags: ['Silicium', 'Carbone', 'Composites'],
    },
  } as const

  const p = DATA[periode]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="overflow-hidden rounded-2xl shadow-2xl">
        <img
          src="/images/materiaux/evolution.jpg"
          alt="Évolution horlogère"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-slate-900/40 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex flex-wrap gap-3 mb-6">
          {(['XVI', 'XVIII', 'XX', 'XXI'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setPeriode(key)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                periode === key
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-transparent text-gray-200 border-white/10 hover:bg-white/5'
              }`}
            >
              {key === 'XVI'
                ? 'XVIe–XVIIe'
                : key === 'XVIII'
                ? 'XVIIIe–XIXe'
                : key === 'XX'
                ? 'XXe siècle'
                : 'XXIe siècle'}
            </button>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-amber-400 mb-3">{p.titre}</h3>
        {p.texte.map((t, i) => (
          <p key={i} className="text-gray-300 mb-2">
            {t}
          </p>
        ))}
        <div className="flex flex-wrap gap-2 mt-4">
          {p.tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

/* =========================
   PAGE PRINCIPALE
========================= */
export default function MateriauxPage() {
  const [region, setRegion] = useState<RegionKey>('geneve')
  const [filter, setFilter] = useState<'Tous' | 'Classiques' | 'Innovation' | 'Décoratif'>('Tous')
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null)

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])

  const filtered =
    filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
          {/* Fil d’Ariane */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/suisse" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Horlogerie Suisse
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Matériaux Horlogers</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-amber-400">Swiss Watch Materials</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Excellence et Innovation <br /> dans les <span className="text-amber-400">Matériaux</span> Horlogers
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Union parfaite entre tradition, recherche et design suisse. Explore
                les matériaux d’exception et les régions qui façonnent l’avenir de la haute horlogerie.
              </p>

              <a
                href="/materiaux-horlogers-suisse.html#hero"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition"
              >
                <Award className="w-4 h-4" /> Page de référence — HorloLearn.ch
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<MapPin className="w-5 h-5 text-amber-400" />}
                label="Régions"
                value="4"
              />
              <StatCard
                icon={<Building2 className="w-5 h-5 text-amber-400" />}
                label="Entreprises majeures"
                value="15+"
              />
              <StatCard
                icon={<Sparkles className="w-5 h-5 text-amber-400" />}
                label="Spécialités"
                value="20+"
              />
              <StatCard
                icon={<ShieldCheck className="w-5 h-5 text-amber-400" />}
                label="Excellence suisse"
                value="100%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RÉGIONS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10">
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/20 rounded-2xl border border-white/10 p-6 md:p-8">
          <div className="flex gap-2 mb-6 flex-wrap">
            {([
              ['geneve', 'Genève'],
              ['vallee', 'Vallée de Joux'],
              ['neuchatel', 'Neuchâtel'],
              ['bienne', 'Bienne'],
            ] as [RegionKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setRegion(key)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
                  region === key
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">{REGIONS[region].titre}</h3>
              <p className="text-gray-300 mb-6">{REGIONS[region].intro}</p>
              <h4 className="text-white font-semibold mb-2">Spécialités</h4>
              <ul className="space-y-2">
                {REGIONS[region].specs.map((s, i) => (
                  <Bullet key={i}>{s}</Bullet>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Entreprises</h4>
              <div className="flex flex-wrap gap-2">
                {REGIONS[region].companies.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTRES MATÉRIAUX */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {(['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-2xl font-semibold text-sm transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE MATÉRIAUX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, i) => (
            <MaterialCard
              key={`${m.title}-${i}`}
              {...m}
              onImageClick={() => setZoom({ src: m.illustration, alt: m.title })}
            />
          ))}
        </div>
      </section>

      {/* PANNEAU “SWISS WATCH MATERIALS” (comme le rapport) */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-t from-amber-900/10 via-amber-800/10 to-transparent border border-amber-500/20 p-8 md:p-12">
          <div className="absolute -bottom-32 left-0 right-0 h-64 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="flex flex-col items-center text-center relative">
            <div className="p-3 bg-amber-500/20 rounded-xl mb-3">
              <Gem className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-3">
              Swiss Watch Materials
            </h3>
            <p className="text-gray-300 max-w-3xl">
              Fusion entre innovation et héritage. Les matériaux suisses incarnent l’excellence
              et la précision au cœur de l’horlogerie mondiale.
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <a
                href="#top"
                className="px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
              >
                Explorer à nouveau
              </a>
              <Link
                href="/"
                className="px-5 py-2 rounded-xl border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition"
              >
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CHRONOLOGIE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-4">
          Chronologie Historique
        </h2>
        <p className="text-center text-gray-300 mb-10">
          L’évolution des matériaux horlogers du XVIe siècle à aujourd’hui
        </p>
        <Chronologie />
      </section>

      {zoom && (
        <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </main>
  )
}
