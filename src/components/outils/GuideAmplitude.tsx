'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function GuideAmplitude() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <RefreshCw className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Guide d'Amplitude du Balancier</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <h3 className="font-bold text-green-900 mb-3">✅ Amplitude Bonne</h3>
          <p className="text-3xl font-bold text-green-700 mb-2">270° - 315°</p>
          <p className="text-sm text-green-700">
            Cadran horizontal, mouvement en bon état
          </p>
        </div>

        <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
          <h3 className="font-bold text-orange-900 mb-3">⚠️ Amplitude Moyenne</h3>
          <p className="text-3xl font-bold text-orange-700 mb-2">220° - 270°</p>
          <p className="text-sm text-orange-700">
            Acceptable, révision recommandée
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <h3 className="font-bold text-red-900 mb-3">❌ Amplitude Faible</h3>
          <p className="text-3xl font-bold text-red-700 mb-2">&lt; 220°</p>
          <p className="text-sm text-red-700">
            Problème détecté, révision urgente
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <p className="text-sm text-indigo-900">
          <strong>💡 Mesure :</strong> L'amplitude se mesure avec un appareil de contrôle (Witschi, Timegrapher) 
          en observant l'oscillation du balancier en degrés.
        </p>
      </div>
    </div>
  );
}
