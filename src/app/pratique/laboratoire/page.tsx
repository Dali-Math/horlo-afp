'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  Activity,
  Cog,
  Wrench,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Award,
} from 'lucide-react';
import WitschiSimulator from './WitschiSimulator';
import EscapementKinematics from './EscapementKinematics';
import CasingAssistant from './CasingAssistant';

type LabTab = 'witschi' | 'escapement' | 'casing';

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
            <span>Retour à l’Atelier Pratique</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Banc d’Essai d’Établi · Normes NIHS &amp; ISO 3159 COSC</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Laboratoire de Chronométrie <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                  Witschi, Échappement &amp; Emboîtage
                </span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Plateforme expérimentale complète de l’artisan horloger : simulation acoustique en temps réel du <strong>Chrono-Comparateur Witschi Watch Expert</strong> avec correction Etachron, décomposition cinématique en <strong>5 phases de l’échappement suisse</strong> et calculateur micrométrique de <strong>mise à tige &amp; pose d’aiguilles</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 max-w-xs font-medium">
              <strong>Précision d’Établi :</strong> « La chronométrie ne tolère aucun à-peu-près : un repère au-delà de 0.4 ms ou une aiguille qui pique d’un demi-degré ruinent le travail de tout un calibre. »
            </div>
          </div>

          {/* Navigation des 3 Modules du Master Lab */}
          <div className="mt-8 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#131822] border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('witschi')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'witschi'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>1. Chrono-Comparateur Witschi</span>
            </button>

            <button
              onClick={() => setActiveTab('escapement')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'escapement'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Cog className="w-4 h-4" />
              <span>2. Échappement à Ancre (5 Phases)</span>
            </button>

            <button
              onClick={() => setActiveTab('casing')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'casing'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>3. Emboîtage, Tige &amp; Aiguilles</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTENU DU MODULE SÉLECTIONNÉ --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'witschi' && <WitschiSimulator />}
        {activeTab === 'escapement' && <EscapementKinematics />}
        {activeTab === 'casing' && <CasingAssistant />}
      </main>
    </div>
  );
}
