'use client';

import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function ConvertisseurUnites() {
  const [diamMm, setDiamMm] = useState<number>(28.5);
  const [diamLignes, setDiamLignes] = useState<number>(12.6);
  const [coupleNcm, setCoupleNcm] = useState<number>(10);
  const [coupleGcm, setCoupleGcm] = useState<number>(102);

  const convertMmToLignes = (mm: number) => {
    setDiamMm(mm);
    setDiamLignes(mm / 2.2558);
  };

  const convertLignesToMm = (lignes: number) => {
    setDiamLignes(lignes);
    setDiamMm(lignes * 2.2558);
  };

  const convertNcmToGcm = (ncm: number) => {
    setCoupleNcm(ncm);
    setCoupleGcm(ncm * 10.2);
  };

  const convertGcmToNcm = (gcm: number) => {
    setCoupleGcm(gcm);
    setCoupleNcm(gcm / 10.2);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-100 p-3 rounded-xl">
          <ArrowLeftRight className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Convertisseur d'Unités</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 mb-4">Diamètre de mouvement</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Millimètres (mm)
            </label>
            <input
              type="number"
              value={diamMm}
              onChange={(e) => convertMmToLignes(Number(e.target.value))}
              placeholder="Ex: 28.5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              step="0.1"
            />
          </div>
          <div className="text-center py-2">
            <ArrowLeftRight className="w-6 h-6 text-slate-400 mx-auto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lignes (''')
            </label>
            <input
              type="number"
              value={diamLignes.toFixed(2)}
              onChange={(e) => convertLignesToMm(Number(e.target.value))}
              placeholder="Ex: 12.5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              step="0.1"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>💡 Formule :</strong> 1 ligne (''') = 2.2558 mm
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 mb-4">Couples de serrage</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Newton-centimètre (N·cm)
            </label>
            <input
              type="number"
              value={coupleNcm}
              onChange={(e) => convertNcmToGcm(Number(e.target.value))}
              placeholder="Ex: 10"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              step="0.1"
            />
          </div>
          <div className="text-center py-2">
            <ArrowLeftRight className="w-6 h-6 text-slate-400 mx-auto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gramme-centimètre (g·cm)
            </label>
            <input
              type="number"
              value={coupleGcm.toFixed(1)}
              onChange={(e) => convertGcmToNcm(Number(e.target.value))}
              placeholder="Ex: 102"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-600"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>💡 Formule :</strong> 1 N·cm ≈ 10.2 g·cm
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-slate-900 mb-4">Conversions rapides</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { de: '10.5 lignes', vers: '23.7 mm' },
            { de: '11.5 lignes', vers: '25.9 mm' },
            { de: '12.5 lignes', vers: '28.2 mm' },
            { de: '13 lignes', vers: '29.3 mm' }
          ].map((conv, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-600 mb-1">{conv.de}</p>
              <p className="text-sm text-slate-400">↓</p>
              <p className="text-sm font-bold text-slate-900">{conv.vers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
