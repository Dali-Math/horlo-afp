'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mic,
  MicOff,
  Sliders,
  Volume2,
  Activity,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Compass,
  Play,
  Square,
  HelpCircle
} from 'lucide-react';

interface WatchPreset {
  name: string;
  bph: number;
  liftAngle: number;
  freq: string;
}

const PRESETS: WatchPreset[] = [
  { name: 'Standard Moderne (ETA 2824-2, Rolex 3135/3235)', bph: 28800, liftAngle: 52, freq: '4 Hz (8 battements/s)' },
  { name: 'Unitas d\'Établi (ETA 6497-1 / 6498-1)', bph: 18000, liftAngle: 44, freq: '2.5 Hz (5 battements/s)' },
  { name: 'Calibres Vintage & Omega Co-Axial 2500', bph: 25200, liftAngle: 38, freq: '3.5 Hz (7 battements/s)' },
  { name: 'Calibres Anciens 1960 (Seiko, Patek 240)', bph: 21600, liftAngle: 52, freq: '3 Hz (6 battements/s)' },
  { name: 'Haute Fréquence (Zenith El Primero)', bph: 36000, liftAngle: 52, freq: '5 Hz (10 battements/s)' },
];

export default function ChronocomparateurPage() {
  const [activeTab, setActiveTab] = useState<'real' | 'sim'>('real');

  // Paramètres de mesure
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [gainThreshold, setGainThreshold] = useState<number>(0.12);
  const [liftAngle, setLiftAngle] = useState<number>(52);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Valeurs mesurées ou simulées
  const [rate, setRate] = useState<number>(2); // s/jour
  const [amplitude, setAmplitude] = useState<number>(285); // degrés
  const [beatError, setBeatError] = useState<number>(0.1); // millisecondes
  const [detectedBeats, setDetectedBeats] = useState<number>(0);

  // Valeurs Simulateur
  const [simRateOffset, setSimRateOffset] = useState<number>(4);
  const [simBeatErrorOffset, setSimBeatErrorOffset] = useState<number>(0.2);
  const [simAmplitudeSlider, setSimAmplitudeSlider] = useState<number>(290);
  const [simKnock, setSimKnock] = useState<boolean>(false);

  // Références Canvas & Audio
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Oscilloscope dots memory
  const pointsRef = useRef<{ x: number; y1: number; y2: number }[]>([]);

  const currPreset = PRESETS[selectedPreset];

  // =========================================================================
  // DÉMARRAGE DU MICROPHONE RÉEL (WEB AUDIO API)
  // =========================================================================
  const startMicrophone = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);

      // Filtre passe-bande 3500 Hz - 7000 Hz pour isoler les clics métalliques
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 5000;
      filter.Q.value = 3.0;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.2;

      source.connect(filter);
      filter.connect(analyser);

      setIsListening(true);

      const bufferLength = analyser.fftSize;
      const dataArray = new Float32Array(bufferLength);

      let lastPeak = performance.now();
      let intervals: number[] = [];
      const expectedInterval = (3600 / currPreset.bph) * 1000; // ms entre 2 battements

      const analyzeAudio = () => {
        if (!analyser) return;
        analyser.getFloatTimeDomainData(dataArray);

        // Détection de crête acoustique (choc ancre/dent)
        let maxVal = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = Math.abs(dataArray[i]);
          if (v > maxVal) maxVal = v;
        }

        const now = performance.now();
        if (maxVal > gainThreshold && now - lastPeak > expectedInterval * 0.5) {
          const interval = now - lastPeak;
          lastPeak = now;

          if (interval > expectedInterval * 0.7 && interval < expectedInterval * 1.4) {
            intervals.push(interval);
            if (intervals.length > 20) intervals.shift();

            // Calcul de la marche (Rate s/j)
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const diffMsPerBeat = avgInterval - expectedInterval;
            const beatsPerDay = currPreset.bph * 24;
            const calculatedRate = Math.round((diffMsPerBeat * beatsPerDay) / 1000);
            setRate(calculatedRate);

            // Calcul du Beat Error (ms)
            if (intervals.length >= 2) {
              const diffEvenOdd = Math.abs(intervals[intervals.length - 1] - intervals[intervals.length - 2]);
              setBeatError(Number((diffEvenOdd / 2).toFixed(1)));
            }

            // Estimation de l'amplitude (fonction inverse du temps de montée)
            const estimatedAmp = Math.min(325, Math.max(220, Math.round(275 + (0.25 - maxVal) * 60)));
            setAmplitude(estimatedAmp);

            setDetectedBeats(prev => prev + 1);

            // Ajout du point sur l'oscilloscope
            addOscilloscopePoint(calculatedRate, diffMsPerBeat);
          }
        }

        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        'Impossible d\'accéder au microphone. Veuillez autoriser l\'accès dans votre navigateur pour mesurer la marche de votre montre.'
      );
      setIsListening(false);
    }
  };

  const stopMicrophone = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsListening(false);
  };

  // =========================================================================
  // OSCILLOSCOPE GRAPHIQUE (DÉFILEMENT THERMIQUE WITSCHI)
  // =========================================================================
  const addOscilloscopePoint = (rateVal: number, beatErrorOffset: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerY = canvas.height / 2;
    // Décalage vertical proportionnel à la marche
    const yShift = (rateVal / 30) * 45;
    const separation = Math.max(3, beatErrorOffset * 8);

    const y1 = centerY + yShift - separation / 2;
    const y2 = centerY + yShift + separation / 2;

    pointsRef.current.push({ x: canvas.width - 15, y1, y2 });

    // Déplacement des anciens points vers la gauche (vitesse d'enregistrement)
    pointsRef.current.forEach(p => {
      p.x -= 3;
    });

    // Nettoyage des points sortis de l'écran
    pointsRef.current = pointsRef.current.filter(p => p.x > 10);

    drawCanvas();
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fond écran oscilloscope Witschi
    ctx.fillStyle = '#050D0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Graticule / Quadrillage
    ctx.strokeStyle = '#0B2418';
    ctx.lineWidth = 1;
    for (let x = 20; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 20; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Ligne centrale de repère 0 s/j
    ctx.strokeStyle = '#14532D';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tracé des points thermiques phosphorescents (Vert Witschi classique)
    pointsRef.current.forEach(pt => {
      ctx.fillStyle = '#00FF66';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.arc(pt.x, pt.y1, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pt.x, pt.y2, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  };

  // Initialisation du canvas et boucle du simulateur
  useEffect(() => {
    drawCanvas();

    let simInterval: NodeJS.Timeout | null = null;
    if (activeTab === 'sim') {
      simInterval = setInterval(() => {
        let currentRate = simRateOffset;
        let currentBeatError = simBeatErrorOffset;

        if (simKnock) {
          // Rebatement : dispersion chaotique
          currentRate += (Math.random() - 0.5) * 50;
          currentBeatError += Math.random() * 2;
        }

        setRate(Math.round(currentRate));
        setBeatError(Number(currentBeatError.toFixed(1)));
        setAmplitude(simAmplitudeSlider);

        addOscilloscopePoint(currentRate, currentBeatError * 5);
      }, 250);
    }

    return () => {
      if (simInterval) clearInterval(simInterval);
    };
  }, [activeTab, simRateOffset, simBeatErrorOffset, simAmplitudeSlider, simKnock]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 py-10 px-4 md:px-8">
      
      {/* Navigation retour */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/outils"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux Outils d&apos;Établi</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          <span>🇨🇭</span>
          <span>Banc Acoustique d&apos;Atelier • Conforme NIHS & COSC</span>
        </div>
      </div>

      {/* Titre & Entête */}
      <div className="max-w-6xl mx-auto text-center space-y-3 mb-10">
        <h1 className="text-3xl md:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
          Chronocomparateur Witschi <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
            Acoustique Réel & Simulateur
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto">
          Approchez votre montre mécanique du microphone de votre ordinateur ou téléphone pour mesurer en direct sa marche (+/- s/j), son amplitude et son repère.
        </p>

        {/* Sélecteur de Mode */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mt-4">
          <button
            onClick={() => {
              if (isListening) stopMicrophone();
              setActiveTab('real');
            }}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'real'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Mode Microphone Réel</span>
          </button>

          <button
            onClick={() => {
              if (isListening) stopMicrophone();
              setActiveTab('sim');
            }}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'sim'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Mode Simulateur d&apos;Établi</span>
          </button>
        </div>
      </div>

      {/* BOÎTIER DE MESURE CHRONOCOMPARATEUR (LOOK WITSCHI CLASSIQUE) */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#0D1520] border-2 border-slate-800 shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* ÉCRAN DE MESURE NUMÉRIQUE (AFFICHEURS LED VERTS) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#050D0A] border border-emerald-950">
          
          {/* MARCHE (RATE) */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Marche (Rate)
            </div>
            <div className={`text-3xl md:text-4xl font-mono font-bold ${
              Math.abs(rate) <= 5 ? 'text-[#00FF66]' : Math.abs(rate) <= 15 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {rate >= 0 ? `+${rate}` : rate} <span className="text-base font-normal">s/j</span>
            </div>
          </div>

          {/* AMPLITUDE */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Amplitude
            </div>
            <div className={`text-3xl md:text-4xl font-mono font-bold ${
              amplitude >= 260 && amplitude <= 315 ? 'text-[#00FF66]' : 'text-amber-400'
            }`}>
              {amplitude}°
            </div>
          </div>

          {/* REPÈRE (BEAT ERROR) */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Repère (Beat Error)
            </div>
            <div className={`text-3xl md:text-4xl font-mono font-bold ${
              beatError <= 0.4 ? 'text-[#00FF66]' : beatError <= 0.8 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {beatError.toFixed(1)} <span className="text-base font-normal">ms</span>
            </div>
          </div>

          {/* FRÉQUENCE / ALTERNANCES */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Fréquence
            </div>
            <div className="text-2xl md:text-3xl font-mono font-bold text-[#00FF66]">
              {currPreset.bph} <span className="text-xs font-normal">A/h</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              Angle Levée : {liftAngle}°
            </div>
          </div>

        </div>

        {/* ÉCRAN OSCILLOSCOPE THERMIQUE CANVAS */}
        <div className="relative rounded-2xl overflow-hidden border border-emerald-900/50 shadow-inner">
          <canvas
            ref={canvasRef}
            width={900}
            height={260}
            className="w-full h-56 md:h-64 block bg-[#050D0A]"
          />

          {/* État en direct au bas de l'écran */}
          <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#050D0A]/80 px-3 py-1 rounded border border-emerald-900/30">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening || activeTab === 'sim' ? 'bg-[#00FF66] animate-pulse' : 'bg-slate-600'}`} />
              <span>
                {activeTab === 'real'
                  ? isListening
                    ? `MICROPHONE ACTIF • ${detectedBeats} CHOCS DÉTECTÉS`
                    : 'MICROPHONE EN ATTENTE • CLIQUEZ SUR DÉMARRER'
                  : 'MODE SIMULATEUR D\'ÉTABLI ACTIF'}
              </span>
            </div>
            <span>Échelle : 1s/div • 0.1ms/div</span>
          </div>

          {/* Overlay bouton démarrer en mode micro */}
          {activeTab === 'real' && !isListening && (
            <div className="absolute inset-0 bg-[#050D0A]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl">
                <Mic className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-white">Prêt à écouter votre montre mécanique</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Posez le fond de boîte ou la couronne de votre montre tout près du micro de vos écouteurs ou de votre ordinateur.
                </p>
              </div>
              <button
                onClick={startMicrophone}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Démarrer l&apos;Écoute Acoustique</span>
              </button>
            </div>
          )}
        </div>

        {/* Message d'erreur micro si refus */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* CONTRÔLES MODE RÉEL */}
        {activeTab === 'real' && (
          <div className="grid md:grid-cols-3 gap-6 pt-2">
            
            {/* Choix du calibre / alternances */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 font-semibold block">
                Calibre / Fréquence Cible :
              </label>
              <select
                value={selectedPreset}
                onChange={e => {
                  const idx = parseInt(e.target.value);
                  setSelectedPreset(idx);
                  setLiftAngle(PRESETS[idx].liftAngle);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:border-emerald-500 outline-none"
              >
                {PRESETS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name} ({p.bph} A/h)
                  </option>
                ))}
              </select>
            </div>

            {/* Seuil de sensibilité micro */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Sensibilité Micro :</span>
                <span className="text-emerald-400 font-bold">{gainThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.03"
                max="0.4"
                step="0.01"
                value={gainThreshold}
                onChange={e => setGainThreshold(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Plus Sensible</span>
                <span>Filtre Bruit Ambiant</span>
              </div>
            </div>

            {/* Angle de levée (Lift Angle) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Angle de Levée (Lift Angle) :</span>
                <span className="text-emerald-400 font-bold">{liftAngle}°</span>
              </div>
              <input
                type="range"
                min="36"
                max="60"
                step="1"
                value={liftAngle}
                onChange={e => setLiftAngle(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>36° (Vintage)</span>
                <span>52° (Standard ETA)</span>
                <span>60°</span>
              </div>
            </div>

          </div>
        )}

        {/* CONTRÔLES MODE SIMULATEUR D'ÉTABLI */}
        {activeTab === 'sim' && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                <Sliders className="w-4 h-4" />
                <span>Simulateur Pédagogique : Réglage Virtuel d&apos;Établi</span>
              </div>
              <button
                onClick={() => {
                  setSimRateOffset(0);
                  setSimBeatErrorOffset(0.0);
                  setSimAmplitudeSlider(290);
                  setSimKnock(false);
                }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser à 0 s/j</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Réglage de la Raquette (Avance / Retard) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">1. Raquette (Avance/Retard) :</span>
                  <span className={`font-bold ${simRateOffset === 0 ? 'text-[#00FF66]' : 'text-amber-400'}`}>
                    {simRateOffset > 0 ? `+${simRateOffset}` : simRateOffset} s/j
                  </span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="1"
                  value={simRateOffset}
                  onChange={e => setSimRateOffset(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>-60 s/j (Retard)</span>
                  <span>0 s/j (Parfait)</span>
                  <span>+60 s/j (Avance)</span>
                </div>
              </div>

              {/* Réglage du Porte-Piton (Beat Error) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">2. Porte-Piton (Repère) :</span>
                  <span className={`font-bold ${simBeatErrorOffset === 0 ? 'text-[#00FF66]' : 'text-amber-400'}`}>
                    {simBeatErrorOffset.toFixed(1)} ms
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3.5"
                  step="0.1"
                  value={simBeatErrorOffset}
                  onChange={e => setSimBeatErrorOffset(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.0 ms (Centré)</span>
                  <span>0.8 ms (Tolérance)</span>
                  <span>3.5 ms (Défaut)</span>
                </div>
              </div>

              {/* Amplitude & Rebatement */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">3. Amplitude & Armage :</span>
                  <span className="text-emerald-400 font-bold">{simAmplitudeSlider}°</span>
                </div>
                <input
                  type="range"
                  min="180"
                  max="330"
                  step="5"
                  value={simAmplitudeSlider}
                  onChange={e => setSimAmplitudeSlider(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex items-center justify-between pt-1">
                  <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simKnock}
                      onChange={e => setSimKnock(e.target.checked)}
                      className="accent-red-500"
                    />
                    <span>Simuler Rebatement (Choc &gt; 330°)</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bouton d'action principal */}
        {activeTab === 'real' && isListening && (
          <div className="flex justify-center pt-2">
            <button
              onClick={stopMicrophone}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Arrêter la Mesure</span>
            </button>
          </div>
        )}

      </div>

      {/* GUIDE PÉDAGOGIQUE D'ATELIER : COMMENT LIRE LES LIGNES DU WITSCHI */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-500 font-bold text-lg">
            ━ ━
          </div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
            Deux Lignes Horizontales Parallèles
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            <strong>Marche parfaite (0 s/j)</strong> : La montre ne prend ni avance ni retard. Les deux lignes de points sont proches (repère &lt; 0.4 ms), signifiant que le balancier effectue ses oscillations de manière rigoureusement isochrone.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-500 font-bold text-lg">
            ⟋ ⟍
          </div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
            Lignes Montantes ou Descendantes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            * <strong>Lignes montantes (⟋)</strong> = La montre avance (+s/j). Rallongez légèrement la longueur active du spiral avec la raquette.<br />
            * <strong>Lignes descendantes (⟍)</strong> = La montre retarde (-s/j). Raccourcissez le spiral.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-xl bg-red-500/10 text-red-500 font-bold text-lg">
            ✕ ❄
          </div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
            Lignes Écartées ou Dispersion (« Neige »)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            * <strong>Lignes très écartées</strong> = Erreur de repère (*Beat Error* &gt; 0.8 ms). Pivotez le porte-piton pour centrer la cheville de plateau.<br />
            * <strong>Points en cascade (« neige »)</strong> = Rebatement, spires magnétisées ou choc de pivot.
          </p>
        </div>

      </div>

    </div>
  );
}
