'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Watch, Play, Pause, Info, Zap, Settings, Clock, CheckCircle, XCircle, Award, History, Lightbulb } from 'lucide-react';

// ============================================
// COMPOSANT 1: ANIMATION MONTRE
// ============================================
const AnimationMontre = () => {
  const [vitesse, setVitesse] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 border-2 border-blue-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Watch className="w-7 h-7" />
          Montre en Action
        </h3>
        <div className="flex gap-2">
          {[0.5, 1, 2].map(v => (
            <button
              key={v}
              onClick={() => setVitesse(v)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                vitesse === v 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {v}x
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Cadran de la montre */}
        <div className="relative">
          {/* Boîtier externe */}
          <div className="absolute -inset-8 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-2xl">
            <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
          </div>

          {/* Cadran principal */}
          <div className="relative w-72 h-72 bg-gradient-to-br from-white to-slate-100 rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden">
            {/* Texture guilloché subtile */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, #000 2px, #000 4px)'
              }}></div>
            </div>

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
            <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-16 h-16 border-2 border-slate-300 rounded-full bg-white/50">
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

            {/* Aiguille des heures */}
            <motion.div
              className="absolute w-2 bg-gradient-to-t from-slate-900 to-slate-700 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg"
              style={{ 
                height: '80px',
                transform: 'translateX(-50%) translateY(-100%)',
              }}
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 43200 / vitesse, repeat: Infinity, ease: "linear" }}
            >
              {/* Luminova */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-green-300 rounded-full opacity-70"></div>
            </motion.div>

            {/* Aiguille des minutes */}
            <motion.div
              className="absolute w-1.5 bg-gradient-to-t from-slate-900 to-slate-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg"
              style={{ 
                height: '110px',
                transform: 'translateX(-50%) translateY(-100%)',
              }}
              animate={isRunning ? { rotate: 360 } : {}}
              transition={{ duration: 3600 / vitesse, repeat: Infinity, ease: "linear" }}
            >
              {/* Luminova */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-green-300 rounded-full opacity-70"></div>
            </motion.div>

            {/* Aiguille des secondes */}
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

            {/* Axe central */}
            <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg">
              <div className="absolute inset-0.5 bg-slate-700 rounded-full"></div>
            </div>

            {/* Verre saphir (reflet) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </div>

          {/* Couronne */}
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

        {/* Balancier animé à droite */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Support du balancier */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-12 bg-gradient-to-r from-amber-700 to-amber-600 rounded"></div>
            
            {/* Balancier */}
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
                {/* Centre */}
                <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
              </div>

              {/* Spiral */}
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
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
          <p className="text-blue-300 text-sm mb-1">Fréquence</p>
          <p className="text-white text-2xl font-bold">4 Hz</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
          <p className="text-green-300 text-sm mb-1">Alternances/h</p>
          <p className="text-white text-2xl font-bold">28&apos;800</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30">
          <p className="text-amber-300 text-sm mb-1">Réserve</p>
          <p className="text-white text-2xl font-bold">48h</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT 2: SCHÉMA DES 6 ORGANES
// ============================================
const SchemaSixOrganes = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState<string | null>(null);
  const [animation, setAnimation] = useState(true);
  
  const organes = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet', 
      desc: 'Stocke l\'énergie du ressort moteur. Le ressort se détend progressivement pour alimenter toute la montre pendant 36-48h.',
      x: 15, y: 50, couleur: '#3B82F6'
    },
    { 
      id: 'rouage', 
      nom: 'Rouage', 
      desc: 'Ensemble de roues dentées qui transmettent et démultiplient l\'énergie. Chaque roue tourne à une vitesse différente.',
      x: 30, y: 50, couleur: '#10B981'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement', 
      desc: 'L\'ancre et la roue d\'échappement transforment l\'énergie continue en impulsions régulières. C\'est le "tic-tac" de la montre.',
      x: 50, y: 50, couleur: '#8B5CF6'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral', 
      desc: 'Oscille à fréquence constante (8 fois/seconde pour 28\'800 A/h). C\'est le cœur réglant qui assure la précision.',
      x: 70, y: 50, couleur: '#F59E0B'
    },
    { 
      id: 'remontoir', 
      nom: 'Remontoir', 
      desc: 'Mécanisme permettant de remonter le ressort via la couronne (manuel) ou la masse oscillante (automatique).',
      x: 40, y: 25, couleur: '#EF4444'
    },
    { 
      id: 'affichage', 
      nom: 'Affichage', 
      desc: 'Les aiguilles, cadran et système de transmission qui permettent de lire l\'heure visuellement.',
      x: 60, y: 25, couleur: '#06B6D4'
    },
  ], []);

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl overflow-hidden">
      {/* Particules de fond */}
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
        className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-lg transition-all flex items-center gap-2"
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

        {/* Lignes de connexion entre organes */}
        <g opacity="0.5">
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

        {/* 1. BARILLET */}
        <g 
          className="cursor-pointer transition-all"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'barillet' ? null : 'barillet')}
          opacity={organeSelectionne && organeSelectionne !== 'barillet' ? 0.4 : 1}
        >
          <circle cx="150" cy="300" r="60" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="3" filter={organeSelectionne === 'barillet' ? "url(#glow)" : ""} />
          <circle cx="150" cy="300" r="50" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          
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
          
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="148" y="240" width="4" height="10" fill="#64748b" transform={`rotate(${i * 30} 150 300)`} />
          ))}
          
          <text x="150" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Barillet</text>
        </g>

        {/* 2. ROUAGE */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'rouage' ? null : 'rouage')}
          opacity={organeSelectionne && organeSelectionne !== 'rouage' ? 0.4 : 1}
        >
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

        {/* 3. ÉCHAPPEMENT */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'echappement' ? null : 'echappement')}
          opacity={organeSelectionne && organeSelectionne !== 'echappement' ? 0.4 : 1}
        >
          <circle cx="500" cy="300" r="40" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" filter={organeSelectionne === 'echappement' ? "url(#glow)" : ""} />
          
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

        {/* 4. BALANCIER-SPIRAL */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'balancier' ? null : 'balancier')}
          opacity={organeSelectionne && organeSelectionne !== 'balancier' ? 0.4 : 1}
        >
          <rect x="670" y="260" width="60" height="15" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="2" rx="3" />
          <circle cx="685" cy="267" r="3" fill="#1e293b" />
          <circle cx="715" cy="267" r="3" fill="#1e293b" />
          
          <motion.g
            animate={animation ? { rotate: [-35, 35, -35] } : {}}
            transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '700px 275px' }}
          >
            <line x1="700" y1="275" x2="700" y2="310" stroke="#475569" strokeWidth="2" />
            <circle cx="700" cy="310" r="35" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="3" filter={organeSelectionne === 'balancier' ? "url(#glow)" : ""} />
            
            {[...Array(8)].map((_, i) => (
              <line key={i} x1="700" y1="310" x2="700" y2="275" stroke="#92400e" strokeWidth="2" transform={`rotate(${i * 45} 700 310)`} />
            ))}
            
            {[0, 90, 180, 270].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 700 310)`}>
                <rect x="730" y="308" width="8" height="4" fill="#ef4444" rx="1" />
              </g>
            ))}
            
            <circle cx="700" cy="310" r="8" fill="#1e293b" />
          </motion.g>
          
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

        {/* 5. REMONTOIR */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'remontoir' ? null : 'remontoir')}
          opacity={organeSelectionne && organeSelectionne !== 'remontoir' ? 0.4 : 1}
        >
          <rect x="350" y="148" width="80" height="4" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="1" />
          
          <circle cx="380" cy="150" r="12" fill="url(#brass-gradient)" stroke="#d97706" strokeWidth="2" />
          {[...Array(10)].map((_, i) => (
            <rect key={i} x="378" y="138" width="4" height="6" fill="#92400e" transform={`rotate(${i * 36} 380 150)`} />
          ))}
          
          <motion.g
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '430px 150px' }}
          >
            <circle cx="430" cy="150" r="25" fill="url(#steel-gradient)" stroke="#475569" strokeWidth="3" filter={organeSelectionne === 'remontoir' ? "url(#glow)" : ""} />
            
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="428" y="125" width="4" height="10" fill="#1e293b" transform={`rotate(${i * 30} 430 150)`} />
            ))}
            
            <circle cx="430" cy="150" r="15" fill="#334155" />
            <circle cx="430" cy="150" r="8" fill="#1e293b" />
          </motion.g>
          
          <text x="400" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Remontoir</text>
        </g>

        {/* 6. AFFICHAGE */}
        <g 
          className="cursor-pointer"
          onClick={() => setOrganeSelectionne(organeSelectionne === 'affichage' ? null : 'affichage')}
          opacity={organeSelectionne && organeSelectionne !== 'affichage' ? 0.4 : 1}
        >
          <circle cx="600" cy="150" r="45" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" filter={organeSelectionne === 'affichage' ? "url(#glow)" : ""} />
          
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="600" y1="110" x2="600" y2="115"
              stroke="#1e293b"
              strokeWidth={i % 3 === 0 ? "3" : "1.5"}
              transform={`rotate(${i * 30} 600 150)`}
            />
          ))}
          
          <motion.line
            x1="600" y1="150" x2="600" y2="130"
            stroke="#1e293b" strokeWidth="4" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 43200, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
          <motion.line
            x1="600" y1="150" x2="600" y2="120"
            stroke="#475569" strokeWidth="3" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
          <motion.line
            x1="600" y1="150" x2="600" y2="115"
            stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"
            animate={animation ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '600px 150px' }}
          />
          
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
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {organes.find(o => o.id === organeSelectionne)?.nom}
                </h4>
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
// COMPOSANT 3: PRINCIPES FONDAMENTAUX
// ============================================
const PrincipesFondamentaux = () => {
  const principes = [
    {
      icon: <Zap className="w-12 h-12" />,
      titre: "Source d'Énergie",
      desc: "Le ressort moteur stocke l'énergie mécanique. Quand il se détend, il libère cette énergie progressivement sur 40-48h.",
      couleur: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Settings className="w-12 h-12" />,
      titre: "Transmission",
      desc: "Le rouage (ensemble de roues dentées) transmet et démultiplie l'énergie du barillet vers l'échappement.",
      couleur: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      titre: "Régulation",
      desc: "Le balancier-spiral oscille à fréquence constante (28'800 A/h). L'échappement découpe cette oscillation en 'tic-tac'.",
      couleur: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700">
      <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
        <Info className="w-8 h-8 text-blue-400" />
        Les 3 Principes Fondamentaux
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {principes.map((principe, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-2 border-slate-600 hover:border-blue-500 transition-all hover:scale-105"
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${principe.couleur} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <div className="text-white">
                {principe.icon}
              </div>
            </div>
            <h4 className="text-xl font-bold text-white text-center mb-3">
              {principe.titre}
            </h4>
            <p className="text-slate-300 text-center leading-relaxed">
              {principe.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT 4: QUIZ INTERACTIF
// ============================================
const QuizInteractif = () => {
  const [questionActuelle, setQuestionActuelle] = useState(0);
  const [score, setScore] = useState(0);
  const [reponseSelectionnee, setReponseSelectionnee] = useState<number | null>(null);
  const [quizTermine, setQuizTermine] = useState(false);

  const questions = [
    {
      question: "Quelle est la fréquence typique d'un mouvement mécanique moderne ?",
      reponses: ["2 Hz", "4 Hz", "8 Hz", "10 Hz"],
      bonneReponse: 1
    },
    {
      question: "Combien d'alternances par heure pour un mouvement à 4 Hz ?",
      reponses: ["14'400 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
      bonneReponse: 2
    },
    {
      question: "Quel organe régule la précision de la montre ?",
      reponses: ["Le barillet", "Le rouage", "Le balancier-spiral", "L'échappement"],
      bonneReponse: 2
    }
  ];

  const handleReponse = (index: number) => {
    if (reponseSelectionnee === null) {
      setReponseSelectionnee(index);
      if (index === questions[questionActuelle].bonneReponse) {
        setScore(score + 1);
      }
      
      setTimeout(() => {
        if (questionActuelle < questions.length - 1) {
          setQuestionActuelle(questionActuelle + 1);
          setReponseSelectionnee(null);
        } else {
          setQuizTermine(true);
        }
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setQuestionActuelle(0);
    setScore(0);
    setReponseSelectionnee(null);
    setQuizTermine(false);
  };

  if (quizTermine) {
    return (
      <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-2xl p-8 border-2 border-green-600">
        <div className="text-center">
          <Award className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-4xl font-bold text-white mb-4">Quiz Terminé !</h3>
          <p className="text-2xl text-green-300 mb-6">
            Votre score : {score} / {questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 transition-colors"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 border-2 border-purple-600">
      <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Lightbulb className="w-8 h-8 text-yellow-400" />
        Quiz : Testez vos connaissances
      </h3>

      <div className="mb-6">
        <div className="flex justify-between text-white mb-2">
          <span>Question {questionActuelle + 1} / {questions.length}</span>
          <span>Score : {score}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((questionActuelle + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-6">
        {questions[questionActuelle].question}
      </h4>

      <div className="grid gap-4">
        {questions[questionActuelle].reponses.map((reponse, index) => {
          let bgColor = 'bg-slate-700 hover:bg-slate-600';
          
          if (reponseSelectionnee !== null) {
            if (index === questions[questionActuelle].bonneReponse) {
              bgColor = 'bg-green-600';
            } else if (index === reponseSelectionnee) {
              bgColor = 'bg-red-600';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleReponse(index)}
              disabled={reponseSelectionnee !== null}
              className={`${bgColor} text-white p-4 rounded-lg font-medium text-left transition-all flex items-center justify-between group`}
            >
              <span>{reponse}</span>
              {reponseSelectionnee !== null && index === questions[questionActuelle].bonneReponse && (
                <CheckCircle className="w-6 h-6 text-white" />
              )}
              {reponseSelectionnee !== null && index === reponseSelectionnee && index !== questions[questionActuelle].bonneReponse && (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT 5: TIMELINE HISTORIQUE
// ============================================
const TimelineHistorique = () => {
  const evenements = [
    {
      annee: "1675",
      titre: "Invention du Spiral",
      desc: "Christian Huygens invente le spiral réglant, révolutionnant la précision horlogère.",
      couleur: "bg-blue-500"
    },
    {
      annee: "1770",
      titre: "Montre Automatique",
      desc: "Abraham-Louis Perrelet crée la première montre à remontage automatique avec masse oscillante.",
      couleur: "bg-green-500"
    },
    {
      annee: "1926",
      titre: "Oyster Case",
      desc: "Rolex présente le premier boîtier étanche, permettant la montre-bracelet de plongée.",
      couleur: "bg-purple-500"
    },
    {
      annee: "1969",
      titre: "El Primero",
      desc: "Zenith lance le premier chronographe automatique à haute fréquence (36'000 A/h).",
      couleur: "bg-orange-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700">
      <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <History className="w-8 h-8 text-amber-400" />
        Grandes Dates de l&apos;Horlogerie
      </h3>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-600"></div>

        {evenements.map((evt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-20 pb-12 last:pb-0"
          >
            {/* Point sur la timeline */}
            <div className={`absolute left-5 top-0 w-8 h-8 rounded-full ${evt.couleur} border-4 border-slate-900 shadow-lg`}></div>

            {/* Contenu */}
            <div className="bg-slate-700 rounded-lg p-6 border-2 border-slate-600 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4 mb-3">
                <span className={`${evt.couleur} text-white px-4 py-1 rounded-full font-bold text-sm`}>
                  {evt.annee}
                </span>
                <h4 className="text-xl font-bold text-white">{evt.titre}</h4>
              </div>
              <p className="text-slate-300 leading-relaxed">{evt.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function IntroductionMontreMecanique() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Introduction à la Montre Mécanique
          </h1>
          <p className="text-xl text-blue-200">
            Découvrez le fonctionnement fascinant de l&apos;horlogerie mécanique
          </p>
        </motion.div>

        {/* Section 1 : Montre animée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimationMontre />
        </motion.div>

        {/* Section 2 : Les 6 organes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SchemaSixOrganes />
        </motion.div>

        {/* Section 3 : Principes fondamentaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PrincipesFondamentaux />
        </motion.div>

        {/* Section 4 : Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <QuizInteractif />
        </motion.div>

        {/* Section 5 : Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <TimelineHistorique />
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-slate-400 text-sm pt-8 border-t border-slate-700"
        >
          <p className="mb-2">✨ Animation interactive • 🎓 Contenu pédagogique • ⚙️ Horlogerie mécanique</p>
          <p className="text-xs text-slate-500">Créé avec passion pour les amoureux de l&apos;horlogerie 🕰️</p>
        </motion.div>
      </div>
    </div>
  );
}
