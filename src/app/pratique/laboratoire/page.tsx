'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  Activity,
  Cog,
  Wrench,
  Sliders,
  Layers,
  Sparkles,
} from 'lucide-react';
import WitschiSimulator from './WitschiSimulator';
import EscapementKinematics from './EscapementKinematics';
import CasingAssistant from './CasingAssistant';
import KeylessSimulator from './KeylessSimulator';
import BenchPressSimulator from './BenchPressSimulator';
import GearTrainKinematics from './GearTrainKinematics';
import NihsToleranceCalculator from './NihsToleranceCalculator';

type LabTab =
  | 'witschi'
  | 'escapement'
  | 'keyless'
  | 'bench'
  | 'gear-train'
  | 'casing'
  | 'nihs';

export default function LaboratoirePage() {
  const [activeTab, setActiveTab] = useState<LabTab>('witschi');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l&apos;Atelier Pratique</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Banc d&apos;Essai d&apos;Établi — Normes NIHS &amp; ISO 3159 COSC</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Grand Laboratoire Horloger <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                  Métrologie, Cinématique &amp; Établi d&apos;Artisan
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Plateforme expérimentale complète de l&apos;artisan horloger : simulation acoustique en temps réel du <strong>Chrono-Comparateur Witschi Watch Expert</strong>, cinématique de l&apos;<strong>échappement suisse en 5 phases</strong>, mécanisme de <strong>remontoir &amp; tirette ETA 2824-2</strong>, banc d&apos;<strong>alésage à l&apos;équarrissoir &amp; potence Robur</strong>, chaîne dynamique du <strong>rouage</strong> et <strong>calculateur d&apos;ajustements ISO 286 / NIHS</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 max-w-xs font-medium">
              <strong>Précision d&apos;Établi :</strong> « La chronométrie ne tolère aucun à-peu-près : un repère au-delà de 0.4 ms ou un alésoir forcé d&apos;un millième ruinent le travail de tout un calibre. »
            </div>
          </div>

          {/* Navigation des 7 Bacs d'Essai du Grand Laboratoire */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#131822] border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('witschi')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'witschi'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>1. Witschi IV</span>
            </button>

            <button
              onClick={() => setActiveTab('escapement')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'escapement'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Cog className="w-3.5 h-3.5" />
              <span>2. Échappement</span>
            </button>

            <button
              onClick={() => setActiveTab('keyless')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'keyless'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3. Remontoir 2824</span>
            </button>

            <button
              onClick={() => setActiveTab('bench')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'bench'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>4. Banc Équarrissoir</span>
            </button>

            <button
              onClick={() => setActiveTab('gear-train')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'gear-train'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>5. Rouage &amp; A/h</span>
            </button>

            <button
              onClick={() => setActiveTab('casing')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'casing'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>6. Mise à Tige</span>
            </button>

            <button
              onClick={() => setActiveTab('nihs')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'nihs'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>7. Ajustements ISO</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTENU DU MODULE SÉLECTIONNÉ --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'witschi' && <WitschiSimulator />}
        {activeTab === 'escapement' && <EscapementKinematics />}
        {activeTab === 'keyless' && <KeylessSimulator />}
        {activeTab === 'bench' && <BenchPressSimulator />}
        {activeTab === 'gear-train' && <GearTrainKinematics />}
        {activeTab === 'casing' && <CasingAssistant />}
        {activeTab === 'nihs' && <NihsToleranceCalculator />}
      </main>
    </div>
  );
}
