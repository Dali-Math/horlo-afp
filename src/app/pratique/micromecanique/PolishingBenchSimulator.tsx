"use client";

import React, { useState } from "react";
import { Eye, ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, Sliders } from "lucide-react";

export default function PolishingBenchSimulator() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [setup, setSetup] = useState<"lapidaire" | "hard_green" | "soft_white" | "soft_error">("lapidaire");
  const [kaptonActive, setKaptonActive] = useState<boolean>(true);
  const [edgeRounding, setEdgeRounding] = useState<number>(0);

  const handlePhaseChange = (p: 1 | 2 | 3) => {
    setPhase(p);
    if (p === 1) {
      setSetup("lapidaire");
      setEdgeRounding(0);
    } else if (p === 2) {
      setSetup("hard_green");
      setEdgeRounding(5);
    } else {
      setSetup("soft_white");
      setEdgeRounding(10);
    }
  };

  const handleSetupChange = (s: "lapidaire" | "hard_green" | "soft_white" | "soft_error") => {
    setSetup(s);
    if (s === "lapidaire") setEdgeRounding(0);
    else if (s === "hard_green") setEdgeRounding(5);
    else if (s === "soft_white") setEdgeRounding(10);
    else setEdgeRounding(85);
  };

  const isFlawed = setup === "soft_error" || !kaptonActive || edgeRounding > 25;
  const isCrispConform = edgeRounding <= 15 && kaptonActive && setup !== "soft_error";

  // Optical mire lines generation
  const curveSpan = (edgeRounding / 100) * 65;
  const mireLines = [0, 1, 2, 3, 4].map((i) => {
    const yLeft = 45 + i * 26;
    const yMid = yLeft;
    const yRight = yMid + 22;

    if (edgeRounding <= 10) {
      return {
        path: `M 45 ${yLeft} L 220 ${yMid} L 395 ${yRight}`,
        color: "#38BDF8"
      };
    } else {
      return {
        path: `M 45 ${yLeft} L ${220 - curveSpan} ${yMid} Q 220 ${yMid + curveSpan * 0.28} ${220 + curveSpan} ${yMid + (curveSpan / 175) * 22} L 395 ${yRight}`,
        color: edgeRounding > 45 ? "#EF4444" : "#F59E0B"
      };
    }
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
          <Eye className="w-3.5 h-3.5" />
          <span>Finitions &amp; Habillage Haute Horlogerie • Touret, Lapidaire &amp; Contrôle Optique</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
          Atelier de Polissage de Boîtier, Protection Kapton &amp; Test de la Mire
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Le polissage horloger ne consiste pas à faire briller, mais à obtenir des surfaces planes spéculaires (poli noir) sans jamais arrondir les arêtes vives de carrure. Découvrez les 3 phases, le rôle du ruban polyimide Kapton et le contrôle de planéité par réflexion optique de mire zébrée.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* VOLET A (6 cols) : TOURET DE POLISSAGE, LAPIDAIRE & RUBAN KAPTON          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
              Volet A • Touret d&apos;Atelier &amp; Disques Dialux
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Émerisage, Polissage &amp; Avivage sur Corne Acier 316L
            </h3>
          </div>

          {/* 3 Phase Buttons */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <button
              onClick={() => handlePhaseChange(1)}
              className={`p-2.5 rounded-xl border font-bold transition-all ${
                phase === 1
                  ? "border-amber-500 bg-amber-500 text-slate-950 shadow-md"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-500"
              }`}
            >
              1. Lapidaire / Émeri
            </button>
            <button
              onClick={() => handlePhaseChange(2)}
              className={`p-2.5 rounded-xl border font-bold transition-all ${
                phase === 2
                  ? "border-amber-500 bg-amber-500 text-slate-950 shadow-md"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-500"
              }`}
            >
              2. Feutre Dur (2800 tr)
            </button>
            <button
              onClick={() => handlePhaseChange(3)}
              className={`p-2.5 rounded-xl border font-bold transition-all ${
                phase === 3
                  ? "border-amber-500 bg-amber-500 text-slate-950 shadow-md"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-500"
              }`}
            >
              3. Flanelle (1500 tr)
            </button>
          </div>

          {/* Setup & Kapton Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                Disque &amp; Pâte Dialux Choisis :
              </label>
              <select
                value={setup}
                onChange={(e) => handleSetupChange(e.target.value as any)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none"
              >
                <option value="lapidaire">Disque Lapidaire Rigide / Cabron Émeri 800</option>
                <option value="hard_green">Feutre Dur + Pâte Dialux Verte/Grise (2800 tr/min)</option>
                <option value="soft_white">Flanelle Souple + Pâte Dialux Blanche (1500 tr/min)</option>
                <option value="soft_error">Disque Coton Mou pressé fort sans Kapton (ERREUR !)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1">
                Masquage du Satiné Adjacent :
              </label>
              <button
                onClick={() => setKaptonActive(!kaptonActive)}
                className={`w-full py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                  kaptonActive
                    ? "border-amber-500/60 bg-amber-500/20 text-amber-800 dark:text-amber-300"
                    : "border-rose-500/60 bg-rose-500/20 text-rose-800 dark:text-rose-300 animate-pulse"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Ruban Kapton : {kaptonActive ? "ACTIF (Protégé)" : "DÉSACTIVÉ (!)"}</span>
              </button>
            </div>
          </div>

          {/* SVG Lug Cross-Section & Wheel Contact */}
          <div className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-4">
            <svg viewBox="0 0 440 190" className="w-full h-auto">
              {/* Watch Lug Profile */}
              <path
                d={
                  setup === "soft_error"
                    ? "M 75 165 L 75 85 L 205 85 Q 235 90 295 140 L 295 165 Z"
                    : "M 75 165 L 75 85 L 225 85 L 295 135 L 295 165 Z"
                }
                className="fill-slate-200 dark:fill-[#334155] stroke-slate-500 dark:stroke-[#E2E8F0]"
                strokeWidth="2.5"
              />
              <text x="150" y="132" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="10" fontWeight="bold">
                CORNE ACIER 316L
              </text>
              <text x="150" y="75" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="9">
                DESSUS SATINÉ (GRAIN DROIT)
              </text>

              {/* Amber Polyimide Kapton Tape Strip */}
              {kaptonActive && (
                <g>
                  <rect x="75" y="77" width="150" height="7" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
                  <text x="150" y="62" textAnchor="middle" fill="#F59E0B" fontFamily="monospace" fontSize="8.5" fontWeight="bold">
                    MASQUAGE KAPTON (POLYIMIDE)
                  </text>
                </g>
              )}

              {/* Polishing Wheel Contacting Bevel */}
              <g transform="translate(295, 72)">
                <circle cx="0" cy="0" r="46" fill="#D4AF37" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="6 4" />
                <circle cx="0" cy="0" r="12" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
                <text x="0" y="-54" textAnchor="middle" fill="#FEF08A" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                  {setup === "lapidaire" && "LAPIDAIRE RIGIDE (ÉMERI 800)"}
                  {setup === "hard_green" && "FEUTRE DUR • 2800 TR/MIN"}
                  {setup === "soft_white" && "FLANELLE • 1500 TR/MIN"}
                  {setup === "soft_error" && "DISQUE MOU ÉCRASÉ (ERREUR !)"}
                </text>
              </g>
            </svg>
          </div>

          {/* Diagnostic Box */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            isFlawed
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-900 dark:text-rose-200"
              : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
          }`}>
            {isFlawed ? (
              <>
                <strong className="text-rose-700 dark:text-rose-400 font-mono block mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Défaut Critique de Polissage :
                </strong>
                {!kaptonActive && "Sans ruban polyimide Kapton sur la face adjacente, le disque de polissage mord sur le satiné et détruit la ligne de démarcation ! "}
                {setup === "soft_error" && "Un disque coton trop mou pressé avec force enveloppe l'arête et l'arrondit irrémédiablement (« effet savonnette »). "}
              </>
            ) : (
              <>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Protocole de Polissage Haute Horlogerie Conforme :
                </strong>
                Le ruban Kapton protège le grain droit du satiné tandis que le feutre dur (2800 tr/min, pâte verte) puis l&apos;avivage flanelle (1500 tr/min, pâte blanche) donnent un poli noir spéculaire sans affaisser l&apos;arête.
              </>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VOLET B (6 cols) : CONTRÔLE OPTIQUE À LA MIRE (ARÊTE VIVE VS SAVONNETTE)  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
              Volet B • Contrôle Métrologique Visuel
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Contrôle Optique à la Mire : Arête Franche vs Arête Savonnée
            </h3>
          </div>

          {/* Edge Rounding Slider */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">Pression exercée au disque mou sur l&apos;arête :</span>
              <strong className={edgeRounding <= 15 ? "text-emerald-500" : edgeRounding <= 45 ? "text-amber-500" : "text-rose-500"}>
                {edgeRounding} % {edgeRounding <= 15 ? "(Arête Vive Swiss Made)" : edgeRounding <= 45 ? "(Léger affaissement)" : "(Arête Savonnée !)"}
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={edgeRounding}
              onChange={(e) => setEdgeRounding(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>0% (Rupture géométrique nette)</span>
              <span>50% (Courbure visible)</span>
              <span>100% (Effet savonnette)</span>
            </div>
          </div>

          {/* SVG Optical Mire Reflection */}
          <div className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 flex justify-between">
              <span>REFLET DES LIGNES DE MIRE SUR LE CHANFREIN DE CORNE</span>
              <span className={`font-bold ${edgeRounding <= 15 ? "text-emerald-400" : "text-rose-400"}`}>
                {edgeRounding <= 15 ? "PLANÉITÉ CONFORME" : "ARÊTE DÉFORMÉE"}
              </span>
            </div>
            <svg viewBox="0 0 440 200" className="w-full h-auto">
              {/* Facet 1 (Top Plane) & Facet 2 (Bevel Plane) */}
              <polygon points="30,25 220,25 220,175 30,175" className="fill-slate-200 dark:fill-[#1E293B] stroke-slate-300 dark:stroke-[#475569]" strokeWidth="1.5" />
              <polygon points="220,25 410,45 410,175 220,175" className="fill-slate-300 dark:fill-[#0F172A] stroke-slate-300 dark:stroke-[#475569]" strokeWidth="1.5" />

              {/* Central Ridge Line */}
              <line
                x1="220"
                y1="25"
                x2="220"
                y2="175"
                stroke="#FEF08A"
                strokeWidth="2.5"
                strokeOpacity={Math.max(0.15, 1 - edgeRounding / 100)}
              />

              {/* Reflected Optical Zebra Lines */}
              {mireLines.map((line, idx) => (
                <path
                  key={idx}
                  d={line.path}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}

              <text x="125" y="192" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                PLAN SUPÉRIEUR SATINÉ
              </text>
              <text x="315" y="192" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="9">
                CHANFREIN POLI MIROIR
              </text>
            </svg>
          </div>

          {/* Verdict Box */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            isCrispConform
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-900 dark:text-emerald-200"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-900 dark:text-rose-200"
          }`}>
            {isCrispConform ? (
              <>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono block mb-1 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  Lecture de la Mire Optique : Cassure Géométrique Franche
                </strong>
                Les lignes lumineuses de la mire restent parfaitement rectilignes jusqu&apos;à l&apos;arête centrale où elles marquent un angle net et sans distorsion, preuve d&apos;une planéité au lapidaire irréprochable sans affaissement des arêtes.
              </>
            ) : (
              <>
                <strong className="text-rose-700 dark:text-rose-400 font-mono block mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Lecture de la Mire Optique : Ondulation &amp; Affaissement d&apos;Arête ({edgeRounding} %)
                </strong>
                Les lignes de la mire s&apos;incurvent en « S » ou en vague au passage de l&apos;arête : la matière a été « mangée » par un feutre trop mou ou un polissage circulaire excessif. Seule une reprise plane au lapidaire rigide (ou un rechargement laser) peut restaurer la géométrie d&apos;origine.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
