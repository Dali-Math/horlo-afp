// app/theorie/balancier-spiral/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  ChevronLeft, Gauge, Zap, Settings, TrendingUp, Clock, Play, Pause, RotateCw, 
  Thermometer, Magnet, CheckCircle, XCircle, Award, Trophy, BookOpen, Layers, Activity,
  Calendar, Users, Microscope, Target, Sliders, Info, RotateCcw, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Composant 3D interactif du balancier
const Anatomie3DBalancier = () => {
  const [partieActive, setPartieActive] = useState<string | null>(null);
  const controles = useAnimation();
  
  // Définition de l'animation pour éviter la duplication
  const animationOscillation = {
    rotate: [0, 15, 0, -15, 0],
    transition: {
      duration: 0.125,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 0
    }
  };

  const composants = useMemo(() => [
    {
      id: 'serge',
      nom: 'Serge (Jante)',
      desc: 'Anneau périphérique qui concentre 90% de la masse à l\'extérieur pour maximiser le moment d\'inertie',
      specs: 'Ø 10-12mm • CuBe ou Silicium',
      position: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 'bras',
      nom: 'Bras du balancier',
      desc: 'Relient la serge au moyeu. Forme optimisée pour rigidité et compensation thermique',
      specs: 'Forme en S ou droite • Titane ou acier',
      position: { x: 0, y: 0, rotate: -45 }
    },
    {
      id: 'spiral',
      nom: 'Spiral de Breguet',
      desc: 'Spire externe relevée pour développement concentrique parfait. Antimagnétique Nivarox',
      specs: '0.04mm épaisseur • 13 spires • Nivarox',
      position: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 'plateau',
      nom: 'Plateau double',
      desc: 'Fixé sur l\'axe, porte la cheville qui interagit avec la fourchette de l\'échappement',
      specs: 'Acier trempé • Diamanté',
      position: { x: 0, y: 0, rotate: 0 }
    }
  ], []);

  // Animation d'oscillation du balancier
  useEffect(() => {
    controles.start(animationOscillation);
  }, [controles, animationOscillation]);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl h-96 overflow-hidden border border-slate-700">
      {/* Fond technique avec grille */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" stroke="currentColor" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-slate-600"/>
        </svg>
      </div>

      {/* Composants 3D */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={controles}
      >
        {composants.map((comp, i) => (
          <motion.div
            key={comp.id}
            className="absolute cursor-pointer"
            style={{ left: '50%', top: '50%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            onClick={() => setPartieActive(comp.id)}
          >
            {/* Représentation SVG du composant */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-2xl">
              <circle cx="60" cy="60" r="45" 
                fill="none" 
                stroke={partieActive === comp.id ? "#3B82F6" : "#64748B"}
                strokeWidth={partieActive === comp.id ? "4" : "2"}
                className="transition-all duration-300"
              />
              {comp.id === 'serge' && (
                <circle cx="60" cy="60" r="40" fill="url(#metalGradient)" opacity="0.8"/>
              )}
              {comp.id === 'bras' && (
                <line x1="60" y1="60" x2="100" y2="100" stroke="#94A3B8" strokeWidth="3"/>
              )}
              {comp.id === 'spiral' && (
                <path d="M60 60 Q70 50, 60 40 Q50 30, 60 20" stroke="#EAB308" strokeWidth="2" fill="none"/>
              )}
              <defs>
                <radialGradient id="metalGradient">
                  <stop offset="0%" stopColor="#E2E8F0"/>
                  <stop offset="100%" stopColor="#64748B"/>
                </radialGradient>
              </defs>
            </svg>
            
            {/* Label flottant */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: partieActive === comp.id ? 1 : 0 }}
            >
              {comp.nom}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Panneau d'informations */}
      <AnimatePresence>
        {partieActive && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-4 top-4 w-80 bg-slate-900/95 backdrop-blur-md rounded-xl p-6 border border-slate-600"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-white">
                {composants.find(c => c.id === partieActive)?.nom}
              </h3>
              <button
                onClick={() => setPartieActive(null)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-300 mb-3">
              {composants.find(c => c.id === partieActive)?.desc}
            </p>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-400">
                {composants.find(c => c.id === partieActive)?.specs}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contrôles */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-900/90 backdrop-blur-md rounded-full p-2 border border-slate-600">
        <button
          onClick={() => controles.start(animationOscillation)} // CORRIGÉ : ajout de l'argument
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Play className="w-4 h-4" /> Osciller
        </button>
        <button
          onClick={() => controles.stop()}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Pause className="w-4 h-4" /> Pause
        </button>
      </div>
    </div>
  );
};

// Simulateur de fréquence interactive
const SimulateurFrequence = () => {
  const [frequence, setFrequence] = useState(4); // Hz
  const [enMarche, setEnMarche] = useState(true);
  const controles = useAnimation();

  useEffect(() => {
    if (enMarche) {
      controles.start({
        rotate: [0, 15, 0, -15, 0],
        transition: {
          duration: 1 / (frequence * 2),
          repeat: Infinity,
          ease: "linear"
        }
      });
    } else {
      controles.stop();
    }
  }, [frequence, enMarche, controles]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Activity className="w-8 h-8 mr-3 text-blue-500" />
        Simulateur de fréquence
      </h3>

      {/* Visualisation */}
      <div className="relative h-64 mb-6 bg-black/30 rounded-xl overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16"
          animate={controles}
        >
          <div className="w-full h-full border-4 border-blue-500 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-2 h-16 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"></div>
          </div>
        </motion.div>
        
        {/* Mesures */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
          <div className="text-sm text-slate-400">Fréquence</div>
          <div className="text-2xl font-bold text-white">{frequence} Hz</div>
          <div className="text-sm text-slate-400">{frequence * 2} batt./sec</div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Fréquence (Hz)</label>
          <input
            type="range"
            min="2.5"
            max="5"
            step="0.5"
            value={frequence}
            onChange={(e) => setFrequence(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>2.5</span>
            <span>4.0</span>
            <span>5.0</span>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <label className="text-sm text-slate-400 block">Alternances/heure</label>
          <div className="text-xl font-bold text-blue-400">{frequence * 7200}</div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <label className="text-sm text-slate-400 block">Période (ms)</label>
          <div className="text-xl font-bold text-green-400">{Math.round(1000 / (frequence * 2))}</div>
        </div>
      </div>

      <button
        onClick={() => setEnMarche(!enMarche)}
        className={`mt-6 w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
          enMarche 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {enMarche ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        {enMarche ? 'Arrêter' : 'Démarrer'} l'oscillation
      </button>
    </div>
  );
};

// Timeline historique
const TimelineHistorique = () => {
  const evenements = [
    {
      annee: '1675',
      titre: 'Invention par Huygens',
      desc: 'Christiaan Huygens invente le balancier-spiral, remplaçant le balancier sans ressort ou le pendule.',
      icon: Award,
      couleur: 'text-amber-500'
    },
    {
      annee: '1795',
      titre: 'Spiral Breguet par Abraham-Louis Breguet',
      desc: 'Invention du spiral relevé (Breguet) pour améliorer l\'isochronisme par développement concentrique.',
      icon: Users,
      couleur: 'text-purple-500'
    },
    {
      annee: '1931',
      titre: 'Invar puis Nivarox',
      desc: 'Découverte d\'alliages à faible coefficient thermique (Invar 36% Ni), puis Nivarox (Ni-Cr-Co).',
      icon: Thermometer,
      couleur: 'text-blue-500'
    },
    {
      annee: '2000',
      titre: 'Spiral silicium',
      desc: 'Patek Philippe introduit le spiral Silinvar en silicium monocristallin (totalement antimagnétique).',
      icon: Microscope,
      couleur: 'text-green-500'
    },
    {
      annee: '2017',
      titre: 'Oscillateur monolithique',
      desc: 'TAG Heuer présente l\'oscillateur monolithique (balancier et spiral d\'une pièce) pour 500 Hz.',
      icon: Zap,
      couleur: 'text-red-500'
    }
  ];

  const [etapeActive, setEtapeActive] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
        <Calendar className="w-8 h-8 mr-3 text-blue-600" />
        Histoire du balancier-spiral
      </h2>

      <div className="relative">
        {/* Ligne du temps */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

        {evenements.map((evt, i) => {
          const Icon = evt.icon;
          return (
            <motion.div
              key={evt.annee}
              className="relative flex items-start mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              {/* Point sur la ligne */}
              <div className={`absolute left-6 w-4 h-4 ${evt.couleur} bg-current rounded-full ring-4 ring-white dark:ring-slate-800 z-10`}></div>

              {/* Contenu */}
              <div className="ml-16 flex-1">
                <button
                  onClick={() => setEtapeActive(etapeActive === i ? null : i)}
                  className="text-left w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className={`w-6 h-6 mr-3 ${evt.couleur}`} />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {evt.annee} - {evt.titre}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: etapeActive === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Info className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{evt.desc}</p>
                </button>

                <AnimatePresence>
                  {etapeActive === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
                    >
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <strong>Impact :</strong> {evt.annee === '1675' && 'Révolutionne la précision horlogère, passant de ±15 min/jour à ±1 min/jour.'}
                        {evt.annee === '1795' && 'Améliore l\'isochronisme de 30%, crucial pour les montres de poche.'}
                        {evt.annee === '1931' && 'Réduit la variation de marche due à la température de 95%.'}
                        {evt.annee === '2000' && 'Supprime totalement les effets du magnétisme sur le spiral.'}
                        {evt.annee === '2017' && 'Ouvre la voie aux montres mécaniques à très haute fréquence.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Données du quiz enrichies
const quizData = [
  {
    question: "Quelle est la fonction principale du balancier-spiral ?",
    options: ["Stocker l'énergie", "Régler la vitesse et assurer la précision", "Afficher l'heure", "Transmettre l'énergie"],
    correctAnswer: 1,
    explanation: "Le balancier-spiral est l'organe réglant de la montre. Il oscille à fréquence constante et détermine la vitesse à laquelle l'énergie est libérée, assurant ainsi la précision.",
    image: "/images/balancier-spiral-fonction.png"
  },
  {
    question: "Quelle est la fréquence d'oscillation la plus courante pour un balancier moderne ?",
    options: ["18'000 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
    correctAnswer: 2,
    explanation: "La fréquence de 28'800 alternances par heure (4 Hz) est la plus répandue. Cela correspond à 8 battements par seconde, offrant un bon compromis entre précision et consommation d'énergie.",
    image: "/images/frequence-28800.png"
  },
  {
    question: "De quel matériau moderne est fabriqué le spiral antimagnétique ?",
    options: ["Acier trempé", "Nivaflex (Ni-Cr-Co-Ti-Be)", "Laiton", "Rubis"],
    correctAnswer: 1,
    explanation: "Le Nivaflex et le Nivarox (alliages Ni-Cr-Co-Ti-Be) ont remplacé l'acier classique. Ils sont antimagnétiques, insensibles aux variations de température et ne nécessitent pas de compensation.",
    image: "/images/spiral-nivarox.png"
  },
  {
    question: "Comment agit-on pour régler l'avance ou le retard d'une montre ?",
    options: ["On change le ressort", "On déplace la raquette pour modifier la longueur active du spiral", "On change le balancier", "On ajuste l'échappement"],
    correctAnswer: 1,
    explanation: "Le réglage se fait via la raquette (ou système de réglage fin). En la déplaçant, on modifie la longueur active du spiral, ce qui change sa fréquence d'oscillation et donc l'avance/retard de la montre.",
    image: "/images/reglage-raquette.png"
  },
  {
    question: "Qu'est-ce qui caractérise un spiral Breguet ?",
    options: ["Il est plat", "Sa spire externe est relevée pour assurer un développement concentrique", "Il est en silicium", "Il n'a pas de courbe terminale"],
    correctAnswer: 1,
    explanation: "Le spiral Breguet possède une courbe terminale relevée (spire externe) qui permet un développement concentrique du spiral lors de l'oscillation, améliorant ainsi la précision et l'isochronisme.",
    image: "/images/spiral-breguet.png"
  },
  {
    question: "Qu'est-ce que l'amplitude dans un balancier-spiral ?",
    options: ["La vitesse de rotation", "L'angle maximal d'oscillation", "La masse du balancier", "La longueur du spiral"],
    correctAnswer: 1,
    explanation: "L'amplitude est l'angle maximal parcouru par le balancier depuis sa position d'équilibre. Une amplitude idéale est entre 270° et 330° pour la plupart des montres.",
    image: "/images/amplitude-balancier.png"
  },
  {
    question: "Quel matériau est utilisé pour les balanciers haut de gamme modernes ?",
    options: ["Acier inoxydable", "Glucydur (Cuivre-Béryllium)", "Laiton", "Plastique"],
    correctAnswer: 1,
    explanation: "Le Glucydur (alliage CuBe) est le standard moderne : antimagnétique, faible dilatation thermique, excellente stabilité dans le temps.",
    image: "/images/balancier-glucydur.png"
  },
  {
    question: "Qu'est-ce que l'isochronisme ?",
    options: ["La régularité quelle que soit l'amplitude", "La résistance au magnétisme", "La précision absolue", "La durée de vie du spiral"],
    correctAnswer: 0,
    explanation: "L'isochronisme est la propriété du balancier-spiral à osciller à la même fréquence quelle que soit l'amplitude, garantissant une précision constante.",
    image: "/images/isochronisme.png"
  },
  {
    question: "Pourquoi le silicium est-il révolutionnaire pour les spiraux ?",
    options: ["Plus brillant", "Totalement antimagnétique et insensible à la température", "Moins cher", "Plus traditionnel"],
    correctAnswer: 1,
    explanation: "Le silicium monocristallin est totalement antimagnétique, insensible aux variations de température, et ne nécessite aucun lubrifiant, améliorant considérablement la précision et la fiabilité.",
    image: "/images/spiral-silicium.png"
  },
  {
    question: "Quel est le défaut d'un spiral plat par rapport au spiral Breguet ?",
    options: ["Moins esthétique", "Prix plus élevé", "Développement non concentrique aux grandes amplitudes", "Moins résistant"],
    correctAnswer: 2,
    explanation: "Le spiral plat peut avoir un développement non concentrique aux grandes amplitudes, ce qui affecte l'isochronisme. Le spiral Breguet avec sa spire relevée corrige ce défaut.",
    image: "/images/spiral-plat-vs-breguet.png"
  }
];

// Comparateur de matériaux interactif
const ComparateurMateriaux = () => {
  const materiaux = [
    {
      nom: 'Acier traditionnel',
      periode: '1880-1930',
      avantages: ['Bon marché', 'Facile à usiner'],
      inconvenients: ['Magnétique', 'Corrodable', 'Sensibilité thermique'],
      precision: 65,
      couleur: 'bg-slate-500'
    },
    {
      nom: 'Glucydur (CuBe)',
      periode: '1931-Auj.',
      avantages: ['Antimagnétique', 'Stable thermiquement', 'Durable'],
      inconvenients: ['Coût élevé', 'Procédé complexe'],
      precision: 85,
      couleur: 'bg-blue-500'
    },
    {
      nom: 'Silicium (Si)',
      periode: '2000-Auj.',
      avantages: ['Parfaitement isochrone', 'Antimagnétique total', 'Sans lubrification'],
      inconvenients: ['Très fragile', 'Coût très élevé'],
      precision: 95,
      couleur: 'bg-purple-500'
    }
  ];

  const [materiauActif, setMateriauActif] = useState(1);

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
        <Layers className="w-8 h-8 mr-3 text-blue-600" />
        Évolution des matériaux
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {materiaux.map((mat, i) => (
          <motion.button
            key={mat.nom}
            className={`p-6 rounded-xl border-2 transition-all ${
              materiauActif === i 
                ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-xl scale-105' 
                : 'border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setMateriauActif(i)}
          >
            <div className={`w-full h-2 ${mat.couleur} rounded-full mb-3`}></div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{mat.nom}</h3>
            <p className="text-xs text-slate-500 mb-3">{mat.periode}</p>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{mat.precision}%</div>
            <div className="text-xs text-slate-400">Précision</div>
          </motion.button>
        ))}
      </div>

      {/* Détail du matériau sélectionné */}
      <AnimatePresence mode="wait">
        <motion.div
          key={materiauActif}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                {materiaux[materiauActif].nom}
              </h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-green-600 font-semibold">✓ Avantages :</span>
                  <ul className="ml-4 text-slate-700 dark:text-slate-300">
                    {materiaux[materiauActif].avantages.map((av, i) => (
                      <li key={i}>• {av}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm">
                  <span className="text-red-600 font-semibold">✗ Inconvénients :</span>
                  <ul className="ml-4 text-slate-700 dark:text-slate-300">
                    {materiaux[materiauActif].inconvenients.map((inc, i) => (
                      <li key={i}>• {inc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke={materiauActif === 0 ? '#64748b' : materiauActif === 1 ? '#3b82f6' : '#8b5cf6'}
                    strokeWidth="16"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (100 - materiaux[materiauActif].precision) / 100}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {materiaux[materiauActif].precision}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Composant principal de la page
export default function BalancierSpiral() {
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero avec balancier animé */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-3 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-bold mb-6 flex items-center justify-center mx-auto w-fit">
            <Gauge className="w-5 h-5 mr-2" />
            Organe réglant • Maître du tempo
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Le Balancier-Spiral
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8">
            Découvrez le cœur oscillant de la montre mécanique : un système qui bat 8 fois par seconde avec une précision extrême
          </p>

          {/* Animation balancier dans le hero */}
          <motion.div
            className="inline-block mb-8"
            animate={{ rotate: [-15, 15, -15] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 border-8 border-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/30">
              <div className="w-1 h-24 bg-gradient-to-t from-blue-900 to-blue-400 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Anatomie 3D */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Layers className="w-8 h-8 mr-3 text-blue-600" />
            Anatomie interactive du balancier
          </h2>
          <Anatomie3DBalancier />
        </motion.section>

        {/* Principe et fonction */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-200 dark:border-slate-700"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Principe de l'oscillateur mécanique
              </h2>
              <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300">
                <p>
                  Le <strong>balancier-spiral</strong> est le <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 px-2 py-1 rounded font-bold">métronome de la montre</span>. 
                  Il bat le tempo avec une régularité exceptionnelle, garantissant la précision du mouvement.
                </p>
                <p>
                  Ce système combine deux forces : l'<strong>inertie du balancier</strong> (masse en rotation) 
                  et la <strong>rigidité du spiral</strong> (force de rappel élastique).
                </p>
                <p className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 rounded-r-lg">
                  <strong>💡 Loi de Hooke appliquée :</strong> La période d'oscillation ne dépend que de la rigidité du spiral 
                  et du moment d'inertie du balancier, pas de l'amplitude (en théorie).
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
                <h3 className="text-white font-bold mb-4">Cycle d'oscillation</h3>
                <svg viewBox="0 0 200 100" className="w-full">
                  <motion.path
                    d="M20 50 Q100 20 180 50"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    animate={{ d: ["M20 50 Q100 20 180 50", "M20 50 Q100 80 180 50", "M20 50 Q100 20 180 50"] }}
                    transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <circle cx="20" cy="50" r="4" fill="#10B981" />
                  <circle cx="180" cy="50" r="4" fill="#EF4444" />
                </svg>
                <div className="flex justify-between text-white text-sm mt-4">
                  <span>Position d'équilibre</span>
                  <span>Amplitude max</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Simulateur de fréquence */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-green-600" />
            Simulateur interactif de fréquence
          </h2>
          <SimulateurFrequence />
        </motion.section>

        {/* Le balancier en détail */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-purple-600" />
            Anatomie détaillée du balancier
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Schéma technique avec zones cliquables */}
            <div className="relative">
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
                <svg viewBox="0 0 200 200" className="w-full h-80">
                  {/* Serge */}
                  <motion.circle
                    cx="100" cy="100" r="70"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="8"
                    className="cursor-pointer"
                    whileHover={{ strokeWidth: 12, stroke: "#3B82F6" }}
                  />
                  {/* Bras */}
                  <motion.line
                    x1="100" y1="100" x2="170" y2="170"
                    stroke="#64748B" strokeWidth="4"
                    className="cursor-pointer"
                    whileHover={{ strokeWidth: 6, stroke: "#10B981" }}
                  />
                  {/* Spiral */}
                  <motion.path
                    d="M100 30 Q120 50, 100 70 Q80 90, 100 110 Q120 130, 100 150"
                    stroke="#EAB308" strokeWidth="2" fill="none"
                    className="cursor-pointer"
                    whileHover={{ strokeWidth: 4, stroke: "#F59E0B" }}
                  />
                </svg>
              </div>
              <p className="text-sm text-slate-500 text-center mt-4">Survolez les zones pour voir les détails</p>
            </div>

            {/* Matériaux modernes */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Matériaux révolutionnaires</h3>
              
              <div className="space-y-4">
                {[
                  {
                    mat: 'Glucydur (CuBe)',
                    desc: 'Alliage Cuivre-Béryllium. Antimagnétique, faible dilatation thermique, résistant.',
                    periode: '1950 - Aujourd\'hui',
                    icon: <Thermometer className="w-5 h-5 text-blue-500" />
                  },
                  {
                    mat: 'Titane Grade 5',
                    desc: 'Alliage Ti-Al6-V4. Ultra-léger, excellente résistance aux chocs.',
                    periode: '2000 - Aujourd\'hui',
                    icon: <Zap className="w-5 h-5 text-green-500" />
                  },
                  {
                    mat: 'Silicium monocristallin',
                    desc: 'Produit par photolithographie. Totalement antimagnétique, parfaitement isochrone.',
                    periode: '2010 - Aujourd\'hui',
                    icon: <Magnet className="w-5 h-5 text-purple-500" />
                  },
                  {
                    mat: 'Oscillateur monolithique',
                    desc: 'Balancier et spiral d\'une seule pièce. Fréquences records (500 Hz).',
                    periode: '2017 - Future',
                    icon: <Award className="w-5 h-5 text-red-500" />
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.mat}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white ml-2">{item.mat}</h4>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{item.desc}</p>
                    <p className="text-xs text-slate-500">{item.periode}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Timeline historique */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <TimelineHistorique />
        </motion.section>

        {/* Comparateur de matériaux */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ComparateurMateriaux />
        </motion.section>

        {/* Fréquences d'oscillation */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
            Fréquences d'oscillation : le choix de la précision
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { hz: '2.5 Hz', a_h: '18\'000', desc: 'Traditionnel', usage: 'Montres vintage' },
              { hz: '3 Hz', a_h: '21\'600', desc: 'Classique', usage: 'ETA 6497, Valjoux 7750' },
              { hz: '4 Hz', a_h: '28\'800', desc: 'Standard moderne', usage: 'Majorité des montres actuelles' },
              { hz: '5 Hz', a_h: '36\'000', desc: 'Haute fréquence', usage: 'Zenith El Primero' }
            ].map((freq, i) => (
              <motion.div
                key={freq.hz}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-blue-200 dark:border-slate-700 text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{freq.hz}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{freq.a_h} A/h</div>
                <div className="text-xs text-slate-500">{freq.desc}</div>
                <div className="text-xs text-slate-500 mt-2">{freq.usage}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Formule de conversion
            </h4>
            <div className="font-mono text-sm bg-white dark:bg-slate-800 p-4 rounded-lg">
              <p>Fréquence (Hz) = Alternances/heure ÷ 7 200</p>
              <p>Battements/seconde = Fréquence (Hz) × 2</p>
            </div>
          </div>
        </motion.section>

        {/* Vocabulaire technique */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
            Vocabulaire technique du maître horloger
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { terme: 'Amplitude', def: 'Angle maximal en degrés depuis la position d\'équilibre (270-330° idéal)', icon: Gauge },
              { terme: 'Isochronisme', def: 'Régularité de la fréquence quelle que soit l\'amplitude d\'oscillation', icon: Activity },
              { terme: 'Raquette', def: 'Levier de réglage qui modifie la longueur active du spiral', icon: Sliders },
              { terme: 'Virole', def: 'Pièce qui serre l\'extrémité interne du spiral sur l\'axe', icon: Settings },
              { terme: 'Dérive thermique', def: 'Variation de fréquence due à la température (compensée par Nivarox)', icon: Thermometer },
              { terme: 'Free-sprung', def: 'Système sans raquette, réglage par masselottes sur le balancier', icon: Target },
              { terme: 'Piton', def: 'Point d\'attache du spiral externe sur le coq', icon: Info },
              { terme: 'Col de cygne', def: 'Courbe terminale du spiral Breguet relevée', icon: RotateCw },
              { terme: 'Moment d\'inertie', def: 'Résistance à l\'accélération angulaire (J = mr²)', icon: Zap }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.terme}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <Icon className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.terme}</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{item.def}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Quiz premium */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 mb-16 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-white flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
              Masterclass Quiz
            </h2>
            <div className="text-white text-sm bg-slate-700 px-4 py-2 rounded-full">
              Expert Level
            </div>
          </div>

          {!quizCompleted ? (
            <>
              {/* Barre de progression premium */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-white">
                  <span className="text-sm font-medium">
                    Question {currentQuestion + 1} / {quizData.length}
                  </span>
                  <span className="text-sm font-medium">
                    Score : {score} pts
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question avec image */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                {quizData[currentQuestion].image && (
                  <div className="w-full h-48 bg-slate-700 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                    <Image
                      src={quizData[currentQuestion].image}
                      alt="Illustration technique"
                      width={300}
                      height={200}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute text-slate-400 text-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Chargement...
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-8">
                  {quizData[currentQuestion].question}
                </h3>
              </motion.div>

              {/* Options */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {quizData[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      selectedAnswer === null
                        ? 'bg-slate-800 border-slate-600 hover:border-blue-500 hover:bg-slate-700'
                        : index === quizData[currentQuestion].correctAnswer
                        ? 'bg-green-900/30 border-green-500'
                        : selectedAnswer === index
                        ? 'bg-red-900/30 border-red-500'
                        : 'bg-slate-800 border-slate-600 opacity-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                        selectedAnswer === null
                          ? 'border-slate-500'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-500'
                          : 'border-slate-500'
                      }`}>
                        {selectedAnswer !== null && (
                          <CheckCircle className={`w-5 h-5 ${
                            index === quizData[currentQuestion].correctAnswer || selectedAnswer === index
                              ? 'text-white'
                              : 'text-slate-500'
                          }`} />
                        )}
                      </div>
                      <div>
                        <span className={`font-semibold ${
                          selectedAnswer === null
                            ? 'text-white'
                            : index === quizData[currentQuestion].correctAnswer
                            ? 'text-green-400'
                            : selectedAnswer === index
                            ? 'text-red-400'
                            : 'text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <p className={`ml-3 text-white mt-1 ${
                          selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer
                            ? 'line-through opacity-60'
                            : ''
                        }`}>{option}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Explication et bouton suivant */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="bg-blue-900/30 border border-blue-500 rounded-xl p-6 mb-6">
                      <div className="flex items-start">
                        {selectedAnswer === quizData[currentQuestion].correctAnswer ? 
                          <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /> :
                          <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                        }
                        <div>
                          <h4 className={`font-bold text-lg mb-2 ${
                            selectedAnswer === quizData[currentQuestion].correctAnswer ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {selectedAnswer === quizData[currentQuestion].correctAnswer ? 'Exact !' : 'Presque...'}
                          </h4>
                          <p className="text-slate-300">{quizData[currentQuestion].explanation}</p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleNextQuestion}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
                    >
                      {currentQuestion < quizData.length - 1 ? 
                        <>Question suivante <Trophy className="w-5 h-5" /></> : 
                        <>Voir les résultats <Award className="w-5 h-5" /></>
                      }
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            // Résultats finaux
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-yellow-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <span className="text-5xl font-bold text-white">{pourcentageScore}%</span>
              </motion.div>

              <h3 className="text-4xl font-bold text-white mb-4">
                {pourcentageScore >= 80 ? 'Maître Horloger !' : 
                 pourcentageScore >= 60 ? 'Expert Confirmé' : 
                 'Apprenti Horloger'}
              </h3>
              
              <p className="text-xl text-slate-300 mb-8">
                Score final : {score} / {quizData.length} ({pourcentageScore}%)
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Recommencer
                </button>
                <Link 
                  href="/theorie"
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Autres leçons
                </Link>
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 bg-slate-800 rounded-full px-6 py-3 border border-slate-600"
              >
                <Award className={`w-6 h-6 ${
                  pourcentageScore >= 80 ? 'text-yellow-500' : 
                  pourcentageScore >= 60 ? 'text-blue-500' : 'text-slate-500'
                }`} />
                <span className="text-white font-medium">
                  {pourcentageScore >= 80 ? 'Badge Maître Horloger obtenu !' : 
                   pourcentageScore >= 60 ? 'Badge Expert obtenu !' : 
                   'Continuez votre apprentissage !'}
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
