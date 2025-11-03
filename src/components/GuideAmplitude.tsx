import React, { useState } from 'react';
import { Info, Activity, TrendingUp, TrendingDown } from 'lucide-react';

export default function GuideAmplitude() {
  const [selectedMovement, setSelectedMovement] = useState('automatic');
  const [temperature, setTemperature] = useState(20);
  const [position, setPosition] = useState('dial-up');
  const [amplitude, setAmplitude] = useState(270);

  const movementData = {
    automatic: {
      name: 'Automatique',
      optimal: { min: 220, max: 320, ideal: 270 },
      description: 'Mouvement automatique standard'
    },
    manual: {
      name: 'Manuel',
      optimal: { min: 200, max: 300, ideal: 250 },
      description: 'Mouvement à remontage manuel'
    },
    chronograph: {
      name: 'Chronographe',
      optimal: { min: 240, max: 340, ideal: 290 },
      description: 'Mouvement chronographe à complications'
    },
    tourbillon: {
      name: 'Tourbillon',
      optimal: { min: 260, max: 360, ideal: 310 },
      description: 'Mouvement avec tourbillon'
    },
    quartz: {
      name: 'Quartz',
      optimal: { min: 180, max: 220, ideal: 200 },
      description: 'Mouvement à quartz'
    }
  };

  const positionData = {
    'dial-up': { name: 'Cadran vers le haut', modifier: 0 },
    'dial-down': { name: 'Cadran vers le bas', modifier: -20 },
    'crown-up': { name: 'Couronne vers le haut', modifier: +15 },
    'crown-down': { name: 'Couronne vers le bas', modifier: -10 },
    'crown-left': { name: 'Couronne vers la gauche', modifier: -5 },
    'crown-right': { name: 'Couronne vers la droite', modifier: -5 }
  };

  const tempModifier = temperature !== 20 ? (temperature - 20) * 1.5 : 0;
  const totalAmplitude = amplitude + positionData[position as keyof typeof positionData].modifier + tempModifier;

  const getStatus = (amp: number, movement: string) => {
    const optimal = movementData[movement as keyof typeof movementData].optimal;
    if (amp < optimal.min - 30) return { status: 'low', color: 'red', icon: TrendingDown };
    if (amp > optimal.max + 30) return { status: 'high', color: 'blue', icon: TrendingUp };
    if (amp < optimal.min || amp > optimal.max) return { status: 'warning', color: 'amber', icon: Info };
    return { status: 'optimal', color: 'green', icon: Activity };
  };

  const status = getStatus(totalAmplitude, selectedMovement);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-3 rounded-lg">
          <Info className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Guide d'Amplitude</h2>
          <p className="text-slate-600 dark:text-light-400">Comprendre et ajuster l'amplitude du balancier</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Paramètres de mesure */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Paramètres de Mesure
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Type de Mouvement
              </label>
              <select
                value={selectedMovement}
                onChange={(e) => setSelectedMovement(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="automatic">Automatique</option>
                <option value="manual">Manuel</option>
                <option value="chronograph">Chronographe</option>
                <option value="tourbillon">Tourbillon</option>
                <option value="quartz">Quartz</option>
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {movementData[selectedMovement as keyof typeof movementData].description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                Position de Mesure
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="dial-up">Cadran vers le haut</option>
                <option value="dial-down">Cadran vers le bas</option>
                <option value="crown-up">Couronne vers le haut</option>
                <option value="crown-down">Couronne vers le bas</option>
                <option value="crown-left">Couronne vers la gauche</option>
                <option value="crown-right">Couronne vers la droite</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Amplitude de Base (°)
                </label>
                <input
                  type="number"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-indigo-500"
                  min="50"
                  max="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Température (°C)
                </label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 focus:ring-2 focus:ring-indigo-500"
                  min="-10"
                  max="40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Résultats et indicateurs */}
        <div className="space-y-6">
          {/* Amplitude résultante */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-4">
              Amplitude Résultat
            </h3>
            
            <div className={`bg-white/60 dark:bg-white/10 rounded-lg p-6 text-center border-2 ${
              status.color === 'green' ? 'border-green-500/50' :
              status.color === 'amber' ? 'border-amber-500/50' :
              status.color === 'red' ? 'border-red-500/50' :
              'border-blue-500/50'
            }`}>
              <div className="text-4xl font-bold text-slate-900 dark:text-light-100 mb-2">
                {totalAmplitude.toFixed(0)}°
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <status.icon className={`w-5 h-5 ${
                  status.color === 'green' ? 'text-green-500' :
                  status.color === 'amber' ? 'text-amber-500' :
                  status.color === 'red' ? 'text-red-500' :
                  'text-blue-500'
                }`} />
                <span className={`text-sm font-medium ${
                  status.color === 'green' ? 'text-green-700 dark:text-green-300' :
                  status.color === 'amber' ? 'text-amber-700 dark:text-amber-300' :
                  status.color === 'red' ? 'text-red-700 dark:text-red-300' :
                  'text-blue-700 dark:text-blue-300'
                }`}>
                  {status.status === 'optimal' && 'Optimal'}
                  {status.status === 'warning' && 'Acceptable'}
                  {status.status === 'low' && 'Trop faible'}
                  {status.status === 'high' && 'Trop élevé'}
                </span>
              </div>
              
              <div className="text-sm text-slate-600 dark:text-light-400">
                Plage optimale: {movementData[selectedMovement as keyof typeof movementData].optimal.min}° - {movementData[selectedMovement as keyof typeof movementData].optimal.max}°
              </div>
            </div>

            {/* Ajustements */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-light-400">Base:</span>
                <span className="font-mono">{amplitude}°</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-light-400">Position:</span>
                <span className="font-mono">{positionData[position as keyof typeof positionData].modifier > 0 ? '+' : ''}{positionData[position as keyof typeof positionData].modifier}°</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-light-400">Température:</span>
                <span className="font-mono">{tempModifier > 0 ? '+' : ''}{tempModifier.toFixed(1)}°</span>
              </div>
            </div>
          </div>

          {/* Facteurs d'influence */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-medium text-slate-900 dark:text-light-100 mb-3">Facteurs d'Influence</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-light-400">Position {positionData[position as keyof typeof positionData].name}:</span>
                <span className={`font-medium ${positionData[position as keyof typeof positionData].modifier > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {positionData[position as keyof typeof positionData].modifier > 0 ? '+' : ''}{positionData[position as keyof typeof positionData].modifier}°
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-light-400">Différence température ({temperature}°C):</span>
                <span className={`font-medium ${tempModifier > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tempModifier > 0 ? '+' : ''}{tempModifier.toFixed(1)}°
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide complet */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Amplitude Optimale (220° - 320°)
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
            <li>• Fonctionnement le plus efficace du mouvement</li>
            <li>• Précision chronométrique optimale</li>
            <li>• Durée de vie maximale des composants</li>
            <li>• Consommation énergétique équilibrée</li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Problèmes d'Amplitude
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <li>• <strong>Trop faible (&lt;190°):</strong> Insuffisance de puissance, arrêt possible</li>
            <li>• <strong>Trop élevé (&gt;350°):</strong> Usure accélérée, imprecision</li>
            <li>• <strong>Variations importantes:</strong> Problème de lubrification</li>
            <li>• <strong>Différences de position:</strong> Déséquilibre du balancier</li>
          </ul>
        </div>
      </div>
    </div>
  );
}