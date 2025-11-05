import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { faqData } from './data';

interface FAQSectionProps {
  darkMode: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ darkMode }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(faqData.map(item => item.id)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Classification simple basée sur les mots-clés
    let matchesFilter = true;
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'obligatoire':
          matchesFilter = item.question.toLowerCase().includes('obligato') || 
                         item.question.toLowerCase().includes('champ') ||
                         item.answer.toLowerCase().includes('obligato');
          break;
        case 'revision':
          matchesFilter = item.question.toLowerCase().includes('révision') || 
                         item.question.toLowerCase().includes('modification') ||
                         item.answer.toLowerCase().includes('révision');
          break;
        case 'echelle':
          matchesFilter = item.question.toLowerCase().includes('échelle') || 
                         item.question.toLowerCase().includes('miniatur') ||
                         item.answer.toLowerCase().includes('échelle');
          break;
        case 'tolerance':
          matchesFilter = item.question.toLowerCase().includes('toleranc') || 
                         item.question.toLowerCase().includes('iso 2768') ||
                         item.answer.toLowerCase().includes('toleranc');
          break;
        case 'personnalisation':
          matchesFilter = item.question.toLowerCase().includes('personnal') || 
                         item.question.toLowerCase().includes('entreprise') ||
                         item.answer.toLowerCase().includes('entreprise');
          break;
      }
    }
    
    return matchesSearch && matchesFilter;
  });

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'obligatoire':
        return '⚠️';
      case 'revision':
        return '📋';
      case 'echelle':
        return '🔍';
      case 'tolerance':
        return '⚡';
      case 'personnalisation':
        return '🏭';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Questions Fréquentes
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Tout ce que vous devez savoir sur les cartouches horlogers et les normes ISO
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Rechercher dans les questions et réponses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-colors ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none`}
              />
            </div>

            {/* Filtre par catégorie */}
            <div className="flex items-center space-x-2">
              <Filter className={`w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 transition-colors ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="all">Toutes catégories</option>
                <option value="obligatoire">Champs obligatoires</option>
                <option value="revision">Révisions</option>
                <option value="echelle">Échelles</option>
                <option value="tolerance">Tolérances</option>
                <option value="personnalisation">Personnalisation</option>
              </select>
            </div>
          </div>

          {/* Boutons d'actions */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={openAll}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Tout ouvrir
            </button>
            <button
              onClick={closeAll}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              Tout fermer
            </button>
          </div>
        </motion.div>

        {/* Liste des FAQ */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQ.map((item, index) => {
              const isOpen = openItems.has(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border-2 transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-full p-6 text-left flex items-center justify-between transition-colors hover:${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {getFilterIcon(selectedFilter)} Réponse détaillée
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp className={`w-6 h-6 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      ) : (
                        <ChevronDown className={`w-6 h-6 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      )}
                    </div>
                  </button>

                  {/* Réponse */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-6 pt-0 ${
                          darkMode ? 'bg-gray-750' : 'bg-gray-50'
                        }`}>
                          <div className="pl-12">
                            <div className={`prose prose-sm max-w-none ${
                              darkMode ? 'prose-invert' : ''
                            }`}>
                              <p className={`leading-relaxed ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Message si aucun résultat */}
        {filteredFAQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Aucune question trouvée pour ces critères</p>
            <p className="text-sm mt-2">Essayez de modifier votre recherche ou vos filtres</p>
          </motion.div>
        )}

        {/* Ressources complémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-2xl ${
            darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${
              darkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Ressources Complémentaires
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                📖 Documentation officielle :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-blue-100' : 'text-blue-600'
              }`}>
                <li>• ISO 7200:2004 - Cartouches d'inscription</li>
                <li>• ISO 5457:1999 - Formats de dessin</li>
                <li>• ISO 2768-1 - Tolérances générales</li>
                <li>• ISO 1101:2017 - Spécification géométrique</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                🔗 Liens utiles :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-blue-100' : 'text-blue-600'
              }`}>
                <li>• Association Suisse des Horlogers (FH)</li>
                <li>• Bureau de Normalisation Horlogère</li>
                <li>• Formations spécialisées en DAO</li>
                <li>• Modèles de cartouches standardisés</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Feedback utilisateur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-8 p-6 rounded-xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            💡 Cette FAQ est régulièrement mise à jour. Vous ne trouvez pas la réponse à votre question ?
            <br />
            Consultez la documentation officielle ou contactez un expert en normalisation horlogère.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default FAQSection;
