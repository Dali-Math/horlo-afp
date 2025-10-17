'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Info, TrendingUp, Clock, Zap } from 'lucide-react';

interface FrequencyPreset {
  name: string;
  value: number;
  description: string;
  color: string;
}

const frequencyPresets: FrequencyPreset[] = [
  {
    name: 'Standard (ETA 2824)',
    value: 28800,
    description: 'Fréquence la plus courante en horlogerie moderne',
    color: 'bg-blue-500'
  },
  {
    name: 'Haute fréquence (Zenith El Primero)',
    value: 36000,
    description: 'Précision accrue, usure plus rapide',
    color: 'bg-purple-500'
  },
  {
    name: 'Basse fréquence (ETA 6497)',
    value: 18000,
    description: 'Économie d\'énergie, réserve de marche prolongée',
    color: 'bg-green-500'
  },
  {
    name: 'Très haute fréquence (Breguet)',
    value: 43200,
    description: 'Précision maximale, complications de haut niveau',
    color: 'bg-red-500'
  }
];

export default function SimulateurAlternance() {
  const [frequency, setFrequency] = useState(28800);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  // Calculs dérivés
  const hz = frequency / 7200; // Conversion A/h → Hz
  const vph = frequency * 2; // Vibrations par heure
  const period = 3600 / frequency; // Période d'une alternance en secondes
  const animationDuration = period * 1000; // En millisecondes

  useEffect(() => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  }, [frequency]);

  const handlePresetClick = (value: number) => {
    setFrequency(value);
  };

  const handleCustomInput = (value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 3600 && numValue <= 72000) {
      setFrequency(numValue);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-3 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Simulateur d'Alternance</h2>
            <p className="text-blue-200 text-sm">Visualisez le battement du balancier en temps réel</p>
          </div>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Info className="w-6 h-6" />
        </button>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="mb-6 bg-blue-950/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            Comprendre les alternances
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>• <strong>Alternance (A/h)</strong> : Nombre de demi-oscillations du balancier par heure</li>
            <li>• <strong>Fréquence (Hz)</strong> : Nombre d'oscillations complètes par seconde</li>
            <li>• <strong>Vibrations (vph)</strong> : Total des mouvements du balancier (aller + retour)</li>
            <li>• <strong>Période</strong> : Durée d'une alternance en secondes</li>
          </ul>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Animation */}
        <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-8 border border-white/10">
          <div className="relative w-64 h-64 mb-6">
            {/* Balancier visuel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Axe fixe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full z-10 shadow-lg shadow-yellow-500/50"></div>
                
                {/* Balancier animé */}
                <div
                  className={`absolute top-1/2 left-1/2 origin-bottom-left ${isAnimating ? 'animate-balance' : ''}`}
                  style={{
                    width: '120px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                    transformOrigin: 'left center',
                    animation: isAnimating ? `balance ${animationDuration}ms ease-in-out infinite` : 'none',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                  }}
                >
                  {/* Masse du balancier */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                </div>
              </div>
            </div>

            {/* Cercle de fond */}
            <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full"></div>
          </div>

          <div className="text-center">
            <p className="text-sm text-blue-200 mb-2">Fréquence actuelle</p>
            <p className="text-4xl font-bold text-white">{frequency.toLocaleString()}</p>
            <p className="text-lg text-blue-300">A/h</p>
          </div>

          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            {isAnimating ? 'Pause' : 'Reprendre'}
          </button>
        </div>

        {/* Right: Controls & Results */}
        <div className="space-y-6">
          {/* Custom Input */}
          <div>
            <label className="block text-sm font-semibold text-blue-200 mb-2">
              Fréquence personnalisée (A/h)
            </label>
            <input
              type="number"
              min="3600"
              max="72000"
              step="1800"
              value={frequency}
              onChange={(e) => handleCustomInput(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-blue-300 mt-2">
              Plage valide : 3,600 - 72,000 A/h
            </p>
          </div>

          {/* Presets */}
          <div>
            <label className="block text-sm font-semibold text-blue-200 mb-3">
              Fréquences courantes
            </label>
            <div className="space-y-2">
              {frequencyPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetClick(preset.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    frequency === preset.value
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 ${preset.color} rounded-full`}></div>
                    <span className="font-bold">{preset.name}</span>
                    <span className="ml-auto text-blue-300 font-mono">{preset.value.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-blue-200">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Résultats calculés
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-blue-200 mb-1">Fréquence</p>
                <p className="text-2xl font-bold">{hz.toFixed(1)}</p>
                <p className="text-xs text-blue-300">Hz</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-blue-200 mb-1">Vibrations</p>
                <p className="text-2xl font-bold">{vph.toLocaleString()}</p>
                <p className="text-xs text-blue-300">vph</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-blue-200 mb-1">Période</p>
                <p className="text-2xl font-bold">{period.toFixed(3)}</p>
                <p className="text-xs text-blue-300">secondes</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-blue-200 mb-1">Durée tour</p>
                <p className="text-2xl font-bold">{(period * 2).toFixed(3)}</p>
                <p className="text-xs text-blue-300">secondes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation inline */}
      <style jsx>{`
        @keyframes balance {
          0%, 100% {
            transform: rotate(-45deg);
          }
          50% {
            transform: rotate(45deg);
          }
        }
        .animate-balance {
          animation: balance ${animationDuration}ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
