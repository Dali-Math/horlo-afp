'use client'

import Navigation from '@/components/cartouche/Navigation'
import MemoSection from '@/components/cartouche/MemoSection'
import FAQSection from '@/components/cartouche/FAQSection'
import QuizSection from '@/components/cartouche/QuizSection'
import NormesSection from '@/components/cartouche/NormesSection'
import { GraduationCap, Award } from 'lucide-react'
import { SectionType } from '@/types'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, CheckCircle, XCircle, Book, FileText } from 'lucide-react'

interface CartoucheField {
  id: string;
  name: string;
  category: string;
  obligation: string;
  description: string;
  example: string;
  characters: string;
}

const cartoucheFieldsData: CartoucheField[] = [
  {
    id: 'entreprise',
    name: 'Nom de l\'entreprise',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Raison sociale de l\'entreprise ou logo.',
    example: 'Manufacture Horlogère SA',
    characters: '30 caractères'
  },
  {
    id: 'titre',
    name: 'Titre',
    category: 'Descriptif',
    obligation: 'Obligatoire',
    description: 'Désignation de la pièce ou de l\'ensemble. Doit être clair et normalisé.',
    example: 'Platine calibre 2824 / Pont de balancier',
    characters: '25-30 caractères'
  },
  {
    id: 'numero-piece',
    name: 'Numéro de pièce',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Référence unique de la pièce dans le système de gestion.',
    example: 'P-2824-001-A / MB-453-12',
    characters: '15-20 caractères'
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première utilisée selon nomenclature normalisée.',
    example: 'Maillechort / Laiton CuZn40 / Acier inox 316L',
    characters: '20 caractères'
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Traitements thermiques, revêtements, finitions spéciales.',
    example: 'Rhodiage / Anglage / Perlage / PVD',
    characters: '30 caractères'
  },
  {
    id: 'masse',
    name: 'Masse',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Poids théorique de la pièce (important en horlogerie).',
    example: '0.45 g / 2.3 g',
    characters: '10 caractères'
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Rapport entre les dimensions du dessin et les dimensions réelles.',
    example: '1:1 / 2:1 / 5:1 / 10:1',
    characters: '10 caractères'
  },
  {
    id: 'tolerance-generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Tolérances applicables aux cotes non tolérancées individuellement.',
    example: 'ISO 2768-m / ±0.1 mm',
    characters: '20 caractères'
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la méthode européenne (E) ou américaine (A).',
    example: 'Symbole E (1er dièdre) en Suisse',
    characters: 'Symbole'
  },
  {
    id: 'format',
    name: 'Format',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Format du plan selon ISO 5457 (A0, A1, A2, A3, A4).',
    example: 'A4 / A3',
    characters: '4 caractères'
  },
  {
    id: 'indice',
    name: 'Indice de révision',
    category: 'Gestion',
    obligation: 'Obligatoire',
    description: 'Lettre ou numéro indiquant la version du document.',
    example: 'A / B / C / Rev.1',
    characters: '4 caractères'
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin.',
    example: 'J. Dupont / JD',
    characters: '20 caractères'
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant vérifié le dessin.',
    example: 'M. Martin / MM',
    characters: '20 caractères'
  },
  {
    id: 'date',
    name: 'Date',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière modification.',
    example: '17.10.2025 / 2025-10-17',
    characters: '10 caractères'
  }
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle norme ISO régit les champs de données dans les cartouches d'inscription ?",
    options: ["ISO 5457", "ISO 7200", "ISO 128-1", "ISO 1101"],
    correctAnswer: 1,
    explanation: "La norme ISO 7200:2004 spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques."
  },
  {
    id: 2,
    question: "Où doit obligatoirement se situer le cartouche sur un plan technique ?",
    options: ["En haut à gauche", "En bas à gauche", "En haut à droite", "En bas à droite"],
    correctAnswer: 3,
    explanation: "Selon ISO 5457, le cartouche doit obligatoirement se situer dans le coin inférieur droit du document, dans le sens de lecture."
  },
  {
    id: 3,
    question: "Quelle est la dimension maximale de la zone d'identification du cartouche selon ISO 7200 ?",
    options: ["100 mm", "120 mm", "170 mm", "210 mm"],
    correctAnswer: 2,
    explanation: "La zone d'identification du cartouche doit avoir une longueur maximale de 170 mm selon ISO 7200."
  }
];

type SectionType = 'champs' | 'cartouche' | 'quiz' | 'tableaux' | 'memo' | 'faq' | 'normes';

// Navigation Component
const Navigation = ({ currentSection, onSectionChange, darkMode }: any) => {
  const sections = [
    { id: 'champs', label: 'Liste des champs' },
    { id: 'cartouche', label: 'Schéma interactif' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'tableaux', label: 'Tableaux' },
    { id: 'memo', label: 'Mémo' },
    { id: 'faq', label: 'FAQ' },
    { id: 'normes', label: 'Normes' }
  ];

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                currentSection === section.id
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Interactive Cartouche Component
const InteractiveCartouche = ({ darkMode, selectedField, setSelectedField }: any) => {
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Descriptif': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Identification': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Technique': return 'bg-green-100 text-green-600 border-green-200';
      case 'Représentation': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Document': return 'bg-cyan-100 text-cyan-600 border-cyan-200';
      case 'Administratif': return 'bg-pink-100 text-pink-600 border-pink-200';
      case 'Gestion': return 'bg-amber-100 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getObligationColor = (obligation: string) => {
    return obligation === 'Obligatoire' ? 'text-red-600 font-bold' : 'text-blue-600';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Schéma Interactif du Cartouche
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cliquez sur un champ dans le schéma pour voir ses détails
          </p>
        </motion.div>

        {/* Modern Interactive Cartouche */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 mb-6 shadow-2xl">
          <div className="mb-6 text-center">
            <span className="text-sm font-medium text-slate-300 bg-slate-900/50 px-4 py-2 rounded-full">
              Position : Coin inférieur droit du plan (ISO 5457)
            </span>
          </div>
          
          <div className="bg-slate-700 rounded-xl p-6 border-2 border-slate-600">
            <div className="grid gap-3" style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(3, auto)'
            }}>
              {/* Nom entreprise */}
              <button
                onClick={() => setSelectedField('entreprise')}
                className={`p-4 rounded-lg transition-all text-left relative ${
                  selectedField === 'entreprise'
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-semibold ${selectedField === 'entreprise' ? 'text-white' : 'text-slate-200'}`}>
                    Nom de l'entr...
                  </span>
                  <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                </div>
                <div className={`text-xs mt-8 ${selectedField === 'entreprise' ? 'text-blue-100' : 'text-slate-400'}`}>
                  Dessinateur
                </div>
              </button>

              {/* Titre */}
              <button
                onClick={() => setSelectedField('titre')}
                className={`p-4 rounded-lg transition-all text-left ${
                  selectedField === 'titre' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '3 / 6', gridRow: '1' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-semibold ${selectedField === 'titre' ? 'text-white' : 'text-slate-200'}`}>Titre</span>
                  <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                </div>
              </button>

              {/* Numéro de pièce */}
              <button
                onClick={() => setSelectedField('numero-piece')}
                className={`p-4 rounded-lg transition-all text-left ${
                  selectedField === 'numero-piece' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '6', gridRow: '1' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'numero-piece' ? 'text-white' : 'text-slate-200'}`}>Numéro de pièce</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Matériau */}
              <button
                onClick={() => setSelectedField('materiau')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'materiau' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '3', gridRow: '2' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'materiau' ? 'text-white' : 'text-slate-200'}`}>Matériau</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Traitement */}
              <button
                onClick={() => setSelectedField('traitement')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'traitement' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '4', gridRow: '2' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'traitement' ? 'text-white' : 'text-slate-200'}`}>Traitement de...</span>
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span>
                </div>
              </button>

              {/* Masse */}
              <button
                onClick={() => setSelectedField('masse')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'masse' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '5', gridRow: '2' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'masse' ? 'text-white' : 'text-slate-200'}`}>Masse</span>
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span>
                </div>
              </button>

              {/* Échelle */}
              <button
                onClick={() => setSelectedField('echelle')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'echelle' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '6', gridRow: '2' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'echelle' ? 'text-white' : 'text-slate-200'}`}>Échell...</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Vérificateur */}
              <button
                onClick={() => setSelectedField('verificateur')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'verificateur' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '1', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'verificateur' ? 'text-white' : 'text-slate-200'}`}>Vérificateur</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Tolérance */}
              <button
                onClick={() => setSelectedField('tolerance-generale')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'tolerance-generale' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '2', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'tolerance-generale' ? 'text-white' : 'text-slate-200'}`}>Tolérance gén...</span>
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span>
                </div>
              </button>

              {/* Projection */}
              <button
                onClick={() => setSelectedField('projection')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'projection' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '3', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'projection' ? 'text-white' : 'text-slate-200'}`}>Méthode d'ap...</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Format */}
              <button
                onClick={() => setSelectedField('format')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'format' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '4', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'format' ? 'text-white' : 'text-slate-200'}`}>Forma...</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Indice */}
              <button
                onClick={() => setSelectedField('indice')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'indice' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '5', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'indice' ? 'text-white' : 'text-slate-200'}`}>Indice de...</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>

              {/* Date */}
              <button
                onClick={() => setSelectedField('date')}
                className={`p-3 rounded-lg transition-all text-left ${
                  selectedField === 'date' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                style={{ gridColumn: '6', gridRow: '3' }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${selectedField === 'date' ? 'text-white' : 'text-slate-200'}`}>Date</span>
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span>
                </div>
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                <span className="text-sm text-slate-300">Obligatoire (O)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">C</span>
                <span className="text-sm text-slate-300">Conditionnel (C)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation Panel */}
        {selectedFieldData && (
          <div className={`rounded-xl p-6 border-l-4 border-blue-600 ${darkMode ? 'bg-blue-950/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedFieldData.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFieldData.category)}`}>
                    {selectedFieldData.category}
                  </span>
                  <span className={`text-sm font-bold ${getObligationColor(selectedFieldData.obligation)}`}>
                    {selectedFieldData.obligation}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Description :</p>
                <p className={`mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{selectedFieldData.description}</p>
                <p className={`text-sm font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nombre de caractères :</p>
                <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{selectedFieldData.characters}</p>
              </div>
              <div>
                <p className={`text-sm font-bold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Exemple horlogerie :</p>
                <p className={`px-4 py-3 rounded-lg border font-mono text-sm ${
                  darkMode ? 'bg-slate-800 border-blue-700 text-slate-300' : 'bg-white border-blue-200 text-slate-700'
                }`}>
                  {selectedFieldData.example}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fields Explorer Component
const FieldsExplorer = ({ darkMode, setSelectedField }: any) => {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Descriptif': return darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Identification': return darkMode ? 'bg-purple-900/30 text-purple-400 border-purple-700' : 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Technique': return darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-100 text-green-600 border-green-200';
      case 'Représentation': return darkMode ? 'bg-orange-900/30 text-orange-400 border-orange-700' : 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Document': return darkMode ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' : 'bg-cyan-100 text-cyan-600 border-cyan-200';
      case 'Administratif': return darkMode ? 'bg-pink-900/30 text-pink-400 border-pink-700' : 'bg-pink-100 text-pink-600 border-pink-200';
      case 'Gestion': return darkMode ? 'bg-amber-900/30 text-amber-400 border-amber-700' : 'bg-amber-100 text-amber-600 border-amber-200';
      default: return darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Liste des Champs de Données</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartoucheFieldsData.map((field) => (
            <div
              key={field.id}
              onClick={() => setSelectedField(field.id)}
              className={`rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-lg ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(field.category)}`}>
                  {field.category}
                </span>
                <span className={`text-xs font-semibold ${field.obligation === 'Obligatoire' ? 'text-red-600' : 'text-blue-600'}`}>
                  {field.obligation === 'Obligatoire' ? 'O' : 'C'}
                </span>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{field.name}</h3>
              <p className={`text-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{field.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple placeholder components
const QuizSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Quiz : Teste tes connaissances</h2>
      <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
        <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>Section Quiz en cours de développement...</p>
      </div>
    </div>
  </div>
);

const TablesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Formats Normalisés ISO 5457</h2>
      <div className={`rounded-2xl shadow-lg overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-900' : 'bg-slate-100'}>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Format</th>
              <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Dimensions (mm)</th>
              <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Marge minimale</th>
              <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Usage horlogerie</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-slate-200'}`}>
            <tr className={`transition-colors ${darkMode ? 'hover:bg-blue-950/30' : 'hover:bg-blue-50'}`}>
              <td className={`px-6 py-4 font-bold text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>A4</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>210 × 297</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>10 mm</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Pièces de mouvement, composants unitaires</td>
            </tr>
            <tr className={`transition-colors ${darkMode ? 'hover:bg-blue-950/30' : 'hover:bg-blue-50'}`}>
              <td className={`px-6 py-4 font-bold text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>A3</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>297 × 420</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>10 mm</td>
              <td className={`px-6 py-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Ensembles de mouvement, platines complètes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MemoSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Mémo Technique</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 border ${darkMode ? 'bg-red-950/30 border-red-800' : 'bg-red-50 border-red-200'}`}>
          <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-red-300' : 'text-red-900'}`}>
            <XCircle className="w-6 h-6 mr-2" />
            Erreurs fréquentes
          </h3>
          <ul className={`space-y-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start">
              <span className={`mr-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>•</span>
              <span>Oublier de renseigner les champs obligatoires</span>
            </li>
            <li className="flex items-start">
              <span className={`mr-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>•</span>
              <span>Ne pas mettre à jour l'indice de révision</span>
            </li>
          </ul>
        </div>
        <div className={`rounded-xl p-6 border ${darkMode ? 'bg-green-950/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
          <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
            <CheckCircle className="w-6 h-6 mr-2" />
            Bonnes pratiques
          </h3>
          <ul className={`space-y-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start">
              <span className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
              <span>Remplir tous les champs obligatoires</span>
            </li>
            <li className="flex items-start">
              <span className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
              <span>Utiliser des désignations normalisées</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const FAQSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Questions fréquentes (FAQ)</h2>
      <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>Section FAQ en cours de développement...</p>
    </div>
  </div>
);

const NormesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Contexte & Origines des Normes</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <FileText className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>ISO 7200:2004</h3>
              <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Champs de données dans les cartouches</p>
            </div>
          </div>
          <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Cette norme spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques.
          </p>
        </div>
        <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <Book className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>ISO 5457:1999</h3>
              <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Formats et présentation des dessins</p>
            </div>
          </div>
          <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Cette norme définit les formats de papier, les marges, les zones d'inscription et les cadres utilisés pour les plans techniques.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
export default function Page() {
  const [currentSection, setCurrentSection] = useState<SectionType>('champs')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState({
    completedQuizzes: 0,
    totalScore: 0,
    achievements: [] as string[],
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('cartouche-theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('cartouche-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleQuizComplete = (score: number, completedQuestions: number) => {
    const newScore = Math.max(userProgress.totalScore, score)
    const newCompleted = Math.max(userProgress.completedQuizzes, completedQuestions)
    const achievements = [...userProgress.achievements]

    if (score >= 80 && !achievements.includes('expert')) achievements.push('expert')
    if (score === 100 && !achievements.includes('parfait')) achievements.push('parfait')
    if (completedQuestions >= 15 && !achievements.includes('complet')) achievements.push('complet')

    setUserProgress({ completedQuizzes: newCompleted, totalScore: newScore, achievements })
  }

  const renderSection = () => {
    const sections: Record<SectionType, JSX.Element> = {
      champs: <FieldsExplorer darkMode={darkMode} setSelectedField={setSelectedField} />,
      cartouche: <InteractiveCartouche darkMode={darkMode} selectedField={selectedField} setSelectedField={setSelectedField} />,
      quiz: <QuizSection darkMode={darkMode} onQuizComplete={handleQuizComplete} />,
      tableaux: <TablesSection darkMode={darkMode} />,
      memo: <MemoSection darkMode={darkMode} />,
      faq: <FAQSection darkMode={darkMode} />,
      normes: <NormesSection darkMode={darkMode} />,
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        userProgress={userProgress}
        darkMode={darkMode}
      />

      <main className="relative">{renderSection()}</main>

      {/* Bouton mode sombre */}
      <motion.button
        onClick={toggleDarkMode}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-50 ${
          darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-800 hover:bg-gray-900'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex items-center justify-center">
          {darkMode ? <span className="text-white text-xl">☀️</span> : <span className="text-white text-xl">🌙</span>}
        </div>
      </motion.button>

      {/* Badge progression */}
      {(currentSection === 'champs' || currentSection === 'cartouche') && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className={`fixed bottom-6 left-6 p-4 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <GraduationCap className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <div>
              <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Formation Cartouches Horlogers
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                7 sections • 15 questions • Normes ISO
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Succès */}
      <AnimatePresence>
        {userProgress.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed top-1/2 right-6 transform -translate-y-1/2 space-y-3"
          >
            {userProgress.achievements.map((ach, i) => (
              <motion.div
                key={ach}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  ach === 'parfait'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : ach === 'expert'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                    : 'bg-gradient-to-r from-green-400 to-green-600'
                } shadow-lg`}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
