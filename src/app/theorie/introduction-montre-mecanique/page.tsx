// ============================================
// PAGE : Introduction Montre Mécanique
// ============================================
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { Watch, Info, Pause, Play, CheckCircle, Cog, Eye, Lightbulb } from 'lucide-react';

// ============================================
// COMPOSANT : Montre Mécanique en Action - VERSION PROFESSIONNELLE
// ============================================
const AnimationMontreComplete = () => {
  const [vitesse, setVitesse] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [vue, setVue] = useState<'face' | 'profil' | 'dos'>('face');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Animation plus précise basée sur les spécifications réelles
  const secondHandRotation = useMotionValue(0);
  const minuteHandRotation = useMotionValue(0);
  const hourHandRotation = useMotionValue(0);
  const balanceWheelRotation = useMotionValue(0);
  const rotorRotation = useMotionValue(0);

  useEffect(() => {
    if (!isRunning) return;

    // Aiguille des secondes: 1 rotation complète par minute
    const secondAnimation = animate(secondHandRotation, 360, {
      duration: 60 / vitesse,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });

    // Aiguille des minutes: 1 rotation complète par heure
    const minuteAnimation = animate(minuteHandRotation, 360, {
      duration: 3600 / vitesse,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });

    // Aiguille des heures: 1 rotation complète par 12 heures
    const hourAnimation = animate(hourHandRotation, 360, {
      duration: 43200 / vitesse,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });

    // Balancier: 8 oscillations par seconde (4 Hz)
    const balanceAnimation = animate(balanceWheelRotation, 280, {
      duration: 0.125 / vitesse,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    });

    // Rotor: rotation plus lente et irrégulière
    const rotorAnimation = animate(rotorRotation, 360, {
      duration: 4 / vitesse,
      ease: [0.25, 0.1, 0.25, 1],
      repeat: Infinity,
      repeatType: "loop"
    });

    return () => {
      secondAnimation.stop();
      minuteAnimation.stop();
      hourAnimation.stop();
      balanceAnimation.stop();
      rotorAnimation.stop();
    };
  }, [isRunning, vitesse, secondHandRotation, minuteHandRotation, hourHandRotation, balanceWheelRotation, rotorRotation]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 border-2 border-blue-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Watch className="w-7 h-7" />
          Montre Mécanique en Action
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              showDetails 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <Info className="w-5 h-5" />
            Détails
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg font-bold transition-all bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Contrôles de vitesse améliorés */}
      <div className="flex gap-2 mb-4 justify-center">
        {[0.25, 0.5, 1, 2, 5].map(v => (
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

      {/* Sélecteur de vue amélioré */}
      <div className="flex gap-2 mb-6 justify-center">
        {(['face', 'profil', 'dos'] as const).map(v => (
          <button
            key={v}
            onClick={() => setVue(v)}
            className={`px-6 py-2 rounded-lg font-bold transition-all capitalize ${
              vue === v 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {v === 'face' ? 'Vue Face' : v === 'profil' ? 'Vue Profil' : 'Vue Dos'}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden">
        {vue === 'face' && (
          <div className="relative">
            {/* Boîtier externe 3D amélioré */}
            <div className="absolute -inset-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-full shadow-2xl">
              <div className="absolute inset-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"></div>
              {/* Reflets réalistes */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            </div>

            {/* Cadran principal avec texture guilloché améliorée */}
            <div className="relative w-80 h-80 bg-gradient-to-br from-white to-slate-100 rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden">
              {/* Texture guilloché plus réaliste */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, #000 2px, #000 4px)'
                }}></div>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)'
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

              {/* Logo/marque amélioré */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <div className="text-sm font-bold text-slate-700 tracking-widest">AUTOMATIC</div>
                <div className="text-xs text-slate-500 tracking-wider">SWISS MADE</div>
                <div className="text-xs text-blue-600 mt-1">28'800 A/h</div>
              </div>

              {/* Sous-cadran secondes amélioré */}
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
                {/* Aiguille sous-cadran avec animation améliorée */}
                <motion.div
                  className="absolute w-0.5 h-7 bg-blue-600 rounded-full origin-bottom left-1/2 top-1/2 -translate-x-1/2"
                  style={{ rotate: secondHandRotation }}
                />
                <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>

              {/* Indicateur de réserve de marche amélioré */}
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

              {/* Aiguille des heures avec luminova améliorée */}
              <motion.div
                className="absolute w-2.5 bg-gradient-to-t from-slate-900 to-slate-700 rounded-full origin-bottom left-1/2 top-1/2 shadow-xl z-20"
                style={{ 
                  height: '90px',
                  transform: 'translateX(-50%) translateY(-100%)',
                  rotate: hourHandRotation
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-14 bg-green-300 rounded-full opacity-70"></div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-600"></div>
              </motion.div>

              {/* Aiguille des minutes avec luminova améliorée */}
              <motion.div
                className="absolute w-2 bg-gradient-to-t from-slate-900 to-slate-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-xl z-30"
                style={{ 
                  height: '120px',
                  transform: 'translateX(-50%) translateY(-100%)',
                  rotate: minuteHandRotation
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-green-300 rounded-full opacity-70"></div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full border-2 border-slate-600"></div>
              </motion.div>

              {/* Aiguille des secondes avec contrepoids amélioré */}
              <motion.div
                className="absolute w-0.5 bg-red-600 rounded-full origin-bottom left-1/2 top-1/2 shadow-lg z-40"
                style={{ 
                  height: '130px',
                  transform: 'translateX(-50%) translateY(-100%)',
                  rotate: secondHandRotation
                }}
              >
                {/* Pointe de l'aiguille */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                {/* Contrepoids */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-red-600 rounded-full"></div>
              </motion.div>

              {/* Axe central 3D amélioré */}
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
                <div className="absolute inset-0.5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full"></div>
                <div className="absolute inset-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Verre saphir (reflet) amélioré */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-full pointer-events-none"></div>
            </div>

            {/* Couronne de remontoir améliorée */}
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
            <div className="w-96 h-64 relative">
              {/* Vue de profil du boîtier */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-3xl rounded-b-2xl shadow-2xl">
                {/* Lunette */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-t-3xl"></div>
                
                {/* Verre saphir */}
                <div className="absolute top-8 left-4 right-4 h-20 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>
                
                {/* Cadran */}
                <div className="absolute top-12 left-8 right-8 h-32 bg-gradient-to-b from-white to-slate-100 rounded-xl shadow-inner">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-slate-700 font-bold">AUTOMATIC</div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-slate-500">SWISS MADE</div>
                </div>
                
                {/* Mouvement */}
                <div className="absolute bottom-8 left-8 right-8 h-24 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-xl">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-400">28'800 A/h</div>
                </div>
                
                {/* Fond du boîtier */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800 to-slate-700 rounded-b-2xl"></div>
                
                {/* Couronne */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-2 w-6 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-r-xl border-l-2 border-slate-800"></div>
              </div>
              
              {/* Dimensions */}
              <div className="absolute -bottom-8 left-0 right-0 text-center text-white text-sm">
                <div className="flex justify-center gap-4">
                  <span>Ø 42mm</span>
                  <span>•</span>
                  <span>Épaisseur: 11.5mm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {vue === 'dos' && (
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-8 border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Fond de boîte transparent amélioré */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent"></div>
              
              {/* Rotor automatique visible avec animation améliorée */}
              <motion.div
                className="relative w-72 h-72"
                style={{ rotate: rotorRotation }}
              >
                {/* Demi-lune du rotor avec texture améliorée */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700" style={{
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                  }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700" style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
                  }}></div>
                  {/* Texture du rotor */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                  }}></div>
                </div>
                
                {/* Centre du rotor amélioré */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-4 border-amber-600">
                  <div className="absolute inset-2 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full"></div>
                </div>
                
                {/* Inscription sur le rotor améliorée */}
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 text-center">
                  <div className="text-amber-200 text-xs font-bold">AUTOMATIC</div>
                  <div className="text-amber-300 text-xs">SWISS MADE</div>
                </div>
              </motion.div>

              {/* Vis de fixation améliorées */}
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
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-slate-700"></div>
                </div>
              ))}
              
              {/* Informations techniques */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="text-white text-xs">CALIBRE AUTOMATIQUE</div>
                <div className="text-amber-300 text-xs">28'800 A/h • 40 RÉSERVE</div>
              </div>
            </div>
          </div>
        )}

        {/* Balancier animé sur le côté pour la vue de face amélioré */}
        {vue === 'face' && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Support du balancier amélioré */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-gradient-to-r from-amber-800 to-amber-700 rounded shadow-md border border-amber-600"></div>
              
              {/* Balancier avec roue amélioré */}
              <motion.div
                className="relative w-28 h-28"
                style={{ rotate: balanceWheelRotation }}
              >
                {/* Bras du balancier amélioré */}
                <div className="absolute left-0 top-1/2 w-24 h-1.5 bg-gradient-to-r from-amber-700 to-amber-600 rounded-full -translate-y-1/2 shadow-md"></div>
                
                {/* Roue du balancier améliorée */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-xl border-2 border-amber-400">
                  {/* Rayons améliorés */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-full bg-amber-700 left-1/2 top-0 -translate-x-1/2 origin-center"
                      style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                    />
                  ))}
                  
                  {/* Masses de réglage (4 vis dorées) améliorées */}
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
                  
                  {/* Centre doré amélioré */}
                  <div className="absolute inset-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-inner"></div>
                </div>

                {/* Spiral animé en SVG amélioré */}
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 -translate-x-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                    fill="none"
                    stroke="url(#spiral-gradient)"
                    strokeWidth="1.5"
                    animate={isRunning ? {
                      d: [
                        "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40",
                        "M 50 50 Q 50 25, 65 25 T 75 40 T 75 50 T 65 65 T 50 65 T 35 50 T 35 35",
                        "M 50 50 Q 50 30, 60 30 T 70 40 T 70 50 T 60 60 T 50 60 T 40 50 T 40 40"
                      ]
                    } : {}}
                    transition={{
                      duration: 0.125 / vitesse,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </motion.div>
              
              <p className="text-white text-xs mt-4 text-center font-bold bg-black/30 backdrop-blur-sm rounded px-2 py-1">
                Balancier-Spiral<br/>
                <span className="text-amber-400">4 Hz (8 battements/sec)</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Panneau de détails techniques amélioré */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h4 className="text-xl font-bold text-white mb-4">Détails Techniques du Mouvement</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold text-blue-400 mb-3">Caractéristiques Principales</h5>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Calibre:</strong> Mécanique automatique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Diamètre:</strong> 26.20 mm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Épaisseur:</strong> 3.60 mm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Rubis:</strong> 25 pierres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Réserve de marche:</strong> 40 heures</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold text-blue-400 mb-3">Fonctionnalités</h5>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Remontage automatique:</strong> Masse oscillante bidirectionnelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Stop secondes:</strong> Arrêt de l'aiguille des secondes lors du réglage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Réglage fin:</strong> Vis sur le balancier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Anti-choc:</strong> Système Incabloc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Spiral:</strong> Nivarox, plat, Breguet</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
              <p className="text-blue-200 text-sm">
                <strong>Information:</strong> Ce mouvement est basé sur le calibre ETA 2824, l'un des mouvements automatiques les plus fiables et répandus dans l'industrie horlogère.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistiques techniques améliorées */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => setSelectedComponent(selectedComponent === 'frequence' ? null : 'frequence')}
        >
          <p className="text-blue-300 text-sm mb-1">Fréquence</p>
          <p className="text-white text-2xl font-bold">4 Hz</p>
          <p className="text-xs text-blue-200 mt-1">Oscillations complètes/sec</p>
          {selectedComponent === 'frequence' && (
            <div className="mt-2 text-xs text-blue-100">
              La fréquence de 4 Hz signifie que le balancier effectue 4 oscillations complètes par seconde, soit 8 alternances (tic-tac).
            </div>
          )}
        </div>
        
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => setSelectedComponent(selectedComponent === 'alternances' ? null : 'alternances')}
        >
          <p className="text-green-300 text-sm mb-1">Alternances/h</p>
          <p className="text-white text-2xl font-bold">28'800</p>
          <p className="text-xs text-green-200 mt-1">Battements par heure</p>
          {selectedComponent === 'alternances' && (
            <div className="mt-2 text-xs text-green-100">
              28'800 alternances par heure est considéré comme la norme pour les montres mécaniques modernes, offrant un bon équilibre entre précision et durabilité.
            </div>
          )}
        </div>
        
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30 hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => setSelectedComponent(selectedComponent === 'reserve' ? null : 'reserve')}
        >
          <p className="text-amber-300 text-sm mb-1">Réserve</p>
          <p className="text-white text-2xl font-bold">40h</p>
          <p className="text-xs text-amber-200 mt-1">Autonomie complète</p>
          {selectedComponent === 'reserve' && (
            <div className="mt-2 text-xs text-amber-100">
              Une réserve de marche de 40 heures signifie que la montre peut fonctionner pendant environ 1 jour et 16 heures après un remontage complet.
            </div>
          )}
        </div>
        
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => setSelectedComponent(selectedComponent === 'battements' ? null : 'battements')}
        >
          <p className="text-purple-300 text-sm mb-1">Battements/sec</p>
          <p className="text-white text-2xl font-bold">8</p>
          <p className="text-xs text-purple-200 mt-1">Tic-tac audible</p>
          {selectedComponent === 'battements' && (
            <div className="mt-2 text-xs text-purple-100">
              Chaque battement correspond à une alternance du balancier. À 8 battements par seconde, on peut entendre le tic-tac caractéristique d'une montre mécanique.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPOSANT : Cycle de l'Échappement - VERSION PROFESSIONNELLE
// ============================================
const CycleEchappementDetaille = () => {
  const [etapeActive, setEtapeActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'schematic' | 'realistic'>('schematic');

  const etapes = [
    {
      num: 1,
      titre: "Le balancier oscille vers l'arrière",
      desc: "Le balancier-spiral termine son mouvement dans une direction et commence à revenir. Le spiral en Nivarox assure une oscillation régulière indépendamment de la température.",
      couleur: "from-blue-500 to-blue-600",
      details: "Le balancier oscille à une fréquence de 4 Hz (28'800 alternances/heure). Chaque oscillation complète dure 0.25 seconde."
    },
    {
      num: 2,
      titre: "Le jewel roller frappe l'ancre",
      desc: "Le petit rubis (jewel roller) sur le balancier vient frapper la palette de l'ancre (pallet fork), la délogeant de sa position. C'est le début du cycle d'échappement.",
      couleur: "from-purple-500 to-purple-600",
      details: "Le jewel roller est un rubis synthétique de 0.15mm de diamètre, poli avec une précision extrême pour minimiser la friction."
    },
    {
      num: 3,
      titre: "La roue d'échappement se déverrouille",
      desc: "L'ancre libère la roue d'échappement qui commence à tourner, poussée par l'énergie du ressort moteur. Une dent de la roue glisse sur la palette de l'ancre.",
      couleur: "from-green-500 to-green-600",
      details: "La roue d'échappement a 15 dents et tourne à 4 tours par minute. Chaque dent libère une impulsion d'énergie précise au balancier."
    },
    {
      num: 4,
      titre: "La roue pousse le jewel de l'ancre",
      desc: "En tournant, une dent de la roue d'échappement pousse sur le rubis (jewel) situé à l'extrémité de l'ancre. C'est la phase de transmission d'énergie.",
      couleur: "from-amber-500 to-amber-600",
      details: "L'angle d'impulsion est d'environ 30°, optimisé pour transférer le maximum d'énergie avec une perte minimale."
    },
    {
      num: 5,
      titre: "L'ancre pousse le jewel roller",
      desc: "L'ancre, poussée par la roue, transmet cette énergie au jewel roller, donnant une impulsion au balancier. C'est l'équivalent de pousser quelqu'un sur une balançoire.",
      couleur: "from-red-500 to-red-600",
      details: "L'impulsion fournit environ 0.001 joule d'énergie au balancier, juste assez pour maintenir son oscillation contre les frottements."
    },
    {
      num: 6,
      titre: "La roue se verrouille à nouveau",
      desc: "Une fois le balancier relancé, l'autre palette de l'ancre vient bloquer la roue d'échappement jusqu'au prochain cycle. Le cycle complet dure 1/8ème de seconde.",
      couleur: "from-cyan-500 to-cyan-600",
      details: "Le verrouillage est instantané et précis, assurant que la roue d'échappement ne tourne que pendant la phase d'impulsion."
    }
  ];

  React.useEffect(() => {
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
          Cycle de l'Échappement - 6 Étapes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'schematic' ? 'realistic' : 'schematic')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              viewMode === 'realistic' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <Eye className="w-5 h-5" />
            {viewMode === 'realistic' ? 'Réaliste' : 'Schématique'}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              showDetails 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <Info className="w-5 h-5" />
            Détails
          </button>
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
      </div>

      <p className="text-slate-300 mb-6 text-lg">
        L'échappement est le cœur battant de la montre. Il transforme l'énergie continue du ressort 
        en impulsions régulières qui entretiennent l'oscillation du balancier.
      </p>

      {/* Visualisation améliorée de l'échappement */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        {viewMode === 'schematic' ? (
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
              <radialGradient id="pallet-grad">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </radialGradient>
              <linearGradient id="steel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
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
              <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ESC</text>
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
              <ellipse cx="-40" cy="-70" rx="15" ry="8" fill="url(#pallet-grad)" opacity="0.7" />
              <ellipse cx="40" cy="70" rx="15" ry="8" fill="url(#pallet-grad)" opacity="0.7" />
              
              {/* Fourchette */}
              <path d="M -30 80 L -30 90 L 30 90 L 30 80 Z" fill="url(#steel-gradient)" />
              <text x="0" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ANCRE</text>
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
                fill="url(#pallet-grad)" 
                opacity="0.8"
                animate={etapeActive === 2 ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: etapeActive === 2 ? Infinity : 0 }}
              />
              
              <circle cx="0" cy="60" r="12" fill="#1e293b" />
              <text x="0" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BAL</text>
            </motion.g>

            {/* Flèches d'indication améliorées */}
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
        ) : (
          <div className="relative w-full h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto">
                {/* Vue réaliste du mécanisme d'échappement */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full shadow-2xl">
                  {/* Roue d'échappement réaliste */}
                  <motion.div
                    className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                    animate={etapeActive === 3 || etapeActive === 4 ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: etapeActive === 3 || etapeActive === 4 ? Infinity : 0 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full"></div>
                    
                    {/* Dents réalistes */}
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-6 bg-amber-800 rounded-t-sm"
                        style={{
                          left: '50%',
                          top: '0',
                          transform: `translateX(-50%) rotate(${i * 24}deg)`,
                          transformOrigin: 'center 64px'
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  {/* Ancre réaliste */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-40"
                    animate={
                      etapeActive === 2 || etapeActive === 5 
                        ? { rotate: [-10, 10, -10] } 
                        : {}
                    }
                    transition={{ duration: 1, repeat: (etapeActive === 2 || etapeActive === 5) ? Infinity : 0 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg"></div>
                    
                    {/* Palettes en rubis réalistes */}
                    <div className="absolute -left-4 top-4 w-8 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg"></div>
                    <div className="absolute -right-4 bottom-4 w-8 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg"></div>
                  </motion.div>
                  
                  {/* Balancier réaliste */}
                  <motion.div
                    className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
                    
                    {/* Rayons réalistes */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-16 bg-amber-700"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                    
                    {/* Jewel roller réaliste */}
                    <motion.div 
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg"
                      animate={etapeActive === 2 ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.5, repeat: etapeActive === 2 ? Infinity : 0 }}
                    />
                  </motion.div>
                </div>
              </div>
              
              <p className="text-white text-xl font-bold mt-4">Vue Réaliste du Mécanisme</p>
            </div>
          </div>
        )}
      </div>

      {/* Étapes détaillées améliorées */}
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
                {showDetails && etapeActive === index && (
                  <div className="mt-3 p-3 bg-black/20 rounded-lg">
                    <p className="text-xs text-white/80">
                      <strong>Détail technique:</strong> {etape.details}
                    </p>
                  </div>
                )}
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
            C'est cette régulation précise qui permet à une montre mécanique de garder une précision remarquable
            malgré n'utiliser que l'énergie mécanique.
          </span>
        </p>
      </div>
    </div>
  );
};

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function IntroductionMontreMecanique() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Introduction à la Montre Mécanique
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Découvrez le fonctionnement fascinant des montres mécaniques, 
            ces merveilles d'ingénierie qui mesurent le temps avec une précision remarquable 
            sans aucune source d'énergie électrique.
          </p>
        </div>

        <div className="space-y-12">
          <AnimationMontreComplete />
          <CycleEchappementDetaille />
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">
            © 2023 - Introduction à l'Horlogerie Mécanique
          </p>
        </div>
      </div>
    </div>
  );
}
