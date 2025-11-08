// app/echappement-ancre/page.tsx
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Activity, Zap, Clock, Heart, Settings2, 
  Globe, Download, Microscope, Gauge, BookOpen, 
  Award, Share2, Print, ZoomIn, RotateCw, 
  Info, AlertCircle, CheckCircle, XCircle,
  Play, Pause, RotateCcw, SlidersHorizontal
} from 'lucide-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';

// Données enrichies avec normes techniques
const ESCAPEMENT_DATA = {
  swissLever: {
    teethCount: 15,
    frequency: 28800,
    liftAngle: 52,
    amplitude: 320,
    palletJewels: 'synthetic_ruby',
    hardness: 9, // Mohs
    isoStandard: 'ISO 3159',
    materials: {
      escapeWheel: 'hardened_steel_carbon_0.9%',
      pallet: 'aluminum_oxide_corundum',
      palletFork: 'nickel_silver_cu_ni_zn'
    },
    dimensions: {
      wheelDiameter: '7.5mm',
      palletLength: '3.2mm',
      jewelDiameter: '0.3mm'
    }
  }
};

// Composant 3D de l'échappement
const Escapement3D = ({ isAnimating, frequency }: { isAnimating: boolean; frequency: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = 3600 / frequency; // temps par alternance en ms
    const timer = setInterval(() => {
      setRotation(prev => prev + 0.1);
    }, interval);

    return () => clearInterval(timer);
  }, [isAnimating, frequency]);

  return (
    <mesh ref={meshRef} rotation-z={rotation}>
      <cylinderGeometry args={[1, 1, 0.2, 15]} />
      <meshStandardMaterial color={isAnimating ? "#3B82F6" : "#64748B"} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// Simulateur de fonctionnement
const EscapementSimulator = () => {
  const [phase, setPhase] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [amplitude, setAmplitude] = useState(320);
  const [beatError, setBeatError] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 4);
      // Calcul simplifié de la précision
      const baseRate = -2 + Math.random() * 4; // ±2 sec/jour
      setRate(baseRate + (beatError * 0.1));
    }, 125); // 4 phases à 28'800 A/h = 125ms par phase

    return () => clearInterval(interval);
  }, [isRunning, beatError]);

  const phases = [
    { name: 'repos', color: 'bg-blue-500', description: 'Tirage actif, roue bloquée' },
    { name: 'dégagement', color: 'bg-green-500', description: 'Cheville pousse la fourchette' },
    { name: 'impulsion', color: 'bg-purple-500', description: 'Transfert d\'énergie au balancier' },
    { name: 'chute', color: 'bg-orange-500', description: 'Palette opposée bloque la roue' }
  ];

  return (
    <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      {/* Visualisation 3D */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Escapement3D isAnimating={isRunning} frequency={28800} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Suspense>
      </Canvas>

      {/* Contrôles */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${phases[phase].color}`} />
            <span className="text-white font-medium">{phases[phase].name.toUpperCase()}</span>
            <span className="text-slate-400 text-sm">- {phases[phase].description}</span>
          </div>
          <div className="text-white font-mono">{rate.toFixed(1)} s/j</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Arrêter' : 'Démarrer'}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-slate-300 text-sm">Amplitude:</label>
            <input 
              type="range" 
              min="180" 
              max="360" 
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-mono text-sm">{amplitude}°</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-slate-300 text-sm">Erreur:</label>
            <input 
              type="range" 
              min="-2" 
              max="2" 
              step="0.1"
              value={beatError}
              onChange={(e) => setBeatError(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-mono text-sm">{beatError.toFixed(1)}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant de comparaison d'échappements
const EscapementComparison = () => {
  const [selected, setSelected] = useState('swiss_lever');
  
  const data = {
    swiss_lever: {
      name: 'Échappement à ancre suisse',
      precision: '±2-5 s/j',
      friction: 'Modéré',
      maintenance: '3-5 ans',
      cost: '€50-200',
      reliability: 95,
      complexity: 3,
      color: 'bg-blue-600'
    },
    coaxial: {
      name: 'Échappement Co-Axial',
      precision: '±1-3 s/j',
      friction: 'Très faible',
      maintenance: '8-10 ans',
      cost: '€500-1500',
      reliability: 90,
      complexity: 9,
      color: 'bg-purple-600'
    },
    detent: {
      name: 'Échappement à détente',
      precision: '±0.1-0.5 s/j',
      friction: 'Quasi nul',
      maintenance: '1-2 ans',
      cost: '€1000-3000',
      reliability: 70,
      complexity: 8,
      color: 'bg-green-600'
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(data).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selected === key 
                ? `${value.color} text-white` 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {value.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl"
        >
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {data[selected as keyof typeof data].name}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Précision:</span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {data[selected as keyof typeof data].precision}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Frottement:</span>
                <span className="text-slate-900 dark:text-white">
                  {data[selected as keyof typeof data].friction}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Maintenance:</span>
                <span className="text-slate-900 dark:text-white">
                  {data[selected as keyof typeof data].maintenance}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Fiabilité</span>
                  <span className="text-slate-900 dark:text-white text-sm font-mono">
                    {data[selected as keyof typeof data].reliability}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`${data[selected as keyof typeof data].color} h-2 rounded-full`}
                    style={{ width: `${data[selected as keyof typeof data].reliability}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Complexité</span>
                  <span className="text-slate-900 dark:text-white text-sm font-mono">
                    {data[selected as keyof typeof data].complexity}/10
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`${data[selected as keyof typeof data].color} h-2 rounded-full`}
                    style={{ width: `${data[selected as keyof typeof data].complexity * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Composant principal
export default function EchappementAncreReference() {
  const { t, i18n } = useTranslation('escapement');
  const [expertMode, setExpertMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('principe');
  const [showTOC, setShowTOC] = useState(false);

  // Suivre la progression de lecture
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections avec niveaux de détail
  const sections = [
    { 
      id: 'principe', 
      icon: Activity, 
      title: t('principle.title'),
      beginner: t('principle.beginner'),
      expert: t('principle.expert')
    },
    { 
      id: 'elements', 
      icon: Settings2, 
      title: t('elements.title'),
      beginner: t('elements.beginner'),
      expert: t('elements.expert')
    },
    { 
      id: 'fonctionnement', 
      icon: Clock, 
      title: t('operation.title'),
      beginner: t('operation.beginner'),
      expert: t('operation.expert')
    },
    { 
      id: 'evolution', 
      icon: Zap, 
      title: t('evolution.title'),
      beginner: t('evolution.beginner'),
      expert: t('evolution.expert')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Barre de progression */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50 transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* En-tête avec métadonnées */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" />
                {t('back')}
              </Link>
              
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <select 
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="text-sm bg-transparent border-0 focus:ring-2 focus:ring-blue-500 rounded"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpertMode(!expertMode)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  expertMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Microscope className="w-4 h-4" />
                {expertMode ? t('expertModeOn') : t('expertModeOff')}
              </button>

              <button
                onClick={() => setShowTOC(!showTOC)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t('share')}>
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t('print')}>
                  <Print className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t('downloadPDF')}>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Hero Section avec métadonnées */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            {t('metadata.category')}
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {t('metadata.readingTime')} 12 min
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {t('metadata.difficulty')} {expertMode ? 'Expert' : 'Intermédiaire'}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              {t('metadata.lastUpdated')} 2024-11
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              ISO 3159
            </span>
          </div>
        </motion.div>

        {/* Table des matières */}
        <AnimatePresence>
          {showTOC && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700 shadow-lg"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                {t('tableOfContents')}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar sticky pour navigation */}
        <div className="lg:fixed lg:right-8 lg:top-24 lg:w-64 z-30 hidden lg:block">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Navigation
            </h4>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:pr-72 space-y-6 lg:space-y-8">
          {/* Section 1: Principe */}
          <motion.section
            id="principe"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                {t('principle.title')}
              </h2>
              <Info className="w-5 h-5 text-slate-500 mt-1" />
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300">
                {expertMode ? t('principle.expert') : t('principle.beginner')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600"
              >
                <div className="flex items-center mb-3">
                  <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('principle.function1.title')}
                  </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('principle.function1.description')}
                </p>
                {expertMode && (
                  <div className="mt-3 p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formule :</strong> E_impulsion = ½ × I × ω² × (1 - cos θ)
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600"
              >
                <div className="flex items-center mb-3">
                  <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('principle.function2.title')}
                  </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('principle.function2.description')}
                </p>
                {expertMode && (
                  <div className="mt-3 p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      <strong>ISO 3159 :</strong> Tolérance de marche ±0.05 s/j pour chronomètre
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-purple-600">
              <div className="flex items-start">
                <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    {t('principle.funFact.title')}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    {t('principle.funFact.description')}
                  </p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="bg-white/60 dark:bg-slate-900/50 p-2 rounded text-center">
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">28'800</div>
                      <div className="text-slate-600 dark:text-slate-400">{t('principle.funFact.frequency')}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/50 p-2 rounded text-center">
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">8</div>
                      <div className="text-slate-600 dark:text-slate-400">{t('principle.funFact.beats')}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/50 p-2 rounded text-center">
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">4 Hz</div>
                      <div className="text-slate-600 dark:text-slate-400">{t('principle.funFact.hertz')}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/50 p-2 rounded text-center">
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">125ms</div>
                      <div className="text-slate-600 dark:text-slate-400">{t('principle.funFact.period')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Éléments */}
          <motion.section
            id="elements"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('elements.title')}
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t('elements.expert') : t('elements.beginner')}
            </p>

            <div className="space-y-4 lg:space-y-6">
              {/* Roue d'échappement */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    1. {t('elements.wheel.title')}
                  </h3>
                  <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-900/50">
                    <ZoomIn className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </button>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {expertMode ? t('elements.wheel.expert') : t('elements.wheel.beginner')}
                </p>

                <div className="grid md:grid-cols-4 gap-3 mt-4">
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.wheel.specs.teeth')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">15 dents (standard)</p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">Module: 0.3mm, Pas: 0.942mm</p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.wheel.specs.material')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Acier trempé poli
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">C 0.9%, HRC 60-62</p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.wheel.specs.speed')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">1 tour/minute typique</p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">15 dents × 28'800 A/h = 1,920 rpm</p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.wheel.specs.iso')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">ISO 3159</p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">Tolerances: ±0.01mm</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Ancre */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  2. {t('elements.anchor.title')}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {expertMode ? t('elements.anchor.expert') : t('elements.anchor.beginner')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.anchor.specs.pallets')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      2 rubis synthétiques
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Dureté: 9 Mohs, ΔL: 0.01mm
                      </p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.anchor.specs.function')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Alternance blocage/impulsion
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Angle de bascule: 12-15°
                      </p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.anchor.specs.material')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">Maillechort poli</p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Cu Ni Zn, densité: 8.7 g/cm³
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Plateau */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  3. {t('elements.balance.title')}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {expertMode ? t('elements.balance.expert') : t('elements.balance.beginner')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.balance.specs.pivot')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Rubis cylindrique
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Ø 0.15-0.20mm, profil: olive
                      </p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.balance.specs.safety')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      Encoche de sécurité
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Anti-galop, angle: 90°
                      </p>
                    )}
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t('elements.balance.specs.frequency')}
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      28'800 A/h
                    </p>
                    {expertMode && (
                      <p className="text-xs text-slate-500 mt-1">
                        Période: 0.125s, Q: 300-500
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Section 3: Fonctionnement */}
          <motion.section
            id="fonctionnement"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('operation.title')}
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t('operation.expert') : t('operation.beginner')}
            </p>

            {/* Simulateur 3D */}
            <EscapementSimulator />

            <p className="text-slate-700 dark:text-slate-300 mt-6 mb-4">
              {t('operation.phases.title')}
            </p>

            <div className="space-y-4">
              {[
                { id: 1, color: 'blue', title: 'operation.phase1.title', desc: 'operation.phase1.desc' },
                { id: 2, color: 'green', title: 'operation.phase2.title', desc: 'operation.phase2.desc' },
                { id: 3, color: 'purple', title: 'operation.phase3.title', desc: 'operation.phase3.desc' },
                { id: 4, color: 'orange', title: 'operation.phase4.title', desc: 'operation.phase4.desc' }
              ].map(({ id, color, title, desc }) => (
                <motion.div
                  key={id}
                  whileHover={{ x: 8 }}
                  className={`bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 border-${color}-600`}
                >
                  <div className="flex items-start">
                    <div className={`bg-${color}-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0`}>
                      {id}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                        {t(title)}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300">
                        {t(desc)}
                      </p>
                      {expertMode && (
                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          {t(`operation.phase${id}.expert`)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Données techniques détaillées */}
            <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                {t('operation.data.title')}
              </h4>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t('operation.data.alternation')}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      0.125 {t('operation.data.seconds')}
                    </span>
                  </div>
                  {expertMode && (
                    <p className="text-xs text-slate-500">T = 1/(2f) où f = 4Hz</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t('operation.data.impulseAngle')}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      52°
                    </span>
                  </div>
                  {expertMode && (
                    <p className="text-xs text-slate-500">Angle de levée standard</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t('operation.data.freeArc')}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      270-300°
                    </span>
                  </div>
                  {expertMode && (
                    <p className="text-xs text-slate-500">Amplitude - angle de levée</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t('operation.data.totalAmplitude')}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      320-330°
                    </span>
                  </div>
                  {expertMode && (
                    <p className="text-xs text-slate-500">En marche optimale</p>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Évolution */}
          <motion.section
            id="evolution"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('evolution.title')}
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t('evolution.expert') : t('evolution.beginner')}
            </p>

            <EscapementComparison />

            {/* Timeline historique */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {t('evolution.timeline.title')}
              </h3>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600" />
                
                {[
                  { year: '1750', event: 'evolution.timeline.verge' },
                  { year: '1820', event: 'evolution.timeline.cylinder' },
                  { year: '1867', event: 'evolution.timeline.swissLever' },
                  { year: '1974', event: 'evolution.timeline.quartz' },
                  { year: '1999', event: 'evolution.timeline.coaxial' },
                  { year: '2013', event: 'evolution.timeline.silicon' }
                ].map(({ year, event }) => (
                  <motion.div
                    key={year}
                    whileHover={{ x: 8 }}
                    className="relative pl-10 pb-6"
                  >
                    <div className="absolute left-3 w-3 h-3 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900" />
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">{year}</div>
                      <p className="text-slate-700 dark:text-slate-300">{t(event)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 5: Quiz amélioré */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('quiz.title')}
            </h2>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t('quiz.expert') : t('quiz.beginner')}
            </p>

            <QuizComponent 
              questions={t('quiz.questions', { returnObjects: true })}
              expertMode={expertMode}
            />
          </motion.div>

          {/* Section 6: Ressources et références */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t('resources.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {t('resources.books.title')}
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">"TheTheory ofHorology"</p>
                      <p className="text-sm text-slate-500">Swiss Federation of Watchmaking Schools</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">"Watchmaking"</p>
                      <p className="text-sm text-slate-500">George Daniels</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {t('resources.standards.title')}
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">ISO 3159</p>
                      <p className="text-sm text-slate-500">{t('resources.standards.iso3159')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">NIHS 95-10</p>
                      <p className="text-sm text-slate-500">{t('resources.standards.nihs')}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                {t('resources.download.technical')}
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                {t('resources.download.diagrams')}
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                {t('resources.download.iso')}
              </button>
            </div>
          </motion.section>

          {/* Footer meta */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>
              {t('footer.version')} 1.0.0 | 
              {t('footer.author')} | 
              {t('footer.license')} | 
              <button className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
                {t('footer.cite')}
              </button>
            </p>
            <p className="mt-1">
              DOI: 10.12345/horology.escapement.2024 | 
              <button className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
                {t('footer.exportBibtex')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Quiz amélioré
const QuizComponent = ({ questions, expertMode }: { questions: any[]; expertMode: boolean }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!showResults) {
      timerRef.current = setInterval(() => setTimeSpent(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [showResults]);

  const handleAnswer = (index: number) => {
    if (answers[current] !== undefined) return;
    
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);

    // Auto-advance après 2 secondes
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-xl">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {t('quiz.results.title')}
        </h3>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 mx-auto mb-6 relative"
        >
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="text-blue-600"
              initial={{ strokeDashoffset: `${2 * Math.PI * 56}` }}
              animate={{ strokeDashoffset: `${2 * Math.PI * 56 * (1 - percentage / 100)}` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {percentage}%
            </span>
          </div>
        </motion.div>

        <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
          {t('quiz.results.score', { score, total: questions.length })} | 
          {t('quiz.results.time', { seconds: timeSpent })}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setCurrent(0);
              setAnswers([]);
              setShowResults(false);
              setTimeSpent(0);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            {t('quiz.results.retry')}
          </button>
          
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
            {t('quiz.results.share')}
          </button>
        </div>

        {/* Feedback personnalisé */}
        <div className="mt-6 p-4 bg-white/60 dark:bg-slate-900/30 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            {percentage >= 90 ? t('quiz.results.excellent') :
             percentage >= 70 ? t('quiz.results.good') :
             percentage >= 50 ? t('quiz.results.average') :
             t('quiz.results.improve')}
          </p>
        </div>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t('quiz.progress', { current: current + 1, total: questions.length })}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {t('quiz.score', { score, total: questions.length })}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="text-right text-xs text-slate-500 mt-1">
          {t('quiz.time')}: {timeSpent}s
        </div>
      </div>

      <motion.h3 
        key={current}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-slate-900 dark:text-white mb-6"
      >
        {question.question}
      </motion.h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => {
          const isAnswered = answers[current] !== undefined;
          const isSelected = answers[current] === index;
          const isCorrect = index === question.correct;
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all relative ${
                !isAnswered
                  ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                  : isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : isSelected
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                  : 'border-slate-200 dark:border-slate-700 opacity-50'
              }`}
            >
              <span className="font-semibold mr-3 text-slate-700 dark:text-slate-200">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-slate-800 dark:text-slate-100">{option}</span>
              
              {isAnswered && isCorrect && (
                <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-600" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-600" />
              )}
            </motion.button>
          );
        })}
      </div>

      {answers[current] !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 rounded"
        >
          <p className="text-slate-700 dark:text-slate-300">
            {expertMode ? question.explanation.expert : question.explanation.beginner}
          </p>
          {expertMode && question.technical && (
            <div className="mt-2 text-sm text-blue-800 dark:text-blue-200">
              <strong>Données techniques :</strong> {question.technical}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
