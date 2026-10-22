// src/app/theorie/complications/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Compass,
  Info,
  Calendar,
  Layers,
  Activity,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Disc
} from 'lucide-react';

export default function ComplicationsPage() {
  const [activeTab, setActiveTab] = useState<'tourbillon' | 'repetition' | 'quantieme' | 'chronographe'>('tourbillon');

  // --- TOURBILLON STATE ---
  const [tourbillonSpeed, setTourbillonSpeed] = useState<number>(1); // 1 = 60s/tour, 2 = 15s/tour
  const [isTourbillonRunning, setIsTourbillonRunning] = useState<boolean>(true);
  const [gravityPosition, setGravityPosition] = useState<'vertical' | 'horizontal'>('vertical');

  // --- RÉPÉTITION MINUTES STATE & AUDIO SYNTHESIS ---
  const [selectedHour, setSelectedHour] = useState<number>(10);
  const [selectedMinute, setSelectedMinute] = useState<number>(47);
  const [isChiming, setIsChiming] = useState<boolean>(false);
  const [chimeProgressText, setChimeProgressText] = useState<string>('En attente d’armage du verrou...');
  const [activeHammer, setActiveHammer] = useState<'none' | 'low' | 'high' | 'both'>('none');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialisation Web Audio
  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Son de timbre horloger authentique (synthétiseur harmonique)
  const playGongNote = (freq: number, duration: number = 1.2) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    // Fréquence fondamentale et partiel harmonique métallique
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

  // Séquenceur de sonnerie de la Répétition Minutes
  const handlePlayChime = async () => {
    if (isChiming) return;
    setIsChiming(true);

    const h = selectedHour % 12 || 12;
    const quarters = Math.floor(selectedMinute / 15);
    const minutes = selectedMinute % 15;

    // 1. Sonnerie des Heures (Timbre grave ~ 440 Hz)
    for (let i = 1; i <= h; i++) {
      setChimeProgressText(`Heures : coup ${i} sur ${h} (Timbre grave)`);
      setActiveHammer('low');
      playGongNote(440, 0.9);
      await new Promise((r) => setTimeout(r, 700));
      setActiveHammer('none');
      await new Promise((r) => setTimeout(r, 150));
    }

    await new Promise((r) => setTimeout(r, 400));

    // 2. Sonnerie des Quarts (Double coup : Aigu + Grave ~ 660 Hz puis 440 Hz)
    for (let q = 1; q <= quarters; q++) {
      setChimeProgressText(`Quarts d’heure : quart ${q} sur ${quarters} (Double timbre)`);
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

    // 3. Sonnerie des Minutes restantes (Timbre aigu ~ 660 Hz)
    for (let m = 1; m <= minutes; m++) {
      setChimeProgressText(`Minutes : coup ${m} sur ${minutes} (Timbre aigu)`);
      setActiveHammer('high');
      playGongNote(660, 0.7);
      await new Promise((r) => setTimeout(r, 550));
      setActiveHammer('none');
      await new Promise((r) => setTimeout(r, 120));
    }

    setChimeProgressText(`Sonnerie terminée avec succès : ${h}h ${selectedMinute}min`);
    setIsChiming(false);
  };

  // --- QUANTIÈME PERPÉTUEL STATE ---
  const [qpMonthIndex, setQpMonthIndex] = useState<number>(1); // 1 = Février
  const [qpDay, setQpDay] = useState<number>(28);
  const [isLeapYear, setIsLeapYear] = useState<boolean>(false);
  const [qpAnimationNotice, setQpAnimationNotice] = useState<string>('Prêt pour la bascule de minuit');

  const handleSimulateMidnight = () => {
    // Si on est en février
    if (qpMonthIndex === 1) {
      if (qpDay === 28) {
        if (isLeapYear) {
          setQpDay(29);
          setQpAnimationNotice('Année Bissextile : La came des 48 mois autorise le 29 Février !');
        } else {
          setQpDay(1);
          setQpMonthIndex(2); // Mars
          setQpAnimationNotice('Année Ordinaire : Saut instantané de 28 Février à 1er Mars !');
        }
      } else if (qpDay === 29) {
        setQpDay(1);
        setQpMonthIndex(2); // Mars
        setQpAnimationNotice('Bascule du 29 Février au 1er Mars.');
      }
    } else {
      // Mois normal
      const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][qpMonthIndex];
      if (qpDay >= maxDays) {
        setQpDay(1);
        setQpMonthIndex((prev) => (prev + 1) % 12);
        setQpAnimationNotice('Passage automatique au 1er du mois suivant.');
      } else {
        setQpDay((d) => d + 1);
        setQpAnimationNotice('Avancement normal d’une journée.');
      }
    }
  };

  // --- CHRONOGRAPHE STATE ---
  const [chronoState, setChronoState] = useState<'stopped' | 'running' | 'reset'>('stopped');
  const [chronoTime, setChronoTime] = useState<number>(0);
  const [clutchType, setClutchType] = useState<'horizontal' | 'vertical'>('horizontal');

  useEffect(() => {
    let interval: any = null;
    if (chronoState === 'running') {
      interval = setInterval(() => {
        setChronoTime((t) => t + 100);
      }, 100);
    }
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
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Le Musée Interactif des Grandes Complications
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Explorez le génie mécanique des 4 reines de l’art horloger : le Tourbillon gravitationnel de Breguet, la Répétition Minutes sonore, le Quantième Perpétuel à came de 48 mois et le Chronographe à roue à colonnes.
            </p>
          </div>

          {/* Navigation par Complications */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            {[
              { id: 'tourbillon', label: '1. Le Tourbillon', subtitle: 'Compensation Gravitationnelle' },
              { id: 'repetition', label: '2. Répétition Minutes', subtitle: 'Synthétiseur Acoustique' },
              { id: 'quantieme', label: '3. Quantième Perpétuel', subtitle: 'Mécanisme des 48 Mois' },
              { id: 'chronographe', label: '4. Le Chronographe', subtitle: 'Roue à Colonnes vs Navette' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
        </div>
      </section>

      {/* --- CORPS PRINCIPAL DE LA COMPLICATION ACTIVE --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ========================================================================= */}
        {/* COMPLICATION 1 : LE TOURBILLON (BREGUET 1801) */}
        {/* ========================================================================= */}
        {activeTab === 'tourbillon' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Simulateur Visuel de la Cage du Tourbillon */}
              <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Cage en Rotation • 1 Tour / 60 s
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTourbillonRunning(!isTourbillonRunning)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-1.5"
                    >
                      {isTourbillonRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isTourbillonRunning ? 'Pause' : 'Activer'}</span>
                    </button>
                    <button
                      onClick={() => setTourbillonSpeed((s) => (s === 1 ? 4 : 1))}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold"
                    >
                      Vitesse : {tourbillonSpeed === 1 ? '1x (Temps Réel)' : '4x (Démonstration)'}
                    </button>
                  </div>
                </div>

                {/* Animation SVG du Tourbillon avec balancier et ancre embarqués */}
                <div className="relative py-12 flex items-center justify-center">
                  {/* Vecteur de gravité terrestre */}
                  <div className="absolute top-2 left-4 text-left text-[11px] font-mono text-slate-400 space-y-1">
                    <div>Orientation de la montre :</div>
                    <button
                      onClick={() => setGravityPosition((p) => (p === 'vertical' ? 'horizontal' : 'vertical'))}
                      className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
                    >
                      {gravityPosition === 'vertical' ? 'Position Verticale (Effet Gravité Max)' : 'Position Horizontale (Cadran Plat)'}
                    </button>
                  </div>

                  <svg
                    viewBox="0 0 400 400"
                    className="w-72 sm:w-96 h-72 sm:h-96 drop-shadow-2xl overflow-visible select-none"
                  >
                    {/* Bâti fixe extérieur avec denture fixe */}
                    <circle cx="200" cy="200" r="160" fill="none" stroke="#d4af37" strokeWidth="4" opacity="0.3" />
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#a16207" strokeWidth="6" strokeDasharray="6 3" />

                    {/* Cage mobile du Tourbillon (tourne à 1 tour / 60s) */}
                    <g
                      className={isTourbillonRunning ? 'animate-spin' : ''}
                      style={{
                        animationDuration: `${60 / tourbillonSpeed}s`,
                        transformOrigin: '200px 200px'
                      }}
                    >
                      {/* Pont de cage en titane/acier poli à 3 bras */}
                      <circle cx="200" cy="200" r="120" fill="rgba(212, 175, 55, 0.05)" stroke="#d4af37" strokeWidth="3" />
                      <line x1="200" y1="80" x2="200" y2="320" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                      <line x1="96" y1="140" x2="304" y2="260" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                      <line x1="96" y1="260" x2="304" y2="140" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

                      {/* Balancier Glucydur embarqué dans la cage (oscille) */}
                      <g
                        className={isTourbillonRunning ? 'animate-pulse' : ''}
                        style={{ transformOrigin: '200px 200px' }}
                      >
                        <circle cx="200" cy="200" r="85" fill="none" stroke="#f59e0b" strokeWidth="6" />
                        {/* Masselottes de réglage en or sur la serge */}
                        <circle cx="200" cy="115" r="4" fill="#fbbf24" />
                        <circle cx="200" cy="285" r="4" fill="#fbbf24" />
                        <circle cx="115" cy="200" r="4" fill="#fbbf24" />
                        <circle cx="285" cy="200" r="4" fill="#fbbf24" />

                        {/* Spiral horloger bleui */}
                        <circle cx="200" cy="200" r="45" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                        <circle cx="200" cy="200" r="25" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 1" />
                      </g>

                      {/* Échappement embarqué satellite */}
                      <circle cx="250" cy="160" r="18" fill="#e2e8f0" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx="250" cy="160" r="3" fill="#e11d48" />

                      {/* Rubis de centre contre-pivot Incabloc */}
                      <circle cx="200" cy="200" r="9" fill="#e11d48" stroke="#d4af37" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
                  💡 <strong>Principe cinématique :</strong> En faisant pivoter l’organe régulateur à 360° en permanence, les défauts d’équilibrage dus à l’attraction terrestre s’annulent mutuellement toutes les minutes.
                </div>
              </div>

              {/* Fiche Technique & Histoire du Tourbillon */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                    Brevet n° 252 déposé le 7 Messidor an IX (1801)
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Abraham-Louis Breguet & le Défi de la Gravité
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dans une montre de poche portée verticalement dans le gousset, le centre de gravité du spiral n’est jamais parfaitement confondu avec l’axe du balancier. Il en résultait un retard en bas et une avance en haut.
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white">Poids moyen de la cage :</div>
                      <div className="text-slate-600 dark:text-slate-400">Moins de 0.30 gramme pour plus de 70 composants microscopiques en titane et or.</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white">Tourbillon Volant (Alfred Helwig, 1920) :</div>
                      <div className="text-slate-600 dark:text-slate-400">Suppression du pont supérieur pour admirer la cage suspendue comme par magie dans le vide.</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white">Gyrotourbillon Multi-Axes :</div>
                      <div className="text-slate-600 dark:text-slate-400">Rotation simultanée sur 2 ou 3 axes spatiaux pour compenser la gravité dans toutes les positions au poignet.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPLICATION 2 : LA RÉPÉTITION MINUTES & SYNTHÉTISEUR ACOUSTIQUE */}
        {/* ========================================================================= */}
        {activeTab === 'repetition' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Le Pupitre Acoustique & Déclencheur Sonore */}
              <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-amber-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Atelier Acoustique de Haute Horlogerie
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Synthèse Audio Réelle
                  </span>
                </div>

                {/* Sélecteur d'Heure à Jouer */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Régler l'heure à faire sonner par les marteaux :
                  </div>

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

                  {/* Bouton Armage du Verrou */}
                  <button
                    onClick={handlePlayChime}
                    disabled={isChiming}
                    className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>{isChiming ? 'Sonnerie en cours...' : 'Tirer le Verrou d’Armage (Écouter la Sonnerie)'}</span>
                  </button>
                </div>

                {/* Visualisation Visuelle des Deux Marteaux & Timbres Cathédrale */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white border-2 border-slate-800 text-center space-y-4">
                  <div className="text-xs font-mono text-amber-400 font-bold min-h-[20px]">
                    {chimeProgressText}
                  </div>

                  <div className="flex items-center justify-center gap-12 py-4">
                    {/* Marteau Grave (Heures) */}
                    <div className="text-center space-y-2">
                      <div
                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-xs transition-all ${
                          activeHammer === 'low'
                            ? 'bg-amber-500 border-amber-300 text-slate-950 scale-125 shadow-lg shadow-amber-500/50'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        BONG
                      </div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">Marteau Grave (440 Hz)</div>
                    </div>

                    {/* Marteau Aigu (Minutes) */}
                    <div className="text-center space-y-2">
                      <div
                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-xs transition-all ${
                          activeHammer === 'high'
                            ? 'bg-sky-400 border-sky-200 text-slate-950 scale-125 shadow-lg shadow-sky-400/50'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        BING
                      </div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">Marteau Aigu (660 Hz)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explication Mécanique de la Répétition */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                    Anatomie de la Musique Mécanique
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Comment une Montre Déchiffre l’Heure à l’Oreille
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                      Inventée avant l’électricité pour connaître l’heure dans l’obscurité totale de la nuit, la répétition minutes est considérée comme la complication la plus exigeante à assembler et accorder.
                    </p>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">1. Le Verrou d’Armage :</div>
                      <div>Glissière sur la carrure qui arme un barillet secondaire indépendant dédié exclusivement aux marteaux.</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">2. Les Râteaux & Limaçons :</div>
                      <div>Des crémaillères viennent palper les marches de cames en colimaçon (12 marches pour les heures, 4 pour les quarts, 14 pour les minutes) afin de compter exactement le nombre de coups à frapper.</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">3. Le Volant d’Inertie Silencieux :</div>
                      <div>Un régulateur centrifuge à friction d’air tourne à haute vitesse pour cadencer régulièrement l’espacement des coups sans émettre aucun cliquetis mécanique parasite.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPLICATION 3 : LE QUANTIÈME PERPÉTUEL (QP) */}
        {/* ========================================================================= */}
        {activeTab === 'quantieme' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Simulateur de Calendrier Perpétuel */}
              <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Came des 48 Mois & Cycle Bissextile
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLeapYear(!isLeapYear)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isLeapYear
                          ? 'bg-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isLeapYear ? 'Année Bissextile (Février 29j)' : 'Année Ordinaire (Février 28j)'}
                    </button>
                  </div>
                </div>

                {/* Cadran d'Affichage QP */}
                <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#0f1422] text-white border-2 border-amber-500/40 text-center space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Jour du Mois</div>
                      <div className="text-4xl font-mono font-extrabold text-amber-400 mt-1">{qpDay}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Mois</div>
                      <div className="text-lg font-bold text-white mt-2">
                        {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][qpMonthIndex]}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Cycle Bissextile</div>
                      <div className="text-lg font-bold text-amber-400 mt-2">
                        {isLeapYear ? 'Année 4 (Bissextile)' : 'Année 1, 2 ou 3'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 text-xs text-amber-300 font-mono">
                    {qpAnimationNotice}
                  </div>

                  <button
                    onClick={handleSimulateMidnight}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2"
                  >
                    <span>Simuler le Saut Instantané de Minuit (+1 Jour)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fiche Technique QP */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                    Mécanique de la Mémoire Temporelle
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    La Roue Mémoire des 48 Mois
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Contrairement au quantième simple ou annuel qui nécessite une correction manuelle à la fin de chaque mois de février, le <strong>Quantième Perpétuel</strong> intègre une came spéciale de 48 encoches représentant 4 années complètes consécutives.
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Profondeur des encoches :</strong> Le palpeur s’enfonce plus ou moins profondément pour savoir si le mois compte 31, 30, 28 ou 29 jours, commandant au grand levier de sauter directement au 1er.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong>Phase de Lune Astronomique :</strong> Roue d’étoile à 59 dents avec deux lunes peintes, ne déviant que d’un jour tous les 122 ans et 45 jours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPLICATION 4 : LE CHRONOGRAPHE (ROUE À COLONNES VS COULISSE) */}
        {/* ========================================================================= */}
        {activeTab === 'chronographe' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Banc d'Essai du Chronographe */}
              <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Chronométrie d’Atelier • Mesure au 1/10e de Seconde
                  </span>

                  <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <button
                      onClick={() => setClutchType('horizontal')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        clutchType === 'horizontal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Embrayage Horizontal
                    </button>
                    <button
                      onClick={() => setClutchType('vertical')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        clutchType === 'vertical' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Embrayage Vertical
                    </button>
                  </div>
                </div>

                {/* Cadran Chronographe */}
                <div className="p-8 rounded-3xl bg-slate-900 text-white border-2 border-slate-800 text-center space-y-6">
                  <div className="text-5xl sm:text-6xl font-mono font-extrabold tracking-tight text-amber-400">
                    {formatChrono(chronoTime)}
                  </div>

                  <div className="flex justify-center gap-4">
                    {chronoState !== 'running' ? (
                      <button
                        onClick={() => setChronoState('running')}
                        className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Démarrer (Poussoir 2H)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setChronoState('stopped')}
                        className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Arrêter (Stop)</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setChronoState('stopped');
                        setChronoTime(0);
                      }}
                      className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Remise à Zéro (Poussoir 4H)</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-700 dark:text-slate-300">
                  {clutchType === 'horizontal' ? (
                    <span>
                      ⚙️ <strong>Embrayage Horizontal :</strong> La roue intermédiaire bascule latéralement pour engronner la roue de chronographe. Spectaculaire à travers le fond saphir, mais engendre un micro-saut d’aiguille au départ.
                    </span>
                  ) : (
                    <span>
                      ⚡ <strong>Embrayage Vertical :</strong> Deux disques se plaquent l’un contre l’autre par friction axiale. Départ instantané ultra-précis sans aucun tremblement de l’aiguille.
                    </span>
                  )}
                </div>
              </div>

              {/* Roue à Colonnes vs Navette */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                    La Commande Mécanique
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Roue à Colonnes vs Coulisse / Navette
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">Roue à Colonnes (Haute Horlogerie) :</div>
                      <div>Tourelle en acier usiné avec piliers verticaux. Chaque pression fait tourner la roue d’un pas, offrant une sensation au poussoir d’une douceur incomparable (Rolex Daytona, Patek Philippe CH 29).</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">Navette / Coulisse (Efficacité & Robustesse) :</div>
                      <div>Plaque découpée en acier qui bascule d’avant en arrière. Plus économique et extrêmement robuste, popularisée par le célèbre calibre Valjoux 7750.</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">Fonction Flyback (Retour en Vol) :</div>
                      <div>Permet la remise à zéro et le redémarrage instantané en une seule pression, inventée pour les pilotes d’aviation de précision.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
