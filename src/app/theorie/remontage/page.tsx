'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Award, AlertCircle } from 'lucide-react'

export default function RemontagePage() {
  const [isDark, setIsDark] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quizQuestions = [
    {
      question: "Dans quel sens faut-il tourner la couronne pour remonter une montre ?",
      options: [
        "Dans le sens antihoraire",
        "Dans le sens des aiguilles d'une montre",
        "Dans les deux sens",
        "Cela dépend de la marque"
      ],
      correct: 1
    },
    {
      question: "Combien de tours de couronne sont généralement nécessaires pour remonter complètement une montre automatique ?",
      options: [
        "10 à 15 tours",
        "20 à 30 tours",
        "30 à 40 tours",
        "50 à 60 tours"
      ],
      correct: 2
    },
    {
      question: "Quelle est la durée de fonctionnement typique d'une montre mécanique entièrement remontée ?",
      options: [
        "24 heures",
        "48 heures",
        "72 heures",
        "96 heures"
      ],
      correct: 2
    },
    {
      question: "Comment se recharge une montre automatique lorsqu'elle est portée ?",
      options: [
        "Par la chaleur corporelle",
        "Par les mouvements du poignet",
        "Par la lumière ambiante",
        "Par l'électricité statique"
      ],
      correct: 1
    },
    {
      question: "Pourquoi ne faut-il jamais remonter une montre lorsqu'elle est au poignet ?",
      options: [
        "Cela réduit la précision",
        "Cela peut plier la tige et la couronne",
        "Cela use le ressort plus rapidement",
        "Cela crée de la condensation"
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
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Le Remontage
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
            Comment remonter et entretenir votre montre mécanique
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section 1: Types de remontage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Types de Remontage
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Les montres mécaniques nécessitent un <strong>remontage régulier</strong> pour fonctionner[web:6]. Il existe deux principaux types de remontage : le remontage manuel et le remontage automatique[web:6][web:14].
            </p>
            <p>
              Les <strong>montres à remontage manuel</strong> doivent être remontées quotidiennement par rotation de la couronne[web:6]. Ce type de montre offre une connexion directe avec le mécanisme et permet à l'utilisateur de sentir la tension du ressort moteur[web:12].
            </p>
            <p>
              Les <strong>montres automatiques</strong> (ou à remontage automatique) se remontent grâce aux mouvements naturels du poignet de celui qui la porte[web:6][web:9]. Un rotor oscillant, fixé au mouvement, tourne librement et transfère cette énergie cinétique au ressort moteur[web:14]. Cependant, elles peuvent également être remontées manuellement par la couronne si nécessaire[web:9][web:12].
            </p>
          </div>
        </motion.section>

        {/* Section 2: Procédure de remontage manuel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Procédure de Remontage
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-green-900' : 'bg-green-50'} mb-6`}>
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-green-600 flex-shrink-0 mt-1" />
                <p className="font-semibold">
                  Règle d'or : Ne jamais remonter une montre lorsqu'elle est au poignet
                </p>
              </div>
            </div>
            <p>
              <strong>Étape 1 :</strong> Enlevez votre montre et tenez-la fermement dans une main[web:6]. Remonter une montre portée au poignet exerce une force excessive sur la tige et la couronne de remontage, risquant de plier ces pièces délicates[web:6][web:18].
            </p>
            <p>
              <strong>Étape 2 :</strong> Assurez-vous que la couronne est enfoncée en position neutre, c'est-à-dire le plus près possible du boîtier[web:6][web:12]. Pour les montres à couronne vissée, dévissez d'abord la couronne avant de procéder au remontage[web:12][web:15].
            </p>
            <p>
              <strong>Étape 3 :</strong> Tournez lentement la couronne dans le sens des aiguilles d'une montre[web:6][web:9]. La montre ne peut pas être remontée en tournant la couronne dans le sens antihoraire[web:9]. Pour une montre automatique, une trentaine de tours suffit généralement[web:12]. Pour une montre manuelle, comptez entre 20 et 40 tours selon le modèle[web:12][web:15].
            </p>
            <p>
              <strong>Étape 4 :</strong> Le remontage est achevé lorsque vous sentez une légère résistance[web:6][web:15]. N'insistez pas une fois que vous ressentez cette résistance pour éviter d'endommager le mécanisme[web:18].
            </p>
          </div>
        </motion.section>

        {/* Section 3: Le remontage automatique */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Remontage Automatique
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Une montre automatique se recharge continuellement grâce aux <strong>mouvements naturels du poignet</strong>[web:9][web:14]. Le système utilise un rotor qui oscille d'un côté à l'autre, activant un jeu d'engrenages qui transfère l'énergie au ressort moteur[web:14].
            </p>
            <p>
              Contrairement à une montre manuelle, il est <strong>impossible de trop remonter</strong> une montre automatique[web:12]. Un système de sécurité automatique désengage le rotor une fois que le ressort est comprimé au maximum, protégeant ainsi le mécanisme[web:12].
            </p>
            <p>
              Pour qu'une montre automatique reste chargée, il est recommandé de la porter <strong>plus de 10 heures par jour</strong>[web:9]. Si la montre est utilisée sans être portée au poignet pendant plusieurs jours, il est nécessaire de la remonter manuellement avant de la remettre[web:9][web:12].
            </p>
            <p>
              Lorsqu'une montre automatique est remontée avec le ressort principal déroulé, l'aiguille des secondes ne démarre pas immédiatement[web:9]. Cela est dû au fait que le couple (force) du ressort est faible en début de remontage, une caractéristique normale des montres mécaniques[web:9]. Faire osciller la montre d'un côté à l'autre peut aider à la faire démarrer plus rapidement[web:9].
            </p>
          </div>
        </motion.section>

        {/* Section 4: Réserve de marche */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Réserve de Marche
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              La <strong>réserve de marche</strong> désigne la durée pendant laquelle une montre mécanique peut fonctionner une fois entièrement remontée[web:9]. Pour la plupart des montres mécaniques modernes, cette durée est d'environ 72 heures (3 jours)[web:9].
            </p>
            <p>
              Cette autonomie de 72 heures permet à une montre de continuer à fonctionner pendant un week-end complet sans être portée[web:9]. Certains modèles haut de gamme peuvent offrir des réserves de marche plus longues, allant jusqu'à 7 jours ou plus[web:20].
            </p>
            <p>
              Si la montre est utilisée sans être complètement remontée, elle risque d'avancer ou de retarder car le couple fourni par le ressort est insuffisant[web:9]. Pour éviter ce problème, il est recommandé de remonter complètement la montre chaque jour à une heure précise si elle n'est pas portée régulièrement[web:9].
            </p>
            <p>
              Certaines montres modernes disposent d'un <strong>indicateur de réserve de marche</strong> sur le cadran, permettant de visualiser l'énergie restante dans le ressort moteur[web:20]. Cette complication horlogère aide l'utilisateur à savoir quand remonter sa montre[web:18].
            </p>
          </div>
        </motion.section>

        {/* Section 5: Positions de la couronne */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Positions de la Couronne
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              La couronne d'une montre est traditionnellement située sur la droite du boîtier à 3 heures[web:12]. Elle peut occuper <strong>différentes positions</strong> qui activent des fonctions spécifiques[web:12][web:18].
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-emerald-50'} my-6`}>
              <h3 className="font-bold text-xl mb-4">Les trois positions principales :</h3>
              <ul className="space-y-3">
                <li><strong>Position 0 (vissée)</strong> : couronne verrouillée pour les montres étanches</li>
                <li><strong>Position 1 (enfoncée)</strong> : remontage du ressort moteur</li>
                <li><strong>Position 2 (tirée d'un cran)</strong> : réglage de la date et du jour</li>
                <li><strong>Position 3 (tirée complètement)</strong> : réglage de l'heure</li>
              </ul>
            </div>
            <p>
              Pour remonter la montre, il est impératif de rester en <strong>position 1</strong> avec la couronne parfaitement enfoncée[web:12]. Toute manipulation de la couronne dans une autre position activera les fonctions de réglage au lieu du remontage[web:18].
            </p>
            <p>
              Afin de garantir l'étanchéité de certaines montres, la couronne est parfois vissée (position 0)[web:12]. Pour ces montres, il convient de dévisser la couronne avant toute manipulation, puis de la revisser après utilisation pour maintenir l'étanchéité[web:12][web:15].
            </p>
          </div>
        </motion.section>

        {/* Section 6: Conseils et précautions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-green-600" />
            Conseils et Précautions
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le remontage d'une montre mécanique doit être effectué avec <strong>douceur et régularité</strong>[web:18]. Des gestes brusques ou forcés peuvent endommager le mécanisme délicat du mouvement[web:6][web:18].
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-red-900' : 'bg-red-50'} my-6 border-l-4 ${isDark ? 'border-red-600' : 'border-red-500'}`}>
              <h3 className="font-bold text-xl mb-3 text-red-600">À éviter absolument :</h3>
              <ul className="space-y-2">
                <li>❌ Remonter la montre au poignet</li>
                <li>❌ Forcer la couronne une fois la résistance sentie</li>
                <li>❌ Tourner la couronne dans le sens antihoraire pour remonter</li>
                <li>❌ Régler la date entre 21h et 3h du matin</li>
                <li>❌ Manipuler la couronne avec des mains humides ou sales</li>
              </ul>
            </div>
            <p>
              Pour une <strong>longévité optimale</strong>, il est conseillé de remonter votre montre à la même heure chaque jour[web:9]. Cette routine assure un niveau d'énergie constant dans le ressort moteur et contribue à une meilleure précision chronométrique[web:18].
            </p>
            <p>
              Si vous possédez plusieurs montres automatiques que vous ne portez pas quotidiennement, l'utilisation d'un <strong>remontoir automatique</strong> peut être envisagée[web:18]. Ce dispositif maintient les montres en mouvement lorsqu'elles ne sont pas portées, préservant ainsi leur charge et évitant l'arrêt du mécanisme[web:18].
            </p>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gradient-to-br from-green-900 to-emerald-900' : 'bg-gradient-to-br from-green-100 to-emerald-100'
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
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                {score >= 4 ? '🎉 Excellent ! Vous savez remonter votre montre !' :
                 score >= 3 ? '👍 Bien ! Continuez à apprendre.' :
                 '📚 Relisez le cours pour améliorer vos connaissances.'}
              </p>
              <button
                onClick={() => {
                  setShowResults(false)
                  setQuizAnswers({})
                  setScore(0)
                }}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
