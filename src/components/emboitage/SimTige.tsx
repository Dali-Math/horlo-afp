'use client';

/**
 * HorloLearn — Simulateur 01 : Découpe micrométrique de la tige de remontoir
 * Règle d'or : couper 0.20 mm de MOINS que la cote, puis ajuster.
 * Verdict en direct : jeu sous couronne, compression du joint, éliminatoires.
 */

import { useCallback, useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, Ruler, Volume2, XCircle } from 'lucide-react';

interface Verdict {
  tone: 'ok' | 'adjust' | 'toolong' | 'tooshort';
  title: string;
  body: string;
}

export default function SimTige() {
  const [overhangA, setOverhangA] = useState(4.5); // dépassement mesuré (mm)
  const [threadDepthB, setThreadDepthB] = useState(2.2); // profondeur de taraudage (mm)
  const [actualCut, setActualCut] = useState(2.3); // coupe réelle effectuée (mm)

  // Cote idéale : A − B, plancher de sécurité 0.20 mm
  const idealCut = Math.max(0.2, overhangA - threadDepthB);
  const deltaStem = actualCut - idealCut; // + : tige plus courte ; − : tige plus longue
  const crownGap = deltaStem < -0.1 ? Math.abs(deltaStem) : 0;
  const jointComp = deltaStem < -0.1 ? Math.max(0, Math.round(25 - crownGap * 50)) : deltaStem > 0.15 ? 0 : 25;

  const verdict: Verdict =
    deltaStem < -0.1
      ? {
          tone: 'toolong',
          title: `TIGE TROP LONGUE (+${Math.abs(deltaStem).toFixed(2)} mm) : jour visible sous couronne`,
          body: "La couronne ne plaque pas contre le tube. Le joint torique n'est pas comprimé : montre non étanche ! La tige pliera au premier choc.",
        }
      : deltaStem > 0.15
        ? {
            tone: 'tooshort',
            title: `TIGE TROP COURTE (−${deltaStem.toFixed(2)} mm) : défaut éliminatoire !`,
            body: "La tige ne s'enclenche plus en position mise à l'heure ou fait sauter la bascule de tirette. La tige est gâchée, remplacement obligatoire !",
          }
        : Math.abs(deltaStem) <= 0.05
          ? {
              tone: 'ok',
              title: 'AJUSTEMENT PARFAIT · NORMES SUISSES VALIDÉES',
              body: 'La couronne plaque délicatement contre le tube avec une compression de joint de 25 %. Le passage en position 1, 2 et le remontage sont fluides et francs.',
            }
          : {
              tone: 'adjust',
              title: 'LÉGÈREMENT HORS COTE : ajustable à la lime',
              body: "Retouchez à la lime douce puis ébavurez l'amorce de filet sur la pierre d'Arkansas à 45°. Contrôlez le jeu sous couronne au pied à coulisse.",
            };

  const playCutSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // silencieux
    }
  }, []);

  const reset = () => {
    setOverhangA(4.5);
    setThreadDepthB(2.2);
    setActualCut(2.3);
  };

  const sliderRow = (
    label: string,
    hint: string,
    value: number,
    setValue: (v: number) => void,
    min: number,
    max: number,
    unit = 'mm'
  ) => (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[13px] text-ink">
          {label} <span className="text-ink-soft text-xs">· {hint}</span>
        </span>
        <span className="font-label font-bold text-bronze-dark text-sm">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <input
        type="range"
        className="hl-slider w-full"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        aria-label={label}
      />
    </div>
  );

  return (
    <div className="bg-cream-card rounded-3xl border border-cream-border p-5 sm:p-8 shadow-sm space-y-8 hl-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cream-border gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md bg-bronze/10 text-bronze-dark border border-bronze/25 text-xs font-label font-bold">
            SIMULATEUR INTERACTIF 01 · ÉTAPE 06
          </span>
          <h2 className="font-display text-2xl text-ink mt-1.5">Calculateur de coupe de la tige de remontoir</h2>
          <p className="text-sm text-ink-soft mt-1 max-w-2xl">
            Ajustez la cote mesurée (A), la profondeur de taraudage (B) et la coupe réellement effectuée.
            Le simulateur juge votre coupe selon la règle du maître : <strong className="text-ink">toujours 0.20 mm de moins, puis ajuster</strong>.
          </p>
        </div>
        <button
          onClick={reset}
          className="shrink-0 px-3.5 py-2 rounded-xl border border-cream-border bg-cream-tile hover:bg-cream-track text-xs font-label font-semibold text-ink-soft hover:text-ink transition flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Commandes */}
        <div className="lg:col-span-7 space-y-5">
          {sliderRow('A — Dépassement mesuré de la tige brute', 'pied à coulisse au 1/100e', overhangA, setOverhangA, 3.5, 6.5)}
          {sliderRow('B — Profondeur de taraudage de la couronne', 'cote constructeur', threadDepthB, setThreadDepthB, 1.5, 3.5)}
          {sliderRow('Coupe réellement effectuée', 'pince carbure / bocfil 3-0', actualCut, setActualCut, 1.5, 4.5)}

          {/* Coupe idéale + règle graduée */}
          <div className="p-4 rounded-2xl bg-cream-tile border border-cream-border">
            <div className="flex items-center justify-between mb-2.5">
              <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft uppercase tracking-wider">
                <Ruler className="w-3.5 h-3.5 text-bronze" /> Coupe idéale = A − B
              </span>
              <span className="font-label font-bold text-bronze-dark">{idealCut.toFixed(2)} mm</span>
            </div>
            <div className="relative h-9 rounded-lg bg-cream-card border border-cream-border overflow-hidden">
              {/* Zone de tolérance */}
              <div
                className="absolute top-0 bottom-0 bg-emerald-100 border-x border-emerald-300"
                style={{
                  left: `${((idealCut - 0.05) / 4.6) * 100}%`,
                  width: `${(0.1 / 4.6) * 100}%`,
                }}
              />
              {/* Repère idéal */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-bronze"
                style={{ left: `${(idealCut / 4.6) * 100}%` }}
                title={`Coupe idéale ${idealCut.toFixed(2)} mm`}
              />
              {/* Repère coupe réelle */}
              <div
                className={`absolute top-1 bottom-1 w-1 rounded ${Math.abs(deltaStem) <= 0.05 ? 'bg-emerald-500' : deltaStem > 0.15 || deltaStem < -0.1 ? 'bg-red-500' : 'bg-amber-500'}`}
                style={{ left: `${(actualCut / 4.6) * 100}%` }}
                title={`Coupe réelle ${actualCut.toFixed(2)} mm`}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 font-label text-[10px] text-ink-soft">0</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-label text-[10px] text-ink-soft">4.60 mm</span>
            </div>
            <p className="text-[11.5px] text-ink-soft mt-2">
              Piste verte = tolérance parfaite ±0.05 mm · trait bronze = coupe idéale · barre colorée = votre coupe.
            </p>
          </div>

          {/* Télémétrie */}
          <div className="grid grid-cols-3 gap-3 font-label text-center">
            <div className="p-3 rounded-xl bg-cream-tile border border-cream-border">
              <div className="text-[10px] text-ink-soft mb-0.5">Δ vs cote idéale</div>
              <div className={`text-base font-bold ${Math.abs(deltaStem) <= 0.05 ? 'text-emerald-600' : deltaStem > 0.15 || deltaStem < -0.1 ? 'text-red-600' : 'text-amber-600'}`}>
                {deltaStem >= 0 ? '+' : ''}
                {deltaStem.toFixed(2)} mm
              </div>
            </div>
            <div className="p-3 rounded-xl bg-cream-tile border border-cream-border">
              <div className="text-[10px] text-ink-soft mb-0.5">Jeu sous couronne</div>
              <div className={`text-base font-bold ${crownGap > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{crownGap.toFixed(2)} mm</div>
            </div>
            <div className="p-3 rounded-xl bg-cream-tile border border-cream-border">
              <div className="text-[10px] text-ink-soft mb-0.5">Compression joint</div>
              <div className={`text-base font-bold ${jointComp >= 20 ? 'text-emerald-600' : 'text-red-600'}`}>{jointComp} %</div>
            </div>
          </div>

          {/* Verdict */}
          {verdict.tone === 'ok' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13px] sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{verdict.title}</strong>
                <span>{verdict.body}</span>
              </div>
            </div>
          ) : verdict.tone === 'adjust' ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-[13px] sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{verdict.title}</strong>
                <span>{verdict.body}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-[13px] sm:text-sm flex items-start gap-3">
              {verdict.tone === 'toolong' ? (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="block font-bold">{verdict.title}</strong>
                <span>{verdict.body}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visualisation dynamique */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-cream-tile border border-cream-border p-5 flex flex-col items-center">
            <div className="text-xs font-label text-ink-soft mb-2 self-start flex justify-between w-full">
              <span className="uppercase tracking-wider font-bold">Coupe tube &amp; couronne en direct</span>
              <span className={`font-bold ${Math.abs(deltaStem) <= 0.05 ? 'text-emerald-600' : 'text-red-600'}`}>
                {Math.abs(deltaStem) <= 0.05 ? 'CONFORME' : 'HORS TOLÉRANCE'}
              </span>
            </div>

            <svg viewBox="0 0 320 220" className="w-full h-auto rounded-xl bg-cream-card border border-cream-border" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="40" height="180" rx="4" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
              <text x="40" y="115" fill="#E7E0D2" fontSize="9" fontFamily="var(--font-jbmono), monospace" textAnchor="middle" transform="rotate(-90 40 115)">CARRURE</text>

              <rect x="60" y="85" width="75" height="50" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
              <rect x="60" y="97" width="75" height="26" fill="#F3EFE7" />
              <text x="97" y="80" fill="#475569" fontSize="8" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Tube de carrure</text>

              <rect x="35" y="105" width="135" height="10" fill="#CBD5E1" stroke="#475569" strokeWidth="0.8" />
              <line x1="120" y1="102" x2="120" y2="118" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="120" y="132" fill="#B91C1C" fontSize="7" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Ligne de coupe</text>

              {/* Couronne mobile */}
              <g transform={`translate(${deltaStem < -0.1 ? Math.min(25, crownGap * 15) : deltaStem > 0.15 ? -6 : 0}, 0)`} className="transition-transform duration-300">
                <rect x="135" y="70" width="30" height="80" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1.2" />
                <line x1="140" y1="72" x2="140" y2="148" stroke="#334155" strokeWidth="1" />
                <line x1="146" y1="72" x2="146" y2="148" stroke="#334155" strokeWidth="1" />
                <line x1="152" y1="72" x2="152" y2="148" stroke="#334155" strokeWidth="1" />
                <line x1="158" y1="72" x2="158" y2="148" stroke="#334155" strokeWidth="1" />
                <circle cx="132" cy="110" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
                <text x="150" y="60" fill="#334155" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold" textAnchor="middle">Couronne</text>
              </g>
            </svg>

            <button
              onClick={playCutSound}
              className="mt-4 px-4 py-2 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-xs font-semibold shadow transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Simuler coupe au carbure &amp; ébavurage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
