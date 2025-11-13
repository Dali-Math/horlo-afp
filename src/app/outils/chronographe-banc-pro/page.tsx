'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, Activity, TrendingUp, Download, Settings, 
  Box, Rotate3d, AlertTriangle, CheckCircle,
  Play, Square, RotateCw
} from 'lucide-react';

interface TimigData {
  timestamp: number;
  amplitude: number;
  beatError: number;
  rate: number;
  period: number;
  jitter: number;
  liftAngle: number;
  position: string;
}

const POSITIONS = [
  { id: 'DU', name: 'Dial Up', rotation: '0°' },
  { id: 'DD', name: 'Dial Down', rotation: '180°' },
  { id: 'CH', name: 'Crown Right', rotation: '90°' },
  { id: 'CB', name: 'Crown Left', rotation: '270°' },
  { id: 'CL', name: 'Crown Up', rotation: '0° lat.' },
  { id: 'CLD', name: 'Crown Down', rotation: '180° lat.' },
];

export default function ChronographeBancPro() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('DU');
  const [selectedRate, setSelectedRate] = useState(28800);
  const [liftAngle, setLiftAngle] = useState(52);
  const [measurementDuration, setMeasurementDuration] = useState(20);
  
  const [data, setData] = useState<TimigData[]>([]);
  const [sessionResults, setSessionResults] = useState<Record<string, TimigData[]>>({});
  const [averages, setAverages] = useState<any>({});
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Calcul du beat en ms
  const beatPeriod = 3600000 / selectedRate; // période d'un demi-battement en ms

  // Génération d'un signal réaliste
  const generateSignal = (time: number): TimigData => {
    const baseAmplitude = 290;
    const amplitudeDrift = Math.sin(time * 0.001) * 15;
    const thermalNoise = (Math.random() - 0.5) * 8;
    
    const amplitude = Math.max(180, Math.min(320, baseAmplitude + amplitudeDrift + thermalNoise));
    
    // Beat error simulé comme décalage de phase
    const beatError = (Math.sin(time * 0.0005) * 0.3 + (Math.random() - 0.5) * 0.2);
    
    // Rate calculé à partir de la variation de période
    const periodError = (Math.random() - 0.5) * 0.0001;
    const rate = periodError * 86400 * 1000; // conversion en s/j
    
    // Jitter = instabilité de la période
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
  };

  const calculateStats = (positionData: TimigData[]) => {
    if (positionData.length === 0) return null;
    
    const n = positionData.length;
    
    const avgAmplitude = positionData.reduce((sum, d) => sum + d.amplitude, 0) / n;
    const avgBeatError = positionData.reduce((sum, d) => sum + d.beatError, 0) / n;
    const avgRate = positionData.reduce((sum, d) => sum + d.rate, 0) / n;
    const avgJitter = positionData.reduce((sum, d) => sum + d.jitter, 0) / n;
    
    // Écart type
    const stdAmplitude = Math.sqrt(
      positionData.reduce((sum, d) => sum + Math.pow(d.amplitude - avgAmplitude, 2), 0) / n
    );
    
    return {
      amplitude: { avg: avgAmplitude, std: stdAmplitude },
      beatError: { avg: avgBeatError, abs: Math.abs(avgBeatError) },
      rate: { avg: avgRate, std: Math.sqrt(positionData.reduce((s, d) => s + Math.pow(d.rate - avgRate, 2), 0) / n) },
      jitter: { avg: avgJitter },
      count: n
    };
  };

  useEffect(() => {
    if (isRunning && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - (startTimeRef.current || now)) / 1000;
        
        // Stop après la durée souhaitée
        if (elapsed >= measurementDuration) {
          handleStop();
          return;
        }

        const newData = generateSignal(now);
        setData(prev => [...prev, newData]);
        
        // Mettre à jour les résultats par position
        setSessionResults(prev => ({
          ...prev,
          [currentPosition]: [...(prev[currentPosition] || []), newData]
        }));
      }, 500); // Mesure toutes les 500ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, currentPosition, beatPeriod, liftAngle, measurementDuration]);

  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  const handleStop = () => {
    setIsRunning(false);
    startTimeRef.current = null;
    
    // Calculer les moyennes pour toutes les positions
    const newAverages: any = {};
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
    startTimeRef.current = null;
  };

  const exportCSV = () => {
    const csv = [
      ['Position', 'Amplitude Moy (°)', 'Ecart-type Amp', 'Beat Error (ms)', 'Rate (s/j)', 'Jitter (ms)'],
      ...Object.entries(averages).map(([pos, stats]: any) => [
        pos, 
        stats.amplitude.avg.toFixed(1),
        stats.amplitude.std.toFixed(2),
        stats.beatError.avg.toFixed(1),
        stats.rate.avg.toFixed(1),
        stats.jitter.avg.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chronographe_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const latest = data[data.length - 1];

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      {/* En-tête */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Timer className="w-6 h-6" />
          CHRONOGRAPHE DE BANC PRO v2.1
        </h1>
        <p className="text-slate-500 text-sm mt-1">Analyse temporelle du balancier-spiral | Mode: {isRunning ? 'ACQUISITION' : 'VEILLE'}</p>
      </div>

      {/* Contrôles */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1">POSITION</label>
            <select 
              value={currentPosition} 
              onChange={(e) => setCurrentPosition(e.target.value)}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400"
            >
              {POSITIONS.map(pos => (
                <option key={pos.id} value={pos.id}>{pos.name} ({pos.rotation})</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-slate-400 text-xs mb-1">BEAT RATE (A/h)</label>
            <select 
              value={selectedRate} 
              onChange={(e) => setSelectedRate(Number(e.target.value))}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400"
            >
              <option value="18000">18,000 | 2.5 Hz</option>
              <option value="21600">21,600 | 3 Hz</option>
              <option value="25200">25,200 | 3.5 Hz</option>
              <option value="28800">28,800 | 4 Hz</option>
              <option value="36000">36,000 | 5 Hz</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">LIFT ANGLE (°)</label>
            <input 
              type="number" 
              value={liftAngle}
              onChange={(e) => setLiftAngle(Number(e.target.value))}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400"
              min="48" max="58"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">DURÉE (s)</label>
            <input 
              type="number" 
              value={measurementDuration}
              onChange={(e) => setMeasurementDuration(Number(e.target.value))}
              disabled={isRunning}
              className="w-full bg-black border border-slate-700 p-2 text-green-400"
              min="10" max="120"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={handleStart}
            disabled={isRunning}
            className="bg-green-900 hover:bg-green-800 disabled:bg-slate-800 px-4 py-2 border border-green-700 flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> START
          </button>
          <button 
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-900 hover:bg-red-800 disabled:bg-slate-800 px-4 py-2 border border-red-700 flex items-center gap-2"
          >
            <Square className="w-4 h-4" /> STOP
          </button>
          <button 
            onClick={handleReset}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 border border-slate-600 flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" /> RESET
          </button>
          <button 
            onClick={exportCSV}
            disabled={Object.keys(averages).length === 0}
            className="bg-blue-900 hover:bg-blue-800 disabled:bg-slate-800 ml-auto px-4 py-2 border border-blue-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> EXPORT CSV
          </button>
        </div>
      </div>

      {/* Mesures en temps réel */}
      {isRunning && latest && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-slate-500 text-xs">AMPLITUDE</div>
              <div className="text-2xl font-bold">{latest.amplitude}°</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">BEAT ERROR</div>
              <div className="text-2xl font-bold">{Math.abs(latest.beatError).toFixed(1)} ms</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">RATE</div>
              <div className={`text-2xl font-bold ${latest.rate > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                {latest.rate > 0 ? '+' : ''}{latest.rate.toFixed(1)} s/j
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">JITTER</div>
              <div className="text-2xl font-bold">{latest.jitter.toFixed(2)} ms</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">SIGNAL</div>
              <div className={`text-2xl font-bold ${latest.jitter < 0.3 ? 'text-green-400' : 'text-yellow-400'}`}>
                {latest.jitter < 0.3 ? 'STABLE' : 'IRRÉGULIER'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultats par position */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          RÉSULTATS PAR POSITION
        </h2>
        
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
                <th className="text-right py-2 text-slate-400">STATUT</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(averages).map(([pos, stats]: any) => (
                <tr key={pos} className="border-b border-slate-800">
                  <td className="py-2 font-semibold">{pos}</td>
                  <td className="text-right py-2">{stats.amplitude.avg.toFixed(1)}</td>
                  <td className="text-right py-2 text-slate-500">{stats.amplitude.std.toFixed(1)}</td>
                  <td className={`text-right py-2 ${stats.beatError.abs > 0.5 ? 'text-red-400' : 'text-green-400'}`}>
                    {stats.beatError.abs.toFixed(1)}
                  </td>
                  <td className={`text-right py-2 ${Math.abs(stats.rate.avg) > 10 ? 'text-red-400' : Math.abs(stats.rate.avg) > 5 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {stats.rate.avg > 0 ? '+' : ''}{stats.rate.avg.toFixed(1)}
                  </td>
                  <td className={`text-right py-2 ${stats.jitter.avg > 0.4 ? 'text-red-400' : 'text-slate-400'}`}>
                    {stats.jitter.avg.toFixed(2)}
                  </td>
                  <td className="text-right py-2">
                    {stats.amplitude.std < 10 && stats.jitter.avg < 0.4 ? (
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
          <div className="text-center py-8 text-slate-600">
            <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Aucune mesure effectuée. Lancez une acquisition.</p>
          </div>
        )}
      </div>

      {/* Paramètres système */}
      <div className="mt-4 text-xs text-slate-600">
        <div className="flex gap-4">
          <span>Beat: {(selectedRate / 7200).toFixed(3)} Hz</span>
          <span>Période: {(3600 / (selectedRate / 7200)).toFixed(4)} s</span>
          <span>Échantillonnage: 2 Hz</span>
        </div>
      </div>
    </div>
  );
}
