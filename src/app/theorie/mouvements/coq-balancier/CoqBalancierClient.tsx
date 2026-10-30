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
  Feather
} from 'lucide-react';

type CoqTab = 'anatomie' | 'pose' | 'reglage' | 'comparatif';

export default function CoqBalancierClient() {
  const [activeTab, setActiveTab] = useState<CoqTab>('anatomie');
  const [selectedZone, setSelectedZone] = useState<string>('raquette');
  const [poseStep, setPoseStep] = useState<number>(1);

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
            <span className="text-amber-500 font-semibold">Le Coq (Pont de Balancier)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pièce Maîtresse d&apos;Atelier</span>
            </span>
            <Link
              href="/pratique/calibre-3d"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Examiner le Coq 6497 en 3D</span>
            </Link>
          </div>
        </div>

        {/* --- TITRE & EN-TÊTE --- */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-mono">
            <span>Architecture &amp; Ponts</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Le Coq Suisse Traditionnel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-slate-900 dark:text-white">
            Le Coq (Pont de Balancier)
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            Portant son nom de la forme élancée et de la crête des garde-temps du XVIe siècle, <strong>le Coq</strong> est le pont en porte-à-faux le plus stratégique et le plus décoré d&apos;un mouvement mécanique. Il supporte à lui seul le palier antichoc supérieur du balancier, la raquette de réglage, le porte-piton mobile et le correcteur micrométrique. Sa pose à l&apos;établi est le geste souverain de l&apos;artisan horloger.
          </p>
        </div>

        {/* --- ONGLET NAV --- */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('anatomie')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'anatomie'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>1. Anatomie du Coq (SVG Interactif)</span>
          </button>

          <button
            onClick={() => setActiveTab('pose')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'pose'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>2. Protocole de Pose d&apos;Établi (Les 5 Étapes)</span>
          </button>

          <button
            onClick={() => setActiveTab('reglage')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'reglage'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>3. Raquetterie &amp; Col de Cygne</span>
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
            <span>4. Coq en Porte-à-Faux vs Pont Traversant</span>
          </button>
        </div>

        {/* ================= ONGLET 1 : ANATOMIE DU COQ (SVG INTERACTIF) ================= */}
        {activeTab === 'anatomie' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Schéma SVG Haute Précision */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1017] rounded-3xl p-5 border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Plan Technique : Le Coq de Balancier Décoré
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">Vue de dessus d&apos;établi</span>
              </div>

              {/* Schéma SVG interactif du Coq */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                <svg viewBox="0 0 500 380" className="w-full h-full select-none">
                  <defs>
                    {/* Côtes de Genève dégradé sur le corps du coq */}
                    <linearGradient id="cotesGeneve" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="10%" stopColor="#94a3b8" />
                      <stop offset="20%" stopColor="#cbd5e1" />
                      <stop offset="30%" stopColor="#94a3b8" />
                      <stop offset="40%" stopColor="#cbd5e1" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="60%" stopColor="#cbd5e1" />
                      <stop offset="70%" stopColor="#94a3b8" />
                      <stop offset="80%" stopColor="#cbd5e1" />
                      <stop offset="90%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    <linearGradient id="goldCoq" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f5c35b" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#aa7c11" />
                    </linearGradient>
                    <linearGradient id="rubyCoq" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d6d" />
                      <stop offset="50%" stopColor="#c9184a" />
                      <stop offset="100%" stopColor="#590d22" />
                    </linearGradient>
                    <linearGradient id="bluedScrew" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#172554" />
                    </linearGradient>
                  </defs>

                  {/* Corps du Coq sculpté (forme classique ETA 6497) */}
                  <path
                    d="M 60,180 
                       C 60,100 120,60 210,60 
                       C 270,60 330,85 370,120 
                       C 420,165 440,210 440,260 
                       C 440,300 410,320 370,320 
                       C 320,320 300,270 270,250 
                       C 240,230 180,240 130,260 
                       C 90,275 60,240 60,180 Z"
                    fill="url(#cotesGeneve)"
                    stroke="#475569"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedZone('corps')}
                  />

                  {/* Chanfrein poli miroir (Anglage main) tout autour */}
                  <path
                    d="M 60,180 
                       C 60,100 120,60 210,60 
                       C 270,60 330,85 370,120 
                       C 420,165 440,210 440,260 
                       C 440,300 410,320 370,320 
                       C 320,320 300,270 270,250 
                       C 240,230 180,240 130,260 
                       C 90,275 60,240 60,180 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />

                  {/* Pied de Coq (Base de fixation à gauche) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('pied')}>
                    {/* Trou de vis principal avec fraisage cylindrique */}
                    <circle cx="120" cy="180" r="22" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                    {/* Vis horlogère bleuie à la flamme */}
                    <circle cx="120" cy="180" r="16" fill="url(#bluedScrew)" stroke="#1e40af" strokeWidth="1" />
                    <line x1="108" y1="180" x2="132" y2="180" stroke="#93c5fd" strokeWidth="2" />
                    
                    {/* 2 Pieds de positionnement (Goupilles de centrage en acier trempé) */}
                    <circle cx="85" cy="140" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="95" cy="225" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
                    <text x="50" y="125" fill="#94a3b8" fontSize="10" fontFamily="monospace">Goupille</text>
                    <text x="55" y="245" fill="#94a3b8" fontSize="10" fontFamily="monospace">Goupille</text>
                  </g>

                  {/* Palier Antichoc Incabloc au centre du bec */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('incabloc')}>
                    {/* Chaton extérieur doré */}
                    <circle cx="340" cy="180" r="32" fill="url(#goldCoq)" stroke="#854d0e" strokeWidth="2" />
                    {/* Contre-pivot rubis corindon */}
                    <circle cx="340" cy="180" r="22" fill="url(#rubyCoq)" stroke="#800f2f" strokeWidth="1.5" />
                    {/* Goutte d'huile Moebius 9010 au centre */}
                    <circle cx="340" cy="180" r="10" fill="#fef08a" fillOpacity="0.85" stroke="#ca8a04" strokeWidth="1" />
                    {/* Ressort Lyre Incabloc stylisé */}
                    <path
                      d="M 322,165 C 330,155 350,155 358,165 C 365,175 365,185 358,195 C 350,205 330,205 322,195 Z"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                  </g>

                  {/* Raquette de réglage (Aiguille indicatrice avec index + / -) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('raquette')}>
                    {/* Bague de raquette coaxiale */}
                    <circle cx="340" cy="180" r="44" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="5 3" />
                    {/* Flèche indicatrice de la raquette */}
                    <path
                      d="M 336,136 L 260,85 L 268,80 L 344,136 Z"
                      fill="#e2e8f0"
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                    <circle cx="260" cy="85" r="3" fill="#e11d48" />
                  </g>

                  {/* Porte-Piton Mobile coaxial */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('piton')}>
                    {/* Bras de porte-piton */}
                    <path
                      d="M 340,224 L 330,300 L 348,300 L 344,224 Z"
                      fill="#94a3b8"
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                    {/* Piton porte-spiral en rouge */}
                    <polygon points="334,300 344,290 344,310" fill="#f43f5e" stroke="#881337" strokeWidth="1" />
                    <text x="355" y="305" fill="#f43f5e" fontSize="10" fontWeight="bold" fontFamily="monospace">PITON MOBILE</text>
                  </g>

                  {/* Échelle graduée Avance / Retard */}
                  <g>
                    <path d="M 235,65 A 130,130 0 0,1 295,75" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="240" y1="62" x2="242" y2="70" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="255" y1="65" x2="257" y2="73" stroke="#cbd5e1" strokeWidth="1.5" />
                    <line x1="270" y1="68" x2="272" y2="76" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="285" y1="72" x2="287" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x="225" y="60" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">-</text>
                    <text x="295" y="75" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">+</text>
                  </g>

                  {/* Vis de Réglage Fin (Col de Cygne ou Vis Excentrique) */}
                  <g className="cursor-pointer" onClick={() => setSelectedZone('col-cygne')}>
                    {/* Ressort en col de cygne cintré */}
                    <path
                      d="M 230,110 C 210,120 200,100 220,80 C 235,68 250,78 255,85"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    {/* Petite vis micrométrique */}
                    <rect x="200" y="95" width="12" height="6" rx="1" fill="#cbd5e1" stroke="#334155" strokeWidth="1" />
                    <text x="160" y="80" fill="#38bdf8" fontSize="10" fontFamily="monospace">Col de Cygne</text>
                  </g>
                </svg>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
                Cliquez sur les différentes zones du schéma (Pied de Coq, Incabloc, Raquette, Piton, Col de Cygne) pour inspecter leur rôle.
              </p>
            </div>

            {/* Colonne Droite : Fiche Détaillée de la Zone Sélectionnée */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              {selectedZone === 'raquette' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
                    <span>Réglage de la Marche</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    La Raquette &amp; Flèche Indicatrice
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Montée à frottement gras autour du corps de l&apos;Incabloc, la raquette porte sous son bec les deux goupilles entre lesquelles passe la lame terminale du spiral. En déplaçant la flèche vers le <strong>(+)</strong> ou le <strong>(-)</strong>, on modifie la longueur active du ressort pour régler la vitesse de battement.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Course de réglage :</span>
                      <strong className="text-amber-500">± 30 à 60 secondes / jour</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Jeu des goupilles :</span>
                      <strong className="text-emerald-500">0.010 à 0.015 mm</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Type suisse moderne :</span>
                      <strong className="text-sky-500">Système Etachron orientable</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedZone === 'pied' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                    <span>Géométrie &amp; Stabilité Structurelle</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Le Pied de Coq &amp; Goupilles de Centrage
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Le pied de coq est l&apos;unique zone de fixation sur la platine. Il repose sur deux goupilles coniques en acier trempé (pieds de positionnement) qui garantissent un alignement absolu de l&apos;axe de balancier à 90° sans jeu latéral.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Vis de fixation :</span>
                      <strong className="text-slate-800 dark:text-slate-200">Filetage NIHS S 1.00 acier bleui</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Couple de serrage NIHS :</span>
                      <strong className="text-amber-500">1.0 à 1.2 cNm</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Planéité de la face d&apos;appui :</span>
                      <strong className="text-rose-500">&lt; 0.002 mm (Rodée)</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedZone === 'incabloc' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-mono font-semibold">
                    <span>Palier Amortisseur</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Palier Antichoc Supérieur
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Serti au centre du nez du coq, le système Incabloc protège le pivot supérieur de l&apos;axe de balancier. En cas de choc, le ressort lyre fléchit et permet au chaton doré de se décaler pour dissiper l&apos;énergie sur la portée conique massive.
                  </p>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1 text-amber-800 dark:text-amber-300">
                    <strong>Règle d&apos;établi :</strong> Huilé avec 1/3 de goutte de Moebius 9010 au centre exact du contre-pivot corindon.
                  </div>
                </div>
              )}

              {selectedZone === 'piton' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-mono font-semibold">
                    <span>Mise au Repère</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Porte-Piton Mobile Coaxial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Le porte-piton mobile maintient le point fixe extérieur du spiral. En faisant tourner ce bras au tournevis d&apos;établi, l&apos;horloger règle la mise au repère (*Beat Error*) pour centrer la cheville de plateau exactement au milieu des cornes de l&apos;ancre au repos.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Beat Error ciblé :</span>
                      <strong className="text-emerald-500">&lt; 0.2 ms au Witschi</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Fixation du spiral :</span>
                      <strong className="text-slate-800 dark:text-slate-200">Goupillage conique ou collage laser</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedZone === 'col-cygne' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-mono font-semibold">
                    <span>Haute Horlogerie Traditionnelle</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Régulateur à Col de Cygne
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Ressort en acier poli miroir courbé en forme de col de cygne. Il pousse continuellement contre la flèche de la raquette. Une vis micrométrique à pas ultra-fin permet d&apos;ajuster la marche seconde par seconde avec une précision chirurgicale.
                  </p>
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-800 dark:text-sky-300">
                    Présent sur les versions haut de gamme de l&apos;ETA 6497-1 (Unitas) et les mouvements Glashütte / Manufacture suisse.
                  </div>
                </div>
              )}

              {selectedZone === 'corps' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-500 text-xs font-mono font-semibold">
                    <span>Finition d&apos;Art</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Finitions &amp; Décors du Coq
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Le coq est traditionnellement la pièce la plus mise en valeur d&apos;un fond transparent : Côtes de Genève circulaires ou rayonnantes, anglage poli bercé à la tige de gentiane et gravures florales personnalisées faites main au burin d&apos;artisan.
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= ONGLET 2 : PROTOCOLE DE POSE D'ÉTABLI (LES 5 ÉTAPES) ================= */}
        {activeTab === 'pose' && (
          <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-amber-500 font-bold tracking-wider block">
                Geste Souverain de l&apos;Horloger
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 dark:text-white mt-1">
                Protocole de Pose du Coq sans Choc
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light mt-2">
                Le balancier et le coq forment un sous-ensemble indissociable. Poser le coq sans casser le pivot de 0.08 mm ni plisser le spiral exige une méthode stricte apprise à l&apos;école d&apos;horlogerie.
              </p>
            </div>

            {/* Stepper horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { step: 1, title: "1. Présentation", desc: "Prise aux brucelles n°3" },
                { step: 2, title: "2. Cheville & Ancre", desc: "Engagement dans l'encoche" },
                { step: 3, title: "3. Pivot Inférieur", desc: "Pénétration dans le trou olivé" },
                { step: 4, title: "4. Pied de Coq", desc: "Plaquage sur les goupilles" },
                { step: 5, title: "5. Serrage NIHS", desc: "Couple officiel à 1.0 cNm" }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setPoseStep(s.step)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    poseStep === s.step
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                  }`}
                >
                  <span className="text-[10px] block opacity-75 font-mono uppercase">Étape {s.step}</span>
                  <div className="text-xs sm:text-sm font-bold mt-1">{s.title}</div>
                  <div className="text-[11px] opacity-80 mt-0.5 font-light">{s.desc}</div>
                </button>
              ))}
            </div>

            {/* Détail de l'étape sélectionnée */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 font-mono text-xs sm:text-sm">
              {poseStep === 1 && (
                <div className="space-y-3">
                  <div className="text-amber-500 font-bold uppercase tracking-wider">
                    Étape 1 : Présentation du Sous-Ensemble Coq-Balancier
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    Saisir le coq par son pied avec la brucelle n°3 ou n°5 de la main dominante. Laisser pendre délicatement le balancier par son spiral sans aucune secousse. Amener l&apos;ensemble au-dessus de la platine inclinée à 45°.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                    ⚠ <strong>Règle d&apos;or :</strong> Ne jamais toucher les spires du spiral avec les pointes des brucelles.
                  </div>
                </div>
              )}

              {poseStep === 2 && (
                <div className="space-y-3">
                  <div className="text-amber-500 font-bold uppercase tracking-wider">
                    Étape 2 : Engagement de la Cheville de Plateau dans l&apos;Ancre
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    Avant de poser le pied de coq, guider visuellement la cheville de plateau (rubis demi-lune) pour qu&apos;elle s&apos;insère exactement au centre de l&apos;encoche de la fourchette de l&apos;ancre suisse.
                  </p>
                </div>
              )}

              {poseStep === 3 && (
                <div className="space-y-3">
                  <div className="text-amber-500 font-bold uppercase tracking-wider">
                    Étape 3 : Pénétration du Pivot Inférieur dans le Trou Olivé
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    Descendre verticalement le balancier pour que l&apos;extrémité du pivot d&apos;axe inférieur pénètre dans le coussinet de platine. Si le pivot n&apos;est pas engagé et que l&apos;on force, le pivot casse net.
                  </p>
                </div>
              )}

              {poseStep === 4 && (
                <div className="space-y-3">
                  <div className="text-amber-500 font-bold uppercase tracking-wider">
                    Étape 4 : Plaquage du Pied de Coq sur les Goupilles de Centrage
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    Faire basculer le coq horizontalement. Les deux goupilles de centrage de la platine doivent s&apos;insérer dans les trous du pied sans forcer. Le balancier doit commencer à osciller librement au moindre souffle de benjoin.
                  </p>
                </div>
              )}

              {poseStep === 5 && (
                <div className="space-y-3">
                  <div className="text-amber-500 font-bold uppercase tracking-wider">
                    Étape 5 : Vissage au Couple Homologué NIHS (1.0 à 1.2 cNm)
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    Engager la vis de coq à la main avec le tournevis n°120 ou 140. Serrer progressivement jusqu&apos;au plaquage franc. Vérifier immédiatement l&apos;ébat de hauteur de l&apos;axe de balancier (0.015 à 0.025 mm) avant de remonter la montre.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ONGLET 3 : RAQUETTERIE & COL DE CYGNE ================= */}
        {activeTab === 'reglage' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-mono font-semibold">
                <span>Système ETA Moderne</span>
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                La Raquetterie ETACHRON
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Breveté par ETA pour équiper les calibres 2824-2, 2892A2 et 7750, le système Etachron remplace les anciennes goupilles fixes en laiton par un bloc d&apos;acier tournant.
              </p>
              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Avantage 1 : Parallélisme Garanti</strong>
                  <p className="mt-0.5 font-light">Les deux goupilles tournent ensemble à la clé sans risque d&apos;être tordues au brucelles.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Avantage 2 : Écartement Réglable</strong>
                  <p className="mt-0.5 font-light">Permet d&apos;ajuster le jeu du spiral au micron près pour corriger l&apos;isochronisme.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-semibold">
                <span>Manufacture d&apos;Exception</span>
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                Régulateur Micrométrique Col de Cygne
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Apparu sur les chronomètres de poche de haute précision, le col de cygne assure une avance ou un retard progressif et régulier grâce à une vis tangentielle poussant contre un ressort en acier bleui.
              </p>
              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Précision chirurgicale :</strong>
                  <p className="mt-0.5 font-light">1/4 de tour de vis = environ 2 secondes de correction par jour.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Sécurité anti-déréglage :</strong>
                  <p className="mt-0.5 font-light">Le ressort élimine tout jeu dans le filet de la vis micrométrique.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= ONGLET 4 : COMPARATIF ARCHITECTURAL ================= */}
        {activeTab === 'comparatif' && (
          <div className="bg-white dark:bg-[#0c1017] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-2xl font-serif-luxury font-bold text-slate-900 dark:text-white">
              Coq en Porte-à-Faux (Traditionnel) vs Pont de Balancier Traversant
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-amber-500/30 space-y-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs">
                  COQ TRADITIONNEL SUISSE (ETA 6497, 2824)
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  Fixé par un seul pied (porte-à-faux). Offre une vue dégagée à 270° sur les battements du balancier et l&apos;échappement.
                </p>
                <div className="space-y-1.5 pt-2 text-xs border-t border-slate-200 dark:border-slate-800">
                  <div className="text-emerald-500 font-bold">✓ Esthétique magnifique, facile à décorer et à graver</div>
                  <div className="text-emerald-500 font-bold">✓ Démontage rapide du balancier à l&apos;établi</div>
                  <div className="text-rose-500 font-bold">✖ Rigidité axiale moindre en cas de choc violent</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-sky-500/30 space-y-3">
                <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-500 font-bold text-xs">
                  PONT TRAVERSANT À 2 FIXATIONS (ROLEX 3135/3235, OMEGA 8500)
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  Pont rigide traversant vissé de part et d&apos;autre du balancier avec écrous de réglage de hauteur d&apos;ébat.
                </p>
                <div className="space-y-1.5 pt-2 text-xs border-t border-slate-200 dark:border-slate-800">
                  <div className="text-emerald-500 font-bold">✓ Résistance extrême aux chocs et stabilité chronométrique</div>
                  <div className="text-emerald-500 font-bold">✓ Réglage de l&apos;ébat de hauteur sans cale</div>
                  <div className="text-rose-500 font-bold">✖ Masque une grande partie de l&apos;organe régulateur</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
