// src/app/pratique/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Wrench,
  Clock,
  Droplet,
  FileText,
  Award,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  BookOpen,
  Compass,
  Play,
  Layers,
  Zap
} from 'lucide-react';
import Flashcards6497 from '@/components/Flashcards6497';

// --- DATA STRUCTURES ---

interface PracticalModule {
  step: string;
  badge: string;
  title: string;
  description: string;
  iconName: string;
  tools: string[];
  href: string;
  cta: string;
  highlight: string;
}

const PRACTICAL_MODULES: PracticalModule[] = [
  {
    step: 'Étape 01 · Fondations',
    badge: 'ETA 6497-1',
    title: 'Démontage du Mouvement',
    description: 'Ordre chronologique strict de dépose : balancier-spiral complet, ancre et pont, rouage, barillet et classement des vis en godets étiquetés.',
    iconName: 'Wrench',
    tools: ['Tournevis Bergeon', 'Brucelles Dumont N°3', 'Porte-pièce berceau'],
    href: '/pratique/demontage',
    cta: 'Consulter le protocole',
    highlight: 'Ordre de dépose strict'
  },
  {
    step: 'Étape 02 · Rigueur Inverse',
    badge: 'ETA 6497-1',
    title: 'Remontage & Assemblage',
    description: 'Reconstitution méthodique du calibre : mise en place du barillet, engrènement du rouage, contrôle des ébats axiaux et sécurité du cliquet.',
    iconName: 'Layers',
    tools: ['Brucelles N°3 & N°5', 'Cheville de sureau', 'Pique-huile fin'],
    href: '/pratique/remontage',
    cta: 'Consulter le protocole',
    highlight: 'Contrôle des ébats'
  },
  {
    step: 'Étape 03 · Cœur Vivant',
    badge: 'Sécurité Maximale',
    title: 'Balancier-Spiral & Sécurité',
    description: 'Le geste d\'or de l\'horloger : manipulation délicate du coq sans vriller le spiral, desserrage de la vis de piton et centrage parfait des spires.',
    iconName: 'Zap',
    tools: ['Tournevis N°0.80', 'Brucelles fines N°5', 'Papier de soie'],
    href: '/pratique/demontage-balancier',
    cta: 'Consulter le protocole',
    highlight: 'Protection du spiral'
  },
  {
    step: 'Étape 04 · Micrométrie',
    badge: 'Moebius Suisse',
    title: 'Huilage & Lubrification',
    description: 'Cartographie officielle des 25 points d\'huile : Moebius 9010 pour pivots rapides, HP-1300 pour barillet et 9415 spécifique pour les levées d\'ancre.',
    iconName: 'Droplet',
    tools: ['Huiliers 4 godets', 'Piques-huiles Bergeon', 'Moebius 9010 / HP-1300 / 9415'],
    href: '/pratique/huilage',
    cta: 'Consulter la cartographie',
    highlight: 'Goutte au 2/3 de pierre'
  },
  {
    step: 'Étape 05 · Chronométrie',
    badge: 'Norme COSC',
    title: 'Réglage & Précision',
    description: 'Diagnostic acoustique au vibrographe : mesure de la marche diurne (s/j), calcul du repère (beat error < 0.6 ms) et analyse d\'amplitude sur 5 positions.',
    iconName: 'Clock',
    tools: ['Vibrographe Witschi', 'Clé de raquette micrométrique', 'Loupe d\'horloger 10x'],
    href: '/pratique/reglage',
    cta: 'Consulter le protocole',
    highlight: 'Repère & Amplitude'
  },
  {
    step: 'Étape 06 · Arsenal d\'Établi',
    badge: 'Bergeon & Horotec',
    title: 'Outils & Équipement',
    description: 'Entretien et préparation de l\'outillage d\'élite : affûtage des pannes de tournevis sur pierre d\'Arkansas, pâte Rodico, potences et loupes d\'établi.',
    iconName: 'Hammer',
    tools: ['Tournevis 30081', 'Pierre Arkansas', 'Pâte Rodico 6033'],
    href: '/pratique/outils',
    cta: 'Explorer l\'arsenal',
    highlight: 'Affûtage des pannes'
  },
  {
    step: 'Étape 07 · Plans d\'Usine',
    badge: 'Documentation ETA',
    title: 'Fiches Techniques & Éclatés',
    description: 'Plans officiels complets des calibres suisses de référence : éclatés techniques ETA 6497-1 et ETA 2824-2, nomenclature et couples de serrage.',
    iconName: 'FileText',
    tools: ['Plans officiels ETA', 'Nomenclature des pièces', 'Couples cN.m'],
    href: '/pratique/fiches',
    cta: 'Consulter les plans',
    highlight: 'Éclatés originaux'
  },
  {
    step: 'Étape 08 · Filières d\'État',
    badge: 'Convention Patronale',
    title: 'Certifications AFP & CFC',
    description: 'Les exigences fédérales suisses de la formation professionnelle : critères d\'examen d\'établi, grilles d\'évaluation et passerelles de carrière.',
    iconName: 'Award',
    tools: ['Critères de certification', 'Grilles d\'examen CP', 'orientation.ch'],
    href: '/pratique/certifications',
    cta: 'Découvrir la filière',
    highlight: 'Diplômes suisses'
  }
];

// Galerie d'Atelier Photos
const WORKSHOP_GALLERY = [
  {
    src: '/images/atelier-horloger.jpg',
    title: 'L\'Établi du Maître Horloger',
    subtitle: 'Atmosphère feutrée, accoudoirs ergonomiques et lumière du nord'
  },
  {
    src: '/images/outils-horlogers.jpg',
    title: 'Arsenal des Outils de Précision',
    subtitle: 'Brucelles antimagnétiques Dumont et tournevis calibrés'
  },
  {
    src: '/images/mouvement-chronographe.jpg',
    title: 'Complications & Rouages Complexes',
    subtitle: 'Ajustement micrométrique de la bascule et roue à colonnes'
  },
  {
    src: '/images/tournevis_horlogerie.jpg',
    title: 'Affûtage sur Pierre d\'Arkansas',
    subtitle: 'Taille des biseaux pour épouser parfaitement les fentes de vis'
  },
  {
    src: '/images/remontage3.jpg',
    title: 'Pose du Rouage & Ponts',
    subtitle: 'Contrôle des ébats sous loupe binoculaire'
  },
  {
    src: '/images/remontage5.jpg',
    title: 'Échappement & Levées d\'Ancre',
    subtitle: 'Application précise de l\'huile thixotrope Moebius 9415'
  }
];

// Documentaires Vidéo YouTube
const WORKSHOP_VIDEOS = [
  {
    id: 'JIc1kIVpSBo',
    title: 'Fabrication & Gestes d\'Atelier — Mouvement Mécanique Suisse',
    tag: 'Documentaire de Référence'
  },
  {
    id: 'feKWzl-yKso',
    title: 'L\'Art de l\'Horlogerie Suisse — Transmission & Bienfacture',
    tag: 'Haute Horlogerie'
  }
];

// Citations & Maximes d'Établi
const WORKBENCH_QUOTES = [
  {
    text: 'À l\'établi, chaque centième de millimètre sépare la perfection de l\'échec. La patience et la douceur du geste sont les premières vertus de l\'horloger.',
    author: 'Enseignement Traditionnel des Manufactures Suisses'
  },
  {
    text: 'Ne forcez jamais un rouage. Si un pivot ou un pont résiste, arrêtez-vous : la mécanique parle à qui sait écouter le métal.',
    author: 'Maxime des Cabinotiers Genevois'
  },
  {
    text: 'La propreté absolue d\'un composant et la justesse d\'une goutte d\'huile confèrent au garde-temps son battement pour les siècles à venir.',
    author: 'Règle d\'Or de la Lubrification d\'Atelier'
  }
];

export default function PratiquePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotation des citations
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % WORKBENCH_QUOTES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-[#E2B44F]/30 selection:text-amber-800 dark:selection:text-[#F4E5B8]">

      {/* Particules Dorées & Halo Lumineux d'Atelier (Atmosphère Haute Horlogerie) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#E2B44F]/15 via-[#D4AF37]/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#E2B44F]/5 blur-[160px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px]" />

        {/* Particules animées */}
        <motion.div
          animate={{ y: [-15, 15, -15], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 left-1/5 w-2 h-2 rounded-full bg-[#E2B44F] blur-[1px]"
        />
        <motion.div
          animate={{ y: [15, -15, 15], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-[#F4E5B8] blur-[1px]"
        />
        <motion.div
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#E2B44F] blur-[1px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 relative z-10 space-y-20">

        {/* --- FIL D'ARIANE & BADGE ÉTABLI SUISSE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-[#E2B44F] transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-[#E2B44F] font-medium">Pratique Horlogère</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-slate-700 dark:text-slate-300">Atelier &amp; Gestes d&apos;Établi</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] border border-[#E2B44F]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E2B44F] animate-pulse" />
              🇨🇭 Normes Fédérales NIHS &amp; COSC · Ateliers d&apos;Élite
            </span>
          </div>
        </div>

        {/* --- HERO HEADER CINÉMATIQUE HAUTE HORLOGERIE --- */}
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
            De la dépose rigoureuse du balancier-spiral à la lubrification micrométrique Moebius et au réglage de marche au vibrographe.
            Découvrez les protocoles officiels des manufactures suisses et entraînez vos réflexes d&apos;établi pour les examens AFP &amp; CFC.
          </p>

          {/* 4 Indicateurs de Légitimité Horlogère */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Protocoles d&apos;Établi</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">8 Modules</div>
              <div className="text-[11px] text-[#E2B44F] mt-0.5">Démontage à la Certification</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Calibres de Référence</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">ETA 6497 &amp; 2824</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Unitas &amp; Automatique</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Points de Huilage</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">25 Points</div>
              <div className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-0.5">Moebius 9010 / HP-1300 / 9415</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Simulateur d&apos;Examen</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">36 Cartes</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Questions Clés d&apos;Atelier</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: LES 8 MODULES D'ATELIER (GRILLE HAUTE HORLOGERIE 4x2)          */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                ⚙️ Parcours Pratique d&apos;Atelier
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Les 8 Protocoles de Manufacture
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Sélectionnez une étape pour accéder à la fiche d&apos;établi détaillée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRACTICAL_MODULES.map((m, idx) => (
              <Link
                key={idx}
                href={m.href}
                className="group relative flex flex-col justify-between p-7 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/80 hover:border-[#E2B44F] dark:hover:border-[#E2B44F] rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-[#E2B44F]/10 dark:hover:shadow-[#E2B44F]/15 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Lueur dorée d'accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E2B44F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                <div className="relative z-10 space-y-4">
                  {/* Top Bar: Icone + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#E2B44F]/10 border border-amber-200 dark:border-[#E2B44F]/30 flex items-center justify-center text-[#E2B44F] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      {m.iconName === 'Wrench' && <Wrench className="w-6 h-6" />}
                      {m.iconName === 'Layers' && <Layers className="w-6 h-6" />}
                      {m.iconName === 'Zap' && <Zap className="w-6 h-6" />}
                      {m.iconName === 'Droplet' && <Droplet className="w-6 h-6" />}
                      {m.iconName === 'Clock' && <Clock className="w-6 h-6" />}
                      {m.iconName === 'Hammer' && <Hammer className="w-6 h-6" />}
                      {m.iconName === 'FileText' && <FileText className="w-6 h-6" />}
                      {m.iconName === 'Award' && <Award className="w-6 h-6" />}
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold">
                      {m.badge}
                    </span>
                  </div>

                  {/* Étape + Titre */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                      {m.step}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#E2B44F] transition-colors">
                      {m.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {m.description}
                  </p>
                </div>

                {/* Bottom : Outils + CTA */}
                <div className="relative z-10 pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  {/* Tools badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {m.tools.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bouton CTA */}
                  <div className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-[#E2B44F] text-slate-800 dark:text-slate-200 group-hover:text-slate-950 border border-slate-200 dark:border-slate-700 group-hover:border-[#E2B44F] text-xs font-mono font-bold transition-all duration-300">
                    <span>{m.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: GALERIE PHOTOGRAPHIQUE & VIDÉOTHÈQUE D'ATELIER                 */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                📷 Immersion Visuelle en Manufacture
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                La Galerie d&apos;Établi &amp; les Gestes d&apos;Exception
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Photographies d&apos;ateliers suisses et documentaires de référence
            </p>
          </div>

          {/* Grille de 6 Photos Haute Définition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKSHOP_GALLERY.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#E2B44F]/30 bg-slate-900 shadow-md hover:border-[#E2B44F] transition-all duration-500"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-[#E2B44F] group-hover:ring-inset transition-all duration-500 rounded-2xl" />

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2B44F] font-bold">Atelier Suisse</span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 2 Documentaires Vidéo YouTube Intégrés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            {WORKSHOP_VIDEOS.map((vid, idx) => (
              <div
                key={vid.id}
                className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-[#E2B44F]/30 rounded-3xl p-5 shadow-md hover:border-[#E2B44F] transition-all duration-300 group space-y-4"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200 dark:border-slate-800 shadow-inner">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.id}?rel=0&modestbranding=1&color=white`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-[#E2B44F]/10 text-amber-800 dark:text-[#E2B44F] border border-amber-200 dark:border-[#E2B44F]/30">
                      {vid.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#E2B44F] transition-colors">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CITATIONS ROTATIVES DES MAÎTRES DE L'ÉTABLI                    */}
        {/* ========================================================================= */}
        <section className="relative py-16 px-6 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-[#E2B44F]/30 rounded-3xl shadow-md overflow-hidden text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E2B44F]">
              ⚡ Philosophie de l&apos;Établi &amp; Savoir-Être
            </span>

            <div className="min-h-[140px] flex flex-col justify-center">
              <blockquote className="space-y-4">
                <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-slate-900 dark:text-[#F4E5B8] leading-relaxed">
                  « {WORKBENCH_QUOTES[quoteIndex].text} »
                </p>
                <footer className="text-xs sm:text-sm font-mono text-[#E2B44F] font-bold">
                  — {WORKBENCH_QUOTES[quoteIndex].author}
                </footer>
              </blockquote>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 pt-4">
              {WORKBENCH_QUOTES.map((_, i) => (
                <button
                  key={i}
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
        {/* SECTION 4: SIMULATEUR D'ÉTABLI — 36 CARTES MÉMOIRE CALIBRE ETA 6497      */}
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

          {/* Composant Flashcards ETA 6497 */}
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
