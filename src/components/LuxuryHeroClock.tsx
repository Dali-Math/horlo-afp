// src/components/LuxuryHeroClock.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LuxuryHeroClock() {
  const [mounted, setMounted] = useState(false);
  const [digitalTime, setDigitalTime] = useState('--:--:--');
  const [siderealTime, setSiderealTime] = useState('--:--:--');
  const [currentDate, setCurrentDate] = useState(24);
  const [moonPhaseInfo, setMoonPhaseInfo] = useState({
    name: 'Gibbeuse Croissante',
    illumination: 78,
    cycleDay: 11.4
  });

  const hourHandRef = useRef<SVGGElement | null>(null);
  const minuteHandRef = useRef<SVGGElement | null>(null);
  const secondHandRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    setMounted(true);
    let animationFrameId: number;

    // Calcul astronomique de la phase lunaire réelle (Cycle synodique 29.53058867 jours)
    const computeMoonPhase = () => {
      const knownNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57));
      const synodicMonth = 29.53058867;
      const now = new Date();
      const diffDays = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
      const cycleDay = (diffDays % synodicMonth + synodicMonth) % synodicMonth;

      let name = 'Lune Gibbeuse Croissante';
      let illumination = 75;

      if (cycleDay < 1.84) {
        name = 'Nouvelle Lune';
        illumination = 2;
      } else if (cycleDay < 7.38) {
        name = 'Premier Croissant';
        illumination = 25;
      } else if (cycleDay < 9.22) {
        name = 'Premier Quartier';
        illumination = 50;
      } else if (cycleDay < 14.76) {
        name = 'Lune Gibbeuse Croissante';
        illumination = 78;
      } else if (cycleDay < 16.61) {
        name = 'Pleine Lune';
        illumination = 100;
      } else if (cycleDay < 22.15) {
        name = 'Lune Gibbeuse Décroissante';
        illumination = 78;
      } else if (cycleDay < 23.99) {
        name = 'Dernier Quartier';
        illumination = 50;
      } else {
        name = 'Dernier Croissant';
        illumination = 25;
      }

      setMoonPhaseInfo({
        name,
        illumination,
        cycleDay: Math.round(cycleDay * 10) / 10
      });
    };

    computeMoonPhase();

    // Sweep 60 FPS fluide continue
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
        hourHandRef.current.setAttribute('transform', `rotate(${hourDeg} 280 320)`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute('transform', `rotate(${minDeg} 280 320)`);
      }
      if (secondHandRef.current) {
        secondHandRef.current.setAttribute('transform', `rotate(${secDeg} 280 320)`);
      }

      animationFrameId = requestAnimationFrame(renderSweep);
    };

    renderSweep();

    // Horloge digitale locale, date du jour & Heure Sidérale
    const updateTimes = () => {
      const now = new Date();
      setDigitalTime(now.toLocaleTimeString('fr-FR'));
      setCurrentDate(now.getDate());

      // Approximation Heure Sidérale de Genève (UTC + ~4.2 minutes d'avance sidérale)
      const utcSeconds = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
      const siderealOffset = 4.38 * 3600; // Constante méridien de référence
      const totalSidereal = (utcSeconds + siderealOffset) % 86400;
      const sh = Math.floor(totalSidereal / 3600);
      const sm = Math.floor((totalSidereal % 3600) / 60);
      const ss = Math.floor(totalSidereal % 60);
      setSiderealTime(
        `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
      );
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center py-4 select-none">
      
      {/* 1. SPHÈRE CÉLESTE & ASTROLABE EN ARRIÈRE-PLAN (Gravure or discrète) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 dark:opacity-45 overflow-visible">
        <svg viewBox="0 0 700 700" className="w-full h-full max-w-[680px]">
          <circle cx="350" cy="350" r="320" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2,4" />
          <circle cx="350" cy="350" r="280" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="350" cy="350" r="240" fill="none" stroke="#9C7723" strokeWidth="0.8" strokeDasharray="4,8" />
          
          {/* Lignes d'astrolabe orbital céleste (inclinaison écliptique 23.5°) */}
          <ellipse cx="350" cy="350" rx="320" ry="140" fill="none" stroke="#D4AF37" strokeWidth="0.7" transform="rotate(23.5 350 350)" />
          <ellipse cx="350" cy="350" rx="320" ry="140" fill="none" stroke="#D4AF37" strokeWidth="0.7" transform="rotate(-23.5 350 350)" />

          {/* Constellations dorées stipplées */}
          <g fill="#FFF2D6" opacity="0.75">
            <circle cx="220" cy="180" r="2" />
            <circle cx="245" cy="170" r="1.5" />
            <circle cx="280" cy="190" r="2.5" />
            <circle cx="310" cy="160" r="2" />
            <circle cx="340" cy="175" r="1.8" />
            <circle cx="380" cy="150" r="2" />
            <line x1="220" y1="180" x2="245" y2="170" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
            <line x1="245" y1="170" x2="280" y2="190" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
            <line x1="280" y1="190" x2="310" y2="160" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* 2. AGENCEMENT DU GARDE-TEMPS & DE LA COMPLICATION CÉLESTE */}
      <div className="relative z-10 w-full flex flex-col xl:flex-row items-center justify-center gap-6 lg:gap-8">
        
        {/* LE GARDE-TEMPS COMPLET DE MANUFACTURE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center scale-95 sm:scale-100 drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
        >
          <svg
            viewBox="0 0 560 680"
            className="w-full h-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] overflow-visible"
            role="img"
            aria-label={mounted ? `Chronomètre Haute Horlogerie Suisse. Il est ${digitalTime}` : 'Garde-Temps HorloLearn'}
          >
            <defs>
              {/* Dégradés Or et Métaux Nobles */}
              <linearGradient id="celGoldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="18%" stopColor="#E6C068" />
                <stop offset="42%" stopColor="#9C7723" />
                <stop offset="65%" stopColor="#F5D78E" />
                <stop offset="85%" stopColor="#9C7723" />
                <stop offset="100%" stopColor="#FFF2D6" />
              </linearGradient>

              <linearGradient id="celSteelCase" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E2330" />
                <stop offset="50%" stopColor="#333B4D" />
                <stop offset="100%" stopColor="#161A24" />
              </linearGradient>

              <linearGradient id="celDauphineLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF8E7" />
                <stop offset="100%" stopColor="#E8BE58" />
              </linearGradient>

              <linearGradient id="celDauphineDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A67E24" />
                <stop offset="100%" stopColor="#6E5010" />
              </linearGradient>

              <radialGradient id="celRubyGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FF6B8B" />
                <stop offset="45%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#6B031B" />
              </radialGradient>

              <radialGradient id="celSapphireCabochon" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="40%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#0A101D" />
              </radialGradient>

              {/* Bracelet en Cuir d'Alligator cousu main */}
              <pattern id="celAlligator" width="28" height="24" patternUnits="userSpaceOnUse">
                <rect width="28" height="24" fill="#12151D" />
                <path d="M0,0 L28,0 L26,22 L0,24 Z" fill="#0E1017" stroke="#1C212E" strokeWidth="1" />
                <path d="M4,4 Q14,2 24,5 Q23,19 13,20 Q3,18 4,4 Z" fill="#151922" stroke="#252C3D" strokeWidth="0.5" />
              </pattern>

              <linearGradient id="celStrapFadeTop" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#030712" stopOpacity="0" />
                <stop offset="70%" stopColor="#030712" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="celStrapFadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" stopOpacity="0" />
                <stop offset="70%" stopColor="#030712" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </linearGradient>

              {/* Cadran Guilloché Clous de Paris */}
              <pattern id="celClous" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#0C1019" />
                <polygon points="6,0 12,6 6,12 0,6" fill="#141B2B" stroke="#1F283E" strokeWidth="0.6" />
                <circle cx="6" cy="6" r="1.1" fill="#D4AF37" opacity="0.35" />
              </pattern>

              {/* Reflet Verre Saphir Anti-Reflet */}
              <linearGradient id="celSapphireGlare" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.10" />
                <stop offset="35%" stopColor="#818CF8" stopOpacity="0.04" />
                <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="75%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* 1. BRACELET CUIR D'ALLIGATOR */}
            <g opacity="0.95">
              {/* Brin supérieur */}
              <path d="M 195,150 L 195,20 L 365,20 L 365,150 Z" fill="url(#celAlligator)" />
              <path d="M 195,150 L 195,20 L 365,20 L 365,150 Z" fill="url(#celStrapFadeTop)" />
              <line x1="205" y1="150" x2="205" y2="40" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
              <line x1="355" y1="150" x2="355" y2="40" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />

              {/* Brin inférieur */}
              <path d="M 195,490 L 195,660 L 365,660 L 365,490 Z" fill="url(#celAlligator)" />
              <path d="M 195,490 L 195,660 L 365,660 L 365,490 Z" fill="url(#celStrapFadeBottom)" />
              <line x1="205" y1="490" x2="205" y2="640" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
              <line x1="355" y1="490" x2="355" y2="640" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            </g>

            {/* 2. CORNES SCULPTÉES DU BOÎTIER (LUGS) */}
            <g>
              <path d="M 180,190 C 170,140 185,90 200,60 L 222,60 C 210,100 200,145 205,190 Z" fill="url(#celSteelCase)" stroke="url(#celGoldBezel)" strokeWidth="1.5" />
              <path d="M 180,190 C 170,140 185,90 200,60" stroke="#FFF2D6" strokeWidth="1" opacity="0.6" fill="none" />

              <path d="M 380,190 C 390,140 375,90 360,60 L 338,60 C 350,100 360,145 355,190 Z" fill="url(#celSteelCase)" stroke="url(#celGoldBezel)" strokeWidth="1.5" />
              <path d="M 380,190 C 390,140 375,90 360,60" stroke="#FFF2D6" strokeWidth="1" opacity="0.6" fill="none" />

              <path d="M 180,450 C 170,500 185,550 200,580 L 222,580 C 210,540 200,495 205,450 Z" fill="url(#celSteelCase)" stroke="url(#celGoldBezel)" strokeWidth="1.5" />
              <path d="M 380,450 C 390,500 375,550 360,580 L 338,580 C 350,540 360,495 355,450 Z" fill="url(#celSteelCase)" stroke="url(#celGoldBezel)" strokeWidth="1.5" />
            </g>

            {/* 3. ORGANES DE COMMANDE : COURONNE & POUSSOIRS */}
            <g>
              <path d="M 445,215 L 468,205 L 474,217 L 452,228 Z" fill="url(#celGoldBezel)" stroke="#8C6D1F" strokeWidth="1" />
              <rect x="466" y="204" width="7" height="15" rx="2" transform="rotate(25 469 211)" fill="#E6C068" />

              <path d="M 460,305 L 492,305 L 496,312 L 496,328 L 492,335 L 460,335 Z" fill="url(#celGoldBezel)" stroke="#735410" strokeWidth="1.2" />
              {[310, 314, 318, 322, 326, 330].map(y => (
                <line key={y} x1="465" y1={y} x2="492" y2={y} stroke="#735410" strokeWidth="1.5" />
              ))}
              <ellipse cx="496" cy="320" rx="4.5" ry="9" fill="url(#celSapphireCabochon)" stroke="#1D4ED8" strokeWidth="1" />

              <path d="M 452,412 L 474,423 L 468,435 L 445,425 Z" fill="url(#celGoldBezel)" stroke="#8C6D1F" strokeWidth="1" />
              <rect x="466" y="420" width="7" height="15" rx="2" transform="rotate(-25 469 427)" fill="#E6C068" />
            </g>

            {/* 4. BOÎTIER PRINCIPAL & LUNETTE EN OR BROSSÉ ET POLI */}
            <g>
              <circle cx="280" cy="320" r="195" fill="url(#celSteelCase)" stroke="#0E121B" strokeWidth="4" />
              <circle cx="280" cy="320" r="188" fill="none" stroke="url(#celGoldBezel)" strokeWidth="5.5" />
              <circle cx="280" cy="320" r="183" fill="none" stroke="#0A0C10" strokeWidth="1.5" />
              <circle cx="280" cy="320" r="179" fill="none" stroke="url(#celGoldBezel)" strokeWidth="3" strokeDasharray="2,3" opacity="0.8" />
              <circle cx="280" cy="320" r="176" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />

              {/* 5. CADRAN GUILLOCHÉ CLOUS DE PARIS */}
              <circle cx="280" cy="320" r="172" fill="url(#celClous)" />
              <circle cx="280" cy="320" r="172" fill="none" stroke="#1D2436" strokeWidth="1.5" />

              {/* Rehaut Satiné pour les Index */}
              <circle cx="280" cy="320" r="152" fill="none" stroke="#141824" strokeWidth="26" opacity="0.85" />
              <circle cx="280" cy="320" r="165" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
              <circle cx="280" cy="320" r="139" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
            </g>

            {/* 6. CHEMIN DE FER DES 60 MINUTES */}
            <g strokeLinecap="round" opacity="0.95">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i * 6 * Math.PI) / 180;
                const isQuarter = i % 15 === 0;
                const isHour = i % 5 === 0;
                const r1 = isQuarter ? 147 : isHour ? 153 : 158;
                const r2 = 164;
                const x1 = 280 + r1 * Math.sin(angle);
                const y1 = 320 - r1 * Math.cos(angle);
                const x2 = 280 + r2 * Math.sin(angle);
                const y2 = 320 - r2 * Math.cos(angle);
                return (
                  <line
                    key={i}
                    x1={x1.toFixed(1)}
                    y1={y1.toFixed(1)}
                    x2={x2.toFixed(1)}
                    y2={y2.toFixed(1)}
                    stroke={isHour ? '#F5D78E' : '#788299'}
                    strokeWidth={isQuarter ? 2.5 : isHour ? 1.8 : 0.9}
                  />
                );
              })}
            </g>

            {/* 7. INDEX APPLIQUÉS EN OR 18 CARATS (6h pour le tourbillon, 3h pour le guichet date) */}
            <g>
              {[0, 1, 2, 4, 5, 7, 8, 9, 10, 11].map(h => {
                const angle = (h * 30 * Math.PI) / 180;
                const isCard = h % 3 === 0;
                const dist = 142;
                const cx = 280 + dist * Math.sin(angle);
                const cy = 320 - dist * Math.cos(angle);
                const rot = h * 30;
                const w = isCard ? 6 : 4;
                const hgt = isCard ? 18 : 13;
                return (
                  <g key={h} transform={`translate(${cx.toFixed(1)}, ${cy.toFixed(1)}) rotate(${rot})`}>
                    <rect x={-w / 2} y={-hgt / 2} width={w} height={hgt} rx="1" fill="url(#celGoldBezel)" stroke="#57400C" strokeWidth="0.5" />
                    <rect x={-w / 4} y={-hgt / 2 - 2} width={w / 2} height={hgt - 4} rx="0.5" fill="#E6FFFA" opacity="0.9" />
                  </g>
                );
              })}
            </g>

            {/* 7b. GUICHET DE DATE À 3 HEURES (Haute Horlogerie Suisse) */}
            <g id="heroDateWindow">
              {/* Cadre d'or 18k biseauté */}
              <rect x="387" y="307" width="37" height="26" rx="2.5" fill="#141824" stroke="url(#celGoldBezel)" strokeWidth="1.8" />
              {/* Fond du disque de date sombre et biseau intérieur */}
              <rect x="390" y="310" width="31" height="20" rx="1.5" fill="#0A0D15" stroke="#000" strokeWidth="0.8" />
              {/* Ombre de profondeur sous la lunette du guichet */}
              <line x1="390" y1="311" x2="421" y2="311" stroke="#000000" strokeWidth="1" opacity="0.9" />
              <line x1="391" y1="311" x2="391" y2="330" stroke="#000000" strokeWidth="1" opacity="0.8" />
              {/* Chiffre de la date en typographie de prestige */}
              <text
                x="405.5"
                y="325"
                fill="#FFF2D6"
                fontSize="13"
                fontWeight="700"
                fontFamily="Cinzel, 'Times New Roman', Georgia, serif"
                textAnchor="middle"
              >
                {mounted ? currentDate : 24}
              </text>
              {/* Reflet verre sur le guichet */}
              <path d="M 390,310 L 402,310 L 390,322 Z" fill="#FFFFFF" opacity="0.12" pointerEvents="none" />
            </g>

            {/* 8. INSCRIPTIONS HAUTE HORLOGERIE */}
            <g textAnchor="middle" fontFamily="Cinzel, 'Times New Roman', Georgia, serif">
              <text x="280" y="240" fill="#F5D78E" fontSize="13" letterSpacing="4.5" fontWeight="700">HORLOLEARN</text>
              <text x="280" y="254" fill="#D4AF37" fontSize="7" letterSpacing="2.5" opacity="0.85">CHRONOMÈTRE OFFICIEL</text>
              <text x="280" y="265" fill="#94A3B8" fontSize="6.5" letterSpacing="2" opacity="0.7">GENÈVE</text>
              <text x="280" y="445" fill="#D4AF37" fontSize="6" letterSpacing="3" opacity="0.8">SWISS MADE</text>
            </g>

            {/* 9. APERTURE OUVERTE DU TOURBILLON VOLANT À 6 HEURES */}
            <g transform="translate(280, 395)">
              <circle cx="0" cy="0" r="42" fill="#06080C" stroke="url(#celGoldBezel)" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="39" fill="none" stroke="#000" strokeWidth="2" opacity="0.7" />

              {/* Platine perlée */}
              <circle cx="0" cy="0" r="38" fill="#151922" opacity="0.85" />
              {[-22, -11, 0, 11, 22].map(x =>
                [-22, -11, 0, 11, 22].map(y => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="none" stroke="#2D3748" strokeWidth="0.5" opacity="0.4" />
                ))
              )}

              {/* Cage tournante du tourbillon (60s) */}
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
                
                <circle cx="0" cy="0" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.8" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                  <line
                    key={deg}
                    x1="0"
                    y1="0"
                    x2={(28 * Math.cos((deg * Math.PI) / 180)).toFixed(1)}
                    y2={(28 * Math.sin((deg * Math.PI) / 180)).toFixed(1)}
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    opacity="0.7"
                  />
                ))}

                <circle cx="0" cy="0" r="23" fill="none" stroke="#E6C068" strokeWidth="2" />
                {[0, 90, 180, 270].map(deg => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <circle
                      key={deg}
                      cx={(23 * Math.cos(rad)).toFixed(1)}
                      cy={(23 * Math.sin(rad)).toFixed(1)}
                      r="2"
                      fill="#FFF2D6"
                      stroke="#9C7723"
                      strokeWidth="0.5"
                    />
                  );
                })}

                <path
                  d="M 0,0 Q 4,2 6,-2 Q 8,-7 2,-9 Q -6,-10 -9,-3 Q -13,6 -5,13 Q 5,19 14,11 Q 21,2 17,-8"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="0.9"
                  opacity="0.85"
                >
                  <animateTransform attributeName="transform" type="scale" values="1; 1.08; 0.94; 1" dur="0.25s" repeatCount="indefinite" />
                </path>

                <path d="M -34,0 L -12,4 L 12,4 L 34,0 L 12,-4 L -12,-4 Z" fill="url(#celSteelCase)" stroke="url(#celGoldBezel)" strokeWidth="1" />
                <circle cx="-24" cy="0" r="2.2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="0.5" />
                <circle cx="24" cy="0" r="2.2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="0.5" />

                <circle cx="0" cy="0" r="6" fill="#D4AF37" stroke="#9C7723" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="4.2" fill="url(#celRubyGrad)" stroke="#5B0518" strokeWidth="0.6" />
                <circle cx="-1" cy="-1" r="1.2" fill="#FFF" opacity="0.8" />
              </g>

              <circle cx="0" cy="0" r="41" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" strokeDasharray="1.5, 2.78" />
            </g>

            {/* 10. AIGUILLES CENTRALES DAUPHINE 3D & TROTTEUSE SWISS CONTINUOUS */}
            <g>
              {/* Aiguille des Heures Dauphine 3D */}
              <g ref={hourHandRef} transform="rotate(0 280 320)">
                <path d="M 280,320 L 273,312 L 280,225 L 280,320 Z" fill="url(#celDauphineLight)" />
                <path d="M 280,320 L 287,312 L 280,225 L 280,320 Z" fill="url(#celDauphineDark)" />
                <line x1="280" y1="320" x2="280" y2="225" stroke="#FFFDF5" strokeWidth="0.75" />
                <circle cx="280" cy="320" r="7" fill="url(#celGoldBezel)" />
              </g>

              {/* Aiguille des Minutes Dauphine 3D */}
              <g ref={minuteHandRef} transform="rotate(0 280 320)">
                <path d="M 280,320 L 274,310 L 280,180 L 280,320 Z" fill="url(#celDauphineLight)" />
                <path d="M 280,320 L 286,310 L 280,180 L 280,320 Z" fill="url(#celDauphineDark)" />
                <line x1="280" y1="320" x2="280" y2="180" stroke="#FFFDF5" strokeWidth="0.75" />
                <circle cx="280" cy="320" r="6" fill="url(#celGoldBezel)" />
              </g>

              {/* Trotteuse Centrale Or Radiant avec Contre-Poids Ouvert */}
              <g ref={secondHandRef} transform="rotate(0 280 320)">
                <line x1="280" y1="365" x2="280" y2="162" stroke="#FDE047" strokeWidth="1.3" strokeLinecap="round" />
                <polygon points="280,158 278.5,166 281.5,166" fill="#FDE047" />
                <circle cx="280" cy="354" r="5" fill="none" stroke="#FDE047" strokeWidth="1.5" />
                <circle cx="280" cy="320" r="4.5" fill="url(#celGoldBezel)" stroke="#8C6D1F" strokeWidth="0.8" />
                <circle cx="280" cy="320" r="2.2" fill="url(#celRubyGrad)" />
                <circle cx="279.3" cy="319.3" r="0.7" fill="#FFF" opacity="0.9" />
              </g>
            </g>

            {/* 11. VERRE SAPHIR AVEC TRAITEMENT ANTI-REFLET */}
            <circle cx="280" cy="320" r="172" fill="url(#celSapphireGlare)" pointerEvents="none" />
            <path d="M 180,240 C 215,190 325,190 380,240 C 335,210 230,210 180,240 Z" fill="#FFFFFF" opacity="0.08" pointerEvents="none" />
          </svg>
        </motion.div>

        {/* 3. SOUS-MODULE HAUTE COMPLICATION ASTRONOMIQUE (DROITE) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full sm:w-64 lg:w-72 flex flex-col gap-3.5 z-20"
        >
          {/* Module Phase de Lune Réaliste */}
          <div className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 border border-amber-500/35 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-amber-400">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                COMPLICATION ASTRONOMIQUE
              </span>
              <span>29.53 JOURS</span>
            </div>

            {/* Disque Lunaire en Aventurine avec Lune Or Réaliste */}
            <div className="relative w-full h-28 rounded-xl bg-gradient-to-b from-[#060A17] to-[#0D152A] border border-amber-500/25 flex items-center justify-center overflow-hidden">
              {/* Ciel étoilé aventurine */}
              <div className="absolute inset-0 opacity-80 pointer-events-none">
                {[
                  [20, 25], [45, 65], [75, 18], [115, 55], [155, 20], [185, 70], [215, 35], [240, 60]
                ].map(([x, y], idx) => (
                  <span
                    key={idx}
                    className="absolute w-1 h-1 rounded-full bg-white opacity-70 animate-pulse"
                    style={{ left: `${x}px`, top: `${y}px`, animationDelay: `${idx * 0.3}s` }}
                  />
                ))}
              </div>

              {/* Lune Dorée avec Reliefs et Cratères d'orfèvrerie */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#8C6D1F] via-[#E6C068] to-[#FFF3D6] shadow-[0_0_25px_rgba(245,215,142,0.45)] border border-amber-300/40"
              >
                <span className="absolute w-3.5 h-3.5 rounded-full bg-[#8C6D1F]/40 top-3 left-4" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-[#8C6D1F]/40 top-8 left-8" />
                <span className="absolute w-2 h-2 rounded-full bg-[#8C6D1F]/40 top-5 left-10" />
                <span className="absolute w-1.5 h-1.5 rounded-full bg-[#8C6D1F]/30 top-10 left-3" />
              </motion.div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-slate-800 dark:text-white">Phase de Lune Réelle</span>
              <span className="font-mono text-[11px] text-amber-500 dark:text-amber-300 font-semibold">
                {mounted ? moonPhaseInfo.name : 'Calcul en cours...'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Précision suisse : 1 jour d'écart tous les 122 ans.
            </div>
          </div>

          {/* Équation du Temps */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 dark:bg-slate-950/80 border border-amber-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>ÉQUATION DU TEMPS</span>
              <span className="text-amber-400 font-bold">+14 MIN</span>
            </div>
            <div className="text-xs font-serif text-slate-700 dark:text-slate-200 mt-1">
              Écart Temps Vrai &amp; Temps Moyen
            </div>
          </div>

          {/* Heure Sidérale & Contrôle Genève */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 dark:bg-slate-950/80 border border-amber-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>HEURE SIDÉRALE GENÈVE</span>
              <span className="text-amber-400 font-bold font-mono">
                {mounted ? siderealTime : '--:--:--'}
              </span>
            </div>
            <div className="text-xs font-serif text-slate-700 dark:text-slate-200 mt-1">
              Méridien de Référence Horloger
            </div>
          </div>

          {/* Badge Certification Diurne */}
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-500 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✦</span> CHRONOMÈTRE OFFICIEL
            </span>
            <span className="font-bold">{mounted ? digitalTime : '--:--:--'}</span>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
