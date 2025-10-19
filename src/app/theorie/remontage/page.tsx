'use client'

import { useState } from 'react'
import { ArrowLeft, RotateCw, Crown, Lock, Unlock, Battery, CheckCircle2, Sparkles, AlertCircle, Zap } from 'lucide-react'
import Link from 'next/link'

export default function RemontagePage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const quizQuestions = [
    {
      question: "Quel est l'organe qui permet de remonter manuellement une montre ?",
      options: [
        "Le balancier",
        "La couronne",
        "L'échappement",
        "Le spiral"
      ],
      correct: 1,
      explanation: "La couronne est l'organe externe qui permet de transmettre l'énergie mécanique au mécanisme de remontage via la tige de remontoir."
    },
    {
      question: "Quelle pièce empêche le ressort de barillet de se désarmer prématurément ?",
      options: [
        "Le rochet",
        "La bascule",
        "Le cliquet",
        "Le pignon coulant"
      ],
      correct: 2,
      explanation: "Le cliquet est un petit levier à ressort qui s'engage dans les dents du rochet pour empêcher le retour en arrière et maintenir le ressort armé."
    },
    {
      question: "Quel pignon est monté sur le carré de la tige de remontoir ?",
      options: [
        "Le pignon de remontoir",
        "Le pignon coulant",
        "Le pignon de seconde",
        "Le pignon de centre"
      ],
      correct: 1,
      explanation: "Le pignon coulant (ou baladeur) est monté sur le carré de la tige et peut coulisser pour permettre le remontage ou la mise à l'heure."
    },
    {
      question: "Quelle roue entraîne directement le rochet lors du remontage ?",
      options: [
        "La roue de centre",
        "La roue de couronne",
        "La roue d'échappement",
        "La roue de seconde"
      ],
      correct: 1,
      explanation: "La roue de couronne est l'élément intermédiaire qui transmet le mouvement du pignon de remontoir au rochet pour armer le ressort."
    },
    {
      question: "Sur quel élément est fixé le rochet ?",
      options: [
        "Sur la tige de remontoir",
        "Sur le carré de l'arbre de barillet",
        "Sur la platine",
        "Sur la couronne"
      ],
      correct: 1,
      explanation: "Le rochet est fixé sur le carré de l'arbre de barillet, permettant ainsi de transmettre directement l'énergie de remontage au ressort moteur."
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
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setShowQuiz(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header Sticky */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/theorie"
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <RotateCw className="w-4 h-4" />
              Mécanisme Essentiel
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Le Mécanisme de Remontage
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Armer le ressort moteur pour alimenter la montre en énergie
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Types de remontage</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Composants clés</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">48h</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Réserve moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!showQuiz ? (
        <>
          {/* Sections Interactives */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Comprendre le Remontage</h2>
              <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
                Les composants essentiels qui permettent d'alimenter votre montre en énergie
              </p>

              <div className="grid gap-6">
                {/* Section 1 - Principe */}
                <div
                  onClick={() => setSelectedSection(selectedSection === 'principe' ? null : 'principe')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                    selectedSection === 'principe'
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700'
                  } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                        01
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          Principe du Remontage
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          Le mécanisme qui permet d'armer le ressort de barillet, source d'énergie de la montre mécanique.
                        </p>
                      </div>
                      <RotateCw className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
                    </div>
                    {selectedSection === 'principe' && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          Transformation d'Énergie
                        </h4>
                        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                            <span>La rotation de la couronne est transformée en énergie potentielle élastique</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                            <span>Le ressort stocke l'énergie nécessaire au fonctionnement pendant plusieurs heures ou jours</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                            <span>Sans ce mécanisme, aucune montre mécanique ne pourrait fonctionner</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2 - Tige de Remontoir */}
                <div
                  onClick={() => setSelectedSection(selectedSection === 'tige' ? null : 'tige')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                    selectedSection === 'tige'
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700'
                  } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                        02
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          La Tige de Remontoir
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          L'axe central du système avec pignon de remontoir et pignon coulant (baladeur).
                        </p>
                      </div>
                      <Crown className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                    </div>
                    {selectedSection === 'tige' && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border-l-4 border-green-600 dark:border-green-400">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Composants Clés</h4>
                        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                            <span>Le pignon coulant possède un trou carré qui s'ajuste sur le carré de la tige</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                            <span>La bascule maintient le pignon coulant contre le pignon de remontoir</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                            <span>Denture de type « Breguet » pour un engrènement fiable et durable</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3 - Roue de Couronne */}
                <div
                  onClick={() => setSelectedSection(selectedSection === 'couronne' ? null : 'couronne')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                    selectedSection === 'couronne'
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700'
                  } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                        03
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          La Roue de Couronne
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          L'élément intermédiaire crucial entre le pignon de remontoir et le rochet.
                        </p>
                      </div>
                      <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
                    </div>
                    {selectedSection === 'couronne' && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-6 rounded-lg border-l-4 border-amber-600 dark:border-amber-400">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Fonction</h4>
                        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                            <span>Transmet l'énergie du remontoir au rochet qui armera le ressort</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                            <span>Démultiplie le mouvement pour optimiser l'efficacité du remontage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                            <span>Réduit l'effort nécessaire à la couronne</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 4 - Cliquet */}
                <div
                  onClick={() => setSelectedSection(selectedSection === 'cliquet' ? null : 'cliquet')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                    selectedSection === 'cliquet'
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700'
                  } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                        04
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          Le Cliquet Anti-Retour
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          Un petit levier à ressort qui empêche le rochet de revenir en arrière.
                        </p>
                      </div>
                      <Unlock className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                    </div>
                    {selectedSection === 'cliquet' && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-6 rounded-lg border-l-4 border-red-600 dark:border-red-400">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Rôle Essentiel</h4>
                        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                            <span>Empêche le désarmement immédiat du ressort de barillet</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                            <span>Permet au ressort de se détendre uniquement de manière contrôlée</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                            <span>Peut être écarté manuellement lors de la maintenance</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 5 - Manuel vs Automatique */}
                <div
                  onClick={() => setSelectedSection(selectedSection === 'types' ? null : 'types')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 ${
                    selectedSection === 'types'
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700'
                  } hover:shadow-lg dark:hover:bg-slate-700 transition-colors cursor-pointer overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-lg font-bold text-xl shrink-0">
                        05
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          Remontage Manuel vs Automatique
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          Deux systèmes pour alimenter votre montre en énergie.
                        </p>
                      </div>
                      <Battery className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" />
                    </div>
                    {selectedSection === 'types' && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg border-l-4 border-purple-600 dark:border-purple-400">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Comparaison</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Remontage Manuel</p>
                            <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                              <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                                <span>Nécessite de tourner la couronne quotidiennement</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                                <span>Crée un lien privilégié avec sa montre</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Remontage Automatique</p>
                            <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                              <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                                <span>Masse oscillante qui pivote avec les mouvements du poignet</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                                <span>Remontage manuel complémentaire possible</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Précautions Section */}
          <section className="py-16 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Précautions & Bonnes Pratiques</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Erreurs à éviter */}
                <div className="bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    À Éviter
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Ne jamais forcer</strong> lors du remontage une fois le ressort armé
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Ne pas remonter</strong> sans avoir dévissé la couronne (si vissée)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 dark:text-red-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Éviter l'exposition</strong> à la poussière et l'humidité
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bonnes pratiques */}
                <div className="bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Bonnes Pratiques
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Remonter quotidiennement</strong> à la même heure pour les montres manuelles
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Tourner doucement</strong> jusqu'à sentir une résistance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 text-xl">•</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Entretien régulier</strong> tous les 4-5 ans par un horloger
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Quiz */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-3">Testez Vos Connaissances</h3>
                <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                  Validez votre compréhension du mécanisme de remontage avec notre quiz interactif
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-white text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors shadow-lg"
                >
                  Commencer le quiz
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
              {!quizCompleted ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        Question {currentQuestion + 1} / {quizQuestions.length}
                      </span>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Score: {score}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
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
                            ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                            : selectedAnswer === index
                            ? index === quizQuestions[currentQuestion].correct
                              ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                              : 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30'
                            : index === quizQuestions[currentQuestion].correct
                            ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                            : 'border-slate-200 dark:border-slate-700 opacity-50'
                        }`}
                      >
                        <span className="text-slate-900 dark:text-white font-medium">{option}</span>
                      </button>
                    ))}
                  </div>

                  {selectedAnswer !== null && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Correct !' : 'Explication'}
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            {quizQuestions[currentQuestion].explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Quiz terminé !
                    </h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                      Votre score: {score} / {quizQuestions.length}
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-6">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">
                      {score === quizQuestions.length
                        ? '🎉 Parfait ! Vous maîtrisez parfaitement le mécanisme de remontage !'
                        : score >= quizQuestions.length * 0.6
                        ? '👍 Bien joué ! Vous avez une bonne compréhension du sujet.'
                        : '📚 Révisez les sections pour améliorer votre score.'}
                    </p>
                  </div>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={resetQuiz}
                      className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      Recommencer
                    </button>
                    <Link
                      href="/theorie"
                      className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Retour à la théorie
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
