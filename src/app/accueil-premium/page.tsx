'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export default function VueAssemblage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)

  const pages = [
    {
      id: 1,
      title: 'Vue d\'assemblage - Planche 1',
      image: '/images/eta6497/assemblage-1.png',
      pieces: [
        { id: '5', nom: 'Balancier-spiral complet', x: 29, y: 76 },
        { id: '3', nom: 'Roue d\'échappement', x: 30, y: 59 },
        { id: '4', nom: 'Ancre', x: 29, y: 51 },
        { id: '2', nom: 'Coq', x: 34, y: 39 },
        { id: '1-1', nom: 'Platine côté cadran', x: 10, y: 38 },
        { id: '1-2', nom: 'Platine côté ponts (centre)', x: 67, y: 35 },
        { id: '1-2', nom: 'Platine côté ponts (droite)', x: 91, y: 39 },
        { id: '900 VAR', nom: 'Vis de réglage', x: 72, y: 50 },
      ]
    },
    {
      id: 2,
      title: 'Vue d\'assemblage - Planche 2',
      image: '/images/eta6497/assemblage-2.png',
      pieces: [
        { id: '901 VAR', nom: 'Vis de pont de seconde', x: 56, y: 2 },
        { id: '11', nom: 'Pont de seconde', x: 55, y: 11 },
        { id: '10 VAR', nom: 'Pignon de seconde', x: 56, y: 23 },
        { id: '9', nom: 'Roue de seconde', x: 51, y: 31 },
        { id: '8', nom: 'Goupille raquette', x: 55, y: 38 },
        { id: '7', nom: 'Raquette', x: 31, y: 45 },
        { id: '6', nom: 'Piton', x: 26, y: 52 },
      ]
    },
    {
      id: 3,
      title: 'Vue d\'assemblage - Planche 3',
      image: '/images/eta6497/assemblage-3.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de pont (gauche)', x: 42, y: 6 },
        { id: '902 VAR', nom: 'Vis de pont (droite)', x: 56, y: 7 },
        { id: '16 VAR', nom: 'Pont de finissage', x: 66, y: 17 },
        { id: '15', nom: 'Roue de grande moyenne', x: 50, y: 31 },
        { id: '14 VAR', nom: 'Pignon de moyenne', x: 62, y: 42 },
        { id: '13', nom: 'Roue de moyenne', x: 37, y: 54 },
        { id: '12', nom: 'Roue de centre', x: 59, y: 61 },
      ]
    },
    {
      id: 4,
      title: 'Vue d\'assemblage - Planche 4',
      image: '/images/eta6497/assemblage-4.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de pont (gauche)', x: 7, y: 11 },
        { id: '902 VAR', nom: 'Vis de pont (centre)', x: 25, y: 5 },
        { id: '902 VAR', nom: 'Vis de pont (droite)', x: 46, y: 6 },
        { id: '905 VAR', nom: 'Cliquet', x: 72, y: 15 },
        { id: '23 VAR', nom: 'Roue de couronne', x: 76, y: 25 },
        { id: '18 VAR', nom: 'Pont de barillet', x: 32, y: 28 },
        { id: '904 VAR', nom: 'Vis de bride', x: 68, y: 34 },
        { id: '17 VAR', nom: 'Tambour de barillet', x: 36, y: 37 },
        { id: '22', nom: 'Rochet', x: 65, y: 41 },
        { id: '21', nom: 'Bride', x: 54, y: 47 },
        { id: '903 VAR', nom: 'Vis de rochet', x: 78, y: 47 },
        { id: '20 VAR', nom: 'Ressort de barillet', x: 81, y: 54 },
        { id: '19', nom: 'Arbre de barillet', x: 74, y: 61 },
      ]
    },
    {
      id: 5,
      title: 'Vue d\'assemblage - Planche 5',
      image: '/images/eta6497/assemblage-5.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de coq', x: 67, y: 3 },
        { id: '28 VAR', nom: 'Ellipse', x: 68, y: 12 },
        { id: '28-5', nom: 'Spiral flat overcoil', x: 27, y: 12 },
        { id: '28-4', nom: 'Spiral Breguet', x: 22, y: 20 },
        { id: '28-3', nom: 'Spiral plat', x: 18, y: 28 },
        { id: '28-2', nom: 'Stud', x: 23, y: 35 },
        { id: '28-1 VAR', nom: 'Virole', x: 22, y: 43 },
        { id: '24 VAR', nom: 'Balancier seul', x: 8, y: 62 },
        { id: '27', nom: 'Double plateau rivé', x: 80, y: 32 },
        { id: '906 VAR', nom: 'Chaton (haut)', x: 77, y: 69 },
        { id: '906 VAR', nom: 'Chaton (bas)', x: 90, y: 73 },
        { id: '26 VAR', nom: 'Grande plateau', x: 88, y: 78 },
        { id: '25', nom: 'Petite plateau', x: 87, y: 88 },
      ]
    },
    {
      id: 6,
      title: 'Vue d\'assemblage - Planche 6',
      image: '/images/eta6497/assemblage-6.png',
      pieces: [
        { id: '29 VAR', nom: 'Contre-pivot', x: 50, y: 18 },
      ]
    },
  ]

  const currentPageData = pages[currentPage - 1]

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleResetZoom = () => setZoom(1)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Header */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Vue d'Assemblage <span className="text-[#E2B44F]">ETA 6497</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Nomenclature interactive des composants du mouvement
              </p>
            </div>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
                title="Zoom arrière"
              >
                <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
                title="Zoom avant"
              >
                <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
                title="Réinitialiser"
              >
                <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2 mt-6">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  currentPage === page.id
                    ? 'bg-[#E2B44F] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {page.id}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Viewer */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Image Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {currentPageData.title}
                </h3>
              </div>

              <div className="relative bg-white dark:bg-slate-950 aspect-[4/3] overflow-auto">
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                >
                  {/* Image réelle */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={`/images/eta6497/assemblage-${currentPageData.id}.png`}
                      alt={currentPageData.title}
                      className="max-w-full max-h-full object-contain"
                    />

                    {/* Labels des pièces positionnés sur l'image */}
                    {currentPageData.pieces.map((piece, idx) => (
                      <button
                        key={`${piece.id}-${idx}`}
                        onClick={() => setSelectedPiece(piece.id)}
                        className={`absolute px-2 py-1 rounded-md text-[10px] font-bold transition-all duration-200 ${
                          selectedPiece === piece.id
                            ? 'bg-[#E2B44F] text-white scale-110 shadow-lg z-20'
                            : 'bg-slate-800/80 text-white hover:bg-[#E2B44F]/90 z-10 backdrop-blur-sm'
                        }`}
                        style={{ 
                          left: `${piece.x}%`, 
                          top: `${piece.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {piece.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>

                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Planche {currentPage} / {pages.length}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
                  disabled={currentPage === pages.length}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Zoom Controls Mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-4 bg-gray-100 dark:bg-slate-800 rounded-lg p-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Nomenclature Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg sticky top-6">
              <div className="bg-gradient-to-r from-[#E2B44F] to-[#C9A043] px-6 py-4 rounded-t-2xl">
                <h3 className="font-bold text-white text-lg">
                  Nomenclature
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Cliquez sur une pièce pour la localiser
                </p>
              </div>

              <div className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-2">
                  {currentPageData.pieces.map((piece, idx) => (
                    <button
                      key={`${piece.id}-${idx}`}
                      onClick={() => setSelectedPiece(piece.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedPiece === piece.id
                          ? 'bg-[#E2B44F]/20 border-2 border-[#E2B44F] shadow-md'
                          : 'bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-[#E2B44F]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-sm font-bold text-[#E2B44F] mb-1">
                            {piece.id}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {piece.nom}
                          </div>
                        </div>
                        {selectedPiece === piece.id && (
                          <div className="w-2 h-2 bg-[#E2B44F] rounded-full animate-pulse" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">
                    {currentPageData.pieces.length}
                  </strong> composants sur cette planche
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-[#E2B44F]/10 via-[#E2B44F]/5 to-transparent border border-[#E2B44F]/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            À propos des vues d'assemblage
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Ces schémas techniques représentent l'assemblage complet du calibre ETA 6497-1, 
            un mouvement mécanique à remontage manuel de référence dans l'horlogerie suisse. 
            Chaque composant est numéroté et identifié pour faciliter la compréhension 
            de la structure du mouvement.
          </p>
        </div>
      </section>
    </main>
  )
}
