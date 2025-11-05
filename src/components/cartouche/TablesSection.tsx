'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Layers, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { TableData } from '@/types';
import { formatsISOData, materiauxData, traitementsData } from './data/index';

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
      color: 'amber'
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

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Références Techniques
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {activeTabData.description}
          </p>
        </motion.div>

        {/* Tabs Navigation - Style Cartouche */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedRow(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-6 py-4 rounded-xl font-semibold
                  transition-all duration-300 flex items-center gap-3
                  ${isActive
                    ? darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                    : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Table Content - Style Cartouche */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl overflow-hidden shadow-2xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}
          >
            {/* Table Header */}
            <div className={`px-6 py-4 ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-700 to-gray-800' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}>
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {activeTabData.label}
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}>
                    {activeTab === 'formats' && (
                      <>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Format</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Dimensions</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Marge</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Usage Horlogerie</th>
                        <th className={`px-6 py-4 text-center text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Détails</th>
                      </>
                    )}
                    {activeTab === 'materiaux' && (
                      <>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Désignation</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Norme</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Propriétés</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Usage</th>
                        <th className={`px-6 py-4 text-center text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Détails</th>
                      </>
                    )}
                    {activeTab === 'traitements' && (
                      <>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Traitement</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Type</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Objectif</th>
                        <th className={`px-6 py-4 text-left text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Application</th>
                        <th className={`px-6 py-4 text-center text-sm font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Détails</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {activeTabData.data.map((item, index) => (
                    <React.Fragment key={index}>
                      {/* Main Row */}
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          border-t transition-colors cursor-pointer
                          ${darkMode 
                            ? 'border-gray-700 hover:bg-gray-700/50' 
                            : 'border-gray-200 hover:bg-blue-50/50'
                          }
                          ${expandedRow === index ? (darkMode ? 'bg-gray-700/30' : 'bg-blue-50/30') : ''}
                        `}
                        onClick={() => toggleRow(index)}
                      >
                        {activeTab === 'formats' && (
                          <>
                            <td className={`px-6 py-4 font-semibold ${
                              darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {item.format}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.dimensions}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.marge}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.usage}
                            </td>
                          </>
                        )}
                        {activeTab === 'materiaux' && (
                          <>
                            <td className={`px-6 py-4 font-semibold ${
                              darkMode ? 'text-amber-400' : 'text-amber-700'
                            }`}>
                              {item.designation}
                            </td>
                            <td className={`px-6 py-4 text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {item.norme}
                            </td>
                            <td className={`px-6 py-4 text-sm ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.proprietes}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.usage}
                            </td>
                          </>
                        )}
                        {activeTab === 'traitements' && (
                          <>
                            <td className={`px-6 py-4 font-semibold ${
                              darkMode ? 'text-purple-400' : 'text-purple-600'
                            }`}>
                              {item.designation}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.type}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.objectif}
                            </td>
                            <td className={`px-6 py-4 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {item.application}
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 text-center">
                          <motion.div
                            animate={{ rotate: expandedRow === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="inline-block"
                          >
                            <ChevronDown className={`w-5 h-5 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                          </motion.div>
                        </td>
                      </motion.tr>

                      {/* Expanded Details Row */}
                      <AnimatePresence>
                        {expandedRow === index && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td 
                              colSpan={5} 
                              className={`px-6 py-6 ${
                                darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'
                              }`}
                            >
                              <div className="space-y-4">
                                {/* Usage Principal */}
                                {item.usage && (
                                  <div>
                                    <h4 className={`font-bold text-sm mb-2 ${
                                      darkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>
                                      Usage principal :
                                    </h4>
                                    <p className={`text-sm ${
                                      darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      {item.usage}
                                    </p>
                                  </div>
                                )}

                                {/* Description */}
                                {item.description && (
                                  <div>
                                    <p className={`text-sm leading-relaxed ${
                                      darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      {item.description}
                                    </p>
                                  </div>
                                )}

                                {/* Application Typique */}
                                {item.application && (
                                  <div className={`pt-3 border-t ${
                                    darkMode ? 'border-gray-700' : 'border-blue-200'
                                  }`}>
                                    <h4 className={`font-bold text-sm mb-2 ${
                                      darkMode ? 'text-purple-400' : 'text-purple-600'
                                    }`}>
                                      Application typique :
                                    </h4>
                                    <p className={`text-sm ${
                                      darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      {item.application}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Note */}
            <div className={`px-6 py-4 text-sm italic text-center ${
              darkMode 
                ? 'bg-gray-900/50 text-gray-400 border-t border-gray-700' 
                : 'bg-gray-50 text-gray-600 border-t border-gray-200'
            }`}>
              Références complètes des formats, matériaux et traitements utilisés en horlogerie
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Reference Tips - Style Cartouche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 grid md:grid-cols-3 gap-4`}
        >
          {[
            {
              title: 'Formats',
              text: 'A3 pour les platines complètes, A4 pour les pièces unitaires',
              icon: FileText,
              color: 'blue'
            },
            {
              title: 'Matériaux',
              text: 'Maillechort pour les composants mécaniques, Glucydur pour les balanciers',
              icon: Layers,
              color: 'amber'
            },
            {
              title: 'Traitements',
              text: 'Rhodiage pour la protection, Côtes de Genève pour l\'esthétique',
              icon: Sparkles,
              color: 'purple'
            }
          ].map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  darkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200 shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${
                    tip.color === 'blue' ? 'text-blue-500' :
                    tip.color === 'amber' ? 'text-amber-500' :
                    'text-purple-500'
                  }`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tip.title}
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {tip.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Best Practices Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 p-4 rounded-xl border-l-4 ${
            darkMode 
              ? 'bg-blue-900/20 border-blue-500 text-gray-300' 
              : 'bg-blue-50 border-blue-500 text-gray-700'
          }`}
        >
          <p className="text-sm">
            <strong className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
              💡 Conseil :
            </strong>
            {' '}Indiquer les tolérances spécifiques pour les pivots et paliers
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default TablesSection;
