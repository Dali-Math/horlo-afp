'use client';

import React, { useState } from 'react';
import {
  Compass,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface IsoLimit {
  ES?: number;
  EI?: number;
  es?: number;
  ei?: number;
}

const ISO286_HOLES: Record<string, Array<{ ES: number; EI: number }>> = {
  H6: [
    { ES: 6, EI: 0 },
    { ES: 8, EI: 0 },
    { ES: 9, EI: 0 },
    { ES: 11, EI: 0 },
  ],
  H7: [
    { ES: 10, EI: 0 },
    { ES: 12, EI: 0 },
    { ES: 15, EI: 0 },
    { ES: 18, EI: 0 },
  ],
  H8: [
    { ES: 14, EI: 0 },
    { ES: 18, EI: 0 },
    { ES: 22, EI: 0 },
    { ES: 27, EI: 0 },
  ],
};

const ISO286_SHAFTS: Record<string, Array<{ es: number; ei: number }>> = {
  f7: [
    { es: -6, ei: -16 },
    { es: -10, ei: -22 },
    { es: -13, ei: -28 },
    { es: -16, ei: -34 },
  ],
  g6: [
    { es: -2, ei: -8 },
    { es: -4, ei: -12 },
    { es: -5, ei: -14 },
    { es: -6, ei: -17 },
  ],
  h6: [
    { es: 0, ei: -6 },
    { es: 0, ei: -8 },
    { es: 0, ei: -9 },
    { es: 0, ei: -11 },
  ],
  js6: [
    { es: 3, ei: -3 },
    { es: 4, ei: -4 },
    { es: 4.5, ei: -4.5 },
    { es: 5.5, ei: -5.5 },
  ],
  k6: [
    { es: 6, ei: 0 },
    { es: 9, ei: 1 },
    { es: 10, ei: 1 },
    { es: 12, ei: 1 },
  ],
  p6: [
    { es: 12, ei: 6 },
    { es: 20, ei: 12 },
    { es: 24, ei: 15 },
    { es: 29, ei: 18 },
  ],
};

interface Preset {
  label: string;
  nominal: number;
  hole: 'H6' | 'H7' | 'H8';
  shaft: 'f7' | 'g6' | 'h6' | 'js6' | 'k6' | 'p6';
  description: string;
}

const PRESETS: Preset[] = [
  {
    label: 'Pivot de mobile dans rubis',
    nominal: 0.18,
    hole: 'H7',
    shaft: 'g6',
    description: 'Ajustement avec jeu garanti. Rotation libre et film d’huile Moebius 9010.',
  },
  {
    label: 'Chassage pierre rubis dans platine',
    nominal: 1.5,
    hole: 'H7',
    shaft: 'p6',
    description: 'Ajustement avec serrage garanti. Fixation ferme à la potence micrométrique.',
  },
  {
    label: 'Goupille de positionnement de pont',
    nominal: 0.8,
    hole: 'H7',
    shaft: 'k6',
    description: 'Ajustement de transition/incertain. Répétabilité exacte des entraxes.',
  },
  {
    label: 'Canon de trotteuse sur tenon',
    nominal: 0.25,
    hole: 'H7',
    shaft: 'h6',
    description: 'Glissement juste sans jeu excessif pour maintien friction de l’aiguille.',
  },
];

export default function NihsToleranceCalculator() {
  const [nominal, setNominal] = useState<number>(0.18);
  const [holeClass, setHoleClass] = useState<'H6' | 'H7' | 'H8'>('H7');
  const [shaftClass, setShaftClass] = useState<'f7' | 'g6' | 'h6' | 'js6' | 'k6' | 'p6'>('g6');
  const [presetLabel, setPresetLabel] = useState<string>('Pivot de mobile');

  const getIsoBandIndex = (dia: number) => {
    if (dia <= 3.0) return 0;
    if (dia <= 6.0) return 1;
    if (dia <= 10.0) return 2;
    return 3;
  };

  const band = getIsoBandIndex(nominal);
  const hole = ISO286_HOLES[holeClass][band];
  const shaft = ISO286_SHAFTS[shaftClass][band];

  const holeIT = hole.ES - hole.EI;
  const shaftIT = shaft.es - shaft.ei;

  const holeMax = nominal + hole.ES / 1000;
  const holeMin = nominal + hole.EI / 1000;
  const shaftMax = nominal + shaft.es / 1000;
  const shaftMin = nominal + shaft.ei / 1000;

  // Clearance (Jeu) = Hole - Shaft
  const maxPlayUm = hole.ES - shaft.ei; // Jeu maxi (si > 0)
  const minPlayUm = hole.EI - shaft.es; // Jeu mini (si > 0 jeu, si < 0 serrage)

  const isClearanceFit = minPlayUm >= 0;
  const isInterferenceFit = maxPlayUm <= 0;
  const isTransitionFit = !isClearanceFit && !isInterferenceFit;

  const applyPreset = (p: Preset) => {
    setNominal(p.nominal);
    setHoleClass(p.hole);
    setShaftClass(p.shaft);
    setPresetLabel(p.label);
  };

  // SVG dynamic positioning for Zero-Line diagram
  // Zero line at Y = 180. Scale: 1 um = 3.5 px
  const zeroY = 180;
  const scale = 3.5;

  const holeTopY = zeroY - hole.ES * scale;
  const holeHeight = (hole.ES - hole.EI) * scale;

  const shaftTopY = zeroY - shaft.es * scale;
  const shaftHeight = (shaft.es - shaft.ei) * scale;

  return (
    <div className="space-y-6">
      {/* Top Banner & Presets */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                Norme ISO 286 / NIHS 02-02
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Tolérances &amp; Ajustements Horlogers
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Calculateur d&apos;Ajustements &amp; Ligne Zéro au Micron
            </h2>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-bold">
            {presetLabel}
          </span>
        </div>

        {/* Real Swiss Watchmaking Presets */}
        <div className="pt-4 flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              {p.label} (Ø {p.nominal} {p.hole}/{p.shaft})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls + Formula & Result (Left) & SVG Diagram (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Inputs & Tolerances Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 transition-colors">
            <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-white">
              Paramètres de la Cote sur Plan
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">
                  Diamètre Nominal (mm) :
                </label>
                <input
                  type="number"
                  min="0.05"
                  max="18.0"
                  step="0.05"
                  value={nominal}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v) && v > 0) setNominal(v);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 font-bold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sky-600 dark:text-sky-400 mb-1 font-bold">
                    Alésage (Trou) :
                  </label>
                  <select
                    value={holeClass}
                    onChange={(e) => setHoleClass(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 font-bold text-sky-600 dark:text-sky-400 outline-none cursor-pointer"
                  >
                    <option value="H6">H6 (Ultra-précis)</option>
                    <option value="H7">H7 (Standard suisse)</option>
                    <option value="H8">H8 (Courant)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-600 dark:text-amber-400 mb-1 font-bold">
                    Arbre (Tige / Pivot) :
                  </label>
                  <select
                    value={shaftClass}
                    onChange={(e) => setShaftClass(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 font-bold text-amber-600 dark:text-amber-400 outline-none cursor-pointer"
                  >
                    <option value="g6">g6 (Jeu glissant - rotation)</option>
                    <option value="f7">f7 (Jeu large - commande)</option>
                    <option value="h6">h6 (Jeu nul / ajusté)</option>
                    <option value="js6">js6 (Incertain centré)</option>
                    <option value="k6">k6 (Incertain goupille)</option>
                    <option value="p6">p6 (Serrage rubis/canon)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Verdict Card */}
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isClearanceFit
                  ? 'bg-sky-500/10 border-sky-500/40 text-sky-900 dark:text-sky-200'
                  : isInterferenceFit
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="font-bold flex items-center justify-between mb-1 uppercase font-mono">
                <span>
                  {isClearanceFit
                    ? 'Ajustement Avec Jeu (Glissant / Tournant)'
                    : isInterferenceFit
                    ? 'Ajustement Avec Serrage (Fixe / Chassé)'
                    : 'Ajustement Incertain (Transition / Centrage)'}
                </span>
                <span className="font-mono text-[11px]">
                  {isClearanceFit
                    ? `+${minPlayUm} à +${maxPlayUm} µm`
                    : isInterferenceFit
                    ? `${minPlayUm} à ${maxPlayUm} µm`
                    : `${minPlayUm} à +${maxPlayUm} µm`}
                </span>
              </div>
              <p>
                {isClearanceFit
                  ? "L'arbre est toujours plus petit que l'alésage. Recommandé pour les pivots de rouage, l'arbre de barillet et le pignon coulant avec film d'huile Moebius."
                  : isInterferenceFit
                  ? "L'arbre est toujours plus grand que l'alésage. Exige un chassage à la potence micrométrique (ex : chassage des pierres rubis dans la platine)."
                  : "Le jeu peut être positif ou négatif selon la fabrication. Utilisé pour les goupilles de centrage démontables de ponts."}
              </p>
            </div>

            {/* Numeric Values Table */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-sky-600 dark:text-sky-400 font-bold block mb-1">
                  ALÉSAGE ({holeClass})
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Écart Sup (ES) :</span>
                  <span className="font-bold text-slate-800 dark:text-white">+{hole.ES} µm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Écart Inf (EI) :</span>
                  <span className="font-bold text-slate-800 dark:text-white">{hole.EI} µm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tolérance (IT) :</span>
                  <span className="text-sky-600 dark:text-sky-400">{holeIT} µm</span>
                </div>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500">Ø Maxi :</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {holeMax.toFixed(3)} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ø Mini :</span>
                  <span className="font-bold">{holeMin.toFixed(3)} mm</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-amber-600 dark:text-amber-400 font-bold block mb-1">
                  ARBRE ({shaftClass})
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Écart Sup (es) :</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {shaft.es > 0 ? `+${shaft.es}` : shaft.es} µm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Écart Inf (ei) :</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {shaft.ei > 0 ? `+${shaft.ei}` : shaft.ei} µm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tolérance (IT) :</span>
                  <span className="text-amber-600 dark:text-amber-400">{shaftIT} µm</span>
                </div>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500">Ø Maxi :</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {shaftMax.toFixed(3)} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ø Mini :</span>
                  <span className="font-bold">{shaftMin.toFixed(3)} mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Dynamic SVG Zero-Line Diagram & Cross Section */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pb-2 mb-2 border-b border-slate-300 dark:border-slate-800">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              DIAGRAMME DES ÉCARTS PAR RAPPORT À LA LIGNE ZÉRO
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-xs">
              Ø {nominal.toFixed(2)} {holeClass}/{shaftClass}
            </span>
          </div>

          <div className="w-full aspect-[650/360]">
            <svg viewBox="0 0 650 360" className="w-full h-full select-none">
              {/* Grid Lines */}
              <line x1="40" y1="90" x2="430" y2="90" className="stroke-slate-300 dark:stroke-[#1E293B]" strokeDasharray="3 3" />
              <line x1="40" y1="135" x2="430" y2="135" className="stroke-slate-300 dark:stroke-[#1E293B]" strokeDasharray="3 3" />
              <line x1="40" y1="225" x2="430" y2="225" className="stroke-slate-300 dark:stroke-[#1E293B]" strokeDasharray="3 3" />
              <line x1="40" y1="270" x2="430" y2="270" className="stroke-slate-300 dark:stroke-[#1E293B]" strokeDasharray="3 3" />

              {/* Zero Line */}
              <line x1="40" y1={zeroY} x2="430" y2={zeroY} className="stroke-slate-700 dark:stroke-[#CBD5E1]" strokeWidth="2.5" />
              <text
                x="45"
                y={zeroY - 8}
                className="fill-slate-700 dark:fill-[#CBD5E1]"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="bold"
              >
                LIGNE ZÉRO (Ø Nominal {nominal.toFixed(2)} mm)
              </text>

              {/* Hole Tolerance Box (Sky Blue) */}
              <rect
                x="115"
                y={holeTopY}
                width="95"
                height={Math.max(10, holeHeight)}
                rx="4"
                fill="#38BDF8"
                fillOpacity="0.25"
                stroke="#38BDF8"
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease-out' }}
              />
              <text
                x="162"
                y={holeTopY - 6}
                textAnchor="middle"
                fill="#38BDF8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="bold"
              >
                +{hole.ES} µm
              </text>
              <text
                x="162"
                y={zeroY + 16}
                textAnchor="middle"
                fill="#38BDF8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
              >
                0 µm
              </text>
              <text
                x="162"
                y={holeTopY + holeHeight / 2 + 5}
                textAnchor="middle"
                fill="#E0F2FE"
                fontFamily="JetBrains Mono, monospace"
                fontSize="13"
                fontWeight="bold"
              >
                {holeClass}
              </text>

              {/* Shaft Tolerance Box (Amber) */}
              <rect
                x="245"
                y={shaftTopY}
                width="95"
                height={Math.max(10, shaftHeight)}
                rx="4"
                fill="#F59E0B"
                fillOpacity="0.3"
                stroke="#F59E0B"
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease-out' }}
              />
              <text
                x="292"
                y={shaftTopY - 6}
                textAnchor="middle"
                fill="#F59E0B"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="bold"
              >
                {shaft.es > 0 ? `+${shaft.es}` : shaft.es} µm
              </text>
              <text
                x="292"
                y={shaftTopY + shaftHeight + 14}
                textAnchor="middle"
                fill="#F59E0B"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
              >
                {shaft.ei > 0 ? `+${shaft.ei}` : shaft.ei} µm
              </text>
              <text
                x="292"
                y={shaftTopY + shaftHeight / 2 + 5}
                textAnchor="middle"
                fill="#FEF3C7"
                fontFamily="JetBrains Mono, monospace"
                fontSize="13"
                fontWeight="bold"
              >
                {shaftClass}
              </text>

              {/* Cross-Section View (Right hand side) */}
              <g transform="translate(535, 175)">
                {/* Hole Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r="66"
                  fill="#0B0F19"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                />
                {/* Shaft Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={isClearanceFit ? 54 : isInterferenceFit ? 72 : 64}
                  fill="#F59E0B"
                  fillOpacity="0.35"
                  stroke={isInterferenceFit ? '#EF4444' : '#F59E0B'}
                  strokeWidth="2.5"
                  strokeDasharray={isInterferenceFit ? '4 2' : 'none'}
                  style={{ transition: 'all 0.3s ease-out' }}
                />
                <circle cx="0" cy="0" r="4" fill="#CBD5E1" />
                <text
                  x="0"
                  y="-80"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  COUPE TRANSVERSALE
                </text>
                <text
                  x="0"
                  y="95"
                  textAnchor="middle"
                  fill={isClearanceFit ? '#38BDF8' : isInterferenceFit ? '#F87171' : '#FBBF24'}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {isClearanceFit
                    ? `JEU : +${minPlayUm} à +${maxPlayUm} µm`
                    : isInterferenceFit
                    ? `SERRAGE : ${Math.abs(maxPlayUm)} à ${Math.abs(minPlayUm)} µm`
                    : `INCERTAIN : ${minPlayUm} à +${maxPlayUm} µm`}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
