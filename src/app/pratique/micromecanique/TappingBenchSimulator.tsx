"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle2, AlertTriangle, Droplet, Sparkles, Check, Sliders } from "lucide-react";

type ThreadKey = "M0.40" | "M0.50" | "M0.60" | "M0.70" | "M0.80" | "M0.90" | "M1.00" | "M1.20";

interface ThreadSpec {
  name: string;
  d: number;
  p: number;
  use: string;
}

const THREAD_SPECS: Record<ThreadKey, ThreadSpec> = {
  "M0.40": { name: "S 0.40", d: 0.40, p: 0.100, use: "Vis pont miniature / spiral" },
  "M0.50": { name: "S 0.50", d: 0.50, p: 0.125, use: "Vis de bride de fixation cadran" },
  "M0.60": { name: "S 0.60", d: 0.60, p: 0.150, use: "Vis de coq / pont de barillet" },
  "M0.70": { name: "S 0.70", d: 0.70, p: 0.175, use: "Vis de ponts standard ETA" },
  "M0.80": { name: "S 0.80", d: 0.80, p: 0.200, use: "Vis de masse oscillante" },
  "M0.90": { name: "S 0.90", d: 0.90, p: 0.225, use: "Tige de remontoir ETA 2824-2" },
  "M1.00": { name: "M 1.00", d: 1.00, p: 0.250, use: "Vis de carrure / tube poussoir" },
  "M1.20": { name: "M 1.20", d: 1.20, p: 0.250, use: "Vis de bracelet / fond vissé" }
};

export default function TappingBenchSimulator() {
  // Part 1: Tapping Drill Calculator
  const [threadKey, setThreadKey] = useState<ThreadKey>("M0.90");
  const [material, setMaterial] = useState<"brass" | "steel" | "maillechort">("brass");
  const [tapPass, setTapPass] = useState<1 | 2 | 3>(1);

  // Part 2: Screwdriver Sharpening
  const [bevelAngle, setBevelAngle] = useState<number>(11);
  const [bladeTipMm, setBladeTipMm] = useState<number>(0.15);

  const curSpec = THREAD_SPECS[threadKey];
  const drillDia = (curSpec.d - curSpec.p).toFixed(2);

  // Screwdriver calculations (Slot width = 0.16 mm = 60 px in SVG)
  const isTooThick = bladeTipMm > 0.16;
  const isTooSharpV = bladeTipMm < 0.12 || bevelAngle > 16;
  const isPerfect = !isTooThick && !isTooSharpV;

  const halfTipPx = (bladeTipMm / 0.16) * 30;
  const halfTopPx = halfTipPx + bevelAngle * 1.4;
  const bladeY = isTooThick ? 92 : 144;

  const setPreset = (preset: "perfect" | "sharpV" | "thick") => {
    if (preset === "perfect") {
      setBevelAngle(11);
      setBladeTipMm(0.15);
    } else if (preset === "sharpV") {
      setBevelAngle(21);
      setBladeTipMm(0.07);
    } else {
      setBevelAngle(12);
      setBladeTipMm(0.21);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Mécanique d&apos;Établi • Normes Horlogères NIHS 06-02 / ISO 1501</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
          Taraudage NIHS des Avant-Trous &amp; Affûtage des Tournevis d&apos;Établi
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          En micromécanique horlogère, la casse d&apos;un taraud ou le ripage d&apos;un tournevis détruit irrémédiablement une platine ou un pont fini. Maîtrisez la règle du foret avant-trou, la passe des 3 tarauds et l&apos;affûtage à la pierre d&apos;Arkansas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* SOUS-OUTIL A (6 cols) : CALCULATEUR D'AVANT-TROU & PASSE DES 3 TARAUDS    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
              Sous-Outil A • Filetage &amp; Taraudage Micromécanique
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Calcul de l&apos;Avant-Trou (Ø = D − P) &amp; Série des 3 Tarauds
            </h3>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                1. Filetage Horloger (D) :
              </label>
              <select
                value={threadKey}
                onChange={(e) => setThreadKey(e.target.value as ThreadKey)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-amber-600 dark:text-amber-400 font-bold outline-none"
              >
                {Object.entries(THREAD_SPECS).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.name} ({s.use})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                2. Métal de la Pièce :
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as "brass" | "steel" | "maillechort")}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none"
              >
                <option value="brass">Laiton CuZn37 (Platines &amp; Ponts)</option>
                <option value="steel">Acier Inox 316L / Acier Horloger</option>
                <option value="maillechort">Maillechort CuNi18Zn20 (Haute Horlogerie)</option>
              </select>
            </div>
          </div>

          {/* KPI Formula Readouts */}
          <div className="grid grid-cols-3 gap-2 font-mono text-center">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">NOMINAL D</span>
              <strong className="text-sm sm:text-base text-slate-900 dark:text-white">{curSpec.d.toFixed(2)} mm</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">PAS DU FILET P</span>
              <strong className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400">{curSpec.p.toFixed(3)} mm</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 border-2 border-amber-500/60 rounded-xl p-2.5">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">FORET AVANT-TROU</span>
              <strong className="text-sm sm:text-base text-amber-600 dark:text-amber-400">Ø {drillDia} mm</strong>
            </div>
          </div>

          {/* Interactive 3-Tap Pass Selector & SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-slate-300">Jeu de 3 Tarauds à Main :</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setTapPass(1)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    tapPass === 1
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
                  }`}
                >
                  1. Ébaucheur (1 trait)
                </button>
                <button
                  onClick={() => setTapPass(2)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    tapPass === 2
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
                  }`}
                >
                  2. Intermédiaire
                </button>
                <button
                  onClick={() => setTapPass(3)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    tapPass === 3
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
                  }`}
                >
                  3. Finisseur
                </button>
              </div>
            </div>

            <svg viewBox="0 0 440 175" className="w-full h-auto">
              {/* Metal Plate Cross-Section */}
              <rect x="65" y="55" width="125" height="105" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
              <rect x="250" y="55" width="125" height="105" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
              {/* Drilled Hole Walls */}
              <path d="M 190 55 L 182 70 L 190 85 L 182 100 L 190 115 L 182 130 L 190 145" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
              <path d="M 250 55 L 258 70 L 250 85 L 258 100 L 250 115 L 258 130 L 250 145" fill="none" stroke="#D4AF37" strokeWidth="2.5" />

              {/* Tap Flute Body Geometry */}
              <polygon
                points={
                  tapPass === 1
                    ? "192,15 248,15 232,145 208,145"
                    : tapPass === 2
                    ? "192,15 248,15 238,145 202,145"
                    : "190,15 250,15 246,145 194,145"
                }
                fill="#94A3B8"
                stroke="#F8FAFC"
                strokeWidth="1.8"
              />
              <text x="220" y="42" textAnchor="middle" fill="#0F172A" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                {tapPass === 1 && "1. ÉBAUCHEUR (55%)"}
                {tapPass === 2 && "2. INTERMÉDIAIRE (80%)"}
                {tapPass === 3 && "3. FINISSEUR (100%)"}
              </text>

              {/* Chip-Breaking Indicator */}
              <text x="395" y="38" textAnchor="end" fill="#38BDF8" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                +1/2 tr Avant
              </text>
              <text x="395" y="54" textAnchor="end" fill="#10B981" fontFamily="monospace" fontSize="9">
                −1/4 tr Brise-copeau
              </text>
            </svg>
          </div>

          {/* Lubrication Advice Box */}
          <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs leading-relaxed space-y-1">
            <div className="font-mono text-amber-600 dark:text-amber-400 font-bold uppercase flex items-center gap-1.5">
              <Droplet className="w-4 h-4" />
              <span>Protocole d&apos;Atelier ({curSpec.name} → Foret Ø {drillDia} mm)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {material === "brass" && (
                <>
                  <strong>Laiton CuZn37 :</strong> Taraudage à sec ou avec une légère touche de suif / stéarine. Toujours briser le copeau (1/2 tour avant, 1/4 tour arrière) pour éviter l&apos;engorgement des 3 goujures.
                </>
              )}
              {material === "steel" && (
                <>
                  <strong>Acier 316L / Acier Horloger :</strong> Lubrification impérative à l&apos;<strong>huile de coupe soufrée</strong> (ou Moebius 8200). Sans lubrifiant lubrifiant, un taraud S0.60 casse net dans l&apos;avant-trou sous l&apos;effet du frottement !
                </>
              )}
              {material === "maillechort" && (
                <>
                  <strong>Maillechort (CuNi18Zn20) :</strong> Métal très collant et tenace — utiliser impérativement une goutte d&apos;huile fluide de coupe et dégager fréquemment le taraud pour souffler les micro-copeaux.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SOUS-OUTIL B (6 cols) : AFFÛTAGE DE TOURNEVIS SUR PIERRE D'ARKANSAS       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
              Sous-Outil B • Pierre d&apos;Arkansas &amp; Gabarit Bergeon
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Affûtage de la Lame de Tournevis dans la Fente de Vis
            </h3>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <button
              onClick={() => setPreset("perfect")}
              className={`p-2 rounded-xl border font-bold transition-all ${
                isPerfect
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
              }`}
            >
              ✓ Affûtage Parfait
            </button>
            <button
              onClick={() => setPreset("sharpV")}
              className={`p-2 rounded-xl border font-semibold transition-all ${
                isTooSharpV && !isTooThick
                  ? "border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-500"
              }`}
            >
              ⚠ Trop Pointu (En V)
            </button>
            <button
              onClick={() => setPreset("thick")}
              className={`p-2 rounded-xl border font-semibold transition-all ${
                isTooThick
                  ? "border-rose-500 bg-rose-500/20 text-rose-700 dark:text-rose-300"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-rose-500"
              }`}
            >
              ✕ Trop Épais
            </button>
          </div>

          {/* SVG Zoom x50 */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase mb-1 flex justify-between">
              <span>COUPE DE PROFIL (×50) : LAME ACIER TREMPÉ VS FENTE DE VIS</span>
              <span className="text-amber-400 font-bold">Fente : 0.16 mm</span>
            </div>
            <svg viewBox="0 0 440 195" className="w-full h-auto">
              {/* Screw Head with Slot */}
              <path
                d="M 85 175 L 85 110 Q 135 90 190 95 L 190 148 L 250 148 L 250 95 Q 305 90 355 110 L 355 175 Z"
                fill="#334155"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <text x="135" y="145" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="9.5">
                TÊTE DE VIS
              </text>
              <text x="305" y="145" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="9.5">
                ACIER POLI
              </text>

              {/* Dynamic Screwdriver Blade Tip */}
              <polygon
                points={`${220 - halfTopPx},15 ${220 + halfTopPx},15 ${220 + halfTipPx},${bladeY} ${220 - halfTipPx},${bladeY}`}
                fill={isPerfect ? "#10B981" : isTooThick ? "#EF4444" : "#F59E0B"}
                fillOpacity="0.4"
                stroke={isPerfect ? "#34D399" : isTooThick ? "#F87171" : "#FBBF24"}
                strokeWidth="2.2"
              />

              {/* Burr / Damage Indicators */}
              {!isPerfect && (
                <g>
                  <circle cx="190" cy="95" r="9" fill="#EF4444" fillOpacity="0.4" stroke="#EF4444" strokeWidth="2" />
                  <circle cx="250" cy="95" r="9" fill="#EF4444" fillOpacity="0.4" stroke="#EF4444" strokeWidth="2" />
                  <text x="220" y="82" textAnchor="middle" fill="#EF4444" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                    {isTooThick ? "NE RENTRE PAS (RIPAGE !)" : "BORDURE MÂCHÉE (BAVURE !)"}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <div className="flex justify-between mb-1">
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">Angle du Biseau :</span>
                <strong className={bevelAngle > 16 ? "text-amber-500" : "text-emerald-500"}>
                  {bevelAngle}° {bevelAngle === 11 ? "(Idéal)" : ""}
                </strong>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="1"
                value={bevelAngle}
                onChange={(e) => setBevelAngle(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <div className="flex justify-between mb-1">
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">Épaisseur du Plat (e) :</span>
                <strong className={bladeTipMm > 0.16 ? "text-rose-500" : bladeTipMm < 0.12 ? "text-amber-500" : "text-emerald-500"}>
                  {bladeTipMm.toFixed(2)} mm
                </strong>
              </div>
              <input
                type="range"
                min="0.06"
                max="0.22"
                step="0.01"
                value={bladeTipMm}
                onChange={(e) => setBladeTipMm(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Verdict Box */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            isTooThick
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-900 dark:text-rose-200"
              : isTooSharpV
              ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 text-amber-900 dark:text-amber-200"
              : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
          }`}>
            {isTooThick ? (
              <>
                <strong className="text-rose-700 dark:text-rose-400 font-mono block mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Lame Trop Épaisse ({bladeTipMm.toFixed(2)} mm &gt; fente 0.16 mm) :
                </strong>
                La lame ne descend pas au fond de la fente ! Au moindre couple de serrage ou dévissage, elle ripe instantanément et laboure le pont rhodié ou la platine adjacente.
              </>
            ) : isTooSharpV ? (
              <>
                <strong className="text-amber-700 dark:text-amber-400 font-mono block mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Lame Trop Pointue en « V » ({bladeTipMm.toFixed(2)} mm / {bevelAngle}°) :
                </strong>
                La pointe touche le fond de la fente mais flotte sur les flancs : en tournant, l&apos;angle vif soulève deux bavures disgracieuses sur les lèvres supérieures de la vis (« vis mâchée »). Passez le plat de la lame verticalement sur la pierre d&apos;Arkansas !
              </>
            ) : (
              <>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Affûtage Horloger Parfait (Angle {bevelAngle}° • Plat {bladeTipMm.toFixed(2)} mm) :
                </strong>
                La lame remplit 95% de la fente sans en toucher le fond. Le couple s&apos;exerce bien bas sur les parois verticales : aucun ripage ni déformation possible.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
