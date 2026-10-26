'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  ZoomIn,
  Sparkles,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

type MonthMode = '28_fev' | '29_fev' | '30_avr' | '31_mai';

interface MonthConfig {
  id: MonthMode;
  label: string;
  monthTitle: string;
  lastDay: number;
  nextMonth: string;
  notchDepthMm: string;
  notchRadius: number;
  camAngle: number;
  leverAngle: number;
  teethPulled: number;
  leapYearState: string;
  explanation: string;
}

const MONTH_CONFIGS: Record<MonthMode, MonthConfig> = {
  '28_fev': {
    id: '28_fev',
    label: 'Février 28j (Année 1–3)',
    monthTitle: 'Février Non-Bissextile (28 Jours)',
    lastDay: 28,
    nextMonth: '1er Mars',
    notchDepthMm: '2.40 mm (Encoche Max.)',
    notchRadius: 58,
    camAngle: 0,
    leverAngle: -14,
    teethPulled: 4,
    leapYearState: 'Année Commune (1, 2 ou 3)',
    explanation:
      'Le bec palpeur du Grand Levier plonge au fond de l’encoche la plus profonde (2.40 mm) de la came de 48 mois. Son cliquet de tirage recule de 4 pas sur l’étoile de quantième à 31 dents : à minuit, il tire simultanément les dents 29, 30, 31 et 1 pour afficher directement le 1er Mars.'
  },
  '29_fev': {
    id: '29_fev',
    label: 'Février 29j (Bissextile)',
    monthTitle: 'Février Bissextile (29 Jours — Année 4)',
    lastDay: 29,
    nextMonth: '1er Mars',
    notchDepthMm: '1.60 mm (Encoche Bissextile)',
    notchRadius: 68,
    camAngle: 90,
    leverAngle: -9,
    teethPulled: 3,
    leapYearState: 'Année Bissextile (4e Année)',
    explanation:
      'Une seule fois tous les 4 ans (cycle de 1 461 jours), la came de 48 mois présente l’encoche intermédiaire de février (1.60 mm). Le Grand Levier descend moins bas, laisse passer le 29 février, puis tire 3 dents d’un coup (30, 31 et 1) à minuit.'
  },
  '30_avr': {
    id: '30_avr',
    label: 'Avril / Juin 30j',
    monthTitle: 'Mois Court de 30 Jours (Avril, Juin, Sept., Nov.)',
    lastDay: 30,
    nextMonth: '1er Mai',
    notchDepthMm: '0.80 mm (Encoche Courte)',
    notchRadius: 78,
    camAngle: 30,
    leverAngle: -4,
    teethPulled: 2,
    leapYearState: 'Tous les ans (4 mois / 12)',
    explanation:
      'Le bec palpeur repose dans une encoche de faible profondeur (0.80 mm). Le soir du 30, le cliquet auxiliaire du Grand Levier engage 2 dents sur le rochet de quantième afin de sauter par-dessus le 31 et d’afficher directement le 1er du mois suivant.'
  },
  '31_mai': {
    id: '31_mai',
    label: 'Mai / Juillet 31j',
    monthTitle: 'Mois Long de 31 Jours (7 mois sur 12)',
    lastDay: 31,
    nextMonth: '1er Juin',
    notchDepthMm: '0.00 mm (Sommet Plein)',
    notchRadius: 88,
    camAngle: 60,
    leverAngle: 2,
    teethPulled: 1,
    leapYearState: 'Tous les ans (7 mois / 12)',
    explanation:
      'Le bec palpeur du Grand Levier est maintenu en position haute sur le diamètre extérieur maximal de la came (0.00 mm). Le cliquet de rattrapage des mois courts reste hors de portée : seule la dent journalière fait avancer l’étoile de 31 vers 1.'
  }
};

export default function QuantiemePage() {
  const [selectedMode, setSelectedMode] = useState<MonthMode>('28_fev');
  const [hasJumpedToFirst, setHasJumpedToFirst] = useState<boolean>(false);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const cfg = MONTH_CONFIGS[selectedMode];
  const displayedDate = hasJumpedToFirst ? 1 : cfg.lastDay;

  const selectMonth = (m: MonthMode) => {
    setSelectedMode(m);
    setHasJumpedToFirst(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie/complications"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux Complications Horlogères</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Mémoire Mécanique sur 1 461 Jours • Came à 48 Crans</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Le Quantième &amp; <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Came de Calendrier Perpétuel
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Du quantième simple à étoile de 31 dents jusqu’au quantième perpétuel piloté par sa came programmée sur 48 mois, découvrez comment le Grand Levier palpe mécaniquement la longueur de chaque mois (28, 29, 30 ou 31 jours).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <StatCard number="48" label="Crans (Came 4 ans)" />
              <StatCard number="1 461" label="Jours de Cycle Bissextile" />
              <StatCard number="2100" label="Prochaine Correction Séculaire" />
              <StatCard number="21h–03h" label="Zone Interdite Correcteur" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Simulateur Cinématique Interactif • Grand Levier &amp; Came 48 Mois</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Palpage de la Came de 48 Mois &amp; Saut de Fin de Mois
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Sélectionnez un mois ci-dessous pour observer la chute du bec palpeur dans l’encoche correspondante de la came de 48 mois, puis déclenchez le saut de minuit vers le 1er du mois suivant.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setHasJumpedToFirst(!hasJumpedToFirst)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  hasJumpedToFirst
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                }`}
              >
                {hasJumpedToFirst ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>
                  {hasJumpedToFirst
                    ? `Revenir au ${cfg.lastDay} (23h59)`
                    : `Déclencher Saut Minuit (${cfg.lastDay} → 1)`}
                </span>
              </button>

              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  loupe10x
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="px-6 sm:px-8 pt-6 flex flex-wrap gap-2">
            {(Object.keys(MONTH_CONFIGS) as MonthMode[]).map((mKey) => {
              const item = MONTH_CONFIGS[mKey];
              const active = selectedMode === mKey;
              return (
                <button
                  key={mKey}
                  onClick={() => selectMonth(mKey)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>CAME DE 48 MOIS (GAUCHE) &amp; GRAND LEVIER</span>
                <span>ROCHET DE QUANTIÈME 31 DENTS (DROITE)</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#060a12]">
                <svg
                  viewBox="0 0 680 350"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                    transformOrigin: '230px 180px'
                  }}
                >
                  <g transform="translate(155, 185)">
                    <circle cx="0" cy="0" r="102" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="0" cy="0" r="88" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="78" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="0" cy="0" r="58" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />

                    <path
                      d={`M ${cfg.notchRadius} -12 L 90 -18 L 90 18 L ${cfg.notchRadius} 12 Z`}
                      fill="#060a12"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />

                    <circle cx="0" cy="0" r="32" fill="#090d16" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="-22" y1="0" x2="22" y2="0" stroke="#475569" strokeWidth="1.5" />
                    <line x1="0" y1="-22" x2="0" y2="22" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="7" fill="#f59e0b" />

                    <text x="0" y="-112" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      Came à 48 Crans (Cycle 4 Ans)
                    </text>
                    <text x="0" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      Rayon d’appui actif : {cfg.notchDepthMm}
                    </text>
                  </g>

                  <g>
                    <circle cx="335" cy="95" r="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
                    <text x="335" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                      Pivot Grand Levier
                    </text>

                    <path
                      d={`M ${155 + cfg.notchRadius} 185 L 335 95 L 485 ${
                        hasJumpedToFirst ? 175 : 195 + cfg.teethPulled * 10
                      }`}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx={155 + cfg.notchRadius}
                      cy="185"
                      r="7"
                      fill="#f43f5e"
                      stroke="#fecdd3"
                      strokeWidth="2"
                    />
                    <text
                      x={155 + cfg.notchRadius + 15}
                      y="212"
                      fill="#fb7185"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      Bec Palpeur Rubis
                    </text>
                  </g>

                  <g transform="translate(530, 185)">
                    <circle cx="0" cy="0" r="96" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="74" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i * 22.5 * Math.PI) / 180;
                      return (
                        <line
                          key={i}
                          x1={92 * Math.cos(a)}
                          y1={92 * Math.sin(a)}
                          x2={103 * Math.cos(a)}
                          y2={103 * Math.sin(a)}
                          stroke="#fbbf24"
                          strokeWidth="3"
                        />
                      );
                    })}

                    <rect x="-38" y="-28" width="76" height="56" rx="10" fill="#060a12" stroke="#10b981" strokeWidth="2.5" />
                    <text x="0" y="-8" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                      GUICHET DATE
                    </text>
                    <text x="0" y="18" textAnchor="middle" fill="#34d399" fontSize="26" fontWeight="bold" fontFamily="monospace">
                      {displayedDate}
                    </text>

                    <text x="0" y="-112" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      Étoile de Quantième (31 Dents)
                    </text>
                    <text x="0" y="124" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Course du cliquet : {cfg.teethPulled} dent(s) tirée(s)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <span>{cfg.leapYearState}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {cfg.monthTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {cfg.explanation}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">PROFONDEUR ENCOCHE CAME</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">{cfg.notchDepthMm}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">SAUT DE MINUIT</div>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {cfg.lastDay} → {cfg.nextMonth} ({cfg.teethPulled} dents)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1.5">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Règle d’Or d’Atelier : La « Zone de la Mort » (21h00 – 03h00)</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Entre 21h00 et 03h00 du matin, les cliquets du Grand Levier et le doigt entraîneur sont déjà engagés dans les dents de l’étoile de quantième. Actionner un correcteur rapide durant cette plage horaire cisaille net le bec du cliquet ou tord le ressort sautoir !
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Hiérarchie des Mécanismes de Quantième
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <TypeCard
              icon="1️⃣"
              title="Quantième Simple (31 dents)"
              description="Un doigt entraîneur solidaire d’une roue effectuant un tour en 24 heures pousse chaque nuit une dent de l’étoile à 31 dents maintenue par son sautoir. Nécessite 5 corrections manuelles par an (après les mois de moins de 31 jours)."
              complexity="Fondamentale"
              correction="5x / an"
            />
            <TypeCard
              icon="📆"
              title="Quantième Annuel (Inventé en 1996)"
              description="Distingue automatiquement les mois de 30 et 31 jours grâce à un mobile de 12 mois à bascule ou train planétaire. Ne nécessite qu’une seule correction manuelle par an : le 1er mars."
              complexity="Élevée"
              correction="1x / an (Fin Février)"
            />
            <TypeCard
              icon="♾️"
              title="Quantième Perpétuel (Came 48 Mois)"
              description="Gère automatiquement les mois de 28, 29, 30 et 31 jours grâce à sa came à 48 crans (ou roue de 12 mois couplée à un satellite bissextile 4:1). Aucune correction jusqu’au 1er mars 2100."
              complexity="Haute Horlogerie"
              correction="En 2100 (Séculaire)"
            />
            <TypeCard
              icon="🌌"
              title="Quantième Perpétuel Séculaire (400 Ans)"
              description="Intègre une roue séculaire supplémentaire effectuant 1 tour en 400 ans pour supprimer automatiquement l’année bissextile des années séculaires non divisibles par 400 (2100, 2200, 2300) tout en conservant 2400."
              complexity="Extrême"
              correction="Cycle de 400 ans"
            />
          </div>
        </section>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/30 text-center space-y-4 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Approfondir l’Histoire du Calendrier Perpétuel
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Consultez également notre dossier dédié au Calendrier Perpétuel ou retournez à l’index des complications.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/theorie/complications/calendrier-perpetuel"
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all"
            >
              Dossier Calendrier Perpétuel
            </Link>
            <Link
              href="/theorie/complications"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 hover:border-amber-500 transition-all"
            >
              Retour aux Complications
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-600 dark:text-amber-400 mb-0.5">
        {number}
      </div>
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  );
}

interface TypeCardProps {
  icon: string;
  title: string;
  description: string;
  complexity: string;
  correction: string;
}

function TypeCard({ icon, title, description, complexity, correction }: TypeCardProps) {
  return (
    <div className="bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-md">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1 space-y-2">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              Complexité : {complexity}
            </span>
            <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
              Correction : {correction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
