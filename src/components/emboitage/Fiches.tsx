'use client';

/**
 * HorloLearn — Onglet « Fiches mémo » : flashcards réversibles des normes
 * (clic pour retourner) + lexique des produits officiels d'établi suisse.
 */

import { useState } from 'react';
import { FlaskConical, RefreshCw } from 'lucide-react';
import { BENCH_PRODUCTS, FLASHCARDS } from '@/lib/emboitage/data';

const TONE_BADGE: Record<string, string> = {
  violet: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  sky: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
};

export default function Fiches() {
  const [flipped, setFlipped] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    setFlipped((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const resetAll = () => setFlipped([]);

  return (
    <div className="space-y-10 hl-fade">
      {/* Flashcards */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <span className="inline-block text-xs uppercase font-label font-bold tracking-widest text-bronze-dark dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-3 py-1 rounded-full border border-bronze/25 dark:border-amber-400/25">
              Mémo de poche
            </span>
            <h2 className="font-display text-2xl text-ink dark:text-slate-100 mt-2">Les cotes qui font la note</h2>
            <p className="text-sm text-ink-soft dark:text-slate-400 mt-1">
              Cliquez sur une carte pour révéler la norme ou la règle d'atelier correspondante.
            </p>
          </div>
          <button
            onClick={resetAll}
            className="px-3.5 py-2 rounded-xl border border-cream-border dark:border-slate-800 bg-cream-card dark:bg-slate-900 hover:bg-cream-track dark:hover:bg-slate-800 text-xs font-label font-semibold text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white transition flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Tout replier ({flipped.length}/{FLASHCARDS.length} retournées)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FLASHCARDS.map((card) => {
            const isFlipped = flipped.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="hl-flip text-left focus:outline-none focus:ring-2 focus:ring-bronze/50 rounded-2xl"
                aria-label={`Fiche mémo : ${card.front} — cliquer pour retourner`}
              >
                <div className={`hl-flip-inner relative w-full h-44 ${isFlipped ? 'hl-flipped' : ''}`}>
                  {/* Recto */}
                  <div className="hl-face absolute inset-0 rounded-2xl bg-cream-card dark:bg-slate-900 border border-cream-border dark:border-slate-800 shadow-sm p-4 flex flex-col justify-between hover:border-bronze/50 dark:hover:border-amber-500/50 transition-colors">
                    <span className="px-2 py-0.5 rounded bg-bronze/10 dark:bg-amber-400/10 text-bronze-dark dark:text-amber-400 border border-bronze/25 dark:border-amber-400/25 text-[10px] font-label font-bold uppercase w-fit">
                      {card.tag}
                    </span>
                    <div className="font-display text-[16px] leading-snug text-ink dark:text-slate-100">{card.front}</div>
                    <span className="font-label text-[10px] text-ink-soft dark:text-slate-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-bronze dark:text-amber-400" /> Cliquer pour révéler la norme
                    </span>
                  </div>
                  {/* Verso */}
                  <div className="hl-face hl-back absolute inset-0 rounded-2xl bg-[#221B10] dark:bg-slate-950 border border-bronze/40 dark:border-amber-600/40 shadow-md p-4 flex flex-col justify-center">
                    <span className="font-label text-[10px] uppercase tracking-widest text-bronze-light dark:text-amber-300 font-bold mb-2">
                      {card.tag}
                    </span>
                    <p className="text-[13px] leading-relaxed text-cream dark:text-slate-200">{card.back}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lexique produits */}
      <div>
        <div className="mb-5">
          <span className="inline-block text-xs uppercase font-label font-bold tracking-widest text-bronze-dark dark:text-amber-400 bg-bronze/10 dark:bg-amber-400/10 px-3 py-1 rounded-full border border-bronze/25 dark:border-amber-400/25">
            Produits officiels d'établi
          </span>
          <h2 className="font-display text-2xl text-ink dark:text-slate-100 mt-2">Le kit d'hygiène &amp; chimie de l'emboîteur</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENCH_PRODUCTS.map((p) => (
            <div key={p.code} className="p-5 rounded-2xl bg-cream-card dark:bg-slate-900 border border-cream-border dark:border-slate-800 space-y-2 hover:shadow-md transition-shadow">
              <span className={`px-2 py-0.5 rounded border font-label font-bold text-xs w-fit ${TONE_BADGE[p.tone]}`}>{p.code}</span>
              <h4 className="font-bold text-ink dark:text-slate-100 text-sm">{p.name}</h4>
              <p className="text-[11px] font-label text-bronze-dark dark:text-amber-400 uppercase tracking-wider">{p.role}</p>
              <p className="text-xs text-ink-soft dark:text-slate-300 leading-relaxed flex gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 shrink-0 mt-0.5 text-bronze dark:text-amber-400" />
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
