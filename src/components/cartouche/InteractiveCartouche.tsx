import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';


interface InteractiveCartoucheProps {
  darkMode: boolean;
}

interface CartoucheFieldData {
  id: string;
  name: string;
  shortName: string;
  obligation: 'O' | 'C';
  category: string;
  position: {
    row: number;
    col: number;
    colSpan: number;
    rowSpan: number;
  };
  description: string;
  example: string;
}

const cartoucheFieldsData: CartoucheFieldData[] = [
  {
    id: 'nom_entreprise',
    name: 'Nom de l\'entreprise',
    shortName: 'Nom de l\'entr...',
    obligation: 'O',
    category: 'Identification',
    position: { row: 1, col: 1, colSpan: 2, rowSpan: 2 },
    description: 'Nom de la société ou de l\'organisme responsable du document technique',
    example: 'ROLEX S.A.'
  },
  {
    id: 'titre',
    name: 'Titre',
    shortName: 'Titre',
    obligation: 'O',
    category: 'Identification',
    position: { row: 1, col: 3, colSpan: 3, rowSpan: 1 },
    description: 'Titre ou désignation du document technique, cartouche, vue du produit',
    example: 'Caisse de montre'
  },
  {
    id: 'numero_piece',
    name: 'Numéro de pièce',
    shortName: 'Numéro de pièce',
    obligation: 'O',
    category: 'Identification',
    position: { row: 1, col: 6, colSpan: 1, rowSpan: 1 },
    description: 'Numéro unique de la pièce, du produit ou de l\'ensemble',
    example: 'W-1234'
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    shortName: 'Dessinateur',
    obligation: 'O',
    category: 'Responsabilité',
    position: { row: 2, col: 1, colSpan: 1, rowSpan: 1 },
    description: 'Nom de la personne qui a établie le document technique',
    example: 'J. MARTIN'
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    shortName: 'Vérificateur',
    obligation: 'O',
    category: 'Responsabilité',
    position: { row: 3, col: 1, colSpan: 1, rowSpan: 1 },
    description: 'Nom de la personne qui a vérifiée et approuvée le document technique',
    example: 'P. DUBOIS'
  },
  {
    id: 'materiau',
    name: 'Matériau',
    shortName: 'Matériau',
    obligation: 'O',
    category: 'Spécifications',
    position: { row: 2, col: 2, colSpan: 1, rowSpan: 1 },
    description: 'Désignation du ou des matériaux constitutifs de la pièce',
    example: 'Acier 316L'
  },
  {
    id: 'traitement_surface',
    name: 'Traitement de surface',
    shortName: 'Traitement de...',
    obligation: 'C',
    category: 'Spécifications',
    position: { row: 2, col: 3, colSpan: 1, rowSpan: 1 },
    description: 'Désignation du traitement superficiel appliquée à la pièce',
    example: 'Poli, satiné'
  },
  {
    id: 'masse',
    name: 'Masse',
    shortName: 'Masse',
    obligation: 'C',
    category: 'Spécifications',
    position: { row: 2, col: 4, colSpan: 1, rowSpan: 1 },
    description: 'Masse de la pièce en kilogrammes',
    example: '12.5 g'
  },
  {
    id: 'echelle',
    name: 'Échelle',
    shortName: 'Échell...',
    obligation: 'O',
    category: 'Spécifications',
    position: { row: 2, col: 5, colSpan: 1, rowSpan: 1 },
    description: 'Échelle de représentation du document technique',
    example: '2:1'
  },
  {
    id: 'tolerance_generale',
    name: 'Tolérance générale',
    shortName: 'Tolérance gén...',
    obligation: 'C',
    category: 'Spécifications',
    position: { row: 3, col: 2, colSpan: 1, rowSpan: 1 },
    description: 'Tolérance générale applicable aux cotes sans indications particulières',
    example: '±0.2'
  },
  {
    id: 'methode_projection',
    name: 'Méthode de projection',
    shortName: 'Méthode d\'ap...',
    obligation: 'O',
    category: 'Spécifications',
    position: { row: 3, col: 3, colSpan: 1, rowSpan: 1 },
    description: 'Méthode de représentation utilisée pour le document technique',
    example: 'Perspective'
  },
  {
    id: 'format',
    name: 'Format',
    shortName: 'Forma...',
    obligation: 'O',
    category: 'Identification',
    position: { row: 3, col: 4, colSpan: 1, rowSpan: 1 },
    description: 'Format du support utilisé pour le document technique',
    example: 'A4'
  },
  {
    id: 'indice_revision',
    name: 'Indice de révision',
    shortName: 'Indice de...',
    obligation: 'O',
    category: 'Identification',
    position: { row: 3, col: 5, colSpan: 1, rowSpan: 1 },
    description: 'Indice de révision et sa date qui identifie la version du document',
    example: 'B'
  },
  {
    id: 'date',
    name: 'Date',
    shortName: 'Date',
    obligation: 'O',
    category: 'Identification',
    position: { row: 3, col: 6, colSpan: 1, rowSpan: 1 },
    description: 'Date d\'établissement, de vérification ou d\'approbation du document',
    example: '05/11/2025'
  }
];

export const InteractiveCartouche: React.FC<InteractiveCartoucheProps> = ({ darkMode }) => {
  const [selectedField, setSelectedField] = useState<CartoucheFieldData | null>(null);

  const getObligationIndicator = (obligation: 'O' | 'C') => {
    if (obligation === 'O') {
      return (
        <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          O
        </div>
      );
    } else {
      return (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      );
    }
  };

  const getObligationIcon = (obligation: 'O' | 'C') => {
    if (obligation === 'O') {
      return <CheckCircle className="w-4 h-4 text-red-500" />;
    } else {
      return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Schéma Interactif du Cartouche
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Cliquez sur un champ dans le schéma ou dans la liste ci-dessous pour voir ses détails
          </p>
          <p className={`text-sm text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Position : Coin inférieur droit du plan (ISO 5457)
          </p>
        </motion.div>

        {/* Cartouche Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`mx-auto mb-8 p-8 rounded-2xl max-w-4xl ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #1a1d2e 0%, #2a2f42 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
          {/* Grille du cartouche */}
          <div className="relative bg-gray-700 rounded-xl p-6 min-h-[400px]">
            <div 
              className="grid gap-2 h-full"
              style={{
                gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.8fr 0.6fr',
                gridTemplateRows: 'auto auto auto auto',
              }}
            >
              {cartoucheFieldsData.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setSelectedField(field)}
                  className={`relative bg-white rounded-lg p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    darkMode ? 'hover:bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    gridColumn: `${field.position.col} / span ${field.position.colSpan}`,
                    gridRow: `${field.position.row} / span ${field.position.rowSpan}`,
                  }}
                >
                  <div className="flex items-center justify-between h-full">
                    <span className="text-gray-900 text-sm font-medium leading-tight">
                      {field.shortName}
                    </span>
                  </div>
                  {getObligationIndicator(field.obligation)}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Légende */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center space-x-8"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                O
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Obligatoire (O)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                C
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Conditionnel (C)
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Liste des champs avec détails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cartoucheFieldsData.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              onClick={() => setSelectedField(field)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {field.category}
                  </span>
                </div>
                {getObligationIcon(field.obligation)}
              </div>

              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {field.name}
              </h3>

              <p className={`text-sm mb-4 line-clamp-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {field.description}
              </p>

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

              <div className="flex items-center justify-between text-xs">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {field.obligation === 'O' ? 'Obligatoire' : 'Conditionnel'}
                </span>
                <Info className={`w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </motion.div>
          ))}
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
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
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

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    {getObligationIcon(selectedField.obligation)}
                    <span className={`font-medium ${
                      selectedField.obligation === 'O' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {selectedField.obligation === 'O' ? 'Champ obligatoire' : 'Champ conditionnel'}
                    </span>
                  </div>

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
                        Position dans le cartouche
                      </h3>
                      <p className={`${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Rangée {selectedField.position.row}, Colonne {selectedField.position.col}
                      </p>
                    </div>
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
