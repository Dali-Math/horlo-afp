'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Zap, Timer, Battery, TrendingDown } from 'lucide-react';

export default function MouvementsQuartzPage() {
  const [selectedComparison, setSelectedComparison] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const comparisons = [
    {
      id: 'precision',
      title: 'Précision',
      quartz: '±15 secondes/mois',
      mecanique: '±3 à 10 secondes/jour',
      winner: 'quartz',
      details: 'Le quartz est 100 fois plus précis qu\'une montre mécanique standard. Un chronomètre COSC mécanique atteint ±5s/jour, tandis qu\'un quartz standard offre ±15s/mois.'
    },
    {
      id: 'prix',
      title: 'Prix',
      quartz: '50-500 CHF (standard)',
      mecanique: '500-50\'000+ CHF',
      winner: 'quartz',
      details: 'Un mouvement quartz coûte 10 à 100 fois moins cher à produire qu\'un mouvement mécanique comparable. La technologie est mature et standardisée.'
    },
    {
      id: 'entretien',
      title: 'Entretien',
      quartz: 'Pile tous les 2-5 ans',
      mecanique: 'Révision tous les 3-5 ans',
      winner: 'quartz',
      details: 'Changement de pile : 30-50 CHF. Révision mécanique complète : 300-1000 CHF selon complexité. Le quartz nécessite un entretien minimal.'
    },
    {
      id: 'emotion',
      title: 'Valeur Émotionnelle',
      quartz: 'Faible (production masse)',
      mecanique: 'Forte (savoir-faire)',
      winner: 'mecanique',
      details: 'Une montre mécanique incarne des siècles de tradition horlogère, un savoir-faire artisanal transmis de génération en génération. Le quartz, aussi précis soit-il, n\'a pas cette âme.'
    },
    {
      id: 'durabilite',
      title: 'Durabilité',
      quartz: 'Circuit peut vieillir',
      mecanique: 'Réparable indéfiniment',
      winner: 'mecanique',
      details: 'Une montre mécanique bien entretenue traverse les générations. Un circuit quartz peut devenir obsolète ou irréparable après 20-30 ans si pièces indisponibles.'
    },
  ];

  const quizData = [
    {
      question: "Pourquoi le quartz oscille-t-il précisément à 32'768 Hz ?",
      options: [
        "C'est la fréquence naturelle du quartz",
        "Parce que 32'768 = 2¹⁵, facile à diviser pour obtenir 1 Hz",
        "Pour minimiser la consommation électrique",
        "C'est un choix arbitraire de Seiko"
      ],
      correct: 1,
      explanation: "32'768 = 2¹⁵. Cette puissance de 2 permet de diviser facilement la fréquence par 15 diviseurs binaires successifs pour obtenir exactement 1 Hz (1 impulsion/seconde). C'est un compromis optimal entre précision et consommation."
    },
    {
      question: "Quelle montre a déclenché la 'Crise du Quartz' en 1969 ?",
      options: [
        "Casio F-91W",
        "Seiko Astron",
        "Timex Quartz",
        "Omega Constellation"
      ],
      correct: 1,
      explanation: "La Seiko Astron, lancée le 25 décembre 1969, fut la première montre-bracelet à quartz commercialisée au monde. Son prix initial de 1'250 USD (équivalent d'une Toyota Corolla) n'empêcha pas son succès."
    },
    {
      question: "Quelle est la précision annuelle du calibre Grand Seiko 9F ?",
      options: [
        "±5 secondes/an",
        "±10 secondes/an",
        "±15 secondes/an",
        "±30 secondes/an"
      ],
      correct: 1,
      explanation: "Le calibre 9F de Grand Seiko, lancé en 1993, atteint une précision de ±10 secondes par an, soit environ 120 fois plus précis qu'un mouvement mécanique standard. C'est l'apogée du quartz haute horlogerie."
    },
    {
      question: "Combien d'emplois l'horlogerie suisse a-t-elle perdus durant la crise du quartz ?",
      options: [
        "10'000",
        "25'000",
        "50'000",
        "100'000"
      ],
      correct: 2,
      explanation: "Entre 1970 et 1985, l'horlogerie suisse a perdu environ 50'000 emplois (passant de 90'000 à 30'000 emplois) et vu la fermeture de nombreuses manufactures face à la concurrence des montres quartz japonaises bon marché."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/theorie/technologies" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Technologies
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-cyan-100 text-cyan-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Révolution Électronique
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-16 h-16 text-cyan-300" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Mouvements à Quartz
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-cyan-50 leading-relaxed max-w-4xl mb-8">
            Les mouvements à quartz ont révolutionné l'horlogerie dans les années 1970 grâce à la précision exceptionnelle 
            du cristal de quartz piézoélectrique. Oscillant à 32'768 Hz, ils offrent une précision mensuelle de ±15 secondes, 
            détrônant temporairement la suprématie de l'horlogerie mécanique suisse.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">32'768</div>
              <div className="text-xs font-medium opacity-80">Hz (vibrations/sec)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">±15s</div>
              <div className="text-xs font-medium opacity-80">Précision mensuelle</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">2-5</div>
              <div className="text-xs font-medium opacity-80">Ans (durée pile)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">75%</div>
              <div className="text-xs font-medium opacity-80">Production mondiale</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: DÉFINITION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Qu'est-ce qu'un Mouvement à Quartz ?
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Un <strong className="text-slate-900 dark:text-slate-100">mouvement à quartz</strong> utilise les propriétés 
              piézoélectriques d'un cristal de quartz pour générer des oscillations électroniques ultra-précises à une 
              fréquence de <strong className="text-slate-900 dark:text-slate-100">32'768 Hz</strong> (2¹⁵).
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Alimenté par une pile bouton (lithium), un circuit électronique compte ces oscillations et envoie des 
              impulsions électriques à un moteur pas-à-pas qui fait avancer les aiguilles. Cette technologie offre une 
              <strong className="text-slate-900 dark:text-slate-100"> précision 100 fois supérieure</strong> aux montres mécaniques traditionnelles.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Inventé par Seiko et commercialisé en 1969 avec l'Astron, le quartz a déclenché la "crise du quartz" qui 
              a failli anéantir l'horlogerie mécanique suisse dans les années 1970-80.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-cyan-100 dark:bg-cyan-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Effet Piézoélectrique</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Le quartz génère une tension électrique lorsqu'il est comprimé, et se déforme sous tension électrique
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Précision Absolue</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Oscillation stable à 32'768 Hz permet une précision de ±15 secondes par mois
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Autonomie Longue</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Une pile bouton alimente le mouvement pendant 2 à 5 ans sans intervention
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: FONCTIONNEMENT */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Fonctionnement du Quartz Piézoélectrique
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Effet Piézoélectrique</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Le <strong className="text-slate-900 dark:text-slate-100">quartz</strong> (dioxyde de silicium SiO₂) 
                possède une propriété physique unique : lorsqu'on lui applique une tension électrique, il se déforme. 
                Inversement, si on le comprime, il génère une tension électrique.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Un circuit électronique alimenté par pile crée un champ électrique qui fait vibrer le cristal de quartz 
                à sa <strong className="text-slate-900 dark:text-slate-100">fréquence de résonance naturelle : 32'768 Hz</strong> 
                (oscillations par seconde).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Circuit Électronique</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Oscillateur</strong> : fait vibrer le quartz à 32'768 Hz</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Diviseur de fréquence</strong> : divise par 32'768 pour obtenir 1 Hz</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Moteur pas-à-pas</strong> : fait avancer l'aiguille d'un cran par seconde</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Démultiplication</strong> : engrenages pour minutes et heures</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-l-4 border-cyan-600 dark:border-cyan-400 p-6 rounded-r-lg">
            <h4 className="text-lg font-bold text-cyan-900 dark:text-cyan-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Pourquoi 32'768 Hz ?
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              32'768 = 2¹⁵. Cette puissance de 2 permet de diviser facilement par 15 étages de diviseurs binaires pour 
              obtenir exactement 1 Hz (1 impulsion par seconde). C'est un compromis optimal entre précision et consommation énergétique : 
              fréquence assez élevée pour être précise, mais pas trop pour épuiser rapidement la pile.
            </p>
          </div>
        </section>

        {/* SECTION 3: COMPARAISON INTERACTIVE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Quartz vs Mécanique : Le Duel
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 text-center leading-relaxed">
            Cliquez sur chaque critère pour comparer en détail les deux technologies :
          </p>

          <div className="grid gap-4">
            {comparisons.map((comp) => (
              <div key={comp.id}>
                <div
                  onClick={() => setSelectedComparison(selectedComparison === comp.id ? '' : comp.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedComparison === comp.id
                      ? 'border-cyan-600 dark:border-cyan-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-cyan-400 dark:hover:border-cyan-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{comp.title}</h4>
                    {selectedComparison === comp.id && (
                      <CheckCircle2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className={`p-4 rounded-lg ${comp.winner === 'quartz' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}`}>
                      <p className="text-sm font-bold text-cyan-700 dark:text-cyan-400 mb-1">⚡ Quartz</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{comp.quartz}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${comp.winner === 'mecanique' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}`}>
                      <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-1">⚙️ Mécanique</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{comp.mecanique}</p>
                    </div>
                  </div>
                </div>

                {selectedComparison === comp.id && (
                  <div className="mt-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl p-6 border-l-4 border-cyan-600 dark:border-cyan-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {comp.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CRISE DU QUARTZ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            La Crise du Quartz (1970-1985)
          </h2>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-8 mb-6 border-l-4 border-red-600 dark:border-red-400">
            <div className="flex items-start mb-4">
              <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400 mr-4 flex-shrink-0" />
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-300">
                L'Effondrement de l'Horlogerie Suisse
              </h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En <strong className="text-slate-900 dark:text-slate-100">1969</strong>, Seiko commercialise l'Astron, 
              première montre-bracelet à quartz au monde. Son prix astronomique (1'250 USD, équivalent d'une Toyota Corolla) 
              n'empêche pas son succès. La précision ±5 secondes/mois révolutionne l'horlogerie.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Dans les années 1970, la production de masse fait chuter les prix. Des montres quartz précises à 20 USD 
              inondent le marché. L'horlogerie suisse, dominée par le mécanique coûteux, s'effondre : 
              <strong className="text-slate-900 dark:text-slate-100"> 50'000 emplois perdus</strong>, nombreuses faillites 
              (passant de 90'000 à 30'000 emplois entre 1970 et 1985).
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Paradoxalement, cette crise force l'horlogerie suisse à se repositionner sur le 
              <strong className="text-slate-900 dark:text-slate-100"> luxe et l'émotion</strong> plutôt que la précision pure. 
              Renaissance dans les années 1990 avec retour du mécanique haut de gamme et stratégie marketing axée sur 
              le savoir-faire artisanal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">📉 Emplois Perdus</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">50'000</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Entre 1970 et 1985</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-2">🏭 Manufactures Fermées</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1'000+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Faillites en cascade</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">📈 Renaissance</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1990s</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Retour du mécanique</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: GRAND SEIKO */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Grand Seiko : L'Excellence Quartz Japonaise
          </h2>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white mb-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-100 dark:text-blue-200">
              Calibre 9F : Quand le Quartz Devient Haute Horlogerie
            </h3>
            <p className="text-lg leading-relaxed text-blue-100 dark:text-blue-200 mb-4">
              Lancé en 1993, le calibre <strong>9F</strong> de Grand Seiko redéfinit le quartz haut de gamme. 
              Contrairement au quartz standard produit en masse, chaque composant est assemblé et réglé à la main 
              par des horlogers experts formés pendant des années.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Performances Exceptionnelles</h4>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-slate-100">Précision ±10 sec/an</strong> : 120× plus précis que mécanique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-slate-100">Démarrage instantané</strong> : aiguille saute à 12h en 0,1 seconde</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-slate-100">Aiguille morte</strong> : battement par seconde sans tremblement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-slate-100">Couple moteur 5×</strong> : aiguilles épaisses possibles</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Finitions Haute Horlogerie</h4>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Ponts perlés et anglés à la main</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Rotor moteur ajusté individuellement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Double quartz vieilli 3 mois pour stabilité</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Assemblage 100% manuel (non automatisé)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Pile durée 50 ans théorique (record)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: QUIZ */}
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
                  className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full transition-all"
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
                            ? 'border-cyan-600 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-950/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30'
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
                  <div className="bg-cyan-50 dark:bg-cyan-950/30 border-l-4 border-cyan-600 dark:border-cyan-400 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-cyan-900 dark:text-cyan-300">Explication :</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizData.length && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-cyan-600 dark:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
              >
                Voir les Résultats
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl">
                <p className="text-center text-xl font-bold text-slate-900 dark:text-white">
                  {calculateScore() === quizData.length
                    ? '🎉 Parfait ! Vous maîtrisez la révolution quartz !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à apprendre !'
                    : '📚 Relisez le cours pour mieux comprendre !'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
            href="/theorie/technologies" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Technologies
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
