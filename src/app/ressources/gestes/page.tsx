"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  Wrench,
  Gauge,
  Thermometer,
  Activity,
  Sparkles,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function PrecisionBalance() {
  const [loupeCard, setLoupeCard] = useState<number | null>(null);

  const toggleLoupe = (idx: number) => {
    setLoupeCard(loupeCard === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;Atelier Pratique
          </Link>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            Gestes de Régleur · Norme ISO 3159 (COSC)
          </span>
        </div>

        <header className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" /> Haute Précision &amp; Organe Réglant
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Gestes d&apos;Établi — <span className="text-amber-600 dark:text-amber-400">Réglage du Balancier-Spiral</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-3xl leading-relaxed">
            Les 4 opérations fondamentales du régleur horloger : mise à plat et centrage du spiral aux brucelles N°5, équilibrage statique sur les couteaux d&apos;agate, maîtrise thermo-élastique Nivarox/Glucydur et contrôle acoustique sur 5 positions au vibrographe Witschi.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Centrage et mise à plat du spiral */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-4 bg-[#070B14] border-b border-slate-800 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Schéma 01 · Retouche à la Virole (Brucelles N°5)
                  </span>
                  <button
                    onClick={() => toggleLoupe(1)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupeCard === 1
                        ? "bg-amber-500 text-slate-950 border-amber-400"
                        : "bg-slate-900 text-slate-300 border-slate-700"
                    }`}
                  >
                    <ZoomIn className="w-3 h-3" /> {loupeCard === 1 ? "10x Actif" : "Loupe 10x"}
                  </button>
                </div>
                <svg
                  viewBox={loupeCard === 1 ? "110 55 180 110" : "0 0 400 220"}
                  className="w-full h-52 transition-all duration-500"
                >
                  <rect width="400" height="220" fill="#070B14" />
                  {/* Spires concentriques */}
                  {[26, 40, 54, 68, 82].map((r, i) => (
                    <circle
                      key={i}
                      cx="200"
                      cy="110"
                      r={r}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeOpacity={0.45 + i * 0.1}
                    />
                  ))}
                  {/* Virole centrale fendue */}
                  <circle cx="200" cy="110" r="14" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="200" cy="110" r="5" fill="#070B14" />
                  {/* Point d'attache et départ de la 1re spire */}
                  <path
                    d="M 214 110 Q 228 92, 224 76"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                  />
                  {/* Brucelles Dumont N°5 */}
                  <path d="M 265 45 L 222 86 L 228 91 L 275 52 Z" fill="#94a3b8" />
                  <text x="200" y="205" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
                    Correction du centrage à 90° du décentrement observé
                  </text>
                </svg>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500" />
                  1. Vérification du Plat &amp; Centrage du Spiral
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Le spiral doit être rigoureusement <strong>parallèle au plan du balancier (le plat)</strong> et ses spires doivent s&apos;écarter de manière concentrique (<strong>le rond</strong>). Toute spire qui touche les deux goupilles de raquette en même temps au repos détruit l&apos;isochronisme aux petites amplitudes.
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-amber-700 dark:text-amber-400">Geste d&apos;atelier :</strong> Utiliser exclusivement deux brucelles <strong>Dumont N°5</strong> parfaitement dressées à la pierre d&apos;Arkansas. La retouche de mise au rond s&apos;opère sur le premier quart de spire à la sortie de la virole.
              </div>
            </div>
          </div>

          {/* 2. Équilibrage statique sur les couteaux */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-4 bg-[#070B14] border-b border-slate-800 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Schéma 02 · Outil d&apos;Équilibrage aux Couteaux d&apos;Agate
                  </span>
                  <button
                    onClick={() => toggleLoupe(2)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupeCard === 2
                        ? "bg-amber-500 text-slate-950 border-amber-400"
                        : "bg-slate-900 text-slate-300 border-slate-700"
                    }`}
                  >
                    <ZoomIn className="w-3 h-3" /> {loupeCard === 2 ? "10x Actif" : "Loupe 10x"}
                  </button>
                </div>
                <svg
                  viewBox={loupeCard === 2 ? "115 70 170 120" : "0 0 400 220"}
                  className="w-full h-52 transition-all duration-500"
                >
                  <rect width="400" height="220" fill="#070B14" />
                  {/* Couteaux rubis/agate */}
                  <polygon points="70,130 165,112 165,185 70,185" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                  <polygon points="330,130 235,112 235,185 330,185" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                  {/* Serge du balancier */}
                  <circle cx="200" cy="112" r="56" fill="none" stroke="#fbbf24" strokeWidth="7" />
                  <line x1="144" y1="112" x2="256" y2="112" stroke="#d97706" strokeWidth="4" />
                  <circle cx="200" cy="112" r="6" fill="#f8fafc" />
                  {/* Point lourd (balourd) en bas à 6h */}
                  <circle cx="200" cy="172" r="5.5" fill="#f43f5e" />
                  <text x="200" y="192" textAnchor="middle" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    BALOURD À 6H → FRAISAGE SOUS VIS
                  </text>
                </svg>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-amber-500" />
                  2. Équilibrage Statique &amp; Vis de Balancier
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Un défaut d&apos;équilibre statique (<strong>balourd</strong>) agit comme un pendule en position verticale : il crée un écart de marche massif entre les positions <strong>6H, 9H, 3H et 12H</strong>. Posé nu sur les couteaux en rubis ou agate, le point le plus lourd descend toujours à 6h.
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-amber-700 dark:text-amber-400">Geste d&apos;atelier :</strong> Sur un balancier à vis, on allège le point bas à l&apos;aide d&apos;une fraise aux centièmes sous la tête de vis. Pour modifier la marche moyenne sans créer de balourd, toujours tourner les vis <strong>par paires diamétralement opposées</strong>.
              </div>
            </div>
          </div>

          {/* 3. Réglage thermique Nivarox / Glucydur */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-4 bg-[#070B14] border-b border-slate-800 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Schéma 03 · Compensation Thermo-Élastique (ISO 3159)
                  </span>
                  <button
                    onClick={() => toggleLoupe(3)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupeCard === 3
                        ? "bg-amber-500 text-slate-950 border-amber-400"
                        : "bg-slate-900 text-slate-300 border-slate-700"
                    }`}
                  >
                    <ZoomIn className="w-3 h-3" /> {loupeCard === 3 ? "10x Actif" : "Loupe 10x"}
                  </button>
                </div>
                <svg
                  viewBox={loupeCard === 3 ? "80 40 240 130" : "0 0 400 220"}
                  className="w-full h-52 transition-all duration-500"
                >
                  <rect width="400" height="220" fill="#070B14" />
                  <line x1="55" y1="170" x2="355" y2="170" stroke="#475569" strokeWidth="1.5" />
                  <line x1="55" y1="35" x2="55" y2="170" stroke="#475569" strokeWidth="1.5" />
                  {/* Courbe acier ancien non compensé */}
                  <path d="M 65 55 L 340 162" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 3" />
                  {/* Courbe Nivarox + Glucydur */}
                  <path d="M 65 108 Q 200 98, 340 110" fill="none" stroke="#10b981" strokeWidth="3" />
                  <text x="275" y="92" fill="#6ee7b7" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Nivarox + Glucydur (C ≤ ±0.6 s/j/°C)
                  </text>
                  <text x="255" y="155" fill="#fda4af" fontSize="9" fontFamily="monospace">
                    Acier classique (-11 s/j/°C)
                  </text>
                  <text x="200" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
                    Plage d&apos;épreuve thermique COSC : 8°C → 23°C → 38°C
                  </text>
                </svg>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-amber-500" />
                  3. Stabilité Thermique (Nivarox &amp; Glucydur)
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Un spiral en acier ancien perdait ~11 s/j par degré Celsius à cause de la chute de son module d&apos;élasticité E. Les spiraux <strong>Nivarox</strong> (alliage Fe-Ni-Cr-Ti-Be antiferromagnétique) inversent ce coefficient thermo-élastique pour compenser exactement la dilatation du balancier en <strong>Glucydur</strong>.
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-amber-700 dark:text-amber-400">Norme ISO 3159 (COSC) :</strong> L&apos;erreur thermique primaire C = (M38°C - M8°C) / 30 ne doit jamais dépasser <strong>± 0.60 s/j/°C</strong>.
              </div>
            </div>
          </div>

          {/* 4. Contrôle final 5 positions au Vibrographe Witschi */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-4 bg-[#070B14] border-b border-slate-800 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Schéma 04 · Épreuve des 5 Positions au Vibrographe Witschi
                  </span>
                  <button
                    onClick={() => toggleLoupe(4)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupeCard === 4
                        ? "bg-amber-500 text-slate-950 border-amber-400"
                        : "bg-slate-900 text-slate-300 border-slate-700"
                    }`}
                  >
                    <ZoomIn className="w-3 h-3" /> {loupeCard === 4 ? "10x Actif" : "Loupe 10x"}
                  </button>
                </div>
                <svg
                  viewBox={loupeCard === 4 ? "70 40 260 130" : "0 0 400 220"}
                  className="w-full h-52 transition-all duration-500"
                >
                  <rect width="400" height="220" fill="#070B14" />
                  {/* Trace Witschi */}
                  <line x1="40" y1="95" x2="360" y2="82" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" />
                  <line x1="40" y1="101" x2="360" y2="88" stroke="#34d399" strokeWidth="2" strokeDasharray="6 4" />
                  {/* Badges des 5 positions */}
                  {["CH (+2s)", "CB (+3s)", "6H (+1s)", "9H (0s)", "3H (+4s)"].map((pos, idx) => (
                    <g key={idx} transform={`translate(${42 + idx * 66}, 145)`}>
                      <rect width="58" height="28" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                      <text x="29" y="18" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        {pos}
                      </text>
                    </g>
                  ))}
                  <text x="200" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                    AMP: 294° | MARCHE MOY: +2.0 s/j | REPÈRE: 0.1 ms | Δ: 4.0 s/j
                  </text>
                </svg>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-500" />
                  4. Contrôle Final sur 5 Positions au Vibrographe
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Une fois l&apos;angle de levée exact renseigné (ex: <strong>50°</strong> sur ETA 6497-1 et 2824-2, <strong>52°</strong> sur Rolex 3135), l&apos;horloger contrôle la montre à pleine charge (0h) puis après 24h de marche dans les 5 positions normalisées : <strong>CH, CB, 6H, 9H et 3H</strong>.
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-amber-700 dark:text-amber-400">Critères d&apos;excellence :</strong> Erreur de repère ≤ 0.4 ms, amplitude horizontale comprise entre 275° et 315°, et chute d&apos;amplitude en position verticale inférieure à 35°.
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'outils liés */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Passer à la Simulation &amp; au Calcul sur l&apos;Établi Virtuel
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Testez directement vos réglages sur le Laboratoire du Spiral (avec export CAO .DXF) ou dans l&apos;Atelier de Mesure COSC ISO 3159.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ressources/reglage"
              className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Ouvrir le Laboratoire du Spiral &amp; Courbe Phillips →
            </Link>
            <Link
              href="/outils"
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:border-amber-500 transition"
            >
              Ouvrir le Banc COSC ISO 3159 &amp; Traces Witschi →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
