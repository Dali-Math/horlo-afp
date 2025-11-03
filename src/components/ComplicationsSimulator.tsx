import { useState } from 'react'
import { Wind, Calendar, Volume2, Timer } from 'lucide-react'

export default function ComplicationsSimulator() {
  const [activeComplication, setActiveComplication] = useState('tourbillon')
  const [tourbillonFreq, setTourbillonFreq] = useState(28800)
  const [perpetualYear, setPerpetualYear] = useState(2025)
  const [chronoAccuracy, setChronoAccuracy] = useState(0.2)

  // Calcul tourbillon: fréquence et périodes
  const tourbillonPeriod = 1 / (tourbillonFreq / 3600) // Période en secondes
  const tourbillonHz = tourbillonFreq / 7200 // Conversion VPH -> Hz

  // Calendrier perpétuel: année bissextile
  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  const daysInYear = isLeapYear(perpetualYear) ? 366 : 365
  const nextLeapYear = Array.from({ length: 10 }, (_, i) => perpetualYear + i).find(y => isLeapYear(y))

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_tourbillon_simulator.png" alt="Complications" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Simulateur de Complications Avancées</h2>
          <p className="text-slate-400">Laboratoire virtuel pour comprendre les complications horlogères</p>
        </div>
      </div>

      {/* Sélection complication */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'tourbillon', name: 'Tourbillon', icon: Wind },
          { id: 'perpetual', name: 'Calendrier Perpétuel', icon: Calendar },
          { id: 'repeater', name: 'Répétition Minutes', icon: Volume2 },
          { id: 'chronograph', name: 'Chronographe', icon: Timer },
        ].map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveComplication(id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeComplication === id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Icon size={18} />
            {name}
          </button>
        ))}
      </div>

      {/* Tourbillon */}
      {activeComplication === 'tourbillon' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
              <h3 className="text-sm font-medium text-blue-400 mb-1">Fréquence</h3>
              <div className="text-3xl font-bold text-white">{tourbillonHz.toFixed(1)} Hz</div>
              <div className="text-xs text-slate-400 mt-1">{tourbillonFreq.toLocaleString()} A/h</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Période d'Oscillation</h3>
              <div className="text-3xl font-bold text-white">{tourbillonPeriod.toFixed(3)} s</div>
              <div className="text-xs text-slate-500 mt-1">T = 1/f</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Rotation Cage</h3>
              <div className="text-3xl font-bold text-white">60 s</div>
              <div className="text-xs text-slate-500 mt-1">Standard tourbillon</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Paramètres du Tourbillon</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Fréquence: {tourbillonFreq.toLocaleString()} A/h
                </label>
                <input
                  type="range"
                  min="18000"
                  max="36000"
                  step="1800"
                  value={tourbillonFreq}
                  onChange={(e) => setTourbillonFreq(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>18,000</span>
                  <span>21,600</span>
                  <span>28,800</span>
                  <span>36,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Compensation Gravitationnelle</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Le tourbillon compense les effets de la gravité en faisant tourner l'organe régulateur (balancier-spiral + échappement) dans une cage.</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-slate-400 text-xs">Position 1</div>
                  <div className="text-white font-semibold">Cadran haut</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-slate-400 text-xs">Position 2</div>
                  <div className="text-white font-semibold">6H</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-slate-400 text-xs">Position 3</div>
                  <div className="text-white font-semibold">3H / 9H</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendrier Perpétuel */}
      {activeComplication === 'perpetual' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <h3 className="text-sm font-medium text-purple-400 mb-1">Année Sélectionnée</h3>
              <div className="text-3xl font-bold text-white">{perpetualYear}</div>
              <div className="text-xs text-slate-400 mt-1">{isLeapYear(perpetualYear) ? 'Bissextile' : 'Ordinaire'}</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Jours dans l'Année</h3>
              <div className="text-3xl font-bold text-white">{daysInYear}</div>
              <div className="text-xs text-slate-500 mt-1">Calendrier grégorien</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Prochaine Bissextile</h3>
              <div className="text-3xl font-bold text-white">{nextLeapYear || 'N/A'}</div>
              <div className="text-xs text-slate-500 mt-1">Cycle 400 ans</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Sélection de l'Année</h3>
            <input
              type="number"
              min="1900"
              max="2400"
              value={perpetualYear}
              onChange={(e) => setPerpetualYear(parseInt(e.target.value) || 2025)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Règles du Calendrier Grégorien</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <div className="font-medium text-white">Divisible par 4</div>
                  <div className="text-slate-400">Année bissextile (29 jours en février)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <div className="font-medium text-white">Exception: divisible par 100</div>
                  <div className="text-slate-400">Non bissextile (sauf si divisible par 400)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <div className="font-medium text-white">Exception à l'exception: divisible par 400</div>
                  <div className="text-slate-400">Toujours bissextile (ex: 2000, 2400)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Répétition Minutes */}
      {activeComplication === 'repeater' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <h3 className="text-xl font-semibold text-white mb-4">Séquence Sonore</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Heures (Gong grave)</div>
                <div className="text-lg text-white font-semibold">6 coups pour 6h</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Quarts (Combinaison grave/aigu)</div>
                <div className="text-lg text-white font-semibold">3 séquences biphoniques pour 45 min</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Minutes (Gong aigu)</div>
                <div className="text-lg text-white font-semibold">10 coups pour 10 minutes supplémentaires</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Innovations Acoustiques</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Marteaux à Trébuchet (2009)</div>
                <div className="text-slate-400">Accélération et force de frappe optimisées</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Timbres Cristal (2005)</div>
                <div className="text-slate-400">Transmission acoustique via saphir</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Timbres Hélicoïdaux (2019)</div>
                <div className="text-slate-400">Richesse harmonique accrue</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chronographe */}
      {activeComplication === 'chronograph' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <h3 className="text-sm font-medium text-green-400 mb-1">Précision</h3>
              <div className="text-3xl font-bold text-white">1/{(1/chronoAccuracy).toFixed(0)} s</div>
              <div className="text-xs text-slate-400 mt-1">{chronoAccuracy.toFixed(3)} secondes</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Type d'Embrayage</h3>
              <div className="text-2xl font-bold text-white">Vertical</div>
              <div className="text-xs text-slate-500 mt-1">Précision maximale</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-1">Mesures</h3>
              <div className="text-2xl font-bold text-white">1000 cycles</div>
              <div className="text-xs text-slate-500 mt-1">Endurance testée</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Précision de Mesure</h3>
            <input
              type="range"
              min="0.1"
              max="0.2"
              step="0.025"
              value={chronoAccuracy}
              onChange={(e) => setChronoAccuracy(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1/10 s</span>
              <span>1/8 s</span>
              <span>1/5 s</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Types d'Embrayage</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">À Colonnes</div>
                <div className="text-sm text-slate-400">Précision maximale, haute horlogerie</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Vertical</div>
                <div className="text-sm text-slate-400">Moderne, rapide, fiable</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Horizontal</div>
                <div className="text-sm text-slate-400">Traditionnel, robuste</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
