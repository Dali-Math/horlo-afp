'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Award, Clock } from 'lucide-react'

export default function HistoirePage() {
  const [isDark, setIsDark] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quizQuestions = [
    {
      question: "Qui est considéré comme le père fondateur de l'horlogerie suisse ?",
      options: [
        "Jean Calvin",
        "Daniel Jean-Richard (Bressel)",
        "Abraham-Louis Breguet",
        "Frédéric Ingold"
      ],
      correct: 1
    },
    {
      question: "Dans quelle ville suisse l'horlogerie est-elle née au 16ème siècle ?",
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
        "Une technique de polissage",
        "Un système de production basé sur la sous-traitance spécialisée",
        "Un type de mouvement horloger",
        "Une méthode de remontage"
      ],
      correct: 1
    },
    {
      question: "Dans les années 1960, quel pourcentage de la production horlogère mondiale était suisse ?",
      options: [
        "30%",
        "45%",
        "60%",
        "75%"
      ],
      correct: 2
    },
    {
      question: "Quelle réforme religieuse a indirectement favorisé le développement de l'horlogerie à Genève ?",
      options: [
        "Le catholicisme",
        "Le luthéranisme",
        "Le calvinisme",
        "L'anglicanisme"
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
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Histoire de l'Horlogerie Suisse
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
            Presque 350 ans de tradition et d'excellence horlogère
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section 1: Les origines (16ème siècle) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Clock className="mr-3 text-amber-600" />
            Les Origines (16ème siècle)
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              L'industrie horlogère suisse est née à <strong>Genève au milieu du 16ème siècle</strong>, suite à la montée en puissance d'un grand courant religieux : le calvinisme. Cette naissance est intimement liée à des événements religieux qui ont transformé le paysage économique de la ville.
            </p>
            <p>
              En 1541, le pasteur français Jean Calvin (1509-1564) s'établit à Genève après avoir quitté l'Église catholique pour défendre les idées de la réforme protestante. Il aide le Conseil de la ville à réformer les lois en vigueur.
            </p>
            <p>
              Parmi ces réformes figure notamment l'<strong>interdiction du port d'objets ornementaux ostentatoires</strong> comme les bijoux. Les nombreux orfèvres et joailliers de la place, soudainement privés de leur activité principale, doivent alors se tourner vers un autre secteur : l'horlogerie.
            </p>
            <p>
              Cette reconversion forcée des artisans du luxe vers l'horlogerie explique pourquoi les montres suisses ont toujours été caractérisées par une <strong>finition exceptionnelle</strong> et un souci du détail esthétique hérité des traditions de l'orfèvrerie.
            </p>
          </div>
        </motion.section>

        {/* Section 2: Bressel, le père fondateur (17ème siècle) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-amber-600" />
            Bressel et la Naissance (17ème)
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              L'horlogerie suisse naît véritablement dans la 2ème moitié du XVIIème siècle, sous l'impulsion d'un homme : <strong>Daniel Jean-Richard</strong>, dit "Bressel", un horloger jurassien né à La Sagne en 1665.
            </p>
            <p>
              Bressel dévoile la <strong>première montre suisse en 1681</strong>, fortement inspirée d'un modèle anglais inventé deux ans plus tôt. Bien que la montre ne soit pas une invention suisse originale, Bressel a le génie d'adapter et d'améliorer les techniques existantes.
            </p>
            <p>
              Véritable figure tutélaire de l'horlogerie jurassienne, Bressel est devenu, à la postérité, le <strong>symbole de l'horlogerie suisse traditionnelle</strong>. Mais il apparaît également comme le garant du principe de l'établissage, un système qui va révolutionner la production horlogère.
            </p>
            <p>
              L'horlogerie suisse s'est ensuite développée dans l'<strong>arc jurassien de Genève à Schaffhouse</strong> au XVIIe siècle, par l'émigration d'un grand nombre d'artisans spécialisés. Cette dispersion géographique va favoriser l'émergence de différents centres horlogers, chacun développant ses propres spécialités.
            </p>
          </div>
        </motion.section>

        {/* Section 3: La tradition de l'établissage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-amber-600" />
            Établissage et Savoir-Faire
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              L'<strong>établissage</strong> est un moyen de production basé sur une sous-traitance très avancée. Il consiste à produire une montre en divisant le travail en petites entités indépendantes et très spécialisées, pour n'assembler le tout qu'au dernier moment, dans un atelier appelé "comptoir".
            </p>
            <p>
              Ce système permet une <strong>spécialisation très poussée</strong> de la tâche, et donc l'acquisition rapide d'un savoir-faire inégalable par des artisans plus généralistes. Le produit final bénéficie de l'expertise cumulée de toutes les personnes y ayant participé.
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-amber-50'} my-6`}>
              <h3 className="font-bold text-xl mb-4">Avantages de l'établissage :</h3>
              <ul className="space-y-3">
                <li>🔧 <strong>Spécialisation extrême</strong> : chaque artisan maîtrise parfaitement sa tâche</li>
                <li>🏔️ <strong>Travail à domicile</strong> : adaptation aux contraintes géographiques montagneuses</li>
                <li>❄️ <strong>Revenus hivernaux</strong> : complément d'activité pour les fermiers l'hiver</li>
                <li>👨‍👩‍👧‍👦 <strong>Emploi familial</strong> : toute la famille pouvait participer</li>
              </ul>
            </div>
            <p>
              Au milieu des montagnes jurassiennes, cette répartition du travail présentait un avantage crucial. Les artisans horlogers n'étaient à l'origine que de simples fermiers, dont l'activité cessait dès l'arrivée de l'hiver. L'établissage leur permettait de travailler à domicile en employant toute leur famille, mais aussi d'<strong>assurer des revenus pendant la période hivernale</strong>.
            </p>
          </div>
        </motion.section>

        {/* Section 4: Industrialisation et âge d'or (19-20ème siècle) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-amber-600" />
            Industrialisation et Âge d'Or
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              La <strong>mécanisation de la fabrication</strong> prend place au début du 20ème siècle grâce aux recherches d'horlogers réputés comme Frédéric Ingold ou Georges Léschot. Cette révolution industrielle permet à la Suisse de passer d'une production artisanale à une production en série tout en maintenant une qualité exceptionnelle.
            </p>
            <p>
              Dans les <strong>années 1960</strong>, l'horlogerie suisse atteint son apogée : 60% des produits de l'horlogerie mondiale sont fabriqués en Suisse. On y produit d'abord des montres mécaniques de haute précision qui dominent le marché mondial.
            </p>
            <p>
              Depuis plus de quatre siècles, <strong>tradition, savoir-faire, technologie et innovation</strong> ont permis au pays alpin de maintenir son leadership sur le marché mondial de la montre. L'horlogerie suisse est mondialement réputée pour la beauté et la précision de ses montres.
            </p>
            <p>
              Cette industrie atypique fait figure de <strong>symbole du « Made in Switzerland »</strong>. Le label suisse est devenu synonyme de qualité, de précision et d'excellence dans l'imaginaire collectif mondial.
            </p>
          </div>
        </motion.section>

        {/* Section 5: Crises et résilience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-amber-600" />
            Crises et Résilience
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              L'histoire de l'horlogerie suisse n'est pas un long fleuve tranquille. Loin de là, les <strong>difficultés et les crises</strong> se sont succédées et ont souvent mis à mal les maisons horlogères helvétiques.
            </p>
            <p>
              La plus grande crise survient dans les années 1970-1980 avec l'arrivée des <strong>montres à quartz japonaises</strong>. Cette "crise du quartz" menace l'existence même de l'industrie horlogère suisse traditionnelle. Les montres électroniques, moins chères et plus précises, envahissent le marché mondial et provoquent la faillite de nombreuses manufactures.
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-orange-900' : 'bg-orange-50'} my-6 border-l-4 border-orange-500`}>
              <h3 className="font-bold text-xl mb-3">La crise du quartz :</h3>
              <p>
                Entre 1970 et 1983, l'emploi dans l'horlogerie suisse passe de 90 000 à 30 000 personnes. Plus de 1000 fabricants disparaissent. C'est une véritable hécatombe pour l'industrie.
              </p>
            </div>
            <p>
              La Suisse se réinvente en se repositionnant sur le <strong>segment du luxe et de la haute horlogerie mécanique</strong>. Plutôt que de concurrencer les montres à quartz bon marché, les manufactures suisses mettent en avant leur savoir-faire artisanal, leur héritage historique et l'émotion associée aux montres mécaniques.
            </p>
            <p>
              Cette stratégie s'avère gagnante : aujourd'hui, la Suisse domine le marché mondial des montres de luxe et continue d'incarner l'excellence horlogère. Les montres mécaniques suisses sont redevenues des objets de désir et des investissements prisés.
            </p>
          </div>
        </motion.section>

        {/* Section 6: L'horlogerie suisse aujourd'hui */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChevronRight className="mr-3 text-amber-600" />
            Horlogerie Suisse Aujourd'hui
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Aujourd'hui, la Suisse demeure incontestablement le <strong>pays de l'horlogerie</strong>. L'industrie horlogère suisse continue de fasciner et d'inspirer le monde entier par son attachement à l'excellence et à l'innovation.
            </p>
            <p>
              Les manufactures suisses investissent massivement dans la <strong>recherche et le développement</strong>. Elles développent de nouveaux matériaux (silicium, céramique, alliages innovants), perfectionnent les mouvements pour augmenter la précision et la réserve de marche, et créent des complications toujours plus sophistiquées.
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-orange-50'} my-6`}>
              <h3 className="font-bold text-xl mb-4">Forces de l'horlogerie suisse moderne :</h3>
              <ul className="space-y-3">
                <li>🎯 <strong>Positionnement luxe</strong> : domination du segment haut de gamme</li>
                <li>🔬 <strong>Innovation constante</strong> : nouveaux matériaux et technologies</li>
                <li>🏛️ <strong>Héritage historique</strong> : près de 350 ans de tradition</li>
                <li>✨ <strong>Savoir-faire artisanal</strong> : expertise transmise de génération en génération</li>
                <li>🌍 <strong>Rayonnement mondial</strong> : symbole d'excellence universellement reconnu</li>
              </ul>
            </div>
            <p>
              Le label <strong>"Swiss Made"</strong> est devenu l'un des plus prestigieux au monde. Il garantit non seulement l'origine suisse, mais aussi un niveau de qualité, de précision et de finition exceptionnel qui justifie la position dominante de la Suisse sur le marché horloger mondial.
            </p>
            <p>
              L'horlogerie suisse représente une <strong>success story</strong> unique, où tradition et innovation coexistent harmonieusement. Cette industrie continue d'attirer les meilleurs talents et de captiver les passionnés du monde entier, perpétuant ainsi un héritage horloger séculaire.
            </p>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mb-12 p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gradient-to-br from-amber-900 to-orange-900' : 'bg-gradient-to-br from-amber-100 to-orange-100'
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
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                {score >= 4 ? '🎉 Excellent ! Vous connaissez l\'histoire suisse !' :
                 score >= 3 ? '👍 Bien ! Continuez à apprendre.' :
                 '📚 Relisez le cours pour améliorer vos connaissances.'}
              </p>
              <button
                onClick={() => {
                  setShowResults(false)
                  setQuizAnswers({})
                  setScore(0)
                }}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
