'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, CheckCircle, AlertCircle } from 'lucide-react'

interface CartoucheFieldData {
  id: string
  name: string
  shortName: string
  obligation: 'O' | 'C'
  category: string
  position: {
    row: number
    col: number
    colSpan: number
    rowSpan: number
  }
  description: string
  example: string
}

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedField, setSelectedField] = useState<CartoucheFieldData | null>(null)

  const cartoucheFieldsData: CartoucheFieldData[] = [
    { id: 'nom_entreprise', name: "Nom de l'entreprise", shortName: "Nom de l'entr...", obligation: 'O', category: 'Identification', position: { row: 1, col: 1, colSpan: 2, rowSpan: 2 }, description: "Nom de la société ou de l'organisme responsable du document technique", example: 'ROLEX S.A.' },
    { id: 'titre', name: 'Titre', shortName: 'Titre', obligation: 'O', category: 'Identification', position: { row: 1, col: 3, colSpan: 3, rowSpan: 1 }, description: 'Titre ou désignation du document technique, cartouche, vue du produit', example: 'Caisse de montre' },
    { id: 'numero_piece', name: 'Numéro de pièce', shortName: 'Numéro de pièce', obligation: 'O', category: 'Identification', position: { row: 1, col: 6, colSpan: 1, rowSpan: 1 }, description: 'Numéro unique de la pièce, du produit ou de l’ensemble', example: 'W-1234' },
    { id: 'dessinateur', name: 'Dessinateur', shortName: 'Dessinateur', obligation: 'O', category: 'Responsabilité', position: { row: 2, col: 1, colSpan: 1, rowSpan: 1 }, description: 'Nom de la personne ayant établi le document', example: 'J. MARTIN' },
    { id: 'verificateur', name: 'Vérificateur', shortName: 'Vérificateur', obligation: 'O', category: 'Responsabilité', position: { row: 3, col: 1, colSpan: 1, rowSpan: 1 }, description: 'Personne ayant vérifié et approuvé le document', example: 'P. DUBOIS' },
    { id: 'materiau', name: 'Matériau', shortName: 'Matériau', obligation: 'O', category: 'Spécifications', position: { row: 2, col: 2, colSpan: 1, rowSpan: 1 }, description: 'Désignation du matériau constitutif de la pièce', example: 'Acier 316L' },
    { id: 'traitement_surface', name: 'Traitement de surface', shortName: 'Traitement de...', obligation: 'C', category: 'Spécifications', position: { row: 2, col: 3, colSpan: 1, rowSpan: 1 }, description: 'Traitement appliqué à la surface de la pièce', example: 'Poli, satiné' },
    { id: 'masse', name: 'Masse', shortName: 'Masse', obligation: 'C', category: 'Spécifications', position: { row: 2, col: 4, colSpan: 1, rowSpan: 1 }, description: 'Masse de la pièce en grammes', example: '12.5 g' },
    { id: 'echelle', name: 'Échelle', shortName: 'Échell...', obligation: 'O', category: 'Spécifications', position: { row: 2, col: 5, colSpan: 1, rowSpan: 1 }, description: 'Échelle de représentation du dessin', example: '2:1' },
    { id: 'tolerance_generale', name: 'Tolérance générale', shortName: 'Tolérance gén...', obligation: 'C', category: 'Spécifications', position: { row: 3, col: 2, colSpan: 1, rowSpan: 1 }, description: 'Tolérance générale applicable', example: '±0.2' },
    { id: 'methode_projection', name: 'Méthode de projection', shortName: "Méthode d'ap...", obligation: 'O', category: 'Spécifications', position: { row: 3, col: 3, colSpan: 1, rowSpan: 1 }, description: 'Méthode de représentation utilisée', example: 'Perspective européenne (1er dièdre)' },
    { id: 'format', name: 'Format', shortName: 'Forma...', obligation: 'O', category: 'Identification', position: { row: 3, col: 4, colSpan: 1, rowSpan: 1 }, description: 'Format du support papier (ISO 5457)', example: 'A4' },
    { id: 'indice_revision', name: 'Indice de révision', shortName: 'Indice de...', obligation: 'O', category: 'Identification', position: { row: 3, col: 5, colSpan: 1, rowSpan: 1 }, description: 'Indice de révision du document', example: 'B' },
    { id: 'date', name: 'Date', shortName: 'Date', obligation: 'O', category: 'Identification', position: { row: 3, col: 6, colSpan: 1, rowSpan: 1 }, description: 'Date de création ou mise à jour du plan', example: '05/11/2025' }
  ]

  const getObligationIndicator = (obligation: 'O' | 'C') => (
    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${obligation === 'O' ? 'bg-red-500' : 'bg-blue-500'}`}>
      {obligation}
    </div>
  )

  const getObligationIcon = (obligation: 'O' | 'C') =>
    obligation === 'O' ? (
      <CheckCircle className="w-4 h-4 text-red-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-blue-500" />
    )

  return (
    <div className={`min-h-screen pt-24 pb-12 px-6 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Cartouche Horloger Interactif
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cliquez sur un champ pour découvrir sa fonction selon la norme ISO 7200
          </p>
          <p className={`text-sm text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Position : Coin inférieur droit du plan (ISO 5457)
          </p>
        </motion.div>

        {/* CARTOUCHE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`mx-auto mb-8 p-8 rounded-2xl max-w-4xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #1a1d2e 0%, #2a2f42 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
          <div className="relative bg-gray-700 rounded-xl p-6 min-h-[400px]">
            <div
              className="grid gap-2 h-full"
              style={{
                gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.8fr 0.6fr',
                gridTemplateRows: 'auto auto auto auto'
              }}
            >
              {cartoucheFieldsData.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setSelectedField(field)}
                  className={`relative bg-white rounded-lg p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  style={{
                    gridColumn: `${field.position.col} / span ${field.position.colSpan}`,
                    gridRow: `${field.position.row} / span ${field.position.rowSpan}`
                  }}
                >
                  <span className="text-gray-900 text-sm font-medium leading-tight">
                    {field.shortName}
                  </span>
                  {getObligationIndicator(field.obligation)}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O</div>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Obligatoire (O)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Conditionnel (C)</span>
            </div>
          </div>
        </motion.div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedField && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedField(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-2xl w-full rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedField.name}
                  </h2>
                  <button
                    onClick={() => setSelectedField(null)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {getObligationIcon(selectedField.obligation)}
                    <span
                      className={`font-medium ${
                        selectedField.obligation === 'O' ? 'text-red-500' : 'text-blue-500'
                      }`}
                    >
                      {selectedField.obligation === 'O'
                        ? 'Champ obligatoire'
                        : 'Champ conditionnel'}
                    </span>
                  </div>

                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedField.description}
                  </p>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1 text-gray-400">Exemple :</p>
                    <p
                      className={`font-mono text-lg ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {selectedField.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOUTON DARK MODE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-800 hover:bg-gray-900'
        }`}
      >
        <span className="text-white text-xl">{darkMode ? '☀️' : '🌙'}</span>
      </button>
    </div>
  )
}
