'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function PlatinePontsPage() {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const togglePart = (id: string) => {
    setSelectedParts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const materials = [
    {
      id: 'laiton',
      name: 'Laiton',
      icon: '🥇',
      description: 'Matériau traditionnel le plus utilisé. Bon compromis entre usinabilité, stabilité et coût.',
      badge: 'Standard',
      badgeIcon: '⚙️'
    },
    {
      id: 'maillechort',
      name: 'Maillechort',
      icon: '💎',
      description: 'Alliage de cuivre, nickel et zinc. Plus résistant à la corrosion, couleur argentée naturelle.',
      badge: 'Haute Gamme',
      badgeIcon: '💎'
    },
    {
      id: 'nobles',
      name: 'Matériaux Nobles',
      icon: '👑',
      description: 'Or, platine, saphir synthétique, carbone. Utilisés en haute horlogerie.',
      badge: 'Prestige',
      badgeIcon: '✨'
    },
  ];

  const treatments = [
    {
      name: 'Rhodiage',
      icon: '🌟',
      description: 'Dépôt électrolytique de rhodium. Confère une couleur blanc argenté brillant et protège de l\'oxydation.'
    },
    {
      name: 'Dorage',
      icon: '🛡️',
      description: 'Dépôt d\'or galvanique. Donne une teinte dorée chaude et protège le laiton.'
    },
    {
      name: 'PVD / DLC',
      icon: '⚡',
      description: 'Traitements modernes haute technologie. Offrent résistance supérieure et large gamme de couleurs (noir, bleu, etc.).'
    },
  ];

  const finishes = [
    {
      name: 'Côtes de Genève',
      description: 'Motif de vagues parallèles réalisé à la meule. Décoration emblématique de l\'horlogerie suisse, appliquée sur la surface des ponts.',
      type: 'Décoration linéaire'
    },
    {
      name: 'Perlage',
      description: 'Motif de cercles imbriqués créé par une petite meule rotative. Appliqué sur la platine, il donne un aspect satiné régulier.',
      type: 'Décoration circulaire'
    },
    {
      name: 'Anglage',
      description: 'Chanfreinage et polissage des arêtes des ponts à 45°. Travail manuel exigeant réalisé avec des limes et pierres à polir.',
      type: 'Finition des angles'
    },
    {
      name: 'Gravure',
      description: 'Ornements gravés à la main ou à la machine sur le coq et les ponts. Motifs floraux, arabesques ou armoiries selon la tradition.',
      type: 'Décoration artistique'
    },
  ];

  const quizData = [
    {
      question: "Quel est le rôle principal de la platine dans un mouvement horloger ?",
      options: [
        "Décorer le mouvement",
        "Servir de châssis principal supportant tous les composants",
        "Protéger le mouvement des chocs",
        "Faciliter le remontage"
      ],
      correct: 1,
      explanation: "La platine est la plaque de base qui sert de châssis principal. Tous les composants du mouvement (barillet, rouages, échappement, balancier) sont fixés sur elle ou entre elle et les ponts."
    },
    {
      question: "Quelle est la particularité de la construction allemande à platine 3/4 ?",
      options: [
        "Elle utilise trois ponts séparés",
        "Un seul grand pont couvre trois-quarts du mouvement",
        "La platine ne couvre que 75% du diamètre",
        "Elle nécessite moins de vis"
      ],
      correct: 1,
      explanation: "Développée par Ferdinand Adolph Lange en 1864, la platine 3/4 utilise un seul grand pont qui couvre environ trois-quarts de la surface du mouvement. Seul le coq de balancier reste séparé. Cette construction privilégie la stabilité maximale."
    },
    {
      question: "Comment appelle-t-on le pont du balancier dans la tradition horlogère suisse ?",
      options: [
        "Le rotor",
        "Le coq",
        "L'ancre",
        "Le barillet"
      ],
      correct: 1,
      explanation: "Le coq est le nom traditionnel du pont du balancier dans l'horlogerie suisse. Cette appellation remonte au XVIe siècle, lorsque les horlogers façonnaient ce pont avec une forme élégante rappelant la silhouette d'un coq."
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

      {/* HERO */}
      <section className="bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            La Platine et les Ponts
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            L'ossature structurelle du mouvement horloger : comprendre le bâti qui maintient toute la mécanique 
            avec précision et stabilité.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: LA PLATINE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            La Platine : Le Châssis du Mouvement
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Définition et Fonction
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              La <strong className="text-slate-900 dark:text-slate-100">platine</strong> est la plaque de base qui occupe 
              généralement toute la surface du mouvement horloger. Elle constitue le châssis principal sur lequel sont 
              fixés tous les autres composants : barillet, rouages, échappement, balancier et ponts.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Avec les ponts qui viennent s'y fixer, la platine forme la <strong className="text-slate-900 dark:text-slate-100">cage du mouvement</strong>. 
              C'est entre ces deux éléments que pivotent librement tous les organes mobiles, maintenus par des paliers (pierres).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Rigidité</h4>
              <p className="text-slate-700 dark:text-slate-300">
                La platine doit offrir une rigidité maximale pour garantir la stabilité dimensionnelle et le maintien 
                précis de tous les composants.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Stabilité Thermique</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Faible coefficient de dilatation pour maintenir les jeux et distances critiques malgré les variations de température.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Caractéristiques Techniques</h4>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span><strong className="text-slate-900 dark:text-slate-100">Épaisseur :</strong> 1 à 3 mm selon le calibre</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span><strong className="text-slate-900 dark:text-slate-100">Diamètre :</strong> Couvre toute la surface du mouvement (sauf platines partielles)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span><strong className="text-slate-900 dark:text-slate-100">Perçages :</strong> Logements pour pivots, passages pour pignons, fixations pour ponts</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span><strong className="text-slate-900 dark:text-slate-100">Filetages :</strong> Pas-de-vis pour la fixation des ponts et du cadran</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: LES PONTS - VERSION CORRIGÉE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Les Ponts : Maintien et Guidage
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Rôle des Ponts
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Les <strong className="text-slate-900 dark:text-slate-100">ponts</strong> sont des plaques fixées à la platine qui maintiennent 
              les pivots supérieurs des mobiles. Chaque pivot d'une roue ou d'un pignon est ainsi guidé entre deux paliers : 
              l'un dans la platine (côté cadran) et l'autre dans le pont (côté fond).
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Les deux extrémités du pont sont rattachées à la platine par des vis, formant ainsi une structure rigide 
              qui maintient les axes dans leur position exacte. Cette précision est cruciale pour le bon fonctionnement 
              de l'engrenage et la régularité de la marche.
            </p>
          </div>

          {/* Accordion Interactif CORRIGÉ */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Principaux Ponts d'un Mouvement
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Cliquez sur les éléments pour les explorer :
            </p>
            
            <div className="space-y-4">
              {/* PLATINE */}
              <div>
                <div
                  onClick={() => togglePart('platine')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes('platine')
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Platine
                      </h4>
                      {!selectedParts.includes('platine') && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          Plaque de base supportant tous les composants
                        </p>
                      )}
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedParts.includes('platine') ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>
                
                {selectedParts.includes('platine') && (
                  <div className="mt-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      La <strong>platine</strong> est la plaque de base du mouvement horloger. Elle porte tous les composants 
                      mécaniques et sert de référence dimensionnelle pour l'ensemble du calibre.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>Support structurel principal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>Paliers côté cadran pour tous les pivots</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>Filetages pour fixation des ponts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                        <span>Épaisseur 1,5-3mm selon calibre</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* PONT DE BARILLET */}
              <div>
                <div
                  onClick={() => togglePart('pont-barillet')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes('pont-barillet')
                      ? 'border-green-600 dark:border-green-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-green-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Pont de barillet
                      </h4>
                      {!selectedParts.includes('pont-barillet') && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          Maintient l'axe du barillet
                        </p>
                      )}
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedParts.includes('pont-barillet') ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>
                
                {selectedParts.includes('pont-barillet') && (
                  <div className="mt-3 bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border-l-4 border-green-600 dark:border-green-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      Le <strong>pont de barillet</strong> maintient le pivot supérieur de l'axe du barillet, qui contient 
                      le ressort moteur. Ce pont doit être particulièrement robuste car il subit la tension constante du ressort.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                        <span>Maintient le barillet en position</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                        <span>Résiste à la tension du ressort moteur</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                        <span>Pierre ou palier renforcé</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* PONT DE ROUAGE */}
              <div>
                <div
                  onClick={() => togglePart('pont-rouage')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes('pont-rouage')
                      ? 'border-purple-600 dark:border-purple-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Pont de rouage
                      </h4>
                      {!selectedParts.includes('pont-rouage') && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          Supporte les roues du rouage
                        </p>
                      )}
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedParts.includes('pont-rouage') ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>
                
                {selectedParts.includes('pont-rouage') && (
                  <div className="mt-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border-l-4 border-purple-600 dark:border-purple-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      Le <strong>pont de rouage</strong> (ou pont de finissage) maintient les pivots supérieurs des roues 
                      du train d'engrenages : grande moyenne, petite moyenne, roue d'échappement. Il assure l'alignement 
                      parfait des engrenages.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                        <span>Maintient grande moyenne, petite moyenne</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                        <span>Supporte roue d'échappement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                        <span>Paliers rubis pour tous les pivots</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                        <span>Souvent décoré côtes de Genève</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* COQ */}
              <div>
                <div
                  onClick={() => togglePart('coq')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes('coq')
                      ? 'border-orange-600 dark:border-orange-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-orange-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Coq 🐓
                      </h4>
                      {!selectedParts.includes('coq') && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          Pont du balancier (terminologie suisse)
                        </p>
                      )}
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedParts.includes('coq') ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>
                
                {selectedParts.includes('coq') && (
                  <div className="mt-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl p-6 border-l-4 border-orange-600 dark:border-orange-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      Le <strong>coq</strong> est le nom traditionnel du pont du balancier dans l'horlogerie suisse. 
                      Son nom vient de sa forme élégante rappelant la silhouette d'un coq (XVIe siècle). C'est souvent 
                      le pont le plus décoré et visible.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                        <span>Maintient pivot supérieur balancier</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                        <span>Souvent gravé et décoré artistiquement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                        <span>Visible à travers fond transparent</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                        <span>Tradition suisse depuis XVIe siècle</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* PONT D'ANCRE */}
              <div>
                <div
                  onClick={() => togglePart('pont-ancre')}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes('pont-ancre')
                      ? 'border-red-600 dark:border-red-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Pont d'ancre
                      </h4>
                      {!selectedParts.includes('pont-ancre') && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          Maintient l'échappement
                        </p>
                      )}
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedParts.includes('pont-ancre') ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>
                
                {selectedParts.includes('pont-ancre') && (
                  <div className="mt-3 bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border-l-4 border-red-600 dark:border-red-400">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      Le <strong>pont d'ancre</strong> maintient l'ancre de l'échappement, pièce cruciale qui régule 
                      le déroulement de l'énergie. Sa position doit être extrêmement précise pour assurer le bon 
                      fonctionnement de l'échappement.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start">
                        <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                        <span>Maintient pivot ancre d'échappement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                        <span>Position ultra-précise requise</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                        <span>Palier rubis pour minimiser frottements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                        <span>Régule la régularité de la marche</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Le Coq - Section spéciale */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🐓 Le Coq : Une Tradition Horlogère</h3>
            <p className="text-blue-100 dark:text-blue-200 leading-relaxed mb-4">
              Le <strong className="text-white">coq</strong> est le nom traditionnel donné au pont du balancier dans l'horlogerie suisse. 
              Cette appellation remonte au XVIe siècle, lorsque les horlogers façonnaient ce pont avec une forme élégante 
              rappelant la silhouette d'un coq.
            </p>
            <p className="text-blue-100 dark:text-blue-200 leading-relaxed">
              Originellement fixé par une clavette, le coq était de forme très allongée. Au fil des siècles, il est devenu 
              un véritable élément artistique, souvent gravé et décoré avec soin, visible à travers le fond de boîte.
            </p>
          </div>
        </section>

        {/* SECTION 3: TYPES DE CONSTRUCTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Types de Construction
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-slate-900 dark:text-white font-bold">Type</th>
                  <th className="px-6 py-3 text-left text-slate-900 dark:text-white font-bold">Caractéristiques</th>
                  <th className="px-6 py-3 text-left text-slate-900 dark:text-white font-bold">Origine</th>
                  <th className="px-6 py-3 text-left text-slate-900 dark:text-white font-bold">Avantages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">Platine 3/4</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Un seul grand pont couvre trois-quarts du mouvement</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Allemande (Glashütte)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Stabilité maximale, positions fixes des paliers</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">Ponts Séparés</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Plusieurs ponts individuels (barillet, rouage, ancre, coq)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Suisse</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Finitions élaborées, accès facilité, esthétique</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">Platine Partielle</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Ne couvre pas tout le diamètre du mouvement</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Américaine (anciennes montres de poche)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Économie de matière, visibilité du mécanisme</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">Ponts Assemblés</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Plusieurs ponts réunis en une seule pièce</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Moderne (calibres industriels)</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Assemblage rapide, coûts réduits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Platine 3/4 (Trois-Quarts)</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Développée par Ferdinand Adolph Lange en 1864, cette construction révolutionnaire utilise un seul grand pont 
                qui couvre les trois-quarts de la platine. Seul le coq de balancier reste apparent.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Marques emblématiques :</strong> A. Lange & Söhne, Glashütte Original
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Ponts Séparés (Tradition Suisse)</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Construction classique avec plusieurs ponts individuels. Permet des finitions décoratives élaborées 
                (côtes de Genève, anglage) et facilite l'accès au rouage pour l'entretien.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Marques emblématiques :</strong> Patek Philippe, Vacheron Constantin, Rolex
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: MATÉRIAUX */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Matériaux et Traitements
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {materials.map((material) => (
              <div key={material.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{material.icon}</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{material.name}</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">{material.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                    {material.badge}
                  </span>
                  <span className="text-lg">{material.badgeIcon}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">✨</span>
              Traitements de Surface
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {treatments.map((treatment, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{treatment.icon}</span>
                    <h5 className="font-bold text-slate-900 dark:text-white">{treatment.name}</h5>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{treatment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FINITIONS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Finitions et Décorations
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              En haute horlogerie, la platine et les ponts reçoivent des finitions décoratives raffinées qui témoignent du 
              savoir-faire du manufacture. Ces décorations ne sont pas seulement esthétiques : elles facilitent également 
              l'inspection et réduisent les frottements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {finishes.map((finish, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{finish.name}</h4>
                <p className="text-slate-700 dark:text-slate-300 mb-3">{finish.description}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                  {finish.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: ERREURS COMMUNES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Erreurs Communes à Éviter
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border-l-4 border-red-600 dark:border-red-400">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Erreurs lors du Démontage</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span><strong>Dévisser les ponts dans le mauvais ordre :</strong> Risque de déformation ou de blocage des mobiles. Toujours commencer par le coq, puis les ponts de finissage.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span><strong>Forcer le retrait d'un pont :</strong> Les pivots peuvent être coincés dans les paliers. Utiliser une brucelle pour soulever délicatement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span><strong>Mélanger les vis des différents ponts :</strong> Chaque pont a ses propres vis avec longueur et filetage spécifiques.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span><strong>Poser la platine côté cadran :</strong> Les pivots peuvent se tordre. Toujours poser le mouvement côté fond.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border-l-4 border-green-600 dark:border-green-400">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Bonnes Pratiques</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span><strong>Repérer la position des ponts :</strong> Noter ou photographier l'orientation avant démontage.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span><strong>Organiser les vis :</strong> Utiliser un plateau de démontage ou des compartiments séparés.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span><strong>Nettoyer platine et ponts :</strong> Profiter du démontage pour nettoyer avec solvants appropriés.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span><strong>Vérifier les paliers :</strong> Inspecter l'état des pierres et remplacer si nécessaire.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: QUIZ */}
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
                {showResults && (
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Score : {calculateScore()} / {quizData.length}
                  </span>
                )}
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
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl">
                <p className="text-center text-xl font-bold text-slate-900 dark:text-white">
                  {calculateScore() === quizData.length
                    ? '🎉 Parfait ! Vous maîtrisez la platine et les ponts !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à explorer !'
                    : '📚 Relisez le cours pour mieux comprendre !'}
                </p>
              </div>
            )}
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
