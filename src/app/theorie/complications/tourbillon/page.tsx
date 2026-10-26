'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  Sparkles,
  Compass,
  Activity,
  ShieldCheck,
  Sliders
} from 'lucide-react';

export default function TourbillonPage() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 0.5) % 60);
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const cageAngle = seconds * 6;
  const rad = (cageAngle * Math.PI) / 180;
  const instantaneousRate = +(8.0 * Math.cos(rad)).toFixed(1);
  const escapeWheelSelfRotation = cageAngle * 8;

  const getPositionLabel = (angle: number) => {
    if (angle < 45 || angle >= 315) return 'Position Verticale 6H (Couronne en bas)';
    if (angle >= 45 && angle < 135) return 'Position Verticale 9H (Couronne à gauche)';
    if (angle >= 135 && angle < 225) return 'Position Verticale 12H (Couronne en haut)';
    return 'Position Verticale 3H (Couronne à droite)';
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie/complications"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux Complications Horlogères</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Brevet du 7 Messidor An IX (26 Juin 1801) • Abraham-Louis Breguet</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Le Tourbillon <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Compensation Gravitationnelle Breguet
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Inventé par Abraham-Louis Breguet en 1795 et breveté en 1801, le tourbillon enferme l’organe régulateur (balancier-spiral) et l’échappement (ancre et roue d’échappement) dans une cage mobile effectuant une révolution complète par minute afin d’annuler par moyennage sur 360° les écarts de marche dus à la gravité terrestre.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <StatCard number="1801" label="Brevet Breguet (Paris)" />
              <StatCard number="60 s" label="1 Révolution / 360°" />
              <StatCard number="0.28 g" label="Masse Cage Titane" />
              <StatCard number="0.0 s/j" label="Écart Vertical Moyen" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Simulateur Cinématique Épicycloïdal • Norme ISO 3159</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Cage Tournante 1 Minute &amp; Moyennage Gravitationnel sur 360°
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Observez comment le pignon d’échappement satellite (Code 705) roule sur la roue de seconde fixe (Code 227) pendant que la cage brasse le balourd du spiral à travers les 4 positions verticales (6H, 9H, 12H, 3H).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Rotation' : 'Animer (60s)'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setSeconds(0);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>0° (6H)</span>
              </button>

              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  loupe10x
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>CAGE DE TOURBILLON (θ = {cageAngle.toFixed(0)}°)</span>
                <span className="text-sky-400">GRAVITÉ TERRESTRE g ↓ (9.81 m/s²)</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#060a12]">
                <svg
                  viewBox="0 0 420 400"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.55)' : 'scale(1)',
                    transformOrigin: '210px 200px'
                  }}
                >
                  <defs>
                    <radialGradient id="cageGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#060a12" stopOpacity="1" />
                    </radialGradient>
                  </defs>

                  <circle cx="210" cy="200" r="175" fill="url(#cageGlow)" stroke="#1e293b" strokeWidth="1.5" />

                  <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.75">
                    <line x1="382" y1="55" x2="382" y2="125" />
                    <polygon points="382,132 377,120 387,120" fill="#38bdf8" />
                    <text x="382" y="45" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" stroke="none">
                      VEC. g
                    </text>
                  </g>

                  <text x="210" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    12H (θ = 180° • -8.0 s/j)
                  </text>
                  <text x="210" y="390" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    6H (θ = 0° • +8.0 s/j)
                  </text>
                  <text x="22" y="204" textAnchor="start" fill="#64748b" fontSize="10" fontFamily="monospace">
                    9H
                  </text>
                  <text x="398" y="204" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
                    3H
                  </text>

                  <circle
                    cx="210"
                    cy="200"
                    r="112"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="6"
                    strokeDasharray="5 4"
                    opacity="0.75"
                  />
                  <circle cx="210" cy="200" r="106" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
                  <text x="210" y="78" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                    Roue de Seconde Fixe (Code 227)
                  </text>

                  <g transform={`translate(210, 200) rotate(${cageAngle})`}>
                    <circle cx="0" cy="0" r="138" fill="none" stroke="#94a3b8" strokeWidth="5" />
                    <path d="M -138 0 L -42 0 M 42 0 L 138 0" stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" />
                    <path d="M 0 -138 L 0 -55 M 0 55 L 0 138" stroke="#64748b" strokeWidth="4" />

                    <circle cx="-138" cy="0" r="5" fill="#38bdf8" />
                    <circle cx="138" cy="0" r="5" fill="#f59e0b" />

                    <g transform="translate(0, -88)">
                      <g transform={`rotate(${escapeWheelSelfRotation})`}>
                        <circle cx="0" cy="0" r="24" fill="#ef4444" fillOpacity="0.18" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="-22" y1="0" x2="22" y2="0" stroke="#f87171" strokeWidth="1.5" />
                        <line x1="0" y1="-22" x2="0" y2="22" stroke="#f87171" strokeWidth="1.5" />
                      </g>
                      <circle cx="0" cy="0" r="9" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="3" fill="#be123c" />
                    </g>

                    <path
                      d="M -22 -48 L 0 -64 L 22 -48 L 0 -18 Z"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2.5"
                    />
                    <circle cx="0" cy="-42" r="3.5" fill="#e879f9" />

                    <circle
                      cx="0"
                      cy="0"
                      r="76"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="5"
                    />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                      <line
                        key={a}
                        x1={74 * Math.cos((a * Math.PI) / 180)}
                        y1={74 * Math.sin((a * Math.PI) / 180)}
                        x2={83 * Math.cos((a * Math.PI) / 180)}
                        y2={83 * Math.sin((a * Math.PI) / 180)}
                        stroke="#fde047"
                        strokeWidth="3.5"
                      />
                    ))}

                    <path
                      d="M 0 0 C 12 -8, 18 10, 4 18 C -15 24, -26 -6, -8 -24 C 16 -36, 38 4, 18 32 C -12 46, -44 10, -28 -32"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />

                    <circle cx="0" cy="36" r="7" fill="#f43f5e" stroke="#fecdd3" strokeWidth="1.5" />
                    <text x="0" y="54" textAnchor="middle" fill="#fb7185" fontSize="8" fontWeight="bold">
                      Balourd Spiral
                    </text>
                  </g>

                  <rect x="28" y="191" width="364" height="18" rx="6" fill="#cbd5e1" fillOpacity="0.22" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="210" cy="200" r="14" fill="#be123c" stroke="#fda4af" strokeWidth="2" />
                  <circle cx="210" cy="200" r="6" fill="#fbbf24" />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>INTÉGRATION CHRONOMÉTRIQUE SUR 60 SECONDES</span>
                  <span className="text-emerald-400 font-bold">MOYENNE = 0.0 s/j</span>
                </div>

                <svg viewBox="0 0 460 175" className="w-full h-auto">
                  <line x1="40" y1="88" x2="435" y2="88" stroke="#334155" strokeWidth="1.5" />
                  <line x1="40" y1="32" x2="435" y2="32" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="5 4" />
                  <text x="432" y="26" textAnchor="end" fill="#fb7185" fontSize="9" fontFamily="monospace">
                    Sans Tourbillon (Fixe 6H : +8.0 s/j)
                  </text>

                  <text x="34" y="35" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">+8s</text>
                  <text x="34" y="91" textAnchor="end" fill="#10b981" fontSize="9" fontFamily="monospace">0s</text>
                  <text x="34" y="147" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">-8s</text>

                  <path
                    d="M 40 32 C 105 32, 170 144, 237 144 C 304 144, 370 32, 435 32"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />

                  {(() => {
                    const cx = 40 + (seconds / 60) * 395;
                    const cy = 88 - (instantaneousRate / 8) * 56;
                    return (
                      <g>
                        <line x1={cx} y1="20" x2={cx} y2="155" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={cx} cy={cy} r="6" fill="#38bdf8" stroke="#f8fafc" strokeWidth="2" />
                      </g>
                    );
                  })()}

                  <text x="40" y="168" fill="#64748b" fontSize="9" fontFamily="monospace">0s (6H)</text>
                  <text x="138" y="168" fill="#64748b" fontSize="9" fontFamily="monospace">15s (9H)</text>
                  <text x="230" y="168" fill="#64748b" fontSize="9" fontFamily="monospace">30s (12H)</text>
                  <text x="330" y="168" fill="#64748b" fontSize="9" fontFamily="monospace">45s (3H)</text>
                  <text x="410" y="168" fill="#64748b" fontSize="9" fontFamily="monospace">60s</text>
                </svg>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" />
                    Angle / Temps de Révolution de la Cage :
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">
                    t = {seconds.toFixed(0)} s ({cageAngle.toFixed(0)}°)
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={seconds}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setSeconds(Number(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    { s: 0, label: '0s • 6H (+8s)' },
                    { s: 15, label: '15s • 9H (0s)' },
                    { s: 30, label: '30s • 12H (-8s)' },
                    { s: 45, label: '45s • 3H (0s)' }
                  ].map((preset) => (
                    <button
                      key={preset.s}
                      onClick={() => {
                        setIsPlaying(false);
                        setSeconds(preset.s);
                      }}
                      className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">ORIENTATION CAGE</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{getPositionLabel(cageAngle)}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">MARCHE INSTANTANÉE</div>
                  <div className={`font-mono font-bold mt-0.5 ${instantaneousRate >= 0 ? 'text-amber-500' : 'text-sky-400'}`}>
                    {instantaneousRate > 0 ? `+${instantaneousRate}` : instantaneousRate} s/j
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">INTÉGRALE SUR 60 S</div>
                  <div className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    0.0 s/j (Compensé)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4 shadow-lg">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Principe Cinématique Épicycloïdal
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dans un mouvement classique, la roue de moyenne entraîne la roue de seconde, qui entraîne le pignon d’échappement sur des axes fixes. Dans un <strong>tourbillon Breguet</strong>, la roue de seconde (Code 227) est <strong>vissée fixe sur la platine</strong>.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              La roue de moyenne entraîne directement la <strong>cage mobile</strong> à raison de 1 tour par minute. En tournant, la cage oblige le pignon d’échappement satellite (Code 705) à rouler sur la denture de la roue fixe, déclenchant les impulsions de l’ancre suisse et du balancier-spiral logés au cœur de la cage.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4 shadow-lg">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Nomenclature des Organes de la Cage
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span><strong>Cage supérieure et inférieure (0.28 g)</strong> : Usinée en acier poli miroir ou en titane Grade 5, elle supporte le balancier et l’échappement.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span><strong>Roue de seconde fixe (Code 227)</strong> : Solidaire de la platine, elle sert de chemin de roulement planétaire au pignon d’échappement.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span><strong>Balancier à vis &amp; Spiral Breguet (Code 721)</strong> : Coaxial à la cage, muni d’une courbe terminale Phillips pour le développement concentrique.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span><strong>Pont de tourbillon bercé</strong> : Berceau supérieur anglé main à la cheville de gentiane, portant le chaton antichoc supérieur.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Architectures &amp; Variantes de Haute Horlogerie
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <VariantCard
              title="Tourbillon Volant (1920)"
              icon="🪶"
              description="Inventé par Alfred Helwig à Glashütte : le pont supérieur est supprimé et la cage est maintenue uniquement en porte-à-faux par son pivot inférieur sur roulement céramique."
            />
            <VariantCard
              title="Tourbillon Multi-Axes / Incliné"
              icon="♊"
              description="Cages concentriques inclinées à 30° ou 90° (ex: Greubel Forsey) pour compenser la gravité dans les trois dimensions spatiales d’une montre-bracelet portée au poignet."
            />
            <VariantCard
              title="Carrousel (Bonniksen 1892)"
              icon="🎠"
              description="Contrairement au tourbillon Breguet, la roue de seconde n’est pas fixe : la plateforme et le pignon d’échappement sont entraînés par deux trains d’engrenages différentiels."
            />
          </div>
        </section>

        <section className="bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4 shadow-lg">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Abraham-Louis Breguet (1747–1823) &amp; la Réalité Chronométrique
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Né à Neuchâtel en 1747, Abraham-Louis Breguet observe que les montres de poche restent immobilisées verticalement dans le gousset du veston toute la journée : le centre de gravité du spiral se déplace sous son propre poids et crée un écart de marche constant entre la position 6H et la position 12H.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            À l’établi, le montage d’une cage de tourbillon exige une maîtrise absolue de l’inertie : à chaque impulsion (21 600 A/h ou 28 800 A/h), la roue de moyenne doit relancer non seulement le rouage, mais aussi la masse entière de la cage. L’équilibrage statique de la cage sur les couteaux d’agate et la lubrification micrométrique des palettes à la <strong>Moebius 9415</strong> sont décisifs pour maintenir une amplitude supérieure à 270°.
          </p>
        </section>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/30 text-center space-y-4 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Explorez les Autres Grandes Complications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Découvrez la mémoire mécanique de la came de 48 mois du Quantième Perpétuel et l’embrayage de Chronographe.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/theorie/complications/quantieme"
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
            >
              Came de 48 Mois (Quantième)
            </Link>
            <Link
              href="/theorie/complications"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 hover:border-amber-500 transition-all"
            >
              Retour aux Complications
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-600 dark:text-amber-400 mb-0.5">
        {number}
      </div>
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  );
}

function VariantCard({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-2 shadow-md">
      <span className="text-3xl block">{icon}</span>
      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}
