'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Atom, Zap, Shield } from 'lucide-react';

export default function MateriauxInnovantsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const materials = [
    {
      id: 'silicium',
      name: 'Silicium',
      icon: '⚛️',
      year: '2001',
      description: 'Révolution microélectronique appliquée à l\'horlogerie',
      details: {
        densite: '2,33 g/cm³ (3× plus léger que l\'acier)',
        durete: 'Très élevée (7 Mohs)',
        magnetisme: 'Totalement amagnétique',
        lubrification: 'Aucune nécessaire',
        fabrication: 'Gravure DRIE en salle blanche',
      },
      avantages: [
        'Légèreté exceptionnelle',
        'Insensible aux champs magnétiques',
        'Géométrie parfaite (précision micronique)',
        'Sans entretien (pas de lubrification)',
        'Élasticité optimale pour spiraux',
        'Résistance à l\'usure'
      ],
      applications: [
        'Spiral Silinvar® (Patek Philippe)',
        'Ancre et roue d\'échappement',
        'Mécanismes à lames flexibles',
        'Ressorts et leviers',
        'Roues optimisées'
      ],
      brands: ['Patek Philippe', 'Ulysse Nardin', 'Omega', 'Breguet']
    },
    {
      id: 'ceramique',
      name: 'Céramique',
      icon: '🏺',
      year: '2005',
      description: 'Matériau technique haute performance quasi inrayable',
      details: {
        durete: '9 Mohs (quasi-diamant)',
        poids: 'Léger et confortable',
        couleur: 'Teinte dans la masse (indélébile)',
        biocompatibilite: 'Hypoallergénique 100%',
        fabrication: 'Frittage haute température',
      },
      avantages: [
        'Résistance aux rayures exceptionnelle',
        'Inaltérabilité des couleurs',
        'Hypoallergénique total',
        'Légèreté au porter',
        'Résistance chimique',
        'Aspect mat ou brillant'
      ],
      applications: [
        'Lunettes Cerachrom (Rolex)',
        'Boîtiers complets',
        'Bracelets haute résistance',
        'Inserts de lunette',
        'Composants décoratifs'
      ],
      brands: ['Rolex', 'Rado', 'IWC', 'Hublot', 'Omega']
    },
    {
      id: 'titane',
      name: 'Titane',
      icon: '🪨',
      year: '1970',
      description: 'Alliage léger, résistant et hypoallergénique',
      details: {
        densite: '4,5 g/cm³ (45% plus léger que acier)',
        durete: 'Grade 2 et Grade 5',
        magnetisme: 'Amagnétique',
        biocompatibilite: 'Hypoallergénique',
        fabrication: 'Usinage CNC complexe',
      },
      avantages: [
        'Légèreté remarquable',
        'Résistance à la corrosion',
        'Hypoallergénique certifié',
        'Aspect mat élégant',
        'Robustesse mécanique',
        'Amagnétique'
      ],
      applications: [
        'Boîtiers sportifs',
        'Bracelets confort',
        'Fond de boîte',
        'Composants internes',
        'Boucles déployantes'
      ],
      brands: ['Rolex', 'Omega', 'Panerai', 'IWC', 'Zenith']
    },
  ];

  const alloys = [
    {
      name: 'Parachrom',
      manufacturer: 'Rolex',
      description: 'Alliage paramagnétique niobium-zirconium avec revêtement bleu. Insensible aux variations de température et aux chocs. Présent dans tous les calibres Rolex modernes.',
      resistance: '15\'000+ gauss',
      color: 'blue' as const,
      year: '2000',
      benefits: ['Antimagnétique total', 'Résistance chocs 10×', 'Stabilité thermique']
    },
    {
      name: 'Nivachron™',
      manufacturer: 'Swatch Group',
      description: 'Alliage amagnétique compensateur développé en partenariat avec Audemars Piguet (2018). Alternative métallique au silicium pour marques du groupe.',
      resistance: '15\'000 gauss',
      color: 'green' as const,
      year: '2018',
      benefits: ['Amagnétique', 'Économique', 'Industrialisable']
    },
    {
      name: 'Chronergy',
      manufacturer: 'Rolex',
      description: 'Échappement optimisé en alliage nickel-phosphore. Rendement énergétique accru de 15%, permettant d\'augmenter la réserve de marche à 70h.',
      resistance: 'Antimagnétique',
      color: 'purple' as const,
      year: '2015',
      benefits: ['Rendement +15%', 'Réserve 70h', 'Sans lubrification']
    },
  ];

  const quizData = [
    {
      question: "Quelle manufacture a présenté la première montre avec composants en silicium en 2001 ?",
      options: [
        "Patek Philippe",
        "Rolex",
        "Ulysse Nardin",
        "Omega"
      ],
      correct: 2,
      explanation: "Ulysse Nardin a présenté la Freak en 2001, premier mouvement horloger intégrant des composants en silicium monocristallin, révolutionnant l'industrie horlogère."
    },
    {
      question: "Quelle est la dureté de la céramique utilisée en horlogerie ?",
      options: [
        "5 Mohs",
        "7 Mohs",
        "9 Mohs",
        "10 Mohs (diamant)"
      ],
      correct: 2,
      explanation: "La céramique horlogère atteint 9 sur l'échelle de Mohs, la rendant quasi inrayable. Seul le diamant (10 Mohs) est plus dur."
    },
    {
      question: "Quel pourcentage de montres Patek Philippe intègrent aujourd'hui du silicium ?",
      options: [
        "25%",
        "50%",
        "75%",
        "95%"
      ],
      correct: 3,
      explanation: "Aujourd'hui, 95% des montres Patek Philippe intègrent des composants en silicium, témoignant du succès de cette technologie révolutionnaire."
    },
    {
      question: "À quelle intensité de champ magnétique les alliages antimagnétiques modernes résistent-ils ?",
      options: [
        "4'800 gauss (norme ISO)",
        "8'000 gauss",
        "15'000 gauss",
        "50'000 gauss"
      ],
      correct: 2,
      explanation: "Les alliages modernes (Parachrom, Nivachron) résistent à 15'000 gauss, soit plus de 3 fois la norme ISO de 4'800 gauss, offrant une protection totale contre les champs magnétiques du quotidien."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900">
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
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-white text-emerald-900 text-sm font-medium px-4 py-1.5 rounded-full">
              Recherche & Développement
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Atom className="w-16 h-16 text-emerald-300" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Matériaux Innovants
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-emerald-50 leading-relaxed max-w-4xl mb-8">
            Les manufactures suisses investissent massivement dans la recherche de matériaux révolutionnaires : 
            silicium antimagnétique, céramique inrayable, alliages haute performance. Ces innovations repoussent 
            les limites de la précision, durabilité et résistance aux champs magnétiques.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">2001</div>
              <div className="text-xs font-medium opacity-80">Premier silicium</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">15'000</div>
              <div className="text-xs font-medium opacity-80">Gauss (antimagnétique)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">3×</div>
              <div className="text-xs font-medium opacity-80">Plus léger (silicium)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">200×</div>
              <div className="text-xs font-medium opacity-80">Résistance (graphène)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: MATÉRIAUX INTERACTIFS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Trois Révolutions Matérielles
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque matériau pour découvrir ses propriétés révolutionnaires :
          </p>

          <div className="grid gap-6">
            {materials.map((mat) => (
              <div key={mat.id}>
                <div
                  onClick={() => setSelectedMaterial(selectedMaterial === mat.id ? '' : mat.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedMaterial === mat.id
                      ? 'border-emerald-600 dark:border-emerald-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-5xl mr-5">{mat.icon}</span>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {mat.name}
                          </h4>
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs rounded-full font-bold">
                            Depuis {mat.year}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">
                          {mat.description}
                        </p>
                      </div>
                    </div>
                    {selectedMaterial === mat.id && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>

                {selectedMaterial === mat.id && (
                  <div className="mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-6 border-l-4 border-emerald-600 dark:border-emerald-400">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">
                          Caractéristiques Techniques
                        </h5>
                        <div className="space-y-3">
                          {Object.entries(mat.details).map(([key, value]) => (
                            <div key={key} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-slate-900 dark:text-slate-100">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-4 text-xl flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                          Avantages
                        </h5>
                        <ul className="space-y-2 mb-6">
                          {mat.avantages.map((av, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                              {av}
                            </li>
                          ))}
                        </ul>

                        <h5 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">
                          Applications Horlogères
                        </h5>
                        <ul className="space-y-2">
                          {mat.applications.map((app, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-blue-600 dark:text-blue-400 mr-2">▸</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                        🏭 Manufactures Utilisatrices
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mat.brands.map((brand, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm rounded-full">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ALLIAGES ANTIMAGNÉTIQUES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Alliages Antimagnétiques
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start mb-4">
              <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-4 flex-shrink-0" />
              <div>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Le <strong className="text-slate-900 dark:text-slate-100">magnétisme</strong> est le problème n°1 du 
                  service après-vente horloger. Les champs magnétiques (smartphones, aimants, chargeurs sans fil) 
                  magnétisent les spiraux métalliques traditionnels, causant des variations de marche importantes.
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Les manufactures ont développé des alliages révolutionnaires résistant à des champs magnétiques 
                  extrêmes de <strong className="text-slate-900 dark:text-slate-100">15'000 gauss</strong> (norme ISO : 4'800 gauss).
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {alloys.map((alloy) => {
              const colors = {
                blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
                green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
                purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
              };

              return (
                <div key={alloy.name} className={`border-2 rounded-xl p-6 ${colors[alloy.color]}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{alloy.name}</h3>
                    <span className="px-2 py-1 bg-white dark:bg-slate-800 text-xs font-bold rounded-full">
                      {alloy.year}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">{alloy.manufacturer}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed">{alloy.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {alloy.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-xs text-slate-700 dark:text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-center border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{alloy.resistance}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: AUTRES MATÉRIAUX */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Matériaux d'Avenir
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">⚫</div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Graphène</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                200× plus résistant que l'acier. Matériau du futur en phase expérimentale pour spiraux ultra-légers.
              </p>
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                Recherche
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">🔷</div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Carbone</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Composites haute performance. Ultraléger, design technique. TAG Heuer, Hublot, Richard Mille.
              </p>
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                Sportif
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Magic Gold</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Hublot : or inrayable (céramique + or 24K). Dureté 1'000 Vickers, scratch-proof absolu.
              </p>
              <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full">
                Luxe
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">🔬</div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nanotubes</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Nanotubes de carbone : propriétés mécaniques exceptionnelles. Futur des ressorts haute performance.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                Expérimental
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: QUIZ */}
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
                  className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full transition-all"
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
                            ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
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
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-600 dark:border-emerald-400 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-emerald-900 dark:text-emerald-300">Explication :</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizData.length && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-emerald-600 dark:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
              >
                Voir les Résultats
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl">
                <p className="text-center text-xl font-bold text-slate-900 dark:text-white">
                  {calculateScore() === quizData.length
                    ? '🎉 Parfait ! Vous maîtrisez les matériaux innovants !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à explorer !'
                    : '📚 Relisez le cours pour mieux comprendre !'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CONCLUSION */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
              <Zap className="w-7 h-7 mr-3" />
              L'Avenir des Matériaux Horlogers
            </h3>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
              Les manufactures suisses investissent des millions en R&D pour développer les matériaux de demain : 
              graphène, nanotubes de carbone, alliages métalliques à mémoire de forme. L'objectif : précision 
              chronométrique absolue, durabilité exceptionnelle, et résistance totale aux agressions extérieures 
              (magnétisme, chocs, température).
            </p>
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
