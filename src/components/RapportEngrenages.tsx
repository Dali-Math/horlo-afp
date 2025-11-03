import React, { useState, useMemo } from 'react';
import { Settings, Calculator, Zap } from 'lucide-react';

export default function RapportEngrenages() {
  const [moduleSize, setModuleSize] = useState(1);
  const [pinionTeeth, setPinionTeeth] = useState(10);
  const [wheelTeeth, setWheelTeeth] = useState(40);

  // Calcul du rapport d'engrenage avec useMemo pour éviter les re-renders
  const gearCalculation = useMemo(() => {
    if (pinionTeeth > 0 && wheelTeeth > 0) {
      const ratio = pinionTeeth / wheelTeeth;
      const reduction = wheelTeeth / pinionTeeth;
      
      return {
        ratio,
        reduction,
        pitch: moduleSize * Math.PI
      };
    }
    return { ratio: 0, reduction: 0, pitch: moduleSize * Math.PI };
  }, [pinionTeeth, wheelTeeth, moduleSize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/20 p-3 rounded-lg">
          <Settings className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Rapport d'Engrenages</h2>
          <p className="text-slate-600 dark:text-light-400">Calculateur de rapports de transmission</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de calcul */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Paramètres d'Engrenage
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Module de Denture (mm)
              </label>
              <input
                type="number"
                value={moduleSize}
                onChange={(e) => setModuleSize(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-blue-500"
                step="0.1"
                min="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Nombre de Dents - Pignon
              </label>
              <input
                type="number"
                value={pinionTeeth}
                onChange={(e) => setPinionTeeth(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-blue-500"
                min="6"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Nombre de Dents - Roue
              </label>
              <input
                type="number"
                value={wheelTeeth}
                onChange={(e) => setWheelTeeth(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-blue-500"
                min="6"
                max="200"
              />
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Résultats du Calcul
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Rapport de Vitesse</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {gearCalculation.ratio.toFixed(3)}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Vpignon / Vroue
                </div>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Réduction</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {gearCalculation.reduction.toFixed(2)}:1
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Ralentissement
                </div>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Pas du Développement</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {gearCalculation.pitch.toFixed(3)} mm
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Pas primitif
                </div>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">💡 Informations Techniques</h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Un rapport supérieur à 1 accélère le mouvement</li>
              <li>• Un rapport inférieur à 1 ralentit le mouvement</li>
              <li>• Module standard: 0.2 - 2.0 mm (horlogerie)</li>
              <li>• Rapport idéal: 3:1 à 8:1 (efficacité maximale)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}