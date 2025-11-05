import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, X, Lightbulb, BookOpen, Eye } from 'lucide-react';
import { erreursFrequentes, bonnesPratiques } from './data';

interface MemoSectionProps {
  darkMode: boolean;
}

export const MemoSection: React.FC<MemoSectionProps> = ({ darkMode }) => {
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
export default MemoSection;
