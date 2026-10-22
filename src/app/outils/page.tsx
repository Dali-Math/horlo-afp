// src/app/outils/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Calculator,
  Compass,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Layers,
  Activity,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function OutilsPage() {
  const [activeTab, setActiveTab] = useState<'calculateurs' | 'mallette' | 'tournevis' | 'brucelles'>('calculateurs');

  // --- CALCULATEUR 1 : LIGNES SUISSES <-> MILLIMÈTRES ---
  const [inputLignes, setInputLignes] = useState<string>('16.5');
  const [inputMm, setInputMm] = useState<string>('36.60');

  const handleLignesChange = (val: string) => {
    setInputLignes(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      // 1 ligne suisse = 2.2558291 mm
      setInputMm((num * 2.2558291).toFixed(2));
    } else {
      setInputMm('');
    }
  };

  const handleMmChange = (val: string) => {
    setInputMm(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setInputLignes((num / 2.2558291).toFixed(2));
    } else {
      setInputLignes('');
    }
  };

  // --- CALCULATEUR 2 : FRÉQUENCE <-> ALTERNANCES PAR HEURE ---
  const [freqHz, setFreqHz] = useState<number>(2.5);

  const freqCalculations = useMemo(() => {
    const alternancesParHeure = Math.round(freqHz * 2 * 3600);
    const alternancesParSeconde = Math.round(freqHz * 2);
    const periodeMs = Number((1000 / freqHz).toFixed(1));
    const demiPeriodeMs = Number((500 / freqHz).toFixed(1));

    let calibreExemple = 'Calibres de poche & ETA 6497-1 (Unitas)';
    if (freqHz === 3) calibreExemple = 'Calibres vintage 1960 & Patek Philippe 240';
    if (freqHz === 4) calibreExemple = 'Standard moderne suisse (ETA 2824-2, Rolex 3135/3235)';
    if (freqHz === 5) calibreExemple = 'Haute Fréquence : Zenith El Primero (mesure au 1/10e s)';
    if (freqHz === 10) calibreExemple = 'Ultra Fréquence : Breguet Classique Chronométrie 7727';

    return {
      alternancesParHeure,
      alternancesParSeconde,
      periodeMs,
      demiPeriodeMs,
      calibreExemple
    };
  }, [freqHz]);

  // --- CALCULATEUR 3 : RÉSERVE DE MARCHE & BARILLET ---
  const [barrelTurns, setBarrelTurns] = useState<number>(7.5);
  const [ratioWheel, setRatioWheel] = useState<number>(6.5); // Tours de roue de centre par tour de barillet

  const calculatedAutonomy = useMemo(() => {
    // Autonomie en heures = Nombre de tours utiles de barillet * rapport vers la roue de centre (1 tour = 1 heure)
    const hours = Math.round(barrelTurns * ratioWheel);
    const days = (hours / 24).toFixed(1);
    return { hours, days };
  }, [barrelTurns, ratioWheel]);

  // DONNÉES TOURNEVIS SUISSES OFFICIELS (Normes Bergeon)
  const TOURNEVIS_DATA = [
    { diam: '0.50 mm', code: 'Orange', bg: 'bg-orange-500', usage: 'Vis de pont d’ancre microscopiques et vis de spiral' },
    { diam: '0.60 mm', code: 'Blanc', bg: 'bg-slate-200 text-slate-900', usage: 'Vis de touches de limitation et raquette' },
    { diam: '0.80 mm', code: 'Jaune', bg: 'bg-yellow-400 text-slate-900', usage: 'Vis de sautoir, ressorts de tirette et bascule' },
    { diam: '1.00 mm', code: 'Noir', bg: 'bg-slate-900 text-white border border-slate-700', usage: 'Vis de tirette, vis de coq et pont de balancier (Essentiel)' },
    { diam: '1.20 mm', code: 'Rouge', bg: 'bg-red-500', usage: 'Vis de pont de rouage et fixation du barillet (Le plus utilisé)' },
    { diam: '1.40 mm', code: 'Gris', bg: 'bg-slate-400 text-slate-900', usage: 'Vis de pont de barillet et rochet (gros calibres)' },
    { diam: '1.60 mm', code: 'Violet', bg: 'bg-purple-500', usage: 'Vis de fixation du rochet et de roue de couronne' },
    { diam: '2.00 mm', code: 'Vert', bg: 'bg-emerald-500', usage: 'Vis de masse oscillante et vis de bride de boîte' },
    { diam: '2.50 mm', code: 'Bleu', bg: 'bg-blue-500', usage: 'Gros calibres de poche, pendules et brides de boîtier' },
    { diam: '3.00 mm', code: 'Brun', bg: 'bg-amber-800', usage: 'Vis de cloche, vis de pieds de cadran et pendulerie' }
  ];

  // DONNÉES BRUCELLES D'HORLOGER (Normes Dumont Suisse)
  const BRUCELLES_DATA = [
    {
      ref: 'Dumont N° 1',
      title: 'Brucelle Standard d’Atelier',
      alloy: 'Acier Inox antimagnétique ou Carbolex',
      points: 'Pointes robustes biseautées (0.20 mm)',
      application: 'Manipulation des ponts, barillets, roues de moyenne et travaux d’assemblage général.',
      caution: 'Ne jamais utiliser sur le spiral sous peine de le tordre.'
    },
    {
      ref: 'Dumont N° 3',
      title: 'Brucelle Fine de Rhabillage',
      alloy: 'Inox antimagnétique haute élasticité',
      points: 'Pointes demi-fines élancées (0.12 mm)',
      application: 'Prise des mobiles de seconde, échappement, ancre et amortisseurs Incabloc.',
      caution: 'Garder les becs parfaitement parallèles en les affûtant régulièrement à la pierre d’Arkansas.'
    },
    {
      ref: 'Dumont N° 5',
      title: 'Brucelle de Précision pour Spiral',
      alloy: 'Dumont Dumoxel antimagnétique 100%',
      points: 'Pointes ultra-fines aiguilles (0.04 mm)',
      application: 'Travail exclusif sur le balancier-spiral, virolage, redressage du plat et du rond.',
      caution: 'À réserver strictement au spiral. Une seule chute sur l’établi détruit irrémédiablement les pointes.'
    },
    {
      ref: 'Brucelles en Laiton (Brass)',
      title: 'Brucelle Douce Anti-Rayures',
      alloy: 'Laiton horloger massif',
      points: 'Pointes polies tendres',
      application: 'Pose des roues dorées, ponts perlés et vis bleuies sans laisser la moindre micro-rayure.',
      caution: 'Le laiton est plus tendre que l’acier : nettoyer fréquemment pour enlever les résidus.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Accueil</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 La Mallette Technique de l’Horloger Suisse</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Boîte à Outils & Calculateurs d’Établi
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              La référence officielle de l’outillage suisse d’atelier (Bergeon, Horotec, Dumont) et les calculateurs métrologiques en temps réel pour convertir les lignes suisses, ajuster les fréquences et mesurer les réserves de marche.
            </p>
          </div>

          {/* Onglets de navigation */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            {[
              { id: 'calculateurs', label: '1. Calculateurs d’Atelier', subtitle: 'Lignes, Hz & Réserve' },
              { id: 'tournevis', label: '2. Tournevis Suisses', subtitle: 'Codes Couleurs & Lames' },
              { id: 'brucelles', label: '3. Guide des Brucelles', subtitle: 'Dumont N°1 à 5 & Laiton' },
              { id: 'mallette', label: '4. Outillage d’Établi', subtitle: 'Potences, Pique-huiles & Loupes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-white dark:bg-[#0f1422] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                }`}
              >
                <div className="text-xs sm:text-sm">{tab.label}</div>
                <div className={`text-[10px] ${activeTab === tab.id ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                  {tab.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTENU DU MODULE ACTIF --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* ========================================================================= */}
        {/* ONGLET 1 : LES 3 CALCULATEURS EN TEMPS RÉEL */}
        {/* ========================================================================= */}
        {activeTab === 'calculateurs' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CALCULATEUR A : LIGNES SUISSES <-> MILLIMÈTRES */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                      Norme NIHS 01-01
                    </span>
                    <span className="text-xs">📐</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Convertisseur de Lignes Horlogères
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    La ligne suisse (symbole <strong>'''</strong>) vaut exactement <strong>2.2558291 mm</strong>. Elle mesure le diamètre d'encageage des calibres.
                  </p>
                </div>

                <div className="space-y-4 my-auto py-2">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
                      Diamètre en Lignes (''') :
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={inputLignes}
                      onChange={(e) => handleLignesChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-lg font-extrabold text-amber-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-center font-bold text-slate-400">⇅</div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
                      Diamètre Métrique (mm) :
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputMm}
                      onChange={(e) => handleMmChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-lg font-extrabold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
                  <strong>Repères d’atelier :</strong> 11½''' = 25.60 mm (ETA 2824), 16½''' = 36.60 mm (ETA 6497), 13¼''' = 30.00 mm (Valjoux 7750).
                </div>
              </div>

              {/* CALCULATEUR B : FRÉQUENCE HERTZ <-> ALTERNANCES/HEURE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                      Chronométrie & Isochronisme
                    </span>
                    <span className="text-xs">⏱️</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Calculateur de Fréquence
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    1 Hertz équivaut à 1 oscillation complète par seconde, soit exactement <strong>2 alternances (tic-tac)</strong>.
                  </p>
                </div>

                <div className="space-y-4 my-auto py-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Fréquence du Balancier :</span>
                      <span className="font-mono text-amber-500 font-extrabold">{freqHz} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="10"
                      step="0.5"
                      value={freqHz}
                      onChange={(e) => setFreqHz(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>2.5 Hz (Poche)</span>
                      <span>4.0 Hz (Moderne)</span>
                      <span>10 Hz (Hi-Beat)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Alternances par heure :</span>
                      <span className="font-mono font-extrabold text-amber-500">{freqCalculations.alternancesParHeure.toLocaleString()} A/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Battements par seconde :</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{freqCalculations.alternancesParSeconde} battements/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Durée d'une alternance :</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{freqCalculations.demiPeriodeMs} ms</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-800 dark:text-blue-300">
                  <strong>Calibre équivalent :</strong> {freqCalculations.calibreExemple}
                </div>
              </div>

              {/* CALCULATEUR C : RÉSERVE DE MARCHE DU BARILLET */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                      Dynamique Motrice
                    </span>
                    <span className="text-xs">⚡</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Calculateur de Réserve de Marche
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Détermine l’autonomie mécanique selon les tours de développement du ressort et le rapport d'engrenage vers la roue de centre.
                  </p>
                </div>

                <div className="space-y-4 my-auto py-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Tours utiles du barillet :</span>
                      <span className="font-mono text-amber-500 font-bold">{barrelTurns} tours</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="12"
                      step="0.5"
                      value={barrelTurns}
                      onChange={(e) => setBarrelTurns(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Démultiplication (h / tour) :</span>
                      <span className="font-mono text-amber-500 font-bold">{ratioWheel}x</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="10"
                      step="0.5"
                      value={ratioWheel}
                      onChange={(e) => setRatioWheel(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
                    <div className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Autonomie Estimée</div>
                    <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
                      {calculatedAutonomy.hours} heures
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                      (environ {calculatedAutonomy.days} jours complets)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                  ℹ️ Formule : Autonomie = Tours utiles de barillet × Démultiplication de la roue de centre
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : LE GUIDE DES TOURNEVIS & CODES COULEURS OFFICIELS */}
        {/* ========================================================================= */}
        {activeTab === 'tournevis' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  Standard International Horloger
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Charte des Tournevis d’Établi & Codes Couleurs
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Chaque diamètre de lame possède sa bague d’identification officielle. La largeur de la lame doit remplir au moins 90% de la longueur de la fente de vis pour éviter toute déformation des arêtes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOURNEVIS_DATA.map((t) => (
                  <div
                    key={t.diam}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-4"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${t.bg} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow`}>
                      Ø {t.diam.split(' ')[0]}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{t.diam}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Bague {t.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Règle d'or d'affûtage des lames */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2">
                <div className="font-bold flex items-center gap-2 text-amber-800 dark:text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Règle d’Or d’Atelier pour l’Affûtage des Lames :</span>
                </div>
                <p className="leading-relaxed text-xs">
                  Une lame de tournevis d’horloger ne doit jamais être affûtée en coin pointu (biseau triangulaire), car elle glisserait hors de la vis sous la force de serrage. Elle doit être meulée avec deux faces planes strictement parallèles (profil en T) pour s’asseoir à plat dans le fond de la gorge sans blesser le tournage de la tête de vis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : LE GUIDE DES BRUCELLES DUMONT */}
        {/* ========================================================================= */}
        {activeTab === 'brucelles' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  Manufacture Dumont • Suisse
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Le Prolongement de la Main de l’Horloger
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Les brucelles suisses sont forgées dans des alliages spécifiques pour garantir une élasticité constante et éviter la magnétisation des composants fins.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BRUCELLES_DATA.map((b) => (
                  <div
                    key={b.ref}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                        {b.ref}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {b.points}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {b.title}
                    </h3>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                      <div><strong>Alliage :</strong> {b.alloy}</div>
                      <div><strong>Usage :</strong> {b.application}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-700 dark:text-rose-400">
                      ⚠️ <strong>Avertissement :</strong> {b.caution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 4 : OUTILLAGE D'ÉTABLI & POTENCES */}
        {/* ========================================================================= */}
        {activeTab === 'mallette' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  Équipement d’Atelier Professionnel
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Les Grandes Machines & Outils d’Établi
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-3xl">🔬</div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Potence à Chasser les Pierres (Seitz)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Permet d’insérer et d’ajuster au micromètre près la hauteur d’enfoncement des rubis dans la platine pour régler l’ébat axial des mobiles.
                  </p>
                  <div className="text-[11px] font-mono text-amber-500 font-bold">Précision : 0.01 mm</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-3xl">🌀</div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Démagnétiseur d’Atelier
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Élimine instantanément le magnétisme résiduel induit par les smartphones et moteurs qui colle les spires du spiral et dérègle la marche.
                  </p>
                  <div className="text-[11px] font-mono text-amber-500 font-bold">Action : Impulsion 50 Hz décroissante</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-3xl">🔍</div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Loupes d’Atelier N° 1 à 4
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    N° 1 (10x, focale 2.5 cm pour spiral), N° 2 (5x pour assemblage des rouages), N° 3 et 4 (pour emboîtage et contrôle externe).
                  </p>
                  <div className="text-[11px] font-mono text-amber-500 font-bold">Verre optique aplanétique</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
