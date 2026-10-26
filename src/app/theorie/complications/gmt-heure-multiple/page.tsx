'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Plane,
  Clock,
  Compass,
  ZoomIn,
  HelpCircle
} from 'lucide-react';

const GMT_ARCHITECTURES = [
  {
    type: '« True GMT » / Traveler GMT (Aiguille 12h Sautante)',
    examples: 'Rolex Cal. 3186 / 3285, Omega Co-Axial 8900, Grand Seiko 9S86',
    mechanism:
      'En position intermédiaire de couronne (T2), le porteur fait sauter l’aiguille locale de 12 heures par pas d’exactement 1 heure grâce à une étoile à 12 dents et un sautoir, en avant ou en arrière, couplée au disque de quantième. L’aiguille 24h (heure de référence) et le balancier ne s’arrêtent jamais.',
    verdict: 'Architecture reine pour le voyageur franchissant un fuseau horaire en vol.'
  },
  {
    type: '« Office GMT » / Caller GMT (Aiguille 24h Indépendante)',
    examples: 'ETA 2893-2, Sellita SW330-2',
    mechanism:
      'En position T2, la couronne déplace directement l’aiguille 24 heures par crans d’une heure dans un sens et corrige la date dans l’autre sens, tandis que l’aiguille principale de 12 heures reste solidaire de la minuterie.',
    verdict: 'Idéal depuis son bureau pour suivre le fuseau horaire d’un interlocuteur distant.'
  }
];

const TIMEZONES = [
  { city: 'New York (JFK)', offset: -5 },
  { city: 'Londres (UTC)', offset: 0 },
  { city: 'Genève (GVA)', offset: 1 },
  { city: 'Dubaï (DXB)', offset: 4 },
  { city: 'Tokyo (HND)', offset: 9 },
  { city: 'Sydney (SYD)', offset: 10 }
];

export default function GMTHeureMultiplePage() {
  const [utcHour, setUtcHour] = useState<number>(14); // 14:20 UTC
  const [localOffset, setLocalOffset] = useState<number>(1); // Genève UTC+1
  const [bezelOffset, setBezelOffset] = useState<number>(0); // Lunette 24h
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const localHour24 = (utcHour + localOffset + 24) % 24;
  const localHour12 = localHour24 % 12 || 12;
  const thirdZoneHour24 = (utcHour + bezelOffset + 24) % 24;

  // Angles horlogers en degrés (12h en haut = 0°)
  const gmt24Angle = (utcHour / 24) * 360 + (20 / 60) * 15; // 1 tour en 24h (15°/h)
  const local12Angle = ((localHour24 % 12) / 12) * 360 + (20 / 60) * 30; // 1 tour en 12h (30°/h)
  const bezelRotationAngle = -bezelOffset * 15; // 15° par fuseau sur lunette 24h

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b12] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-[#080b12]/85 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Théorie</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href="/theorie/complications"
              className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Complications
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-amber-600 dark:text-amber-400">GMT &amp; Heure Universelle</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            <Globe className="w-3.5 h-3.5" />
            Démultiplication 24h &amp; Étoile à 12 Dents
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* HERO ÉDITORIAL CONFORME /THEORIE */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Plane className="w-3.5 h-3.5" />
            Complication de Navigation Aérienne • 3 Fuseaux Horaires Simultanés
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Complication GMT &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Cinématique de la Roue 24 Heures
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Née en 1954 pour les équipages long-courriers de la Pan Am, la complication GMT associe une roue des heures classique (1 tour en 12h) à une roue supplémentaire démultipliée de moitié (1 tour en 24h = 15°/heure) et un mécanisme de saut horaire par étoile à 12 dents.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* SIMULATEUR CINÉMATIQUE SVG : TRUE GMT, ÉTOILE 12 DENTS & LUNETTE 24H      */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Compass className="w-4 h-4" />
                <span>Simulateur Cinématique SVG • Saut Horaire Indépendant &amp; Lunette 24h</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Mécanisme « True GMT » à Étoile 12 Dents &amp; Lecture de 3 Fuseaux
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLocalOffset((prev) => prev - 1)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:border-amber-500 border border-slate-300 dark:border-slate-700"
              >
                ↺ Saut -1h (Aiguille Locale)
              </button>
              <button
                onClick={() => setLocalOffset((prev) => prev + 1)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 text-slate-950 shadow-sm"
              >
                ↻ Saut +1h (Étoile 12 Dents)
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  loupe10x
                    ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>{loupe10x ? 'Loupe 10x Active' : 'Loupe 10x'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                <svg
                  viewBox="0 0 720 370"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                    transformOrigin: '515px 185px'
                  }}
                >
                  {/* GAUCHE : CADRAN GMT + LUNETTE BICOLORE 24H ROTATIVE */}
                  <g transform="translate(195, 185)">
                    {/* Lunette bicolore Nuit (Bleu) / Jour (Rouge) graduée 24h */}
                    <g transform={`rotate(${bezelRotationAngle})`}>
                      <path d="M -145 0 A 145 145 0 0 1 145 0 L 115 0 A 115 115 0 0 0 -115 0 Z" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                      <path d="M -145 0 A 145 145 0 0 0 145 0 L 115 0 A 115 115 0 0 1 -115 0 Z" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
                      <text x="0" y="-124" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        24
                      </text>
                      <text x="128" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        6
                      </text>
                      <text x="0" y="133" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        12
                      </text>
                      <text x="-128" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        18
                      </text>
                    </g>

                    {/* Cadran 12h interne */}
                    <circle cx="0" cy="0" r="112" fill="#090d16" stroke="#475569" strokeWidth="2" />

                    {/* Aiguille GMT 24h Rouge à flèche luminescente */}
                    <g transform={`rotate(${gmt24Angle})`}>
                      <line x1="0" y1="0" x2="0" y2="-98" stroke="#ef4444" strokeWidth="3.5" />
                      <polygon points="0,-108 -9,-90 9,-90" fill="#ef4444" stroke="#fecdd3" strokeWidth="1.5" />
                    </g>

                    {/* Aiguille des Heures Locales 12h (Dorée, sautante par pas de 30°) */}
                    <g transform={`rotate(${local12Angle})`}>
                      <line x1="0" y1="0" x2="0" y2="-68" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                    </g>

                    {/* Aiguille des Minutes (fixée à :20) */}
                    <g transform="rotate(120)">
                      <line x1="0" y1="0" x2="0" y2="-92" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
                    </g>

                    <circle cx="0" cy="0" r="8" fill="#fbbf24" stroke="#090d16" strokeWidth="2" />
                  </g>

                  {/* DROITE : COUPE CINÉMATIQUE DE L'ÉTOILE À 12 DENTS & ROUE 24H */}
                  <g transform="translate(525, 185)">
                    <text x="0" y="-142" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      MÉCANISME DE SAUT HORAIRE (ÉTOILE 12 DENTS)
                    </text>

                    {/* Roue GMT 24h (Z = 48 dents, rapport 1:2) */}
                    <circle cx="0" cy="0" r="102" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 3" />
                    <text x="0" y="-82" fill="#f87185" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Roue 24 Heures (15° / heure)
                    </text>

                    {/* Roue des heures locales (12h) + Étoile à 12 dents */}
                    <g transform={`rotate(${local12Angle})`}>
                      <circle cx="0" cy="0" r="68" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <line
                          key={idx}
                          x1="0"
                          y1="-42"
                          x2="0"
                          y2="-68"
                          stroke="#fde047"
                          strokeWidth="4"
                          transform={`rotate(${idx * 30})`}
                        />
                      ))}
                    </g>

                    {/* Sautoir d'indexation horaire (maintient les sauts francs de 30°) */}
                    <path d="M -95 95 L -42 46" stroke="#34d399" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="-42" cy="46" r="6" fill="#10b981" stroke="#ecfdf5" strokeWidth="1.5" />
                    <text x="0" y="128" fill="#34d399" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Sautoir d’étoile : Saut franc de 30° (= 1h locale)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* PANNEAU DES 3 FUSEAUX HORAIRES */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 font-mono">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">
                    1. HEURE LOCALE (AIGUILLE 12H SAUTANTE)
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {String(localHour12).padStart(2, '0')}h20 ({localHour24 >= 12 ? 'PM' : 'AM'} • UTC{localOffset >= 0 ? `+${localOffset}` : localOffset})
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <div className="text-[10px] text-rose-700 dark:text-rose-300 font-bold">
                    2. HEURE DE RÉFÉRENCE (AIGUILLE 24H ROUGE)
                  </div>
                  <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
                    {String(utcHour).padStart(2, '0')}h20 UTC
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 space-y-2">
                  <div className="text-[10px] text-sky-700 dark:text-sky-300 font-bold">
                    3. LUNETTE ROTATIVE 24H (UTC{bezelOffset >= 0 ? `+${bezelOffset}` : bezelOffset})
                  </div>
                  <div className="text-lg font-extrabold text-sky-600 dark:text-sky-400">
                    {String(thirdZoneHour24).padStart(2, '0')}h20 sur la Lunette
                  </div>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={1}
                    value={bezelOffset}
                    onChange={(e) => setBezelOffset(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {TIMEZONES.map((tz) => (
                    <button
                      key={tz.city}
                      onClick={() => setLocalOffset(tz.offset)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                        localOffset === tz.offset
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {tz.city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARATIF : TRUE GMT VS OFFICE GMT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GMT_ARCHITECTURES.map((arch) => (
            <div
              key={arch.type}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{arch.type}</h3>
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400">{arch.examples}</div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{arch.mechanism}</p>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                {arch.verdict}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
