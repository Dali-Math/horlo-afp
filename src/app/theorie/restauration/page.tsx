// src/app/theorie/restauration/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ZoomIn,
  Flame,
  Gauge
} from 'lucide-react';

interface RestorationStep {
  number: string;
  title: string;
  subtitle: string;
  tools: string[];
  protocol: string[];
  warning: string;
  precisionTip: string;
}

const RESTORATION_STEPS: RestorationStep[] = [
  {
    number: '01',
    title: 'Diagnostic Préliminaire & Désarmement',
    subtitle: 'Évaluation non-destructive sous cloche d’atelier',
    tools: ['Loupe d’œil 10x et 12x', 'Brucelles Dumont n°3 et n°5', 'Pique-huile', 'Cheville de bois de sureau'],
    protocol: [
      'Contrôle visuel intégral de la pièce : cadran, aiguilles, boîtier et fond.',
      'Désarmer impérativement le ressort moteur avant toute intervention en retenant la couronne et en libérant le cliquet avec une pointe de cheville.',
      'Tester la liberté d’oscillation du balancier par un souffle léger de poire à air.',
      'Contrôler les jeux d’ébat de hauteur et latéraux des mobiles de rouage à la brucelle.'
    ],
    warning: 'Ne JAMAIS dévisser le pont de barillet ou le pont de rouage sans s’être assuré à 100% que le barillet est complètement désarmé, sous peine de briser net les pivots de roue.',
    precisionTip: 'Inspectez les rubis au microscope : une pierre fêlée ou déchassée use le pivot en quelques heures.'
  },
  {
    number: '02',
    title: 'Nettoyage Chimique Doux & Dégommage',
    subtitle: 'Élimination des huiles fossilisées et des oxydes d’époque',
    tools: ['Machine à laver horlogère ou bains de verre', 'Solution Rubisol / Elma', 'Alcool isopropylique', 'Sciure de buis déshydratée'],
    protocol: [
      'Bain n°1 (Nettoyage actif) : Solution ammoniacale dissolvant les graisses séchées et les dépôts carbonés.',
      'Bains n°2 et n°3 (Rinçages) : Alcool isopropylique pur puis essence C rectifiée pour éliminer toute trace d’eau et de détergent.',
      'Séchage doux sous cloche chauffante ou dans de la sciure de buis ultrafine non résineuse.',
      'Brossage délicat des ponts à la brosse horlogère en poils de martre.'
    ],
    warning: 'Ne jamais immerger une ancre suisse ancienne scellée à la gomme-laque dans de l’alcool pur chaud, cela dissoudrait la fixation des levées en rubis.',
    precisionTip: 'Passez une cheville de sureau taillée en biseau dans chaque trou de pierre pour retirer le cambouis récalcitrant.'
  },
  {
    number: '03',
    title: 'Le Bouchonnage des Paliers Ovalisés',
    subtitle: 'Re-baguage micrométrique des trous de platine en laiton',
    tools: ['Potence à river et à boucher Seitz', 'Forets de centrage calibrés', 'Bouchons en laiton suisse H7', 'Équarrissoirs et alésoirs'],
    protocol: [
      'Repérer l’axe d’ovalisation créé par la poussée radiale de l’engrenage sur plusieurs décennies.',
      'Aléser la platine à la potence pour retrouver une circularité parfaite tout en conservant scrupuleusement l’entraxe d’engrenage originel.',
      'Chasser un bouchon en laiton écroui à la potence micrométrique Seitz.',
      'Aléser le trou au diamètre exact du pivot du mobile + 0.012 mm d’ébat fonctionnel.',
      'Polir la creusure à huile (huilier sphérique) pour retenir le lubrifiant Moebius par capillarité.'
    ],
    warning: 'Une erreur de positionnement de 0.02 mm sur le bouchon modifie la pénétration de denture et engendre des coincements d’engrenage.',
    precisionTip: 'Toujours adoucir les arêtes du trou avec un petit alésoir poli pour éviter d’entailler le pivot.'
  },
  {
    number: '04',
    title: 'Roulage & Brunissage des Pivots',
    subtitle: 'Écrouissage et finition poli miroir au tour Jacot',
    tools: ['Tour à pivoter Jacot', 'Brunissoir en carbure de tungstène', 'Huile fine de roulage', 'Lanterne à encoches calibrées'],
    protocol: [
      'Monter le mobile dans l’encoche calibrée de la lanterne sur le tour à pivoter Jacot.',
      'Enduire le brunissoir en carbure d’une micro-goutte d’huile fine.',
      'Faire tourner le mobile à l’archet tout en appliquant une pression horizontale avec le brunissoir en sens inverse.',
      'Resserrer le grain de l’acier (écrouissage superficiel) et éliminer toutes les stries microscopiques pour atteindre un poli miroir glacé.'
    ],
    warning: 'Une pression excessive peut voiler ou casser net le pivot de seconde ou de balancier dont le diamètre n’excède pas 0.10 mm.',
    precisionTip: 'Un pivot roulé et poli miroir réduit les frottements de 60% et multiplie la durée de vie de la lubrification Moebius 9010 par 3.'
  },
  {
    number: '05',
    title: 'Redressage & Réglage du Spiral',
    subtitle: 'Correction du plat, du rond et de la courbe terminale',
    tools: ['Brucelles d’horloger n°5 fines affûtées', 'Miroir d’établi', 'Papier blanc d’observation', 'Banc de réglage'],
    protocol: [
      'Poser le balancier sur un miroir pour vérifier la planéité parfaite du spiral (mise au plat).',
      'Contrôler le développement concentrique des spires sans frottement ni touchement (mise au rond).',
      'Corriger les plis accidentels ou les spires écrasées par de micro-flexions contrôlées aux brucelles n°5.',
      'Vérifier le passage libre de la spire extérieure entre les deux goupilles de raquette.'
    ],
    warning: 'Le spiral Nivarox ou acier bleui réagit au quart de micron : tout geste brusque ou hésitant est irréversible.',
    precisionTip: 'Démagnétisez systématiquement le mouvement après toute manipulation métallique.'
  },
  {
    number: '06',
    title: 'Finitions Décoratives, Anglage & Bleuissage Thermique',
    subtitle: 'La noblesse artisanale du savoir-faire traditionnel',
    tools: ['Limes suisses d’horlogerie taille 6', 'Cabron de peau et tige de gentiane', 'Pâte diamantine', 'Pelle à bleuir & copeaux de laiton'],
    protocol: [
      'Anglage : Chanfreiner les arêtes des ponts à 45° régulier avec une lime de précision puis un cabron et une tige de gentiane.',
      'Poli noir (poli bloqué) : Frotter les têtes de vis en acier sur une plaque de zinc chargée de pâte diamantine.',
      'Bleuissage thermique : Chauffer la vis polie miroir sur un lit de copeaux de laiton jusqu’à 295°C exactement pour obtenir la teinte Bleu Bleuet.'
    ],
    warning: 'Ne jamais dépasser 305°C lors du bleuissage : la teinte vire au gris-bleu pâle et l’acier perd sa dureté élastique.',
    precisionTip: 'Le lit de copeaux de laiton répartit la chaleur uniformément sous toute la pièce en acier.'
  }
];

const DIAGNOSTIC_CASES = [
  {
    id: 'case1',
    symptom: 'La montre fonctionne cadran en bas, mais s’arrête subitement cadran en haut.',
    cause: 'Pivot supérieur de balancier brisé ou contre-pivot Incabloc supérieur encrassé/délogé.',
    solution: 'Démonter le coq, inspecter le pivot supérieur au microscope. Si le pivot est rompu, remplacer l’axe de balancier ou pivoter un nouvel axe au tour.',
    criticalTool: 'Tour d’horloger & Potence à river'
  },
  {
    id: 'case2',
    symptom: 'L’amplitude du balancier est très faible (< 170°) alors que le ressort est armé à bloc.',
    cause: 'Huiles de pivots polymérisées (gommage), ressort moteur affaissé ou ébat axial insuffisant.',
    solution: 'Nettoyage complet par ultrasons, remplacement du ressort de barillet par un ressort Nivaflex moderne, vérification des ébats de ponts.',
    criticalTool: 'Machine à laver horlogère & Estrapade'
  },
  {
    id: 'case3',
    symptom: 'La montre avance d’une heure par jour de manière erratique.',
    cause: 'Spires du spiral magnétisées qui se collent entre elles, ou présence d’une micro-goutte d’huile sur la lame.',
    solution: 'Passage au démagnétiseur d’atelier, dégraissage du spiral à l’essence C pure dans un godet d’observation.',
    criticalTool: 'Démagnétiseur électronique & Essence C'
  },
  {
    id: 'case4',
    symptom: 'Lors du remontage à la couronne, la montre saute des crans et émet un claquement sec.',
    cause: 'Dents du rochet ou du pignon de remontoir émoussées, ou ressort de cliquet brisé.',
    solution: 'Remplacement du ressort de cliquet en corde à piano ou reprise de la denture du rochet.',
    criticalTool: 'Brucelles fortes & Limes horlogères'
  }
];

const BOUCHONNAGE_STAGES = [
  {
    step: 0,
    label: '1. Trou Ovalisé (+45 µm)',
    title: 'Usure Radiale en Œuf de la Platine Laiton',
    desc: 'Sous l’effet continu du couple moteur, le pivot en acier a creusé le laiton dans la direction de la poussée d’engrènement (+0.045 mm). L’entraxe entre roue et pignon s’écarte : les dents s’arc-boutent.'
  },
  {
    step: 1,
    label: '2. Alésage Centré (Ø 1.20 mm)',
    title: 'Centrage sur l’Axe Originel & Alésage à l’Équarrissoir',
    desc: 'L’horloger retrouve le centre géométrique originel (zone non usée opposée à la poussée) et alèse un trou parfaitement cylindrique de Ø 1.200 mm à la potence micrométrique.'
  },
  {
    step: 2,
    label: '3. Chassage Bouchon (H7/p6)',
    title: 'Chassage du Bouchon en Laiton Écroui à la Potence Seitz',
    desc: 'Un bouchon en laiton horloger muni d’un huilier sphérique est chassé avec un serrage de -10 µm (ajustement H7/p6) dans la platine, affleurant exactement la face intérieure.'
  },
  {
    step: 3,
    label: '4. Alésage Final & Huilage',
    title: 'Ajustement final H7/g6 & Lubrification Moebius',
    desc: 'Le trou central du bouchon est alésé au diamètre exact du pivot + 0.012 mm de jeu radial, poli au brunissoir lisse, puis lubrifié au Moebius 9010 ou HP-1300.'
  }
];

export default function RestaurationPage() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [activeDiagnosticId, setActiveDiagnosticId] = useState<string>('case1');

  // Interactive SVG Simulator States
  const [benchTab, setBenchTab] = useState<'bouchonnage' | 'jacot' | 'bleuissage'>('bouchonnage');
  const [bouchonStep, setBouchonStep] = useState<number>(0);
  const [jacotPolished, setJacotPolished] = useState<boolean>(true);
  const [tempC, setTempC] = useState<number>(295);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const currentStep = RESTORATION_STEPS[selectedStepIndex];
  const activeDiagnostic = DIAGNOSTIC_CASES.find((c) => c.id === activeDiagnosticId) || DIAGNOSTIC_CASES[0];

  // Calcul de la couleur d'oxyde d'acier selon la température de revenu (200°C -> 310°C)
  const getTemperColor = (t: number) => {
    if (t < 230) return { hex: '#fde047', name: 'Jaune Paille Clair (220°C)', usage: 'Burins, forets & outils de coupe (62 HRC)', oxideNm: '42 nm' };
    if (t < 255) return { hex: '#d97706', name: 'Jaune Or / Brun (245°C)', usage: 'Ressorts de cliquet & bascules (58 HRC)', oxideNm: '50 nm' };
    if (t < 275) return { hex: '#9333ea', name: 'Pourpre / Gorge-de-Pigeon (265°C)', usage: 'Ressorts de tirette & sautoirs (56 HRC)', oxideNm: '58 nm' };
    if (t < 288) return { hex: '#4f46e5', name: 'Violet Foncé (280°C)', usage: 'Transition avant le bleu horloger', oxideNm: '64 nm' };
    if (t <= 302) return { hex: '#1d4ed8', name: 'Bleu Bleuet Horloger (295°C)', usage: 'Vis d’établi, aiguilles & spiraux (54 HRC)', oxideNm: '70 nm' };
    return { hex: '#64748b', name: 'Gris-Bleu Pâle (> 305°C — Surchauffe)', usage: 'Revenu excessif : acier trop mou, à repolir à blanc', oxideNm: '82 nm' };
  };

  const temperInfo = getTemperColor(tempC);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER CONFORME /THEORIE --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-start mb-4">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l’Espace Théorie</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Rhabillage d’Art &amp; Conservation du Patrimoine Horloger</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Atelier de Restauration &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Rhabillage des Garde-Temps Anciens
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Le protocole technique pas-à-pas de l’établi pour redonner vie aux mouvements anciens : bouchonnage des paliers ovalisés, roulage des pivots au tour Jacot et bleuissage thermique à 295°C sur lit de copeaux de laiton.
          </p>
        </div>
      </section>

      {/* --- CORPS PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* ========================================================================= */}
        {/* BANC VISUEL SVG INTERACTIF DE RESTAURATION (3 ONGLETS + LOUPE 10X)        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Gauge className="w-4 h-4" />
                <span>Laboratoire Visuel SVG de Rhabillage • Loupe 10x</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Bouchonnage Seitz, Tour à Pivoter Jacot &amp; Bleuissage Thermique (295°C)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setBenchTab('bouchonnage')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  benchTab === 'bouchonnage'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                1. Bouchonnage Platine Ovalisée
              </button>
              <button
                onClick={() => setBenchTab('jacot')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  benchTab === 'jacot'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                2. Roulage Pivot au Tour Jacot
              </button>
              <button
                onClick={() => setBenchTab('bleuissage')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  benchTab === 'bleuissage'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                3. Bleuissage Thermique (200°C → 310°C)
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  loupe10x
                    ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>{loupe10x ? 'Loupe 10x Active' : 'Loupe 10x'}</span>
              </button>
            </div>
          </div>

          {benchTab === 'bouchonnage' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                {BOUCHONNAGE_STAGES.map((stg) => (
                  <button
                    key={stg.step}
                    onClick={() => setBouchonStep(stg.step)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      bouchonStep === stg.step
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                  <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                    <svg
                      viewBox="0 0 700 330"
                      className="w-full h-auto transition-transform duration-300"
                      style={{
                        transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                        transformOrigin: '350px 165px'
                      }}
                    >
                      {/* GAUCHE : VUE DE DESSUS DE L'ALÉSAGE DE PLATINE */}
                      <g transform="translate(185, 165)">
                        <text x="0" y="-128" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          VUE DE DESSUS : PLATINE LAITON &amp; AXE D’ENTRAXE
                        </text>
                        <circle cx="0" cy="0" r="108" fill="#b45309" stroke="#fbbf24" strokeWidth="2.5" />
                        {/* Réticule du centre théorique d'origine */}
                        <line x1="-95" y1="0" x2="95" y2="0" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 3" />
                        <line x1="0" y1="-95" x2="0" y2="95" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 3" />

                        {bouchonStep === 0 && (
                          <g>
                            {/* Trou ovalisé vers la droite */}
                            <ellipse cx="18" cy="0" rx="52" ry="34" fill="#060a12" stroke="#f43f5e" strokeWidth="2.5" />
                            <circle cx="32" cy="0" r="24" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="2" />
                            <text x="0" y="130" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Usure radiale +45 µm : Pivot décentré !
                            </text>
                          </g>
                        )}

                        {bouchonStep === 1 && (
                          <g>
                            {/* Trou réalésé Ø 1.20 mm centré sur le réticule */}
                            <circle cx="0" cy="0" r="68" fill="#060a12" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
                            <text x="0" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Alésage recentré Ø 1.200 mm à l’équarrissoir
                            </text>
                          </g>
                        )}

                        {bouchonStep === 2 && (
                          <g>
                            {/* Bouchon en laiton écroui chassé */}
                            <circle cx="0" cy="0" r="70" fill="#f59e0b" stroke="#fde68a" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="20" fill="#060a12" stroke="#fbbf24" strokeWidth="1.5" />
                            <text x="0" y="130" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Bouchon laiton chassé à la potence (H7/p6)
                            </text>
                          </g>
                        )}

                        {bouchonStep === 3 && (
                          <g>
                            <circle cx="0" cy="0" r="70" fill="#f59e0b" stroke="#fde68a" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="34" fill="rgba(16, 185, 129, 0.35)" stroke="#10b981" strokeWidth="2" />
                            <circle cx="0" cy="0" r="24" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="2" />
                            <text x="0" y="130" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Pivot centré (0.00 mm) + Ménisque Moebius 9010
                            </text>
                          </g>
                        )}
                      </g>

                      {/* DROITE : COUPE AXIALE DE LA PLATINE ET DU BOUCHON */}
                      <g transform="translate(520, 165)">
                        <text x="0" y="-128" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          COUPE AXIALE DU PALIER &amp; DU HUILIER
                        </text>
                        <rect x="-125" y="-42" width="250" height="84" rx="4" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />

                        {bouchonStep >= 2 ? (
                          <g>
                            <rect x="-65" y="-42" width="130" height="84" fill="#f59e0b" stroke="#fde68a" strokeWidth="2" />
                            {/* Creusure sphérique du huilier */}
                            <path d="M -38 -42 Q 0 -10, 38 -42 Z" fill="#060a12" />
                            <rect x="-18" y="-42" width="36" height="84" fill="#060a12" />
                            {bouchonStep === 3 && (
                              <>
                                <rect x="-13" y="-32" width="26" height="105" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                                <path d="M -28 -42 Q 0 -16, 28 -42 Z" fill="rgba(16, 185, 129, 0.75)" />
                              </>
                            )}
                          </g>
                        ) : (
                          <rect x="-25" y="-42" width="68" height="84" fill="#060a12" />
                        )}
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      Étape {bouchonStep + 1} / 4
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {BOUCHONNAGE_STAGES[bouchonStep].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {BOUCHONNAGE_STAGES[bouchonStep].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {benchTab === 'jacot' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setJacotPolished(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    !jacotPolished ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  1. Avant Roulage : Pivot Rayé &amp; Oxydé (Ra = 0.45 µm)
                </button>
                <button
                  onClick={() => setJacotPolished(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    jacotPolished ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  2. Après Roulage au Tour Jacot : Poli Miroir Écroui (Ra = 0.02 µm)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                  <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                    <svg
                      viewBox="0 0 700 320"
                      className="w-full h-auto transition-transform duration-300"
                      style={{
                        transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                        transformOrigin: '350px 160px'
                      }}
                    >
                      {/* Broche de lanterne du Tour Jacot (support inférieur à encoche) */}
                      <path d="M 320 190 L 560 190 L 560 245 L 320 245 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                      <text x="440" y="222" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        LANTERNE À ENCOCHE CALIBRÉE (TOUR JACOT)
                      </text>

                      {/* Tige du mobile + Portée conique + Pivot cylindrique */}
                      <path
                        d="M 110 115 L 285 115 C 315 115, 330 145, 355 145 L 515 145 L 515 190 L 355 190 C 330 190, 315 220, 285 220 L 110 220 Z"
                        fill={jacotPolished ? '#f8fafc' : '#94a3b8'}
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />

                      {/* Stries d'usure ou reflet poli miroir sur le pivot */}
                      {!jacotPolished ? (
                        <g stroke="#f43f5e" strokeWidth="2">
                          <line x1="375" y1="145" x2="375" y2="190" />
                          <line x1="405" y1="145" x2="405" y2="190" />
                          <line x1="435" y1="145" x2="435" y2="190" />
                          <line x1="465" y1="145" x2="465" y2="190" />
                          <line x1="490" y1="145" x2="490" y2="190" />
                        </g>
                      ) : (
                        <rect x="360" y="152" width="150" height="10" rx="4" fill="#38bdf8" opacity="0.55" />
                      )}

                      {/* Brunissoir en carbure de tungstène travaillant par le dessus */}
                      <rect
                        x="340"
                        y="82"
                        width="195"
                        height="62"
                        rx="4"
                        fill="#1e293b"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                      />
                      <text x="438" y="116" fill="#fde68a" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        BRUNISSOIR CARBURE DE TUNGSTÈNE
                      </text>

                      <text
                        x="350"
                        y="285"
                        fill={jacotPolished ? '#34d399' : '#fb7185'}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {jacotPolished
                          ? 'Écrouissage superficiel : Ra = 0.02 µm (Frottement réduit de 60%)'
                          : 'Pivot strié (Ra = 0.45 µm) : Usure rapide du rubis et rupture du film Moebius'}
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {jacotPolished ? 'Brunissage & Écrouissage au Carbure' : 'Pourquoi Roulons-nous les Pivots ?'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Contrairement à une meule abrasive qui arrache du métal, le brunissoir du tour Jacot comprime et couche les crêtes microscopiques de l’acier trempé. La dureté superficielle du pivot augmente par écrouissage tout en créant un glacis miroir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {benchTab === 'bleuissage' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Température de la Pelle à Bleuir : {tempC} °C</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { t: 220, label: '220°C Jaune Paille' },
                      { t: 245, label: '245°C Or Brun' },
                      { t: 265, label: '265°C Pourpre' },
                      { t: 295, label: '295°C Bleu Bleuet' },
                      { t: 308, label: '308°C Gris (Surchauffe)' }
                    ].map((p) => (
                      <button
                        key={p.t}
                        onClick={() => setTempC(p.t)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
                          tempC === p.t
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="range"
                  min={200}
                  max={310}
                  step={1}
                  value={tempC}
                  onChange={(e) => setTempC(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                  <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                    <svg
                      viewBox="0 0 700 320"
                      className="w-full h-auto transition-transform duration-300"
                      style={{
                        transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                        transformOrigin: '350px 160px'
                      }}
                    >
                      {/* Pelle en laiton chauffée + Lit de copeaux de laiton */}
                      <rect x="130" y="210" width="440" height="32" rx="6" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                      <text x="350" y="230" fill="#fef3c7" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        PELLE À BLEUIR EN CUIVRE / LAITON ({tempC} °C)
                      </text>

                      {/* Copeaux de laiton répartissant la chaleur */}
                      <path
                        d="M 155 210 Q 190 185, 225 210 Q 260 182, 295 210 Q 350 180, 405 210 Q 460 185, 525 210 Z"
                        fill="#f59e0b"
                        stroke="#fde68a"
                        strokeWidth="1.5"
                      />

                      {/* Vis horlogère vue de dessus (à gauche) et en coupe (à droite) prenant la teinte d'oxyde */}
                      <g transform="translate(250, 125)">
                        <circle cx="0" cy="0" r="56" fill={temperInfo.hex} stroke="#f8fafc" strokeWidth="2.5" />
                        <rect x="-54" y="-8" width="108" height="16" fill="#0f172a" />
                        <text x="0" y="-68" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          TÊTE DE VIS POLIE MIROIR
                        </text>
                      </g>

                      <g transform="translate(465, 125)">
                        <rect x="-55" y="-28" width="110" height="32" rx="6" fill={temperInfo.hex} stroke="#f8fafc" strokeWidth="2" />
                        <rect x="-24" y="4" width="48" height="68" fill={temperInfo.hex} stroke="#cbd5e1" strokeWidth="1.5" />
                        <text x="0" y="-42" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          COUCHE D’OXYDE : {temperInfo.oxideNm}
                        </text>
                      </g>

                      <text x="350" y="285" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        {temperInfo.name} — {temperInfo.usage}
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      Interférence Optique ({temperInfo.oxideNm})
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {temperInfo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Le bleuissage thermique n’est pas un colorant : c’est une couche nanométrique de magnétite (Fe₃O₄) qui croît à la surface d’un acier préalablement poli blanc miroir et dégraissé à l’essence C. À 295°C exactement, l’épaisseur de 70 nm produit par interférence lumineuse le célèbre <strong>Bleu Bleuet</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 1 : LE PROTOCOLE EN 6 ÉTAPES D'ATELIER */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                Guide Méthodologique d’Établi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Les 6 Étapes de Rhabillage d’une Montre Ancienne
              </h2>
            </div>

            {/* Sélecteur d'étapes */}
            <div className="flex flex-wrap gap-1.5">
              {RESTORATION_STEPS.map((s, idx) => (
                <button
                  key={s.number}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                    selectedStepIndex === idx
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>
          </div>

          {/* Fiche active de l'étape */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-amber-500 text-slate-950">
                    ÉTAPE {currentStep.number} / 06
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentStep.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {currentStep.title}
                </h3>
              </div>

              {/* Protocole détaillé */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                  Protocole Opératoire d’Atelier :
                </h4>
                <div className="space-y-2.5">
                  {currentStep.protocol.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avertissement & Astuce de précision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                  <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Alerte Critique Risque de Casse</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.warning}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Secret d’Établi Horloger</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.precisionTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Outillage Requis pour cette étape */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Outillage d’Atelier Indispensable</span>
              </div>

              <div className="space-y-2">
                {currentStep.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                ℹ️ Travaillez toujours sur un établi horloger ergonomique avec accoudoirs à hauteur d’yeux et sous éclairage daylight sans ombre.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 : LABORATOIRE INTERACTIF DE DIAGNOSTIC DE PANNES ANCIENNES */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Cas Pratiques d’Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Laboratoire de Diagnostic de Pannes Réelles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Sélectionnez un symptôme d’avarie rencontré sur une montre ancienne pour découvrir l’origine mécanique et la méthode de réparation :
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DIAGNOSTIC_CASES.map((diag) => (
              <button
                key={diag.id}
                onClick={() => setActiveDiagnosticId(diag.id)}
                className={`p-4 rounded-2xl text-left text-xs transition-all flex flex-col justify-between min-h-[90px] ${
                  activeDiagnosticId === diag.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                }`}
              >
                <span>{diag.symptom}</span>
                <span className={`text-[10px] uppercase font-bold mt-2 ${activeDiagnosticId === diag.id ? 'text-slate-950 underline' : 'text-amber-500'}`}>
                  Inspecter la Panne →
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#07090e] border-2 border-amber-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="text-xs font-bold uppercase text-slate-400">
                Symptôme sélectionné :
              </div>
              <div className="text-xs font-mono font-bold text-amber-500">
                Outil clé requis : {activeDiagnostic.criticalTool}
              </div>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              « {activeDiagnostic.symptom} »
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-500">Origine Mécanique :</span>
                <div className="text-slate-700 dark:text-slate-300 font-medium">
                  {activeDiagnostic.cause}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Solution d’Atelier Concrète :</span>
                <div className="text-slate-700 dark:text-slate-300 font-medium">
                  {activeDiagnostic.solution}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 : LES GRANDES ARCHIVES & PATRIMOINE HORLOGER SUISSE */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Patrimoine &amp; Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Grandes Références de la Restauration Suisse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🏛️</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Musée International d’Horlogerie (MIH)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Situé à La Chaux-de-Fonds, le MIH abrite le centre de restauration le plus prestigieux au monde pour la conservation des pièces séculaires.
              </p>
              <a
                href="https://www.mih.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Explorer les Collections MIH</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">📜</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Fédération de l’Industrie Horlogère Suisse (FH)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Les normes NIHS officielles régissant les filetages, dentures, emboîtages et tolérances d’ébats appliquées dans toute la Suisse.
              </p>
              <a
                href="https://www.fhs.swiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Consulter les Normes FH</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🔍</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Base Ranfft des Calibres Historiques
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                L’encyclopédie de référence mondiale répertoriant les calibres anciens, leurs dimensions en lignes, leurs tiges de remontoir et balanciers.
              </p>
              <a
                href="https://www.ranfft.de/cgi-bin/bidfun-db.cgi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Accéder à la Base Ranfft</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
