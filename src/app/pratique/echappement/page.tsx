"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Droplet,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

function AnatomySVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 320" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rubyJewel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ff4d6d"/>
      <stop offset="50%" stopColor="#c9184a"/>
      <stop offset="100%" stopColor="#590d22"/>
    </linearGradient>
    <linearGradient id="steelArm" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#cbd5e1"/>
      <stop offset="50%" stopColor="#64748b"/>
      <stop offset="100%" stopColor="#334155"/>
    </linearGradient>
    <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#fef08a"/>
      <stop offset="50%" stopColor="#eab308"/>
      <stop offset="100%" stopColor="#ca8a04"/>
    </linearGradient>
    <radialGradient id="centerArbor" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#e2e8f0"/>
      <stop offset="100%" stopColor="#475569"/>
    </radialGradient>
  </defs>
  <rect width="520" height="320" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g opacity="0.10">
    <path d="M0,40 H520 M0,80 H520 M0,120 H520 M0,160 H520 M0,200 H520 M0,240 H520 M0,280 H520" stroke="#94a3b8" strokeDasharray="2,4"/>
    <path d="M40,0 V320 M80,0 V320 M120,0 V320 M160,0 V320 M200,0 V320 M240,0 V320 M280,0 V320 M320,0 V320 M360,0 V320 M400,0 V320 M440,0 V320 M480,0 V320" stroke="#94a3b8" strokeDasharray="2,4"/>
  </g>
  <line x1="80" y1="160" x2="440" y2="160" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" opacity="0.5"/>
  <text x="260" y="22" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">LIGNE DES CENTRES THÉORIQUE (Roue d’Ancre ↔ Ancre ↔ Balancier)</text>
  <g transform="translate(90, 160)">
    <circle cx="0" cy="0" r="65" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2,4" opacity="0.4"/>
    <circle cx="0" cy="0" r="16" fill="url(#goldBrass)" stroke="#b45309" strokeWidth="1"/>
    <circle cx="0" cy="0" r="5" fill="#1e293b"/>
    <path d="M45,-25 L65,-30 L60,-15 L52,-18 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M55,5 L72,8 L64,22 L56,17 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M30,45 L38,65 L22,62 L24,52 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M-10,55 L-18,72 L-30,62 L-24,54 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M-48,30 L-68,34 L-64,18 L-54,22 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M-55,-10 L-72,-16 L-62,-30 L-54,-22 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M-28,-48 L-34,-68 L-18,-64 L-22,-52 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <path d="M12,-55 L16,-72 L30,-62 L24,-52 Z" fill="url(#goldBrass)" stroke="#a16207" strokeWidth="0.8"/>
    <line x1="-50" y1="0" x2="50" y2="0" stroke="#ca8a04" strokeWidth="2.5"/>
    <line x1="0" y1="-50" x2="0" y2="50" stroke="#ca8a04" strokeWidth="2.5"/>
    <text x="0" y="88" fill="#eab308" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Roue d’Ancre (15 dents)</text>
    <text x="0" y="100" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Profil Club Swiss NIHS</text>
  </g>
  <g transform="translate(250, 160)">
    <rect x="-4" y="-35" width="8" height="70" rx="3" fill="url(#steelArm)" stroke="#1e293b" strokeWidth="1"/>
    <path d="M0,-20 L-60,-40 L-65,-25 L-10,-10 Z" fill="url(#steelArm)" stroke="#334155" strokeWidth="0.8"/>
    <path d="M0,20 L-55,42 L-60,28 L-10,10 Z" fill="url(#steelArm)" stroke="#334155" strokeWidth="0.8"/>
    <path d="M4,-6 L55,-18 L58,-10 L16,0 L58,10 L55,18 L4,6 Z" fill="url(#steelArm)" stroke="#334155" strokeWidth="1"/>
    <text x="45" y="-22" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Corne</text>
    <text x="45" y="28" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Corne</text>
    <rect x="14" y="-2" width="46" height="4" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
    <polygon points="60,-3 65,0 60,3" fill="#f59e0b"/>
    <text x="52" y="-6" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">Dard</text>
    <circle cx="0" cy="0" r="7" fill="url(#centerArbor)" stroke="#1e293b" strokeWidth="1"/>
    <circle cx="0" cy="0" r="2.5" fill="#0f172a"/>
    <g transform="translate(-72, -42) rotate(15)">
      <polygon points="0,0 22,-4 26,10 4,14" fill="url(#rubyJewel)" stroke="#ffe4e6" strokeWidth="0.8"/>
      <text x="-10" y="-8" fill="#ff4d6d" fontSize="9" fontFamily="monospace" fontWeight="bold">Levée Entrée</text>
    </g>
    <g transform="translate(-68, 28) rotate(-15)">
      <polygon points="0,0 24,4 20,18 -4,14" fill="url(#rubyJewel)" stroke="#ffe4e6" strokeWidth="0.8"/>
      <text x="-10" y="30" fill="#ff4d6d" fontSize="9" fontFamily="monospace" fontWeight="bold">Levée Sortie</text>
    </g>
    <circle cx="20" cy="-45" r="5" fill="#94a3b8" stroke="#475569" strokeWidth="1"/>
    <text x="32" y="-42" fill="#94a3b8" fontSize="8" fontFamily="monospace">Touche Sup.</text>
    <circle cx="20" cy="45" r="5" fill="#94a3b8" stroke="#475569" strokeWidth="1"/>
    <text x="32" y="48" fill="#94a3b8" fontSize="8" fontFamily="monospace">Touche Inf.</text>
    <text x="0" y="88" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Ancre Suisse</text>
    <text x="0" y="100" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Tirage 12° à 15°</text>
  </g>
  <g transform="translate(420, 160)">
    <circle cx="0" cy="0" r="42" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" opacity="0.8"/>
    <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#475569" strokeWidth="1.2"/>
    <path d="M-22,0 A22,22 0 0,1 -12,-18 L-5,-10 A12,12 0 0,0 -5,10 L-12,18 Z" fill="#070a10" stroke="#f59e0b" strokeWidth="1"/>
    <circle cx="0" cy="0" r="7" fill="url(#centerArbor)" stroke="#1e293b" strokeWidth="1"/>
    <circle cx="0" cy="0" r="2.5" fill="#0f172a"/>
    <g transform="translate(-32, 0)">
      <path d="M-3,-7 L3,-7 A6,6 0 0,1 3,7 L-3,7 Z" fill="url(#rubyJewel)" stroke="#ffe4e6" strokeWidth="0.8"/>
      <text x="-4" y="-12" fill="#ff4d6d" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Cheville (Ellipse)</text>
    </g>
    <text x="0" y="88" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Double Plateau</text>
    <text x="0" y="100" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Garde au Dard</text>
  </g>
  <rect x="25" y="278" width="470" height="28" rx="6" fill="#111827" stroke="#374151" strokeWidth="0.8"/>
  <text x="260" y="296" fill="#facc15" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">⚙️ TRINITÉ DE L’ÉCHAPPEMENT : 1. Dégagement (Cheville) → 2. Impulsion (Dent/Levée) → 3. Chute & Repos</text>
</svg>
  );
}

function CycleSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 260" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
  </defs>
  <defs>
    <linearGradient id="rubyJewel2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ff4d6d"/>
      <stop offset="100%" stopColor="#881337"/>
    </linearGradient>
  </defs>
  <rect width="520" height="260" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g transform="translate(15, 20)">
    <rect x="0" y="0" width="155" height="215" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <g>
      <rect x="10" y="10" width="135" height="22" rx="4" fill="#1e293b"/>
      <text x="77" y="25" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">1. DÉGAGEMENT</text>
      <circle cx="77" cy="65" r="28" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2,2"/>
      <path d="M72,110 L72,90 L62,82 L82,82 L72,90" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
      <ellipse cx="72" cy="80" rx="4" ry="6" fill="url(#rubyJewel2)"/>
      <path d="M60,65 Q77,60 88,68" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <text x="77" y="130" fill="#e2e8f0" fontSize="9" fontFamily="monospace" textAnchor="middle">Vaincre le Tirage</text>
      <text x="77" y="145" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">La cheville pénètre</text>
      <text x="77" y="157" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">dans l’encoche fourchette</text>
      <text x="77" y="170" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">et dégage la levée.</text>
      <rect x="10" y="182" width="135" height="22" rx="3" fill="#1e293b"/>
      <text x="77" y="196" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Angle : 1° à 2° (Repos)</text>
    </g>
  </g>
  <g transform="translate(182, 20)">
    <rect x="0" y="0" width="155" height="215" rx="8" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.2"/>
    <rect x="10" y="10" width="135" height="22" rx="4" fill="#78350f" opacity="0.4"/>
    <text x="77" y="25" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">2. IMPULSION (CHOC)</text>
    <path d="M40,95 L65,75 L80,82 L55,102 Z" fill="#eab308" stroke="#a16207" strokeWidth="1"/>
    <polygon points="68,60 92,72 82,90 58,78" fill="url(#rubyJewel2)" stroke="#ffe4e6" strokeWidth="1"/>
    <line x1="60" y1="90" x2="85" y2="72" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr)"/>
    <text x="77" y="130" fill="#facc15" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Transfert d’Énergie</text>
    <text x="77" y="145" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">La dent glisse sur le</text>
    <text x="77" y="157" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">plan d’impulsion du rubis.</text>
    <text x="77" y="170" fill="#34d399" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Moebius 9415 thixotrope</text>
    <rect x="10" y="182" width="135" height="22" rx="3" fill="#1e293b"/>
    <text x="77" y="196" fill="#facc15" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Angle Levée : 8° à 10°</text>
  </g>
  <g transform="translate(350, 20)">
    <rect x="0" y="0" width="155" height="215" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <rect x="10" y="10" width="135" height="22" rx="4" fill="#1e293b"/>
    <text x="77" y="25" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">3. CHUTE & REPOS</text>
    <path d="M45,90 L60,75 L75,80 L60,95 Z" fill="#eab308" opacity="0.6"/>
    <polygon points="65,60 85,62 82,80 62,78" fill="url(#rubyJewel2)"/>
    <circle cx="115" cy="85" r="6" fill="#94a3b8"/>
    <line x1="90" y1="85" x2="110" y2="85" stroke="#34d399" strokeWidth="1.5"/>
    <text x="77" y="130" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">Verrouillage Tirage</text>
    <text x="77" y="145" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">La dent suivante chute</text>
    <text x="77" y="157" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">sur le plan de repos.</text>
    <text x="77" y="170" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">L’ancre est plaquée à la butée.</text>
    <rect x="10" y="182" width="135" height="22" rx="3" fill="#1e293b"/>
    <text x="77" y="196" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Chute : 1.5° à 2.5°</text>
  </g>
  <text x="260" y="248" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">TOTAL ANGLE DE LEVÉE D’ÉCHAPPEMENT : 50° à 52° (ETA 2824 / ETA 6497)</text>
</svg>
  );
}

function TirageSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="secSteel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#cbd5e1"/>
      <stop offset="50%" stopColor="#64748b"/>
      <stop offset="100%" stopColor="#334155"/>
    </linearGradient>
    <linearGradient id="rubySec" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fb7185"/>
      <stop offset="60%" stopColor="#e11d48"/>
      <stop offset="100%" stopColor="#881337"/>
    </linearGradient>
    <marker id="arrGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#22c55e"/></marker>
  </defs>
  <rect width="520" height="280" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g transform="translate(25, 20)">
    <rect x="0" y="0" width="225" height="240" rx="8" fill="#0f172a" stroke="#ca8a04" strokeWidth="1"/>
    <text x="112" y="24" fill="#facc15" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">LE TIRAGE (12° à 15°)</text>
    <g transform="translate(112, 105)">
      <polygon points="-40,-50 30,-25 15,55 -55,30" fill="url(#rubySec)" stroke="#ffe4e6" strokeWidth="1"/>
      <line x1="-40" y1="-50" x2="30" y2="-25" stroke="#38bdf8" strokeWidth="2.5"/>
      <path d="M-60,-75 L-35,-48 L-20,-60 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1"/>
      <line x1="-35" y1="-48" x2="10" y2="-48" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="-35" y1="-48" x2="5" y2="-34" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M-5,-48 A30,30 0 0,1 2,-35" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="14" y="-38" fill="#facc15" fontSize="8.5" fontFamily="monospace" fontWeight="bold">12°-15°</text>
      <line x1="0" y1="5" x2="35" y2="25" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrGreen)"/>
      <text x="35" y="42" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">Force de plaquage</text>
    </g>
    <rect x="10" y="180" width="205" height="48" rx="4" fill="#1e293b"/>
    <text x="112" y="196" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Sous l’action du rouage, la dent attire</text>
    <text x="112" y="208" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">la levée vers l’intérieur : l’ancre reste</text>
    <text x="112" y="220" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">plaquée fermement à la butée.</text>
  </g>
  <g transform="translate(265, 20)">
    <rect x="0" y="0" width="230" height="240" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
    <text x="115" y="24" fill="#38bdf8" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">SÉCURITÉS (DARD & CORNES)</text>
    <g transform="translate(115, 105)">
      <circle cx="45" cy="0" r="38" fill="#1e293b" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M7,0 A38,38 0 0,1 20,-24 L32,-12 A18,18 0 0,0 32,12 L20,24 Z" fill="#070a10" stroke="#f59e0b" strokeWidth="1.2"/>
      <rect x="-65" y="-3" width="68" height="6" rx="2" fill="url(#secSteel)" stroke="#475569" strokeWidth="1"/>
      <polygon points="3,-4 9,0 3,4" fill="#f59e0b"/>
      <line x1="9" y1="0" x2="22" y2="0" stroke="#ef4444" strokeWidth="2"/>
      <line x1="16" y1="-1" x2="16" y2="-32" stroke="#ef4444" strokeWidth="1"/>
      <rect x="-3" y="-50" width="90" height="17" rx="3" fill="#450a0a" stroke="#b91c1c" strokeWidth="0.8"/>
      <text x="42" y="-38" fill="#fca5a5" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Garde : 0.02 - 0.04 mm</text>
    </g>
    <rect x="10" y="180" width="210" height="48" rx="4" fill="#1e293b"/>
    <text x="115" y="196" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">En cas de choc extérieur, le dard</text>
    <text x="115" y="208" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">bute contre le petit plateau et interdit</text>
    <text x="115" y="220" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">le renversement de l’ancre.</text>
  </g>
</svg>
  );
}

function BalanceSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldBalance" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fef08a"/>
      <stop offset="50%" stopColor="#ca8a04"/>
      <stop offset="100%" stopColor="#854d0e"/>
    </linearGradient>
    <radialGradient id="centerPivotGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="100%" stopColor="#64748b"/>
    </radialGradient>
  </defs>
  <rect width="520" height="280" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g transform="translate(150, 140)">
    <circle cx="0" cy="0" r="105" fill="none" stroke="url(#goldBalance)" strokeWidth="7"/>
    <circle cx="0" cy="0" r="105" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="-102" y1="0" x2="102" y2="0" stroke="url(#goldBalance)" strokeWidth="5"/>
    <path d="M0,0 A8,8 0 0,1 8,-8 A14,14 0 0,1 14,8 A20,20 0 0,1 -2,20 A26,26 0 0,1 -26,-6 A32,32 0 0,1 0,-32 A38,38 0 0,1 38,10 A44,44 0 0,1 -10,44 A50,50 0 0,1 -50,-15 A56,56 0 0,1 5,-56 A62,62 0 0,1 62,20 A68,68 0 0,1 -18,68 A74,74 0 0,1 -74,-22 L-75,-45" 
          fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="0" cy="0" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="1.2"/>
    <line x1="-10" y1="0" x2="-2" y2="0" stroke="#070a10" strokeWidth="2"/>
    <circle cx="0" cy="0" r="3.5" fill="url(#centerPivotGrad)"/>
    <text x="14" y="4" fill="#38bdf8" fontSize="8" fontFamily="monospace">Virole</text>
    <rect x="-85" y="-55" width="12" height="14" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1"/>
    <circle cx="-79" cy="-48" r="2.5" fill="#0f172a"/>
    <text x="-85" y="-60" fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="bold">Piton</text>
    <g transform="translate(-45, -58)">
      <circle cx="0" cy="0" r="5" fill="#ef4444"/>
      <circle cx="8" cy="-2" r="5" fill="#ef4444"/>
      <text x="-12" y="-10" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold">Goupilles Raquette</text>
    </g>
    <text x="0" y="122" fill="#ca8a04" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Balancier Glucydur & Spiral Nivarox</text>
  </g>
  <g transform="translate(300, 25)">
    <rect x="0" y="0" width="205" height="230" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    <text x="102" y="24" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">RÉGLAGE DE L’ORGANE RÉGLANT</text>
    <g transform="translate(15, 40)" className="text-xs font-mono space-y-2">
      <text x="0" y="10" fill="#facc15" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">1. La Raquette (Marche s/j)</text>
      <text x="0" y="24" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Modifie la longueur active du spiral.</text>
      <text x="0" y="36" fill="#cbd5e1" fontSize="8" fontFamily="monospace">• Vers + : Raccourcit → Avance</text>
      <text x="0" y="48" fill="#cbd5e1" fontSize="8" fontFamily="monospace">• Vers - : Rallonge → Retard</text>
      <text x="0" y="70" fill="#38bdf8" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">2. Le Porte-Piton (Repère ms)</text>
      <text x="0" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Aligne la cheville sur la ligne des centres.</text>
      <text x="0" y="96" fill="#34d399" fontSize="8" fontFamily="monospace">• Tolérance COSC : &lt; 0.6 ms</text>
      <text x="0" y="108" fill="#34d399" fontSize="8" fontFamily="monospace">• Idéal Manufacture : 0.0 à 0.2 ms</text>
      <text x="0" y="130" fill="#a78bfa" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">3. Courbe Terminale Breguet</text>
      <text x="0" y="144" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Relevée au-dessus du plan du spiral.</text>
      <text x="0" y="156" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">Développement concentrique parfait</text>
      <text x="0" y="168" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">et élimination de l’erreur de position.</text>
    </g>
  </g>
</svg>
  );
}

function LubeSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 250" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="oilThixo" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stopColor="#fef08a"/>
      <stop offset="60%" stopColor="#eab308"/>
      <stop offset="100%" stopColor="#ca8a04"/>
    </radialGradient>
    <linearGradient id="rubySection" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ff4d6d"/>
      <stop offset="50%" stopColor="#be123c"/>
      <stop offset="100%" stopColor="#881337"/>
    </linearGradient>
  </defs>
  <rect width="520" height="250" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g transform="translate(160, 120)">
    <path d="M-110,40 L-40,15 L-25,28 L-95,65 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5"/>
    <text x="-95" y="85" fill="#eab308" fontSize="9" fontFamily="monospace">Dent Roue d’Ancre</text>
    <polygon points="-30,-50 60,-15 35,65 -55,30" fill="url(#rubySection)" stroke="#ffe4e6" strokeWidth="1.5"/>
    <line x1="-30" y1="-50" x2="-55" y2="30" stroke="#38bdf8" strokeWidth="3"/>
    <text x="-105" y="-30" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">Plan d’Impulsion</text>
    <line x1="-30" y1="-50" x2="60" y2="-15" stroke="#ef4444" strokeWidth="2" strokeDasharray="2,2"/>
    <text x="35" y="-35" fill="#f87171" fontSize="8" fontFamily="monospace">Plan de Repos (Sec !)</text>
    <path d="M-45,5 Q-32,0 -42,-20 Q-52,-10 -45,5 Z" fill="url(#oilThixo)" stroke="#fef08a" strokeWidth="1"/>
    <ellipse cx="-44" cy="-8" rx="2" ry="4" fill="#ffffff" opacity="0.8"/>
    <line x1="-42" y1="-8" x2="30" y2="15" stroke="#facc15" strokeWidth="1.5"/>
    <text x="35" y="18" fill="#facc15" fontSize="9.5" fontFamily="monospace" fontWeight="bold">Moebius 9415 (1/3 du plan)</text>
    <text x="35" y="30" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Graisse thixotrope micro-dosée</text>
  </g>
  <g transform="translate(320, 20)">
    <rect x="0" y="0" width="185" height="210" rx="8" fill="#0f172a" stroke="#ca8a04" strokeWidth="1"/>
    <text x="92" y="24" fill="#facc15" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">PROTOCOLE MOEBIUS 9415</text>
    <g transform="translate(12, 38)" className="text-xs space-y-2">
      <text x="0" y="10" fill="#34d399" fontSize="9" fontFamily="sans-serif" fontWeight="bold">✅ RÈGLE OFFICIELLE :</text>
      <text x="0" y="24" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">Déposer 1 micro-touche sur la</text>
      <text x="0" y="36" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">levée de sortie, puis faire tourner</text>
      <text x="0" y="48" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">5 dents et répéter 3 fois.</text>
      <text x="0" y="70" fill="#ef4444" fontSize="9" fontFamily="sans-serif" fontWeight="bold">⛔ INTERDICTIONS :</text>
      <text x="0" y="84" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">• Jamais d’huile liquide 9010</text>
      <text x="0" y="96" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">  (elle gicle sur le spiral !).</text>
      <text x="0" y="108" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">• Pivots d’ancre STRICTEMENT</text>
      <text x="0" y="120" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">  SECS (sans aucune goutte !).</text>
      <text x="0" y="142" fill="#38bdf8" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🔬 RÔLE THIXOTROPE :</text>
      <text x="0" y="156" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">Solide au repos pour ne pas couler,</text>
      <text x="0" y="168" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif">fluide à l’impact pour lubrifier.</text>
    </g>
  </g>
</svg>
  );
}

function VibroSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 240" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <rect width="520" height="240" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <g transform="translate(15, 20)">
    <rect x="0" y="0" width="115" height="195" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.2"/>
    <text x="57" y="20" fill="#34d399" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">1. COSC PARFAIT</text>
    <rect x="10" y="30" width="95" height="110" fill="#042f2e" stroke="#065f46" strokeWidth="0.8"/>
    <line x1="20" y1="90" x2="95" y2="82" stroke="#34d399" strokeWidth="1.8"/>
    <line x1="20" y1="95" x2="95" y2="87" stroke="#34d399" strokeWidth="1.8"/>
    <text x="57" y="155" fill="#34d399" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Marche : +2 s/j</text>
    <text x="57" y="168" fill="#34d399" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Repère : 0.1 ms</text>
    <text x="57" y="181" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Amplitude : 295°</text>
  </g>
  <g transform="translate(140, 20)">
    <rect x="0" y="0" width="115" height="195" rx="6" fill="#0f172a" stroke="#eab308" strokeWidth="1.2"/>
    <text x="57" y="20" fill="#facc15" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">2. BOÎTERIE (REPÈRE)</text>
    <rect x="10" y="30" width="95" height="110" fill="#422006" stroke="#854d0e" strokeWidth="0.8"/>
    <line x1="20" y1="65" x2="95" y2="65" stroke="#facc15" strokeWidth="1.8"/>
    <line x1="20" y1="105" x2="95" y2="105" stroke="#facc15" strokeWidth="1.8"/>
    <text x="57" y="155" fill="#facc15" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Marche : +0 s/j</text>
    <text x="57" y="168" fill="#ef4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Repère : 2.4 ms ⚠️</text>
    <text x="57" y="181" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Tourner porte-piton</text>
  </g>
  <g transform="translate(265, 20)">
    <rect x="0" y="0" width="115" height="195" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2"/>
    <text x="57" y="20" fill="#f87171" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">3. REBOTEMENT</text>
    <rect x="10" y="30" width="95" height="110" fill="#450a0a" stroke="#991b1b" strokeWidth="0.8"/>
    <line x1="20" y1="120" x2="95" y2="40" stroke="#f87171" strokeWidth="2"/>
    <circle cx="35" cy="55" r="2" fill="#fca5a5"/>
    <circle cx="50" cy="95" r="2" fill="#fca5a5"/>
    <circle cx="75" cy="45" r="2" fill="#fca5a5"/>
    <circle cx="85" cy="115" r="2" fill="#fca5a5"/>
    <text x="57" y="155" fill="#ef4444" fontSize="8.5" fontFamily="monospace" textAnchor="middle">+180 s/j (Fou)</text>
    <text x="57" y="168" fill="#ef4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Ampl. &gt; 340° ⛔</text>
    <text x="57" y="181" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Choc dos fourchette</text>
  </g>
  <g transform="translate(390, 20)">
    <rect x="0" y="0" width="115" height="195" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2"/>
    <text x="57" y="20" fill="#c084fc" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">4. MAGNÉTISÉ</text>
    <rect x="10" y="30" width="95" height="110" fill="#3b0764" stroke="#6b21a8" strokeWidth="0.8"/>
    <path d="M20,110 Q50,40 95,95" fill="none" stroke="#c084fc" strokeWidth="2"/>
    <path d="M20,118 Q50,48 95,103" fill="none" stroke="#c084fc" strokeWidth="2"/>
    <text x="57" y="155" fill="#c084fc" fontSize="8.5" fontFamily="monospace" textAnchor="middle">+45 s/j (Instable)</text>
    <text x="57" y="168" fill="#c084fc" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Spires collées</text>
    <text x="57" y="181" fill="#cbd5e1" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Démagnétiseur Bergeon</text>
  </g>
  <text x="260" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">INTERPRÉTATION DU VIBROGRAPHE WITSCHI · DIAGNOSTIC ACOUSTIQUE OFFICIEL</text>
</svg>
  );
}

function CoscSVG(): React.JSX.Element {
  return (
<svg viewBox="0 0 520 280" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
  <rect width="520" height="280" rx="12" fill="#070a10" stroke="#1f293d" strokeWidth="1.2"/>
  <text x="260" y="24" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CONTRÔLE CHRONOMÉTRIQUE OFFICIEL (ISO 3159 / COSC) · 5 POSITIONS</text>
  <g transform="translate(15, 42)">
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="92" height="115" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="46" cy="40" r="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="46" y="36" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CH</text>
      <text x="46" y="48" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">Cadran Haut</text>
      <rect x="6" y="74" width="80" height="34" rx="3" fill="#111827"/>
      <text x="46" y="86" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Ampl. 290°-315°</text>
      <text x="46" y="98" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Frottement pivots</text>
    </g>
    <g transform="translate(98, 0)">
      <rect x="0" y="0" width="92" height="115" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="46" cy="40" r="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="46" y="36" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CB</text>
      <text x="46" y="48" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">Cadran Bas</text>
      <rect x="6" y="74" width="80" height="34" rx="3" fill="#111827"/>
      <text x="46" y="86" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Δ &lt; 5 s/j vs CH</text>
      <text x="46" y="98" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Face contreplat</text>
    </g>
    <g transform="translate(196, 0)">
      <rect x="0" y="0" width="92" height="115" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="46" cy="40" r="24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
      <circle cx="46" cy="64" r="3.5" fill="#eab308"/>
      <text x="46" y="36" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">6H</text>
      <text x="46" y="48" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">Verticale Bas</text>
      <rect x="6" y="74" width="80" height="34" rx="3" fill="#111827"/>
      <text x="46" y="86" fill="#facc15" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Ampl. 250°-275°</text>
      <text x="46" y="98" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Chute d’amplitude</text>
    </g>
    <g transform="translate(294, 0)">
      <rect x="0" y="0" width="92" height="115" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="46" cy="40" r="24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
      <circle cx="22" cy="40" r="3.5" fill="#eab308"/>
      <text x="46" y="36" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">9H</text>
      <text x="46" y="48" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">Verticale Gauche</text>
      <rect x="6" y="74" width="80" height="34" rx="3" fill="#111827"/>
      <text x="46" y="86" fill="#facc15" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Gravité spiral</text>
      <text x="46" y="98" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Goupilles raquette</text>
    </g>
    <g transform="translate(392, 0)">
      <rect x="0" y="0" width="92" height="115" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="46" cy="40" r="24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
      <circle cx="70" cy="40" r="3.5" fill="#eab308"/>
      <text x="46" y="36" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">3H</text>
      <text x="46" y="48" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">Verticale Droite</text>
      <rect x="6" y="74" width="80" height="34" rx="3" fill="#111827"/>
      <text x="46" y="86" fill="#facc15" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Pied pendant</text>
      <text x="46" y="98" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif" textAnchor="middle">Isochronisme pur</text>
    </g>
  </g>
  <g transform="translate(15, 170)">
    <rect x="0" y="0" width="490" height="95" rx="8" fill="#111827" stroke="#374151" strokeWidth="1"/>
    <text x="15" y="22" fill="#34d399" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">CRITÈRES D’ACCEPTATION SUISSE (COSC / CFC HORLOGER D’ÉTABLI) :</text>
    <text x="15" y="40" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">• Marche moyenne diurne : -4 à +6 s/j (Tolérance ISO 3159 chronomètre)</text>
    <text x="15" y="55" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">• Plus grand écart (Delta V-H) : Max 10 s/j entre positions horizontales et verticales</text>
    <text x="15" y="70" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">• Repère (Beat Error) : &lt; 0.6 ms (Idéal d’atelier révisé : 0.0 à 0.2 ms)</text>
    <text x="15" y="85" fill="#fca5a5" fontSize="8.5" fontFamily="monospace">• Amplitude minimale après 24h de marche : &gt; 220° en position verticale (3H/6H)</text>
  </g>
</svg>
  );
}

type Accent = "amber" | "sky" | "emerald" | "rose" | "purple" | "red";

const ACCENT_TEXT: Record<Accent, string> = {
  amber: "text-amber-700 dark:text-amber-400",
  sky: "text-sky-700 dark:text-sky-400",
  emerald: "text-emerald-700 dark:text-emerald-400",
  rose: "text-rose-700 dark:text-rose-400",
  purple: "text-purple-700 dark:text-purple-400",
  red: "text-red-700 dark:text-red-400",
};

const ACCENT_BORDER: Record<Accent, string> = {
  amber: "border-amber-300 dark:border-amber-500/30",
  sky: "border-sky-300 dark:border-sky-500/30",
  emerald: "border-emerald-300 dark:border-emerald-500/30",
  rose: "border-rose-300 dark:border-rose-500/30",
  purple: "border-purple-300 dark:border-purple-500/30",
  red: "border-red-300 dark:border-red-500/40",
};

interface StepCard {
  title: string;
  accent: Accent;
  badge?: string;
  body: string;
  list?: string[];
}

interface MasterStep {
  id: number;
  tag: string;
  title: string;
  intro: string;
  cards: StepCard[];
  caption: string;
  loupeTitle: string;
  standard: string;
  Svg: () => React.JSX.Element;
}

const STEPS: MasterStep[] = [
  {
    id: 1,
    tag: "Norme NIHS 91-10",
    title: "Anatomie & terminologie micrométrique de l’échappement suisse",
    intro:
      "L’échappement à ancre suisse fait le lien entre le rouage, qui pousse sous le couple du barillet, et le balancier-spiral, qui compte le temps. Il entretient les oscillations et libère le rouage dent par dent.",
    cards: [
      { title: "1. Roue d’ancre (15 dents à talon club)", accent: "amber", body: "Dents au profil spécialisé : talon, face de repos, plan d’impulsion et pointe. Elle avance pas à pas sous l’action du barillet." },
      { title: "2. L’ancre & ses levées en rubis", accent: "rose", body: "Corps en acier portant deux levées en corindon synthétique : la levée d’entrée et la levée de sortie. Se termine par la fourchette, ses deux cornes et le dard." },
      { title: "3. Le double plateau & sa cheville", accent: "sky", body: "Chassé sur l’axe de balancier. Le grand plateau porte la cheville (rubis ellipse). Le petit plateau porte l’encoche de sécurité pour le passage du dard." },
      { title: "4. Les touches de limitation", accent: "emerald", body: "Elles limitent la course angulaire de l’ancre (environ 9° à 10° au total). Fixes, ou excentriques et ajustables selon les calibres." },
    ],
    caption: "Vue schématique · Ligne des centres théorique roue d’ancre ↔ ancre ↔ balancier",
    loupeTitle: "Étape 01 : Anatomie de l’échappement",
    standard: "NIHS 91-10",
    Svg: AnatomySVG,
  },
  {
    id: 2,
    tag: "Cinématique fondamentale",
    title: "Le cycle cinématique en 3 temps",
    intro:
      "À chaque alternance, quand la cheville passe près de la ligne des centres, la même séquence se répète en quelques millisecondes. C’est l’essence même du battement horloger.",
    cards: [
      { title: "Phase 1 · Le dégagement", accent: "sky", badge: "1° à 2°", body: "Le balancier revient de son arc libre. La cheville entre dans l’entaille de la fourchette et pousse l’ancre pour sortir la dent du plan de repos. Le balancier fournit ici un peu d’énergie pour vaincre le tirage." },
      { title: "Phase 2 · L’impulsion", accent: "amber", badge: "8° à 10°", body: "Libérée, la roue d’ancre avance sous le couple du ressort moteur. La dent glisse sur le plan d’impulsion de la levée : l’ancre transmet ce travail à la cheville, et l’énergie est restituée au balancier." },
      { title: "Phase 3 · La chute & le repos", accent: "emerald", badge: "1.5° à 2.5°", body: "La dent quitte la levée, la roue avance librement de la valeur de la chute, puis la dent suivante tombe sur le plan de repos de l’autre levée. L’ancre est plaquée contre sa touche : le balancier part pour son arc supplémentaire." },
    ],
    caption: "Angle de levée du balancier : 50° à 52° (ETA 2824 / ETA 6497)",
    loupeTitle: "Étape 02 : Le cycle en 3 temps",
    standard: "Levée 50°-52°",
    Svg: CycleSVG,
  },
  {
    id: 3,
    tag: "Sécurité & verrouillage",
    title: "Le tirage & les sécurités indispensables",
    intro:
      "Pourquoi l’ancre ne se décroche-t-elle pas au moindre mouvement du poignet ? Grâce au tirage et au double système de sécurité dard / cornes.",
    cards: [
      { title: "1. L’angle de tirage (12° à 15°)", accent: "amber", body: "Le plan de repos de la levée est incliné de 12° à 15°. Sous la poussée de la dent, la levée est attirée vers le centre de la roue : l’ancre reste plaquée contre sa touche pendant tout l’arc supplémentaire." },
      { title: "2. La garde au dard (0.02 à 0.04 mm)", accent: "sky", body: "En cas de choc pendant l’arc supplémentaire, le dard touche le petit plateau et empêche l’ancre de basculer de l’autre côté (renversement). Le tirage la ramène aussitôt contre sa touche." },
      { title: "3. La garde aux cornes", accent: "rose", body: "Quand l’encoche du petit plateau passe devant le dard, la sécurité est relayée par les cornes de la fourchette face à la cheville. Aucun frottement ni blocage n’est permis." },
    ],
    caption: "Jeu au dard : 0.02 à 0.04 mm, sans frottement",
    loupeTitle: "Étape 03 : Tirage & sécurités",
    standard: "Garde 0.02-0.04 mm",
    Svg: TirageSVG,
  },
  {
    id: 4,
    tag: "Isochronisme & régulation",
    title: "L’organe réglant : balancier-spiral & isochronisme",
    intro:
      "Le balancier-spiral est le résonateur de la montre. Sa période suit la formule T = 2π · √(I / C), où I est le moment d’inertie du balancier et C le couple de rappel du spiral.",
    cards: [
      { title: "1. Balancier Glucydur", accent: "amber", body: "Alliage cuivre-béryllium, amagnétique et peu sensible à la température. Il doit être parfaitement équilibré pour éviter les écarts entre positions verticales." },
      { title: "2. Spiral, virole & piton", accent: "sky", body: "L’extrémité intérieure du spiral est fixée à la virole, chassée sur l’axe. L’extrémité extérieure est tenue par le piton, fixé au coq." },
      { title: "3. La raquette & ses goupilles", accent: "emerald", body: "La raquette modifie la longueur active du spiral et donc la marche (s/j). Règle d’or : le spiral doit respirer entre les goupilles, ni pincé ni trop flottant." },
      { title: "4. Courbe terminale Breguet", accent: "purple", body: "La dernière spire est relevée au-dessus du plan du spiral. Le spiral se développe de façon concentrique, ce qui améliore l’isochronisme et réduit les écarts de position." },
    ],
    caption: "Vue de dessus · Balancier 2 bras · Virole, raquette, piton",
    loupeTitle: "Étape 04 : Balancier-spiral",
    standard: "Isochronisme",
    Svg: BalanceSVG,
  },
  {
    id: 5,
    tag: "Lubrification",
    title: "Lubrification des levées : Moebius 9415",
    intro:
      "La lubrification de l’échappement est un vrai test de dextérité. Trop, trop peu ou au mauvais endroit, et l’amplitude comme le repère se dégradent.",
    cards: [
      { title: "Pourquoi la Moebius 9415 ?", accent: "amber", body: "Les levées reçoivent des chocs répétés à haute fréquence. La 9415 est une graisse thixotrope : ferme au repos, elle ne s’étale pas, puis se fluidifie sous le choc pour lubrifier." },
      { title: "Protocole d’application", accent: "emerald", body: "Avec un pique-huile très fin, déposer une micro-goutte sur le plan d’impulsion de la levée de sortie. Faire avancer la roue d’ancre de quelques dents, puis répéter jusqu’à 3 fois. Contrôler à la loupe que chaque dent porte un film fin et régulier." },
      { title: "Les 2 fautes à ne jamais faire", accent: "red", body: "", list: ["Pivots d’ancre : laissés secs. Un film d’huile freinerait l’ancre et ferait chuter l’amplitude.", "Plan de repos : aucune bavure. Le lubrifiant y collerait la levée au dégagement et perturberait le repère."] },
    ],
    caption: "Vue grossie · Micro-goutte sur le plan d’impulsion · Plan de repos sec",
    loupeTitle: "Étape 05 : Lubrification Moebius 9415",
    standard: "Moebius 9415",
    Svg: LubeSVG,
  },
  {
    id: 6,
    tag: "Acoustique & métrologie",
    title: "Diagnostic acoustique : les 3 bruits T1, T2, T3",
    intro:
      "Chaque tic ou tac n’est pas un son unique, mais une suite de trois micro-chocs captés par le microphone de l’appareil de contrôle.",
    cards: [
      { title: "T1 · Dégagement", accent: "sky", body: "La cheville heurte la fourchette et déverrouille l’ancre." },
      { title: "T2 · Impulsion", accent: "amber", body: "La dent de la roue d’ancre attaque le plan d’impulsion de la levée." },
      { title: "T3 · Chute & butée", accent: "emerald", body: "La dent suivante tombe sur le plan de repos opposé et l’ancre vient contre sa touche." },
      { title: "Comment l’appareil calcule l’amplitude", accent: "purple", body: "Il mesure le temps entre T1 et T3. Avec l’angle de levée du calibre (par exemple 52°), il en déduit la vitesse du balancier au passage et donc son amplitude. Un angle de levée mal saisi fausse l’amplitude affichée." },
    ],
    caption: "4 tracés types : parfait, boîterie, rebotement, spiral magnétisé",
    loupeTitle: "Étape 06 : Diagnostic acoustique",
    standard: "ISO 3159",
    Svg: VibroSVG,
  },
  {
    id: 7,
    tag: "Évaluation",
    title: "Contrôle chronométrique ISO 3159 & fautes d’examen",
    intro:
      "Pour juger un réglage, on contrôle la montre dans plusieurs positions. Les positions horizontales testent le frottement en bout de pivot, les verticales le frottement sur le corps du pivot et l’équilibre du balancier.",
    cards: [
      { title: "Les 5 positions", accent: "amber", body: "CH (cadran haut), CB (cadran bas), puis les positions verticales 6H, 9H et 3H. Un écart important entre horizontales et verticales trahit un défaut d’équilibre ou de pivotement." },
      { title: "Fautes graves au contrôle d’établi", accent: "red", body: "", list: ["Pivots d’ancre huilés.", "Rebotement non corrigé.", "Spiral qui touche le balancier, le coq ou les goupilles.", "Graisse sur le plan de repos ou sur le dard.", "Repère supérieur à 0.6 ms."] },
    ],
    caption: "ISO 3159 · CH, CB, 6H, 9H, 3H",
    loupeTitle: "Étape 07 : Contrôle 5 positions",
    standard: "ISO 3159",
    Svg: CoscSVG,
  },
];

const ZOOM_LEVELS: number[] = [1, 2, 5, 10];
const ZOOM_WIDTH: Record<number, number> = { 1: 1, 2: 1.6, 5: 2.6, 10: 4 };

interface LoupeProps {
  step: MasterStep | null;
  onClose: () => void;
}

function LoupeModal({ step, onClose }: LoupeProps): React.JSX.Element | null {
  const [zoom, setZoom] = useState<number>(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoom(1);
  }, [step]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const id = requestAnimationFrame(() => {
      vp.scrollLeft = (vp.scrollWidth - vp.clientWidth) / 2;
      vp.scrollTop = (vp.scrollHeight - vp.clientHeight) / 2;
    });
    return () => cancelAnimationFrame(id);
  }, [zoom, step]);

  useEffect(() => {
    if (!step) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
      if (e.key === "1") setZoom(1);
      if (e.key === "2") setZoom(2);
      if (e.key === "5") setZoom(5);
      if (e.key === "0") setZoom(10);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [step, onClose]);

  if (!step) return null;
  const Svg = step.Svg;
  const factor = ZOOM_WIDTH[zoom] ?? 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={step.loupeTitle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer"
      title="Cliquer à l’extérieur pour fermer"
    >
      <div className="relative w-full max-w-5xl bg-[#0a0e17] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] cursor-default">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-800 bg-[#0d1322]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <ZoomIn className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Loupe d’inspection 10x
                </span>
                <span className="text-xs font-mono text-slate-400">{step.standard}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">{step.loupeTitle}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {ZOOM_LEVELS.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoom(z)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    zoom === z ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la loupe"
              className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={viewportRef} className="flex-1 overflow-auto p-4 sm:p-8 bg-[#070a10] min-h-[300px]">
          <div
            className="mx-auto transition-all duration-300 ease-out"
            style={{ width: `${factor * 100}%`, maxWidth: factor === 1 ? "900px" : "none" }}
          >
            <Svg />
          </div>
        </div>

        <div className="px-4 sm:px-5 py-3.5 border-t border-slate-800 bg-[#0d1322] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Grossissement :</span>
            <span className="text-amber-400 font-bold text-sm">{zoom}x</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">Glissez pour explorer · 1, 2, 5, 0 = 10x · Échap</span>
          </div>
          <div className="sm:hidden flex items-center gap-2 w-full">
            {ZOOM_LEVELS.map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setZoom(z)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold ${
                  zoom === z ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300"
                }`}
              >
                {z}x
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hidden sm:inline-block px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition"
          >
            Fermer (Échap ou clic extérieur)
          </button>
        </div>
      </div>
    </div>
  );
}

const DROP_HALF_ZONE = 5.3;
const TOOTH_PITCH = 24;

interface KinState {
  balance: number;
  lever: number;
  wheel: number;
  phase: string;
}

function computeKinematics(total: number): KinState {
  const c = ((total % 360) + 360) % 360;
  const balance = 270 * Math.sin((c * Math.PI) / 180);
  const k = total + DROP_HALF_ZONE;
  const idx = Math.floor(k / 180);
  const local = k - idx * 180;
  const inZone = local < 2 * DROP_HALF_ZONE;
  const p = inZone ? local / (2 * DROP_HALF_ZONE) : 1;
  const impulse = Math.min(1, Math.max(0, (p - 0.25) / 0.5));
  const wheel = (idx + impulse) * (TOOTH_PITCH / 2);
  const even = ((idx % 2) + 2) % 2 === 0;
  const leverProgress = Math.min(1, p / 0.75);
  const lever = even ? -4.5 + 9 * leverProgress : 4.5 - 9 * leverProgress;
  let phase = "Arc supplémentaire (balancier libre)";
  if (inZone) {
    if (p < 0.25) phase = "1. Dégagement";
    else if (p < 0.75) phase = "2. Impulsion";
    else phase = "3. Chute & repos";
  }
  return { balance, lever, wheel, phase };
}

function drawKinematics(ctx: CanvasRenderingContext2D, s: KinState): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#070a10";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.strokeStyle = "#0284c7";
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(30, 250); ctx.lineTo(470, 250); ctx.stroke();
  ctx.setLineDash([]);

  ctx.save();
  ctx.translate(110, 250);
  ctx.rotate((-s.wheel * Math.PI) / 180);
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.stroke();
  for (let a = 0; a < 4; a++) {
    ctx.save();
    ctx.rotate((a * Math.PI) / 2);
    ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(62, 0); ctx.stroke();
    ctx.restore();
  }
  for (let i = 0; i < 15; i++) {
    ctx.save();
    ctx.rotate((i * TOOTH_PITCH * Math.PI) / 180);
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(60, -8); ctx.lineTo(84, -11); ctx.lineTo(76, 5); ctx.lineTo(62, 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = "#ca8a04";
  ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1e293b";
  ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#94a3b8";
  ctx.beginPath(); ctx.arc(282, 228, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(282, 272, 6, 0, Math.PI * 2); ctx.fill();

  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate((s.lever * Math.PI) / 180);
  ctx.fillStyle = "#64748b";
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -12); ctx.lineTo(-62, -48); ctx.lineTo(-68, -36); ctx.lineTo(-6, 4);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 12); ctx.lineTo(-62, 48); ctx.lineTo(-68, 36); ctx.lineTo(-6, -4);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#e11d48";
  ctx.strokeStyle = "#ffe4e6";
  ctx.fillRect(-80, -54, 16, 12); ctx.strokeRect(-80, -54, 16, 12);
  ctx.fillRect(-80, 42, 16, 12); ctx.strokeRect(-80, 42, 16, 12);
  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#94a3b8";
  ctx.beginPath();
  ctx.moveTo(6, -7); ctx.lineTo(88, -7); ctx.lineTo(96, -16); ctx.lineTo(102, -12);
  ctx.lineTo(94, -3); ctx.lineTo(86, -3); ctx.lineTo(86, 3); ctx.lineTo(94, 3);
  ctx.lineTo(102, 12); ctx.lineTo(96, 16); ctx.lineTo(88, 7); ctx.lineTo(6, 7);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(70, -1.5, 14, 3);
  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0f172a";
  ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(390, 250);
  ctx.rotate((s.balance * Math.PI) / 180);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
  ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = "#94a3b8";
  ctx.fillStyle = "#0f172a";
  ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#070a10";
  ctx.strokeStyle = "#f59e0b";
  ctx.beginPath(); ctx.arc(-24, 0, 7, -Math.PI / 2, Math.PI / 2, false); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#e11d48";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(-40, 0, 4, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0284c7";
  ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.font = "bold 12px monospace";
  ctx.fillStyle = "#facc15";
  ctx.fillText("Roue d’ancre", 66, 370);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("Ancre", 232, 370);
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("Double plateau", 342, 370);
}

function KinematicWorkshop(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalRef = useRef<number>(-20);
  const runningRef = useRef<boolean>(true);
  const speedRef = useRef<number>(0.5);
  const [running, setRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(0.5);
  const [state, setState] = useState<KinState>(() => computeKinematics(-20));

  useEffect(() => {
    runningRef.current = running;
  }, [running]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const render = useCallback((): void => {
    const ctx = canvasRef.current?.getContext("2d");
    const s = computeKinematics(totalRef.current);
    if (ctx) drawKinematics(ctx, s);
    setState(s);
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = (): void => {
      if (runningRef.current) {
        const s = computeKinematics(totalRef.current);
        const slow = s.phase.startsWith("Arc") ? 1 : 0.3;
        totalRef.current += 1.2 * speedRef.current * slow;
        render();
      }
      raf = requestAnimationFrame(loop);
    };
    render();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [render]);

  const step = (delta: number): void => {
    setRunning(false);
    totalRef.current += delta;
    render();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <div className="w-full lg:w-1/3 space-y-5">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold">Simulateur cinématique</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Banc d’essai de l’échappement suisse</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            La roue avance d’une demi-dent à chaque alternance, uniquement pendant l’impulsion. L’animation ralentit automatiquement au passage de la cheville.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition"
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {running ? "Pause" : "Reprendre"}
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Pas précédent" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            <SkipBack className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Pas suivant" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        <div>
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">Vitesse d’animation :</span>
          <div className="grid grid-cols-3 gap-2">
            {[0.2, 0.5, 1].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSpeed(v)}
                className={`py-1.5 rounded-lg border text-xs font-mono ${
                  speed === v
                    ? "bg-amber-100 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500/40 text-amber-800 dark:text-amber-400 font-bold"
                    : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {v}x
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070a10] border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Angle balancier :</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">{state.balance >= 0 ? "+" : ""}{state.balance.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Position ancre :</span>
            <span className="text-sky-700 dark:text-sky-400 font-bold">{state.lever >= 0 ? "+" : ""}{state.lever.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Phase :</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-right">{state.phase}</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex gap-2">
          <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
          <span>Faites du pas à pas autour de 0° : vous verrez l’ancre basculer d’une touche à l’autre pendant que la roue avance d’un cran.</span>
        </div>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        <div className="w-full aspect-square max-w-[500px] bg-[#070a10] rounded-2xl border border-slate-300 dark:border-slate-800 p-2 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

interface VibroDot {
  x: number;
  y1: number;
  y2: number;
  slope: number;
  knock: boolean;
}

interface VibroPreset {
  label: string;
  rate: number;
  beat: number;
  amp: number;
  cls: string;
}

const VIBRO_PRESETS: VibroPreset[] = [
  { label: "1. Réglage idéal", rate: 2, beat: 0.1, amp: 295, cls: "border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40" },
  { label: "2. Boîterie 2.4 ms", rate: 0, beat: 2.4, amp: 280, cls: "border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40" },
  { label: "3. Retard -35 s/j", rate: -35, beat: 0.4, amp: 205, cls: "border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40" },
  { label: "4. Rebotement", rate: 50, beat: 0.2, amp: 350, cls: "border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40" },
];

function VibrographWorkshop(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rate, setRate] = useState<number>(2);
  const [beat, setBeat] = useState<number>(0.1);
  const [amp, setAmp] = useState<number>(295);
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const paramsRef = useRef<{ rate: number; beat: number; amp: number }>({ rate: 2, beat: 0.1, amp: 295 });
  const dotsRef = useRef<VibroDot[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const tickRef = useRef<number>(0);

  useEffect(() => {
    paramsRef.current = { rate, beat, amp };
  }, [rate, beat, amp]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number): void => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const p = paramsRef.current;
        if (t - last > 125) {
          last = t;
          const spacing = p.beat * 16;
          dotsRef.current.push({
            x: canvas.width,
            y1: 110 - spacing / 2 + (Math.random() - 0.5) * 1.2,
            y2: 110 + spacing / 2 + (Math.random() - 0.5) * 1.2,
            slope: (p.rate / 50) * 1.5,
            knock: p.amp > 335,
          });
          if (dotsRef.current.length > 180) dotsRef.current.shift();
        }
        ctx.fillStyle = "#040810";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 1;
        for (let y = 20; y < canvas.height; y += 20) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (const d of dotsRef.current) {
          d.x -= 1.8;
          d.y1 += d.slope * 0.12;
          d.y2 += d.slope * 0.12;
          ctx.fillStyle = "#34d399";
          ctx.beginPath(); ctx.arc(d.x, d.y1, 1.8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = p.beat > 0.6 ? "#facc15" : "#34d399";
          ctx.beginPath(); ctx.arc(d.x, d.y2, 1.8, 0, Math.PI * 2); ctx.fill();
          if (d.knock && Math.random() < 0.4) {
            ctx.fillStyle = "#ef4444";
            ctx.beginPath(); ctx.arc(d.x, d.y1 + (Math.random() - 0.5) * 60, 2, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const playTick = useCallback((isTic: boolean): void => {
    const ac = audioCtxRef.current;
    if (!ac) return;
    const now = ac.currentTime;
    const pulses = [
      { delay: 0, freq: isTic ? 3400 : 3100, gain: 0.15 },
      { delay: 0.003, freq: isTic ? 4200 : 3900, gain: 0.25 },
      { delay: 0.008, freq: isTic ? 2800 : 2600, gain: 0.4 },
    ];
    for (const pu of pulses) {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(pu.freq, now + pu.delay);
      g.gain.setValueAtTime(pu.gain, now + pu.delay);
      g.gain.exponentialRampToValueAtTime(0.0001, now + pu.delay + 0.012);
      osc.connect(g);
      g.connect(ac.destination);
      osc.start(now + pu.delay);
      osc.stop(now + pu.delay + 0.015);
    }
  }, []);

  useEffect(() => {
    if (!audioOn) return;
    const schedule = (): void => {
      tickRef.current += 1;
      const isTic = tickRef.current % 2 === 0;
      const b = paramsRef.current.beat;
      const interval = isTic ? 125 + b * 15 : 125 - b * 15;
      playTick(isTic);
      timerRef.current = window.setTimeout(schedule, Math.max(30, interval));
    };
    schedule();
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [audioOn, playTick]);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => undefined);
    };
  }, []);

  const toggleAudio = (): void => {
    if (!audioCtxRef.current) {
      const W = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const Ctor = W.AudioContext ?? W.webkitAudioContext;
      if (!Ctor) return;
      audioCtxRef.current = new Ctor();
    }
    if (audioCtxRef.current.state === "suspended") void audioCtxRef.current.resume();
    setAudioOn((v) => !v);
  };

  const applyPreset = (p: VibroPreset): void => {
    setRate(p.rate);
    setBeat(p.beat);
    setAmp(p.amp);
    dotsRef.current = [];
  };

  let diag = "Réglage conforme";
  let diagCls = "text-emerald-600 dark:text-emerald-400";
  if (amp > 335) {
    diag = "Rebotement : la cheville frappe le dos de la fourchette";
    diagCls = "text-red-600 dark:text-red-400";
  } else if (beat > 0.6) {
    diag = "Défaut de repère : tourner le porte-piton";
    diagCls = "text-amber-600 dark:text-amber-400";
  } else if (Math.abs(rate) > 10) {
    diag = "Écart de marche : ajuster la raquette";
    diagCls = "text-amber-600 dark:text-amber-400";
  }
  const sign = (v: number): string => (v >= 0 ? "+" : "") + v;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 space-y-5">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold">Simulateur de vibrographe</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Réglage de marche & repère</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Une avance fait monter le tracé, un retard le fait descendre. Un défaut de repère sépare le tracé en deux lignes.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAudio}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold flex items-center justify-center gap-2"
        >
          {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {audioOn ? "Couper le son tic-tac" : "Écouter le tic-tac (T1, T2, T3)"}
        </button>
        <div className="space-y-4">
          <label className="block">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-700 dark:text-slate-300">Raquette (marche) :</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">{sign(rate)} s/j</span>
            </div>
            <input type="range" min={-50} max={50} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
          </label>
          <label className="block">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-700 dark:text-slate-300">Porte-piton (repère) :</span>
              <span className="text-sky-700 dark:text-sky-400 font-bold">{beat.toFixed(1)} ms</span>
            </div>
            <input type="range" min={0} max={3} step={0.1} value={beat} onChange={(e) => setBeat(Number(e.target.value))} className="w-full accent-sky-500 cursor-pointer" />
          </label>
          <label className="block">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-700 dark:text-slate-300">Armage (amplitude) :</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{amp}°</span>
            </div>
            <input type="range" min={180} max={360} step={5} value={amp} onChange={(e) => setAmp(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          {VIBRO_PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => applyPreset(p)} className={`p-2 rounded-lg border text-left ${p.cls}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-2/3">
        <div className="w-full bg-[#070a10] border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d1322] p-3 rounded-xl border border-slate-800 font-mono text-center">
            <div><span className="text-[9px] uppercase text-slate-400 block">Marche</span><span className="text-lg font-bold text-amber-400">{sign(rate)} s/j</span></div>
            <div><span className="text-[9px] uppercase text-slate-400 block">Amplitude</span><span className="text-lg font-bold text-emerald-400">{amp}°</span></div>
            <div><span className="text-[9px] uppercase text-slate-400 block">Repère</span><span className="text-lg font-bold text-sky-400">{beat.toFixed(1)} ms</span></div>
            <div><span className="text-[9px] uppercase text-slate-400 block">Paramètres</span><span className="text-xs font-bold text-slate-300">52° · 28’800 A/h</span></div>
          </div>
          <div className="relative w-full h-56 bg-[#040810] rounded-xl border border-slate-800 overflow-hidden">
            <canvas ref={canvasRef} width={600} height={220} className="w-full h-full" />
            {amp > 335 && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded bg-red-600/90 text-white font-mono text-xs font-bold animate-pulse">
                Rebotement détecté
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-between gap-2 text-[11px] font-mono text-slate-400 px-1">
            <span>Tracé 28’800 A/h</span>
            <span className={`font-bold ${diagCls}`}>{diag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function drawOiling(ctx: CanvasRenderingContext2D, volume: number, spread: number): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "#070a10";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 50) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 50) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.save();
  ctx.translate(140, 260);
  ctx.fillStyle = "#ca8a04";
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-120, 70); ctx.lineTo(20, 20); ctx.lineTo(35, 45); ctx.lineTo(-85, 115);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  if (spread > 0 && volume > 0 && volume <= 50) {
    ctx.fillStyle = "rgba(254, 240, 138, 0.55)";
    ctx.beginPath(); ctx.ellipse(22, 34, 6 + spread * 2, 4 + spread, -0.4, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ctx.save();
  ctx.translate(280, 230);
  const g = ctx.createLinearGradient(-40, -80, 80, 80);
  g.addColorStop(0, "#fb7185");
  g.addColorStop(0.5, "#e11d48");
  g.addColorStop(1, "#881337");
  ctx.fillStyle = g;
  ctx.strokeStyle = "#ffe4e6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-40, -90); ctx.lineTo(100, -30); ctx.lineTo(60, 110); ctx.lineTo(-80, 50);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(-40, -90); ctx.lineTo(-80, 50); ctx.stroke();
  ctx.strokeStyle = "#f87171";
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(-40, -90); ctx.lineTo(100, -30); ctx.stroke();
  ctx.setLineDash([]);
  if (volume > 0) {
    const r = (volume / 100) * 45;
    const og = ctx.createRadialGradient(-60, -20, 2, -60, -20, r);
    og.addColorStop(0, "#fef08a");
    og.addColorStop(0.6, "#eab308");
    og.addColorStop(1, "#ca8a04");
    ctx.fillStyle = og;
    ctx.strokeStyle = "#fef08a";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-60, -20, r * 0.8, r * 1.2, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(-65, -28, r * 0.25, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ctx.font = "bold 12px monospace";
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("PLAN D’IMPULSION (à lubrifier)", 30, 90);
  ctx.fillStyle = "#f87171";
  ctx.fillText("PLAN DE REPOS (sec)", 300, 110);
}

function OilingWorkshop(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fine, setFine] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [hint, setHint] = useState<string>("");

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawOiling(ctx, volume, turns);
  }, [volume, turns]);

  const drop = (): void => {
    setHint("");
    setVolume((v) => Math.min(100, v + (fine ? 35 : 75)));
  };
  const rotate = (): void => {
    if (volume === 0) {
      setHint("Déposez d’abord une micro-goutte avant de faire avancer la roue.");
      return;
    }
    setHint("");
    setTurns((t) => Math.min(3, t + 1));
  };
  const reset = (): void => {
    setVolume(0);
    setTurns(0);
    setHint("");
  };

  let label = "0 % (sec)";
  let barCls = "bg-slate-400 dark:bg-slate-700";
  let box = "Plan d’impulsion sec. Déposez une micro-goutte de Moebius 9415.";
  let boxCls = "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800";
  if (volume > 50) {
    label = `${volume} % (excès)`;
    barCls = "bg-red-500";
    box = "Goutte trop grosse : la graisse va déborder sur le plan de repos. Nettoyez au Rodico et recommencez avec le pique-huile fin.";
    boxCls = "bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 border-red-300 dark:border-red-500/40";
  } else if (volume > 0 && turns < 3) {
    label = `${volume} % (bon dosage)`;
    barCls = "bg-emerald-500";
    box = `Micro-goutte bien placée. Faites avancer la roue de quelques dents (${turns}/3) pour répartir la graisse.`;
    boxCls = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30";
  } else if (volume > 0) {
    label = `${volume} % (réparti)`;
    barCls = "bg-emerald-500";
    box = "Travail propre : film fin et régulier sur les plans d’impulsion, plans de repos et pivots d’ancre restés secs.";
    boxCls = "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border-emerald-400 dark:border-emerald-500/50 font-bold";
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <div className="w-full lg:w-1/3 space-y-5">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold">Atelier de lubrification</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Moebius 9415 sur la levée de sortie</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Choisissez l’outil, déposez la goutte, puis répartissez-la en faisant avancer la roue.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((f) => (
            <button
              key={String(f)}
              type="button"
              onClick={() => setFine(f)}
              className={`p-2.5 rounded-xl border font-mono text-xs text-left ${
                fine === f
                  ? "bg-amber-100 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500/40 text-amber-800 dark:text-amber-400 font-bold"
                  : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              {f ? "Pique-huile fin" : "Pique-huile gros"}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <button type="button" onClick={drop} className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2">
            <Droplet className="w-4 h-4" />
            Déposer une micro-goutte
          </button>
          <button type="button" onClick={rotate} className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs">
            Faire avancer la roue ({turns}/3)
          </button>
          <button type="button" onClick={reset} className="w-full py-2 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[11px] flex items-center justify-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            Nettoyer au Rodico & recommencer
          </button>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070a10] border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Volume déposé :</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{label}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${barCls}`} style={{ width: `${volume}%` }} />
          </div>
          <div className={`p-2.5 rounded-lg border text-[11px] leading-tight ${boxCls}`}>{hint || box}</div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        <div className="w-full aspect-square max-w-[500px] bg-[#070a10] rounded-2xl border border-slate-300 dark:border-slate-800 p-2 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full rounded-xl" />
        </div>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2 text-center">Objectif : goutte fine sur le plan d’impulsion · plan de repos sec</p>
      </div>
    </div>
  );
}

type WorkshopKey = "kinematic" | "vibrograph" | "oiling";

const WORKSHOPS: { key: WorkshopKey; label: string }[] = [
  { key: "kinematic", label: "1. Banc cinématique" },
  { key: "vibrograph", label: "2. Vibrographe & tic-tac" },
  { key: "oiling", label: "3. Lubrification 9415" },
];

export default function EchappementPage(): React.JSX.Element {
  const [loupeStep, setLoupeStep] = useState<MasterStep | null>(null);
  const [workshop, setWorkshop] = useState<WorkshopKey>("kinematic");
  const closeLoupe = useCallback((): void => setLoupeStep(null), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-100 dark:from-[#111827] dark:to-[#0b0f17] py-10 sm:py-14">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/pratique" className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Retour aux modules pratiques
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Étape 09 · Organes réglants · NIHS & ISO 3159
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              L’échappement suisse & le balancier-spiral
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-200">
                Le cœur battant de la montre
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Le savoir d’établi pour comprendre et contrôler l’échappement : le cycle en 3 temps, le tirage et les sécurités, le réglage du balancier-spiral, la lubrification à la Moebius 9415 et la lecture du vibrographe.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 font-mono text-xs">
              {["Levée 50°-52°", "Tirage 12°-15°", "Moebius 9415", "Repère < 0.6 ms"].map((b) => (
                <span key={b} className="px-3 py-1 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">{b}</span>
              ))}
              <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400">Loupe 10x sur chaque schéma</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {STEPS.map((s) => {
          const Svg = s.Svg;
          return (
            <section key={s.id} id={`step${s.id}`} className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm dark:shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30">
                      ÉTAPE {String(s.id).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{s.tag}</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{s.title}</h2>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{s.intro}</p>
                  <div className="space-y-3 pt-1">
                    {s.cards.map((c) => (
                      <div key={c.title} className={`p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0f17] border ${ACCENT_BORDER[c.accent]}`}>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${ACCENT_TEXT[c.accent]}`}>
                            {c.accent === "red" && <AlertTriangle className="w-3.5 h-3.5" />}
                            {c.title}
                          </h3>
                          {c.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap">{c.badge}</span>
                          )}
                        </div>
                        {c.body && <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">{c.body}</p>}
                        {c.list && (
                          <ul className="text-xs text-red-800 dark:text-red-300/90 mt-1.5 space-y-1 list-disc list-inside">
                            {c.list.map((li) => (
                              <li key={li}>{li}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 w-full flex flex-col items-center lg:sticky lg:top-24">
                  <div className="w-full p-2 bg-slate-100 dark:bg-[#070a10] rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button type="button" onClick={() => setLoupeStep(s)} className="block w-full cursor-zoom-in" aria-label={`Agrandir : ${s.loupeTitle}`}>
                      <Svg />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoupeStep(s)}
                      className="mt-3 w-full py-2.5 px-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Ouvrir dans la loupe d’atelier 10x
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 text-center">{s.caption}</p>
                </div>
              </div>
            </section>
          );
        })}

        <section id="ateliers" className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase font-mono font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30">
              Pratique à l’établi
            </span>
            <h2 className="text-3xl font-extrabold mt-3 tracking-tight">Les 3 simulateurs d’atelier</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Observez la cinématique, réglez marche et repère, puis entraînez votre dosage de 9415.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {WORKSHOPS.map((w) => (
              <button
                key={w.key}
                type="button"
                onClick={() => setWorkshop(w.key)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold border transition ${
                  workshop === w.key
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm dark:shadow-2xl">
            {workshop === "kinematic" && <KinematicWorkshop />}
            {workshop === "vibrograph" && <VibrographWorkshop />}
            {workshop === "oiling" && <OilingWorkshop />}
          </div>
        </section>

        <footer className="pt-10 pb-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-mono text-slate-500 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Échappement suisse & balancier-spiral · Module pratique AFP / CFC
          </p>
          <p>Références : normes NIHS, ISO 3159, lubrifiants Moebius</p>
        </footer>
      </main>

      <LoupeModal step={loupeStep} onClose={closeLoupe} />
    </div>
  );
}
