'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  RotateCcw,
  ShieldAlert,
  Compass,
  CheckCircle2,
  Sliders,
  Info,
} from 'lucide-react';

export default function ChronoKinematicsSimulator() {
  const [arch, setArch] = useState<'column' | 'cam'>('column');
  const [status, setStatus] = useState<'RESET' | 'RUNNING' | 'STOPPED'>('RESET');
  const [colAngle, setColAngle] = useState<number>(0);
  const [wheelAngle, setWheelAngle] = useState<number>(0);
  const [elapsedTenths, setElapsedTenths] = useState<number>(0);
  const [safetyAlert, setSafetyAlert] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pusher A: Start / Stop
  const handlePusherA = () => {
    setSafetyAlert(null);
    setColAngle((prev) => prev + 30);
    if (status === 'RESET' || status === 'STOPPED') {
      setStatus('RUNNING');
    } else {
      setStatus('STOPPED');
    }
  };

  // Pusher B: Reset
  const handlePusherB = () => {
    if (status === 'RUNNING') {
      setSafetyAlert(
        arch === 'column'
          ? "SÉCURITÉ ANTI-CASSE ACTIVÉE : Le bec du marteau bute contre le sommet d'une colonne de la roue à colonnes. Impossible de frapper le cœur tant que l'embrayage est en prise ! Pressez d'abord le Poussoir A (STOP)."
          : "SÉCURITÉ ANTI-CASSE 7750 ACTIVÉE : La came-navette verrouille mécaniquement le marteau du Poussoir B en position START. Pressez d'abord le Poussoir A (STOP) avant de remettre à zéro."
      );
      return;
    }
    setSafetyAlert(null);
    setStatus('RESET');
    setWheelAngle(0);
    setElapsedTenths(0);
  };

  // Continuous loop when RUNNING
  useEffect(() => {
    if (status === 'RUNNING') {
      timerRef.current = setInterval(() => {
        setElapsedTenths((prev) => prev + 1);
        setWheelAngle((prev) => (prev + 0.6) % 360);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const clutchAngle = status === 'RUNNING' ? 0 : 16;
  const brakeAngle = status === 'RUNNING' ? 18 : 0;
  const hammerY = status === 'RESET' ? 0 : -34;
  const shuttleRot = status === 'RUNNING' ? 18 : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Architecture Selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                Cinématique de Haute Précision
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Lemania 2310 vs ETA Valjoux 7750
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              {arch === 'column'
                ? 'Architecture Traditionnelle : Roue à Colonnes & Embrayage Horizontal'
                : 'Architecture Industrielle Robuste : Came-Navette & Pignon Oscillant (ETA 7750)'}
            </h2>
          </div>

          {/* Architecture Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setArch('column');
                setSafetyAlert(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                arch === 'column'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1. Roue à Colonnes
            </button>
            <button
              onClick={() => {
                setArch('cam');
                setSafetyAlert(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                arch === 'cam'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2. Came-Navette (7750)
            </button>
          </div>
        </div>

        {/* Live Pusher Controls & Timer Readout */}
        <div className="pt-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Pusher A */}
            <button
              onClick={handlePusherA}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition shadow flex items-center gap-2 ${
                status === 'RUNNING'
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {status === 'RUNNING' ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{status === 'RUNNING' ? 'Poussoir A (STOP)' : 'Poussoir A (START)'}</span>
            </button>

            {/* Pusher B */}
            <button
              onClick={handlePusherB}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold transition border border-slate-300 dark:border-slate-700 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
              <span>Poussoir B (RESET)</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                status === 'RUNNING'
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 animate-pulse'
                  : status === 'STOPPED'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500'
              }`}
            >
              ÉTAT : {status}
            </span>

            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Temps Chronométré</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {(elapsedTenths / 10).toFixed(1).padStart(4, '0')} s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Animated Vector CAD SVG */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-300 dark:border-slate-800">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              CINÉMATIQUE CAD DES LEVIERS, CAME &amp; CŒUR
            </span>
            <span className="text-[11px] text-slate-400">
              Angle Trotteuse : {wheelAngle.toFixed(0)}°
            </span>
          </div>

          <div className="w-full aspect-[640/400]">
            <svg viewBox="0 0 640 400" className="w-full h-full select-none">
              <defs>
                <radialGradient id="columnGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#854D0E" />
                </radialGradient>
              </defs>

              {/* Background Plate */}
              <rect x="20" y="20" width="600" height="360" rx="14" className="fill-white dark:fill-[#0B0F19] stroke-slate-300 dark:stroke-[#1E293B]" strokeWidth="2" />

              {/* 1. COMMAND SYSTEM (Top Center) */}
              {arch === 'column' ? (
                /* Column Wheel */
                <g transform="translate(320, 85)">
                  <circle cx="0" cy="0" r="42" className="fill-slate-100 dark:fill-[#1E293B] stroke-amber-500" strokeWidth="2.5" />
                  <g transform={`rotate(${colAngle})`} style={{ transition: 'transform 0.25s ease-out' }}>
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <rect
                        key={deg}
                        x="-7"
                        y="-38"
                        width="14"
                        height="20"
                        rx="3"
                        fill="url(#columnGrad)"
                        stroke="#FEF08A"
                        strokeWidth="1.2"
                        transform={`rotate(${deg})`}
                      />
                    ))}
                    <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#D4AF37" strokeWidth="2" />
                  </g>
                  <text x="0" y="58" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    ROUE À COLONNES
                  </text>
                </g>
              ) : (
                /* Shuttle Cam (7750) */
                <g transform="translate(320, 85)">
                  <g transform={`rotate(${shuttleRot})`} style={{ transition: 'transform 0.25s ease-out' }}>
                    <path
                      d="M -55 -15 L 55 -25 L 45 28 L -45 20 Z"
                      className="fill-slate-100 dark:fill-[#1E293B] stroke-sky-500"
                      strokeWidth="2.5"
                    />
                    <circle cx="0" cy="0" r="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                    <circle cx="-32" cy="0" r="4" fill="#38BDF8" />
                    <circle cx="32" cy="0" r="4" fill="#38BDF8" />
                  </g>
                  <text x="0" y="58" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="9" fontWeight="bold">
                    CAME-NAVETTE 7750
                  </text>
                </g>
              )}

              {/* 2. CONTINUOUS 4TH WHEEL (Driving Gear, Left) */}
              <g transform="translate(175, 210)">
                <circle cx="0" cy="0" r="46" className="fill-slate-100 dark:fill-[#1E293B] stroke-slate-400 dark:stroke-[#64748B]" strokeWidth="2" strokeDasharray="4 3" />
                <g transform={`rotate(${wheelAngle * 2})`}>
                  <line x1="-38" y1="0" x2="38" y2="0" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="0" y1="-38" x2="0" y2="38" stroke="#64748B" strokeWidth="1.5" />
                </g>
                <circle cx="0" cy="0" r="10" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
                <text x="0" y="62" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="8.5">
                  ROUE DE SECONDE (MOTEUR)
                </text>
              </g>

              {/* 3. CLUTCH LEVER (Embrayage horizontal ou pignon oscillant) */}
              <g
                transform={`rotate(${clutchAngle} 175 210)`}
                style={{ transition: 'transform 0.25s ease-out' }}
              >
                <path d="M 175 210 L 255 185" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                <circle cx="255" cy="185" r="24" className="fill-slate-100 dark:fill-[#1E293B] stroke-amber-500" strokeWidth="2" />
                <g transform={`rotate(${status === 'RUNNING' ? -wheelAngle * 2 : 0} 255 185)`}>
                  <circle cx="255" cy="185" r="5" fill="#D4AF37" />
                  <line x1="240" y1="185" x2="270" y2="185" stroke="#D4AF37" strokeWidth="1.5" />
                </g>
                <text x="255" y="154" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="8.5">
                  ROUE D&apos;EMBRAYAGE
                </text>
              </g>

              {/* 4. CHRONOGRAPH SECONDS WHEEL & HEART-PIECE (Center) */}
              <g transform="translate(320, 240)">
                <circle cx="0" cy="0" r="54" className="fill-slate-100 dark:fill-[#161F30] stroke-sky-500" strokeWidth="2.5" />
                <g transform={`rotate(${wheelAngle})`}>
                  {/* Heart piece for Reset */}
                  <path
                    d="M 0 -8 C 12 -22, 24 0, 0 22 C -24 0, -12 -22, 0 -8 Z"
                    fill="#F43F5E"
                    stroke="#FFE4E6"
                    strokeWidth="1.5"
                  />
                  {/* Central Chrono Hand */}
                  <line x1="0" y1="0" x2="0" y2="-48" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="8" fill="#38BDF8" />
                </g>
                <text x="0" y="72" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  ROUE CHRONO &amp; CŒUR
                </text>
              </g>

              {/* 5. BRAKE LEVER (Frein, Right) */}
              <g
                transform={`rotate(${brakeAngle} 455 275)`}
                style={{ transition: 'transform 0.25s ease-out' }}
              >
                <path d="M 455 275 L 374 250" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
                <rect x="368" y="244" width="8" height="12" rx="2" fill={status === 'STOPPED' ? '#F43F5E' : '#475569'} />
                <circle cx="455" cy="275" r="9" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
                <text x="455" y="300" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="8.5">
                  FREIN {status === 'STOPPED' ? '(SERRÉ)' : '(DÉGAGÉ)'}
                </text>
              </g>

              {/* 6. RESET HAMMER (Marteau frappant le cœur) */}
              <g
                transform={`translate(0, ${hammerY})`}
                style={{ transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <path
                  d="M 320 135 L 320 216 L 314 220 L 326 220 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                <circle cx="320" cy="135" r="7" fill="#F43F5E" />
                <text x="320" y="120" textAnchor="middle" fill="#F43F5E" fontFamily="monospace" fontSize="8.5" fontWeight="bold">
                  MARTEAU {status === 'RESET' ? '(SUR CŒUR)' : '(LEVÉ)'}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right (5 cols): Mechanical Analysis & Traps */}
        <div className="lg:col-span-5 space-y-4">
          {/* Safety Alert (if triggered) */}
          {safetyAlert && (
            <div className="bg-rose-500/15 border border-rose-500/50 rounded-2xl p-4 text-xs space-y-2 leading-relaxed">
              <div className="font-mono font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 uppercase">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Interdiction Cinématique d&apos;Atelier</span>
              </div>
              <p className="text-slate-800 dark:text-rose-100/90">{safetyAlert}</p>
            </div>
          )}

          {/* Technical Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Fonctionnement Mécanique en {status}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {arch === 'column' ? 'Roue à Colonnes' : 'Came 7750'}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white">
              {status === 'RUNNING'
                ? 'Phase START : Embrayage en Prise & Frein Dégagé'
                : status === 'STOPPED'
                ? 'Phase STOP : Embrayage Dégagé & Frein Serré'
                : 'Phase RESET : Marteau Abattu sur le Cœur de Remise à Zéro'}
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {arch === 'column' ? (
                <>
                  La <strong>roue à colonnes</strong> pivote d&apos;un cran à chaque impulsion du poussoir A.{' '}
                  {status === 'RUNNING'
                    ? 'Le bec de l’embrayage descend entre deux colonnes (prise de dents), tandis que le frein monte sur une colonne (roue libre).'
                    : status === 'STOPPED'
                    ? 'L’embrayage monte sur une colonne (débrayé) et le frein descend entre deux colonnes (bloque la trotteuse).'
                    : 'Le poussoir B fait chuter le marteau sur le cœur asymétrique, forçant la trotteuse à revenir à midi par pente raide.'}
                </>
              ) : (
                <>
                  Sur l&apos;ETA Valjoux 7750, la <strong>came-navette</strong> remplace la roue à colonnes.{' '}
                  {status === 'RUNNING'
                    ? 'La navette bascule, engageant le pignon oscillant à 1/3 de dent dans la roue centrale de chronographe.'
                    : status === 'STOPPED'
                    ? 'La navette déplace le pignon oscillant hors de prise et plaque la lame de frein contre le pourtour de la roue.'
                    : 'Le poussoir B déverrouille le marteau qui vient frapper les cœurs de seconde et de compteur de minutes simultanément.'}
                </>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-amber-100 leading-relaxed">
              <strong className="text-amber-700 dark:text-amber-400 block mb-0.5 font-mono">
                Règle d’Or de Réglage :
              </strong>
              L&apos;engrènement de la roue d&apos;embrayage (ou du pignon oscillant) ne doit jamais excéder{' '}
              <strong>1/3 de la hauteur de dent</strong>, sous peine d&apos;un blocage de la roue de seconde et d&apos;un saut de trotteuse au départ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
