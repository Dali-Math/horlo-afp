'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText, 
  Brain, Clock, Trophy, RefreshCw, ArrowRight, ArrowLeft,
  Scale, BookOpen, ChevronDown, ChevronUp,
  AlertTriangle, Lightbulb, Eye, Info, Search, Filter, HelpCircle,
  Target, X
} from 'lucide-react'

// Types et Data (simplifié pour la taille)
type SectionType = 'champs' | 'cartouche' | 'quiz' | 'tableaux' | 'memo' | 'faq' | 'normes';

interface CartoucheField {
  id: string; name: string; category: string; obligation: string;
  description: string; example: string; characters: string;
}

const cartoucheFieldsData: CartoucheField[] = [
  { id: 'entreprise', name: 'Nom de l\'entreprise', category: 'Identification', obligation: 'Obligatoire', 
    description: 'Raison sociale de l\'entreprise ou logo.', example: 'Manufacture Horlogère SA', characters: '30 caractères' },
  { id: 'titre', name: 'Titre', category: 'Descriptif', obligation: 'Obligatoire',
    description: 'Désignation de la pièce.', example: 'Platine calibre 2824', characters: '25-30 caractères' },
  { id: 'numero-piece', name: 'Numéro de pièce', category: 'Identification', obligation: 'Obligatoire',
    description: 'Référence unique.', example: 'P-2824-001-A', characters: '15-20 caractères' },
  { id: 'materiau', name: 'Matériau', category: 'Technique', obligation: 'Obligatoire',
    description: 'Matière première.', example: 'Maillechort', characters: '20 caractères' },
  { id: 'traitement', name: 'Traitement de surface', category: 'Technique', obligation: 'Conditionnel',
    description: 'Traitements.', example: 'Rhodiage', characters: '30 caractères' },
  { id: 'masse', name: 'Masse', category: 'Technique', obligation: 'Conditionnel',
    description: 'Poids.', example: '0.45 g', characters: '10 caractères' },
  { id: 'echelle', name: 'Échelle', category: 'Représentation', obligation: 'Obligatoire',
    description: 'Rapport dimensions.', example: '2:1', characters: '10 caractères' },
  { id: 'tolerance-generale', name: 'Tolérance générale', category: 'Technique', obligation: 'Conditionnel',
    description: 'Tolérances.', example: 'ISO 2768-m', characters: '20 caractères' },
  { id: 'projection', name: 'Méthode de projection', category: 'Représentation', obligation: 'Obligatoire',
    description: 'Méthode E ou A.', example: 'Symbole E', characters: 'Symbole' },
  { id: 'format', name: 'Format', category: 'Document', obligation: 'Obligatoire',
    description: 'Format du plan.', example: 'A4', characters: '4 caractères' },
  { id: 'indice', name: 'Indice de révision', category: 'Gestion', obligation: 'Obligatoire',
    description: 'Version.', example: 'A / B', characters: '4 caractères' },
  { id: 'dessinateur', name: 'Dessinateur', category: 'Administratif', obligation: 'Obligatoire',
    description: 'Auteur.', example: 'J. Dupont', characters: '20 caractères' },
  { id: 'verificateur', name: 'Vérificateur', category: 'Administratif', obligation: 'Obligatoire',
    description: 'Vérificateur.', example: 'M. Martin', characters: '20 caractères' },
  { id: 'date', name: 'Date', category: 'Administratif', obligation: 'Obligatoire',
    description: 'Date.', example: '17.10.2025', characters: '10 caractères' }
];

const quizData = [
  { id: 1, question: "Quelle norme ISO régit les champs de données ?", 
    options: ["ISO 5457", "ISO 7200", "ISO 128-1", "ISO 1101"], correctAnswer: 1,
    explanation: "ISO 7200:2004 spécifie les champs de données." },
  { id: 2, question: "Où doit se situer le cartouche ?",
    options: ["En haut à gauche", "En bas à gauche", "En haut à droite", "En bas à droite"], correctAnswer: 3,
    explanation: "Le cartouche doit se situer en bas à droite." },
  { id: 3, question: "Dimension maximale de la zone d'identification ?",
    options: ["100 mm", "120 mm", "170 mm", "210 mm"], correctAnswer: 2,
    explanation: "170 mm selon ISO 7200." }
];

// Navigation Component
const Navigation = ({ currentSection, onSectionChange, darkMode, userProgress }: any) => {
  const sections = [
    { id: 'champs', label: 'Champs', icon: BookOpen },
    { id: 'cartouche', label: 'Cartouche', icon: Target },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'tableaux', label: 'Tableaux', icon: FileText },
    { id: 'memo', label: 'Memo', icon: Trophy },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'normes', label: 'Normes', icon: Scale }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cartouche ISO</h1>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {sections.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => onSectionChange(item.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    currentSection === item.id ? 'bg-blue-500 text-white' : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{userProgress.totalScore}%</span>
          </div>
        </div>

        <div className="lg:hidden mt-3 flex space-x-1 overflow-x-auto">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => onSectionChange(item.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm ${
                  currentSection === item.id ? 'bg-blue-500 text-white' : darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <div>{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// Cartouche Interactif
const InteractiveCartouche = ({ darkMode, selectedField, setSelectedField }: any) => {
  const selectedFieldData = cartoucheFieldsData.find(f => f.id === selectedField);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Schéma Interactif du Cartouche
        </h1>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 mb-6 shadow-2xl">
          <div className="mb-6 text-center">
            <span className="text-sm text-slate-300 bg-slate-900/50 px-4 py-2 rounded-full">
              Position : Coin inférieur droit (ISO 5457)
            </span>
          </div>
          
          <div className="bg-slate-700 rounded-xl p-6 border-2 border-slate-600">
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(3, auto)' }}>
              <button onClick={() => setSelectedField('entreprise')} className={`p-4 rounded-lg transition-all text-left ${selectedField === 'entreprise' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-semibold ${selectedField === 'entreprise' ? 'text-white' : 'text-slate-200'}`}>Nom de l'entr...</span>
                  <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                </div>
                <div className={`text-xs mt-8 ${selectedField === 'entreprise' ? 'text-blue-100' : 'text-slate-400'}`}>Dessinateur</div>
              </button>
              
              <button onClick={() => setSelectedField('titre')} className={`p-4 rounded-lg ${selectedField === 'titre' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '3 / 6' }}>
                <div className="flex justify-between"><span className={`text-sm font-semibold ${selectedField === 'titre' ? 'text-white' : 'text-slate-200'}`}>Titre</span><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span></div>
              </button>
              
              <button onClick={() => setSelectedField('numero-piece')} className={`p-4 rounded-lg ${selectedField === 'numero-piece' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '6' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'numero-piece' ? 'text-white' : 'text-slate-200'}`}>N° pièce</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>

              <button onClick={() => setSelectedField('materiau')} className={`p-3 rounded-lg ${selectedField === 'materiau' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '3', gridRow: '2' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'materiau' ? 'text-white' : 'text-slate-200'}`}>Matériau</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
              <button onClick={() => setSelectedField('traitement')} className={`p-3 rounded-lg ${selectedField === 'traitement' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '4', gridRow: '2' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'traitement' ? 'text-white' : 'text-slate-200'}`}>Traitement</span><span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span></div>
              </button>
              <button onClick={() => setSelectedField('masse')} className={`p-3 rounded-lg ${selectedField === 'masse' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '5', gridRow: '2' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'masse' ? 'text-white' : 'text-slate-200'}`}>Masse</span><span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span></div>
              </button>
              <button onClick={() => setSelectedField('echelle')} className={`p-3 rounded-lg ${selectedField === 'echelle' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '6', gridRow: '2' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'echelle' ? 'text-white' : 'text-slate-200'}`}>Échelle</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>

              <button onClick={() => setSelectedField('verificateur')} className={`p-3 rounded-lg ${selectedField === 'verificateur' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '1', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'verificateur' ? 'text-white' : 'text-slate-200'}`}>Vérif.</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
              <button onClick={() => setSelectedField('tolerance-generale')} className={`p-3 rounded-lg ${selectedField === 'tolerance-generale' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '2', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'tolerance-generale' ? 'text-white' : 'text-slate-200'}`}>Tolér.</span><span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">C</span></div>
              </button>
              <button onClick={() => setSelectedField('projection')} className={`p-3 rounded-lg ${selectedField === 'projection' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '3', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'projection' ? 'text-white' : 'text-slate-200'}`}>Méthode</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
              <button onClick={() => setSelectedField('format')} className={`p-3 rounded-lg ${selectedField === 'format' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '4', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'format' ? 'text-white' : 'text-slate-200'}`}>Format</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
              <button onClick={() => setSelectedField('indice')} className={`p-3 rounded-lg ${selectedField === 'indice' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '5', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'indice' ? 'text-white' : 'text-slate-200'}`}>Indice</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
              <button onClick={() => setSelectedField('date')} className={`p-3 rounded-lg ${selectedField === 'date' ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}`} style={{ gridColumn: '6', gridRow: '3' }}>
                <div className="flex justify-between"><span className={`text-xs font-semibold ${selectedField === 'date' ? 'text-white' : 'text-slate-200'}`}>Date</span><span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">O</span></div>
              </button>
            </div>

            <div className="flex items-center gap-6 mt-6 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">O</span>
                <span className="text-sm text-slate-300">Obligatoire</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">C</span>
                <span className="text-sm text-slate-300">Conditionnel</span>
              </div>
            </div>
          </div>
        </div>

        {selectedFieldData && (
          <div className={`rounded-xl p-6 border-l-4 border-blue-600 ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedFieldData.name}</h3>
            <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}><strong>Description:</strong> {selectedFieldData.description}</p>
            <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}><strong>Exemple:</strong> {selectedFieldData.example}</p>
            <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}><strong>Caractères:</strong> {selectedFieldData.characters}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Sections simplifiées
const FieldsExplorer = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
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
);

const QuizSection = ({ darkMode, onQuizComplete }: any) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const next = () => {
    if (selected === quizData[current].correctAnswer) setScore(score + 1);
    if (current < quizData.length - 1) { setCurrent(current + 1); setSelected(null); }
    else { setDone(true); onQuizComplete?.(Math.round((score / quizData.length) * 100), quizData.length); }
  };

  if (done) return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quiz Terminé!</h1>
        <p className="text-6xl font-bold text-blue-500 mb-4">{Math.round((score / quizData.length) * 100)}%</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{score}/{quizData.length} bonnes réponses</p>
        <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false); }}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl">Recommencer</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quiz</h1>
        <div className={`p-8 rounded-2xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{quizData[current].question}</h2>
          <div className="space-y-3">
            {quizData[current].options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`w-full p-4 text-left rounded-xl border-2 ${
                  selected === i ? 'border-blue-500 bg-blue-50' : darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
        <button onClick={next} disabled={selected === null}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50">
          {current < quizData.length - 1 ? 'Suivant' : 'Terminer'}
        </button>
      </div>
    </div>
  );
};

const TablesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Formats ISO 5457</h1>
      <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
            <tr>
              <th className="px-6 py-4 text-left">Format</th>
              <th className="px-6 py-4 text-left">Dimensions (mm)</th>
              <th className="px-6 py-4 text-left">Marge</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-6 py-4 font-bold text-blue-500">A4</td><td className="px-6 py-4">210 × 297</td><td className="px-6 py-4">10 mm</td></tr>
            <tr><td className="px-6 py-4 font-bold text-blue-500">A3</td><td className="px-6 py-4">297 × 420</td><td className="px-6 py-4">10 mm</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MemoSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mémo Technique</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-red-950/30' : 'bg-red-50'}`}>
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center"><XCircle className="w-6 h-6 mr-2" />Erreurs</h3>
          <ul className="space-y-2">
            {['Oublier champs obligatoires', 'Ne pas mettre à jour indice', 'Abréviations non normalisées'].map((e, i) => (
              <li key={i} className="flex items-start"><span className="text-red-600 mr-2">•</span><span>{e}</span></li>
            ))}
          </ul>
        </div>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-950/30' : 'bg-green-50'}`}>
          <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center"><CheckCircle className="w-6 h-6 mr-2" />Bonnes pratiques</h3>
          <ul className="space-y-2">
            {['Remplir champs obligatoires', 'Désignations normalisées', 'Tolérances claires'].map((b, i) => (
              <li key={i} className="flex items-start"><span className="text-green-600 mr-2">•</span><span>{b}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const FAQSection = ({ darkMode }: any) => {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const questions = [
    { q: "Différence entre O et C ?", a: "O = obligatoire, C = conditionnel" },
    { q: "Gérer les révisions ?", a: "Tableau de révision avec indice, date, etc." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          FAQ
        </h1>

        {questions.map((item, i) => (
          <div key={i} className="mb-4">
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {item.q}
            </p>
            <p className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;
