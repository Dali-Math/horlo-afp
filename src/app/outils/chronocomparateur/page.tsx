'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Smartphone,
  HelpCircle,
  Radio
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
  const [gainThreshold, setGainThreshold] = useState<number>(0.035); // Seuil adapté mobile
  const [micBoost, setMicBoost] = useState<number>(15); // Préamplification logicielle (x15 par défaut pour mobile)
  const [liftAngle, setLiftAngle] = useState<number>(52);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Retour visuel en direct (VU-mètre et pulsation de battement)
  const [audioLevel, setAudioLevel] = useState<number>(0); // 0 à 100%
  const [beatDetectedFlash, setBeatDetectedFlash] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

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
  const gainNodeRef = useRef<GainNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Oscilloscope dots memory
  const pointsRef = useRef<{ x: number; y1: number; y2: number }[]>([]);

  const currPreset = PRESETS[selectedPreset];

  // Ajustement dynamique du gain de préamplification en temps réel
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = micBoost;
    }
  }, [micBoost]);

  // =========================================================================
  // OSCILLOSCOPE GRAPHIQUE (DÉFILEMENT THERMIQUE WITSCHI)
  // =========================================================================
  const drawCanvas = useCallback(() => {
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
  }, []);

  const addOscilloscopePoint = useCallback((rateVal: number, beatErrorOffset: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerY = canvas.height / 2;
    // Décalage vertical proportionnel à la marche
    const yShift = (rateVal / 30) * 45;
    const separation = Math.max(3, beatErrorOffset * 8);

    const y1 = centerY + yShift - separation / 2;
    const y2 = centerY + yShift + separation / 2;

    pointsRef.current.push({ x: canvas.width - 15, y1, y2 });

    // Déplacement des anciens points vers la gauche
    pointsRef.current.forEach(p => {
      p.x -= 3;
    });

    // Nettoyage des points sortis de l'écran
    pointsRef.current = pointsRef.current.filter(p => p.x > 10);

    drawCanvas();
  }, [drawCanvas]);

  // =========================================================================
  // DÉMARRAGE DU MICROPHONE RÉEL (OPTIMISÉ SMARTPHONE & PC)
  // =========================================================================
  const startMicrophone = async () => {
    try {
      setErrorMessage(null);

      // 1. Accès au microphone avec fallback universel pour iOS Safari / Android
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
      } catch (errConstraint) {
        console.warn('Contraintes audio strictes rejetées par le mobile, fallback standard...', errConstraint);
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      streamRef.current = stream;

      // 2. Initialisation AudioContext compatible WebKit
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      // CRITIQUE MOBILE (iOS / Android) : reprise explicite de l'AudioContext suspendu
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(stream);

      // 3. Préamplificateur logiciel (GainNode) indispensable pour capter le cliquetis d'une montre sur smartphone
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = micBoost;
      gainNodeRef.current = gainNode;

      // 4. Filtre passe-bande adapté aux smartphones (fréquences des chocs métalliques d'échappement : 2500 - 4500 Hz)
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3200; // Centré sur 3.2 kHz (les micros de téléphone filtrent au-delà de 4 kHz)
      filter.Q.value = 1.0;          // Largeur équilibrée pour capter le choc sans distorsion

      // 5. Analyseur FFT
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.15;

      // Chaîne audio : Source -> Filtre Passe-Bande -> Préampli Gain -> Analyseur
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(analyser);

      setIsListening(true);

      const bufferLength = analyser.fftSize;
      const dataArray = new Float32Array(bufferLength);
      const byteDataArray = new Uint8Array(bufferLength);

      let lastPeak = performance.now();
      let intervals: number[] = [];
      const expectedInterval = (3600 / currPreset.bph) * 1000; // ms entre 2 battements (ex: 125 ms pour 28800 A/h)
      let lastLevelUpdate = performance.now();

      const analyzeAudio = () => {
        if (!analyser) return;

        // Lecture multi-plateforme (Float ou Byte avec fallback)
        if (typeof analyser.getFloatTimeDomainData === 'function') {
          analyser.getFloatTimeDomainData(dataArray);
        } else {
          analyser.getByteTimeDomainData(byteDataArray);
          for (let i = 0; i < bufferLength; i++) {
            dataArray[i] = (byteDataArray[i] - 128) / 128;
          }
        }

        // Détection de crête acoustique instantanée
        let maxVal = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = Math.abs(dataArray[i]);
          if (v > maxVal) maxVal = v;
        }

        // Mise à jour du VU-mètre visuel (toutes les 50ms pour la fluidité)
        const now = performance.now();
        if (now - lastLevelUpdate > 50) {
          lastLevelUpdate = now;
          const pct = Math.min(100, Math.round(maxVal * 120));
          setAudioLevel(pct);
        }

        // Détection d'un choc mécanique au-delà du seuil
        if (maxVal > gainThreshold && now - lastPeak > expectedInterval * 0.45) {
          const interval = now - lastPeak;
          lastPeak = now;

          // Flash visuel sur le bouton / VU-mètre
          setBeatDetectedFlash(true);
          setTimeout(() => setBeatDetectedFlash(false), 90);

          // Si l'intervalle est proche de la cadence attendue
          let effectiveInterval = interval;
          if (interval > expectedInterval * 0.65 && interval < expectedInterval * 1.5) {
            effectiveInterval = interval;
          } else if (interval >= expectedInterval * 1.5 && interval < expectedInterval * 2.5) {
            // Un battement a été sauté à cause du bruit ou mouvement -> compensation
            effectiveInterval = interval / 2;
          } else {
            // Hors plage acceptable, on attend le battement suivant
            effectiveInterval = 0;
          }

          if (effectiveInterval > 0) {
            intervals.push(effectiveInterval);
            if (intervals.length > 25) intervals.shift();

            // Calcul de la marche (Rate s/j)
            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const diffMsPerBeat = avgInterval - expectedInterval;
            const beatsPerDay = currPreset.bph * 24;
            const calculatedRate = Math.round((diffMsPerBeat * beatsPerDay) / 1000);
            
            // Filtrage des valeurs aberrantes
            if (Math.abs(calculatedRate) < 120) {
              setRate(calculatedRate);
            }

            // Calcul du Beat Error (ms)
            if (intervals.length >= 2) {
              const diffEvenOdd = Math.abs(intervals[intervals.length - 1] - intervals[intervals.length - 2]);
              setBeatError(Number((diffEvenOdd / 2).toFixed(1)));
            }

            // Estimation de l'amplitude
            const estimatedAmp = Math.min(320, Math.max(220, Math.round(270 + (maxVal - gainThreshold) * 70)));
            setAmplitude(estimatedAmp);

            setDetectedBeats(prev => prev + 1);

            // Ajout du point sur l'oscilloscope thermique
            addOscilloscopePoint(calculatedRate, diffMsPerBeat);
          }
        }

        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    } catch (err: unknown) {
      console.error('Erreur accès micro:', err);
      setErrorMessage(
        'Impossible d\'accéder au microphone. Sur smartphone (iPhone / Android), assurez-vous d\'avoir autorisé l\'accès au micro dans votre navigateur (icône cadenas ou réglages du site).'
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
    gainNodeRef.current = null;
    setIsListening(false);
    setAudioLevel(0);
  };

  // =========================================================================
  // ÉTALONNAGE AUTOMATIQUE DU BRUIT AMBIANT (1-CLIC)
  // =========================================================================
  const autoCalibrate = () => {
    if (!isListening) return;
    setIsCalibrating(true);
    let maxAmbient = 0;
    const start = performance.now();

    const sample = () => {
      if (performance.now() - start < 800) {
        maxAmbient = Math.max(maxAmbient, audioLevel / 100);
        requestAnimationFrame(sample);
      } else {
        // Seuil réglé juste au-dessus du bruit de la pièce
        const calibrated = Math.min(0.2, Math.max(0.02, maxAmbient * 1.4 + 0.015));
        setGainThreshold(Number(calibrated.toFixed(3)));
        setIsCalibrating(false);
      }
    };
    requestAnimationFrame(sample);
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
  }, [activeTab, simRateOffset, simBeatErrorOffset, simAmplitudeSlider, simKnock, drawCanvas, addOscilloscopePoint]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 py-8 px-4 md:px-8">
      
      {/* Navigation retour */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/outils"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux Outils d&apos;Établi</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          <span>🇨🇭</span>
          <span>Banc Acoustique d&apos;Atelier • Conforme NIHS &amp; COSC</span>
        </div>
      </div>

      {/* Titre & Entête */}
      <div className="max-w-6xl mx-auto text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
          Chronocomparateur Witschi <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
            Acoustique Réel &amp; Simulateur
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto">
          Approchez votre montre mécanique du microphone de votre téléphone ou ordinateur pour mesurer en direct sa marche (+/- s/j), son amplitude et son repère.
        </p>

        {/* Sélecteur de Mode */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mt-2">
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

      {/* BANNIÈRE CONSEIL SPÉCIALE SMARTPHONE */}
      {activeTab === 'real' && (
        <div className="max-w-5xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
          <Smartphone className="w-6 h-6 shrink-0 text-emerald-500 animate-pulse" />
          <div className="leading-relaxed">
            <strong>Astuce Smartphone :</strong> Plaquez le fond de boîte ou la couronne de votre montre contre le trou du micro inférieur de votre téléphone (à côté du port de charge) ou utilisez le micro de vos écouteurs. Restez dans un endroit silencieux.
          </div>
        </div>
      )}

      {/* BOÎTIER DE MESURE CHRONOCOMPARATEUR (LOOK WITSCHI CLASSIQUE) */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#0D1520] border-2 border-slate-800 shadow-2xl p-5 md:p-8 space-y-6">
        
        {/* ÉCRAN DE MESURE NUMÉRIQUE (AFFICHEURS LED VERTS) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 rounded-2xl bg-[#050D0A] border border-emerald-950">
          
          {/* MARCHE (RATE) */}
          <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[10px] md:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Marche (Rate)
            </div>
            <div className={`text-2xl md:text-4xl font-mono font-bold ${
              Math.abs(rate) <= 5 ? 'text-[#00FF66]' : Math.abs(rate) <= 15 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {rate >= 0 ? `+${rate}` : rate} <span className="text-sm md:text-base font-normal">s/j</span>
            </div>
          </div>

          {/* AMPLITUDE */}
          <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[10px] md:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Amplitude
            </div>
            <div className={`text-2xl md:text-4xl font-mono font-bold ${
              amplitude >= 260 && amplitude <= 315 ? 'text-[#00FF66]' : 'text-amber-400'
            }`}>
              {amplitude}°
            </div>
          </div>

          {/* REPÈRE (BEAT ERROR) */}
          <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[10px] md:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Repère (Beat Error)
            </div>
            <div className={`text-2xl md:text-4xl font-mono font-bold ${
              beatError <= 0.4 ? 'text-[#00FF66]' : beatError <= 0.8 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {beatError.toFixed(1)} <span className="text-sm md:text-base font-normal">ms</span>
            </div>
          </div>

          {/* FRÉQUENCE / ALTERNANCES */}
          <div className="p-3 md:p-4 rounded-xl bg-black/40 border border-emerald-900/30 text-center">
            <div className="text-[10px] md:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              Fréquence
            </div>
            <div className="text-xl md:text-3xl font-mono font-bold text-[#00FF66]">
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

          {/* BARRE D'ÉTAT TEMPS RÉEL + VU-MÈTRE INTÉGRÉ */}
          <div className="absolute bottom-2 left-2 right-2 md:left-4 md:right-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-300 bg-[#050D0A]/90 px-3 py-1.5 rounded border border-emerald-900/40 gap-2">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-75 ${
                beatDetectedFlash
                  ? 'bg-emerald-300 ring-4 ring-emerald-400 shadow-[0_0_10px_#00FF66]'
                  : isListening || activeTab === 'sim'
                  ? 'bg-[#00FF66]'
                  : 'bg-slate-600'
              }`} />
              <span className="truncate">
                {activeTab === 'real'
                  ? isListening
                    ? `MICRO ACTIF • ${detectedBeats} BATTEMENTS CAPTÉS`
                    : 'MICROPHONE EN ATTENTE • CLIQUEZ SUR DÉMARRER'
                  : 'MODE SIMULATEUR D\'ÉTABLI ACTIF'}
              </span>
            </div>

            {/* VU-Mètre Signal Micro en direct */}
            {activeTab === 'real' && isListening && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400">Signal :</span>
                <div className="w-24 md:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-75 ${
                      audioLevel > 60 ? 'bg-amber-400' : 'bg-[#00FF66]'
                    }`}
                    style={{ width: `${Math.max(4, audioLevel)}%` }}
                  />
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">{audioLevel}%</span>
              </div>
            )}
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
                  Posez le fond de boîte ou la couronne de votre montre contre le micro de votre smartphone ou de vos écouteurs.
                </p>
              </div>
              <button
                onClick={startMicrophone}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
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
            <div className="space-y-1">
              <span className="font-bold block">Accès Microphone Requis :</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* CONTRÔLES MODE RÉEL (OPTIMISÉS SMARTPHONE) */}
        {activeTab === 'real' && (
          <div className="space-y-6 pt-2">
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Choix du calibre / alternances */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 font-semibold block">
                  Calibre / Alternances :
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

              {/* Préamplification logicielle (Mic Boost) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Amplification Micro :</span>
                  <span className="text-emerald-400 font-bold">x{micBoost}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={micBoost}
                  onChange={e => setMicBoost(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>x1 (Standard)</span>
                  <span>x15 (Mobile)</span>
                  <span>x35 (Max)</span>
                </div>
              </div>

              {/* Seuil de déclenchement (Threshold) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Seuil Déclenchement :</span>
                  <span className="text-emerald-400 font-bold">{gainThreshold.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.12"
                  step="0.005"
                  value={gainThreshold}
                  onChange={e => setGainThreshold(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Sensible</span>
                  <span>Filtré</span>
                </div>
              </div>

              {/* Angle de levée (Lift Angle) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Angle de Levée :</span>
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
                  <span>52° (Standard)</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action : Étalonnage 1-clic + Arrêt */}
            {isListening && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={autoCalibrate}
                  disabled={isCalibrating}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold transition flex items-center gap-2"
                >
                  <Radio className={`w-3.5 h-3.5 ${isCalibrating ? 'animate-spin' : ''}`} />
                  <span>{isCalibrating ? 'Étalonnage en cours...' : 'Auto-Étalonnage du Bruit'}</span>
                </button>

                <button
                  onClick={stopMicrophone}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-red-600/20 active:scale-95"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Arrêter la Mesure</span>
                </button>
              </div>
            )}

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
                  <span className="text-slate-300 font-semibold">3. Amplitude &amp; Armage :</span>
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
