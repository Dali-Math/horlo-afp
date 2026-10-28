'use client';

/**
 * HorloLearn — Loupe d'inspection 10x
 * Modale plein écran portée directement sur document.body via createPortal :
 * Schéma technique agrandi avec zoom par paliers (1x / 2x / 5x / 10x),
 * navigation clavier Échap / + / − / 0, et support complet Clair/Sombre.
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Eye, X } from 'lucide-react';
import { renderSchemaComponent } from '@/lib/emboitage/schemas';
import type { SchemaType } from '@/lib/emboitage/data';

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
        <div className="p-5 sm:p-8 overflow-auto flex-1 flex flex-col items-center justify-center bg-[#F3EFE7] dark:bg-[#0b1120] relative min-h-[360px]">
          <div
            className="w-full max-w-3xl transition-transform duration-300 origin-center drop-shadow-xl"
            style={{ transform: `scale(${scale})` }}
          >
            {renderSchemaComponent(loupe.schemaType)}
          </div>

          <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-auto px-3.5 py-2 rounded-xl bg-cream-card/95 dark:bg-slate-900/95 border border-cream-border dark:border-slate-700 shadow-lg backdrop-blur flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-label text-ink-soft dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Grossissement : <strong className="text-bronze-dark dark:text-amber-400">{loupe.zoomLevel}x</strong>
            </span>
            <div className="flex items-center gap-1 sm:hidden">
              {[1, 2, 5, 10].map((level) => (
                <button
                  key={level}
                  onClick={() => setLoupe((p) => ({ ...p, zoomLevel: level }))}
                  className={`px-2 py-1 rounded-lg text-[11px] font-label font-bold transition ${
                    loupe.zoomLevel === level ? 'bg-bronze text-white' : 'bg-cream-track dark:bg-slate-800 text-ink-soft dark:text-slate-300'
                  }`}
                >
                  {level}x
                </button>
              ))}
            </div>
          </div>
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
