import { useState, useMemo } from 'react'
import { Clock, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react'
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
    <div className="space-y-6 max-w-7xl p-6">
      {/* Header avec instruction */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="text-blue-400 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">Calculateur Interactif</h3>
            <p className="text-slate-300 text-sm">
              Saisissez les valeurs de marche journalière pour chaque position et les variations thermiques. 
              Les calculs ISO 3159 se mettent à jour automatiquement en temps réel.
            </p>
          </div>
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
            <h3 className="text-sm font-medium text-slate-400">Probabilite de Certification</h3>
          </div>
          <div className="text-4xl font-bold text-white">{results.certificationProb.toFixed(0)}%</div>
          <div className="text-xs text-slate-500 mt-1">
            {results.certificationProb >= 100 ? 'Conforme COSC Cat. 1' : 
             results.certificationProb >= 80 ? 'Certification probable' : 
             'Non conforme'}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Moyenne des Marches (M)</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.M.toFixed(2)} s/j</div>
          <div className="text-xs text-slate-500 mt-1">Limite: -4 a +6 s/j</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-indigo-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Variation Moyenne (V)</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.V.toFixed(2)} s/j</div>
          <div className="text-xs text-slate-500 mt-1">Limite: inferieur ou egal a 2 s/j</div>
        </div>
      </div>

      {/* Section de saisie - Mise en avant */}
      <div className="bg-slate-800/80 border-2 border-blue-500/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-semibold text-white">SAISIE DES DONNEES</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Positions à 23°C */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                Positions a 23 degres C
              </h4>
              <p className="text-xs text-slate-400 mb-4">Saisir la marche journaliere en secondes/jour pour chaque position</p>
              
              <div className="space-y-3">
                {/* Position 6H */}
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">Position 6H (Cadran Haut)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 2.5"
                        value={positions.pos6H_1 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos6H_1: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 2.8"
                        value={positions.pos6H_2 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos6H_2: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Position 3H */}
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">Position 3H (Couronne Droite)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 1.5"
                        value={positions.pos3H_1 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos3H_1: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 1.8"
                        value={positions.pos3H_2 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos3H_2: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Position 9H */}
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">Position 9H (Couronne Gauche)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 3.0"
                        value={positions.pos9H_1 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos9H_1: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 3.2"
                        value={positions.pos9H_2 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, pos9H_2: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Position FH */}
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">Position FH (Cadran Face)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 2.0"
                        value={positions.posFH_1 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, posFH_1: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 2.3"
                        value={positions.posFH_2 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, posFH_2: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Position CH */}
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-400 mb-2">Position CH (Cadran Bas)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 1.0"
                        value={positions.posCH_1 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, posCH_1: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 1.2"
                        value={positions.posCH_2 || ''}
                        onChange={(e) => setPositions(prev => ({ ...prev, posCH_2: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variations Thermiques */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                Variations Thermiques
              </h4>
              <p className="text-xs text-slate-400 mb-4">Mesures de marche aux differentes temperatures</p>
              
              <div className="space-y-3">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-blue-400 mb-2">
                    M11 - Temperature 8 degres C
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 1.5"
                    value={thermal.temp8 || ''}
                    onChange={(e) => setThermal(prev => ({ ...prev, temp8: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <div className="text-xs text-slate-500 mt-1">Marche journaliere a froid</div>
                </div>

                <div className="bg-slate-800 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-orange-400 mb-2">
                    M13 - Temperature 38 degres C
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 3.0"
                    value={thermal.temp38 || ''}
                    onChange={(e) => setThermal(prev => ({ ...prev, temp38: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <div className="text-xs text-slate-500 mt-1">Marche journaliere a chaud</div>
                </div>

                <div className="bg-slate-800 p-3 rounded-lg">
                  <label className="block text-sm font-medium text-blue-400 mb-2">
                    M15 - Temperature 23 degres C (reprise)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 2.0"
                    value={thermal.temp23_15 || ''}
                    onChange={(e) => setThermal(prev => ({ ...prev, temp23_15: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <div className="text-xs text-slate-500 mt-1">Marche apres retour temperature ambiante</div>
                </div>
              </div>
            </div>

            {/* Critères ISO 3159 */}
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Criteres ISO 3159 (Cat. 1)</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(results.checks).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300 font-medium">{key}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {passed ? 'Conforme' : 'Non conforme'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique des marches */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Evolution des Marches Journalieres</h3>
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
            <Line type="monotone" dataKey="marche" stroke="#3b82f6" strokeWidth={2} name="Marche" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="moyenne" stroke="#6366f1" strokeDasharray="5 5" name="Moyenne" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Détails des calculs */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Resultats Detailles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">Vmax</div>
            <div className="text-white font-semibold text-xl">{results.Vmax.toFixed(2)} s/j</div>
            <div className="text-xs text-slate-500 mt-1">Limite: inferieur ou egal a 5 s/j</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">D (H-V)</div>
            <div className="text-white font-semibold text-xl">{results.D.toFixed(2)} s/j</div>
            <div className="text-xs text-slate-500 mt-1">Limite: -6 a +8 s/j</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">P (Ecart max)</div>
            <div className="text-white font-semibold text-xl">{results.P.toFixed(2)} s/j</div>
            <div className="text-xs text-slate-500 mt-1">Limite: inferieur ou egal a 10 s/j</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-slate-400 text-sm mb-1">C (Thermique)</div>
            <div className="text-white font-semibold text-xl">{results.C.toFixed(3)} s/(j degres C)</div>
            <div className="text-xs text-slate-500 mt-1">Limite: inferieur ou egal a 0.6</div>
          </div>
        </div>
      </div>
    </div>
  )
}
