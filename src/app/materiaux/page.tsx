'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ChevronRight, MapPin, Building2, Sparkles, ShieldCheck,
  Award, Factory, Landmark, Gem
} from 'lucide-react'

/* =========================
   Types
========================= */
type RegionKey = 'Geneve' | 'Vallee' | 'Neuchatel' | 'Bienne'

type Region = {
  key: RegionKey
  title: string
  description: string
  specialties: string[]
  companies: string[]
}

type Material = {
  icon: string
  title: string
  colorClass: string
  illustration: string
  description: string
  useCases: string[]
  category: 'Classiques' | 'Innovation' | 'Décoratif'
}

/* =========================
   Données - Régions
========================= */
const REGIONS: Region[] = [
  {
    key: 'Geneve',
    title: 'Genève – Capitale de la Haute Horlogerie',
    description:
      "Berceau des plus grandes Maisons horlogères, Genève incarne le prestige, la précision et le savoir-faire séculaire. C'est ici que se créent les garde-temps les plus exclusifs au monde.",
    specialties: [
      'Haute horlogerie & finitions à la main',
      'Complications (tourbillon, répétition minutes)',
      'Décoration (anglage, perlage, côtes de Genève)',
    ],
    companies: ['Patek Philippe', 'Rolex', 'Vacheron Constantin', 'F.P. Journe'],
  },
  {
    key: 'Vallee',
    title: 'Vallée de Joux – L’Atelier des Complications',
    description:
      "Cœur mécanique de la Suisse horlogère, la Vallée de Joux concentre un savoir-faire unique pour les grandes complications et la R&D d'exception.",
    specialties: [
      'Grandes complications (QP, RM, MTR)',
      "R&D mouvements, échappements & organes réglants",
      'Composants haut de gamme',
    ],
    companies: ['Audemars Piguet', 'Jaeger-LeCoultre', 'Blancpain', 'Breguet'],
  },
  {
    key: 'Neuchatel',
    title: 'Neuchâtel – Cœur Industriel',
    description:
      'Bastion de la fabrication de mouvements en grande série et des composants de précision.',
    specialties: [
      'Mouvements grande série',
      'Décolletage de précision',
      'Fabrication spiraux',
      'Sous-traitance spécialisée',
    ],
    companies: ['ETA', 'Sellita', 'Nivarox-FAR'],
  },
  {
    key: 'Bienne',
    title: 'Bienne – Pôle Technologique & Industriel',
    description:
      "Épicentre industriel moderne avec automatisation, logistique et intégration verticale.",
    specialties: [
      'Assemblage automatisé & qualité',
      'Usinage boîtiers & bracelets',
      'Traitements & finitions',
    ],
    companies: ['OMEGA', 'Tissot', 'Longines', 'Swatch Group'],
  },
]

/* =========================
   Données - Matériaux
========================= */
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
      'Alliage de cuivre et zinc, base de la majorité des platines, ponts et roues. Facile à usiner, il offre une belle teinte jaune dorée souvent protégée par traitement galvanique.',
    useCases: ['Platines & ponts de mouvement', 'Roues de minuterie', 'Ébauches décoratives', 'Compteurs et modules'],
    category: 'Classiques',
  },
  {
    icon: '⚙️',
    title: 'Titane',
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    illustration: '/images/materiaux/titane.jpg',
    description:
      "Matériau high-tech ultra-léger (≈40% plus léger que l'acier), hypoallergénique et non magnétique. Son aspect mat et sa résistance en font un favori des montres sportives.",
    useCases: ['Boîtiers techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'],
    category: 'Innovation',
  },
  {
    icon: '⬛',
    title: 'Céramique',
    colorClass: 'bg-gradient-to-br from-neutral-700 to-neutral-900',
    illustration: '/images/materiaux/ceramique.jpg',
    description:
      "Matériau composite extrêmement dur, pratiquement inrayable et résistant à l'usure. Finition mate ou brillante pour un style contemporain.",
    useCases: ['Lunettes (bezels)', 'Boîtiers haut de gamme', 'Composants décoratifs'],
    category: 'Innovation',
  },
  {
    icon: '🔬',
    title: 'Silicium',
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    illustration: '/images/materiaux/silicium.jpg',
    description:
      'Matériau révolutionnaire issu de la micro-tech. Composants de haute précision, amagnétiques et nécessitant peu/pas de lubrification.',
    useCases: ['Spiraux amagnétiques', 'Ancre en silicium', "Roue d'échappement sans huile"],
    category: 'Innovation',
  },
  {
    icon: '💎',
    title: 'Rubis synthétique',
    colorClass: 'bg-gradient-to-br from-rose-500 to-rose-700',
    illustration: '/images/materiaux/rubis.jpg',
    description:
      "Pierre synthétique utilisée comme palier anti-friction. Réduit l'usure des axes et garantit la longévité du mouvement.",
    useCases: ['Pierres de pivot', 'Contrepoids de balancier', "Roulette d'ancre"],
    category: 'Classiques',
  },
  {
    icon: '🌲',
    title: 'Bois',
    colorClass: 'bg-gradient-to-br from-green-600 to-green-800',
    illustration: '/images/materiaux/bois.jpg',
    description:
      'Matériau rare et artisanal pour cadrans exclusifs et éléments décoratifs. Apporte une identité unique.',
    useCases: ['Cadrans exclusifs', 'Boîtiers/maillons décoratifs', 'Maquettes pédagogiques'],
    category: 'Décoratif',
  },
]

const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const
type Category = (typeof CATEGORIES)[number]

/* =========================
   UI: Carte Matériau
========================= */
function MaterialCard({
  icon,
  title,
  colorClass,
  description,
  useCases,
  illustration,
}: Material) {
  return (
    <article className="group relative bg-white/90 dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm">
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <img
          src={illustration}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col space-y-3">
        <div className="flex items-start gap-3">
          <div className={`${colorClass} text-white rounded-2xl p-2.5 text-xl shadow-md`}>{icon}</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition">
            {title}
          </h3>
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

/* =========================
   Page
========================= */
export default function MateriauxPage() {
  const [region, setRegion] = useState<RegionKey>('Geneve')
  const [filter, setFilter] = useState<Category>('Tous')

  const selected = REGIONS.find(r => r.key === region)!

  const filtered =
    filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  useEffect(() => {
    // sécurité visuelle sur mount
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ================= HERO / HEADER ================= */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 opacity-20">
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

          {/* Titre + Stats */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-amber-400">Swiss Watch Materials</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Excellence et</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                  Innovation
                </span>
                <br />
                <span className="text-white">dans les Matériaux</span>
                <br />
                <span className="text-white">Horlogers</span>
              </h1>

              <p className="text-lg text-gray-300 mb-6">
                L’union parfaite entre tradition, recherche et design suisse.
                Découvrez les grandes régions horlogères et leurs savoir-faire.
              </p>

              <a
                href="/materiaux-horlogers-suisse.html#hero"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition"
              >
                <Award className="w-4 h-4" />
                Page de référence — HorloLearn.ch
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={<MapPin className="w-5 h-5 text-amber-400" />} title="Régions" value="4" />
              <StatCard icon={<Building2 className="w-5 h-5 text-amber-400" />} title="Entreprises majeures" value="15+" />
              <StatCard icon={<Sparkles className="w-5 h-5 text-amber-400" />} title="Spécialités" value="20+" />
              <StatCard icon={<ShieldCheck className="w-5 h-5 text-amber-400" />} title="Excellence suisse" value="100%" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= RÉGIONS (onglets) ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="rounded-2xl border border-amber-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl">
          {/* Onglets */}
          <div className="flex flex-wrap gap-3 p-4 border-b border-white/5">
            <Tab active={region === 'Geneve'} onClick={() => setRegion('Geneve')} label="Genève" />
            <Tab active={region === 'Vallee'} onClick={() => setRegion('Vallee')} label="Vallée de Joux" />
            <Tab active={region === 'Neuchatel'} onClick={() => setRegion('Neuchatel')} label="Neuchâtel" />
            <Tab active={region === 'Bienne'} onClick={() => setRegion('Bienne')} label="Bienne" />
          </div>

          {/* Contenu région */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-4">
              {selected.title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl">{selected.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <Factory className="w-5 h-5 text-amber-400" /> Spécialités
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {selected.specialties.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <Landmark className="w-5 h-5 text-amber-400" /> Entreprises
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selected.companies.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MATÉRIAUX (grille) ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((cat) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((m, i) => (
            <MaterialCard key={i} {...m} />
          ))}
        </div>
      </section>

      {/* ================= BLOC “SWISS WATCH MATERIALS” ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
          {/* En-tête bloc */}
          <div className="px-6 sm:px-8 lg:px-10 py-6 border-b border-amber-500/10 flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Gem className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Swiss Watch Materials</h3>
              <p className="text-xs text-gray-400">Présentation officielle des matériaux utilisés dans la haute horlogerie</p>
            </div>
          </div>

          {/* iFrame (page HTML statique) */}
          <div className="p-0">
            <iframe
              src="/materiaux-horlogers-suisse.html#hero"
              className="w-full h-[140vh] bg-white"
              title="Swiss Watch Materials"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

/* =========================
   Petits composants
========================= */
function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm transition ${
        active
          ? 'bg-amber-600 text-white border-amber-500'
          : 'bg-transparent text-gray-200 border-white/10 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  )
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-amber-500/10 rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-amber-400 mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  )
}
