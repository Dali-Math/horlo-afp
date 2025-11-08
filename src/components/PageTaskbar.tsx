'use client';

import React, { useState } from 'react';
import { ChevronLeft, Battery } from 'lucide-react';
import Link from 'next/link';

export default function PageTaskbar() {
  const [expertMode, setExpertMode] = useState(false);
  const [energyLevel] = useState(100);

  return (
    <header className="fixed top-[72px] left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* 🔙 Retour */}
          <Link
            href="/theorie"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </Link>

          {/* 🔋 Indicateur d'énergie + Mode */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-amber-400" />
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 transition-all duration-300"
                  style={{ width: `${energyLevel}%` }}
                />
              </div>
              <span className="text-sm font-mono text-amber-400">{energyLevel}%</span>
            </div>

            <button
              onClick={() => setExpertMode(!expertMode)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                expertMode
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50'
                  : 'bg-slate-800 text-amber-400 border border-amber-500/30'
              }`}
            >
              {expertMode ? '👨‍🔬 Expert' : '🎓 Apprenant'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
