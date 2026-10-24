// src/components/LuxuryHeroClock.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LuxuryHeroClock() {
  const [mounted, setMounted] = useState(false);
  const [digitalTime, setDigitalTime] = useState('--:--:--');

  const hourHandRef = useRef<SVGGElement | null>(null);
  const minuteHandRef = useRef<SVGGElement | null>(null);
  const secondHandRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    setMounted(true);
    let animationFrameId: number;

    const renderSweep = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds() + ms / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      const hourDeg = h * 30;
      const minDeg = m * 6;
      const secDeg = s * 6;

      if (hourHandRef.current) {
        hourHandRef.current.setAttribute('transform', `rotate(${hourDeg})`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute('transform', `rotate(${minDeg})`);
      }
      if (secondHandRef.current) {
        secondHandRef.current.setAttribute('transform', `rotate(${secDeg})`);
      }

      animationFrameId = requestAnimationFrame(renderSweep);
    };

    renderSweep();

    const interval = setInterval(() => {
      setDigitalTime(new Date().toLocaleTimeString('fr-FR'));
    }, 1000);
    setDigitalTime(new Date().toLocaleTimeString('fr-FR'));

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex flex-col justify-center items-center select-none"
    >
      {/* Halo d'ambiance d'atelier doré */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Cadran Haute Horlogerie SVG Vectoriel 100% centré */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 aspect-square drop-shadow-2xl">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={mounted ? `Chronomètre Haute Horlogerie. Il est ${digitalTime}` : 'Chronomètre HorloLearn'}
        >
          <defs>
            {/* Dégradé Lunette Or Brossé */}
            <linearGradient id="heroGoldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDF0CD" />
              <stop offset="20%" stopColor="#D4AF37" />
              <stop offset="45%" stopColor="#8C6D1F" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#FDF0CD" />
              <stop offset="100%" stopColor="#8C6D1F" />
            </linearGradient>

            {/* Boîtier Titane & Anthracite Profond */}
            <radialGradient id="heroCaseSteel" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#141721" />
              <stop offset="92%" stopColor="#0A0C10" />
              <stop offset="100%" stopColor="#1E2333" />
            </radialGradient>

            {/* Aiguille Dauphine Facettée (Lumière / Ombre 3D) */}
            <linearGradient id="heroDauphineLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFEBB0" />
              <stop offset="100%" stopColor="#E5C469" />
            </linearGradient>
            <linearGradient id="heroDauphineDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A67C1E" />
              <stop offset="100%" stopColor="#735410" />
            </linearGradient>

            {/* Trotteuse acier bleui à la flamme */}
            <linearGradient id="heroBluedSteel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Motif Guilloché Clous de Paris */}
            <pattern id="heroClousDeParis" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="#0D1017" />
              <path d="M0,7 L7,0 L14,7 L7,14 Z" fill="#131824" stroke="#1D2436" strokeWidth="0.75" />
              <circle cx="7" cy="7" r="1.2" fill="#D4AF37" opacity="0.3" />
            </pattern>
          </defs>

          {/* 1. LUNETTE EXTÉRIEURE CANNELÉE & BOÎTIER */}
          <circle cx="250" cy="250" r="242" fill="url(#heroCaseSteel)" stroke="url(#heroGoldBezel)" strokeWidth="6" />
          <circle cx="250" cy="250" r="236" fill="none" stroke="#252A3B" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#heroGoldBezel)" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />

          {/* 2. CADRAN CENTRAL GUILLOCHÉ CLOUS DE PARIS */}
          <circle cx="250" cy="250" r="226" fill="url(#heroClousDeParis)" />

          {/* Anneau satiné pour les index */}
          <circle cx="250" cy="250" r="200" fill="none" stroke="#1A2030" strokeWidth="36" opacity="0.8" />
          <circle cx="250" cy="250" r="218" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.35" />
          <circle cx="250" cy="250" r="182" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />

          {/* 3. CHEMIN DE FER DES 60 MINUTES */}
          <g strokeLinecap="round" opacity="0.85">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180;
              const isQuarter = i % 15 === 0;
              const isHour = i % 5 === 0;
              const r1 = isQuarter ? 194 : isHour ? 202 : 210;
              const r2 = 218;
              const x1 = 250 + r1 * Math.sin(angle);
              const y1 = 250 - r1 * Math.cos(angle);
              const x2 = 250 + r2 * Math.sin(angle);
              const y2 = 250 - r2 * Math.cos(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth={isQuarter ? 3.5 : isHour ? 2.5 : 1.2}
                  stroke={isQuarter ? '#FDE047' : isHour ? '#E2B44F' : '#64748B'}
                />
              );
            })}
          </g>

          {/* 4. CARTOUCHE DE MANUFACTURE HAUTE HORLOGERIE */}
          <g textAnchor="middle">
            <text x="250" y="148" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#F3E5AB" letterSpacing="4">
              HORLOLEARN
            </text>
            <text x="250" y="163" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="#94A3B8" letterSpacing="2">
              CHRONOMÈTRE OFFICIEL
            </text>
            <text x="250" y="175" fontFamily="sans-serif" fontSize="7" fontWeight="500" fill="#D4AF37" letterSpacing="1.5">
              GENÈVE
            </text>
          </g>

          {/* 5. CŒUR OUVERT (OPEN HEART) À 6 HEURES (Centré en 0,0 translaté à 250, 335) */}
          <g transform="translate(250, 335)">
            {/* Puits circulaire du balancier */}
            <circle cx="0" cy="0" r="54" fill="#060709" stroke="url(#heroGoldBezel)" strokeWidth="3.5" />
            <circle cx="0" cy="0" r="48" fill="#0C0E14" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
            <circle cx="0" cy="0" r="46" fill="#151A26" />

            {/* Balancier oscillant à 4 Hz (28'800 alt/h) avec animation native SVG pure */}
            <g>
              <animateTransform attributeName="transform" type="rotate" values="-28; 28; -28" dur="0.25s" repeatCount="indefinite" />
              <circle cx="0" cy="0" r="38" fill="none" stroke="#FDE047" strokeWidth="3" opacity="0.85" />
              {/* Masselottes d'inertie */}
              <circle cx="0" cy="-38" r="2" fill="#D4AF37" />
              <circle cx="0" cy="38" r="2" fill="#D4AF37" />
              <circle cx="-38" cy="0" r="2" fill="#D4AF37" />
              <circle cx="38" cy="0" r="2" fill="#D4AF37" />
              {/* Bras du balancier */}
              <line x1="-38" y1="0" x2="38" y2="0" stroke="#FDE047" strokeWidth="2.5" />
              <line x1="0" y1="-38" x2="0" y2="38" stroke="#FDE047" strokeWidth="2.5" />
              {/* Spire régulatrice */}
              <circle cx="0" cy="0" r="14" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
            </g>

            {/* Coq de balancier traversant (Pont supérieur) */}
            <path d="M -35 -15 Q 0 -20 35 -15 L 30 10 Q 0 20 -30 10 Z" fill="#1E2433" stroke="url(#heroGoldBezel)" strokeWidth="1.5" />

            {/* Rubis synthétique d'axe de balancier (rouge corindon chatoyant) */}
            <circle cx="0" cy="0" r="8" fill="#E11D48" stroke="#FFE4E6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#9F1239" />
            <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8" />
          </g>

          <text x="250" y="418" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#64748B" letterSpacing="2" textAnchor="middle">
            SWISS MADE
          </text>

          {/* ============================================================== */}
          {/* 6. AIGUILLES DAUPHINES FACETTÉES 3D & TROTTEUSE (CENTRAGE ABSOLU 0,0) */}
          {/* ============================================================== */}
          <g transform="translate(250, 250)">
            {/* Aiguille des Heures Dauphine Facettée */}
            <g ref={hourHandRef}>
              <path d="M 0 0 L -7 0 L -1 -110 L 0 -115 Z" fill="url(#heroDauphineLight)" />
              <path d="M 0 0 L 7 0 L 1 -110 L 0 -115 Z" fill="url(#heroDauphineDark)" />
              <path d="M -5 0 L 5 0 L 2 20 L -2 20 Z" fill="#8C6D1F" />
            </g>

            {/* Aiguille des Minutes Dauphine Facettée */}
            <g ref={minuteHandRef}>
              <path d="M 0 0 L -6 0 L -0.5 -175 L 0 -180 Z" fill="url(#heroDauphineLight)" />
              <path d="M 0 0 L 6 0 L 0.5 -175 L 0 -180 Z" fill="url(#heroDauphineDark)" />
              <path d="M -4 0 L 4 0 L 2 28 L -2 28 Z" fill="#8C6D1F" />
            </g>

            {/* Canon de centre & rondelle polie */}
            <circle cx="0" cy="0" r="14" fill="url(#heroGoldBezel)" stroke="#000" strokeWidth="1" />
            <circle cx="0" cy="0" r="8" fill="#1E2333" />

            {/* Trotteuse centrale Haute Horlogerie complète et parfaitement visible */}
            <g ref={secondHandRef} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}>
              {/* Tige continue or éclatant du contrepoids arrière jusqu'à la pointe */}
              <line x1="0" y1="46" x2="0" y2="-216" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />

              {/* Pointe effilée haute précision pour le chemin de fer */}
              <polygon points="-1.5,-208 0,-218 1.5,-208" fill="#FDE047" />

              {/* Bague circulaire d'équilibrage du contrepoids arrière */}
              <circle cx="0" cy="30" r="6" fill="#141721" stroke="#FDE047" strokeWidth="1.8" />
              <circle cx="0" cy="30" r="2.5" fill="#E2B44F" />

              {/* Queue effilée du contrepoids */}
              <polygon points="-1,42 0,50 1,42" fill="#FDE047" />
            </g>

            {/* Coiffe centrale miroir dorée & cabochon rubis */}
            <circle cx="0" cy="0" r="5.5" fill="#E2B44F" stroke="#FDE047" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="2" fill="#E11D48" />
          </g>
        </svg>
      </div>

      {/* Affichage numérique chronométrique avec cadran actif */}
      <div className="mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-black/80 border border-amber-500/30 text-amber-400 font-mono text-xs sm:text-sm tracking-widest shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span suppressHydrationWarning>{mounted ? digitalTime : '--:--:--'}</span>
        </div>
      </div>
    </motion.div>
  );
}
