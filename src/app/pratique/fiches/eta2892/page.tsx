'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wrench,
  ShieldCheck
} from 'lucide-react';

export default function Eta2892FichePage() {
  const [zoom, setZoom] = useState<number>(1);
  const [activeView, setActiveView] = useState<'rotor' | 'echap'>('rotor');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <Link
            href="/pratique/fiches"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux Fiches Techniques &amp; Nomenclatures</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <span>🇨🇭 Communication Technique d&apos;Établi • Calibre Extra-Plat Haute Horlogerie</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Calibre ETA 2892-A2 (et Sellita SW300-1)
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Le tracteur extra-plat (3.60 mm) des plus grandes maisons suisses (base Omega Co-Axial 1120/2500, IWC, Cartier) : remontage bidirectionnel à deux roues inverseuses, roulement à 7 billes et réglage micrométrique Etachron.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono text-xs shrink-0">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">DIAMÈTRE</span>
                <strong className="text-amber-600 dark:text-amber-400">11½&apos;&apos;&apos; (25.6 mm)</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">HAUTEUR</span>
                <strong className="text-slate-900 dark:text-white">3.60 mm (Extra-plat)</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">FRÉQUENCE</span>
                <strong className="text-emerald-600 dark:text-emerald-400">28&apos;800 A/h (4 Hz)</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">ANGLE LEVÉE</span>
                <strong className="text-amber-600 dark:text-amber-400">51° / 52° (21 rubis)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Schéma Vectoriel Coupe Micro-Mécanique + Loupe 10x */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveView('rotor')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeView === 'rotor'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                1. Pont d&apos;Automatique &amp; Inverseurs (1488)
              </button>
              <button
                onClick={() => setActiveView('echap')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeView === 'echap'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                2. Barillet Extra-Plat &amp; Réglage Etachron
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Loupe d&apos;Atelier :</span>
              {[1, 1.5, 2].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setZoom(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-bold border ${
                    zoom === lvl
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl}x
                </button>
              ))}
            </div>
          </div>

          <div
            className="w-full rounded-2xl border border-amber-500/30 overflow-auto p-4"
            style={{ background: '#070C18', maxHeight: '420px' }}
          >
            <div style={{ width: `${zoom * 100}%`, minWidth: '680px', transition: 'width 0.25s ease' }}>
              <svg viewBox="0 0 800 300" className="w-full h-auto block select-none">
                {activeView === 'rotor' ? (
                  <g>
                    <text x="24" y="30" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      CINÉMATIQUE DU REMONTAGE AUTOMATIQUE BIDIRECTIONNEL (ETA 2892-A2)
                    </text>

                    {/* Roulement à 7 billes central */}
                    <circle cx="220" cy="155" r="56" fill="#0F172A" stroke="#D4AF37" strokeWidth="2.5" />
                    <circle cx="220" cy="155" r="32" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" />
                    {[0, 51, 102, 154, 205, 257, 308].map((deg, idx) => (
                      <circle
                        key={idx}
                        cx="220"
                        cy="123"
                        r="5.5"
                        fill={idx % 2 === 0 ? '#38BDF8' : '#E2E8F0'}
                        transform={`rotate(${deg} 220 155)`}
                      />
                    ))}
                    <text x="220" y="236" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Roulement Rotor à 7 Billes (1143)
                    </text>
                    <text x="220" y="251" textAnchor="middle" fill="#38BDF8" fontSize="9.5" fontFamily="monospace">
                      Moebius 9010 : 1 micro-goutte sur 3 billes
                    </text>

                    {/* Couple des 2 Roues Inverseuses (1488) */}
                    <circle cx="465" cy="125" r="36" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle cx="465" cy="125" r="8" fill="#E11D48" />
                    <circle cx="525" cy="175" r="36" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle cx="525" cy="175" r="8" fill="#E11D48" />
                    <text x="495" y="242" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Double Roue Inverseuse (N° 1488)
                    </text>
                    <text x="495" y="257" textAnchor="middle" fill="#10B981" fontSize="9.5" fontFamily="monospace">
                      Lubrification par bain Lubeta V105 uniquement
                    </text>
                  </g>
                ) : (
                  <g>
                    <text x="24" y="30" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      ORGANE RÉGLANT ETACHRON &amp; COUPLE DE BARILLET EXTRA-PLAT (3.60 MM)
                    </text>
                    <circle cx="260" cy="155" r="62" fill="#0F172A" stroke="#D4AF37" strokeWidth="2.5" />
                    <circle cx="260" cy="155" r="14" fill="#F59E0B" />
                    <text x="260" y="242" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Barillet Extra-Plat (Réserve 42h)
                    </text>
                    <text x="260" y="257" textAnchor="middle" fill="#A855F7" fontSize="9.5" fontFamily="monospace">
                      Paroi lubrifiée à la graisse Moebius 8217
                    </text>

                    <circle cx="545" cy="155" r="54" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
                    <circle cx="545" cy="155" r="9" fill="#E11D48" />
                    <text x="545" y="242" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Balancier Glucydur &amp; Spiral Anachron
                    </text>
                    <text x="545" y="257" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">
                      Angle de levée : 51° (ou 52° selon génération)
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Conseils d'Établi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-500" />
              <span>Spécificités d&apos;Atelier (ETA 2892-A2)</span>
            </h2>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              • Contrairement à l&apos;ETA 2824-2, le pont d&apos;automatique de l&apos;ETA 2892-A2 intègre l&apos;ensemble du train d&apos;armage sous un module ultra-plat retenu par 3 vis bleuies ou polies.<br />
              • Toujours contrôler l&apos;ébat du rochet intégré sous le pont d&apos;automatique avant serrage complet.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Cotes d&apos;Aiguillage &amp; Tigerie</span>
            </h2>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              • Canon des Heures : <strong>Ø 1.50 mm</strong> · Canon des Minutes : <strong>Ø 0.90 mm</strong> · Seconde : <strong>Ø 0.25 mm</strong>.<br />
              • Tige de remontoir : <strong>N° 401-2892</strong> (filetage Ø 0.90 mm) — lubrification Moebius 9504.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
