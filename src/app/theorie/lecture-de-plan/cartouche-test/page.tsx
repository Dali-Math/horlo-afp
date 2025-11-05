'use client'

import React, { useState } from 'react'
import { ChevronLeft, CheckCircle, XCircle, Book, FileText } from 'lucide-react'

export default function Page() {
  const [selectedField, setSelectedField] = useState<string | null>(null)

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId)
  }

  const cartoucheFields = [
    { id: 'entreprise', name: "Nom de l'entreprise", type: 'O' },
    { id: 'titre', name: 'Titre', type: 'O' },
    { id: 'numero', name: 'Numéro de pièce', type: 'O' },
    { id: 'dessinateur', name: 'Dessinateur', type: 'O' },
    { id: 'materiau', name: 'Matériau', type: 'O' },
    { id: 'traitement', name: 'Traitement de surface', type: 'C' },
    { id: 'masse', name: 'Masse', type: 'C' },
    { id: 'echelle', name: 'Échelle', type: 'O' },
    { id: 'verificateur', name: 'Vérificateur', type: 'O' },
    { id: 'tolerance', name: 'Tolérance générale', type: 'C' },
    { id: 'projection', name: "Méthode d'application", type: 'O' },
    { id: 'format', name: 'Format', type: 'O' },
    { id: 'indice', name: 'Indice de révision', type: 'O' },
    { id: 'date', name: 'Date', type: 'O' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
      <header className="py-6 border-b border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Schéma Interactif du Cartouche</h1>
        <p className="text-gray-500 text-sm mt-1">
          Cliquez sur un champ pour découvrir sa fonction selon la norme ISO 7200
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-slate-800 text-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6 text-slate-300 text-sm">
            Position : Coin inférieur droit du plan (ISO 5457)
          </div>

          <div className="bg-slate-700 rounded-xl p-6">
            {/* --- Ligne 1 --- */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <button
                onClick={() => handleFieldClick('entreprise')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'entreprise'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Nom de l'entr...</span>
                  <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                </div>
              </button>

              <button
                onClick={() => handleFieldClick('titre')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'titre'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Titre</span>
                  <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                </div>
              </button>

              <button
                onClick={() => handleFieldClick('numero')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'numero'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Numéro de pièce</span>
                  <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                </div>
              </button>
            </div>

            {/* --- Ligne 2 --- */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <button
                onClick={() => handleFieldClick('dessinateur')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'dessinateur'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Dessinateur</span>
                  <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                </div>
              </button>

              <button
                onClick={() => handleFieldClick('materiau')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'materiau'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Matériau</span>
                  <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                </div>
              </button>

              <button
                onClick={() => handleFieldClick('traitement')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'traitement'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Traitement de...</span>
                  <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
                </div>
              </button>

              <button
                onClick={() => handleFieldClick('masse')}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedField === 'masse'
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>Masse</span>
                  <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
                </div>
              </button>
            </div>

            {/* --- Ligne 3 --- */}
            <div className="grid grid-cols-6 gap-3">
              {cartoucheFields.slice(8).map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFieldClick(f.id)}
                  className={`p-3 rounded-lg border-2 transition ${
                    selectedField === f.id
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span>{f.name.length > 12 ? f.name.slice(0, 10) + '...' : f.name}</span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        f.type === 'O' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    >
                      {f.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Légende */}
            <div className="flex justify-center items-center gap-6 mt-6 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                Obligatoire
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
                Conditionnel
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
