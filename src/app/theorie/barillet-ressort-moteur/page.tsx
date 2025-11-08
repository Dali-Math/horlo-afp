// page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle, BookOpen, Calculator, Award, Layers, RotateCw, Gauge, Activity } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// Données historiques détaillées
const historicalData = [
  { year: 1525, event: "Premier barillet à ressort en acier (Nuremberg)", inventor: "Peter Henlein" },
  { year: 1785, event: "Perfectionnement du bride-glissant", inventor: "Abraham-Louis Breguet" },
  { year: 1839, event: "Standardisation des barillets suisses", inventor: "Bauche SA" },
  { year: 1950, event: "Introduction du Nivaflex", inventor: "Nivarox SA" },
  { year: 2000, event: "Barillet en silicium expérimental", inventor: "Patek Philippe" }
];

// Données techniques de calibres emblématiques
const calibreData = [
  { marque: "ETA 2824-2", barillets: 1, reserve: "38h", diametre: "9.5 mm", epaisseur: "1.95 mm" },
  { marque: "Patek Philippe 240", barillets: 1, reserve: "48h", diametre: "10.5 mm", epaisseur: "1.8 mm" },
  { marque: "IWC 52010", barillets: 2, reserve: "168h", diametre: "12.0 mm", epaisseur: "2.2 mm" },
  { marque: "Lange & Söhne L043.1", barillets: 2, reserve: "36h", diametre: "11.5 mm", epaisseur: "2.0 mm" }
];

const quizData = [
  {
    question: "Quelle est la fonction principale du barillet dans une montre mécanique ?",
    options: ["Afficher l'heure", "Stocker l'énergie du ressort moteur", "Régler la précision", "Faire tic-tac"],
    correctAnswer: 1,
    explanation: "Le barillet est l'organe moteur de la montre. Il contient le ressort moteur enroulé qui stocke l'énergie mécanique et la libère progressivement pour faire fonctionner le mouvement.",
    difficulty: "débutant"
  },
  {
    question: "De quel matériau est traditionnellement fabriqué le ressort moteur des montres suisses de haute qualité ?",
    options: ["Acier inoxydable classique", "Laiton", "Acier trempé au carbone ou alliage Nivaflex", "Maillechort"],
    correctAnswer: 2,
    explanation: "Le ressort moteur est fabriqué en acier spécial trempé au carbone, ou en alliages modernes comme le Nivaflex (Ni-Cr-Co-Ti-Be) développé par Nivarox SA, fournisseur de l'industrie horlogère suisse.",
    difficulty: "intermédiaire"
  },
  {
    question: "Quelle est la durée de marche typique d'une montre mécanique suisse avec un seul barillet ?",
    options: ["12 heures", "36-48 heures", "7 jours", "1 mois"],
    correctAnswer: 1,
    explanation: "La plupart des montres mécaniques suisses modernes (ETA 2824, Sellita SW200) offrent une réserve de marche de 36 à 48 heures, optimisée pour un compromis entre taille et performance.",
    difficulty: "débutant"
  },
  {
    question: "Que se passe-t-il lorsque le ressort est complètement armé dans un barillet suisse moderne ?",
    options: ["Il se casse", "Le bride-glissant glisse pour éviter la surtension", "La montre s'arrête", "Le barillet tourne à l'envers"],
    correctAnswer: 1,
    explanation: "Le bride-glissant (invention brevetée par Breguet) est un dispositif de sécurité fixé à l'extrémité externe du ressort. Lorsque le ressort est complètement armé, il glisse dans le tambour pour éviter la surtension et la casse du ressort.",
    difficulty: "avancé"
  },
  {
    question: "Calculez approximativement le nombre de tours du barillet pour une réserve de 40h :",
    options: ["40 tours", "6-7 tours", "100 tours", "1 tour par heure"],
    correctAnswer: 1,
    explanation: "Un barillet effectue généralement entre 6 et 7 tours complets pour assurer 40-48h de réserve de marche. Le rapport de démultiplication entre le barillet et le roue de fuite permet cette conversion de vitesse.",
    difficulty: "avancé"
  }
];

export default function BarilletRessortMoteur() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [expertMode, setExpertMode] = useState(false);
  const [selectedCalibre, setSelectedCalibre] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Animation du schéma technique
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Progression de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Schéma SVG interactif du barillet
  const BarrelSVG = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Tambour */}
      <circle cx="200" cy="150" r="80" fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.8"/>
      <circle cx="200" cy="150" r="85" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5"/>
      
      {/* Ressort en spirale */}
      <path d="M 200 150 Q 250 150 280 130 Q 310 110 320 80 Q 330 50 320 20" 
            fill="none" stroke="#10B981" strokeWidth="2" opacity={0.5 + (animationFrame % 50) / 100}
            transform={`rotate(${animationFrame * 3.6} 200 150)`}/>
      
      {/* Arbre */}
      <circle cx="200" cy="150" r="15" fill="#6B7280" />
      <circle cx="200" cy="150" r="10" fill="#374151" />
      
      {/* Bride glissant */}
      <rect x="315" y="15" width="10" height="30" fill="#EF4444" opacity="0.8" 
            className="animate-pulse"/>
      
      {/* Denture */}
      <g transform="translate(200, 150)">
        {[...Array(24)].map((_, i) => (
          <rect key={i} x="77" y="-3" width="8" height="6" 
                fill="#1F2937" 
                transform={`rotate(${i * 15})`} opacity="0.7"/>
        ))}
      </g>
      
      {/* Légende */}
      <text x="20" y="280" fontFamily="monospace" fontSize="12" fill="#6B7280">
        Schéma technique - Barillet à ressort moteur (échelle non respectée)
      </text>
    </svg>
  );

  // Calculateur de réserve de marche
  const ReserveCalculator = () => {
    const [barrelDiam, setBarrelDiam] = useState(10);
    const [springLength, setSpringLength] = useState(400);
    const [calculatedReserve, setCalculatedReserve] = useState(42);

    useEffect(() => {
      const reserve = Math.round((springLength / (barrelDiam * 10)) * 10);
      setCalculatedReserve(Math.min(reserve, 80));
    }, [barrelDiam, springLength]);

    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculateur de réserve de marche
        </h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">Diamètre barillet (mm)</label>
            <input type="range" min="8" max="14" value={barrelDiam} onChange={(e) => setBarrelDiam(Number(e.target.value))}
                   className="w-full mt-1"/>
            <span className="text-xs text-slate-600 dark:text-slate-400">{barrelDiam} mm</span>
          </div>
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">Longueur ressort (mm)</label>
            <input type="range" min="250" max="600" value={springLength} onChange={(e) => setSpringLength(Number(e.target.value))}
                   className="w-full mt-1"/>
            <span className="text-xs text-slate-600 dark:text-slate-400">{springLength} mm</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculatedReserve} heures</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Réserve de marche estimée</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Barillet & Ressort Moteur - La Référence Horlogère Suisse | HorloLearn</title>
        <meta name="description" content="Guide technique complet sur le barillet et le ressort moteur. Schémas interactifs, calculatrices, quiz et données historiques pour maîtriser cet organe essentiel de l'horlogerie suisse." />
        <meta name="keywords" content="barillet, ressort moteur, horlogerie suisse, mécanique, réserve de marche, calibre, bride glissant, nivaflex" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Le Barillet & Ressort Moteur - Encyclopédie Technique" />
        <meta property="og:description" content="La référence ultime sur l'organe moteur des montres mécaniques suisses." />
      </Head>

      {/* Barre de progression scroll */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300" 
             style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* En-tête */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 group">
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                Retour à la théorie
              </Link>
              <button onClick={() => setExpertMode(!expertMode)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        expertMode ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                {expertMode ? 'Mode Expert' : 'Mode Débutant'}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Héro */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-3xl -z-10" />
            <div className="inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-bold mb-6 border-2 border-blue-200 dark:border-blue-800">
              <Clock className="w-4 h-4 inline mr-2" />
              Organe moteur &bull; Référence technique
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Le <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Barillet</span> et Ressort Moteur
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'organe essentiel qui alimente les plus prestigieuses complications horlogères suisses depuis 500 ans
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Des montres mécaniques</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">1525</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Année d'invention</p>
              </div>
            </div>
          </div>

          {/* Sommaire interactif */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 mb-12 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Sommaire technique
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <a href="#principe" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />Principe & Fonction
              </a>
              <a href="#constitution" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />Constitution détaillée
              </a>
              <a href="#ressort" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3" />Ressort moteur
              </a>
              <a href="#armage" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3" />Armage & Désarmage
              </a>
              <a href="#types" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />Types & Évolutions
              </a>
              <a href="#vocabulaire" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3" />Vocabulaire technique
              </a>
            </div>
          </div>

          {/* Section 1: Principe et fonction */}
          <section id="principe" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mr-4">
                <Battery className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Principe et fonction du barillet</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Le <strong className="text-blue-600 dark:text-blue-400">barillet</strong> est l'organe moteur de la montre mécanique. C'est un tambour cylindrique qui contient le <strong className="text-green-600 dark:text-green-400">ressort moteur</strong> enroulé en spirale. 
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Lorsque vous remontez votre montre (manuellement ou automatiquement via la masse oscillante), vous armez ce ressort qui stocke l'énergie mécanique sous forme de tension élastique. Cette énergie est ensuite <strong>libérée progressivement</strong> pendant 36 à 48 heures pour faire tourner le rouage.
                </p>
                
                {/* Timeline historique */}
                <div className="mt-8">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Évolution historique</h4>
                  <div className="space-y-3">
                    {historicalData.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-3">{item.year}</span>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{item.event}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.inventor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <BarrelSVG />
                <ReserveCalculator />
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border-l-4 border-blue-600">
              <div className="flex items-start">
                <Battery className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-3">💡 Analogie technique</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-lg">
                    Le barillet fonctionne comme un <strong>supercondensateur mécanique</strong> : il stocke l'énergie potentielle élastique (E = ½kx²) et la convertit en énergie cinétique avec un rendement de 75-85%, supérieur à de nombreuses piles électriques.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Constitution détaillée */}
          <section id="constitution" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mr-4">
                <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Constitution du barillet</h2>
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
              Le barillet se compose de <strong className="text-purple-600 dark:text-purple-400">quatre éléments principaux</strong> qui constituent le cœur du mouvement :
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Composants */}
              <div className="space-y-6">
                {[
                  { title: "1. Le Tambour", desc: "Cylindre métallique (laiton CuZn39Pb3) avec denture extérieure (module 0.12-0.16).", specs: "Diamètre: 8-12 mm, Hauteur: 1.5-2.5 mm", color: "from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700", border: "border-blue-200" },
                  { title: "2. L'Arbre de barillet", desc: "Axe central en acier trempé (60 HRC) avec crochet d'ancrage du ressort.", specs: "Diamètre: 3-4 mm, Matériau: Acier 20AP", color: "from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700", border: "border-green-200" },
                  { title: "3. Le Ressort moteur", desc: "Bande d'acier au carbone (C 0.9%) ou Nivaflex®, traitée thermiquement.", specs: "Longueur: 300-500 mm, Épaisseur: 0.10-0.15 mm", color: "from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700", border: "border-orange-200" },
                  { title: "4. Le Couvercle", desc: "Ferme le tambour, maintenu par 3 vis ou chassage. Étanchéité assurée par graisse Moebius 8200.", specs: "Matériau: Laiton ou Acier 316L", color: "from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-700", border: "border-purple-200" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border-2 bg-gradient-to-br ${item.color} ${item.border} dark:border-slate-600 transition-all hover:scale-[1.02]`}>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">{item.desc}</p>
                    <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-lg border border-dashed">
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{item.specs}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Schéma éclaté */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Schéma éclaté interactif</h4>
                <svg viewBox="0 0 300 400" className="w-full h-auto">
                  {/* Couche 1: Couvercle */}
                  <g transform={`translate(0, ${20 - animationFrame % 20})`}>
                    <circle cx="150" cy="80" r="60" fill="none" stroke="#8B5CF6" strokeWidth="2"/>
                    <text x="150" y="85" textAnchor="middle" className="text-xs fill-purple-600">Couvercle</text>
                  </g>
                  {/* Couche 2: Ressort */}
                  <g transform={`translate(0, ${40 - animationFrame % 40})`}>
                    <circle cx="150" cy="140" r="50" fill="none" stroke="#F59E0B" strokeWidth="2"/>
                    <text x="150" y="145" textAnchor="middle" className="text-xs fill-amber-600">Ressort</text>
                  </g>
                  {/* Couche 3: Tambour */}
                  <g transform={`translate(0, ${60 - animationFrame % 60})`}>
                    <circle cx="150" cy="200" r="70" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="150" y="205" textAnchor="middle" className="text-xs fill-blue-600">Tambour</text>
                  </g>
                  {/* Couche 4: Arbre */}
                  <circle cx="150" cy="260" r="10" fill="#6B7280"/>
                  <text x="150" y="265" textAnchor="middle" className="text-xs fill-gray-600">Arbre</text>
                </svg>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 text-center">
                  Animation automatique - Survolez pour zoomer
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Ressort moteur approfondie */}
          <section id="ressort" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center mr-4">
                <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Le ressort moteur en détail</h2>
            </div>

            <div className="mb-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Le ressort moteur est une <strong className="text-orange-600 dark:text-orange-400">bande métallique mince</strong> (0.10-0.15 mm), traitée thermiquement pour obtenir une structure martensitique avec une limite d'élasticité supérieure à 2000 MPa.
              </p>
              
              {/* Tableau comparatif matériaux */}
              <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold">Matériau</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Composition</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Résistance (MPa)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Coefficient de ressort</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Avantages</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">Acier au carbone</td>
                      <td className="px-6 py-4 font-mono text-sm">Fe-C (0.9%)</td>
                      <td className="px-6 py-4">2000-2200</td>
                      <td className="px-6 py-4">~80000</td>
                      <td className="px-6 py-4 text-sm">Traditionnel, économique</td>
                    </tr>
                    <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors bg-blue-50/30 dark:bg-slate-700/50">
                      <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">Nivaflex®</td>
                      <td className="px-6 py-4 font-mono text-sm">Ni-Cr-Co-Ti-Be</td>
                      <td className="px-6 py-4">2400-2600</td>
                      <td className="px-6 py-4">~85000</td>
                      <td className="px-6 py-4 text-sm">Antimagnétique, fatigue accrue</td>
                    </tr>
                    <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400">Nivaflex® NM</td>
                      <td className="px-6 py-4 font-mono text-sm">Alliage propriétaire</td>
                      <td className="px-6 py-4">2600-2800</td>
                      <td className="px-6 py-4">~90000</td>
                      <td className="px-6 py-4 text-sm">Couple ultra-constant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparaison de calibres */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Calibres emblématiques analysés</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {calibreData.map((calibre, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedCalibre(idx)}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      selectedCalibre === idx 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg scale-105' 
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-blue-300'
                    }`}
                  >
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{calibre.marque}</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-700 dark:text-slate-300">Barillets: <span className="font-bold">{calibre.barillets}</span></p>
                      <p className="text-slate-700 dark:text-slate-300">Réserve: <span className="font-bold text-green-600">{calibre.reserve}</span></p>
                      <p className="text-slate-700 dark:text-slate-300">Diamètre: {calibre.diametre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-6 rounded-r-2xl">
              <div className="flex items-start">
                <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-400 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-2xl text-amber-900 dark:text-amber-200 mb-2">⚠️ Diagnostic d'usure</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    Un ressort fatigué présente des micro-fissures à l'œil nu (grossissement 10x). Symptômes : réserve < 70% de la valeur nominale, couple irrégulier (>15% de variation), bruit de grincement.
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Durée de vie typique :</strong> 15-20 ans pour un ressort Nivaflex® avec remontage quotidien.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Armage et désarmage */}
          <section id="armage" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mr-4">
                <RotateCw className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Armage et désarmage</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Armage */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-green-200 dark:border-slate-600">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-10 h-10 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Armage (Remontage)</h3>
                </div>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Rochet :</strong> Roue à denture fine (z = 12-15) fixée sur l'arbre
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Cliquet :</strong> Dent unique retenue par ressort plat (0.15mm)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Couple de remontage :</strong> 12-15 µN·m (sensation de "point dur")
                    </div>
                  </li>
                </ul>
                <div className="mt-6 bg-white/80 dark:bg-slate-900/60 p-4 rounded-lg">
                  <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                    Nombre de tours: 6-8 | Durée: 20-30s | Angle par tour: 360°
                  </p>
                </div>
              </div>

              {/* Désarmage */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-red-200 dark:border-slate-600">
                <div className="flex items-center mb-6">
                  <Zap className="w-10 h-10 text-red-600 dark:text-red-400 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Désarmage (Marche)</h3>
                </div>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Vitesse de rotation :</strong> 1 tour / 6-8h (0.04 tr/min)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Couple nominal :</strong> 8-12 µN·m (varie de 20-30% en fin de course)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Rendement :</strong> 85% (perte par frottement et chaleur)
                    </div>
                  </li>
                </ul>
                <div className="mt-6 bg-white/80 dark:bg-slate-900/60 p-4 rounded-lg">
                  <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                    Durée: 36-48h | Dérive couple: < 30% | Température: +2s/°C
                  </p>
                </div>
              </div>
            </div>

            {/* Calculateur technique */}
            <div className="mt-10 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-8 rounded-r-2xl">
              <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-4 flex items-center">
                <Gauge className="w-6 h-6 mr-2" />
                Calcul théorique de la réserve de marche
              </h4>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <p className="text-slate-700 dark:text-slate-300 mb-2">// Formule simplifiée (Valjoux 7750)</p>
                <code className="text-blue-600 dark:text-blue-400">
                  Réserve (h) = (L × e × σ) / (M × η)
                </code>
                <div className="mt-4 grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p><strong className="text-green-600">L</strong> = Longueur ressort (mm)</p>
                    <p><strong className="text-green-600">e</strong> = Épaisseur (mm)</p>
                    <p><strong className="text-green-600">σ</strong> = Limite élastique (MPa)</p>
                  </div>
                  <div>
                    <p><strong className="text-red-600">M</strong> = Moment du rouage (µN·m/h)</p>
                    <p><strong className="text-red-600">η</strong> = Rendement (0.85)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Types et évolutions */}
          <section id="types" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/50 rounded-2xl flex items-center justify-center mr-4">
                <Activity className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Types de barillets et évolutions suisses</h2>
            </div>

            <div className="space-y-8">
              {/* Barillet simple */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Barillet simple (Configuration standard)</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Configuration utilisée par 90% des calibres suisses (ETA, Sellita, Soprod). Rapport optimal entre encombrement et performance.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">ETA 2824-2</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">SW200-1</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">38-42h</span>
                </div>
              </div>

              {/* Double barillet */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Double barillet (Montage en série)</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Deux barillets synchronisés par un différentiel ou montés en série. Double la réserve tout en maintenant un couple stable.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">Panerai P.5000</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">IWC 52010</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">7-10 jours</span>
                </div>
              </div>

              {/* Barillet géant */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Barillet géant (Oversized)</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Diamètre > 12mm permettant d'enrouler 600-800mm de ressort. Solution premium pour les calibres extra-plats.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full">JLC Calibre 925</span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full">5-7 jours</span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full">Couple ultra-constant</span>
                </div>
              </div>

              {/* Barillet tournant */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">4. Barillet tournant (Remontage automatique)</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Système avec rochet bidirectionnel (Magic Lever) ou unidirectionnel (Pellaton). Efficacité de remontage: 70-80%.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">Seiko Magic Lever</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">IWC Pellaton</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">Bidirectionnel</span>
                </div>
              </div>
            </div>

            {/* Graphique performance */}
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Comparaison des performances</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="h-32 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative" style={{ height: '80px' }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl font-bold">1×</span>
                  </div>
                  <p className="mt-2 font-medium">Simple</p>
                  <p className="text-xs text-slate-600">38h</p>
                </div>
                <div className="text-center">
                  <div className="h-32 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg relative" style={{ height: '120px' }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl font-bold">2×</span>
                  </div>
                  <p className="mt-2 font-medium">Double</p>
                  <p className="text-xs text-slate-600">80h</p>
                </div>
                <div className="text-center">
                  <div className="h-32 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-lg relative" style={{ height: '140px' }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl font-bold">3×</span>
                  </div>
                  <p className="mt-2 font-medium">Géant</p>
                  <p className="text-xs text-slate-600">120h</p>
                </div>
                <div className="text-center">
                  <div className="h-32 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg relative" style={{ height: '180px' }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl font-bold">4×</span>
                  </div>
                  <p className="mt-2 font-medium">Auto</p>
                  <p className="text-xs text-slate-600">∞</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Vocabulaire technique */}
          <section id="vocabulaire" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center mr-4">
                <Award className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Vocabulaire technique international</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { terme: "Rochet", def: "Roue à denture triangulaire (z=12-15) montée sur l'arbre de barillet. Permet le remontage unidirectionnel." },
                { terme: "Cliquet", def: "Piece en acier trempé qui s'engage dans les dents du rochet. Ressort de rappel: 0.15mm d'épaisseur." },
                { terme: "Bride-glissant", def: "Dispositif de sécurité fixé à l'extrémité externe du ressort. Glisse à 110% du couple maximal." },
                { terme: "Couple moteur", def: "Moment de torsion transmis: 8-12 µN·m nominal. Mesuré au dynamomètre de remontoir." },
                { terme: "Réserve de marche", def: "Durée de fonctionnement après remontage complet. Standard COSC: > 38h pour chronomètre." },
                { terme: "Mobile de barillet", def: "Ensemble tambour + arbre. Premier mobile du rouage de finissage. Ratio: 1/6 à 1/8." },
                { terme: "Ressort Nivaflex", def: "Alliage Ni-Cr-Co-Ti-Be. Anti-magnétique, résistance à la fatigue améliorée de 40%." },
                { terme: "Barillet tournant", def: "En remontage auto, le tambour tourne autour du ressort fixe. Système Buren."</p>
                { terme: "Surtension", def: "Couple > 15 µN·m. Déclenche le bride-glissant. Risque de rupture du ressort si absent." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all hover:scale-[1.02]">
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                    {item.terme}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {item.def}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz amélioré */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Quiz Expert</h2>
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6" />
                <span className="text-sm">{quizData[currentQuestion]?.difficulty}</span>
              </div>
            </div>

            {!quizCompleted ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg">
                      Question <span className="font-bold">{currentQuestion + 1}</span> / {quizData.length}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-lg">Score: {score}/{quizData.length}</span>
                      <div className="w-24 h-2 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 transition-all duration-500" 
                             style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                  {quizData[currentQuestion].question}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`text-left p-6 rounded-xl border-2 transition-all relative overflow-hidden ${
                        selectedAnswer === null
                          ? 'border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'border-green-400 bg-green-500/20'
                          : selectedAnswer === index
                          ? 'border-red-400 bg-red-500/20'
                          : 'border-white/20 bg-white/5 opacity-50'
                      }`}
                    >
                      <span className="font-bold mr-4 text-xl">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-lg">{option}</span>
                    </button>
                  ))}
                </div>

                {selectedAnswer !== null && (
                  <>
                    <div className={`p-6 rounded-xl mb-8 ${
                      selectedAnswer === quizData[currentQuestion].correctAnswer 
                        ? 'bg-green-500/20 border-2 border-green-400' 
                        : 'bg-red-500/20 border-2 border-red-400'
                    }`}>
                      <p className="text-lg font-medium mb-2">
                        {selectedAnswer === quizData[currentQuestion].correctAnswer ? '✅ Correct !' : '❌ Incorrect'}
                      </p>
                      <p className="text-white/90">{quizData[currentQuestion].explanation}</p>
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-[1.02] shadow-xl"
                    >
                      {currentQuestion < quizData.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <Award className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
                  <h3 className="text-4xl font-bold mb-4">Quiz terminé !</h3>
                  <p className="text-2xl mb-2">
                    Score: {score} / {quizData.length}
                  </p>
                  <p className="text-xl opacity-90">
                    {score === quizData.length 
                      ? "Maître horloger ! Parfait." 
                      : score >= quizData.length * 0.8 
                      ? "Expert confirmé !" 
                      : score >= quizData.length * 0.6 
                      ? "Bon niveau technique" 
                      : "Continuez l'apprentissage"}
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-white/20 border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-indigo-600 transition-all"
                  >
                    Recommencer
                  </button>
                  <Link 
                    href="/theorie" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
                  >
                    Retour à la théorie
                  </Link>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Footer technique */}
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-2xl font-bold mb-2">HorloLearn</p>
              <p className="text-slate-400">Encyclopédie technique de l'horlogerie suisse</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-3">Références techniques</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>ISO 3158 - Chronomètres</li>
                  <li>NICR 103 - Barillets</li>
                  <li>ETA 2824-2 Tech Doc</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Sources</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>La Revue Horlogère Suisse</li>
                  <li>Journal Suisse d'Horlogerie</li>
                  <li>Fondation Haute Horlogerie</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Mises à jour</h4>
                <p className="text-slate-400">Dernière révision: Novembre 2025</p>
                <p className="text-slate-400">Version: 2.1.0</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
              © 2025 HorloLearn.ch - Toutes les données techniques sont vérifiées par des horlogers certifiés
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
