'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, Factory, Search, Shield, Gauge, Clock, 
  Atom, Hammer, Globe, Info, Zap, Calendar, ArrowRight, 
  BookOpen, FileText, Download, X
} from 'lucide-react'

// 📂 IMPORTANT : Le PDF complet et ses pages
// Placez dans /public/pdfs/ :
// - metaux-communs.pdf (document complet)
// - page-29.png (Chrome)
// - page-30.png (Aluminium)  
// - page-31.png (Titane)
// - page-32.png (Nickel)
// - etc. jusqu'à page-40.png

type Metal = {
  id: string
  title: string
  symbol: string
  colorClass: string
  pdfPage: string // Page spécifique du PDF
  properties: { label: string; value: string }[]
  horlogerieUse: string[]
  category: string
  historicalPeriod: string
  description: string
  pdfPageNumber: number
}

const METALS: Metal[] = [
  {
    id: 'titane',
    title: 'Le Titane (Ti)',
    symbol: 'Ti',
    pdfPage: '/pdfs/page-31.png',
    pdfPageNumber: 31,
    colorClass: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    description: "Métal léger ultra-performant, 45% moins dense que l'acier. Extraction de l'ilménite et du rutile. En horlogerie, allié à l'aluminium, l'étain ou le molybdène.",
    properties: [
      { label: 'Masse volumique', value: '4,54 kg/dm³' },
      { label: 'Point de fusion', value: '1660°C' },
      { label: 'Résistance', value: 'Excellente rapport résistance/masse' },
      { label: 'Spécificités', value: 'Amagnétique, hypoallergénique, recyclable' }
    ],
    horlogerieUse: [
      "Boîtiers allégés de 45% vs acier (montres sport)",
      "Platines techniques de mouvement",
      "Vis spéciales haute résistance",
      "Bracelets ultra-confortables",
      "Montres de plongée professionnelles"
    ],
    category: 'Métaux légers',
    historicalPeriod: 'XXe siècle'
  },
  // ... (tous les autres métaux avec pdfPage correspondant)
  {
    id: 'nickel',
    title: 'Le Nickel (Ni)',
    symbol: 'Ni',
    pdfPage: '/pdfs/page-32.png',
    pdfPageNumber: 32,
    colorClass: 'bg-gradient-to-br from-gray-300 to-gray-500',
    description: "Métal blanc ferromagnétique. Alliage Invar® 36% Ni pour horlogerie (faible dilatation). Utilisé dans les aciers inoxydables.",
    properties: [
      { label: 'Masse volumique', value: '8,906 kg/dm³' },
      { label: 'Point de fusion', value: '1455°C' },
      { label: 'Propriété', value: 'Ferromagnétique' },
      { label: 'Attention', value: 'Allergène (normes restrictives)' }
    ],
    horlogerieUse: [
      "Invar® pour ressorts spiraux (faible dilatation)",
      "Balanciers à inertie stable",
      "Remplacé par Mo pour allergies",
      "Aciers inox 316L (10% Ni)"
    ],
    category: 'Métaux purs',
    historicalPeriod: 'XIXe siècle'
  }
]

const CATEGORIES = ['Tous', 'Métaux purs', 'Alliages', 'Acier & Fer', 'Métaux légers'] as const
type Category = (typeof CATEGORIES)[number]

type HistoryPeriod = 'xvie' | 'xviiie' | 'xxe' | 'xxie'
const HISTORY_TABS = [
  { id: 'xvie' as HistoryPeriod, label: 'XVIe-XVIIe' },
  { id: 'xviiie' as HistoryPeriod, label: 'XVIIIe-XIXe' },
  { id: 'xxe' as HistoryPeriod, label: 'XXe siècle' },
  { id: 'xxie' as HistoryPeriod, label: 'XXIe siècle' },
]

function PdfViewerModal({ page, pageNumber, onClose }: { page: string; pageNumber: number; onClose: () => void }) {
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
          className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border-2 border-amber-500/30"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Page {pageNumber} - Cours du Professeur</h2>
              <p className="text-sm opacity-90">Document original du module "Métaux Communs"</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image de la page du PDF */}
          <div className="p-8 bg-white">
            <img
              src={page}
              alt={`Page ${pageNumber} du cours`}
              className="w-full h-auto rounded-lg shadow-lg border border-slate-200"
            />
          </div>

          {/* Footer avec actions */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
            <a
              href="/pdfs/metaux-communs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Télécharger le PDF complet
            </a>
            <span className="text-sm text-slate-500">
              Cliquez à l'extérieur pour fermer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetalCard({ metal, onClick }: { metal: Metal; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl shadow-lg"
    >
      {/* Aperçu de la page du PDF */}
      <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={metal.pdfPage}
          alt={`Page ${metal.pdfPageNumber} - ${metal.title}`}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${metal.colorClass} opacity-10 mix-blend-multiply`}></div>
        
        {/* Badge page PDF */}
        <div className="absolute top-4 left-4">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Page {metal.pdfPageNumber}
          </span>
        </div>

        {/* Badge catégorie */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 px-3 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-600">
            {metal.category}
          </span>
        </div>

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <p className="text-white text-sm font-medium">
            📄 Cliquez pour voir la page complète du PDF
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-14 h-14 ${metal.colorClass} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {metal.symbol}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-amber-400">
              {metal.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {metal.properties[0]?.value} • {metal.properties[1]?.value}
            </p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed">
          {metal.description}
        </p>

        <div className="bg-amber-50 dark:bg-slate-800/50 rounded-lg p-3 border border-amber-200 dark:border-slate-700 mb-4">
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Applications en horlogerie :
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            {metal.horlogerieUse.slice(0, 2).map((use, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-amber-500 mt-0.5">▸</span> {use}
              </li>
            ))}
            {metal.horlogerieUse.length > 2 && (
              <li className="text-amber-600 dark:text-amber-500 font-semibold">
                +{metal.horlogerieUse.length - 2} exemples...
              </li>
            )}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {metal.historicalPeriod}
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm flex items-center gap-1">
            Voir la page du PDF <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  )
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>('Tous')
  const [search, setSearch] = useState('')
  const [pdfViewer, setPdfViewer] = useState<{ page: string; pageNumber: number } | null>(null)

  const filteredMetals = useMemo(() => {
    let filtered = filter === 'Tous' ? METALS : METALS.filter(m => m.category === filter)
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.symbol.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      )
    }
    return filtered
  }, [filter, search])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header avec lien vers PDF complet */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/theorie" className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-semibold">
            <ChevronLeft className="w-5 h-5" /> Retour à la théorie
          </Link>
          
          <a
            href="/pdfs/metaux-communs.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <FileText className="w-4 h-4" />
            PDF du Professeur
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 tracking-tight">
            Guide des Matériaux
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Cours complet basé sur le PDF du professeur. Cliquez sur chaque fiche pour voir la page originale.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
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
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrer les matériaux..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grille des matériaux avec pages du PDF */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
          {filteredMetals.map((metal) => (
            <MetalCard
              key={metal.id}
              metal={metal}
              onClick={() => setPdfViewer({ page: metal.pdfPage, pageNumber: metal.pdfPageNumber })}
            />
          ))}
        </section>

        {/* Visualiseur PDF complet */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-black text-center mb-6 text-slate-900 dark:text-white">
            📖 Consulter le Cours Complet
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Accédez au document original du professeur avec toutes les pages et annotations
          </p>
          <div className="flex justify-center">
            <a
              href="/pdfs/metaux-communs.pdf"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-amber-500 dark:to-amber-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all"
            >
              <FileText className="w-6 h-6" />
              Ouvrir le PDF dans un nouvel onglet
            </a>
          </div>
        </section>
      </div>

      {/* Modal PDF Viewer */}
      {pdfViewer && (
        <PdfViewerModal
          page={pdfViewer.page}
          pageNumber={pdfViewer.pageNumber}
          onClose={() => setPdfViewer(null)}
        />
      )}
    </main>
  )
}
