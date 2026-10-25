"use client";

import React, { useState } from "react";
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
  Info
} from "lucide-react";

// ==============================================================
// 1. SCHÉMAS TECHNIQUES VECTORIELS SUISSES (COMPOSANTS SVG PURS)
// ==============================================================

function EscapementSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="60%" stopColor="#c9184a" />
          <stop offset="100%" stopColor="#590d22" />
        </linearGradient>
        <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="oil9415" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <path d="M80,150 L140,105 L260,105 L320,150 L300,165 L250,128 L150,128 L100,165 Z" fill="url(#steelGrad)" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="200" cy="116" r="9" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="200" cy="116" r="3" fill="#38bdf8" />
      <path d="M194,125 L190,175 L180,185 L188,188 L196,170 L204,170 L212,188 L220,185 L210,175 L206,125 Z" fill="url(#steelGrad)" stroke="#64748b" strokeWidth="1" />
      <line x1="200" y1="130" x2="200" y2="182" stroke="#e2e8f0" strokeWidth="1.8" />
      <polygon points="120,80 155,103 145,123 110,100" fill="url(#rubyGrad)" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="120" y1="80" x2="155" y2="103" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx="137" cy="91" rx="5" ry="3.5" transform="rotate(33 137 91)" fill="url(#oil9415)" stroke="#fff" strokeWidth="0.8" />
      <text x="60" y="70" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">Palette d'Entrée</text>
      <polygon points="280,80 245,103 255,123 290,100" fill="url(#rubyGrad)" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="280" y1="80" x2="245" y2="103" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
      <ellipse cx="262" cy="91" rx="5" ry="3.5" transform="rotate(-33 262 91)" fill="url(#oil9415)" stroke="#fff" strokeWidth="0.8" />
      <text x="260" y="70" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">Palette de Sortie</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#d4af37" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#eab308" />
      <text x="35" y="195" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">LUBRIFICATION 9415 : PLAN D'IMPULSION SEULEMENT</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">1 micro-goutte sur 2-3 dents de la roue. Le plan de repos et le corps restent 100% secs.</text>
    </svg>
  );
}

function IncablocSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <radialGradient id="oil9010" cx="45%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <linearGradient id="rubyCap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <path d="M120,50 L280,50 L260,140 L230,160 L170,160 L140,140 Z" fill="url(#brassGrad)" stroke="#ca8a04" strokeWidth="1.5" opacity="0.85" />
      <path d="M160,110 L240,110 L230,145 L170,145 Z" fill="url(#rubyCap)" stroke="#fda4af" strokeWidth="1" />
      <circle cx="200" cy="128" r="4" fill="#0f172a" stroke="#fff" strokeWidth="0.8" />
      <text x="250" y="132" fill="#fda4af" fontSize="8.5" fontFamily="monospace">Pierre percée olivée</text>
      <rect x="155" y="75" width="90" height="25" rx="3" fill="url(#rubyCap)" stroke="#f43f5e" strokeWidth="1.2" />
      <text x="255" y="92" fill="#f43f5e" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Contre-pivot (Rubis)</text>
      <ellipse cx="200" cy="87" rx="22" ry="7.5" fill="url(#oil9010)" stroke="#bfdbfe" strokeWidth="1.2" />
      <text x="14" y="90" fill="#60a5fa" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Goutte Moebius 9010 ➔</text>
      <path d="M140,62 C150,45 180,42 200,52 C220,42 250,45 260,62 C265,70 250,70 240,65 C225,58 210,68 200,68 C190,68 175,58 160,65 C150,70 135,70 140,62 Z" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      <text x="160" y="38" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace">Ressort Lyre Incabloc</text>
      <line x1="200" y1="175" x2="200" y2="128" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="210" y="172" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">Pivot de balancier</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#3b82f6" />
      <text x="35" y="195" fill="#93c5fd" fontSize="8.5" fontFamily="monospace" fontWeight="bold">HUILAGE CONTRE-PIVOT : GOUTTE DE 1/2 À 2/3 DU DIAMÈTRE</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">La goutte de Moebius 9010 doit être parfaitement centrée et ronde. Zéro débordement.</text>
    </svg>
  );
}

function OscillatingPinionSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="steelG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <circle cx="280" cy="55" r="50" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="240" y="30" fill="#e2e8f0" fontSize="8.5" fontFamily="monospace">Roue de Chronographe</text>
      <circle cx="100" cy="155" r="45" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="45" y="180" fill="#fde047" fontSize="8.5" fontFamily="monospace">Roue de Seconde</text>
      <line x1="120" y1="145" x2="230" y2="65" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="125" cy="142" r="14" fill="url(#steelG)" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="75" y="125" fill="#38bdf8" fontSize="8" fontFamily="monospace">Pignon Inférieur</text>
      <circle cx="225" cy="68" r="14" fill="url(#steelG)" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="210" y="98" fill="#f43f5e" fontSize="8" fontFamily="monospace">Pignon Supérieur</text>
      <path d="M236,58 L255,54" stroke="#eab308" strokeWidth="1.5" />
      <circle cx="245" cy="56" r="3" fill="#eab308" />
      <text x="252" y="74" fill="#fef08a" fontSize="8" fontFamily="monospace" fontWeight="bold">Engrènement 1/3</text>
      <circle cx="175" cy="155" r="7" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.5" />
      <line x1="171" y1="155" x2="179" y2="155" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="135" y="172" fill="#ca8a04" fontSize="7.5" fontFamily="monospace">Vis Excentrique</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#eab308" />
      <text x="35" y="195" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">PIGNON OSCILLANT (BREVET 1887) : PROFONDEUR 1/3 DE DENT</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Régler via l'excentrique. Trop profond = blocage d'amplitude. Trop court = saut de chrono.</text>
    </svg>
  );
}

function CamShuttleSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <path d="M120,50 L260,50 L280,80 L290,130 L250,155 L160,155 L130,120 L110,80 Z" fill="url(#camGrad)" stroke="#94a3b8" strokeWidth="1.8" />
      <circle cx="195" cy="105" r="8" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="195" cy="105" r="2.5" fill="#38bdf8" />
      <path d="M120,50 L180,50 L195,75 L140,75 Z" fill="#3b82f6" opacity="0.25" stroke="#60a5fa" strokeWidth="1" />
      <text x="35" y="55" fill="#60a5fa" fontSize="8" fontFamily="monospace">Étage 1 : Départ (2h) ➔</text>
      <path d="M220,55 L275,78 L265,110 L210,95 Z" fill="#eab308" opacity="0.25" stroke="#facc15" strokeWidth="1" />
      <text x="285" y="85" fill="#facc15" fontSize="8" fontFamily="monospace">➔ Étage 2 : Stop</text>
      <path d="M150,130 L255,130 L240,152 L165,152 Z" fill="#ef4444" opacity="0.25" stroke="#f87171" strokeWidth="1" />
      <text x="250" y="160" fill="#f87171" fontSize="8" fontFamily="monospace">➔ Étage 3 : RàZ</text>
      <circle cx="155" cy="62" r="4" fill="#fb923c" stroke="#fff" strokeWidth="1" />
      <circle cx="250" cy="88" r="4" fill="#fb923c" stroke="#fff" strokeWidth="1" />
      <circle cx="195" cy="140" r="4" fill="#fb923c" stroke="#fff" strokeWidth="1" />
      <text x="170" y="65" fill="#fb923c" fontSize="7.5" fontFamily="monospace">9504</text>
      <text x="220" y="90" fill="#fb923c" fontSize="7.5" fontFamily="monospace">9504</text>
      <text x="205" y="143" fill="#fb923c" fontSize="7.5" fontFamily="monospace">9504</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#eab308" />
      <text x="35" y="195" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">NAVETTE À 3 ÉTAGES DU 7750 : GRAISSAGE MOEBIUS 9504</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Déposer un film microscopique de graisse synthétique 9504 sur les rampes de friction.</text>
    </svg>
  );
}

function ReversingWheelsSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldGear" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <circle cx="140" cy="100" r="45" fill="url(#goldGear)" stroke="#eab308" strokeWidth="1.5" />
      <circle cx="140" cy="100" r="28" fill="#070a10" stroke="#ca8a04" strokeWidth="1.2" />
      <path d="M140,82 L146,95 L158,100 L146,105 L140,118 L134,105 L122,100 L134,95 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="140" cy="100" r="6" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="90" y="45" fill="#fde047" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Roue Inverseuse 1</text>
      <circle cx="240" cy="100" r="45" fill="url(#goldGear)" stroke="#eab308" strokeWidth="1.5" />
      <circle cx="240" cy="100" r="28" fill="#070a10" stroke="#ca8a04" strokeWidth="1.2" />
      <path d="M240,82 L246,95 L258,100 L246,105 L240,118 L234,105 L222,100 L234,95 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="240" cy="100" r="6" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="210" y="45" fill="#fde047" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Roue Inverseuse 2</text>
      <ellipse cx="190" cy="100" rx="6" ry="12" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />
      <rect x="135" y="152" width="130" height="22" rx="4" fill="#831843" stroke="#f43f5e" strokeWidth="1" />
      <text x="145" y="167" fill="#fbcfe8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">LUBETA V105 SEUL</text>
      <circle cx="330" cy="95" r="18" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
      <line x1="318" y1="83" x2="342" y2="107" stroke="#ef4444" strokeWidth="2.5" />
      <text x="306" y="125" fill="#ef4444" fontSize="7.5" fontFamily="monospace" fontWeight="bold">PAS D'HUILE</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#f43f5e" />
      <text x="35" y="195" fill="#fbcfe8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">PIÈGE MAJEUR 2824 : INTERDICTION TOTALE DE GRAISSER LES CLIQUEURS</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Tremper 15 min dans bain Lubeta V105 puis sécher. L'huile classique colle les cliquets.</text>
    </svg>
  );
}

function BarrelMainspringSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="drumGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="85%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <circle cx="160" cy="100" r="60" fill="url(#drumGrad)" stroke="#eab308" strokeWidth="2" />
      <circle cx="160" cy="100" r="64" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx="160" cy="100" r="50" fill="none" stroke="#64748b" strokeWidth="1" />
      <circle cx="160" cy="100" r="42" fill="none" stroke="#64748b" strokeWidth="1" />
      <circle cx="160" cy="100" r="34" fill="none" stroke="#64748b" strokeWidth="1" />
      <circle cx="160" cy="100" r="16" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="160" cy="100" r="5" fill="#38bdf8" />
      <path d="M216,80 C222,95 222,105 216,120" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <circle cx="218" cy="100" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
      <text x="235" y="95" fill="#f87171" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Moebius 8217</text>
      <text x="235" y="108" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">3 touches sur la paroi</text>
      <text x="235" y="45" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Moebius HP-1300</text>
      <text x="235" y="58" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Pivot supérieur & inférieur</text>
      <line x1="230" y1="52" x2="175" y2="92" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2,2" />
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#eab308" />
      <text x="35" y="195" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">DOUBLE LUBRIFICATION DU BARILLET SUISSE</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Moebius HP-1300 sur l'arbre (frottement lourd). Graisse freinante 8217 sur la bride.</text>
    </svg>
  );
}

function DateForbiddenSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <circle cx="160" cy="100" r="55" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <path d="M160,45 A55,55 0 0,1 214,115" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" opacity="0.65" />
      <text x="175" y="80" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="bold">ZONE INTERDITE</text>
      <text x="175" y="93" fill="#f87171" fontSize="8" fontFamily="monospace">20h00 ➔ 03h00</text>
      <circle cx="160" cy="100" r="68" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="6,3" />
      <line x1="160" y1="100" x2="195" y2="60" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="100" r="5" fill="#fff" />
      <path d="M225,50 L240,65 L255,55" fill="none" stroke="#60a5fa" strokeWidth="2" />
      <text x="245" y="45" fill="#60a5fa" fontSize="8" fontFamily="monospace">Sautoir</text>
      <rect x="250" y="85" width="135" height="45" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
      <text x="260" y="102" fill="#fca5a5" fontSize="8" fontFamily="monospace" fontWeight="bold">⚠️ RISQUE DE RUPTURE</text>
      <text x="260" y="118" fill="#fecaca" fontSize="7.5" fontFamily="sans-serif">Casse du doigt ou des dents du disque en correction rapide.</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#ef4444" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#ef4444" />
      <text x="35" y="195" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" fontWeight="bold">RÈGLE D'OR : RÉGLER L'HEURE À 06H00 AVANT DE CORRIGER LA DATE</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">À 06h00, le doigt d'entraînement est à l'opposé du disque. Sécurité totale garantie.</text>
    </svg>
  );
}

function TrainEndshakesSVG() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto drop-shadow-md rounded-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rubyG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" rx="8" fill="#070a10" stroke="#1f293d" strokeWidth="1" />
      <g opacity="0.12">
        <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" stroke="#94a3b8" strokeDasharray="2,4" />
        <path d="M40,0 V220 M80,0 V220 M120,0 V220 M160,0 V220 M200,0 V220 M240,0 V220 M280,0 V220 M320,0 V220 M360,0 V220" stroke="#94a3b8" strokeDasharray="2,4" />
      </g>
      <rect x="80" y="45" width="240" height="20" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
      <text x="145" y="40" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">Pont de Rouage (Supérieur)</text>
      <rect x="80" y="145" width="240" height="25" rx="4" fill="#1e293b" stroke="#ca8a04" strokeWidth="1.2" />
      <text x="160" y="180" fill="#ca8a04" fontSize="8.5" fontFamily="monospace">Platine de Base</text>
      <rect x="185" y="55" width="30" height="10" rx="2" fill="url(#rubyG)" stroke="#fda4af" strokeWidth="0.8" />
      <rect x="185" y="145" width="30" height="10" rx="2" fill="url(#rubyG)" stroke="#fda4af" strokeWidth="0.8" />
      <line x1="200" y1="58" x2="200" y2="152" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="105" x2="270" y2="105" stroke="#facc15" strokeWidth="4" />
      <path d="M260,88 L230,102 L260,116" fill="none" stroke="#cbd5e1" strokeWidth="2" />
      <text x="270" y="105" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Brucelles N°3</text>
      <line x1="165" y1="65" x2="165" y2="78" stroke="#38bdf8" strokeWidth="1.8" />
      <path d="M162,68 L165,63 L168,68 M162,75 L165,80 L168,75" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="85" y="75" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Ébat: 0.02 mm</text>
      <rect x="12" y="182" width="376" height="30" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
      <circle cx="24" cy="197" r="4.5" fill="#38bdf8" />
      <text x="35" y="195" fill="#93c5fd" fontSize="8.5" fontFamily="monospace" fontWeight="bold">CONTRÔLE DES ÉBATS AUX BRUCELLES AVANT TOUT VISSAGE À FOND</text>
      <text x="35" y="206" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Chaque mobile doit avoir un jeu perceptible (0.015 - 0.030 mm) et tourner avec inertie.</text>
    </svg>
  );
}

// Map string keys to SVG components
function renderSvgByKey(key: string) {
  switch (key) {
    case "escapement": return <EscapementSVG />;
    case "incabloc": return <IncablocSVG />;
    case "oscillating": return <OscillatingPinionSVG />;
    case "cam": return <CamShuttleSVG />;
    case "reversing": return <ReversingWheelsSVG />;
    case "barrel": return <BarrelMainspringSVG />;
    case "date": return <DateForbiddenSVG />;
    case "endshakes": return <TrainEndshakesSVG />;
    default: return <EscapementSVG />;
  }
}

// ==============================================================
// 2. DONNÉES TECHNIQUES CERTIFIÉES DES 3 CALIBRES ROIS
// ==============================================================

interface RhabillageStep {
  num: number;
  mod: 'automatique' | 'balancier' | 'rouage' | 'cadran';
  title: string;
  ref: string;
  tool: string;
  torque: string;
  oil: string;
  oilClass: string;
  svgType: string;
  visualTitle: string;
  oilSpot: string;
  images?: string[];
  demontage: string;
  remontage: string;
  trap: string;
}

interface CalibreDetails {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  subtitle: string;
  freq: string;
  liftAngle: string;
  reserve: string;
  rubis: string;
  lignes: string;
  thick: string;
  targetAmpPlat: string;
  targetAmpPendu: string;
  targetBeat: string;
  targetRate: string;
  steps: RhabillageStep[];
}

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/Dali-Math/horlo-afp/main/public/images/quiz/6497/";
const LOCAL_IMG_BASE = "/images/quiz/6497/";

const CALIBRES_DATA: Record<string, CalibreDetails> = {
  eta2824: {
    id: "eta2824",
    name: "ETA 2824-2 / Sellita SW200-1",
    badge: "Automatique Standard",
    badgeBg: "bg-amber-500 text-slate-950",
    subtitle: "Mouvement automatique suisse 3 aiguilles date, échappement à ancre suisse, balancier Glucydur avec antichoc Incabloc / Novodiac.",
    freq: "28'800 A/h (4 Hz)",
    liftAngle: "50°",
    reserve: "38 - 42 Heures",
    rubis: "25 Rubis",
    lignes: "11½''' (Ø 25.60 mm)",
    thick: "4.60 mm",
    targetAmpPlat: "285° à 310°",
    targetAmpPendu: "250° à 275°",
    targetBeat: "0.0 à 0.3 ms",
    targetRate: "-2 à +6 s/j",
    steps: [
      {
        num: 1,
        mod: "automatique",
        title: "Masse Oscillante & Module Automatique",
        ref: "Pièce ETA 1143/1 & 1497",
        tool: "Tournevis Ø 1.60 mm (Violet) + Brucelles N°1",
        torque: "3.5 cNm",
        oil: "Lubeta V105 (Inverseuses) + HP-1300 (Pivots du pont auto)",
        oilClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        svgType: "reversing",
        visualTitle: "Module Automatique & Roues Inverseuses",
        oilSpot: "Lubeta V105 dip + HP-1300 pivots",
        demontage: "Dévisser la vis centrale de masse oscillante. Déposer les deux vis de fixation du bâti automatique. Retirer le module complet d'un seul bloc.",
        remontage: "Poser le module automatique sur le mouvement. Vérifier que la roue entraîneuse de rochet s'engrène sans forcer avec le rochet. Serrer les vis à 3.5 cNm.",
        trap: "DANGER INVERSEUSES : Ne JAMAIS huiler les roues inverseuses (1488) à la seringue ou au pique-huile ! Les tremper dans Lubeta V105 puis souffler."
      },
      {
        num: 2,
        mod: "balancier",
        title: "Pont de Balancier (Coq) & Balancier Glucydur",
        ref: "Pièce ETA 4021 & 721",
        tool: "Tournevis Ø 1.20 mm (Rouge) + Brucelles N°3 & N°5 Dumont",
        torque: "2.5 cNm",
        oil: "Moebius 9010 (Contre-pivot Incabloc)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        svgType: "incabloc",
        visualTitle: "Bloc Antichoc Incabloc & Contre-Pivot",
        oilSpot: "Goutte Moebius 9010 (1/2 diamètre)",
        demontage: "Dévisser la vis de coq. Soulever délicatement le pont à la verticale absolue pour ne pas déformer le spiral ni tordre le pivot inférieur.",
        remontage: "Engager le pivot inférieur dans la pierre percée. Poser le coq, vérifier l'engagement de la cheville de plateau dans la fourchette d'ancre. Serrer à 2.5 cNm.",
        trap: "SPIRAL VULNÉRABLE : Ne jamais poser le pont de coq à plat sur le spiral. Utiliser un porte-coq d'horloger pour préserver le centrage du piton."
      },
      {
        num: 3,
        mod: "balancier",
        title: "Pont d'Ancre & Ancre Suisse",
        ref: "Pièce ETA 125 & 710",
        tool: "Tournevis Ø 1.00 mm (Noir) + Brucelles N°3 Dumont",
        torque: "1.8 cNm",
        oil: "Moebius 9415 (Levées d'ancre) — Pivots à sec !",
        oilClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        svgType: "escapement",
        visualTitle: "Échappement à Ancre Suisse",
        oilSpot: "Moebius 9415 sur plan d'impulsion",
        demontage: "Retirer les 2 vis de pont d'ancre. Soulever le pont sans forcer. Retirer l'ancre en la saisissant délicatement par le corps.",
        remontage: "Placer l'ancre dans ses logements. Poser le pont d'ancre. Vérifier la liberté absolue de l'ancre et le jeu de dard avant serrage à 1.8 cNm.",
        trap: "INTERDICTION STRICTE : Les pivots de l'ancre doivent rester 100% SECS. Moebius 9415 s'applique UNIQUEMENT sur le plan d'impulsion des levées."
      },
      {
        num: 4,
        mod: "rouage",
        title: "Pont de Rouage & Finissage",
        ref: "Pièce ETA 110, 210, 224, 705",
        tool: "Tournevis Ø 1.20 mm (Rouge) + Brucelles N°3",
        torque: "2.8 cNm",
        oil: "Moebius 9010 (Secondes & Échappement) + HP-1300 (Moyenne)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        svgType: "endshakes",
        visualTitle: "Rouage de Finissage & Ébats Axiaux",
        oilSpot: "Moebius 9010 / HP-1300 pivots",
        demontage: "Retirer les 3 vis du pont de rouage. Dégager le pont. Retirer la roue d'échappement, la roue de seconde au centre et la roue moyenne.",
        remontage: "Positionner les 3 mobiles sur la platine. Coiffer avec le pont de rouage en engageant chaque pivot dans son rubis sans forcer. Serrer à 2.8 cNm.",
        trap: "PIVOT BRISEUR : Ne jamais appuyer sur le pont de rouage s'il n'est pas plaqué. Un pivot d'échappement casse net sous une pression de quelques grammes."
      },
      {
        num: 5,
        mod: "rouage",
        title: "Rochet, Roue de Couronne & Pont de Barillet",
        ref: "Pièce ETA 105, 415, 420",
        tool: "Tournevis Ø 1.40 mm (Gris) & Ø 1.20 mm (Rouge)",
        torque: "3.5 cNm (Rochet) / 2.5 cNm (Pont)",
        oil: "Moebius HP-1300 (Arbre) + Moebius 8217 (Bride glissante)",
        oilClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        svgType: "barrel",
        visualTitle: "Barillet, Arbre & Bride Glissante",
        oilSpot: "Graisse 8217 paroi + HP-1300 arbre",
        demontage: "Désarmer totalement le ressort de barillet. Dévisser la vis de rochet (filetage à gauche pour la roue de couronne selon calibre). Déposer le pont.",
        remontage: "Poser le barillet complet. Placer le pont de barillet et le fixer. Visser le rochet et la couronne. Vérifier le clic d'armage.",
        trap: "FILETAGE INVERSÉ : La vis de roue de couronne a souvent 3 fentes (indiquant un pas à gauche). Visser vers la droite casse le taraudage."
      },
      {
        num: 6,
        mod: "cadran",
        title: "Chaussée Lanteronnée & Rouage de Minuterie",
        ref: "Pièce ETA 240, 260, 450",
        tool: "Outil aux chaussées Bergeon 2824 + Tournevis Ø 1.00 mm",
        torque: "Friction 18-24 cNm",
        oil: "Moebius 9504 (Graisse de friction sur tigerie et chaussée)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "endshakes",
        visualTitle: "Chaussée Lanteronnée & Minuterie",
        oilSpot: "Moebius 9504 friction chaussée",
        demontage: "Chasser la chaussée verticalement avec l'extracteur Bergeon. Déposer la roue de minuterie et le renvoi.",
        remontage: "Lubrifier légèrement la portée de chaussée avec Moebius 9504. Presser la chaussée jusqu'au clic d'engagement. Poser la minuterie.",
        trap: "LANTERONNAGE DÉFECTUEUX : Si la chaussée est trop libre, la montre tourne mais les aiguilles retardent. Si trop serrée, casse de la roue de minuterie."
      },
      {
        num: 7,
        mod: "cadran",
        title: "Mécanisme de Tirette & Remontoir",
        ref: "Pièce ETA 401, 405, 407, 443",
        tool: "Tournevis Ø 1.20 mm + Cheville de sureau",
        torque: "2.2 cNm (Vis de tirette)",
        oil: "Moebius 9504 (Dents du pignon coulant & portée de tirette)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "endshakes",
        visualTitle: "Mécanisme de Remontoir & Tirette",
        oilSpot: "Moebius 9504 friction acier/acier",
        demontage: "Dévisser la vis de tirette de 1 tour et demi (ne pas extraire). Sortir la tige de remontoir. Déposer le sautoir, la bascule et les pignons.",
        remontage: "Placer pignon de remontoir et pignon coulant. Engager la bascule et son ressort. Fixer le sautoir de tirette. Contrôler les 3 crans de tige.",
        trap: "SAUT DU RESSORT DE BASCULE : Toujours maintenir le ressort avec une cheville de sureau lors de la dépose pour éviter qu'il ne soit projeté dans l'atelier."
      },
      {
        num: 8,
        mod: "cadran",
        title: "Disque de Date & Mécanisme de Saut Rapide",
        ref: "Pièce ETA 2557/1 & 2576",
        tool: "Tournevis Ø 1.00 mm (Noir) + Brucelles plastique",
        torque: "1.5 cNm",
        oil: "Moebius 9504 (Portée de doigt de quantième et sautoir)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "date",
        visualTitle: "Disque Quantième & Zone Interdite 20h-03h",
        oilSpot: "Moebius 9504 sautoir de date",
        demontage: "Déposer la plaque de maintien du mécanisme de calendrier. Retirer le sautoir de date et le disque imprimé délicatement.",
        remontage: "Placer le disque de date. Poser le sautoir et le ressort. Replacer la plaque de maintien. Tester le saut franc de la date à minuit.",
        trap: "ZONE INTERDITE (20h00 - 03h00) : Ne JAMAIS actionner le correcteur rapide quand le doigt est engagé avec la dent du disque de date. Risque de casse nette."
      }
    ]
  },
  valjoux7750: {
    id: "valjoux7750",
    name: "Valjoux 7750 (ETA 7750)",
    badge: "Chronographe Automatique Référence",
    badgeBg: "bg-red-500 text-white",
    subtitle: "Le chronographe suisse automatique le plus fiable au monde. Système de navette à cames 3 étages et pignon oscillant Brevet Edouard Heuer 1887.",
    freq: "28'800 A/h (4 Hz)",
    liftAngle: "52°",
    reserve: "44 - 48 Heures",
    rubis: "25 Rubis",
    lignes: "13¼''' (Ø 30.00 mm)",
    thick: "7.90 mm",
    targetAmpPlat: "290° à 315°",
    targetAmpPendu: "255° à 280°",
    targetBeat: "0.0 à 0.3 ms",
    targetRate: "-2 à +5 s/j",
    steps: [
      {
        num: 1,
        mod: "automatique",
        title: "Bâti Automatique & Masse Oscillante Valjoux",
        ref: "Pièce 7750.1143 & 1497",
        tool: "Tournevis Ø 1.60 mm & Clé de masse 7750",
        torque: "4.0 cNm",
        oil: "Moebius HP-1300 (Pivots du pont) + Roulement à billes à sec",
        oilClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        svgType: "reversing",
        visualTitle: "Masse Oscillante & Pont Automatique 7750",
        oilSpot: "Moebius HP-1300 pivots rotor",
        demontage: "Dévisser les 3 vis bleuies du bloc automatique. Retirer le pont d'un seul bloc avec sa roue entraîneuse de rochet.",
        remontage: "Engager le rochet automatique sur le rochet de barillet. Serrer les 3 vis en diagonale à 4.0 cNm. Contrôler la rotation unidirectionnelle libre.",
        trap: "REMONTOIR UNIDIRECTIONNEL : Le 7750 remonte dans un seul sens. Dans le sens libre, le rotor tourne à très grande vitesse. Le roulement doit rester propre et sec."
      },
      {
        num: 2,
        mod: "automatique",
        title: "Système de Navette & Cames de Chronographe (3 Étages)",
        ref: "Pièce 7750.8140 & 8144",
        tool: "Tournevis Ø 1.20 mm & Brucelles N°3",
        torque: "2.8 cNm",
        oil: "Moebius 9504 (Sur toutes les rampes de cames et becs de marteau)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "cam",
        visualTitle: "Navette à 3 Étages (Came Chronographe)",
        oilSpot: "Moebius 9504 rampes de friction",
        demontage: "Décrocher le ressort de commande. Dévisser les vis de pont de commande et déposer la navette principale supérieure et inférieure.",
        remontage: "Graisser finement les 3 étages de la came avec Moebius 9504. Reposer la navette et tester les cycles : Départ, Arrêt, Remise à Zéro.",
        trap: "SYNCHRONISATION DES CAMES : Une inversion de niveau lors de l'assemblage de la navette bloque le poussoir de remise à zéro. Observer les hauteurs."
      },
      {
        num: 3,
        mod: "rouage",
        title: "Le Pignon Oscillant (Le Cœur du Brevet 7750)",
        ref: "Pièce 7750.8086",
        tool: "Brucelles N°5 Dumont ultra-fines + Loupe 12x",
        torque: "Ajustement micrométrique",
        oil: "Moebius 9010 (Tourillons supérieur et inférieur du pignon)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        svgType: "oscillating",
        visualTitle: "Pignon Oscillant (Brevet Heuer 1887)",
        oilSpot: "Moebius 9010 tourillons + Engrènement 1/3",
        demontage: "Dégager délicatement la bascule de débrayage. Extraire le pignon oscillant verticalement avec les brucelles N°5 sans tordre ses pivots ultra-fins.",
        remontage: "Engager le pignon inférieur dans la roue de seconde. Vérifier l'engrènement supérieur avec la roue de chronographe centrale au départ.",
        trap: "PÉNÉTRATION DU PIGNON : L'engrènement doit faire exactement 1/3 de la hauteur de la dent. Trop profond = perte de 40° d'amplitude. Trop court = saut d'aiguille."
      },
      {
        num: 4,
        mod: "cadran",
        title: "Compteurs Chrono 30 Minutes & 12 Heures",
        ref: "Pièce 7750.8000, 8020, 8600",
        tool: "Tournevis Ø 1.00 mm + Brucelles N°3",
        torque: "2.0 cNm",
        oil: "Moebius HP-1300 (Pivots) + Moebius 9504 (Dents du sautoir)",
        oilClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        svgType: "cam",
        visualTitle: "Compteurs Chrono 30 Min & 12 Heures",
        oilSpot: "Moebius HP-1300 pivots + 9504 sautoir",
        demontage: "Côté ponts : déposer le compteur 30 minutes. Côté cadran : déposer le verrou de compteur 12 heures et la roue de compteur 12h.",
        remontage: "Contrôler le centrage du sautoir de compteur de minute. L'aiguille doit sauter exactement quand la trotteuse passe sur 60 secondes.",
        trap: "SAUTOIR DE MINUTE : Si le sautoir est trop serré, la montre s'arrête à la 58e seconde de chaque minute lors du passage du doigt d'entraînement."
      },
      {
        num: 5,
        mod: "balancier",
        title: "Organe Réglant & Échappement Chronomètre 7750",
        ref: "Pièce 7750.4021, 710, 721",
        tool: "Tournevis Ø 1.20 mm + Clé de raquette",
        torque: "2.5 cNm",
        oil: "Moebius 9010 (Incabloc) + Moebius 9415 (Levées d'ancre)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        svgType: "escapement",
        visualTitle: "Organe Réglant & Échappement 7750",
        oilSpot: "Moebius 9415 impulsion + 9010 antichoc",
        demontage: "Dévisser le coq. Déposer le balancier Glucydur avec antichoc Incabloc. Déposer le pont d'ancre et l'ancre.",
        remontage: "Huiler les contre-pivots Incabloc supérieur et inférieur avec 9010. Déposer 9415 sur 2 dents de la roue d'échappement. Assembler.",
        trap: "CHUTE D'AMPLITUDE EN CHRONO : Enclencher le chrono. Si l'amplitude chute de plus de 25°, vérifier la pénétration du pignon oscillant et le frein de friction."
      },
      {
        num: 6,
        mod: "rouage",
        title: "Pont de Rouage & Barillet Haute Puissance",
        ref: "Pièce 7750.110, 180, 201",
        tool: "Tournevis Ø 1.40 mm & 1.20 mm",
        torque: "3.5 cNm",
        oil: "Moebius HP-1300 (Pivots de barillet) + Moebius 8217 (Bride)",
        oilClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        svgType: "barrel",
        visualTitle: "Barillet Haute Puissance Valjoux 7750",
        oilSpot: "Graisse 8217 bride + HP-1300 arbre",
        demontage: "Déposer le rochet de barillet. Dévisser les 3 vis du grand pont de rouage 7750. Extraire le barillet haute puissance.",
        remontage: "Lubrifier la paroi intérieure du barillet avec 3 touches de Moebius 8217. Reposer le barillet et le pont de rouage.",
        trap: "COUPLE DU RESSORT : Le 7750 possède un ressort très puissant pour entraîner les 3 compteurs. Désarmer avec précaution absolue sous risque d'arrachement."
      },
      {
        num: 7,
        mod: "cadran",
        title: "Mécanisme de Date & Jour (Double Calendrier)",
        ref: "Pièce 7750.2557 & 2561",
        tool: "Tournevis Ø 1.00 mm + Brucelles laiton",
        torque: "1.5 cNm",
        oil: "Moebius 9504 (Étoiles de jour et sautoir de date)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "date",
        visualTitle: "Double Calendrier Date & Jour",
        oilSpot: "Moebius 9504 étoiles et sautoirs",
        demontage: "Déposer la plaque de garde du calendrier. Retirer l'étoile des jours (anglais/français) et le disque de quantième.",
        remontage: "Placer le disque de date puis l'étoile des jours. Contrôler le saut simultané des deux guichets entre 23h50 et 00h10.",
        trap: "DOIGT DOUBLE DE COMMANDE : Le doigt entraîne d'abord la date puis le jour. Ne jamais forcer la correction rapide pendant la phase de prise (20h-03h)."
      },
      {
        num: 8,
        mod: "cadran",
        title: "Tige, Pignon Coulant & Commandes Poussoirs",
        ref: "Pièce 7750.401, 407, 8180",
        tool: "Tournevis Ø 1.20 mm",
        torque: "2.2 cNm",
        oil: "Moebius 9504 (Dents pignon coulant & têtes de poussoirs)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        svgType: "endshakes",
        visualTitle: "Tige, Pignon Coulant & Commandes Poussoirs",
        oilSpot: "Moebius 9504 gorges de pignon",
        demontage: "Presser le point de tirette pour libérer la tige de remontoir. Déposer la tirette, la bascule et le levier de commande de départ.",
        remontage: "Graisser les portées de friction à la 9504. Engager la tige, tester le passage des crans (Remontage manuel, Date rapide, Mise à l'heure).",
        trap: "POUSSOIR DE TIRETTE : Ne jamais enfoncer le téton de tirette trop profondément lors de l'extraction de tige, sous peine de décrocher la bascule."
      }
    ]
  },
  eta6497: {
    id: "eta6497",
    name: "Unitas 6497-1 / ETA 6498",
    badge: "Manuel Haute École Suisse",
    badgeBg: "bg-cyan-500 text-slate-950",
    subtitle: "Le calibre école par excellence. Mouvement de poche 16½ lignes à remontage manuel, ponts anglés, grande inertie et balancier à vis 18'000 A/h.",
    freq: "18'000 A/h (2.5 Hz)",
    liftAngle: "44°",
    reserve: "46 - 50 Heures",
    rubis: "17 Rubis",
    lignes: "16½''' (Ø 36.60 mm)",
    thick: "4.50 mm",
    targetAmpPlat: "295° à 320°",
    targetAmpPendu: "260° à 285°",
    targetBeat: "0.0 à 0.2 ms",
    targetRate: "-1 à +5 s/j",
    steps: [
      {
        num: 1,
        mod: "cadran",
        title: "Tigerie de Remontoir & Tirette Unitas",
        ref: "Pièce 6497.401, 407, 443, 445",
        tool: "Tournevis Ø 1.40 mm & Brucelles N°3",
        torque: "2.5 cNm",
        oil: "Moebius 9504 (Portée de tirette et gorge du pignon coulant)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        images: ["tige-remontoir.png", "pignon-coulant.png", "pignon-de-remontoir.png", "Tirette.png"],
        svgType: "endshakes",
        visualTitle: "Composants du Remontoir & Tirette 6497",
        oilSpot: "Moebius 9504 denture et gorge",
        demontage: "Desserrer la vis de tirette de 2 tours maximum. Retirer la tige de remontoir. Déposer la bascule, son ressort et le pignon coulant.",
        remontage: "Graisser légèrement les gorges du pignon coulant à la Moebius 9504. Reposer la bascule et son ressort. Engager la tige et resserrer la vis.",
        trap: "VIS DE TIRETTE ÉJECTÉE : Ne jamais dévisser la vis de tirette à fond. Si elle sort de la tirette, il faut démonter tout le rouage pour la remettre."
      },
      {
        num: 2,
        mod: "rouage",
        title: "Barillet & Pont de Barillet",
        ref: "Pièce 6497.105, 180, 195",
        tool: "Tournevis Ø 1.60 mm (Violet) & Ø 1.40 mm",
        torque: "3.5 cNm",
        oil: "Moebius HP-1300 (Pivots arbre) + Moebius 8200/8217 (Paroi tambour)",
        oilClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        images: ["barillet.png", "couvercle-barillet.png", "pont-barillet.png"],
        svgType: "barrel",
        visualTitle: "Barillet & Pont de Barillet 6497",
        oilSpot: "Graisse 8217 paroi + HP-1300 arbre",
        demontage: "Désarmer complètement le ressort. Dévisser les 2 vis du pont de barillet. Retirer le pont et extraire le barillet.",
        remontage: "Huiler l'arbre de barillet avec Moebius HP-1300. Placer le barillet dans son logement de platine. Poser le pont de barillet et visser.",
        trap: "DÉSARMEMENT OBLIGATOIRE : Désarmer en retenant la couronne avec les doigts tout en écartant le cliquet. Si le ressort se détend d'un coup, pivots brisés."
      },
      {
        num: 3,
        mod: "rouage",
        title: "Rouage de Finissage & Pont de Rouage",
        ref: "Pièce 6497.110, 201, 210, 224, 705",
        tool: "Tournevis Ø 1.40 mm (Gris) + Brucelles N°3",
        torque: "3.0 cNm",
        oil: "Moebius HP-1300 (Centre & Moyenne) + Moebius 9010 (Seconde & Échappement)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        images: ["pont-rouages.png", "mobile-de-centre.png", "roue-moyenne.png", "mobile-de-seconde.png"],
        svgType: "endshakes",
        visualTitle: "Rouage de Finissage & Pont de Rouage",
        oilSpot: "Moebius 9010 / HP-1300 pivots",
        demontage: "Dévisser les 3 vis du pont de rouage. Dégager le pont. Retirer la roue d'échappement, la grande moyenne, la roue moyenne et la roue de seconde.",
        remontage: "Positionner les 4 roues. Poser le pont de rouage. Orienter chaque pivot délicatement avec la pointe des brucelles. Serrer à 3.0 cNm.",
        trap: "CONTRÔLE DES ÉBATS AXIAUX : Avant de visser à fond, vérifier que chaque roue tourne librement au moindre souffle de poire à poussière."
      },
      {
        num: 4,
        mod: "rouage",
        title: "Rochet, Roue de Couronne & Cliquet",
        ref: "Pièce 6497.415, 420, 425, 430",
        tool: "Tournevis Ø 1.60 mm & Ø 1.40 mm",
        torque: "3.8 cNm (Rochet) / 2.8 cNm (Couronne)",
        oil: "Moebius HP-1300 (Portée de roue de couronne) + Moebius 9504 (Dents cliquet)",
        oilClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        images: ["rochet.png", "roue-couronne.png", "cliquet.png", "ressort-de-cliquet.png"],
        svgType: "endshakes",
        visualTitle: "Rochet, Roue de Couronne & Cliquet",
        oilSpot: "Moebius 9504 portée roue couronne",
        demontage: "Dévisser la vis de roue de couronne (filetage gauche : dévisser vers la droite !). Dévisser la vis de rochet. Déposer le cliquet et son ressort.",
        remontage: "Replacer le ressort de cliquet, poser le cliquet. Visser la roue de couronne (sens anti-horaire). Poser et visser le rochet.",
        trap: "VIS DE ROUE DE COURONNE À PAS GAUCHE : Reconnaissable à sa tête striée. Dévisser dans le sens horaire pour ne pas cisailler la tête de vis."
      },
      {
        num: 5,
        mod: "balancier",
        title: "Échappement & Ancre Suisse 6497",
        ref: "Pièce 6497.125 & 710",
        tool: "Tournevis Ø 1.00 mm (Noir) + Brucelles N°3 Dumont",
        torque: "2.0 cNm",
        oil: "Moebius 9415 (Faces d'impulsion levées d'ancre) — Pivots SECS",
        oilClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        images: ["ancre.png", "pont-d-ancre.png", "roue-echappement.png"],
        svgType: "escapement",
        visualTitle: "Échappement & Ancre Suisse 6497",
        oilSpot: "Moebius 9415 impulsion levées",
        demontage: "Dévisser les 2 vis de pont d'ancre. Soulever le pont. Retirer l'ancre par sa tige avec les brucelles N°3.",
        remontage: "Placer l'ancre dans ses rubis. Poser le pont d'ancre. Vérifier la chute, le tirage et le jeu de dard avant vissage à 2.0 cNm.",
        trap: "CORPS D'ANCRE IMMACULÉ : Aucune trace d'huile ne doit toucher la tige d'ancre ou le dard, sous peine de collage contre les goupilles de limitation."
      },
      {
        num: 6,
        mod: "balancier",
        title: "Balancier-Spiral & Pont de Balancier (Coq)",
        ref: "Pièce 6497.121 & 721",
        tool: "Tournevis Ø 1.20 mm (Rouge) + Brucelles N°3 & N°5 Dumont",
        torque: "2.8 cNm",
        oil: "Moebius 9010 (Goutte de contre-pivot Incabloc)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        images: ["balancier-spiral.png", "pont-balancier.png", "spiral.png"],
        svgType: "incabloc",
        visualTitle: "Balancier-Spiral & Coq 6497",
        oilSpot: "Moebius 9010 contre-pivot",
        demontage: "Dévisser la vis de coq. Soulever verticalement. Retourner le coq délicatement sur un coussin d'emboîtage.",
        remontage: "Engager la cheville de plateau dans la fourchette de l'ancre. Poser le coq, vérifier la liberté et le battement du balancier. Serrer à 2.8 cNm.",
        trap: "SPIRAL DÉCENTRÉ : Veiller à ce que la première spire passe exactement au milieu des goupilles de raquette sans toucher ni frotter au repos."
      },
      {
        num: 7,
        mod: "balancier",
        title: "Système Antichoc Incabloc (Démontage & Nettoyage)",
        ref: "Pièce Incabloc 16½",
        tool: "Outil Incabloc Bergeon 30081 + Huilier automatique",
        torque: "Ressort clipsé",
        oil: "Moebius 9010 (Goutte calibrée à 1/2 à 2/3 du contre-pivot)",
        oilClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        images: ["amortisseur-balancier.png", "rubis.png"],
        svgType: "incabloc",
        visualTitle: "Système Antichoc Incabloc 6497",
        oilSpot: "Moebius 9010 (goutte 1/2 à 2/3)",
        demontage: "Ouvrir la lyre Incabloc avec une cheville de sureau ou brucelle fine. Extraire le contre-pivot et la pierre percée. Nettoyer à la benzine.",
        remontage: "Déposer une goutte de Moebius 9010 au centre du contre-pivot plat. Reposer la pierre percée. Replacer le bloc et refermer la lyre.",
        trap: "PERTE DU CONTRE-PIVOT : Les rubis Incabloc sont minuscules et sautent facilement. Travailler sur papier de soie avec un doigt au-dessus lors de l'ouverture."
      },
      {
        num: 8,
        mod: "cadran",
        title: "Cadrature, Chaussée & Rouage de Minuterie",
        ref: "Pièce 6497.240, 250, 260, 450",
        tool: "Brucelles N°3 Dumont + Outil à chasser",
        torque: "Friction chaussée 18-22 cNm",
        oil: "Moebius 9504 (Lanteronnage de chaussée & pivot de minuterie)",
        oilClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
        images: ["chaussee-avec-roue-entraineuse.png", "Roue-de-minuterie.jpg", "roue-renvoi.png"],
        svgType: "endshakes",
        visualTitle: "Cadrature & Rouage de Minuterie",
        oilSpot: "Moebius 9504 lanteronnage chaussée",
        demontage: "Retirer la roue des heures et la rondelle ressort. Chasser la chaussée. Déposer la roue de minuterie et les renvois.",
        remontage: "Lubrifier légèrement la tigerie avec Moebius 9504. Emboîter la chaussée jusqu'au cran. Replacer la minuterie et la roue des heures.",
        trap: "RONDELLE RESSORT DE CADRAN : Ne jamais oublier la rondelle bombée sur la roue des heures sous le cadran, sous peine de désengrènement des aiguilles."
      }
    ]
  }
};

// ==============================================================
// 3. COMPOSANT PRINCIPAL DE LA PAGE RHABILLAGE
// ==============================================================

export default function RhabillagePage() {
  const [activeCalibre, setActiveCalibre] = useState<string>("eta2824");
  const [currentDirection, setCurrentDirection] = useState<"remontage" | "demontage">("remontage");
  const [activeModuleFilter, setActiveModuleFilter] = useState<string>("all");
  const [currentStudioTab, setCurrentStudioTab] = useState<"architecture" | "oil" | "ebats">("architecture");
  const [loupeModal, setLoupeModal] = useState<{ isOpen: boolean; stepIdx: number }>({
    isOpen: false,
    stepIdx: 0
  });

  const cal = CALIBRES_DATA[activeCalibre];

  // Filtering steps
  let displayedSteps = [...cal.steps];
  if (currentDirection === "demontage") {
    displayedSteps.reverse();
  }
  if (activeModuleFilter !== "all") {
    displayedSteps = displayedSteps.filter((s) => s.mod === activeModuleFilter);
  }

  // Active step for modal
  const modalStep = cal.steps[loupeModal.stepIdx] || cal.steps[0];

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
            Établi Numérique Actif · Normes NIHS & ISO 3159
          </div>
        </div>

        {/* En-tête Principal */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            🇨🇭 Haute Horlogerie Suisse · Fiches d'Atelier
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Rhabillage des <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">3 Calibres Rois</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Protocoles chronologiques officiels de démontage et remontage, couples de serrage en <span className="font-mono text-amber-500 font-bold">cNm</span>, cartographie des 5 huiles Moebius et illustrations techniques haute définition.
          </p>
        </div>

        {/* 3 Calibre Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(CALIBRES_DATA).map((item) => {
            const isSelected = item.id === activeCalibre;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveCalibre(item.id);
                  setActiveModuleFilter("all");
                }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? "bg-white dark:bg-[#0D121F] border-amber-500 ring-2 ring-amber-500/20 shadow-lg"
                    : "bg-white dark:bg-[#0D121F]/60 border-slate-200 dark:border-white/10 hover:border-amber-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.lignes}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">{item.freq}</span>
                  <span className="text-slate-400">{item.steps.length} Étapes d'Établi</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Calibre Specs Header */}
        <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{cal.name}</h2>
                <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase ${cal.badgeBg}`}>
                  {cal.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans mt-1">
                {cal.subtitle}
              </p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Fréquence</span>
              <strong className="text-sm text-amber-500">{cal.freq}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Angle Levée</span>
              <strong className="text-sm text-slate-900 dark:text-white">{cal.liftAngle}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Réserve</span>
              <strong className="text-sm text-emerald-500">{cal.reserve}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Rubis</span>
              <strong className="text-sm text-slate-900 dark:text-white">{cal.rubis}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Dimensions</span>
              <strong className="text-xs text-slate-900 dark:text-white">{cal.lignes}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5">
              <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Chronométrie</span>
              <strong className="text-sm text-amber-500">{cal.targetRate}</strong>
            </div>
          </div>
        </div>

        {/* Studio d'Écorché & Éclatés Techniques */}
        <section className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center text-xl">
                📐
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Studio d'Écorché & Éclatés Techniques</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Schémas officiels d'architecture, plans de lubrification & tolérances NIHS</p>
              </div>
            </div>

            {/* Studio Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentStudioTab("architecture")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  currentStudioTab === "architecture"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Vue Éclatée / Architecture
              </button>
              <button
                onClick={() => setCurrentStudioTab("oil")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  currentStudioTab === "oil"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Carte de Lubrification (5 Huiles)
              </button>
              <button
                onClick={() => setCurrentStudioTab("ebats")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  currentStudioTab === "ebats"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Tolérances des Ébats
              </button>
            </div>
          </div>

          {/* Studio Tab Content */}
          <div className="p-2 sm:p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 min-h-[220px]">
            {currentStudioTab === "architecture" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  {activeCalibre === "eta2824" && <ReversingWheelsSVG />}
                  {activeCalibre === "valjoux7750" && <OscillatingPinionSVG />}
                  {activeCalibre === "eta6497" && <EscapementSVG />}
                </div>
                <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                  <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold text-[11px]">
                    Architecture Maîtresse : {cal.name}
                  </div>
                  <h4 className="text-base font-sans font-bold text-slate-900 dark:text-white">
                    Cinématique & Éclaté Fonctionnel
                  </h4>
                  <p className="font-sans text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Ce mouvement repose sur une chaîne cinématique à haute précision. La transmission de l'énergie du barillet vers l'échappement exige un équilibrage parfait des forces de frottement et des ébats.
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-2">
                    <li>• Fréquence de régulation : <span className="text-amber-500 font-bold">{cal.freq}</span></li>
                    <li>• Réserve de marche certifiée : <span className="text-slate-900 dark:text-white font-bold">{cal.reserve}</span></li>
                    <li>• Angle de levée du balancier : <span className="text-slate-900 dark:text-white font-bold">{cal.liftAngle}</span></li>
                  </ul>
                  <button
                    onClick={() => setLoupeModal({ isOpen: true, stepIdx: 0 })}
                    className="w-full py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-500 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <ZoomIn className="w-4 h-4" /> Inspecter le Schéma Maître sous Loupe 10x
                  </button>
                </div>
              </div>
            )}

            {currentStudioTab === "oil" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="text-amber-500 font-bold uppercase text-[11px]">Plan de Lubrification Officiel ETA / NIHS</span>
                  <span className="text-slate-400 text-[10px]">5 Produits Certifiés Horlogerie Suisse</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "Moebius 9010", nature: "Huile Fine Synthétique", color: "border-sky-500/30 bg-sky-500/10 text-sky-400", desc: "Pivots de balancier, contre-pivots Incabloc, roue d'échappement, roue de seconde." },
                    { name: "Moebius HP-1300 (HP)", nature: "Huile Épaisse Haute Pression", color: "border-amber-500/30 bg-amber-500/10 text-amber-400", desc: "Arbre de barillet, pivots de roue de centre et moyenne, mobiles de chronographe." },
                    { name: "Moebius 9415", nature: "Graisse d'Échappement Spéciale", color: "border-rose-500/30 bg-rose-500/10 text-rose-400", desc: "Faces d'impulsion des levées d'ancre suisse (2 à 3 dents de la roue d'échappement)." },
                    { name: "Moebius 9504", nature: "Graisse de Friction Acier/Acier", color: "border-blue-500/30 bg-blue-500/10 text-blue-400", desc: "Tirette, pignon coulant, sautoir de date, cames et navettes du chronographe." },
                    { name: "Moebius 8217", nature: "Graisse Freinante pour Bride", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400", desc: "Paroi du tambour de barillet automatique pour glissement contrôlé de la bride." }
                  ].map((oil, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border ${oil.color} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm font-sans">{oil.name}</span>
                          <span className="text-[9px] uppercase font-bold opacity-75">{oil.nature}</span>
                        </div>
                        <p className="font-sans text-[11px] opacity-90 leading-tight mb-2">{oil.desc}</p>
                      </div>
                      <div className="text-[10px] border-t border-current/20 pt-1.5 font-bold">
                        🎯 Règle : Ni trop ni trop peu
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStudioTab === "ebats" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="text-amber-500 font-bold uppercase text-[11px]">Tolérances des Ébats & Jeux Fonctionnels (Norme NIHS 92-01)</span>
                  <span className="text-slate-400 text-[10px]">Contrôle aux Brucelles N°3 / N°5</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-xl space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block font-sans">Ébats Axiaux (Hauteur sous Pont) :</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                      <li>• Roue de centre / Grande moyenne : <strong className="text-amber-500">0.020 à 0.040 mm</strong></li>
                      <li>• Roue moyenne : <strong className="text-amber-500">0.015 à 0.030 mm</strong></li>
                      <li>• Roue de seconde : <strong className="text-amber-500">0.015 à 0.030 mm</strong></li>
                      <li>• Roue d'échappement : <strong className="text-amber-500">0.015 à 0.025 mm</strong></li>
                      <li>• Ancre suisse : <strong className="text-amber-500">0.020 à 0.040 mm</strong></li>
                      <li>• Balancier Glucydur : <strong className="text-amber-500">0.010 à 0.020 mm</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-xl space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block font-sans">Règles d'Or du Contrôleur Qualité :</span>
                    <p className="font-sans text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      L'ébat axial se vérifie en soulevant délicatement le mobile par sa serge à l'aide de brucelles fines, l'œil collé à la loupe 10x ou 12x. Le jeu doit être immédiatement perceptible, libre, sans aucun point dur.
                    </p>
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px]">
                      ⚠️ Un ébat nul bloque la montre. Un ébat excessif provoque le désengrènement et la perte d'amplitude au pendu.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Toolbar: Direction Toggle & Module Filters */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          {/* Direction toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/40 p-1 rounded-xl">
            <button
              onClick={() => setCurrentDirection("remontage")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                currentDirection === "remontage"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ⚙️ Remontage & Lubrification
            </button>
            <button
              onClick={() => setCurrentDirection("demontage")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                currentDirection === "demontage"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🔧 Démontage Méthodique
            </button>
          </div>

          {/* Module filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: `Tous (${cal.steps.length})` },
              { id: "automatique", label: "Automatique" },
              { id: "balancier", label: "Échappement & Balancier" },
              { id: "rouage", label: "Rouage & Barillet" },
              { id: "cadran", label: "Tige & Calendrier" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveModuleFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeModuleFilter === f.id
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step-by-Step Workbench Timeline */}
        <div className="space-y-4">
          {displayedSteps.map((step, idx) => {
            const isRemontage = currentDirection === "remontage";
            const instructionText = isRemontage ? step.remontage : step.demontage;
            const actionLabel = isRemontage ? "Protocole de Remontage" : "Protocole de Démontage";

            return (
              <div
                key={step.num}
                className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-sm hover:border-amber-500/40 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      #{step.num}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{step.title}</h4>
                      <span className="text-xs font-mono text-slate-400">{step.ref}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${step.oilClass} font-bold`}>
                      💧 {step.oil}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                      🔩 {step.torque}
                    </span>
                  </div>
                </div>

                {/* 2-Columns Grid: Left (Instructions & Pitfall) - Right (Visual Blueprint) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Column (7 cols) */}
                  <div className="lg:col-span-7 space-y-3 text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block">
                        {actionLabel} :
                      </span>
                      <p className="text-sm font-sans text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-3.5 rounded-xl border border-slate-100 dark:border-white/5">
                        {instructionText}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      <strong>Outillage Bergeon / Dumont :</strong> {step.tool}
                    </div>

                    {/* Danger Pitfall */}
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-[10px] uppercase tracking-wider block mb-1">
                          ⚠️ Piège d'Atelier Critique :
                        </span>
                        <p className="text-[11px] font-sans leading-normal">{step.trap}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-red-500 mt-2 block font-mono">
                        Règle de l'Horloger Suisse
                      </span>
                    </div>
                  </div>

                  {/* Right Column (5 cols) : Visual Blueprint Box */}
                  <div className="lg:col-span-5 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/5">
                      <span className="text-[11px] font-bold font-mono text-amber-500 truncate">
                        {step.visualTitle}
                      </span>
                      <button
                        onClick={() => setLoupeModal({ isOpen: true, stepIdx: step.num - 1 })}
                        className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[10px] flex items-center gap-1 transition"
                      >
                        <ZoomIn className="w-3 h-3" /> Loupe 10x
                      </button>
                    </div>

                    {/* Visual Content: 6497 components or Vector SVG */}
                    {activeCalibre === "eta6497" && step.images && step.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
                        {step.images.map((img) => (
                          <div
                            key={img}
                            onClick={() => setLoupeModal({ isOpen: true, stepIdx: step.num - 1 })}
                            className="bg-black/40 border border-slate-100 dark:border-white/10 p-2 rounded-lg flex flex-col items-center hover:border-amber-500/50 transition group cursor-pointer"
                          >
                            <img
                              src={GITHUB_RAW_BASE + img}
                              alt={img}
                              className="h-14 object-contain group-hover:scale-110 transition duration-300"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = LOCAL_IMG_BASE + img;
                              }}
                            />
                            <span className="text-[9px] font-mono text-slate-400 group-hover:text-amber-400 mt-1 truncate w-full text-center">
                              {img.replace(".png", "").replace(".jpg", "")}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        onClick={() => setLoupeModal({ isOpen: true, stepIdx: step.num - 1 })}
                        className="rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition"
                      >
                        {renderSvgByKey(step.svgType)}
                      </div>
                    )}

                    <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>🎯 {step.oilSpot}</span>
                      <span className="text-amber-500 font-bold">NIHS 92-01</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Loupe d'Atelier 10x */}
        {loupeModal.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all">
            <div className="relative w-full max-w-4xl bg-[#0d121f] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                    🔍
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      {cal.name} — Étape #{modalStep.num} : {modalStep.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-400/80">
                      Outillage : {modalStep.tool} | Couple : {modalStep.torque} | Lubrifiant : {modalStep.oil}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setLoupeModal({ isOpen: false, stepIdx: 0 })}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#070a10]">
                <div className="w-full flex items-center justify-center">
                  {activeCalibre === "eta6497" && modalStep.images && modalStep.images.length > 0 ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
                        {modalStep.images.map((img) => (
                          <div key={img} className="bg-black/60 border border-amber-500/30 p-3 rounded-xl flex flex-col items-center">
                            <img
                              src={GITHUB_RAW_BASE + img}
                              alt={img}
                              className="h-28 object-contain drop-shadow-md hover:scale-110 transition duration-300"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = LOCAL_IMG_BASE + img;
                              }}
                            />
                            <span className="text-[10px] font-mono text-amber-400 mt-2 text-center truncate w-full">
                              {img.replace(".png", "").replace(".jpg", "")}
                            </span>
                          </div>
                        ))}
                      </div>
                      {modalStep.svgType && (
                        <div className="w-full max-w-xl mt-4 border-t border-white/10 pt-4">
                          <span className="text-xs font-mono text-slate-400 block mb-2 text-center">
                            Schéma Vectoriel Complémentaire :
                          </span>
                          {renderSvgByKey(modalStep.svgType)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl">
                      {renderSvgByKey(modalStep.svgType)}
                    </div>
                  )}
                </div>

                {/* Micro Annotations */}
                <div className="w-full mt-5 p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    <span>🔬 Directives d'Établi & Précision Micro-Mécanique :</span>
                  </div>
                  <p className="font-sans text-slate-300 leading-relaxed text-xs">
                    <strong>Consigne :</strong> {modalStep.remontage}
                  </p>
                  <p className="font-sans text-red-400 leading-relaxed text-xs mt-2">
                    <strong>Piège critique :</strong> {modalStep.trap}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Norme Horlogère Suisse NIHS & Contrôle Loupe 10x</span>
                <button
                  onClick={() => setLoupeModal({ isOpen: false, stepIdx: 0 })}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
                >
                  Fermer la loupe
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
