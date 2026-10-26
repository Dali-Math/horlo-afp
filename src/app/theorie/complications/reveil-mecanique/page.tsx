'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Volume2,
  ZoomIn,
  Play,
  RotateCcw
} from 'lucide-react';

const ALARM_CALIBRES = [
  {
    name: 'Vulcain Calibre Cricket 120 (1947)',
    acousticSystem: 'Marteau frappant une goupille solidaire d’une membrane interne + double fond perforé',
    powerSource: 'Double barillet (1 barillet horaire + 1 barillet de réveil remontés selon le sens de rotation de la couronne)',
    duration: '20 à 25 secondes (~1 200 impacts à haute intensité acoustique)',
    desc: 'Conçu avec l’aide du physicien Paul Langevin : la chambre acoustique du double fond amplifie l’onde mécanique comme le thorax d’un grillon.'
  },
  {
    name: 'Jaeger-LeCoultre Calibre Memovox 825 / 956 (1956–présent)',
    acousticSystem: 'Disque central rotatif à index triangulaire + marteau frappant un timbre suspendu ou plot de fond',
    powerSource: '2 couronnes distinctes (2h pour armer et régler le réveil, 4h pour le mouvement horaire)',
    duration: '18 à 20 secondes de sonnerie cristalline',
    desc: 'Pionnier du réveil automatique à rotor à butées (bumper) puis à timbre périphérique suspendu au fond saphir.'
  }
];

export default function ReveilMecaniquePage() {
  const [alarmTriggered, setAlarmTriggered] = useState<boolean>(false);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);
  const audioTimerRef = useRef<number | null>(null);

  const triggerCricketAlarm = () => {
    setAlarmTriggered(true);
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Rafale rapide de 18 impacts métalliques type Vulcain Cricket
    for (let i = 0; i < 18; i++) {
      const t = now + i * 0.065;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1950 + (i % 2) * 280, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.048);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    }

    if (audioTimerRef.current) window.clearTimeout(audioTimerRef.current);
    audioTimerRef.current = window.setTimeout(() => {
      setAlarmTriggered(false);
    }, 1350);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b12] text-slate-900 dark:text-slate-100 transition-colors duration-300">
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
            <span className="font-bold text-amber-600 dark:text-amber-400">Réveil Mécanique</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            <Bell className="w-3.5 h-3.5" />
            Came à Encoche Axiale &amp; Double Barillet
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Volume2 className="w-3.5 h-3.5" />
            Complication Acoustique Utilitaire • Vulcain Cricket (1947) &amp; JLC Memovox (1956)
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Réveil Mécanique &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Came à Encoche &amp; Double Fond Résonant
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Le réveil mécanique associe un second barillet dédié à une came de déclenchement coaxiale à la roue des heures.
            À l’instant où l’ergot de la roue des heures tombe dans l’encoche de la came de réveil, le levier de blocage libère le marteau de sonnerie.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* SIMULATEUR CINÉMATIQUE & ACOUSTIQUE SVG : CAME À ENCOCHE & MARTEAU        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Bell className="w-4 h-4" />
                <span>Simulateur Cinématique &amp; Acoustique SVG • Loupe 10x</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Chute Axiale dans la Came de Réveil &amp; Percussion du Marteau Cricket
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAlarmTriggered(false)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  !alarmTriggered
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                1. En Attente (Ergot sur le Plat de Came)
              </button>
              <button
                onClick={triggerCricketAlarm}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>2. Coïncidence Horaire → Chute dans l’Encoche &amp; Sonnerie</span>
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

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                <svg
                  viewBox="0 0 720 340"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                    transformOrigin: '240px 170px'
                  }}
                >
                  {/* GAUCHE : COUPE AXIALE DE LA ROUE DES HEURES ET DE LA CAME À ENCOCHE */}
                  <g transform="translate(215, 175)">
                    <text x="0" y="-135" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      1. CAME DE RÉVEIL À ENCOCHE AXIALE
                    </text>

                    {/* Came de réveil inférieure avec encoche en V */}
                    <path
                      d="M -115 20 L -26 20 L 0 54 L 26 20 L 115 20 L 115 58 L -115 58 Z"
                      fill="#0284c7"
                      stroke="#bae6fd"
                      strokeWidth="2"
                    />
                    <text x="0" y="76" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Came de Réveil (Encoche réglée sur 07h00)
                    </text>

                    {/* Roue des heures supérieure munie de son doigt / ergot conique */}
                    <g transform={alarmTriggered ? 'translate(0, 26)' : 'translate(-45, 0)'}>
                      <rect x="-95" y="-32" width="190" height="24" rx="4" fill="#d97706" stroke="#fde68a" strokeWidth="2" />
                      <polygon points="-18,-8 18,-8 0,20" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />
                      <text x="0" y="-16" fill="#090d16" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        ROUE DES HEURES (ERGOT PALPEUR)
                      </text>
                    </g>

                    <text
                      x="0"
                      y="118"
                      fill={alarmTriggered ? '#34d399' : '#94a3b8'}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {alarmTriggered
                        ? 'Ergot tombé dans l’encoche → Déblocage du marteau !'
                        : 'Ergot en appui sur le plat → Marteau verrouillé'}
                    </text>
                  </g>

                  {/* DROITE : ÉTOILE DE SONNERIE, MARTEAU VIBRANT & MEMBRANE DOUBLE FOND */}
                  <g transform="translate(535, 175)">
                    <text x="0" y="-135" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      2. ROUAGE DE SONNERIE &amp; DOUBLE FOND CRICKET
                    </text>

                    {/* Roue d'échappement de réveil à dents de loup */}
                    <circle
                      cx="-45"
                      cy="-10"
                      r="46"
                      fill="#1e293b"
                      stroke={alarmTriggered ? '#10b981' : '#64748b'}
                      strokeWidth="3"
                      strokeDasharray="8 4"
                    />
                    <text x="-45" y="-6" fill="#e2e8f0" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      ÉTOILE
                    </text>

                    {/* Marteau oscillant à double levée */}
                    <g transform={alarmTriggered ? 'rotate(14)' : 'rotate(0)'}>
                      <rect x="8" y="-45" width="22" height="75" rx="5" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
                      <circle cx="34" cy="-25" r="10" fill="#f43f5e" stroke="#fecdd3" strokeWidth="2" />
                    </g>

                    {/* Membrane acoustique + Double fond perforé */}
                    <line x1="62" y1="-90" x2="62" y2="80" stroke="#38bdf8" strokeWidth="4" />
                    <line x1="82" y1="-90" x2="82" y2="80" stroke="#94a3b8" strokeWidth="4" strokeDasharray="12 8" />

                    {alarmTriggered && (
                      <g stroke="#34d399" strokeWidth="2" fill="none">
                        <path d="M 96 -40 Q 116 0, 96 40" />
                        <path d="M 110 -55 Q 135 0, 110 55" />
                      </g>
                    )}

                    <text x="0" y="118" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Membrane résonante + Double fond acoustique
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Principe du Déclenchement Axial
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  L’aiguille de réveil est solidaire d’une <strong>came munie d’une encoche en V</strong>. Tant que l’heure programmée n’est pas atteinte, le doigt de la roue des heures glisse sur la face plane de la came et repousse le ressort-levier qui bloque le marteau. À la minute exacte de coïncidence, la roue des heures s’abaisse axialement de <strong>0.25 mm</strong> dans l’encoche et libère l’ancre de sonnerie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LES 2 ARCHITECTURES HISTORIQUES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALARM_CALIBRES.map((cal) => (
            <div
              key={cal.name}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{cal.name}</h3>
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400">{cal.powerSource}</div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{cal.acousticSystem}</div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{cal.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
