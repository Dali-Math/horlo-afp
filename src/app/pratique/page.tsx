// src/app/pratique/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Clock,
  Droplet,
  FileText,
  Award,
  Hammer,
  ChevronRight,
  ArrowRight,
  Compass,
  Layers,
  Zap,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Sparkles,
  Gauge,
  AlertTriangle
} from 'lucide-react';
import Flashcards6497 from '@/components/Flashcards6497';

// --- DATA STRUCTURES ---

interface StationData {
  id: number;
  category: string;
  badge: string;
  difficulty: string;
  title: string;
  desc: string;
  icon: string;
  tools: string[];
  rules: string[];
  ctaText: string;
  ctaHref: string;
  accentColor: 'amber' | 'cyan' | 'emerald' | 'purple';
}

const WORKBENCH_STATIONS: Record<number, StationData> = {
  1: {
    id: 1,
    category: "Poste 01 · Rhabillage & Calibre",
    badge: "ETA 6497-1 Unitas",
    difficulty: "Niveau : Fondations AFP & CFC",
    title: "Démontage & Dépose Méthodique",
    desc: "La dépose d'un calibre horloger exige la rigueur absolue de l'ordre inverse. On désarme toujours le barillet avant toute intervention, puis on extrait immédiatement l'organe réglant (balancier-spiral) pour préserver ses pivots microscopiques de tout choc.",
    icon: "⚙️",
    tools: ["Tournevis Bergeon 30081", "Brucelles Dumont N°3 & N°5", "Porte-pièce berceau"],
    rules: [
      "Désarmement complet du barillet avec tournevis et cheville de sureau avant dépose",
      "Dépose du coq en soulevant verticalement sans faire pivoter le spiral",
      "Ébats axiaux de rouage obligatoirement vérifiés : 0.02 à 0.04 mm"
    ],
    ctaText: "Consulter le Protocole de Démontage",
    ctaHref: "/pratique/demontage",
    accentColor: "amber"
  },
  2: {
    id: 2,
    category: "Poste 02 · Micro-Lubrification d'Élite",
    badge: "Moebius 4 Godets",
    difficulty: "Niveau : Précision Micrométrique",
    title: "Cartographie des 25 Points de Lubrification",
    desc: "En Haute Horlogerie suisse, une mauvaise huile est pire que pas d'huile. L'horloger dispose de 4 godets codés par couleur : les huiles fluides synthétiques pour les pivots ultra-rapides, les huiles épaisses pour les fortes pressions et la graisse thixotrope pour l'échappement.",
    icon: "💧",
    tools: ["Huiliers 4 godets Bergeon", "Piques-huiles 30102", "Moebius 9010 / HP-1300 / 9415"],
    rules: [
      "Volume de goutte rigoureux : entre 1/2 et 2/3 du réservoir de rubis",
      "Interdiction totale de lubrifier les dents de la roue d'ancre (uniquement levées)",
      "Nettoyage préalable absolu à la benzine rectifiée et cheville de sureau"
    ],
    ctaText: "Consulter la Cartographie de Huilage",
    ctaHref: "/pratique/huilage",
    accentColor: "cyan"
  },
  3: {
    id: 3,
    category: "Poste 03 · Banc Chronométrique COSC",
    badge: "Witschi Chronoscope",
    difficulty: "Niveau : Maîtrise COSC",
    title: "Analyse Acoustique au Vibrographe Witschi",
    desc: "Le vibrographe capte les micro-chocs de l'échappement suisse (bruit de levée, impulsion, chute) et calcule la marche diurne instantanée en secondes par jour, l'angle d'amplitude du balancier et l'erreur de repère (beat error).",
    icon: "⏱️",
    tools: ["Vibrographe Witschi", "Clé de raquette micrométrique", "Loupe d'horloger 10x"],
    rules: [
      "Repère impératif : inférieur à 0.6 ms (au-delà, la montre boite)",
      "Amplitude saine : comprise entre 270° et 315° à plat à armage complet",
      "Contrôle sur 5 positions d'examen : CH, CB, 6H, 9H, 3H"
    ],
    ctaText: "Consulter le Protocole de Réglage",
    ctaHref: "/pratique/reglage",
    accentColor: "emerald"
  },
  4: {
    id: 4,
    category: "Poste 04 · Micromécanique & Outillage",
    badge: "Schaublin 70 & Outils",
    difficulty: "Niveau : Usinage d'Horloger",
    title: "Tour d'Outilleur Schaublin 70 & Burins",
    desc: "Le tour d'horloger Schaublin 70 est l'emblème des manufactures suisses. Il permet de tourner des tiges de remontoir, axes de balancier et vis sur mesure au centième de millimètre (0.01 mm) dans des aciers trempables Böhler K720.",
    icon: "📐",
    tools: ["Tour Schaublin 70", "Pinces W-12", "Pierre Arkansas", "Chalumeau"],
    rules: [
      "Largeur de panne de tournevis exactement égale à la fente de vis (zéro jeu)",
      "Lubrification de coupe obligatoire au pétrole horloger",
      "Trempe à 780°C rouge cerise puis revenu au jaune paille (230°C)"
    ],
    ctaText: "Consulter le Module Micromécanique",
    ctaHref: "/pratique/micromecanique",
    accentColor: "purple"
  }
};

interface PracticalModule {
  step: string;
  badge: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  stepColor: string;
  hoverBorder: string;
  hoverText: string;
  hoverShadow: string;
  btnHover: string;
  tools: string[];
  href: string;
}

const PRACTICAL_MODULES: PracticalModule[] = [
  {
    step: 'Étape 00 · Micromécanique',
    badge: 'Schaublin 70',
    title: 'Tournage & Micromécanique',
    description: 'Tour d\'outilleur Schaublin 70, chariot croisé 0.01mm, affûtage des 5 burins d\'horloger et trempe de l\'acier Böhler K720.',
    icon: '📐',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    stepColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    hoverShadow: 'hover:shadow-amber-500/10',
    btnHover: 'group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400',
    tools: ['Tour Schaublin 70', 'Pinces W-12', 'Burins'],
    href: '/pratique/micromecanique'
  },
  {
    step: 'Étape 01 · Fondations',
    badge: 'ETA 6497-1',
    title: 'Démontage du Mouvement',
    description: 'Ordre chronologique strict de dépose : balancier-spiral complet, ancre et pont, rouage, barillet et classement des vis en godets étiquetés.',
    icon: '🔧',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    stepColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    hoverShadow: 'hover:shadow-amber-500/10',
    btnHover: 'group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400',
    tools: ['Tournevis Bergeon', 'Brucelles N°3', 'Porte-pièce'],
    href: '/pratique/demontage'
  },
  {
    step: 'Étape 03 · Cœur Vivant',
    badge: 'Sécurité Maximale',
    title: 'Balancier-Spiral & Sécurité',
    description: 'Le geste d\'or de l\'horloger : manipulation délicate du coq sans vriller le spiral, desserrage de la vis de piton et centrage parfait des spires.',
    icon: '⚡',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-500/30',
    iconColor: 'text-rose-500 dark:text-rose-400',
    stepColor: 'text-rose-600 dark:text-rose-400',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-400',
    hoverText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    hoverShadow: 'hover:shadow-rose-500/10',
    btnHover: 'group-hover:bg-rose-500 dark:group-hover:bg-rose-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-rose-400',
    tools: ['Tournevis N°0.80', 'Brucelles N°5', 'Papier de soie'],
    href: '/pratique/demontage-balancier'
  },
  {
    step: 'Étape 02 · Rigueur Inverse',
    badge: 'ETA 6497-1',
    title: 'Remontage & Assemblage',
    description: 'Reconstitution méthodique du calibre : mise en place du barillet, engrènement du rouage, contrôle des ébats axiaux et sécurité du cliquet.',
    icon: '⛓️',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/30',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    stepColor: 'text-cyan-600 dark:text-cyan-400',
    hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-400',
    hoverText: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    hoverShadow: 'hover:shadow-cyan-500/10',
    btnHover: 'group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-cyan-400',
    tools: ['Brucelles N°3', 'Cheville sureau', 'Pique-huile'],
    href: '/pratique/remontage'
  },
  {
    step: 'Étape 04 · Micrométrie',
    badge: 'Moebius 25 Points',
    title: 'Huilage & Lubrification',
    description: 'Cartographie officielle des 25 points d\'huile : Moebius 9010 pour pivots rapides, HP-1300 pour barillet et 9415 pour les levées d\'ancre.',
    icon: '💧',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/30',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    stepColor: 'text-cyan-600 dark:text-cyan-400',
    hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-400',
    hoverText: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    hoverShadow: 'hover:shadow-cyan-500/10',
    btnHover: 'group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-cyan-400',
    tools: ['Huiliers 4 godets', 'Piques-huiles', 'Moebius 9010'],
    href: '/pratique/huilage'
  },
  {
    step: 'Étape 05 · Chronométrie',
    badge: 'Norme COSC',
    title: 'Réglage & Précision',
    description: 'Diagnostic acoustique au vibrographe : mesure de la marche diurne (s/j), calcul du repère (<0.6 ms) et analyse d\'amplitude sur 5 positions.',
    icon: '⏱️',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    stepColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-400',
    hoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    hoverShadow: 'hover:shadow-emerald-500/10',
    btnHover: 'group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-emerald-400',
    tools: ['Vibrographe Witschi', 'Clé de raquette', 'Loupe 10x'],
    href: '/pratique/reglage'
  },
  {
    step: 'Étape 06 · Arsenal d\'Établi',
    badge: 'Bergeon 30081',
    title: 'Outils & Équipement',
    description: 'Entretien et préparation de l\'outillage d\'élite : affûtage des pannes de tournevis sur pierre d\'Arkansas, pâte Rodico, potences et loupes.',
    icon: '🔨',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    stepColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-400',
    hoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    hoverShadow: 'hover:shadow-emerald-500/10',
    btnHover: 'group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-emerald-400',
    tools: ['Tournevis 30081', 'Pierre Arkansas', 'Pâte Rodico'],
    href: '/pratique/outils'
  },
  {
    step: 'Étape 07 · Calibres Rois',
    badge: '2824 · 7750 · 6497',
    title: 'Rhabillage des 3 Calibres Rois',
    description: 'Protocoles chronologiques officiels, couples de serrage en cNm, cartographie des 5 huiles Moebius, schémas techniques et loupe 10x.',
    icon: '⚙️',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    stepColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    hoverShadow: 'hover:shadow-amber-500/10',
    btnHover: 'group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400',
    tools: ['ETA 2824-2', 'Valjoux 7750', 'Unitas 6497-1'],
    href: '/pratique/rhabillage'
  },
  {
    step: 'Étape 08 · Habillage d\'Atelier',
    badge: 'NIHS 91-10 & 92-20',
    title: 'Posages & Emboîtages d\'Atelier',
    description: 'Cadrage, chassage des aiguilles, chasse aux poussières en lumière rasante 45°, découpe micrométrique de tige et étanchéité Proofmaster.',
    icon: '🪚',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    stepColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    hoverShadow: 'hover:shadow-amber-500/10',
    btnHover: 'group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400',
    tools: ['Protecteur Mylar', 'Poire HEPA', 'Proofmaster'],
    href: '/pratique/emboitage'
  },
  {
    step: 'Étape 09 · Cœur Battant',
    badge: 'NIHS 91-10 & ISO 3159',
    title: 'Échappement Suisse & Balancier-Spiral',
    description: 'Anatomie micrométrique, cycle en 3 temps (dégagement, impulsion, chute), tirage 12°-15°, courbe Breguet, lubrification Moebius 9415 et diagnostic vibrographe.',
    icon: '⚙️',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-500/30',
    iconColor: 'text-rose-500 dark:text-rose-400',
    stepColor: 'text-rose-600 dark:text-rose-400',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-400',
    hoverText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    hoverShadow: 'hover:shadow-rose-500/10',
    btnHover: 'group-hover:bg-rose-500 dark:group-hover:bg-rose-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-rose-400',
    tools: ['Banc Cinématique', 'Witschi Chronoscope', 'Moebius 9415'],
    href: '/pratique/echappement'
  },
  {
    step: 'Étape 10 · Plans d\'Usine',
    badge: 'Plans ETA & Valjoux',
    title: 'Fiches Techniques & Nomenclatures',
    description: 'Plans officiels complets des calibres suisses de référence : éclatés techniques ETA 6497-1 et ETA 2824-2, nomenclature et couples de serrage.',
    icon: '📄',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    stepColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-400',
    hoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    hoverShadow: 'hover:shadow-emerald-500/10',
    btnHover: 'group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-emerald-400',
    tools: ['Plans ETA 6497', 'Plans ETA 2824', 'Couples cN.m'],
    href: '/pratique/fiches'
  },
  {
    step: 'Étape 11 · Filières d\'État',
    badge: 'Convention Patronale',
    title: 'Certifications AFP & CFC',
    description: 'Les exigences fédérales suisses de la formation professionnelle : critères d\'examen d\'établi, grilles d\'évaluation et passerelles de carrière.',
    icon: '🏆',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
    stepColor: 'text-amber-600 dark:text-amber-400',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    hoverShadow: 'hover:shadow-amber-500/10',
    btnHover: 'group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400',
    tools: ['Critères CP', 'Grilles d\'examen', 'orientation.ch'],
    href: '/pratique/certifications'
  },
  {
    step: 'Étape 12 · Clinique & Survie',
    badge: 'Guide de Survie Apprenti',
    title: 'Dépannage & Erreurs Courantes',
    description: 'Les 4 piliers de panne (barillet, rouage, échappement, remontoir), 6 fiches d\'atelier Erreur vs Bon geste, loupe 10x et test diagnostic interactif.',
    icon: '🔍',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-500/30',
    iconColor: 'text-rose-500 dark:text-rose-400',
    stepColor: 'text-rose-600 dark:text-rose-400',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-400',
    hoverText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    hoverShadow: 'hover:shadow-rose-500/10',
    btnHover: 'group-hover:bg-rose-500 dark:group-hover:bg-rose-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-rose-400',
    tools: ['Estrapade 2729', 'Loupe 10x', 'Moebius 8217/9504'],
    href: '/pratique/depannage-erreurs'
  }
];

const WORKBENCH_QUOTES = [
  {
    text: "À l'établi, chaque centième de millimètre sépare la perfection de l'échec. La patience et la douceur du geste sont les premières vertus de l'horloger.",
    author: "Enseignement Traditionnel des Manufactures Suisses"
  },
  {
    text: "Ne forcez jamais un rouage. Si un pivot ou un pont résiste, arrêtez-vous : la mécanique parle à qui sait écouter le métal.",
    author: "Maxime des Cabinotiers Genevois"
  },
  {
    text: "La propreté absolue d'un composant et la justesse d'une goutte d'huile confèrent au garde-temps son battement pour les siècles à venir.",
    author: "Règle d'Or de la Lubrification d'Atelier"
  }
];

export default function PratiquePage() {
  const [selectedStationId, setSelectedStationId] = useState<number>(1);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % WORKBENCH_QUOTES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const activeStation = WORKBENCH_STATIONS[selectedStationId] || WORKBENCH_STATIONS[1];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-[#E2B44F]/30 selection:text-amber-800 dark:selection:text-[#F4E5B8]">
      
      {/* HALO LUMINEUX & ATMOSPHÈRE HAUTE HORLOGERIE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#E2B44F]/15 via-[#D4AF37]/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#E2B44F]/5 blur-[160px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 relative z-10 space-y-16">
        
        {/* --- FIL D'ARIANE & BADGE SUISSE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-[#E2B44F] transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-[#E2B44F] font-medium">Pratique Horlogère</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-slate-700 dark:text-slate-300">Établi du Maître Horloger</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pratique/depannage-erreurs"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition shadow-sm"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Dépannage &amp; Erreurs</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] border border-[#E2B44F]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E2B44F] animate-pulse" />
              🇨🇭 Normes Fédérales NIHS &amp; COSC · Standards Établi Suisse
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE --- */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E2B44F]/10 border border-[#E2B44F]/30 text-amber-800 dark:text-[#E2B44F] text-xs font-mono tracking-widest uppercase shadow-sm">
            <Wrench className="w-4 h-4 text-[#E2B44F]" />
            L&apos;Art du Geste &amp; la Rigueur d&apos;Atelier
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            L&apos;Atelier Pratique &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-[#E2B44F] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#F4E5B8] dark:to-[#E2B44F] bg-clip-text text-transparent">
              les Gestes de Haute Précision
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Prenez place à l&apos;établi horloger. Explorez les postes interactifs de manufacture, maîtrisez les protocoles officiels de dépose, le dosage micrométrique des huiles Moebius et le diagnostic acoustique au vibrographe Witschi.
          </p>

          {/* 4 Indicateurs Clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400">Postes d&apos;Établi</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4 Pôles</div>
              <div className="text-[11px] text-[#E2B44F] mt-0.5">Rhabillage à l&apos;Usinage</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400">Calibres Écoles</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">ETA 6497 &amp; 2824</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Unitas &amp; Automatique</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400">Points de Huilage</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">25 Points</div>
              <div className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-0.5">Moebius 9010 / HP-1300 / 9415</div>
            </div>

            <Link
              href="/pratique/depannage-erreurs"
              className="p-4 bg-gradient-to-br from-rose-500/10 to-amber-500/10 dark:bg-[#0D121F] border border-rose-500/30 hover:border-rose-500 dark:border-rose-500/40 rounded-2xl shadow-sm hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-bold">
                <span>Clinique &amp; Dépannage</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300">Nouveau</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                6 Erreurs Clés
              </div>
              <div className="text-[11px] text-[#E2B44F] mt-0.5 flex items-center gap-1">
                <span>Guide de survie</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BANNIÈRE VEDETTE : DÉPANNAGE & ERREURS COURANTES (LE GUIDE DE SURVIE)     */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden rounded-3xl border-2 border-rose-300/80 dark:border-rose-500/40 bg-gradient-to-r from-[#FFF5F5] via-[#FFF9F2] to-white dark:from-[#1b0b10] dark:via-[#16100d] dark:to-slate-900 p-6 sm:p-9 shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  NOUVEAU MODULE CLINIQUE
                </span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                  Guide de Survie de l&apos;Apprenti Horloger
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                Dépannage &amp; Erreurs courantes d&apos;établi
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed">
                Ressort qui saute du barillet, pivot écrasé sous le pont, dard frottant sur le plateau, spiral conique ou spires collées, vis à pas à gauche cisaillée ou chaussée lâche : diagnostiquez immédiatement l&apos;anomalie sous binoculaire 10x et appliquez le geste certifié par les normes suisses.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-amber-800 dark:text-[#E2B44F] font-semibold pt-1">
                <span>⚡ 4 Piliers de diagnostic</span>
                <span>•</span>
                <span>🔍 6 Cas Erreur vs Bon Geste</span>
                <span>•</span>
                <span>⏱️ Test d&apos;établi interactif</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/pratique/depannage-erreurs"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold font-serif text-sm tracking-wide uppercase transition-all shadow-xl shadow-rose-900/20 dark:shadow-rose-950/50 hover:scale-[1.02]"
              >
                <span>Accéder au Guide Dépannage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/depannage-erreurs.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-300 shadow-sm dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-200 dark:border-white/20 transition text-center font-mono text-xs font-medium"
              >
                <span>Ouvrir en plein écran ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION VEDETTE : L'ÉTABLI VIRTUEL DU MAÎTRE HORLOGER (INTERACTIF)        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border-2 border-amber-500/30 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
          
          {/* En-tête du Banc d'Établi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-[#E2B44F]">
                  Banc de Démonstration d&apos;Atelier Interactif
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Sélectionnez un Poste de Travail sur l&apos;Établi
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
              <span>Poste Actif :</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E2B44F]/20 text-amber-900 dark:text-[#E2B44F] font-bold border border-[#E2B44F]/40 shadow-sm">
                {activeStation.badge}
              </span>
            </div>
          </div>

          {/* GRILLE : TAPIS D'ÉTABLI (GAUCHE) & FICHE TECHNIQUE DYNAMIQUE (DROITE) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* TAPIS D'ÉTABLI HORLOGER (7 COLS) */}
            <div className="lg:col-span-7 bg-slate-100/90 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 relative flex flex-col justify-between min-h-[460px] shadow-sm dark:shadow-inner text-slate-900 dark:text-white transition-colors">
              
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between mb-4">
                <span>TAPIS D&apos;ÉTABLI BERGEON · CH-2400 LE LOCLE</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Température régulée 21°C</span>
              </div>

              {/* 4 Postes interactifs disposés sur l'établi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 my-auto">
                
                {/* 1. PORTE-CALIBRE ETA 6497 */}
                <button
                  type="button"
                  onClick={() => setSelectedStationId(1)}
                  className={`p-5 rounded-2xl text-left transition-all hover:scale-[1.02] shadow-sm hover:shadow-md group ${
                    selectedStationId === 1
                      ? 'bg-white dark:bg-slate-950 border-2 border-amber-500 dark:border-[#E2B44F] shadow-amber-500/10'
                      : 'bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">⚙️</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/40 font-bold">
                      ETA 6497
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-[#E2B44F] transition-colors">
                    Rhabillage &amp; Montage
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    Démontage ordonné, contrôle des ébats et dépose délicate du balancier.
                  </p>
                  <div className="mt-3 text-[10px] font-mono text-amber-700 dark:text-[#E2B44F] flex items-center gap-1 font-bold">
                    <span>Examiner le poste</span> <span>→</span>
                  </div>
                </button>

                {/* 2. BLOC HUILIER 4 COULEURS */}
                <button
                  type="button"
                  onClick={() => setSelectedStationId(2)}
                  className={`p-5 rounded-2xl text-left transition-all hover:scale-[1.02] shadow-sm hover:shadow-md group ${
                    selectedStationId === 2
                      ? 'bg-white dark:bg-slate-950 border-2 border-cyan-500 dark:border-cyan-400 shadow-cyan-500/10'
                      : 'bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">💧</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/40 font-bold">
                      Moebius 4G
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    Micro-Lubrification
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    Cartographie des 25 points : 9010 (rapide), HP-1300 (force) et 9415 (ancre).
                  </p>
                  <div className="mt-3 text-[10px] font-mono text-cyan-700 dark:text-cyan-400 flex items-center gap-1 font-bold">
                    <span>Examiner le poste</span> <span>→</span>
                  </div>
                </button>

                {/* 3. VIBROGRAPHE WITSCHI */}
                <button
                  type="button"
                  onClick={() => setSelectedStationId(3)}
                  className={`p-5 rounded-2xl text-left transition-all hover:scale-[1.02] shadow-sm hover:shadow-md group ${
                    selectedStationId === 3
                      ? 'bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-400 shadow-emerald-500/10'
                      : 'bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/40 font-bold">
                      Witschi COSC
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    Diagnostic &amp; Réglage
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    Analyse acoustique en 5 positions : marche, repère (&lt;0.6ms) et amplitude.
                  </p>
                  <div className="mt-3 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <span>Examiner le poste</span> <span>→</span>
                  </div>
                </button>

                {/* 4. TOUR SCHAUBLIN 70 */}
                <button
                  type="button"
                  onClick={() => setSelectedStationId(4)}
                  className={`p-5 rounded-2xl text-left transition-all hover:scale-[1.02] shadow-sm hover:shadow-md group ${
                    selectedStationId === 4
                      ? 'bg-white dark:bg-slate-950 border-2 border-purple-500 dark:border-purple-400 shadow-purple-500/10'
                      : 'bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">📐</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-400/40 font-bold">
                      Schaublin 70
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    Micromécanique &amp; Outils
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    Tournage au centième, affûtage Arkansas des pannes et acier Böhler K720.
                  </p>
                  <div className="mt-3 text-[10px] font-mono text-purple-700 dark:text-purple-400 flex items-center gap-1 font-bold">
                    <span>Examiner le poste</span> <span>→</span>
                  </div>
                </button>

              </div>

              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center mt-4">
                ✦ Cliquez sur l&apos;un des 4 postes pour charger sa fiche technique officielle ✦
              </div>
            </div>

            {/* PANNEAU TECHNIQUE DE DÉTAIL DYNAMIQUE (5 COLS) */}
            <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-6 sm:p-7 border border-amber-500/40 dark:border-[#E2B44F]/30 flex flex-col justify-between shadow-xl dark:shadow-2xl relative transition-colors">
              
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-mono font-bold uppercase text-amber-800 dark:text-[#E2B44F] tracking-wider">
                    {activeStation.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-semibold">
                    {activeStation.difficulty}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {activeStation.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light mb-5">
                  {activeStation.desc}
                </p>

                {/* WIDGET TECHNIQUE SPÉCIFIQUE AU POSTE ACTIF */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-5 font-mono text-xs transition-colors">
                  {selectedStationId === 1 && (
                    <>
                      <div className="flex justify-between items-center text-[11px] text-amber-800 dark:text-amber-300 pb-2 border-b border-slate-200 dark:border-slate-800 font-semibold">
                        <span>Ordre de dépose chronologique :</span>
                        <span className="font-bold">6 Organes</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] text-center">
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">1. Balancier</div>
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">2. Ancre</div>
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">3. Rouage</div>
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">4. Barillet</div>
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">5. Remontoir</div>
                        <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-medium">6. Platine</div>
                      </div>
                    </>
                  )}

                  {selectedStationId === 2 && (
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 shadow-sm">
                        <span className="font-bold block">Moebius 9010</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Pivots rapides (4 Hz)</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm">
                        <span className="font-bold block">Moebius HP-1300</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Barillet &amp; Roue centre</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 shadow-sm">
                        <span className="font-bold block">Moebius 9415</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Palettes d&apos;ancre</span>
                      </div>
                    </div>
                  )}

                  {selectedStationId === 3 && (
                    <div className="rounded-lg p-3 font-mono text-emerald-400 border border-emerald-500/40 bg-[#021208] shadow-inner">
                      <div className="flex justify-between items-center text-[10px] border-b border-emerald-500/30 pb-1 mb-2">
                        <span>WITSCHI CHRONOSCOPE S1</span>
                        <span>CAL: 18&apos;000 A/h</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[9px] text-emerald-500/70 block">MARCHE</span>
                          <strong className="text-sm">+1.8 s/j</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-emerald-500/70 block">AMPLITUDE</span>
                          <strong className="text-sm">288°</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-emerald-500/70 block">REPÈRE</span>
                          <strong className="text-sm">0.1 ms</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStationId === 4 && (
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-left shadow-sm">
                        <span className="font-bold block text-slate-900 dark:text-white">Tour Schaublin 70</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Pinces W-12 · Précision 0.01 mm</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-left shadow-sm">
                        <span className="font-bold block text-slate-900 dark:text-white">Affûtage Arkansas</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Pannes biseautées sans jeu</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Gestes d'Or du Maître */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono font-bold text-amber-800 dark:text-[#E2B44F] uppercase tracking-wider block">
                    ⚡ Gestes d&apos;Or &amp; Tolérances d&apos;Examen :
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
                    {activeStation.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <span>✓</span>
                        <span className="text-slate-700 dark:text-slate-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bouton CTA vers la page dédiée */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <Link
                  href={activeStation.ctaHref}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-slate-950 font-bold font-serif text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>{activeStation.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION : LES PROTOCOLES OFFICIELS DE L'ÉTABLI SUISSE (GRILLE COMPLÈTE)   */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                📜 Programme Complet d&apos;Atelier
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Les Fiches Officielles de l&apos;Établi Suisse
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Protocoles complets d&apos;atelier conformes aux grilles d&apos;évaluation AFP &amp; CFC
            </p>
          </div>

          {/* GRILLE LUXE 3x3 PARFAITEMENT ÉQUILIBRÉE AVEC OUTILS & BOUTONS COMPLETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICAL_MODULES.map((m, idx) => (
              <Link
                key={idx}
                href={m.href}
                className={`group relative flex flex-col justify-between p-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 ${m.hoverBorder} rounded-3xl shadow-sm hover:shadow-2xl ${m.hoverShadow} transition-all duration-300 transform hover:-translate-y-1.5`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${m.iconBg} border ${m.iconBorder} flex items-center justify-center text-xl ${m.iconColor} group-hover:scale-110 transition-transform`}>
                      {m.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold">
                      {m.badge}
                    </span>
                  </div>
                  <div>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${m.stepColor}`}>
                      {m.step}
                    </span>
                    <h3 className={`text-xl font-serif font-bold text-slate-900 dark:text-white mt-1 ${m.hoverText} transition-colors`}>
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {m.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {m.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 ${m.btnHover} text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold transition-all`}>
                    <span>Consulter le protocole</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION CITATIONS ROTATIVES DES MAÎTRES DE L'ÉTABLI                       */}
        {/* ========================================================================= */}
        <section className="relative py-14 px-6 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-[#E2B44F]/30 rounded-3xl shadow-md text-center overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E2B44F]">
              ⚡ Philosophie de l&apos;Établi &amp; Savoir-Être Horloger
            </span>

            <div className="min-h-[120px] flex flex-col justify-center">
              <blockquote className="space-y-3">
                <p className="text-xl sm:text-2xl font-serif italic text-slate-900 dark:text-[#F4E5B8] leading-relaxed">
                  « {WORKBENCH_QUOTES[quoteIndex].text} »
                </p>
                <footer className="text-xs sm:text-sm font-mono text-[#E2B44F] font-bold">
                  — {WORKBENCH_QUOTES[quoteIndex].author}
                </footer>
              </blockquote>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {WORKBENCH_QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuoteIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === quoteIndex
                      ? 'w-8 bg-[#E2B44F]'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#E2B44F]/50'
                  }`}
                  aria-label={`Citation ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION SIMULATEUR D'ÉTABLI — 36 CARTES MÉMOIRE CALIBRE ETA 6497          */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-[#E2B44F]/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2B44F]/10 border border-[#E2B44F]/30 text-amber-800 dark:text-[#E2B44F] text-xs font-mono font-bold uppercase tracking-wider">
              🎓 Entraînement &amp; Examen Pratique
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Simulateur d&apos;Atelier — Calibre ETA 6497-1
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              Révisez les 36 questions fondamentales des examens d&apos;atelier : ordre chronologique de dépose, points de lubrification Moebius, vérification des ébats et tolérances chronométriques.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Flashcards6497 />
          </div>
        </section>

        {/* --- NAVIGATION BAS DE PAGE --- */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/theorie"
            className="flex items-center gap-2 text-[#E2B44F] hover:text-amber-600 dark:hover:text-[#F4E5B8] transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Consulter l&apos;Académie Théorique (16 Traités)</span>
          </Link>

          <Link
            href="/suisse"
            className="flex items-center gap-2 text-[#E2B44F] hover:text-amber-600 dark:hover:text-[#F4E5B8] transition-colors group"
          >
            <span>Explorer la Carte Interactive des Cantons Suisses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}
