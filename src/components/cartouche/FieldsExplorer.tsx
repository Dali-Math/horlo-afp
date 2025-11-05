import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, Info, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { CartoucheField } from '../types';
import { cartoucheFieldsData, categoryColors } from './data';

interface FieldsExplorerProps {
  darkMode: boolean;
}

export const FieldsExplorer: React.FC<FieldsExplorerProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<CartoucheField | null>(null);
  
  const categories = useMemo(() => {
    const cats = [...new Set(cartoucheFieldsData.map(field => field.category))];
    return cats.sort();
  }, []);

  const filteredFields = useMemo(() => {
    return cartoucheFieldsData.filter(field => {
      const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           field.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           field.example.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || field.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getObligationIcon = (obligation: string) => {
    switch (obligation) {
      case 'Obligatoire':
        return <CheckCircle className="w-4 h-4 text-red-500" />;
      case 'Conditionnel':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'gray';
  };

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
            Les 14 Champs du Cartouche Horloger
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explorez chaque champ selon la norme ISO 7200:2004 avec exemples pratiques et détails techniques
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
                placeholder="Rechercher un champ, une description..."
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 transition-colors ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="all">Toutes catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Grille des champs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredFields.map((field, index) => (
              <motion.div
                key={field.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedField(field)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-500'
                }`}
              >
                {/* En-tête du champ */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-${getCategoryColor(field.category)}-500`} />
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {field.category}
                    </span>
                  </div>
                  {getObligationIcon(field.obligation)}
                </div>

                {/* Nom du champ */}
                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {field.name}
                </h3>

                {/* Description courte */}
                <p className={`text-sm mb-4 line-clamp-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {field.description}
                </p>

                {/* Exemple */}
                <div className={`p-3 rounded-lg mb-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs font-medium mb-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Exemple :
                  </p>
                  <p className={`text-sm font-mono ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {field.example}
                  </p>
                </div>

                {/* Caractères */}
                <div className="flex items-center justify-between text-xs">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {field.characters}
                  </span>
                  <Eye className={`w-4 h-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal de détail */}
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
                className={`max-w-2xl w-full rounded-2xl p-8 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* En-tête du modal */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-${getCategoryColor(selectedField.category)}-500`} />
                    <h2 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedField.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedField(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    ✕
                  </button>
                </div>

                {/* Détails du champ */}
                <div className="space-y-6">
                  {/* Statut d'obligation */}
                  <div className="flex items-center space-x-3">
                    {getObligationIcon(selectedField.obligation)}
                    <span className={`font-medium ${
                      selectedField.obligation === 'Obligatoire' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {selectedField.obligation}
                    </span>
                  </div>

                  {/* Description complète */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Description
                    </h3>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {selectedField.description}
                    </p>
                  </div>

                  {/* Exemple détaillé */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Exemple d'utilisation
                    </h3>
                    <div className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <p className={`font-mono text-lg ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {selectedField.example}
                      </p>
                    </div>
                  </div>

                  {/* Informations techniques */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className={`text-sm font-semibold mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Catégorie
                      </h3>
                      <p className={`${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedField.category}
                      </p>
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Longueur recommandée
                      </h3>
                      <p className={`${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedField.characters}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Légende */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-6 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Légende
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-red-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <strong>Champ obligatoire (O)</strong> - Doit toujours être renseigné
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <strong>Champ conditionnel (C)</strong> - Obligatoire si pertinent
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default FieldsExplorer;
