'use client';

/**
 * HorloLearn — Simulateur 03 : Contrôleur de gardes d'aiguillage NIHS 91-10
 * Coupe transversale dynamique rigoureuse :
 * Cadran (fond) → Heures → Minutes → Trotteuse → Glace Saphir (AU SOMMET).
 * 
 * Minima officiels suisses :
 * G1 (Cadran ↔ Heures) ≥ 0.20 mm
 * G2 (Heures ↔ Minutes) ≥ 0.15 mm
 * G3 (Minutes ↔ Trotteuse) ≥ 0.15 mm
 * G4 (Trotteuse ↔ Glace saphir) ≥ 0.25 mm
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
    {
      key: 'g1',
      label: 'G1 — Cadran ↔ Heures',
      between: 'garde index appliqués',
      min: G_MIN.g1,
      value: g1,
      set: setG1,
      min0: 0.05,
      max: 0.45,
      color: 'text-amber-600 dark:text-amber-400',
      failMsg: "FROTTEMENT G1 : l'aiguille des heures frotte les index en relief du cadran à 12h ou 6h. Relevez-la à l'outil aux aiguilles.",
    },
    {
      key: 'g2',
      label: 'G2 — Heures ↔ Minutes',
      between: 'parallélisme axial',
      min: G_MIN.g2,
      value: g2,
      set: setG2,
      min0: 0.05,
      max: 0.4,
      color: 'text-sky-600 dark:text-sky-400',
      failMsg: "COLLISION G2 : les aiguilles d'heures et de minutes se touchent en superposition à 12h00. Arrêt de montre immédiat.",
    },
    {
      key: 'g3',
      label: 'G3 — Minutes ↔ Trotteuse',
      between: 'dégagement canon',
      min: G_MIN.g3,
      value: g3,
      set: setG3,
      min0: 0.05,
      max: 0.4,
      color: 'text-indigo-600 dark:text-indigo-400',
      failMsg: "G3 INSUFFISANT : la trotteuse plonge sur l'aiguille des minutes, freinant l'échappement et créant une perte d'amplitude.",
    },
    {
      key: 'g4',
      label: 'G4 — Trotteuse ↔ Glace Saphir',
      between: 'garde sous-face glace',
      min: G_MIN.g4,
      value: g4,
      set: setG4,
      min0: 0.08,
      max: 0.5,
      color: 'text-emerald-600 dark:text-emerald-400',
      failMsg: "G4 INSUFFISANT : la trotteuse touche la sous-face de la glace saphir — blocage garanti au porter lors de la moindre pression.",
    },
  ];

  const allOk = g1 >= G_MIN.g1 && g2 >= G_MIN.g2 && g3 >= G_MIN.g3 && g4 >= G_MIN.g4;
  const failures = rows.filter((r) => r.value < r.min);

  // Échelle verticale en pixels par millimètre :
  // Le cadran est à la base (y = 190)
  // L'aiguille des heures est au-dessus du cadran (y décroît vers le haut)
  // L'aiguille des minutes est au-dessus des heures
  // L'aiguille des secondes (trotteuse) est au-dessus des minutes
  // La GLACE SAPHIR EST TOUT EN HAUT au-dessus de la trotteuse !
  const S = 90; // 90 pixels par mm
  const dialY = 190;
  const hourThickness = 6;
  const minThickness = 5;
  const secThickness = 3;

  // Calcul rigoureux des ordonnées (du bas vers le haut)
  const hourY = dialY - hourThickness - g1 * S;
  const minY = hourY - minThickness - g2 * S;
  const secY = minY - secThickness - g3 * S;

  // La sous-face de la glace saphir est strictement AU-DESSUS de la trotteuse (garde G4)
  const glassBottomY = secY - g4 * S;
  const glassThickness = 12;
  const glassTopY = glassBottomY - glassThickness;

  // Détection de collision physique visuelle avec la glace
  const hasGlassCollision = g4 < 0.12;

  return (
    <div className="bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8 hl-fade transition-colors">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cream-border dark:border-slate-800 gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md bg-bronze/10 text-bronze-dark dark:text-amber-400 border border-bronze/25 text-xs font-label font-bold">
            SIMULATEUR INTERACTIF 03 · ÉTAPE 02
          </span>
          <h2 className="font-display text-2xl text-ink dark:text-slate-100 mt-1.5">
            Contrôleur de gardes d'aiguillage NIHS 91-10
          </h2>
          <p className="text-sm text-ink-soft dark:text-slate-400 mt-1 max-w-2xl">
            Garantir le jeu fonctionnel micrométrique entre le cadran, les trois aiguilles et la glace saphir.
            Bougez chaque garde et observez la coupe transversale s'empiler en direct avec la glace au sommet.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openLoupe(STEPS_DATA[1])}
            className="px-3.5 py-2 rounded-xl bg-bronze/10 text-bronze-dark dark:text-amber-300 hover:bg-bronze hover:text-white text-xs font-label font-bold transition border border-bronze/30 flex items-center gap-1.5"
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
        {/* COUPE TRANSVERSALE DYNAMIQUE */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-cream-tile dark:bg-slate-800/60 border border-cream-border dark:border-slate-700 p-5">
            <div className="flex justify-between items-center text-xs font-label text-ink-soft dark:text-slate-400 pb-2 mb-3 border-b border-cream-border dark:border-slate-700">
              <span className="uppercase tracking-wider font-bold">
                Coupe transversale dynamique des canons (NIHS 91-10)
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  allOk
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                }`}
              >
                {allOk ? 'AUCUNE COLLISION' : `${failures.length} DÉFAUT(S) DÉTECTÉ(S)`}
              </span>
            </div>

            <svg
              viewBox="0 0 450 240"
              className="w-full h-auto rounded-xl bg-white dark:bg-slate-950 border border-cream-border dark:border-slate-800 transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dégradé saphir pour la glace */}
                <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={hasGlassCollision ? "0.8" : "0.45"} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={hasGlassCollision ? "0.9" : "0.25"} />
                </linearGradient>
              </defs>

              {/* 1. GLACE SAPHIR AU SOMMET (strictement au-dessus de la trotteuse) */}
              <g className="transition-transform duration-300">
                {/* Corps bombé de la glace saphir */}
                <path
                  d={`M 25,${glassBottomY + 4} Q 225,${glassBottomY - 14} 425,${glassBottomY + 4} L 425,${glassTopY + 4} Q 225,${glassTopY - 14} 25,${glassTopY + 4} Z`}
                  fill="url(#sapphireGrad)"
                  stroke={hasGlassCollision ? "#ef4444" : "#0284c7"}
                  strokeWidth={hasGlassCollision ? "2" : "1.2"}
                  className="transition-all duration-300"
                />
                {/* Reflet de glace saphir */}
                <path
                  d={`M 50,${glassTopY + 2} Q 225,${glassTopY - 10} 300,${glassTopY + 2}`}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  fill="none"
                />
                <text
                  x="365"
                  y={glassTopY - 2}
                  fill="#0284c7"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="var(--font-jbmono), monospace"
                >
                  Glace saphir
                </text>
              </g>

              {/* Ligne de repère de la Garde G4 (Trotteuse ↔ Glace) */}
              <line
                x1="390"
                y1={secY - 2}
                x2="390"
                y2={glassBottomY + 2}
                stroke={g4 < G_MIN.g4 ? "#ef4444" : "#10b981"}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x="396"
                y={(secY + glassBottomY) / 2 + 3}
                fill={g4 < G_MIN.g4 ? "#ef4444" : "#10b981"}
                fontSize="7"
                fontFamily="var(--font-jbmono), monospace"
                fontWeight="bold"
              >
                G4: {g4.toFixed(2)} mm
              </text>

              {/* 2. CANONS COAXIAUX CENTRAUX (Charnier & axes) */}
              {/* Tigeron de seconde centrale (axe interne bleu) */}
              <rect x="66" y={secY - 4} width="4" height={dialY - secY + 14} fill="#0284c7" stroke="#0369a1" strokeWidth="0.5" />
              {/* Canon de chaussée / minutes (tube intermédiaire) */}
              <rect x="63" y={minY - 2} width="10" height={dialY - minY + 12} fill="#94a3b8" stroke="#64748b" strokeWidth="0.5" />
              {/* Canon de roue des heures (tube externe) */}
              <rect x="59" y={hourY} width="18" height={dialY - hourY + 10} fill="#ca8a04" stroke="#92400e" strokeWidth="0.5" />

              {/* 3. AIGUILLE DES SECONDES (Trotteuse) — AU-DESSOUS DE LA GLACE, AU-DESSUS DES MINUTES */}
              <g
                transform={`translate(${isRotating ? 12 : 0}, 0)`}
                className="transition-transform duration-500"
              >
                {/* Lame trotteuse bleuie */}
                <rect
                  x="56"
                  y={secY}
                  width="330"
                  height={secThickness}
                  rx="1"
                  fill="#2563eb"
                  stroke="#1d4ed8"
                  strokeWidth="0.5"
                />
                {/* Canon de trotteuse */}
                <circle cx="68" cy={secY + secThickness / 2} r="3.5" fill="#1e40af" stroke="#60a5fa" strokeWidth="0.5" />
                <text
                  x="335"
                  y={secY - 3}
                  fill="#2563eb"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="var(--font-jbmono), monospace"
                >
                  Secondes (trotteuse)
                </text>
              </g>

              {/* Ligne de repère de la Garde G3 (Minutes ↔ Trotteuse) */}
              <line
                x1="310"
                y1={minY}
                x2="310"
                y2={secY + secThickness}
                stroke={g3 < G_MIN.g3 ? "#ef4444" : "#6366f1"}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x="314"
                y={(minY + secY) / 2 + 3}
                fill={g3 < G_MIN.g3 ? "#ef4444" : "#6366f1"}
                fontSize="7"
                fontFamily="var(--font-jbmono), monospace"
                fontWeight="bold"
              >
                G3: {g3.toFixed(2)} mm
              </text>

              {/* 4. AIGUILLE DES MINUTES — AU-DESSUS DES HEURES */}
              <g className="transition-all duration-300">
                <rect
                  x="63"
                  y={minY}
                  width="275"
                  height={minThickness}
                  rx="1.5"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="0.8"
                />
                <circle cx="68" cy={minY + minThickness / 2} r="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <text
                  x="285"
                  y={minY + minThickness + 8}
                  fill="#475569"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="var(--font-jbmono), monospace"
                >
                  Minutes
                </text>
              </g>

              {/* Ligne de repère de la Garde G2 (Heures ↔ Minutes) */}
              <line
                x1="240"
                y1={hourY}
                x2="240"
                y2={minY + minThickness}
                stroke={g2 < G_MIN.g2 ? "#ef4444" : "#0284c7"}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x="244"
                y={(hourY + minY) / 2 + 3}
                fill={g2 < G_MIN.g2 ? "#ef4444" : "#0284c7"}
                fontSize="7"
                fontFamily="var(--font-jbmono), monospace"
                fontWeight="bold"
              >
                G2: {g2.toFixed(2)} mm
              </text>

              {/* 5. AIGUILLE DES HEURES — AU-DESSUS DU CADRAN */}
              <g className="transition-all duration-300">
                <rect
                  x="59"
                  y={hourY}
                  width="210"
                  height={hourThickness}
                  rx="2"
                  fill="#ca8a04"
                  stroke="#a16207"
                  strokeWidth="0.8"
                />
                <circle cx="68" cy={hourY + hourThickness / 2} r="6.5" fill="#eab308" stroke="#92400e" strokeWidth="0.8" />
                <text
                  x="220"
                  y={hourY + hourThickness + 8}
                  fill="#b45309"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="var(--font-jbmono), monospace"
                >
                  Heures
                </text>
              </g>

              {/* 6. CADRAN (BASE) & INDEX 12H */}
              {/* Plaque de cadran */}
              <rect x="25" y={dialY} width="400" height="14" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="35" y={dialY + 10} fill="#94a3b8" fontSize="8" fontFamily="var(--font-jbmono), monospace">
                Surface du Cadran
              </text>

              {/* Index en applique à 12h */}
              <rect x="235" y={dialY - 14} width="22" height="14" rx="1" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
              <text
                x="246"
                y={dialY - 17}
                fill="#b45309"
                fontSize="7.5"
                fontWeight="bold"
                fontFamily="var(--font-jbmono), monospace"
                textAnchor="middle"
              >
                Index 12 h
              </text>

              {/* Ligne de repère de la Garde G1 (Cadran ↔ Heures) */}
              <line
                x1="180"
                y1={dialY}
                x2="180"
                y2={hourY + hourThickness}
                stroke={g1 < G_MIN.g1 ? "#ef4444" : "#d97706"}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x="184"
                y={(dialY + hourY + hourThickness) / 2 + 3}
                fill={g1 < G_MIN.g1 ? "#ef4444" : "#d97706"}
                fontSize="7"
                fontFamily="var(--font-jbmono), monospace"
                fontWeight="bold"
              >
                G1: {g1.toFixed(2)} mm
              </text>

              {/* Échelle de cotes globale */}
              <line x1="435" y1={glassTopY} x2="435" y2={dialY + 14} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text
                x="442"
                y={(glassTopY + dialY) / 2}
                fill="#64748b"
                fontSize="7"
                fontFamily="var(--font-jbmono), monospace"
                transform={`rotate(90 442 ${(glassTopY + dialY) / 2})`}
                textAnchor="middle"
              >
                Empilement NIHS 91-10
              </text>
            </svg>

            <p className="text-[11.5px] text-ink-soft dark:text-slate-400 mt-2.5 leading-relaxed">
              <strong>Ordre d'empilement officiel suisse :</strong> Cadran à la base → Aiguille des heures → Aiguille des minutes → Trotteuse des secondes → <strong>Glace saphir au sommet</strong>.
              Réglez G4 pour observer la glace descendre vers la trotteuse.
            </p>
          </div>
        </div>

        {/* CURSEURS DE RÉGLAGE & VERDICT */}
        <div className="lg:col-span-5 space-y-3.5">
          <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft dark:text-slate-400 uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5 text-bronze dark:text-amber-400" /> Réglage micrométrique des 4 gardes
          </span>

          {rows.map((r) => {
            const ok = r.value >= r.min;
            return (
              <div
                key={r.key}
                className={`p-3.5 rounded-xl border transition ${
                  ok
                    ? 'bg-cream-tile dark:bg-slate-800/60 border-cream-border dark:border-slate-700'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-[13px] text-ink dark:text-slate-100 font-medium">
                    {r.label} <span className="text-ink-soft dark:text-slate-400 text-[11px]">· {r.between}</span>
                  </span>
                  <span
                    className={`font-label font-bold text-sm ${
                      ok ? r.color : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {r.value.toFixed(2)} mm
                  </span>
                </div>

                <input
                  type="range"
                  className="hl-slider w-full cursor-pointer"
                  min={r.min0}
                  max={r.max}
                  step="0.01"
                  value={r.value}
                  onChange={(e) => r.set(parseFloat(e.target.value))}
                  aria-label={r.label}
                />

                <div className="flex justify-between mt-1 text-[10px] font-label">
                  <span
                    className={
                      ok
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-red-600 dark:text-red-400 font-bold'
                    }
                  >
                    Mini NIHS {r.min.toFixed(2)} mm
                  </span>
                  <span className="text-ink-soft dark:text-slate-400">
                    {ok ? 'Conforme ✓' : `Manque ${(r.min - r.value).toFixed(2)} mm`}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Verdict global */}
          {allOk ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-900 dark:text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">GARDES NIHS 91-10 CONFORMES :</strong>
                Toutes les distances de sécurité respectent le standard suisse. Aucun risque de rayure
                du cadran, de collision entre aiguilles ni de frottement sous la glace saphir.
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-1">DÉFAUT(S) CRITIQUE(S) DÉTECTÉ(S) :</strong>
                <ul className="list-disc list-inside space-y-1">
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
