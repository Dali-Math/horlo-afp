'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Square, RotateCcw } from 'lucide-react';

export default function Chronometre() {
  const [chronometerTime, setChronometerTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChronometer = () => setIsRunning(true);
  const stopChronometer = () => setIsRunning(false);
  const resetChronometer = () => {
    setIsRunning(false);
    setChronometerTime(0);
    setLaps([]);
  };
  const addLap = () => setLaps([...laps, chronometerTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setChronometerTime(prev => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const centiseconds = Math.floor(ms / 10) % 100;
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-100 p-3 rounded-xl">
          <Clock className="w-6 h-6 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Chronomètre de Précision</h2>
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-12 mb-6">
          <p className="text-6xl font-mono font-bold text-white mb-4">
            {formatTime(chronometerTime)}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!isRunning ? (
              <button 
                onClick={startChronometer}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Démarrer
              </button>
            ) : (
              <button 
                onClick={stopChronometer}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
              >
                <Square className="w-5 h-5" />
                Arrêter
              </button>
            )}
            <button 
              onClick={addLap}
              disabled={!isRunning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Inter
            </button>
            <button 
              onClick={resetChronometer}
              className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              RAZ
            </button>
          </div>
        </div>

        {laps.length > 0 && (
          <div className="bg-slate-100 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-slate-900 mb-3">Temps intermédiaires :</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {laps.map((lap, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white px-4 py-2 rounded-lg">
                  <span className="text-sm text-slate-600">Inter {idx + 1}</span>
                  <span className="font-mono font-semibold text-slate-900">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-600 mb-1">Précision</p>
            <p className="text-2xl font-bold text-blue-900">1/100s</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-600 mb-1">Temps intermédiaires</p>
            <p className="text-2xl font-bold text-green-900">{laps.length}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p className="text-sm text-purple-600 mb-1">Mode</p>
            <p className="text-2xl font-bold text-purple-900">Standard</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-rose-50 rounded-lg">
        <p className="text-sm text-rose-900">
          <strong>💡 Utilisation :</strong> Comparez la précision de votre montre. 
          Une montre mécanique de qualité varie de ±5 à ±15 secondes par jour.
        </p>
      </div>
    </div>
  );
}
