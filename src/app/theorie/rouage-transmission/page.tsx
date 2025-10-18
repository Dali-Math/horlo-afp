'use client'

import { useState } from 'react'
import { ArrowLeft, Cog, Settings, Zap, GitBranch, Gauge, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function RouagePage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizQuestions = [
    {
      question: "Quel est le rôle principal du rouage de finissage ?",
      options: [
        "Réguler la vitesse du balancier",
        "Transmettre l'énergie du barillet à l'échappement",
        "Remonter le ressort moteur",
        "Afficher uniquement les heures"
      ],
      correct: 1
    },
    {
      question: "Combien de mobiles compose généralement un rouage de finissage ?",
      options: [
        "2 mobiles",
        "3 mobiles",
        "5 mobiles",
        "7 mobiles"
      ],
      correct: 1
    },
    {
      question: "De quoi se compose un mobile horloger ?",
      options: [
        "D'une roue uniquement",
        "D'un pignon uniquement",
        "D'une roue et d'un pignon",
        "D'un ressort et d'une roue"
      ],
      correct: 2
    },
    {
      question: "En quel matériau sont généralement fabriqués les pignons modernes ?",
      options: [
        "Laiton",
        "Bronze",
        "Acier",
        "Titane"
      ],
      correct: 2
    },
    {
      question: "Quel mobile porte généralement l'aiguille des minutes ?",
      options: [
        "Le mobile de moyenne",
        "Le mobile de secondes",
        "Le mobile de centre",
        "Le mobile d'échappement"
      ],
      correct: 2
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setShowQuiz(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/theorie"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la théorie
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Le Rouage de Transmission
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            L'organe multiplicateur qui transmet l'énergie et divise le temps
          </p>
        </div>

        {!showQuiz ? (
          <>
            {/* Section 1 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Cog className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Définition et Fonction</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le rouage de finissage, aussi appelé système de transmission ou train de rouage, est l'organe de transmission du mouvement mécanique. Son rôle principal est de transmettre l'énergie provenant du barillet jusqu'à l'organe régulateur via l'échappement. Il est composé d'un nombre variable de mobiles, généralement trois, qui permettent de distribuer par leurs différentes vitesses de rotation les informations à l'affichage (heures, minutes, secondes).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le rouage a trois fonctions essentielles : transmettre l'énergie du barillet vers la roue d'échappement, diviser le temps en unités mesurables, et faire tourner les différents affichages de l'heure, des minutes et des secondes. Sans ce système ingénieux, aucune montre mécanique ne pourrait fonctionner correctement.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Composition des Mobiles</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Chaque mobile se compose de deux éléments solidaires : un pignon en acier, dont les dents sont appelées « ailes », et une roue généralement en laiton, également dentée sur sa circonférence. Le pignon représente l'axe du mobile et la planche de la roue y est rivée de manière solidaire. Cette construction garantit qu'ils tournent ensemble à la même vitesse.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                L'utilisation de l'acier pour les pignons remonte au milieu du 18ème siècle, remplaçant le fer utilisé auparavant. L'acier offre de meilleurs résultats en termes de friction, de résistance à l'usure et à la corrosion, contribuant ainsi à la longévité et à la précision du mouvement horloger.
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Principe Multiplicatif</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le rouage de finissage est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique. Ce principe fonctionne selon le système roue menante - pignon mené : chaque roue entraîne le pignon du mobile suivant, créant une accélération progressive.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Par exemple, si une roue de 100 dents engrène un pignon de 10 ailes, lorsque 10 dents de la roue auront engrené les 10 ailes du pignon, la roue aura effectué un dixième de tour alors que le pignon aura effectué un tour complet. On parle alors d'un rapport d'engrenage de 10, un calcul fondamental pour déterminer les vitesses de rotation spécifiques.
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <GitBranch className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Les Trois Mobiles Principaux</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le mobile de centre est entraîné directement par le barillet et porte généralement l'aiguille des minutes, effectuant une rotation complète en une heure. Le mobile de moyenne est un mobile intermédiaire permettant d'accéder aux bons rapports d'engrenages, servant de liaison cruciale dans la transmission de l'énergie.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le mobile de secondes, placé à l'autre extrémité du rouage de finissage, porte l'aiguille des secondes et tourne 60 fois plus rapidement que le mobile de centre pour effectuer une rotation complète en exactement une minute. Cette précision mathématique permet l'affichage correct du temps qui s'écoule.
              </p>
            </section>

            {/* Section 5 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Gauge className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profils de Denture</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Les principales évolutions historiques du rouage concernent essentiellement les outils et machines destinés à la production des mobiles, mais surtout la définition des profils de denture. Ces profils sont conçus pour limiter les frictions et les pertes énergétiques, maximisant ainsi l'efficacité du mouvement.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Les profils des dentures modernes sont épicycloïdaux et favorisent un contact de roulement en limitant les frictions et les jeux d'engrenage. Cette géométrie complexe, fruit de calculs mathématiques précis, assure une transmission optimale de l'énergie tout en minimisant l'usure des composants au fil des années.
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fabrication Artisanale et Industrielle</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                La fabrication artisanale des mobiles utilise un tour d'établi pour créer et polir les pignons, ainsi qu'une machine à tailler manuelle pour fraiser la denture de la planche. Cette méthode ancestrale reste inégalée en termes de précision et de qualité, chaque pièce étant soigneusement travaillée et décorée à la main.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                La production industrielle privilégie la décolleteuse pour l'usinage des pignons et l'étampage pour les planches de roue, permettant notamment la découpe des bras. Cette méthode offre une précision, une rapidité d'exécution et des coûts de production optimaux. Le taillage de la denture se fait ensuite par génération à l'aide de machines spécialisées pour garantir l'interchangeabilité des pièces.
              </p>
            </section>

            {/* Quiz Button */}
            <div className="text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg"
              >
                Tester mes connaissances
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Question {currentQuestion + 1} / {quizQuestions.length}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      Score: {score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === null
                          ? 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
                          : selectedAnswer === index
                          ? index === quizQuestions[currentQuestion].correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : index === quizQuestions[currentQuestion].correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 opacity-50'
                      }`}
                    >
                      <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Quiz terminé !
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Votre score: {score} / {quizQuestions.length}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Recommencer
                  </button>
                  <Link
                    href="/theorie"
                    className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Retour à la théorie
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
