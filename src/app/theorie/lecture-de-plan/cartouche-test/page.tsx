'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, CheckCircle, AlertCircle } from 'lucide-react'

export default function Page() {
  const [selected, setSelected] = useState<string | null>(null)

  const fields = [
    { id: 'entreprise', name: "Nom de l'entreprise", short: "Nom de l'entr...", obligation: 'O', category: 'Identification', description: "Nom de la société ou de l’organisme responsable du document technique.", example: 'ROLEX S.A.', pos: { r: 1, c: 1, cs: 2, rs: 2 } },
    { id: 'titre', name: 'Titre', short: 'Titre', obligation: 'O', category: 'Identification', description: "Titre ou désignation du document technique.", example: 'Caisse de montre', pos: { r: 1, c: 3, cs: 3, rs: 1 } },
    { id: 'numero', name: 'Numéro de pièce', short: 'Numéro de pièce', obligation: 'O', category: 'Identification', description: "Numéro unique de la pièce, du produit ou de l’ensemble.", example: 'W-1234', pos: { r: 1, c: 6, cs: 1, rs: 1 } },
    { id: 'dessinateur', name: 'Dessinateur', short: 'Dessinateur', obligation: 'O', category: 'Responsabilité', description: "Nom de la personne qui a établi le document technique.", example: 'J. MARTIN', pos: { r: 2, c: 1, cs: 1, rs: 1 } },
    { id: 'verificateur', name: 'Vérificateur', short: 'Vérificateur', obligation: 'O', category: 'Responsabilité', description: "Nom de la personne qui a vérifié et approuvé le document technique.", example: 'P. DUBOIS', pos: { r: 3, c: 1, cs: 1, rs: 1 } },
    { id: 'materiau', name: 'Matériau', short: 'Matériau', obligation: 'O', category: 'Spécifications', description: "Désignation du ou des matériaux constitutifs de la pièce.", example: 'Acier 316L', pos: { r: 2, c: 2, cs: 1, rs: 1 } },
    { id: 'traitement', name: 'Traitement de surface', short: 'Traitement de...', obligation: 'C', category: 'Spécifications', description: "Désignation du traitement superficiel appliqué à la pièce.", example: 'Poli, satiné', pos: { r: 2, c: 3, cs: 1, rs: 1 } },
    { id: 'masse', name: 'Masse', short: 'Masse', obligation: 'C', category: 'Spécifications', description: "Masse de la pièce en grammes.", example: '12,5 g', pos: { r: 2, c: 4, cs: 1, rs: 1 } },
    { id: 'echelle', name: 'Échelle', short: 'Échell...', obligation: 'O', category: 'Spécifications', description: "Échelle de représentation du document technique.", example: '2 : 1', pos: { r: 2, c: 5, cs: 1, rs: 1 } },
    { id: 'tolerance', name: 'Tolérance générale', short: 'Tolérance gén...', obligation: 'C', category: 'Spécifications', description: "Tolérance générale applicable aux cotes sans indications particulières.", example: '± 0,2', pos: { r: 3, c: 2, cs: 1, rs: 1 } },
    { id: 'projection', name: 'Méthode de projection', short: "Méthode d'ap...", obligation: 'O', category: 'Spécifications', description: "Méthode de représentation utilisée pour le document technique.", example: 'Perspective', pos: { r: 3, c: 3, cs: 1, rs: 1 } },
    { id: 'format', name: 'Format', short: 'Forma...', obligation: 'O', category: 'Identification', description: "Format du support utilisé pour le document technique.", example: 'A4', pos: { r: 3, c: 4, cs: 1, rs: 1 } },
    { id: 'indice', name: 'Indice de révision', short: 'Indice de...', obligation: 'O', category: 'Identification', description: "Indice de révision et sa date qui identifie la version du document.", example: 'B', pos: { r: 3, c: 5, cs: 1, rs: 1 } },
    { id: 'date', name: 'Date', short: 'Date', obligation: 'O', category: 'Identification', description: "Date d’établissement, de vérification ou d’approbation du document.", example: '05/11/2025', pos: { r: 3, c: 6, cs: 1, rs: 1 } }
  ]

  const indicator = (t: 'O' | 'C') => (
    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${t === 'O' ? 'bg-red-500' : 'bg-blue-500'}`}>{t}</div>
  )

  const icon = (t: 'O' | 'C') => (t === 'O' ? <CheckCircle className="w-4 h-4 text-red-500" /> : <AlertCircle className="w-4 h-4 text-blue-500" />)

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Schéma Interactif du Cartouche</h1>
        <p className="text-gray-600 mb-2">Cliquez sur un champ dans le schéma ou dans la liste ci-dessous pour voir ses détails.</p>
        <p className="text-sm text-gray-500">Position : Coin inférieur droit du plan (ISO 5457)</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto mb-8 p-8 rounded-2xl max-w-4xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg"
      >
        <div className="relative bg-gray-700 rounded-xl p-6 min-h-[400px]">
          <div
            className="grid gap-2 h-full"
            style={{
              gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.8fr 0.6fr',
              gridTemplateRows: 'auto auto auto auto'
            }}
          >
            {fields.map(f => (
              <motion.div
                key={f.id}
                onClick={() => setSelected(f.id)}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-white rounded-lg p-3 text-sm font-medium text-gray-900 cursor-pointer transition-all ${selected === f.id ? 'ring-4 ring-yellow-400' : 'hover:shadow-lg'}`}
                style={{ gridColumn: `${f.pos.c} / span ${f.pos.cs}`, gridRow: `${f.pos.r} / span ${f.pos.rs}` }}
              >
                {f.short}
                {indicator(f.obligation)}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O</div>
            <span className="text-gray-600">Obligatoire (O)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="text-gray-600">Conditionnel (C)</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {fields.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            onClick={() => setSelected(f.id)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:scale-105 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">{f.category}</span>
              {icon(f.obligation)}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{f.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{f.description}</p>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Exemple :</p>
              <p className="font-mono text-gray-800">{f.example}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
