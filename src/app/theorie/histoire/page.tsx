'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, Landmark, Factory, TrendingUp, AlertTriangle, Award as AwardIcon } from 'lucide-react'
import Link from 'next/link'

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
        "Une technique de polissage des composants",
        "Un système de production basé sur la sous-traitance spécialisée",
        "Un type de mouvement horloger spécifique",
        "Une méthode de remontage automatique"
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
        "Le catholicisme romain",
        "Le luthéranisme allemand",
        "Le calvinisme réformé",
        "L'anglicanisme britannique"
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
      isDark ? 'bg-slate-950 text-gray-100' : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 text-slate-900'
    }`}>
      {/* Header Premium */}
      <header className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-lg border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Link 
                href="/theorie" 
                className={`text-sm mb-2 inline-flex items-center ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'} transition-colors`}
              >
                ← Retour à la théorie
              </Link>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent mt-2">
                Histoire de l'Horlogerie Suisse
              </h1>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-5 py-2.5 rounded-xl transition-all font-medium ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-gray-100 border border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
              }`}
            >
              {isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
            </button>
          </div>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} font-light`}>
            Presque 350 ans de tradition, d'excellence et de savoir-faire horloger
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Timeline Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 p-8 rounded-2xl ${
            isDark ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-800/30' : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200'
          }`}
        >
          <div className="text-center">
            <Clock className="w-16 h-16 mx-auto mb-4 text-amber-600" />
            <h2 className="text-3xl font-bold mb-4">Un Héritage Séculaire</h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              La Suisse est incontestablement le pays de l'horlogerie. Cette industrie atypique fait figure de symbole du « Made in Switzerland », synonyme de qualité, de précision et d'excellence dans l'imaginaire collectif mondial[web:7][web:10].
            </p>
          </div>
        </motion.div>

        {/* Section 1: Les Origines (16ème siècle) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
              <Landmark className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Les Origines (16ème siècle)</h2>
              <p className="text-amber-600 font-medium">Genève et la Réforme Protestante</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              L'industrie horlogère suisse est née à <strong>Genève au milieu du 16ème siècle</strong>, suite à la montée en puissance d'un grand courant religieux : le calvinisme[web:10][web:56]. Cette naissance est intimement liée à des événements religieux qui ont transformé le paysage économique de la ville[web:7].
            </p>
            <p>
              En 1541, le pasteur français <strong>Jean Calvin</strong> (1509-1564) s'établit à Genève après avoir quitté l'Église catholique pour défendre les idées de la réforme protestante[web:10]. Il aide le Conseil de la ville à réformer les lois en vigueur, instaurant une société basée sur l'austérité et la rigueur[web:56].
            </p>
            <p>
              Parmi ces réformes figure notamment l'<strong>interdiction du port d'objets ornementaux ostentatoires</strong> comme les bijoux[web:10][web:13]. Les nombreux orfèvres et joailliers de la place, soudainement privés de leur activité principale, doivent alors se tourner vers un autre secteur : l'horlogerie[web:10][web:56].
            </p>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800 border-l-4 border-amber-600' : 'bg-amber-50 border-l-4 border-amber-500'} my-6`}>
              <p className="font-semibold mb-2 text-amber-600">💡 Le saviez-vous ?</p>
              <p>
                Cette reconversion forcée des artisans du luxe vers l'horlogerie explique pourquoi les montres suisses ont toujours été caractérisées par une <strong>finition exceptionnelle</strong> et un souci du détail esthétique hérité des traditions de l'orfèvrerie[web:10][web:62].
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Bressel et la Naissance (17ème siècle) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <ChevronRight className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Bressel, le Père Fondateur (17ème)</h2>
              <p className="text-blue-600 font-medium">Daniel Jean-Richard et la Première Montre Suisse</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              L'horlogerie suisse naît véritablement dans la 2ème moitié du XVIIème siècle, sous l'impulsion d'un homme : <strong>Daniel Jean-Richard</strong>, dit "Bressel", un horloger jurassien né à La Sagne en 1665[web:7][web:53].
            </p>
            <p>
              Bressel dévoile la <strong>première montre suisse en 1681</strong>, fortement inspirée d'un modèle anglais inventé deux ans plus tôt[web:7]. Bien que la montre ne soit pas une invention suisse originale, Bressel a le génie d'adapter et d'améliorer les techniques existantes, posant les bases d'une industrie florissante[web:7][web:53].
            </p>
            <p>
              Véritable figure tutélaire de l'horlogerie jurassienne, Bressel est devenu, à la postérité, le <strong>symbole de l'horlogerie suisse traditionnelle</strong>[web:7]. Mais il apparaît également comme le garant du principe de l'établissage, un système révolutionnaire qui va transformer la production horlogère[web:7].
            </p>
            <p>
              L'horlogerie suisse s'est ensuite développée dans l'<strong>arc jurassien de Genève à Schaffhouse</strong> au XVIIe siècle, par l'émigration d'un grand nombre d'artisans spécialisés, notamment des Huguenots français fuyant les persécutions religieuses[web:19][web:53]. Cette dispersion géographique va favoriser l'émergence de différents centres horlogers, chacun développant ses propres spécialités[web:7][web:50].
            </p>
          </div>
        </motion.section>

        {/* Section 3: L'Établissage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
              <Factory className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">La Tradition de l'Établissage</h2>
              <p className="text-emerald-600 font-medium">Un Système de Production Révolutionnaire</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              L'<strong>établissage</strong> est un moyen de production basé sur une sous-traitance très avancée[web:7]. Il consiste à produire une montre en divisant le travail en <strong>petites entités indépendantes et très spécialisées</strong>, pour n'assembler le tout qu'au dernier moment, dans un atelier appelé "comptoir"[web:7][web:53].
            </p>
            <p>
              Ce système permet une <strong>spécialisation extrême</strong> de la tâche, et donc l'acquisition rapide d'un savoir-faire inégalable par des artisans plus généralistes[web:7]. Le produit final bénéficie de l'expertise cumulée de toutes les personnes y ayant participé, garantissant une qualité exceptionnelle[web:7].
            </p>
            
            <div className={`grid md:grid-cols-2 gap-4 my-8`}>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔧</span> Avantages Techniques
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>Spécialisation extrême</strong> : chaque artisan maîtrise parfaitement sa tâche</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>Qualité optimale</strong> : expertise cumulée de multiples spécialistes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>Innovation constante</strong> : amélioration continue des processus</span>
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏔️</span> Avantages Sociaux
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Travail à domicile</strong> : adaptation aux montagnes jurassiennes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Revenus hivernaux</strong> : complément pour les fermiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Emploi familial</strong> : toute la famille participait</span>
                  </li>
                </ul>
              </div>
            </div>

            <p>
              Au milieu des montagnes jurassiennes, cette répartition du travail présentait un avantage crucial[web:7]. Les artisans horlogers n'étaient à l'origine que de simples fermiers, dont l'activité cessait dès l'arrivée de l'hiver[web:7]. L'établissage leur permettait de <strong>travailler à domicile</strong> en employant toute leur famille, mais aussi d'<strong>assurer des revenus pendant la période hivernale</strong>[web:7][web:53].
            </p>
          </div>
        </motion.section>

        {/* Section 4: Industrialisation et Âge d'Or */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Industrialisation et Âge d'Or</h2>
              <p className="text-blue-600 font-medium">19ème - 20ème Siècle : L'Apogée Suisse</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              La <strong>mécanisation de la fabrication</strong> prend place au début du 20ème siècle grâce aux recherches d'horlogers réputés comme Frédéric Ingold ou Georges Léschot[web:10]. Cette révolution industrielle permet à la Suisse de passer d'une production artisanale à une production en série tout en maintenant une qualité exceptionnelle[web:53][web:62].
            </p>
            <p>
              En 1876, Jacques David, de Longines, fait un rapport détaillé de la méthode américaine de standardisation aux autorités helvétiques[web:53]. Ce rapport déclenche une réaction salutaire auprès de l'industrie horlogère suisse, qui adopte progressivement ces nouvelles méthodes tout en préservant son excellence artisanale[web:53].
            </p>
            
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'} my-8`}>
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-3">60%</div>
                <p className="text-xl font-semibold mb-2">de la production mondiale</p>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Dans les années 1960, l'horlogerie suisse atteint son apogée : 60% des produits de l'horlogerie mondiale sont fabriqués en Suisse[web:16][web:10].
                </p>
              </div>
            </div>

            <p>
              Depuis plus de quatre siècles, <strong>tradition, savoir-faire, technologie et innovation</strong> ont permis au pays alpin de maintenir son leadership sur le marché mondial de la montre[web:10][web:57]. L'horlogerie suisse est mondialement réputée pour la beauté et la précision de ses montres[web:10][web:16].
            </p>
            <p>
              Cette industrie atypique fait figure de <strong>symbole du « Made in Switzerland »</strong>[web:10][web:58]. Le label suisse est devenu synonyme de qualité, de précision et d'excellence dans l'imaginaire collectif mondial, protégé par une législation stricte depuis 2017[web:58].
            </p>
          </div>
        </motion.section>

        {/* Section 5: La Crise du Quartz */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Crises et Résilience</h2>
              <p className="text-red-600 font-medium">1970-1980 : La Crise du Quartz</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              L'histoire de l'horlogerie suisse n'est pas un long fleuve tranquille[web:7]. Loin de là, les <strong>difficultés et les crises</strong> se sont succédées et ont souvent mis à mal les maisons horlogères helvétiques[web:7].
            </p>
            <p>
              La plus grande crise survient dans les années 1970-1980 avec l'arrivée des <strong>montres à quartz japonaises</strong>[web:16][web:62]. Cette "crise du quartz" menace l'existence même de l'industrie horlogère suisse traditionnelle[web:7]. Les montres électroniques, moins chères et plus précises, envahissent le marché mondial et provoquent la faillite de nombreuses manufactures[web:16].
            </p>
            
            <div className={`p-8 rounded-xl ${isDark ? 'bg-red-900/20 border-l-4 border-red-600' : 'bg-red-50 border-l-4 border-red-500'} my-8`}>
              <h3 className="font-bold text-2xl mb-4 text-red-600 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7" />
                Une Hécatombe Industrielle
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">90,000 → 30,000</div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Emplois perdus (1970-1983)</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">1,000+</div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fabricants disparus</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">13 ans</div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Durée de la crise</p>
                </div>
              </div>
              <p className="mt-6 text-center italic">
                Entre 1970 et 1983, l'emploi dans l'horlogerie suisse passe de 90 000 à 30 000 personnes. Plus de 1000 fabricants disparaissent. C'est une véritable hécatombe pour l'industrie[web:7].
              </p>
            </div>

            <p>
              La Suisse se réinvente en se repositionnant sur le <strong>segment du luxe et de la haute horlogerie mécanique</strong>[web:16][web:57]. Plutôt que de concurrencer les montres à quartz bon marché, les manufactures suisses mettent en avant leur savoir-faire artisanal, leur héritage historique et l'émotion associée aux montres mécaniques[web:10][web:62].
            </p>
            <p>
              Cette stratégie s'avère gagnante : aujourd'hui, la Suisse domine le marché mondial des montres de luxe et continue d'incarner l'excellence horlogère[web:10][web:57]. Les montres mécaniques suisses sont redevenues des objets de désir et des investissements prisés par les collectionneurs du monde entier[web:16][web:62].
            </p>
          </div>
        </motion.section>

        {/* Section 6: L'Horlogerie Suisse Aujourd'hui */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
              <AwardIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">L'Excellence Suisse Aujourd'hui</h2>
              <p className="text-emerald-600 font-medium">21ème Siècle : Innovation et Tradition</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Aujourd'hui, la Suisse demeure incontestablement le <strong>pays de l'horlogerie</strong>[web:10][web:16]. L'industrie horlogère suisse continue de fasciner et d'inspirer le monde entier par son attachement à l'excellence et à l'innovation[web:10][web:57].
            </p>
            <p>
              Les manufactures suisses investissent massivement dans la <strong>recherche et le développement</strong>[web:57]. Elles développent de nouveaux matériaux (silicium, céramique, alliages innovants), perfectionnent les mouvements pour augmenter la précision et la réserve de marche, et créent des complications toujours plus sophistiquées[web:57][web:62].
            </p>
            
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8`}>
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-800/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Positionnement Luxe</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Domination du segment haut de gamme mondial</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-800/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="font-bold text-lg mb-2">Innovation Constante</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Nouveaux matériaux et technologies de pointe</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-800/50' : 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200'}`}>
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-bold text-lg mb-2">Héritage Historique</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Près de 350 ans de tradition horlogère</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-800/50' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200'}`}>
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-lg mb-2">Savoir-Faire Artisanal</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Expertise transmise de génération en génération</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-rose-900/30 to-rose-800/30 border border-rose-800/50' : 'bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200'}`}>
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-lg mb-2">Rayonnement Mondial</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Symbole d'excellence universellement reconnu</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border border-indigo-800/50' : 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200'}`}>
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold text-lg mb-2">Formation d'Excellence</h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Écoles d'horlogerie de renommée mondiale</p>
              </div>
            </div>

            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-800/50' : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'} my-8`}>
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                <span className="text-3xl">🇨🇭</span> Le Label "Swiss Made"
              </h3>
              <p className="mb-4">
                Le label <strong>"Swiss Made"</strong> est devenu l'un des plus prestigieux au monde[web:10][web:58]. Il garantit non seulement l'origine suisse, mais aussi un niveau de qualité, de précision et de finition exceptionnel qui justifie la position dominante de la Suisse sur le marché horloger mondial[web:58][web:61].
              </p>
              <div className={`grid md:grid-cols-2 gap-4 mt-6`}>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-600">Critères depuis 2017 :</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>60% minimum</strong> de valeur suisse</li>
                    <li>• <strong>Assemblage final</strong> en Suisse</li>
                    <li>• <strong>Contrôle qualité</strong> sur territoire helvétique</li>
                    <li>• <strong>Développement technique</strong> en Suisse</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-600">Impact économique :</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>2,500-3,000</strong> entreprises horlogères</li>
                    <li>• <strong>60,000+</strong> emplois directs</li>
                    <li>• <strong>$20+ milliards</strong> d'exportations annuelles</li>
                    <li>• <strong>Leader mondial</strong> du luxe horloger</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              L'horlogerie suisse représente une <strong>success story</strong> unique, où tradition et innovation coexistent harmonieusement[web:10][web:57]. Cette industrie continue d'attirer les meilleurs talents et de captiver les passionnés du monde entier, perpétuant ainsi un héritage horloger séculaire[web:7][web:10][web:62].
            </p>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`mb-12 p-10 rounded-2xl shadow-2xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-5xl">📝</span>
            Quiz : Testez vos connaissances
          </h2>
          
          {!showResults ? (
            <>
              {/* Progress bar */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    QUESTION {Math.min(Object.keys(quizAnswers).filter((k) => quizAnswers[parseInt(k)] !== undefined).length + 1, quizQuestions.length)} SUR {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide">
                    SCORE : 0/{quizQuestions.length}
                  </span>
                </div>
                <div className={`w-full rounded-full h-3 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(Object.keys(quizAnswers).filter((k) => quizAnswers[parseInt(k)] !== undefined).length / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Une seule question à la fois */}
              {(() => {
                const currentIndex = Object.keys(quizAnswers).filter((k) => quizAnswers[parseInt(k)] !== undefined).length;
                if (currentIndex >= quizQuestions.length) {
                  return (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-6">✅</div>
                      <p className="text-2xl font-bold mb-8">Toutes les questions ont été répondues !</p>
                      <button
                        onClick={handleQuizSubmit}
                        className="px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                      >
                        📊 Voir mes résultats
                      </button>
                    </div>
                  );
                }
                
                const q = quizQuestions[currentIndex];
                const letters = ['A', 'B', 'C', 'D'];
                
                return (
                  <div key={currentIndex} className="space-y-6">
                    <p className={`font-bold text-2xl mb-8 leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {q.question}
                    </p>
                    <div className="grid gap-4">
                      {q.options.map((option, optIndex) => {
                        const isSelected = quizAnswers[currentIndex] === String(optIndex);
                        
                        return (
                          <button
                            key={optIndex}
                            onClick={() => {
                              setQuizAnswers({...quizAnswers, [currentIndex]: String(optIndex)});
                            }}
                            className={`flex items-center p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${
                              isSelected
                                ? isDark
                                  ? 'border-blue-500 bg-blue-900/40 shadow-lg shadow-blue-900/50'
                                  : 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200/50'
                                : isDark
                                ? 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                                : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md'
                            }`}
                          >
                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-5 font-bold text-lg transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg'
                                : isDark
                                ? 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                                : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                            }`}>
                              {letters[optIndex]}.
                            </div>
                            <span className={`text-lg ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="text-center py-12">
              <div className={`text-8xl font-black mb-8 ${
                score >= 4 ? 'text-green-500' : score >= 3 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {score}/{quizQuestions.length}
              </div>
              <div className="text-7xl mb-6">
                {score >= 4 ? '🏆' : score >= 3 ? '👍' : '📚'}
              </div>
              <p className="text-4xl font-bold mb-4">
                {score >= 4 ? 'Excellent !' :
                 score >= 3 ? 'Bien joué !' :
                 'Continuez à apprendre'}
              </p>
              <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {score >= 4 ? "Vous maîtrisez parfaitement l'histoire de l'horlogerie suisse ! Votre connaissance honore cette tradition séculaire." :
                 score >= 3 ? "Vous avez de bonnes connaissances sur l'horlogerie suisse. Continuez à approfondir cet héritage fascinant !" :
                 "Relisez attentivement le cours pour mieux comprendre cette histoire exceptionnelle de l'horlogerie suisse."}
              </p>
              <button
                onClick={() => {
                  setShowResults(false)
                  setQuizAnswers({})
                  setScore(0)
                }}
                className="px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105"
              >
                🔄 Recommencer le quiz
              </button>
            </div>
          )}
        </motion.section>

      </div>
    </div>
  )
}
