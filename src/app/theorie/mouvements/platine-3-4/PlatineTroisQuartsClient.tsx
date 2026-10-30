'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Compass,
  Layers,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  Sliders,
  Maximize2,
  Sparkles,
  Info,
  Scale,
  RotateCcw,
  Award
} from 'lucide-react';

type PlatineTab = 'schema' | 'comparatif' | 'etabli' | 'maillechort';

export default function PlatineTroisQuartsClient() {
  const [activeTab, setActiveTab] = useState<PlatineTab>('schema');
  const [selectedZone, setSelectedZone] = useState<string>('chaton');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* HALO HAUTE HORLOGERIE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#E2B44F]/10 via-[#D4AF37]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 relative z-10 space-y-10">

        {/* --- FIL D'ARIANE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-amber-500 transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <Link href="/theorie" className="hover:text-amber-500 transition-colors">Théorie Horlogère</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <Link href="/theorie/mouvements" className="hover:text-amber-500 transition-colors">Mouvements &amp; Organes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-amber-500 font-semibold">La Platine 3/4</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Haute Horlogerie Saxonne (1864)</span>
            </span>
            <Link
              href="/pratique/calibre-3d"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Comparer avec les ponts du 6497</span>
            </Link>
          </div>
        </div>

        {/* --- TITRE & EN-TÊTE --- */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-mono">
            <span>Architecture &amp; Écoles Horlogères</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Tradition Glashütte</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-slate-900 dark:text-white">
            La Platine 3/4 (Trois-Quarts)
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            Inventée en 1864 par Ferdinand Adolph Lange à Glashütte (Saxe), la <strong>platine trois-quarts</strong> remplace l&apos;ensemble des ponts séparés par un unique pont monumental couvrant environ 270° du calibre. Bâtie dans un <strong>maillechort non traité (*German Silver*)</strong> à la patine d&apos;or blanc naturelle et sertie de <strong>chatons en or 18k vissés</strong>, elle offre une rigidité géométrique absolue mais impose à l&apos;horloger l&apos;un des montages de rouage les plus exigeants de la profession.
          </p>
        </div>

        {/* --- COMMUTATEUR D'ONGLETS --- */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'schema'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>1. Architecture &amp; Schéma SVG Interactif</span>
          </button>

          <button
            onClick={() => setActiveTab('comparatif')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'comparatif'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Duel d&apos;Écoles : Platine 3/4 vs Ponts Suisses</span>
          </button>

          <button
            onClick={() => setActiveTab('etabli')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'etabli'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>3. Défi d&apos;Établi : L&apos;Assemblage Simultané</span>
          </button>

          <button
            onClick={() => setActiveTab('maillechort')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'maillechort'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. Métallurgie du Maillechort (German Silver)</span>
          </button>
        </div>

        {/* ================= ONGLET 1 : SCHÉMA SVG INTERACTIF ================= */}
        {activeTab === 'schema' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1017] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Plan d&apos;Établi : Platine Trois-Quarts (Vue Dos)
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-500 font-semibold">270° de couverture</span>
              </div>

              {/* Schéma SVG Platine 3/4 */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                <svg viewBox="0 0 500 420" className="w-full h-full select-none">
                  <defs>
                    {/* Dégradé Maillechort (aspect argenté chaud champagne) */}
                    <linearGradient id="germanSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3efe6" />
                      <stop offset="30%" stopColor="#e2dcd0" />
                      <stop offset="70%" stopColor="#c5bdb0" />
                      <stop offset="100%" stopColor="#b4aa9b" />
                    </linearGradient>
                    {/* Côtes de Glashütte (bandes obliques) */}
                    <linearGradient id="cotesGlashutte" x1="0%" y1="0%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#e2dcd0" />
                      <stop offset="8%" stopColor="#c5bdb0" />
                      <stop offset="16%" stopColor="#e2dcd0" />
                      <stop offset="24%" stopColor="#c5bdb0" />
                      <stop offset="32%" stopColor="#e2dcd0" />
                      <stop offset="40%" stopColor="#c5bdb0" />
                      <stop offset="48%" stopColor="#e2dcd0" />
                      <stop offset="56%" stopColor="#c5bdb0" />
                      <stop offset="64%" stopColor="#e2dcd0" />
                      <stop offset="72%" stopColor="#c5bdb0" />
                      <stop offset="80%" stopColor="#e2dcd0" />
                      <stop offset="88%" stopColor="#c5bdb0" />
                      <stop offset="96%" stopColor="#e2dcd0" />
                      <stop offset="100%" stopColor="#c5bdb0" />
                    </linearGradient>
                    <linearGradient id="goldChaton" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#a16207" />
                    </linearGradient>
                    <linearGradient id="rubyJewel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="bluedScrew34" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Circonférence de la Platine de Base (Fond circulaire Ø 36 mm) */}
                  <circle cx="250" cy="210" r="180" fill="#0f172a" stroke="#334155" strokeWidth="3" />

                  {/* Zone Balancier / Échappement dégagée (1/4 de cercle ouvert en bas à droite) */}
                  <path
                    d="M 250,210 L 430,210 A 180,180 0 0,1 250,390 Z"
                    fill="#020617"
                  />
                  {/* Coq et Balancier visibles dans l'ouverture */}
                  <circle cx="340" cy="300" r="48" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="6 3" />
                  <circle cx="340" cy="300" r="12" fill="#be123c" stroke="#881337" strokeWidth="1" />
                  <text x="315" y="365" fill="#e2b44f" fontSize="10" fontFamily="monospace">Balancier Gravé</text>

                  {/* La Platine 3/4 Massive (Couvrant 270°) */}
                  <path
                    d="M 250,210 
                       L 250,30 
                       A 180,180 0 0,0 70,210 
                       A 180,180 0 0,0 250,390 
                       L 250,270 
                       C 280,270 330,270 360,240 
                       C 380,220 380,210 430,210 
                       A 180,180 0 0,0 250,30 Z"
                    fill="url(#cotesGlashutte)"
                    stroke="#475569"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedZone('corps-platine')}
                  />

                  {/* Chanfrein poli miroir sur l'arête rentrante */}
                  <path
                    d="M 250,390 L 250,270 C 280,270 330,270 360,240 C 380,220 380,210 430,210"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* CHATON D'OR VISSÉ N°1 (Centre / Grande Moyenne) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('chaton')}>
                    {/* Chaton en or massif 18k */}
                    <circle cx="210" cy="180" r="26" fill="url(#goldChaton)" stroke="#854d0e" strokeWidth="1.5" />
                    {/* Rubis au centre */}
                    <circle cx="210" cy="180" r="12" fill="url(#rubyJewel)" stroke="#4c0519" strokeWidth="1" />
                    <circle cx="210" cy="180" r="3" fill="#020617" />
                    {/* 3 Vis bleuies de maintien à 120° */}
                    <circle cx="192" cy="170" r="4.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="228" cy="170" r="4.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="210" cy="202" r="4.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <line x1="189" y1="170" x2="195" y2="170" stroke="#93c5fd" strokeWidth="1" />
                    <line x1="225" y1="170" x2="231" y2="170" stroke="#93c5fd" strokeWidth="1" />
                    <line x1="207" y1="202" x2="213" y2="202" stroke="#93c5fd" strokeWidth="1" />
                  </g>

                  {/* CHATON D'OR VISSÉ N°2 (Roue de Barillet / Arbre) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('chaton')}>
                    <circle cx="150" cy="110" r="24" fill="url(#goldChaton)" stroke="#854d0e" strokeWidth="1.5" />
                    <circle cx="150" cy="110" r="11" fill="url(#rubyJewel)" stroke="#4c0519" strokeWidth="1" />
                    <circle cx="134" cy="102" r="4" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="166" cy="102" r="4" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="150" cy="130" r="4" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                  </g>

                  {/* CHATON D'OR VISSÉ N°3 (Roue Moyenne) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('chaton')}>
                    <circle cx="140" cy="240" r="20" fill="url(#goldChaton)" stroke="#854d0e" strokeWidth="1.5" />
                    <circle cx="140" cy="240" r="9" fill="url(#rubyJewel)" stroke="#4c0519" strokeWidth="1" />
                    <circle cx="126" cy="235" r="3.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="154" cy="235" r="3.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="140" cy="257" r="3.5" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                  </g>

                  {/* CHATON D'OR VISSÉ N°4 (Roue d'Échappement) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('chaton')}>
                    <circle cx="210" cy="300" r="18" fill="url(#goldChaton)" stroke="#854d0e" strokeWidth="1.5" />
                    <circle cx="210" cy="300" r="8" fill="url(#rubyJewel)" stroke="#4c0519" strokeWidth="1" />
                    <circle cx="198" cy="295" r="3" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="222" cy="295" r="3" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                    <circle cx="210" cy="315" r="3" fill="url(#bluedScrew34)" stroke="#1e3a8a" strokeWidth="0.8" />
                  </g>

                  {/* 3 Grandes Vis de Fixation de Platine 3/4 */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('vis-platine')}>
                    <circle cx="270" cy="70" r="9" fill="url(#bluedScrew34)" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="264" y1="70" x2="276" y2="70" stroke="#93c5fd" strokeWidth="1.5" />

                    <circle cx="95" cy="180" r="9" fill="url(#bluedScrew34)" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="89" y1="180" x2="101" y2="180" stroke="#93c5fd" strokeWidth="1.5" />

                    <circle cx="180" cy="360" r="9" fill="url(#bluedScrew34)" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="174" y1="360" x2="186" y2="360" stroke="#93c5fd" strokeWidth="1.5" />
                  </g>

                  {/* Texte d'annotation */}
                  <text x="75" y="80" fill="#64748b" fontSize="11" fontFamily="monospace">MAILTECHORT 3/4</text>
                  <text x="65" y="95" fill="#d97706" fontSize="10" fontWeight="bold" fontFamily="monospace">CÔTES DE GLASHÜTTE</text>
                </svg>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
                Cliquez sur les Chatons d&apos;Or Vissés, la Platine 3/4 ou les Vis de fixation pour afficher les détails d&apos;atelier.
              </p>
            </div>

            {/* Colonne Droite : Fiche Détaillée */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              {selectedZone === 'chaton' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-semibold">
                    <span>Joyau de Haute Horlogerie</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Les Chatons en Or Massif Vissés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Historiquement, au XIXe siècle, les rubis naturels n&apos;avaient pas des diamètres calibrés constants. Ferdinand A. Lange a donc serti chaque rubis dans un chaton en or jaune 18 carats tourné, lui-même fixé dans la platine par 2 ou 3 vis en acier bleui.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Matière du chaton :</span>
                      <strong className="text-amber-500">Or jaune 18 carats 3N</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Fixation :</span>
                      <strong className="text-blue-500">3 vis bleuies thermiques à 120°</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Rôle moderne :</span>
                      <strong className="text-emerald-500">Ajustement micrométrique d&apos;ébat axial</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedZone === 'corps-platine' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
                    <span>Rigidité Monolithique</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    La Platine Monolithique 3/4
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    En recouvrant 75% de la surface du calibre, la platine trois-quarts crée un pont continu extrêmement rigide. Elle empêche toute torsion sous tension du barillet et garantit que les axes du rouage restent rigoureusement perpendiculaires même sous de forts chocs.
                  </p>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300">
                    <strong>Finition saxonne :</strong> Décorée des fameuses rayures de Glashütte (Côtes inclinées à ruban large) et polie miroir sur les biseaux intérieurs.
                  </div>
                </div>
              )}

              {selectedZone === 'vis-platine' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                    <span>Assemblage &amp; Serrage</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Vis Bleuies &amp; Goupilles de Centrage
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    La platine trois-quarts est ancrée par 3 ou 4 vis en acier trempé poli miroir et bleui à 290°C. Les pieds de positionnement coniques assurent que le pont se repositionne au centième de millimètre près à chaque démontage.
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= ONGLET 2 : DUEL D'ÉCOLES HORLOGÈRES ================= */}
        {activeTab === 'comparatif' && (
          <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-amber-500 font-bold tracking-wider block">
                Philosophies Mécaniques Comparées
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 dark:text-white mt-1">
                Platine 3/4 Saxonne vs Ponts Séparés Suisses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light mt-1">
                Deux visions séculaires de la haute horlogerie : la quête de la rigidité absolue monolithique contre la modularité et l&apos;architecture aérée.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs sm:text-sm">
              
              {/* Carte Saxonne */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-amber-500/40 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs">
                    ÉCOLE GLASHÜTTE (PLATINE 3/4)
                  </span>
                  <span className="text-[10px] text-slate-400">Lange, Moritz Grossmann</span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Rigidité maximale :</strong> Aucun risque de flexion ou de variation d&apos;engrènement entre le barillet et le rouage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Herméticité :</strong> Protège intégralement le rouage des micro-poussières d&apos;atelier.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Complexité d&apos;assemblage :</strong> Nécessite de guider 4 à 5 pivots simultanément sous un seul pont aveugle.</span>
                  </li>
                </ul>
              </div>

              {/* Carte Suisse */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    ÉCOLE SUISSE (PONTS SÉPARÉS)
                  </span>
                  <span className="text-[10px] text-slate-400">Patek, ETA 6497, Vacheron</span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Modularité d&apos;établi :</strong> On démonte le barillet sans toucher au rouage ni à l&apos;échappement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Visibilité cinématique :</strong> Chaque mobile et chaque pont possède ses propres anglages et décors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Sensibilité thermique :</strong> Multiples jonctions de ponts pouvant subir de légères variations sous contrainte.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ================= ONGLET 3 : DÉFI D'ÉTABLI (ASSEMBLAGE SIMULTANÉ) ================= */}
        {activeTab === 'etabli' && (
          <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-2xl font-serif-luxury font-bold text-slate-900 dark:text-white">
              Le Défi d&apos;Établi : L&apos;Emboîtement des 5 Pivots en Aveugle
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl">
              Poser une platine 3/4 est l&apos;un des examens pratiques les plus redoutés : sous un même pont rigide se trouvent simultanément l&apos;arbre de barillet, la roue de centre, la roue moyenne, la roue des secondes et la roue d&apos;échappement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-amber-500 font-bold text-sm block">1. Pose Libre Flottante</span>
                <p className="text-slate-600 dark:text-slate-400 font-light">
                  Déposer la platine 3/4 sur le rouage sans jamais appuyer. Elle reste en équilibre instable sur les axes non encore engagés.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-sky-500 font-bold text-sm block">2. Guidage à la Brucelle</span>
                <p className="text-slate-600 dark:text-slate-400 font-light">
                  Avec une brucelle n°5 ou un fil de laiton fin, faire osciller légèrement chaque mobile un par un jusqu&apos;à entendre le petit &quot;clic&quot; d&apos;engagement du pivot dans son rubis.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-emerald-500 font-bold text-sm block">3. Descente Par Gravité</span>
                <p className="text-slate-600 dark:text-slate-400 font-light">
                  Dès que le dernier pivot d&apos;échappement est en place, le pont descend tout seul à plat par gravité sur ses goupilles. On peut alors visser en toute sécurité.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-800 dark:text-rose-300">
              <strong>Interdiction formelle à l&apos;établi :</strong> Ne JAMAIS serrer une vis de platine 3/4 pour &quot;forcer&quot; un pont récalcitrant à descendre. Un pivot non engagé qui subit la pression d&apos;une vis casse instantanément (pivot de 0.10 mm détruit).
            </div>
          </div>
        )}

        {/* ================= ONGLET 4 : MÉTALLURGIE DU MAILLECHORT ================= */}
        {activeTab === 'maillechort' && (
          <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-2xl font-serif-luxury font-bold text-slate-900 dark:text-white">
              La Noblesse du Maillechort (*German Silver*)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs sm:text-sm">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">
                  Composition Chimique de l&apos;Alliage :
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Cuivre (Cu) :</span>
                    <strong className="text-slate-900 dark:text-white">Environ 60 % (Apporte la malléabilité et la nuance chaude)</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Nickel (Ni) :</span>
                    <strong className="text-slate-900 dark:text-white">Environ 20 % (Apporte la dureté et l&apos;éclat argenté)</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Zinc (Zn) :</span>
                    <strong className="text-slate-900 dark:text-white">Environ 20 % (Homogénéise la structure cristalline)</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-rose-500 uppercase tracking-wider">
                  Règle de Manipulation d&apos;Atelier :
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  Contrairement aux ponts suisses en laiton qui sont protégés par une couche de rhodiage électrolytique, <strong>le maillechort saxon est laissé brut</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                  <strong>Port de doigtiers obligatoire :</strong>
                  <p className="font-light">
                    Le moindre contact de la peau nue dépose de l&apos;acide lactique qui oxyde le maillechort en quelques heures et laisse une empreinte digitale indélébile nécessitant un repolissage complet du mouvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
