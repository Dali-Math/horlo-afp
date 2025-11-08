'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, Activity, Zap, Clock, Heart, Settings2, Globe, Share2, Printer, Download,
  Microscope, Gauge, BookOpen, Award, Info, Play, Pause, RotateCw, SlidersHorizontal,
  ZoomIn, CheckCircle, XCircle
} from 'lucide-react';
import Link from 'next/link';

// =================================================
// TYPES ET CONFIGURATION
// =================================================

type SectionKey = 'principe' | 'elements' | 'fonctionnement' | 'evolution';

const TRANSLATIONS = {
  fr: {
    back: 'Retour à la théorie',
    expertModeOn: 'Mode Expert ON',
    expertModeOff: 'Mode Expert OFF',
    title: "L'Échappement à Ancre Suisse",
    subtitle: "Le cœur battant de la montre : découvrez le mécanisme qui transforme l'énergie en impulsions régulières",
    toc: 'Table des matières',
    share: 'Partager',
    print: 'Imprimer',
    download: 'Télécharger',
    metadata: {
      category: 'Organe de distribution',
      readingTime: '12 min',
      difficulty: 'Intermédiaire',
      lastUpdated: '2024-11',
      standard: 'ISO 3159'
    },
    principe: {
      title: 'Principe et fonction',
      beginner: "L'échappement transforme l'énergie continue du barillet en impulsions régulières. Il remplit une double fonction essentielle : entretien des oscillations et comptage du temps.",
      expert: "L'échappement à ancre suisse convertit le couple continu du barillet (E = ½Cθ²) en impulsions discrètes. Son rendement énergétique est de 35-40%, avec une dissipation thermique de ~0.1μW par alternance.",
      function1: { title: 'Entretien', desc: 'Transmet des impulsions au balancier pour compenser les frottements.' },
      function2: { title: 'Comptage', desc: 'Compte les oscillations en laissant échapper les dents de la roue.' },
      funFact: {
        title: 'Le "tic-tac" de la montre',
        desc: 'Chaque tic et tac correspond à une impulsion. À 28\'800 A/h, vous entendez 8 battements par seconde !',
        metrics: ['28\'800 A/h', '8 Battements/s', '4 Hz', '0.125s Période']
      }
    },
    elements: {
      title: 'Les 3 éléments',
      beginner: 'Trois pièces principales travaillent en synchronisation parfaite.',
      expert: 'Système à 3 corps : roue dentée (inertie 2.5×10⁻⁹ kg·m²), ancre (inertie 1.8×10⁻¹⁰ kg·m²) et plateau (inertie 3.2×10⁻⁹ kg·m²).',
      wheel: {
        title: 'La Roue d\'Échappement',
        beginner: 'Roue dentée spéciale avec 15 dents qui transmet l\'énergie du rouage à l\'ancre.',
        expert: 'Roue à 15 dents, module 0.3mm. Acier C90 trempé à 800°C, HRC 60-62. Tolérance ISO 3159 : ±0.01mm.',
        specs: ['15 Dents', 'Acier C90', '1 tr/min', 'ISO 3159']
      },
      anchor: {
        title: 'L\'Ancre',
        beginner: 'Pièce pivotante avec deux palettes en rubis qui bloquent/libèrent la roue.',
        expert: 'Ancre à fourchette avec 2 palettes en corindon. Angle de bascule : 12-15°. Maillechort CuNi12Zn24.',
        specs: ['2 Rubis', '12-15° Bascule', 'Maillechort']
      },
      balance: {
        title: 'Le Plateau de Balancier',
        beginner: 'Disque avec cheville qui pousse la fourchette à chaque oscillation.',
        expert: 'Plateau avec cheville en rubis Ø0.15mm. Encoche de sécurité à 90°. Sertissage à chaud.',
        specs: ['Ø0.15mm', 'Encoche 90°', '28\'800 A/h']
      }
    },
    fonctionnement: {
      title: 'Fonctionnement en 4 phases',
      beginner: 'Chaque alternance du balancier déclenche un cycle complet de 4 phases.',
      expert: 'Cycle thermodynamique : repos (isochore), dégagement (adiabatic), impulsion (isobare), chute (adiabatic). Rendement : 38%.',
      phases: [
        { name: 'Repos', desc: 'Tirage actif, roue bloquée par une palette.', expert: 'Énergie potentielle stockée. Force de contact : 0.02N.' },
        { name: 'Dégagement', desc: 'La cheville pousse la fourchette, libérant une dent.', expert: 'Travail de dégagement : W = 2μJ. Accélération : 150 rad/s².' },
        { name: 'Impulsion', desc: 'La dent pousse la palette, transférant l\'énergie au balancier.', expert: 'Impulsion de 0.5μJ durant 2ms. Couple : 0.3μN·m.' },
        { name: 'Chute', desc: 'L\'ancre bascule, la palette opposée bloque la roue.', expert: 'Perte d\'énergie par choc : 0.1μJ. Coeff. d\'amortissement : ζ = 0.02.' }
      ],
      data: {
        title: '⚡ Données chiffrées',
        items: ['Durée: 0.125s', 'Angle: 52°', 'Arc libre: 270-300°', 'Amplitude: 320-330°']
      }
    },
    evolution: {
      title: 'Évolution et types d\'échappements',
      beginner: 'Découvrez les différents types d\'échappements et leur histoire.',
      expert: 'Analyse comparative : levier suisse (38%), co-axial (45%), détente (48%).',
      types: [
        { name: 'Échappement à ancre suisse', precision: '±2-5 s/j', maintenance: '3-5 ans', cost: '€50-200', reliability: 95, complexity: 3 },
        { name: 'Échappement Co-Axial', precision: '±1-3 s/j', maintenance: '8-10 ans', cost: '€500-1500', reliability: 90, complexity: 9 },
        { name: 'Échappement à détente', precision: '±0.1-0.5 s/j', maintenance: '1-2 ans', cost: '€1000-3000', reliability: 70, complexity: 8 },
        { name: 'Échappement à force constante', precision: '±0.05 s/j', maintenance: '2-3 ans', cost: '€5000+', reliability: 60, complexity: 10 }
      ],
      timeline: [
        { year: '1750', event: 'Échappement à verge (1ère méch.)' },
        { year: '1820', event: 'Échappement cylindre (Breguet)' },
        { year: '1867', event: 'Échappement à ancre suisse' },
        { year: '1974', event: 'Révolution quartz' },
        { year: '1999', event: 'Échappement co-axial (Omega)' },
        { year: '2013', event: 'Échappement en silicium' }
      ]
    },
    quiz: {
      title: 'Quiz : Testez vos connaissances',
      beginner: 'Cinq questions pour valider votre compréhension.',
      expert: 'Quiz technique avec calculs et normes ISO.',
      progress: 'Question {current} sur {total}',
      score: 'Score : {score}/{total}',
      time: 'Temps',
      questions: [
        {
          question: "Quelle est la fonction principale de l'échappement ?",
          options: ["Stocker l'énergie", "Transformer l'énergie continue en impulsions", "Afficher l'heure", "Remonter le ressort"],
          correct: 1,
          explanation: {
            beginner: "L'échappement convertit l'énergie continue du barillet en impulsions régulières qui entretiennent le balancier.",
            expert: "Fonction de distribution : convertit E_cont = ½Cθ² en impulsions discrètes ΔE = 0.5μJ à 4Hz."
          }
        },
        {
          question: "Combien de dents a la roue d'échappement standard ?",
          options: ["12 dents", "15 dents", "18 dents", "20 dents"],
          correct: 1,
          explanation: {
            beginner: "La roue d'échappement suisse standard compte 15 dents, permettant une division optimale du temps.",
            expert: "15 dents (module 0.3mm). Formule : z = T_balancier / T_roue = 0.5s / 0.033s ≈ 15."
          }
        },
        {
          question: "Quelle est la fréquence la plus courante ?",
          options: ["18'000 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
          correct: 2,
          explanation: {
            beginner: "28'800 alternances par heure (4 Hz) est le standard moderne, offrant un bon compromis précision/consommation.",
            expert: "28'800 A/h = 4Hz. Période T = 1/(2f) = 0.125s. Q factor optimal entre 300-500."
          }
        },
        {
          question: "Quel matériau pour les palettes ?",
          options: ["Acier trempé", "Rubis synthétique", "Saphir", "Diamant"],
          correct: 1,
          explanation: {
            beginner: "Les palettes sont en rubis synthétique (corindon) pour minimiser les frottements et l'usure.",
            expert: "Corindon Al₂O₃ (9 Mohs). Coefficient de frottement μ = 0.1 avec huile de synthèse. Usure < 1μm/an."
          }
        },
        {
          question: "Qu'est-ce que le 'tirage' ?",
          options: ["La force du ressort", "Action qui maintient l'ancre en repos", "Le bruit du tic-tac", "La vitesse du balancier"],
          correct: 1,
          explanation: {
            beginner: "Le tirage est la force qui maintient l'ancre appuyée contre sa butée pendant le repos.",
            expert: "Force de contact F = 0.02N. Pression surfacique p = F/A = 200MPa sur la palette de 0.1mm²."
          }
        }
      ]
    }
  }
};

// =================================================
// COMPOSANTS RÉUTILISABLES
// =================================================

const SectionCard = ({ title, children, icon: Icon }: any) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8 mb-6 transition-transform hover:scale-[1.01]">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
        {Icon && <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
        {title}
      </h2>
      <Info className="w-5 h-5 text-slate-500" />
    </div>
    {children}
  </div>
);

const MetricCard = ({ value, label }: any) => (
  <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
    <div className="font-mono font-bold text-purple-600 dark:text-purple-400 text-lg">{value}</div>
    <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">{label}</div>
  </div>
);

// =================================================
// COMPOSANT PRINCIPAL
// =================================================

export default function EchappementAncre() {
  const [expertMode, setExpertMode] = useState(false);
  const [activeSection, setActiveSection] = useState('principe');
  const [showTOC, setShowTOC] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, Math.max(0, (scrolled / maxScroll) * 100)));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS.fr;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Barre de progression */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* En-tête */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">
                <ChevronLeft className="w-5 h-5 mr-1" />
                {t.back}
              </Link>
              <span className="text-slate-400">|</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{t.metadata.standard}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpertMode(!expertMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  expertMode 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Microscope className="w-4 h-4" />
                {expertMode ? t.expertModeOn : t.expertModeOff}
              </button>
              <button onClick={() => setShowTOC(!showTOC)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <div className="hidden lg:flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t.share}>
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t.print}>
                  <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title={t.download}>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Hero */}
        <div className="text-center mb-12 lg:mb-16 transition-transform hover:scale-[1.01]">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            {t.metadata.category}
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{t.metadata.readingTime}</span>
            <span className="flex items-center gap-1"><Gauge className="w-4 h-4" />{expertMode ? 'Expert' : t.metadata.difficulty}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{t.metadata.lastUpdated}</span>
            <span className="flex items-center gap-1"><Award className="w-4 h-4" />{t.metadata.standard}</span>
          </div>
        </div>

        {/* Table des matières */}
        {showTOC && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-4" />
              {t.toc}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
              {(['principe', 'elements', 'fonctionnement', 'evolution'] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveSection(id);
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-900/50'
                  }`}
                >
                  {id === 'principe' && <Activity className="w-4 h-4" />}
                  {id === 'elements' && <Settings2 className="w-4 h-4" />}
                  {id === 'fonctionnement' && <Clock className="w-4 h-4" />}
                  {id === 'evolution' && <Zap className="w-4 h-4" />}
                  {t[id].title || id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contenu */}
        <div className="space-y-6 lg:space-y-8">

          {/* Section 1 : Principe */}
          <SectionCard title={t.principe.title} icon={Activity}>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t.principe.expert : t.principe.beginner}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600 transition-transform hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                  <Activity className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  {t.principe.function1.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300">{t.principe.function1.desc}</p>
                {expertMode && (
                  <div className="mt-3 p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formule :</strong> E_impulsion = ½ × I × ω² × (1 - cos θ)
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-purple-200 dark:border-slate-600 transition-transform hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                  <Clock className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  {t.principe.function2.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300">{t.principe.function2.desc}</p>
                {expertMode && (
                  <div className="mt-3 p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      <strong>ISO 3159 :</strong> Tolérance de marche ±0.05 s/j pour chronomètre
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                    {t.principe.funFact.title}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {t.principe.funFact.desc}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {t.principe.funFact.metrics.map((metric: string, i: number) => (
                      <MetricCard key={i} value={metric.split(' ')[0]} label={metric.split(' ')[1]} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 2 : Éléments */}
          <SectionCard title={t.elements.title} icon={Settings2}>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t.elements.expert : t.elements.beginner}
            </p>

            {/* Roue d'échappement */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-orange-200 dark:border-slate-600 mb-4 transition-transform hover:scale-[1.01]">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1. {t.elements.wheel.title}</h3>
                <ZoomIn className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {expertMode ? t.elements.wheel.expert : t.elements.wheel.beginner}
              </p>
              <div className="grid md:grid-cols-4 gap-3">
                {t.elements.wheel.specs.map((spec: string, i: number) => (
                  <MetricCard key={i} value={spec.split(' ')[0]} label={spec.split(' ')[1]} />
                ))}
              </div>
            </div>

            {/* Ancre */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-green-200 dark:border-slate-600 mb-4 transition-transform hover:scale-[1.01]">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. {t.elements.anchor.title}</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {expertMode ? t.elements.anchor.expert : t.elements.anchor.beginner}
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {t.elements.anchor.specs.map((spec: string, i: number) => (
                  <MetricCard key={i} value={spec.split(' ')[0]} label={spec.split(' ')[1] || spec.split(' ')[2]} />
                ))}
              </div>
            </div>

            {/* Plateau */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-blue-200 dark:border-slate-600 transition-transform hover:scale-[1.01]">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. {t.elements.balance.title}</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {expertMode ? t.elements.balance.expert : t.elements.balance.beginner}
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {t.elements.balance.specs.map((spec: string, i: number) => (
                  <MetricCard key={i} value={spec.split(' ')[0]} label={spec.split(' ')[1]} />
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Section 3 : Fonctionnement */}
          <SectionCard title={t.fonctionnement.title} icon={Clock}>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t.fonctionnement.expert : t.fonctionnement.beginner}
            </p>

            {/* Simulateur 2D */}
            <EscapementSimulator2D />

            <p className="text-slate-700 dark:text-slate-300 mt-6 mb-4">
              {t.fonctionnement.title}
            </p>

            <div className="space-y-4">
              {t.fonctionnement.phases.map((phase: any, i: number) => (
                <div
                  key={i}
                  className={`bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border-l-4 transition-transform hover:translate-x-2 ${
                    i === 0 ? 'border-blue-600' : i === 1 ? 'border-green-600' : i === 2 ? 'border-purple-600' : 'border-orange-600'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`${
                      i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-green-600' : i === 2 ? 'bg-purple-600' : 'bg-orange-600'
                    } text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0`}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{phase.name}</h4>
                      <p className="text-slate-700 dark:text-slate-300">{phase.desc}</p>
                      {expertMode && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{phase.expert}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Données techniques */}
            <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                {t.fonctionnement.data.title}
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.fonctionnement.data.items.map((item: string, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{item.split(':')[0]}</span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">{item.split(':')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Section 4 : Évolution */}
          <SectionCard title={t.evolution.title} icon={Zap}>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t.evolution.expert : t.evolution.beginner}
            </p>

            {/* Comparaison interactive */}
            <EscapementComparison expertMode={expertMode} />

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Évolution historique</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600" />
                {t.evolution.timeline.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="relative pl-10 pb-6 transition-transform hover:translate-x-2"
                  >
                    <div className="absolute left-3 w-3 h-3 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900" />
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">{item.year}</div>
                      <p className="text-slate-700 dark:text-slate-300">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Section 5 : Quiz */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Award className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              {t.quiz.title}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              {expertMode ? t.quiz.expert : t.quiz.beginner}
            </p>
            {/* Correction ici : passage de la prop 't' */}
            <QuizComponent questions={t.quiz.questions} expertMode={expertMode} t={t} />
          </div>

          {/* Section 6 : Ressources */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              Ressources et références
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Ouvrages de référence</h3>
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg transition-transform hover:scale-[1.02]">
                    <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">"The Theory of Horology"</p>
                      <p className="text-sm text-slate-500">Swiss Federation of Watchmaking Schools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg transition-transform hover:scale-[1.02]">
                    <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">"Watchmaking"</p>
                      <p className="text-sm text-slate-500">George Daniels</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Normes techniques</h3>
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg transition-transform hover:scale-[1.02]">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">ISO 3159</p>
                      <p className="text-sm text-slate-500">Chronomètres de montre-bracelet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg transition-transform hover:scale-[1.02]">
                    <Award className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">NIHS 95-10</p>
                      <p className="text-sm text-slate-500">Échappements à ancre suisses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" /> Fiche technique (PDF)
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" /> Diagrammes CAO (DXF)
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" /> Normes ISO (ZIP)
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p>
              <strong>Horlogerie Reference</strong> v1.0.0 | 
              <button className="mx-2 text-blue-600 dark:text-blue-400 hover:underline">CC BY-NC-SA 4.0</button> | 
              <button className="text-blue-600 dark:text-blue-400 hover:underline">Citer cette page</button>
            </p>
            <p className="mt-1">DOI: 10.12345/horology.escapement.2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================================
// COMPOSANTS SECONDAIRES
// =================================================

function EscapementSimulator2D() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => setPhase((p) => (p + 1) % 4), 125);
    return () => clearInterval(timer);
  }, [isRunning]);

  const phaseColors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600'];

  return (
    <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
      <div className="text-center text-white">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${phaseColors[phase]} flex items-center justify-center shadow-lg shadow-current/50 transition-all`}>
          <span className="text-2xl font-bold">{phase + 1}</span>
        </div>
        <div className="text-lg font-medium mb-2">{['Repos', 'Dégagement', 'Impulsion', 'Chute'][phase]}</div>
        <div className="text-sm text-slate-400 mb-4">Phase du cycle d'échappement</div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Arrêter' : 'Démarrer'}
        </button>
      </div>
      <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-mono">
        28'800 A/h
      </div>
    </div>
  );
}

function EscapementComparison({ expertMode }: { expertMode: boolean }) {
  const [selected, setSelected] = useState(0);
  const types = TRANSLATIONS.fr.evolution.types;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {types.map((type: any, i: number) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              selected === i
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
            }`}
          >
            {type.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6 transition-opacity">
        <h4 className="font-bold text-slate-900 dark:text-white mb-3">{types[selected].name}</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Précision</span>
              <span className="font-mono text-slate-900 dark:text-white">{types[selected].precision}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Maintenance</span>
              <span className="text-slate-900 dark:text-white">{types[selected].maintenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Coût</span>
              <span className="text-slate-900 dark:text-white">{types[selected].cost}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Fiabilité</span>
                <span className="font-mono text-slate-900 dark:text-white text-sm">{types[selected].reliability}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${types[selected].reliability}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Complexité</span>
                <span className="font-mono text-slate-900 dark:text-white text-sm">{types[selected].complexity}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${types[selected].complexity * 10}%` }} />
              </div>
            </div>
          </div>
        </div>
        {expertMode && (
          <div className="mt-4 p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Rendement énergétique :</strong> {types[selected].reliability < 80 ? '35-40%' : '40-45%'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Correction ici : ajout de la prop 't' dans la signature
function QuizComponent({ questions, expertMode, t }: { questions: any[]; expertMode: boolean; t: any }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (showResults) return;
    const timer = setInterval(() => setTimeSpent(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [showResults]);

  const handleAnswer = (index: number) => {
    if (answers[current] !== undefined) return;
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (current < questions.length - 1) setCurrent(current + 1);
      else setShowResults(true);
    }, 2000);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-xl">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz terminé !</h3>
        <div className="w-32 h-32 mx-auto mb-6 relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" className="text-slate-200 dark:text-slate-700" />
            <circle
              cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
              strokeLinecap="round" className="text-blue-600"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{percentage}%</span>
          </div>
        </div>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
          Score : {score}/{questions.length} ({percentage}%) | Temps : {timeSpent}s
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setCurrent(0);
              setAnswers([]);
              setShowResults(false);
              setTimeSpent(0);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" /> Recommencer
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
            <Share2 className="w-4 h-4 inline mr-2" />Partager
          </button>
        </div>
        <div className="mt-6 p-4 bg-white/60 dark:bg-slate-900/30 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            {percentage >= 90 ? 'Excellent ! Maîtrise parfaite.' :
             percentage >= 70 ? 'Très bien ! Quelques détails à peaufiner.' :
             percentage >= 50 ? 'Bon résultat. Relisez les sections difficiles.' :
             'Continuez à vous entraîner. Vous progresserez !'}
          </p>
        </div>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t.quiz.progress.replace('{current}', String(current + 1)).replace('{total}', String(questions.length))}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {t.quiz.score.replace('{score}', String(score)).replace('{total}', String(questions.length))}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="text-right text-xs text-slate-500 mt-1">{t.quiz.time} : {timeSpent}s</div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        {question.question}
      </h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => {
          const isAnswered = answers[current] !== undefined;
          const isSelected = answers[current] === index;
          const isCorrect = index === question.correct;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all relative ${
                !isAnswered
                  ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                  : isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : isSelected
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                  : 'border-slate-200 dark:border-slate-700 opacity-50'
              }`}
            >
              <span className="font-semibold mr-3 text-slate-700 dark:text-slate-200">{String.fromCharCode(65 + index)}.</span>
              <span className="text-slate-800 dark:text-slate-100">{option}</span>
              {isAnswered && isCorrect && <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-600" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {answers[current] !== undefined && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 rounded">
          <p className="text-slate-700 dark:text-slate-300">
            {expertMode ? question.explanation.expert : question.explanation.beginner}
          </p>
        </div>
      )}
    </div>
  );
}
