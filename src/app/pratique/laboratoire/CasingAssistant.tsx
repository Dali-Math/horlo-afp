'use client';

import React, { useState } from 'react';
import {
  Scissors,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ClipboardCheck,
  Check,
  ShieldCheck,
  ShieldAlert,
  Info,
} from 'lucide-react';
import StemCuttingSimulator from './StemCuttingSimulator';

interface ChecklistItem {
  id: string;
  title: string;
  desc: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk1',
    title: 'Ajustement de la tige de remontoir',
    desc: 'Jeu d’armage contrôlé (0.15 mm poussée / 0.40 mm vissée), passage net des 3 crans (Remontage, Correction rapide de quantième, Mise à l’heure avec stop-seconde).',
  },
  {
    id: 'chk2',
    title: 'Saut de quantième instantané à minuit',
    desc: 'Déclenchement du disque de quantième à 00h00 (tolérance ± 3 minutes) lors du chassage des aiguilles d’heures et de minutes.',
  },
  {
    id: 'chk3',
    title: 'Partage des hauteurs & parallélisme',
    desc: 'Aiguilles strictement horizontales vues de profil sous loupe 10x : aucun contact entre cadran, index en relief, trotteuse et glace saphir.',
  },
  {
    id: 'chk4',
    title: 'Propreté absolue cadran & intrados de glace',
    desc: 'Zéro poussière sous éclairage rasant à 45°, aucune trace de brucelles ou de Rodico sur le rhodiage ou le vernis.',
  },
  {
    id: 'chk5',
    title: 'Brides et vis de fixation de la carrure',
    desc: 'Deux brides ETA 2824-2 convenablement engagées dans la gorge de carrure et vis serrées au couple prescrit (1.8 cNm).',
  },
  {
    id: 'chk6',
    title: 'Graissage des joints d’étanchéité',
    desc: 'Joint de fond torique et joint de couronne passés dans la graisse silicone (Fomblin / Moebius 8513) avant fermeture.',
  },
  {
    id: 'chk7',
    title: 'Rotation libre de la masse oscillante',
    desc: 'Rotor automatique tournant librement sur son roulement à billes sans effleurer le pont automatique ni le fond de boîte.',
  },
  {
    id: 'chk8',
    title: 'Contrôle chronométrique final (6 positions)',
    desc: 'Passage au Witschi : angle de levée 50°, repère ≤ 0.4 ms et amplitude comprise entre 270° et 310°.',
  },
];

export default function CasingAssistant() {
  // Simulateur de Profil d'Aiguilles
  const [minTilt, setMinTilt] = useState<number>(0);
  const [secTilt, setSecTilt] = useState<number>(0);

  // Extraction de tige Pos 3 simulation
  const [extractPos, setExtractPos] = useState<'pos1' | 'pos2' | 'pos3'>('pos3');

  // Checklist
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    new Set(['chk1', 'chk2', 'chk3'])
  );

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  // Diagnostic de profil d'aiguilles
  const isSecondHittingCrystal = secTilt <= -2.5;
  const isMinuteHittingIndex = minTilt >= 2.5 || secTilt - minTilt >= 3.0;

  return (
    <div className="space-y-8">
      {/* ===================================================================
          1. SIMULATEUR COMPLET DE COUPE DE TIGE ETA 2824-2
         =================================================================== */}
      <StemCuttingSimulator />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================================================================
            2. SIMULATEUR DE PROFIL D'AIGUILLES & ÉTAGEMENT SOUS LOUPE (7 cols)
           =================================================================== */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 transition-colors">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Contrôle Optique Loupe 10x
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Profil d’Étagement des Aiguilles &amp; Dégagement Glace</span>
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              Vue de Profil ×20
            </span>
          </div>

          {/* SVG Profil d'aiguilles */}
          <div className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3">
            <svg viewBox="0 0 460 170" className="w-full h-auto select-none">
              {/* Glace Saphir supérieure */}
              <line x1="20" y1="26" x2="440" y2="26" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5 3" />
              <text x="35" y="20" fill="#38BDF8" fontFamily="monospace" fontSize="8.5" fontWeight="bold">
                INTRADOS GLACE SAPHIR
              </text>

              {/* Canon central de minuterie & tenon trotteuse */}
              <rect x="35" y="45" width="22" height="105" className="fill-slate-300 dark:fill-[#475569] stroke-slate-400 dark:stroke-[#94A3B8]" strokeWidth="1" />
              <rect x="42" y="32" width="8" height="25" fill="#CBD5E1" stroke="#E2E8F0" strokeWidth="1" />

              {/* Trotteuse de seconde */}
              <g transform={`rotate(${secTilt} 46 36)`} style={{ transition: 'transform 0.2s ease-out' }}>
                <rect x="46" y="34" width="370" height="4" fill="#F43F5E" />
                <polygon points="416,33 425,36 416,39" fill="#F43F5E" />
                <text x="210" y="31" fill="#FB7185" fontFamily="monospace" fontSize="8" fontWeight="bold">
                  SECONDE (0.30 mm au-dessus minutes)
                </text>
              </g>

              {/* Aiguille des minutes */}
              <g transform={`rotate(${minTilt} 46 72)`} style={{ transition: 'transform 0.2s ease-out' }}>
                <rect x="46" y="70" width="340" height="7" rx="1.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
                <text x="200" y="66" fill="#CBD5E1" fontFamily="monospace" fontSize="8" fontWeight="bold">
                  MINUTES (0.25 mm au-dessus heures)
                </text>
              </g>

              {/* Aiguille des heures */}
              <rect x="46" y="105" width="240" height="8" rx="2" fill="#D4AF37" stroke="#854D0E" strokeWidth="1" />
              <text x="140" y="101" fill="#D4AF37" fontFamily="monospace" fontSize="8" fontWeight="bold">
                HEURES (0.20 mm au-dessus cadran)
              </text>

              {/* Cadran et index appliqués */}
              <line x1="20" y1="145" x2="440" y2="145" className="stroke-slate-400 dark:stroke-[#94A3B8]" strokeWidth="3" />
              <rect x="350" y="125" width="24" height="20" rx="2" fill="#F59E0B" stroke="#D4AF37" strokeWidth="1" />
              <rect x="180" y="130" width="16" height="15" rx="1" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
              <text x="35" y="160" fill="#94A3B8" fontFamily="monospace" fontSize="9">
                CADRAN &amp; INDEX APPLIQUÉS
              </text>
            </svg>
          </div>

          {/* Curseurs d'assiette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Assiette Aiguille Minutes
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {minTilt > 0 ? `+${minTilt}` : minTilt}°
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={minTilt}
                onChange={(e) => setMinTilt(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Assiette Trotteuse Seconde
                </span>
                <span className="font-bold text-rose-500">
                  {secTilt > 0 ? `+${secTilt}` : secTilt}°
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={secTilt}
                onChange={(e) => setSecTilt(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Diagnostic de profil */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 leading-relaxed ${
              isSecondHittingCrystal
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-200'
                : isMinuteHittingIndex
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {isSecondHittingCrystal || isMinuteHittingIndex ? (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              )}
              <strong>
                {isSecondHittingCrystal
                  ? 'ALERTE : La trotteuse touche la glace saphir (Arrêt immédiat de la montre) !'
                  : isMinuteHittingIndex
                  ? 'ATTENTION : L’aiguille des minutes pique vers les index ou croise la trotteuse !'
                  : 'Partage des hauteurs conforme : Parallélisme parfait sans frottement.'}
              </strong>
            </span>
            <span className="font-mono text-[11px] shrink-0 font-bold">Saut date : 00h00 ± 3 min</span>
          </div>
        </div>

        {/* ===================================================================
            3. RÈGLE CRITIQUE D'EXTRACTION DE TIGE ETA 2824-2 (5 cols)
           =================================================================== */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 transition-colors">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-[11px] font-mono uppercase text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Règle d&apos;Atelier Vitale
            </span>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white mt-0.5">
              Extraction de Tige sur Plot ETA 2824-2
            </h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Contrairement aux calibres à vis de tirette (ETA 6497), le calibre ETA 2824-2 utilise un <strong className="text-slate-900 dark:text-white">plot de tirette à pression axiale</strong>.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <label className="block text-slate-500 dark:text-slate-400 font-bold">
              Position de la tige avant pression :
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setExtractPos('pos1')}
                className={`p-2 rounded-xl border text-center transition ${
                  extractPos === 'pos1'
                    ? 'border-rose-500 bg-rose-500 text-white font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                }`}
              >
                Pos. 1 (Erreur)
              </button>
              <button
                onClick={() => setExtractPos('pos2')}
                className={`p-2 rounded-xl border text-center transition ${
                  extractPos === 'pos2'
                    ? 'border-amber-500 bg-amber-500 text-slate-950 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                }`}
              >
                Pos. 2 (Risque)
              </button>
              <button
                onClick={() => setExtractPos('pos3')}
                className={`p-2 rounded-xl border text-center transition ${
                  extractPos === 'pos3'
                    ? 'border-emerald-500 bg-emerald-500 text-slate-950 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                }`}
              >
                Pos. 3 (Obligatoire)
              </button>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              extractPos === 'pos3'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200'
            }`}
          >
            {extractPos === 'pos3' ? (
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5 font-mono text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GESTION CONFORME : Tige tirée en Position 3 (Mise à l&apos;heure)</span>
                </div>
                <p>
                  Le talon de la tirette est engagé au maximum dans la bascule. La pression d&apos;une pointe fine (Ø 0.80 mm, max 0.8 mm de course) libère la tige sans faire sauter la bascule ni déloger le sautoir.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5 font-mono text-rose-700 dark:text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>PIÈGE D&apos;ÉTABLI : Risque majeur de décrochement de la bascule !</span>
                </div>
                <p>
                  En appuyant sur le plot alors que la tige est en Position 1 ou 2, la tirette ripe sous la bascule. Le ressort pousse la bascule vers le centre : la tige ne rentre plus, obligeant à déposer le cadran et les aiguilles !
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================
          4. CHECKLIST OFFICIELLE D'ÉTABLI AVANT LIVRAISON
         =================================================================== */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-amber-500" />
              <span>Protocole d’Établi Avant Rendu Client (ETA 2824-2)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Validez méthodiquement chaque étape d’emboîtage à l’établi.
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-slate-500">PROGRESSION ÉTABLI : </span>
            <strong className="text-amber-600 dark:text-amber-400 text-sm">
              {checkedIds.size} / {CHECKLIST_ITEMS.length} validés
            </strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isDone = checkedIds.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-500/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                      : 'border-slate-400 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div
                    className={`text-xs sm:text-sm font-bold ${
                      isDone
                        ? 'text-emerald-700 dark:text-emerald-300 line-through opacity-85'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {idx + 1}. {item.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
