import { useState, useMemo } from 'react'
import { Radio, Activity, Zap } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function FrequencyCalculator() {
  const [frequency, setFrequency] = useState(28800) // A/h
  const [amplitude, setAmplitude] = useState(280) // degrés
  const [usage, setUsage] = useState('dress') // dress, sports, diving

  // Calculs physiques: T = 2π√(L/C)
  const results = useMemo(() => {
    const hz = frequency / 7200
    const period = 1 / hz // secondes
    
    // Précision selon COSC (formule simplifiée)
    const basePrecision = 4 / hz // s/j, meilleure à haute fréquence
    
    // Impact amplitude sur isochronisme
    const amplitudeFactor = amplitude < 250 ? 1.5 : amplitude > 300 ? 0.8 : 1.0
    const effectivePrecision = basePrecision * amplitudeFactor
    
    // Consommation énergétique (proportionnelle à la fréquence)
    const powerConsumption = (frequency / 28800) * 100 // %
    
    // Usure (plus haute fréquence = plus d'usure)
    const wearRate = (frequency / 28800) * 100 // %
    
    // Recommandation selon usage
    let recommendation = ''
    if (usage === 'dress') {
      recommendation = frequency >= 28800 ? 'Fréquence adaptée' : 'Considérer 28,800 A/h minimum'
    } else if (usage === 'sports') {
      recommendation = frequency >= 28800 ? 'Excellente précision pour sport' : 'Augmenter à 28,800+ A/h'
    } else if (usage === 'diving') {
      recommendation = frequency >= 28800 && amplitude >= 270 ? 'Optimal' : 'Privilégier haute fréquence + amplitude élevée'
    }
    
    // Standard de référence
    let standard = 'Personnalisé'
    if (frequency === 18000) standard = 'Basse fréquence (2.5 Hz)'
    else if (frequency === 21600) standard = 'Classique (3 Hz)'
    else if (frequency === 28800) standard = 'COSC Standard (4 Hz)'
    else if (frequency === 36000) standard = 'Haute fréquence (5 Hz)'
    else if (frequency === 72000) standard = 'Ultra-haute fréquence (10 Hz)'
    
    return {
      hz: hz.toFixed(2),
      period: period.toFixed(4),
      precision: effectivePrecision.toFixed(2),
      powerConsumption: powerConsumption.toFixed(0),
      wearRate: wearRate.toFixed(0),
      recommendation,
      standard,
      isochronism: amplitude >= 270 && amplitude <= 310 ? 'Excellent' : amplitude >= 250 ? 'Bon' : 'À améliorer'
    }
  }, [frequency, amplitude, usage])

  // Données pour oscilloscope
  const oscilloscopeData = useMemo(() => {
    const hz = frequency / 7200
    const points = 100
    return Array.from({ length: points }, (_, i) => ({
      temps: (i / points).toFixed(3),
      amplitude: Math.sin(2 * Math.PI * hz * (i / points) * 0.1) * (amplitude / 360)
    }))
  }, [frequency, amplitude])

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_frequency_lab.png" alt="Fréquences" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Calculateur de Fréquences et Oscillations</h2>
          <p className="text-slate-400">Optimisation fréquentielle avec calculs physiques précis</p>
        </div>
      </div>

      {/* Résultats principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="text-indigo-400" />
            <h3 className="text-sm font-medium text-indigo-400">Fréquence</h3>
          </div>
          <div className="text-4xl font-bold text-white">{results.hz} Hz</div>
          <div className="text-xs text-slate-400 mt-1">{frequency.toLocaleString()} A/h</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Période (T)</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.period} s</div>
          <div className="text-xs text-slate-500 mt-1">T = 1/f</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-green-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Précision</h3>
          </div>
          <div className="text-3xl font-bold text-white">±{results.precision} s/j</div>
          <div className="text-xs text-slate-500 mt-1">Estimation théorique</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Isochronisme</h3>
          <div className="text-2xl font-bold text-white">{results.isochronism}</div>
          <div className="text-xs text-slate-500 mt-1">Amplitude: {amplitude}°</div>
        </div>
      </div>

      {/* Oscilloscope */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Oscilloscope Virtuel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={oscilloscopeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="temps" stroke="#94a3b8" label={{ value: 'Temps (s)', fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" label={{ value: 'Amplitude', angle: -90, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="amplitude" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Paramètres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres de Fréquence</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Fréquence: {frequency.toLocaleString()} A/h ({(frequency / 7200).toFixed(1)} Hz)
              </label>
              <input
                type="range"
                min="18000"
                max="72000"
                step="1800"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>18k</span>
                <span>28.8k</span>
                <span>36k</span>
                <span>72k</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Amplitude: {amplitude}°
              </label>
              <input
                type="range"
                min="180"
                max="330"
                step="10"
                value={amplitude}
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>180°</span>
                <span>270°</span>
                <span>330°</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Usage prévu</label>
              <div className="flex gap-2">
                {[
                  { id: 'dress', name: 'Habillée' },
                  { id: 'sports', name: 'Sport' },
                  { id: 'diving', name: 'Plongée' },
                ].map(({ id, name }) => (
                  <button
                    key={id}
                    onClick={() => setUsage(id)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      usage === id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Standard Actuel</h3>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-2">{results.standard}</div>
              <div className="text-sm text-slate-400">{results.recommendation}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-400 mb-2">Consommation</h4>
              <div className="text-2xl font-bold text-white">{results.powerConsumption}%</div>
              <div className="text-xs text-slate-500 mt-1">vs 28,800 A/h</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-400 mb-2">Usure</h4>
              <div className="text-2xl font-bold text-white">{results.wearRate}%</div>
              <div className="text-xs text-slate-500 mt-1">vs standard</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
            <h3 className="text-lg font-semibold text-white mb-3">Standards Courants</h3>
            <div className="space-y-2 text-sm">
              {[
                { freq: 18000, hz: 2.5, name: 'Basse fréquence', usage: 'Vintage, économie' },
                { freq: 21600, hz: 3.0, name: 'Classique', usage: 'Standard traditionnel' },
                { freq: 28800, hz: 4.0, name: 'COSC', usage: 'Certification standard' },
                { freq: 36000, hz: 5.0, name: 'Haute fréquence', usage: 'Précision accrue' },
                { freq: 72000, hz: 10.0, name: 'Ultra-haute', usage: 'Chronographes précis' },
              ].map((std, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-900/50 rounded">
                  <div>
                    <div className="text-white font-medium">{std.name}</div>
                    <div className="text-xs text-slate-500">{std.usage}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{std.hz} Hz</div>
                    <div className="text-xs text-slate-500">{std.freq.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
