'use client';

/**
 * HorloLearn — Loupe d'inspection 10x
 * Modale plein écran portée directement sur document.body via createPortal :
 * Schéma technique agrandi avec zoom par paliers (1x / 2x / 5x / 10x),
 * navigation clavier Échap / + / − / 0, et support complet Clair/Sombre.
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Eye, X, MapPin } from 'lucide-react';
import { renderSchemaComponent } from '@/lib/emboitage/schemas';
import { SCHEMA_HOTSPOTS, SCHEMA_VIEWS, type Hotspot, type SchemaType } from '@/lib/emboitage/data';

export interface LoupeState {
  isOpen: boolean;
  stepId: number;
  title: string;
  standard: string;
  schemaType: SchemaType;
  zoomLevel: number;
}

export const ZOOM_SCALES: Record<number, number> = { 1: 1.0, 2: 1.15, 5: 1.35, 10: 1.6 };

interface LoupeModalProps {
  loupe: LoupeState;
  setLoupe: React.Dispatch<React.SetStateAction<LoupeState>>;
  onClose: () => void;
}

export default function LoupeModal({ loupe, setLoupe, onClose }: LoupeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const hotspots = SCHEMA_HOTSPOTS[loupe.schemaType] ?? [];
  const view = SCHEMA_VIEWS[loupe.schemaType] ?? { w: 500, h: 280 };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Réinitialiser la sélection au changement d'étape
  useEffect(() => {
    setActiveHotspot(null);
  }, [loupe.stepId, loupe.schemaType]);

  // Navigation clavier
  useEffect(() => {
    if (!loupe.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') {
        setLoupe((p) => ({ ...p, zoomLevel: p.zoomLevel === 1 ? 2 : p.zoomLevel === 2 ? 5 : 10 }));
      }
      if (e.key === '-') {
        setLoupe((p) => ({ ...p, zoomLevel: p.zoomLevel === 10 ? 5 : p.zoomLevel === 5 ? 2 : 1 }));
      }
      if (e.key === '0') setLoupe((p) => ({ ...p, zoomLevel: 1 }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [loupe.isOpen, setLoupe, onClose]);

  if (!loupe.isOpen || !mounted) return null;

  const scale = ZOOM_SCALES[loupe.zoomLevel] ?? 1;

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-[#090d16]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-label={`Loupe d'inspection 10x — ${loupe.title}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-cream dark:bg-slate-900 border border-bronze/50 dark:border-amber-600/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] cursor-default"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-cream-border dark:border-slate-800 bg-cream-card dark:bg-slate-900/90">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-bronze/10 dark:bg-amber-500/10 border border-bronze/30 dark:border-amber-500/30 text-bronze dark:text-amber-400 flex items-center justify-center">
              <Search className="w-4.5 h-4.5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-label font-bold px-2 py-0.5 rounded bg-bronze/10 dark:bg-amber-500/20 text-bronze-dark dark:text-amber-300 border border-bronze/25 dark:border-amber-500/30">
                  Loupe d'inspection 10x
                </span>
                <span className="text-xs font-label text-ink-soft dark:text-slate-400 truncate">Norme : {loupe.standard}</span>
              </div>
              <h3 className="font-display text-base sm:text-lg text-ink dark:text-slate-100 truncate mt-0.5">
                {loupe.stepId > 0 ? `Étape ${loupe.stepId < 10 ? '0' : ''}${loupe.stepId} · ` : ''}
                {loupe.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 bg-cream-track dark:bg-slate-800 p-1 rounded-xl border border-cream-border dark:border-slate-700">
              <span className="px-1.5 text-[11px] font-label text-ink-soft dark:text-slate-400">Zoom :</span>
              {[1, 2, 5, 10].map((level) => (
                <button
                  key={level}
                  onClick={() => setLoupe((p) => ({ ...p, zoomLevel: level }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-label font-bold transition ${
                    loupe.zoomLevel === level
                      ? 'bg-bronze text-white shadow'
                      : 'text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-cream-card dark:hover:bg-slate-700'
                  }`}
                >
                  {level}x
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-cream-tile dark:bg-slate-800 hover:bg-cream-track dark:hover:bg-slate-700 text-ink-soft dark:text-slate-300 hover:text-ink dark:hover:text-white flex items-center justify-center transition border border-cream-border dark:border-slate-700"
              aria-label="Fermer la loupe (Échap)"
              title="Fermer la loupe (Échap)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canevas agrandi */}
        <div className="p-4 sm:p-6 overflow-auto flex-1 flex flex-col items-center justify-center bg-[#F3EFE7] dark:bg-[#0b1120] relative min-h-[360px]">
          <div
            className="w-full max-w-4xl transition-transform duration-300 origin-center drop-shadow-xl relative flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            {loupe.stepId === 0 || loupe.schemaType === 'case_assembly' ? (
              <img
                src="/images/emboitage/coupe_technique_reelle.jpg"
                alt="Coupe technique réelle d'emboîtage — Vue réelle d'une montre mécanique"
                className="w-full h-auto max-h-[72vh] object-contain rounded-2xl shadow-xl border border-cream-border dark:border-slate-800"
              />
            ) : (
              <>
                {renderSchemaComponent(loupe.schemaType)}

                {/* Repères / Pastilles interactifs sous la Loupe 10x */}
                {hotspots.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(activeHotspot === h ? null : h);
                    }}
                    style={{ left: `${(h.x / view.w) * 100}%`, top: `${(h.y / view.h) * 100}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border shadow-lg transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-bronze/60 z-10 cursor-pointer ${
                      activeHotspot === h
                        ? 'bg-bronze border-bronze-dark text-white scale-125 ring-2 ring-bronze/50'
                        : 'bg-white/95 dark:bg-slate-800/95 border-bronze/70 text-bronze hover:bg-bronze hover:text-white'
                    }`}
                    aria-label={`Identifier la pièce : ${h.title}`}
                    title={h.title}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                ))}
              </>
            )}
          </div>

          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-cream-card/95 dark:bg-slate-900/95 border border-cream-border dark:border-slate-700 shadow-md backdrop-blur flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-label text-ink-soft dark:text-slate-300">
              Grossissement : <strong className="text-bronze-dark dark:text-amber-400">{loupe.zoomLevel}x</strong>
            </span>
          </div>
        </div>

        {/* Fiche d'identification de la pièce cliquée (visible dans la loupe) */}
        <div className="px-5 sm:px-6 py-3 bg-cream-card dark:bg-slate-900 border-t border-cream-border dark:border-slate-800 min-h-[74px] flex items-center">
          {loupe.stepId === 0 || loupe.schemaType === 'case_assembly' ? (
            <div className="w-full rounded-xl border border-bronze/30 bg-cream-tile dark:bg-slate-800/80 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-bronze dark:bg-amber-400" />
                  <span className="font-label text-xs font-bold text-bronze-dark dark:text-amber-400 uppercase tracking-wider">
                    Micro-Photographie d'Atelier — Vue Réelle en Coupe
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-ink dark:text-slate-200">
                  Coupe transversale réelle d'une montre mécanique suisse : découpe micrométrique de la boîte acier, compression du joint Hytrel de glace, étanchéité de couronne et fond vissé avec joint torique.
                </p>
              </div>
              <span className="shrink-0 text-[10px] font-label font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Normes NIHS 92-20 &amp; ISO 22810
              </span>
            </div>
          ) : activeHotspot ? (
            <div className="w-full relative rounded-xl border border-bronze/40 bg-cream-tile dark:bg-slate-800/80 p-3 pr-10 shadow-sm hl-fade">
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg text-ink-soft hover:text-ink hover:bg-cream-track dark:hover:bg-slate-700 flex items-center justify-center transition"
                aria-label="Fermer la note"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-bronze dark:bg-amber-400" />
                <span className="font-label text-xs font-bold text-bronze-dark dark:text-amber-400 uppercase tracking-wider">
                  {activeHotspot.title}
                </span>
                <span className="text-[10px] font-label font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Composant identifié
                </span>
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-ink dark:text-slate-200">
                {activeHotspot.text}
              </p>
            </div>
          ) : (
            <div className="w-full rounded-xl border border-dashed border-cream-border dark:border-slate-800 bg-cream-tile/60 dark:bg-slate-900/40 p-2.5 sm:p-3 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-bronze dark:text-amber-400 shrink-0" />
              <p className="text-xs text-ink-soft dark:text-slate-400">
                Cliquez sur n'importe quel repère du schéma sous la loupe pour connaître la pièce, son outillage, son couple et sa tolérance.
              </p>
            </div>
          )}
        </div>

        {/* Pied */}
        <div className="px-6 py-4 bg-cream-card dark:bg-slate-900/90 border-t border-cream-border dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-label text-ink-soft dark:text-slate-400">
            <Eye className="w-4 h-4 text-bronze dark:text-amber-400 shrink-0" />
            <span>Examen micro-mécanique officiel : chaque trait, tolérance et cote respecte la norme suisse.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-bronze hover:bg-bronze-dark text-white font-label text-xs font-bold transition shadow"
          >
            Retour à l'établi
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
