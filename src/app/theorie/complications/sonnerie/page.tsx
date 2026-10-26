'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Play,
  RotateCcw,
  ZoomIn,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Music,
  ShieldCheck
} from 'lucide-react';

interface StrikingType {
  name: string;
  trigger: string;
  sequence: string;
  complexity: string;
  description: string;
}

const STRIKING_TYPES: StrikingType[] = [
  {
    name: 'Répétition Minutes (Sur Demande)',
    trigger: 'Armage manuel du verrou latéral à 9h (Course ~8 mm)',
    sequence: 'Heures (Grave) → Quarts (Double coup Aigu-Grave) → Minutes (Aigu)',
    complexity: '300 à 400 composants dédiés',
    description:
      'Sonne l’heure exacte à la minute près uniquement lorsque le porteur arme le verrou latéral, qui tend le ressort du petit barillet de sonnerie.'
  },
  {
    name: 'Grande Sonnerie (Automatique au Passage)',
    trigger: 'Déclenchement automatique à chaque heure et chaque quart d’heure',
    sequence: 'À chaque quart : sonne l’heure complète + les quarts écoulés (96 séquences / 24h)',
    complexity: 'Barillet de sonnerie autonome indispensable',
    description:
      'Véritable horloge de cathédrale au poignet : elle sonne d’elle-même les heures et les quarts au passage sans intervention, tout en intégrant un bouton de répétition à la demande.'
  },
  {
    name: 'Petite Sonnerie (Automatique Économe)',
    trigger: 'Sélecteur Grande / Petite / Silence',
    sequence: 'Heures pleines aux heures ; uniquement les quarts aux quarts (sans répéter l’heure)',
    complexity: 'Économise ~40% de réserve de marche acoustique',
    description:
      'Évite de re-sonner les coups des heures lors des premier, deuxième et troisième quarts afin de préserver le barillet de sonnerie pendant la nuit.'
  },
  {
    name: 'Carillon Westminster (4 Timbres & 4 Marteaux)',
    trigger: '4 marteaux accordés sur 4 notes (Mi, Ré, Do, Sol)',
    sequence: 'Mélodie complète de Big Ben aux quarts d’heure',
    complexity: 'Sommet absolu de l’acoustique horlogère',
    description:
      'Remplace le double coup « Ding-Dong » des quarts par quatre notes mélodiques distinctes frappées sur quatre timbres cathédrale.'
  }
];

const CASE_MATERIALS = [
  {
    material: 'Or Rose 18k (5N) / Or Gris Non Rhodié',
    speedOfSound: '3 240 m/s',
    density: '15.2 g/cm³',
    timbre: 'Chaleureux, riche en harmoniques paires, rondeur exceptionnelle',
    verdict: 'Référence historique privilégiée par les maîtres sonneurs genevois et vallonniers.'
  },
  {
    material: 'Titane Grade 5 (Ti-6Al-4V)',
    speedOfSound: '6 070 m/s',
    density: '4.43 g/cm³',
    timbre: 'Puissance acoustique maximale (+4 à +6 dB), projection cristalline',
    verdict: 'Faible densité et élasticité élevée : la boîte vibre comme une table d’harmonie d’épicéa.'
  },
  {
    material: 'Platine 950 (Pt 950)',
    speedOfSound: '2 680 m/s',
    density: '21.45 g/cm³',
    timbre: 'Feutré, grave, amortissement rapide des hautes fréquences',
    verdict: 'Le plus grand défi acoustique : la masse très élevée du platine étouffe naturellement l’onde sonore.'
  }
];

const QUIZ_ITEMS = [
  {
    q: 'À 12h59, combien de coups au total une répétition minutes traditionnelle frappe-t-elle ?',
    options: [
      '24 coups',
      '32 coups (12 heures + 3×2 coups de quarts + 14 minutes)',
      '18 coups',
      '60 coups'
    ],
    answer: 1,
    explanation:
      'À 12h59, la montre frappe 12 coups graves (heures), puis 3 doubles coups aigu-grave (6 coups pour les 3 quarts = 45 min), puis 14 coups aigus (minutes 46 à 59), soit 12 + 6 + 14 = 32 coups.'
  },
  {
    q: 'Quel est le rôle de la « Surprise » fixée sous le limaçon des minutes ?',
    options: [
      'Amplifier le volume sonore des timbres',
      'Avancer brusquement d’un pas à la 60e minute pour empêcher le râteau de retomber sur le 14e pas au moment précis du changement d’heure',
      'Remonter automatiquement le barillet principal',
      'Bloquer le balancier pendant la sonnerie'
    ],
    answer: 1,
    explanation:
      'La surprise est une pièce libre qui saute instantanément à l’heure pile pour présenter un palier zéro au râteau des minutes et éviter qu’une répétition déclenchée à 01h59m59s ne sonne 1 heure et 59 minutes alors que l’heure passe à 2h00.'
  },
  {
    q: 'Pourquoi utilise-t-on un volant régulateur inertiel centrifuge plutôt qu’un échappement à ancre de sonnerie ?',
    options: [
      'Parce qu’il est moins coûteux à usiner',
      'Pour réguler la cadence des marteaux en silence absolu, sans le bourdonnement parasite d’un échappement à recul',
      'Pour augmenter la fréquence du balancier à 36 000 A/h',
      'Pour éviter de lubrifier les pivots'
    ],
    answer: 1,
    explanation:
      'Les deux masselottes du volant inertiel s’écartent par force centrifuge et freinent contre la paroi interne d’un tambour poli : la régulation de vitesse se fait par frottement doux, sans aucun cliquetis parasite.'
  }
];

export default function SonneriePage() {
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [selectedMinute, setSelectedMinute] = useState<number>(38);
  const [isChiming, setIsChiming] = useState<boolean>(false);
  const [activeHammer, setActiveHammer] = useState<'none' | 'low' | 'high'>('none');
  const [chimeStatus, setChimeStatus] = useState<string>('Prêt — Réglez l’heure ou cliquez sur le verrou d’armage à 9h');
  const [loupe10x, setLoupe10x] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const timeoutsRef = useRef<number[]>([]);

  // Calcul mécanique des pas des 3 limaçons
  const hoursCount = selectedHour; // 1..12
  const quartersCount = Math.floor(selectedMinute / 15); // 0..3
  const minutesRemainder = selectedMinute % 15; // 0..14
  const totalStrikes = hoursCount + quartersCount * 2 + minutesRemainder;

  const clearScheduledChimes = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const playTone = (ctx: AudioContext, freq: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const harm = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    harm.type = 'triangle';
    harm.frequency.setValueAtTime(freq * 2.756, startTime); // Partiel inharmonique de timbre métallique

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.24, startTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    harm.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    harm.start(startTime);
    osc.stop(startTime + duration);
    harm.stop(startTime + duration);
  };

  const triggerMinuteRepeater = () => {
    clearScheduledChimes();
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();

    setIsChiming(true);
    let offsetMs = 150;

    // 1. Frappe des Heures (Timbre Grave 440 Hz)
    for (let i = 1; i <= hoursCount; i++) {
      const t = offsetMs;
      const id = window.setTimeout(() => {
        setActiveHammer('low');
        setChimeStatus(`Palpage Limaçon des Heures : Coup Grave ${i} / ${hoursCount} (440 Hz)`);
        playTone(ctx, 440, ctx.currentTime, 0.42);
        window.setTimeout(() => setActiveHammer('none'), 180);
      }, t);
      timeoutsRef.current.push(id);
      offsetMs += 430;
    }

    offsetMs += 260;

    // 2. Frappe des Quarts (Double coup : Aigu 660 Hz puis Grave 440 Hz)
    for (let q = 1; q <= quartersCount; q++) {
      const tHigh = offsetMs;
      const idHigh = window.setTimeout(() => {
        setActiveHammer('high');
        setChimeStatus(`Palpage Limaçon des Quarts : Quart ${q} / ${quartersCount} — Ding Aigu (660 Hz)`);
        playTone(ctx, 660, ctx.currentTime, 0.34);
        window.setTimeout(() => setActiveHammer('none'), 140);
      }, tHigh);
      timeoutsRef.current.push(idHigh);
      offsetMs += 230;

      const tLow = offsetMs;
      const idLow = window.setTimeout(() => {
        setActiveHammer('low');
        setChimeStatus(`Palpage Limaçon des Quarts : Quart ${q} / ${quartersCount} — Dong Grave (440 Hz)`);
        playTone(ctx, 440, ctx.currentTime, 0.38);
        window.setTimeout(() => setActiveHammer('none'), 150);
      }, tLow);
      timeoutsRef.current.push(idLow);
      offsetMs += 410;
    }

    if (quartersCount > 0 && minutesRemainder > 0) {
      offsetMs += 240;
    }

    // 3. Frappe des Minutes au-delà du dernier quart (Timbre Aigu 660 Hz)
    for (let m = 1; m <= minutesRemainder; m++) {
      const tMin = offsetMs;
      const idMin = window.setTimeout(() => {
        setActiveHammer('high');
        setChimeStatus(`Palpage Limaçon des Minutes : Minute ${m} / ${minutesRemainder} (660 Hz)`);
        playTone(ctx, 660, ctx.currentTime, 0.35);
        window.setTimeout(() => setActiveHammer('none'), 140);
      }, tMin);
      timeoutsRef.current.push(idMin);
      offsetMs += 340;
    }

    const endId = window.setTimeout(() => {
      setIsChiming(false);
      setActiveHammer('none');
      setChimeStatus(
        `Séquence terminée (${String(selectedHour).padStart(2, '0')}h${String(selectedMinute).padStart(2, '0')}) : ${hoursCount} H + ${quartersCount} Q + ${minutesRemainder} Min = ${totalStrikes} coups.`
      );
    }, offsetMs + 200);
    timeoutsRef.current.push(endId);
  };

  const stopChiming = () => {
    clearScheduledChimes();
    setIsChiming(false);
    setActiveHammer('none');
    setChimeStatus('Sonnerie interrompue — Râteaux revenus au repos');
  };

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
            <span className="font-bold text-amber-600 dark:text-amber-400">Répétition Minutes &amp; Sonneries</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            <Volume2 className="w-3.5 h-3.5" />
            Mécanique Acoustique &amp; Limaçons
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* HERO ÉDITORIAL CONFORME /THEORIE */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Music className="w-3.5 h-3.5" />
            Haute Complication Acoustique • Cames en Limaçon &amp; Timbres Cathédrale
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Répétition Minutes &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Mécanique Acoustique des Limaçons
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Inventée à la fin du XVIIe siècle pour lire l’heure dans l’obscurité, la répétition minutes convertit la position angulaire des aiguilles en une partition acoustique.
            Trois râteaux dentés palpent trois cames en colimaçon (heures, quarts, minutes) sous le contrôle d’un volant régulateur centrifuge silencieux.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-left font-mono">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Limaçon des Heures</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12 Pas</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400">Timbre Grave (440 Hz)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Limaçon des Quarts</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4 Pas (0–3)</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400">Double coup Aigu-Grave</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Limaçon des Minutes</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4 × 14 Pas</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400">Timbre Aigu (660 Hz)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs text-slate-500">Séquence Max (12h59)</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">32 Coups</div>
              <div className="text-[11px] text-rose-600 dark:text-rose-400">12H + 3×2Q + 14M</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIMULATEUR CINÉMATIQUE & ACOUSTIQUE SVG : 3 LIMAÇONS, RÂTEAUX & MARTEAUX */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Volume2 className="w-4 h-4" />
                <span>Simulateur Cinématique &amp; Acoustique SVG • Loupe 10x</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Palpage des 3 Limaçons, Râteaux, Volant Silencieux &amp; Timbres Cathédrale
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { h: 1, m: 0, label: '01:00 (1 coup)' },
                { h: 4, m: 15, label: '04:15 (6 coups)' },
                { h: 7, m: 38, label: '07:38 (19 coups)' },
                { h: 12, m: 59, label: '12:59 (32 coups Max)' }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    stopChiming();
                    setSelectedHour(preset.h);
                    setSelectedMinute(preset.m);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedHour === preset.h && selectedMinute === preset.m
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
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

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CANVAS SVG PRINCIPAL */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
                <span>CAMES EN LIMAÇON (HEURES, QUARTS, MINUTES + SURPRISE)</span>
                <span className="text-amber-400 font-bold">{chimeStatus}</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                <svg
                  viewBox="0 0 740 390"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                    transformOrigin: '240px 195px'
                  }}
                >
                  {/* 2 TIMBRES CATHÉDRALE ENROULÉS EN PÉRIPHÉRIE DU MOUVEMENT */}
                  <circle
                    cx="370"
                    cy="195"
                    r="176"
                    fill="none"
                    stroke={activeHammer === 'low' ? '#fbbf24' : '#475569'}
                    strokeWidth={activeHammer === 'low' ? '4.5' : '2.5'}
                  />
                  <circle
                    cx="370"
                    cy="195"
                    r="167"
                    fill="none"
                    stroke={activeHammer === 'high' ? '#38bdf8' : '#334155'}
                    strokeWidth={activeHammer === 'high' ? '4.5' : '2'}
                  />
                  <text x="370" y="34" fill="#94a3b8" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    TIMBRES CATHÉDRALE EN ACIER TREMPÉ (EXT. GRAVE 440 HZ • INT. AIGU 660 HZ)
                  </text>

                  {/* ======================================================= */}
                  {/* 1. LIMAÇON DES HEURES (12 PAS) — GAUCHE                 */}
                  {/* ======================================================= */}
                  <g transform="translate(155, 195)">
                    <circle cx="0" cy="0" r="82" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                    {/* Étoile à 12 dents sous le limaçon des heures */}
                    <circle cx="0" cy="0" r="68" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    {/* Came en colimaçon 12 pas (rayon décroissant avec l'heure) */}
                    <path
                      d="M 0 -64 C 42 -62, 60 -28, 56 12 C 52 44, 18 54, -12 46 C -36 38, -44 10, -34 -18 C -26 -34, -8 -36, 0 -36 Z"
                      fill="#b45309"
                      stroke="#fde68a"
                      strokeWidth="2"
                      transform={`rotate(${selectedHour * 30})`}
                    />
                    <circle cx="0" cy="0" r="14" fill="#090d16" stroke="#fbbf24" strokeWidth="2" />

                    {/* Râteau Palpeur des Heures */}
                    <path
                      d={`M -65 -95 L -18 -58 L ${-10 + (12 - hoursCount) * 2.2} -24`}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx={-10 + (12 - hoursCount) * 2.2}
                      cy="-24"
                      r="5.5"
                      fill="#f43f5e"
                      stroke="#fecdd3"
                      strokeWidth="1.5"
                    />

                    <text x="0" y="102" fill="#fbbf24" fontSize="10.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Limaçon Heures (12 pas)
                    </text>
                    <text x="0" y="116" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                      Pas actif : {hoursCount} coup(s) grave(s)
                    </text>
                  </g>

                  {/* ======================================================= */}
                  {/* 2. LIMAÇON DES QUARTS (4 PAS) + MINUTES (4x14 PAS)      */}
                  {/* ======================================================= */}
                  <g transform="translate(355, 195)">
                    <circle cx="0" cy="0" r="88" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Limaçon des Minutes à 4 ailes de 14 pas */}
                    <g transform={`rotate(${selectedMinute * 6})`}>
                      <path
                        d="M 0 -76 L 18 -46 L 76 0 L 46 18 L 0 76 L -18 46 L -76 0 L -46 -18 Z"
                        fill="#0284c7"
                        stroke="#bae6fd"
                        strokeWidth="2"
                      />
                      {/* Pièce de Surprise sous le limaçon */}
                      <circle cx="0" cy="0" r="46" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="5 3" />
                    </g>

                    {/* Limaçon des Quarts (4 paliers : 0, 1, 2, 3 quarts) */}
                    <circle cx="0" cy="0" r="32" fill="#059669" stroke="#a7f3d0" strokeWidth="2" />
                    <circle cx="0" cy="0" r="10" fill="#090d16" stroke="#e2e8f0" strokeWidth="2" />

                    {/* Râteau des Quarts (Vert Émeraude) */}
                    <path
                      d={`M -58 -105 L -15 -42 L 0 ${-32 + quartersCount * 5}`}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    {/* Râteau des Minutes (Bleu Ciel) */}
                    <path
                      d={`M 62 -105 L 28 -55 L ${38 - minutesRemainder * 1.4} -18`}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />

                    <text x="0" y="106" fill="#38bdf8" fontSize="10.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Limaçons Quarts (4) &amp; Minutes (14)
                    </text>
                    <text x="0" y="120" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                      {quartersCount} quart(s) ({quartersCount * 2} coups) + {minutesRemainder} min
                    </text>
                  </g>

                  {/* ======================================================= */}
                  {/* 3. VOLANT INERTIEL SILENCIEUX & 2 MARTEAUX — DROITE     */}
                  {/* ======================================================= */}
                  <g transform="translate(565, 135)">
                    <circle cx="0" cy="0" r="46" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />
                    <g transform={isChiming ? 'rotate(45)' : 'rotate(0)'}>
                      {/* 2 Masselottes centrifuges de régulation */}
                      <path
                        d="M -28 -12 C -34 10, -18 28, 0 24"
                        fill="none"
                        stroke="#fde047"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 28 12 C 34 -10, 18 -28, 0 -24"
                        fill="none"
                        stroke="#fde047"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle cx="0" cy="0" r="9" fill="#f59e0b" />
                    </g>
                    <text x="0" y="-56" fill="#fde047" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Volant Centrifuge Silencieux
                    </text>
                  </g>

                  {/* 2 MARTEAUX EN ACIER POLI NOIR SUR TIMBRES CATHÉDRALE */}
                  <g transform="translate(565, 255)">
                    {/* Marteau Grave (440 Hz) */}
                    <g transform={activeHammer === 'low' ? 'translate(-42, 0) rotate(-18)' : 'translate(-42, 0) rotate(0)'}>
                      <rect x="-14" y="-32" width="28" height="16" rx="3" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />
                      <line x1="0" y1="-16" x2="0" y2="22" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="0" cy="22" r="8" fill="#475569" stroke="#e2e8f0" strokeWidth="2" />
                    </g>
                    {/* Marteau Aigu (660 Hz) */}
                    <g transform={activeHammer === 'high' ? 'translate(42, 0) rotate(18)' : 'translate(42, 0) rotate(0)'}>
                      <rect x="-14" y="-32" width="28" height="16" rx="3" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
                      <line x1="0" y1="-16" x2="0" y2="22" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="0" cy="22" r="8" fill="#475569" stroke="#e2e8f0" strokeWidth="2" />
                    </g>

                    <text x="-42" y="42" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Marteau Grave (440 Hz)
                    </text>
                    <text x="42" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Marteau Aigu (660 Hz)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* PANNEAU DE CONTRÔLE HORAIRE & PARTITION ACOUSTIQUE */}
            <div className="lg:col-span-4 space-y-5">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                  Réglage de l’Heure à Palper
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-500">Heures (1 à 12)</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{selectedHour} h</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={selectedHour}
                      onChange={(e) => {
                        stopChiming();
                        setSelectedHour(Number(e.target.value));
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-500">Minutes (00 à 59)</span>
                      <span className="font-bold text-sky-600 dark:text-sky-400">
                        {String(selectedMinute).padStart(2, '0')} min
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={59}
                      value={selectedMinute}
                      onChange={(e) => {
                        stopChiming();
                        setSelectedMinute(Number(e.target.value));
                      }}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Décomposition mathématique des coups */}
                <div className="grid grid-cols-3 gap-2 pt-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="text-[10px] text-amber-700 dark:text-amber-300">HEURES</div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{hoursCount}</div>
                    <div className="text-[10px] text-slate-500">Bong (440Hz)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-300">QUARTS</div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{quartersCount}</div>
                    <div className="text-[10px] text-slate-500">{quartersCount * 2} coups</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30">
                    <div className="text-[10px] text-sky-700 dark:text-sky-300">MINUTES</div>
                    <div className="text-lg font-bold text-sky-600 dark:text-sky-400">{minutesRemainder}</div>
                    <div className="text-[10px] text-slate-500">Bing (660Hz)</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={triggerMinuteRepeater}
                    disabled={isChiming}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    <span>Armer le Verrou ({totalStrikes} coups)</span>
                  </button>
                  {isChiming && (
                    <button
                      onClick={stopChiming}
                      className="px-3.5 py-3.5 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center justify-center"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dispositif du « Tout-ou-Rien »</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Si le porteur n’arme pas le verrou de sonnerie jusqu’en fin de course, le ressort du « tout-ou-rien » bloque le déclenchement des râteaux afin d’éviter une sonnerie incomplète et fausse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LES 4 GRANDES FAMILLES DE SONNERIES HORLOGÈRES */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Typologie des Montres à Sonnerie
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Répétition Minutes, Grande Sonnerie &amp; Carillon Westminster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRIKING_TYPES.map((st) => (
              <div
                key={st.name}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{st.name}</h3>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    {st.complexity}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  <strong>Déclenchement :</strong> {st.trigger}
                </div>
                <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                  <strong>Séquence :</strong> {st.sequence}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACOUSTIQUE DES MATÉRIAUX DE BOÎTE */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Physique Vibratoire &amp; Lutherie Horlogère
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Influence de l’Alliage de la Boîte sur la Propagation Acoustique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_MATERIALS.map((mat) => (
              <div
                key={mat.material}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">{mat.material}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Célérité sonore</div>
                    <div className="font-bold text-amber-600 dark:text-amber-400">{mat.speedOfSound}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Masse volumique</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{mat.density}</div>
                  </div>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{mat.timbre}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mat.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUIZ TECHNIQUE */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              Auto-Évaluation : Mécanique des Répétitions Minutes
            </h2>
          </div>

          <div className="space-y-6">
            {QUIZ_ITEMS.map((item, qIdx) => {
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
