import { useState, useMemo } from 'react'
import { Ruler, TrendingUp, AlertTriangle, CheckCircle, Calculator } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CalculateurTolerancesISO() {
  const [diameter, setDiameter] = useState(25.0)
  const [toleranceGrade, setToleranceGrade] = useState('IT6')
  const [fitType, setFitType] = useState('H7-g6')
  const [shaftDiameter, setShaftDiameter] = useState(24.98)

  // Table des grades de tolérance ISO 286 (en μm)
  const grades = {
    'IT1': 0.8, 'IT2': 1.2, 'IT3': 2, 'IT4': 3, 'IT5': 4, 'IT6': 6, 'IT7': 10,
    'IT8': 14, 'IT9': 25, 'IT10': 40, 'IT11': 60, 'IT12': 100, 'IT13': 140, 'IT14': 250,
    'IT15': 400, 'IT16': 600, 'IT17': 1000, 'IT18': 1600
  }

  // Deviations fondamentales en μm (diamètre 18-30mm)
  const fundamentalDeviations = {
    'H': { es: 0, ei: -21 },
    'h': { es: 0, ei: 0 },
    'g': { es: -7, ei: -27 },
    'f': { es: -20, ei: -40 },
    'e': { es: -40, ei: -73 },
    'd': { es: -65, ei: -117 },
    'c': { es: -110, ei: -195 }
  }

  const results = useMemo(() => {
    const toleranceValue = grades[toleranceGrade as keyof typeof grades] || 6
    
    // Calculs pour l'alésage (trou)
    const holeDeviation = fundamentalDeviations[fitType.split('-')[0] as keyof typeof fundamentalDeviations] || fundamentalDeviations['H']
    const shaftDeviation = fundamentalDeviations[fitType.split('-')[1] as keyof typeof fundamentalDeviations] || fundamentalDeviations['h']
    
    // Limites de l'alésage
    const es_hole = holeDeviation.es // Écart supérieur (μm)
    const ei_hole = holeDeviation.ei // Écart inférieur (μm)
    
    // Limites de l'arbre
    const es_shaft = shaftDeviation.es // Écart supérieur (μm)
    const ei_shaft = shaftDeviation.ei // Écart inférieur (μm)
    
    // Diamètres limites (mm)
    const hole_upper = diameter + es_hole / 1000
    const hole_lower = diameter + ei_hole / 1000
    const shaft_upper = shaftDiameter + es_shaft / 1000
    const shaft_lower = shaftDiameter + ei_shaft / 1000
    
    // Calculs de l'ajustement
    const clearance_max = hole_upper - shaft_lower
    const clearance_min = hole_lower - shaft_upper
    const interference_max = shaft_upper - hole_lower
    
    // Type d'ajustement
    let fit_type = 'Déterminer'
    if (clearance_min > 0) fit_type = 'Joueur (clearance)'
    else if (interference_max < 0) fit_type = 'Serré (interference)'
    else fit_type = 'Mixte (transition)'
    
    return {
      toleranceValue,
      hole_upper: hole_upper.toFixed(3),
      hole_lower: hole_lower.toFixed(3),
      shaft_upper: shaft_upper.toFixed(3),
      shaft_lower: shaft_lower.toFixed(3),
      clearance_max: clearance_max.toFixed(3),
      clearance_min: clearance_min.toFixed(3),
      interference_max: interference_max.toFixed(3),
      fit_type,
      es_hole, ei_hole, es_shaft, ei_shaft
    }
  }, [diameter, toleranceGrade, fitType, shaftDiameter])

  const chartData = [
    { name: 'Limite Inférieure Arbre', value: parseFloat(results.shaft_lower) },
    { name: 'Limite Supérieure Arbre', value: parseFloat(results.shaft_upper) },
    { name: 'Limite Inférieure Alésage', value: parseFloat(results.hole_lower) },
    { name: 'Limite Supérieure Alésage', value: parseFloat(results.hole_upper) }
  ]

  return (
    <div className="p-6 bg-slate-900 min-h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Ruler className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Calculateur de Tolérances ISO 286</h1>
              <p className="text-slate-400">Calculs précis des ajustements et jeux fonctionnels selon la norme ISO 286</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Norme ISO 286</h3>
              <p className="text-slate-300 text-sm">Système international de tolérances</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <Calculator className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Calculs Précis</h3>
              <p className="text-slate-300 text-sm">Ajustements et jeux fonctionnels</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="text-amber-500 font-semibold">Visualisation</h3>
              <p className="text-slate-300 text-sm">Graphiques et limites dimensionnelles</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Paramètres d'entrée */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-500" />
              Paramètres d'Entrée
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Diamètre nominal de l'alésage (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Grade de Tolérance ISO
                </label>
                <select
                  value={toleranceGrade}
                  onChange={(e) => setToleranceGrade(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {Object.keys(grades).map(grade => (
                    <option key={grade} value={grade}>{grade} ({grades[grade as keyof typeof grades]}μm)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Type d'ajustement
                </label>
                <select
                  value={fitType}
                  onChange={(e) => setFitType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="H7-g6">H7-g6 (Joueur)</option>
                  <option value="H7-f6">H7-f6 (Joueur)</option>
                  <option value="H7-e6">H7-e6 (Joueur)</option>
                  <option value="H7-h6">H7-h6 (Glissant)</option>
                  <option value="H7-k6">H7-k6 (Mixte)</option>
                  <option value="H7-n6">H7-n6 (Mixte)</option>
                  <option value="H7-p6">H7-p6 (Serré)</option>
                  <option value="H7-r6">H7-r6 (Serré)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Diamètre de l'arbre (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shaftDiameter}
                  onChange={(e) => setShaftDiameter(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Résultats des Calculs</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Limites Dimensionnelles (mm)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Alésage max:</p>
                    <p className="text-white font-mono text-lg">{results.hole_upper}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Alésage min:</p>
                    <p className="text-white font-mono text-lg">{results.hole_lower}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Arbre max:</p>
                    <p className="text-white font-mono text-lg">{results.shaft_upper}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Arbre min:</p>
                    <p className="text-white font-mono text-lg">{results.shaft_lower}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-3">Ajustements Calculés</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jeu maximum:</span>
                    <span className="text-white font-mono">{results.clearance_max} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jeu minimum:</span>
                    <span className="text-white font-mono">{results.clearance_min} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Interférence max:</span>
                    <span className="text-white font-mono">{results.interference_max} mm</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-amber-500 font-semibold mb-2">Type d'Ajustement</h3>
                <div className="flex items-center gap-2">
                  {results.fit_type === 'Joueur (clearance)' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : results.fit_type === 'Serré (interference)' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Calculator className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-white font-semibold">{results.fit_type}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  Tolérance {toleranceGrade}: ±{results.toleranceValue}μm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique de visualisation */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Visualisation des Limites</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Informations techniques */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Informations Techniques ISO 286</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-amber-500 font-semibold mb-3">Grades de Tolérance</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300"><strong>IT1-IT5:</strong> Ajustements de précision</p>
                <p className="text-slate-300"><strong>IT6-IT8:</strong> Ajustements industriels standard</p>
                <p className="text-slate-300"><strong>IT9-IT11:</strong> Ajustements grossiers</p>
                <p className="text-slate-300"><strong>IT12+:</strong> Tolérances larges</p>
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-semibold mb-3">Types d'Ajustements</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300"><strong>H7-g6:</strong> Mouvement libre</p>
                <p className="text-slate-300"><strong>H7-h6:</strong> Glissement léger</p>
                <p className="text-slate-300"><strong>H7-k6:</strong> Ajustement moyen</p>
                <p className="text-slate-300"><strong>H7-p6:</strong> Serrage permanent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}