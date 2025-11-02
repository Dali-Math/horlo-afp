'use client'

import { useState } from 'react'
import { Sparkles, Award, Layers } from 'lucide-react'

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

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const filtered = filter === 'Tous' ? MATERIALS : MATERIALS.filter((m) => m.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl sm:text-6xl font-black text-center mb-12 text-amber-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          Matériaux d'Exception
        </h1>

        {/* Filtres */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
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
        </div>

        {/* Grille des matériaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((m, i) => (
            <article
              key={i}
              className="bg-slate-900/60 border border-slate-700 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <img src={m.illustration} alt={m.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${m.colorClass} p-2 rounded-lg text-lg`}>{m.icon}</div>
                  <h3 className="font-semibold text-lg">{m.title}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-3">{m.description}</p>
                <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
                  {m.useCases.map((u, j) => (
                    <li key={j}>{u}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* === SECTION FINALE === */}
      <section
        id="final-section"
        className="relative mt-32 overflow-hidden py-28 border-t border-amber-500/30"
        style={{
          clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(180deg, #111217 0%, #1a1302 50%, #000 100%)',
        }}
      >
        {/* Halo animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-600/10 to-amber-400/10 blur-2xl animate-glow-border" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-amber-400 tracking-tight animate-pulse-slow drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
            Swiss Watch Materials
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Fusion entre innovation et héritage, les matériaux suisses incarnent l’excellence 
            et la précision au cœur de l’horlogerie mondiale.
          </p>

          <div className="flex justify-center gap-4 pt-6">
            <a
              href="#top"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-lg shadow-amber-500/30 transition-all"
            >
              Explorer à nouveau
            </a>
            <a
              href="/"
              className="px-6 py-3 rounded-xl border border-amber-400 text-amber-400 hover:bg-amber-400/10 transition-all"
            >
              Retour à l’accueil
            </a>
          </div>
        </div>
      </section>

      {/* Effets visuels */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.3);
          }
          50% {
            text-shadow: 0 0 25px rgba(212,175,55,0.8), 0 0 45px rgba(212,175,55,0.6);
          }
        }

        @keyframes glow-border {
          0% { box-shadow: inset 0 0 25px rgba(212,175,55,0.4); }
          50% { box-shadow: inset 0 0 55px rgba(212,175,55,0.7); }
          100% { box-shadow: inset 0 0 25px rgba(212,175,55,0.4); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        .animate-glow-border {
          animation: glow-border 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
