'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  RotateCw,
  AlertTriangle,
  Compass,
  CheckCircle2,
  Info,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface PositionConfig {
  headline: string;
  stemOffset: number;
  leverRot: number;
  yokeRot: number;
  slidingX: number;
  stopSecRot: number;
  balanceStopped: boolean;
  mechanism: string;
  rotationEffect: string;
}

const KEYLESS_POSITIONS: Record<number, PositionConfig> = {
  1: {
    headline: 'POSITION 1 (0.0 mm) : REMONTAGE MANUEL DU BARILLET',
    stemOffset: 0,
    leverRot: 0,
    yokeRot: 0,
    slidingX: 375,
    stopSecRot: 0,
    balanceStopped: false,
    mechanism:
      "Le ressort de bascule pousse fermement la bascule vers l'extérieur : le pignon coulant est plaqué contre le pignon de remontoir grâce à sa denture Breguet en biseau.",
    rotationEffect:
      'En tournant la couronne dans le sens horaire (+), le pignon coulant entraîne le pignon de remontoir, la roue de couronne et le rochet de barillet. En sens inverse (-), les dents Breguet glissent en produisant le cliquetis caractéristique.',
  },
  2: {
    headline: 'POSITION 2 (+0.45 mm) : CORRECTION RAPIDE DU QUANTIÈME',
    stemOffset: 16,
    leverRot: -11,
    yokeRot: -8,
    slidingX: 350,
    stopSecRot: 0,
    balanceStopped: false,
    mechanism:
      "Le plot de la tirette fait pivoter la bascule au premier cran : le pignon coulant recule vers le centre et engrène avec le mobile correcteur de quantième.",
    rotationEffect:
      'Tourner la couronne fait sauter instantanément le disque des 31 jours sans arrêter la marche du balancier. Règle d’or d’atelier : strictement interdit entre 21h00 et 03h00 (Zone de risque mécanique).',
  },
  3: {
    headline: "POSITION 3 (+0.90 mm) : MISE À L'HEURE & STOP-SECONDE ACTIF",
    stemOffset: 32,
    leverRot: -22,
    yokeRot: -16,
    slidingX: 332,
    stopSecRot: -18,
    balanceStopped: true,
    mechanism:
      "La tirette bascule au second cran : le pignon coulant engrène à fond avec la minuterie et la chaussée. Simultanément, le talon de la tirette pousse le levier de stop-seconde qui vient freiner la serge du balancier.",
    rotationEffect:
      'Le balancier est immobilisé pour un réglage à la seconde près. Tourner la couronne entraîne la chaussée et la roue des heures pour positionner les aiguilles.',
  },
};

export default function KeylessSimulator() {
  const [crownPos, setCrownPos] = useState<1 | 2 | 3>(1);
  const [dateVal, setDateVal] = useState<number>(27);
  const [cannonAngle, setCannonAngle] = useState<number>(0);
  const [dateCorrAngle, setDateCorrAngle] = useState<number>(0);
  const [slidingPulse, setSlidingPulse] = useState<number>(0);

  const currentInfo = KEYLESS_POSITIONS[crownPos];

  const handleRotateCrown = (direction: 1 | -1) => {
    if (crownPos === 1) {
      setSlidingPulse(direction > 0 ? 3 : -3);
      setTimeout(() => setSlidingPulse(0), 160);
    } else if (crownPos === 2) {
      setDateCorrAngle((prev) => prev + direction * 45);
      if (direction > 0) {
        setDateVal((prev) => (prev % 31) + 1);
      } else {
        setDateVal((prev) => (prev === 1 ? 31 : prev - 1));
      }
    } else if (crownPos === 3) {
      setCannonAngle((prev) => prev + direction * 30);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Position Buttons */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                Calibre Référence ETA 2824-2
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Cinématique Micro-Mécanique
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Mécanisme de Remontoir, Tirette, Bascule &amp; Stop-Seconde
            </h2>
          </div>

          {/* 3 Positions Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            {[1, 2, 3].map((pos) => {
              const isActive = crownPos === pos;
              return (
                <button
                  key={pos}
                  onClick={() => setCrownPos(pos as 1 | 2 | 3)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Position {pos}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="pt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {currentInfo.headline}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Couronne :</span>
            <button
              onClick={() => handleRotateCrown(1)}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold transition inline-flex items-center gap-1"
              title="Tourner dans le sens horaire"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-500" />
              <span>Sens Horaire (+)</span>
            </button>
            <button
              onClick={() => handleRotateCrown(-1)}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold transition inline-flex items-center gap-1"
              title="Tourner dans le sens anti-horaire"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
              <span>Anti-Horaire (-)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Mechanism (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pb-2 mb-2 border-b border-slate-300 dark:border-slate-800">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              VUE TECHNIQUE CAD — CÔTÉ PONT DE TIGE &amp; TIRETTE
            </span>
            <span className="px-2.5 py-0.5 rounded bg-white text-slate-950 font-bold text-xs">
              DATE : {dateVal}
            </span>
          </div>

          <div className="w-full aspect-[620/480] relative">
            <svg
              viewBox="0 0 620 480"
              className="w-full h-full select-none"
            >
              {/* Background Movement Outline */}
              <circle
                cx="250"
                cy="250"
                r="215"
                className="fill-white dark:fill-[#0b0f19] stroke-slate-300 dark:stroke-[#334155]"
                strokeWidth="2"
              />
              <circle
                cx="250"
                cy="250"
                r="195"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="14"
                strokeOpacity="0.12"
              />
              <text
                x="250"
                y="52"
                textAnchor="middle"
                className="fill-slate-600 dark:fill-[#64748B]"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
              >
                DISQUE DE QUANTIÈME (31 JOURS)
              </text>

              {/* 1. BALANCE WHEEL (Left Side) */}
              <g transform="translate(110, 145)">
                <circle
                  cx="0"
                  cy="0"
                  r="44"
                  fill="none"
                  stroke={currentInfo.balanceStopped ? '#EF4444' : '#D4AF37'}
                  strokeWidth="4"
                  strokeDasharray={currentInfo.balanceStopped ? 'none' : '10 4'}
                  className={currentInfo.balanceStopped ? '' : 'animate-spin'}
                  style={{ animationDuration: '0.8s' }}
                />
                <circle cx="0" cy="0" r="8" fill="#E11D48" />
                <text
                  x="0"
                  y="-52"
                  textAnchor="middle"
                  fill={currentInfo.balanceStopped ? '#F87171' : '#D4AF37'}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {currentInfo.balanceStopped ? 'BALANCIER STOPPÉ' : 'BALANCIER 4 Hz'}
                </text>
              </g>

              {/* Stop-Second Lever */}
              <g
                transform={`translate(175, 145) rotate(${currentInfo.stopSecRot})`}
                style={{ transition: 'transform 0.3s ease-out' }}
              >
                <path
                  d="M 110 35 L 0 0 L -15 -8"
                  fill="none"
                  stroke={currentInfo.balanceStopped ? '#EF4444' : '#F43F5E'}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <rect
                  x="-24"
                  y="-14"
                  width="12"
                  height="10"
                  rx="2"
                  fill={currentInfo.balanceStopped ? '#EF4444' : '#F43F5E'}
                />
                <text
                  x="55"
                  y="12"
                  fill="#FB7185"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                >
                  STOP-SECONDE
                </text>
              </g>

              {/* 2. CENTER CANNON PINION & MINUTE WHEEL */}
              <g
                transform={`translate(250, 250) rotate(${cannonAngle})`}
                style={{ transition: 'transform 0.2s ease-out' }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="32"
                  fill="#1E293B"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                {/* Hands indicator */}
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-28"
                  stroke="#D4AF37"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="22"
                  y2="0"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="8" fill="#D4AF37" />
              </g>
              <text
                x="250"
                y="298"
                textAnchor="middle"
                fill="#94A3B8"
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
              >
                CHAUSSÉE (HEURE / MIN)
              </text>

              {/* Intermediate Setting Wheels */}
              <g transform="translate(312, 275)">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="#1E293B"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <circle cx="0" cy="0" r="6" fill="#38BDF8" />
              </g>

              {/* Quick Date Corrector Wheel */}
              <g
                transform={`translate(310, 195) rotate(${dateCorrAngle})`}
                style={{ transition: 'transform 0.25s ease-out' }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  fill="#1E293B"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <circle cx="0" cy="0" r="6" fill="#10B981" />
                <text
                  x="-45"
                  y="-26"
                  fill="#10B981"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                >
                  CORRECTEUR DATE
                </text>
              </g>

              {/* 3. WINDING PINION (Fixed axially at X=415, Y=215) */}
              <g transform="translate(415, 215)">
                <rect
                  x="-12"
                  y="0"
                  width="24"
                  height="50"
                  rx="3"
                  fill="#475569"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                {/* Breguet ratchet teeth */}
                <path
                  d="M -12 5 L -18 12 L -12 18 L -18 25 L -12 32 L -18 39 L -12 45"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="-8"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                >
                  PIGNON REM.
                </text>
              </g>

              {/* 4. SLIDING PINION (Pignon Coulant - Moves along stem) */}
              <g
                transform={`translate(${currentInfo.slidingX + slidingPulse}, 215)`}
                style={{ transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <rect
                  x="-15"
                  y="0"
                  width="30"
                  height="50"
                  rx="4"
                  fill="#1E293B"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                />
                {/* Central groove for Yoke beak */}
                <rect
                  x="-5"
                  y="-3"
                  width="10"
                  height="56"
                  rx="2"
                  fill="#0B0E14"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                />
                <text
                  x="0"
                  y="66"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  PIGNON COULANT
                </text>
              </g>

              {/* 5. YOKE & YOKE SPRING */}
              <g
                transform={`translate(385, 345) rotate(${currentInfo.yokeRot})`}
                style={{ transition: 'transform 0.3s ease-out' }}
              >
                <path
                  d="M 0 0 L -10 -85"
                  stroke="#38BDF8"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#1E293B"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
                <circle cx="-10" cy="-85" r="6" fill="#38BDF8" />
                <text
                  x="-35"
                  y="22"
                  fill="#38BDF8"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  BASCULE
                </text>
              </g>
              {/* Yoke Spring */}
              <path
                d="M 285 385 C 335 415, 385 395, 385 345"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text
                x="320"
                y="420"
                textAnchor="middle"
                fill="#F59E0B"
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
              >
                RESSORT DE BASCULE
              </text>

              {/* 6. WINDING STEM & CROWN (Translates when pulled) */}
              <g
                transform={`translate(${currentInfo.stemOffset}, 0)`}
                style={{ transition: 'transform 0.3s ease-out' }}
              >
                {/* Stem Square & Pilot */}
                <rect
                  x="330"
                  y="232"
                  width="175"
                  height="16"
                  rx="2"
                  fill="#94A3B8"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                />
                {/* Stem Groove */}
                <rect
                  x="448"
                  y="229"
                  width="10"
                  height="22"
                  rx="2"
                  fill="#0B0E14"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                {/* Exterior Crown */}
                <rect
                  x="505"
                  y="200"
                  width="46"
                  height="80"
                  rx="8"
                  fill="#D4AF37"
                  stroke="#FEF08A"
                  strokeWidth="2"
                />
                <text
                  x="528"
                  y="244"
                  textAnchor="middle"
                  fill="#0B0E14"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fontWeight="bold"
                >
                  POS.{crownPos}
                </text>
              </g>

              {/* 7. SETTING LEVER (Tirette) */}
              <g
                transform={`translate(453, 175) rotate(${currentInfo.leverRot})`}
                style={{ transition: 'transform 0.3s ease-out' }}
              >
                <path
                  d="M 0 0 L 0 58 L -42 95"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Setting lever screw */}
                <circle
                  cx="0"
                  cy="0"
                  r="11"
                  fill="#334155"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                />
                <line
                  x1="-6"
                  y1="0"
                  x2="6"
                  y2="0"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="-16"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  VIS DE TIRETTE
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Technical Explanations & Workshop Traps (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Detail Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-xs font-bold">
                POSITION {crownPos} / 3
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  currentInfo.balanceStopped ? 'text-rose-500' : 'text-emerald-500'
                }`}
              >
                {currentInfo.balanceStopped
                  ? 'BALANCIER BLOQUÉ (STOP-SECONDE)'
                  : "BALANCIER LIBRE (28'800 A/h)"}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
              {currentInfo.headline}
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>Chaîne Cinématique Active :</span>
              </div>
              {currentInfo.mechanism}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-amber-100 leading-relaxed">
              <strong className="text-amber-600 dark:text-amber-400 block mb-0.5 flex items-center gap-1.5 font-mono">
                <RotateCw className="w-3.5 h-3.5" />
                Action de rotation de la couronne :
              </strong>
              {currentInfo.rotationEffect}
            </div>
          </div>

          {/* Workshop Warnings */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 space-y-2.5 text-xs">
            <div className="font-mono uppercase text-rose-700 dark:text-rose-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Règles Impératives d&apos;Établi (ETA 2824-2)</span>
            </div>
            <div className="text-slate-700 dark:text-rose-100/90 leading-relaxed space-y-2">
              <p>
                <strong>1. Dévissage contrôlé de la vis de tirette :</strong> Pour extraire la tige sur un ETA 2824-2, toujours placer impérativement la tige en <strong>Position 3 (Mise à l&apos;heure)</strong> et desserrer modérément (1 tour à 1.5 tour maximum). En dévissant excessivement, la tirette échappe de la gorge de tige et de la bascule, obligeant à déshabiller aiguilles et cadran !
              </p>
              <p>
                <strong>2. Zone d&apos;interdiction mécanique (21h00 — 03h00) :</strong> Ne jamais actionner le correcteur rapide en Position 2 lorsque le doigt entraîneur de quantième commence sa prise dans la denture du disque de date (risque de cisaillement ou de blocage du sautoir).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
