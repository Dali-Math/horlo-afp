'use client';

/**
 * HorloLearn — Onglet « Parcours guidé » : les 13 gestes fondamentaux
 * d'emboîtage & aiguillage d'atelier (calibres ETA / automatiques suisses),
 * avec schémas à points chauds, fiche d'établi, astuce de maître,
 * piège éliminatoire et loupe 10x haute précision.
 */

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Hexagon,
  Lightbulb,
  Scale,
  AlertTriangle,
  Wrench,
  ZoomIn,
} from 'lucide-react';
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
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3'>('all');
  const current = STEPS_DATA.find((s) => s.id === activeStep) ?? STEPS_DATA[0];
  const idx = STEPS_DATA.findIndex((s) => s.id === current.id);
  const isDone = validated.includes(current.id);
  const progress = Math.round((validated.length / STEPS_DATA.length) * 100);

  const shortLabel = (t: string) => {
    const words = t.split(' ');
    return `${words[0]} ${words[1] ?? ''}`.replace(/[,&:]$/, '');
  };

  const filteredSteps = STEPS_DATA.filter((st) => {
    if (phaseFilter === 'phase1') return st.id <= 2;
    if (phaseFilter === 'phase2') return st.id >= 3 && st.id <= 9;
    if (phaseFilter === 'phase3') return st.id >= 10;
    return true;
  });

  return (
    <div className="space-y-8 hl-fade">
      {/* En-tête du parcours */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block text-xs uppercase font-label font-bold tracking-widest text-bronze-dark dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-3 py-1 rounded-full border border-bronze/25 dark:border-amber-400/25">
          Méthodologie Officielle d'Atelier Suisse
        </span>
        <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-slate-100 mt-2">
          Les 13 gestes fondamentaux d'emboîtage &amp; aiguillage
        </h2>
        <p className="text-ink-soft dark:text-slate-400 text-sm mt-1.5">
          Du kit d'outillage initial au contrôle de fermeture à la potence. Chaque schéma est doté de points chauds cliquables et d'un zoom 10x haute définition.
        </p>
      </div>

      {/* Sélecteur de phase & Stepper */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-border dark:border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setPhaseFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-label font-bold transition ${
                phaseFilter === 'all'
                  ? 'bg-bronze text-white shadow-sm'
                  : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white bg-cream-card dark:bg-slate-800'
              }`}
            >
              Tous les gestes (13)
            </button>
            <button
              onClick={() => setPhaseFilter('phase1')}
              className={`px-3 py-1 rounded-lg text-xs font-label font-bold transition ${
                phaseFilter === 'phase1'
                  ? 'bg-bronze text-white shadow-sm'
                  : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white bg-cream-card dark:bg-slate-800'
              }`}
            >
              1. Préparation (1-2)
            </button>
            <button
              onClick={() => setPhaseFilter('phase2')}
              className={`px-3 py-1 rounded-lg text-xs font-label font-bold transition ${
                phaseFilter === 'phase2'
                  ? 'bg-bronze text-white shadow-sm'
                  : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white bg-cream-card dark:bg-slate-800'
              }`}
            >
              2. Cadrage &amp; Aiguillage (3-9)
            </button>
            <button
              onClick={() => setPhaseFilter('phase3')}
              className={`px-3 py-1 rounded-lg text-xs font-label font-bold transition ${
                phaseFilter === 'phase3'
                  ? 'bg-bronze text-white shadow-sm'
                  : 'text-ink-soft dark:text-slate-400 hover:text-ink dark:hover:text-white bg-cream-card dark:bg-slate-800'
              }`}
            >
              3. Emboîtage (10-13)
            </button>
          </div>

          <span className="font-label text-xs text-ink-soft dark:text-slate-400 whitespace-nowrap ml-auto">
            {validated.length}/{STEPS_DATA.length} validés · {progress}%
          </span>
        </div>

        {/* Stepper horizontal scrollable */}
        <div className="flex overflow-x-auto pb-2 gap-2" style={{ scrollbarWidth: 'thin' }}>
          {filteredSteps.map((st) => {
            const done = validated.includes(st.id);
            const active = st.id === activeStep;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id)}
                className={`px-3.5 py-2 rounded-xl font-label text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border ${
                  active
                    ? 'bg-bronze text-white border-bronze shadow-md'
                    : done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                      : 'bg-cream-card dark:bg-slate-900 text-ink-soft dark:text-slate-300 border-cream-border dark:border-slate-800 hover:bg-cream-track dark:hover:bg-slate-800 hover:text-ink'
                }`}
              >
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3 opacity-40" />}
                {st.id < 10 ? `0${st.id}` : st.id}. {shortLabel(st.title)}
              </button>
            );
          })}
        </div>

        {/* Barre de progression globale */}
        <div className="h-2 rounded-full bg-cream-track dark:bg-slate-800 border border-cream-border dark:border-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-bronze-light via-bronze to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Carte de l'étape active */}
      <div className="bg-cream-card dark:bg-slate-900 rounded-3xl border border-cream-border dark:border-slate-800 p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Colonne texte */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-bronze/10 dark:bg-amber-400/10 border border-bronze/30 dark:border-amber-400/30 text-bronze-dark dark:text-amber-400 flex items-center justify-center font-label font-bold text-lg">
                {current.id < 10 ? `0${current.id}` : current.id}
              </span>
              <div>
                <span className="block text-xs font-label uppercase tracking-wider text-bronze-dark dark:text-amber-400 font-bold">
                  {current.phase} · {current.badge}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-ink dark:text-slate-100 leading-snug">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-[14.5px] leading-relaxed text-ink-soft dark:text-slate-300">
              {current.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700">
                <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft dark:text-slate-400 mb-2">
                  <Wrench className="w-3.5 h-3.5 text-bronze dark:text-amber-400" /> OUTILLAGE RECOMMANDÉ
                </span>
                <ul className="space-y-1 list-disc list-inside text-[13px] text-ink dark:text-slate-200">
                  {current.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700">
                <span className="flex items-center gap-1.5 text-xs font-label font-bold text-ink-soft dark:text-slate-400 mb-2">
                  <Scale className="w-3.5 h-3.5 text-bronze dark:text-amber-400" /> COUPLE &amp; NORME
                </span>
                <div className="text-bronze-dark dark:text-amber-400 font-label font-bold text-sm">
                  {current.torques}
                </div>
                <div className="text-[12px] text-ink-soft dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <Hexagon className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  Norme : <strong>{current.standard}</strong>
                </div>
              </div>
            </div>

            {/* Astuce de maître */}
            <div className="rounded-2xl border-l-4 border-bronze dark:border-amber-500 bg-bronze/[0.06] dark:bg-amber-500/[0.08] p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-bronze dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-label text-xs uppercase tracking-wider text-bronze-dark dark:text-amber-400 mb-1">
                  Astuce du maître horloger
                </strong>
                <p className="text-[13.5px] leading-relaxed text-ink dark:text-slate-200">
                  {current.masterTip}
                </p>
              </div>
            </div>

            {/* Piège d'examen */}
            <div className="rounded-2xl border-l-4 border-red-600 bg-red-50 dark:bg-red-950/30 p-4 flex items-start gap-3 border border-red-100 dark:border-red-900/40">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-label text-xs uppercase tracking-wider text-red-700 dark:text-red-400 mb-1">
                  Piège d'examen — zéro éliminatoire
                </strong>
                <p className="text-[13.5px] leading-relaxed text-red-900 dark:text-red-200">
                  {current.trapAlert}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => toggleValidated(current.id)}
                className={`px-4 py-2.5 rounded-xl font-label text-xs font-bold transition flex items-center gap-2 border shadow-sm ${
                  isDone
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                    : 'bg-cream-card dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isDone ? 'Geste maîtrisé ✓ (retirer)' : 'Marquer ce geste comme maîtrisé'}
              </button>
              <button
                onClick={() => openLoupe(current)}
                className="px-4 py-2.5 rounded-xl font-label text-xs font-bold bg-bronze hover:bg-bronze-dark text-white transition flex items-center gap-2 shadow-sm"
              >
                <ZoomIn className="w-4 h-4" /> Loupe d'inspection 10x
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setActiveStep(STEPS_DATA[Math.max(0, idx - 1)].id)}
                  disabled={idx === 0}
                  className="w-10 h-10 rounded-xl bg-cream-tile dark:bg-slate-800 border border-cream-border dark:border-slate-700 text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-cream-track dark:hover:bg-slate-700 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Étape précédente"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveStep(STEPS_DATA[Math.min(STEPS_DATA.length - 1, idx + 1)].id)}
                  disabled={idx === STEPS_DATA.length - 1}
                  className="w-10 h-10 rounded-xl bg-cream-tile dark:bg-slate-800 border border-cream-border dark:border-slate-700 text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-cream-track dark:hover:bg-slate-700 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Étape suivante"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Colonne schéma interactif */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-cream-tile dark:bg-slate-800/60 border border-cream-border dark:border-slate-700 p-3.5 lg:sticky lg:top-32 shadow-sm">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-cream-border dark:border-slate-700">
                <span className="font-label text-[11px] font-bold text-ink-soft dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Hexagon className="w-3.5 h-3.5 text-bronze dark:text-amber-400" />
                  Schéma d'établi {current.id < 10 ? `0${current.id}` : current.id}
                </span>
                <span className="font-label text-[10px] text-bronze-dark dark:text-amber-400 font-bold">
                  {current.standard}
                </span>
              </div>
              <SchemaWithHotspots type={current.schemaType as SchemaType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
