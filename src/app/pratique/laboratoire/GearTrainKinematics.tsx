'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Cog,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Droplets,
  Layers,
  Activity,
  Compass,
} from 'lucide-react';

interface GearPreset {
  name: string;
  calKey: '6497' | '2824';
  Z2: number;
  z3: number;
  Z3: number;
  z4: number;
  Z4: number;
  z5: number;
  Z5: number;
  description: string;
}

const PRESETS: Record<string, GearPreset> = {
  '6497': {
    name: 'ETA Unitas 6497-1 (18\'000 A/h — 2.50 Hz)',
    calKey: '6497',
    Z2: 80,
    z3: 10,
    Z3: 75,
    z4: 10,
    Z4: 80,
    z5: 8,
    Z5: 15,
    description:
      'Calibre de poche et montre d’établi traditionnelle. Grande taille de rouage (16½ lignes), inertie élevée, sonnerie de tic-tac lente et majestueuse.',
  },
  '2824': {
    name: 'ETA 2824-2 / Sellita SW200 (28\'800 A/h — 4.00 Hz)',
    calKey: '2824',
    Z2: 64,
    z3: 8,
    Z3: 60,
    z4: 6,
    Z4: 72,
    z5: 6,
    Z5: 15,
    description:
      'Standard moderne suisse de haute précision. Fréquence élevée de 4 Hz conférant une excellente stabilité de marche face aux accélérations du poignet.',
  },
};

interface WheelInfo {
  name: string;
  symbol: string;
  dir: string;
  speed: string;
  oil: string;
  role: string;
  technicalRule: string;
}

export default function GearTrainKinematics() {
  const [selectedPreset, setSelectedPreset] = useState<'6497' | '2824'>('6497');
  const [Z2, setZ2] = useState<number>(80);
  const [z3, setz3] = useState<number>(10);
  const [Z3, setZ3] = useState<number>(75);
  const [z4, setz4] = useState<number>(10);
  const [Z4, setZ4] = useState<number>(80);
  const [z5, setz5] = useState<number>(8);
  const Z5 = 15; // Échappement suisse standard 15 dents

  const [selectedWheelIdx, setSelectedWheelIdx] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation angles
  const [angles, setAngles] = useState({
    barillet: 0,
    centre: 0,
    moyenne: 0,
    seconde: 0,
    echappement: 0,
  });

  const animRef = useRef<number | null>(null);

  const applyPreset = (key: '6497' | '2824') => {
    setSelectedPreset(key);
    const p = PRESETS[key];
    setZ2(p.Z2);
    setz3(p.z3);
    setZ3(p.Z3);
    setz4(p.z4);
    setZ4(p.Z4);
    setz5(p.z5);
  };

  // Kinematic calculations
  const numerator = Z2 * Z3 * Z4 * 2 * Z5;
  const denominator = z3 * z4 * z5;
  const vph = denominator > 0 ? Math.round(numerator / denominator) : 0;
  const hz = (vph / 7200).toFixed(2);
  const secRatio = z3 > 0 && z4 > 0 ? ((Z2 * Z3) / (z3 * z4)).toFixed(1) : '0';

  // Animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // Base speed for Centre wheel (1 rotation per 12 seconds in demo mode)
        const baseSpeed = 30; // deg/s
        const rMoyenne = z3 > 0 ? Z2 / z3 : 1;
        const rSeconde = z3 > 0 && z4 > 0 ? (Z2 * Z3) / (z3 * z4) : 1;
        const rEchapp = z3 > 0 && z4 > 0 && z5 > 0 ? (Z2 * Z3 * Z4) / (z3 * z4 * z5) : 1;

        setAngles((prev) => ({
          barillet: (prev.barillet + 2 * dt) % 360,
          centre: (prev.centre - baseSpeed * dt) % 360,
          moyenne: (prev.moyenne + baseSpeed * rMoyenne * dt) % 360,
          seconde: (prev.seconde - baseSpeed * rSeconde * 0.15 * dt) % 360,
          echappement: (prev.echappement + baseSpeed * rEchapp * 0.05 * dt) % 360,
        }));
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, Z2, z3, Z3, z4, Z4, z5]);

  const WHEELS_DATA: WheelInfo[] = [
    {
      name: '1. Tambour de Barillet (Organe Moteur)',
      symbol: 'Z1',
      dir: 'Sens Horaire (↻)',
      speed: '1 tour en ~6h30 à 8h',
      oil: 'Moebius HP-1300 (Arbre) + Moebius 8217 (Paroi de friction)',
      role: 'Accumulateur du ressort de traction. Fournit le couple maximal de départ transmis au rouage multiplicateur.',
      technicalRule:
        'Le ressort moteur doit délivrer un couple régulier sur l’ensemble des 40 à 50 heures de réserve de marche.',
    },
    {
      name: `2. Roue de Centre (Z2 = ${Z2} dents)`,
      symbol: 'Z2',
      dir: 'Sens Anti-Horaire (↺)',
      speed: '1 tour par heure exactement (60 min)',
      oil: 'Moebius HP-1300 (Pivots et paliers rubis)',
      role: 'Mobile fondamental de référence temporelle. Porte la chaussée pour l’entraînement direct de l’aiguille des minutes.',
      technicalRule:
        'Son entraxe avec le pignon de moyenne conditionne le bon engrènement cycloïdal et la liberté des ébats de hauteur.',
    },
    {
      name: `3. Roue de Moyenne (Z3 = ${Z3} / Pignon z3 = ${z3})`,
      symbol: 'Z3 / z3',
      dir: 'Sens Horaire (↻)',
      speed: `${z3 > 0 ? (Z2 / z3).toFixed(1) : 0} tours / heure`,
      oil: 'Moebius HP-1300 (Pivots supérieur et inférieur)',
      role: 'Mobile intermédiaire démultiplicateur de vitesse reliant la roue de centre à la roue des secondes.',
      technicalRule:
        'Subit un couple intermédiaire moyen. Un défaut de pivotement à ce niveau entraîne une chute drastique de l’amplitude du balancier.',
    },
    {
      name: `4. Roue de Seconde (Z4 = ${Z4} / Pignon z4 = ${z4})`,
      symbol: 'Z4 / z4',
      dir: 'Sens Anti-Horaire (↺)',
      speed: '1 tour par minute exactement (60 tr/h)',
      oil: 'Moebius 9010 (Huile fine synthétique à faible viscosité)',
      role: 'Porte la trotteuse de seconde au centre ou décentrée à 9h. Entraîne le pignon de la roue d’échappement.',
      technicalRule:
        'Le pivot de trotteuse traverse la chaussée. Exige une goutte d’huile Moebius 9010 parfaitement calibrée au 1/2 du rubis.',
    },
    {
      name: `5. Roue d'Échappement (Z5 = 15 dents / Pignon z5 = ${z5})`,
      symbol: 'Z5 / z5',
      dir: 'Sens Horaire (↻)',
      speed: `${z5 > 0 ? ((Z4 / z5) * 60).toFixed(0) : 0} tours / heure`,
      oil: 'Moebius 9010 (Pivots) + Moebius 9415 (Plan d’impulsion des palettes d’ancre)',
      role: 'Organe de distribution d’énergie. Libère pas à pas l’énergie du rouage vers l’ancre suisse (30 alternances par tour).',
      technicalRule:
        'Les plans d’impulsion reçoivent la graisse spéciale thixotrope Moebius 9415 sur 2 à 3 dents maximum lors du huilage.',
    },
  ];

  const currentWheel = WHEELS_DATA[selectedWheelIdx] || WHEELS_DATA[1];

  return (
    <div className="space-y-6">
      {/* Top Banner & Preset Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                Théorie &amp; Cinématique Horlogère
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Norme NIHS 20-25
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Chaîne Cinématique du Rouage &amp; Formule de Fréquence
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPreset('6497')}
              className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                selectedPreset === '6497'
                  ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Calibre ETA 6497-1 (18&apos;000 A/h)
            </button>
            <button
              onClick={() => applyPreset('2824')}
              className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                selectedPreset === '2824'
                  ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Calibre ETA 2824-2 (28&apos;800 A/h)
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 transition"
              title={isPlaying ? 'Mettre en pause la rotation' : 'Reprendre la rotation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-500" />}
            </button>
          </div>
        </div>

        {/* Mathematical Equation Banner */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 my-4 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="text-amber-600 dark:text-amber-400 font-bold mr-2">
              Formule Officielle Suisse :
            </span>
            <span className="font-bold">N (A/h) = </span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">
              ({Z2} × {Z3} × {Z4} × 2 × {Z5})
            </span>{' '}
            ÷{' '}
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              ({z3} × {z4} × {z5})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                Fréquence Calculée
              </span>
              <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                {vph.toLocaleString('fr-CH')} A/h ({hz} Hz)
              </span>
            </div>
            <div className="text-right border-l border-slate-300 dark:border-slate-800 pl-4">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                Rapport Centre / Seconde
              </span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {secRatio} : 1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport (SVG + Mobile Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Animated Gear Train (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono pb-2 mb-2 border-b border-slate-800">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              CLIQUEZ SUR UN MOBILE POUR L&apos;INSPECTER :
            </span>
            <span className="text-slate-400 text-[11px]">
              Sens : <span className="text-emerald-400">↻ Horaire</span> /{' '}
              <span className="text-sky-400">↺ Anti-Horaire</span>
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 640 310"
              className="w-full h-auto min-w-[520px] select-none"
            >
              {/* 1. BARREL */}
              <g
                onClick={() => setSelectedWheelIdx(0)}
                className="cursor-pointer"
              >
                <g transform="translate(85, 165)">
                  <g transform={`rotate(${angles.barillet})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="66"
                      fill="#D4AF37"
                      fillOpacity={selectedWheelIdx === 0 ? '0.35' : '0.18'}
                      stroke="#D4AF37"
                      strokeWidth="3"
                      strokeDasharray="7 4"
                    />
                    <line x1="-60" y1="0" x2="60" y2="0" stroke="#D4AF37" strokeWidth="1.5" />
                    <line x1="0" y1="-60" x2="0" y2="60" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="14" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
                  </g>
                </g>
                <text
                  x="85"
                  y="255"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1. BARILLET ↻
                </text>
                <text
                  x="85"
                  y="270"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                >
                  Z1 (Tambour)
                </text>
              </g>

              {/* 2. CENTER WHEEL */}
              <g
                onClick={() => setSelectedWheelIdx(1)}
                className="cursor-pointer"
              >
                <g transform="translate(215, 155)">
                  <g transform={`rotate(${angles.centre})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="52"
                      fill="#38BDF8"
                      fillOpacity={selectedWheelIdx === 1 ? '0.35' : '0.18'}
                      stroke="#38BDF8"
                      strokeWidth="2.5"
                      strokeDasharray="6 3"
                    />
                    <line x1="-46" y1="0" x2="46" y2="0" stroke="#38BDF8" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="13" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
                  </g>
                </g>
                <text
                  x="215"
                  y="85"
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  2. CENTRE ↺
                </text>
                <text
                  x="215"
                  y="226"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                >
                  Z2={Z2} / z2=12
                </text>
              </g>

              {/* 3. THIRD WHEEL */}
              <g
                onClick={() => setSelectedWheelIdx(2)}
                className="cursor-pointer"
              >
                <g transform="translate(335, 165)">
                  <g transform={`rotate(${angles.moyenne})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="45"
                      fill="#D4AF37"
                      fillOpacity={selectedWheelIdx === 2 ? '0.35' : '0.18'}
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                    />
                    <line x1="-40" y1="0" x2="40" y2="0" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="11" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
                  </g>
                </g>
                <text
                  x="335"
                  y="235"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  3. MOYENNE ↻
                </text>
                <text
                  x="335"
                  y="250"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                >
                  Z3={Z3} / z3={z3}
                </text>
              </g>

              {/* 4. FOURTH WHEEL (SECONDE) */}
              <g
                onClick={() => setSelectedWheelIdx(3)}
                className="cursor-pointer"
              >
                <g transform="translate(445, 155)">
                  <g transform={`rotate(${angles.seconde})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="42"
                      fill="#10B981"
                      fillOpacity={selectedWheelIdx === 3 ? '0.35' : '0.18'}
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                    />
                    <line x1="-38" y1="0" x2="38" y2="0" stroke="#10B981" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
                  </g>
                </g>
                <text
                  x="445"
                  y="92"
                  textAnchor="middle"
                  fill="#10B981"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  4. SECONDE ↺
                </text>
                <text
                  x="445"
                  y="216"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                >
                  Z4={Z4} / z4={z4}
                </text>
              </g>

              {/* 5. ESCAPE WHEEL */}
              <g
                onClick={() => setSelectedWheelIdx(4)}
                className="cursor-pointer"
              >
                <g transform="translate(555, 165)">
                  <g transform={`rotate(${angles.echappement})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="34"
                      fill="#F43F5E"
                      fillOpacity={selectedWheelIdx === 4 ? '0.35' : '0.2'}
                      stroke="#F43F5E"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <line x1="-30" y1="0" x2="30" y2="0" stroke="#F43F5E" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="8" fill="#E11D48" stroke="#FFE4E6" strokeWidth="1.5" />
                  </g>
                </g>
                <text
                  x="555"
                  y="222"
                  textAnchor="middle"
                  fill="#FB7185"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  5. ÉCHAPP. ↻
                </text>
                <text
                  x="555"
                  y="237"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                >
                  Z5={Z5} / z5={z5}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Wheel Inspector + Tooth Count Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Wheel Inspector Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Fiche Technique du Mobile Sélectionné
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {currentWheel.symbol}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
              {currentWheel.name}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">SENS DE ROTATION</span>
                <span className="text-slate-900 dark:text-white font-bold">{currentWheel.dir}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">VITESSE ANGULAIRE</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{currentWheel.speed}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Fonction Mécanique :</span>
              </div>
              {currentWheel.role}
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-amber-100 leading-relaxed">
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-0.5 flex items-center gap-1.5 font-mono">
                <Droplets className="w-3.5 h-3.5" />
                <span>Lubrification Certifiée Moebius :</span>
              </div>
              <span className="font-semibold">{currentWheel.oil}</span>
            </div>
          </div>

          {/* Tooth Count & Pinion Editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 text-xs transition-colors">
            <div className="font-mono uppercase text-amber-600 dark:text-amber-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between">
              <span>Paramètres Dents (Z) &amp; Ailes (z)</span>
              <span className="text-slate-500 dark:text-slate-400">Calcul en temps réel</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono">
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Roue Centre (Z2)</label>
                <input
                  type="number"
                  value={Z2}
                  onChange={(e) => setZ2(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Pignon Moyenne (z3)</label>
                <input
                  type="number"
                  value={z3}
                  onChange={(e) => setz3(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-amber-600 dark:text-amber-400 outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Roue Moyenne (Z3)</label>
                <input
                  type="number"
                  value={Z3}
                  onChange={(e) => setZ3(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Pignon Seconde (z4)</label>
                <input
                  type="number"
                  value={z4}
                  onChange={(e) => setz4(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-amber-600 dark:text-amber-400 outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Roue Seconde (Z4)</label>
                <input
                  type="number"
                  value={Z4}
                  onChange={(e) => setZ4(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                <label className="block text-[10px] text-slate-500 dark:text-slate-400">Pignon Échapp. (z5)</label>
                <input
                  type="number"
                  value={z5}
                  onChange={(e) => setz5(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-bold text-rose-600 dark:text-rose-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
