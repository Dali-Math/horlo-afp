'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Scale,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  HelpCircle,
  ShieldCheck,
  Gauge,
  Compass
} from 'lucide-react';

const FUSEE_COMPONENTS = [
  {
    name: 'Tambour de Barillet Lisse (Sans Denture)',
    specs: 'Ressort moteur en alliage Nivaflex • Enroulement externe de la chaîne',
    role: 'Contrairement à un barillet classique denté qui entraîne directement le pignon de centre, le tambour de fusée est lisse : sa paroi externe sert de bobine réceptrice à la chaînette au fur et à mesure que le ressort se détend.'
  },
  {
    name: 'Chaînette Miniature de Type Galle',
    specs: 'Longueur ~140 à 180 mm • Plus de 600 maillons et goupilles en acier trempé',
    role: 'Véritable prouesse micro-mécanique (section < 0.60 × 0.40 mm), assemblée à la main. Elle transmet la force de traction F(t) du tambour vers la rainure hélicoïdale de la fusée sans aucun glissement.'
  },
  {
    name: 'Cône Hyperbolique Rainuré (La Fusée)',
    specs: 'Rayon variable : r_min = 2.20 mm (sommet) → r_max = 4.90 mm (base)',
    role: 'Usiné selon une courbe hyperbolique exacte adaptée à la courbe de décharge du ressort. Plus la force F(t) baisse, plus le rayon d’enroulement R(t) augmente afin que le produit M = F(t) × R(t) demeure strictement constant.'
  },
  {
    name: 'Ressort Auxiliaire d’Entretien (Maintaining Power)',
    specs: 'Inventé par John Harrison • Roue à rochet interne et ressort de maintien',
    role: 'Lors du remontage à la clé ou à la couronne, la fusée tourne en sens inverse : le ressort auxiliaire continue d’entraîner la grande roue de fusée pendant ces quelques secondes pour que le balancier ne s’arrête jamais.'
  },
  {
    name: 'Garde-Chaîne (Plot d’Arrêt de Fin d’Armage)',
    specs: 'Levier basculant actionné par le dernier tour de chaîne au sommet du cône',
    role: 'Empêche toute surtension et rupture de la chaînette en fin de remontage lorsque la chaîne atteint la spire supérieure la plus étroite de la fusée.'
  }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Au plein armage (0 h), où se trouve la chaînette et quel est le rayon actif sur la fusée ?',
    options: [
      'Toute la chaîne est sur le barillet et tire sur la base large de la fusée',
      'Toute la chaîne est enroulée sur la fusée et tire sur le sommet étroit (rayon minimal r_min = 2.20 mm)',
      'La chaîne est partagée à 50% entre le barillet et la fusée',
      'Le rayon de la fusée ne change jamais'
    ],
    answer: 1,
    explanation:
      'Au plein armage (0 h), le ressort de barillet développe sa force maximale F_max. Pour éviter un couple excessif, la chaîne est entièrement enroulée sur la fusée et tire sur le sommet du cône où le bras de levier est minimal (r_min = 2.20 mm).'
  },
  {
    q: 'Quelle équation physique gouverne le profil géométrique du cône de la fusée ?',
    options: [
      'M = F(t) / R(t)',
      'M = F(t) × R(t) = Constante (compensation hyperbolique du couple)',
      'E = 1/2 I ω²',
      'T = 2π √(I / C)'
    ],
    answer: 1,
    explanation:
      'Le couple transmis au rouage vaut M = F(t) × R(t). Lorsque la force de traction F(t) diminue de moitié en fin de réserve de marche, le rayon du cône R(t) double exactement afin de maintenir M constant.'
  },
  {
    q: 'À quoi sert le dispositif d’entretien (« Maintaining Power » de John Harrison) logé dans la base de la fusée ?',
    options: [
      'À lubrifier automatiquement les maillons de la chaînette',
      'À maintenir le couple moteur vers le rouage pendant que l’on remonte la montre',
      'À sonner les heures dans l’obscurité',
      'À bloquer l’échappement lors d’un choc'
    ],
    answer: 1,
    explanation:
      'Sans ressort auxiliaire d’entretien, le couple moteur s’annulerait et s’inverserait pendant que l’on remonte la chaîne du barillet vers la fusée, ce qui arrêterait la montre.'
  }
];

export default function FuseeChainettePage() {
  const [elapsedHours, setElapsedHours] = useState<number>(12);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setElapsedHours((prev) => (prev >= 48 ? 0 : prev + 1));
    }, 280);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  // Loi physique hyperbolique : M = F(t) * R(t) = 10.00 mN·m
  const progress = elapsedHours / 48; // 0 (armé 100%) -> 1 (désarmé 0%)
  const forceN = Number((4.55 - progress * 2.51).toFixed(2)); // 4.55 N -> 2.04 N
  const fuseeRadiusMm = Number((10.0 / forceN).toFixed(2)); // 2.20 mm -> 4.90 mm
  const fuseeTorque = Number((forceN * fuseeRadiusMm).toFixed(2)); // ~10.00 mN·m constant
  const standardBarrelTorque = Number((10.0 - progress * 5.5).toFixed(2)); // chute de 10.0 à 4.5 mN·m
  const fuseeAmplitude = 285;
  const standardAmplitude = Math.round(300 - progress * 85);

  // Position verticale de la chaîne entre le cône de la fusée et le tambour de barillet
  const chainY = 92 + progress * 136; // descend du sommet (y=92) vers la base (y=228)
  const coneHalfWidthAtChain = 24 + progress * 44; // rayon visuel sur le cône SVG

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b12] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* BARRE DE NAVIGATION STICKY */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-[#080b12]/85 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Théorie</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href="/theorie/complications"
              className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Complications
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-amber-600 dark:text-amber-400">Transmission Fusée-Chaînette</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            <Scale className="w-3.5 h-3.5" />
            Couple Constant M = F(t) × R(t)
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* HERO ÉDITORIAL CONFORME /THEORIE */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Chronométrie de Marine &amp; Haute Horlogerie • Force Constante
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Transmission Fusée-Chaînette &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Compensation Hyperbolique du Couple
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Un ressort de barillet classique perd plus de 50 % de sa force élastique entre le plein armage et la fin de sa réserve de marche.
            La fusée-chaînette résout cette loi physique en enroulant une chaîne d’acier sur un cône rainuré dont le rayon augmente exactement dans la proportion où la force du ressort faiblit.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-left font-mono">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Équation Fondamentale</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">M = F × R</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400">Couple constant ±0.5%</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Rayon du Cône</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">2.2 → 4.9 mm</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400">7 spires hélicoïdales</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Chaînette Acier</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">~600 pièces</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400">Maillons &amp; goupilles rivetés</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Amplitude Balancier</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">285° Stable</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400">Isochronisme préservé 48h</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIMULATEUR CINÉMATIQUE & PHYSIQUE SVG : FUSÉE-CHAÎNETTE (0H -> 48H)       */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Gauge className="w-4 h-4" />
                <span>Banc Dynamométrique SVG • Loi Hyperbolique M = F(t) × R(t)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Déroulement de la Chaînette sur le Cône Rainuré (0 h → 48 h)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  isPlaying ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-950'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Animer Décharge (48h)'}</span>
              </button>

              {[
                { h: 0, label: '0h (Armé 100%)' },
                { h: 16, label: '16h' },
                { h: 32, label: '32h' },
                { h: 48, label: '48h (Fin)' }
              ].map((preset) => (
                <button
                  key={preset.h}
                  onClick={() => {
                    setIsPlaying(false);
                    setElapsedHours(preset.h);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    elapsedHours === preset.h
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}

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

          <div className="p-6 sm:p-8 space-y-6">
            {/* Curseur de réserve de marche */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 min-w-[230px]">
                Temps écoulé : <span className="text-amber-500">{elapsedHours} h / 48 h</span> ({Math.round((1 - progress) * 100)}% réserve)
              </div>
              <input
                type="range"
                min={0}
                max={48}
                step={1}
                value={elapsedHours}
                onChange={(e) => {
                  setIsPlaying(false);
                  setElapsedHours(Number(e.target.value));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* CANVAS SVG : TAMBOUR DE BARILLET + CÔNE DE FUSÉE + COURBE DE COUPLE */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                  <svg
                    viewBox="0 0 740 380"
                    className="w-full h-auto transition-transform duration-300"
                    style={{
                      transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                      transformOrigin: '235px 185px'
                    }}
                  >
                    <line x1="430" y1="20" x2="430" y2="360" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />

                    {/* ======================================================= */}
                    {/* 1. TAMBOUR DE BARILLET (GAUCHE)                         */}
                    {/* ======================================================= */}
                    <g transform="translate(115, 170)">
                      <text x="0" y="-125" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        TAMBOUR DE BARILLET
                      </text>
                      {/* Paroi cylindrique du tambour */}
                      <rect x="-56" y="-82" width="112" height="164" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />

                      {/* Spires de chaîne déjà enroulées sur le tambour (augmentent avec progress) */}
                      {Array.from({ length: Math.round(progress * 7) }).map((_, idx) => (
                        <line
                          key={idx}
                          x1="-56"
                          y1={-68 + idx * 20}
                          x2="56"
                          y2={-68 + idx * 20}
                          stroke="#38bdf8"
                          strokeWidth="4"
                          strokeDasharray="6 3"
                        />
                      ))}

                      {/* Indicateur de tension interne du ressort Nivaflex */}
                      <circle
                        cx="0"
                        cy="0"
                        r={22 + (1 - progress) * 18}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeDasharray="5 3"
                      />
                      <text x="0" y="108" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        Force F(t) = {forceN} N
                      </text>
                    </g>

                    {/* ======================================================= */}
                    {/* 2. CÔNE HYPERBOLIQUE DE LA FUSÉE (CENTRE)               */}
                    {/* ======================================================= */}
                    <g transform="translate(310, 170)">
                      <text x="0" y="-125" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        CÔNE DE FUSÉE RAINURÉ
                      </text>

                      {/* Grande roue dentée d'entraînement à la base + rochet Harrison */}
                      <rect x="-78" y="68" width="156" height="18" rx="4" fill="#d97706" stroke="#fde68a" strokeWidth="2" />
                      <text x="0" y="80" fill="#090d16" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        GRANDE ROUE + ROCHET HARRISON
                      </text>

                      {/* Profil trapézoïdal/hyperbolique du cône de fusée */}
                      <path
                        d="M -24 -82 L 24 -82 C 36 -20, 52 28, 68 68 L -68 68 C -52 28, -36 -20, -24 -82 Z"
                        fill="#b45309"
                        stroke="#fde68a"
                        strokeWidth="2.5"
                      />

                      {/* 7 Rainures hélicoïdales + chaîne restante sur le cône */}
                      {[0, 1, 2, 3, 4, 5, 6].map((grooveIdx) => {
                        const gy = -72 + grooveIdx * 21;
                        const halfW = 24 + (grooveIdx / 6) * 42;
                        const hasChain = grooveIdx / 6 >= progress;
                        return (
                          <line
                            key={grooveIdx}
                            x1={-halfW}
                            y1={gy}
                            x2={halfW}
                            y2={gy}
                            stroke={hasChain ? '#38bdf8' : '#78350f'}
                            strokeWidth={hasChain ? '4.5' : '2'}
                            strokeDasharray={hasChain ? '6 3' : 'none'}
                          />
                        );
                      })}

                      {/* Cote dynamique du rayon actif R(t) */}
                      <line
                        x1="0"
                        y1={chainY - 170}
                        x2={coneHalfWidthAtChain}
                        y2={chainY - 170}
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <circle cx="0" cy={chainY - 170} r="4" fill="#10b981" />
                      <circle cx={coneHalfWidthAtChain} cy={chainY - 170} r="4" fill="#10b981" />

                      <text x="0" y="108" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        Rayon R(t) = {fuseeRadiusMm} mm
                      </text>
                    </g>

                    {/* BRIN DE CHAÎNETTE EN ACIER TENDU ENTRE LE CÔNE ET LE TAMBOUR */}
                    <g>
                      <line
                        x1="171"
                        y1={chainY}
                        x2={310 - coneHalfWidthAtChain}
                        y2={chainY}
                        stroke="#38bdf8"
                        strokeWidth="5"
                        strokeDasharray="7 3"
                      />
                      <text
                        x="232"
                        y={chainY - 10}
                        fill="#38bdf8"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        Chaînette Galle
                      </text>
                    </g>

                    {/* ======================================================= */}
                    {/* 3. GRAPHE COMPARATIF DU COUPLE (DROITE)                 */}
                    {/* ======================================================= */}
                    <g transform="translate(465, 65)">
                      <text x="120" y="-20" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        COUPLE TRANSMIS AU ROUAGE (0H → 48H)
                      </text>

                      {/* Cadre du graphe */}
                      <rect x="0" y="0" width="240" height="210" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

                      {/* Courbe rouge : Barillet classique seul (chute de 55%) */}
                      <path
                        d="M 20 45 Q 120 110, 220 165"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />
                      <text x="125" y="152" fill="#fb7185" fontSize="8.5" fontFamily="monospace">
                        Barillet seul (-55%)
                      </text>

                      {/* Droite émeraude : Couple constant Fusée-Chaînette */}
                      <line x1="20" y1="45" x2="220" y2="45" stroke="#10b981" strokeWidth="3.5" />
                      <text x="115" y="34" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        Fusée-Chaînette : M = 10.0 mN·m
                      </text>

                      {/* Curseur temporel sur les 2 courbes */}
                      <line
                        x1={20 + progress * 200}
                        y1="15"
                        x2={20 + progress * 200}
                        y2="195"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle cx={20 + progress * 200} cy="45" r="5.5" fill="#10b981" stroke="#ecfdf5" strokeWidth="2" />
                      <circle
                        cx={20 + progress * 200}
                        cy={45 + progress * 120}
                        r="5"
                        fill="#f43f5e"
                        stroke="#fff1f2"
                        strokeWidth="1.5"
                      />

                      <text x="20" y="228" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                        0h (100%)
                      </text>
                      <text x="220" y="228" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                        48h (0%)
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* TABLEAU DE BORD DYNAMOMÉTRIQUE */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                    Bilan Mécanique Instantané à t = {elapsedHours} h
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500">FORCE DU RESSORT F(t)</div>
                      <div className="text-lg font-bold text-rose-500 mt-0.5">{forceN} N</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500">RAYON FUSÉE R(t)</div>
                      <div className="text-lg font-bold text-amber-500 mt-0.5">{fuseeRadiusMm} mm</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono space-y-1">
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                      COUPLE RÉSULTANT : M = F(t) × R(t)
                    </div>
                    <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      {fuseeTorque} mN·m (Amplitude {fuseeAmplitude}°)
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      Contre {standardBarrelTorque} mN·m ({standardAmplitude}°) sur barillet seul
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {elapsedHours < 16
                      ? 'Début de réserve : le ressort est très tendu. La chaînette tire au sommet étroit de la fusée (petit bras de levier) pour brider l’excès de couple.'
                      : elapsedHours < 36
                      ? 'Milieu de réserve : la chaîne descend à mi-hauteur du cône hyperbolique. L’augmentation progressive du rayon compense exactement l’affaiblissement du ressort.'
                      : 'Fin de réserve : le ressort de barillet a perdu plus de la moitié de sa force, mais la chaîne tire désormais sur la base large de la fusée (r = 4.90 mm), maintenant un couple intact.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ANATOMIE DES 5 ORGANES DE LA FUSÉE-CHAÎNETTE */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Architecture Micro-Mécanique
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Les 5 Organes Clés d’une Transmission Fusée-Chaînette
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUSEE_COMPONENTS.map((comp, idx) => (
              <div
                key={comp.name}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">{comp.name}</h3>
                </div>
                <div className="text-xs font-mono text-amber-600 dark:text-amber-400">{comp.specs}</div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{comp.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUIZ TECHNIQUE */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              Auto-Évaluation : Physique de la Fusée-Chaînette
            </h2>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((item, qIdx) => {
              const userAns = quizAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {qIdx + 1}. {item.q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.options.map((opt, oIdx) => {
                      const selected = userAns === oIdx;
                      const isCorrect = oIdx === item.answer;
                      let btnStyle =
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500';
                      if (userAns !== undefined) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                        } else if (selected) {
                          btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300';
                        }
                      }
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                          className={`p-3 rounded-xl text-left text-xs sm:text-sm border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {userAns !== undefined && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <strong>Explication d’établi :</strong> {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
