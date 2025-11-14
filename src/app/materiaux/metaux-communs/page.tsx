
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Sparkles, Award, Layers, ExternalLink, Clock, Gem, Hammer } from 'lucide-react'

type Material = {
  icon: string
  title: string
  colorClass: string
  illustration: string
  description: string
  useCases: string[]
  category: 'Classiques' | 'Innovation' | 'Décoratif'
  historicalPeriod?: string
  technicalDetails?: string
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
    historicalPeriod: 'XXe siècle',
    technicalDetails: "316L (acier chirurgical), résistance à la corrosion supérieure, polissage miroir ou brossage satiné"
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
    historicalPeriod: 'XVIe siècle',
    technicalDetails: "Or 18K (75% or pur), alliages jaune/rose/blanc, poids spécifique élevé"
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
    historicalPeriod: 'XVIIIe siècle',
    technicalDetails: "Alliage Cu/Zn, excellente usinabilité, traitement rhodiage ou galvanoplastie"
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
    historicalPeriod: 'XXe siècle',
    technicalDetails: "Grade 2 ou Grade 5, densité 4.5g/cm³, biocompatible, traitement PVD possible"
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
    historicalPeriod: 'XXIe siècle',
    technicalDetails: "Zircone (ZrO2), dureté 1200-1400 HV, frittage haute température, inrayable"
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
    historicalPeriod: 'XXIe siècle',
    technicalDetails: "Monocristallin, procédé DRIE, élasticité parfaite, insensible aux champs magnétiques"
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
    historicalPeriod: 'XVIIIe siècle',
    technicalDetails: "Corindon synthétique (Al2O3), dureté 9 Mohs, faible coefficient de friction"
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
    historicalPeriod: 'Contemporain',
    technicalDetails: "Bois nobles (ébène, palissandre), stabilisé, traité contre l'humidité"
  },
  {
    icon: '⚪',
    title: 'Platine',
    colorClass: 'bg-gradient-to-br from-slate-400 to-slate-600',
    illustration: '/images/materiaux/platine.jpg',
    description:
      "Le métal le plus noble et rare en horlogerie. Plus lourd et plus cher que l'or, le platine 950 est réservé aux pièces d'exception.",
    useCases: ['Boîtiers de haute horlogerie', 'Masses oscillantes de prestige', 'Éditions limitées'],
    category: 'Classiques',
    historicalPeriod: 'XIXe siècle',
    technicalDetails: "Pt 950 (95% platine pur), densité 21.5g/cm³, hypoallergénique, éclat gris argenté"
  },
  {
    icon: '🔷',
    title: 'Saphir',
    colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
    illustration: '/images/materiaux/saphir.jpg',
    description:
      "Cristal synthétique d'une dureté exceptionnelle (9 sur échelle de Mohs). Utilisé pour les glaces de montres et certains composants.",
    useCases: ['Glaces de montre', 'Fonds transparents', 'Paliers de haute précision'],
    category: 'Innovation',
    historicalPeriod: 'XXe siècle',
    technicalDetails: "Corindon synthétique transparent, dureté 9 Mohs, traitement anti-reflet"
  },
  {
    icon: '🌑',
    title: 'Carbone',
    colorClass: 'bg-gradient-to-br from-gray-800 to-black',
    illustration: '/images/materiaux/carbone.jpg',
    description:
      "Fibre de carbone forgée ou TPT, matériau ultra-léger et extrêmement résistant. Motifs graphiques uniques pour chaque pièce.",
    useCases: ['Boîtiers sportifs', 'Cadrans techniques', 'Composants allégés'],
    category: 'Innovation',
    historicalPeriod: 'XXIe siècle',
    technicalDetails: "NTPT ou forged carbon, densité 1.6g/cm³, rigidité exceptionnelle"
  },
  {
    icon: '🔸',
    title: 'Bronze',
    colorClass: 'bg-gradient-to-br from-amber-600 to-amber-800',
    illustration: '/images/materiaux/bronze.jpg',
    description:
      "Alliage de cuivre et étain qui développe une patine unique avec le temps. Prisé pour son caractère vintage et son évolution personnalisée.",
    useCases: ['Boîtiers de montres vintage-inspired', 'Lunettes plongeuses', 'Éditions spéciales'],
    category: 'Décoratif',
    historicalPeriod: 'Contemporain',
    technicalDetails: "Alliage Cu/Sn, oxydation naturelle contrôlée, patine unique par utilisateur"
  },
]

const CATEGORIES = ['Tous', 'Classiques', 'Innovation', 'Décoratif'] as const
type Category = (typeof CATEGORIES)[number]

type HistoryPeriod = 'xvie' | 'xviiie' | 'xxe' | 'xxie'

const HISTORY_TABS = [
  { id: 'xvie' as HistoryPeriod, label: 'XVIe-XVIIe' },
  { id: 'xviiie' as HistoryPeriod, label: 'XVIIIe-XIXe' },
  { id: 'xxe' as HistoryPeriod, label: 'XXe siècle' },
  { id: 'xxie' as HistoryPeriod, label: 'XXIe siècle' },
]

const HISTORY_CONTENT: Record<HistoryPeriod, { title: string; content: string[]; materials: string[]; image: string }> = {
  xvie: {
    title: "Les Origines : Orfèvrerie et Métaux Précieux",
    content: [
      "L'horlogerie suisse naît à Genève au XVIe siècle suite à la Réforme. L'interdiction du port d'objets ornementaux par Jean Calvin contraint les orfèvres genevois à se reconvertir. Les premiers garde-temps sont naturellement fabriqués en or et argent, matériaux que ces artisans maîtrisent déjà parfaitement.",
      "L'arrivée des horlogers huguenots français, fuyant les persécutions religieuses après la révocation de l'Édit de Nantes (1685), renforce considérablement le savoir-faire local. Ces réfugiés apportent avec eux des techniques avancées et un sens aigu de la précision.",
      "Les artisans genevois maîtrisent le travail des métaux précieux grâce à leur tradition d'orfèvrerie séculaire. Ces compétences - gravure, ciselure, émaillage - se révèlent essentielles pour créer les premiers boîtiers de montres, véritables bijoux portables."
    ],
    materials: ['Or 18 carats', 'Argent sterling', 'Platine', 'Email champlevé'],
    image: '/images/histoire/xvie.jpg'
  },
  xviiie: {
    title: "L'Âge d'Or : Laiton et Innovations Techniques",
    content: [
      "Le XVIIIe siècle marque l'émergence du laiton comme matériau de prédilection pour les mouvements horlogers. Cet alliage de cuivre et zinc offre une excellente usinabilité, une belle teinte dorée et une résistance mécanique optimale pour les composants internes.",
      "Les horlogers développent des techniques sophistiquées de traitement de surface : le rhodiage et la galvanoplastie protègent les platines en laiton de l'oxydation tout en leur conférant un aspect luxueux. Le guilloché main fait son apparition sur les cadrans.",
      "Révolution majeure : le rubis synthétique fait son apparition vers 1700 comme palier antifriction. Cette innovation, introduite par les horlogers anglais puis perfectionnée en Suisse, réduit considérablement l'usure des axes de roues et garantit une longévité exceptionnelle aux mouvements."
    ],
    materials: ['Laiton doré', 'Rubis synthétique', 'Acier trempé', 'Email cloisonné'],
    image: '/images/histoire/xviiie.jpg'
  },
  xxe: {
    title: "Révolution Industrielle : L'Ère de l'Acier et du Titane",
    content: [
      "Le XXe siècle marque l'avènement révolutionnaire de l'acier inoxydable 316L. Ce matériau moderne combine résistance à la corrosion marine, robustesse mécanique exceptionnelle et coût de production maîtrisé, démocratisant l'accès aux montres de qualité.",
      "L'après-Seconde Guerre mondiale voit l'émergence des montres-outils en acier : plongeuses professionnelles, chronographes de pilote, montres d'explorateurs. Les finitions polies miroir et brossées satinées deviennent la signature esthétique des grandes manufactures.",
      "Dans les années 1970-1980, le titane fait son entrée spectaculaire. Ultra-léger (40% plus léger que l'acier), hypoallergénique, non-magnétique et inoxydable, il devient le matériau privilégié des montres techniques professionnelles et sportives de haute performance."
    ],
    materials: ['Acier 316L', 'Titane Grade 2/5', 'Céramique première génération', 'Aluminium'],
    image: '/images/histoire/xxe.jpg'
  },
  xxie: {
    title: "Innovation High-Tech : Silicium, Composites et Nano-matériaux",
    content: [
      "Le XXIe siècle introduit des matériaux issus directement de la microtechnologie spatiale et informatique. Le silicium monocristallin révolutionne l'échappement : ultra-précis, totalement amagnétique, ne nécessitant aucune lubrification, il améliore drastiquement la précision chronométrique.",
      "La céramique technique haute performance (zircone, carbure de silicium) s'impose : pratiquement inrayable (dureté Vickers 1200-1400), chimiquement inerte, elle permet des finitions brillantes ou mates spectaculaires. Les boîtiers entièrement céramiques deviennent des standards du luxe sportif.",
      "Les composites carbone (NTPT, forged carbon, Carbotech) repoussent les limites : plus légers que le titane, plus résistants que l'acier, avec des motifs graphiques uniques pour chaque pièce. La recherche explore désormais les nano-matériaux, les alliages à mémoire de forme et les cristaux de saphir synthétique colorés."
    ],
    materials: ['Silicium monocristallin', 'Céramique ZrO2', 'Carbone forgé NTPT', 'Saphir coloré', 'Alliages or innovants', 'Graphène'],
    image: '/images/histoire/xxie.jpg'
  }
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
const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Tous: <Layers className="w-4 h-4" />,
  Classiques: <Award className="w-4 h-4" />,
  Innovation: <Sparkles className="w-4 h-4" />,
  Décoratif: <Hammer className="w-4 h-4" />,
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
          <Link href="/materiaux" className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <ChevronLeft className="w-5 h-5" /> Retour à la materiaux
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
            Matériaux d&apos;Exception
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Découvrez les matériaux nobles et innovants qui composent les garde-temps suisses, 
            du traditionnel or 18 carats aux révolutionnaires composites de silicium.
          </p>
        </div>

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

        {/* Section Grille des matériaux — version compacte */}
        <section className="mb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((mat, i) => (
              <article
                key={i}
                className="group bg-slate-900/80 border border-slate-700/40 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-amber-500/20 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setZoom({ src: mat.illustration, alt: mat.title })}
                  className="relative w-full h-32 overflow-hidden cursor-pointer border-0 p-0 bg-transparent"
                >
                  <img
                    src={mat.illustration}
                    alt={mat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </button>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xl ${mat.colorClass} p-1 rounded-lg text-white`}>{mat.icon}</span>
                    <h3 className="text-lg font-semibold text-amber-400">{mat.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-3">{mat.description}</p>
                  <ul className="text-xs text-slate-400 space-y-1 border-t border-slate-700/40 pt-2">
                    {mat.useCases.slice(0, 3).map((use, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-amber-500">▸</span> {use}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-t border-slate-700/40 bg-slate-800/40 text-[11px] text-slate-400">
                  <span>{mat.historicalPeriod}</span>
                  <span className="italic">{mat.category}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section Histoire COMPLÈTE et Interactive */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-500/30 mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-amber-400" />
            <h2 className="text-4xl font-black text-center text-white">
              Histoire des Matériaux Horlogers Suisses
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

          <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-6">
                  {HISTORY_CONTENT[activeHistoryTab].title}
                </h3>
                
                {HISTORY_CONTENT[activeHistoryTab].content.map((paragraph, i) => (
                  <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-justify">
                    {paragraph}
                  </p>
                ))}

                <div className="mt-8">
                  <h4 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-4 flex items-center gap-2">
                    <Gem className="w-4 h-4" />
                    Matériaux de l&apos;époque
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {HISTORY_CONTENT[activeHistoryTab].materials.map((material, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative h-full min-h-[400px] bg-slate-200 dark:bg-slate-700">
                <img 
                  src={HISTORY_CONTENT[activeHistoryTab].image} 
                  alt={HISTORY_CONTENT[activeHistoryTab].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="https://idchufzbxxy7.space.minimax.io/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <ExternalLink className="w-5 h-5" />
              Voir la version complète sur HorloLearn.ch
            </a>
          </div>
        </section>

        {/* Section supplémentaire : Fabrication et Techniques */}
        <section className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <Hammer className="w-8 h-8 text-amber-500" />
            Techniques de Transformation
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-amber-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-3">🔨 Usinage CNC</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Fraisage et tournage haute précision pour les boîtiers et composants. Tolérances de quelques microns.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-blue-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">⚡ Électroérosion</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Technique pour usiner des formes complexes dans les matériaux durs comme la céramique et le carbure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-purple-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-400 mb-3">🎨 Traitement PVD/DLC</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Dépôt sous vide de couches protectrices ultra-dures en nitrure ou carbone diamant.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-green-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-3">🔥 Frittage</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Fusion à haute température pour la céramique technique. Processus de 1400-1600°C sur plusieurs jours.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-red-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-3">💎 Polissage</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Finitions miroir ou satinées réalisées à la main. Plusieurs heures pour un boîtier de haute horlogerie.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-indigo-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-3">⚗️ Galvanoplastie</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Dépôt électrolytique de métaux précieux (rhodiage, dorure) pour protéger et embellir.
              </p>
            </div>
          </div>
        </section>

        {/* Section : Comparaison des propriétés */}
        <section className="bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white">
            📊 Comparaison des Propriétés
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-500 text-white">
                  <th className="px-4 py-3 text-left font-bold rounded-tl-xl">Matériau</th>
                  <th className="px-4 py-3 text-center font-bold">Densité</th>
                  <th className="px-4 py-3 text-center font-bold">Dureté</th>
                  <th className="px-4 py-3 text-center font-bold">Résistance</th>
                  <th className="px-4 py-3 text-center font-bold rounded-tr-xl">Coût</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Acier 316L</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">7.9 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">200 HV</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-20 h-2 bg-green-500 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Titane</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">4.5 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">300 HV</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-24 h-2 bg-blue-500 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-orange-600 dark:text-orange-400 font-bold">€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Céramique</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">6.0 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">1400 HV</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-full h-2 bg-purple-500 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">€€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Or 18K</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">15.5 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">120 HV</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-12 h-2 bg-yellow-500 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">€€€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Platine 950</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">21.5 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">135 HV</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-16 h-2 bg-slate-400 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">€€€€€€</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white rounded-bl-xl">Carbone NTPT</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">1.6 g/cm³</td>
                  <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">Variable</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block w-28 h-2 bg-indigo-500 rounded-full"></span>
                  </td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold rounded-br-xl">€€€€€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold">HV :</span> Dureté Vickers
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">€ :</span> Indicateur de coût relatif
            </div>
          </div>
        </section>
      </div>

      {zoom && <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </main>
  )
}
