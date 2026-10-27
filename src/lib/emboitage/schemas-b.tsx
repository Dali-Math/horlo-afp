/**
 * HorloLearn — Schémas techniques vectoriels (partie B)
 * Re-thème clair « Théorie & Académie Horlogère Suisse ».
 */

export function GasketsCasingSVG() {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metalCaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      <rect width="500" height="240" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      {/* Panneau 1 : joint de glace */}
      <g transform="translate(10, 20)">
        <rect x="10" y="10" width="220" height="190" rx="6" fill="#F4EFE5" stroke="#D7D0C4" strokeWidth="1" />
        <text x="120" y="32" fill="#0369A1" fontSize="11" fontFamily="var(--font-jbmono), monospace" fontWeight="bold" textAnchor="middle">1. Joint de glace (Hytrel / L-Ring)</text>

        <path d="M25,50 L75,50 L75,70 L95,70 L95,140 L25,140 Z" fill="url(#metalCaseGrad)" stroke="#334155" strokeWidth="1" />

        <rect x="98" y="50" width="120" height="16" fill="#BAE6FD" opacity="0.9" stroke="#0284c7" strokeWidth="1.2" />
        <text x="158" y="62" fill="#0C4A6E" fontSize="8" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Glace saphir</text>

        <path d="M94,48 L97,48 L97,68 L115,68 L115,71 L94,71 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="0.8" />

        <rect x="25" y="148" width="190" height="42" rx="4" fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.8" />
        <text x="35" y="162" fill="#B91C1C" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">MONTAGE STRICTEMENT À SEC !</text>
        <text x="35" y="174" fill="#64748b" fontSize="8" fontFamily="var(--font-jbmono), monospace">Jamais de graisse silicone ni d'huile.</text>
        <text x="35" y="184" fill="#334155" fontSize="8" fontFamily="var(--font-jbmono), monospace">L'Hytrel assure l'étanchéité par écrasement.</text>
      </g>

      {/* Panneau 2 : joints toriques */}
      <g transform="translate(250, 20)">
        <rect x="10" y="10" width="230" height="190" rx="6" fill="#F4EFE5" stroke="#D7D0C4" strokeWidth="1" />
        <text x="125" y="32" fill="#047857" fontSize="11" fontFamily="var(--font-jbmono), monospace" fontWeight="bold" textAnchor="middle">2. Joints toriques (fond &amp; couronne)</text>

        <path d="M25,60 L140,60 L140,75 L160,75 L160,85 L205,85 L205,120 L25,120 Z" fill="url(#metalCaseGrad)" stroke="#334155" strokeWidth="1" />

        <path d="M140,75 L160,75 L160,95 L140,95 Z" fill="#FBF8F1" stroke="#64748b" strokeWidth="0.8" />

        <ellipse cx="150" cy="85" rx="8" ry="7" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
        <ellipse cx="150" cy="85" rx="10" ry="9" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />
        <text x="150" y="110" fill="#047857" fontSize="8" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">O-Ring + Fomblin</text>

        <rect x="25" y="148" width="200" height="42" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="0.8" />
        <text x="35" y="162" fill="#047857" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">LUBRIFICATION OBLIGATOIRE</text>
        <text x="35" y="174" fill="#64748b" fontSize="8" fontFamily="var(--font-jbmono), monospace">Fomblin UT18 ou Moebius 8513 en boîte silicone.</text>
        <text x="35" y="184" fill="#334155" fontSize="8" fontFamily="var(--font-jbmono), monospace">Empêche le pincement lors du vissage du fond.</text>
      </g>
    </svg>
  );
}

export function CaseAssemblySVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="caseMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="movMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      <g opacity="0.3">
        <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500 M0,240 H500" stroke="#B9AC93" strokeDasharray="2,4" />
        <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#B9AC93" strokeDasharray="2,4" />
      </g>

      {/* Carrure */}
      <path d="M40,50 L90,50 L90,75 L80,90 L80,180 L90,195 L90,230 L40,230 Z" fill="url(#caseMetal)" stroke="#475569" strokeWidth="1.5" />
      <path d="M410,50 L460,50 L460,230 L410,230 L410,195 L420,180 L420,150 L460,150 L460,130 L420,130 L420,90 L410,75 Z" fill="url(#caseMetal)" stroke="#475569" strokeWidth="1.5" />

      {/* Tube de boîte + couronne */}
      <rect x="420" y="132" width="40" height="16" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
      <text x="345" y="125" fill="#64748b" fontSize="8" fontFamily="var(--font-jbmono), monospace">Tube de boîte</text>

      <line x1="330" y1="140" x2="465" y2="140" stroke="#0369A1" strokeWidth="2.5" />

      <rect x="465" y="120" width="25" height="40" rx="3" fill="#ca8a04" stroke="#fde047" strokeWidth="1.2" />
      <line x1="472" y1="120" x2="472" y2="160" stroke="#854d0e" strokeWidth="1" />
      <line x1="478" y1="120" x2="478" y2="160" stroke="#854d0e" strokeWidth="1" />
      <line x1="484" y1="120" x2="484" y2="160" stroke="#854d0e" strokeWidth="1" />

      <circle cx="458" cy="136" r="3.5" fill="#DC2626" stroke="#7f1d1d" strokeWidth="0.8" />
      <circle cx="458" cy="144" r="3.5" fill="#DC2626" stroke="#7f1d1d" strokeWidth="0.8" />
      <text x="418" y="112" fill="#B91C1C" fontSize="8" fontFamily="var(--font-jbmono), monospace">Joint torique</text>

      {/* Glace + joint Hytrel */}
      <rect x="86" y="50" width="328" height="12" rx="2" fill="#7dd3fc" opacity="0.45" stroke="#0284c7" strokeWidth="1.5" />
      <rect x="86" y="50" width="5" height="12" fill="#E11D48" />
      <rect x="409" y="50" width="5" height="12" fill="#E11D48" />
      <text x="195" y="44" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Glace saphir &amp; joint Hytrel</text>

      {/* Mouvement */}
      <rect x="110" y="100" width="280" height="85" rx="4" fill="url(#movMetal)" stroke="#92400e" strokeWidth="1.8" />
      <rect x="80" y="100" width="30" height="85" fill="#334155" stroke="#64748b" strokeWidth="1" />
      <rect x="390" y="100" width="20" height="85" fill="#334155" stroke="#64748b" strokeWidth="1" />
      <text x="180" y="145" fill="#451A03" fontSize="12" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">MOUVEMENT HORLOGER</text>

      {/* Brides */}
      <path d="M85,96 L118,96 L118,104 L85,104 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
      <circle cx="102" cy="94" r="4.5" fill="#334155" stroke="#ca8a04" strokeWidth="1.2" />
      <text x="48" y="90" fill="#92400E" fontSize="8" fontFamily="var(--font-jbmono), monospace">Bride &amp; vis</text>

      <path d="M382,96 L415,96 L415,104 L382,104 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
      <circle cx="398" cy="94" r="4.5" fill="#334155" stroke="#ca8a04" strokeWidth="1.2" />

      {/* Fond vissé */}
      <path d="M40,225 L460,225 L450,245 L50,245 Z" fill="url(#caseMetal)" stroke="#475569" strokeWidth="1.5" />
      <circle cx="75" cy="225" r="4" fill="#DC2626" stroke="#7f1d1d" strokeWidth="0.8" />
      <circle cx="425" cy="225" r="4" fill="#DC2626" stroke="#7f1d1d" strokeWidth="0.8" />
      <text x="185" y="240" fill="#F1F5F9" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Fond vissé &amp; joint de fond torique</text>

      {/* Synthèse */}
      <rect x="15" y="252" width="470" height="22" rx="4" fill="#F4EFE5" stroke="#9C7A43" strokeWidth="0.8" />
      <text x="25" y="267" fill="#7C5F33" fontSize="8" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">
        ÉTANCHÉITÉ GLOBALE : 3 POINTS CRITIQUES
      </text>
      <text x="230" y="267" fill="#64748b" fontSize="8" fontFamily="var(--font-jbmono), monospace">
        1. Joint de glace · 2. Joint de couronne · 3. Joint de fond (graisser Fomblin)
      </text>
    </svg>
  );
}

export function StemCuttingSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      <g opacity="0.3">
        <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#B9AC93" strokeDasharray="2,4" />
        <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#B9AC93" strokeDasharray="2,4" />
      </g>

      {/* Tige */}
      <rect x="50" y="80" width="55" height="20" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
      <text x="52" y="72" fill="#475569" fontSize="8" fontFamily="var(--font-jbmono), monospace">Carré</text>

      <rect x="105" y="82" width="40" height="16" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="125" cy="90" r="4" fill="#FBF8F1" />
      <text x="110" y="72" fill="#475569" fontSize="8" fontFamily="var(--font-jbmono), monospace">Gorge</text>

      <rect x="145" y="85" width="200" height="10" fill="url(#stemGrad)" stroke="#64748b" strokeWidth="1" />
      <g stroke="#475569" strokeWidth="1">
        <line x1="160" y1="85" x2="160" y2="95" />
        <line x1="180" y1="85" x2="180" y2="95" />
        <line x1="200" y1="85" x2="200" y2="95" />
        <line x1="220" y1="85" x2="220" y2="95" />
        <line x1="240" y1="85" x2="240" y2="95" />
        <line x1="260" y1="85" x2="260" y2="95" />
        <line x1="280" y1="85" x2="280" y2="95" />
        <line x1="300" y1="85" x2="300" y2="95" />
        <line x1="320" y1="85" x2="320" y2="95" />
      </g>
      <text x="190" y="75" fill="#475569" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Filetage mâle (S0.90 / S1.20)</text>

      {/* Point de coupe */}
      <line x1="260" y1="50" x2="260" y2="135" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4,2" />
      <path d="M255,50 L260,40 L265,50 Z" fill="#DC2626" />
      <text x="215" y="35" fill="#B91C1C" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">POINT DE COUPE L = A + B − 0.20</text>

      <rect x="261" y="85" width="84" height="10" fill="#DC2626" opacity="0.3" />
      <text x="275" y="112" fill="#B91C1C" fontSize="8" fontFamily="var(--font-jbmono), monospace">Chute à couper</text>

      {/* Taraudage */}
      <rect x="370" y="70" width="30" height="40" rx="3" fill="#ca8a04" stroke="#fde047" strokeWidth="1.2" />
      <line x1="378" y1="70" x2="378" y2="110" stroke="#854d0e" strokeWidth="1" />
      <line x1="386" y1="70" x2="386" y2="110" stroke="#854d0e" strokeWidth="1" />
      <line x1="394" y1="70" x2="394" y2="110" stroke="#854d0e" strokeWidth="1" />

      <rect x="350" y="86" width="20" height="8" fill="#334155" stroke="#94a3b8" strokeWidth="0.8" />
      <text x="350" y="62" fill="#92400E" fontSize="8" fontFamily="var(--font-jbmono), monospace">Taraudage (A)</text>

      {/* Protocole en 3 temps */}
      <g transform="translate(30, 150)">
        <rect x="0" y="0" width="130" height="70" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1" />
        <text x="10" y="20" fill="#B91C1C" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">1. Coupe franche</text>
        <text x="10" y="38" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Pince coupante douce ou</text>
        <text x="10" y="52" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">bocfil horloger N°3/0.</text>

        <rect x="150" y="0" width="130" height="70" rx="6" fill="#EFF6FF" stroke="#0369A1" strokeWidth="1" />
        <text x="160" y="20" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">2. Chanfrein à 45°</text>
        <text x="160" y="38" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Limer le premier filet à 45°</text>
        <text x="160" y="52" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">sur pierre d'Arkansas.</text>

        <rect x="300" y="0" width="130" height="70" rx="6" fill="#F4EFE5" stroke="#9C7A43" strokeWidth="1" />
        <text x="310" y="20" fill="#7C5F33" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">3. Frein-filet faible</text>
        <text x="310" y="38" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Micro-touche Loctite 222.</text>
        <text x="310" y="52" fill="#B91C1C" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">JAMAIS de Loctite rouge !</text>
      </g>

      {/* Astuce */}
      <rect x="15" y="245" width="470" height="25" rx="5" fill="#F4EFE5" stroke="#9C7A43" strokeWidth="0.8" />
      <circle cx="28" cy="257" r="4" fill="#B45309" />
      <text x="40" y="256" fill="#7C5F33" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">
        ASTUCE DE MAÎTRE : couper toujours 0.20 mm de moins, puis ajuster
      </text>
      <text x="40" y="266" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">
        Une tige trop courte est irrémédiablement perdue. Une tige un peu longue se retouche à la lime en 10 secondes.
      </text>
    </svg>
  );
}

export function WaterproofTestingSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E7E0D2" />
          <stop offset="100%" stopColor="#FBF8F1" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      <g opacity="0.3">
        <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#B9AC93" strokeDasharray="2,4" />
        <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#B9AC93" strokeDasharray="2,4" />
      </g>

      {/* Cloche */}
      <path d="M40,210 L40,70 Q140,40 240,70 L240,210 Z" fill="url(#chamberGrad)" stroke="#0369A1" strokeWidth="1.8" />
      <text x="70" y="62" fill="#0369A1" fontSize="9" fontFamily="var(--font-jbmono), monospace">Cloche étanche à air</text>

      <rect x="70" y="160" width="140" height="40" rx="6" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <path d="M85,160 Q140,154 195,160" fill="none" stroke="#0284c7" strokeWidth="3" />
      <text x="100" y="185" fill="#F1F5F9" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Montre complète</text>

      <rect x="136" y="80" width="8" height="74" fill="#ca8a04" stroke="#92400e" strokeWidth="1" />
      <circle cx="140" cy="154" r="3.5" fill="#DC2626" />
      <text x="152" y="108" fill="#92400E" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Palpeur LVDT (0.1 µm)</text>

      {/* Diagnostic */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="220" height="175" rx="6" fill="#F4EFE5" stroke="#D7D0C4" strokeWidth="1" />
        <text x="15" y="20" fill="#0369A1" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">DIAGNOSTIC ÉTANCHÉITÉ AIR</text>

        <line x1="25" y1="130" x2="200" y2="130" stroke="#B9AC93" strokeWidth="1" />
        <line x1="25" y1="40" x2="25" y2="130" stroke="#B9AC93" strokeWidth="1" />
        <text x="175" y="142" fill="#64748b" fontSize="7" fontFamily="var(--font-jbmono), monospace">Temps (s)</text>
        <text x="10" y="38" fill="#64748b" fontSize="7" fontFamily="var(--font-jbmono), monospace">Δh (µm)</text>

        <path d="M25,120 Q60,65 100,68 L195,68" fill="none" stroke="#059669" strokeWidth="2.5" />
        <circle cx="195" cy="68" r="3" fill="#059669" />
        <text x="105" y="62" fill="#047857" fontSize="8" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">CONFORME (&lt;0.1 µm/min)</text>

        <path d="M25,120 Q60,65 90,75 Q140,115 195,128" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3,2" />
        <circle cx="195" cy="128" r="3" fill="#DC2626" />
        <text x="105" y="105" fill="#B91C1C" fontSize="8" fontFamily="var(--font-jbmono), monospace">FUITE DÉTECTÉE</text>

        <rect x="15" y="145" width="190" height="22" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
        <text x="25" y="160" fill="#047857" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">✓ ÉTANCHE : 10 BAR / 100 M (ISO 22810)</text>
      </g>

      {/* Condensation */}
      <rect x="15" y="245" width="470" height="25" rx="5" fill="#EFF6FF" stroke="#0369A1" strokeWidth="0.8" />
      <circle cx="28" cy="257" r="4" fill="#0369A1" />
      <text x="40" y="256" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">
        TEST DE CONDENSATION : plaque chauffante 40°C - 45°C
      </text>
      <text x="40" y="266" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">
        Chauffer 15 min. Déposer 1 goutte d'eau à 18°C sur la glace. Aucune trace de buée admissible sous 60 secondes.
      </text>
    </svg>
  );
}
