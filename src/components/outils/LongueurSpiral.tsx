'use client';

import React, { useState } from 'react';
import { Settings, Calculator, CheckCircle } from 'lucide-react';

export default function LongueurSpiral() {
  const [diamExterieur, setDiamExterieur] = useState<number>(12);
  const [diamInterieur, setDiamInterieur] = useState<number>(3);
  const [epaisseur, setEpaisseur] = useState<number>(0.12);
  const [longueurSpiral, setLongueurSpiral] = useState<number | null>(null);

  const calculerLongueurSpiral = () => {
    const rayonMoyen = (diamExterieur + diamInterieur) / 2;
    const nombreSpires = (diamExterieur - diamInterieur) / (2 * epaisseur);
    const longueur = 2 * Math.PI * rayonMoyen * nombreSpires;
    setLongueurSpiral(longueur);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-xl">
          <Settings className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Longueur Spiral</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Diamètre extérieur (mm)
          </label>
          <input
            type="number"
            value={diamExterieur}
            onChange={(e) => setDiamExterieur(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
            placeholder="Ex: 12"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Diamètre intérieur (mm)
          </label>
          <input
            type="number"
            value={diamInterieur}
            onChange={(e) => setDiamInterieur(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
            placeholder="Ex: 3"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Épaisseur du fil (mm)
          </label>
          <input
            type="number"
            value={epaisseur}
            onChange={(e) => setEpaisseur(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600"
            placeholder="Ex: 0.12"
            step="0.01"
          />
        </div>

        <button
          onClick={calculerLongueurSpiral}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculer la longueur
        </button>
      </div>

      {longueurSpiral !== null && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-900">Résultat :</p>
          </div>
          <p className="text-3xl font-bold text-green-700 mb-2">
            {longueurSpiral.toFixed(1)} mm
          </p>
          <p className="text-sm text-green-700">
            Soit environ <strong>{(longueurSpiral / 10).toFixed(1)} cm</strong>
          </p>
        </div>
      )}
    </div>
  );
}
