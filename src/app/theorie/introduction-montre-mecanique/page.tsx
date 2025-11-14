'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch, 
  RotateCw, Trophy, BookOpen, Zap, TrendingUp, Award,
  Play, Pause, SkipForward, CheckCircle, XCircle, Lightbulb,
  Star, GraduationCap, Target, ArrowRight
} from 'lucide-react';

// ============================================
// COMPOSANT AMÉLIORÉ : Animation de montre 3D
// ============================================
const AnimationMontre = () => {
  const [vitesse, setVitesse] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 border-2 border-blue-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Watch className="w-7 h-7" />
          Montre en Action
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg font-bold transition-all bg-white/10 text-white hover:bg-white/20"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          {[0.5, 1, 2].map(v => (
            <button
              key={v}
              onClick={() => setVitesse(v)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                vitesse === v 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {v}x
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Cadran de la montre avec détails réalistes */}
        <div className="relative">
          {/* Boîtier externe 3D */}
          <div className="absolute -inset-8 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-2xl">
            <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
          </div>

          {/* Cadran principal */}
          <div className="relative w-72 h-72 bg-gradient-to-br from-white to-slate-100 rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden">
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
                    className={`mx-auto ${isMainHour ? 'w-1.5 h-8 bg-slate-900' : 'w-1 h-5 bg-slate-700'} rounded-full`}
                    style={{ marginTop: '8px' }}
                  />
                  {isMainHour && (
                    <div 
                      className="text-center font-bold text-slate-900 mt-2"
                      style={{
                        transform: `rotate(-${i * 30}deg)`,
                        fontSize: '18px'
                      }}
                    >
                      {i === 0 ? 12 : i}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sous-cadran secondes (à 6h) */}
            <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-16 h-16 border-2 border-slate-300 rounded-full bg-white/50 shadow-inner">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-2 bg-slate-400 left-1/2 top-0 -translate-x-1/2"
                  style={{
                    transform: `translateX(-50%) rotate(${i * 90}deg)`,
                    transformOrigin: 'center 32px'
                  }}
                />
              ))}
              {/* Aiguille sous-cadran */}
              <motion.div
                className="absolute w-0.5 h-6 bg-blue-600 rounded-full origin-bottom left-1/2 top-1/2 -translate-x-1/2"
                animate={isRunning ? { rotate: 360 } : {}}
                transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Logo/marque (à 12h) */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
              <div className="text-xs font-bold text-slate-700 tracking-wider">AUTOMATIC</div>
              <div className="text-[10px] text-slate-500">SWISS MADE</div>
            </div>

            {/* Aiguille des heures avec luminova */}
            <motion.div
              className="absolute w-2 bg-gradient-to-t from-slate-900 to-slate-700 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg"
              style={{ 
                height: '80px',
                transform: 'translateX(-50%) translateY(-100%)',
              }}
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 43200 / vitesse, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-green-300 rounded-full opacity-70"></div>
            </motion.div>

            {/* Aiguille des minutes avec luminova */}
            <motion.div
              className="absolute w-1.5 bg-gradient-to-t from-slate-900 to-slate-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg"
              style={{ 
                height: '110px',
                transform: 'translateX(-50%) translateY(-100%)',
              }}
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 3600 / vitesse, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-green-300 rounded-full opacity-70"></div>
            </motion.div>

            {/* Aiguille des secondes avec contrepoids */}
            <motion.div
              className="absolute w-0.5 bg-red-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg"
              style={{ 
                height: '120px',
                transform: 'translateX(-50%) translateY(-100%)',
              }}
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 60 / vitesse, repeat: Infinity, ease: "linear" }}
            >
              {/* Contrepoids */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-8 bg-red-600 rounded-full"></div>
            </motion.div>

            {/* Axe central 3D */}
            <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg">
              <div className="absolute inset-0.5 bg-slate-700 rounded-full"></div>
            </div>

            {/* Verre saphir (reflet) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </div>

          {/* Couronne de remontoir */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-8 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-r-lg shadow-lg">
              <div className="w-full h-full flex flex-col justify-around p-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-0.5 bg-slate-800 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Balancier animé à droite avec spiral */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Support du balancier */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-12 bg-gradient-to-r from-amber-700 to-amber-600 rounded shadow-md"></div>
            
            {/* Balancier avec roue */}
            <motion.div
              className="relative w-24 h-24"
              animate={isRunning ? { 
                rotate: [-30, 30, -30]
              } : {}}
              transition={{ 
                duration: 0.6 / vitesse, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              style={{ transformOrigin: 'left center' }}
            >
              {/* Bras du balancier */}
              <div className="absolute left-0 top-1/2 w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full -translate-y-1/2 shadow-md"></div>
              
              {/* Roue du balancier */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-xl border-2 border-amber-400">
                {/* Rayons */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-full bg-amber-700 left-1/2 top-0 -translate-x-1/2 origin-center"
                    style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                  />
                ))}
                {/* Centre doré */}
                <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
              </div>

              {/* Spiral animé en SVG */}
              <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 -translate-x-full" viewBox="0 0 100 100">
                <motion.path
                  d="M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1"
                  animate={isRunning ? {
                    d: [
                      "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40",
                      "M 50 50 Q 50 25, 65 25 T 75 40 T 75 50 T 65 65 T 50 65 T 35 50 T 35 35",
                      "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                    ]
                  } : {}}
                  transition={{
                    duration: 0.6 / vitesse,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </motion.div>
            
            <p className="text-white text-sm mt-4 text-center font-bold">Balancier-Spiral</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 hover:bg-white/20 transition-all">
          <p className="text-blue-300 text-sm mb-1">Fréquence</p>
          <p className="text-white text-2xl font-bold">4 Hz</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 hover:bg-white/20 transition-all">
          <p className="text-green-300 text-sm mb-1">Alternances/h</p>
          <p className="text-white text-2xl font-bold">28&apos;800</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30 hover:bg-white/20 transition-all">
          <p className="text-amber-300 text-sm mb-1">Réserve</p>
          <p className="text-white text-2xl font-bold">48h</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT AMÉLIORÉ : Schéma des 6 organes avec SVG détaillé
// ============================================
const SchemaMecanisme = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState(null);
  const [animation, setAnimation] = useState(true);
  
  const organes = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet', 
      desc: 'Stocke l\'énergie du ressort moteur. Le ressort se détend progressivement pour alimenter toute la montre pendant 36-48h. C\'est la source d\'énergie primaire.',
      x: 150, y: 300, couleur: '#3B82F6',
      icon: '⚡'
    },
    { 
      id: 'rouage', 
      nom: 'Rouage', 
      desc: 'Ensemble de roues dentées qui transmettent et démultiplient l\'énergie. Chaque roue tourne à une vitesse différente pour créer les rapports nécessaires.',
      x: 300, y: 300, couleur: '#10B981',
      icon: '⚙️'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement', 
      desc: 'L\'ancre et la roue d\'échappement transforment l\'énergie continue en impulsions régulières. C\'est le "tic-tac" de la montre qui régule la libération d\'énergie.',
      x: 500, y: 300, couleur: '#8B5CF6',
      icon: '💓'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral', 
      desc: 'Oscille à fréquence constante (8 fois/seconde pour 28\'800 A/h). C\'est le cœur réglant qui assure la précision temporelle de la montre.',
      x: 700, y: 300, couleur: '#F59E0B',
      icon: '🎯'
    },
    { 
      id: 'remontoir', 
      nom: 'Remontoir', 
      desc: 'Mécanisme permettant de remonter le ressort via la couronne (manuel) ou la masse oscillante (automatique). Recharge l\'énergie du mouvement.',
      x: 400, y: 150, couleur: '#EF4444',
      icon: '🔄'
    },
    { 
      id: 'affichage', 
      nom: 'Affichage', 
      desc: 'Les aiguilles, cadran et système de transmission qui permettent de lire l\'heure visuellement. Interface entre le mouvement et l\'utilisateur.',
      x: 600, y: 150, couleur: '#06B6D4',
      icon: '🕐'
    },
  ], []);

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl overflow-hidden">
      {/* Particules de fond animées */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
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

      {/* Contrôle animation */}
      <button
        onClick={() => setAnimation(!animation)}
        className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
      >
        {animation ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        <span className="text-sm font-medium">{animation ? 'Pause' : 'Play'}</span>
      </button>

      <svg className="w-full h-[500px]" viewBox="0 0 1000 600">
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
        </defs>

        {/* Lignes de connexion animées entre organes */}
        <g opacity="0.6">
          <motion.path
            d="M 150 300 L 300 300"
            stroke="#60A5FA" strokeWidth="3" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={animation ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{ duration: 1.5, repeat: animation ? Infinity : 0 }}
          />
          <motion.path
            d="M 300 300 L 500 300"
            stroke="#60A5FA" strokeWidth="3" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={animation ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: animation ? Infinity : 0 }}
          />
          <motion.path
            d="M 500 300 L 700 300"
            stroke="#60A5FA" strokeWidth="3" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={animation ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1, repeat: animation ? Infinity : 0 }}
          />
          <motion.path
            d="M 400 150 L 150 250"
            stroke="#60A5FA" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={animation ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.5, repeat: animation ? Infinity : 0 }}
          />
          <motion.path
            d="M 300 300 L 600 200"
            stroke="#60A5FA" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)"
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
          <circle cx="150" cy="300" r="60" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="3" filter={organeSelectionne === 'barillet' ? "url(#glow)" : ""} />
          <circle cx="150" cy="300" r="50" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          
          {/* Ressort spiralé animé */}
          <motion.path
            d="M 150 300 Q 150 280, 165 280 T 180 290 T 185 300 T 180 310 T 165 315 T 150 315 T 135 310 T 130 300"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            animate={animation ? { strokeDashoffset: [0, -100] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            strokeDasharray="100"
          />
          
          <circle cx="150" cy="300" r="8" fill="url(#brass-gradient)" />
          
          {/* Dents du barillet */}
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="148" y="240" width="4" height="10" fill="#64748b" transform={`rotate(${i * 30} 150 300)`} />
          ))}
          
          <text x="150" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Barillet</text>
        </g>

        {/* 2. ROUAGE avec roues multiples */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'rouage' ? null : 'rouage')}
          opacity={organeSelectionne && organeSelectionne !== 'rouage' ? 0.4 : 1}
        >
          {/* Grande roue */}
          <g>
            <circle cx="280" cy="300" r="45" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" filter={organeSelectionne === 'rouage' ? "url(#glow)" : ""} />
            {[...Array(16)].map((_, i) => (
              <motion.rect
                key={i}
                x="278" y="255" width="4" height="12" fill="#92400e"
                transform={`rotate(${i * 22.5} 280 300)`}
                animate={animation ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '280px 300px' }}
              />
            ))}
            <circle cx="280" cy="300" r="8" fill="#1e293b" />
          </g>
          
          {/* Petite roue */}
          <g>
            <circle cx="320" cy="280" r="30" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="2" />
            {[...Array(12)].map((_, i) => (
              <motion.rect
                key={i}
                x="318" y="250" width="4" height="10" fill="#92400e"
                transform={`rotate(${i * 30} 320 280)`}
                animate={animation ? { rotate: -360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '320px 280px' }}
              />
            ))}
            <circle cx="320" cy="280" r="6" fill="#1e293b" />
          </g>
          
          <text x="300" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Rouage</text>
        </g>

        {/* 3. ÉCHAPPEMENT avec ancre animée */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'echappement' ? null : 'echappement')}
          opacity={organeSelectionne && organeSelectionne !== 'echappement' ? 0.4 : 1}
        >
          {/* Roue d'échappement */}
          <circle cx="500" cy="300" r="40" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" filter={organeSelectionne === 'echappement' ? "url(#glow)" : ""} />
          
          {/* Dents d'échappement */}
          {[...Array(15)].map((_, i) => (
            <motion.path
              key={i}
              d="M 500 260 L 510 255 L 510 260 Z"
              fill="#92400e"
              transform={`rotate(${i * 24} 500 300)`}
              animate={animation ? { rotate: [0, 24, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.033 }}
              style={{ transformOrigin: '500px 300px' }}
            />
          ))}
          
          <circle cx="500" cy="300" r="10" fill="#1e293b" />
          
          {/* Ancre animée */}
          <motion.g
            animate={animation ? { rotate: [-5, 5, -5] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '500px 330px' }}
          >
            <rect x="495" y="330" width="10" height="40" fill="url(#steel-gradient)" rx="2" />
            <path d="M 485 330 L 485 320 L 515 320 L 515 330 Z" fill="url(#steel-gradient)" />
            <rect x="482" y="318" width="8" height="4" fill="#ef4444" rx="1" />
            <rect x="510" y="318" width="8" height="4" fill="#ef4444" rx="1" />
          </motion.g>
          
          <text x="500" y="390" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Échappement</text>
        </g>

        {/* 4. BALANCIER-SPIRAL avec animation réaliste */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'balancier' ? null : 'balancier')}
          opacity={organeSelectionne && organeSelectionne !== 'balancier' ? 0.4 : 1}
        >
          {/* Support du balancier */}
          <rect x="670" y="260" width="60" height="15" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="2" rx="3" />
          <circle cx="685" cy="267" r="3" fill="#1e293b" />
          <circle cx="715" cy="267" r="3" fill="#1e293b" />
          
          {/* Balancier oscillant */}
          <motion.g
            animate={animation ? { rotate: [-35, 35, -35] } : {}}
            transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '700px 275px' }}
          >
            <line x1="700" y1="275" x2="700" y2="310" stroke="#475569" strokeWidth="2" />
            <circle cx="700" cy="310" r="35" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" filter={organeSelectionne === 'balancier' ? "url(#glow)" : ""} />
            
            {/* Rayons du balancier */}
            {[...Array(8)].map((_, i) => (
              <line key={i} x1="700" y1="310" x2="700" y2="275" stroke="#92400e" strokeWidth="2" transform={`rotate(${i * 45} 700 310)`} />
            ))}
            
            {/* Masses de réglage */}
            {[0, 90, 180, 270].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 700 310)`}>
                <rect x="730" y="308" width="8" height="4" fill="#ef4444" rx="1" />
              </g>
            ))}
            
            <circle cx="700" cy="310" r="8" fill="#1e293b" />
          </motion.g>
          
          {/* Spiral animé */}
          <motion.path
            d="M 700 275 Q 700 270, 705 270 T 712 273 T 715 278 T 715 285 T 710 290 T 700 292"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            animate={animation ? {
              d: [
                "M 700 275 Q 700 270, 705 270 T 712 273 T 715 278 T 715 285 T 710 290 T 700 292",
                "M 700 275 Q 700 268, 708 268 T 718 273 T 720 280 T 720 288 T 712 295 T 700 297",
                "M 700 275 Q 700 270, 705 270 T 712 273 T 715 278 T 715 285 T 710 290 T 700 292"
              ]
            } : {}}
            transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <text x="700" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Balancier-Spiral</text>
        </g>

        {/* 5. REMONTOIR avec masse oscillante */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'remontoir' ? null : 'remontoir')}
          opacity={organeSelectionne && organeSelectionne !== 'remontoir' ? 0.4 : 1}
        >
          {/* Axe de transmission */}
          <rect x="350" y="148" width="80" height="4" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="1" />
          
          {/* Pignon */}
          <circle cx="380" cy="150" r="12" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="2" />
          {[...Array(10)].map((_, i) => (
            <rect key={i} x="378" y="138" width="4" height="6" fill="#92400e" transform={`rotate(${i * 36} 380 150)`} />
          ))}
          
          {/* Masse oscillante rotative */}
          <motion.g
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '430px 150px' }}
          >
            <circle cx="430" cy="150" r="25" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="3" filter={organeSelectionne === 'remontoir' ? "url(#glow)" : ""} />
            
            {/* Denture */}
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="428" y="125" width="4" height="10" fill="#1e293b" transform={`rotate(${i * 30} 430 150)`} />
            ))}
            
            <circle cx="430" cy="150" r="15" fill="#334155" />
            <circle cx="430" cy="150" r="8" fill="#1e293b" />
          </motion.g>
          
          <text x="400" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Remontoir</text>
        </g>

        {/* 6. AFFICHAGE avec aiguilles */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'affichage' ? null : 'affichage')}
          opacity={organeSelectionne && organeSelectionne !== 'affichage' ? 0.4 : 1}
        >
          {/* Cadran */}
          <circle cx="600" cy="150" r="45" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" filter={organeSelectionne === 'affichage' ? "url(#glow)" : ""} />
          
          {/* Index horaires */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="600" y1="110" x2="600" y2="115"
              stroke="#1e293b"
              strokeWidth={i % 3 === 0 ? "3" : "1.5"}
              transform={`rotate(${i * 30} 600 150)`}
            />
          ))}
          
          {/* Aiguille des heures */}
          <motion.line
            x1="600" y1="150" x2="600" y2="130"
            stroke="#1e293b" strokeWidth="4" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 43200, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
          {/* Aiguille des minutes */}
          <motion.line
            x1="600" y1="150" x2="600" y2="120"
            stroke="#475569" strokeWidth="3" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
          {/* Aiguille des secondes */}
          <motion.line
            x1="600" y1="150" x2="600" y2="115"
            stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
          {/* Axe central */}
          <circle cx="600" cy="150" r="5" fill="#1e293b" />
          
          <text x="600" y="210" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Affichage</text>
        </g>
      </svg>

      {/* Zone d'information détaillée */}
      <AnimatePresence>
        {organeSelectionne && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-2xl border-2 border-blue-300 dark:border-blue-600"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{organes.find(o => o.id === organeSelectionne)?.icon}</span>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {organes.find(o => o.id === organeSelectionne)?.nom}
                  </h4>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg">
                  {organes.find(o => o.id === organeSelectionne)?.desc}
                </p>
              </div>
              <button
                onClick={() => setOrganeSelectionne(null)}
                className="ml-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-slate-300 text-center mt-6">
        💡 Cliquez sur un organe pour en savoir plus • {animation ? '⏸️ Animation active' : '▶️ Animation en pause'}
      </p>
    </div>
  );
};

// ============================================
// DONNÉES DU QUIZ (inchangées)
// ============================================
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
    explanation: "✅ Une montre mécanique tire son énergie d'un ressort moteur qui, une fois armé, libère progressivement son énergie. Une montre à quartz utilise une pile et un cristal de quartz pour sa précision."
  },
  {
    question: "Combien d'organes principaux compose une montre mécanique simple ?",
    options: ["3 organes", "6 organes", "10 organes", "12 organes"],
    correctAnswer: 1,
    explanation: "✅ Une montre mécanique se compose de 6 organes principaux : le moteur (barillet), le rouage, l'échappement, l'organe réglant (balancier-spiral), le remontoir et l'affichage."
  },
  {
    question: "Quel organe régule la vitesse de la montre et assure sa précision ?",
    options: ["Le barillet", "Le rouage", "Le balancier-spiral", "La couronne"],
    correctAnswer: 2,
    explanation: "✅ Le balancier-spiral est l'organe réglant de la montre. Il oscille à une fréquence constante et régule la vitesse à laquelle l'énergie du ressort est libérée, assurant ainsi la précision."
  },
  {
    question: "Quelle est la fonction principale de l'échappement ?",
    options: ["Stocker l'énergie", "Afficher l'heure", "Transformer l'énergie continue en impulsions régulières", "Remonter le ressort"],
    correctAnswer: 2,
    explanation: "✅ L'échappement transforme l'énergie continue du ressort moteur en impulsions régulières qui entretiennent l'oscillation du balancier. C'est le 'cœur battant' de la montre."
  },
  {
    question: "Quelle est la durée de marche typique d'une montre mécanique moderne ?",
    options: ["12 heures", "24 heures", "36-48 heures", "7 jours"],
    correctAnswer: 2,
    explanation: "✅ La plupart des montres mécaniques modernes offrent une réserve de marche de 36 à 48 heures. Certaines complications peuvent atteindre 8 jours ou plus."
  },
  {
    question: "Quelle est la relation entre une oscillation et une alternance ?",
    options: ["1 oscillation = 1 alternance", "1 oscillation = 2 alternances", "1 oscillation = 4 alternances", "Termes synonymes"],
    correctAnswer: 1,
    explanation: "✅ Une alternance est le déplacement du balancier dans un seul sens, tandis qu'une oscillation représente un aller-retour complet. Donc 1 oscillation = 2 alternances."
  },
  {
    question: "À quelle fréquence correspond 28'800 A/h ?",
    options: ["3 Hz", "4 Hz (8 alternances/seconde)", "5 Hz", "2,5 Hz"],
    correctAnswer: 1,
    explanation: "✅ 28'800 alternances/heure ÷ 3'600 secondes = 8 alternances/seconde. Comme 1 oscillation = 2 alternances, la fréquence est de 4 Hz."
  },
  {
    question: "Qu'est-ce que le COSC ?",
    options: ["Un type de ressort", "Organisme de certification de précision", "Technique de fabrication", "Standard de résistance à l'eau"],
    correctAnswer: 1,
    explanation: "✅ Le COSC (Contrôle Officiel Suisse des Chronomètres) est un organisme indépendant qui certifie la précision des montres chronométriques (-4/+6 secondes par jour)."
  }
];

// ============================================
// COMPOSANT PRINCIPAL (reste identique mais utilise les nouveaux composants)
// ============================================
export default function IntroductionMontreMecanique() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const isCorrect = index === quizData[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, { question: currentQuestion, selected: index, correct: isCorrect }]);
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
    setUserAnswers([]);
  };

  const pourcentageScore = Math.round((score / quizData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* En-tête sticky */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all hover:gap-2 gap-1 font-medium">
            <ChevronLeft className="w-5 h-5" />
            Retour à la théorie
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
              <GraduationCap className="w-5 h-5" />
              Théorie de base • Niveau 1
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 mb-6 leading-tight">
            Introduction à la Montre Mécanique
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les <strong className="text-blue-600 dark:text-blue-400">principes fondamentaux</strong> du fonctionnement d'une montre mécanique et plongez dans l'univers fascinant de l'horlogerie
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Clock, label: '15 min', desc: 'de lecture' },
              { icon: Target, label: '6 organes', desc: 'à découvrir' },
              { icon: Trophy, label: '8 questions', desc: 'de quiz' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md"
              >
                <stat.icon className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{stat.label}</p>
                  <p className="text-xs text-slate-500">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 1: Qu'est-ce qu'une montre mécanique ? */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Watch className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Qu&apos;est-ce qu&apos;une montre mécanique ?
            </h2>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Une <strong className="text-blue-600 dark:text-blue-400">montre mécanique</strong> est un instrument de mesure du temps fonctionnant grâce à l&apos;énergie mécanique d&apos;un ressort moteur. 
              Contrairement aux montres à quartz qui utilisent une pile et un oscillateur électronique, la montre mécanique est <strong>entièrement mécanique</strong> et ne nécessite aucune source d&apos;énergie électrique.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Principe de fonctionnement
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Un <strong>ressort</strong> est armé (par remontage manuel ou automatique), puis libère progressivement son énergie pour faire tourner les aiguilles. Cette énergie est régulée par un système d&apos;échappement et un balancier-spiral.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Précision garantie
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Le balancier-spiral oscille à <strong>fréquence constante</strong>, garantissant la précision du mouvement. C&apos;est le &quot;cœur battant&quot; de votre montre.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl my-8 shadow-xl">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-12 h-12 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xl font-bold mb-3">💡 Le saviez-vous ?</p>
                  <p className="text-blue-50 text-lg leading-relaxed">
                    Une montre mécanique peut contenir entre <strong>100 et 300 composants</strong>, voire plus de <strong>1 000</strong> pour les grandes complications (chronographe, calendrier perpétuel, tourbillon...). Chaque pièce est assemblée avec une précision de l&apos;ordre du micromètre !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Schéma interactif AMÉLIORÉ */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <Cog className="w-10 h-10 text-blue-600" />
              Les 6 organes principaux
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Une montre mécanique se compose de <strong className="text-blue-600">six organes essentiels</strong> qui travaillent en harmonie
            </p>
          </div>

          <SchemaMecanisme />

          {/* Cartes des organes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { 
                Icon: Clock, 
                numero: '1', 
                couleur: 'from-blue-500 to-blue-600', 
                bg: 'from-blue-50 to-blue-100',
                titre: 'Le Moteur (Barillet)', 
                desc: 'Le barillet contient le ressort moteur qui stocke l\'énergie mécanique. C\'est la source d\'énergie de toute la montre. Quand vous remontez votre montre, vous armez ce ressort.',
                icon: '⚡'
              },
              { 
                Icon: RotateCw, 
                numero: '2',
                couleur: 'from-green-500 to-emerald-600', 
                bg: 'from-green-50 to-emerald-100',
                titre: 'Le Rouage', 
                desc: 'Ensemble de roues dentées et pignons qui transmettent l\'énergie du barillet vers l\'échappement en démultipliant la vitesse. Chaque roue tourne à une vitesse différente.',
                icon: '⚙️'
              },
              { 
                Icon: Gauge, 
                numero: '3',
                couleur: 'from-purple-500 to-violet-600', 
                bg: 'from-purple-50 to-violet-100',
                titre: 'L\'Échappement', 
                desc: 'Transforme l\'énergie continue en impulsions régulières. C\'est le "cœur battant" de la montre qui produit le célèbre "tic-tac". Il libère l\'énergie par petites portions.',
                icon: '💓'
              },
              { 
                Icon: Settings, 
                numero: '4',
                couleur: 'from-orange-500 to-amber-600', 
                bg: 'from-orange-50 to-amber-100',
                titre: 'L\'Organe Réglant', 
                desc: 'Le balancier-spiral oscille à fréquence constante et régule la vitesse du mouvement. C\'est lui qui garantit la précision de votre montre en battant régulièrement.',
                icon: '🎯'
              },
              { 
                Icon: Eye, 
                numero: '5',
                couleur: 'from-red-500 to-rose-600', 
                bg: 'from-red-50 to-rose-100',
                titre: 'Le Remontoir', 
                desc: 'Mécanisme permettant d\'armer le ressort manuellement via la couronne, ou automatiquement via une masse oscillante qui tourne avec les mouvements de votre poignet.',
                icon: '🔄'
              },
              { 
                Icon: Watch, 
                numero: '6',
                couleur: 'from-cyan-500 to-sky-600', 
                bg: 'from-cyan-50 to-sky-100',
                titre: 'L\'Affichage', 
                desc: 'Les aiguilles et le cadran qui permettent de lire l\'heure. Actionnés par le rouage via la chaussée (minutes) et la minuterie (heures). C\'est l\'interface visible.',
                icon: '🕐'
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative bg-gradient-to-br ${item.bg} dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden`}
              >
                {/* Numéro */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${item.couleur} opacity-10 rounded-full flex items-center justify-center`}>
                  <span className="text-6xl font-black opacity-50">{item.numero}</span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-br ${item.couleur} rounded-xl shadow-lg flex-shrink-0`}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Organe {item.numero}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{item.titre}</h3>
                  </div>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                
                <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group">
                  En savoir plus 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Animation de montre AMÉLIORÉE */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AnimationMontre />
        </motion.section>

        {/* Section 3: Fonctionnement */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Circuit énergétique
            </h2>
          </div>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Le fonctionnement d&apos;une montre mécanique suit un <strong className="text-indigo-600 dark:text-indigo-400">circuit énergétique précis</strong> en 5 étapes :
          </p>

          <div className="space-y-6">
            {[
              { 
                step: '1', 
                titre: 'Stockage de l\'énergie', 
                desc: 'Le ressort moteur est armé dans le barillet par remontage manuel (via la couronne) ou automatique (masse oscillante). Le ressort se tend et accumule de l\'énergie potentielle.',
                couleur: 'from-blue-500 to-blue-600',
                icon: '🔋'
              },
              { 
                step: '2', 
                titre: 'Transmission', 
                desc: 'L\'énergie passe par le rouage composé de plusieurs roues dentées. Chaque roue démultiplie la rotation du barillet pour atteindre des vitesses adaptées. C\'est comme un système d\'engrenages.',
                couleur: 'from-green-500 to-emerald-600',
                icon: '⚙️'
              },
              { 
                step: '3', 
                titre: 'Régulation', 
                desc: 'L\'échappement (ancre et roue d\'échappement) transforme l\'énergie continue en impulsions régulières qui entretiennent l\'oscillation du balancier-spiral. C\'est le "chef d\'orchestre" du mouvement.',
                couleur: 'from-purple-500 to-violet-600',
                icon: '⏱️'
              },
              { 
                step: '4', 
                titre: 'Comptage du temps', 
                desc: 'Chaque oscillation du balancier correspond à un "battement". Pour une fréquence de 28\'800 alternances/heure, le balancier oscille 8 fois par seconde. C\'est l\'horloge interne.',
                couleur: 'from-orange-500 to-amber-600',
                icon: '🎯'
              },
              { 
                step: '5', 
                titre: 'Affichage', 
                desc: 'Le rouage transmet le mouvement aux aiguilles via la chaussée (aiguille des minutes) et le renvoi (aiguille des heures). Vous pouvez enfin lire l\'heure sur le cadran.',
                couleur: 'from-cyan-500 to-sky-600',
                icon: '🕐'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.couleur} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Étape {item.step}</span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.titre}</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Fréquences */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Fréquences et précision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                freq: '18\'000 A/h',
                hz: '2,5 Hz',
                alt: '5 alt/sec',
                titre: 'Traditionnelle',
                desc: 'Fréquence historique, offre une autonomie légèrement supérieure. Utilisée dans les montres vintage et certains mouvements de poche.',
                couleur: 'from-blue-500 to-blue-600',
                bg: 'from-blue-50 to-blue-100'
              },
              {
                freq: '28\'800 A/h',
                hz: '4 Hz',
                alt: '8 alt/sec',
                titre: 'Standard moderne',
                desc: 'Fréquence la plus répandue aujourd\'hui. Excellent compromis entre précision, consommation d\'énergie et résistance aux chocs.',
                couleur: 'from-green-500 to-emerald-600',
                bg: 'from-green-50 to-emerald-100',
                badge: '⭐ Recommandée'
              },
              {
                freq: '36\'000 A/h',
                hz: '5 Hz',
                alt: '10 alt/sec',
                titre: 'Haute fréquence',
                desc: 'Utilisée pour les montres de haute précision. Meilleure stabilité face aux chocs mais consommation d\'énergie plus élevée.',
                couleur: 'from-purple-500 to-violet-600',
                bg: 'from-purple-50 to-violet-100'
              },
            ].map((freq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-gradient-to-br ${freq.bg} dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600 shadow-lg overflow-hidden`}
              >
                {freq.badge && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {freq.badge}
                  </div>
                )}
                
                <div className={`inline-block bg-gradient-to-br ${freq.couleur} text-white px-4 py-2 rounded-xl font-bold text-lg mb-4 shadow-md`}>
                  {freq.freq}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{freq.titre}</h3>
                
                <div className="flex gap-4 mb-4">
                  <div className="bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Fréquence</p>
                    <p className="font-bold text-slate-900 dark:text-white">{freq.hz}</p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Alternances</p>
                    <p className="font-bold text-slate-900 dark:text-white">{freq.alt}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{freq.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Gauge className="w-7 h-7" />
              L&apos;amplitude et le rabattement
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-2">📐 Amplitude</h4>
                <p className="text-amber-50 leading-relaxed">
                  Angle de rotation du balancier (normalement <strong>180°-315°</strong>). Une amplitude trop basse indique un problème mécanique : ressort faible, huile sèche ou pièce défectueuse.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">⚠️ Rabattement</h4>
                <p className="text-amber-50 leading-relaxed">
                  Phénomène où le balancier touche la fourchette de l&apos;échappement, signe d&apos;amplitude excessive. Peut causer une perte de précision importante.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Comparatif */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
              <Gauge className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Comparatif des technologies
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white text-lg">Critère</th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="font-bold text-slate-900 dark:text-white text-lg">Mécanique</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="font-bold text-slate-900 dark:text-white text-lg">Quartz</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span className="font-bold text-slate-900 dark:text-white text-lg">Smartwatch</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { 
                    crit: '🔋 Source d\'énergie', 
                    meca: { val: 'Ressort moteur', color: 'text-blue-600' },
                    quartz: { val: 'Pile', color: 'text-green-600' },
                    smart: { val: 'Batterie rechargeable', color: 'text-purple-600' }
                  },
                  { 
                    crit: '⏱️ Précision', 
                    meca: { val: '±5 à 15 sec/jour', color: 'text-blue-600' },
                    quartz: { val: '±15 sec/mois', color: 'text-green-600', badge: '✅ Meilleure' },
                    smart: { val: 'Connectée (absolue)', color: 'text-purple-600', badge: '✅ Parfaite' }
                  },
                  { 
                    crit: '⚡ Autonomie', 
                    meca: { val: '36-48h (remontage)', color: 'text-blue-600' },
                    quartz: { val: '2-5 ans', color: 'text-green-600', badge: '✅ Excellente' },
                    smart: { val: '1-2 jours', color: 'text-purple-600' }
                  },
                  { 
                    crit: '🔧 Entretien', 
                    meca: { val: 'Révision tous les 3-5 ans', color: 'text-blue-600' },
                    quartz: { val: 'Changement de pile', color: 'text-green-600', badge: '✅ Simple' },
                    smart: { val: 'Mises à jour logicielles', color: 'text-purple-600' }
                  },
                  { 
                    crit: '⏳ Durée de vie', 
                    meca: { val: 'Plusieurs générations', color: 'text-blue-600', badge: '⭐ Exceptionnelle' },
                    quartz: { val: '10-20 ans', color: 'text-green-600' },
                    smart: { val: '3-5 ans', color: 'text-purple-600' }
                  },
                  { 
                    crit: '🎨 Valeur artisanale', 
                    meca: { val: 'Très élevée', color: 'text-blue-600', badge: '⭐ Patrimoine' },
                    quartz: { val: 'Faible', color: 'text-green-600' },
                    smart: { val: 'Nulle', color: 'text-purple-600' }
                  },
                  { 
                    crit: '💰 Prix', 
                    meca: { val: '500€ à 500 000€+', color: 'text-blue-600' },
                    quartz: { val: '50€ à 5 000€', color: 'text-green-600', badge: '✅ Accessible' },
                    smart: { val: '200€ à 1 000€', color: 'text-purple-600' }
                  },
                ].map((row, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.crit}</td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${row.meca.color}`}>{row.meca.val}</div>
                      {row.meca.badge && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full mt-1 inline-block">{row.meca.badge}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${row.quartz.color}`}>{row.quartz.val}</div>
                      {row.quartz.badge && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full mt-1 inline-block">{row.quartz.badge}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${row.smart.color}`}>{row.smart.val}</div>
                      {row.smart.badge && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full mt-1 inline-block">{row.smart.badge}</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 text-white"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold">
              Quiz : Testez vos connaissances !
            </h2>
          </div>

          {!quizCompleted ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-100 font-medium">
                    Question {currentQuestion + 1} sur {quizData.length}
                  </span>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <span className="font-bold">Score : {score}/{quizData.length}</span>
                  </div>
                </div>
                <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 shadow-inner">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-8">
                  {quizData[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      whileHover={selectedAnswer === null ? { scale: 1.02, x: 8 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      className={`w-full text-left p-5 rounded-xl border-3 transition-all duration-300 font-medium text-lg ${
                        selectedAnswer === null
                          ? 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm'
                          : index === quizData[currentQuestion].correctAnswer
                          ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50'
                          : selectedAnswer === index
                          ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500/50'
                          : 'bg-white/5 border-white/10 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg flex-shrink-0 ${
                          selectedAnswer === null
                            ? 'bg-white/20'
                            : index === quizData[currentQuestion].correctAnswer
                            ? 'bg-white/30'
                            : selectedAnswer === index
                            ? 'bg-white/30'
                            : 'bg-white/10'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {selectedAnswer !== null && (
                          index === quizData[currentQuestion].correctAnswer ? (
                            <CheckCircle className="w-7 h-7 flex-shrink-0" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-7 h-7 flex-shrink-0" />
                          ) : null
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/20 backdrop-blur-md border-l-4 border-yellow-400 p-6 mb-6 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                        <p className="text-white/90 leading-relaxed text-lg">{quizData[currentQuestion].explanation}</p>
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNextQuestion}
                      className="w-full bg-white hover:bg-blue-50 text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl text-lg flex items-center justify-center gap-2"
                    >
                      {currentQuestion < quizData.length - 1 ? (
                        <>
                          Question suivante
                          <SkipForward className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Voir les résultats
                          <Trophy className="w-5 h-5" />
                        </>
                      )}
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
              <div className="mb-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl relative"
                >
                  <span className="text-6xl font-black text-white">{pourcentageScore}%</span>
                  {pourcentageScore === 100 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-4 -right-4"
                    >
                      <Trophy className="w-16 h-16 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  )}
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-4">
                  {pourcentageScore === 100 ? '🎉 Parfait !' : 
                   pourcentageScore >= 80 ? '🌟 Excellent !' : 
                   pourcentageScore >= 60 ? '👍 Bien joué !' : 
                   '💪 Continuez l\'effort !'}
                </h3>
                
                <p className="text-2xl text-blue-100 mb-8">
                  Vous avez obtenu <strong>{score} sur {quizData.length}</strong> ({pourcentageScore}%)
                </p>

                {pourcentageScore >= 80 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-8 inline-block"
                  >
                    <Award className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                    <p className="text-lg font-bold">Félicitations ! Vous maîtrisez les bases de l&apos;horlogerie mécanique</p>
                  </motion.div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl text-lg flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-5 h-5" />
                  Recommencer le quiz
                </button>
                <button
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Leçon suivante
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Section finale: Pour aller plus loin */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Prêt à approfondir vos connaissances ?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Continuez votre apprentissage avec ces ressources et prochaines leçons
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">📚 Ressources</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { titre: 'Fondation Haute Horlogerie', desc: 'Le référence mondiale en horlogerie de luxe' },
                  { titre: 'Musée International d\'Horlogerie', desc: 'Collections et histoire de l\'horlogerie' },
                  { titre: 'Guide d\'achat montre mécanique', desc: 'Conseils pour choisir votre première montre' },
                ].map((resource, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="text-blue-500 text-xl">•</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{resource.titre}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{resource.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">🎓 Prochaines leçons</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { titre: 'Le Barillet en détail', niveau: 'Niveau 2', icon: '⚡' },
                  { titre: 'L\'échappement à ancre', niveau: 'Niveau 2', icon: '💓' },
                  { titre: 'Remontage manuel vs automatique', niveau: 'Niveau 2', icon: '🔄' },
                  { titre: 'Complications horlogères', niveau: 'Niveau 3', icon: '⚙️' },
                ].map((lesson, i) => (
                  <li key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lesson.icon}</span>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{lesson.titre}</p>
                        <p className="text-xs text-slate-500">{lesson.niveau}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-xl transition-all duration-300 text-lg flex items-center gap-2 mx-auto">
              <Target className="w-6 h-6" />
              Continuer ma formation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 mb-4">
            Formation en horlogerie mécanique • Apprenez les secrets des montres
          </p>
          <div className="flex justify-center gap-4">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}
