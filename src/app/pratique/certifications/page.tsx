"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  Compass,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sliders,
  Flame,
  Magnet,
  Eye,
  FileText,
  Clock
} from "lucide-react";

// ==============================================================
// 1. SCHÉMAS TECHNIQUES VECTORIELS SUISSES (SVG PURS)
// ==============================================================

// SVG 1 : Banc d'Épreuve COSC & 5 Positions ISO 3159
function CoscBenchSVG({ activePos = "CH" }: { activePos?: string }) {
  const positions: Record<string, { label: string; angle: number; desc: string }> = {
    CH: { label: "Cadran Haut (Horizontale)", angle: 0, desc: "Frottement maximal sur le bout des pivots de balancier." },
    FH: { label: "Fond Haut (Horizontale)", angle: 180, desc: "Contrôle du jeu de hauteur et de l'isochronisme au plat." },
    "6H": { label: "6 Heures (Verticale)", angle: 90, desc: "Couronne vers le bas, frottement sur la portée latérale des pivots." },
    "9H": { label: "9 Heures (Verticale)", angle: 180, desc: "Position standard de porter au poignet gauche." },
    "3H": { label: "3 Heures (Verticale)", angle: 0, desc: "Couronne vers le haut, frottement latéral opposé." }
  };

  const curr = positions[activePos] || positions["CH"];

  return (
    <svg viewBox="0 0 500 260" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
        <radialGradient id="dialGradDark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="80%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="goldCase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>

      {/* Cadre Fond Atelier */}
      <rect width="500" height="260" rx="10" className="fill-slate-100 dark:fill-[#070a10] stroke-slate-300 dark:stroke-[#1f293d]" strokeWidth="1.5" />

      {/* Grille technique d'établi */}
      <g opacity="0.12">
        <path d="M0,50 H500 M0,100 H500 M0,150 H500 M0,200 H500" className="stroke-slate-400 dark:stroke-[#94a3b8]" strokeDasharray="3,3" />
        <path d="M50,0 V260 M100,0 V260 M150,0 V260 M200,0 V260 M250,0 V260 M300,0 V260 M350,0 V260 M400,0 V260 M450,0 V260" className="stroke-slate-400 dark:stroke-[#94a3b8]" strokeDasharray="3,3" />
      </g>

      {/* Support de banc d'essai oscillant */}
      <rect x="35" y="45" width="200" height="170" rx="8" className="fill-white dark:fill-[#0d121f] stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
      <text x="45" y="65" className="fill-slate-500 dark:fill-slate-400 font-mono text-[9px] font-bold tracking-wider uppercase">Support Cardan COSC</text>

      {/* Boîtier de montre sur rotule cardan */}
      <g transform="translate(135, 135)">
        {/* Anneau rotatif */}
        <circle cx="0" cy="0" r="62" fill="none" className="stroke-amber-500/40 dark:stroke-amber-500/30" strokeWidth="2" strokeDasharray="6,4" />
        
        {/* Boîtier de montre */}
        <circle cx="0" cy="0" r="50" fill="url(#goldCase)" stroke="#854d0e" strokeWidth="2" />
        <circle cx="0" cy="0" r="42" className="fill-slate-100 dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />

        {/* Index des 12 heures */}
        <line x1="0" y1="-38" x2="0" y2="-32" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="0" x2="32" y2="0" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="38" x2="0" y2="32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="-38" y1="0" x2="-32" y2="0" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* Couronne de remontoir orientée */}
        <rect x="49" y="-6" width="7" height="12" rx="1.5" fill="#ca8a04" stroke="#854d0e" strokeWidth="0.8" />

        {/* Balancier visible au centre */}
        <circle cx="0" cy="8" r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,2" />
        <line x1="-12" y1="8" x2="12" y2="8" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="0" cy="8" r="3" fill="#0284c7" />

        {/* Repère Position Active */}
        <circle cx="0" cy="0" r="3" fill="#e11d48" />
        <text x="0" y="-12" textAnchor="middle" className="fill-slate-900 dark:fill-white font-mono text-[11px] font-black">{activePos}</text>
      </g>

      {/* Enceinte Thermique Régulée (Droite) */}
      <rect x="255" y="45" width="210" height="170" rx="8" className="fill-white dark:fill-[#0d121f] stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
      <text x="268" y="65" className="fill-amber-600 dark:fill-amber-400 font-mono text-[10px] font-bold tracking-wider uppercase">Enceinte Thermique ISO 3159</text>

      {/* 3 Paliers Thermiques */}
      <g transform="translate(268, 80)">
        {/* 8°C */}
        <rect x="0" y="0" width="60" height="42" rx="5" className="fill-sky-50 dark:fill-sky-950/40 stroke-sky-400 dark:stroke-sky-600" strokeWidth="1" />
        <text x="30" y="18" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 font-mono text-[11px] font-bold">8°C</text>
        <text x="30" y="32" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[8px]">Froid (24h)</text>

        {/* 23°C */}
        <rect x="67" y="0" width="60" height="42" rx="5" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-500 dark:stroke-emerald-600" strokeWidth="1.5" />
        <text x="97" y="18" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 font-mono text-[11px] font-bold">23°C</text>
        <text x="97" y="32" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[8px]">Étalon (11j)</text>

        {/* 38°C */}
        <rect x="134" y="0" width="60" height="42" rx="5" className="fill-rose-50 dark:fill-rose-950/40 stroke-rose-400 dark:stroke-rose-600" strokeWidth="1" />
        <text x="164" y="18" textAnchor="middle" className="fill-rose-700 dark:fill-rose-400 font-mono text-[11px] font-bold">38°C</text>
        <text x="164" y="32" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-mono text-[8px]">Chaud (24h)</text>
      </g>

      {/* Résumé de l'épreuve */}
      <g transform="translate(268, 142)">
        <rect x="0" y="0" width="185" height="60" rx="6" className="fill-slate-50 dark:fill-black/30 stroke-slate-200 dark:stroke-white/5" strokeWidth="1" />
        <text x="10" y="16" className="fill-slate-900 dark:fill-white font-mono text-[9.5px] font-bold">Position : {curr.label}</text>
        <text x="10" y="32" className="fill-slate-600 dark:fill-slate-300 font-sans text-[8.5px] leading-tight">Durée totale épreuve : 15 jours consécutifs.</text>
        <text x="10" y="47" className="fill-amber-600 dark:fill-amber-400 font-mono text-[8.5px] font-bold">Tolérance M : -4.0 à +6.0 s/24h</text>
      </g>

      {/* Cartouche Bas officiel */}
      <rect x="20" y="224" width="460" height="26" rx="5" className="fill-amber-50 dark:fill-black/50 stroke-amber-500/40 dark:stroke-amber-500/30" strokeWidth="1" />
      <circle cx="34" cy="237" r="4" fill="#eab308" />
      <text x="46" y="240" className="fill-slate-800 dark:fill-amber-300 font-mono text-[8.5px] font-bold">
        NORME SUISSE NIHS 95-11 / ISO 3159 : 5 POSITIONS · 3 TEMPÉRATURES · 15 JOURS SANS INTERRUPTION
      </text>
    </svg>
  );
}

// SVG 2 : Poinçon de Genève & Micro-Anglage Horloger
function PoinconGeneveSVG() {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rhodiumSteel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="bluedScrew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      <rect width="500" height="240" rx="10" className="fill-slate-100 dark:fill-[#070a10] stroke-slate-300 dark:stroke-[#1f293d]" strokeWidth="1.5" />

      {/* Côtes de Genève d'arrière plan */}
      <g opacity="0.18">
        <rect x="30" y="30" width="200" height="160" rx="8" fill="url(#rhodiumSteel)" stroke="#475569" strokeWidth="1.5" />
        <path d="M40,30 V190 M60,30 V190 M80,30 V190 M100,30 V190 M120,30 V190 M140,30 V190 M160,30 V190 M180,30 V190 M200,30 V190 M220,30 V190" stroke="#fff" strokeWidth="2" opacity="0.4" />
      </g>

      {/* Découpe d'anglage poli miroir (zoom 20x) */}
      <g transform="translate(60, 50)">
        {/* Pont en laiton rhodié */}
        <path d="M0,40 L90,10 L150,50 L140,110 L20,110 Z" fill="url(#rhodiumSteel)" stroke="#475569" strokeWidth="1.5" />
        
        {/* Biseau d'anglage poli brillant à 45° */}
        <path d="M0,40 L90,10 L150,50" fill="none" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" />
        <text x="40" y="20" className="fill-amber-700 dark:fill-[#fef08a] font-mono text-[9px] font-bold">Anglage poli miroir 45°</text>

        {/* Vis bleuie thermiquement (300°C) avec fente anglée */}
        <circle cx="50" cy="80" r="14" fill="url(#bluedScrew)" stroke="#93c5fd" strokeWidth="1.2" />
        <line x1="39" y1="80" x2="61" y2="80" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        <text x="70" y="84" className="fill-blue-700 dark:fill-[#93c5fd] font-mono text-[8.5px]">Vis bleuie chanfreinée</text>

        {/* Moulure de rubis diamantée */}
        <circle cx="110" cy="80" r="12" fill="#fda4af" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="110" cy="80" r="6" fill="#be123c" />
        <circle cx="110" cy="80" r="16" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="95" y="106" className="fill-rose-700 dark:fill-[#fda4af] font-mono text-[8px]">Moulure diamantée</text>
      </g>

      {/* Sceau Officiel du Poinçon de Genève (Droite) */}
      <rect x="260" y="30" width="210" height="160" rx="8" className="fill-white dark:fill-[#0d121f] stroke-amber-500/40 dark:stroke-amber-500/30" strokeWidth="1.5" />
      
      {/* Blason Genève Stylisé */}
      <g transform="translate(365, 85)">
        <circle cx="0" cy="0" r="32" className="fill-amber-500/10 stroke-amber-500" strokeWidth="2" />
        {/* Aigle héraldique (gauche) */}
        <path d="M-6,-18 L-14,-5 L-4,0 L-12,12 L-4,10 L-6,18" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
        {/* Clé d'or de Saint-Pierre (droite) */}
        <path d="M8,-18 V18 M8,-10 H14 M8,-3 H12 M4,18 A4,4 0 0,0 12,18" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      </g>

      <text x="365" y="132" textAnchor="middle" className="fill-slate-900 dark:fill-white font-sans text-xs font-black tracking-wide">POINÇON DE GENÈVE</text>
      <text x="365" y="146" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono text-[9px] font-bold">Loi de 1886 · Règlement 2011</text>
      
      <g transform="translate(275, 155)">
        <text x="0" y="10" className="fill-slate-600 dark:fill-slate-300 font-sans text-[8.5px]">• Zéro ressort-fil toléré (acier forgé/poli)</text>
        <text x="0" y="22" className="fill-slate-600 dark:fill-slate-300 font-sans text-[8.5px]">• Dentures pignons polies au bois de sureau</text>
      </g>

      {/* Cartouche Bas */}
      <rect x="20" y="202" width="460" height="26" rx="5" className="fill-amber-50 dark:fill-black/50 stroke-amber-500/40 dark:stroke-amber-500/30" strokeWidth="1" />
      <circle cx="34" cy="215" r="4" fill="#ca8a04" />
      <text x="46" y="218" className="fill-slate-800 dark:fill-amber-300 font-mono text-[8.5px] font-bold">
        CRITÈRES D'ÉTAT : ANGLAGES MAIN · VIS POLIES MIROIR · FLANCS ÉTIRÉS AU CABRON · PRÉCISION EMBOÎTÉE
      </text>
    </svg>
  );
}

// SVG 3 : Test Antimagnétique METAS à 15'000 Gauss
function MetasMagneticSVG() {
  return (
    <svg viewBox="0 0 500 230" className="w-full h-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="magFlux" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect width="500" height="230" rx="10" className="fill-slate-100 dark:fill-[#070a10] stroke-slate-300 dark:stroke-[#1f293d]" strokeWidth="1.5" />

      {/* Pôles de l'électroaimant géant (1.5 Tesla) */}
      <rect x="25" y="45" width="60" height="135" rx="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
      <text x="55" y="118" textAnchor="middle" fill="#fff" font-mono font-bold text-xl>N</text>

      <rect x="415" y="45" width="60" height="135" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
      <text x="445" y="118" textAnchor="middle" fill="#fff" font-mono font-bold text-xl>S</text>

      {/* Lignes de champ magnétique hyper dense */}
      <g stroke="url(#magFlux)" strokeWidth="1.5" strokeDasharray="5,3">
        <path d="M85,60 C200,45 300,45 415,60" fill="none" />
        <path d="M85,85 C200,75 300,75 415,85" fill="none" />
        <path d="M85,110 C200,105 300,105 415,110" fill="none" strokeWidth="2.5" />
        <path d="M85,135 C200,140 300,140 415,135" fill="none" />
        <path d="M85,160 C200,175 300,175 415,160" fill="none" />
      </g>

      {/* Montre au centre dans le flux de 15'000 Gauss */}
      <g transform="translate(250, 112)">
        <circle cx="0" cy="0" r="48" className="fill-white dark:fill-[#0d121f] stroke-amber-500" strokeWidth="2.5" />
        {/* Spiral Silicium Si14 amagnétique */}
        <path d="M0,0 A5,5 0 0,1 6,4 A10,10 0 0,1 0,12 A16,16 0 0,1 -15,0 A22,22 0 0,1 0,-20 A28,28 0 0,1 26,6" fill="none" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="0" cy="0" r="3.5" fill="#facc15" />
        
        {/* Échappement non-ferromagnétique */}
        <text x="0" y="32" textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-mono text-[8.5px] font-bold">Spiral Silicium Si14</text>
      </g>

      {/* Badge Résistance 15'000 Gauss */}
      <rect x="175" y="16" width="150" height="22" rx="4" className="fill-purple-500/20 stroke-purple-500 text-purple-700 dark:text-purple-300" strokeWidth="1" />
      <text x="250" y="31" textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider">
        🧲 15'000 GAUSS (1.5 TESLA)
      </text>

      {/* Cartouche Bas */}
      <rect x="20" y="194" width="460" height="24" rx="4" className="fill-purple-50 dark:fill-black/50 stroke-purple-500/40 dark:stroke-purple-500/30" strokeWidth="1" />
      <circle cx="34" cy="206" r="3.5" fill="#8b5cf6" />
      <text x="46" y="209" className="fill-slate-800 dark:fill-purple-200 font-mono text-[8px] font-bold">
        CERTIFICATION METAS : TOLÉRANCE 0 À +5 S/JOUR EMBOÎTÉE · ZÉRO DÉVIATION SOUS CHAMP EXTRÊME
      </text>
    </svg>
  );
}

// ==============================================================
// 2. DONNÉES DU CALCULATEUR D'AUDIT COSC (ISO 3159)
// ==============================================================

interface CoscParam {
  id: string;
  code: string;
  title: string;
  unit: string;
  min: number;
  max: number;
  standard: string;
  desc: string;
}

const COSC_CRITERIA: CoscParam[] = [
  {
    id: "m",
    code: "M",
    title: "Marche Diurne Moyenne",
    unit: "s/j",
    min: -4.0,
    max: 6.0,
    standard: "-4.0 à +6.0 s/j",
    desc: "Moyenne des marches quotidiennes observées sur les 10 premiers jours d'épreuve (5 positions)."
  },
  {
    id: "v",
    code: "V",
    title: "Variation Moyenne des Marches",
    unit: "s/j",
    min: 0.0,
    max: 2.0,
    standard: "≤ 2.0 s/j",
    desc: "Moyenne arithmétique des variations de marche calculées dans les 5 positions."
  },
  {
    id: "vmax",
    code: "Vmax",
    title: "Plus Grande Variation",
    unit: "s/j",
    min: 0.0,
    max: 5.0,
    standard: "≤ 5.0 s/j",
    desc: "Écart maximal relevé entre deux marches consécutives dans une même position."
  },
  {
    id: "d",
    code: "D",
    title: "Écart Horizontal / Vertical",
    unit: "s/j",
    min: -6.0,
    max: 8.0,
    standard: "-6.0 à +8.0 s/j",
    desc: "Différence de marche entre les positions horizontales (plat : CH, FH) et verticales (pendu : 6H, 9H, 3H)."
  },
  {
    id: "p",
    code: "P",
    title: "Plus Grand Écart des Marches",
    unit: "s/j",
    min: 0.0,
    max: 10.0,
    standard: "≤ 10.0 s/j",
    desc: "Différence maximale entre la marche la plus rapide et la plus lente sur l'ensemble des 10 premiers jours."
  },
  {
    id: "c",
    code: "C",
    title: "Variation Thermique",
    unit: "s/j/°C",
    min: -0.6,
    max: 0.6,
    standard: "≤ ±0.60 s/j/°C",
    desc: "Comportement du balancier et du spiral lors du passage de 8°C à 38°C (coefficient thermique)."
  },
  {
    id: "r",
    code: "R",
    title: "Reprise de Marche",
    unit: "s/j",
    min: -5.0,
    max: 5.0,
    standard: "≤ ±5.0 s/j",
    desc: "Différence entre la marche du 15ème jour et celle des deux premiers jours (stabilité dans le temps)."
  }
];

// Profils d'atelier pré-calibrés
const BENCH_PRESETS = {
  excellent: {
    name: "Calibre Réglé Excellence (Chronomètre Validé)",
    badge: "🇨🇭 BULLETIN COSC VALIDÉ",
    color: "emerald",
    values: { m: 1.8, v: 0.7, vmax: 2.1, d: 2.4, p: 4.8, c: 0.15, r: 0.9 },
    comment: "Réglage d'établi remarquable. Isochronisme parfait, amplitude pendu > 260° et compensation bimétallique maîtrisée."
  },
  magnetized: {
    name: "Calibre Magnétisé (Rejet COSC Immédiat)",
    badge: "❌ ÉCHEC : SPIRAL MAGNÉTISÉ",
    color: "rose",
    values: { m: 42.5, v: 8.4, vmax: 14.2, d: 18.0, p: 35.0, c: 1.8, r: 12.0 },
    comment: "Spire collée par magnétisme résiduel (> 60 Gauss). Fréquence altérée, avance massive. Démagnétisation requise."
  },
  platPendu: {
    name: "Défaut d'Ébats Plat / Pendu (Rejet Critère D)",
    badge: "❌ ÉCHEC : ÉCART PLAT/PENDU D > 8",
    color: "amber",
    values: { m: 3.5, v: 1.4, vmax: 3.8, d: 11.2, p: 9.5, c: 0.4, r: 2.1 },
    comment: "Frottement anormal au pendu : mauvais état de surface des portées de pivots de balancier ou cheville de plateau frottant."
  },
  thermalError: {
    name: "Défaut Thermique (Rejet Critère C)",
    badge: "❌ ÉCHEC : VARIATION THERMIQUE C > 0.6",
    color: "rose",
    values: { m: 2.1, v: 1.1, vmax: 3.2, d: 4.1, p: 7.2, c: 0.88, r: 1.8 },
    comment: "Mauvaise compensation thermique du spiral ou hétérogénéité métallurgique de l'alliage balancier (Nivarox / Glucydur)."
  }
};

// ==============================================================
// 3. TABLEAU COMPARATIF DES 4 GRANDS LABELS SUISSES
// ==============================================================

const SWISS_CERTIFICATIONS_COMPASS = [
  {
    name: "COSC (ISO 3159)",
    organism: "Contrôle Officiel Suisse des Chronomètres",
    scope: "Mouvement nu non emboîté",
    precision: "-4.0 à +6.0 s/24h",
    duration: "15 jours consécutifs",
    magnetism: "Non mesuré (standard NIHS)",
    finishing: "Aucune exigence décorative",
    waterproof: "Non testé",
    badge: "Chronomètre Officiel",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
  },
  {
    name: "Poinçon de Genève",
    organism: "État de Genève (TIMELAB)",
    scope: "Mouvement + Montre finie emboîtée",
    precision: "Écart ≤ 1 min / 7 jours",
    duration: "7 jours de contrôle emboîté",
    magnetism: "Standard",
    finishing: "Exigence absolue (anglages, vis polies, pas de ressort-fil)",
    waterproof: "Testé en surpression",
    badge: "Haute Horlogerie Genevoise",
    badgeColor: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
  },
  {
    name: "METAS Master Chronometer",
    organism: "Institut Fédéral de Métrologie Suisse",
    scope: "Montre complète emboîtée (après COSC)",
    precision: "0.0 à +5.0 s/24h (zéro retard)",
    duration: "10 jours d'épreuves dures",
    magnetism: "15'000 Gauss (1.5 Tesla)",
    finishing: "Haute qualité manufacture",
    waterproof: "Testé en immersion réelle",
    badge: "Précision & Amagnétisme Extrême",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
  },
  {
    name: "Qualité Fleurier (FQF)",
    organism: "Fondation Qualité Fleurier",
    scope: "Mouvement + Montre finie 100% Suisse",
    precision: "0.0 à +5.0 s/24h (Machine Fleuritest)",
    duration: "COSC + 21j Chronofiable + 24h Fleuritest",
    magnetism: "Standard ISO",
    finishing: "100% fabriqué en Suisse, finitions certifiées",
    waterproof: "Testé selon normes plongeur",
    badge: "Excellence Globale 100% Swiss",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
  }
];

// ==============================================================
// 4. PARCOURS MÉTIER SUISSE (RÉFÉRENTIEL AFP VS CFC)
// ==============================================================

const SWISS_DIPLOMAS = [
  {
    level: "AFP (2 Ans)",
    title: "Opérateur en Horlogerie / Praticien d'Établi",
    objective: "Maîtrise des gestes fondamentaux d'assemblage, huilage calibré et emboîtage en série.",
    skills: [
      "Démontage, lavage aux paniers et remontage méthodique de calibres simples (Unitas 6497, ETA 2801).",
      "Huilage officiel NIHS selon cartographie (Moebius 9010, HP-1300, 9415).",
      "Pose de cadrans, chassage d'aiguilles aux burins sans marquage ni parallélisme faux.",
      "Emboîtage, pose de joints d'étanchéité et test d'air par déformation (Witschi Proofmaster)."
    ],
    tools: "Brucelles Dumont N°1 à N°5, tournevis calibrés en cNm, huiliers automatiques Bergeon."
  },
  {
    level: "CFC (3 à 4 Ans)",
    title: "Horloger Praticien & Horloger Complet",
    objective: "Diagnostic intégral, rhabillage de complications (automatique, date, chronographe 7750) et réglage chronométrique COSC.",
    skills: [
      "Repassage de l'échappement suisse : réglage de chute, tirage, dard, cornes et levées d'ancre.",
      "Réglage dynamique sur Witschi Chronoscope dans les 5 positions d'établi.",
      "Correction d'équilibrage du balancier au compas aux huit chiffres et centrage de spiral.",
      "Rhabillage complet de calibres automatiques et chronographes à cames ou roue à colonnes."
    ],
    tools: "Potence micrométrique, banc Witschi, machine à laver rotative Greiner, brucelles à cambrer."
  }
];

// ==============================================================
// 5. MINI-QUIZ D'EXCELLENCE HORLOGÈRE (10 QUESTIONS D'ATELIER)
// ==============================================================

interface QuestionItem {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "Combien de positions et de températures sont imposées par la norme ISO 3159 (COSC) ?",
    options: [
      "3 positions et 2 températures pendant 10 jours",
      "5 positions d'établi et 3 températures (8°C, 23°C, 38°C) pendant 15 jours",
      "6 positions et 1 température ambiante pendant 7 jours",
      "Uniquement la position horizontale à 20°C"
    ],
    correct: 1,
    explanation: "Le COSC applique strictement la norme ISO 3159 : 15 jours consécutifs de mesures dans 5 positions (CH, FH, 6H, 9H, 3H) et sous 3 températures thermo-régulées (8°C, 23°C et 38°C)."
  },
  {
    id: 2,
    question: "Quelle est la tolérance de marche diurne moyenne (M) admise par le COSC pour un calibre > 20 mm ?",
    options: [
      "0.0 à +5.0 s/jour",
      "-4.0 à +6.0 s/jour",
      "±10.0 s/jour",
      "-2.0 à +2.0 s/jour"
    ],
    correct: 1,
    explanation: "La tolérance officielle COSC pour la marche moyenne M est de -4.0 à +6.0 s/24h. En comparaison, le METAS exige 0.0 à +5.0 s/24h (aucun retard autorisé)."
  },
  {
    id: 3,
    question: "Quel niveau d'intensité de champ magnétique la certification METAS Master Chronometer applique-t-elle ?",
    options: [
      "4'800 A/m (norme de base ISO 764)",
      "1'000 Gauss (comme la Rolex Milgauss historique)",
      "15'000 Gauss (soit 1.5 Tesla), avec maintien d'une déviation nulle",
      "50'000 Gauss"
    ],
    correct: 2,
    explanation: "METAS soumet le mouvement nu puis la montre emboîtée à un électroaimant de 15'000 Gauss (1.5 Tesla). Seuls les échappements amagnétiques (spiral silicium Si14 / Nivachron) franchissent ce test sans arrêt."
  },
  {
    id: 4,
    question: "Parmi ces éléments, lequel est STRICTEMENT INTERDIT par le règlement du Poinçon de Genève ?",
    options: [
      "L'acier poli miroir",
      "L'utilisation de vis bleuies à la flamme",
      "Les ressorts-fils (ressorts en fil d'acier plié)",
      "Les chatons en or"
    ],
    correct: 2,
    explanation: "Le Poinçon de Genève proscrit catégoriquement les ressorts-fils. Tous les ressorts doivent être usinés dans la masse, découpés, évidés et polis sur leurs flancs."
  },
  {
    id: 5,
    question: "Quelle est la particularité unique de la machine Fleuritest (Qualité Fleurier) ?",
    options: [
      "Elle plonge la montre dans l'azote liquide",
      "C'est un simulateur 3D de porté réel au poignet pendant 24h avec caméra haute vitesse",
      "Elle soumet le boîtier à des tirs de balles de plomb",
      "Elle teste uniquement le son du tic-tac"
    ],
    correct: 1,
    explanation: "Le Fleuritest reproduit fidèlement les accélérations tridimensionnelles du bras humain (marche, golf, bureau) sur 24 heures. La montre doit rester dans la plage 0 à +5 s/j."
  },
  {
    id: 6,
    question: "Dans le cadre de l'apprentissage suisse, que signifie l'acronyme AFP ?",
    options: [
      "Association Fédérale des Professionnels",
      "Attestation Fédérale de Formation Professionnelle (cursus d'opérateur en 2 ans)",
      "Atelier Français de Précision",
      "Agrément Fédéral de Production"
    ],
    correct: 1,
    explanation: "L'AFP (2 ans) est le diplôme fédéral suisse initial menant au métier d'opérateur/praticien en horlogerie, avant la poursuite éventuelle vers le CFC d'horloger complet (3-4 ans)."
  },
  {
    id: 7,
    question: "Que mesure le critère D dans le bulletin officiel ISO 3159 du COSC ?",
    options: [
      "Le diamètre total du barillet",
      "La différence de marche entre les positions horizontales (plat) et verticales (pendu)",
      "La dureté de la boîte en Vickers",
      "Le décalage de saut de la date à minuit"
    ],
    correct: 1,
    explanation: "Le critère D (différence Plat/Pendu) doit être compris entre -6.0 et +8.0 s/j. Un écart excessif révèle un défaut de jeu de hauteur (ébat axial) ou un pivotement dissymétrique."
  },
  {
    id: 8,
    question: "Quelle est la principale différence entre le COSC et la certification METAS au niveau du produit testé ?",
    options: [
      "Le COSC teste la montre finie, le METAS teste le spiral seul",
      "Le COSC teste le mouvement non emboîté, alors que le METAS teste la montre complète finie et étanche",
      "Il n'y a aucune différence, ce sont les mêmes épreuves",
      "Le METAS ne s'applique qu'aux montres à quartz"
    ],
    correct: 1,
    explanation: "Le COSC certifie des mouvements nus montés sur des bâtis provisoires. METAS certifie la montre définitivement assemblée, emboîtée, avec son cadran, ses aiguilles et son étanchéité opérationnelle."
  },
  {
    id: 9,
    question: "Quel coefficient thermique maximal (C) un chronomètre COSC ne doit-il pas dépasser ?",
    options: [
      "±0.60 s/jour/°C entre 8°C et 38°C",
      "±5.0 s/jour/°C",
      "0.00 s/jour/°C (indifférence thermique totale requise)",
      "±2.5 s/jour/°C"
    ],
    correct: 0,
    explanation: "Le critère C plafonne la dérive thermique à 0.60 s/j/°C. Cela atteste de la parfaite compensation du balancier et de l'alliage thermo-compensateur du spiral."
  },
  {
    id: 10,
    question: "Quel organisme d'audit indépendant certifie le Poinçon de Genève depuis la réforme de 2011 ?",
    options: [
      "Le COSC de La Chaux-de-Fonds",
      "TIMELAB (Fondation du Laboratoire d'Horlogerie et de Micro-Ingénierie de Genève)",
      "L'Académie Horlogère des Créateurs Indépendants (AHCI)",
      "Le Ministère de l'Économie Suisse"
    ],
    correct: 1,
    explanation: "Depuis 2011, la gestion et le contrôle d'assermentation du Poinçon de Genève sont confiés à la fondation d'État indépendante TIMELAB à Genève."
  }
];

// ==============================================================
// 6. COMPOSANT PRINCIPAL DE LA PAGE
// ==============================================================

export default function CertificationsPage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"cosc" | "labels" | "diplomas" | "quiz">("cosc");
  
  // Position active pour l'animation du banc COSC
  const [activeCoscPos, setActiveCoscPos] = useState<string>("CH");

  // Valeurs du simulateur COSC interactif
  const [coscValues, setCoscValues] = useState<{
    m: number;
    v: number;
    vmax: number;
    d: number;
    p: number;
    c: number;
    r: number;
  }>(BENCH_PRESETS.excellent.values);

  // Preset actif
  const [activePreset, setActivePreset] = useState<string>("excellent");

  // State du quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<number, boolean>>({});

  // Fonction de validation des critères COSC
  const evaluateCriterion = (param: CoscParam, val: number) => {
    return val >= param.min && val <= param.max;
  };

  const isGlobalCoscPassed = COSC_CRITERIA.every((param) => {
    const val = coscValues[param.id as keyof typeof coscValues];
    return evaluateCriterion(param, val);
  });

  const handleAnswerQuiz = (qId: number, optionIdx: number) => {
    if (quizAnswers[qId] !== undefined && quizAnswers[qId] !== null) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowQuizExplanations((prev) => ({ ...prev, [qId]: true }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowQuizExplanations({});
  };

  const quizScore = Object.entries(quizAnswers).filter(([qId, ans]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qId));
    return q && ans === q.correct;
  }).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation Retour */}
        <div className="flex items-center justify-between">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-sm font-mono text-amber-600 dark:text-amber-400 hover:text-amber-500 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l'Atelier Pratique
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Métrologie Certifiée · Normes ISO 3159 & NIHS
          </div>
        </div>

        {/* En-tête Principal */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            🇨🇭 Haute Horlogerie Suisse · Poinçons & Métrologie
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">Normes d'Excellence</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Épreuves chronométriques <span className="font-mono text-amber-500 font-bold">COSC (ISO 3159)</span>, Poinçon de Genève, Master Chronometer METAS à 15'000 Gauss et référentiel de compétences professionnelles AFP / CFC.
          </p>
        </div>

        {/* Barre d'onglets principale */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
          {[
            { id: "cosc", label: "⚖️ Épreuves COSC & ISO 3159", desc: "Banc d'épreuve & Calculateur" },
            { id: "labels", label: "🛡️ Poinçons d'Excellence", desc: "Genève · METAS · Fleurier" },
            { id: "diplomas", label: "🎓 Parcours AFP & CFC", desc: "Référentiel des compétences" },
            { id: "quiz", label: "🧠 Test d'Établi (10 Q)", desc: "Examen des normes suisses" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* ONGLET 1 : COSC ISO 3159 BANC D'ÉPREUVE & CALCULATEUR */}
        {/* ============================================================== */}
        {activeTab === "cosc" && (
          <div className="space-y-8">

            {/* Section 1 : Schéma Vectoriel du Banc Cardan */}
            <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-500" /> Banc d'Épreuve Chronométrique Officiel COSC
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Protocole officiel des 15 jours consécutifs · 5 positions d'établi · 3 enceintes thermiques
                  </p>
                </div>
                {/* Sélecteur de position pour animer le banc */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/40 p-1 rounded-xl">
                  {["CH", "FH", "6H", "9H", "3H"].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setActiveCoscPos(pos)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                        activeCoscPos === pos
                          ? "bg-amber-500 text-slate-950 shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schéma Vectoriel SVG Interactif */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 flex items-center justify-center">
                  <CoscBenchSVG activePos={activeCoscPos} />
                </div>
                <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold">
                    🎯 Règle d'Or ISO 3159 :
                  </div>
                  <p className="font-sans text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Le mouvement est remonté chaque jour à heure fixe avec une clé calibrée. Les mesures optiques enregistrent l'avance ou le retard journalier à la milliseconde près.
                  </p>
                  <div className="space-y-1.5 border-t border-slate-100 dark:border-white/5 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <div>• <strong>Jours 1 à 2 :</strong> 6 Heures (23°C)</div>
                    <div>• <strong>Jours 3 à 4 :</strong> 9 Heures (23°C)</div>
                    <div>• <strong>Jours 5 à 6 :</strong> 3 Heures (23°C)</div>
                    <div>• <strong>Jours 7 à 8 :</strong> Cadran Haut CH (23°C)</div>
                    <div>• <strong>Jours 9 à 10 :</strong> Fond Haut FH (23°C)</div>
                    <div>• <strong>Jours 11 à 13 :</strong> Choc Thermique (8°C / 23°C / 38°C)</div>
                    <div>• <strong>Jours 14 à 15 :</strong> Reprise de marche (23°C)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 : Simulateur d'Audit COSC Interactif (Calculateur d'établi) */}
            <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-500" /> Simulateur d'Audit COSC Interactif
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Modifiez les 7 critères du bulletin officiel ou appliquez un profil d'établi type
                  </p>
                </div>

                {/* Verdict Global */}
                <div className={`px-4 py-2 rounded-xl border font-mono font-bold text-xs sm:text-sm flex items-center gap-2 ${
                  isGlobalCoscPassed
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400"
                }`}>
                  {isGlobalCoscPassed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>BULLETIN OFFICIEL CERTIFIÉ (CHRONOMÈTRE ACCORDÉ)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>BULLETIN REJETÉ (CALIBRE HORS TOLÉRANCE)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Boutons de profils pré-calibrés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(BENCH_PRESETS).map(([key, preset]) => {
                  const isSelected = activePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActivePreset(key);
                        setCoscValues({ ...preset.values });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all font-mono ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/20"
                          : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-amber-500/40 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="font-bold text-xs truncate mb-1">{preset.name}</div>
                      <div className="text-[10px] opacity-75">{preset.badge}</div>
                    </button>
                  );
                })}
              </div>

              {/* Commentaire de l'expert horloger */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="text-amber-500 text-base shrink-0">🔬</span>
                <div>
                  <strong>Diagnostic d'Atelier :</strong> {BENCH_PRESETS[activePreset as keyof typeof BENCH_PRESETS]?.comment}
                </div>
              </div>

              {/* Grille des 7 Critères ISO 3159 avec curseurs interactifs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COSC_CRITERIA.map((crit) => {
                  const currentVal = coscValues[crit.id as keyof typeof coscValues];
                  const isPassed = evaluateCriterion(crit, currentVal);

                  return (
                    <div
                      key={crit.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isPassed
                          ? "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10"
                          : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-400 dark:border-rose-600/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold text-xs flex items-center justify-center">
                          {crit.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isPassed
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        }`}>
                          {isPassed ? "CONFORME" : "REJETÉ"}
                        </span>
                      </div>

                      <div className="space-y-1 mb-2">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">{crit.title}</div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          Norme : <strong className="text-amber-500">{crit.standard}</strong>
                        </div>
                      </div>

                      {/* Valeur actuelle & Contrôle curseur */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5 font-mono">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 dark:text-slate-400 text-[10px]">Valeur Mesurée :</span>
                          <span className={`font-bold ${isPassed ? "text-slate-900 dark:text-white" : "text-rose-500"}`}>
                            {currentVal > 0 && crit.id === "m" ? `+${currentVal.toFixed(1)}` : currentVal.toFixed(1)} {crit.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={crit.min < 0 ? crit.min * 3 : 0}
                          max={crit.max * 2.5}
                          step={crit.id === "c" ? "0.05" : "0.1"}
                          value={currentVal}
                          onChange={(e) => {
                            setActivePreset("custom");
                            setCoscValues({
                              ...coscValues,
                              [crit.id]: parseFloat(e.target.value)
                            });
                          }}
                          className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>

                      <p className="font-sans text-[10px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                        {crit.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 2 : LABELS & POINÇONS D'EXCELLENCE SUISSES */}
        {/* ============================================================== */}
        {activeTab === "labels" && (
          <div className="space-y-8">

            {/* Grille des 2 Schémas Vectoriels d'Excellence */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Carte 1 : Poinçon de Genève */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold flex items-center justify-center">
                      ⚜️
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Poinçon de Genève (Genève Seal)</h3>
                      <span className="text-[10px] font-mono text-slate-400">TIMELAB · Loi cantonale de 1886 · Réforme 2011</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                    FINITIONS & MARCHÉ
                  </span>
                </div>

                <PoinconGeneveSVG />

                <div className="space-y-2 text-xs font-mono">
                  <span className="text-[10px] uppercase font-bold text-amber-500 block">Exigences d'Établi Obligatoires :</span>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] font-sans">
                    <li>• <strong>Anglage à la main :</strong> Arrêtes biseautées polies sans bavure, découverts intérieurs et berçages francs.</li>
                    <li>• <strong>Visserie d'exception :</strong> Têtes de vis polies miroir, fentes chanfreinées, pourtour poli.</li>
                    <li>• <strong>Zéro ressort-fil :</strong> Proscription des ressorts bon marché pliés. Ressorts usinés dans la masse obligatoires.</li>
                    <li>• <strong>Contrôle emboîté :</strong> Épreuve dynamique de marche sur 7 jours avec variation max ≤ 1 min.</li>
                  </ul>
                </div>
              </div>

              {/* Carte 2 : METAS Master Chronometer */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center">
                      🧲
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">METAS Master Chronometer</h3>
                      <span className="text-[10px] font-mono text-slate-400">Institut Fédéral de Métrologie Suisse (Berne)</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                    15'000 GAUSS
                  </span>
                </div>

                <MetasMagneticSVG />

                <div className="space-y-2 text-xs font-mono">
                  <span className="text-[10px] uppercase font-bold text-purple-500 block">Les 8 Épreuves METAS :</span>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] font-sans">
                    <li>• <strong>Champ magnétique 15'000 Gauss :</strong> Passage du mouvement nu puis emboîté sous 1.5 Tesla sans arrêt.</li>
                    <li>• <strong>Précision sans retard :</strong> Tolérance 0 à +5 s/j (aucune seconde de retard admise par la métrologie).</li>
                    <li>• <strong>Autonomie réelle :</strong> Mesure de la réserve de marche à 100% et 33% de charge.</li>
                    <li>• <strong>Étanchéité sous pression d'eau :</strong> Contrôle d'immersion réelle selon la profondeur certifiée.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Matrice Comparative Complète des 4 Grands Labels */}
            <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-lg">
                    📊
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Matrice Comparative des 4 Poinçons & Labels Suisses</h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Différences techniques fondamentales selon les référentiels officiels</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
                      <th className="p-3 text-slate-900 dark:text-white">Certification</th>
                      <th className="p-3 text-slate-900 dark:text-white">Organisme</th>
                      <th className="p-3 text-slate-900 dark:text-white">Objet Testé</th>
                      <th className="p-3 text-slate-900 dark:text-white">Précision Diurne</th>
                      <th className="p-3 text-slate-900 dark:text-white">Magnétisme</th>
                      <th className="p-3 text-slate-900 dark:text-white">Finitions Décoratives</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {SWISS_CERTIFICATIONS_COMPASS.map((row) => (
                      <tr key={row.name} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition">
                        <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                          {row.name}
                          <span className={`block text-[9px] px-1.5 py-0.5 rounded border w-fit mt-1 ${row.badgeColor}`}>
                            {row.badge}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 font-sans">{row.organism}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 font-sans">{row.scope}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{row.precision}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{row.magnetism}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 font-sans text-[11px]">{row.finishing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 3 : PARCOURS DIPLÔMES & RÉFÉRENTIEL AFP / CFC */}
        {/* ============================================================== */}
        {activeTab === "diplomas" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold mb-2">
                  🇨🇭 Référentiel Officiel Suisse des Métiers de l'Horlogerie
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  De l'AFP au CFC : La Maîtrise des Gestes d'Établi
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans mt-1">
                  En Suisse, la formation horlogère ne repose pas sur de simples théories, mais sur des centaines d'heures d'établi, la précision gestuelle aux brucelles et la conformité stricte aux normes NIHS.
                </p>
              </div>

              {/* 2 Cartes Comparatives AFP vs CFC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SWISS_DIPLOMAS.map((dip, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] space-y-4 flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono font-bold text-xs">
                          {dip.level}
                        </span>
                        <span className="text-xs font-mono text-slate-400">Norme Fédérale Berne</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{dip.title}</h3>
                      <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {dip.objective}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5">
                        <span className="text-[10px] font-mono font-bold uppercase text-amber-500 tracking-wider">
                          Compétences d'Établi Validées :
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-sans">
                          {dip.skills.map((s, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold shrink-0">✓</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <strong>Outillage d'Établi Requis :</strong> {dip.tools}
                    </div>
                  </div>
                ))}
              </div>

              {/* Les 4 Piliers d'Établi de l'Artisan Horloger */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-2">
                <div className="font-bold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
                  <span>🇨🇭 Règle Fondamentale de l'Atelier HorloLearn :</span>
                </div>
                <p className="font-sans leading-relaxed">
                  L'artisan horloger authentique valorise le travail bien fait, le respect des couples de serrage en <span className="font-mono text-amber-500 font-bold">cNm</span>, le dosage microscopique des 5 huiles Moebius et la vérification systématique des ébats aux brucelles. Aucune école ne remplace l'œil à la loupe et l'exigence du geste d'établi.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 4 : TEST D'ÉTABLI (10 QUESTIONS CERTIFIÉES) */}
        {/* ============================================================== */}
        {activeTab === "quiz" && (
          <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" /> Examen Théorique d'Établi : Normes & Certifications Suisses
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  10 questions d'atelier pointues sur l'ISO 3159, le Poinçon de Genève, le METAS et l'AFP/CFC
                </p>
              </div>

              {/* Score en direct */}
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs sm:text-sm">
                  Score : {quizScore} / {QUIZ_QUESTIONS.length}
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-mono text-xs flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
                </button>
              </div>
            </div>

            {/* Liste des questions */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answeredIdx = quizAnswers[q.id];
                const isAnswered = answeredIdx !== undefined && answeredIdx !== null;
                const isCorrect = isAnswered && answeredIdx === q.correct;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.01] space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        #{q.id}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* Options de réponses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-white dark:bg-black/30 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-500/50";
                        
                        if (isAnswered) {
                          if (optIdx === q.correct) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                          } else if (optIdx === answeredIdx && !isCorrect) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold";
                          } else {
                            btnStyle = "opacity-40 border-slate-200 dark:border-white/5";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleAnswerQuiz(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left transition-all ${btnStyle}`}
                          >
                            <span className="opacity-60 mr-2">[{String.fromCharCode(65 + optIdx)}]</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explication d'établi après réponse */}
                    {showQuizExplanations[q.id] && (
                      <div className={`p-3 rounded-xl border text-xs font-mono mt-3 ${
                        isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300"
                      }`}>
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          {isCorrect ? "✓ Bonne réponse !" : "✗ Réponse incorrecte"}
                        </div>
                        <p className="font-sans text-[11px] leading-relaxed">
                          <strong>Explication technique :</strong> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Synthèse finale si tout est complété */}
            {Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length && (
              <div className="p-6 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center space-y-3 font-mono">
                <span className="text-3xl">🇨🇭</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Évaluation Terminée : {quizScore} / {QUIZ_QUESTIONS.length}
                </h3>
                <p className="text-xs font-sans max-w-xl mx-auto text-slate-600 dark:text-slate-300">
                  {quizScore >= 8
                    ? "Félicitations ! Vous maîtrisez les subtilités de la métrologie suisse, du COSC et des grands labels d'excellence."
                    : "Poursuivez votre étude du simulateur COSC et des schémas d'anglage du Poinçon de Genève pour consolider votre savoir d'établi."}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
                >
                  Recommencer le test
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
