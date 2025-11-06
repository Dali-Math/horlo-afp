'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle, XCircle, Book, FileText, 
  Brain, Clock, Trophy, RefreshCw, ArrowRight, ArrowLeft,
  Scale, BookOpen, ChevronDown, ChevronUp, Download, ExternalLink,
  AlertTriangle, Lightbulb, Eye, Info, Search, Filter, HelpCircle,
  Target, X, Moon, Sun, Building, Tag, Settings, User, Calendar, 
  Percent, Cpu, Hash, Beaker, Weight, Layers, Printer, Sparkles
} from 'lucide-react'

// Données pour la section Memo intégrées directement
const erreursFrequentes = [
  "Oublier de remplir tous les champs obligatoires du cartouche",
  "Ne pas mettre à jour l'indice de révision lors des modifications",
  "Utiliser des abréviations non normalisées pour les matériaux",
  "Positionner le cartouche au mauvais endroit sur le plan",
  "Oublier d'indiquer la méthode de projection (E ou A)",
  "Ne pas spécifier les tolérances générales du dessin"
];

const bonnesPratiques = [
  "Remplir systématiquement tous les champs obligatoires",
  "Utiliser des désignations normalisées et des abréviations ISO",
  "Mettre à jour l'indice de révision à chaque modification",
  "Positionner le cartouche en bas à droite selon ISO 5457",
  "Indiquer clairement la méthode de projection (E pour l'Europe)",
  "Spécifier les tolérances générales appropriées (ISO 2768)"
];

const checklistComplete = [
  { id: 0, texte: "Entreprise ou logo présent", obligatoire: true },
  { id: 1, texte: "Titre de la pièce défini", obligatoire: true },
  { id: 2, texte: "Numéro de pièce unique", obligatoire: true },
  { id: 3, texte: "Matériau spécifié", obligatoire: true },
  { id: 4, texte: "Échelle de représentation", obligatoire: true },
  { id: 5, texte: "Méthode de projection (E/A)", obligatoire: true },
  { id: 6, texte: "Format du plan (A4, A3...)", obligatoire: true },
  { id: 7, texte: "Indice de révision à jour", obligatoire: true },
  { id: 8, texte: "Nom du dessinateur", obligatoire: true },
  { id: 9, texte: "Nom du vérificateur", obligatoire: true },
  { id: 10, texte: "Date de création/modification", obligatoire: true },
  { id: 11, texte: "Traitement de surface (si applicable)", obligatoire: false },
  { id: 12, texte: "Masse de la pièce (si critique)", obligatoire: false },
  { id: 13, texte: "Tolérances générales spécifiées", obligatoire: false }
];

// Données pour les tableaux
const formatsISOData = [
  { format: 'A4', dimensions: '210 × 297 mm', marge: '10 mm', usage: 'Pièces unitaires, composants simples' },
  { format: 'A3', dimensions: '297 × 420 mm', marge: '10 mm', usage: 'Platines complètes, ponts de mouvement' },
  { format: 'A2', dimensions: '420 × 594 mm', marge: '10 mm', usage: 'Mouvements complets, éclatés complexes' },
  { format: 'A1', dimensions: '594 × 841 mm', marge: '20 mm', usage: 'Plans d\'ensemble, documentation technique' },
  { format: 'A0', dimensions: '841 × 1189 mm', marge: '20 mm', usage: 'Documentation spécialisée, archives' }
];

const materiauxData = [
  { 
    nom: 'Maillechort', 
    designation: 'CuNi18Zn20', 
    composition: 'Cu-Ni-Zn',
    usage: 'Roues, pignons, ponts - Excellent pour l\'usinage de précision' 
  },
  { 
    nom: 'Laiton', 
    designation: 'CuZn40', 
    composition: 'Cu-Zn',
    usage: 'Composants secondaires, pièces décoratives' 
  },
  { 
    nom: 'Acier inoxydable', 
    designation: 'X5CrNi18-10', 
    composition: 'Fe-Cr-Ni',
    usage: 'Axes, pivots, vis - Haute résistance à la corrosion' 
  },
  { 
    nom: 'Glucydur', 
    designation: 'Be-Cu', 
    composition: 'Be-Cu',
    usage: 'Balanciers, pièces à ressort - Excellente stabilité' 
  },
  { 
    nom: 'Titane Grade 5', 
    designation: 'Ti-6Al-4V', 
    composition: 'Ti-Al-V',
    usage: 'Composants légers, montres de sport' 
  },
  { 
    nom: 'Or 18K', 
    designation: 'Au750', 
    composition: 'Au-Ag-Cu',
    usage: 'Complications horlogères haut de gamme' 
  }
];

const traitementsData = [
  {
    traitement: 'Rhodiage',
    description: 'Dépôt électrolytique d\'argent poli',
    objectif: 'Protection et esthétique',
    application: 'Toutes les pièces externes du mouvement'
  },
  {
    traitement: 'Anglage',
    description: 'Biseautage des arêtes de copie',
    objectif: 'Esthétique et fonctionnalité',
    application: 'Ponts et platines de mouvements'
  },
  {
    traitement: 'Côtes de Genève',
    description: 'Rayures décoratives parallelles',
    objectif: 'Esthétique premium',
    application: 'Mouvements de luxe uniquement'
  },
  {
    traitement: 'Trempe',
    description: 'Traitement thermique de durcissement',
    objectif: 'Résistance mécanique',
    application: 'Axes, pignons, pièces de transmission'
  },
  {
    traitement: 'Polissage miroir',
    description: 'Finition ultra-lisse et brillante',
    objectif: 'Réduction des frictions',
    application: 'Juwelieries, pièces décoratives'
  },
  {
    traitement: 'Passivation',
    description: 'Traitement anti-corrosion',
    objectif: 'Durabilité maximale',
    application: 'Pièces en acier exposées'
  }
];

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
const FieldsExplorer = ({ darkMode }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedField, setSelectedField] = useState<CartoucheField | null>(null);

  const categories = ['Tous', ...Array.from(new Set(cartoucheFieldsData.map(f => f.category)))];
  
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Identification': Building,
      'Descriptif': Tag,
      'Technique': Settings,
      'Représentation': Eye,
      'Document': FileText,
      'Gestion': Hash,
      'Administratif': User
    };
    return iconMap[category] || BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Identification': 'blue',
      'Descriptif': 'green',
      'Technique': 'purple',
      'Représentation': 'orange',
      'Document': 'indigo',
      'Gestion': 'red',
      'Administratif': 'teal'
    };
    return colorMap[category] || 'gray';
  };

  const getObligationColor = (obligation: string) => {
    return obligation === 'Obligatoire' ? 'red' : 'yellow';
  };

  const filteredFields = cartoucheFieldsData.filter(field => {
    const matchesCategory = selectedCategory === 'Tous' || field.category === selectedCategory;
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            14 Champs du Cartouche
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Découvrez tous les champs définis par la norme ISO 7200 pour vos documents horlogers
          </p>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Barre de recherche */}
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Rechercher un champ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const color = getCategoryColor(category);
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? `bg-${color}-500 text-white shadow-lg`
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grille des champs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredFields.map((field, index) => {
            const CategoryIcon = getCategoryIcon(field.category);
            const obligationColor = getObligationColor(field.obligation);
            
            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedField(field)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${getCategoryColor(field.category)}-500 rounded-xl flex items-center justify-center`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    obligationColor === 'red' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {field.obligation}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {field.name}
                </h3>
                
                <div className={`text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {field.category}
                </div>

                <p className={`text-sm leading-relaxed mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {field.description}
                </p>

                {/* Exemple */}
                <div className={`p-3 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`font-medium mb-1 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Exemple :
                  </div>
                  <div className={`font-mono ${
                    darkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    {field.example}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modal de détails */}
        <AnimatePresence>
          {selectedField && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedField(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-2xl w-full rounded-2xl p-8 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedField.name}
                  </h2>
                  <button
                    onClick={() => setSelectedField(null)}
                    className={`p-2 rounded-lg ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className={`font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        Catégorie
                      </h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {selectedField.category}
                      </p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        Obligation
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedField.obligation === 'Obligatoire'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedField.obligation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Description
                    </h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {selectedField.description}
                    </p>
                  </div>

                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Exemple
                    </h3>
                    <div className={`p-4 rounded-lg font-mono text-lg ${
                      darkMode ? 'bg-gray-700 text-blue-300' : 'bg-gray-50 text-blue-600'
                    }`}>
                      {selectedField.example}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Longueur recommandée
                    </h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {selectedField.characters}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {cartoucheFieldsData.length}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Champs total
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {cartoucheFieldsData.filter(f => f.obligation === 'Obligatoire').length}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Obligatoires
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {cartoucheFieldsData.filter(f => f.obligation === 'Conditionnel').length}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Conditionnels
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {categories.length - 1}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Catégories
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

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

const TablesSection = ({ darkMode }: any) => {
  const [activeTab, setActiveTab] = useState<'formats' | 'materiaux' | 'traitements'>('formats');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const tabs = [
    {
      id: 'formats' as const,
      label: 'Formats ISO',
      icon: FileText,
      description: 'Formats de plans selon ISO 5457',
      data: formatsISOData,
      color: 'blue'
    },
    {
      id: 'materiaux' as const,
      label: 'Matériaux',
      icon: Layers,
      description: 'Matériaux horlogers standards',
      data: materiauxData,
      color: 'green'
    },
    {
      id: 'traitements' as const,
      label: 'Traitements',
      icon: Sparkles,
      description: 'Finitions et traitements de surface',
      data: traitementsData,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        text: 'text-blue-600',
        light: 'bg-blue-50',
        dark: 'bg-blue-900/20'
      },
      green: {
        bg: 'bg-green-500',
        border: 'border-green-500',
        text: 'text-green-600',
        light: 'bg-green-50',
        dark: 'bg-green-900/20'
      },
      purple: {
        bg: 'bg-purple-500',
        border: 'border-purple-500',
        text: 'text-purple-600',
        light: 'bg-purple-50',
        dark: 'bg-purple-900/20'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const renderTableData = (data: any[], tabId: string) => {
    const colorClasses = getColorClasses(tabs.find(t => t.id === activeTab)?.color || 'blue');

    switch (tabId) {
      case 'formats':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${colorClasses.light} ${darkMode ? 'bg-gray-700' : ''}`}>
                  <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Format
                  </th>
                  <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Dimensions
                  </th>
                  <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Marge
                  </th>
                  <th className={`px-6 py-4 text-left font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Usage Horlogerie
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <motion.tr
                    key={item.format}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-t transition-colors hover:${
                      darkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 font-mono font-bold ${colorClasses.text}`}>
                      {item.format}
                    </td>
                    <td className={`px-6 py-4 font-mono ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.dimensions}
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.marge}
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.usage}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'materiaux':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={item.designation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
                }`}
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.nom}
                      </h3>
                      <p className={`font-mono text-sm ${colorClasses.text}`}>
                        {item.designation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.composition}
                    </span>
                    {expandedRow === index ? (
                      <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRow === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Usage principal :</strong> {item.usage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        );

      case 'traitements':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={item.traitement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
                }`}
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.traitement}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.objectif}
                    </span>
                    {expandedRow === index ? (
                      <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRow === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Application typique :</strong> {item.application}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

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
            Tableaux Techniques
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Références complètes des formats, matériaux et traitements utilisés en horlogerie
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const colorClasses = getColorClasses(tab.color);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? `${colorClasses.bg} text-white shadow-lg scale-105`
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'opacity-70'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Contenu des tableaux */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl border-2 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          {/* En-tête du tableau actif */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-4">
              {activeTabData && (
                <>
                  <div className={`w-12 h-12 ${getColorClasses(activeTabData.color).bg} rounded-xl flex items-center justify-center`}>
                    <activeTabData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activeTabData.label}
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {activeTabData.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tableau */}
          <div className="p-6">
            {activeTabData && renderTableData(activeTabData.data, activeTabData.id)}
          </div>
        </motion.div>

        {/* Notes informatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-8 p-6 rounded-xl ${
            darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            💡 Conseils pratiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Formats recommandés :
              </h4>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-blue-600'}`}>
                A3 pour les platines complètes, A4 pour les pièces unitaires
              </p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Matériaux standards :
              </h4>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-blue-600'}`}>
                Maillechort pour les composants mécaniques, Glucydur pour les balanciers
              </p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Finitions haut de gamme :
              </h4>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-blue-600'}`}>
                Rhodiage pour la protection, Côtes de Genève pour l'esthétique
              </p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Tolérances critiques :
              </h4>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-blue-600'}`}>
                Indiquer les tolérances spécifiques pour les pivots et paliers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};



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

const NormesSection = ({ darkMode }: any) => {
  const [activeStandard, setActiveStandard] = useState<'7200' | '5457'>('7200');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['presentation']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleAll = (expand: boolean) => {
    if (expand) {
      setExpandedSections(new Set(['presentation', 'champs', 'applications', 'bonnes-pratiques', 'exemples']));
    } else {
      setExpandedSections(new Set([]));
    }
  };

  const standards = {
    '7200': {
      title: 'ISO 7200:2004',
      subtitle: 'Cartouches d\'inscription',
      description: 'Spécification des champs de données pour les cartouches et têtes de documents techniques',
      icon: FileText,
      color: 'blue',
      sections: [
        {
          id: 'presentation',
          title: 'Présentation générale',
          content: `La norme ISO 7200:2004 définit les éléments d'information qui doivent figurer dans les cartouches d'inscription et les têtes de documents techniques. Elle s'applique à tous les types de documents techniques, y compris les plans horlogers.

Cette norme internationale garantit l'harmonisation et la standardisation des informations techniques, facilitant ainsi la compréhension et l'interprétation des documents quelle que soit leur provenance.

En horlogerie, ISO 7200 est particulièrement important car les pièces sont complexes et miniatures, nécessitant une documentation précise et normalisée pour la fabrication et la maintenance.`
        },
        {
          id: 'champs',
          title: 'Structure des champs',
          content: `Le cartouche selon ISO 7200 est organisé en zones fonctionnelles :

**Zone d'identification (obligatoire) :**
- Longueur maximale : 170 mm
- Position : coin inférieur droit
- Contient les informations d'identification du document

**Champ titre (obligatoire) :**
- Longueur recommandée : 25-30 caractères
- Doit être clair et descriptif
- Format normalisé pour assurer la lisibilité

**Zone d'administration :**
- Auteur, vérificateur, date
- Indice de révision
- Méthode de projection

**Champs techniques :**
- Matériau, traitement de surface, masse
- Tolérances générales, échelle
- Dimensions de référence selon l'application

**Zone libre :**
- Réservée aux informations spécifiques à l'entreprise
- Logo, références internes, numérotation propriétaire`
        },
        {
          id: 'applications',
          title: 'Applications en horlogerie',
          content: `En horlogerie, ISO 7200 s'adapte aux spécificités du secteur :

**Composants critiques :**
- Platines et ponts de mouvement
- Roues et pignons
- Axes et pivots (précision micrométrique)
- Rouages de complications

**Informations spécifiques :**
- Désignation normalisée des matériaux (CuNi18Zn20 pour maillechort)
- Tolérances ISO 2768-m ou f selon la précision
- Traitements de surface horlogers (rhodiage, anglage)
- Indices de révision pour les modifications

**Documentations techniques :**
- Plans de fabrication
- Fiches techniques de pièces
- Notices de montage
- Documents de contrôle qualité

**Gestion documentaire :**
- Archivage numérique et physique
- Traçabilité des modifications
- Conformité réglementaire`
        },
        {
          id: 'bonnes-pratiques',
          title: 'Bonnes pratiques',
          content: `Pour une application efficace d'ISO 7200 en horlogerie :

**Conception du cartouche :**
- Utiliser des champs de hauteur uniforme (8-10 mm)
- Respecter les espacements minimaux
- Maintenir une lisibilité optimale
- Prévoir l'évolution future du document

**Choix des informations :**
- Renseigner tous les champs obligatoires
- Évaluer la pertinence des champs conditionnels
- Éviter les redondances avec les annotations du dessin
- Harmoniser les désignations normalisées

**Maintenance documentaire :**
- Mettre à jour systématiquement l'indice de révision
- Documenter les modifications dans le tableau de révision
- Maintenir la cohérence entre versions
- Assurer la diffusion aux utilisateurs concernés

**Contrôle qualité :**
- Vérifier la conformité lors de la création
- Contrôler les mises à jour
- Valider les informations techniques`
        },
        {
          id: 'exemples',
          title: 'Exemples pratiques',
          content: `Exemples d'application d'ISO 7200 en horlogerie :

**Exemple 1 - Platine de mouvement :**
- Titre : "Platine calibre 2824-2"
- Matériau : "CuNi18Zn20"
- Échelle : "2:1" (agrandissement nécessaire)
- Tolérance : "ISO 2768-m"
- Méthode : "E" (projection européenne)

**Exemple 2 - Roue de complications :**
- Titre : "Roue calendrier АП2"
- Matériau : "CuZn40" (laiton)
- Masse : "0.15g" (précision critique)
- Traitement : "Rhodiage"
- Indice : "C" (troisième révision)

**Exemple 3 - Pivots de balancier :**
- Titre : "Pivots balancier 453"
- Matériau : "X5CrNi18-10"
- Tolérance : "ISO 2768-f" (fine)
- Échelle : "10:1" (agrandissement important)
- Format : "A4" (pièce unitaire)`
        }
      ]
    },
    '5457': {
      title: 'ISO 5457:1999',
      subtitle: 'Formats de dessin',
      description: 'Spécification des formats, marges et éléments d\'annotation des documents de dessin technique',
      icon: Scale,
      color: 'green',
      sections: [
        {
          id: 'presentation',
          title: 'Présentation générale',
          content: `La norme ISO 5457:1999 définit les formats standards pour les documents de dessin technique. Cette norme garantit l'interchangeabilité et l'archivage optimal des documents techniques.

En horlogerie, le choix du format est crucial car les pièces sont de taille réduite mais nécessitent une précision extrême. ISO 5457 définit non seulement les dimensions mais aussi les marges, zones de pliage et emplacements reserved pour les annotations.

La norme s'applique particulièrement bien à l'horlogerie en规定ant des formats adaptés aux pièces de précision tout en permettant une lecture confortable des cotes et annotations.`
        },
        {
          id: 'champs',
          title: 'Formats et caractéristiques',
          content: `Formats standardisés selon ISO 5457 :

**Série A (recommandée pour l'horlogerie) :**
- A0 : 841 × 1189 mm (rarement utilisé)
- A1 : 594 × 841 mm (plans complexes)
- A2 : 420 × 594 mm (ensembles cohérents)
- A3 : 297 × 420 mm (platines complètes)
- A4 : 210 × 297 mm (pièces unitaires)

**Marges obligatoires :**
- Formats A0, A1 : Marge 20 mm
- Formats A2, A3, A4 : Marge 10 mm
- Marge de pliage : 5 mm supplémentaire
- Zone de classement : 20 mm sur le côté

**Zone du cartouche :**
- Position : Coin inférieur droit
- Largeur : Maximum 170 mm
- Hauteur : Variable selon le contenu
- Alignement : Selon les dimensions normalisées

**Éléments supplémentaires :**
- Zone de pliage (facultative)
- Indication de modification
- Symboles de projection`
        },
        {
          id: 'applications',
          title: 'Choix du format en horlogerie',
          content: `Recommandations spécifiques au secteur horloger :

**Format A4 (210×297mm) :**
- Usage : Pièces unitaires, composants simples
- Avantages : Coût réduit, archivage facile
- Exemples : Pivots, axes, vis spécialisées
- Échelle recommandée : 2:1 à 10:1

**Format A3 (297×420mm) :**
- Usage : Platines, ponts, ensembles cohérents
- Avantages : Plus d'espace pour détails
- Exemples : Platine de mouvement, ponts de complications
- Échelle recommandée : 1:1 à 5:1

**Format A2 (420×594mm) :**
- Usage : Mouvements complets, éclatés complexes
- Avantages : Vue d'ensemble possible
- Exemples : Assemblages complets, plans d'ensemble
- Échelle recommandée : 1:2 à 1:1

**Facteurs de choix :**
- Complexité de la pièce
- Densité de cotation nécessaire
- Exigences de traçabilité
- Contraintes d'archivage`
        },
        {
          id: 'bonnes-pratiques',
          title: 'Optimisation et archivage',
          content: `Optimisation de l'utilisation d'ISO 5457 en horlogerie :

**Optimisation de l'espace :**
- Utiliser l'ensemble de la zone utile
- Éviter les zones vides importantes
- Équilibrer densité de'information et lisibilité
- Prévoir l'évolution future du document

**Contraintes d'impression :**
- Vérifier la qualité d'impression à l'échelle chosen
- Assurer la lisibilité des cotes critiques
- Tester la reproduction photomécanique
- Prévoir les variations d'échelle

**Archivage physique :**
- Respecter les pliages selon la norme
- Protéger les bords par marge de sécurité
- Utiliser des pochettes normalisées
- Maintenir l'identification claire

**Archivage numérique :**
- Conservation des formats vectoriels
- Métadonnées normalisées
- Liens vers versions successives
- Sauvegarde multi-sites`
        },
        {
          id: 'exemples',
          title: 'Applications spécifiques',
          content: `Cas d'application d'ISO 5457 dans différents contextes horlogers :

**Mouvements de montre :**
- Format : A3 pour platines complètes
- Échelle : 2:1 à 5:1 selon la complexité
- Cartouche : Position standard en bas à droite
- Zone libre : Pour références internes

**Composants de complications :**
- Format : A4 pour pièces unitaires
- Échelle : 5:1 à 10:1 pour détails critiques
- Tolérances : Indication dans cartouche
- Traitements : Spécifiés dans zone technique

**Plans d'ensemble :**
- Format : A2 pour vue complète
- Échelle : 1:1 ou 1:2 pour repérage
- Références : Liens vers plans de détail
- Documentation : Nomenclature complète

**Fiches techniques :**
- Format : A4 pour documentation
- Échelle : Variable selon le contenu
- Cartouche : Adapté à la fonction documentaire
- Sécurité : Classification si nécessaire

**Contrôle qualité :**
- Format : A4 pour fiches de contrôle
- Échelle : Agrandie pour zones critiques
- Tolérances : Spécification détaillée
- Traçabilité : Références complètes`
        }
      ]
    }
  };

  const activeNorm = standards[activeStandard];
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      light: 'bg-blue-50',
      dark: 'bg-blue-900/20'
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      light: 'bg-green-50',
      dark: 'bg-green-900/20'
    }
  };

  const currentColors = colorClasses[activeNorm.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Normes ISO
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprendre et appliquer les normes ISO 7200 et ISO 5457 dans vos documents horlogers
          </p>
        </motion.div>

        {/* Sélection des normes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          {Object.entries(standards).map(([key, norm]) => {
            const Icon = norm.icon;
            const isActive = activeStandard === key;
            
            return (
              <button
                key={key}
                onClick={() => setActiveStandard(key as '7200' | '5457')}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? `${colorClasses[norm.color as keyof typeof colorClasses].bg} text-white shadow-lg scale-105`
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold">{norm.title}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'opacity-70'}`}>
                    {norm.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Contenu de la norme active */}
        <motion.div
          key={activeStandard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl border-2 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          {/* En-tête de la norme */}
          <div className={`p-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${currentColors.bg} rounded-2xl flex items-center justify-center`}>
                <activeNorm.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activeNorm.title}
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activeNorm.subtitle}
                </p>
              </div>
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {activeNorm.description}
            </p>
          </div>

          {/* Contrôles */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sections détaillées
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAll(true)}
                  className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Tout déployer
                </button>
                <button
                  onClick={() => toggleAll(false)}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Tout replier
                </button>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="p-6 space-y-4">
            {activeNorm.sections.map((section, index) => (
              <div key={section.id} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-4 text-left flex items-center justify-between transition-colors hover:${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <h4 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h4>
                  {expandedSections.has(section.id) ? (
                    <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 ${
                        darkMode ? 'bg-gray-750' : 'bg-gray-50'
                      }`}>
                        <div className="prose prose-sm max-w-none">
                          {section.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className={`mb-3 leading-relaxed ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ressources et liens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-2xl ${
            darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${
              darkMode ? 'text-purple-300' : 'text-purple-800'
            }`}>
              Ressources Complémentaires
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                📚 Documentation officielle :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-purple-100' : 'text-purple-600'
              }`}>
                <li>• Texte officiel ISO 7200:2004 (boutique ISO)</li>
                <li>• Guide d'application ISO 5457:1999</li>
                <li>• Normes horlogères Swiss (FH)</li>
                <li>• Documentation technique horlogère</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                🔗 Liens utiles :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-purple-100' : 'text-purple-600'
              }`}>
                <li>• Site officiel ISO (www.iso.org)</li>
                <li>• Association Suisse des Horlogers</li>
                <li>• Cours spécialisés DAO horloger</li>
                <li>• Modèles de cartouches normalisés</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

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
