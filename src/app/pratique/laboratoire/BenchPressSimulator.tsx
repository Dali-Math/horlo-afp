'use client';

import React, { useState } from 'react';
import {
  Wrench,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowDown,
  Info,
  ShieldCheck,
  Sparkles,
  Sliders,
  ShieldAlert,
} from 'lucide-react';

export default function BenchPressSimulator() {
  // --- SUB-BENCH A : ALÉSAGE DU CANON DE TROTTEUSE ---
  const [pipeDia, setPipeDia] = useState<number>(0.236);
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'ok' | 'warning' | 'error' | 'success';
    msg: string;
  }>({
    type: 'idle',
    msg: "Nouveau canon d'aiguille de seconde chargé (Ø 0.236 mm). Alésez doucement par petits quarts de tour.",
  });

  const handleResetBroach = () => {
    setPipeDia(0.236);
    setFeedback({
      type: 'idle',
      msg: "Nouveau canon d'aiguille de seconde chargé (Ø 0.236 mm). Alésez doucement par petits quarts de tour.",
    });
  };

  const handleReam = (inc: number) => {
    const nextVal = parseFloat(Math.min(0.255, pipeDia + inc).toFixed(3));
    setPipeDia(nextVal);
    const diffUm = Math.round((nextVal - 0.25) * 1000);

    if (nextVal >= 0.245 && nextVal <= 0.247) {
      setFeedback({
        type: 'ok',
        msg: `Cote d’ajustement idéale (${nextVal.toFixed(3)} mm) ! Serrage parfait d'établi de ${diffUm} µm. Vous pouvez maintenant chasser l'aiguille à la potence.`,
      });
    } else if (nextVal > 0.248) {
      setFeedback({
        type: 'warning',
        msg: `Attention (${nextVal.toFixed(3)} mm) : Le canon est trop alésé ! Le serrage est insuffisant, l'aiguille de seconde risque de flotter ou de patiner à la remise à zéro.`,
      });
    } else {
      setFeedback({
        type: 'idle',
        msg: `Alésage augmenté à ${nextVal.toFixed(3)} mm (Serrage actuel : ${diffUm > 0 ? '+' : ''}${diffUm} µm).`,
      });
    }
  };

  const handleTestFit = () => {
    if (pipeDia < 0.244) {
      setFeedback({
        type: 'error',
        msg: `ÉCHEC DU CHASSAGE : Canon encore trop étroit (${pipeDia.toFixed(3)} mm) ! L'effort excessif à la potence va fendre la jupe de l'aiguille ou fausser le pivot du tenon de seconde.`,
      });
    } else if (pipeDia <= 0.248) {
      setFeedback({
        type: 'success',
        msg: `CHASSAGE PARFAIT CONFORME AUX NORMES SUISSES : L'aiguille descend d'aplomb avec une tenue ferme et régulière sur le tenon Ø 0.250 mm. Tolérance tenue au micron !`,
      });
    } else {
      setFeedback({
        type: 'error',
        msg: `ÉCHEC DE TENUE : Alésage trop grand (${pipeDia.toFixed(3)} mm). L'aiguille n'a aucune adhérence sur le tenon et glisse au moindre choc.`,
      });
    }
  };

  const pct = Math.min(98, Math.max(2, ((pipeDia - 0.235) / 0.02) * 100));
  const diffUm = Math.round((pipeDia - 0.25) * 1000);

  // --- SUB-BENCH B : POTENCE ROBUR ---
  const [upperDie, setUpperDie] = useState<'hollow_correct' | 'flat_wrong' | 'small_wrong'>('hollow_correct');
  const [lowerDie, setLowerDie] = useState<'rim_correct' | 'lugs_wrong'>('rim_correct');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            SUB-BENCH A : ALÉSAGE DU CANON À L'ÉQUARRISSOIR (6 cols)
            ========================================================================= */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Opération d&apos;Établi Pratique #1
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
                Alésage du Canon de Trotteuse à l&apos;Équarrissoir
              </h2>
            </div>
            <button
              onClick={handleResetBroach}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-amber-500 transition inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nouveau Canon</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Le tenon de la roue de seconde mesure exactement{' '}
            <strong className="text-slate-900 dark:text-white font-mono">Ø 0.250 mm</strong>. Le canon neuf d&apos;une
            aiguille de seconde est livré sous-alésé à{' '}
            <strong className="text-amber-600 dark:text-amber-400 font-mono">Ø 0.236 mm</strong>. Alésez-le à l&apos;équarrissoir
            penté pour obtenir un <strong className="text-slate-900 dark:text-white">serrage fonctionnel de -3 à -5 µm</strong>{' '}
            (alésage final entre <strong className="text-emerald-600 dark:text-emerald-400 font-mono">0.245 et 0.247 mm</strong>).
          </p>

          {/* Visual Gauge of Pipe Diameter */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500 dark:text-slate-400">ALÉSAGE ACTUEL DU CANON :</span>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                {pipeDia.toFixed(3)} mm ({diffUm > 0 ? `+${diffUm}` : diffUm} µm)
              </span>
            </div>

            {/* Gauge Bar */}
            <div className="relative w-full h-8 bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 overflow-hidden">
              {/* Target Zone: 0.245 to 0.247 (50% to 65%) */}
              <div
                className="absolute top-0 bottom-0 bg-emerald-500/25 border-x border-emerald-500 flex items-center justify-center"
                style={{ left: '50%', width: '15%' }}
              >
                <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-300">
                  CIBLE IDÉALE
                </span>
              </div>
              {/* Danger Zone: > 0.249 (70% to 100%) */}
              <div
                className="absolute top-0 bottom-0 bg-rose-500/20"
                style={{ left: '70%', right: 0 }}
              />
              {/* Needle Marker */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-amber-500 shadow-[0_0_10px_#f59e0b] transition-all"
                style={{ left: `${pct}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>0.235 mm (Trop serré : Fente)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                0.245 — 0.247 mm
              </span>
              <span className="text-rose-500">&gt;0.250 mm (Flotte)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleReam(0.001)}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center"
            >
              <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                + 1/8 de tour
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Finition (+1 µm)
              </div>
            </button>
            <button
              onClick={() => handleReam(0.003)}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center"
            >
              <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                + 1/4 de tour
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Coupe (+3 µm)
              </div>
            </button>
            <button
              onClick={handleTestFit}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition text-center shadow-md"
            >
              <div className="text-xs font-mono flex items-center justify-center gap-1">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Chasser l&apos;aiguille</span>
              </div>
              <div className="text-[10px] opacity-80 mt-0.5">Test à la potence</div>
            </button>
          </div>

          {/* Feedback Box */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              feedback.type === 'ok' || feedback.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                : feedback.type === 'warning'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-200'
                : feedback.type === 'error'
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-200'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>{feedback.msg}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SUB-BENCH B : CHOIX DES TASSEAUX & POTENCE ROBUR (6 cols)
            ========================================================================= */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 transition-colors">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
              Opération d&apos;Établi Pratique #2
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              Choix des Tasseaux &amp; Fermeture à la Potence (Robur / Bergeon)
            </h2>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Fermeture d&apos;une boîte étanche équipée d&apos;un <strong className="text-slate-900 dark:text-white">verre saphir bombé</strong>{' '}
            (Ø 30.0 mm) et lunette biseautée (Ø extérieur 34.0 mm). Sélectionnez le{' '}
            <strong className="text-sky-600 dark:text-sky-400">tasseau supérieur</strong> et le{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">tasseau inférieur</strong> en Delrin avant
            de descendre la vis micrométrique.
          </p>

          {/* SVG Visualizer of Press Dies & Watch Case */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <svg viewBox="0 0 440 165" className="w-full h-auto select-none">
              {/* Upper Die */}
              <g
                transform="translate(220, 32)"
                style={{ transition: 'transform 0.3s ease-out' }}
              >
                {upperDie === 'hollow_correct' ? (
                  <path
                    d="M -75 -22 L 75 -22 L 68 16 L 45 16 L 40 -4 L -40 -4 L -45 16 L -68 16 Z"
                    fill="#38BDF8"
                    fillOpacity="0.3"
                    stroke="#38BDF8"
                    strokeWidth="2"
                  />
                ) : upperDie === 'flat_wrong' ? (
                  <rect
                    x="-75"
                    y="-22"
                    width="150"
                    height="38"
                    rx="3"
                    fill="#EF4444"
                    fillOpacity="0.4"
                    stroke="#EF4444"
                    strokeWidth="2"
                  />
                ) : (
                  <path
                    d="M -50 -22 L 50 -22 L 44 16 L 30 16 L 25 -4 L -25 -4 L -30 16 L -44 16 Z"
                    fill="#F59E0B"
                    fillOpacity="0.4"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                )}
                <text
                  x="0"
                  y="-9"
                  textAnchor="middle"
                  fill="#E0F2FE"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {upperDie === 'hollow_correct'
                    ? 'TASSEAU CREUX Ø 34/31 mm'
                    : upperDie === 'flat_wrong'
                    ? 'TASSEAU PLAT PLEIN (DESTRUCTEUR)'
                    : 'TASSEAU TROP ÉTROIT (Ø 28 mm)'}
                </text>
              </g>

              {/* Watch Case + Domed Sapphire Crystal */}
              <g transform="translate(220, 88)">
                {/* Domed Crystal */}
                <path
                  d="M -52 -22 Q 0 -46 52 -22"
                  fill="none"
                  stroke={upperDie === 'flat_wrong' ? '#EF4444' : '#38BDF8'}
                  strokeWidth="3.5"
                  strokeDasharray={upperDie === 'flat_wrong' ? '4 2' : 'none'}
                />
                {/* Bezel & Case Middle */}
                <path
                  d="M -72 -8 L -52 -22 L 52 -22 L 72 -8 L 72 22 L -72 22 Z"
                  fill="#334155"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fontWeight="bold"
                >
                  CARRURE + VERRE SAPHIR BOMBÉ
                </text>
              </g>

              {/* Lower Die */}
              <g transform="translate(220, 138)">
                <rect
                  x={lowerDie === 'rim_correct' ? '-80' : '-110'}
                  y="-12"
                  width={lowerDie === 'rim_correct' ? '160' : '220'}
                  height="24"
                  rx="4"
                  fill={lowerDie === 'rim_correct' ? '#1E293B' : '#7F1D1D'}
                  stroke={lowerDie === 'rim_correct' ? '#10B981' : '#EF4444'}
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={lowerDie === 'rim_correct' ? '#10B981' : '#FCA5A5'}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {lowerDie === 'rim_correct'
                    ? 'TASSEAU À ÉPAULEMENT (APPUI CARRURE)'
                    : 'TASSEAU TROP LARGE (APPUI SUR CORNES !)'}
                </text>
              </g>
            </svg>
          </div>

          {/* Die Configuration Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <label className="block text-[10px] font-mono uppercase text-sky-600 dark:text-sky-400 font-bold mb-1">
                1. Tasseau Supérieur (Côté Glace)
              </label>
              <select
                value={upperDie}
                onChange={(e) => setUpperDie(e.target.value as any)}
                aria-label="Tasseau Supérieur (Côté Glace)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-white outline-none cursor-pointer"
              >
                <option value="hollow_correct">Tasseau Creux Ø 34/31 mm (Appui sur lunette)</option>
                <option value="flat_wrong">Tasseau Plat Plein (Appui direct sur le dôme !)</option>
                <option value="small_wrong">Tasseau Creux Ø 28 mm (Porte sur le verre !)</option>
              </select>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <label className="block text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                2. Tasseau Inférieur (Côté Fond)
              </label>
              <select
                value={lowerDie}
                onChange={(e) => setLowerDie(e.target.value as any)}
                aria-label="Tasseau Inférieur (Côté Fond)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-white outline-none cursor-pointer"
              >
                <option value="rim_correct">Tasseau à épaulement (Appui sur cran de carrure)</option>
                <option value="lugs_wrong">Tasseau plat large (Porte sur les cornes !)</option>
              </select>
            </div>
          </div>

          {/* Validation Alert */}
          {upperDie === 'hollow_correct' && lowerDie === 'rim_correct' ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Montage Sécurisé Conforme :</strong> Le tasseau creux (Ø 34/31 mm) dégage totalement le dôme de la glace saphir et concentre la pression sur le biseau métallique de la lunette. Le tasseau inférieur soutient directement la carrure sans mettre les cornes en porte-à-faux.
                </div>
              </div>
            </div>
          ) : upperDie !== 'hollow_correct' ? (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong>CASSE IMMÉDIATE DE LA GLACE SAPHIR !</strong> Un tasseau plat ou d&apos;un diamètre inférieur à celui du dôme applique toute la force de compression au centre du verre saphir. Éclatement garanti sous la contrainte.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>DÉFORMATION OU RUPTURE DES CORNES :</strong> Le tasseau inférieur est trop large et porte sur les pointes de cornes de la boîte au lieu d&apos;appuyer sur la rainure de carrure. Risque de gauchissement irréversible de l&apos;entre-corne.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
