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
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Crosshair,
  Sparkles as SparklesIcon
} from 'lucide-react';

export interface MovementPart {
  id: string;
  name: string;
  system: 'moteur' | 'rouage' | 'echappement' | 'organe_reglateur' | 'bati';
  material: string;
  functionDesc: string;
  ebat: string;
  lubrication: string;
  atelierCaution: string;
  color: string;
  nihsCode?: string;
  specs: { [key: string]: string };
}

const CALIBRES_DATA = {
  eta6497: {
    id: 'eta6497',
    name: 'ETA 6497-1 Unitas',
    lineage: '16½ lignes (Ø 36.60 mm • H 4.50 mm)',
    type: 'Calibre mécanique de poche & d’école à remontage manuel',
    specs: {
      'Fréquence': '18’000 A/h (2.5 Hz)',
      'Pierres': '17 rubis synthétiques chassés',
      'Réserve de marche': '46 heures réelles',
      'Balancier': 'Glucydur à 3 bras masselottes',
      'Spiral': 'Nivarox 1 plat avec virole',
      'Antichoc': 'Système Incabloc amortisseur'
    },
    parts: [
      {
        id: 'platine',
        name: 'Platine Principale Perlée',
        system: 'bati',
        material: 'Laiton horloger (CuZn39Pb2), nickelé et perlé à la main',
        functionDesc: 'Châssis porteur principal supportant l’empierrement, les piliers de centrage et l’ensemble des mobiles cinématiques.',
        ebat: 'Planéité rigoureuse d’établi < 0.003 mm',
        lubrication: 'Aucune lubrification directe (huilage réservé aux creusures de pierres)',
        atelierCaution: 'Manipuler impérativement avec brucelles à bouts fins laiton ou plastique pour préserver le perlage.',
        color: '#d4af37',
        nihsCode: 'NIHS 02-01',
        specs: { 'Diamètre': '36.60 mm', 'Finition': 'Perlage circulaire suisse croisé' }
      },
      {
        id: 'barillet',
        name: 'Tambour de Barillet & Rochet Soleillé',
        system: 'moteur',
        material: 'Tambour en laiton, bonde en acier trempé, ressort moteur Nivaflex',
        functionDesc: 'Réservoir d’énergie motrice délivrant un couple régulier sur 46 heures grâce au rochet à denture biseautée et cliquet.',
        ebat: 'Ébat axial de hauteur : 0.05 à 0.08 mm',
        lubrication: 'Moebius 8200 pour les spires du ressort / Graisse Klüber P125 pour la bonde',
        atelierCaution: 'Désarmer entièrement le ressort avant tout démontage. Utiliser une estrapade de taille appropriée.',
        color: '#eab308',
        nihsCode: 'NIHS 12-05',
        specs: { 'Couple max': '1.25 N.mm', 'Finition': 'Rochet soleillé radial haute brillance' }
      },
      {
        id: 'grande_moyenne',
        name: 'Roue de Centre (Grande Moyenne)',
        system: 'rouage',
        material: 'Roue en laiton horloger doré, pignon en acier 20AP poli miroir',
        functionDesc: 'Tourne à raison d’exactement 1 tour en 60 minutes. Porte la chaussée pour l’entraînement de l’aiguille des minutes.',
        ebat: 'Ébat axial : 0.02 à 0.03 mm',
        lubrication: 'Moebius HP-1300 (huile haute pression) sur les pivots supérieur et inférieur',
        atelierCaution: 'Prendre garde à l’empierrage central : la pierre de centre supporte la poussée directe du barillet.',
        color: '#f59e0b',
        nihsCode: 'NIHS 15-02',
        specs: { 'Vitesse': '1 tour / heure', 'Bras': '4 bras squelettés polis' }
      },
      {
        id: 'roue_moyenne',
        name: 'Roue Petite Moyenne',
        system: 'rouage',
        material: 'Roue en laiton doré 4 bras, ailes de pignon polies au brunissoir',
        functionDesc: 'Mobile intermédiaire démultiplicateur assurant la transmission continue entre la roue de centre et la roue de seconde.',
        ebat: 'Ébat axial : 0.02 mm contrôlé à la brucelle',
        lubrication: 'Moebius HP-1300 ou 9010 sur pivots de platine et de pont',
        atelierCaution: 'Une infime bavure sur l’aile du pignon provoque un arrêt immédiat du rouage.',
        color: '#f97316',
        nihsCode: 'NIHS 15-04',
        specs: { 'Denture': 'Profil ogival épicycloïdal NIHS', 'Vitesse': '8 tours / heure' }
      },
      {
        id: 'roue_seconde',
        name: 'Roue des Secondes (Petite Seconde à 9H)',
        system: 'rouage',
        material: 'Roue en laiton allégé, long pivot de seconde en acier trempé poli',
        functionDesc: 'Effectue 1 tour complet en 60 secondes. Son pivot traverse le cadran à 9 heures pour porter l’aiguille de petite seconde.',
        ebat: 'Ébat axial : 0.02 mm / aucun frottement radial',
        lubrication: 'Moebius 9010 (huile fluide synthétique)',
        atelierCaution: 'Le pivot de seconde est très mince (0.12 mm) : risque critique de pliure lors de la pose du pont.',
        color: '#fb923c',
        nihsCode: 'NIHS 15-06',
        specs: { 'Vitesse': '1 tour / minute (60 s)', 'Position': 'Secondes décentrées à 9H' }
      },
      {
        id: 'roue_echappement',
        name: 'Roue d’Échappement à 15 Dents',
        system: 'echappement',
        material: 'Acier spécial trempé, plans de repos et d’impulsion polis glace',
        functionDesc: 'Organe de découpage du temps. Retient le rouage et transmet alternativement l’impulsion motrice aux palettes de l’ancre.',
        ebat: 'Ébat axial : 0.015 à 0.025 mm',
        lubrication: 'Moebius 9415 (graisse thixotrope pour échappement) sur les plans d’impulsion',
        atelierCaution: 'Ne jamais huiler directement la serpe ni les sommets de dents : lubrification exclusive sur les palettes.',
        color: '#10b981',
        nihsCode: 'NIHS 20-01',
        specs: { 'Dents': '15 dents en forme de massue', 'Vitesse': 'Assure 2.5 alternances/seconde' }
      },
      {
        id: 'ancre',
        name: 'Ancre Suisse & Levées en Rubis',
        system: 'echappement',
        material: 'Corps d’ancre en acier nickelé, palettes en corindon rouge, dard en laiton',
        functionDesc: 'Transforme la rotation de l’échappement en oscillations alternatives transmises à la cheville de plateau du balancier.',
        ebat: 'Ébat axial : 0.015 mm / Angle de levée total de 52°',
        lubrication: 'Moebius 9415 : micro-goutte étalée sur 1/2 plan d’impulsion de chaque palette',
        atelierCaution: 'Ne jamais tordre la fourchette ni le dard de sécurité sans outil spécialisé et microscope.',
        color: '#06b6d4',
        nihsCode: 'NIHS 20-05',
        specs: { 'Palettes': 'Rubis synthétiques collés à la gomme-laque', 'Sécurité': 'Dard et cornes' }
      },
      {
        id: 'balancier_spiral',
        name: 'Ensemble Balancier-Spiral & Coq',
        system: 'organe_reglateur',
        material: 'Serge en Glucydur amagnétique, spiral compensateur Nivarox 1 bleui',
        functionDesc: 'Cœur régulateur maître du mouvement oscillant à 18’000 A/h. La raquette graduée permet de corriger l’avance ou le retard.',
        ebat: 'Ébat axial : 0.010 mm dans les contre-pivots Incabloc',
        lubrication: 'Moebius 9010 : gouttelette centrée occupant 1/2 à 2/3 du diamètre du contre-pivot poli',
        atelierCaution: 'Le spiral est d’une fragilité absolue. Toute manipulation brutale anéantit l’isochronisme.',
        color: '#3b82f6',
        nihsCode: 'NIHS 22-01',
        specs: { 'Fréquence': '18’000 A/h (2.5 Hz)', 'Amortisseur': 'Blocs Incabloc à ressort lyre' }
      },
      {
        id: 'ponts_cotes_geneve',
        name: 'Ponts de Rouage & Barillet (Côtes de Genève)',
        system: 'bati',
        material: 'Laiton rhodié avec Côtes de Genève circulaires et anglages polis',
        functionDesc: 'Plaques supérieures guidant avec une rigueur micrométrique les axes des mobiles via des rubis sertis dans des chatons.',
        ebat: 'Guidage par pieds de ponts calibrés sans aucun jeu radial',
        lubrication: 'Aucune sur les ponts',
        atelierCaution: 'Serrer les vis de ponts en croix avec des tournevis parfaitement affûtés à la bonne largeur de fente.',
        color: '#94a3b8',
        nihsCode: 'NIHS 04-02',
        specs: { 'Décor': 'Côtes de Genève suisses', 'Vis': 'Acier bleui à la flamme à 290°C' }
      }
    ]
  },
  eta2824: {
    id: 'eta2824',
    name: 'ETA 2824-2 Automatique',
    lineage: '11½ lignes (Ø 25.60 mm • H 4.60 mm)',
    type: 'Calibre automatique suisse moderne à haute fréquence',
    specs: {
      'Fréquence': '28’800 A/h (4.0 Hz)',
      'Pierres': '25 rubis de pivotement',
      'Réserve de marche': '38 heures',
      'Remontage': 'Automatique bidirectionnel sur roulement à billes',
      'Système réglant': 'Système raquette Etachron micrométrique',
      'Antichoc': 'Incabloc antichoc'
    },
    parts: [
      {
        id: 'rotor',
        name: 'Masse Oscillante (Rotor sur Roulement à Billes)',
        system: 'moteur',
        material: 'Segment lourd périphérique haute densité, roulement 5 micro-billes inox',
        functionDesc: 'Arme le barillet dans les 2 sens de rotation par l’inertie des mouvements du poignet grâce aux roues inverseuses.',
        ebat: 'Jeu axial de roulement : 0.02 mm / aucun contact avec les ponts',
        lubrication: 'Moebius 9010 (micro-goutte sur billes) ou graisse fluide spécifique',
        atelierCaution: 'Ne jamais faire tourner le rotor à sec à grande vitesse avec une poire soufflante.',
        color: '#d4af37',
        nihsCode: 'NIHS 14-01',
        specs: { 'Rotation': '360° bidirectionnelle', 'Finition': 'Côtes de Genève et dorure' }
      },
      {
        id: 'etachron',
        name: 'Organe Régulateur & Raquette Etachron',
        system: 'organe_reglateur',
        material: 'Balancier Glucydur 4 Hz, porte-piton mobile et goupilles réglables',
        functionDesc: 'Assure 8 alternances par seconde (28’800 A/h). La raquette Etachron permet un centrage de repère ultra-précis.',
        ebat: 'Jeu du spiral entre goupilles : 0.005 mm (micronique)',
        lubrication: 'Moebius 9010 sur contre-pivots Incabloc',
        atelierCaution: 'Utiliser la clé Etachron dédiée pour orienter le piton sans faire de coude sur le spiral.',
        color: '#3b82f6',
        nihsCode: 'NIHS 22-05',
        specs: { 'Fréquence': '28’800 A/h (4 Hz)', 'Réglage': 'Clé Etachron brevetée' }
      }
    ]
  }
};

export default function Galerie3DPage() {
  const [selectedCalibre, setSelectedCalibre] = useState<'eta6497' | 'eta2824'>('eta6497');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [selectedPartId, setSelectedPartId] = useState<string>('balancier_spiral');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d'); // '2d' (Établi centré) ou '3d' (Éclaté isométrique)
  const [explosionDistance, setExplosionDistance] = useState<number>(35);
  const [isKinematicPlaying, setIsKinematicPlaying] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showReticule, setShowReticule] = useState<boolean>(true);

  const activeCalibre = CALIBRES_DATA[selectedCalibre];

  const filteredParts = useMemo(() => {
    if (selectedSystem === 'all') return activeCalibre.parts;
    return activeCalibre.parts.filter((p) => p.system === selectedSystem);
  }, [activeCalibre, selectedSystem]);

  const activePart = useMemo(() => {
    return activeCalibre.parts.find((p) => p.id === selectedPartId) || activeCalibre.parts[0];
  }, [activeCalibre, selectedPartId]);

  // Recalcul du centrage parfait : les couches se séparent symétriquement de chaque côté du centre (250, 250)
  const layerOffsets = useMemo(() => {
    if (viewMode === '2d') {
      return { layer0: 0, layer1: 0, layer2: 0, layer3: 0 };
    }
    const d = explosionDistance;
    // Décalage symétrique équilibré pour garder le barycentre pile à Y=250
    return {
      layer0: d * 0.9,     // Platine descend modérément
      layer1: d * 0.3,     // Rouages descendent légèrement
      layer2: -d * 0.4,    // Ponts montent
      layer3: -d * 1.1     // Balancier monte en flèche
    };
  }, [viewMode, explosionDistance]);

  const handleResetCenter = () => {
    setZoomLevel(1);
    setExplosionDistance(35);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-10 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Théorie</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Établi Virtuel & Modélisation Cinématique</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Écorché de Précision des Calibres Suisses
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Décortiquez l’architecture interne des mouvements de référence de l’horlogerie suisse. Inspectez chaque composant, ses cotes micrométriques, ses finitions (Côtes de Genève, perlage) et son protocole d’huilage officiel Moebius.
              </p>
            </div>

            {/* Sélecteur de Calibre Haute Horlogerie */}
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

      {/* --- CORPS DE L'EXPLORATEUR --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Barre de Filtres Systèmes & Outils d'Établi */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Tous les organes' },
              { id: 'moteur', label: '1. Moteur (Barillet)' },
              { id: 'rouage', label: '2. Rouage Finissage' },
              { id: 'echappement', label: '3. Échappement Suisse' },
              { id: 'organe_reglateur', label: '4. Balancier & Spiral' },
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

          {/* Outils de Visualisation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsKinematicPlaying(!isKinematicPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20"
            >
              {isKinematicPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isKinematicPlaying ? 'Pause Rouages' : 'Animer Rouages'}</span>
            </button>

            {/* Bascule Mode 2D Centré vs Mode 3D Éclaté */}
            <div className="flex p-1 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setViewMode('2d')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === '2d'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Vue Établi 2D (Centrée)
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === '3d'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Vue Éclatée 3D
              </button>
            </div>
          </div>
        </div>

        {/* GRILLE CENTRALE : BANC D'OPTIQUE (GAUCHE) + FICHE D'ATELIER (DROITE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LE BANC D'OPTIQUE PARFAITEMENT CENTRÉ */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a0e1a] to-[#070a12] border-2 border-slate-700/80 shadow-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[640px]">
            {/* Barre d'Outils Supérieure du Banc d'Optique */}
            <div className="flex items-center justify-between gap-3 z-10 border-b border-slate-800/80 pb-3">
              {/* Contrôle d'Éclaté (affiché en mode 3D) */}
              {viewMode === '3d' ? (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                    Écartement :
                  </span>
                  <input
                    type="range"
                    min="15"
                    max="65"
                    value={explosionDistance}
                    onChange={(e) => setExplosionDistance(Number(e.target.value))}
                    className="w-28 accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-amber-400">{explosionDistance} mm</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Vue Axiale Plane d’Horloger (100% Centrée)</span>
                </div>
              )}

              {/* Zoom & Réticule */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowReticule(!showReticule)}
                  className={`p-1.5 rounded-lg border text-xs transition-all ${
                    showReticule
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                  title="Afficher le réticule de visée"
                >
                  <Crosshair className="w-4 h-4" />
                </button>

                <button
                  onClick={handleResetCenter}
                  className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-mono font-bold"
                  title="Recentrer le calibre"
                >
                  Centrer
                </button>

                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs"
                >
                  -
                </button>
                <span className="text-xs font-mono font-bold px-1.5 text-slate-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* ZONE CENTRALE DU CALIBRE (CENTRE MATRICIEL RIGOUROUX) */}
            <div className="relative flex-1 w-full flex items-center justify-center my-auto overflow-hidden select-none py-4">
              {/* Grille millimétrique d'établi suisse en arrière-plan */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              {/* Réticule optique en croix d'établi */}
              {showReticule && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-full h-[1px] bg-amber-400" />
                  <div className="h-full w-[1px] bg-amber-400 absolute" />
                  <div className="w-32 h-32 rounded-full border border-amber-400 absolute" />
                  <div className="w-64 h-64 rounded-full border border-dashed border-amber-400 absolute" />
                </div>
              )}

              {/* Conteneur SVG avec échelle et inclinaison isométrique propre */}
              <div
                className="relative flex items-center justify-center transition-all duration-500 ease-out origin-center"
                style={{
                  transform: `scale(${zoomLevel}) ${
                    viewMode === '3d' ? 'perspective(1200px) rotateX(24deg) rotateZ(-12deg)' : 'none'
                  }`
                }}
              >
                {/* ============================================================== */}
                {/* SVG VECTORIEL HAUTE DÉFINITION DE L'ETA 6497-1 (100% CENTRÉ) */}
                {/* ============================================================== */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] drop-shadow-2xl overflow-visible"
                >
                  <defs>
                    {/* Motif Perlage Suisse (overlapping engine-turned circles) */}
                    <pattern id="perlagePattern" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="12" cy="12" r="10" fill="#facc15" opacity="0.18" />
                      <circle cx="0" cy="0" r="10" fill="#facc15" opacity="0.18" />
                      <circle cx="24" cy="0" r="10" fill="#facc15" opacity="0.18" />
                      <circle cx="0" cy="24" r="10" fill="#facc15" opacity="0.18" />
                      <circle cx="24" cy="24" r="10" fill="#facc15" opacity="0.18" />
                    </pattern>

                    {/* Dégradé Côtes de Genève (linear metallic waves) */}
                    <linearGradient id="cotesGeneve" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="25%" stopColor="#cbd5e1" />
                      <stop offset="50%" stopColor="#f8fafc" />
                      <stop offset="75%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>

                    {/* Laiton 3N Doré d'Horlogerie */}
                    <radialGradient id="brassLuxe" cx="40%" cy="40%" r="65%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="45%" stopColor="#d4af37" />
                      <stop offset="85%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </radialGradient>

                    {/* Soleillage Rochet de Barillet */}
                    <radialGradient id="sunburstRochet" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#cbd5e1" />
                      <stop offset="80%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#334155" />
                    </radialGradient>

                    {/* Rubis d'Empierrement Corindon (Rouge Cerise Translucide) */}
                    <radialGradient id="rubyJewel" cx="35%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#fbcfe8" />
                      <stop offset="25%" stopColor="#f43f5e" />
                      <stop offset="75%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#4c0519" />
                    </radialGradient>

                    {/* Acier Bleui Thermiquement à 290°C (Vis de Haute Horlogerie) */}
                    <radialGradient id="bluedScrew" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="40%" stopColor="#2563eb" />
                      <stop offset="85%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>

                    {/* Glucydur Doré pour Balancier */}
                    <linearGradient id="glucydurGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>

                  {/* LIGNES D'ASSEMBLAGE ÉCLATÉ (visibles en mode 3D pour un look technique pro) */}
                  {viewMode === '3d' && (
                    <g opacity="0.35" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3">
                      {/* Axe central vers la grande moyenne */}
                      <line x1="250" y1={250 + layerOffsets.layer0} x2="250" y2={250 + layerOffsets.layer3} />
                      {/* Axe du barillet */}
                      <line x1="175" y1={175 + layerOffsets.layer0} x2="175" y2={175 + layerOffsets.layer2} />
                      {/* Axe du balancier */}
                      <line x1="320" y1={320 + layerOffsets.layer0} x2="320" y2={320 + layerOffsets.layer3} />
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* COUCHE 0 : PLATINE PRINCIPALE PERLÉE (Fond de Calibre) */}
                  {/* ============================================================== */}
                  <g
                    transform={`translate(0, ${layerOffsets.layer0})`}
                    className="cursor-pointer transition-transform duration-500"
                    onClick={() => setSelectedPartId('platine')}
                  >
                    {/* Corps principal de la platine (Ø 36.60 mm) centré à (250, 250) */}
                    <circle
                      cx="250"
                      cy="250"
                      r="195"
                      fill="url(#brassLuxe)"
                      stroke={selectedPartId === 'platine' ? '#38bdf8' : '#78350f'}
                      strokeWidth={selectedPartId === 'platine' ? '4' : '2'}
                      className="transition-all hover:brightness-105"
                    />

                    {/* Perlage d'établi sur la platine */}
                    <circle cx="250" cy="250" r="192" fill="url(#perlagePattern)" pointerEvents="none" />

                    {/* Noyures & Creusures usinées dans la masse */}
                    {/* Creusure Barillet */}
                    <circle cx="175" cy="175" r="70" fill="#a16207" opacity="0.35" stroke="#78350f" strokeWidth="1" />
                    {/* Creusure Balancier */}
                    <circle cx="320" cy="320" r="68" fill="#a16207" opacity="0.35" stroke="#78350f" strokeWidth="1" />

                    {/* Gravures d'Atelier Officielles */}
                    <text x="175" y="415" fill="#78350f" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
                      ★ ETA 6497-1 • SWISS MADE ★
                    </text>
                    <text x="195" y="428" fill="#92400e" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      SEVENTEEN 17 JEWELS
                    </text>
                  </g>

                  {/* ============================================================== */}
                  {/* COUCHE 1 : TRAIN D'ENGRENAGES SQUELETTÉS & BARILLET MOTEUR */}
                  {/* ============================================================== */}
                  <g
                    transform={`translate(0, ${layerOffsets.layer1})`}
                    className="transition-transform duration-500"
                  >
                    {/* 1. BARILLET COMPLET & RESSORT MOTEUR */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-102"
                      onClick={() => setSelectedPartId('barillet')}
                      transform="translate(175, 175)"
                    >
                      {/* Tambour de barillet avec denture */}
                      <circle
                        cx="0"
                        cy="0"
                        r="66"
                        fill="url(#brassLuxe)"
                        stroke={selectedPartId === 'barillet' ? '#38bdf8' : '#854d0e'}
                        strokeWidth={selectedPartId === 'barillet' ? '4' : '2'}
                      />
                      <circle cx="0" cy="0" r="63" fill="none" stroke="#a16207" strokeWidth="3" strokeDasharray="5 2" />

                      {/* Rochet soleillé supérieur */}
                      <circle cx="0" cy="0" r="50" fill="url(#sunburstRochet)" stroke="#475569" strokeWidth="1.5" />
                      {/* Rayons du soleillage */}
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1="0"
                          x2={48 * Math.cos((i * 30 * Math.PI) / 180)}
                          y2={48 * Math.sin((i * 30 * Math.PI) / 180)}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                          opacity="0.4"
                        />
                      ))}

                      {/* Vis centrale du rochet en acier bleui */}
                      <circle cx="0" cy="0" r="10" fill="url(#bluedScrew)" stroke="#1e293b" strokeWidth="1" />
                      <line x1="-7" y1="0" x2="7" y2="0" stroke="#f8fafc" strokeWidth="1.5" />

                      <text x="-26" y="24" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        BARILLET
                      </text>
                    </g>

                    {/* 2. ROUE DE CENTRE (GRANDE MOYENNE) À 4 BRAS */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('grande_moyenne')}
                      transform="translate(250, 250)"
                    >
                      <g className={isKinematicPlaying ? 'animate-spin' : ''} style={{ animationDuration: '40s' }}>
                        {/* Jante extérieure dentée */}
                        <circle
                          cx="0"
                          cy="0"
                          r="45"
                          fill="none"
                          stroke="url(#glucydurGold)"
                          strokeWidth="5"
                        />
                        <circle cx="0" cy="0" r="47" fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="3 1.5" />
                        {/* 4 Bras squelettés étirés */}
                        <line x1="-43" y1="0" x2="43" y2="0" stroke="url(#glucydurGold)" strokeWidth="3.5" />
                        <line x1="0" y1="-43" x2="0" y2="43" stroke="url(#glucydurGold)" strokeWidth="3.5" />
                        {/* Pignon central en acier poli */}
                        <circle cx="0" cy="0" r="10" fill="url(#sunburstRochet)" stroke="#334155" strokeWidth="1" />
                      </g>
                      {/* Rubis de pivotement chassé au centre */}
                      <circle
                        cx="0"
                        cy="0"
                        r="6"
                        fill="url(#rubyJewel)"
                        stroke={selectedPartId === 'grande_moyenne' ? '#38bdf8' : '#e11d48'}
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* 3. ROUE MOYENNE À 4 BRAS */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_moyenne')}
                      transform="translate(305, 210)"
                    >
                      <g className={isKinematicPlaying ? 'animate-spin' : ''} style={{ animationDuration: '12s' }}>
                        <circle cx="0" cy="0" r="36" fill="none" stroke="url(#glucydurGold)" strokeWidth="4" />
                        <circle cx="0" cy="0" r="38" fill="none" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 1.5" />
                        <line x1="-34" y1="0" x2="34" y2="0" stroke="url(#glucydurGold)" strokeWidth="3" />
                        <line x1="0" y1="-34" x2="0" y2="34" stroke="url(#glucydurGold)" strokeWidth="3" />
                      </g>
                      <circle
                        cx="0"
                        cy="0"
                        r="5"
                        fill="url(#rubyJewel)"
                        stroke={selectedPartId === 'roue_moyenne' ? '#38bdf8' : '#e11d48'}
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* 4. ROUE DES SECONDES (9 HEURES) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_seconde')}
                      transform="translate(135, 290)"
                    >
                      <g className={isKinematicPlaying ? 'animate-spin' : ''} style={{ animationDuration: '4s' }}>
                        <circle cx="0" cy="0" r="32" fill="none" stroke="url(#glucydurGold)" strokeWidth="3.5" />
                        <circle cx="0" cy="0" r="34" fill="none" stroke="#b45309" strokeWidth="1.2" strokeDasharray="2.5 1" />
                        <line x1="-30" y1="0" x2="30" y2="0" stroke="url(#glucydurGold)" strokeWidth="2.5" />
                        <line x1="0" y1="-30" x2="0" y2="30" stroke="url(#glucydurGold)" strokeWidth="2.5" />
                      </g>
                      <circle
                        cx="0"
                        cy="0"
                        r="4.5"
                        fill="url(#rubyJewel)"
                        stroke={selectedPartId === 'roue_seconde' ? '#38bdf8' : '#e11d48'}
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>

                  {/* ============================================================== */}
                  {/* COUCHE 2 : PONTS DE ROUAGES & ÉCHAPPEMENT SUISSE */}
                  {/* ============================================================== */}
                  <g
                    transform={`translate(0, ${layerOffsets.layer2})`}
                    className="transition-transform duration-500"
                  >
                    {/* PONT DE ROUAGE AVEC CÔTES DE GENÈVE */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('ponts_cotes_geneve')}
                    >
                      <path
                        d="M 210,130 C 270,110 370,160 380,250 C 370,300 320,290 280,260 C 240,240 220,180 210,130 Z"
                        fill="url(#cotesGeneve)"
                        stroke={selectedPartId === 'ponts_cotes_geneve' ? '#38bdf8' : '#94a3b8'}
                        strokeWidth={selectedPartId === 'ponts_cotes_geneve' ? '3.5' : '1.5'}
                        opacity="0.9"
                      />
                      {/* Côtes de Genève (traits de reflets sur le pont) */}
                      <path d="M 230,135 L 360,200" stroke="#f8fafc" strokeWidth="3" opacity="0.4" />
                      <path d="M 245,155 L 375,220" stroke="#f8fafc" strokeWidth="3" opacity="0.4" />
                      <path d="M 260,175 L 370,250" stroke="#f8fafc" strokeWidth="3" opacity="0.4" />

                      {/* Vis bleuies de maintien du pont */}
                      <circle cx="235" cy="145" r="5.5" fill="url(#bluedScrew)" />
                      <line x1="232" y1="145" x2="238" y2="145" stroke="#ffffff" strokeWidth="1" />

                      <circle cx="365" cy="245" r="5.5" fill="url(#bluedScrew)" />
                      <line x1="362" y1="245" x2="368" y2="245" stroke="#ffffff" strokeWidth="1" />
                    </g>

                    {/* ROUE D'ÉCHAPPEMENT À 15 DENTS (Acier trempé) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('roue_echappement')}
                      transform="translate(205, 330)"
                    >
                      <g className={isKinematicPlaying ? 'animate-spin' : ''} style={{ animationDuration: '1.2s' }}>
                        <circle
                          cx="0"
                          cy="0"
                          r="24"
                          fill="none"
                          stroke="url(#sunburstRochet)"
                          strokeWidth="3"
                        />
                        {/* 15 Dents en massue */}
                        <circle cx="0" cy="0" r="26" fill="none" stroke="#475569" strokeWidth="2.5" strokeDasharray="5 2.5" />
                        <circle cx="0" cy="0" r="7" fill="#64748b" />
                      </g>
                      <circle
                        cx="0"
                        cy="0"
                        r="4"
                        fill="url(#rubyJewel)"
                        stroke={selectedPartId === 'roue_echappement' ? '#38bdf8' : '#e11d48'}
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* ANCRE SUISSE AVEC PALETTES RUBIS */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedPartId('ancre')}
                      transform="translate(245, 345)"
                    >
                      {/* Corps d'ancre en acier nickelé */}
                      <rect
                        x="-4.5"
                        y="-18"
                        width="9"
                        height="36"
                        rx="3"
                        fill="url(#sunburstRochet)"
                        stroke={selectedPartId === 'ancre' ? '#38bdf8' : '#334155'}
                        strokeWidth={selectedPartId === 'ancre' ? '2.5' : '1'}
                      />
                      {/* Dard en laiton */}
                      <line x1="0" y1="12" x2="0" y2="22" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
                      {/* Palette d'entrée (rubis) */}
                      <rect x="-9" y="-15" width="6" height="4.5" rx="1" fill="url(#rubyJewel)" stroke="#e11d48" strokeWidth="0.8" />
                      {/* Palette de sortie (rubis) */}
                      <rect x="3.5" y="8" width="6" height="4.5" rx="1" fill="url(#rubyJewel)" stroke="#e11d48" strokeWidth="0.8" />
                    </g>
                  </g>

                  {/* ============================================================== */}
                  {/* COUCHE 3 : BALANCIER-SPIRAL, COQ & ANTICHOC INCABLOC */}
                  {/* ============================================================== */}
                  <g
                    transform={`translate(0, ${layerOffsets.layer3})`}
                    className="cursor-pointer transition-transform duration-500"
                    onClick={() => setSelectedPartId('balancier_spiral')}
                  >
                    {/* LE COQ (PONT DE BALANCIER) */}
                    <path
                      d="M 260,340 C 290,290 380,300 410,350 C 390,395 310,410 270,380 Z"
                      fill="url(#cotesGeneve)"
                      stroke={selectedPartId === 'balancier_spiral' ? '#38bdf8' : '#94a3b8'}
                      strokeWidth={selectedPartId === 'balancier_spiral' ? '3.5' : '1.5'}
                      opacity="0.9"
                    />
                    {/* Côtes de Genève sur le Coq */}
                    <path d="M 280,335 L 390,360" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" />
                    <path d="M 290,355 L 400,380" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" />

                    {/* Échelle de réglage de raquette graduée (+ / -) */}
                    <path d="M 305,335 A 25 25 0 0 1 335,335" fill="none" stroke="#334155" strokeWidth="2" />
                    <text x="298" y="333" fill="#1e293b" fontSize="8" fontWeight="bold">+</text>
                    <text x="338" y="333" fill="#1e293b" fontSize="9" fontWeight="bold">-</text>

                    {/* Vis de fixation du Coq (acier bleui) */}
                    <circle cx="390" cy="365" r="6" fill="url(#bluedScrew)" />
                    <line x1="386" y1="365" x2="394" y2="365" stroke="#ffffff" strokeWidth="1" />

                    {/* ENSEMBLE BALANCIER GLUCYDUR & SPIRAL D'ARCHIMÈDE */}
                    <g transform="translate(320, 355)">
                      {/* Serge du balancier Glucydur (oscillant) */}
                      <g className={isKinematicPlaying ? 'animate-pulse' : ''}>
                        <circle
                          cx="0"
                          cy="0"
                          r="62"
                          fill="none"
                          stroke="url(#glucydurGold)"
                          strokeWidth="6"
                        />
                        {/* 3 Bras de balancier profilés */}
                        <line x1="0" y1="0" x2="0" y2="-62" stroke="url(#glucydurGold)" strokeWidth="4" />
                        <line x1="0" y1="0" x2="54" y2="31" stroke="url(#glucydurGold)" strokeWidth="4" />
                        <line x1="0" y1="0" x2="-54" y2="31" stroke="url(#glucydurGold)" strokeWidth="4" />

                        {/* Masselottes de réglage d'équilibrage périphériques */}
                        <circle cx="0" cy="-56" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                        <circle cx="48" cy="28" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                        <circle cx="-48" cy="28" r="3.5" fill="#fef08a" stroke="#b45309" strokeWidth="1" />

                        {/* Spires du Spiral Nivarox bleui (courbes d'Archimède) */}
                        <circle cx="0" cy="0" r="32" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
                        <circle cx="0" cy="0" r="22" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
                        <circle cx="0" cy="0" r="12" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
                      </g>

                      {/* BLOC INCABLOC AMORTISSEUR AU CENTRE */}
                      <circle cx="0" cy="0" r="11" fill="#d4af37" stroke="#78350f" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="8" fill="url(#rubyJewel)" stroke="#be123c" strokeWidth="1" />
                      {/* Ressort Lyre Incabloc doré caractéristique */}
                      <path
                        d="M -6,-5 C -8,-2 -8,2 -6,5 C -3,7 3,7 6,5 C 8,2 8,-2 6,-5 Z"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Pied de scène avec statut du composant actif */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-md shadow-amber-500/50" />
                <span className="text-slate-400">Organe sélectionné :</span>
                <span className="font-bold text-white text-sm">{activePart.name}</span>
              </div>
              <div className="text-[11px] font-mono text-amber-400/80">
                💡 Cliquez directement sur n’importe quelle pièce pour afficher sa fiche d'établi.
              </div>
            </div>
          </div>

          {/* FICHE D'ATELIER HAUTE PRÉCISION DU COMPOSANT SÉLECTIONNÉ */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              {/* En-tête composant */}
              <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    {activePart.nihsCode || 'Norme Horlogère Suisse'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Système : {activePart.system}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {activePart.name}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {activeCalibre.name} • {activeCalibre.lineage}
                </p>
              </div>

              {/* Rôle cinématique */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-1 leading-relaxed">
                <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span>Rôle Cinématique & Fonction d’Établi :</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {activePart.functionDesc}
                </p>
              </div>

              {/* Matériau & Tolérances d'ébats */}
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
                    <span>Tolérances d’Ébats</span>
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
                  <span>Lubrification Officielle Moebius (Suisse) :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {activePart.lubrication}
                </p>
              </div>

              {/* Piège Critique d'Atelier à Éviter */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Point Critique / Erreur à Éviter à l’Atelier :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {activePart.atelierCaution}
                </p>
              </div>

              {/* Sélecteur rapide de toutes les pièces */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Sélection directe d’un composant :
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

            {/* Fiche Constructeur Globale */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                <span>Spécifications Générales • {activeCalibre.name}</span>
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

        {/* Section Pédagogique : La Chaîne Cinématique Suisse */}
        <section className="mt-12 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Pédagogie d’Atelier
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              La Chaîne Cinématique : Du Ressort au Battement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">1. Accumulation Motrice</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le ressort enroulé dans le barillet emmagasine l’énergie transmise par la tige de remontoir (46h de réserve).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">2. Démultiplication</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le train de rouages (centre, moyenne, seconde) accélère la vitesse de rotation en réduisant le couple.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">3. Échappement Suisse</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                L’ancre à rubis et la roue à 15 dents transforment la force continue en impulsions alternatives séquencées.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
              <div className="w-7 h-7 rounded-xl bg-blue-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">4. Régulation Isochrone</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Le balancier-spiral oscille à 18’000 A/h (2.5 Hz), dictant le découpage rigoureusement exact du temps.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
