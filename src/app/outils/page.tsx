'use client'

import { useState, useMemo } from 'react'
import { Clock, TrendingUp, AlertCircle, CheckCircle, Info, Watch } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function COSCCalculator() {
  const [pos6h1, setPos6h1] = useState('')
  const [pos6h2, setPos6h2] = useState('')
  const [pos3h1, setPos3h1] = useState('')
  const [pos3h2, setPos3h2] = useState('')
  const [pos9h1, setPos9h1] = useState('')
  const [pos9h2, setPos9h2] = useState('')
  const [posFH1, setPosFH1] = useState('')
  const [posFH2, setPosFH2] = useState('')
  const [posCH1, setPosCH1] = useState('')
  const [posCH2, setPosCH2] = useState('')
  
  const [temp8, setTemp8] = useState('')
  const [temp38, setTemp38] = useState('')
  const [temp23_15, setTemp23_15] = useState('')

  const results = useMemo(() => {
    const Mi = [
      parseFloat(pos6h1) || 0, parseFloat(pos6h2) || 0,
      parseFloat(pos3h1) || 0, parseFloat(pos3h2) || 0,
      parseFloat(pos9h1) || 0, parseFloat(pos9h2) || 0,
      parseFloat(posFH1) || 0, parseFloat(posFH2) || 0,
      parseFloat(posCH1) || 0, parseFloat(posCH2) || 0,
    ]

    const M = Mi.reduce((sum, val) => sum + val, 0) / 10
    const variations = [
      Math.abs(Mi[1] - Mi[0]),
      Math.abs(Mi[3] - Mi[2]),
      Math.abs(Mi[5] - Mi[4]),
      Math.abs(Mi[7] - Mi[6]),
      Math.abs(Mi[9] - Mi[8]),
    ]
    const V = variations.reduce((sum, val) => sum + val, 0) / 5
    const Vmax = Math.max(...variations, 0)
    const D = (Mi[0] + Mi[1]) / 2 - (Mi[8] + Mi[9]) / 2
    const P = Math.max(...Mi.map(mi => Math.abs(mi - M)), 0)
    const C = (parseFloat(temp38) || 0 - (parseFloat(temp8) || 0)) / 30
    const R = (parseFloat(temp23_15) || 0) - (Mi[0] + Mi[1]) / 2

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
  }, [pos6h1, pos6h2, pos3h1, pos3h2, pos9h1, pos9h2, posFH1, posFH2, posCH1, posCH2, temp8, temp38, temp23_15])

  const chartData = results.Mi.map((value, index) => ({
    jour: index + 1,
    marche: value,
    moyenne: results.M,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#16203a] flex flex-col shadow-xl fixed h-screen left-0 top-0 z-30">
        <div className="flex items-center gap-3 px-5 py-6 mb-6 border-b border-slate-700">
          <span className="bg-blue-700 p-2 rounded-lg">
            <Watch className="h-7 w-7 text-blue-300" />
          </span>
          <div>
            <div className="font-bold text-lg tracking-wide text-white">HorloLearn Tools</div>
            <div className="text-xs text-slate-400">Outils Professionnels d&apos;Horlogerie</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1 text-sm">
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Bibliothèque de Ressources</li>
            <li className="text-white bg-blue-700/70 hover:bg-blue-700/80 px-4 py-2 rounded cursor-pointer font-semibold">Calculateur Précision COSC</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Simulateur de Complications</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Réserve de Marche</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Diagnostiqueur de Problèmes</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Finitions Swiss Made</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Convertisseur d'Unités</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Fréquences & Oscillations</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Chronographe Avancé</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Rapport d'Engrenages</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Longueur de Spiral</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Tableau des Couples</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Guide d'Amplitude</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Simulateur d'Échappement</li>
            <li className="text-slate-200 hover:bg-blue-700/20 px-4 py-2 rounded cursor-pointer">Base de Données des Pièces</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-[260px] w-full p-8 max-w-[1200px] mx-auto space-y-12">
        {/* Header central */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-extrabold text-white mb-2">Calculateur COSC ISO 3159</h1>
          <p className="text-slate-400 text-md">Certification des chronomètres mécaniques suisses</p>
        </div>

        {/* Notice */}
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Info className="text-blue-400 mt-1 flex-shrink-0" size={22} />
            <div>
              <h3 className="text-blue-300 font-semibold mb-1">Calculateur Interactif</h3>
              <p className="text-slate-300 text-sm">
                Saisissez les valeurs de marche journalière pour chaque position et les variations thermiques. Les calculs ISO 3159 se mettent à jour automatiquement en temps réel.
              </p>
            </div>
          </div>
        </div>

        {/* Résultats principaux */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className={`p-6 rounded-xl border shadow ${
            results.certificationProb >= 100
              ? 'bg-green-700/10 border-green-600/40'
              : results.certificationProb >= 80
                ? 'bg-yellow-500/10 border-yellow-600/30'
                : 'bg-red-500/10 border-red-700/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {results.certificationProb >= 100 ? <CheckCircle className="text-green-400" /> : <AlertCircle className="text-yellow-400" />}
              <h3 className="text-sm font-medium text-slate-400">Probabilité de Certification</h3>
            </div>
            <div className="text-4xl font-extrabold text-white">{results.certificationProb.toFixed(0)}%</div>
            <div className="text-xs text-slate-500 mt-1">
              {results.certificationProb >= 100 ? 'Conforme COSC Cat. 1' : results.certificationProb >= 80 ? 'Certification probable' : 'Non conforme'}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-400" size={20} />
              <h3 className="text-sm font-medium text-slate-400">Moyenne des Marches (M)</h3>
            </div>
            <div className="text-3xl font-bold text-white">{results.M.toFixed(2)} s/j</div>
            <div className="text-xs text-slate-500 mt-1">Limite : -4 à +6 s/j</div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-indigo-400" size={20} />
              <h3 className="text-sm font-medium text-slate-400">Variation Moyenne (V)</h3>
            </div>
            <div className="text-3xl font-bold text-white">{results.V.toFixed(2)} s/j</div>
            <div className="text-xs text-slate-500 mt-1">Limite : ≤ 2 s/j</div>
          </div>
        </div>

        {/* Grille saisies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1a233b] border border-blue-600/20 rounded-xl p-8 shadow-lg">
          {/* Positions */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">SAISIE DES DONNÉES</h3>
            
            <div className="bg-slate-800/70 p-4 rounded-lg mb-3">
              <div className="text-blue-300 font-semibold mb-2">Position 6H (Cadran Haut)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                  <input type="number" step="0.1" placeholder="Ex: 2.5" value={pos6h1} onChange={(e) => setPos6h1(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                  <input type="number" step="0.1" placeholder="Ex: 2.8" value={pos6h2} onChange={(e) => setPos6h2(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg mb-3">
              <div className="text-blue-300 font-semibold mb-2">Position 3H (Couronne Droite)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                  <input type="number" step="0.1" placeholder="Ex: 1.5" value={pos3h1} onChange={(e) => setPos3h1(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                  <input type="number" step="0.1" placeholder="Ex: 1.8" value={pos3h2} onChange={(e) => setPos3h2(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg mb-3">
              <div className="text-blue-300 font-semibold mb-2">Position 9H (Couronne Gauche)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                  <input type="number" step="0.1" placeholder="Ex: 3.0" value={pos9h1} onChange={(e) => setPos9h1(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                  <input type="number" step="0.1" placeholder="Ex: 3.2" value={pos9h2} onChange={(e) => setPos9h2(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg mb-3">
              <div className="text-blue-300 font-semibold mb-2">Position FH (Cadran Face)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                  <input type="number" step="0.1" placeholder="Ex: 2.0" value={posFH1} onChange={(e) => setPosFH1(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                  <input type="number" step="0.1" placeholder="Ex: 2.3" value={posFH2} onChange={(e) => setPosFH2(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg mb-3">
              <div className="text-blue-300 font-semibold mb-2">Position CH (Cadran Bas)</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 1</label>
                  <input type="number" step="0.1" placeholder="Ex: 1.0" value={posCH1} onChange={(e) => setPosCH1(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Jour 2</label>
                  <input type="number" step="0.1" placeholder="Ex: 1.2" value={posCH2} onChange={(e) => setPosCH2(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
            </div>
          </div>

          {/* Thermiques */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Variations Thermiques</h3>
            
            <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
              <label className="block text-sm font-medium text-blue-400 mb-2">M11 - Température 8°C</label>
              <input type="number" step="0.1" placeholder="Ex: 2.0" value={temp8} onChange={(e) => setTemp8(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
              <div className="text-xs text-slate-500 mt-1">Marche journalière à froid</div>
            </div>

            <div className="bg-slate-800/70 p-3 rounded-lg mb-3">
              <label className="block text-sm font-medium text-orange-400 mb-2">M13 - Température 38°C</label>
              <input type="number" step="0.1" placeholder="Ex: 2.0" value={temp38} onChange={(e) => setTemp38(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
              <div className="text-xs text-slate-500 mt-1">Marche journalière à chaud</div>
            </div>

            <div className="bg-slate-800/70 p-3 rounded-lg mb-6">
              <label className="block text-sm font-medium text-blue-400 mb-2">M15 - Température 23°C (reprise)</label>
              <input type="number" step="0.1" placeholder="Ex: 2.0" value={temp23_15} onChange={(e) => setTemp23_15(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition" />
              <div className="text-xs text-slate-500 mt-1">Marche après retour température ambiante</div>
            </div>

            {/* Critères */}
            <div className="bg-slate-900/80 p-4 rounded-lg shadow">
              <h4 className="text-slate-200 font-semibold mb-3">Critères ISO 3159 (Cat. 1)</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(results.checks).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between border-b border-slate-800 py-2">
                    <span className="text-slate-300 font-medium">{key}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {passed ? 'Conforme' : 'Non conforme'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Graphique */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
          <h3 className="text-lg font-semibold text-white mb-4">Évolution des Marches Journalières</h3>
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
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 shadow">
          <h3 className="text-lg font-semibold text-white mb-4">Résultats Détaillés</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">Vmax</div>
              <div className="text-white font-semibold text-xl">{results.Vmax.toFixed(2)} s/j</div>
              <div className="text-xs text-slate-500 mt-1">Limite: ≤ 5 s/j</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">D (H-V)</div>
              <div className="text-white font-semibold text-xl">{results.D.toFixed(2)} s/j</div>
              <div className="text-xs text-slate-500 mt-1">Limite: -6 à +8 s/j</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">P (Écart max)</div>
              <div className="text-white font-semibold text-xl">{results.P.toFixed(2)} s/j</div>
              <div className="text-xs text-slate-500 mt-1">Limite: ≤ 10 s/j</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">C (Thermique)</div>
              <div className="text-white font-semibold text-xl">{results.C.toFixed(3)} s/(j·°C)</div>
              <div className="text-xs text-slate-500 mt-1">Limite: ≤ 0.6</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
