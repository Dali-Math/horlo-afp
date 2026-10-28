// src/app/theorie/mouvements/roue-trois-bras/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  RotateCw,
  Pause,
  Play,
  ZoomIn,
  ZoomOut,
  Compass,
  Droplet,
  Gauge,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  ShieldCheck,
  Ruler,
  Wrench,
  Info,
  Sliders,
  Maximize2
} from 'lucide-react';

type ViewMode = 'cinematique' | 'comparateur' | 'lubrification' | 'metrologie';

export default function RoueTroisBrasPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('cinematique');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Comparateur interactif
  const [wheelType, setWheelType] = useState<'ajouree' | 'pleine'>('ajouree');
  const [simulatedTorque, setSimulatedTorque] = useState<number>(100); // 100%

  // Rotation continue
  const [rotationAngle, setRotationAngle] = useState(0);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && isPlaying) {
        const delta = (time - lastTimeRef.current) / 1000;
        // 60 secondes par tour à vitesse 1x (360° / 60 = 6 deg/sec)
        const baseSpeed = 18; // 18 deg/sec pour une belle animation fluide
        setRotationAngle((prev) => (prev + baseSpeed * speed * delta) % 360);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Données des composants
  const componentsInfo: Record<
    string,
    { title: string; subtitle: string; desc: string; nihs: string; warning?: string }
  > = {
    serge: {
      title: 'La Serge (Jante extérieure)',
      subtitle: 'Zone dentée d’engrènement finisseur',
      desc: 'Couronne circulaire périphérique portant la denture épicycloïdale. Réalisée avec une épaisseur minimale (0.16 mm à 0.20 mm) car toute masse située au rayon maximal multiplie l’inertie au carré (I = m·r²).',
      nihs: 'Norme NIHS 20-25 • Module 0.12 - 0.18',
      warning: 'Interdiction absolue de lubrifier la denture : risque d’arrêt par collage.'
    },
    bras: {
      title: 'Les 3 Bras évidés à 120°',
      subtitle: 'Structure d’allègement et de rigidité',
      desc: 'Trois rayons disposés rigoureusement à 120° reliant la serge au noyau central. Le profil effilé permet un gain de masse de 40% par rapport à une roue pleine, tout en évitant toute flexion axiale lors du travail de transmission.',
      nihs: 'Plan d’usinage horloger suisse • Tolérance faux-rond < 0.002 mm'
    },
    noyau: {
      title: 'Le Noyau (Moyeu central)',
      subtitle: 'Zone de chassage sur pignon d’acier',
      desc: 'Partie centrale massive en laiton d’horlogerie assurant le centrage parfait et le chassage à serrage contrôlé sur l’assiette du pignon des secondes sans déformer les bras.',
      nihs: 'Ajustement H6/s5 • Serrage 3 à 5 µm'
    },
    pignon: {
      title: 'Pignon d’acier trempé & Pivot poli',
      subtitle: 'Acier 20AP poli miroir au zinc',
      desc: 'Pignon taillé dans la masse d’acier trempé et revenu. Ses ailes reçoivent le couple de la roue moyenne et ses pivots brunis roulent dans des coussinets en rubis synthétique (corindon).',
      nihs: 'Rugosité Ra < 0.05 µm • Dureté 720 HV'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Fil d'Ariane & En-tête supérieur */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/theorie/mouvements"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour Mouvements</span>
            </Link>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Micro-Mécanique & Finissage Horloger
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Norme NIHS 20-25
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              Inertie -40%
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Titre & Description Principale */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-300 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
            Roue des Secondes à 3 Bras
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
            Mobile de finissage d’échappement conçu selon les règles d’art de la haute horlogerie suisse.
            Ses 3 bras évidés à 120° éliminent l’inertie parasite pour préserver l’amplitude du balancier et optimiser la régularité de marche.
          </p>
        </div>

        {/* Barre de navigation des modes de visualisation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-200/70 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setViewMode('cinematique')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition ${
              viewMode === 'cinematique'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Cinématique 2.5D</span>
          </button>

          <button
            onClick={() => setViewMode('comparateur')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition ${
              viewMode === 'comparateur'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Comparateur d’Inertie</span>
          </button>

          <button
            onClick={() => setViewMode('lubrification')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition ${
              viewMode === 'lubrification'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>Lubrification Moebius</span>
          </button>

          <button
            onClick={() => setViewMode('metrologie')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition ${
              viewMode === 'metrologie'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Contrôle & Métrologie</span>
          </button>
        </div>

        {/* CONTENU PRINCIPAL SELON LE MODE CHOISI */}

        {/* 1. VUE CINÉMATIQUE INTERACTIVE */}
        {viewMode === 'cinematique' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Scène de visualisation centrale */}
            <div className="lg:col-span-8 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              {/* Grille technique de fond */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px'
                }}
              />

              {/* Barre de commandes interactives d’établi */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-white text-xs">
                {/* Lecture / Pause & Vitesse */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause' : 'Lecture'}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
                    {[0.2, 1, 3].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition ${
                          speed === s ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loupe & Zoom 10x */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel(zoomLevel === 1 ? 1.6 : 1)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition ${
                      zoomLevel > 1
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                    <span>{zoomLevel > 1 ? 'Zoom 10x Actif' : 'Loupe 10x'}</span>
                  </button>

                  {/* Bascules vecteurs / repères */}
                  <button
                    onClick={() => setShowAngles(!showAngles)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      showAngles ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Repères 120°
                  </button>

                  <button
                    onClick={() => setShowVectors(!showVectors)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      showVectors ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Vecteur Couple
                  </button>
                </div>
              </div>

              {/* Rendu Vectoriel Cinématique Haute Fidélité */}
              <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
                <div
                  className="transition-transform duration-500 ease-out origin-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <svg
                    width="440"
                    height="440"
                    viewBox="-220 -220 440 440"
                    className="overflow-visible select-none"
                  >
                    <defs>
                      <radialGradient id="liveBrass" cx="40%" cy="40%" r="65%">
                        <stop offset="0%" stop-color="#FEF08A" />
                        <stop offset="35%" stop-color="#F59E0B" />
                        <stop offset="85%" stop-color="#D97706" />
                        <stop offset="100%" stop-color="#78350F" />
                      </radialGradient>
                      <radialGradient id="liveSteel" cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stop-color="#FFFFFF" />
                        <stop offset="50%" stop-color="#94A3B8" />
                        <stop offset="85%" stop-color="#475569" />
                        <stop offset="100%" stop-color="#0F172A" />
                      </radialGradient>
                      <filter id="goldenGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#F59E0B" flood-opacity="0.3" />
                      </filter>
                    </defs>

                    {/* Cercle de mesure et repères fixes */}
                    <circle cx="0" cy="0" r="195" fill="none" stroke="#1E293B" stroke-width="1" stroke-dasharray="2 4" />
                    <circle cx="0" cy="0" r="170" fill="none" stroke="#334155" stroke-width="0.5" />

                    {/* Repères d'angles à 120° (si activés) */}
                    {showAngles && (
                      <g stroke="#38BDF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.7">
                        <line x1="0" y1="0" x2="0" y2="-210" />
                        <line x1="0" y1="0" x2="181.8" y2="105" />
                        <line x1="0" y1="0" x2="-181.8" y2="105" />
                        <text x="8" y="-195" fill="#38BDF8" font-size="10" font-family="monospace">0° (12h)</text>
                        <text x="140" y="115" fill="#38BDF8" font-size="10" font-family="monospace">120° (4h)</text>
                        <text x="-195" y="115" fill="#38BDF8" font-size="10" font-family="monospace">240° (8h)</text>
                      </g>
                    )}

                    {/* ENSEMBLE ROUE MOBILE EN ROTATION CONTINUE */}
                    <g
                      transform={`rotate(${rotationAngle})`}
                      filter="url(#goldenGlow)"
                      className="cursor-pointer"
                    >
                      {/* 1. Serge extérieure (Jante dentée) */}
                      <g onClick={() => setSelectedComponent('serge')}>
                        <circle
                          cx="0"
                          cy="0"
                          r="185"
                          fill="url(#liveBrass)"
                          stroke="#78350F"
                          stroke-width="1.5"
                        />
                        <circle cx="0" cy="0" r="162" fill="#0B132B" />
                        <circle cx="0" cy="0" r="162" fill="none" stroke="#F59E0B" stroke-width="1.5" />
                        <circle cx="0" cy="0" r="180" fill="none" stroke="#FEF08A" stroke-width="0.75" opacity="0.6" />

                        {/* Denture extérieure découpée (72 crans de secondes) */}
                        {Array.from({ length: 48 }).map((_, i) => (
                          <line
                            key={i}
                            x1="0"
                            y1="-185"
                            x2="0"
                            y2="-196"
                            stroke="#D97706"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            transform={`rotate(${(i * 360) / 48})`}
                          />
                        ))}
                      </g>

                      {/* 2. Les 3 Grandes Fenêtres Ajourées définissant les 3 Bras */}
                      <g onClick={() => setSelectedComponent('bras')} fill="#0B132B" stroke="#FEF08A" stroke-width="1.5">
                        {/* Évidement 1 */}
                        <path d="M 24,-42 A 48,48 0 0,1 42,24 L 140,80 A 162,162 0 0,0 80,-140 Z" />
                        {/* Évidement 2 (tourné à 120°) */}
                        <path
                          d="M 24,-42 A 48,48 0 0,1 42,24 L 140,80 A 162,162 0 0,0 80,-140 Z"
                          transform="rotate(120)"
                        />
                        {/* Évidement 3 (tourné à 240°) */}
                        <path
                          d="M 24,-42 A 48,48 0 0,1 42,24 L 140,80 A 162,162 0 0,0 80,-140 Z"
                          transform="rotate(240)"
                        />
                      </g>

                      {/* 3. Moyeu / Noyau central laiton */}
                      <g onClick={() => setSelectedComponent('noyau')}>
                        <circle
                          cx="0"
                          cy="0"
                          r="52"
                          fill="url(#liveBrass)"
                          stroke="#78350F"
                          stroke-width="2"
                        />
                        <circle cx="0" cy="0" r="42" fill="none" stroke="#FEF08A" stroke-width="1" opacity="0.8" />
                      </g>

                      {/* 4. Pignon central en acier trempé */}
                      <g onClick={() => setSelectedComponent('pignon')}>
                        <circle
                          cx="0"
                          cy="0"
                          r="26"
                          fill="url(#liveSteel)"
                          stroke="#0F172A"
                          stroke-width="2"
                        />
                        {/* 6 ailes du pignon d'acier */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <line
                            key={i}
                            x1="0"
                            y1="-24"
                            x2="0"
                            y2="-28"
                            stroke="#FFFFFF"
                            stroke-width="3"
                            stroke-linecap="round"
                            transform={`rotate(${i * 60})`}
                          />
                        ))}

                        {/* Pivot poli miroir & trou d'huile */}
                        <circle cx="0" cy="0" r="10" fill="#0284C7" stroke="#38BDF8" stroke-width="1.5" />
                        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                      </g>
                    </g>

                    {/* Vecteur de couple tangentiel dynamique (si activé) */}
                    {showVectors && (
                      <g transform="translate(0, -196)">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
                          </marker>
                        </defs>
                        <line x1="0" y1="0" x2="60" y2="0" stroke="#10B981" stroke-width="3" marker-end="url(#arrow)" />
                        <text x="68" y="4" fill="#10B981" font-size="11" font-weight="bold" font-family="monospace">
                          F_tangentiel
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Télémétrie en temps réel sous la vue */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Position angulaire</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">
                    {Math.round(rotationAngle)}°
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Période de rotation</div>
                  <div className="text-sm font-bold text-sky-400 font-mono">60.0 s / tour</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Moment d’inertie (I)</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">0.82 mg·cm²</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Gain d’inertie</div>
                  <div className="text-sm font-bold text-yellow-400 font-mono">-41.5%</div>
                </div>
              </div>
            </div>

            {/* Panneau d'inspection d'atelier (Détails au clic) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500" />
                  Inspecteur Micro-Mécanique
                </h3>

                {selectedComponent && componentsInfo[selectedComponent] ? (
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {componentsInfo[selectedComponent].title}
                      </div>
                      <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        {componentsInfo[selectedComponent].subtitle}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {componentsInfo[selectedComponent].desc}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        Référence d’établi :
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 font-mono">
                        {componentsInfo[selectedComponent].nihs}
                      </div>
                    </div>

                    {componentsInfo[selectedComponent].warning && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-300 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{componentsInfo[selectedComponent].warning}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 py-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                      <Eye className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Touchez ou cliquez sur la roue
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sélectionnez la serge dentée, les 3 bras ajourés, le noyau en laiton ou le pignon d’acier pour révéler leurs secrets d’usinage.
                    </p>
                  </div>
                )}
              </div>

              {/* Règle horlogère : Pourquoi 3 bras et pas 4 ou 5 ? */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 text-xs space-y-3">
                <div className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600" />
                  Pourquoi 3 bras et pas 2 ou 4 ?
                </div>
                <p className="text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                  <strong>3 points définissent un plan parfait :</strong> En géométrie spatiale, 3 bras à 120° offrent la stabilité isostatique absolue.
                  2 bras créeraient un flambage axial lors des chocs ; 4 ou 5 bras alourdiraient inutilement le mobile sans gain de rigidité.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. COMPARATEUR D'INERTIE INTERACTIF */}
        {viewMode === 'comparateur' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Banc de Comparaison : Roue Évidée à 3 Bras vs Roue Pleine
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Démonstration physique du théorème des moments d’inertie : \(I = \int r^2\,dm\)
                  </p>
                </div>

                {/* Sélecteur de roue */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-300 dark:border-slate-700">
                  <button
                    onClick={() => setWheelType('ajouree')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      wheelType === 'ajouree'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Roue à 3 Bras Ajourée (Pro)
                  </button>
                  <button
                    onClick={() => setWheelType('pleine')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      wheelType === 'pleine'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Roue Pleine Non-Ajourée
                  </button>
                </div>
              </div>

              {/* Données comparatives en direct */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Masse totale du mobile
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
                    {wheelType === 'ajouree' ? '0.042 g' : '0.071 g'}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    {wheelType === 'ajouree' ? 'Allègement de -40.8%' : 'Masse maximale pénalisante'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Moment d’inertie polaire (I)
                  </div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    {wheelType === 'ajouree' ? '0.82 mg·cm²' : '1.38 mg·cm²'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {wheelType === 'ajouree'
                      ? 'Démarrage instantané à chaque alternance'
                      : 'Forte inertie : freinage du balancier'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Gain d’amplitude balancier
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {wheelType === 'ajouree' ? '+18° à +22°' : '0° (Référence basse)'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {wheelType === 'ajouree' ? 'Amplitude saine > 270° au plat' : 'Risque d’amplitude anémique < 240°'}
                  </div>
                </div>
              </div>

              {/* Explication technique d'établi */}
              <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-sm text-sky-900 dark:text-sky-200 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-sky-600" />
                  La règle du carré du rayon en horlogerie
                </div>
                <p className="leading-relaxed text-xs sm:text-sm">
                  La roue de seconde effectue 1 tour par minute tandis que le barillet tourne en plusieurs heures.
                  À chaque chute de l’ancre (5 à 8 fois par seconde), le rouage de finissage s’arrête puis redémarre instantanément.
                  Si la roue de seconde était pleine, son inertie absorberait une part colossale de l’énergie du ressort-moteur.
                  <strong> L’ajourage à 3 bras restitue toute la force à l’échappement !</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. LUBRIFICATION OFFICIELLE MOEBIUS */}
        {viewMode === 'lubrification' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700 mb-2">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  Protocole Suisse d’Atelier
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Cartographie de Lubrification : Roue des Secondes
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Huile certifiée : <strong>Moebius 9010 (Synthétique fluide pour mobiles rapides)</strong>
                </p>
              </div>

              {/* Repère visuel de la goutte d'huile */}
              <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>PIVOT DE SECONDE & PIERRE DE HUILAGE</span>
                  <span className="text-sky-400">MOEBIUS 9010</span>
                </div>

                <div className="relative h-44 flex items-center justify-center bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                  {/* Schéma de coupe du rubis huilé */}
                  <svg width="260" height="150" viewBox="-130 -75 260 150">
                    {/* Rubis / Pierre olive */}
                    <path
                      d="M -90,-40 L 90,-40 L 80,40 L -80,40 Z"
                      fill="#BE185D"
                      opacity="0.85"
                      stroke="#F43F5E"
                      stroke-width="1.5"
                    />
                    {/* Trou de pivotage */}
                    <rect x="-14" y="-40" width="28" height="80" fill="#0F172A" />

                    {/* Pivot acier poli */}
                    <rect x="-10" y="-55" width="20" height="110" fill="url(#liveSteel)" stroke="#64748B" stroke-width="1" />

                    {/* Goutte d'huile Moebius 9010 calibrée (1/2 à 2/3 de la pierre) */}
                    <ellipse cx="0" cy="-28" rx="28" ry="12" fill="#38BDF8" opacity="0.75" />
                    <ellipse cx="0" cy="-28" rx="18" ry="7" fill="#BAE6FD" opacity="0.9" />

                    {/* Repère cotation */}
                    <line x1="32" y1="-28" x2="70" y2="-28" stroke="#38BDF8" stroke-width="1" stroke-dasharray="2 2" />
                    <text x="74" y="-25" fill="#38BDF8" font-size="9" font-family="monospace">
                      Goutte 1/2
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Volume de la goutte :</span>
                    <strong className="text-sky-300">1/2 à 2/3 du diamètre de la pierre</strong>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Outil requis :</span>
                    <strong className="text-amber-300">Pique-huile fin (Noir / 0.15 mm)</strong>
                  </div>
                </div>
              </div>

              {/* Zones interdites strictes */}
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-900 dark:text-red-300 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Zones Sèches Interdites (DANGER D’ARRÊT)
                </div>
                <ul className="list-disc list-inside space-y-1 text-red-800 dark:text-red-300">
                  <li><strong>La denture de la serge :</strong> Ne jamais huiler la denture de la roue des secondes ni le pignon d’échappement.</li>
                  <li><strong>Les 3 bras ajourés :</strong> Toute goutte d’huile migrée crée une adhérence visqueuse avec le pont ou la platine.</li>
                  <li><strong>Contrôle épilame :</strong> Si l’huile s’étale hors du rubis, traiter impérativement à l’épilame (Fixodrop).</li>
                </ul>
              </div>
            </div>

            {/* Fiche Lubrifiant Moebius */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-sky-500" />
                Spécifications Techniques Moebius 9010
              </h3>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Viscosité à 20°C :</span>
                  <span className="font-mono font-bold">150 cSt</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Point d’écoulement :</span>
                  <span className="font-mono font-bold">-40 °C</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Plage de température :</span>
                  <span className="font-mono font-bold">-30°C à +70°C</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Stabilité au vieillissement :</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Excellente (5 ans)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Règle d’Or de l’Atelier :
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  « Trop d’huile est pire que pas assez d’huile. » Une goutte débordant du rubis est aspirée par capillarité sur la platine, laissant le pivot sec en quelques semaines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTRÔLE ET MÉTROLOGIE HORLOGÈRE */}
        {viewMode === 'metrologie' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-amber-500" />
                  Contrôles Métrologiques d’Atelier
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tolérances officielles suisses appliquées avant emboîtage du calibre
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Faux-rond */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    1. Contrôle du Faux-Rond (Concentricité)
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Tolérance &lt; 0.002 mm (2 µm)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Mesuré au compas aux huit-chiffres ou au banc de faux-rond à comparateur micrométrique. Garantit un engrènement à profondeur constante sans arc-boutement.
                  </p>
                </div>

                {/* 2. Faux-plat */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    2. Contrôle du Faux-Plat (Planéité)
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Tolérance &lt; 0.003 mm (3 µm)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Contrôle de la planéité de la serge par rapport à l’axe de pivotement. Évite tout frottement parasite avec le pont de rouage ou la roue moyenne.
                  </p>
                </div>

                {/* 3. Ébat axial */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    3. Jeu d’Ébat Axial
                  </div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    0.015 à 0.030 mm
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Testé manuellement à la brucelle n°5 sous loupe 10x : la roue doit présenter un léger battement vertical libre sans contrainte.
                  </p>
                </div>

                {/* 4. Chassage noyau */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    4. Serrage du Noyau sur Pignon
                  </div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    Couple de friction &gt; 1.5 N·mm
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Chassage effectué à la potence micrométrique avec tas adéquat évitant toute poussée sur les 3 bras ajourés.
                  </p>
                </div>
              </div>
            </div>

            {/* Outils d'atelier recommandés */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-500" />
                Outillage Spécifique d’Établi
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Compas aux huit-chiffres :</div>
                  <div className="text-slate-500 dark:text-slate-400">Vérification de la rondeur et de la planéité entre pointes carbures.</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Brucelles d’horloger n°3 &amp; n°5 :</div>
                  <div className="text-slate-500 dark:text-slate-400">Manipulation exclusive par la serge ou le pignon, jamais par les bras fins.</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Loupe d’inspection 10x / 12x :</div>
                  <div className="text-slate-500 dark:text-slate-400">Examen optique des dentures épicycloïdales et état de surface des pivots.</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Moelle de sureau &amp; Pégamoid :</div>
                  <div className="text-slate-500 dark:text-slate-400">Nettoyage final des pivots avant huilage.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
