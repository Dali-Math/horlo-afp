import React, { useState } from 'react';
import { Settings, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

interface CoupleData {
  component: string;
  torqueMin: number;
  torqueMax: number;
  unit: string;
  tool: string;
  notes: string;
  importance: 'critical' | 'important' | 'standard';
}

export default function TableauCouples() {
  const [selectedCategory, setSelectedCategory] = useState('movement');
  const [searchTerm, setSearchTerm] = useState('');

  const coupleData: CoupleData[] = [
    // Mouvement
    { component: 'Pont de balancier', torqueMin: 8, torqueMax: 12, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-15 N⋅cm', notes: 'Précision critique pour l\'isochronisme', importance: 'critical' },
    { component: 'Pont de mécanisme', torqueMin: 5, torqueMax: 8, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-15 N⋅cm', notes: 'Réglage fin du jeu des engrenages', importance: 'critical' },
    { component: 'Moteur (rotor)', torqueMin: 3, torqueMax: 5, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-10 N⋅cm', notes: 'Rotation libre du rotor', importance: 'important' },
    { component: 'Axes de pignons', torqueMin: 2, torqueMax: 4, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-10 N⋅cm', notes: 'Fourni avec vis communes', importance: 'standard' },

    // Boîtier
    { component: 'Couronne', torqueMin: 15, torqueMax: 25, unit: 'N⋅cm', tool: 'Clé dynamométrique 10-30 N⋅cm', notes: 'Étanchéité et manipulation', importance: 'critical' },
    { component: 'Remontée', torqueMin: 8, torqueMax: 15, unit: 'N⋅cm', tool: 'Clé dynamométrique 5-20 N⋅cm', notes: 'Système de remontée manuelle', importance: 'important' },
    { component: 'Fond de boîte', torqueMin: 25, torqueMax: 40, unit: 'N⋅cm', tool: 'Clé dynamométrique 20-50 N⋅cm', notes: 'Étanchéité de la boîte', importance: 'critical' },
    { component: 'Glace', torqueMin: 8, torqueMax: 12, unit: 'N⋅cm', tool: 'Clé dynamométrique 5-15 N⋅cm', notes: 'Fixation de la glace', importance: 'important' },

    // Complications
    { component: 'Complication chronographe', torqueMin: 6, torqueMax: 10, unit: 'N⋅cm', tool: 'Clé dynamométrique 5-15 N⋅cm', notes: 'Mécanisme de luxe', importance: 'critical' },
    { component: 'Répétition minute', torqueMin: 10, torqueMax: 15, unit: 'N⋅cm', tool: 'Clé dynamométrique 10-20 N⋅cm', notes: 'Complication excellente', importance: 'critical' },
    { component: 'Quantième perpétuel', torqueMin: 5, torqueMax: 8, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-15 N⋅cm', notes: 'Affichage de la date', importance: 'important' },

    // Microsystème
    { component: 'Lentille', torqueMin: 3, torqueMax: 6, unit: 'N⋅cm', tool: 'Clé dynamométrique 1-10 N⋅cm', notes: 'Réglage de la lentille', importance: 'important' },
    { component: 'Masse oscillante', torqueMin: 4, torqueMax: 8, unit: 'N⋅cm', tool: 'Clé dynamométrique 2-10 N⋅cm', notes: 'Réglage fin', importance: 'standard' },
    { component: 'Échappement', torqueMin: 10, torqueMax: 15, unit: 'N⋅cm', tool: 'Clé dynamométrique 10-20 N⋅cm', notes: 'Réseau principal', importance: 'critical' },
  ];

  const categories = [
    { id: 'movement', name: 'Mouvement', icon: Settings },
    { id: 'case', name: 'Boîtier', icon: Wrench },
    { id: 'complications', name: 'Complications', icon: AlertTriangle },
    { id: 'microsystem', name: 'Microsystème', icon: CheckCircle },
  ];

  const filteredData = coupleData.filter(item => 
    item.component.toLowerCase().includes(searchTerm.toLowerCase()) &&
    selectedCategory === 'movement' // Pour simplifier, on affiche tout
  );

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'important': return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'standard': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default: return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'important': return <Settings className="w-4 h-4 text-amber-500" />;
      case 'standard': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Wrench className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/20 p-3 rounded-lg">
          <Wrench className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Tableau des Couples</h2>
          <p className="text-slate-600 dark:text-light-400">Couples de serrage recommandés pour composants horlogers</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar de navigation */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-light-100">Catégories</h3>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300'
                      : 'text-slate-600 dark:text-light-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Recherche */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mt-4">
            <h3 className="font-semibold text-slate-900 dark:text-light-100 mb-2">Rechercher</h3>
            <input
              type="text"
              placeholder="Nom du composant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 text-sm focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Tableau principal */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100">
                Couples de Serrage - {categories.find(c => c.id === selectedCategory)?.name}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-light-300">Composant</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-light-300">Couple Min</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-light-300">Couple Max</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-light-300">Outil</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-light-300">Priorité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredData.map((item, index) => (
                    <tr key={index} className={`hover:bg-slate-50 dark:hover:bg-slate-700/30 ${getImportanceColor(item.importance)}`}>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900 dark:text-light-100">{item.component}</div>
                        <div className="text-sm text-slate-600 dark:text-light-400">{item.notes}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-light-300">
                          {item.torqueMin}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-light-300">
                          {item.torqueMax}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-600 dark:text-light-400">
                          {item.tool}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getImportanceIcon(item.importance)}
                          <span className="text-sm text-slate-600 dark:text-light-400 capitalize">
                            {item.importance === 'critical' ? 'Critique' : 
                             item.importance === 'important' ? 'Important' : 'Standard'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="font-medium text-red-800 dark:text-red-200">Critique</h4>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                Couples sensibles affectant la précision et le fonctionnement. Mesure obligatoire.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-amber-500" />
                <h4 className="font-medium text-amber-800 dark:text-amber-200">Important</h4>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Couples affectant la qualité et la durabilité. Mesure recommandée.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-green-800 dark:text-green-200">Standard</h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Couples standards fournis avec vis standard. Mesure optionnelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}