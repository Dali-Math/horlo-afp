'use client';

/**
 * HorloLearn — Simulateur 03 : Contrôleur de gardes d'aiguillage NIHS 91-10
 * Coupe transversale dynamique : cadran → heures → minutes → trotteuse → glace.
 * Minima officiels : G1 ≥ 0.20 · G2 ≥ 0.15 · G3 ≥ 0.15 · G4 ≥ 0.25 mm.
 */

import { useState } from 'react';
import { CheckCircle2, Clock, Ruler, AlertTriangle, ZoomIn } from 'lucide-react';
import { STEPS_DATA, type StepData } from '@/lib/emboitage/data';

const G_MIN = { g1: 0.2, g2: 0.15, g3: 0.15, g4: 0.25 };

interface GardeRow {
  key: 'g1' | 'g2' | 'g3' | 'g4';
  label: string;
  between: string;
  min: number;
  value: number;
  set: (v: number) => void;
  min0: number;
  max: number;
  color: string;
  failMsg: string;
}

export default function SimGardes({ openLoupe }: { openLoupe: (step: StepData) => void }) {
  const [g1, setG1] = useState(0.22);
  const [g2, setG2] = useState(0.18);
  const [g3, setG3] = useState(0.18);
  const [g4, setG4] = useState(0.3);
  const [isRotating, setIsRotating] = useState(false);

  const trigger12h = () => {
    setIsRotating(true);
    window.setTimeout(() => setIsRotating(false), 900);
  };

  const rows: GardeRow[] = [
    { key: 'g1', label: 'G1 — Cadran ↔ Heures', between: 'garde index appliqués', min: G_MIN.g1, value: g1, set: setG1, min0: 0.05, max: 0.45, color: 'text-rose-600', failMsg: "FROTTEMENT G1 : l'aiguille des heures frotte les index en relief à 12 h ou 6 h. Relevez-la au chasse-aiguilles avec protecteur Mylar." },
    { key: 'g2', label: 'G2 — Heures ↔ Minutes', between: 'parallélisme', min: G_MIN.g2, value: g2, set: setG2, min0: 0.05, max: 0.4, color: 'text-sky-700', failMsg: "COLLISION G2 : les deux aiguilles se touchent en superposition à 12h00. Baisse d'amplitude et arrêt de montre garantis." },
    { key: 'g3', label: 'G3 — Minutes ↔ Trotteuse', between: 'liberté canon', min: G_MIN.g3, value: g3, set: setG3, min0: 0.05, max: 0.4, color: 'text-violet-700', failMsg: "G3 INSUFFISANT : la trotteuse plonge sur les minutes, freine l'échappement et fausse la marche." },
    { key: 'g4', label: 'G4 — Trotteuse ↔ Glace', between: 'garde glace saphir', min: G_MIN.g4, value: g4, set: setG4, min0: 0.1, max: 0.5, color: 'text-emerald-600', failMsg: "G4 INSUFFISANT : toute flexion de la glace touche la trotteuse — arrêt brutal au moindre appui sur le saphir." },
  ];

  const allOk = g1 >= G_MIN.g1 && g2 >= G_MIN.g2 && g3 >= G_MIN.g3 && g4 >= G_MIN.g4;
  const failures = rows.filter((r) => r.value < r.min);

  // Géométrie empilée de la coupe (px par mm)
  const S = 150;
  const hourY = 170 - g1 * S;
  const minY = hourY - g2 * S - 35;
  const secY = minY - g3 * S - 33;

  return (
    <div className="bg-cream-card rounded-3xl border border-cream-border p-5 sm:p-8 shadow-sm space-y-8 hl-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cream-border gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md bg-bronze/10 text-bronze-dark border border-bronze/25 text-xs font-label font-bold">
            SIMULATEUR INTERACTIF 03 · ÉTAPE 02
          </span>
          <h2 className="font-display text-2xl text-ink mt-1.5">Contrôleur de gardes d'aiguillage NIHS 91-10</h2>
          <p className="text-sm text-ink-soft mt-1 max-w-2xl">
            Garantir le jeu fonctionnel micrométrique entre le cadran, les aiguilles et la glace saphir.
            Bougez chaque garde et observez la coupe transversale s'empiler en direct.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openLoupe(STEPS_DATA[1])}
            className="px-3.5 py-2 rounded-xl bg-bronze/10 text-bronze-dark hover:bg-bronze hover:text-white text-xs font-label font-bold transition border border-bronze/30 flex items-center gap-1.5"
          >
            <ZoomIn className="w-4 h-4" /> Gardes NIHS 10x
          </button>
          <button
            onClick={trigger12h}
            className="px-4 py-2 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-xs font-bold shadow transition flex items-center gap-2"
          >
            <Clock className="w-4 h-4" /> Simuler tour 12 h
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coupe dynamique */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-cream-tile border border-cream-border p-5">
            <div className="flex justify-between text-xs font-label text-ink-soft pb-2 mb-3 border-b border-cream-border">
              <span className="uppercase tracking-wider font-bold">Coupe transversale dynamique des canons</span>
              <span className={`font-bold ${allOk ? 'text-emerald-600' : 'text-red-600'}`}>
                {allOk ? 'AUCUNE COLLISION' : `${failures.length} DÉFAUT(S) DÉTECTÉ(S)`}
              </span>
            </div>

            <svg viewBox="0 0 450 230" className="w-full h-auto rounded-xl bg-cream-card border border-cream-border" xmlns="http://www.w3.org/2000/svg">
              {/* Glace mobile selon G4 */}
              <g transform={`translate(0, ${Math.max(6, (0.45 - g4) * 150 - 40)})`} className="transition-transform duration-300">
                <path d="M30,30 Q225,15 420,30 L420,40 Q225,25 30,40 Z" fill="#BAE6FD" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1" />
                <text x="350" y="24" fill="#0369A1" fontSize="9" fontFamily="var(--font-jbmono), monospace">Glace saphir</text>
              </g>

              {/* Charnier + cadran */}
              <rect x="50" y="45" width="20" height="150" fill="#334155" stroke="#64748b" strokeWidth="1" />
              <rect x="58" y="45" width="4" height="150" fill="#38bdf8" opacity="0.7" />

              <rect x="30" y="170" width="390" height="10" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <rect x="330" y="152" width="25" height="18" fill="#ca8a04" stroke="#92400e" strokeWidth="0.8" />
              <text x="342" y="146" fill="#92400E" fontSize="8" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Index 12 h</text>

              {/* Aiguille des heures */}
              <g transform={`translate(0, ${hourY - 135})`} className="transition-transform duration-300">
                <rect x="68" y="135" width="220" height="8" rx="2" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                <circle cx="68" cy="139" r="6" fill="#eab308" stroke="#92400e" strokeWidth="0.8" />
                <text x="295" y="141" fill="#92400E" fontSize="8" fontFamily="var(--font-jbmono), monospace">Heures</text>
              </g>

              {/* Aiguille des minutes */}
              <g transform={`translate(0, ${minY - 100})`} className="transition-transform duration-300">
                <rect x="68" y="100" width="280" height="7" rx="1.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
                <circle cx="68" cy="103" r="5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
                <text x="355" y="105" fill="#334155" fontSize="8" fontFamily="var(--font-jbmono), monospace">Minutes</text>
              </g>

              {/* Trotteuse */}
              <g transform={`translate(${isRotating ? 12 : 0}, ${secY - 65})`} className="transition-transform duration-500">
                <rect x="60" y="65" width="330" height="3.5" rx="1" fill="#2563eb" stroke="#1e3a8a" strokeWidth="0.5" />
                <circle cx="68" cy="67" r="3.5" fill="#0284c7" />
                <text x="396" y="69" fill="#2563EB" fontSize="8" fontFamily="var(--font-jbmono), monospace">Secondes</text>
              </g>

              {/* Échelle de cotes */}
              <line x1="425" y1="45" x2="425" y2="175" stroke="#B9AC93" strokeWidth="1" />
              <text x="432" y="110" fill="#64748b" fontSize="7" fontFamily="var(--font-jbmono), monospace" transform="rotate(90 432 110)">Empilement NIHS</text>
            </svg>

            <p className="text-[11.5px] text-ink-soft mt-2.5">
              La glace descend quand G4 s'amincit : surveillez le contact avec la trotteuse bleuie. Le bouton
              « Tour 12 h » simule le contrôle de parallélisme complet.
            </p>
          </div>
        </div>

        {/* Curseurs + verdict */}
        <div className="lg:col-span-5 space-y-4">
          <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5 text-bronze" /> Réglage des quatre gardes
          </span>

          {rows.map((r) => {
            const ok = r.value >= r.min;
            return (
              <div key={r.key} className={`p-3.5 rounded-xl border transition ${ok ? 'bg-cream-tile border-cream-border' : 'bg-red-50 border-red-300'}`}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-[13px] text-ink font-medium">
                    {r.label} <span className="text-ink-soft text-[11px]">· {r.between}</span>
                  </span>
                  <span className={`font-label font-bold text-sm ${ok ? r.color : 'text-red-600'}`}>
                    {r.value.toFixed(2)} mm
                  </span>
                </div>
                <input
                  type="range"
                  className="hl-slider w-full"
                  min={r.min0}
                  max={r.max}
                  step="0.01"
                  value={r.value}
                  onChange={(e) => r.set(parseFloat(e.target.value))}
                  aria-label={r.label}
                />
                <div className="flex justify-between mt-1 text-[10px] font-label">
                  <span className={ok ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>mini NIHS {r.min.toFixed(2)} mm</span>
                  <span className="text-ink-soft">{ok ? 'conforme ✓' : `manque ${(r.min - r.value).toFixed(2)} mm`}</span>
                </div>
              </div>
            );
          })}

          {allOk ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">GARDES NIHS CONFORMES :</strong>
                Toutes les distances de sécurité respectent la norme suisse NIHS 91-10. Aucun risque de
                rayure ni de blocage d'amplitude.
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-1">DÉFAUT(S) DE GARDE :</strong>
                <ul className="list-disc list-inside space-y-0.5">
                  {failures.map((f) => (
                    <li key={f.key}>{f.failMsg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
