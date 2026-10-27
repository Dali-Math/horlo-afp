'use client';

/**
 * HorloLearn — Onglet « Examen blanc » : grille officielle d'évaluation
 * AFP / CFC (30 points), note helvétique 1.0 – 6.0, gestion du critère
 * éliminatoire (propreté cadran & saphir) et meilleur score persistant.
 */

import { useEffect, useRef, useState } from 'react';
import { CheckSquare, RotateCcw, ShieldAlert, Square } from 'lucide-react';
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
  }, [note]);

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
      <div className="lg:col-span-8 bg-cream-card rounded-3xl border border-cream-border p-5 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-cream-border mb-5 gap-3 flex-wrap">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-ink">Grille officielle d'évaluation AFP / CFC</h2>
            <p className="text-xs text-ink-soft mt-0.5">
              10 critères d'atelier notés sur 30 points — seuil d'obtention du diplôme : 20 pts (note 4.0).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAll(true)} className="text-xs font-label text-bronze-dark hover:underline">
              Tout valider
            </button>
            <span className="text-cream-border">·</span>
            <button onClick={() => setAll(false)} className="text-xs font-label text-ink-soft hover:underline">
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
                  ? 'bg-cream-tile border-cream-border hover:bg-cream-track'
                  : 'bg-red-50/60 border-red-200 hover:bg-red-50'
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
                  <CheckSquare className="w-5 h-5 text-bronze" />
                ) : (
                  <Square className="w-5 h-5 text-red-400" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex justify-between gap-2 font-semibold text-[14px] text-ink">
                  <span>
                    {crit.label}
                    {crit.isEliminatory && (
                      <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-label font-bold uppercase align-middle">
                        <ShieldAlert className="w-3 h-3" /> éliminatoire
                      </span>
                    )}
                  </span>
                  <span className="font-label text-bronze-dark shrink-0">{crit.points} pts</span>
                </div>
                <p className="text-ink-soft text-xs mt-0.5 leading-relaxed">{crit.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div className="lg:col-span-4">
        <div className="rounded-3xl bg-[#221B10] border border-bronze/40 p-6 sm:p-8 text-cream shadow-xl space-y-6 lg:sticky lg:top-32">
          <div className="text-center pb-4 border-b border-white/10">
            <span className="text-xs uppercase font-label tracking-widest text-bronze-light font-bold block mb-1">
              Verdict d'examen suisse
            </span>
            <div className="text-6xl font-label font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-100 my-2">
              {note.toFixed(1)}
            </div>
            <div className="text-xs font-label text-white/50">Note helvétique (échelle 1.0 à 6.0)</div>
            <div className={`text-sm font-label font-bold mt-2 ${mentionCls}`}>{mention.label}</div>
          </div>

          <div className="space-y-3 font-label text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/10">
              <span className="text-white/50">Points obtenus :</span>
              <span className="font-bold text-bronze-light text-sm">
                {totalScore} / {EXAM_TOTAL} pts
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10">
              <span className="text-white/50">Seuil de réussite :</span>
              <span className="font-bold text-cream">20 pts (note 4.0)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10">
              <span className="text-white/50">Meilleur blanc :</span>
              <span className="font-bold text-bronze-light">{best !== null ? best.toFixed(1) : '—'}</span>
            </div>
          </div>

          {eliminatoryFailed ? (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-400/40 text-red-200 text-xs text-center space-y-1">
              <div className="font-bold text-sm flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> DÉFAUT ÉLIMINATOIRE
              </div>
              <p className="text-white/60 text-[11px]">
                Une trace de poussière ou une micro-rayure cadran / saphir annule la pièce, quel que soit le
                reste du travail. Retour à l'étape 03 : protocole lumière rasante 45°.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-bronze/15 border border-bronze/40 text-bronze-light text-xs text-center space-y-1">
              <div className="font-bold text-sm">Certification d'atelier validée</div>
              <p className="text-white/50 text-[11px]">
                L'élève maîtrise l'ensemble de la chaîne d'habillage horloger selon les directives fédérales
                AFP / CFC.
              </p>
            </div>
          )}

          <button
            onClick={() => setAll(true)}
            className="w-full py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-xs font-label font-semibold text-white/70 hover:text-cream transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Rejouer l'examen blanc
          </button>
        </div>
      </div>
    </div>
  );
}
