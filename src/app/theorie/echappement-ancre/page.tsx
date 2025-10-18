'use client';

import React, { useState } from 'react';
import { ChevronLeft, Activity, Zap, Clock, Heart, Settings2 } from 'lucide-react';
import Link from 'next/link';

const quizData = [
  {
    question: "Quelle est la fonction principale de l'échappement dans une montre mécanique ?",
    options: [
      "Stocker l'énergie",
      "Transformer l'énergie continue en impulsions régulières",
      "Afficher l'heure",
      "Remonter le ressort"
    ],
    correctAnswer: 1,
    explanation: "L'échappement transforme l'énergie continue du barillet en impulsions régulières qui entretiennent l'oscillation du balancier. C'est le 'cœur battant' de la montre qui produit le tic-tac."
  },
  {
    question: "Combien d'éléments principaux composent l'échappement à ancre suisse ?",
    options: ["2 éléments", "3 éléments", "5 éléments", "7 éléments"],
    correctAnswer: 1,
    explanation: "L'échappement à ancre suisse comporte 3 éléments principaux : la roue d'échappement (dentée), l'ancre (avec 2 palettes en rubis) et le plateau de balancier (avec sa cheville)."
  },
  {
    question: "Quelle est la fréquence d'oscillation la plus courante en horlogerie moderne ?",
    options: ["18'000 A/h (2.5 Hz)", "21'600 A/h (3 Hz)", "28'800 A/h (4 Hz)", "36'000 A/h (5 Hz)"],
    correctAnswer: 2,
    explanation: "La fréquence de 28'800 alternances par heure (4 Hz) est la plus répandue dans l'horlogerie moderne. Cela correspond à 8 battements par seconde (4 aller-retours)."
  },
  {
    question: "Quel matériau est utilisé pour les palettes de l'ancre ?",
    options: ["Acier trempé", "Rubis synthétique", "Saphir", "Diamant"],
    correctAnswer: 1,
    explanation: "Les palettes de l'ancre sont en rubis synthétique (corindon Al₂O₃). Le rubis réduit considérablement les frottements et l'usure grâce à sa dureté exceptionnelle."
  },
  {
    question: "Qu'est-ce que le 'tirage' dans un échappement ?",
    options: [
      "La force du ressort",
      "L'action qui maintient l'ancre en position de repos",
      "Le bruit du tic-tac",
      "La vitesse du balancier"
    ],
    correctAnswer: 1,
    explanation: "Le tirage est l'action qui maintient l'ancre appuyée contre sa goupille de limitation (butée) pendant le repos. Il est assuré par la géométrie des dents de la roue d'échappement."
  }
];

export default function EchappementAncre() {
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
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-4">
            Organe de distribution
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            L'Échappement à Ancre Suisse
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Le cœur battant de la montre : découvrez le mécanisme qui transforme l'énergie en impulsions régulières
          </p>
        </div>

        {/* Section 1: Principe et fonction */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Principe et fonction de l'échappement</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            L'<strong>échappement</strong> est l'organe qui distribue l'énergie du barillet au balancier sous forme d'impulsions régulières. 
            Il remplit une <strong>double fonction essentielle</strong> :
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Entretien</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                L'échappement <strong>entretient les oscillations</strong> du balancier en lui donnant une impulsion à chaque alternance pour compenser les pertes d'énergie dues aux frottements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600">
              <div className="flex items-center mb-3">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. Comptage</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                À chaque alternance, il laisse <strong>"échapper" une dent</strong> de la roue d'échappement, permettant au rouage d'avancer par saccades au rythme imposé par le balancier.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-purple-600">
            <div className="flex items-start">
              <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">💓 Le "tic-tac" de la montre</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Le bruit caractéristique "tic-tac" d'une montre mécanique est produit par l'échappement : chaque "tic" et chaque "tac" correspond à une impulsion donnée au balancier. 
                  À 28'800 A/h, vous entendez 8 battements par seconde !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Les 3 éléments */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Les 3 éléments de l'échappement à ancre</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            L'échappement à ancre suisse se compose de <strong>trois éléments principaux</strong> qui travaillent en parfaite synchronisation :
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">1. La Roue d'Échappement</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Roue dentée spéciale (généralement 15 dents) dont la géométrie est étudiée pour permettre le dégagement et transmettre l'impulsion. 
                Elle reçoit l'énergie du rouage et la transmet à l'ancre.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Nombre de dents :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">15 dents (standard)</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Matériau :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">Acier trempé poli</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Vitesse :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">1 tour/minute typique</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">2. L'Ancre (Fourchette)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Pièce pivotante en forme de T ou Y portant <strong>deux palettes en rubis</strong> (entrée et sortie) qui alternativement bloquent et libèrent la roue d'échappement. 
                La fourchette à l'extrémité de l'ancre interagit avec la cheville du plateau de balancier.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Palettes :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">2 rubis synthétiques (dureté 9 Mohs)</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Fonction :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">Alternance blocage/impulsion</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">3. Le Plateau de Balancier</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Disque fixé sur l'axe du balancier portant la <strong>cheville</strong> (petit cylindre en rubis) qui pousse la fourchette de l'ancre à chaque passage. 
                Il comporte aussi l'<strong>encoche de sécurité</strong> (dard) pour éviter les blocages.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Cheville :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">Rubis cylindrique (Ø 0.15-0.20 mm)</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm">
                  <strong className="text-slate-900 dark:text-white">Encoche :</strong><br/>
                  <span className="text-slate-700 dark:text-slate-300">Sécurité anti-galop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Fonctionnement en 4 phases */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Fonctionnement en 4 phases</h2>
          
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Le cycle de l'échappement se déroule en <strong>quatre phases successives</strong> à chaque alternance du balancier :
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Repos</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Une palette de l'ancre bloque la roue d'échappement. L'ancre est maintenue en position par le <strong>tirage</strong> (pression de la dent sur la palette). 
                    Le balancier oscille librement pendant son arc supplémentaire (~270-300°).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-green-600">
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Dégagement (Comptage)</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    La cheville du plateau pousse la fourchette, qui fait pivoter l'ancre. La palette libère la roue d'échappement : <strong>une dent "échappe"</strong>. 
                    Le rouage avance d'un cran. C'est le "tic".
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-purple-600">
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Impulsion</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Immédiatement après le dégagement, la dent de la roue pousse sur le plan incliné de la palette et transmet une <strong>impulsion</strong> au balancier via l'ancre et la fourchette. 
                    C'est cette énergie qui compense les frottements et maintient l'amplitude.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-orange-600">
              <div className="flex items-start">
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Chute</h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    L'ancre bascule complètement : la palette opposée vient bloquer la dent suivante de la roue d'échappement. C'est le "tac". 
                    L'ancre est de nouveau maintenue par le tirage jusqu'à la prochaine alternance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-4 rounded-r-lg">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">⚡ Données chiffrées</h4>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <li>• <strong>Durée d'une alternance :</strong> 0.125 seconde (à 28'800 A/h)</li>
              <li>• <strong>Angle d'impulsion :</strong> ~50-55° parcourus par le balancier pendant l'impulsion</li>
              <li>• <strong>Arc supplémentaire :</strong> ~270-300° d'oscillation libre</li>
              <li>• <strong>Amplitude totale :</strong> ~320-330° (en marche optimale)</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Types d'échappements */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Évolution et types d'échappements</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Échappement à ancre suisse (standard)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                L'échappement de référence depuis plus d'un siècle. Fiable, précis, facilement réparable. Équipe 95% des montres mécaniques modernes.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Avantages :</strong> Robustesse, pièces interchangeables, entretien maîtrisé<br/>
                <strong>Inconvénient :</strong> Frottements des palettes nécessitant huilage régulier
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Échappement co-axial (George Daniels/Omega)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Innovation majeure : trois niveaux de roues réduisent les frottements de 90%. Nécessite moins d'huile et prolonge les intervalles d'entretien (8-10 ans au lieu de 3-5).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Avantages :</strong> Frottements minimaux, stabilité long terme, moins d'entretien<br/>
                <strong>Inconvénient :</strong> Fabrication complexe, peu de horlogers formés
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Échappement à détente (chronomètres marins)</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Échappement libre (sans frottement au repos) offrant une précision maximale. Utilisé historiquement dans les chronomètres de marine. 
                Très sensible aux chocs, peu adapté aux montres-bracelets.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Avantages :</strong> Précision exceptionnelle, échappement libre<br/>
                <strong>Inconvénient :</strong> Fragile, non remontable à rebours
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Échappement à force constante</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Système qui emmagasine l'énergie du barillet et la restitue par impulsions constantes au balancier, éliminant les variations de couple. 
                Très rare et complexe (Girard-Perregaux Constant Escapement, A. Lange & Söhne).
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Avantages :</strong> Amplitude constante, précision maximale<br/>
                <strong>Inconvénient :</strong> Extrêmement complexe et coûteux
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Vocabulaire technique */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Vocabulaire technique</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Alternance (A/h)</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Nombre d'oscillations du balancier par heure. Valeurs courantes : 18'000, 21'600, 28'800, 36'000 A/h.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Angle de levée</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Angle parcouru par le balancier pendant les phases de dégagement et d'impulsion (~50-55°).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Arc supplémentaire</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Angle d'oscillation libre du balancier pendant le repos de l'échappement (~270-300°).</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Tirage</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Force qui maintient l'ancre appuyée contre sa goupille de limitation pendant le repos.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Palette</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pierre précieuse (rubis) fixée sur l'ancre qui reçoit l'impulsion de la roue d'échappement.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cheville (ou ellipse)</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Petit cylindre en rubis fixé sur le plateau de balancier qui pousse la fourchette de l'ancre.</p>
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
