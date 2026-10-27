/**
 * HorloLearn — Schémas techniques vectoriels (partie A)
 * Re-thème clair « Théorie & Académie Horlogère Suisse » : fond crème,
 * traits slate, accents bronze/doré, alertes rouge bordeaux, valides émeraude.
 */

export function DialFeetSVG() {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="dialBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="footCopper" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      <rect width="500" height="240" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      {/* Coupe du cadran */}
      <rect x="50" y="30" width="400" height="18" rx="2" fill="url(#dialBodyGrad)" stroke="#94a3b8" strokeWidth="1.2" />
      <rect x="50" y="30" width="400" height="4" fill="#38bdf8" opacity="0.55" />
      <text x="250" y="24" fill="#7C5F33" fontSize="10" fontFamily="var(--font-jbmono), monospace" textAnchor="middle" fontWeight="bold">
        Cadran : face supérieure (décor / laque) &amp; plaque laiton
      </text>

      {/* Pieds cuivre */}
      <rect x="110" y="48" width="12" height="75" rx="1" fill="url(#footCopper)" stroke="#78350f" strokeWidth="0.8" />
      <path d="M106,123 L126,123 L116,133 Z" fill="#d97706" />

      <rect x="378" y="48" width="12" height="75" rx="1" fill="url(#footCopper)" stroke="#78350f" strokeWidth="0.8" />
      <path d="M374,123 L394,123 L384,133 Z" fill="#d97706" />

      {/* Platine */}
      <path d="M40,70 L95,70 L95,145 L137,145 L137,70 L363,70 L363,145 L405,145 L405,70 L460,70 L460,200 L40,200 Z" fill="url(#plateGrad)" stroke="#475569" strokeWidth="1.5" />
      <text x="250" y="175" fill="#F1F5F9" fontSize="12" fontFamily="var(--font-jbmono), monospace" textAnchor="middle" fontWeight="bold">
        Platine du mouvement (ETA / Manuel / Automatique)
      </text>

      {/* Vis oblique */}
      <g transform="translate(135, 105) rotate(45)">
        <rect x="-8" y="-18" width="16" height="36" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#0f172a" strokeWidth="2" />
        <path d="M-6,-10 L6,-6 M-6,-2 L6,2 M-6,6 L6,10" stroke="#334155" strokeWidth="0.8" />
      </g>
      <path d="M165,130 L135,115" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <text x="175" y="135" fill="#B91C1C" fontSize="10" fontFamily="var(--font-jbmono), monospace">Vis oblique (45°)</text>
      <text x="175" y="147" fill="#64748b" fontSize="9" fontFamily="var(--font-jbmono), monospace">Couple max : 1.2 cNm</text>
      <text x="175" y="159" fill="#A16207" fontSize="8" fontFamily="var(--font-jbmono), monospace">Danger : cisaillement si trop serré</text>

      {/* Verrou excentrique */}
      <circle cx="370" cy="110" r="14" fill="#E0F2FE" stroke="#0284c7" strokeWidth="1.5" />
      <rect x="367" y="98" width="6" height="24" rx="1" fill="#334155" />
      <path d="M360,110 A10,10 0 0,1 380,105" stroke="#ca8a04" strokeWidth="2" fill="none" />
      <text x="415" y="110" fill="#0369A1" fontSize="10" fontFamily="var(--font-jbmono), monospace">Verrou excentrique</text>
      <text x="415" y="122" fill="#64748b" fontSize="9" fontFamily="var(--font-jbmono), monospace">Rotation 1/4 tour</text>
      <text x="415" y="134" fill="#047857" fontSize="8" fontFamily="var(--font-jbmono), monospace">Pince le pied sans entaille</text>

      {/* Règle maîtresse */}
      <rect x="60" y="208" width="380" height="22" rx="4" fill="#FEF2F2" opacity="0.95" stroke="#DC2626" strokeWidth="0.8" />
      <text x="250" y="223" fill="#B91C1C" fontSize="9" fontFamily="var(--font-jbmono), monospace" textAnchor="middle" fontWeight="bold">
        RÈGLE MAÎTRE : ne jamais serrer à fond le 1er pied sans avoir engagé le second — risque de voilage cadran !
      </text>
    </svg>
  );
}

export function HandsClearanceSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="steelHand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="blueHand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      <rect width="500" height="280" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      {/* Grille technique */}
      <g opacity="0.3">
        <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500 M0,240 H500" stroke="#B9AC93" strokeDasharray="2,4" />
        <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#B9AC93" strokeDasharray="2,4" />
      </g>

      {/* Glace saphir */}
      <path d="M50,45 Q250,30 450,45 L450,55 Q250,40 50,55 Z" fill="url(#crystalGrad)" stroke="#0284c7" strokeWidth="1.5" />
      <text x="350" y="38" fill="#0369A1" fontSize="9" fontFamily="var(--font-jbmono), monospace">Glace saphir (face interne)</text>

      {/* Charnier / tube */}
      <rect x="75" y="60" width="22" height="150" fill="#334155" stroke="#64748b" strokeWidth="1" />
      <rect x="83" y="60" width="6" height="150" fill="#38bdf8" opacity="0.8" />

      {/* Canon des heures */}
      <rect x="79" y="95" width="14" height="115" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
      {/* Canon des minutes */}
      <rect x="75" y="130" width="22" height="80" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />

      {/* Cadran */}
      <rect x="40" y="210" width="420" height="18" rx="2" fill="url(#dialGrad)" stroke="#ca8a04" strokeWidth="1.5" />
      <rect x="360" y="195" width="30" height="15" rx="2" fill="url(#goldHand)" stroke="#eab308" strokeWidth="1" />
      <text x="365" y="238" fill="#92400E" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Index appliqué (H : 0.50 mm)</text>
      <text x="50" y="238" fill="#64748b" fontSize="9" fontFamily="var(--font-jbmono), monospace">Cadran horloger (surface émaillée / soleillée)</text>

      {/* Aiguilles */}
      <rect x="75" y="155" width="200" height="9" rx="2" fill="url(#goldHand)" stroke="#fef08a" strokeWidth="1" />
      <circle cx="86" cy="159.5" r="9" fill="url(#goldHand)" stroke="#ca8a04" strokeWidth="1" />
      <text x="285" y="162" fill="#A16207" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Aiguille des heures</text>

      <rect x="79" y="115" width="280" height="7" rx="1.5" fill="url(#steelHand)" stroke="#64748b" strokeWidth="1" />
      <circle cx="86" cy="118.5" r="7.5" fill="url(#steelHand)" stroke="#475569" strokeWidth="1" />
      <text x="365" y="121" fill="#334155" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Aiguille des minutes</text>

      <rect x="83" y="78" width="330" height="4" rx="1" fill="url(#blueHand)" stroke="#93c5fd" strokeWidth="0.8" />
      <circle cx="86" cy="80" r="5" fill="url(#blueHand)" stroke="#60a5fa" strokeWidth="1" />
      <text x="420" y="82" fill="#2563EB" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Trotteuse</text>

      {/* Gardes */}
      <line x1="220" y1="165" x2="220" y2="210" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="228" y="190" fill="#BE123C" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">G1 : 0.20 mm (garde index)</text>

      <line x1="180" y1="123" x2="180" y2="154" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="188" y="141" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">G2 : 0.15 mm (parallélisme)</text>

      <line x1="140" y1="83" x2="140" y2="114" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="148" y="101" fill="#6D28D9" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">G3 : 0.15 mm (liberté canon)</text>

      <line x1="300" y1="48" x2="300" y2="77" stroke="#059669" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="308" y="65" fill="#047857" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">G4 : 0.30 mm (garde glace)</text>

      {/* Règle d'or */}
      <rect x="15" y="246" width="470" height="26" rx="5" fill="#F4EFE5" stroke="#9C7A43" strokeWidth="0.8" />
      <circle cx="28" cy="259" r="4" fill="#B45309" />
      <text x="40" y="258" fill="#7C5F33" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">
        RÈGLE D'OR AIGUILLAGE NIHS 91-10 : parallélisme &amp; gardes parfaites
      </text>
      <text x="40" y="267" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">
        Contrôle sur 12 h complètes à la loupe 10x. Aucune flexion ni frottement toléré.
      </text>
    </svg>
  );
}

export function DialProtectionSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="280" rx="10" fill="#FBF8F1" stroke="#E0D8C8" strokeWidth="1.2" />

      <g opacity="0.3">
        <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#B9AC93" strokeDasharray="2,4" />
        <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#B9AC93" strokeDasharray="2,4" />
      </g>

      {/* Cadran */}
      <circle cx="150" cy="130" r="85" fill="#F7F3EA" stroke="#9C7A43" strokeWidth="2" />
      <circle cx="150" cy="130" r="70" fill="none" stroke="#D7D0C4" strokeWidth="0.8" />
      <path d="M90,70 L210,70 L210,190 L90,190 Z" fill="#7dd3fc" opacity="0.3" stroke="#0284c7" strokeWidth="1.5" />

      <path d="M150,70 L150,130" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <text x="80" y="215" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace">Film protège-cadran Mylar</text>

      {/* Outillage du maître */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="220" height="175" rx="6" fill="#F4EFE5" stroke="#D7D0C4" strokeWidth="1" />
        <text x="15" y="25" fill="#7C5F33" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">OUTILLAGE DU MAÎTRE D'ATELIER</text>

        <rect x="15" y="45" width="190" height="35" rx="4" fill="#FBF8F1" stroke="#B9AC93" strokeWidth="1" />
        <text x="25" y="60" fill="#334155" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Pince Presto Bergeon N°1</text>
        <text x="25" y="72" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Pour dépose sans contact avec le cadran.</text>

        <rect x="15" y="90" width="190" height="35" rx="4" fill="#FBF8F1" stroke="#B9AC93" strokeWidth="1" />
        <text x="25" y="105" fill="#0369A1" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Posoir à embout Delrin / Téflon</text>
        <text x="25" y="117" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Chassage perpendiculaire sans rayer laque.</text>

        <rect x="15" y="135" width="190" height="30" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
        <text x="25" y="149" fill="#047857" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Pâte Rodico fraîche &amp; bâton sureau</text>
        <text x="25" y="160" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">Élimination des micro-fibres sous loupe 10x.</text>
      </g>

      {/* Interdiction */}
      <rect x="15" y="245" width="470" height="25" rx="5" fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.8" />
      <circle cx="28" cy="257" r="4" fill="#B91C1C" />
      <text x="40" y="256" fill="#B91C1C" fontSize="8.5" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">
        INTERDICTION ABSOLUE : toucher le cadran aux brucelles métalliques
      </text>
      <text x="40" y="266" fill="#64748b" fontSize="7.5" fontFamily="var(--font-jbmono), monospace">
        Toujours interposer un film protecteur. Une micro-rayure sur un cadran laqué est irréversible.
      </text>
    </svg>
  );
}

export function GrazingBeamSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lightBeamModal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="#FBF8F1" />
      <rect x="30" y="140" width="340" height="14" rx="2" fill="#E7E0D2" stroke="#B9AC93" strokeWidth="1" />
      <text x="200" y="170" fill="#64748b" fontSize="10" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Surface vernie du cadran</text>
      <path d="M40,30 L110,65 L90,105 L20,70 Z" fill="#64748b" stroke="#B45309" strokeWidth="1.2" />
      <circle cx="95" cy="85" r="10" fill="#f59e0b" />
      <text x="55" y="25" fill="#B45309" fontSize="9" fontFamily="var(--font-jbmono), monospace" fontWeight="bold">Lampe 45°</text>
      <polygon points="105,85 360,140 180,140" fill="url(#lightBeamModal)" />
      <circle cx="240" cy="138" r="3" fill="#334155" />
      <ellipse cx="255" cy="141" rx="12" ry="2" fill="#78716c" opacity="0.55" />
      <path d="M240,120 L240,132" stroke="#0284c7" strokeWidth="1.2" />
      <text x="240" y="112" fill="#0369A1" fontSize="9" fontFamily="var(--font-jbmono), monospace" textAnchor="middle">Micro-fibre révélée</text>
      <text x="272" y="155" fill="#B91C1C" fontSize="8" fontFamily="var(--font-jbmono), monospace">Ombre portée nette</text>
      <circle cx="240" cy="40" r="14" fill="#F4EFE5" stroke="#64748b" strokeWidth="1.2" />
      <circle cx="240" cy="40" r="6" fill="#0284c7" />
      <path d="M240,58 L240,110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
      <text x="265" y="44" fill="#334155" fontSize="9" fontFamily="var(--font-jbmono), monospace">Regard loupe 4x</text>
    </svg>
  );
}
