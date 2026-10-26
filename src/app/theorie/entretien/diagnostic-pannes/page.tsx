'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ZoomIn,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Ban,
  Wrench,
  Activity,
  Magnet,
  Calendar,
  Compass,
  Gauge,
} from 'lucide-react';

type DefectMode = 'pivot' | 'goupilles' | 'magnetisme' | 'quantieme';
type SeverityLevel = 'healthy' | 'moderate' | 'critical';

export default function DiagnosticPannesPage() {
  const [mode, setMode] = useState<DefectMode>('pivot');
  const [severity, setSeverity] = useState<number>(20);
  const [loupe, setLoupe] = useState<boolean>(false);

  const level: SeverityLevel =
    severity < 35 ? 'healthy' : severity <= 70 ? 'moderate' : 'critical';

  const applyPreset = (preset: SeverityLevel) => {
    if (preset === 'healthy') setSeverity(18);
    if (preset === 'moderate') setSeverity(55);
    if (preset === 'critical') setSeverity(88);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER (Typographie éditoriale alignée sur /theorie) --- */}
      <section className="relative pt-10 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie/entretien"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à Entretien &amp; Maintenance</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Inspection Microscopique 40x &amp; Vibrographe Witschi</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Diagnostic de Pannes &amp; <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                  Usures sous Binoculaire
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                À l’établi, chaque anomalie de marche observée au chronocomparateur Witschi correspond à une déformation géométrique précise : pivot de balancier aplati en « champignon », jeu excessif aux goupilles de raquette, spires aimantées ou dent de quantième forcée.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 max-w-xs font-medium">
              <strong>Méthode d’Horloger :</strong> Toujours croiser la trace acoustique du Witschi (CH vs 6H) avec l’examen optique sous binoculaire 40x avant de démonter.
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* =====================================================================
            COMPARATEUR VISUEL SVG DES 4 DÉFAUTS CRITIQUES SOUS BINOCULAIRE
           ===================================================================== */}
        <section className="rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                <Sliders className="w-4 h-4" /> Banc d’Inspection Optique &amp; Acoustique · Loupe 10x / 40x
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Comparateur Visuel SVG des Défauts &amp; Usures d’Atelier
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Choisissez l’un des <strong>4 organes critiques</strong> et déplacez le curseur d’usure/défaut pour comparer la pièce saine, son usure mécanique et sa signature immédiate au vibrographe.
              </p>
            </div>

            <button
              onClick={() => setLoupe(!loupe)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                loupe
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-amber-500'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
              {loupe ? 'Loupe 10x Active' : 'Activer Loupe 10x'}
            </button>
          </div>

          {/* Sélecteur des 4 modes d'inspection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'pivot',
                code: 'Code 721',
                title: '1. Pivot de Balancier (Ø 0.08 mm)',
                sub: 'Poli miroir vs Strié vs Champignon',
              },
              {
                id: 'goupilles',
                code: 'Code 125 / 721',
                title: '2. Goupilles de Raquette & Spiral',
                sub: 'Jeu nominal vs Bridé vs Trop ouvert',
              },
              {
                id: 'magnetisme',
                code: 'NIHS 90-10',
                title: '3. Magnétisme du Spiral',
                sub: 'Spires concentriques vs Spires collées',
              },
              {
                id: 'quantieme',
                code: 'Code 2556',
                title: '4. Quantième (Zone 21h–03h)',
                sub: 'Saut normal vs Dent forcée en T2',
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id as DefectMode)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  mode === tab.id
                    ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/25 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#141a2b] border-slate-200 dark:border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                  {tab.code}
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  {tab.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {tab.sub}
                </div>
              </button>
            ))}
          </div>

          {/* Curseur de gravité + 3 boutons d'état */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-[#141a2b] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-6 flex flex-wrap gap-2.5">
              <button
                onClick={() => applyPreset('healthy')}
                className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all ${
                  level === 'healthy'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400">État 01 · Sain</div>
                <div className="text-xs font-extrabold mt-0.5">Géométrie Nominale</div>
              </button>

              <button
                onClick={() => applyPreset('moderate')}
                className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all ${
                  level === 'moderate'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">État 02 · Usure</div>
                <div className="text-xs font-extrabold mt-0.5">Défaut Modéré</div>
              </button>

              <button
                onClick={() => applyPreset('critical')}
                className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all ${
                  level === 'critical'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-2 ring-rose-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-rose-600 dark:text-rose-400">État 03 · Critique</div>
                <div className="text-xs font-extrabold mt-0.5">Panne Franche</div>
              </button>
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-400">
                  Degré d’Usure / Déformation Mécanique :
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-black ${
                    level === 'healthy'
                      ? 'bg-emerald-500 text-slate-950'
                      : level === 'moderate'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {severity} % {level === 'healthy' ? '✓ CONFORME' : level === 'moderate' ? '⚠ DÉRIVE' : '✗ RUPTURE / ARRÊT'}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={98}
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0 % (Pièce neuve / réglée)</span>
                <span className="text-amber-500 font-bold">50 % (Usure de service 5–7 ans)</span>
                <span>95 % (Choc / Rupture)</span>
              </div>
            </div>
          </div>

          {/* Double Vue SVG : Inspection Optique 40x + Signature Witschi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 rounded-2xl bg-[#070B14] border border-slate-800 p-4 overflow-hidden">
              <svg
                viewBox={loupe ? '55 35 620 230' : '0 0 740 310'}
                className="w-full h-auto transition-all duration-500"
              >
                <defs>
                  <pattern id="gridDiag" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="740" height="310" fill="url(#gridDiag)" />

                {/* ================= MODE 1 : PIVOT DE BALANCIER ================= */}
                {mode === 'pivot' && (
                  <g>
                    <g transform="translate(210, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        1. PROFIL DU PIVOT DE BALANCIER (Ø 0.08 mm)
                      </text>

                      {/* Pierre contre-pivot en haut */}
                      <rect x="-85" y="-85" width="170" height="24" rx="4" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />

                      {/* Corps de l'axe et portée conique */}
                      {level === 'healthy' && (
                        <path
                          d="M -45 110 L -45 45 Q -45 5, -16 -5 L -16 -52 C -8 -60, 8 -60, 16 -52 L 16 -5 Q 45 5, 45 45 L 45 110 Z"
                          fill="#cbd5e1"
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                      )}

                      {level === 'moderate' && (
                        <g>
                          <path
                            d="M -45 110 L -45 45 Q -45 5, -16 -5 L -12 -25 L -16 -52 C -8 -58, 8 -58, 16 -52 L 12 -25 L 16 -5 Q 45 5, 45 45 L 45 110 Z"
                            fill="#cbd5e1"
                            stroke="#f59e0b"
                            strokeWidth="2.5"
                          />
                          {/* Sillon d'usure et oxyde rouge */}
                          <rect x="-15" y="-32" width="30" height="10" rx="2" fill="#b45309" />
                          <text x="0" y="-96" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                            ⚠ SILLON D’USURE PAR HUILE SÉCHÉE (ROULAGE JACOT REQUIS)
                          </text>
                        </g>
                      )}

                      {level === 'critical' && (
                        <g>
                          <path
                            d="M -45 110 L -45 45 Q -45 5, -16 -5 L -16 -46 L -28 -58 L 28 -58 L 16 -46 L 16 -5 Q 45 5, 45 45 L 45 110 Z"
                            fill="#cbd5e1"
                            stroke="#f43f5e"
                            strokeWidth="2.5"
                          />
                          <text x="0" y="-96" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold" fontFamily="monospace">
                            ✗ BOUT REFOULÉ EN « CHAMPIGNON » APRÈS CHOC AXIAL !
                          </text>
                        </g>
                      )}
                    </g>

                    {/* Droite : Impact sur l'amplitude CH vs 6H au Witschi */}
                    <g transform="translate(545, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        2. SIGNATURE AU VIBROGRAPHE (CH vs 6H)
                      </text>
                      <rect x="-125" y="-95" width="250" height="190" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                      {/* Trace CH (à plat) */}
                      <line x1="-100" y1="-45" x2="100" y2="-45" stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" />
                      <text x="0" y="-58" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">
                        Position CH (Plat) : {300 - Math.round(severity * 0.35)}°
                      </text>

                      {/* Trace 6H (verticale) */}
                      <line
                        x1="-100"
                        y1="35"
                        x2="100"
                        y2={level === 'critical' ? '-10' : level === 'moderate' ? '18' : '35'}
                        stroke={level === 'critical' ? '#f43f5e' : level === 'moderate' ? '#f59e0b' : '#10b981'}
                        strokeWidth="3"
                        strokeDasharray={level === 'critical' ? '2 6' : '6 3'}
                      />
                      <text x="0" y="62" textAnchor="middle" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        Position 6H (Verticale) : {275 - Math.round(severity * 1.15)}°
                      </text>
                    </g>
                  </g>
                )}

                {/* ================= MODE 2 : GOUPILLES DE RAQUETTE & SPIRAL ================= */}
                {mode === 'goupilles' && (
                  <g>
                    <g transform="translate(210, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        1. JEU DU SPIRAL ENTRE GOUPILLES (CODE 125)
                      </text>

                      {/* Lame du spiral Nivarox au centre */}
                      <rect x="-7" y="-85" width="14" height="170" rx="3" fill="#38bdf8" />

                      {/* Goupille gauche et droite dont l'écartement dépend de severity */}
                      {(() => {
                        const gap = level === 'healthy' ? 20 : level === 'moderate' ? 8 : 54;
                        return (
                          <>
                            <circle
                              cx={-gap}
                              cy="0"
                              r="14"
                              fill="#fbbf24"
                              stroke="#f59e0b"
                              strokeWidth="2"
                            />
                            <circle
                              cx={gap}
                              cy="0"
                              r="14"
                              fill="#fbbf24"
                              stroke="#f59e0b"
                              strokeWidth="2"
                            />
                          </>
                        );
                      })()}

                      <text x="0" y="112" textAnchor="middle" fill="#fef08a" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        {level === 'healthy'
                          ? '✓ Jeu nominal : respiration symétrique de la spire'
                          : level === 'moderate'
                          ? '⚠ Goupilles trop serrées : spiral bridé au repos'
                          : '✗ Goupilles trop écartées : retard massif à 24h'}
                      </text>
                    </g>

                    <g transform="translate(545, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        2. COURBE D’ISOCHRONISME (300° → 190°)
                      </text>
                      <rect x="-125" y="-95" width="250" height="190" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <line x1="-100" y1="0" x2="100" y2="0" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                      <path
                        d={
                          level === 'healthy'
                            ? 'M -95 -5 Q 0 -8, 95 2'
                            : level === 'moderate'
                            ? 'M -95 5 Q 0 -25, 95 -55'
                            : 'M -95 -10 Q 0 25, 95 72'
                        }
                        fill="none"
                        stroke={level === 'healthy' ? '#10b981' : level === 'moderate' ? '#f59e0b' : '#f43f5e'}
                        strokeWidth="3.5"
                      />
                      <text x="0" y="82" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                        Gauche : 300° (0h) → Droite : 190° (24h)
                      </text>
                    </g>
                  </g>
                )}

                {/* ================= MODE 3 : MAGNÉTISME DU SPIRAL ================= */}
                {mode === 'magnetisme' && (
                  <g>
                    <g transform="translate(210, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        1. VUE BINOCULAIRE DU SPIRAL SOUS CHAMP MAGNÉTIQUE
                      </text>

                      {[24, 38, 52, 66, 80].map((r, i) => {
                        const shift = level === 'healthy' ? 0 : level === 'moderate' ? i * 3.5 : i * 7.5;
                        return (
                          <circle
                            key={i}
                            cx={shift}
                            cy="0"
                            r={r}
                            fill="none"
                            stroke={level === 'critical' && i >= 2 ? '#f43f5e' : '#38bdf8'}
                            strokeWidth="2"
                          />
                        );
                      })}
                      <circle cx="0" cy="0" r="10" fill="#fbbf24" />
                      <text x="0" y="112" textAnchor="middle" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        {level === 'healthy'
                          ? '✓ 0 Gauss : Spires parfaitement concentriques'
                          : level === 'moderate'
                          ? '⚠ Aimantation rémanente : décentrement des spires (+45 s/j)'
                          : '✗ Spires collées par magnétisme : avance +3 à +10 min/j !'}
                      </text>
                    </g>

                    <g transform="translate(545, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        2. DÉMAGNÉTISATION (CHAMP ALTERNATIF DÉCROISSANT)
                      </text>
                      <rect x="-125" y="-95" width="250" height="190" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <path
                        d="M -105 0 C -90 -75, -75 75, -60 0 C -48 -55, -36 55, -24 0 C -14 -35, -4 35, 6 0 C 14 -18, 22 18, 30 0 C 38 -6, 46 6, 54 0 L 105 0"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        Marche instantanée : +{level === 'healthy' ? '2' : level === 'moderate' ? '48' : '240'} s/j
                      </text>
                    </g>
                  </g>
                )}

                {/* ================= MODE 4 : QUANTIÈME ZONE DE LA MORT ================= */}
                {mode === 'quantieme' && (
                  <g>
                    <g transform="translate(210, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        1. DOIGT D’ENTRAÎNEMENT (2556) &amp; DISQUE DE DATE (2557)
                      </text>

                      {/* Couronne dentée du disque de quantième */}
                      <path
                        d="M -110 -55 L 110 -55 L 110 -25 L 70 -25 L 55 5 L 40 -25 L -15 -25 L -30 5 L -45 -25 L -110 -25 Z"
                        fill="#334155"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />

                      {/* Doigt d'entraînement engagé à minuit */}
                      <polygon
                        points="-10,55 -30,-2 5,-2 15,55"
                        fill={level === 'critical' ? '#f43f5e' : '#fbbf24'}
                        stroke="#fef08a"
                        strokeWidth="2"
                      />

                      {level === 'critical' && (
                        <text x="0" y="95" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold" fontFamily="monospace">
                          ✗ DENT DE QUANTIÈME CISAILLÉE PAR CORRECTION RAPIDE EN T2 !
                        </text>
                      )}
                    </g>

                    <g transform="translate(545, 155)">
                      <text x="0" y="-125" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        2. CADRAN DE SÉCURITÉ HORAIRE (ZONE 21H – 03H)
                      </text>
                      <circle r="78" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                      {/* Secteur interdit 21h-03h en haut */}
                      <path
                        d="M -55 -55 A 78 78 0 0 1 55 -55 L 0 0 Z"
                        fill="#f43f5e"
                        fillOpacity="0.55"
                        stroke="#fda4af"
                        strokeWidth="2"
                      />
                      {/* Secteur sûr 06hh-18h en bas */}
                      <path
                        d="M 78 0 A 78 78 0 0 1 -78 0 L 0 0 Z"
                        fill="#10b981"
                        fillOpacity="0.25"
                      />
                      <text x="0" y="-32" textAnchor="middle" fill="#ffe4e6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        21H – 03H : INTERDIT
                      </text>
                      <text x="0" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        06H – 18H : SÉCURISÉ
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Fiche Diagnostic de l'organe et de l'état sélectionnés */}
            <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
                    Verdict d’Atelier
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      level === 'healthy'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : level === 'moderate'
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {level === 'healthy' ? 'Conforme' : level === 'moderate' ? 'Correction Requise' : 'Remplacement'}
                  </span>
                </div>

                {mode === 'pivot' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {level === 'healthy'
                        ? 'Pivot Conique Poli Miroir'
                        : level === 'moderate'
                        ? 'Pivot Marqué par Huile Sèche'
                        : 'Pivot Refoulé en « Champignon »'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {level === 'healthy'
                        ? 'En position horizontale (CH/CB), le balancier repose sur l’extrémité bombée du pivot contre le contre-pivot. En position verticale, le tenon cylindrique roule dans le rubis percé olivé.'
                        : level === 'moderate'
                        ? 'Une huile Moebius 9010 dégradée après 7+ ans forme une pâte abrasive avec la poussière d’usure. Un léger polissage au brunissoir sur le tour Jacot permet de sauver le pivot.'
                        : 'Suite à un choc axial violent, le bout du pivot s’est aplati en champignon : l’amplitude est normale à plat mais s’effondre de plus de 70° dès que la montre passe en position verticale.'}
                    </p>
                  </div>
                )}

                {mode === 'goupilles' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {level === 'healthy'
                        ? 'Jeu aux Goupilles Parfaitement Réglé'
                        : level === 'moderate'
                        ? 'Goupilles Fermées (Spiral Bridé)'
                        : 'Goupilles Trop Ouvertes (Défaut d’Isochronisme)'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {level === 'healthy'
                        ? 'Au repos, la lame du spiral est centrée sans toucher ni l’une ni l’autre des goupilles. Dès que le balancier oscille, la spire s’appuie alternativement sur chaque goupille.'
                        : level === 'moderate'
                        ? 'Si la lame est pincée entre les goupilles, une contrainte latérale permanente décale le repère et crée une avance aux petites amplitudes.'
                        : 'Si l’écartement entre les goupilles est excessif, le spiral n’entre en contact avec elles qu’aux grandes amplitudes : à 24h de marche (petite amplitude), la longueur active augmente et la montre retarde fortement.'}
                    </p>
                  </div>
                )}

                {mode === 'magnetisme' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {level === 'healthy'
                        ? 'Spiral Nivarox Sain (0 Gauss)'
                        : level === 'moderate'
                        ? 'Magnétisme Résiduel (+45 s/j)'
                        : 'Spires Collées par Champ Magnétique'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {level === 'healthy'
                        ? 'Les spires s’écartent et se resserrent de façon concentrique autour de la virole. La période d’oscillation est stable.'
                        : level === 'moderate'
                        ? 'Un champ magnétique de proximité (aimant de pochette, haut-parleur) a aimanté l’alliage ferromagnétique : les spires s’attirent légèrement.'
                        : 'Deux spires restent collées ensemble par attraction magnétique : la longueur utile du spiral est raccourcie de 15 à 30 %, provoquant une avance de plusieurs minutes par jour.'}
                    </p>
                  </div>
                )}

                {mode === 'quantieme' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {level === 'healthy'
                        ? 'Correction Rapide Hors Zone Interdite'
                        : level === 'moderate'
                        ? 'Engagement du Doigt à 22h30'
                        : 'Dent du Disque Cisaillée / Sautoir Faussé'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {level === 'healthy'
                        ? 'Lorsque les aiguilles sont placées à 06h30, le doigt d’entraînement de quantième (2556) est totalement dégagé : le correcteur rapide en T2 tourne librement.'
                        : level === 'moderate'
                        ? 'Dès 21h00, le doigt d’entraînement pénètre entre deux dents du disque de quantième (2557) pour armer le ressort de saut instantané.'
                        : 'Actionner la correction rapide en T2 alors que le doigt 2556 bloque le disque cisaille la dent ou plie le bec du sautoir de quantième (2576).'}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-amber-600 dark:text-amber-400">
                Outil d’atelier : Binoculaire 40x + Comparateur Witschi Chronoscope
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            TABLEAU SYNOPTIQUE DES PANNES & INTERVENTIONS D'ÉTABLI
           ===================================================================== */}
        <section className="rounded-3xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Tableau Synoptique de Dépannage d’Établi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Protocole de diagnostic croisé entre l’observation du porteur, la lecture Witschi et l’action corrective à l’établi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '1. Avance Brutale (+2 à +10 min/jour)',
                symptom: 'La montre prend soudainement plusieurs minutes d’avance par jour sans avoir subi de choc.',
                cause: 'Aimantation du spiral métallique ou d’éléments en acier du mouvement : deux spires se touchent par attraction magnétique.',
                action: 'Contrôler au compas ou magnétomètre, passer le mouvement ou la montre dans un démagnétiseur à champ alternatif décroissant, puis revérifier la marche au Witschi.',
                href: '/ressources/reglage',
                cta: 'Laboratoire du Spiral →',
              },
              {
                title: '2. Chute d’Amplitude en Position Verticale (> 50°)',
                symptom: 'Amplitude saine à plat (CH : 290°) mais chute sous 210° en position 6H ou 9H avec écart de marche.',
                cause: 'Pivot de balancier aplati/tordu, pierre percée d’Incabloc fissurée, ou défaut d’équilibre statique (balourd) de la serge du balancier.',
                action: 'Inspecter les deux pivots de balancier sous binoculaire 40x, contrôler la propreté des chatons Incabloc et vérifier l’équilibrage sur les couteaux d’agate.',
                href: '/ressources/gestes',
                cta: 'Gestes de Réglage & Couteaux →',
              },
              {
                title: '3. « Effet Hélicoptère » au Remontage Manuel (ETA 2824-2)',
                symptom: 'La masse oscillante tourne violemment sur elle-même lorsqu’on remonte la couronne à la main en T1.',
                cause: 'Les cliquets internes de l’une des deux roues inverseuses (Code 1488) sont collés par une huile gommée et ne débrayent plus.',
                action: 'Déposer le pont d’automatique (1130), laver les roues inverseuses (1488), les traiter au bain Lubeta V105 (ou micro-trace Moebius 9010) ou les remplacer si usées.',
                href: '/pratique/fiches/eta2824',
                cta: 'Fiche Technique ETA 2824-2 →',
              },
              {
                title: '4. Arrêt Franc Malgré un Armage Complet',
                symptom: 'Le ressort de barillet est complètement armé, le rouage est sous tension mais le balancier ne démarre pas.',
                cause: 'Sèchement complet des huiles après 8+ ans, poussière bloquée dans les ailes d’un pignon de seconde/échappement, ou ellipse sortie de la fourchette (renversement).',
                action: 'Désarmer le barillet, déposer le balancier et l’ancre pour tester la liberté du train de rouage au soufflet, puis procéder au rhabillage complet.',
                href: '/pratique/rhabillage',
                cta: 'Protocole de Rhabillage Complet →',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-amber-600 dark:text-amber-400">Symptôme :</strong> {item.symptom}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-rose-600 dark:text-rose-400">Cause mécanique :</strong> {item.cause}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-emerald-600 dark:text-emerald-400">Intervention :</strong> {item.action}
                  </p>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2 border-t border-slate-200 dark:border-slate-800"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
