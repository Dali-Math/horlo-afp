import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Layers, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { TableData } from '@/types';
import { formatsISOdata, materiauxData, traitementsData } from './data';

interface TablesSectionProps {
  darkMode: boolean;
}

export const TablesSection: React.FC<TablesSectionProps> = ({ darkMode }) => {
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

  const renderTableData = (data: TableData[], tabId: string) => {
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
export default TablesSection;
