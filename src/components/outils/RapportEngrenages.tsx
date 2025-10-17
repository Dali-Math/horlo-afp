'use client';

import React, { useState } from 'react';
import { Calculator, Settings, CheckCircle, Info } from 'lucide-react';

export default function RapportEngrenages() {
  const [dentsRoue, setDentsRoue] = useState<number>(80);
  const [dentsPignon, setDentsPignon] = useState<number>(10);
  const [rapportEngrenage, setRapportEngrenage] = useState<number | null>(null);

  const calculerRapport = () => {
    if (dentsRoue > 0 && dentsPignon > 0) {
      setRapportEngrenage(dentsRoue / dentsPignon);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Settings className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Rapport d'Engrenages</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de dents de la roue
          </label>
          <input
            type="number"
            value={dentsRoue}
            onChange={(e) => setDentsRoue(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: 80"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de dents du pignon
          </label>
          <input
            type="number"
            value={dentsPignon}
            onChange={(e) => setDentsPignon(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: 10"
          />
        </div>

        <button
          onClick={calculerRapport}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculer le rapport
        </button>
      </div>

      {rapportEngrenage !== null && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-900">Résultat :</p>
          </div>
          <p className="text-3xl font-bold text-green-700 mb-2">
            {rapportEngrenage.toFixed(2)} : 1
          </p>
          <p className="text-sm text-green-700">
            Le pignon fait <strong>{rapportEngrenage.toFixed(2)} tours</strong> pendant que la roue fait 1 tour.
          </p>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">💡 Formule :</p>
            <p>Rapport = Dents roue ÷ Dents pignon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
