'use client';

/**
 * HorloLearn — Onglet « Quiz » : 12 questions QCM tirées des 7 gestes.
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
        ? 'text-emerald-600'
        : mention.tone === 'sky'
          ? 'text-sky-700'
          : mention.tone === 'amber'
            ? 'text-amber-600'
            : 'text-red-600';

    return (
      <div className="max-w-2xl mx-auto bg-cream-card rounded-3xl border border-cream-border p-8 shadow-sm text-center space-y-5 hl-fade" key={runId}>
        <span className="inline-flex w-14 h-14 rounded-2xl bg-bronze/10 border border-bronze/30 items-center justify-center">
          <GraduationCap className="w-7 h-7 text-bronze-dark" />
        </span>
        <h2 className="font-display text-2xl text-ink">Quiz terminé !</h2>
        <div>
          <div className="font-label text-5xl font-bold text-bronze-dark">{note.toFixed(1)}</div>
          <div className="text-xs font-label text-ink-soft mt-1">Note helvétique (échelle 1.0 – 6.0)</div>
          <div className={`font-label text-sm font-bold mt-2 ${toneCls}`}>{mention.label}</div>
        </div>
        <div className="font-label text-sm text-ink-soft">
          {score} / {total} réponses correctes
          {best !== null && (
            <span className="block mt-1">
              Meilleur score de la session : <strong className="text-bronze-dark">{best.toFixed(1)}</strong>
            </span>
          )}
        </div>

        {/* Rappel pédagogique */}
        {score < total && (
          <div className="text-left space-y-3">
            <h3 className="font-label text-xs font-bold uppercase tracking-wider text-ink-soft">À revoir avant l'examen</h3>
            <div className="rounded-2xl border border-dashed border-cream-border bg-cream-tile/60 p-4 text-[13px] text-ink-soft leading-relaxed">
              Reprenez le parcours guidé : chaque question renvoie à une étape précise (repère « Étape 0N »).
              Refaites le quiz jusqu'à décrocher la note 6.0 — les questions changent rarement à l'examen !
            </div>
          </div>
        )}

        <button
          onClick={restart}
          className="px-5 py-2.5 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-xs font-bold transition inline-flex items-center gap-2 shadow"
        >
          <RotateCcw className="w-4 h-4" /> Refaire le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 hl-fade" key={runId}>
      {/* Progression */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-cream-track border border-cream-border overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bronze-light to-bronze transition-all duration-400"
            style={{ width: `${((idx + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <span className="font-label text-xs text-ink-soft whitespace-nowrap">
          Question {idx + 1}/{total} · score {score}
        </span>
      </div>

      <div className="bg-cream-card rounded-3xl border border-cream-border p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-bronze/10 text-bronze-dark border border-bronze/25 text-[11px] font-label font-bold">
            Étape 0{q.stepRef}
          </span>
          <span className="text-[11px] font-label text-ink-soft">Connaissance d'atelier</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl text-ink leading-snug">{q.question}</h3>

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
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : isWrongPick
                      ? 'bg-red-50 border-red-400 text-red-900'
                      : answered
                        ? 'bg-cream-tile border-cream-border text-ink-soft opacity-70'
                        : 'bg-cream-tile border-cream-border text-ink hover:border-bronze hover:bg-bronze/[0.05]'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border flex items-center justify-center font-label text-[10px] font-bold ${
                    isCorrect ? 'bg-emerald-600 border-emerald-600 text-white' : isWrongPick ? 'bg-red-600 border-red-600 text-white' : 'border-cream-border text-ink-soft bg-cream-card'
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isWrongPick && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="rounded-2xl border-l-4 border-bronze bg-bronze/[0.06] p-4 hl-fade">
            <strong className="block font-label text-xs uppercase tracking-wider text-bronze-dark mb-1">
              {selected === q.correct ? 'Bonne réponse, maître !' : 'Explication du maître horloger'}
            </strong>
            <p className="text-[13.5px] leading-relaxed text-ink">{q.explanation}</p>
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
        <p className="text-center text-xs font-label text-ink-soft flex items-center justify-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-bronze" /> Meilleur score : {best.toFixed(1)} / 6.0
        </p>
      )}
    </div>
  );
}
