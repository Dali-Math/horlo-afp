'use client';

import React, { useState } from 'react';
import {
  Scissors,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Compass,
} from 'lucide-react';

interface StemState {
  chamfered: boolean;
  loctited: boolean;
  testPos: 1 | 2 | 3;
}

export default function StemCuttingSimulator() {
  const [crownType, setCrownType] = useState<'push' | 'screw'>('push');
  const [rawGapA, setRawGapA] = useState<number>(3.4);
  const [actualCut, setActualCut] = useState<number>(0);
  const [stemState, setStemState] = useState<StemState>({
    chamfered: false,
    loctited: false,
    testPos: 1,
  });

  // Functional allowance (Jeu d'armage / de sécurité)
  // Couronne poussée : 0.15 mm de sécurité pour ne pas que la couronne touche la carrure avant l'encliquetage Pos 1
  // Couronne vissée à ressort : 0.40 mm pour permettre la compression du ressort de débrayage au vissage
  const allowance = crownType === 'push' ? 0.15 : 0.4;
  const targetCut = Math.max(0, +(rawGapA - allowance).toFixed(2));

  const remainingGapPos1 = Math.max(0, rawGapA - actualCut);
  const posOffsetMm = stemState.testPos === 1 ? 0 : stemState.testPos === 2 ? 0.45 : 0.95;
  const visualGapMm = +(remainingGapPos1 + posOffsetMm).toFixed(2);

  // SVG dimensions & translations (1 mm = ~42 px)
  const pxShift = (3.4 - visualGapMm) * 42;
  const clampedShift = Math.min(165, Math.max(-45, pxShift));
  const newCrownX = 425 - clampedShift;
  const midX = (255 + newCrownX) / 2;

  // Evaluation of cut quality
  const diff = +(actualCut - targetCut).toFixed(2);
  const isRaw = actualCut === 0;
  const isPerfect = Math.abs(diff) <= 0.06;
  const isTooLong = diff < -0.06;
  const isTooShort = diff > 0.06;
  const finishOk = stemState.chamfered && stemState.loctited;

  const handleApplyOptimalCut = () => {
    setActualCut(targetCut);
    setStemState((prev) => ({
      ...prev,
      chamfered: true,
      loctited: true,
    }));
  };

  const handleReset = () => {
    setActualCut(0);
    setStemState({
      chamfered: false,
      loctited: false,
      testPos: 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Protocol Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                Geste d&apos;Établi n°1 — Calibre ETA 2824-2
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Filetage de Tige Ø 0.90 mm
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Coupe &amp; Mise à Longueur de la Tige de Remontoir
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              Écart mesuré A : <strong className="text-sky-600 dark:text-sky-400 font-bold">{rawGapA.toFixed(2)} mm</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-400 font-bold">
              Longueur à couper Lc : <strong>{targetCut.toFixed(2)} mm</strong>
            </span>
          </div>
        </div>

        {/* Sub-header instruction */}
        <p className="pt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Protocole officiel d&apos;atelier : mesure de la cote brute <strong className="text-slate-900 dark:text-white">A</strong> au pied à coulisse digital, coupe à la pince carbure, ébavurage &amp; <strong className="text-slate-900 dark:text-white">chanfreinage à 45° sur pierre d&apos;Arkansas</strong> pour ne pas refouler le taraudage, et sécurisation au <strong className="text-slate-900 dark:text-white">frein-filet Loctite 243</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Interactive CAD Cross-Section SVG */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-slate-300 dark:border-slate-800 pb-3">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              COUPE AXIALE : MOUVEMENT ETA 2824-2 ➔ CARRURE ➔ TUBE ➔ COURONNE
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                isRaw
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : isPerfect
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : isTooLong
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {isRaw
                ? 'Étape 1 : Tige Brute Non Coupée'
                : isPerfect
                ? finishOk
                  ? 'Coupe & Finition Parfaites (100%)'
                  : 'Longueur OK (Finitions à valider)'
                : isTooLong
                ? 'Tige Trop Longue (Dépassement)'
                : 'ERREUR FATALE : Tige Coupée Trop Courte !'}
            </span>
          </div>

          {/* Dynamic SVG Cross-Section */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 680 290"
              className="w-full h-auto min-w-[540px] select-none"
            >
              <defs>
                <linearGradient id="stemSteelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="50%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <linearGradient id="crownBrassGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>
              </defs>

              {/* 1. Movement Block (ETA 2824-2) */}
              <rect
                x="20"
                y="55"
                width="145"
                height="180"
                rx="6"
                fill="#161F30"
                stroke="#475569"
                strokeWidth="2"
              />
              <text
                x="92"
                y="82"
                textAnchor="middle"
                fill="#D4AF37"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fontWeight="bold"
              >
                CALIBRE 2824-2
              </text>
              <text
                x="92"
                y="98"
                textAnchor="middle"
                fill="#94A3B8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
              >
                Tirette &amp; Bascule
              </text>
              {/* Tirette stud */}
              <circle cx="135" cy="122" r="5" fill="#38BDF8" />
              <text
                x="95"
                y="125"
                textAnchor="middle"
                fill="#38BDF8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8"
              >
                Plot Tirette
              </text>

              {/* 2. Case Middle (Carrure Acier 316L) */}
              <path
                d="M 165 35 L 255 35 L 255 108 L 165 108 Z"
                fill="#1E293B"
                stroke="#64748B"
                strokeWidth="2"
              />
              <path
                d="M 165 182 L 255 182 L 255 255 L 165 255 Z"
                fill="#1E293B"
                stroke="#64748B"
                strokeWidth="2"
              />
              <text
                x="210"
                y="65"
                textAnchor="middle"
                fill="#CBD5E1"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fontWeight="bold"
              >
                CARRURE
              </text>
              <text
                x="210"
                y="80"
                textAnchor="middle"
                fill="#64748B"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8"
              >
                Acier 316L
              </text>

              {/* 3. Case Tube (Tube de Carrure Acier) */}
              <rect
                x="255"
                y="108"
                width="85"
                height="18"
                fill="#334155"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
              <rect
                x="255"
                y="164"
                width="85"
                height="18"
                fill="#334155"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
              {/* Tube O-ring Gasket */}
              <circle cx="318" cy="117" r="5" fill="#10B981" />
              <circle cx="318" cy="173" r="5" fill="#10B981" />
              <text
                x="295"
                y="98"
                textAnchor="middle"
                fill="#94A3B8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8.5"
              >
                TUBE DE BOÎTE
              </text>
              <text
                x="318"
                y="84"
                textAnchor="middle"
                fill="#10B981"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8"
              >
                Joint Tube
              </text>

              {/* 4. Winding Stem (Tige de Remontoir Ø 0.90 mm) */}
              <g>
                {/* Pilot & Square inside movement */}
                <rect x="65" y="136" width="100" height="18" fill="url(#stemSteelGrad)" />
                {/* Threaded shaft extending right */}
                <rect
                  x="165"
                  y="133"
                  width={Math.max(120, 290 - actualCut * 28)}
                  height="24"
                  fill="url(#stemSteelGrad)"
                  stroke="#1E293B"
                  strokeWidth="1"
                />
                {/* Thread serrations hint */}
                <path
                  d="M 260 133 L 450 133 M 260 157 L 450 157"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                {/* 45° Chamfer Tip */}
                {stemState.chamfered && (
                  <polygon
                    points="455,133 463,139 463,151 455,157"
                    fill="#38BDF8"
                  />
                )}
                {/* Loctite 243 Blue Drop */}
                {stemState.loctited && (
                  <circle
                    cx="435"
                    cy="145"
                    r="8"
                    fill="#38BDF8"
                    fillOpacity="0.75"
                  />
                )}
              </g>

              {/* 5. Crown Assembly */}
              <g
                transform={`translate(${-clampedShift}, 0)`}
                style={{ transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' }}
              >
                {/* Crown Body */}
                <rect
                  x="425"
                  y="78"
                  width="115"
                  height="134"
                  rx="12"
                  fill="url(#crownBrassGrad)"
                  fillOpacity="0.25"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                />
                {/* Internal threaded post */}
                <rect
                  x="370"
                  y="125"
                  width="95"
                  height="40"
                  rx="4"
                  fill="#1E293B"
                  stroke="#D4AF37"
                  strokeWidth="1.8"
                />
                {/* Crown flat gasket */}
                <rect x="416" y="96" width="10" height="26" rx="3" fill="#EF4444" />
                <rect x="416" y="168" width="10" height="26" rx="3" fill="#EF4444" />
                <text
                  x="485"
                  y="142"
                  textAnchor="middle"
                  fill="#FEF08A"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  COURONNE
                </text>
                <text
                  x="485"
                  y="157"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="8.5"
                >
                  Taraudage Ø 0.90
                </text>
              </g>

              {/* 6. Vernier Dimension A */}
              <g>
                <line
                  x1="255"
                  y1="28"
                  x2="255"
                  y2="75"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <line
                  x1={newCrownX}
                  y1="28"
                  x2={newCrownX}
                  y2="78"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <line
                  x1="255"
                  y1="42"
                  x2={newCrownX}
                  y2="42"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                <rect
                  x={midX - 45}
                  y="26"
                  width="90"
                  height="24"
                  rx="5"
                  fill="#0A0D12"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y="42"
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Jeu = {visualGapMm.toFixed(2)} mm
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Bench Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() =>
                setStemState((prev) => ({ ...prev, chamfered: !prev.chamfered }))
              }
              className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition ${
                stemState.chamfered
                  ? 'border-sky-400 bg-sky-500/20 text-sky-300 font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-sky-400" />
              <span>1. Chanfreiner 45°</span>
            </button>

            <button
              onClick={() =>
                setStemState((prev) => ({ ...prev, loctited: !prev.loctited }))
              }
              className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition ${
                stemState.loctited
                  ? 'border-sky-400 bg-sky-500/20 text-sky-300 font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>2. Frein-filet 243</span>
            </button>

            <button
              onClick={handleApplyOptimalCut}
              className="p-2.5 rounded-xl border border-amber-500/50 bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono text-amber-400 font-bold flex items-center justify-center gap-2 transition"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Coupe Idéale Auto</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-400 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nouvelle Tige Brute</span>
            </button>
          </div>
        </div>

        {/* Right (5 cols): Micrometric Sliders, Pos 1/2/3 Tester & Diagnostic Verdict */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 transition-colors">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Paramètres de Mesure &amp; de Coupe au 1/100e
              </span>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white mt-0.5">
                Calculateur de Coupe &amp; Simulateur de Pince
              </h3>
            </div>

            {/* Crown Type Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5 font-bold">
                Type de Couronne d&apos;Habillage :
              </label>
              <select
                value={crownType}
                onChange={(e) => setCrownType(e.target.value as 'push' | 'screw')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 cursor-pointer font-bold"
              >
                <option value="push">Couronne Poussée Standard (Jeu sécurité -0.15 mm)</option>
                <option value="screw">Couronne Vissée à Ressort Débrayable (Compression +0.40 mm)</option>
              </select>
            </div>

            {/* Slider 1: Raw Gap A */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-slate-300">
                  1. Écart mesuré A (Tige brute en Pos. 1) :
                </span>
                <strong className="text-sky-600 dark:text-sky-400 font-bold">
                  {rawGapA.toFixed(2)} mm
                </strong>
              </div>
              <input
                type="range"
                min="1.50"
                max="5.00"
                step="0.05"
                value={rawGapA}
                onChange={(e) => setRawGapA(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: Actual Cut Performed */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-amber-500/40 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-900 dark:text-white font-semibold">
                  2. Longueur coupée à la pince / cabron :
                </span>
                <strong className="text-amber-600 dark:text-amber-400 font-bold">
                  {actualCut.toFixed(2)} mm {actualCut === 0 ? '(Brute)' : ''}
                </strong>
              </div>
              <input
                type="range"
                min="0.00"
                max="5.00"
                step="0.05"
                value={actualCut}
                onChange={(e) => setActualCut(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>0 mm (Non coupée)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Cible idéale : {targetCut.toFixed(2)} mm
                </span>
                <span>5.00 mm (Trop courte !)</span>
              </div>
            </div>

            {/* Position Tester (Pos 1, Pos 2, Pos 3) */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
              <span className="block text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                3. Tester les Positions de la Couronne après coupe :
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {([1, 2, 3] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() =>
                      setStemState((prev) => ({ ...prev, testPos: pos }))
                    }
                    className={`py-2 px-2 rounded-lg font-bold transition ${
                      stemState.testPos === pos
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {pos === 1
                      ? 'Pos. 1 (Remont.)'
                      : pos === 2
                      ? 'Pos. 2 (Date)'
                      : 'Pos. 3 (Heure)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Diagnostic Card */}
            <div
              className={`p-4 rounded-xl border text-xs space-y-1.5 leading-relaxed ${
                isRaw
                  ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  : isPerfect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                  : isTooLong
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200'
              }`}
            >
              {isRaw ? (
                <>
                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                    1. Tige de remontoir brute en place
                  </div>
                  <p>
                    Pour un écart mesuré <strong className="font-mono">A = {rawGapA.toFixed(2)} mm</strong>, déplacez le curseur de coupe vers{' '}
                    <strong className="text-amber-600 dark:text-amber-400 font-mono">{targetCut.toFixed(2)} mm</strong>{' '}
                    ({crownType === 'push' ? 'A - 0.15 mm de sécurité' : 'A - 0.40 mm d’armage ressort'}).
                  </p>
                </>
              ) : isPerfect ? (
                <>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Longueur de Tige Parfaite ({actualCut.toFixed(2)} mm coupés) !</span>
                  </div>
                  <p>
                    En Position 1, il subsiste un jeu fonctionnel de <strong className="font-mono">{remainingGapPos1.toFixed(2)} mm</strong> : la couronne comprime parfaitement le joint de tube sans jamais buter contre l&apos;acier de la carrure.
                  </p>
                  <div className={`font-mono text-[11px] pt-1 font-bold ${finishOk ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-400'}`}>
                    {finishOk
                      ? '✓ Chanfrein 45° sur pierre d’Arkansas + Frein-filet Loctite 243 validés !'
                      : '⚠ N’oubliez pas d’activer « 1. Chanfreiner 45° » et « 2. Frein-filet 243 ».'}
                  </div>
                </>
              ) : isTooLong ? (
                <>
                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Tige Encore Trop Longue de {Math.abs(diff).toFixed(2)} mm</span>
                  </div>
                  <p>
                    Le tube reste exposé à la poussière, à l&apos;humidité et aux chocs. Retouchez prudemment l&apos;extrémité de la tige à la lime diamantée ou au cabron d&apos;émeri jusqu&apos;à <strong className="font-mono">{targetCut.toFixed(2)} mm</strong>.
                  </p>
                </>
              ) : (
                <>
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Tige Trop Courte de +{diff.toFixed(2)} mm (Irrécupérable) !</span>
                  </div>
                  <p>
                    La couronne bute contre la carrure avant que le pignon coulant ne puisse revenir en Position 1 : le calibre reste bloqué en correction de date ou en mise à l&apos;heure. Il faut remplacer la tige ou poser une rallonge de tige.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
