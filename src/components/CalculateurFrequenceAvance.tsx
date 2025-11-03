import { useState, useMemo } from 'react'
import { Activity, Target, TrendingUp, Award, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

export default function CalculateurFrequenceAvance() {
  const [baseFrequency, setBaseFrequency] = useState(4.0) // Hz
  const [amplitude, setAmplitude] = useState(250) // degrés
  const [temperature, setTemperature] = useState(20) // °C
  const [position, setPosition] = useState('Crown_Up')
  const [beatError, setBeatError] = useState(0) // ms
  const [magnetStrength, setMagnetStrength] = useState(0) // Gauss

  const results = useMemo(() => {
    // Fréquence de base en Hz et calculs dérivés
    const frequencyHz = baseFrequency
    const frequencyVph = frequencyHz * 3600 // vibrations per hour
    const period = 1 / frequencyHz // période en secondes
    const beatPeriod = period / 2 // période d'un battement
    
    // Correction d'amplitude (impact sur la fréquence)
    const amplitudeCorrection = 1 + (amplitude - 250) * 0.00002 // Coefficient typique
    
    // Correction de température (coefficient thermique du spiral)
    const tempCoeff = -0.5 // -0.5 sec/jour/°C
    const tempCorrection = 1 + (tempCoeff * (temperature - 20) / 86400)
    
    // Corrections selon la position (variations dues à la gravité)
    const positionFactors = {
      'Crown_Up': { freqFactor: 1.000, error: 0 },
      'Crown_Down': { freqFactor: 0.998, error: -2 },
      'Face_Up': { freqFactor: 0.999, error: -1 },
      'Face_Down': { freqFactor: 0.997, error: -3 },
      'Side_Left': { freqFactor: 0.996, error: -4 },
      'Side_Right': { freqFactor: 0.996, error: -4 }
    }
    const positionFactor = positionFactors[position as keyof typeof positionFactors]
    
    // Fréquence corrigée
    const correctedFreq = frequencyHz * amplitudeCorrection * tempCorrection * positionFactor.freqFactor
    const correctedVph = correctedFreq * 3600
    
    // Erreur de battement et correction
    const totalBeatError = beatError + positionFactor.error + magnetStrength * 0.001
    const beatErrorCorrection = totalBeatError / (beatPeriod * 1000)
    const finalFrequency = correctedFreq + beatErrorCorrection
    
    // Calculs pour certification COSC
    const coscVph = Math.round(finalFrequency * 3600)
    const deviationFromVph = coscVph - 28800 // 4Hz = 28800 vph
    const deviationPpm = (deviationFromVph / 28800) * 1000000
    
    // Analyse des erreurs
    const amplitudeError = ((amplitude - 250) / 250) * 100
    const temperatureError = (temperature - 20) * 0.5
    const positionError = positionFactor.error
    const magneticError = magnetStrength * 0.001
    
    // Statistiques de performance
    const totalDailyDeviation = amplitudeError + temperatureError + positionError + magneticError + totalBeatError
    
    // Données pour graphique radar des performances
    const radarData = [
      {
        metric: 'Précision',
        value: Math.max(0, 100 - Math.abs(deviationPpm) * 10),
        fullMark: 100
      },
      {
        metric: 'Stabilité',
        value: Math.max(0, 100 - Math.abs(totalDailyDeviation)),
        fullMark: 100
      },
      {
        metric: 'Amplitude',
        value: Math.max(0, 100 - Math.abs(amplitudeError)),
        fullMark: 100
      },
      {
        metric: 'Température',
        value: Math.max(0, 100 - Math.abs(temperatureError)),
        fullMark: 100
      },
      {
        metric: 'Position',
        value: Math.max(0, 100 - Math.abs(positionError) * 10),
        fullMark: 100
      }
    ]
    
    // Prévision de performance COSC
    const coscEligibility = {
      dailyRate: Math.abs(deviationPpm) <= 4, // ±4 sec/jour
      maxDeviation: Math.abs(deviationPpm) <= 10, // ±10 sec total
      isEligible: Math.abs(deviationPpm) <= 4 && Math.abs(totalDailyDeviation) <= 4
    }
    
    // Analyse des harmoniques
    const harmonics = []
    for (let i = 1; i <= 8; i++) {
      harmonics.push({
        harmonic: i,
        frequency: finalFrequency * i,
        amplitude: 100 / i,
        phase: i * 45 // Déphasage de 45° par harmonique
      })
    }
    
    return {
      baseFreq: frequencyHz,
      correctedFreq: finalFrequency,
      baseVph: frequencyVph,
      finalVph: Math.round(finalFrequency * 3600),
      deviationPpm: deviationPpm.toFixed(2),
      deviationFromVph,
      amplitudeCorrection: amplitudeCorrection.toFixed(6),
      tempCorrection: tempCorrection.toFixed(6),
      beatError: totalBeatError.toFixed(2),
      amplitudeError: amplitudeError.toFixed(2),
      temperatureError: temperatureError.toFixed(2),
      positionError: positionError,
      magneticError: magneticError.toFixed(2),
      totalDailyDeviation: totalDailyDeviation.toFixed(2),
      radarData,
      coscEligibility,
      harmonics,
      beatPeriod: beatPeriod.toFixed(4)
    }
  }, [baseFrequency, amplitude, temperature, position, beatError, magnetStrength])

  return (
    <div className="p-6 bg-slate-900 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Calculateur de Fréquence d'Oscillation Avancé</h1>
              <p className="text-slate-400">Analyse professionnelle pour certifications COSC et optimisation chronométrique</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Target className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Précision COSC</h3>
              <p className="text-slate-300 text-sm">Certification chronomètre</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <BarChart3 className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Analyse Harmonique</h3>
              <p className="text-slate-300 text-sm">Spectre fréquentiel</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Performance</h3>
              <p className="text-slate-300 text-sm">Métriques avancées</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Award className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Certification</h3>
              <p className="text-slate-300 text-sm">Validation COSC</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Paramètres d'entrée */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Paramètres de Réglage</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Fréquence de base (Hz)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={baseFrequency}
                  onChange={(e) => setBaseFrequency(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">4.0 Hz = 28'800 vph (standard)</p>
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
                <p className="text-slate-400 text-xs mt-1">250° = Amplitude optimale</p>
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
                <p className="text-slate-400 text-xs mt-1">Référence COSC: 8°C, 23°C, 38°C</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Position d'essai
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Crown_Up">Couronne en haut</option>
                  <option value="Crown_Down">Couronne en bas</option>
                  <option value="Face_Up">Cadran en haut</option>
                  <option value="Face_Down">Cadran en bas</option>
                  <option value="Side_Left">Côté gauche</option>
                  <option value="Side_Right">Côté droit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Erreur de battement (ms)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={beatError}
                  onChange={(e) => setBeatError(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">0 = Battement parfait</p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Champ magnétique (Gauss)
                </label>
                <input
                  type="number"
                  step="10"
                  value={magnetStrength}
                  onChange={(e) => setMagnetStrength(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-slate-400 text-xs mt-1">0 = Aucun champ magnétique</p>
              </div>
            </div>
          </div>

          {/* Résultats COSC */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Résultats Certification COSC</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Fréquences Calculées</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fréquence de base:</span>
                    <span className="text-white font-mono">{results.baseFreq} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fréquence corrigée:</span>
                    <span className="text-white font-mono">{results.correctedFreq.toFixed(3)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vibrations/heure:</span>
                    <span className="text-white font-mono">{results.finalVph} vph</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Période de battement:</span>
                    <span className="text-white font-mono">{results.beatPeriod} sec</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Dérive Chronométrique</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Écart (ppm):</span>
                    <span className={`font-mono ${Math.abs(parseFloat(results.deviationPpm)) <= 4 ? 'text-green-400' : 'text-red-400'}`}>
                      {results.deviationPpm} ppm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Écart (sec/jour):</span>
                    <span className={`font-mono ${Math.abs(parseFloat(results.deviationPpm)) <= 4 ? 'text-green-400' : 'text-red-400'}`}>
                      {(parseFloat(results.deviationPpm) * 86400 / 1000000).toFixed(2)} sec
                    </span>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-4 ${results.coscEligibility.isEligible ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <h3 className={`font-semibold mb-2 ${results.coscEligibility.isEligible ? 'text-green-400' : 'text-red-400'}`}>
                  Éligibilité COSC
                </h3>
                <div className="flex items-center gap-2">
                  {results.coscEligibility.isEligible ? (
                    <Award className="w-5 h-5 text-green-500" />
                  ) : (
                    <Target className="w-5 h-5 text-red-500" />
                  )}
                  <span className={results.coscEligibility.isEligible ? 'text-green-400' : 'text-red-400'}>
                    {results.coscEligibility.isEligible ? 'CERTIFIÉ' : 'NON CERTIFIÉ'}
                  </span>
                </div>
                {!results.coscEligibility.isEligible && (
                  <p className="text-red-300 text-sm mt-2">
                    Écart trop important: {Math.abs(parseFloat(results.deviationPpm))} ppm
                  </p>
                )}
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Facteurs de Correction</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amplitude:</span>
                    <span className="text-white font-mono">×{results.amplitudeCorrection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Température:</span>
                    <span className="text-white font-mono">×{results.tempCorrection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Battement:</span>
                    <span className="text-white font-mono">{results.beatError} ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyse des performances */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Analyse de Performance</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Erreurs par Source</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amplitude:</span>
                    <span className={`font-mono ${Math.abs(parseFloat(results.amplitudeError)) <= 5 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(results.amplitudeError) > 0 ? '+' : ''}{results.amplitudeError}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Température:</span>
                    <span className={`font-mono ${Math.abs(parseFloat(results.temperatureError)) <= 2 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(results.temperatureError) > 0 ? '+' : ''}{results.temperatureError} sec
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Position:</span>
                    <span className={`font-mono ${Math.abs(results.positionError) <= 2 ? 'text-green-400' : 'text-red-400'}`}>
                      {results.positionError > 0 ? '+' : ''}{results.positionError} sec
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Magnétique:</span>
                    <span className={`font-mono ${Math.abs(parseFloat(results.magneticError)) <= 1 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(results.magneticError) > 0 ? '+' : ''}{results.magneticError} sec
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Dérive Totale Quotidienne</h3>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${Math.abs(parseFloat(results.totalDailyDeviation)) <= 4 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(results.totalDailyDeviation) > 0 ? '+' : ''}{results.totalDailyDeviation} sec
                  </div>
                  <p className="text-slate-400 text-sm mt-1">par rapport à la référence</p>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Recommandations</h3>
                <div className="space-y-2 text-sm">
                  {Math.abs(parseFloat(results.amplitudeError)) > 5 && (
                    <p className="text-red-300">⚠️ Réajuster l'amplitude ({amplitude}°)</p>
                  )}
                  {Math.abs(parseFloat(results.temperatureError)) > 2 && (
                    <p className="text-yellow-300">⚠️ Optimiser la compensation thermique</p>
                  )}
                  {Math.abs(results.positionError) > 2 && (
                    <p className="text-yellow-300">⚠️ Équilibrer les masses oscillantes</p>
                  )}
                  {Math.abs(parseFloat(results.magneticError)) > 1 && (
                    <p className="text-red-300">⚠️ Protection antimagnétique insuffisante</p>
                  )}
                  {Math.abs(parseFloat(results.beatError)) > 0.5 && (
                    <p className="text-yellow-300">⚠️ Ajuster l'échappement</p>
                  )}
                  {Math.abs(parseFloat(results.totalDailyDeviation)) <= 4 && (
                    <p className="text-green-300">✅ Réglage optimal pour COSC</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Performance Radar</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={results.radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    tickCount={5}
                  />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Spectre Harmonique</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.harmonics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="harmonic" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="amplitude" stroke="#F59E0B" strokeWidth={3} name="Amplitude %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tableau des harmoniques */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Analyse Détaillée des Harmoniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.harmonics.map((harmonic, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-3">
                <div className="text-amber-500 font-semibold text-sm mb-1">H{harmonic.harmonic}</div>
                <div className="text-white font-mono text-xs mb-2">{harmonic.frequency.toFixed(2)} Hz</div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${harmonic.amplitude}%` }}
                  ></div>
                </div>
                <div className="text-slate-400 text-xs mt-1">Phase: {harmonic.phase}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* Informations COSC */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Critères de Certification COSC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-amber-500 font-semibold mb-3">Critères Primaires</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300"><strong>Marche moyenne:</strong> -4/+6 secondes par jour</p>
                <p className="text-slate-300"><strong>Écart maximal:</strong> ±10 secondes total</p>
                <p className="text-slate-300"><strong>Différence positions:</strong> ±5 secondes max</p>
                <p className="text-slate-300"><strong>Variation thermique:</strong> ±0.6 sec/°C</p>
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-semibold mb-3">Tests de Validation</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300"><strong>Durée:</strong> 15 jours consécutifs</p>
                <p className="text-slate-300"><strong>Positions:</strong> 3 positions verticales + horizontale</p>
                <p className="text-slate-300"><strong>Températures:</strong> 8°C, 23°C, 38°C</p>
                <p className="text-slate-300"><strong>Remontage:</strong> Mouvement automatique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
