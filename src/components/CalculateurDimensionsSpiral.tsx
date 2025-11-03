import { useState, useMemo } from 'react'
import { Ruler, Settings, Calculator, Target, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts'

export default function CalculateurDimensionsSpiral() {
  const [targetFrequency, setTargetFrequency] = useState(4.0) // Hz
  const [diameter, setDiameter] = useState(26) // mm
  const [temperatureRange, setTemperatureRange] = useState({ min: 0, max: 40 })
  const [spiralMaterial, setSpiralMaterial] = useState('Nivarox')
  const [momentInertia, setMomentInertia] = useState(0.5) // mg·mm²
  const [safetyFactor, setSafetyFactor] = useState(1.3)

  const calculations = useMemo(() => {
    // Constantes du mouvement
    const frequencyHz = targetFrequency
    const frequencyVph = frequencyHz * 3600 // vibrations per hour
    const period = 1 / frequencyHz // période en secondes
    const halfPeriod = period / 2 // demi-période (battement)
    
    // Calcul du moment d'inertie total (roue, Balance, spiral)
    const balanceWheelDiameter = diameter * 0.6 // mm
    const balanceWheelThickness = 0.3 // mm
    const balanceWheelMass = Math.PI * (balanceWheelDiameter/2)**2 * balanceWheelThickness * 7.85 // mg (acier)
    
    const spiralDiameter = diameter * 0.8 // mm
    const spiralThickness = 0.025 // mm
    const spiralMass = Math.PI * (spiralDiameter/2)**2 * spiralThickness * 7.85 // mg
    
    const totalInertia = balanceWheelMass + spiralMass + momentInertia
    
    // Calcul de la longueur du spiral selon la formule de Thury
    const k = 1.75 // Coefficient empirique pour spiral cylindrique
    
    // Moment de couple du spiral
    const torqueConstant = Math.PI * (spiralThickness**3) / (12 * spiralDiameter) // mm³
    const shearModulus = 80000 // N/mm² (module de cisaillement du Nivarox)
    const momentCouple = torqueConstant * shearModulus
    
    // Fréquence d'oscillation (formule de Horologerie)
    // f = (1/(2π)) * sqrt(M_couple / J_inertie)
    // donc L = k * sqrt(J_inertie / M_couple) * (2πf)
    
    const angularFreq = 2 * Math.PI * frequencyHz
    const spiralLength = k * Math.sqrt(totalInertia / momentCouple) * angularFreq
    
    // Calcul du nombre de spires
    const meanDiameter = spiralDiameter * 0.95 // mm (diamètre moyen)
    const circumference = Math.PI * meanDiameter
    const numberOfCoils = Math.max(6, Math.min(18, Math.ceil(spiralLength / (2 * circumference))))
    
    // Pas du spiral
    const pitch = spiralThickness * 1.5 // mm (facteur de sécurité pour l'espacement)
    
    // Épaisseur et largeur optimales selon le matériau
    const materialFactors = {
      'Nivarox': { thickness: 0.025, stability: 100 },
      'Elinvar': { thickness: 0.030, stability: 95 },
      'Bimetallique': { thickness: 0.035, stability: 80 },
      'Silicium': { thickness: 0.020, stability: 120 }
    }
    
    const materialData = materialFactors[spiralMaterial as keyof typeof materialFactors]
    const optimizedThickness = materialData.thickness
    const optimizedWidth = optimizedThickness * 6 // rapport largeur/épaisseur typique
    
    // Corrections thermiques
    const tempCoefficients = {
      'Nivarox': -0.4,
      'Elinvar': -0.3,
      'Bimetallique': -0.8,
      'Silicium': -0.1
    }
    const thermalCoeff = tempCoefficients[spiralMaterial as keyof typeof tempCoefficients]
    
    const thermalStability = {
      min: Math.abs(thermalCoeff * (temperatureRange.min - 20)),
      max: Math.abs(thermalCoeff * (temperatureRange.max - 20)),
      range: Math.abs(thermalCoeff * (temperatureRange.max - temperatureRange.min))
    }
    
    return {
      frequencyHz,
      frequencyVph,
      period: period * 1000, // ms
      halfPeriod: halfPeriod * 1000, // ms
      spiralLength: spiralLength * safetyFactor,
      numberOfCoils,
      pitch,
      optimizedThickness,
      optimizedWidth,
      spiralDiameter,
      meanDiameter,
      totalInertia,
      momentCouple,
      balanceWheelMass,
      spiralMass,
      thermalStability,
      thermalCoeff,
      materialStability: materialData.stability,
      circumference
    }
  }, [targetFrequency, diameter, spiralMaterial, momentInertia, safetyFactor, temperatureRange])

  const toleranceAnalysis = useMemo(() => {
    const toleranceRange = [
      { tolerance: -20, effect: 'Mauvaise régulation', spiralLength: calculations.spiralLength * 0.95 },
      { tolerance: -10, effect: 'Légère instabilité', spiralLength: calculations.spiralLength * 0.98 },
      { tolerance: 0, effect: 'Réglage optimal', spiralLength: calculations.spiralLength },
      { tolerance: 10, effect: 'Légère instabilité', spiralLength: calculations.spiralLength * 1.02 },
      { tolerance: 20, effect: 'Mauvaise régulation', spiralLength: calculations.spiralLength * 1.05 }
    ]
    
    return toleranceRange
  }, [calculations.spiralLength])

  const qualityFactors = useMemo(() => {
    // Analyse de la qualité du spiral conçu
    const factors = {
      lengthToDiameterRatio: calculations.spiralLength / calculations.spiralDiameter,
      thicknessQuality: 0.025 <= calculations.optimizedThickness && calculations.optimizedThickness <= 0.035 ? 'Excellent' : 'À vérifier',
      coilQuality: calculations.numberOfCoils >= 8 && calculations.numberOfCoils <= 14 ? 'Optimal' : 'Suboptimal',
      stabilityQuality: calculations.thermalStability.range <= 2 ? 'Excellent' : 'Acceptable'
    }
    
    return factors
  }, [calculations])

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Calculateur de Dimensions du Spiral</h1>
              <p className="text-slate-400">Calculs précis des dimensions et caractéristiques pour l'optimisation du spiral</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Fréquence Cible
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fréquence (Hz)</label>
                <input
                  type="number"
                  value={targetFrequency}
                  onChange={(e) => setTargetFrequency(Number(e.target.value))}
                  min="1"
                  max="10"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-slate-400 mt-1">
                  = {(targetFrequency * 3600).toFixed(0)} vibrations/heure
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Facteur de Sécurité</label>
                <input
                  type="number"
                  value={safetyFactor}
                  onChange={(e) => setSafetyFactor(Number(e.target.value))}
                  min="1.0"
                  max="2.0"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Géométrie
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Diamètre Mouvement (mm)</label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(Number(e.target.value))}
                  min="15"
                  max="40"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Moment Inertie (mg·mm²)</label>
                <input
                  type="number"
                  value={momentInertia}
                  onChange={(e) => setMomentInertia(Number(e.target.value))}
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Matériau
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type de Spiral</label>
                <select
                  value={spiralMaterial}
                  onChange={(e) => setSpiralMaterial(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                >
                  <option value="Nivarox">Nivarox (Standard)</option>
                  <option value="Elinvar">Elinvar (Stable)</option>
                  <option value="Bimetallique">Bimetallique (Economique)</option>
                  <option value="Silicium">Silicium (Avancé)</option>
                </select>
              </div>
              <div className="bg-slate-700 p-3 rounded">
                <div className="flex justify-between text-sm">
                  <span>Stabilité:</span>
                  <span className="text-amber-400">{calculations.materialStability}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Conditions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Température Min (°C)</label>
                <input
                  type="number"
                  value={temperatureRange.min}
                  onChange={(e) => setTemperatureRange(prev => ({...prev, min: Number(e.target.value)}))}
                  min="-20"
                  max="10"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Température Max (°C)</label>
                <input
                  type="number"
                  value={temperatureRange.max}
                  onChange={(e) => setTemperatureRange(prev => ({...prev, max: Number(e.target.value)}))}
                  min="30"
                  max="60"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dimensions Calculées</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Longueur du Spiral:</span>
                <span className="text-amber-400 font-semibold">{calculations.spiralLength.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Nombre de Spires:</span>
                <span className="text-amber-400 font-semibold">{calculations.numberOfCoils}</span>
              </div>
              <div className="flex justify-between">
                <span>Pas du Spiral:</span>
                <span className="text-amber-400 font-semibold">{calculations.pitch.toFixed(3)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Diamètre Moyen:</span>
                <span className="text-amber-400 font-semibold">{calculations.meanDiameter.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Épaisseur Optimale:</span>
                <span className="text-amber-400 font-semibold">{calculations.optimizedThickness.toFixed(3)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Largeur Optimale:</span>
                <span className="text-amber-400 font-semibold">{calculations.optimizedWidth.toFixed(3)} mm</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Paramètres Dynamiques</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Période Oscillation:</span>
                <span className="text-blue-400 font-semibold">{calculations.period.toFixed(1)} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Période Battement:</span>
                <span className="text-blue-400 font-semibold">{calculations.halfPeriod.toFixed(1)} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Inertie Totale:</span>
                <span className="text-blue-400 font-semibold">{calculations.totalInertia.toFixed(1)} mg·mm²</span>
              </div>
              <div className="flex justify-between">
                <span>Moment de Couple:</span>
                <span className="text-blue-400 font-semibold">{(calculations.momentCouple / 1000).toFixed(2)} N·mm</span>
              </div>
              <div className="flex justify-between">
                <span>Masse Balance:</span>
                <span className="text-blue-400 font-semibold">{calculations.balanceWheelMass.toFixed(1)} mg</span>
              </div>
              <div className="flex justify-between">
                <span>Masse Spiral:</span>
                <span className="text-blue-400 font-semibold">{calculations.spiralMass.toFixed(1)} mg</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Stabilité Thermique</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Coefficient Thermique:</span>
                <span className="text-green-400 font-semibold">{calculations.thermalCoeff} s/jour/°C</span>
              </div>
              <div className="flex justify-between">
                <span>Stabilité Min:</span>
                <span className="text-green-400 font-semibold">{calculations.thermalStability.min.toFixed(1)} s/jour</span>
              </div>
              <div className="flex justify-between">
                <span>Stabilité Max:</span>
                <span className="text-green-400 font-semibold">{calculations.thermalStability.max.toFixed(1)} s/jour</span>
              </div>
              <div className="flex justify-between">
                <span>Variation Totale:</span>
                <span className="text-green-400 font-semibold">{calculations.thermalStability.range.toFixed(1)} s/jour</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-slate-700 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {(targetFrequency * 3600).toFixed(0)}
                </div>
                <div className="text-sm text-slate-400">vibrations/heure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spiral Geometry Visualization */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Géométrie du Spiral</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Spiral Calculé', value: calculations.spiralLength, color: '#3b82f6' },
                    { name: 'Facteur Sécurité', value: calculations.spiralLength * (safetyFactor - 1), color: '#ef4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <span className="text-slate-400">Circonférence moyenne:</span>
                <div className="font-semibold">{calculations.circumference.toFixed(2)} mm</div>
              </div>
              <div>
                <span className="text-slate-400">Rapport L/D:</span>
                <div className="font-semibold">{(calculations.spiralLength / calculations.spiralDiameter).toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Tolerance Analysis */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Analyse de Tolérance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={toleranceAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="tolerance" 
                  type="number" 
                  stroke="#94a3b8"
                  name="Tolérance (%)"
                />
                <YAxis 
                  dataKey="spiralLength" 
                  type="number" 
                  stroke="#94a3b8"
                  name="Longueur (mm)"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'spiralLength' ? `${value.toFixed(1)} mm` : `${value}%`, 
                    name === 'spiralLength' ? 'Longueur' : 'Tolérance'
                  ]}
                />
                <Scatter dataKey="spiralLength" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Analysis */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Analyse de Qualité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Rapport Longueur/Diamètre</h4>
              <div className="text-2xl font-bold text-amber-400">
                {qualityFactors.lengthToDiameterRatio.toFixed(2)}
              </div>
              <div className="text-sm text-slate-400">Optimal: 2.5-4.0</div>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Qualité Épaisseur</h4>
              <div className="text-2xl font-bold text-green-400">
                {qualityFactors.thicknessQuality}
              </div>
              <div className="text-sm text-slate-400">0.025-0.035mm</div>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Qualité Spires</h4>
              <div className="text-2xl font-bold text-green-400">
                {qualityFactors.coilQuality}
              </div>
              <div className="text-sm text-slate-400">8-14 spires</div>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Qualité Stabilité</h4>
              <div className="text-2xl font-bold text-green-400">
                {qualityFactors.stabilityQuality}
              </div>
              <div className="text-sm text-slate-400">&lt; 2s/jour</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}