// src/app/theorie/mouvements/demagnetisation-procedure/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Compass,
  Zap,
  Activity,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Radio,
  Sliders,
  Eye,
  Ruler,
  Volume2
} from 'lucide-react';

type TabMode = 'simulateur' | 'spiral' | 'boussole' | 'witschi' | 'normes';

export default function DemagnetisationProcedurePage() {
  const [activeTab, setActiveTab] = useState<TabMode>('simulateur');

  // État de la montre
  const [isMagnetized, setIsMagnetized] = useState<boolean>(true);
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false);
  const [watchDistance, setWatchDistance] = useState<number>(0); // 0 cm = sur la plaque, 40 cm = éloignée
  const [residualGauss, setResidualGauss] = useState<number>(85); // 85 Gauss initial
  const [procedureSuccess, setProcedureSuccess] = useState<boolean>(false);
  const [procedureWarning, setProcedureWarning] = useState<string | null>(null);

  // Animation spiral
  const [spiralAngle, setSpiralAngle] = useState(0);

  // Animation continue du balancier
  useEffect(() => {
    let animId: number;
    let start: number | null = null;
    const loop = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / 1000;
      // Vitesse d'oscillation : plus rapide et saccadée si magnétisé
      const speed = isMagnetized ? 12 : 7;
      setSpiralAngle(Math.sin(progress * speed) * (isMagnetized ? 15 : 32));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isMagnetized]);

  // Gestion du geste d'atelier sur le démagnétiseur
  const handlePowerDown = () => {
    setIsPowerOn(true);
    setProcedureWarning(null);
  };

  const handlePowerUp = () => {
    setIsPowerOn(false);
    // Vérification du geste : Si le bouton a été relâché alors que la montre est encore trop proche (< 25 cm)
    if (watchDistance < 25 && isMagnetized) {
      setProcedureWarning(
        'Erreur d’atelier : Vous avez relâché le bouton trop près de la bobine ! Le champ coupé net a remagnétisé le spiral.'
      );
      setResidualGauss(75);
    } else if (watchDistance >= 25 && isMagnetized) {
      // Geste parfait : éloignement sous champ alternatif
      setIsMagnetized(false);
      setResidualGauss(0.8);
      setProcedureSuccess(true);
      setProcedureWarning(null);
    }
  };

  const resetWatch = () => {
    setIsMagnetized(true);
    setWatchDistance(0);
    setResidualGauss(85);
    setProcedureSuccess(false);
    setProcedureWarning(null);
  };

  // Calcul de la déviation de l'aiguille de boussole selon la distance
  const compassAngle = isMagnetized
    ? Math.max(0, 75 - watchDistance * 1.8) // Déviation jusqu'à 75°
    : 0; // Parfaitement au Nord si démagnétisé

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header Sticky */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/theorie/mouvements"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour Mouvements</span>
            </Link>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Métrologie &amp; Diagnostic d’Établi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Norme ISO 764 / NIHS 90-10
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                isMagnetized
                  ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              }`}
            >
              {isMagnetized ? 'État : Magnétisé' : 'État : Sain & Démagnétisé'}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Titre & Introduction */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-amber-500 to-amber-700 dark:from-red-400 dark:via-amber-300 dark:to-yellow-500 bg-clip-text text-transparent">
              Procédure de Démagnétisation
            </h1>
            <button
              onClick={resetWatch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser l’épreuve (Montre magnétisée)
            </button>
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
            La magnétisation est la panne d’établi la plus fréquente : deux spires du spiral s’attirent et collent, provoquant une avance soudaine de plusieurs minutes ou heures par jour.
            Maîtrisez le geste physique d’annulation du champ coercitif par onde sinusoïdale amortie.
          </p>
        </div>

        {/* Barre de navigation des modes interactifs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-200/70 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('simulateur')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'simulateur'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Simulateur d’Appareil</span>
          </button>

          <button
            onClick={() => setActiveTab('spiral')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'spiral'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Macro-Vue du Spiral</span>
          </button>

          <button
            onClick={() => setActiveTab('boussole')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'boussole'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Test à la Boussole</span>
          </button>

          <button
            onClick={() => setActiveTab('witschi')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'witschi'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Banc Witschi (Tracé)</span>
          </button>

          <button
            onClick={() => setActiveTab('normes')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'normes'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Règles d’Atelier (ISO)</span>
          </button>
        </div>

        {/* 1. SIMULATEUR D'APPAREIL DÉMAGNÉTISEUR */}
        {activeTab === 'simulateur' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Banc physique interactif */}
            <div className="lg:col-span-8 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl space-y-6">
              {/* Grille technique */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px)',
                  backgroundSize: '24px 24px, 48px 48px'
                }}
              />

              <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    DÉMAGNÉTISEUR HORLOGER HAUTE FRÉQUENCE • 50/60 HZ
                  </span>
                </div>
                <div className="text-xs font-mono text-amber-400">
                  CHAMP RÉSIDUEL : {residualGauss.toFixed(1)} GAUSS
                </div>
              </div>

              {/* Zone visuelle de travail */}
              <div className="relative h-80 flex flex-col items-center justify-end pb-8">
                {/* Lignes de champ magnétique sinusoïdal (quand sous tension) */}
                {isPowerOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <svg width="400" height="300" viewBox="-200 -150 400 300">
                      <g stroke="#38BDF8" stroke-width="2" fill="none" opacity="0.6">
                        <ellipse cx="0" cy="80" rx="180" ry="120" stroke-dasharray="6 6" />
                        <ellipse cx="0" cy="80" rx="140" ry="90" stroke-dasharray="4 4" />
                        <ellipse cx="0" cy="80" rx="90" ry="60" />
                        <ellipse cx="0" cy="80" rx="40" ry="30" stroke="#F59E0B" stroke-width="3" />
                      </g>
                    </svg>
                  </motion.div>
                )}

                {/* Montre mobile (déplacement vertical selon le curseur) */}
                <motion.div
                  style={{
                    transform: `translateY(${-watchDistance * 5}px)`
                  }}
                  className="relative z-20 cursor-grab active:cursor-grabbing transition-transform duration-75"
                >
                  {/* Représentation graphique de la montre */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-amber-400 shadow-2xl flex items-center justify-center relative">
                      {/* Cadran & Aiguilles */}
                      <div className="w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center relative">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <div
                          className="absolute w-6 h-0.5 bg-white origin-left"
                          style={{ transform: `rotate(${spiralAngle * 3}deg)` }}
                        />
                        <div
                          className="absolute w-8 h-0.5 bg-amber-400 origin-left"
                          style={{ transform: `rotate(${spiralAngle * 6}deg)` }}
                        />

                        {/* Aura de magnétisme autour du boîtier */}
                        {isMagnetized && (
                          <div className="absolute inset-0 rounded-full border-2 border-red-500/80 animate-ping pointer-events-none" />
                        )}
                      </div>
                    </div>
                    {/* Bracelet supérieur et inférieur stylisé */}
                    <div className="w-12 h-4 bg-slate-700 rounded-b-md" />
                    <div className="text-[10px] font-mono mt-1 px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-700">
                      Hauteur : {watchDistance} cm
                    </div>
                  </div>
                </motion.div>

                {/* Plaque d'appareil de démagnétisation au sol */}
                <div className="w-72 h-14 bg-gradient-to-t from-slate-950 to-slate-800 rounded-2xl border-2 border-slate-700 shadow-inner flex flex-col items-center justify-center relative mt-4">
                  <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-1 opacity-80" />
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    Zone Bobine Démagnétisante
                  </span>
                  {isPowerOn && (
                    <div className="absolute inset-0 rounded-2xl bg-amber-500/20 animate-pulse pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Contrôles du geste d'atelier */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Curseur de levée verticale */}
                  <div className="w-full sm:w-2/3 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-500" />
                        Éloignement vertical de la montre :
                      </span>
                      <span className="text-amber-400 font-mono">{watchDistance} cm</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={watchDistance}
                      onChange={(e) => setWatchDistance(Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0 cm (Sur la plaque)</span>
                      <span>20 cm (Zone de transition)</span>
                      <span>40 cm (Hors du champ)</span>
                    </div>
                  </div>

                  {/* Bouton pressoir physique (maintenir appuyé) */}
                  <div className="w-full sm:w-1/3 flex flex-col items-center">
                    <button
                      onMouseDown={handlePowerDown}
                      onMouseUp={handlePowerUp}
                      onTouchStart={handlePowerDown}
                      onTouchEnd={handlePowerUp}
                      className={`w-full py-4 px-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all select-none shadow-lg ${
                        isPowerOn
                          ? 'bg-red-500 text-white scale-95 shadow-red-500/50'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                      }`}
                    >
                      {isPowerOn ? '⚡ CHAMP ACTIF (Maintenu)' : 'POUSSOIR CHAMP (Maintenir)'}
                    </button>
                    <span className="text-[10px] text-slate-400 mt-1 text-center">
                      Maintenir enfoncé pendant l’éloignement
                    </span>
                  </div>
                </div>

                {/* Messages de guidage d'atelier en temps réel */}
                {procedureWarning && (
                  <div className="p-3 bg-red-950/40 border border-red-800 rounded-xl text-xs text-red-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{procedureWarning}</span>
                  </div>
                )}

                {procedureSuccess && !isMagnetized && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Geste d’atelier réussi avec brio ! Le champ alternatif a désordonné les domaines magnétiques (domaines de Weiss). Le spiral a retrouvé sa liberté totale.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Fiche d'instruction & Règle d'or */}
            <div className="lg:col-span-4 space-y-4 text-xs">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-500" />
                  Protocole du Geste d’Atelier
                </h3>

                <ol className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                      1
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Poser le mouvement ou la montre complète au centre de la plaque de démagnétisation (distance 0 cm).
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                      2
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Presser et <strong>maintenir fermement</strong> le bouton d’impulsion pour enclencher le champ magnétique alternatif 50 Hz.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                      3
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Éloigner verticalement la montre d’un mouvement lent et régulier (environ 5 à 10 cm par seconde) jusqu’à au moins 30-40 cm.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                      4
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Ne relâcher le bouton qu’une fois la montre totalement hors du champ !</strong>
                    </span>
                  </li>
                </ol>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300">
                  <strong>La Règle d’Or :</strong> Si vous relâchez le bouton alors que la montre est encore sur l’appareil, le champ s’arrête sur une demi-onde crête et <em>remagnétise instantanément</em> le spiral !
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MACRO-VUE DU SPIRAL (AVANT / APRÈS) */}
        {activeTab === 'spiral' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="border-b border-slate-800 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-500" />
                    Inspection Microscopique du Spiral sous Loupe 12×
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comportement mécanique des spires en acier Nivarox selon la présence de magnétisme résiduel.
                  </p>
                </div>

                <button
                  onClick={() => setIsMagnetized(!isMagnetized)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-700 transition"
                >
                  Basculer : {isMagnetized ? 'Simuler Démagnétisé' : 'Simuler Magnétisé'}
                </button>
              </div>

              {/* Rendu SVG du Balancier-Spiral animé */}
              <div className="relative flex items-center justify-center min-h-[380px]">
                <svg width="360" height="360" viewBox="-180 -180 360 360" className="overflow-visible select-none">
                  {/* Serre de Balancier dorée */}
                  <g transform={`rotate(${spiralAngle})`}>
                    <circle cx="0" cy="0" r="140" fill="none" stroke="#D97706" stroke-width="8" opacity="0.8" />
                    {/* Bras du balancier */}
                    <line x1="-140" y1="0" x2="140" y2="0" stroke="#F59E0B" stroke-width="6" />
                    <line x1="0" y1="-140" x2="0" y2="140" stroke="#F59E0B" stroke-width="6" />
                    <circle cx="0" cy="0" r="16" fill="#78350F" />
                  </g>

                  {/* Le Spiral (Nivarox bleu/acier) */}
                  <g stroke={isMagnetized ? '#EF4444' : '#38BDF8'} stroke-width="2.5" fill="none">
                    {/* Spires concentriques dessinées */}
                    <circle cx="0" cy="0" r="24" />
                    <circle cx="0" cy="0" r="42" />
                    {/* Spires 3 et 4 : si magnétisé, elles se collent ! */}
                    <ellipse
                      cx={isMagnetized ? '4' : '0'}
                      cy="0"
                      rx={isMagnetized ? '60' : '62'}
                      ry={isMagnetized ? '58' : '62'}
                      stroke={isMagnetized ? '#EF4444' : '#38BDF8'}
                      stroke-width={isMagnetized ? '4' : '2.5'}
                    />
                    <ellipse
                      cx={isMagnetized ? '3' : '0'}
                      cy="0"
                      rx={isMagnetized ? '61' : '82'}
                      ry={isMagnetized ? '59' : '82'}
                      stroke={isMagnetized ? '#EF4444' : '#38BDF8'}
                      stroke-width={isMagnetized ? '4' : '2.5'}
                    />
                    <circle cx="0" cy="0" r="102" />
                    <circle cx="0" cy="0" r="122" />

                    {/* Point d'attache au piton */}
                    <circle cx="122" cy="0" r="5" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.5" />
                  </g>

                  {/* Témoin visuel de collage magnétique */}
                  {isMagnetized && (
                    <g transform="translate(62, -15)">
                      <rect x="-8" y="-12" width="130" height="24" rx="6" fill="#7F1D1D" stroke="#EF4444" stroke-width="1" />
                      <text x="0" y="3" fill="#FCA5A5" font-size="10" font-family="system-ui" font-weight="bold">
                        ⚠️ Spires 3 &amp; 4 collées !
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Télémétrie d'atelier sous le spiral */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Longueur active du spiral :</span>
                  <strong className={isMagnetized ? 'text-red-400' : 'text-emerald-400'}>
                    {isMagnetized ? 'Raccourcie de -35% (Collage)' : '100% Développée (Nominale)'}
                  </strong>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Respiration du spiral :</span>
                  <strong className={isMagnetized ? 'text-red-400' : 'text-emerald-400'}>
                    {isMagnetized ? 'Asymétrique & Boiteuse' : 'Concentrique Parfaite'}
                  </strong>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Dérive journalière :</span>
                  <strong className={isMagnetized ? 'text-red-400 font-mono' : 'text-emerald-400 font-mono'}>
                    {isMagnetized ? '+4200 s/jour (+70 min)' : '+2.4 s/jour (COSC)'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Explications physiques d'établi */}
            <div className="lg:col-span-4 space-y-4 text-xs">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-500" />
                  Pourquoi la montre avance-t-elle autant ?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  La période d’oscillation du balancier dépend de la formule d’Huygens :
                </p>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-center text-amber-600 dark:text-amber-400 font-bold">
                  T = 2π √(I / C)
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Lorsque 2 spires se collent magnétiquement, la <strong>longueur active</strong> du spiral est amputée.
                  Le couple élastique \(C\) augmente drastiquement, réduisant la période \(T\).
                  Le balancier oscille à une vitesse folle, provoquant une avance de plusieurs dizaines de minutes par jour !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. TEST À LA BOUSSOLE HORLOGÈRE */}
        {activeTab === 'boussole' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-500" />
                    Test Rapide d’Établi : Boussole de Contrôle
                  </h3>
                  <p className="text-xs text-slate-400">
                    Détection instantanée sans aucun démontage de la montre.
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-400">
                  DÉVIATION : {compassAngle.toFixed(1)}°
                </div>
              </div>

              {/* Rendu visuel de la boussole et de la montre approchée */}
              <div className="relative h-72 flex items-center justify-around bg-slate-950 rounded-2xl p-6 border border-slate-800">
                {/* La Boussole Horlogère */}
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full bg-slate-800 border-4 border-slate-600 shadow-2xl relative flex items-center justify-center">
                    {/* Cadran boussole */}
                    <div className="w-32 h-32 rounded-full bg-slate-900 border border-slate-700 relative flex items-center justify-center">
                      <span className="absolute top-1 text-xs font-bold text-red-500 font-mono">N</span>
                      <span className="absolute bottom-1 text-xs font-bold text-slate-400 font-mono">S</span>
                      <span className="absolute right-1 text-xs font-bold text-slate-400 font-mono">E</span>
                      <span className="absolute left-1 text-xs font-bold text-slate-400 font-mono">O</span>

                      {/* Aiguille pivotante aimantée */}
                      <motion.div
                        animate={{ rotate: compassAngle }}
                        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                        className="w-1.5 h-28 flex flex-col items-center justify-between"
                      >
                        {/* Pointe Nord rouge */}
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-b-[45px] border-b-red-500" />
                        <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-700" />
                        {/* Pointe Sud blanche */}
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[45px] border-t-slate-300" />
                      </motion.div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-2">Boussole d’établi</span>
                </div>

                {/* La montre qui s'approche */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-amber-400 flex items-center justify-center shadow-xl">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {isMagnetized ? '⚠️ Montre' : '✓ Neutre'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-2">
                    Distance : {watchDistance} cm
                  </span>
                </div>
              </div>

              {/* Curseur de rapprochement pour tester la boussole */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Approcher la montre de la boussole :</span>
                  <span className="text-amber-400 font-mono">{watchDistance} cm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={watchDistance}
                  onChange={(e) => setWatchDistance(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Diagnostic d'établi */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                Interprétation de la Boussole
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Approchez délicatement la montre de la boussole à 1-2 cm sans la toucher.
              </p>
              <ul className="space-y-2">
                <li className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-300">
                  <strong>Aiguille déviée &gt; 5° :</strong> Présence certaine d’un magnétisme résiduel dans le spiral, les vis de ponts ou les axes d’acier. Démagnétisation obligatoire.
                </li>
                <li className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300">
                  <strong>Aiguille immobile au Nord :</strong> Mouvement parfaitement neutre (&lt; 0.5 Gauss).
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. ÉCRAN CHRONOCOMPARATEUR WITSCHI (TRACÉ EN DIRECT) */}
        {activeTab === 'witschi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
                    CHRONOCOMPARATEUR WITSCHI • ANALYSE ACOUSTIQUE
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">28’800 A/h (4 Hz)</span>
              </div>

              {/* Écran cathodique du banc Witschi */}
              <div className="relative h-64 bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-hidden flex flex-col justify-between">
                {/* Grille du tracé */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                  }}
                />

                {/* Simulation du tracé des 2 lignes acoustiques */}
                <svg className="w-full h-full relative z-10 overflow-visible">
                  {isMagnetized ? (
                    // Tracé magnétisé : fuyant verticalement vers le haut de façon chaotique (+4200 s/d)
                    <g stroke="#EF4444" stroke-width="2" stroke-linecap="round">
                      <path d="M 10,220 L 80,180 L 150,140 L 220,90 L 300,40 L 380,10" stroke-dasharray="2 6" />
                      <path d="M 10,235 L 80,195 L 150,155 L 220,105 L 300,55 L 380,25" stroke-dasharray="2 6" />
                      <text x="20" y="40" fill="#EF4444" font-size="12" font-family="monospace" font-weight="bold">
                        AVANCE MASSIVE (+4200 s/j) • AMPLITUDE ÉCRASÉE (142°)
                      </text>
                    </g>
                  ) : (
                    // Tracé sain : deux lignes horizontales parfaitement parallèles (+2 s/d)
                    <g stroke="#10B981" stroke-width="2.5" stroke-linecap="round">
                      <line x1="10" y1="110" x2="480" y2="108" stroke-dasharray="2 4" />
                      <line x1="10" y1="122" x2="480" y2="120" stroke-dasharray="2 4" />
                      <text x="20" y="40" fill="#10B981" font-size="12" font-family="monospace" font-weight="bold">
                        TRACÉ STABLE (+2 s/j) • AMPLITUDE SAINE (292°) • REPÈRE 0.1 ms
                      </text>
                    </g>
                  )}
                </svg>

                {/* Métriques digitales en bas de l'écran Witschi */}
                <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">MARCHE :</div>
                    <div className={`text-sm font-bold ${isMagnetized ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isMagnetized ? '+4210 s/j' : '+2 s/j'}
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">AMPLITUDE :</div>
                    <div className={`text-sm font-bold ${isMagnetized ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isMagnetized ? '142° (Critique)' : '292° (Optimale)'}
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">REPÈRE (BEAT) :</div>
                    <div className={`text-sm font-bold ${isMagnetized ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isMagnetized ? '3.8 ms (Faussé)' : '0.1 ms (Parfait)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Witschi */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                Lecture du Tracé Acoustique
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Le chronocomparateur écoute les bruits d’échappement (dégagement, impulsion, chute).
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Quand le spiral est magnétisé, l’appareil ne parvient même plus à tracer des points réguliers tant la fréquence des alternances est accélérée de manière asymétrique.
                <strong> La démagnétisation rétablit instantanément la netteté du signal.</strong>
              </p>
            </div>
          </div>
        )}

        {/* 5. NORMES ET RÈGLES D'ATELIER (ISO 764 / NIHS 90-10) */}
        {activeTab === 'normes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  Normes Horlogères Suisses &amp; Internationales
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Exigences officielles de résistance et de neutralisation du magnétisme
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Norme ISO 764 / NIHS 90-10
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Champ d’épreuve : 4 800 A/m (60 Gauss)
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Une montre qualifiée « antimagnétique » doit être exposée à un champ de 4 800 A/m dans 3 directions.
                    Après exposition, sa marche résiduelle ne doit pas dériver de plus de <strong>± 30 secondes par jour</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Haute Résistance (Omega Master Chronometer)
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Champ d’épreuve : 15 000 Gauss (1.5 Tesla)
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Grâce aux composants amagnétiques (spiral silicium Si14, ancre et roue d’échappement en Nivagauss, axes amagnétiques), la montre résiste aux scanners IRM médicaux sans dévier.
                  </p>
                </div>
              </div>

              {/* Matériaux amagnétiques comparés */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Comportement des Spiraux Horlogers face au Magnétisme :
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <th className="py-2 font-bold">Matériau du spiral</th>
                        <th className="py-2 font-bold">Sensibilité magnétique</th>
                        <th className="py-2 font-bold">Démagnétisation requise ?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-2.5 font-bold">Acier au carbone (vintage)</td>
                        <td className="text-red-500 font-bold">Extrême</td>
                        <td>Obligatoire et fréquente</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Nivarox / Anachron</td>
                        <td className="text-amber-500 font-bold">Moyenne (ferromagnétique)</td>
                        <td>Oui (lors de chaque révision)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Parachrom Bleu (Rolex)</td>
                        <td className="text-emerald-500 font-bold">Très faible (Niobium-Zirconium)</td>
                        <td>Rarement</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Silicium (Si14 / Spiromax)</td>
                        <td className="text-emerald-500 font-bold">Nulle (100% amagnétique)</td>
                        <td>Non (insensible aux champs)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Conseils d'atelier pour l'artisan */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                Démagnétiser les Brucelles d’Horloger !
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Une erreur classique en atelier consiste à démagnétiser le mouvement, puis à le manipuler avec des <strong>brucelles en acier magnétisées</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Recommandation suisse :
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Démagnétisez systématiquement vos outils d’établi (brucelles n°3, tournevis, pique-huiles) ou utilisez des brucelles en titane ou bronze béryllium amagnétiques.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
