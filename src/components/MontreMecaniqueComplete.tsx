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
          </motion.div>
          
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all"
          >
            Recommencer le quiz
          </button>
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
  const [vue, setVue] = useState('face');
  const [modeCouleur, setModeCouleur] = useState('normal');

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
        </div>
      </div>

      {/* Contrôles avancés */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Contrôles de vitesse */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Vitesse</label>
            <div className="flex gap-2 mb-2">
              {[0.25, 1, 5].map(v => (
                <button
                  key={v}
                  onClick={() => setVitesse(v)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    vitesse === v 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {v}x
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

          {/* Sélecteur de vue */}
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Vue</label>
            <div className="grid grid-cols-2 gap-2">
              {['face', 'dos', 'profil'].map(v => (
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
              {['normal', 'technique', 'luxe'].map(c => (
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
        </div>
      </div>

      {/* Zone d'animation */}
      <div className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden">
        {vue === 'face' && (
          <div className="relative">
            {/* Boîtier externe 3D */}
            <div className="absolute -inset-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-full shadow-2xl">
              <div className="absolute inset-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
            </div>

            {/* Cadran principal */}
            <div className={`relative w-80 h-80 ${
              modeCouleur === 'luxe' ? 'bg-gradient-to-br from-amber-50 to-amber-100' : 'bg-gradient-to-br from-white to-slate-100'
            } rounded-full border-8 ${modeCouleur === 'luxe' ? 'border-amber-800' : 'border-slate-800'} shadow-2xl overflow-hidden`}>

              {/* Marqueurs d'heures */}
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
                    {isMainHour && (
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

              {/* Logo/marque */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <div className="text-sm font-bold text-slate-700 tracking-widest">AUTOMATIC</div>
                <div className="text-xs text-slate-500 tracking-wider">SWISS MADE</div>
                <div className="text-xs text-blue-600 mt-1">28'800 A/h</div>
              </div>

              {/* Aiguille des heures */}
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

              {/* Aiguille des minutes */}
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

              {/* Aiguille des secondes */}
              <motion.div
                className="absolute w-0.5 bg-red-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg z-40"
                style={{ 
                  height: '130px',
                  transform: 'translateX(-50%) translateY(-100%)',
                }}
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-red-600 rounded-full"></div>
              </motion.div>

              {/* Axe central */}
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
                <div className="absolute inset-0.5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full"></div>
                <div className="absolute inset-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Verre saphir */}
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

        {vue === 'dos' && (
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-8 border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden">
              <motion.div
                className="relative w-72 h-72"
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 4 / vitesse, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700" style={{
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                  }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700" style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
                  }}></div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-4 border-amber-600"></div>
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 text-center">
                  <div className="text-amber-200 text-xs font-bold">AUTOMATIC</div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {vue === 'profil' && (
          <div className="text-white text-center">
            <Info className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <p className="text-xl">Vue de profil - Visualisation du boîtier</p>
            <p className="text-sm text-slate-400 mt-2">Épaisseur typique : 10-15mm</p>
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
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Artisanat</strong> - Jusqu'à 300 pièces assemblées main</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Durabilité</strong> - Peut durer des générations</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Précision</strong> - ±5-30 sec/jour</p>
            </div>
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
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Batterie</strong> - Nécessite une pile</p>
            </div>
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
              <p className="text-slate-200"><strong>Précis</strong> - Synchronisation atomique</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-200"><strong>Batterie quotidienne</strong> - Charge tous les 1-2 jours</p>
            </div>
          </div>
        </motion.div>
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
    </div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL D'EXPORT
// ============================================
export default function MontreMecaniqueComplete() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [globalAnimation, setGlobalAnimation] = useState(true);
  const [progression, setProgression] = useState({
    introduction: true,
    organes: false,
    animation: false,
    echappement: false,
    schema: false,
    comparaison: false,
    statistiques: false,
    quiz: false
  });
  
  // Mettre à jour la progression lors du changement d'onglet
  useEffect(() => {
    setProgression(prev => ({
      ...prev,
      [activeTab]: true
    }));
  }, [activeTab]);

  // Sauvegarder la progression dans localStorage
  useEffect(() => {
    localStorage.setItem('montreMecaniqueProgression', JSON.stringify(progression));
  }, [progression]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec barre de progression */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Introduction aux Montres Mécaniques
          </h1>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300 font-medium">Votre progression</span>
              <span className="text-slate-400 text-sm">
                {Object.values(progression).filter(Boolean).length}/{Object.keys(progression).length} modules complétés
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(Object.values(progression).filter(Boolean).length / Object.keys(progression).length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} progression={progression} />
        
        {/* Contrôle global d'animation */}
        <div className="flex justify-end mb-6">
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

        {/* Contenu basé sur l'onglet sélectionné */}
        <div className="space-y-12">
          {activeTab === 'introduction' && <IntroductionMontre />}
          {activeTab === 'organes' && <SixOrganesEssentiels />}
          {activeTab === 'animation' && <AnimationMontreComplete />}
          {activeTab === 'comparaison' && <ComparaisonMontres />}
          {activeTab === 'statistiques' && <StatistiquesFaits />}
          {activeTab === 'quiz' && <QuizInteractif />}
        </div>

        {/* Navigation entre modules */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => {
              const tabs = ['introduction', 'organes', 'animation', 'echappement', 'schema', 'comparaison', 'statistiques', 'quiz'];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1]);
              }
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'introduction' 
                ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
            disabled={activeTab === 'introduction'}
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </button>
          
          <button
            onClick={() => {
              const tabs = ['introduction', 'organes', 'animation', 'echappement', 'schema', 'comparaison', 'statistiques', 'quiz'];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1]);
              }
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'quiz' 
                ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={activeTab === 'quiz'}
          >
            Suivant
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 text-center mt-12">
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
