import { useState, useEffect, useMemo } from 'react'
import { Play, Pause, RotateCcw, Gauge, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ChronographSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [precision, setPrecision] = useState(0.2) // 1/5 seconde
  const [clutchType, setClutchType] = useState('vertical')
  const [cycles, setCycles] = useState(0)
  const [lubrication, setLubrication] = useState(0.85)

  // Calculs de performance
  const results = useMemo(() => {
    const precisionFraction = 1 / precision
    
    // Dérive selon type d'embrayage
    const clutchDrift = {
      'vertical': 0.02,
      'column': 0.01,
      'horizontal': 0.03
    }[clutchType] || 0.02
    
    // Usure selon cycles et lubrification
    const wearFactor = (cycles / 1000) * (1 - lubrication)
    const effectiveDrift = clutchDrift + wearFactor
    
    // Précision moyenne sur 24h
    const dailyPrecision = effectiveDrift * 86400 / precision
    
    // Recommandations lubrification
    const lubricationStatus = lubrication >= 0.85 ? 'Excellente' : 
                             lubrication >= 0.75 ? 'Bonne' :
                             lubrication >= 0.65 ? 'À surveiller' : 'Maintenance requise'
    
    // Durée de vie estimée
    const remainingCycles = Math.max(0, 10000 - cycles)
    const lifeExpectancy = (remainingCycles / 1000) * 100
    
    return {
      precisionFraction: precisionFraction.toFixed(0),
      effectiveDrift: effectiveDrift.toFixed(4),
      dailyPrecision: dailyPrecision.toFixed(2),
      lubricationStatus,
      remainingCycles,
      lifeExpectancy: lifeExpectancy.toFixed(0),
      clutchName: {
        'vertical': 'Embrayage Vertical',
        'column': 'Embrayage à Colonnes',
        'horizontal': 'Embrayage Horizontal'
      }[clutchType]
    }
  }, [precision, clutchType, cycles, lubrication])

  // Données graphique usure
  const wearData = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => ({
      cycles: i * 1000,
      precision: 0.02 + (i * 0.001 * (1 - lubrication))
    }))
  }, [lubrication])

  // Simulateur chronographe
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + precision)
      }, precision * 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, precision])

  const handleStart = () => {
    setIsRunning(true)
    if (time === 0) {
      setCycles(prev => prev + 1)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setCycles(prev => prev + 1)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const fraction = ((seconds % 1) / precision).toFixed(0)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${fraction}`
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_chronograph_simulator.png" alt="Chronographe" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Simulateur de Chronographe Avancé</h2>
          <p className="text-slate-400">Mesures haute précision avec analyse d'usure et optimisation</p>
        </div>
      </div>

      {/* Affichage chronographe */}
      <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
        <div className="text-center mb-6">
          <div className="text-7xl font-bold font-mono text-white mb-2">{formatTime(time)}</div>
          <div className="text-sm text-slate-400">Précision: 1/{results.precisionFraction} seconde</div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold transition-all flex items-center gap-2"
          >
            <Play size={20} />
            Démarrer
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold transition-all flex items-center gap-2"
          >
            <Pause size={20} />
            Arrêter
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Remise à zéro
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Cycles Effectués</h3>
          </div>
          <div className="text-3xl font-bold text-white">{cycles}</div>
          <div className="text-xs text-slate-500 mt-1">sur 10,000 max</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Dérive Embrayage</h3>
          <div className="text-3xl font-bold text-white">{results.effectiveDrift} s</div>
          <div className="text-xs text-slate-500 mt-1">Par activation</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Précision 24h</h3>
          <div className="text-3xl font-bold text-white">±{results.dailyPrecision} s</div>
          <div className="text-xs text-slate-500 mt-1">Estimation</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="text-green-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Lubrification</h3>
          </div>
          <div className="text-2xl font-bold text-white">{results.lubricationStatus}</div>
          <div className="text-xs text-slate-500 mt-1">{(lubrication * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* Graphique usure */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Évolution de la Précision (Usure)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={wearData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="cycles" 
              stroke="#94a3b8" 
              label={{ value: 'Cycles', fill: '#94a3b8' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <YAxis stroke="#94a3b8" label={{ value: 'Dérive (s)', angle: -90, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="precision" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Paramètres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres du Chronographe</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Précision: 1/{(1/precision).toFixed(0)} seconde ({precision}s)
              </label>
              <input
                type="range"
                min="0.1"
                max="0.2"
                step="0.025"
                value={precision}
                onChange={(e) => setPrecision(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1/10 s</span>
                <span>1/8 s</span>
                <span>1/5 s</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Type d'Embrayage</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vertical', name: 'Vertical' },
                  { id: 'column', name: 'Colonnes' },
                  { id: 'horizontal', name: 'Horizontal' },
                ].map(({ id, name }) => (
                  <button
                    key={id}
                    onClick={() => setClutchType(id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      clutchType === id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Lubrification: {(lubrication * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={lubrication}
                onChange={(e) => setLubrication(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Usée</span>
                <span>Optimale</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Embrayage Actuel</h3>
            <div className="p-4 bg-slate-900/50 rounded-lg text-center">
              <div className="text-xl font-bold text-white mb-2">{results.clutchName}</div>
              <div className="text-sm text-slate-400">
                {clutchType === 'vertical' && 'Moderne, rapide, précis'}
                {clutchType === 'column' && 'Haute horlogerie, précision maximale'}
                {clutchType === 'horizontal' && 'Traditionnel, robuste'}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Durée de Vie</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>Cycles restants</span>
                <span>{results.remainingCycles.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all"
                  style={{ width: `${results.lifeExpectancy}%` }}
                />
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Maintenance recommandée tous les 5,000 cycles
            </div>
          </div>

          <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Recommandations</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {lubrication < 0.75 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Relubrification nécessaire
                </li>
              )}
              {cycles > 5000 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Inspection recommandée
                </li>
              )}
              {clutchType === 'horizontal' && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Considérer embrayage vertical pour meilleure précision
                </li>
              )}
              {results.effectiveDrift > 0.05 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">→</span>
                  Dérive élevée - vérifier alignement
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
