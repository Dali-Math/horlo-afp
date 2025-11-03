import { useState, useMemo } from 'react'
import { Music, Radio, TrendingUp, AlertCircle, Speaker } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function SimulateurResonance() {
  const [frequency, setFrequency] = useState(28800) // Hz
  const [temperature, setTemperature] = useState(20) // °C
  const [amplitude, setAmplitude] = useState(250) // degrés
  const [distanceOscillators, setDistanceOscillators] = useState(2.5) // mm
  const [couplingCoeff, setCouplingCoeff] = useState(0.15)

  const results = useMemo(() => {
    // Fréquence de résonance en mode découplé (base)
    const baseFreq = frequency / 3600 // Conversion Hz vers cycles/secondes
    
    // Calcul de la fréquence de résonance couplée (F.P. Journe formula)
    const resonanceFrequency1 = baseFreq * Math.sqrt(1 - couplingCoeff)
    const resonanceFrequency2 = baseFreq * Math.sqrt(1 + couplingCoeff)
    
    // Fréquence de battement (différence entre les deux modes)
    const beatFrequency = resonanceFrequency2 - resonanceFrequency1
    
    // Amélioration de la stabilité (formule F.P. Journe)
    const stabilityImprovement = 1 + (couplingCoeff * distanceOscillators / 10)
    
    // Compensation thermique (coefficient thermique du réglage)
    const thermalCoeff = -0.5 // -0.5 sec/°C/jour typique
    const thermalDrift = thermalCoeff * (temperature - 20) * Math.sqrt(stabilityImprovement)
    
    // Amélioration de la précision COSC
    const precisionImprovement = (1 - couplingCoeff) * 100 // Pourcentage d'amélioration
    
    // Calcul des amplitudes optimales
    const optimalAmplitudeMin = 200 * Math.sqrt(stabilityImprovement)
    const optimalAmplitudeMax = 300 * Math.sqrt(stabilityImprovement)
    
    // Génération des données de la courbe de réponse
    const responseData = []
    for (let i = -5; i <= 5; i += 0.1) {
      const testFreq = baseFreq + (i * 0.01)
      const attenuation = 1 / (1 + Math.pow((testFreq - baseFreq) / (beatFrequency / 2), 2))
      const response1 = Math.abs(1 / (1 + Math.pow((testFreq - resonanceFrequency1) / 0.01, 2)))
      const response2 = Math.abs(1 / (1 + Math.pow((testFreq - resonanceFrequency2) / 0.01, 2)))
      const coupledResponse = (response1 + response2) / 2
      
      responseData.push({
        freq: testFreq,
        uncoupled: attenuation,
        coupled: coupledResponse,
        mode1: response1,
        mode2: response2
      })
    }
    
    // Analyse spectrale
    const harmonics = []
    for (let i = 1; i <= 10; i++) {
      harmonics.push({
        harmonic: i,
        uncoupledFreq: baseFreq * i,
        coupledFreq: resonanceFrequency1 * i,
        amplitude: 1 / i * 100
      })
    }
    
    return {
      baseFreq: (baseFreq * 3600).toFixed(2),
      resonanceFreq1: (resonanceFrequency1 * 3600).toFixed(2),
      resonanceFreq2: (resonanceFrequency2 * 3600).toFixed(2),
      beatFreq: (beatFrequency * 3600).toFixed(2),
      stabilityImprovement: stabilityImprovement.toFixed(2),
      thermalDrift: thermalDrift.toFixed(2),
      precisionImprovement: precisionImprovement.toFixed(1),
      optimalAmplitudeMin: optimalAmplitudeMin.toFixed(1),
      optimalAmplitudeMax: optimalAmplitudeMax.toFixed(1),
      responseData,
      harmonics
    }
  }, [frequency, temperature, amplitude, distanceOscillators, couplingCoeff])

  return (
    <div className="p-6 bg-slate-900 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Simulateur de Résonance Horlogère</h1>
              <p className="text-slate-400">Technologie F.P. Journe - Résonance acoustique pour une stabilité exceptionnelle</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Radio className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Résonance</h3>
              <p className="text-slate-300 text-sm">Deux oscillateurs couplés</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Stabilité</h3>
              <p className="text-slate-300 text-sm">Amélioration exceptionnelle</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Speaker className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Acoustique</h3>
              <p className="text-slate-300 text-sm">Phénomènes vibratoires</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <AlertCircle className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">F.P. Journe</h3>
              <p className="text-slate-300 text-sm">Technologie propriétaire</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Paramètres d'entrée */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Paramètres de Simulation</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Fréquence de base (Hz)
                </label>
                <input
                  type="number"
                  step="100"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">28'800 Hz = 4Hz par oscillation</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Température (°C)
                </label>
                <input
                  type="number"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">Référence: 20°C</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Amplitude (degrés)
                </label>
                <input
                  type="number"
                  step="10"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">250° = Amplitude standard</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Distance oscillateurs (mm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={distanceOscillators}
                  onChange={(e) => setDistanceOscillators(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">2-3mm pour résonance optimale</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Coefficient de couplage
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="0.3"
                  value={couplingCoeff}
                  onChange={(e) => setCouplingCoeff(parseFloat(e.target.value) || 0.01)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">0.10-0.20 = Résonance efficace</p>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Résultats de Simulation</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Fréquences de Résonance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fréquence de base:</span>
                    <span className="text-white font-mono">{results.baseFreq} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mode 1:</span>
                    <span className="text-white font-mono">{results.resonanceFreq1} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mode 2:</span>
                    <span className="text-white font-mono">{results.resonanceFreq2} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fréquence de battement:</span>
                    <span className="text-white font-mono">{results.beatFreq} Hz</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Améliorations Obtenues</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stabilité:</span>
                    <span className="text-green-400 font-mono">+{((parseFloat(results.stabilityImprovement) - 1) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Précision COSC:</span>
                    <span className="text-green-400 font-mono">+{results.precisionImprovement}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dérive thermique:</span>
                    <span className="text-white font-mono">{results.thermalDrift} sec/jour</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Amplitude Optimale</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Minimum:</span>
                    <span className="text-white font-mono">{results.optimalAmplitudeMin}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Maximum:</span>
                    <span className="text-white font-mono">{results.optimalAmplitudeMax}°</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Efficacité de la Résonance</h3>
                <div className="flex items-center gap-2">
                  {parseFloat(results.stabilityImprovement) > 1.1 ? (
                    <AlertCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-green-400 text-sm">
                    {parseFloat(results.stabilityImprovement) > 1.1 ? 'Résonance optimale' : 'Résonance faible'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Technologie F.P. Journe</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-amber-500 font-semibold mb-2">Principe de Résonance</h3>
                <p className="text-slate-300 text-sm">
                  La résonance horlogère consiste à coupler deux oscillateurs indépendants 
                  qui oscillent en opposition de phase, créant une stabilité exceptionnelle.
                </p>
              </div>
              
              <div>
                <h3 className="text-amber-500 font-semibold mb-2">Avantages</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Amélioration de la stabilité temporelle</li>
                  <li>• Réduction des perturbations externes</li>
                  <li>• Compensation thermique naturelle</li>
                  <li>• Supériorité dans les positions verticales</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-amber-500 font-semibold mb-2">Applications</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Montres de précision COSC</li>
                  <li>• Chronomètres de marine</li>
                  <li>• Chronographes de haute précision</li>
                  <li>• Montres à secondes constantes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Courbe de Réponse Fréquentielle</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.responseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="freq" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="uncoupled" stroke="#94A3B8" strokeWidth={2} name="Non couplé" />
                  <Line type="monotone" dataKey="coupled" stroke="#F59E0B" strokeWidth={3} name="En résonance" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Modes de Résonance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.responseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="freq" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="mode1" stroke="#EF4444" strokeWidth={2} name="Mode 1" />
                  <Line type="monotone" dataKey="mode2" stroke="#3B82F6" strokeWidth={2} name="Mode 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Analyse spectrale */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Analyse Spectrale des Harmoniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {results.harmonics.slice(0, 10).map((harmonic, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-3 text-center">
                <div className="text-amber-500 font-semibold text-sm">H{harmonic.harmonic}</div>
                <div className="text-white font-mono text-xs">{harmonic.coupledFreq} Hz</div>
                <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${harmonic.amplitude}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}