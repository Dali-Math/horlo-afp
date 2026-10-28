'use client';

/**
 * HorloLearn — Schémas techniques vectoriels (partie C)
 * Posage, Emboîtage & Aiguillage — Conforme aux 9 fiches d'atelier horloger suisse.
 * Illustrations vectorielles haute fidélité avec thèmes Clair & Sombre.
 */

export function WorkshopKitSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kitSteel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="kitBrass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kitRedHandle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="kitArkansas" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Fond */}
      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre supérieur */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        OUTILLAGE &amp; ÉQUIPEMENT INDISPENSABLE D'EMBOÎTAGE SUISSE
      </text>

      {/* 1. Posage universel avec bague */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="130" height="90" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <ellipse cx="65" cy="45" rx="42" ry="22" fill="url(#kitSteel)" stroke="#475569" strokeWidth="1.2" />
        <ellipse cx="65" cy="45" rx="30" ry="15" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#334155]" strokeWidth="1" />
        <ellipse cx="65" cy="45" rx="20" ry="10" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.8" />
        <text x="65" y="80" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold" textAnchor="middle">
          Posage Universel
        </text>
        <text x="65" y="87" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">
          + Bague de réduction
        </text>
      </g>

      {/* 2. Porte-pièce à aiguiller avec vis de limitation */}
      <g transform="translate(185, 45)">
        <rect x="0" y="0" width="130" height="90" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        {/* Posoir & vis moletée */}
        <rect x="52" y="15" width="26" height="42" rx="2" fill="url(#kitSteel)" stroke="#334155" strokeWidth="1" />
        <ellipse cx="65" cy="15" rx="22" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
        {/* Doigt central */}
        <line x1="65" y1="8" x2="65" y2="28" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        {/* Molette inférieure */}
        <rect x="44" y="55" width="42" height="12" rx="2" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.8" />
        <line x1="50" y1="55" x2="50" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="58" y1="55" x2="58" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="66" y1="55" x2="66" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="74" y1="55" x2="74" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <text x="65" y="78" className="fill-amber-700 dark:fill-amber-400 font-mono text-[8px] font-bold" textAnchor="middle">
          Doigt de limitation
        </text>
        <text x="65" y="86" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">
          Soutien rubis trotteuse
        </text>
      </g>

      {/* 3. Posage gigogne + cabron */}
      <g transform="translate(340, 45)">
        <rect x="0" y="0" width="130" height="90" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <ellipse cx="65" cy="40" rx="46" ry="20" fill="url(#kitSteel)" stroke="#334155" strokeWidth="1.2" />
        {/* Cabron de peau */}
        <ellipse cx="65" cy="38" rx="36" ry="14" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="65" y="42" className="fill-amber-900 dark:fill-amber-800 font-mono text-[7px] font-bold" textAnchor="middle">
          Cabron de peau
        </text>
        <text x="65" y="78" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold" textAnchor="middle">
          Posage Gigogne
        </text>
        <text x="65" y="86" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">
          Protection cadran
        </text>
      </g>

      {/* Deuxième rangée : outils à main */}
      {/* 4. Tournevis rouge 1.20 mm */}
      <g transform="translate(30, 150)">
        <rect x="0" y="0" width="95" height="110" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        {/* Tournevis */}
        <g transform="translate(48, 12)">
          {/* Tête */}
          <circle cx="0" cy="5" r="9" fill="url(#kitSteel)" stroke="#334155" strokeWidth="0.8" />
          {/* Corps avec anneau rouge */}
          <rect x="-4" y="14" width="8" height="42" fill="url(#kitSteel)" stroke="#334155" strokeWidth="0.8" />
          <rect x="-5" y="24" width="10" height="10" fill="url(#kitRedHandle)" stroke="#7f1d1d" strokeWidth="0.8" />
          {/* Lame acier 1.20 */}
          <rect x="-1.5" y="56" width="3" height="18" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
          <polygon points="-2,74 2,74 0,78" fill="#334155" />
        </g>
        <text x="48" y="98" className="fill-red-700 dark:fill-red-400 font-mono text-[8px] font-bold" textAnchor="middle">
          Tournevis 1.20 mm
        </text>
        <text x="48" y="106" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">
          Bague ROUGE (Brides/Auto)
        </text>
      </g>

      {/* 5. Brucelles laiton (anti-rayure) */}
      <g transform="translate(140, 150)">
        <rect x="0" y="0" width="100" height="110" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <g transform="translate(50, 15)">
          <path d="M-8,0 L-4,65 L-1,72 L0,72 L-3,65 L-6,0 Z" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.7" />
          <path d="M8,0 L4,65 L1,72 L0,72 L3,65 L6,0 Z" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.7" />
          <rect x="-7" y="0" width="14" height="8" fill="#78350f" rx="1" />
        </g>
        <text x="50" y="98" className="fill-amber-800 dark:fill-amber-300 font-mono text-[8px] font-bold" textAnchor="middle">
          Brucelles Laiton
        </text>
        <text x="50" y="106" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7px]" textAnchor="middle">
          Anti-rayure platine
        </text>
      </g>

      {/* 6. Pierre d'Arkansas + Couteau ouvre-boîte */}
      <g transform="translate(255, 150)">
        <rect x="0" y="0" width="115" height="110" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        {/* Pierre */}
        <rect x="18" y="15" width="78" height="28" rx="2" fill="url(#kitArkansas)" stroke="#475569" strokeWidth="1" />
        <text x="57" y="32" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px] font-bold" textAnchor="middle">
          Pierre d'Arkansas
        </text>
        {/* Couteau ouvre-boîte */}
        <g transform="translate(25, 52)">
          <rect x="0" y="0" width="36" height="14" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
          <path d="M36,2 L55,7 L36,12 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="0.8" />
          <text x="65" y="10" className="fill-slate-600 dark:fill-slate-300 font-mono text-[6px]">Ébavurage</text>
        </g>
        <text x="57" y="98" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px] font-bold" textAnchor="middle">
          Arkansas &amp; Lame
        </text>
        <text x="57" y="106" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">
          Cône 90° &amp; ébavurage tige
        </text>
      </g>

      {/* 7. Brosse poil de martre (marron) */}
      <g transform="translate(385, 150)">
        <rect x="0" y="0" width="95" height="110" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <g transform="translate(48, 12)">
          {/* Manche bois */}
          <rect x="-3" y="0" width="6" height="45" rx="1" fill="#78350f" stroke="#451a03" strokeWidth="0.7" />
          {/* Virole métal */}
          <rect x="-4" y="45" width="8" height="10" fill="#94a3b8" stroke="#334155" strokeWidth="0.7" />
          {/* Poils de martre marron doux */}
          <path d="M-5,55 C-8,70 -3,78 0,80 C3,78 8,70 5,55 Z" fill="#582900" stroke="#3d1d00" strokeWidth="0.8" />
        </g>
        <text x="48" y="98" className="fill-amber-900 dark:fill-amber-300 font-mono text-[8px] font-bold" textAnchor="middle">
          Poil de Martre
        </text>
        <text x="48" y="106" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7px]" textAnchor="middle">
          Seule autorisée s/ cadran
        </text>
      </g>
    </svg>
  );
}

export function AutoModuleRemovalSVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="autoRotorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="screwBlackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
      </defs>

      <rect width="500" height="260" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        DÉPOSE DU MODULE AUTOMATIQUE (CALIBRE ETA 2824-2)
      </text>

      {/* Dessin du mouvement de dessus */}
      <g transform="translate(60, 45)">
        {/* Platine circulaire */}
        <circle cx="120" cy="95" r="85" className="fill-slate-300 dark:fill-slate-700 stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" />
        
        {/* Bâti du remontage automatique */}
        <path d="M70,50 Q120,35 170,50 L175,100 Q120,130 65,100 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />

        {/* Masse oscillante demi-lune */}
        <path d="M45,95 A75,75 0 0,0 195,95 L150,95 A30,30 0 0,1 90,95 Z" fill="url(#autoRotorGrad)" stroke="#475569" strokeWidth="1.2" />
        {/* Roulement central */}
        <circle cx="120" cy="95" r="14" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
        <circle cx="120" cy="95" r="5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
        {/* Côtes de Genève stylisées */}
        <line x1="60" y1="120" x2="180" y2="120" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="70" y1="140" x2="170" y2="140" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,3" />

        {/* VIS NOIRE 1 */}
        <g transform="translate(85, 62)">
          <circle cx="0" cy="0" r="6" fill="url(#screwBlackGrad)" stroke="#020617" strokeWidth="1" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#94a3b8" strokeWidth="1.2" />
          {/* Flèche repère */}
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        </g>

        {/* VIS NOIRE 2 */}
        <g transform="translate(155, 62)">
          <circle cx="0" cy="0" r="6" fill="url(#screwBlackGrad)" stroke="#020617" strokeWidth="1" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#94a3b8" strokeWidth="1.2" />
          {/* Flèche repère */}
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        </g>

        {/* Flèches de levée */}
        <path d="M120,40 L120,15 M115,22 L120,15 L125,22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="8" className="fill-blue-600 dark:fill-blue-400 font-mono text-[9px] font-bold" textAnchor="middle">
          Retrait en bloc
        </text>
      </g>

      {/* Panneau explicatif à droite */}
      <g transform="translate(290, 48)">
        <rect x="0" y="0" width="190" height="185" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="15" y="22" className="fill-red-700 dark:fill-red-400 font-mono text-[10px] font-bold">
          2 VIS NOIRES D'AUTOMATISME
        </text>
        <line x1="15" y1="28" x2="175" y2="28" stroke="#dc2626" strokeWidth="1" />

        <text x="15" y="46" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8.5px]">
          • Outil : Tournevis <tspan className="fill-red-600 font-bold">ROUGE 1.20 mm</tspan>
        </text>
        <text x="15" y="62" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8.5px]">
          • Particularité : Vis bleuies ou
        </text>
        <text x="23" y="74" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8.5px]">
          brillant-noir distinctes
        </text>

        <rect x="10" y="86" width="170" height="85" rx="4" className="fill-red-50 dark:fill-red-950/40 stroke-red-200 dark:stroke-red-900" strokeWidth="0.8" />
        <text x="18" y="100" className="fill-red-800 dark:fill-red-300 font-mono text-[8px] font-bold">
          JUSTIFICATION TECHNIQUE :
        </text>
        <text x="18" y="114" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          Déposer le module automatique
        </text>
        <text x="18" y="125" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          évite d'exercer des contraintes
        </text>
        <text x="18" y="136" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          sur les pivots du roulement de
        </text>
        <text x="18" y="147" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          rotor lors des pressions
        </text>
        <text x="18" y="158" className="fill-red-700 dark:fill-red-400 font-mono text-[7.5px] font-bold">
          de chassage des aiguilles !
        </text>
      </g>
    </svg>
  );
}

export function DialFeetSupportSVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brassPlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      <rect width="500" height="260" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        BRIDAGE DU CADRAN &amp; INTERDICTION FORMELLE D'APPUI SUR LES PIERRES
      </text>

      {/* Schéma principal en coupe */}
      <g transform="translate(30, 45)">
        {/* Posage gigogne en dessous */}
        <rect x="20" y="140" width="260" height="40" rx="4" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
        {/* Cabron de peau protecteur */}
        <rect x="25" y="134" width="250" height="8" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
        <text x="150" y="140" className="fill-amber-900 font-mono text-[7px] font-bold" textAnchor="middle">
          CABRON DE PEAU (Protection laque cadran)
        </text>

        {/* Cadran retourné (face vers le bas) */}
        <rect x="35" y="122" width="230" height="10" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        <text x="150" y="130" className="fill-slate-300 font-mono text-[7px]" textAnchor="middle">
          Cadran (laque &amp; pieds orientés vers le haut)
        </text>

        {/* Platine au-dessus */}
        <rect x="45" y="70" width="210" height="45" rx="2" fill="url(#brassPlateGrad)" stroke="#854d0e" strokeWidth="1.2" />
        
        {/* Rubis / Pierres chassées sur le pont */}
        <ellipse cx="90" cy="70" rx="8" ry="4" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        <circle cx="90" cy="70" r="2" fill="#be185d" />
        <ellipse cx="210" cy="70" rx="8" ry="4" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        <circle cx="210" cy="70" r="2" fill="#be185d" />

        {/* Croix rouge d'interdiction d'appui sur les pierres */}
        <g transform="translate(90, 52)">
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#dc2626" strokeWidth="3" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#dc2626" strokeWidth="3" />
        </g>
        <g transform="translate(210, 52)">
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#dc2626" strokeWidth="3" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#dc2626" strokeWidth="3" />
        </g>

        {/* Flèche d'appui autorisée sur le pont métallique */}
        <g transform="translate(150, 48)">
          <path d="M0,0 L0,18 M-4,12 L0,18 L4,12" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
          <text x="0" y="-4" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[8px] font-bold" textAnchor="middle">
            APPUI MÉTAL SEUL
          </text>
        </g>

        {/* Brides cadran actionnées par brucelles laiton */}
        <g transform="translate(258, 88)">
          <path d="M0,0 L18,0 L14,-6" stroke="#d97706" strokeWidth="2" fill="none" />
          <text x="24" y="4" className="fill-amber-700 dark:fill-amber-400 font-mono text-[8px] font-bold">
            Bride poussée en butée
          </text>
          <text x="24" y="14" className="fill-slate-500 dark:fill-slate-400 font-mono text-[7px]">
            (Brucelles laiton exclusivement)
          </text>
        </g>
      </g>

      {/* Cartouche d'avertissement */}
      <g transform="translate(325, 140)">
        <rect x="0" y="0" width="160" height="95" rx="6" className="fill-amber-50 dark:fill-amber-950/40 stroke-amber-300 dark:stroke-amber-800" strokeWidth="1" />
        <text x="12" y="18" className="fill-amber-900 dark:fill-amber-200 font-mono text-[9px] font-bold">
          RÈGLE D'OR D'ATELIER :
        </text>
        <text x="12" y="34" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          1. Ne JAMAIS appuyer
        </text>
        <text x="16" y="45" className="fill-red-700 dark:fill-red-400 font-mono text-[7.5px] font-bold">
          sur les pierres des ponts !
        </text>
        <text x="16" y="56" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">
          (Risque d'expulser l'huile
        </text>
        <text x="16" y="66" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">
          ou d'ébrécher le rubis)
        </text>
        <text x="12" y="80" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          2. Présence rondelle clinquant
        </text>
        <text x="16" y="90" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]">
          sur roue des heures contrôlée
        </text>
      </g>
    </svg>
  );
}

export function LimitationFingerSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fingerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="rubyCenterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        PORTE-PIÈCE À VIS DE LIMITATION SOUS LA PIERRE DE SECONDE
      </text>

      {/* Coupe centrale */}
      <g transform="translate(180, 45)">
        {/* Canon & Roue de seconde centrale */}
        {/* Pivot de seconde fin */}
        <rect x="68" y="10" width="4" height="150" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />
        
        {/* Pont de rouage supérieur */}
        <rect x="10" y="60" width="120" height="20" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
        {/* Pierre du pont */}
        <rect x="62" y="62" width="16" height="16" rx="2" fill="url(#rubyCenterGrad)" stroke="#9f1239" strokeWidth="1" />
        
        {/* Pont inférieur avec contre-pivot */}
        <rect x="10" y="140" width="120" height="20" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
        <rect x="62" y="142" width="16" height="16" rx="2" fill="url(#rubyCenterGrad)" stroke="#9f1239" strokeWidth="1" />

        {/* DOIGT DE LIMITATION (support inférieur) */}
        <g transform="translate(58, 160)">
          {/* Pointe de soutien en contact franc */}
          <polygon points="12,0 6,15 18,15" fill="url(#fingerGrad)" stroke="#78350f" strokeWidth="1" />
          {/* Tige filetée */}
          <rect x="8" y="15" width="8" height="45" fill="url(#fingerGrad)" stroke="#78350f" strokeWidth="0.8" />
          {/* Molette moletée de réglage */}
          <rect x="-10" y="60" width="44" height="14" rx="2" fill="#d97706" stroke="#451a03" strokeWidth="1" />
          <line x1="-4" y1="60" x2="-4" y2="74" stroke="#78350f" strokeWidth="1" />
          <line x1="4" y1="60" x2="4" y2="74" stroke="#78350f" strokeWidth="1" />
          <line x1="12" y1="60" x2="12" y2="74" stroke="#78350f" strokeWidth="1" />
          <line x1="20" y1="60" x2="20" y2="74" stroke="#78350f" strokeWidth="1" />
          <line x1="28" y1="60" x2="28" y2="74" stroke="#78350f" strokeWidth="1" />
        </g>

        {/* Pression de chassage venant du haut */}
        <g transform="translate(70, -2)">
          {/* Posoir d'aiguille */}
          <rect x="-6" y="-12" width="12" height="18" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <path d="M0,8 L0,18 M-4,13 L0,18 L4,13" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
          <text x="0" y="-16" className="fill-red-600 dark:fill-red-400 font-mono text-[8px] font-bold" textAnchor="middle">
            Force F
          </text>
        </g>

        {/* Réaction de soutien R */}
        <g transform="translate(70, 182)">
          <path d="M0,0 L0,-14 M-4,-8 L0,-14 L4,-8" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
          <text x="22" y="-6" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[8px] font-bold">
            Appui R
          </text>
        </g>
      </g>

      {/* Cartouche d'explication à gauche */}
      <g transform="translate(25, 55)">
        <rect x="0" y="0" width="145" height="190" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="12" y="20" className="fill-amber-800 dark:fill-amber-300 font-mono text-[9.5px] font-bold">
          FONCTION DU DOIGT :
        </text>
        <line x1="12" y1="26" x2="133" y2="26" stroke="#d97706" strokeWidth="0.8" />
        
        <text x="12" y="42" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px] leading-relaxed">
          1. Visser la molette
        </text>
        <text x="16" y="54" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          jusqu'au contact franc
        </text>
        <text x="16" y="66" className="fill-amber-700 dark:fill-amber-400 font-mono text-[7.5px] font-bold">
          sous la pierre de seconde.
        </text>

        <text x="12" y="86" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          2. Lors du chassage de
        </text>
        <text x="16" y="98" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          la trotteuse, l'effort
        </text>
        <text x="16" y="110" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          est absorbé par le
        </text>
        <text x="16" y="122" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7.5px] font-bold">
          doigt de limitation.
        </text>

        <rect x="8" y="134" width="129" height="46" rx="4" className="fill-red-50 dark:fill-red-950/40 stroke-red-200 dark:stroke-red-900" strokeWidth="0.8" />
        <text x="14" y="146" className="fill-red-700 dark:fill-red-400 font-mono text-[7px] font-bold">
          SANS CE DOIGT :
        </text>
        <text x="14" y="157" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Déchassage du rubis
        </text>
        <text x="14" y="167" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Rupture du pivot de seconde
        </text>
      </g>

      {/* Cartouche tolérances à droite */}
      <g transform="translate(340, 55)">
        <rect x="0" y="0" width="135" height="190" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="12" y="20" className="fill-blue-700 dark:fill-blue-400 font-mono text-[9px] font-bold">
          RÉGLAGE VIS SOUTIEN
        </text>
        <line x1="12" y1="26" x2="123" y2="26" stroke="#2563eb" strokeWidth="0.8" />

        <text x="12" y="44" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          • Molette : crantée
        </text>
        <text x="12" y="58" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          • Contact : à fleur,
        </text>
        <text x="16" y="70" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          sans soulever le pont
        </text>
        <text x="12" y="88" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          • Vérification :
        </text>
        <text x="16" y="100" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          la roue tourne libre
        </text>
        <text x="16" y="112" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          avant le chassage.
        </text>

        <rect x="8" y="130" width="119" height="50" rx="4" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="0.8" />
        <text x="14" y="145" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7.5px] font-bold">
          CONSEIL MAÎTRE :
        </text>
        <text x="14" y="157" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          Dévisser d'1/8e de tour
        </text>
        <text x="14" y="167" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          après aiguillage pour
        </text>
        <text x="14" y="176" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          libérer le calibre !
        </text>
      </g>
    </svg>
  );
}

export function DateJumpSyncSVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dialRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>

      <rect width="500" height="260" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        SYNCHRONISATION DU SAUT DE DATE &amp; DÉTECTION À 00H00 PILE
      </text>

      {/* Cadran d'illustration */}
      <g transform="translate(60, 45)">
        <circle cx="95" cy="95" r="88" fill="url(#dialRadial)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="95" cy="95" r="92" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

        {/* Index */}
        <line x1="95" y1="12" x2="95" y2="24" stroke="#0f172a" strokeWidth="3" />
        <text x="95" y="36" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">12</text>
        <line x1="178" y1="95" x2="166" y2="95" stroke="#0f172a" strokeWidth="2" />
        <line x1="95" y1="178" x2="95" y2="166" stroke="#0f172a" strokeWidth="2" />
        <line x1="12" y1="95" x2="24" y2="95" stroke="#0f172a" strokeWidth="2" />

        {/* Secteur de tolérance 23h55 - 00h05 en vert translucide */}
        <path d="M95,95 L90,14 A82,82 0 0,1 100,14 Z" fill="#22c55e" opacity="0.45" />

        {/* Guichet de date à 3h */}
        <rect x="135" y="84" width="28" height="22" rx="2" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        <text x="149" y="99" fill="#dc2626" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">28</text>

        {/* Saut franc représenté */}
        <path d="M149,80 L149,70 M145,74 L149,70 L153,74" stroke="#dc2626" strokeWidth="1.5" />
        <text x="149" y="65" className="fill-red-600 font-mono text-[7px] font-bold" textAnchor="middle">CLIC !</text>

        {/* Rotation antihoraire au ralenti */}
        <path d="M50,45 A65,65 0 0,1 90,32" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="50" y="38" className="fill-blue-600 font-mono text-[7.5px] font-bold">Sens antihoraire</text>
      </g>

      {/* Panneau de protocole à droite */}
      <g transform="translate(275, 48)">
        <rect x="0" y="0" width="200" height="185" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="15" y="22" className="fill-amber-800 dark:fill-amber-300 font-mono text-[10px] font-bold">
          MÉTHODE OFFICIELLE SUISSE :
        </text>
        <line x1="15" y1="28" x2="185" y2="28" stroke="#d97706" strokeWidth="1" />

        <text x="15" y="46" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px]">
          1. Tige en position <tspan className="font-bold text-blue-600">Mise à l'Heure (3)</tspan>
        </text>
        <text x="15" y="62" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px]">
          2. Tourner doucement en arrière
        </text>
        <text x="23" y="74" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px]">
          puis avancer vers 24h00.
        </text>

        <text x="15" y="92" className="fill-slate-800 dark:fill-slate-200 font-mono text-[8px]">
          3. Ralentir à l'approche de minuit :
        </text>
        <text x="23" y="104" className="fill-red-600 dark:fill-red-400 font-mono text-[8px] font-bold">
          STOPPER NET au saut franc du disque !
        </text>

        <rect x="10" y="116" width="180" height="58" rx="4" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="0.8" />
        <text x="18" y="130" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[8px] font-bold">
          TOLÉRANCE CHRONOMÉTRIQUE :
        </text>
        <text x="18" y="144" className="fill-slate-700 dark:fill-slate-300 font-mono text-[8px]">
          • Saut franc : <tspan className="font-bold text-emerald-600">23h55 – 00h05</tspan> (± 5 min)
        </text>
        <text x="18" y="158" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          • Chasser l'aiguille des heures à 12h00 pile !
        </text>
      </g>
    </svg>
  );
}

export function HoursMinutesFittingSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hourHandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        CHASSAGE DES HEURES &amp; MINUTES · INDEXATION (-2 / +2 MIN) &amp; PARALLÉLISME
      </text>

      {/* Vue de profil / coupe des canons */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="220" height="195" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="110" y="20" className="fill-slate-800 dark:fill-slate-200 font-mono text-[9px] font-bold" textAnchor="middle">
          COUPE DES AXES &amp; CANONS
        </text>

        {/* Chaussée & Roue des heures */}
        <g transform="translate(110, 110)">
          {/* Platine / Cadran */}
          <rect x="-90" y="45" width="180" height="8" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          <text x="0" y="62" className="fill-slate-600 dark:fill-slate-400 font-mono text-[7px]" textAnchor="middle">Cadran laiton</text>

          {/* Roue des heures */}
          <rect x="-30" y="25" width="60" height="10" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          {/* Canon des heures */}
          <rect x="-14" y="0" width="28" height="25" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          {/* Aiguille des heures chassée à fleur */}
          <rect x="-65" y="0" width="60" height="5" rx="1" fill="url(#hourHandGrad)" stroke="#020617" strokeWidth="0.8" />
          <text x="-35" y="-3" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px] font-bold">À fleur roue h.</text>

          {/* Chaussée (minutes) */}
          <rect x="-8" y="-22" width="16" height="47" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          {/* Aiguille des minutes chassée à fleur */}
          <rect x="-75" y="-22" width="70" height="4" rx="1" fill="url(#hourHandGrad)" stroke="#020617" strokeWidth="0.8" />
          <text x="-40" y="-25" className="fill-blue-700 dark:fill-blue-400 font-mono text-[7px] font-bold">À fleur chaussée</text>

          {/* Axe de seconde central */}
          <rect x="-2" y="-38" width="4" height="63" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />

          {/* Garde G2 entre heures et minutes */}
          <line x1="-55" y1="0" x2="-55" y2="-18" stroke="#16a34a" strokeWidth="1.5" />
          <text x="-58" y="-8" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7px] font-bold" textAnchor="end">
            G2 ≥ 0.15 mm
          </text>
        </g>
      </g>

      {/* Vue de dessus : tolérance d'indexation -2 / +2 min */}
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="195" height="195" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="97" y="20" className="fill-amber-800 dark:fill-amber-300 font-mono text-[9px] font-bold" textAnchor="middle">
          CONTRÔLE D'INDEXATION
        </text>

        {/* Cadran zoomé sur 12h */}
        <g transform="translate(97, 105)">
          <circle cx="0" cy="0" r="65" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" />
          {/* Index 12 */}
          <rect x="-3" y="-62" width="6" height="14" fill="#0f172a" />
          <text x="0" y="-38" fill="#0f172a" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">12:00</text>

          {/* Secteur tolérance vert -2 min / +2 min */}
          <path d="M0,0 L-7,-56 A60,60 0 0,1 7,-56 Z" fill="#22c55e" opacity="0.4" />
          <line x1="-7" y1="-56" x2="-7" y2="-45" stroke="#15803d" strokeWidth="1" strokeDasharray="1,1" />
          <line x1="7" y1="-56" x2="7" y2="-45" stroke="#15803d" strokeWidth="1" strokeDasharray="1,1" />

          {/* Aiguille des heures sur 12h00 pile */}
          <rect x="-2" y="-35" width="4" height="35" rx="1" fill="#0f172a" />

          {/* Aiguille des minutes pointant sur 12h00 */}
          <rect x="-1" y="-55" width="2" height="55" rx="0.5" fill="#2563eb" />
        </g>

        <rect x="10" y="145" width="175" height="42" rx="4" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="0.8" />
        <text x="18" y="159" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7.5px] font-bold">
          TOLÉRANCE D'INDEXATION :
        </text>
        <text x="18" y="171" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7.5px]">
          Quand Heures = 12h00 pile :
        </text>
        <text x="18" y="181" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7.5px] font-bold">
          Minutes comprises entre 11h58 et 12h02 !
        </text>
      </g>
    </svg>
  );
}

export function SecondsReamingSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="reamerSteel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        PRÉPARATION DU CANON DE TROTTEUSE · ÉQUARRISSAGE 90° &amp; GARDES G3/G4
      </text>

      {/* Panneau gauche : équarrissage du canon */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="210" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="105" y="20" className="fill-amber-800 dark:fill-amber-300 font-mono text-[9px] font-bold" textAnchor="middle">
          ÉQUARRISSAGE PAR LE DESSOUS
        </text>

        {/* Coupe agrandie du canon de seconde */}
        <g transform="translate(105, 110)">
          {/* Palette trotteuse */}
          <rect x="-60" y="-30" width="120" height="6" rx="1" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
          <text x="0" y="-35" className="fill-red-700 font-mono text-[7px] font-bold" textAnchor="middle">Aiguille trotteuse</text>

          {/* Tube de canon */}
          <rect x="-14" y="-24" width="7" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          <rect x="7" y="-24" width="7" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          {/* Alésage central */}
          <rect x="-7" y="-24" width="14" height="40" fill="#cbd5e1" opacity="0.3" />

          {/* Équarrissoir inséré à mi-hauteur */}
          <polygon points="-5,16 5,16 3,-6 -3,-6" fill="url(#reamerSteel)" stroke="#0f172a" strokeWidth="0.8" />
          <rect x="-3" y="16" width="6" height="35" fill="url(#reamerSteel)" stroke="#334155" strokeWidth="0.8" />

          {/* Cotes : mi-hauteur */}
          <line x1="20" y1="-24" x2="20" y2="16" stroke="#475569" strokeWidth="0.8" />
          <line x1="26" y1="-4" x2="16" y2="-4" stroke="#d97706" strokeWidth="1.2" />
          <text x="30" y="-2" className="fill-amber-700 dark:fill-amber-400 font-mono text-[7px] font-bold">Mi-hauteur max</text>
        </g>

        <rect x="10" y="160" width="190" height="36" rx="4" className="fill-amber-50 dark:fill-amber-950/40 stroke-amber-200 dark:stroke-amber-900" strokeWidth="0.8" />
        <text x="18" y="174" className="fill-amber-900 dark:fill-amber-200 font-mono text-[7px] font-bold">
          Angle 90° d'attaque strict :
        </text>
        <text x="18" y="184" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          Ébavure l'entrée sans ovaliser le tube !
        </text>
      </g>

      {/* Panneau droit : chassage & gardes */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="210" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="105" y="20" className="fill-blue-800 dark:fill-blue-300 font-mono text-[9px] font-bold" textAnchor="middle">
          CONTRÔLE GARDES G3 &amp; G4 (NIHS)
        </text>

        {/* Dessin étagé */}
        <g transform="translate(105, 95)">
          {/* Glace saphir */}
          <line x1="-70" y1="-40" x2="70" y2="-40" stroke="#0284c7" strokeWidth="2.5" />
          <text x="0" y="-44" className="fill-sky-700 dark:fill-sky-300 font-mono text-[7px] font-bold" textAnchor="middle">Glace Saphir</text>

          {/* Trotteuse */}
          <line x1="-60" y1="-15" x2="55" y2="-15" stroke="#dc2626" strokeWidth="1.8" />
          <circle cx="0" cy="-15" r="4" fill="#dc2626" />
          {/* Contrepoids */}
          <rect x="-60" y="-18" width="15" height="6" rx="2" fill="#dc2626" />

          {/* Minutes */}
          <line x1="-50" y1="5" x2="50" y2="5" stroke="#2563eb" strokeWidth="2" />
          {/* Heures */}
          <line x1="-40" y1="25" x2="40" y2="25" stroke="#0f172a" strokeWidth="2.5" />

          {/* Cotations G4 & G3 */}
          <line x1="60" y1="-40" x2="60" y2="-15" stroke="#059669" strokeWidth="1.2" />
          <text x="64" y="-25" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7px] font-bold">G4 ≥ 0.30 mm</text>

          <line x1="60" y1="-15" x2="60" y2="5" stroke="#059669" strokeWidth="1.2" />
          <text x="64" y="-3" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[7px] font-bold">G3 ≥ 0.15 mm</text>
        </g>

        <rect x="10" y="150" width="190" height="46" rx="4" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="0.8" />
        <text x="16" y="164" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px] font-bold">
          CONTRÔLE DU CONTREPOIDS :
        </text>
        <text x="16" y="175" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          Vérifier que le contrepoids de la
        </text>
        <text x="16" y="184" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          trotteuse ne plonge pas sur les minutes !
        </text>
      </g>
    </svg>
  );
}

export function SafeStemRelease1515SVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cadran1515" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="85%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>

      <rect width="500" height="260" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        RETRAIT SÉCURISÉ DE LA TIGE DE REMONTOIR &amp; AIGUILLES À 15H15
      </text>

      {/* Cadran avec aiguilles orientées à 15h15 */}
      <g transform="translate(50, 45)">
        <circle cx="95" cy="95" r="85" fill="url(#cadran1515)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="95" cy="95" r="90" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

        {/* Index 12, 3, 6, 9 */}
        <line x1="95" y1="15" x2="95" y2="25" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="175" y1="95" x2="165" y2="95" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="95" y1="175" x2="95" y2="165" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="15" y1="95" x2="25" y2="95" stroke="#0f172a" strokeWidth="2.5" />

        {/* Tube / Couronne à 3h */}
        <rect x="180" y="88" width="12" height="14" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
        <rect x="192" y="84" width="8" height="22" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />

        {/* AIGUILLES GROUPÉES VERS 15H15 (pointant vers 3h) */}
        {/* Aiguille des heures à 3h */}
        <line x1="95" y1="95" x2="145" y2="95" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        {/* Aiguille des minutes à 3h (15 min) */}
        <line x1="95" y1="95" x2="162" y2="95" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="95" cy="95" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />

        {/* Bulle d'explication 15h15 */}
        <rect x="40" y="115" width="110" height="26" rx="4" className="fill-emerald-100 dark:fill-emerald-950/70 stroke-emerald-400" strokeWidth="0.8" />
        <text x="95" y="126" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px] font-bold" textAnchor="middle">
          POSITION 15H15
        </text>
        <text x="95" y="136" className="fill-slate-600 dark:fill-slate-300 font-mono text-[6.5px]" textAnchor="middle">
          Dégagées des rebords de boîte
        </text>
      </g>

      {/* Panneau de droite : manœuvre de tirette */}
      <g transform="translate(270, 48)">
        <rect x="0" y="0" width="205" height="185" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="15" y="20" className="fill-red-700 dark:fill-red-400 font-mono text-[9.5px] font-bold">
          PLOT DE TIRETTE &amp; TOURNEVIS 1.20
        </text>
        <line x1="15" y1="26" x2="190" y2="26" stroke="#dc2626" strokeWidth="0.8" />

        {/* Illustration schématique tirette */}
        <g transform="translate(45, 55)">
          {/* Plot de tirette */}
          <circle cx="0" cy="0" r="7" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="#cbd5e1" />
          {/* Tournevis rouge 1.20 mm appuyant */}
          <rect x="-2" y="-35" width="4" height="25" fill="#e2e8f0" stroke="#334155" strokeWidth="0.8" />
          <rect x="-5" y="-55" width="10" height="20" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
          {/* Flèche pression douce */}
          <path d="M12,-20 L12,-5 M8,-10 L12,-5 L16,-10" stroke="#dc2626" strokeWidth="1.5" />
          <text x="20" y="-10" className="fill-red-600 font-mono text-[7px] font-bold">Pression douce</text>
        </g>

        {/* Flèche d'extraction tige */}
        <g transform="translate(130, 55)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#2563eb" strokeWidth="2.5" />
          <polygon points="35,-4 42,0 35,4" fill="#2563eb" />
          <text x="20" y="14" className="fill-blue-600 font-mono text-[7px] font-bold" textAnchor="middle">Traction axe</text>
        </g>

        <rect x="10" y="95" width="185" height="78" rx="4" className="fill-red-50 dark:fill-red-950/40 stroke-red-200 dark:stroke-red-900" strokeWidth="0.8" />
        <text x="18" y="110" className="fill-red-800 dark:fill-red-300 font-mono text-[8px] font-bold">
          ATTENTION PIÈGE MAJEUR :
        </text>
        <text x="18" y="123" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          • Ne jamais forcer sur le plot de tirette !
        </text>
        <text x="18" y="135" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          • Un enfoncement excessif déboîte la bascule :
        </text>
        <text x="18" y="147" className="fill-red-700 dark:fill-red-400 font-mono text-[7px] font-bold">
          le sautoir saute et nécessite le redémontage
        </text>
        <text x="18" y="158" className="fill-red-700 dark:fill-red-400 font-mono text-[7px] font-bold">
          complet du cadran !
        </text>
      </g>
    </svg>
  );
}

export function CleanlinessProtocolSVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="260" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        PROTOCOLE PROPRETÉ CHIRURGICALE · ZÉRO RODICO SUR CADRAN
      </text>

      {/* Panneau GAUCHE : Interdiction Rodico sur cadran */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="210" height="195" rx="6" className="fill-red-50/60 dark:fill-red-950/20 stroke-red-300 dark:stroke-red-900" strokeWidth="1" />
        
        {/* Symbole INTERDIT */}
        <circle cx="105" cy="55" r="32" fill="none" stroke="#dc2626" strokeWidth="4" />
        <line x1="82" y1="32" x2="128" y2="78" stroke="#dc2626" strokeWidth="4" />
        {/* Boule de Rodico barrée */}
        <ellipse cx="105" cy="55" rx="16" ry="12" fill="#86efac" stroke="#16a34a" strokeWidth="1" />
        <text x="105" y="58" fill="#14532d" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">RODICO</text>

        <text x="105" y="105" className="fill-red-700 dark:fill-red-400 font-mono text-[9px] font-bold" textAnchor="middle">
          INTERDIT SUR LE CADRAN !
        </text>
        <text x="105" y="122" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]" textAnchor="middle">
          Laisse un film gras irréversible
        </text>
        <text x="105" y="132" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]" textAnchor="middle">
          sur les vernis mats, soleillés et laqués.
        </text>

        <rect x="15" y="145" width="180" height="38" rx="4" className="fill-white dark:fill-slate-900 stroke-red-200 dark:stroke-red-950" strokeWidth="0.8" />
        <text x="105" y="159" className="fill-red-800 dark:fill-red-300 font-mono text-[7px] font-bold" textAnchor="middle">
          PAS DE SOUFFLETTE DIRECTE !
        </text>
        <text x="105" y="170" className="fill-slate-600 dark:fill-slate-400 font-mono text-[6.5px]" textAnchor="middle">
          Chasse les fibres sous les aiguilles.
        </text>
      </g>

      {/* Panneau DROIT : Méthode autorisée brosse poil de martre */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="210" height="195" rx="6" className="fill-emerald-50/60 dark:fill-emerald-950/20 stroke-emerald-300 dark:stroke-emerald-900" strokeWidth="1" />
        
        {/* Symbole VALIDÉ */}
        <circle cx="105" cy="55" r="32" fill="none" stroke="#16a34a" strokeWidth="3" />
        {/* Brosse martre dessinée */}
        <g transform="translate(105, 30)">
          <rect x="-2" y="0" width="4" height="28" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
          <rect x="-3" y="28" width="6" height="6" fill="#94a3b8" />
          <path d="M-4,34 C-6,44 -2,50 0,52 C2,50 6,44 4,34 Z" fill="#582900" stroke="#3d1d00" strokeWidth="0.6" />
        </g>
        <text x="105" y="105" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[9px] font-bold" textAnchor="middle">
          BROSSE POIL DE MARTRE (MARRON)
        </text>
        <text x="105" y="122" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]" textAnchor="middle">
          Seule méthode agréée en atelier
        </text>
        <text x="105" y="132" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]" textAnchor="middle">
          pour dépoussiérer un cadran habillé.
        </text>

        <rect x="15" y="145" width="180" height="38" rx="4" className="fill-white dark:fill-slate-900 stroke-emerald-200 dark:stroke-emerald-950" strokeWidth="0.8" />
        <text x="105" y="159" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px] font-bold" textAnchor="middle">
          BOÎTE &amp; GLACE SAPHIR :
        </text>
        <text x="105" y="170" className="fill-slate-600 dark:fill-slate-400 font-mono text-[6.5px]" textAnchor="middle">
          Microfibre blanche + faisceau 45°.
        </text>
      </g>
    </svg>
  );
}

export function ArkansasConeSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arkansasGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="mandrinBrass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        COUPE DE TIGE · CÔNE À 90° SUR PIERRE D'ARKANSAS &amp; LOCTITE 222
      </text>

      {/* Illustration centrale : Mandrin tenu à 45° sur la pierre */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="240" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="120" y="20" className="fill-amber-800 dark:fill-amber-300 font-mono text-[9px] font-bold" textAnchor="middle">
          ROULEMENT DU MANDRIN À 45°
        </text>

        {/* Pierre d'Arkansas au sol */}
        <rect x="20" y="140" width="200" height="35" rx="3" fill="url(#arkansasGrad2)" stroke="#475569" strokeWidth="1.2" />
        <text x="120" y="162" className="fill-slate-700 font-mono text-[8px] font-bold" textAnchor="middle">
          Pierre d'Arkansas fine
        </text>

        {/* Mandrin incliné à 45° */}
        <g transform="translate(130, 140) rotate(-45)">
          {/* Tige sortant du mandrin */}
          <rect x="-1.5" y="-15" width="3" height="15" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
          {/* Mandrin aux tiges (laiton moleté) */}
          <rect x="-8" y="-95" width="16" height="80" rx="2" fill="url(#mandrinBrass)" stroke="#78350f" strokeWidth="1" />
          <line x1="-8" y1="-80" x2="8" y2="-80" stroke="#78350f" strokeWidth="0.8" />
          <line x1="-8" y1="-65" x2="8" y2="-65" stroke="#78350f" strokeWidth="0.8" />
          <line x1="-8" y1="-50" x2="8" y2="-50" stroke="#78350f" strokeWidth="0.8" />
          <text x="0" y="-35" fill="#78350f" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Mandrin</text>
        </g>

        {/* Arc de rotation 45° */}
        <path d="M100,140 A30,30 0 0,0 120,118" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="96" y="125" className="fill-amber-700 font-mono text-[8px] font-bold">45°</text>

        {/* Mouvement de va-et-vient entre les doigts */}
        <g transform="translate(160, 60)">
          <path d="M-10,0 L10,0 M-6,-4 L-10,0 L-6,4 M6,-4 L10,0 L6,4" stroke="#2563eb" strokeWidth="2" />
          <text x="0" y="14" className="fill-blue-600 font-mono text-[7px] font-bold" textAnchor="middle">Rouler d'avant en arrière</text>
        </g>

        {/* Résultat : cône à 90° */}
        <rect x="15" y="180" width="210" height="20" rx="3" className="fill-emerald-100 dark:fill-emerald-950/60 stroke-emerald-400" strokeWidth="0.8" />
        <text x="120" y="193" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7.5px] font-bold" textAnchor="middle">
          RÉSULTAT : Cône parfait à 90° sur le premier filet
        </text>
      </g>

      {/* Panneau de droite : protocole de coupe & Loctite */}
      <g transform="translate(295, 50)">
        <rect x="0" y="0" width="175" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="15" y="20" className="fill-slate-800 dark:fill-slate-200 font-mono text-[9px] font-bold">
          PROTOCOLE EN 4 TEMPS :
        </text>
        <line x1="15" y1="26" x2="160" y2="26" stroke="#475569" strokeWidth="0.8" />

        <text x="15" y="42" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          1. <tspan className="font-bold text-amber-600">Mesure neutre :</tspan> tige en
        </text>
        <text x="21" y="52" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          position 1, mesurer jeu couronne.
        </text>

        <text x="15" y="68" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          2. <tspan className="font-bold text-amber-600">Report + 1 mm :</tspan> couper à
        </text>
        <text x="21" y="78" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          la pince carbure avec marge.
        </text>

        <text x="15" y="94" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          3. <tspan className="font-bold text-amber-600">Ébavurage :</tspan> passer la
        </text>
        <text x="21" y="104" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          lame de l'ouvre-boîte s/ filet.
        </text>

        <text x="15" y="120" className="fill-slate-800 dark:fill-slate-200 font-mono text-[7.5px]">
          4. <tspan className="font-bold text-violet-600">Loctite 222 :</tspan>
        </text>
        <text x="21" y="130" className="fill-slate-700 dark:fill-slate-300 font-mono text-[7px]">
          micro-touche violette démontable.
        </text>

        <rect x="10" y="142" width="155" height="52" rx="4" className="fill-violet-50 dark:fill-violet-950/40 stroke-violet-300 dark:stroke-violet-900" strokeWidth="0.8" />
        <text x="16" y="156" className="fill-violet-800 dark:fill-violet-300 font-mono text-[7.5px] font-bold">
          LOCTITE 222 (Violette) :
        </text>
        <text x="16" y="168" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Frein-filet faible
        </text>
        <text x="16" y="178" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Démontable à froid
        </text>
        <text x="16" y="188" className="fill-red-600 dark:fill-red-400 font-mono text-[6.5px] font-bold">
          • Jamais 243 ni 270 !
        </text>
      </g>
    </svg>
  );
}

export function CasingFinalSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="casingCase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" className="fill-[#FBF8F1] dark:fill-[#0f172a] stroke-[#E0D8C8] dark:stroke-[#334155]" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="fill-amber-900 dark:fill-amber-300 font-mono text-[11px] font-bold" textAnchor="middle">
        EMBOÎTAGE FINAL · REPOSE AUTOMATISME &amp; ORIENTATION FOND À LA POTENCE
      </text>

      {/* Schéma carrure & brides */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="220" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="110" y="20" className="fill-amber-800 dark:fill-amber-300 font-mono text-[9px] font-bold" textAnchor="middle">
          CERCLE &amp; BRIDES D'EMBOÎTAGE
        </text>

        {/* Carrure vue de dessus */}
        <g transform="translate(110, 105)">
          <circle cx="0" cy="0" r="72" fill="url(#casingCase)" stroke="#1e293b" strokeWidth="1.5" />
          {/* Cercle d'emboîtage */}
          <circle cx="0" cy="0" r="62" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
          {/* Calibre emboîté */}
          <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#334155" strokeWidth="1" />

          {/* Bride 1 avec vis */}
          <g transform="translate(-48, -25)">
            <rect x="0" y="0" width="18" height="8" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="9" cy="4" r="3" fill="#0f172a" />
          </g>
          {/* Bride 2 avec vis (symétrique) */}
          <g transform="translate(30, 25)">
            <rect x="0" y="0" width="18" height="8" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="9" cy="4" r="3" fill="#0f172a" />
          </g>

          <text x="0" y="5" className="fill-slate-800 font-mono text-[8px] font-bold" textAnchor="middle">Calibre ETA 2824</text>
          <text x="0" y="16" className="fill-emerald-700 font-mono text-[7px]" textAnchor="middle">Module auto reposé</text>
        </g>

        <rect x="10" y="170" width="200" height="26" rx="3" className="fill-amber-50 dark:fill-amber-950/40 stroke-amber-200 dark:stroke-amber-900" strokeWidth="0.8" />
        <text x="110" y="186" className="fill-amber-900 dark:fill-amber-200 font-mono text-[7px] font-bold" textAnchor="middle">
          2 vis de boîte serrées en croix (2.0 cNm)
        </text>
      </g>

      {/* Panneau droite : Fermeture potence & orientation du fond */}
      <g transform="translate(265, 45)">
        <rect x="0" y="0" width="205" height="205" rx="6" className="fill-[#F4EFE5] dark:fill-[#1e293b] stroke-[#D7D0C4] dark:stroke-[#475569]" strokeWidth="1" />
        <text x="102" y="20" className="fill-blue-800 dark:fill-blue-300 font-mono text-[9px] font-bold" textAnchor="middle">
          FERMETURE DU FOND À LA POTENCE
        </text>

        {/* Fond de boîte vu de dos avec gravures repères */}
        <g transform="translate(102, 95)">
          <circle cx="0" cy="0" r="58" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="48" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Logo ETA orienté vers 12h (haut) */}
          <rect x="-14" y="-38" width="28" height="12" rx="2" fill="#dc2626" />
          <text x="0" y="-30" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ETA</text>
          <text x="0" y="-42" className="fill-red-600 font-mono text-[6.5px] font-bold" textAnchor="middle">12H (HAUT)</text>

          {/* Passage tige à 9h (gauche) */}
          <line x1="-58" y1="0" x2="-44" y2="0" stroke="#2563eb" strokeWidth="2.5" />
          <text x="-32" y="2" className="fill-blue-600 font-mono text-[6.5px] font-bold">TIGE</text>

          <text x="0" y="8" className="fill-slate-700 font-mono text-[7px]" textAnchor="middle">SWISS MADE</text>
          <text x="0" y="22" className="fill-slate-500 font-mono text-[6px]" textAnchor="middle">WATER RESISTANT</text>
        </g>

        <rect x="10" y="155" width="185" height="42" rx="4" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="0.8" />
        <text x="18" y="169" className="fill-emerald-800 dark:fill-emerald-300 font-mono text-[7px] font-bold">
          CONTRÔLE POTENCE SUISSE :
        </text>
        <text x="18" y="179" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Joint de fond siliconé (Fomblin UT18)
        </text>
        <text x="18" y="189" className="fill-slate-700 dark:fill-slate-300 font-mono text-[6.5px]">
          • Pression axiale douce sans voilage
        </text>
      </g>
    </svg>
  );
}
