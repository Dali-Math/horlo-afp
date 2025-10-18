'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Award } from 'lucide-react'

export default function RouagePage() {
  const [isDark, setIsDark] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quizQuestions = [
    {
      question: "Quelle est la fonction principale du train de rouage ?",
      options: [
        "Stocker l'énergie",
        "Transmettre l'énergie du barillet à l'échappement",
        "Régler la précision",
        "Afficher l'heure"
      ],
      correct: 1
    },
    {
      question: "Le rouage de finissage est un rouage :",
      options: [
        "Réducteur",
        "Multiplicatif",
        "Stable",
        "Inverseur"
      ],
      correct: 1
    },
    {
      question: "Combien de mobiles compose généralement un train de rouage standard ?",
      options: [
        "2 mobiles",
        "3 mobiles",
        "4 mobiles",
        "5 mobiles"
      ],
      correct: 2
    },
    {
      question: "Le pignon de l'ancre engrène avec :",
      options: [
        "La roue de barillet",
        "La roue de centre",
        "La roue de secondes",
        "La roue d'échappement"
      ],
      correct: 3
    },
    {
      question: "Quelle formule permet de calculer le rapport de transmission ?",
      options: [
        "Nombre de dents menées / menantes",
        "Produit des dents menantes / menées",
        "Somme des dents / nombre de roues",
        "Vitesse angulaire × nombre de dents"
      ],
      correct: 1
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
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Le Rouage
            </h1>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              {isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
            </button>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Le train d'engrenages qui transmet l'énergie dans la montre mécanique
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section 1: Définition et fonction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Définition et Fonction
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le <strong>rouage</strong> (ou train d'engrenages) est l'ensemble des roues dentées et pignons qui transmettent l'énergie du barillet vers l'échappement dans une montre mécanique[web:1][web:3]. Il constitue le système de transmission cinématique central du mouvement horloger[web:2].
            </p>
            <p>
              Le rouage transforme le flux d'énergie continu provenant du ressort moteur en un mouvement régulé et précis[web:1]. Chaque engrenage est conçu et apparié avec précision pour réguler le mouvement et la vitesse de transmission[web:3][web:8].
            </p>
            <p>
              Le train de rouage commence au niveau du ressort dans le barillet et se termine à l'échappement[web:3]. Chaque roue du train est reliée à une autre par l'intermédiaire de pignons, ce qui permet de réduire progressivement la vitesse de transfert de l'énergie[web:3][web:4].
            </p>
          </div>
        </motion.section>

        {/* Section 2: Le rouage de finissage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Le Rouage de Finissage
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le <strong>rouage de finissage</strong> est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique[web:2]. Cette accélération progressive est essentielle pour atteindre la fréquence d'oscillation nécessaire au balancier[web:17].
            </p>
            <p>
              Le rouage de finissage divise l'unité de temps donnée par l'oscillateur (ensemble balancier-spiral-échappement) pour créer les indications des heures, minutes et secondes[web:17]. Il est composé de plusieurs mobiles successifs qui multiplient la vitesse de rotation[web:2].
            </p>
            <p>
              L'efficience du train de rouage permet aux mouvements modernes de fonctionner à des fréquences élevées (jusqu'à 5 Hz pour certains calibres) tout en offrant un remarquable niveau de performance[web:20].
            </p>
          </div>
        </motion.section>

        {/* Section 3: Composition du train de rouage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Composition du Train
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Un train de rouage standard se compose généralement de <strong>quatre mobiles principaux</strong>[web:1][web:4]. Chaque mobile est constitué d'une roue dentée et d'un pignon qui engrène avec la roue suivante[web:5].
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'} my-6`}>
              <h3 className="font-bold text-xl mb-4">Les mobiles du rouage :</h3>
              <ul className="space-y-3">
                <li><strong>1. Grand mobile (roue de centre)</strong> : fait 1 tour/heure, porte l'aiguille des minutes</li>
                <li><strong>2. Moyen mobile (roue moyenne)</strong> : intermédiaire de transmission</li>
                <li><strong>3. Mobile de seconde</strong> : fait 1 tour/minute, porte l'aiguille des secondes</li>
                <li><strong>4. Mobile d'échappement</strong> : transmet l'énergie à l'ancre</li>
              </ul>
            </div>
            <p>
              Dans le rouage, un engrenage se compose d'une roue dont les dents pénètrent entre les dents (appelées ailes) d'un pignon[web:5]. Cette interaction mécanique permet une transmission précise du mouvement et du couple moteur[web:4].
            </p>
          </div>
        </motion.section>

        {/* Section 4: Calcul du rapport de transmission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Rapport de Transmission
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Dans un train d'engrenages simple, le <strong>rapport de transmission</strong> est égal au produit des nombres de dents des roues menantes divisé par celui des roues menées[web:4]. Cette formule mathématique permet de calculer précisément les vitesses de rotation[web:4].
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-indigo-50'} my-6`}>
              <p className="text-center text-xl mb-2">Formule du rapport de transmission :</p>
              <p className="text-center text-2xl font-mono">
                ω<sub>sortie</sub> / ω<sub>entrée</sub> = (∏ Z<sub>menantes</sub>) / (∏ Z<sub>menées</sub>)
              </p>
              <p className="text-sm mt-4 text-center">
                Où ω représente la vitesse angulaire et Z le nombre de dents
              </p>
            </div>
            <p>
              Ce calcul permet aux horlogers de concevoir des trains de rouage qui produisent exactement les rapports de vitesse nécessaires pour une mesure précise du temps[web:4]. La précision de ces engrenages est cruciale pour la fiabilité de la montre[web:3].
            </p>
          </div>
        </motion.section>

        {/* Section 5: Le rouage des minutes et la minuterie */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Rouage et Minuterie
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le <strong>rouage des minutes</strong> est un système spécifique qui transmet la rotation du pignon des minutes à l'aiguille des heures[web:4]. Ce mécanisme assure que l'aiguille des heures tourne 12 fois plus lentement que celle des minutes[web:4].
            </p>
            <p>
              La minuterie est un ensemble d'engrenages situé côté cadran qui permet l'affichage des heures[web:4]. Elle reçoit le mouvement de la roue de centre (qui fait un tour par heure) et le démultiplie pour actionner l'aiguille des heures[web:4].
            </p>
            <p>
              Les rouages transmettent également le couple moteur et le mouvement de l'organe moteur vers d'autres éléments du mécanisme, comme les complications horlogères (quantième, phases de lune, chronographe)[web:4]. Cette transmission doit être à la fois efficace et précise pour garantir le bon fonctionnement de toutes les fonctions[web:8].
            </p>
          </div>
        </motion.section>

        {/* Section 6: Importance et précision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-blue-600" />
            Précision et Qualité
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              La qualité du rouage est déterminante pour la <strong>précision</strong> et la fiabilité d'une montre mécanique[web:3]. Chaque engrenage doit être usiné avec une tolérance de l'ordre du micromètre pour assurer une transmission optimale[web:5].
            </p>
            <p>
              Le mouvement final des engrenages est converti en un tic-tac régulier de la montre qui donne une heure précise[web:3]. Toute imperfection dans la conception ou la fabrication du rouage peut entraîner des variations de marche et affecter la précision chronométrique[web:8].
            </p>
            <p>
              Les manufactures horlogères suisses investissent massivement dans la recherche et le développement de nouveaux matériaux et designs pour améliorer l'efficacité des trains de rouage[web:20]. L'utilisation de nouveaux alliages, de traitements de surface et de géométries optimisées permet de réduire les frottements et d'augmenter la réserve de marche[web:20].
            </p>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Award className="mr-3 text-yellow-500" />
            Quiz de Certification
          </h2>
          
          {!showResults ? (
            <div className="space-y-6">
              {quizQuestions.map((q, index) => (
                <div key={index} className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <p className="font-bold text-lg mb-4">{index + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optIndex}
                          onChange={(e) => setQuizAnswers({...quizAnswers, [index]: e.target.value})}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider mes réponses
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${
                score >= 4 ? 'text-green-500' : score >= 3 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {score}/{quizQuestions.length}
              </div>
              <p className="text-2xl mb-6">
                {score >= 4 ? '🎉 Excellent ! Vous maîtrisez le rouage !' :
                 score >= 3 ? '👍 Bien ! Continuez à apprendre.' :
                 '📚 Relisez le cours pour améliorer vos connaissances.'}
              </p>
              <button
                onClick={() => {
                  setShowResults(false)
                  setQuizAnswers({})
                  setScore(0)
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Recommencer le quiz
              </button>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  )
}
