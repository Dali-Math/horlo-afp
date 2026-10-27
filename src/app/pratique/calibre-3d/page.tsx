// src/app/pratique/calibre-3d/page.tsx
'use client';

import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Compass,
  Layers,
  Wrench,
  Droplet,
  Gauge,
  Clock,
  Sparkles,
  Eye,
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ORGAN_DATABASE,
  OrganData,
  initCalibre3DEngine,
  Calibre3DController
} from './calibre3dEngine';

export default function Calibre3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Calibre3DController | null>(null);

  // Next-Themes Integration
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  // Simulation State
  const [selectedOrgan, setSelectedOrgan] = useState<OrganData>(ORGAN_DATABASE.barrel);
  const [currentPreset, setCurrentPreset] = useState<string>('iso');
  const [speed, setSpeed] = useState<number>(1.0);
  const [beatPhasePct, setBeatPhasePct] = useState<number>(45);
  const [explodeVal, setExplodeVal] = useState<number>(0);
  const [xrayVal, setXrayVal] = useState<number>(25);
  const [mainspringVal, setMainspringVal] = useState<number>(85);
  const [amplitude, setAmplitude] = useState<number>(291);
  const [torque, setTorque] = useState<number>(9.2);
  const [isDialShown, setIsDialShown] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [phaseTag, setPhaseTag] = useState<string>("Phase 3 : Impulsion (44°)");
  const [phaseDesc, setPhaseDesc] = useState<string>(
    "La dent club glisse sur le plan d'impulsion de la palette rubis (Moebius 9415) et relance le double plateau du balancier."
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const controller = initCalibre3DEngine(containerRef.current, {
      onOrganSelect: (organ) => {
        setSelectedOrgan(organ);
      },
      onPhaseChange: (tag, desc) => {
        setPhaseTag(tag);
        setPhaseDesc(desc);
      },
      onBeatUpdate: (pct) => {
        setBeatPhasePct(pct);
      },
      onDialSideToggle: (dial) => {
        setIsDialShown(dial);
      },
      onAmplitudeChange: (amp, tq) => {
        setAmplitude(amp);
        setTorque(tq);
      }
    });

    controllerRef.current = controller;

    return () => {
      controller.dispose();
      controllerRef.current = null;
    };
  }, []);

  // Sync 3D engine lighting with light/dark theme
  useEffect(() => {
    if (controllerRef.current && mounted) {
      controllerRef.current.setTheme?.(isDark ? 'dark' : 'light');
    }
  }, [isDark, mounted]);

  // Handlers
  const handlePreset = (preset: 'iso' | 'topBridges' | 'dial' | 'escapement' | 'balanceMacro' | 'profile') => {
    setCurrentPreset(preset);
    controllerRef.current?.setCameraPreset(preset);
    if (preset === 'dial') setIsDialShown(true);
    else if (preset === 'iso' || preset === 'topBridges' || preset === 'profile') setIsDialShown(false);
  };

  const handleOrganSelect = (organId: string) => {
    controllerRef.current?.selectOrgan(organId);
    if (ORGAN_DATABASE[organId]) {
      setSelectedOrgan(ORGAN_DATABASE[organId]);
    }
  };

  const handleFlipCalibre = () => {
    if (controllerRef.current) {
      const nextDial = controllerRef.current.flipCalibre180();
      setIsDialShown(nextDial);
    }
  };

  const handleSpeed = (s: number) => {
    setSpeed(s);
    controllerRef.current?.setSimSpeed(s);
  };

  const handleScrubBeat = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBeatPhasePct(val);
    setSpeed(0);
    controllerRef.current?.scrubBeat(val);
  };

  const handleExplode = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExplodeVal(val);
    controllerRef.current?.setExplode(val);
  };

  const handleXray = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setXrayVal(val);
    controllerRef.current?.setXray(val);
  };

  const handleMainspring = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMainspringVal(val);
    controllerRef.current?.setMainspring(val);
  };

  const handleWindStep = () => {
    controllerRef.current?.windCrownStep();
    const nextVal = Math.min(100, mainspringVal + 15);
    setMainspringVal(nextVal);
  };

  const handleAudioToggle = () => {
    if (controllerRef.current) {
      const enabled = controllerRef.current.toggleAudio();
      setAudioEnabled(enabled);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const msElapsed = Math.round((beatPhasePct / 100) * 200);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none transition-colors duration-300">
      
      {/* 1. Header Horloger & Barre de Télémétrie Cinématique */}
      <header className="border-b border-slate-200 dark:border-amber-500/20 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-sm transition-colors duration-200">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Fil d'Ariane & Titre */}
          <div className="flex items-center gap-3">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-mono transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atelier</span>
            </Link>

            <span className="w-px h-4 bg-slate-200 dark:bg-slate-800 hidden sm:inline" />

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-wide">
                  Master Calibre 3D
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30">
                  ETA 6497-1 (Unitas 16 ½&apos;&apos;&apos;)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden md:block">
                Porte-Mouvement 360° sans blocage d&apos;axe • Écorché cinématique des 7 couches • Échappement suisse
              </p>
            </div>
          </div>

          {/* Télémétrie en Direct, ThemeToggle & Actions d'Établi */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hidden sm:flex items-center gap-1.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400">Ø :</span>
              <strong className="text-slate-900 dark:text-white">36.60 mm (16 ½&apos;&apos;&apos;)</strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hidden md:flex items-center gap-1.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400">Fréquence :</span>
              <strong className="text-amber-600 dark:text-amber-400">18&apos;000 A/h (2.5 Hz)</strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hidden lg:flex items-center gap-1.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400">Levée :</span>
              <strong className="text-emerald-600 dark:text-emerald-400">44°</strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400">Amplitude :</span>
              <strong className="text-cyan-600 dark:text-cyan-400">{amplitude}°</strong>
            </div>

            <button
              onClick={handleFlipCalibre}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95"
              title="Bascule instantanée 180° entre le côté ponts perlés et le cadran"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isDialShown ? 'Vue Ponts (180°)' : 'Vue Cadran (180°)'}</span>
            </button>

            <button
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 active:scale-95 ${
                audioEnabled
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
              title="Son acoustique des micro-chocs de l'échappement suisse (5 Hz)"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>Son 5 Hz : {audioEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Sélecteur de Thème Clair / Sombre */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <ThemeToggle />
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition shadow-sm"
              title="Basculer en Plein Écran"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Espace de Travail Studio : 3D WebGL (Gauche) + Inspecteur Technique d'Atelier (Droite) */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* COLONNE GAUCHE (8 colonnes) : Viewport 3D WebGL + Curseurs de Contrôle */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* Barre des Vues et Angles de Caméra */}
          <div className="bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-sm dark:shadow-lg backdrop-blur-md transition-colors">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 px-2 flex items-center gap-1 font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Vues 3D :</span>
              </span>

              {[
                { id: 'iso', label: '1. Côté Ponts (3D)' },
                { id: 'topBridges', label: '2. Ponts à Plat (90°)' },
                { id: 'dial', label: '3. Côté Cadran & Date' },
                { id: 'escapement', label: '4. Macro Échappement' },
                { id: 'balanceMacro', label: '5. Macro Balancier & Coq' },
                { id: 'profile', label: '6. Profil Éclaté Z' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handlePreset(btn.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                    currentPreset === btn.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/70 dark:hover:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENEUR DU CANVAS THREE.JS (Full 3D) */}
          <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl border border-slate-300 dark:border-amber-500/25 bg-gradient-to-b from-[#EAEFF5] via-[#DEE5EE] to-[#D2DCE8] dark:from-[#090D15] dark:via-[#070A10] dark:to-[#040609] overflow-hidden shadow-md dark:shadow-2xl select-none transition-colors duration-300">
            
            {/* Overlay Titre Organe Actif (Haut Gauche) */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1.5">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center gap-2 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="text-slate-900 dark:text-white font-semibold">Organe sélectionné : {selectedOrgan.title}</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/85 dark:bg-slate-950/75 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 text-[11px] font-mono text-slate-600 dark:text-slate-400 shadow-sm">
                Glisser Gauche : 360° Libre • Glisser Droit / Maj : Déplacer • Molette : Zoom • Double-clic : Recentre
              </div>
            </div>

            {/* Overlay Télémétrie Échappement + Gimbal Pad Virtuel (Haut Droite) */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
              <div className="pointer-events-none px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-[11px] font-mono text-amber-800 dark:text-amber-200 shadow-md flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Phase Active :</span>
                <strong className="text-amber-600 dark:text-amber-400">{phaseTag}</strong>
              </div>

              {/* Pad de rotation 360° au clic rapide */}
              <div className="pointer-events-auto bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 flex items-center gap-1 shadow-md text-xs font-mono">
                <button
                  onClick={() => controllerRef.current?.nudgeTrackball(0, 0.35)}
                  title="Tourner à Gauche"
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-black dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center transition"
                >
                  ↺
                </button>
                <button
                  onClick={() => controllerRef.current?.nudgeTrackball(-0.35, 0)}
                  title="Basculer vers le Haut"
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-black dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center transition"
                >
                  ▲
                </button>
                <button
                  onClick={() => controllerRef.current?.nudgeTrackball(0.35, 0)}
                  title="Basculer vers le Bas"
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-black dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center transition"
                >
                  ▼
                </button>
                <button
                  onClick={() => controllerRef.current?.nudgeTrackball(0, -0.35)}
                  title="Tourner à Droite"
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-black dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center justify-center transition"
                >
                  ↻
                </button>
                <button
                  onClick={handleFlipCalibre}
                  title="Retourner à 180° (Ponts ↔ Cadran)"
                  className="px-2 h-7 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-800 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1 transition font-semibold"
                >
                  <span>180°</span>
                </button>
              </div>
            </div>

            {/* THREE.JS RENDER TARGET CANVAS */}
            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            />

            {/* Barre de sélection d'organe rapide (Bas du Viewport) */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap justify-between items-center gap-2 pointer-events-none">
              <button
                onClick={() => handlePreset('escapement')}
                className="pointer-events-auto px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs font-mono font-semibold transition flex items-center gap-2 shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Plonger sur l&apos;Échappement &amp; l&apos;Ancre</span>
              </button>

              <div className="pointer-events-auto flex flex-wrap justify-end gap-1">
                {[
                  { id: 'barrel', label: '01. Barillet (Z=84)' },
                  { id: 'centerWheel', label: '02. Centre (Z=64)' },
                  { id: 'thirdWheel', label: '03. Moyenne (Z=60)' },
                  { id: 'fourthWheel', label: '04. Seconde 9h' },
                  { id: 'escapeWheel', label: '05. Échappement' },
                  { id: 'palletFork', label: '06. Ancre Suisse' },
                  { id: 'balance', label: '07. Balancier 2.5Hz' },
                  { id: 'winding', label: '08. Remontoir 3h' },
                  { id: 'dial', label: '09. Cadran & Date' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => handleOrganSelect(chip.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition border ${
                      selectedOrgan.id === chip.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                        : 'bg-white/90 hover:bg-amber-500 hover:text-slate-950 dark:bg-slate-950/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 backdrop-blur-sm'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* DOCK DES 4 CURSEURS CINÉMATIQUES (Style Ciechanowski) */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm dark:shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors">

            {/* CURSEUR 1 : TEMPS / ALTERNANCE DE L'ÉCHAPPEMENT (0 à 100%) */}
            <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>1. Curseur Temporel d&apos;Alternance (200 ms)</span>
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {speed === 0 ? `${beatPhasePct.toFixed(0)}% (${msElapsed} / 200 ms)` : `Cycle (${speed}×) • ${msElapsed} ms`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={beatPhasePct}
                onChange={handleScrubBeat}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex items-center justify-between gap-1 pt-1 font-mono text-[11px]">
                <button
                  onClick={() => handleSpeed(1.0)}
                  className={`flex-1 py-1 rounded font-bold transition ${speed === 1.0 ? 'bg-amber-500 text-slate-950' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  1× Réel
                </button>
                <button
                  onClick={() => handleSpeed(0.12)}
                  className={`flex-1 py-1 rounded font-bold transition ${speed === 0.12 ? 'bg-amber-500 text-slate-950' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  0.1× Ralenti
                </button>
                <button
                  onClick={() => handleSpeed(0.025)}
                  className={`flex-1 py-1 rounded font-bold transition ${speed === 0.025 ? 'bg-amber-500 text-slate-950' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Micro-Pas
                </button>
                <button
                  onClick={() => handleSpeed(0)}
                  className={`flex-1 py-1 rounded font-bold transition ${speed === 0 ? 'bg-amber-500 text-slate-950' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Pause
                </button>
              </div>
            </div>

            {/* CURSEUR 2 : VUE ÉCLATÉE VERTICALE Z */}
            <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>2. Vue Éclatée Verticale Z (7 Couches)</span>
                </span>
                <span className="text-slate-900 dark:text-white font-bold">{explodeVal} % {explodeVal === 0 ? '(Assemblé)' : '(Écorché Z)'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={explodeVal}
                onChange={handleExplode}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex items-center justify-between gap-1 pt-1 font-mono text-[11px]">
                <button
                  onClick={() => { setExplodeVal(0); controllerRef.current?.setExplode(0); }}
                  className={`flex-1 py-1 rounded transition border ${explodeVal === 0 ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Assemblé (0%)
                </button>
                <button
                  onClick={() => { setExplodeVal(50); controllerRef.current?.setExplode(50); }}
                  className={`flex-1 py-1 rounded transition border ${explodeVal === 50 ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Écart 50%
                </button>
                <button
                  onClick={() => { setExplodeVal(100); controllerRef.current?.setExplode(100); }}
                  className={`flex-1 py-1 rounded transition border ${explodeVal === 100 ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Éclaté Max (100%)
                </button>
              </div>
            </div>

            {/* CURSEUR 3 : TRANSPARENCE RAYON-X DES PONTS */}
            <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>3. Transparence Rayon-X des Ponts</span>
                </span>
                <span className="text-slate-900 dark:text-white font-bold">{xrayVal} %</span>
              </div>
              <input
                type="range"
                min="0"
                max="94"
                value={xrayVal}
                onChange={handleXray}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex items-center justify-between gap-1 pt-1 font-mono text-[11px]">
                <button
                  onClick={() => { setXrayVal(0); controllerRef.current?.setXray(0); }}
                  className={`flex-1 py-1 rounded transition border ${xrayVal === 0 ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Opaques (0%)
                </button>
                <button
                  onClick={() => { setXrayVal(45); controllerRef.current?.setXray(45); }}
                  className={`flex-1 py-1 rounded transition border ${xrayVal === 45 ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Semi-Transparent
                </button>
                <button
                  onClick={() => { setXrayVal(90); controllerRef.current?.setXray(90); }}
                  className={`flex-1 py-1 rounded transition border ${xrayVal === 90 ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Invisible (Nu)
                </button>
              </div>
            </div>

            {/* CURSEUR 4 : ARMAGE DU RESSORT DE BARILLET */}
            <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>4. Armage du Barillet &amp; Couple Nivaflex</span>
                </span>
                <span className="text-slate-900 dark:text-white font-bold">{mainspringVal} % (Couple {torque} mN·m)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={mainspringVal}
                onChange={handleMainspring}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex items-center justify-between gap-1 pt-1 font-mono text-[11px]">
                <button
                  onClick={() => { setMainspringVal(0); controllerRef.current?.setMainspring(0); }}
                  className={`flex-1 py-1 rounded transition border ${mainspringVal === 0 ? 'bg-purple-500 text-white font-bold border-purple-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Désarmé (0%)
                </button>
                <button
                  onClick={() => { setMainspringVal(50); controllerRef.current?.setMainspring(50); }}
                  className={`flex-1 py-1 rounded transition border ${mainspringVal === 50 ? 'bg-purple-500 text-white font-bold border-purple-500' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  Demi-Charge
                </button>
                <button
                  onClick={handleWindStep}
                  className="flex-1 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center justify-center gap-1 shadow-sm active:scale-95"
                  title="Faire tourner la couronne et remonter le ressort Nivaflex (+15%)"
                >
                  <span>Remonter (+15%)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* COLONNE DROITE (4 colonnes) : Fiche d'Atelier & Métrologie Suisse de l'Organe */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* FICHE TECHNIQUE D'ÉTABLI DE L'ORGANE SÉLECTIONNÉ */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-amber-500/30 rounded-2xl p-5 shadow-sm dark:shadow-2xl flex flex-col gap-4 transition-colors">
            
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {selectedOrgan.category}
                </span>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {selectedOrgan.gearBadge}
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-2">
                {selectedOrgan.title}
              </h2>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {selectedOrgan.description}
            </p>

            {/* Spécifications Métrologiques & Lubrification NIHS */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block">Vitesse &amp; Rapport</span>
                <strong className="text-slate-900 dark:text-white text-xs block truncate">{selectedOrgan.speed}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-amber-700 dark:text-amber-400 block">Lubrifiant Moebius</span>
                <strong className="text-cyan-700 dark:text-cyan-400 text-xs block truncate">{selectedOrgan.oil}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block">Pique-Huile Bergeon</span>
                <strong className="text-slate-700 dark:text-slate-200 text-xs block truncate">{selectedOrgan.oiler}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-emerald-700 dark:text-emerald-400 block">Jeu Axial (Ébat NIHS)</span>
                <strong className="text-emerald-700 dark:text-emerald-400 text-xs block truncate">{selectedOrgan.endshake}</strong>
              </div>
            </div>

            {/* ALERTE PIÈGE D'EXAMEN D'ATELIER (AFP / CFC) */}
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 space-y-1 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-mono text-[11px] uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Point Critique Examen Pratique (AFP / CFC)</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 font-light">
                {selectedOrgan.examTrap}
              </p>
            </div>

            {/* Boutons d'Action Caméra Organe */}
            <div className="flex items-center gap-2 pt-1 font-mono text-xs">
              <button
                onClick={() => controllerRef.current?.focusSelectedOrganCamera()}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center justify-center gap-1.5 shadow active:scale-95"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Centrer Caméra 3D</span>
              </button>
              <button
                onClick={() => handlePreset('iso')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              >
                Vue Globale
              </button>
            </div>

          </div>

          {/* DÉCOMPOSITION CINÉMATIQUE DE L'ÉCHAPPEMENT EN DIRECT */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm dark:shadow-xl space-y-2 transition-colors">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cinématique de l&apos;Échappement</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">{msElapsed} ms / 200 ms</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-amber-700 dark:text-amber-300 font-mono text-xs">{phaseTag}</div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">{phaseDesc}</p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
