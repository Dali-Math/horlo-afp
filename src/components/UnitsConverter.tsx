import Image from 'next/image'
import { useState } from 'react'
import { ArrowRightLeft, Ruler, Gauge, Droplet } from 'lucide-react'

export default function UnitsConverter() {
  const [activeCategory, setActiveCategory] = useState('linear')
  const [linearInput, setLinearInput] = useState({ value: 1, unit: 'lignes' })
  const [freqInput, setFreqInput] = useState({ value: 28800, unit: 'vph' })
  const [pressureInput, setPressureInput] = useState({ value: 10, unit: 'bar' })

  // Constantes de conversion précises
  const LIGNE_TO_MM = 2.25583 // 1 ligne suisse = 2.25583 mm
  const VPH_TO_HZ = 7200 // VPH = Hz × 7200
  const BAR_TO_ATM = 1.01325
  const BAR_TO_PSI = 14.5038

  // Conversions linéaires
  const linearResults = {
    lignes: linearInput.unit === 'lignes' ? linearInput.value : linearInput.value / LIGNE_TO_MM,
    mm: linearInput.unit === 'mm' ? linearInput.value : linearInput.value * LIGNE_TO_MM,
  }

  // Conversions fréquentielles
  const freqResults = {
    hz: freqInput.unit === 'hz' ? freqInput.value : freqInput.value / VPH_TO_HZ,
    vph: freqInput.unit === 'vph' ? freqInput.value : freqInput.value * VPH_TO_HZ,
    period: 1 / (freqInput.unit === 'hz' ? freqInput.value : freqInput.value / VPH_TO_HZ)
  }

  // Conversions pression
  const pressureResults = {
    bar: pressureInput.unit === 'bar' ? pressureInput.value : 
         pressureInput.unit === 'atm' ? pressureInput.value / BAR_TO_ATM :
         pressureInput.value / BAR_TO_PSI,
    atm: pressureInput.unit === 'atm' ? pressureInput.value :
         pressureInput.unit === 'bar' ? pressureInput.value * BAR_TO_ATM :
         pressureInput.value / BAR_TO_PSI * BAR_TO_ATM,
    psi: pressureInput.unit === 'psi' ? pressureInput.value :
         pressureInput.unit === 'bar' ? pressureInput.value * BAR_TO_PSI :
         pressureInput.value * BAR_TO_ATM * BAR_TO_PSI,
    waterResistance: pressureInput.unit === 'bar' ? pressureInput.value * 10 :
                     pressureInput.unit === 'atm' ? pressureInput.value * 10 / BAR_TO_ATM :
                     pressureInput.value * 10 / BAR_TO_PSI
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        import Image from 'next/image'  // ...  <Image   src="/imgs/outils_units_converter.png"   alt="Convertisseur d'Unités Horlogères"   width={48}   height={48}   priority   className="rounded-md" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Convertisseur d'Unités Horlogères</h2>
          <p className="text-slate-400">Conversions temps réel avec toutes les unités horlogères</p>
        </div>
      </div>

      {/* Sélection catégorie */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'linear', name: 'Unités Linéaires', icon: Ruler },
          { id: 'frequency', name: 'Fréquences', icon: Gauge },
          { id: 'pressure', name: 'Pressions', icon: Droplet },
        ].map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeCategory === id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Icon size={18} />
            {name}
          </button>
        ))}
      </div>

      {/* Unités Linéaires */}
      {activeCategory === 'linear' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Saisie</h3>
            <div className="space-y-4">
              <input
                type="number"
                step="0.001"
                value={linearInput.value}
                onChange={(e) => setLinearInput(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setLinearInput(prev => ({ ...prev, unit: 'lignes' }))}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    linearInput.unit === 'lignes' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Lignes Suisses
                </button>
                <button
                  onClick={() => setLinearInput(prev => ({ ...prev, unit: 'mm' }))}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    linearInput.unit === 'mm' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Millimètres
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">Résultats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Lignes Suisses</div>
                <div className="text-3xl font-bold text-white">{linearResults.lignes.toFixed(4)}</div>
                <div className="text-xs text-slate-500 mt-1">1l = 2.25583 mm exact</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Millimètres</div>
                <div className="text-3xl font-bold text-white">{linearResults.mm.toFixed(4)}</div>
                <div className="text-xs text-slate-500 mt-1">Calibre standard</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Calibres Standards</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { lignes: 12, mm: 27.07, name: 'Grand calibre' },
                { lignes: 11.5, mm: 25.94, name: 'Calibre classique' },
                { lignes: 10.5, mm: 23.69, name: 'Calibre moyen' },
                { lignes: 8.75, mm: 19.74, name: 'Petit calibre' },
              ].map((caliber, i) => (
                <div key={i} className="p-3 bg-slate-900/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-white">{caliber.lignes}'''</div>
                  <div className="text-sm text-slate-400">{caliber.mm} mm</div>
                  <div className="text-xs text-slate-500 mt-1">{caliber.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fréquences */}
      {activeCategory === 'frequency' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Saisie</h3>
            <div className="space-y-4">
              <input
                type="number"
                step="1"
                value={freqInput.value}
                onChange={(e) => setFreqInput(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setFreqInput(prev => ({ ...prev, unit: 'hz' }))}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    freqInput.unit === 'hz' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Hertz (Hz)
                </button>
                <button
                  onClick={() => setFreqInput(prev => ({ ...prev, unit: 'vph' }))}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    freqInput.unit === 'vph' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  VPH / A/h
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">Résultats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Hertz</div>
                <div className="text-3xl font-bold text-white">{freqResults.hz.toFixed(2)} Hz</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Alternances / heure</div>
                <div className="text-3xl font-bold text-white">{freqResults.vph.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">A/h ou VPH</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Période (T)</div>
                <div className="text-3xl font-bold text-white">{freqResults.period.toFixed(4)} s</div>
                <div className="text-xs text-slate-500 mt-1">T = 1/f</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Fréquences Standards</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { hz: 2.5, vph: 18000, name: 'Basse fréquence' },
                { hz: 3.0, vph: 21600, name: 'Classique' },
                { hz: 4.0, vph: 28800, name: 'COSC standard' },
                { hz: 5.0, vph: 36000, name: 'Haute fréquence' },
              ].map((freq, i) => (
                <div key={i} className="p-3 bg-slate-900/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-white">{freq.hz} Hz</div>
                  <div className="text-sm text-slate-400">{freq.vph.toLocaleString()} A/h</div>
                  <div className="text-xs text-slate-500 mt-1">{freq.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pressions */}
      {activeCategory === 'pressure' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Saisie</h3>
            <div className="space-y-4">
              <input
                type="number"
                step="0.1"
                value={pressureInput.value}
                onChange={(e) => setPressureInput(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2">
                {['bar', 'atm', 'psi'].map(unit => (
                  <button
                    key={unit}
                    onClick={() => setPressureInput(prev => ({ ...prev, unit }))}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      pressureInput.unit === unit ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {unit.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <h3 className="text-lg font-semibold text-white mb-4">Résultats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Bars</div>
                <div className="text-3xl font-bold text-white">{pressureResults.bar.toFixed(2)}</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Atmosphères</div>
                <div className="text-3xl font-bold text-white">{pressureResults.atm.toFixed(2)} ATM</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">PSI</div>
                <div className="text-3xl font-bold text-white">{pressureResults.psi.toFixed(2)}</div>
              </div>
              <div className="p-4 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                <div className="text-sm text-cyan-400 mb-1">Résistance à l'eau</div>
                <div className="text-3xl font-bold text-white">{pressureResults.waterResistance.toFixed(0)} m</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Niveaux d'Étanchéité</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { bar: 3, meters: 30, name: 'Usage quotidien' },
                { bar: 5, meters: 50, name: 'Natation' },
                { bar: 10, meters: 100, name: 'Snorkeling' },
                { bar: 20, meters: 200, name: 'Plongée' },
              ].map((level, i) => (
                <div key={i} className="p-3 bg-slate-900/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-white">{level.bar} bars</div>
                  <div className="text-sm text-slate-400">{level.meters} mètres</div>
                  <div className="text-xs text-slate-500 mt-1">{level.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
