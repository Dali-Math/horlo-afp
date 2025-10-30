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
        { id: '5', nom: 'Balancier-spiral complet', x: 29, y: 24 },
        { id: '3', nom: 'Roue d\'échappement', x: 30, y: 41 },
        { id: '4', nom: 'Ancre', x: 29, y: 49 },
        { id: '2', nom: 'Coq', x: 34, y: 61 },
        { id: '1-1', nom: 'Platine côté cadran', x: 10, y: 62 },
        { id: '1-2', nom: 'Platine côté ponts (gauche)', x: 67, y: 65 },
        { id: '1-2', nom: 'Platine côté ponts (droite)', x: 91, y: 61 },
        { id: '900 VAR', nom: 'Vis de réglage', x: 72, y: 50 },
      ]
    },
    {
      id: 2,
      title: 'Vue d\'assemblage - Planche 2',
      image: '/images/eta6497/assemblage-2.png',
      pieces: [
        { id: '901 VAR', nom: 'Vis de pont de seconde', x: 56, y: 98 },
        { id: '11', nom: 'Pont de seconde', x: 55, y: 89 },
        { id: '10 VAR', nom: 'Pignon de seconde', x: 56, y: 77 },
        { id: '9', nom: 'Roue de seconde', x: 51, y: 69 },
        { id: '8', nom: 'Goupille raquette', x: 55, y: 62 },
        { id: '7', nom: 'Raquette', x: 31, y: 55 },
        { id: '6', nom: 'Piton', x: 26, y: 48 },
      ]
    },
    {
      id: 3,
      title: 'Vue d\'assemblage - Planche 3',
      image: '/images/eta6497/assemblage-3.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de pont (gauche)', x: 42, y: 94 },
        { id: '902 VAR', nom: 'Vis de pont (droite)', x: 56, y: 93 },
        { id: '16 VAR', nom: 'Pont de finissage', x: 66, y: 83 },
        { id: '15', nom: 'Roue de grande moyenne', x: 50, y: 69 },
        { id: '14 VAR', nom: 'Pignon de moyenne', x: 62, y: 58 },
        { id: '13', nom: 'Roue de moyenne', x: 37, y: 46 },
        { id: '12', nom: 'Roue de centre', x: 59, y: 39 },
      ]
    },
    {
      id: 4,
      title: 'Vue d\'assemblage - Planche 4',
      image: '/images/eta6497/assemblage-4.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de pont (gauche)', x: 7, y: 89 },
        { id: '902 VAR', nom: 'Vis de pont (centre)', x: 25, y: 95 },
        { id: '902 VAR', nom: 'Vis de pont (droite)', x: 46, y: 94 },
        { id: '905 VAR', nom: 'Cliquet', x: 72, y: 85 },
        { id: '23 VAR', nom: 'Roue de couronne', x: 76, y: 75 },
        { id: '18 VAR', nom: 'Pont de barillet', x: 32, y: 72 },
        { id: '904 VAR', nom: 'Vis de bride', x: 68, y: 66 },
        { id: '17 VAR', nom: 'Tambour de barillet', x: 36, y: 63 },
        { id: '22', nom: 'Rochet', x: 65, y: 59 },
        { id: '21', nom: 'Bride', x: 54, y: 53 },
        { id: '903 VAR', nom: 'Vis de rochet', x: 78, y: 53 },
        { id: '20 VAR', nom: 'Ressort de barillet', x: 81, y: 46 },
        { id: '19', nom: 'Arbre de barillet', x: 74, y: 39 },
      ]
    },
    {
      id: 5,
      title: 'Vue d\'assemblage - Planche 5',
      image: '/images/eta6497/assemblage-5.png',
      pieces: [
        { id: '902 VAR', nom: 'Vis de coq', x: 72, y: 98 },
        { id: '28 VAR', nom: 'Ellipse', x: 70, y: 90 },
        { id: '28-5', nom: 'Spiral flat overcoil', x: 39, y: 91 },
        { id: '28-4', nom: 'Spiral Breguet', x: 33, y: 83 },
        { id: '28-3', nom: 'Spiral plat', x: 27, y: 77 },
        { id: '27', nom: 'Double plateau rivé', x: 88, y: 76 },
        { id: '28-2', nom: 'Stud', x: 34, y: 71 },
        { id: '28-1 VAR', nom: 'Virole', x: 31, y: 64 },
        { id: '24 VAR', nom: 'Balancier seul', x: 14, y: 46 },
        { id: '906 VAR', nom: 'Chaton (haut)', x: 69, y: 40 },
        { id: '906 VAR', nom: 'Chaton (bas)', x: 90, y: 37 },
        { id: '26 VAR', nom: 'Grande plateau', x: 90, y: 32 },
        { id: '25', nom: 'Petite plateau', x: 85, y: 24 },
      ]
    },
    {
      id: 6,
      title: 'Vue d\'assemblage - Planche 6',
      image: '/images/eta6497/assemblage-6.png',
      pieces: [
        { id: '29 VAR', nom: 'Contre-pivot', x: 50, y: 82 },
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
                  {/* Placeholder - Remplacer par vraie image */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Image technique - Planche {currentPageData.id}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Schéma d'assemblage ETA 6497
                      </p>
                    </div>

                    {/* Labels des pièces (positionnement simulé) */}
                    {currentPageData.pieces.map((piece, idx) => (
                      <button
                        key={`${piece.id}-${idx}`}
                        onClick={() => setSelectedPiece(piece.id)}
                        className={`absolute px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          selectedPiece === piece.id
                            ? 'bg-[#E2B44F] text-white scale-110 shadow-lg'
                            : 'bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-200 hover:bg-[#E2B44F]/20 dark:hover:bg-[#E2B44F]/20'
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
