'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronRight,
  ArrowLeft,
  Clock,
  Moon,
  Sparkles,
  ZoomIn,
  Sliders
} from 'lucide-react';

export default function CalendrierPerpetuelPage() {
  const [selectedYear, setSelectedYear] = useState<number>(4);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(1);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const months = [
    { name: 'Janvier', days: 31, depth: 0 },
    { name: 'Février', days: selectedYear === 4 ? 29 : 28, depth: selectedYear === 4 ? 1.6 : 2.4 },
    { name: 'Mars', days: 31, depth: 0 },
    { name: 'Avril', days: 30, depth: 0.8 },
    { name: 'Mai', days: 31, depth: 0 },
    { name: 'Juin', days: 30, depth: 0.8 },
    { name: 'Juillet', days: 31, depth: 0 },
    { name: 'Août', days: 31, depth: 0 },
    { name: 'Septembre', days: 30, depth: 0.8 },
    { name: 'Octobre', days: 31, depth: 0 },
    { name: 'Novembre', days: 30, depth: 0.8 },
    { name: 'Décembre', days: 31, depth: 0 }
  ];

  const currentMonth = months[selectedMonthIdx];
  const slot48Index = (selectedYear - 1) * 12 + selectedMonthIdx;

  const features = [
    {
      title: 'Indication automatique du jour & de la date',
      desc: 'Entraînement coordonné de l’étoile des 7 jours et du rochet de quantième à 31 dents par le Grand Levier.',
      icon: Clock
    },
    {
      title: 'Palpage mécanique des mois courts',
      desc: 'Reconnaissance automatique des mois de 28, 29, 30 et 31 jours par la profondeur des crans de la came.',
      icon: Calendar
    },
    {
      title: 'Cycle bissextile de 1 461 jours',
      desc: 'Came programmée sur 48 mois (ou roue de 12 mois à satellite 4:1) sans correction jusqu’au 1er mars 2100.',
      icon: Sparkles
    },
    {
      title: 'Phase de lune astronomique (135 dents)',
      desc: 'Disque lunaire à 135 dents offrant une précision d’un seul jour d’écart en 122 ans et 45 jours.',
      icon: Moon
    }
  ];

  const timeline = [
    { year: '1762', event: 'Premiers travaux sur la mémoire mécanique des longueurs de mois', maker: 'Thomas Mudge' },
    { year: '1889', event: 'Brevet du mécanisme de quantième perpétuel instantané de poche', maker: 'Patek Philippe' },
    { year: '1925', event: 'Première montre-bracelet à calendrier perpétuel (N° 97 975)', maker: 'Patek Philippe' },
    { year: '1955', event: 'Production en série du quantième perpétuel bracelet (Réf. 2497)', maker: 'Horlogerie Genevoise' },
    { year: '1985', event: 'Calendrier perpétuel autonome réglable uniquement par la couronne', maker: 'Kurt Klaus (IWC)' }
  ];

  const brands = [
    { name: 'Patek Philippe', specialty: 'Pionnier du QP bracelet (1925)', heritage: 'Architecture Grand Levier classique' },
    { name: 'Vacheron Constantin', specialty: 'Calibre 1120 QP ultra-plat (4.05 mm)', heritage: 'Tradition genevoise depuis 1755' },
    { name: 'Audemars Piguet', specialty: 'Calibre 2120/2800 & RD#2 ultra-plat', heritage: 'Vallée de Joux depuis 1875' },
    { name: 'IWC Schaffhausen', specialty: 'Module Kurt Klaus synchronisé par couronne', heritage: 'Affichage séculaire à 4 chiffres' },
    { name: 'A. Lange & Söhne', specialty: 'Langematik Perpetual & Terraluna', heritage: 'Grande Date & remise à zéro Zero-Reset' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
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
              <span>Grande Complication • Programme Mécanique sur 4 Ans (1 461 Jours)</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Le Calendrier Perpétuel <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                La Mémoire Mécanique du Temps
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Le calendrier perpétuel (QP) constitue un véritable ordinateur mécanique analogique : sa came à 48 crans encode les longueurs irrégulières des mois et le cycle bissextile quadriennal sans aucune intervention humaine jusqu’en l’an 2100.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Cartographie de la Roue de 48 Mois (4 × 12 Crans)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Explorateur SVG du Programme Bissextile sur 4 Années
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Choisissez l’année du cycle quadriennal (Années 1 à 3 communes vs Année 4 bissextile) et le mois pour inspecter l’encoche active sur la roue de 48 mois.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[1, 2, 3, 4].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedYear === yr
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {yr === 4 ? 'Année 4 (Bissextile ★)' : `Année ${yr}`}
                </button>
              ))}
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  loupe10x
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <svg
                viewBox="0 0 420 380"
                className="w-full h-auto transition-transform duration-300"
                style={{
                  transform: loupe10x ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: '210px 190px'
                }}
              >
                <g transform="translate(210, 190)">
                  <circle cx="0" cy="0" r="145" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="122" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

                  {Array.from({ length: 48 }).map((_, idx) => {
                    const angleDeg = idx * 7.5 - 90;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const mInYear = idx % 12;
                    const yrNum = Math.floor(idx / 12) + 1;
                    let rOuter = 122;
                    if (mInYear === 1) {
                      rOuter = yrNum === 4 ? 105 : 94;
                    } else if ([3, 5, 8, 10].includes(mInYear)) {
                      rOuter = 112;
                    }
                    const isSelected = idx === slot48Index;
                    return (
                      <line
                        key={idx}
                        x1={80 * Math.cos(angleRad)}
                        y1={80 * Math.sin(angleRad)}
                        x2={rOuter * Math.cos(angleRad)}
                        y2={rOuter * Math.sin(angleRad)}
                        stroke={isSelected ? '#38bdf8' : mInYear === 1 ? '#f43f5e' : '#fbbf24'}
                        strokeWidth={isSelected ? '5' : '2.5'}
                      />
                    );
                  })}

                  <circle cx="0" cy="0" r="78" fill="#060a12" stroke="#475569" strokeWidth="2" />
                  <text x="0" y="-12" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    CAME 48 MOIS
                  </text>
                  <text x="0" y="8" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                    {currentMonth.name} (An {selectedYear})
                  </text>
                  <text x="0" y="28" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
                    {currentMonth.days} Jours • Cran #{slot48Index + 1}/48
                  </text>
                </g>
              </svg>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {months.map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMonthIdx(idx)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedMonthIdx === idx
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-md'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-500'
                    }`}
                  >
                    <div className="text-xs font-bold">{m.name}</div>
                    <div className="text-[10px] font-mono opacity-80">{m.days} jours</div>
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                  Analyse du Cran #{slot48Index + 1} / 48 • {currentMonth.name} (Année {selectedYear})
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Profondeur d’encoche usinée : <strong>{currentMonth.depth.toFixed(2)} mm</strong>. À la fin du <strong>{currentMonth.days} {currentMonth.name}</strong>, le Grand Levier tire{' '}
                  <strong>{32 - currentMonth.days} dent(s)</strong> sur l’étoile de quantième à 31 dents pour afficher directement le <strong>1er</strong> du mois suivant.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/theorie/complications/quantieme"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition-all"
                >
                  <span>Ouvrir le Simulateur du Grand Levier (/quantieme)</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0c101b] rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">Premier Brevet Poche</p>
            <p className="text-4xl font-mono font-extrabold text-amber-600 dark:text-amber-400 mb-1">1889</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Patek Philippe (Brevet suisse N° 925)</p>
          </div>
          <div className="bg-white dark:bg-[#0c101b] rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">Complexité d’Établi</p>
            <p className="text-4xl font-mono font-extrabold text-amber-600 dark:text-amber-400 mb-1">180 à 350</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Composants additionnels de cadrature</p>
          </div>
          <div className="bg-white dark:bg-[#0c101b] rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-md">
            <p className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-1">Autonomie Calendaire</p>
            <p className="text-4xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">2100</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Année séculaire non-bissextile</p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Caractéristiques Techniques de la Cadrature
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-[#0c101b] rounded-2xl p-6 shadow-md border-2 border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/15 border border-amber-500/30 p-3 rounded-xl">
                      <Icon className="text-amber-600 dark:text-amber-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white dark:bg-[#0c101b] rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-slate-200 dark:border-slate-800 space-y-8">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Chronologie Historique du Calendrier Perpétuel
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-5 items-start">
                <div className="w-16 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm flex-shrink-0">
                  {item.year}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{item.event}</p>
                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400">{item.maker}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Manufactures de Référence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#0c101b] rounded-2xl p-6 shadow-md border-2 border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {brand.name}
                </h3>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {brand.specialty}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {brand.heritage}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-4">
          <Link
            href="/theorie/complications"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-all shadow-md text-sm font-bold"
          >
            <ArrowLeft size={18} />
            <span>Retour aux Complications</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
