'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Sliders,
  Activity,
  Compass,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { calculateSpiral, generateDXF, SpiralParams } from '@/lib/spiral-calculator';
import spiralsDb from '@/lib/spirals-database.json';

export default function ReglageSpiralLabPage() {
  const [diametre, setDiametre] = useState<number>(10.0);
  const [frequence, setFrequence] = useState<number>(28800);
  const [amplitude, setAmplitude] = useState<number>(290);
  const [materiau, setMateriau] = useState<'nivarox' | 'silicium' | 'acier'>('nivarox');
  const [typeSpiral, setTypeSpiral] = useState<'phillips' | 'breguet' | 'grossmann'>('breguet');
  const [selectedCaliberId, setSelectedCaliberId] = useState<string>('eta-2824-2');
  const [zoom, setZoom] = useState<number>(1);

  const movementsList = useMemo(() => {
    return Array.isArray((spiralsDb as any).movements)
      ? (spiralsDb as any).movements.slice(0, 24)
      : [];
  }, []);

  const handleSelectCaliber = (id: string) => {
    setSelectedCaliberId(id);
    const found = movementsList.find((m: any) => m.id === id);
    if (found) {
      if (found.balanceDiameter) setDiametre(Number(found.balanceDiameter));
      if (found.frequency) setFrequence(Number(found.frequency));
    }
  };

  const params: SpiralParams = useMemo(
    () => ({ diametre, frequence, amplitude, materiau, typeSpiral }),
    [diametre, frequence, amplitude, materiau, typeSpiral]
  );

  const results = useMemo(() => calculateSpiral(params), [params]);

  // Génération des points de la spirale d'Archimède r(θ) = r0 + a·θ pour le schéma SVG
  const spiralPoints = useMemo(() => {
    const pts: string[] = [];
    const cx = 240;
    const cy = 165;
    const r0 = 16;
    const rMax = Math.min(115, diametre * 8.2);
    const totalTurns = Math.max(8, Math.min(16, results.spires));
    const maxTheta = totalTurns * 2 * Math.PI;
    const steps = 260;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTheta;
      const r = r0 + ((rMax - r0) * t) / maxTheta;
      const x = cx + r * Math.cos(t);
      const y = cy + r * Math.sin(t);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return { polyline: pts.join(' '), rMax, cx, cy };
  }, [diametre, results.spires]);

  const handleDownloadDxf = () => {
    const dxfContent = generateDXF(params, results);
    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spiral-horlolearn-${diametre}mm-${frequence}Ah-${typeSpiral}.dxf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
                <span>🇨🇭 Laboratoire de Réglage &amp; Chronométrie • Export CAO .DXF</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Calculateur de Spiral &amp; Courbe Terminale Phillips / Breguet
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Dimensionnez la longueur active $L$, le nombre de spires, le rayon de corne d&apos;âge et l&apos;inertie du balancier selon les théorèmes d&apos;Édouard Phillips (développement concentrique isochrone), puis exportez le tracé en fichier CAO <code>.dxf</code>.
              </p>
            </div>

            <button
              onClick={handleDownloadDxf}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Exporter Plan CAO (.DXF)</span>
            </button>
          </div>
        </div>

        {/* Grille Principale : Paramètres (4 cols) + Planche SVG Spiral (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panneau de Calcul */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase text-amber-500 font-bold mb-1.5">
                Charger un Calibre de Référence :
              </label>
              <select
                value={selectedCaliberId}
                onChange={(e) => handleSelectCaliber(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-900 dark:text-white"
              >
                {movementsList.map((m: any) => (
                  <option key={m.id} value={m.id}>
                    {m.brand} {m.caliber} ({m.frequency} A/h • Ø {m.balanceDiameter} mm)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-500">Diamètre du Balancier (Ø) :</span>
                <strong className="text-amber-500">{diametre.toFixed(1)} mm</strong>
              </div>
              <input
                type="range"
                min="7.0"
                max="15.0"
                step="0.2"
                value={diametre}
                onChange={(e) => setDiametre(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <span className="block text-xs font-mono text-slate-500 mb-1.5">Fréquence d&apos;Oscillation :</span>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {[18000, 21600, 28800, 36000].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequence(f)}
                    className={`py-2 rounded-xl font-bold border ${
                      frequence === f
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {f / 7200} Hz
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-mono text-slate-500 mb-1.5">Alliage du Spiral :</span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                {(
                  [
                    { id: 'nivarox', label: 'Nivarox 1' },
                    { id: 'silicium', label: 'Silicium' },
                    { id: 'acier', label: 'Acier Bleui' }
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMateriau(m.id)}
                    className={`py-2 rounded-xl font-bold border ${
                      materiau === m.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-mono text-slate-500 mb-1.5">Courbe Terminale Isochrone :</span>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                {(
                  [
                    { id: 'breguet', label: 'Breguet' },
                    { id: 'phillips', label: 'Phillips' },
                    { id: 'grossmann', label: 'Grossmann' }
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setTypeSpiral(c.id)}
                    className={`py-2 rounded-xl font-bold border ${
                      typeSpiral === c.id
                        ? 'bg-sky-500 text-slate-950 border-sky-500'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Résultats Physiques Calculés */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Longueur Active (L) :</span>
                <strong className="text-amber-500">{results.longueur} mm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nombre de Spires :</span>
                <strong className="text-slate-900 dark:text-white">{results.spires} spires</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rayon Corne d&apos;Âge :</span>
                <strong className="text-emerald-500">{results.rayonCorne} mm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hauteur Levée Breguet :</span>
                <strong className="text-sky-500">{results.levee} mm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Période T :</span>
                <strong className="text-slate-900 dark:text-white">{(results.periode * 1000).toFixed(1)} ms</strong>
              </div>
            </div>
          </div>

          {/* Planche Géométrique SVG avec Loupe 10x */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Épure Géométrique NIHS • Virole, Spires &amp; Courbe Terminale {typeSpiral.toUpperCase()}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Développement Concentrique du Spiral ({materiau.toUpperCase()} • {frequence.toLocaleString()} A/h)
                </h2>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-slate-400">Loupe :</span>
                {[1, 1.5, 2].map((z) => (
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
              style={{ background: '#060B16', maxHeight: '440px' }}
            >
              <div style={{ width: `${zoom * 100}%`, minWidth: '600px', transition: 'width 0.25s ease' }}>
                <svg viewBox="0 0 680 330" className="w-full h-auto block select-none">
                  {/* Axes de centrage */}
                  <line x1="240" y1="15" x2="240" y2="315" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="40" y1="165" x2="440" y2="165" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Serrege / Jante du Balancier (Cercle pointillé Or) */}
                  <circle
                    cx={spiralPoints.cx}
                    cy={spiralPoints.cy}
                    r={Math.min(138, spiralPoints.rMax + 22)}
                    fill="none"
                    stroke="#D4AF37"
                    strokeOpacity="0.45"
                    strokeWidth="4"
                    strokeDasharray="10 4"
                  />

                  {/* Spirale d'Archimède */}
                  <polyline
                    fill="none"
                    stroke={materiau === 'silicium' ? '#A855F7' : materiau === 'acier' ? '#38BDF8' : '#60A5FA'}
                    strokeWidth="1.6"
                    points={spiralPoints.polyline}
                  />

                  {/* Courbe Terminale Relevée Breguet + Corne d'Âge (en rouge/ambre) */}
                  {typeSpiral === 'breguet' && (
                    <path
                      d={`M ${spiralPoints.cx + spiralPoints.rMax},${spiralPoints.cy} C ${spiralPoints.cx + spiralPoints.rMax},${spiralPoints.cy - 65} ${spiralPoints.cx + spiralPoints.rMax * 0.45},${spiralPoints.cy - 82} ${spiralPoints.cx + spiralPoints.rMax * 0.68},${spiralPoints.cy - 52}`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Virole centrale (Collet) + Rubis d'axe */}
                  <circle cx={spiralPoints.cx} cy={spiralPoints.cy} r="14" fill="#1E293B" stroke="#FDE68A" strokeWidth="2" />
                  <circle cx={spiralPoints.cx} cy={spiralPoints.cy} r="5.5" fill="#E11D48" />

                  {/* Piton (740) & Goupilles de Raquette */}
                  <rect x={spiralPoints.cx + spiralPoints.rMax - 5} y={spiralPoints.cy - 6} width="12" height="12" rx="2" fill="#FDE68A" />
                  <circle cx={spiralPoints.cx + spiralPoints.rMax * 0.68 - 3} cy={spiralPoints.cy - 52} r="3" fill="#10B981" />
                  <circle cx={spiralPoints.cx + spiralPoints.rMax * 0.68 + 4} cy={spiralPoints.cy - 52} r="3" fill="#10B981" />

                  {/* Légende Technique à droite */}
                  <g transform="translate(455, 42)" fontFamily="monospace" fontSize="10.5">
                    <rect x="0" y="0" width="205" height="245" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                    <text x="14" y="26" fill="#FBBF24" fontWeight="bold">COTES D&apos;ATELIER NIHS</text>
                    <text x="14" y="52" fill="#94A3B8">Ø Balancier : <tspan fill="#F8FAFC" fontWeight="bold">{diametre.toFixed(1)} mm</tspan></text>
                    <text x="14" y="74" fill="#94A3B8">Longueur L : <tspan fill="#F8FAFC" fontWeight="bold">{results.longueur} mm</tspan></text>
                    <text x="14" y="96" fill="#94A3B8">Spires utiles : <tspan fill="#F8FAFC" fontWeight="bold">{results.spires}</tspan></text>
                    <text x="14" y="118" fill="#94A3B8">Corne d&apos;âge : <tspan fill="#10B981" fontWeight="bold">r = {results.rayonCorne} mm</tspan></text>
                    <text x="14" y="140" fill="#94A3B8">Levée Breguet : <tspan fill="#38BDF8" fontWeight="bold">{results.levee} mm</tspan></text>
                    <line x1="14" y1="158" x2="191" y2="158" stroke="#334155" />
                    <text x="14" y="180" fill="#10B981" fontWeight="bold">● Goupilles de Raquette</text>
                    <text x="14" y="198" fill="#FDE68A" fontWeight="bold">■ Piton de Fixation (740)</text>
                    <text x="14" y="216" fill="#F59E0B" fontWeight="bold">― Courbe Terminale</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
