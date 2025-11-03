import { useState, useMemo } from 'react'
import { Thermometer, TrendingUp, AlertTriangle, Target, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, ScatterChart, Scatter, BarChart, Bar } from 'recharts'

export default function SimulateurChronometrieThermique() {
  const [temperatureRange, setTemperatureRange] = useState({
    min: -10,
    max: 60
  })
  const [baseFrequency, setBaseFrequency] = useState(4.0) // Hz
  const [thermalCoefficient, setThermalCoefficient] = useState(-0.5) // sec/jour/°C
  const [spiralType, setSpiralType] = useState('Elinvar')
  const [testDuration, setTestDuration] = useState(15) // jours
  const [magneticResistance, setMagneticResistance] = useState(4800) // Gauss

  const thermalData = useMemo(() => {
    const data = []
    const step = 2
    
    for (let temp = temperatureRange.min; temp <= temperatureRange.max; temp += step) {
      // Correction thermique selon le coefficient
      const dailyDeviation = thermalCoefficient * (temp - 20) // seconds/day
      const cumulativeDeviation = dailyDeviation * testDuration
      
      // Coefficient de température selon le type de spiral
      const spiralCoefficients = {
        'Bimetallique': -0.6,
        'Elinvar': -0.3,
        'Silicium': -0.1,
        'Spiral Nivarox': -0.4,
        'Nivarox Avance': -0.2
      }
      const correctedCoeff = spiralCoefficients[spiralType as keyof typeof spiralCoefficients] || thermalCoefficient
      const correctedDeviation = correctedCoeff * (temp - 20) * testDuration
      
      // Fréquence corrigée
      const frequencyDeviation = (correctedDeviation / 86400) / testDuration // Hz
      const correctedFrequency = baseFrequency * (1 + frequencyDeviation / baseFrequency)
      const correctedVph = correctedFrequency * 3600
      
      // Stabilité chronométrique (inverse de la variation)
      const stability = Math.max(0, 100 - Math.abs(dailyDeviation))
      
      // Classification COSC
      const coscStatus = Math.abs(dailyDeviation) <= 4 ? 'CONFORME' : 
                        Math.abs(dailyDeviation) <= 10 ? 'ATTENTION' : 'NON-CONFORME'
      
      data.push({
        temperature: temp,
        dailyDeviation,
        cumulativeDeviation,
        correctedFrequency,
        correctedVph: Math.round(correctedVph),
        stability,
        coscStatus
      })
    }
    
    return data
  }, [temperatureRange, baseFrequency, thermalCoefficient, spiralType, testDuration])

  const magneticEffects = useMemo(() => {
    const magData: { temperature: number; deviation: number }[] = []
    const magneticTemperatures = [20, 30, 40, 50]
    
    magneticTemperatures.forEach(temp => {
      const baseDeviation = thermalCoefficient * (temp - 20)
      const magneticFactor = 1 + (magneticResistance / 48000) // Réduction magnétique
      const finalDeviation = baseDeviation * magneticFactor
      
      magData.push({
        temp,
        withoutMagnetic: baseDeviation,
        withMagnetic: finalDeviation,
        improvement: ((finalDeviation - baseDeviation) / Math.abs(baseDeviation)) * 100
      })
    })
    
    return magData
  }, [thermalCoefficient, magneticResistance])

  const optimizationSuggestions = useMemo(() => {
    const suggestions = []
    
    // Analyse de la stabilité thermique
    const maxDeviation = Math.max(...thermalData.map(d => Math.abs(d.dailyDeviation)))
    const avgStability = thermalData.reduce((sum, d) => sum + d.stability, 0) / thermalData.length
    
    if (maxDeviation > 6) {
      suggestions.push({
        type: 'critical',
        title: 'Optimisation Thermique Urgente',
        message: `Variation thermique de ${maxDeviation.toFixed(1)}s/jour détectée. Optimisation du spiral recommandée.`
      })
    }
    
    if (avgStability < 85) {
      suggestions.push({
        type: 'warning',
        title: 'Amélioration de la Stabilité',
        message: 'Stabilité thermique moyenne de ' + avgStability.toFixed(1) + '%. Envisagez un spiral en silicium.'
      })
    }
    
    // Recommandations selon le type de spiral
    if (spiralType === 'Bimetallique' && maxDeviation > 4) {
      suggestions.push({
        type: 'info',
        title: 'Alternative de Matériau',
        message: 'Le spiral bimetallique présente une grande variation thermique. Envisagez Elinvar ou Silicium.'
      })
    }
    
    return suggestions
  }, [thermalData, spiralType])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFORME': return 'text-green-400'
      case 'ATTENTION': return 'text-yellow-400'
      case 'NON-CONFORME': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-900/20'
      case 'warning': return 'border-yellow-500 bg-yellow-900/20'
      case 'info': return 'border-blue-500 bg-blue-900/20'
      default: return 'border-slate-500 bg-slate-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Thermometer className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Simulateur de Chronométrie Thermique</h1>
              <p className="text-slate-400">Analyse et optimisation de la stabilité chronométrique selon la température</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Paramètres de Test
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fréquence de Base (Hz)</label>
                <input
                  type="number"
                  value={baseFrequency}
                  onChange={(e) => setBaseFrequency(Number(e.target.value))}
                  min="1"
                  max="10"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Coefficient Thermique (s/jour/°C)</label>
                <input
                  type="number"
                  value={thermalCoefficient}
                  onChange={(e) => setThermalCoefficient(Number(e.target.value))}
                  min="-2"
                  max="2"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type de Spiral</label>
                <select
                  value={spiralType}
                  onChange={(e) => setSpiralType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                >
                  <option value="Bimetallique">Bimetallique</option>
                  <option value="Elinvar">Elinvar</option>
                  <option value="Silicium">Silicium</option>
                  <option value="Spiral Nivarox">Spiral Nivarox</option>
                  <option value="Nivarox Avance">Nivarox Avancé</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Plage de Température
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Température Minimale (°C)</label>
                <input
                  type="number"
                  value={temperatureRange.min}
                  onChange={(e) => setTemperatureRange(prev => ({...prev, min: Number(e.target.value)}))}
                  min="-30"
                  max="0"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Température Maximale (°C)</label>
                <input
                  type="number"
                  value={temperatureRange.max}
                  onChange={(e) => setTemperatureRange(prev => ({...prev, max: Number(e.target.value)}))}
                  min="20"
                  max="80"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Durée de Test (jours)</label>
                <input
                  type="number"
                  value={testDuration}
                  onChange={(e) => setTestDuration(Number(e.target.value))}
                  min="1"
                  max="30"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Résistance Magnétique
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Résistance (Gauss)</label>
                <input
                  type="number"
                  value={magneticResistance}
                  onChange={(e) => setMagneticResistance(Number(e.target.value))}
                  min="1000"
                  max="10000"
                  step="100"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-slate-400 mt-1">Résistance aux champs magnétiques</p>
              </div>
              <div className="bg-slate-700 p-3 rounded">
                <p className="text-sm">
                  <span className="text-amber-400">Protection:</span> {magneticResistance >= 4800 ? 'ISO 764' : 'Standard'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Thermal Deviation Chart */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Variation Chronométrique Thermique</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={thermalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="temperature" 
                  stroke="#94a3b8"
                  label={{ value: 'Température (°C)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  label={{ value: 'Variation (s/jour)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)} s/jour`, 
                    name === 'dailyDeviation' ? 'Variation Journalière' : 'Cumulée'
                  ]}
                />
                <ReferenceLine y={0} stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="2 2" />
                <ReferenceLine y={-4} stroke="#f59e0b" strokeDasharray="2 2" />
                <Line 
                  type="monotone" 
                  dataKey="dailyDeviation" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeDeviation" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span>Variation Journalière</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span>Variation Cumulée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-500 border-dashed"></div>
                <span>COSC (±4s)</span>
              </div>
            </div>
          </div>

          {/* Stability Chart */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Stabilité Chronométrique</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={thermalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="temperature" 
                  stroke="#94a3b8"
                  label={{ value: 'Température (°C)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  domain={[0, 100]}
                  label={{ value: 'Stabilité (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Stabilité']}
                />
                <ReferenceLine y={85} stroke="#10b981" strokeDasharray="2 2" />
                <Area
                  type="monotone"
                  dataKey="stability"
                  stroke="#10b981"
                  fill="rgba(16, 185, 129, 0.3)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Magnetic Effects and COSC Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Effets de la Protection Magnétique</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={magneticEffects}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="temp" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="withoutMagnetic" fill="#3b82f6" name="Sans Protection" />
                <Bar dataKey="withMagnetic" fill="#10b981" name="Avec Protection" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Certification COSC par Température</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {thermalData.filter((_, index) => index % 3 === 0).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                  <span className="font-medium">{item.temperature}°C</span>
                  <div className="text-right">
                    <div className="text-sm text-slate-300">{item.dailyDeviation.toFixed(2)} s/jour</div>
                    <div className={`text-sm font-semibold ${getStatusColor(item.coscStatus)}`}>
                      {item.coscStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Recommandations d'Optimisation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getSuggestionColor(suggestion.type)}`}>
                <h4 className="font-semibold mb-2">{suggestion.title}</h4>
                <p className="text-sm text-slate-300">{suggestion.message}</p>
              </div>
            ))}
          </div>
          
          {optimizationSuggestions.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">Excellent !</h4>
              <p className="text-slate-400">Votre mouvement présente une excellente stabilité thermique.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
