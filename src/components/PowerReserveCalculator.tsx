import { useState, useMemo } from 'react'
import { Battery, Activity, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function PowerReserveCalculator() {
  const [springParams, setSpringParams] = useState({
    k: 0.5, // Coefficient élastique
    x0: 10, // Longueur maximale (tours)
    x: 2,   // Longueur actuelle
    quality: 0.7, // Qualité spiral (0.4-0.8)
    lubrication: 0.85, // Efficacité lubrification (0.7-1.0)
    frequency: 28800, // A/h
  })

  const [usage, setUsage] = useState({
    activity: 'bureau', // sport, bureau, repos
    complications: false,
  })

  // Calculs physiques: E = ½k(x₀² - x²)
  const results = useMemo(() => {
    const { k, x0, x, quality, lubrication, frequency } = springParams
    
    // Énergie potentielle du ressort (formule simplifiée)
    const energy = 0.5 * k * (x0 * x0 - x * x)
    
    // Consommation par heure (dépend de la fréquence)
    const baseConsumption = (frequency / 28800) * 0.1 // Normalisé à 28,800 A/h
    
    // Facteurs de correction
    const qualityFactor = quality
    const lubricationFactor = lubrication
    const usageFactor = usage.activity === 'sport' ? 1.2 : usage.activity === 'repos' ? 0.8 : 1.0
    const complicationPenalty = usage.complications ? 1.15 : 1.0
    
    // Consommation effective
    const effectiveConsumption = baseConsumption * usageFactor * complicationPenalty / (qualityFactor * lubricationFactor)
    
    // Réserve de marche en heures
    const powerReserve = energy / effectiveConsumption
    
    // Recommandations
    const recommendations = []
    if (quality < 0.6) recommendations.push('Améliorer la qualité du spiral')
    if (lubrication < 0.8) recommendations.push('Optimiser la lubrification')
    if (powerReserve < 38) recommendations.push('Augmenter la longueur du ressort')
    if (frequency > 36000) recommendations.push('Considérer une fréquence plus basse')
    
    return {
      energy: energy.toFixed(2),
      powerReserve: powerReserve.toFixed(1),
      effectiveConsumption: effectiveConsumption.toFixed(4),
      recommendations,
      efficiency: (qualityFactor * lubricationFactor * 100).toFixed(0)
    }
  }, [springParams, usage])

  // Données pour le graphique de décharge
  const dischargeData = useMemo(() => {
    const hours = parseFloat(results.powerReserve)
    return Array.from({ length: Math.ceil(hours) + 1 }, (_, i) => ({
      heure: i,
      reserve: Math.max(0, 100 - (i / hours * 100))
    }))
  }, [results.powerReserve])

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_power_reserve.png" alt="Réserve" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Calculateur de Réserve de Marche</h2>
          <p className="text-slate-400">Calculs physiques précis avec optimisation selon usage</p>
        </div>
      </div>

      {/* Résultats principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-green-400" />
            <h3 className="text-sm font-medium text-green-400">Réserve de Marche</h3>
          </div>
          <div className="text-4xl font-bold text-white">{results.powerReserve}h</div>
          <div className="text-xs text-slate-400 mt-1">{(parseFloat(results.powerReserve) / 24).toFixed(1)} jours</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Énergie Stockée</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.energy} J</div>
          <div className="text-xs text-slate-500 mt-1">E = ½k(x₀² - x²)</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="text-indigo-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Efficacité</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.efficiency}%</div>
          <div className="text-xs text-slate-500 mt-1">Qualité × Lubrification</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Consommation</h3>
          <div className="text-2xl font-bold text-white">{results.effectiveConsumption}</div>
          <div className="text-xs text-slate-500 mt-1">J/h effective</div>
        </div>
      </div>

      {/* Graphique de décharge */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Courbe de Décharge du Ressort</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dischargeData}>
            <defs>
              <linearGradient id="colorReserve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="heure" stroke="#94a3b8" label={{ value: 'Heures', fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" label={{ value: 'Réserve (%)', angle: -90, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="reserve" stroke="#10b981" fillOpacity={1} fill="url(#colorReserve)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Paramètres du ressort */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres du Ressort</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Coefficient élastique (k): {springParams.k.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.1"
                value={springParams.k}
                onChange={(e) => setSpringParams(prev => ({ ...prev, k: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Longueur max (x₀): {springParams.x0.toFixed(0)} tours
              </label>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={springParams.x0}
                onChange={(e) => setSpringParams(prev => ({ ...prev, x0: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Longueur actuelle (x): {springParams.x.toFixed(0)} tours
              </label>
              <input
                type="range"
                min="0"
                max={springParams.x0}
                step="1"
                value={springParams.x}
                onChange={(e) => setSpringParams(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Fréquence: {springParams.frequency.toLocaleString()} A/h
              </label>
              <input
                type="range"
                min="18000"
                max="36000"
                step="1800"
                value={springParams.frequency}
                onChange={(e) => setSpringParams(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Qualité & Lubrification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Qualité du spiral: {(springParams.quality * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.4"
                  max="0.8"
                  step="0.05"
                  value={springParams.quality}
                  onChange={(e) => setSpringParams(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Standard</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Lubrification: {(springParams.lubrication * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.7"
                  max="1.0"
                  step="0.05"
                  value={springParams.lubrication}
                  onChange={(e) => setSpringParams(prev => ({ ...prev, lubrication: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Usée</span>
                  <span>Optimale</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Profil d'Usage</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                {['sport', 'bureau', 'repos'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setUsage(prev => ({ ...prev, activity: type }))}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      usage.activity === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={usage.complications}
                  onChange={(e) => setUsage(prev => ({ ...prev, complications: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-300">Complications activées (+15% consommation)</span>
              </label>
            </div>
          </div>

          {results.recommendations.length > 0 && (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h3 className="text-lg font-semibold text-amber-400 mb-3">Recommandations</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {results.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">→</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
