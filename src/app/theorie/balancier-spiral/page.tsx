'use client';

import React, { useState } from 'react';
import { ChevronLeft, Gauge, Zap, Settings, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

const quizData = [
  {
    question: "Quelle est la fonction principale du balancier-spiral ?",
    options: [
      "Stocker l'énergie",
      "Régler la vitesse et assurer la précision",
      "Afficher l'heure",
      "Transmettre l'énergie"
    ],
    correctAnswer: 1,
    explanation: "Le balancier-spiral est l'organe réglant de la montre. Il oscille à fréquence constante et détermine la vitesse à laquelle l'énergie est libérée, assurant ainsi la précision."
  },
  {
    question: "Quelle est la fréquence d'oscillation la plus courante pour un balancier moderne ?",
    options: ["18'000 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
    correctAnswer: 2,
    explanation: "La fréquence de 28'800 alternances par heure (4 Hz) est la plus répandue. Cela correspond à 8 battements par seconde, offrant un bon compromis entre précision et consommation d'énergie."
  },
  {
    question: "De quel matériau moderne est fabriqué le spiral antimagnétique ?",
    options: ["Acier trempé", "Nivaflex (Ni-Cr-Co-Ti-Be)", "Laiton", "Rubis"],
    correctAnswer: 1,
    explanation: "Le Nivaflex et le Nivarox (alliages Ni-Cr-Co-Ti-Be) ont remplacé l'acier classique. Ils sont antimagnétiques, insensibles aux variations de température et ne nécessitent pas de compensation."
  },
  {
    question: "Comment agit-on pour régler l'avance ou le retard d'une montre ?",
    options: [
      "On change le ressort",
      "On déplace la raquette pour modifier la longueur active du spiral",
      "On change le balancier",
      "On ajuste l'échappement"
    ],
    correctAnswer: 1,
    explanation: "Le réglage se fait via la raquette (ou système de réglage fin). En la déplaçant, on modifie la longueur active du spiral, ce qui change sa fréquence d'oscillation et donc l'avance/retard de la montre."
  },
  {
    question: "Qu'est-ce qui caractérise un spiral Breguet ?",
    options: [
      "Il est plat",
      "Sa spire externe est relevée pour assurer un développement concentrique",
      "Il est en silicium",
      "Il n'a pas de courbe terminale"
    ],
    correctAnswer: 1,
    explanation: "Le spiral Breguet possède une courbe terminale relevée (spire externe) qui permet un développement concentrique du spiral lors de l'oscillation, améliorant ainsi la précision et l'isochronisme."
  }
];

export default function BalancierSpiral() {
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
          <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4">
            Organe réglant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Le Balancier-Spiral
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            L'organe qui bat le tempo : découvrez le cœur oscillant de la montre mécanique
          </p>
        </div>

        {/* Section 1: Principe et fonction */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Principe et fonction du balancier-spiral</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Le <strong>balancier-spiral</strong> est l'<strong>organe réglant</strong> de la montre mécanique. C'est l'équivalent du pendule dans une horloge : 
            il oscille à une <strong>fréquence constante</strong> qui détermine la précision du mouvement.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Ce système se compose de deux éléments indissociables :
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Gauge className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Le Balancier</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Roue inertielle qui <strong>oscille</strong> autour de son axe. Sa masse et son rayon déterminent son <strong>moment d'inertie</strong>, 
                qui influence la fréquence d'oscillation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Le Spiral</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Ressort en spirale qui <strong>rappelle</strong> le balancier à sa position d'équilibre. Sa rigidité et sa longueur déterminent la 
                <strong> fréquence d'oscillation</strong>.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-green-600">
            <div className="flex items-start">
              <Clock className="w-8 h-8 text-green-600 dark:text-green-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">⏱️ Le métronome de la montre</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Le balancier-spiral fonctionne comme un <strong>métronome</strong> : il bat le tempo avec une régularité remarquable. 
                  Même si l'énergie du barillet diminue, la fréquence reste quasi constante grâce aux propriétés du système masse-ressort.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Le balancier */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Le balancier en détail</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Le <strong>balancier</strong> est une roue métallique qui oscille autour d'un axe porté par des pivots sur rubis. 
            Sa conception influence directement la précision du mouvement.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Constitution</h3>
          
          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">1. La serge (jante)</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Anneau périphérique qui concentre la masse à l'extérieur pour maximiser le moment d'inertie. Plus le rayon est grand, 
                plus l'inertie est élevée et plus l'oscillation est stable.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">2. Les bras</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Relient la serge au moyeu central. Leur forme (en S, droits, croisés) influence la répartition des masses et la compensation thermique.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">3. Le plateau double</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Fixé sur l'axe, il porte la cheville qui interagit avec la fourchette de l'ancre. Comporte également le dard (sécurité).
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">4. Les masselottes (optionnel)</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Petites vis de réglage vissées dans la serge permettant d'ajuster finement le moment d'inertie et donc la fréquence.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Matériaux modernes</h3>
          
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
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Glucydur</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">CuBe (Cuivre-Béryllium)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Antimagnétique, faible dilatation thermique</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Titane</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Ti pur ou alliage</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Léger, antimagnétique, anticorrosion</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Silicium</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Si monocristallin</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Très léger, insensible au magnétisme, précision extrême</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Le spiral */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Le spiral : ressort oscillateur</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Le <strong>spiral</strong> est un ressort fin enroulé en spirale d'Archimède dont l'extrémité interne est fixée sur l'axe du balancier (virole) 
            et l'extrémité externe est fixée au coq (piton). Sa fonction : rappeler le balancier à sa position d'équilibre.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Caractéristiques techniques</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Épaisseur</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">0.04 à 0.08 mm (très fin !)</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Largeur</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">0.10 à 0.18 mm</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Spires</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">12 à 15 spires</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Types de spiraux</h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Spiral plat</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Spiral standard dont toutes les spires restent dans un même plan horizontal. Simple à fabriquer mais peut présenter des défauts de concentricité 
                lors des grandes amplitudes.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Usage :</strong> Mouvements standards, bonne précision générale
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Spiral Breguet</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Spiral dont la <strong>spire externe est relevée</strong> pour assurer un développement concentrique parfait. 
                Inventé par Abraham-Louis Breguet vers 1795, il améliore considérablement l'isochronisme (régularité quelle que soit l'amplitude).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Usage :</strong> Montres haut de gamme, chronomètres
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Spiral silicium</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Fabriqué par procédé LIGA (photolithographie), le spiral en <strong>silicium monocristallin</strong> est antimagnétique, 
                insensible aux variations de température et ne nécessite aucun réglage après fabrication.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Usage :</strong> Montres de luxe modernes (Patek Philippe Silinvar, Rolex Parachrom)
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Réglage */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Réglage de la marche</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Le <strong>réglage</strong> consiste à ajuster la fréquence d'oscillation du balancier pour corriger l'avance ou le retard de la montre. 
            Deux systèmes principaux existent :
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Raquetterie (traditionnel)</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                La <strong>raquette</strong> est un levier mobile qui pince le spiral entre deux goupilles (clavettes). 
                En déplaçant la raquette, on modifie la <strong>longueur active</strong> du spiral.
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Avance :</strong> Raccourcir le spiral (déplacer vers +)<br/>
                  <strong>Retard :</strong> Allonger le spiral (déplacer vers -)
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free-sprung (moderne)</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Système <strong>sans raquette</strong> : le réglage se fait via des <strong>masselottes</strong> (petites vis) 
                vissées dans la serge du balancier. Plus stable dans le temps.
              </p>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Avance :</strong> Visser les masselottes vers le centre<br/>
                  <strong>Retard :</strong> Dévisser vers l'extérieur
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-4 rounded-r-lg">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">⚠️ Réglage professionnel uniquement</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Le réglage d'une montre nécessite un équipement spécialisé (vibrographe, positomètre) et une formation horlogère. 
              Une manipulation incorrecte peut endommager le spiral ou dérégler complètement la montre.
            </p>
          </div>
        </div>

        {/* Section 5: Fréquences d'oscillation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Fréquences d'oscillation courantes</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Alternances/heure</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Fréquence (Hz)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Battements/sec</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">18'000 A/h</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">2.5 Hz</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">5 batt/sec</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Montres vintage, mouvements lents</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">21'600 A/h</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">3 Hz</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">6 batt/sec</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Standard classique (ETA 6497, 7750...)</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">28'800 A/h</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">4 Hz</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">8 batt/sec</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Standard moderne (majorité des mouvements)</td>
                </tr>
                <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">36'000 A/h</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">5 Hz</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">10 batt/sec</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200">Haute fréquence (Zenith El Primero)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">🔢 Formule de conversion</h4>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg font-mono text-sm">
              Fréquence (Hz) = Alternances/heure ÷ 7200<br/>
              Battements/sec = Fréquence (Hz) × 2
            </div>
          </div>
        </div>

        {/* Section 6: Vocabulaire technique */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vocabulaire technique</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Amplitude</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Angle maximal parcouru par le balancier depuis sa position d'équilibre (typiquement 270-330°).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Isochronisme</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Propriété du balancier-spiral à osciller à la même fréquence quelle que soit l'amplitude.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Moment d'inertie</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Résistance du balancier à l'accélération angulaire (dépend de sa masse et de son rayon).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Virole</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pièce fixée sur l'axe du balancier qui serre l'extrémité interne du spiral.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Piton</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Point d'attache de l'extrémité externe du spiral sur le coq (pont de balancier).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Coq</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pont supérieur qui maintient l'axe du balancier et porte souvent la signature de la marque.</p>
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
