'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, Users, Factory, Award, Globe, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function HistoireHorlogeriePage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizQuestions = [
    {
      question: "À quel siècle l'horlogerie a-t-elle commencé à se développer en Suisse ?",
      options: [
        "XVème siècle",
        "XVIème siècle",
        "XVIIème siècle",
        "XVIIIème siècle"
      ],
      correct: 1
    },
    {
      question: "Quelle région de Suisse est particulièrement connue pour l'horlogerie ?",
      options: [
        "Les Alpes centrales",
        "Le Plateau suisse",
        "L'arc Jurassien",
        "Le Tessin"
      ],
      correct: 2
    },
    {
      question: "Qui a créé la Waltham Watch Company en 1854 ?",
      options: [
        "Jacques David",
        "Aaron Lufkin Dennison",
        "Abraham-Louis Breguet",
        "Daniel Jean-Richard"
      ],
      correct: 1
    },
    {
      question: "Quel événement historique a favorisé l'arrivée d'artisans horlogers en Suisse ?",
      options: [
        "La Révolution française",
        "La révocation de l'édit de Nantes",
        "La Révolution industrielle",
        "La guerre de Trente Ans"
      ],
      correct: 1
    },
    {
      question: "En quelle année Jacques David a-t-il fait son rapport sur les méthodes américaines ?",
      options: [
        "1854",
        "1865",
        "1876",
        "1900"
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
            Histoire de l'Horlogerie Suisse
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Du savoir-faire artisanal à l'excellence industrielle mondiale
          </p>
        </div>

        {!showQuiz ? (
          <>
            {/* Section 1 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Les Origines au XVIe Siècle</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                L'origine du mouvement suisse dans l'horlogerie remonte à une histoire riche profondément enracinée dans le patrimoine horloger helvétique. L'histoire commence au XVIe siècle, lorsque la Suisse est devenue une plaque tournante de l'horlogerie et de la mesure du temps. Cette période marque les débuts d'une tradition qui fera la renommée mondiale de la Suisse.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le savoir-faire artisanal des métallurgistes et des horlogers s'est développé dans des régions comme Genève, Neuchâtel et La Chaux-de-Fonds. Au XVIe siècle, les réformes religieuses ont stimulé la production d'appareils de mesure du temps plus portables, nécessitant des mécanismes plus petits et plus précis, donnant ainsi naissance à la montre de poche moderne.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">L'Arrivée des Huguenots</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Dès le XVIIe siècle, l'horlogerie s'est développée en Suisse, plus précisément dans l'arc Jurassien, de Genève à Schaffhouse. On doit ce développement remarquable au grand nombre de Huguenots qui ont émigré suite à la révocation de l'édit de Nantes par Louis XIV en 1685. Cet événement historique a eu un impact déterminant sur l'industrie horlogère suisse.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ces réfugiés étaient pour la plupart des artisans de grand talent qui apportèrent des connaissances précieuses et constituèrent la base de la création de l'industrie horlogère suisse. Au XVIIe siècle, les horlogers suisses sont déjà reconnus pour leur savoir-faire exceptionnel et commencent à exporter leurs garde-temps vers d'autres régions d'Europe, établissant ainsi une réputation d'excellence.
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Factory className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">L'Époque de l'Établissage</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                La production de montres se faisait initialement chez des horlogers indépendants qui devaient ajuster à la main chaque pièce particulière constitutive du mouvement. Ces pièces étaient généralement produites auprès d'une multitude de tout petits ateliers spécialisés, chacun maîtrisant une technique particulière comme le pivotage, le taillage des roues ou la fabrication des spiraux.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce système d'établissage permettait une grande flexibilité et une spécialisation poussée, mais nécessitait un ajustement minutieux de chaque composant. L'horloger établisseur assemblait les différentes pièces et effectuait les réglages finaux pour créer un mouvement fonctionnel. Cette méthode artisanale garantissait une qualité exceptionnelle mais limitait la production à de petits volumes.
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">La Révolution Industrielle</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                C'est au milieu du XIXe siècle qu'arrive la Révolution industrielle horlogère, déclenchée par la création en 1854 de la Waltham Watch Company par un visionnaire américain, Aaron Lufkin Dennison. La société avait pour but révolutionnaire le développement de machines, de systèmes de production, de jauges et de standardisation pour acquérir une précision telle que chaque pièce devienne interchangeable.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En 1876, Jacques David, représentant de la manufacture Longines, fait un rapport détaillé de la méthode américaine aux autorités politiques et horlogères helvétiques. Ce rapport déclenche une réaction salutaire auprès de l'industrie horlogère suisse, qui adopte petit à petit ces nouvelles méthodes de production, préservant ainsi sa compétitivité face à la concurrence américaine croissante.
              </p>
            </section>

            {/* Section 5 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Production pour l'Exportation</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Pendant le premier tiers du XXe siècle, l'industrie horlogère suisse produit des mouvements pour l'exportation destinés à de nombreuses marques prestigieuses internationales. Cette période marque l'apogée de la production industrielle suisse, où la qualité et la précision des mouvements helvétiques sont recherchées dans le monde entier.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                L'horlogerie suisse résiste aux deux guerres mondiales et la Confédération institue un cartel horloger dans les années 1930 pour protéger et organiser l'industrie. Cette période de consolidation permet aux manufactures suisses de maintenir leur position dominante sur le marché mondial malgré les bouleversements économiques et politiques de l'époque.
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">L'Excellence Contemporaine</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Aujourd'hui, l'horlogerie suisse représente le summum de l'excellence technique et esthétique. Les manufactures helvétiques combinent traditions séculaires et innovations technologiques de pointe. Le label « Swiss Made » est devenu synonyme de qualité, de précision et de savoir-faire inégalé, protégé par une législation stricte garantissant l'origine et la qualité des montres.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Des régions comme la Vallée de Joux, Genève et le canton de Neuchâtel concentrent une expertise unique au monde. Les horlogers suisses perpétuent des métiers d'art ancestraux tout en développant des complications mécaniques toujours plus sophistiquées. Cette dualité entre tradition et innovation fait de la Suisse le leader incontesté de l'horlogerie mécanique de luxe au XXIe siècle.
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
