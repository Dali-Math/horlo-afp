// src/app/pratique/huilage/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  BookOpen,
  Eye,
  Award,
  ZoomIn,
  Sliders,
  Ban,
  Sparkles,
} from 'lucide-react';

interface LubePoint {
  id: 'incabloc' | 'levees' | 'seconde' | 'centre' | 'barillet' | 'remontoir';
  codeEbauches: string;
  name: string;
  category: 'balancier' | 'échappement' | 'rouage' | 'barillet' | 'remontoir';
  oil: string;
  oilBadge: string;
  toolName: string;
  dosage: string;
  instructions: string;
  forbiddenZone: string;
  warning: string;
}

const LUBE_POINTS: LubePoint[] = [
  {
    id: 'incabloc',
    codeEbauches: 'Codes 721 / 730',
    name: 'Pivots de Balancier & Amortisseurs Incabloc',
    category: 'balancier',
    oil: 'Moebius 9010 (Synthétique Fluide — 150 cSt)',
    oilBadge: 'bg-amber-400 text-slate-950',
    toolName: 'Pique-huile Noir (Ø 0.06 mm) ou automatique',
    dosage: 'Ménisque centré couvrant 50 % à 66 % (2/3) du contre-pivot',
    instructions:
      'Déposer la micro-goutte de Moebius 9010 au centre exact du contre-pivot épilamé. Poser le chaton percé par-dessus : la capillarité forme instantanément un anneau circulaire régulier autour du trou olivé.',
    forbiddenZone: 'Ne jamais laisser l’huile toucher le laiton du chaton ni le ressort-lyre.',
    warning:
      'Si le ménisque dépasse 75 % et touche la sertissure en laiton, l’huile file hors du rubis en quelques heures.',
  },
  {
    id: 'levees',
    codeEbauches: 'Codes 705 / 710',
    name: 'Palettes d’Ancre & Denture d’Échappement',
    category: 'échappement',
    oil: 'Moebius 9415 (Thixotrope Spéciale Échappement)',
    oilBadge: 'bg-rose-500 text-white',
    toolName: 'Pique-huile Rouge (Ø 0.15 mm)',
    dosage: 'Micro-touche sur le plan d’impulsion de la palette de sortie toutes les 5 dents (3 dépôts sur 15 dents)',
    instructions:
      'Sur calibre épilamé, déposer une infime touche de Moebius 9415 uniquement sur le plan d’impulsion de la palette en rubis. Faire sauter l’ancre sur 5 dents, puis répéter l’opération 3 fois.',
    forbiddenZone:
      'ZONES STRICTEMENT SÈCHES : Pivots d’ancre (710), cornes de fourchette, dard et cheville de plateau (ellipse).',
    warning:
      'Toute trace d’huile sur les pivots d’ancre ou la fourchette colle le dégagement et fait chuter l’amplitude de 40°.',
  },
  {
    id: 'seconde',
    codeEbauches: 'Codes 227 / 705',
    name: 'Pivots Rapides (Roue de Seconde & Roue d’Échappement)',
    category: 'rouage',
    oil: 'Moebius 9010 (Synthétique Fluide)',
    oilBadge: 'bg-amber-400 text-slate-950',
    toolName: 'Pique-huile Rouge (Ø 0.15 mm)',
    dosage: '1/3 à 1/2 du réservoir conique (huilier du rubis)',
    instructions:
      'Amener la spatule du pique-huile rouge chargé de Moebius 9010 au contact du tenon de pivot au centre de l’huilier du rubis. La goutte est aspirée par capillarité dans l’entrefer.',
    forbiddenZone: 'Ne jamais inonder la surface plane du pont ni les ailes du pignon.',
    warning:
      'Un excès d’huile sur le pivot inférieur de la roue d’échappement migre jusqu’aux dents et fausse le tirage.',
  },
  {
    id: 'centre',
    codeEbauches: 'Codes 200 / 206',
    name: 'Pivots Lents sous Fort Couple (Centre & Grande Moyenne)',
    category: 'rouage',
    oil: 'Moebius HP-1300 (Haute Pression — 1300 cSt)',
    oilBadge: 'bg-blue-600 text-white',
    toolName: 'Pique-huile Bleu (Ø 0.25 mm)',
    dosage: '1/2 du réservoir du rubis (ménisque franc)',
    instructions:
      'Ces mobiles encaissent directement le couple élevé du barillet à faible vitesse de rotation. Appliquer la Moebius HP-1300 dans l’huilier après pose du pont et contrôle de l’ébat axial (0.02–0.04 mm).',
    forbiddenZone: 'Plan de voilure des roues en laiton doré et denture épicycloïdale.',
    warning:
      'Une huile trop fluide (9010) sur la roue de centre serait chassée de la zone de pression et provoquerait l’usure du pivot.',
  },
  {
    id: 'barillet',
    codeEbauches: 'Codes 180 / 195 / 770',
    name: 'Tambour de Barillet Automatique & Arbre',
    category: 'barillet',
    oil: 'Moebius 8217 (Bride Glissante) + HP-1300 (Arbre)',
    oilBadge: 'bg-emerald-600 text-white',
    toolName: 'Pique-huile Vert (Ø 0.35 mm) / Brucelle de graissage',
    dosage: '3 touches à 120° de Moebius 8217 sur la paroi interne du tambour',
    instructions:
      'Pour les calibres automatiques, déposer 3 touches régulières de graisse freinante Moebius 8217 dans les encoches de la paroi interne du tambour avant l’estrapadage du ressort. Huiler les portées de l’arbre au HP-1300.',
    forbiddenZone: 'Extérieur du tambour et denture de barillet (doivent rester parfaitement secs).',
    warning:
      'Sans Moebius 8217, la bride glissante broute (usure métallique) ou patine prématurément (perte de réserve de marche).',
  },
  {
    id: 'remontoir',
    codeEbauches: 'Codes 401 / 407 / 435 / 443',
    name: 'Mécanisme de Remontoir, Tirette & Bascule',
    category: 'remontoir',
    oil: 'Moebius 9504 (Graisse Synthétique Haute Pression)',
    oilBadge: 'bg-purple-600 text-white',
    toolName: 'Pique-huile Vert (Ø 0.35 mm)',
    dosage: 'Film localisé sur chaque friction acier/acier',
    instructions:
      'Appliquer la graisse Moebius 9504 sur le carré et le pilote de la tige (401), dans la gorge du pignon coulant (407), sur les dents de loup (denture Breguet), sur le plot de tirette (443) et au bec du ressort-sautoir (445).',
    forbiddenZone: 'Côté cadran proche du disque de quantième et filetage de couronne.',
    warning:
      'Un remontoir monté à sec provoque le grippage du carré de tige et l’arrachement du plot de tirette.',
  },
];

type MeniscusPreset = 'under' | 'optimal' | 'over';

export default function HuilagePage() {
  const [selectedPoint, setSelectedPoint] = useState<LubePoint>(LUBE_POINTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // État du Comparateur Visuel de Ménisque (en % du diamètre du contre-pivot : 20% à 92%)
  const [dropPercent, setDropPercent] = useState<number>(60);
  const [loupeMeniscus, setLoupeMeniscus] = useState<boolean>(false);
  const [loupeOrgan, setLoupeOrgan] = useState<boolean>(false);

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const applyPreset = (preset: MeniscusPreset) => {
    if (preset === 'under') setDropPercent(26);
    if (preset === 'optimal') setDropPercent(60);
    if (preset === 'over') setDropPercent(88);
  };

  const meniscusState: MeniscusPreset =
    dropPercent < 42 ? 'under' : dropPercent <= 70 ? 'optimal' : 'over';

  const questions = [
    {
      question: 'Quel est le diamètre idéal du ménisque de Moebius 9010 vu à travers le contre-pivot d’un Incabloc ?',
      options: [
        'Une goutte occupant 100 % de la pierre et touchant le chaton en laiton',
        'Un ménisque circulaire centré couvrant 50 % à 66 % (2/3) du diamètre du contre-pivot',
        'Une micro-trace couvrant moins de 20 % de la pierre',
        'Aucune huile : le pivot de balancier tourne à sec',
      ],
      correct: 1,
    },
    {
      question: 'Quels sont les 5 lubrifiants certifiés Moebius utilisés pour le rhabillage complet d’un mouvement ?',
      options: [
        'Moebius 9010, HP-1300, 9415, 9504 et 8217',
        'WD-40, huile de vaseline et graisse silicone',
        'Une seule huile universelle pour tous les rubis et ressorts',
        'Uniquement de la graisse graphite',
      ],
      correct: 0,
    },
    {
      question: 'Que se passe-t-il si l’on dépose de l’huile sur les pivots de l’ancre suisse (Code 710) ?',
      options: [
        'L’amplitude augmente de 30°',
        'La capillarité et la viscosité freinent le dégagement de l’ancre, faisant chuter l’amplitude',
        'Cela améliore l’étanchéité du boîtier',
        'Le repère se règle automatiquement',
      ],
      correct: 1,
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const filteredPoints = LUBE_POINTS.filter(
    (pt) => filterCategory === 'all' || pt.category === filterCategory
  );

  // Calculs géométriques pour le SVG du ménisque Incabloc
  // Rayon du contre-pivot dans la vue de dessus = 72 px
  const capRadius = 72;
  const oilRadiusTop = Math.round((dropPercent / 100) * capRadius);
  const oilWidthCross = Math.round((dropPercent / 100) * 140);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Atelier Pratique</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Droplet className="w-3.5 h-3.5 text-amber-500" />
                <span>Normes Suisses NIHS · 5 Lubrifiants Certifiés Moebius</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Huilage, Ménisque &amp; Lubrification d’Établi
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                En horlogerie mécanique, la précision et la tenue de marche sur 5 à 7 ans reposent sur la géométrie exacte du ménisque d’huile et le respect absolu des zones sèches avec les <strong>5 lubrifiants certifiés Moebius (9010, HP-1300, 9415, 9504, 8217)</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 max-w-xs font-medium">
              <strong>Règle d’Or d’Établi :</strong> « Une mauvaise huile ou une goutte qui déborde sur le chaton est pire que pas d’huile du tout. »
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* =====================================================================
            NOUVEAU POSTE : COMPARATEUR VISUEL SVG DU MÉNISQUE D'HUILE (LOUPE 10X)
           ===================================================================== */}
        <section className="rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                <Sliders className="w-4 h-4" /> Simulateur Optique sous Binoculaire · Amortisseur Incabloc (Code 730)
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Comparateur Visuel SVG du Ménisque d’Huile (Moebius 9010)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Variez le volume de la goutte déposée sur le contre-pivot épilamé pour observer son comportement capillaire en <strong>coupe axiale</strong> et en <strong>vue de dessus à travers le rubis</strong>.
              </p>
            </div>

            <button
              onClick={() => setLoupeMeniscus(!loupeMeniscus)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                loupeMeniscus
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-amber-500'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
              {loupeMeniscus ? 'Loupe 10x Active' : 'Activer Loupe 10x'}
            </button>
          </div>

          {/* Boutons de pré-réglages + Curseur micrométrique */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-[#141a2b] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-6 flex flex-wrap gap-2.5">
              <button
                onClick={() => applyPreset('under')}
                className={`flex-1 min-w-[140px] p-3 rounded-xl border text-left transition-all ${
                  meniscusState === 'under'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">État 01 · &lt; 40 %</div>
                <div className="text-xs font-extrabold mt-0.5">Sous-Dosé (Sec)</div>
              </button>

              <button
                onClick={() => applyPreset('optimal')}
                className={`flex-1 min-w-[140px] p-3 rounded-xl border text-left transition-all ${
                  meniscusState === 'optimal'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400">État 02 · 50–66 %</div>
                <div className="text-xs font-extrabold mt-0.5">Dosage Parfait (2/3)</div>
              </button>

              <button
                onClick={() => applyPreset('over')}
                className={`flex-1 min-w-[140px] p-3 rounded-xl border text-left transition-all ${
                  meniscusState === 'over'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-2 ring-rose-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-rose-600 dark:text-rose-400">État 03 · &gt; 75 %</div>
                <div className="text-xs font-extrabold mt-0.5">Sur-Dosé (Fuite)</div>
              </button>
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-400">
                  Ratio Diamètre Goutte / Contre-Pivot (d / D) :
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-black ${
                    meniscusState === 'optimal'
                      ? 'bg-emerald-500 text-slate-950'
                      : meniscusState === 'under'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {dropPercent} % {meniscusState === 'optimal' ? '✓ CONFORME NIHS' : meniscusState === 'under' ? '⚠ INSUFFISANT' : '✗ DÉBORDEMENT'}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={92}
                value={dropPercent}
                onChange={(e) => setDropPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>20 % (Micro-trace)</span>
                <span className="text-emerald-500 font-bold">Zone Idéale : 50 % – 66 % (2/3)</span>
                <span>90 % (Touche le chaton)</span>
              </div>
            </div>
          </div>

          {/* Double Schéma SVG : Coupe Axiale + Vue Binoculaire de Dessus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 rounded-2xl bg-[#070B14] border border-slate-800 p-4 overflow-hidden">
              <svg
                viewBox={loupeMeniscus ? '60 40 600 220' : '0 0 740 310'}
                className="w-full h-auto transition-all duration-500"
              >
                <defs>
                  <pattern id="gridMeniscus" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="740" height="310" fill="url(#gridMeniscus)" />

                {/* ================= GAUCHE : COUPE AXIALE INCABLOC ================= */}
                <g transform="translate(210, 155)">
                  <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    1. COUPE AXIALE MICRO-MÉCANIQUE (INCABLOC)
                  </text>

                  {/* Chaton Laiton (Sertissure) */}
                  <path
                    d="M -115 -65 L -75 -65 L -75 -20 L -95 -20 L -95 45 L -115 45 Z"
                    fill="#b45309"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 115 -65 L 75 -65 L 75 -20 L 95 -20 L 95 45 L 115 45 Z"
                    fill="#b45309"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />

                  {/* Ressort-Lyre Incabloc */}
                  <rect x="-105" y="-78" width="35" height="10" rx="3" fill="#38bdf8" />
                  <rect x="70" y="-78" width="35" height="10" rx="3" fill="#38bdf8" />

                  {/* Pierre Contre-Pivot (Rubis supérieur plat) */}
                  <rect
                    x="-74"
                    y="-58"
                    width="148"
                    height="32"
                    rx="4"
                    fill="#be123c"
                    fillOpacity="0.78"
                    stroke="#fda4af"
                    strokeWidth="1.8"
                  />
                  <text x="0" y="-38" textAnchor="middle" fill="#ffe4e6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    CONTRE-PIVOT RUBIS (ÉPILAMÉ FIXODROP)
                  </text>

                  {/* Pierre Percée (Rubis inférieur à trou olivé) */}
                  <path
                    d="M -92 -10 L -16 -10 L -16 32 L -55 32 L -92 15 Z"
                    fill="#9f1239"
                    fillOpacity="0.82"
                    stroke="#fb7185"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 92 -10 L 16 -10 L 16 32 L 55 32 L 92 15 Z"
                    fill="#9f1239"
                    fillOpacity="0.82"
                    stroke="#fb7185"
                    strokeWidth="1.5"
                  />

                  {/* Ménisque d'huile Moebius 9010 dans l'entrefer capillaire */}
                  <path
                    d={`M ${-oilWidthCross / 2} -26 C ${-oilWidthCross / 2 + 8} -18, ${-oilWidthCross / 2 + 8} -14, ${-oilWidthCross / 2} -10 L ${oilWidthCross / 2} -10 C ${oilWidthCross / 2 - 8} -14, ${oilWidthCross / 2 - 8} -18, ${oilWidthCross / 2} -26 Z`}
                    fill={meniscusState === 'over' ? '#f43f5e' : '#fbbf24'}
                    fillOpacity="0.9"
                    stroke={meniscusState === 'over' ? '#fda4af' : '#fef08a'}
                    strokeWidth="1.5"
                  />

                  {/* Alerte fuite capillaire sur le chaton si sur-dosé */}
                  {meniscusState === 'over' && (
                    <g>
                      <path
                        d="M -74 -26 Q -85 -35, -90 -55"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeDasharray="3 2"
                      />
                      <path
                        d="M 74 -26 Q 85 -35, 90 -55"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeDasharray="3 2"
                      />
                      <text x="0" y="-88" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        ✗ FUITE CAPILLAIRE VERS LE CHATON LAITON !
                      </text>
                    </g>
                  )}

                  {/* Pivot conique du balancier (Ø 0.08 mm) */}
                  <path
                    d="M -13 105 L -13 22 L -11 -25 C -5 -26, 5 -26, 11 -25 L 13 22 L 13 105 Z"
                    fill="#cbd5e1"
                    stroke="#f8fafc"
                    strokeWidth="1.5"
                  />
                  <text x="0" y="92" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                    PIVOT
                  </text>

                  {/* Cotation diamètre ménisque */}
                  <line x1={-oilWidthCross / 2} y1="62" x2={oilWidthCross / 2} y2="62" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="0" y="78" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Ménisque = {dropPercent}% de la pierre
                  </text>
                </g>

                {/* ================= DROITE : VUE DE DESSUS AU BINOCULAIRE ================= */}
                <g transform="translate(555, 155)">
                  <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    2. VUE DE DESSUS (TRANSPARENCE RUBIS)
                  </text>

                  {/* Anneau extérieur du Chaton en laiton */}
                  <circle r="92" fill="#78350f" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* Pierre Contre-Pivot Rubis */}
                  <circle r={capRadius} fill="#4c0519" stroke="#fb7185" strokeWidth="2" />

                  {/* Cercle de référence idéal 2/3 (66%) en pointillés verts */}
                  <circle
                    r={Math.round(capRadius * 0.62)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />

                  {/* Goutte d'huile Moebius 9010 vue par transparence */}
                  <circle
                    r={oilRadiusTop}
                    fill={meniscusState === 'over' ? '#f43f5e' : '#f59e0b'}
                    fillOpacity="0.65"
                    stroke={meniscusState === 'over' ? '#fda4af' : '#fef08a'}
                    strokeWidth="2.5"
                  />

                  {/* Trou de la pierre percée et bout du pivot au centre */}
                  <circle r="15" fill="#881337" stroke="#fda4af" strokeWidth="1.2" />
                  <circle r="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

                  <text x="0" y="114" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">
                    Cercle vert pointillé = Cible idéale 2/3 (60–66%)
                  </text>
                </g>
              </svg>
            </div>

            {/* Diagnostic en direct de l'état sélectionné */}
            <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
                    Diagnostic Sous Binoculaire
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      meniscusState === 'optimal'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : meniscusState === 'under'
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {meniscusState === 'optimal'
                      ? 'Dosage Nominal'
                      : meniscusState === 'under'
                      ? 'Sous-Lubrification'
                      : 'Danger Capillaire'}
                  </span>
                </div>

                {meniscusState === 'optimal' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      Ménisque Parfaitement Centré ({dropPercent} %)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      La goutte de <strong>Moebius 9010</strong> couvre entre <strong>1/2 et 2/3</strong> de la surface du contre-pivot. Grâce au traitement d’épilamage (Fixodrop), l’angle de contact maintient un dôme sphérique fermé autour du pivot de balancier (Ø 0.08 mm).
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Résultat au Witschi :</strong> Amplitude maximale (290°–310° à plat), écart vertical minimal et tenue de l’huile garantie sur 5 à 7 ans.
                    </div>
                  </div>
                )}

                {meniscusState === 'under' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      Goutte Trop Petite ({dropPercent} %)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      En dessous de 40 % du diamètre du contre-pivot, la réserve capillaire est insuffisante. Dès que la montre passe en position verticale (6H, 9H, 3H), le ménisque se rompt d’un côté du tenon.
                    </p>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200">
                      <strong>Conséquence d’atelier :</strong> Oxydation rapide du pivot par frottement limite et dessèchement complet en moins de 18 mois.
                    </div>
                  </div>
                )}

                {meniscusState === 'over' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-rose-600 dark:text-rose-400 flex items-center gap-2">
                      <Ban className="w-5 h-5 shrink-0" />
                      Débordement sur le Chaton ({dropPercent} %)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Dès que le ménisque dépasse 75 % et touche la paroi en laiton non épilamée du chaton, la tension superficielle aspire instantanément toute la goutte hors du rubis vers le ressort-lyre.
                    </p>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-900 dark:text-rose-200">
                      <strong>Action corrective immédiate :</strong> Déposer l’Incabloc, rincer le chaton et le contre-pivot dans deux bains de benzine rectifiée, sécher et recommencer le huilage.
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Pique-huile prescrit : <strong>Noir Ø 0.06 mm</strong> · Huile : <strong>Moebius 9010</strong>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PLAN INTERACTIF PAR ORGANE + SCHÉMA TECHNIQUE SVG DYNAMIQUE
           ===================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet className="w-5 h-5 text-amber-500" />
                <span>Cartographie par Organe &amp; Zones Interdites Sèches</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sélectionnez un organe pour inspecter son schéma vectoriel SVG (point d’huile exact + zone sèche interdite).
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'Tous les organes (6)' },
                { id: 'balancier', label: 'Balancier (9010)' },
                { id: 'échappement', label: 'Échappement (9415)' },
                { id: 'rouage', label: 'Rouage (9010 / HP-1300)' },
                { id: 'barillet', label: 'Barillet (8217)' },
                { id: 'remontoir', label: 'Remontoir (9504)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    filterCategory === f.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Liste des 6 points de lubrification */}
            <div className="lg:col-span-5 space-y-3">
              {filteredPoints.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-[#141a2b] shadow-md ring-1 ring-amber-400/40'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1422] hover:border-amber-500/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 dark:bg-amber-500/20 dark:text-amber-300">
                          {pt.codeEbauches}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          {pt.category}
                        </span>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {pt.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{pt.oil}</div>
                    </div>

                    <div
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
                        isSelected ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Fiche Technique + Schéma SVG Dynamique de l'Organe Sélectionné */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                    {selectedPoint.codeEbauches} · Fiche de Lubrification Officielle
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {selectedPoint.name}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${selectedPoint.oilBadge}`}>
                  {selectedPoint.oil}
                </span>
              </div>

              {/* Schéma SVG Dynamique de l'organe avec Loupe 10x */}
              <div className="rounded-2xl bg-[#070B14] border border-slate-800 p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Schéma Technique Vectoriel : Point de Dépôt vs Zone Sèche Interdite
                  </span>
                  <button
                    onClick={() => setLoupeOrgan(!loupeOrgan)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupeOrgan
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    <ZoomIn className="w-3 h-3" /> {loupeOrgan ? 'Loupe 10x Active' : 'Loupe 10x'}
                  </button>
                </div>

                <svg
                  viewBox={loupeOrgan ? '110 35 300 150' : '0 0 520 220'}
                  className="w-full h-52 transition-all duration-500"
                >
                  <rect width="520" height="220" fill="#070B14" />

                  {selectedPoint.id === 'levees' && (
                    <g>
                      {/* Palette d'ancre en rubis */}
                      <polygon
                        points="150,45 235,45 215,145 150,125"
                        fill="#9f1239"
                        stroke="#fb7185"
                        strokeWidth="2"
                      />
                      <text x="185" y="85" textAnchor="middle" fill="#ffe4e6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        PALETTE RUBIS
                      </text>
                      {/* Dent de la roue d'échappement */}
                      <polygon
                        points="265,185 220,125 255,112 315,175"
                        fill="#475569"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      {/* Micro-touche de Moebius 9415 sur le plan d'impulsion */}
                      <ellipse
                        cx="185"
                        cy="135"
                        rx="22"
                        ry="7"
                        transform="rotate(14 185 135)"
                        fill="#f43f5e"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <text x="185" y="168" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        ✓ Moebius 9415 sur Plan d’Impulsion
                      </text>
                      {/* Zone interdite : Pivot d'ancre & Fourchette */}
                      <g transform="translate(390, 95)">
                        <circle r="28" fill="#450a0a" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" />
                        <circle r="7" fill="#cbd5e1" />
                        <line x1="-20" y1="-20" x2="20" y2="20" stroke="#ef4444" strokeWidth="3" />
                        <text y="45" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                          ✗ PIVOTS D’ANCRE &amp; FOURCHETTE
                        </text>
                        <text y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="monospace">
                          100 % À SEC (ZÉRO HUILE)
                        </text>
                      </g>
                    </g>
                  )}

                  {selectedPoint.id === 'barillet' && (
                    <g>
                      {/* Tambour de barillet automatique */}
                      <circle cx="195" cy="110" r="72" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
                      <circle cx="195" cy="110" r="62" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                      {/* 3 touches de Moebius 8217 à 120° sur paroi interne */}
                      <path d="M 195 48 A 62 62 0 0 1 235 63" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 248 142 A 62 62 0 0 1 215 168" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 136 128 A 62 62 0 0 1 146 72" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                      {/* Bonde centrale D/3 + HP-1300 */}
                      <circle cx="195" cy="110" r="22" fill="#334155" stroke="#3b82f6" strokeWidth="3" />
                      <circle cx="195" cy="110" r="7" fill="#60a5fa" />
                      <text x="385" y="85" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                        ✓ 3 Touches Moebius 8217 (Paroi)
                      </text>
                      <text x="385" y="110" textAnchor="middle" fill="#60a5fa" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                        ✓ Moebius HP-1300 (Portées d’Arbre)
                      </text>
                      <text x="385" y="140" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        ✗ Denture extérieure 100 % sèche
                      </text>
                    </g>
                  )}

                  {selectedPoint.id === 'remontoir' && (
                    <g>
                      {/* Tige de remontoir 401 */}
                      <rect x="60" y="96" width="240" height="22" rx="4" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Pignon coulant 407 avec gorge */}
                      <rect x="155" y="74" width="56" height="66" rx="5" fill="#334155" stroke="#a855f7" strokeWidth="2.5" />
                      <rect x="176" y="74" width="14" height="66" fill="#581c87" />
                      {/* Points de graisse Moebius 9504 */}
                      <circle cx="183" cy="74" r="7" fill="#c084fc" />
                      <circle cx="155" cy="107" r="6" fill="#c084fc" />
                      <circle cx="255" cy="107" r="6" fill="#c084fc" />
                      <text x="260" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                        ✓ Moebius 9504 : Gorge (407), Denture Breguet, Carré &amp; Tirette (443)
                      </text>
                      <text x="260" y="185" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        ✗ Ne jamais faire déborder vers le cadran ou le disque de date
                      </text>
                    </g>
                  )}

                  {(selectedPoint.id === 'incabloc' || selectedPoint.id === 'seconde' || selectedPoint.id === 'centre') && (
                    <g>
                      {/* Pont en laiton rhodié */}
                      <rect x="75" y="65" width="130" height="75" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                      <rect x="315" y="65" width="130" height="75" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                      {/* Rubis percé avec huilier conique */}
                      <path d="M 205 65 L 245 92 L 245 140 L 205 140 Z" fill="#9f1239" stroke="#fb7185" strokeWidth="1.5" />
                      <path d="M 315 65 L 275 92 L 275 140 L 315 140 Z" fill="#9f1239" stroke="#fb7185" strokeWidth="1.5" />
                      {/* Pivot acier */}
                      <rect x="247" y="75" width="26" height="105" rx="4" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="1.5" />
                      {/* Goutte dans le réservoir (huilier) à 1/2 hauteur */}
                      <path
                        d="M 225 80 Q 260 92, 295 80 L 275 95 L 245 95 Z"
                        fill={selectedPoint.id === 'centre' ? '#3b82f6' : '#fbbf24'}
                        fillOpacity="0.9"
                      />
                      {/* Pique-huile amené à 45° */}
                      <line x1="355" y1="22" x2="268" y2="78" stroke="#94a3b8" strokeWidth="3" />
                      <circle
                        cx="268"
                        cy="78"
                        r="4.5"
                        fill={selectedPoint.id === 'centre' ? '#60a5fa' : '#fbbf24'}
                      />
                      <text x="260" y="198" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        ✓ {selectedPoint.oil.split('(')[0]} dans l’huilier (1/2 réservoir) — Pont sec
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Outil & Dosage */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Pique-Huile Recommandé :
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{selectedPoint.toolName}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Dosage Prescrit :
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {selectedPoint.dosage}
                  </div>
                </div>
              </div>

              {/* Procédure pas-à-pas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Procédure d’application à l’établi :
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  {selectedPoint.instructions}
                </p>
              </div>

              {/* Zone interdite sèche + Avertissement */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5">
                  <Ban className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
                  <div>
                    <strong className="font-bold block text-rose-600 dark:text-rose-400">Zone Interdite (Sèche) :</strong>
                    <span>{selectedPoint.forbiddenZone}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <strong className="font-bold block text-amber-700 dark:text-amber-400">Vigilance d’Atelier :</strong>
                    <span>{selectedPoint.warning}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- LES 5 LUBRIFIANTS CERTIFIÉS MOEBIUS & PIQUE-HUILES BERGEON --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Les 5 Lubrifiants Certifiés Moebius &amp; Code Couleur des Pique-Huiles
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Standard officiel des établis horlogers suisses (Bergeon 30102 &amp; godets agate).
              </p>
            </div>
            <span className="text-xs font-mono text-amber-500 font-bold px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
              9010 · HP-1300 · 9415 · 9504 · 8217
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                color: 'bg-amber-400',
                label: 'Moebius 9010',
                sub: 'Pique-huile Noir (0.06 mm)',
                use: 'Pivots rapides : Balancier Incabloc, roue de seconde (227), roue d’échappement (705).',
                spec: 'Viscosité : 150 cSt à 20°C',
              },
              {
                color: 'bg-blue-600',
                label: 'Moebius HP-1300',
                sub: 'Pique-huile Bleu (0.25 mm)',
                use: 'Pivots lents sous forte charge : Arbre de barillet, roue de centre (200), grande moyenne (206).',
                spec: 'Viscosité : 1300 cSt (Haute Pression)',
              },
              {
                color: 'bg-rose-600',
                label: 'Moebius 9415',
                sub: 'Pique-huile Rouge (0.15 mm)',
                use: 'Levées d’ancre en rubis (710) et plans d’impulsion de la roue d’échappement (2.5 à 5 Hz).',
                spec: 'Graisse thixotrope anti-éjection',
              },
              {
                color: 'bg-purple-600',
                label: 'Moebius 9504',
                sub: 'Pique-huile Vert (0.35 mm)',
                use: 'Frictions acier/acier du remontoir : Tige (401), pignon coulant (407), tirette (443), bascule (435).',
                spec: 'Graisse synthétique extrême pression',
              },
              {
                color: 'bg-emerald-600',
                label: 'Moebius 8217',
                sub: 'Pique-huile Vert / Spatule',
                use: 'Paroi interne des tambours de barillets automatiques (180) pour le patinage de la bride glissante.',
                spec: 'Graisse freinante calibrée',
              },
            ].map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${tool.color} flex-shrink-0 shadow-sm`} />
                    <span className="text-sm font-black text-slate-900 dark:text-white">{tool.label}</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    {tool.sub}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{tool.use}</p>
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                  {tool.spec}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- VIDÉO TUTORIEL DE LUBRIFICATION --- */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Démonstration Pratique : Le Geste du Huileur</span>
            </h3>

            <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ARb8Vo4refs"
                title="Techniques de lubrification horlogère"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Contrôle Optique sous Binoculaire (40x)</span>
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              À l’établi, chaque point de lubrification est inspecté sous loupe 10x ou microscope binoculaire avec un éclairage rasant à 45°.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Ménisque régulier :</strong> L’huile doit rester strictement confinée dans le réservoir capillaire du rubis sans baver sur le pont.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Épilamage préalable :</strong> Les contre-pivots, l’ancre et la roue d’échappement sont traités à l’épilame (Fixodrop FK / BS-10) pour maintenir un angle de contact élevé.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Renouvellement au godet :</strong> Les huiles des 4 godets d’établi sont renouvelées chaque semaine et protégées de la poussière par leur couvercle.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- MINI-QUIZ D'ÉVALUATION DU HUILAGE --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Mini-Quiz : Vérifiez votre maîtrise de la lubrification Moebius
            </h3>
            <span className="text-xs font-bold text-amber-500">3 Questions d’Établi</span>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
                  {qIndex + 1}. {q.question}
                </p>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;

                    let btnStyle =
                      'w-full text-left p-3 rounded-xl transition-all text-xs sm:text-sm font-semibold border ';

                    if (showResult) {
                      if (isCorrect) {
                        btnStyle +=
                          'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md';
                      } else if (isSelected && !isCorrect) {
                        btnStyle +=
                          'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500';
                      } else {
                        btnStyle +=
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    } else {
                      btnStyle +=
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400';
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        disabled={showResult}
                        className={btnStyle}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
