'use client';

/**
 * HorloLearn — Schémas techniques vectoriels d'atelier (partie C)
 * Posage, Emboîtage & Aiguillage — Conforme aux 9 fiches d'atelier horloger suisse.
 * Attributs SVG directs (fontSize, fill, stroke) avec bloc de style adaptatif Clair/Sombre.
 */

const STYLE_BLOCK = (
  <style>{`
    .theme-bg { fill: #FBF8F1; stroke: #E0D8C8; }
    .theme-box { fill: #F4EFE5; stroke: #D7D0C4; }
    .theme-title { fill: #78350F; font-size: 11px; font-weight: bold; font-family: var(--font-jbmono), monospace; }
    .theme-label { fill: #1E293B; font-size: 8.5px; font-weight: bold; font-family: var(--font-jbmono), monospace; }
    .theme-sub { fill: #64748B; font-size: 7.5px; font-family: var(--font-jbmono), monospace; }
    .theme-alert-bg { fill: #FEF2F2; stroke: #FCA5A5; }
    .theme-alert-txt { fill: #B91C1C; }
    .theme-success-bg { fill: #ECFDF5; stroke: #6EE7B7; }
    .theme-success-txt { fill: #047857; }
    .theme-warn-bg { fill: #FFFBEB; stroke: #FCD34D; }
    .theme-warn-txt { fill: #B45309; }

    :global(.dark) .theme-bg { fill: #0b1120; stroke: #334155; }
    :global(.dark) .theme-box { fill: #1e293b; stroke: #475569; }
    :global(.dark) .theme-title { fill: #FDE68A; }
    :global(.dark) .theme-label { fill: #F1F5F9; }
    :global(.dark) .theme-sub { fill: #94A3B8; }
    :global(.dark) .theme-alert-bg { fill: #450a0a; stroke: #991b1b; }
    :global(.dark) .theme-alert-txt { fill: #FCA5A5; }
    :global(.dark) .theme-success-bg { fill: #064e3b; stroke: #047857; }
    :global(.dark) .theme-success-txt { fill: #6EE7B7; }
    :global(.dark) .theme-warn-bg { fill: #451a03; stroke: #92400e; }
    :global(.dark) .theme-warn-txt { fill: #FCD34D; }
  `}</style>
);

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
      {STYLE_BLOCK}

      {/* Fond */}
      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre supérieur */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        OUTILLAGE &amp; ÉQUIPEMENT INDISPENSABLE D'EMBOÎTAGE SUISSE
      </text>

      {/* 1. Posage universel avec bague */}
      <g transform="translate(25, 45)">
        <rect x="0" y="0" width="135" height="92" rx="6" className="theme-box" strokeWidth="1" />
        <ellipse cx="67" cy="42" rx="44" ry="22" fill="url(#kitSteel)" stroke="#475569" strokeWidth="1.2" />
        <ellipse cx="67" cy="42" rx="32" ry="16" fill="#F8FAFC" stroke="#334155" strokeWidth="1" />
        <ellipse cx="67" cy="42" rx="20" ry="10" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.8" />
        <text x="67" y="74" className="theme-label" textAnchor="middle">Posage Universel</text>
        <text x="67" y="85" className="theme-sub" textAnchor="middle">+ Bague de réduction</text>
      </g>

      {/* 2. Porte-pièce à aiguiller avec vis de limitation */}
      <g transform="translate(182, 45)">
        <rect x="0" y="0" width="135" height="92" rx="6" className="theme-box" strokeWidth="1" />
        <rect x="54" y="15" width="28" height="42" rx="2" fill="url(#kitSteel)" stroke="#334155" strokeWidth="1" />
        <ellipse cx="68" cy="15" rx="24" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
        <line x1="68" y1="8" x2="68" y2="28" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        {/* Molette inférieure */}
        <rect x="46" y="55" width="44" height="12" rx="2" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.8" />
        <line x1="52" y1="55" x2="52" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="60" y1="55" x2="60" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="68" y1="55" x2="68" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <line x1="76" y1="55" x2="76" y2="67" stroke="#78350f" strokeWidth="0.8" />
        <text x="68" y="74" fill="#b45309" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Doigt de limitation
        </text>
        <text x="68" y="85" className="theme-sub" textAnchor="middle">Soutien rubis trotteuse</text>
      </g>

      {/* 3. Posage gigogne + cabron */}
      <g transform="translate(340, 45)">
        <rect x="0" y="0" width="135" height="92" rx="6" className="theme-box" strokeWidth="1" />
        <ellipse cx="67" cy="40" rx="46" ry="20" fill="url(#kitSteel)" stroke="#334155" strokeWidth="1.2" />
        <ellipse cx="67" cy="38" rx="36" ry="14" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="67" y="41" fill="#78350f" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Cabron de peau
        </text>
        <text x="67" y="74" className="theme-label" textAnchor="middle">Posage Gigogne</text>
        <text x="67" y="85" className="theme-sub" textAnchor="middle">Protection laque cadran</text>
      </g>

      {/* Deuxième rangée : outils à main */}
      {/* 4. Tournevis rouge 1.20 mm */}
      <g transform="translate(25, 150)">
        <rect x="0" y="0" width="98" height="112" rx="6" className="theme-box" strokeWidth="1" />
        <g transform="translate(49, 12)">
          <circle cx="0" cy="5" r="9" fill="url(#kitSteel)" stroke="#334155" strokeWidth="0.8" />
          <rect x="-4" y="14" width="8" height="42" fill="url(#kitSteel)" stroke="#334155" strokeWidth="0.8" />
          <rect x="-5" y="24" width="10" height="10" fill="url(#kitRedHandle)" stroke="#7f1d1d" strokeWidth="0.8" />
          <rect x="-1.5" y="56" width="3" height="18" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
          <polygon points="-2,74 2,74 0,78" fill="#334155" />
        </g>
        <text x="49" y="96" fill="#dc2626" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Tournevis 1.20
        </text>
        <text x="49" y="106" className="theme-sub" textAnchor="middle">Bague ROUGE</text>
      </g>

      {/* 5. Brucelles laiton (anti-rayure) */}
      <g transform="translate(138, 150)">
        <rect x="0" y="0" width="105" height="112" rx="6" className="theme-box" strokeWidth="1" />
        <g transform="translate(52, 14)">
          <path d="M-8,0 L-4,65 L-1,72 L0,72 L-3,65 L-6,0 Z" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.7" />
          <path d="M8,0 L4,65 L1,72 L0,72 L3,65 L6,0 Z" fill="url(#kitBrass)" stroke="#b45309" strokeWidth="0.7" />
          <rect x="-7" y="0" width="14" height="8" fill="#78350f" rx="1" />
        </g>
        <text x="52" y="96" fill="#d97706" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Brucelles Laiton
        </text>
        <text x="52" y="106" fill="#059669" fontSize="7.5" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Anti-rayure platine
        </text>
      </g>

      {/* 6. Pierre d'Arkansas + Couteau ouvre-boîte */}
      <g transform="translate(258, 150)">
        <rect x="0" y="0" width="120" height="112" rx="6" className="theme-box" strokeWidth="1" />
        <rect x="18" y="14" width="84" height="26" rx="2" fill="url(#kitArkansas)" stroke="#475569" strokeWidth="1" />
        <text x="60" y="30" fill="#334155" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Pierre d'Arkansas
        </text>
        <g transform="translate(25, 48)">
          <rect x="0" y="0" width="38" height="14" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
          <path d="M38,2 L58,7 L38,12 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="0.8" />
          <text x="36" y="22" className="theme-sub" textAnchor="middle">Lame ouvre-boîte</text>
        </g>
        <text x="60" y="96" className="theme-label" textAnchor="middle">Arkansas &amp; Lame</text>
        <text x="60" y="106" className="theme-sub" textAnchor="middle">Cône 90° &amp; ébavurage</text>
      </g>

      {/* 7. Brosse poil de martre (marron) */}
      <g transform="translate(392, 150)">
        <rect x="0" y="0" width="86" height="112" rx="6" className="theme-box" strokeWidth="1" />
        <g transform="translate(43, 12)">
          <rect x="-3" y="0" width="6" height="45" rx="1" fill="#78350f" stroke="#451a03" strokeWidth="0.7" />
          <rect x="-4" y="45" width="8" height="10" fill="#94a3b8" stroke="#334155" strokeWidth="0.7" />
          <path d="M-5,55 C-8,70 -3,78 0,80 C3,78 8,70 5,55 Z" fill="#582900" stroke="#3d1d00" strokeWidth="0.8" />
        </g>
        <text x="43" y="96" fill="#78350f" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Poil de Martre
        </text>
        <text x="43" y="106" fill="#059669" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Seule s/ cadran
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
      {STYLE_BLOCK}

      <rect width="500" height="260" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        DÉPOSE DU MODULE AUTOMATIQUE (CALIBRE ETA 2824-2)
      </text>

      {/* Dessin du mouvement de dessus */}
      <g transform="translate(60, 45)">
        <circle cx="120" cy="95" r="85" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        
        {/* Bâti du remontage automatique */}
        <path d="M70,50 Q120,35 170,50 L175,100 Q120,130 65,100 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />

        {/* Masse oscillante demi-lune */}
        <path d="M45,95 A75,75 0 0,0 195,95 L150,95 A30,30 0 0,1 90,95 Z" fill="url(#autoRotorGrad)" stroke="#475569" strokeWidth="1.2" />
        <circle cx="120" cy="95" r="14" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
        <circle cx="120" cy="95" r="5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
        <line x1="60" y1="120" x2="180" y2="120" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="70" y1="140" x2="170" y2="140" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,3" />

        {/* VIS NOIRE 1 */}
        <g transform="translate(85, 62)">
          <circle cx="0" cy="0" r="6" fill="url(#screwBlackGrad)" stroke="#020617" strokeWidth="1" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        </g>

        {/* VIS NOIRE 2 */}
        <g transform="translate(155, 62)">
          <circle cx="0" cy="0" r="6" fill="url(#screwBlackGrad)" stroke="#020617" strokeWidth="1" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        </g>

        {/* Flèches de levée */}
        <path d="M120,40 L120,15 M115,22 L120,15 L125,22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        <text x="120" y="8" fill="#2563eb" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Retrait en bloc
        </text>
      </g>

      {/* Panneau explicatif à droite */}
      <g transform="translate(290, 48)">
        <rect x="0" y="0" width="190" height="185" rx="6" className="theme-box" strokeWidth="1" />
        <text x="15" y="22" fill="#dc2626" fontSize="10" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          2 VIS NOIRES D'AUTOMATISME
        </text>
        <line x1="15" y1="28" x2="175" y2="28" stroke="#dc2626" strokeWidth="1" />

        <text x="15" y="46" className="theme-label">
          • Outil : Tournevis <tspan fill="#dc2626">ROUGE 1.20 mm</tspan>
        </text>
        <text x="15" y="62" className="theme-label">• Particularité : Vis bleuies ou</text>
        <text x="23" y="74" className="theme-label">brillant-noir distinctes</text>

        <rect x="10" y="86" width="170" height="85" rx="4" className="theme-alert-bg" strokeWidth="0.8" />
        <text x="18" y="100" fill="#b91c1c" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          JUSTIFICATION TECHNIQUE :
        </text>
        <text x="18" y="114" className="theme-sub">Déposer le module automatique</text>
        <text x="18" y="125" className="theme-sub">évite d'exercer des contraintes</text>
        <text x="18" y="136" className="theme-sub">sur les pivots du roulement de</text>
        <text x="18" y="147" className="theme-sub">rotor lors des pressions</text>
        <text x="18" y="158" fill="#dc2626" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
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
      {STYLE_BLOCK}

      <rect width="500" height="260" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        BRIDAGE DU CADRAN &amp; INTERDICTION FORMELLE D'APPUI SUR LES PIERRES
      </text>

      {/* Schéma principal en coupe */}
      <g transform="translate(30, 45)">
        <rect x="20" y="140" width="260" height="40" rx="4" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
        <rect x="25" y="134" width="250" height="8" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
        <text x="150" y="140" fill="#78350f" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          CABRON DE PEAU (Protection laque cadran)
        </text>

        <rect x="35" y="122" width="230" height="10" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        <text x="150" y="130" fill="#cbd5e1" fontSize="7" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Cadran (laque &amp; pieds orientés vers le haut)
        </text>

        <rect x="45" y="70" width="210" height="45" rx="2" fill="url(#brassPlateGrad)" stroke="#854d0e" strokeWidth="1.2" />
        
        {/* Rubis / Pierres */}
        <ellipse cx="90" cy="70" rx="8" ry="4" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        <circle cx="90" cy="70" r="2" fill="#be185d" />
        <ellipse cx="210" cy="70" rx="8" ry="4" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        <circle cx="210" cy="70" r="2" fill="#be185d" />

        {/* Croix rouge d'interdiction */}
        <g transform="translate(90, 52)">
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="#dc2626" strokeWidth="3" />
          <line x1="10" y1="-10" x2="-10" y2="10" stroke="#dc2626" strokeWidth="3" />
        </g>
        <g transform="translate(210, 52)">
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="#dc2626" strokeWidth="3" />
          <line x1="10" y1="-10" x2="-10" y2="10" stroke="#dc2626" strokeWidth="3" />
        </g>

        {/* Flèche d'appui métal */}
        <g transform="translate(150, 48)">
          <path d="M0,0 L0,18 M-4,12 L0,18 L4,12" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
          <text x="0" y="-4" fill="#15803d" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            APPUI MÉTAL SEUL
          </text>
        </g>

        {/* Brides cadran */}
        <g transform="translate(258, 88)">
          <path d="M0,0 L18,0 L14,-6" stroke="#d97706" strokeWidth="2" fill="none" />
          <text x="24" y="4" fill="#d97706" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            Bride poussée en butée
          </text>
          <text x="24" y="14" className="theme-sub">Brucelles laiton</text>
        </g>
      </g>

      {/* Cartouche d'avertissement */}
      <g transform="translate(325, 140)">
        <rect x="0" y="0" width="160" height="95" rx="6" className="theme-warn-bg" strokeWidth="1" />
        <text x="12" y="18" fill="#b45309" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          RÈGLE D'OR D'ATELIER :
        </text>
        <text x="12" y="34" className="theme-sub">1. Ne JAMAIS appuyer</text>
        <text x="16" y="45" fill="#dc2626" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          sur les pierres des ponts !
        </text>
        <text x="16" y="56" className="theme-sub">(Risque expulsion d'huile</text>
        <text x="16" y="66" className="theme-sub">ou d'ébrécher le rubis)</text>
        <text x="12" y="80" className="theme-sub">2. Clinquant présent</text>
        <text x="16" y="90" className="theme-sub">s/ roue des heures contrôlé</text>
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
      {STYLE_BLOCK}

      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="20" className="theme-title" textAnchor="middle">
        PORTE-PIÈCE À VIS DE LIMITATION SOUS LA PIERRE DE SECONDE
      </text>

      {/* Coupe centrale */}
      <g transform="translate(180, 58)">
        <rect x="68" y="10" width="4" height="142" fill="#cbd5e1" stroke="#334155" strokeWidth="0.8" />
        
        {/* Pont supérieur */}
        <rect x="10" y="55" width="120" height="18" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
        <rect x="62" y="56" width="16" height="16" rx="2" fill="url(#rubyCenterGrad)" stroke="#9f1239" strokeWidth="1" />
        
        {/* Pont inférieur */}
        <rect x="10" y="132" width="120" height="18" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
        <rect x="62" y="133" width="16" height="16" rx="2" fill="url(#rubyCenterGrad)" stroke="#9f1239" strokeWidth="1" />

        {/* DOIGT DE LIMITATION */}
        <g transform="translate(58, 150)">
          <polygon points="12,0 6,14 18,14" fill="url(#fingerGrad)" stroke="#78350f" strokeWidth="1" />
          <rect x="8" y="14" width="8" height="42" fill="url(#fingerGrad)" stroke="#78350f" strokeWidth="0.8" />
          <rect x="-10" y="56" width="44" height="13" rx="2" fill="#d97706" stroke="#451a03" strokeWidth="1" />
          <line x1="-4" y1="56" x2="-4" y2="69" stroke="#78350f" strokeWidth="1" />
          <line x1="4" y1="56" x2="4" y2="69" stroke="#78350f" strokeWidth="1" />
          <line x1="12" y1="56" x2="12" y2="69" stroke="#78350f" strokeWidth="1" />
          <line x1="20" y1="56" x2="20" y2="69" stroke="#78350f" strokeWidth="1" />
          <line x1="28" y1="56" x2="28" y2="69" stroke="#78350f" strokeWidth="1" />
        </g>

        {/* Force F */}
        <g transform="translate(70, -2)">
          <rect x="-6" y="-8" width="12" height="15" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <path d="M0,8 L0,16 M-3,12 L0,16 L3,12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          <text x="14" y="5" fill="#dc2626" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            Force F
          </text>
        </g>

        {/* Réaction R */}
        <g transform="translate(70, 172)">
          <path d="M0,0 L0,-12 M-3,-8 L0,-12 L3,-8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          <text x="18" y="-4" fill="#15803d" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            Appui R
          </text>
        </g>
      </g>

      {/* Cartouche d'explication à gauche */}
      <g transform="translate(25, 48)">
        <rect x="0" y="0" width="145" height="198" rx="6" className="theme-box" strokeWidth="1" />
        <text x="12" y="20" className="theme-title">FONCTION DU DOIGT :</text>
        <line x1="12" y1="26" x2="133" y2="26" stroke="#d97706" strokeWidth="0.8" />
        
        <text x="12" y="42" className="theme-sub">1. Visser la molette</text>
        <text x="16" y="54" className="theme-sub">jusqu'au contact franc</text>
        <text x="16" y="66" fill="#b45309" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          sous la pierre de seconde.
        </text>

        <text x="12" y="86" className="theme-sub">2. Lors du chassage de</text>
        <text x="16" y="98" className="theme-sub">la trotteuse, l'effort</text>
        <text x="16" y="110" className="theme-sub">est absorbé par le</text>
        <text x="16" y="122" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          doigt de limitation.
        </text>

        <rect x="8" y="136" width="129" height="50" rx="4" className="theme-alert-bg" strokeWidth="0.8" />
        <text x="14" y="150" fill="#b91c1c" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          SANS CE DOIGT :
        </text>
        <text x="14" y="163" className="theme-sub">• Déchassage du rubis</text>
        <text x="14" y="174" className="theme-sub">• Rupture pivot de seconde</text>
      </g>

      {/* Cartouche à droite */}
      <g transform="translate(340, 48)">
        <rect x="0" y="0" width="135" height="198" rx="6" className="theme-box" strokeWidth="1" />
        <text x="12" y="20" fill="#2563eb" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          RÉGLAGE VIS SOUTIEN
        </text>
        <line x1="12" y1="26" x2="123" y2="26" stroke="#2563eb" strokeWidth="0.8" />

        <text x="12" y="44" className="theme-label">• Molette : crantée</text>
        <text x="12" y="58" className="theme-label">• Contact : à fleur</text>
        <text x="16" y="70" className="theme-sub">sans soulever le pont</text>
        <text x="12" y="88" className="theme-label">• Vérification :</text>
        <text x="16" y="100" className="theme-sub">la roue tourne libre</text>
        <text x="16" y="112" className="theme-sub">avant le chassage.</text>

        <rect x="8" y="134" width="119" height="54" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="14" y="149" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          CONSEIL MAÎTRE :
        </text>
        <text x="14" y="161" className="theme-sub">Dévisser d'1/8e de tour</text>
        <text x="14" y="171" className="theme-sub">après aiguillage pour</text>
        <text x="14" y="180" className="theme-sub">libérer le calibre !</text>
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
      {STYLE_BLOCK}

      <rect width="500" height="260" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        SYNCHRONISATION DU SAUT DE DATE &amp; DÉTECTION À 00H00 PILE
      </text>

      {/* Cadran d'illustration */}
      <g transform="translate(60, 45)">
        <circle cx="95" cy="95" r="88" fill="url(#dialRadial)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="95" cy="95" r="92" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

        <line x1="95" y1="12" x2="95" y2="24" stroke="#0f172a" strokeWidth="3" />
        <text x="95" y="36" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">12</text>
        <line x1="178" y1="95" x2="166" y2="95" stroke="#0f172a" strokeWidth="2" />
        <line x1="95" y1="178" x2="95" y2="166" stroke="#0f172a" strokeWidth="2" />
        <line x1="12" y1="95" x2="24" y2="95" stroke="#0f172a" strokeWidth="2" />

        <path d="M95,95 L90,14 A82,82 0 0,1 100,14 Z" fill="#22c55e" opacity="0.45" />

        {/* Guichet de date à 3h */}
        <rect x="135" y="84" width="28" height="22" rx="2" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        <text x="149" y="99" fill="#dc2626" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">28</text>

        <path d="M149,80 L149,70 M145,74 L149,70 L153,74" stroke="#dc2626" strokeWidth="1.5" />
        <text x="149" y="65" fill="#dc2626" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          CLIC !
        </text>

        <path d="M50,45 A65,65 0 0,1 90,32" stroke="#2563eb" strokeWidth="2" fill="none" />
        <text x="50" y="38" fill="#2563eb" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          Sens antihoraire
        </text>
      </g>

      {/* Panneau de protocole à droite */}
      <g transform="translate(275, 48)">
        <rect x="0" y="0" width="200" height="185" rx="6" className="theme-box" strokeWidth="1" />
        <text x="15" y="22" className="theme-title">MÉTHODE OFFICIELLE SUISSE :</text>
        <line x1="15" y1="28" x2="185" y2="28" stroke="#d97706" strokeWidth="1" />

        <text x="15" y="46" className="theme-label">
          1. Tige en position <tspan fill="#2563eb">Mise à l'Heure (3)</tspan>
        </text>
        <text x="15" y="62" className="theme-label">2. Tourner doucement en arrière</text>
        <text x="23" y="74" className="theme-label">puis avancer vers 24h00.</text>

        <text x="15" y="92" className="theme-label">3. Ralentir vers minuit :</text>
        <text x="23" y="104" fill="#dc2626" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          STOPPER NET au saut franc du disque !
        </text>

        <rect x="10" y="116" width="180" height="58" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="18" y="130" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          TOLÉRANCE CHRONOMÉTRIQUE :
        </text>
        <text x="18" y="144" className="theme-label">
          • Saut franc : <tspan fill="#059669">23h55 – 00h05</tspan> (± 5 min)
        </text>
        <text x="18" y="158" className="theme-sub">
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
      {STYLE_BLOCK}

      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        CHASSAGE DES HEURES &amp; MINUTES · INDEXATION (-2 / +2 MIN) &amp; PARALLÉLISME
      </text>

      {/* Coupe profil */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="220" height="195" rx="6" className="theme-box" strokeWidth="1" />
        <text x="110" y="20" className="theme-title" textAnchor="middle">COUPE DES AXES &amp; CANONS</text>

        <g transform="translate(110, 110)">
          <rect x="-90" y="45" width="180" height="8" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          <text x="0" y="62" className="theme-sub" textAnchor="middle">Cadran laiton</text>

          <rect x="-30" y="25" width="60" height="10" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          <rect x="-14" y="0" width="28" height="25" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          <rect x="-65" y="0" width="60" height="5" rx="1" fill="url(#hourHandGrad)" stroke="#020617" strokeWidth="0.8" />
          <text x="-35" y="-3" className="theme-label">À fleur roue h.</text>

          <rect x="-8" y="-22" width="16" height="47" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          <rect x="-75" y="-22" width="70" height="4" rx="1" fill="url(#hourHandGrad)" stroke="#020617" strokeWidth="0.8" />
          <text x="-40" y="-25" fill="#2563eb" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            À fleur chaussée
          </text>

          <rect x="-2" y="-38" width="4" height="63" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />

          <line x1="-55" y1="0" x2="-55" y2="-18" stroke="#16a34a" strokeWidth="1.5" />
          <text x="-58" y="-8" fill="#15803d" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="end">
            G2 ≥ 0.15 mm
          </text>
        </g>
      </g>

      {/* Vue de dessus indexation */}
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="195" height="195" rx="6" className="theme-box" strokeWidth="1" />
        <text x="97" y="20" className="theme-title" textAnchor="middle">CONTRÔLE D'INDEXATION</text>

        <g transform="translate(97, 105)">
          <circle cx="0" cy="0" r="65" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" />
          <rect x="-3" y="-62" width="6" height="14" fill="#0f172a" />
          <text x="0" y="-38" fill="#0f172a" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">12:00</text>

          <path d="M0,0 L-7,-56 A60,60 0 0,1 7,-56 Z" fill="#22c55e" opacity="0.4" />
          <line x1="-7" y1="-56" x2="-7" y2="-45" stroke="#15803d" strokeWidth="1" strokeDasharray="1,1" />
          <line x1="7" y1="-56" x2="7" y2="-45" stroke="#15803d" strokeWidth="1" strokeDasharray="1,1" />

          <rect x="-2" y="-35" width="4" height="35" rx="1" fill="#0f172a" />
          <rect x="-1" y="-55" width="2" height="55" rx="0.5" fill="#2563eb" />
        </g>

        <rect x="10" y="145" width="175" height="42" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="18" y="159" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          TOLÉRANCE D'INDEXATION :
        </text>
        <text x="18" y="171" className="theme-label">Quand Heures = 12h00 pile :</text>
        <text x="18" y="181" fill="#059669" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          Minutes entre 11h58 et 12h02 !
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
      {STYLE_BLOCK}

      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        PRÉPARATION DU CANON DE TROTTEUSE · ÉQUARRISSAGE 90° &amp; GARDES G3/G4
      </text>

      {/* Panneau gauche */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="210" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="105" y="20" className="theme-title" textAnchor="middle">ÉQUARRISSAGE PAR LE DESSOUS</text>

        <g transform="translate(105, 110)">
          <rect x="-60" y="-30" width="120" height="6" rx="1" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
          <text x="0" y="-35" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Aiguille trotteuse
          </text>

          <rect x="-14" y="-24" width="7" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          <rect x="7" y="-24" width="7" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          <rect x="-7" y="-24" width="14" height="40" fill="#cbd5e1" opacity="0.3" />

          <polygon points="-5,16 5,16 3,-6 -3,-6" fill="url(#reamerSteel)" stroke="#0f172a" strokeWidth="0.8" />
          <rect x="-3" y="16" width="6" height="35" fill="url(#reamerSteel)" stroke="#334155" strokeWidth="0.8" />

          <line x1="20" y1="-24" x2="20" y2="16" stroke="#475569" strokeWidth="0.8" />
          <line x1="26" y1="-4" x2="16" y2="-4" stroke="#d97706" strokeWidth="1.2" />
          <text x="30" y="-2" fill="#d97706" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            Mi-hauteur max
          </text>
        </g>

        <rect x="10" y="160" width="190" height="36" rx="4" className="theme-warn-bg" strokeWidth="0.8" />
        <text x="18" y="174" fill="#b45309" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          Angle 90° d'attaque strict :
        </text>
        <text x="18" y="184" className="theme-sub">Ébavure l'entrée sans ovaliser le tube !</text>
      </g>

      {/* Panneau droit */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="210" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="105" y="20" fill="#2563eb" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          CONTRÔLE GARDES G3 &amp; G4 (NIHS)
        </text>

        <g transform="translate(105, 95)">
          <line x1="-70" y1="-40" x2="70" y2="-40" stroke="#0284c7" strokeWidth="2.5" />
          <text x="0" y="-44" fill="#0284c7" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Glace Saphir
          </text>

          <line x1="-60" y1="-15" x2="55" y2="-15" stroke="#dc2626" strokeWidth="1.8" />
          <circle cx="0" cy="-15" r="4" fill="#dc2626" />
          <rect x="-60" y="-18" width="15" height="6" rx="2" fill="#dc2626" />

          <line x1="-50" y1="5" x2="50" y2="5" stroke="#2563eb" strokeWidth="2" />
          <line x1="-40" y1="25" x2="40" y2="25" stroke="#0f172a" strokeWidth="2.5" />

          <line x1="60" y1="-40" x2="60" y2="-15" stroke="#059669" strokeWidth="1.2" />
          <text x="64" y="-25" fill="#059669" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            G4 ≥ 0.30 mm
          </text>

          <line x1="60" y1="-15" x2="60" y2="5" stroke="#059669" strokeWidth="1.2" />
          <text x="64" y="-3" fill="#059669" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            G3 ≥ 0.15 mm
          </text>
        </g>

        <rect x="10" y="150" width="190" height="46" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="16" y="164" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          CONTRÔLE DU CONTREPOIDS :
        </text>
        <text x="16" y="175" className="theme-sub">Vérifier que le contrepoids de la</text>
        <text x="16" y="184" className="theme-sub">trotteuse ne plonge pas sur les minutes !</text>
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
      {STYLE_BLOCK}

      <rect width="500" height="260" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        RETRAIT SÉCURISÉ DE LA TIGE DE REMONTOIR &amp; AIGUILLES À 15H15
      </text>

      {/* Cadran 15h15 */}
      <g transform="translate(50, 45)">
        <circle cx="95" cy="95" r="85" fill="url(#cadran1515)" stroke="#475569" strokeWidth="1.5" />
        <circle cx="95" cy="95" r="90" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

        <line x1="95" y1="15" x2="95" y2="25" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="175" y1="95" x2="165" y2="95" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="95" y1="175" x2="95" y2="165" stroke="#0f172a" strokeWidth="2.5" />
        <line x1="15" y1="95" x2="25" y2="95" stroke="#0f172a" strokeWidth="2.5" />

        <rect x="180" y="88" width="12" height="14" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
        <rect x="192" y="84" width="8" height="22" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />

        {/* Aiguilles à 15h15 */}
        <line x1="95" y1="95" x2="145" y2="95" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <line x1="95" y1="95" x2="162" y2="95" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="95" cy="95" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />

        <rect x="40" y="115" width="110" height="26" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="95" y="126" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          POSITION 15H15
        </text>
        <text x="95" y="136" className="theme-sub" textAnchor="middle">Dégagées des rebords</text>
      </g>

      {/* Panneau droite */}
      <g transform="translate(270, 48)">
        <rect x="0" y="0" width="205" height="185" rx="6" className="theme-box" strokeWidth="1" />
        <text x="15" y="20" fill="#dc2626" fontSize="9.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          PLOT DE TIRETTE &amp; TOURNEVIS 1.20
        </text>
        <line x1="15" y1="26" x2="190" y2="26" stroke="#dc2626" strokeWidth="0.8" />

        <g transform="translate(45, 55)">
          <circle cx="0" cy="0" r="7" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="#cbd5e1" />
          <rect x="-2" y="-35" width="4" height="25" fill="#e2e8f0" stroke="#334155" strokeWidth="0.8" />
          <rect x="-5" y="-55" width="10" height="20" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
          <path d="M12,-20 L12,-5 M8,-10 L12,-5 L16,-10" stroke="#dc2626" strokeWidth="1.5" />
          <text x="20" y="-10" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
            Pression douce
          </text>
        </g>

        <g transform="translate(130, 55)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#2563eb" strokeWidth="2.5" />
          <polygon points="35,-4 42,0 35,4" fill="#2563eb" />
          <text x="20" y="14" fill="#2563eb" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Traction axe
          </text>
        </g>

        <rect x="10" y="95" width="185" height="78" rx="4" className="theme-alert-bg" strokeWidth="0.8" />
        <text x="18" y="110" fill="#b91c1c" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          ATTENTION PIÈGE MAJEUR :
        </text>
        <text x="18" y="123" className="theme-sub">• Ne jamais forcer sur le plot !</text>
        <text x="18" y="135" className="theme-sub">• Enfoncement excessif déboîte la bascule :</text>
        <text x="18" y="147" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          le sautoir saute et nécessite le redémontage
        </text>
        <text x="18" y="158" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          complet du cadran !
        </text>
      </g>
    </svg>
  );
}

export function CleanlinessProtocolSVG() {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      {STYLE_BLOCK}
      <rect width="500" height="260" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        PROTOCOLE PROPRETÉ CHIRURGICALE · ZÉRO RODICO SUR CADRAN
      </text>

      {/* Panneau GAUCHE : Interdit */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="210" height="195" rx="6" className="theme-alert-bg" strokeWidth="1" />
        
        <circle cx="105" cy="55" r="32" fill="none" stroke="#dc2626" strokeWidth="4" />
        <line x1="82" y1="32" x2="128" y2="78" stroke="#dc2626" strokeWidth="4" />
        <ellipse cx="105" cy="55" rx="16" ry="12" fill="#86efac" stroke="#16a34a" strokeWidth="1" />
        <text x="105" y="58" fill="#14532d" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">RODICO</text>

        <text x="105" y="105" fill="#dc2626" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          INTERDIT SUR LE CADRAN !
        </text>
        <text x="105" y="122" className="theme-sub" textAnchor="middle">Laisse un film gras irréversible</text>
        <text x="105" y="132" className="theme-sub" textAnchor="middle">sur les vernis mats, soleillés et laqués.</text>

        <rect x="15" y="145" width="180" height="38" rx="4" fill="#ffffff" stroke="#fca5a5" strokeWidth="0.8" />
        <text x="105" y="159" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          PAS DE SOUFFLETTE DIRECTE !
        </text>
        <text x="105" y="170" fill="#64748b" fontSize="6.5" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Chasse les fibres sous les aiguilles.
        </text>
      </g>

      {/* Panneau DROIT : Validé */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="210" height="195" rx="6" className="theme-success-bg" strokeWidth="1" />
        
        <circle cx="105" cy="55" r="32" fill="none" stroke="#16a34a" strokeWidth="3" />
        <g transform="translate(105, 30)">
          <rect x="-2" y="0" width="4" height="28" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
          <rect x="-3" y="28" width="6" height="6" fill="#94a3b8" />
          <path d="M-4,34 C-6,44 -2,50 0,52 C2,50 6,44 4,34 Z" fill="#582900" stroke="#3d1d00" strokeWidth="0.6" />
        </g>
        <text x="105" y="105" fill="#047857" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          BROSSE POIL DE MARTRE (MARRON)
        </text>
        <text x="105" y="122" className="theme-sub" textAnchor="middle">Seule méthode agréée en atelier</text>
        <text x="105" y="132" className="theme-sub" textAnchor="middle">pour dépoussiérer un cadran habillé.</text>

        <rect x="15" y="145" width="180" height="38" rx="4" fill="#ffffff" stroke="#6ee7b7" strokeWidth="0.8" />
        <text x="105" y="159" fill="#047857" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          BOÎTE &amp; GLACE SAPHIR :
        </text>
        <text x="105" y="170" fill="#64748b" fontSize="6.5" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
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
      {STYLE_BLOCK}

      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        COUPE DE TIGE · CÔNE À 90° SUR PIERRE D'ARKANSAS &amp; LOCTITE 222
      </text>

      {/* Panneau gauche */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="240" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="120" y="20" className="theme-title" textAnchor="middle">ROULEMENT DU MANDRIN À 45°</text>

        <rect x="20" y="140" width="200" height="35" rx="3" fill="url(#arkansasGrad2)" stroke="#475569" strokeWidth="1.2" />
        <text x="120" y="162" fill="#334155" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          Pierre d'Arkansas fine
        </text>

        {/* Mandrin 45° */}
        <g transform="translate(130, 140) rotate(-45)">
          <rect x="-1.5" y="-15" width="3" height="15" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
          <rect x="-8" y="-95" width="16" height="80" rx="2" fill="url(#mandrinBrass)" stroke="#78350f" strokeWidth="1" />
          <line x1="-8" y1="-80" x2="8" y2="-80" stroke="#78350f" strokeWidth="0.8" />
          <line x1="-8" y1="-65" x2="8" y2="-65" stroke="#78350f" strokeWidth="0.8" />
          <line x1="-8" y1="-50" x2="8" y2="-50" stroke="#78350f" strokeWidth="0.8" />
          <text x="0" y="-35" fill="#78350f" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Mandrin</text>
        </g>

        <path d="M100,140 A30,30 0 0,0 120,118" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="96" y="125" fill="#d97706" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">45°</text>

        <g transform="translate(160, 60)">
          <path d="M-10,0 L10,0 M-6,-4 L-10,0 L-6,4 M6,-4 L10,0 L6,4" stroke="#2563eb" strokeWidth="2" />
          <text x="0" y="14" fill="#2563eb" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Rouler d'avant en arrière
          </text>
        </g>

        <rect x="15" y="180" width="210" height="20" rx="3" className="theme-success-bg" strokeWidth="0.8" />
        <text x="120" y="193" fill="#047857" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          RÉSULTAT : Cône parfait à 90° sur le premier filet
        </text>
      </g>

      {/* Panneau droite */}
      <g transform="translate(295, 50)">
        <rect x="0" y="0" width="175" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="15" y="20" className="theme-title">PROTOCOLE EN 4 TEMPS :</text>
        <line x1="15" y1="26" x2="160" y2="26" stroke="#475569" strokeWidth="0.8" />

        <text x="15" y="42" className="theme-label">
          1. <tspan fill="#d97706">Mesure neutre :</tspan> tige en
        </text>
        <text x="21" y="52" className="theme-sub">position 1, mesurer jeu.</text>

        <text x="15" y="68" className="theme-label">
          2. <tspan fill="#d97706">Report + 1 mm :</tspan> couper à
        </text>
        <text x="21" y="78" className="theme-sub">la pince avec marge.</text>

        <text x="15" y="94" className="theme-label">
          3. <tspan fill="#d97706">Ébavurage :</tspan> passer la
        </text>
        <text x="21" y="104" className="theme-sub">lame d'ouvre-boîte s/ filet.</text>

        <text x="15" y="120" className="theme-label">
          4. <tspan fill="#7c3aed">Loctite 222 :</tspan>
        </text>
        <text x="21" y="130" className="theme-sub">micro-touche violette démontable.</text>

        <rect x="10" y="142" width="155" height="52" rx="4" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="0.8" />
        <text x="16" y="156" fill="#6d28d9" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          LOCTITE 222 (Violette) :
        </text>
        <text x="16" y="168" className="theme-sub">• Frein-filet faible</text>
        <text x="16" y="178" className="theme-sub">• Démontable à froid</text>
        <text x="16" y="188" fill="#dc2626" fontSize="6.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
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
      {STYLE_BLOCK}

      <rect width="500" height="280" rx="10" className="theme-bg" strokeWidth="1.2" />

      {/* Titre */}
      <text x="250" y="24" className="theme-title" textAnchor="middle">
        EMBOÎTAGE FINAL · REPOSE AUTOMATISME &amp; ORIENTATION FOND À LA POTENCE
      </text>

      {/* Schéma carrure */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="220" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="110" y="20" className="theme-title" textAnchor="middle">CERCLE &amp; BRIDES D'EMBOÎTAGE</text>

        <g transform="translate(110, 105)">
          <circle cx="0" cy="0" r="72" fill="url(#casingCase)" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="62" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="50" fill="#f8fafc" stroke="#334155" strokeWidth="1" />

          {/* Brides */}
          <g transform="translate(-48, -25)">
            <rect x="0" y="0" width="18" height="8" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="9" cy="4" r="3" fill="#0f172a" />
          </g>
          <g transform="translate(30, 25)">
            <rect x="0" y="0" width="18" height="8" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="9" cy="4" r="3" fill="#0f172a" />
          </g>

          <text x="0" y="5" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Calibre ETA 2824
          </text>
          <text x="0" y="16" fill="#059669" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            Module auto reposé
          </text>
        </g>

        <rect x="10" y="170" width="200" height="26" rx="3" className="theme-warn-bg" strokeWidth="0.8" />
        <text x="110" y="186" fill="#b45309" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          2 vis de boîte serrées en croix (2.0 cNm)
        </text>
      </g>

      {/* Panneau droite */}
      <g transform="translate(265, 45)">
        <rect x="0" y="0" width="205" height="205" rx="6" className="theme-box" strokeWidth="1" />
        <text x="102" y="20" fill="#2563eb" fontSize="9" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
          FERMETURE DU FOND À LA POTENCE
        </text>

        <g transform="translate(102, 95)">
          <circle cx="0" cy="0" r="58" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="48" fill="none" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Logo ETA 12h */}
          <rect x="-14" y="-38" width="28" height="12" rx="2" fill="#dc2626" />
          <text x="0" y="-30" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ETA</text>
          <text x="0" y="-42" fill="#dc2626" fontSize="6.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">
            12H (HAUT)
          </text>

          {/* Tige 9h */}
          <line x1="-58" y1="0" x2="-44" y2="0" stroke="#2563eb" strokeWidth="2.5" />
          <text x="-32" y="2" fill="#2563eb" fontSize="6.5" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">TIGE</text>

          <text x="0" y="8" fill="#334155" fontSize="7" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">SWISS MADE</text>
          <text x="0" y="22" fill="#64748b" fontSize="6" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">WATER RESISTANT</text>
        </g>

        <rect x="10" y="155" width="185" height="42" rx="4" className="theme-success-bg" strokeWidth="0.8" />
        <text x="18" y="169" fill="#047857" fontSize="7" fontWeight="bold" fontFamily="var(--font-jbmono), monospace">
          CONTRÔLE POTENCE SUISSE :
        </text>
        <text x="18" y="179" className="theme-sub">• Joint de fond siliconé (Fomblin UT18)</text>
        <text x="18" y="189" className="theme-sub">• Pression axiale douce sans voilage</text>
      </g>
    </svg>
  );
}
