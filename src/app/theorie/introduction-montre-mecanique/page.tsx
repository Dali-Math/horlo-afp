// app/theorie/introduction-montre-mecanique.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch, 
  RotateCw, Trophy, BookOpen, Zap, TrendingUp, Award
} from 'lucide-react';
import Link from 'next/link';

// Composant Schéma Interactif
const SchemaMecanisme = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState<string | null>(null);
  
  const organes = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet', 
      desc: 'Stocke l\'énergie du ressort moteur. Contient le ressort qui libère progressivement son énergie.', 
      x: 15, y: 50, couleur: '#3B82F6', 
      lien: '/theorie/le-barillet'
    },
    { 
      id: 'rouage', 
      nom: 'Rouage', 
      desc: 'Transmet et démultiplie l\'énergie du barillet vers l\'échappement.', 
      x: 38, y: 50, couleur: '#10B981', 
      lien: '/theorie/le-rouage'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement', 
      desc: 'Transforme l\'énergie continue en impulsions régulières (le "tic-tac").', 
      x: 61, y: 50, couleur: '#8B5CF6', 
      lien: '/theorie/echappement-ancre'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral', 
      desc: 'Organe réglant qui oscille à fréquence constante pour mesurer le temps.', 
      x: 84, y: 50, couleur: '#F59E0B', 
      lien: '/theorie/balancier-spiral'
    },
  ], []);

  return (
    <div className="relative w-full h-96 bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-2 border-slate-200 dark:border-slate-700">
      <svg className="w-full h-full">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-blue-500" />
          </marker>
        </defs>
        
        {/* Flèches de flux */}
        {organes.map((o, i) => i < organes.length - 1 && (
          <motion.line
            key={`fleche-${i}`}
            x1={`${o.x + 5}%`} y1={`${o.y}%`}
            x2={`${organes[i + 1].x - 5}%`} y2={`${organes[i + 1].y}%`}
            stroke="#60A5FA" strokeWidth="3" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
          />
        ))}

        {/* Cercles des organes */}
        {organes.map((o, i) => (
          <motion.g
            key={o.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="cursor-pointer"
            onClick={() => setOrganeSelectionne(o.id)}
          >
            <circle cx={`${o.x}%`} cy={`${o.y}%`} r="40" fill={o.couleur} stroke="#fff" strokeWidth="3" />
            <text x={`${o.x}%`} y={`${o.y}%`} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" dy=".3em">
              {o.nom}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Zone d'information */}
      <AnimatePresence>
        {organeSelectionne && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  {organes.find(o => o.id === organeSelectionne)?.nom}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {organes.find(o => o.id === organeSelectionne)?.desc}
                </p>
              </div>
              <button
                onClick={() => setOrganeSelectionne(null)}
                className="ml-4 text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Données du quiz enrichies
const quizData = [
  {
    question: "Quelle est la différence principale entre une montre mécanique et une montre à quartz ?",
    options: [
      "La montre mécanique utilise une pile",
      "La montre mécanique fonctionne grâce à l'énergie d'un ressort",
      "La montre à quartz est plus précise que toutes les montres mécaniques",
      "Les montres mécaniques n'ont pas besoin d'entretien"
    ],
    correctAnswer: 1,
    explanation: "Une montre mécanique tire son énergie d'un ressort moteur qui, une fois armé, libère progressivement son énergie. Une montre à quartz utilise une pile et un cristal de quartz pour sa précision."
  },
  {
    question: "Combien d'organes principaux compose une montre mécanique simple ?",
    options: ["3 organes", "6 organes", "10 organes", "12 organes"],
    correctAnswer: 1,
    explanation: "Une montre mécanique se compose de 6 organes principaux : le moteur (barillet), le rouage, l'échappement, l'organe réglant (balancier-spiral), le remontoir et l'affichage."
  },
  {
    question: "Quel organe régule la vitesse de la montre et assure sa précision ?",
    options: ["Le barillet", "Le rouage", "Le balancier-spiral", "La couronne"],
    correctAnswer: 2,
    explanation: "Le balancier-spiral est l'organe réglant de la montre. Il oscille à une fréquence constante et régule la vitesse à laquelle l'énergie du ressort est libérée, assurant ainsi la précision."
  },
  {
    question: "Quelle est la fonction principale de l'échappement ?",
    options: ["Stocker l'énergie", "Afficher l'heure", "Transformer l'énergie continue en impulsions régulières", "Remonter le ressort"],
    correctAnswer: 2,
    explanation: "L'échappement transforme l'énergie continue du ressort moteur en impulsions régulières qui entretiennent l'oscillation du balancier. C'est le 'cœur battant' de la montre."
  },
  {
    question: "Quelle est la durée de marche typique d'une montre mécanique moderne ?",
    options: ["12 heures", "24 heures", "36-48 heures", "7 jours"],
    correctAnswer: 2,
    explanation: "La plupart des montres mécaniques modernes offrent une réserve de marche de 36 à 48 heures. Certaines complications peuvent atteindre 8 jours ou plus grâce à des barillets multiples ou de plus grande taille."
  },
  {
    question: "Quelle est la relation entre une oscillation et une alternance ?",
    options: ["1 oscillation = 1 alternance", "1 oscillation = 2 alternances", "1 oscillation = 4 alternances", "Termes synonymes"],
    correctAnswer: 1,
    explanation: "Une alternance est le déplacement du balancier dans un seul sens, tandis qu'une oscillation représente un aller-retour complet. Donc 1 oscillation = 2 alternances."
  },
  {
    question: "À quelle fréquence correspond 28'800 A/h ?",
    options: ["3 Hz", "4 Hz (8 alternances/seconde)", "5 Hz", "2,5 Hz"],
    correctAnswer: 1,
    explanation: "28'800 alternances/heure ÷ 3'600 secondes = 8 alternances/seconde. Comme 1 oscillation = 2 alternances, la fréquence est de 4 Hz."
  },
  {
    question: "Qu'est-ce que le COSC ?",
    options: ["Un type de ressort", "Organisme de certification de précision", "Technique de fabrication", "Standard de résistance à l'eau"],
    correctAnswer: 1,
    explanation: "Le COSC (Contrôle Officiel Suisse des Chronomètres) est un organisme indépendant qui certifie la précision des montres chronométriques (-4/+6 secondes par jour)."
  }
];

// Composant principal de la page
export default function IntroductionMontreMecanique() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowResults(false);
  };

  const pourcentageScore = Math.round((score / quizData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* En-tête */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
            Théorie de base • Niveau 1
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Introduction à la Montre Mécanique
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Découvrez les principes fondamentaux du fonctionnement d'une montre mécanique et ses organes essentiels
          </p>
        </motion.div>

        {/* Section 1: Qu'est-ce qu'une montre mécanique ? */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Watch className="w-8 h-8 mr-3 text-blue-600" />
            Qu'est-ce qu'une montre mécanique ?
          </h2>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              Une <strong className="text-slate-900 dark:text-white">montre mécanique</strong> est un instrument de mesure du temps fonctionnant grâce à l'énergie mécanique d'un ressort moteur. 
              Contrairement aux montres à quartz qui utilisent une pile et un oscillateur électronique, la montre mécanique est entièrement mécanique et ne nécessite aucune source d'énergie électrique.
            </p>

            <p>
              Le principe de base est simple : un <strong>ressort</strong> est armé (par remontage manuel ou automatique), puis libère progressivement son énergie pour faire tourner les aiguilles. 
              Cette énergie est régulée par un système d'<strong>échappement</strong> et un <strong>balancier-spiral</strong> qui oscillent à une fréquence constante, garantissant la précision du mouvement.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
              <p className="text-slate-700 dark:text-slate-300">
                <strong className="text-blue-800 dark:text-blue-300">💡 Le saviez-vous ?</strong><br/>
                Une montre mécanique peut contenir entre 100 et 300 composants, voire plus de 1 000 pour les grandes complications (chronographe, calendrier perpétuel, tourbillon...).
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Les 6 organes principaux */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Cog className="w-8 h-8 mr-3 text-blue-600" />
            Les 6 organes principaux
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Une montre mécanique simple se compose de <strong className="text-slate-900 dark:text-white">six organes essentiels</strong> qui travaillent ensemble pour mesurer le temps avec précision :
          </p>

          {/* Schéma interactif */}
          <SchemaMecanisme />
          <p className="text-sm text-slate-500 text-center mt-4">
            Cliquez sur un organe pour plus d'informations • <Link href="/theorie/anatomie-detaillee" className="text-blue-600 hover:underline">Voir l'anatomie détaillée</Link>
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { Icon: Clock, couleur: 'from-blue-50 to-indigo-50', bordure: 'border-blue-200', titre: '1. Le Moteur (Barillet)', desc: 'Le barillet contient le ressort moteur qui stocke l\'énergie mécanique. C\'est la source d\'énergie de la montre.', lien: '/theorie/le-barillet' },
              { Icon: RotateCw, couleur: 'from-green-50 to-emerald-50', bordure: 'border-green-200', titre: '2. Le Rouage', desc: 'Ensemble de roues dentées et pignons qui transmettent l\'énergie du barillet vers l\'échappement en démultipliant la vitesse.', lien: '/theorie/le-rouage' },
              { Icon: Gauge, couleur: 'from-purple-50 to-violet-50', bordure: 'border-purple-200', titre: '3. L\'Échappement', desc: 'Transforme l\'énergie continue en impulsions régulières. C\'est le "cœur battant" de la montre (tic-tac).', lien: '/theorie/echappement-ancre' },
              { Icon: Settings, couleur: 'from-orange-50 to-amber-50', bordure: 'border-orange-200', titre: '4. L\'Organe Réglant', desc: 'Le balancier-spiral oscille à fréquence constante et régule la vitesse du mouvement. C\'est lui qui garantit la précision.', lien: '/theorie/balancier-spiral' },
              { Icon: Eye, couleur: 'from-red-50 to-rose-50', bordure: 'border-red-200', titre: '5. Le Remontoir', desc: 'Mécanisme permettant d\'armer le ressort (manuellement via la couronne, ou automatiquement via une masse oscillante).', lien: '/theorie/remontage' },
              { Icon: Watch, couleur: 'from-cyan-50 to-sky-50', bordure: 'border-cyan-200', titre: '6. L\'Affichage', desc: 'Les aiguilles et cadran qui permettent de lire l\'heure. Actionnés par le rouage via la chaussée et la minuterie.', lien: '/theorie/affichage' },
            ].map((item, i) => (
              <div 
                key={i}
                className={`bg-gradient-to-br ${item.couleur} dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border ${item.bordure} dark:border-slate-600 transition-transform hover:scale-105`}
              >
                <div className="flex items-center mb-3">
                  <item.Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.titre}</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-3">{item.desc}</p>
                <Link href={item.lien} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Fonctionnement général */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-blue-600" />
            Fonctionnement général
          </h2>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              Le fonctionnement d'une montre mécanique suit un <strong>circuit énergétique précis</strong> :
            </p>

            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li><strong>Stockage de l'énergie</strong> : Le ressort moteur est armé dans le barillet (remontage manuel ou automatique).</li>
              <li><strong>Transmission</strong> : L'énergie passe par le rouage qui démultiplie la rotation du barillet pour atteindre des vitesses adaptées.</li>
              <li><strong>Régulation</strong> : L'échappement transforme l'énergie continue en impulsions qui entretiennent l'oscillation du balancier-spiral.</li>
              <li><strong>Comptage du temps</strong> : Chaque oscillation du balancier correspond à un "battement". Pour une fréquence de 28'800 alternances/heure, le balancier oscille 8 fois par seconde.</li>
              <li><strong>Affichage</strong> : Le rouage transmet le mouvement aux aiguilles via la chaussée (aiguille des minutes) et le renvoi (aiguille des heures).</li>
            </ol>
          </div>
        </motion.section>

        {/* Section 4: Fréquences et précision */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            Fréquences, amplitude et précision
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 dark:from-slate-700 dark:to-slate-800">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">18'000 A/h (2,5 Hz)</h3>
              <p className="text-sm mb-2"><strong>Traditionnelle</strong> - 5 alternances/seconde</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Fréquence historique, offre une autonomie légèrement supérieure. Utilisée dans les montres vintage.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 dark:from-slate-700 dark:to-slate-800">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">28'800 A/h (4 Hz)</h3>
              <p className="text-sm mb-2"><strong>Standard moderne</strong> - 8 alternances/seconde</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Fréquence la plus répandue. Excellent compromis entre précision et consommation d'énergie.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 dark:from-slate-700 dark:to-slate-800">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-3">36'000 A/h (5 Hz)</h3>
              <p className="text-sm mb-2"><strong>Haute fréquence</strong> - 10 alternances/seconde</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Utilisée pour les montres de haute précision. Meilleure stabilité face aux chocs.</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg dark:bg-amber-950/30">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
              <Gauge className="w-5 h-5 mr-2" />
              L'amplitude et le rabattement
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              <strong>Amplitude</strong> : Angle de rotation du balancier (normalement 180°-315°). Une amplitude trop basse indique un problème mécanique.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Rabattement</strong> : Phénomène où le balancier touche la fourchette, signe d'amplitude excessive.
            </p>
          </div>
        </motion.section>

        {/* Section 5: Montres iconiques */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-blue-600" />
            Des montres qui ont marqué l'histoire
          </h2>

          <div className="space-y-4">
            {[
              { annee: '1957', nom: 'Omega Speedmaster', desc: 'Première montre chronographe avec tachymètre sur le bezel, devenue la "Moonwatch" après avoir été portée sur la Lune.', calibre: 'Lemania 321' },
              { annee: '1969', nom: 'TAG Heuer Monaco', desc: 'Premier chronographe automatique carré étanche, rendu célèbre par Steve McQueen dans "Le Mans".', calibre: 'Chronomatic 11' },
              { annee: '1976', nom: 'Patek Philippe Nautilus', desc: 'Créée par Gérald Genta, révolution du design sportif de luxe en acier.', calibre: '28-255 C' },
              { annee: '1972', nom: 'Audemars Piguet Royal Oak', desc: 'Première montre de luxe sportive en acier, aussi dessinée par Gérald Genta.', calibre: '2121' },
            ].map((montre, i) => (
              <div key={i} className="border-l-4 border-blue-600 pl-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {montre.annee} - {montre.nom}
                  </h3>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-2">{montre.desc}</p>
                <span className="text-sm text-slate-500 font-medium">Calibre : {montre.calibre}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Vocabulaire essentiel */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            Vocabulaire essentiel
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { terme: 'Calibre', def: 'Désigne le type de mouvement horloger (ex : ETA 6497, Sellita SW200).', lien: '/vocabulaire/calibre' },
              { terme: 'Platine', def: 'Plaque de base du mouvement sur laquelle sont fixés tous les organes.', lien: '/vocabulaire/platine' },
              { terme: 'Pont', def: 'Pièce fixée sur la platine qui maintient les axes des mobiles (pont de barillet, pont d\'ancre...).', lien: '/vocabulaire/pont' },
              { terme: 'Mobile', def: 'Ensemble formé par une roue et un pignon monté sur un axe.', lien: '/vocabulaire/mobile' },
              { terme: 'Alternance (A/h)', def: 'Nombre d\'oscillations du balancier par heure. Valeurs courantes : 18\'000, 21\'600, 28\'800 A/h.', lien: '/vocabulaire/alternance' },
              { terme: 'Réserve de marche', def: 'Durée pendant laquelle la montre fonctionne après un remontage complet (typiquement 36-48h).', lien: '/vocabulaire/reserve-de-marche' },
              { terme: 'Chronomètre', def: 'Montre ayant obtenu la certification de précision du COSC (-4/+6 sec/jour).', lien: '/vocabulaire/chronometre' },
              { terme: 'Complication', def: 'Fonction additionnelle à l\'affichage de l\'heure (chronographe, calendrier, etc.).', lien: '/vocabulaire/complication' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.terme}</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{item.def}</p>
                <Link href={item.lien} className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Voir la définition complète →
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 7: Comparatif */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Gauge className="mr-3 text-blue-600" />
            Montre mécanique vs autres technologies
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">Critère</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">Mécanique</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">Quartz</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">Smartwatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { crit: 'Source d\'énergie', meca: 'Ressort moteur', quartz: 'Pile', smart: 'Batterie rechargeable' },
                  { crit: 'Précision', meca: '±5 à 15 sec/jour', quartz: '±15 sec/mois', smart: 'Connectée (précision absolue)' },
                  { crit: 'Autonomie', meca: '36-48h (remontage)', quartz: '2-5 ans', smart: '1-2 jours' },
                  { crit: 'Entretien', meca: 'Révision 3-5 ans', quartz: 'Changement pile', smart: 'Mises à jour logicielles' },
                  { crit: 'Durée de vie', meca: 'Plusieurs générations', quartz: '10-20 ans', smart: '3-5 ans' },
                  { crit: 'Valeur artisanale', meca: 'Très élevée', quartz: 'Faible', smart: 'Nulle' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.crit}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{row.meca}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{row.quartz}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{row.smart}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Quiz */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-blue-600" />
            Quiz : Testez vos connaissances
          </h2>

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
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {quizData[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-6">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    aria-label={`Option ${String.fromCharCode(65 + index)} : ${option}`}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === null
                        ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                        : index === quizData[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                        : 'border-slate-200 dark:border-slate-700 opacity-50'
                    }`}
                  >
                    <span className="font-bold mr-3 text-slate-700 dark:text-slate-200">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-slate-800 dark:text-slate-100">{option}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 mb-6 rounded"
                    >
                      <p className="text-slate-700 dark:text-slate-300">{quizData[currentQuestion].explanation}</p>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNextQuestion}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                    >
                      {currentQuestion < quizData.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-white">{pourcentageScore}%</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {pourcentageScore >= 80 ? 'Excellent !' : pourcentageScore >= 60 ? 'Bien joué !' : 'Continuez l\'effort !'}
                </h3>
                <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
                  Vous avez obtenu {score} sur {quizData.length} ({pourcentageScore}%)
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Recommencer le quiz
                </button>
                <Link 
                  href="/theorie" 
                  className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-center"
                >
                  Retour à la théorie
                </Link>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Section 8: Pour aller plus loin */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            Pour aller plus loin
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">📚 Ressources officielles</h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• <Link href="https://www.hautehorlogerie.org" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">Fondation Haute Horlogerie</Link></li>
                <li>• <Link href="https://mih.ch" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">Musée International d'Horlogerie</Link></li>
                <li>• <Link href="/ressources/guide-achat" className="text-blue-600 hover:underline dark:text-blue-400">Guide d'achat montre mécanique</Link></li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">🎓 Prochaines leçons</h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• <Link href="/theorie/remontage-manuel-vs-automatique" className="text-blue-600 hover:underline dark:text-blue-400">Remontage manuel vs automatique</Link></li>
                <li>• <Link href="/theorie/echappement-ancre-detaille" className="text-blue-600 hover:underline dark:text-blue-400">L'échappement à ancre en détail</Link></li>
                <li>• <Link href="/pratique/entretien-montre-mecanique" className="text-blue-600 hover:underline dark:text-blue-400">Entretien et maintenance</Link></li>
              </ul>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
