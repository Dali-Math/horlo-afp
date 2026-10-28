"use client";

import React, { useState, useEffect } from "react";
import { ZoomIn, X } from "lucide-react";

// =========================================================================
// DÉFINITIONS SVG PARTAGÉES (Gradients acier, laiton, fonte, hachures, filtres)
// =========================================================================
export function SharedVisualDefs() {
  return (
    <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        {/* Acier rectifié au centième */}
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="18%" stopColor="#d1d5db" />
          <stop offset="35%" stopColor="#f9fafb" />
          <stop offset="55%" stopColor="#9ca3af" />
          <stop offset="85%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>

        {/* Acier bleui horloger (burin couteau 95°) */}
        <linearGradient id="blued" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="30%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#93c5fd" />
          <stop offset="80%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        {/* Laiton horloger / Pince W12 */}
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="30%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#fef3c7" />
          <stop offset="75%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Fonte perlée Schaublin 70 */}
        <linearGradient id="cast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Hachures de coupe métallographique 45° */}
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
        </pattern>

        {/* Ombre portée micro-mécanique */}
        <filter id="sh" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
        </filter>

        {/* Flèches de cotation dorées */}
        <marker id="aG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1L9 5L0 9z" fill="#d97706" />
        </marker>

        {/* Flèches de course cyan */}
        <marker id="aC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1L9 5L0 9z" fill="#0ea5e9" />
        </marker>

        {/* Flèches d'avance de coupe vertes */}
        <marker id="aN" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1L9 5L0 9z" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
}

// =========================================================================
// STYLES GLOBAUX DU BLUEPRINT SCHAUBLIN (Mode Clair & Mode Sombre)
// =========================================================================
export function BlueprintStyles() {
  return (
    <style jsx global>{`
      .schaublin-plate {
        background-color: #f8fafc;
        background-image: linear-gradient(rgba(14, 165, 233, 0.13) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(14, 165, 233, 0.13) 1px, transparent 1px);
        background-size: 20px 20px;
      }
      :global(.dark) .schaublin-plate {
        background-color: #0b1220;
        background-image: linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px);
        background-size: 20px 20px;
      }

      /* Classes de couleurs pour éléments SVG */
      .schaublin-svg text, .schaublin-svg tspan {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      .schaublin-svg .t { fill: #0f172a; }
      .schaublin-svg .d { fill: #334155; }
      .schaublin-svg .g { fill: #b45309; }
      .schaublin-svg .c { fill: #0369a1; }
      .schaublin-svg .n { fill: #047857; }
      .schaublin-svg .r { fill: #b91c1c; }
      .schaublin-svg .ax { stroke: #b45309; stroke-dasharray: 14 3 3 3; stroke-width: 1.2; }
      .schaublin-svg .dim { stroke: #b45309; stroke-width: 1.3; }
      .schaublin-svg .dimc { stroke: #0369a1; stroke-width: 1.3; }

      :global(.dark) .schaublin-svg .t { fill: #e2e8f0; }
      :global(.dark) .schaublin-svg .d { fill: #cbd5e1; }
      :global(.dark) .schaublin-svg .g { fill: #fbbf24; }
      :global(.dark) .schaublin-svg .c { fill: #38bdf8; }
      :global(.dark) .schaublin-svg .n { fill: #34d399; }
      :global(.dark) .schaublin-svg .r { fill: #fca5a5; }
      :global(.dark) .schaublin-svg .ax { stroke: #fbbf24; stroke-dasharray: 14 3 3 3; stroke-width: 1.2; }
      :global(.dark) .schaublin-svg .dim { stroke: #fbbf24; stroke-width: 1.3; }
      :global(.dark) .schaublin-svg .dimc { stroke: #38bdf8; stroke-width: 1.3; }

      @keyframes chipVibration {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-3px); }
      }
      .chip-animated {
        animation: chipVibration 2.4s ease-in-out infinite;
      }
    `}</style>
  );
}

// =========================================================================
// MODAL LOUPE D'INSPECTION HAUTE DÉFINITION 10x
// =========================================================================
interface LoupeModalProps {
  isOpen: boolean;
  onClose: () => void;
  figNum: string;
  barTitle: string;
  stepTitle: string;
  description: string;
  atelierNote: string;
  renderSvg: (scale: number) => React.ReactNode;
}

export function TechnicalLoupeModal({
  isOpen,
  onClose,
  figNum,
  barTitle,
  stepTitle,
  description,
  atelierNote,
  renderSvg
}: LoupeModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* En-tête de la Loupe */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/50 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              10x
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {figNum} · {barTitle}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono border border-emerald-500/20">
                  SCHAUBLIN 70
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {stepTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Contrôles de zoom */}
            <div className="hidden sm:flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5 font-mono text-xs">
              <button
                onClick={() => setZoomLevel(1)}
                className={`px-2.5 py-1 rounded-md transition ${zoomLevel === 1 ? 'bg-white dark:bg-slate-900 text-amber-500 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                1x
              </button>
              <button
                onClick={() => setZoomLevel(1.5)}
                className={`px-2.5 py-1 rounded-md transition ${zoomLevel === 1.5 ? 'bg-white dark:bg-slate-900 text-amber-500 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                1.5x
              </button>
              <button
                onClick={() => setZoomLevel(2)}
                className={`px-2.5 py-1 rounded-md transition ${zoomLevel === 2 ? 'bg-white dark:bg-slate-900 text-amber-500 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                2x
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition"
              aria-label="Fermer la loupe"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Corps d'inspection vectoriel plein format */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center schaublin-plate">
          <div
            className="w-full max-w-4xl transition-transform duration-300 origin-center drop-shadow-md"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {renderSvg(zoomLevel)}
          </div>
        </div>

        {/* Pied de loupe avec consigne d'établi */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070a10] shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                {description}
              </span>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                {atelierNote}
              </p>
            </div>
            <button
              onClick={onClose}
              className="sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs transition"
            >
              Fermer la Loupe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 1. FIG. 1 : VUE DE DESSUS · CHARIOT CROISÉ (Étape 1 · Préparer la machine)
// =========================================================================
export function PrepMachineVisual({ onZoom }: { onZoom?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (onZoom) onZoom();
    else setIsModalOpen(true);
  };

  const renderSvgContent = () => (
    <svg viewBox="0 0 400 230" className="w-full h-auto schaublin-svg" role="img" aria-label="Chariot plaqué contre le banc, burin parallèle, coulisse au repère 10">
      <rect y="150" width="400" height="80" fill="url(#cast)" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="20" y="130" width="360" height="20" fill="url(#steel)" stroke="#1f2937" />
      <rect x="90" y="86" width="190" height="64" rx="3" fill="url(#cast)" stroke="#94a3b8" filter="url(#sh)" />
      <rect x="110" y="56" width="150" height="34" fill="url(#steel)" stroke="#1f2937" />
      <g stroke="#0f172a">
        <line x1="118" y1="56" x2="118" y2="68" />
        <line x1="127" y1="56" x2="127" y2="63" />
        <line x1="136" y1="56" x2="136" y2="63" />
        <line x1="145" y1="56" x2="145" y2="63" />
        <line x1="154" y1="56" x2="154" y2="63" />
        <line x1="163" y1="56" x2="163" y2="68" />
        <line x1="172" y1="56" x2="172" y2="63" />
        <line x1="181" y1="56" x2="181" y2="63" />
        <line x1="190" y1="56" x2="190" y2="63" />
        <line x1="199" y1="56" x2="199" y2="63" />
        <line x1="208" y1="56" x2="208" y2="68" />
        <line x1="217" y1="56" x2="217" y2="63" />
        <line x1="226" y1="56" x2="226" y2="63" />
      </g>
      <g fontSize="8" fontWeight="600" fill="#0f172a">
        <text x="116" y="82">0</text>
        <text x="161" y="82">5</text>
        <text x="203" y="82">10</text>
      </g>
      <path d="M213 46L218 56L208 56Z" fill="#ef4444" />
      <text className="r" x="213" y="38" fontSize="9" fontWeight="600" textAnchor="middle">REPÈRE 10</text>
      <rect x="260" y="64" width="50" height="18" fill="url(#steel)" stroke="#1f2937" />
      <rect x="310" y="68" width="62" height="10" fill="url(#blued)" stroke="#1e3a8a" />
      <polygon points="372,68 384,73 372,78" fill="#bfdbfe" />
      <line x1="250" y1="73" x2="396" y2="73" stroke="#38bdf8" strokeDasharray="6 3" />
      <line className="dim" x1="30" y1="148" x2="30" y2="100" markerStart="url(#aG)" markerEnd="url(#aG)" />
      <text className="g" x="38" y="128" fontSize="11" fontWeight="600">H = 70.00</text>
      <text className="d" x="100" y="172" fontSize="9">CHARIOT PLAQUÉ CONTRE LE BANC</text>
    </svg>
  );

  return (
    <>
      <SharedVisualDefs />
      <BlueprintStyles />
      <figure
        onClick={handleOpen}
        className="group relative cursor-pointer m-0 bg-white dark:bg-[#0f1729] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 rounded-xl overflow-hidden shadow-sm transition-all"
      >
        <div className="flex justify-between items-center px-3.5 py-1.5 bg-[#0f172a] text-[#fbbf24] font-mono text-[11px] font-semibold tracking-wider border-b border-slate-700/60">
          <span>VUE DE DESSUS · CHARIOT CROISÉ</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">FIG. 1</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
              <ZoomIn className="w-3 h-3" /> Loupe
            </span>
          </div>
        </div>

        <div className="schaublin-plate p-1">
          {renderSvgContent()}
        </div>

        <figcaption className="p-3 bg-white dark:bg-[#0f1729] border-t border-slate-100 dark:border-slate-800">
          <b className="block text-sm font-bold text-slate-900 dark:text-white">Étape 1 · Préparer la machine</b>
          <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            Chariot contre le banc, burin parallèle, hauteur calée à 70.00 mm, coulisse au repère 10.
          </span>
        </figcaption>
      </figure>

      <TechnicalLoupeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        figNum="FIG. 1"
        barTitle="VUE DE DESSUS · CHARIOT CROISÉ"
        stepTitle="Étape 1 · Préparer la machine"
        description="Chariot contre le banc, burin parallèle, hauteur calée à 70.00 mm, coulisse au repère 10."
        atelierNote="Consigne d'établi : Le chariot croisé doit être fermement plaqué sur le banc prismatique rectifié. Tout porte-à-faux angulaire engendre du broutage."
        renderSvg={() => renderSvgContent()}
      />
    </>
  );
}

// =========================================================================
// 2. FIG. 2 : COUPE · PINCE W-12 (Étapes 2 et 3 · Sortir la barre)
// =========================================================================
export function BarStickoutVisual({ onZoom }: { onZoom?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (onZoom) onZoom();
    else setIsModalOpen(true);
  };

  const renderSvgContent = () => (
    <svg viewBox="0 0 400 230" className="w-full h-auto schaublin-svg" role="img" aria-label="Pince W-12 et sortie de barre de 10 mm">
      <rect y="40" width="170" height="150" fill="url(#cast)" stroke="#94a3b8" />
      <rect y="40" width="170" height="150" fill="url(#hatch)" />
      <rect y="85" width="170" height="60" fill="#0b1220" stroke="#64748b" />
      <path d="M20 90L150 90L168 100L168 130L150 140L20 140Z" fill="url(#brass)" stroke="#78350f" />
      <text x="85" y="120" fontSize="10" fontWeight="600" fill="#451a03" textAnchor="middle">PINCE W-12</text>
      <rect x="170" y="100" width="130" height="30" fill="url(#steel)" stroke="#1f2937" filter="url(#sh)" />
      <line className="ax" x1="0" y1="115" x2="400" y2="115" />
      <line className="dimc" x1="170" y1="168" x2="300" y2="168" markerStart="url(#aC)" markerEnd="url(#aC)" />
      <line className="dimc" x1="170" y1="135" x2="170" y2="175" strokeDasharray="3 2" />
      <line className="dimc" x1="300" y1="135" x2="300" y2="175" strokeDasharray="3 2" />
      <text className="c" x="235" y="190" fontSize="12" fontWeight="600" textAnchor="middle">SORTIE = 10 mm</text>
      <rect x="340" y="60" width="52" height="35" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeDasharray="4 3" />
      <text className="r" x="366" y="74" fontSize="8" fontWeight="600" textAnchor="middle">ZONE BURIN</text>
      <text className="r" x="366" y="86" fontSize="8" textAnchor="middle">NO CONTACT</text>
    </svg>
  );

  return (
    <>
      <SharedVisualDefs />
      <BlueprintStyles />
      <figure
        onClick={handleOpen}
        className="group relative cursor-pointer m-0 bg-white dark:bg-[#0f1729] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-sm transition-all"
      >
        <div className="flex justify-between items-center px-3.5 py-1.5 bg-[#0f172a] text-[#fbbf24] font-mono text-[11px] font-semibold tracking-wider border-b border-slate-700/60">
          <span>COUPE · PINCE W-12</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">FIG. 2</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
              <ZoomIn className="w-3 h-3" /> Loupe
            </span>
          </div>
        </div>

        <div className="schaublin-plate p-1">
          {renderSvgContent()}
        </div>

        <figcaption className="p-3 bg-white dark:bg-[#0f1729] border-t border-slate-100 dark:border-slate-800">
          <b className="block text-sm font-bold text-slate-900 dark:text-white">Étapes 2 et 3 · Sortir la barre</b>
          <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            10 mm hors de la pince. Le burin ne touche jamais la pièce pendant l’approche.
          </span>
        </figcaption>
      </figure>

      <TechnicalLoupeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        figNum="FIG. 2"
        barTitle="COUPE · PINCE W-12"
        stepTitle="Étapes 2 et 3 · Sortir la barre"
        description="Sortie rigoureuse de 10 mm hors de la pince W-12. Approche sécurisée sans contact prématuré."
        atelierNote="Règle d'or horlogère : Respecter le ratio L <= 3 x D. Pour un diamètre de 3 à 4 mm, une sortie de 10 mm prévient toute flexion mécanique sous l'effort de coupe."
        renderSvg={() => renderSvgContent()}
      />
    </>
  );
}

// =========================================================================
// 3. FIG. 3 : PRISE D’ORIGINE · TANGENTAGE (Étapes 4 à 6 · Prendre l’origine)
// =========================================================================
export function OriginVisual({ onZoom }: { onZoom?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (onZoom) onZoom();
    else setIsModalOpen(true);
  };

  const renderSvgContent = () => (
    <svg viewBox="0 0 400 230" className="w-full h-auto schaublin-svg" role="img" aria-label="Burin qui effleure la face, tambour à zéro">
      <rect y="70" width="230" height="64" fill="url(#steel)" stroke="#1f2937" filter="url(#sh)" />
      <line className="ax" x1="0" y1="102" x2="400" y2="102" />
      <polygon points="232,102 300,70 380,70 380,100 300,100" fill="url(#blued)" stroke="#1e3a8a" />
      <circle cx="231" cy="102" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="231" cy="102" r="22" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 2" />
      <text className="g" x="231" y="146" fontSize="9" fontWeight="600" textAnchor="middle">CONTACT = EFFLEUREMENT</text>
      <g transform="translate(300 150)">
        <rect width="80" height="62" rx="6" fill="url(#steel)" stroke="#1f2937" filter="url(#sh)" />
        <g stroke="#0f172a" strokeWidth="0.9">
          <line x1="6" y1="0" x2="6" y2="18" />
          <line x1="13" y1="0" x2="13" y2="11" />
          <line x1="20" y1="0" x2="20" y2="11" />
          <line x1="27" y1="0" x2="27" y2="11" />
          <line x1="34" y1="0" x2="34" y2="11" />
          <line x1="41" y1="0" x2="41" y2="18" />
          <line x1="48" y1="0" x2="48" y2="11" />
          <line x1="55" y1="0" x2="55" y2="11" />
          <line x1="62" y1="0" x2="62" y2="11" />
          <line x1="69" y1="0" x2="69" y2="11" />
        </g>
        <text x="4" y="31" fontSize="9" fontWeight="600" fill="#0f172a">0</text>
        <path d="M6-10L11 0L1 0Z" fill="#ef4444" />
        <rect y="40" width="80" height="22" rx="3" fill="#0b1220" />
        <text x="40" y="56" fontSize="11" fontWeight="600" fill="#34d399" textAnchor="middle">0.00 mm</text>
      </g>
      <g fontSize="10">
        <text className="d" x="16" y="190">1 · centrer à la coulisse verticale</text>
        <text className="d" x="16" y="206">2 · effleurer la face (coulisse latérale)</text>
        <text className="n" x="16" y="222" fontWeight="600">3 · bloquer, tambour à 0</text>
      </g>
    </svg>
  );

  return (
    <>
      <SharedVisualDefs />
      <BlueprintStyles />
      <figure
        onClick={handleOpen}
        className="group relative cursor-pointer m-0 bg-white dark:bg-[#0f1729] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-xl overflow-hidden shadow-sm transition-all"
      >
        <div className="flex justify-between items-center px-3.5 py-1.5 bg-[#0f172a] text-[#fbbf24] font-mono text-[11px] font-semibold tracking-wider border-b border-slate-700/60">
          <span>PRISE D’ORIGINE · TANGENTAGE</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">FIG. 3</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
              <ZoomIn className="w-3 h-3" /> Loupe
            </span>
          </div>
        </div>

        <div className="schaublin-plate p-1">
          {renderSvgContent()}
        </div>

        <figcaption className="p-3 bg-white dark:bg-[#0f1729] border-t border-slate-100 dark:border-slate-800">
          <b className="block text-sm font-bold text-slate-900 dark:text-white">Étapes 4 à 6 · Prendre l’origine</b>
          <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            Le zéro du tambour est la référence de toutes les passes qui suivent.
          </span>
        </figcaption>
      </figure>

      <TechnicalLoupeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        figNum="FIG. 3"
        barTitle="PRISE D’ORIGINE · TANGENTAGE"
        stepTitle="Étapes 4 à 6 · Prendre l’origine"
        description="Tangentage délicat par contact d'effleurement et étalonnage du tambour micrométrique à 0.00 mm."
        atelierNote="Geste d'artisan : Déplacer la coulisse latérale jusqu'au contact microscopique (le copeau imperceptible ou entraînement du papier à cigarette huilé). Bloquer la bague et mettre la bague graduée à 0."
        renderSvg={() => renderSvgContent()}
      />
    </>
  );
}

// =========================================================================
// 4. FIG. 4 : DRESSAGE · PASSES DE 0.10 mm (Étape 7 · Dresser la face)
// =========================================================================
export function FacingPassesVisual({ onZoom }: { onZoom?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (onZoom) onZoom();
    else setIsModalOpen(true);
  };

  const renderSvgContent = () => (
    <svg viewBox="0 0 400 230" className="w-full h-auto schaublin-svg" role="img" aria-label="Trois passes de dressage de 0.10 mm">
      <rect y="60" width="200" height="90" fill="url(#steel)" stroke="#1f2937" />
      <rect x="200" y="60" width="9" height="90" fill="#f59e0b" fillOpacity="0.35" stroke="#f59e0b" strokeDasharray="3 2" />
      <rect x="209" y="60" width="9" height="90" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeDasharray="3 2" />
      <rect x="218" y="60" width="9" height="90" fill="#fde047" fillOpacity="0.12" stroke="#fde047" strokeDasharray="3 2" />
      <line className="ax" x1="0" y1="105" x2="400" y2="105" />
      <g className="chip-animated">
        <polygon points="196,36 226,36 226,60 211,64 196,60" fill="url(#blued)" stroke="#1e3a8a" filter="url(#sh)" />
      </g>
      <line x1="211" y1="10" x2="211" y2="32" stroke="#10b981" strokeWidth="2" markerEnd="url(#aN)" />
      <text className="n" x="222" y="22" fontSize="9" fontWeight="600">Avance radiale X vers le centre</text>
      <g fontSize="9" fontWeight="600" className="g">
        <circle cx="204.5" cy="172" r="8" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" />
        <text x="204.5" y="175" textAnchor="middle">1</text>
        <circle cx="213.5" cy="172" r="8" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" transform="translate(9 0)" />
        <text x="222.5" y="175" textAnchor="middle">2</text>
        <circle cx="231.5" cy="172" r="8" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" transform="translate(9 0)" />
        <text x="240.5" y="175" textAnchor="middle">3</text>
      </g>
      <line className="dimc" x1="200" y1="196" x2="209" y2="196" markerStart="url(#aC)" markerEnd="url(#aC)" />
      <text className="c" x="262" y="200" fontSize="11" fontWeight="600">0.10 mm par passe</text>
      <g fontSize="9" className="d">
        <text x="16" y="188">avancer Z de +0.10</text>
        <text x="16" y="202">dégager en X</text>
        <text x="16" y="216">revenir au centre</text>
      </g>
      <path d="M232 50q12-8 22 2t20-4" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
      <SharedVisualDefs />
      <BlueprintStyles />
      <figure
        onClick={handleOpen}
        className="group relative cursor-pointer m-0 bg-white dark:bg-[#0f1729] border border-slate-200 dark:border-slate-800 hover:border-yellow-500/50 rounded-xl overflow-hidden shadow-sm transition-all"
      >
        <div className="flex justify-between items-center px-3.5 py-1.5 bg-[#0f172a] text-[#fbbf24] font-mono text-[11px] font-semibold tracking-wider border-b border-slate-700/60">
          <span>DRESSAGE · PASSES DE 0.10 mm</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-normal">FIG. 4</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
              <ZoomIn className="w-3 h-3" /> Loupe
            </span>
          </div>
        </div>

        <div className="schaublin-plate p-1">
          {renderSvgContent()}
        </div>

        <figcaption className="p-3 bg-white dark:bg-[#0f1729] border-t border-slate-100 dark:border-slate-800">
          <b className="block text-sm font-bold text-slate-900 dark:text-white">Étape 7 · Dresser la face</b>
          <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            Passes successives de 10 centièmes jusqu’à obtenir une face parfaitement nette.
          </span>
        </figcaption>
      </figure>

      <TechnicalLoupeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        figNum="FIG. 4"
        barTitle="DRESSAGE · PASSES DE 0.10 mm"
        stepTitle="Étape 7 · Dresser la face"
        description="Passes successives de 10 centièmes (0.10 mm) jusqu'à obtenir une face plane miroir sans téton central."
        atelierNote="Consigne d'usinage horloger : Avancer le burin radialement de l'extérieur vers le centre en dépassant de 0.05 mm au-delà de l'axe central pour éliminer le téton résiduel. Lubrification à l'huile minérale de coupe."
        renderSvg={() => renderSvgContent()}
      />
    </>
  );
}

// =========================================================================
// 5. FIG. 0 : ANATOMIE · SCHAUBLIN 70 (Les trois organes à connaître)
// =========================================================================
export function LatheAnatomyVisual({ onZoom }: { onZoom?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (onZoom) onZoom();
    else setIsModalOpen(true);
  };

  const renderSvgContent = () => (
    <svg viewBox="0 0 640 270" className="w-full h-auto schaublin-svg" role="img" aria-label="Schéma annoté du tour Schaublin 70">
      <rect x="20" y="196" width="600" height="38" rx="3" fill="url(#cast)" stroke="#94a3b8" filter="url(#sh)" />
      <rect x="40" y="178" width="560" height="18" fill="url(#steel)" stroke="#1f2937" />
      <rect x="40" y="100" width="130" height="78" fill="url(#cast)" stroke="#94a3b8" />
      <rect x="170" y="128" width="42" height="26" fill="url(#brass)" stroke="#78350f" />
      <text x="105" y="145" fontSize="11" fontWeight="600" fill="#e2e8f0" textAnchor="middle">POUPÉE</text>
      <rect x="212" y="134" width="120" height="14" fill="url(#steel)" stroke="#1f2937" />
      <rect x="270" y="150" width="130" height="28" fill="url(#cast)" stroke="#94a3b8" />
      <rect x="285" y="126" width="100" height="26" fill="url(#steel)" stroke="#1f2937" />
      <rect x="350" y="116" width="40" height="12" fill="url(#blued)" stroke="#1e3a8a" />
      <circle cx="410" cy="164" r="13" fill="url(#steel)" stroke="#1f2937" />
      <circle cx="335" cy="104" r="11" fill="url(#steel)" stroke="#1f2937" />
      <rect x="500" y="112" width="80" height="66" fill="url(#cast)" stroke="#94a3b8" />
      <rect x="440" y="136" width="62" height="12" fill="url(#steel)" stroke="#1f2937" />
      <polygon points="440,136 424,142 440,148" fill="#e2e8f0" />
      <line className="ax" x1="20" y1="141" x2="620" y2="141" />
      <line className="dim" x1="610" y1="178" x2="610" y2="141" markerStart="url(#aG)" markerEnd="url(#aG)" />
      <text className="g" x="602" y="166" fontSize="10" fontWeight="600" textAnchor="end">H = 70.00</text>
      <g fontSize="11" fontWeight="600" className="g">
        <circle cx="105" cy="84" r="10" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" strokeWidth="1.5" />
        <text x="105" y="88" textAnchor="middle">1</text>
        <circle cx="335" cy="84" r="10" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" strokeWidth="1.5" />
        <text x="335" y="88" textAnchor="middle">2</text>
        <circle cx="540" cy="94" r="10" fill="var(--plate, #0b1220)" stroke="var(--gold, #fbbf24)" strokeWidth="1.5" />
        <text x="540" y="98" textAnchor="middle">3</text>
      </g>
      <g fontSize="11">
        <text className="t" x="30" y="30">
          <tspan className="g font-bold">1</tspan> Poupée · pinces W-12 (passage Ø 8.2)
        </text>
        <text className="t" x="30" y="48">
          <tspan className="g font-bold">2</tspan> Chariot croisé · tambours 0.01 mm
        </text>
        <text className="t" x="30" y="66">
          <tspan className="g font-bold">3</tspan> Contre-poupée · cône 2° · course 45 mm
        </text>
      </g>
    </svg>
  );

  return (
    <>
      <SharedVisualDefs />
      <BlueprintStyles />
      <figure
        onClick={handleOpen}
        className="group relative cursor-pointer m-0 mb-8 bg-white dark:bg-[#0f1729] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-sm transition-all"
      >
        <div className="flex justify-between items-center px-4 py-2 bg-[#0f172a] text-[#fbbf24] font-mono text-xs font-semibold tracking-wider border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ANATOMIE · SCHAUBLIN 70</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-normal">FIG. 0</span>
            <span className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30">
              <ZoomIn className="w-3.5 h-3.5" /> Loupe Macro 10x
            </span>
          </div>
        </div>

        <div className="schaublin-plate p-2 sm:p-4">
          {renderSvgContent()}
        </div>

        <figcaption className="p-4 bg-white dark:bg-[#0f1729] border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <b className="text-base font-bold text-slate-900 dark:text-white">Les trois organes à connaître</b>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              La hauteur de pointes de 70.00 mm est la référence absolue de tous les réglages de burin en horlogerie.
            </span>
          </div>
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold shrink-0">
            H = 70.00 mm · Pinces W-12
          </span>
        </figcaption>
      </figure>

      <TechnicalLoupeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        figNum="FIG. 0"
        barTitle="ANATOMIE · SCHAUBLIN 70"
        stepTitle="Les trois organes à connaître"
        description="Architecture complète du Tour d'horloger Schaublin 70 : Poupée fixe W-12, Chariot croisé et Contre-poupée à cône 2°."
        atelierNote="Tolérance d'alignement suisse : L'axe de broche de la poupée et l'axe de la contre-poupée doivent être rigoureusement coaxiaux à moins de 0.005 mm sur toute la longueur utile du banc rectifié."
        renderSvg={() => renderSvgContent()}
      />
    </>
  );
}
