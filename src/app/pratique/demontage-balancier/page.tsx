// src/app/pratique/demontage-balancier/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Zap,
  Layers,
  FileText,
  ExternalLink,
  Info
} from 'lucide-react';
import HowToSchema from '@/components/HowToSchema';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';

// --- DATA: 6 ÉTAPES PROTOCOLE D'ÉTABLI ---
interface BalancierStep {
  number: number;
  title: string;
  badge: string;
  tool: {
    name: string;
    specs: string;
    color: string;
  };
  tweezer: string;
  criticalRule: string;
  instructions: string[];
  mistakeToAvoid: string;
  proTip: string;
}

const BALANCIER_PROTOCOL: BalancierStep[] = [
  {
    number: 1,
    title: 'Désarmement Préalable & Sécurisation',
    badge: 'Sécurité Vitale',
    tool: {
      name: 'Cheville de sureau',
      specs: 'Taillée en biseau fin',
      color: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
    },
    tweezer: 'Brucelles Dumont N° 3 Antimagnétiques',
    criticalRule: 'Ne jamais toucher au balancier si le ressort de barillet est encore sous tension.',
    instructions: [
      'Positionner le calibre ETA 6497-1 sur le porte-pièce berceau et vérifier sa parfaite stabilité.',
      'DÉSARMEMENT VITAL : Maintenir fermement la couronne de remontoir entre le pouce et l\'index.',
      'Avec une cheville en bois de sureau taillée, écarter avec douceur le bec du cliquet de la denture du rochet.',
      'Laisser la couronne filer très lentement entre les doigts pour détendre l\'intégralité du ressort moteur.'
    ],
    mistakeToAvoid: 'Dévisser le coq avec un barillet armé : la moindre impulsion détruira instantanément les pivots de l\'axe de balancier.',
    proTip: 'Vérifier l\'arrêt complet du rouage en observant la roue d\'échappement à travers la loupe 10x.'
  },
  {
    number: 2,
    title: 'Libération du Piton & Raquetterie',
    badge: 'Précision 0.80 mm',
    tool: {
      name: 'Tournevis Bergeon N° 0.80 mm',
      specs: 'Code Couleur Jaune · Panne affûtée',
      color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40'
    },
    tweezer: 'Brucelles de haute précision N° 5',
    criticalRule: 'Ne pas dévisser complètement la vis de piton : un quart de tour suffit amplement.',
    instructions: [
      'Repérer le porte-piton mobile situé sur le coq de balancier.',
      'Engager la panne du tournevis 0.80 mm parfaitement perpendiculaire à la fente de la vis de serrage du piton.',
      'Desserrer délicatement d\'un quart de tour à un demi-tour maximum, sans forcer.',
      'Vérifier à la loupe que la lame extérieure du spiral est libre de glisser entre les deux goupilles de la raquette.'
    ],
    mistakeToAvoid: 'Retirer la vis de piton : minuscule, elle est quasi impossible à retrouver si elle tombe sur l\'établi.',
    proTip: 'Sur l\'ETA 6497-1 moderne, le piton est parfois maintenu par friction dans un étrier. Dans ce cas, aucun dévissage n\'est requis.'
  },
  {
    number: 3,
    title: 'Dévissage de la Vis de Coq (Pont de Balancier)',
    badge: 'Torque Modéré',
    tool: {
      name: 'Tournevis Bergeon N° 1.40 mm',
      specs: 'Code Couleur Gris · Panne érodée plate',
      color: 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/40'
    },
    tweezer: 'Brucelles Dumont N° 3',
    criticalRule: 'Maintenir une pression axiale constante pour ne pas riper sur les côtes de Genève.',
    instructions: [
      'Positionner la panne du tournevis 1.40 mm dans la fente de la vis de fixation du coq.',
      'Appliquer une pression verticale ferme avec l\'index sur la tête rotative du tournevis.',
      'Dévisser dans le sens antihoraire d\'un geste net et contrôlé.',
      'Saisir la vis dévissée avec les brucelles N° 3 et la ranger immédiatement dans le compartiment dédié du casier.'
    ],
    mistakeToAvoid: 'Riper avec le tournevis : la panne écorcherait irrémédiablement le pont ou heurterait violemment le spiral.',
    proTip: 'Vérifier sous binoculaire que le filetage de la platine ne retient aucune limaille résiduelle.'
  },
  {
    number: 4,
    title: 'Décollement & Dégagement des Tenons',
    badge: 'Micro-Levier',
    tool: {
      name: 'Tournevis d\'établi N° 1.20 mm',
      specs: 'Utilisé comme levier doux d\'encoche',
      color: 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40'
    },
    tweezer: 'Brucelles N° 3 en appui d\'équilibrage',
    criticalRule: 'Le coq ne doit pas basculer de biais : les pieds de tenon doivent sortir verticalement.',
    instructions: [
      'Repérer l\'encoche de décollement d\'usine usinée sous le talon du coq.',
      'Insérer la tranche d\'une panne de tournevis ou le bec d\'une brucelle fermée dans cette encoche.',
      'Effectuer une légère torsion de quelques degrés pour décoller le coq de ses deux pieds de tenon.',
      'Le coq doit se soulever d\'environ 0.2 mm sans forcer.'
    ],
    mistakeToAvoid: 'Tirer verticalement d\'un coup sec : le pivot inférieur coincé dans l\'Incabloc casserait net.',
    proTip: 'Si le coq résiste, tapoter délicatement le pourtour avec une cheville de buis pour libérer les tenons grippés.'
  },
  {
    number: 5,
    title: 'Sortie de la Cheville de Plateau (Le Geste d\'Or)',
    badge: 'Dextérité Absolue',
    tool: {
      name: 'Brucelles Dumont N° 3',
      specs: 'Prise ferme sur le corps du coq',
      color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
    },
    tweezer: 'Tenue millimétrique du pont',
    criticalRule: 'Accompagner la sortie de l\'ellipse de la fourchette de l\'ancre sans tirer sur le spiral.',
    instructions: [
      'Saisir le corps du coq entre les becs des brucelles N° 3.',
      'Soulever le coq de 1 mm vers le haut tout en observant l\'échappement.',
      'La cheville d\'impulsion en rubis (située sous le double plateau) doit sortir délicatement de la fourchette d\'ancre.',
      'Le balancier s\'élève alors naturellement, suspendu sous le coq par son ressort spiral.',
      'NE JAMAIS SECOUER : Maintenir un déplacement lent, stable et régulier.'
    ],
    mistakeToAvoid: 'Tirer de côté : l\'ellipse buterait contre les cornes de l\'ancre et tordrait le pivot inférieur de l\'axe.',
    proTip: 'C\'est l\'instant le plus noté par les jurys d\'examen suisses : la fluidité du geste démontre la maîtrise du candidat.'
  },
  {
    number: 6,
    title: 'Dépose sur Support & Protection Antipoussière',
    badge: 'Préservation',
    tool: {
      name: 'Porte-balancier (Lyre) ou papier de soie',
      specs: 'Support d\'établi neutre et propre',
      color: 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40'
    },
    tweezer: 'Brucelles N° 3 pour le dépôt',
    criticalRule: 'Le spiral ne doit jamais supporter le poids du balancier.',
    instructions: [
      'Transférer le coq et son balancier suspendu vers le porte-balancier Bergeon (ou un lit de papier de soie non pelucheux).',
      'Déposer le coq à plat, la serge du balancier orientée vers le haut afin que les spires du spiral reposent librement.',
      'Vérifier sous loupe que les spires restent parfaitement planes et concentriques sans se toucher.',
      'Recouvrir immédiatement l\'ensemble d\'une cloche antipoussière d\'atelier.'
    ],
    mistakeToAvoid: 'Poser le balancier sur un établi gras ou sans cloche : la poussière s\'agglomérerait dans les spires du spiral.',
    proTip: 'Ne jamais utiliser de soufflette à air comprimé sur un balancier libre : la pression déformerait irrémédiablement le spiral.'
  }
];

// --- 4 RÈGLES D'OR DE L'ORGANE RÉGULATEUR ---
const GOLDEN_RULES = [
  {
    title: 'Le Spiral est Sacré',
    desc: 'Tout contact direct d\'une brucelle avec le corps actif du spiral est éliminatoire. Une spire pliée ne retrouve jamais son isochronisme d\'origine sans repassage d\'expert.',
    icon: '⚡'
  },
  {
    title: 'Pivots de 0.09 mm',
    desc: 'Les pivots de l\'axe de balancier sont les plus fins de toute la montre. Le moindre geste oblique lors de la sortie de l\'Incabloc casse instantanément le pivot.',
    icon: '💎'
  },
  {
    title: 'Fourchette d\'Ancre Intacte',
    desc: 'L\'ellipse de plateau doit glisser hors de la fourchette sans la faire claquer contre les goupilles de limitation.',
    icon: '🎯'
  },
  {
    title: 'Zéro Air Comprimé',
    desc: 'Ne soufflez jamais à la poire ou au compresseur sur un balancier déposé : le souffle vrille les spires en un millième de seconde.',
    icon: '🛑'
  }
];

// --- ANATOMIE DE L'ORGANE RÉGULATEUR ETA 6497 ---
const ANATOMY_PARTS = [
  { name: 'Le Coq (Pont de Balancier)', role: 'Maintient l\'axe de balancier et supporte le bloc antichoc Incabloc supérieur.' },
  { name: 'Le Balancier Glucydur', role: 'Volant d\'inertie lourd oscillant à 18\'000 A/h (2.5 Hz) pour découper le temps avec précision.' },
  { name: 'Le Ressort Spiral Nivarox', role: 'Ressort élastique thermo-compensé qui rappelle le balancier vers son point d\'équilibre.' },
  { name: 'Le Piton & Porte-Piton', role: 'Fixe l\'extrémité extérieure de la dernière spire du spiral au coq.' },
  { name: 'La Raquette & Flèche', role: 'Modifie la longueur active du spiral pour ajuster l\'avance ou le retard (marche).' },
  { name: 'Le Double Plateau & Cheville (Rubis)', role: 'Transmet l\'impulsion mécanique reçue de l\'ancre et déverrouille l\'échappement.' }
];

export default function DemontageBalancierPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // SEO Schema steps data
  const schemaSteps = BALANCIER_PROTOCOL.map(s => ({
    name: `Étape ${s.number} : ${s.title}`,
    text: s.instructions.join(' ')
  }));

  const handleStepToggle = (num: number) => {
    setCompletedSteps(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const current = BALANCIER_PROTOCOL[activeStep];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-[#E2B44F]/30 selection:text-amber-800 dark:selection:text-[#F4E5B8]">

      {/* SEO Structured Data */}
      <BreadcrumbsSchema
        items={[
          { name: 'Accueil', slug: '' },
          { name: 'Pratique Horlogère', slug: 'pratique' },
          { name: 'Démontage du Balancier ETA 6497', slug: 'pratique/demontage-balancier' }
        ]}
      />
      <HowToSchema
        name="Protocole Officiel de Dépose du Balancier-Spiral (ETA 6497-1)"
        description="Guide professionnel d'atelier pour déposer en toute sécurité le balancier-spiral et son coq sur calibre mécanique suisse ETA 6497-1."
        steps={schemaSteps}
      />

      {/* Ambiance d'Établi & Particules Dorées */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#E2B44F]/15 via-[#D4AF37]/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-amber-500/5 blur-[160px]" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#E2B44F]/5 blur-[150px]" />

        <motion.div
          animate={{ y: [-15, 15, -15], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 left-1/4 w-2 h-2 rounded-full bg-[#E2B44F] blur-[1px]"
        />
        <motion.div
          animate={{ y: [15, -15, 15], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-[#F4E5B8] blur-[1px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 relative z-10 space-y-16">

        {/* --- BREADCRUMB & SWISS WORKSHOP BADGE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-[#E2B44F] transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <Link href="/pratique" className="hover:text-[#E2B44F] transition-colors">Pratique</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-[#E2B44F] font-medium">Dépose du Balancier-Spiral</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] border border-[#E2B44F]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E2B44F] animate-pulse" />
              Étape Critique · Organe Régulateur ETA 6497-1
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE --- */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            Protocole de Haute Précision · Risque Maximal de Déformation
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Dépose du Balancier-Spiral &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-[#E2B44F] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#F4E5B8] dark:to-[#E2B44F] bg-clip-text text-transparent">
              Préservation du Cœur Vivant
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Le balancier-spiral est le cœur battant de la montre mécanique.
            Sur le calibre école ETA 6497-1, sa dépose exige une dextérité absolue pour libérer l&apos;axe sans casser les pivots de 0.09 mm,
            désengager la cheville de plateau de la fourchette d&apos;ancre et protéger les spires du spiral Nivarox.
          </p>

          {/* 4 Indicateurs Spécifiques au Balancier */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Fréquence du Calibre</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">18&apos;000 A/h</div>
              <div className="text-[11px] text-[#E2B44F] mt-0.5">2.5 Hz · 5 alternances / sec</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Diamètre des Pivots</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">~0.09 mm</div>
              <div className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">Fragilité extrême Incabloc</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Tournevis Requis</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">0.80 &amp; 1.40</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Jaune (Piton) · Gris (Coq)</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Protocoles Validés</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">6 Étapes</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Critère d&apos;examen AFP/CFC</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: LE STEPPER INTERACTIF EN 6 ÉTAPES D'ÉTABLI                     */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                🔬 Protocole Méthodique d&apos;Atelier
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                La Dépose Pas-à-Pas du Balancier
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500">Progression :</span>
              <span className="px-2.5 py-1 rounded-full bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] font-bold border border-[#E2B44F]/30">
                {completedSteps.length} / 6 étapes validées
              </span>
            </div>
          </div>

          {/* Stepper Navigation Buttons (Desktop & Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {BALANCIER_PROTOCOL.map((st, idx) => {
              const isCurrent = idx === activeStep;
              const isDone = completedSteps.includes(st.number);

              return (
                <button
                  key={st.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                    isCurrent
                      ? 'bg-white dark:bg-[#0D121F] border-[#E2B44F] shadow-lg shadow-[#E2B44F]/10 ring-2 ring-[#E2B44F]/30'
                      : isDone
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 text-slate-700 dark:text-slate-300'
                      : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {st.number}
                    </span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <span className="text-xs font-serif font-bold line-clamp-2 leading-tight">
                    {st.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CARTE D'ACTION ACTIVE DU PROTOCOLE */}
          <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-[#E2B44F]/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
            {/* Lueur d'accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2B44F]/5 rounded-full blur-3xl pointer-events-none" />

            {/* En-tête de l'étape */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                    Étape {current.number} sur 6
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 dark:bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] border border-amber-200 dark:border-[#E2B44F]/30">
                    {current.badge}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
              </div>

              {/* Bouton de validation de l'étape */}
              <button
                onClick={() => handleStepToggle(current.number)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  completedSteps.includes(current.number)
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#E2B44F] hover:text-slate-950 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedSteps.includes(current.number) ? 'Étape Validée à l\'Établi' : 'Marquer comme Validée'}</span>
              </button>
            </div>

            {/* Grille : Outils requis & Règle critique */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  🛠️ Outillage de Précision Exigé
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${current.tool.color}`}>
                    {current.tool.name}
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-300">{current.tool.specs}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Brucelles : <strong className="text-slate-700 dark:text-slate-300">{current.tweezer}</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-700 dark:text-red-300 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  Règle d&apos;Établi Impérative
                </div>
                <p className="text-xs text-red-800 dark:text-red-200 leading-relaxed font-medium">
                  {current.criticalRule}
                </p>
              </div>
            </div>

            {/* Protocole d'actions détaillées */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Geste Technique Pas-à-Pas
              </h4>
              <div className="space-y-3">
                {current.instructions.map((ins, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E2B44F]/20 text-amber-800 dark:text-[#E2B44F] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {iIdx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {ins}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerte Erreur Fréquente & Astuce Pro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-amber-800 dark:text-[#E2B44F] uppercase tracking-wider">
                  ⚠️ Piège Fréquent à l&apos;Examen
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {current.mistakeToAvoid}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  💡 Astuce du Maître d&apos;Apprentissage
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {current.proTip}
                </p>
              </div>
            </div>

            {/* Navigation Stepper Bottom Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
              <button
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Étape Précédente</span>
              </button>

              <button
                onClick={() => setActiveStep(prev => Math.min(BALANCIER_PROTOCOL.length - 1, prev + 1))}
                disabled={activeStep === BALANCIER_PROTOCOL.length - 1}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E2B44F] hover:bg-[#c89b3d] text-slate-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-[#E2B44F]/20"
              >
                <span>Étape Suivante</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: LES 4 RÈGLES D'OR DE SÉCURITÉ DE L'ORGANE RÉGULATEUR           */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
              🛡️ Savoir-Être &amp; Prévention
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Les 4 Commandements de l&apos;Établi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOLDEN_RULES.map((r, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 hover:border-[#E2B44F] dark:hover:border-[#E2B44F] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-[#E2B44F]/10 border border-amber-200 dark:border-[#E2B44F]/30 flex items-center justify-center text-xl">
                  {r.icon}
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                  {r.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ANATOMIE TECHNIQUE DU BALANCIER-COQ ETA 6497-1                 */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
              🔍 Analyse Détaillée des Composants
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Anatomie de l&apos;Ensemble Régulateur (ETA 6497-1)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              L&apos;ensemble solidaire du coq et du balancier forme le sous-système le plus complexe du calibre.
              Chaque organe joue un rôle physique et chronométrique déterminant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANATOMY_PARTS.map((part, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E2B44F]/20 text-[#E2B44F] font-mono text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-white">
                    {part.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light pl-7">
                  {part.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NAVIGATION RETOUR ATELIER --- */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/pratique"
            className="flex items-center gap-2 text-[#E2B44F] hover:text-amber-600 dark:hover:text-[#F4E5B8] transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Retour au Hub Pratique (8 Protocoles d&apos;Établi)</span>
          </Link>

          <Link
            href="/pratique/demontage"
            className="flex items-center gap-2 text-[#E2B44F] hover:text-amber-600 dark:hover:text-[#F4E5B8] transition-colors group"
          >
            <span>Consulter le Démontage Intégral du Mouvement ETA 6497</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}
