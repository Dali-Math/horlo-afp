'use client';

/**
 * HorloLearn — Écorché Éclaté 3D · Calibre École ETA 6497-1 (Unitas 16 ½''')
 * Banc visuel interactif : trackball quaternion 360°, échappement pas à pas,
 * fiche d'établi par organe et chaîne cinématique complète.
 * Thème & écriture : « Théorie & Académie Horlogère Suisse » (horlolearn.ch/theorie).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  ChevronUp,
  HelpCircle as CircleHelp,
  Clock,
  Cog,
  Compass,
  Crosshair,
  Compass as DraftingCompass,
  Eye,
  Hand,
  Keyboard,
  Layers,
  Maximize,
  Move,
  RefreshCw as Orbit,
  MousePointer as Pointer,
  RefreshCw,
  Repeat,
  RotateCcw,
  RotateCw,
  Search,
  Star,
  Clock as Timer,
  AlertTriangle as TriangleAlert,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
} from 'lucide-react';
import { createCalibreEngine, type CalibreEngineHandle, type SensitivityMode } from '@/lib/calibre/engine';
import {
  CAMERA_PRESETS,
  ESCAPEMENT_PHASES,
  HUD_FROZEN,
  KINEMATIC_TABLE,
  ORGAN_DATABASE,
  ORGAN_PILLS,
  type OrganId,
  type PresetId,
} from '@/lib/calibre/data';

type HudState = { mode: 'frozen' | 'live'; idx: number };

const CREAM_CARD = 'bg-[#FAF7F1] dark:bg-[#111419] dark:bg-[#111419] border border-[#D7D0C4] dark:border-[#2a2f36] dark:border-[#2a2f36] text-[#171717] dark:text-[#f1ede5] dark:text-[#f1ede5]';
const SUB_CARD = 'bg-[#F3EFE7] dark:bg-[#171b21] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] dark:border-[#2a2f36] text-[#171717] dark:text-[#f1ede5] dark:text-[#f1ede5]';

export default function CalibreEcorchePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<CalibreEngineHandle | null>(null);

  const [selected, setSelected] = useState<OrganId>('barrel');
  const [speed, setSpeed] = useState(1.0);
  const [beatLabel, setBeatLabel] = useState('Cycle Actif (1×) • 90 ms');
  const [scrubVal, setScrubVal] = useState(45);
  const [explodePct, setExplodePct] = useState(0);
  const [xrayPct, setXrayPct] = useState(25);
  const [mainspringPct, setMainspringPct] = useState(85);
  const [audioOn, setAudioOn] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [sensitivity, setSensitivity] = useState<SensitivityMode>('normal');
  const [camPreset, setCamPreset] = useState<PresetId>('iso');
  const [helpOpen, setHelpOpen] = useState(false);
  const [hud, setHud] = useState<HudState>({ mode: 'frozen', idx: -1 });
  const [toastState, setToastState] = useState<'shown' | 'fading' | 'gone'>('shown');

  const toggleFullscreen = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen)
        (el as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as unknown as { webkitExitFullscreen?: () => void }).webkitExitFullscreen)
        (document as unknown as { webkitExitFullscreen: () => void }).webkitExitFullscreen();
    }
  }, []);

  // Bootstrap moteur 3D (client uniquement, compatible StrictMode via dispose)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const engine = createCalibreEngine(el, {
      onOrgan: (id: OrganId) => setSelected(id),
      onHud: (mode: 'frozen' | 'live', idx: number) => setHud({ mode, idx }),
      onBeatLabel: (t: string) => setBeatLabel(t),
      onScrub: (p: number) => setScrubVal(p),
      onSpeed: (m: number) => setSpeed(m),
      onExplode: (p: number) => setExplodePct(p),
      onXray: (p: number) => setXrayPct(p),
      onMainspring: (p: number) => setMainspringPct(p),
      onAudio: (on: boolean) => setAudioOn(on),
      onAutoRotate: (on: boolean) => setAutoRotate(on),
      onHelp: () => setHelpOpen((o: boolean) => !o),
      onFullscreenKey: () => toggleFullscreen(),
      onPreset: (id: PresetId) => setCamPreset(id),
    });
    engineRef.current = engine;
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [toggleFullscreen]);

  // Toast de première visite : fondu automatique après 9 s
  useEffect(() => {
    const t1 = setTimeout(() => setToastState('fading'), 9000);
    const t2 = setTimeout(() => setToastState('gone'), 10400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const e = () => engineRef.current;
  const data = ORGAN_DATABASE[selected];
  const hudLive = hud.mode === 'live';
  const hudPhase = hudLive && hud.idx >= 0 ? ESCAPEMENT_PHASES[hud.idx] : null;
  const hudTag = hudPhase ? hudPhase.tag : HUD_FROZEN.tag;
  const hudDesc = hudPhase ? hudPhase.desc : HUD_FROZEN.desc;
  const hudPrefix = hudPhase ? 'Phase Active :' : 'Échappement :';
  const amplitude = Math.round(185 + (mainspringPct / 100) * 125);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE7] dark:bg-[#171b21] dark:bg-[#090b0e] text-[#171717] dark:text-[#f1ede5] dark:text-[#f1ede5] font-body transition-colors duration-200 select-none selection:bg-[#B08D57] selection:text-white">
      {/* ================= EN-TÊTE : MARQUE & TÉLÉMÉTRIE ================= */}
      <header className="border-b border-[#D7D0C4] dark:border-[#2a2f36] dark:border-[#2a2f36] bg-[#FAF7F1] dark:bg-[#111419]/95 dark:bg-[#111419]/95 backdrop-blur sticky top-0 z-50 transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F1] dark:bg-[#111419] dark:bg-[#111419] border border-[#D7D0C4] dark:border-[#2a2f36] dark:border-[#2a2f36] hover:border-[#9C7A43] text-[#57534E] dark:text-[#aaa49a] dark:text-[#aaa49a] hover:text-[#9C7A43] text-xs font-label transition shadow-sm"
              title="Retour à l'Atelier Pratique"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atelier</span>
            </Link>

            <span className="w-px h-5 bg-[#D7D0C4] dark:bg-[#2a2f36] hidden sm:inline" />

            <div className="w-10 h-10 rounded-full bg-[#171717] dark:bg-[#171b21] border border-[#9C7A43]/60 flex items-center justify-center text-[#E3B95F] shadow-sm">
              <DraftingCompass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-[#171717] dark:text-[#f1ede5]">
                  Horlo<span className="text-[#C08A2D]">Learn</span>
                </span>
                <span className="text-[9px] font-label tracking-[0.22em] text-[#9C7A43] uppercase hidden sm:block">
                  Culture &amp; Savoir-Faire
                </span>
                <span className="text-[10px] font-label px-2.5 py-0.5 rounded-full bg-[#9C7A43]/10 text-[#9C7A43] border border-[#9C7A43]/30 font-semibold">
                  ÉCORCHÉ 3D · STANDARDS NIHS &amp; ISO 3159
                </span>
              </div>
              <p className="text-xs text-[#57534E] dark:text-[#aaa49a] font-body">
                Calibre École <strong className="font-label text-[#171717] dark:text-[#f1ede5]">ETA 6497-1 (Unitas 16 ½&apos;&apos;&apos;)</strong> — Porte-Mouvement Universel 360° (Côté Ponts &amp; Côté Cadran)
              </p>
            </div>
          </div>

          {/* Télémétrie mécanique live */}
          <div className="flex flex-wrap items-center gap-2 font-label text-xs">
            <div className={`px-3 py-1.5 rounded-xl ${CREAM_CARD} flex items-center gap-2`}>
              <span className="text-[#57534E] dark:text-[#aaa49a]">Ø :</span>
              <strong className="text-[#171717] dark:text-[#f1ede5]">36.60 mm (16 ½&apos;&apos;&apos;)</strong>
            </div>
            <div className={`px-3 py-1.5 rounded-xl ${CREAM_CARD} flex items-center gap-2`}>
              <span className="text-[#57534E] dark:text-[#aaa49a]">Fréquence :</span>
              <strong className="text-[#9C7A43]">18&apos;000 A/h (2.5 Hz)</strong>
            </div>
            <div className={`px-3 py-1.5 rounded-xl ${CREAM_CARD} flex items-center gap-2`}>
              <span className="text-[#57534E] dark:text-[#aaa49a]">Levée :</span>
              <strong className="text-emerald-700">44°</strong>
            </div>
            <div className={`px-3 py-1.5 rounded-xl ${CREAM_CARD} flex items-center gap-2`}>
              <span className="text-[#57534E] dark:text-[#aaa49a]">Amplitude :</span>
              <strong className="text-sky-700">{amplitude}°</strong>
            </div>
            <button
              onClick={() => e()?.setPreset(camPreset === 'dial' ? 'iso' : 'dial')}
              className="px-3 py-1.5 rounded-xl bg-[#9C7A43] text-white font-bold hover:bg-[#B08D57] transition flex items-center gap-1.5 shadow-sm"
              title="Basculer entre côté ponts et côté cadran"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retourner Calibre</span>
            </button>
            <button
              onClick={() => e()?.toggleAudio()}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
                audioOn
                  ? 'bg-[#9C7A43] text-white border-[#9C7A43] font-bold'
                  : `${CREAM_CARD} text-[#57534E] dark:text-[#aaa49a] dark:text-[#aaa49a] hover:text-[#9C7A43]`
              }`}
              title="Tic-tac mécanique 5 Hz"
            >
              {audioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Son 5 Hz : {audioOn ? 'ON' : 'OFF'}</span>
            </button>

            <div className="rounded-xl overflow-hidden border border-[#D7D0C4] dark:border-[#2a2f36] dark:border-[#2a2f36] shadow-sm">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* ================= INTRO TRAITÉ (style /theorie) ================= */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-5 pt-8 pb-2 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C7A43]/10 border border-[#9C7A43]/40 font-label text-[10px] tracking-[0.2em] text-[#7C5F33] uppercase">
          <Star className="w-3 h-3 text-[#C08A2D]" />
          Laboratoire 3D &amp; Cinématique · Référentiels AFP / CFC
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] mt-4 text-[#171717] dark:text-[#f1ede5] font-medium">
          Écorché Éclaté &amp;{' '}
          <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Cinématique du 6497-1
          </span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-[15px] text-[#57534E] dark:text-[#aaa49a] leading-relaxed">
          De la chaîne cinématique complète à l&apos;échappement à ancre suisse : désossez le calibre
          école suisse en vue éclatée, tournez-le librement à 360° et déroulez chaque phase du battement
          — fiches d&apos;établi, lubrifiants Moebius et tolérances d&apos;ébats conformes aux référentiels suisses.
        </p>
      </section>

      {/* ================= ATELIER : VIEWPORT 3D + INSPECTEUR ================= */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* -------- COLONNE PRINCIPALE : VIEWPORT WEBGL -------- */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* Banc de vues & manipulation */}
          <div className={`${CREAM_CARD} rounded-2xl p-2.5 flex flex-col gap-2 shadow-sm`}>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-label uppercase tracking-wider text-[#9C7A43] px-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Vues &amp; Angles 3D :
              </span>
              {CAMERA_PRESETS.map((p: any, i: number) => (
                <button
                  key={p.id}
                  onClick={() => e()?.setPreset(p.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-label transition border ${
                    camPreset === p.id
                      ? 'bg-[#9C7A43] text-white border-[#9C7A43] font-semibold shadow-sm'
                      : 'bg-[#F3EFE7] dark:bg-[#171b21] text-[#57534E] dark:text-[#aaa49a] hover:text-[#171717] dark:text-[#f1ede5] border-[#D7D0C4] dark:border-[#2a2f36]'
                  }`}
                >
                  {i === 2 ? <Clock className="w-3 h-3 inline mr-1 -mt-0.5 text-[#C08A2D]" /> : null}
                  {i === 3 ? <ZoomIn className="w-3 h-3 inline mr-1 -mt-0.5 text-rose-600" /> : null}
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 border-t border-[#D7D0C4] dark:border-[#2a2f36]/60 pt-2">
              <span className="text-[11px] font-label uppercase tracking-wider text-sky-700 px-2 flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5" /> Manipulation :
              </span>
              <button
                onClick={() => e()?.setAutoRotate(!autoRotate)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-label transition flex items-center gap-1.5 border ${
                  autoRotate
                    ? 'bg-[#9C7A43] text-white border-[#9C7A43] font-semibold shadow-sm'
                    : 'bg-[#F3EFE7] dark:bg-[#171b21] text-[#57534E] dark:text-[#aaa49a] border-[#D7D0C4] dark:border-[#2a2f36] hover:text-[#171717] dark:text-[#f1ede5]'
                }`}
                title="Rotation automatique du plateau (touche R)"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Rotation Auto</span>
              </button>
              <span className="text-[10px] font-label text-[#57534E] dark:text-[#aaa49a] ml-1">Sensibilité :</span>
              {(['doux', 'normal', 'precis'] as SensitivityMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    e()?.setSensitivity(m);
                    setSensitivity(m);
                  }}
                  className={`px-2 py-1 rounded-lg text-[11px] font-label transition border ${
                    sensitivity === m
                      ? 'bg-[#9C7A43] text-white border-[#9C7A43] font-semibold'
                      : 'bg-[#F3EFE7] dark:bg-[#171b21] text-[#57534E] dark:text-[#aaa49a] border-[#D7D0C4] dark:border-[#2a2f36] hover:text-[#171717] dark:text-[#f1ede5]'
                  }`}
                  title={m === 'doux' ? 'Rotation lente et cinématique' : m === 'precis' ? 'Ultra-précise pour macro' : 'Équilibrée'}
                >
                  {m === 'doux' ? 'Douce' : m === 'normal' ? 'Normale' : 'Précise'}
                </button>
              ))}
              <span className="flex-1" />
              <button
                onClick={() => e()?.screenshot()}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-label ${CREAM_CARD} text-[#57534E] dark:text-[#aaa49a] hover:text-[#9C7A43] transition flex items-center gap-1.5`}
                title="Exporter une photo PNG du calibre (touche P)"
              >
                <Camera className="w-3.5 h-3.5 text-sky-700" />
                <span>Photo PNG</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-label ${CREAM_CARD} text-[#57534E] dark:text-[#aaa49a] hover:text-[#9C7A43] transition flex items-center gap-1.5`}
                title="Plein écran immersif (touche F)"
              >
                <Maximize className="w-3.5 h-3.5 text-emerald-700" />
                <span>Plein Écran</span>
              </button>
              <button
                onClick={() => setHelpOpen(!helpOpen)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-label ${CREAM_CARD} text-[#57534E] dark:text-[#aaa49a] hover:text-[#9C7A43] transition flex items-center gap-1.5`}
                title="Guide de manipulation (touche H)"
              >
                <CircleHelp className="w-3.5 h-3.5 text-[#C08A2D]" />
                <span>Aide</span>
              </button>
            </div>
          </div>

          {/* Viewport WebGL */}
          <div
            id="viewportCard"
            ref={viewportRef}
            className="relative w-full h-[540px] sm:h-[620px] xl:h-[680px] rounded-2xl border border-[#D7D0C4] dark:border-[#2a2f36] bg-atelier-canvas overflow-hidden shadow-xl select-none"
          >
            {/* Overlay statut (haut-gauche) */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1.5 max-w-[62%]">
              <div className="px-3 py-1.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/10 text-xs font-label flex items-center gap-2 w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3B95F] animate-pulse" />
                <span id="viewportActiveOrganTitle" className="text-[#F3E5AB] font-semibold">
                  {`Organe sélectionné : ${data.title}`}
                </span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-black/35 backdrop-blur-sm border border-white/10 text-[11px] font-label text-[#B7C1D0] w-fit">
                Glisser : Tourner dans tous les sens (360° libre) • Maj / Clic droit : Déplacer • Molette / Pincer : Zoom • Double-clic : Recentrer • 2 doigts : Pivoter + Zoom
              </div>
            </div>

            {/* Télémétrie phases + pad de rotation (haut-droite) */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2 max-w-[36%]">
              <div className="pointer-events-none px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-[#E3B95F]/40 text-[11px] font-label text-[#F3E5AB] shadow-lg flex items-center gap-2">
                <span className="text-[#B7C1D0]">{hudPrefix}</span>
                <strong className="text-[#E3B95F]">{hudTag}</strong>
              </div>
              <div className="pointer-events-none px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/10 text-[10px] font-label text-[#B7C1D0] leading-snug shadow">
                {hudDesc}
              </div>
              <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 flex items-center gap-1 shadow-lg text-xs font-label">
                <button
                  onClick={() => e()?.nudge(0, 0.35)}
                  title="Tourner à Gauche"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E3B95F] hover:text-black text-[#D7DEE8] flex items-center justify-center transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => e()?.nudge(-0.35, 0)}
                  title="Basculer vers le Haut"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E3B95F] hover:text-black text-[#D7DEE8] flex items-center justify-center transition"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => e()?.nudge(0.35, 0)}
                  title="Basculer vers le Bas"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E3B95F] hover:text-black text-[#D7DEE8] flex items-center justify-center transition"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => e()?.nudge(0, -0.35)}
                  title="Tourner à Droite"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#E3B95F] hover:text-black text-[#D7DEE8] flex items-center justify-center transition"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => e()?.flip180()}
                  title="Retourner à 180° (Ponts ↔ Cadran) — touche B"
                  className="px-2 h-7 rounded-lg bg-[#E3B95F]/20 hover:bg-[#E3B95F] hover:text-black text-[#E3B95F] border border-[#E3B95F]/40 flex items-center gap-1 transition font-semibold"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>180°</span>
                </button>
              </div>
            </div>

            {/* Rendu Three.js */}
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none" />

            {/* Sélecteur rapide d'organes (bas) */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap justify-between items-end gap-2 pointer-events-none">
              <button
                onClick={() => e()?.setPreset('escapement')}
                className="pointer-events-auto px-3 py-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-800/50 border border-rose-400/40 text-rose-100 text-xs font-label font-semibold transition flex items-center gap-2 shadow-lg backdrop-blur-sm"
              >
                <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                <span>Plonger sur l&apos;Échappement &amp; l&apos;Ancre</span>
              </button>

              <div className="pointer-events-auto flex flex-wrap justify-end gap-1 max-w-[70%]">
                {ORGAN_PILLS.map((o: any) => (
                  <button
                    key={o.id}
                    onClick={() => setSelected(o.id)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-label transition ${
                      selected === o.id
                        ? 'bg-[#E3B95F] text-black font-bold border-[#E3B95F] shadow'
                        : 'bg-black/55 hover:bg-[#E3B95F] hover:text-black text-[#D7DEE8] border-white/10'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toast de prise en main (fondu auto) */}
            {toastState !== 'gone' && (
              <div
                className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#E3B95F]/40 text-[11px] font-label text-[#F3E5AB] shadow-xl transition-opacity duration-1000 flex items-center gap-2 whitespace-nowrap ${
                  toastState === 'fading' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Pointer className="w-3.5 h-3.5 text-[#E3B95F]" />
                <span>Glissez dans n&apos;importe quelle direction : le calibre tourne librement à 360°, sans butée ni blocage.</span>
              </div>
            )}
          </div>

          {/* -------- DOCK DES 4 CURSEURS INTERACTIFS -------- */}
          <div className={`${CREAM_CARD} rounded-2xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {/* 1 · Curseur temporel d'alternance */}
            <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-[#9C7A43] font-bold flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" />
                  <span>01 · Curseur Temporel d&apos;Alternance (200 ms)</span>
                </span>
                <span className="text-[#171717] dark:text-[#f1ede5] font-bold">{beatLabel}</span>
              </div>
              <input
                id="sliderBeatScrub"
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={scrubVal}
                onInput={(ev) => {
                  e()?.scrubBeat(parseFloat((ev.target as HTMLInputElement).value));
                }}
                onChange={() => {}}
                className="hl-slider w-full"
              />
              <div className="flex items-center justify-between gap-1 pt-1 font-label text-[11px]">
                {[
                  { v: 1.0, l: '1× Temps Réel' },
                  { v: 0.12, l: '0.1× Ralenti' },
                  { v: 0.025, l: 'Micro-Pas' },
                  { v: 0, l: 'Pause / Manuel' },
                ].map((s) => (
                  <button
                    key={s.l}
                    onClick={() => e()?.setSpeed(s.v)}
                    className={`flex-1 py-1 rounded border transition ${
                      speed === s.v
                        ? 'bg-[#9C7A43] text-white border-[#9C7A43] font-bold'
                        : 'bg-[#FAF7F1] dark:bg-[#111419] text-[#57534E] dark:text-[#aaa49a] border-[#D7D0C4] dark:border-[#2a2f36] hover:text-[#171717] dark:text-[#f1ede5]'
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            {/* 2 · Vue éclatée verticale */}
            <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-sky-700 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>02 · Vue Éclatée Verticale (Axe Z — 7 Niveaux)</span>
                </span>
                <span className="text-sky-700 font-bold">{`${explodePct} % ${explodePct === 0 ? '(Assemblé)' : '(Écorché Z)'}`}</span>
              </div>
              <input
                id="sliderExplodeZ"
                type="range"
                min={0}
                max={100}
                step={1}
                value={explodePct}
                onInput={(ev) => e()?.setExplode(parseInt((ev.target as HTMLInputElement).value, 10))}
                onChange={() => {}}
                className="hl-slider w-full"
              />
              <div className="flex justify-between text-[10px] font-label text-[#57534E] dark:text-[#aaa49a] pt-1">
                <span>0% Calibre emboîté</span>
                <button onClick={() => e()?.setExplode(45)} className="text-[#9C7A43] hover:underline">45% Étagement Rouage</button>
                <button onClick={() => e()?.setExplode(100)} className="text-sky-700 hover:underline">100% Écorché Total</button>
              </div>
            </div>

            {/* 3 · Rayon-X des ponts */}
            <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-violet-700 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>03 · Transparence Rayon-X des Ponts &amp; Coq</span>
                </span>
                <span className="text-violet-700 font-bold">{`${xrayPct} %`}</span>
              </div>
              <input
                id="sliderXrayBridges"
                type="range"
                min={0}
                max={100}
                step={1}
                value={xrayPct}
                onInput={(ev) => e()?.setXray(parseInt((ev.target as HTMLInputElement).value, 10))}
                onChange={() => {}}
                className="hl-slider w-full"
              />
              <div className="flex justify-between text-[10px] font-label text-[#57534E] dark:text-[#aaa49a] pt-1">
                <button onClick={() => e()?.setXray(0)} className="hover:text-[#171717] dark:text-[#f1ede5]">0% Ponts Opaques</button>
                <button onClick={() => e()?.setXray(55)} className="text-violet-700 hover:underline">55% Rayon-X Atelier</button>
                <button onClick={() => e()?.setXray(95)} className="hover:text-[#171717] dark:text-[#f1ede5]">95% Rouage Nu</button>
              </div>
            </div>

            {/* 4 · Armage du barillet */}
            <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>04 · Armage du Barillet (Couronne 3h &amp; Cliquet)</span>
                </span>
                <span className="text-emerald-700 font-bold">{`${mainspringPct} % (Couple ${(1.8 + (mainspringPct / 100) * 8.7).toFixed(1)} mN·m)`}</span>
              </div>
              <input
                id="sliderMainspring"
                type="range"
                min={10}
                max={100}
                step={1}
                value={mainspringPct}
                onInput={(ev) => e()?.setMainspring(parseInt((ev.target as HTMLInputElement).value, 10))}
                onChange={() => {}}
                className="hl-slider w-full"
              />
              <div className="flex justify-between text-[10px] font-label text-[#57534E] dark:text-[#aaa49a] pt-1">
                <span>10% Désarmé (Amp. 195°)</span>
                <button onClick={() => e()?.windStep()} className="text-emerald-700 font-semibold hover:underline">+1 Tour de Couronne (Clic !)</button>
                <span>100% Plein Armage (46h)</span>
              </div>
            </div>
          </div>
        </div>

        {/* -------- COLONNE INSPECTEUR : FICHE D'ÉTABLI + ROUAGE -------- */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Fiche d'établi de l'organe sélectionné */}
          <div className={`${CREAM_CARD} rounded-2xl p-5 shadow-sm relative overflow-hidden`}>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#9C7A43]" />

            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-label uppercase tracking-[0.14em] text-[#9C7A43] block">
                  {data.category}
                </span>
                <h2 className="font-display text-xl text-[#171717] dark:text-[#f1ede5] leading-snug mt-1 font-medium">
                  {data.title}
                </h2>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#9C7A43]/10 border border-[#9C7A43]/40 text-[#7C5F33] font-label text-[10px] tracking-[0.16em]">
                  {data.level}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg font-label text-xs font-bold bg-[#F3EFE7] dark:bg-[#171b21] border border-[#9C7A43]/40 text-[#9C7A43] shrink-0">
                {data.gearBadge}
              </span>
            </div>

            <p className="text-[13px] text-[#44403C] dark:text-[#d1cbc1] leading-relaxed mb-4">
              {data.description}
            </p>

            {/* Grille technique (specs d'établi) */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 font-label text-xs">
              <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-2.5">
                <span className="text-[10px] text-[#79716B] dark:text-[#aaa49a] block uppercase tracking-wider">Vitesse &amp; Rapport</span>
                <strong className="text-[#171717] dark:text-[#f1ede5]">{data.speed}</strong>
              </div>
              <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-2.5">
                <span className="text-[10px] text-[#79716B] dark:text-[#aaa49a] block uppercase tracking-wider">Lubrifiant Moebius</span>
                <strong className="text-sky-700">{data.oil}</strong>
              </div>
              <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-2.5">
                <span className="text-[10px] text-[#79716B] dark:text-[#aaa49a] block uppercase tracking-wider">Pique-Huile Bergeon</span>
                <strong className="text-[#7C5F33]">{data.oiler}</strong>
              </div>
              <div className="bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36] rounded-xl p-2.5">
                <span className="text-[10px] text-[#79716B] dark:text-[#aaa49a] block uppercase tracking-wider">Jeu Axial (Ébat NIHS)</span>
                <strong className="text-emerald-700">{data.endshake}</strong>
              </div>
            </div>

            {/* Point critique examen pratique (AFP / CFC) */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 mb-4">
              <div className="text-[11px] font-label uppercase tracking-wider text-rose-700 font-bold mb-1 flex items-center gap-1.5">
                <TriangleAlert className="w-3.5 h-3.5" />
                <span>Point Critique Examen Pratique (AFP / CFC)</span>
              </div>
              <p className="text-xs text-rose-900/90 leading-relaxed">{data.examTrap}</p>
            </div>

            {/* Actions caméra */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => e()?.focusOrgan(selected)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#9C7A43] hover:bg-[#B08D57] text-white font-label text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Centrer la Caméra 3D</span>
              </button>
              <button
                onClick={() => e()?.setPreset('iso')}
                className="py-2 px-3 rounded-xl bg-[#F3EFE7] dark:bg-[#171b21] hover:bg-white text-[#57534E] dark:text-[#aaa49a] border border-[#D7D0C4] dark:border-[#2a2f36] font-label text-xs transition"
              >
                Vue Globale
              </button>
            </div>
          </div>

          {/* Chaîne cinématique interactive */}
          <div className={`${CREAM_CARD} rounded-2xl p-4 shadow-sm`}>
            <div className="flex items-center justify-between border-b border-[#D7D0C4] dark:border-[#2a2f36] pb-2.5 mb-3">
              <h3 className="text-xs font-label uppercase tracking-[0.14em] text-[#9C7A43] font-bold flex items-center gap-2">
                <Cog className="w-4 h-4" />
                <span>Chaîne Cinématique Interactive (ETA 6497-1)</span>
              </h3>
              <span className="text-[10px] font-label text-[#79716B] dark:text-[#aaa49a]">Cliquez une ligne</span>
            </div>

            <div className="space-y-1.5 font-label text-xs">
              {KINEMATIC_TABLE.map((row: any) => (
                <button
                  key={row.organ}
                  onClick={() => setSelected(row.organ)}
                  className={`w-full p-2 rounded-xl border flex items-center justify-between text-left transition ${
                    selected === row.organ ? 'bg-white border-[#9C7A43]/60' : 'bg-[#F3EFE7] dark:bg-[#171b21] border-[#D7D0C4] dark:border-[#2a2f36]/70 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className={`font-bold ${row.accent === 'ruby' ? 'text-rose-700' : row.accent === 'sky' ? 'text-sky-700' : 'text-[#9C7A43]'}`}>
                      {row.num} {row.name}
                    </span>
                    <span className="text-[10px] text-[#79716B] dark:text-[#aaa49a] block">{row.detail}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded bg-white border border-[#D7D0C4] dark:border-[#2a2f36] ${
                    row.accent === 'ruby' ? 'text-rose-700' : row.accent === 'sky' ? 'text-sky-700' : 'text-[#171717] dark:text-[#f1ede5]'
                  }`}>
                    {row.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ================= PIED DE PAGE ================= */}
      <footer className="border-t border-[#D7D0C4] dark:border-[#2a2f36] bg-[#FAF7F1] dark:bg-[#111419] py-3.5 px-5 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#79716B] dark:text-[#aaa49a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9C7A43]" />
            <span>
              <strong className="text-[#171717] dark:text-[#f1ede5]">HorloLearn.ch</strong> — Projet indépendant créé par un passionné d&apos;horlogerie • Écorché Éclaté 3D du Calibre ETA 6497-1.
            </span>
          </div>
          <div className="font-label text-[11px]">
            Modélisation WebGL Three.js procédurale • Engrenages épicycloïdaux, Échappement à ancre suisse &amp; Lubrification Moebius.
          </div>
        </div>
      </footer>

      {/* ================= MODALE D'AIDE (TOUCHE H) ================= */}
      {helpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`${CREAM_CARD} rounded-2xl max-w-xl w-full p-6 shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl font-medium text-[#171717] dark:text-[#f1ede5]">
                Prise en main <span className="text-[#C08A2D]">360°</span> du calibre
              </h3>
              <button
                onClick={() => setHelpOpen(false)}
                className={`w-9 h-9 rounded-lg ${CREAM_CARD} text-[#57534E] dark:text-[#aaa49a] hover:text-[#171717] dark:text-[#f1ede5] flex items-center justify-center transition`}
                aria-label="Fermer l'aide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 font-label text-xs">
              {[
                {
                  icon: <Move className="w-4 h-4 text-[#9C7A43] mt-0.5" />,
                  title: 'Rotation libre 360°',
                  body: 'Glissez avec le clic gauche (ou 1 doigt) dans n\'importe quelle direction : aucune butée, aucun blocage aux pôles grâce au trackball quaternion.',
                },
                {
                  icon: <Hand className="w-4 h-4 text-sky-700 mt-0.5" />,
                  title: 'Déplacer (Pan)',
                  body: 'Maj + glisser, clic droit, clic molette ou glisser à 2 doigts.',
                },
                {
                  icon: <Search className="w-4 h-4 text-emerald-700 mt-0.5" />,
                  title: 'Zoom',
                  body: 'Molette (ou pincer à 2 doigts). De 5 (macro palettes) à 45 (vue d\'ensemble) avec zoom exponentiel progressif.',
                },
                {
                  icon: <RotateCw className="w-4 h-4 text-rose-700 mt-0.5" />,
                  title: 'Pivot écran à 2 doigts',
                  body: 'Tournez deux doigts sur l\'écran : le calibre pivote sur lui-même (rotation en roulis 360°).',
                },
                {
                  icon: <Crosshair className="w-4 h-4 text-[#7C5F33] mt-0.5" />,
                  title: 'Sélection directe',
                  body: 'Un simple clic (ou tap) sur n\'importe quel organe 3D ouvre sa fiche d\'établi. Double-clic : recentrer la vue.',
                },
                {
                  icon: <Keyboard className="w-4 h-4 text-[#9C7A43] mt-0.5" />,
                  title: 'Clavier',
                  body: 'Flèches : rotation fine • + / − : zoom • R : rotation auto • B : retourner 180° • F : plein écran • P : photo PNG • H : cette aide.',
                },
              ].map((row) => (
                <div key={row.title} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F3EFE7] dark:bg-[#171b21] border border-[#D7D0C4] dark:border-[#2a2f36]/70">
                  {row.icon}
                  <div className="text-[#44403C] dark:text-[#d1cbc1] leading-relaxed">
                    <strong className="text-[#171717] dark:text-[#f1ede5]">{row.title}</strong> — {row.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
