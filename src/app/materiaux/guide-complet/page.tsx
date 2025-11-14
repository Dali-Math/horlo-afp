'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, Sparkles, Award, Layers, ExternalLink, Clock, Gem, Hammer, Search, Filter, BookOpen, Zap, Shield, Gauge, Menu, X, Download, Info, Cpu, Atom } from 'lucide-react'

// Structure de données enrichie depuis le PDF
type Metal = {
  id: string
  icon: string
  title: string
  symbol?: string
  colorClass: string
  illustration: string
  description: string
  properties: { label: string; value: string }[]
  useCases: string[]
  horlogerieUse: string[]
  category: 'Métaux purs' | 'Alliages' | 'Acier & Fer' | 'Innovation'
  historicalPeriod?: string
  technicalDetails?: string
  density?: string
  meltingPoint?: string
}

const METALS: Metal[] = [
  {
    id: 'titane',
    icon: 'Ti',
    title: 'Titane',
    symbol: 'Ti',
    colorClass: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    illustration: '/pdf/titane.png',
    description: "Métal léger ultra-performant, 45% moins dense que l'acier. Extraction de l'ilménite et du rutile.",
    properties: [
      { label: 'Masse volumique', value: '4,54 kg/dm³' },
      { label: 'Point de fusion', value: '1660°C' },
      { label: 'Résistance', value: 'Excellente rapport résistance/poids' }
    ],
    useCases: ['Aéronautique, astronautique', 'Électrotechnique', 'Médecine', 'Horlogerie sportive'],
    horlogerieUse: ['Boîtiers allégés', 'Vis spéciales', 'Platines techniques', 'Bracelets confortables'],
    category: 'Métaux purs',
    historicalPeriod: 'XXe siècle',
    technicalDetails: 'Amagnétique, excellente résistance à la corrosion, alliages avec Al, Sn, Mo'
  },
  {
    id: 'nickel',
    icon: 'Ni',
    title: 'Nickel',
    symbol: 'Ni',
    colorClass: 'bg-gradient-to-br from-gray-300 to-gray-500',
    illustration: '/pdf/nickel.png',
    description: "Métal blanc ferromagnétique, utilisé massivement dans les alliages d'acier inoxydable.",
    properties: [
      { label: 'Masse volumique', value: '8,906 kg/dm³' },
      { label: 'Point de fusion', value: '1455°C' },
      { label: 'Propriété', value: 'Ferromagnétique, allergène' }
    ],
    useCases: ['Aciers inoxydables', 'Pièces de monnaie', 'Ustensiles de cuisine', 'Alliage Invar®'],
    horlogerieUse: ['Invar® 36% Ni pour ressorts spiraux', 'Balanciers', 'Composants à faible dilatation'],
    category: 'Métaux purs',
    historicalPeriod: 'XIXe siècle',
    technicalDetails: 'Très résistant à la corrosion, ductile et malléable'
  },
  {
    id: 'cuivre',
    icon: 'Cu',
    title: 'Cuivre',
    symbol: 'Cu',
    colorClass: 'bg-gradient-to-br from-orange-400 to-orange-600',
    illustration: '/pdf/cuivre.png',
    description: "Meilleur conducteur après l'argent. L'eau pure n'a aucune action sur le cuivre, s'oxyde par l'air humide (vert-de-gris).",
    properties: [
      { label: 'Masse volumique', value: '8,92 kg/dm³' },
      { label: 'Point de fusion', value: '1083°C' },
      { label: 'Conductivité', value: 'Thermique et électrique exceptionnelle' }
    ],
    useCases: ['Fils électriques', 'Bobinages moteurs', 'Toitures', 'Alliages (laiton, bronze)'],
    horlogerieUse: ["Base des alliages laiton et bronze", "Circuit électrique des montres à quartz"],
    category: 'Métaux purs',
    historicalPeriod: 'Antiquité',
    technicalDetails: 'Non-magnétique, très malléable et ductile, résistant à la corrosion'
  },
  {
    id: 'chrome',
    icon: 'Cr',
    title: 'Chrome',
    symbol: 'Cr',
    colorClass: 'bg-gradient-to-br from-slate-200 to-slate-400',
    illustration: '/pdf/chrome.png',
    description: "Élément clé des aciers inoxydables. Découvert dans une météorite de Sibérie à la fin du 18e siècle.",
    properties: [
      { label: 'Masse volumique', value: '7,2 kg/dm³' },
      { label: 'Point de fusion', value: '1857°C' },
      { label: 'Dureté', value: 'Très dur et résistant à l\'usure' }
    ],
    useCases: ['Acier inoxydable 12-25% Cr', 'Protection anticorrosion', 'Revêtements décoratifs'],
    horlogerieUse: ["Acier 316L (18% Cr, 10% Ni)", "Composants résistants à l'eau salée"],
    category: 'Métaux purs',
    historicalPeriod: 'XVIIIe siècle',
    technicalDetails: 'Inoxydable à l\'air, résistant à la corrosion, très dur'
  },
  {
    id: 'zinc',
    icon: 'Zn',
    title: 'Zinc',
    symbol: 'Zn',
    colorClass: 'bg-gradient-to-br from-gray-400 to-gray-600',
    illustration: '/pdf/zinc.png',
    description: "Métal gris-bleu utilisé depuis le XVIIe siècle. S'oxyde à l'air humide mais se protège par une couche d'oxyde.",
    properties: [
      { label: 'Masse volumique', value: '7,14 kg/dm³' },
      { label: 'Point de fusion', value: '419,5°C' },
      { label: 'Caractéristique', value: 'Cassant à basse température' }
    ],
    useCases: ['Galvanisation par immersion', 'Alliage laiton', 'Électrolyse', 'Barrières, lampadaires'],
    horlogerieUse: ["Composant du laiton horloger (39% Zn)", "Augmente la dureté et résistance mécanique"],
    category: 'Métaux purs',
    historicalPeriod: 'XVIIe siècle',
    technicalDetails: 'Se moule bien, inoxydable à froid et à l\'air sec'
  },
  {
    id: 'etain',
    icon: 'Sn',
    title: 'Étain',
    symbol: 'Sn',
    colorClass: 'bg-gradient-to-br from-gray-200 to-gray-400',
    illustration: '/pdf/etain.png',
    description: "Métal blanc argenté, facilement fusible. Constituant essentiel du bronze avec le cuivre.",
    properties: [
      { label: 'Masse volumique', value: '7,28 kg/dm³' },
      { label: 'Point de fusion', value: '231,9°C' },
      { label: 'Malleabilité', value: 'Se réduit en feuilles très minces' }
    ],
    useCases: ['Étamage des conserves', 'Soudage électronique', 'Industrie chimique', 'Verre'],
    horlogerieUse: ["Alliage bronze (2-10% Sn)", "Constituant historique des mouvements"],
    category: 'Métaux purs',
    historicalPeriod: 'Antiquité',
    technicalDetails: 'Mou, très malléable, inoxydable à l\'air, résiste aux acides faibles'
  },
  {
    id: 'tungstene',
    icon: 'W',
    title: 'Tungstène',
    symbol: 'W',
    colorClass: 'bg-gradient-to-br from-stone-300 to-stone-500',
    illustration: '/pdf/tungstene.png',
    description: "Métal avec la température de fusion la plus élevée (3410°C) et parmi les plus lourds. Couleur gris acier à blanc étain.",
    properties: [
      { label: 'Masse volumique', value: '19,35 kg/dm³' },
      { label: 'Point de fusion', value: '3410°C' },
      { label: 'Dureté', value: 'Très dur, ductile mais fragile' }
    ],
    useCases: ['Carbure de tungstène (outils de coupe)', 'Aciers rapides', 'Soudage TIG', 'Horlogerie de luxe'],
    horlogerieUse: ["Carrures de montres de luxe", "Lunettes", "Aciers outils pour micro-usinage"],
    category: 'Métaux purs',
    historicalPeriod: 'Contemporain',
    technicalDetails: 'Inaltérable à l\'air, non-réactif aux acides et bases'
  },
  {
    id: 'plomb',
    icon: 'Pb',
    title: 'Plomb',
    symbol: 'Pb',
    colorClass: 'bg-gradient-to-br from-slate-400 to-slate-600',
    illustration: '/pdf/plomb.png',
    description: "Métal connu depuis l'Antiquité, utilisé pour la tuyauterie. Très mou, oxydation superficielle.",
    properties: [
      { label: 'Masse volumique', value: '11,34 kg/dm³' },
      { label: 'Point de fusion', value: '327,5°C' },
      { label: 'Toxicité', value: 'Vapeurs toxiques' }
    ],
    useCases: ['Munitions', 'Protection rayons X', 'Toitures', 'Tuyauterie historique'],
    horlogerieUse: ["Historique (contre-poids)", "Utilisation limitée actuellement par toxicité"],
    category: 'Métaux purs',
    historicalPeriod: 'Antiquité',
    technicalDetails: 'Très mou, malléable, ductile, résiste aux acides (sauf nitrique)'
  },
  {
    id: 'laiton',
    icon: '🟨',
    title: 'Laiton',
    symbol: 'Cu+Zn',
    colorClass: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
    illustration: '/pdf/laiton.png',
    description: "Alliage cuivre (58%) - zinc (39%) - plomb (3%) en horlogerie. Couleur du rouge au jaune selon la teneur en zinc.",
    properties: [
      { label: 'Masse volumique', value: '8,5-8,8 kg/dm³' },
      { label: 'Point de fusion', value: '900-980°C' },
      { label: 'Composition', value: 'Zn 5-45%, Cu majoritaire' }
    ],
    useCases: ['Moulage, emboutissage', 'Soudure', 'Robinetterie', 'Douilles de cartouche'],
    horlogerieUse: ["Platines et ponts de mouvement", "Roues de minuterie", "Ponts décoratifs", "Couronnes (chromées)"],
    category: 'Alliages',
    historicalPeriod: 'XVIIIe siècle',
    technicalDetails: 'Bonne conductivité, malléable, dureté modulable par le zinc'
  },
  {
    id: 'bronze',
    icon: '🥉',
    title: 'Bronze',
    symbol: 'Cu+Sn',
    colorClass: 'bg-gradient-to-br from-amber-600 to-amber-800',
    illustration: '/pdf/bronze.png',
    description: "Alliage cuivre (95%) et étain (2-10%). Couleur variable selon la teneur en étain. Bonne résistance à la corrosion.",
    properties: [
      { label: 'Masse volumique', value: '8,7-8,8 kg/dm³' },
      { label: 'Point de fusion', value: '~1000°C' },
      { label: 'Composition', value: 'Cu 95%, Sn 2-10%' }
    ],
    useCases: ['Œuvres d\'art', 'Lustrerie', 'Robinetterie', 'Cloches', 'Roues dentées'],
    horlogerieUse: ["Boîtiers vintage-style", "Lunettes plongeuses", "Éditions spéciales avec patine"],
    category: 'Alliages',
    historicalPeriod: 'Antiquité',
    technicalDetails: 'Non-magnétique, bonne conductivité, facile à travailler'
  },
  {
    id: 'maillechort',
    icon: '🛡️',
    title: 'Maillechort',
    symbol: 'Cu+Zn+Ni',
    colorClass: 'bg-gradient-to-br from-gray-200 to-gray-400',
    illustration: '/pdf/maillechort.png',
    description: "Alliage nickel, cuivre et zinc. Dur et inaltérable. Résistance mécanique supérieure au laiton.",
    properties: [
      { label: 'Moyenne composition', value: 'Cu 50-60%, Zn 15-40%, Ni 5-30%' },
      { label: 'Caractéristique', value: 'Très variable selon composition' },
      { label: 'Avantage', value: 'Résistance supérieure au laiton' }
    ],
    useCases: ['Pointes de stylos', 'Instruments de musique', 'Montures de lunettes', 'Brucelles'],
    horlogerieUse: ["Platines et ponts haut de gamme", "Roues décorées", "Gravure manuelle", "Complications (tourbillons)"],
    category: 'Alliages',
    historicalPeriod: 'XIXe siècle',
    technicalDetails: 'Très résistant à la corrosion et oxydation, dur et malléable'
  },
  {
    id: 'acier',
    icon: '⚙️',
    title: 'Acier inoxydable',
    symbol: 'Fe+C',
    colorClass: 'bg-gradient-to-br from-gray-300 to-gray-500',
    illustration: '/pdf/acier.png',
    description: "Alliage fer-carbone (0,02-2% C). Aciers inoxydables avec Cr (12-25%) et Ni. Standard 316L en horlogerie.",
    properties: [
      { label: 'Masse volumique', value: '7,85 kg/dm³' },
      { label: 'Point de fusion', value: '1140-1535°C' },
      { label: 'Catégorie', value: 'Non-alliés, faiblement et fortement alliés' }
    ],
    useCases: ['Construction soudée', 'Appareils à pression', 'Outils', 'Rails'],
    horlogerieUse: ["Boîtiers et bracelets (316L)", "Aiguilles bleuites", "Ressorts", "Axes et pivots", "Lunettes tournantes"],
    category: 'Acier & Fer',
    historicalPeriod: 'XXe siècle',
    technicalDetails: 'Résistance à la corrosion, bonne usinabilité, déformable à froid'
  },
  {
    id: 'fonte',
    icon: '🏭',
    title: 'Fonte',
    symbol: 'Fe+C',
    colorClass: 'bg-gradient-to-br from-zinc-700 to-zinc-900',
    illustration: '/pdf/fonte.png',
    description: "Alliage fer-carbone (2-6,7% C). Plus dur que l'acier mais très cassant. Facilité de moulage.",
    properties: [
      { label: 'Masse volumique', value: '7,4 kg/dm³' },
      { label: 'Point de fusion', value: '1200°C' },
      { label: 'Type', value: 'Fontes blanches (acier) et grises (coulée)' }
    ],
    useCases: ['Moulage industriel', 'Pièces de machine', 'Fonte ductile'],
    horlogerieUse: ["Historique des machines-outils", "Structure de bancs d'essai"],
    category: 'Acier & Fer',
    historicalPeriod: 'XIXe siècle',
    technicalDetails: 'Fonderie, moulage, production par haut-fourneau'
  }
]

const CATEGORIES = ['Tous', 'Métaux purs', 'Alliages', 'Acier & Fer', 'Innovation'] as const
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

function MetalCard({ metal, onClick }: { metal: Metal; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-slate-900/80 border border-slate-700/40 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 hover:scale-[1.02] hover:shadow-amber-500/30 shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        <div className={`absolute inset-0 ${metal.colorClass} opacity-20`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-white/30">{metal.symbol || metal.icon}</span>
        </div>
        {metal.illustration && (
          <img
            src={metal.illustration}
            alt={metal.title}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 ${metal.colorClass} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {metal.symbol || metal.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">{metal.title}</h3>
            <span className="text-xs text-slate-400">{metal.category}</span>
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">{metal.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {metal.properties.slice(0, 2).map((prop, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/40">
              <div className="text-xs text-slate-400">{prop.label}</div>
              <div className="text-sm font-semibold text-amber-300">{prop.value}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/40 pt-3">
          <h4 className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3" /> En horlogerie :
          </h4>
          <ul className="text-xs text-slate-300 space-y-1">
            {metal.horlogerieUse.slice(0, 2).map((use, j) => (
              <li key={j} className="flex items-start gap-1">
                <span className="text-amber-500 mt-0.5">▸</span> {use}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="px-5 py-3 border-t border-slate-700/40 bg-slate-800/40 text-xs text-slate-400 flex justify-between items-center">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {metal.historicalPeriod || 'Période historique'}
        </span>
        <span className="text-amber-400 font-semibold">Voir détails →</span>
      </div>
    </article>
  )
}

function MetalDetailModal({ metal, onClose }: { metal: Metal; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto"
      aria-modal="true"
      role="dialog"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden"
        >
          <div className={`h-32 ${metal.colorClass} relative`}>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
              <div className="text-6xl font-black text-white/40">{metal.symbol || metal.icon}</div>
              <div className="text-white">
                <h2 className="text-3xl font-bold">{metal.title}</h2>
                <p className="text-sm opacity-80">{metal.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-8 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" /> Description
              </h3>
              <p className="text-slate-300 leading-relaxed">{metal.description}</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Atom className="w-5 h-5" /> Propriétés physico-chimiques
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {metal.properties.map((prop, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                    <div className="text-sm text-slate-400">{prop.label}</div>
                    <div className="text-lg font-semibold text-amber-300">{prop.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Hammer className="w-5 h-5" /> Applications générales
              </h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {metal.useCases.map((use, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-500 mt-1">▸</span> {use}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Applications en horlogerie
              </h3>
              <div className="bg-rose-900/20 border border-rose-700/40 rounded-xl p-5">
                <ul className="space-y-2">
                  {metal.horlogerieUse.map((use, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-200">
                      <span className="text-rose-400 text-xl leading-none">•</span>
                      <span className="leading-relaxed">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {metal.technicalDetails && (
              <section>
                <h3 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5" /> Détails techniques
                </h3>
                <p className="text-slate-300 bg-slate-800/30 rounded-lg p-4 border border-slate-700/40">
                  {metal.technicalDetails}
                </p>
              </section>
            )}

            {metal.illustration && (
              <div className="text-center">
                <img
                  src={metal.illustration}
                  alt={`Fiche technique ${metal.title}`}
                  className="max-h-96 mx-auto rounded-xl border border-slate-700 shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidérurgieSection() {
  const [activeStep, setActiveStep] = useState(0)
  
  const steps = [
    {
      title: "Extraction du minerai",
      description: "Roche contenant de la magnétite, hématite ou oxydes. La gangue (roche inutile) doit être éliminée.",
      icon: "⛏️"
    },
    {
      title: "Préparation",
      description: "Concassage, broyage en poudre fine (<1mm), criblage et séparation magnétique ou par densité.",
      icon: "⚙️"
    },
    {
      title: "Haut-fourneau",
      description: "Production de fonte avec minerai, coke et ferraille. Fontes blanches (pour acier) ou grises (coulée).",
      icon: "🔥"
    },
    {
      title: "Production d'acier",
      description: "Convertisseur à oxygène ou four électrique. Ajustement du carbone (0,02-2%) et des alliages.",
      icon: "⚗️"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
      <h2 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white flex items-center justify-center gap-3">
        <Factory className="w-8 h-8 text-amber-600" />
        Sidérurgie & Production de l'Acier
      </h2>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-5 rounded-2xl transition-all ${
              activeStep === i
                ? 'bg-amber-500 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-md'
            } border border-slate-200 dark:border-slate-700`}
          >
            <div className="text-3xl mb-2">{step.icon}</div>
            <div className="text-sm font-semibold">{step.title}</div>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{steps[activeStep].icon}</div>
          <div>
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-amber-600 mb-2">🌱 Matières premières</h4>
          <ul className="text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Minerai de fer (magnetite, hématite)</li>
            <li>• Coke (issu de la houille)</li>
            <li>• Ferraille (recyclage)</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-amber-600 mb-2">🔥 Procédés</h4>
          <ul className="text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Haut-fourneau (fonte)</li>
            <li>• Convertisseur à oxygène</li>
            <li>• Four à arc électrique</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-amber-600 mb-2">📊 Stats mondiales</h4>
          <ul className="text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Chine : 55,3%</li>
            <li>• Inde : 7,9%</li>
            <li>• Japon : 4,5%</li>
            <li>• Etats-Unis : 4,3%</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [search, setSearch] = useState('')
  const [selectedMetal, setSelectedMetal] = useState<Metal | null>(null)
  const [activeHistoryTab, setActiveHistoryTab] = useState<HistoryPeriod>('xvie')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredMetals = useMemo(() => {
    let filtered = filter === 'Tous' ? METALS : METALS.filter(m => m.category === filter)
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.properties.some(p => p.value.toLowerCase().includes(query)) ||
        m.horlogerieUse.some(u => u.toLowerCase().includes(query))
      )
    }
    return filtered
  }, [filter, search])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header amélioré */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl'
            : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md'
        } border-b border-slate-200 dark:border-slate-700`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/theorie" className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-semibold">
            <ChevronLeft className="w-5 h-5" /> Retour à la théorie
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un matériau..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section améliorée */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Gem className="w-64 h-64 text-amber-400/5 animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 tracking-tight">
            Matériaux d'Exception
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Découvrez les métaux, alliages et matériaux innovants qui composent les garde-temps suisses. 
            Du savoir-faire traditionnel aux nanotechnologies du XXIe siècle.
          </p>
          
          {/* Stats de la page */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-amber-600">17</div>
              <div className="text-xs text-slate-500">Métaux & Alliages</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-amber-600">4</div>
              <div className="text-xs text-slate-500">Siècles d'histoire</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-amber-600">100%</div>
              <div className="text-xs text-slate-500">Recyclable (Al, Ti)</div>
            </div>
          </div>
        </div>

        {/* Navigation améliorée */}
        <nav className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    filter === cat
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-lg border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat === 'Tous' && <Layers className="w-4 h-4" />}
                  {cat === 'Métaux purs' && <Atom className="w-4 h-4" />}
                  {cat === 'Alliages' && <Shield className="w-4 h-4" />}
                  {cat === 'Acier & Fer' && <Hammer className="w-4 h-4" />}
                  {cat === 'Innovation' && <Sparkles className="w-4 h-4" />}
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-64"
              />
            </div>
          </div>
        </nav>

        {/* Grille des matériaux avec les fiches PDF */}
        <section className="mb-20">
          {filteredMetals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-2">Aucun matériau trouvé</h3>
              <p className="text-slate-500">Essayez de modifier votre recherche ou vos filtres</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMetals.map((metal) => (
                <MetalCard key={metal.id} metal={metal} onClick={() => setSelectedMetal(metal)} />
              ))}
            </div>
          )}
        </section>

        {/* Section Sidérurgie */}
        <SidérurgieSection />

        {/* Section Histoire Interactive */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border-4 border-amber-500/30 mb-12">
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
              href="https://idchufzbxxy7.space.minimax.io/ " 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <ExternalLink className="w-5 h-5" />
              Voir la version complète sur HorloLearn.ch
            </a>
          </div>
        </section>

        {/* Section Techniques de Transformation */}
        <section className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <Hammer className="w-8 h-8 text-amber-500" />
            Techniques de Transformation
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-amber-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-3">🔨 Usinage CNC</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Fraisage et tournage haute précision pour les boîtiers et composants. Tolérances de quelques microns.
              </p>
              <div className="text-xs text-amber-600 dark:text-amber-500 font-semibold">Matériaux : Acier, Titane, Laiton</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-blue-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">⚡ Électroérosion</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Technique pour usiner des formes complexes dans les matériaux durs comme la céramique et le carbure.
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-500 font-semibold">Matériaux : Céramique, Carbure, Titane</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-purple-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-400 mb-3">🎨 Traitement PVD/DLC</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Dépôt sous vide de couches protectrices ultra-dures en nitrure ou carbone diamant.
              </p>
              <div className="text-xs text-purple-600 dark:text-purple-500 font-semibold">Matériaux : Acier, Titane</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-green-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-3">🔥 Frittage</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Fusion à haute température pour la céramique technique. Processus de 1400-1600°C sur plusieurs jours.
              </p>
              <div className="text-xs text-green-600 dark:text-green-500 font-semibold">Matériaux : Céramique ZrO2, SiC</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-red-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-3">💎 Polissage</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Finitions miroir ou satinées réalisées à la main. Plusieurs heures pour un boîtier de haute horlogerie.
              </p>
              <div className="text-xs text-red-600 dark:text-red-500 font-semibold">Matériaux : Acier, Or, Platine</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-indigo-200 dark:border-slate-600 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-3">⚗️ Galvanoplastie</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                Dépôt électrolytique de métaux précieux (rhodiage, dorure) pour protéger et embellir.
              </p>
              <div className="text-xs text-indigo-600 dark:text-indigo-500 font-semibold">Matériaux : Laiton, Maillechort</div>
            </div>
          </div>
        </section>

        {/* Tableau comparatif amélioré */}
        <section className="bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-black text-center mb-8 text-slate-900 dark:text-white">
            📊 Comparaison des Propriétés
          </h2>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-500 text-white">
                  <th className="px-4 py-4 text-left font-bold rounded-tl-xl">Matériau</th>
                  <th className="px-4 py-4 text-center font-bold">Densité</th>
                  <th className="px-4 py-4 text-center font-bold">Dureté HV</th>
                  <th className="px-4 py-4 text-center font-bold">Résistance</th>
                  <th className="px-4 py-4 text-center font-bold">Usinabilité</th>
                  <th className="px-4 py-4 text-center font-bold rounded-tr-xl">Coût</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">Acier 316L</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">7,9 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">200</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-20 h-2 bg-green-500 rounded-full"></span>
                    <span className="sr-only">Excellente</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-24 h-2 bg-green-500 rounded-full"></span>
                    <span className="sr-only">Excellente</span>
                  </td>
                  <td className="px-4 py-4 text-center text-green-600 dark:text-green-400 font-bold">€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">Titane Grade 5</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">4,5 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">350</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-24 h-2 bg-blue-500 rounded-full"></span>
                    <span className="sr-only">Très bonne</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-12 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="sr-only">Difficile</span>
                  </td>
                  <td className="px-4 py-4 text-center text-orange-600 dark:text-orange-400 font-bold">€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">Céramique ZrO2</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">6,0 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">1400</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-full h-2 bg-purple-500 rounded-full"></span>
                    <span className="sr-only">Exceptionnelle</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-8 h-2 bg-red-500 rounded-full"></span>
                    <span className="sr-only">Très difficile</span>
                  </td>
                  <td className="px-4 py-4 text-center text-red-600 dark:text-red-400 font-bold">€€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">Or 18K</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">15,5 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">120</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-16 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="sr-only">Bonne</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-20 h-2 bg-green-500 rounded-full"></span>
                    <span className="sr-only">Excellente</span>
                  </td>
                  <td className="px-4 py-4 text-center text-red-600 dark:text-red-400 font-bold">€€€€€</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">Platine 950</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">21,5 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">135</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-18 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="sr-only">Bonne</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-16 h-2 bg-green-500 rounded-full"></span>
                    <span className="sr-only">Bonne</span>
                  </td>
                  <td className="px-4 py-4 text-center text-red-600 dark:text-red-400 font-bold">€€€€€€</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white rounded-bl-xl">Laiton horloger</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">8,7 g/cm³</td>
                  <td className="px-4 py-4 text-center text-slate-700 dark:text-slate-300">150</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-16 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="sr-only">Bonne</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-block w-24 h-2 bg-green-500 rounded-full"></span>
                    <span className="sr-only">Excellente</span>
                  </td>
                  <td className="px-4 py-4 text-center text-green-600 dark:text-green-400 font-bold rounded-br-xl">€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold">HV :</span> Dureté Vickers
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">€ :</span> Indicateur de coût relatif
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-600" /> Résistance à la corrosion
            </div>
          </div>
        </section>

        {/* Bouton d'export PDF */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-amber-500 dark:to-amber-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-amber-500/30">
            <Download className="w-5 h-5" />
            Télécharger le guide complet (PDF)
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedMetal && (
        <MetalDetailModal metal={selectedMetal} onClose={() => setSelectedMetal(null)} />
      )}
    </main>
  )
}
