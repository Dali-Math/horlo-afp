'use client';

/**
 * HorloLearn — Simulateur 02 : Chasse chirurgicale à la poussière
 * La lumière zénithale masque les impuretés (réflexion spéculaire) ;
 * le faisceau rasant à 45° les révèle par leur ombre portée.
 */

import { useState } from 'react';
import { Lightbulb, RotateCcw, Sparkles, Sun } from 'lucide-react';

type LightMode = 'zenithal' | 'grazing';
type Tool = 'blower' | 'rodico';

interface Particle {
  id: number;
  label: string;
  render: React.ReactNode;
}

const PARTICLES: Particle[] = [
  {
    id: 1,
    label: 'Micro-fibre',
    render: (
      <>
        <path d="M125,75 Q130,85 120,95 Q115,100 128,105" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="125" cy="90" r="14" fill="#B45309" fillOpacity="0.18" />
      </>
    ),
  },
  {
    id: 2,
    label: 'Grain de poussière',
    render: (
      <>
        <circle cx="265" cy="225" r="3.5" fill="#CA8A04" />
        <circle cx="265" cy="225" r="12" fill="#CA8A04" fillOpacity="0.18" />
      </>
    ),
  },
  {
    id: 3,
    label: 'Cheveu de projection',
    render: (
      <>
        <ellipse cx="250" cy="165" rx="9" ry="5" fill="#0369A1" />
        <circle cx="250" cy="165" r="14" fill="#0369A1" fillOpacity="0.18" />
      </>
    ),
  },
  {
    id: 4,
    label: 'Éclat de laque',
    render: (
      <>
        <polygon points="100,240 106,242 102,248" fill="#BE123C" />
        <circle cx="103" cy="244" r="12" fill="#BE123C" fillOpacity="0.18" />
      </>
    ),
  },
  {
    id: 5,
    label: 'Fibre textile',
    render: (
      <>
        <path d="M172,170 Q165,160 178,155" fill="none" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="172" cy="162" r="12" fill="#B45309" fillOpacity="0.18" />
      </>
    ),
  },
];

export default function SimPoussiere() {
  const [light, setLight] = useState<LightMode>('zenithal');
  const [tool, setTool] = useState<Tool>('blower');
  const [cleaned, setCleaned] = useState<number[]>([]);
  const [hint, setHint] = useState<string | null>(null);

  const toggleClean = (id: number, label: string) => {
    if (light !== 'grazing') {
      setHint(`Lumière zénithale : la ${label.toLowerCase()} est invisible ! Basculez sur le faisceau rasant 45° pour la repérer précisément.`);
      window.setTimeout(() => setHint(null), 3200);
      return;
    }
    setCleaned((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const reset = () => setCleaned([]);
  const done = cleaned.length === PARTICLES.length;

  return (
    <div className="bg-cream-card rounded-3xl border border-cream-border p-5 sm:p-8 shadow-sm space-y-8 hl-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cream-border gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-md bg-bronze/10 text-bronze-dark border border-bronze/25 text-xs font-label font-bold">
            SIMULATEUR INTERACTIF 02 · ÉTAPE 03
          </span>
          <h2 className="font-display text-2xl text-ink mt-1.5">Chasse à la poussière en lumière rasante 45°</h2>
          <p className="text-sm text-ink-soft mt-1 max-w-2xl">
            En lumière zénithale, le cadran paraît propre. Basculez sur le faisceau rasant : chaque particule
            projette alors une ombre portée nette. Éliminez les 5 impuretés avec le bon outil.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-cream-track p-1.5 rounded-2xl border border-cream-border shrink-0">
          <button
            onClick={() => setLight('zenithal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-label font-semibold transition flex items-center gap-1.5 ${
              light === 'zenithal' ? 'bg-cream-card text-ink shadow-sm border border-cream-border' : 'text-ink-soft hover:text-bronze-dark'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Zénithale (90°)
          </button>
          <button
            onClick={() => setLight('grazing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-label font-semibold transition flex items-center gap-1.5 ${
              light === 'grazing' ? 'bg-bronze text-white shadow-sm' : 'text-ink-soft hover:text-bronze-dark'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" /> Rasante (45°)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cadran sous inspection */}
        <div className="lg:col-span-7">
          <div
            className={`rounded-3xl border p-6 flex flex-col items-center justify-center transition-colors duration-500 ${
              light === 'grazing' ? 'bg-[#2A2416] border-bronze/60 shadow-[0_0_40px_-12px_rgba(156,122,67,0.55)]' : 'bg-cream-tile border-cream-border'
            }`}
          >
            <div
              className={`self-start text-xs font-label px-2.5 py-1 rounded-md border mb-3 ${
                light === 'grazing'
                  ? 'bg-bronze text-white font-bold shadow-lg border-bronze-light'
                  : 'bg-cream-card text-ink-soft border-cream-border'
              }`}
            >
              {light === 'grazing' ? 'ÉCLAIRAGE : RASANT 45° (révélation particules)' : 'ÉCLAIRAGE : ZÉNITHAL 90° (réflexion directe)'}
            </div>

            <svg viewBox="0 0 360 360" className="w-full max-w-[340px] h-auto my-2" xmlns="http://www.w3.org/2000/svg">
              <circle cx="180" cy="180" r="170" fill="#D7D0C4" stroke="#B9AC93" strokeWidth="2" />
              <circle cx="180" cy="180" r="150" fill="#F7F3EA" stroke="#9C7A43" strokeWidth="1.5" />

              {/* Réhaut + indices */}
              <rect x="175" y="42" width="4" height="18" rx="1" fill="#B45309" />
              <rect x="181" y="42" width="4" height="18" rx="1" fill="#B45309" />
              <rect x="268" y="172" width="22" height="16" rx="2" fill="#FFFFFF" stroke="#94a3b8" strokeWidth="1" />
              <text x="279" y="184" fill="#334155" fontSize="9" fontFamily="var(--font-jbmono), monospace" textAnchor="middle" fontWeight="bold">25</text>
              <rect x="178" y="300" width="4" height="18" rx="1" fill="#B45309" />
              <rect x="42" y="178" width="18" height="4" rx="1" fill="#B45309" />
              <circle cx="180" cy="180" r="135" fill="none" stroke="#B9AC93" strokeWidth="0.8" strokeDasharray="2,6" />

              {/* Aiguilles */}
              <line x1="180" y1="180" x2="115" y2="115" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
              <line x1="180" y1="180" x2="250" y2="110" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="180" y1="180" x2="180" y2="280" stroke="#0369A1" strokeWidth="1.5" />
              <circle cx="180" cy="180" r="5" fill="#7C5F33" />

              {/* Particules cliquables */}
              {PARTICLES.map((p) =>
                cleaned.includes(p.id) ? null : (
                  <g
                    key={p.id}
                    onClick={() => toggleClean(p.id, p.label)}
                    className="cursor-pointer transition-opacity duration-500"
                    opacity={light === 'grazing' ? 1 : 0.06}
                    role="button"
                    aria-label={`Éliminer : ${p.label}`}
                  >
                    {p.render}
                  </g>
                )
              )}
            </svg>

            <p className={`text-xs font-label text-center mt-2 ${light === 'grazing' ? 'text-amber-200' : 'text-ink-soft'}`}>
              {light === 'grazing'
                ? 'Lumière rasante active ! Cliquez sur chaque impureté pour l\'éliminer.'
                : 'Le cadran paraît propre… mais tout est masqué par la réflexion directe.'}
            </p>

            {hint && (
              <div className="mt-3 w-full max-w-[340px] p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs hl-fade">
                {hint}
              </div>
            )}
          </div>
        </div>

        {/* Outils & jauge de pureté */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-cream-tile border border-cream-border text-center space-y-3">
            <span className="text-xs font-label text-ink-soft uppercase tracking-wider block">Pureté optique du cadran</span>
            <div className={`text-4xl font-label font-bold ${done ? 'text-emerald-600' : 'text-bronze-dark'}`}>
              {cleaned.length} / 5
            </div>
            <div className="w-full bg-cream-track h-3 rounded-full overflow-hidden border border-cream-border">
              <div
                className="bg-gradient-to-r from-bronze-light to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${cleaned.length * 20}%` }}
              />
            </div>
            <p className="text-xs font-label text-ink-soft flex items-center justify-center gap-1.5">
              {done ? (
                <>
                  <Sparkles className="w-4 h-4 text-bronze" />
                  PURETÉ ABSOLUE 100 % — ZÉRO DÉFAUT GLACE
                </>
              ) : (
                `${PARTICLES.length - cleaned.length} particule(s) restante(s) sur le cadran.`
              )}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-label font-bold text-ink-soft uppercase tracking-wider block">Outil d'établi sélectionné</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTool('blower')}
                className={`p-3 rounded-xl font-label text-xs font-bold border transition ${
                  tool === 'blower'
                    ? 'bg-bronze text-white border-bronze shadow-sm'
                    : 'bg-cream-tile text-ink-soft border-cream-border hover:bg-cream-track'
                }`}
              >
                Poire soufflet filtrée
                <span className="block text-[10px] font-normal mt-0.5 opacity-80">Bergeon 4657 · HEPA</span>
              </button>
              <button
                onClick={() => setTool('rodico')}
                className={`p-3 rounded-xl font-label text-xs font-bold border transition ${
                  tool === 'rodico'
                    ? 'bg-bronze text-white border-bronze shadow-sm'
                    : 'bg-cream-tile text-ink-soft border-cream-border hover:bg-cream-track'
                }`}
              >
                Pâte Rodico fraîche
                <span className="block text-[10px] font-normal mt-0.5 opacity-80">Tamponnement doux</span>
              </button>
            </div>
            <p className="text-[12px] text-ink-soft leading-relaxed">
              {tool === 'blower'
                ? "La poire filtrée décolle les particules libres sans contact — jamais de bombe d'air comprimé industrielle (micro-gouttelettes d'huile)."
                : "Le Rodico frais attrape la fibre par adhérence, en tamponnement perpendiculaire doux — jamais de frottement latéral."}
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full py-2.5 rounded-xl border border-cream-border bg-cream-card hover:bg-cream-track text-xs font-label font-semibold text-ink-soft hover:text-ink transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser l'inspection
          </button>

          <div className="rounded-2xl border-l-4 border-bronze bg-bronze/[0.06] p-4">
            <strong className="block font-label text-xs uppercase tracking-wider text-bronze-dark mb-1">Pourquoi ça marche</strong>
            <p className="text-[13px] leading-relaxed text-ink">
              En faisceau rasant sur fond sombre, chaque micro-fibre diffuse la lumière et projette une ombre
              portée nette : elle devient visible comme une étoile dans la nuit. C'est le protocole suisse de
              salle blanche horlogère.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
