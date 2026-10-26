'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Square,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export default function ChronographeInteractivePage() {
  const [chronoState, setChronoState] = useState<'stopped_zero' | 'running' | 'stopped_paused'>('stopped_zero');
  const [archType, setArchType] = useState<'column' | 'cam'>('column');
  const [elapsedTenths, setElapsedTenths] = useState<number>(0);
  const [columnStep, setColumnStep] = useState<number>(0);
  const [safetyAlert, setSafetyAlert] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    if (chronoState !== 'running') return;
    const interval = setInterval(() => {
      setElapsedTenths((prev) => (prev + 1) % 600);
    }, 100);
    return () => clearInterval(interval);
  }, [chronoState]);

  // Action Poussoir 2h (Start / Stop)
  const handlePusher2h = () => {
    setSafetyAlert(null);
    if (chronoState === 'running') {
      setChronoState('stopped_paused');
      setColumnStep((prev) => prev + 1);
    } else {
      setChronoState('running');
      setColumnStep((prev) => prev + 1);
    }
  };

  // Action Poussoir 4h (Remise à zéro / Reset)
  const handlePusher4h = () => {
    if (chronoState === 'running') {
      setSafetyAlert(
        'INTERDICTION MÉCANIQUE : Le bec de sécurité bloque le marteau (8200) tant que le chronographe est embrayé ! Appuyez d’abord sur STOP (Poussoir 2h).'
      );
      return;
    }
    setSafetyAlert(null);
    setElapsedTenths(0);
    setChronoState('stopped_zero');
  };

  const secAngle = (elapsedTenths / 600) * 360;
  const isEngaged = chronoState === 'running';
  const isBrakeApplied = chronoState === 'stopped_paused';
  const isHammerDown = chronoState === 'stopped_zero';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Retour & En-tête */}
        <div>
          <Link
            href="/ressources"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux Ressources Horlogères</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <span>🇨🇭 Banc Cinématique Interactif • Haute Complication</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Simulateur de Chronographe : Roue à Colonnes vs Came Navette
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Actionnez vous-même les poussoirs à <strong>2 heures (Start / Stop)</strong> et à <strong>4 heures (Remise à Zéro)</strong> pour observer en temps réel la coordination entre l&apos;embrayage, le frein de chronographe et la chute des marteaux sur les cœurs.
              </p>
            </div>
          </div>
        </div>

        {/* Alerte de Sécurité si appui sur 4h en marche */}
        {safetyAlert && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-600 dark:text-red-300 text-xs font-mono flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{safetyAlert}</span>
          </div>
        )}

        {/* BANC DE SIMULATION INTERACTIF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panneau de Commande des Poussoirs (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">
                  Poste de Commande Manuelle
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Actionner les Poussoirs
                </h2>
              </div>

              {/* Choix Architecture : Roue à Colonnes vs Came Navette */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setArchType('column')}
                  className={`p-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                    archType === 'column'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Roue à Colonnes
                  <span className="block text-[10px] opacity-80 font-normal mt-0.5">El Primero / 4130</span>
                </button>
                <button
                  onClick={() => setArchType('cam')}
                  className={`p-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                    archType === 'cam'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Came Navette
                  <span className="block text-[10px] opacity-80 font-normal mt-0.5">Valjoux 7750</span>
                </button>
              </div>

              {/* Boutons Poussoirs 2h et 4h */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handlePusher2h}
                  className={`w-full py-4 px-5 rounded-2xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-between shadow-md active:scale-95 ${
                    isEngaged
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  }`}
                >
                  <span>{isEngaged ? '⏸ POUSSOIR 2H : STOP (DÉBRAYER)' : '▶ POUSSOIR 2H : START (EMBRAYER)'}</span>
                  <span className="px-2 py-0.5 rounded bg-black/20 text-[10px]">2H</span>
                </button>

                <button
                  onClick={handlePusher4h}
                  className="w-full py-4 px-5 rounded-2xl bg-slate-900 dark:bg-white/10 hover:bg-red-500 hover:text-white text-white font-mono text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-between shadow-sm active:scale-95"
                >
                  <span>↺ POUSSOIR 4H : RESET (MARTEAUX)</span>
                  <span className="px-2 py-0.5 rounded bg-white/15 text-[10px]">4H</span>
                </button>
              </div>

              {/* État mécanique instantané des 3 organes */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">1. Embrayage (8080) :</span>
                  <strong className={isEngaged ? 'text-emerald-500' : 'text-slate-400'}>
                    {isEngaged ? 'EN PRISE (1/3 DENT)' : 'DÉBRAYÉ'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">2. Frein (8220) :</span>
                  <strong className={isBrakeApplied ? 'text-amber-500' : 'text-slate-400'}>
                    {isBrakeApplied ? 'APPUYÉ (BLOQUÉ)' : 'DÉGAGÉ (LIBRE)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">3. Marteaux (8200) :</span>
                  <strong className={isHammerDown ? 'text-sky-500' : 'text-slate-400'}>
                    {isHammerDown ? 'SUR LES CŒURS (00.0s)' : 'ARMÉS (RELEVÉS)'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 pt-3">
              Temps mesuré : <strong className="text-amber-500 text-sm">{(elapsedTenths / 10).toFixed(1)} s</strong>
            </div>
          </div>

          {/* Vue Cinématique SVG Haute Précision (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Vue Côté Ponts • État : {chronoState === 'running' ? 'CHRONOGRAPHE EN MARCHE' : chronoState === 'stopped_paused' ? 'ARRÊTÉ (LECTURE DU TEMPS)' : 'REMIS À ZÉRO'}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {archType === 'column'
                    ? 'Coordination par Roue à 8 Colonnes Piliers & Bec de Bascule'
                    : 'Coordination par Came Navette (Coulisse Valjoux 7750)'}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-slate-400">Loupe :</span>
                {[1, 1.5].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${
                      zoom === z
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full rounded-2xl border border-amber-500/30 overflow-auto p-4"
              style={{ background: '#060B16', maxHeight: '420px' }}
            >
              <div style={{ width: `${zoom * 100}%`, minWidth: '620px', transition: 'width 0.25s ease' }}>
                <svg viewBox="0 0 720 320" className="w-full h-auto block select-none">
                  {/* 1. ORGANE DE COMMANDE (GAUCHE : ROUE À COLONNES OU CAME NAVETTE) */}
                  <g transform="translate(175, 165)">
                    {archType === 'column' ? (
                      <g transform={`rotate(${columnStep * 22.5})`} style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                        {/* Base Rocher à 16 dents de la roue à colonnes */}
                        <circle cx="0" cy="0" r="58" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="6 3" />
                        <circle cx="0" cy="0" r="46" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
                        {/* 8 Colonnes Piliers en Acier Poli */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <rect
                            key={deg}
                            x="-5"
                            y="-42"
                            width="10"
                            height="12"
                            rx="2"
                            fill="#F8FAFC"
                            stroke="#38BDF8"
                            strokeWidth="1"
                            transform={`rotate(${deg})`}
                          />
                        ))}
                        <circle cx="0" cy="0" r="10" fill="#F59E0B" />
                      </g>
                    ) : (
                      <g
                        transform={`rotate(${isEngaged ? 14 : 0})`}
                        style={{ transition: 'transform 0.35s ease' }}
                      >
                        <path
                          d="M -45,25 L 0,-55 L 48,-25 L 32,45 L -30,48 Z"
                          fill="#1E293B"
                          stroke="#F8FAFC"
                          strokeWidth="2.5"
                        />
                        <circle cx="0" cy="5" r="9" fill="#F59E0B" />
                      </g>
                    )}
                    <text x="0" y="88" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {archType === 'column' ? 'Roue à Colonnes (8 Piliers)' : 'Came Navette (8139)'}
                    </text>
                    <text x="0" y="103" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">
                      {isEngaged ? 'Bec de bascule ENTRE 2 colonnes' : 'Bec de bascule SUR le sommet d’une colonne'}
                    </text>
                  </g>

                  {/* 2. MOBILE CENTRAL DE CHRONOGRAPHE + CŒUR + AIGUILLE (DROITE) */}
                  <g transform="translate(495, 165)">
                    {/* Roue de chronographe 8000 */}
                    <circle cx="0" cy="0" r="72" fill="#0F172A" stroke="#D4AF37" strokeWidth="3" strokeDasharray="5 2.5" />
                    <circle cx="0" cy="0" r="64" fill="none" stroke="#FDE68A" strokeWidth="1" strokeOpacity="0.5" />

                    {/* Cœur de remise à zéro + Aiguille qui tourne */}
                    <g transform={`rotate(${secAngle})`}>
                      <path
                        d="M 0,28 C -22,12 -26,-16 -10,-26 C -2,-31 0,-20 0,-20 C 0,-20 2,-31 10,-26 C 26,-16 22,12 0,28 Z"
                        fill="#D97706"
                        fillOpacity="0.45"
                        stroke="#FDE68A"
                        strokeWidth="2"
                      />
                      <line x1="0" y1="16" x2="0" y2="-62" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="5" fill="#FDE68A" />
                    </g>

                    {/* Pignon Oscillant / Roue d'embrayage (bascule vers la roue quand isEngaged = true) */}
                    <g
                      transform={`translate(${isEngaged ? -92 : -108}, 0)`}
                      style={{ transition: 'transform 0.3s ease' }}
                    >
                      <circle cx="0" cy="0" r="24" fill="#1E293B" stroke={isEngaged ? '#10B981' : '#64748B'} strokeWidth="3" strokeDasharray="4 2" />
                      <circle cx="0" cy="0" r="5" fill="#F8FAFC" />
                      <text x="0" y="40" textAnchor="middle" fill={isEngaged ? '#10B981' : '#94A3B8'} fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        {isEngaged ? 'Embrayé (1/3)' : 'Débrayé'}
                      </text>
                    </g>

                    {/* Marteau de Remise à Zéro (8200) en haut */}
                    <g
                      transform={`translate(0, ${isHammerDown ? -48 : -86})`}
                      style={{ transition: 'transform 0.25s ease' }}
                    >
                      <path d="M -28,-22 L 28,-22 L 18,0 L -18,0 Z" fill="#38BDF8" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="2" />
                      <text x="0" y="-28" textAnchor="middle" fill="#38BDF8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        Marteau (8200) : {isHammerDown ? 'EN APPUI SUR CŒUR' : 'RELEVÉ'}
                      </text>
                    </g>

                    {/* Frein de chronographe (8220) en bas à droite */}
                    <g
                      transform={`translate(${isBrakeApplied ? 56 : 74}, ${isBrakeApplied ? 48 : 62})`}
                      style={{ transition: 'transform 0.25s ease' }}
                    >
                      <rect x="-12" y="-6" width="28" height="10" rx="3" fill={isBrakeApplied ? '#F59E0B' : '#475569'} transform="rotate(-38)" />
                      <text x="12" y="24" textAnchor="middle" fill={isBrakeApplied ? '#FBBF24' : '#64748B'} fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        Frein : {isBrakeApplied ? 'BLOQUÉ' : 'LIBRE'}
                      </text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau Comparatif d'Ingénierie : Roue à Colonnes vs Came Navette */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Comparatif Technique : Roue à Colonnes vs Came Navette (Coulisse)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Critère Horloger</th>
                  <th className="py-3 px-3">Roue à Colonnes (Säulenrad)</th>
                  <th className="py-3 px-3">Came Navette / Coulisse (Schaltnocke)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Mouvement de l&apos;organe</td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400">Rotation unidirectionnelle pas-à-pas par cliquet</td>
                  <td className="py-3 px-3 text-amber-600 dark:text-amber-400">Basculement alternatif aller-retour sur axe</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Toucher au poussoir</td>
                  <td className="py-3 px-3">Franc, soyeux, course courte (~1.2 mm)</td>
                  <td className="py-3 px-3">Plus ferme au déclenchement (effort d&apos;armage de la came)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Calibres de référence</td>
                  <td className="py-3 px-3">Zenith El Primero 400, Rolex 4130, Longines L688, Patek CH 29-535</td>
                  <td className="py-3 px-3">ETA / Valjoux 7750, Sellita SW500, Lemania 1873 (Omega 861/1861)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
