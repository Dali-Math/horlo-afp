'use client'

import { useState, useMemo } from 'react'
import { Clock, TrendingUp, AlertCircle, CheckCircle, Info, Watch } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function COSCCalculator() {
  const [positions, setPositions] = useState({
    pos6h1: '', pos6h2: '',
    pos3h1: '', pos3h2: '',
    pos9h1: '', pos9h2: '',
    posFH1: '', posFH2: '',
    posCH1: '', posCH2: '',
  })
  
  const [thermal, setThermal] = useState({
    temp8: '',
    temp38: '',
    temp23_15: ''
  })

  const results = useMemo(() => {
    const Mi = [
      parseFloat(positions.pos6h1) || 0, parseFloat(positions.pos6h2) || 0,
      parseFloat(positions.pos3h1) || 0, parseFloat(positions.pos3h2) || 0,
      parseFloat(positions.pos9h1) || 0, parseFloat(positions.pos9h2) || 0,
      parseFloat(positions.posFH1) || 0, parseFloat(positions.posFH2) || 0,
      parseFloat(positions.posCH1) || 0, parseFloat(positions.posCH2) || 0,
    ]

    // M: Moyenne des marches journalières
    const M = Mi.reduce((sum, val) => sum + val, 0) / 10

    // V: Variation moyenne des marches
    const variations = [
      Math.abs(Mi[1] - Mi[0]),
      Math.abs(Mi[3] - Mi[2]),
      Math.abs(Mi[5] - Mi[4]),
      Math.abs(Mi[7] - Mi[6]),
      Math.abs(Mi[9] - Mi[8]),
    ]
    const V = variations.reduce((sum, val) => sum + val, 0) / 5

    // Vmax: Variation maximale
    const Vmax = Math.max(...variations, 0)

    // D: Différence H-V (6H vs CH)
    const D = ((Mi[0] + Mi[1]) / 2) - ((Mi[8] + Mi[9]) / 2)

    // P: Écart maximal
    const P = Math.max(...Mi.map(mi => Math.abs(mi - M)), 0)

    // C: Variation thermique (CORRECTION: parenthèses ajoutées)
    const C = ((parseFloat(thermal.temp38) || 0) - (parseFloat(thermal.temp8) || 0)) / 30

    // R: Reprise de marche
    const R = (parseFloat(thermal.temp23_15) || 0) - ((Mi[0] + Mi[1]) / 2)

    // Prédiction de certification (Cat. 1)
    const checks = {
      M: M >= -4 && M <= 6,
      V: V <= 2,
      Vmax: Vmax <= 5,
      D: D >= -6 && D <= 8,
      P: P <= 10,
      C: Math.abs(C) <= 0.6,
      R: Math.abs(R) <= 5,
    }

    const passed = Object.values(checks).filter(Boolean).length
    const certificationProb = (passed / 7) * 100

    return { M, V, Vmax, D, P, C, R, checks, certificationProb, Mi }
  }, [positions, thermal])

  const chartData = results.Mi.map((value, index) => ({
    jour: index + 1,
    marche: value,
    moyenne: results.M,
  }))

  const handlePositionChange = (field: string, value: string) => {
    setPositions(prev => ({ ...prev, [field]: value }))
  }

  const handleThermalChange = (field: string, value: string) => {
    setThermal(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar - FIXE */}
      <aside className="w-[200px] bg-[#16203a] flex flex-col shadow-xl fixed h-screen left-0 top-0 z-30 border-r border-slate-700 overflow-y-auto">
        <div className="flex items-center gap-3 px-4 py-6 mb-4 border-b border-slate-700 flex-shrink-0">
          <span className="bg-blue-700 p-2 rounded-lg flex-shrink-0">
            <Watch className="h-6 w-6 text-blue-300" />
          </span>
          <div className="min-w-0">
            <div className="font-bold text-base tracking-wide text-white truncate">HorloLearn Tools</div>
            <div className="text-xs text-slate-400">Outils</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="flex flex-col gap-0 text-xs">
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Bibliothèque</li>
            <li className="text-white bg-blue-700/70 hover:bg-blue-700/80 px-3 py-2 rounded cursor-pointer font-semibold transition">Calculateur COSC</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Simulateur</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Réserve</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Diagnostiqueur</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Finitions</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Convertisseur</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Fréquences</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Chronographe</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Engrenages</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Spiral</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Couples</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Amplitude</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Échappement</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-3 py-2 rounded cursor-pointer transition">Base Données</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content - FULL WIDTH */}
      <main className="ml-[200px] w-full overflow-y-auto">
        <div className="p-6 space-y-8 w-full">
          {/* Header central */}
          <div className="text-center mb-3">
            <h1 className="text-4xl font-extrabold text-white mb-2">Calculateur COSC ISO 3159</h1>
            <p className="text-slate-400 text-sm">Certification des chronomètres mécaniques suisses</p>
          </div>

          {/* Notice */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 w-full">
            <div className="flex items-start gap-3">
              <Info className="text-blue-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="text-blue-300 font-semibold mb-1 text-sm">Calculateur Interactif</h3>
                <p className="text-slate-300 text-xs">
                  Saisissez les valeurs de marche journalière pour chaque position et les variations thermiques. Les calculs ISO 3159 se mettent à jour automatiquement en temps réel.
                </p>
              </div>
            </div>
          </div>

          {/* Résultats principaux - 3 colonnes */}
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className={`p-5 rounded-xl border shadow ${
              results.certificationProb >= 100
                ? 'bg-green-700/10 border-green-600/40'
                : results.certificationProb >= 80
                  ? 'bg-yellow-500/10 border-yellow-600/30'
                  : 'bg-red-500/10 border-red-700/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {results.certificationProb >= 100 ? <CheckCircle className="text-green-400" size={18} /> : <AlertCircle className="text-yellow-400" size={18} />}
                <h3 className="text-xs font-medium text-slate-400">Probabilité de Certification</h3>
              </div>
              <div className="text-3xl font-extrabold text-white">{results.certificationProb.toFixed(0)}%</div>
              <div className="text-xs text-slate-500 mt-1">
                {results.certificationProb >= 100 ? 'Conforme COSC Cat. 1' : results.certificationProb >= 80 ? 'Certification probable' : 'Non conforme'}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-blue-400" size={18} />
                <h3 className="text-xs font-medium text-slate-400">Moyenne des Marches (M)</h3>
              </div>
              <div className="text-3xl font-bold text-white">{results.M.toFixed(2)} s/j</div>
              <div className="text-xs text-slate-500 mt-1">Limite : -4 à +6 s/j</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-indigo-400" size={18} />
                <h3 className="text-xs font-medium text-slate-400">Variation Moyenne (V)</h3>
              </div>
              <div className="text-3xl font-bold text-white">{results.V.toFixed(2)} s/j</div>
              <div className="text-xs text-slate-500 mt-1">Limite : ≤ 2 s/j</div>
            </div>
          </div>

          {/* Grille saisies - 2 colonnes */}
          <div className="grid grid-cols-2 gap-6 w-full bg-[#1a233b] border border-blue-600/20 rounded-xl p-6 shadow-lg">
            {/* Positions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">SAISIE DES DONNÉES</h3>
              
              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2 text-sm">Position 6H (Cadran Haut)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 2.5" 
                      value={positions.pos6h1} 
                      onChange={(e) => handlePositionChange('pos6h1', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 2.8" 
                      value={positions.pos6h2} 
                      onChange={(e) => handlePositionChange('pos6h2', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2 text-sm">Position 3H (Couronne Droite)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 1.5" 
                      value={positions.pos3h1} 
                      onChange={(e) => handlePositionChange('pos3h1', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 1.8" 
                      value={positions.pos3h2} 
                      onChange={(e) => handlePositionChange('pos3h2', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2 text-sm">Position 9H (Couronne Gauche)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 3.0" 
                      value={positions.pos9h1} 
                      onChange={(e) => handlePositionChange('pos9h1', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 3.2" 
                      value={positions.pos9h2} 
                      onChange={(e) => handlePositionChange('pos9h2', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2 text-sm">Position FH (Cadran Face)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 2.0" 
                      value={positions.posFH1} 
                      onChange={(e) => handlePositionChange('posFH1', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 2.3" 
                      value={positions.posFH2} 
                      onChange={(e) => handlePositionChange('posFH2', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2 text-sm">Position CH (Cadran Bas)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 1.0" 
                      value={positions.posCH1} 
                      onChange={(e) => handlePositionChange('posCH1', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Ex: 1.2" 
                      value={positions.posCH2} 
                      onChange={(e) => handlePositionChange('posCH2', e.target.value)} 
                      className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thermiques */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Variations Thermiques</h3>
              
              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <label className="block text-sm font-medium text-blue-400 mb-2">M11 - Température 8°C</label>
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="Ex: 2.0" 
                  value={thermal.temp8} 
                  onChange={(e) => handleThermalChange('temp8', e.target.value)} 
                  className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                />
                <div className="text-xs text-slate-500 mt-1">Marche journalière à froid</div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
                <label className="block text-sm font-medium text-orange-400 mb-2">M13 - Température 38°C</label>
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="Ex: 2.0" 
                  value={thermal.temp38} 
                  onChange={(e) => handleThermalChange('temp38', e.target.value)} 
                  className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                />
                <div className="text-xs text-slate-500 mt-1">Marche journalière à chaud</div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-lg mb-4">
                <label className="block text-sm font-medium text-blue-400 mb-2">M15 - Température 23°C (reprise)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="Ex: 2.0" 
                  value={thermal.temp23_15} 
                  onChange={(e) => handleThermalChange('temp23_15', e.target.value)} 
                  className="w-full px-2 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" 
                />
                <div className="text-xs text-slate-500 mt-1">Marche après retour température ambiante</div>
              </div>

              {/* Critères */}
              <div className="bg-slate-900/80 p-3 rounded-lg shadow">
                <h4 className="text-slate-200 font-semibold mb-2 text-sm">Critères ISO 3159 (Cat. 1)</h4>
                <div className="space-y-1 text-xs">
                  {Object.entries(results.checks).map(([key, passed]) => (
                    <div key={key} className="flex items-center justify-between py-1">
                      <span className="text-slate-300 font-medium">{key}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {passed ? 'Conforme' : 'Non conf.'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Graphique */}
          <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 shadow w-full">
            <h3 className="text-lg font-semibold text-white mb-3">Évolution des Marches Journalières</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="jour" stroke="#94a3b8" label={{ value: 'Jour', fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" label={{ value: 'Marche (s/j)', angle: -90, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} labelStyle={{ color: '#e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="marche" stroke="#3b82f6" strokeWidth={2} name="Marche" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="moyenne" stroke="#6366f1" strokeDasharray="5 5" name="Moyenne" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Résultats détaillés */}
          <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 shadow w-full">
            <h3 className="text-lg font-semibold text-white mb-3">Résultats Détaillés</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">Vmax</div>
                <div className="text-white font-semibold text-lg">{results.Vmax.toFixed(2)} s/j</div>
                <div className="text-xs text-slate-500 mt-1">Limite: ≤ 5 s/j</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">D (H-V)</div>
                <div className="text-white font-semibold text-lg">{results.D.toFixed(2)} s/j</div>
                <div className="text-xs text-slate-500 mt-1">Limite: -6 à +8 s/j</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">P (Écart max)</div>
                <div className="text-white font-semibold text-lg">{results.P.toFixed(2)} s/j</div>
                <div className="text-xs text-slate-500 mt-1">Limite: ≤ 10 s/j</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">C (Thermique)</div>
                <div className="text-white font-semibold text-lg">{results.C.toFixed(3)} s/(j·°C)</div>
                <div className="text-xs text-slate-500 mt-1">Limite: ≤ 0.6</div>
              </div>
            </div>
          </div>
          
          {/* Padding bas */}
          <div className="h-8"></div>
        </div>
      </main>
    </div>
  )
}
