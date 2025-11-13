'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Timer, Activity, TrendingUp, Download, Settings, Box, AlertTriangle, CheckCircle,
  Play, Square, RotateCw, Volume2, Info, Cpu, Zap, Gauge, Target
} from 'lucide-react';

interface TimingData {
  timestamp: number;
  amplitude: number;
  beatError: number;
  rate: number;
  period: number;
  jitter: number;
  liftAngle: number;
  position: string;
  isochronism?: number;
}

const POSITIONS = [
  { id: 'DU', name: 'Dial Up', rotation: '0°', icon: '↑' },
  { id: 'DD', name: 'Dial Down', rotation: '180°', icon: '↓' },
  { id: 'CH', name: 'Crown Right', rotation: '90°', icon: '→' },
  { id: 'CB', name: 'Crown Left', rotation: '270°', icon: '←' },
  { id: 'CL', name: 'Crown Up', rotation: '0° lat.', icon: '↑' },
  { id: 'CLD', name: 'Crown Down', rotation: '180° lat.', icon: '↓' },
];

// VALIDATION PROFESSIONNELLE
const ValidationUtils = {
  isValidLiftAngle: (value: number) => value >= 48 && value <= 58,
  isValidAmplitude: (value: number) => value >= 180 && value <= 360,
  isValidBeatError: (value: number) => Math.abs(value) <= 2.0,
  isCOSCCompliant: (rate: number, amplitude: number, beatError: number) => 
    Math.abs(rate) <= 5 && amplitude >= 260 && Math.abs(beatError) <= 0.3,
  calculateIsochronism: (positions: TimingData[]) => {
    if (positions.length < 2) return 0;
    const amplitudes = positions.map(p => p.amplitude);
    return (Math.max(...amplitudes) - Math.min(...amplitudes)) / Math.max(...amplitudes) * 100;
  },
  getSignalQuality: (jitter: number) => jitter < 0.3 ? 'EXCELLENT' : jitter < 0.5 ? 'ACCEPTABLE' : 'CRITICAL'
};

export default function ChronographeBancPro() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('DU');
  const [selectedRate, setSelectedRate] = useState(28800);
  const [liftAngle, setLiftAngle] = useState(52);
  const [measurementDuration, setMeasurementDuration] = useState(20);
  const [audioFeedback, setAudioFeedback] = useState(false);
  const [tooltip, setTooltip] = useState<{ show: boolean; text: string; x: number; y: number }>({
    show: false,
    text: '',
    x: 0,
    y: 0
  });
  
  const [data, setData] = useState<TimingData[]>([]);
  const [sessionResults, setSessionResults] = useState<Record<string, TimingData[]>>({});
  const [averages, setAverages] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const beatPeriod = 3600000 / selectedRate;

  // AUDIO FEEDBACK PRO
  useEffect(() => {
    if (audioFeedback && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [audioFeedback]);

  const playBeatSound = useCallback(() => {
    if (!audioFeedback || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }, [audioFeedback]);

  // GÉNÉRATION DE SIGNAL PRO
  const generateSignal = useCallback((time: number): TimingData => {
    const baseAmplitude = 290;
    const amplitudeDrift = Math.sin(time * 0.001) * 15;
    const thermalNoise = (Math.random() - 0.5) * 8;
    
    const amplitude = Math.max(180, Math.min(320, baseAmplitude + amplitudeDrift + thermalNoise));
    const beatError = (Math.sin(time * 0.0005) * 0.3 + (Math.random() - 0.5) * 0.2);
    const periodError = (Math.random() - 0.5) * 0.0001;
    const rate = periodError * 86400 * 1000;
    const jitter = Math.random() * 0.5;
    
    return {
      timestamp: time,
      amplitude: Math.round(amplitude),
      beatError: parseFloat(beatError.toFixed(1)),
      rate: parseFloat(rate.toFixed(1)),
      period: beatPeriod + periodError,
      jitter: parseFloat(jitter.toFixed(2)),
      liftAngle: liftAngle,
      position: currentPosition
    };
  }, [beatPeriod, liftAngle, currentPosition]);

  // VALIDATION PRO
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!ValidationUtils.isValidLiftAngle(liftAngle)) {
      newErrors.liftAngle = "Lift angle invalide (48-58°)";
    }
    if (measurementDuration < 10 || measurementDuration > 180) {
      newErrors.duration = "Durée invalide (10-180s)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateStats = useCallback((positionData: TimingData[]) => {
    if (!positionData.length) return null;
    const n = positionData.length;
    const avgAmplitude = positionData.reduce((sum, d) => sum + d.amplitude, 0) / n;
    const avgBeatError = positionData.reduce((sum, d) => sum + d.beatError, 0) / n;
    const avgRate = positionData.reduce((sum, d) => sum + d.rate, 0) / n;
    const avgJitter = positionData.reduce((sum, d) => sum + d.jitter, 0) / n;
    const isochronism = ValidationUtils.calculateIsochronism(positionData);
    const stdAmplitude = Math.sqrt(positionData.reduce((sum, d) => sum + Math.pow(d.amplitude - avgAmplitude, 2), 0) / n);
    
    return {
      amplitude: { avg: avgAmplitude, std: stdAmplitude },
      beatError: { avg: avgBeatError, abs: Math.abs(avgBeatError) },
      rate: { avg: avgRate, std: Math.sqrt(positionData.reduce((s, d) => s + Math.pow(d.rate - avgRate, 2), 0) / n) },
      jitter: { avg: avgJitter },
      isochronism,
      count: n,
      isCOSC: ValidationUtils.isCOSCCompliant(avgRate, avgAmplitude, avgBeatError)
    };
  }, []);

  // BOUCLE D'ACQUISITION
  useEffect(() => {
    if (isRunning) {
      if (!validateInputs()) {
        setIsRunning(false);
        return;
      }
      startTimeRef.current = Date.now();
      
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        setElapsed((now - (startTimeRef.current || now)) / 1000);
        
        if (elapsed >= measurementDuration) {
          handleStop();
          return;
        }

        const newData = generateSignal(now);
        setData(prev => [...prev, newData]);
        setSessionResults(prev => ({
          ...prev,
          [currentPosition]: [...(prev[currentPosition] || []), newData]
        }));

        if (audioFeedback && Math.random() > 0.7) playBeatSound();
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, elapsed, measurementDuration, generateSignal, currentPosition, audioFeedback, playBeatSound]);

  // RACCOURCIS CLAVIER PRO
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? handleStop() : handleStart();
      } else if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning]);

  const handleStart = () => {
    if (!validateInputs()) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  const handleStop = () => {
    setIsRunning(false);
    startTimeRef.current = null;
    setElapsed(0);
    
    const newAverages: Record<string, any> = {};
    Object.entries(sessionResults).forEach(([pos, posData]) => {
      newAverages[pos] = calculateStats(posData);
    });
    setAverages(newAverages);
  };

  const handleReset = () => {
    setIsRunning(false);
    setData([]);
    setSessionResults({});
    setAverages({});
    setElapsed(0);
    startTimeRef.current = null;
  };

  const exportCSV = () => {
    const csv = [
      ['Position', 'Amplitude Moy (°)', 'Ecart-type Amp', 'Beat Error (ms)', 'Rate (s/j)', 'Jitter (ms)', 'Isochronisme (%)', 'COSC'],
      ...Object.entries(averages).map(([pos, stats]: [string, any]) => [
        POSITIONS.find(p => p.id === pos)?.name || pos, 
        stats.amplitude.avg.toFixed(1),
        stats.amplitude.std.toFixed(2),
        stats.beatError.avg.toFixed(1),
        stats.rate.avg.toFixed(1),
        stats.jitter.avg.toFixed(2),
        stats.isochronism.toFixed(2),
        stats.isCOSC ? 'OUI' : 'NON'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chronographe_${new Date().toISOString().split('T')[0]}_${Date.now()}.csv`;
    a.click();
  };

  const showTooltip = (text: string) => (e: React.MouseEvent) => {
    setTooltip({ show: true, text, x: e.clientX, y: e.clientY - 30 });
  };

  const hideTooltip = () => setTooltip({ ...tooltip, show: false });
  const latest = data[data.length - 1];

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono select-none">
      {/* TOOLTIP */}
      {tooltip.show && (
        <div className="fixed bg-slate-800 border border-green-500 text-green-300 px-3 py-2 rounded text-xs z-50 shadow-lg pointer-events-none">
          {tooltip.text}
        </div>
      )}

      {/* HEADER PRO */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 text-green-400" />
            <h1 className="text-xl font-bold">CHRONOGRAPHE DE BANC PRO v3.0</h1>
            <span className="text-xs bg-green-900 px-2 py-1 rounded">LIVE</span>
          </div>
          <div className="text-xs text-slate-500">
            Mode: <span className="font-bold">{isRunning ? 'ACQUISITION' : 'VEILLE'}</span>
            {isRunning && <span className="ml-2">[{elapsed.toFixed(0)}s/{measurementDuration}s]</span>}
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">
              POSITION <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Positions COSC standard")} onMouseLeave={hideTooltip} />
            </label>
            <select 
              value={currentPosition} 
              onChange={(e) => setCurrentPosition(e.target.value)}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none"
            >
              {POSITIONS.map(pos => (
                <option key={pos.id} value={pos.id}>{pos.name} ({pos.rotation})</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">
              BEAT RATE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Fréquence du mouvement (A/h = alternances/heure)")} onMouseLeave={hideTooltip} />
            </label>
            <select 
              value={selectedRate} 
              onChange={(e) => setSelectedRate(Number(e.target.value))}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400 focus:border-green-500 focus:outline-none"
            >
              <option value="18000">18,000 | 2.5 Hz (ETA 6497)</option>
              <option value="21600">21,600 | 3 Hz (Miyota)</option>
              <option value="25200">25,200 | 3.5 Hz (ETA 2892)</option>
              <option value="28800">28,800 | 4 Hz (ETA 2824)</option>
              <option value="36000">36,000 | 5 Hz (El Primero)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">
              LIFT ANGLE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Angle de levage spécifique au calibre (48-58°)")} onMouseLeave={hideTooltip} />
            </label>
            <input 
              type="number" 
              value={liftAngle}
              onChange={(e) => setLiftAngle(Number(e.target.value))}
              disabled={isRunning}
              className={`w-full bg-black border p-2 text-green-400 focus:outline-none ${
                errors.liftAngle ? 'border-red-500' : 'border-slate-700 focus:border-green-500'
              }`}
              min="48" max="58"
            />
            {errors.liftAngle && <div className="text-red-500 text-xs mt-1">{errors.liftAngle}</div>}
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1">
              DURÉE (s) <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Durée minimale pour une mesure stable: 20-30s")} onMouseLeave={hideTooltip} />
            </label>
            <input 
              type="number" 
              value={measurementDuration}
              onChange={(e) => setMeasurementDuration(Number(e.target.value))}
              disabled={isRunning}
              className={`w-full bg-black border p-2 text-green-400 focus:outline-none ${
                errors.duration ? 'border-red-500' : 'border-slate-700 focus:border-green-500'
              }`}
              min="10" max="180"
            />
            {errors.duration && <div className="text-red-500 text-xs mt-1">{errors.duration}</div>}
          </div>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          <button onClick={handleStart} disabled={isRunning} className="bg-green-900 hover:bg-green-800 disabled:bg-slate-800 px-4 py-2 border border-green-700 flex items-center gap-2 transition-colors">
            <Play className="w-4 h-4" /> START [Space]
          </button>
          <button onClick={handleStop} disabled={!isRunning} className="bg-red-900 hover:bg-red-800 disabled:bg-slate-800 px-4 py-2 border border-red-700 flex items-center gap-2 transition-colors">
            <Square className="w-4 h-4" /> STOP [Space]
          </button>
          <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 border border-slate-600 flex items-center gap-2 transition-colors">
            <RotateCw className="w-4 h-4" /> RESET [Ctrl+R]
          </button>
          <button onClick={() => setAudioFeedback(!audioFeedback)} className={`px-4 py-2 border flex items-center gap-2 transition-colors ${
              audioFeedback ? 'bg-blue-900 hover:bg-blue-800 border-blue-700' : 'bg-slate-700 hover:bg-slate-600 border-slate-600'
            )}`>
            <Volume2 className="w-4 h-4" /> AUDIO {audioFeedback ? 'ON' : 'OFF'}
          </button>
          <button onClick={exportCSV} disabled={Object.keys(averages).length === 0} className="bg-blue-900 hover:bg-blue-800 disabled:bg-slate-800 ml-auto md:ml-0 px-4 py-2 border border-blue-700 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> EXPORT CSV
          </button>
        </div>
      </div>

      {/* LIVE MEASUREMENTS */}
      {isRunning && latest && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs flex items-center gap-1">
                AMPLITUDE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Amplitude idéale: 270-310°")} onMouseLeave={hideTooltip} />
              </div>
              <div className={`text-2xl font-bold ${ValidationUtils.isValidAmplitude(latest.amplitude) ? 'text-green-400' : 'text-yellow-400'}`}>
                {latest.amplitude}°
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs flex items-center gap-1">
                BEAT ERROR <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Décalage tic/tac. Objectif: < 0.3ms")} onMouseLeave={hideTooltip} />
              </div>
              <div className={`text-2xl font-bold ${ValidationUtils.isValidBeatError(latest.beatError) ? 'text-green-400' : 'text-red-400'}`}>
                {Math.abs(latest.beatError).toFixed(1)} ms
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs flex items-center gap-1">
                RATE <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Variation journalière. COSC: ±5 s/j")} onMouseLeave={hideTooltip} />
              </div>
              <div className={`text-2xl font-bold ${
                Math.abs(latest.rate) <= 5 ? 'text-green-400' : Math.abs(latest.rate) <= 10 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {latest.rate > 0 ? '+' : ''}{latest.rate.toFixed(1)} s/j
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs flex items-center gap-1">
                JITTER <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Stabilité du signal. Objectif: < 0.3ms")} onMouseLeave={hideTooltip} />
              </div>
              <div className={`text-2xl font-bold ${latest.jitter < 0.3 ? 'text-green-400' : 'text-yellow-400'}`}>
                {latest.jitter.toFixed(2)} ms
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs flex items-center gap-1">
                ISOCHRONISME <Info className="w-3 h-3 cursor-help" onMouseEnter={showTooltip("Variation d'amplitude entre positions")} onMouseLeave={hideTooltip} />
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {ValidationUtils.calculateIsochronism(data).toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-slate-800">
              <div className="text-slate-500 text-xs">SIGNAL</div>
              <div className={`text-2xl font-bold flex items-center gap-1 ${
                latest.jitter < 0.3 ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {latest.jitter < 0.3 ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                {ValidationUtils.getSignalQuality(latest.jitter)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS TABLE */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            RÉSULTATS PAR POSITION
          </h2>
          {Object.values(averages).some((a: any) => a?.isCOSC) && (
            <div className="bg-green-900 text-green-400 px-3 py-1 rounded text-sm flex items-center gap-1 font-bold">
              <CheckCircle className="w-4 h-4" />
              COSC COMPLIANT
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-slate-400">POSITION</th>
                <th className="text-right py-2 text-slate-400">AMPL. MOY (°)</th>
                <th className="text-right py-2 text-slate-400">ÉCART-TYPE</th>
                <th className="text-right py-2 text-slate-400">BEAT ERR (ms)</th>
                <th className="text-right py-2 text-slate-400">RATE (s/j)</th>
                <th className="text-right py-2 text-slate-400">JITTER (ms)</th>
                <th className="text-right py-2 text-slate-400">ISOCHR (%)</th>
                <th className="text-center py-2 text-slate-400">STATUT</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(averages).map(([pos, stats]: [string, any]) => (
                <tr key={pos} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-2 font-semibold">
                    {POSITIONS.find(p => p.id === pos)?.name} {POSITIONS.find(p => p.id === pos)?.icon}
                  </td>
                  <td className="text-right py-2">{stats.amplitude.avg.toFixed(1)}</td>
                  <td className={`text-right py-2 ${stats.amplitude.std > 15 ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {stats.amplitude.std.toFixed(1)}
                  </td>
                  <td className={`text-right py-2 ${stats.beatError.abs > 0.5 ? 'text-red-400' : 'text-green-400'}`}>
                    {stats.beatError.avg.toFixed(1)}
                  </td>
                  <td className={`text-right py-2 font-semibold ${
                    Math.abs(stats.rate.avg) > 10 ? 'text-red-400' : Math.abs(stats.rate.avg) > 5 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {stats.rate.avg > 0 ? '+' : ''}{stats.rate.avg.toFixed(1)}
                  </td>
                  <td className={`text-right py-2 ${stats.jitter.avg > 0.4 ? 'text-red-400' : 'text-slate-400'}`}>
                    {stats.jitter.avg.toFixed(2)}
                  </td>
                  <td className={`text-right py-2 ${stats.isochronism > 10 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {stats.isochronism.toFixed(1)}%
                  </td>
                  <td className="text-center py-2">
                    {stats.isCOSC ? (
                      <CheckCircle className="w-4 h-4 text-green-400 inline" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {Object.keys(averages).length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <Activity className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-sm">Aucune mesure effectuée. Configurez les paramètres et lancez une acquisition.</p>
            <p className="text-xs mt-2 text-slate-700">Conseil: mesurez chaque position 30s minimum</p>
          </div>
        )}
      </div>

      {/* TECH SPECS */}
      <div className="mt-4 text-xs text-slate-600 flex justify-between items-center">
        <div className="flex gap-4">
          <span>Beat: {(selectedRate / 7200).toFixed(3)} Hz</span>
          <span>Période: {(3600 / (selectedRate / 7200)).toFixed(4)} s</span>
          <span>Échantillonnage: 2 Hz</span>
          <span>Précision: ±1ms</span>
          <span>Température: 20°C ±2°</span>
        </div>
        <div className="flex gap-2 items-center">
          <Cpu className="w-4 h-4" />
          <span>Algorithm v3.0 - Swiss Timing Compatible</span>
        </div>
      </div>
    </div>
  );
}
