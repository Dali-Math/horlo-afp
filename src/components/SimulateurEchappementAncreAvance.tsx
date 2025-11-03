import { useState, useMemo } from 'react'
import { Cog, Target, Zap, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

export default function SimulateurEchappementAncreAvance() {
  const [frequency, setFrequency] = useState(4.0) // Hz
  const [balanceRadius, setBalanceRadius] = useState(13) // mm
  const [anchorSize, setAnchorSize] = useState(7) // mm
  const [palletSize, setPalletSize] = useState(2.5) // mm
  const [liftAngle, setLiftAngle] = useState(52) // degrés
  const [impulseAngle, setImpulseAngle] = useState(7) // degrés
  const [dropTime, setDropTime] = useState(0.0008) // ms
  const [friction, setFriction] = useState(0.3) // coefficient

  const escapementAnalysis = useMemo(() => {
    const freqHz = frequency
    const period = 1 / freqHz // période totale en secondes
    const halfPeriod = period / 2 // demi-période (un battement)
    
    // Géométrie de l'échappement
    const pitchCircleRadius = balanceRadius * 0.6 // rayon du cercle primitif
    const anchorPitchRadius = pitchCircleRadius * 0.85 // rayon d'action de l'ancre
    const palletCenterDistance = palletSize * 3 // distance entre centres des palettes
    
    // Analyse cinématique
    const wheelTeeth = 15 // nombre de dents de la roue d'échappement
    const wheelPitch = (2 * Math.PI * pitchCircleRadius) / wheelTeeth
    const angularVelocity = (2 * Math.PI * freqHz) / 2 // vitesse angulaire de la balance
    
    // Temps de chute et impulsion
    const totalCycleTime = halfPeriod * 1000 // ms
    const dropAngle = 2.5 // degrés de chute typique
    const impulseDuration = (impulseAngle / 360) * totalCycleTime
    const dropDuration = dropTime * 1000 // conversion en ms
    
    // Calcul des angles d'engagement
    const approachAngle = liftAngle - impulseAngle // angle d'approche
    const lockAngle = 1.5 // angle de verrouillage typique
    const escapeAngle = wheelTeeth > 15 ? 10 : 12 // angle de libération
    
    // Énergie transmise
    const balanceMass = Math.PI * (balanceRadius**2) * 0.3 * 7.85 // mg (balance circulaire)
    const angularMomentum = balanceMass * (balanceRadius/2)**2 * angularVelocity
    const impulseEnergy = angularMomentum * (impulseAngle * Math.PI / 180) * 0.85 // facteur d'efficacité
    
    // Analyse des pertes
    const frictionLoss = friction * 0.1 // pertes par friction
    const escapeLoss = (escapeAngle / 360) * angularMomentum // pertes par évasion
    const totalLoss = frictionLoss + escapeLoss
    const efficiency = ((impulseEnergy - totalLoss) / impulseEnergy) * 100
    
    // Stabilité de l'échappement
    const stabilityIndex = Math.max(0, 100 - (Math.abs(liftAngle - 50) * 2 + Math.abs(impulseAngle - 7) * 3))
    
    // Résonance et synchronisation
    const resonanceFactor = (1 / Math.abs(1 - (frequency / 3.6))) // facteur de résonance
    const synchronization = Math.max(0, 95 - (resonanceFactor - 1) * 20)
    
    // Fonctionnement par position
    const positionEfficiency = {
      'Crown_Up': efficiency,
      'Crown_Down': efficiency * 0.98,
      'Face_Up': efficiency * 1.02,
      'Face_Down': efficiency * 0.96,
      'Side': efficiency * 0.99
    }
    
    return {
      period: period * 1000,
      halfPeriod: halfPeriod * 1000,
      pitchCircleRadius,
      anchorPitchRadius,
      palletCenterDistance,
      angularVelocity,
      wheelPitch,
      impulseDuration,
      dropDuration,
      approachAngle,
      lockAngle,
      escapeAngle,
      balanceMass,
      angularMomentum,
      impulseEnergy,
      frictionLoss,
      escapeLoss,
      totalLoss,
      efficiency,
      stabilityIndex,
      resonanceFactor,
      synchronization,
      positionEfficiency,
      wheelTeeth
    }
  }, [frequency, balanceRadius, anchorSize, palletSize, liftAngle, impulseAngle, dropTime, friction])

  const kinematicAnalysis = useMemo(() => {
    const data = []
    const steps = 50
    
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 360 // degrés
      
      // Fonction de l'angle de la balance
      const balanceAngle = angle % 360
      const anchorAngle = (balanceAngle * 0.6) % 360 // mouvement de l'ancre
      const palletEngagement = Math.max(0, Math.sin((angle - 10) * Math.PI / 180)) // engagement des palettes
      
      // Force d'impulsion
      const impulseForce = palletEngagement > 0.8 ? impulseAngle * Math.sin(angle * Math.PI / 180) : 0
      
      // Friction
      const frictionForce = friction * 0.05 * Math.cos(angle * Math.PI / 180)
      
      // Position des dents
      const toothPosition = (angle * escapementAnalysis.wheelTeeth) / 360
      const activeTooth = Math.floor(toothPosition) % escapementAnalysis.wheelTeeth
      
      data.push({
        angle: angle,
        balanceAngle: balanceAngle,
        anchorAngle: anchorAngle,
        palletEngagement: palletEngagement,
        impulseForce: impulseForce,
        frictionForce: frictionForce,
        activeTooth: activeTooth,
        efficiency: Math.max(0, impulseForce - frictionForce)
      })
    }
    
    return data
  }, [frequency, liftAngle, impulseAngle, friction, escapementAnalysis.wheelTeeth])

  const performanceMetrics = useMemo(() => {
    // Analyse des performances globales
    const metrics = {
      energyTransfer: Math.min(100, escapementAnalysis.efficiency + 10),
      timingAccuracy: Math.min(100, 100 - (Math.abs(frequency - 4) * 5 + Math.abs(liftAngle - 52) * 0.5)),
      wearResistance: Math.max(0, 100 - (friction * 50 + (dropTime * 10000))),
      maintenanceNeed: Math.max(0, 100 - (escapementAnalysis.efficiency * 0.8 + escapementAnalysis.stabilityIndex * 0.6)),
      overallRating: 0
    }
    
    // Note globale pondérée
    metrics.overallRating = (
      metrics.energyTransfer * 0.25 +
      metrics.timingAccuracy * 0.25 +
      metrics.wearResistance * 0.20 +
      (100 - metrics.maintenanceNeed) * 0.20 +
      escapementAnalysis.synchronization * 0.10
    )
    
    return metrics
  }, [frequency, liftAngle, impulseAngle, friction, dropTime, escapementAnalysis])

  const optimizationRecommendations = useMemo(() => {
    const recommendations = []
    
    // Optimisation de l'angle de levée
    if (Math.abs(liftAngle - 52) > 3) {
      recommendations.push({
        type: 'geometry',
        priority: 'high',
        title: 'Optimisation de l\'Angle de Levée',
        message: `Angle actuel: ${liftAngle}°. Recommandé: 52° ± 2° pour une efficacité optimale.`,
        impact: 'Amélioration de 15% de l\'efficacité globale'
      })
    }
    
    // Optimisation de l'angle d'impulsion
    if (Math.abs(impulseAngle - 7) > 2) {
      recommendations.push({
        type: 'energy',
        priority: 'high',
        title: 'Optimisation de l\'Angle d\'Impulsion',
        message: `Angle actuel: ${impulseAngle}°. Recommandé: 7° pour un transfert d'énergie maximal.`,
        impact: 'Réduction de 20% des pertes énergétiques'
      })
    }
    
    // Analyse de la friction
    if (friction > 0.5) {
      recommendations.push({
        type: 'maintenance',
        priority: 'medium',
        title: 'Réduction de la Friction',
        message: `Coefficient de friction actuel: ${friction}. Recommandé: < 0.3 pour une longue durée de vie.`,
        impact: 'Amélioration de 25% de la durée de vie'
      })
    }
    
    // Analyse du temps de chute
    if (dropTime > 0.001) {
      recommendations.push({
        type: 'timing',
        priority: 'medium',
        title: 'Optimisation du Temps de Chute',
        message: `Temps de chute actuel: ${(dropTime * 1000).toFixed(2)} ms. Recommandé: 0.6-0.8 ms.`,
        impact: 'Amélioration de 10% de la précision chronométrique'
      })
    }
    
    return recommendations
  }, [liftAngle, impulseAngle, friction, dropTime])

  const getRecommendationColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-900/20'
      case 'medium': return 'border-yellow-500 bg-yellow-900/20'
      case 'low': return 'border-blue-500 bg-blue-900/20'
      default: return 'border-slate-500 bg-slate-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Cog className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Simulateur d'Échappement Ancre Avancé</h1>
              <p className="text-slate-400">Simulation complète du comportement et optimisation de l'échappement à ancre</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Fréquence
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fréquence (Hz)</label>
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  min="1"
                  max="10"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-slate-400 mt-1">
                  = {(frequency * 3600).toFixed(0)} vph
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cog className="w-5 h-5" />
              Géométrie
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rayon Balance (mm)</label>
                <input
                  type="number"
                  value={balanceRadius}
                  onChange={(e) => setBalanceRadius(Number(e.target.value))}
                  min="10"
                  max="20"
                  step="0.5"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Taille Ancre (mm)</label>
                <input
                  type="number"
                  value={anchorSize}
                  onChange={(e) => setAnchorSize(Number(e.target.value))}
                  min="5"
                  max="12"
                  step="0.5"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Taille Palettes (mm)</label>
                <input
                  type="number"
                  value={palletSize}
                  onChange={(e) => setPalletSize(Number(e.target.value))}
                  min="2"
                  max="4"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Angles
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Angle de Levée (°)</label>
                <input
                  type="number"
                  value={liftAngle}
                  onChange={(e) => setLiftAngle(Number(e.target.value))}
                  min="45"
                  max="60"
                  step="1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Angle d'Impulsion (°)</label>
                <input
                  type="number"
                  value={impulseAngle}
                  onChange={(e) => setImpulseAngle(Number(e.target.value))}
                  min="5"
                  max="12"
                  step="0.5"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Paramètres
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Temps de Chute (ms)</label>
                <input
                  type="number"
                  value={dropTime * 1000}
                  onChange={(e) => setDropTime(Number(e.target.value) / 1000)}
                  min="0.4"
                  max="1.5"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Coefficient Friction</label>
                <input
                  type="number"
                  value={friction}
                  onChange={(e) => setFriction(Number(e.target.value))}
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Efficacité</h3>
            <div className="text-3xl font-bold text-green-400">
              {performanceMetrics.energyTransfer.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Transfert d'Énergie</div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Précision</h3>
            <div className="text-3xl font-bold text-blue-400">
              {performanceMetrics.timingAccuracy.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Exactitude Timing</div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Usure</h3>
            <div className="text-3xl font-bold text-purple-400">
              {performanceMetrics.wearResistance.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Résistance Usure</div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Synchronisation</h3>
            <div className="text-3xl font-bold text-amber-400">
              {escapementAnalysis.synchronization.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Facteur Résonance</div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Note Globale</h3>
            <div className="text-3xl font-bold text-cyan-400">
              {performanceMetrics.overallRating.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Performance Totale</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Kinematic Analysis */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Analyse Cinématique</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kinematicAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="angle" 
                  stroke="#94a3b8"
                  label={{ value: 'Angle Balance (°)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="palletEngagement" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Engagement Palettes"
                />
                <Line 
                  type="monotone" 
                  dataKey="impulseForce" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Force Impulsion"
                />
                <Line 
                  type="monotone" 
                  dataKey="frictionForce" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Force Friction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Efficiency Analysis */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Efficacité par Position</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={Object.entries(escapementAnalysis.positionEfficiency).map(([key, value]) => ({ position: key, efficiency: value }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="position" />
                <PolarRadiusAxis domain={[90, 100]} />
                <Radar
                  name="Efficacité"
                  dataKey="efficiency"
                  stroke="#10b981"
                  fill="rgba(16, 185, 129, 0.3)"
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Paramètres Cinématiques</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Période Totale:</span>
                <span className="text-amber-400 font-semibold">{escapementAnalysis.period.toFixed(2)} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Vitesse Angulaire:</span>
                <span className="text-amber-400 font-semibold">{(escapementAnalysis.angularVelocity * 1000).toFixed(1)} rad/s</span>
              </div>
              <div className="flex justify-between">
                <span>Angle d'Approche:</span>
                <span className="text-amber-400 font-semibold">{escapementAnalysis.approachAngle.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span>Angle de Verrouillage:</span>
                <span className="text-amber-400 font-semibold">{escapementAnalysis.lockAngle.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span>Angle d'Évasion:</span>
                <span className="text-amber-400 font-semibold">{escapementAnalysis.escapeAngle.toFixed(1)}°</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Analyse Énergétique</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Masse Balance:</span>
                <span className="text-blue-400 font-semibold">{escapementAnalysis.balanceMass.toFixed(1)} mg</span>
              </div>
              <div className="flex justify-between">
                <span>Moment Angulaire:</span>
                <span className="text-blue-400 font-semibold">{(escapementAnalysis.angularMomentum / 1000).toFixed(2)} kg·mm²/s</span>
              </div>
              <div className="flex justify-between">
                <span>Énergie Impulsion:</span>
                <span className="text-green-400 font-semibold">{(escapementAnalysis.impulseEnergy / 1000).toFixed(2)} J</span>
              </div>
              <div className="flex justify-between">
                <span>Pertes Friction:</span>
                <span className="text-red-400 font-semibold">{(escapementAnalysis.frictionLoss * 1000).toFixed(2)} mJ</span>
              </div>
              <div className="flex justify-between">
                <span>Pertes Évasion:</span>
                <span className="text-red-400 font-semibold">{(escapementAnalysis.escapeLoss / 1000).toFixed(2)} mJ</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Efficacité Globale:</span>
                <span className="text-green-400 font-semibold">{escapementAnalysis.efficiency.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Stabilité Index:</span>
                <span className="text-purple-400 font-semibold">{escapementAnalysis.stabilityIndex.toFixed(1)}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Durée Impulsion:</span>
                <span className="text-cyan-400 font-semibold">{escapementAnalysis.impulseDuration.toFixed(2)} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Durée Chute:</span>
                <span className="text-orange-400 font-semibold">{escapementAnalysis.dropDuration.toFixed(2)} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Facteur Résonance:</span>
                <span className="text-yellow-400 font-semibold">{escapementAnalysis.resonanceFactor.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Recommandations d'Optimisation
          </h3>
          {optimizationRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {optimizationRecommendations.map((rec, index) => (
                <div key={index} className={`p-4 border rounded-lg ${getRecommendationColor(rec.priority)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <h4 className="font-semibold">{rec.title}</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{rec.message}</p>
                  <div className="text-xs text-amber-400 font-medium">
                    Impact: {rec.impact}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">Échappement Optimisé !</h4>
              <p className="text-slate-400">Tous les paramètres sont dans les plages optimales recommandées.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}