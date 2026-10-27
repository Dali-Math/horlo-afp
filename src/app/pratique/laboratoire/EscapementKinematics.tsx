'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Droplet,
  Compass,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface PhaseInfo {
  id: number;
  name: string;
  range: [number, number];
  badge: string;
  mechanism: string;
  watchmakerCheck: string;
}

const PHASES: PhaseInfo[] = [
  {
    id: 1,
    name: 'PHASE 1 : REPOS & TIRAGE (ANGLE ~12°)',
    range: [0, 20],
    badge: '0% – 20% · Arc libre',
    mechanism:
      'La dent de la roue d’échappement repose sur le plan de repos de la palette d’entrée. Grâce à l’angle de tirage (~12°), la force motrice plaque fermement l’ancre contre la goupille de limitation pendant que le balancier parcourt son arc libre.',
    watchmakerCheck:
      'Contrôler l’ébat de dard et l’ébat de corne. Sans tirage suffisant, un choc externe ferait basculer l’ancre prématurément (renversement).',
  },
  {
    id: 2,
    name: 'PHASE 2 : DÉGAGEMENT (ENTRÉE DE L’ELLIPSE)',
    range: [20, 40],
    badge: '20% – 40% · Recul mécanique',
    mechanism:
      'Le balancier revient vers la ligne des centres : la cheville de plateau (ellipse en rubis) pénètre dans l’encoche de la fourchette. Le balancier cède une infime énergie pour vaincre le tirage et faire glisser la palette hors du repos, provoquant un léger recul de la roue.',
    watchmakerCheck:
      'Le dégagement doit être net et sans frottement gras. L’échancrure du petit plateau laisse passer la pointe du dard.',
  },
  {
    id: 3,
    name: 'PHASE 3 : IMPULSION (LUBRIFICATION MOEBIUS 9415)',
    range: [40, 75],
    badge: '40% – 75% · Transfert d’énergie',
    mechanism:
      'Le bec de dent quitte l’angle de repos et glisse avec force sur le plan d’impulsion de la palette. La roue d’échappement pousse la palette et la fourchette relance l’ellipse du balancier pour compenser les pertes d’amortissement.',
    watchmakerCheck:
      'C’est sur ce plan d’impulsion que la graisse thixotrope Moebius 9415 se liquéfie instantanément sous le cisaillement du choc.',
  },
  {
    id: 4,
    name: 'PHASE 4 : CHUTE & CHOC ACOUSTIQUE (LE « TIC-TAC »)',
    range: [75, 88],
    badge: '75% – 88% · Émission sonore Witschi',
    mechanism:
      'La dent quitte le talon de la palette d’entrée. La roue d’échappement tourne librement sur un angle infime (la chute) jusqu’à ce qu’une dent vienne frapper le plan de repos de la palette de sortie. Ce choc produit le son capté par le micro du vibrographe.',
    watchmakerCheck:
      'Une chute trop faible risque le coincement ; une chute excessive (chemin perdu démesuré) gaspille le couple moteur et ampute l’amplitude.',
  },
  {
    id: 5,
    name: 'PHASE 5 : ARC SUPPLÉMENTAIRE & SÉCURITÉS',
    range: [88, 100],
    badge: '88% – 100% · Verrouillage',
    mechanism:
      'L’ancre touche la goupille de limitation opposée et le tirage reprend. L’ellipse sort librement de la fourchette et le balancier poursuit son oscillation jusqu’à son amplitude maximale (280°–310°) avant le retour.',
    watchmakerCheck:
      'Si l’arc supplémentaire dépasse 330°, l’ellipse fait un tour complet et percute l’extérieur de la corne d’ancre : c’est le rebattement critique.',
  },
];

export default function EscapementKinematics() {
  const [progress, setProgress] = useState<number>(10);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showOil, setShowOil] = useState<boolean>(true);
  const animRef = useRef<number | null>(null);

  // Boucle de lecture animée
  useEffect(() => {
    if (isPlaying) {
      const loop = () => {
        setProgress((prev) => (prev + 0.3) % 100);
        animRef.current = requestAnimationFrame(loop);
      };
      animRef.current = requestAnimationFrame(loop);
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Interpolation géométrique des angles selon la phase active
  // 1. Balancier / Double plateau (-42° à +42°)
  const rollerAngle = -42 + (progress / 100) * 84;

  // 2. Ancre (-7.5° appuyée à gauche, bascule entre 22% et 82%, +7.5° appuyée à droite)
  let forkAngle = -7.5;
  if (progress >= 22 && progress <= 82) {
    const t = (progress - 22) / 60;
    forkAngle = -7.5 + t * 15.0;
  } else if (progress > 82) {
    forkAngle = 7.5;
  }

  // 3. Roue d'échappement (recul 20–38%, impulsion 40–75%, chute libre 75–86%)
  let wheelAngle = 0;
  if (progress >= 20 && progress < 40) {
    wheelAngle = -((progress - 20) / 20) * 1.4;
  } else if (progress >= 40 && progress < 75) {
    wheelAngle = -1.4 + ((progress - 40) / 35) * 9.5;
  } else if (progress >= 75 && progress < 86) {
    wheelAngle = 8.1 + ((progress - 75) / 11) * 3.9;
  } else if (progress >= 86) {
    wheelAngle = 12.0;
  }

  // Phase active
  const activePhase =
    PHASES.find((ph) => progress >= ph.range[0] && progress <= ph.range[1]) ||
    PHASES[0];

  return (
    <div className="space-y-6">
      {/* --- CONTRÔLES SUPÉRIEURS DU BANC CINÉMATIQUE --- */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
              Banc Micro-Mécanique Interactif · Style Ciechanow.ski
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Cinématique des 5 Phases de l’Échappement à Ancre Suisse
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Animer le cycle'}</span>
            </button>

            <button
              onClick={() => setProgress((p) => (p - 2 + 100) % 100)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 text-xs transition"
              title="Reculer pas à pas"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setProgress((p) => (p + 2) % 100)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 text-xs transition"
              title="Avancer pas à pas"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Curseur de progression micrométrique (0% à 100%) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400">
              PROGRESSION DE L’ALTERNANCE (GLISSER POUR MANIPULER L’ÉCHAPPEMENT) :
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {Math.round(progress)} % · {activePhase.name}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          {/* 5 Boutons de saut direct vers les phases */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            {PHASES.map((ph) => {
              const active = ph.id === activePhase.id;
              return (
                <button
                  key={ph.id}
                  onClick={() => setProgress(ph.range[0] + 5)}
                  className={`p-2 rounded-lg border text-left text-xs font-mono transition ${
                    active
                      ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131822] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="truncate">
                    {ph.id}. {ph.name.split(':')[1]?.trim() || ph.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {ph.badge.split('·')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille principale : Schéma vectoriel SVG (7 cols) + Fiche pédagogique (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Schéma Haute Précision SVG */}
          <div className="lg:col-span-7 rounded-2xl bg-[#070A10] border border-slate-800 p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-amber-400 font-bold">
                VUE MICROSCOPIQUE : ANCRE, ROUE D’ÉCHAPPEMENT &amp; DOUBLE PLATEAU
              </span>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={showVectors}
                    onChange={(e) => setShowVectors(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Tirage &amp; Vecteurs</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-rose-300 select-none">
                  <input
                    type="checkbox"
                    checked={showOil}
                    onChange={(e) => setShowOil(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span>Zone Moebius 9415</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center p-2">
              <svg viewBox="0 0 600 540" className="w-full max-w-[500px] aspect-square select-none">
                {/* Ligne des centres théorique */}
                <line
                  x1="300"
                  y1="30"
                  x2="300"
                  y2="510"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />

                {/* Goupilles de limitation Gauche & Droite */}
                <g>
                  <circle cx="252" cy="185" r="7" fill="#D4AF37" stroke="#FEF08A" strokeWidth="1.5" />
                  <circle cx="348" cy="185" r="7" fill="#D4AF37" stroke="#FEF08A" strokeWidth="1.5" />
                  <text x="210" y="188" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                    Goupille G
                  </text>
                  <text x="362" y="188" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                    Goupille D
                  </text>
                </g>

                {/* 1. ROUE D'ÉCHAPPEMENT (Pivot à 300, 430) */}
                <g transform={`translate(300, 430) rotate(${wheelAngle.toFixed(2)})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="118"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="8"
                    strokeOpacity="0.3"
                  />
                  <circle cx="0" cy="0" r="35" fill="#1E293B" stroke="#D4AF37" strokeWidth="2" />
                  {/* 15 dents club */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 24})`}>
                      <path
                        d="M -6 -115 L 4 -152 L 15 -148 L 5 -115 Z"
                        fill="#D4AF37"
                        stroke="#FEF08A"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  <circle cx="0" cy="0" r="12" fill="#E11D48" stroke="#FDA4AF" strokeWidth="2" />
                </g>
                <text
                  x="300"
                  y="525"
                  textAnchor="middle"
                  fill="#D4AF37"
                  fontFamily="monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ROUE D’ÉCHAPPEMENT (15 DENTS · COUPLE MOTEUR)
                </text>

                {/* 2. CORPS D'ANCRE & PALETTES (Pivot à 300, 265) */}
                <g transform={`translate(300, 265) rotate(${forkAngle.toFixed(2)})`}>
                  {/* Corps d'ancre */}
                  <path
                    d="M -85 35 L 0 -10 L 85 35 L 65 52 L 0 18 L -65 52 Z"
                    fill="#475569"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />
                  {/* Baguette d'ancre et fourchette */}
                  <path
                    d="M -9 0 L -6 -105 L -24 -125 L -16 -138 L 0 -118 L 16 -138 L 24 -125 L 6 -105 L 9 0 Z"
                    fill="#64748B"
                    stroke="#E2E8F0"
                    strokeWidth="1.8"
                  />
                  {/* Dard de sécurité */}
                  <line
                    x1="0"
                    y1="-112"
                    x2="0"
                    y2="-136"
                    stroke="#38BDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Palette d'entrée (rubis à gauche) */}
                  <polygon
                    points="-78,25 -62,22 -68,68 -84,64"
                    fill="#E11D48"
                    stroke="#FDA4AF"
                    strokeWidth="1.5"
                  />
                  {/* Palette de sortie (rubis à droite) */}
                  <polygon
                    points="62,22 78,25 84,64 68,68"
                    fill="#E11D48"
                    stroke="#FDA4AF"
                    strokeWidth="1.5"
                  />

                  {/* Couche Moebius 9415 sur les plans d'impulsion */}
                  {showOil && (
                    <g>
                      <circle
                        cx="-75"
                        cy="65"
                        r="7"
                        fill="#F43F5E"
                        fillOpacity="0.6"
                        stroke="#FB7185"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="75"
                        cy="65"
                        r="7"
                        fill="#F43F5E"
                        fillOpacity="0.6"
                        stroke="#FB7185"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {/* Pivot d'ancre (Strictement SEC) */}
                  <circle cx="0" cy="0" r="10" fill="#0F172A" stroke="#EF4444" strokeWidth="2.5" />
                </g>

                {/* 3. DOUBLE PLATEAU & ELLIPSE (Pivot à 300, 95) */}
                <g transform={`translate(300, 95) rotate(${rollerAngle.toFixed(2)})`}>
                  {/* Grand plateau */}
                  <circle
                    cx="0"
                    cy="0"
                    r="56"
                    fill="#1E293B"
                    fillOpacity="0.85"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                  />
                  {/* Petit plateau avec encoche pour passage du dard */}
                  <path
                    d="M -8 28.8 A 30 30 0 1 1 8 28.8 Q 0 18 -8 28.8 Z"
                    fill="#334155"
                    stroke="#38BDF8"
                    strokeWidth="2"
                  />
                  {/* Ellipse en rubis synthétique */}
                  <path
                    d="M -6 42 L 6 42 L 4 58 L -4 58 Z"
                    fill="#E11D48"
                    stroke="#FFE4E6"
                    strokeWidth="1.8"
                  />
                  <circle cx="0" cy="0" r="11" fill="#D4AF37" stroke="#0B0E14" strokeWidth="2" />
                </g>
                <text
                  x="300"
                  y="24"
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontFamily="monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  DOUBLE PLATEAU DU BALANCIER (ELLIPSE &amp; ENCOCHE)
                </text>

                {/* Vecteurs et indicateur dynamique de contact */}
                {showVectors && (
                  <g>
                    {activePhase.id === 1 && (
                      <circle
                        cx="224"
                        cy="326"
                        r="18"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    )}
                    {activePhase.id === 2 && (
                      <circle
                        cx="296"
                        cy="145"
                        r="18"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    )}
                    {activePhase.id === 3 && (
                      <circle
                        cx="228"
                        cy="328"
                        r="18"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    )}
                    {activePhase.id === 4 && (
                      <circle
                        cx="374"
                        cy="326"
                        r="18"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    )}
                    {activePhase.id === 5 && (
                      <circle
                        cx="348"
                        cy="185"
                        r="18"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    )}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Fiche Pédagogique de la Phase Active (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  PHASE {activePhase.id} / 5
                </span>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {activePhase.badge}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {activePhase.name}
              </h4>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activePhase.mechanism}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong className="font-bold text-amber-700 dark:text-amber-300 block mb-1">
                  Point Critique d’Établi :
                </strong>
                {activePhase.watchmakerCheck}
              </div>
            </div>

            {/* Mémo Ébats & Sécurités de l'échappement */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <h4 className="font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Sécurités &amp; Ébats d’Échappement</span>
              </h4>

              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800">
                  <strong className="text-sky-600 dark:text-sky-300">1. Ébat de dard (Sécurité) :</strong>{' '}
                  Jeu obligatoire entre le bout du dard et le pourtour du petit plateau pendant l’arc libre.
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800">
                  <strong className="text-amber-600 dark:text-amber-300">2. Ébat de corne :</strong>{' '}
                  Jeu entre l’ellipse et l’entrée de corne lorsque l’ancre est au repos contre la goupille.
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200">
                  <strong className="text-rose-600 dark:text-rose-400">3. Règle Moebius 9415 :</strong>{' '}
                  Seuls les plans d’impulsion des palettes sont huilés. Pivots d’ancre, dard et cheville restent 100 % à sec.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
