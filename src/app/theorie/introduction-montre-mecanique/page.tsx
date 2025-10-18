'use client';

import React, { useState } from 'react';
import { ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch } from 'lucide-react';
import Link from 'next/link';

const quizData = [
  {
    question: "Quelle est la différence principale entre une montre mécanique et une montre à quartz ?",
    options: [
      "La montre mécanique utilise une pile",
      "La montre mécanique fonctionne grâce à l'énergie d'un ressort",
      "La montre à quartz est plus précise que toutes les montres mécaniques",
      "Les montres mécaniques n'ont pas besoin d'entretien"
    ],
    correctAnswer: 1,
    explanation: "Une montre mécanique tire son énergie d'un ressort moteur qui, une fois armé, libère progressivement son énergie. Une montre à quartz utilise une pile et un cristal de quartz pour sa précision."
  },
  {
    question: "Combien d'organes principaux compose une montre mécanique simple ?",
    options: ["3 organes", "6 organes", "10 organes", "12 organes"],
    correctAnswer: 1,
    explanation: "Une montre mécanique se compose de 6 organes principaux : le moteur (barillet), le rouage, l'échappement, l'organe réglant (balancier-spiral), le remontoir et l'affichage."
  },
  {
    question: "Quel organe régule la vitesse de la montre et assure sa précision ?",
    options: [
      "Le barillet",
      "Le rouage",
      "Le balancier-spiral",
      "La couronne"
    ],
    correctAnswer: 2,
    explanation: "Le balancier-spiral est l'organe réglant de la montre. Il oscille à une fréquence constante et régule la vitesse à laquelle l'énergie du ressort est libérée, assurant ainsi la précision."
  },
  {
    question: "Quelle est la fonction principale de l'échappement ?",
    options: [
      "Stocker l'énergie",
      "Afficher l'heure",
      "Transformer l'énergie continue en impulsions régulières",
      "Remonter le ressort"
    ],
    correctAnswer: 2,
    explanation: "L'échappement transforme l'énergie continue du ressort moteur en impulsions régulières qui entretiennent l'oscillation du balancier. C'est le 'cœur battant' de la montre."
  },
  {
    question: "Quelle est la durée de marche typique d'une montre mécanique moderne ?",
    options: ["12 heures", "24 heures", "36-48 heures", "7 jours"],
    correctAnswer: 2,
    explanation: "La plupart des montres mécaniques modernes offrent une réserve de marche de 36 à 48 heures. Certaines complications peuvent atteindre 8 jours ou plus grâce à des barillets multiples ou de plus grande taille."
  }
];

export default function IntroductionMontreMecanique() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
            Théorie de base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Introduction à la Montre Mécanique
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Découvrez les principes fondamentaux du fonctionnement d'une montre mécanique et ses organes essentiels
          </p>
        </div>

        {/* Section 1: Qu'est-ce qu'une montre mécanique ? */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Qu'est-ce qu'une montre mécanique ?</h2>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Une <strong>montre mécanique</strong> est un instrument de mesure du temps fonctionnant grâce à l'énergie mécanique d'un ressort moteur. 
            Contrairement aux montres à quartz qui utilisent une pile et un oscillateur électronique, la montre mécanique est entièrement mécanique et ne nécessite aucune source d'énergie électrique.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Le principe de base est simple : un <strong>ressort</strong> est armé (par remontage manuel ou automatique), puis libère progressivement son énergie pour faire tourner les aiguilles. 
            Cette énergie est régulée par un système d'<strong>échappement</strong> et un <strong>balancier-spiral</strong> qui oscillent à une fréquence constante, garantissant la précision du mouvement.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-blue-800 dark:text-blue-300">💡 Le saviez-vous ?</strong><br/>
              Une montre mécanique peut contenir entre 100 et 300 composants, voire plus de 1000 pour les grandes complications (chronographe, calendrier perpétuel, tourbillon...).
            </p>
          </div>
        </div>

        {/* Section 2: Les 6 organes principaux */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Les 6 organes principaux</h2>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Une montre mécanique simple se compose de <strong>six organes essentiels</strong> qui travaillent ensemble pour mesurer le temps avec précision :
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Le Moteur (Barillet)</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Le <strong>barillet</strong> contient le ressort moteur qui stocke l'énergie mécanique. C'est la source d'énergie de la montre.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Cog className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. Le Rouage</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Ensemble de roues dentées et pignons qui <strong>transmettent l'énergie</strong> du barillet vers l'échappement en démultipliant la vitesse.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Gauge className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. L'Échappement</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Transforme l'énergie continue en <strong>impulsions régulières</strong>. C'est le "cœur battant" de la montre (tic-tac).
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">4. L'Organe Réglant</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Le <strong>balancier-spiral</strong> oscille à fréquence constante et régule la vitesse du mouvement. C'est lui qui garantit la précision.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-red-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Watch className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">5. Le Remontoir</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Mécanisme permettant d'<strong>armer le ressort</strong> (manuellement via la couronne, ou automatiquement via une masse oscillante).
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-cyan-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Eye className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">6. L'Affichage</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Les <strong>aiguilles et cadran</strong> qui permettent de lire l'heure. Actionnés par le rouage via la chaussée et la minuterie.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Fonctionnement général */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Fonctionnement général</h2>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              Le fonctionnement d'une montre mécanique suit un <strong>circuit énergétique précis</strong> :
            </p>

            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong>Stockage de l'énergie</strong> : Le ressort moteur est armé dans le barillet (remontage manuel ou automatique).
              </li>
              <li>
                <strong>Transmission</strong> : L'énergie passe par le rouage qui démultiplie la rotation du barillet pour atteindre des vitesses adaptées.
              </li>
              <li>
                <strong>Régulation</strong> : L'échappement transforme l'énergie continue en impulsions qui entretiennent l'oscillation du balancier-spiral.
              </li>
              <li>
                <strong>Comptage du temps</strong> : Chaque oscillation du balancier correspond à un "battement". Pour une fréquence de 28'800 alternances/heure, le balancier oscille 8 fois par seconde.
              </li>
              <li>
                <strong>Affichage</strong> : Le rouage transmet le mouvement aux aiguilles via la chaussée (aiguille des minutes) et le renvoi (aiguille des heures).
              </li>
            </ol>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 mt-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Schéma suggéré :</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                [Insérer ici un schéma simplifié montrant les 6 organes et le flux d'énergie : Barillet → Rouage → Échappement → Balancier ↔ Spiral, avec branchement vers Affichage]
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Vocabulaire essentiel */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vocabulaire essentiel</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Calibre</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Désigne le type de mouvement horloger (ex : ETA 6497, Sellita SW200).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Platine</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Plaque de base du mouvement sur laquelle sont fixés tous les organes.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Pont</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pièce fixée sur la platine qui maintient les axes des mobiles (pont de barillet, pont d'ancre...).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Mobile</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Ensemble formé par une roue et un pignon monté sur un axe.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Alternance (A/h)</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Nombre d'oscillations du balancier par heure. Valeurs courantes : 18'000, 21'600, 28'800 A/h.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Réserve de marche</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Durée pendant laquelle la montre fonctionne après un remontage complet (typiquement 36-48h).</p>
            </div>
          </div>
        </div>

        {/* Section 5: Différences avec d'autres types de montres */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Montre mécanique vs autres technologies</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Critère</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Mécanique</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Quartz</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Smartwatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Source d'énergie</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Ressort moteur</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Pile</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Batterie rechargeable</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Précision</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">±5 à 15 sec/jour</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">±15 sec/mois</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Connectée (précision absolue)</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Autonomie</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">36-48h (remontage quotidien)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">2-5 ans</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">1-2 jours</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Entretien</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Révision tous les 3-5 ans</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Changement de pile</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Mises à jour logicielles</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Durée de vie</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Plusieurs générations</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">10-20 ans</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">3-5 ans</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Valeur artisanale</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Très élevée</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Faible</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Nulle (obsolescence)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Quiz : Testez vos connaissances</h2>

          {!quizCompleted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Question {currentQuestion + 1} sur {quizData.length}
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Score : {score}/{quizData.length}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-8">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {quizData[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-6">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === null
                        ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                        : index === quizData[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                        : 'border-slate-200 dark:border-slate-700 opacity-50'
                    }`}
                  >
                    <span className="font-semibold mr-3 text-slate-700 dark:text-slate-200">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-slate-800 dark:text-slate-100">{option}</span>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 mb-6 rounded">
                    <p className="text-slate-700 dark:text-slate-300">{quizData[currentQuestion].explanation}</p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    {currentQuestion < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz terminé !</h3>
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
                Vous avez obtenu {score} sur {quizData.length} ({Math.round((score / quizData.length) * 100)}%)
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Recommencer le quiz
                </button>
                <Link 
                  href="/theorie" 
                  className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Retour à la théorie
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
