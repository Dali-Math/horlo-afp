'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText, 
  Brain, Clock, Trophy, RefreshCw, ArrowRight, ArrowLeft,
  Scale, BookOpen, ChevronDown, ChevronUp,
  AlertTriangle, Lightbulb, Eye, Info, Search, Filter, HelpCircle,
  Target, X, Moon, Sun
} from 'lucide-react'
import { erreursFrequentes, bonnesPratiques } from './data'

// Types et Data (simplifié pour la taille)
type SectionType = 'champs' | 'cartouche' | 'quiz' | 'tableaux' | 'memo' | 'faq' | 'normes';

interface CartoucheField {
  id: string; name: string; category: string; obligation: string;
  description: string; example: string; characters: string;
}

// Composant MemoSection avancé
const MemoSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
    if (!showChecklist) {
      setCheckedItems(new Set());
    }
  };

  const toggleCheckItem = (index: number) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(index)) {
      newCheckedItems.delete(index);
    } else {
      newCheckedItems.add(index);
    }
    setCheckedItems(newCheckedItems);
  };

  const getProgress = () => {
    return (checkedItems.size / bonnesPratiques.length) * 100;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Mémo Technique
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Les erreurs à éviter et les bonnes pratiques essentielles pour vos cartouches horlogers
          </p>
          
          {/* Bouton de checklist interactive */}
          <motion.button
            onClick={toggleChecklist}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              showChecklist
                ? 'bg-green-500 text-white'
                : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5" />
            <span>{showChecklist ? 'Masquer la checklist' : 'Mode checklist interactif'}</span>
          </motion.button>

          {/* Barre de progression */}
          {showChecklist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 max-w-md mx-auto"
            >
              <div className={`flex items-center justify-between text-sm mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span>Progression</span>
                <span>{checkedItems.size}/{bonnesPratiques.length}</span>
              </div>
              <div className={`w-full h-3 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className={`text-center mt-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {Math.round(getProgress())}% complété
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Section des erreurs */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6 Erreurs Fréquentes
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Évitez ces pièges courants qui peuvent compromettre vos plans
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erreursFrequentes.map((erreur, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedCard === index
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-red-400'
                    : 'bg-white border-gray-200 hover:border-red-400'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {erreur}
                    </p>
                  </div>
                  <AlertTriangle className={`w-5 h-5 ${
                    darkMode ? 'text-red-400' : 'text-red-500'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section des bonnes pratiques */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6 Bonnes Pratiques
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Adoptez ces habitudes pour des cartouches professionnels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonnesPratiques.map((pratique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  showChecklist
                    ? checkedItems.has(index)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-400'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-green-400'
                    : 'bg-white border-gray-200 hover:border-green-400'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* Checkbox pour le mode checklist */}
                {showChecklist && (
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheckItem(index);
                      }}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        checkedItems.has(index)
                          ? 'bg-green-500 border-green-500'
                          : darkMode
                          ? 'border-gray-600 hover:border-green-400'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {checkedItems.has(index) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    showChecklist && checkedItems.has(index)
                      ? 'bg-green-500'
                      : 'bg-green-500'
                  }`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${
                      showChecklist && checkedItems.has(index)
                        ? 'text-green-700 dark:text-green-300 line-through'
                        : darkMode
                        ? 'text-gray-300'
                        : 'text-gray-700'
                    }`}>
                      {pratique}
                    </p>
                  </div>
                  {checkedItems.has(index) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Eye className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conseils pratiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-8 rounded-2xl ${
            darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${
              darkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Conseils d'Expert
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                🎯 Avant de dessiner :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-blue-100' : 'text-blue-600'
              }`}>
                <li>• Préparez tous les champs du cartouche</li>
                <li>• Vérifiez les normes ISO applicables</li>
                <li>• Choisissez le bon format (A4 ou A3)</li>
                <li>• Définissez l'échelle appropriée</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                ✅ Avant de finaliser :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-blue-100' : 'text-blue-600'
              }`}>
                <li>• Contrôlez tous les champs obligatoires</li>
                <li>• Mettez à jour l'indice de révision</li>
                <li>• Vérifiez la position du cartouche</li>
                <li>• Contrôlez les tolérances et matériaux</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Modal d'explication (pour les erreurs) */}
        <AnimatePresence>
          {selectedCard !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-lg w-full rounded-2xl p-8 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Erreur #{selectedCard + 1}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <p className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {erreursFrequentes[selectedCard]}
                  </p>
                  
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${
                      darkMode ? 'text-red-300' : 'text-red-700'
                    }`}>
                      💡 Comment l'éviter :
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-red-100' : 'text-red-600'
                    }`}>
                      {selectedCard === 0 && "Utilisez une checklist ISO 7200 et vérifiez chaque champ obligatoire avant la finalisation."}
                      {selectedCard === 1 && "Mettre en place un système de versionning et ne jamais modifier un plan sans mettre à jour l'indice."}
                      {selectedCard === 2 && "Toujours utiliser les désignations normalisées selon les normes horlogères (ex: CuNi18Zn20 pour le maillechort)."}
                      {selectedCard === 3 && "Respecter rigoureusement la position en bas à droite selon ISO 5457."}
                      {selectedCard === 4 && "Indiquer systématiquement la méthode de projection (E pour l'Europe) en Suisse."}
                      {selectedCard === 5 && "Toujours spécifier les tolérances générales (ISO 2768-m ou f) même si les cotes critiques ont des tolérances individuelles."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

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
            <tr><td className="px-6 py-4 font-bold text-blue-500">A2</td><td className="px-6 py-4">420 × 594</td><td className="px-6 py-4">10 mm</td></tr>
            <tr><td className="px-6 py-4 font-bold text-blue-500">A1</td><td className="px-6 py-4">594 × 841</td><td className="px-6 py-4">10 mm</td></tr>
            <tr><td className="px-6 py-4 font-bold text-blue-500">A0</td><td className="px-6 py-4">841 × 1189</td><td className="px-6 py-4">10 mm</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);



const FAQSection = ({ darkMode }: any) => {
  const [open, setOpen] = useState<Set<string>>(new Set());
  
  const faqs = [
    { q: "Différence entre O et C ?", a: "O = obligatoire, C = conditionnel" },
    { q: "Gérer les révisions ?", a: "Tableau de révision avec indice, date, description des modifications" },
    { q: "Formats autorisés ?", a: "A4 à A0 selon ISO 5457" },
    { q: "Position du cartouche ?", a: "Coin inférieur droit, aligné sur les marges" },
    { q: "Taille maximale ?", a: "170 mm de largeur selon ISO 7200" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>FAQ</h1>
        {faqs.map((faq, index) => (
          <div key={index} className={`mb-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <button
              onClick={() => {
                const newOpen = new Set(open);
                if (open.has(faq.q)) newOpen.delete(faq.q);
                else newOpen.add(faq.q);
                setOpen(newOpen);
              }}
              className={`w-full p-6 text-left flex items-center justify-between ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
            >
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{faq.q}</span>
              {open.has(faq.q) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <AnimatePresence>
              {open.has(faq.q) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 pb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const NormesSection = ({ darkMode }: any) => (
  <div className="min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Normes ISO</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
          <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center"><Scale className="w-6 h-6 mr-2" />ISO 7200:2004</h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
           spécifie les champs de données pour les documents techniques et commerciaux.
          </p>
        </div>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-950/30' : 'bg-purple-50'}`}>
          <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center"><Scale className="w-6 h-6 mr-2" />ISO 5457:2019</h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            Spécifie les formats de feuille de dessin technique.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Composant principal App
function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>('champs');
  const [selectedField, setSelectedField] = useState<string>('entreprise');
  const [darkMode, setDarkMode] = useState(false);
  const [userProgress, setUserProgress] = useState({
    totalScore: 0,
    quizCompleted: false
  });

  useEffect(() => {
    // Charger les préférences depuis localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedProgress = localStorage.getItem('userProgress');
    
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
  }, []);

  useEffect(() => {
    // Sauvegarder les préférences
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [darkMode, userProgress]);

  const handleQuizComplete = (score: number, total: number) => {
    setUserProgress(prev => ({
      ...prev,
      totalScore: score,
      quizCompleted: true
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'champs':
        return <FieldsExplorer darkMode={darkMode} />;
      case 'cartouche':
        return (
          <InteractiveCartouche 
            darkMode={darkMode} 
            selectedField={selectedField} 
            setSelectedField={setSelectedField}
          />
        );
      case 'quiz':
        return <QuizSection darkMode={darkMode} onQuizComplete={handleQuizComplete} />;
      case 'tableaux':
        return <TablesSection darkMode={darkMode} />;
      case 'memo':
        return <MemoSection darkMode={darkMode} />;
      case 'faq':
        return <FAQSection darkMode={darkMode} />;
      case 'normes':
        return <NormesSection darkMode={darkMode} />;
      default:
        return <FieldsExplorer darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <Navigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        darkMode={darkMode}
        userProgress={userProgress}
      />

      {/* Toggle Mode */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-all ${
          darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'
        } shadow-lg hover:shadow-xl`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Contenu principal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
