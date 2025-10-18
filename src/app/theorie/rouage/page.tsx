'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Cog, Settings, Calculator, Clock, Zap } from 'lucide-react'
import Link from 'next/link'

export default function RouagePage() {
  const [isDark, setIsDark] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quizQuestions = [
    {
      question: "Quelle est la fonction principale du train de rouage ?",
      options: [
        "Stocker l'énergie du ressort moteur",
        "Transmettre l'énergie du barillet vers l'échappement",
        "Régler la précision chronométrique",
        "Afficher l'heure sur le cadran"
      ],
      correct: 1
    },
    {
      question: "Le rouage de finissage est un rouage :",
      options: [
        "Réducteur de vitesse",
        "Multiplicatif de vitesse",
        "À vitesse constante",
        "Inverseur de sens"
      ],
      correct: 1
    },
    {
      question: "Combien de mobiles compose généralement un train de rouage standard ?",
      options: [
        "2 mobiles principaux",
        "3 mobiles principaux",
        "4 mobiles principaux",
        "5 mobiles principaux"
      ],
      correct: 2
    },
    {
      question: "La roue d'échappement engrène directement avec :",
      options: [
        "La roue de barillet",
        "La roue de centre",
        "L'ancre de l'échappement",
        "Le balancier-spiral"
      ],
      correct: 2
    },
    {
      question: "Quelle formule permet de calculer le rapport de transmission ?",
      options: [
        "Nombre de dents menées divisé par menantes",
        "Produit des dents menantes divisé par menées",
        "Somme des dents divisée par nombre de roues",
        "Vitesse angulaire multipliée par nombre de dents"
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
      isDark ? 'bg-slate-950 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900'
    }`}>
      {/* Header Premium */}
      <header className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-lg border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Link 
                href="/theorie" 
                className={`text-sm mb-2 inline-flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
              >
                ← Retour à la théorie
              </Link>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mt-2">
                Le Rouage
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
            Le train d'engrenages qui transmet l'énergie dans la montre mécanique
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 p-8 rounded-2xl ${
            isDark ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-800/30' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}
        >
          <div className="text-center">
            <Cog className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-spin-slow" />
            <h2 className="text-3xl font-bold mb-4">La Transmission Cinématique</h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Le rouage est le cœur de la transmission mécanique dans une montre. Il transforme l'énergie du barillet en un mouvement précis et régulé qui anime les aiguilles[web:1][web:3].
            </p>
          </div>
        </motion.div>

        {/* Section 1: Définition et Fonction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Définition et Fonction</h2>
              <p className="text-blue-600 font-medium">Système de Transmission de l'Énergie</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Le <strong>rouage</strong> (ou train d'engrenages) est l'ensemble des roues dentées et pignons qui transmettent l'énergie du barillet vers l'échappement dans une montre mécanique[web:1][web:3]. Il constitue le <strong>système de transmission cinématique central</strong> du mouvement horloger[web:2].
            </p>
            <p>
              Le rouage transforme le flux d'énergie continu provenant du ressort moteur en un mouvement régulé et précis[web:1]. Chaque engrenage est conçu et apparié avec une précision micrométrique pour réguler le mouvement et la vitesse de transmission[web:3][web:8].
            </p>
            <p>
              Le train de rouage commence au niveau du ressort dans le barillet et se termine à l'échappement[web:3]. Chaque roue du train est reliée à une autre par l'intermédiaire de pignons, ce qui permet de <strong>modifier progressivement la vitesse de transfert</strong> de l'énergie[web:3][web:4].
            </p>

            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'} my-8`}>
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                Fonction Principale
              </h3>
              <p className="text-lg">
                Le rouage assure la <strong>transmission du couple moteur</strong> depuis le barillet jusqu'à l'échappement, tout en démultipliant la vitesse pour atteindre la fréquence d'oscillation nécessaire au balancier-spiral[web:1][web:2].
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Le Rouage de Finissage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}>
              <ChevronRight className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Le Rouage de Finissage</h2>
              <p className="text-indigo-600 font-medium">Rouage Multiplicatif</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Le <strong>rouage de finissage</strong> est un rouage multiplicatif, ce qui signifie que chaque mobile tourne plus rapidement que celui qui le précède dans la chaîne cinématique[web:2]. Cette accélération progressive est essentielle pour atteindre la <strong>fréquence d'oscillation nécessaire</strong> au balancier[web:17].
            </p>
            <p>
              Le rouage de finissage divise l'unité de temps donnée par l'oscillateur (ensemble balancier-spiral-échappement) pour créer les indications des heures, minutes et secondes[web:17]. Il est composé de plusieurs mobiles successifs qui multiplient la vitesse de rotation[web:2].
            </p>

            <div className={`grid md:grid-cols-2 gap-6 my-8`}>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200'}`}>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Caractéristiques</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>Multiplication de vitesse</strong> : chaque roue tourne plus vite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>Démultiplication du couple</strong> : force réduite progressivement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>Précision accrue</strong> : réduction des erreurs cumulées</span>
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'}`}>
                <h3 className="font-bold text-xl mb-4 text-blue-600">Performances</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Fréquence élevée</strong> : jusqu'à 5 Hz (36 000 alt/h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Efficacité optimale</strong> : rendement &gt; 95%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Durabilité</strong> : usure minimale sur décennies</span>
                  </li>
                </ul>
              </div>
            </div>

            <p>
              L'efficience du train de rouage permet aux mouvements modernes de fonctionner à des fréquences élevées tout en offrant un remarquable niveau de performance et de réserve de marche[web:20].
            </p>
          </div>
        </motion.section>

        {/* Section 3: Composition du Train */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Cog className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Composition du Train de Rouage</h2>
              <p className="text-blue-600 font-medium">Les Quatre Mobiles Principaux</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Un train de rouage standard se compose généralement de <strong>quatre mobiles principaux</strong>[web:1][web:4]. Chaque mobile est constitué d'une roue dentée et d'un pignon qui engrène avec la roue suivante[web:5].
            </p>

            <div className={`space-y-4 my-8`}>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-blue-900/20 border-l-4 border-blue-600' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span>
                  1. Grand Mobile (Roue de Centre)
                </h3>
                <p>Fait <strong>1 tour par heure</strong>, porte l'aiguille des minutes. C'est le mobile le plus lent du rouage de finissage[web:4].</p>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-indigo-900/20 border-l-4 border-indigo-600' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span>
                  2. Moyen Mobile (Roue Moyenne)
                </h3>
                <p>Mobile <strong>intermédiaire de transmission</strong>, assure la démultiplication entre la roue de centre et la roue de secondes[web:4].</p>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-purple-900/20 border-l-4 border-purple-600' : 'bg-purple-50 border-l-4 border-purple-500'}`}>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span>
                  3. Mobile de Seconde
                </h3>
                <p>Fait <strong>1 tour par minute</strong>, porte l'aiguille des secondes (trotteuse). Vitesse de rotation : 1 tr/min[web:4].</p>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-amber-900/20 border-l-4 border-amber-600' : 'bg-amber-50 border-l-4 border-amber-500'}`}>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span>
                  4. Mobile d'Échappement
                </h3>
                <p>Transmet l'énergie à l'ancre de l'échappement. Tourne à <strong>haute fréquence</strong> (240-360 tr/h selon calibre)[web:4].</p>
              </div>
            </div>

            <p>
              Dans le rouage, un engrenage se compose d'une roue dont les dents pénètrent entre les dents (appelées ailes) d'un pignon[web:5]. Cette interaction mécanique permet une <strong>transmission précise</strong> du mouvement et du couple moteur[web:4].
            </p>
          </div>
        </motion.section>

        {/* Section 4: Calcul du Rapport de Transmission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}>
              <Calculator className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Rapport de Transmission</h2>
              <p className="text-indigo-600 font-medium">Calculs et Formules Horlogères</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Dans un train d'engrenages simple, le <strong>rapport de transmission</strong> est égal au produit des nombres de dents des roues menantes divisé par celui des roues menées[web:4]. Cette formule mathématique permet de calculer précisément les vitesses de rotation[web:4].
            </p>

            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-800/50' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'} my-8`}>
              <h3 className="text-center text-2xl font-bold mb-4">Formule du Rapport de Transmission</h3>
              <div className="text-center text-3xl font-mono font-bold my-6 p-6 bg-white/10 rounded-xl">
                ω<sub>sortie</sub> / ω<sub>entrée</sub> = (∏ Z<sub>menantes</sub>) / (∏ Z<sub>menées</sub>)
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
                <div className="text-center">
                  <p className="font-bold mb-2">ω (oméga)</p>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Vitesse angulaire (rad/s ou tr/min)</p>
                </div>
                <div className="text-center">
                  <p className="font-bold mb-2">Z</p>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Nombre de dents de la roue</p>
                </div>
                <div className="text-center">
                  <p className="font-bold mb-2">∏ (produit)</p>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Multiplication successive</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-blue-50 border border-blue-200'}`}>
              <h3 className="font-bold text-xl mb-4 text-blue-600">💡 Exemple Pratique</h3>
              <p className="mb-3">
                Pour une roue de 80 dents engrenant avec un pignon de 10 dents :
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Rapport = 80 / 10 = <strong>8</strong></li>
                <li>• Le pignon tourne <strong>8 fois plus vite</strong> que la roue</li>
                <li>• Le couple est <strong>divisé par 8</strong></li>
              </ul>
            </div>

            <p>
              Ce calcul permet aux horlogers de concevoir des trains de rouage qui produisent exactement les rapports de vitesse nécessaires pour une mesure précise du temps[web:4]. La précision de ces engrenages est cruciale pour la fiabilité chronométrique de la montre[web:3].
            </p>
          </div>
        </motion.section>

        {/* Section 5: Rouage et Minuterie */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mb-12 p-10 rounded-2xl shadow-xl ${
            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
          }`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Rouage et Minuterie</h2>
              <p className="text-blue-600 font-medium">Transmission vers l'Affichage</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Le <strong>rouage des minutes</strong> est un système spécifique qui transmet la rotation du pignon des minutes à l'aiguille des heures[web:4]. Ce mécanisme assure que l'aiguille des heures tourne <strong>12 fois plus lentement</strong> que celle des minutes[web:4].
            </p>
            <p>
              La minuterie est un ensemble d'engrenages situé côté cadran qui permet l'affichage des heures[web:4]. Elle reçoit le mouvement de la roue de centre (qui fait un tour par heure) et le démultiplie pour actionner l'aiguille des heures[web:4].
            </p>

            <div className={`grid md:grid-cols-2 gap-6 my-8`}>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">🕐</span> Rapport Horaire
                </h3>
                <p className="mb-4">La minuterie assure le rapport 1:12 entre minutes et heures :</p>
                <ul className="space-y-2">
                  <li>• <strong>Chaussée</strong> : 1 tour/heure</li>
                  <li>• <strong>Roue des heures</strong> : 1 tour/12 heures</li>
                  <li>• <strong>Pignon de minuterie</strong> : transmission intermédiaire</li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Complications
                </h3>
                <p className="mb-4">Le rouage transmet aussi l'énergie vers :</p>
                <ul className="space-y-2">
                  <li>• <strong>Quantième</strong> : affichage de la date</li>
                  <li>• <strong>Phases de lune</strong> : cycle lunaire</li>
                  <li>• <strong>Chronographe</strong> : fonction de chronométrage</li>
                </ul>
              </div>
            </div>

            <p>
              Les rouages transmettent le couple moteur et le mouvement vers d'autres éléments du mécanisme, comme les complications horlogères[web:4]. Cette transmission doit être à la fois <strong>efficace et précise</strong> pour garantir le bon fonctionnement de toutes les fonctions[web:8].
            </p>
          </div>
        </motion.section>

        {/* Section 6: Précision et Qualité */}
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
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Précision et Qualité</h2>
              <p className="text-emerald-600 font-medium">Excellence de Fabrication Suisse</p>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              La qualité du rouage est déterminante pour la <strong>précision et la fiabilité</strong> d'une montre mécanique[web:3]. Chaque engrenage doit être usiné avec une tolérance de l'ordre du <strong>micromètre (µm)</strong> pour assurer une transmission optimale[web:5].
            </p>

            <div className={`grid md:grid-cols-3 gap-4 my-8`}>
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-800/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="font-bold text-lg mb-2">Tolérance</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">±1µm</div>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Précision d'usinage requise</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-800/50' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200'}`}>
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="font-bold text-lg mb-2">Rendement</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-2">&gt;95%</div>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Efficacité de transmission</p>
              </div>
              
              <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-800/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold text-lg mb-2">Durabilité</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+ ans</div>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Durée de vie avec entretien</p>
              </div>
            </div>

            <p>
              Le mouvement final des engrenages est converti en un <strong>tic-tac régulier</strong> de la montre qui donne une heure précise[web:3]. Toute imperfection dans la conception ou la fabrication du rouage peut entraîner des variations de marche et affecter la précision chronométrique[web:8].
            </p>

            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'} my-8`}>
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                <span className="text-3xl">🇨🇭</span> Innovation Suisse
              </h3>
              <p>
                Les manufactures horlogères suisses investissent massivement dans la recherche et le développement de nouveaux matériaux et designs pour améliorer l'efficacité des trains de rouage[web:20]. L'utilisation de nouveaux alliages, de traitements de surface et de géométries optimisées permet de réduire les frottements et d'augmenter la réserve de marche[web:20].
              </p>
            </div>
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

              {(() => {
                const currentIndex = Object.keys(quizAnswers).filter((k) => quizAnswers[parseInt(k)] !== undefined).length;
                if (currentIndex >= quizQuestions.length) {
                  return (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-6">✅</div>
                      <p className="text-2xl font-bold mb-8">Toutes les questions ont été répondues !</p>
                      <button
                        onClick={handleQuizSubmit}
                        className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                {score >= 4 ? "Vous maîtrisez parfaitement le rouage ! Vos connaissances en transmission mécanique sont exemplaires." :
                 score >= 3 ? "Vous avez une bonne compréhension du rouage. Continuez à approfondir ces mécanismes fascinants !" :
                 "Relisez attentivement le cours pour mieux comprendre les principes de transmission du rouage."}
              </p>
              <button
                onClick={() => {
                  setShowResults(false)
                  setQuizAnswers({})
                  setScore(0)
                }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105"
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
