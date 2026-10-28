'use client';

/**
 * HorloLearn — Onglet « Quiz » : 15 questions QCM d'établi tirées des 13 gestes.
 * Correction immédiate avec explication d'atelier, note suisse (1.0 – 6.0)
 * et meilleur score persistant.
 */

import { useState } from 'react';
import { Award, CheckCircle2, GraduationCap, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_DATA, swissNote, swissMention } from '@/lib/emboitage/data';

interface QuizProps {
  best: number | null;
  onScore: (note: number) => void;
}

export default function Quiz({ best, onScore }: QuizProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [runId, setRunId] = useState(0); // clé de relance

  const q = QUIZ_DATA[idx];
  const total = QUIZ_DATA.length;
  const answered = selected !== null;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
      onScore(swissNote(score, total));
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setRunId((r) => r + 1);
  };

  if (finished) {
    const note = swissNote(score, total);
    const mention = swissMention(note);
    const toneCls =
      mention.tone === 'emerald'
        ? 'text-emerald-600 dark:text-emerald-400'
        : mention.tone === 'sky'
          ? 'text-sky-700 dark:text-sky-400'
          : mention.tone === 'amber'
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-red-600 dark:text-red-400';

    return (
      <div className="max-w-2xl mx-auto bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-8 shadow-sm text-center space-y-5 hl-fade" key={runId}>
        <span className="inline-flex w-14 h-14 rounded-2xl bg-bronze/10 dark:bg-amber-400/10 border border-bronze/30 dark:border-amber-400/30 items-center justify-center">
          <GraduationCap className="w-7 h-7 text-bronze-dark dark:text-amber-400" />
        </span>
        <h2 className="font-display text-2xl text-ink dark:text-slate-100">Évaluation d'Atelier Terminée !</h2>
        <div>
          <div className="font-label text-5xl font-bold text-bronze-dark dark:text-amber-400">{note.toFixed(1)}</div>
          <div className="text-xs font-label text-ink-soft dark:text-slate-400 mt-1">Note helvétique officielle (échelle 1.0 – 6.0)</div>
          <div className={`font-label text-sm font-bold mt-2 ${toneCls}`}>{mention.label}</div>
        </div>
        <div className="font-label text-sm text-ink-soft dark:text-slate-300">
          {score} / {total} réponses correctes
          {best !== null && (
            <span className="block mt-1">
              Meilleur score de session : <strong className="text-bronze-dark dark:text-amber-400">{best.toFixed(1)}</strong>
            </span>
          )}
        </div>

        {/* Rappel pédagogique */}
        {score < total && (
          <div className="text-left space-y-3">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-slate-400">À consolider à l'établi</h3>
            <div className="rounded-2xl border border-dashed border-cream-border dark:border-slate-700 bg-cream-tile/60 dark:bg-slate-800/40 p-4 text-[13px] text-ink-soft dark:text-slate-300 leading-relaxed">
              Consultez le parcours guidé des 13 gestes pour revoir les règles de propreté martre, la position des aiguilles à 15h15, le rôle du doigt de limitation et le cône à 90° sur pierre d'Arkansas.
            </div>
          </div>
        )}

        <button
          onClick={restart}
          className="px-5 py-2.5 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-xs font-bold transition inline-flex items-center gap-2 shadow"
        >
          <RotateCcw className="w-4 h-4" /> Recommencer le test
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 hl-fade" key={runId}>
      {/* Progression */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-cream-track dark:bg-slate-800 border border-cream-border dark:border-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bronze-light to-bronze transition-all duration-400"
            style={{ width: `${((idx + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <span className="font-label text-xs text-ink-soft dark:text-slate-400 whitespace-nowrap">
          Question {idx + 1}/{total} · Score : {score}
        </span>
      </div>

      <div className="bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-bronze/10 dark:bg-amber-400/10 text-bronze-dark dark:text-amber-400 border border-bronze/25 dark:border-amber-400/30 text-[11px] font-label font-bold">
            Étape {q.stepRef < 10 ? '0' : ''}{q.stepRef}
          </span>
          <span className="text-[11px] font-label text-ink-soft dark:text-slate-400">Pratique d'établi suisse</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl text-ink dark:text-slate-100 leading-snug">{q.question}</h3>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = answered && i === q.correct;
            const isWrongPick = answered && i === selected && i !== q.correct;
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={answered}
                className={`w-full text-left p-3.5 rounded-xl border text-[14px] leading-snug transition flex items-start gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200'
                    : isWrongPick
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-400 dark:border-red-600 text-red-900 dark:text-red-200'
                      : answered
                        ? 'bg-cream-tile dark:bg-slate-800/40 border-cream-border dark:border-slate-800 text-ink-soft dark:text-slate-500 opacity-60'
                        : 'bg-cream-tile dark:bg-slate-800/60 border-cream-border dark:border-slate-700 text-ink dark:text-slate-200 hover:border-bronze dark:hover:border-amber-400 hover:bg-bronze/[0.05]'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border flex items-center justify-center font-label text-[10px] font-bold ${
                    isCorrect
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isWrongPick
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-cream-border dark:border-slate-600 text-ink-soft dark:text-slate-400 bg-cream-card dark:bg-slate-800'
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                {isWrongPick && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="rounded-2xl border-l-4 border-bronze dark:border-amber-400 bg-bronze/[0.06] dark:bg-amber-400/[0.08] p-4 hl-fade">
            <strong className="block font-label text-xs uppercase tracking-wider text-bronze-dark dark:text-amber-400 mb-1">
              {selected === q.correct ? 'Règle exacte d\'atelier !' : 'Explication du maître horloger'}
            </strong>
            <p className="text-[13.5px] leading-relaxed text-ink dark:text-slate-200">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={next}
            className="w-full py-3 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-sm font-bold transition shadow"
          >
            {idx + 1 >= total ? 'Voir ma note suisse' : 'Question suivante'}
          </button>
        )}
      </div>

      {best !== null && (
        <p className="text-center text-xs font-label text-ink-soft dark:text-slate-400 flex items-center justify-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-bronze dark:text-amber-400" /> Meilleur score enregistré : {best.toFixed(1)} / 6.0
        </p>
      )}
    </div>
  );
}
