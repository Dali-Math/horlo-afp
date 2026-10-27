'use client';

/**
 * HorloLearn — Onglet « Simulateurs d'établi » : trois ateliers virtuels
 * (coupe de tige, chasse à la poussière, gardes NIHS) accessibles par sous-onglets.
 */

import { useState } from 'react';
import { Droplet, Ruler, Sun } from 'lucide-react';
import SimTige from './SimTige';
import SimPoussiere from './SimPoussiere';
import SimGardes from './SimGardes';
import type { StepData } from '@/lib/emboitage/data';

type SimTab = 'tige' | 'poussiere' | 'gardes';

const TABS: { id: SimTab; label: string; icon: React.ReactNode }[] = [
  { id: 'tige', label: 'Coupe de tige', icon: <Ruler className="w-3.5 h-3.5" /> },
  { id: 'poussiere', label: 'Chasse poussière', icon: <Sun className="w-3.5 h-3.5" /> },
  { id: 'gardes', label: 'Gardes NIHS', icon: <Droplet className="w-3.5 h-3.5" /> },
];

export default function Simulateurs({ openLoupe }: { openLoupe: (step: StepData) => void }) {
  const [tab, setTab] = useState<SimTab>('tige');

  return (
    <div className="space-y-6 hl-fade">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-cream-track p-1.5 rounded-2xl border border-cream-border overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl font-label text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                tab === t.id ? 'bg-bronze text-white shadow-sm' : 'text-ink-soft hover:text-bronze-dark hover:bg-cream-card'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <span className="font-label text-[11px] text-ink-soft hidden sm:block">
          Trois bancs d'essai virtuels · objectifs d'examen AFP / CFC
        </span>
      </div>

      {tab === 'tige' && <SimTige />}
      {tab === 'poussiere' && <SimPoussiere />}
      {tab === 'gardes' && <SimGardes openLoupe={openLoupe} />}
    </div>
  );
}
