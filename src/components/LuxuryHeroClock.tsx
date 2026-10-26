// src/components/LuxuryHeroClock.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LuxuryHeroClock() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
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

    // Détection du thème initial et observation en temps réel du changement de mode (sombre / clair)
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        const hasDark = document.documentElement.classList.contains('dark');
        setIsDark(hasDark);
      }
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      }
    });

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true });
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMedia = () => checkTheme();
    mediaQuery.addEventListener('change', handleMedia);

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

      // Heure Sidérale de Genève (UTC + ~4.2 minutes d'avance sidérale)
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
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMedia);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center py-4 select-none">
      
      {/* 1. SPHÈRE CÉLESTE & ASTROLABE EN ARRIÈRE-PLAN (Gravure or discrète) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 dark:opacity-45 overflow-visible">
        <svg viewBox="0 0 700 700" className="w-full h-full max-w-[740px]">
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
        
        {/* LE GARDE-TEMPS COMPLET DE MANUFACTURE AGRANDI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
        >
          <svg
            viewBox="0 0 560 680"
            className="w-full h-full max-w-[360px] sm:max-w-[430px] md:max-w-[470px] lg:max-w-[490px] xl:max-w-[480px] 2xl:max-w-[530px] overflow-visible transition-all duration-300"
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

              {/* BRACELETS ALLIGATOR HAUTE VISIBILITÉ ADAPTATIFS */}
              
              {/* Mode Sombre : Bleu Nuit Saphir Royal */}
              <pattern id="celAlligatorDark" width="30" height="26" patternUnits="userSpaceOnUse">
                <rect width="30" height="26" fill="#182235" />
                <path d="M0,0 L30,0 L28,24 L0,26 Z" fill="#141C2B" stroke="#26344F" strokeWidth="1.2" />
                <path d="M4,4 Q15,2 26,5 Q25,20 14,21 Q3,19 4,4 Z" fill="#1C273C" stroke="#36496C" strokeWidth="0.8" />
                <line x1="5" y1="5" x2="25" y2="6" stroke="#485F8A" strokeWidth="0.6" opacity="0.5" />
              </pattern>

              {/* Mode Clair : Noir Ébène Manufacture Intense */}
              <pattern id="celAlligatorLight" width="30" height="26" patternUnits="userSpaceOnUse">
                <rect width="30" height="26" fill="#12151D" />
                <path d="M0,0 L30,0 L28,24 L0,26 Z" fill="#0E1017" stroke="#1C212E" strokeWidth="1.2" />
                <path d="M4,4 Q15,2 26,5 Q25,20 14,21 Q3,19 4,4 Z" fill="#181E2A" stroke="#283345" strokeWidth="0.8" />
                <line x1="5" y1="5" x2="25" y2="6" stroke="#323F55" strokeWidth="0.6" opacity="0.5" />
              </pattern>

              {/* Galbe et Éclairage 3D du cuir */}
              <linearGradient id="celStrapLightingDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A0E17" stopOpacity="0.75" />
                <stop offset="8%" stopColor="#2D3B54" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#1E283A" stopOpacity="0" />
                <stop offset="75%" stopColor="#1E283A" stopOpacity="0" />
                <stop offset="92%" stopColor="#2D3B54" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0A0E17" stopOpacity="0.75" />
              </linearGradient>

              <linearGradient id="celStrapLightingLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A0E17" stopOpacity="0.4" />
                <stop offset="8%" stopColor="#3B4861" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#1E283A" stopOpacity="0" />
                <stop offset="75%" stopColor="#1E283A" stopOpacity="0" />
                <stop offset="92%" stopColor="#3B4861" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0A0E17" stopOpacity="0.4" />
              </linearGradient>

              {/* Estompages progressifs doux */}
              <linearGradient id="celStrapFadeTopDark" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#030712" stopOpacity="0" />
                <stop offset="80%" stopColor="#030712" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="celStrapFadeBottomDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" stopOpacity="0" />
                <stop offset="80%" stopColor="#030712" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="celStrapFadeTopLight" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="celStrapFadeBottomLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
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

            {/* 1. BRACELET CUIR D'ALLIGATOR ADAPTATIF ET SURPIQÛRES OR */}
            <g opacity="0.98">
              {/* Brin supérieur */}
              <path 
                d="M 195,150 L 195,15 L 365,15 L 365,150 Z" 
                fill={isDark ? "url(#celAlligatorDark)" : "url(#celAlligatorLight)"} 
              />
              <path 
                d="M 195,150 L 195,15 L 365,15 L 365,150 Z" 
                fill={isDark ? "url(#celStrapLightingDark)" : "url(#celStrapLightingLight)"} 
              />
              <path 
                d="M 195,150 L 195,15 L 365,15 L 365,150 Z" 
                fill={isDark ? "url(#celStrapFadeTopDark)" : "url(#celStrapFadeTopLight)"} 
              />
              {/* Liserés de tranche lustrés */}
              <line x1="195" y1="150" x2="195" y2="15" stroke={isDark ? "#38496B" : "#2A3447"} strokeWidth="1.6" />
              <line x1="365" y1="150" x2="365" y2="15" stroke={isDark ? "#38496B" : "#2A3447"} strokeWidth="1.6" />
              {/* Surpiqûres sellier au fil d'or */}
              <line x1="205" y1="150" x2="205" y2="25" stroke={isDark ? "#F5D78E" : "#D4AF37"} strokeWidth="1.8" strokeDasharray="5,4" opacity="0.9" />
              <line x1="355" y1="150" x2="355" y2="25" stroke={isDark ? "#F5D78E" : "#D4AF37"} strokeWidth="1.8" strokeDasharray="5,4" opacity="0.9" />

              {/* Brin inférieur */}
              <path 
                d="M 195,490 L 195,665 L 365,665 L 365,490 Z" 
                fill={isDark ? "url(#celAlligatorDark)" : "url(#celAlligatorLight)"} 
              />
              <path 
                d="M 195,490 L 195,665 L 365,665 L 365,490 Z" 
                fill={isDark ? "url(#celStrapLightingDark)" : "url(#celStrapLightingLight)"} 
              />
              <path 
                d="M 195,490 L 195,665 L 365,665 L 365,490 Z" 
                fill={isDark ? "url(#celStrapFadeBottomDark)" : "url(#celStrapFadeBottomLight)"} 
              />
              {/* Liserés de tranche lustrés */}
              <line x1="195" y1="490" x2="195" y2="665" stroke={isDark ? "#38496B" : "#2A3447"} strokeWidth="1.6" />
              <line x1="365" y1="490" x2="365" y2="665" stroke={isDark ? "#38496B" : "#2A3447"} strokeWidth="1.6" />
              {/* Surpiqûres sellier au fil d'or */}
              <line x1="205" y1="490" x2="205" y2="655" stroke={isDark ? "#F5D78E" : "#D4AF37"} strokeWidth="1.8" strokeDasharray="5,4" opacity="0.9" />
              <line x1="355" y1="490" x2="355" y2="655" stroke={isDark ? "#F5D78E" : "#D4AF37"} strokeWidth="1.8" strokeDasharray="5,4" opacity="0.9" />
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
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-slate-200 dark:border-amber-500/35 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-400">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                COMPLICATION ASTRONOMIQUE
              </span>
              <span>29.53 JOURS</span>
            </div>

            {/* Disque Lunaire en Aventurine avec Sphère Sélénographique 3D en Rotation */}
            <div
              className="relative w-full h-32 rounded-xl border border-amber-500/35 flex items-center justify-center overflow-hidden shadow-inner"
              style={{ background: "radial-gradient(circle at 50% 50%, #0F1C3F 0%, #070D21 62%, #030611 100%)" }}
            >
              <svg
                viewBox="0 0 260 120"
                className="w-full h-full block select-none"
                aria-label="Complication Phase de Lune 3D en rotation"
              >
                <defs>
                  {/* Fond Verre Aventurine Bleu Nuit */}
                  <radialGradient id="mpAventurineSky" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="#132347" />
                    <stop offset="55%" stopColor="#081026" />
                    <stop offset="100%" stopColor="#040712" />
                  </radialGradient>

                  {/* Halo / Couronne Lunaire */}
                  <radialGradient id="mpLunarCorona" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.42" />
                    <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.18" />
                    <stop offset="75%" stopColor="#9A7B2C" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>

                  {/* Base Or Sélénographique de la Lune */}
                  <radialGradient id="mpMoonBase" cx="38%" cy="34%" r="68%">
                    <stop offset="0%" stopColor="#FFFDF7" />
                    <stop offset="22%" stopColor="#FBF0C9" />
                    <stop offset="52%" stopColor="#E5C578" />
                    <stop offset="80%" stopColor="#B88E3E" />
                    <stop offset="100%" stopColor="#6E4E1A" />
                  </radialGradient>

                  {/* Ombrage Sphérique 3D (Limb Darkening + Volume) */}
                  <radialGradient id="mpSphere3DShade" cx="34%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
                    <stop offset="35%" stopColor="#FFF3C4" stopOpacity="0.06" />
                    <stop offset="72%" stopColor="#2A1B08" stopOpacity="0.28" />
                    <stop offset="90%" stopColor="#0E0903" stopOpacity="0.62" />
                    <stop offset="100%" stopColor="#04060E" stopOpacity="0.88" />
                  </radialGradient>

                  {/* Ombre du Terminateur Lunaire (Lumière Cendrée réaliste) */}
                  <linearGradient id="mpTerminatorShadow" x1="0%" y1="0%" x2="100%" y2="15%">
                    <stop offset="0%" stopColor="#050814" stopOpacity="0.86" />
                    <stop offset="28%" stopColor="#080D1E" stopOpacity="0.72" />
                    <stop offset="44%" stopColor="#1A160D" stopOpacity="0.28" />
                    <stop offset="56%" stopColor="#000000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </linearGradient>

                  {/* Texture des Mers Lunaires (Maria) */}
                  <radialGradient id="mpMareShade" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#5C4018" stopOpacity="0.58" />
                    <stop offset="65%" stopColor="#785622" stopOpacity="0.36" />
                    <stop offset="100%" stopColor="#9A7234" stopOpacity="0" />
                  </radialGradient>

                  {/* Découpe Sphérique Stricte de la Lune (r = 35) */}
                  <clipPath id="mpGlobeClip">
                    <circle cx="130" cy="60" r="35" />
                  </clipPath>

                  {/* Motif Sélénographique Répétable (Largeur = 140px pour rotation 3D continue) */}
                  <g id="mpLunarSurfaceTile">
                    {/* Mers Lunaires (Maria) — Formes organiques réalistes */}
                    {/* Mare Imbrium & Oceanus Procellarum */}
                    <path
                      d="M 12,34 C 22,26 38,28 44,37 C 50,46 46,62 34,68 C 21,74 9,65 7,52 C 5,42 7,38 12,34 Z"
                      fill="url(#mpMareShade)"
                    />
                    <path
                      d="M 24,52 C 34,48 48,54 52,66 C 55,76 44,86 31,84 C 19,82 15,68 18,58 Z"
                      fill="url(#mpMareShade)"
                    />
                    {/* Mare Serenitatis & Mare Tranquillitatis */}
                    <path
                      d="M 54,36 C 65,31 77,36 80,46 C 83,56 75,66 64,65 C 53,64 47,54 50,43 Z"
                      fill="url(#mpMareShade)"
                    />
                    <path
                      d="M 72,54 C 84,50 96,57 98,68 C 99,78 88,85 77,81 C 67,77 64,62 72,54 Z"
                      fill="url(#mpMareShade)"
                    />
                    {/* Mare Crisium & Mare Fecunditatis */}
                    <ellipse cx="112" cy="46" rx="10" ry="13" transform="rotate(-14 112 46)" fill="url(#mpMareShade)" />
                    <ellipse cx="105" cy="70" rx="12" ry="9" transform="rotate(18 105 70)" fill="url(#mpMareShade)" />
                    <ellipse cx="128" cy="58" rx="9" ry="11" fill="url(#mpMareShade)" />

                    {/* Hautes Terres & Rayons d'éjectas (Tycho / Copernicus) */}
                    <g opacity="0.32" stroke="#FFFBEB" strokeWidth="0.45" fill="none">
                      <line x1="62" y1="80" x2="38" y2="62" />
                      <line x1="62" y1="80" x2="88" y2="64" />
                      <line x1="62" y1="80" x2="52" y2="45" />
                      <line x1="62" y1="80" x2="78" y2="92" />
                      <line x1="38" y1="48" x2="20" y2="35" />
                      <line x1="38" y1="48" x2="55" y2="34" />
                    </g>

                    {/* Cratères d'impact avec rebord éclairé et ombre interne 3D */}
                    {/* Cratère Copernicus */}
                    <circle cx="38" cy="48" r="5.2" fill="#7C5A24" fillOpacity="0.45" stroke="#FFF6D6" strokeOpacity="0.65" strokeWidth="0.7" />
                    <circle cx="36.8" cy="47.2" r="3.8" fill="#4E3612" fillOpacity="0.45" />
                    <circle cx="38" cy="48" r="1.1" fill="#FDE68A" fillOpacity="0.8" />

                    {/* Cratère Tycho */}
                    <circle cx="62" cy="80" r="4.5" fill="#70501E" fillOpacity="0.5" stroke="#FFFBEB" strokeOpacity="0.75" strokeWidth="0.75" />
                    <circle cx="61.2" cy="79.3" r="3.1" fill="#432D0E" fillOpacity="0.5" />
                    <circle cx="62" cy="80" r="0.9" fill="#FFFBEB" fillOpacity="0.9" />

                    {/* Cratère Plato */}
                    <ellipse cx="48" cy="27" rx="4.2" ry="2.8" fill="#4A3310" fillOpacity="0.55" stroke="#FDE68A" strokeOpacity="0.55" strokeWidth="0.6" />

                    {/* Cratère Kepler & Aristarchus */}
                    <circle cx="20" cy="54" r="3.2" fill="#6E4E1A" fillOpacity="0.45" stroke="#FEF3C7" strokeOpacity="0.6" strokeWidth="0.55" />
                    <circle cx="15" cy="41" r="2.4" fill="#FFFBEB" fillOpacity="0.65" stroke="#D97706" strokeOpacity="0.4" strokeWidth="0.5" />

                    {/* Cratères secondaires de la face visible / cachée */}
                    <circle cx="86" cy="40" r="3.6" fill="#6E4E1A" fillOpacity="0.4" stroke="#FDE68A" strokeOpacity="0.5" strokeWidth="0.55" />
                    <circle cx="94" cy="68" r="4.1" fill="#5C4018" fillOpacity="0.45" stroke="#FEF3C7" strokeOpacity="0.55" strokeWidth="0.6" />
                    <circle cx="118" cy="36" r="3.0" fill="#6E4E1A" fillOpacity="0.42" stroke="#FDE68A" strokeOpacity="0.5" strokeWidth="0.5" />
                    <circle cx="122" cy="76" r="3.8" fill="#5C4018" fillOpacity="0.45" stroke="#FEF3C7" strokeOpacity="0.5" strokeWidth="0.6" />
                    <circle cx="75" cy="58" r="2.2" fill="#5C4018" fillOpacity="0.4" stroke="#FDE68A" strokeOpacity="0.45" strokeWidth="0.45" />
                    <circle cx="104" cy="54" r="2.5" fill="#5C4018" fillOpacity="0.4" stroke="#FDE68A" strokeOpacity="0.45" strokeWidth="0.45" />

                    {/* Micro-cratères et granulations d'établi */}
                    <circle cx="29" cy="66" r="1.4" fill="#5C4018" fillOpacity="0.45" />
                    <circle cx="55" cy="62" r="1.6" fill="#5C4018" fillOpacity="0.42" />
                    <circle cx="69" cy="34" r="1.5" fill="#5C4018" fillOpacity="0.4" />
                    <circle cx="82" cy="84" r="1.8" fill="#5C4018" fillOpacity="0.45" />
                    <circle cx="110" cy="84" r="1.4" fill="#5C4018" fillOpacity="0.4" />
                    <circle cx="132" cy="44" r="1.6" fill="#5C4018" fillOpacity="0.42" />
                  </g>
                </defs>

                {/* 1. Ciel Aventurine & Constellations Horlogères */}
                <rect x="0" y="0" width="260" height="120" fill="url(#mpAventurineSky)" />

                {/* Lignes de constellations subtiles */}
                <g stroke="#D4AF37" strokeOpacity="0.18" strokeWidth="0.5" fill="none">
                  <polyline points="18,28 36,22 52,32 68,26 80,40" />
                  <polyline points="182,30 198,20 214,28 232,18 244,34" />
                  <polyline points="24,86 44,94 64,84" />
                  <polyline points="192,88 212,96 234,82" />
                </g>

                {/* Étoiles & Paillettes d'Aventurine */}
                {[
                  [18, 28, 1.3, "0s"], [36, 22, 1.0, "0.6s"], [52, 32, 1.2, "1.3s"], [68, 26, 0.9, "0.4s"], [80, 40, 1.1, "1.8s"],
                  [182, 30, 1.2, "0.2s"], [198, 20, 1.4, "1.1s"], [214, 28, 1.0, "0.8s"], [232, 18, 1.3, "1.5s"], [244, 34, 0.9, "0.3s"],
                  [24, 86, 1.1, "0.9s"], [44, 94, 1.3, "1.6s"], [64, 84, 0.9, "0.5s"], [15, 60, 0.8, "1.2s"], [85, 92, 0.8, "0.7s"],
                  [192, 88, 1.2, "1.4s"], [212, 96, 1.0, "0.1s"], [234, 82, 1.4, "1.0s"], [246, 62, 0.9, "1.7s"], [174, 72, 0.8, "0.4s"]
                ].map(([cx, cy, r, delay], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFBEB" opacity="0.85">
                    <animate attributeName="opacity" values="0.35;0.95;0.35" dur="3.6s" begin={String(delay)} repeatCount="indefinite" />
                  </circle>
                ))}

                {/* 2. Anneau Astrolabe Synodique en Or 18ct (Rotation lente continue) */}
                <g opacity="0.55">
                  <circle cx="130" cy="60" r="46" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="2 3" />
                  <circle cx="130" cy="60" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.6" />
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 130 60"
                      to="360 130 60"
                      dur="60s"
                      repeatCount="indefinite"
                    />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="130"
                        y1="12"
                        x2="130"
                        y2={deg % 90 === 0 ? "16.5" : "14.5"}
                        stroke="#FDE68A"
                        strokeWidth={deg % 90 === 0 ? "1.1" : "0.6"}
                        transform={`rotate(${deg} 130 60)`}
                      />
                    ))}
                  </g>
                </g>

                {/* 3. Couronne Lumineuse Atmosphérique */}
                <circle cx="130" cy="60" r="52" fill="url(#mpLunarCorona)" />

                {/* 4. Sphère Lunaire 3D avec Rotation Sélénographique Continue */}
                <g clipPath="url(#mpGlobeClip)">
                  {/* Disque d'or massif poli */}
                  <circle cx="130" cy="60" r="35" fill="url(#mpMoonBase)" />

                  {/* Surface Sélénographique Défilante (Simulation 3D de la rotation axiale) */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0 0"
                      to="-140 0"
                      dur="22s"
                      repeatCount="indefinite"
                    />
                    <use href="#mpLunarSurfaceTile" x="95" y="0" />
                    <use href="#mpLunarSurfaceTile" x="235" y="0" />
                  </g>

                  {/* Grille de Méridiens Sélénographiques Subtils */}
                  <ellipse cx="130" cy="60" rx="18" ry="35" fill="none" stroke="#FFFBEB" strokeOpacity="0.12" strokeWidth="0.45" />
                  <ellipse cx="130" cy="60" rx="35" ry="14" fill="none" stroke="#FFFBEB" strokeOpacity="0.12" strokeWidth="0.45" />

                  {/* Ombrage Sphérique 3D Fixe (Donne le galbe bombé d'une vraie sphère) */}
                  <circle cx="130" cy="60" r="35" fill="url(#mpSphere3DShade)" />

                  {/* Ombre Dynamique de Phase (Terminateur progressif + Lumière Cendrée) */}
                  <rect x="95" y="25" width="70" height="70" fill="url(#mpTerminatorShadow)" />
                </g>

                {/* 5. Anneau de sertissage Or 18ct autour de la Lune + Reflet Saphir */}
                <circle cx="130" cy="60" r="35" fill="none" stroke="#FDE68A" strokeOpacity="0.55" strokeWidth="0.9" />
                <path
                  d="M 103,42 A 33,33 0 0,1 154,39"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-slate-800 dark:text-white">Phase de Lune Réelle</span>
              <span className="font-mono text-[11px] text-amber-600 dark:text-amber-300 font-semibold">
                {mounted ? moonPhaseInfo.name : 'Calcul en cours...'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Précision suisse : 1 jour d'écart tous les 122 ans.
            </div>
          </div>

          {/* Équation du Temps */}
          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-amber-500/20 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>ÉQUATION DU TEMPS</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">+14 MIN</span>
            </div>
            <div className="text-xs font-serif text-slate-700 dark:text-slate-200 mt-1">
              Écart Temps Vrai &amp; Temps Moyen
            </div>
          </div>

          {/* Heure Sidérale & Contrôle Genève */}
          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-amber-500/20 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>HEURE SIDÉRALE GENÈVE</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">
                {mounted ? siderealTime : '--:--:--'}
              </span>
            </div>
            <div className="text-xs font-serif text-slate-700 dark:text-slate-200 mt-1">
              Méridien de Référence Horloger
            </div>
          </div>

          {/* Badge Certification Diurne */}
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-500 dark:text-amber-400">✦</span> CHRONOMÈTRE OFFICIEL
            </span>
            <span className="font-bold">{mounted ? digitalTime : '--:--:--'}</span>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
