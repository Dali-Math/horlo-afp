'use client'

import { useState, useMemo } from 'react'
import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// ... le reste du code

import { useState, useMemo } from 'react'
import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function COSCCalculator() {
  const [positions, setPositions] = useState({
    pos6H_1: 0, pos6H_2: 0,
    pos3H_1: 0, pos3H_2: 0,
    pos9H_1: 0, pos9H_2: 0,
    posFH_1: 0, posFH_2: 0,
    posCH_1: 0, posCH_2: 0,
  })
  const [thermal, setThermal] = useState({ temp8: 0, temp38: 0, temp23_15: 0 })

  // Calculs ISO 3159 - Formules exactes
  const results = useMemo(() => {
    const Mi = [
      positions.pos6H_1, positions.pos6H_2,
      positions.pos3H_1, positions.pos3H_2,
      positions.pos9H_1, positions.pos9H_2,
      positions.posFH_1, positions.posFH_2,
      positions.posCH_1, positions.posCH_2
    ]

    // M: Moyenne des marches journalières (jours 1-10)
    const M = Mi.reduce((sum, val) => sum + val, 0) / 10

    // V: Variation moyenne des marches
    const variations = [
      Math.abs(Mi[1] - Mi[0]),
      Math.abs(Mi[3] - Mi[2]),
      Math.abs(Mi[5] - Mi[4]),
      Math.abs(Mi[7] - Mi[6]),
      Math.abs(Mi[9] - Mi[8])
    ]
    const V = variations.reduce((sum, val) => sum + val, 0) / 5

    // Vmax: Variation maximale
    const Vmax = Math.max(...variations)

    // D: Différence H-V (6H vs CH)
    const D = ((Mi[0] + Mi[1]) / 2) - ((Mi[8] + Mi[9]) / 2)

    // P: Écart maximal
    const P = Math.max(...Mi.map(mi => Math.abs(mi - M)))

    // C: Variation thermique (ΔT = 30°C)
    const C = (thermal.temp38 - thermal.temp8) / 30

    // R: Reprise de marche
    const R = thermal.temp23_15 - ((Mi[0] + Mi[1]) / 2)

    // Prédiction de certification (Cat. 1)
    const checks = {
      M: M >= -4 && M <= 6,
      V: V <= 2,
      Vmax: Vmax <= 5,
      D: D >= -6 && D <= 8,
      P: P <= 10,
      C: Math.abs(C) <= 0.6,
      R: Math.abs(R) <= 5
    }

    const passed = Object.values(checks).filter(Boolean).length
    const certificationProb = (passed / 7) * 100

    return { M, V, Vmax, D, P, C, R, checks, certificationProb, Mi }
  }, [positions, thermal])

  // Données graphique
  const chartData = results.Mi.map((value, index) => ({
    jour: index + 1,
    marche: value,
    moyenne: results.M
  }))

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_cosc_calculator.png" alt="COSC" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Calculateur de Précision COSC</h2>
          <p className="text-slate-400">Simulation complète des tests ISO 3159 avec prédiction de certification</p>
        </div>
      </div>

      {/* Résultats de certification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-xl border ${
          results.certificationProb >= 100 ? 'bg-green-500/10 border-green-500/30' : 
          results.certificationProb >= 80 ? 'bg-yellow-500/10 border-yellow-500/30' : 
          'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {results.certificationProb >= 100 ? <CheckCircle className="text-green-400" /> : <AlertCircle className="text-yellow-400" />}
            <h3 className="text-sm font-medium text-slate-400">Probabilité de Certification</h3>
          </div>
          <div className="text-4xl font-bold text-white">{results.certificationProb.toFixed(0)}%</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Moyenne des Marches</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.M.toFixed(2)} s/j</div>
          <div className="text-xs text-slate-500 mt-1">Limite: -4 à +6 s/j</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-indigo-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Variation Moyenne</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.V.toFixed(2)} s/j</div>
          <div className="text-xs text-slate-500 mt-1">Limite: ≤ 2 s/j</div>
        </div>
      </div>

      {/* Graphique des marches */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Évolution des Marches Journalières</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="jour" stroke="#94a3b8" label={{ value: 'Jour', fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" label={{ value: 'Marche (s/j)', angle: -90, fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line type="monotone" dataKey="marche" stroke="#3b82f6" strokeWidth={2} name="Marche" />
            <Line type="monotone" dataKey="moyenne" stroke="#6366f1" strokeDasharray="5 5" name="Moyenne" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Saisie des positions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Positions (23°C)</h3>
          <div className="space-y-3">
            {Object.keys(positions).map((key) => (
              <div key={key}>
                <label className="block text-sm text-slate-400 mb-1">
                  {key.replace('pos', '').replace('_', ' - Jour ')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={positions[key as keyof typeof positions]}
                  onChange={(e) => setPositions(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Variations Thermiques</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1">M11 (8°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={thermal.temp8}
                  onChange={(e) => setThermal(prev => ({ ...prev, temp8: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">M13 (38°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={thermal.temp38}
                  onChange={(e) => setThermal(prev => ({ ...prev, temp38: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">M15 (23°C reprise)</label>
                <input
                  type="number"
                  step="0.1"
                  value={thermal.temp23_15}
                  onChange={(e) => setThermal(prev => ({ ...prev, temp23_15: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Critères ISO 3159 (Cat. 1)</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(results.checks).map(([key, passed]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-slate-400">{key}</span>
                  <span className={passed ? 'text-green-400' : 'text-red-400'}>
                    {passed ? 'Conforme' : 'Non conforme'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Détails des calculs */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Résultats Détaillés</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-slate-400">Vmax</div>
            <div className="text-white font-semibold">{results.Vmax.toFixed(2)} s/j</div>
          </div>
          <div>
            <div className="text-slate-400">D (H-V)</div>
            <div className="text-white font-semibold">{results.D.toFixed(2)} s/j</div>
          </div>
          <div>
            <div className="text-slate-400">P (Écart max)</div>
            <div className="text-white font-semibold">{results.P.toFixed(2)} s/j</div>
          </div>
          <div>
            <div className="text-slate-400">C (Thermique)</div>
            <div className="text-white font-semibold">{results.C.toFixed(3)} s/(j·°C)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
