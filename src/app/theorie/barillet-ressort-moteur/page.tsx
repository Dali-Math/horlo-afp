'use client';

import React, { useState } from 'react';
import { ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const quizData = [
  {
    question: "Quelle est la fonction principale du barillet dans une montre mécanique ?",
    options: [
      "Afficher l'heure",
      "Stocker l'énergie du ressort moteur",
      "Régler la précision",
      "Faire tic-tac"
    ],
    correctAnswer: 1,
    explanation: "Le barillet est l'organe moteur de la montre. Il contient le ressort moteur enroulé qui stocke l'énergie mécanique et la libère progressivement pour faire fonctionner le mouvement."
  },
  {
    question: "De quel matériau est traditionnellement fabriqué le ressort moteur ?",
    options: [
      "Acier inoxydable classique",
      "Laiton",
      "Acier trempé au carbone ou alliage Nivaflex",
      "Maillechort"
    ],
    correctAnswer: 2,
    explanation: "Le ressort moteur est fabriqué en acier spécial trempé au carbone, ou en alliages modernes comme le Nivaflex (Ni-Cr-Co-Ti-Be) qui offrent une meilleure résistance à la fatigue et aux variations magnétiques."
  },
  {
    question: "Quelle est la durée de marche typique d'une montre mécanique avec un seul barillet ?",
    options: ["12 heures", "36-48 heures", "7 jours", "1 mois"],
    correctAnswer: 1,
    explanation: "La plupart des montres mécaniques modernes offrent une réserve de marche de 36 à 48 heures. Les montres avec double barillet ou barillets surdimensionnés peuvent atteindre 8 jours ou plus."
  },
  {
    question: "Que se passe-t-il lorsque le ressort est complètement armé ?",
    options: [
      "Il se casse",
      "Le bride-glissant glisse pour éviter la surtension",
      "La montre s'arrête",
      "Le barillet tourne à l'envers"
    ],
    correctAnswer: 1,
    explanation: "Le bride-glissant (ou bride à friction) est un dispositif de sécurité fixé à l'extrémité externe du ressort. Lorsque le ressort est complètement armé, il glisse dans le tambour pour éviter la surtension et la casse du ressort."
  },
  {
    question: "Comment calcule-t-on approximativement le nombre de tours du barillet pour une réserve de 40h ?",
    options: [
      "40 tours",
      "6-7 tours",
      "100 tours",
      "1 tour par heure"
    ],
    correctAnswer: 1,
    explanation: "Un barillet effectue généralement entre 6 et 7 tours complets pour assurer 40-48h de réserve de marche. Le calcul exact dépend du diamètre du barillet, de la longueur du ressort et du couple nécessaire au mouvement."
  }
];

export default function BarilletRessortMoteur() {
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
            Organe moteur
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Le Barillet et Ressort Moteur
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Découvrez l'organe qui stocke et distribue l'énergie dans une montre mécanique
          </p>
        </div>

        {/* Section 1: Principe et fonction */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Principe et fonction du barillet</h2>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Le <strong>barillet</strong> est l'organe moteur de la montre mécanique. C'est un tambour cylindrique qui contient le <strong>ressort moteur</strong> enroulé en spirale. 
            Lorsque vous remontez votre montre (manuellement ou automatiquement), vous armez ce ressort qui stocke l'énergie mécanique sous forme de tension élastique.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Cette énergie est ensuite <strong>libérée progressivement</strong> pendant 36 à 48 heures (voire plus pour certains calibres) pour faire tourner le rouage et maintenir la montre en marche. 
            Le barillet agit comme une "batterie mécanique" qui alimente tous les organes du mouvement.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-blue-600 my-6">
            <div className="flex items-start">
              <Battery className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">💡 Analogie</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Le barillet fonctionne comme un <strong>ressort de voiture à pédales</strong> : plus vous remontez (pédales), plus le ressort accumule d'énergie. 
                  Cette énergie se libère ensuite lentement pour faire avancer le véhicule (ou tourner les aiguilles).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Constitution du barillet */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Constitution du barillet</h2>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Le barillet se compose de <strong>quatre éléments principaux</strong> :
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Le Tambour</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Cylindre métallique creux (généralement en laiton) qui contient le ressort. Il possède une denture extérieure qui engrène avec le rouage.
              </p>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 bg-white dark:bg-slate-900 p-3 rounded">
                <strong>Diamètre typique :</strong> 8-12 mm<br/>
                <strong>Hauteur :</strong> 1.5-2.5 mm
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. L'Arbre de barillet</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Axe central fixe autour duquel s'enroule l'extrémité interne du ressort. Il transmet le couple de remontage via le rochet et le cliquet.
              </p>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 bg-white dark:bg-slate-900 p-3 rounded">
                <strong>Matériau :</strong> Acier trempé<br/>
                <strong>Fonction :</strong> Point d'ancrage du ressort
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Le Ressort moteur</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Lame d'acier ou alliage spécial (Nivaflex) enroulée en spirale. C'est le réservoir d'énergie de la montre.
              </p>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 bg-white dark:bg-slate-900 p-3 rounded">
                <strong>Longueur :</strong> 300-500 mm<br/>
                <strong>Épaisseur :</strong> 0.10-0.15 mm<br/>
                <strong>Largeur :</strong> 1.5-2 mm
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Le Couvercle</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Ferme le tambour et maintient le ressort à l'intérieur. Fixé par vissage ou chassage.
              </p>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 bg-white dark:bg-slate-900 p-3 rounded">
                <strong>Matériau :</strong> Laiton ou acier<br/>
                <strong>Fonction :</strong> Protection et étanchéité
              </div>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">📐 Schéma suggéré :</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              [Vue éclatée du barillet montrant : tambour denté, arbre central, ressort en spirale, couvercle, bride-glissant à l'extrémité externe du ressort]
            </p>
          </div>
        </div>

        {/* Section 3: Le ressort moteur */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Le ressort moteur en détail</h2>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              Le <strong>ressort moteur</strong> est une bande métallique mince et longue, enroulée en spirale à l'intérieur du tambour. 
              Ses deux extrémités sont fixées :
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Extrémité interne :</strong> Accrochée à l'arbre de barillet via un crochet ou un trou. C'est cette extrémité qui reçoit le couple de remontage.
              </li>
              <li>
                <strong>Extrémité externe :</strong> Fixée au tambour par un <strong>bride-glissant</strong> (dispositif de sécurité qui glisse en cas de surtension).
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Matériaux modernes</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Matériau</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Composition</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Avantages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Acier au carbone</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Fe + C (0.6-1%)</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Traditionnel, éprouvé, économique</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Nivaflex</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Ni-Cr-Co-Ti-Be</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Antimagnétique, résistant à la fatigue</td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Nivaflex NM</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Alliage Nivarox amélioré</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Couple constant supérieur, longévité accrue</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-4 rounded-r-lg mt-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-1">⚠️ Attention</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Un ressort cassé ou fatigué perd sa capacité à stocker l'énergie. Symptômes : réserve de marche réduite, arrêts fréquents, couple irrégulier. 
                    Le remplacement doit être effectué par un horloger qualifié.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Armage et désarmage */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Armage et désarmage du ressort</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Armage (Remontage)</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Lorsque vous tournez la couronne ou que la masse oscillante tourne (remontage automatique), le rochet entraîne l'arbre de barillet qui enroule le ressort sur lui-même.
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Nombre de tours :</strong> 6-8 tours complets<br/>
                  <strong>Couple maximal :</strong> Environ 12-15 µN·m<br/>
                  <strong>Durée :</strong> 20-30 secondes (manuel)
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-red-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Désarmage (Marche)</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Le ressort se détend lentement et fait tourner le tambour denté qui entraîne le rouage. L'énergie est libérée de manière contrôlée par l'échappement.
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Durée de marche :</strong> 36-48h typique<br/>
                  <strong>Couple décroissant :</strong> Perte de 20-30% en fin de réserve<br/>
                  <strong>Vitesse :</strong> ~1 tour du tambour par 6-8 heures
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">🔢 Calcul simplifié de la réserve de marche</h4>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <strong>Formule approximative :</strong>
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg font-mono text-sm">
                Réserve (h) = (Nombre de tours × Longueur du ressort) / (Vitesse de rotation du tambour × Démultiplication)
              </div>
              <p className="text-sm italic">
                En pratique, un barillet standard de 10mm de diamètre avec un ressort de 400mm peut assurer environ 40-48h de marche.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Types de barillets */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Types de barillets et évolutions</h2>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Barillet simple (classique)</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Configuration standard : un seul barillet, réserve de marche de 36-48h. Convient à la majorité des montres mécaniques.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Double barillet (série)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Deux barillets montés en série : le premier entraîne le second. Double la réserve de marche (jusqu'à 8-10 jours).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Exemples :</strong> Panerai 8 jours, IWC Portugieser 7 jours
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Barillet géant (oversized)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Barillet surdimensionné pour maximiser la longueur du ressort. Permet d'atteindre 5-7 jours avec un seul barillet.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Avantage :</strong> Couple plus constant, meilleure régularité
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Barillet tournant (Remontage auto)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Dans les montres automatiques, le barillet est armé en continu par la masse oscillante via un système de rouages et rochets unidirectionnels.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Efficacité :</strong> 60-80% de l'énergie des mouvements du poignet convertie
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Vocabulaire technique */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vocabulaire technique</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Rochet</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Roue dentée fixée sur l'arbre de barillet permettant le remontage du ressort dans un seul sens.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cliquet</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pièce qui s'engage dans les dents du rochet pour empêcher le ressort de se désarmer brutalement.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Bride-glissant</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Dispositif de sécurité à l'extrémité externe du ressort qui glisse en cas de surtension lors du remontage.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Couple moteur</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Force de rotation transmise par le barillet au rouage (exprimée en µN·m ou mN·mm).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Réserve de marche</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Durée pendant laquelle la montre fonctionne après un remontage complet du ressort.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Mobile de barillet</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Ensemble formé par le tambour denté et son axe. Premier mobile du rouage de finissage.</p>
            </div>
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
