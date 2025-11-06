'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText,
  Brain, Clock, Trophy, RefreshCw, ArrowRight, ArrowLeft,
  Scale, BookOpen, ChevronDown, ChevronUp,
  AlertTriangle, Lightbulb, Eye, Info, Search, Filter, HelpCircle,
  Target, X
} from 'lucide-react'

// --- Types ---
type SectionType = 'champs' | 'cartouche' | 'quiz' | 'tableaux' | 'memo' | 'faq' | 'normes'
interface CartoucheField {
  id: string
  name: string
  category: string
  obligation: string
  description: string
  example: string
  characters: string
}

// --- Données principales ---
const cartoucheFieldsData: CartoucheField[] = [
  { id: 'entreprise', name: 'Nom de l\'entreprise', category: 'Identification', obligation: 'Obligatoire', description: 'Raison sociale de l\'entreprise ou logo.', example: 'Manufacture Horlogère SA', characters: '30 caractères' },
  { id: 'titre', name: 'Titre', category: 'Descriptif', obligation: 'Obligatoire', description: 'Désignation de la pièce.', example: 'Platine calibre 2824', characters: '25-30 caractères' },
  { id: 'numero-piece', name: 'Numéro de pièce', category: 'Identification', obligation: 'Obligatoire', description: 'Référence unique.', example: 'P-2824-001-A', characters: '15-20 caractères' },
  { id: 'materiau', name: 'Matériau', category: 'Technique', obligation: 'Obligatoire', description: 'Matière première.', example: 'Maillechort', characters: '20 caractères' },
  { id: 'traitement', name: 'Traitement de surface', category: 'Technique', obligation: 'Conditionnel', description: 'Traitements.', example: 'Rhodiage', characters: '30 caractères' },
  { id: 'masse', name: 'Masse', category: 'Technique', obligation: 'Conditionnel', description: 'Poids.', example: '0.45 g', characters: '10 caractères' },
  { id: 'echelle', name: 'Échelle', category: 'Représentation', obligation: 'Obligatoire', description: 'Rapport dimensions.', example: '2:1', characters: '10 caractères' },
  { id: 'tolerance-generale', name: 'Tolérance générale', category: 'Technique', obligation: 'Conditionnel', description: 'Tolérances.', example: 'ISO 2768-m', characters: '20 caractères' },
  { id: 'projection', name: 'Méthode de projection', category: 'Représentation', obligation: 'Obligatoire', description: 'Méthode E ou A.', example: 'Symbole E', characters: 'Symbole' },
  { id: 'format', name: 'Format', category: 'Document', obligation: 'Obligatoire', description: 'Format du plan.', example: 'A4', characters: '4 caractères' },
  { id: 'indice', name: 'Indice de révision', category: 'Gestion', obligation: 'Obligatoire', description: 'Version.', example: 'A / B', characters: '4 caractères' },
  { id: 'dessinateur', name: 'Dessinateur', category: 'Administratif', obligation: 'Obligatoire', description: 'Auteur.', example: 'J. Dupont', characters: '20 caractères' },
  { id: 'verificateur', name: 'Vérificateur', category: 'Administratif', obligation: 'Obligatoire', description: 'Vérificateur.', example: 'M. Martin', characters: '20 caractères' },
  { id: 'date', name: 'Date', category: 'Administratif', obligation: 'Obligatoire', description: 'Date.', example: '17.10.2025', characters: '10 caractères' }
]

// --- Navigation principale ---
const Navigation = ({ currentSection, onSectionChange, darkMode }: any) => {
  const sections = [
    { id: 'champs', label: 'Champs', icon: BookOpen },
    { id: 'cartouche', label: 'Cartouche', icon: Target },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'tableaux', label: 'Tableaux', icon: FileText },
    { id: 'memo', label: 'Mémo', icon: Trophy },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'normes', label: 'Normes', icon: Scale }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cartouche ISO</h1>
        <div className="hidden md:flex gap-2">
          {sections.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  currentSection === item.id
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// --- Sections ---
const FieldsExplorer = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 px-6">
    <div className="max-w-6xl mx-auto">
      <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>14 Champs du Cartouche</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {cartoucheFieldsData.map(f => (
          <div key={f.id} className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{f.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const InteractiveCartouche = ({ darkMode }: any) => {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField)

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Schéma Interactif du Cartouche
        </h1>

        <div className="bg-slate-700 rounded-xl p-6 border-2 border-slate-600">
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
            {cartoucheFieldsData.map(f => (
              <button key={f.id} onClick={() => setSelectedField(f.id)}
                className={`p-3 rounded-lg transition-all ${selectedField === f.id ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`}>
                <span className={`text-xs font-semibold ${selectedField === f.id ? 'text-white' : 'text-slate-200'}`}>
                  {f.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedFieldData && (
          <div className={`rounded-xl p-6 mt-8 border-l-4 border-blue-600 ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedFieldData.name}</h3>
            <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}><strong>Description:</strong> {selectedFieldData.description}</p>
            <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}><strong>Exemple:</strong> {selectedFieldData.example}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const TablesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Formats ISO 5457</h1>
      <table className={`w-full rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
          <tr>
            <th className="px-6 py-4 text-left">Format</th>
            <th className="px-6 py-4 text-left">Dimensions (mm)</th>
            <th className="px-6 py-4 text-left">Marge</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="px-6 py-4 font-bold text-blue-500">A4</td><td>210 × 297</td><td>10 mm</td></tr>
          <tr><td className="px-6 py-4 font-bold text-blue-500">A3</td><td>297 × 420</td><td>10 mm</td></tr>
        </tbody>
      </table>
    </div>
  </div>
)

const MemoSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-red-950/30' : 'bg-red-50'}`}>
        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center"><XCircle className="w-6 h-6 mr-2" />Erreurs</h3>
        <ul className="space-y-2">
          <li>Oublier champs obligatoires</li>
          <li>Ne pas mettre à jour indice</li>
          <li>Abréviations non normalisées</li>
        </ul>
      </div>
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-950/30' : 'bg-green-50'}`}>
        <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center"><CheckCircle className="w-6 h-6 mr-2" />Bonnes pratiques</h3>
        <ul className="space-y-2">
          <li>Remplir champs obligatoires</li>
          <li>Désignations normalisées</li>
          <li>Tolérances claires</li>
        </ul>
      </div>
    </div>
  </div>
)

const FAQSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>FAQ</h1>
      <div className="space-y-4">
        <div>
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Différence entre O et C ?</p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>O = obligatoire, C = conditionnel</p>
        </div>
        <div>
          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gérer les révisions ?</p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Tableau de révision avec indice, date, etc.</p>
        </div>
      </div>
    </div>
  </div>
)

const NormesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Normes</h1>
      <ul className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
        <li>ISO 7200 — Identification et champs du cartouche</li>
        <li>ISO 5457 — Formats et marges des dessins techniques</li>
        <li>ISO 128 — Principes généraux de représentation</li>
      </ul>
    </div>
  </div>
)

// --- Page principale ---
export default function Page() {
  const [darkMode] = useState(true)
  const [section, setSection] = useState<SectionType>('cartouche')

  return (
    <main className={darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}>
      <Navigation currentSection={section} onSectionChange={setSection} darkMode={darkMode} />
      {section === 'champs' && <FieldsExplorer darkMode={darkMode} />}
      {section === 'cartouche' && <InteractiveCartouche darkMode={darkMode} />}
      {section === 'tableaux' && <TablesSection darkMode={darkMode} />}
      {section === 'memo' && <MemoSection darkMode={darkMode} />}
      {section === 'faq' && <FAQSection darkMode={darkMode} />}
      {section === 'normes' && <NormesSection darkMode={darkMode} />}
    </main>
  )
}
