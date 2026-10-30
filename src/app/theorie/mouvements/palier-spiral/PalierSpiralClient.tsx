'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Compass,
  Droplet,
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
  RotateCcw
} from 'lucide-react';

type TabMode = 'coupe' | 'virole' | 'lubrification' | 'metrologie';

export default function PalierSpiralClient() {
  const [activeTab, setActiveTab] = useState<TabMode>('coupe');
  const [shockActive, setShockActive] = useState<boolean>(false);
  const [oilLevel, setOilLevel] = useState<number>(45); // Pourcentage du diamètre du contre-pivot
  const [selectedPart, setSelectedPart] = useState<string>('contre-pivot');

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
            <span className="text-amber-500 font-semibold">Palier &amp; Fixation du Spiral</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Norme NIHS 92-11</span>
            </span>
            <Link
              href="/pratique/calibre-3d"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Voir en 3D sur le 6497-1</span>
            </Link>
          </div>
        </div>

        {/* --- TITRE & EN-TÊTE DE LA FICHE D'ATELIER --- */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-mono">
            <span>Organe Régulateur</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Cœur Battant &amp; Isochronisme</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-slate-900 dark:text-white">
            Palier de Balancier &amp; Fixation du Spiral
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            Le balancier-spiral oscille entre 18&apos;000 et 28&apos;800 alternances par heure avec une masse infime. Son pivotement repose sur un <strong>palier amortisseur de chocs (système Incabloc)</strong> et une <strong>attache géométrique rigoureuse du spiral</strong> (virole au centre, piton à l&apos;extérieur). Tout frottement anormal ou défaut d&apos;huilage détruit instantanément l&apos;isochronisme et l&apos;amplitude de la montre.
          </p>
        </div>

        {/* --- COMMUTATEUR D'ONGLETS D'ÉTUDE --- */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('coupe')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'coupe'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>1. Coupe Antichoc Incabloc (SVG Interactif)</span>
          </button>

          <button
            onClick={() => setActiveTab('virole')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'virole'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Fixation du Spiral (Virole &amp; Piton)</span>
          </button>

          <button
            onClick={() => setActiveTab('lubrification')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'lubrification'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>3. Lubrification Officielle Moebius 9010</span>
          </button>

          <button
            onClick={() => setActiveTab('metrologie')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition flex items-center gap-2 border ${
              activeTab === 'metrologie'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>4. Ébats d&apos;Atelier &amp; Diagnostics NIHS</span>
          </button>
        </div>

        {/* ================= CONTENU DE L'ONGLET 1 : COUPE SVG INTERACTIVE ================= */}
        {activeTab === 'coupe' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Schéma SVG Haute Précision */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1017] rounded-3xl p-5 border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Coupe Micro-Mécanique : Système Incabloc
                  </h3>
                </div>
                <button
                  onClick={() => setShockActive(!shockActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition flex items-center gap-1.5 border ${
                    shockActive
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-rose-400'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{shockActive ? 'Choc Actif (Ressort Lyre fléchi)' : 'Simuler un Choc Mécanique'}</span>
                </button>
              </div>

              {/* Schéma SVG dynamique */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                <svg viewBox="0 0 500 400" className="w-full h-full select-none">
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f5c35b" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#aa7c11" />
                    </linearGradient>
                    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d6d" />
                      <stop offset="50%" stopColor="#c9184a" />
                      <stop offset="100%" stopColor="#590d22" />
                    </linearGradient>
                    <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f1f5f9" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <radialGradient id="oilDropGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#eab308" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.95" />
                    </radialGradient>
                  </defs>

                  {/* Corps du Coq / Platine (Bloc fixe usiné) */}
                  <path
                    d="M 40,80 L 160,80 L 170,140 L 180,260 L 130,340 L 40,340 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <path
                    d="M 460,80 L 340,80 L 330,140 L 320,260 L 370,340 L 460,340 Z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <text x="70" y="210" fill="#64748b" fontSize="11" fontFamily="monospace">Pont de Balancier (Coq)</text>

                  {/* Cône de Centrage du Corps Fixe (Portée conique à 45°) */}
                  <polygon points="170,140 210,180 210,240 180,260" fill="#334155" />
                  <polygon points="330,140 290,180 290,240 320,260" fill="#334155" />

                  {/* Chaton Mobile en Laiton Doré (Se déplace latéralement lors d'un choc) */}
                  <g
                    transform={shockActive ? "translate(12, -8)" : "translate(0, 0)"}
                    className="transition-transform duration-300 ease-out cursor-pointer"
                    onClick={() => setSelectedPart('chaton')}
                  >
                    <path
                      d="M 205,120 L 295,120 L 295,180 L 275,230 L 225,230 L 205,180 Z"
                      fill="url(#goldGrad)"
                      stroke="#854d0e"
                      strokeWidth="2"
                    />
                    <text x="220" y="145" fill="#713f12" fontSize="9" fontWeight="bold" fontFamily="monospace">CHATON DORÉ</text>

                    {/* Contre-pivot en Corindon Synthétique Plat (Haut) */}
                    <rect
                      x="215"
                      y="155"
                      width="70"
                      height="18"
                      rx="3"
                      fill="url(#rubyGrad)"
                      stroke="#800f2f"
                      strokeWidth="1.5"
                      onClick={(e) => { e.stopPropagation(); setSelectedPart('contre-pivot'); }}
                    />

                    {/* Goutte d'Huile Moebius 9010 (Entre contre-pivot et coussinet) */}
                    <ellipse
                      cx="250"
                      cy="176"
                      rx="16"
                      ry="5"
                      fill="url(#oilDropGrad)"
                      stroke="#a16207"
                      strokeWidth="1"
                      onClick={(e) => { e.stopPropagation(); setSelectedPart('huile'); }}
                    />

                    {/* Coussinet Rubis Percé à Trou Olivé (Bas) */}
                    <path
                      d="M 220,180 L 280,180 L 270,220 L 230,220 Z"
                      fill="url(#rubyGrad)"
                      stroke="#800f2f"
                      strokeWidth="1.5"
                      onClick={(e) => { e.stopPropagation(); setSelectedPart('coussinet'); }}
                    />
                    {/* Trou olivé au centre */}
                    <ellipse cx="250" cy="200" rx="3.5" ry="9" fill="#090b10" stroke="#ff4d6d" strokeWidth="0.8" />
                  </g>

                  {/* Axe de Balancier en Acier Trempé */}
                  <g
                    transform={shockActive ? "translate(8, 0)" : "translate(0, 0)"}
                    className="transition-transform duration-300 ease-out cursor-pointer"
                    onClick={() => setSelectedPart('axe')}
                  >
                    {/* Pivot fin poli roulé (Ø 0.08 mm) */}
                    <rect x="247.5" y="166" width="5" height="45" rx="1.5" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1" />
                    {/* Cône de dégagement du pivot */}
                    <polygon points="247.5,211 252.5,211 258,245 242,245" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1" />
                    {/* Tige d'axe de balancier principale */}
                    <rect x="238" y="245" width="24" height="120" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="2" />
                    {/* Plateau et cheville de plateau */}
                    <rect x="215" y="315" width="70" height="15" rx="2" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
                    <rect x="225" y="330" width="6" height="12" fill="url(#rubyGrad)" stroke="#800f2f" strokeWidth="1" />
                    <text x="218" y="360" fill="#94a3b8" fontSize="10" fontFamily="monospace">Axe de Balancier</text>
                  </g>

                  {/* Ressort Lyre Incabloc (Ressort de maintien supérieur en acier à ressort) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelectedPart('lyre')}
                  >
                    <path
                      d={
                        shockActive
                          ? "M 185,108 C 210,90 290,90 315,108 L 305,122 C 285,110 215,110 195,122 Z"
                          : "M 185,114 C 210,102 290,102 315,114 L 305,126 C 285,118 215,118 195,126 Z"
                      }
                      fill="#e2e8f0"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <circle cx="250" cy={shockActive ? "106" : "118"} r="4" fill="#3b82f6" />
                    <text x="210" y="85" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">RESSORT LYRE</text>
                  </g>

                  {/* Flèches de tolérances & jeu */}
                  <line x1="265" y1="172" x2="310" y2="172" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="315" y="176" fill="#facc15" fontSize="11" fontFamily="monospace">Goutte Moebius 9010</text>

                  <line x1="275" y1="210" x2="330" y2="210" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="335" y="214" fill="#fb7185" fontSize="11" fontFamily="monospace">Trou olivé (Jeu 0.005 mm)</text>
                </svg>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
                Cliquez sur les éléments du schéma (Ressort Lyre, Chaton, Contre-Pivot, Axe) pour afficher leur fiche micromécanique.
              </p>
            </div>

            {/* Colonne Droite : Fiche Détaillée de l'Élément Sélectionné */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              {selectedPart === 'contre-pivot' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-mono font-semibold">
                    <span>Composant Optique &amp; Glissement</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Contre-Pivot en Rubis Synthétique (Corindon)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Le contre-pivot est une pierre plate polie miroir (indice de réfraction `ior = 1.77`). L&apos;extrémité hémisphérique du pivot d&apos;axe vient s&apos;y appuyer en position verticale, réduisant le frottement à un point quasi-géométrique.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Matière :</span>
                      <strong className="text-slate-800 dark:text-slate-200">Al₂O₃ pur monocristallin poli miroir</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Diamètre typique :</span>
                      <strong className="text-amber-500">1.20 à 1.40 mm</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Tolérance de planéité :</span>
                      <strong className="text-emerald-500">&lt; 0.001 mm (Interférométrique)</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Nettoyage d&apos;atelier :</span>
                      <strong className="text-sky-500">One-Dip / Essence C + Moelle de sureau</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedPart === 'lyre' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                    <span>Sécurité Antichoc Incabloc</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Ressort Lyre Incabloc
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Le ressort lyre maintient le contre-pivot et le chaton plaqués au fond du cône fixe. En cas de choc axial ou latéral supérieur à 0.05 N, le ressort fléchit et permet au chaton de se décaler. C&apos;est la portée conique massive de l&apos;axe qui encaisse le choc contre la platine, protégeant ainsi le pivot microscopique de toute casse.
                  </p>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1 text-amber-800 dark:text-amber-300">
                    <strong>Règle d&apos;établi :</strong> Ne jamais déformer les bras de la lyre lors du dégagement avec la cheville de bois ou la brucelle n°5. En cas de déformation, le rappel conique est faussé.
                  </div>
                </div>
              )}

              {selectedPart === 'coussinet' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
                    <span>Guidage Radial</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Coussinet Percé à Trou Olivé
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Contrairement à un perçage cylindrique classique, le coussinet de balancier suisse possède un profil intérieur bombé dit <strong>trou olivé</strong>. Ce profil évite tout coincement de l&apos;axe lors de légères inclinaisons et réduit la surface de contact de frottement à une arête minimale.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Diamètre du trou :</span>
                      <strong className="text-slate-800 dark:text-slate-200">0.085 mm (+0.004 / -0.000)</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Jeu d&apos;ébat radial :</span>
                      <strong className="text-emerald-500">0.005 mm (5 microns)</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedPart === 'axe' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-500 text-xs font-mono font-semibold">
                    <span>Arbre Micromécanique</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Axe de Balancier &amp; Pivots Roulés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    L&apos;axe de balancier est décolleté dans un acier au carbone durci, puis ses pivots sont roulés au brunissoir à disque de métal dur pour obtenir une dureté de surface maximale et un poli miroir absolu sans bavure.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Diamètre du pivot :</span>
                      <strong className="text-rose-500">0.08 mm (80 µm)</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
                      <span className="text-slate-500">Rayon d&apos;arrondi du bout :</span>
                      <strong className="text-slate-800 dark:text-slate-200">Hémisphère poli R = 0.04 mm</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Ébat de hauteur :</span>
                      <strong className="text-amber-500">0.015 à 0.025 mm</strong>
                    </div>
                  </div>
                </div>
              )}

              {selectedPart === 'huile' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-semibold">
                    <span>Tribologie Horlogère NIHS</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                    Goutte d&apos;Huile Moebius 9010
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    L&apos;huile synthétique Moebius 9010 est déposée au centre exact du contre-pivot avant l&apos;assemblage. La goutte doit couvrir entre 1/3 et 1/2 du diamètre de la pierre plate.
                  </p>
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                    <div className="text-rose-500 font-bold">Interdiction formelle :</div>
                    <div className="text-slate-600 dark:text-slate-400">
                      Aucune huile ne doit toucher la face extérieure du coussinet ou les cônes du chaton, sous peine de voir l&apos;huile s&apos;échapper par capillarité.
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= CONTENU DE L'ONGLET 2 : VIROLE & PITON ================= */}
        {activeTab === 'virole' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Attache du Ressort Spiral : Virole et Piton Mobile
                </h3>
              </div>

              {/* Schéma vectoriel Virole & Piton */}
              <div className="w-full aspect-[16/9] bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center">
                <svg viewBox="0 0 520 280" className="w-full h-full select-none">
                  {/* Axe central */}
                  <circle cx="260" cy="140" r="16" fill="#64748b" stroke="#334155" strokeWidth="2" />
                  <text x="250" y="144" fill="#f8fafc" fontSize="10" fontFamily="monospace">AXE</text>

                  {/* Virole chassée (bague fendue en laiton ou acier) */}
                  <path
                    d="M 230,140 A 30,30 0 1,1 290,140 A 30,30 0 0,1 262,170 L 258,170 A 30,30 0 0,1 230,140"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="10"
                  />
                  {/* Fente de la virole pour élasticité de chassage */}
                  <line x1="260" y1="165" x2="260" y2="175" stroke="#090b10" strokeWidth="3" />
                  <text x="210" y="195" fill="#eab308" fontSize="11" fontFamily="monospace">Virole Fendue</text>

                  {/* Spirale d'Archimède (Lames du spiral) */}
                  <path
                    d="M 270,140 
                       C 275,115 240,95 215,110 
                       C 180,130 190,185 225,200 
                       C 275,220 325,180 325,120 
                       C 325,50 230,35 170,75 
                       C 110,115 110,210 165,255 
                       C 230,300 355,285 400,210 
                       C 425,160 410,95 365,60
                       C 325,30 240,20 180,45"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.2"
                  />

                  {/* Goupilles de Raquette */}
                  <circle cx="370" cy="85" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                  <circle cx="380" cy="90" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                  <text x="390" y="88" fill="#facc15" fontSize="10" fontFamily="monospace">Goupilles de Raquette</text>

                  {/* Piton Triangulaire / Rond fixé au Coq */}
                  <polygon points="410,130 425,120 425,140" fill="#f43f5e" stroke="#881337" strokeWidth="1.5" />
                  <text x="430" y="135" fill="#fb7185" fontSize="11" fontWeight="bold" fontFamily="monospace">Piton Mobile (Point Fixe)</text>
                </svg>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-mono font-bold text-amber-500 uppercase">1. La Virole (Point Intérieur)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    Bague élastique fendue en laiton ou acier, chassée à gras sur la portée de l&apos;axe de balancier. Le bout intérieur du spiral y est pincé ou collé au laser. Elle permet de régler le point mort (mise au repère) en tournant la virole avec un tourne-virole.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-mono font-bold text-rose-500 uppercase">2. Le Piton (Point Extérieur)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    Petite colonne cylindrique ou triangulaire fixée sur le porte-piton mobile du coq. Le bout extérieur du spiral y est goupillé ou collé. Le porte-piton mobile permet de corriger le repère directement au tournevis sans démonter le balancier.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-mono font-semibold">
                <span>Règles d&apos;Établi</span>
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                Les 3 Critères du Spiral Parfait
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Planéité Rigoureuse :</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-light pl-6">
                    Toutes les spires doivent être situées dans un même plan horizontal rigoureusement perpendiculaire à l&apos;axe de balancier. Aucun frottement sur le pont ni sur les bras du balancier.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Concentricité &amp; Développement :</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-light pl-6">
                    Les spires doivent respirer de manière concentrique à l&apos;expansion et à la contraction, sans jamais se toucher ni onduler de biais.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Centrage entre les Goupilles :</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-light pl-6">
                    Au repos, la lame du spiral doit passer au milieu exact des deux goupilles de raquette sans toucher ni l&apos;une ni l&apos;autre. Le jeu total ne doit pas excéder 0.01 à 0.02 mm.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= CONTENU DE L'ONGLET 3 : LUBRIFICATION MOEBIUS 9010 ================= */}
        {activeTab === 'lubrification' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Simulateur de Dosage : Goutte d&apos;Huile Moebius 9010
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-500 font-semibold">NIHS 92-11</span>
              </div>

              {/* Slider de dosage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Diamètre de la goutte (% de la pierre) :</span>
                  <strong className={oilLevel >= 35 && oilLevel <= 55 ? "text-emerald-500" : "text-rose-500"}>
                    {oilLevel} % {oilLevel >= 35 && oilLevel <= 55 ? "(CONFORME SUISSE)" : "(HORS TOLÉRANCE)"}
                  </strong>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={oilLevel}
                  onChange={(e) => setOilLevel(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Visualiseur de la goutte sous loupe 12x */}
              <div className="w-full aspect-[4/3] bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4 relative">
                <svg viewBox="0 0 300 240" className="w-56 h-56 select-none">
                  {/* Chaton métallique extérieur */}
                  <circle cx="150" cy="120" r="100" fill="#ca8a04" stroke="#854d0e" strokeWidth="4" />
                  {/* Contre-pivot rubis rond */}
                  <circle cx="150" cy="120" r="80" fill="#be123c" stroke="#881337" strokeWidth="3" />
                  
                  {/* Zone de tolérance idéale (35% à 55%) en pointillé */}
                  <circle cx="150" cy="120" r="36" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="150" cy="120" r="22" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Goutte d'huile dynamique */}
                  <circle
                    cx="150"
                    cy="120"
                    r={oilLevel * 0.75}
                    fill="#fef08a"
                    fillOpacity="0.85"
                    stroke="#ca8a04"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                  {/* Reflet de lumière sur la goutte */}
                  <ellipse cx="140" cy="112" rx={oilLevel * 0.2} ry={oilLevel * 0.12} fill="#ffffff" fillOpacity="0.7" />

                  {/* Pivot d'axe central */}
                  <circle cx="150" cy="120" r="4" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                </svg>

                <div className="text-center space-y-1 mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    oilLevel >= 35 && oilLevel <= 55
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : oilLevel < 35
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {oilLevel >= 35 && oilLevel <= 55
                      ? '✓ Goutte Parfaite : Lubrification optimale assurée pour 5 ans'
                      : oilLevel < 35
                      ? '⚠ Goutte Insuffisante : Risque d’usure et d’assèchement rapide'
                      : '✖ Goutte Excessive : Débordement par capillarité sur les bords !'}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-semibold">
                <span>Protocole Officiel Moebius</span>
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-white">
                Règles de Lubrification d&apos;Établi
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <strong className="text-amber-500">1. Huile Préconisée :</strong>
                  <p className="text-slate-600 dark:text-slate-400 font-light">
                    <strong>Moebius 9010</strong> (huile fluide synthétique haute résistance au vieillissement). Viscosité : 150 cSt à 20°C.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <strong className="text-sky-500">2. Outil Recommandé :</strong>
                  <p className="text-slate-600 dark:text-slate-400 font-light">
                    Pique-huile automatique ou micro-pique-huile noir / rouge très fin. La goutte doit être déposée par simple effleurement de surface.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <strong className="text-rose-500">3. Épimélangage / Anti-Étalement :</strong>
                  <p className="text-slate-600 dark:text-slate-400 font-light">
                    Trempage préalable du contre-pivot dans une solution de <strong>Fixodrop (Moebius 8941)</strong> pour empêcher l&apos;étalement spontané de l&apos;huile sur les parois métalliques.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= CONTENU DE L'ONGLET 4 : MÉTROLOGIE & DIAGNOSTICS ================= */}
        {activeTab === 'metrologie' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Scale className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Tableau des Tolérances Métrologiques (NIHS)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="py-2.5">Paramètre d&apos;Établi</th>
                      <th className="py-2.5">Valeur Tolérée</th>
                      <th className="py-2.5">Méthode de Mesure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    <tr>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">Ébat de hauteur d&apos;axe</td>
                      <td className="py-3 text-amber-500 font-bold">0.015 à 0.025 mm</td>
                      <td className="py-3 text-slate-500">Poussoir micrométrique sous binoculaire</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">Ébat de jeu radial (trou olivé)</td>
                      <td className="py-3 text-emerald-500 font-bold">0.004 à 0.007 mm</td>
                      <td className="py-3 text-slate-500">Test au fil de cuivre d&apos;atelier</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">Ébat des goupilles de raquette</td>
                      <td className="py-3 text-sky-500 font-bold">0.010 à 0.020 mm</td>
                      <td className="py-3 text-slate-500">Contrôle visuel sous loupe 15x</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">Force de serrage ressort Lyre</td>
                      <td className="py-3 text-purple-500 font-bold">0.05 à 0.08 N</td>
                      <td className="py-3 text-slate-500">Dynamomètre horloger</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300">
                <strong>Attention d&apos;atelier :</strong> Un ébat de hauteur inférieur à 0.010 mm provoque un bridage immédiat au serrage de la vis de pont. Un ébat supérieur à 0.035 mm génère des variations d&apos;amplitude inacceptables entre positions horizontales (cadran haut/bas) et positions verticales.
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-[#0c1017] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Diagnostics des Pannes &amp; Remèdes d&apos;Atelier
                </h3>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <div className="text-rose-500 font-bold">Panne 1 : Amplitude faible (&lt; 220°) en positions horizontales</div>
                  <p className="text-slate-600 dark:text-slate-300 font-light">
                    <strong>Cause :</strong> Contre-pivot sec, goutte d&apos;huile décentrée, ou bout de pivot émoussé / rayé.
                    <br />
                    <strong>Remède :</strong> Démontage de la lyre, lavage au One-Dip, relubrification Moebius 9010 au centre.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <div className="text-amber-500 font-bold">Panne 2 : Écart important de marche entre Plat et Pendu (&gt; 25 s/j)</div>
                  <p className="text-slate-600 dark:text-slate-300 font-light">
                    <strong>Cause :</strong> Jeu excessif dans le trou olivé ou spiral touchant en continu une goupille de raquette.
                    <br />
                    <strong>Remède :</strong> Redressage délicat du coude du spiral au brucelles n°5 pour centrer la lame au repos.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <div className="text-sky-500 font-bold">Panne 3 : Défaut de repère prononcé (Beat Error &gt; 1.5 ms)</div>
                  <p className="text-slate-600 dark:text-slate-300 font-light">
                    <strong>Cause :</strong> La cheville de plateau n&apos;est pas au milieu exact des cornes de l&apos;ancre au repos.
                    <br />
                    <strong>Remède :</strong> Ajuster la position angulaire du porte-piton mobile jusqu&apos;à obtenir un Beat Error &lt; 0.3 ms au chronocomparateur.
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
