import { useState, useMemo } from 'react'
import { Sparkles, DollarSign, Clock, Award } from 'lucide-react'

interface Finishing {
  id: string
  name: string
  description: string
  time: string
  difficulty: string
  costPerHour: number
  valueAdd: string
}

const finishings: Finishing[] = [
  {
    id: 'anglage',
    name: 'Anglage',
    description: 'Chanfrein poli à 45° sur les arêtes des composants',
    time: '4-8h',
    difficulty: 'Expert',
    costPerHour: 200,
    valueAdd: '5,000-15,000€'
  },
  {
    id: 'cotes',
    name: 'Côtes de Genève',
    description: 'Motif rayé décoratif sur les platines et ponts',
    time: '3-6h',
    difficulty: 'Avancé',
    costPerHour: 180,
    valueAdd: '3,000-10,000€'
  },
  {
    id: 'perlage',
    name: 'Perlage / Œil de Perdrix',
    description: 'Motif circulaire obtenu par bouchonnage',
    time: '2-4h',
    difficulty: 'Intermédiaire',
    costPerHour: 150,
    valueAdd: '2,000-6,000€'
  },
  {
    id: 'guillochage',
    name: 'Guillochage',
    description: 'Gravure géométrique complexe au tour à guillocher',
    time: '6-12h',
    difficulty: 'Expert',
    costPerHour: 250,
    valueAdd: '10,000-50,000€'
  }
]

export default function FinishingSimulator() {
  const [selectedFinishing, setSelectedFinishing] = useState(finishings[0])
  const [hours, setHours] = useState(5)
  const [quality, setQuality] = useState(0.8) // 0-1

  const results = useMemo(() => {
    const baseCost = selectedFinishing.costPerHour * hours
    const qualityMultiplier = 0.5 + (quality * 0.5) // 0.5-1.0
    const totalCost = baseCost * qualityMultiplier
    
    // Estimation valeur ajoutée (milieu de la fourchette)
    const valueRange = selectedFinishing.valueAdd.match(/\d+,?\d*/g)?.map(v => parseInt(v.replace(',', ''))) || [0, 0]
    const avgValue = (valueRange[0] + valueRange[1]) / 2
    
    return {
      laborCost: totalCost.toFixed(0),
      valueAdded: avgValue.toFixed(0),
      roi: ((avgValue / totalCost) * 100).toFixed(0),
      qualityGrade: quality >= 0.8 ? 'Haute Horlogerie' : quality >= 0.6 ? 'Manufacture' : 'Standard'
    }
  }, [selectedFinishing, hours, quality])

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_finishing_simulator.png" alt="Finitions" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Simulateur de Finitions Swiss Made</h2>
          <p className="text-slate-400">Calcul des temps, coûts et valeur ajoutée des finitions artisanales</p>
        </div>
      </div>

      {/* Résultats principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-amber-400" />
            <h3 className="text-sm font-medium text-amber-400">Coût Main-d'œuvre</h3>
          </div>
          <div className="text-4xl font-bold text-white">{results.laborCost} CHF</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-purple-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Valeur Ajoutée</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.valueAdded}€</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-green-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">Grade Qualité</h3>
          </div>
          <div className="text-xl font-bold text-white">{results.qualityGrade}</div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-400" size={20} />
            <h3 className="text-sm font-medium text-slate-400">ROI</h3>
          </div>
          <div className="text-3xl font-bold text-white">{results.roi}%</div>
        </div>
      </div>

      {/* Sélection technique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finishings.map((finishing) => (
          <button
            key={finishing.id}
            onClick={() => setSelectedFinishing(finishing)}
            className={`p-6 rounded-xl border text-left transition-all ${
              selectedFinishing.id === finishing.id
                ? 'bg-amber-500/20 border-amber-500/50'
                : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{finishing.name}</h3>
            <p className="text-sm text-slate-300 mb-3">{finishing.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Temps: {finishing.time}</span>
              <span className="text-amber-400">{finishing.costPerHour} CHF/h</span>
            </div>
          </button>
        ))}
      </div>

      {/* Détails et calculs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres de Finition</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Heures de travail: {hours}h
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1h</span>
                <span>10h</span>
                <span>20h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Niveau de qualité: {(quality * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Standard</span>
                <span>Manufacture</span>
                <span>Haute Horlogerie</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Taux horaire</div>
              <div className="text-2xl font-bold text-white">{selectedFinishing.costPerHour} CHF/h</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Détails de la Technique</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Technique</span>
                <span className="text-white font-medium">{selectedFinishing.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Difficulté</span>
                <span className="text-white font-medium">{selectedFinishing.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Temps recommandé</span>
                <span className="text-white font-medium">{selectedFinishing.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Valeur ajoutée</span>
                <span className="text-white font-medium">{selectedFinishing.valueAdd}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-3">Critères de Qualité</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Continuité et régularité du motif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Absence de rayures parasites</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Profondeur et netteté des traits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Uniformité de la brillance</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-3">Outils Requis</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFinishing.id === 'anglage' && ['Lime douce', 'Pierre à polir', 'Loupe binoculaire'].map(tool => (
                <span key={tool} className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm text-slate-300">{tool}</span>
              ))}
              {selectedFinishing.id === 'cotes' && ['Machine à rayer', 'Cabrons', 'Papier abrasif'].map(tool => (
                <span key={tool} className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm text-slate-300">{tool}</span>
              ))}
              {selectedFinishing.id === 'perlage' && ['Bouchon', 'Pâte à perler', 'Tour'].map(tool => (
                <span key={tool} className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm text-slate-300">{tool}</span>
              ))}
              {selectedFinishing.id === 'guillochage' && ['Tour à guillocher', 'Burins', 'Cires'].map(tool => (
                <span key={tool} className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm text-slate-300">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
