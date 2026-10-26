'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Wrench,
  ShieldCheck,
  Activity,
  Droplets,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Valjoux7750FichePage() {
  const [zoom, setZoom] = useState<number>(1);
  const [activeSubView, setActiveSubView] = useState<'pignon' | 'came' | 'huilage'>('pignon');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Retour & En-tête */}
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
                <span>🇨🇭 Communication Technique d&apos;Établi • Chronographe Automatique</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Calibre ETA / Valjoux 7750
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Conçu par Edmond Capt (1973) : chronographe intégré à came navette (coulisse), embrayage par pignon oscillant (brevet Ed. Heuer) et remontage automatique unidirectionnel sur roulement à billes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono text-xs shrink-0">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">DIAMÈTRE</span>
                <strong className="text-amber-600 dark:text-amber-400">13¼&apos;&apos;&apos; (30.0 mm)</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">HAUTEUR</span>
                <strong className="text-slate-900 dark:text-white">7.90 mm</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">FRÉQUENCE</span>
                <strong className="text-emerald-600 dark:text-emerald-400">28&apos;800 A/h (4 Hz)</strong>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-400 block">ANGLE LEVÉE</span>
                <strong className="text-amber-600 dark:text-amber-400">52.0° (25 rubis)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 1. BANC DE SCHÉMA VECTORIEL HAUTE PRÉCISION AVEC LOUPE 10x */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSubView('pignon')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeSubView === 'pignon'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                1. Engrènement Pignon Oscillant (1/3 de dent)
              </button>
              <button
                onClick={() => setActiveSubView('came')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeSubView === 'came'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                2. Came Navette (8139) &amp; Marteau Cœurs (8200)
              </button>
              <button
                onClick={() => setActiveSubView('huilage')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeSubView === 'huilage'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                3. Repères d&apos;Huilage Officiels Moebius
              </button>
            </div>

            {/* Contrôles Loupe 10x */}
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
            style={{ background: '#070C18', maxHeight: '440px' }}
          >
            <div style={{ width: `${zoom * 100}%`, minWidth: '680px', transition: 'width 0.25s ease' }}>
              <svg viewBox="0 0 800 320" className="w-full h-auto block select-none">
                <defs>
                  <linearGradient id="v7750Gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#926F1E" />
                  </linearGradient>
                  <linearGradient id="v7750Steel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                </defs>

                {/* Grille technique NIHS */}
                {[60, 120, 180, 240].map((y) => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#1E293B" strokeWidth="0.6" strokeDasharray="3 3" />
                ))}

                {activeSubView === 'pignon' && (
                  <g>
                    <text x="24" y="30" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      COUPE CINÉMATIQUE : PIGNON OSCILLANT (N° 8080) &amp; ROUE DE CHRONOGRAPHE (N° 8000) — PÉNÉTRATION À 1/3 DE DENT
                    </text>

                    {/* Mobile de Chronographe au centre (N° 8000) */}
                    <circle cx="430" cy="165" r="78" fill="none" stroke="url(#v7750Gold)" strokeWidth="6" strokeDasharray="5 3" />
                    <circle cx="430" cy="165" r="70" fill="#0F172A" stroke="url(#v7750Gold)" strokeWidth="2" />
                    <circle cx="430" cy="165" r="10" fill="#E11D48" stroke="#FDE68A" strokeWidth="1.5" />
                    <text x="430" y="196" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Mobile de Chronographe (8000)
                    </text>

                    {/* Pignon Oscillant basculé en prise (N° 8080) */}
                    <circle cx="322" cy="165" r="34" fill="none" stroke="#38BDF8" strokeWidth="5" strokeDasharray="4 2.5" />
                    <circle cx="322" cy="165" r="27" fill="#0F172A" stroke="url(#v7750Steel)" strokeWidth="2" />
                    <circle cx="322" cy="165" r="6" fill="url(#v7750Steel)" />
                    <text x="235" y="162" textAnchor="end" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Pignon Oscillant (8080)
                    </text>
                    <text x="235" y="177" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      Denture fine d&apos;embrayage
                    </text>

                    {/* Zone Zoomée de Pénétration 1/3 de dent */}
                    <circle cx="354" cy="165" r="18" fill="#10B981" fillOpacity="0.18" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />
                    <line x1="354" y1="147" x2="354" y2="82" stroke="#10B981" strokeWidth="1.2" />
                    <rect x="260" y="48" width="235" height="36" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
                    <text x="377" y="64" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      PÉNÉTRATION OPTIMALE : 1/3 DE HAUTEUR DE DENT
                    </text>
                    <text x="377" y="77" textAnchor="middle" fill="#6EE7B7" fontSize="9.5" fontFamily="monospace">
                      Réglée par la vis excentrique (évite le saut au départ)
                    </text>

                    {/* Vis Excentrique de réglage */}
                    <circle cx="630" cy="155" r="26" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
                    <circle cx="636" cy="155" r="14" fill="url(#v7750Steel)" stroke="#0F172A" strokeWidth="1.5" />
                    <line x1="624" y1="155" x2="648" y2="155" stroke="#0F172A" strokeWidth="2.5" />
                    <text x="630" y="202" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Excentrique d&apos;Embrayage
                    </text>
                    <text x="630" y="216" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">
                      Tournevis Ø 1.00 mm (Noir)
                    </text>
                  </g>
                )}

                {activeSubView === 'came' && (
                  <g>
                    <text x="24" y="30" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      ARCHITECTURE DE COMMANDE : CAME NAVETTE (N° 8139) &amp; MARTEAU DE REMISE À ZÉRO (N° 8200)
                    </text>

                    {/* Came Navette 8139 */}
                    <path
                      d="M 190,190 L 245,115 L 305,135 L 285,205 L 210,215 Z"
                      fill="#1E293B"
                      stroke="url(#v7750Steel)"
                      strokeWidth="3"
                    />
                    <circle cx="248" cy="168" r="9" fill="#F59E0B" />
                    <text x="248" y="246" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Came Navette / Coulisse (8139)
                    </text>
                    <text x="248" y="261" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      Flancs lubrifiés au Moebius 9504
                    </text>

                    {/* Marteau de chronographe 8200 et les 3 Cœurs */}
                    <path d="M 450,95 L 590,95 L 590,130 L 545,155 L 495,155 L 450,130 Z" fill="#334155" stroke="url(#v7750Steel)" strokeWidth="2" />
                    <path d="M 520,210 C 495,190 490,162 506,152 C 515,146 520,158 520,158 C 520,158 525,146 534,152 C 550,162 545,190 520,210 Z" fill="none" stroke="url(#v7750Gold)" strokeWidth="3" />
                    <circle cx="520" cy="174" r="5" fill="#E11D48" />
                    <text x="520" y="246" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      Marteau (8200) en appui plan sur Cœur
                    </text>
                    <text x="520" y="261" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      Interdiction absolue de RAZ pendant la marche
                    </text>
                  </g>
                )}

                {activeSubView === 'huilage' && (
                  <g>
                    <text x="24" y="30" fill="#FBBF24" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      CARTOGRAPHIE OFFICIELLE DES 5 LUBRIFIANTS MOEBIUS SUR CALIBRE ETA / VALJOUX 7750
                    </text>

                    {[
                      { x: 95, label: 'Moebius 9010', sub: 'Contre-pivots Balancier, Sec., Échap.', col: '#38BDF8', zone: 'Goutte Ø 60% du contre-pivot' },
                      { x: 250, label: 'Moebius HP-1300', sub: 'Barillet, Centre, Moyenne, Rochet', col: '#F59E0B', zone: 'Haute pression couple fort' },
                      { x: 405, label: 'Moebius 9415', sub: 'Palettes Rubis Ancre (710)', col: '#E11D48', zone: 'Pivots d’ancre 100% SECS' },
                      { x: 560, label: 'Moebius 9504', sub: 'Tige 401, Coulant 405, Came 8139', col: '#10B981', zone: 'Frictions acier / acier' },
                      { x: 710, label: 'Moebius 8217', sub: 'Paroi Tambour Barillet (180)', col: '#A855F7', zone: '3 touches à 120° bride auto' }
                    ].map((oil, i) => (
                      <g key={i}>
                        <circle cx={oil.x} cy="135" r="42" fill="#0F172A" stroke={oil.col} strokeWidth="2" />
                        <circle cx={oil.x} cy="135" r="14" fill={oil.col} fillOpacity="0.35" stroke={oil.col} strokeWidth="1.5" />
                        <circle cx={oil.x} cy="135" r="5" fill={oil.col} />
                        <text x={oil.x} y="205" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="monospace" fontWeight="bold">
                          {oil.label}
                        </text>
                        <text x={oil.x} y="222" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                          {oil.sub}
                        </text>
                        <text x={oil.x} y="238" textAnchor="middle" fill={oil.col} fontSize="9" fontFamily="monospace" fontWeight="bold">
                          {oil.zone}
                        </text>
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* 2. SÉQUENCE D'ATELIER & COUPLES DE SERRAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-500" />
              <span>Points Critiques de Rhabillage (Valjoux 7750)</span>
            </h2>
            <ul className="space-y-3 text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/70 dark:border-white/5">
                <strong className="text-amber-600 dark:text-amber-400 block">1. Désarmer le barillet avant toute dépose :</strong>
                Déposer d&apos;abord la masse oscillante (1143, vis Ø 1.60 mm) et le pont de dispositif automatique avant d&apos;accéder au pont de chronographe.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/70 dark:border-white/5">
                <strong className="text-amber-600 dark:text-amber-400 block">2. Ressort-sautoir de compteur des heures (côté cadran) :</strong>
                Maintenir le ressort-fil sous une feuille plastique lors du décrochage pour éviter toute perte.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/70 dark:border-white/5">
                <strong className="text-amber-600 dark:text-amber-400 block">3. Réglage des excentriques :</strong>
                Ne toucher aux vis excentriques que si l&apos;aiguille de chronographe saute au départ ou si le marteau (8200) ne ramène pas exactement les 3 cœurs à 12h00.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Couples de Serrage &amp; Tournevis (Norme NIHS)</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 text-[10px] uppercase">
                    <th className="py-2">Vis / Organe</th>
                    <th className="py-2">Couple (cNm)</th>
                    <th className="py-2">Lame Bergeon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">Vis de Masse Oscillante (1143)</td>
                    <td className="py-2.5 text-amber-500 font-bold">3.5 – 4.5 cNm</td>
                    <td className="py-2.5">Ø 1.60 mm (Violet)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">Vis de Pont de Chronographe</td>
                    <td className="py-2.5 text-amber-500 font-bold">1.8 – 2.4 cNm</td>
                    <td className="py-2.5">Ø 1.20 mm (Rouge)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">Vis de Coq de Balancier (121)</td>
                    <td className="py-2.5 text-amber-500 font-bold">1.8 – 2.2 cNm</td>
                    <td className="py-2.5">Ø 1.00 mm (Noir)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">Vis de Pont d&apos;Ancre (125)</td>
                    <td className="py-2.5 text-amber-500 font-bold">1.0 – 1.5 cNm</td>
                    <td className="py-2.5">Ø 0.80 mm (Jaune)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
