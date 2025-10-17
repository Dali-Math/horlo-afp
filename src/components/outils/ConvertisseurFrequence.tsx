'use client';

import React, { useState } from 'react';
import { RefreshCw, Info } from 'lucide-react';

export default function ConvertisseurFrequence() {
  const [alternances, setAlternances] = useState<number>(28800);
  const [frequenceHz, setFrequenceHz] = useState<number | null>(null);

  const convertirFrequence = (type: 'ah' | 'hz', value: number) => {
    if (type === 'ah') {
      setAlternances(value);
      setFrequenceHz(value / 7200);
    } else {
      setFrequenceHz(value);
      setAlternances(value * 7200);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-xl">
          <RefreshCw className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Convertisseur Fréquence</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Alternances/heure (A/h)
          </label>
          <input
            type="number"
            value={alternances}
            onChange={(e) => convertirFrequence('ah', Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            placeholder="Ex: 28800"
          />
        </div>

        <div className="text-center py-2">
          <RefreshCw className="w-6 h-6 text-slate-400 mx-auto" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fréquence (Hz)
          </label>
          <input
            type="number"
            value={frequenceHz || ''}
            onChange={(e) => convertirFrequence('hz', Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            placeholder="Ex: 4"
            step="0.1"
          />
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <p className="font-semibold text-purple-900 mb-3">Fréquences courantes :</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-purple-700">18,000 A/h</span>
            <span className="font-semibold text-purple-900">2.5 Hz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700">21,600 A/h</span>
            <span className="font-semibold text-purple-900">3 Hz</span>
          </div>
          <div className="flex justify-between bg-purple-100 px-2 py-1 rounded">
            <span className="text-purple-700">28,800 A/h</span>
            <span className="font-semibold text-purple-900">4 Hz ⭐</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700">36,000 A/h</span>
            <span className="font-semibold text-purple-900">5 Hz</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-purple-600 mt-0.5" />
          <div className="text-sm text-purple-900">
            <p className="font-semibold mb-1">💡 Formule :</p>
            <p>Hz = A/h ÷ 7200</p>
          </div>
        </div>
      </div>
    </div>
  );
}
