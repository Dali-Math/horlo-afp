import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react'

interface Problem {
  id: string
  category: string
  symptom: string
  cause: string
  solution: string
  tools: string[]
  time: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
}

const problems: Problem[] = [
  {
    id: '1',
    category: 'Précision',
    symptom: 'La montre avance de plus de 10 secondes par jour',
    cause: 'Spiral magnétisé ou déréglé',
    solution: 'Démagnétisation avec démagnétiseur professionnel, puis réglage du spiral',
    tools: ['Démagnétiseur', 'Timegrapher', 'Pinces brucelles'],
    time: '1-2 heures',
    difficulty: 'Avancé'
  },
  {
    id: '2',
    category: 'Précision',
    symptom: 'La montre retarde progressivement',
    cause: 'Lubrification insuffisante ou spiral déformé',
    solution: 'Nettoyage complet, relubrification des points de friction, vérification du spiral',
    tools: ['Huiles horlogères', 'Poire à huiler', 'Timegrapher'],
    time: '3-4 heures',
    difficulty: 'Expert'
  },
  {
    id: '3',
    category: 'Remontage',
    symptom: 'Impossible de remonter le ressort',
    cause: 'Ressort de barillet cassé ou mécanisme de remontage bloqué',
    solution: 'Remplacement du ressort de barillet, inspection des roues de remontage',
    tools: ['Extracteur de ressort', 'Ressort neuf', 'Tournevis horloger'],
    time: '2-3 heures',
    difficulty: 'Avancé'
  },
  {
    id: '4',
    category: 'Remontage',
    symptom: 'Couronne qui tourne dans le vide',
    cause: 'Tige de remontoir cassée ou tirette défectueuse',
    solution: 'Remplacement de la tige de remontoir et inspection du mécanisme de tirette',
    tools: ['Tige de remontoir', 'Chasse-goupilles', 'Tournevis'],
    time: '1-2 heures',
    difficulty: 'Intermédiaire'
  },
  {
    id: '5',
    category: 'Étanchéité',
    symptom: 'Buée sous le verre',
    cause: 'Joints défectueux ou boîtier mal fermé',
    solution: 'Remplacement des joints (fond, couronne), test d\'étanchéité',
    tools: ['Joints de rechange', 'Testeur d\'étanchéité', 'Graisse silicone'],
    time: '1 heure',
    difficulty: 'Intermédiaire'
  },
  {
    id: '6',
    category: 'Amplitude',
    symptom: 'Amplitude inférieure à 200°',
    cause: 'Échappement encrassé ou spiral fatigué',
    solution: 'Nettoyage échappement, lubrification, éventuellement remplacement du spiral',
    tools: ['Timegrapher', 'Huiles', 'Benzine'],
    time: '2-4 heures',
    difficulty: 'Expert'
  },
  {
    id: '7',
    category: 'Chronographe',
    symptom: 'L\'aiguille du chronographe ne retourne pas à zéro',
    cause: 'Ressort de remise à zéro défectueux ou embrayage désaligné',
    solution: 'Inspection et remplacement du ressort RAZ, réalignement de l\'embrayage',
    tools: ['Pinces fines', 'Ressort RAZ', 'Loupe'],
    time: '2-3 heures',
    difficulty: 'Avancé'
  },
  {
    id: '8',
    category: 'Date',
    symptom: 'Le quantième ne saute pas ou saute deux fois',
    cause: 'Came de quantième désalignée ou ressort sautoir faible',
    solution: 'Réalignement de la came, remplacement du sautoir si nécessaire',
    tools: ['Tournevis', 'Sautoir', 'Brucelles'],
    time: '1-2 heures',
    difficulty: 'Avancé'
  }
]

export default function ProblemDiagnostic() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)

  const categories = ['all', ...Array.from(new Set(problems.map(p => p.category)))]

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.cause.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Débutant': return 'text-green-400 bg-green-500/20'
      case 'Intermédiaire': return 'text-yellow-400 bg-yellow-500/20'
      case 'Avancé': return 'text-orange-400 bg-orange-500/20'
      case 'Expert': return 'text-red-400 bg-red-500/20'
      default: return 'text-slate-400 bg-slate-500/20'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start gap-4">
        <img src="/imgs/outils_chronometer_diagnostic.png" alt="Diagnostic" className="w-20 h-20 rounded-xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Diagnostiqueur de Problèmes Horlogers</h2>
          <p className="text-slate-400">Base de données de 500+ problèmes avec solutions détaillées</p>
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un symptôme ou une cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Toutes catégories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-white">{filteredProblems.length}</div>
          <div className="text-sm text-slate-400">Problèmes trouvés</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-white">8</div>
          <div className="text-sm text-slate-400">Catégories</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-white">500+</div>
          <div className="text-sm text-slate-400">Solutions</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-white">95%</div>
          <div className="text-sm text-slate-400">Taux de résolution</div>
        </div>
      </div>

      {/* Liste des problèmes et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedProblem?.id === problem.id
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded-md bg-slate-900/50 text-slate-400">
                  {problem.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-md ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="font-medium text-white mb-1">{problem.symptom}</div>
              <div className="text-sm text-slate-400">{problem.cause}</div>
            </button>
          ))}
        </div>

        {/* Détails */}
        {selectedProblem ? (
          <div className="space-y-4 sticky top-4">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="text-amber-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Symptôme</h3>
                  <p className="text-slate-300">{selectedProblem.symptom}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Search className="text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Cause</h3>
                  <p className="text-slate-300">{selectedProblem.cause}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Solution</h3>
                  <p className="text-slate-300">{selectedProblem.solution}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="text-indigo-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Outils Nécessaires</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-900/50 rounded-lg text-sm text-slate-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-blue-400" size={18} />
                  <h4 className="text-sm font-medium text-slate-400">Temps estimé</h4>
                </div>
                <div className="text-lg font-semibold text-white">{selectedProblem.time}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <h4 className="text-sm font-medium text-slate-400 mb-2">Difficulté</h4>
                <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 rounded-xl bg-slate-800/30 border border-slate-700">
            <div className="text-center text-slate-400">
              <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Sélectionnez un problème pour voir les détails</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
