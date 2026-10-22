// src/app/theorie/galerie-3d/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Layers,
  RotateCcw,
  ZoomIn,
  Info,
  Wrench,
  Eye,
  Compass,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Sliders,
  Droplet,
  Zap,
  Play,
  Pause,
  ChevronRight
} from 'lucide-react';

export interface MovementPart {
  id: string;
  name: string;
  system: 'moteur' | 'rouage' | 'echappement' | 'organe_reglateur' | 'remontoir' | 'bati';
  material: string;
  functionDesc: string;
  ebat: string;
  lubrication: string;
  atelierCaution: string;
  layerIndex: number; // 0: Platine, 1: Rouages, 2: Ponts, 3: Échappement & Coq
  color: string;
  nihsCode?: string;
  specs: { [key: string]: string };
}

const CALIBRES_DATA = {
  eta6497: {
    id: 'eta6497',
    name: 'ETA 6497-1 Unitas',
    lineage: '16½ lignes (Ø 36.60 mm)',
    type: 'Mouvement mécanique à remontage manuel d’établi',
    specs: {
      'Fréquence': '18’000 A/h (2.5 Hz)',
      'Rubis': '17 pierres synthétiques',
      'Réserve de marche': '46 heures',
      'Balancier': 'Glucydur à 3 bras',
      'Spiral': 'Nivarox 1 plat',
      'Antichoc': 'Incabloc amortisseur'
    },
    parts: [
      {
        id: 'platine',
        name: 'Platine Principale',
        system: 'bati',
        material: 'Laiton horloger (CuZn39Pb2), nickelé et perlé',
        functionDesc: 'Châssis fondamental de base recevant l’empierrement, les ponts et tous les mobiles du mouvement.',
        ebat: 'Planéité rigoureuse < 0.005 mm',
        lubrication: 'Aucune lubrification directe (huilage réservé aux creusures de pierres)',
        atelierCaution: 'Ne jamais rayer la dorure ou le perlage avec une pointe de brucelle.',
        layerIndex: 0,
        color: '#d4af37',
        nihsCode: 'NIHS 02-01',
        specs: { 'Épaisseur': '4.50 mm', 'Traitement': 'Perlage fin et rhodiage anti-corrosion' }
      },
      {
        id: 'barillet',
        name: 'Barillet Complet & Ressort Moteur',
        system: 'moteur',
        material: 'Tambour en laiton, bonde en acier trempé, ressort en alliage Nivaflex',
        functionDesc: 'Réservoir d’énergie potentielle mécanique délivrant le couple moteur continu sur 46 heures.',
        ebat: 'Ébat de hauteur : 0.05 à 0.08 mm',
        lubrication: 'Moebius 8200 ou 8217 pour la paroi / graisse Klüber P125 pour la bonde',
        atelierCaution: 'Désensimer le ressort avec une estrapade appropriée, jamais à la main pour éviter la torsion.',
        layerIndex: 1,
        color: '#eab308',
        nihsCode: 'NIHS 12-05',
        specs: { 'Couple max': '1.25 N.mm', 'Tours de développement': '7.5 tours' }
      },
      {
        id: 'grande_moyenne',
        name: 'Roue de Centre (Grande Moyenne)',
        system: 'rouage',
        material: 'Roue en laiton horloger, pignon en acier 20AP poli',
        functionDesc: 'Effectue exactement 1 tour complet par heure (60 min) et porte la chaussée pour l’aiguille des minutes.',
        ebat: 'Ébat axial : 0.02 à 0.03 mm',
        lubrication: 'Moebius HP-1300 (huile à haute pression) sur les pivots',
        atelierCaution: 'Vérifier la rondeur de la chaussée chassée à gras pour éviter de tordre la tige.',
        layerIndex: 1,
        color: '#f59e0b',
        nihsCode: 'NIHS 15-02',
        specs: { 'Vitesse': '1 tour / heure', 'Nombre de dents': '80 dents / pignon 10 ailes' }
      },
      {
        id: 'roue_moyenne',
        name: 'Roue Petite Moyenne',
        system: 'rouage',
        material: 'Roue en laiton fraisé, ailes de pignon polies miroir',
        functionDesc: 'Mobile intermédiaire assurant la démultiplication de vitesse entre la roue de centre et la roue des secondes.',
        ebat: 'Ébat axial : 0.02 mm',
        lubrication: 'Moebius HP-1300 ou 9010 sur pivots haut et bas',
        atelierCaution: 'Contrôler la propreté absolue des ailes de pignon : une poussière bloque le train.',
        layerIndex: 1,
        color: '#f97316',
        nihsCode: 'NIHS 15-04',
        specs: { 'Rapport d’engrenage': '1:8', 'Profil de denture': 'Épicycloïdal ogival suisse' }
      },
      {
        id: 'roue_seconde',
        name: 'Roue des Secondes',
        system: 'rouage',
        material: 'Roue en laiton léger, pivot long pour aiguille de petite seconde à 9H',
        functionDesc: 'Tourne à raison de 1 tour en 60 secondes. Engrène directement avec le pignon d’échappement.',
        ebat: 'Ébat axial : 0.02 mm / jeu d’engrenage contrôlé au microscope',
        lubrication: 'Moebius 9010 (huile fine fluide synthétique)',
        atelierCaution: 'Le pivot de seconde est extrêmement fin (0.12 mm) : risque de pliage au remontage.',
        layerIndex: 1,
        color: '#fb923c',
        nihsCode: 'NIHS 15-06',
        specs: { 'Vitesse': '1 tour / 60 s', 'Position': 'Aiguille petite seconde à 9h' }
      },
      {
        id: 'roue_echappement',
        name: 'Roue d’Échappement à 15 Dents',
        system: 'echappement',
        material: 'Acier spécial poli et trempé, surfaces de repos et d’impulsion polies miroir',
        functionDesc: 'Retient et libère alternativement l’énergie pas à pas, tout en transmettant l’impulsion aux levées de l’ancre.',
        ebat: 'Ébat axial : 0.015 à 0.025 mm',
        lubrication: 'Moebius 9415 (graisse thixotrope pour échappement) sur les plans d’impulsion',
        atelierCaution: 'Ne JAMAIS huiler les pivots à l’excès pour éviter que l’huile ne migre sur la serpe.',
        layerIndex: 2,
        color: '#10b981',
        nihsCode: 'NIHS 20-01',
        specs: { 'Dents': '15 dents massues', 'Angle de levée': 'Assure 2 alternances par dent' }
      },
      {
        id: 'ancre',
        name: 'Ancre Suisse & Levées en Rubis',
        system: 'echappement',
        material: 'Corps d’ancre en acier nickelé, palettes en corindon synthétique rouge, dard en laiton',
        functionDesc: 'Distribue l’énergie par saccades au balancier via la cheville de plateau, verrouille le rouage pendant l’oscillation libre.',
        ebat: 'Ébat axial : 0.015 à 0.020 mm / Tirage régulier de 12°',
        lubrication: 'Lubrification exclusive sur le plan d’impulsion des palettes (1/2 palette couverte de 9415)',
        atelierCaution: 'Ne jamais toucher au dard ni aux goupilles de limitation (ou touchettes) sans potence.',
        layerIndex: 2,
        color: '#06b6d4',
        nihsCode: 'NIHS 20-05',
        specs: { 'Palettes': 'Entrée & Sortie en rubis synthétique', 'Fonction dard': 'Sécurité anti-renversement' }
      },
      {
        id: 'balancier_spiral',
        name: 'Ensemble Balancier-Spiral & Coq',
        system: 'organe_reglateur',
        material: 'Serge en Glucydur amagnétique, spiral compensateur en Nivarox 1',
        functionDesc: 'Organe régulateur maître déterminant la base de temps de la montre avec sa fréquence propre de 2.5 Hz (18’000 A/h).',
        ebat: 'Ébat axial : 0.010 mm dans les contre-pivots Incabloc',
        lubrication: 'Moebius 9010 (gouttelette centrale d’exactement 1/2 à 2/3 du diamètre du contre-pivot)',
        atelierCaution: 'Le spiral est d’une fragilité extrême : la moindre déformation détruit le repère et l’isochronisme.',
        layerIndex: 3,
        color: '#3b82f6',
        nihsCode: 'NIHS 22-01',
        specs: { 'Fréquence': '18’000 A/h', 'Amortisseur': 'Blocs Incabloc antichocs' }
      },
      {
        id: 'pont_rouage',
        name: 'Ponts de Rouage & de Barillet',
        system: 'bati',
        material: 'Laiton traité rhodié avec Côtes de Genève circulaires',
        functionDesc: 'Maintiennent avec une précision micrométrique les axes des mobiles en rotation grâce aux pierres chassées.',
        ebat: 'Guidage par pieds de pont calibrés rectifiés',
        lubrication: 'Aucune',
        atelierCaution: 'Serrer les vis de ponts progressivement en croix pour ne pas cisailler un pivot de mobile.',
        layerIndex: 2,
        color: '#cbd5e1',
        nihsCode: 'NIHS 04-02',
        specs: { 'Décor': 'Côtes de Genève et anglages polis', 'Vis': 'Vis d’horlogerie en acier bleui à la flamme' }
      }
    ]
  },
  eta2824: {
    id: 'eta2824',
    name: 'ETA 2824-2 Automatique',
    lineage: '11½ lignes (Ø 25.60 mm)',
    type: 'Mouvement mécanique à remontage automatique moderne',
    specs: {
      'Fréquence': '28’800 A/h (4.0 Hz)',
      'Rubis': '25 rubis de pivotement',
      'Réserve de marche': '38 heures',
      'Remontage': 'Automatique bidirectionnel rotor sur billes',
      'Échappement': 'Ancre suisse haute fréquence',
      'Système réglant': 'Raquette Etachron micrométrique'
    },
    parts: [
      {
        id: 'rotor',
        name: 'Masse Oscillante (Rotor sur Roulement à Billes)',
        system: 'moteur',
        material: 'Segment lourd en métal haute densité (or ou tungstène) monté sur roulement à 5 micro-billes en acier inox',
        functionDesc: 'Capte les mouvements du poignet pour armer continuellement le ressort de barillet dans les deux sens grâce aux roues inverseuses.',
        ebat: 'Jeu axial roulement : 0.02 mm / aucun frottement sur le pont',
        lubrication: 'Moebius 9010 (micro-goutte sur billes) ou graisse fluide spécifique',
        atelierCaution: 'Ne jamais faire tourner le rotor à sec à grande vitesse sous soufflette.',
        layerIndex: 3,
        color: '#d4af37',
        nihsCode: 'NIHS 14-01',
        specs: { 'Sens de remontage': 'Bidirectionnel 360°', 'Poids périphérique': 'Optimisé pour le rendement' }
      },
      {
        id: 'inverseurs',
        name: 'Roues Inverseuses de Remontage',
        system: 'moteur',
        material: 'Acier traité avec cliquets internes microscopiques sans ressort',
        functionDesc: 'Transforment les oscillations alternatives du rotor en une rotation unidirectionnelle constante vers le rochet de barillet.',
        ebat: 'Liberté totale sans point dur',
        lubrication: 'Lubrification par immersion Lubeta V105 (séchage sans graisse résiduelle)',
        atelierCaution: 'Ne jamais plonger dans l’essence C brute sans re-lubrification spécifique sous peine de blocage.',
        layerIndex: 2,
        color: '#f59e0b',
        nihsCode: 'NIHS 14-04',
        specs: { 'Système': 'Double roue inverseuse à cliquet à friction douce' }
      },
      {
        id: 'etachron',
        name: 'Organe Régulateur & Système Etachron',
        system: 'organe_reglateur',
        material: 'Balancier Glucydur 4 Hz, porte-piton mobile et goupilles de raquette réglables',
        functionDesc: 'Permet un réglage ultra-fin de la marche journalière et du centrage du repère en agissant directement sur la lame du spiral.',
        ebat: 'Jeu de spiral entre goupilles : 0.005 mm (épaisseur d’un cheveu divisée par 10)',
        lubrication: 'Moebius 9010 sur contre-pivots Incabloc',
        atelierCaution: 'Utiliser la clé Etachron dédiée pour tourner le piton sans faire de pliure sur le spiral.',
        layerIndex: 2,
        color: '#3b82f6',
        nihsCode: 'NIHS 22-05',
        specs: { 'Fréquence': '28’800 A/h (4 Hz)', 'Système raquette': 'Etachron breveté' }
      }
    ]
  }
};

export default function Galerie3DPage() {
  const [selectedCalibre, setSelectedCalibre] = useState<'eta6497' | 'eta2824'>('eta6497');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [selectedPartId, setSelectedPartId] = useState<string>('balancier_spiral');
  const [isExploded, setIsExploded] = useState<boolean>(true);
  const [explosionDistance, setExplosionDistance] = useState<number>(45);
  const [isKinematicPlaying, setIsKinematicPlaying] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeCalibre = CALIBRES_DATA[selectedCalibre];

  const filteredParts = useMemo(() => {
    if (selectedSystem === 'all') return activeCalibre.parts;
    return activeCalibre.parts.filter((p) => p.system === selectedSystem);
  }, [activeCalibre, selectedSystem]);

  const activePart = useMemo(() => {
    return activeCalibre.parts.find((p) => p.id === selectedPartId) || activeCalibre.parts[0];
  }, [activeCalibre, selectedPartId]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Théorie</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Anatomie Cinématique d’Atelier • Laboratoire 3D</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Écorché Éclaté des Calibres Suisses
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Explorez l’architecture interne des mouvements mythiques de l’horlogerie suisse. Décortiquez chaque mobile, analysez les matériaux d’atelier, les tolérances d’ébats et les protocoles officiels de lubrification Moebius.
              </p>
            </div>

            {/* Sélecteur de Calibre */}
            <div className="flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedCalibre('eta6497');
                  setSelectedPartId('balancier_spiral');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCalibre === 'eta6497'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ETA 6497-1 (Unitas Manuel)
              </button>
              <button
                onClick={() => {
                  setSelectedCalibre('eta2824');
                  setSelectedPartId('rotor');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCalibre === 'eta2824'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ETA 2824-2 (Automatique)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORPS DE L'EXPLORATEUR 3D --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre de Filtres Systèmes */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tous les organes' },
              { id: 'moteur', label: '1. Organe Moteur' },
              { id: 'rouage', label: '2. Rouage & Finissage' },
              { id: 'echappement', label: '3. Échappement Suisse' },
              { id: 'organe_reglateur', label: '4. Organe Régulateur' },
              { id: 'bati', label: '5. Ponts & Platine' }
            ].map((sys) => (
              <button
                key={sys.id}
                onClick={() => setSelectedSystem(sys.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSystem === sys.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow'
                    : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                }`}
              >
                {sys.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsKinematicPlaying(!isKinematicPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20"
            >
              {isKinematicPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isKinematicPlaying ? 'Pause Cinématique' : 'Lancer Cinématique'}</span>
            </button>

            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isExploded
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                  : 'bg-white dark:bg-[#0f1422] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Vue Éclatée Active' : 'Vue Assemblée'}</span>
            </button>
          </div>
        </div>

        {/* Grille principale : Scène Vectorielle 3D (Gauche) + Fiche d'Atelier (Droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SCÈNE VECTORIELLE 3D & ÉCLATÉ */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[580px]">
            {/* Commandes de la scène (Zoom & Hauteur d'éclaté) */}
            <div className="flex items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                  Échelle Éclaté :
                </span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={explosionDistance}
                  onChange={(e) => {
                    setExplosionDistance(Number(e.target.value));
                    setIsExploded(true);
                  }}
                  className="w-24 sm:w-32 accent-amber-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-amber-500">{explosionDistance} mm</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold hover:bg-amber-500 hover:text-slate-950"
                  title="Dézoomer"
                >
                  -
                </button>
                <span className="text-xs font-mono font-bold px-1 text-slate-500">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold hover:bg-amber-500 hover:text-slate-950"
                  title="Zoomer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Représentation Visuelle Isométrique Éclatée */}
            <div className="relative flex-1 flex items-center justify-center py-6 my-auto select-none overflow-hidden">
              {/* Grille d'atelier en filigrane */}
              <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

              <div
                className="relative transition-transform duration-500 ease-out flex flex-col items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) perspective(1000px) rotateX(${isExploded ? '25deg' : '0deg'}) rotateZ(${isExploded ? '-10deg' : '0deg'})`
                }}
              >
                {/* SVG Interactif Dynamique des Couches du Calibre */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] drop-shadow-2xl overflow-visible"
                >
                  <defs>
                    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#a16207" />
                    </linearGradient>
                    <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fda4af" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="glucydurGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fed7aa" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                  </defs>

                  {/* COUCHE 0 : PLATINE PRINCIPALE (Bas de l'éclaté) */}
                  <g
                    transform={`translate(0, ${isExploded ? explosionDistance * 2.2 : 0})`}
                    className="cursor-pointer transition-transform duration-500"
                    onClick={() => setSelectedPartId('platine')}
                  >
                    <circle
                      cx="250"
                      cy="250"
                      r="190"
                      fill="url(#brassGrad)"
                      stroke={selectedPartId === 'platine' ? '#38bdf8' : '#78350f'}
                      strokeWidth={selectedPartId === 'platine' ? '4' : '2'}
                      className="transition-all hover:brightness-110"
                    />
                    {/* Creusures et perlage sur la platine */}
                    <circle cx="170" cy="180" r="65" fill="#ca8a04" opacity="0.4" />
                    <circle cx="310" cy="190" r="45" fill="#ca8a04" opacity="0.4" />
                    <circle cx="270" cy="320" r="50" fill="#ca8a04" opacity="0.4" />
                    <text x="210" y="420" fill="#78350f" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      ETA 6497-1 • SWISS MADE
                    </text>
                  </g>

                  {/* COUCHE 1 : TRAIN D'ENGRENAGES & BARILLET (Moteur & Rouages) */}
                  <g
                    transform={`translate(0, ${isExploded ? explosionDistance * 1.1 : 0})`}
                    className="transition-transform duration-500"
                  >
                    {/* BARILLET */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('barillet')}
                      transform="translate(170, 180)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="62"
                        fill="url(#brassGrad)"
                        stroke={selectedPartId === 'barillet' ? '#38bdf8' : '#854d0e'}
                        strokeWidth={selectedPartId === 'barillet' ? '4' : '2'}
                      />
                      {/* Dents de barillet */}
                      <circle cx="0" cy="0" r="58" stroke="#a16207" strokeWidth="3" strokeDasharray="4 2" fill="none" />
                      <circle cx="0" cy="0" r="14" fill="url(#steelGrad)" stroke="#475569" strokeWidth="1.5" />
                      <text x="-25" y="4" fill="#451a03" fontSize="10" fontWeight="bold">BARILLET</text>
                    </g>

                    {/* ROUE DE CENTRE */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('grande_moyenne')}
                      transform="translate(250, 250)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="42"
                        fill="url(#glucydurGrad)"
                        stroke={selectedPartId === 'grande_moyenne' ? '#38bdf8' : '#b45309'}
                        strokeWidth={selectedPartId === 'grande_moyenne' ? '4' : '2'}
                        className={isKinematicPlaying ? 'animate-spin' : ''}
                        style={{ animationDuration: '30s' }}
                      />
                      <circle cx="0" cy="0" r="6" fill="url(#rubyGrad)" />
                    </g>

                    {/* ROUE MOYENNE */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_moyenne')}
                      transform="translate(305, 205)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="34"
                        fill="url(#glucydurGrad)"
                        stroke={selectedPartId === 'roue_moyenne' ? '#38bdf8' : '#b45309'}
                        strokeWidth={selectedPartId === 'roue_moyenne' ? '3' : '1.5'}
                        className={isKinematicPlaying ? 'animate-spin' : ''}
                        style={{ animationDuration: '10s' }}
                      />
                      <circle cx="0" cy="0" r="4" fill="url(#steelGrad)" />
                    </g>

                    {/* ROUE DE SECONDE (Petite seconde à 9H) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_seconde')}
                      transform="translate(130, 290)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="32"
                        fill="url(#brassGrad)"
                        stroke={selectedPartId === 'roue_seconde' ? '#38bdf8' : '#a16207'}
                        strokeWidth={selectedPartId === 'roue_seconde' ? '3' : '1.5'}
                        className={isKinematicPlaying ? 'animate-spin' : ''}
                        style={{ animationDuration: '4s' }}
                      />
                      <circle cx="0" cy="0" r="3" fill="url(#rubyGrad)" />
                    </g>
                  </g>

                  {/* COUCHE 2 : PONTS DE ROUAGES & ÉCHAPPEMENT */}
                  <g
                    transform={`translate(0, ${isExploded ? 0 : 0})`}
                    className="transition-transform duration-500"
                  >
                    {/* ROUE D'ÉCHAPPEMENT */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_echappement')}
                      transform="translate(200, 320)"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="22"
                        fill="url(#steelGrad)"
                        stroke={selectedPartId === 'roue_echappement' ? '#38bdf8' : '#334155'}
                        strokeWidth={selectedPartId === 'roue_echappement' ? '3' : '1.5'}
                        strokeDasharray="6 2"
                        className={isKinematicPlaying ? 'animate-spin' : ''}
                        style={{ animationDuration: '1.2s' }}
                      />
                      <circle cx="0" cy="0" r="3" fill="url(#rubyGrad)" />
                    </g>

                    {/* ANCRE SUISSE */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('ancre')}
                      transform="translate(235, 335)"
                    >
                      <rect
                        x="-4"
                        y="-16"
                        width="8"
                        height="32"
                        rx="3"
                        fill="url(#steelGrad)"
                        stroke={selectedPartId === 'ancre' ? '#38bdf8' : '#1e293b'}
                        strokeWidth={selectedPartId === 'ancre' ? '2.5' : '1'}
                      />
                      {/* Palettes en Rubis */}
                      <rect x="-8" y="-14" width="5" height="4" rx="1" fill="url(#rubyGrad)" />
                      <rect x="3" y="10" width="5" height="4" rx="1" fill="url(#rubyGrad)" />
                    </g>
                  </g>

                  {/* COUCHE 3 : BALANCIER-SPIRAL, COQ & ANTICHOC (Haut de l'éclaté) */}
                  <g
                    transform={`translate(0, ${isExploded ? -explosionDistance * 1.3 : 0})`}
                    className="cursor-pointer transition-transform duration-500"
                    onClick={() => setSelectedPartId('balancier_spiral')}
                  >
                    {/* Pont de Balancier (Le Coq) */}
                    <path
                      d="M 230,340 C 260,300 340,320 370,360 C 350,380 290,380 240,370 Z"
                      fill="url(#brassGrad)"
                      stroke={selectedPartId === 'balancier_spiral' ? '#38bdf8' : '#78350f'}
                      strokeWidth={selectedPartId === 'balancier_spiral' ? '3' : '1.5'}
                      opacity="0.85"
                    />

                    {/* Sergé du Balancier Glucydur à 3 bras */}
                    <g
                      transform="translate(280, 360)"
                      className={isKinematicPlaying ? 'animate-pulse' : ''}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="55"
                        fill="none"
                        stroke="url(#glucydurGrad)"
                        strokeWidth="5"
                      />
                      {/* 3 Bras de balancier */}
                      <line x1="0" y1="0" x2="0" y2="-55" stroke="url(#glucydurGrad)" strokeWidth="3" />
                      <line x1="0" y1="0" x2="48" y2="28" stroke="url(#glucydurGrad)" strokeWidth="3" />
                      <line x1="0" y1="0" x2="-48" y2="28" stroke="url(#glucydurGrad)" strokeWidth="3" />

                      {/* Spiral horloger plat (Spirale d'Archimède) */}
                      <circle cx="0" cy="0" r="28" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 1" opacity="0.8" />
                      <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 1" opacity="0.8" />
                      <circle cx="0" cy="0" r="8" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />

                      {/* Antichoc Incabloc au centre */}
                      <circle cx="0" cy="0" r="7" fill="url(#rubyGrad)" stroke="#f59e0b" strokeWidth="2" />
                      {/* Ressort Lyre Incabloc */}
                      <circle cx="0" cy="0" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Pied de scène avec légende rapide des pièces */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-400">Composant actif :</span>
                <span className="font-bold text-slate-900 dark:text-white">{activePart.name}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Cliquez directement sur une pièce du calibre pour ouvrir sa fiche technique.
              </div>
            </div>
          </div>

          {/* FICHE D'ATELIER TECHNIQUE DU COMPOSANT SÉLECTIONNÉ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
              {/* En-tête du composant */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    {activePart.nihsCode || 'Norme NIHS Horlogère'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Système : {activePart.system.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {activePart.name}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {activeCalibre.name} • {activeCalibre.lineage}
                </p>
              </div>

              {/* Rôle cinématique */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span>Rôle Cinématique & Fonction d’Établi :</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {activePart.functionDesc}
                </p>
              </div>

              {/* Spécifications d'Atelier en grille */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Matériaux & Alliages</span>
                  </span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {activePart.material}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Ébats & Jeux Fonctionnels</span>
                  </span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {activePart.ebat}
                  </div>
                </div>
              </div>

              {/* Lubrification Officielle Moebius */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-emerald-500" />
                  <span>Lubrification Officielle Recommandée (Suisse) :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {activePart.lubrication}
                </p>
              </div>

              {/* Alerte Critique d'Atelier & Erreur Fréquente */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Point Critique / Erreur à Éviter à l’Établi :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {activePart.atelierCaution}
                </p>
              </div>

              {/* Liste de sélection rapide de toutes les pièces */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Autres pièces du mouvement à inspecter :
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {filteredParts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPartId(p.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedPartId === p.id
                          ? 'bg-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fiche Calibre Global */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span>Fiche Données Constructeur • {activeCalibre.name}</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(activeCalibre.specs).map(([label, val]) => (
                  <div key={label} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">{label}</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Éducative : La Chaîne Cinématique Suisse pas-à-pas */}
        <section className="mt-14 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Pédagogie Horlogère Fondamentale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Le Voyage de l’Énergie : Du Barillet au Balancier
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Comment une tension de ressort se transforme en un battement régulier mesurant les secondes :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Accumulation d’Énergie</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le ressort en alliage Nivaflex enroulé dans le tambour de barillet emmagasine l’énergie transmise par la tige de remontoir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Démultiplication (Rouages)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le train de rouage (grande moyenne, moyenne, seconde) accélère la vitesse de rotation tout en diminuant le couple selon les rapports NIHS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Distribution (Échappement)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                L’ancre suisse et la roue à 15 dents transforment le mouvement de rotation continue en impulsions saccadées alternées.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Régulation (Balancier)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le balancier-spiral oscille avec une période isochrone rigoureuse (ex: 2.5 Hz = 5 alternances/seconde), dictant le rythme exact du temps.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
