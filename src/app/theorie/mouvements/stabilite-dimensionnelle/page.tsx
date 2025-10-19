'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, TrendingDown, ThermometerSun } from 'lucide-react';

export default function StabiliteDimensionnellePage() {
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const factors = [
    { id: 'temperature', name: 'Température', icon: '🌡️', description: 'Variations thermiques causant la dilatation/contraction' },
    { id: 'humidity', name: 'Humidité', icon: '💧', description: 'Absorption d\'eau modifiant les dimensions' },
    { id: 'stress', name: 'Contraintes internes', icon: '⚡', description: 'Tensions résiduelles après usinage' },
    { id: 'aging', name: 'Vieillissement', icon: '⏳', description: 'Evolution microstructurale dans le temps' },
    { id: 'shock', name: 'Chocs mécaniques', icon: '💥', description: 'Déformations permanentes ou temporaires' },
  ];

  const materials = [
    {
      id: 'laiton',
      name: 'Laiton',
      composition: 'Cuivre-Zinc (Cu-Zn)',
      dilatation: '18 × 10⁻⁶/°C',
      avantages: ['Excellent usinable', 'Coût modéré', 'Traitement de surface facile'],
      inconvenients: ['Dilatation importante', 'Oxydation possible'],
      usage: 'Standard industrie',
      color: 'yellow'
    },
    {
      id: 'maillechort',
      name: 'Maillechort',
      composition: 'Cu-Ni-Zn (54-18-28)',
      dilatation: '16 × 10⁻⁶/°C',
      avantages: ['Meilleure stabilité', 'Couleur argentée naturelle', 'Résistance corrosion'],
      inconvenients: ['Plus cher que laiton', 'Usinage plus difficile'],
      usage: 'Haute horlogerie',
      color: 'gray'
    },
    {
      id: 'titane',
      name: 'Titane',
      composition: 'Ti Grade 5 (Ti-6Al-4V)',
      dilatation: '8,6 × 10⁻⁶/°C',
      avantages: ['Très stable', 'Léger', 'Amagnétique', 'Biocompatible'],
      inconvenients: ['Coût élevé', 'Usinage complexe'],
      usage: 'Montres sportives/techniques',
      color: 'blue'
    },
    {
      id: 'silicium',
      name: 'Silicium',
      composition: 'Si monocristallin',
      dilatation: '2,6 × 10⁻⁶/°C',
      avantages: ['Stabilité exceptionnelle', 'Très léger', 'Amagnétique', 'Sans lubrification'],
      inconvenients: ['Très fragile', 'Coût très élevé', 'Procédés spéciaux'],
      usage: 'Complications haute gamme',
      color: 'purple'
    },
  ];

  const toggleFactor = (id: string) => {
    setSelectedFactors(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const quizData = [
    {
      question: "Quel est l'impact d'une variation dimensionnelle de 0,01 mm sur l'entraxe des paliers ?",
      options: [
        "Aucun impact significatif",
        "Augmentation des frottements de 15 à 30%",
        "Diminution de la réserve de marche de 50%",
        "Arrêt immédiat du mouvement"
      ],
      correct: 1,
      explanation: "Une variation de seulement 0,01 mm peut augmenter les frottements de 15 à 30%, causant une variation de marche de ±5 à 10 secondes par jour et une usure prématurée."
    },
    {
      question: "Quel matériau offre le coefficient de dilatation thermique le plus faible ?",
      options: [
        "Laiton (18 × 10⁻⁶/°C)",
        "Maillechort (16 × 10⁻⁶/°C)",
        "Titane (8,6 × 10⁻⁶/°C)",
        "Silicium (2,6 × 10⁻⁶/°C)"
      ],
      correct: 3,
      explanation: "Le silicium monocristallin présente le coefficient de dilatation le plus faible (2,6 × 10⁻⁶/°C), soit 7 fois moins que le laiton, offrant une stabilité dimensionnelle exceptionnelle."
    },
    {
      question: "Pourquoi les manufactures haut de gamme stockent-elles les platines pendant 6 à 12 mois avant assemblage ?",
      options: [
        "Pour augmenter la valeur de la montre",
        "Pour permettre la stabilisation dimensionnelle naturelle",
        "Pour respecter des traditions ancestrales",
        "Pour vérifier la résistance à la corrosion"
      ],
      correct: 1,
      explanation: "Le stockage prolongé permet l'élimination naturelle des contraintes internes résiduelles de l'usinage et assure une stabilité dimensionnelle maximale dans le temps."
    },
    {
      question: "Quel traitement thermique élimine les tensions internes créées par l'usinage ?",
      options: [
        "La trempe",
        "Le recuit de détente",
        "La cémentation",
        "Le revenu"
      ],
      correct: 1,
      explanation: "Le recuit de détente (200-250°C) est un traitement thermique spécifique qui élimine les tensions internes de l'usinage et stabilise la structure métallurgique."
    }
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
            Stabilité Dimensionnelle
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            La capacité d'une platine et des ponts à conserver leurs dimensions avec une précision micrométrique 
            malgré les contraintes environnementales : un facteur critique pour la précision horlogère.
          </p>
        </div>

        {/* SECTION 1: DÉFINITION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Qu'est-ce que la Stabilité Dimensionnelle ?
          </h2>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              La <strong className="text-slate-900 dark:text-slate-100">stabilité dimensionnelle</strong> désigne la capacité 
              de la platine et des ponts à maintenir leurs dimensions géométriques exactes au fil du temps, quelles que soient 
              les conditions environnementales. C'est l'un des paramètres les plus critiques en horlogerie de précision.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Dans un mouvement horloger, les jeux entre les composants sont de l'ordre du <strong className="text-slate-900 dark:text-slate-100">micromètre</strong> 
              (0,001 mm). Une variation dimensionnelle même infime de la platine modifie ces jeux critiques et affecte 
              directement la marche, l'usure des composants et la fiabilité du mouvement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Précision Micrométrique</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Tolérance dimensionnelle de ±0,001 à ±0,005 mm selon les calibres pour maintenir les jeux optimaux.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ThermometerSun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Résistance Thermique</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Maintien des dimensions sur une plage de -10°C à +60°C pour usage quotidien normal.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Longévité</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Stabilité garantie sur 10 à 50 ans selon la qualité du matériau et des traitements appliqués.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: FACTEURS AFFECTANT LA STABILITÉ - CORRIGÉE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Facteurs Affectant la Stabilité
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Plusieurs phénomènes physiques et chimiques peuvent altérer les dimensions d'une platine ou d'un pont. 
            Cliquez sur chaque facteur pour en savoir plus :
          </p>

          <div className="grid gap-4 mb-8">
            {factors.map((factor) => (
              <div key={factor.id}>
                <div
                  onClick={() => toggleFactor(factor.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedFactors.includes(factor.id)
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">{factor.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {factor.name}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                    {selectedFactors.includes(factor.id) && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>

                {/* CONTENU DÉTAILLÉ QUI S'AFFICHE AU CLIC */}
                {selectedFactors.includes(factor.id) && (
                  <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                    {factor.id === 'temperature' && (
                      <>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-3">Impact des Variations Thermiques</h5>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                          Tous les matériaux se dilatent à la chaleur et se contractent au froid selon leur coefficient de dilatation thermique. 
                          Pour le laiton (18×10⁻⁶/°C), une platine de 30 mm exposée à +20°C se dilate de 0,011 mm.
                        </p>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-slate-100">Plage de température d'usage :</strong> -10°C à +60°C pour montres-bracelets
                          </p>
                        </div>
                      </>
                    )}
                    {factor.id === 'humidity' && (
                      <>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-3">Effet de l'Humidité</h5>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                          Bien que moins critique que la température, l'humidité peut causer une oxydation de surface 
                          modifiant légèrement les dimensions. Les traitements de surface (rhodiage, dorage) protègent contre ce phénomène.
                        </p>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-slate-100">Humidité relative recommandée :</strong> 40-60% pour stockage optimal
                          </p>
                        </div>
                      </>
                    )}
                    {factor.id === 'stress' && (
                      <>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-3">Contraintes Internes Résiduelles</h5>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                          L'usinage mécanique (fraisage, tournage, perçage) crée des tensions internes dans le matériau. 
                          Ces contraintes se relâchent progressivement, causant des déformations différées sur plusieurs mois.
                        </p>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-slate-100">Solution :</strong> Recuit de détente à 200-250°C élimine 70-90% des contraintes
                          </p>
                        </div>
                      </>
                    )}
                    {factor.id === 'aging' && (
                      <>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-3">Vieillissement Métallurgique</h5>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                          Au fil des années, la structure cristalline du métal évolue naturellement (relaxation des dislocations, 
                          diffusion atomique). Ce phénomène est lent mais peut affecter la stabilité sur 20-30 ans.
                        </p>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-slate-100">Prévention :</strong> Cycles de vieillissement artificiel accéléré
                          </p>
                        </div>
                      </>
                    )}
                    {factor.id === 'shock' && (
                      <>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-3">Chocs et Vibrations</h5>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                          Les chocs violents peuvent causer des déformations plastiques permanentes si la limite élastique 
                          est dépassée. Les vibrations répétées créent une fatigue du matériau.
                        </p>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <strong className="text-slate-900 dark:text-slate-100">Résistance aux chocs :</strong> Normes ISO 1413 (chute 1m sur surface dure)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-r-lg">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Impact Cumulatif
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Ces facteurs agissent rarement seuls. En conditions réelles, une montre subit simultanément variations 
              thermiques, humidité ambiante, chocs quotidiens et vieillissement naturel. Les manufacturiers doivent 
              donc anticiper ces effets combinés lors de la conception et du choix des matériaux.
            </p>
          </div>
        </section>

        {/* SECTION 3: MATÉRIAUX */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Matériaux et Propriétés
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Le choix du matériau constitue la première ligne de défense contre les variations dimensionnelles. 
            Sélectionnez un matériau pour voir ses caractéristiques :
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {materials.map((material) => (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material.id)}
                className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-4 text-left transition-all ${
                  selectedMaterial === material.id
                    ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                    : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {material.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {material.composition}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs ${
                  material.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                  material.color === 'gray' ? 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300' :
                  material.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                }`}>
                  {material.usage}
                </div>
              </button>
            ))}
          </div>

          {selectedMaterial && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              {materials.filter(m => m.id === selectedMaterial).map(material => (
                <div key={material.id} className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {material.name} - Caractéristiques Détaillées
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                        <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                        Avantages
                      </h4>
                      <ul className="space-y-2">
                        {material.avantages.map((av, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{av}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                        <span className="text-red-600 dark:text-red-400 mr-2">✗</span>
                        Inconvénients
                      </h4>
                      <ul className="space-y-2">
                        {material.inconvenients.map((inc, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-slate-100">Coefficient de dilatation thermique :</strong> {material.dilatation}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Plus ce coefficient est faible, meilleure est la stabilité dimensionnelle face aux variations de température.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 4: TABLEAU COMPARATIF */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Comparatif des Matériaux
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Matériau</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Dilatation (×10⁻⁶/°C)</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Densité (g/cm³)</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Stabilité</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Coût relatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Laiton</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">18,0</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">8,5</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
                        Moyenne
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Bas
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Maillechort</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">16,0</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">8,8</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        Bonne
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
                        Moyen
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Titane Grade 5</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">8,6</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">4,4</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Très bonne
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                        Élevé
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Silicium</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">2,6</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">2,3</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                        Exceptionnelle
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                        Très élevé
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Or 18k</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">14,0</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">15,5</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        Bonne
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                        Très élevé
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: TRAITEMENTS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Traitements et Processus de Stabilisation
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Au-delà du choix du matériau, plusieurs traitements permettent d'améliorer considérablement 
            la stabilité dimensionnelle des platines et ponts.
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-start">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Recuit de Détente (Stress Relief)
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Traitement thermique à 200-250°C pendant 2 à 4 heures. Élimine les tensions internes 
                    résiduelles créées par l'usinage mécanique et stabilise la structure métallurgique.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-slate-100">Résultat :</strong> Réduction des déformations différées de 70 à 90%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Vieillissement Artificiel (Aging)
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Cycles thermiques accélérés simulant plusieurs années de vieillissement naturel. 
                    Alternance température ambiante / 80-100°C sur plusieurs semaines.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-slate-100">Résultat :</strong> Prévention des déformations différées sur 10-20 ans
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Finitions Mécaniques de Précision
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Lappage et rodage pour obtenir des surfaces parfaitement planes (planéité inférieure à 1 μm) 
                    et des faces parallèles. Élimine les micro-contraintes de surface.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-slate-100">Résultat :</strong> Stabilité géométrique ±0,002 mm sur 10 ans
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-2xl">🏭</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Stabilisation Naturelle (Aging at Rest)
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Stockage prolongé (6 à 12 mois) des pièces usinées avant assemblage. Méthode utilisée 
                    par les manufactures haut de gamme pour garantir une stabilité maximale.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-slate-100">Pratiqué par :</strong> Patek Philippe, Vacheron Constantin, A. Lange & Söhne
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: IMPACT SUR LA PRÉCISION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Impact sur la Précision et la Fiabilité
          </h2>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-8 mb-6 border-l-4 border-red-600 dark:border-red-400">
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-4">
              Conséquences d'une Variation de 0,01 mm
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Une variation dimensionnelle de seulement <strong className="text-slate-900 dark:text-slate-100">0,01 mm</strong> 
              (10 micromètres) sur l'entraxe des paliers peut avoir des conséquences dramatiques :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Augmentation des Frottements</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">+15 à 30%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Réduction de la réserve de marche</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Variation de Marche</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">±5 à 10 s/jour</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Perte de certification chronométrique</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Usure Prématurée</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">×2 à ×3</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Durée de vie divisée par 2 ou 3</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">Risque de Grippage</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">Élevé</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">En cas de choc ou température extrême</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Tolérances Dimensionnelles selon le Segment
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full mr-4 flex-shrink-0 mt-1">
                  Entrée de gamme
                </span>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">±0,010 mm</strong> - Acceptable pour montres de série industrielle
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full mr-4 flex-shrink-0 mt-1">
                  Milieu de gamme
                </span>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">±0,005 mm</strong> - Standard pour mouvements manufacturés
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full mr-4 flex-shrink-0 mt-1">
                  Haute horlogerie
                </span>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">±0,002 mm</strong> - Requis pour certifications chronométriques strictes
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-full mr-4 flex-shrink-0 mt-1">
                  Complications
                </span>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">±0,001 mm</strong> - Exigence maximale pour tourbillons et répétitions minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTRÔLE QUALITÉ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Contrôle Qualité et Mesures
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Métrologie 3D</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Machines à mesurer tridimensionnelles (MMT) avec palpeurs de précision nanométrique.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100">Précision :</strong> ±0,0005 mm
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Interférométrie Laser</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Mesure sans contact par interférence lumineuse pour planéité et parallélisme.
              </p>
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100">Précision :</strong> ±0,0001 mm
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Comparateurs Digitaux</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Contrôle rapide des cotes critiques avec comparateurs à affichage numérique.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100">Précision :</strong> ±0,001 mm
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-blue-100 dark:text-blue-200">
              📌 Exemple Industriel : Patek Philippe
            </h3>
            <p className="text-lg leading-relaxed text-blue-100 dark:text-blue-200 mb-4">
              La manufacture Patek Philippe applique un protocole de stabilisation en quatre étapes :
            </p>
            <ol className="space-y-2 text-blue-100 dark:text-blue-200">
              <li className="flex items-start">
                <span className="font-bold mr-3">1.</span>
                <span>Recuit de détente immédiat après usinage (240°C, 3h)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">2.</span>
                <span>Stockage en atmosphère contrôlée pendant 6 mois minimum</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">3.</span>
                <span>Recontrôle dimensionnel complet avant assemblage (MMT 3D)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">4.</span>
                <span>Vérification finale après premier réglage du mouvement</span>
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION 8: ERREURS COMMUNES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Erreurs et Bonnes Pratiques
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
                    Assembler immédiatement après usinage sans recuit de détente
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Stocker les pièces dans des conditions d'humidité non contrôlées
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Négliger le recontrôle dimensionnel après stockage prolongé
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Utiliser des matériaux non spécifiés pour réduire les coûts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Exposer les pièces à des chocs thermiques brutaux
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
                    Appliquer systématiquement un recuit de détente après chaque usinage
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Stocker en salle climatisée (20±2°C, 50±5% humidité relative)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Effectuer des contrôles dimensionnels à intervalles réguliers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Tracer et documenter tous les traitements thermiques
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Privilégier des cycles de vieillissement artificiel pour haute gamme
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 9: QUIZ */}
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
                    ? '🎉 Parfait ! Vous maîtrisez la stabilité dimensionnelle !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Révisez les points faibles !'
                    : '📚 Relisez le cours attentivement !'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 10: FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Questions Fréquentes
          </h2>

          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Pourquoi les manufactures haut de gamme stockent-elles les platines pendant plusieurs mois ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Le stockage prolongé (6 à 12 mois) permet une stabilisation dimensionnelle naturelle complète. 
                  Après usinage, des contraintes internes résiduelles subsistent dans le matériau. Ces tensions 
                  se relâchent progressivement avec le temps, causant de micro-déformations. En attendant plusieurs 
                  mois, les manufacturiers s'assurent que ces déformations sont terminées avant l'assemblage final. 
                  Les dimensions sont ensuite recontrôlées pour vérifier qu'elles restent dans les tolérances. 
                  Cette pratique garantit que la montre conservera sa précision pendant des décennies.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Comment les variations de température affectent-elles la précision ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  Les variations de température causent une dilatation ou contraction des matériaux selon leur 
                  coefficient de dilatation thermique. Par exemple, avec du laiton (18×10⁻⁶/°C), une platine de 
                  30 mm de diamètre varie de 0,011 mm pour une différence de 20°C. Cette variation modifie les 
                  entraxes des paliers et donc les frottements.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  C'est pourquoi les montres chronométriques utilisent des matériaux à faible dilatation (titane, 
                  silicium) et des compensations thermiques (spiral thermocompensé, balancier à vis de compensation).
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Le silicium est-il vraiment supérieur pour la stabilité dimensionnelle ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  Oui, le silicium monocristallin offre des avantages exceptionnels : coefficient de dilatation 
                  très faible (2,6×10⁻⁶/°C, soit 7 fois moins que le laiton), amagnétisme total, légèreté, 
                  et absence de besoin de lubrification grâce à un frottement ultra-faible.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Cependant, il présente des inconvénients majeurs : extrême fragilité aux chocs, impossibilité 
                  de réparation (pièce à remplacer entièrement si cassée), coût de fabrication très élevé 
                  (procédés MEMS issus de la microélectronique), et esthétique gris mat peu prisée. Son usage 
                  reste donc limité aux complications haute gamme où la performance prime.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Peut-on mesurer la stabilité dimensionnelle d'une platine déjà assemblée ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Directement, non, car la platine est inaccessible une fois le mouvement assemblé et emboîté. 
                  Cependant, on peut détecter indirectement des problèmes de stabilité dimensionnelle par l'analyse 
                  de la marche : variations importantes selon la position, dégradation progressive de la précision, 
                  augmentation anormale de l'amplitude du balancier. Un horloger expérimenté peut suspecter un 
                  problème dimensionnel et devra alors démonter complètement le mouvement pour contrôler la platine 
                  sur machine à mesurer tridimensionnelle (MMT).
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Quelle est la durée de vie typique d'une platine en laiton ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Une platine en laiton correctement traitée (recuit de détente, traitement de surface) peut 
                  conserver sa stabilité dimensionnelle pendant 30 à 50 ans, voire plus dans des conditions 
                  d'utilisation normales. Les facteurs limitants sont généralement l'usure des pierres et des 
                  pivots, pas la platine elle-même. Certains mouvements vintage des années 1950-1960 fonctionnent 
                  encore parfaitement aujourd'hui avec leur platine d'origine. En haute horlogerie avec maillechort 
                  ou matériaux nobles, la durée de vie peut dépasser le siècle.
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
