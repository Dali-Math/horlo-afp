'use client';

/**
 * HorloLearn — Onglet « Parcours guidé » : les 7 gestes sacramentels
 * de l'emboîteur, avec schémas à hotspots, fiche d'établi, astuce de maître,
 * piège d'examen et suivi de progression persistant.
 */

import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Hexagon, Lightbulb, Scale, AlertTriangle, Wrench, ZoomIn } from 'lucide-react';
import { STEPS_DATA, type StepData, type SchemaType } from '@/lib/emboitage/data';
import { SchemaWithHotspots } from '@/lib/emboitage/schemas';

interface ParcoursProps {
  activeStep: number;
  setActiveStep: (id: number) => void;
  validated: number[];
  toggleValidated: (id: number) => void;
  openLoupe: (step: StepData) => void;
}

export default function Parcours({ activeStep, setActiveStep, validated, toggleValidated, openLoupe }: ParcoursProps) {
  const current = STEPS_DATA.find((s) => s.id === activeStep) ?? STEPS_DATA[0];
  const idx = STEPS_DATA.findIndex((s) => s.id === current.id);
  const isDone = validated.includes(current.id);
  const progress = Math.round((validated.length / STEPS_DATA.length) * 100);

  const shortLabel = (t: string) => {
    const words = t.split(' ');
    return `${words[0]} ${words[1] ?? ''}`.replace(/[,&:]$/, '');
  };

  return (
    <div className="space-y-8 hl-fade">
      {/* En-tête du parcours */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block text-xs uppercase font-label font-bold tracking-widest text-bronze-dark bg-bronze/10 px-3 py-1 rounded-full border border-bronze/25">
          Méthodologie officielle d'établi
        </span>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mt-2">
          Les 7 gestes sacramentels de l'emboîteur
        </h2>
        <p className="text-ink-soft text-sm mt-1.5">
          Déroulez chaque étape dans l'ordre. Chaque schéma est documenté par des pastilles cliquables et
          peut être examiné à la loupe d'atelier 10x.
        </p>
      </div>

      {/* Stepper */}
      <div>
        <div className="flex overflow-x-auto pb-2 gap-2" style={{ scrollbarWidth: 'thin' }}>
          {STEPS_DATA.map((st) => {
            const done = validated.includes(st.id);
            const active = st.id === activeStep;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id)}
                className={`px-4 py-2.5 rounded-xl font-label text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border ${
                  active
                    ? 'bg-bronze text-white border-bronze shadow-md'
                    : done
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-cream-card text-ink-soft border-cream-border hover:bg-cream-track hover:text-ink'
                }`}
              >
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3 opacity-40" />}
                0{st.id}. {shortLabel(st.title)}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-cream-track border border-cream-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-bronze-light via-bronze to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-label text-xs text-ink-soft whitespace-nowrap">
            {validated.length}/{STEPS_DATA.length} gestes maîtrisés · {progress}%
          </span>
        </div>
      </div>

      {/* Carte de l'étape active */}
      <div className="bg-cream-card rounded-3xl border border-cream-border p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Colonne texte */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-bronze/10 border border-bronze/30 text-bronze-dark flex items-center justify-center font-label font-bold text-base">
                0{current.id}
              </span>
              <div>
                <span className="block text-xs font-label uppercase tracking-wider text-bronze-dark">
                  {current.badge} · {current.standard}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-ink leading-snug">{current.title}</h3>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-ink-soft">{current.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-cream-tile border border-cream-border">
                <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft mb-2">
                  <Wrench className="w-3.5 h-3.5 text-bronze" /> OUTILLAGE RECOMMANDÉ
                </span>
                <ul className="space-y-1 list-disc list-inside text-[13px] text-ink">
                  {current.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-cream-tile border border-cream-border">
                <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft mb-2">
                  <Scale className="w-3.5 h-3.5 text-bronze" /> COUPLE &amp; NORME
                </span>
                <div className="text-bronze-dark font-label font-bold text-sm">{current.torques}</div>
                <div className="text-[12px] text-ink-soft mt-1.5 flex items-center gap-1.5">
                  <Hexagon className="w-3 h-3 text-sky-700" />
                  Norme : <strong>{current.standard}</strong>
                </div>
              </div>
            </div>

            {/* Astuce de maître */}
            <div className="rounded-2xl border-l-4 border-bronze bg-bronze/[0.06] p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
              <div>
                <strong className="block font-label text-xs uppercase tracking-wider text-bronze-dark mb-1">
                  Astuce du maître horloger
                </strong>
                <p className="text-[13.5px] leading-relaxed text-ink">{current.masterTip}</p>
              </div>
            </div>

            {/* Piège d'examen */}
            <div className="rounded-2xl border-l-4 border-red-600 bg-red-50 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-label text-xs uppercase tracking-wider text-red-700 mb-1">
                  Piège d'examen — zéro éliminatoire
                </strong>
                <p className="text-[13.5px] leading-relaxed text-red-900">{current.trapAlert}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => toggleValidated(current.id)}
                className={`px-4 py-2.5 rounded-xl font-label text-xs font-bold transition flex items-center gap-2 border shadow-sm ${
                  isDone
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                    : 'bg-cream-card hover:bg-emerald-50 text-emerald-700 border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isDone ? 'Geste maîtrisé ✓ (retirer)' : 'Marquer ce geste comme maîtrisé'}
              </button>
              <button
                onClick={() => openLoupe(current)}
                className="px-4 py-2.5 rounded-xl font-label text-xs font-bold bg-bronze hover:bg-bronze-dark text-white transition flex items-center gap-2 shadow-sm"
              >
                <ZoomIn className="w-4 h-4" /> Loupe 10x
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setActiveStep(STEPS_DATA[Math.max(0, idx - 1)].id)}
                  disabled={idx === 0}
                  className="w-10 h-10 rounded-xl bg-cream-tile border border-cream-border text-ink-soft hover:text-ink hover:bg-cream-track flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Étape précédente"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveStep(STEPS_DATA[Math.min(STEPS_DATA.length - 1, idx + 1)].id)}
                  disabled={idx === STEPS_DATA.length - 1}
                  className="w-10 h-10 rounded-xl bg-cream-tile border border-cream-border text-ink-soft hover:text-ink hover:bg-cream-track flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Étape suivante"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Colonne schéma interactif */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-cream-tile border border-cream-border p-3.5 lg:sticky lg:top-32">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-cream-border">
                <span className="font-label text-[11px] font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5">
                  <Hexagon className="w-3.5 h-3.5 text-bronze" />
                  Schéma technique 0{current.id}
                </span>
                <span className="font-label text-[10px] text-bronze-dark font-bold">{current.standard}</span>
              </div>
              <SchemaWithHotspots type={current.schemaType as SchemaType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
