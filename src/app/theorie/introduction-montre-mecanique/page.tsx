// app/theorie/introduction-montre-mecanique.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch, 
  RotateCw, Trophy, BookOpen, Zap, TrendingUp, Award, 
  ZoomIn, Info, Loader2, X, Layers
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Composant Schéma avec VRAIES images des organes
const SchemaMecanismeAvecImages = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState<string | null>(null);
  // CORRECTION : Type modifié pour accepter boolean ou string
  const [imageChargee, setImageChargee] = useState<Record<string, boolean | string>>({});
  
  const organes = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet', 
      desc: 'Stocke l\'énergie du ressort moteur. Contient le ressort qui libère progressivement son énergie.', 
      specs: 'Diamètre: 16mm • Matière: Laiton • Tours: 7-8 rotations',
      x: 15, y: 50, 
      image: '/images/organe-barillet.png',
      alt: 'Barillet de montre mécanique avec ressort moteur visible'
    },
    { 
      id: 'rouage', 
      nom: 'Train de Rouages', 
      desc: 'Ensemble de roues dentées et pignons qui démultiplient la vitesse de rotation.', 
      specs: 'Rapport: 1:60 • Matériaux: Laiton, acier • Lubrification: Huile synthétique',
      x: 38, y: 50, 
      image: '/images/organe-rouage.png',
      alt: 'Train de rouages d\'une montre mécanique'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement', 
      desc: 'Transforme l\'énergie continue en impulsions régulières (le "tic-tac" caractéristique).', 
      specs: 'Type: Ancre suisse • Alternances: 8/sec • Matière: Acier trempé',
      x: 61, y: 50, 
      image: '/images/organe-echappement.png',
      alt: 'Échappement à ancre suisse avec roue de fuite'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral', 
      desc: 'Organe réglant qui oscille à fréquence constante pour mesurer le temps avec précision.', 
      specs: 'Fréquence: 28\'800 A/h • Spiral: Flat • Amplitude: 270-320°',
      x: 84, y: 50, 
      image: '/images/organe-balancier.png',
      alt: 'Balancier avec spiral de Breguet et col de cygne'
    },
  ], []);

  const handleImageLoad = (id: string) => {
    setImageChargee(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string) => {
    // CORRECTION : 'error' est maintenant autorisé par le type boolean | string
    setImageChargee(prev => ({ ...prev, [id]: 'error' }));
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden shadow-inner">
      
      {/* Fond technique avec vis */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={`vis-${i}`}
            className="absolute w-1 h-1 bg-slate-600 dark:bg-slate-300 rounded-full"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${i % 2 === 0 ? '5%' : '92%'}`,
            }}
          />
        ))}
      </div>

      {/* Flèches de flux avec animation */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
            <polygon points="0 0, 12 4, 0 8" className="fill-blue-600 dark:fill-blue-400" />
          </marker>
        </defs>
        
        {organes.map((o, i) => i < organes.length - 1 && (
          <motion.g key={`flux-${i}`}>
            <motion.line
              x1={`${o.x + 8}%`} y1={`${o.y}%`}
              x2={`${organes[i + 1].x - 8}%`} y2={`${organes[i + 1].y}%`}
              stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: i * 0.4, duration: 1, ease: "easeInOut" }}
            />
            {/* Points de connexion */}
            <circle cx={`${o.x + 8}%`} cy={`${o.y}%`} r="2" className="fill-blue-600 dark:fill-blue-400" />
            <circle cx={`${organes[i + 1].x - 8}%`} cy={`${organes[i + 1].y}%`} r="2" className="fill-blue-600 dark:fill-blue-400" />
          </motion.g>
        ))}
      </svg>

      {/* Composants avec images réelles */}
      {organes.map((o, i) => (
        <motion.div
          key={o.id}
          className="absolute cursor-pointer group"
          style={{ left: `${o.x}%`, top: `${o.y}%`, x: '-50%', y: '-50%' }}
          initial={{ scale: 0, rotate: -90, opacity: 0, filter: "blur(4px)" }}
          animate={{ scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: i * 0.3, type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.08, rotate: 2, zIndex: 10, y: '-52%' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOrganeSelectionne(o.id)}
        >
          {/* Conteneur avec effet de profondeur */}
          <div className="relative w-36 h-36 bg-white dark:bg-slate-800 rounded-full shadow-2xl border-4 border-slate-300 dark:border-slate-600 overflow-hidden">
            
            {/* Effet de brillance métallique au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.4 }}
            />
            
            {/* Image ou fallback */}
            {!imageChargee[o.id] ? (
              // Loader pendant le chargement
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                <span className="text-xs text-slate-500">Chargement...</span>
              </div>
            ) : imageChargee[o.id] === 'error' ? (
              // Fallback si erreur de chargement
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-600 dark:to-slate-700">
                <Cog className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-600 dark:text-slate-300 mt-2">Image non disponible</span>
              </div>
            ) : null}

            {/* Image réelle */}
            <div className="absolute inset-0">
              <Image
                src={o.image}
                alt={o.alt}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100px, 144px"
                onLoad={() => handleImageLoad(o.id)}
                onError={() => handleImageError(o.id)}
              />
            </div>
          </div>

          {/* Label avec animation */}
          <motion.p 
            className="text-center mt-4 font-bold text-slate-900 dark:text-white text-sm bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 + 0.5 }}
          >
            {o.nom}
          </motion.p>
        </motion.div>
      ))}

      {/* Zone d'informations détaillées */}
      <AnimatePresence>
        {organeSelectionne && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 rounded-xl p-6 shadow-2xl border-2 border-blue-600 z-20 backdrop-blur-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                  {organes.find(o => o.id === organeSelectionne)?.nom}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {organes.find(o => o.id === organeSelectionne)?.specs}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  {organes.find(o => o.id === organeSelectionne)?.desc}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOrganeSelectionne(null)}
                className="ml-4 text-slate-400 hover:text-slate-600 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <Link 
                href={`/theorie/${organeSelectionne}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <Layers className="w-4 h-4 mr-2" />
                Voir le détail
              </Link>
              <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center">
                <ZoomIn className="w-4 h-4 mr-2" />
                Visualiser en 3D
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions au hover */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1"
      >
        <ZoomIn className="w-3 h-3" />
        Cliquez sur les composants
      </motion.div>
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
            Les 6 organes principaux - Vue technique
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Une montre mécanique simple se compose de <strong className="text-slate-900 dark:text-white">six organes essentiels</strong> qui travaillent ensemble pour mesurer le temps avec précision. Cliquez sur chaque composant pour voir les détails techniques.
          </p>

          {/* Schéma interactif avec vraies images */}
          <SchemaMecanismeAvecImages />
          
          <p className="text-sm text-slate-500 text-center mt-6 flex items-center justify-center gap-2">
            <Info className="w-4 h-4" />
            Les images sont des représentations techniques réelles. Les couleurs et finitions varient selon les calibres.
          </p>
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
