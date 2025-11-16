'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch, 
  RotateCw, Trophy, BookOpen, Zap, TrendingUp, Award,
  Play, Pause, SkipForward, CheckCircle, XCircle, Lightbulb,
  Star, GraduationCap, Target, ArrowRight, Battery, Wind,
  Maximize2, Minimize2, Info, Download
} from 'lucide-react';

// ============================================
// TYPES ET INTERFACES
// ============================================
interface Organe {
  id: string;
  nom: string;
  desc: string;
  detailsTechniques: string[];
  x: number;
  y: number;
  couleur: string;
  icon: string;
}

// ============================================
// COMPOSANT : Navigation par Onglets
// ============================================
const NavigationTabs = ({ activeTab, setActiveTab, progression }) => {
  const tabs = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'organes', label: 'Organes essentiels', icon: Cog },
    { id: 'animation', label: 'Animation 3D', icon: Watch },
    { id: 'echappement', label: "Cycle d'échappement", icon: RotateCw },
    { id: 'schema', label: 'Schéma mécanique', icon: Settings },
    { id: 'comparaison', label: 'Comparaison', icon: Trophy },
    { id: 'statistiques', label: 'Statistiques', icon: TrendingUp },
    { id: 'quiz', label: 'Quiz', icon: GraduationCap }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isCompleted = progression[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all relative ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {isCompleted && (
              <CheckCircle className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
            )}
          </button>
        );
      })}
    </div>
  );
};

// ============================================
// COMPOSANT : Quiz Interactif
// ============================================
const QuizInteractif = () => {
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [reponses, setReponses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const questions = [
    {
      question: "Combien de battements par heure une montre mécanique standard effectue-t-elle?",
      options: ["14'400", "21'600", "28'800", "36'000"],
      correct: 2
    },
    {
      question: "Quel composant régule la libération d'énergie dans une montre mécanique?",
      options: ["Le barillet", "L'échappement", "Le balancier", "Le rouage"],
      correct: 1
    },
    {
      question: "Quelle est la fonction principale du spiral dans une montre mécanique?",
      options: [
        "Transmettre l'énergie aux aiguilles",
        "Assurer l'oscillation régulière du balancier",
        "Permettre le remontage automatique",
        "Protéger le mouvement des chocs"
      ],
      correct: 1
    },
    {
      question: "Quel est le rôle des rubis synthétiques dans une montre mécanique?",
      options: [
        "Augmenter la valeur de la montre",
        "Réduire la friction aux points de pivot",
        "Améliorer l'étanchéité",
        "Donner de la couleur au mouvement"
      ],
      correct: 1
    },
    {
      question: "Que signifie '28'800 A/h' sur une montre mécanique?",
      options: [
        "28'800 tours par heure du barillet",
        "28'800 alternances par heure du balancier",
        "28'800 vibrations du quartz par heure",
        "28'800 rotations des aiguilles par heure"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (index) => {
    const newReponses = [...reponses];
    newReponses[questionActuelle] = index;
    setReponses(newReponses);
    
    if (questionActuelle < questions.length - 1) {
      setQuestionActuelle(questionActuelle + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return reponses.reduce((score, answer, index) => {
      return answer === questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setQuestionActuelle(0);
    setReponses([]);
    setShowResults(false);
  };
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 border-2 border-indigo-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <GraduationCap className="w-8 h-8 text-indigo-400" />
        Testez vos connaissances
      </h2>

      {!showResults ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-indigo-300 font-medium">
              Question {questionActuelle + 1} sur {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === questionActuelle 
                      ? 'bg-indigo-400 scale-125' 
                      : index < questionActuelle 
                        ? 'bg-green-500' 
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {questions[questionActuelle].question}
            </h3>
            
            <div className="space-y-3">
              {questions[questionActuelle].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white transition-all border border-slate-600 hover:border-indigo-500 hover:translate-x-2"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 rounded-xl p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Résultat : {calculateScore()}/{questions.length}
            </h3>
            <p className="text-slate-300 mb-6">
              {calculateScore() === questions.length 
                ? "🏆 Excellent! Vous maîtrisez parfaitement le sujet." 
                : calculateScore() >= questions.length * 0.8 
                  ? "🌟 Très bien! Vous avez une excellente compréhension des montres mécaniques." 
                  : calculateScore() >= questions.length * 0.6 
                    ? "👍 Bon travail! Vous avez une bonne compréhension des montres mécaniques." 
                    : "📚 Continuez d'apprendre! Les montres mécaniques sont un sujet fascinant."}
            </p>
          </motion>
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all"
            >
              Recommencer le quiz
            </button>
            
            <div className="text-sm text-slate-400">
              Révision des réponses :
              {questions.map((q, idx) => (
                <div key={idx} className="mt-2">
                  Question {idx + 1}: 
                  <span className={reponses[idx] === q.correct ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                    {reponses[idx] === q.correct ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL : Introduction Montre Mécanique
// ============================================
const IntroductionMontre = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 border-2 border-blue-500 shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Watch className="w-12 h-12 text-blue-400" />
        <div>
          <h2 className="text-3xl font-bold text-white">La Montre Mécanique</h2>
          <p className="text-blue-300">Un chef-d'œuvre d'ingénierie sans électronique</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-slate-200 text-lg leading-relaxed mb-4">
          Dans un monde d'appareils électroniques modernes, il peut être difficile de croire qu'il y a quelques décennies, 
          le moyen le plus pratique de suivre le temps était une <strong className="text-blue-400">montre mécanique</strong>.
        </p>
        
        <p className="text-slate-200 text-lg leading-relaxed mb-6">
          Contrairement à leurs homologues à quartz et intelligentes, les montres mécaniques peuvent fonctionner 
          <strong className="text-green-400"> sans utiliser de batteries ni de composants électroniques</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Cog className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold text-white">Purement Mécanique</h3>
            </div>
            <p className="text-sm text-slate-300">Uniquement des ressorts, engrenages et leviers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-green-400" />
              <h3 className="font-bold text-white">Précision</h3>
            </div>
            <p className="text-sm text-slate-300">28'800 alternances par heure pour mesurer le temps</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              <h3 className="font-bold text-white">Chef-d'œuvre</h3>
            </div>
            <p className="text-sm text-slate-300">Jusqu'à 300 pièces dans un mouvement complexe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Les 6 Organes Principaux
// ============================================
const SixOrganesEssentiels = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="w-8 h-8 text-blue-400" />
        Les 6 Organes Essentiels du Mouvement
      </h2>

      <p className="text-slate-300 mb-8 text-lg">
        Bien que le mouvement complet d'une montre ait de nombreuses pièces, le système de chronométrage 
        qui forme la fonction principale ne consiste qu'en <strong className="text-blue-400">sept éléments majeurs</strong> 
        que nous pouvons disposer en ligne droite :
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. BARILLET */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-2 border-blue-500 hover:border-blue-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">⚡</div>
            <h3 className="text-xl font-bold text-blue-300">1. Barillet</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            Stocke l'énergie du <strong>ressort moteur (mainspring)</strong>. 
            Le ressort se détend progressivement pour alimenter toute la montre pendant 36-48h.
          </p>
          <div className="bg-blue-950/50 rounded p-2 text-xs text-blue-200">
            <strong>Détail :</strong> Le ressort a une forme en S pour équilibrer la tension dans toutes ses sections.
          </div>
        </motion.div>

        {/* 2. ROUAGE */}
        <motion.div 
          className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500 hover:border-green-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">⚙️</div>
            <h3 className="text-xl font-bold text-green-300">2. Rouage</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            Ensemble de <strong>roues dentées</strong> qui transmettent et démultiplient l'énergie. 
            Transforme ~7 rotations du barillet en ~2400 rotations de l'aiguille des secondes.
          </p>
          <div className="bg-green-950/50 rounded p-2 text-xs text-green-200">
            <strong>Ratio nécessaire :</strong> 343:1 obtenu par 4 étages de réduction.
          </div>
        </motion.div>

        {/* 3. ÉCHAPPEMENT */}
        <motion.div 
          className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border-2 border-purple-500 hover:border-purple-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">💓</div>
            <h3 className="text-xl font-bold text-purple-300">3. Échappement</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            <strong>L'ancre et la roue d'échappement</strong> transforment l'énergie continue en impulsions régulières. 
            C'est le "tic-tac" qui régule la libération d'énergie.
          </p>
          <div className="bg-purple-950/50 rounded p-2 text-xs text-purple-200">
            <strong>Palettes en rubis :</strong> Faible friction et très durable.
          </div>
        </motion.div>

        {/* 4. BALANCIER-SPIRAL */}
        <motion.div 
          className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border-2 border-amber-500 hover:border-amber-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🎯</div>
            <h3 className="text-xl font-bold text-amber-300">4. Balancier-Spiral</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            Oscille à <strong>fréquence constante</strong> (8 fois/seconde = 4 Hz pour 28'800 A/h). 
            C'est le cœur réglant qui assure la précision temporelle.
          </p>
          <div className="bg-amber-950/50 rounded p-2 text-xs text-amber-200">
            <strong>Spiral en Nivarox :</strong> Alliage insensible aux variations de température.
          </div>
        </motion.div>

        {/* 5. REMONTOIR */}
        <motion.div 
          className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-6 border-2 border-red-500 hover:border-red-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🔄</div>
            <h3 className="text-xl font-bold text-red-300">5. Remontoir</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            Mécanisme permettant de remonter le ressort via la <strong>couronne</strong> (manuel) 
            ou la <strong>masse oscillante</strong> (automatique).
          </p>
          <div className="bg-red-950/50 rounded p-2 text-xs text-red-200">
            <strong>Sécurité :</strong> Le cliquet empêche le ressort de se dérouler.
          </div>
        </motion.div>

        {/* 6. AFFICHAGE */}
        <motion.div 
          className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl p-6 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🕐</div>
            <h3 className="text-xl font-bold text-cyan-300">6. Affichage</h3>
          </div>
          <p className="text-slate-200 text-sm mb-3">
            Les <strong>aiguilles, cadran</strong> et système de transmission qui permettent de lire l'heure visuellement. 
            Interface entre le mouvement et l'utilisateur.
          </p>
          <div className="bg-cyan-950/50 rounded p-2 text-xs text-cyan-200">
            <strong>Motion works :</strong> Engrenages additionnels pour les heures et minutes.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Animation Montre 3D Améliorée
// ============================================
const AnimationMontreComplete = () => {
  const [vitesse, setVitesse] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [vue, setVue] = useState<'face' | 'profil' | 'dos' | 'mouvement'>('face');
  const [afficherLabels, setAfficherLabels] = useState(true);
  const [modeCouleur, setModeCouleur] = useState<'normal' | 'technique' | 'luxe'>('normal');
  const [predefini, setPredefini] = useState<'normal' | 'rapide' | 'lent'>('normal');

  useEffect(() => {
    switch(predefini) {
      case 'rapide':
        setVitesse(5);
        break;
      case 'lent':
        setVitesse(0.25);
        break;
      default:
        setVitesse(1);
    }
  }, [predefini]);

  const getModeCouleurClass = () => {
    switch(modeCouleur) {
      case 'technique':
        return 'from-slate-600 to-slate-700 border-slate-500';
      case 'luxe':
        return 'from-amber-900 to-amber-800 border-amber-600';
      default:
        return 'from-slate-600 via-slate-700 to-slate-800 border-slate-800';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 border-2 border-blue-700 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Watch className="w-7 h-7" />
          Montre Mécanique en Action
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg font-bold transition-all bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={() => setAfficherLabels(!afficherLabels)}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              afficherLabels 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Eye className="w-5 h-5" />
            Labels
          </button>
        </div>
      </div>

      {/* Contrôles avancés */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Contrôles de vitesse avec presets */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Vitesse</label>
            <div className="flex gap-2 mb-2">
              {['lent', 'normal', 'rapide'].map(p => (
                <button
                  key={p}
                  onClick={() => setPredefini(p)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    predefini === p 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {p === 'lent' ? '0.25x' : p === 'normal' ? '1x' : '5x'}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={vitesse}
              onChange={(e) => setVitesse(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-slate-400 text-sm mt-1">{vitesse.toFixed(1)}x</div>
          </div>

          {/* Sélecteur de vue amélioré */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Vue</label>
            <div className="grid grid-cols-2 gap-2">
              {(['face', 'profil', 'dos', 'mouvement'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVue(v)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all capitalize ${
                    vue === v 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Mode couleur */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Mode couleur</label>
            <div className="grid grid-cols-1 gap-2">
              {(['normal', 'technique', 'luxe'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setModeCouleur(c)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all capitalize ${
                    modeCouleur === c 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Informations techniques */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Informations</label>
            <div className="bg-slate-900/50 rounded p-2 text-xs text-slate-400">
              <div>Fréquence: 4 Hz</div>
              <div>Réserve: 40h</div>
              <div>Jewels: 25</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone d'animation */}
      <div className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden">
        {vue === 'face' && (
          <div className="relative">
            {/* Boîtier externe 3D */}
            <div className={`absolute -inset-10 bg-gradient-to-br ${getModeCouleurClass()} rounded-full shadow-2xl`}>
              <div className="absolute inset-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
            </div>

            {/* Cadran principal avec texture guilloché */}
            <div className={`relative w-80 h-80 ${modeCouleur === 'luxe' ? 'bg-gradient-to-br from-amber-50 to-amber-100' : 'bg-gradient-to-br from-white to-slate-100'} rounded-full border-8 ${modeCouleur === 'luxe' ? 'border-amber-800' : 'border-slate-800'} shadow-2xl overflow-hidden`}>
              {/* Texture guilloché */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, #000 2px, #000 4px)'
                }}></div>
              </div>

              {/* Marqueurs d'heures améliorés */}
              {[...Array(12)].map((_, i) => {
                const isMainHour = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-0 origin-bottom"
                    style={{
                      height: '50%',
                      transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    }}
                  >
                    <div 
                      className={`mx-auto ${isMainHour ? 'w-1.5 h-9 bg-slate-900' : 'w-1 h-6 bg-slate-700'} rounded-full`}
                      style={{ marginTop: '10px' }}
                    />
                    {isMainHour && afficherLabels && (
                      <div 
                        className="text-center font-bold text-slate-900 mt-2"
                        style={{
                          transform: `rotate(-${i * 30}deg)`,
                          fontSize: '20px'
                        }}
                      >
                        {i === 0 ? 12 : i}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Logo/marque (à 12h) */}
              {afficherLabels && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                  <div className="text-sm font-bold text-slate-700 tracking-widest">AUTOMATIC</div>
                  <div className="text-xs text-slate-500 tracking-wider">SWISS MADE</div>
                  <div className="text-xs text-blue-600 mt-1">28'800 A/h</div>
                </div>
              )}

              {/* Sous-cadran secondes (à 6h) */}
              <div className="absolute left-1/2 bottom-16 -translate-x-1/2 w-20 h-20 border-2 border-slate-300 rounded-full bg-white/50 shadow-inner">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-3 bg-slate-400 left-1/2 top-0 -translate-x-1/2"
                    style={{
                      transform: `translateX(-50%) rotate(${i * 90}deg)`,
                      transformOrigin: 'center 40px'
                    }}
                  />
                ))}
                {/* Aiguille sous-cadran */}
                <motion.div
                  className="absolute w-0.5 h-7 bg-blue-600 rounded-full origin-bottom left-1/2 top-1/2 -translate-x-1/2"
                  animate={isRunning ? { rotate: 360 } : {}}
                  transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>

              {/* Indicateur de réserve de marche */}
              {afficherLabels && (
                <div className="absolute top-28 right-8 text-center">
                  <div className="text-xs text-slate-600 mb-1">POWER</div>
                  <div className="w-12 h-2 bg-slate-300 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 to-green-500"
                      initial={{ width: '80%' }}
                      animate={isRunning ? { width: ['80%', '20%'] } : {}}
                      transition={{ duration: 40, ease: 'linear' }}
                    />
                  </div>
                </div>
              )}

              {/* Aiguille des heures avec luminova */}
              <motion.div
                className="absolute w-2.5 bg-gradient-to-t from-slate-900 to-slate-700 rounded-full origin-bottom left-1/2 top-1/2 shadow-xl z-20"
                style={{ 
                  height: '90px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 43200 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-14 bg-green-300 rounded-full opacity-70"></div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-600"></div>
              </motion.div>

              {/* Aiguille des minutes avec luminova */}
              <motion.div
                className="absolute w-2 bg-gradient-to-t from-slate-900 to-slate-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-xl z-30"
                style={{ 
                  height: '120px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 3600 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-green-300 rounded-full opacity-70"></div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full border-2 border-slate-600"></div>
              </motion.div>

              {/* Aiguille des secondes avec contrepoids */}
              <motion.div
                className="absolute w-0.5 bg-red-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg z-40"
                style={{ 
                  height: '130px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                {/* Pointe de l'aiguille */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                {/* Contrepoids */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-red-600 rounded-full"></div>
              </motion.div>

              {/* Axe central 3D */}
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
                <div className="absolute inset-0.5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full"></div>
                <div className="absolute inset-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Verre saphir (reflet) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
            </div>

            {/* Couronne de remontoir */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-2">
              <div className="w-10 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-r-xl shadow-lg border-l-2 border-slate-800">
                <div className="w-full h-full flex flex-col justify-around p-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full h-0.5 bg-slate-800 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        )}

        {vue === 'profil' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Info className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <p className="text-xl">Vue de profil - Visualisation du boîtier</p>
              <p className="text-sm text-slate-400 mt-2">Épaisseur typique : 10-15mm</p>
            </div>
          </div>
        )}

        {vue === 'dos' && (
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-8 border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Fond de boîte transparent */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              
              {/* Rotor automatique visible */}
              <motion.div
                className="relative w-72 h-72"
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 4 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                {/* Demi-lune du rotor */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700" style={{
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                  }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700" style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
                  }}></div>
                </div>
                
                {/* Centre du rotor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-4 border-amber-600"></div>
                
                {/* Inscription sur le rotor */}
                {afficherLabels && (
                  <div className="absolute left-1/2 top-1/3 -translate-x-1/2 text-center">
                    <div className="text-amber-200 text-xs font-bold">AUTOMATIC</div>
                  </div>
                )}
              </motion.div>

              {/* Vis de fixation */}
              {[0, 90, 180, 270].map((angle, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full border-2 border-slate-500"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-160px)`
                  }}
                >
                  <div className="absolute inset-1 bg-slate-900 rounded-full"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-slate-700"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vue === 'mouvement' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Cog className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <p className="text-xl">Vue du mouvement complet</p>
              <p className="text-sm text-slate-400 mt-2">Visualisation des 300+ composants</p>
            </div>
          </div>
        )}

        {/* Balancier animé sur le côté pour la vue de face */}
        {vue === 'face' && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Support du balancier */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-r from-amber-800 to-amber-700 rounded shadow-md border border-amber-600"></div>
              
              {/* Balancier avec roue */}
              <motion.div
                className="relative w-28 h-28"
                animate={isRunning ? { 
                  rotate: [-35, 35, -35]
                } : {}}
                transition={{ 
                  duration: 0.25 / vitesse, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: 'left center' }}
              >
                {/* Bras du balancier */}
                <div className="absolute left-0 top-1/2 w-24 h-1.5 bg-gradient-to-r from-amber-700 to-amber-600 rounded-full -translate-y-1/2 shadow-md"></div>
                
                {/* Roue du balancier */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-xl border-2 border-amber-400">
                  {/* Rayons */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-full bg-amber-700 left-1/2 top-0 -translate-x-1/2 origin-center"
                      style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                    />
                  ))}
                  
                  {/* Masses de réglage (4 vis dorées) */}
                  {[0, 90, 180, 270].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-3 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-sm"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-22px)`
                      }}
                    />
                  ))}
                  
                  {/* Centre doré */}
                  <div className="absolute inset-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-inner"></div>
                </div>

                {/* Spiral animé en SVG */}
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 -translate-x-full" viewBox="0 0 100 100">
                  <motion.path
                    d="M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    animate={isRunning ? {
                      d: [
                        "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40",
                        "M 50 50 Q 50 25, 65 25 T 75 40 T 75 50 T 65 65 T 50 65 T 35 50 T 35 35",
                        "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                      ]
                    } : {}}
                    transition={{
                      duration: 0.25 / vitesse,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </motion.div>
              
              {afficherLabels && (
                <p className="text-white text-xs mt-4 text-center font-bold bg-black/30 backdrop-blur-sm rounded px-2 py-1">
                  Balancier-Spiral<br/>
                  <span className="text-amber-400">4 Hz (8 battements/sec)</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Statistiques techniques */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 hover:bg-white/20 transition-all">
          <p className="text-blue-300 text-sm mb-1">Fréquence</p>
          <p className="text-white text-2xl font-bold">4 Hz</p>
          <p className="text-xs text-blue-200 mt-1">Oscillations complètes/sec</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 hover:bg-white/20 transition-all">
          <p className="text-green-300 text-sm mb-1">Alternances/h</p>
          <p className="text-white text-2xl font-bold">28'800</p>
          <p className="text-xs text-green-200 mt-1">Battements par heure</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30 hover:bg-white/20 transition-all">
          <p className="text-amber-300 text-sm mb-1">Réserve</p>
          <p className="text-white text-2xl font-bold">40h</p>
          <p className="text-xs text-amber-200 mt-1">Autonomie complète</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 hover:bg-white/20 transition-all">
          <p className="text-purple-300 text-sm mb-1">Battements/sec</p>
          <p className="text-white text-2xl font-bold">8</p>
          <p className="text-xs text-purple-200 mt-1">Tic-tac audible</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Cycle de l'Échappement Détaillé
// ============================================
const CycleEchappementDetaille = () => {
  const [etapeActive, setEtapeActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const etapes = [
    {
      num: 1,
      titre: "Le balancier oscille vers l'arrière",
      desc: "Le balancier-spiral termine son mouvement dans une direction et commence à revenir.",
      couleur: "from-blue-500 to-blue-600"
    },
    {
      num: 2,
      titre: "Le jewel roller frappe l'ancre",
      desc: "Le petit rubis (jewel roller) sur le balancier vient frapper la palette de l'ancre (pallet fork), la délogeant de sa position.",
      couleur: "from-purple-500 to-purple-600"
    },
    {
      num: 3,
      titre: "La roue d'échappement se déverrouille",
      desc: "L'ancre libère la roue d'échappement qui commence à tourner, poussée par l'énergie du ressort moteur.",
      couleur: "from-green-500 to-green-600"
    },
    {
      num: 4,
      titre: "La roue pousse le jewel de l'ancre",
      desc: "En tournant, une dent de la roue d'échappement pousse sur le rubis (jewel) situé à l'extrémité de l'ancre.",
      couleur: "from-amber-500 to-amber-600"
    },
    {
      num: 5,
      titre: "L'ancre pousse le jewel roller",
      desc: "L'ancre, poussée par la roue, transmet cette énergie au jewel roller, donnant une impulsion au balancier. C'est l'équivalent de pousser quelqu'un sur une balançoire.",
      couleur: "from-red-500 to-red-600"
    },
    {
      num: 6,
      titre: "La roue se verrouille à nouveau",
      desc: "Une fois le balancier relancé, l'autre palette de l'ancre vient bloquer la roue d'échappement jusqu'au prochain cycle.",
      couleur: "from-cyan-500 to-cyan-600"
    },
    {
      num: 7,
      titre: "Le balancier continue son oscillation",
      desc: "Rechargé en énergie, le balancier poursuit son mouvement et reviendra dans l'autre sens pour répéter le cycle.",
      couleur: "from-pink-500 to-pink-600"
    }
  ];

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setEtapeActive((prev) => (prev + 1) % etapes.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, etapes.length]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 border-2 border-purple-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
          <Cog className="w-8 h-8 text-purple-400" />
          Cycle de l'Échappement - 7 Étapes
        </h3>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            autoPlay ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {autoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {autoPlay ? 'Arrêter' : 'Auto'}
        </button>
      </div>

      <p className="text-slate-300 mb-6 text-lg">
        L'échappement est le cœur battant de la montre. Il transforme l'énergie continue du ressort 
        en impulsions régulières qui entretiennent l'oscillation du balancier.
      </p>

      {/* Visualisation SVG de l'échappement */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <svg className="w-full h-64" viewBox="0 0 800 300">
          <defs>
            <radialGradient id="escape-wheel-grad">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <radialGradient id="balance-grad">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>

          {/* Roue d'échappement */}
          <g transform="translate(250, 150)">
            <circle cx="0" cy="0" r="60" fill="url(#escape-wheel-grad)" stroke="#d97706" strokeWidth="3" />
            
            {/* Dents de la roue d'échappement */}
            {[...Array(15)].map((_, i) => (
              <motion.path
                key={i}
                d="M 0 -60 L 10 -65 L 10 -60 Z"
                fill="#92400e"
                initial={{ opacity: 0.5 }}
                animate={etapeActive === 3 || etapeActive === 4 ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 0.5, repeat: etapeActive === 3 || etapeActive === 4 ? Infinity : 0 }}
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(${i * 24}deg)`
                }}
              />
            ))}
            
            <circle cx="0" cy="0" r="15" fill="#1e293b" />
          </g>

          {/* Ancre (Pallet Fork) */}
          <motion.g
            transform="translate(400, 150)"
            animate={
              etapeActive === 2 || etapeActive === 5 
                ? { rotate: [-10, 10, -10] } 
                : {}
            }
            transition={{ duration: 1, repeat: (etapeActive === 2 || etapeActive === 5) ? Infinity : 0 }}
          >
            {/* Corps de l'ancre */}
            <rect x="-5" y="-80" width="10" height="160" fill="url(#steel-gradient)" rx="3" />
            
            {/* Palettes en rubis */}
            <ellipse cx="-40" cy="-70" rx="15" ry="8" fill="#ec4899" opacity="0.7" />
            <ellipse cx="40" cy="70" rx="15" ry="8" fill="#ec4899" opacity="0.7" />
            
            {/* Fourchette */}
            <path d="M -30 80 L -30 90 L 30 90 L 30 80 Z" fill="url(#steel-gradient)" />
          </motion.g>

          {/* Balancier */}
          <motion.g
            transform="translate(550, 150)"
            animate={
              etapeActive === 1 || etapeActive === 7 
                ? { rotate: [-40, 40, -40] } 
                : etapeActive === 5
                ? { rotate: [0, 15, 0] }
                : {}
            }
            transition={{ 
              duration: etapeActive === 5 ? 0.5 : 1, 
              repeat: (etapeActive === 1 || etapeActive === 7) ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {/* Axe */}
            <line x1="0" y1="0" x2="0" y2="60" stroke="#475569" strokeWidth="3" />
            
            {/* Roue du balancier */}
            <circle cx="0" cy="60" r="50" fill="url(#balance-grad)" stroke="#d97706" strokeWidth="3" />
            
            {/* Rayons */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="0" y1="60" x2="0" y2="10"
                stroke="#92400e"
                strokeWidth="2"
                style={{
                  transformOrigin: '0px 60px',
                  transform: `rotate(${i * 45}deg)`
                }}
              />
            ))}
            
            {/* Jewel roller (rubis qui frappe l'ancre) */}
            <motion.circle 
              cx="-45" 
              cy="60" 
              r="8" 
              fill="#ec4899" 
              opacity="0.8"
              animate={etapeActive === 2 ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5, repeat: etapeActive === 2 ? Infinity : 0 }}
            />
            
            <circle cx="0" cy="60" r="12" fill="#1e293b" />
          </motion.g>

          {/* Flèches d'indication */}
          {etapeActive === 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <path d="M 310 150 L 350 150 L 345 145 M 350 150 L 345 155" stroke="#22c55e" strokeWidth="3" fill="none" />
              <text x="330" y="140" fill="#22c55e" fontSize="14" fontWeight="bold">Pousse</text>
            </motion.g>
          )}

          {etapeActive === 5 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <path d="M 460 150 L 500 150 L 495 145 M 500 150 L 495 155" stroke="#eab308" strokeWidth="3" fill="none" />
              <text x="465" y="140" fill="#eab308" fontSize="14" fontWeight="bold">Impulsion</text>
            </motion.g>
          )}
        </svg>
      </div>

      {/* Étapes détaillées */}
      <div className="space-y-3">
        {etapes.map((etape, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-5 border-2 cursor-pointer transition-all ${
              etapeActive === index
                ? `bg-gradient-to-r ${etape.couleur} border-white shadow-2xl`
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => setEtapeActive(index)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                etapeActive === index ? 'bg-white text-slate-900' : 'bg-slate-700 text-white'
              }`}>
                {etape.num}
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-bold mb-2 ${
                  etapeActive === index ? 'text-white' : 'text-slate-300'
                }`}>
                  {etape.titre}
                </h4>
                <p className={`text-sm ${
                  etapeActive === index ? 'text-white/90' : 'text-slate-400'
                }`}>
                  {etape.desc}
                </p>
              </div>
              {etapeActive === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-blue-900/30 border-2 border-blue-500 rounded-xl p-4">
        <p className="text-blue-200 text-sm flex items-start gap-2">
          <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Pourquoi c'est essentiel :</strong> Sans l'échappement, le ressort moteur se déroulerait 
            en quelques secondes. L'échappement régule la libération d'énergie en petites doses, 
            8 fois par seconde (pour une montre à 28'800 A/h), créant le tic-tac caractéristique.
          </span>
        </p>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Schéma Mécanique Interactif Détaillé
// ============================================
const SchemaMecaniqueComplet = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState<string | null>(null);
  const [animation, setAnimation] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [modeAffichage, setModeAffichage] = useState<'normal' | 'technique' | 'educatif'>('normal');
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  
  const organes: Organe[] = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet (Barrel)', 
      desc: 'Stocke l\'énergie du ressort moteur (mainspring). Le ressort peut se détendre progressivement pour alimenter toute la montre pendant 36-48h. C\'est la source d\'énergie primaire de tout le mouvement.',
      detailsTechniques: [
        'Ressort en forme de S pour équilibrer la tension',
        'Bande métallique créant une friction avec le barillet',
        'Mécanisme de sécurité contre le sur-remontage',
        'Environ 7 rotations sur remontage complet'
      ],
      x: 150, y: 300, couleur: '#3B82F6',
      icon: '⚡'
    },
    { 
      id: 'rouage', 
      nom: 'Rouage (Going Train)', 
      desc: 'Ensemble de 4 roues dentées qui transmettent et démultiplient l\'énergie du barillet. Chaque roue tourne à une vitesse différente pour créer les rapports nécessaires. Transforme ~7 rotations en ~2400 rotations.',
      detailsTechniques: [
        'Ratio global de réduction : ~343:1',
        '1ère roue (Barrel) → 2e roue',
        '2e roue → 3e roue → 4e roue (secondes)',
        'Trous dans les roues pour réduire l\'inertie',
        'Profils de dents cycloïdaux'
      ],
      x: 300, y: 300, couleur: '#10B981',
      icon: '⚙️'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement (Escapement)', 
      desc: 'L\'ancre (pallet fork) et la roue d\'échappement transforment l\'énergie continue en impulsions régulières. C\'est le "tic-tac" de la montre qui régule la libération d\'énergie en petites doses précises.',
      detailsTechniques: [
        'Palettes en rubis synthétique (faible friction)',
        'Libère l\'énergie 8 fois par seconde',
        'Cycle en 6 étapes précises',
        'Dents d\'échappement à forme spéciale',
        'Pousse le balancier pour l\'entretenir'
      ],
      x: 500, y: 300, couleur: '#8B5CF6',
      icon: '💓'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral (Balance Wheel)', 
      desc: 'Oscille à fréquence constante (4 Hz = 8 battements/sec pour 28\'800 A/h). Le spiral (hairspring) en Nivarox assure une oscillation régulière. C\'est le cœur réglant qui garantit la précision.',
      detailsTechniques: [
        'Fréquence : 4 Hz (4 oscillations complètes/sec)',
        'Spiral en Nivarox (insensible à la température)',
        'Masses de réglage pour ajuster la précision',
        'Amplitude d\'oscillation : ~270-300°',
        'Protection anti-choc du pivot',
        'Jewel roller pour frapper l\'ancre'
      ],
      x: 700, y: 300, couleur: '#F59E0B',
      icon: '🎯'
    },
    { 
      id: 'remontoir', 
      nom: 'Remontoir (Winding Mechanism)', 
      desc: 'Mécanisme permettant de remonter le ressort via la couronne (manuel) ou la masse oscillante (automatique). Recharge l\'énergie du mouvement. Le cliquet empêche le ressort de se dérouler.',
      detailsTechniques: [
        'Couronne avec tige carrée',
        'Cliquet (click) anti-retour',
        'Roue à rochet (ratchet wheel)',
        'Roue de couronne (crown wheel)',
        'Remontage automatique bidirectionnel possible'
      ],
      x: 400, y: 150, couleur: '#EF4444',
      icon: '🔄'
    },
    { 
      id: 'affichage', 
      nom: 'Affichage (Display)', 
      desc: 'Les aiguilles, cadran et système de transmission (motion works) permettent de lire l\'heure visuellement. Interface entre le mouvement et l\'utilisateur. Réduction supplémentaire pour les minutes et heures.',
      detailsTechniques: [
        'Pignon canon (cannon pinion) pour les minutes',
        'Réduction 60:1 pour minute hand',
        'Réduction 12:1 pour hour hand',
        'Friction contrôlée pour réglage de l\'heure',
        'Aiguille des secondes sur la 4e roue'
      ],
      x: 600, y: 150, couleur: '#06B6D4',
      icon: '🕐'
    },
  ], []);

  const addAnnotation = (x: number, y: number) => {
    const text = prompt("Ajouter une annotation:");
    if (text) {
      const newAnnotation = {
        id: Date.now(),
        x,
        y,
        text
      };
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const exportSchema = () => {
    console.log(`Exporting schema as ${exportFormat}`);
    // Implémentation d'export ici
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl overflow-hidden">
      {/* Particules de fond animées */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* En-tête avec contrôles */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Cog className="w-8 h-8 text-blue-400" />
          Schéma du Mécanisme Complet
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setAnimation(!animation)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            {animation ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span className="text-sm font-medium">{animation ? 'Pause' : 'Play'}</span>
          </button>
          
          <button
            onClick={() => setZoomLevel(zoomLevel === 1 ? 1.5 : 1)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            {zoomLevel === 1 ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          
          {/* Menu d'export */}
          <div className="relative">
            <button
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">Exporter</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl z-10 overflow-hidden">
              <div className="p-2">
                <div className="text-xs text-slate-400 mb-2">Format d'export:</div>
                {['png', 'svg', 'pdf'].map(format => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format as any)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                      exportFormat === format 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={exportSchema}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm mt-2 font-medium"
                >
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sélecteur de mode d'affichage */}
      <div className="flex gap-2 mb-6">
        {(['normal', 'technique', 'educatif'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setModeAffichage(mode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
              modeAffichage === mode 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <motion.div
        animate={{ scale: zoomLevel }}
        transition={{ duration: 0.3 }}
        className="origin-center"
      >
        <div 
          className="relative bg-slate-900/50 rounded-xl overflow-hidden cursor-crosshair"
          onClick={(e) => {
            if (modeAffichage === 'educatif') {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              addAnnotation(x, y);
            }
          }}
        >
          <svg className="w-full h-[600px]" viewBox="0 0 1000 600">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-blue-400" />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <radialGradient id="brass-gradient">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>

              <radialGradient id="steel-gradient">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </radialGradient>

              <radialGradient id="ruby-gradient">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </radialGradient>
            </defs>

            {/* Lignes de connexion animées entre organes */}
            <g opacity="0.7">
              {/* Barillet → Rouage */}
              <motion.path
                d="M 150 300 L 300 300"
                stroke="#60A5FA" strokeWidth="4" markerEnd="url(#arrowhead)"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={animation ? { 
                  pathLength: [0, 1],
                  strokeDashoffset: [0, -15]
                } : { pathLength: 1 }}
                transition={{ 
                  pathLength: { duration: 1.5, repeat: animation ? Infinity : 0 },
                  strokeDashoffset: { duration: 1, repeat: animation ? Infinity : 0, ease: "linear" }
                }}
              />
              
              {/* Rouage → Échappement */}
              <motion.path
                d="M 300 300 L 500 300"
                stroke="#60A5FA" strokeWidth="4" markerEnd="url(#arrowhead)"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={animation ? { 
                  pathLength: [0, 1],
                  strokeDashoffset: [0, -15]
                } : { pathLength: 1 }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: 0.5, repeat: animation ? Infinity : 0 },
                  strokeDashoffset: { duration: 1, repeat: animation ? Infinity : 0, ease: "linear" }
                }}
              />
              
              {/* Échappement → Balancier */}
              <motion.path
                d="M 500 300 L 700 300"
                stroke="#60A5FA" strokeWidth="4" markerEnd="url(#arrowhead)"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={animation ? { 
                  pathLength: [0, 1],
                  strokeDashoffset: [0, -15]
                } : { pathLength: 1 }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: 1, repeat: animation ? Infinity : 0 },
                  strokeDashoffset: { duration: 1, repeat: animation ? Infinity : 0, ease: "linear" }
                }}
              />
              
              {/* Remontoir → Barillet (en pointillés pour le remontage) */}
              <motion.path
                d="M 400 150 L 150 250"
                stroke="#EF4444" strokeWidth="3" strokeDasharray="8,8" markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={animation ? { 
                  pathLength: [0, 1],
                  opacity: [0.3, 0.8, 0.3]
                } : { pathLength: 1 }}
                transition={{ 
                  pathLength: { duration: 2, delay: 1.5, repeat: animation ? Infinity : 0 },
                  opacity: { duration: 2, repeat: animation ? Infinity : 0 }
                }}
              />
              
              {/* Rouage → Affichage */}
              <motion.path
                d="M 300 300 L 600 200"
                stroke="#06B6D4" strokeWidth="3" strokeDasharray="8,8" markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={animation ? { pathLength: [0, 1] } : { pathLength: 1 }}
                transition={{ duration: 1.5, delay: 2, repeat: animation ? Infinity : 0 }}
              />
            </g>

            {/* 1. BARILLET avec ressort animé */}
            <g 
              className="cursor-pointer transition-all"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'barillet' ? null : 'barillet')}
              opacity={organeSelectionne && organeSelectionne !== 'barillet' ? 0.4 : 1}
            >
              <motion.circle 
                cx="150" cy="300" r="65" 
                fill="url(#steel-gradient)" 
                stroke="#475569" 
                strokeWidth="4"
                filter={organeSelectionne === 'barillet' ? "url(#glow)" : ""}
                whileHover={{ scale: 1.1 }}
              />
              <circle cx="150" cy="300" r="52" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              
              {/* Ressort spiralé animé à l'intérieur */}
              <motion.path
                d="M 150 300 Q 150 280, 165 280 T 180 290 T 185 300 T 180 310 T 165 315 T 150 315 T 135 310 T 130 300"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                animate={animation ? { 
                  strokeDashoffset: [0, -100],
                  opacity: [0.6, 1, 0.6]
                } : {}}
                transition={{ 
                  strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 2, repeat: Infinity }
                }}
                strokeDasharray="100"
              />
              
              <circle cx="150" cy="300" r="10" fill="url(#brass-gradient)" />
              
              {/* Dents du barillet */}
              {[...Array(12)].map((_, i) => (
                <rect key={i} x="148" y="235" width="4" height="12" fill="#64748b" transform={`rotate(${i * 30} 150 300)`} />
              ))}
              
              <text x="150" y="395" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Barillet</text>
              <text x="150" y="415" textAnchor="middle" fill="#3B82F6" fontSize="14">Mainspring</text>
            </g>

            {/* 2. ROUAGE avec roues multiples */}
            <g 
              className="cursor-pointer"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'rouage' ? null : 'rouage')}
              opacity={organeSelectionne && organeSelectionne !== 'rouage' ? 0.4 : 1}
            >
              {/* Grande roue (2e roue) */}
              <g>
                <motion.circle 
                  cx="280" cy="300" r="50" 
                  fill="url(#brass-gradient)" 
                  stroke="#d97706" 
                  strokeWidth="4" 
                  filter={organeSelectionne === 'rouage' ? "url(#glow)" : ""}
                  whileHover={{ scale: 1.1 }}
                />
                {[...Array(20)].map((_, i) => (
                  <motion.rect
                    key={i}
                    x="278" y="250" width="4" height="14" fill="#92400e"
                    style={{
                      transformOrigin: '280px 300px',
                    }}
                    animate={animation ? { rotate: 360 } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    transform={`rotate(${i * 18})`}
                  />
                ))}
                <circle cx="280" cy="300" r="10" fill="#1e293b" />
                
                {/* Trous pour réduire l'inertie */}
                {[0, 120, 240].map((angle) => (
                  <circle 
                    key={angle}
                    cx={280 + 30 * Math.cos((angle * Math.PI) / 180)}
                    cy={300 + 30 * Math.sin((angle * Math.PI) / 180)}
                    r="6"
                    fill="#1e293b"
                  />
                ))}
              </g>
              
              {/* Petite roue (pinion) */}
              <g>
                <circle cx="330" cy="270" r="25" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" />
                {[...Array(10)].map((_, i) => (
                  <motion.rect
                    key={i}
                    x="328" y="245" width="4" height="10" fill="#92400e"
                    style={{
                      transformOrigin: '330px 270px',
                    }}
                    animate={animation ? { rotate: -360 } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    transform={`rotate(${i * 36})`}
                  />
                ))}
                <circle cx="330" cy="270" r="6" fill="#1e293b" />
              </g>
              
              <text x="300" y="395" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Rouage</text>
              <text x="300" y="415" textAnchor="middle" fill="#10B981" fontSize="14">Going Train</text>
            </g>

            {/* 3. ÉCHAPPEMENT avec ancre animée */}
            <g 
              className="cursor-pointer"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'echappement' ? null : 'echappement')}
              opacity={organeSelectionne && organeSelectionne !== 'echappement' ? 0.4 : 1}
            >
              {/* Roue d'échappement */}
              <motion.circle 
                cx="500" cy="300" r="45" 
                fill="url(#brass-gradient)" 
                stroke="#d97706" 
                strokeWidth="4" 
                filter={organeSelectionne === 'echappement' ? "url(#glow)" : ""}
                whileHover={{ scale: 1.1 }}
              />
              
              {/* Dents d'échappement avec forme spéciale */}
              {[...Array(15)].map((_, i) => (
                <motion.path
                  key={i}
                  d="M 500 255 L 512 248 L 512 255 Z"
                  fill="#92400e"
                  style={{
                    transformOrigin: '500px 300px',
                  }}
                  animate={animation ? { rotate: [0, 24, 0] } : {}}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.0167 }}
                  transform={`rotate(${i * 24})`}
                />
              ))}
              
              <circle cx="500" cy="300" r="12" fill="#1e293b" />
              
              {/* Ancre animée (Pallet Fork) */}
              <motion.g
                animate={animation ? { rotate: [-8, 8, -8] } : {}}
                transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '500px 340px' }}
              >
                {/* Corps de l'ancre */}
                <rect x="495" y="340" width="10" height="50" fill="url(#steel-gradient)" rx="3" />
                
                {/* Bras de l'ancre */}
                <path d="M 485 340 L 485 325 L 515 325 L 515 340 Z" fill="url(#steel-gradient)" />
                
                {/* Palettes en rubis */}
                <ellipse cx="478" cy="323" rx="10" ry="5" fill="url(#ruby-gradient)" opacity="0.8" />
                <ellipse cx="522" cy="323" rx="10" ry="5" fill="url(#ruby-gradient)" opacity="0.8" />
                
                {/* Fourchette */}
                <path d="M 490 390 L 490 400 L 510 400 L 510 390 Z" fill="url(#steel-gradient)" />
              </motion.g>
              
              <text x="500" y="420" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Échappement</text>
              <text x="500" y="440" textAnchor="middle" fill="#8B5CF6" fontSize="14">Escapement</text>
            </g>

            {/* 4. BALANCIER-SPIRAL avec animation réaliste */}
            <g 
              className="cursor-pointer"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'balancier' ? null : 'balancier')}
              opacity={organeSelectionne && organeSelectionne !== 'balancier' ? 0.4 : 1}
            >
              {/* Support du balancier (Balance Bridge) */}
              <rect x="665" y="250" width="70" height="18" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="3" rx="4" />
              <circle cx="682" cy="259" r="4" fill="#1e293b" />
              <circle cx="718" cy="259" r="4" fill="#1e293b" />
              
              {/* Jewels de support (protection anti-choc) */}
              <circle cx="700" cy="259" r="6" fill="url(#ruby-gradient)" opacity="0.6" />
              
              {/* Balancier oscillant */}
              <motion.g
                animate={animation ? { rotate: [-40, 40, -40] } : {}}
                transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '700px 268px' }}
              >
                {/* Axe du balancier */}
                <line x1="700" y1="268" x2="700" y2="315" stroke="#475569" strokeWidth="3" />
                
                {/* Roue du balancier */}
                <motion.circle 
                  cx="700" cy="315" r="40" 
                  fill="url(#brass-gradient)" 
                  stroke="#d97706" 
                  strokeWidth="4" 
                  filter={organeSelectionne === 'balancier' ? "url(#glow)" : ""}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Rayons du balancier */}
                {[...Array(8)].map((_, i) => (
                  <line 
                    key={i} 
                    x1="700" y1="315" 
                    x2="700" y2="275" 
                    stroke="#92400e" 
                    strokeWidth="2.5" 
                    transform={`rotate(${i * 45} 700 315)`} 
                  />
                ))}
                
                {/* Masses de réglage (4 vis dorées pour ajuster la fréquence) */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <g key={i} transform={`rotate(${angle} 700 315)`}>
                    <rect x="735" y="313" width="10" height="4" fill="#fbbf24" rx="1" />
                    <circle cx="740" cy="315" r="2" fill="#92400e" />
                  </g>
                ))}
                
                {/* Jewel roller (rubis qui frappe l'ancre) */}
                <circle cx="660" cy="315" r="6" fill="url(#ruby-gradient)" opacity="0.9" />
                
                {/* Centre doré */}
                <circle cx="700" cy="315" r="10" fill="#1e293b" />
              </motion.g>
              
              {/* Spiral animé (Hairspring en Nivarox) */}
              <motion.path
                d="M 700 268 Q 700 263, 705 263 T 712 266 T 715 271 T 715 278 T 710 283 T 700 285"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                animate={animation ? {
                  d: [
                    "M 700 268 Q 700 263, 705 263 T 712 266 T 715 271 T 715 278 T 710 283 T 700 285",
                    "M 700 268 Q 700 258, 710 258 T 720 266 T 722 276 T 722 286 T 712 294 T 700 297",
                    "M 700 268 Q 700 263, 705 263 T 712 266 T 715 271 T 715 278 T 710 283 T 700 285"
                  ]
                } : {}}
                transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Régulateurs du spiral (composants teal) */}
              <rect x="715" y="266" width="8" height="3" fill="#14b8a6" rx="1" opacity="0.8" />
              <rect x="715" y="280" width="8" height="3" fill="#14b8a6" rx="1" opacity="0.8" />
              
              <text x="700" y="390" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Balancier</text>
              <text x="700" y="410" textAnchor="middle" fill="#F59E0B" fontSize="14">Balance Wheel</text>
              <text x="700" y="427" textAnchor="middle" fill="#fbbf24" fontSize="12">4 Hz / 28'800 A/h</text>
            </g>

            {/* 5. REMONTOIR avec masse oscillante */}
            <g 
              className="cursor-pointer"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'remontoir' ? null : 'remontoir')}
              opacity={organeSelectionne && organeSelectionne !== 'remontoir' ? 0.4 : 1}
            >
              {/* Axe de transmission */}
              <rect x="340" y="148" width="90" height="4" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="1" />
              
              {/* Pignon intermédiaire */}
              <circle cx="370" cy="150" r="14" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="2" />
              {[...Array(12)].map((_, i) => (
                <rect key={i} x="368" y="136" width="4" height="7" fill="#92400e" transform={`rotate(${i * 30} 370 150)`} />
              ))}
              
              {/* Roue à rochet (Ratchet Wheel) */}
              <motion.circle 
                cx="420" cy="150" r="22" 
                fill="url(#brass-gradient)" 
                stroke="#d97706" 
                strokeWidth="3" 
                filter={organeSelectionne === 'remontoir' ? "url(#glow)" : ""}
                whileHover={{ scale: 1.1 }}
              />
              {[...Array(16)].map((_, i) => (
                <path 
                  key={i}
                  d="M 420 128 L 425 125 L 425 128 Z"
                  fill="#92400e"
                  transform={`rotate(${i * 22.5} 420 150)`}
                />
              ))}
              
              {/* Cliquet (Click) - mécanisme anti-retour */}
              <g>
                <path d="M 442 145 L 450 140 L 450 150 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                <motion.circle
                  cx="445" cy="145" r="2"
                  animate={animation ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  fill="#fca5a5"
                />
              </g>
              
              {/* Ressort du cliquet (Click Spring) */}
              <motion.path
                d="M 448 148 Q 453 150, 456 148"
                stroke="#94a3b8"
                strokeWidth="2"
                fill="none"
                animate={animation ? {
                  d: [
                    "M 448 148 Q 453 150, 456 148",
                    "M 448 148 Q 453 153, 456 148",
                    "M 448 148 Q 453 150, 456 148"
                  ]
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              
              <circle cx="420" cy="150" r="8" fill="#1e293b" />
              
              <text x="400" y="205" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Remontoir</text>
              <text x="400" y="225" textAnchor="middle" fill="#EF4444" fontSize="14">Winding</text>
            </g>

            {/* 6. AFFICHAGE avec aiguilles */}
            <g 
              className="cursor-pointer"
              onClick={() => setOrganeSelectionne(organeSelectionne === 'affichage' ? null : 'affichage')}
              opacity={organeSelectionne && organeSelectionne !== 'affichage' ? 0.4 : 1}
            >
              {/* Cadran */}
              <motion.circle 
                cx="600" cy="150" r="50" 
                fill="#f8fafc" 
                stroke="#1e293b" 
                strokeWidth="4" 
                filter={organeSelectionne === 'affichage' ? "url(#glow)" : ""}
                whileHover={{ scale: 1.1 }}
              />
              
              {/* Index horaires */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="600" y1="105" x2="600" y2={i % 3 === 0 ? "112" : "110"}
                  stroke="#1e293b"
                  strokeWidth={i % 3 === 0 ? "4" : "2"}
                  transform={`rotate(${i * 30} 600 150)`}
                />
              ))}
              
              {/* Chiffres principaux */}
              {[12, 3, 6, 9].map((num, idx) => {
                const angle = (num - 3) * 30;
                const rad = (angle * Math.PI) / 180;
                const x = 600 + 32 * Math.cos(rad);
                const y = 150 + 32 * Math.sin(rad);
                return (
                  <text key={num} x={x} y={y + 4} textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">
                    {num}
                  </text>
                );
              })}
              
              {/* Aiguille des heures */}
              <motion.line
                x1="600" y1="150" x2="600" y2="130"
                stroke="#1e293b" strokeWidth="5" strokeLinecap="round"
                animate={animation ? { rotate: 360 } : {}}
                transition={{ duration: 43200, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '600px 150px' }}
              />
              
              {/* Aiguille des minutes */}
              <motion.line
                x1="600" y1="150" x2="600" y2="118"
                stroke="#475569" strokeWidth="4" strokeLinecap="round"
                animate={animation ? { rotate: 360 } : {}}
                transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '600px 150px' }}
              />
              
              {/* Aiguille des secondes */}
              <motion.line
                x1="600" y1="150" x2="600" y2="110"
                stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
                animate={animation ? { rotate: 360 } : {}}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '600px 150px' }}
              />
              
              {/* Axe central */}
              <circle cx="600" cy="150" r="6" fill="#1e293b" />
              <circle cx="600" cy="150" r="3" fill="#f8fafc" />
              
              <text x="600" y="220" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Affichage</text>
              <text x="600" y="240" textAnchor="middle" fill="#06B6D4" fontSize="14">Display</text>
            </g>

            {/* Légende des couleurs */}
            <g transform="translate(50, 480)">
              <text x="0" y="0" fill="white" fontSize="14" fontWeight="bold">Légende :</text>
              <circle cx="10" cy="20" r="5" fill="#60A5FA" />
              <text x="20" y="25" fill="#cbd5e1" fontSize="12">Flux d'énergie</text>
              
              <circle cx="10" cy="40" r="5" fill="#EF4444" />
              <text x="20" y="45" fill="#cbd5e1" fontSize="12">Remontage</text>
              
              <circle cx="10" cy="60" r="5" fill="url(#ruby-gradient)" />
              <text x="20" y="65" fill="#cbd5e1" fontSize="12">Rubis synthétique</text>
            </g>
          </svg>

          {/* Annotations */}
          {annotations.map(annotation => (
            <div
              key={annotation.id}
              className="absolute bg-yellow-500/90 text-black text-xs rounded px-2 py-1 max-w-xs"
              style={{ left: annotation.x, top: annotation.y }}
            >
              {annotation.text}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAnnotations(annotations.filter(a => a.id !== annotation.id));
                }}
                className="ml-2 text-black hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mode éducatif avec instructions */}
      {modeAffichage === 'educatif' && (
        <div className="mt-4 bg-blue-900/30 border border-blue-500 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            <strong>Mode éducatif :</strong> Cliquez n'importe où sur le schéma pour ajouter des annotations. 
            Cliquez sur une annotation pour la supprimer.
          </p>
        </div>
      )}

      {/* Zone d'information détaillée */}
      <AnimatePresence>
        {organeSelectionne && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mt-8 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-2xl border-2 border-blue-300 dark:border-blue-600 overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{organes.find(o => o.id === organeSelectionne)?.icon}</span>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {organes.find(o => o.id === organeSelectionne)?.nom}
                    </h4>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1"></div>
                  </div>
                </div>
                
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg mb-4">
                  {organes.find(o => o.id === organeSelectionne)?.desc}
                </p>

                <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-blue-300/30 dark:border-blue-600/30">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Détails Techniques
                  </h5>
                  <ul className="space-y-2">
                    {organes.find(o => o.id === organeSelectionne)?.detailsTechniques.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button
                onClick={() => setOrganeSelectionne(null)}
                className="ml-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-4xl font-bold transition-colors hover:rotate-90 transform duration-300"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-slate-300 text-center mt-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-3">
        <Lightbulb className="w-4 h-4 inline mr-2 text-yellow-400" />
        💡 Cliquez sur un organe pour découvrir ses détails techniques • 
        {animation ? ' ⏸️ Animation active' : ' ▶️ Animation en pause'}
        {zoomLevel > 1 && ' • 🔍 Mode zoom activé'}
        {modeAffichage === 'educatif' && ' • 📝 Mode éducatif activé'}
      </p>
    </div>
  );
};

// ============================================
// COMPOSANT : Comparaison Mécanique vs Quartz vs Smart
// ============================================
const ComparaisonMontres = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 border-2 border-indigo-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-400" />
        Comparaison : Mécanique vs Quartz vs Smart
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* MÉCANIQUE */}
        <motion.div 
          className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border-2 border-amber-500 hover:border-amber-400 transition-all"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Cog className="w-10 h-10 text-amber-400" />
            <h3 className="text-2xl font-bold text-white">Mécanique</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Aucune batterie</strong> - Fonctionne par ressort</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5
text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Artisanat</strong> - Jusqu'à 300 pièces assemblées main</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Durabilité</strong> - Peut durer des générations</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Mouvement visible</strong> - Beauté mécanique</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Précision</strong> - ±5-30 sec/jour</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Maintenance</strong> - Service tous les 3-5 ans</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Prix</strong> - Généralement plus cher</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-amber-600">
            <p className="text-xs text-amber-200">
              <strong>Fréquence typique :</strong> 28'800 A/h (4 Hz)
            </p>
            <p className="text-xs text-amber-200 mt-1">
              <strong>Réserve de marche :</strong> 36-72h
            </p>
          </div>
        </motion.div>

        {/* QUARTZ */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-2 border-blue-500 hover:border-blue-400 transition-all"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Quartz</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Très précis</strong> - ±15 sec/mois</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Abordable</strong> - Prix accessible</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Peu d'entretien</strong> - Change batterie tous les 2-3 ans</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Fiable</strong> - Moins sensible aux chocs</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Batterie</strong> - Nécessite une pile</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Électronique</strong> - Moins de prestige</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Mouvement saccadé</strong> - Aiguille des secondes qui saute</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-600">
            <p className="text-xs text-blue-200">
              <strong>Fréquence :</strong> 32'768 Hz (cristal de quartz)
            </p>
            <p className="text-xs text-blue-200 mt-1">
              <strong>Durée de vie batterie :</strong> 2-5 ans
            </p>
          </div>
        </motion.div>

        {/* SMART */}
        <motion.div 
          className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border-2 border-purple-500 hover:border-purple-400 transition-all"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Watch className="w-10 h-10 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Smart</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Multifonction</strong> - Santé, notifications, GPS</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Connectivité</strong> - Sync avec smartphone</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Personnalisable</strong> - Cadrans et apps</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Précis</strong> - Synchronisation atomique</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Batterie quotidienne</strong> - Charge tous les 1-2 jours</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Obsolescence</strong> - Nouvelle version chaque année</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Dépendance tech</strong> - Nécessite un smartphone</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-purple-600">
            <p className="text-xs text-purple-200">
              <strong>Processeur :</strong> Multi-cœurs, GPS, capteurs
            </p>
            <p className="text-xs text-purple-200 mt-1">
              <strong>Autonomie :</strong> 18h - 7 jours
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border-2 border-slate-600">
        <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          Le Paradoxe de la Montre Mécanique
        </h4>
        <p className="text-slate-200 leading-relaxed">
          Dans les années 1970, les montres mécaniques ont commencé à être détrônées par les modèles à quartz, 
          qui suivent le temps en comptant électroniquement les vibrations d'un cristal de quartz. 
          Au fil du progrès technologique, les montres classiques n'ont fait qu'accroître leur dépendance aux circuits numériques. 
          Les réincarnations intelligentes modernes ne ressemblent à leurs archétypes que par leur forme et leur placement sur les poignets.
        </p>
        <p className="text-slate-200 leading-relaxed mt-4">
          <strong className="text-amber-400">Les montres mécaniques ne sont pas aussi précises que les montres numériques.</strong> 
          Elles nécessitent un entretien et sont plus fragiles. Malgré tous ces inconvénients, ces appareils montrent une 
          <strong className="text-green-400"> véritable maîtrise de l'ingénierie</strong>. Grâce à l'utilisation créative 
          d'engrenages, de leviers et de ressorts miniatures, une montre mécanique s'élève de ses composants dormants 
          pour devenir <strong className="text-blue-400">vraiment vivante</strong>.
        </p>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Statistiques et Faits
// ============================================
const StatistiquesFaits = () => {
  const stats = [
    { label: 'Pièces dans un mouvement complexe', value: '~300', icon: Cog, couleur: 'blue' },
    { label: 'Battements par jour', value: '691\'200', icon: Clock, couleur: 'green' },
    { label: 'Précision typique', value: '±5-30 sec/jour', icon: Target, couleur: 'amber' },
    { label: 'Réserve de marche', value: '36-72h', icon: Battery, couleur: 'purple' },
    { label: 'Fréquence standard', value: '4 Hz', icon: Zap, couleur: 'red' },
    { label: 'Alternances/heure', value: '28\'800', icon: TrendingUp, couleur: 'cyan' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 border-2 border-blue-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Award className="w-8 h-8 text-yellow-400" />
        Statistiques et Faits Fascinants
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const couleurs = {
            blue: 'from-blue-500 to-blue-600 border-blue-400',
            green: 'from-green-500 to-green-600 border-green-400',
            amber: 'from-amber-500 to-amber-600 border-amber-400',
            purple: 'from-purple-500 to-purple-600 border-purple-400',
            red: 'from-red-500 to-red-600 border-red-400',
            cyan: 'from-cyan-500 to-cyan-600 border-cyan-400',
          };

          return (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${couleurs[stat.couleur as keyof typeof couleurs]} rounded-xl p-6 border-2 shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Icon className="w-10 h-10 text-white mb-3" />
              <p className="text-white/80 text-sm mb-2">{stat.label}</p>
              <p className="text-white text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Faits intéressants */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-4">💎 Faits Intéressants</h3>
        
        {[
          {
            titre: 'Rubis Synthétiques',
            desc: 'Les montres utilisent des rubis synthétiques comme paliers. Ces pierres précieuses artificielles sont très dures (9 sur l\'échelle de Mohs) et ont un faible coefficient de friction avec l\'acier. Une montre de qualité peut contenir 15-25 rubis.',
            icon: '💎'
          },
          {
            titre: 'Profils de Dents Cycloïdaux',
            desc: 'Contrairement aux machines industrielles qui utilisent des profils de dents en développante de cercle, les montres mécaniques utilisent souvent des profils cycloïdaux obtenus en faisant rouler un cercle sur la surface d\'un autre cercle.',
            icon: '⚙️'
          },
          {
            titre: 'Alliage Nivarox',
            desc: 'Le spiral (hairspring) est fabriqué en Nivarox, un alliage spécial qui maintient sa rigidité constante malgré les variations de température. Cela améliore considérablement la précision du chronométrage.',
            icon: '🌡️'
          },
          {
            titre: 'Remontage Automatique Bidirectionnel',
            desc: 'Le mécanisme de remontage automatique moderne utilise un système ingénieux qui remonte le ressort quelle que soit la direction de rotation de la masse oscillante. Deux cliquets unidirectionnels transfèrent le mouvement.',
            icon: '🔄'
          },
          {
            titre: 'Mouvement Fluide',
            desc: 'À 28\'800 alternances/heure (4 Hz), le balancier frappe l\'ancre 8 fois par seconde. Cela donne l\'illusion d\'un mouvement très fluide de l\'aiguille des secondes, contrairement au mouvement saccadé des montres à quartz.',
            icon: '⏱️'
          },
          {
            titre: 'Hacking',
            desc: 'Quand vous tirez la couronne pour régler l\'heure, un petit levier (stop lever) vient bloquer le balancier. Cette fonction appelée "hacking" permet de régler l\'heure sans que les secondes continuent de s\'écouler.',
            icon: '🛑'
          }
        ].map((fait, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{fait.icon}</span>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{fait.titre}</h4>
                <p className="text-slate-300 leading-relaxed">{fait.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL D'EXPORT
// ============================================
export default function MontreComplete() {
  const [globalAnimation, setGlobalAnimation] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Contrôle global */}
        <div className="flex justify-end">
          <button
            onClick={() => setGlobalAnimation(!globalAnimation)}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-2xl ${
              globalAnimation 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            } text-white`}
          >
            {globalAnimation ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            <span>{globalAnimation ? 'Pause Globale' : 'Play Global'}</span>
          </button>
        </div>

        <IntroductionMontre />
        <SixOrganesEssentiels />
        <AnimationMontreComplete />
        <CycleEchappementDetaille />
        <SchemaMecaniqueComplet />
        <ComparaisonMontres />
        <StatistiquesFaits />

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 text-center">
          <p className="text-slate-300 text-lg mb-4">
            Cette visualisation interactive est basée sur l'excellent article de <strong className="text-blue-400">Bartosz Ciechanowski</strong>
          </p>
          <a 
            href="https://ciechanow.ski/mechanical-watch/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Lire l'article original
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <p className="text-slate-500 text-sm mt-6">
            © 2025 - Composant React éducatif sur les montres mécaniques
          </p>
        </div>
      </div>
    </div>
  );
}
