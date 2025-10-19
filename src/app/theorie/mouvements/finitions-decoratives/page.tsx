'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Sparkles, Eye } from 'lucide-react';

export default function FinitionsDecorativesPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const techniques = [
    {
      id: 'perlage',
      name: 'Perlage',
      subtitle: 'Circular Graining',
      icon: '⚪',
      description: 'Décor de cercles imbriqués sur surfaces planes',
      details: {
        outil: 'Bâton en bois (buis) avec pâte abrasive diamant',
        technique: 'Rotation à 1500-3000 tr/min, pression contrôlée',
        effet: 'Surface mate et homogène, signature de qualité',
        duree: '30 min à 2h selon taille du mouvement',
        zones: 'Platine, ponts, fonds de recoins',
      },
      avantages: ['Masque micro-rayures', 'Facilite inspection (poussières visibles)', 'Aspect uniforme'],
      usages: ['Patek Philippe', 'Vacheron Constantin', 'Audemars Piguet'],
    },
    {
      id: 'cotes',
      name: 'Côtes de Genève',
      subtitle: 'Geneva Stripes',
      icon: '〰️',
      description: 'Rayures parallèles ondulées caractéristiques',
      details: {
        outil: 'Cabron (bois dur) monté sur axe rotatif',
        technique: 'Déplacement linéaire + rotation simultanés',
        largeur: '0,5 à 2 mm par strie',
        effet: 'Jeu de lumière et ombres, élégance raffinée',
        origine: 'Genève, XVIIIᵉ siècle',
      },
      avantages: ['Signature genevoise', 'Effet visuel dynamique', 'Valorisation esthétique'],
      usages: ['Vacheron Constantin (référence)', 'Patek Philippe', 'Lange & Söhne'],
    },
    {
      id: 'anglage',
      name: 'Anglage',
      subtitle: 'Beveling / Chamfering',
      icon: '◇',
      description: 'Chanfrein poli miroir sur arêtes, fait main',
      details: {
        outil: 'Lime diamant grain fin, papiers abrasifs progressifs',
        finition: 'Polissage miroir manuel (10 000 tours/min)',
        angle: '45° avec largeur 0,3 à 1 mm',
        difficulte: 'Très haute ; angle constant sur toute longueur',
        duree: '2 à 8h par pont selon complexité',
      },
      avantages: ['Marque excellence artisanale', 'Ébavure élégante', 'Résistance corrosion'],
      usages: ['Voutilainen (référence absolue)', 'Philippe Dufour', 'Lange & Söhne'],
    },
    {
      id: 'guillochage',
      name: 'Guillochage',
      subtitle: 'Engine Turning',
      icon: '🌀',
      description: 'Gravure de motifs géométriques complexes',
      details: {
        machine: 'Tour à guillocher manuel (XVIIIᵉ siècle)',
        motifs: 'Vagues, paniers, damiers, soleils, losanges',
        application: 'Rotors, cadrans, calottes de balancier',
        rarete: '10-15 guillocheurs actifs en Europe',
        temps: '4 à 12h par cadran selon complexité',
      },
      avantages: ['Art ancestral unique', 'Pièces uniques', 'Valeur patrimoniale'],
      usages: ['Breguet (pionnier 1775)', 'Voutilainen', 'Kari Voutilainen'],
    },
    {
      id: 'satinage',
      name: 'Satinage / Brossage',
      subtitle: 'Satin Finish',
      icon: '═',
      description: 'Finition directionnelle mate par brossage',
      details: {
        types: 'Circulaire, linéaire, soleil (radial)',
        grain: '400 à 1200 selon effet souhaité',
        zones: 'Flancs de ponts, rotor, platine périphérique',
        effet: 'Aspect sportif/technique, reflets directionnels',
        methode: 'Brossage abrasif contrôlé',
      },
      avantages: ['Masque rayures usage', 'Aspect moderne', 'Contraste avec poli'],
      usages: ['Audemars Piguet Royal Oak', 'Rolex (flancs boîtier)', 'Omega'],
    },
    {
      id: 'soleillage',
      name: 'Soleillage',
      subtitle: 'Sunray Finish',
      icon: '☀️',
      description: 'Rayons partant du centre vers extérieur',
      details: {
        technique: 'Brossage rotatif avec lignes radiales',
        effet: 'Effet soleil, dynamisme visuel',
        application: 'Cadrans, rotors, fonds de boîtes',
        contraste: 'Reflets changeants selon angle lumière',
        popularite: 'Très utilisé horlogerie moderne',
      },
      avantages: ['Effet lumineux spectaculaire', 'Illusion de profondeur', 'Signature moderne'],
      usages: ['Rolex (cadrans)', 'Omega Seamaster', 'Tudor'],
    },
  ];

  const quizData = [
    {
      question: "Quelle est la fonction première du perlage, au-delà de l'esthétique ?",
      options: [
        "Augmenter la rigidité de la platine",
        "Faciliter l'inspection en rendant les poussières visibles",
        "Réduire le poids du mouvement",
        "Améliorer la conductivité thermique"
      ],
      correct: 1,
      explanation: "Le perlage crée une surface mate qui capte les micro-poussières et évite l'éblouissement des horlogers lors du travail sur le mouvement, facilitant ainsi l'inspection minutieuse."
    },
    {
      question: "Quel est l'angle typique d'un anglage (chanfrein) en haute horlogerie ?",
      options: [
        "30°",
        "45°",
        "60°",
        "90°"
      ],
      correct: 1,
      explanation: "L'anglage est traditionnellement réalisé à 45° avec une largeur de 0,3 à 1 mm. Cet angle permet un effet visuel optimal tout en conservant une bonne résistance mécanique."
    },
    {
      question: "Combien de guillocheurs professionnels sont encore actifs en Europe ?",
      options: [
        "Environ 100-150",
        "Environ 50-80",
        "Environ 10-15",
        "Plus de 200"
      ],
      correct: 2,
      explanation: "On estime entre 10 et 15 le nombre de guillocheurs maîtrisant parfaitement cette technique ancestrale en Europe. C'est un métier rarissime qui demande des années d'apprentissage."
    },
    {
      question: "Quelle part du temps de fabrication représentent les finitions décoratives en haute horlogerie ?",
      options: [
        "5 à 10%",
        "10 à 20%",
        "20 à 40%",
        "50 à 60%"
      ],
      correct: 2,
      explanation: "Les finitions décoratives représentent 20 à 40% du temps de fabrication d'un mouvement haut de gamme, et jusqu'à 30% de son prix selon Audemars Piguet."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
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
          <div className="flex items-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Finitions Décoratives
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            L'art horloger sublimé : des techniques ancestrales qui transforment la mécanique 
            en œuvre d'art, témoignant du savoir-faire artisanal d'exception.
          </p>
        </div>

        {/* SECTION 1: INTRODUCTION */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
              L'Excellence au-delà de la Fonction
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Les finitions décoratives représentent l'âme artistique de l'horlogerie de luxe. Bien qu'elles 
              n'influencent pas directement le fonctionnement du mouvement, elles constituent un témoignage 
              irréfutable du temps, du savoir-faire et de la passion investis dans chaque pièce.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Valeur Esthétique</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Sublimation visuelle transformant un mouvement technique en œuvre d'art observable
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Signature Manufacture</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Identité visuelle unique permettant de reconnaître la marque au premier coup d'œil
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Héritage Artisanal</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Transmission de techniques séculaires de maître à apprenti, patrimoine vivant
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-l-4 border-amber-600 dark:border-amber-400 p-6 rounded-r-lg">
            <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Temps et Valeur
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Les finitions décoratives représentent <strong className="text-slate-900 dark:text-slate-100">20 à 40%</strong> du temps 
              de fabrication d'un mouvement haut de gamme et jusqu'à <strong className="text-slate-900 dark:text-slate-100">30% de son prix</strong> 
              selon Audemars Piguet. Ce n'est pas une dépense superflue : c'est l'expression même du luxe horloger.
            </p>
          </div>
        </section>

        {/* SECTION 2: TECHNIQUES - INTERACTIF */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Techniques Maîtresses
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Six techniques principales dominent l'univers des finitions horlogères. Chacune requiert 
            un savoir-faire spécifique transmis sur plusieurs années. Cliquez pour explorer :
          </p>

          <div className="grid gap-6">
            {techniques.map((tech) => (
              <div key={tech.id}>
                <div
                  onClick={() => setSelectedTechnique(selectedTechnique === tech.id ? '' : tech.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedTechnique === tech.id
                      ? 'border-purple-600 dark:border-purple-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-5xl mr-5">{tech.icon}</span>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          {tech.name}
                        </h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                          {tech.subtitle}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                    {selectedTechnique === tech.id && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>

                {selectedTechnique === tech.id && (
                  <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border-l-4 border-purple-600 dark:border-purple-400">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">
                      Caractéristiques Techniques
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {Object.entries(tech.details).map(([key, value]) => (
                        <div key={key} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm font-bold text-purple-700 dark:text-purple-400 uppercase mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-slate-700 dark:text-slate-300">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h6 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          Avantages
                        </h6>
                        <ul className="space-y-2">
                          {tech.avantages.map((av, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                              {av}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h6 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">⭐</span>
                          Manufactures Emblématiques
                        </h6>
                        <ul className="space-y-2">
                          {tech.usages.map((usage, idx) => (
                            <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                              <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                              {usage}
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

        {/* SECTION 3: OUTILS TRADITIONNELS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Outils Traditionnels
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🪚</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lime Suisse</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Lime à grain diamant pour anglage et chanfreins précis. Fabriquée artisanalement 
                en Suisse avec des grains de 400 à 8000.
              </p>
              <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded-full">
                Outil maître
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-brown-100 dark:bg-brown-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cabron</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Bâton en bois de tilleul ou buis pour Côtes de Genève. Monté sur axe rotatif 
                et enduit de pâte diamant.
              </p>
              <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full">
                Technique genevoise
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Polissoir</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Outil en acier trempé poli miroir pour finitions brillantes. Utilisé à 10 000 tr/min 
                pour polissage final.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                Finition miroir
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tour à Guillocher</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Machine manuelle du XVIIIᵉ siècle pour gravure de motifs géométriques. 
                Rarissime et recherchée.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                Art ancestral
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🪵</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Bâton de Perlage</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Bâton en buis avec pâte abrasive diamant pour perlage circulaire. 
                Rotation 1500-3000 tr/min.
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                Décor classique
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Papiers Abrasifs</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Gradation progressive de 400 à 12000 grains pour polissage miroir final. 
                Patience et dextérité requises.
              </p>
              <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full">
                Finition progressive
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: MANUFACTURES EMBLÉMATIQUES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Manufactures Emblématiques
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl p-6 border-l-4 border-amber-600 dark:border-amber-400">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Audemars Piguet</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                Finitions satinées et polies contrastées sur Royal Oak. Maîtrise du jeu entre surfaces 
                mates et brillantes créant un effet visuel saisissant.
              </p>
              <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full">
                30% du prix = finitions
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Breguet</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                Guillochage main depuis 1775. Maître incontesté du tour à guillocher, chaque cadran 
                est une œuvre d'art unique nécessitant 8 à 12h de travail.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                Tradition 250 ans
              </span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border-l-4 border-purple-600 dark:border-purple-400">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Kari Voutilainen</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                Anglage extrême et perlage d'exception. Considéré comme la référence absolue mondiale 
                en matière de finitions manuelles, chaque angle est parfait.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                Maître artisan
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl p-6 border-l-4 border-slate-600 dark:border-slate-400">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">A. Lange & Söhne</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                Platine 3/4 gravée et anglée à la main. Tradition allemande de Glashütte avec 
                finitions incomparables, notamment sur les becs d'ancre.
              </p>
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300 text-xs rounded-full">
                Excellence allemande
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: VALEUR ET DISTINCTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Valeur et Distinction
          </h2>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-2xl p-8 text-white mb-6">
            <h3 className="text-2xl font-bold mb-4 text-purple-100 dark:text-purple-200">
              🎨 Au-delà de la Fonction : L'Art Horloger
            </h3>
            <p className="text-lg leading-relaxed text-purple-100 dark:text-purple-200 mb-4">
              Les finitions décoratives ne contribuent pas au fonctionnement du mouvement, mais elles 
              constituent l'essence même du luxe horloger. Elles représentent :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="font-bold mb-2">📜 Témoignage du Savoir-Faire</p>
                <p className="text-sm text-purple-100 dark:text-purple-200">
                  Chaque finition révèle des années d'apprentissage et de pratique quotidienne
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="font-bold mb-2">🏆 Signature de Manufacture</p>
                <p className="text-sm text-purple-100 dark:text-purple-200">
                  Identité visuelle unique permettant reconnaissance immédiate
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="font-bold mb-2">💎 Critère d'Authenticité</p>
                <p className="text-sm text-purple-100 dark:text-purple-200">
                  Finitions impossibles à reproduire industriellement, garantie d'origine
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="font-bold mb-2">🧬 Héritage Transmis</p>
                <p className="text-sm text-purple-100 dark:text-purple-200">
                  Techniques séculaires de maître à apprenti, patrimoine vivant
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Temps de Fabrication
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Perlage complet d'une platine</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">30 min - 2h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Côtes de Genève sur ponts</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">1 - 3h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Anglage manuel d'un pont complexe</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">2 - 8h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Guillochage d'un cadran</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">4 - 12h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                <span className="font-bold text-slate-900 dark:text-slate-100">Total finitions d'un mouvement haute gamme</span>
                <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">20-40%</span>
              </div>
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
                  className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all"
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
                            ? 'border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-950/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30'
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
                  <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-600 dark:border-purple-400 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-purple-900 dark:text-purple-300">Explication :</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizData.length && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-purple-600 dark:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
              >
                Voir les Résultats
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
                <p className="text-center text-xl font-bold text-slate-900 dark:text-white">
                  {calculateScore() === quizData.length
                    ? '🎉 Parfait ! Vous maîtrisez l\'art des finitions décoratives !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à explorer cet art !'
                    : '📚 Relisez le cours pour mieux comprendre !'}
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
                <span className="text-purple-600 dark:text-purple-400 mr-3">▼</span>
                Les finitions décoratives influencent-elles la précision du mouvement ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Non, les finitions décoratives n'ont aucun impact direct sur la précision ou le fonctionnement 
                  du mouvement. Cependant, certaines finitions comme le perlage facilitent l'inspection en rendant 
                  les poussières visibles, et l'anglage élimine les arêtes vives qui pourraient retenir des impuretés. 
                  Leur valeur est avant tout esthétique et patrimoniale, témoignant du niveau de finition et du 
                  savoir-faire investi dans la pièce.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-purple-600 dark:text-purple-400 mr-3">▼</span>
                Peut-on apprendre le guillochage en autodidacte ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Théoriquement oui, mais en pratique extrêmement difficile. Les tours à guillocher manuels 
                  ne sont plus fabriqués et les rares exemplaires disponibles coûtent des dizaines de milliers d'euros. 
                  De plus, la technique requiert plusieurs années d'apprentissage auprès d'un maître guillocheur 
                  pour maîtriser le geste, la pression et la régularité. On estime qu'il reste seulement 10 à 15 
                  guillocheurs professionnels actifs en Europe. L'apprentissage traditionnel de maître à élève reste 
                  la voie privilégiée.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-purple-600 dark:text-purple-400 mr-3">▼</span>
                Pourquoi les Côtes de Genève sont-elles si valorisées ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Les Côtes de Genève sont une signature historique de l'horlogerie genevoise depuis le XVIIIᵉ siècle. 
                  Au-delà de leur beauté visuelle (jeu de lumière créant un effet de vagues), elles témoignent d'un 
                  savoir-faire artisanal nécessitant précision et régularité. Chaque strie doit être parfaitement 
                  parallèle avec un espacement constant de 0,5 à 2 mm. Les manufactures prestigieuses comme 
                  Vacheron Constantin et Patek Philippe en ont fait leur marque de fabrique, garantissant ainsi 
                  l'authenticité et la qualité de leurs mouvements.
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
