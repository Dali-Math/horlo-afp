// src/app/pratique/demontage-balancier/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Info,
  ZoomIn
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
      'Avec une cheville en bois de sureau taillée, écarter avec douceur le bec du cliquet (Code 425) de la denture du rochet.',
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
    badge: 'Couple 2.2 cNm',
    tool: {
      name: 'Tournevis Bergeon N° 1.40 mm',
      specs: 'Code Couleur Gris · Panne plate 95%',
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
      'Repérer l\'encoche de décollement usinée sous le talon du coq.',
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
    proTip: 'C\'est le geste le plus délicat de l\'établi : la fluidité de la levée verticale garantit l\'intégrité des pivots et du spiral.'
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

// --- DATA: 4 ÉTAPES DE LA LYRE INCABLOC ---
interface IncablocStage {
  step: number;
  title: string;
  shortLabel: string;
  toolUsed: string;
  statusColor: string;
  description: string;
  lyreNote: string;
  oilNote: string;
}

const INCABLOC_STAGES: IncablocStage[] = [
  {
    step: 0,
    title: '1. Incabloc Verrouillé en Marche (État Nominal)',
    shortLabel: '1. Verrouillé',
    toolUsed: 'Inspection Loupe 10x',
    statusColor: 'text-emerald-500',
    description:
      'Les deux branches de la lyre ressort en laiton doré sont logées sous les deux encoches latérales du bloc amortisseur. La lyre plaque le contre-pivot rubis plat sur le chaton conique tout en autorisant un recul élastique axial et radial de 0.05 mm en cas de choc.',
    lyreNote: 'Branches verrouillées dans les 2 oreilles du corps de palier',
    oilNote: 'Ménisque Moebius 9010 centré (Ø 60% du contre-pivot)'
  },
  {
    step: 1,
    title: '2. Pincement & Dégagement des 2 Branches de la Lyre',
    shortLabel: '2. Pincement Lyre',
    toolUsed: 'Brucelles Dumont N° 5 ou Pointe d’Huilier Noir',
    statusColor: 'text-amber-500',
    description:
      'Avec la pointe d’une brucelle Dumont N° 5 parfaitement dressée (ou la pointe d’un pique-huile), exercer une légère pression verticale puis vers le centre sur la première branche de la lyre pour la sortir de son encoche, puis répéter sur la seconde branche.',
    lyreNote: 'Déformation élastique contrôlée (-0.18 mm vers l’axe)',
    oilNote: 'Ne jamais appuyer sur le rubis central sous peine de briser le pivot'
  },
  {
    step: 2,
    title: '3. Basculement de la Lyre à 90° autour de sa Charnière',
    shortLabel: '3. Basculement 90°',
    toolUsed: 'Pointe fine ou Cheville de buis taillée',
    statusColor: 'text-sky-400',
    description:
      'Une fois les deux branches dégagées des encoches, faire basculer délicatement la lyre vers l’arrière autour de sa charnière. Elle reste solidaire du bloc amortisseur mais libère totalement l’accès vertical au contre-pivot rubis et au chaton.',
    lyreNote: 'Lyre ouverte à 90° (charnière arrière intacte)',
    oilNote: 'Le contre-pivot adhère encore au chaton par capillarité de l’huile'
  },
  {
    step: 3,
    title: '4. Dépose Verticale du Contre-Pivot au Rodico',
    shortLabel: '4. Extraction Rodico',
    toolUsed: 'Pointe de Rodico Bergeon 6033 (Zéro Brucelles)',
    statusColor: 'text-emerald-400',
    description:
      'Façonner une pointe fine de pâte Rodico propre et l’appliquer verticalement sur la face supérieure du contre-pivot rubis. Le rubis (et souvent le chaton mobile) se soulève sans aucun risque d’effet catapulte, prêt pour le bain d’essence C, l’épilamage Fixodrop et la lubrification Moebius 9010.',
    lyreNote: 'Logement conique du bloc mis à nu pour nettoyage',
    oilNote: 'Regouttage au remontage : 1 goutte Moebius 9010 au centre du contre-pivot'
  }
];

// --- 4 RÈGLES D'OR DE L'ORGANE RÉGULATEUR ---
const GOLDEN_RULES = [
  {
    title: 'Le Spiral est Sacré',
    desc: 'Tout contact direct d\'une brucelle avec le corps actif du spiral est proscrit. Une spire pliée ne retrouve jamais son isochronisme d\'origine sans repassage d\'expert.',
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

  // Interactive SVG Simulator States
  const [benchTab, setBenchTab] = useState<'incabloc' | 'coq-barillet'>('incabloc');
  const [incablocStep, setIncablocStep] = useState<number>(0);
  const [coqMode, setCoqMode] = useState<'erreur' | 'geste-or'>('geste-or');
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

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
  const currentIncabloc = INCABLOC_STAGES[incablocStep];

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
        description="Guide professionnel d'atelier pour déposer en toute sécurité le balancier-spiral, ouvrir la lyre Incabloc et protéger les pivots de 0.09 mm sur calibre mécanique suisse ETA 6497-1."
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
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Préservation du Cœur Vivant
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Le balancier-spiral est le cœur battant de la montre mécanique.
            Sur le calibre ETA 6497-1, sa dépose et le démontage de son antichoc Incabloc exigent une dextérité absolue pour libérer l&apos;axe sans casser les pivots de 0.09 mm,
            désengager la cheville de plateau de la fourchette d&apos;ancre et préserver la planéité des spires du spiral Nivarox.
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
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Protocole d&apos;Établi NIHS</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BANC VISUEL SVG INTERACTIF : LYRE INCABLOC & LEVÉE AXIALE DU COQ          */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          {/* Header & Onglets */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Wrench className="w-4 h-4" />
                <span>Banc Micro-Mécanique SVG Interactif • Loupe d’Atelier 10x</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Cinématique de la Lyre Incabloc &amp; Dépose Sécurisée du Coq
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setBenchTab('incabloc')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  benchTab === 'incabloc'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                }`}
              >
                1. Ouverture Lyre Incabloc &amp; Rodico (4 Étapes)
              </button>
              <button
                onClick={() => setBenchTab('coq-barillet')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  benchTab === 'coq-barillet'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                }`}
              >
                2. Levée du Coq &amp; Désarmage du Barillet
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                  loupe10x
                    ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>{loupe10x ? 'Loupe 10x Active' : 'Loupe 10x'}</span>
              </button>
            </div>
          </div>

          {benchTab === 'incabloc' ? (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Sélecteur 4 positions + Curseur */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {INCABLOC_STAGES.map((stg) => (
                    <button
                      key={stg.step}
                      onClick={() => setIncablocStep(stg.step)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        incablocStep === stg.step
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                      }`}
                    >
                      {stg.shortLabel}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 min-w-[240px]">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Progression :</span>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={1}
                    value={incablocStep}
                    onChange={(e) => setIncablocStep(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Canvas SVG Double Vue (Vue de Dessus + Coupe Axiale) */}
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
                    <span>GAUCHE : VUE DE DESSUS (BLOC INCABLOC &amp; LYRE)</span>
                    <span className="text-amber-400 font-bold">DROITE : COUPE AXIALE (PIVOT Ø 0.09 MM &amp; CHATON)</span>
                  </div>

                  <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                    <svg
                      viewBox="0 0 720 370"
                      className="w-full h-auto transition-transform duration-300"
                      style={{
                        transform: loupe10x ? 'scale(1.42)' : 'scale(1)',
                        transformOrigin: incablocStep >= 2 ? '525px 175px' : '210px 185px'
                      }}
                    >
                      <defs>
                        <radialGradient id="rubyGradIncabloc" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#fb7185" />
                          <stop offset="70%" stopColor="#e11d48" />
                          <stop offset="100%" stopColor="#881337" />
                        </radialGradient>
                        <linearGradient id="brassBlockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fcd34d" />
                          <stop offset="50%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#78350f" />
                        </linearGradient>
                      </defs>

                      {/* Séparateur central */}
                      <line x1="355" y1="20" x2="355" y2="350" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />

                      {/* ========================================================= */}
                      {/* PARTIE GAUCHE : VUE DE DESSUS DU BLOC INCABLOC ET LA LYRE */}
                      {/* ========================================================= */}
                      <g transform="translate(180, 190)">
                        {/* Alésage du coq de balancier */}
                        <circle cx="0" cy="0" r="132" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                        {/* Corps en laiton du bloc amortisseur Incabloc */}
                        <circle cx="0" cy="0" r="106" fill="url(#brassBlockGrad)" stroke="#fbbf24" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="82" fill="#090d16" stroke="#b45309" strokeWidth="2" />

                        {/* 2 Encoches de retenue latérales (Oreilles du bloc) */}
                        <path d="M -92 -28 L -72 -28 L -72 10 L -92 10 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                        <path d="M 72 -28 L 92 -28 L 92 10 L 72 10 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                        <text x="-105" y="-34" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                          Encoche G
                        </text>
                        <text x="105" y="-34" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                          Encoche D
                        </text>

                        {/* Chaton mobile en laiton & Contre-pivot rubis (s'estompe légèrement à l'étape 4 quand soulevé) */}
                        <g opacity={incablocStep === 3 ? 0.35 : 1}>
                          <circle cx="0" cy="0" r="64" fill="#d97706" stroke="#fde68a" strokeWidth="1.8" />
                          <circle cx="0" cy="0" r="50" fill="url(#rubyGradIncabloc)" stroke="#fda4af" strokeWidth="2" />
                          {/* Ménisque d'huile Moebius 9010 (60% du diamètre) */}
                          <circle
                            cx="0"
                            cy="0"
                            r="28"
                            fill="rgba(16, 185, 129, 0.28)"
                            stroke="#34d399"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                          />
                          {/* Pivot de balancier Ø 0.09 mm au centre */}
                          <circle cx="0" cy="0" r="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                        </g>

                        {/* Charnière inférieure de la lyre */}
                        <rect x="-26" y="72" width="52" height="16" rx="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                        <text x="0" y="103" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">
                          Charnière fixe
                        </text>

                        {/* LA LYRE RESSORT EN LAITON DORÉ (Cinématique selon incablocStep) */}
                        {incablocStep === 0 && (
                          <g>
                            {/* Branche gauche verrouillée dans l'encoche */}
                            <path
                              d="M -18 76 C -78 52, -84 12, -82 -18 C -80 -45, -45 -72, -18 -58"
                              fill="none"
                              stroke="#fde047"
                              strokeWidth="6.5"
                              strokeLinecap="round"
                            />
                            {/* Branche droite verrouillée dans l'encoche */}
                            <path
                              d="M 18 76 C 78 52, 84 12, 82 -18 C 80 -45, 45 -72, 18 -58"
                              fill="none"
                              stroke="#fde047"
                              strokeWidth="6.5"
                              strokeLinecap="round"
                            />
                            <text x="0" y="-115" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              LYRE VERROUILLÉE DANS LES 2 ENCOCHES
                            </text>
                          </g>
                        )}

                        {incablocStep === 1 && (
                          <g>
                            {/* Branches pincées vers l'intérieur pour sortir des encoches */}
                            <path
                              d="M -18 76 C -62 52, -60 12, -56 -18 C -52 -45, -35 -68, -14 -56"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="6.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 18 76 C 62 52, 60 12, 56 -18 C 52 -45, 35 -68, 14 -56"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="6.5"
                              strokeLinecap="round"
                            />
                            {/* Flèches de pincement des brucelles Dumont N°5 */}
                            <path d="M -112 -10 L -68 -10" stroke="#38bdf8" strokeWidth="3" />
                            <polygon points="-64,-10 -74,-15 -74,-5" fill="#38bdf8" />
                            <path d="M 112 -10 L 68 -10" stroke="#38bdf8" strokeWidth="3" />
                            <polygon points="64,-10 74,-15 74,-5" fill="#38bdf8" />
                            <text x="0" y="-115" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              PINCEMENT CENTRIPÈTE (DÉGAGEMENT DES ENCOCHES)
                            </text>
                          </g>
                        )}

                        {incablocStep >= 2 && (
                          <g>
                            {/* Lyre basculée vers le bas (ouverte à 90°/120°) */}
                            <path
                              d="M -18 82 C -58 102, -66 125, -45 142"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 18 82 C 58 102, 66 125, 45 142"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />
                            <text x="0" y="-115" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              {incablocStep === 2
                                ? 'LYRE BASCULÉE À 90° — RUBIS LIBÉRÉ'
                                : 'EXTRACTION DU CONTRE-PIVOT AU RODICO'}
                            </text>
                          </g>
                        )}

                        {/* Pointe de Rodico en vue de dessus à l'étape 4 */}
                        {incablocStep === 3 && (
                          <g>
                            <circle cx="0" cy="-8" r="34" fill="rgba(16, 185, 129, 0.35)" stroke="#10b981" strokeWidth="2.5" />
                            <text x="0" y="-4" fill="#ecfdf5" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              RODICO 6033
                            </text>
                          </g>
                        )}
                      </g>

                      {/* ========================================================= */}
                      {/* PARTIE DROITE : COUPE AXIALE MICRO-MÉCANIQUE              */}
                      {/* ========================================================= */}
                      <g transform="translate(535, 195)">
                        {/* Corps de palier Incabloc en coupe (épaulements coniques) */}
                        <path
                          d="M -125 -55 L -75 -55 L -58 -5 L -88 -5 L -88 35 L -125 35 Z"
                          fill="#b45309"
                          stroke="#fbbf24"
                          strokeWidth="2"
                        />
                        <path
                          d="M 125 -55 L 75 -55 L 58 -5 L 88 -5 L 88 35 L 125 35 Z"
                          fill="#b45309"
                          stroke="#fbbf24"
                          strokeWidth="2"
                        />

                        {/* Axe de balancier + Pivot Ø 0.09 mm venant du bas */}
                        <path
                          d="M -32 135 L -32 82 C -32 62, -10 52, -10 34 L -10 -4 L 10 -4 L 10 34 C 10 52, 32 62, 32 82 L 32 135 Z"
                          fill="#cbd5e1"
                          stroke="#64748b"
                          strokeWidth="2"
                        />
                        <text x="0" y="115" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          AXE
                        </text>
                        <text x="72" y="24" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                          Pivot Ø 0.09 mm
                        </text>
                        <line x1="12" y1="15" x2="66" y2="21" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

                        {/* Chaton mobile + Pierre percée */}
                        <g transform={incablocStep === 3 ? 'translate(0, -14)' : 'translate(0, 0)'}>
                          {/* Chaton laiton */}
                          <path d="M -70 -28 L -46 -28 L -46 18 L -58 18 Z" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.5" />
                          <path d="M 70 -28 L 46 -28 L 46 18 L 58 18 Z" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.5" />
                          {/* Pierre percée rubis (avec trou central pour le pivot) */}
                          <rect x="-46" y="-8" width="33" height="24" rx="3" fill="url(#rubyGradIncabloc)" stroke="#fda4af" strokeWidth="1.5" />
                          <rect x="13" y="-8" width="33" height="24" rx="3" fill="url(#rubyGradIncabloc)" stroke="#fda4af" strokeWidth="1.5" />
                        </g>

                        {/* Contre-pivot rubis plat + Ménisque Moebius 9010 (se soulève à l'étape 4 avec le Rodico) */}
                        <g transform={incablocStep === 3 ? 'translate(0, -68)' : 'translate(0, 0)'}>
                          {/* Contre-pivot rubis */}
                          <rect
                            x="-52"
                            y="-30"
                            width="104"
                            height="18"
                            rx="4"
                            fill="url(#rubyGradIncabloc)"
                            stroke="#fecdd3"
                            strokeWidth="2"
                          />
                          <text x="0" y="-18" fill="#fff1f2" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                            CONTRE-PIVOT RUBIS
                          </text>

                          {/* Goutte d'huile Moebius 9010 (Ménisque retenu par capillarité) */}
                          <path
                            d="M -24 -12 Q 0 2, 24 -12 Z"
                            fill="rgba(16, 185, 129, 0.75)"
                            stroke="#34d399"
                            strokeWidth="1.5"
                          />
                        </g>

                        {/* Lyre en coupe ou basculée */}
                        {incablocStep === 0 && (
                          <g>
                            <rect x="-86" y="-44" width="36" height="9" rx="3" fill="#fde047" />
                            <rect x="50" y="-44" width="36" height="9" rx="3" fill="#fde047" />
                            <text x="0" y="-65" fill="#fde047" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Pression axiale de la lyre
                            </text>
                          </g>
                        )}

                        {incablocStep === 1 && (
                          <g>
                            <rect x="-66" y="-48" width="34" height="9" rx="3" fill="#fbbf24" />
                            <rect x="32" y="-48" width="34" height="9" rx="3" fill="#fbbf24" />
                            <text x="0" y="-68" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Branches dégagées des encoches
                            </text>
                          </g>
                        )}

                        {incablocStep === 2 && (
                          <g>
                            {/* Lyre pivotée à 90° sur le côté droit */}
                            <path
                              d="M 82 -42 L 118 -135"
                              stroke="#38bdf8"
                              strokeWidth="7"
                              strokeLinecap="round"
                            />
                            <text x="45" y="-118" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                              Lyre ouverte (90°)
                            </text>
                          </g>
                        )}

                        {incablocStep === 3 && (
                          <g>
                            {/* Pointe conique de Rodico Bergeon 6033 soulevant verticalement le contre-pivot */}
                            <path
                              d="M -28 -165 L -16 -98 L 16 -98 L 28 -165 Z"
                              fill="#10b981"
                              stroke="#6ee7b7"
                              strokeWidth="2"
                            />
                            <text x="0" y="-132" fill="#064e3b" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              RODICO
                            </text>
                            {/* Flèche d'extraction verticale */}
                            <path d="M -85 -45 L -85 -115" stroke="#34d399" strokeWidth="3" />
                            <polygon points="-85,-122 -91,-110 -79,-110" fill="#34d399" />
                            <text x="-105" y="-80" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                              Levée 90°
                            </text>
                          </g>
                        )}

                        {/* Légende Ménisque Moebius 9010 */}
                        <text x="0" y="155" fill="#34d399" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Lubrifiant certifié : Moebius 9010 (Ø ménisque = 60% du contre-pivot)
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Panneau d'analyse horlogère de l'étape active */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
                        Outil : {currentIncabloc.toolUsed}
                      </span>
                      <span className={`text-xs font-mono font-bold ${currentIncabloc.statusColor}`}>
                        Étape {incablocStep + 1} / 4
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {currentIncabloc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentIncabloc.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono">
                        <strong>État de la lyre :</strong> {currentIncabloc.lyreNote}
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono">
                        <strong>Tribologie :</strong> {currentIncabloc.oilNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ONGLET 2 : DÉPOSE AXIALE DU COQ & DÉSARMAGE DU BARILLET */
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCoqMode('geste-or')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      coqMode === 'geste-or'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    ✓ Geste d’Or : Barillet Désarmé (0 cNm) + Levée Axiale Stricte (90.0°)
                  </button>
                  <button
                    onClick={() => setCoqMode('erreur')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      coqMode === 'erreur'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    ✗ Erreur Fatale : Barillet Armé + Levier Oblique (14° → Pivot Brisé)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                  <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                    <svg
                      viewBox="0 0 720 350"
                      className="w-full h-auto transition-transform duration-300"
                      style={{
                        transform: loupe10x ? 'scale(1.38)' : 'scale(1)',
                        transformOrigin: '490px 210px'
                      }}
                    >
                      <line x1="320" y1="20" x2="320" y2="330" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />

                      {/* COLONNE GAUCHE : ROCHET & CLIQUET CODE 425 */}
                      <g transform="translate(155, 175)">
                        <text x="0" y="-135" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          1. BARILLET &amp; CLIQUET (CODE 425)
                        </text>
                        <circle
                          cx="0"
                          cy="0"
                          r="78"
                          fill="#1e293b"
                          stroke={coqMode === 'geste-or' ? '#10b981' : '#f43f5e'}
                          strokeWidth="3"
                          strokeDasharray="8 4"
                        />
                        <circle cx="0" cy="0" r="24" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

                        {/* Cliquet Code 425 */}
                        <path
                          d={coqMode === 'geste-or' ? 'M 65 -65 L 92 -35 L 74 -25 Z' : 'M 75 -75 L 112 -45 L 94 -35 Z'}
                          fill="#fbbf24"
                          stroke="#78350f"
                          strokeWidth="2"
                        />
                        {/* Cheville de sureau écartant le cliquet */}
                        <path d="M 105 -95 L 82 -55" stroke="#fde68a" strokeWidth="6" strokeLinecap="round" />

                        <text
                          x="0"
                          y="112"
                          fill={coqMode === 'geste-or' ? '#34d399' : '#fb7185'}
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {coqMode === 'geste-or'
                            ? 'Couronne retenue : Couple = 0 cNm'
                            : 'Lâcher brutal : Décharge > 2500 tr/min !'}
                        </text>
                      </g>

                      {/* COLONNE DROITE : LEVÉE DU COQ, SPIRAL NIVAROX & PIVOT INFÉRIEUR */}
                      <g transform="translate(520, 180)">
                        <text x="0" y="-140" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          2. TRAJECTOIRE DU COQ &amp; DU PIVOT INFÉRIEUR (Ø 0.09 MM)
                        </text>

                        {/* Platine inférieure + Palier Incabloc inférieur */}
                        <rect x="-150" y="90" width="300" height="26" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <rect x="-24" y="88" width="48" height="22" rx="3" fill="#e11d48" stroke="#fda4af" strokeWidth="1.5" />

                        {/* Groupe Coq + Spiral + Balancier (Droit vs Incliné à 14°) */}
                        <g transform={coqMode === 'geste-or' ? 'translate(0, -18) rotate(0)' : 'translate(8, -10) rotate(14)'}>
                          {/* Pont de balancier (Coq) */}
                          <rect x="-110" y="-95" width="220" height="24" rx="6" fill="#d97706" stroke="#fde68a" strokeWidth="2" />
                          <text x="0" y="-79" fill="#090d16" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                            COQ DE BALANCIER (ETA 6497)
                          </text>

                          {/* Spires du spiral Nivarox */}
                          {coqMode === 'geste-or' ? (
                            <g stroke="#38bdf8" strokeWidth="2" fill="none">
                              <line x1="-45" y1="-50" x2="45" y2="-50" />
                              <line x1="-55" y1="-42" x2="55" y2="-42" />
                              <line x1="-45" y1="-34" x2="45" y2="-34" />
                            </g>
                          ) : (
                            <g stroke="#f43f5e" strokeWidth="2.2" fill="none">
                              <path d="M -45 -62 L 45 -32 L -52 -18 L 52 -5" />
                            </g>
                          )}

                          {/* Serge du balancier Glucydur + Axe */}
                          <rect x="-85" y="-8" width="170" height="16" rx="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                          <rect x="-6" y="-70" width="12" height="155" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />

                          {/* Pivot inférieur Ø 0.09 mm */}
                          <rect
                            x="-3"
                            y="85"
                            width="6"
                            height="18"
                            fill={coqMode === 'geste-or' ? '#34d399' : '#f43f5e'}
                          />
                        </g>

                        {/* Indicateur de rupture ou de sortie saine */}
                        {coqMode === 'geste-or' ? (
                          <g>
                            <path d="M -130 40 L -130 -60" stroke="#10b981" strokeWidth="3" />
                            <polygon points="-130,-68 -136,-56 -124,-56" fill="#10b981" />
                            <text x="0" y="138" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Axe 90.0° : Pivot Ø 0.09 mm intact &amp; spires planes
                            </text>
                          </g>
                        ) : (
                          <g>
                            <circle cx="2" cy="90" r="18" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 2" />
                            <text x="0" y="138" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              Inclinaison 14° : Cisaillement du pivot Ø 0.09 mm + Spiral vrillé !
                            </text>
                          </g>
                        )}
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        coqMode === 'geste-or'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {coqMode === 'geste-or' ? 'Protocole Conforme NIHS' : 'Casse Mécanique Immédiate'}
                    </span>

                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {coqMode === 'geste-or'
                        ? 'Levée Verticale dans l’Axe (0.0° d’Obliquité)'
                        : 'Pourquoi l’Inclinaison du Coq Brise le Pivot'}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {coqMode === 'geste-or'
                        ? 'Une fois le barillet intégralement désarmé (couronne retenue entre le pouce et l’index tout en écartant le cliquet Code 425 à la cheville de sureau), le coq est soulevé strictement à la verticale aux brucelles Dumont N° 3. Le pivot inférieur de 0.09 mm sort librement du chaton Incabloc et l’ellipse quitte la fourchette d’ancre sans effort.'
                        : 'Si l’horloger soulève le coq en faisant levier d’un seul côté (angle > 5°), le pont agit comme un bras de levier de 18 mm sur un pivot en acier trempé de seulement 0.09 mm de diamètre engagé dans le rubis inférieur : le pivot casse net comme du verre et le spiral prend une déformation permanente en parapluie.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

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
                  ⚠️ Piège Fréquent à l&apos;Établi
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {current.mistakeToAvoid}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  💡 Astuce d&apos;Horloger à l&apos;Établi
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
              L&apos;ensemble solidaire du coq et du balancier forme le sous-système le plus sensible du calibre.
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
