'use client'

import { useState, useMemo } from 'react'
import {
  Clock, TrendingUp, AlertCircle, CheckCircle, Info, BookOpen, Activity, Watch, Battery,
  Stethoscope, BadgeCheck, Scale, Zap, Timer, Share2, Sigma, Percent, WaveSquare, PieChart, Database
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sidebar menu config
const menu = [
  { icon: BookOpen, label: "Bibliothèque de Ressources" },
  { icon: Activity, label: "Calculateur Précision COSC" },
  { icon: Watch, label: "Simulateur de Complications" },
  { icon: Battery, label: "Réserve de Marche" },
  { icon: Stethoscope, label: "Diagnostiqueur de Problèmes" },
  { icon: BadgeCheck, label: "Finitions Swiss Made" },
  { icon: Scale, label: "Convertisseur d'Unités" },
  { icon: Zap, label: "Fréquences & Oscillations" },
  { icon: Timer, label: "Chronographe Avancé" },
  { icon: Share2, label: "Rapport d'Engrenages" },
  { icon: Sigma, label: "Longueur de Spiral" },
  { icon: Percent, label: "Tableau des Couples" },
  { icon: WaveSquare, label: "Guide d'Amplitude" },
  { icon: PieChart, label: "Simulateur d'Échappement" },
  { icon: Database, label: "Base de Données des Pièces" },
]

// Sidebar component
function HorloLearnSidebar() {
  return (
    <aside className="h-screen fixed top-0 left-0 w-[260px] bg-[#16203a] flex flex-col shadow-xl z-30 select-none">
      <div className="flex items-center gap-3 px-5 py-6 mb-6 border-b border-slate-700">
        <span className="bg-blue-700 p-2 rounded-lg">
          <Watch className="h-7 w-7 text-blue-300" />
        </span>
        <div>
          <div className="font-bold text-lg tracking-wide text-white">HorloLearn Tools</div>
          <div className="text-xs text-slate-400">Outils Professionnels d&apos;Horlogerie</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1 px-3">
          {menu.map((item, idx) => (
            <li key={item.label} className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700/20 hover:text-white cursor-pointer text-slate-200 transition
              ${idx === 1 && "bg-blue-700/70 text-white font-semibold"}`}>
              <item.icon className="h-5 w-5 opacity-80" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-grow" />
    </aside>
  )
}

// Main calculator component
export default function COSCCalculator() {
  const [positions, setPositions] = useState({
    pos6H_1: 0, pos6H_2: 0,
    pos3H_1: 0, pos3H_2: 0,
    pos9H_1: 0, pos9H_2: 0,
    posFH_1: 0, posFH_2: 0,
    posCH_1: 0, posCH_2: 0,
  })
  const [thermal, setThermal] = useState({ temp8: 0, temp38: 0, temp23_15: 0 })

  const results = useMemo(() => {
    const Mi = [
      positions.pos6H_1, positions.pos6H_2,
      positions.pos3H_1, positions.pos3H_2,
      positions.pos9H_1, positions.pos9H_2,
      positions.posFH_1, positions.posFH_2,
      positions.posCH_1, positions.posCH_2
    ]
    const M = Mi.reduce((sum, val) => sum + val, 0) / 10
    const variations = [
      Math.abs(Mi[1] - Mi[0]),
      Math.abs(Mi[3] - Mi[2]),
      Math.abs(Mi[5] - Mi[4]),
      Math.abs(Mi[7] - Mi[6]),
      Math.abs(Mi[9] - Mi[8])
    ]
    const V = variations.reduce((sum, val) => sum + val, 0) / 5
    const Vmax = Math.max(...variations)
    const D = ((Mi[0] + Mi[1]) / 2) - ((Mi[8] + Mi[9]) / 2)
    const P = Math.max(...Mi.map(mi => Math.abs(mi - M)))
    const C = (thermal.temp38 - thermal.temp8) / 30
    const R = thermal.temp23_15 - ((Mi[0] + Mi[1]) / 2)
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

  const chartData = results.Mi.map((value, index) => ({
    jour: index + 1,
    marche: value,
    moyenne: results.M
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <HorloLearnSidebar />
      <main className="ml-[260px] p-8 max-w-[1200px] mx-auto space-y-12">
        {/* Header central */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-extrabold text-white mb-2">Calculateur COSC ISO 3159</h1>
          <p className="text-slate-400 text-md">Certification des chronomètres mécaniques suisses</p>
        </div>

        {/* Notice et résultats principaux */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="md:col-span-3 bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Info className="text-blue-400 mt-1 flex-shrink-0" size={22} />
              <div>
                <h3 className="text-blue-300 font-semibold mb-1">Calculateur Interactif</h3>
                <p className="text-slate-300 text-sm">
                  Saisissez les valeurs de marche journalière pour chaque position, et les variations thermiques. Les calculs ISO 3159 se mettent à jour en temps réel.
                </p>
              </div>
            </div>
          </div>
          {/* Résultats */}
          <div className={`p-6 rounded-xl border shadow ${results.certificationProb >= 100
            ? 'bg-green-700/10 border-green-600/40'
            : results.certificationProb >= 80
              ? 'bg-yellow-500/10 border-yellow-600/30'
              : 'bg-red-500/10 border-red-700/30'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              {results.certificationProb >= 100
                ? <CheckCircle className="text-green-400" />
                : <AlertCircle className="text-yellow-400" />}
              <h3 className="text-sm font-medium text-slate-400">Probabilité de Certification</h3>
            </div>
            <div className="text-4xl font-extrabold text-white">{results.certificationProb.toFixed(0)}%</div>
            <div className="text-xs text-slate-500 mt-1">
              {results.certificationProb >= 100
                ? 'Conforme COSC Cat. 1'
                : results.certificationProb >= 80
                  ? 'Certification probable'
                  : 'Non conforme'}
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

        {/* Grille des saisies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-[#1a233b] border border-blue-600/20 rounded-xl p-8 shadow-lg">
          {/* Saisie positions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-semibold text-white tracking-wide">SAISIE DES DONNÉES</h3>
            </div>
            <div className="mb-6 text-sm text-slate-400">Saisir la marche journalière en secondes/jour pour chaque position</div>
            {[
              { name: "6H (Cadran Haut)", k1: "pos6H_1", k2: "pos6H_2" },
              { name: "3H (Couronne Droite)", k1: "pos3H_1", k2: "pos3H_2" },
              { name: "9H (Couronne Gauche)", k1: "pos9H_1", k2: "pos9H_2" },
              { name: "FH (Cadran Face)", k1: "posFH_1", k2: "posFH_2" },
              { name: "CH (Cadran Bas)", k1: "posCH_1", k2: "posCH_2" },
            ].map(({ name, k1, k2 }) => (
              <div key={name} className="bg-slate-800/70 p-4 rounded-lg mb-3">
                <div className="text-blue-300 font-semibold mb-2">{`Position ${name}`}</div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: "Jour 1", key: k1 }, { label: "Jour 2", key: k2 }].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-xs text-slate-400 mb-1">{label}</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder={`Ex: ${label === "Jour 1" ? "2.5" : "2.8"}`}
                        value={positions[key] || ''}
                        onChange={e => setPositions(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Saisie variations thermiques + critères */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <h4 className="text-lg font-semibold text-white">Variations Thermiques</h4>
              </div>
              <div className="mb-4 text-xs text-slate-400">Mesures de marche aux différentes températures</div>
              {[
                { name: "M11 - Température 8°C", key: "temp8", color: "text-blue-400" },
                { name: "M13 - Température 38°C", key: "temp38", color: "text-orange-400" },
                { name: "M15 - Température 23°C (reprise)", key: "temp23_15", color: "text-blue-400" },
              ].map(({ name, key, color }) => (
                <div key={key} className="bg-slate-800/70 p-3 rounded-lg mb-3">
                  <label className={`block text-sm font-medium ${color} mb-2`}>{name}</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 2.0"
                    value={thermal[key] || ''}
                    onChange={e => setThermal(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    {key === "temp8" && "Marche journalière à froid"}
                    {key === "temp38" && "Marche journalière à chaud"}
                    {key === "temp23_15" && "Marche après retour température ambiante"}
                  </div>
                </div>
              ))}
            </div>
            {/* Critères COSC */}
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
          <h3 className="text-lg font-semibold text-white mb-4">Évolution des Marches Journalieres</h3>
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

        {/* Détails */}
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
