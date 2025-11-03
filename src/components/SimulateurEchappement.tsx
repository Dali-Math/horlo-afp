import React, { useState } from 'react';
import { Settings, Cpu, Zap, Clock } from 'lucide-react';

export default function SimulateurEchappement() {
  const [selectedType, setSelectedType] = useState('lever');
  const [frequency, setFrequency] = useState(4);
  const [powerReserve, setPowerReserve] = useState(48);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const echappementTypes = {
    lever: {
      name: 'Échappement Ancre',
      description: 'Système le plus répandu en horlogerie',
      characteristics: [
        'Précision: 5-15 secondes/jour',
        'Rendement: 75-85%',
        'Robustesse: Très bonne',
        'Maintenance: Facile'
      ],
      diagram: 'Ancre traditionnelle avec palettes en rubis'
    },
    coaxial: {
      name: 'Échappement Coaxial',
      description: 'Innovation Rolex pour réduire la friction',
      characteristics: [
        'Précision: 3-8 secondes/jour',
        'Rendement: 90-95%',
        'Robustesse: Excellente',
        'Maintenance: Complexe'
      ],
      diagram: 'Disque coaxial avec transmission directe'
    },
    detent: {
      name: 'Échappement Détente',
      description: 'Système à détente pour chronomètres de marine',
      characteristics: [
        'Précision: 1-5 secondes/jour',
        'Rendement: 85-90%',
        'Robustesse: Bonne',
        'Maintenance: Très spécialisée'
      ],
      diagram: 'Détente enrubanshipée avec ressort de détente'
    },
    remontoir: {
      name: 'Échappement Remontoir',
      description: 'Système à quantième perpetuel',
      characteristics: [
        'Précision: 3-10 secondes/jour',
        'Rendement: 80-90%',
        'Robustesse: Bonne',
        'Maintenance: Spécialisée'
      ],
      diagram: 'Remontoir avec impulsion intermittente'
    },
    detent_gliding: {
      name: 'Détente Glissante',
      description: 'Système moderne haute précision',
      characteristics: [
        'Précision: 2-7 secondes/jour',
        'Rendement: 85-92%',
        'Robustesse: Bonne',
        'Maintenance: Spécialisée'
      ],
      diagram: 'Détente avec transmission glissante'
    }
  };

  const currentType = echappementTypes[selectedType as keyof typeof echappementTypes];

  const startSimulation = () => {
    setIsSimulating(true);
    // Simulation logic would go here
  };

  const stopSimulation = () => {
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-500/20 p-3 rounded-lg">
          <Cpu className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Simulateur d'Échappement</h2>
          <p className="text-slate-600 dark:text-light-400">Animation interactive des systèmes d'échappement</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sélection du type d'échappement */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Types d'Échappement
            </h3>
            <div className="space-y-2">
              {Object.entries(echappementTypes).map(([key, type]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedType === key
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                      : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Paramètres de simulation */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4">Paramètres</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Fréquence (Hz)
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-slate-600 dark:text-light-400 mt-1">
                  {frequency} Hz ({frequency * 3600} alternances/h)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Réserve de Marche (h)
                </label>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={powerReserve}
                  onChange={(e) => setPowerReserve(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-slate-600 dark:text-light-400 mt-1">
                  {powerReserve} heures
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Vitesse de Simulation
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={simulationSpeed}
                  onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-slate-600 dark:text-light-400 mt-1">
                  {simulationSpeed}x
                </div>
              </div>

              <div className="flex gap-2">
                {!isSimulating ? (
                  <button
                    onClick={startSimulation}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Démarrer
                  </button>
                ) : (
                  <button
                    onClick={stopSimulation}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Arrêter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Zone de simulation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visualisation */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-200 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Animation en Temps Réel
            </h3>
            
            <div className="bg-white/60 dark:bg-white/10 rounded-lg p-8 min-h-64 flex items-center justify-center relative overflow-hidden">
              {isSimulating ? (
                <div className="text-center">
                  <div className="relative">
                    {/* Animation simulée */}
                    <div className="w-32 h-32 border-4 border-cyan-300 rounded-full animate-spin mx-auto mb-4">
                      <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-80">
                        <div className="absolute inset-6 bg-white rounded-full opacity-90"></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-2">
                      ÉCHAPPEMENT EN MARCHE
                    </div>
                    <div className="text-cyan-600 dark:text-cyan-400">
                      {frequency} Hz • {powerReserve}h • {simulationSpeed}x
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Clock className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
                  <div className="text-lg text-cyan-800 dark:text-cyan-200 mb-2">
                    Prêt pour la Simulation
                  </div>
                  <div className="text-sm text-cyan-600 dark:text-cyan-400">
                    Cliquez sur "Démarrer" pour voir l'animation
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Caractéristiques détaillées */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4">
              {currentType.name}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-light-100 mb-3">Description</h4>
                <p className="text-sm text-slate-600 dark:text-light-400 mb-4">
                  {currentType.description}
                </p>
                
                <h4 className="font-medium text-slate-900 dark:text-light-100 mb-3">Architecture</h4>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <code className="text-xs text-slate-700 dark:text-light-300">
                    {currentType.diagram}
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 dark:text-light-100 mb-3">Caractéristiques</h4>
                <div className="space-y-2">
                  {currentType.characteristics.map((char, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-slate-600 dark:text-light-400">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Précision</h4>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">±8s</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">par jour en moyenne</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Rendement</h4>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 mb-1">87%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Efficacité énergétique</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Fréquence</h4>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">{frequency * 3600}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Alternances/heure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}