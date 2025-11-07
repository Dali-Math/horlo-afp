// app/theorie/introduction-montre-mecanique.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Cog, Gauge, Settings, Eye, Watch, 
  RotateCw, Trophy, BookOpen, Zap, TrendingUp, Award, 
  ZoomIn, Info, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Composant Schéma avec images réelles (placeholders)
const SchemaMecanismeAvecImages = () => {
  const [organeSelectionne, setOrganeSelectionne] = useState<string | null>(null);
  const [imageChargee, setImageChargee] = useState<Record<string, boolean>>({});
  
  const organes = useMemo(() => [
    { 
      id: 'barillet', 
      nom: 'Barillet', 
      desc: 'Stocke l\'énergie du ressort moteur. Contient le ressort qui libère progressivement son énergie.', 
      specs: 'Diamètre: 16mm • Matière: Laiton • Tours: 7-8 rotations complètes',
      x: 15, y: 50, 
      image: '/images/organe-barillet.png',
      alt: 'Barillet de montre mécanique'
    },
    { 
      id: 'rouage', 
      nom: 'Rouage', 
      desc: 'Ensemble de roues dentées et pignons qui démultiplient la vitesse.', 
      specs: 'Rapport: 1:60 • Matériaux: Laiton, acier • Lubrification: Huile synthétique',
      x: 38, y: 50, 
      image: '/images/organe-rouage.png',
      alt: 'Train de rouages d\'une montre mécanique'
    },
    { 
      id: 'echappement', 
      nom: 'Échappement', 
      desc: 'Transforme l\'énergie continue en impulsions régulières (le "tic-tac").', 
      specs: 'Type: Ancre suisse • Alternances: 8/sec • Matière: Acier trempé',
      x: 61, y: 50, 
      image: '/images/organe-echappement.png',
      alt: 'Échappement à ancre suisse'
    },
    { 
      id: 'balancier', 
      nom: 'Balancier-Spiral', 
      desc: 'Organe réglant qui oscille à fréquence constante pour mesurer le temps.', 
      specs: 'Fréquence: 28\'800 A/h • Spiral: Flat • Amplitude: 270-320°',
      x: 84, y: 50, 
      image: '/images/organe-balancier.png',
      alt: 'Balancier avec spiral de Breguet'
    },
  ], []);

  const handleImageLoad = (id: string) => {
    setImageChargee(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Fond technique avec vis et ponts */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-600 rounded-full"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
      </div>

      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
            <polygon points="0 0, 12 4, 0 8" className="fill-blue-500" />
          </marker>
        </defs>
        
        {/* Flèches de flux animées */}
        {organes.map((o, i) => i < organes.length - 1 && (
          <motion.line
            key={`fleche-${i}`}
            x1={`${o.x + 8}%`} y1={`${o.y}%`}
            x2={`${organes[i + 1].x - 8}%`} y2={`${organes[i + 1].y}%`}
            stroke="#60A5FA" strokeWidth="4" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: i * 0.4, duration: 1, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Composants avec images */}
      {organes.map((o, i) => (
        <motion.div
          key={o.id}
          className="absolute cursor-pointer"
          style={{ left: `${o.x}%`, top: `${o.y}%`, x: '-50%', y: '-50%' }}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: i * 0.3, type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.1, rotate: 5, zIndex: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOrganeSelectionne(o.id)}
        >
          {/* Conteneur de l'image */}
          <div className="relative w-32 h-32 bg-white dark:bg-slate-800 rounded-full shadow-xl border-4 border-slate-200 dark:border-slate-600 overflow-hidden">
            {!imageChargee[o.id] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                <span className="text-xs text-slate-500">Chargement...</span>
              </div>
            )}
            
            {/* Placeholder image - Remplacer par Image component quand vous aurez les vraies photos */}
            <div className="w-full h-full flex items-center justify-center relative">
              <Image
                src={o.image}
                alt={o.alt}
                fill
                className="object-contain p-2"
                onLoad={() => handleImageLoad(o.id)}
                onError={() => handleImageLoad(o.id)} // En cas d'erreur, on cache le loader
              />
              {/* Si l'image n'existe pas, afficher un placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
                <Cog className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Effet de brillance au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Nom du composant */}
          <motion.p 
            className="text-center mt-3 font-bold text-slate-900 dark:text-white text-sm bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 + 0.5 }}
          >
            {o.nom}
          </motion.p>
        </motion.div>
      ))}

      {/* Zone d'informations détaillée */}
      <AnimatePresence>
        {organeSelectionne && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl border-2 border-blue-600 z-20"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  {organes.find(o => o.id === organeSelectionne)?.nom}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {organes.find(o => o.id === organeSelectionne)?.specs}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOrganeSelectionne(null)}
                className="ml-4 text-slate-400 hover:text-slate-600"
              >
                <ZoomIn className="w-6 h-6" />
              </motion.button>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {organes.find(o => o.id === organeSelectionne)?.desc}
            </p>
            <div className="mt-4 flex gap-3">
              <Link 
                href={`/theorie/${organeSelectionne}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Voir le détail
              </Link>
              <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Visualiser en 3D
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg"
      >
        Cliquez sur les composants →
      </motion.div>
    </div>
  );
};

// Données du quiz enrichies
const quizData = [
  // ... (garder les questions précédentes)
];

// Composant principal de la page
export default function IntroductionMontreMecanique() {
  // ... (garder la logique du quiz précédente)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* ... (header inchangé) ... */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ... (sections précédentes) ... */}

        {/* Section 2: Les 6 organes principaux - MODIFIÉE */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Cog className="w-8 h-8 mr-3 text-blue-600" />
            Les 6 organes principaux - Vue détaillée
          </h2>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Une montre mécanique simple se compose de <strong className="text-slate-900 dark:text-white">six organes essentiels</strong> qui travaillent ensemble pour mesurer le temps avec précision. Cliquez sur chaque composant pour voir les détails.
          </p>

          {/* Schéma interactif avec images */}
          <SchemaMecanismeAvecImages />
          
          <p className="text-sm text-slate-500 text-center mt-6">
            <Info className="w-4 h-4 inline mr-1" />
            Les images sont des représentations techniques. Les couleurs peuvent varier selon les calibres.
          </p>

          {/* Grille des détails techniques */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* ... (garder les cartes de description précédentes) ... */}
          </div>
        </motion.section>

        {/* ... (reste de la page inchangé) ... */}
      </main>
    </div>
  );
}
