'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, Landmark, Factory, TrendingUp, AlertTriangle, Award, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function HistoirePage() {
  const [isDark, setIsDark] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quizQuestions = [
    {
      question: "Qui est le père fondateur de l'horlogerie suisse ?",
      options: [
        "Jean Calvin",
        "Daniel Jean-Richard",
        "Abraham-Louis Breguet",
        "Frédéric Ingold"
      ],
      correct: 1
    },
    {
      question: "Ville de naissance de l'horlogerie au 16ème ?",
      options: [
        "Berne",
        "Zurich",
        "Genève",
        "Bâle"
      ],
      correct: 2
    },
    {
      question: "Qu'est-ce que l'établissage ?",
      options: [
        "Technique de polissage",
        "Sous-traitance spécialisée",
        "Mouvement horloger",
        "Méthode de remontage"
      ],
      correct: 1
    },
    {
      question: "Production suisse mondiale en 1960 ?",
      options: [
        "30%",
        "45%",
        "60%",
        "75%"
      ],
      correct: 2
    },
    {
      question: "Réforme ayant favorisé l'horlogerie ?",
      options: [
        "Catholicisme",
        "Luthéranisme",
        "Calvinisme",
        "Anglicanisme"
      ],
      correct: 2
    }
  ]

  const handleQuizSubmit = () => {
    let correctCount = 0
    quizQuestions.forEach((q, index) => {
      if (parseInt(quizAnswers[index]) === q.correct) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-gray-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Header Minimal et Professionnel */}
      <header className={`${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} shadow-sm border-b sticky top-0 z-50 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link 
                href="/theorie" 
                className={`text-sm mb-2 inline-flex items-center ${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'} transition-colors font-medium`}
              >
                ← Théorie
              </Link>
              <h1 className="text-4xl font-bold mt-1 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Histoire de l'Horlogerie Suisse
              </h1>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Layout avec Sidebar Quiz */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex gap-8">
          
          {/* Contenu Principal */}
          <div className="flex-1">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-12 p-6 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <p className="text-lg leading-relaxed">
                La Suisse est le pays de l'horlogerie par excellence. Près de <strong>350 ans de tradition</strong> ont façonné une industrie symbole du « Swiss Made », synonyme de qualité, précision et excellence mondiale[web:7][web:10].
              </p>
            </motion.div>

            {/* Section 1: Origines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                  <Landmark className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Les Origines (16ème siècle)</h2>
                  <p className="text-sm text-amber-600 font-medium">Genève et la Réforme</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  L'industrie horlogère suisse naît à <strong>Genève au milieu du 16ème siècle</strong>, suite à la réforme protestante menée par Jean Calvin[web:10][web:56]. Cette naissance est intimement liée à des événements religieux transformant le paysage économique de la ville[web:7].
                </p>
                <p>
                  En 1541, Jean Calvin (1509-1564) s'établit à Genève et réforme les lois, notamment l'<strong>interdiction des objets ornementaux ostentatoires</strong> comme les bijoux[web:10][web:13]. Les orfèvres et joailliers se tournent alors vers l'horlogerie[web:10][web:56].
                </p>
                <p>
                  Cette reconversion explique pourquoi les montres suisses ont toujours été caractérisées par une <strong>finition exceptionnelle</strong> héritée des traditions d'orfèvrerie[web:10][web:62].
                </p>
              </div>
            </motion.section>

            {/* Section 2: Bressel */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Bressel, le Père Fondateur (17ème)</h2>
                  <p className="text-sm text-blue-600 font-medium">Daniel Jean-Richard</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  <strong>Daniel Jean-Richard</strong>, dit "Bressel", horloger jurassien né en 1665, dévoile la <strong>première montre suisse en 1681</strong>[web:7][web:53]. Bien qu'inspirée d'un modèle anglais, Bressel adapte et améliore les techniques existantes[web:7].
                </p>
                <p>
                  Figure tutélaire de l'horlogerie jurassienne, il devient le <strong>symbole de la tradition suisse</strong> et le garant du principe de l'établissage[web:7]. L'horlogerie se développe ensuite dans l'arc jurassien par l'émigration d'artisans spécialisés[web:19][web:53].
                </p>
              </div>
            </motion.section>

            {/* Section 3: Établissage */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                  <Factory className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">L'Établissage</h2>
                  <p className="text-sm text-emerald-600 font-medium">Production Révolutionnaire</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  L'<strong>établissage</strong> divise la production en petites entités indépendantes très spécialisées, assemblées au dernier moment dans un "comptoir"[web:7][web:53]. Ce système permet une <strong>spécialisation extrême</strong> et un savoir-faire inégalable[web:7].
                </p>
                <div className={`grid grid-cols-2 gap-4 my-6 p-5 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <div>
                    <p className="font-semibold mb-2 text-emerald-600">Avantages techniques</p>
                    <ul className="text-sm space-y-1">
                      <li>• Spécialisation extrême</li>
                      <li>• Qualité optimale</li>
                      <li>• Innovation constante</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-amber-600">Avantages sociaux</p>
                    <ul className="text-sm space-y-1">
                      <li>• Travail à domicile</li>
                      <li>• Revenus hivernaux</li>
                      <li>• Emploi familial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Âge d'Or */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Industrialisation et Âge d'Or</h2>
                  <p className="text-sm text-blue-600 font-medium">19ème - 20ème Siècle</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  La <strong>mécanisation</strong> au début du 20ème siècle permet à la Suisse de passer à une production en série tout en maintenant l'excellence[web:10][web:53]. Dans les <strong>années 1960</strong>, l'apogée : <strong>60% de la production mondiale</strong> est suisse[web:16][web:10].
                </p>
                <div className={`text-center p-6 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'} my-6`}>
                  <div className="text-5xl font-bold text-blue-600 mb-2">60%</div>
                  <p className="text-sm font-medium">Production horlogère mondiale (1960)</p>
                </div>
                <p>
                  Le label <strong>"Swiss Made"</strong> devient synonyme de qualité, précision et excellence dans l'imaginaire collectif mondial[web:10][web:58].
                </p>
              </div>
            </motion.section>

            {/* Section 5: Crise du Quartz */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Crises et Résilience</h2>
                  <p className="text-sm text-red-600 font-medium">1970-1980 : Crise du Quartz</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  La <strong>crise du quartz</strong> (1970-1980) menace l'existence de l'industrie suisse avec l'arrivée des montres japonaises électroniques[web:16][web:62]. C'est une hécatombe : de 90 000 à 30 000 emplois, plus de 1000 fabricants disparus[web:7].
                </p>
                <div className={`grid grid-cols-3 gap-4 my-6 p-5 rounded-lg ${isDark ? 'bg-red-900/10 border border-red-800/30' : 'bg-red-50 border border-red-200'}`}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">-60k</div>
                    <p className="text-xs mt-1">Emplois perdus</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">1000+</div>
                    <p className="text-xs mt-1">Fabricants disparus</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">13 ans</div>
                    <p className="text-xs mt-1">Durée de crise</p>
                  </div>
                </div>
                <p>
                  La Suisse se réinvente en se repositionnant sur le <strong>luxe et la haute horlogerie mécanique</strong>[web:16][web:57], mettant en avant son savoir-faire artisanal et son héritage[web:10][web:62].
                </p>
              </div>
            </motion.section>

            {/* Section 6: Aujourd'hui */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`mb-10 p-8 rounded-xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">L'Excellence Suisse Aujourd'hui</h2>
                  <p className="text-sm text-emerald-600 font-medium">21ème Siècle</p>
                </div>
              </div>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Aujourd'hui, la Suisse domine le <strong>marché mondial du luxe horloger</strong>[web:10][web:57]. Les manufactures investissent massivement en R&D : nouveaux matériaux (silicium, céramique), mouvements perfectionnés, complications sophistiquées[web:57][web:62].
                </p>
                <div className={`grid grid-cols-3 gap-3 my-6`}>
                  <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-xs font-semibold">Luxe Premium</p>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
                    <div className="text-2xl mb-2">🔬</div>
                    <p className="text-xs font-semibold">Innovation</p>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
                    <div className="text-2xl mb-2">🏛️</div>
                    <p className="text-xs font-semibold">Héritage</p>
                  </div>
                </div>
                <p>
                  Le label <strong>"Swiss Made"</strong> garantit 60% minimum de valeur suisse, assemblage final et contrôle qualité en Suisse[web:58][web:61]. L'horlogerie suisse représente une success story unique où tradition et innovation coexistent[web:10][web:57].
                </p>
              </div>
            </motion.section>

          </div>

          {/* Sidebar Quiz Compact */}
          <div className="w-80 flex-shrink-0">
            <div className={`sticky top-24 p-6 rounded-xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            } shadow-lg`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Quiz de Certification
              </h3>
              
              {!showResults ? (
                <div className="space-y-4">
                  {quizQuestions.map((q, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                    }`}>
                      <p className="font-semibold text-sm mb-3">{index + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-start gap-2 cursor-pointer text-sm">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={optIndex}
                              onChange={(e) => setQuizAnswers({...quizAnswers, [index]: e.target.value})}
                              className="mt-0.5 text-blue-600"
                            />
                            <span className="leading-tight">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Valider
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className={`text-5xl font-bold mb-4 ${
                    score >= 4 ? 'text-green-500' : score >= 3 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {score}/5
                  </div>
                  <p className="text-lg font-bold mb-2">
                    {score >= 4 ? '🏆 Excellent !' :
                     score >= 3 ? '👍 Bien !' :
                     '📚 À revoir'}
                  </p>
                  <p className="text-xs mb-6 text-slate-600 dark:text-slate-400">
                    {score >= 4 ? "Parfaite maîtrise !" :
                     score >= 3 ? 'Bonnes connaissances' :
                     'Relisez le cours'}
                  </p>
                  <button
                    onClick={() => {
                      setShowResults(false)
                      setQuizAnswers({})
                      setScore(0)
                    }}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                  >
                    Recommencer
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
