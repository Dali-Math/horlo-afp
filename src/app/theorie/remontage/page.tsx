'use client'

import { useState } from 'react'
import { ArrowLeft, RotateCw, Crown, Lock, Unlock, Battery, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function RemontagePage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizQuestions = [
    {
      question: "Quel est l'organe qui permet de remonter manuellement une montre ?",
      options: [
        "Le balancier",
        "La couronne",
        "L'échappement",
        "Le spiral"
      ],
      correct: 1
    },
    {
      question: "Quelle pièce empêche le ressort de barillet de se désarmer prématurément ?",
      options: [
        "Le rochet",
        "La bascule",
        "Le cliquet",
        "Le pignon coulant"
      ],
      correct: 2
    },
    {
      question: "Quel pignon est monté sur le carré de la tige de remontoir ?",
      options: [
        "Le pignon de remontoir",
        "Le pignon coulant",
        "Le pignon de seconde",
        "Le pignon de centre"
      ],
      correct: 1
    },
    {
      question: "Quelle roue entraîne directement le rochet lors du remontage ?",
      options: [
        "La roue de centre",
        "La roue de couronne",
        "La roue d'échappement",
        "La roue de seconde"
      ],
      correct: 1
    },
    {
      question: "Sur quel élément est fixé le rochet ?",
      options: [
        "Sur la tige de remontoir",
        "Sur le carré de l'arbre de barillet",
        "Sur la platine",
        "Sur la couronne"
      ],
      correct: 1
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
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Link 
            href="/theorie"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la théorie
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Le Mécanisme de Remontage
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Armer le ressort moteur pour alimenter la montre en énergie
          </p>
        </div>

        {!showQuiz ? (
          <>
            {/* Section 1 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <RotateCw className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Principe du Remontage</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le mécanisme de remontage est le système qui permet d'armer le ressort de barillet, source d'énergie de la montre mécanique. Lorsque vous remontez votre montre par l'intermédiaire de la couronne, vous tendez le ressort moteur qui accumulera l'énergie nécessaire au fonctionnement du mouvement pendant plusieurs heures, voire plusieurs jours selon la réserve de marche.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce processus fondamental transforme l'énergie mécanique de la rotation de la couronne en énergie potentielle élastique stockée dans le ressort. Sans ce mécanisme ingénieux, aucune montre mécanique ne pourrait fonctionner, car elle serait privée de sa source d'énergie primaire qui anime l'ensemble du mouvement.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Crown className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">La Tige de Remontoir</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                La tige de remontoir est l'axe central du système, muni d'un pignon de remontoir et d'un pignon coulant, aussi appelé baladeur. Le pignon coulant possède un trou de section carrée qui s'ajuste librement sur le carré de la tige, permettant ainsi la transmission du mouvement de rotation depuis la couronne extérieure vers les mécanismes internes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Lors du remontage, le pignon coulant est maintenu contre le pignon de remontoir grâce à la bascule, un levier pivotant. Le carré de la tige entraîne le pignon coulant qui lui-même entraîne le pignon de remontoir grâce à sa denture de type « Breguet », conçue spécifiquement pour assurer un engrènement fiable et durable.
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">La Roue de Couronne</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                La roue de couronne constitue l'élément intermédiaire crucial entre le pignon de remontoir et le rochet. Son rôle est de transmettre l'énergie du remontoir au rochet qui armera le ressort de barillet. Cette roue démultiplie le mouvement de rotation pour optimiser l'efficacité du remontage et réduire l'effort nécessaire à la couronne.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le pignon de remontoir, par l'intermédiaire de la roue de couronne, entraîne donc le rochet qui est fixé sur le carré de l'arbre de barillet. Cette chaîne cinématique soigneusement conçue permet de transmettre efficacement la force appliquée à la couronne vers le ressort moteur situé à l'intérieur du barillet.
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Unlock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Le Cliquet Anti-Retour</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le cliquet est un petit levier à ressort qui s'engage dans les dents du rochet pour empêcher celui-ci de revenir en arrière. Sans ce dispositif de sécurité essentiel, le rochet pourrait tourner librement dans les deux sens, entraînant un désarmement immédiat du ressort de barillet et rendant impossible le stockage de l'énergie nécessaire au fonctionnement de la montre.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce mécanisme de retenue permet au ressort de se détendre uniquement de manière contrôlée, en actionnant l'axe central du barillet qui transmet l'énergie au rouage. Le cliquet peut être écarté manuellement lors de la maintenance pour décharger complètement le ressort en toute sécurité avant toute intervention sur le mouvement.
              </p>
            </section>

            {/* Section 5 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Battery className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Remontage Manuel vs Automatique</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Le remontage manuel nécessite de tourner régulièrement la couronne pour armer le ressort, généralement une fois par jour selon la réserve de marche. Cette interaction quotidienne crée un lien privilégié entre le propriétaire et sa montre. Pour remonter correctement, il suffit de tourner la couronne dans le sens des aiguilles d'une montre jusqu'à sentir une résistance accrue.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le remontage automatique utilise une masse oscillante qui pivote librement avec les mouvements du poignet. Cette masse entraîne un mécanisme de roulement qui arme progressivement le ressort de barillet. Certains mouvements automatiques disposent également d'un système de remontage manuel pour compléter l'armage si nécessaire, offrant ainsi le meilleur des deux systèmes.
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Précautions et Entretien</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Il est important de ne jamais forcer lors du remontage manuel, car une fois le ressort complètement armé, continuer à tourner la couronne pourrait endommager le mécanisme. La plupart des montres modernes possèdent un système de débrayage qui protège le ressort, mais il est préférable de s'arrêter dès qu'une résistance nette se fait sentir.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Pour les couronnes vissées, il faut impérativement dévisser la couronne avant de procéder au remontage, puis la revisser après utilisation pour garantir l'étanchéité. Le mécanisme de remontage doit être protégé de la poussière et de l'humidité, et un entretien régulier par un horloger qualifié tous les 4 à 5 ans assure sa longévité et son bon fonctionnement.
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
