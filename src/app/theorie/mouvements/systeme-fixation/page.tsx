'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Wrench, Shield } from 'lucide-react';

export default function SystemeFixationPage() {
  const [selectedFixation, setSelectedFixation] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const fixationTypes = [
    {
      id: 'vissage',
      name: 'Vissage Direct',
      icon: '🔩',
      description: 'Vis traversent le pont et se vissent dans la platine',
      details: [
        'Vis en acier bleui (traitement thermique à 300°C)',
        'Têtes polies miroir ou satinées',
        'Fentes parfaitement centrées et polies',
        'Couple de serrage calibré (0,08 à 0,15 Nm)',
      ],
      avantages: ['Démontage facile', 'Positionnement précis', 'Résistance mécanique'],
      inconvenients: ['Risque de déformation si mal serré', 'Sensibilité aux chocs latéraux'],
    },
    {
      id: 'chatons',
      name: 'Chatons et Pierres',
      icon: '💎',
      description: 'Pierres en rubis synthétique pour guidage des pivots',
      details: [
        'Pierres percées : guidage radial des pivots',
        'Contre-pivots : limitation du jeu axial',
        'Chatons vissés ou chassés dans platine',
        'Coefficient de frottement très faible',
      ],
      avantages: ['Réduction drastique des frottements', 'Usure minimale', 'Durée de vie exceptionnelle'],
      inconvenients: ['Coût élevé', 'Fragilité aux chocs violents', 'Remplacement délicat'],
    },
    {
      id: 'goupilles',
      name: 'Goupilles de Positionnement',
      icon: '📍',
      description: 'Goupilles coniques pour positionnement précis avant serrage',
      details: [
        'Diamètre typique : 0,3 à 0,8 mm',
        'Conicité : 1 à 2° pour ajustement parfait',
        'Chassées dans pont ou platine',
        'Garantissent l\'alignement des paliers',
      ],
      avantages: ['Positionnement répétable', 'Facilite assemblage', 'Pas de jeu'],
      inconvenients: ['Nécessite usinage précis', 'Peut se détériorer au démontage répété'],
    },
  ];

  const quizData = [
    {
      question: "Pourquoi utilise-t-on des rubis synthétiques dans les paliers horlogers ?",
      options: [
        "Pour leur aspect esthétique uniquement",
        "Pour leur faible coefficient de frottement et leur dureté",
        "Parce qu'ils sont moins chers que le métal",
        "Pour augmenter le poids du mouvement"
      ],
      correct: 1,
      explanation: "Les rubis synthétiques (corindon) ont un coefficient de frottement très faible et une dureté exceptionnelle (9 sur l'échelle de Mohs), réduisant drastiquement l'usure et les frottements."
    },
    {
      question: "Quelle est la tolérance typique pour l'entraxe des paliers d'un mouvement de qualité ?",
      options: [
        "±0,1 mm",
        "±0,05 mm",
        "±0,01 mm",
        "±0,001 mm"
      ],
      correct: 2,
      explanation: "L'entraxe des paliers doit être maintenu à ±0,01 mm (10 micromètres) pour garantir un fonctionnement optimal et éviter l'augmentation des frottements."
    },
    {
      question: "Quel est le principal risque d'un serrage excessif des vis de pont ?",
      options: [
        "Casse de la vis",
        "Déformation de la platine et désaxage des paliers",
        "Oxydation accélérée",
        "Amélioration excessive de la précision"
      ],
      correct: 1,
      explanation: "Un serrage excessif déforme la platine, modifiant l'entraxe des paliers et augmentant les frottements, ce qui dégrade la marche et la réserve de marche."
    },
  ];

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setQuizAnswers(prev => ({ ...prev, [questionIndex]: optionIndex.toString() }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((q, index) => {
      if (parseInt(quizAnswers[index]) === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/theorie/mouvements" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à Architecture du Mouvement
          </Link>
        </div>
      </header>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Système de Fixation
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            La fixation des ponts sur la platine : un système critique pour la précision, 
            la stabilité et la fiabilité du mouvement horloger.
          </p>
        </div>

        {/* SECTION 1: INTRODUCTION */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
              Importance du Système de Fixation
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              La fixation des ponts sur la platine est l'un des aspects les plus critiques de la construction horlogère. 
              Elle doit répondre à trois impératifs majeurs :
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Stabilité</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Maintien rigide et permanent du positionnement relatif des composants
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Précision</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Reproductibilité du positionnement au micromètre près lors du remontage
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Résistance</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Tenue aux chocs, vibrations et contraintes thermiques sur des décennies
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TYPES DE FIXATIONS - INTERACTIF */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Types de Fixations
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Trois systèmes principaux assurent la fixation et le guidage des composants du mouvement. 
            Cliquez pour découvrir leurs caractéristiques :
          </p>

          <div className="grid gap-6 mb-8">
            {fixationTypes.map((type) => (
              <div key={type.id}>
                <div
                  onClick={() => setSelectedFixation(selectedFixation === type.id ? '' : type.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedFixation === type.id
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{type.icon}</span>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          {type.name}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    {selectedFixation === type.id && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>

                {selectedFixation === type.id && (
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">
                      Caractéristiques Techniques
                    </h5>
                    <ul className="space-y-2 mb-6">
                      {type.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                          <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h6 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          Avantages
                        </h6>
                        <ul className="space-y-1">
                          {type.avantages.map((av, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-green-600 dark:text-green-400 mr-2 text-xs">▸</span>
                              {av}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h6 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                          <span className="text-red-600 dark:text-red-400 mr-2">✗</span>
                          Inconvénients
                        </h6>
                        <ul className="space-y-1">
                          {type.inconvenients.map((inc, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-red-600 dark:text-red-400 mr-2 text-xs">▸</span>
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: PRÉCISION DIMENSIONNELLE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Précision Dimensionnelle
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Les tolérances d'usinage pour les systèmes de fixation sont extrêmement serrées. 
              Chaque déviation, même minime, affecte directement la marche du mouvement :
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Tolérances Géométriques</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Planéité de la platine</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">±0,005 mm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Diamètre trous de paliers</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">±0,002 mm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Entraxe des paliers</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">±0,01 mm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Perpendicularité des trous</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">±0,5°</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Couples de Serrage</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Vis de pont Ø 0,6 mm</span>
                    <span className="font-bold text-green-600 dark:text-green-400">0,08 Nm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Vis de pont Ø 0,8 mm</span>
                    <span className="font-bold text-green-600 dark:text-green-400">0,10 Nm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Vis de pont Ø 1,0 mm</span>
                    <span className="font-bold text-green-600 dark:text-green-400">0,15 Nm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Vis de cadran</span>
                    <span className="font-bold text-green-600 dark:text-green-400">0,05 Nm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: VIS HORLOGÈRES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Vis Horlogères
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Acier Bleui</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Traitement thermique à 280-320°C donnant une couleur bleu-violet caractéristique et une protection anti-corrosion.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                Standard haute horlogerie
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Finition Polie</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Têtes polies miroir, fentes parfaitement centrées et polies. Exigence esthétique et qualité.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                Finition manuelle
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pas de Vis</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Pas métrique ultra-fin (0,25 à 0,4 mm) permettant un serrage progressif et contrôlé.
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                Précision micrométrique
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-r-lg">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Tournevis Dynamométrique
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              En haute horlogerie, les horlogers utilisent des tournevis dynamométriques calibrés permettant 
              d'appliquer exactement le couple de serrage prescrit (0,05 à 0,15 Nm selon le diamètre). 
              Cela évite tout risque de sur-serrage qui déformerait la platine, ou de sous-serrage 
              qui créerait du jeu et des vibrations.
            </p>
          </div>
        </section>

        {/* SECTION 5: CHATONS ET PIERRES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Chatons et Pierres en Rubis
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                💎 Pourquoi des Rubis dans une Montre ?
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Les pierres en rubis synthétique (corindon Al₂O₃) sont utilisées comme paliers depuis le XVIIIe siècle. 
                Leur utilisation n'est pas qu'esthétique : c'est une nécessité technique.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Coefficient de frottement</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">0,05-0,10</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">vs 0,4-0,6 pour le laiton</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Dureté Mohs</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">9 / 10</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Seul le diamant est plus dur</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Types de Pierres</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">🔴</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Pierres percées (paliers)</h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Rondelles percées au centre avec cuvette (huilier) pour retenir le lubrifiant. Guidage radial des pivots.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">💠</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Contre-pivots</h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Pierre plate ou bombée limitant le jeu axial (ébat) du mobile. Placée au-dessus du palier.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                    <span className="text-xl">🟣</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Palettes d'ancre</h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Deux pierres parallélépipédiques sur l'ancre, interagissant avec la roue d'échappement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ERREURS ET BONNES PRATIQUES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Erreurs Communes et Bonnes Pratiques
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6">
              <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-4 flex items-center">
                <XCircle className="w-6 h-6 mr-2" />
                Erreurs à Éviter
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Serrer à la sensation :</strong> risque de sur-serrage déformant la platine
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Forcer un pont mal positionné :</strong> casse goupilles ou endommage filetages
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Mélanger les vis :</strong> chaque vis a sa place précise, longueur et filetage spécifiques
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Démonter sans repérage :</strong> difficultés au remontage, risque d'inversion
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Huiler les filetages :</strong> modifie le couple de serrage et risque de grippage
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 p-6">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Bonnes Pratiques
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Utiliser tournevis dynamométrique :</strong> garantit couple optimal
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Positionner d'abord les goupilles :</strong> puis visser progressivement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Serrer en croix :</strong> répartition uniforme des contraintes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Photographier avant démontage :</strong> facilite remontage exact
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Vérifier le débattement :</strong> contrôle absence de frottements après montage
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: IMPACT SUR LA MARCHE */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-2xl p-8 border-l-4 border-orange-600 dark:border-orange-400">
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4 flex items-center">
              <AlertCircle className="w-7 h-7 mr-3" />
              Impact sur la Marche
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Un système de fixation mal réglé a des conséquences directes et mesurables sur les performances du mouvement :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-orange-200 dark:border-orange-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Serrage Excessif</p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Déformation de la platine
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Désaxage des paliers (+15 à 30% frottements)
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Variation de marche : ±8 à 15 s/jour
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Réduction réserve de marche
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-orange-200 dark:border-orange-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Serrage Insuffisant</p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Jeu entre pont et platine
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Vibrations parasites aux chocs
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Variations positionnelles importantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">▸</span>
                    Risque de dévissage progressif
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-5 rounded-xl">
              <p className="text-slate-900 dark:text-slate-100 font-bold mb-2">
                ⚖️ Le Réglage Optimal
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Nécessite expérience, outils de mesure (comparateur, système de contrôle de la marche) et respect 
                strict des couples de serrage spécifiés par le manufacturier. En haute horlogerie, chaque vis 
                est serrée avec un tournevis dynamométrique calibré au centième de Newton-mètre.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: QUIZ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Testez vos Connaissances
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Progression : {Object.keys(quizAnswers).length} / {quizData.length}
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {showResults && `Score : ${calculateScore()} / ${quizData.length}`}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(Object.keys(quizAnswers).length / quizData.length) * 100}%` }}
                />
              </div>
            </div>

            {quizData.map((q, qIndex) => (
              <div key={qIndex} className="mb-8 last:mb-0">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Question {qIndex + 1} : {q.question}
                </h4>
                <div className="space-y-3 mb-4">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex.toString();
                    const isCorrect = oIndex === q.correct;
                    const showAnswer = showResults && isSelected;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        disabled={showResults}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showAnswer && isCorrect
                            ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                            : showAnswer && !isCorrect
                            ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30'
                            : isSelected
                            ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                        }`}
                      >
                        <span className="text-slate-900 dark:text-slate-100">{option}</span>
                        {showAnswer && isCorrect && (
                          <CheckCircle2 className="inline-block ml-2 w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {showAnswer && !isCorrect && (
                          <XCircle className="inline-block ml-2 w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {showResults && quizAnswers[qIndex] !== undefined && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-blue-900 dark:text-blue-300">Explication :</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizData.length && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Voir les Résultats
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl">
                <p className="text-center text-xl font-bold text-slate-900 dark:text-white">
                  {calculateScore() === quizData.length
                    ? '🎉 Parfait ! Vous maîtrisez les systèmes de fixation !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à apprendre !'
                    : '📚 Relisez le cours attentivement !'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Questions Fréquentes
          </h2>

          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Combien de pierres (rubis) compte un mouvement moyen ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Un mouvement simple compte 15 à 17 rubis (2 par mobile principal + palettes d'ancre + ellipse). 
                  Les mouvements automatiques en ont 21 à 25, et les complications peuvent atteindre 40 à 60 rubis. 
                  Le nombre de rubis n'est pas un critère de qualité absolu : un mouvement peut avoir beaucoup de rubis 
                  mais une mauvaise finition, ou peu de rubis mais une excellente conception.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Pourquoi certaines vis ont-elles des têtes bleues ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Le bleuissage est un traitement thermique à 280-320°C créant une couche d'oxyde de fer (Fe₃O₄) 
                  donnant une couleur bleu-violet. Ce traitement apporte trois avantages : protection anti-corrosion, 
                  indication visuelle de la qualité, et légère augmentation de la dureté de surface. C'est un signe 
                  de haute horlogerie traditionnelle, bien que certains mouvements modernes utilisent des vis rhodiées 
                  ou en titane.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Peut-on remplacer une pierre cassée soi-même ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Techniquement oui, mais cela nécessite outillage spécialisé et expérience. La pierre doit être 
                  chassée avec une presse à chaton en contrôlant précisément la force (risque d'écraser la pierre ou 
                  de déformer le logement). Il faut ensuite réaléser le trou au diamètre exact du pivot. 
                  Pour un débutant, mieux vaut confier cette opération à un horloger professionnel. 
                  Les rubis de rechange sont peu coûteux (quelques euros) mais leur pose demande savoir-faire.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
            href="/theorie/mouvements" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à Architecture du Mouvement
          </Link>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 HorloLearn - Formation en Horlogerie Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
