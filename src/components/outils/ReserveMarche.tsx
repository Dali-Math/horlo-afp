'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle } from 'lucide-react';

export default function ReserveMarche() {
  const [toursBarillet, setToursBarillet] = useState<number>(6.5);
  const [dureeParTour, setDureeParTour] = useState<number>(6);
  const [reserveMarche, setReserveMarche] = useState<number | null>(null);

  const calculerReserve = () => {
    setReserveMarche(toursBarillet * dureeParTour);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Réserve de Marche</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de tours du barillet
          </label>
          <input
            type="number"
            value={toursBarillet}
            onChange={(e) => setToursBarillet(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600"
            placeholder="Ex: 6.5"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Durée par tour (heures)
          </label>
          <input
            type="number"
            value={dureeParTour}
            onChange={(e) => setDureeParTour(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-600"
            placeholder="Ex: 6"
            step="0.5"
          />
        </div>

        <button
          onClick={calculerReserve}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculer la réserve
        </button>
      </div>

      {reserveMarche !== null && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-orange-600" />
            <p className="font-semibold text-orange-900">Résultat :</p>
          </div>
          <p className="text-3xl font-bold text-orange-700 mb-2">
            {reserveMarche} heures
          </p>
          <p className="text-sm text-orange-700">
            Soit environ <strong>{(reserveMarche / 24).toFixed(1)} jours</strong>
          </p>
        </div>
      )}

      <div className="mt-4 p-4 bg-orange-50 rounded-lg">
        <p className="font-semibold text-orange-900 mb-2">Exemples réels :</p>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• ETA 2824-2 : <strong>38h</strong></li>
          <li>• Rolex 3135 : <strong>48h</strong></li>
          <li>• IWC 5000 : <strong>168h (7 jours)</strong></li>
        </ul>
      </div>
    </div>
  );
}
