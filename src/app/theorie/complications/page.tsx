'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Sliders,
  AlertTriangle
} from 'lucide-react';

type MonthMode = '28_fev' | '29_fev' | '30_avr' | '31_mai';

interface MonthConfig {
  id: MonthMode;
  label: string;
  monthTitle: string;
  lastDay: number;
  nextMonth: string;
  notchDepthMm: string;
  notchRadius: number;
  teethPulled: number;
  leapYearState: string;
  explanation: string;
}

const MONTH_CONFIGS: Record<MonthMode, MonthConfig> = {
  '28_fev': {
    id: '28_fev',
    label: 'Février 28j (Année 1–3)',
    monthTitle: 'Février Non-Bissextile (28 Jours)',
    lastDay: 28,
    nextMonth: '1er Mars',
    notchDepthMm: '2.40 mm (Encoche Max.)',
    notchRadius: 58,
    teethPulled: 4,
    leapYearState: 'Année Commune (1, 2 ou 3)',
    explanation:
      'Le bec palpeur du Grand Levier plonge au fond de l’encoche la plus profonde (2.40 mm) de la came de 48 mois. Son cliquet recule de 4 pas sur l’étoile de quantième à 31 dents : à minuit, il tire simultanément les dents 29, 30, 31 et 1 pour afficher directement le 1er Mars.'
  },
  '29_fev': {
    id: '29_fev',
    label: 'Février 29j (Bissextile)',
    monthTitle: 'Février Bissextile (29 Jours — Année 4)',
    lastDay: 29,
    nextMonth: '1er Mars',
    notchDepthMm: '1.60 mm (Encoche Bissextile)',
    notchRadius: 68,
    teethPulled: 3,
    leapYearState: 'Année Bissextile (4e Année)',
    explanation:
      'Une seule fois tous les 4 ans (cycle de 1 461 jours), la came de 48 mois présente l’encoche intermédiaire de février (1.60 mm). Le Grand Levier descend moins bas, autorise le 29 février, puis tire 3 dents d’un coup (30, 31 et 1) à minuit.'
  },
  '30_avr': {
    id: '30_avr',
    label: 'Avril / Juin 30j',
    monthTitle: 'Mois Court de 30 Jours (Avril, Juin, Sept., Nov.)',
    lastDay: 30,
    nextMonth: '1er Mai',
    notchDepthMm: '0.80 mm (Encoche Courte)',
    notchRadius: 78,
    teethPulled: 2,
    leapYearState: 'Tous les ans (4 mois / 12)',
    explanation:
      'Le bec palpeur repose dans une encoche de faible profondeur (0.80 mm). Le soir du 30, le cliquet auxiliaire du Grand Levier engage 2 dents sur le rochet de quantième afin de sauter par-dessus le 31 et d’afficher directement le 1er du mois suivant.'
  },
  '31_mai': {
    id: '31_mai',
    label: 'Mai / Juillet 31j',
    monthTitle: 'Mois Long de 31 Jours (7 mois sur 12)',
    lastDay: 31,
    nextMonth: '1er Juin',
    notchDepthMm: '0.00 mm (Sommet Plein)',
    notchRadius: 88,
    teethPulled: 1,
    leapYearState: 'Tous les ans (7 mois / 12)',
    explanation:
      'Le bec palpeur du Grand Levier est maintenu en position haute sur le diamètre extérieur maximal de la came (0.00 mm). Le cliquet de rattrapage des mois courts reste hors de portée : seule la dent journalière fait avancer l’étoile de 31 vers 1.'
  }
};

const COMPLICATION_DOSSIERS = [
  { title: 'Tourbillon Breguet', href: '/theorie/complications/tourbillon', badge: 'Simulateur Cage 60s' },
  { title: 'Quantième & Came 48 Mois', href: '/theorie/complications/quantieme', badge: 'Grand Levier SVG' },
  { title: 'Calendrier Perpétuel', href: '/theorie/complications/calendrier-perpetuel', badge: 'Programme 4 Ans' },
  { title: 'Chronographe', href: '/theorie/complications/chronographe', badge: 'Roue à Colonnes' },
  { title: 'Phases de Lune', href: '/theorie/complications/phases-lune', badge: '59 vs 135 Dents' },
  { title: 'Sonnerie & Répétition', href: '/theorie/complications/sonnerie', badge: 'Limaçons & Timbres' },
  { title: 'Fusée-Chaînette', href: '/theorie/complications/fusee-chainette', badge: 'Couple Constant' },
  { title: 'Équation du Temps', href: '/theorie/complications/equation-temps', badge: 'Came Haricot' },
  { title: 'GMT & Heures Multiples', href: '/theorie/complications/gmt-heure-multiple', badge: '24 Fuseaux' },
  { title: 'Réveil Mécanique', href: '/theorie/complications/reveil-mecanique', badge: 'Double Barillet' }
];

export default function ComplicationsPage() {
  const [activeTab, setActiveTab] = useState<'tourbillon' | 'quantieme' | 'repetition' | 'chronographe'>('tourbillon');
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const [seconds, setSeconds] = useState<number>(0);
  const [isPlayingTourbillon, setIsPlayingTourbillon] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlayingTourbillon || activeTab !== 'tourbillon') return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 0.5) % 60);
    }, 80);
    return () => clearInterval(interval);
  }, [isPlayingTourbillon, activeTab]);

  const cageAngle = seconds * 6;
  const rad = (cageAngle * Math.PI) / 180;
  const instantaneousRate = +(8.0 * Math.cos(rad)).toFixed(1);
  const escapeWheelSelfRotation = cageAngle * 8;

  const [selectedMonthMode, setSelectedMonthMode] = useState<MonthMode>('28_fev');
  const [hasJumpedToFirst, setHasJumpedToFirst] = useState<boolean>(false);
  const qpCfg = MONTH_CONFIGS[selectedMonthMode];
  const displayedDate = hasJumpedToFirst ? 1 : qpCfg.lastDay;

  const [selectedHour, setSelectedHour] = useState<number>(10);
  const [selectedMinute, setSelectedMinute] = useState<number>(47);
  const [isChiming, setIsChiming] = useState<boolean>(false);
  const [chimeProgressText, setChimeProgressText] = useState<string>('En attente d’armage du verrou...');
  const [activeHammer, setActiveHammer] = useState<'none' | 'low' | 'high'>('none');
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playGongNote = (freq: number, duration: number = 1.2) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, ctx.currentTime);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.76, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + duration);
    osc2.stop(ctx.currentTime + duration);
  };

  const handlePlayChime = async () => {
    if (isChiming) return;
    setIsChiming(true);

    const h = selectedHour % 12 || 12;
    const quarters = Math.floor(selectedMinute / 15);
    const minutes = selectedMinute % 15;

    for (let i = 1; i <= h; i++) {
      setChimeProgressText(`Heures : coup ${i} sur ${h} (Timbre grave 440 Hz)`);
      setActiveHammer('low');
      playGongNote(440, 0.9);
      await new Promise((r) => setTimeout(r, 700));
      setActiveHammer('none');
      await new Promise((r) => setTimeout(r, 150));
    }

    await new Promise((r) => setTimeout(r, 400));

    for (let q = 1; q <= quarters; q++) {
      setChimeProgressText(`Quarts d’heure : quart ${q} sur ${quarters} (Tang-Ting)`);
      setActiveHammer('high');
      playGongNote(660, 0.7);
      await new Promise((r) => setTimeout(r, 280));
      setActiveHammer('low');
      playGongNote(440, 0.9);
      await new Promise((r) => setTimeout(r, 550));
      setActiveHammer('none');
      await new Promise((r) => setTimeout(r, 150));
    }

    await new Promise((r) => setTimeout(r, 400));

    for (let m = 1; m <= minutes; m++) {
      setChimeProgressText(`Minutes : coup ${m} sur ${minutes} (Timbre aigu 660 Hz)`);
      setActiveHammer('high');
      playGongNote(660, 0.7);
      await new Promise((r) => setTimeout(r, 550));
      setActiveHammer('none');
      await new Promise((r) => setTimeout(r, 120));
    }

    setChimeProgressText(`Sonnerie terminée : ${h}h ${selectedMinute}min`);
    setIsChiming(false);
  };

  const [chronoState, setChronoState] = useState<'stopped' | 'running'>('stopped');
  const [chronoTime, setChronoTime] = useState<number>(0);
  const [clutchType, setClutchType] = useState<'horizontal' | 'vertical'>('horizontal');

  useEffect(() => {
    if (chronoState !== 'running') return;
    const interval = setInterval(() => {
      setChronoTime((t) => t + 100);
    }, 100);
    return () => clearInterval(interval);
  }, [chronoState]);

  const formatChrono = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${tenths}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Théorie</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Les Sommets de la Haute Horlogerie Suisse</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Musée Interactif des <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Grandes Complications
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Manipulez directement les simulateurs SVG de la cage de Tourbillon Breguet (60s / 360°), de la came de 48 mois &amp; du Grand Levier du Quantième Perpétuel, de la Répétition Minutes et du Chronographe, ou ouvrez chacun des 10 dossiers spécialisés.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'tourbillon', label: '1. Tourbillon Breguet (60s)', subtitle: 'Cage Épicycloïdale & Courbe ISO' },
                { id: 'quantieme', label: '2. Came 48 Mois & Grand Levier', subtitle: 'Simulateur Quantième Perpétuel' },
                { id: 'repetition', label: '3. Répétition Minutes', subtitle: 'Synthétiseur Acoustique Réel' },
                { id: 'chronographe', label: '4. Le Chronographe', subtitle: 'Roue à Colonnes vs Navette' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'tourbillon' | 'quantieme' | 'repetition' | 'chronographe')}
                  className={`px-4 py-3 rounded-2xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                      : 'bg-white dark:bg-[#0f1422] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                  }`}
                >
                  <div className="text-xs sm:text-sm">{tab.label}</div>
                  <div className={`text-[10px] ${activeTab === tab.id ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    {tab.subtitle}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setLoupe10x(!loupe10x)}
              className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
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
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {activeTab === 'tourbillon' && (
          <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Simulateur Cinématique Épicycloïdal • Brevet Breguet 26 Juin 1801</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Cage Tournante 1 Minute &amp; Moyennage Gravitationnel sur 360°
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsPlayingTourbillon(!isPlayingTourbillon)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isPlayingTourbillon ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {isPlayingTourbillon ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingTourbillon ? 'Pause Rotation' : 'Animer (60s)'}</span>
                </button>
                <Link
                  href="/theorie/complications/tourbillon"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:border-amber-500"
                >
                  <span>Ouvrir le Cours Complet Tourbillon</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
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
                    <circle cx="210" cy="200" r="175" fill="#090e1a" stroke="#1e293b" strokeWidth="1.5" />
                    <text x="210" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      12H (θ = 180° • -8.0 s/j)
                    </text>
                    <text x="210" y="390" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      6H (θ = 0° • +8.0 s/j)
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
                    <text x="210" y="78" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                      Roue de Seconde Fixe (Code 227)
                    </text>

                    <g transform={`translate(210, 200) rotate(${cageAngle})`}>
                      <circle cx="0" cy="0" r="138" fill="none" stroke="#94a3b8" strokeWidth="5" />
                      <path d="M -138 0 L -42 0 M 42 0 L 138 0" stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" />
                      <path d="M 0 -138 L 0 -55 M 0 55 L 0 138" stroke="#64748b" strokeWidth="4" />

                      <g transform="translate(0, -88)">
                        <g transform={`rotate(${escapeWheelSelfRotation})`}>
                          <circle cx="0" cy="0" r="24" fill="#ef4444" fillOpacity="0.18" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="-22" y1="0" x2="22" y2="0" stroke="#f87171" strokeWidth="1.5" />
                          <line x1="0" y1="-22" x2="0" y2="22" stroke="#f87171" strokeWidth="1.5" />
                        </g>
                        <circle cx="0" cy="0" r="9" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />
                      </g>

                      <path d="M -22 -48 L 0 -64 L 22 -48 L 0 -18 Z" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="76" fill="none" stroke="#f59e0b" strokeWidth="5" />
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
                      setIsPlayingTourbillon(false);
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
                          setIsPlayingTourbillon(false);
                          setSeconds(preset.s);
                        }}
                        className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">MARCHE INSTANTANÉE</div>
                    <div className="font-mono font-bold text-amber-500 mt-0.5">
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
        )}

        {activeTab === 'quantieme' && (
          <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  <Calendar className="w-4 h-4" />
                  <span>Simulateur Cinématique • Came de 48 Mois &amp; Grand Levier</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Palpage Mécanique des Mois Courts (28, 29, 30 et 31 Jours)
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setHasJumpedToFirst(!hasJumpedToFirst)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    hasJumpedToFirst ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                  }`}
                >
                  {hasJumpedToFirst ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>
                    {hasJumpedToFirst
                      ? `Revenir au ${qpCfg.lastDay} (23h59)`
                      : `Déclencher Saut Minuit (${qpCfg.lastDay} → 1)`}
                  </span>
                </button>
                <Link
                  href="/theorie/complications/quantieme"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                >
                  <span>Ouvrir le Cours Complet Quantième</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="px-6 sm:px-8 pt-6 flex flex-wrap gap-2">
              {(Object.keys(MONTH_CONFIGS) as MonthMode[]).map((mKey) => {
                const item = MONTH_CONFIGS[mKey];
                const active = selectedMonthMode === mKey;
                return (
                  <button
                    key={mKey}
                    onClick={() => {
                      setSelectedMonthMode(mKey);
                      setHasJumpedToFirst(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      active
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
                <div className="overflow-hidden rounded-xl bg-[#060a12]">
                  <svg
                    viewBox="0 0 680 350"
                    className="w-full h-auto transition-transform duration-300"
                    style={{
                      transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                      transformOrigin: '230px 180px'
                    }}
                  >
                    <g transform="translate(155, 185)">
                      <circle cx="0" cy="0" r="102" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="78" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="0" cy="0" r="68" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="0" cy="0" r="58" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />

                      <path
                        d={`M ${qpCfg.notchRadius} -12 L 90 -18 L 90 18 L ${qpCfg.notchRadius} 12 Z`}
                        fill="#060a12"
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                      <circle cx="0" cy="0" r="32" fill="#090d16" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="0" cy="0" r="7" fill="#f59e0b" />
                      <text x="0" y="-112" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        Came à 48 Crans (Cycle 4 Ans)
                      </text>
                      <text x="0" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        Profondeur active : {qpCfg.notchDepthMm}
                      </text>
                    </g>

                    <g>
                      <circle cx="335" cy="95" r="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
                      <path
                        d={`M ${155 + qpCfg.notchRadius} 185 L 335 95 L 485 ${
                          hasJumpedToFirst ? 175 : 195 + qpCfg.teethPulled * 10
                        }`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx={155 + qpCfg.notchRadius} cy="185" r="7" fill="#f43f5e" stroke="#fecdd3" strokeWidth="2" />
                    </g>

                    <g transform="translate(530, 185)">
                      <circle cx="0" cy="0" r="96" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
                      <rect x="-38" y="-28" width="76" height="56" rx="10" fill="#060a12" stroke="#10b981" strokeWidth="2.5" />
                      <text x="0" y="-8" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                        GUICHET DATE
                      </text>
                      <text x="0" y="18" textAnchor="middle" fill="#34d399" fontSize="26" fontWeight="bold" fontFamily="monospace">
                        {displayedDate}
                      </text>
                      <text x="0" y="124" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        Course du cliquet : {qpCfg.teethPulled} dent(s) tirée(s)
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <span>{qpCfg.leapYearState}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  {qpCfg.monthTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {qpCfg.explanation}
                </p>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                  <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Zone de la Mort : 21h00 – 03h00</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Ne jamais actionner le correcteur rapide pendant que le Grand Levier est engagé dans l’étoile de quantième.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'repetition' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Atelier Acoustique de Répétition Minutes
                  </span>
                </div>
                <Link
                  href="/theorie/complications/sonnerie"
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Ouvrir le Cours Sonnerie →
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Heure</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={selectedHour}
                      onChange={(e) => setSelectedHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                      className="w-16 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xl font-extrabold text-center"
                    />
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-amber-500 pt-4">:</span>
                  <div className="text-center">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Minute</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={selectedMinute}
                      onChange={(e) => setSelectedMinute(Math.max(0, Math.min(59, Number(e.target.value))))}
                      className="w-16 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xl font-extrabold text-center"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePlayChime}
                  disabled={isChiming}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>{isChiming ? 'Sonnerie en cours...' : 'Tirer le Verrou d’Armage (Écouter la Sonnerie)'}</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white border-2 border-slate-800 text-center space-y-4">
                <div className="text-xs font-mono text-amber-400 font-bold">{chimeProgressText}</div>
                <div className="flex items-center justify-center gap-12 py-4">
                  <div className="text-center space-y-2">
                    <div
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-xs transition-all ${
                        activeHammer === 'low'
                          ? 'bg-amber-500 border-amber-300 text-slate-950 scale-125'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      BONG
                    </div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Timbre Grave (440 Hz)</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-xs transition-all ${
                        activeHammer === 'high'
                          ? 'bg-sky-400 border-sky-200 text-slate-950 scale-125'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      BING
                    </div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Timbre Aigu (660 Hz)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Limaçons des Heures, Quarts &amp; Minutes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Trois râteaux dentés tombent sur trois cames en colimaçon (12 pas pour les heures, 4 pas pour les quarts, 14 pas pour les minutes) pendant que le volant inertiel régule silencieusement la cadence des marteaux.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'chronographe' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  Chronométrie des Temps Courts
                </span>
                <div className="flex gap-2">
                  <Link
                    href="/ressources/chronographe"
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-bold"
                  >
                    Simulateur Complet Roue à Colonnes vs 7750 →
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 text-white border-2 border-slate-800 text-center space-y-6">
                <div className="text-5xl sm:text-6xl font-mono font-extrabold tracking-tight text-amber-400">
                  {formatChrono(chronoTime)}
                </div>
                <div className="flex justify-center gap-4">
                  {chronoState !== 'running' ? (
                    <button
                      onClick={() => setChronoState('running')}
                      className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Démarrer (2H)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setChronoState('stopped')}
                      className="px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Stop (2H)</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setChronoState('stopped');
                      setChronoTime(0);
                    }}
                    className="px-6 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Remise à Zéro (4H)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Roue à Colonnes vs Came-Navette 7750
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Explorez l’engrènement à 1/3 de dent du pignon oscillant Edouard Heuer et la remise à zéro par marteau sur cames en cœur.
              </p>
              <Link
                href="/theorie/complications/chronographe"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Ouvrir le Cours Complet Chronographe</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        <section className="rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Accès Direct aux 10 Monographies Techniques
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Tous les Dossiers des Complications Horlogères
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {COMPLICATION_DOSSIERS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all group flex flex-col justify-between gap-2"
              >
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 mb-1.5">
                    {d.badge}
                  </span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {d.title}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span>Ouvrir</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
