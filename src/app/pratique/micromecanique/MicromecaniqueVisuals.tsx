"use client";

import React from "react";

// =========================================================================
// 1. SCHÉMA ANATOMIE COMPLÈTE DU TOUR SCHAUBLIN 70
// =========================================================================
export function LatheAnatomyVisual() {
  return (
    <div className="w-full bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold text-xs flex items-center justify-center">
            📐
          </span>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Anatomie & Organes Maîtres · Tour d'Horloger Schaublin 70</h4>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Hauteur de pointe : 70.00 mm · Pinces type W12</span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 w-fit">
          BANC PRISMATIQUE RECTIFIÉ
        </span>
      </div>

      <svg viewBox="0 0 600 220" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="latheCastIron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="groundBedSteel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="brassPart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Fond d'atelier technique */}
        <rect width="600" height="220" rx="8" className="fill-slate-100 dark:fill-[#070a10] stroke-slate-300 dark:stroke-[#1f293d]" strokeWidth="1" />

        {/* Grille millimétrée */}
        <g opacity="0.12">
          <path d="M0,40 H600 M0,80 H600 M0,120 H600 M0,160 H600 M0,200 H600" className="stroke-slate-400 dark:stroke-[#94a3b8]" strokeDasharray="3,3" />
          <path d="M50,0 V220 M100,0 V220 M150,0 V220 M200,0 V220 M250,0 V220 M300,0 V220 M350,0 V220 M400,0 V220 M450,0 V220 M500,0 V220 M550,0 V220" className="stroke-slate-400 dark:stroke-[#94a3b8]" strokeDasharray="3,3" />
        </g>

        {/* Banc Prismatique rectifié (Banc en fonte grise) */}
        <path d="M40,165 L560,165 L550,195 L50,195 Z" fill="url(#groundBedSteel)" stroke="#64748b" strokeWidth="1.5" />
        <rect x="40" y="160" width="520" height="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="300" y="185" textAnchor="middle" className="fill-slate-700 dark:fill-slate-800 font-mono text-[9px] font-bold tracking-wider">
          BANC EN FONTE RECTIFIÉ SCHAUBLIN (PRISME DOUBLE)
        </text>

        {/* 1. Poupée Fixe (Gauche) */}
        <path d="M50,70 L170,70 L170,160 L50,160 Z" fill="url(#latheCastIron)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="110" cy="95" r="28" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="110" cy="95" r="18" fill="url(#groundBedSteel)" stroke="#475569" strokeWidth="1" />
        {/* Nez de broche & Pince W12 */}
        <rect x="170" y="85" width="25" height="20" rx="2" fill="url(#groundBedSteel)" stroke="#64748b" strokeWidth="1" />
        <line x1="170" y1="95" x2="195" y2="95" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Barre en rotation */}
        <rect x="195" y="92" width="40" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

        <text x="110" y="55" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono text-[9.5px] font-bold">1. Poupée Fixe (Broche W12)</text>
        <line x1="110" y1="58" x2="110" y2="68" stroke="#ca8a04" strokeWidth="1.2" />

        {/* 2. Chariot Croisé d'Horloger (Centre) */}
        <rect x="250" y="100" width="100" height="60" rx="3" fill="url(#latheCastIron)" stroke="#64748b" strokeWidth="1.5" />
        <rect x="265" y="75" width="70" height="25" rx="2" fill="url(#groundBedSteel)" stroke="#475569" strokeWidth="1" />
        {/* Tourelle & Burin d'acier */}
        <rect x="240" y="82" width="30" height="12" rx="1.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
        <path d="M235,88 L242,88" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        {/* Verniers micrométriques gradués */}
        <circle cx="360" cy="115" r="9" fill="url(#brassPart)" stroke="#854d0e" strokeWidth="1" />
        <circle cx="300" cy="65" r="8" fill="url(#brassPart)" stroke="#854d0e" strokeWidth="1" />
        
        <text x="300" y="45" textAnchor="middle" className="fill-sky-700 dark:fill-[#38bdf8] font-mono text-[9.5px] font-bold">2. Chariot Croisé Micrométrique</text>
        <line x1="300" y1="48" x2="300" y2="60" stroke="#0284c7" strokeWidth="1.2" />

        {/* 3. Contre-Poupée / Poupée Mobile (Droite) */}
        <path d="M430,85 L530,85 L540,160 L420,160 Z" fill="url(#latheCastIron)" stroke="#475569" strokeWidth="1.5" />
        <rect x="390" y="90" width="40" height="10" rx="2" fill="url(#groundBedSteel)" stroke="#64748b" strokeWidth="1" />
        {/* Pointe sèche à 60° */}
        <polygon points="390,95 375,95 390,91" fill="url(#groundBedSteel)" stroke="#475569" strokeWidth="1" />
        {/* Volant de cabestan */}
        <circle cx="550" cy="95" r="14" fill="#1e293b" stroke="#ca8a04" strokeWidth="1.5" />
        <line x1="550" y1="81" x2="550" y2="109" stroke="#ca8a04" strokeWidth="1.5" />

        <text x="480" y="65" textAnchor="middle" className="fill-emerald-700 dark:fill-[#4ade80] font-mono text-[9.5px] font-bold">3. Contre-Poupée (Pointe 60°)</text>
        <line x1="480" y1="68" x2="480" y2="82" stroke="#10b981" strokeWidth="1.2" />

        {/* Ligne d'axe de pointe H = 70.00 mm */}
        <line x1="30" y1="95" x2="570" y2="95" stroke="#f43f5e" strokeWidth="1" strokeDasharray="6,4" />
        <text x="565" y="90" textAnchor="end" className="fill-rose-700 dark:fill-rose-400 font-mono text-[8px] font-bold">Axe H = 70.00 mm</text>
      </svg>
    </div>
  );
}

// =========================================================================
// 2. ÉTAPE 1 : PRÉPARATION MACHINE & CONTROLE FAUX-ROND
// =========================================================================
export function PrepMachineVisual() {
  return (
    <div className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 mb-2">
      <svg viewBox="0 0 300 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="130" rx="6" className="fill-white dark:fill-[#070a10] stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
        
        {/* Nez de broche Schaublin et Pince W12 */}
        <path d="M20,30 L90,30 L100,50 L100,80 L90,100 L20,100 Z" fill="#334155" stroke="#64748b" strokeWidth="1.2" />
        <polygon points="90,45 125,50 125,80 90,85" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <rect x="125" y="58" width="45" height="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
        
        {/* Barre de tirage interne */}
        <line x1="10" y1="65" x2="90" y2="65" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
        <text x="35" y="60" className="fill-amber-600 dark:fill-amber-400 font-mono text-[7px] font-bold">Barre de tirage</text>

        {/* Comparateur à cadran (Contrôle faux-rond < 0.005 mm) */}
        <g transform="translate(145, 15)">
          <circle cx="15" cy="18" r="14" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="15" y1="18" x2="22" y2="14" stroke="#e11d48" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="15" cy="18" r="2" fill="#0284c7" />
          <rect x="13.5" y="32" width="3" height="15" fill="#64748b" />
          <circle cx="15" cy="48" r="1.5" fill="#e11d48" />
          <text x="32" y="16" className="fill-sky-700 dark:fill-sky-400 font-mono text-[7.5px] font-bold">Comparateur 1/1000</text>
          <text x="32" y="26" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">Faux-rond &lt; 0.005 mm</text>
        </g>

        {/* Repère d'atelier */}
        <rect x="10" y="105" width="280" height="18" rx="3" className="fill-amber-50 dark:fill-amber-950/30 stroke-amber-500/30" strokeWidth="0.8" />
        <text x="15" y="117" className="fill-amber-800 dark:fill-amber-300 font-mono text-[7.5px] font-bold">
          CONSIGNE : Dégraisser le cône W12 et plaquer le chariot contre le banc.
        </text>
      </svg>
    </div>
  );
}

// =========================================================================
// 3. ÉTAPES 2 & 3 : SORTIE DE BARRE (STICKOUT L <= 3xD)
// =========================================================================
export function BarStickoutVisual() {
  return (
    <div className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 mb-2">
      <svg viewBox="0 0 300 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="130" rx="6" className="fill-white dark:fill-[#070a10] stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
        
        {/* Pince W12 avec fente de serrage */}
        <path d="M20,35 L70,35 L85,50 L85,80 L70,95 L20,95 Z" fill="#475569" stroke="#334155" strokeWidth="1.2" />
        <line x1="50" y1="65" x2="85" y2="65" stroke="#f8fafc" strokeWidth="1.5" />
        <text x="25" y="50" className="fill-slate-200 font-mono text-[7px] font-bold">Pince W12</text>
        <text x="25" y="60" className="fill-slate-300 font-mono text-[6.5px]">Ø 3.00 mm</text>

        {/* Barre en acier carbone avec cote L <= 3D */}
        <rect x="85" y="57" width="90" height="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
        
        {/* Cotation de la sortie L */}
        <line x1="85" y1="42" x2="175" y2="42" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="85" y1="38" x2="85" y2="46" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="175" y1="38" x2="175" y2="46" stroke="#0284c7" strokeWidth="1.5" />
        <text x="130" y="36" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 font-mono text-[7.5px] font-bold">
          L ≤ 3×D (Max 9.0 mm)
        </text>

        {/* Burin positionné à 95° */}
        <g transform="translate(170, 75)">
          <path d="M0,0 L25,18 L35,14 L10,-4 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.2" />
          <polygon points="0,0 8,-3 4,4" fill="#f43f5e" />
          <text x="14" y="28" className="fill-rose-700 dark:fill-rose-400 font-mono text-[7.5px] font-bold">Outil couteau 95°</text>
        </g>

        {/* Alerte Porte-à-faux */}
        <rect x="10" y="105" width="280" height="18" rx="3" className="fill-cyan-50 dark:fill-cyan-950/30 stroke-cyan-500/30" strokeWidth="0.8" />
        <text x="15" y="117" className="fill-cyan-900 dark:fill-cyan-300 font-mono text-[7.5px] font-bold">
          RÈGLE D'OR : Sortie courte &lt; 9 mm pour éliminer toute flexion et broutement.
        </text>
      </svg>
    </div>
  );
}

// =========================================================================
// 4. ÉTAPES 4 À 6 : PRISE D'ORIGINE AU PAPIER TANGENTIEL
// =========================================================================
export function OriginVisual() {
  return (
    <div className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 mb-2">
      <svg viewBox="0 0 300 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="130" rx="6" className="fill-white dark:fill-[#070a10] stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
        
        {/* Face de la barre d'acier en rotation */}
        <rect x="30" y="45" width="80" height="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
        <line x1="110" y1="45" x2="110" y2="85" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <text x="45" y="68" className="fill-amber-800 dark:fill-amber-600 font-mono text-[8px] font-bold">Barre Acier</text>

        {/* Flèche de rotation */}
        <path d="M70,33 A10,10 0 0,1 78,41" fill="none" stroke="#eab308" strokeWidth="1.5" />
        <polygon points="78,41 74,38 81,37" fill="#eab308" />

        {/* Papier de soie / cigarette huilé (épaisseur 0.02 mm) */}
        <rect x="111" y="35" width="3" height="60" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
        <text x="118" y="42" className="fill-sky-700 dark:fill-sky-400 font-mono text-[7.5px] font-bold">Papier de soie</text>
        <text x="118" y="51" className="fill-slate-600 dark:fill-slate-400 font-mono text-[6.5px]">Épaisseur : 0.02 mm</text>

        {/* Bec tranchant du burin en approche */}
        <polygon points="125,65 160,55 160,75" fill="#1e293b" stroke="#10b981" strokeWidth="1.2" />
        <circle cx="125" cy="65" r="2.5" fill="#10b981" />
        <line x1="160" y1="65" x2="190" y2="65" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="140" y="88" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7.5px] font-bold">Bec du burin</text>

        {/* Vernier à zéro (Z0) */}
        <g transform="translate(210, 45)">
          <circle cx="20" cy="20" r="16" fill="#f8fafc" stroke="#10b981" strokeWidth="1.5" />
          <line x1="20" y1="4" x2="20" y2="10" stroke="#0f172a" strokeWidth="1.5" />
          <text x="20" y="24" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] font-black">Z=0</text>
          <text x="20" y="44" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[6.5px]">Tambour à zéro</text>
        </g>

        {/* Alerte Prise d'origine */}
        <rect x="10" y="105" width="280" height="18" rx="3" className="fill-emerald-50 dark:fill-emerald-950/30 stroke-emerald-500/30" strokeWidth="0.8" />
        <text x="15" y="117" className="fill-emerald-900 dark:fill-emerald-300 font-mono text-[7.5px] font-bold">
          MÉTHODE : Dès que le papier entraîne ou frotte, régler le tambour sur 0.
        </text>
      </svg>
    </div>
  );
}

// =========================================================================
// 5. ÉTAPE 7 : DRESSAGE DE FACE EN PASSES RADIALES (SANS TÉTON)
// =========================================================================
export function FacingPassesVisual() {
  return (
    <div className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 mb-2">
      <svg viewBox="0 0 300 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="130" rx="6" className="fill-white dark:fill-[#070a10] stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
        
        {/* Face de la pièce vue en coupe radiale */}
        <g transform="translate(35, 25)">
          <circle cx="45" cy="40" r="32" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="45" cy="40" r="3" fill="#e11d48" />
          {/* Centre exact */}
          <line x1="45" y1="5" x2="45" y2="75" stroke="#ca8a04" strokeWidth="0.8" strokeDasharray="3,2" />
          <line x1="10" y1="40" x2="80" y2="40" stroke="#ca8a04" strokeWidth="0.8" strokeDasharray="3,2" />
          <text x="45" y="85" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">Vue de Face (Ø 3.00)</text>
        </g>

        {/* Trajectoire radiale de l'outil de l'extérieur vers le centre */}
        <g transform="translate(130, 35)">
          {/* Ligne d'avance radiale */}
          <line x1="80" y1="30" x2="10" y2="30" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="10,30 18,26 18,34" fill="#eab308" />
          <text x="45" y="22" textAnchor="middle" className="fill-amber-700 dark:fill-amber-400 font-mono text-[7.5px] font-bold">Avance Radiale</text>
          
          {/* Burin de dressage */}
          <polygon points="5,30 25,18 35,42" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
          
          {/* Goutte d'huile de coupe */}
          <circle cx="8" cy="27" r="3" fill="#38bdf8" />
          <text x="14" y="14" className="fill-sky-700 dark:fill-sky-400 font-mono text-[6.5px]">Huile de coupe</text>

          {/* Copeau fluide */}
          <path d="M8,33 Q15,45 25,40" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Règle Zéro Téton */}
        <g transform="translate(210, 30)">
          <rect x="0" y="0" width="80" height="50" rx="4" className="fill-slate-50 dark:fill-slate-900 border border-slate-200 dark:border-white/10" strokeWidth="1" />
          <text x="40" y="16" textAnchor="middle" className="fill-slate-900 dark:fill-white font-mono text-[8px] font-bold">ZÉRO TÉTON</text>
          <text x="40" y="28" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[7.5px] font-bold">Hauteur Pilpoil</text>
          <text x="40" y="40" textAnchor="middle" className="fill-slate-500 font-mono text-[6.5px]">H = 70.00 mm</text>
        </g>

        {/* Alerte Dressage */}
        <rect x="10" y="105" width="280" height="18" rx="3" className="fill-yellow-50 dark:fill-yellow-950/30 stroke-yellow-500/30" strokeWidth="0.8" />
        <text x="15" y="117" className="fill-yellow-900 dark:fill-yellow-300 font-mono text-[7.5px] font-bold">
          PRÉCISION : Dépassement du centre de 0.05 mm pour une face plane sans relief.
        </text>
      </svg>
    </div>
  );
}
