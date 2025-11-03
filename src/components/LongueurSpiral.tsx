import React, { useState, useMemo } from 'react';
import { Settings, Ruler, Activity } from 'lucide-react';

export default function LongueurSpiral() {
  const [balanceDiameter, setBalanceDiameter] = useState(28);
  const [springThickness, setSpringThickness] = useState(0.12);
  const [springWidth, setSpringWidth] = useState(0.18);
  const [springMaterial, setSpringMaterial] = useState('elgiloy');

  // Calcul de longueur de spiral avec useMemo
  const spiralCalculation = useMemo(() => {
    // Formule simplifiée pour le calcul de longueur de spiral
    const innerDiameter = balanceDiameter - 1.0; // Déviation interne
    const turns = Math.round(balanceDiameter / (springWidth * 2));
    
    // Calcul de longueur avec développement spiral
    const averageDiameter = (balanceDiameter + innerDiameter) / 2;
    const length = Math.PI * averageDiameter * turns * 0.85; // Coefficient de développement
    
    return {
      length,
      coils: turns,
      averageDiameter,
      innerDiameter
    };
  }, [balanceDiameter, springWidth]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/20 p-3 rounded-lg">
          <Ruler className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Longueur de Spiral</h2>
          <p className="text-slate-600 dark:text-light-400">Calculateur de longueur optimale du spiral</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire de calcul */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Paramètres du Balancier
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Diamètre du Balancier (mm)
              </label>
              <input
                type="number"
                value={balanceDiameter}
                onChange={(e) => setBalanceDiameter(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-green-500"
                step="0.1"
                min="20"
                max="40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Épaisseur du Spiral (mm)
              </label>
              <input
                type="number"
                value={springThickness}
                onChange={(e) => setSpringThickness(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-green-500"
                step="0.01"
                min="0.05"
                max="0.30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Largeur du Spiral (mm)
              </label>
              <input
                type="number"
                value={springWidth}
                onChange={(e) => setSpringWidth(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-green-500"
                step="0.01"
                min="0.10"
                max="0.40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Matériau du Spiral
              </label>
              <select
                value={springMaterial}
                onChange={(e) => setSpringMaterial(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-green-500"
              >
                <option value="elgiloy">Elgiloy (Acier balistique)</option>
                <option value="nivaflex">Nivaflex (Alliage spécial)</option>
                <option value="chronoflex">Chronoflex (Acier SS316)</option>
                <option value="fastrack">Fastrack (Acier SS316)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Calculs du Spiral
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Longueur du Spiral</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {spiralCalculation.length.toFixed(1)} mm
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Développement calculé
                </div>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Nombre de Spires</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {spiralCalculation.coils} spires
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Spires actives estimées
                </div>
              </div>

              <div className="bg-white/60 dark:bg-white/10 rounded-lg p-4">
                <div className="text-sm text-green-700 dark:text-green-300 mb-1">Constante de Raideur</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {(springThickness / springWidth).toFixed(3)}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Rapport épaisseur/largeur
                </div>
              </div>
            </div>
          </div>

          {/* Tableau de référence des matériaux */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">⚙️ Matériaux de Spiraux</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/60 dark:bg-white/10 rounded p-2">
                <div className="font-medium text-blue-800 dark:text-blue-200">Elgiloy</div>
                <div className="text-blue-600 dark:text-blue-400">Dur, faible fatigue</div>
              </div>
              <div className="bg-white/60 dark:bg-white/10 rounded p-2">
                <div className="font-medium text-blue-800 dark:text-blue-200">Nivaflex</div>
                <div className="text-blue-600 dark:text-blue-400">Standard horlogerie</div>
              </div>
              <div className="bg-white/60 dark:bg-white/10 rounded p-2">
                <div className="font-medium text-blue-800 dark:text-blue-200">Chronoflex</div>
                <div className="text-blue-600 dark:text-blue-400">Inox SS316</div>
              </div>
              <div className="bg-white/60 dark:bg-white/10 rounded p-2">
                <div className="font-medium text-blue-800 dark:text-blue-200">Fastrack</div>
                <div className="text-blue-600 dark:text-blue-400">Durable long terme</div>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">💡 Optimisation</h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Longueur optimale: 15-25 mm pour calibres standards</li>
              <li>• Spires actives: 6-12 selon la précision requise</li>
              <li>• Coefficient d'épaisseur: 0.6-0.8 (isochronisme)</li>
              <li>• Température: Compensation matériaux spéciaux</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}