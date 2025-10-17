'use client';

import React from 'react';
import { Settings, AlertCircle } from 'lucide-react';

export default function TableauCouples() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 p-3 rounded-xl">
          <Settings className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Tableau de Couples de Serrage</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Composant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Couple (N·cm)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Remarques</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900 font-medium">Pont de balancier</td>
              <td className="px-6 py-4 text-sm text-slate-700">8-12</td>
              <td className="px-6 py-4 text-sm text-slate-600">Serrage en croix</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900 font-medium">Coq</td>
              <td className="px-6 py-4 text-sm text-slate-700">15-20</td>
              <td className="px-6 py-4 text-sm text-slate-600">Important pour stabilité</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900 font-medium">Barillet (couvercle)</td>
              <td className="px-6 py-4 text-sm text-slate-700">10-15</td>
              <td className="px-6 py-4 text-sm text-slate-600">Ne pas forcer</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900 font-medium">Vis de cadran</td>
              <td className="px-6 py-4 text-sm text-slate-700">2-4</td>
              <td className="px-6 py-4 text-sm text-slate-600">Très fragiles</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900 font-medium">Fond de boîte</td>
              <td className="px-6 py-4 text-sm text-slate-700">50-80</td>
              <td className="px-6 py-4 text-sm text-slate-600">Selon diamètre</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-900">
            <p className="font-semibold mb-1">⚠️ Important :</p>
            <p>Ces valeurs sont indicatives. Consultez toujours la documentation technique.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
