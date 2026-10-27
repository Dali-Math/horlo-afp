'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Magnet,
  Droplet,
  Compass,
  Sliders,
  ShieldAlert,
} from 'lucide-react';

type CalibreId = '2824' | '6497';
type PositionId = 'CH' | 'CB' | '6H' | '3H' | '9H' | '12H';
type ScenarioKey =
  | 'healthy'
  | 'beat_error'
  | 'knocking'
  | 'magnetized'
  | 'dry_oil'
  | 'wrong_lift';

interface PositionData {
  id: PositionId;
  label: string;
  name: string;
  rateMod: number;
  ampMod: number;
}

const POSITIONS: Record<PositionId, PositionData> = {
  CH: { id: 'CH', label: 'CH', name: 'Cadran Haut (Plat)', rateMod: 0.0, ampMod: 0 },
  CB: { id: 'CB', label: 'CB', name: 'Cadran Bas (Plat)', rateMod: -1.5, ampMod: -4 },
  '6H': { id: '6H', label: '6H', name: 'Pendant Haut (Vertical)', rateMod: +3.2, ampMod: -22 },
  '3H': { id: '3H', label: '3H', name: 'Pendant Gauche (Vertical)', rateMod: -2.8, ampMod: -25 },
  '9H': { id: '9H', label: '9H', name: 'Pendant Droite (Vertical)', rateMod: +1.5, ampMod: -24 },
  '12H': { id: '12H', label: '12H', name: 'Pendant Bas (Vertical)', rateMod: -4.0, ampMod: -26 },
};

interface ScenarioData {
  id: ScenarioKey;
  title: string;
  badge: string;
  badgeStyle: string;
  rate: number;
  amp: number;
  beat: number;
  noise: number;
  isKnocking: boolean;
  wrongLift: boolean;
  symptom: string;
  remedy: string;
}

const SCENARIOS: Record<ScenarioKey, ScenarioData> = {
  healthy: {
    id: 'healthy',
    title: 'Calibre Réglé aux Normes COSC',
    badge: 'CONFORME ISO 3159',
    badgeStyle: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    rate: 4.0,
    amp: 288,
    beat: 0.1,
    noise: 0.25,
    isKnocking: false,
    wrongLift: false,
    symptom: 'Trace rectiligne ascendante (+4 s/j), points fins et superposés.',
    remedy: 'Marche entre -4 et +6 s/j, repère ≤ 0.4 ms, amplitude horizontale nominale (280°–300°). Aucun ajustement nécessaire.',
  },
  beat_error: {
    id: 'beat_error',
    title: 'Défaut de Repère (2.6 ms)',
    badge: 'BOITEMENT (> 0.6 ms)',
    badgeStyle: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    rate: 3.0,
    amp: 282,
    beat: 2.6,
    noise: 0.3,
    isKnocking: false,
    wrongLift: false,
    symptom: 'Double ligne parallèle très écartée : alternances impaires et paires asymétriques.',
    remedy: 'Faire pivoter le porte-piton mobile pour ramener la cheville de plateau sur la ligne des centres théorique.',
  },
  knocking: {
    id: 'knocking',
    title: 'Rebattement / Galop (> 330°)',
    badge: 'DANGER MÉCANIQUE',
    badgeStyle: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
    rate: 85.0,
    amp: 336,
    beat: 0.3,
    noise: 3.5,
    isKnocking: true,
    wrongLift: false,
    symptom: 'L’ellipse fait plus d’un tour et heurte le dos des cornes d’ancre. Points erratiques et avance brutale.',
    remedy: 'Vérifier la force du ressort-moteur ou corriger un huilage excessif/inadapté sur les palettes d’ancre.',
  },
  magnetized: {
    id: 'magnetized',
    title: 'Spiral Aimanté (+95 s/j)',
    badge: 'CHAMP MAGNÉTIQUE',
    badgeStyle: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    rate: 95.0,
    amp: 228,
    beat: 0.4,
    noise: 0.9,
    isKnocking: false,
    wrongLift: false,
    symptom: 'Pente très raide vers le haut et chute d’amplitude par collage partiel des spires du spiral.',
    remedy: 'Passer le mouvement au démagnétiseur d’établi et inspecter à la loupe 10x l’absence de gouttelette d’huile sur le spiral.',
  },
  dry_oil: {
    id: 'dry_oil',
    title: 'Huile Sèche & Résistance Rouage',
    badge: 'RÉVISION REQUISE',
    badgeStyle: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    rate: -32.0,
    amp: 192,
    beat: 0.9,
    noise: 2.6,
    isKnocking: false,
    wrongLift: false,
    symptom: 'Amplitude inférieure à 200°, retard chronique et trace dispersée en neige.',
    remedy: 'Démontage, nettoyage aux ultrasons et renouvellement des 5 lubrifiants Moebius certifiés (9010, HP-1300, 9415).',
  },
  wrong_lift: {
    id: 'wrong_lift',
    title: 'Erreur d’Angle de Levée (52° au lieu de 44°)',
    badge: 'PIÈGE DE PARAMÉTRAGE',
    badgeStyle: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    rate: 2.0,
    amp: 265,
    beat: 0.2,
    noise: 0.25,
    isKnocking: false,
    wrongLift: true,
    symptom: 'Sur ETA 6497-1 (44°), paramétrer 52° induit une fausse amplitude affichée surévaluée de ~48°.',
    remedy: 'Toujours vérifier l’angle de levée prescrit par la fiche technique : 50° sur ETA 2824-2, 44° sur ETA 6497-1.',
  },
};

interface DotPoint {
  x: number;
  y: number;
  parity: number;
  knocking: boolean;
}

export default function WitschiSimulator() {
  const [calibre, setCalibre] = useState<CalibreId>('2824');
  const [position, setPosition] = useState<PositionId>('CH');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('healthy');

  // Paramètres réglables par curseurs micrométriques
  const [rate, setRate] = useState<number>(4.0);
  const [amp, setAmp] = useState<number>(288);
  const [beat, setBeat] = useState<number>(0.1);
  const [liftAngle, setLiftAngle] = useState<number>(50.0);
  const [trueLift, setTrueLift] = useState<number>(50.0);

  // Audio d'échappement mécanique (Web Audio)
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Canvas trace acoustique
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<DotPoint[]>([]);
  const scanXRef = useRef<number>(24);
  const tickParityRef = useRef<number>(0);
  const lastBeatTimeRef = useRef<number>(0);

  const activePosition = POSITIONS[position];
  const effectiveRate = rate + activePosition.rateMod;
  const rawAmp = amp + activePosition.ampMod;
  const displayedAmp = Math.round(rawAmp * (liftAngle / trueLift));
  const isKnocking = displayedAmp >= 330;

  // Initialisation et boucle de dessin Witschi
  useEffect(() => {
    let animId: number;

    const renderLoop = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          const intervalMs = calibre === '2824' ? 95 : 145;

          if (timestamp - lastBeatTimeRef.current > intervalMs) {
            lastBeatTimeRef.current = timestamp;
            tickParityRef.current = 1 - tickParityRef.current;

            scanXRef.current += 3.8;
            if (scanXRef.current > w - 20) {
              scanXRef.current = 24;
              dotsRef.current = [];
            }

            const centerY = h * 0.52;
            const slopeOffset = -((scanXRef.current - 24) * (effectiveRate * 0.038));
            const beatSplit = (tickParityRef.current === 0 ? -1 : 1) * (beat * 11.5);
            const noise = isKnocking ? 3.5 : displayedAmp < 210 ? 2.2 : 0.25;
            const noiseOffset = (Math.random() - 0.5) * noise * 16;

            let dotY = (centerY + slopeOffset + beatSplit + noiseOffset) % h;
            if (dotY < 15) dotY += h - 30;
            if (dotY > h - 15) dotY -= h - 30;

            dotsRef.current.push({
              x: scanXRef.current,
              y: dotY,
              parity: tickParityRef.current,
              knocking: isKnocking,
            });

            // Son du tic-tac
            if (audioEnabled && audioCtxRef.current) {
              try {
                const actx = audioCtxRef.current;
                const osc = actx.createOscillator();
                const gain = actx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(
                  tickParityRef.current === 1 ? 3150 : 2600,
                  actx.currentTime
                );
                gain.gain.setValueAtTime(0.03, actx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.012);
                osc.connect(gain);
                gain.connect(actx.destination);
                osc.start();
                osc.stop(actx.currentTime + 0.013);
              } catch {
                // ignoré
              }
            }
          }

          // Rendu du fond et de la grille du chrono-comparateur
          ctx.fillStyle = '#06090F';
          ctx.fillRect(0, 0, w, h);

          // Grille métrologique
          ctx.strokeStyle = 'rgba(37, 48, 69, 0.55)';
          ctx.lineWidth = 1;
          for (let x = 24; x < w; x += 48) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = 24; y < h; y += 36) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }

          // Ligne médiane zéro
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(0, h * 0.52);
          ctx.lineTo(w, h * 0.52);
          ctx.stroke();
          ctx.setLineDash([]);

          // Curseur de défilement
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.beginPath();
          ctx.moveTo(scanXRef.current, 0);
          ctx.lineTo(scanXRef.current, h);
          ctx.stroke();

          // Tracé des points acoustiques
          dotsRef.current.forEach((pt) => {
            ctx.fillStyle = pt.knocking
              ? '#F43F5E'
              : pt.parity === 0
              ? '#D4AF37'
              : '#38BDF8';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            if (pt.knocking) {
              ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y + 16, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [calibre, effectiveRate, beat, displayedAmp, isKnocking, audioEnabled]);

  const handleToggleAudio = () => {
    if (!audioEnabled) {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setAudioEnabled(true);
    } else {
      setAudioEnabled(false);
    }
  };

  const handleSelectCalibre = (c: CalibreId) => {
    setCalibre(c);
    if (c === '2824') {
      setTrueLift(50.0);
      setLiftAngle(50.0);
    } else {
      setTrueLift(44.0);
      setLiftAngle(44.0);
    }
    dotsRef.current = [];
    scanXRef.current = 24;
  };

  const handleApplyScenario = (key: ScenarioKey) => {
    setSelectedScenario(key);
    const scen = SCENARIOS[key];
    if (scen.wrongLift) {
      setCalibre('6497');
      setTrueLift(44.0);
      setLiftAngle(52.0); // piège volontaire
    } else if (calibre === '6497') {
      setTrueLift(44.0);
      setLiftAngle(44.0);
    } else {
      setTrueLift(50.0);
      setLiftAngle(50.0);
    }
    setRate(scen.rate);
    setAmp(scen.amp);
    setBeat(scen.beat);
    dotsRef.current = [];
    scanXRef.current = 24;
  };

  const activeScenData = SCENARIOS[selectedScenario];

  return (
    <div className="space-y-6">
      {/* --- BANDEAU DIGITAL WITSCHI WATCH EXPERT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Affichage LCD 4 Cadres */}
        <div className="lg:col-span-8 bg-[#090D14] border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 dark:text-amber-400 font-bold">
                Chrono-Comparateur Witschi Watch Expert — Temps Réel
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition flex items-center gap-1.5 ${
                  audioEnabled
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{audioEnabled ? 'Son Établi Actif' : 'Microphone Muet'}</span>
              </button>

              <button
                onClick={() => {
                  dotsRef.current = [];
                  scanXRef.current = 24;
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-mono transition"
                title="Effacer le tracé"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {/* Marche */}
            <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>MARCHE</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    Math.abs(effectiveRate) <= 6
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : Math.abs(effectiveRate) <= 15
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {Math.abs(effectiveRate) <= 6 ? 'COSC OK' : Math.abs(effectiveRate) <= 15 ? 'TOLÉRÉ' : 'DÉRÉGLÉ'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {effectiveRate >= 0 ? `+${effectiveRate.toFixed(1)}` : effectiveRate.toFixed(1)}{' '}
                <span className="text-xs text-slate-400">s/j</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Cible : -4 à +6 s/j</div>
            </div>

            {/* Amplitude */}
            <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>AMPLITUDE</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isKnocking
                      ? 'bg-rose-500/30 text-rose-300'
                      : displayedAmp >= 260 && displayedAmp <= 315
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {isKnocking ? 'REBATTEMENT' : displayedAmp >= 260 ? 'OPTIMALE' : 'FAIBLE'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
                {displayedAmp}°
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Plage : 260° – 310°</div>
            </div>

            {/* Repère */}
            <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>REPÈRE</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    beat <= 0.6
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {beat <= 0.6 ? '≤ 0.6 ms' : 'HORS NORME'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 mt-1">
                {beat.toFixed(1)} <span className="text-xs text-slate-400">ms</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Tolérance : ≤ 0.4 ms</div>
            </div>

            {/* Angle de Levée & Calibre */}
            <div className="bg-[#0F1623] border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>LEVÉE</span>
                <span className="text-[10px] text-amber-400">
                  {calibre === '2824' ? '28’800 A/h' : '18’000 A/h'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-300 mt-1">
                {liftAngle.toFixed(1)}°
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {calibre === '2824' ? 'ETA 2824-2 (50°)' : 'ETA 6497-1 (44°)'}
              </div>
            </div>
          </div>
        </div>

        {/* Sélection Calibre & 6 Positions d'Examen */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold mb-1.5">
              Calibre d’Établi &amp; Fréquence
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectCalibre('2824')}
                className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold transition ${
                  calibre === '2824'
                    ? 'border-amber-500 bg-slate-900 text-amber-400 shadow'
                    : 'border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                ETA 2824-2 (50° · 4 Hz)
              </button>
              <button
                onClick={() => handleSelectCalibre('6497')}
                className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold transition ${
                  calibre === '6497'
                    ? 'border-amber-500 bg-slate-900 text-amber-400 shadow'
                    : 'border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                ETA 6497-1 (44° · 2.5 Hz)
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
              <span>POSITIONS DE MESURE (NIHS)</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {activePosition.name}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 font-mono text-xs">
              {(['CH', 'CB', '6H', '3H', '9H', '12H'] as PositionId[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`py-2 rounded-lg font-bold transition ${
                    position === p
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- ÉCRAN DU TRACÉ WITSCHI + BANC RÉGLAGE ETACHRON --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Écran graphique Canvas + 6 Scénarios de Panne (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#06090F] border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="px-4 py-2 bg-[#0E1420] border-b border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                DIAGRAMME ACOUSTIQUE (PENTE = MARCHE · ÉCART = REPÈRE)
              </span>
              <span
                className={`font-semibold ${
                  isKnocking
                    ? 'text-rose-400'
                    : beat > 0.8
                    ? 'text-sky-400'
                    : 'text-emerald-400'
                }`}
              >
                {isKnocking
                  ? 'Rebattement (>330°) — Écho erratique'
                  : beat > 0.8
                  ? `Double trace (Repère = ${beat.toFixed(1)} ms)`
                  : `Trace rectiligne (${effectiveRate >= 0 ? '+' : ''}${effectiveRate.toFixed(1)} s/j)`}
              </span>
            </div>

            <div className="p-2 sm:p-3">
              <canvas
                ref={canvasRef}
                width={620}
                height={300}
                className="w-full h-[280px] sm:h-[320px] rounded-xl block"
              />
            </div>
          </div>

          {/* 6 Scénarios de Contrôle d'Établi */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>Diagnostics &amp; Pannes Types d’Établi (Simulation 1-Clic)</span>
              </h3>
              <span className="text-[11px] text-slate-500">Standards Horlogers Suisses</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => {
                const s = SCENARIOS[key];
                const active = selectedScenario === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleApplyScenario(key)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      active
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-slate-900 shadow ring-1 ring-amber-400'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0E14] hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}>
                        {s.title}
                      </span>
                      {key === 'healthy' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {key === 'knocking' && <Flame className="w-3.5 h-3.5 text-rose-500" />}
                      {key === 'magnetized' && <Magnet className="w-3.5 h-3.5 text-amber-500" />}
                      {key === 'dry_oil' && <Droplet className="w-3.5 h-3.5 text-purple-500" />}
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 mt-1">
                      {s.rate >= 0 ? `+${s.rate}` : s.rate} s/j · {s.amp}° · {s.beat} ms
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Réglage Micrométrique ETACHRON & Diagnostic (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  <span>Réglage Micrométrique ETACHRON (Coq)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Corrigez le porte-piton (repère) et la raquette (marche)
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-amber-400">
                {calibre === '2824' ? 'ETA 2824-2' : 'ETA 6497-1'}
              </span>
            </div>

            {/* Schéma SVG Vectoriel du Coq Etachron */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 flex items-center justify-center">
              <svg viewBox="0 0 320 180" className="w-full max-w-[280px] h-auto">
                {/* Corps du Coq */}
                <path
                  d="M 35 90 C 35 30, 145 15, 285 55 L 285 125 C 145 165, 35 150, 35 90 Z"
                  fill="#1E293B"
                  stroke="#64748B"
                  strokeWidth="2"
                />
                <text x="235" y="52" fill="#10B981" fontFamily="monospace" fontSize="14" fontWeight="bold">
                  +
                </text>
                <text x="235" y="138" fill="#F43F5E" fontFamily="monospace" fontSize="14" fontWeight="bold">
                  -
                </text>
                <path
                  d="M 225 58 A 45 45 0 0 1 225 122"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Porte-Piton (Repère) */}
                <g transform={`translate(110, 90) rotate(${(beat * 7).toFixed(1)})`}>
                  <line x1="0" y1="0" x2="-62" y2="-28" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="-62" cy="-28" r="9" fill="#0284C7" stroke="#E0F2FE" strokeWidth="2" />
                  <text x="-62" y="-42" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="8">
                    PORTE-PITON
                  </text>
                </g>

                {/* Raquette Etachron (Marche) */}
                <g transform={`translate(110, 90) rotate(${(-effectiveRate * 0.25).toFixed(1)})`}>
                  <line x1="0" y1="0" x2="108" y2="0" stroke="#D4AF37" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="95" cy="0" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                  <line x1="90" y1="0" x2="100" y2="0" stroke="#713F12" strokeWidth="2" />
                  <text x="95" y="-14" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="8">
                    RAQUETTE
                  </text>
                </g>

                {/* Incabloc central */}
                <circle cx="110" cy="90" r="22" fill="#334155" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="110" cy="90" r="11" fill="#E11D48" stroke="#FDA4AF" strokeWidth="1.5" />
                <path
                  d="M 96 84 Q 110 72 124 84 M 96 96 Q 110 108 124 96"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            {/* Curseur 1 : Porte-Piton (Repère) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-sky-600 dark:text-sky-300">
                  1. Porte-Piton (Corrige le Repère)
                </span>
                <span className="font-mono font-bold text-sky-500">{beat.toFixed(1)} ms</span>
              </div>
              <input
                type="range"
                min="0"
                max="4.0"
                step="0.1"
                value={beat}
                onChange={(e) => setBeat(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.0 ms (Ligne fusionnée)</span>
                <span>Max : 0.4 ms</span>
                <span>4.0 ms (Écarté)</span>
              </div>
            </div>

            {/* Curseur 2 : Raquette (Marche Diurne) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  2. Raquette Etachron (Corrige la Marche)
                </span>
                <span className="font-mono font-bold text-amber-500">
                  {rate >= 0 ? `+${rate}` : rate} s/j
                </span>
              </div>
              <input
                type="range"
                min="-60"
                max="100"
                step="1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>-60 s/j (Descend)</span>
                <span>0 s/j (Horizontal)</span>
                <span>+100 s/j (Monte)</span>
              </div>
            </div>

            {/* Curseur 3 : Amplitude / Lubrification */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  3. Amplitude du Balancier
                </span>
                <span className="font-mono font-bold text-emerald-500">{amp}°</span>
              </div>
              <input
                type="range"
                min="170"
                max="345"
                step="1"
                value={amp}
                onChange={(e) => setAmp(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>170° (Huile sèche)</span>
                <span>280°–300° (Idéal)</span>
                <span>335°+ (Rebattement !)</span>
              </div>
            </div>
          </div>

          {/* Fiche Diagnostic et Remède d'Atelier */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Interprétation Chronométrique d’Établi</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${activeScenData.badgeStyle}`}>
                {activeScenData.badge}
              </span>
            </div>

            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {activeScenData.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Lecture écran :</strong> {activeScenData.symptom}
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong className="font-bold text-amber-700 dark:text-amber-300">Action d’Établi : </strong>
              {activeScenData.remedy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
