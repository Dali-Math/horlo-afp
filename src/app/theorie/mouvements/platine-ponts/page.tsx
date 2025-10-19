'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function PlatinePontsPage() {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const parts = [
    { id: 'platine', name: 'Platine', description: 'Plaque de base supportant tous les composants' },
    { id: 'pont-barillet', name: 'Pont de barillet', description: 'Maintient l\'axe du barillet' },
    { id: 'pont-rouage', name: 'Pont de rouage', description: 'Supporte les roues du rouage' },
    { id: 'coq', name: 'Coq', description: 'Pont du balancier (terminologie suisse)' },
    { id: 'pont-ancre', name: 'Pont d\'ancre', description: 'Maintient l\'échappement' },
  ];

  const togglePart = (id: string) => {
    setSelectedParts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const quizData = [
    {
      question: "Quel est le rôle principal de la platine dans un mouvement horloger ?",
      options: [
        "Servir de décoration uniquement",
        "Support structurel pour tous les composants du mouvement",
        "Réguler la vitesse du mouvement",
        "Transmettre l'énergie du ressort"
      ],
      correct: 1,
      explanation: "La platine est la plaque de base qui supporte l'ensemble des composants du mouvement : barillet, rouages, échappement et balancier."
    },
    {
      question: "Quelle est la particularité de la construction allemande à platine 3/4 ?",
      options: [
        "Elle utilise quatre ponts séparés",
        "Un grand pont couvre trois-quarts du mouvement",
        "Elle est trois fois plus petite",
        "Elle nécessite moins de pierres"
      ],
      correct: 1,
      explanation: "La platine 3/4, développée par F.A. Lange à Glashütte, utilise un seul grand pont couvrant trois-quarts du mouvement, offrant une stabilité exceptionnelle."
    },
    {
      question: "Comment appelle-t-on le pont du balancier dans la tradition horlogère suisse ?",
      options: [
        "Le pont de balancier",
        "Le coq",
        "Le pont supérieur",
        "La clé"
      ],
      correct: 1,
      explanation: "Le coq est le nom traditionnel donné au pont du balancier, en référence à sa forme élégante rappelant la silhouette d'un coq."
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
            La Platine et les Ponts
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            L'ossature structurelle du mouvement horloger : comprendre le bâti qui maintient 
            toute la mécanique avec précision et stabilité.
          </p>
        </div>

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
              La <strong className="text-slate-900 dark:text-slate-100">platine</strong> est la plaque de base qui occupe généralement 
              toute la surface du mouvement horloger. Elle constitue le châssis principal sur lequel sont fixés tous les autres 
              composants : barillet, rouages, échappement, balancier et ponts.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Avec les ponts qui viennent s'y fixer, la platine forme la <strong className="text-slate-900 dark:text-slate-100">cage du mouvement</strong>. 
              C'est entre ces deux éléments que pivotent librement tous les organes mobiles, maintenus par des paliers (pierres).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="flex items-start mb-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Rigidité</h4>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                La platine doit offrir une rigidité maximale pour garantir la stabilité dimensionnelle 
                et le maintien précis de tous les composants.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="flex items-start mb-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Stabilité Thermique</h4>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Faible coefficient de dilatation pour maintenir les jeux et distances critiques 
                malgré les variations de température.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-r-lg">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Caractéristiques Techniques
            </h4>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
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

        {/* SECTION 2: LES PONTS */}
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

          {/* Composants interactifs */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Principaux Ponts d'un Mouvement
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Cliquez sur les éléments pour les explorer :
            </p>
            <div className="grid gap-4">
              {parts.map((part) => (
                <div
                  key={part.id}
                  onClick={() => togglePart(part.id)}
                  className={`bg-white dark:bg-slate-800 rounded-xl border-2 p-5 cursor-pointer transition-all ${
                    selectedParts.includes(part.id)
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {part.name}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300">
                        {part.description}
                      </p>
                    </div>
                    {selectedParts.includes(part.id) && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Le Coq - Section spéciale */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white mb-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-100 dark:text-blue-200">
              🐓 Le Coq : Une Tradition Horlogère
            </h3>
            <p className="text-lg leading-relaxed mb-4 text-blue-100 dark:text-blue-200">
              Le <strong>coq</strong> est le nom traditionnel donné au pont du balancier dans l'horlogerie suisse. 
              Cette appellation remonte au XVIe siècle, lorsque les horlogers façonnaient ce pont avec une forme 
              élégante rappelant la silhouette d'un coq.
            </p>
            <p className="text-lg leading-relaxed text-blue-100 dark:text-blue-200">
              Originellement fixé par une clavette, le coq était de forme très allongée. Au fil des siècles, 
              il est devenu un véritable élément artistique, souvent gravé et décoré avec soin, 
              visible à travers le fond de boîte.
            </p>
          </div>
        </section>

        {/* SECTION 3: TYPES DE CONSTRUCTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Types de Construction
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Caractéristiques</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Origine</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100">Avantages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      Platine 3/4
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Un seul grand pont couvre trois-quarts du mouvement
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Allemande (Glashütte)
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Stabilité maximale, positions fixes des paliers
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      Ponts Séparés
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Plusieurs ponts individuels (barillet, rouage, ancre, coq)
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Suisse
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Finitions élaborées, accès facilité, esthétique
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      Platine Partielle
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Ne couvre pas tout le diamètre du mouvement
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Américaine (anciennes montres de poche)
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Économie de matière, visibilité du mécanisme
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      Ponts Assemblés
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Plusieurs ponts réunis en une seule pièce
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Moderne (calibres industriels)
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Assemblage rapide, coûts réduits
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">
                Platine 3/4 (Trois-Quarts)
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Développée par Ferdinand Adolph Lange en 1864, cette construction révolutionnaire utilise un seul 
                grand pont qui couvre les trois-quarts de la platine. Seul le coq de balancier reste apparent.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100">Marques emblématiques :</strong> A. Lange & Söhne, Glashütte Original
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">
                Ponts Séparés (Tradition Suisse)
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Construction classique avec plusieurs ponts individuels. Permet des finitions décoratives élaborées 
                (côtes de Genève, anglage) et facilite l'accès au rouage pour l'entretien.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-100">Marques emblématiques :</strong> Patek Philippe, Vacheron Constantin, Rolex
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MATÉRIAUX */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Matériaux et Traitements
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🥇</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Laiton</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Matériau traditionnel le plus utilisé. Bon compromis entre usinabilité, stabilité et coût.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full">
                Standard
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-gray-100 dark:bg-gray-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Maillechort</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Alliage de cuivre, nickel et zinc. Plus résistant à la corrosion, couleur argentée naturelle.
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full">
                Haute Gamme
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Matériaux Nobles</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Or, platine, saphir synthétique, carbone. Utilisés en haute horlogerie.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full">
                Prestige
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Traitements de Surface
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Rhodiage</h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    Dépôt électrolytique de rhodium. Confère une couleur blanc argenté brillant et protège de l'oxydation.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-xl">🌟</span>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Dorage</h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    Dépôt d'or galvanique. Donne une teinte dorée chaude et protège le laiton.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-xl">🛡️</span>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-1">PVD / DLC</h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    Traitements modernes haute technologie. Offrent résistance supérieure et large gamme de couleurs (noir, bleu, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FINITIONS DÉCORATIVES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Finitions et Décorations
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            En haute horlogerie, la platine et les ponts reçoivent des finitions décoratives raffinées qui témoignent 
            du savoir-faire du manufacture. Ces décorations ne sont pas seulement esthétiques : elles facilitent 
            également l'inspection et réduisent les frottements.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Côtes de Genève</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Motif de vagues parallèles réalisé à la meule. Décoration emblématique de l'horlogerie suisse, 
                appliquée sur la surface des ponts.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                Décoration linéaire
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Perlage</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Motif de cercles imbriqués créé par une petite meule rotative. Appliqué sur la platine, 
                il donne un aspect satiné régulier.
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">
                Décoration circulaire
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Anglage</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Chanfreinage et polissage des arêtes des ponts à 45°. Travail manuel exigeant réalisé 
                avec des limes et pierres à polir.
              </p>
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                Finition des angles
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Gravure</h4>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Ornements gravés à la main ou à la machine sur le coq et les ponts. Motifs floraux, 
                arabesques ou armoiries selon la tradition.
              </p>
              <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-full">
                Décoration artistique
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6: ERREURS COMMUNES */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Erreurs Communes à Éviter
          </h2>

          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-4 flex items-center">
              <XCircle className="w-6 h-6 mr-2" />
              Erreurs lors du Démontage
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Dévisser les ponts dans le mauvais ordre :</strong> Risque de déformation 
                  ou de blocage des mobiles. Toujours commencer par le coq, puis les ponts de finissage.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Forcer le retrait d'un pont :</strong> Les pivots peuvent être coincés 
                  dans les paliers. Utiliser une brucelle pour soulever délicatement.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Mélanger les vis des différents ponts :</strong> Chaque pont a ses propres 
                  vis avec longueur et filetage spécifiques. Les confondre peut endommager les filetages.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 font-bold">✗</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Poser la platine côté cadran :</strong> Les pivots peuvent se tordre. 
                  Toujours poser le mouvement côté fond ou dans un support adapté.
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
                  <strong className="text-slate-900 dark:text-slate-100">Repérer la position des ponts :</strong> Noter ou photographier 
                  l'orientation avant démontage pour faciliter le remontage.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Organiser les vis :</strong> Utiliser un plateau de démontage 
                  ou des compartiments séparés pour chaque groupe de vis.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Nettoyer platine et ponts :</strong> Profiter du démontage 
                  pour nettoyer minutieusement ces pièces avec les solvants appropriés.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Vérifier les paliers :</strong> Inspecter l'état des pierres 
                  et remplacer si nécessaire avant le remontage.
                </span>
              </li>
            </ul>
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
                    ? '🎉 Parfait ! Vous maîtrisez le sujet !'
                    : calculateScore() >= quizData.length / 2
                    ? '👍 Bon travail ! Continuez à apprendre !'
                    : '📚 Relisez le cours et réessayez !'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Questions Fréquentes
          </h2>

          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Pourquoi certains mouvements ont-ils plus de ponts que d'autres ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Le nombre de ponts dépend de l'architecture du mouvement et de la philosophie du manufacturier. 
                  Les mouvements complexes avec complications nécessitent généralement plus de ponts pour maintenir 
                  les organes additionnels. La construction allemande à platine 3/4 utilise moins de ponts distincts 
                  pour privilégier la stabilité, tandis que la tradition suisse favorise plusieurs ponts séparés 
                  permettant des finitions décoratives plus élaborées.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Peut-on remplacer une platine endommagée ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  En théorie oui, mais en pratique c'est extrêmement complexe et coûteux. La platine est usinée 
                  avec une précision micrométrique et tous les perçages, taraudages et ajustements sont spécifiques 
                  à chaque calibre. Remplacer une platine revient pratiquement à fabriquer un nouveau mouvement. 
                  Pour les montres de valeur, il est préférable de contacter le manufacturier qui pourra fournir 
                  une pièce de rechange d'origine.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Les finitions décoratives ont-elles une utilité fonctionnelle ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Si les finitions comme les côtes de Genève ou le perlage sont principalement esthétiques, 
                  elles ont aussi des avantages fonctionnels. Le perlage sur la platine facilite l'inspection 
                  visuelle en révélant les impuretés et rayures. L'anglage (chanfreinage) des ponts élimine 
                  les arêtes vives qui pourraient retenir des poussières. Le polissage réduit légèrement les 
                  frottements de l'air. Ces finitions témoignent surtout du soin apporté à la fabrication.
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Quelle est l'épaisseur typique d'une platine ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  L'épaisseur varie selon la taille et le type de mouvement. Pour une montre-bracelet standard, 
                  la platine mesure généralement entre 1,5 et 3 mm d'épaisseur. Les mouvements ultra-plats peuvent 
                  avoir des platines de moins de 1 mm, tandis que les grosses montres de poche anciennes dépassent 
                  parfois 4 mm. L'épaisseur est un compromis entre rigidité (plus épais = plus rigide) et finesse 
                  du mouvement (objectif des manufactures modernes).
                </p>
              </div>
            </details>

            <details className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <summary className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">▼</span>
                Comment identifier une vraie platine 3/4 ?
              </summary>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Une vraie platine 3/4 se reconnaît par un seul grand pont qui couvre environ trois-quarts 
                  de la surface du mouvement côté fond. Seul le coq (pont de balancier) reste séparé et visible. 
                  Ce pont massif est généralement décoré de côtes de Genève et finement anglé. Les marques 
                  allemandes comme A. Lange & Söhne et Glashütte Original sont célèbres pour cette construction. 
                  À ne pas confondre avec des ponts assemblés qui imitent l'apparence mais sont constitués 
                  de plusieurs pièces vissées ensemble.
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
