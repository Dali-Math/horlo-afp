"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  Clock,
  Droplet,
  Compass,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ZoomIn,
  X,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Eye,
  Sliders,
  Check
} from "lucide-react";

// =========================================================================
// 1. SCHÉMAS TECHNIQUES VECTORIELS OFFICIELS (COMPOSANTS SVG REACT PURS)
// =========================================================================

function DialFeetSVG() {
  return (
<svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#475569"/>
      <stop offset="100%" stopColor="#1e293b"/>
    </linearGradient>
    <linearGradient id="dialBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0f172a"/>
      <stop offset="50%" stopColor="#1e293b"/>
      <stop offset="100%" stopColor="#0f172a"/>
    </linearGradient>
    <linearGradient id="footCopper" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#f59e0b"/>
      <stop offset="50%" stopColor="#d97706"/>
      <stop offset="100%" stopColor="#b45309"/>
    </linearGradient>
  </defs>

  <rect width="500" height="240" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <rect x="50" y="30" width="400" height="18" rx="2" fill="url(#dialBodyGrad)" stroke="#64748b" strokeWidth="1.2"/>
  <rect x="50" y="30" width="400" height="4" fill="#38bdf8" opacity="0.8"/>
  <text x="250" y="24" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Cadran : Face supérieure (Décor / Laque) & Plaque laiton</text>

  
  <rect x="110" y="48" width="12" height="75" rx="1" fill="url(#footCopper)" stroke="#78350f" strokeWidth="0.8"/>
  <path d="M106,123 L126,123 L116,133 Z" fill="#d97706"/>

  
  <rect x="378" y="48" width="12" height="75" rx="1" fill="url(#footCopper)" stroke="#78350f" strokeWidth="0.8"/>
  <path d="M374,123 L394,123 L384,133 Z" fill="#d97706"/>

  
  <path d="M40,70 L95,70 L95,145 L137,145 L137,70 L363,70 L363,145 L405,145 L405,70 L460,70 L460,200 L40,200 Z" fill="url(#plateGrad)" stroke="#64748b" strokeWidth="1.5"/>
  <text x="250" y="175" fill="#e2e8f0" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Platine du Mouvement (ETA / Manuel / Automatique)</text>

  
  <g transform="translate(135, 105) rotate(45)">
    <rect x="-8" y="-18" width="16" height="36" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1"/>
    <line x1="-8" y1="0" x2="8" y2="0" stroke="#0f172a" strokeWidth="2"/>
    
    <path d="M-6,-10 L6,-6 M-6,-2 L6,2 M-6,6 L6,10" stroke="#475569" strokeWidth="0.8"/>
  </g>
  <path d="M165,130 L135,115" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)"/>
  <text x="175" y="135" fill="#f87171" fontSize="10" fontFamily="monospace">Vis oblique (45°)</text>
  <text x="175" y="147" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Couple max: 1.2 cNm</text>
  <text x="175" y="159" fill="#eab308" fontSize="8" fontFamily="sans-serif">Danger: cisaillement si trop serré</text>

  
  <circle cx="370" cy="110" r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5"/>
  <rect x="367" y="98" width="6" height="24" rx="1" fill="#0f172a"/>
  <path d="M360,110 A10,10 0 0,1 380,105" stroke="#facc15" strokeWidth="2" fill="none"/>
  <text x="415" y="110" fill="#38bdf8" fontSize="10" fontFamily="monospace">Verrou excentrique</text>
  <text x="415" y="122" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Rotation 1/4 tour</text>
  <text x="415" y="134" fill="#34d399" fontSize="8" fontFamily="sans-serif">Pince le pied sans entaille</text>

  
  <rect x="60" y="208" width="380" height="22" rx="4" fill="#7f1d1d" opacity="0.4" stroke="#ef4444" strokeWidth="0.8"/>
  <text x="250" y="223" fill="#fecaca" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
    ⚠️ RÈGLE MAÎTRE : Ne jamais serrer à fond le 1er pied sans avoir engagé le second. Risque de voilage cadran !
  </text>
</svg>
  );
}

function HandsClearanceSVG() {
  return (
<svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"/>
      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05"/>
    </linearGradient>
    <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0f172a"/>
      <stop offset="50%" stopColor="#1e293b"/>
      <stop offset="100%" stopColor="#0f172a"/>
    </linearGradient>
    <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#fef08a"/>
      <stop offset="50%" stopColor="#eab308"/>
      <stop offset="100%" stopColor="#ca8a04"/>
    </linearGradient>
    <linearGradient id="steelHand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#e2e8f0"/>
      <stop offset="50%" stopColor="#94a3b8"/>
      <stop offset="100%" stopColor="#475569"/>
    </linearGradient>
    <linearGradient id="blueHand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#60a5fa"/>
      <stop offset="50%" stopColor="#2563eb"/>
      <stop offset="100%" stopColor="#1e3a8a"/>
    </linearGradient>
  </defs>

  <rect width="500" height="280" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <g opacity="0.12">
    <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500 M0,240 H500" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>

  
  <path d="M50,45 Q250,30 450,45 L450,55 Q250,40 50,55 Z" fill="url(#crystalGrad)" stroke="#38bdf8" strokeWidth="1.5"/>
  <text x="350" y="38" fill="#38bdf8" fontSize="9" fontFamily="monospace">Glace Saphir (Face Interne)</text>

  
  <rect x="75" y="60" width="22" height="150" fill="#334155" stroke="#64748b" strokeWidth="1"/>
  
  <rect x="83" y="60" width="6" height="150" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8"/>

  
  <rect x="79" y="95" width="14" height="115" fill="#ca8a04" stroke="#eab308" strokeWidth="0.8"/>

  
  <rect x="75" y="130" width="22" height="80" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8"/>

  
  <rect x="40" y="210" width="420" height="18" rx="2" fill="url(#dialGrad)" stroke="#ca8a04" strokeWidth="1.5"/>
  
  <rect x="360" y="195" width="30" height="15" rx="2" fill="url(#goldHand)" stroke="#eab308" strokeWidth="1"/>
  <text x="365" y="238" fill="#ca8a04" fontSize="8.5" fontFamily="monospace">Index Applique (H: 0.50mm)</text>
  <text x="50" y="238" fill="#94a3b8" fontSize="9" fontFamily="monospace">Cadran Horloger (Surface Émaillée / Soleillée)</text>

  
  <rect x="75" y="155" width="200" height="9" rx="2" fill="url(#goldHand)" stroke="#fef08a" strokeWidth="1"/>
  <circle cx="86" cy="159.5" r="9" fill="url(#goldHand)" stroke="#ca8a04" strokeWidth="1"/>
  <text x="285" y="162" fill="#fde047" fontSize="9" fontFamily="monospace" fontWeight="bold">Aiguille des Heures</text>

  
  <rect x="79" y="115" width="280" height="7" rx="1.5" fill="url(#steelHand)" stroke="#fff" strokeWidth="1"/>
  <circle cx="86" cy="118.5" r="7.5" fill="url(#steelHand)" stroke="#64748b" strokeWidth="1"/>
  <text x="365" y="121" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">Aiguille des Minutes</text>

  
  <rect x="83" y="78" width="330" height="4" rx="1" fill="url(#blueHand)" stroke="#93c5fd" strokeWidth="0.8"/>
  <circle cx="86" cy="80" r="5" fill="url(#blueHand)" stroke="#60a5fa" strokeWidth="1"/>
  <text x="420" y="82" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold">Trotteuse</text>

  
  
  <line x1="220" y1="165" x2="220" y2="210" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2"/>
  <text x="228" y="190" fill="#f43f5e" fontSize="8.5" fontFamily="monospace" fontWeight="bold">G1 : 0.20 mm (Garde Index)</text>

  
  <line x1="180" y1="123" x2="180" y2="154" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2"/>
  <text x="188" y="141" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">G2 : 0.15 mm (Parallélisme)</text>

  
  <line x1="140" y1="83" x2="140" y2="114" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2,2"/>
  <text x="148" y="101" fill="#c084fc" fontSize="8.5" fontFamily="monospace" fontWeight="bold">G3 : 0.15 mm (Liberté canon)</text>

  
  <line x1="300" y1="48" x2="300" y2="77" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2"/>
  <text x="308" y="65" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">G4 : 0.30 mm (Garde Glace)</text>

  
  <rect x="15" y="246" width="470" height="26" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8"/>
  <circle cx="28" cy="259" r="4" fill="#eab308"/>
  <text x="40" y="258" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">RÈGLE D'OR AIGUILLAGE NIHS 91-10 : PARALLÉLISME & GARDES PARFAITES</text>
  <text x="40" y="267" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Contrôle sur 12h complètes à la loupe 10x. Aucune flexion ni frottement toléré.</text>
</svg>
  );
}

function DialProtectionSVG() {
  return (
<svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <rect width="500" height="280" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  
  <g opacity="0.12">
    <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>

  
  <circle cx="150" cy="130" r="85" fill="#0f172a" stroke="#ca8a04" strokeWidth="2"/>
  
  <path d="M90,70 L210,70 L210,190 L90,190 Z" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5"/>
  
  <path d="M150,70 L150,130" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
  <text x="80" y="215" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">Film Protège-Cadran Mylar</text>

  
  <g transform="translate(260, 45)">
    <rect x="0" y="0" width="220" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="15" y="25" fill="#fde047" fontSize="9" fontFamily="monospace" fontWeight="bold">OUTILLAGE DU MAÎTRE D'ATELIER</text>

    
    <rect x="15" y="45" width="190" height="35" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="25" y="60" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Pince Presto Bergeon N°1</text>
    <text x="25" y="72" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Pour dépose sans contact avec le cadran.</text>

    
    <rect x="15" y="90" width="190" height="35" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="25" y="105" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Posoir à Embout Delrin/Téflon</text>
    <text x="25" y="117" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Chassage perpendiculaire sans rayer laque.</text>

    
    <rect x="15" y="135" width="190" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
    <text x="25" y="149" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Pâte Rodico Fraîche & Bâton Sureau</text>
    <text x="25" y="160" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Élimination des micro-fibres sous loupe 10x.</text>
  </g>

  
  <rect x="15" y="245" width="470" height="25" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8"/>
  <circle cx="28" cy="257" r="4" fill="#facc15"/>
  <text x="40" y="256" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">INTERDICTION ABSOLUE : TOUCHER LE CADRAN AUX BRUCELLES MÉTALLIQUES</text>
  <text x="40" y="266" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Toujours interposer un film protecteur. Une micro-rayure sur un cadran laqué est irréversible.</text>
</svg>
  );
}

function GasketsCasingSVG() {
  return (
<svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="metalCaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#334155"/>
      <stop offset="50%" stopColor="#64748b"/>
      <stop offset="100%" stopColor="#1e293b"/>
    </linearGradient>
  </defs>

  <rect width="500" height="240" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <g transform="translate(10, 20)">
    <rect x="10" y="10" width="220" height="190" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="120" y="32" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">1. Joint de Glace (Hytrel / L-Ring)</text>
    
    
    <path d="M25,50 L75,50 L75,70 L95,70 L95,140 L25,140 Z" fill="url(#metalCaseGrad)" stroke="#94a3b8" strokeWidth="1"/>
    
    <rect x="98" y="50" width="120" height="16" fill="#38bdf8" opacity="0.4" stroke="#0284c7" strokeWidth="1.2"/>
    <text x="158" y="62" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">Glace Saphir</text>
    
    <path d="M94,48 L97,48 L97,68 L115,68 L115,71 L94,71 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8"/>
    
    
    <rect x="25" y="148" width="190" height="42" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="0.8"/>
    <text x="35" y="162" fill="#f87171" fontSize="9" fontFamily="sans-serif" fontWeight="bold">MONTAGE STRICTEMENT À SEC !</text>
    <text x="35" y="174" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Jamais de graisse silicone ni d'huile.</text>
    <text x="35" y="184" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">L'Hytrel assure l'étanchéité par écrasement.</text>
  </g>

  
  <g transform="translate(250, 20)">
    <rect x="10" y="10" width="230" height="190" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="125" y="32" fill="#34d399" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">2. Joints Toriques (Fond & Couronne)</text>
    
    
    <path d="M25,60 L140,60 L140,75 L160,75 L160,85 L205,85 L205,120 L25,120 Z" fill="url(#metalCaseGrad)" stroke="#94a3b8" strokeWidth="1"/>
    
    <path d="M140,75 L160,75 L160,95 L140,95 Z" fill="#090d16" stroke="#475569" strokeWidth="0.8"/>
    
    <ellipse cx="150" cy="85" rx="8" ry="7" fill="#10b981" stroke="#047857" strokeWidth="1.2"/>
    
    <ellipse cx="150" cy="85" rx="10" ry="9" fill="none" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="2,2"/>
    <text x="150" y="110" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">O-Ring + Fomblin</text>

    
    <rect x="25" y="148" width="200" height="42" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="0.8"/>
    <text x="35" y="162" fill="#34d399" fontSize="9" fontFamily="sans-serif" fontWeight="bold">LUBRIFICATION OBLIGATOIRE</text>
    <text x="35" y="174" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Fomblin UT18 ou Moebius 8513 en boîte silicone.</text>
    <text x="35" y="184" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Empêche le pincement lors du vissage du fond.</text>
  </g>
</svg>
  );
}

function CaseAssemblySVG() {
  return (
<svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="caseMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#475569"/>
      <stop offset="50%" stopColor="#1e293b"/>
      <stop offset="100%" stopColor="#0f172a"/>
    </linearGradient>
    <linearGradient id="movMetal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#fef08a"/>
      <stop offset="70%" stopColor="#ca8a04"/>
      <stop offset="100%" stopColor="#854d0e"/>
    </linearGradient>
  </defs>

  <rect width="500" height="280" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <g opacity="0.12">
    <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500 M0,240 H500" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>

  
  <path d="M40,50 L90,50 L90,75 L80,90 L80,180 L90,195 L90,230 L40,230 Z" fill="url(#caseMetal)" stroke="#64748b" strokeWidth="1.5"/>
  
  
  <path d="M410,50 L460,50 L460,230 L410,230 L410,195 L420,180 L420,150 L460,150 L460,130 L420,130 L420,90 L410,75 Z" fill="url(#caseMetal)" stroke="#64748b" strokeWidth="1.5"/>

  
  <rect x="420" y="132" width="40" height="16" fill="#334155" stroke="#94a3b8" strokeWidth="1"/>
  <text x="350" y="125" fill="#94a3b8" fontSize="8" fontFamily="monospace">Tube de boîte</text>

  
  <line x1="330" y1="140" x2="465" y2="140" stroke="#38bdf8" strokeWidth="2.5"/>
  
  <rect x="465" y="120" width="25" height="40" rx="3" fill="#ca8a04" stroke="#fde047" strokeWidth="1.2"/>
  <line x1="472" y1="120" x2="472" y2="160" stroke="#854d0e" strokeWidth="1"/>
  <line x1="478" y1="120" x2="478" y2="160" stroke="#854d0e" strokeWidth="1"/>
  <line x1="484" y1="120" x2="484" y2="160" stroke="#854d0e" strokeWidth="1"/>
  
  <circle cx="458" cy="136" r="3.5" fill="#ef4444" stroke="#fff" strokeWidth="0.8"/>
  <circle cx="458" cy="144" r="3.5" fill="#ef4444" stroke="#fff" strokeWidth="0.8"/>
  <text x="440" y="112" fill="#f87171" fontSize="8" fontFamily="monospace">Joint Torique</text>

  
  <rect x="86" y="50" width="328" height="12" rx="2" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5"/>
  <rect x="86" y="50" width="5" height="12" fill="#f43f5e"/>
  <rect x="409" y="50" width="5" height="12" fill="#f43f5e"/>
  <text x="195" y="44" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">Glace Saphir & Joint Hytrel</text>

  
  <rect x="110" y="100" width="280" height="85" rx="4" fill="url(#movMetal)" stroke="#ca8a04" strokeWidth="1.8"/>
  
  <rect x="80" y="100" width="30" height="85" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
  <rect x="390" y="100" width="20" height="85" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
  <text x="180" y="145" fill="#070a10" fontSize="12" fontFamily="monospace" fontWeight="bold">MOUVEMENT HORLOGER</text>

  
  
  <path d="M85,96 L118,96 L118,104 L85,104 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1"/>
  <circle cx="102" cy="94" r="4.5" fill="#334155" stroke="#facc15" strokeWidth="1.2"/>
  <text x="50" y="90" fill="#facc15" fontSize="8" fontFamily="monospace">Bride & Vis</text>
  
  <path d="M382,96 L415,96 L415,104 L382,104 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1"/>
  <circle cx="398" cy="94" r="4.5" fill="#334155" stroke="#facc15" strokeWidth="1.2"/>

  
  <path d="M40,225 L460,225 L450,245 L50,245 Z" fill="url(#caseMetal)" stroke="#64748b" strokeWidth="1.5"/>
  <circle cx="75" cy="225" r="4" fill="#ef4444" stroke="#fff" strokeWidth="0.8"/>
  <circle cx="425" cy="225" r="4" fill="#ef4444" stroke="#fff" strokeWidth="0.8"/>
  <text x="185" y="240" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">Fond Vissé & Joint de Fond Torique</text>

  
  <rect x="15" y="252" width="470" height="22" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8"/>
  <text x="25" y="267" fill="#fef08a" fontSize="8" fontFamily="monospace" fontWeight="bold">ÉTANCHÉITÉ GLOBALE : 3 POINTS CRITIQUES</text>
  <text x="230" y="267" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">1. Joint de glace · 2. Joint de couronne · 3. Joint de fond (graissé Fomblin)</text>
</svg>
  );
}

function StemCuttingSVG() {
  return (
<svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#94a3b8"/>
      <stop offset="50%" stopColor="#cbd5e1"/>
      <stop offset="100%" stopColor="#64748b"/>
    </linearGradient>
  </defs>

  <rect width="500" height="280" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <g opacity="0.12">
    <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>

  
  
  <rect x="50" y="80" width="55" height="20" fill="#475569" stroke="#94a3b8" strokeWidth="1"/>
  <text x="52" y="72" fill="#94a3b8" fontSize="8" fontFamily="monospace">Carré</text>

  
  <rect x="105" y="82" width="40" height="16" fill="#334155" stroke="#94a3b8" strokeWidth="1"/>
  <circle cx="125" cy="90" r="4" fill="#070a10"/>
  <text x="110" y="72" fill="#94a3b8" fontSize="8" fontFamily="monospace">Gorge</text>

  
  <rect x="145" y="85" width="200" height="10" fill="url(#stemGrad)" stroke="#cbd5e1" strokeWidth="1"/>
  
  <g stroke="#475569" strokeWidth="1">
    <line x1="160" y1="85" x2="160" y2="95"/>
    <line x1="180" y1="85" x2="180" y2="95"/>
    <line x1="200" y1="85" x2="200" y2="95"/>
    <line x1="220" y1="85" x2="220" y2="95"/>
    <line x1="240" y1="85" x2="240" y2="95"/>
    <line x1="260" y1="85" x2="260" y2="95"/>
    <line x1="280" y1="85" x2="280" y2="95"/>
    <line x1="300" y1="85" x2="300" y2="95"/>
    <line x1="320" y1="85" x2="320" y2="95"/>
  </g>
  <text x="190" y="75" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">Filetage Mâle (S0.90 / S1.20)</text>

  
  <line x1="260" y1="50" x2="260" y2="135" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,2"/>
  <path d="M255,50 L260,40 L265,50 Z" fill="#ef4444"/>
  <text x="215" y="35" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">POINT DE COUPE L = A + B - 0.20</text>

  
  <rect x="261" y="85" width="84" height="10" fill="#ef4444" opacity="0.35"/>
  <text x="275" y="112" fill="#f87171" fontSize="8" fontFamily="monospace">Chute à couper</text>

  
  <rect x="370" y="70" width="30" height="40" rx="3" fill="#ca8a04" stroke="#fde047" strokeWidth="1.2"/>
  <line x1="378" y1="70" x2="378" y2="110" stroke="#854d0e" strokeWidth="1"/>
  <line x1="386" y1="70" x2="386" y2="110" stroke="#854d0e" strokeWidth="1"/>
  <line x1="394" y1="70" x2="394" y2="110" stroke="#854d0e" strokeWidth="1"/>
  
  <rect x="350" y="86" width="20" height="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="0.8"/>
  <text x="355" y="62" fill="#facc15" fontSize="8" fontFamily="monospace">Taraudage (A)</text>

  
  <g transform="translate(30, 150)">
    
    <rect x="0" y="0" width="130" height="70" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="10" y="20" fill="#f87171" fontSize="8.5" fontFamily="monospace" fontWeight="bold">1. Coupe Franche</text>
    <text x="10" y="38" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Pince coupante douce ou</text>
    <text x="10" y="52" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">bocfil horloger N°3/0.</text>

    
    <rect x="150" y="0" width="130" height="70" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="160" y="20" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">2. Chanfrein à 45°</text>
    <text x="160" y="38" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Limer le premier filet à 45°</text>
    <text x="160" y="52" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">sur pierre d'Arkansas.</text>

    
    <rect x="300" y="0" width="130" height="70" rx="6" fill="#0f172a" stroke="#ca8a04" strokeWidth="1"/>
    <text x="310" y="20" fill="#fde047" fontSize="8.5" fontFamily="monospace" fontWeight="bold">3. Frein-Filet Faible</text>
    <text x="310" y="38" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Micro-touche Loctite 222.</text>
    <text x="310" y="52" fill="#ef4444" fontSize="7.5" fontFamily="sans-serif">JAMAIS de Loctite rouge !</text>
  </g>

  
  <rect x="15" y="245" width="470" height="25" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8"/>
  <circle cx="28" cy="257" r="4" fill="#eab308"/>
  <text x="40" y="256" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">ASTUCE DE MAÎTRE : COUPER TOUJOURS 0.20 MM DE MOINS PUIS AJUSTER</text>
  <text x="40" y="266" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Une tige trop courte est irrémédiablement perdue. Une tige un peu longue se retouche à la lime en 10 secondes.</text>
</svg>
  );
}

function WaterproofTestingSVG() {
  return (
<svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#1e293b"/>
      <stop offset="100%" stopColor="#070a10"/>
    </linearGradient>
  </defs>

  <rect width="500" height="280" rx="10" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>

  
  <g opacity="0.12">
    <path d="M0,40 H500 M0,80 H500 M0,120 H500 M0,160 H500 M0,200 H500" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M50,0 V280 M100,0 V280 M150,0 V280 M200,0 V280 M250,0 V280 M300,0 V280 M350,0 V280 M400,0 V280 M450,0 V280" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>

  
  <path d="M40,210 L40,70 Q140,40 240,70 L240,210 Z" fill="url(#chamberGrad)" stroke="#38bdf8" strokeWidth="1.8"/>
  <text x="75" y="65" fill="#38bdf8" fontSize="9" fontFamily="monospace">Cloche Étanche à Air</text>

  
  <rect x="70" y="160" width="140" height="40" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="1.5"/>
  
  <path d="M85,160 Q140,154 195,160" fill="none" stroke="#38bdf8" strokeWidth="3"/>
  <text x="100" y="185" fill="#fde047" fontSize="8.5" fontFamily="monospace">Montre Complète</text>

  
  <rect x="136" y="80" width="8" height="74" fill="#ca8a04" stroke="#fef08a" strokeWidth="1"/>
  <circle cx="140" cy="154" r="3.5" fill="#ef4444"/>
  <text x="150" y="110" fill="#fef08a" fontSize="8.5" fontFamily="monospace">Palpeur LVDT (0.1 µm)</text>

  
  <g transform="translate(260, 45)">
    <rect x="0" y="0" width="220" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="15" y="20" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">DIAGNOSTIC ÉTANCHÉITÉ AIR</text>
    
    
    <line x1="25" y1="130" x2="200" y2="130" stroke="#475569" strokeWidth="1"/>
    <line x1="25" y1="40" x2="25" y2="130" stroke="#475569" strokeWidth="1"/>
    <text x="175" y="142" fill="#64748b" fontSize="7" fontFamily="monospace">Temps (s)</text>
    <text x="10" y="38" fill="#64748b" fontSize="7" fontFamily="monospace">Δh (µm)</text>

    
    <path d="M25,120 Q60,65 100,68 L195,68" fill="none" stroke="#10b981" strokeWidth="2.5"/>
    <circle cx="195" cy="68" r="3" fill="#10b981"/>
    <text x="110" y="62" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">CONFORME (&lt;0.1 µm/min)</text>

    
    <path d="M25,120 Q60,65 90,75 Q140,115 195,128" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,2"/>
    <circle cx="195" cy="128" r="3" fill="#ef4444"/>
    <text x="105" y="105" fill="#f87171" fontSize="8" fontFamily="monospace">FUITE DETECTÉE</text>

    
    <rect x="15" y="145" width="190" height="22" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1"/>
    <text x="25" y="160" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace" fontWeight="bold">✓ ÉTANCHE : 10 BAR / 100 M (ISO 22810)</text>
  </g>

  
  <rect x="15" y="245" width="470" height="25" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8"/>
  <circle cx="28" cy="257" r="4" fill="#38bdf8"/>
  <text x="40" y="256" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">TEST DE CONDENSATION : PLAQUE CHAUFFANTE 40°C - 45°C</text>
  <text x="40" y="266" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Chauffer 15 min. Déposer 1 goutte d'eau à 18°C sur la glace. Aucune trace de buée admissible sous 60 secondes.</text>
</svg>
  );
}

// =========================================================================
// 2. DONNÉES DU COURS : LES 7 ÉTAPES FONDAMENTALES D'EMBOÎTAGE
// =========================================================================

interface StepData {
  id: number;
  badge: string;
  title: string;
  summary: string;
  tools: string[];
  torques: string;
  standard: string;
  masterTip: string;
  trapAlert: string;
}

const STEPS_DATA: StepData[] = [
  {
    id: 1,
    badge: "Phase Préparatoire",
    title: "Contrôle, Cadrage & Fixation du Cadran",
    summary: "Le cadran est le visage de la montre. Avant toute fixation sur la platine, inspectez scrupuleusement la rectitude des deux pieds en cuivre à la loupe 4x. Un pied faussé créera une tension asymétrique qui fera bomber le cadran ou frotter le disque dateur.",
    tools: ["Tournevis 30081 (0.80 mm)", "Brucelles fines N°3", "Loupe d'établi 4x"],
    torques: "1.2 cNm max",
    standard: "NIHS 91-10",
    masterTip: "Ne bloquez JAMAIS la première vis à fond ! Approchez la première vis sans forcer, approchez la seconde vis, contrôlez le centrage parfait du guichet de date autour du disque, puis appliquez le serrage final alternatif.",
    trapAlert: "Serrer la vis avec un tournevis trop large ou forcer le couple : le pied en cuivre se sectionne net à la base ou l'émail saute sur la face visible du cadran. Zéro éliminatoire immédiat aux examens !"
  },
  {
    id: 2,
    badge: "Micro-Mécanique de Précision",
    title: "Chassage des Aiguilles & Gardes NIHS 91-10",
    summary: "Le chassage des aiguilles requiert un sang-froid absolu. L'aiguille doit être parfaitement horizontale, parallèle au cadran, sans aucune trace d'outil, et positionnée à des distances micrométriques impératives définies par la norme suisse NIHS 91-10.",
    tools: ["Presse à chasser Bergeon", "Tasseaux en Delrin", "Protecteur Mylar Bergeon 6938", "Pince aux aiguilles Presto N°1"],
    torques: "Chassage progressif sans à-coup",
    standard: "NIHS 91-10 (G1, G2, G3, G4)",
    masterTip: "Avant de poser la première aiguille, faites tourner la tige en position mise à l'heure jusqu'au saut franc de la date. Stoppez net ! Posez alors l'aiguille des heures pointant rigoureusement sur 12h00, puis l'aiguille des minutes. Votre date sautera ainsi précisément à 00:00 (tolérance : 23h55 – 00:05).",
    trapAlert: "Chasser une aiguille sans protecteur de cadran en Mylar, ou laisser l'aiguille des minutes frotter les index appliqués ou la face interne du saphir. Baisse d'amplitude fatale et rayure irrémédiable."
  },
  {
    id: 3,
    badge: "Hygiène Chirurgicale",
    title: "La Chasse Chirurgicale à la Poussière (Protocole 45°)",
    summary: "C'est la hantise de l'horloger : la micro-poussière invisible lors de l'assemblage qui, une fois la boîte fermée et livrée, vient se coller en plein milieu du saphir au soleil ! Pour éliminer ce risque, l'atelier suisse applique le protocole d'inspection en lumière rasante à 45°.",
    tools: ["Poire à soufflet Bergeon 4657 (Filtre HEPA)", "Pâte Rodico 6033 fraîche", "Bâtonnet de moelle de sureau", "Lampe d'établi articulée 45°"],
    torques: "Pression douce par tamponnement",
    standard: "Protocole Salle Blanche Horlogère",
    masterTip: "L'éclairage zénithal (par le dessus) crée des reflets qui masquent les poussières. En inclinant la lumière à 45° en faisceau rasant sur fond sombre, chaque micro-fibre projette une ombre portée nette et diffuse la lumière, devenant visible comme une étoile dans la nuit !",
    trapAlert: "Utiliser une bombe d'air comprimé industrielle (projette des micro-gouttelettes d'huile propulseur) ou un chiffon synthétique (crée de l'électricité statique attirant les particules)."
  },
  {
    id: 4,
    badge: "Habillage & Étanchéité",
    title: "Préparation de la Boîte, de la Glace & des Joints",
    summary: "La carrure doit être nettoyée aux ultrasons, séchée à l'étuve à 60°C et débarrassée de tout résidu de pâte à polir. Les joints sont les gardiens de la montre : leur manipulation et lubrification répondent à des règles suisses inflexibles.",
    tools: ["Boîte à graisse silicone Bergeon 7007", "Graisse Fomblin UT18", "Potence à chasser les verres", "Tasseaux adaptés au profil de glace"],
    torques: "Friction contrôlée",
    standard: "ISO 22810 & NIHS 92-20",
    masterTip: "Avant d'insérer le mouvement, placez la carrure vide sous la lumière rasante pour inspecter la face intérieure de la glace. Une trace de doigt ou un dépôt gras laissé par une brucelle métallique ne pourra plus être nettoyé une fois le mouvement en place sans redémonter tout l'ensemble !",
    trapAlert: "Graisser le joint de glace Hytrel / Téflon : le joint de glace se monte STRICTEMENT À SEC ! L'adjonction de graisse détruit la friction d'emmanchement et la glace saute sous la pression de l'eau !"
  },
  {
    id: 5,
    badge: "Assemblage Carrure",
    title: "Emboîtage du Mouvement, Cercle & Brides de Fixation",
    summary: "Le calibre équipé de son cadran et de ses aiguilles est déposé dans la carrure sur un porte-pièce d'emboîtage évidé (pour ne jamais appuyer sur le balancier ou les aiguilles). Il est ensuite verrouillé à l'aide de brides de boîte (casing clamps) vissées dans la gorge de carrure.",
    tools: ["Porte-pièce d'emboîtage Delrin évidé", "Tournevis 30081 (1.20 mm)", "Pâte Rodico pour préhension de vis"],
    torques: "1.8 à 2.2 cNm (Serrage en croix)",
    standard: "Directives ETA / Valjoux",
    masterTip: "Les vis de boîte sont microscopiques : déposez une tête d'épingle de Rodico frais sur la panne de votre tournevis. La vis y adhère parfaitement, vous permettant de la guider dans le trou taraudé de la platine sans risque de la faire tomber dans le balancier-spiral.",
    trapAlert: "Serrer une bride à fond sans approcher la seconde : le calibre se met en biais par rapport au tube de carrure, ce qui fait frotter la tige de remontoir dans le tube et fausse le remontage."
  },
  {
    id: 6,
    badge: "Cote Fondamentale",
    title: "Découpe Micrométrique de la Tige de Remontoir & Loctite 222",
    summary: "La tige de remontoir brute fournie par la manufacture est toujours trop longue. Elle doit être tronquée au centième de millimètre près. C'est l'un des exercices les plus sélectifs de l'examen suisse : une tige trop courte est bonne pour la poubelle, une tige trop longue ruine l'étanchéité !",
    tools: ["Pied à coulisse digital au 1/100e", "Pince coupante au carbure de tungstène", "Pierre d'Arkansas pour chanfrein 45°", "Loctite 222 (violette démontable)"],
    torques: "Formule : X = A - B (Jeu : 0.20 mm)",
    standard: "Norme Métrologique NIHS",
    masterTip: "Après découpe à la pince carbure, ébavurez impérativement l'amorce de filet sur une pierre d'Arkansas en faisant tourner la tige à 45°. Si le filet n'est pas chanfreiné, il refoule le taraudage de la couronne au vissage !",
    trapAlert: "Utiliser de la Loctite 270 (verte) ou Loctite 243 (bleue) : elles soudent la tige dans la couronne et rendent tout démontage futur impossible sans casser la tige nette !"
  },
  {
    id: 7,
    badge: "Contrôle Métrologique Final",
    title: "Contrôle d'Étanchéité selon Normes NIHS 92-20 & ISO 22810",
    summary: "Une montre emboîtée ne quitte jamais l'établi sans un test de résistance à l'eau officiel. L'appareil de référence (Witschi Proofmaster) mesure la déformation élastique de la carrure sous vide (-0.5 bar) et sous surpression (+2 à +10 bar).",
    tools: ["Chrono-comparateur d'étanchéité Witschi Proofmaster", "Plaque chauffante thermostatée à 40°C - 45°C", "Compte-gouttes d'eau froide à 18°C"],
    torques: "Cycles -0.5 bar / +5.0 bar",
    standard: "NIHS 92-20 & ISO 22810",
    masterTip: "Commencez TOUJOURS par le test sous dépression (vide -0.5 bar). Si la boîte fuit, la dépression écarte légèrement le joint sans aucun danger pour le calibre, alertant immédiatement l'appareil sans introduire d'humidité.",
    trapAlert: "Omettre le test de condensation thermique : une montre peut passer le test de pression d'air tout en contenant de l'air humide emprisonné lors de l'emboîtage qui embuera au moindre froid !"
  }
];

// =========================================================================
// 3. CRITÈRES DE LA GRILLE OFFICIELLE D'ÉVALUATION AFP / CFC
// =========================================================================

interface ExamCriterion {
  id: number;
  label: string;
  points: number;
  isEliminatory?: boolean;
  desc: string;
}

const EXAM_CRITERIA: ExamCriterion[] = [
  { id: 1, label: "1. Propreté cadran & saphir (Zéro poussière, zéro trace)", points: 4, isEliminatory: true, desc: "Inspection sous lumière rasante 45° et loupe 2.5x. Critère éliminatoire direct." },
  { id: 2, label: "2. Parallélisme des aiguilles sur 12 heures", points: 4, desc: "Tolérance ±0.05 mm, absence totale de cambrage vicieux ou de plongeon." },
  { id: 3, label: "3. Synchronisation du saut de date à 00:00", points: 3, desc: "Tolérance helvétique : saut franc entre 23h55 et 00:05." },
  { id: 4, label: "4. Gardes d'aiguilles G1, G2, G3, G4 conformes NIHS 91-10", points: 4, desc: "G1 ≥ 0.20 mm, G2 ≥ 0.15 mm, G3 ≥ 0.15 mm, G4 ≥ 0.25 mm." },
  { id: 5, label: "5. Cadrage & centrage dans la lunette", points: 2, desc: "Pieds serrés sans déformation (couple 1.2 cNm), concentricité parfaite avec le réhaut." },
  { id: 6, label: "6. Brides d'emboîtage & centrage mouvement", points: 2, desc: "Serrage en croix (2.0 cNm), aucune bavure sur les têtes de vis bleuies." },
  { id: 7, label: "7. Coupe de tige & fonctionnement couronne", points: 4, desc: "Jeu sous couronne ≤ 0.05 mm, chanfrein Arkansas 45°, Loctite 222 violette." },
  { id: 8, label: "8. Graissage & intégrité des joints", points: 3, desc: "Joint de glace Hytrel monté à sec, joint de fond siliconé au Fomblin UT18 sans pincement." },
  { id: 9, label: "9. Test étanchéité Proofmaster conforme (NIHS 92-20)", points: 2, desc: "Déformation stable sous vide (-0.5 bar) et sous surpression (+5 bar)." },
  { id: 10, label: "10. Test de condensation négatif", points: 2, desc: "Plaque chauffante à 40°C puis goutte froide à 18°C. Aucune buée sur la face interne." }
];

// =========================================================================
// 4. COMPOSANT PRINCIPAL DE LA PAGE
// =========================================================================

export default function PosageEmboitagePage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"steps" | "stem" | "dust" | "clearance" | "exam">("steps");

  // State: Stem Cutting Simulator
  const [overhangA, setOverhangA] = useState<number>(4.50);
  const [threadDepthB, setThreadDepthB] = useState<number>(2.20);
  const [actualCut, setActualCut] = useState<number>(2.30);

  // Derived values for Stem simulator
  const idealCut = Math.max(0.20, overhangA - threadDepthB);
  const deltaStem = actualCut - idealCut;
  const crownGap = deltaStem < -0.10 ? Math.abs(deltaStem) : 0.00;
  const jointComp = deltaStem < -0.10 ? Math.max(0, Math.round(25 - crownGap * 50)) : deltaStem > 0.15 ? 0 : 25;

  // Sound synthesis for stem cutting
  const playCutSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio fallback silent
    }
  }, []);

  // State: Dust Inspector Simulator
  const [dustLight, setDustLight] = useState<"zenithal" | "grazing">("zenithal");
  const [dustTool, setDustTool] = useState<"blower" | "rodico">("blower");
  const [cleanedDusts, setCleanedDusts] = useState<number[]>([]);

  const toggleDustClean = (id: number) => {
    if (dustLight !== "grazing") {
      alert("Allumez d'abord la lumière rasante 45° pour repérer précisément la particule !");
      return;
    }
    if (!cleanedDusts.includes(id)) {
      setCleanedDusts(prev => [...prev, id]);
    }
  };

  const resetDustSim = () => {
    setCleanedDusts([]);
  };

  // State: Hand Clearances Inspector
  const [g1Val, setG1Val] = useState<number>(0.22);
  const [g2Val, setG2Val] = useState<number>(0.18);
  const [g3Val, setG3Val] = useState<number>(0.18);
  const [isRotating12h, setIsRotating12h] = useState<boolean>(false);

  const trigger12hRotation = () => {
    setIsRotating12h(true);
    setTimeout(() => setIsRotating12h(false), 800);
  };

  // State: Official AFP/CFC Examination Grid
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>([
    true, true, true, true, true, true, true, true, true, true
  ]);

  const toggleCriterion = (idx: number) => {
    setCheckedCriteria(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const selectAllExam = (val: boolean) => {
    setCheckedCriteria(new Array(EXAM_CRITERIA.length).fill(val));
  };

  // Calculation of Swiss exam grade (scale 1.0 to 6.0)
  const totalScore = EXAM_CRITERIA.reduce((acc, crit, idx) => {
    return checkedCriteria[idx] ? acc + crit.points : acc;
  }, 0);
  const swissGrade = (1.0 + (totalScore / 30.0) * 5.0).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-white">

      {/* ==================== BREADCRUMB & TOP HEADER ==================== */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            <Link
              href="/pratique"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour Pratique</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  MODULE OFFICIEL AFP & CFC
                </span>
                <span className="hidden md:inline-block text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  Normes NIHS 91-10 & 92-20
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Posages & Emboîtages d'Atelier
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 hidden sm:inline">· Par l'Artisan Horloger</span>
              </h1>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center space-x-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab("steps")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "steps"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              7 Étapes
            </button>
            <button
              onClick={() => setActiveTab("stem")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "stem"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Coupe Tige
            </button>
            <button
              onClick={() => setActiveTab("dust")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition hidden sm:inline-block ${
                activeTab === "dust"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Chasse Poussière
            </button>
            <button
              onClick={() => setActiveTab("clearance")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition hidden md:inline-block ${
                activeTab === "clearance"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Gardes NIHS
            </button>
            <button
              onClick={() => setActiveTab("exam")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "exam"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              }`}
            >
              Grille CFC
            </button>
          </div>

        </div>
      </header>

      {/* ==================== HERO MASTERCLASS BANNER ==================== */}
      <section className="py-10 sm:py-14 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0c121e] dark:via-[#080d16] dark:to-[#070b12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>FORMATION OFFICIELLE HORLOGER PRATICIEN AFP & CFC</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                L'Artisanat de l'Emboîtage : <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300">
                  L'Union du Mouvement & de sa Boîte
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                L'emboîtage est l'étape sacrée où des dizaines d'heures de réglage chronométrique se concrétisent.
                Une poussière invisible sous la lumière zénithale, un centième de trop sur la tige, un frottement 
                d'aiguille ou un joint mal lubrifié anéantissent la montre. Découvrez les règles officielles suisses.
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-mono text-slate-600 dark:text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                  📐 <strong>Gardes :</strong> G1 à G4 (NIHS 91-10)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                  🔬 <strong>Inspection :</strong> Faisceau 45° rasant
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                  💧 <strong>Étanchéité :</strong> Proofmaster NIHS 92-20
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                  🔩 <strong>Couples :</strong> 1.2 à 2.2 cNm
                </span>
              </div>
            </div>

            {/* Right Blueprint Preview */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3 text-xs font-mono">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-500" />
                  COUPE TECHNIQUE D'EMBOÎTAGE
                </span>
                <span className="text-amber-500 font-semibold">Vue 10x</span>
              </div>
              <div className="overflow-hidden rounded-xl bg-slate-950 p-1">
                <CaseAssemblySVG />
              </div>
              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2 font-mono">
                Coupe transversale : Glace saphir, joint Hytrel, cercle, brides, tube & couronne.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== CONTENT ROUTER ACCORDING TO ACTIVE TAB ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* -------------------- VIEW 1: THE 7 STEPS -------------------- */}
        {activeTab === "steps" && (
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                MÉTHODOLOGIE OFFICIELLE D'ÉTABLI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Les 7 Gestes Sacramentels de l'Emboîteur
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Sélectionnez une étape ci-dessous pour découvrir son schéma technique vectoriel, ses tolérances suisses et les astuces du maître.
              </p>
            </div>

            {/* Stepper buttons */}
            <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
              {STEPS_DATA.map(st => (
                <button
                  key={st.id}
                  onClick={() => setActiveStep(st.id)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition ${
                    activeStep === st.id
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  0{st.id}. {st.title.split(" ")[0]} {st.title.split(" ")[1] || ""}
                </button>
              ))}
            </div>

            {/* Active Step Detailed Card */}
            {(() => {
              const current = STEPS_DATA.find(s => s.id === activeStep) || STEPS_DATA[0];
              return (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Text Description & Master Tips */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center space-x-3">
                        <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-mono font-bold text-base">
                          0{current.id}
                        </span>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                            {current.badge} · {current.standard}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {current.summary}
                      </p>

                      {/* Tooling and Torque specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-500 dark:text-slate-400 block mb-1 font-bold">🛠️ Outillage Recommandé :</span>
                          <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-200">
                            {current.tools.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-500 dark:text-slate-400 block mb-1 font-bold">⚖️ Couple & Norme :</span>
                          <div className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                            {current.torques}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                            Référence officielle : {current.standard}
                          </div>
                        </div>
                      </div>

                      {/* Master Tip */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
                        <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>L'Astuce Secrète du Maître d'Établi</span>
                        </div>
                        <p className="leading-relaxed">
                          {current.masterTip}
                        </p>
                      </div>

                      {/* Trap Alert */}
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-200 text-xs sm:text-sm space-y-1">
                        <div className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span>Le Piège Éliminatoire AFP / CFC</span>
                        </div>
                        <p className="leading-relaxed">
                          {current.trapAlert}
                        </p>
                      </div>

                    </div>

                    {/* Technical SVG Blueprint */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                        <span>PLAN TECHNIQUE VECTORIEL 0{current.id}</span>
                        <span className="text-amber-400 font-bold">{current.standard}</span>
                      </div>
                      
                      <div className="overflow-hidden rounded-xl">
                        {current.id === 1 && <DialFeetSVG />}
                        {current.id === 2 && <HandsClearanceSVG />}
                        {current.id === 3 && (
                          <div className="space-y-3">
                            <DialProtectionSVG />
                            <p className="text-[11px] font-mono text-slate-400 text-center">
                              Film protecteur Mylar Bergeon 6938 & Tasseaux Delrin à chasser.
                            </p>
                          </div>
                        )}
                        {current.id === 4 && <GasketsCasingSVG />}
                        {current.id === 5 && <CaseAssemblySVG />}
                        {current.id === 6 && <StemCuttingSVG />}
                        {current.id === 7 && <WaterproofTestingSVG />}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* -------------------- VIEW 2: STEM CUTTING SIMULATOR -------------------- */}
        {activeTab === "stem" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-bold">
                  SIMULATEUR INTERACTIF 01
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Calculateur & Découpe Micrométrique de la Tige de Remontoir
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Formule sacrée de l'établi : <code>X_coupe = A - B</code> (avec 25% de compression du joint torique).
                </p>
              </div>

              <button
                onClick={() => {
                  setOverhangA(4.50);
                  setThreadDepthB(2.20);
                  setActualCut(2.30);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold hover:text-amber-500 transition border border-slate-200 dark:border-slate-700 flex items-center gap-2 self-start md:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser Cotes Étalon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Overhang A */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Dépassement de tige brute à vide (Cote A) :</span>
                    <span className="text-amber-500 font-bold">{overhangA.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="2.00"
                    max="7.00"
                    step="0.05"
                    value={overhangA}
                    onChange={e => setOverhangA(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>2.00 mm (Boîte extra-plate)</span>
                    <span>4.50 mm (Standard)</span>
                    <span>7.00 mm (Boîte plongeuse)</span>
                  </div>
                </div>

                {/* Thread depth B */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Profondeur de taraudage couronne (Cote B) :</span>
                    <span className="text-sky-500 font-bold">{threadDepthB.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="1.00"
                    max="4.00"
                    step="0.05"
                    value={threadDepthB}
                    onChange={e => setThreadDepthB(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>1.00 mm (Couronne fine)</span>
                    <span>2.20 mm (Standard)</span>
                    <span>4.00 mm (Couronne vissée)</span>
                  </div>
                </div>

                {/* Actual Cut X */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Longueur tronquée par l'horloger (Cote X coupée) :</span>
                    <span className="text-emerald-500 font-bold">{actualCut.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.50"
                    max="4.50"
                    step="0.05"
                    value={actualCut}
                    onChange={e => setActualCut(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>0.50 mm (Trop longue)</span>
                    <span className="text-amber-500 font-bold">Cote idéale théorique : {idealCut.toFixed(2)} mm</span>
                    <span>4.50 mm (Trop courte !)</span>
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Cote Idéale (X_opt)</div>
                    <div className="text-base font-mono font-bold text-amber-500">{idealCut.toFixed(2)} mm</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Écart mesuré (ΔL)</div>
                    <div className={`text-base font-mono font-bold ${Math.abs(deltaStem) <= 0.05 ? "text-emerald-500" : "text-red-500"}`}>
                      {(deltaStem >= 0 ? "+" : "") + deltaStem.toFixed(2)} mm
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Jeu sous couronne</div>
                    <div className="text-base font-mono font-bold text-slate-700 dark:text-slate-200">{crownGap.toFixed(2)} mm</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Compression Joint</div>
                    <div className="text-base font-mono font-bold text-emerald-500">{jointComp}%</div>
                  </div>
                </div>

                {/* Status Alert Banner */}
                {deltaStem < -0.10 ? (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300 text-xs sm:text-sm flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">TIGE TROP LONGUE (+{Math.abs(deltaStem).toFixed(2)} mm) : JOUR VISIBLE SOUS COURONNE</strong>
                      <span>La couronne ne plaque pas contre le tube. Le joint torique n'est pas comprimé : montre non étanche ! La tige pliera au premier choc.</span>
                    </div>
                  </div>
                ) : deltaStem > 0.15 ? (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300 text-xs sm:text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">TIGE TROP COURTE (-{deltaStem.toFixed(2)} mm) : DÉFAUT ÉLIMINATOIRE !</strong>
                      <span>La tige ne s'enclenche plus en position mise à l'heure ou fait sauter la bascule de tirette. La tige est gâchée, remplacement obligatoire !</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">AJUSTEMENT PARFAIT · NORMES SUISSES VALIDÉES</strong>
                      <span>La couronne plaque délicatement contre le tube avec une compression de joint de 25%. Le passage en position 1, 2 et remontage est fluide et franc.</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Dynamic Visual Diagram (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
                <div className="text-xs font-mono text-slate-400 mb-2 self-start flex justify-between w-full">
                  <span>VISUALISATION COUPE & TUBE EN DIRECT</span>
                  <span className={`font-bold ${Math.abs(deltaStem) <= 0.05 ? "text-emerald-400" : "text-red-400"}`}>
                    {Math.abs(deltaStem) <= 0.05 ? "CONFORME" : "HORS TOLÉRANCE"}
                  </span>
                </div>

                <svg viewBox="0 0 320 220" className="w-full h-auto rounded-xl bg-[#090d16]" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="40" height="180" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <text x="40" y="115" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 40 115)">CARRURE</text>

                  <rect x="60" y="85" width="75" height="50" fill="#475569" stroke="#64748b" strokeWidth="1.2" />
                  <rect x="60" y="97" width="75" height="26" fill="#090d16" />
                  <text x="97" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Tube de Carrure</text>

                  <rect x="35" y="105" width="135" height="10" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
                  <line x1="120" y1="102" x2="120" y2="118" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
                  <text x="120" y="132" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Ligne de Coupe</text>

                  {/* Crown Group moving dynamically */}
                  <g transform={`translate(${deltaStem < -0.10 ? Math.min(25, crownGap * 15) : deltaStem > 0.15 ? -6 : 0}, 0)`}>
                    <rect x="135" y="70" width="30" height="80" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1.2" />
                    <line x1="140" y1="72" x2="140" y2="148" stroke="#334155" strokeWidth="1" />
                    <line x1="146" y1="72" x2="146" y2="148" stroke="#334155" strokeWidth="1" />
                    <line x1="152" y1="72" x2="152" y2="148" stroke="#334155" strokeWidth="1" />
                    <line x1="158" y1="72" x2="158" y2="148" stroke="#334155" strokeWidth="1" />
                    <circle cx="132" cy="110" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
                    <text x="150" y="60" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Couronne</text>
                  </g>
                </svg>

                <button
                  onClick={playCutSound}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-mono text-xs font-semibold shadow-md transition flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Simuler Coupe au Carbure & Ébavurage</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 3: DUST INSPECTOR SIMULATOR -------------------- */}
        {activeTab === "dust" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-bold">
                  SIMULATEUR INTERACTIF 02
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Chasse à la Poussière en Lumière Rasante 45°
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  La lumière zénithale masque les impuretés par réflexion spéculaire. Inclinez le faisceau à 45° pour révéler les micro-particules.
                </p>
              </div>

              {/* Light beam mode switcher */}
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setDustLight("zenithal")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                    dustLight === "zenithal"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-amber-500"
                  }`}
                >
                  💡 Lumière Zénithale (90°)
                </button>
                <button
                  onClick={() => setDustLight("grazing")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition ${
                    dustLight === "grazing"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-amber-500"
                  }`}
                >
                  🔦 Lumière Rasante (45°)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Dial under inspection (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl relative flex flex-col items-center justify-center">
                <div className={`absolute top-4 left-4 text-xs font-mono px-2.5 py-1 rounded-md border ${
                  dustLight === "grazing"
                    ? "bg-amber-500 text-white font-bold shadow-lg border-amber-400"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                }`}>
                  {dustLight === "grazing" ? "ÉCLAIRAGE : RASANT 45° (RÉVÉLATION PARTICULES)" : "ÉCLAIRAGE : ZÉNITHAL 90° (RÉFLEXION DIRECTE)"}
                </div>

                <svg viewBox="0 0 360 360" className="w-full max-w-[340px] h-auto my-4" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="180" cy="180" r="170" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                  <circle cx="180" cy="180" r="150" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" opacity="0.95" />

                  {/* Indices */}
                  <rect x="175" y="42" width="4" height="18" rx="1" fill="#fbbf24" />
                  <rect x="181" y="42" width="4" height="18" rx="1" fill="#fbbf24" />
                  <rect x="268" y="172" width="22" height="16" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                  <text x="279" y="184" fill="#0f172a" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">25</text>
                  <rect x="178" y="300" width="4" height="18" rx="1" fill="#fbbf24" />
                  <rect x="42" y="178" width="18" height="4" rx="1" fill="#fbbf24" />

                  <circle cx="180" cy="180" r="135" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="2,6" />

                  {/* Hands */}
                  <line x1="180" y1="180" x2="115" y2="115" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                  <line x1="180" y1="180" x2="250" y2="110" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="180" y1="180" x2="180" y2="280" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="180" cy="180" r="5" fill="#ca8a04" />

                  {/* 5 Clickable Dust Particles */}
                  {!cleanedDusts.includes(1) && (
                    <g onClick={() => toggleDustClean(1)} className="cursor-pointer" opacity={dustLight === "grazing" ? 1 : 0.06}>
                      <path d="M125,75 Q130,85 120,95 Q115,100 128,105" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="125" cy="90" r="14" fill="#f59e0b" fillOpacity="0.2" />
                    </g>
                  )}

                  {!cleanedDusts.includes(2) && (
                    <g onClick={() => toggleDustClean(2)} className="cursor-pointer" opacity={dustLight === "grazing" ? 1 : 0.05}>
                      <circle cx="265" cy="225" r="3.5" fill="#facc15" />
                      <circle cx="265" cy="225" r="12" fill="#facc15" fillOpacity="0.2" />
                    </g>
                  )}

                  {!cleanedDusts.includes(3) && (
                    <g onClick={() => toggleDustClean(3)} className="cursor-pointer" opacity={dustLight === "grazing" ? 1 : 0.04}>
                      <ellipse cx="250" cy="165" rx="9" ry="5" fill="#38bdf8" />
                      <circle cx="250" cy="165" r="14" fill="#38bdf8" fillOpacity="0.2" />
                    </g>
                  )}

                  {!cleanedDusts.includes(4) && (
                    <g onClick={() => toggleDustClean(4)} className="cursor-pointer" opacity={dustLight === "grazing" ? 1 : 0.06}>
                      <polygon points="100,240 106,242 102,248" fill="#fb7185" />
                      <circle cx="103" cy="244" r="12" fill="#fb7185" fillOpacity="0.2" />
                    </g>
                  )}

                  {!cleanedDusts.includes(5) && (
                    <g onClick={() => toggleDustClean(5)} className="cursor-pointer" opacity={dustLight === "grazing" ? 1 : 0.05}>
                      <path d="M172,170 Q165,160 178,155" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="172" cy="162" r="12" fill="#f59e0b" fillOpacity="0.2" />
                    </g>
                  )}
                </svg>

                <p className="text-xs font-mono text-slate-400 text-center">
                  {dustLight === "grazing"
                    ? "🔦 Lumière rasante active ! Cliquez sur chaque impureté fluorescente pour l'éliminer."
                    : "En lumière zénithale, le cadran paraît propre. Activez la lumière rasante pour révéler les micro-défauts."}
                </p>
              </div>

              {/* Tools & Cleanliness Gauge (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Pureté Optique du Cadran
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-amber-500">
                    {cleanedDusts.length} / 5 Retirées
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${cleanedDusts.length * 20}%` }}
                    />
                  </div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {cleanedDusts.length === 5
                      ? "✨ PURETÉ ABSOLUE 100% (ZÉRO DÉFAUT GLACE)"
                      : `${5 - cleanedDusts.length} particule(s) restante(s) sur le cadran.`}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                    Sélectionnez votre Outil d'Établi :
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <button
                      onClick={() => setDustTool("blower")}
                      className={`p-3 rounded-xl font-bold border transition flex items-center justify-center gap-2 ${
                        dustTool === "blower"
                          ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span>💨</span>
                      <span>Poire Filtrée</span>
                    </button>
                    <button
                      onClick={() => setDustTool("rodico")}
                      className={`p-3 rounded-xl font-bold border transition flex items-center justify-center gap-2 ${
                        dustTool === "rodico"
                          ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span>🟢</span>
                      <span>Rodico Frais</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={resetDustSim}
                  className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-semibold transition"
                >
                  🔁 Réinitialiser l'Inspection Poussière
                </button>

              </div>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 4: HAND CLEARANCES INSPECTOR -------------------- */}
        {activeTab === "clearance" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-bold">
                  SIMULATEUR INTERACTIF 03
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Contrôleur de Gardes d'Aiguillage NIHS 91-10
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Garantir le jeu fonctionnel micrométrique entre le cadran, les aiguilles et la glace saphir.
                </p>
              </div>

              <button
                onClick={trigger12hRotation}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-mono text-xs font-bold shadow-md hover:from-amber-600 hover:to-amber-700 transition flex items-center gap-2 self-start md:self-auto"
              >
                <Clock className="w-4 h-4" />
                <span>Simuler Tour 12 Heures</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Hands Cross Section View (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
                <div className="flex justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <span>COUPE TRANSVERSALE DYNAMIQUE DES CANONS</span>
                  <span className={`font-bold ${g1Val >= 0.18 && g2Val >= 0.14 ? "text-emerald-400" : "text-red-400"}`}>
                    {g1Val >= 0.18 && g2Val >= 0.14 ? "AUCUNE COLLISION" : "INTERFÉRENCE DÉTECTÉE"}
                  </span>
                </div>

                <svg viewBox="0 0 450 200" className="w-full h-auto bg-[#070b14] rounded-xl" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30,30 Q225,15 420,30 L420,40 Q225,25 30,40 Z" fill="#38bdf8" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1" />
                  <text x="350" y="24" fill="#38bdf8" fontSize="9" fontFamily="monospace">Glace Saphir</text>

                  <rect x="50" y="45" width="20" height="135" fill="#334155" stroke="#64748b" strokeWidth="1" />
                  <rect x="58" y="45" width="4" height="135" fill="#38bdf8" />

                  <rect x="30" y="170" width="390" height="10" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <rect x="330" y="152" width="25" height="18" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
                  <text x="342" y="146" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">Index 12h</text>

                  {/* Hour Hand */}
                  <g transform={`translate(0, ${170 - g1Val * 150 - 135})`}>
                    <rect x="68" y="135" width="220" height="8" rx="2" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                    <circle cx="68" cy="139" r="6" fill="#eab308" />
                    <text x="295" y="141" fill="#facc15" fontSize="8" fontFamily="monospace">Heures</text>
                  </g>

                  {/* Minute Hand */}
                  <g transform={`translate(0, ${170 - g1Val * 150 - g2Val * 150 - 100})`}>
                    <rect x="68" y="100" width="280" height="7" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
                    <circle cx="68" cy="103" r="5" fill="#f8fafc" />
                    <text x="355" y="105" fill="#e2e8f0" fontSize="8" fontFamily="monospace">Minutes</text>
                  </g>

                  {/* Seconds Hand */}
                  <g transform={`translate(${isRotating12h ? 12 : 0}, ${170 - g1Val * 150 - g2Val * 150 - g3Val * 150 - 65})`} className="transition-transform duration-500">
                    <rect x="60" y="65" width="330" height="3.5" rx="1" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5" />
                    <circle cx="68" cy="67" r="3.5" fill="#0284c7" />
                    <text x="400" y="69" fill="#38bdf8" fontSize="8" fontFamily="monospace">Secondes</text>
                  </g>
                </svg>
              </div>

              {/* Sliders & Alerts (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">Garde G1 (Cadran ↔ Heures) :</span>
                    <span className="text-amber-500 font-bold">{g1Val.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.45"
                    step="0.01"
                    value={g1Val}
                    onChange={e => setG1Val(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">Garde G2 (Heures ↔ Minutes) :</span>
                    <span className="text-sky-500 font-bold">{g2Val.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.01"
                    value={g2Val}
                    onChange={e => setG2Val(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">Garde G3 (Minutes ↔ Trotteuse) :</span>
                    <span className="text-emerald-500 font-bold">{g3Val.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.01"
                    value={g3Val}
                    onChange={e => setG3Val(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {g1Val < 0.18 ? (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300 text-xs">
                    <strong className="block font-bold">⛔ FROTTEMENT G1 DÉTECTÉ :</strong>
                    L'aiguille des heures frotte les index en relief du cadran à 12h ou 6h. Relevez l'aiguille des heures au chasse-aiguilles.
                  </div>
                ) : g2Val < 0.14 ? (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300 text-xs">
                    <strong className="block font-bold">⛔ COLLISION G2 DÉTECTÉE :</strong>
                    Les deux aiguilles principales se touchent lors de la superposition à 12h00 ! Baisse d'amplitude et arrêt de montre garantis.
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs">
                    <strong className="block font-bold">✅ GARDES NIHS CONFORMES :</strong>
                    Toutes les distances de sécurité respectent la norme suisse NIHS 91-10. Aucun risque de rayure ni de blocage d'amplitude.
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 5: OFFICIAL AFP / CFC EXAMINATION GRID -------------------- */}
        {activeTab === "exam" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Checklist Table (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Grille Officielle d'Évaluation AFP / CFC
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    10 critères d'atelier notés sur 30 points (seuil minimal d'obtention du diplôme : 20 pts / note 4.0).
                  </p>
                </div>
                <button
                  onClick={() => selectAllExam(true)}
                  className="text-xs font-mono text-amber-500 hover:underline"
                >
                  Tout Valider
                </button>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm">
                {EXAM_CRITERIA.map((crit, idx) => (
                  <label
                    key={crit.id}
                    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
                  >
                    <input
                      type="checkbox"
                      checked={checkedCriteria[idx]}
                      onChange={() => toggleCriterion(idx)}
                      className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100">
                        <span>{crit.label}</span>
                        <span className="text-amber-500 font-mono">{crit.points} pts</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        {crit.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Verdict Card (4 cols) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-[#0c121e] rounded-3xl border border-slate-800 p-6 sm:p-8 text-white shadow-2xl space-y-6 sticky top-28">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                  VERDICT D'EXAMEN SUISSE
                </span>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 font-mono my-2">
                  {swissGrade}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Note Helvétique (Échelle 1.0 à 6.0)
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Points Obtenus :</span>
                  <span className="font-bold text-amber-400 text-sm">{totalScore} / 30 pts</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Seuil Réussite :</span>
                  <span className="font-bold text-slate-200">20 pts (Note 4.0)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Mention :</span>
                  <span className={`font-bold ${
                    parseFloat(swissGrade) >= 5.5
                      ? "text-emerald-400"
                      : parseFloat(swissGrade) >= 4.5
                      ? "text-sky-400"
                      : parseFloat(swissGrade) >= 4.0
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}>
                    {parseFloat(swissGrade) >= 5.5
                      ? "Très Bien (Excellence)"
                      : parseFloat(swissGrade) >= 4.5
                      ? "Bien (Compétence Validée)"
                      : parseFloat(swissGrade) >= 4.0
                      ? "Suffisant (Seuil Réussite)"
                      : "Insuffisant (Échec Examen)"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans text-center space-y-1">
                <div className="font-bold text-sm">🇨🇭 CERTIFICATION D'ATELIER VALIDÉE</div>
                <p className="text-slate-400 text-[11px]">
                  L'élève maîtrise l'ensemble de la chaîne d'habillage horloger selon les directives fédérales AFP / CFC.
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ==================== BENCH TOOLS & CHEMICAL FASTENERS LEXICON ==================== */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              PRODUITS OFFICIELS D'ÉTABLI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Le Kit Chimique & Outillage de l'Emboîteur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold text-xs">
                LOCTITE 222
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Frein-Filet Faible (Violet)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Exclusivement pour la tige dans la couronne. Démontage facile à froid sans chalumeau.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                FOMBLIN UT18
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Graisse Perfluorée</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Joints toriques de fond vissé et de tube de couronne. Inerte chimiquement, ne sèche jamais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
                MOEBIUS 9504
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Graisse Contact Métal</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Gorge de tirette, encoches de tige et dents de pignon coulant lors du remontage final.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs">
                BERGEON 6938
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Protecteur de Cadran</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Feuille Mylar ultra-fine intercalée sous les aiguilles pour éliminer tout risque de rayure.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
