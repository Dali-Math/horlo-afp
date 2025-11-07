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
  const [imageChargee, setImageChargee] = useState<Record<string, boolean>>({});
  
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
    setImageChargee(prev => ({ ...prev, [id]: 'error' }));
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden shadow-inner">
      
      {/* Fond technique avec vis et ponts */}
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
              stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowhead)"
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
            
            {/* Image ou placeholder */}
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

          {/* Label avec animation de texte */}
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
  // ... (garder toutes les autres questions précédentes) ...
];

// Composant principal de la page
export default function IntroductionMontreMecanique() {
  // ... (garder toute la logique du quiz inchangée) ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header et sections précédentes... */}
      
      {/* Section 2: Les 6 organes principaux - MODIFIÉE AVEC VRAIES IMAGES */}
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

      {/* Reste de la page inchangé... */}
    </div>
  );
}
