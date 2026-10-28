'use client';

/**
 * HorloLearn — Onglet « Examen d'établi » : Grille officielle de contrôle d'atelier
 * (30 points), note helvétique 1.0 – 6.0, critère éliminatoire (propreté cadran & saphir),
 * conformité aux normes suisses NIHS & ISO.
 */

import { useEffect, useRef, useState } from 'react';
import { CheckSquare, RotateCcw, ShieldAlert, Square, Award } from 'lucide-react';
import { EXAM_CRITERIA, EXAM_TOTAL, swissMention, swissNote } from '@/lib/emboitage/data';

interface ExamenProps {
  best: number | null;
  onScore: (note: number) => void;
}

export default function Examen({ best, onScore }: ExamenProps) {
  const [checked, setChecked] = useState<boolean[]>(() => new Array(EXAM_CRITERIA.length).fill(true));
  const firstRun = useRef(true);

  const totalScore = EXAM_CRITERIA.reduce((acc, crit, i) => (checked[i] ? acc + crit.points : acc), 0);
  const eliminatoryFailed = checked[0] === false; // critère 1 : propreté (éliminatoire)
  const note = eliminatoryFailed ? 1.0 : swissNote(totalScore, EXAM_TOTAL);
  const mention = swissMention(note);

  // Persiste le meilleur score (note) — ignore le tout premier rendu
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    onScore(note);
  }, [note, onScore]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const setAll = (val: boolean) => setChecked(new Array(EXAM_CRITERIA.length).fill(val));

  const mentionCls =
    mention.tone === 'emerald'
      ? 'text-emerald-300'
      : mention.tone === 'sky'
        ? 'text-sky-300'
        : mention.tone === 'amber'
          ? 'text-amber-300'
          : 'text-red-300';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hl-fade">
      {/* Grille de critères */}
      <div className="lg:col-span-8 bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-5 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-cream-border dark:border-slate-800 mb-5 gap-3 flex-wrap">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-ink dark:text-slate-100">
              Grille Officielle de Maîtrise d'Atelier
            </h2>
            <p className="text-xs text-ink-soft dark:text-slate-400 mt-0.5">
              10 critères techniques notés sur 30 points — seuil de conformité suisse : 20 pts (note 4.0).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAll(true)} className="text-xs font-label text-bronze-dark dark:text-amber-400 hover:underline">
              Tout valider
            </button>
            <span className="text-cream-border dark:text-slate-700">·</span>
            <button onClick={() => setAll(false)} className="text-xs font-label text-ink-soft dark:text-slate-400 hover:underline">
              Tout décocher
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {EXAM_CRITERIA.map((crit, i) => (
            <label
              key={crit.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer border transition ${
                checked[i]
                  ? 'bg-cream-tile dark:bg-slate-800/60 border-cream-border dark:border-slate-700 hover:bg-cream-track dark:hover:bg-slate-800'
                  : 'bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 hover:bg-red-50'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggle(i);
                }}
                aria-pressed={checked[i]}
                aria-label={`Critère ${crit.label}`}
                className="mt-0.5 shrink-0"
              >
                {checked[i] ? (
                  <CheckSquare className="w-5 h-5 text-bronze dark:text-amber-400" />
                ) : (
                  <Square className="w-5 h-5 text-red-400 dark:text-red-500" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`text-[13.5px] font-semibold leading-snug ${checked[i] ? 'text-ink dark:text-slate-100' : 'text-red-900 dark:text-red-200'}`}>
                    {crit.label}
                  </span>
                  <span
                    className={`font-label text-xs font-bold px-2 py-0.5 rounded ${
                      checked[i]
                        ? 'bg-cream-track dark:bg-slate-700 text-bronze-dark dark:text-amber-400'
                        : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    }`}
                  >
                    +{crit.points} pts
                  </span>
                </div>
                <p className="text-xs text-ink-soft dark:text-slate-400 mt-1 leading-relaxed">{crit.desc}</p>
                {crit.isEliminatory && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-label font-bold text-red-700 dark:text-red-400 mt-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> CRITÈRE ÉLIMINATOIRE DIRECT
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Carte score & note suisse */}
      <div className="lg:col-span-4 bg-cream-card dark:bg-slate-900 text-ink dark:text-slate-100 rounded-3xl border border-cream-border dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6 lg:sticky lg:top-32">
        <div>
          <span className="inline-block text-[10px] uppercase font-label font-bold tracking-widest text-bronze dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-2.5 py-0.5 rounded border border-bronze/20 dark:border-amber-400/20">
            Évaluation d'établi
          </span>
          <h3 className="font-display text-2xl mt-2 text-ink dark:text-slate-100">Bilan de l'emboîtage</h3>
        </div>

        {/* Note géante */}
        <div className="rounded-2xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700 p-5 text-center">
          <div className="text-xs font-label uppercase tracking-wider text-bronze-dark dark:text-amber-400 font-semibold">Note helvétique</div>
          <div className="font-label text-6xl font-bold tracking-tight text-ink dark:text-white my-1">
            {note.toFixed(1)}
          </div>
          <div className={`font-label text-sm font-bold ${mentionCls}`}>{mention.label}</div>
          <div className="text-xs font-label text-ink-soft dark:text-slate-400 mt-2">
            Points cumulés : <strong className="text-ink dark:text-white font-bold">{totalScore}</strong> / {EXAM_TOTAL}
          </div>
        </div>

        {/* Alerte éliminatoire */}
        {eliminatoryFailed && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 dark:bg-red-950/60 p-3.5 text-xs text-red-950 dark:text-red-200 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-red-700 dark:text-red-300 font-bold mb-0.5">Note 1.0 immédiate</strong>
              La moindre poussière sous la glace ou résidu de Rodico sur le cadran annule l'ensemble du travail selon les exigences de la haute horlogerie suisse.
            </div>
          </div>
        )}

        {/* Barème suisse */}
        <div className="space-y-1.5 text-xs font-label border-t border-cream-border dark:border-slate-800 pt-4 text-ink-soft dark:text-slate-400">
          <div className="flex justify-between">
            <span>6.0 — Travail d'exception</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">29-30 pts</span>
          </div>
          <div className="flex justify-between">
            <span>5.0 — Très bon travail</span>
            <span className="text-sky-600 dark:text-sky-300 font-bold">24-28 pts</span>
          </div>
          <div className="flex justify-between">
            <span>4.0 — Seuil de réussite</span>
            <span className="text-amber-300 font-bold">20-23 pts</span>
          </div>
          <div className="flex justify-between">
            <span>&lt; 4.0 — Reprendre les gestes</span>
            <span className="text-red-400 font-bold">&lt; 20 pts</span>
          </div>
        </div>

        {best !== null && (
          <div className="pt-2 border-t border-cream-border dark:border-slate-800 flex items-center justify-between text-xs font-label text-ink-soft dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-bronze dark:text-amber-400" /> Meilleure note :
            </span>
            <strong className="text-ink dark:text-white text-sm font-bold">{best.toFixed(1)} / 6.0</strong>
          </div>
        )}
      </div>
    </div>
  );
}
