'use client';

/**
 * HorloLearn — Registre des schémas techniques + calque de points chauds
 * (hotspots cliquables : pédagogie d'atelier horloger suisse, chaque zone du dessin documente
 * un geste, une cote ou un piège).
 */

import { useState } from 'react';
import { MapPin, X, ZoomIn } from 'lucide-react';
import {
  SCHEMA_HOTSPOTS,
  SCHEMA_VIEWS,
  type Hotspot,
  type SchemaType,
} from './data';
import { DialFeetSVG, DialProtectionSVG, GrazingBeamSVG, HandsClearanceSVG } from './schemas-a';
import { CaseAssemblySVG, GasketsCasingSVG, StemCuttingSVG, WaterproofTestingSVG } from './schemas-b';
import {
  WorkshopKitSVG,
  AutoModuleRemovalSVG,
  DialFeetSupportSVG,
  LimitationFingerSVG,
  DateJumpSyncSVG,
  HoursMinutesFittingSVG,
  SecondsReamingSVG,
  SafeStemRelease1515SVG,
  CleanlinessProtocolSVG,
  ArkansasConeSVG,
  CasingFinalSVG,
} from './schemas-c';

export function renderSchemaComponent(type: SchemaType) {
  switch (type) {
    case 'workshop_kit':
      return <WorkshopKitSVG />;
    case 'auto_module_removal':
      return <AutoModuleRemovalSVG />;
    case 'dial_feet':
      return <DialFeetSVG />;
    case 'dial_feet_support':
      return <DialFeetSupportSVG />;
    case 'limitation_finger':
      return <LimitationFingerSVG />;
    case 'date_jump_sync':
      return <DateJumpSyncSVG />;
    case 'hours_minutes_fitting':
      return <HoursMinutesFittingSVG />;
    case 'seconds_reaming':
      return <SecondsReamingSVG />;
    case 'safe_stem_release':
      return <SafeStemRelease1515SVG />;
    case 'cleanliness_protocol':
      return <CleanlinessProtocolSVG />;
    case 'arkansas_cone':
      return <ArkansasConeSVG />;
    case 'casing_final':
      return <CasingFinalSVG />;
    case 'hands_clearance':
      return <HandsClearanceSVG />;
    case 'dial_protection':
      return <DialProtectionSVG />;
    case 'grazing_beam':
      return <GrazingBeamSVG />;
    case 'gaskets_casing':
      return <GasketsCasingSVG />;
    case 'case_assembly':
      return <CaseAssemblySVG />;
    case 'stem_cutting':
      return <StemCuttingSVG />;
    case 'waterproof_testing':
      return <WaterproofTestingSVG />;
    default:
      return <WorkshopKitSVG />;
  }
}

interface SchemaWithHotspotsProps {
  type: SchemaType;
  /** Désactive le calque interactif */
  interactive?: boolean;
  /** Déclencheur d'ouverture de la loupe d'inspection 10x */
  onOpenLoupe?: () => void;
}

export function SchemaWithHotspots({ type, interactive = true, onOpenLoupe }: SchemaWithHotspotsProps) {
  const [active, setActive] = useState<Hotspot | null>(null);
  const hotspots = SCHEMA_HOTSPOTS[type] ?? [];
  const view = SCHEMA_VIEWS[type] ?? { w: 500, h: 280 };

  return (
    <div className="space-y-3">
      <div className="relative group rounded-xl overflow-hidden">
        {renderSchemaComponent(type)}

        {interactive &&
          hotspots.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(active === h ? null : h)}
              style={{ left: `${(h.x / view.w) * 100}%`, top: `${(h.y / view.h) * 100}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-bronze/60 z-10 ${
                active === h
                  ? 'bg-bronze border-bronze-dark text-white scale-110 ring-2 ring-bronze/40'
                  : 'bg-white/95 dark:bg-slate-800/95 border-bronze/60 text-bronze hover:bg-bronze hover:text-white'
              }`}
              aria-label={`Point documenté : ${h.title}`}
              title={h.title}
            >
              <MapPin className="w-3.5 h-3.5" />
            </button>
          ))}

        {onOpenLoupe && (
          <button
            type="button"
            onClick={onOpenLoupe}
            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black/90 text-white text-[11px] font-label font-bold backdrop-blur-sm flex items-center gap-1.5 shadow-md border border-white/20 transition hover:scale-105 z-20 cursor-zoom-in"
            title="Ouvrir la loupe d'inspection 10x"
          >
            <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            <span>Loupe 10x</span>
          </button>
        )}
      </div>

      {/* Panneau d'explication du point chaud sélectionné */}
      {interactive && (
        <div className="min-h-[74px]">
          {active ? (
            <div className="relative rounded-xl border border-bronze/40 bg-cream-card dark:bg-slate-900/90 p-3.5 pr-9 shadow-sm hl-fade">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg text-ink-soft hover:text-ink hover:bg-cream-track dark:hover:bg-slate-800 flex items-center justify-center transition"
                aria-label="Fermer la note"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                <span className="font-label text-xs font-bold text-bronze-dark dark:text-amber-400 uppercase tracking-wider">{active.title}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-soft dark:text-slate-300">{active.text}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-cream-border dark:border-slate-800 bg-cream-tile/60 dark:bg-slate-900/40 p-3.5 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-bronze shrink-0" />
              <p className="text-xs text-ink-soft/80 dark:text-slate-400">
                Cliquez sur les pastilles de repère pour afficher les secrets d'établi, tolérances micrométriques et pièges à éviter.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
