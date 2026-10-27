'use client';

/**
 * HorloLearn — Registre des schémas techniques + calque de points chauds
 * (hotspots cliquables : pédagogie d'atelier, chaque zone du dessin documente
 * un geste, une cote ou un piège).
 */

import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import {
  SCHEMA_HOTSPOTS,
  SCHEMA_VIEWS,
  type Hotspot,
  type SchemaType,
} from './data';
import { DialFeetSVG, DialProtectionSVG, GrazingBeamSVG, HandsClearanceSVG } from './schemas-a';
import { CaseAssemblySVG, GasketsCasingSVG, StemCuttingSVG, WaterproofTestingSVG } from './schemas-b';

export function renderSchemaComponent(type: SchemaType) {
  switch (type) {
    case 'dial_feet':
      return <DialFeetSVG />;
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
      return <CaseAssemblySVG />;
  }
}

interface SchemaWithHotspotsProps {
  type: SchemaType;
  /** Désactive le calque (ex. dans la loupe plein écran) */
  interactive?: boolean;
}

export function SchemaWithHotspots({ type, interactive = true }: SchemaWithHotspotsProps) {
  const [active, setActive] = useState<Hotspot | null>(null);
  const hotspots = SCHEMA_HOTSPOTS[type] ?? [];
  const view = SCHEMA_VIEWS[type];

  return (
    <div className="space-y-3">
      <div className="relative">
        {renderSchemaComponent(type)}

        {interactive &&
          hotspots.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(active === h ? null : h)}
              style={{ left: `${(h.x / view.w) * 100}%`, top: `${(h.y / view.h) * 100}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-bronze/60 ${
                active === h
                  ? 'bg-bronze border-bronze-dark text-white scale-110'
                  : 'bg-white/95 border-bronze/60 text-bronze hover:bg-bronze hover:text-white'
              }`}
              aria-label={`Point documenté : ${h.title}`}
              title={h.title}
            >
              <MapPin className="w-3.5 h-3.5" />
            </button>
          ))}
      </div>

      {/* Panneau d'explication du point chaud sélectionné */}
      {interactive && (
        <div className="min-h-[74px]">
          {active ? (
            <div className="relative rounded-xl border border-bronze/40 bg-cream-card p-3.5 pr-9 shadow-sm hl-fade">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg text-ink-soft hover:text-ink hover:bg-cream-track flex items-center justify-center transition"
                aria-label="Fermer la note"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                <span className="font-label text-xs font-bold text-bronze-dark uppercase tracking-wider">{active.title}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-soft">{active.text}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-cream-border bg-cream-tile/60 p-3.5 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-bronze shrink-0" />
              <p className="text-[13px] text-ink-soft leading-snug">
                <strong className="text-ink">Schéma documenté</strong> — cliquez sur les pastilles{' '}
                <span className="font-label text-bronze-dark font-bold">🗺</span> posées sur le dessin pour révéler le geste, la cote ou le piège correspondant.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
