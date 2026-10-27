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
  Sparkles,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  desc: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk1',
    title: 'Ajustement de la tige de remontoir',
    desc: 'Jeu d’armage contrôlé (0.10 à 0.20 mm), passage net des 3 crans (Remontage, Correction rapide de quantième, Mise à l’heure avec stop-seconde).',
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
    desc: 'Deux brides ETA 2824-2 convenablement engagées dans la gorge de carrure et vis serrées au couple prescrit.',
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
  // 1. Calculateur de Mise à Tige
  const [rawLength, setRawLength] = useState<number>(18.5);
  const [gapA, setGapA] = useState<number>(1.85);
  const [clearanceJ, setClearanceJ] = useState<number>(0.15);

  const toRemove = Math.max(0, gapA - clearanceJ);
  const finalLength = Math.max(0, rawLength - toRemove);

  // 2. Simulateur de Profil d'Aiguilles
  const [minTilt, setMinTilt] = useState<number>(0);
  const [secTilt, setSecTilt] = useState<number>(0);

  // 3. Checklist
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================================================================
            1. CALCULATEUR & SIMULATEUR DE MISE À TIGE (6 cols)
           =================================================================== */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
              Atelier Pratique · Calibre ETA 2824-2
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
              <Scissors className="w-4 h-4 text-amber-500" />
              <span>Calculateur de Mise à Tige (Coupe au Roule-Goupilles)</span>
            </h3>
          </div>

          {/* Schéma vectoriel SVG de la Carrure, Tube, Tige & Couronne */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3">
            <svg viewBox="0 0 460 155" className="w-full h-auto select-none">
              {/* Carrure & Mouvement */}
              <rect x="20" y="25" width="160" height="105" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <text x="100" y="82" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="11">
                MOUVEMENT + BOÎTE
              </text>

              {/* Tube de boîte */}
              <rect x="180" y="58" width="55" height="38" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="207" y="50" textAnchor="middle" fill="#64748B" fontFamily="monospace" fontSize="9">
                TUBE
              </text>

              {/* Tige de remontoir (Ø 0.90 mm / Filetage) */}
              <rect x="140" y="70" width="195" height="14" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
              <line x1="235" y1="70" x2="335" y2="70" stroke="#D4AF37" strokeWidth="3" strokeDasharray="3 3" />
              <line x1="235" y1="84" x2="335" y2="84" stroke="#D4AF37" strokeWidth="3" strokeDasharray="3 3" />

              {/* Couronne positionnée selon l'écart A */}
              <g transform={`translate(${240 + Math.min(45, Math.max(2, gapA * 12))}, 43)`}>
                <rect x="0" y="0" width="75" height="68" rx="6" fill="#D4AF37" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="2" />
                <rect x="0" y="18" width="48" height="32" fill="#0B0E14" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
                <text x="38" y="13" textAnchor="middle" fill="#FDE047" fontFamily="monospace" fontSize="9" fontWeight="bold">
                  COURONNE
                </text>
              </g>

              {/* Cotation de l'Écart A */}
              <line x1="235" y1="125" x2="295" y2="125" stroke="#38BDF8" strokeWidth="2" />
              <line x1="235" y1="115" x2="235" y2="132" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="295" y1="115" x2="295" y2="132" stroke="#38BDF8" strokeWidth="1.5" />
              <text x="265" y="144" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="10" fontWeight="bold">
                ÉCART A = {gapA.toFixed(2)} mm
              </text>
            </svg>
          </div>

          {/* Saisies au pied à coulisse */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-[10px] font-mono uppercase text-slate-500">
                1. Tige Brute (L1)
              </label>
              <input
                type="number"
                step="0.05"
                value={rawLength}
                onChange={(e) => setRawLength(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">en mm</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-[10px] font-mono uppercase text-sky-600 dark:text-sky-300">
                2. Écart Pos. 1 (A)
              </label>
              <input
                type="number"
                step="0.05"
                value={gapA}
                onChange={(e) => setGapA(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold text-sky-600 dark:text-sky-300"
              />
              <span className="text-[10px] text-slate-400">Couronne vissée à fond</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">
                3. Jeu Armage (J)
              </label>
              <input
                type="number"
                step="0.05"
                value={clearanceJ}
                onChange={(e) => setClearanceJ(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold text-amber-600 dark:text-amber-400"
              />
              <span className="text-[10px] text-slate-400">0.10 à 0.20 mm</span>
            </div>
          </div>

          {/* Résultat du calcul de coupe */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
                Longueur finale théorique après coupe :
              </div>
              <div className="text-2xl font-mono font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {finalLength.toFixed(2)} mm
              </div>
              <div className="text-xs font-mono text-sky-600 dark:text-sky-300 mt-0.5">
                Matière à retirer : -{toRemove.toFixed(2)} mm (Couper par passes de 0.3 mm)
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 max-w-xs border-l border-amber-500/30 pl-3 space-y-1">
              <div>
                <strong>Conseil d’établi :</strong> Toujours couper <strong>0.20 mm plus long</strong> au roule-goupilles, puis ajuster au cabron d’émeri.
              </div>
              <div>
                Sécuriser le filetage à la <strong>Loctite 243 (Bleue)</strong> lors du serrage final.
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. SIMULATEUR DE POSE D'AIGUILLES & PARTAGE DES HAUTEURS (6 cols)
           =================================================================== */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
              Contrôle de Profil &amp; Saut de Date · ETA 2824-2
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Simulateur de Pose d’Aiguilles (Parallélisme &amp; Hauteurs)</span>
            </h3>
          </div>

          {/* Schéma vectoriel SVG de profil : Glace, Trotteuse, Minute, Heure, Cadran & Index */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3">
            <svg viewBox="0 0 460 175" className="w-full h-auto select-none">
              {/* Intrados Glace Saphir */}
              <path d="M 20 25 Q 230 15 440 25" fill="none" stroke="#38BDF8" strokeWidth="4" strokeOpacity="0.6" />
              <text x="430" y="18" textAnchor="end" fill="#38BDF8" fontFamily="monospace" fontSize="9">
                GLACE SAPHIR (INTRADOS)
              </text>

              {/* Cadran & Index appliqués */}
              <rect x="20" y="142" width="420" height="14" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="355" y="128" width="38" height="14" fill="#D4AF37" stroke="#FEF08A" strokeWidth="1" />
              <text x="374" y="123" textAnchor="middle" fill="#D4AF37" fontFamily="monospace" fontSize="8">
                INDEX
              </text>

              {/* Canons centraux */}
              <rect x="55" y="110" width="36" height="32" fill="#94A3B8" />
              <rect x="61" y="82" width="24" height="28" fill="#CBD5E1" />
              <rect x="69" y="48" width="8" height="34" fill="#FDE047" />

              {/* Aiguille des heures (Ø 1.50) */}
              <g transform="translate(73, 112) rotate(0)">
                <rect x="0" y="-4" width="215" height="7" rx="2" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1" />
                <text x="225" y="3" fill="#CBD5E1" fontFamily="monospace" fontSize="9">
                  HEURE (Ø 1.50)
                </text>
              </g>

              {/* Aiguille des minutes (Ø 0.90) avec assiette */}
              <g transform={`translate(73, 84) rotate(${minTilt})`}>
                <rect x="0" y="-3.5" width="305" height="6" rx="2" fill="#D4AF37" stroke="#0F172A" strokeWidth="1" />
                <text x="315" y="3" fill="#D4AF37" fontFamily="monospace" fontSize="9">
                  MINUTE (Ø 0.90)
                </text>
              </g>

              {/* Trotteuse de seconde (Ø 0.25) avec assiette */}
              <g transform={`translate(73, 52) rotate(${secTilt})`}>
                <rect x="-25" y="-2" width="345" height="3.5" rx="1.5" fill="#F43F5E" />
                <text x="330" y="3" fill="#FB7185" fontFamily="monospace" fontSize="9">
                  SECONDE (Ø 0.25)
                </text>
              </g>
            </svg>
          </div>

          {/* Curseurs d'assiette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Assiette Aiguille Minute
                </span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
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

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  Assiette Trotteuse Seconde
                </span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
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

          {/* Diagnostic de jeu de profil */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
              isSecondHittingCrystal
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-200'
                : isMinuteHittingIndex
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-200'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
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
                  ? 'ALERTE : La trotteuse touche la glace saphir (Arrêt de la montre) !'
                  : isMinuteHittingIndex
                  ? 'ATTENTION : L’aiguille des minutes pique vers les index ou croise la trotteuse !'
                  : 'Partage des hauteurs conforme : Parallélisme parfait sans friction.'}
              </strong>
            </span>
            <span className="font-mono text-[11px] shrink-0">Saut date : 00h00 ± 3 min</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. CHECKLIST OFFICIELLE D'ÉTABLI AVANT LIVRAISON
         =================================================================== */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
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
                    : 'bg-slate-50 dark:bg-[#0B0F17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-500/50'
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
